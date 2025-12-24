'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Bot, User, ExternalLink, BookOpen } from 'lucide-react'

interface Source {
    id?: string
    regulation: string
    section: string
    title: string
    similarityScore?: number
}

interface MessageBubbleProps {
    role: 'user' | 'assistant'
    content: string
    sources?: Source[] | undefined
}

export function MessageBubble({ role, content, sources }: MessageBubbleProps) {
    // Render sources section
    const renderSources = () => {
        if (!sources || sources.length === 0) return null

        return (
            <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="font-medium">Sources</span>
                </div>
                <div className="space-y-1.5">
                    {sources.map((source, idx) => (
                        <div
                            key={source.id || idx}
                            className="flex items-start gap-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors text-xs"
                        >
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/10 text-primary font-medium text-[10px] shrink-0">
                                {idx + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-foreground">
                                        {source.regulation} {source.section}
                                    </span>
                                    {source.similarityScore && (
                                        <span className="text-[10px] px-1 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400">
                                            {Math.round(source.similarityScore * 100)}% match
                                        </span>
                                    )}
                                </div>
                                {source.title && (
                                    <p className="text-muted-foreground truncate mt-0.5">
                                        {source.title}
                                    </p>
                                )}
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

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
                        : "bg-muted border-border text-muted-foreground"
                )}>
                    {role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
                </div>

                {/* Bubble */}
                <div className={cn(
                    "p-4 rounded-lg text-sm shadow-sm border",
                    role === 'user'
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-card-foreground border-border"
                )}>
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
                    {role === 'assistant' && renderSources()}
                </div>
            </div>
        </motion.div>
    )
}
