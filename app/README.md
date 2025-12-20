# FARchat Landing Page

A professional, government-compliant landing page for FARchat - an AI-powered assistant for federal contracting professionals.

## 🏛️ Government Compliance

This project adheres to federal accessibility standards and security requirements:

- **Section 508 Compliance**: Full accessibility support with ARIA labels and keyboard navigation
- **Security Headers**: CSP, HSTS, and other security headers configured
- **Manual Deployment Only**: No automated CI/CD for enhanced security control
- **Clean Architecture**: Professional, maintainable codebase

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS 4 with custom government color palette
- **UI Components**: shadcn/ui with professional theming
- **Icons**: Custom SVG icons with Lucide React
- **Development**: ESLint with accessibility rules

## 🏛️ Target Audience

- GS-1102 Contracting Officers
- Federal Procurement Analysts  
- Contract Specialists
- Government contracting professionals

## 📱 Features

- ✅ Responsive design optimized for government professionals
- ✅ Professional branding with government-appropriate colors (no gradients)
- ✅ Alpha program signup with validation
- ✅ Feature showcase highlighting FAR/DFARS capabilities
- ✅ Trust indicators and security compliance badges
- ✅ Professional navigation with accessibility support
- ✅ Section 508 compliant (WCAG 2.1 AA)
- ✅ Government security headers and CSP

## 🚦 Manual Deployment

### Local Development & Testing

```bash
# Build and test locally
npm run build
npm run start

# Or use the deployment script for local testing
./scripts/deploy.sh local
```

### Vercel Deployment (Manual Only)

```bash
# 1. Build the application
npm run build

# 2. Deploy manually to Vercel
vercel --prod
```

**Note**: No automated deployments or GitHub workflows are configured. All deployments must be done manually.

### Custom Domain (Manual Setup)

1. **Build and verify locally first**
2. **Deploy manually to Vercel using CLI**
3. **Configure domain in Vercel dashboard manually**
4. **Update DNS records as instructed by Vercel**

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Required for production
NEXT_PUBLIC_APP_URL=https://farchat.app
NEXT_PUBLIC_ALPHA_SIGNUP_ENABLED=true

# Optional analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
VERCEL_ANALYTICS_ID=your_vercel_analytics_id
```

### Vercel Configuration

The `vercel.json` file includes:
- Security headers for government compliance
- Redirect rules for common URLs
- Build optimization settings
- Static asset caching strategies
- **NO automated deployment triggers**

## 📊 Performance

- **Build Size**: ~133 KB total JavaScript
- **First Load**: Optimized for fast initial page loads
- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: Next.js automatic image optimization
- **Font Optimization**: Self-hosted fonts with display swap

## 🔒 Security Features

- Content Security Policy headers
- XSS protection
- Clickjacking protection via X-Frame-Options
- HTTPS enforcement
- Referrer policy configuration
- Input validation on all forms

## 🎯 SEO Optimization

- Semantic HTML structure
- Meta tags optimized for government contracting keywords
- Open Graph and Twitter Card support
- Structured data for better search visibility
- Government-specific keywords and descriptions

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── sections/       # Page sections (Hero, Features, etc.)
│   └── common/         # Shared components (Logo, Icons)
├── lib/
│   ├── utils.ts        # Utility functions
│   └── constants.ts    # App constants and configuration
└── styles/
    └── globals.css     # Global styles and CSS variables
```

## 🛠️ Development

### Code Standards

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Semantic commit messages
- Component-based architecture

### Adding New Components

```bash
# Add new shadcn/ui components
npx shadcn@latest add [component-name]

# Create custom components in appropriate directories
src/components/sections/    # Page sections
src/components/common/      # Reusable components
src/components/layout/      # Layout components
```

### Customizing Design

1. **Colors**: Update `tailwind.config.ts` and CSS variables
2. **Typography**: Modify font imports in `layout.tsx`
3. **Components**: Extend shadcn/ui components or create custom ones
4. **Icons**: Add new SVG icons to `src/components/common/icons.tsx`

## 📈 Analytics & Monitoring

- Vercel Analytics for performance monitoring (manual setup)
- Google Analytics for user behavior tracking (manual setup)
- Core Web Vitals monitoring
- Error tracking and reporting

## 🔄 Manual Deployment Process

**No automated deployments are configured.** All deployments require manual intervention:

1. **Build Process**: Run `npm run build` locally
2. **Testing**: Test with `npm run start` 
3. **Manual Deploy**: Use `vercel --prod` for production deployment
4. **Verification**: Manually verify deployment success

## 📞 Support

For technical issues or deployment questions:
- Email: dev@farchat.app
- Documentation: [Internal docs]
- Status Page: [Coming soon]

## 📄 License

Proprietary - FARchat Team