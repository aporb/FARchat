#!/usr/bin/env node

import { writeFile } from 'fs/promises';
import { join } from 'path';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'google/gemini-3-pro-image-preview';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const prompt = `Create a professional screenshot of a chat application in dark mode.

Requirements:
- Dark background (#0F172A)
- Clean, modern interface
- Conversation view with messages
- Professional government aesthetic
- High contrast for readability
- Aspect ratio 3:2
- 2K resolution`;

console.log('🌙 Trying simplified dark mode screenshot...\n');

const response = await fetch(API_URL, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
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

const data = await response.json();
console.log('Response received');

if (data.choices && data.choices[0] && data.choices[0].message) {
  const message = data.choices[0].message;
  
  if (message.images && message.images.length > 0) {
    const imageUrl = message.images[0].image_url.url;
    const base64Match = imageUrl.match(/^data:image\/\w+;base64,(.+)$/);
    
    if (base64Match) {
      const buffer = Buffer.from(base64Match[1], 'base64');
      const outputPath = join(process.cwd(), 'app/public/assets/screenshots/chat-interface-dark.webp');
      await writeFile(outputPath, buffer);
      console.log(`✅ Success: ${outputPath}`);
    } else {
      console.error('❌ Invalid image format');
    }
  } else {
    console.error('❌ No images in response');
    console.log('Response:', JSON.stringify(message, null, 2));
  }
} else {
  console.error('❌ Unexpected response structure');
  console.log('Full response:', JSON.stringify(data, null, 2));
}
