import { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/sections/footer"
import { PageBackground, GlassCard } from "@/components/layout/page-background"
import {
  REGULATIONS,
  CATEGORY_INFO,
  type Regulation,
  type RegulationCategory,
} from "@/data/regulations"
import {
  BookOpen,
  Search,
  ExternalLink,
  Shield,
  Building2,
  FileText,
  ArrowRight,
  Database,
  RefreshCw,
} from "lucide-react"
import { QuickSearchInput } from "./quick-search-input"

export const metadata: Metadata = {
  title: "Federal Acquisition Regulations | FARchat",
  description:
    "Browse FAR, DFARS, VAAR, GSAM, and 25+ federal acquisition regulation libraries. Search across all regulations with AI-powered insights.",
  keywords: [
    "FAR",
    "DFARS",
    "VAAR",
    "GSAM",
    "federal acquisition regulation",
    "government contracting",
    "AFARS",
    "NMCARS",
    "DAFFARS",
  ],
}

// Category icon mapping
const categoryIcons: Record<RegulationCategory, typeof Shield> = {
  core: FileText,
  defense: Shield,
  civilian: Building2,
}

// Category color mapping for badges
const categoryColors: Record<RegulationCategory, string> = {
  core: "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30",
  defense: "bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/30",
  civilian: "bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/30",
}

// Regulation card component
function RegulationCard({ regulation }: { regulation: Regulation }) {
  const CategoryIcon = categoryIcons[regulation.category]

  return (
    <GlassCard variant="medium" hover className="p-4 sm:p-6 h-full flex flex-col">
      {/* Header with abbreviation and badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-federal-navy/10 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
            <span className="font-mono text-sm sm:text-base font-bold text-federal-navy dark:text-blue-400">
              {regulation.abbreviation.slice(0, 3)}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
              {regulation.abbreviation}
            </h3>
            <Badge
              variant="outline"
              className={`text-[10px] sm:text-xs ${categoryColors[regulation.category]}`}
            >
              {regulation.agencyAbbr}
            </Badge>
          </div>
        </div>
        <CategoryIcon className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
      </div>

      {/* Full name */}
      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 line-clamp-2">
        {regulation.fullName}
      </p>

      {/* Description */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-3 flex-grow">
        {regulation.description}
      </p>

      {/* Coverage */}
      <div className="text-xs text-slate-400 dark:text-slate-500 mb-4">
        <span className="font-mono">{regulation.coverage}</span>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mt-auto">
        <Button
          asChild
          size="sm"
          variant="default"
          className="flex-1 min-w-[100px] text-xs bg-federal-navy hover:bg-federal-navy/90 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <Link href={regulation.searchUrl}>
            <Search className="w-3 h-3 mr-1.5" />
            Search
          </Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="text-xs"
        >
          <a
            href={regulation.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-3 h-3 mr-1.5" />
            Official
          </a>
        </Button>
      </div>
    </GlassCard>
  )
}

// Category section component
function CategorySection({
  category,
  regulations,
}: {
  category: RegulationCategory
  regulations: Regulation[]
}) {
  const info = CATEGORY_INFO[category]
  const CategoryIcon = categoryIcons[category]

  return (
    <section className="mb-12 sm:mb-16">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            category === "core"
              ? "bg-blue-500/20"
              : category === "defense"
              ? "bg-slate-500/20"
              : "bg-green-500/20"
          }`}
        >
          <CategoryIcon
            className={`w-5 h-5 ${
              category === "core"
                ? "text-blue-600 dark:text-blue-400"
                : category === "defense"
                ? "text-slate-600 dark:text-slate-400"
                : "text-green-600 dark:text-green-400"
            }`}
          />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            {info.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {info.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {regulations.map((reg) => (
          <RegulationCard key={reg.id} regulation={reg} />
        ))}
      </div>
    </section>
  )
}

export default function RegulationsPage() {
  const coreRegs = REGULATIONS.filter((r) => r.category === "core")
  const defenseRegs = REGULATIONS.filter((r) => r.category === "defense")
  const civilianRegs = REGULATIONS.filter((r) => r.category === "civilian")

  const totalCount = REGULATIONS.length

  return (
    <>
      <Navigation />
      <PageBackground variant="network" overlay="light" imageOpacity={0.03}>
        <div className="pt-20 pb-16">
          {/* Hero Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <div className="text-center mb-8 sm:mb-12">
                <Badge
                  variant="outline"
                  className="mb-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                >
                  <Database className="w-3 h-3 mr-1.5" />
                  Regulation Library
                </Badge>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
                  {totalCount}+ Federal Acquisition Regulations
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-6 sm:mb-8">
                  Comprehensive coverage of FAR, DFARS, and agency-specific
                  supplements. Search across all regulation libraries with
                  AI-powered insights.
                </p>

                {/* Stats Bar */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      <strong className="text-slate-900 dark:text-slate-100">
                        {coreRegs.length}
                      </strong>{" "}
                      Core
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Shield className="w-4 h-4" />
                    <span>
                      <strong className="text-slate-900 dark:text-slate-100">
                        {defenseRegs.length}
                      </strong>{" "}
                      Defense
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Building2 className="w-4 h-4" />
                    <span>
                      <strong className="text-slate-900 dark:text-slate-100">
                        {civilianRegs.length}
                      </strong>{" "}
                      Civilian
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <RefreshCw className="w-4 h-4" />
                    <span>Synced nightly</span>
                  </div>
                </div>
              </div>

              {/* Quick Search CTA */}
              <div className="max-w-2xl mx-auto mb-12 sm:mb-16">
                <QuickSearchInput />
              </div>
            </div>
          </section>

          {/* Regulation Categories */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
              <CategorySection category="core" regulations={coreRegs} />
              <CategorySection category="defense" regulations={defenseRegs} />
              <CategorySection category="civilian" regulations={civilianRegs} />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 text-center border border-slate-700/50 shadow-2xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Can&apos;t find what you&apos;re looking for?
                </h2>
                <p className="text-slate-300 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
                  Our AI-powered search understands natural language. Just ask
                  your question and get relevant citations from across all
                  regulation libraries.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg"
                  >
                    <Link href="/chat">
                      Ask FARchat
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-white hover:bg-slate-700/50 backdrop-blur-sm"
                  >
                    <Link href="/contact">Request a Regulation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageBackground>
      <Footer />
    </>
  )
}
