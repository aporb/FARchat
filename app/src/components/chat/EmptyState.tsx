'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Scale, Shield, Lightbulb, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
    onSuggestionClick: (text: string) => void
    className?: string
}

const quickStartItems = [
    {
        icon: FileText,
        title: 'Contract Clauses',
        description: 'Learn about required clauses and their applications',
        question: 'What clauses are required in fixed-price contracts?',
        color: 'bg-blue-500/10 text-blue-600 group-hover:bg-blue-500/20',
    },
    {
        icon: Scale,
        title: 'Competition Requirements',
        description: 'Understand full and open competition rules',
        question: 'When can I use other than full and open competition?',
        color: 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20',
    },
    {
        icon: Shield,
        title: 'Compliance',
        description: 'Stay compliant with federal acquisition rules',
        question: 'What are the key compliance requirements for government contractors?',
        color: 'bg-green-500/10 text-green-600 group-hover:bg-green-500/20',
    },
    {
        icon: Lightbulb,
        title: 'Best Practices',
        description: 'Get guidance on procurement best practices',
        question: 'What are best practices for source selection?',
        color: 'bg-purple-500/10 text-purple-600 group-hover:bg-purple-500/20',
    },
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export function EmptyState({ onSuggestionClick, className }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "flex flex-col items-center justify-center h-full text-center px-4 py-8",
                className
            )}
        >
            {/* Logo/Icon */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative mb-6"
            >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">🦅</span>
                </div>
                {/* Decorative rings */}
                <div className="absolute inset-0 w-20 h-20 rounded-2xl border-2 border-primary/10 animate-ping" style={{ animationDuration: '3s' }} />
            </motion.div>

            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold tracking-tight mb-2"
            >
                How can I help with the FAR today?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground max-w-md mb-8"
            >
                Ask questions about Federal Acquisition Regulations, DFARS, contract clauses, or procurement best practices.
            </motion.p>

            {/* Quick Start Cards */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl"
            >
                {quickStartItems.map((cardItem, idx) => {
                    const Icon = cardItem.icon
                    return (
                        <motion.button
                            key={idx}
                            variants={item}
                            onClick={() => onSuggestionClick(cardItem.question)}
                            className="group p-4 rounded-xl border bg-card hover:bg-accent/50 text-left transition-all duration-200 hover:shadow-md hover:border-primary/20"
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                    cardItem.color
                                )}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                            {cardItem.title}
                                        </h3>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                        {cardItem.description}
                                    </p>
                                </div>
                            </div>
                        </motion.button>
                    )
                })}
            </motion.div>

            {/* Keyboard hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-xs text-muted-foreground"
            >
                <span className="inline-flex items-center gap-1.5">
                    Press <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Enter</kbd> to send your message
                </span>
            </motion.div>
        </motion.div>
    )
}
