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
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle geometric network accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="absolute -top-20 -right-20 w-[500px] h-[400px] opacity-[0.02] dark:opacity-[0.03]" viewBox="0 0 500 400">
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <line x1="50" y1="100" x2="200" y2="50" />
            <line x1="200" y1="50" x2="350" y2="150" />
            <line x1="150" y1="200" x2="300" y2="100" />
            <line x1="300" y1="100" x2="450" y2="200" />
            <line x1="100" y1="300" x2="250" y2="200" />
          </g>
          <g fill="currentColor" opacity="0.4">
            <circle cx="200" cy="50" r="3" />
            <circle cx="300" cy="100" r="2" />
            <circle cx="350" cy="150" r="2" />
            <circle cx="250" cy="200" r="3" />
          </g>
        </svg>
        <svg className="absolute -bottom-10 -left-10 w-[400px] h-[300px] opacity-[0.015] dark:opacity-[0.025]" viewBox="0 0 400 300">
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <line x1="50" y1="50" x2="180" y2="120" />
            <line x1="180" y1="120" x2="300" y2="80" />
            <line x1="100" y1="180" x2="220" y2="220" />
            <line x1="220" y1="220" x2="350" y2="180" />
          </g>
          <g fill="currentColor" opacity="0.4">
            <circle cx="180" cy="120" r="3" />
            <circle cx="220" cy="220" r="2" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
            The Regulatory Graph
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400">
            A semantic intelligence engine connecting <span className="font-semibold text-slate-900 dark:text-blue-400">25+ regulatory libraries</span> into a single source of truth.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px]">

          {/* Large Tile: Regulatory Graph */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="absolute inset-0">
              <NetworkVisualization />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
            </div>

            <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8 w-full z-10">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs sm:text-sm">
                  <NetworkIcon size={12} className="mr-1 sm:hidden" />
                  <NetworkIcon size={14} className="mr-1 hidden sm:inline" /> Semantic Core
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">Unifying the Federal Ecosystem</h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg">
                FARchat maps the relationships between FAR, DFARS, and 23 agency supplements to understand the hierarchy of compliance.
              </p>
            </div>
          </div>

          {/* Tall Tile: Compliance Automation */}
          <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6 text-green-600 dark:text-green-400">
                <ShieldCheckIcon size={20} className="sm:hidden" />
                <ShieldCheckIcon size={24} className="hidden sm:block" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 sm:mb-3">Compliance Autopilot</h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Generate J&As and Acquisition Plans that automatically cite the correct regulations.
              </p>
            </div>

            {/* Abstract Visual Representation - hidden on smallest screens */}
            <div className="hidden sm:block mt-4 sm:mt-8 relative h-24 sm:h-32 lg:h-40 bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-3 sm:p-4 overflow-hidden">
              <div className="space-y-2 sm:space-y-3 opacity-50">
                <div className="h-1.5 sm:h-2 w-3/4 bg-slate-200 dark:bg-slate-600 rounded animate-pulse"></div>
                <div className="h-1.5 sm:h-2 w-full bg-slate-200 dark:bg-slate-600 rounded animate-pulse delay-75"></div>
                <div className="h-1.5 sm:h-2 w-5/6 bg-slate-200 dark:bg-slate-600 rounded animate-pulse delay-150"></div>
              </div>
              {/* Active Checkmark overlay */}
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-green-500 text-white p-1.5 sm:p-2 rounded-full shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                <CheckIcon size={14} className="sm:hidden" />
                <CheckIcon size={16} className="hidden sm:block" />
              </div>
            </div>
          </div>

          {/* Small Tile: Speed */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8 shadow-sm hover-elevate">
            <div className="absolute top-0 right-0 p-2 sm:p-4 opacity-10">
              <ZapIcon size={80} className="sm:hidden" />
              <ZapIcon size={120} className="hidden sm:block" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-1">10x</h3>
            <p className="text-xs sm:text-sm font-semibold text-federal-navy dark:text-blue-400 uppercase tracking-wider mb-2 sm:mb-4">Faster Research</p>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Cut research time from hours to seconds.
            </p>
          </div>

          {/* Small Tile: Accuracy */}
          <div className="md:col-span-1 md:col-start-2 relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-4 sm:p-6 lg:p-8 shadow-lg hover-elevate">
            <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-1">Precise</h3>
              <p className="text-xs sm:text-sm font-semibold text-blue-300 uppercase tracking-wider mb-2 sm:mb-4">Citations</p>
              <p className="text-slate-300 text-xs sm:text-sm">
                Every answer links directly to the source regulation.
              </p>
            </div>
          </div>

          {/* Small Tile: Updates */}
          <div className="md:col-span-1 relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-8 shadow-sm hover-elevate">
            <div className="flex items-center gap-2 mb-2 sm:mb-4">
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-green-600 uppercase tracking-wider">Live Updates</span>
            </div>
            <p className="text-sm sm:text-base text-slate-900 dark:text-slate-100 font-semibold">
              Synced nightly with the Federal Register and Acquisition.gov.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
