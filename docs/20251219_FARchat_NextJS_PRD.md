# FARchat Product Requirements Document (PRD)
**Version:** 2.0 (Next.js Re-Architecture)
**Date:** December 19, 2025
**Status:** DRAFT

> [!IMPORTANT]
> This PRD supersedes all previous planning documents in the `planning/` directory.

---

## 1. Executive Summary
FARchat is an AI-powered regulatory assistant for federal contracting professionals (GS-1102s). It provides instant, cited answers to complex questions about the Federal Acquisition Regulation (FAR) and Defense Federal Acquisition Regulation Supplement (DFARS).

**Key Pivot:** The application will be built as a modern **Next.js 16** web application using **Supabase** for the backend (Auth, Database, Vector) and deployed on **Vercel**.

## 2. Business Requirements

### 2.1 Core Value Proposition
*   **Speed:** Reduce regulatory research time by 80%.
*   **Accuracy:** All answers must strictly cite specific FAR/DFARS parts and subparts.
*   **Accessibility:** Freemium ease-of-access to lower friction for new users.

### 2.2 User Types & Monetization
1.  **Guest (Unregistered)**
    *   **Access:** Landing Page, About, Legal.
    *   **Limit:** 5 free RAG queries per device.
    *   **Data:** LocalStorage only. History lost on cache clear.
2.  **Registered User ("Free Tire Kicker")**
    *   **Access:** Unlimited Dashboard (temporarily, until Pro tier defined).
    *   **Auth:** Email/Magic Link.
    *   **Data:** Saved chat history in Supabase.
3.  **Pro User (Future Scope)**
    *   **Features:** "Teams", "Export to Word", "Comparison Tools".
4.  **Admin**
    *   **Access:** `/admin` dashboard.
    *   **Features:** View user stats, manage ingestion jobs.

### 2.3 Site Structure (Sitemap)
*   `/` (Landing Page): Value prop, "Try it now" hero chat.
*   `/about` (About Page): Mission, Team, "Why FARchat?".
*   `/login` (Auth): Clean login form.
*   `/chat` (App): The core RAG interface (Protected).
*   `/legal/*`:
    *   `/privacy`: Data handling policy.
    *   `/terms`: Usage terms.

### 2.4 Branding & Design
*   **Identity:** "Government-Grade Professional".
*   **Palette:** Federal Navy (#1B263B), Professional Blue (#2E5266), Clean White background. Use the existing design system in `app/globals.css`.
*   **Components:** **shadcn/ui** (Radix UI + Tailwind CSS).
*   **Typography:** Inter (Headers), JetBrains Mono (Citations/Code).

## 3. Technical Architecture

### 3.1 Stack Strategy
*   **Frontend:** **Next.js 16** (App Router).
    *   *Features:* Cache Components, Stable Turbopack.
*   **UI Framework:** Tailwind CSS 4 + shadcn/ui.
*   **Deployment:** Vercel (Production).
*   **Backend-as-a-Service (BaaS):** **Supabase**.
    *   **Database:** PostgreSQL.
    *   **Auth:** Supabase Auth (Email/Magic Link/Social).
    *   **Vector Query:** `pgvector` extension on Supabase.
*   **AI/LLM:** **OpenRouter** (primary) or **DeepSeek** (direct).
    *   *Default Model:* `deepseek/deepseek-chat` or `deepseek/deepseek-v3`.
*   **Data Processing:** Python scripts (running locally or in a separate worker) to scrape/ingest FAR data into Supabase using OpenAI-compatible embeddings.

### 3.2 Data Strategy (RAG Pipeline)
*   **Source:** Acquisition.gov (HTML/XML bulk downloads).
*   **Ingestion:**
    1.  **Scrape:** Download structured HTML/XML.
    2.  **Chunk:** Split by Subpart (e.g., "12.203") rather than arbitrary character counts to preserve regulatory context.
    3.  **Embed:** Generate embeddings (OpenAI `text-embedding-3-small` or similar).
    4.  **Store:** Insert into Supabase `document_chunks` table with vectors.
*   **Updates:** Weekly cron job to check for FAR/DFARS updates.

### 3.3 Database Schema (Conceptual)
*   `profiles`: Users (linked to Supabase Auth).
*   `access_logs`: Tracking query counts for rate limiting and guest quotas.
*   `chats`: Conversation threads.
*   `messages`: Individual Q&A pairs.
*   `document_chunks`: RAG vector store.
    *   `content`: Text.
    *   `embedding`: vector(1536).
    *   `metadata`: JSON (Part, Subpart, Effective Date).

## 4. User Flows

### 4.1 The "5-Query" Funnel
1.  **Landing:** User arrives at `farchat.app`.
2.  **Trial:** User types a question in the Hero chat box.
    *   *System:* Checks `localStorage` query count.
    *   *System:* If count < 5, execute RAG query. Increment count.
    *   *UI:* Show answer + "3 free queries remaining" badge.
3.  **Conversion:** User types 6th question.
    *   *UI:* Blocks request. Shows "Create Free Account to Continue".
4.  **Onboarding:** User signs up (Magic Link). Use Supabase Auth.
5.  **Retention:** User is redirected back to chat with history preserved (optional, but nice to have).

## 5. Workflows & Development Plan

### Phase 1: Foundation (Current Status)
*   [x] Landing Page (UI Skeleton) - **Exists in `app/`**.
*   [ ] Set up Supabase Project (Auth + DB).
*   [ ] Connect Next.js to Supabase.

### Phase 2: Data & RAG
*   [ ] Build "Ingestion Script" (Python recommended for robust parsing).
*   [ ] Scrape Acquisition.gov.
*   [ ] populate `document_chunks` in Supabase.
*   [ ] Create Next.js API Route for Chat (`POST /api/chat`).
    *   Logic: Retrieve Context -> Call LLM -> Stream Response.

### Phase 3: The "Hook" (Auth & Limits)
*   [ ] Implement "Guest Query Counter" (Client-side + Edge Middleware).
*   [ ] Implement Supabase Auth UI.
*   [ ] Build gatekeeping logic.

## 6. Research Questions

### Business
*   **Q1:** For the "5 free queries", do we strictly block based on IP/Device? (Easier to bypass but user-friendly) or use a temporary anonymous session ID?
    *   *Recommendation:* Use `localStorage` + Session Cookie. Accept that determined users can incognito-bypass for now (low stakes for Alpha).
*   **Q2:** Do we need a "Teams" feature immediately?
    *   *Assumption:* No, focus on single-player utility first.

### Technical
*   **Q3:** "Versace database" - This is almost certainly **Vercel Postgres** or a typo for **Supabase**.
    *   *Decision:* We will use **Supabase** because it bundles Auth + Vector + DB perfectly for this Freemium flow. Vercel Postgres is great but requires separate Auth solution (like Clerk or NextAuth). Supabase is "all-in-one".
*   **Q4:** Ingestion reliability?
    *   *Risk:* Acquisition.gov HTML structure might change.
    *   *Mitigation:* Use the XML bulk download if available (Data.gov/GitHub) effectively.

## 7. Branding & Content Guidelines
*   **Tone:** "Trusted Advisor". No emojis in regulatory answers. Precise language.
*   **Citations:** Every claim must link to the source text (e.g., "[FAR 12.203]").
*   **Visuals:** Clean, high-contrast, Section 508 compliant.

---
**Prepared by Antigravity**
