'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ExternalLink, Copy, Check, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'

export interface Citation {
    id?: string
    regulation: string
    section: string
    title: string
    content?: string
    similarityScore?: number
}

interface CitationCardProps {
    citation: Citation
    index: number
    className?: string
}

export function CitationCard({ citation, index, className }: CitationCardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation()
        const text = `${citation.regulation} ${citation.section}: ${citation.title}`
        await navigator.clipboard.writeText(text)
        setCopied(true)
        toast.success('Citation copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    const getMatchColor = (score?: number) => {
        if (!score) return 'bg-gray-100 text-gray-600'
        if (score >= 0.9) return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
        if (score >= 0.75) return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    }

    return (
        <motion.div
            layout
            className={cn(
                "rounded-lg border bg-gradient-to-br from-background to-muted/20 overflow-hidden transition-shadow hover:shadow-md",
                isExpanded && "shadow-md",
                className
            )}
        >
            {/* Header - Always visible */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-start gap-3 p-3 text-left hover:bg-muted/50 transition-colors"
            >
                {/* Index Badge */}
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary font-semibold text-xs shrink-0 mt-0.5">
                    {index + 1}
                </span>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">
                            {citation.regulation} {citation.section}
                        </span>
                        {citation.similarityScore && (
                            <span className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                                getMatchColor(citation.similarityScore)
                            )}>
                                {Math.round(citation.similarityScore * 100)}% match
                            </span>
                        )}
                    </div>
                    {citation.title && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {citation.title}
                        </p>
                    )}
                </div>

                {/* Expand Chevron */}
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                >
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t"
                    >
                        <div className="p-3 space-y-3">
                            {/* Full Title */}
                            {citation.title && (
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1">Title</p>
                                    <p className="text-sm text-foreground">{citation.title}</p>
                                </div>
                            )}

                            {/* Content Preview if available */}
                            {citation.content && (
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground mb-1">Preview</p>
                                    <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-md line-clamp-3">
                                        {citation.content}
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-1">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs gap-1.5"
                                            onClick={handleCopy}
                                        >
                                            {copied ? (
                                                <Check className="w-3 h-3 text-green-500" />
                                            ) : (
                                                <Copy className="w-3 h-3" />
                                            )}
                                            Copy
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Copy citation</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs gap-1.5"
                                            asChild
                                        >
                                            <a
                                                href={`https://www.acquisition.gov/far/${citation.section.toLowerCase().replace(/\s+/g, '-')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                View Source
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Open in acquisition.gov</TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

interface CitationListProps {
    citations: Citation[]
    className?: string
}

export function CitationList({ citations, className }: CitationListProps) {
    if (!citations || citations.length === 0) return null

    return (
        <div className={cn("mt-4 pt-3 border-t border-border/50", className)}>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="font-medium">Sources ({citations.length})</span>
            </div>
            <div className="space-y-2">
                {citations.map((citation, idx) => (
                    <CitationCard
                        key={citation.id || idx}
                        citation={citation}
                        index={idx}
                    />
                ))}
            </div>
        </div>
    )
}
