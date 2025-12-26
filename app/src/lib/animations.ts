/**
 * Animation Constants & Utilities
 * Centralized animation configuration for consistent motion design
 *
 * WCAG 2.2 Compliance: All animations respect prefers-reduced-motion
 * Use getAnimationProps() helper for motion-aware animations
 */

// Duration tokens (in seconds)
export const duration = {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
} as const

// Easing curves
export const easing = {
    default: [0.25, 0.1, 0.25, 1],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1],
    spring: { type: 'spring', stiffness: 300, damping: 30 },
} as const

// Common animation variants
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
} as const

export const fadeInUp = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
} as const

export const fadeInDown = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
} as const

export const fadeInScale = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
} as const

export const slideInRight = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
} as const

export const slideInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
} as const

// Stagger container for children animations
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
} as const

export const staggerContainerFast = {
    animate: {
        transition: {
            staggerChildren: 0.05,
        },
    },
} as const

// Page transition variants
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: duration.normal, ease: easing.easeOut }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: duration.fast }
    },
} as const

// Modal/Dialog transitions
export const modalTransition = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: duration.fast }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: { duration: duration.fast }
    },
} as const

// Dropdown menu transitions
export const dropdownTransition = {
    initial: { opacity: 0, y: -10, scale: 0.95 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: duration.fast }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: { duration: duration.fast }
    },
} as const

// Skeleton pulse animation (CSS-based for performance)
export const skeletonPulse = 'animate-pulse bg-muted'

// Loading spinner
export const spinnerTransition = {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
} as const

// ============================================
// REDUCED MOTION SUPPORT (WCAG 2.2)
// ============================================

// No-motion variants - for users who prefer reduced motion
export const noMotion = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { opacity: 1 },
} as const

export const noMotionFade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
} as const

/**
 * Helper to get motion-aware animation props
 * Returns no-motion variants when user prefers reduced motion
 *
 * @param standardVariant - The normal animation variant
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @param useFade - Use fade-only instead of instant (default: true)
 * @returns Animation props respecting user preference
 */
export function getAnimationProps<T extends object>(
    standardVariant: T,
    prefersReducedMotion: boolean,
    useFade: boolean = true
): T {
    if (prefersReducedMotion) {
        return (useFade ? noMotionFade : noMotion) as unknown as T
    }
    return standardVariant
}
