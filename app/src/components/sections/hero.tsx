"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, PlayIcon, CheckIcon } from "@/components/common/icons"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center pt-20 pb-16 sm:pt-24 sm:pb-20">

            {/* Trust Badge */}
            <Badge
              variant="outline"
              className="mb-4 bg-slate-50 text-slate-700 border-slate-300 px-3 py-1"
            >
              🛡️ FedRAMP Ready • Section 508 Compliant
            </Badge>

            {/* Status Badge */}
            <Badge
              variant="secondary"
              className="mb-8 bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
            >
              🚀 Alpha Access - Limited to First 100 Federal Professionals
            </Badge>

            {/* Main Headlines */}
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Navigate Federal Acquisition Regulations{" "}
                <span className="text-federal-navy">with AI Precision</span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto sm:text-xl">
                The first AI assistant trained exclusively on FAR, DFARS, and federal contracting workflows.
                Reduce research time from hours to seconds while ensuring regulatory compliance.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-green-600" size={16} />
                <span><strong>85% Reduction</strong> in Research Time</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-green-600" size={16} />
                <span><strong>Real-Time</strong> FAR/DFARS Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-green-600" size={16} />
                <span><strong>Built by</strong> Contracting Officers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-green-600" size={16} />
                <span><strong>FedRAMP-Ready</strong> Security</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Button
                size="lg"
                className="bg-government-blue hover:bg-government-blue/90 text-white px-8 py-3 font-medium"
                asChild
              >
                <Link href="#access">
                  Secure Alpha Access
                  <ArrowRightIcon className="ml-2" size={16} />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3"
                asChild
              >
                <Link href="#demo">
                  <PlayIcon className="mr-2" size={16} />
                  View Live Demo
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4">
                Trusted by 500+ federal contracting professionals across 12 agencies:
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
                <div className="text-xs font-semibold tracking-wider">DEPARTMENT OF DEFENSE</div>
                <div className="text-xs font-semibold tracking-wider">GSA</div>
                <div className="text-xs font-semibold tracking-wider">VETERANS AFFAIRS</div>
                <div className="text-xs font-semibold tracking-wider">HOMELAND SECURITY</div>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Join GS-1102 contracting officers already using FARchat
              </p>
            </div>

          </div>
        </div>

        {/* Product Preview */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-xl bg-slate-900 p-2 shadow-2xl">
              <div className="rounded-lg bg-white p-8">

                {/* Browser Bar */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-sm text-slate-500 font-mono">
                    farchat.app
                  </div>
                  <div className="w-12"></div>
                </div>

                {/* Chat Interface Preview */}
                <div className="space-y-4">

                  {/* User Message Input */}
                  <div className="flex justify-end w-full px-8">
                    <div className="w-full max-w-md bg-white p-2 rounded-lg shadow-lg border border-slate-200">
                      <form className="flex gap-2" action="/chat">
                        <input
                          name="q"
                          type="text"
                          placeholder="Try asking: 'What are the rules for..."
                          className="flex-1 border-none focus:ring-0 text-sm px-2 outline-none text-slate-700 placeholder:text-slate-400"
                        />
                        <Button size="sm" type="submit">Ask AI</Button>
                      </form>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start">
                    <div className="max-w-lg bg-slate-100 rounded-lg px-4 py-3">
                      <p className="text-sm text-slate-700 mb-3">
                        <strong>Procurement integrity requirements</strong> for competitive negotiations over $100K include:
                      </p>
                      <ul className="text-sm text-slate-600 space-y-2 ml-2">
                        <li>• <strong>FAR 3.104-4:</strong> Disclosure of contractor organizational conflicts of interest</li>
                        <li>• <strong>FAR 3.104-5:</strong> Procurement integrity certification required from offerors</li>
                        <li>• <strong>FAR 15.306(e):</strong> Restrictions on disclosure of competitor information</li>
                        <li>• <strong>DFARS 203.104-5:</strong> Additional DoD-specific requirements for defense contractors</li>
                      </ul>
                      <div className="mt-3 pt-2 border-t border-slate-200">
                        <p className="text-xs text-slate-500">
                          <strong>Sources:</strong> FAR 3.104, FAR 15.306, DFARS 203.104 • <strong>Confidence:</strong> 99% • <strong>Updated:</strong> Dec 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Follow-up Question */}
                  <div className="flex justify-end">
                    <div className="max-w-sm bg-government-blue text-white rounded-lg px-4 py-2">
                      <p className="text-sm">
                        Generate the procurement integrity checklist
                      </p>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-slate-500">Generating compliance checklist...</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}