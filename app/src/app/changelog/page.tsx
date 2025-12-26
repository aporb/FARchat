import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import {
    SparklesIcon,
    WrenchIcon,
    TrendingUpIcon,
    MegaphoneIcon
} from "lucide-react"

export const metadata: Metadata = {
    title: "Changelog | FARchat",
    description: "The latest updates, improvements, and fixes to FARchat.",
}

type ChangelogCategory = "feature" | "improvement" | "fix" | "announcement"

interface ChangelogEntry {
    id: string
    date: string
    version?: string
    category: ChangelogCategory
    title: string
    description: string
    details?: string[]
}

const categoryConfig: Record<ChangelogCategory, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
    feature: {
        icon: SparklesIcon,
        label: "Feature",
        color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
    },
    improvement: {
        icon: TrendingUpIcon,
        label: "Improvement",
        color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
    },
    fix: {
        icon: WrenchIcon,
        label: "Fix",
        color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
    },
    announcement: {
        icon: MegaphoneIcon,
        label: "Announcement",
        color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
    }
}

const changelogEntries: ChangelogEntry[] = [
    {
        id: "alpha-launch",
        date: "December 2025",
        category: "announcement",
        title: "FARchat Alpha Now Available",
        description: "We're excited to announce the public alpha of FARchat. Create a free account to start exploring federal acquisition regulations with AI-powered intelligence.",
        details: [
            "Free access during alpha period",
            "Full access to all 25+ regulation libraries",
            "AI-powered natural language search",
            "Citation-backed answers"
        ]
    },
    {
        id: "natural-language-search",
        date: "December 2025",
        category: "feature",
        title: "Natural Language Search",
        description: "Ask questions about FAR, DFARS, and agency supplements in plain English. FARchat understands context and provides relevant regulatory guidance.",
        details: [
            "Conversational query interface",
            "Context-aware responses",
            "Automatic citation linking"
        ]
    },
    {
        id: "regulation-libraries",
        date: "December 2025",
        category: "feature",
        title: "25+ Regulation Libraries",
        description: "Search across FAR, DFARS, VAAR, GSAM, NMCARS, and more - all from a single interface.",
        details: [
            "Federal Acquisition Regulation (FAR)",
            "Defense FAR Supplement (DFARS)",
            "VA Acquisition Regulation (VAAR)",
            "GSA Acquisition Manual (GSAM)",
            "Navy Marine Corps Acquisition Regulation Supplement (NMCARS)",
            "And 20+ more agency supplements"
        ]
    },
    {
        id: "nightly-sync",
        date: "December 2025",
        category: "feature",
        title: "Nightly Regulation Sync",
        description: "FARchat syncs with the Federal Register and Acquisition.gov every night to ensure you always have access to the latest regulatory updates.",
    },
    {
        id: "dark-mode",
        date: "December 2025",
        category: "improvement",
        title: "Dark Mode Support",
        description: "FARchat now supports dark mode for comfortable viewing in low-light environments. Your preference is automatically saved.",
    }
]

export default function ChangelogPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="text-center">
                        <Badge variant="outline" className="mb-4">
                            Changelog
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            What&apos;s New
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            The latest updates, improvements, and fixes to FARchat.
                        </p>
                    </div>
                </div>
            </section>

            {/* Changelog Timeline */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="space-y-8">
                        {changelogEntries.map((entry, index) => {
                            const config = categoryConfig[entry.category]
                            const Icon = config.icon

                            return (
                                <div
                                    key={entry.id}
                                    className="relative pl-8 md:pl-0 md:grid md:grid-cols-[140px_1fr] md:gap-8"
                                >
                                    {/* Timeline line */}
                                    {index < changelogEntries.length - 1 && (
                                        <div className="absolute left-3 md:left-[156px] top-8 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />
                                    )}

                                    {/* Date */}
                                    <div className="hidden md:block text-right">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 sticky top-24">
                                            {entry.date}
                                        </p>
                                        {entry.version && (
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                                v{entry.version}
                                            </p>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="relative">
                                        {/* Timeline dot */}
                                        <div className="absolute -left-8 md:left-0 md:-translate-x-[calc(100%+32px)] top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" />
                                        </div>

                                        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                                            {/* Mobile date */}
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 md:hidden">
                                                {entry.date}
                                            </p>

                                            {/* Category badge */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                                                    <Icon className="w-3 h-3" />
                                                    {config.label}
                                                </span>
                                            </div>

                                            {/* Title & Description */}
                                            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                                {entry.title}
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-400">
                                                {entry.description}
                                            </p>

                                            {/* Details */}
                                            {entry.details && entry.details.length > 0 && (
                                                <ul className="mt-4 space-y-2">
                                                    {entry.details.map((detail, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                                                        >
                                                            <span className="text-slate-400 dark:text-slate-500 mt-1">•</span>
                                                            {detail}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
