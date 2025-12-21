'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { checkAndIncrementUsage, getUsageState } from '@/lib/usage'

export type ActionState = {
    error?: string
    success?: string
}

export async function login(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createSupabaseServerClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/chat')
}

export async function signup(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createSupabaseServerClient()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const headers = await import('next/headers')
    const headersList = await headers.headers()
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    if (!email || !password) {
        return { error: 'Email and password are required' }
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Check your email for the confirmation link.' }
}

export async function magicLinkLogin(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const supabase = await createSupabaseServerClient()
    const email = formData.get('email') as string

    if (!email) {
        return { error: 'Email is required' }
    }

    const headers = await import('next/headers')
    const headersList = await headers.headers()
    const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        }
    })

    if (error) {
        return { error: error.message }
    }

    return { success: 'Check your email for the magic link.' }
}

export async function signOut() {
    const supabase = await createSupabaseServerClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function searchRegulations(query: string) {
    if (!query || query.length < 3) return { results: [] }

    try {
        const supabase = await createSupabaseServerClient()

        // Check Usage
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('Unauthorized')

        const usage = await checkAndIncrementUsage(user.id)
        if (!usage.allowed) {
            return { error: 'Daily limit reached.' }
        }

        const { getEmbedding } = await import("@/lib/embeddings")
        const embedding = await getEmbedding(query)

        const { data: documents, error } = await supabase.rpc('match_documents', {
            query_embedding: embedding,
            match_threshold: 0.1,
            match_count: 10
        })

        if (error) throw error

        return { results: documents || [] }
    } catch (error: any) {
        console.error('Search Error:', error)
        return { error: error.message, results: [] }
    }
}

export async function getUserUsage() {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    return await getUsageState(user.id)
}
