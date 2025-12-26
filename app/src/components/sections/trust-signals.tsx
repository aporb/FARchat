import React from 'react'
import { Shield, Lock, Eye, FileCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

const trustSignals = [
    {
        icon: Shield,
        label: 'Pursuing FedRAMP',
        description: 'Cloud security authorization'
    },
    {
        icon: Eye,
        label: 'Building for 508',
        description: 'Accessibility in progress'
    },
    {
        icon: Lock,
        label: 'SOC 2 Planned',
        description: 'Security certification roadmap'
    },
    {
        icon: FileCheck,
        label: 'ITAR Architecture',
        description: 'Export control ready'
    },
]

interface TrustSignalsProps {
    className?: string
    variant?: 'default' | 'compact'
}

export function TrustSignals({ className, variant = 'default' }: TrustSignalsProps) {
    if (variant === 'compact') {
        // Compact version for hero section
        return (
            <div className={cn("flex flex-wrap justify-center gap-3", className)}>
                {trustSignals.slice(0, 3).map((signal) => (
                    <div
                        key={signal.label}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                        <signal.icon className="h-4 w-4" />
                        <span className="text-xs font-medium">{signal.label}</span>
                    </div>
                ))}
            </div>
        )
    }

    // Full version for dedicated section
    return (
        <section className={cn("py-16 bg-slate-50 dark:bg-slate-900/50", className)} id="compliance">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Built for Federal Standards
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        FARchat is building toward the rigorous security and accessibility
                        requirements expected by federal agencies.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {trustSignals.map((signal) => (
                        <div
                            key={signal.label}
                            className={cn(
                                "flex flex-col items-center text-center p-6 rounded-xl",
                                "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm",
                                "hover-elevate hover:border-federal-navy/20 dark:hover:border-blue-500/30"
                            )}
                        >
                            <div className="w-12 h-12 rounded-full bg-federal-navy/10 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <signal.icon className="h-6 w-6 text-federal-navy dark:text-blue-400" />
                            </div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                {signal.label}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {signal.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* VPAT Link */}
                <div className="text-center mt-8">
                    <a
                        href="/vpat"
                        className="text-sm text-federal-navy dark:text-blue-400 hover:underline font-medium"
                    >
                        View our Voluntary Product Accessibility Template (VPAT) →
                    </a>
                </div>
            </div>
        </section>
    )
}
