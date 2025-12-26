'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare, Search, PlusCircle, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavButtonProps {
    icon: React.ElementType
    label: string
    href?: string
    onClick?: (() => void) | undefined
    isActive?: boolean
    variant?: 'default' | 'primary'
}

function NavButton({ icon: Icon, label, href, onClick, isActive, variant = 'default' }: NavButtonProps) {
    const baseClasses = cn(
        // WCAG 2.2 AA touch target: 44x44px minimum
        "flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-1",
        "text-xs font-medium transition-colors rounded-lg",
        variant === 'primary'
            ? "text-federal-navy"
            : isActive
                ? "text-federal-navy bg-federal-navy/10"
                : "text-muted-foreground hover:text-foreground"
    )

    const content = (
        <>
            <Icon className={cn(
                "w-5 h-5 mb-0.5",
                variant === 'primary' && "text-federal-navy"
            )} />
            <span>{label}</span>
        </>
    )

    if (href) {
        return (
            <Link href={href} className={baseClasses}>
                {content}
            </Link>
        )
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            {content}
        </button>
    )
}

interface MobileBottomNavProps {
    onNewChat?: () => void
    className?: string
}

export function MobileBottomNav({ onNewChat, className }: MobileBottomNavProps) {
    const pathname = usePathname()

    return (
        <nav className={cn(
            "fixed bottom-0 left-0 right-0 z-50",
            "bg-background/95 backdrop-blur-lg border-t border-border",
            // Safe area handling for iOS notch/Android nav bar
            "pb-[env(safe-area-inset-bottom)]",
            className
        )}>
            <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
                <NavButton
                    icon={MessageSquare}
                    label="Chats"
                    href="/chat"
                    isActive={pathname === '/chat'}
                />
                <NavButton
                    icon={Search}
                    label="Search"
                    href="/search"
                    isActive={pathname === '/search'}
                />
                <NavButton
                    icon={PlusCircle}
                    label="New"
                    onClick={onNewChat}
                    variant="primary"
                />
                <NavButton
                    icon={User}
                    label="Account"
                    href="/settings"
                    isActive={pathname === '/settings'}
                />
            </div>
        </nav>
    )
}
