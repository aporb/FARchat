import { Skeleton } from '@/components/ui/skeleton'

export default function AdminLoading() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Stats Cards */}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="p-6 border rounded-lg space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="border rounded-lg">
                    <div className="p-4 border-b">
                        <Skeleton className="h-6 w-32" />
                    </div>
                    <div className="divide-y">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="p-4 flex items-center gap-4">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <Skeleton className="h-4 w-48 flex-1" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
