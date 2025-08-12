# FARchat Backend Architecture - FastAPI Implementation

## Overview
FastAPI-based backend service providing RAG functionality, document processing, and chat management. Designed for high performance and easy deployment.

## API Design

### Core Endpoints

#### 1. Chat Endpoint
```
POST /api/v1/chat
Content-Type: application/json

Request:
{
  "message": "What are the key requirements for procurement?",
  "session_id": "uuid",
  "include_sources": true,
  "max_context": 5
}

Response:
{
  "response": "Based on FAR regulations...",
  "sources": [
    {
      "document": "FAR-Part-12.pdf",
      "page": 15,
      "chunk": "Procurement requirements include...",
      "confidence": 0.89
    }
  ],
  "session_id": "uuid",
  "timestamp": "2025-01-12T10:30:00Z"
}
```

#### 2. Document Upload Endpoint
```
POST /api/v1/upload
Content-Type: multipart/form-data

Request:
- file: PDF file
- metadata: {title, description, category}

Response:
{
  "document_id": "uuid",
  "filename": "FAR-2024.pdf",
  "status": "processing",
  "chunks_created": 0,
  "estimated_completion": "2025-01-12T10:35:00Z"
}
```

#### 3. Artifact Generation Endpoint
```
POST /api/v1/artifacts
Content-Type: application/json

Request:
{
  "type": "compliance_checklist",
  "context": "Contract requirements for IT services",
  "parameters": {
    "contract_type": "services",
    "value_threshold": 100000
  }
}

Response:
{
  "artifact_id": "uuid",
  "type": "compliance_checklist",
  "content": "# Compliance Checklist\n\n1. FAR 12.3...",
  "format": "markdown",
  "download_url": "/api/v1/artifacts/uuid/download"
}
```

#### 4. Health Check
```
GET /api/v1/health

Response:
{
  "status": "healthy",
  "version": "0.0.1",
  "database": "connected",
  "embedding_service": "ready",
  "documents_loaded": 25
}
```

## Core Services Architecture

### 1. Document Processing Service
**Purpose**: Handle PDF ingestion, chunking, and embedding generation

**Components**:
- PDF Parser (using unstructured/PyPDF)
- Text Chunker (LangChain RecursiveCharacterTextSplitter)
- Embedding Generator (Sentence Transformers)
- Metadata Extractor

**Flow**:
```
PDF Upload → Parse → Chunk → Generate Embeddings → Store in ChromaDB
     ↓
Update Status → Notify Frontend
```

### 2. RAG Service
**Purpose**: Handle retrieval-augmented generation for chat queries

**Components**:
- Query Encoder (same embedding model)
- Vector Search (ChromaDB)
- Context Retriever
- Response Generator (Claude Sonnet 4)

**Flow**:
```
User Query → Embed → Search → Retrieve Context → Generate Response
                                     ↓
                            Format with Sources
```

### 3. Artifact Generation Service
**Purpose**: Create structured documents based on regulations

**Templates**:
- Compliance Checklists
- Contract Templates  
- Summary Reports
- Regulation Extracts

**Flow**:
```
Template Request → Query Regulations → Generate Content → Format → Return
```

### 4. Session Management Service
**Purpose**: Track chat sessions and history (simple in-memory for v0.0.1)

**Features**:
- Session creation/retrieval
- Message history storage
- Context window management
- Cleanup old sessions

## Technical Implementation

### Database Schema (ChromaDB)
```python
Collection: "far_dfars_docs"
Schema:
- id: str (chunk ID)
- embeddings: List[float] (384-dim vectors)
- documents: str (chunk text)
- metadatas: dict {
    "document_name": str,
    "page_number": int,
    "chunk_index": int,
    "document_type": str ("FAR"|"DFARS"),
    "section": str,
    "processed_at": datetime
}
```

### FastAPI Application Structure
```
app/
├── main.py                 # FastAPI app initialization
├── api/
│   ├── __init__.py
│   ├── chat.py            # Chat endpoints
│   ├── documents.py       # Document management
│   ├── artifacts.py       # Artifact generation
│   └── health.py          # Health checks
├── services/
│   ├── __init__.py
│   ├── rag_service.py     # RAG logic
│   ├── document_service.py # PDF processing
│   ├── artifact_service.py # Template generation
│   └── claude_service.py   # Claude API wrapper
├── models/
│   ├── __init__.py
│   ├── chat.py            # Pydantic models
│   ├── documents.py       # Document models
│   └── artifacts.py       # Artifact models
├── core/
│   ├── __init__.py
│   ├── config.py          # Configuration
│   ├── database.py        # ChromaDB setup
│   └── dependencies.py    # FastAPI dependencies
└── utils/
    ├── __init__.py
    ├── embeddings.py      # Embedding utilities
    └── pdf_parser.py      # PDF processing utils
```

### Configuration Management
```python
# Environment Variables
CLAUDE_API_KEY=your_api_key
CHROMA_PERSIST_DIR=./chroma_db
LOG_LEVEL=INFO
MAX_UPLOAD_SIZE=50MB
MAX_CHUNKS_PER_DOC=500
EMBEDDING_MODEL=all-MiniLM-L6-v2
```

### Error Handling Strategy
- **HTTP Status Codes**: Standard REST codes
- **Error Models**: Consistent error response format
- **Logging**: Structured logging with correlation IDs
- **Retry Logic**: Exponential backoff for external APIs
- **Validation**: Pydantic models for request/response validation

### Performance Considerations
- **Async Operations**: All I/O operations async
- **Connection Pooling**: Efficient database connections
- **Caching**: Response caching for common queries
- **Rate Limiting**: Prevent API abuse
- **Batch Processing**: Efficient document processing

### Security Measures
- **Input Validation**: Sanitize all inputs
- **File Upload Security**: Validate PDF files
- **API Rate Limiting**: Prevent abuse
- **Error Message Sanitization**: No sensitive data leakage
- **CORS Configuration**: Proper frontend integration

## Integration Points

### Claude API Integration
```python
# Service wrapper for Claude API
class ClaudeService:
    async def generate_response(
        self, 
        query: str, 
        context: List[str],
        system_prompt: str = None
    ) -> str:
        # Format prompt with context
        # Call Claude API
        # Handle rate limits and errors
        # Return formatted response
```

### ChromaDB Integration
```python
# Database service for vector operations
class ChromaService:
    async def add_documents(self, docs: List[Document]) -> List[str]
    async def search_similar(self, query: str, k: int = 5) -> List[Document]
    async def get_collection_stats(self) -> Dict
```

### Background Task Processing
- **Document Processing**: Long-running PDF processing
- **Embedding Generation**: Batch embedding creation
- **Cleanup Tasks**: Session and temporary file cleanup

## Development Priorities

### Phase 1 (Day 1)
- Basic FastAPI setup
- Document upload endpoint
- Simple RAG pipeline
- Claude API integration

### Phase 2 (Day 2)
- Enhanced error handling
- Artifact generation
- Session management
- Performance optimization

### Phase 3 (Day 3)
- Testing and debugging
- Documentation
- Deployment preparation
- Monitoring setup

## Testing Strategy
- **Unit Tests**: Service layer testing
- **Integration Tests**: API endpoint testing
- **End-to-end Tests**: Full RAG pipeline
- **Load Testing**: Performance validation
- **Error Scenario Testing**: Edge case handling