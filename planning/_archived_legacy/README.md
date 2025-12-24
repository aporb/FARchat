# Archived Legacy Planning Documents

These documents describe the **original architecture** that has been **deprecated**.

## Original Architecture (Now Archived)
- Streamlit frontend
- FastAPI backend
- ChromaDB vector store
- Local sentence transformer embeddings

## Current Architecture
See `/docs/` for current architecture documentation:
- Next.js 16 frontend with App Router
- Supabase backend (PostgreSQL + pgvector)
- Claude API for LLM
- OpenAI text-embedding-3-small for embeddings

## Why Archived?
The original weekend prototype plan used Python/Streamlit/FastAPI for rapid development.
The project pivoted to a Next.js/Supabase architecture for better scalability,
authentication, and deployment (Vercel).

**Archived Date:** December 2025
