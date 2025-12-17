# CEO Action Plan – Fix & Lock (10 Minutes)

**Status:** Ready to execute  
**Goal:** Fix `/prelaunch` 404 → Lock product → Ready for first money

---

## ✅ STEP 1: Fix /prelaunch 404 (10 minutes)

### In Vercel UI:
1. **Vercel Dashboard** → Find project with domain `www.golocapo.com`
2. **Settings** → **General** → **Root Directory**
3. **Check current value:**
   - ✅ **CORRECT:** Empty or `/`
   - ❌ **WRONG:** `dashboard` or `dashboard/`
4. **If wrong:** Clear field (make empty) → **Save**
5. **Deployments** → Latest → **...** → **Redeploy**
6. **Wait 1-2 minutes**

### Verify Fix:
```powershell
.\VERIFY_PRELAUNCH.ps1
```

**Expected:** All routes return 200

**If still 404:** See `FIX_PRELAUNCH_404.md` for detailed troubleshooting

---

## ✅ STEP 2: Lock Product (Already Done)

**Product:** Golo Čapo LaunchPack  
**Price:** €49 (one-time)  
**Status:** 🔒 LOCKED

**See:** `docs/PRODUCT_LOCKED.md`

---

## ✅ STEP 3: Create Stripe Payment Link (15 minutes)

### In Stripe Dashboard:
1. **Products** → **Add product**
2. **Name:** `Golo Čapo LaunchPack`
3. **Description:** `Pre-launch templates, scripts, and checklists for founders`
4. **Price:** €49.00 (one-time)
5. **Create Payment Link**
6. **Success URL:** `https://www.golocapo.com/thank-you?product=LaunchPack`
7. **Copy Payment Link URL**

### In Vercel:
1. **Settings** → **Environment Variables**
2. **Add:**
   - **Name:** `STRIPE_CHECKOUT_URL`
   - **Value:** Your Payment Link URL
   - **Environment:** Production
3. **Save** → **Redeploy**

### Test:
```powershell
curl.exe -i https://www.golocapo.com/api/checkout-url
```

**Expected:** Returns Payment Link URL

---

## ✅ STEP 4: Test Money Flow (Dopamine Moment)

1. **Visit:** `https://www.golocapo.com/pricing`
2. **Click:** "Get LaunchPack — €49" (or update CTA if needed)
3. **Complete test payment:**
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/34`
   - CVC: `123`
   - ZIP: `12345`
4. **Verify:**
   - ✅ Redirects to `/thank-you?product=LaunchPack`
   - ✅ Delivery email sent (if configured)
   - ✅ Webhook fires (check Stripe Dashboard → Webhooks)

---

## 🚨 HARD STOP RULES

### Before Promotion:
- ❌ **NO posting** until `/prelaunch` returns 200
- ❌ **NO DM blasting** until `/prelaunch` returns 200
- ❌ **NO automation triggers** until `/prelaunch` returns 200

### After Fix:
- ✅ **ONLY promote** `/prelaunch` (one link everywhere)
- ✅ **ONLY use** "Golo Čapo LaunchPack" (locked product name)
- ✅ **ONLY price** at €49 (locked price)

---

## 📋 Success Checklist

- [ ] `/prelaunch` returns 200 (verified with `VERIFY_PRELAUNCH.ps1`)
- [ ] Root Directory set correctly in Vercel (empty or `/`)
- [ ] Product locked: "Golo Čapo LaunchPack" at €49
- [ ] Stripe Payment Link created
- [ ] `STRIPE_CHECKOUT_URL` set in Vercel
- [ ] Test payment completes successfully
- [ ] Redirect to `/thank-you` works
- [ ] Ready to promote

---

## 🎯 Once Complete

**You are 1 Stripe link away from first money.**

**Next actions:**
1. Run `PROMO_DAILY.ps1`
2. Post on X, LinkedIn, Instagram
3. Send 5–10 DMs using `docs/DAILY_OUTREACH_PLAYBOOK.md`
4. Track in `/data/audience.csv`

---

**Fix routing → Lock product → Collect €49 → Then optimize.**

