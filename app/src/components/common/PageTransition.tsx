'use client'

import { motion } from 'framer-motion'
import { pageTransition } from '@/lib/animations'

interface PageTransitionProps {
    children: React.ReactNode
    className?: string | undefined
}

/**
 * Wraps page content with smooth entrance animation.
 * Use this component at the top level of page components for consistent transitions.
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
    return (
        <motion.div
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            className={className}
        >
            {children}
        </motion.div>
    )
}

/**
 * Section transition with stagger support for child elements.
 * Useful for hero sections and feature grids.
 */
export function SectionTransition({
    children,
    className,
    delay = 0
}: PageTransitionProps & { delay?: number | undefined }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.section>
    )
}
