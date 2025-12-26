'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Settings,
    User,
    Moon,
    Sun,
    Bell,
    Shield,
    LogOut,
    ChevronRight,
    HelpCircle,
    FileText,
    ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UsageDashboard } from './UsageDashboard'
import { signOut } from '@/app/actions'
import { createSupabaseClient } from '@/lib/supabase'
import { toast } from 'sonner'
import Link from 'next/link'

interface SettingsSidebarProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

interface UserData {
    email: string | null
    id: string
}

const PREFERENCES_KEY = 'farchat-preferences'

interface UserPreferences {
    isDarkMode: boolean
    notificationsEnabled: boolean
    citationsExpanded: boolean
}

const DEFAULT_PREFERENCES: UserPreferences = {
    isDarkMode: false,
    notificationsEnabled: true,
    citationsExpanded: true,
}

export function SettingsSidebar({ open, onOpenChange }: SettingsSidebarProps) {
    const [user, setUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [isDarkMode, setIsDarkMode] = useState(DEFAULT_PREFERENCES.isDarkMode)
    const [notificationsEnabled, setNotificationsEnabled] = useState(DEFAULT_PREFERENCES.notificationsEnabled)
    const [citationsExpanded, setCitationsExpanded] = useState(DEFAULT_PREFERENCES.citationsExpanded)
    const [prefsLoaded, setPrefsLoaded] = useState(false)

    // Load preferences from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(PREFERENCES_KEY)
            if (saved) {
                const prefs: UserPreferences = JSON.parse(saved)
                setIsDarkMode(prefs.isDarkMode ?? DEFAULT_PREFERENCES.isDarkMode)
                setNotificationsEnabled(prefs.notificationsEnabled ?? DEFAULT_PREFERENCES.notificationsEnabled)
                setCitationsExpanded(prefs.citationsExpanded ?? DEFAULT_PREFERENCES.citationsExpanded)

                // Apply dark mode from saved preference
                if (prefs.isDarkMode) {
                    document.documentElement.classList.add('dark')
                }
            }
        } catch (error) {
            console.error('Failed to load preferences:', error)
        }
        setPrefsLoaded(true)
    }, [])

    // Save preferences to localStorage when they change
    useEffect(() => {
        if (!prefsLoaded) return // Don't save until we've loaded

        try {
            const prefs: UserPreferences = {
                isDarkMode,
                notificationsEnabled,
                citationsExpanded,
            }
            localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs))
        } catch (error) {
            console.error('Failed to save preferences:', error)
        }
    }, [isDarkMode, notificationsEnabled, citationsExpanded, prefsLoaded])

    useEffect(() => {
        async function fetchUser() {
            const supabase = createSupabaseClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser({ email: user.email ?? null, id: user.id })
            }
            setLoading(false)
        }
        if (open) {
            fetchUser()
        }
    }, [open])

    const handleSignOut = async () => {
        toast.loading('Signing out...')
        await signOut()
    }

    const getInitials = (email: string | null) => {
        if (!email) return '?'
        const username = email.split('@')[0]
        return username ? username.slice(0, 2).toUpperCase() : '?'
    }

    const handleDarkModeToggle = (enabled: boolean) => {
        setIsDarkMode(enabled)
        // In a real app, this would update the theme
        document.documentElement.classList.toggle('dark', enabled)
        toast.success(enabled ? 'Dark mode enabled' : 'Dark mode disabled')
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader className="pb-4">
                    <SheetTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Settings
                    </SheetTitle>
                    <SheetDescription>
                        Manage your account and preferences
                    </SheetDescription>
                </SheetHeader>

                {/* User Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mb-6"
                >
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={undefined} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                            {loading ? '...' : getInitials(user?.email ?? null)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                            {loading ? 'Loading...' : (user?.email || 'Guest User')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {user ? 'Signed in' : 'Not signed in'}
                        </p>
                    </div>
                </motion.div>

                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
                        <TabsTrigger value="usage" className="text-xs">Usage</TabsTrigger>
                        <TabsTrigger value="help" className="text-xs">Help</TabsTrigger>
                    </TabsList>

                    {/* General Settings Tab */}
                    <TabsContent value="general" className="space-y-4 mt-4">
                        <div className="space-y-4">
                            {/* Appearance */}
                            <div>
                                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                    {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                    Appearance
                                </h4>
                                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                    <Label htmlFor="dark-mode" className="text-sm cursor-pointer">
                                        Dark Mode
                                    </Label>
                                    <Switch
                                        id="dark-mode"
                                        checked={isDarkMode}
                                        onCheckedChange={handleDarkModeToggle}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Notifications */}
                            <div>
                                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                    <Bell className="w-4 h-4" />
                                    Notifications
                                </h4>
                                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                    <Label htmlFor="notifications" className="text-sm cursor-pointer">
                                        Email Notifications
                                    </Label>
                                    <Switch
                                        id="notifications"
                                        checked={notificationsEnabled}
                                        onCheckedChange={setNotificationsEnabled}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Chat Preferences */}
                            <div>
                                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Chat Preferences
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                        <Label htmlFor="citations-expanded" className="text-sm cursor-pointer">
                                            Auto-expand citations
                                        </Label>
                                        <Switch
                                            id="citations-expanded"
                                            checked={citationsExpanded}
                                            onCheckedChange={setCitationsExpanded}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Usage Tab */}
                    <TabsContent value="usage" className="mt-4">
                        <UsageDashboard />
                    </TabsContent>

                    {/* Help Tab */}
                    <TabsContent value="help" className="space-y-3 mt-4">
                        <Link
                            href="/legal/privacy"
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-sm">
                                <Shield className="w-4 h-4 text-muted-foreground" />
                                Privacy Policy
                            </span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>

                        <Link
                            href="/legal/terms"
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-sm">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                Terms of Service
                            </span>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>

                        <a
                            href="https://github.com/your-org/farchat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                            <span className="flex items-center gap-2 text-sm">
                                <HelpCircle className="w-4 h-4 text-muted-foreground" />
                                Help & Support
                            </span>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </a>
                    </TabsContent>
                </Tabs>

                {/* Sign Out Button */}
                {user && (
                    <div className="mt-6 pt-4 border-t">
                        <Button
                            variant="outline"
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={handleSignOut}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}
