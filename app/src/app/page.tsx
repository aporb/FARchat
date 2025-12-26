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
  { ssr: true }
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