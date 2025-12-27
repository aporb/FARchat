import Link from "next/link"
import { FileTextIcon, ArrowRightIcon } from "lucide-react"

interface PolicyLink {
    label: string
    href: string
    description?: string
}

interface RelatedPoliciesProps {
    policies: PolicyLink[]
}

export function RelatedPolicies({ policies }: RelatedPoliciesProps) {
    return (
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Related Policies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {policies.map((policy) => (
                    <Link
                        key={policy.href}
                        href={policy.href}
                        className="group flex items-center gap-3 p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                    >
                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                            <FileTextIcon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {policy.label}
                            </p>
                            {policy.description && (
                                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                                    {policy.description}
                                </p>
                            )}
                        </div>
                        <ArrowRightIcon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-shrink-0" />
                    </Link>
                ))}
            </div>
        </div>
    )
}
