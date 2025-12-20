"use client"

import { Badge } from "@/components/ui/badge"

export function Trust() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Government-Grade Security & Compliance
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Built to federal security standards with the trust and compliance requirements 
            your agency demands.
          </p>
        </div>

        {/* Compliance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* FedRAMP */}
          <div className="text-center p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 9.05 9 10 5.16-.95 9-4.45 9-10V5l-9-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">FedRAMP Ready</h3>
            <p className="text-sm text-slate-600">
              Architected for Federal Risk and Authorization Management Program compliance
            </p>
            <Badge variant="secondary" className="mt-3 bg-blue-50 text-blue-700 border-blue-200">
              In Progress
            </Badge>
          </div>

          {/* Section 508 */}
          <div className="text-center p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Section 508</h3>
            <p className="text-sm text-slate-600">
              Full accessibility compliance for federal employees with disabilities
            </p>
            <Badge variant="secondary" className="mt-3 bg-green-50 text-green-700 border-green-200">
              Compliant
            </Badge>
          </div>

          {/* FISMA */}
          <div className="text-center p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-1.41m14.095-14.095l1.41-1.41M5.106 17.757l1.41-1.41m11.314-11.314l1.41-1.41m-15.75 2.25l1.41 1.41m14.095 14.095l1.41 1.41M12 3v1.5m0 15V21m-4.5-7.5h15" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">FISMA Moderate</h3>
            <p className="text-sm text-slate-600">
              Federal Information Security Management Act moderate baseline controls
            </p>
            <Badge variant="secondary" className="mt-3 bg-purple-50 text-purple-700 border-purple-200">
              Targeted
            </Badge>
          </div>

          {/* Encryption */}
          <div className="text-center p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">AES-256 Encryption</h3>
            <p className="text-sm text-slate-600">
              End-to-end encryption with government-approved cryptographic standards
            </p>
            <Badge variant="secondary" className="mt-3 bg-amber-50 text-amber-700 border-amber-200">
              Implemented
            </Badge>
          </div>

        </div>

        {/* Security Features */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Data Protection */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Data Protection & Privacy</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    <strong>Zero-retention architecture</strong> - Your queries are processed in real-time but never stored
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    <strong>End-to-end encryption</strong> for all data in transit and at rest
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    <strong>No training on user data</strong> - Your conversations remain completely private
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    <strong>Full audit logging</strong> for compliance and security monitoring
                  </span>
                </li>
              </ul>
            </div>

            {/* Professional Assurance */}
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Professional Assurance</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    <strong>98.7% regulatory accuracy</strong> verified by experienced contracting professionals
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    <strong>Confidence scoring</strong> with every answer for professional judgment
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    <strong>Complete source citations</strong> for every regulatory reference
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-slate-600">
                    <strong>24-hour regulatory updates</strong> from Federal Register and FAR Council
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}