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

// ============================================
// CONVERSATION MANAGEMENT
// ============================================

export async function createConversation(title?: string): Promise<{ data?: any; error?: string }> {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const conversationTitle = title || 'New Conversation'

    const { data, error } = await supabase
        .from('conversations')
        .insert({
            user_id: user.id,
            title: conversationTitle
        })
        .select()
        .single()

    if (error) {
        return { error: error.message }
    }

    return { data }
}

export async function getConversations(): Promise<{ data?: any[]; error?: string }> {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { data, error } = await supabase
        .from('conversations')
        .select('id, title, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

    if (error) {
        return { error: error.message }
    }

    return { data }
}

export async function getConversation(id: string): Promise<{ data?: any; error?: string }> {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single()

    if (error) {
        return { error: error.message }
    }

    return { data }
}

export async function getConversationMessages(conversationId: string): Promise<{ data?: any[]; error?: string }> {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { data, error } = await supabase
        .from('messages')
        .select(`
            *,
            chat_sources (
                id,
                regulation,
                section,
                title,
                similarity_score
            )
        `)
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

    if (error) {
        return { error: error.message }
    }

    return { data }
}

export async function saveMessage(
    conversationId: string,
    role: 'user' | 'assistant',
    content: string,
    sources?: Array<{
        chunkId: number
        regulation: string
        section: string
        title: string
        similarityScore: number
    }>
): Promise<{ data?: any; error?: string }> {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // Insert the message
    const { data: message, error: msgError } = await supabase
        .from('messages')
        .insert({
            conversation_id: conversationId,
            role,
            content
        })
        .select()
        .single()

    if (msgError) {
        return { error: msgError.message }
    }

    // Insert sources if provided
    if (sources && sources.length > 0) {
        const sourceData = sources.map(s => ({
            message_id: message.id,
            chunk_id: s.chunkId,
            regulation: s.regulation,
            section: s.section,
            title: s.title,
            similarity_score: s.similarityScore
        }))

        const { error: sourceError } = await supabase
            .from('chat_sources')
            .insert(sourceData)

        if (sourceError) {
            console.error('Error saving sources:', sourceError)
            // Don't fail the whole operation if sources fail
        }
    }

    return { data: message }
}

export async function deleteConversation(id: string): Promise<{ error?: string }> {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        return { error: error.message }
    }

    return {}
}

export async function updateConversationTitle(id: string, title: string): Promise<{ error?: string }> {
    const supabase = await createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { error } = await supabase
        .from('conversations')
        .update({ title })
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        return { error: error.message }
    }

    return {}
}
