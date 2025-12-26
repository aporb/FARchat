import { Skeleton } from "@/components/ui/skeleton"

export default function VPATLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center space-y-4">
                        <Skeleton className="h-6 w-20 mx-auto" />
                        <Skeleton className="h-12 w-80 mx-auto" />
                        <Skeleton className="h-6 w-full max-w-lg mx-auto" />
                    </div>
                </div>
            </section>

            {/* Commitment Statement */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Skeleton className="h-32 w-full rounded-2xl" />
                </div>
            </section>

            {/* Accessibility Features */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
                                    <Skeleton className="h-5 w-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* VPAT Table */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Skeleton className="h-8 w-56 mb-6" />
                    <Skeleton className="h-96 w-full rounded-2xl" />
                </div>
            </section>
        </div>
    )
}
