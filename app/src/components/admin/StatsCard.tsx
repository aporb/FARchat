import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    trend?: {
        value: number
        isPositive: boolean
    }
    className?: string
}

export function StatsCard({ title, value, icon: Icon, trend, className }: StatsCardProps) {
    return (
        <div className={cn(
            "glass-card p-4 md:p-6 rounded-xl hover-elevate",
            className
        )}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground">
                        {title}
                    </p>
                    <p className="text-2xl md:text-3xl font-bold mt-1 text-foreground">
                        {value}
                    </p>
                    {trend && (
                        <p className={cn(
                            "text-xs mt-1 font-medium",
                            trend.isPositive ? "text-green-600" : "text-red-600"
                        )}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </p>
                    )}
                </div>
                <div className="p-2 md:p-3 bg-federal-navy/10 rounded-lg">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-federal-navy" />
                </div>
            </div>
        </div>
    )
}
