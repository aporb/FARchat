'use client'

import dynamic from 'next/dynamic'
import { Navigation } from "@/components/layout/navigation"
import { Hero } from "@/components/sections/hero"

// Below the fold - lazy load
const TrustSignals = dynamic(
  () => import('@/components/sections/trust-signals').then(mod => mod.TrustSignals),
  { ssr: true }
)

const Features = dynamic(
  () => import('@/components/sections/features').then(mod => mod.Features),
  { ssr: true }
)

const GetStarted = dynamic(
  () => import('@/components/sections/get-started').then(mod => mod.GetStarted),
  { ssr: true }
)

const FAQ = dynamic(
  () => import('@/components/sections/faq').then(mod => mod.FAQ),
  {
    ssr: false, // Disable SSR to fix Radix Accordion hydration mismatch
    loading: () => (
      <section className="py-20 md:py-32 bg-muted/30 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-10 w-64 bg-muted animate-pulse rounded mx-auto mb-4" />
              <div className="h-6 w-48 bg-muted animate-pulse rounded mx-auto" />
            </div>
          </div>
        </div>
      </section>
    )
  }
)

const Footer = dynamic(
  () => import('@/components/sections/footer').then(mod => mod.Footer),
  { ssr: true }
)

const StickyMobileCTA = dynamic(
  () => import('@/components/landing/StickyMobileCTA').then(mod => mod.StickyMobileCTA),
  { ssr: false } // Only needed on client scroll
)

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main id="main-content">
        <Hero />
        <TrustSignals />
        <section id="demo">
          {/* Demo anchor for navigation - scrolls to hero product demo */}
        </section>
        <Features />
        <section id="access">
          <GetStarted />
        </section>
        <FAQ />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}