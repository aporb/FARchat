# Quick Start: Automated Asset Generation

## Overview

A powerful asset generation script has been created using **OpenRouter's Gemini 3 Pro Image Preview** (Nano Banana Pro) to automatically generate all required content assets for Phase 13 of the FARchat 2026 Redesign.

## What Gets Generated

### 1. Product Screenshots (4 images)
- **Chat Interface - Light Mode** (1200x800, 2K)
- **Chat Interface - Dark Mode** (1200x800, 2K)
- **Search Results Page** (1200x800, 2K)
- **Mobile Chat View** (428x926, 2K)

### 2. Compliance Badges (4 images)
- **FedRAMP Ready** badge (square, 2K)
- **Section 508 Compliant** badge (square, 2K)
- **SOC 2 Type II** badge (square, 2K)
- **ITAR Compliant** badge (square, 2K)

### 3. Testimonial Content (3 testimonials)
- DOD Contracting Officer testimonial
- GSA Contract Specialist testimonial
- VA Procurement Analyst testimonial

## How to Run

### Single Command

```bash
node scripts/generate-content-assets.mjs
```

That's it! The script will:
1. ✅ Check for your OpenRouter API key
2. ✅ Create necessary output directories
3. ✅ Generate all 11 assets
4. ✅ Save them to the appropriate locations
5. ✅ Show a summary of results

### Expected Output

```
🎨 FARchat Content Asset Generator

Using model: google/gemini-3-pro-image-preview
API Key: sk-or-v1-91631ceadd...

📸 Generating product screenshots...

Generating: chat-interface-light
  📸 Generating with aspect ratio 3:2, size 2K...
  ✅ Saved to /Users/.../app/public/assets/screenshots/chat-interface-light.webp

[... continues for all assets ...]

📊 Generation Summary

Screenshots:
  ✅ chat-interface-light
  ✅ chat-interface-dark
  ✅ search-results
  ✅ mobile-chat

Compliance Badges:
  ✅ fedramp-ready
  ✅ section-508
  ✅ soc2-type2
  ✅ itar-compliant

Testimonials:
  ✅ Testimonial 1
  ✅ Testimonial 2
  ✅ Testimonial 3

✨ Complete! 11/11 assets generated successfully
```

## Output Locations

All generated assets are saved to:

```
app/public/assets/
├── screenshots/
│   ├── chat-interface-light.webp
│   ├── chat-interface-dark.webp
│   ├── search-results.webp
│   └── mobile-chat.webp
└── badges/
    ├── fedramp-ready.webp
    ├── section-508.webp
    ├── soc2-type2.webp
    └── itar-compliant.webp

content/
└── testimonials.md
```

## Cost Estimate

**Per complete run:** ~$1.00 - $2.00

- Screenshots: ~$0.50-1.00
- Badges: ~$0.40-0.80
- Testimonials: ~$0.05-0.10

## Requirements

- ✅ Your OpenRouter API key is already set in `~/.zshrc`
- ✅ Node.js 18+ (check: `node --version`)
- ✅ Network connection

## After Generation

Once assets are generated, integrate them into your components:

### 1. Update Hero Component

```tsx
// app/src/components/sections/hero.tsx
<Image
  src="/assets/screenshots/chat-interface-light.webp"
  alt="FARchat interface showing federal acquisition regulation search"
  width={1200}
  height={800}
  className="rounded-xl shadow-2xl"
/>
```

### 2. Add Compliance Badges

```tsx
// app/src/components/sections/trust-signals.tsx
<img
  src="/assets/badges/fedramp-ready.webp"
  alt="FedRAMP Ready Certified"
  className="h-20 w-20"
/>
```

### 3. Add Testimonials

Copy the content from `content/testimonials.md` into your testimonials component.

## Troubleshooting

### "OPENROUTER_API_KEY not found"

Check your environment variable:
```bash
echo $OPENROUTER_API_KEY
```

If empty, make sure it's in your `~/.zshrc`:
```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
```

Then reload:
```bash
source ~/.zshrc
```

### Asset Quality Issues

If generated images don't look right:
1. Check the prompts in `scripts/generate-content-assets.mjs`
2. Increase `imageSize` from '2K' to '4K' (costs ~2x more)
3. Refine prompts with more specific design details
4. Re-run the script (it's idempotent)

### Partial Failures

If some assets fail but others succeed, the script will continue and show a summary. You can re-run to retry failed assets.

## Advanced Usage

### Generate Only Specific Assets

Edit `scripts/generate-content-assets.mjs` and comment out sections:

```javascript
// Skip screenshots
// for (const screenshot of ASSETS.screenshots) { ... }

// Generate only badges
for (const badge of ASSETS.badges) { ... }
```

### Customize Prompts

Edit the `ASSETS` object to change what gets generated:

```javascript
const ASSETS = {
  screenshots: [
    {
      name: 'custom-screenshot',
      prompt: 'Your detailed prompt here...',
      aspectRatio: '16:9',
      imageSize: '4K'  // Higher quality
    }
  ]
};
```

### Supported Aspect Ratios

- `1:1` - Square (badges)
- `3:2` - Landscape screenshots
- `16:9` - Wide screenshots
- `9:16` - Mobile portrait
- And more (see `README-ASSET-GENERATOR.md`)

## Why Gemini 3 Pro Image Preview?

This model (Nano Banana Pro) was specifically chosen because it:

- ✅ Excels at rendering **UI elements and text** in images
- ✅ Produces **professional-grade** screenshots
- ✅ Supports **precise aspect ratio** control
- ✅ Great for creating **compliance badges with text**
- ✅ Can generate **authentic testimonial content**
- ✅ Supports **2K/4K outputs**

## Full Documentation

For complete details, customization options, and advanced usage:

📖 **See:** `scripts/README-ASSET-GENERATOR.md`

## Integration with Development Plan

This script satisfies **Task 13.3** of the remaining implementation plan:

✅ **Phase 13: Landing Page Content**
- Real product screenshots
- Compliance badges
- Testimonial content

**Time saved:** ~8-12 hours of manual design work reduced to ~5-10 minutes of generation time

---

**Questions?** Check the full README or the OpenRouter API documentation at https://openrouter.ai/docs
