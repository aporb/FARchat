"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "@/components/common/icons"
import { motion } from "framer-motion"

export function GetStarted() {
  return (
    <section id="get-started" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />
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
            className="mb-6 bg-primary/5 text-primary border-primary/20 px-4 py-1.5"
          >
            Currently in Alpha
          </Badge>

          {/* Headline */}
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6">
            Ready to streamline your FAR research?
          </h2>

          {/* Description */}
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            FARchat is free during alpha. Create an account to save your
            conversations and help us build the tool federal professionals need.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold hover-elevate shadow-lg shadow-primary/20"
              asChild
            >
              <Link href="/login">
                Create Free Account
                <ArrowRightIcon className="ml-2" size={20} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-slate-300 hover:bg-slate-50"
              asChild
            >
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>

          {/* Trust line */}
          <p className="text-sm text-slate-500">
            No credit card required. We&apos;d love your feedback.
          </p>

          {/* Optional: Simple social proof */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Active development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span>25+ regulation libraries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Federal-grade security</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
