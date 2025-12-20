// Brand Constants for FARchat.app

export const BRAND = {
  name: "FARchat",
  tagline: "AI Assistant for Federal Contracting Professionals",
  description: "Navigate federal acquisition regulations with confidence through AI-powered search and automated document generation.",
  domain: "farchat.app",
  email: "hello@farchat.app",
  supportEmail: "support@farchat.app"
} as const

export const COLORS = {
  // Primary government-appropriate color palette
  federalNavy: {
    50: "#f1f2f6",
    100: "#e2e5ed", 
    200: "#c0c8db",
    300: "#9eabc9",
    400: "#5a72a5",
    500: "#1B263B",
    600: "#182235",
    700: "#141c2c",
    800: "#101623",
    900: "#0d111d",
    DEFAULT: "#1B263B"
  },
  professionalBlue: {
    50: "#f3f6f8",
    100: "#e6edf1",
    200: "#c2d6e0", 
    300: "#9dbfcf",
    400: "#5391ad",
    500: "#2E5266",
    600: "#294a5c",
    700: "#233e4d",
    800: "#1c313d",
    900: "#172832",
    DEFAULT: "#2E5266"
  },
  regulationBlue: {
    50: "#e6f0f5",
    100: "#cce1eb",
    200: "#99c3d7",
    300: "#66a5c3", 
    400: "#33879b",
    500: "#003D5B",
    600: "#003752",
    700: "#002e42",
    800: "#002533",
    900: "#001c26",
    DEFAULT: "#003D5B"
  }
} as const

export const TYPOGRAPHY = {
  fonts: {
    sans: ["Inter", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "monospace"]
  },
  sizes: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px  
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
    "6xl": "3.75rem", // 60px
  },
  weights: {
    normal: "400",
    medium: "500", 
    semibold: "600",
    bold: "700"
  }
} as const

export const SPACING = {
  xs: "0.5rem",   // 8px
  sm: "0.75rem",  // 12px
  md: "1rem",     // 16px
  lg: "1.5rem",   // 24px
  xl: "2rem",     // 32px
  "2xl": "3rem",  // 48px
  "3xl": "4rem",  // 64px
  "4xl": "6rem",  // 96px
  "5xl": "8rem",  // 128px
} as const

export const FEATURES = {
  core: [
    {
      id: "intelligent-search",
      title: "Ask Questions in Plain English",
      description: "Query complex FAR and DFARS regulations using natural language. Get contextual answers with precise source citations and confidence scoring.",
      icon: "IntelligentSearchIcon"
    },
    {
      id: "document-generation", 
      title: "Generate Compliance Documents Instantly",
      description: "Create compliance checklists, contract templates, and regulatory summaries tailored to your specific requirements and contract types.",
      icon: "DocumentGenerationIcon"
    },
    {
      id: "federal-repository",
      title: "Always-Current Regulatory Database", 
      description: "Access complete, up-to-date FAR and DFARS documents with quarterly automatic updates, plus upload your organization's specific requirements.",
      icon: "FederalRepositoryIcon"
    },
    {
      id: "professional-interface",
      title: "Professional Workflow Integration",
      description: "Conversational interface designed for federal contracting workflows with session persistence, export capabilities, and team collaboration.",
      icon: "ProfessionalChatIcon"
    }
  ]
} as const

export const BENEFITS = {
  primary: [
    {
      statistic: "80%",
      label: "Reduction in regulatory research time",
      description: "From hours to minutes for complex compliance questions"
    },
    {
      statistic: "95%", 
      label: "Citation accuracy rate",
      description: "Always traceable to source regulations with confidence scoring"
    },
    {
      statistic: "100%",
      label: "Current regulatory database",
      description: "Quarterly updates ensure access to latest FAR/DFARS versions"
    },
    {
      statistic: "24/7",
      label: "Professional support availability", 
      description: "AI assistant never sleeps, always ready for urgent queries"
    }
  ]
} as const

export const TARGET_PERSONAS = [
  {
    id: "contracting-officer",
    title: "GS-1102 Contracting Officers",
    description: "Primary acquisition professionals managing complex federal procurement processes",
    painPoints: [
      "Time-intensive regulatory research",
      "Complex compliance requirements", 
      "Risk of regulatory oversight",
      "Manual document creation"
    ]
  },
  {
    id: "procurement-analyst",
    title: "Procurement Analysts",
    description: "Support staff analyzing contracts and ensuring regulatory compliance",
    painPoints: [
      "Detailed regulation interpretation",
      "Contract clause verification",
      "Documentation requirements",
      "Audit preparation"
    ]
  },
  {
    id: "contract-specialist",
    title: "Contract Specialists", 
    description: "Specialists handling specific contract types and specialized procurement",
    painPoints: [
      "Specialized regulation knowledge",
      "Industry-specific requirements",
      "Complex contract structures",
      "Multi-agency coordination"
    ]
  }
] as const

export const TRUST_INDICATORS = [
  {
    label: "Government-Grade Security",
    description: "Built with federal security standards in mind"
  },
  {
    label: "WCAG 2.1 AA Compliant", 
    description: "Accessible design meeting government requirements"
  },
  {
    label: "SOC 2 Ready",
    description: "Security controls designed for government use"
  },
  {
    label: "Privacy by Design",
    description: "No data sharing, complete privacy protection"
  }
] as const

export const ROUTES = {
  home: "/",
  features: "/features",
  pricing: "/pricing", 
  about: "/about",
  contact: "/contact",
  demo: "/demo",
  login: "/login",
  signup: "/signup",
  alpha: "/alpha"
} as const

export const SOCIAL_LINKS = {
  twitter: "https://twitter.com/farchatapp",
  linkedin: "https://linkedin.com/company/farchatapp", 
  github: "https://github.com/farchatapp"
} as const

export const LEGAL_LINKS = {
  privacy: "/privacy",
  terms: "/terms",
  security: "/security"
} as const