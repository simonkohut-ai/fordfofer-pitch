# 🚀 Local Development Guide

**Quick Start:** Run the dashboard locally with Vercel dev server for full API support.

---

## Prerequisites

1. **Node.js** (v18+)
2. **Vercel CLI** installed globally:
   ```powershell
   npm install -g vercel
   ```

---

## Setup Steps

### 1. Install Dependencies

```powershell
cd fordfofer-pitch\dashboard
npm install
```

### 2. Set Environment Variables (PowerShell)

```powershell
# Required: Stripe checkout URL
$env:STRIPE_CHECKOUT_URL="https://buy.stripe.com/YOUR_LINK"

# Optional: Other env vars for full functionality
$env:OPENAI_API_KEY="sk-..."
$env:META_INTEGRATION_ENABLED="false"
$env:META_POSTING_ENABLED="false"
$env:STRIPE_WEBHOOK_SECRET="whsec_..."  # For Stripe webhook verification
$env:RESEND_API_KEY="re_..."  # For email automation (optional)
$env:RESEND_FROM_EMAIL="AI Marketing Studio <noreply@golocapo.com>"  # Optional
$env:APP_VERSION="1.0.0-launch"
```

**Note:** These are LOCAL ONLY. For production, set them in Vercel Dashboard.

### 3. Run Development Server

```powershell
npm run dev
```

This starts `vercel dev` on port 3000, which:
- ✅ Serves static files (HTML, CSS, JS)
- ✅ Handles API routes (`/api/*`)
- ✅ Reads environment variables
- ✅ Matches production behavior

### 4. Open in Browser

- **Homepage:** http://localhost:3000/
- **Prelaunch:** http://localhost:3000/prelaunch
- **Dashboard:** http://localhost:3000/dashboard
- **Pricing:** http://localhost:3000/pricing
- **Thank You:** http://localhost:3000/thank-you
- **Promo Kit:** http://localhost:3000/promo-kit
- **War Room:** http://localhost:3000/war-room

---

## Testing Stripe Checkout

### 1. Set Stripe URL

```powershell
$env:STRIPE_CHECKOUT_URL="https://buy.stripe.com/test_1234567890"
```

### 2. Test Flow

1. Open http://localhost:3000/pricing
2. Click "Get Early Access – €49"
3. Should redirect to Stripe checkout (same tab)

### 3. Expected Behavior

- ✅ **If `STRIPE_CHECKOUT_URL` is set:** Redirects to Stripe
- ✅ **If missing:** Shows alert: "Checkout not configured. Contact support at gcapovic.biz@gmail.com"

---

## Troubleshooting

### Port Already in Use

```powershell
# Use different port
vercel dev -p 3001
```

### API Routes Not Working

- Ensure `vercel dev` is running (not `node server.cjs`)
- Check that `/api/checkout-url` returns JSON
- Verify environment variables are set in PowerShell session

### Checkout URL Not Found

- Verify `STRIPE_CHECKOUT_URL` is set: `echo $env:STRIPE_CHECKOUT_URL`
- Check API response: `curl http://localhost:3000/api/checkout-url`
- Should return: `{"success":true,"url":"https://buy.stripe.com/..."}`

### Vercel CLI Not Found

```powershell
npm install -g vercel
```

---

## Production Deployment

**Do NOT commit environment variables.** Set them in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `STRIPE_CHECKOUT_URL` (and other vars)
3. Redeploy: `git push origin main`

---

## File Structure

```
dashboard/
├── api/
│   ├── checkout-url.mjs    # Stripe URL endpoint
│   └── ...
├── pricing.html             # Pricing page with checkout button
├── thank-you.html           # Success page
├── vercel.json              # Routing config
├── package.json             # Scripts: "dev": "vercel dev -p 3000"
└── RUN_LOCAL.md            # This file
```

---

## Quick Commands

```powershell
# Option 1: Use SHIP.ps1 (recommended)
.\SHIP.ps1

# Option 2: Manual setup
npm install
npm run dev

# Check if Vercel CLI is installed
vercel --version

# Test checkout API
curl http://localhost:3000/api/checkout-url

# Test Stripe webhook locally (requires Stripe CLI)
stripe listen --forward-to localhost:3000/api/stripe/webhook

# View logs
# (Logs appear in terminal running `vercel dev`)
```

---

## Stripe Webhook Local Testing

### Using Stripe CLI

1. **Install Stripe CLI:**
   ```powershell
   # Download from https://stripe.com/docs/stripe-cli
   ```

2. **Login to Stripe:**
   ```powershell
   stripe login
   ```

3. **Forward webhooks to local server:**
   ```powershell
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

4. **Copy webhook signing secret** (shown in terminal, starts with `whsec_...`)

5. **Set in PowerShell:**
   ```powershell
   $env:STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

6. **Trigger test event:**
   ```powershell
   stripe trigger checkout.session.completed
   ```

**Expected:** Payments admin panel should update with test payment.

---

**✅ Working Local Command:** `npm run dev` (uses `vercel dev -p 3000`)  
**✅ Quick Start:** `.\SHIP.ps1` (checks everything and starts server)  
**✅ Stripe Redirect Works:** When `STRIPE_CHECKOUT_URL` is set, button redirects to Stripe checkout.

