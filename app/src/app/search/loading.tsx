import { Skeleton } from '@/components/ui/skeleton'

export default function SearchLoading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Skeleton className="h-12 w-full rounded-xl mb-8" />

                    {/* Filters */}
                    <div className="flex gap-2 mb-6">
                        <Skeleton className="h-8 w-20 rounded-full" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                        <Skeleton className="h-8 w-16 rounded-full" />
                    </div>

                    {/* Results */}
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="p-4 border rounded-lg space-y-2">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex gap-2 pt-2">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
