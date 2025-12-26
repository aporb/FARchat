#!/usr/bin/env node

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-3-pro-image-preview';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const prompt = `Create a professional, high-fidelity screenshot of a government AI chat application interface in dark mode.

Design specifications:
- Dark theme with navy undertones (background: #0F172A, cards: #1E293B)
- Left sidebar (280px) with conversation history in dark theme
- Main chat area showing conversation about FAR regulations
- Top header with "FARchat" branding in light text
- High contrast for accessibility (WCAG AA compliant)
- User messages in federal navy blue (#1B263B), assistant messages in dark gray
- Professional dark mode typography with excellent readability
- Show 3-4 message bubbles with citations
- Subtle glow effects on interactive elements
- Include citation cards with good contrast

Style: Professional dark mode, government-grade accessibility
Aspect ratio: 3:2 (1200x800)
Quality: Production-ready, WCAG compliant`;

console.log('🌙 Retrying dark mode screenshot generation...\n');

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
    messages: [{ role: 'user', content: prompt }],
    modalities: ['image', 'text'],
    image_config: {
      aspect_ratio: '3:2',
      image_size: '2K'
    }
  })
});

if (!response.ok) {
  const error = await response.text();
  throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
}

const data = await response.json();
const message = data.choices[0].message;

if (!message.images || message.images.length === 0) {
  throw new Error('No image generated in response');
}

const imageUrl = message.images[0].image_url.url;
const base64Match = imageUrl.match(/^data:image\/\w+;base64,(.+)$/);

if (!base64Match) {
  throw new Error('Invalid base64 data URL');
}

const base64 = base64Match[1];
const buffer = Buffer.from(base64, 'base64');

const outputPath = join(process.cwd(), 'app/public/assets/screenshots/chat-interface-dark.webp');
await writeFile(outputPath, buffer);

console.log(`✅ Successfully generated: ${outputPath}`);
