import os
import re
from pathlib import Path
from typing import List, Dict
from pypdf import PdfReader
from supabase import create_client, Client
from openai import OpenAI
from tqdm import tqdm

try:
    from dotenv import load_dotenv
    # Look for .env in the same directory as this script
    env_path = Path(__file__).parent / '.env'
    load_dotenv(dotenv_path=env_path)
except ImportError:
    pass

# Configuration
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "openai/text-embedding-3-small")
EMBEDDING_DIM = int(os.environ.get("EMBEDDING_DIM", "1536"))

# Source Directory
VA_PDF_DIR = Path(__file__).parent.parent / "source_content" / "va_acq_regulations"

def get_embedding(text: str, client: OpenAI) -> List[float]:
    """Generates embeddings using OpenRouter."""
    text = text.replace("\n", " ").strip()
    if not text:
        return []

    response = client.embeddings.create(
        input=[text],
        model=EMBEDDING_MODEL,
        extra_body={"dimensions": EMBEDDING_DIM} if "openai" in EMBEDDING_MODEL.lower() else {}
    )
    return response.data[0].embedding

def parse_va_pdf(pdf_path: Path) -> List[Dict]:
    """Parses a VA PDF and splits it into sections."""
    reader = PdfReader(str(pdf_path))
    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text() + "\n"

    # Regex to split by section numbers at the start of a line
    # Matches patterns like 801.000, 801.101, 801.104-70
    section_pattern = r"(?m)^(\d{3}\.\d{3}(?:-\d{1,2})?)\s+(.*)$"
    
    sections = []
    current_pos = 0
    
    for match in re.finditer(section_pattern, full_text):
        # Everything from the previous match to this match is the content of the PREVIOUS section
        if current_pos == 0:
            # Preamble / TOC
            content = full_text[:match.start()].strip()
            if content:
                sections.append({
                    "title": "Preamble / Table of Contents",
                    "content": content,
                    "section_num": "FRONT_MATTER",
                    "part": pdf_path.stem.split('-')[1] if '-' in pdf_path.stem else "VAAR"
                })
        else:
            # Content of the previous section
            pass # We'll handle this by capturing the content between matches
        
        current_pos = match.start()

    # Re-parsing with split to actually get the content accurately
    parts = re.split(r"(?m)^(\d{3}\.\d{3}(?:-\d{1,2})?)\s+", full_text)
    
    # parts[0] is preamble
    # parts[1] is section num, parts[2] is section content starting with title
    
    preamble = parts[0].strip()
    if preamble:
         sections.append({
            "title": "Front Matter",
            "content": preamble,
            "section_num": "FRONT_MATTER",
            "part": pdf_path.stem.split('-')[1] if '-' in pdf_path.stem else "VAAR"
        })

    for i in range(1, len(parts), 2):
        section_num = parts[i]
        raw_content = parts[i+1].strip()
        
        # Split title from content (usually first line is title)
        content_lines = raw_content.split('\n', 1)
        title = content_lines[0].strip()
        body = content_lines[1].strip() if len(content_lines) > 1 else ""
        
        sections.append({
            "title": title,
            "content": f"{section_num} {title}\n{body}",
            "section_num": section_num,
            "part": section_num.split('.')[0]
        })

    return sections

def ingest_va_pdfs():
    if not SUPABASE_URL or not SUPABASE_KEY or not OPENROUTER_API_KEY:
        print("Error: Required environment variables not set.")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    openai_client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY,
    )

    pdf_files = list(VA_PDF_DIR.glob("*.pdf"))
    limit = int(os.environ.get("INGEST_LIMIT", "0"))
    if limit > 0:
        pdf_files = pdf_files[:limit]
        print(f"Limit applied: processing first {limit} PDFs.")
    
    print(f"Found {len(pdf_files)} VA PDFs for ingestion.")

    for pdf_path in tqdm(pdf_files, desc="Processing VA PDFs"):
        try:
            sections = parse_va_pdf(pdf_path)
            for sec in sections:
                embedding = get_embedding(sec["content"], openai_client)
                if not embedding:
                    continue
                
                data = {
                    "content": sec["content"],
                    "embedding": embedding,
                    "metadata": {
                        "regulation": "VAAR",
                        "part": sec["part"],
                        "section": sec["section_num"],
                        "title": sec["title"],
                        "source": pdf_path.name
                    }
                }
                supabase.table("document_chunks").insert(data).execute()
        except Exception as e:
            print(f"Error processing {pdf_path.name}: {e}")

if __name__ == "__main__":
    ingest_va_pdfs()
