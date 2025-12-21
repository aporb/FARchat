import { createSupabaseServerClient } from '@/lib/supabase-server'

export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'unlimited' | 'enterprise'

const TIER_LIMITS: Record<SubscriptionTier, number> = {
    free: 25,
    basic: 100,
    pro: 500,
    unlimited: Infinity,
    enterprise: Infinity
}

export async function checkAndIncrementUsage(userId: string) {
    const supabase = await createSupabaseServerClient()

    // 1. Get Profile Tier
    const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', userId)
        .single()

    const tier = (profile?.tier || 'free') as SubscriptionTier
    const limit = TIER_LIMITS[tier]

    // 2. Get Today's Usage
    const today = new Date().toISOString().split('T')[0]
    const { data: usage } = await supabase
        .from('user_usage')
        .select('query_count')
        .eq('user_id', userId)
        .eq('date', today)
        .single()

    const currentCount = usage?.query_count || 0

    // 3. Check Limit
    if (currentCount >= limit) {
        return { allowed: false, remaining: 0, tier, limit }
    }

    // 4. Increment (Upsert)
    // We use upsert to handle the "first query of the day" race condition gracefully-ish
    // Ideally we'd use an increment RPC, but upsert with count+1 is okay for this scale.
    // actually, best to upsert.
    const { error } = await supabase
        .from('user_usage')
        .upsert(
            { user_id: userId, date: today, query_count: currentCount + 1 },
            { onConflict: 'user_id, date' }
        )

    if (error) {
        console.error('Usage Increment Error:', error)
        // Fail open? or fail closed? Let's fail open for tracking errors.
        // But if we return allowed: true, we should probably warn.
    }

    return {
        allowed: true,
        remaining: limit === Infinity ? Infinity : limit - (currentCount + 1),
        tier,
        limit
    }
}

export async function getUsageState(userId: string) {
    const supabase = await createSupabaseServerClient()

    // 1. Get Profile Tier
    const { data: profile } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', userId)
        .single()

    const tier = (profile?.tier || 'free') as SubscriptionTier
    const limit = TIER_LIMITS[tier]

    // 2. Get Today's Usage
    const today = new Date().toISOString().split('T')[0]
    const { data: usage } = await supabase
        .from('user_usage')
        .select('query_count')
        .eq('user_id', userId)
        .eq('date', today)
        .single()

    const currentCount = usage?.query_count || 0

    return {
        remaining: limit === Infinity ? Infinity : Math.max(0, limit - currentCount),
        limit,
        tier,
        isAllowed: currentCount < limit
    }
}
