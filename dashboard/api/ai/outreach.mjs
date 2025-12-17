// AI Outreach Generation API
// Generates personalized outreach messages using AI Marketing Engine

import { setSecurityHeaders } from '../utils/security.mjs';
import { sanitizeForLogging } from '../utils/security.mjs';
import { applyRateLimit } from '../utils/rateLimit.mjs';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_TEMPERATURE = parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7;

// Prompt templates
const PROMPT_TEMPLATES = {
  linkedin: {
    short: (context) => `Generate a short LinkedIn DM (2-3 sentences) for ${context.name || 'a founder'} about Golo Čapo AI Marketing Studio launching 21.12.

Context:
- Their profile: ${context.profile || 'founder/entrepreneur'}
- Pain point: ${context.pain || 'spending hours on Meta posts'}
- Offer: €149 founding customer deal (one-time + first month free)
- Link: https://www.golocapo.com/prelaunch

Requirements:
- Personal, not spammy
- Direct, clear value prop
- Include link
- Max 150 words
- Conversion-focused

Generate the DM:`,
    
    long: (context) => `Generate a personalized LinkedIn DM (4-5 sentences) for ${context.name || 'a founder'} about Golo Čapo AI Marketing Studio.

Context:
- Name: ${context.name || 'Founder'}
- Profile: ${context.profile || 'Founder/entrepreneur'}
- Pain point: ${context.pain || 'spending hours on Meta posts'}
- Why relevant: ${context.relevance || 'They do marketing manually'}
- Offer: €149 founding customer deal (one-time setup + first month free)
- Link: https://www.golocapo.com/prelaunch

Requirements:
- Personalize based on their profile
- Address their specific pain point
- Clear value proposition
- Include link
- Max 200 words
- Conversion-focused

Generate the personalized DM:`,
  },
  
  email: {
    subject: (context) => `Generate 5 email subject lines for cold outreach about Golo Čapo AI Marketing Studio launching 21.12.

Context:
- Product: AI Marketing Studio
- Launch: 21.12.2025
- Offer: €149 founding customer deal
- Target: ${context.audience || 'Founders/startups'}

Requirements:
- Clear value prop
- Create urgency
- Max 50 characters each
- Conversion-focused

Generate 5 subject lines (one per line):`,
    
    body: (context) => `Generate a cold email for ${context.name || 'a founder'} about Golo Čapo AI Marketing Studio.

Context:
- Name: ${context.name || 'Founder'}
- Role: ${context.role || 'Founder'}
- Pain point: ${context.pain || 'spending hours on Meta posts'}
- Offer: €149 founding customer deal (one-time setup + first month free)
- Link: https://www.golocapo.com/prelaunch

Requirements:
- Professional but personal
- Address their pain point
- Clear value proposition
- Include CTA with link
- Max 150 words
- Conversion-focused

Generate the email:`,
  },
  
  twitter: (context) => `Generate a Twitter/X post about Golo Čapo AI Marketing Studio launching 21.12.

Context:
- Product: AI Marketing Studio
- Value: Generate Meta-ready posts in seconds
- Launch: 21.12.2025
- Offer: €149 founding customer deal
- Link: https://www.golocapo.com/prelaunch

Requirements:
- Hook in first line
- Clear value prop
- Include link
- Max 280 characters
- Conversion-focused
- Use 1-2 relevant hashtags

Generate the tweet:`,
  
  reddit: (context) => `Generate a Reddit post for ${context.subreddit || 'r/entrepreneur'} about Golo Čapo AI Marketing Studio.

Context:
- Subreddit: ${context.subreddit || 'r/entrepreneur'}
- Product: AI Marketing Studio
- Value: Generate Meta-ready posts in seconds
- Launch: 21.12.2025
- Offer: €149 founding customer deal
- Link: https://www.golocapo.com/prelaunch

Requirements:
- Non-spammy, value-first
- Share problem/solution
- Include link naturally
- Max 300 words
- Conversion-focused
- Follow subreddit rules

Generate the Reddit post:`,
};

/**
 * Call OpenAI API with optimized settings for sales
 */
async function callOpenAI(prompt, options = {}) {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }
  
  const {
    temperature = OPENAI_TEMPERATURE,
    maxTokens = 500,
    model = OPENAI_MODEL,
  } = options;
  
  // Log prompt (sanitized)
  const sanitized = sanitizeForLogging({ promptLength: prompt.length });
  console.log('[AI Outreach] Generating content:', sanitized);
  
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
            content: 'You are an expert copywriter specializing in conversion-focused marketing. Generate content that drives action, not just engagement. Be direct, clear, and focused on outcomes.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature,
        max_tokens: maxTokens,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    // Log usage (sanitized)
    console.log('[AI Outreach] Tokens used:', data.usage?.total_tokens || 'N/A');
    
    return {
      content: content.trim(),
      usage: data.usage,
      model: data.model,
    };
  } catch (error) {
    console.error('[AI Outreach] Error:', sanitizeForLogging({ message: error.message }));
    throw error;
  }
}

export default async function handler(req, res) {
  setSecurityHeaders(res);
  
  // Rate limiting
  const rateLimitResult = await applyRateLimit(req, 'ai-outreach', { maxRequests: 20, windowMs: 60000 });
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
    const { platform, context = {}, type } = req.body;
    
    if (!platform) {
      return res.status(400).json({
        success: false,
        error: 'Platform is required (linkedin, email, twitter, reddit)',
      });
    }
    
    // Get template
    let template;
    let options = {};
    
    if (platform === 'linkedin') {
      template = PROMPT_TEMPLATES.linkedin[type || 'short'];
      options = { temperature: 0.7, maxTokens: 300 };
    } else if (platform === 'email') {
      if (type === 'subject') {
        template = PROMPT_TEMPLATES.email.subject;
        options = { temperature: 0.8, maxTokens: 200 };
      } else {
        template = PROMPT_TEMPLATES.email.body;
        options = { temperature: 0.7, maxTokens: 400 };
      }
    } else if (platform === 'twitter' || platform === 'x') {
      template = PROMPT_TEMPLATES.twitter;
      options = { temperature: 0.8, maxTokens: 150 };
    } else if (platform === 'reddit') {
      template = PROMPT_TEMPLATES.reddit;
      options = { temperature: 0.7, maxTokens: 500 };
    } else {
      return res.status(400).json({
        success: false,
        error: `Unsupported platform: ${platform}. Supported: linkedin, email, twitter, reddit`,
      });
    }
    
    // Generate prompt
    const prompt = template(context);
    
    // Call OpenAI
    const result = await callOpenAI(prompt, options);
    
    return res.status(200).json({
      success: true,
      content: result.content,
      platform,
      type: type || 'default',
      metadata: {
        model: result.model,
        usage: result.usage,
      },
    });
    
  } catch (error) {
    console.error('AI Outreach API error:', sanitizeForLogging({ message: error.message }));
    return res.status(500).json({
      success: false,
      error: 'Unable to generate content. Please try again.',
    });
  }
}

