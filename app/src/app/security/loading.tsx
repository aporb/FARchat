import { Skeleton } from "@/components/ui/skeleton"

export default function SecurityLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center space-y-4">
                        <Skeleton className="h-6 w-24 mx-auto" />
                        <Skeleton className="h-12 w-72 mx-auto" />
                        <Skeleton className="h-6 w-full max-w-xl mx-auto" />
                    </div>
                </div>
            </section>

            {/* Security Overview */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                                <div className="flex items-center gap-4 mb-6">
                                    <Skeleton className="w-12 h-12 rounded-xl" />
                                    <Skeleton className="h-6 w-40" />
                                </div>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((j) => (
                                        <div key={j} className="flex items-start gap-3">
                                            <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                                            <Skeleton className="h-5 w-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
