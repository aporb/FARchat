# FARchat Web Application

Next.js web application for FARchat - an AI-powered federal acquisition regulation research assistant.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui with glassmorphic design
- **Authentication**: Supabase Auth (Google OAuth, Magic Link)
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-required routes
│   ├── api/               # API routes
│   │   ├── chat/          # Chat API endpoint
│   │   └── contact/       # Contact form API
│   ├── about/             # About page
│   ├── changelog/         # Product changelog
│   ├── chat/              # Chat interface
│   ├── compliance/        # Security & compliance info
│   ├── contact/           # Contact form
│   ├── demo/              # Product demo
│   ├── features/          # Features page
│   ├── legal/             # Legal pages (privacy, terms, cookies)
│   ├── login/             # Authentication
│   ├── search/            # Search interface
│   ├── security/          # Security documentation
│   └── vpat/              # Accessibility statement
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Navigation, headers
│   ├── sections/          # Page sections (hero, features, footer)
│   └── common/            # Shared components (logo, icons)
└── lib/
    ├── supabase/          # Supabase client configuration
    └── utils.ts           # Utility functions
```

## Pages

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/about` | About FARchat |
| `/features` | Feature details |
| `/compliance` | Security & compliance status |
| `/demo` | Product demo |
| `/contact` | Contact form |
| `/changelog` | Product updates |
| `/security` | Security practices |
| `/vpat` | Accessibility statement |
| `/legal/privacy` | Privacy policy |
| `/legal/terms` | Terms of service |
| `/legal/cookies` | Cookie policy |

### Authenticated Pages
| Route | Description |
|-------|-------------|
| `/chat` | AI chat interface |
| `/search` | Regulation search |

## Design System

### Colors
- **Federal Navy**: `#1B263B` - Primary brand color
- **Blue**: `#3b82f6` - Accent and interactive elements
- **Amber**: `#f59e0b` - Warnings and "pursuing" status
- **Green**: `#22c55e` - Success and "complete" status

### Components
- Glassmorphic dropdowns with backdrop blur
- Mobile-first responsive design
- Dark mode support throughout
- Accessible focus indicators

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# App URL
NEXT_PUBLIC_APP_URL=https://farchat.app

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

## Compliance

- **Section 508**: Building for WCAG 2.1 AA compliance
- **FedRAMP**: Pursuing authorization
- **Security**: AES-256 encryption, TLS 1.3, US data centers

## Deployment

```bash
# Build and test locally
npm run build
npm run start

# Deploy to Vercel
vercel --prod
```

Manual deployment only - no automated CI/CD.

## Development

### Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

### Code Standards
- TypeScript strict mode
- ESLint for code quality
- Semantic commit messages
- Component-based architecture

## License

Proprietary - FARchat Team
