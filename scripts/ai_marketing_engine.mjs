#!/usr/bin/env node
/**
 * AI Marketing Automation Engine
 * One keyboard, infinite outreach.
 * 
 * Automates: Lead capture, confirmation emails, operator alerts
 * Generates: Personalized outreach messages (LinkedIn, Email, Twitter/X, Reddit)
 * Reuses: Content across platforms
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_TEMPERATURE = parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7;

// Prompt templates for different platforms
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
  console.log('[AI Engine] Generating content...');
  console.log('[AI Engine] Prompt length:', prompt.length);
  
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
        temperature, // Optimized for sales: 0.7 (creative but focused)
        max_tokens: maxTokens,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || '';
    
    // Log usage
    console.log('[AI Engine] Tokens used:', data.usage?.total_tokens || 'N/A');
    
    return {
      content: content.trim(),
      usage: data.usage,
      model: data.model,
    };
  } catch (error) {
    console.error('[AI Engine] Error:', error.message);
    throw error;
  }
}

/**
 * Generate LinkedIn DM
 */
export async function generateLinkedInDM(context, type = 'short') {
  const template = PROMPT_TEMPLATES.linkedin[type] || PROMPT_TEMPLATES.linkedin.short;
  const prompt = template(context);
  
  return await callOpenAI(prompt, {
    temperature: 0.7, // Personal but focused
    maxTokens: 300,
  });
}

/**
 * Generate email
 */
export async function generateEmail(context, type = 'body') {
  if (type === 'subject') {
    const prompt = PROMPT_TEMPLATES.email.subject(context);
    return await callOpenAI(prompt, {
      temperature: 0.8, // More creative for subject lines
      maxTokens: 200,
    });
  }
  
  const prompt = PROMPT_TEMPLATES.email.body(context);
  return await callOpenAI(prompt, {
    temperature: 0.7, // Professional but personal
    maxTokens: 400,
  });
}

/**
 * Generate Twitter/X post
 */
export async function generateTwitterPost(context) {
  const prompt = PROMPT_TEMPLATES.twitter(context);
  
  return await callOpenAI(prompt, {
    temperature: 0.8, // Creative but concise
    maxTokens: 150,
  });
}

/**
 * Generate Reddit post
 */
export async function generateRedditPost(context) {
  const prompt = PROMPT_TEMPLATES.reddit(context);
  
  return await callOpenAI(prompt, {
    temperature: 0.7, // Value-focused, not spammy
    maxTokens: 500,
  });
}

/**
 * Generate personalized outreach message
 * Automatically selects best platform and personalizes
 */
export async function generateOutreach(context) {
  const {
    platform = 'linkedin',
    name,
    profile,
    pain,
    relevance,
  } = context;
  
  // Build context object
  const ctx = {
    name,
    profile,
    pain,
    relevance,
    audience: context.audience || 'Founders/startups',
  };
  
  switch (platform.toLowerCase()) {
    case 'linkedin':
      return await generateLinkedInDM(ctx, context.type || 'short');
    case 'email':
      return await generateEmail(ctx, context.type || 'body');
    case 'twitter':
    case 'x':
      return await generateTwitterPost(ctx);
    case 'reddit':
      return await generateRedditPost({
        ...ctx,
        subreddit: context.subreddit || 'r/entrepreneur',
      });
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

/**
 * Batch generate content for multiple platforms
 */
export async function generateMultiPlatform(context) {
  const platforms = context.platforms || ['linkedin', 'email', 'twitter'];
  const results = {};
  
  for (const platform of platforms) {
    try {
      results[platform] = await generateOutreach({
        ...context,
        platform,
      });
    } catch (error) {
      console.error(`[AI Engine] Error generating ${platform}:`, error.message);
      results[platform] = { error: error.message };
    }
  }
  
  return results;
}

/**
 * CLI interface
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set');
    process.exit(1);
  }
  
  if (command === 'linkedin') {
    const name = args[1] || 'Founder';
    const profile = args[2] || 'Founder/entrepreneur';
    const pain = args[3] || 'spending hours on Meta posts';
    
    console.log('📝 Generating LinkedIn DM...');
    const result = await generateLinkedInDM({ name, profile, pain }, 'short');
    console.log('\n✅ Generated LinkedIn DM:\n');
    console.log(result.content);
    
  } else if (command === 'email') {
    const name = args[1] || 'Founder';
    const role = args[2] || 'Founder';
    const pain = args[3] || 'spending hours on Meta posts';
    
    console.log('📧 Generating email...');
    const result = await generateEmail({ name, role, pain });
    console.log('\n✅ Generated Email:\n');
    console.log(result.content);
    
  } else if (command === 'twitter') {
    console.log('🐦 Generating Twitter post...');
    const result = await generateTwitterPost({});
    console.log('\n✅ Generated Tweet:\n');
    console.log(result.content);
    
  } else if (command === 'reddit') {
    const subreddit = args[1] || 'r/entrepreneur';
    console.log(`📱 Generating Reddit post for ${subreddit}...`);
    const result = await generateRedditPost({ subreddit });
    console.log('\n✅ Generated Reddit Post:\n');
    console.log(result.content);
    
  } else if (command === 'batch') {
    const name = args[1] || 'Founder';
    const platforms = args.slice(2) || ['linkedin', 'email', 'twitter'];
    
    console.log(`🚀 Generating content for ${platforms.join(', ')}...`);
    const results = await generateMultiPlatform({ name, platforms });
    
    console.log('\n✅ Generated Content:\n');
    for (const [platform, result] of Object.entries(results)) {
      console.log(`\n--- ${platform.toUpperCase()} ---`);
      if (result.error) {
        console.error(`Error: ${result.error}`);
      } else {
        console.log(result.content);
      }
    }
    
  } else {
    console.log(`
🤖 AI Marketing Automation Engine

Usage:
  node ai_marketing_engine.mjs <command> [args]

Commands:
  linkedin [name] [profile] [pain]  Generate LinkedIn DM
  email [name] [role] [pain]        Generate email
  twitter                            Generate Twitter post
  reddit [subreddit]                 Generate Reddit post
  batch [name] [platforms...]      Generate for multiple platforms

Examples:
  node ai_marketing_engine.mjs linkedin "John" "Founder" "spending hours on Meta posts"
  node ai_marketing_engine.mjs email "Jane" "CEO" "marketing takes too long"
  node ai_marketing_engine.mjs batch "John" linkedin email twitter

Environment Variables:
  OPENAI_API_KEY      OpenAI API key (required)
  OPENAI_MODEL        Model to use (default: gpt-4o-mini)
  OPENAI_TEMPERATURE  Temperature (default: 0.7)
    `);
  }
}

// Run CLI if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default {
  generateLinkedInDM,
  generateEmail,
  generateTwitterPost,
  generateRedditPost,
  generateOutreach,
  generateMultiPlatform,
};

