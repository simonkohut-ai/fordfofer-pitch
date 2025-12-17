// Create OG image (1200x630) using Node Canvas or similar
// For now, creates instructions for manual creation

const fs = require('fs');
const path = require('path');

const instructions = `
OG Image Creation Instructions (1200x630px):

1. Background: Dark (#0B0B12) with subtle purple/pink gradient glow
   - Radial gradient from center: rgba(192, 128, 176, 0.15) fading to transparent

2. Logo: Centered or left-aligned, size ~200x200px
   - Use assets/brand/logo.svg converted to PNG

3. Text:
   - "Golo Čapo" - Large, gradient text (brand colors)
   - "21.12" - Smaller, below or to the right
   - Font: System font stack, bold
   - Color: rgba(255, 255, 255, 0.92)

4. Style: Minimal, premium, mysterious
   - Keep lots of negative space
   - Subtle glow effects

Save as: assets/brand/og.png (1200x630px)
`;

fs.writeFileSync(path.join(__dirname, 'og-image-instructions.txt'), instructions);
console.log('OG image instructions created. See og-image-instructions.txt');

