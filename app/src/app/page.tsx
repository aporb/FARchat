import { Navigation } from "@/components/layout/navigation"
import { Hero } from "@/components/sections/hero"
import { Trust } from "@/components/sections/trust"
import { Features } from "@/components/sections/features"
import { Waitlist } from "@/components/sections/waitlist"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <section id="demo">
          {/* Demo anchor for navigation - scrolls to hero product demo */}
        </section>
        <section id="compliance">
          <Trust />
        </section>
        <Features />
        <section id="access">
          <Waitlist />
        </section>
      </main>
      <Footer />
    </div>
  )
}