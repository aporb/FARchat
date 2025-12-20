'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useQueryLimit } from "@/hooks/use-query-limit"
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ChatPage() {
    const { remaining, isBlocked, incrementQuery, user, loading } = useQueryLimit()
    const [query, setQuery] = useState('')
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: 'Hello! I am FARchat. Ask me anything about Federal Acquisition Regulations.' }
    ])
    const router = useRouter()

    if (loading) return <div className="p-8 text-center">Loading...</div>

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        if (isBlocked) {
            // Should be handled by UI state, but double check
            return
        }

        // record usage
        incrementQuery()

        // Add user message
        const newMessages = [...messages, { role: 'user' as const, content: query }]
        setMessages(newMessages)
        setQuery('')

        // Mock response for now (RAG API is Phase 4)
        setTimeout(() => {
            setMessages([...newMessages, {
                role: 'assistant',
                content: `[MOCK RESPONSE] You asked about "${query}". The RAG backend is currently being implemented (Phase 4).`
            }])
        }, 1000)
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="border-b px-6 py-4 flex items-center justify-between">
                <div className="font-bold text-xl text-federal-navy">FARchat <span className="text-sm font-normal text-muted-foreground ml-2">Alpha</span></div>
                <div className="flex items-center gap-4">
                    {!user && (
                        <div className="text-sm text-slate-600">
                            {isBlocked ? (
                                <span className="text-red-600 font-bold">Limit Reached</span>
                            ) : (
                                <span>Free Queries: {remaining}/5</span>
                            )}
                        </div>
                    )}
                    {user ? (
                        <Button variant="outline" onClick={() => router.push('/logout')}>Sign Out</Button> // TODO: Implement logout
                    ) : (
                        <Button asChild>
                            <Link href="/login">Sign In / Sign Up</Link>
                        </Button>
                    )}
                </div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-3xl rounded-lg px-4 py-3 ${msg.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isBlocked && (
                    <div className="flex justify-center mt-8">
                        <Card className="p-6 max-w-md text-center bg-slate-50 border-orange-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Free Limit Reached</h3>
                            <p className="text-slate-600 mb-4">You have used your 5 free guest queries. Please create a free account to continue.</p>
                            <Button asChild className="w-full">
                                <Link href="/login">Create Free Account</Link>
                            </Button>
                        </Card>
                    </div>
                )}
            </main>

            {/* Input Area */}
            <div className="border-t p-4 bg-white">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-2">
                    <Input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={isBlocked ? "Sign in to continue chatting..." : "Ask a question about FAR/DFARS..."}
                        disabled={isBlocked}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isBlocked || !query.trim()}>Send</Button>
                </form>
            </div>
        </div>
    )
}
