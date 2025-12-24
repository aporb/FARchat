import { createBrowserClient } from '@supabase/ssr'

/**
 * Create a browser client for use in client-side components.
 * Use this for client-side Supabase operations (non-server actions).
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
