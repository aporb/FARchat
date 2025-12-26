'use client'

import { motion } from 'framer-motion'
import { pageTransition, noMotionFade } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface PageTransitionProps {
    children: React.ReactNode
    className?: string | undefined
}

/**
 * Wraps page content with smooth entrance animation.
 * Use this component at the top level of page components for consistent transitions.
 * Respects prefers-reduced-motion for WCAG 2.2 compliance.
 *
 * @example
 * export default function MyPage() {
 *     return (
 *         <PageTransition>
 *             <div>Page content</div>
 *         </PageTransition>
 *     )
 * }
 */
export function PageTransition({ children, className }: PageTransitionProps) {
    const prefersReducedMotion = useReducedMotion()

    const animationProps = prefersReducedMotion
        ? { initial: noMotionFade.initial, animate: noMotionFade.animate }
        : { initial: pageTransition.initial, animate: pageTransition.animate }

    return (
        <motion.div
            {...animationProps}
            className={className}
        >
            {children}
        </motion.div>
    )
}

/**
 * Section transition with stagger support for child elements.
 * Useful for hero sections and feature grids.
 * Respects prefers-reduced-motion for WCAG 2.2 compliance.
 */
export function SectionTransition({
    children,
    className,
    delay = 0
}: PageTransitionProps & { delay?: number | undefined }) {
    const prefersReducedMotion = useReducedMotion()

    const animationProps = prefersReducedMotion
        ? {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            transition: { duration: 0.01 }
          }
        : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay }
          }

    return (
        <motion.section
            {...animationProps}
            viewport={{ once: true, margin: "-100px" }}
            className={className}
        >
            {children}
        </motion.section>
    )
}
