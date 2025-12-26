# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FARchat is an AI-powered federal acquisition regulation research assistant for government contracting professionals. It helps navigate FAR, DFARS, and 25+ agency supplements through natural language search and AI-powered insights.

## Commands

All commands run from the `app/` directory:

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Run production server

# Code Quality
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run type-check   # TypeScript type checking
npm run test         # Runs lint + type-check
npm run clean        # Remove .next and out directories

# Deployment (manual only - no CI/CD)
npm run deploy:local # Local deployment script
npm run deploy:build # Build for deployment
vercel --prod        # Deploy to Vercel

# shadcn/ui components
npx shadcn@latest add [component-name]
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (uses `@import "tailwindcss"` not `@tailwind` directives)
- **UI Components**: shadcn/ui (new-york style, RSC enabled)
- **Authentication**: Supabase Auth (Google OAuth, Magic Link)
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic SDK, OpenAI SDK

### Directory Structure
```
FARchat/
├── app/                      # Next.js application
│   └── src/
│       ├── app/              # App Router (pages, layouts, API routes)
│       │   ├── api/chat/     # Chat API endpoint
│       │   └── api/contact/  # Contact form API
│       ├── components/
│       │   ├── ui/           # shadcn/ui primitives
│       │   ├── layout/       # Navigation, headers
│       │   ├── sections/     # Page sections (hero, features, footer)
│       │   └── common/       # Shared components (logo, icons)
│       └── lib/
│           ├── supabase.ts   # Client-side Supabase
│           └── supabase-server.ts  # Server-side Supabase
├── supabase/                 # Database schema and migrations
├── scripts/                  # Python ingestion scripts, asset generation
├── docs/                     # Project documentation
└── content/                  # Regulation content
```

### Path Aliases
- `@/components` → `src/components`
- `@/lib/utils` → `src/lib/utils`
- `@/components/ui` → `src/components/ui`

## Design System

### Brand Colors
- **Federal Navy**: `#1B263B` - Primary brand color
- **Accent Blue**: `#3b82f6` - Interactive elements
- **Accent Amber**: `#f59e0b` - Warnings, "pursuing" status
- **Accent Green**: `#22c55e` - Success, "complete" status

### Component Patterns
- Glassmorphic dropdowns with backdrop blur
- Dark mode support throughout (class-based)
- Mobile-first responsive design
- Uses CSS variables via `hsl(var(--variable))` pattern

## Brand Voice Guidelines

- **Professional** - serving federal contractors
- **Clear** - no unexplained jargon
- **Honest** - don't overclaim capabilities
- Use "Research" not "search", "Regulations" not "rules"
- Use "Pursuing" for incomplete certifications, never "Ready" or "Certified"
- Avoid superlatives like "Revolutionary", "Best", "Leading"

## Key Files

- `app/tailwind.config.ts` - Custom color palette, theme extensions
- `app/components.json` - shadcn/ui configuration
- `app/src/app/globals.css` - Global styles, CSS variables
- `supabase/schema.sql` - Database schema
