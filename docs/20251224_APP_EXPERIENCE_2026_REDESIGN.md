# FARchat Authenticated Experience 2026 Redesign Plan

> **Document Type:** Product Design Specification
> **Author:** Design & Product Team
> **Last Updated:** December 2024
> **Status:** Planning Phase
> **Companion Doc:** [Landing Page Redesign](./LANDING_PAGE_2026_REDESIGN.md)

---

## Executive Summary

The FARchat authenticated experience (chat, admin, search, settings) demonstrates **strong interaction design** with polished animations, but suffers from **critical design system fragmentation**. The app feels like two different products: a modern, federal-navy branded landing page and a generic, theme-token-based application.

**Current Scores:**

| Area | Score |
|------|-------|
| Polish | 6.9/10 |
| Brand Consistency | 3.8/10 |
| Mobile UX | 5.6/10 |
| Design System Match | 5.1/10 |

**Key Insight:** The investment in Framer Motion animations goes unappreciated when visual identity doesn't match the brand. Fixing the color system alone would significantly improve perceived quality.

**Critical Gap:** Mobile sidebar is completely hidden with no alternative. Users cannot access conversation history on phones.

---

## Part 1: Current State Analysis

### Design System Fragmentation

| Element | Landing Page | App | Match? |
|---------|--------------|-----|--------|
| Primary Color | federal-navy (#1B263B) | Generic blue token | NO |
| Typography | Inter + JetBrains Mono | Inter only | PARTIAL |
| Background | slate-50 | bg-background token | NO |
| Badges | Glassmorphic + backdrop | Standard outline | NO |
| Gradients | navy→blue accents | Absent | NO |
| Shadows | 2xl layered effects | sm/md only | NO |
| Corners | 2xl, 3xl (generous) | lg, xl (conservative) | NO |
| Motion | 0.5-0.8s smooth | 0.15-0.3s snappy | DIFFERENT |

**Verdict: Only ~30% visual consistency between landing and app**

### Component Quality Matrix

| Component | Polish | Mobile | Brand | Priority |
|-----------|--------|--------|-------|----------|
| Chat Interface | 8/10 | 4/10 | 4/10 | HIGH |
| Message Bubbles | 8/10 | 5/10 | 4/10 | MEDIUM |
| Empty State | 9/10 | 8/10 | 5/10 | LOW |
| User Menu | 8/10 | 7/10 | 4/10 | MEDIUM |
| Settings Sidebar | 7/10 | 8/10 | 4/10 | MEDIUM |
| Usage Dashboard | 7/10 | 6/10 | 4/10 | MEDIUM |
| Admin Dashboard | 4/10 | 3/10 | 2/10 | CRITICAL |
| Search Page | 5/10 | 5/10 | 3/10 | HIGH |

---

## Part 2: Critical Issues

### 2.1 Mobile Navigation (CRITICAL)

**Current State:**
```tsx
// ChatInterface.tsx
className="hidden md:flex flex-col border-r border-border bg-sidebar overflow-hidden"
```

The sidebar is completely hidden on mobile with `hidden md:flex`. Mobile users:
- Cannot access conversation history
- Cannot switch between conversations
- See only the current chat with no navigation

**Impact:** Core feature inaccessible to ~40% of users (mobile traffic)

**Solution:**
```tsx
// New mobile navigation pattern
<Sheet>
  <SheetTrigger asChild>
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu className="h-5 w-5" />
    </Button>
  </SheetTrigger>
  <SheetContent side="left" className="w-80 p-0">
    <ConversationSidebar />
  </SheetContent>
</Sheet>
```

---

### 2.2 Brand Color System (CRITICAL)

**Current State:**
App uses generic theme tokens that don't reference federal-navy:

```css
/* Current: Generic tokens */
--primary: 222.2 47.4% 11.2%;  /* Some blue */
--primary-foreground: 210 40% 98%;
```

**Required:**
```css
/* Updated: Federal Navy brand */
--primary: 216 37% 17%;  /* #1B263B federal-navy */
--primary-foreground: 210 40% 98%;

/* Accent for interactive elements */
--accent-blue: 217 91% 60%;  /* blue-600 */
--accent-amber: 38 92% 50%;  /* warm CTA color */
```

**Files to Update:**
- `src/app/globals.css` - Theme tokens
- `tailwind.config.ts` - Extend theme
- All components using `bg-primary` need verification

---

### 2.3 Citation Links Broken (HIGH)

**Current State:**
```tsx
// CitationCard.tsx
href={`https://www.acquisition.gov/far/${citation.section.toLowerCase().replace(/\s+/g, '-')}`}
```

This generates incorrect URLs for:
- DFARS citations (different domain)
- Agency supplements (VAAR, GSAM, etc.)
- Section numbers with special formatting

**Solution:**
```tsx
// New citation URL resolver
function getCitationUrl(citation: Citation): string | null {
  const { regulation, section } = citation;

  const urlMappings: Record<string, string> = {
    'FAR': 'https://www.acquisition.gov/far/',
    'DFARS': 'https://www.acquisition.gov/dfars/',
    'VAAR': 'https://www.acquisition.gov/vaar/',
    'GSAM': 'https://www.acquisition.gov/gsam/',
    // Add all 25+ supplements
  };

  const baseUrl = urlMappings[regulation];
  if (!baseUrl) return null;

  // Format section appropriately per regulation type
  const formattedSection = formatSection(regulation, section);
  return `${baseUrl}${formattedSection}`;
}
```

---

### 2.4 Admin Dashboard Dated (HIGH)

**Current State:**
- Raw Tailwind classes, no component system
- Hardcoded colors (`bg-gray-50`, `bg-blue-100`)
- No motion design or transitions
- Static "System Status: Operational" text
- No user management actions

**Visual Comparison:**

```
CURRENT ADMIN:                    TARGET ADMIN:
┌─────────────────────┐           ┌─────────────────────┐
│ Admin Dashboard     │           │ [Logo] Admin        │
├─────────────────────┤           ├─────────────────────┤
│ Total Users: 50     │           │ ┌─────┐ ┌─────┐     │
│ Admins: 2          │           │ │ 127 │ │ 3   │     │
│ Status: Operational │           │ │Users│ │Admin│     │
├─────────────────────┤           │ └─────┘ └─────┘     │
│ Email | Role | Tier │           ├─────────────────────┤
│ ...   | ...  | ...  │           │ [Search] [Filters]  │
│ ...   | ...  | ...  │           ├─────────────────────┤
└─────────────────────┘           │ [DataTable with     │
                                  │  sorting, actions]  │
                                  └─────────────────────┘
```

---

## Part 3: Component Redesign Specifications

### 3.1 Chat Interface

#### Header Redesign

**Current:**
```tsx
<header className="h-14 border-b flex items-center justify-between px-4 md:px-6">
  <div className="flex items-center gap-2">
    <Button variant="ghost" size="icon" className="md:hidden">
      <Menu />
    </Button>
    <h1 className="font-semibold text-lg">FARchat</h1>
  </div>
  <UserMenu />
</header>
```

**Redesigned:**
```tsx
<header className="h-14 border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
  <div className="flex items-center justify-between px-4 md:px-6 h-full">
    {/* Left: Mobile menu + Branding */}
    <div className="flex items-center gap-3">
      {/* Mobile sidebar trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open conversations</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <MobileConversationList />
        </SheetContent>
      </Sheet>

      {/* Logo with federal-navy accent */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-federal-navy flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="font-semibold text-lg hidden sm:block">FARchat</span>
      </div>
    </div>

    {/* Right: Actions */}
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href="/search">
          <Search className="h-5 w-5" />
        </Link>
      </Button>
      <UserMenu />
    </div>
  </div>
</header>
```

#### Sidebar Redesign

**Changes:**
1. Add federal-navy accent to "New Chat" button
2. Improve conversation item hover states
3. Add conversation grouping (Today, Yesterday, This Week)
4. Show last message preview in list

```tsx
// Conversation grouping
const groupedConversations = useMemo(() => {
  return {
    today: conversations.filter(c => isToday(c.updated_at)),
    yesterday: conversations.filter(c => isYesterday(c.updated_at)),
    thisWeek: conversations.filter(c => isThisWeek(c.updated_at)),
    older: conversations.filter(c => !isThisWeek(c.updated_at)),
  };
}, [conversations]);

// Render with section headers
<div className="px-2 py-1">
  <span className="text-xs font-medium text-muted-foreground px-2">Today</span>
</div>
{groupedConversations.today.map(conv => <ConversationItem key={conv.id} {...conv} />)}
```

#### Message Bubbles

**Current Issues:**
- No timestamps visible
- User messages lack visual distinction
- Max-width jumps at breakpoints

**Redesigned:**
```tsx
// MessageBubble.tsx
<div className={cn(
  "group relative",
  isUser ? "flex justify-end" : "flex justify-start"
)}>
  {/* Avatar for assistant */}
  {!isUser && (
    <div className="w-8 h-8 rounded-full bg-federal-navy flex items-center justify-center mr-3 mt-1">
      <Bot className="w-4 h-4 text-white" />
    </div>
  )}

  <div className={cn(
    "max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]", // Smoother breakpoints
    isUser
      ? "bg-federal-navy text-white rounded-2xl rounded-br-md"
      : "bg-muted rounded-2xl rounded-bl-md"
  )}>
    <div className="px-4 py-3">
      {content}
    </div>

    {/* Timestamp on hover */}
    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      <span className="text-xs text-muted-foreground px-4 pb-2 block">
        {formatTime(created_at)}
      </span>
    </div>
  </div>
</div>
```

---

### 3.2 User Menu & Settings

#### Tier Badge Standardization

**Current:** Scattered colors (slate, blue, purple, amber, emerald)

**Redesigned:** Consistent brand palette
```tsx
const tierConfig = {
  free: {
    color: 'bg-slate-100 text-slate-700 border-slate-200',
    icon: null,
  },
  basic: {
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Zap,
  },
  pro: {
    color: 'bg-federal-navy/10 text-federal-navy border-federal-navy/20',
    icon: Crown,
  },
  unlimited: {
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Infinity,
  },
  enterprise: {
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Building,
  },
};
```

#### Usage Dashboard Improvements

**Add:**
1. Countdown to reset
2. Timezone context
3. Upgrade CTA

```tsx
// UsageDashboard.tsx additions
<div className="space-y-4">
  {/* Progress bar */}
  <Progress value={usagePercent} className={cn(
    usagePercent > 90 ? "bg-red-100" :
    usagePercent > 75 ? "bg-amber-100" : "bg-blue-100"
  )} />

  {/* Usage text */}
  <div className="flex justify-between text-sm">
    <span>{usage.used} / {usage.limit} queries used</span>
    <span className="text-muted-foreground">
      Resets in {formatDistanceToNow(nextReset)}
    </span>
  </div>

  {/* Upgrade CTA when > 75% */}
  {usagePercent > 75 && (
    <Button variant="outline" className="w-full" asChild>
      <Link href="/pricing">
        <Zap className="w-4 h-4 mr-2" />
        Upgrade for unlimited queries
      </Link>
    </Button>
  )}
</div>
```

#### Settings Persistence

**Current:** Dark mode toggle doesn't persist

**Fix:**
```tsx
// hooks/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window === 'undefined') return 'system';
    return localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    }
  }, [theme]);

  return { theme, setTheme };
}
```

---

### 3.3 Admin Dashboard Rebuild

#### New Component Structure

```
components/admin/
├── AdminLayout.tsx         # Shared admin layout with nav
├── StatsCard.tsx          # Animated stat display
├── UserTable.tsx          # DataTable with sorting/filtering
├── UserActions.tsx        # Dropdown for user management
├── SystemStatus.tsx       # Live status indicator
└── AdminSkeleton.tsx      # Branded loading state
```

#### Stats Cards

```tsx
// components/admin/StatsCard.tsx
interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border rounded-xl p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">
            <AnimatedNumber value={value} />
          </p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              trend.isPositive ? "text-emerald-600" : "text-red-600"
            )}>
              {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {trend.value}% from last week
            </p>
          )}
        </div>
        <div className="p-3 bg-federal-navy/10 rounded-lg">
          <Icon className="w-5 h-5 text-federal-navy" />
        </div>
      </div>
    </motion.div>
  );
}
```

#### User Table with Actions

```tsx
// components/admin/UserTable.tsx
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "email",
    header: "User",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{getInitials(row.original.email)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{row.original.email}</p>
          <p className="text-xs text-muted-foreground">
            Joined {formatDate(row.original.created_at)}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "tier",
    header: "Plan",
    cell: ({ row }) => <TierBadge tier={row.original.tier} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
];
```

---

### 3.4 Search Page Redesign

#### Current Issues
- Minimal visual design
- No filters or faceted search
- Generic empty state
- No save/bookmark feature

#### Redesigned Layout

```
┌─────────────────────────────────────────────────────────────┐
│ [← Back]                    Search Regulations    [UserMenu]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🔍 Search FAR, DFARS, and agency supplements...     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Filters:                                                   │
│  [FAR] [DFARS] [VAAR] [GSAM] [All Supplements ▾]          │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  23 results for "commercial item determination"             │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ FAR 2.101 — Definitions                    [96%] [⭐]│   │
│  │ "Commercial item" means any item, other than real   │   │
│  │ property, that is of a type customarily used by...  │   │
│  │ [View Full Section →]                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ FAR 12.102 — Applicability                 [89%] [⭐]│   │
│  │ ...                                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### New Features
1. **Regulation Filters** - Toggle by source (FAR, DFARS, etc.)
2. **Bookmark Results** - Save frequently referenced sections
3. **Copy Citation** - One-click copy formatted citation
4. **Match Highlighting** - Highlight search terms in results

---

## Part 4: Motion & Animation Refinements

### Current Animation Inventory

| Component | Animation | Duration | Issue |
|-----------|-----------|----------|-------|
| Message entrance | fade + slideY | 0.3s | Good |
| Sidebar toggle | width | 0.2s | Too subtle |
| ThinkingIndicator | multi-phase | 2-3s per phase | Arbitrary timing |
| Dropdown menu | fade + scale | 0.15s | Good |
| Citation expand | height | 0.2s | Good |
| Empty state | stagger | 0.1s delay | Good |

### Recommended Changes

#### 1. ThinkingIndicator Reality Check

**Current:** Hardcoded phase durations don't match API latency

**Options:**
- **Option A:** Remove phases, show indeterminate progress
- **Option B:** Use Server-Sent Events for real progress
- **Option C:** Show elapsed time instead of fake phases

```tsx
// Option A: Simplified indicator
export function ThinkingIndicator() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-3 p-4">
      <Loader2 className="w-5 h-5 animate-spin text-federal-navy" />
      <span className="text-sm text-muted-foreground">
        Analyzing regulations... {elapsed}s
      </span>
    </div>
  );
}
```

#### 2. Sidebar Animation Enhancement

```tsx
// More visible sidebar transition
<motion.aside
  initial={false}
  animate={{
    width: isCollapsed ? 0 : 280,
    opacity: isCollapsed ? 0 : 1,
  }}
  transition={{
    width: { duration: 0.2, ease: "easeInOut" },
    opacity: { duration: 0.15 },
  }}
>
```

#### 3. Page Transitions

```tsx
// app/chat/template.tsx
'use client';

import { motion } from 'framer-motion';

export default function ChatTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## Part 5: Accessibility Improvements

### Current Gaps

| Issue | Location | Fix |
|-------|----------|-----|
| Sidebar inaccessible on mobile | ChatInterface | Add Sheet-based mobile nav |
| Color-only progress indication | UsageDashboard | Add text labels |
| No keyboard nav for tables | Admin | Add focus states |
| Missing skip links in app | Layout | Add "Skip to chat" |
| No high contrast mode | Settings | Add toggle |

### Implementation

#### Skip Links for App
```tsx
// app/chat/layout.tsx
<a
  href="#chat-input"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
             focus:z-50 focus:px-4 focus:py-2 focus:bg-federal-navy focus:text-white
             focus:rounded-lg"
>
  Skip to chat input
</a>
```

#### Color-Independent Progress
```tsx
// UsageDashboard.tsx
<div className="flex items-center gap-2">
  <Progress value={usagePercent} />
  <span className="text-sm font-medium">
    {usagePercent}% used
  </span>
  {usagePercent > 90 && (
    <Badge variant="destructive">Near limit</Badge>
  )}
</div>
```

---

## Part 6: Implementation Roadmap

### Phase 1: Critical Fixes (Week 1-2)

| Task | Priority | Effort |
|------|----------|--------|
| Mobile sidebar navigation | P0 | 4h |
| Apply federal-navy color system | P0 | 8h |
| Fix citation URL generation | P0 | 4h |
| Add timestamps to messages | P1 | 2h |

**Deliverables:**
- [ ] Sheet-based mobile conversation list
- [ ] Updated globals.css with brand tokens
- [ ] Citation URL mapping for all supplements
- [ ] Message timestamps on hover

### Phase 2: Admin Rebuild (Week 2-3)

| Task | Priority | Effort |
|------|----------|--------|
| Create admin component library | P0 | 8h |
| Implement DataTable with actions | P0 | 6h |
| Add real-time stats | P1 | 4h |
| User management actions | P1 | 6h |

**Deliverables:**
- [ ] StatsCard, UserTable, UserActions components
- [ ] Search and filter functionality
- [ ] Role/tier change actions
- [ ] Activity log view

### Phase 3: Search Enhancement (Week 3-4)

| Task | Priority | Effort |
|------|----------|--------|
| Add regulation filters | P1 | 4h |
| Implement bookmarks | P1 | 6h |
| Copy citation feature | P2 | 2h |
| Improve empty state | P2 | 2h |

**Deliverables:**
- [ ] Filter pills for regulation types
- [ ] Bookmark storage and display
- [ ] One-click citation copy
- [ ] Contextual empty state with suggestions

### Phase 4: Polish & Consistency (Week 4-5)

| Task | Priority | Effort |
|------|----------|--------|
| Settings persistence | P1 | 4h |
| Usage countdown timer | P2 | 2h |
| ThinkingIndicator simplification | P2 | 3h |
| Keyboard shortcuts | P2 | 4h |

**Deliverables:**
- [ ] Dark mode persistence
- [ ] Reset countdown in usage dashboard
- [ ] Simplified thinking animation
- [ ] Cmd+K for search, documented shortcuts

### Phase 5: Accessibility Audit (Week 5-6)

| Task | Priority | Effort |
|------|----------|--------|
| Skip links | P1 | 1h |
| Keyboard navigation | P1 | 4h |
| High contrast mode | P2 | 4h |
| Screen reader testing | P1 | 4h |

**Deliverables:**
- [ ] Skip to main content/input links
- [ ] Full keyboard navigation for tables
- [ ] High contrast toggle in settings
- [ ] NVDA/VoiceOver testing report

---

## Part 7: Design Tokens Update

### Colors to Add

```css
/* globals.css additions */
:root {
  /* Brand - Federal Navy */
  --federal-navy: 216 37% 17%;
  --federal-navy-foreground: 0 0% 100%;

  /* Accent - Blue 600 */
  --accent-blue: 217 91% 60%;

  /* Warm CTA */
  --accent-amber: 38 92% 50%;
  --accent-amber-foreground: 0 0% 100%;

  /* Status Colors */
  --success: 142 76% 36%;
  --warning: 38 92% 50%;
  --error: 0 84% 60%;
}

.dark {
  --federal-navy: 216 37% 85%;
  --federal-navy-foreground: 216 37% 17%;
}
```

### Tailwind Config Extension

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      'federal-navy': 'hsl(var(--federal-navy))',
      'accent-blue': 'hsl(var(--accent-blue))',
      'accent-amber': 'hsl(var(--accent-amber))',
    },
  },
}
```

---

## Part 8: Success Metrics

### Design Quality

| Metric | Current | Target |
|--------|---------|--------|
| Brand consistency score | 30% | 90%+ |
| Mobile usability | 56% | 95%+ |
| Component reuse | ~60% | 90%+ |

### User Experience

| Metric | Current | Target |
|--------|---------|--------|
| Mobile task completion | Unknown | 95%+ |
| Settings persistence | 0% | 100% |
| Citation accuracy | ~70% | 99%+ |

### Performance

| Metric | Current | Target |
|--------|---------|--------|
| Chat LCP | ~2.0s | <1.5s |
| Admin TTI | ~3.0s | <2.0s |
| Animation jank | Some | None |

---

## Part 9: Component Checklist

### New Components Needed

```
components/
├── chat/
│   ├── MobileConversationList.tsx   # Sheet-based sidebar
│   ├── ConversationGroup.tsx        # Grouped by date
│   └── MessageTimestamp.tsx         # Hover timestamp
├── admin/
│   ├── AdminLayout.tsx
│   ├── StatsCard.tsx
│   ├── UserTable.tsx
│   ├── UserActions.tsx
│   └── SystemStatus.tsx
├── search/
│   ├── RegulationFilters.tsx
│   ├── SearchResultCard.tsx
│   └── BookmarkButton.tsx
└── shared/
    ├── AnimatedNumber.tsx           # Counter animation
    ├── TierBadge.tsx               # Consistent tier display
    └── CountdownTimer.tsx          # Usage reset timer
```

### Components to Update

| Component | Changes |
|-----------|---------|
| ChatInterface | Add mobile sheet, apply brand colors |
| MessageBubble | Add timestamps, update colors |
| UserMenu | Apply tier badge standardization |
| UsageDashboard | Add countdown, upgrade CTA |
| SettingsSidebar | Persist preferences, fix toggles |
| CitationCard | Fix URL generation |

---

## Appendix A: File Changes Summary

### High-Impact Files

| File | Changes | Priority |
|------|---------|----------|
| `globals.css` | Add brand tokens | P0 |
| `ChatInterface.tsx` | Mobile nav, colors | P0 |
| `CitationCard.tsx` | Fix URLs | P0 |
| `admin/page.tsx` | Complete rebuild | P0 |
| `MessageBubble.tsx` | Timestamps, colors | P1 |
| `UsageDashboard.tsx` | Countdown, CTA | P1 |
| `search/page.tsx` | Filters, bookmarks | P1 |
| `SettingsSidebar.tsx` | Persistence | P2 |

---

## Appendix B: Design Decisions Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Use Sheet for mobile nav | Already in design system, accessible | Dec 2024 |
| Federal-navy as primary | Matches landing page brand | Dec 2024 |
| Simplify ThinkingIndicator | Fake progress hurts trust | Dec 2024 |
| Group conversations by date | Improves scanability | Dec 2024 |
| Add timestamps on hover | Clean default, info on demand | Dec 2024 |

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 2024 | Initial authenticated experience audit and plan |

---

*This document should be reviewed alongside the Landing Page Redesign plan to ensure consistency across the entire product.*
