import Link from "next/link"
import { FARchatLogo } from "@/components/common/logo"
import { Separator } from "@/components/ui/separator"

const FOOTER_LINKS = {
    product: {
        title: 'Product',
        links: [
            { label: 'Features', href: '/features' },
            { label: 'Demo', href: '/demo' },
            { label: 'FAQ', href: '/#faq' },
            { label: 'Changelog', href: '/changelog' },
        ],
    },
    regulations: {
        title: 'Regulations',
        links: [
            { label: 'FAR', href: '/search?q=FAR' },
            { label: 'DFARS', href: '/search?q=DFARS' },
            { label: 'VAAR', href: '/search?q=VAAR' },
            { label: 'All Regulations', href: '/search' },
        ],
    },
    company: {
        title: 'Company',
        links: [
            { label: 'About', href: '/about' },
            { label: 'Compliance', href: '/compliance' },
            { label: 'Contact', href: '/contact' },
            { label: 'Security', href: '/security' },
        ],
    },
    legal: {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '/legal/privacy' },
            { label: 'Terms of Service', href: '/legal/terms' },
            { label: 'Cookie Policy', href: '/legal/cookies' },
            { label: 'VPAT', href: '/vpat' },
        ],
    },
}

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t bg-background dark:bg-slate-950">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 sm:mb-8 lg:mb-0">
                        <div className="flex items-center mb-3 sm:mb-4">
                            <FARchatLogo size="sm" />
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-xs">
                            AI-powered intelligence for federal contracting professionals.
                            Navigate FAR and DFARS with confidence.
                        </p>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(FOOTER_LINKS).map(([key, section]) => (
                        <div key={key}>
                            <h3 className="font-semibold text-xs sm:text-sm text-foreground mb-3 sm:mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-6 sm:my-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        &copy; {currentYear} FARchat. All rights reserved.
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                        Built for federal contracting professionals
                    </p>
                </div>
            </div>
        </footer>
    )
}
