# FARchat Backend Setup Guide

This document provides complete instructions for setting up the FARchat backend infrastructure.

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works for development)
- OpenRouter or DeepSeek API key (for LLM)
- OpenAI API key (for embeddings, via OpenRouter)

## Environment Variables

Create a `.env.local` file in the `/app` directory with the following variables:

```bash
# ===========================================
# SUPABASE CONFIGURATION (Required)
# ===========================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# ===========================================
# DATABASE (Required for direct DB access)
# ===========================================
DATABASE_URL=postgresql://postgres:[password]@db.[project-id].supabase.co:5432/postgres

# ===========================================
# LLM API KEYS (Choose one or both)
# ===========================================
# Option 1: DeepSeek Direct (Recommended for cost)
DEEPSEEK_API_KEY=sk-your-deepseek-key

# Option 2: OpenRouter (More model options)
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key

# ===========================================
# EMBEDDINGS CONFIGURATION
# ===========================================
# OpenRouter is used for embeddings
EMBEDDING_MODEL=openai/text-embedding-3-small
EMBEDDING_DIM=1536

# ===========================================
# SITE CONFIGURATION
# ===========================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=FARchat

# ===========================================
# OPTIONAL: EMAIL (Resend)
# ===========================================
RESEND_API_KEY=re_your-resend-key
```

## Database Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and API keys from Settings > API

### 2. Apply Database Schema

Run the schema SQL in the Supabase SQL Editor:

1. Go to your Supabase Dashboard > SQL Editor
2. Copy the contents of `/supabase/schema.sql`
3. Execute the SQL

The schema creates:
- `profiles` table - User profiles with roles and tiers
- `user_usage` table - Daily query tracking for rate limiting
- `document_chunks` table - Vector embeddings for RAG
- `match_documents` function - Vector similarity search
- `increment_usage` function - Atomic usage counter

### 3. Enable Required Extensions

The schema automatically enables `pgvector`. If you encounter issues:

```sql
create extension if not exists vector;
```

### 4. Add Tier Column (If Upgrading)

If you have an existing database without the `tier` column:

```sql
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS tier text
DEFAULT 'free'
CHECK (tier in ('free', 'basic', 'pro', 'unlimited', 'enterprise'));
```

## Ingesting Regulation Data

### 1. Prepare Your Data

FAR/DFARS documents should be chunked and formatted as JSON:

```json
{
  "content": "The text content of the regulation section...",
  "metadata": {
    "regulation": "FAR",
    "part": "1",
    "section": "1.101",
    "title": "Purpose"
  }
}
```

### 2. Run Ingestion Script

Use the ingestion scripts in `/scripts/`:

```bash
cd scripts
npm install
npm run ingest
```

This will:
1. Read regulation documents
2. Generate embeddings via OpenAI/OpenRouter
3. Store chunks in the `document_chunks` table

## Third-Party Service Configuration

### Supabase Auth

1. Go to Authentication > Providers
2. Enable Email provider
3. Configure SMTP for production (Settings > Auth > SMTP)
4. Set Site URL in Authentication > URL Configuration

### LLM Provider Setup

**DeepSeek (Recommended):**
1. Sign up at [platform.deepseek.com](https://platform.deepseek.com)
2. Generate an API key
3. Add to `DEEPSEEK_API_KEY`

**OpenRouter:**
1. Sign up at [openrouter.ai](https://openrouter.ai)
2. Generate an API key
3. Add to `OPENROUTER_API_KEY`

## Local Development

```bash
# Install dependencies
cd app
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

## Production Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Deploy

### Environment Variables for Production

Update these for production:
- `NEXT_PUBLIC_SITE_URL` - Your production URL
- Ensure all API keys are production keys

## Database Migrations

For schema changes, create migration files:

```sql
-- migrations/001_add_tier.sql
ALTER TABLE profiles ADD COLUMN tier text DEFAULT 'free';
```

Apply via Supabase SQL Editor or CLI.

## Troubleshooting

### "Vector extension not found"
```sql
create extension vector;
```

### "match_documents function not found"
Re-run the schema.sql to create the function.

### "Unauthorized" errors
1. Check Supabase anon key is correct
2. Verify middleware is running
3. Check cookie settings in browser

### Embeddings failing
1. Verify `OPENROUTER_API_KEY` is set
2. Check model name in `EMBEDDING_MODEL`
3. Ensure dimensions match (1536 for text-embedding-3-small)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                    (Next.js + React)                        │
└────────────────────────┬────────────────────────────────────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Supabase  │  │   DeepSeek  │  │ OpenRouter  │
│   (Auth +   │  │   (Chat)    │  │ (Embeddings)│
│   Database) │  │             │  │             │
└─────────────┘  └─────────────┘  └─────────────┘
```

## Security Notes

1. Never commit `.env.local` to git
2. Use environment variables for all secrets
3. Service role key should only be used server-side
4. RLS policies are enabled on all tables
5. Admin routes check for `admin` role in profiles

## Support

For issues or questions:
- Email: support@farchat.app
- GitHub Issues: [Report a bug](https://github.com/farchatapp/farchat/issues)
