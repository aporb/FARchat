import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ShieldIcon,
    EyeIcon,
    LockIcon,
    FileCheckIcon,
    ServerIcon,
    KeyIcon,
    GlobeIcon,
    ActivityIcon,
    MapPinIcon,
    AlertTriangleIcon,
    MailIcon
} from "lucide-react"

export const metadata: Metadata = {
    title: "Compliance & Security | FARchat",
    description: "Learn about FARchat's security practices and our journey toward FedRAMP, Section 508, and SOC 2 compliance.",
}

type ComplianceStatus = "pursuing" | "in-progress" | "planned" | "architecture-ready"

interface ComplianceItem {
    id: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    status: ComplianceStatus
    statusLabel: string
    description: string
}

const complianceItems: ComplianceItem[] = [
    {
        id: "fedramp",
        icon: ShieldIcon,
        title: "FedRAMP Authorization",
        status: "pursuing",
        statusLabel: "Pursuing",
        description: "We're actively working toward FedRAMP authorization to meet federal cloud security requirements. Our infrastructure is designed with FedRAMP controls in mind from day one."
    },
    {
        id: "section-508",
        icon: EyeIcon,
        title: "Section 508 Accessibility",
        status: "in-progress",
        statusLabel: "In Progress",
        description: "Accessibility is a priority, not an afterthought. We're implementing WCAG 2.1 AA standards throughout the application to ensure all users can access FARchat effectively."
    },
    {
        id: "soc2",
        icon: LockIcon,
        title: "SOC 2 Type II Certification",
        status: "planned",
        statusLabel: "Planned",
        description: "Enterprise security certification is on our roadmap. We're building with SOC 2 controls in mind to demonstrate our commitment to data security."
    },
    {
        id: "itar",
        icon: FileCheckIcon,
        title: "ITAR-Ready Architecture",
        status: "architecture-ready",
        statusLabel: "Architecture Ready",
        description: "Our system architecture supports ITAR compliance requirements for customers handling export-controlled information."
    }
]

const statusStyles: Record<ComplianceStatus, { badge: string; dot: string }> = {
    "pursuing": {
        badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
        dot: "bg-amber-500"
    },
    "in-progress": {
        badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        dot: "bg-blue-500"
    },
    "planned": {
        badge: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700",
        dot: "bg-slate-500"
    },
    "architecture-ready": {
        badge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
        dot: "bg-green-500"
    }
}

const securityPractices = [
    {
        icon: LockIcon,
        title: "Data Encryption",
        description: "All data encrypted at rest (AES-256) and in transit (TLS 1.3)"
    },
    {
        icon: KeyIcon,
        title: "Access Control",
        description: "Role-based access with multi-factor authentication"
    },
    {
        icon: ServerIcon,
        title: "Infrastructure",
        description: "Hosted on SOC 2 certified cloud infrastructure"
    },
    {
        icon: ActivityIcon,
        title: "Monitoring",
        description: "24/7 security monitoring and logging"
    },
    {
        icon: MapPinIcon,
        title: "Data Residency",
        description: "US-based data centers only"
    },
    {
        icon: AlertTriangleIcon,
        title: "Incident Response",
        description: "Documented incident response procedures"
    }
]

export default function CompliancePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-20 pb-16">
            {/* Hero Section */}
            <section className="py-12 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="text-center">
                        <Badge variant="outline" className="mb-4">
                            Security & Compliance
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                            Building for Federal Standards
                        </h1>
                        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                            FARchat is designed to meet the rigorous security and accessibility requirements expected by federal agencies. Here&apos;s our compliance journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Compliance Cards */}
            <section className="py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {complianceItems.map((item) => {
                            const styles = statusStyles[item.status]

                            return (
                                <div
                                    key={item.id}
                                    className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <item.icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                                        </div>
                                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${styles.badge}`}>
                                            <span className={`w-2 h-2 rounded-full ${styles.dot}`} />
                                            {item.statusLabel}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Security Practices */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 text-center mb-8 md:mb-12">
                        Our Security Practices
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {securityPractices.map((practice) => (
                            <div
                                key={practice.title}
                                className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                            >
                                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                    <practice.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                                        {practice.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {practice.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Links to Related Pages */}
            <section className="py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild variant="outline">
                            <Link href="/vpat">
                                <EyeIcon className="w-4 h-4 mr-2" />
                                View VPAT Documentation
                            </Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/security">
                                <LockIcon className="w-4 h-4 mr-2" />
                                Technical Security Details
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Questions about our security?
                        </h2>
                        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                            Our security team is happy to discuss our practices and compliance roadmap.
                        </p>
                        <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                            <Link href="mailto:security@farchat.app">
                                <MailIcon className="w-4 h-4 mr-2" />
                                Contact Security Team
                            </Link>
                        </Button>
                        <p className="text-slate-400 text-sm mt-4">
                            security@farchat.app
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
