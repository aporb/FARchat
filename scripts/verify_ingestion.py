#!/usr/bin/env python3
"""
Ingestion Verification Script for FARchat

This script checks if the document_chunks table has data and provides
statistics about the ingested regulatory documents.
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client


def load_config():
    """Load configuration from environment or .env file."""
    # Try to load from .env in various locations
    env_paths = [
        Path(__file__).parent / '.env',
        Path(__file__).parent.parent / '.env',
        Path(__file__).parent.parent / 'app' / '.env',
        Path.cwd() / '.env',
    ]

    for env_path in env_paths:
        if env_path.exists():
            load_dotenv(dotenv_path=env_path)
            print(f"Loaded .env from: {env_path}")
            break

    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_KEY")

    if not supabase_url or not supabase_key:
        print("ERROR: SUPABASE_URL and SUPABASE_KEY must be set in .env")
        sys.exit(1)

    return supabase_url, supabase_key


def check_source_content():
    """Check what source content is available."""
    source_root = Path(__file__).parent.parent / "source_content"

    print("\n" + "=" * 60)
    print("SOURCE CONTENT CHECK")
    print("=" * 60)

    if not source_root.exists():
        print(f"Source content directory not found: {source_root}")
        return {}

    content_dirs = {}

    for item in source_root.iterdir():
        if item.is_dir():
            file_count = sum(1 for _ in item.rglob('*') if _.is_file())
            content_dirs[item.name] = {
                'path': str(item),
                'file_count': file_count
            }
            print(f"\n  {item.name}:")
            print(f"    Path: {item}")
            print(f"    Files: {file_count}")

    return content_dirs


def check_database_chunks(supabase):
    """Check document_chunks table in database."""
    print("\n" + "=" * 60)
    print("DATABASE CHECK")
    print("=" * 60)

    # Get total count
    result = supabase.table('document_chunks').select('id, metadata', count='exact').execute()
    total_count = result.count or 0

    print(f"\n  Total chunks: {total_count}")

    if total_count == 0:
        print("\n  ⚠️  WARNING: No document chunks found in database!")
        print("     Run ingest_all.py to populate the database.")
        return {'total': 0, 'by_regulation': {}}

    # Get count by regulation
    result = supabase.table('document_chunks').select('metadata').execute()
    regulation_counts = {}

    for row in result.data:
        meta = row.get('metadata', {})
        reg = meta.get('regulation', 'Unknown')
        regulation_counts[reg] = regulation_counts.get(reg, 0) + 1

    print("\n  Chunks by regulation:")
    for reg, count in sorted(regulation_counts.items()):
        print(f"    {reg}: {count} chunks")

    # Get sample chunks
    result = supabase.table('document_chunks').select(
        'id, content, metadata'
    ).limit(5).execute()

    print("\n  Sample chunks:")
    for chunk in result.data:
        meta = chunk.get('metadata', {})
        title = meta.get('title', 'No title')[:50]
        regulation = meta.get('regulation', 'N/A')
        section = meta.get('section', 'N/A')
        content_preview = chunk.get('content', '')[:80].replace('\n', ' ')

        print(f"\n    [{regulation} {section}] {title}")
        print(f"    Content: {content_preview}...")

    return {
        'total': total_count,
        'by_regulation': regulation_counts
    }


def check_vector_search_function(supabase):
    """Verify the match_documents function exists and works."""
    print("\n" + "=" * 60)
    print("VECTOR SEARCH FUNCTION CHECK")
    print("=" * 60)

    try:
        # Try to call the function
        from supabase import Client

        # Create a test embedding (1536 dimensions of zeros)
        test_embedding = [0.0] * 1536

        result = supabase.rpc('match_documents', {
            'query_embedding': test_embedding,
            'match_threshold': 0.99,
            'match_count': 1
        }).execute()

        print("\n  ✓ match_documents RPC function is working")
        print(f"  ✓ Returned {len(result.data)} results (expected 0 for non-matching query)")

        return True

    except Exception as e:
        print(f"\n  ✗ Error with match_documents function:")
        print(f"    {str(e)}")
        return False


def main():
    """Main verification function."""
    print("\n" + "=" * 60)
    print("FARchat Ingestion Verification")
    print("=" * 60)

    # Load configuration
    supabase_url, supabase_key = load_config()
    print(f"\nSupabase URL: {supabase_url[:50]}...")
    print(f"Supabase Key: {supabase_key[:20]}...")

    # Create Supabase client
    supabase = create_client(supabase_url, supabase_key)

    # Run checks
    source_content = check_source_content()
    chunks = check_database_chunks(supabase)
    vector_func = check_vector_search_function(supabase)

    # Summary
    print("\n" + "=" * 60)
    print("VERIFICATION SUMMARY")
    print("=" * 60)

    print(f"\n  Source content directories: {len(source_content)}")
    print(f"  Document chunks in DB: {chunks['total']}")
    print(f"  Vector search function: {'✓ Working' if vector_func else '✗ Failed'}")

    if chunks['total'] == 0:
        print("\n  ⚠️  ACTION REQUIRED:")
        print("     Run 'python scripts/ingest_all.py' to populate the database")
        print("     See 'docs/INGESTION_GUIDE.md' for detailed instructions")
        return 1
    else:
        print("\n  ✓ Ingestion appears to be complete")
        return 0


if __name__ == "__main__":
    sys.exit(main())
