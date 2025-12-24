> [!WARNING]
> **DEPRECATED**: This document describes the legacy Python/Streamlit architecture. The project has pivoted to a Next.js/Supabase architecture. See `docs/` for current documentation.

# FARchat v0.0.1 - Project Overview & Architecture

## Project Vision
FARchat is a simple RAG-powered chatbot platform focused on Federal Acquisition Regulation (FAR) and Defense Federal Acquisition Regulation Supplement (DFARS) documents. The v0.0.1 alpha will be a minimal viable product with no user login and basic functionality.

## Core Objectives
- **Primary**: Answer questions about FAR/DFARS using RAG
- **Secondary**: Generate artifacts (documents, summaries, templates) based on regulations
- **Target**: Weekend implementation (2-3 days)
- **Scope**: Alpha version with core functionality only

## Technology Stack

### Frontend: Streamlit
**Why**: Rapid development, built-in chat components, file upload support
**Key Components**:
- `st.chat_message()` - Display chat messages
- `st.chat_input()` - User input field
- `st.file_uploader()` - PDF document uploads
- Session state management for chat history

### Backend: FastAPI
**Why**: High performance, automatic API docs, async support
**Key Endpoints**:
- `POST /chat` - Main chat endpoint
- `POST /upload` - Document upload and processing
- `GET /health` - Health check

### RAG Implementation: LangChain
**Why**: Comprehensive RAG framework, extensive document processing
**Components**:
- Document loaders (PDF processing)
- Text splitters (chunking strategy)
- Retrieval chains
- RAG pipelines

### Vector Database: ChromaDB
**Why**: Embedded option, simple setup, good performance
**Features**:
- Embedding storage and retrieval
- Similarity search
- Local deployment (no external dependencies)

### LLM: Claude Sonnet 4 API
**Why**: Latest Anthropic model, excellent reasoning, artifact generation
**Model**: Claude Sonnet 4 (claude-sonnet-4-20250514)
- Superior reasoning for complex regulatory queries
- Excellent at generating structured artifacts
- Good at following instructions for citations

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Streamlit     │    │    FastAPI      │    │   ChromaDB      │
│   Frontend      │◄──►│   Backend       │◄──►│  Vector Store   │
│                 │    │                 │    │                 │
│ - Chat UI       │    │ - RAG Logic     │    │ - Embeddings    │
│ - File Upload   │    │ - LLM Calls     │    │ - Similarity    │
│ - Artifacts     │    │ - Processing    │    │   Search        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  Claude API     │
                       │                 │
                       │ - Sonnet 4      │
                       │ + Embeddings    │
                       └─────────────────┘
```

## Key Features (v0.0.1)

### 1. RAG-Powered Q&A
- Upload FAR/DFARS PDFs
- Semantic search across documents  
- Context-aware responses
- Source citation

### 2. Chat Interface
- Persistent chat history
- Streaming responses
- Message formatting
- Error handling

### 3. Artifact Generation
- Document templates
- Compliance checklists
- Summary reports
- Regulation excerpts

### 4. Document Processing
- PDF ingestion and chunking
- Embedding generation
- Metadata extraction
- Storage in vector database

## Development Approach

### Weekend Timeline
- **Day 1**: Core RAG pipeline + Basic FastAPI backend
- **Day 2**: Streamlit frontend + Integration testing
- **Day 3**: Artifact generation + Polish + Deployment

### Minimal Viable Implementation
- Single document collection (combined FAR/DFARS)
- Basic chat interface (no user management)
- Simple artifact templates
- Local deployment only

### Technical Considerations
- **Chunking Strategy**: 1000 char chunks, 200 char overlap
- **Embedding Model**: Sentence Transformers (all-MiniLM-L6-v2) - local & free
- **Vector Store**: Local ChromaDB persistent storage
- **Memory Management**: Store last 10 chat exchanges
- **Error Handling**: Basic retry logic and user feedback
- **LLM Integration**: Anthropic Claude API with proper rate limiting

## Success Metrics
- Functional RAG pipeline processing FAR/DFARS
- Responsive chat interface
- Accurate source citations
- At least 3 artifact templates working
- Sub-2 second response times
- Deployable as single application

## Next Steps
1. Set up development environment
2. Implement document processing pipeline
3. Build FastAPI backend with core endpoints
4. Create Streamlit frontend
5. Integrate and test
6. Deploy locally
