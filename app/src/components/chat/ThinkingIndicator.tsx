'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Search, FileText, Sparkles, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ThinkingIndicatorProps {
    isVisible: boolean
    className?: string
    /** Optional progress value (0-100) for real progress tracking */
    progress?: number
}

const phases = [
    { icon: Search, text: 'Searching regulations...', duration: 2000 },
    { icon: FileText, text: 'Analyzing FAR sections...', duration: 2500 },
    { icon: Sparkles, text: 'Generating response...', duration: 3000 },
]

export function ThinkingIndicator({ isVisible, className, progress }: ThinkingIndicatorProps) {
    const [currentPhase, setCurrentPhase] = useState(0)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        if (!isVisible) {
            setCurrentPhase(0)
            return
        }

        const advancePhase = () => {
            setCurrentPhase(prev => {
                // Cycle through phases, staying on the last one
                if (prev < phases.length - 1) {
                    return prev + 1
                }
                return prev
            })
        }

        // Start timer based on current phase duration
        const timer = setTimeout(advancePhase, phases[currentPhase]?.duration || 2000)

        return () => clearTimeout(timer)
    }, [isVisible, currentPhase])

    if (!isVisible) return null

    const CurrentIcon = phases[currentPhase]?.icon || Search
    const currentText = phases[currentPhase]?.text || 'Thinking...'
    const calculatedProgress = progress ?? ((currentPhase + 1) / phases.length) * 100

    // Simplified view for reduced motion - still functional but less distracting
    if (prefersReducedMotion) {
        return (
            <div
                className={cn("flex w-full mb-6 justify-start", className)}
                role="status"
                aria-live="polite"
                aria-label={currentText}
            >
                <div className="flex max-w-[85%] md:max-w-[75%] gap-x-3">
                    <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border shadow-sm bg-primary border-primary text-primary-foreground">
                        <Bot size={18} />
                    </div>
                    <div className="p-4 rounded-lg text-sm shadow-sm border bg-card text-card-foreground border-border min-w-[200px]">
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-4 h-4 text-primary" aria-hidden="true" />
                            <span className="text-sm text-muted-foreground">{currentText}</span>
                        </div>
                        <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary/50 transition-all duration-300"
                                style={{ width: `${calculatedProgress}%` }}
                                role="progressbar"
                                aria-valuenow={Math.round(calculatedProgress)}
                                aria-valuemin={0}
                                aria-valuemax={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={cn("flex w-full mb-6 justify-start", className)}
            role="status"
            aria-live="polite"
            aria-label={currentText}
        >
            <div className="flex max-w-[85%] md:max-w-[75%] gap-x-3">
                {/* Avatar */}
                <div className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border shadow-sm bg-primary border-primary text-primary-foreground">
                    <Bot size={18} aria-hidden="true" />
                </div>

                {/* Thinking Bubble */}
                <div className="p-4 rounded-lg text-sm shadow-sm border bg-card text-card-foreground border-border min-w-[200px]">
                    <div className="flex items-center gap-3">
                        {/* Animated Icon with spinner */}
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPhase}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-8 h-8 rounded-full bg-federal-navy/10 dark:bg-blue-600/20 flex items-center justify-center"
                                >
                                    <CurrentIcon className="w-4 h-4 text-federal-navy dark:text-blue-400" aria-hidden="true" />
                                </motion.div>
                            </AnimatePresence>
                            {/* Subtle pulsing ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-federal-navy/20 dark:border-blue-400/20"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentPhase}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm text-muted-foreground"
                                >
                                    {currentText}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* Animated dots */}
                        <div className="flex gap-1" aria-hidden="true">
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    className="w-1.5 h-1.5 bg-federal-navy dark:bg-blue-400 rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.4, 1, 0.4]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-federal-navy/50 dark:bg-blue-500/50"
                            initial={{ width: '0%' }}
                            animate={{ width: `${calculatedProgress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            role="progressbar"
                            aria-valuenow={Math.round(calculatedProgress)}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
