import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Privacy Policy | FARchat",
    description: "Learn how FARchat collects, uses, and protects your personal information.",
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    <h1>Privacy Policy</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last Updated: December 2025</p>

                    <p>
                        FARchat (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                    </p>

                    <h2>1. Information We Collect</h2>

                    <h3>Information You Provide</h3>
                    <ul>
                        <li><strong>Account Information:</strong> When you create an account, we collect your email address and any profile information you choose to provide.</li>
                        <li><strong>Usage Data:</strong> We collect the queries you submit and your interactions with the service to provide and improve our AI-powered responses.</li>
                        <li><strong>Communications:</strong> When you contact us, we collect the information you provide in your messages.</li>
                    </ul>

                    <h3>Information Collected Automatically</h3>
                    <ul>
                        <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
                        <li><strong>Log Data:</strong> IP address, access times, pages viewed, and referring URLs.</li>
                        <li><strong>Cookies:</strong> See our <Link href="/legal/cookies">Cookie Policy</Link> for details.</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use your information to:</p>
                    <ul>
                        <li>Provide, maintain, and improve our services</li>
                        <li>Process your queries and generate AI-powered responses</li>
                        <li>Send you important updates about the service</li>
                        <li>Respond to your inquiries and support requests</li>
                        <li>Detect, prevent, and address technical issues and security threats</li>
                        <li>Analyze usage patterns to improve user experience</li>
                        <li>Comply with legal obligations</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                    <ul>
                        <li><strong>Service Providers:</strong> We share data with third-party vendors who assist us in operating our service (e.g., cloud hosting, analytics).</li>
                        <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid legal requests.</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred.</li>
                        <li><strong>With Your Consent:</strong> We may share information with your explicit consent.</li>
                    </ul>

                    <h2>4. Data Retention</h2>
                    <p>
                        We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy. Specifically:
                    </p>
                    <ul>
                        <li><strong>Account Data:</strong> Retained while your account is active and for 30 days after deletion request.</li>
                        <li><strong>Query History:</strong> Retained for 90 days for service improvement, then anonymized or deleted.</li>
                        <li><strong>Log Data:</strong> Retained for up to 12 months for security and analytics purposes.</li>
                    </ul>

                    <h2>5. Your Rights</h2>
                    <p>Depending on your location, you may have the following rights:</p>
                    <ul>
                        <li><strong>Access:</strong> Request a copy of your personal data.</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
                        <li><strong>Portability:</strong> Request a machine-readable copy of your data.</li>
                        <li><strong>Objection:</strong> Object to certain processing of your data.</li>
                        <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances.</li>
                    </ul>
                    <p>
                        To exercise these rights, contact us at <a href="mailto:privacy@farchat.app">privacy@farchat.app</a>.
                    </p>

                    <h2>6. Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your information, including:
                    </p>
                    <ul>
                        <li>Encryption of data in transit (TLS 1.3) and at rest (AES-256)</li>
                        <li>Regular security assessments and penetration testing</li>
                        <li>Access controls and authentication requirements</li>
                        <li>Employee training on data protection</li>
                    </ul>
                    <p>
                        However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
                    </p>

                    <h2>7. Government Data Warning</h2>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 not-prose my-4">
                        <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">Important Notice</p>
                        <p className="text-amber-700 dark:text-amber-300 text-sm">
                            FARchat is currently in <strong>Alpha</strong>. Do not input Controlled Unclassified Information (CUI), classified information, or sensitive government data into the service. FARchat is not yet authorized for processing such information.
                        </p>
                    </div>

                    <h2>8. Children&apos;s Privacy</h2>
                    <p>
                        Our service is not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                    </p>

                    <h2>9. International Data Transfers</h2>
                    <p>
                        Your information may be transferred to and processed in the United States, where our servers are located. We ensure appropriate safeguards are in place for international transfers.
                    </p>

                    <h2>10. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of the service after changes constitutes acceptance of the updated policy.
                    </p>

                    <h2>11. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <ul>
                        <li>Email: <a href="mailto:privacy@farchat.app">privacy@farchat.app</a></li>
                        <li>General inquiries: <a href="mailto:hello@farchat.app">hello@farchat.app</a></li>
                    </ul>

                    <h2>Related Policies</h2>
                    <ul>
                        <li><Link href="/legal/terms">Terms of Service</Link></li>
                        <li><Link href="/legal/cookies">Cookie Policy</Link></li>
                    </ul>
                </article>
            </div>
        </div>
    )
}
