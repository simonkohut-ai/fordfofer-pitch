# 📍 Where to Find Placeholders

**Quick reference: All placeholder locations in the dashboard project**

---

## 🔴 CRITICAL: Environment Variables (Vercel Dashboard)

**Set these in:** Vercel Dashboard → Project → Settings → Environment Variables

### Required for Payments:
- **`STRIPE_CHECKOUT_URL`** - Your Stripe Payment Link
  - Format: `https://buy.stripe.com/your-link-id`
  - Where it's used: `/pricing` page redirects to this
  - Current status: ⚠️ **MUST BE SET** for revenue to work

- **`STRIPE_WEBHOOK_SECRET`** - Stripe webhook signature secret
  - Format: `whsec_...`
  - Where it's used: `/api/stripe/webhook` endpoint

### Optional (but recommended):
- **`RESEND_API_KEY`** - For email automation
  - Format: `re_...`
  - Where it's used: Email confirmation, payment confirmations

- **`OPENAI_API_KEY`** - For AI features
  - Format: `sk-...`
  - Where it's used: AI chat features in dashboard

- **`META_INTEGRATION_ENABLED`** - Enable Meta OAuth
  - Format: `true` or `false`
  - Default: `false`

- **`META_POSTING_ENABLED`** - Enable Meta posting
  - Format: `true` or `false`
  - Default: `false`

---

## 📝 Code Placeholders

### 1. `dashboard.js` (Lines 2618-2636)
**Location:** `fordfofer-pitch/dashboard/dashboard.js`

**What:** Stripe checkout setup instructions (test mode placeholder)
```javascript
// Line 2620: Replace with actual Stripe Price ID
const STRIPE_TEST_PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_test_1234567890';
```

**Action:** This is a fallback. The real payment uses `STRIPE_CHECKOUT_URL` from environment variables. No code change needed if env var is set.

---

### 2. `clients/komfortreality/kontakt.html` (Line 167)
**Location:** `fordfofer-pitch/dashboard/clients/komfortreality/kontakt.html`

**What:** Phone number placeholder
```html
<span>+421 XXX XXX XXX</span>
```

**Action:** Replace with actual phone number if needed.

---

## 📚 Documentation Placeholders (Examples Only)

These are in `.md` files and are just examples/documentation. They don't affect functionality:

### Files with example values:
- `README.md` - Shows `YOUR_LINK` as example
- `RUN_LOCAL.md` - Shows `YOUR_LINK` as example
- `PROJECT_RECAP.md` - Shows `test@example.com` in curl examples
- `CLIENT_SITES_REVIEW.md` - Shows `test@example.com` in test examples
- `META_SETUP.md` - Shows `your_app_id_here` as example

**Action:** These are documentation only. No changes needed.

---

## ✅ How to Check Current Status

### Check Environment Variables:
```powershell
# In Vercel Dashboard:
# Go to: Project → Settings → Environment Variables
# Look for:
# - STRIPE_CHECKOUT_URL (should be set)
# - STRIPE_WEBHOOK_SECRET (should be set)
# - RESEND_API_KEY (optional)
# - OPENAI_API_KEY (optional)
```

### Check if Placeholders Are Active:
```powershell
# Test the payment flow:
curl.exe -I https://www.golocapo.com/pricing

# Check health endpoint (shows which env vars are set):
curl.exe -i https://www.golocapo.com/api/health
```

---

## 🎯 Priority Order

1. **🔴 CRITICAL:** Set `STRIPE_CHECKOUT_URL` in Vercel (required for money)
2. **🟡 IMPORTANT:** Set `STRIPE_WEBHOOK_SECRET` in Vercel (for payment confirmations)
3. **🟢 OPTIONAL:** Set `RESEND_API_KEY` (for email automation)
4. **🟢 OPTIONAL:** Set `OPENAI_API_KEY` (for AI features)

---

## 📋 Quick Checklist

- [ ] `STRIPE_CHECKOUT_URL` set in Vercel → Production environment
- [ ] `STRIPE_WEBHOOK_SECRET` set in Vercel → Production environment
- [ ] Test: Visit `https://www.golocapo.com/pricing` → Should redirect to Stripe
- [ ] Test: Visit `https://www.golocapo.com/api/health` → Should show `stripe: true`

---

**Last Updated:** After homepage fix + portfolio pages deployment

