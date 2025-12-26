import { Skeleton } from "@/components/ui/skeleton"

export default function DemoLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center space-y-4">
                        <Skeleton className="h-6 w-32 mx-auto" />
                        <Skeleton className="h-12 w-full max-w-md mx-auto" />
                        <Skeleton className="h-6 w-full max-w-xl mx-auto" />
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Skeleton className="aspect-video w-full rounded-2xl" />
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <Skeleton className="h-8 w-48 mx-auto mb-8 md:mb-12" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                                <Skeleton className="h-6 w-40 mb-2" />
                                <Skeleton className="h-12 w-full mb-4" />
                                <Skeleton className="h-16 w-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
