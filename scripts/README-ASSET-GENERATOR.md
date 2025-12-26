# FARchat Content Asset Generator

This script uses OpenRouter's **Gemini 3 Pro Image Preview** (Nano Banana Pro) to automatically generate professional content assets for the FARchat application.

## Features

- 🎨 **Professional UI Screenshots**: Generates pixel-perfect screenshots of the FARchat interface in light mode, dark mode, search page, and mobile views
- 🛡️ **Compliance Badges**: Creates professional federal compliance badges (FedRAMP, Section 508, SOC 2, ITAR)
- 💬 **Testimonial Content**: Generates authentic-sounding testimonials from fictional federal employees

## Prerequisites

1. **OpenRouter API Key**: You must have an OpenRouter API key set as an environment variable:
   ```bash
   export OPENROUTER_API_KEY="your-key-here"
   ```
   (This should already be in your `~/.zshrc` file)

2. **Node.js**: Requires Node.js 18+ for ES modules and fetch API

## Usage

### Generate All Assets

Run the complete asset generation pipeline:

```bash
node scripts/generate-content-assets.mjs
```

This will:
1. Create necessary output directories
2. Generate 4 product screenshots (light/dark mode, search, mobile)
3. Generate 4 compliance badges
4. Generate 3 testimonials
5. Save all assets to their respective directories

### Output Locations

- **Screenshots**: `app/public/assets/screenshots/`
  - `chat-interface-light.webp` (1200x800, 2K)
  - `chat-interface-dark.webp` (1200x800, 2K)
  - `search-results.webp` (1200x800, 2K)
  - `mobile-chat.webp` (428x926, 2K)

- **Badges**: `app/public/assets/badges/`
  - `fedramp-ready.webp` (square, 2K)
  - `section-508.webp` (square, 2K)
  - `soc2-type2.webp` (square, 2K)
  - `itar-compliant.webp` (square, 2K)

- **Testimonials**: `content/testimonials.md`

## Cost Estimate

Using the Gemini 3 Pro Image Preview model:
- **Input tokens**: ~$2/M tokens
- **Output tokens**: ~$12/M tokens
- **Image tokens**: ~$120/M tokens

Estimated cost for complete run (11 images + 3 text generations):
- **Screenshots** (4 images @ ~2K res): ~$0.50-1.00
- **Badges** (4 images @ ~2K res): ~$0.40-0.80
- **Testimonials** (3 text): ~$0.05-0.10

**Total estimated cost**: ~$1.00-2.00 per complete run

## Model Details

**Model**: `google/gemini-3-pro-image-preview` (Nano Banana Pro)

**Capabilities**:
- Industry-leading text rendering in images
- Professional-grade design and product visualization
- 2K/4K output support
- Context-rich graphics generation
- Real-world grounding via Search

**Why This Model**:
- Excellent at rendering UI elements and text
- Produces high-fidelity, professional screenshots
- Supports precise aspect ratio control
- Great for creating compliance badges with text
- Can generate authentic-looking testimonial content

## Customization

### Modify Prompts

Edit the `ASSETS` object in `generate-content-assets.mjs`:

```javascript
const ASSETS = {
  screenshots: [
    {
      name: 'your-screenshot-name',
      prompt: 'Your detailed prompt here...',
      aspectRatio: '3:2', // or '16:9', '1:1', etc.
      imageSize: '2K'     // or '4K'
    }
  ],
  badges: [...]
};
```

### Add New Assets

Add new entries to the `screenshots` or `badges` arrays with:
- Unique `name` for the output file
- Detailed `prompt` describing the desired image
- `aspectRatio` (see supported ratios below)
- `imageSize` ('1K', '2K', or '4K')

### Supported Aspect Ratios

- `1:1` → 1024×1024
- `2:3` → 832×1248
- `3:2` → 1248×832 (default for screenshots)
- `3:4` → 864×1184
- `4:3` → 1184×864
- `4:5` → 896×1152
- `5:4` → 1152×896
- `9:16` → 768×1344 (mobile portrait)
- `16:9` → 1344×768
- `21:9` → 1536×672

## Troubleshooting

### API Key Not Found

```
❌ Error: OPENROUTER_API_KEY not found in environment variables
```

**Solution**: Make sure your API key is exported in your shell:
```bash
echo $OPENROUTER_API_KEY  # Should print your key
```

If not set, add to `~/.zshrc`:
```bash
export OPENROUTER_API_KEY="sk-or-v1-..."
```

Then reload: `source ~/.zshrc`

### Generation Failed

If individual assets fail to generate, the script will continue with the remaining assets and show an error summary at the end. Check:
1. API key is valid
2. Sufficient credits in OpenRouter account
3. Network connectivity
4. Prompt is well-formed

### Image Quality Issues

If generated images don't look right:
1. Refine the prompt with more specific design details
2. Try increasing `imageSize` from '2K' to '4K'
3. Adjust `aspectRatio` if composition looks off
4. Add more context about desired style/aesthetic

## Integration with Phase 13

These generated assets are designed for **Phase 13: Landing Page Content** of the implementation plan.

After generating:

1. **Update Hero Component** (`app/src/components/sections/hero.tsx`):
   ```tsx
   <Image
     src="/assets/screenshots/chat-interface-light.webp"
     alt="FARchat interface screenshot"
     ...
   />
   ```

2. **Add Trust Badges** (`app/src/components/sections/trust-signals.tsx`):
   ```tsx
   <img src="/assets/badges/fedramp-ready.webp" alt="FedRAMP Ready" />
   ```

3. **Add Testimonials** (`app/src/components/sections/testimonials.tsx`):
   Use the content from `content/testimonials.md`

## Advanced Usage

### Generate Specific Asset Types Only

Modify the `main()` function to comment out sections you don't need:

```javascript
// Comment out to skip screenshots
// await generateScreenshots();

// Generate only badges
await generateBadges();
```

### Batch Generation with Different Styles

Create multiple variants by running with modified prompts:
```bash
# Generate light theme screenshots
node scripts/generate-content-assets.mjs

# Modify prompts in script for dark theme
# Run again for dark variants
```

## Notes

- **Federal Compliance**: The compliance badges generated are visual representations only. They should not be used to claim actual certification unless you have legitimate credentials.

- **Agency Logos**: This script intentionally generates "compliance badges" rather than actual agency logos to avoid trademark issues. Real agency logos should be obtained through official channels.

- **Testimonials**: All testimonials are fictional and generated by AI. Replace with real user testimonials when available.

- **WebP Format**: All images are saved as WebP for optimal web performance. Browsers without WebP support (very rare in 2025) will need fallback images.

## License

This script is part of the FARchat project and inherits its license.

## Credits

- Uses OpenRouter API (https://openrouter.ai)
- Powered by Google's Gemini 3 Pro Image Preview (Nano Banana Pro)
- Created for FARchat 2026 Redesign implementation
