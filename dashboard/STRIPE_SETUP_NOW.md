# 🚀 Stripe Setup - Get Payments Working NOW

**You have:** Stripe publishable key (`pk_test_...`)  
**You need:** Stripe Payment Link URL (`https://buy.stripe.com/...`)

---

## ✅ Step 1: Create Stripe Payment Link (5 minutes)

### In Stripe Dashboard:

1. **Go to:** [Stripe Dashboard](https://dashboard.stripe.com/test/products)
2. **Navigate to:** Products → **Payment Links**
3. **Click:** "Create payment link"
4. **Configure:**
   - **Product name:** `AI Marketing Studio – Early Access`
   - **Price:** `€49.00` (EUR)
   - **Type:** One-time payment (NOT recurring)
   - **Success URL:** `https://www.golocapo.com/thank-you` (or `/pricing?success=true`)
   - **Cancel URL:** `https://www.golocapo.com/pricing`
5. **Click:** "Create link"
6. **Copy the URL** (looks like: `https://buy.stripe.com/test_abc123xyz` or `https://buy.stripe.com/abc123xyz`)

---

## ✅ Step 2: Set in Vercel (2 minutes)

### Option A: Vercel Dashboard (Easiest)

1. **Go to:** [Vercel Dashboard](https://vercel.com/dashboard)
2. **Select:** Your `dashboard` project
3. **Navigate to:** Settings → **Environment Variables**
4. **Add Variable:**
   - **Name:** `STRIPE_CHECKOUT_URL`
   - **Value:** Paste your Payment Link URL (from Step 1)
   - **Environment:** Select all (Production, Preview, Development)
5. **Click:** "Save"
6. **Redeploy:** Go to Deployments → Click "..." → "Redeploy" (or push a new commit)

### Option B: Vercel CLI

```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
vercel env add STRIPE_CHECKOUT_URL
# When prompted, paste your Payment Link URL
# Select: Production, Preview, Development (all)
```

---

## ✅ Step 3: Test It Works (1 minute)

### Test the Flow:

1. **Visit:** `https://www.golocapo.com/pricing`
2. **Click:** "Get Early Access — €49" button
3. **Expected:** Redirects to Stripe checkout page
4. **Test Payment:**
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/34`
   - CVC: `123`
   - ZIP: `12345`
5. **Complete payment** → Should redirect back to your site

---

## 🔐 Optional: Set Webhook Secret (For Payment Confirmations)

If you want payment confirmations to work automatically:

1. **In Stripe Dashboard:** Webhooks → Add endpoint
2. **Endpoint URL:** `https://www.golocapo.com/api/stripe/webhook`
3. **Events:** Select `checkout.session.completed`
4. **Copy the Signing Secret** (starts with `whsec_...`)
5. **In Vercel:** Add environment variable:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** Your signing secret
   - **Environment:** Production only

---

## 📝 What About Your API Key?

**Your publishable key (`pk_test_...`):**
- ✅ Safe to use on frontend (public)
- ❌ Not needed for current Payment Link setup
- 💡 Can be used later for:
  - Direct Stripe Checkout integration (if you switch from Payment Links)
  - Client-side payment validation
  - Future features

**If you want to store it (optional):**
- **Name:** `STRIPE_PUBLISHABLE_KEY`
- **Value:** `pk_test_51SeEC9A31XDE5816wKGgBkaE4G1maXgq4E5rk6W3zJigratepayLxOL54PUr6MthQHkYktoxgZN0fQONIkcYoqyf00WIooErv3`
- **Note:** This is optional - Payment Links don't need it

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `STRIPE_CHECKOUT_URL` set in Vercel
- [ ] Vercel deployment completed
- [ ] Visit `https://www.golocapo.com/pricing`
- [ ] Click button → Redirects to Stripe
- [ ] Test payment works
- [ ] Payment redirects back to your site

---

## 🚨 Troubleshooting

### Button doesn't redirect:
- Check: `STRIPE_CHECKOUT_URL` is set in Vercel
- Check: Deployment completed after setting env var
- Check: Visit `/api/checkout-url` → Should return `{"success": true, "url": "..."}`

### Payment Link not working:
- Verify you're in **Test Mode** in Stripe Dashboard
- Use test card: `4242 4242 4242 4242`
- Check Payment Link is active in Stripe Dashboard

### Still broken:
```powershell
# Check health endpoint
curl.exe -i https://www.golocapo.com/api/health

# Should show: "stripe": true
```

---

**Next Step:** Once Payment Link is set, you're ready to accept real payments! 💰

