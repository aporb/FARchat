import { Skeleton } from "@/components/ui/skeleton"

export default function ChangelogLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="text-center space-y-4">
                        <Skeleton className="h-6 w-28 mx-auto" />
                        <Skeleton className="h-12 w-48 mx-auto" />
                        <Skeleton className="h-6 w-96 mx-auto" />
                    </div>
                </div>
            </section>

            {/* Changelog Timeline */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="space-y-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="md:grid md:grid-cols-[140px_1fr] md:gap-8">
                                <div className="hidden md:block">
                                    <Skeleton className="h-5 w-28 ml-auto" />
                                </div>
                                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                    <Skeleton className="h-4 w-24 mb-3 md:hidden" />
                                    <Skeleton className="h-6 w-20 rounded-full mb-3" />
                                    <Skeleton className="h-7 w-64 mb-2" />
                                    <Skeleton className="h-16 w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
