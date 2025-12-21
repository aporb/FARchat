import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "FARchat - AI Assistant for Federal Contracting Professionals",
  description: "Navigate federal acquisition regulations with confidence. Get instant, accurate answers to complex FAR/DFARS questions. Reduce research time by 80% with AI-powered regulatory intelligence.",
  keywords: ["federal contracting", "FAR", "DFARS", "government procurement", "AI assistant", "contracting officer", "GS-1102"],
  authors: [{ name: "FARchat Team" }],
  creator: "FARchat",
  publisher: "FARchat",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://farchat.app",
    title: "FARchat - AI Assistant for Federal Contracting Professionals",
    description: "Navigate federal acquisition regulations with confidence. Get instant, accurate answers to complex FAR/DFARS questions.",
    siteName: "FARchat",
  },
  twitter: {
    card: "summary_large_image",
    title: "FARchat - AI Assistant for Federal Contracting Professionals",
    description: "Navigate federal acquisition regulations with confidence. Get instant, accurate answers to complex FAR/DFARS questions.",
    creator: "@farchatapp",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B263B",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-federal-navy focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-federal-navy"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}