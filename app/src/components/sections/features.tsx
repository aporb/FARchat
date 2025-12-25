"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  ShieldCheckIcon,
  ZapIcon,
  NetworkIcon,
  CheckIcon
} from "lucide-react"

// Dynamic import for heavy SVG animation component - only loads when visible
const NetworkVisualization = dynamic(
  () => import("@/components/common/NetworkVisualization").then(mod => ({ default: mod.NetworkVisualization })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-800 animate-pulse flex items-center justify-center">
        <div className="w-16 h-16 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }
)

export function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6">
            The Regulatory Graph
          </h2>
          <p className="text-xl text-slate-600">
            A semantic intelligence engine connecting <span className="font-semibold text-federal-navy">25+ regulatory libraries</span> into a single source of truth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

          {/* Large Tile: Regulatory Graph */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="absolute inset-0">
              <NetworkVisualization />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  <NetworkIcon size={14} className="mr-1" /> Semantic Core
                </Badge>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Unifying the Federal Ecosystem</h3>
              <p className="text-slate-300 max-w-lg">
                FARchat doesn&apos;t just read text. It maps the relationships between the FAR, DFARS, and 23 agency supplements (VAAR, GSAM, NMCARS) to understand the *hierarchy* of compliance.
              </p>
            </div>
          </div>

          {/* Tall Tile: Compliance Automation */}
          <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                <ShieldCheckIcon size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Compliance Autopilot</h3>
              <p className="text-slate-600">
                Generate J&As, Acquisition Plans, and Market Research Reports that automatically cite the correct agency-specific regulations.
              </p>
            </div>

            {/* Abstract Visual Representation */}
            <div className="mt-8 relative h-40 bg-white rounded-xl border border-slate-100 shadow-sm p-4 overflow-hidden">
              <div className="space-y-3 opacity-50">
                <div className="h-2 w-3/4 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-2 w-full bg-slate-200 rounded animate-pulse delay-75"></div>
                <div className="h-2 w-5/6 bg-slate-200 rounded animate-pulse delay-150"></div>
              </div>
              {/* Active Checkmark overlay */}
              <div className="absolute bottom-4 right-4 bg-green-500 text-white p-2 rounded-full shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <CheckIcon size={16} />
              </div>
            </div>
          </div>

          {/* Small Tile: Speed */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ZapIcon size={120} />
            </div>
            <h3 className="text-4xl font-bold text-slate-900 mb-1">85%</h3>
            <p className="text-sm font-semibold text-federal-navy uppercase tracking-wider mb-4">Time Reduction</p>
            <p className="text-slate-600 text-sm">
              Cut research time from hours to seconds.
            </p>
          </div>

          {/* Small Tile: Accuracy */}
          <div className="md:col-span-1 md:col-start-2 relative group overflow-hidden rounded-3xl bg-federal-navy text-white p-8 shadow-lg">
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-1">99.9%</h3>
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">Citation Accuracy</p>
              <p className="text-blue-100 text-sm">
                Every answer links directly to the source text.
              </p>
            </div>
          </div>

          {/* Small Tile: Updates */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Live Updates</span>
            </div>
            <p className="text-slate-900 font-semibold">
              Synced nightly with the Federal Register and Acquisition.gov.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
