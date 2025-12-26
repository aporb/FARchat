import { Skeleton } from "@/components/ui/skeleton"

export default function CookiesLoading() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl space-y-6">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-24 w-full" />

                <Skeleton className="h-8 w-56 mt-8" />
                <Skeleton className="h-16 w-full" />

                <Skeleton className="h-8 w-48 mt-8" />
                <Skeleton className="h-32 w-full" />

                <Skeleton className="h-8 w-52 mt-8" />
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    )
}
