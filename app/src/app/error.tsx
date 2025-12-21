'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-federal-navy text-white p-6">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700">
                <div className="relative">
                    <div className="absolute inset-0 bg-federal-blue/20 blur-3xl rounded-full" />
                    <h1 className="relative text-9xl font-black tracking-tighter text-white/10 select-none">
                        500
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-t-2 border-l-2 border-federal-gold rounded-tl-xl rotate-45 animate-pulse" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight">Something went wrong</h2>
                    <p className="text-slate-400">
                        We've encountered an unexpected regulatory anomaly. Our team has been notified.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <button
                        onClick={() => reset()}
                        className="px-8 py-3 bg-federal-blue text-white font-semibold rounded-lg hover:bg-federal-blue/80 transition-all duration-200 shadow-lg shadow-federal-blue/20"
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="px-8 py-3 bg-white/5 text-white font-semibold rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                    >
                        Return home
                    </Link>
                </div>

                <div className="pt-8 text-xs text-slate-500 font-mono tracking-widest uppercase italic">
          // Error Digest: {error.digest || 'Internal System Failure'}
                </div>
            </div>
        </div>
    )
}
