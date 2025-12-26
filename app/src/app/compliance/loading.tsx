import { Skeleton } from "@/components/ui/skeleton"

export default function ComplianceLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center space-y-4">
                        <Skeleton className="h-6 w-40 mx-auto" />
                        <Skeleton className="h-12 w-full max-w-xl mx-auto" />
                        <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
                    </div>
                </div>
            </section>

            {/* Compliance Cards */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <Skeleton className="w-12 h-12 rounded-xl" />
                                    <Skeleton className="h-6 w-24 rounded-full" />
                                </div>
                                <Skeleton className="h-6 w-48 mb-2" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security Practices */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <Skeleton className="h-8 w-64 mx-auto mb-8 md:mb-12" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                                <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-8 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
