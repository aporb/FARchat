import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Terms of Service | FARchat",
    description: "Terms and conditions for using the FARchat service.",
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    <h1>Terms of Service</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last Updated: December 2025</p>

                    <p>
                        Please read these Terms of Service (&quot;Terms&quot;) carefully before using FARchat. By accessing or using our service, you agree to be bound by these Terms.
                    </p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By creating an account or using FARchat, you agree to these Terms and our <Link href="/legal/privacy">Privacy Policy</Link>. If you do not agree, do not use the service.
                    </p>

                    <h2>2. Description of Service</h2>
                    <p>
                        FARchat is an AI-powered tool designed to help federal acquisition professionals research and understand the Federal Acquisition Regulation (FAR), Defense Federal Acquisition Regulation Supplement (DFARS), and other agency supplements. The service provides:
                    </p>
                    <ul>
                        <li>Natural language search across regulatory databases</li>
                        <li>AI-generated responses with citations</li>
                        <li>Cross-referencing between regulations</li>
                    </ul>

                    <h2>3. Alpha Status Disclaimer</h2>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 not-prose my-4">
                        <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">Important: Alpha Release</p>
                        <p className="text-amber-700 dark:text-amber-300 text-sm mb-2">
                            FARchat is currently in <strong>Alpha</strong>. This means:
                        </p>
                        <ul className="text-amber-700 dark:text-amber-300 text-sm list-disc list-inside space-y-1">
                            <li>The service may contain bugs or errors</li>
                            <li>Features may change without notice</li>
                            <li>Service availability is not guaranteed</li>
                            <li>Data loss may occur</li>
                        </ul>
                    </div>

                    <h2>4. User Accounts</h2>
                    <p>To use FARchat, you must:</p>
                    <ul>
                        <li>Provide accurate and complete registration information</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Promptly notify us of any unauthorized access</li>
                        <li>Be at least 18 years of age</li>
                    </ul>
                    <p>
                        You are responsible for all activities that occur under your account.
                    </p>

                    <h2>5. Acceptable Use</h2>
                    <p>You agree NOT to:</p>
                    <ul>
                        <li>Use the service for any unlawful purpose</li>
                        <li>Input classified, CUI, or sensitive government information</li>
                        <li>Attempt to reverse engineer or extract our AI models</li>
                        <li>Automate queries without our written permission</li>
                        <li>Share your account credentials with others</li>
                        <li>Circumvent rate limits or security measures</li>
                        <li>Use the service to generate misleading or fraudulent content</li>
                        <li>Interfere with or disrupt the service</li>
                    </ul>

                    <h2>6. AI-Generated Content</h2>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 not-prose my-4">
                        <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">Verification Required</p>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                            FARchat uses AI to generate responses. <strong>Always verify</strong> citations and information against the official regulatory text at <a href="https://acquisition.gov" target="_blank" rel="noopener noreferrer" className="underline">acquisition.gov</a>. AI responses may contain errors or outdated information.
                        </p>
                    </div>
                    <p>
                        You acknowledge that:
                    </p>
                    <ul>
                        <li>AI-generated content is provided for informational purposes only</li>
                        <li>Responses do not constitute legal advice</li>
                        <li>You are responsible for verifying accuracy before relying on any information</li>
                        <li>We are not liable for decisions made based on AI outputs</li>
                    </ul>

                    <h2>7. Intellectual Property</h2>
                    <p>
                        <strong>Our Property:</strong> FARchat, including its software, design, and documentation, is owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our property without permission.
                    </p>
                    <p>
                        <strong>Your Content:</strong> You retain ownership of content you submit. By using the service, you grant us a license to use your queries to provide and improve the service.
                    </p>
                    <p>
                        <strong>Regulatory Content:</strong> FAR, DFARS, and agency supplements are U.S. government works in the public domain.
                    </p>

                    <h2>8. Disclaimers</h2>
                    <p>
                        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                    <p>We do not warrant that:</p>
                    <ul>
                        <li>The service will be uninterrupted or error-free</li>
                        <li>AI-generated responses will be accurate or complete</li>
                        <li>The service will meet your specific requirements</li>
                        <li>Defects will be corrected</li>
                    </ul>

                    <h2>9. Limitation of Liability</h2>
                    <p>
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE SERVICE.
                    </p>
                    <p>
                        OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM YOUR USE OF THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.
                    </p>

                    <h2>10. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold us harmless from any claims, damages, losses, or expenses arising from:
                    </p>
                    <ul>
                        <li>Your use of the service</li>
                        <li>Your violation of these Terms</li>
                        <li>Your violation of any third-party rights</li>
                        <li>Decisions made based on AI-generated content</li>
                    </ul>

                    <h2>11. Termination</h2>
                    <p>
                        We may suspend or terminate your access to the service at any time, with or without cause. Upon termination:
                    </p>
                    <ul>
                        <li>Your right to use the service ceases immediately</li>
                        <li>We may delete your account data per our retention policy</li>
                        <li>Provisions that should survive termination will remain in effect</li>
                    </ul>
                    <p>
                        You may terminate your account at any time by contacting us at <a href="mailto:support@farchat.app">support@farchat.app</a>.
                    </p>

                    <h2>12. Governing Law</h2>
                    <p>
                        These Terms are governed by the laws of the United States and the State of Delaware, without regard to conflict of law principles. Any disputes shall be resolved in the courts located in Delaware.
                    </p>

                    <h2>13. Changes to Terms</h2>
                    <p>
                        We may modify these Terms at any time. We will notify you of material changes by posting the updated Terms and updating the &quot;Last Updated&quot; date. Your continued use after changes constitutes acceptance.
                    </p>

                    <h2>14. General Provisions</h2>
                    <ul>
                        <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and us regarding the service.</li>
                        <li><strong>Severability:</strong> If any provision is found unenforceable, the remaining provisions remain in effect.</li>
                        <li><strong>Waiver:</strong> Our failure to enforce any right does not waive that right.</li>
                        <li><strong>Assignment:</strong> You may not assign these Terms. We may assign them to a successor.</li>
                    </ul>

                    <h2>15. Contact Information</h2>
                    <p>For questions about these Terms, contact us:</p>
                    <ul>
                        <li>Email: <a href="mailto:legal@farchat.app">legal@farchat.app</a></li>
                        <li>Support: <a href="mailto:support@farchat.app">support@farchat.app</a></li>
                    </ul>

                    <h2>Related Policies</h2>
                    <ul>
                        <li><Link href="/legal/privacy">Privacy Policy</Link></li>
                        <li><Link href="/legal/cookies">Cookie Policy</Link></li>
                    </ul>
                </article>
            </div>
        </div>
    )
}
