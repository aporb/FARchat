import { Skeleton } from '@/components/ui/skeleton'

export default function LoginLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="w-full max-w-md p-8">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Skeleton className="h-12 w-32" />
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <Skeleton className="h-8 w-48 mx-auto" />
                        <Skeleton className="h-4 w-64 mx-auto" />
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>

                    {/* Button */}
                    <Skeleton className="h-12 w-full rounded-lg" />

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-px flex-1" />
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-px flex-1" />
                    </div>

                    {/* Social buttons */}
                    <Skeleton className="h-10 w-full rounded-lg" />
                </div>
            </div>
        </div>
    )
}
