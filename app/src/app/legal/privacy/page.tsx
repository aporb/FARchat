import { Metadata } from "next"
import Link from "next/link"
import { LegalPageLayout } from "@/components/layout/legal-page-layout"
import { LegalSection } from "@/components/sections/legal-section"
import { LegalCallout } from "@/components/sections/legal-callout"
import { RelatedPolicies } from "@/components/sections/related-policies"

export const metadata: Metadata = {
    title: "Privacy Policy | FARchat",
    description: "Learn how FARchat collects, uses, and protects your personal information.",
}

const sections = [
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use", title: "How We Use Your Information" },
    { id: "information-sharing", title: "Information Sharing" },
    { id: "data-retention", title: "Data Retention" },
    { id: "your-rights", title: "Your Rights" },
    { id: "security", title: "Security" },
    { id: "government-data", title: "Government Data Warning" },
    { id: "childrens-privacy", title: "Children's Privacy" },
    { id: "international-transfers", title: "International Data Transfers" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" },
]

const relatedPolicies = [
    { label: "Terms of Service", href: "/legal/terms", description: "Terms and conditions for using FARchat" },
    { label: "Cookie Policy", href: "/legal/cookies", description: "How we use cookies and similar technologies" },
]

export default function PrivacyPage() {
    return (
        <LegalPageLayout
            badge="Privacy"
            title="Privacy Policy"
            subtitle="How we collect, use, and protect your information"
            lastUpdated="December 2025"
            sections={sections}
        >
            <p className="text-slate-600 dark:text-slate-400 mb-8">
                FARchat (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>

            <LegalSection id="information-we-collect" number="1" title="Information We Collect">
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-3">Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Account Information:</strong> When you create an account, we collect your email address and any profile information you choose to provide.</li>
                    <li><strong>Usage Data:</strong> We collect the queries you submit and your interactions with the service to provide and improve our AI-powered responses.</li>
                    <li><strong>Communications:</strong> When you contact us, we collect the information you provide in your messages.</li>
                </ul>

                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-3">Information Collected Automatically</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
                    <li><strong>Log Data:</strong> IP address, access times, pages viewed, and referring URLs.</li>
                    <li><strong>Cookies:</strong> See our <Link href="/legal/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie Policy</Link> for details.</li>
                </ul>
            </LegalSection>

            <LegalSection id="how-we-use" number="2" title="How We Use Your Information">
                <p className="mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process your queries and generate AI-powered responses</li>
                    <li>Send you important updates about the service</li>
                    <li>Respond to your inquiries and support requests</li>
                    <li>Detect, prevent, and address technical issues and security threats</li>
                    <li>Analyze usage patterns to improve user experience</li>
                    <li>Comply with legal obligations</li>
                </ul>
            </LegalSection>

            <LegalSection id="information-sharing" number="3" title="Information Sharing">
                <p className="mb-4">We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> We share data with third-party vendors who assist us in operating our service (e.g., cloud hosting, analytics).</li>
                    <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests.</li>
                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred.</li>
                    <li><strong>With Your Consent:</strong> We may share information with your explicit consent.</li>
                </ul>
            </LegalSection>

            <LegalSection id="data-retention" number="4" title="Data Retention">
                <p className="mb-4">We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy. Specifically:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Account Data:</strong> Retained while your account is active and for 30 days after deletion request.</li>
                    <li><strong>Query History:</strong> Retained for 90 days for service improvement, then anonymized or deleted.</li>
                    <li><strong>Log Data:</strong> Retained for up to 12 months for security and analytics purposes.</li>
                </ul>
            </LegalSection>

            <LegalSection id="your-rights" number="5" title="Your Rights">
                <p className="mb-4">Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li><strong>Access:</strong> Request a copy of your personal data.</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
                    <li><strong>Portability:</strong> Request a machine-readable copy of your data.</li>
                    <li><strong>Objection:</strong> Object to certain processing of your data.</li>
                    <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances.</li>
                </ul>
                <p>
                    To exercise these rights, contact us at{" "}
                    <a href="mailto:privacy@farchat.app" className="text-blue-600 dark:text-blue-400 hover:underline">
                        privacy@farchat.app
                    </a>.
                </p>
            </LegalSection>

            <LegalSection id="security" number="6" title="Security">
                <p className="mb-4">We implement appropriate technical and organizational measures to protect your information, including:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256)</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Access controls and authentication requirements</li>
                    <li>Employee training on data protection</li>
                </ul>
                <p>However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.</p>
            </LegalSection>

            <LegalSection id="government-data" number="7" title="Government Data Warning">
                <LegalCallout variant="warning" title="Important Notice">
                    <p>
                        FARchat is currently in <strong>Alpha</strong>. Do not input Controlled Unclassified Information (CUI), classified information, or sensitive government data into the service. FARchat is not yet authorized for processing such information.
                    </p>
                </LegalCallout>
            </LegalSection>

            <LegalSection id="childrens-privacy" number="8" title="Children's Privacy">
                <p>
                    Our service is not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
            </LegalSection>

            <LegalSection id="international-transfers" number="9" title="International Data Transfers">
                <p>
                    Your information may be transferred to and processed in the United States, where our servers are located. We ensure appropriate safeguards are in place for international transfers.
                </p>
            </LegalSection>

            <LegalSection id="changes" number="10" title="Changes to This Policy">
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of the service after changes constitutes acceptance of the updated policy.
                </p>
            </LegalSection>

            <LegalSection id="contact" number="11" title="Contact Us">
                <p className="mb-4">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Email: <a href="mailto:privacy@farchat.app" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@farchat.app</a></li>
                    <li>General inquiries: <a href="mailto:hello@farchat.app" className="text-blue-600 dark:text-blue-400 hover:underline">hello@farchat.app</a></li>
                </ul>
            </LegalSection>

            <RelatedPolicies policies={relatedPolicies} />
        </LegalPageLayout>
    )
}
