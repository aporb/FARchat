'use client'

import React from 'react'
import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BookmarkButtonProps {
    isBookmarked: boolean
    onClick: () => void
    size?: 'sm' | 'default' | 'lg'
    className?: string
}

export function BookmarkButton({
    isBookmarked,
    onClick,
    size = 'default',
    className
}: BookmarkButtonProps) {
    const sizeClasses = {
        sm: 'min-w-[36px] min-h-[36px]',
        default: 'min-w-[44px] min-h-[44px]',
        lg: 'min-w-[48px] min-h-[48px]',
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onClick}
            className={cn(sizeClasses[size], className)}
            aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            aria-pressed={isBookmarked}
        >
            <Bookmark
                className={cn(
                    "w-5 h-5 transition-colors",
                    isBookmarked && "fill-amber-500 text-amber-500"
                )}
            />
        </Button>
    )
}
