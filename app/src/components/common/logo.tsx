import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ 
  className, 
  size = "md", 
  showText = true 
}: LogoProps) {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  const textSizeClasses = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl"
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Minimal Logo Icon */}
      <div className={cn(sizeClasses[size], "relative flex items-center justify-center")}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Simple geometric logo */}
          <rect
            x="4"
            y="6" 
            width="16"
            height="12"
            rx="2"
            fill="currentColor"
            className="text-slate-900"
          />
          <circle
            cx="18"
            cy="8"
            r="2"
            fill="currentColor"
            className="text-blue-600"
          />
          <rect
            x="6"
            y="8"
            width="8"
            height="1"
            fill="white"
          />
          <rect
            x="6"
            y="11"
            width="6"
            height="1"
            fill="white"
          />
          <rect
            x="6"
            y="14"
            width="10"
            height="1"
            fill="white"
          />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className={cn(
          "font-semibold tracking-tight text-slate-900", 
          textSizeClasses[size]
        )}>
          FARchat
        </span>
      )}
    </div>
  )
}

// Export alias for backward compatibility
export { Logo as FARchatLogo }