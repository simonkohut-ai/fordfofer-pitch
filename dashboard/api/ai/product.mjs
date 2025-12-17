// 🦄 Digital Product Builder API Endpoint - Vercel Serverless Function
// Generates complete digital product + sales system

import { withRateLimit } from '../utils/rateLimit.mjs';
import { setSecurityHeaders, getAllowedOrigin, validateInput, sanitizeForLogging } from '../utils/security.mjs';

async function productHandler(req, res) {
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
    const { prompt } = req.body;

    // Validate input
    const promptValidation = validateInput(prompt, {
      minLength: 3,
      maxLength: 2000,
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

    // Build digital product prompt
    const systemPrompt = `You are an expert digital product strategist. Generate a complete execution-ready digital product system as JSON.

Given a user prompt describing a digital product, return a structured JSON object with these exact fields:

{
  "product": {
    "name": "Product name",
    "type": "pdf" or "notion" or "service",
    "price": "$XX",
    "targetAudience": "Target audience description",
    "coreValue": "Core value proposition"
  },
  "productOutline": {
    "sections": [
      {
        "title": "Section title",
        "content": "Section content description"
      }
    ],
    "totalPages": 0,
    "deliverables": ["deliverable 1", "deliverable 2"]
  },
  "salesPageCopy": {
    "headline": "Main headline",
    "subheadline": "Subheadline",
    "benefits": ["benefit 1", "benefit 2", "benefit 3"],
    "socialProof": "Social proof statement",
    "pricing": "Pricing explanation",
    "cta": "Call-to-action text"
  },
  "bioCta": "Bio CTA text (for Instagram bio)",
  "dmCta": "DM CTA script (for outreach)",
  "funnelPlan": {
    "day1": "Day 1 action",
    "day7": "Day 7 action",
    "day30": "Day 30 action",
    "pathTo100": "Path to $100/day (specific steps)"
  }
}

REQUIREMENTS:
- Product outline must be detailed and actionable
- Sales page copy must be conversion-optimized
- Bio/DM CTAs must be clear and direct
- Funnel plan must include specific steps to $100/day
- No hype, no clichés, execution-ready only

Return ONLY valid JSON, no markdown, no code blocks.`;

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
          { role: 'user', content: `Create a complete execution-ready digital product system for: ${prompt}` }
        ],
        temperature: 0.8,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const jsonContent = data.choices?.[0]?.message?.content || '{}';
    
    // Parse JSON to validate
    let product;
    try {
      product = JSON.parse(jsonContent);
    } catch (parseError) {
      const jsonMatch = jsonContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || jsonContent.match(/(\{[\s\S]*\})/);
      if (jsonMatch) {
        product = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Invalid JSON response format');
      }
    }

    // Helper function to add watermark to text
    const addWatermark = (text) => {
      if (!text || typeof text !== 'string') return text;
      return text.trim().endsWith('🦄') ? text : text.trim() + ' 🦄';
    };
    
    // Helper function to watermark array of strings
    const watermarkArray = (arr) => {
      if (!Array.isArray(arr)) return arr;
      return arr.map(item => typeof item === 'string' ? addWatermark(item) : item);
    };

    // Ensure all required fields exist and apply watermarks
    const completeProduct = {
      product: product.product ? {
        ...product.product,
        name: product.product.name ? addWatermark(product.product.name) : product.product.name,
        coreValue: product.product.coreValue ? addWatermark(product.product.coreValue) : product.product.coreValue
      } : {
        name: addWatermark('Digital Product'),
        type: 'pdf',
        price: '$29',
        targetAudience: 'Solopreneurs',
        coreValue: addWatermark('Value proposition')
      },
      productOutline: product.productOutline ? {
        ...product.productOutline,
        sections: product.productOutline.sections ? product.productOutline.sections.map(s => ({
          ...s,
          title: s.title ? addWatermark(s.title) : s.title,
          content: s.content ? addWatermark(s.content) : s.content
        })) : [],
        deliverables: watermarkArray(product.productOutline.deliverables || [])
      } : {
        sections: [],
        totalPages: 0,
        deliverables: []
      },
      salesPageCopy: product.salesPageCopy ? {
        ...product.salesPageCopy,
        headline: product.salesPageCopy.headline ? addWatermark(product.salesPageCopy.headline) : product.salesPageCopy.headline,
        subheadline: product.salesPageCopy.subheadline ? addWatermark(product.salesPageCopy.subheadline) : product.salesPageCopy.subheadline,
        benefits: watermarkArray(product.salesPageCopy.benefits || []),
        socialProof: product.salesPageCopy.socialProof ? addWatermark(product.salesPageCopy.socialProof) : product.salesPageCopy.socialProof,
        pricing: product.salesPageCopy.pricing ? addWatermark(product.salesPageCopy.pricing) : product.salesPageCopy.pricing,
        cta: product.salesPageCopy.cta ? addWatermark(product.salesPageCopy.cta) : product.salesPageCopy.cta
      } : {
        headline: addWatermark('Product Headline'),
        subheadline: addWatermark('Subheadline'),
        benefits: [],
        socialProof: addWatermark('Social proof'),
        pricing: addWatermark('Pricing'),
        cta: addWatermark('Get Started')
      },
      bioCta: product.bioCta ? addWatermark(product.bioCta) : addWatermark('Get my free guide'),
      dmCta: product.dmCta ? addWatermark(product.dmCta) : addWatermark('DM me for details'),
      funnelPlan: product.funnelPlan ? {
        day1: product.funnelPlan.day1 ? addWatermark(product.funnelPlan.day1) : product.funnelPlan.day1,
        day7: product.funnelPlan.day7 ? addWatermark(product.funnelPlan.day7) : product.funnelPlan.day7,
        day30: product.funnelPlan.day30 ? addWatermark(product.funnelPlan.day30) : product.funnelPlan.day30,
        pathTo100: product.funnelPlan.pathTo100 ? addWatermark(product.funnelPlan.pathTo100) : product.funnelPlan.pathTo100
      } : {
        day1: addWatermark('Launch product'),
        day7: addWatermark('Scale marketing'),
        day30: addWatermark('Optimize funnel'),
        pathTo100: addWatermark('Path to $100/day')
      }
    };

    // Return formatted response
    return res.status(200).json({
      success: true,
      product: completeProduct,
      metadata: {
        model: data.model,
        usage: data.usage
      }
    });
  } catch (error) {
    console.error('Product API error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to generate product system right now. Please try again.'
    });
  }
}

// Export with rate limiting
export default withRateLimit(productHandler);

