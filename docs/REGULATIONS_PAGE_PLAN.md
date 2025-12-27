# Regulations Page Implementation Plan

## Overview

Create a `/regulations` page showcasing all federal acquisition regulation libraries available in FARchat. This page will serve as both a reference for users and a trust signal demonstrating the comprehensive coverage of the platform.

---

## Regulation Libraries Available

Based on the `source_content/` directory:

### Core Regulations
| Abbreviation | Full Name | Agency | Format |
|-------------|-----------|--------|--------|
| **FAR** | Federal Acquisition Regulation | Government-wide | DITA + EPUB |
| **DFARS** | Defense Federal Acquisition Regulation Supplement | DoD | DITA |
| **DFARSPGI** | DFARS Procedures, Guidance, and Information | DoD | DITA |

### Agency Supplements (Military)
| Abbreviation | Full Name | Agency | Format |
|-------------|-----------|--------|--------|
| **AFARS** | Army Federal Acquisition Regulation Supplement | Army | DITA |
| **DAFFARS** | Department of the Air Force FAR Supplement | Air Force | DITA |
| **NMCARS** | Navy Marine Corps Acquisition Regulation Supplement | Navy/Marines | DITA |
| **SOFARS** | Special Operations Forces Acquisition Regulation Supplement | SOCOM | DITA |
| **DLAD** | Defense Logistics Acquisition Directive | DLA | DITA |

### Agency Supplements (Civilian)
| Abbreviation | Full Name | Agency | Format |
|-------------|-----------|--------|--------|
| **GSAM** | General Services Acquisition Manual | GSA | DITA |
| **VAAR** | Veterans Affairs Acquisition Regulation | VA | PDF |
| **DARS** | Department of Energy Acquisition Regulation Supplement | DOE | DITA |

---

## Page Structure

### 1. Hero Section
- Title: "Regulation Libraries" or "25+ Federal Acquisition Regulations"
- Subtitle: "Comprehensive coverage of FAR, DFARS, and agency-specific supplements"
- Visual: Animated or static network visualization showing regulation relationships
- Search CTA: Quick search bar to jump into regulations

### 2. Statistics Bar
- Total regulation libraries: 11+ (can grow)
- Total sections/parts available
- Last updated date (from Federal Register sync)
- "Synced nightly" indicator

### 3. Regulation Categories (Tabbed or Accordion)

**Option A: Category-based grouping**
- Core Federal Regulations (FAR, DFARS, DFARSPGI)
- Defense Agency Supplements (AFARS, DAFFARS, NMCARS, SOFARS, DLAD)
- Civilian Agency Supplements (GSAM, VAAR, DARS)

**Option B: Hierarchy visualization**
- Show FAR at the center with supplements radiating outward
- Interactive - click to expand and see details

### 4. Individual Regulation Cards

Each regulation should display:
- **Abbreviation** (prominent, monospace font)
- **Full name**
- **Issuing agency** with badge
- **Description** (2-3 sentences about scope)
- **Coverage** (e.g., "Parts 1-53" or "Parts 801-873")
- **Status indicator** (Active, Last updated date)
- **Quick actions**: Search this regulation, Browse parts

### 5. Relationship Diagram (Optional Enhancement)
- Interactive visualization showing:
  - FAR as the foundation
  - DFARS building on FAR
  - Agency supplements building on DFARS or FAR
- Helps users understand the hierarchy

### 6. CTA Section
- "Start researching" button
- Link to demo or feature tour
- Contact for enterprise/custom regulations

---

## Technical Implementation

### File Structure
```
app/src/app/regulations/
├── page.tsx              # Main page component
└── components/
    ├── regulation-card.tsx       # Individual regulation display
    ├── regulation-grid.tsx       # Grid/list of regulations
    ├── hierarchy-diagram.tsx     # Optional: relationship visualization
    └── regulation-stats.tsx      # Statistics bar
```

### Data Structure
```typescript
interface Regulation {
  id: string                    // e.g., "far", "dfars"
  abbreviation: string          // e.g., "FAR", "DFARS"
  fullName: string              // e.g., "Federal Acquisition Regulation"
  agency: string                // e.g., "Government-wide", "DoD"
  agencyAbbr: string            // e.g., "DOD", "GSA", "VA"
  description: string           // Brief description
  coverage: string              // e.g., "Parts 1-53"
  partCount?: number            // Number of parts
  category: 'core' | 'defense' | 'civilian'
  parentRegulation?: string     // e.g., "far" or "dfars"
  sourceFormat: 'dita' | 'pdf' | 'epub'
  lastUpdated?: string          // ISO date
  externalUrl?: string          // Link to official source
  searchUrl: string             // FARchat search URL with filter
}
```

### Static Data File
Create `app/src/data/regulations.ts` with all regulation metadata:
- Allows easy updates without code changes
- Can be extended to pull from database later
- SEO benefits from static generation

---

## Design Specifications

### Visual Style
- Match existing glassmorphic design (PageBackground, GlassCard)
- Use `variant="network"` for PageBackground
- Mobile-first responsive design

### Color Coding by Category
- **Core (FAR family)**: Federal Navy / Blue theme
- **Defense supplements**: Slate / Gray theme
- **Civilian supplements**: Green / Teal theme

### Icons
Use Lucide icons for visual interest:
- `BookOpen` - General regulation
- `Shield` - Defense regulations
- `Building2` - Civilian agencies
- `GitBranch` - Supplement relationships
- `Search` - Quick search action

### Responsive Behavior
- Desktop: 3-column grid for regulation cards
- Tablet: 2-column grid
- Mobile: Single column with collapsible details

---

## SEO Considerations

### Metadata
```typescript
export const metadata: Metadata = {
  title: "Federal Acquisition Regulations | FARchat",
  description: "Browse FAR, DFARS, VAAR, GSAM, and 25+ federal acquisition regulation libraries. Search across all regulations with AI-powered insights.",
  keywords: ["FAR", "DFARS", "VAAR", "federal acquisition regulation", "government contracting"]
}
```

### Structured Data
Consider adding JSON-LD for:
- WebPage schema
- ItemList schema for regulations

---

## Navigation Updates

Add to footer links under "Regulations":
```typescript
{ label: 'All Regulations', href: '/regulations' },
```

Consider adding to main navigation as well.

---

## Future Enhancements

1. **Dynamic Part Count**: Query database for actual section counts
2. **Change Tracking**: Show recent updates per regulation
3. **Comparison Tool**: Compare regulations side-by-side
4. **Download Options**: Export regulation references
5. **Bookmark/Favorites**: Save frequently used regulations
6. **API Integration**: Pull live status from Acquisition.gov

---

## Implementation Phases

### Phase 1: Core Page (MVP)
- [ ] Create regulations data file
- [ ] Build page with hero and stats
- [ ] Create regulation card component
- [ ] Implement responsive grid
- [ ] Add to footer navigation
- [ ] Mobile optimization

### Phase 2: Enhanced UX
- [ ] Category filtering/tabs
- [ ] Search within page
- [ ] Quick search integration
- [ ] Breadcrumb navigation

### Phase 3: Advanced Features
- [ ] Hierarchy visualization
- [ ] Live update indicators
- [ ] Part/section browser
- [ ] Comparison tool

---

## Questions for User

1. **Page URL**: `/regulations` or `/sources` or `/libraries`?
2. **Search Integration**: Direct link to search with pre-filtered regulation?
3. **Regulation Browsing**: Just showcase, or allow browsing parts/sections?
4. **External Links**: Link to official Acquisition.gov sources?
5. **Statistics**: Show actual document counts from RAG database?

