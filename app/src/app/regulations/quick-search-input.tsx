'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/layout/page-background'
import { Search, ArrowRight } from 'lucide-react'

export function QuickSearchInput() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <GlassCard variant="heavy" className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-grow">
          <label
            htmlFor="quick-search"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Search across all regulations
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              id="quick-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., small business set-aside, TAA compliance..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-federal-navy/20 dark:focus:ring-blue-500/20 focus:border-federal-navy dark:focus:border-blue-500 outline-none"
            />
          </div>
        </div>
        <Button
          asChild
          className="sm:self-end bg-federal-navy hover:bg-federal-navy/90 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Link href="/search">
            Browse All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </GlassCard>
  )
}
