"use client"

import { 
  SearchIcon,
  DocumentIcon, 
  DatabaseIcon,
  ZapIcon
} from "@/components/common/icons"

export function Features() {
  const features = [
    {
      icon: SearchIcon,
      title: "Regulatory Intelligence",
      description: "Ask complex questions like 'What are procurement integrity requirements for negotiations over $100K?' Get instant answers with exact FAR/DFARS citations and confidence scoring.",
      benefits: ["Eliminate hours of regulatory research", "Exact citations for audit trails", "98.7% accuracy rate"],
      metric: "85% time reduction"
    },
    {
      icon: DocumentIcon,
      title: "Compliance Automation", 
      description: "Generate acquisition strategies, market research plans, and compliance checklists automatically based on your procurement requirements and agency procedures.",
      benefits: ["Pre-action compliance checklists", "Source selection documentation", "J&A template generation"],
      metric: "Zero drafting time"
    },
    {
      icon: DatabaseIcon,
      title: "Always-Current Regulatory Database",
      description: "Our AI monitors Federal Register updates, FAR Council changes, and DFARS modifications. Your answers reflect the most current regulatory text automatically.",
      benefits: ["24-hour Federal Register monitoring", "Automatic interim rule integration", "Version control with effective dates"],
      metric: "100% current"
    },
    {
      icon: ZapIcon,
      title: "Federal Workflow Integration",
      description: "Purpose-built for GS-1102 workflows with contract lifecycle management, acquisition planning support, and real-time collaboration features.",
      benefits: ["Contract lifecycle guidance", "Acquisition planning templates", "Team collaboration tools"],
      metric: "Sub-3s responses"
    }
  ]

  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            AI-Powered Solutions for Federal Acquisition Excellence
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Every feature designed specifically for GS-1102 contracting officers and federal procurement teams.
            Built to accelerate your workflow while ensuring regulatory compliance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200"
            >
              {/* Icon & Metric */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center justify-center w-14 h-14 bg-federal-navy/10 rounded-lg">
                  <feature.icon className="text-federal-navy" size={24} />
                </div>
                <div className="text-xs font-semibold text-federal-navy bg-slate-100 rounded-full px-3 py-1">
                  {feature.metric}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Key Benefits:</h4>
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-slate-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-white rounded-xl border border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Ready to Transform Your Federal Procurement Process?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Join 500+ federal contracting professionals who are already experiencing 
            the future of regulatory intelligence and compliance automation.
          </p>
          <a 
            href="#access"
            className="inline-flex items-center bg-government-blue text-white font-medium px-6 py-3 rounded-lg hover:bg-government-blue/90 transition-colors"
          >
            Secure Alpha Access
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}