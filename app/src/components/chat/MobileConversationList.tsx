'use client'

import React from 'react'
import { MessageSquare, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, formatDistanceToNow } from '@/lib/utils'

interface Conversation {
    id: string
    title: string
    updated_at: string
}

interface MobileConversationListProps {
    conversations: Conversation[]
    currentConversation: string | null
    isLoading: boolean
    onSelect: (id: string) => void
    onNewChat: () => void
    onClose: () => void
}

export function MobileConversationList({
    conversations,
    currentConversation,
    isLoading,
    onSelect,
    onNewChat,
    onClose
}: MobileConversationListProps) {
    const handleSelect = (id: string) => {
        onSelect(id)
        onClose() // Close sheet after selection
    }

    const handleNewChat = () => {
        onNewChat()
        onClose()
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
                <h2 className="font-semibold">Conversations</h2>
                <Button
                    onClick={handleNewChat}
                    size="sm"
                    className="bg-federal-navy hover:bg-federal-navy/90 min-h-[40px]"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Chat
                </Button>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                ) : conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                        <MessageSquare className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                            No conversations yet. Start a new chat!
                        </p>
                    </div>
                ) : (
                    <div className="py-2">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => handleSelect(conv.id)}
                                className={cn(
                                    // Touch-friendly: min 56px height for comfortable tap
                                    "w-full min-h-[56px] px-4 py-3 flex items-start gap-3",
                                    "hover:bg-muted/50 active:bg-muted text-left",
                                    "border-b border-border/50 transition-colors",
                                    currentConversation === conv.id && "bg-primary/10"
                                )}
                            >
                                <MessageSquare className="w-5 h-5 mt-0.5 text-muted-foreground shrink-0" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="font-medium truncate text-sm">
                                        {conv.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        {formatDistanceToNow(new Date(conv.updated_at))}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
