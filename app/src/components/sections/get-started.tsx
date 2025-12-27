"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "@/components/common/icons"
import { motion } from "framer-motion"

export function GetStarted() {
  return (
    <section id="get-started" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-950 relative overflow-hidden">
      {/* Subtle geometric network accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg className="absolute top-0 left-1/4 w-[400px] h-[300px] opacity-[0.02] dark:opacity-[0.04]" viewBox="0 0 400 300">
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <line x1="0" y1="100" x2="150" y2="50" />
            <line x1="150" y1="50" x2="300" y2="120" />
            <line x1="100" y1="150" x2="250" y2="80" />
            <line x1="250" y1="80" x2="380" y2="150" />
          </g>
          <g fill="currentColor" opacity="0.4">
            <circle cx="150" cy="50" r="3" />
            <circle cx="250" cy="80" r="2" />
            <circle cx="300" cy="120" r="2" />
          </g>
        </svg>
        <svg className="absolute bottom-10 right-10 w-[300px] h-[200px] opacity-[0.02] dark:opacity-[0.04]" viewBox="0 0 300 200">
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <line x1="50" y1="50" x2="150" y2="100" />
            <line x1="150" y1="100" x2="250" y2="70" />
            <line x1="100" y1="120" x2="200" y2="150" />
          </g>
          <g fill="currentColor" opacity="0.4">
            <circle cx="150" cy="100" r="3" />
            <circle cx="200" cy="150" r="2" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Alpha Badge */}
          <Badge
            variant="outline"
            className="mb-4 sm:mb-6 bg-primary/5 text-primary border-primary/20 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm"
          >
            Currently in Alpha
          </Badge>

          {/* Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6">
            Ready to streamline your FAR research?
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
            FARchat is free during alpha. Create an account to save your
            conversations and help us build the tool federal professionals need.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
            <Button
              size="lg"
              className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold hover-elevate shadow-lg shadow-primary/20"
              asChild
            >
              <Link href="/login">
                Create Free Account
                <ArrowRightIcon className="ml-2" size={18} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              asChild
            >
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>

          {/* Trust line */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            No credit card required. We&apos;d love your feedback.
          </p>

          {/* Optional: Simple social proof */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"></div>
                <span>Active development</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500"></div>
                <span>25+ regulations</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-500"></div>
                <span>Federal-grade security</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
