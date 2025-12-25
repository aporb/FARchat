'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { ConversationListSkeleton } from './ConversationItemSkeleton'
import { ChatMessagesSkeleton } from './MessageBubbleSkeleton'

export function ChatInterfaceSkeleton() {
    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar Skeleton */}
            <div className="w-72 border-r bg-muted/30 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b">
                    <Skeleton className="h-9 w-full rounded-lg" />
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-hidden">
                    <ConversationListSkeleton count={6} />
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                    <Skeleton className="h-8 w-24" />
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="h-14 border-b flex items-center justify-between px-6">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-hidden p-4">
                    <ChatMessagesSkeleton />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                    <Skeleton className="h-12 w-full rounded-xl" />
                </div>
            </div>
        </div>
    )
}
