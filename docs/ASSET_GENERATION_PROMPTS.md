# FARchat Asset Generation Prompts

## Overview
This document contains detailed text-to-image generation prompts for creating the missing visual assets identified in the UX audit. These prompts are designed for AI image generation tools like DALL-E, Midjourney, or Stable Diffusion.

## Asset Requirements

### 1. Hero Background Image
**File:** `/public/assets/images/hero-bg-network.png`
**Size:** 1920x1080px (16:9 aspect ratio)
**Format:** PNG with transparency support

**Primary Prompt:**
```
A sophisticated abstract network visualization on a deep federal navy blue (#1B263B) background, featuring interconnected nodes and glowing connection lines representing federal regulation relationships. The network should have a premium, technological aesthetic with subtle golden accent particles (#D4A84B) that suggest data flow and intelligence. Use a modern, clean design with depth through layered transparency and soft glow effects. The overall composition should feel authoritative and professional, suitable for a government technology platform. Include subtle animated elements suggestion through motion blur or particle trails. High resolution, photorealistic rendering with attention to lighting and shadow details.
```

**Alternative Prompts:**
```
Federal government technology network background, abstract data visualization with interconnected nodes in navy and gold color scheme, premium SaaS aesthetic, subtle particle effects, professional and trustworthy appearance
```

```
Cybersecurity network diagram style background, federal blue (#1B263B) base with golden data flow lines, interconnected regulatory nodes, modern government tech interface aesthetic, high-end design
```

### 2. Regulatory Graph Visualization
**File:** `/public/assets/images/feature-regulatory-graph.png`
**Size:** 800x600px (4:3 aspect ratio)
**Format:** PNG with transparency support

**Primary Prompt:**
```
An elegant knowledge graph visualization showing interconnected regulatory nodes labeled FAR, DFARS, VAAR, GSAM, AFARS with glowing connection lines in a federal navy blue (#1B263B) to white gradient background. The graph should demonstrate semantic relationships between different federal acquisition regulations with nodes of varying sizes based on importance. Use a professional infographic style with clean modern design, data visualization aesthetic. Include subtle animations suggestions through glowing effects and particle connections. The visualization should convey intelligence and interconnectedness of the federal regulatory ecosystem. High resolution with attention to typography and visual hierarchy.
```

**Alternative Prompts:**
```
Federal regulation network diagram, interconnected compliance nodes with agency labels, professional data visualization, navy and gold color scheme, government technology aesthetic, clean modern design
```

```
Regulatory compliance mapping visualization, semantic network of federal acquisition rules, interconnected nodes with glowing connections, premium government tech design, authoritative and trustworthy appearance
```

### 3. App Preview Image (Optional Enhancement)
**File:** `/public/assets/images/app-preview.png`
**Size:** 1200x800px (3:2 aspect ratio)
**Format:** PNG with device mockup

**Primary Prompt:**
```
A premium mockup of the FARchat AI assistant interface displayed on a modern laptop or tablet device, showing a sophisticated chat interface with federal regulation content. The interface should feature the federal navy blue (#1B263B) color scheme with golden accents (#D4A84B), glassmorphism effects, and clean typography. Include realistic chat bubbles showing AI responses about federal contracting regulations, with proper citation formatting. The device should be positioned at an elegant angle with subtle shadows and reflections. Professional government technology aesthetic with attention to detail in the UI elements, buttons, and layout. High-resolution photorealistic rendering.
```

## Technical Specifications

### Color Palette
- **Primary:** Federal Navy Blue (#1B263B)
- **Secondary:** Federal Gold (#D4A84B)
- **Accent:** Federal Blue (#3B82F6)
- **Background:** White to Slate gradients
- **Text:** Slate-900 (#0F172A) and Slate-600 (#475569)

### Style Guidelines
- **Aesthetic:** Premium, professional, government-grade
- **Typography:** Clean, modern, sans-serif
- **Effects:** Subtle glows, glassmorphism, particle systems
- **Composition:** Balanced, hierarchical, accessible

### File Requirements
- **Resolution:** High-resolution (minimum 2x for retina displays)
- **Transparency:** PNG format with alpha channel where appropriate
- **Optimization:** Web-optimized file sizes under 1MB each
- **Accessibility:** High contrast ratios, clear visual hierarchy

## Generation Parameters

### For DALL-E 3:
- **Aspect Ratio:** Match specified dimensions
- **Quality:** HD or highest available
- **Style:** Photorealistic or digital art depending on asset type
- **Negative Prompts:** Avoid cartoonish, childish, unprofessional elements

### For Midjourney:
- **Version:** Use latest version (v6 as of 2025)
- **Stylize:** Medium to high for artistic quality
- **Chaos:** Low (0-10) for consistency
- **Quality:** High or maximum available

### For Stable Diffusion:
- **Model:** Use government/technology focused models
- **Steps:** 30-50 for quality
- **CFG Scale:** 7-12 for prompt adherence
- **Sampler:** DPM++ or similar high-quality sampler

## Implementation Notes

1. **Hero Background:** Should work well with text overlay and not compete for attention
2. **Regulatory Graph:** Must be clearly readable at various screen sizes
3. **App Preview:** Should accurately represent the actual interface design
4. **All Assets:** Must maintain visual consistency with the existing design system

## Quality Assurance

After generation, verify:
- [ ] Color accuracy matches brand guidelines
- [ ] Resolution meets technical requirements
- [ ] File size is optimized for web
- [ ] Visual hierarchy supports content readability
- [ ] Accessibility standards are met
- [ ] Cross-browser compatibility is maintained

## Next Steps

1. Generate images using the provided prompts
2. Export in appropriate formats and sizes
3. Test in the application at various screen sizes
4. Gather feedback and iterate if necessary
5. Document final asset specifications for future use

---

*These prompts are designed to create premium, government-grade visual assets that enhance the professional appearance of FARchat while maintaining accessibility and performance standards.*
