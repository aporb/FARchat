-- Chat Persistence and Citation Schema
-- Adds tables for conversations, messages, and chat sources

-- ============================================
-- CONVERSATIONS TABLE
-- Stores chat conversation metadata
-- ============================================
create table public.conversations (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users not null,
    title text default 'New Conversation',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.conversations enable row level security;

create policy "Users can view their own conversations"
    on public.conversations for select
    using (auth.uid() = user_id);

create policy "Users can create conversations"
    on public.conversations for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own conversations"
    on public.conversations for update
    using (auth.uid() = user_id);

create policy "Users can delete their own conversations"
    on public.conversations for delete
    using (auth.uid() = user_id);

-- ============================================
-- MESSAGES TABLE
-- Stores individual chat messages
-- ============================================
create table public.messages (
    id uuid default gen_random_uuid() primary key,
    conversation_id uuid references public.conversations on delete cascade not null,
    role text not null check (role in ('user', 'assistant')),
    content text not null,
    token_count integer default 0,
    created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Users can view messages in their conversations"
    on public.messages for select
    using (
        exists (
            select 1 from public.conversations
            where id = messages.conversation_id
            and user_id = auth.uid()
        )
    );

create policy "Users can insert messages in their conversations"
    on public.messages for insert
    with check (
        exists (
            select 1 from public.conversations
            where id = messages.conversation_id
            and user_id = auth.uid()
        )
    );

-- ============================================
-- CHAT SOURCES/CITATIONS TABLE
-- Stores citation/source attributions for messages
-- ============================================
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

alter table public.chat_sources enable row level security;

create policy "Users can view sources in their conversations"
    on public.chat_sources for select
    using (
        exists (
            select 1 from public.messages
            join public.conversations on conversations.id = messages.conversation_id
            where messages.id = chat_sources.message_id
            and conversations.user_id = auth.uid()
        )
    );

create policy "Users can insert sources for their messages"
    on public.chat_sources for insert
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

-- Function to update conversation timestamp when message is added
create or replace function public.update_conversation_timestamp()
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
    for each row execute procedure public.update_conversation_timestamp();

-- ============================================
-- USER USAGE ENHANCEMENTS
-- ============================================

-- Add missing columns to user_usage if they don't exist
alter table public.user_usage add column if not exists id bigserial;
alter table public.user_usage add column if not exists created_at timestamptz default now();
alter table public.user_usage add column if not exists updated_at timestamptz default now();

-- Create unique constraint if not exists
do $$
begin
    if not exists (
        select 1 from pg_constraint where conname = 'user_usage_pkey'
    ) then
        alter table public.user_usage add primary key (user_id, date);
    end if;
end $$;

-- Add insert/update policies if missing
do $$
begin
    if not exists (
        select 1 from pg_policies where policyname = 'Users can insert their own usage'
        and tablename = 'user_usage'
    ) then
        create policy "Users can insert their own usage"
            on public.user_usage for insert
            with check (auth.uid() = user_id);
    end if;

    if not exists (
        select 1 from pg_policies where policyname = 'Users can update their own usage'
        and tablename = 'user_usage'
    ) then
        create policy "Users can update their own usage"
            on public.user_usage for update
            using (auth.uid() = user_id);
    end if;
end $$;

-- ============================================
-- PROFILES ENHANCEMENTS
-- ============================================

-- Add email column if missing (some profiles setups don't include it)
alter table public.profiles add column if not exists email text;

-- Update handle_new_user to include email
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, tier)
  values (new.id, new.email, 'free');
  return new;
end;
$$ language plpgsql security definer set search_path = public;
