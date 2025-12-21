'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Menu, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RegulationExplorer } from '@/components/regulations/RegulationExplorer'
import { MessageBubble } from './MessageBubble'
import { motion } from 'framer-motion'
import { useUsageLimit } from '@/hooks/use-usage-limit'

type Message = {
    role: 'user' | 'assistant'
    content: string
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const scrollRef = useRef<HTMLDivElement>(null)

    // Usage Limit Hook
    const { checkUsage, recordUsage, usageState } = useUsageLimit()

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        // 1. Check Limits
        const allowed = await checkUsage()
        if (!allowed) return

        const userMessage = input.trim()
        setInput('')
        const userMsg: Message = { role: 'user', content: userMessage }
        setMessages(prev => [...prev, userMsg])
        setIsLoading(true)

        // 2. Optimistic Record
        recordUsage()

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, { role: 'user', content: userMessage }].map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                })
            })

            if (!response.ok) {
                throw new Error(response.statusText)
            }

            const reader = response.body?.getReader()
            if (!reader) return

            // Add a placeholder for assistant message
            const assistantMsg: Message = { role: 'assistant', content: '' }
            setMessages(prev => [...prev, assistantMsg])

            const decoder = new TextDecoder()

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const text = decoder.decode(value, { stream: true })
                setMessages(prev => {
                    const newMessages = [...prev]
                    if (newMessages.length === 0) return newMessages

                    const lastMsgIndex = newMessages.length - 1
                    const lastMessage = { ...newMessages[lastMsgIndex] } as Message

                    if (lastMessage.role === 'assistant') {
                        lastMessage.content += text
                        newMessages[lastMsgIndex] = lastMessage
                    }
                    return newMessages
                })
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
            {/* Sidebar - Desktop */}
            <motion.div
                initial={{ width: 320, opacity: 1 }}
                animate={{ width: sidebarOpen ? 320 : 0, opacity: sidebarOpen ? 1 : 0 }}
                className="hidden md:flex flex-col border-r border-border bg-sidebar overflow-hidden"
            >
                <RegulationExplorer />
            </motion.div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full relative">
                {/* Header / Top Bar */}
                <header className="h-14 flex items-center px-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 sticky top-0 justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="md:flex hidden"
                            aria-label={sidebarOpen ? "Close regulation explorer sidebar" : "Open regulation explorer sidebar"}
                            aria-expanded={sidebarOpen}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h1 className="font-semibold text-lg tracking-tight">FARchat <span className="text-primary text-xs ml-1 uppercase bg-primary/10 px-1.5 py-0.5 rounded">Beta</span></h1>
                    </div>
                </header>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6" ref={scrollRef}>
                    <div className="max-w-3xl mx-auto space-y-4 pb-4">
                        {messages.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">🦅</span>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">How can I help with the FAR today?</h2>
                                <p className="text-muted-foreground max-w-md">
                                    Ask questions about Federal Acquisition Regulations, compliance, or contract clauses.
                                </p>
                            </div>
                        )}

                        {messages.map((m, i) => (
                            <MessageBubble key={i} role={m.role} content={m.content} />
                        ))}

                        {isLoading && messages[messages.length - 1]?.role === 'user' && (
                            <div className="flex justify-start w-full">
                                <div className="bg-card border p-4 rounded-lg shadow-sm flex items-center gap-2">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-border bg-background relative">
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
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Ask about FAR Part 15..."
                                className="flex-1"
                                disabled={isLoading || (!usageState.isLoading && !usageState.isAllowed)}
                                aria-label="Ask a question about federal acquisition regulations"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !input.trim() || (!usageState.isLoading && !usageState.isAllowed)}
                                aria-label="Send message"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                        <div className="text-center mt-2 flex justify-between items-center text-xs text-muted-foreground px-1">
                            <span>FARchat Beta</span>
                            <span>
                                {usageState.isLoading ? 'Checking...' : (usageState.remaining === Infinity ? 'Unlimited Access' : `${usageState.remaining} queries left`)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
