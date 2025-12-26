'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Menu, Lock, Plus, Trash2, MessageSquare, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageBubble } from './MessageBubble'
import { ThinkingIndicator } from './ThinkingIndicator'
import { EmptyState } from './EmptyState'
import { SuggestionChips, defaultSuggestions, Suggestion } from './SuggestionChips'
import { UserMenu } from '@/components/user'
import { motion, AnimatePresence } from 'framer-motion'
import { useUsageLimit } from '@/hooks/use-usage-limit'
import { toast } from 'sonner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { MobileConversationList } from './MobileConversationList'
import { MobileBottomNav } from './MobileBottomNav'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
    createConversation,
    getConversations,
    getConversationMessages,
    saveMessage,
    deleteConversation
} from '@/app/actions'
import { formatDistanceToNow, cn } from '@/lib/utils'

type Message = {
    id?: string
    role: 'user' | 'assistant'
    content: string
    isStreaming?: boolean
    sources?: Array<{
        id?: string
        regulation: string
        section: string
        title: string
        similarityScore?: number
    }>
}

type Conversation = {
    id: string
    title: string
    created_at: string
    updated_at: string
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [currentConversation, setCurrentConversation] = useState<string | null>(null)
    const [isLoadingConversations, setIsLoadingConversations] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Usage Limit Hook
    const { checkUsage, recordUsage, usageState } = useUsageLimit()

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    // Load conversations on mount
    useEffect(() => {
        loadConversations()
    }, [])

    const loadConversations = async () => {
        setIsLoadingConversations(true)
        const { data } = await getConversations()
        if (data) {
            setConversations(data)
        }
        setIsLoadingConversations(false)
    }

    const loadConversation = async (conversationId: string) => {
        setIsLoading(true)
        setCurrentConversation(conversationId)

        const { data } = await getConversationMessages(conversationId)
        if (data) {
            const loadedMessages: Message[] = data.map((msg: any) => ({
                role: msg.role as 'user' | 'assistant',
                content: msg.content,
                sources: msg.chat_sources?.map((s: any) => ({
                    id: s.id,
                    regulation: s.regulation,
                    section: s.section,
                    title: s.title,
                    similarityScore: s.similarity_score
                }))
            }))
            setMessages(loadedMessages)
        }
        setIsLoading(false)
    }

    const startNewConversation = async () => {
        setIsLoading(true)
        const { data } = await createConversation()
        if (data) {
            setCurrentConversation(data.id)
            setConversations(prev => [data, ...prev])
            setMessages([])
        }
        setIsLoading(false)
    }

    const openDeleteDialog = (e: React.MouseEvent, conversation: Conversation) => {
        e.stopPropagation()
        setConversationToDelete(conversation)
        setDeleteDialogOpen(true)
    }

    const handleDeleteConversation = async () => {
        if (!conversationToDelete) return

        const id = conversationToDelete.id
        const { error } = await deleteConversation(id)

        if (!error) {
            setConversations(prev => prev.filter(c => c.id !== id))
            if (currentConversation === id) {
                setCurrentConversation(null)
                setMessages([])
            }
            toast.success('Conversation deleted')
        } else {
            toast.error('Failed to delete conversation')
        }

        setDeleteDialogOpen(false)
        setConversationToDelete(null)
    }

    const handleSuggestionClick = (text: string) => {
        setInput(text)
        // Auto-submit the suggestion
        const fakeEvent = { preventDefault: () => {} } as React.FormEvent
        setTimeout(() => {
            const form = document.querySelector('form')
            if (form) {
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
            }
        }, 100)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        // 1. Check Limits
        const allowed = await checkUsage()
        if (!allowed) return

        const userMessage = input.trim()
        setInput('')

        // Create conversation if needed
        let conversationId = currentConversation
        if (!conversationId) {
            const { data } = await createConversation(userMessage.slice(0, 50) + '...')
            if (data) {
                conversationId = data.id
                setCurrentConversation(data.id)
                setConversations(prev => [data, ...prev])
            } else {
                // Fallback: continue without persistence
                conversationId = 'temp'
            }
        }

        const userMsg: Message = { role: 'user', content: userMessage }
        setMessages(prev => [...prev, userMsg])
        setIsLoading(true)

        // 2. Optimistic Record
        recordUsage()

        try {
            // Get current messages for context
            const currentMessages = messages.map(m => ({ role: m.role, content: m.content }))

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...currentMessages, { role: 'user', content: userMessage }],
                    conversationId,
                    conversationTitle: userMessage.slice(0, 50)
                })
            })

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const reader = response.body?.getReader()
            if (!reader) return

            // Add a placeholder for assistant message with empty sources
            const assistantMsg: Message = { role: 'assistant', content: '', sources: [], isStreaming: true }
            setMessages(prev => [...prev, assistantMsg])

            const decoder = new TextDecoder()
            let fullContent = ''
            let sources: any[] = []

            // Parse sources from headers
            const sourcesHeader = response.headers.get('X-Sources')
            if (sourcesHeader) {
                try {
                    sources = JSON.parse(Buffer.from(sourcesHeader, 'base64').toString())
                } catch (e) {
                    console.error('Error parsing sources:', e)
                }
            }

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const text = decoder.decode(value, { stream: true })
                fullContent += text
                setMessages(prev => {
                    const newMessages = [...prev]
                    if (newMessages.length === 0) return newMessages

                    const lastMsgIndex = newMessages.length - 1
                    const lastMessage = { ...newMessages[lastMsgIndex] } as Message

                    if (lastMessage.role === 'assistant') {
                        lastMessage.content += text
                        lastMessage.sources = sources
                        newMessages[lastMsgIndex] = lastMessage
                    }
                    return newMessages
                })
            }

            // Mark streaming as complete
            setMessages(prev => {
                const newMessages = [...prev]
                const lastMsgIndex = newMessages.length - 1
                if (newMessages[lastMsgIndex]?.role === 'assistant') {
                    newMessages[lastMsgIndex] = { ...newMessages[lastMsgIndex], isStreaming: false }
                }
                return newMessages
            })

            // Save messages to database after streaming completes
            if (conversationId && conversationId !== 'temp') {
                await saveMessage(conversationId, 'user', userMessage)
                await saveMessage(conversationId, 'assistant', fullContent, sources.map((s: any) => ({
                    chunkId: s.chunkId,
                    regulation: s.regulation,
                    section: s.section,
                    title: s.title,
                    similarityScore: s.similarityScore
                })))
            }

        } catch (error) {
            console.error('Chat Error:', error)
            const errorMsg: Message = { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
            setMessages(prev => [...prev, errorMsg])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* Desktop Sidebar - Hidden on mobile */}
            <motion.div
                initial={{ width: 280, opacity: 1 }}
                animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
                className="hidden md:flex flex-col border-r border-border bg-sidebar overflow-hidden"
            >
                <div className="p-4 border-b border-border">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={startNewConversation}
                                className="w-full gap-2"
                                variant="outline"
                                aria-label="Start a new conversation"
                            >
                                <Plus className="w-4 h-4" />
                                New Chat
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Start new conversation</TooltipContent>
                    </Tooltip>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {isLoadingConversations ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                    ) : conversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                            <MessageSquare className="w-8 h-8 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground">
                                No conversations yet. Start a new chat to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => loadConversation(conv.id)}
                                    className={cn(
                                        "group flex items-center gap-2 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors",
                                        currentConversation === conv.id
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <MessageSquare className="w-4 h-4 shrink-0" />
                                    <span className="flex-1 truncate">{conv.title}</span>
                                    <span className="text-[10px] opacity-50 shrink-0">
                                        {formatDistanceToNow(new Date(conv.updated_at))}
                                    </span>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => openDeleteDialog(e, conv)}
                                                aria-label={`Delete conversation: ${conv.title}`}
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">Delete</TooltipContent>
                                    </Tooltip>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative">
                {/* Mobile Header - Only visible on mobile */}
                <header className="h-12 flex items-center justify-between px-3 glass-header md:hidden sticky top-0 z-40">
                    {/* Left: Menu trigger for mobile sheet */}
                    <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="min-w-[44px] min-h-[44px]"
                                aria-label="Open conversations"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[85vw] max-w-[320px] p-0">
                            <MobileConversationList
                                conversations={conversations}
                                currentConversation={currentConversation}
                                isLoading={isLoadingConversations}
                                onSelect={loadConversation}
                                onNewChat={startNewConversation}
                                onClose={() => setMobileSheetOpen(false)}
                            />
                        </SheetContent>
                    </Sheet>

                    {/* Center: Title */}
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-federal-navy flex items-center justify-center">
                            <span className="text-white font-bold text-xs">F</span>
                        </div>
                        <span className="font-semibold text-sm">FARchat</span>
                    </div>

                                    {/* Right: New chat button */}
                                    <div className="flex items-center">
                                        <ThemeToggle />
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="min-w-[44px] min-h-[44px]"
                                            onClick={startNewConversation}
                                            aria-label="New conversation"
                                        >
                                            <Plus className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </header>
                {/* Desktop Header - Hidden on mobile */}
                <header className="h-14 hidden md:flex items-center px-4 glass-header supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0 justify-between">
                    <div className="flex items-center gap-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSidebarOpen(!sidebarOpen)}
                                    className={cn(!sidebarOpen && "md:flex hidden")}
                                    aria-label={sidebarOpen ? "Close conversation sidebar" : "Open conversation sidebar"}
                                    aria-expanded={sidebarOpen}
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                {sidebarOpen ? "Hide sidebar" : "Show sidebar"}
                            </TooltipContent>
                        </Tooltip>
                        {currentConversation && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <ChevronRight className="w-4 h-4" />
                                <span className="truncate max-w-[200px]">
                                    {conversations.find(c => c.id === currentConversation)?.title}
                                </span>
                            </div>
                        )}
                        <h1 className="font-semibold text-lg tracking-tight hidden sm:block">FARchat <span className="text-primary text-xs ml-1 uppercase bg-primary/10 px-1.5 py-0.5 rounded">Beta</span></h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <UserMenu />
                    </div>
                </header>

                {/* Messages - Add padding bottom for mobile nav */}
                <div id="main-content" className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6" ref={scrollRef}>
                    <div className="max-w-3xl mx-auto space-y-4 pb-4">
                        {messages.length === 0 && !isLoading && (
                            <EmptyState
                                onSuggestionClick={handleSuggestionClick}
                                className="min-h-[60vh]"
                            />
                        )}

                        <AnimatePresence initial={false}>
                            {messages.map((m, i) => (
                                <MessageBubble
                                    key={m.id || i}
                                    role={m.role}
                                    content={m.content}
                                    sources={m.sources}
                                    messageId={m.id}
                                    isStreaming={m.isStreaming}
                                />
                            ))}
                        </AnimatePresence>

                        {/* Enhanced Thinking Indicator */}
                        <ThinkingIndicator
                            isVisible={isLoading && messages[messages.length - 1]?.role === 'user'}
                        />

                        {/* Follow-up suggestions after assistant response */}
                        {messages.length > 0 &&
                            messages[messages.length - 1]?.role === 'assistant' &&
                            !isLoading && (
                                <SuggestionChips
                                    suggestions={defaultSuggestions.slice(0, 3)}
                                    onSelect={handleSuggestionClick}
                                    disabled={isLoading}
                                />
                            )}
                    </div>
                </div>

                {/* Input Area - Add margin bottom for mobile nav */}
                <div className="p-4 border-t border-border bg-background relative mb-16 md:mb-0">
                    {/* Usage Limit Overlay */}
                    {!usageState.isLoading && !usageState.isAllowed && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                            <div className="bg-card border p-6 rounded-lg shadow-lg text-center max-w-sm mx-4 animate-in fade-in zoom-in duration-200">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Lock className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Daily Limit Reached</h3>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    You have used your 5 free queries for today. Log in or sign up for unlimited access.
                                </p>
                                <Button className="w-full" onClick={() => window.location.href = '/login'}>
                                    Sign Up / Login
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="max-w-3xl mx-auto">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <Input
                                id="chat-input"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask about FAR Part 15..."
                                className="flex-1 min-h-[44px] text-base"
                                disabled={isLoading || (!usageState.isLoading && !usageState.isAllowed)}
                                aria-label="Ask a question about federal acquisition regulations"
                            />
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !input.trim() || (!usageState.isLoading && !usageState.isAllowed)}
                                        aria-label="Send message"
                                        className="min-w-[44px] min-h-[44px]"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">Send message</TooltipContent>
                            </Tooltip>
                        </form>
                        <div className="text-center mt-2 flex justify-between items-center text-xs text-muted-foreground px-1">
                            <span>FARchat Beta</span>
                            <span>
                                {usageState.isLoading ? 'Checking...' : (usageState.remaining === Infinity ? 'Unlimited Access' : `${usageState.remaining} queries left`)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <MobileBottomNav
                    onNewChat={startNewConversation}
                    className="md:hidden"
                />
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete &quot;{conversationToDelete?.title}&quot;?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConversation}
                            className="bg-destructive text-white hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
