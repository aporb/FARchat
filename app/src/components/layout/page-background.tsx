'use client'

import { cn } from "@/lib/utils"

// Curated Unsplash images - abstract, professional, suitable for federal SaaS
const BACKGROUND_IMAGES = {
  // Abstract geometric blue - great for tech/federal
  geometric: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80",
  // Soft gradient mesh
  gradient: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80",
  // Abstract blue waves
  waves: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80",
  // Modern architecture - clean lines
  architecture: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80",
  // Abstract network/connection visual
  network: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
  // Minimal abstract shapes
  shapes: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80",
  // Soft blue abstract
  softBlue: "https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=1920&q=80",
  // Professional minimal
  minimal: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
} as const

type BackgroundVariant = keyof typeof BACKGROUND_IMAGES

interface PageBackgroundProps {
  variant?: BackgroundVariant
  className?: string
  children: React.ReactNode
  /** Overlay color - defaults to theme-appropriate gradient */
  overlay?: 'light' | 'dark' | 'blue' | 'none'
  /** Image opacity - very subtle by default */
  imageOpacity?: number
}

export function PageBackground({
  variant = 'geometric',
  className,
  children,
  overlay = 'light',
  imageOpacity = 0.03,
}: PageBackgroundProps) {
  const imageUrl = BACKGROUND_IMAGES[variant]

  const overlayClasses = {
    light: 'bg-gradient-to-br from-white/95 via-slate-50/90 to-blue-50/80 dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/95',
    dark: 'bg-gradient-to-br from-slate-900/95 via-slate-950/90 to-slate-900/95',
    blue: 'bg-gradient-to-br from-blue-50/90 via-white/85 to-slate-50/90 dark:from-slate-950/95 dark:via-blue-950/90 dark:to-slate-950/95',
    none: '',
  }

  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${imageUrl})`,
          opacity: imageOpacity,
        }}
        aria-hidden="true"
      />

      {/* Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0",
          overlayClasses[overlay]
        )}
        aria-hidden="true"
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Top-right gradient orb */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        {/* Bottom-left gradient orb */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-slate-400/10 dark:bg-slate-500/5 rounded-full blur-3xl" />

        {/* Subtle geometric network lines - echoing hero texture */}
        <svg className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.015] dark:opacity-[0.03]" viewBox="0 0 600 600">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="url(#line-gradient)" strokeWidth="1" fill="none">
            <line x1="100" y1="0" x2="300" y2="200" />
            <line x1="200" y1="50" x2="400" y2="150" />
            <line x1="300" y1="0" x2="500" y2="300" />
            <line x1="400" y1="100" x2="550" y2="250" />
            <line x1="100" y1="100" x2="250" y2="300" />
            <line x1="350" y1="150" x2="450" y2="350" />
          </g>
          <g fill="currentColor" opacity="0.3">
            <circle cx="100" cy="100" r="2" />
            <circle cx="300" cy="200" r="3" />
            <circle cx="400" cy="150" r="2" />
            <circle cx="250" cy="300" r="2" />
            <circle cx="500" cy="300" r="2" />
            <circle cx="450" cy="350" r="3" />
          </g>
        </svg>

        <svg className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.015] dark:opacity-[0.025] rotate-180" viewBox="0 0 500 500">
          <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5">
            <line x1="50" y1="50" x2="200" y2="150" />
            <line x1="150" y1="100" x2="350" y2="200" />
            <line x1="100" y1="200" x2="300" y2="350" />
            <line x1="250" y1="150" x2="400" y2="300" />
          </g>
          <g fill="currentColor" opacity="0.3">
            <circle cx="200" cy="150" r="2" />
            <circle cx="350" cy="200" r="2" />
            <circle cx="300" cy="350" r="2" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// Glass card component for consistent glassmorphic styling
interface GlassCardProps {
  className?: string
  children: React.ReactNode
  variant?: 'light' | 'medium' | 'heavy' | 'subtle'
  hover?: boolean
}

export function GlassCard({
  className,
  children,
  variant = 'medium',
  hover = false,
}: GlassCardProps) {
  const variantClasses = {
    subtle: 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-white/20 dark:border-slate-700/30',
    light: 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-white/30 dark:border-slate-700/40',
    medium: 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-white/40 dark:border-slate-700/50',
    heavy: 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-white/50 dark:border-slate-700/60',
  }

  return (
    <div
      className={cn(
        "rounded-2xl border shadow-lg shadow-black/5 dark:shadow-black/20",
        variantClasses[variant],
        hover && "transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  )
}

// Floating glass panel for feature highlights
interface GlassPanelProps {
  className?: string
  children: React.ReactNode
}

export function GlassPanel({ className, children }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "bg-white/50 dark:bg-slate-800/50",
        "backdrop-blur-xl",
        "border border-white/30 dark:border-slate-700/50",
        "rounded-3xl",
        "shadow-2xl shadow-black/5 dark:shadow-black/30",
        "ring-1 ring-inset ring-white/20 dark:ring-white/5",
        className
      )}
    >
      {children}
    </div>
  )
}
