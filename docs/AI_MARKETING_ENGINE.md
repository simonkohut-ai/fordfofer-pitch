# AI Marketing Automation Engine

**Goal:** One keyboard, infinite outreach  
**Status:** Production Ready  
**Focus:** Automate lead capture, generate personalized outreach, reuse content

---

## Overview

The AI Marketing Engine automates:
1. **Lead Capture** → Confirmation emails → Operator alerts
2. **Outreach Generation** → Personalized DMs/emails → Multi-platform content
3. **Content Reuse** → One prompt → Multiple platforms

---

## Core Components

### 1. Lead Automation (Already Implemented)

**Location:** `dashboard/api/leads/submit.mjs`

**What It Does:**
- Captures email from prelaunch form
- Validates email and consent
- Stores lead in database
- Sends confirmation email to lead
- Sends notification email to operator (if configured)

**Status:** ✅ Complete

---

### 2. AI Content Generation

**Location:** `scripts/ai_marketing_engine.mjs`

**What It Does:**
- Generates personalized LinkedIn DMs
- Generates cold emails (subject + body)
- Generates Twitter/X posts
- Generates Reddit posts
- Batch generates for multiple platforms

**Features:**
- OpenAI integration (optimized for sales)
- Prompt templates for each platform
- Temperature optimization
- Prompt logging
- Usage tracking

**Status:** ✅ Complete

---

### 3. Prompt Templates

**Location:** `scripts/prompt_templates.md`

**What It Contains:**
- LinkedIn DM templates (short + long)
- Email templates (subject + body)
- Twitter/X templates
- Reddit templates
- Personalization variables
- Temperature guidelines

**Status:** ✅ Complete

---

## OpenAI Integration

### Configuration

**Environment Variables:**
```bash
OPENAI_API_KEY=sk-xxxxx          # Required
OPENAI_MODEL=gpt-4o-mini        # Default: gpt-4o-mini
OPENAI_TEMPERATURE=0.7           # Default: 0.7 (sales-optimized)
```

### Temperature Optimization

**Sales-Optimized Settings:**

- **LinkedIn DMs:** 0.7 (personal but focused)
- **Email:** 0.7 (professional but personal)
- **Subject Lines:** 0.8 (creative but clear)
- **Twitter:** 0.8 (creative but concise)
- **Reddit:** 0.7 (value-focused, not spammy)

**Rationale:**
- Too low (< 0.5): Robotic, repetitive
- Too high (> 0.9): Unfocused, off-brand
- Sweet spot (0.7-0.8): Creative but conversion-focused

### Prompt Logging

**What Gets Logged:**
- Prompt length
- Tokens used
- Model used
- Errors (sanitized)

**What Doesn't Get Logged:**
- Full prompts (privacy)
- API keys
- Personal information

---

## Usage

### CLI Interface

**Generate LinkedIn DM:**
```bash
node scripts/ai_marketing_engine.mjs linkedin "John" "Founder" "spending hours on Meta posts"
```

**Generate Email:**
```bash
node scripts/ai_marketing_engine.mjs email "Jane" "CEO" "marketing takes too long"
```

**Generate Twitter Post:**
```bash
node scripts/ai_marketing_engine.mjs twitter
```

**Generate Reddit Post:**
```bash
node scripts/ai_marketing_engine.mjs reddit r/entrepreneur
```

**Batch Generate:**
```bash
node scripts/ai_marketing_engine.mjs batch "John" linkedin email twitter
```

---

### API Integration

**Import and Use:**
```javascript
import { generateLinkedInDM, generateEmail } from './scripts/ai_marketing_engine.mjs';

// Generate LinkedIn DM
const dm = await generateLinkedInDM({
  name: 'John',
  profile: 'Founder of SaaS startup',
  pain: 'spending hours on Meta posts',
}, 'short');

console.log(dm.content);

// Generate Email
const email = await generateEmail({
  name: 'Jane',
  role: 'CEO',
  pain: 'marketing takes too long',
});

console.log(email.content);
```

---

### Automation Integration

**n8n Workflow:**
1. Trigger: New lead captured
2. Generate personalized DM using AI engine
3. Send DM via LinkedIn API (or copy to clipboard)
4. Track in database

**Daily Outreach Script:**
1. Load list of prospects
2. For each prospect:
   - Generate personalized DM
   - Copy to clipboard
   - Open LinkedIn
   - Paste and send
3. Track sent messages

---

## Personalization

### Context Variables

**Basic:**
- `name` - Recipient's name
- `profile` - Their LinkedIn/profile description
- `role` - Their job title/role
- `company` - Their company name

**Pain Points:**
- `pain` - Their specific pain point
- `relevance` - Why this is relevant to them
- `audience` - Target audience segment

**Offer:**
- `offer` - Current offer (default: €149 founding deal)
- `link` - CTA link (default: /prelaunch)
- `scarcity` - Scarcity element (default: "Limited to 10 spots")

### Personalization Examples

**High Personalization:**
```javascript
{
  name: 'John',
  profile: 'Founder of SaaS startup, posts about marketing automation',
  pain: 'spending 10+ hours per week on Meta posts',
  relevance: 'They post about marketing automation, this is directly relevant',
}
```

**Medium Personalization:**
```javascript
{
  name: 'Jane',
  role: 'CEO',
  pain: 'marketing takes too long',
  audience: 'Founders/startups',
}
```

**Low Personalization:**
```javascript
{
  audience: 'Founders/startups',
}
```

---

## Content Reuse

### One Prompt → Multiple Platforms

**Example:**
```bash
# Generate for all platforms at once
node scripts/ai_marketing_engine.mjs batch "John" linkedin email twitter reddit
```

**Output:**
- LinkedIn DM (personalized)
- Email (subject + body)
- Twitter post (concise)
- Reddit post (value-focused)

**Benefits:**
- Consistent messaging
- Platform-optimized
- Time-saving
- Scalable

---

## Automation Workflows

### Workflow 1: Lead → Outreach

**Trigger:** New lead captured  
**Actions:**
1. Generate personalized LinkedIn DM
2. Generate personalized email
3. Copy DM to clipboard
4. Send email automatically (or queue)
5. Track in database

**Implementation:**
- n8n workflow
- Or PowerShell script
- Or Node.js script

---

### Workflow 2: Daily Outreach

**Trigger:** Daily (9 AM)  
**Actions:**
1. Load prospect list (CSV/spreadsheet)
2. For each prospect:
   - Generate personalized DM
   - Copy to clipboard
   - Open LinkedIn
   - Paste and send
3. Track sent messages
4. Generate report

**Implementation:**
- PowerShell script
- Or Node.js script
- Or n8n workflow

---

### Workflow 3: Content Generation

**Trigger:** Manual or scheduled  
**Actions:**
1. Generate Twitter post
2. Generate LinkedIn post
3. Generate Reddit post
4. Copy all to clipboard
5. Ready to paste and post

**Implementation:**
- CLI script
- Or API endpoint
- Or n8n workflow

---

## API Endpoints (Future)

### `/api/ai/generate-outreach`

**POST** `/api/ai/generate-outreach`

**Body:**
```json
{
  "platform": "linkedin",
  "context": {
    "name": "John",
    "profile": "Founder",
    "pain": "spending hours on Meta posts"
  }
}
```

**Response:**
```json
{
  "success": true,
  "content": "Generated DM...",
  "usage": {
    "total_tokens": 150
  }
}
```

**Status:** ⚠️ To be implemented

---

## Cost Optimization

### Token Usage

**Average Tokens per Generation:**
- LinkedIn DM (short): ~100-150 tokens
- Email: ~200-300 tokens
- Twitter: ~50-100 tokens
- Reddit: ~300-500 tokens

**Cost Estimate (gpt-4o-mini):**
- $0.15 per 1M input tokens
- $0.60 per 1M output tokens
- Average: ~$0.001 per LinkedIn DM

**Monthly Estimate:**
- 100 DMs/day = 3,000/month
- Cost: ~$3/month

---

## Best Practices

### 1. Personalize Always

**Do:**
- Include name
- Reference their profile
- Address specific pain point

**Don't:**
- Generic messages
- Copy-paste spam
- Ignore context

---

### 2. Test and Iterate

**Do:**
- Generate multiple variants
- Test what converts
- Track results
- Optimize prompts

**Don't:**
- Use same prompt forever
- Ignore conversion data
- Stop testing

---

### 3. Monitor Quality

**Do:**
- Review generated content
- Check for accuracy
- Ensure brand consistency
- Track conversions

**Don't:**
- Blind automation
- No quality checks
- Ignore feedback

---

## Troubleshooting

### OpenAI API Errors

**Error: "API key not configured"**
- Check `OPENAI_API_KEY` env var
- Verify key is valid
- Check API quota

**Error: "Rate limit exceeded"**
- Reduce request frequency
- Implement retry logic
- Upgrade OpenAI plan

**Error: "Invalid model"**
- Check `OPENAI_MODEL` env var
- Use supported model (gpt-4o-mini, gpt-4, etc.)

---

### Content Quality Issues

**Too Generic:**
- Increase personalization
- Add more context
- Lower temperature

**Too Creative:**
- Lower temperature
- Add more constraints
- Refine prompt

**Off-Brand:**
- Update system prompt
- Add brand guidelines
- Review examples

---

## Next Steps

### Immediate
1. Set up `OPENAI_API_KEY` env var
2. Test CLI commands
3. Generate first batch of content

### Short-term
1. Integrate with n8n workflows
2. Create daily outreach script
3. Set up automation

### Long-term
1. Build API endpoints
2. Create dashboard UI
3. Add analytics tracking

---

## Resources

- **Engine Script:** `scripts/ai_marketing_engine.mjs`
- **Prompt Templates:** `scripts/prompt_templates.md`
- **This Document:** `docs/AI_MARKETING_ENGINE.md`

---

**Remember:** One keyboard, infinite outreach. Automate everything.

