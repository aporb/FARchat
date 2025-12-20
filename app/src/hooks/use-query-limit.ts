'use client'

import { useState, useEffect } from 'react'
import { createSupabaseClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

const MAX_FREE_QUERIES = 5
const STORAGE_KEY = 'farchat_guest_queries'

export function useQueryLimit() {
    const [count, setCount] = useState<number>(0)
    const [isBlocked, setIsBlocked] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const supabase = createSupabaseClient()

    useEffect(() => {
        // Check auth status
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        checkUser()

        // Initialize count from local storage
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY)
            const currentCount = stored ? parseInt(stored, 10) : 0
            setCount(currentCount)
            if (!user && currentCount >= MAX_FREE_QUERIES) {
                setIsBlocked(true)
            }
        }
    }, [user]) // Re-run if user logs in

    const incrementQuery = () => {
        if (user) return // No limit for logged in users

        const newCount = count + 1
        setCount(newCount)
        localStorage.setItem(STORAGE_KEY, newCount.toString())

        if (newCount >= MAX_FREE_QUERIES) {
            setIsBlocked(true)
        }
    }

    const remaining = Math.max(0, MAX_FREE_QUERIES - count)

    return {
        count,
        remaining,
        isBlocked: !user && isBlocked, // Only blocked if NOT logged in
        incrementQuery,
        user,
        loading
    }
}
