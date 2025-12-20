"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/common/logo"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo & Alpha Badge */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo size="md" />
            <div className="flex items-center space-x-2">
              <Badge 
                variant="secondary" 
                className="text-xs bg-blue-50 text-blue-700 border-blue-200 font-medium"
              >
                Alpha
              </Badge>
            </div>
          </Link>

          {/* Trust Badges - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-3">
            <Badge 
              variant="outline" 
              className="text-xs text-slate-600 border-slate-300 bg-slate-50"
            >
              🛡️ FedRAMP Ready
            </Badge>
            <Badge 
              variant="outline" 
              className="text-xs text-slate-600 border-slate-300 bg-slate-50"
            >
              ♿ Section 508
            </Badge>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="#features" 
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Features
            </Link>
            <Link 
              href="#compliance" 
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Compliance
            </Link>
            <Link 
              href="#demo" 
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Demo
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="hidden sm:inline-flex text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              asChild
            >
              <Link href="#demo">
                View Demo
              </Link>
            </Button>
            <Button 
              size="sm"
              className="bg-government-blue hover:bg-government-blue/90 text-white font-medium px-4"
              asChild
            >
              <Link href="#access">
                Request Access
              </Link>
            </Button>
          </div>

        </div>
      </div>
    </nav>
  )
}