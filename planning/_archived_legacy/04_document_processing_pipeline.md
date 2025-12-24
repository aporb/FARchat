# Document Processing Pipeline - RAG Implementation

## Overview
Comprehensive pipeline for processing FAR/DFARS PDF documents into a searchable vector database. The system maintains a central repository of current FAR/DFARS regulations while also supporting user document uploads. Handles document ingestion, chunking, embedding generation, and storage for both official regulations and user-uploaded documents.

## Pipeline Architecture

### Stage 1: Document Ingestion
**Input**: PDF files (central repository FAR/DFARS + user uploads)
**Output**: Raw text with metadata and source classification

**Document Sources**:
1. **Central Repository Documents**
   - Current FAR (Federal Acquisition Regulation) - pre-loaded
   - Current DFARS (Defense Federal Acquisition Regulation Supplement) - pre-loaded
   - Automated quarterly updates from official sources
   - Version control with change tracking
   
2. **User-Uploaded Documents**
   - Organization-specific regulations and policies
   - Contract templates and historical documents
   - Industry-specific guidance and interpretations
   - Supporting documentation and references

**Processing Steps**:
1. **File Validation**
   - Check file format (PDF, DOCX, TXT for user uploads)
   - Validate file size (max 50MB)
   - Scan for malware/corruption
   - Extract basic metadata
   - Classify document source (central vs. user-uploaded)

2. **PDF Parsing**
   - Use `unstructured` library for robust parsing
   - Extract text, tables, and structural elements
   - Preserve document hierarchy (sections, subsections)
   - Handle complex layouts and formatting

3. **Text Cleaning**
   - Remove headers/footers
   - Clean OCR artifacts if present
   - Normalize whitespace and encoding
   - Fix common PDF extraction issues

### Stage 2: Document Chunking
**Input**: Clean text with structure
**Output**: Semantically meaningful chunks

**Chunking Strategy**:
- **Primary**: Recursive Character Text Splitter
- **Chunk Size**: 1000 characters
- **Overlap**: 200 characters (20% overlap)
- **Separators**: ["\n\n", "\n", ". ", " "]
- **Preserve**: Section boundaries and legal structure

**Advanced Chunking Logic**:
```python
chunking_config = {
    "chunk_size": 1000,
    "chunk_overlap": 200,
    "length_function": len,
    "keep_separator": True,
    "add_start_index": True,
    "strip_whitespace": True,
    "separators": [
        "\n\n",     # Paragraph breaks (highest priority)
        "\n",       # Line breaks
        ". ",       # Sentence endings
        " ",        # Word boundaries
        ""          # Character level (last resort)
    ]
}
```

### Stage 3: Metadata Extraction
**Purpose**: Enrich chunks with searchable metadata

**Metadata Fields**:
```json
{
    "document_id": "uuid",
    "document_name": "FAR-Part-12.pdf",
    "document_type": "FAR" | "DFARS",
    "section": "12.3",
    "subsection": "12.301",
    "title": "Acquisition Planning",
    "page_number": 15,
    "chunk_index": 42,
    "chunk_start_char": 1000,
    "chunk_end_char": 2000,
    "processed_timestamp": "2025-01-12T10:30:00Z",
    "content_type": "regulation" | "definition" | "example" | "table",
    "regulatory_level": "part" | "subpart" | "section" | "subsection"
}
```

**Extraction Logic**:
- Parse section numbering (12.301, 252.212-7, etc.)
- Identify content types (definitions, procedures, examples)
- Extract page references
- Classify regulatory hierarchy level

### Stage 4: Embedding Generation
**Model**: Sentence Transformers (all-MiniLM-L6-v2)
- **Dimensions**: 384
- **Local Deployment**: No API costs
- **Performance**: Fast inference (~50ms per chunk)

**Process**:
1. **Batch Processing**: Process chunks in batches of 32
2. **Normalization**: L2 normalize embeddings
3. **Validation**: Check embedding quality/consistency
4. **Storage**: Store with metadata in ChromaDB

### Stage 5: Vector Database Storage
**Database**: ChromaDB with persistent storage

**Collection Configuration**:
```python
collection_config = {
    "name": "far_dfars_knowledge_base",
    "embedding_function": SentenceTransformerEmbeddings(
        model_name="all-MiniLM-L6-v2"
    ),
    "metadata": {
        "description": "FAR/DFARS regulatory documents",
        "version": "2024",
        "created": "2025-01-12T10:00:00Z"
    }
}
```

**Storage Schema**:
- **ID**: Unique chunk identifier
- **Document**: Chunk text content
- **Embeddings**: 384-dimensional vector
- **Metadata**: Structured metadata dict

## Implementation Details

### PDF Processing Pipeline
```python
class DocumentProcessor:
    def __init__(self):
        self.embeddings = SentenceTransformerEmbeddings()
        self.text_splitter = RecursiveCharacterTextSplitter(**config)
        self.db = ChromaDB()
    
    async def process_document(self, file_path: str) -> ProcessingResult:
        # Stage 1: Parse PDF
        raw_text = await self.parse_pdf(file_path)
        
        # Stage 2: Extract metadata
        doc_metadata = await self.extract_document_metadata(raw_text)
        
        # Stage 3: Chunk document
        chunks = self.text_splitter.split_text(raw_text)
        
        # Stage 4: Enrich with metadata
        enriched_chunks = await self.enrich_chunks(chunks, doc_metadata)
        
        # Stage 5: Generate embeddings
        embeddings = await self.generate_embeddings(enriched_chunks)
        
        # Stage 6: Store in database
        doc_ids = await self.store_chunks(enriched_chunks, embeddings)
        
        return ProcessingResult(
            document_id=doc_metadata['document_id'],
            chunks_processed=len(chunks),
            storage_ids=doc_ids,
            processing_time=elapsed_time
        )
```

### Error Handling Strategy
**File-Level Errors**:
- Corrupted PDFs → Skip with notification
- OCR failures → Retry with different parser
- Size limits → Reject with clear message

**Chunk-Level Errors**:
- Empty chunks → Filter out automatically
- Encoding issues → Attempt repair/skip
- Embedding failures → Retry with exponential backoff

**Database Errors**:
- Connection failures → Queue for retry
- Storage full → Cleanup old data/notify admin
- Indexing errors → Rebuild index if needed

### Quality Assurance
**Content Validation**:
- Minimum chunk length (50 characters)
- Maximum chunk length (2000 characters)
- Text quality checks (detect gibberish)
- Duplicate detection and removal

**Embedding Quality**:
- Cosine similarity checks between similar chunks
- Embedding distribution analysis
- Outlier detection and review

**Metadata Accuracy**:
- Section number validation
- Page number consistency
- Document type classification accuracy

## Processing Configuration

### Performance Optimization
```python
processing_config = {
    "batch_size": 32,           # Embedding batch size
    "max_workers": 4,           # Parallel processing threads
    "chunk_queue_size": 1000,   # Memory management
    "embedding_cache": True,     # Cache frequent embeddings
    "progress_reporting": True,  # Real-time status updates
}
```

### Resource Management
- **Memory**: Stream processing for large documents
- **CPU**: Multi-threading for embedding generation
- **Disk**: Efficient temporary file handling
- **Network**: Minimize external API calls

### Monitoring and Logging
```python
metrics_to_track = [
    "documents_processed_total",
    "chunks_created_total", 
    "processing_time_seconds",
    "embedding_generation_time",
    "storage_operations_total",
    "errors_by_type_total"
]
```

## Integration Points

### Frontend Integration
- **Progress Updates**: Real-time processing status
- **Error Reporting**: User-friendly error messages
- **Success Confirmation**: Processing completion notifications

### Backend Integration
- **API Endpoints**: Document upload and status checking
- **Queue Management**: Background processing queue
- **Database Integration**: Seamless ChromaDB operations

## Testing Strategy

### Unit Tests
- PDF parsing accuracy
- Chunking logic validation
- Metadata extraction correctness
- Embedding generation consistency

### Integration Tests
- End-to-end pipeline testing
- Database storage/retrieval
- Error handling scenarios
- Performance benchmarking

### Quality Tests
- Regulatory content accuracy
- Search relevance validation
- Chunk boundary optimization
- Metadata completeness

## Success Metrics
- **Processing Speed**: < 2 minutes per 100-page document
- **Chunk Quality**: 95%+ meaningful chunks
- **Search Accuracy**: 90%+ relevant results in top 5
- **Error Rate**: < 5% processing failures
- **Storage Efficiency**: < 100MB per 1000 pages