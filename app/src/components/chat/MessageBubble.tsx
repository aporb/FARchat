'use client'

import React, { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Bot, User } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { CitationList, Citation } from './CitationCard'
import { MessageActions } from './MessageActions'

interface MessageBubbleProps {
    role: 'user' | 'assistant'
    content: string
    sources?: Citation[] | undefined
    messageId?: string | undefined
    isStreaming?: boolean | undefined
    timestamp?: Date | undefined
}

export function MessageBubble({ role, content, sources, messageId, isStreaming, timestamp }: MessageBubbleProps) {
    const [showTimestamp, setShowTimestamp] = useState(false)

    // Handlers for hover/touch to show timestamp
    const handleInteractionStart = useCallback(() => {
        setShowTimestamp(true)
    }, [])

    const handleInteractionEnd = useCallback(() => {
        setShowTimestamp(false)
    }, [])

    // Format timestamp for display
    const formattedTimestamp = timestamp
        ? formatDistanceToNow(timestamp, { addSuffix: true })
        : 'just now'

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "flex w-full mb-6",
                role === 'user' ? "justify-end" : "justify-start"
            )}
        >
            <div className={cn(
                "flex max-w-[85%] md:max-w-[75%] gap-x-3",
                role === 'user' ? "flex-row-reverse" : "flex-row"
            )}>
                {/* Avatar */}
                <div className={cn(
                    "w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border shadow-sm",
                    role === 'assistant'
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-federal-navy dark:bg-blue-600 border-federal-navy dark:border-blue-600 text-white"
                )}>
                    {role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                </div>

                {/* Bubble */}
                <div
                    onMouseEnter={handleInteractionStart}
                    onMouseLeave={handleInteractionEnd}
                    onTouchStart={handleInteractionStart}
                    onTouchEnd={handleInteractionEnd}
                    className={cn(
                        "p-4 rounded-lg text-sm shadow-sm border relative",
                        role === 'user'
                            ? "bg-federal-navy dark:bg-blue-600 text-white border-federal-navy dark:border-blue-600"
                            : "bg-card text-card-foreground border-border"
                    )}
                >
                    {role === 'user' ? (
                        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-headings:font-semibold prose-a:text-primary prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-primary/80">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    code({ className, children, ...props }: any) {
                                        const match = /language-(\w+)/.exec(className || '')
                                        return match ? (
                                            <div className="relative rounded-md border bg-muted/50 p-2 my-2">
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            </div>
                                        ) : (
                                            <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                                                {children}
                                            </code>
                                        )
                                    }
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    )}

                    {/* Sources Section */}
                    {role === 'assistant' && sources && sources.length > 0 && (
                        <CitationList citations={sources} />
                    )}

                    {/* Message Actions - only show when not streaming */}
                    {role === 'assistant' && content && !isStreaming && (
                        <MessageActions
                            content={content}
                            messageId={messageId}
                            variant="default"
                        />
                    )}

                    {/* Timestamp on hover/tap */}
                    <AnimatePresence>
                        {showTimestamp && (
                            <motion.span
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.15 }}
                                className={cn(
                                    "absolute -bottom-5 text-xs text-muted-foreground",
                                    role === 'user' ? "right-0" : "left-0"
                                )}
                            >
                                {formattedTimestamp}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}
