-- Migration: Add Foreign Key Indexes for Query Performance
-- Created: 2024-12-24
-- Description: Adds indexes on foreign key columns to improve JOIN performance

-- ============================================
-- FOREIGN KEY INDEXES
-- ============================================

-- Index on user_usage.user_id for user lookups
CREATE INDEX IF NOT EXISTS idx_user_usage_user_id
  ON public.user_usage(user_id);

-- Index on conversations.user_id for user's conversation list
CREATE INDEX IF NOT EXISTS idx_conversations_user_id
  ON public.conversations(user_id);

-- Index on messages.conversation_id for message retrieval
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id
  ON public.messages(conversation_id);

-- Index on chat_sources.message_id for source lookups
CREATE INDEX IF NOT EXISTS idx_chat_sources_message_id
  ON public.chat_sources(message_id);

-- Index on chat_sources.chunk_id for document chunk references
CREATE INDEX IF NOT EXISTS idx_chat_sources_chunk_id
  ON public.chat_sources(chunk_id);

-- ============================================
-- COMPOSITE INDEXES FOR COMMON QUERY PATTERNS
-- ============================================

-- Composite index for fetching user's conversations sorted by recent activity
CREATE INDEX IF NOT EXISTS idx_conversations_user_updated
  ON public.conversations(user_id, updated_at DESC);

-- Index for user_usage date-based lookups (rate limiting checks)
CREATE INDEX IF NOT EXISTS idx_user_usage_date
  ON public.user_usage(date);

-- Index for user_usage composite lookup (user + date for daily limits)
CREATE INDEX IF NOT EXISTS idx_user_usage_user_date
  ON public.user_usage(user_id, date);
