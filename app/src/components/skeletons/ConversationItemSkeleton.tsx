'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ConversationItemSkeletonProps {
    className?: string | undefined
}

export function ConversationItemSkeleton({ className }: ConversationItemSkeletonProps) {
    return (
        <div className={cn("flex items-start gap-3 px-3 py-3 rounded-lg", className)}>
            {/* Icon placeholder */}
            <Skeleton className="w-8 h-8 rounded-lg shrink-0" />

            <div className="flex-1 min-w-0 space-y-2">
                {/* Title */}
                <Skeleton className="h-4 w-3/4" />
                {/* Subtitle */}
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    )
}

export function ConversationListSkeleton({ count = 5 }: { count?: number | undefined }) {
    return (
        <div className="space-y-1 p-2">
            {Array.from({ length: count }).map((_, i) => (
                <ConversationItemSkeleton key={i} />
            ))}
        </div>
    )
}
