import os
import requests
from bs4 import BeautifulSoup
import re
from supabase import create_client, Client
from typing import List, Dict
from pathlib import Path

# Load environment variables from .env file
try:
    from dotenv import load_dotenv
    # Look for .env in the same directory as this script
    env_path = Path(__file__).parent / '.env'
    load_dotenv(dotenv_path=env_path)
except ImportError:
    print("Warning: python-dotenv not installed. Install with: pip install python-dotenv")
    print("Falling back to system environment variables...")

# Configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
FAR_URL = "https://www.acquisition.gov/content/part-1-federal-acquisition-regulations-system" # Example start
# Real implementation would likely iterate through all parts or download the XML

def get_text_from_html(url: str) -> str:
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    # Content extraction logic specific to acquisition.gov structure
    # This is a placeholder for the robust scraping logic
    content = soup.find('main') or soup.body
    return content.get_text(separator=' ', strip=True)

def chunk_text(text: str) -> List[Dict]:
    # Regex to find FAR citations e.g., "1.101"
    # Simple chunking by paragraph for now, ideally chunk by Subpart
    chunks = []
    paragraphs = text.split('\n\n')
    for p in paragraphs:
        if len(p) > 50:
            chunks.append({
                "content": p,
                "metadata": {"source": "acquisition.gov"}
            })
    return chunks

def get_embedding(text: str) -> List[float]:
    """Generates embeddings using OpenRouter (OpenAI-compatible)."""
    from openai import OpenAI
    
    # Use OpenRouter for embeddings if configured, otherwise fallback to direct OpenAI
    api_key = os.environ.get("OPENROUTER_API_KEY") or os.environ.get("OPENAI_API_KEY")
    base_url = "https://openrouter.ai/api/v1" if os.environ.get("OPENROUTER_API_KEY") else None
    
    client = OpenAI(api_key=api_key, base_url=base_url)
    
    # Configuration
    model = os.environ.get("EMBEDDING_MODEL", "openai/text-embedding-3-small")
    dimensions = int(os.environ.get("EMBEDDING_DIM", "1536"))
    
    # Clean text for embedding
    text = text.replace("\n", " ")
    
    # OpenAI/OpenRouter embedding request
    response = client.embeddings.create(
        input=[text],
        model=model,
        # Note: OpenRouter may pass 'dimensions' if supported by the underlying provider (OpenAI)
        extra_body={"dimensions": dimensions} if "openai" in model.lower() else {}
    )
    return response.data[0].embedding

def ingest():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Error: SUPABASE_URL and SUPABASE_KEY env vars required.")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    print(f"Fetching {FAR_URL}...")
    text = get_text_from_html(FAR_URL)
    
    print("Chunking...")
    chunks = chunk_text(text)
    
    print(f"Upserting {len(chunks)} chunks...")
    for i, chunk in enumerate(chunks):
        vector = get_embedding(chunk['content'])
        data = {
            "content": chunk['content'],
            "embedding": vector,
            "metadata": chunk['metadata']
        }
        supabase.table("document_chunks").insert(data).execute()
        
        if i % 10 == 0:
            print(f"Processed {i} chunks")

    print("Ingestion complete.")

if __name__ == "__main__":
    ingest()
