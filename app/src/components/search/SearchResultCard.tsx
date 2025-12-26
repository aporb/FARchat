'use client'

import React from 'react'
import { ExternalLink, Copy, Bookmark, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getCitationUrl } from '@/lib/citations'

export interface SearchResult {
    id: string
    regulation: string
    section: string
    title: string
    excerpt: string
    relevance: number
}

interface SearchResultCardProps {
    result: SearchResult
    isBookmarked?: boolean
    onBookmark?: (id: string) => void
    className?: string
}

export function SearchResultCard({
    result,
    isBookmarked = false,
    onBookmark,
    className
}: SearchResultCardProps) {
    const [copied, setCopied] = React.useState(false)

    const citationText = `${result.regulation} ${result.section}`
    const citationUrl = getCitationUrl(result.regulation, result.section)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(citationText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={cn(
            "p-4 rounded-xl border bg-card hover:shadow-md transition-shadow",
            className
        )}>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                        variant="outline"
                        className="bg-federal-navy/10 dark:bg-blue-500/10 text-federal-navy dark:text-blue-300 border-federal-navy/20 dark:border-blue-500/30 font-mono"
                    >
                        {result.regulation}
                    </Badge>
                    <span className="font-mono text-sm font-medium">
                        {result.section}
                    </span>
                </div>

                {/* Actions - Touch friendly */}
                <div className="flex items-center gap-1 shrink-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="min-w-[40px] min-h-[40px]"
                        onClick={handleCopy}
                        aria-label={copied ? "Copied" : "Copy citation"}
                    >
                        {copied ? (
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                        ) : (
                            <Copy className="w-4 h-4" />
                        )}
                    </Button>

                    {onBookmark && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="min-w-[40px] min-h-[40px]"
                            onClick={() => onBookmark(result.id)}
                            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                        >
                            <Bookmark
                                className={cn(
                                    "w-4 h-4",
                                    isBookmarked && "fill-current text-amber-500"
                                )}
                            />
                        </Button>
                    )}
                </div>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-base mb-2 line-clamp-2">
                {result.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {result.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-federal-navy dark:bg-blue-500 rounded-full"
                            style={{ width: `${result.relevance}%` }}
                        />
                    </div>
                    <span className="text-xs text-muted-foreground">
                        {result.relevance}% match
                    </span>
                </div>

                {citationUrl && (
                    <a
                        href={citationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-federal-navy dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                        View source
                        <ExternalLink className="w-3 h-3" />
                    </a>
                )}
            </div>
        </div>
    )
}
