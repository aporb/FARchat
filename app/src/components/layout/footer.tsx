"use client"

import Link from "next/link"
import { Logo } from "@/components/common/logo"
import { SecurityShieldIcon } from "@/components/common/icons"
import { BRAND, ROUTES, SOCIAL_LINKS, LEGAL_LINKS, TRUST_INDICATORS } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href={ROUTES.home} className="inline-block mb-4">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              {BRAND.description}
            </p>
            <p className="text-xs text-gray-500">
              Built by federal contracting professionals, for federal contracting professionals.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={ROUTES.features} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href={ROUTES.pricing} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href={ROUTES.demo} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link href={ROUTES.alpha} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Alpha Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href={ROUTES.about} className="text-gray-600 hover:text-federal-navy transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href={ROUTES.alpha} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Alpha Program
                </Link>
              </li>
              <li>
                <a href={ROUTES.contact} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${BRAND.supportEmail}`} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Email Support
                </a>
              </li>
              <li>
                <Link href={LEGAL_LINKS.privacy} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={LEGAL_LINKS.terms} className="text-gray-600 hover:text-federal-navy transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Trust Indicators Section */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
              <SecurityShieldIcon className="w-4 h-4 mr-2" />
              Security & Compliance
            </h4>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST_INDICATORS.map((indicator, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-white border border-slate-200">
                  <div className="text-xs font-medium text-gray-900 mb-1">
                    {indicator.label}
                  </div>
                  <div className="text-xs text-gray-600">
                    {indicator.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <Link href={LEGAL_LINKS.privacy} className="text-gray-500 hover:text-federal-navy transition-colors">
                Privacy Policy
              </Link>
              <Link href={LEGAL_LINKS.terms} className="text-gray-500 hover:text-federal-navy transition-colors">
                Terms of Service
              </Link>
              <Link href={LEGAL_LINKS.security} className="text-gray-500 hover:text-federal-navy transition-colors">
                Security
              </Link>
            </div>

          </div>

          {/* Social Links & Contact */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            {/* Contact Info */}
            <div className="text-sm text-gray-500">
              Questions? Email us at{" "}
              <a 
                href={`mailto:${BRAND.email}`} 
                className="text-federal-navy hover:underline"
              >
                {BRAND.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-federal-navy transition-colors"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-federal-navy transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-federal-navy transition-colors"
                aria-label="View our GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}