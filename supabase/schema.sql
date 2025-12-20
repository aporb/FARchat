-- Enable pgvector extension
create extension if not exists vector;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text default 'user' check (role in ('guest', 'user', 'admin', 'pro')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Create policies for profiles
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
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create document_chunks table
create table public.document_chunks (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(1536) -- Match OpenAI/Cohere dimension
);

-- Enable RLS on chunks
alter table public.document_chunks enable row level security;
create policy "Chunks are viewable by everyone" on document_chunks for select using (true);
create policy "Only service role can insert chunks" on document_chunks for insert with check (auth.role() = 'service_role');

-- Create Similarity Search Function
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
