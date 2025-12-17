# ✅ Set Stripe Payment Link - Quick Steps

**Your Payment Link:** `https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00`

---

## Step 1: Set in Vercel Dashboard (2 minutes)

1. **Go to:** [Vercel Dashboard](https://vercel.com/dashboard)
2. **Select:** Your `dashboard` project
3. **Navigate to:** Settings → **Environment Variables**
4. **Add Variable:**
   - **Name:** `STRIPE_CHECKOUT_URL`
   - **Value:** `https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00`
   - **Environment:** ✅ Production, ✅ Preview, ✅ Development (select all)
5. **Click:** "Save"

---

## Step 2: Redeploy (1 minute)

**Option A: Via Vercel Dashboard**
- Go to **Deployments** tab
- Click **"..."** on latest deployment
- Click **"Redeploy"**
- Wait for deployment to complete

**Option B: Via Git Push**
```powershell
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
git commit --allow-empty -m "Trigger redeploy for Stripe checkout"
git push
```

---

## Step 3: Verify It Works (30 seconds)

### Test 1: Check API Endpoint
```powershell
curl.exe -i https://www.golocapo.com/api/checkout-url
```

**Expected Response:**
```json
{
  "success": true,
  "url": "https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00"
}
```

### Test 2: Test Pricing Page
1. **Visit:** `https://www.golocapo.com/pricing`
2. **Click:** "Get Early Access — €49" button
3. **Expected:** Redirects to `https://buy.stripe.com/test_dRm14mcasaIZ6450rk1RC00`

### Test 3: Complete Test Payment
- **Card:** `4242 4242 4242 4242`
- **Expiry:** `12/34`
- **CVC:** `123`
- **ZIP:** `12345`

---

## ✅ Success Checklist

- [ ] `STRIPE_CHECKOUT_URL` added in Vercel
- [ ] Deployment completed
- [ ] `/api/checkout-url` returns your Payment Link
- [ ] Pricing page button redirects to Stripe
- [ ] Test payment completes successfully

---

## 🚨 If It Doesn't Work

### Check Environment Variable:
```powershell
# Via Vercel CLI
cd "C:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch\dashboard"
vercel env ls
```

### Check Health Endpoint:
```powershell
curl.exe -i https://www.golocapo.com/api/health
# Should show: "stripe": true
```

### Force Redeploy:
- Make sure env var is set for **Production** environment
- Redeploy the latest deployment
- Wait 1-2 minutes for propagation

---

**Once set, you're ready to accept payments! 💰**

