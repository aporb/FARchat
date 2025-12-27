'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface StickyMobileCTAProps {
    href?: string
    label?: string
    className?: string
}

export function StickyMobileCTA({
    href = '#access',
    label = 'Start Using FARchat',
    className
}: StickyMobileCTAProps) {
    const [isDismissed, setIsDismissed] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user previously dismissed
        const dismissed = sessionStorage.getItem('sticky-cta-dismissed')
        if (dismissed) {
            setIsDismissed(true)
            return
        }

        // Show after scrolling past hero section
        const handleScroll = () => {
            const scrollY = window.scrollY
            const heroHeight = window.innerHeight * 0.8
            setIsVisible(scrollY > heroHeight)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleDismiss = () => {
        setIsDismissed(true)
        sessionStorage.setItem('sticky-cta-dismissed', 'true')
    }

    if (isDismissed || !isVisible) return null

    return (
        <div
            className={cn(
                "fixed bottom-0 left-0 right-0 z-40 md:hidden",
                "p-4 bg-background/95 backdrop-blur-sm border-t border-border",
                "animate-in slide-in-from-bottom duration-300",
                // Safe area for iOS
                "pb-[max(1rem,env(safe-area-inset-bottom))]",
                className
            )}
        >
            <div className="relative">
                <Button
                    className="w-full h-12 text-base font-semibold bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                    asChild
                >
                    <Link href={href}>
                        {label}
                    </Link>
                </Button>

                {/* Dismiss button */}
                <button
                    onClick={handleDismiss}
                    className="absolute -top-2 -right-2 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Dismiss"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
