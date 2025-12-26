import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/providers/theme-provider"

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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        {/* Skip Links for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-federal-navy focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <a
          href="#chat-input"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-44 focus:z-[100] focus:px-4 focus:py-2 focus:bg-federal-navy focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Skip to chat input
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={300}>
            {children}
          </TooltipProvider>
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}