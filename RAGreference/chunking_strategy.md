# Chunking Strategy for Regulatory Documents

## Overview

This document describes the document chunking strategy used in the FARchat RAG pipeline.

## Chunking Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| Chunk Size | 1000 characters | Target size for each chunk |
| Chunk Overlap | 200 characters | Overlap between consecutive chunks |
| Min Chunk Size | 100 characters | Minimum characters for a valid chunk |
| Max Chunk Size | 2000 characters | Maximum characters before forced split |

## Strategy: Recursive Character Text Splitting

We use a hierarchical approach to split documents:

1. **Primary Split:** Double newlines (`\n\n`) - separates paragraphs
2. **Secondary Split:** Single newlines (`\n`) - separates lines within paragraphs
3. **Tertiary Split:** Spaces - splits long lines into sentences
4. **Final Split:** Characters - hard limit at chunk size

### Splitting Priority
```
1. Try to split on paragraph breaks (\n\n)
2. If too long, split on line breaks (\n)
3. If still too long, split on sentences
4. If still too long, split on words
5. If still too long, split on characters
```

## Regulatory Document Considerations

### FAR Structure
- **Parts** (1-53) - Major divisions
- **Subparts** (A-Z) - Within parts
- **Sections** (1.100 - 53.999) - Individual requirements
- **Subsections** (1.100-1.101) - Subdivisions of sections

### Chunking Guidelines for Regulations

1. **Keep Related Sections Together**
   - Prefer keeping section + subsection in same chunk
   - Split before new section numbers

2. **Preserve Citations**
   - Keep `[ FAR X.Y ]` citations with their content
   - Don't split citation references from context

3. **Header Awareness**
   - Include section headers with content
   - Include part/subpart titles

### Example

```
Input:
FAR 15.403-1 - Definitions.
"Agency head" means the Secretary, the Deputy Secretary, ...

Chunk 1 (1000 chars):
FAR 15.403-1 - Definitions.
"Agency head" means the Secretary, the Deputy Secretary,
Administrator, or Deputy Administrator of the ...

Chunk 2 (overlap):
"Administrator, or Deputy Administrator of the ...
Contracting officer" means a person...
```

## Quality Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| Chunk coherence | >80% | Human evaluation of content coherence |
| Citation preservation | >95% | Citations kept with related content |
| Chunk coverage | 100% | All content is chunked |
| Overlap relevance | >70% | Overlap contains useful context |

## Code Reference

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", ". ", " ", ""],
    length_function=len,
    is_separator_regex=False
)
```

## Troubleshooting

### Problem: Chunks too short
**Solution:** Reduce chunk size or overlap

### Problem: Citations split from content
**Solution:** Increase chunk size or adjust separators

### Problem: Related requirements separated
**Solution:** Ensure section headers are included in chunks
