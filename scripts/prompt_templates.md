# Prompt Templates - AI Marketing Engine

**Purpose:** Reusable prompt templates for generating conversion-focused content across platforms.

---

## LinkedIn Templates

### Short DM (2-3 sentences)

**Use Case:** Quick outreach, high volume  
**Length:** Max 150 words  
**Temperature:** 0.7

**Template:**
```
Generate a short LinkedIn DM (2-3 sentences) for [name] about Golo Čapo AI Marketing Studio launching 21.12.

Context:
- Their profile: [profile]
- Pain point: [pain]
- Offer: €149 founding customer deal (one-time + first month free)
- Link: https://www.golocapo.com/prelaunch

Requirements:
- Personal, not spammy
- Direct, clear value prop
- Include link
- Max 150 words
- Conversion-focused
```

**Example Input:**
- Name: "John"
- Profile: "Founder of SaaS startup"
- Pain: "spending hours on Meta posts"

**Example Output:**
```
Hey John! Saw you're building a SaaS startup. We're launching 21.12 — an AI tool that generates Meta-ready posts in seconds (not hours).

€149 founding deal (one-time + first month free). Limited to 10 spots.

https://www.golocapo.com/prelaunch
```

---

### Long DM (4-5 sentences)

**Use Case:** Personalized outreach, high-intent leads  
**Length:** Max 200 words  
**Temperature:** 0.7

**Template:**
```
Generate a personalized LinkedIn DM (4-5 sentences) for [name] about Golo Čapo AI Marketing Studio.

Context:
- Name: [name]
- Profile: [profile]
- Pain point: [pain]
- Why relevant: [relevance]
- Offer: €149 founding customer deal
- Link: https://www.golocapo.com/prelaunch

Requirements:
- Personalize based on their profile
- Address their specific pain point
- Clear value proposition
- Include link
- Max 200 words
- Conversion-focused
```

---

## Email Templates

### Subject Lines

**Use Case:** Cold email subject lines  
**Length:** Max 50 characters each  
**Temperature:** 0.8

**Template:**
```
Generate 5 email subject lines for cold outreach about Golo Čapo AI Marketing Studio launching 21.12.

Context:
- Product: AI Marketing Studio
- Launch: 21.12.2025
- Offer: €149 founding customer deal
- Target: [audience]

Requirements:
- Clear value prop
- Create urgency
- Max 50 characters each
- Conversion-focused
```

**Example Output:**
```
1. 21.12 Launch — Early Access
2. Founding Customer Deal: €149
3. Meta Posts in Seconds (Not Hours)
4. AI Marketing Tool Launching 21.12
5. Early Christmas Gift for Founders
```

---

### Email Body

**Use Case:** Cold email body  
**Length:** Max 150 words  
**Temperature:** 0.7

**Template:**
```
Generate a cold email for [name] about Golo Čapo AI Marketing Studio.

Context:
- Name: [name]
- Role: [role]
- Pain point: [pain]
- Offer: €149 founding customer deal
- Link: https://www.golocapo.com/prelaunch

Requirements:
- Professional but personal
- Address their pain point
- Clear value proposition
- Include CTA with link
- Max 150 words
- Conversion-focused
```

---

## Twitter/X Templates

**Use Case:** Social media posts  
**Length:** Max 280 characters  
**Temperature:** 0.8

**Template:**
```
Generate a Twitter/X post about Golo Čapo AI Marketing Studio launching 21.12.

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
```

**Example Output:**
```
Spending hours on Meta posts? We built an AI that does it in seconds. Launching 21.12.

€149 founding deal (one-time + first month free). Limited to 10 spots.

https://www.golocapo.com/prelaunch

#AIMarketing #MarketingAutomation
```

---

## Reddit Templates

**Use Case:** Community posts  
**Length:** Max 300 words  
**Temperature:** 0.7

**Template:**
```
Generate a Reddit post for [subreddit] about Golo Čapo AI Marketing Studio.

Context:
- Subreddit: [subreddit]
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
```

---

## Personalization Variables

### Available Context Variables

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

---

## Temperature Guidelines

**Sales-Optimized Temperatures:**

- **LinkedIn DMs:** 0.7 (personal but focused)
- **Email:** 0.7 (professional but personal)
- **Subject Lines:** 0.8 (creative but clear)
- **Twitter:** 0.8 (creative but concise)
- **Reddit:** 0.7 (value-focused, not spammy)

**Rationale:**
- Too low (< 0.5): Robotic, repetitive
- Too high (> 0.9): Unfocused, off-brand
- Sweet spot (0.7-0.8): Creative but conversion-focused

---

## Usage Examples

### Generate LinkedIn DM

```bash
node scripts/ai_marketing_engine.mjs linkedin "John" "Founder" "spending hours on Meta posts"
```

### Generate Email

```bash
node scripts/ai_marketing_engine.mjs email "Jane" "CEO" "marketing takes too long"
```

### Generate Twitter Post

```bash
node scripts/ai_marketing_engine.mjs twitter
```

### Batch Generate

```bash
node scripts/ai_marketing_engine.mjs batch "John" linkedin email twitter
```

---

## Best Practices

1. **Personalize:** Always include name and relevant context
2. **Focus on Pain:** Address specific pain points
3. **Clear CTA:** Always include link and next step
4. **Test:** Generate multiple variants, test what converts
5. **Track:** Monitor which prompts generate best results

---

## Integration

**Use in API:**
```javascript
import { generateLinkedInDM } from './scripts/ai_marketing_engine.mjs';

const result = await generateLinkedInDM({
  name: 'John',
  profile: 'Founder',
  pain: 'spending hours on Meta posts',
});
```

**Use in Automation:**
- n8n workflows
- Daily outreach scripts
- Lead follow-up sequences

---

**Remember:** One keyboard, infinite outreach. Automate everything.

