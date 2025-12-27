import { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout } from "@/components/layout/legal-page-layout"
import { LegalSection } from "@/components/sections/legal-section"
import { LegalCallout } from "@/components/sections/legal-callout"
import { RelatedPolicies } from "@/components/sections/related-policies"

export const metadata: Metadata = {
    title: "Terms of Service | FARchat",
    description: "Terms and conditions for using the FARchat service.",
}

const sections = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "description", title: "Description of Service" },
    { id: "alpha-status", title: "Alpha Status Disclaimer" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "acceptable-use", title: "Acceptable Use" },
    { id: "ai-content", title: "AI-Generated Content" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "disclaimers", title: "Disclaimers" },
    { id: "limitation-liability", title: "Limitation of Liability" },
    { id: "indemnification", title: "Indemnification" },
    { id: "termination", title: "Termination" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "general-provisions", title: "General Provisions" },
    { id: "contact", title: "Contact Information" },
]

const relatedPolicies = [
    { label: "Privacy Policy", href: "/legal/privacy", description: "How we collect and use your information" },
    { label: "Cookie Policy", href: "/legal/cookies", description: "How we use cookies and similar technologies" },
]

export default function TermsPage() {
    return (
        <LegalPageLayout
            badge="Terms"
            title="Terms of Service"
            subtitle="The terms and conditions that govern your use of FARchat"
            lastUpdated="December 2025"
            sections={sections}
        >
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                Please read these Terms of Service (&quot;Terms&quot;) carefully before using FARchat. By accessing or using our service, you agree to be bound by these Terms.
            </p>

            <LegalSection id="acceptance" number="1" title="Acceptance of Terms">
                <p>
                    By creating an account or using FARchat, you agree to these Terms and our{" "}
                    <Link href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                        Privacy Policy
                    </Link>
                    . If you do not agree, do not use the service.
                </p>
            </LegalSection>

            <LegalSection id="description" number="2" title="Description of Service">
                <p className="mb-4">
                    FARchat is an AI-powered tool designed to help federal acquisition professionals research and understand the Federal Acquisition Regulation (FAR), Defense Federal Acquisition Regulation Supplement (DFARS), and other agency supplements. The service provides:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Natural language search across regulatory databases</li>
                    <li>AI-generated responses with citations</li>
                    <li>Cross-referencing between regulations</li>
                </ul>
            </LegalSection>

            <LegalSection id="alpha-status" number="3" title="Alpha Status Disclaimer">
                <LegalCallout variant="warning" title="Important: Alpha Release">
                    <p className="mb-3">FARchat is currently in <strong>Alpha</strong>. This means:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>The service may contain bugs or errors</li>
                        <li>Features may change without notice</li>
                        <li>Service availability is not guaranteed</li>
                        <li>Data loss may occur</li>
                    </ul>
                </LegalCallout>
            </LegalSection>

            <LegalSection id="user-accounts" number="4" title="User Accounts">
                <p className="mb-4">To use FARchat, you must:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Promptly notify us of any unauthorized access</li>
                    <li>Be at least 18 years of age</li>
                </ul>
                <p>You are responsible for all activities that occur under your account.</p>
            </LegalSection>

            <LegalSection id="acceptable-use" number="5" title="Acceptable Use">
                <p className="mb-4">You agree NOT to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Use the service for any unlawful purpose</li>
                    <li>Input classified, CUI, or sensitive government information</li>
                    <li>Attempt to reverse engineer or extract our AI models</li>
                    <li>Automate queries without our written permission</li>
                    <li>Share your account credentials with others</li>
                    <li>Circumvent rate limits or security measures</li>
                    <li>Use the service to generate misleading or fraudulent content</li>
                    <li>Interfere with or disrupt the service</li>
                </ul>
            </LegalSection>

            <LegalSection id="ai-content" number="6" title="AI-Generated Content">
                <LegalCallout variant="info" title="Verification Required">
                    <p>
                        FARchat uses AI to generate responses. <strong>Always verify</strong> citations and information against the official regulatory text at{" "}
                        <a href="https://acquisition.gov" target="_blank" rel="noopener noreferrer" className="underline">
                            acquisition.gov
                        </a>
                        . AI responses may contain errors or outdated information.
                    </p>
                </LegalCallout>
                <p className="mb-4">You acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>AI-generated content is provided for informational purposes only</li>
                    <li>Responses do not constitute legal advice</li>
                    <li>You are responsible for verifying accuracy before relying on any information</li>
                    <li>We are not liable for decisions made based on AI outputs</li>
                </ul>
            </LegalSection>

            <LegalSection id="intellectual-property" number="7" title="Intellectual Property">
                <p className="mb-4">
                    <strong>Our Property:</strong> FARchat, including its software, design, and documentation, is owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our property without permission.
                </p>
                <p className="mb-4">
                    <strong>Your Content:</strong> You retain ownership of content you submit. By using the service, you grant us a license to use your queries to provide and improve the service.
                </p>
                <p>
                    <strong>Regulatory Content:</strong> FAR, DFARS, and agency supplements are U.S. government works in the public domain.
                </p>
            </LegalSection>

            <LegalSection id="disclaimers" number="8" title="Disclaimers">
                <p className="mb-4 uppercase text-sm font-medium">
                    THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p className="mb-4">We do not warrant that:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>The service will be uninterrupted or error-free</li>
                    <li>AI-generated responses will be accurate or complete</li>
                    <li>The service will meet your specific requirements</li>
                    <li>Defects will be corrected</li>
                </ul>
            </LegalSection>

            <LegalSection id="limitation-liability" number="9" title="Limitation of Liability">
                <p className="mb-4 uppercase text-sm font-medium">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE SERVICE.
                </p>
                <p className="uppercase text-sm font-medium">
                    OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM YOUR USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
                </p>
            </LegalSection>

            <LegalSection id="indemnification" number="10" title="Indemnification">
                <p className="mb-4">You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses arising from:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Your use of the service</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any third-party rights</li>
                    <li>Decisions made based on AI-generated content</li>
                </ul>
            </LegalSection>

            <LegalSection id="termination" number="11" title="Termination">
                <p className="mb-4">We may suspend or terminate your access to the service at any time, with or without cause. Upon termination:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Your right to use the service ceases immediately</li>
                    <li>We may delete your account data per our retention policy</li>
                    <li>Provisions that should survive termination will remain in effect</li>
                </ul>
                <p>
                    You may terminate your account at any time by contacting us at{" "}
                    <a href="mailto:support@farchat.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                        support@farchat.app
                    </a>.
                </p>
            </LegalSection>

            <LegalSection id="governing-law" number="12" title="Governing Law">
                <p>
                    These Terms are governed by the laws of the United States and the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in Delaware.
                </p>
            </LegalSection>

            <LegalSection id="changes" number="13" title="Changes to Terms">
                <p>
                    We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms and updating the &quot;Last Updated&quot; date. Your continued use after changes constitutes acceptance.
                </p>
            </LegalSection>

            <LegalSection id="general-provisions" number="14" title="General Provisions">
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and us regarding the service.</li>
                    <li><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</li>
                    <li><strong>Waiver:</strong> Our failure to enforce any right does not waive that right.</li>
                    <li><strong>Assignment:</strong> You may not assign these Terms. We may assign them to a successor.</li>
                </ul>
            </LegalSection>

            <LegalSection id="contact" number="15" title="Contact Information">
                <p className="mb-4">For questions about these Terms, contact us:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Email: <a href="mailto:legal@farchat.app" className="text-blue-600 dark:text-blue-400 hover:underline">legal@farchat.app</a></li>
                    <li>Support: <a href="mailto:support@farchat.app" className="text-blue-600 dark:text-blue-400 hover:underline">support@farchat.app</a></li>
                </ul>
            </LegalSection>

            <RelatedPolicies policies={relatedPolicies} />
        </LegalPageLayout>
    )
}
