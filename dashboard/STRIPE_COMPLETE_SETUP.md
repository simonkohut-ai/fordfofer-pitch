# ✅ Stripe Payment Setup - Complete Checklist

**Payment Link:** `https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00`  
**Status:** ✅ Set in Vercel

---

## ✅ What's Already Done

1. ✅ **Payment Link Created** - `https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00`
2. ✅ **Environment Variable Set** - `STRIPE_CHECKOUT_URL` in Vercel
3. ✅ **Code Ready** - `/api/checkout-url.mjs` returns the URL
4. ✅ **Pricing Page** - `/pricing` has checkout button

---

## 🔄 What Happens Next (After Redeploy)

### Automatic:
- ✅ `/api/checkout-url` will return your Payment Link
- ✅ Pricing page button will redirect to Stripe
- ✅ Payments will process through Stripe

### Optional (For Payment Confirmations):
- ⚠️ **Webhook Secret** - Needed for automatic payment confirmations
  - Set `STRIPE_WEBHOOK_SECRET` in Vercel (if you want payment tracking)
  - See "Webhook Setup" section below

---

## 🧪 Testing Checklist

### Test 1: Checkout URL API
```powershell
curl.exe -i https://www.golocapo.com/api/checkout-url
```

**Expected:**
```json
{
  "success": true,
  "url": "https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00"
}
```

### Test 2: Pricing Page
1. Visit: `https://www.golocapo.com/pricing`
2. Click: "Get Early Access — €49"
3. **Expected:** Redirects to Stripe checkout

### Test 3: Test Payment
- **Card:** `4242 4242 4242 4242`
- **Expiry:** `12/34`
- **CVC:** `123`
- **ZIP:** `12345`
- **Expected:** Payment completes successfully

### Test 4: Health Check
```powershell
curl.exe -i https://www.golocapo.com/api/health
```

**Expected:** `"stripe": true`

---

## 🔐 Optional: Webhook Setup (For Payment Tracking)

**Why:** Automatically track payments, send confirmation emails, upgrade leads to customers

### Step 1: Create Webhook in Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://www.golocapo.com/api/stripe/webhook`
4. **Events to send:** Select `checkout.session.completed`
5. Click **"Add endpoint"**
6. **Copy the Signing Secret** (starts with `whsec_...`)

### Step 2: Set in Vercel
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** Your signing secret (from Step 1)
   - **Environment:** Production only
3. **Save** and **Redeploy**

### What Webhook Does:
- ✅ Records payment events
- ✅ Stores customer emails
- ✅ Upgrades leads → customers
- ✅ Sends payment confirmation emails (if `RESEND_API_KEY` is set)
- ✅ Updates Payments panel in Automation Hub

---

## 📋 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Payment Link | ✅ Set | `https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00` |
| Checkout URL API | ✅ Ready | Returns Payment Link from env var |
| Pricing Page | ✅ Ready | Button redirects to Stripe |
| Webhook Secret | ⚠️ Optional | Needed for payment tracking |
| Email Automation | ⚠️ Optional | Needs `RESEND_API_KEY` |

---

## 🚀 Ready to Accept Payments!

**Basic Flow (Works Now):**
1. User visits `/pricing`
2. Clicks "Get Early Access — €49"
3. Redirects to Stripe checkout
4. Completes payment
5. Stripe handles everything

**Enhanced Flow (With Webhook):**
1. Same as above, PLUS:
2. Payment automatically recorded
3. Customer email stored
4. Lead upgraded to customer
5. Confirmation email sent (if Resend configured)

---

## 🆘 Troubleshooting

### Button doesn't redirect:
- ✅ Check: `STRIPE_CHECKOUT_URL` is set in Vercel
- ✅ Check: Deployment completed
- ✅ Test: `/api/checkout-url` returns URL

### Payment completes but not tracked:
- ⚠️ Set `STRIPE_WEBHOOK_SECRET` in Vercel
- ⚠️ Create webhook endpoint in Stripe Dashboard
- ⚠️ Redeploy after setting webhook secret

### No confirmation email:
- ⚠️ Set `RESEND_API_KEY` in Vercel (optional)
- ⚠️ Stripe sends receipt automatically (no setup needed)

---

**Next Steps:**
1. ✅ Redeploy (if not done automatically)
2. ✅ Test checkout flow
3. ⚠️ Set webhook secret (optional, for tracking)
4. ⚠️ Set Resend API key (optional, for emails)

