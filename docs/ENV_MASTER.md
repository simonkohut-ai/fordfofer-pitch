# Environment Variables - Master Reference

**Purpose:** Single authoritative reference for all environment variables  
**Last Updated:** 2025-12-17  
**Status:** Production Ready

---

## Required (Must-Have)

### Global (GoLoČapo)

**RESEND_API_KEY**
- **Purpose:** Send emails (lead confirmations, payment confirmations)
- **Format:** `re_xxxxxxxxxxxxxxxxxxxxx`
- **Get from:** https://resend.com
- **What breaks if missing:** Email notifications fail (graceful, logs warning)
- **Default:** None (required)

**RESEND_FROM_EMAIL**
- **Purpose:** Sender email address
- **Format:** `Golo Čapo <noreply@golocapo.com>`
- **What breaks if missing:** Email sending fails (graceful, logs warning)
- **Default:** `Golo Čapo <noreply@golocapo.com>`

**LEADS_TO_EMAIL**
- **Purpose:** Email address for lead notifications
- **Format:** `your-email@example.com`
- **What breaks if missing:** Lead notifications not sent (graceful, no crash)
- **Default:** None (optional but recommended)

**STRIPE_CHECKOUT_URL**
- **Purpose:** Stripe Payment Link for checkout
- **Format:** `https://buy.stripe.com/test_xxxxxxxxxxxxx`
- **Get from:** Stripe Dashboard → Products → Payment Links
- **What breaks if missing:** Checkout button doesn't work (graceful, shows error)
- **Default:** None (required for payments)

**STRIPE_WEBHOOK_SECRET**
- **Purpose:** Verify Stripe webhook signatures
- **Format:** `whsec_xxxxxxxxxxxxxxxxxxxxx`
- **Get from:** Stripe Dashboard → Webhooks → Signing secret
- **What breaks if missing:** Webhook verification fails (payment processing fails)
- **Default:** None (required for payments)

**STRIPE_SECRET_KEY**
- **Purpose:** Stripe API access
- **Format:** `sk_test_xxxxxxxxxxxxxxxxxxxxx` or `sk_live_...`
- **Get from:** Stripe Dashboard → API Keys
- **What breaks if missing:** Stripe API calls fail
- **Default:** None (required for payments)

**DOMAIN**
- **Purpose:** Site URL for emails, links
- **Format:** `https://www.golocapo.com`
- **What breaks if missing:** Links in emails may be broken
- **Default:** `https://www.golocapo.com`

**NODE_ENV**
- **Purpose:** Environment mode
- **Format:** `production` or `development`
- **What breaks if missing:** Some features may not work correctly
- **Default:** `production`

---

### MikoRK (Client-Specific)

**CONTACT_EMAIL** (MikoRK)
- **Purpose:** Email for MikoRK contact form notifications
- **Format:** `info@mikork.sk`
- **What breaks if missing:** Contact form notifications not sent (graceful, logs warning)
- **Default:** None (required for MikoRK contact form)

**RESEND_FROM_EMAIL** (MikoRK)
- **Purpose:** Sender email for MikoRK notifications
- **Format:** `MikoRK pohrebníctvo <noreply@mikork.sk>`
- **What breaks if missing:** Email sending fails (graceful, logs warning)
- **Default:** None (can use same as global RESEND_FROM_EMAIL)

**SITE_URL** (MikoRK)
- **Purpose:** MikoRK website URL
- **Format:** `https://www.mikork.sk`
- **What breaks if missing:** Links in emails may be broken
- **Default:** None (can use DOMAIN if same)

---

## Optional (Nice-to-Have)

### Analytics

**POSTHOG_KEY**
- **Purpose:** PostHog analytics tracking
- **Format:** `phc_xxxxxxxxxxxxxxxxxxxxx`
- **Get from:** https://posthog.com
- **What breaks if missing:** Analytics not tracked (graceful, no crash)
- **Default:** None (optional)

---

### AI Features

**OPENAI_API_KEY**
- **Purpose:** AI content generation (marketing engine, content generator)
- **Format:** `sk-xxxxxxxxxxxxxxxxxxxxx`
- **Get from:** https://platform.openai.com
- **What breaks if missing:** AI features don't work (graceful, logs warning)
- **Default:** None (optional)

**OPENAI_MODEL**
- **Purpose:** OpenAI model to use
- **Format:** `gpt-4o-mini` or `gpt-4` or `gpt-3.5-turbo`
- **What breaks if missing:** Uses default model
- **Default:** `gpt-4o-mini`

**OPENAI_TEMPERATURE**
- **Purpose:** Creativity level (0.0-1.0)
- **Format:** `0.7`
- **What breaks if missing:** Uses default temperature
- **Default:** `0.7`

---

## Safe Defaults

### If Optional Vars Missing

**Email:**
- Logs warning: "RESEND_API_KEY not configured. Email not sent."
- Does not crash
- Returns success to user (email appears to send)

**Analytics:**
- PostHog not initialized
- No tracking
- No crash

**AI Features:**
- Logs warning: "OPENAI_API_KEY not configured."
- Returns error message to user
- No crash

---

## Per-Client Variables

### MikoRK Specific

**Required:**
- `CONTACT_EMAIL` - Where to send contact form notifications
- `RESEND_FROM_EMAIL` - Sender email (can reuse global)
- `SITE_URL` - MikoRK website URL (can reuse DOMAIN if same)

**Optional:**
- `OPENAI_API_KEY` - For content generator (if using)

---

## What Breaks If Missing (Explicit)

### Critical (Breaks Functionality)

**STRIPE_CHECKOUT_URL:**
- ❌ Checkout button doesn't work
- ❌ Users cannot pay
- ✅ Site still loads (graceful error)

**STRIPE_WEBHOOK_SECRET:**
- ❌ Payment webhooks fail verification
- ❌ Payments not processed automatically
- ✅ Site still loads

**STRIPE_SECRET_KEY:**
- ❌ Stripe API calls fail
- ❌ Payment processing fails
- ✅ Site still loads

---

### Non-Critical (Graceful Degradation)

**RESEND_API_KEY:**
- ⚠️ Email notifications not sent
- ✅ Site still works
- ✅ Contact form still works
- ✅ Logs warning

**OPENAI_API_KEY:**
- ⚠️ AI features don't work
- ✅ Site still works
- ✅ Other features work
- ✅ Logs warning

**POSTHOG_KEY:**
- ⚠️ Analytics not tracked
- ✅ Site still works
- ✅ All features work
- ✅ No error (silent)

---

## Environment-Specific Settings

### Production

**Required:**
- `RESEND_API_KEY` (production key)
- `STRIPE_CHECKOUT_URL` (live or test)
- `STRIPE_WEBHOOK_SECRET` (live or test)
- `STRIPE_SECRET_KEY` (live or test)
- `DOMAIN` (production domain)
- `NODE_ENV=production`

**Optional:**
- `POSTHOG_KEY` (production key)
- `OPENAI_API_KEY` (production key)
- `LEADS_TO_EMAIL` (production email)

---

### Development

**Required:**
- `RESEND_API_KEY` (test key or same as production)
- `DOMAIN` (localhost or test domain)
- `NODE_ENV=development`

**Optional:**
- All other vars (use test values)

---

## Setup Instructions

### Vercel Dashboard

1. Go to https://vercel.com
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable
5. Enable for correct environments (Production, Preview, Development)
6. Save
7. Redeploy

---

### Local Development

**Create `.env` file:**
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Golo Čapo <noreply@golocapo.com>
LEADS_TO_EMAIL=your-email@example.com
STRIPE_CHECKOUT_URL=https://buy.stripe.com/test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o-mini
OPENAI_TEMPERATURE=0.7
DOMAIN=https://www.golocapo.com
NODE_ENV=production
```

**Never commit `.env` to Git!**

---

## Verification

### Check Variables Are Set

**In Code:**
```javascript
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set' : 'Missing');
console.log('STRIPE_CHECKOUT_URL:', process.env.STRIPE_CHECKOUT_URL ? 'Set' : 'Missing');
```

**In Vercel:**
1. Go to Settings → Environment Variables
2. Verify all required variables are present
3. Check they're enabled for correct environments

**In Logs:**
1. Go to Deployments → Latest deployment → Logs
2. Check for "missing environment variable" warnings
3. If missing, add and redeploy

---

## Security Notes

### Keep Keys Secret

- ✅ Never commit API keys to Git
- ✅ Never share API keys publicly
- ✅ Rotate keys if compromised
- ✅ Use different keys for production/preview/development

### Key Rotation

**If compromised:**
1. Generate new key in service dashboard
2. Update in Vercel environment variables
3. Redeploy
4. Revoke old key

---

## Summary

### Required for GoLoČapo

1. `RESEND_API_KEY` - Email sending
2. `RESEND_FROM_EMAIL` - Sender email
3. `STRIPE_CHECKOUT_URL` - Payment link
4. `STRIPE_WEBHOOK_SECRET` - Webhook verification
5. `STRIPE_SECRET_KEY` - Stripe API access
6. `DOMAIN` - Site URL
7. `NODE_ENV` - Environment mode

### Required for MikoRK

1. `CONTACT_EMAIL` - Contact form notifications
2. `RESEND_API_KEY` - Email sending (can reuse global)
3. `RESEND_FROM_EMAIL` - Sender email (can reuse global)
4. `SITE_URL` - MikoRK URL (can reuse DOMAIN if same)

### Optional (All Projects)

1. `POSTHOG_KEY` - Analytics
2. `OPENAI_API_KEY` - AI features
3. `OPENAI_MODEL` - AI model
4. `OPENAI_TEMPERATURE` - AI creativity
5. `LEADS_TO_EMAIL` - Lead notifications

---

**This is the single source of truth for all environment variables.**

