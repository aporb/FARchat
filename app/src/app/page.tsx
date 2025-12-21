import { Navigation } from "@/components/layout/navigation"
import { Hero } from "@/components/sections/hero"
import { Trust } from "@/components/sections/trust"
import { Features } from "@/components/sections/features"
import { GetStarted } from "@/components/sections/get-started"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main id="main-content">
        <Hero />
        <section id="demo">
          {/* Demo anchor for navigation - scrolls to hero product demo */}
        </section>
        <section id="compliance">
          <Trust />
        </section>
        <Features />
        <section id="access">
          <GetStarted />
        </section>
      </main>
      <Footer />
    </div>
  )
}