# FARchat Ingestion Guide

This guide explains how to populate your Supabase vector database with Federal Acquisition Regulation (FAR) data using the provided Python scripts.

## Prerequisites

1.  **Python 3.9+** installed on your machine.
2.  **Supabase Project**: You should have already run the `supabase/schema.sql` using the Supabase SQL Editor or CLI.
3.  **API Keys**:
    *   `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` (Get these from your Supabase Project Settings > API).
    *   `OPENAI_API_KEY` (Required for generating text embeddings).

## 1. Setup Environment

Navigate to the project root and install the required Python dependencies:

```bash
# It is recommended to use a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install supabase beautifulsoup4 requests openai
```

## 2. Configure Environment Variables

Create a `.env` file in the root directory (or export them in your terminal):

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key  # Use Service Role Key for ingestion
OPENROUTER_API_KEY=sk-or-... 

# Optional: Switch between Small (1536) and Large (3072) models
EMBEDDING_MODEL=openai/text-embedding-3-small
EMBEDDING_DIM=1536
```

If you wish to use 3072 dimensions, run this SQL in your Supabase editor:

```sql
ALTER TABLE document_chunks ALTER COLUMN embedding TYPE vector(3072);

-- Also update the search function signature
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(3072),
  match_threshold float,
  match_count int
) ... -- (Match original signature from schema.sql)
```

## 3. Run Ingestion

The ingestion script `scripts/ingest_far.py` is currently a robust scaffold. To run the initial ingestion:

```bash
python scripts/ingest_far.py
```

### What the script does:
1.  **Fetches**: Downloads FAR content from acquisition.gov.
2.  **Parses**: Uses BeautifulSoup to extract text.
3.  **Chunks**: Splits the text by Subpart to maintain regulatory context.
4.  **Embeds**: Calls OpenAI to generate 1536-dimensional vectors.
5.  **Stores**: Upserts the content and vectors into Supabase.

## 4. Verification

After running the script, you can verify the data in the Supabase Dashboard:
1.  Go to **Table Editor**.
2.  Select the `document_chunks` table.
3.  You should see rows populated with content and embeddings.

## Future Updates

To keep the data current, you can schedule this script to run weekly using GitHub Actions or a local cron job.
