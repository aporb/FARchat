'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, ThumbsUp, ThumbsDown, Share2, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'

interface MessageActionsProps {
    content: string
    messageId?: string | undefined
    className?: string | undefined
    variant?: 'default' | 'compact' | undefined
}

type FeedbackState = 'none' | 'positive' | 'negative'

export function MessageActions({
    content,
    messageId,
    className,
    variant = 'default'
}: MessageActionsProps) {
    const [copied, setCopied] = useState(false)
    const [feedback, setFeedback] = useState<FeedbackState>('none')
    const [showAll, setShowAll] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content)
        setCopied(true)
        toast.success('Copied to clipboard')
        setTimeout(() => setCopied(false), 2000)
    }

    const handleFeedback = (type: 'positive' | 'negative') => {
        setFeedback(type)
        // Here you would send feedback to your backend
        toast.success(type === 'positive' ? 'Thanks for the feedback!' : 'Thanks, we\'ll improve!')
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'FARchat Response',
                    text: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
                })
            } catch (error) {
                // User cancelled or share failed silently
            }
        } else {
            // Fallback to copy
            await navigator.clipboard.writeText(content)
            toast.success('Link copied to clipboard')
        }
    }

    const isCompact = variant === 'compact'

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={cn(
                "flex items-center gap-1",
                isCompact ? "mt-2" : "mt-3 pt-2 border-t border-border/30",
                className
            )}
        >
            {/* Copy Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            "h-7 px-2 text-muted-foreground hover:text-foreground",
                            isCompact && "h-6"
                        )}
                        onClick={handleCopy}
                    >
                        <AnimatePresence mode="wait">
                            {copied ? (
                                <motion.div
                                    key="check"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                >
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="copy"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.8 }}
                                >
                                    <Copy className="w-3.5 h-3.5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {!isCompact && <span className="ml-1.5 text-xs">Copy</span>}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Copy response</TooltipContent>
            </Tooltip>

            {/* Feedback Buttons */}
            <div className="flex items-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "h-7 px-2",
                                feedback === 'positive'
                                    ? "text-green-500 bg-green-500/10"
                                    : "text-muted-foreground hover:text-foreground",
                                isCompact && "h-6"
                            )}
                            onClick={() => handleFeedback('positive')}
                            disabled={feedback !== 'none'}
                        >
                            <ThumbsUp className="w-3.5 h-3.5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Helpful response</TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "h-7 px-2",
                                feedback === 'negative'
                                    ? "text-red-500 bg-red-500/10"
                                    : "text-muted-foreground hover:text-foreground",
                                isCompact && "h-6"
                            )}
                            onClick={() => handleFeedback('negative')}
                            disabled={feedback !== 'none'}
                        >
                            <ThumbsDown className="w-3.5 h-3.5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Not helpful</TooltipContent>
                </Tooltip>
            </div>

            {/* Share Button - Only on non-compact */}
            {!isCompact && (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-muted-foreground hover:text-foreground"
                            onClick={handleShare}
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            <span className="ml-1.5 text-xs">Share</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share response</TooltipContent>
                </Tooltip>
            )}

            {/* Feedback Confirmation */}
            <AnimatePresence>
                {feedback !== 'none' && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-muted-foreground ml-2"
                    >
                        Feedback recorded
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
