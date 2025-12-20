// FARchat Design System - Professional Government UI

export const DESIGN_SYSTEM = {
  // Typography Scale (Major Third - 1.25 ratio)
  typography: {
    xs: "0.75rem",     // 12px
    sm: "0.875rem",    // 14px  
    base: "1rem",      // 16px - body text
    lg: "1.125rem",    // 18px - large body
    xl: "1.25rem",     // 20px - small headings
    "2xl": "1.5rem",   // 24px - headings
    "3xl": "1.875rem", // 30px - large headings
    "4xl": "2.25rem",  // 36px - hero headings
    "5xl": "3rem",     // 48px - display
  },

  // Spacing Scale (4px base unit)
  spacing: {
    xs: "0.25rem",   // 4px
    sm: "0.5rem",    // 8px
    md: "0.75rem",   // 12px
    lg: "1rem",      // 16px
    xl: "1.5rem",    // 24px
    "2xl": "2rem",   // 32px
    "3xl": "3rem",   // 48px
    "4xl": "4rem",   // 64px
    "5xl": "6rem",   // 96px
  },

  // Icon Sizes
  icons: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  },

  // Logo Sizes
  logo: {
    sm: 20,  // Footer, small contexts
    md: 24,  // Navigation
    lg: 32,  // Hero, large contexts
  },

  // Component Sizes
  components: {
    nav: {
      height: "4rem",    // 64px
      logoHeight: "1.5rem", // 24px
    },
    button: {
      sm: { padding: "0.5rem 1rem", fontSize: "0.875rem" },
      md: { padding: "0.75rem 1.5rem", fontSize: "1rem" },
      lg: { padding: "1rem 2rem", fontSize: "1.125rem" },
    },
    card: {
      padding: "1.5rem",
      borderRadius: "0.5rem",
    },
    input: {
      height: "2.75rem", // 44px - touch friendly
      padding: "0.75rem 1rem",
    }
  },

  // Professional Color Palette
  colors: {
    // Primary - Use sparingly for CTAs and key elements
    primary: {
      50: "#f8fafc",
      100: "#f1f5f9", 
      500: "#1e293b", // Federal Navy
      600: "#0f172a",
      900: "#020617",
    },

    // Neutral - Primary text and UI colors
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4", 
      400: "#a3a3a3",
      500: "#737373", // Muted text
      600: "#525252", // Secondary text
      700: "#404040", // Primary text
      800: "#262626",
      900: "#171717", // Headings
    },

    // Accent - Professional blue for links and highlights
    accent: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb", // Links
      700: "#1d4ed8",
    },

    // Success - For confirmations and positive states
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a", // Success elements
    },

    // Warning - For important notices
    warning: {
      50: "#fffbeb", 
      100: "#fef3c7",
      500: "#f59e0b",
      600: "#d97706",
    }
  },

  // Professional Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },

  // Border Radius
  radius: {
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px  
    lg: "0.5rem",   // 8px
    xl: "0.75rem",  // 12px
  }
} as const

export const CONTENT = {
  brand: {
    name: "FARchat",
    tagline: "AI Assistant for Federal Contracting Professionals",
    description: "Navigate federal acquisition regulations with confidence through AI-powered search and automated document generation.",
  },

  hero: {
    headline: "AI-Powered Intelligence for Federal Contracting",
    subheadline: "Reduce regulatory research time by 80% with instant, accurate answers to complex FAR/DFARS questions. Built specifically for government contracting professionals.",
    primaryCTA: "Request Alpha Access",
    secondaryCTA: "Watch Demo",
  },

  features: [
    {
      title: "Intelligent Regulatory Search", 
      description: "Ask questions in plain English and get precise answers with source citations.",
      benefit: "80% faster research"
    },
    {
      title: "Automated Document Generation",
      description: "Create compliance checklists and contract templates instantly.",
      benefit: "Zero manual drafting"
    },
    {
      title: "Always-Current Database",
      description: "Access up-to-date FAR/DFARS with quarterly automatic updates.",
      benefit: "100% current regulations"
    },
    {
      title: "Professional Workflow",
      description: "Seamless integration with government contracting processes.",
      benefit: "Native workflow support"
    }
  ]
} as const