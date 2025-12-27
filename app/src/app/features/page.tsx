import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/sections/footer"
import { PageBackground, GlassCard } from "@/components/layout/page-background"
import {
    NetworkIcon,
    ShieldCheckIcon,
    RefreshCwIcon,
    MessageSquareIcon,
    LibraryIcon,
    LockIcon,
    CheckIcon,
    ArrowRightIcon,
    PlayIcon
} from "lucide-react"

export const metadata: Metadata = {
    title: "Features | FARchat - Federal Acquisition Research Tool",
    description: "Explore FARchat features: AI-powered regulatory search, compliance autopilot, 25+ regulation libraries, and more.",
}

type ColorKey = "blue" | "green" | "amber" | "purple" | "indigo" | "slate"

interface Feature {
    id: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    details: string[]
    color: ColorKey
}

const features: Feature[] = [
    {
        id: "regulatory-graph",
        icon: NetworkIcon,
        title: "The Regulatory Graph",
        description: "FARchat doesn't just search text. Our semantic intelligence engine maps relationships between FAR, DFARS, and 23 agency supplements to understand the hierarchy of compliance.",
        details: [
            "Cross-reference regulations automatically",
            "Understand supplement relationships",
            "Navigate complex compliance chains"
        ],
        color: "blue"
    },
    {
        id: "compliance-autopilot",
        icon: ShieldCheckIcon,
        title: "Compliance Autopilot",
        description: "Generate J&As, Acquisition Plans, and Market Research Reports with citations automatically pulled from the correct agency-specific regulations.",
        details: [
            "Auto-cite relevant regulations",
            "Format documents to agency standards",
            "Reduce research time by 85%"
        ],
        color: "green"
    },
    {
        id: "live-updates",
        icon: RefreshCwIcon,
        title: "Always Current",
        description: "Synced nightly with the Federal Register and Acquisition.gov. Never worry about outdated information affecting your compliance decisions.",
        details: [
            "Nightly synchronization",
            "Change tracking and alerts",
            "Historical version access"
        ],
        color: "amber"
    },
    {
        id: "natural-language",
        icon: MessageSquareIcon,
        title: "Ask Questions, Get Answers",
        description: "No more keyword hunting. Ask questions in plain English and get relevant regulatory guidance with precise citations.",
        details: [
            "Conversational interface",
            "Context-aware responses",
            "Source citations included"
        ],
        color: "purple"
    },
    {
        id: "multi-agency",
        icon: LibraryIcon,
        title: "25+ Regulation Libraries",
        description: "From FAR to agency-specific supplements including DFARS, VAAR, GSAM, NMCARS, AFFARS, and more - all in one place.",
        details: [
            "Comprehensive coverage",
            "Unified search across all",
            "Agency-specific context"
        ],
        color: "indigo"
    },
    {
        id: "security",
        icon: LockIcon,
        title: "Built for Federal Standards",
        description: "Designed with federal security requirements in mind. We're actively pursuing FedRAMP authorization and building for Section 508 accessibility.",
        details: [
            "Pursuing FedRAMP authorization",
            "Building for Section 508 compliance",
            "Enterprise-grade encryption"
        ],
        color: "slate"
    }
]

const colorVariants: Record<ColorKey, { icon: string }> = {
    blue: {
        icon: "bg-blue-500/20 dark:bg-blue-500/30 text-blue-600 dark:text-blue-400"
    },
    green: {
        icon: "bg-green-500/20 dark:bg-green-500/30 text-green-600 dark:text-green-400"
    },
    amber: {
        icon: "bg-amber-500/20 dark:bg-amber-500/30 text-amber-600 dark:text-amber-400"
    },
    purple: {
        icon: "bg-purple-500/20 dark:bg-purple-500/30 text-purple-600 dark:text-purple-400"
    },
    indigo: {
        icon: "bg-indigo-500/20 dark:bg-indigo-500/30 text-indigo-600 dark:text-indigo-400"
    },
    slate: {
        icon: "bg-slate-500/20 dark:bg-slate-500/30 text-slate-600 dark:text-slate-400"
    }
}

export default function FeaturesPage() {
    return (
        <>
            <Navigation />
            <PageBackground variant="waves" overlay="light" imageOpacity={0.03}>
                <div className="pt-20 pb-16">
                    {/* Hero Section */}
                    <section className="py-12 md:py-20">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                            <div className="text-center">
                                <Badge variant="outline" className="mb-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                                    Platform Features
                                </Badge>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                                    Powerful Tools for Federal Acquisition Research
                                </h1>
                                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                                    Everything you need to navigate FAR, DFARS, and 25+ agency supplements in one intelligent platform.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Features Grid */}
                    <section className="py-8 md:py-12">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                            <div className="space-y-8 md:space-y-12">
                                {features.map((feature, index) => {
                                    const colors = colorVariants[feature.color]
                                    const isEven = index % 2 === 0

                                    return (
                                        <GlassCard
                                            key={feature.id}
                                            variant="medium"
                                            hover
                                            className="p-6 md:p-8"
                                        >
                                            <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-12 items-center`}>
                                                {/* Icon/Visual */}
                                                <div className="w-full md:w-1/3 flex items-center justify-center">
                                                    <div className={`w-20 h-20 md:w-28 md:h-28 rounded-2xl ${colors.icon} backdrop-blur-sm flex items-center justify-center`}>
                                                        <feature.icon className="w-10 h-10 md:w-14 md:h-14" />
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="w-full md:w-2/3 space-y-4">
                                                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                                                        {feature.title}
                                                    </h2>
                                                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
                                                        {feature.description}
                                                    </p>
                                                    <ul className="space-y-2">
                                                        {feature.details.map((detail) => (
                                                            <li key={detail} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                                                <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                                <span>{detail}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                            <div className="bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center border border-slate-700/50 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Ready to streamline your FAR research?
                                </h2>
                                <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                                    Join federal acquisition professionals who are saving hours every week.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg">
                                        <Link href="/login">
                                            Start Free During Alpha
                                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-700/50 backdrop-blur-sm">
                                        <Link href="/demo">
                                            <PlayIcon className="w-4 h-4 mr-2" />
                                            Watch Demo
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </PageBackground>
            <Footer />
        </>
    )
}
