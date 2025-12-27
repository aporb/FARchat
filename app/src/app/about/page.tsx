import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/sections/footer"
import { PageBackground, GlassCard } from "@/components/layout/page-background"
import {
    TargetIcon,
    UsersIcon,
    ShieldCheckIcon,
    SparklesIcon,
    LockIcon,
    HeartIcon,
    ArrowRightIcon,
    CheckIcon,
    XIcon
} from "lucide-react"

export const metadata: Metadata = {
    title: "About | FARchat",
    description: "Learn about FARchat's mission to empower federal contracting professionals with AI-powered regulatory research.",
}

const values = [
    {
        icon: TargetIcon,
        title: "Accuracy First",
        description: "We cite our sources. Every response links back to the official regulatory text so you can verify and trust the information."
    },
    {
        icon: ShieldCheckIcon,
        title: "Security Focused",
        description: "Federal data requires federal-grade security. We're building toward FedRAMP authorization from day one."
    },
    {
        icon: UsersIcon,
        title: "Built by Practitioners",
        description: "Our team includes former Contracting Officers who understand the daily challenges of acquisition work."
    },
    {
        icon: HeartIcon,
        title: "Mission Driven",
        description: "We believe efficient government contracting benefits everyone. Better procurement means better outcomes for taxpayers."
    }
]

const problemSolutions = [
    {
        problem: "Hours spent searching through FAR, DFARS, and agency supplements",
        solution: "Natural language search across all regulations in seconds"
    },
    {
        problem: "Missing cross-references between related regulatory sections",
        solution: "Automatic cross-referencing with our semantic regulatory graph"
    },
    {
        problem: "Outdated information from third-party resources",
        solution: "Nightly sync with official sources at Acquisition.gov"
    },
    {
        problem: "Complex regulatory language that's hard to understand",
        solution: "AI-powered explanations with precise citations"
    }
]

export default function AboutPage() {
    return (
        <>
            <Navigation />
            <PageBackground variant="geometric" overlay="light" imageOpacity={0.04}>
                <div className="pt-20 pb-16">
                    {/* Hero Section */}
                    <section className="py-12 md:py-20">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                            <div className="text-center">
                                <Badge variant="outline" className="mb-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                                    About
                                </Badge>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                                    Empowering Federal Contracting with AI
                                </h1>
                                <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                                    We&apos;re building the tool we wished existed when navigating the complexity of federal acquisition regulations.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Mission Section */}
                    <section className="py-8 md:py-12">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                            <GlassCard variant="medium" className="p-6 md:p-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 dark:bg-blue-500/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                        <SparklesIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                                            Our Mission
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            To democratize access to federal acquisition knowledge. We believe that every contracting professional—whether at a Fortune 500 contractor or a small disadvantaged business—deserves efficient, accurate tools to navigate the regulatory landscape.
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </section>

                    {/* Why FARchat Section */}
                    <section className="py-8 md:py-12">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
                                Why FARchat?
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 text-center mb-8 max-w-3xl mx-auto">
                                Federal acquisition is governed by over 2,000 pages of regulations spread across FAR, DFARS, and 25+ agency supplements. Traditional search tools don&apos;t understand context, relationships, or the nuances of regulatory language.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {problemSolutions.map((item, index) => (
                                    <GlassCard key={index} variant="light" hover className="p-5">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <XIcon className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{item.problem}</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckIcon className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.solution}</p>
                                        </div>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Who We Are Section */}
                    <section className="py-8 md:py-12">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                            <div className="bg-slate-900/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-slate-700/50 shadow-2xl">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                                    Who We Are
                                </h2>
                                <p className="text-slate-300 text-center max-w-3xl mx-auto mb-4">
                                    We&apos;re a team of former Contracting Officers (GS-1102s) and AI engineers who have lived the challenges of federal acquisition. We&apos;ve sat through the same training, navigated the same DAU courses, and spent the same late nights trying to find that one clause we know exists somewhere in DFARS.
                                </p>
                                <p className="text-slate-400 text-center max-w-3xl mx-auto">
                                    FARchat exists because we built the tool we needed but couldn&apos;t find.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Our Values Section */}
                    <section className="py-8 md:py-12">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">
                                Our Values
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {values.map((value) => (
                                    <GlassCard key={value.title} variant="medium" hover className="p-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 dark:bg-blue-500/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                                <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                                {value.title}
                                            </h3>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {value.description}
                                        </p>
                                    </GlassCard>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Security Commitment Section */}
                    <section className="py-8 md:py-12">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                            <GlassCard variant="heavy" className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-green-500/20 dark:bg-green-500/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                                        <LockIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                            Security is in Our DNA
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                                            We understand the importance of data security for federal work. FARchat is being designed with FedRAMP controls from the ground up. We&apos;re actively pursuing authorization and building to meet federal security standards.
                                        </p>
                                        <Button asChild variant="outline" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                                            <Link href="/security">
                                                View Our Security Practices
                                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-16 md:py-20">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                            <div className="bg-gradient-to-br from-blue-600/95 to-blue-700/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 text-center border border-blue-500/30 shadow-2xl shadow-blue-900/20">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    Ready to Transform Your FAR Research?
                                </h2>
                                <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                                    Join federal acquisition professionals who are saving hours every week with FARchat.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg">
                                        <Link href="/login">
                                            Get Started Free
                                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 hover:border-white/70 backdrop-blur-sm">
                                        <Link href="/contact">
                                            Contact Us
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
