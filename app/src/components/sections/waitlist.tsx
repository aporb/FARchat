"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckIcon, ShieldIcon } from "@/components/common/icons"

export function Waitlist() {
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [agency, setAgency] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [emailError, setEmailError] = useState("")

  const validateGovernmentEmail = (email: string) => {
    const govPattern = /\.(gov|mil|fed\.us)$/i
    return govPattern.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    
    if (value && !validateGovernmentEmail(value)) {
      setEmailError("Please use your official government email address (.gov, .mil, or .fed.us)")
    } else {
      setEmailError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateGovernmentEmail(email)) {
      setEmailError("Government email address required for alpha access")
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <section id="waitlist" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <div className="mb-4">
                <span className="inline-flex items-center bg-federal-navy/10 text-federal-navy text-sm font-medium px-3 py-1 rounded-full">
                  🏛️ Exclusive Access for Federal Professionals
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-6">
                Reserve Your Alpha Access
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Limited to the first 100 federal contracting professionals. Join GS-1102 
                contracting officers and procurement specialists who will shape the future 
                of AI-powered federal acquisition.
              </p>
              
              {/* Benefits */}
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <CheckIcon className="text-green-600 mt-1" size={18} />
                  <div>
                    <div className="font-semibold text-slate-900">Priority Alpha Access</div>
                    <div className="text-sm text-slate-600">First 100 federal professionals only - exclusive early access</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="text-green-600 mt-1" size={18} />
                  <div>
                    <div className="font-semibold text-slate-900">Lifetime Pricing Benefits</div>
                    <div className="text-sm text-slate-600">Lock in alpha pricing with 50% permanent discount on professional features</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="text-green-600 mt-1" size={18} />
                  <div>
                    <div className="font-semibold text-slate-900">Direct Product Influence</div>
                    <div className="text-sm text-slate-600">Shape features, workflows, and priorities based on your agency&apos;s needs</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="text-green-600 mt-1" size={18} />
                  <div>
                    <div className="font-semibold text-slate-900">Dedicated Support Channel</div>
                    <div className="text-sm text-slate-600">Direct access to development team for feedback and customization requests</div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <ShieldIcon size={16} className="text-federal-navy" />
                    <span className="font-medium">FedRAMP Security Standards</span>
                  </div>
                  <div>•</div>
                  <div className="font-medium">Zero Spam Policy</div>
                  <div>•</div>
                  <div className="font-medium">Professional Privacy</div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              {!isSubmitted ? (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Request Alpha Access
                    </h3>
                    <p className="text-sm text-slate-600">
                      Reserved for federal contracting professionals. Requires government email verification.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                        Official Government Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        placeholder="firstname.lastname@agency.gov"
                        className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-federal-navy focus:border-federal-navy ${
                          emailError ? 'border-red-300 bg-red-50' : 'border-slate-300'
                        }`}
                      />
                      {emailError && (
                        <p className="mt-1 text-sm text-red-600">{emailError}</p>
                      )}
                      <p className="mt-1 text-xs text-slate-500">
                        Accepts .gov, .mil, and .fed.us domains only
                      </p>
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-semibold text-slate-900 mb-2">
                        Contracting Role *
                      </label>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-federal-navy focus:border-federal-navy"
                      >
                        <option value="">Select your contracting role</option>
                        <option value="gs-1102-co">GS-1102 Contracting Officer</option>
                        <option value="gs-1102-specialist">GS-1102 Contract Specialist</option>
                        <option value="procurement-analyst">Procurement Analyst</option>
                        <option value="cotr">Contracting Officer&apos;s Technical Representative (COTR)</option>
                        <option value="acquisition-manager">Acquisition Program Manager</option>
                        <option value="small-business-specialist">Small Business Specialist</option>
                        <option value="other-procurement">Other Procurement Role</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="agency" className="block text-sm font-semibold text-slate-900 mb-2">
                        Agency/Organization
                      </label>
                      <select
                        id="agency"
                        value={agency}
                        onChange={(e) => setAgency(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-federal-navy focus:border-federal-navy"
                      >
                        <option value="">Select your agency (optional)</option>
                        <option value="dod">Department of Defense</option>
                        <option value="gsa">General Services Administration</option>
                        <option value="va">Department of Veterans Affairs</option>
                        <option value="dhs">Department of Homeland Security</option>
                        <option value="hhs">Department of Health and Human Services</option>
                        <option value="dot">Department of Transportation</option>
                        <option value="doe">Department of Energy</option>
                        <option value="usda">Department of Agriculture</option>
                        <option value="nasa">National Aeronautics and Space Administration</option>
                        <option value="other">Other Federal Agency</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || !email || !role || !!emailError}
                      className="w-full bg-government-blue hover:bg-government-blue/90 text-white py-3 font-medium"
                    >
                      {isSubmitting ? "Submitting Request..." : "Request Alpha Access"}
                    </Button>

                    <div className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs text-slate-600 text-center">
                        <strong>Privacy Commitment:</strong> Your information is used solely for alpha access 
                        coordination. We follow federal privacy standards and will never share 
                        your data with third parties.
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckIcon className="text-green-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      Alpha Access Request Received
                    </h3>
                    <p className="text-slate-600 mb-4">
                      Thank you for requesting alpha access to FARchat. Your government email 
                      has been verified and you&apos;ve been added to our priority access list.
                    </p>
                  </div>
                  
                  <div className="bg-federal-navy/5 rounded-lg p-6 text-left">
                    <h4 className="font-semibold text-slate-900 mb-3">What happens next:</h4>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-federal-navy text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                        <div>
                          <div className="font-medium text-slate-900">Email Verification</div>
                          <div>Confirmation sent to your government email address</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-federal-navy text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                        <div>
                          <div className="font-medium text-slate-900">Priority Review</div>
                          <div>Your request will be reviewed within 3-5 business days</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-federal-navy text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                        <div>
                          <div className="font-medium text-slate-900">Alpha Access Invitation</div>
                          <div>If selected, you&apos;ll receive access credentials and onboarding materials</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-600">
                      <strong>Important:</strong> Alpha access is limited to the first 100 qualified federal 
                      contracting professionals. Check your government email for next steps.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Bottom Stats */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Trusted by Federal Professionals
              </h3>
              <p className="text-sm text-slate-600">
                Join contracting officers and procurement specialists across the federal government
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="text-3xl font-bold text-federal-navy mb-1">500+</div>
                <div className="text-sm text-slate-600 font-medium">Federal Professionals</div>
                <div className="text-xs text-slate-500 mt-1">On Priority List</div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="text-3xl font-bold text-federal-navy mb-1">12</div>
                <div className="text-sm text-slate-600 font-medium">Government Agencies</div>
                <div className="text-xs text-slate-500 mt-1">Already Represented</div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="text-3xl font-bold text-federal-navy mb-1">100</div>
                <div className="text-sm text-slate-600 font-medium">Alpha Access Limit</div>
                <div className="text-xs text-slate-500 mt-1">First Come, First Served</div>
              </div>
              <div className="bg-white rounded-lg p-6 border border-slate-200">
                <div className="text-3xl font-bold text-federal-navy mb-1">Q1</div>
                <div className="text-sm text-slate-600 font-medium">2025 Launch</div>
                <div className="text-xs text-slate-500 mt-1">Alpha Testing Begins</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}