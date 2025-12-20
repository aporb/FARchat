'use client'
// New client-side hook logic
import { useEffect, useState } from 'react'
import { getUserUsage } from '@/app/actions'

type UsageState = {
    isAllowed: boolean
    remaining: number
    isLoading: boolean
    tier: string
}

export function useUsageLimit(): {
    checkUsage: () => Promise<boolean>
    recordUsage: () => void
    usageState: UsageState
} {
    const [usageState, setUsageState] = useState<UsageState>({
        isAllowed: true,
        remaining: Infinity,
        isLoading: true,
        tier: 'free'
    })

    useEffect(() => {
        checkUsage().then()
    }, [])

    async function checkUsage(): Promise<boolean> {
        const usage = await getUserUsage()
        if (!usage) {
            // Not logged in? Middleware should catch this, but safe fallback
            setUsageState(prev => ({ ...prev, isLoading: false, isAllowed: false }))
            return false
        }

        setUsageState({
            isAllowed: usage.isAllowed,
            remaining: usage.remaining,
            tier: usage.tier,
            isLoading: false
        })
        return usage.isAllowed
    }

    function recordUsage() {
        // Optimistic update
        setUsageState(prev => ({
            ...prev,
            remaining: Math.max(0, prev.remaining - 1),
            isAllowed: prev.remaining > 1
        }))
    }

    return { checkUsage, recordUsage, usageState }
}
