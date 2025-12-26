# FARchat Public Pages Implementation Guide

> **Target Audience:** Junior Developer
> **Focus:** Infrastructure, routing, and component scaffolding
> **Design Approach:** Mobile-first responsive design

---

## Overview

This document outlines the implementation requirements for FARchat's public-facing (non-authenticated) pages. Your primary focus is building the **page infrastructure** - routes, layouts, and component scaffolding. Content will be provided separately.

---

## Current State Summary

### Existing Public Pages (Working)

| Route | File Location | Status |
|-------|---------------|--------|
| `/` | `src/app/page.tsx` | Complete |
| `/about` | `src/app/about/page.tsx` | Complete |
| `/login` | `src/app/login/page.tsx` | Complete |
| `/alpha` | `src/app/alpha/page.tsx` | Complete |
| `/legal/privacy` | `src/app/legal/privacy/page.tsx` | Skeleton - needs content |
| `/legal/terms` | `src/app/legal/terms/page.tsx` | Skeleton - needs content |

### Pages to Build (Missing)

| Route | Priority | Purpose |
|-------|----------|---------|
| `/features` | HIGH | Dedicated features page |
| `/compliance` | HIGH | Security & compliance info |
| `/demo` | HIGH | Product demo/video page |
| `/contact` | MEDIUM | Contact form |
| `/changelog` | MEDIUM | Product updates log |
| `/security` | MEDIUM | Security documentation |
| `/vpat` | MEDIUM | Accessibility statement (VPAT) |
| `/legal/cookies` | LOW | Cookie policy |

---

## Phase 1: High Priority Pages

### 1.1 Features Page (`/features`)

**Route:** `src/app/features/page.tsx`

**Purpose:** Dedicated page expanding on homepage feature cards with detailed explanations.

**Component Structure:**
```
/features
├── page.tsx
└── components/
    ├── FeatureHero.tsx
    ├── FeatureSection.tsx (reusable)
    └── FeatureComparison.tsx
```

**Requirements:**
- [ ] Create route at `src/app/features/page.tsx`
- [ ] Mobile-first layout with single column on mobile
- [ ] Hero section with page title and subtitle
- [ ] 4-6 feature sections with alternating layout (image left/right)
- [ ] Each section: icon, title, description, optional screenshot
- [ ] CTA section at bottom linking to `/login`
- [ ] Use existing design tokens from `tailwind.config.ts`
- [ ] Add loading skeleton (`loading.tsx`)

**Data Structure (for content):**
```typescript
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  details: string[]; // Bullet points
  screenshot?: string; // Optional image path
}
```

**Navigation Update:**
- Update `src/components/layout/navigation.tsx` to link to `/features` instead of `#features`
- Update footer to link to `/features`

---

### 1.2 Compliance Page (`/compliance`)

**Route:** `src/app/compliance/page.tsx`

**Purpose:** Detail FARchat's security posture and compliance journey. **Important: Do NOT claim certifications we don't have.**

**Component Structure:**
```
/compliance
├── page.tsx
└── components/
    ├── ComplianceHero.tsx
    ├── ComplianceCard.tsx
    ├── ComplianceTimeline.tsx (showing progress)
    └── SecurityFeatures.tsx
```

**Requirements:**
- [ ] Create route at `src/app/compliance/page.tsx`
- [ ] Hero with honest positioning ("Building for federal standards")
- [ ] Grid of compliance cards showing:
  - Status badge (Pursuing / In Progress / Planned)
  - Standard name
  - Description
  - Target timeline (optional)
- [ ] Security features section (encryption, data handling, etc.)
- [ ] Link to `/vpat` for accessibility details
- [ ] Link to `/security` for technical security docs
- [ ] Contact CTA for compliance inquiries

**Compliance Items to Display:**
1. FedRAMP - Status: Pursuing
2. Section 508 - Status: In Progress
3. SOC 2 Type II - Status: Planned
4. ITAR Compliant - Status: Architecture Ready

**CRITICAL:** Use status badges like "Pursuing", "In Progress", "Planned" - NOT "Ready" or "Certified"

---

### 1.3 Demo Page (`/demo`)

**Route:** `src/app/demo/page.tsx`

**Purpose:** Showcase product with video demo and interactive elements.

**Component Structure:**
```
/demo
├── page.tsx
└── components/
    ├── DemoHero.tsx
    ├── VideoPlayer.tsx
    ├── DemoFeatures.tsx
    └── TryItCTA.tsx
```

**Requirements:**
- [ ] Create route at `src/app/demo/page.tsx`
- [ ] Embedded video player (YouTube/Vimeo embed or self-hosted)
- [ ] Video placeholder component until video is ready
- [ ] Feature highlights below video
- [ ] Interactive demo section (optional - could link to `/chat` with sample query)
- [ ] Strong CTA to sign up
- [ ] Mobile: Video should be full-width, 16:9 aspect ratio

**Video Placeholder:**
```tsx
// Until video is ready, show placeholder
<div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
  <span className="text-slate-400">Demo video coming soon</span>
</div>
```

---

## Phase 2: Medium Priority Pages

### 2.1 Contact Page (`/contact`)

**Route:** `src/app/contact/page.tsx`

**Purpose:** Contact form and support information.

**Component Structure:**
```
/contact
├── page.tsx
└── components/
    ├── ContactForm.tsx
    ├── ContactInfo.tsx
    └── FAQ.tsx (reuse from landing)
```

**Requirements:**
- [ ] Create route at `src/app/contact/page.tsx`
- [ ] Contact form with fields:
  - Name (required)
  - Email (required)
  - Company (optional)
  - Subject dropdown (General, Sales, Support, Security)
  - Message (required, textarea)
- [ ] Form validation using existing form patterns
- [ ] Success/error states
- [ ] Alternative contact methods (email addresses)
- [ ] Optional: Embed FAQ accordion from landing page

**Form Submission:**
- Create API route at `src/app/api/contact/route.ts`
- Send to configured email or store in database
- Rate limiting recommended

**Emails to Display:**
- General: `hello@farchat.app`
- Support: `support@farchat.app`
- Security: `security@farchat.app`

---

### 2.2 Changelog Page (`/changelog`)

**Route:** `src/app/changelog/page.tsx`

**Purpose:** Product release notes and updates.

**Component Structure:**
```
/changelog
├── page.tsx
└── components/
    ├── ChangelogEntry.tsx
    ├── VersionBadge.tsx
    └── ChangelogFilter.tsx (optional)
```

**Requirements:**
- [ ] Create route at `src/app/changelog/page.tsx`
- [ ] Timeline-style layout
- [ ] Each entry shows:
  - Date
  - Version number (optional)
  - Category badge (Feature, Fix, Improvement)
  - Title
  - Description
- [ ] Most recent at top
- [ ] Mobile: Single column, full-width cards

**Data Structure:**
```typescript
interface ChangelogEntry {
  id: string;
  date: string; // ISO date
  version?: string;
  category: 'feature' | 'fix' | 'improvement' | 'announcement';
  title: string;
  description: string;
  details?: string[]; // Optional bullet points
}
```

**Data Source Options:**
1. Static JSON file in `src/data/changelog.json`
2. MDX files in `src/content/changelog/`
3. Database table (future)

**Recommendation:** Start with JSON file for simplicity.

---

### 2.3 Security Page (`/security`)

**Route:** `src/app/security/page.tsx`

**Purpose:** Technical security documentation and practices.

**Component Structure:**
```
/security
├── page.tsx
└── components/
    ├── SecurityHero.tsx
    ├── SecuritySection.tsx
    └── SecurityContact.tsx
```

**Requirements:**
- [ ] Create route at `src/app/security/page.tsx`
- [ ] Sections covering:
  - Data encryption (at rest, in transit)
  - Authentication & access control
  - Infrastructure security
  - Data handling & retention
  - Incident response
  - Responsible disclosure
- [ ] Link to `/compliance` for compliance status
- [ ] Security contact email
- [ ] Optional: Bug bounty information

---

### 2.4 VPAT Page (`/vpat`)

**Route:** `src/app/vpat/page.tsx`

**Purpose:** Voluntary Product Accessibility Template documentation.

**Component Structure:**
```
/vpat
├── page.tsx
└── components/
    ├── VPATTable.tsx
    ├── AccessibilityStatement.tsx
    └── ContactAccessibility.tsx
```

**Requirements:**
- [ ] Create route at `src/app/vpat/page.tsx`
- [ ] Accessibility commitment statement
- [ ] VPAT conformance table (WCAG 2.1 AA criteria)
- [ ] Current accessibility features list
- [ ] Known limitations (honest disclosure)
- [ ] Feedback mechanism for accessibility issues
- [ ] Download link for PDF version (when available)

**VPAT Table Structure:**
| Criteria | Conformance Level | Remarks |
|----------|-------------------|---------|
| 1.1.1 Non-text Content | Supports | All images have alt text |
| ... | ... | ... |

---

## Phase 3: Low Priority Pages

### 3.1 Cookie Policy Page (`/legal/cookies`)

**Route:** `src/app/legal/cookies/page.tsx`

**Purpose:** Cookie usage disclosure.

**Requirements:**
- [ ] Create route at `src/app/legal/cookies/page.tsx`
- [ ] Use same layout as other legal pages
- [ ] Sections:
  - What cookies we use
  - Why we use them
  - Third-party cookies
  - How to manage cookies
  - Contact for questions
- [ ] Link to privacy policy

---

## Navigation Updates Required

### Header (`src/components/layout/navigation.tsx`)

**Current Links:**
```tsx
// Current anchor links
{ label: "Features", href: "#features" }
{ label: "Compliance", href: "#compliance" }
{ label: "Demo", href: "#demo" }
```

**Update To:**
```tsx
// Page links (keep anchors for homepage scroll behavior)
{ label: "Features", href: "/features" }
{ label: "Compliance", href: "/compliance" }
{ label: "Demo", href: "/demo" }
```

**Implementation Note:** Consider dual behavior:
- On homepage: Scroll to section
- On other pages: Navigate to dedicated page

### Footer (`src/components/layout/footer.tsx` or `src/components/sections/footer.tsx`)

**Updates Required:**
- Add `/changelog` link
- Add `/contact` link
- Add `/security` link
- Add `/vpat` link
- Add `/legal/cookies` link
- Fix any `#pricing` references (should be `#access` or removed)

---

## Shared Components to Create

### 1. PageHeader Component

```tsx
// src/components/shared/PageHeader.tsx
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href: string }[];
}
```

### 2. ContentSection Component

```tsx
// src/components/shared/ContentSection.tsx
interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}
```

### 3. StatusBadge Component

```tsx
// src/components/shared/StatusBadge.tsx
type Status = 'pursuing' | 'in-progress' | 'planned' | 'complete';

interface StatusBadgeProps {
  status: Status;
  label?: string;
}
```

---

## File Structure Summary

After implementation, public pages structure should be:

```
src/app/
├── page.tsx (homepage - exists)
├── about/
│   └── page.tsx (exists)
├── features/
│   ├── page.tsx (NEW)
│   └── loading.tsx (NEW)
├── compliance/
│   ├── page.tsx (NEW)
│   └── loading.tsx (NEW)
├── demo/
│   ├── page.tsx (NEW)
│   └── loading.tsx (NEW)
├── contact/
│   ├── page.tsx (NEW)
│   └── loading.tsx (NEW)
├── changelog/
│   ├── page.tsx (NEW)
│   └── loading.tsx (NEW)
├── security/
│   ├── page.tsx (NEW)
│   └── loading.tsx (NEW)
├── vpat/
│   ├── page.tsx (NEW)
│   └── loading.tsx (NEW)
├── legal/
│   ├── privacy/
│   │   └── page.tsx (exists - needs content)
│   ├── terms/
│   │   └── page.tsx (exists - needs content)
│   └── cookies/
│       └── page.tsx (NEW)
├── login/
│   └── page.tsx (exists)
├── alpha/
│   └── page.tsx (exists)
└── api/
    └── contact/
        └── route.ts (NEW)
```

---

## Technical Requirements

### Mobile-First Approach
- Design for 320px minimum width first
- Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) for larger screens
- Test on mobile viewport before desktop
- Touch-friendly tap targets (minimum 44x44px)

### Performance
- Add `loading.tsx` for each new route
- Use `next/image` for all images
- Lazy load below-fold content
- Keep initial bundle size minimal

### SEO
- Add metadata export to each page:
```tsx
export const metadata: Metadata = {
  title: 'Page Title | FARchat',
  description: 'Page description for SEO',
};
```

### Accessibility
- Semantic HTML elements
- Proper heading hierarchy (h1 > h2 > h3)
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators visible

---

## Testing Checklist

For each new page:
- [ ] Mobile viewport (320px, 375px, 414px)
- [ ] Tablet viewport (768px)
- [ ] Desktop viewport (1024px, 1440px)
- [ ] Dark mode
- [ ] Light mode
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Loading state displays correctly
- [ ] Links work correctly
- [ ] No console errors

---

## Implementation Order

1. **Phase 1 (High Priority)**
   - `/features` page
   - `/compliance` page
   - `/demo` page
   - Navigation updates

2. **Phase 2 (Medium Priority)**
   - `/contact` page + API route
   - `/changelog` page
   - `/security` page
   - `/vpat` page

3. **Phase 3 (Low Priority)**
   - `/legal/cookies` page
   - Update existing legal pages with full content

4. **Phase 4 (Content Integration)**
   - See `PUBLIC_PAGES_CONTENT_GUIDE.md` for content requirements
   - Integrate provided copy and assets

---

## Questions for Review

Before starting implementation:
1. Confirm navigation behavior (page links vs. anchor scrolls)
2. Confirm contact form submission method (email vs. database)
3. Confirm changelog data source preference
4. Confirm video hosting solution for demo page
5. Confirm any additional pages needed

---

*Document Version: 1.0*
*Last Updated: 2025-12-26*
