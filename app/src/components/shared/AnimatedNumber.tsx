'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AnimatedNumberProps {
    value: number
    duration?: number
    formatFn?: (value: number) => string
    className?: string
}

/**
 * Animated number counter that respects reduced motion preference.
 * Uses ease-out cubic easing for smooth animation.
 *
 * @example
 * <AnimatedNumber value={1234} />
 * <AnimatedNumber value={99.5} formatFn={(v) => `${v.toFixed(1)}%`} />
 */
export function AnimatedNumber({
    value,
    duration = 1000,
    formatFn = (v) => v.toLocaleString(),
    className
}: AnimatedNumberProps) {
    const [displayValue, setDisplayValue] = useState(0)
    const prefersReducedMotion = useReducedMotion()
    const previousValue = useRef(0)

    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayValue(value)
            return
        }

        const startValue = previousValue.current
        const startTime = performance.now()

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3)
            const current = startValue + (value - startValue) * easeOut

            setDisplayValue(Math.round(current))

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
        previousValue.current = value
    }, [value, duration, prefersReducedMotion])

    return <span className={className}>{formatFn(displayValue)}</span>
}
