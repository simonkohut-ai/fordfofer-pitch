# Final Deploy Steps - Zero Guessing

**Purpose:** Step-by-step deployment guide with rollback procedures  
**Last Updated:** 2025-12-17

---

## Pre-Deployment Checklist

### What to Check Locally

**1. Git Status**
```bash
git status
# Should show: "working tree clean" or only expected changes
```

**2. Test Routes Locally (if possible)**
```bash
# Start local server (if you have one)
# Or skip - Vercel will handle
```

**3. Verify Files Exist**
```bash
# Check critical files exist
ls dashboard/index.html
ls prelaunch.html
ls pricing.html
ls thank-you.html
ls robots.txt
ls sitemap.xml
```

**4. Check vercel.json**
```bash
cat vercel.json
# Verify all routes are configured
```

---

## What to Check in Vercel

### Before Deploying

**1. Environment Variables**
- Go to Vercel Dashboard → Project → Settings → Environment Variables
- Verify all required variables are set:
  - ✅ `RESEND_API_KEY`
  - ✅ `RESEND_FROM_EMAIL`
  - ✅ `STRIPE_CHECKOUT_URL`
  - ✅ `STRIPE_WEBHOOK_SECRET`
  - ✅ `STRIPE_SECRET_KEY`
  - ✅ `DOMAIN`
  - ✅ `NODE_ENV=production`

**2. Domain Configuration**
- Go to Settings → Domains
- Verify `www.golocapo.com` is configured
- Verify DNS records are correct

**3. Project Settings**
- Framework: Other (or Static)
- Root Directory: (default or `fordfofer-pitch`)
- Build Command: (empty for static)
- Output Directory: (empty for static)

**4. Latest Deployment**
- Check latest deployment status
- Verify no errors in logs
- Check build time (should be fast for static)

---

## Deployment Steps

### Step 1: Commit and Push

```bash
# Check what will be deployed
git status

# Add all changes
git add -A

# Commit
git commit -m "Production deployment: [describe changes]"

# Push to trigger deployment
git push origin main
```

**Expected:** Vercel automatically detects push and starts deployment

---

### Step 2: Monitor Deployment

**In Vercel Dashboard:**
1. Go to Deployments tab
2. Watch latest deployment
3. Check for errors in logs
4. Wait for "Ready" status

**Expected Time:** 1-3 minutes for static site

---

### Step 3: Verify Deployment

**Run Verification Script:**
```powershell
.\scripts\VERIFY_MIKORK_PROD.ps1
```

**Or Manual Checks:**

**Homepage:**
```bash
curl -I https://www.golocapo.com/
# Expected: 200 OK
```

**Prelaunch:**
```bash
curl -I https://www.golocapo.com/prelaunch
# Expected: 200 OK
```

**Pricing:**
```bash
curl -I https://www.golocapo.com/pricing
# Expected: 200 OK
```

**Thank You:**
```bash
curl -I https://www.golocapo.com/thank-you
# Expected: 200 OK
```

**SEO Files:**
```bash
curl -I https://www.golocapo.com/robots.txt
# Expected: 200 OK

curl -I https://www.golocapo.com/sitemap.xml
# Expected: 200 OK
```

**Brand Assets:**
```bash
curl -I https://www.golocapo.com/assets/brand/brand.css
# Expected: 200 OK

curl -I https://www.golocapo.com/assets/brand/logo.svg
# Expected: 200 OK
```

---

### Step 4: Test Functionality

**Test Contact Form (GoLoČapo):**
1. Go to `/prelaunch`
2. Fill out email form
3. Submit
4. Check email inbox (`LEADS_TO_EMAIL`)
5. Verify email notification received

**Test Payment Flow:**
1. Go to `/pricing`
2. Click "Claim Your Spot"
3. Verify redirects to Stripe checkout
4. Complete test payment (use test card: `4242 4242 4242 4242`)
5. Verify redirects to `/thank-you`
6. Check email for payment confirmation

**Test MikoRK Contact Form (if deployed):**
1. Go to MikoRK contact page
2. Fill out form
3. Submit
4. Check email inbox (`CONTACT_EMAIL`)
5. Verify email notification received

---

### Step 5: Browser Checks

**Desktop:**
- [ ] Chrome - Homepage loads
- [ ] Chrome - Prelaunch page loads
- [ ] Chrome - Contact form works
- [ ] Chrome - Payment flow works
- [ ] Firefox - Homepage loads
- [ ] Safari - Homepage loads

**Mobile:**
- [ ] Chrome Mobile - Homepage loads
- [ ] Chrome Mobile - Contact form works
- [ ] Safari Mobile - Homepage loads
- [ ] Test on actual device (if possible)

---

### Step 6: Performance Check

**Lighthouse (Chrome DevTools):**
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Run audit for `https://www.golocapo.com/`
4. Check scores:
   - Performance: Target 90+
   - Accessibility: Target 100
   - Best Practices: Target 90+
   - SEO: Target 90+

**Core Web Vitals:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

## What to Check After Deploy

### Immediate (Within 1 Hour)

- [ ] All routes return 200 OK
- [ ] Contact form works
- [ ] Payment flow works
- [ ] Email notifications received
- [ ] No errors in Vercel logs
- [ ] Mobile viewport works

---

### Day 1

- [ ] Monitor for errors
- [ ] Check analytics (if set up)
- [ ] Test with real users (if possible)
- [ ] Review deployment logs
- [ ] Verify all features work

---

### Week 1

- [ ] Monitor contact form submissions
- [ ] Monitor payment conversions
- [ ] Check for any user-reported issues
- [ ] Review performance metrics
- [ ] Make improvements based on data

---

## Rollback Steps

### If Deployment Fails

**Option 1: Revert Git Commit**

```bash
# Find last good commit
git log --oneline

# Revert to last good commit
git revert HEAD

# Push revert
git push origin main
```

**Option 2: Redeploy Previous Version**

**In Vercel:**
1. Go to Deployments tab
2. Find last successful deployment
3. Click "..." → "Redeploy"
4. Confirm redeploy

**Option 3: Fix and Redeploy**

1. Fix the issue locally
2. Commit fix
3. Push to trigger new deployment

---

### If Site Goes Down

**Emergency Fix Steps:**

1. **Check Vercel Status**
   - Go to https://vercel.com/status
   - Check if Vercel is having issues

2. **Check Deployment Logs**
   - Go to Deployments → Latest → Logs
   - Look for errors
   - Fix and redeploy

3. **Check Environment Variables**
   - Go to Settings → Environment Variables
   - Verify all required vars are set
   - Redeploy if missing

4. **Rollback to Previous Version**
   - Go to Deployments
   - Find last working version
   - Redeploy that version

5. **Contact Support**
   - If issue persists, contact Vercel support
   - Provide deployment logs
   - Describe the issue

---

## Emergency Contacts

### Vercel Support

- **Dashboard:** https://vercel.com/dashboard
- **Status:** https://vercel.com/status
- **Support:** https://vercel.com/support

### Service Status Pages

- **Resend:** https://status.resend.com
- **Stripe:** https://status.stripe.com
- **OpenAI:** https://status.openai.com

---

## Common Issues & Fixes

### Issue: Route Returns 404

**Check:**
1. File exists in correct location
2. `vercel.json` rewrite is configured
3. File is committed to Git
4. Deployment completed successfully

**Fix:**
1. Verify file exists
2. Check `vercel.json` configuration
3. Commit and push
4. Redeploy

---

### Issue: Contact Form Doesn't Work

**Check:**
1. `RESEND_API_KEY` is set
2. `RESEND_FROM_EMAIL` is verified in Resend
3. `CONTACT_EMAIL` (or `LEADS_TO_EMAIL`) is set
4. API endpoint exists and is deployed

**Fix:**
1. Set missing environment variables
2. Verify Resend account is active
3. Redeploy
4. Test again

---

### Issue: Payment Flow Doesn't Work

**Check:**
1. `STRIPE_CHECKOUT_URL` is set
2. Stripe Payment Link is active
3. Webhook is configured (if using)
4. Redirect URL is correct

**Fix:**
1. Set `STRIPE_CHECKOUT_URL`
2. Verify Payment Link in Stripe Dashboard
3. Configure webhook (if using)
4. Redeploy
5. Test again

---

### Issue: Email Not Sending

**Check:**
1. `RESEND_API_KEY` is valid
2. `RESEND_FROM_EMAIL` is verified
3. Resend account is active
4. Check Resend dashboard for errors

**Fix:**
1. Verify API key in Resend dashboard
2. Verify sender email domain
3. Check Resend account status
4. Redeploy
5. Test again

---

## Deployment Checklist

### Before Deploying

- [ ] All changes committed to Git
- [ ] `vercel.json` is correct
- [ ] All required files exist
- [ ] Environment variables are set
- [ ] Domain is configured
- [ ] Tested locally (if possible)

### During Deployment

- [ ] Monitor Vercel deployment
- [ ] Check for errors in logs
- [ ] Wait for "Ready" status

### After Deployment

- [ ] Verify all routes return 200 OK
- [ ] Test contact form
- [ ] Test payment flow
- [ ] Check email notifications
- [ ] Test on mobile
- [ ] Run Lighthouse audit
- [ ] Monitor for errors

---

## Quick Reference

### Deploy Command

```bash
git add -A
git commit -m "Deploy: [description]"
git push origin main
```

### Verify Command

```powershell
.\scripts\VERIFY_MIKORK_PROD.ps1
```

### Rollback Command

```bash
# In Vercel: Redeploy previous version
# Or in Git:
git revert HEAD
git push origin main
```

---

**Follow these steps exactly. No guessing. Everything is documented.**

