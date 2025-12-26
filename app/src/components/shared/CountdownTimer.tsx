'use client'

import React, { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
    targetDate: Date
    label?: string
    onComplete?: () => void
    className?: string
}

interface TimeLeft {
    days: number
    hours: number
    minutes: number
    seconds: number
}

/**
 * Countdown timer component for displaying time until a target date.
 * Useful for usage reset timers, limited-time offers, etc.
 *
 * @example
 * <CountdownTimer
 *   targetDate={new Date('2025-01-01')}
 *   label="Resets in"
 *   onComplete={() => console.log('Timer complete!')}
 * />
 */
export function CountdownTimer({
    targetDate,
    label = 'Resets in',
    onComplete,
    className
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

    useEffect(() => {
        const calculateTimeLeft = (): TimeLeft | null => {
            const difference = targetDate.getTime() - Date.now()

            if (difference <= 0) {
                onComplete?.()
                return null
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }

        setTimeLeft(calculateTimeLeft())

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate, onComplete])

    if (!timeLeft) {
        return (
            <span className={cn("text-sm text-muted-foreground", className)}>
                Usage reset!
            </span>
        )
    }

    return (
        <div className={cn("flex items-center gap-2 text-sm", className)}>
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{label}</span>
            <span className="font-mono font-medium">
                {timeLeft.days > 0 && `${timeLeft.days}d `}
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
            </span>
        </div>
    )
}
