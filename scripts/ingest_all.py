import os
import re
from pathlib import Path
from typing import List, Dict, Optional, Generator
import lxml.etree as ET
from bs4 import BeautifulSoup
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

# Source Directories
SOURCE_ROOT = Path(__file__).parent.parent / "source_content"

class DitaMapParser:
    def __init__(self, map_path: Path, html_dir: Path):
        self.map_path = map_path
        self.html_dir = html_dir
        self.tree = ET.parse(str(map_path))
        self.root = self.tree.getroot()
        self.regulation_name = map_path.stem.split('.')[0] # e.g., "FAR"

    def walk(self) -> Generator[Dict, None, None]:
        """Traverses the DITA map and yields metadata + path for each relevant topic."""
        for event, elem in ET.iterwalk(self.root, events=("start", "end")):
            if event == "start" and elem.tag == "topicref":
                title = elem.get("navtitle", "")
                output_class = elem.get("outputclass", "")
                href = elem.get("href", "")

                if not title and not href:
                    continue
                
                meta = {
                    "regulation": self.regulation_name,
                    "title": title,
                    "type": output_class,
                    "href": href
                }

                if href and href.endswith(".dita"):
                    html_filename = href.replace(".dita", ".html")
                    html_path = self.html_dir / html_filename
                    if html_path.exists():
                        yield {
                            "metadata": meta,
                            "html_path": html_path
                        }

class HtmlContentExtractor:
    @staticmethod
    def extract_text(html_path: Path) -> str:
        with open(html_path, 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f, 'lxml')
            for nav in soup.find_all('nav'):
                nav.decompose()
            main = soup.find('main') or soup.find('article') or soup.body
            if not main:
                return ""
            return main.get_text(separator=' ', strip=True)

def get_embedding(text: str, client: OpenAI) -> List[float]:
    """Generates embeddings using OpenRouter."""
    text = text.replace("\n", " ")
    response = client.embeddings.create(
        input=[text],
        model=EMBEDDING_MODEL,
        extra_body={"dimensions": EMBEDDING_DIM} if "openai" in EMBEDDING_MODEL.lower() else {}
    )
    return response.data[0].embedding

def process_regulation(reg_info: Dict, supabase: Client, openai_client: OpenAI):
    map_name = reg_info["map_name"]
    map_dir = reg_info["map_dir"]
    html_dir = reg_info["html_dir"]
    
    map_path = SOURCE_ROOT / map_dir / f"{map_name}.ditamap"
    html_path = SOURCE_ROOT / html_dir
    
    if not map_path.exists():
        print(f"Skipping {map_name}: Map not found at {map_path}")
        return

    print(f"\n🚀 Processing {map_name} from {map_dir}...")
    parser = DitaMapParser(map_path, html_path)
    
    items = list(parser.walk())
    limit = int(os.environ.get("INGEST_LIMIT", "0"))
    if limit > 0:
        items = items[:limit]
        print(f"Limit applied: only first {limit} items will be processed.")

    for item in tqdm(items, desc=f"Ingesting {map_name}"):
        meta = item["metadata"]
        html_file = item["html_path"]
        
        text = HtmlContentExtractor.extract_text(html_file)
        if not text or len(text) < 50:
            continue
            
        try:
            embedding = get_embedding(text, openai_client)
            data = {
                "content": text,
                "metadata": meta,
                "embedding": embedding
            }
            supabase.table("document_chunks").insert(data).execute()
        except Exception as e:
            print(f"Error processing {html_file.name}: {e}")

def discover_regulations() -> List[Dict]:
    """Automatically finds pairs of _dita and _dita_html folders."""
    regs = []
    # Known special mappings
    special_maps = {
        "DFARSPGI": "PGI",
    }

    folders = [f for f in SOURCE_ROOT.iterdir() if f.is_dir()]
    dita_folders = [f for f in folders if f.name.endswith("_dita")]

    for dita_dir in dita_folders:
        base_name = dita_dir.name.replace("_dita", "")
        html_dir_name = f"{base_name}_dita_html"
        html_dir = SOURCE_ROOT / html_dir_name
        
        if html_dir.exists():
            map_name = special_maps.get(base_name, base_name)
            regs.append({
                "name": base_name,
                "map_name": map_name,
                "map_dir": dita_dir.name,
                "html_dir": html_dir_name
            })
    
    return regs

def main():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Error: SUPABASE_URL and SUPABASE_KEY required in .env")
        return

    if not OPENROUTER_API_KEY:
        print("Error: OPENROUTER_API_KEY required in .env")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    openai_client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=OPENROUTER_API_KEY,
    )

    regulations = discover_regulations()
    
    print(f"Found {len(regulations)} regulations for ingestion:")
    for r in regulations:
        print(f" - {r['name']} (Map: {r['map_name']})")

    for reg in regulations:
        process_regulation(reg, supabase, openai_client)

    print("\n✅ Universal Ingestion Complete!")

if __name__ == "__main__":
    main()
