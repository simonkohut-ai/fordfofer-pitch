# Verification Commands

## Quick Verification

Run these commands to verify all routes return 200:

```bash
curl -I https://www.golocapo.com/prelaunch
curl -I https://www.golocapo.com/robots.txt
curl -I https://www.golocapo.com/sitemap.xml
curl -I https://www.golocapo.com/pricing
curl -I https://www.golocapo.com/thank-you
curl -I https://www.golocapo.com/assets/brand/brand.css
curl -I https://www.golocapo.com/assets/brand/og.png
```

**Expected:** All should return `HTTP/2 200`

---

## PowerShell Verification Script

Run the included verification script:

```powershell
.\VERIFY_PRELAUNCH.ps1
```

**Expected Output:**
- ✅ All files exist
- ✅ All URLs return HTTP 200
- ✅ SUCCESS message

---

## Manual Browser Checks

1. **Prelaunch Page:**
   - Visit: https://www.golocapo.com/prelaunch
   - Verify: Page loads, form works, CTAs visible

2. **Email Capture:**
   - Submit email form
   - Verify: Success message appears
   - Check: Email received (if configured)

3. **Stripe Checkout:**
   - Click "Claim Your Spot"
   - Verify: Redirects to Stripe checkout
   - Test: Complete test payment

4. **Thank You Page:**
   - After email submission or payment
   - Verify: Correct message based on source
   - Check: Next steps displayed

---

## Analytics Verification

1. **PostHog:**
   - Check PostHog dashboard
   - Verify: Events are firing
   - Check: Page views tracked

2. **Browser Console:**
   - Open browser DevTools
   - Check Console for: "Event: page_view"
   - Verify: No errors

---

## Email Verification

1. **Confirmation Email:**
   - Submit email form
   - Check inbox for confirmation email
   - Verify: Email received (if Resend configured)

2. **Notification Email:**
   - Submit email form
   - Check operator inbox (if `LEADS_TO_EMAIL` configured)
   - Verify: Notification email received

---

## Stripe Verification

1. **Payment Link:**
   - Click "Claim Your Spot"
   - Verify: Redirects to Stripe
   - Test: Use test card `4242 4242 4242 4242`

2. **Webhook:**
   - Complete test payment
   - Check: Webhook received (if configured)
   - Verify: Customer record created

---

## Full Test Flow

1. **Traffic → Email:**
   - Visit prelaunch page
   - Submit email form
   - Verify: Success message
   - Check: Email received

2. **Traffic → Payment:**
   - Visit prelaunch page
   - Click "Claim Your Spot"
   - Complete test payment
   - Verify: Thank-you page
   - Check: Email received

3. **UTM Tracking:**
   - Visit: `https://www.golocapo.com/prelaunch?utm_source=test&utm_medium=email`
   - Submit email form
   - Verify: UTM params persist to thank-you page

---

## Troubleshooting

**404 Errors:**
- Check Vercel deployment status
- Verify files exist in repo
- Check `vercel.json` rewrites

**Email Not Sending:**
- Check `RESEND_API_KEY` is set
- Verify `RESEND_FROM_EMAIL` is valid
- Check Resend dashboard for errors

**Analytics Not Working:**
- Check `POSTHOG_KEY` is set
- Verify PostHog script loads
- Check browser console for errors

**Stripe Not Working:**
- Check `STRIPE_CHECKOUT_URL` is set
- Verify Payment Link is active
- Test with Stripe test card

---

## Pre-Launch Checklist

Before starting outreach:

- [ ] All routes return 200
- [ ] Email capture works
- [ ] Stripe checkout works
- [ ] Analytics tracking works
- [ ] Email notifications work
- [ ] Thank-you page works
- [ ] Mobile responsive
- [ ] All links work

---

## Post-Deployment Verification

After deploying:

1. Run verification script
2. Test email capture
3. Test Stripe checkout
4. Check analytics
5. Verify emails sent
6. Test on mobile

---

## Quick Reference

**Main URL:** https://www.golocapo.com/prelaunch  
**Verification Script:** `.\VERIFY_PRELAUNCH.ps1`  
**Expected Status:** HTTP 200 for all routes

