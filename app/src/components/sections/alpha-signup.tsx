"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  SecurityShieldIcon,
  FederalBadgeIcon,
  ComplianceCheckmarkIcon
} from "@/components/common/icons"


export function AlphaSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call - replace with actual implementation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mx-auto max-w-4xl">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
              <SecurityShieldIcon className="mr-2 h-4 w-4" />
              Exclusive Alpha Program
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-50 sm:text-4xl">
              Join the Future of Federal Contracting
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Be among the first 100 federal contracting professionals to experience 
              AI-powered regulatory intelligence. Shape the future of procurement technology.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            
            {/* Alpha Program Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-50">
                What You&apos;ll Get as an Alpha Member
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ComplianceCheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-slate-50">Early Access to All Features</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">
                      Be the first to experience intelligent FAR/DFARS search, automated document generation, 
                      and professional workflow integration.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ComplianceCheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-slate-50">Direct Input on Product Development</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">
                      Your feedback directly shapes feature priorities and user experience improvements. 
                      Help us build the tool you need.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ComplianceCheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-slate-50">Personal Onboarding & Training</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">
                      One-on-one session to configure FARchat for your specific agency needs and 
                      contracting workflows.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ComplianceCheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-slate-50">Lifetime Professional Discount</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">
                      Lock in 50% off our professional subscription rate for life. 
                      Never pay full price again.
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <ComplianceCheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-slate-50">Exclusive Alpha Community</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">
                      Connect with other federal contracting professionals using cutting-edge AI tools.
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-federal-navy dark:text-blue-400">50+</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">Alpha participants</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-federal-navy dark:text-blue-400">12</div>
                    <div className="text-sm text-gray-600 dark:text-slate-400">Government agencies</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <Card className="border-2 border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-slate-900/50">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <FederalBadgeIcon className="w-8 h-8 text-federal-navy" />
                </div>
                <CardTitle className="text-xl text-federal-navy dark:text-blue-400">
                  Request Alpha Access
                </CardTitle>
                <CardDescription>
                  Limited to first 100 federal contracting professionals
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Government Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="firstname.lastname@agency.gov"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-federal-navy dark:focus:ring-blue-500 focus:border-federal-navy dark:focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Position/Role
                      </label>
                      <select
                        id="position"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-federal-navy dark:focus:ring-blue-500 focus:border-federal-navy dark:focus:border-blue-500"
                      >
                        <option value="">Select your role</option>
                        <option value="contracting-officer">GS-1102 Contracting Officer</option>
                        <option value="procurement-analyst">Procurement Analyst</option>
                        <option value="contract-specialist">Contract Specialist</option>
                        <option value="other">Other Federal Role</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="agency" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Agency/Department
                      </label>
                      <input
                        type="text"
                        id="agency"
                        required
                        placeholder="e.g., Department of Defense, GSA, VA"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-federal-navy dark:focus:ring-blue-500 focus:border-federal-navy dark:focus:border-blue-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-federal-navy hover:bg-federal-navy/90 text-white"
                    >
                      {isSubmitting ? "Submitting..." : "Request Alpha Access"}
                    </Button>

                    <div className="text-center">
                      <p className="text-xs text-gray-500">
                        By submitting, you agree to our privacy policy. No spam, ever.
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 mx-auto">
                      <ComplianceCheckmarkIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-50">
                        Welcome to the Alpha Program!
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
                        Thank you for your interest. We&apos;ll be in touch within 48 hours with next steps
                        and your exclusive alpha access credentials.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                      <p className="text-xs text-gray-500 dark:text-slate-500">
                        Check your government email for confirmation and setup instructions.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 rounded-full bg-amber-50 px-4 py-2 text-sm text-amber-800 border border-amber-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>Alpha program closes December 2025 • Limited spots remaining</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}