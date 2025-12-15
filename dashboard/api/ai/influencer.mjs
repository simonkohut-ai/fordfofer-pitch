// 🦄 AI Influencer Generator API Endpoint - Vercel Serverless Function
// Generates complete Instagram AI influencer blueprint

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

    // Ensure all required fields exist (backward compatible + new fields)
    const completeBlueprint = {
      identity: blueprint.identity || {
        name: blueprint.persona?.name || 'AI Influencer',
        handleSuggestions: ['@aiinfluencer', '@ai_creator', '@ai_content', '@ai_life', '@ai_vibes'],
        bio: blueprint.persona?.bio || blueprint.persona?.bio || 'AI-powered content creator ✨',
        coreBelief: blueprint.persona?.coreBelief || 'Empowering through AI-generated content',
        personalityTraits: blueprint.persona?.personalityTraits || ['Creative', 'Authentic', 'Engaging', 'Motivational', 'Innovative']
      },
      visualPrompts: blueprint.visualPrompts || {
        imagePrompts: blueprint.assetPrompts?.influencerImagePrompt ? [blueprint.assetPrompts.influencerImagePrompt] : ['Modern, professional portrait'],
        reelVisualStyles: blueprint.assetPrompts?.reelVisualTemplates || ['Dynamic, engaging video style']
      },
      postReadyContent: blueprint.postReadyContent || {
        captions: blueprint.readyToPostCaptions ? blueprint.readyToPostCaptions.map(c => ({ text: c, type: 'post', length: 'medium' })) : [],
        reelHooks: blueprint.reelScripts ? blueprint.reelScripts.map(s => s.hook || 'Hook') : [],
        ctaEndings: blueprint.reelScripts ? blueprint.reelScripts.map(s => s.cta || 'CTA') : []
      },
      automationInstructions: blueprint.automationInstructions || {
        imageGeneration: blueprint.automationInstructions?.imageGeneration || 'Use AI image tools to generate influencer avatar',
        reelGeneration: blueprint.automationInstructions?.reelGeneration || 'Use AI video tools to create reels',
        postingCadence: blueprint.postingSchedule ? Object.values(blueprint.postingSchedule).join(', ') : 'Daily at optimal times',
        engagementRoutine: blueprint.automationInstructions?.engagementRoutine || '15-minute daily engagement loop',
        growthLoop: blueprint.automationInstructions?.growthLoop || 'Follow/comment strategy for growth'
      },
      monetization: blueprint.monetization || {
        digitalProducts: [{ name: 'Digital Product', description: 'Product description', price: '$29' }],
        serviceOffer: { name: 'Service', description: 'Service description', price: '$99' },
        funnel: 'Content → DM → Conversion funnel',
        first100Plan: 'Plan to make first $100'
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
    console.error('Influencer API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Influencer generation failed'
    });
  }
}

