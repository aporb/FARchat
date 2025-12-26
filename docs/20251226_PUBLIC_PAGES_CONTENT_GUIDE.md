# FARchat Public Pages Content & Design Guide

> **Target Audience:** Junior Developer (content integration phase)
> **Focus:** Copy, imagery, styling, and brand consistency
> **Design Approach:** Mobile-first, clean, professional, federal-focused

---

## Brand Voice & Tone

### Voice Characteristics
- **Professional** - We serve federal contractors and government professionals
- **Clear** - No jargon without explanation; accessible to newcomers
- **Confident but honest** - State capabilities truthfully; don't overclaim
- **Helpful** - Focus on solving real problems
- **Modern** - Contemporary feel while respecting the serious nature of compliance work

### Tone Guidelines
- Use active voice
- Be concise - federal professionals are busy
- Avoid marketing fluff and buzzwords
- Be specific about capabilities
- Acknowledge limitations honestly

### Words to Use
- "Research" not "search"
- "Regulations" not "rules"
- "Professionals" not "users"
- "Pursuing" or "Building toward" not "Ready" or "Certified" (for incomplete certifications)
- "Intelligence" and "Insights" for AI features

### Words to Avoid
- "Revolutionary" or "Disruptive"
- "Best" or "Leading" (unless verifiable)
- "Guaranteed"
- Unsubstantiated superlatives

---

## Color System

### Primary Colors (from existing design)
```css
/* Brand Blues */
--primary: hsl(217, 91%, 60%);        /* #3b82f6 - Primary blue */
--primary-hover: hsl(217, 91%, 50%);   /* Darker for hover */

/* Backgrounds */
--background-dark: hsl(222, 47%, 11%); /* #0f172a - Dark background */
--background-card: hsl(217, 33%, 17%); /* #1e293b - Card background */

/* Text */
--foreground: hsl(210, 40%, 98%);      /* #f8fafc - Primary text */
--muted: hsl(215, 20%, 65%);           /* #94a3b8 - Secondary text */

/* Accents */
--accent-green: hsl(142, 76%, 36%);    /* #22c55e - Success/positive */
--accent-amber: hsl(38, 92%, 50%);     /* #f59e0b - Warning/attention */
```

### Status Badge Colors
```css
/* Compliance Status */
--status-pursuing: hsl(38, 92%, 50%);   /* Amber - Pursuing */
--status-progress: hsl(217, 91%, 60%);  /* Blue - In Progress */
--status-planned: hsl(215, 20%, 65%);   /* Gray - Planned */
--status-complete: hsl(142, 76%, 36%);  /* Green - Complete */
```

---

## Typography

### Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Scale (Mobile-First)
```css
/* Headings */
h1: 2rem (32px) → md:2.5rem (40px) → lg:3rem (48px)
h2: 1.5rem (24px) → md:1.875rem (30px) → lg:2.25rem (36px)
h3: 1.25rem (20px) → md:1.5rem (24px)
h4: 1.125rem (18px) → md:1.25rem (20px)

/* Body */
body: 1rem (16px)
small: 0.875rem (14px)
caption: 0.75rem (12px)
```

### Font Weights
- Headings: 600 (semibold) or 700 (bold)
- Body: 400 (regular)
- Emphasis: 500 (medium)
- Buttons: 500 (medium)

---

## Page-by-Page Content Requirements

### Features Page (`/features`)

**Hero Section:**
```
Title: "Powerful Tools for Federal Acquisition Research"
Subtitle: "Everything you need to navigate FAR, DFARS, and 25+ agency supplements in one intelligent platform."
```

**Feature Sections (6 total):**

1. **Regulatory Graph**
   ```
   Title: "The Regulatory Graph"
   Description: "FARchat doesn't just search text. Our semantic intelligence engine maps relationships between FAR, DFARS, and 23 agency supplements to understand the hierarchy of compliance."

   Bullet Points:
   - Cross-reference regulations automatically
   - Understand supplement relationships
   - Navigate complex compliance chains
   ```

2. **Compliance Autopilot**
   ```
   Title: "Compliance Autopilot"
   Description: "Generate J&As, Acquisition Plans, and Market Research Reports with citations automatically pulled from the correct agency-specific regulations."

   Bullet Points:
   - Auto-cite relevant regulations
   - Format documents to agency standards
   - Reduce research time by 85%
   ```

3. **Live Updates**
   ```
   Title: "Always Current"
   Description: "Synced nightly with the Federal Register and Acquisition.gov. Never worry about outdated information affecting your compliance decisions."

   Bullet Points:
   - Nightly synchronization
   - Change tracking and alerts
   - Historical version access
   ```

4. **Natural Language Search**
   ```
   Title: "Ask Questions, Get Answers"
   Description: "No more keyword hunting. Ask questions in plain English and get relevant regulatory guidance with precise citations."

   Bullet Points:
   - Conversational interface
   - Context-aware responses
   - Source citations included
   ```

5. **Multi-Agency Coverage**
   ```
   Title: "25+ Regulation Libraries"
   Description: "From FAR to agency-specific supplements including DFARS, VAAR, GSAM, NMCARS, AFFARS, and more - all in one place."

   Bullet Points:
   - Comprehensive coverage
   - Unified search across all
   - Agency-specific context
   ```

6. **Federal-Grade Security**
   ```
   Title: "Built for Federal Standards"
   Description: "Designed with federal security requirements in mind. We're actively pursuing FedRAMP authorization and building for Section 508 accessibility."

   Bullet Points:
   - Pursuing FedRAMP authorization
   - Building for Section 508 compliance
   - Enterprise-grade encryption
   ```

**CTA Section:**
```
Title: "Ready to streamline your FAR research?"
Subtitle: "Join federal acquisition professionals who are saving hours every week."
Button: "Start Free During Alpha"
Secondary: "Watch Demo"
```

---

### Compliance Page (`/compliance`)

**Hero Section:**
```
Title: "Building for Federal Standards"
Subtitle: "FARchat is designed to meet the rigorous security and accessibility requirements expected by federal agencies. Here's our compliance journey."
```

**Compliance Cards:**

1. **FedRAMP**
   ```
   Status: Pursuing
   Title: "FedRAMP Authorization"
   Description: "We're actively working toward FedRAMP authorization to meet federal cloud security requirements. Our infrastructure is designed with FedRAMP controls in mind from day one."
   ```

2. **Section 508**
   ```
   Status: In Progress
   Title: "Section 508 Accessibility"
   Description: "Accessibility is a priority, not an afterthought. We're implementing WCAG 2.1 AA standards throughout the application to ensure all users can access FARchat effectively."
   ```

3. **SOC 2 Type II**
   ```
   Status: Planned
   Title: "SOC 2 Type II Certification"
   Description: "Enterprise security certification is on our roadmap. We're building with SOC 2 controls in mind to demonstrate our commitment to data security."
   ```

4. **ITAR**
   ```
   Status: Architecture Ready
   Title: "ITAR-Ready Architecture"
   Description: "Our system architecture supports ITAR compliance requirements for customers handling export-controlled information."
   ```

**Security Practices Section:**
```
Title: "Our Security Practices"

- Data Encryption: All data encrypted at rest (AES-256) and in transit (TLS 1.3)
- Access Control: Role-based access with multi-factor authentication
- Infrastructure: Hosted on SOC 2 certified cloud infrastructure
- Monitoring: 24/7 security monitoring and logging
- Data Residency: US-based data centers only
- Incident Response: Documented incident response procedures
```

**CTA Section:**
```
Title: "Questions about our security?"
Button: "Contact Our Security Team"
Email: security@farchat.app
```

---

### Demo Page (`/demo`)

**Hero Section:**
```
Title: "See FARchat in Action"
Subtitle: "Watch how federal acquisition professionals use FARchat to cut research time from hours to seconds."
```

**Video Section:**
```
Placeholder Text (until video ready): "Demo video coming soon. Sign up for early access to see FARchat in action."
```

**Feature Highlights (below video):**
```
1. "Ask Complex Questions"
   Example: "What are the TAA compliance requirements for a drone procurement under DFARS?"

2. "Get Cited Answers"
   Example showing response with DFARS 252.225-7001 citation

3. "Cross-Reference Automatically"
   Example showing related NDAA section reference
```

**CTA Section:**
```
Title: "Ready to try it yourself?"
Subtitle: "FARchat is free during alpha. Create an account and start researching."
Button: "Create Free Account"
```

---

### Contact Page (`/contact`)

**Hero Section:**
```
Title: "Get in Touch"
Subtitle: "Have questions? We'd love to hear from you."
```

**Contact Form Fields:**
```
- Name (required): "Your name"
- Email (required): "your.email@agency.gov"
- Company (optional): "Organization name"
- Subject (dropdown):
  - General Inquiry
  - Sales & Enterprise
  - Technical Support
  - Security Questions
  - Feedback & Suggestions
- Message (required): "How can we help?"
```

**Alternative Contact:**
```
Title: "Other ways to reach us"

General Inquiries: hello@farchat.app
Technical Support: support@farchat.app
Security Concerns: security@farchat.app
```

**Response Time:**
```
"We typically respond within 1 business day."
```

---

### Changelog Page (`/changelog`)

**Hero Section:**
```
Title: "What's New"
Subtitle: "The latest updates, improvements, and fixes to FARchat."
```

**Entry Format:**
```
[Date] - [Version Badge (optional)]
[Category Badge: Feature | Improvement | Fix | Announcement]
[Title]
[Description paragraph]
[Optional bullet list of details]
```

**Initial Entries (examples to populate):**

```
December 2025 - Alpha Launch
[Announcement]
"FARchat Alpha Now Available"
"We're excited to announce the public alpha of FARchat. Create a free account to start exploring federal acquisition regulations with AI-powered intelligence."

December 2025
[Feature]
"Natural Language Search"
"Ask questions about FAR, DFARS, and agency supplements in plain English. FARchat understands context and provides relevant regulatory guidance."

December 2025
[Feature]
"25+ Regulation Libraries"
"Search across FAR, DFARS, VAAR, GSAM, NMCARS, and more - all from a single interface."
```

---

### Security Page (`/security`)

**Hero Section:**
```
Title: "Security at FARchat"
Subtitle: "We take the security of your data seriously. Here's how we protect it."
```

**Sections:**

1. **Data Protection**
   ```
   Title: "Data Protection"
   Content:
   - All data encrypted at rest using AES-256 encryption
   - All data encrypted in transit using TLS 1.3
   - Database backups encrypted and stored securely
   - Regular security audits and penetration testing
   ```

2. **Access Control**
   ```
   Title: "Access Control"
   Content:
   - Multi-factor authentication available
   - Role-based access control (RBAC)
   - Session management with automatic timeout
   - Audit logging of all access
   ```

3. **Infrastructure**
   ```
   Title: "Infrastructure Security"
   Content:
   - Hosted on enterprise-grade cloud infrastructure
   - US-based data centers only
   - Network isolation and firewalls
   - DDoS protection
   - Regular vulnerability scanning
   ```

4. **Responsible Disclosure**
   ```
   Title: "Security Vulnerability Reporting"
   Content: "If you discover a security vulnerability, please report it to security@farchat.app. We appreciate responsible disclosure and will acknowledge your report within 48 hours."
   ```

---

### VPAT Page (`/vpat`)

**Hero Section:**
```
Title: "Accessibility Statement"
Subtitle: "FARchat is committed to digital accessibility for all users."
```

**Commitment Statement:**
```
"We are actively working to increase the accessibility and usability of FARchat in alignment with Section 508 of the Rehabilitation Act and Web Content Accessibility Guidelines (WCAG) 2.1 Level AA."
```

**Current Features:**
```
Title: "Accessibility Features"
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios meeting WCAG AA
- Focus indicators for interactive elements
- Alt text for images
- Responsive design for all device sizes
```

**Known Limitations:**
```
Title: "Known Limitations"
"We're continuously improving accessibility. Current known limitations:
- Some complex data visualizations may not be fully accessible to screen readers
- We're working on improving form error announcements
- Some third-party components are being updated for better accessibility"
```

**Feedback:**
```
Title: "Accessibility Feedback"
"We welcome your feedback on the accessibility of FARchat. Please contact us:
Email: accessibility@farchat.app

Please include:
- Description of the issue
- Page URL where you encountered it
- Assistive technology used (if applicable)"
```

---

### Legal Pages Content

#### Privacy Policy (`/legal/privacy`)
```
Last Updated: [Date]

Sections to include:
1. Information We Collect
2. How We Use Your Information
3. Information Sharing
4. Data Retention
5. Your Rights
6. Security
7. Cookies
8. Changes to This Policy
9. Contact Us
```

#### Terms of Service (`/legal/terms`)
```
Last Updated: [Date]

Sections to include:
1. Acceptance of Terms
2. Description of Service
3. User Accounts
4. Acceptable Use
5. Intellectual Property
6. Disclaimers
7. Limitation of Liability
8. Indemnification
9. Termination
10. Governing Law
11. Changes to Terms
12. Contact Information
```

#### Cookie Policy (`/legal/cookies`)
```
Title: "Cookie Policy"
Last Updated: [Date]

Sections:
1. What Are Cookies
2. How We Use Cookies
   - Essential cookies (authentication, security)
   - Analytics cookies (usage patterns)
   - Preference cookies (settings)
3. Third-Party Cookies
4. Managing Cookies
5. Contact Us
```

---

## UI Component Styling Guidelines

### Buttons

**Primary Button:**
```css
/* Mobile-first */
padding: 12px 24px;
font-size: 16px;
font-weight: 500;
border-radius: 8px;
background: var(--primary);
color: white;

/* Hover */
background: var(--primary-hover);
transform: translateY(-1px);
```

**Secondary Button:**
```css
padding: 12px 24px;
font-size: 16px;
font-weight: 500;
border-radius: 8px;
background: transparent;
border: 1px solid var(--muted);
color: var(--foreground);
```

### Cards

```css
/* Dark theme card */
background: var(--background-card);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 12px;
padding: 24px; /* mobile */
padding: 32px; /* desktop */
```

### Status Badges

```css
/* Base badge */
display: inline-flex;
padding: 4px 12px;
border-radius: 9999px;
font-size: 12px;
font-weight: 500;

/* Pursuing - Amber */
background: rgba(245, 158, 11, 0.1);
color: #f59e0b;
border: 1px solid rgba(245, 158, 11, 0.2);

/* In Progress - Blue */
background: rgba(59, 130, 246, 0.1);
color: #3b82f6;
border: 1px solid rgba(59, 130, 246, 0.2);

/* Planned - Gray */
background: rgba(148, 163, 184, 0.1);
color: #94a3b8;
border: 1px solid rgba(148, 163, 184, 0.2);

/* Complete - Green */
background: rgba(34, 197, 94, 0.1);
color: #22c55e;
border: 1px solid rgba(34, 197, 94, 0.2);
```

---

## Image & Asset Requirements

### Screenshots Needed
1. Chat interface with sample query/response
2. Search results page
3. Regulation detail view
4. Mobile app view

### Icons
- Use Lucide React icons (already in project)
- Consistent stroke width (2px)
- Size: 24x24 for inline, 32x32 for features, 48x48 for hero cards

### Agency Logos (existing)
- DOD, GSA, VA, DHS, NASA, ARMY, NAVY
- Keep grayscale/muted treatment
- Located in `/public/images/agencies/`

### Compliance Badge Icons
- FedRAMP logo (or placeholder icon)
- Section 508 icon
- SOC 2 icon
- ITAR icon
- Use placeholder icons until official badges can be used

---

## Mobile-Specific Considerations

### Touch Targets
- Minimum 44x44px tap targets
- Adequate spacing between interactive elements (8px minimum)

### Content Hierarchy
- Most important content first
- Collapsible sections for dense content
- Progressive disclosure patterns

### Navigation
- Hamburger menu on mobile
- Sticky header with minimal height
- Bottom CTA bar where appropriate

### Forms
- Single column layout
- Large input fields (minimum 48px height)
- Clear labels above fields
- Inline validation messages

---

## Responsive Breakpoints

```css
/* Mobile first (default) */
/* 320px - 639px */

/* Small tablet / large phone */
@media (min-width: 640px) { /* sm: */ }

/* Tablet */
@media (min-width: 768px) { /* md: */ }

/* Desktop */
@media (min-width: 1024px) { /* lg: */ }

/* Large desktop */
@media (min-width: 1280px) { /* xl: */ }
```

---

## Content Placeholders

Use these placeholders for content that isn't ready:

**Video placeholder:**
```tsx
<div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
  <div className="text-center">
    <PlayIcon className="h-12 w-12 text-slate-500 mx-auto mb-2" />
    <p className="text-slate-400">Demo video coming soon</p>
  </div>
</div>
```

**Screenshot placeholder:**
```tsx
<div className="aspect-[4/3] bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700">
  <p className="text-slate-500">Screenshot coming soon</p>
</div>
```

**Content placeholder:**
```tsx
<p className="text-slate-400 italic">[Content to be added]</p>
```

---

## SEO Metadata Templates

```tsx
// Features page
export const metadata: Metadata = {
  title: 'Features | FARchat - Federal Acquisition Research Tool',
  description: 'Explore FARchat features: AI-powered regulatory search, compliance autopilot, 25+ regulation libraries, and more.',
};

// Compliance page
export const metadata: Metadata = {
  title: 'Compliance & Security | FARchat',
  description: 'Learn about FARchat\'s security practices and our journey toward FedRAMP, Section 508, and SOC 2 compliance.',
};

// Demo page
export const metadata: Metadata = {
  title: 'Demo | FARchat - See It In Action',
  description: 'Watch how FARchat helps federal acquisition professionals research regulations faster.',
};

// Contact page
export const metadata: Metadata = {
  title: 'Contact Us | FARchat',
  description: 'Get in touch with the FARchat team for questions, support, or feedback.',
};
```

---

## Content Review Checklist

Before publishing each page:

- [ ] All claims are accurate and verifiable
- [ ] No certifications claimed that aren't held
- [ ] Compliance status badges use correct labels
- [ ] Contact emails are correct
- [ ] Links work correctly
- [ ] Mobile layout reviewed
- [ ] Dark/light mode both look good
- [ ] Spelling and grammar checked
- [ ] SEO metadata included
- [ ] Images have alt text

---

*Document Version: 1.0*
*Last Updated: 2025-12-26*
