// Demo: Automated Marketing Content Generation API
// Generates posts, calendar, and follow-ups for local businesses

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_TEMPERATURE = parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7;

/**
 * Call OpenAI API
 */
async function callOpenAI(prompt, options = {}) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }
  
  const {
    temperature = OPENAI_TEMPERATURE,
    maxTokens = 2000,
    model = OPENAI_MODEL,
  } = options;
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: 'Si expertný copywriter pre lokálne podniky na Slovensku. Generuješ praktický, etický obsah v slovenčine. Obsah je krátky, jasný, zameraný na konverzie. Používaš lokálne hashtagy a CTA.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' },
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    return {
      content: JSON.parse(content),
      usage: data.usage,
      model: data.model,
    };
  } catch (error) {
    console.error('[Demo Generate] Error:', sanitizeForLogging({ message: error.message }));
    throw error;
  }
}

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'demo-generate', { maxRequests: 10, windowMs: 60000 });
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
    });
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { businessName, service, location, goal, tone, platforms } = req.body;
    
    if (!businessName || !service || !location || !goal || !tone || !platforms || platforms.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
      });
    }
    
    if (!OPENAI_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'AI generation not available. Using template fallback.',
      });
    }
    
    const toneMap = {
      pokojny: 'pokojný, dôstojný, rešpektujúci',
      profesionalny: 'profesionálny, dôveryhodný, spoľahlivý',
      energicky: 'energický, pozitívny, dynamický'
    };
    
    const goalMap = {
      dopyty: 'kontaktné formuláre',
      telefonaty: 'telefonáty',
      rezervacie: 'rezervácie',
      navstevy: 'návštevy'
    };
    
    const toneText = toneMap[tone] || toneMap.pokojny;
    const goalText = goalMap[goal] || 'kontakt';
    const platformText = platforms.includes('fb') ? 'Facebook/Instagram' : 'LinkedIn';
    
    const prompt = `Generuj marketingový obsah pre lokálny podnik v JSON formáte.

Podnik: ${businessName}
Služba: ${service}
Lokalita: ${location}
Cieľ: ${goalText}
Tón: ${toneText}
Platforma: ${platformText}

Vytvor JSON s týmito poľami:
{
  "posts": [
    {
      "id": 1,
      "text": "text príspevku (max 200 znakov, vrátane hashtagov a CTA)",
      "platform": "${platformText}"
    }
    ... (celkom 10 príspevkov)
  ],
  "calendar": [
    {
      "day": "Pondelok",
      "date": "DD.MM.YYYY",
      "post": "text príspevku",
      "platform": "${platformText}"
    }
    ... (celkom 7 dní)
  ],
  "followups": [
    {
      "type": "Neutrálny follow-up",
      "text": "text správy (max 100 slov)"
    },
    {
      "type": "Etický follow-up",
      "text": "text správy (max 100 slov)"
    },
    {
      "type": "Mierny follow-up",
      "text": "text správy (max 100 slov)"
    }
  ]
}

Požiadavky:
- Všetky texty v slovenčine
- Praktické, lokálne orientované
- Použi hashtagy: #${location.replace(/\s+/g, '')} #${service.replace(/\s+/g, '')}
- CTA: "Kontaktujte nás" alebo "Zavolajte"
- Tón: ${toneText}
- Etické, rešpektujúce
- Žiadny spam

Generuj JSON:`;
    
    const result = await callOpenAI(prompt, {
      temperature: 0.7,
      maxTokens: 2000,
    });
    
    return res.status(200).json({
      success: true,
      data: result.content,
      metadata: {
        model: result.model,
        usage: result.usage,
      },
    });
    
  } catch (error) {
    console.error('Demo Generate API error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to generate content. Please try again.',
    });
  }
}

