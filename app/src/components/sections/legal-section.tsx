interface LegalSectionProps {
    id: string
    number?: string
    title: string
    children: React.ReactNode
}

export function LegalSection({ id, number, title, children }: LegalSectionProps) {
    return (
        <section id={id} className="scroll-mt-24 mb-8 last:mb-0">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-baseline gap-2">
                {number && (
                    <span className="text-slate-400 dark:text-slate-500 font-normal">
                        {number}.
                    </span>
                )}
                {title}
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
                {children}
            </div>
        </section>
    )
}
