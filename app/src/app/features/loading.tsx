import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturesLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center space-y-4">
                        <Skeleton className="h-6 w-32 mx-auto" />
                        <Skeleton className="h-12 w-full max-w-2xl mx-auto" />
                        <Skeleton className="h-6 w-full max-w-xl mx-auto" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                    <div className="space-y-8 md:space-y-12">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12 items-center`}
                            >
                                <div className="w-full md:w-1/3">
                                    <Skeleton className="w-full aspect-square rounded-2xl" />
                                </div>
                                <div className="w-full md:w-2/3 space-y-4">
                                    <Skeleton className="h-8 w-64" />
                                    <Skeleton className="h-20 w-full" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-48" />
                                        <Skeleton className="h-5 w-56" />
                                        <Skeleton className="h-5 w-44" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
