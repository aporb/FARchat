import { FARchatLogo } from "@/components/common/logo"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="w-full border-t bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-4xl px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <FARchatLogo size="sm" />
            <span className="text-lg font-semibold text-slate-900">FARchat</span>
          </div>
          
          <p className="text-center text-sm text-slate-600 max-w-md">
            AI-powered intelligence for federal contracting professionals. 
            Navigate FAR and DFARS with confidence.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button 
              type="button"
              className="text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-federal-navy focus:ring-offset-2 rounded-sm px-2 py-1"
              aria-label="Privacy policy information"
            >
              Privacy
            </button>
            <button 
              type="button"
              className="text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-federal-navy focus:ring-offset-2 rounded-sm px-2 py-1"
              aria-label="Terms of service information"
            >
              Terms
            </button>
            <button 
              type="button"
              className="text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-federal-navy focus:ring-offset-2 rounded-sm px-2 py-1"
              aria-label="Security information"
            >
              Security
            </button>
            <button 
              type="button"
              className="text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-federal-navy focus:ring-offset-2 rounded-sm px-2 py-1"
              aria-label="Contact information"
            >
              Contact
            </button>
          </div>
          
          <Separator className="w-full max-w-xs" />
          
          <div className="text-center text-xs text-slate-500">
            <p>&copy; {currentYear} FARchat. All rights reserved.</p>
            <p className="mt-1">🇺🇸 Built for federal contracting professionals</p>
          </div>
        </div>
      </div>
    </footer>
  )
}