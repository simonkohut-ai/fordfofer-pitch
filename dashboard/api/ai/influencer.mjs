// 🦄 AI Influencer Generator API Endpoint - Vercel Serverless Function
// Generates complete Instagram AI influencer blueprint

import { withRateLimit } from '../utils/rateLimit.mjs';
import { setSecurityHeaders, getAllowedOrigin, validateInput, sanitizeForLogging } from '../utils/security.mjs';

async function influencerHandler(req, res) {
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

    // Build influencer execution-ready automation prompt
    const systemPrompt = `You are an expert AI influencer strategist. Generate a FULLY EXECUTION-READY Instagram AI influencer automation system as JSON.

CRITICAL SAFETY RULES:
- NEVER use copyrighted names (celebrities, brands, real people)
- NEVER create impersonations of real people
- Create ORIGINAL fictional characters only
- Use generic, non-trademarked names

Given a user prompt describing an influencer concept, return a structured JSON object with these exact fields. This is for IMMEDIATE EXECUTION - provide ready-to-use content TODAY:

{
  "identity": {
    "name": "Original fictional influencer name (not copyrighted)",
    "handleSuggestions": ["@handle1", "@handle2", "@handle3", "@handle4", "@handle5"],
    "bio": "Instagram bio (150 chars max, emoji-ready, link-in-bio CTA included)",
    "coreBelief": "Core belief or mission statement (1-2 sentences)",
    "personalityTraits": ["trait1", "trait2", "trait3", "trait4", "trait5"]
  },
  "visualPrompts": {
    "imagePrompts": [
      "Ultra-detailed image prompt 1 (face, lighting, outfit, vibe, ready for AI image models)",
      "Ultra-detailed image prompt 2",
      "Ultra-detailed image prompt 3",
      "Ultra-detailed image prompt 4",
      "Ultra-detailed image prompt 5"
    ],
    "reelVisualStyles": [
      "Reel visual style 1 (camera angle, motion, pacing, ready for video generation)",
      "Reel visual style 2",
      "Reel visual style 3"
    ]
  },
  "postReadyContent": {
    "captions": [
      {
        "text": "Ready-to-post caption text (short, medium, or long)",
        "type": "post",
        "length": "short"
      }
    ],
    "reelHooks": [
      "Reel hook 1 (first 2 seconds, attention-grabbing)",
      "Reel hook 2",
      "... exactly 30 hooks"
    ],
    "ctaEndings": [
      "CTA ending 1 (call-to-action for captions)",
      "CTA ending 2",
      "... exactly 30 CTAs"
    ]
  },
  "automationInstructions": {
    "imageGeneration": "Step-by-step guide: How to generate images (tool-agnostic, works with any AI image tool)",
    "reelGeneration": "Step-by-step guide: How to generate reels (tool-agnostic)",
    "postingCadence": "Exact posting times (specific hours, days, frequency)",
    "engagementRoutine": "15-minute daily engagement loop (what to do, step-by-step)",
    "growthLoop": "Comment strategy and follow strategy (specific tactics, target accounts, frequency)"
  },
  "monetization": {
    "digitalProducts": [
      {
        "name": "Product name",
        "description": "Product description",
        "price": "$XX"
      }
    ],
    "serviceOffer": {
      "name": "Service name",
      "description": "Service description",
      "price": "$XX"
    },
    "funnel": "Content → DM → Conversion funnel (step-by-step)",
    "first100Plan": "Plan to make first $100 (specific steps, timeline)"
  },
  "hashtagSets": [
    ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"]
  ],
  "postingSchedule": {
    "monday": "Content type and exact time",
    "tuesday": "Content type and exact time",
    "wednesday": "Content type and exact time",
    "thursday": "Content type and exact time",
    "friday": "Content type and exact time",
    "saturday": "Content type and exact time",
    "sunday": "Content type and exact time"
  }
}

REQUIREMENTS:
- Provide exactly 30 captions (mix of short/medium/long, tagged as post/reel/carousel)
- Provide exactly 30 reel hooks (first 2 seconds)
- Provide exactly 30 CTA endings
- Provide exactly 10 hashtag sets
- Provide exactly 3 digital product ideas
- All content must be ready to use TODAY
- NO copyrighted names or impersonations
- NO emojis unless explicitly requested by user
- NO motivational clichés or hype language
- NO generic phrases like "you got this" or "believe in yourself"
- Content must be execution-ready, professional, and conversion-focused

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
          { role: 'user', content: `Create a FULLY EXECUTION-READY Instagram AI influencer automation system for: ${prompt}. Remember: NO copyrighted names, NO impersonations, create original fictional character only.` }
        ],
        temperature: 0.8,
        max_tokens: 5000,
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
    let blueprint;
    try {
      blueprint = JSON.parse(jsonContent);
    } catch (parseError) {
      // If JSON parsing fails, try to extract JSON from markdown code blocks
      const jsonMatch = jsonContent.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/) || jsonContent.match(/(\{[\s\S]*\})/);
      if (jsonMatch) {
        blueprint = JSON.parse(jsonMatch[1]);
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
      return arr.map(item => {
        if (typeof item === 'string') return addWatermark(item);
        if (typeof item === 'object' && item.text) {
          return { ...item, text: addWatermark(item.text) };
        }
        return item;
      });
    };

    // Helper function to add watermark to text
    const addWatermark = (text) => {
      if (!text || typeof text !== 'string') return text;
      return text.trim().endsWith('🦄') ? text : text.trim() + ' 🦄';
    };
    
    // Helper function to watermark array of strings or objects with text property
    const watermarkArray = (arr) => {
      if (!Array.isArray(arr)) return arr;
      return arr.map(item => {
        if (typeof item === 'string') return addWatermark(item);
        if (typeof item === 'object' && item.text) {
          return { ...item, text: addWatermark(item.text) };
        }
        return item;
      });
    };

    // Ensure all required fields exist (backward compatible + new fields)
    const completeBlueprint = {
      identity: blueprint.identity ? {
        ...blueprint.identity,
        bio: blueprint.identity.bio ? addWatermark(blueprint.identity.bio) : blueprint.identity.bio,
        coreBelief: blueprint.identity.coreBelief ? addWatermark(blueprint.identity.coreBelief) : blueprint.identity.coreBelief
      } : {
        name: blueprint.persona?.name || 'AI Influencer',
        handleSuggestions: blueprint.persona?.handleSuggestions || ['@aiinfluencer', '@ai_creator', '@ai_content', '@ai_life', '@ai_vibes'],
        bio: addWatermark(blueprint.persona?.bio || 'AI-powered content creator ✨'),
        coreBelief: addWatermark(blueprint.persona?.coreBelief || 'Empowering through AI-generated content'),
        personalityTraits: blueprint.persona?.personalityTraits || ['Creative', 'Authentic', 'Engaging', 'Motivational', 'Innovative']
      },
      visualPrompts: blueprint.visualPrompts || {
        imagePrompts: blueprint.assetPrompts?.influencerImagePrompt ? [blueprint.assetPrompts.influencerImagePrompt] : ['Modern, professional portrait'],
        reelVisualStyles: blueprint.assetPrompts?.reelVisualTemplates || ['Dynamic, engaging video style']
      },
      postReadyContent: blueprint.postReadyContent ? {
        captions: watermarkArray(blueprint.postReadyContent.captions || []),
        reelHooks: watermarkArray(blueprint.postReadyContent.reelHooks || []),
        ctaEndings: watermarkArray(blueprint.postReadyContent.ctaEndings || [])
      } : {
        captions: watermarkArray(blueprint.readyToPostCaptions ? blueprint.readyToPostCaptions.map(c => ({ text: c, type: 'post', length: 'medium' })) : []),
        reelHooks: watermarkArray(blueprint.reelScripts ? blueprint.reelScripts.map(s => s.hook || 'Hook') : []),
        ctaEndings: watermarkArray(blueprint.reelScripts ? blueprint.reelScripts.map(s => s.cta || 'CTA') : [])
      },
      automationInstructions: blueprint.automationInstructions || {
        imageGeneration: blueprint.automationInstructions?.imageGeneration || 'Use AI image tools to generate influencer avatar',
        reelGeneration: blueprint.automationInstructions?.reelGeneration || 'Use AI video tools to create reels',
        postingCadence: blueprint.postingSchedule ? Object.values(blueprint.postingSchedule).join(', ') : 'Daily at optimal times',
        engagementRoutine: blueprint.automationInstructions?.engagementRoutine || '15-minute daily engagement loop',
        growthLoop: blueprint.automationInstructions?.growthLoop || 'Follow/comment strategy for growth'
      },
      monetization: blueprint.monetization ? {
        digitalProducts: blueprint.monetization.digitalProducts ? blueprint.monetization.digitalProducts.map(p => ({
          ...p,
          name: p.name ? addWatermark(p.name) : p.name,
          description: p.description ? addWatermark(p.description) : p.description
        })) : [],
        serviceOffer: blueprint.monetization.serviceOffer ? {
          ...blueprint.monetization.serviceOffer,
          name: blueprint.monetization.serviceOffer.name ? addWatermark(blueprint.monetization.serviceOffer.name) : blueprint.monetization.serviceOffer.name,
          description: blueprint.monetization.serviceOffer.description ? addWatermark(blueprint.monetization.serviceOffer.description) : blueprint.monetization.serviceOffer.description
        } : { name: addWatermark('Service'), description: addWatermark('Service description'), price: '$99' },
        funnel: blueprint.monetization.funnel ? addWatermark(blueprint.monetization.funnel) : addWatermark('Content → DM → Conversion funnel'),
        first100Plan: blueprint.monetization.first100Plan ? addWatermark(blueprint.monetization.first100Plan) : addWatermark('Plan to make first $100')
      } : {
        digitalProducts: [{ name: addWatermark('Digital Product'), description: addWatermark('Product description'), price: '$29' }],
        serviceOffer: { name: addWatermark('Service'), description: addWatermark('Service description'), price: '$99' },
        funnel: addWatermark('Content → DM → Conversion funnel'),
        first100Plan: addWatermark('Plan to make first $100')
      },
      hashtagSets: blueprint.hashtagSets || [],
      postingSchedule: blueprint.postingSchedule || {}
    };

    // Return formatted response
    return res.status(200).json({
      success: true,
      blueprint: completeBlueprint,
      metadata: {
        model: data.model,
        usage: data.usage
      }
    });
  } catch (error) {
    console.error('Influencer API error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to generate influencer system right now. Please try again.'
    });
  }
}

// Export with rate limiting
export default withRateLimit(influencerHandler);

