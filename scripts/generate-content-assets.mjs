#!/usr/bin/env node

/**
 * FARchat Content Asset Generator
 *
 * Uses OpenRouter's Gemini 3 Pro Image Preview (Nano Banana Pro) to generate:
 * - Professional product screenshots
 * - Federal compliance badges
 * - Testimonial content
 *
 * Usage: node scripts/generate-content-assets.mjs
 */

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-3-pro-image-preview';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

if (!OPENROUTER_API_KEY) {
  console.error('❌ Error: OPENROUTER_API_KEY not found in environment variables');
  console.error('Make sure your ~/.zshrc exports OPENROUTER_API_KEY');
  process.exit(1);
}

// Asset definitions
const ASSETS = {
  screenshots: [
    {
      name: 'chat-interface-light',
      prompt: `Create a professional, high-fidelity screenshot of a government AI chat application interface in light mode.

Design specifications:
- Clean, modern federal government aesthetic (navy blue #1B263B as primary color)
- Left sidebar (280px) with conversation history list
- Main chat area showing a conversation about FAR regulations
- Top header with "FARchat" branding and user menu
- Bottom input area with send button
- Professional typography (Inter font family)
- Subtle shadows and clean borders
- Show 3-4 message bubbles with citations to "FAR 52.212-1" and "DFARS 252.204-7012"
- Light gray background (#F8FAFC)
- Include small citation cards with external link icons

Style: Clean, accessible, government-approved UI design
Aspect ratio: 3:2 (1200x800)
Quality: Production-ready, pixel-perfect`,
      aspectRatio: '3:2',
      imageSize: '2K'
    },
    {
      name: 'chat-interface-dark',
      prompt: `Create a professional, high-fidelity screenshot of a government AI chat application interface in dark mode.

Design specifications:
- Dark theme with navy undertones (background: #0F172A, cards: #1E293B)
- Left sidebar (280px) with conversation history in dark theme
- Main chat area showing the same conversation as light mode
- Top header with "FARchat" branding in light text
- High contrast for accessibility (WCAG AA compliant)
- User messages in federal navy blue (#1B263B), assistant messages in dark gray
- Professional dark mode typography with excellent readability
- Show 3-4 message bubbles with citations
- Subtle glow effects on interactive elements
- Include citation cards with good contrast

Style: Professional dark mode, government-grade accessibility
Aspect ratio: 3:2 (1200x800)
Quality: Production-ready, WCAG compliant`,
      aspectRatio: '3:2',
      imageSize: '2K'
    },
    {
      name: 'search-results',
      prompt: `Create a professional screenshot of a federal regulation search results page.

Design specifications:
- Top search bar with "FAR acquisition regulations" query
- Filter pills below search (FAR, DFARS, VAAR tags)
- 4-5 search result cards showing:
  * Regulation badge (e.g., "FAR 52.212-1")
  * Title in bold
  * Excerpt snippet (2-3 lines)
  * Relevance percentage bar
  * External link icon
- Clean card layout with subtle shadows
- Federal navy accents (#1B263B)
- Professional government aesthetic
- Copy citation and bookmark buttons on each card
- Light background (#F8FAFC)

Style: Clean, scannable search interface for government regulations
Aspect ratio: 3:2 (1200x800)
Quality: Production-ready UI`,
      aspectRatio: '3:2',
      imageSize: '2K'
    },
    {
      name: 'mobile-chat',
      prompt: `Create a professional screenshot of the FARchat mobile app interface.

Design specifications:
- Mobile viewport (iPhone 14 Pro Max size)
- Compact header (48px) with menu icon, "FARchat" title, new chat button
- Chat conversation showing 2-3 message exchanges
- Bottom navigation bar with 4 icons: Chats, Search, New, Account
- Touch-friendly spacing (44px minimum tap targets)
- Federal navy blue accent color (#1B263B)
- Clean, minimal mobile UI
- iOS-style safe area at top and bottom
- Professional government app aesthetic
- One citation card visible in the chat

Style: Modern mobile app UI, iOS design language
Aspect ratio: 9:16 (mobile portrait, 428x926)
Quality: Production-ready mobile UI`,
      aspectRatio: '9:16',
      imageSize: '2K'
    }
  ],
  badges: [
    {
      name: 'fedramp-ready',
      prompt: `Create a professional compliance badge for "FedRAMP Ready" status.

Design specifications:
- Shield or certification badge shape
- Text: "FedRAMP Ready"
- Federal government official color palette
- Clean, authoritative design
- Suitable for displaying on a government website
- High contrast for accessibility
- Professional certification aesthetic
- Include subtle stars or security icons
- Size: Square format for flexibility

Style: Official government certification badge
Aspect ratio: 1:1
Quality: High-resolution, suitable for web and print`,
      aspectRatio: '1:1',
      imageSize: '2K'
    },
    {
      name: 'section-508',
      prompt: `Create a professional compliance badge for "Section 508 Compliant" accessibility certification.

Design specifications:
- Badge or seal design
- Text: "Section 508" and "Compliant"
- Include universal accessibility symbol
- Professional government aesthetic
- Blue and white color scheme
- Clean, readable typography
- High contrast design
- Authoritative certification look
- Square format

Style: Government accessibility certification badge
Aspect ratio: 1:1
Quality: High-resolution, web-ready`,
      aspectRatio: '1:1',
      imageSize: '2K'
    },
    {
      name: 'soc2-type2',
      prompt: `Create a professional security certification badge for "SOC 2 Type II".

Design specifications:
- Professional security badge design
- Text: "SOC 2 Type II" and "Certified"
- Security-focused iconography (lock, shield)
- Trust-inspiring color palette (blues, grays)
- Clean, corporate aesthetic
- High credibility visual design
- Square format for flexibility
- Modern security certification look

Style: Professional security certification badge
Aspect ratio: 1:1
Quality: High-resolution`,
      aspectRatio: '1:1',
      imageSize: '2K'
    },
    {
      name: 'itar-compliant',
      prompt: `Create a professional compliance badge for "ITAR Compliant" status.

Design specifications:
- Official-looking compliance badge
- Text: "ITAR Compliant"
- Federal regulation aesthetic
- American flag color accents (red, white, blue)
- Authoritative design
- Document or checkmark iconography
- Square format
- Professional certification look
- High contrast

Style: Federal compliance certification badge
Aspect ratio: 1:1
Quality: High-resolution`,
      aspectRatio: '1:1',
      imageSize: '2K'
    }
  ]
};

// Testimonials to generate
const TESTIMONIAL_PROMPTS = [
  `Write a professional testimonial quote (2-3 sentences) from a fictional GS-14 Contracting Officer at the Department of Defense who uses FARchat daily.

The testimonial should:
- Sound authentic and professional
- Mention specific benefits (time savings, accuracy, ease of use)
- Reference federal acquisition regulations (FAR/DFARS)
- Be appropriate for a government website
- Include a realistic name and title

Format:
"[Quote]"
- [Name], [Title]
  [Agency]`,

  `Write a professional testimonial quote (2-3 sentences) from a fictional Contract Specialist at the General Services Administration (GSA) who relies on FARchat for regulatory guidance.

The testimonial should:
- Be credible and government-appropriate
- Mention workflow improvements
- Reference specific use cases (searches, citations)
- Sound like a real federal employee
- Include a realistic name and title

Format:
"[Quote]"
- [Name], [Title]
  [Agency]`,

  `Write a professional testimonial quote (2-3 sentences) from a fictional Procurement Analyst at the Department of Veterans Affairs who appreciates FARchat's accessibility and accuracy.

The testimonial should:
- Be authentic and professional
- Mention compliance and accuracy
- Reference federal procurement processes
- Be suitable for a government platform
- Include a realistic name and title

Format:
"[Quote]"
- [Name], [Title]
  [Agency]`
];

/**
 * Call OpenRouter API to generate an image
 */
async function generateImage(prompt, aspectRatio, imageSize) {
  console.log(`  📸 Generating with aspect ratio ${aspectRatio}, size ${imageSize}...`);

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://farchat.app',
      'X-Title': 'FARchat Asset Generator'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      modalities: ['image', 'text'],
      image_config: {
        aspect_ratio: aspectRatio,
        image_size: imageSize
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();

  // Extract image from response
  const message = data.choices[0].message;
  if (!message.images || message.images.length === 0) {
    throw new Error('No image generated in response');
  }

  const imageUrl = message.images[0].image_url.url;
  return imageUrl; // Returns base64 data URL
}

/**
 * Generate testimonial text
 */
async function generateTestimonial(prompt) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://farchat.app',
      'X-Title': 'FARchat Asset Generator'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

/**
 * Save base64 image as WebP
 */
async function saveImage(base64Data, outputPath) {
  // Extract base64 data from data URL
  const base64Match = base64Data.match(/^data:image\/\w+;base64,(.+)$/);
  if (!base64Match) {
    throw new Error('Invalid base64 data URL');
  }

  const base64 = base64Match[1];
  const buffer = Buffer.from(base64, 'base64');

  await writeFile(outputPath, buffer);
  console.log(`  ✅ Saved to ${outputPath}`);
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 FARchat Content Asset Generator\n');
  console.log(`Using model: ${MODEL}`);
  console.log(`API Key: ${OPENROUTER_API_KEY.substring(0, 20)}...`);
  console.log('');

  // Create output directories
  const screenshotsDir = join(projectRoot, 'app/public/assets/screenshots');
  const badgesDir = join(projectRoot, 'app/public/assets/badges');
  const contentDir = join(projectRoot, 'content');

  await mkdir(screenshotsDir, { recursive: true });
  await mkdir(badgesDir, { recursive: true });
  await mkdir(contentDir, { recursive: true });

  const results = {
    screenshots: [],
    badges: [],
    testimonials: []
  };

  // Generate screenshots
  console.log('📸 Generating product screenshots...\n');
  for (const screenshot of ASSETS.screenshots) {
    console.log(`Generating: ${screenshot.name}`);
    try {
      const imageData = await generateImage(
        screenshot.prompt,
        screenshot.aspectRatio,
        screenshot.imageSize
      );

      const outputPath = join(screenshotsDir, `${screenshot.name}.webp`);
      await saveImage(imageData, outputPath);

      results.screenshots.push({
        name: screenshot.name,
        path: outputPath,
        status: 'success'
      });
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      results.screenshots.push({
        name: screenshot.name,
        status: 'failed',
        error: error.message
      });
    }
    console.log('');
  }

  // Generate compliance badges
  console.log('🛡️  Generating compliance badges...\n');
  for (const badge of ASSETS.badges) {
    console.log(`Generating: ${badge.name}`);
    try {
      const imageData = await generateImage(
        badge.prompt,
        badge.aspectRatio,
        badge.imageSize
      );

      const outputPath = join(badgesDir, `${badge.name}.webp`);
      await saveImage(imageData, outputPath);

      results.badges.push({
        name: badge.name,
        path: outputPath,
        status: 'success'
      });
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      results.badges.push({
        name: badge.name,
        status: 'failed',
        error: error.message
      });
    }
    console.log('');
  }

  // Generate testimonials
  console.log('💬 Generating testimonial content...\n');
  const testimonials = [];
  for (let i = 0; i < TESTIMONIAL_PROMPTS.length; i++) {
    console.log(`Generating testimonial ${i + 1}/${TESTIMONIAL_PROMPTS.length}...`);
    try {
      const testimonial = await generateTestimonial(TESTIMONIAL_PROMPTS[i]);
      testimonials.push(testimonial);
      console.log(`  ✅ Generated`);
      results.testimonials.push({
        index: i + 1,
        status: 'success'
      });
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      results.testimonials.push({
        index: i + 1,
        status: 'failed',
        error: error.message
      });
    }
    console.log('');
  }

  // Save testimonials to file
  const testimonialsPath = join(contentDir, 'testimonials.md');
  const testimonialsContent = `# FARchat Testimonials

Generated: ${new Date().toISOString()}

---

${testimonials.join('\n\n---\n\n')}
`;

  await writeFile(testimonialsPath, testimonialsContent);
  console.log(`💾 Saved testimonials to ${testimonialsPath}\n`);

  // Print summary
  console.log('📊 Generation Summary\n');
  console.log('Screenshots:');
  results.screenshots.forEach(r => {
    console.log(`  ${r.status === 'success' ? '✅' : '❌'} ${r.name}`);
  });

  console.log('\nCompliance Badges:');
  results.badges.forEach(r => {
    console.log(`  ${r.status === 'success' ? '✅' : '❌'} ${r.name}`);
  });

  console.log('\nTestimonials:');
  results.testimonials.forEach(r => {
    console.log(`  ${r.status === 'success' ? '✅' : '❌'} Testimonial ${r.index}`);
  });

  const totalSuccess = results.screenshots.filter(r => r.status === 'success').length +
                       results.badges.filter(r => r.status === 'success').length +
                       results.testimonials.filter(r => r.status === 'success').length;

  const totalAttempted = results.screenshots.length + results.badges.length + results.testimonials.length;

  console.log(`\n✨ Complete! ${totalSuccess}/${totalAttempted} assets generated successfully`);
}

// Run the generator
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
