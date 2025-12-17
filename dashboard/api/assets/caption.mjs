// Caption generation API
// Returns formatted 3-line caption

import { setSecurityHeaders } from '../utils/security.mjs';

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { brandName, song, date } = req.body;
    
    if (!brandName || !song || !date) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: brandName, song, date',
      });
    }
    
    // LOCKED TEASER COPY - NO VARIATIONS
    // Exact format: Golo Čapo\nPTK – Někdo půjde z kola ven\n21.12
    // No period after date, no CTA, no extras
    const lockedCaption = `Golo Čapo\nPTK – Někdo půjde z kola ven\n21.12`;
    
    // Return locked copy regardless of input (for consistency)
    const caption = lockedCaption;
    
    return res.status(200).json({
      success: true,
      caption,
    });
    
  } catch (error) {
    console.error('Caption generation error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate caption',
    });
  }
}

