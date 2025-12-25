'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb, MessageCircle, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Suggestion {
    text: string
    type?: 'followup' | 'related' | 'example'
}

interface SuggestionChipsProps {
    suggestions: Suggestion[]
    onSelect: (suggestion: string) => void
    className?: string
    disabled?: boolean
}

const typeConfig = {
    followup: {
        icon: ArrowRight,
        color: 'hover:bg-primary/10 hover:border-primary/30 hover:text-primary',
    },
    related: {
        icon: Lightbulb,
        color: 'hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-600',
    },
    example: {
        icon: HelpCircle,
        color: 'hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-600',
    },
}

export function SuggestionChips({
    suggestions,
    onSelect,
    className,
    disabled = false
}: SuggestionChipsProps) {
    if (!suggestions || suggestions.length === 0) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={cn("mt-4", className)}
        >
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="font-medium">Follow-up questions</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, idx) => {
                    const config = typeConfig[suggestion.type || 'followup']
                    const Icon = config.icon

                    return (
                        <motion.button
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: idx * 0.05 }}
                            onClick={() => !disabled && onSelect(suggestion.text)}
                            disabled={disabled}
                            className={cn(
                                "group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full",
                                "text-xs font-medium text-muted-foreground",
                                "bg-background border border-border",
                                "transition-all duration-200",
                                disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : cn("cursor-pointer", config.color)
                            )}
                        >
                            <Icon className="w-3 h-3 shrink-0" />
                            <span className="line-clamp-1">{suggestion.text}</span>
                        </motion.button>
                    )
                })}
            </div>
        </motion.div>
    )
}

// Default suggestions for empty state or initial conversation
export const defaultSuggestions: Suggestion[] = [
    { text: 'What are the key requirements of FAR Part 15?', type: 'example' },
    { text: 'Explain the simplified acquisition threshold', type: 'example' },
    { text: 'How do I evaluate past performance?', type: 'example' },
    { text: 'What is a sole source justification?', type: 'example' },
]

// Generate follow-up suggestions based on context
export function generateFollowUpSuggestions(topic: string): Suggestion[] {
    // This would ideally be more intelligent, but for now we provide contextual defaults
    const suggestions: Suggestion[] = [
        { text: `What are the exceptions to ${topic}?`, type: 'followup' },
        { text: `How does ${topic} apply to small businesses?`, type: 'related' },
        { text: 'Can you provide an example?', type: 'example' },
    ]
    return suggestions
}
