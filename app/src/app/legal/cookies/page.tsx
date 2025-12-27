import { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout } from "@/components/layout/legal-page-layout"
import { LegalSection } from "@/components/sections/legal-section"
import { RelatedPolicies } from "@/components/sections/related-policies"
import { CheckIcon } from "lucide-react"

export const metadata: Metadata = {
    title: "Cookie Policy | FARchat",
    description: "Learn about how FARchat uses cookies and similar technologies.",
}

const sections = [
    { id: "what-are-cookies", title: "What Are Cookies" },
    { id: "how-we-use", title: "How We Use Cookies" },
    { id: "third-party", title: "Third-Party Cookies" },
    { id: "managing-cookies", title: "Managing Cookies" },
    { id: "retention", title: "Cookie Retention" },
    { id: "updates", title: "Updates to This Policy" },
    { id: "contact", title: "Contact Us" },
]

const relatedPolicies = [
    { label: "Privacy Policy", href: "/legal/privacy", description: "How we collect and use your information" },
    { label: "Terms of Service", href: "/legal/terms", description: "Terms and conditions for using FARchat" },
]

const cookieTypes = [
    {
        type: "Essential",
        description: "Necessary for the website to function properly",
        examples: ["User authentication and session management", "Security features and fraud prevention", "Remembering your login status", "Load balancing to ensure site availability"],
        canDisable: false
    },
    {
        type: "Preference",
        description: "Remember your settings and preferences",
        examples: ["Theme preference (light/dark mode)", "Language settings", "Display preferences"],
        canDisable: true
    },
    {
        type: "Analytics",
        description: "Help us understand how visitors use our website",
        examples: ["Pages visited and time spent on each page", "How you arrived at our site", "General geographic location (country/region level)", "Device and browser information"],
        canDisable: true
    }
]

const browserInstructions = [
    { browser: "Chrome", path: "Settings → Privacy and security → Cookies and other site data" },
    { browser: "Firefox", path: "Settings → Privacy & Security → Cookies and Site Data" },
    { browser: "Safari", path: "Preferences → Privacy → Manage Website Data" },
    { browser: "Edge", path: "Settings → Cookies and site permissions → Cookies and site data" },
]

const retentionPeriods = [
    { type: "Session cookies", period: "Deleted when you close your browser" },
    { type: "Authentication cookies", period: "Up to 30 days" },
    { type: "Preference cookies", period: "Up to 1 year" },
    { type: "Analytics cookies", period: "Up to 2 years" },
]

export default function CookiesPage() {
    return (
        <LegalPageLayout
            badge="Cookies"
            title="Cookie Policy"
            subtitle="How we use cookies and similar technologies"
            lastUpdated="December 2025"
            sections={sections}
        >
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                This Cookie Policy explains how FARchat (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies when you visit our website or use our services.
            </p>

            <LegalSection id="what-are-cookies" number="1" title="What Are Cookies">
                <p>
                    Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help the website remember your preferences and improve your experience.
                </p>
            </LegalSection>

            <LegalSection id="how-we-use" number="2" title="How We Use Cookies">
                <p className="mb-6">We use the following types of cookies:</p>

                <div className="space-y-6">
                    {cookieTypes.map((cookie) => (
                        <div key={cookie.type} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    {cookie.type} Cookies
                                </h3>
                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                    cookie.canDisable
                                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                        : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                }`}>
                                    {cookie.canDisable ? "Optional" : "Required"}
                                </span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-3">{cookie.description}:</p>
                            <ul className="space-y-2">
                                {cookie.examples.map((example) => (
                                    <li key={example} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                        <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                        {example}
                                    </li>
                                ))}
                            </ul>
                            {!cookie.canDisable && (
                                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 italic">
                                    These cookies cannot be disabled as they are essential for the service to work.
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </LegalSection>

            <LegalSection id="third-party" number="3" title="Third-Party Cookies">
                <p className="mb-4">Some cookies are placed by third-party services that appear on our pages:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Authentication providers:</strong> When you sign in using Google or other OAuth providers</li>
                    <li><strong>Analytics services:</strong> To help us understand usage patterns</li>
                    <li><strong>Security services:</strong> To protect against malicious activity</li>
                </ul>
                <p>These third parties have their own privacy policies governing the use of their cookies.</p>
            </LegalSection>

            <LegalSection id="managing-cookies" number="4" title="Managing Cookies">
                <p className="mb-4">Most web browsers allow you to control cookies through their settings. You can:</p>
                <ul className="list-disc pl-6 space-y-2 mb-6">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete individual cookies or all cookies</li>
                    <li>Block cookies from specific or all websites</li>
                    <li>Set your browser to notify you when a cookie is being set</li>
                </ul>

                <p className="mb-4 text-slate-600 dark:text-slate-400">
                    Please note that blocking or deleting cookies may impact your experience on FARchat. Some features may not work properly without essential cookies.
                </p>

                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">Browser-Specific Instructions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {browserInstructions.map((browser) => (
                        <div key={browser.browser} className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
                            <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">{browser.browser}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{browser.path}</p>
                        </div>
                    ))}
                </div>
            </LegalSection>

            <LegalSection id="retention" number="5" title="Cookie Retention">
                <p className="mb-4">Different cookies have different retention periods:</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="text-left py-3 pr-4 font-semibold text-slate-900 dark:text-slate-100">Cookie Type</th>
                                <th className="text-left py-3 font-semibold text-slate-900 dark:text-slate-100">Retention Period</th>
                            </tr>
                        </thead>
                        <tbody>
                            {retentionPeriods.map((item) => (
                                <tr key={item.type} className="border-b border-slate-100 dark:border-slate-800">
                                    <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{item.type}</td>
                                    <td className="py-3 text-slate-600 dark:text-slate-400">{item.period}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </LegalSection>

            <LegalSection id="updates" number="6" title="Updates to This Policy">
                <p>
                    We may update this Cookie Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.
                </p>
            </LegalSection>

            <LegalSection id="contact" number="7" title="Contact Us">
                <p className="mb-4">If you have questions about our use of cookies, please contact us:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Email: <a href="mailto:privacy@farchat.app" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@farchat.app</a></li>
                </ul>
            </LegalSection>

            <RelatedPolicies policies={relatedPolicies} />
        </LegalPageLayout>
    )
}
