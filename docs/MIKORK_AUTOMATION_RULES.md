# MikoRK pohrebníctvo - Automation Rules

**Goal:** Automate repetitive marketing work while maintaining human touch  
**Rule:** Automation helps humans, never replaces empathy  
**Last Updated:** 2025-12-17

---

## What CAN Be Automated ✅

### 1. Google Business Profile Posts

**Types:**
- Informational updates (calm, respectful)
- Educational content
- Seasonal notices (Dušičky, memorial days)
- Service updates (if applicable)

**Frequency:**
- 1-2 posts per month (not aggressive)
- Quality over quantity

**Process:**
1. Generate content using `scripts/mikork_content_generator.mjs`
2. Review content manually
3. Approve or edit
4. Schedule/post manually

**Example Topics:**
- "Dušičky - tradícia a význam"
- "Čo všetko zahŕňa organizácia pohrebu"
- "Ako sa pripraviť na pohreb"
- "Pohrebné služby - časté otázky"

---

### 2. Informational Blog Drafts

**Types:**
- Educational articles
- Helpful resources
- FAQ content
- Informational guides

**Process:**
1. Generate draft using content generator
2. Review and edit manually
3. Add personal touches
4. Publish when ready

**Example Topics:**
- "Organizácia pohrebu - kompletný prehľad"
- "Pohrebné služby - čo očakávať"
- "Dušičky a pamätné dni"
- "Ako sa pripraviť na pohreb"

---

### 3. Reminder Posts

**Types:**
- Dušičky (All Souls' Day)
- Memorial days
- Important dates
- Seasonal notices

**Process:**
1. Generate reminder content
2. Review for appropriateness
3. Schedule/post manually
4. Ensure respectful tone

---

### 4. Internal Follow-ups

**Types:**
- Missed calls → reminder email
- Contact form submissions → acknowledgment
- Follow-up reminders (non-grief related)

**Process:**
1. Automated email notification to business owner
2. Business owner responds personally
3. No automated responses to customers

**Example:**
```
Subject: Nový kontaktný formulár - MikoRK

Dobrý deň,

Máte nový kontaktný formulár na webe.

Meno: [name]
Email: [email]
Telefón: [phone]
Správa: [message]

Prosím odpovedajte osobnou správou.

---
MikoRK Automation System
```

---

## What Must NOT Be Automated ❌

### 1. Condolence Messages

**Never automate:**
- Responses to grief-related inquiries
- Condolence messages
- Sympathy communications
- Personal messages

**Rule:** All grief-related communication must be personal and human.

---

### 2. Direct Grief Communication

**Never automate:**
- Responses to families in grief
- Personal conversations
- Emotional support
- Direct customer service during difficult times

**Rule:** Human empathy cannot be automated.

---

### 3. Personal Replies

**Never automate:**
- Customer service responses
- Personal emails
- Phone call responses
- Direct messages

**Rule:** All customer-facing communication must be personal.

---

## Automation Workflow

### Content Generation

**Step 1: Generate Content**
```bash
node scripts/mikork_content_generator.mjs --type post --topic "Dušičky"
```

**Step 2: Review Content**
- Read generated content
- Check tone and appropriateness
- Ensure no sales language
- Verify respectful approach

**Step 3: Edit if Needed**
- Add personal touches
- Adjust tone
- Add local context
- Remove anything inappropriate

**Step 4: Approve and Schedule**
- Approve final content
- Schedule/post manually
- Monitor engagement

---

### Lead Handling

**Step 1: Contact Form Submission**
- Form submitted → Email notification to business owner
- No automated response to customer

**Step 2: Business Owner Response**
- Business owner responds personally
- Human touch maintained
- Empathetic approach

**Step 3: Follow-up (if needed)**
- Manual follow-up only
- No automated sequences
- Personal touch always

---

## Content Guidelines

### Do's ✅

- ✅ Educational and informative
- ✅ Respectful and dignified
- ✅ Helpful without being pushy
- ✅ Calm and professional
- ✅ Local and community-focused

### Don'ts ❌

- ❌ Sales language
- ❌ Urgency or pressure
- ❌ "Buy now" or "limited offer"
- ❌ Aggressive marketing
- ❌ Playful or casual tone
- ❌ Automated grief responses

---

## Approval Process

### Content Approval Checklist

Before publishing any generated content:

- [ ] Tone is respectful and dignified
- [ ] No sales language or urgency
- [ ] Appropriate for funeral services context
- [ ] Helpful and informative
- [ ] No automated grief responses
- [ ] Personal touches added (if needed)
- [ ] Local context included (if applicable)

---

## Monitoring

### Track

- Content generation logs
- Approval rates
- Publishing frequency
- Engagement (if applicable)

### Review Monthly

- Content quality
- Tone appropriateness
- Customer feedback
- Automation effectiveness

---

## Tools

### Content Generator

**Location:** `scripts/mikork_content_generator.mjs`

**Usage:**
```bash
# Generate post
node scripts/mikork_content_generator.mjs --type post --topic "Dušičky"

# Generate article
node scripts/mikork_content_generator.mjs --type article --topic "Organizácia pohrebu"

# Generate reminder
node scripts/mikork_content_generator.mjs --type reminder --topic "Dušičky"
```

**Output:**
- Generated content (saved to `content/mikork/`)
- Log file (saved to `logs/mikork/`)

---

## Implementation Checklist

- [x] Content generator script created
- [x] Automation rules documented
- [x] Approval process defined
- [ ] Email notification system (contact form)
- [ ] Content review workflow
- [ ] Publishing schedule

---

**Remember:** Automation helps humans, never replaces empathy. Every customer-facing communication must be personal and human.

