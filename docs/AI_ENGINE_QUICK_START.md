# AI Marketing Engine - Quick Start

**Goal:** Generate personalized outreach in seconds  
**Time:** 5 minutes to first message

---

## Setup (One-Time)

### 1. Set OpenAI API Key

**Vercel:**
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add `OPENAI_API_KEY` = `sk-xxxxx`
3. (Optional) Add `OPENAI_MODEL` = `gpt-4o-mini`
4. (Optional) Add `OPENAI_TEMPERATURE` = `0.7`
5. Redeploy

**Local:**
```powershell
$env:OPENAI_API_KEY = "sk-xxxxx"
```

---

## Usage

### Option 1: CLI (Local)

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

**Batch Generate:**
```bash
node scripts/ai_marketing_engine.mjs batch "John" linkedin email twitter
```

---

### Option 2: API Endpoint

**Generate LinkedIn DM:**
```bash
curl -X POST https://www.golocapo.com/api/ai/outreach \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "linkedin",
    "context": {
      "name": "John",
      "profile": "Founder",
      "pain": "spending hours on Meta posts"
    },
    "type": "short"
  }'
```

**Generate Email:**
```bash
curl -X POST https://www.golocapo.com/api/ai/outreach \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "email",
    "context": {
      "name": "Jane",
      "role": "CEO",
      "pain": "marketing takes too long"
    },
    "type": "body"
  }'
```

---

### Option 3: Daily Outreach Script

**1. Create prospects.csv:**
```csv
name,profile,pain,relevance
John Doe,Founder of SaaS startup,spending hours on Meta posts,Posts about marketing automation
Jane Smith,CEO of tech company,marketing takes too long,Needs consistent content
```

**2. Run script:**
```powershell
.\scripts\DAILY_OUTREACH.ps1 -ProspectFile prospects.csv -Platform linkedin -Count 10
```

**3. Script will:**
- Load prospects from CSV
- Generate personalized message for each
- Copy to clipboard
- Wait for you to send
- Save results to CSV

---

## Examples

### LinkedIn DM (Short)

**Input:**
```bash
node scripts/ai_marketing_engine.mjs linkedin "John" "Founder" "spending hours on Meta posts"
```

**Output:**
```
Hey John! Saw you're building a SaaS startup. We're launching 21.12 — an AI tool that generates Meta-ready posts in seconds (not hours).

€149 founding deal (one-time + first month free). Limited to 10 spots.

https://www.golocapo.com/prelaunch
```

---

### Email (Body)

**Input:**
```bash
node scripts/ai_marketing_engine.mjs email "Jane" "CEO" "marketing takes too long"
```

**Output:**
```
Hi Jane,

Quick question: How long does it take you to create Meta posts?

We're launching 21.12 — an AI Marketing Studio that generates Meta-ready posts in seconds. Not hours.

€149 founding customer deal (one-time setup + first month free). Limited to 10 spots.

Early access: https://www.golocapo.com/prelaunch

Happy to answer questions if you have any.
```

---

### Twitter Post

**Input:**
```bash
node scripts/ai_marketing_engine.mjs twitter
```

**Output:**
```
Spending hours on Meta posts? We built an AI that does it in seconds. Launching 21.12.

€149 founding deal (one-time + first month free). Limited to 10 spots.

https://www.golocapo.com/prelaunch

#AIMarketing #MarketingAutomation
```

---

## Personalization Tips

### High Personalization

**Include:**
- Name
- Specific profile details
- Their pain point
- Why it's relevant

**Example:**
```javascript
{
  name: 'John',
  profile: 'Founder of SaaS startup, posts about marketing automation',
  pain: 'spending 10+ hours per week on Meta posts',
  relevance: 'They post about marketing automation, this is directly relevant',
}
```

---

### Medium Personalization

**Include:**
- Name
- Role
- General pain point

**Example:**
```javascript
{
  name: 'Jane',
  role: 'CEO',
  pain: 'marketing takes too long',
}
```

---

## Cost Estimate

**Per Message:**
- LinkedIn DM: ~$0.001
- Email: ~$0.002
- Twitter: ~$0.0005
- Reddit: ~$0.003

**Monthly (100 messages/day):**
- Total: ~$3-5/month

---

## Troubleshooting

### "OPENAI_API_KEY not set"

**Fix:**
```powershell
$env:OPENAI_API_KEY = "sk-xxxxx"
```

Or set in Vercel Environment Variables.

---

### "API error: Rate limit exceeded"

**Fix:**
- Reduce request frequency
- Upgrade OpenAI plan
- Add retry logic

---

### Content too generic

**Fix:**
- Add more context
- Include specific pain points
- Lower temperature (0.6-0.7)

---

### Content too creative

**Fix:**
- Lower temperature (0.5-0.6)
- Add more constraints
- Refine prompt

---

## Next Steps

1. **Test:** Generate your first message
2. **Personalize:** Add more context
3. **Automate:** Set up daily outreach script
4. **Track:** Monitor what converts

---

## Resources

- **Full Documentation:** `docs/AI_MARKETING_ENGINE.md`
- **Prompt Templates:** `scripts/prompt_templates.md`
- **Engine Script:** `scripts/ai_marketing_engine.mjs`
- **API Endpoint:** `/api/ai/outreach`

---

**Remember:** One keyboard, infinite outreach. Start generating now.

