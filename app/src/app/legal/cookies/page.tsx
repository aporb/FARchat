import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Cookie Policy | FARchat",
    description: "Learn about how FARchat uses cookies and similar technologies.",
}

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    <h1>Cookie Policy</h1>
                    <p className="text-slate-500 dark:text-slate-400">Last Updated: December 2025</p>

                    <p>
                        This Cookie Policy explains how FARchat (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and similar technologies when you visit our website or use our services.
                    </p>

                    <h2>1. What Are Cookies</h2>
                    <p>
                        Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help the website remember your preferences and improve your experience.
                    </p>

                    <h2>2. How We Use Cookies</h2>
                    <p>We use the following types of cookies:</p>

                    <h3>Essential Cookies</h3>
                    <p>
                        These cookies are necessary for the website to function properly. They enable core functionality such as:
                    </p>
                    <ul>
                        <li>User authentication and session management</li>
                        <li>Security features and fraud prevention</li>
                        <li>Remembering your login status</li>
                        <li>Load balancing to ensure site availability</li>
                    </ul>
                    <p>
                        <strong>These cookies cannot be disabled</strong> as they are essential for the service to work.
                    </p>

                    <h3>Preference Cookies</h3>
                    <p>
                        These cookies remember your settings and preferences to provide a more personalized experience:
                    </p>
                    <ul>
                        <li>Theme preference (light/dark mode)</li>
                        <li>Language settings</li>
                        <li>Display preferences</li>
                    </ul>

                    <h3>Analytics Cookies</h3>
                    <p>
                        We use analytics cookies to understand how visitors interact with our website. This helps us improve our service. These cookies collect information such as:
                    </p>
                    <ul>
                        <li>Pages visited and time spent on each page</li>
                        <li>How you arrived at our site</li>
                        <li>General geographic location (country/region level)</li>
                        <li>Device and browser information</li>
                    </ul>
                    <p>
                        Analytics data is aggregated and anonymized. We do not use this data to identify individual users.
                    </p>

                    <h2>3. Third-Party Cookies</h2>
                    <p>
                        Some cookies are placed by third-party services that appear on our pages:
                    </p>
                    <ul>
                        <li><strong>Authentication providers:</strong> When you sign in using Google or other OAuth providers</li>
                        <li><strong>Analytics services:</strong> To help us understand usage patterns</li>
                        <li><strong>Security services:</strong> To protect against malicious activity</li>
                    </ul>
                    <p>
                        These third parties have their own privacy policies governing the use of their cookies.
                    </p>

                    <h2>4. Managing Cookies</h2>
                    <p>
                        Most web browsers allow you to control cookies through their settings. You can:
                    </p>
                    <ul>
                        <li>View what cookies are stored on your device</li>
                        <li>Delete individual cookies or all cookies</li>
                        <li>Block cookies from specific or all websites</li>
                        <li>Set your browser to notify you when a cookie is being set</li>
                    </ul>
                    <p>
                        Please note that blocking or deleting cookies may impact your experience on FARchat. Some features may not work properly without essential cookies.
                    </p>

                    <h3>Browser-Specific Instructions</h3>
                    <ul>
                        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                        <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                        <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                    </ul>

                    <h2>5. Cookie Retention</h2>
                    <p>
                        Different cookies have different retention periods:
                    </p>
                    <ul>
                        <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                        <li><strong>Authentication cookies:</strong> Retained for up to 30 days</li>
                        <li><strong>Preference cookies:</strong> Retained for up to 1 year</li>
                        <li><strong>Analytics cookies:</strong> Retained for up to 2 years</li>
                    </ul>

                    <h2>6. Updates to This Policy</h2>
                    <p>
                        We may update this Cookie Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the &quot;Last Updated&quot; date.
                    </p>

                    <h2>7. Contact Us</h2>
                    <p>
                        If you have questions about our use of cookies, please contact us:
                    </p>
                    <ul>
                        <li>Email: <a href="mailto:privacy@farchat.app">privacy@farchat.app</a></li>
                    </ul>

                    <h2>Related Policies</h2>
                    <ul>
                        <li><Link href="/legal/privacy">Privacy Policy</Link></li>
                        <li><Link href="/legal/terms">Terms of Service</Link></li>
                    </ul>
                </article>
            </div>
        </div>
    )
}
