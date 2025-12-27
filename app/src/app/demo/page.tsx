import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/sections/footer"
import {
    PlayIcon,
    MessageSquareIcon,
    BookOpenIcon,
    LinkIcon,
    ArrowRightIcon,
    SparklesIcon
} from "lucide-react"

export const metadata: Metadata = {
    title: "Demo | FARchat - See It In Action",
    description: "Watch how FARchat helps federal acquisition professionals research regulations faster.",
}

// Configure video URL here - supports YouTube, Vimeo, or direct video URLs
// Set to null or empty string to show the placeholder
const DEMO_VIDEO_URL: string | null = null // e.g., "https://www.youtube.com/embed/VIDEO_ID" or "https://player.vimeo.com/video/VIDEO_ID"

function VideoEmbed({ url }: { url: string | null }) {
    if (!url) {
        // Fallback placeholder when no video URL is configured
        return (
            <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl flex flex-col items-center justify-center border border-slate-700 dark:border-slate-600 shadow-2xl relative overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-500 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6 mx-auto shadow-lg shadow-blue-500/25">
                        <PlayIcon className="w-8 h-8 text-white ml-1" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        Demo Video Launching Soon
                    </h3>
                    <p className="text-slate-400 max-w-md mx-auto mb-6">
                        We&apos;re preparing a walkthrough to show you how FARchat transforms federal acquisition research.
                    </p>
                    <Button asChild variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                        <Link href="/alpha">
                            Sign Up for Early Access
                            <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    // Render embedded video player
    return (
        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
            <iframe
                src={url}
                title="FARchat Demo Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}

const demoFeatures = [
    {
        icon: MessageSquareIcon,
        title: "Ask Complex Questions",
        example: "What are the TAA compliance requirements for a drone procurement under DFARS?",
        description: "Ask nuanced questions about federal regulations in plain English."
    },
    {
        icon: BookOpenIcon,
        title: "Get Cited Answers",
        example: "DFARS 252.225-7001",
        description: "Every answer includes precise regulatory citations you can verify."
    },
    {
        icon: LinkIcon,
        title: "Cross-Reference Automatically",
        example: "Related: NDAA Section 848",
        description: "FARchat surfaces related regulations and legislative references."
    }
]

export default function DemoPage() {
    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center">
                        <Badge variant="outline" className="mb-4">
                            Product Demo
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            See FARchat in Action
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            Watch how federal acquisition professionals use FARchat to cut research time from hours to seconds.
                        </p>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <VideoEmbed url={DEMO_VIDEO_URL} />
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-8 md:mb-12">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {demoFeatures.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="relative bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6"
                            >
                                {/* Step Number */}
                                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center">
                                    {index + 1}
                                </div>

                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>

                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    {feature.title}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                                    {feature.description}
                                </p>

                                {/* Example */}
                                <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                                        Example
                                    </p>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 font-mono">
                                        {feature.example}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Demo Teaser */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-6 md:p-8 border border-blue-100 dark:border-blue-900/50">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                <SparklesIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="text-center md:text-left flex-1">
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                    Try It Yourself
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    The best way to understand FARchat is to use it. Create a free account and start asking questions about federal acquisition regulations.
                                </p>
                            </div>
                            <Button asChild size="lg" className="flex-shrink-0">
                                <Link href="/login">
                                    Get Started
                                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to try it yourself?
                        </h2>
                        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                            FARchat is free during alpha. Create an account and start researching.
                        </p>
                        <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                            <Link href="/login">
                                Create Free Account
                                <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
            <Footer />
        </>
    )
}
