# Stripe Checkout Setup Guide

**Objective:** Get first money via Stripe checkout

---

## Step 1: Create Stripe Payment Link

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Products** → **Payment Links**
3. Click **Create payment link**
4. Configure:
   - **Product name:** "AI Marketing Studio – Early Access"
   - **Price:** €49.00
   - **One-time payment** (not recurring)
   - **Success URL:** `https://yourdomain.com/thank-you`
   - **Cancel URL:** `https://yourdomain.com/pricing`
5. Copy the Payment Link URL (starts with `https://buy.stripe.com/...`)

---

## Step 2: Set Environment Variables

### In Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add variables:
   - **Name:** `STRIPE_CHECKOUT_URL`
     - **Value:** Your Payment Link URL (e.g., `https://buy.stripe.com/abc123xyz`)
     - **Environment:** Production, Preview, Development (all)
   - **Name:** `STRIPE_WEBHOOK_SECRET`
     - **Value:** Your webhook signing secret (from Stripe Dashboard → Webhooks → Signing secret)
     - **Environment:** Production, Preview, Development (all)
4. Click **Save**

### Or via Vercel CLI:

```bash
vercel env add STRIPE_CHECKOUT_URL
# Paste your Payment Link URL when prompted
```

---

## Step 3: Redeploy

After setting the environment variable:

1. **Redeploy** your Vercel project (or push a new commit)
2. The checkout URL will be available via `/api/checkout-url`

---

## Step 4: Test End-to-End

### Test Flow:

1. **Visit Pricing Page:**
   ```
   https://yourdomain.com/pricing
   ```

2. **Click "Get Early Access" Button:**
   - Should redirect to Stripe checkout
   - Verify URL matches your Payment Link

3. **Complete Test Purchase:**
   - Use Stripe test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

4. **Verify Thank You Page:**
   - After payment, should redirect to `/thank-you`
   - Verify confirmation message displays

5. **Check Email:**
   - Stripe sends receipt automatically
   - Verify you receive it

---

## Troubleshooting

### Checkout URL Not Working

**Issue:** Button shows "Checkout URL not configured"

**Fix:**
1. Verify `STRIPE_CHECKOUT_URL` is set in Vercel
2. Redeploy after setting env var
3. Check `/api/checkout-url` returns URL:
   ```bash
   curl https://yourdomain.com/api/checkout-url
   ```

### Redirect Not Working

**Issue:** Button doesn't redirect

**Fix:**
1. Check browser console for errors
2. Verify Payment Link URL is valid
3. Test Payment Link directly in browser

### Thank You Page Not Showing

**Issue:** Stripe redirects to wrong URL

**Fix:**
1. Update Payment Link success URL in Stripe Dashboard
2. Set to: `https://yourdomain.com/thank-you`

---

## Files Changed

- ✅ `pricing.html` - Pricing page with checkout button
- ✅ `thank-you.html` - Confirmation page
- ✅ `api/checkout-url.mjs` - API endpoint for checkout URL
- ✅ `vercel.json` - Routes added
- ✅ Footer links updated (Terms, Privacy, Refund, Security)

---

## Step 5: Configure Stripe Webhook

### Production (Vercel)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Webhooks**
2. Click **Add endpoint**
3. Set endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Select events: `checkout.session.completed`
5. Copy the **Signing secret** (starts with `whsec_...`)
6. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

**Webhook will:**
- Record payment events
- Store customer emails
- Update Payments admin panel in Automation Hub

### Local Development (Stripe CLI)

1. **Install Stripe CLI:**
   ```powershell
   # Download from https://stripe.com/docs/stripe-cli
   ```

2. **Login:**
   ```powershell
   stripe login
   ```

3. **Forward webhooks:**
   ```powershell
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Copy signing secret** (shown in terminal)

5. **Set env var:**
   ```powershell
   $env:STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

6. **Test:**
   ```powershell
   stripe trigger checkout.session.completed
   ```

## Next Steps After First Sale

1. ✅ **Webhook configured** - Payments automatically tracked
2. **Set up email automation** (Resend integration)
3. **Add access management** (grant dashboard access)
4. **Track conversions** (analytics on pricing page)
5. **A/B test pricing** (test different price points)

---

**Questions?** Email: gcapovic.biz@gmail.com

