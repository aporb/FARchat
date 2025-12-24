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
-- CHAT PERSISTENCE TABLES
-- Stores chat conversations and messages
-- ============================================

-- Conversations table
create table public.conversations (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    title text default 'New Conversation',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Enable RLS on conversations
alter table public.conversations enable row level security;

create policy "Users can view their own conversations"
    on conversations for select
    using ( auth.uid() = user_id );

create policy "Users can create conversations"
    on conversations for insert
    with check ( auth.uid() = user_id );

create policy "Users can update their own conversations"
    on conversations for update
    using ( auth.uid() = user_id );

create policy "Users can delete their own conversations"
    on conversations for delete
    using ( auth.uid() = user_id );

-- Messages table
create table public.messages (
    id uuid default gen_random_uuid() primary key,
    conversation_id uuid references public.conversations on delete cascade not null,
    role text not null check (role in ('user', 'assistant')),
    content text not null,
    token_count integer default 0,
    created_at timestamptz default now()
);

-- Enable RLS on messages
alter table public.messages enable row level security;

create policy "Users can view messages in their conversations"
    on messages for select
    using (
        exists (
            select 1 from public.conversations
            where id = messages.conversation_id
            and user_id = auth.uid()
        )
    );

create policy "Users can insert messages in their conversations"
    on messages for insert
    with check (
        exists (
            select 1 from public.conversations
            where id = messages.conversation_id
            and user_id = auth.uid()
        )
    );

-- Chat sources/citations table
create table public.chat_sources (
    id uuid default gen_random_uuid() primary key,
    message_id uuid references public.messages on delete cascade not null,
    chunk_id bigint references public.document_chunks on delete set null,
    regulation text,
    section text,
    title text,
    similarity_score float,
    created_at timestamptz default now()
);

-- Enable RLS on chat_sources
alter table public.chat_sources enable row level security;

create policy "Users can view sources in their conversations"
    on chat_sources for select
    using (
        exists (
            select 1 from public.messages
            join public.conversations on conversations.id = messages.conversation_id
            where messages.id = chat_sources.message_id
            and conversations.user_id = auth.uid()
        )
    );

create policy "Users can insert sources for their messages"
    on chat_sources for insert
    with check (
        exists (
            select 1 from public.messages
            join public.conversations on conversations.id = messages.conversation_id
            where messages.id = chat_sources.message_id
            and conversations.user_id = auth.uid()
        )
    );

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

-- Function to update conversation timestamp
create or replace function update_conversation_timestamp()
returns trigger as $$
begin
    update public.conversations
    set updated_at = now()
    where id = new.conversation_id;
    return new;
end;
$$ language plpgsql;

create trigger on_message_created
    after insert on public.messages
    for each row execute procedure update_conversation_timestamp();
