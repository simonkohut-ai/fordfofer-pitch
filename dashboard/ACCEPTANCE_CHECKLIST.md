# ✅ Acceptance Checklist - Production Ready

**Date:** Pre-Launch  
**Version:** 1.0.0-launch  
**Launch Date:** 21.12.2025

---

## A) PAYMENTS (STRIPE)

### Checkout Flow
- [ ] `/pricing` page loads without errors
- [ ] "Get Early Access – €49" button visible
- [ ] Clicking button redirects to `STRIPE_CHECKOUT_URL`
- [ ] Stripe checkout page loads correctly
- [ ] Test payment completes successfully
- [ ] Redirects to `/thank-you` after payment
- [ ] Thank you page shows confirmation message

### Webhook Integration
- [ ] Stripe webhook endpoint configured: `/api/stripe/webhook`
- [ ] `STRIPE_WEBHOOK_SECRET` set in environment
- [ ] Webhook signature verification works (crypto.createHmac)
- [ ] Test webhook event received successfully
- [ ] Payment data stored correctly
- [ ] Customer email captured and sanitized
- [ ] No secrets logged in webhook handler

### Payments Admin Panel
- [ ] Automation Hub → Payments panel visible
- [ ] Total payments count displays correctly
- [ ] Last payment timestamp shows
- [ ] Recent customers list (last 5, masked emails)
- [ ] Panel updates after webhook receives payment
- [ ] No errors if no payments yet

### Local Dev Testing
- [ ] `SHIP.ps1` script runs successfully
- [ ] `npm run dev` starts server on port 3000
- [ ] Stripe CLI forwarding works: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- [ ] Test webhook event triggers payment storage
- [ ] Payments panel updates in real-time

---

## B) PROMO KIT GENERATOR

### Page & Form
- [ ] `/promo-kit` page loads without errors
- [ ] Form fields pre-filled with fixed values:
  - Artist: "Golo Čapo" (readonly)
  - Track: "PTK – Někdo půjde z kola ven" (readonly)
  - Date: "21.12." (readonly)
- [ ] Theme selector works (Dark Minimal default)
- [ ] "Generate Promo Kit" button works

### Caption Generation
- [ ] Caption API `/api/assets/caption` returns 3-line format
- [ ] Caption displays correctly in output box
- [ ] Caption auto-copied to clipboard on generation
- [ ] Manual "Copy Caption" button works as fallback
- [ ] Caption format: `Artist\nTrack\nDate.`

### Image Generation
- [ ] Feed image generated (1080x1080)
- [ ] Story image generated (1080x1920)
- [ ] Images display correctly in browser
- [ ] Download buttons work for each image
- [ ] Images saved as SVG (downloadable)
- [ ] Dark Minimal theme applied correctly

### Output & Download
- [ ] All assets generated without manual scripts
- [ ] Images downloadable locally
- [ ] Caption copyable to clipboard
- [ ] No console errors during generation

---

## C) META POSTING (SAFE)

### Endpoint Security
- [ ] `/api/meta/post-latest` requires `META_POSTING_ENABLED=true`
- [ ] Endpoint returns 501 if posting disabled
- [ ] Confirmation token required (CSRF protection)
- [ ] Rate limiting applied (5 requests/minute)
- [ ] No auto-posting without confirmation

### UI Integration
- [ ] Promo Kit Posting panel in Automation Hub
- [ ] Panel shows connection status
- [ ] "Generate Promo Kit" button links to `/promo-kit`
- [ ] "Post to Facebook (Confirm)" button appears when enabled
- [ ] Confirmation modal appears before posting
- [ ] Post succeeds when confirmed

### Environment Flags
- [ ] `META_INTEGRATION_ENABLED` flag respected
- [ ] `META_POSTING_ENABLED` flag respected
- [ ] UI adapts based on flags
- [ ] No crashes if flags disabled

---

## D) LAUNCH STATUS / WAR ROOM

### War Room Page
- [ ] `/war-room` page loads without errors
- [ ] No console errors on load
- [ ] Page auto-refreshes every 30 seconds

### Display Data
- [ ] Launch countdown shows (days/hours/minutes to 21.12.2025 20:00)
- [ ] Payments summary displays:
  - Total payments count
  - Last payment timestamp
  - Recent customers count
- [ ] Meta status flags show:
  - Integration enabled/disabled
  - Posting enabled/disabled
  - Scheduler enabled/disabled
- [ ] Recent events list (last 20, sanitized)

### Error Handling
- [ ] No crashes if Stripe not configured
- [ ] No crashes if Meta not configured
- [ ] Graceful error messages displayed
- [ ] Retry button works on errors

---

## E) ROUTING & DX

### Local Development
- [ ] `npm run dev` works (uses `vercel dev -p 3000`)
- [ ] `SHIP.ps1` script runs successfully
- [ ] All routes accessible locally:
  - `/` → Homepage
  - `/dashboard` → Dashboard
  - `/pricing` → Pricing
  - `/promo-kit` → Promo Kit Generator
  - `/war-room` → War Room
  - `/thank-you` → Thank You
- [ ] API routes work:
  - `/api/checkout-url`
  - `/api/stripe/webhook`
  - `/api/payments/status`
  - `/api/assets/caption`
  - `/api/assets/post-image`
  - `/api/meta/post-latest`
  - `/api/launch/status`

### Error Handling
- [ ] User-friendly error messages (no technical jargon)
- [ ] 404 pages handled gracefully
- [ ] API errors return proper status codes
- [ ] Network errors show helpful messages

---

## F) DOCUMENTATION

### Required Docs
- [ ] `RUN_LOCAL.md` - Exact commands for local dev
- [ ] `CHECKOUT_SETUP.md` - Stripe webhook + env vars
- [ ] `QA_CHECKLIST.md` - Pre-launch verification
- [ ] `LAUNCH_RUNBOOK.md` - 21.12 launch steps
- [ ] `AUTOMATION_IMPLEMENTATION.md` - What was built + why
- [ ] `ACCEPTANCE_CHECKLIST.md` - This file
- [ ] `SHIP.ps1` - One-command local setup

### Documentation Quality
- [ ] All commands are copy-pasteable
- [ ] Environment variables clearly listed
- [ ] Test URLs provided
- [ ] Troubleshooting sections included

---

## G) SECURITY

### Secrets & Logging
- [ ] No secrets logged (tokens, API keys, webhook secrets)
- [ ] Email addresses masked in admin views
- [ ] Webhook payloads sanitized before logging
- [ ] All sensitive data redacted

### Rate Limiting
- [ ] Posting endpoints rate limited
- [ ] Webhook endpoint protected
- [ ] Rate limit errors return 429 status

### CSRF Protection
- [ ] Confirmation tokens required for posting
- [ ] Tokens validated server-side
- [ ] Invalid tokens rejected

### Security Headers
- [ ] Content-Security-Policy set
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy set

---

## H) IDENTITY & BRANDING

### Public Identity
- [ ] Only "Golo Čapo" in public-facing content
- [ ] No "Šimon Kohút" references anywhere
- [ ] Brand consistency across all pages
- [ ] Footer shows "AI Marketing Studio by Golo Čapo"

---

## Final Verification

### Pre-Launch (T-24 hours)
- [ ] All acceptance tests pass
- [ ] Environment variables set in Vercel
- [ ] Stripe webhook configured
- [ ] Domain DNS configured
- [ ] SSL certificate valid
- [ ] All routes tested end-to-end

### Launch Day (21.12.2025)
- [ ] Final deployment successful
- [ ] Health checks pass
- [ ] Payments flow tested
- [ ] Promo kit generator tested
- [ ] War Room accessible
- [ ] Monitoring active

---

## Test URLs (Local)

```
http://localhost:3000/              # Homepage
http://localhost:3000/dashboard      # Dashboard
http://localhost:3000/pricing       # Pricing
http://localhost:3000/promo-kit     # Promo Kit Generator
http://localhost:3000/war-room      # War Room
http://localhost:3000/thank-you     # Thank You
```

## Test URLs (Production)

```
https://golocapo.com/               # Homepage
https://golocapo.com/dashboard      # Dashboard
https://golocapo.com/pricing        # Pricing
https://golocapo.com/promo-kit      # Promo Kit Generator
https://golocapo.com/war-room       # War Room
https://golocapo.com/thank-you      # Thank You
```

---

## Environment Variables Required

### Production (Vercel)
```
STRIPE_CHECKOUT_URL=https://buy.stripe.com/...
STRIPE_WEBHOOK_SECRET=whsec_...
OPENAI_API_KEY=sk-... (optional)
META_INTEGRATION_ENABLED=true/false
META_POSTING_ENABLED=true/false
META_SCHEDULER_ENABLED=true/false
```

### Local Development
```powershell
$env:STRIPE_CHECKOUT_URL="https://buy.stripe.com/test_..."
$env:STRIPE_WEBHOOK_SECRET="whsec_test_..." # From Stripe CLI
$env:OPENAI_API_KEY="sk-..." # Optional
$env:META_INTEGRATION_ENABLED="false"
$env:META_POSTING_ENABLED="false"
```

---

**Status:** ✅ Ready for Launch  
**Last Updated:** Pre-Launch  
**Next Review:** T-1 hour before launch

