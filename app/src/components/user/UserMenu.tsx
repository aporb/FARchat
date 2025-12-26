'use client'

import React, { useState, useEffect, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, LogOut, LogIn, ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { dropdownTransition } from '@/lib/animations'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { UsageDashboard } from './UsageDashboard'
import { TierBadge, type Tier } from '@/components/shared/TierBadge'
import { signOut, getUserUsage } from '@/app/actions'
import { createSupabaseClient } from '@/lib/supabase'
import { toast } from 'sonner'

// Dynamic imports for code splitting - these components are only loaded when needed
const SettingsSidebar = dynamic(
    () => import('./SettingsSidebar').then(mod => ({ default: mod.SettingsSidebar })),
    { ssr: false }
)

const AuthModal = dynamic(
    () => import('./AuthModal').then(mod => ({ default: mod.AuthModal })),
    {
        ssr: false,
        loading: () => (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        )
    }
)

interface UserMenuProps {
    className?: string | undefined
}

interface UserData {
    email: string | null
    id: string
}

export function UserMenu({ className }: UserMenuProps) {
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [userTier, setUserTier] = useState<Tier>('free')

    useEffect(() => {
        async function fetchUser() {
            const supabase = createSupabaseClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser({ email: user.email ?? null, id: user.id })
                // Fetch user's tier from usage data
                try {
                    const usageData = await getUserUsage()
                    if (usageData?.tier) {
                        // Map tier string to Tier type (free, pro, enterprise)
                        const tierMapping: Record<string, Tier> = {
                            'free': 'free',
                            'basic': 'pro',
                            'pro': 'pro',
                            'unlimited': 'enterprise',
                            'enterprise': 'enterprise'
                        }
                        setUserTier(tierMapping[usageData.tier] || 'free')
                    }
                } catch (error) {
                    console.error('Failed to fetch user tier:', error)
                }
            }
            setLoading(false)
        }
        fetchUser()

        // Subscribe to auth changes
        const supabase = createSupabaseClient()
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                setUser({ email: session.user.email ?? null, id: session.user.id })
                setShowAuthModal(false)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
                setUserTier('free')
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const handleSignOut = async () => {
        toast.loading('Signing out...')
        setShowDropdown(false)
        await signOut()
    }

    const getInitials = (email: string | null) => {
        if (!email) return '?'
        const username = email.split('@')[0]
        return username ? username.slice(0, 2).toUpperCase() : '?'
    }

    // Not signed in
    if (!loading && !user) {
        return (
            <>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                    className={cn("gap-2", className)}
                >
                    <LogIn className="w-4 h-4" />
                    Sign In
                </Button>
                <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
            </>
        )
    }

    return (
        <>
            <div className={cn("relative", className)}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="gap-2 px-2"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <Avatar className="h-7 w-7">
                                <AvatarImage src={undefined} />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                                    {loading ? '...' : getInitials(user?.email ?? null)}
                                </AvatarFallback>
                            </Avatar>
                            <ChevronDown className={cn(
                                "w-3 h-3 transition-transform",
                                showDropdown && "rotate-180"
                            )} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Account</TooltipContent>
                </Tooltip>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {showDropdown && (
                        <>
                            {/* Backdrop */}
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowDropdown(false)}
                            />

                            <motion.div
                                {...dropdownTransition}
                                className="absolute right-0 top-full mt-2 w-72 bg-background border rounded-lg shadow-lg z-50 overflow-hidden"
                            >
                                {/* User Info Header */}
                                <div className="p-4 border-b bg-muted/30">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={undefined} />
                                            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                                                {getInitials(user?.email ?? null)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">
                                                {user?.email || 'User'}
                                            </p>
                                            <div className="mt-1">
                                                <TierBadge tier={userTier} size="sm" showIcon={true} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Usage Quick View */}
                                <div className="p-4 border-b">
                                    <UsageDashboard compact />
                                </div>

                                {/* Menu Items */}
                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            setShowDropdown(false)
                                            setShowSettings(true)
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                                    >
                                        <Settings className="w-4 h-4 text-muted-foreground" />
                                        Settings
                                    </button>

                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-red-50 text-red-600 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Settings Sidebar */}
            <SettingsSidebar open={showSettings} onOpenChange={setShowSettings} />
        </>
    )
}
