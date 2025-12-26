'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, MessageSquare, AlertCircle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getUserUsage } from '@/app/actions'
import { TierBadge, type Tier } from '@/components/shared/TierBadge'
import { CountdownTimer } from '@/components/shared/CountdownTimer'

interface UsageData {
    remaining: number
    limit: number
    tier: string
    isAllowed: boolean
}

interface UsageDashboardProps {
    className?: string | undefined
    compact?: boolean | undefined
}

// Map usage tier to TierBadge tier type
const tierMapping: Record<string, Tier> = {
    'free': 'free',
    'basic': 'pro',
    'pro': 'pro',
    'unlimited': 'enterprise',
    'enterprise': 'enterprise'
}

// Calculate next midnight UTC
function getNextMidnightUTC(): Date {
    const now = new Date()
    const nextMidnight = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0, 0, 0, 0
    ))
    return nextMidnight
}

export function UsageDashboard({ className, compact = false }: UsageDashboardProps) {
    const [usage, setUsage] = useState<UsageData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchUsage() {
            try {
                const data = await getUserUsage()
                if (data) {
                    setUsage(data)
                }
            } catch (error) {
                console.error('Failed to fetch usage:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchUsage()
    }, [])

    if (loading) {
        return (
            <div className={cn("animate-pulse", className)}>
                <div className="h-4 bg-muted rounded w-24 mb-2" />
                <div className="h-2 bg-muted rounded w-full" />
            </div>
        )
    }

    if (!usage) {
        return null
    }

    const used = usage.limit === Infinity ? 0 : usage.limit - usage.remaining
    const percentage = usage.limit === Infinity ? 0 : Math.round((used / usage.limit) * 100)
    const isNearLimit = percentage >= 80
    const isAtLimit = !usage.isAllowed
    const mappedTier = tierMapping[usage.tier] ?? 'free'
    const nextResetDate = useMemo(() => getNextMidnightUTC(), [])

    // Compact version for sidebar
    if (compact) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("space-y-3", className)}
            >
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Daily Queries</span>
                    <TierBadge tier={mappedTier} size="sm" showIcon={true} />
                </div>

                <Progress
                    value={percentage}
                    className={cn(
                        "h-2",
                        isAtLimit && "bg-red-200",
                        isNearLimit && !isAtLimit && "bg-amber-200"
                    )}
                />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                        {usage.limit === Infinity ? (
                            'Unlimited'
                        ) : (
                            `${used} / ${usage.limit} used`
                        )}
                    </span>
                    {usage.remaining !== Infinity && usage.remaining <= 5 && (
                        <span className={cn(
                            "flex items-center gap-1",
                            isAtLimit ? "text-red-500" : "text-amber-500"
                        )}>
                            <AlertCircle className="w-3 h-3" />
                            {usage.remaining} left
                        </span>
                    )}
                </div>

                {/* Countdown Timer */}
                <CountdownTimer
                    targetDate={nextResetDate}
                    label="Resets in"
                    className="text-xs"
                />

                {/* Upgrade CTA when approaching limit */}
                {isNearLimit && usage.tier === 'free' && (
                    <Button
                        size="sm"
                        className="w-full min-h-[44px] bg-amber-500 hover:bg-amber-600 text-white"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Upgrade to Pro
                    </Button>
                )}
            </motion.div>
        )
    }

    // Full dashboard version
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("space-y-4", className)}
        >
            <Card>
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Usage Overview
                        </CardTitle>
                        <TierBadge tier={mappedTier} size="default" showIcon={true} />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Main usage bar */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <MessageSquare className="w-4 h-4" />
                                Daily Queries
                            </span>
                            <span className="font-medium">
                                {usage.limit === Infinity ? (
                                    'Unlimited'
                                ) : (
                                    `${used} / ${usage.limit}`
                                )}
                            </span>
                        </div>

                        <Progress
                            value={percentage}
                            className={cn(
                                "h-3",
                                isAtLimit && "[&>div]:bg-red-500",
                                isNearLimit && !isAtLimit && "[&>div]:bg-amber-500"
                            )}
                        />

                        {isAtLimit && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/50 dark:text-red-400 rounded-md p-2"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>Daily limit reached. Resets at midnight UTC.</span>
                            </motion.div>
                        )}

                        {isNearLimit && !isAtLimit && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400 rounded-md p-2"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>Approaching daily limit. {usage.remaining} queries remaining.</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Countdown Timer and Reset info */}
                    <div className="pt-2 border-t space-y-3">
                        <CountdownTimer
                            targetDate={nextResetDate}
                            label="Resets in"
                        />

                        {/* Upgrade CTA for free tier */}
                        {usage.tier === 'free' && (
                            <Button
                                className={cn(
                                    "w-full min-h-[44px]",
                                    isNearLimit
                                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                                        : "bg-primary hover:bg-primary/90"
                                )}
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                {isNearLimit ? 'Upgrade Now for Unlimited Queries' : 'Upgrade to Pro'}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
