import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/sections/footer"
import {
    AccessibilityIcon,
    CheckIcon,
    AlertCircleIcon,
    MailIcon,
    FileTextIcon
} from "lucide-react"

export const metadata: Metadata = {
    title: "Accessibility Statement (VPAT) | FARchat",
    description: "FARchat's commitment to digital accessibility and VPAT documentation for Section 508 compliance.",
}

const accessibilityFeatures = [
    "Keyboard navigation support",
    "Screen reader compatibility",
    "Color contrast ratios meeting WCAG AA",
    "Focus indicators for interactive elements",
    "Alt text for images",
    "Responsive design for all device sizes",
    "Skip navigation links",
    "Semantic HTML structure"
]

const knownLimitations = [
    "Some complex data visualizations may not be fully accessible to screen readers",
    "We're working on improving form error announcements",
    "Some third-party components are being updated for better accessibility"
]

const wcagCriteria = [
    { criterion: "1.1.1 Non-text Content", level: "A", status: "Supports", remarks: "All images have alt text" },
    { criterion: "1.3.1 Info and Relationships", level: "A", status: "Supports", remarks: "Semantic HTML used throughout" },
    { criterion: "1.4.1 Use of Color", level: "A", status: "Supports", remarks: "Color is not sole means of conveying info" },
    { criterion: "1.4.3 Contrast (Minimum)", level: "AA", status: "Supports", remarks: "4.5:1 contrast ratio maintained" },
    { criterion: "2.1.1 Keyboard", level: "A", status: "Supports", remarks: "All functionality keyboard accessible" },
    { criterion: "2.4.1 Bypass Blocks", level: "A", status: "Supports", remarks: "Skip navigation links provided" },
    { criterion: "2.4.4 Link Purpose", level: "A", status: "Supports", remarks: "Link text is descriptive" },
    { criterion: "3.1.1 Language of Page", level: "A", status: "Supports", remarks: "HTML lang attribute set" },
    { criterion: "4.1.1 Parsing", level: "A", status: "Supports", remarks: "Valid HTML markup" },
    { criterion: "4.1.2 Name, Role, Value", level: "A", status: "Partially Supports", remarks: "Working on improving ARIA labels" },
]

export default function VPATPage() {
    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center">
                        <Badge variant="outline" className="mb-4">
                            VPAT
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Accessibility Statement
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            FARchat is committed to digital accessibility for all users.
                        </p>
                    </div>
                </div>
            </section>

            {/* Commitment Statement */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-6 md:p-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                <AccessibilityIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                                    Our Commitment
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400">
                                    We are actively working to increase the accessibility and usability of FARchat in alignment with Section 508 of the Rehabilitation Act and Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accessibility Features */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        Accessibility Features
                    </h2>
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {accessibilityFeatures.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-600 dark:text-slate-400">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* VPAT Table */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        WCAG 2.1 Conformance
                    </h2>
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50">
                                        <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">
                                            Criteria
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">
                                            Level
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100">
                                            Remarks
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wcagCriteria.map((item, index) => (
                                        <tr
                                            key={item.criterion}
                                            className={index % 2 === 0 ? "bg-white dark:bg-slate-900/30" : "bg-slate-50 dark:bg-slate-900/50"}
                                        >
                                            <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                                                {item.criterion}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300">
                                                    {item.level}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === "Supports"
                                                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                                                        : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                                                {item.remarks}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* Known Limitations */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                        Known Limitations
                    </h2>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 md:p-8">
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            We&apos;re continuously improving accessibility. Current known limitations:
                        </p>
                        <ul className="space-y-3">
                            {knownLimitations.map((limitation) => (
                                <li key={limitation} className="flex items-start gap-3">
                                    <AlertCircleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-slate-600 dark:text-slate-400">
                                        {limitation}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Feedback Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-12">
                        <div className="text-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Accessibility Feedback
                            </h2>
                            <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                                We welcome your feedback on the accessibility of FARchat. Please let us know if you encounter any barriers.
                            </p>
                            <div className="bg-slate-800 dark:bg-slate-700 rounded-xl p-6 max-w-md mx-auto mb-6 text-left">
                                <p className="text-slate-300 text-sm mb-3">
                                    When reporting an issue, please include:
                                </p>
                                <ul className="text-slate-400 text-sm space-y-1">
                                    <li>• Description of the issue</li>
                                    <li>• Page URL where you encountered it</li>
                                    <li>• Assistive technology used (if applicable)</li>
                                </ul>
                            </div>
                            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                                <a href="mailto:accessibility@farchat.app">
                                    <MailIcon className="w-4 h-4 mr-2" />
                                    accessibility@farchat.app
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
            <Footer />
        </>
    )
}
