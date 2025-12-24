# RAG Reference Materials

This directory contains reference materials for the RAG (Retrieval-Augmented Generation) pipeline.

## Contents

### Document Processing
- **chunking_strategy.md** - How documents are chunked for embedding
- **metadata_schema.md** - Metadata structure for document chunks
- **embedding_config.md** - Embedding model configuration

### Regulatory Sources
- **FAR_structure.md** - Federal Acquisition Regulation hierarchy
- **DFARS_structure.md** - Defense Federal Acquisition Regulation Supplement
- **citation_format.md** - Standard citation formats for regulations

### Best Practices
- **prompt_engineering.md** - Effective prompts for regulatory Q&A
- **source_citation.md** - How to cite sources in responses
- **evaluation_metrics.md** - Measuring RAG quality

## Quick Reference

### Citation Format
```
[FAR 1.101] - Section reference
[DFARS 252.234-7001] - DFARS reference
[Title 48 CFR Chapter 1] - Full reference
```

### Metadata Fields
```json
{
  "regulation": "FAR",
  "section": "1.101",
  "title": "Scope of part",
  "part": 1,
  "subpart": "A",
  "href": "https://www.acquisition.gov/far/1.101"
}
```

### Chunking Strategy
- **Chunk Size:** 1000 characters
- **Overlap:** 200 characters
- **Method:** Recursive character text splitting
