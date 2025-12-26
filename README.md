# FARchat

AI-powered federal acquisition regulation research assistant for government contracting professionals.

## Overview

FARchat helps federal acquisition professionals navigate FAR, DFARS, and 25+ agency supplements through natural language search and AI-powered insights. Built with federal security and accessibility standards in mind.

## Project Structure

```
FARchat/
├── app/                    # Next.js web application
│   ├── src/
│   │   ├── app/           # App Router pages and API routes
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities and configuration
│   └── README.md          # App-specific documentation
├── docs/                   # Project documentation
└── README.md              # This file
```

## Quick Start

```bash
# Navigate to app directory
cd app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## Features

- **Natural Language Search** - Ask questions about FAR/DFARS in plain English
- **25+ Regulation Libraries** - FAR, DFARS, VAAR, GSAM, NMCARS, and more
- **AI-Powered Insights** - Context-aware responses with precise citations
- **Nightly Updates** - Synced with Federal Register and Acquisition.gov
- **Federal-Grade Security** - Pursuing FedRAMP, building for Section 508

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)

## Documentation

- [App Documentation](./app/README.md) - Web application details
- [Public Pages Guide](./docs/20251226_PUBLIC_PAGES_IMPLEMENTATION_GUIDE.md) - Page implementation
- [Content Guide](./docs/20251226_PUBLIC_PAGES_CONTENT_GUIDE.md) - Brand and content standards

## License

Proprietary - FARchat Team
