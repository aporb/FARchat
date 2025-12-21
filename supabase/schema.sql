-- FARchat Database Schema
-- Enable required extensions
create extension if not exists vector;

-- ============================================
-- PROFILES TABLE
-- Stores user profile information
-- ============================================
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'user' check (role in ('guest', 'user', 'admin', 'pro')),
  tier text default 'free' check (tier in ('free', 'basic', 'pro', 'unlimited', 'enterprise')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, tier)
  values (new.id, new.email, 'user', 'free');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- USER USAGE TABLE
-- Tracks daily query counts for rate limiting
-- ============================================
create table public.user_usage (
  id bigserial primary key,
  user_id uuid references auth.users not null,
  date date not null default current_date,
  query_count integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, date)
);

-- Enable RLS on user_usage
alter table public.user_usage enable row level security;

-- Policies for user_usage
create policy "Users can view their own usage"
  on user_usage for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own usage"
  on user_usage for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own usage"
  on user_usage for update
  using ( auth.uid() = user_id );

-- ============================================
-- DOCUMENT CHUNKS TABLE
-- Stores vectorized regulation content for RAG
-- ============================================
create table public.document_chunks (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(1536), -- Match OpenAI text-embedding-3-small dimension
  created_at timestamptz default now()
);

-- Create index for faster vector similarity search
create index on document_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Enable RLS on chunks
alter table public.document_chunks enable row level security;

create policy "Chunks are viewable by everyone"
  on document_chunks for select
  using (true);

create policy "Only service role can insert chunks"
  on document_chunks for insert
  with check (auth.role() = 'service_role');

create policy "Only service role can update chunks"
  on document_chunks for update
  using (auth.role() = 'service_role');

create policy "Only service role can delete chunks"
  on document_chunks for delete
  using (auth.role() = 'service_role');

-- ============================================
-- SIMILARITY SEARCH FUNCTION
-- Used for RAG vector search
-- ============================================
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  -- Set search_path to public to avoid path manipulation attacks
  set local search_path = public;

  return query
  select
    document_chunks.id,
    document_chunks.content,
    document_chunks.metadata,
    1 - (document_chunks.embedding <=> query_embedding) as similarity
  from document_chunks
  where 1 - (document_chunks.embedding <=> query_embedding) > match_threshold
  order by document_chunks.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to increment usage count atomically
create or replace function increment_usage(p_user_id uuid)
returns integer
language plpgsql
security definer
as $$
declare
  new_count integer;
begin
  insert into user_usage (user_id, date, query_count)
  values (p_user_id, current_date, 1)
  on conflict (user_id, date)
  do update set
    query_count = user_usage.query_count + 1,
    updated_at = now()
  returning query_count into new_count;

  return new_count;
end;
$$;
