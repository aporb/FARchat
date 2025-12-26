import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Crown, Zap, User } from 'lucide-react'

export type Tier = 'free' | 'pro' | 'enterprise'

interface TierBadgeProps {
    tier: Tier
    size?: 'sm' | 'default'
    showIcon?: boolean
    className?: string
}

const TIER_CONFIG: Record<Tier, {
    label: string
    icon: typeof Crown
    className: string
}> = {
    free: {
        label: 'Free',
        icon: User,
        className: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    },
    pro: {
        label: 'Pro',
        icon: Zap,
        className: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
    },
    enterprise: {
        label: 'Enterprise',
        icon: Crown,
        className: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    },
}

/**
 * Badge component for displaying user subscription tier.
 * Supports free, pro, and enterprise tiers with appropriate styling.
 *
 * @example
 * <TierBadge tier="pro" />
 * <TierBadge tier="enterprise" size="sm" showIcon={false} />
 */
export function TierBadge({
    tier,
    size = 'default',
    showIcon = true,
    className
}: TierBadgeProps) {
    const config = TIER_CONFIG[tier]
    const Icon = config.icon

    return (
        <Badge
            variant="outline"
            className={cn(
                config.className,
                size === 'sm' && 'text-xs px-1.5 py-0',
                className
            )}
        >
            {showIcon && <Icon className={cn("mr-1", size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5')} />}
            {config.label}
        </Badge>
    )
}
