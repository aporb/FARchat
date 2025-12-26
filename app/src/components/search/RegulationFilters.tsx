'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const REGULATIONS = [
    { id: 'all', label: 'All', count: null },
    { id: 'FAR', label: 'FAR', count: 53 },
    { id: 'DFARS', label: 'DFARS', count: 48 },
    { id: 'VAAR', label: 'VAAR', count: 12 },
    { id: 'GSAM', label: 'GSAM', count: 8 },
    { id: 'AFARS', label: 'AFARS', count: 6 },
    { id: 'NFS', label: 'NFS', count: 4 },
    { id: 'DLAD', label: 'DLAD', count: 3 },
] as const

interface RegulationFiltersProps {
    selected: string
    onSelect: (regulation: string) => void
    className?: string
}

export function RegulationFilters({ selected, onSelect, className }: RegulationFiltersProps) {
    return (
        <ScrollArea className={cn("w-full whitespace-nowrap", className)}>
            <div className="flex gap-2 pb-2">
                {REGULATIONS.map((reg) => (
                    <Button
                        key={reg.id}
                        variant={selected === reg.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => onSelect(reg.id)}
                        className={cn(
                            "min-h-[36px] min-w-[60px] rounded-full shrink-0",
                            selected === reg.id && "bg-federal-navy dark:bg-blue-600 hover:bg-federal-navy/90 dark:hover:bg-blue-500"
                        )}
                    >
                        {reg.label}
                        {reg.count !== null && (
                            <span className="ml-1.5 text-xs opacity-70">({reg.count})</span>
                        )}
                    </Button>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}
