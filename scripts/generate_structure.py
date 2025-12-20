import os
import json
import xml.etree.ElementTree as ET
from pathlib import Path

# Configuration
SOURCE_ROOT = Path(__file__).parent.parent / "source_content"
OUTPUT_FILE = Path(__file__).parent.parent / "app/src/data/regulations.json"

class StructureBuilder:
    def __init__(self, map_path: Path):
        self.map_path = map_path
        self.tree = ET.parse(str(map_path))
        self.root = self.tree.getroot()
        self.regulation_name = map_path.stem.split('.')[0] # e.g., "FAR"

    def build(self):
        """Builds a nested dictionary structure from the DITA map."""
        
        def _process_element(elem, level=0):
            navtitle = elem.get("navtitle")
            href = elem.get("href")
            outputclass = elem.get("outputclass", "unknown")
            
            # Skip if no title/link (unless it has children)
            if not navtitle and not elem.findall("topicref"):
                return None

            node = {
                "id": f"{self.regulation_name}-{os.urandom(4).hex()}", # Temporary ID
                "title": navtitle or "Untitled",
                "type": outputclass,
                "children": []
            }

            # Try to get a better ID from href if possible
            if href:
                # e.g. "FAR_Part_1.dita" -> "FAR_Part_1"
                node["id"] = Path(href).stem

            # Recurse
            for child in elem:
                if child.tag == "topicref":
                    child_node = _process_element(child, level + 1)
                    if child_node:
                        node["children"].append(child_node)
            
            return node

        # Start traversal
        structure = []
        for child in self.root:
            if child.tag == "topicref":
                node = _process_element(child)
                if node:
                    structure.append(node)
        
        return {
            "id": self.regulation_name,
            "title": f"{self.regulation_name} Regulation",
            "type": "regulation",
            "children": structure
        }

def main():
    regulations = [
        {"name": "FAR", "map_dir": "FAR_dita"},
        {"name": "DFARS", "map_dir": "DFARS_dita"},
    ]
    
    full_toc = []
    
    for reg in regulations:
        map_path = SOURCE_ROOT / reg["map_dir"] / f"{reg['name']}.ditamap"
        if not map_path.exists():
            print(f"Skipping {reg['name']}, map not found.")
            continue
            
        print(f"Processing {reg['name']}...")
        builder = StructureBuilder(map_path)
        full_toc.append(builder.build())
        
    # Ensure directory exists
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(full_toc, f, indent=2)
        
    print(f"Structure saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
