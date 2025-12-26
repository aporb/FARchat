import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Professional government color palette
        "federal-navy": {
          DEFAULT: "#1B263B",
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
        },
        // Accent colors for CTAs and status
        "accent-blue": {
            DEFAULT: "hsl(var(--accent-blue))",
            foreground: "hsl(0 0% 100%)",
        },
        "accent-amber": {
            DEFAULT: "hsl(var(--accent-amber))",
            foreground: "hsl(0 0% 100%)",
        },
        "professional-blue": {
          DEFAULT: "#2E5266",
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
        },
        "regulation-blue": {
          DEFAULT: "#003D5B",
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
        },
        // Alias for easier use
        "government-blue": "#1B263B",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;