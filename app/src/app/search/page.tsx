'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search as SearchIcon, ArrowRight, Loader2, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useUsageLimit } from '@/hooks/use-usage-limit'
import { searchRegulations } from '../actions'
import { RegulationFilters } from '@/components/search/RegulationFilters'
import { SearchResultCard, type SearchResult } from '@/components/search/SearchResultCard'

// Local storage key for bookmarks
const BOOKMARKS_KEY = 'farchat-search-bookmarks'

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [rawResults, setRawResults] = useState<any[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [selectedRegulation, setSelectedRegulation] = useState('all')
    const [bookmarks, setBookmarks] = useState<string[]>([])
    const { checkUsage, recordUsage, usageState } = useUsageLimit()
    const router = useRouter()

    // Load bookmarks from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(BOOKMARKS_KEY)
        if (saved) {
            try {
                setBookmarks(JSON.parse(saved))
            } catch {
                // Ignore parse errors
            }
        }
    }, [])

    // Save bookmarks to localStorage when changed
    useEffect(() => {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
    }, [bookmarks])

    // Transform raw results to SearchResult format
    const results: SearchResult[] = useMemo(() => {
        return rawResults.map((r, i) => ({
            id: `result-${i}-${r.metadata?.regulation || 'unknown'}-${r.metadata?.title || ''}`,
            regulation: r.metadata?.regulation || 'Unknown',
            section: r.metadata?.title || '',
            title: r.metadata?.title || 'Untitled',
            excerpt: r.content || '',
            relevance: Math.round((r.similarity || 0) * 100),
        }))
    }, [rawResults])

    // Filter results by selected regulation
    const filteredResults = useMemo(() => {
        if (selectedRegulation === 'all') return results
        return results.filter(r => r.regulation.toUpperCase() === selectedRegulation.toUpperCase())
    }, [results, selectedRegulation])

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
                setRawResults(results || [])
            }
        } finally {
            setIsSearching(false)
        }
    }

    function handleBookmark(id: string) {
        setBookmarks(prev => {
            if (prev.includes(id)) {
                return prev.filter(b => b !== id)
            }
            return [...prev, id]
        })
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b border-border bg-card p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2 font-semibold tracking-tight text-lg">
                    <div className="w-8 h-8 rounded-lg bg-federal-navy dark:bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">F</span>
                    </div>
                    <span className="ml-2">FARchat Search</span>
                </div>
                <Button variant="ghost" onClick={() => router.push('/chat')}>
                    Go to Chat <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </header>

            <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-6">
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
                        <Button
                            size="lg"
                            type="submit"
                            disabled={isSearching || !query.trim()}
                            className="min-w-[48px] min-h-[48px]"
                        >
                            {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <SearchIcon className="h-5 w-5" />}
                        </Button>
                    </form>
                    <div className="mt-2 text-xs text-muted-foreground text-right">
                        {usageState.remaining === Infinity ? 'Unlimited Searches' : `${usageState.remaining} searches left`}
                    </div>
                </div>

                {/* Regulation Filters */}
                {results.length > 0 && (
                    <RegulationFilters
                        selected={selectedRegulation}
                        onSelect={setSelectedRegulation}
                        className="mt-4"
                    />
                )}

                {/* Results */}
                <div className="space-y-4">
                    {filteredResults.length > 0 ? (
                        <>
                            <div className="text-sm text-muted-foreground">
                                Showing {filteredResults.length} of {results.length} results
                                {selectedRegulation !== 'all' && ` for ${selectedRegulation}`}
                            </div>
                            {filteredResults.map((result) => (
                                <SearchResultCard
                                    key={result.id}
                                    result={result}
                                    isBookmarked={bookmarks.includes(result.id)}
                                    onBookmark={handleBookmark}
                                />
                            ))}
                        </>
                    ) : (
                        results.length > 0 && selectedRegulation !== 'all' ? (
                            <div className="text-center py-12 text-muted-foreground">
                                No results for {selectedRegulation}.
                                <button
                                    onClick={() => setSelectedRegulation('all')}
                                    className="ml-2 text-federal-navy dark:text-blue-400 hover:underline"
                                >
                                    Show all results
                                </button>
                            </div>
                        ) : (
                            !isSearching && query && rawResults.length === 0 && (
                                <div className="text-center py-20 text-muted-foreground">
                                    No results found. Try a different term.
                                </div>
                            )
                        )
                    )}
                </div>
            </main>
        </div>
    )
}
