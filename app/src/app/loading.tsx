export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-federal-navy text-white overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-federal-blue/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-federal-gold/5 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="relative flex flex-col items-center space-y-12 animate-in fade-in zoom-in duration-1000">
                {/* Modern Loader Animation */}
                <div className="relative w-24 h-24">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-t-2 border-federal-gold/30 rounded-full animate-[spin_3s_linear_infinite]" />
                    {/* Middle Ring */}
                    <div className="absolute inset-2 border-r-2 border-federal-blue/50 rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                    {/* Inner Logo Mark */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1 h-12 bg-gradient-to-b from-federal-gold to-transparent rounded-full animate-pulse shadow-[0_0_15px_rgba(197,168,124,0.5)]" />
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h2 className="text-xl font-bold tracking-[0.2em] uppercase text-white/90">
                        FARCHAT <span className="text-federal-gold">INTELLIGENCE</span>
                    </h2>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-federal-blue to-federal-gold w-1/3 animate-[loading-bar_2s_infinite_ease-in-out]" />
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 font-mono tracking-widest uppercase italic">
                        Connecting to regulatory mesh...
                    </p>
                </div>
            </div>

        </div>
    )
}
