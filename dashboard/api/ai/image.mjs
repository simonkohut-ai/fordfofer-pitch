// 🦄 AI Image Generation API Endpoint - Vercel Serverless Function
// Generates images using OpenAI DALL-E

import { withRateLimit } from '../utils/rateLimit.mjs';
import { setSecurityHeaders, getAllowedOrigin, validateInput, sanitizeForLogging } from '../utils/security.mjs';

async function imageHandler(req, res) {
  // 🦄 Hidden signature
  console.log('%c🦄', 'font-size: 1px; color: transparent;');
  
  // Security headers
  setSecurityHeaders(res);
  
  // CORS (same-origin only in production)
  const allowedOrigin = getAllowedOrigin(req);
  if (allowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, size = '1024x1024', style = 'natural' } = req.body;

    // Validate input
    const promptValidation = validateInput(prompt, {
      minLength: 3,
      maxLength: 1000,
      allowEmpty: false,
    });
    
    if (!promptValidation.valid) {
      return res.status(400).json({
        success: false,
        error: promptValidation.error
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to Vercel environment variables.' 
      });
    }

    // Validate size (DALL-E 3 supports: 1024x1024, 1792x1024, 1024x1792)
    const validSizes = ['1024x1024', '1792x1024', '1024x1792'];
    const imageSize = validSizes.includes(size) ? size : '1024x1024';

    // Call OpenAI DALL-E 3 API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: imageSize,
        quality: 'standard',
        style: style
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.data?.[0]?.url;

    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI');
    }

    // Return image URL
    return res.status(200).json({
      success: true,
      imageUrl: imageUrl,
      revisedPrompt: data.data?.[0]?.revised_prompt || prompt,
      metadata: {
        model: 'dall-e-3',
        size: imageSize
      }
    });
  } catch (error) {
    console.error('Image API error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to generate image right now. Please try again.'
    });
  }
}

// Export with rate limiting
export default withRateLimit(imageHandler);

