'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface MessageBubbleSkeletonProps {
    isUser?: boolean | undefined
    className?: string | undefined
}

export function MessageBubbleSkeleton({ isUser = false, className }: MessageBubbleSkeletonProps) {
    return (
        <div className={cn(
            "flex gap-3 px-4 py-6",
            isUser ? "justify-end" : "justify-start",
            className
        )}>
            {!isUser && (
                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            )}

            <div className={cn(
                "space-y-2 max-w-[80%]",
                isUser ? "items-end" : "items-start"
            )}>
                {/* Message content lines */}
                <Skeleton className={cn("h-4", isUser ? "w-48" : "w-64")} />
                <Skeleton className={cn("h-4", isUser ? "w-32" : "w-56")} />
                {!isUser && <Skeleton className="h-4 w-40" />}
            </div>

            {isUser && (
                <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            )}
        </div>
    )
}

export function ChatMessagesSkeleton() {
    return (
        <div className="flex-1 space-y-2">
            <MessageBubbleSkeleton isUser />
            <MessageBubbleSkeleton />
            <MessageBubbleSkeleton isUser />
            <MessageBubbleSkeleton />
        </div>
    )
}
