# Growth System - Pre-Launch Mass Intake

**Date:** Pre-Launch  
**Version:** 1.0.0-launch  
**Goal:** Maximize real people entering system BEFORE 21.12.2025

---

## System Overview

Unified customer database with email-first capture, automated communications, and conversion tracking.

---

## A) Unified Customer Database

### Leads Table (Pre-Payment)

**Storage:** `leads:{id}` in unified storage

**Fields:**
- `id` - Unique identifier
- `email` - Email address (lowercase, unique)
- `source` - Source: `landing`, `prelaunch`, `promo`, `survey`, `stripe`
- `createdAt` - ISO timestamp
- `consent` - Boolean (GDPR)
- `tags` - Array: `["prelaunch", "vip", "customer"]`
- `surveyCompleted` - Boolean
- `customerId` - Reference to customer record (if upgraded)

### Customers Table (Post-Payment)

**Storage:** `payment:customers:{email}` in unified storage

**Fields:**
- `id` - Unique identifier
- `email` - Email address (lowercase, unique)
- `leadId` - Reference to lead record (if existed)
- `firstPaymentAt` - ISO timestamp
- `amount` - Payment amount (EUR)
- `currency` - Currency code
- `status` - `active`, `cancelled`, etc.
- `stripeCustomerId` - Stripe customer ID

### Upgrade Flow

1. Lead submits email → Stored in `leads` table
2. Lead pays via Stripe → Webhook triggers
3. `upgradeLeadToCustomer()` called:
   - Creates customer record
   - Updates lead with `customerId` and `customer` tag
   - Links lead → customer

---

## B) Pre-Launch Landing Page

### `/prelaunch` Page

**Features:**
- Dark, premium, minimal design
- Headline: "AI Marketing Studio"
- Subheadline: "Generate Meta-ready posts in seconds. Launch 21.12."
- Email input (required)
- GDPR consent checkbox (required)
- Submit button: "Get Early Access"
- Success state: "You're In. Check your email for confirmation. Launch 21.12."

**On Submit:**
1. Validates email format
2. Validates consent
3. Calls `/api/leads/submit`
4. Stores in `leads` table with tag `["prelaunch"]`
5. Sends confirmation email (async)
6. Shows success state

**Files:**
- `prelaunch.html` - Landing page
- `api/leads/submit.mjs` - Submission endpoint

---

## C) Email Automation (Resend)

### Integration

**Package:** `resend` (v3.2.0)

**Environment Variables:**
- `RESEND_API_KEY` - Resend API key
- `RESEND_FROM_EMAIL` - From address (default: `AI Marketing Studio <noreply@golocapo.com>`)

### Email Templates

**1. Pre-Launch Confirmation**
- **Trigger:** Lead submits email on `/prelaunch`
- **Subject:** "You're in. 21.12."
- **Content:** Welcome message, launch date, next steps

**2. Payment Confirmation**
- **Trigger:** Stripe webhook receives `checkout.session.completed`
- **Subject:** "Welcome to AI Marketing Studio"
- **Content:** Payment success, dashboard access, next steps

### Email Sending

**File:** `api/utils/email.mjs`

**Function:** `sendEmail({ to, subject, template, data })`

**Features:**
- Template-based emails
- HTML + plain text versions
- Error handling (doesn't fail request if email fails)
- Logging (sanitized)

---

## D) Admin APIs

### `/api/leads/status`

**Returns:**
- `totalLeads` - Total number of leads
- `totalCustomers` - Total customers (from customers table)
- `conversionRate` - Percentage (customers / leads * 100)
- `prelaunchLeads` - Leads with "prelaunch" tag
- `bySource` - Breakdown by source
- `recentLeads` - Last 10 leads (masked emails)

### `/api/customers/status`

**Returns:**
- `totalCustomers` - Total customers
- `activeCustomers` - Customers with status "active"
- `totalRevenue` - Sum of all payments
- `lastPaymentTimestamp` - Most recent payment
- `recentCustomers` - Last 10 customers (masked emails)

---

## E) Automation Hub Display

### Growth Panel

**Location:** Automation Hub → Growth panel

**Displays:**
- Total Leads
- Total Customers
- Conversion Rate (%)
- Prelaunch Leads count
- Recent Leads list (masked)
- Recent Customers list (masked)

**Updates:** On Automation Hub open, auto-refreshes

---

## F) Stripe Webhook Integration

**File:** `api/stripe/webhook.mjs`

**On Payment:**
1. Verifies webhook signature
2. Extracts email from `checkout.session.completed`
3. Calls `upgradeLeadToCustomer()`:
   - Creates customer record
   - Updates lead (if exists) with customer tag
4. Sends payment confirmation email
5. Stores in legacy payment storage (for compatibility)

---

## Files Created/Modified

### New Files

1. **`api/utils/leads-storage.mjs`**
   - Unified leads + customers storage
   - `createLead()`, `getAllLeads()`, `upgradeLeadToCustomer()`
   - Email masking, conversion rate calculation

2. **`api/leads/submit.mjs`**
   - Lead submission endpoint
   - Email validation, consent check
   - Rate limiting (5 requests/minute)
   - Sends confirmation email

3. **`api/leads/status.mjs`**
   - Leads admin API
   - Returns stats, recent leads, conversion rate

4. **`api/customers/status.mjs`**
   - Customers admin API
   - Returns stats, revenue, recent customers

5. **`api/utils/email.mjs`**
   - Resend integration
   - Email templates
   - `sendEmail()` function

6. **`prelaunch.html`**
   - Pre-launch landing page
   - Email capture form
   - GDPR consent
   - Success state

### Modified Files

7. **`api/stripe/webhook.mjs`**
   - Upgrades leads to customers on payment
   - Sends payment confirmation email

8. **`dashboard.js`**
   - Updated `updatePaymentsUI()` to show leads + customers
   - Renamed panel to "Growth"

9. **`index.html`**
   - Updated panel title to "Growth"

10. **`home.html`**
    - Updated CTA to link to `/prelaunch`

11. **`war-room.html`**
    - Shows leads + customers stats
    - Conversion rate display

12. **`vercel.json`**
    - Added routes: `/prelaunch`, `/api/leads/*`, `/api/customers/*`

13. **`package.json`**
    - Added `resend` dependency

---

## Environment Variables

### Production (Vercel)

```bash
# Required
STRIPE_CHECKOUT_URL=https://buy.stripe.com/...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Optional - emails won't send if not set)
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL="AI Marketing Studio <noreply@golocapo.com>"

# Optional
OPENAI_API_KEY=sk-...
META_INTEGRATION_ENABLED=false
META_POSTING_ENABLED=false
```

### Local Development

```powershell
# Required for checkout
$env:STRIPE_CHECKOUT_URL="https://buy.stripe.com/test_..."
$env:STRIPE_WEBHOOK_SECRET="whsec_test_..." # From Stripe CLI

# Email (Optional)
$env:RESEND_API_KEY="re_test_..."
$env:RESEND_FROM_EMAIL="AI Marketing Studio <noreply@golocapo.com>"
```

---

## Testing

### Test Lead Submission

```powershell
# 1. Start dev server
npm run dev

# 2. Open prelaunch page
# http://localhost:3000/prelaunch

# 3. Submit email
# Expected:
#   - Success message shown
#   - Email stored in leads table
#   - Confirmation email sent (if RESEND_API_KEY set)
#   - Growth panel updates
```

### Test Payment → Customer Upgrade

```powershell
# 1. Submit lead via /prelaunch
# 2. Complete test payment via Stripe
# 3. Webhook triggers
# Expected:
#   - Lead upgraded to customer
#   - Customer record created
#   - Payment confirmation email sent
#   - Growth panel shows conversion
```

---

## Conversion Funnel

```
Social Media → /prelaunch → Email Capture → Lead Created
                                                    ↓
                                            Email Confirmation Sent
                                                    ↓
                                            (Wait for launch)
                                                    ↓
                                            /pricing → Stripe Checkout
                                                    ↓
                                            Payment → Webhook
                                                    ↓
                                            Lead → Customer Upgrade
                                                    ↓
                                            Payment Confirmation Email
                                                    ↓
                                            Dashboard Access
```

---

## Security & Privacy

- ✅ Email addresses masked in admin UI
- ✅ GDPR consent required
- ✅ Rate limiting on lead submission (5/min)
- ✅ Email validation
- ✅ No duplicates (email is unique)
- ✅ All logs sanitized

---

## Next Steps

1. **Resend Setup:**
   - Create Resend account
   - Get API key
   - Set `RESEND_API_KEY` in Vercel
   - Verify domain (for production)

2. **Social Media Links:**
   - Add `/prelaunch` link to social profiles
   - Drive traffic to email capture

3. **Survey Integration:**
   - Add survey completion tracking
   - Update `surveyCompleted` field

4. **Analytics:**
   - Track conversion funnel
   - Monitor lead sources
   - A/B test landing page

---

**Status:** ✅ Ready for Pre-Launch  
**Next Action:** Set up Resend and start driving traffic to `/prelaunch`

