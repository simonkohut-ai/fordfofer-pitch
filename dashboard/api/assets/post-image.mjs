// Image generation API
// Returns PNG image (server-side SVG to PNG conversion)

import { setSecurityHeaders } from '../utils/security.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { brandName, song, date, theme, size } = req.body;
    
    if (!brandName || !song || !date || !size) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: brandName, song, date, size',
      });
    }
    
    // Parse size (e.g., "1080x1350")
    const [width, height] = size.split('x').map(Number);
    if (!width || !height) {
      return res.status(400).json({
        success: false,
        error: 'Invalid size format. Use "WIDTHxHEIGHT" (e.g., "1080x1350")',
      });
    }
    
    // Generate SVG (simple, no external dependencies)
    const svg = generatePromoImageSVG(brandName, song, date, theme || 'Dark Minimal', width, height);
    
    // Return SVG with proper headers
    // Note: Browsers can download SVG and convert to PNG if needed
    // For true PNG, use sharp/canvas library (adds dependencies)
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Content-Disposition', `attachment; filename="promo-${size}.svg"`);
    res.setHeader('Cache-Control', 'no-cache');
    
    return res.status(200).send(svg);
    
  } catch (error) {
    console.error('Image generation error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate image',
    });
  }
}

function generatePromoImageSVG(brandName, song, date, theme, width, height) {
  // Theme colors
  const themes = {
    'Dark Minimal': {
      bg: '#0f172a',
      text: '#f1f5f9',
      accent: '#667eea',
    },
    'Neon': {
      bg: '#1a0033',
      text: '#00ff88',
      accent: '#ff00ff',
    },
    'Clean': {
      bg: '#ffffff',
      text: '#1e293b',
      accent: '#667eea',
    },
  };
  
  const colors = themes[theme] || themes['Dark Minimal'];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${colors.bg}"/>
  <text x="${width / 2}" y="${height / 2 - 60}" 
        font-family="Arial, sans-serif" 
        font-size="${Math.min(width, height) / 8}" 
        font-weight="bold" 
        fill="${colors.text}" 
        text-anchor="middle"
        dominant-baseline="middle">${escapeXml(brandName)}</text>
  <text x="${width / 2}" y="${height / 2}" 
        font-family="Arial, sans-serif" 
        font-size="${Math.min(width, height) / 12}" 
        fill="${colors.accent}" 
        text-anchor="middle"
        dominant-baseline="middle">${escapeXml(song)}</text>
  <text x="${width / 2}" y="${height / 2 + 60}" 
        font-family="Arial, sans-serif" 
        font-size="${Math.min(width, height) / 10}" 
        font-weight="bold" 
        fill="${colors.text}" 
        text-anchor="middle"
        dominant-baseline="middle">${escapeXml(date)}</text>
</svg>`;
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

