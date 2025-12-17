# Stripe LaunchPack Setup – Complete Guide

**Product:** Golo Čapo Launch Pack  
**Price:** €49 (one-time)  
**Goal:** Automated payment → delivery

---

## Step 1: Create Product in Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/products)
2. Click **"Add product"**
3. **Name:** `Golo Čapo Launch Pack`
4. **Description:** `Pre-launch templates, scripts, and checklists for founders`
5. **Pricing:**
   - **Price:** €49.00
   - **Billing:** One-time
6. Click **"Save product"**

---

## Step 2: Create Payment Link

1. In the product page, click **"Create payment link"**
2. **Settings:**
   - **Price:** €49.00 (one-time)
   - **Quantity:** 1
3. **After payment:**
   - **Success URL:** `https://www.golocapo.com/thank-you?product=LaunchPack`
   - **Cancel URL:** `https://www.golocapo.com/pricing`
4. **Metadata** (optional, for tracking):
   - Key: `product`
   - Value: `LaunchPack`
5. Click **"Create payment link"**
6. **Copy the Payment Link URL** (starts with `https://buy.stripe.com/...`)

---

## Step 3: Set Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`dashboard`)
3. Go to **Settings → Environment Variables**
4. Add:
   - **Name:** `STRIPE_CHECKOUT_URL`
   - **Value:** Your Payment Link URL (from Step 2)
   - **Environment:** Production (and Preview if you want)
5. Click **"Save"**
6. **Redeploy** the project (or wait for next deployment)

---

## Step 4: Set Product Delivery URL (Optional)

If you want automatic delivery email to include a download link:

1. **Vercel Dashboard → Environment Variables**
2. Add:
   - **Name:** `LAUNCHPACK_DELIVERY_URL`
   - **Value:** Your Google Drive link OR ZIP download URL
   - **Environment:** Production
3. Click **"Save"**
4. **Redeploy**

---

## Step 5: Configure Stripe Webhook (For Payment Tracking)

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://www.golocapo.com/api/stripe/webhook`
4. **Events to send:** Select `checkout.session.completed`
5. Click **"Add endpoint"**
6. **Copy the Signing Secret** (starts with `whsec_...`)

### Set Webhook Secret in Vercel

1. **Vercel Dashboard → Environment Variables**
2. Add:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** Your signing secret (from above)
   - **Environment:** Production
3. Click **"Save"**
4. **Redeploy**

---

## Step 6: Test Payment Flow

### Test 1: Checkout URL API
```powershell
curl.exe -i https://www.golocapo.com/api/checkout-url
```

**Expected:**
```json
{
  "success": true,
  "url": "https://buy.stripe.com/test_..."
}
```

### Test 2: Pricing Page
1. Visit: `https://www.golocapo.com/pricing`
2. Click: "Get Early Access — €49" (or "Buy Launch Pack")
3. **Expected:** Redirects to Stripe checkout

### Test 3: Test Payment
- **Card:** `4242 4242 4242 4242`
- **Expiry:** `12/34`
- **CVC:** `123`
- **ZIP:** `12345`
- **Expected:** 
  - Payment completes
  - Redirects to `/thank-you?product=LaunchPack`
  - Delivery email sent (if configured)
  - Webhook fires (if configured)

---

## Step 7: Verify Webhook (Optional)

### Check Webhook Logs
1. Stripe Dashboard → Webhooks → Your endpoint
2. Click **"Recent events"**
3. Look for `checkout.session.completed` events
4. Check response (should be `200 OK`)

### Check Vercel Logs
1. Vercel Dashboard → Your project → Deployments
2. Click latest deployment → **"Functions"** tab
3. Check `/api/stripe/webhook` logs
4. Should see: `Stripe webhook received: { type: 'checkout.session.completed', ... }`

---

## What Happens After Payment

### Automatic (If Webhook Configured)
1. ✅ Payment recorded in Stripe
2. ✅ Customer email stored
3. ✅ Lead upgraded to customer (if exists in waitlist)
4. ✅ Delivery email sent (if `LAUNCHPACK_DELIVERY_URL` set)
5. ✅ Telegram notification sent (if n8n configured)

### Manual (If Webhook Not Configured)
- Check Stripe Dashboard for payments
- Manually send delivery email
- Manually update audience database

---

## Troubleshooting

### Payment Link Not Working
- ✅ Check `STRIPE_CHECKOUT_URL` is set in Vercel
- ✅ Check deployment completed
- ✅ Test `/api/checkout-url` returns correct URL

### Payment Completes But No Email
- ✅ Check `RESEND_API_KEY` is set (for email sending)
- ✅ Check `LAUNCHPACK_DELIVERY_URL` is set (for delivery link)
- ✅ Check webhook is configured and firing
- ✅ Check Vercel function logs for errors

### Webhook Not Firing
- ✅ Check webhook endpoint URL is correct
- ✅ Check `STRIPE_WEBHOOK_SECRET` is set
- ✅ Check Stripe webhook logs for errors
- ✅ Verify webhook signature verification (check Vercel logs)

---

## Success Checklist

- [ ] Product created in Stripe
- [ ] Payment Link created
- [ ] `STRIPE_CHECKOUT_URL` set in Vercel
- [ ] `LAUNCHPACK_DELIVERY_URL` set (optional)
- [ ] Webhook configured (optional)
- [ ] `STRIPE_WEBHOOK_SECRET` set (optional)
- [ ] Test payment completes successfully
- [ ] Delivery email sent (if configured)
- [ ] Webhook fires (if configured)

---

**Ready to accept payments!** 🚀

