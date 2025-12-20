
import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const dbUrl = process.env.DATABASE_URL || connectionStringFromSupabaseUrl()

function connectionStringFromSupabaseUrl() {
    // Try to construct from SUPABASE_URL if DATABASE_URL is missing
    // Format: postgres://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
    // This is hard to guess. 
    // Let's assume the user has DATABASE_URL in env, or we prompt for it.
    // Actually, usually in Supabase projects `DATABASE_URL` is in .env.
    return process.env.DATABASE_URL
}

if (!dbUrl) {
    console.error('Missing DATABASE_URL in .env.local. Cannot run migration.')
    console.error('Please add DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"')
    process.exit(1)
}

const client = new Client({
    connectionString: dbUrl,
})

const sql = `
-- Create Tier Enum
do $$ begin
    create type subscription_tier as enum ('free', 'basic', 'pro', 'unlimited', 'enterprise');
exception
    when duplicate_object then null;
end $$;

-- Profiles Table
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  tier subscription_tier default 'free'::subscription_tier
);

-- User Usage Table
create table if not exists public.user_usage (
  user_id uuid references auth.users on delete cascade not null,
  date date default current_date not null,
  query_count int default 0,
  primary key (user_id, date)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.user_usage enable row level security;

-- Policies
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Users can view own usage" on public.user_usage;
create policy "Users can view own usage" on public.user_usage for select using (auth.uid() = user_id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, tier)
  values (new.id, 'free');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger to initialize usage row on first query (optional, can handle in app logic)
-- Actually app logic is fine.
`;

async function run() {
    try {
        console.log('Connecting to database...')
        await client.connect()
        console.log('Running migration...')
        await client.query(sql)
        console.log('Migration successful!')
    } catch (err) {
        console.error('Migration failed:', err)
    } finally {
        await client.end()
    }
}

run()
