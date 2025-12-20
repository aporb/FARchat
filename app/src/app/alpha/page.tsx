import { Navigation } from "@/components/layout/navigation"
import { AlphaSignup } from "@/components/sections/alpha-signup"
import { Footer } from "@/components/layout/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join Alpha Program - FARchat",
  description: "Be among the first 100 federal contracting professionals to experience AI-powered regulatory intelligence. Shape the future of procurement technology.",
  openGraph: {
    title: "Join Alpha Program - FARchat",
    description: "Be among the first 100 federal contracting professionals to experience AI-powered regulatory intelligence.",
  },
}

export default function AlphaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <AlphaSignup />
      </main>
      <Footer />
    </div>
  )
}