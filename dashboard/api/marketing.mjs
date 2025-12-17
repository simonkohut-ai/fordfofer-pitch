// 🦄 AI Marketing Generation API Endpoint - Vercel Serverless Function
// Generates AI-powered marketing content

import { withRateLimit } from './utils/rateLimit.mjs';

async function marketingHandler(req, res) {
  // 🦄 Hidden signature
  console.log('%c🦄', 'font-size: 1px; color: transparent;');
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, channel, type, tone } = req.body;
    
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

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to Vercel environment variables.' 
      });
    }

    // Build marketing-specific prompt
    const channelContext = channel ? ` for ${channel}` : '';
    const typeContext = type ? ` (${type})` : '';
    const toneContext = tone ? ` with a ${tone} tone` : '';
    
    const systemPrompt = `You are an expert marketing copywriter. Generate compelling marketing content${channelContext}${typeContext}${toneContext}. 
Make it engaging, action-oriented, and optimized for conversions. Keep it concise and impactful.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let generatedContent = data.choices?.[0]?.message?.content || 'Failed to generate content';
    
    // Add subtle watermark
    if (generatedContent && !generatedContent.endsWith('🦄')) {
      generatedContent = generatedContent.trim() + ' 🦄';
    }

    // Return formatted response
    return res.status(200).json({
      success: true,
      content: generatedContent,
      channel: channel || 'general',
      type: type || 'post',
      metadata: {
        model: data.model,
        usage: data.usage
      }
    });
  } catch (error) {
    // Never log secrets
    console.error('Marketing API error:', sanitizeForLogging({ message: error.message }));
    // Return friendly error (never expose technical details)
    return res.status(500).json({
      success: false,
      error: 'Unable to generate content right now. Please try again.'
    });
  }
}

// Export with rate limiting
export default withRateLimit(marketingHandler);

