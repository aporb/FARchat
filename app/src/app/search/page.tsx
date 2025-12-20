'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, ArrowRight, Loader2, FileText, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUsageLimit } from '@/hooks/use-usage-limit'
import { searchRegulations } from '../actions'

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const { checkUsage, recordUsage, usageState } = useUsageLimit()
    const router = useRouter()

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        if (!query.trim() || isSearching) return

        const allowed = await checkUsage()
        if (!allowed) return

        setIsSearching(true)
        recordUsage()

        try {
            const { results, error } = await searchRegulations(query)
            if (error) {
                console.error(error)
            } else {
                setResults(results || [])
            }
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b border-border bg-card p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2 font-semibold tracking-tight text-lg">
                    <span className="text-3xl">🦅</span> FARchat Search
                </div>
                <Button variant="ghost" onClick={() => router.push('/chat')}>
                    Go to Chat <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-8">
                {/* Search Bar */}
                <div className="relative">
                    {!usageState.isLoading && !usageState.isAllowed && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-20 flex items-center justify-center rounded-lg">
                            <div className="flex flex-col items-center gap-2">
                                <Lock className="h-6 w-6 text-primary" />
                                <span className="font-medium text-muted-foreground">Limit Reached</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search regulations (e.g., 'small business set-aside')..."
                            className="h-12 text-lg shadow-sm"
                            disabled={isSearching}
                        />
                        <Button size="lg" type="submit" disabled={isSearching || !query.trim()}>
                            {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <SearchIcon className="h-5 w-5" />}
                        </Button>
                    </form>
                    <div className="mt-2 text-xs text-muted-foreground text-right">
                        {usageState.remaining === Infinity ? 'Unlimited Searches' : `${usageState.remaining} searches left`}
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    {results.length > 0 ? (
                        results.map((r, i) => (
                            <div key={i} className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2 text-primary font-semibold">
                                        <FileText className="h-4 w-4" />
                                        {r.metadata?.regulation} {r.metadata?.title}
                                    </div>
                                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                                        {(r.similarity * 100).toFixed(0)}% Match
                                    </span>
                                </div>
                                <p className="text-card-foreground/80 text-sm line-clamp-3 leading-relaxed">
                                    {r.content}
                                </p>
                            </div>
                        ))
                    ) : (
                        !isSearching && query && (
                            <div className="text-center py-20 text-muted-foreground">
                                No results found. Try a different term.
                            </div>
                        )
                    )}
                </div>
            </main>
        </div>
    )
}
