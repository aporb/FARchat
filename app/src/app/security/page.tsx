import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ShieldIcon,
    LockIcon,
    KeyIcon,
    ServerIcon,
    EyeIcon,
    AlertTriangleIcon,
    MailIcon,
    CheckIcon
} from "lucide-react"

export const metadata: Metadata = {
    title: "Security | FARchat",
    description: "Learn about FARchat's security practices, data protection measures, and our commitment to keeping your data safe.",
}

const securitySections = [
    {
        id: "data-protection",
        icon: LockIcon,
        title: "Data Protection",
        items: [
            "All data encrypted at rest using AES-256 encryption",
            "All data encrypted in transit using TLS 1.3",
            "Database backups encrypted and stored securely",
            "Regular security audits and penetration testing"
        ]
    },
    {
        id: "access-control",
        icon: KeyIcon,
        title: "Access Control",
        items: [
            "Multi-factor authentication available",
            "Role-based access control (RBAC)",
            "Session management with automatic timeout",
            "Audit logging of all access"
        ]
    },
    {
        id: "infrastructure",
        icon: ServerIcon,
        title: "Infrastructure Security",
        items: [
            "Hosted on enterprise-grade cloud infrastructure",
            "US-based data centers only",
            "Network isolation and firewalls",
            "DDoS protection",
            "Regular vulnerability scanning"
        ]
    },
    {
        id: "monitoring",
        icon: EyeIcon,
        title: "Monitoring & Logging",
        items: [
            "24/7 security monitoring",
            "Real-time threat detection",
            "Comprehensive audit trails",
            "Anomaly detection and alerting"
        ]
    }
]

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center">
                        <Badge variant="outline" className="mb-4">
                            Security
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Security at FARchat
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            We take the security of your data seriously. Here&apos;s how we protect it.
                        </p>
                    </div>
                </div>
            </section>

            {/* Security Overview */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {securitySections.map((section) => (
                            <div
                                key={section.id}
                                className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                                        <section.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                                        {section.title}
                                    </h2>
                                </div>
                                <ul className="space-y-3">
                                    {section.items.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-600 dark:text-slate-400">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Responsible Disclosure */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                                <AlertTriangleIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                                    Security Vulnerability Reporting
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-4">
                                    If you discover a security vulnerability, please report it to our security team. We appreciate responsible disclosure and will acknowledge your report within 48 hours.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button asChild>
                                        <a href="mailto:security@farchat.app">
                                            <MailIcon className="w-4 h-4 mr-2" />
                                            security@farchat.app
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance Link */}
            <section className="py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center">
                        <p className="text-slate-600 dark:text-slate-400 mb-4">
                            For information about our compliance certifications and roadmap
                        </p>
                        <Button asChild variant="outline">
                            <Link href="/compliance">
                                <ShieldIcon className="w-4 h-4 mr-2" />
                                View Compliance Status
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
