'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Bot, User } from 'lucide-react'

interface MessageBubbleProps {
    role: 'user' | 'assistant'
    content: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {

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
                                    code({ node, className, children, ...props }: any) {
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
                </div>
            </div>
        </motion.div>
    )
}
