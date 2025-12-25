'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, MessageSquare, Calendar, Zap, Crown, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getUserUsage } from '@/app/actions'

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

const tierConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
    free: { color: 'bg-slate-500', icon: null, label: 'Free' },
    basic: { color: 'bg-blue-500', icon: <Zap className="w-3 h-3" />, label: 'Basic' },
    pro: { color: 'bg-purple-500', icon: <Crown className="w-3 h-3" />, label: 'Pro' },
    unlimited: { color: 'bg-amber-500', icon: <Crown className="w-3 h-3" />, label: 'Unlimited' },
    enterprise: { color: 'bg-emerald-500', icon: <Crown className="w-3 h-3" />, label: 'Enterprise' },
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
    const defaultTier = { color: 'bg-slate-500', icon: null, label: 'Free' }
    const tierInfo = tierConfig[usage.tier] ?? defaultTier

    // Compact version for sidebar
    if (compact) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("space-y-2", className)}
            >
                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Daily Queries</span>
                    <Badge variant="outline" className={cn("text-xs", tierInfo.color, "text-white border-0")}>
                        {tierInfo.icon}
                        {tierInfo.label}
                    </Badge>
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
                        <Badge variant="outline" className={cn("text-xs flex items-center gap-1", tierInfo.color, "text-white border-0")}>
                            {tierInfo.icon}
                            {tierInfo.label}
                        </Badge>
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
                                className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-md p-2"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>Daily limit reached. Resets at midnight UTC.</span>
                            </motion.div>
                        )}

                        {isNearLimit && !isAtLimit && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 rounded-md p-2"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>Approaching daily limit. {usage.remaining} queries remaining.</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Reset info */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Resets daily at midnight UTC
                        </span>
                        {usage.tier === 'free' && (
                            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                Upgrade for more
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
