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

pip install supabase beautifulsoup4 lxml openai python-dotenv tqdm
```

> [!NOTE]
> `lxml` is recommended for BeautifulSoup to handle XML map parsing efficiently.
> `tqdm` provides a progress bar which is helpful when ingesting thousands of sections.

## 2. Configure Environment Variables

Create a `scripts/.env` file with the following:

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

### Option A: Ingest Everything (Recommended)
The `scripts/ingest_all.py` script automatically discovers all regulations in `source_content/`.

```bash
cd scripts
source venv/bin/activate
python ingest_all.py
```

### Option B: Ingest Specific Regulation
Use `scripts/ingest_far.py` for targeted ingestion (e.g. just FAR or DFARS).

```bash
python scripts/ingest_far.py
```

### What the scripts do:
1.  **Discovery**: Scans `source_content` for `*_dita` and `*_dita_html` directory pairs.
2.  **Traverses**: Reads `.ditamap` files to build a legal hierarchy.
3.  **Parses**: Extracts text from `.html` files (preferring HTML over raw DITA for cleaner text).
4.  **Embeds**: Generates vectors via OpenRouter.
5.  **Stores**: Upserts content and vectors into Supabase.

## 4. Verification

After running the script, you can verify the data in the Supabase Dashboard:
1.  Go to **Table Editor**.
2.  Select the `document_chunks` table.
3.  You should see rows populated with content and embeddings.

## Future Updates

To keep the data current, you can schedule this script to run weekly using GitHub Actions or a local cron job.
