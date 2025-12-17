# Revenue System - Pre-Launch Money Generation

**Date:** Pre-Launch  
**Version:** 1.0.0-revenue  
**Goal:** Generate real revenue BEFORE 21.12.2025

---

## Revenue Strategy

**Objective:** Make money BEFORE launch to fund domain + ads budget.

**Target:** 1-2 real payments (€49 each) before domain purchase.

**Funnel:**
```
Social Media → Teaser → /prelaunch → Email Capture → /pricing → Stripe → €49
```

---

## A) Locked Teaser Copy

**EXACT COPY (NO VARIATIONS):**
```
Golo Čapo
PTK – Někdo půjde z kola ven
21.12
```

**Rules:**
- No period after date
- No CTA in teaser
- Bio/link destination: `/prelaunch`
- Promo Kit outputs match exactly
- Social Kit uses this copy only

**Files:**
- `api/assets/caption.mjs` - Returns locked copy
- `promo-kit.html` - Shows locked copy (read-only)
- `social-kit.html` - Includes locked copy

---

## B) Pre-Launch Funnel (Email First)

### `/prelaunch` Page

**Design:** Dark, minimal, agency-level

**Content:**
- Headline: "AI Marketing Studio"
- Subheadline: "Launch 21.12."
- Email input (required)
- GDPR consent checkbox (required)
- Submit button: "Get early access"
- Success state: "You're in. 21.12."

**On Submit:**
- Stores email in leads database
- Tags lead with `["prelaunch"]`
- Sends confirmation email (date only, no selling)

**Files:**
- `prelaunch.html` - Landing page
- `api/leads/submit.mjs` - Submission endpoint

---

## C) Unified Database (Money-Aware)

### Leads Table

**Fields:**
- `email` (unique)
- `source` (prelaunch, dm, survey, paid)
- `tags` (prelaunch, dm, survey, paid)
- `consent` (boolean)
- `surveyCompleted` (boolean)
- `createdAt`

### Customers Table

**Fields:**
- `email` (unique)
- `amount` (€49)
- `firstPaymentAt`
- `status` (active)

### Upgrade Flow

1. Lead submits email → Stored in leads
2. Lead pays via Stripe → Webhook triggers
3. Lead upgraded → Customer record created
4. Conversion rate calculated: `customers / leads * 100`

**Files:**
- `api/utils/leads-storage.mjs` - Unified storage
- `api/stripe/webhook.mjs` - Upgrades leads on payment

---

## D) Stripe = Money Proof

### Payment Flow

1. `/pricing` → Redirects via `STRIPE_CHECKOUT_URL`
2. Early Access offer: €49 one-time
3. Stripe webhook receives payment
4. Lead upgraded to customer
5. Payment confirmation email sent

### Money Proof Display

**Automation Hub:**
- Total Leads
- Total Customers
- Conversion Rate (%)

**War Room:**
- Growth metrics
- Revenue tracking
- Conversion funnel

**Files:**
- `pricing.html` - Payment page
- `api/stripe/webhook.mjs` - Payment processing
- `api/leads/status.mjs` - Leads stats
- `api/customers/status.mjs` - Customers stats

---

## E) Email Automation

### 1) Pre-Launch Confirmation

**Trigger:** Lead signup on `/prelaunch`

**Content:**
- Short, dark, minimal
- Confirms date: "21.12."
- No selling

**Template:** `prelaunch-confirmation`

### 2) Launch Day Email (Scheduled)

**Trigger:** 21.12.2025 (manual or scheduled)

**Audience:** All prelaunch leads with consent

**Content:**
- "Access is live"
- Link to `/pricing`

**Template:** `launch-day`

**Endpoint:** `/api/launch/send-launch-email` (POST on 21.12.2025)

### 3) Post-Payment Email

**Trigger:** Stripe webhook success

**Content:**
- Confirmation
- Next steps
- Support contact

**Template:** `payment-confirmation`

**Files:**
- `api/utils/email.mjs` - Email templates
- `api/launch/send-launch-email.mjs` - Launch day automation

---

## F) Survey = Intelligence

### `/survey` Page

**Questions (4):**
1. What do you want to automate most? (required)
2. Biggest marketing pain? (required)
3. Solo founder or agency? (required)
4. Optional free text

**Rules:**
- Links responses to leads if email exists
- Marks `surveyCompleted = true`
- Stores responses for aggregation

**Files:**
- `survey.html` - Survey page
- `api/survey/submit.mjs` - Submission endpoint

---

## G) Social Kit (Manual Posting)

### `/social-kit` Page

**Contents:**
- Teaser caption (locked copy)
- DM openers (copy buttons)
- Comment bait examples
- Follow-up message templates

**Purpose:** Fast manual outreach → conversions

**No auto-posting** - Manual only

**Files:**
- `social-kit.html` - Social kit page

---

## H) UI/Design Polish

### Pages Polished

- ✅ `/prelaunch` - Dark, minimal, agency-level
- ✅ `/pricing` - Clean, professional
- ✅ `/promo-kit` - Locked copy display
- ✅ `/survey` - Simple, focused
- ✅ `/dashboard` - Consistent typography
- ✅ `/war-room` - Growth metrics display
- ✅ `/social-kit` - Copy-ready templates

### Design System

- **Typography:** System fonts (Inter, Roboto, Segoe UI)
- **Colors:** Dark theme (#0f172a background, #667eea primary)
- **Spacing:** Consistent 16px/24px/32px/48px
- **No placeholder copy** - All content production-ready

---

## I) Documentation

### Created Files

1. **`REVENUE_SYSTEM.md`** (this file)
   - Complete revenue strategy
   - Funnel explanation
   - Money generation plan

2. **`PRELAUNCH_STRATEGY.md`**
   - Pre-launch execution checklist
   - Daily actions
   - Conversion tactics

3. **`EMAIL_AUTOMATIONS.md`**
   - Email templates
   - Automation triggers
   - Launch day procedure

4. **`DATA_MODEL.md`**
   - Database schema
   - Lead → Customer flow
   - Conversion tracking

5. **`QA_CHECKLIST.md`**
   - Pre-launch tests
   - Revenue verification
   - System checks

6. **`LAUNCH_RUNBOOK.md`**
   - Money-first focus
   - Launch day actions
   - Post-launch follow-up

---

## How This Makes Money BEFORE Launch

### Revenue Funnel

1. **Teaser Post** (Social Media)
   - Locked copy: "Golo Čapo / PTK – Někdo půjde z kola ven / 21.12"
   - Bio link: `/prelaunch`
   - No CTA in teaser (builds curiosity)

2. **Email Capture** (`/prelaunch`)
   - Dark, minimal landing page
   - Email + consent required
   - Success: "You're in. 21.12."
   - Stores lead with `["prelaunch"]` tag

3. **Warm Lead** (Email List)
   - Confirmation email (no selling)
   - Builds trust
   - Creates anticipation

4. **Conversion** (`/pricing`)
   - Early Access: €49 one-time
   - Stripe checkout redirect
   - Payment processed

5. **Money Proof**
   - Webhook upgrades lead → customer
   - Growth panel shows conversion
   - War Room tracks revenue

### Pre-Launch Actions

**Daily:**
1. Post teaser on socials (locked copy)
2. Manual DM outreach (use `/social-kit`)
3. Share `/prelaunch` link
4. Monitor Growth panel (leads → customers)
5. Track conversion rate

**Goal:** 1-2 payments BEFORE domain purchase

---

## Environment Variables

### Required

```bash
STRIPE_CHECKOUT_URL=https://buy.stripe.com/...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Optional (for email)

```bash
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="Golo Čapo <noreply@golocapo.com>"
```

---

## Test URLs

### Local

- `http://localhost:3000/prelaunch` - Email capture
- `http://localhost:3000/pricing` - Payment page
- `http://localhost:3000/survey` - Survey
- `http://localhost:3000/social-kit` - Social templates
- `http://localhost:3000/promo-kit` - Promo generator
- `http://localhost:3000/war-room` - Growth metrics
- `http://localhost:3000/dashboard` - Admin panel

### Production

- `https://golocapo.com/prelaunch`
- `https://golocapo.com/pricing`
- `https://golocapo.com/survey`
- `https://golocapo.com/social-kit`
- `https://golocapo.com/promo-kit`
- `https://golocapo.com/war-room`
- `https://golocapo.com/dashboard`

---

## Pre-Launch Execution Checklist

### Daily Actions

- [ ] Post teaser on socials (locked copy)
- [ ] Share `/prelaunch` link in bio/stories
- [ ] Manual DM outreach (5-10 per day)
- [ ] Check Growth panel for new leads
- [ ] Monitor conversion rate
- [ ] Track revenue (€49 per customer)

### Weekly Actions

- [ ] Review survey responses
- [ ] Update social kit templates
- [ ] Test email automations
- [ ] Verify Stripe webhook
- [ ] Check War Room metrics

### Before Launch (21.12)

- [ ] Send launch day email (via `/api/launch/send-launch-email`)
- [ ] Verify all systems operational
- [ ] Check conversion funnel
- [ ] Confirm payment processing

---

## Revenue Targets

**Pre-Launch Goal:** 1-2 payments (€49 each) = €98

**Use Case:** Fund domain purchase + initial ads budget

**Post-Launch Goal:** Scale to 10+ customers = €490+

---

**Status:** ✅ Revenue System Ready  
**Next Action:** Start posting teaser and driving traffic to `/prelaunch`

