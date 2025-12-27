import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/sections/footer"
import { CalendarIcon } from "lucide-react"

interface LegalSection {
    id: string
    title: string
}

interface LegalPageLayoutProps {
    badge: string
    title: string
    subtitle?: string
    lastUpdated: string
    sections: LegalSection[]
    children: React.ReactNode
}

export function LegalPageLayout({
    badge,
    title,
    subtitle,
    lastUpdated,
    sections,
    children
}: LegalPageLayoutProps) {
    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
                {/* Hero Section */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <div className="text-center">
                            <Badge variant="outline" className="mb-4">
                                {badge}
                            </Badge>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6">
                                    {subtitle}
                                </p>
                            )}
                            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <CalendarIcon className="w-4 h-4" />
                                <span>Last Updated: {lastUpdated}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content with TOC Sidebar */}
                <section className="py-8">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                            {/* Table of Contents - Sticky Sidebar */}
                            <aside className="lg:w-64 flex-shrink-0">
                                <div className="lg:sticky lg:top-24">
                                    <nav className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
                                        <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 text-sm uppercase tracking-wide">
                                            Contents
                                        </h2>
                                        <ul className="space-y-2">
                                            {sections.map((section) => (
                                                <li key={section.id}>
                                                    <a
                                                        href={`#${section.id}`}
                                                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors block py-1"
                                                    >
                                                        {section.title}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <main className="flex-1 min-w-0">
                                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}
