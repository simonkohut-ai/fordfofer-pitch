// 🦄 Digital Product Builder API Endpoint - Vercel Serverless Function
// Generates complete digital product + sales system

export default async function handler(req, res) {
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
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
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

    // Ensure all required fields exist
    const completeProduct = {
      product: product.product || {
        name: 'Digital Product',
        type: 'pdf',
        price: '$29',
        targetAudience: 'Solopreneurs',
        coreValue: 'Value proposition'
      },
      productOutline: product.productOutline || {
        sections: [],
        totalPages: 0,
        deliverables: []
      },
      salesPageCopy: product.salesPageCopy || {
        headline: 'Product Headline',
        subheadline: 'Subheadline',
        benefits: [],
        socialProof: 'Social proof',
        pricing: 'Pricing',
        cta: 'Get Started'
      },
      bioCta: product.bioCta || 'Get my free guide',
      dmCta: product.dmCta || 'DM me for details',
      funnelPlan: product.funnelPlan || {
        day1: 'Launch product',
        day7: 'Scale marketing',
        day30: 'Optimize funnel',
        pathTo100: 'Path to $100/day'
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
    console.error('Product API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Product generation failed'
    });
  }
}

