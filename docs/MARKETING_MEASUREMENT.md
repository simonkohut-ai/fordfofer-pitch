# Marketing Measurement

## Overview

Track key events and metrics to measure prelaunch blitz effectiveness.

---

## Events Tracked

### Page View Events

**Event:** `page_view`

**Properties:**
- `page`: Page name (e.g., "prelaunch", "thank-you")
- `url`: Full URL
- `utm_source`: UTM source parameter
- `utm_medium`: UTM medium parameter
- `utm_campaign`: UTM campaign parameter

**When:** Every page load

---

### CTA Click Events

**Event:** `cta_click`

**Properties:**
- `type`: CTA type ("early_access", "claim_spot", "book_demo")
- `location`: Where the CTA was clicked (e.g., "hero", "founding_deal")

**When:** User clicks any CTA button

---

### Early Access Submit

**Event:** `early_access_submit`

**Properties:**
- `success`: Boolean (true/false)
- `error`: Error message (if failed)
- `source`: Source of submission (e.g., "prelaunch")

**When:** User submits email form

---

### Share Click

**Event:** `share_click`

**Properties:**
- `method`: Share method ("copy_link", "twitter", "linkedin", etc.)

**When:** User clicks share button

---

### Thank You Page View

**Event:** `thank_you_view`

**Properties:**
- `source`: Source ("prelaunch", "checkout", "stripe")
- `has_email`: Boolean (whether email param present)
- `has_product`: Boolean (whether product param present)

**When:** User lands on thank-you page

---

## How to View Events

### PostHog Dashboard

1. **Sign up:** https://posthog.com
2. **Add Project:** Create new project
3. **Get API Key:** Copy from Project Settings
4. **Set Environment Variable:** `POSTHOG_KEY=phc_xxxxx`
5. **View Events:** Go to "Events" tab

### Key Metrics to Monitor

1. **Page Views:**
   - Total prelaunch page views
   - Unique visitors
   - Traffic sources (UTM)

2. **CTAs:**
   - CTA click rate
   - Which CTAs perform best
   - Conversion by CTA type

3. **Conversions:**
   - Email submissions
   - Founding customer purchases
   - Conversion rate (visitors → customers)

4. **Engagement:**
   - Time on page
   - Scroll depth
   - Share clicks

---

## Recommended KPI Targets

### Week 1 Targets

- **Page Views:** 500+
- **Email Submissions:** 50+ (10% conversion)
- **Founding Customers:** 2-3 (0.5% conversion)
- **Revenue:** €300-450

### Week 2 Targets

- **Page Views:** 1,000+
- **Email Submissions:** 100+ (10% conversion)
- **Founding Customers:** 5-7 (0.7% conversion)
- **Revenue:** €750-1,050

### Week 3 Targets

- **Page Views:** 1,500+
- **Email Submissions:** 150+ (10% conversion)
- **Founding Customers:** 8-10 (0.7% conversion)
- **Revenue:** €1,200-1,500

---

## Conversion Funnel

1. **Traffic** → Page View
2. **Page View** → CTA Click (target: 20%)
3. **CTA Click** → Email Submit (target: 50%)
4. **Email Submit** → Founding Customer (target: 5%)

**Overall Conversion:** Traffic → Customer (target: 0.5-1%)

---

## UTM Parameter Tracking

UTM parameters are automatically captured and stored in sessionStorage, then passed to thank-you page.

**Parameters Tracked:**
- `utm_source`: Traffic source (e.g., "linkedin", "twitter")
- `utm_medium`: Medium (e.g., "social", "email")
- `utm_campaign`: Campaign name (e.g., "prelaunch_blitz")
- `utm_term`: Keyword (optional)
- `utm_content`: Content variant (optional)

**Example URLs:**
- `https://www.golocapo.com/prelaunch?utm_source=linkedin&utm_medium=social&utm_campaign=prelaunch_blitz`
- `https://www.golocapo.com/prelaunch?utm_source=email&utm_medium=email&utm_campaign=founders`

---

## Reporting Schedule

### Daily
- Check page views
- Check email submissions
- Check founding customer purchases
- Review top traffic sources

### Weekly
- Calculate conversion rates
- Identify top-performing channels
- Adjust strategy based on data
- Set next week's targets

### Monthly
- Full funnel analysis
- ROI by channel
- Customer acquisition cost (CAC)
- Lifetime value (LTV)

---

## Tools Used

- **PostHog:** Event tracking and analytics
- **Resend:** Email delivery tracking
- **Stripe:** Payment tracking
- **Vercel Analytics:** Basic page view tracking (optional)

---

## Key Metrics Dashboard

Create a simple dashboard tracking:

1. **Traffic:**
   - Total page views
   - Unique visitors
   - Traffic sources

2. **Engagement:**
   - CTA click rate
   - Email submission rate
   - Share clicks

3. **Conversions:**
   - Email submissions
   - Founding customers
   - Revenue

4. **Funnel:**
   - Traffic → CTA Click
   - CTA Click → Email Submit
   - Email Submit → Customer

---

## Action Items

1. **Set up PostHog:** Get API key and configure
2. **Test Events:** Verify all events are firing
3. **Set Targets:** Define weekly KPI targets
4. **Create Dashboard:** Build simple metrics dashboard
5. **Review Daily:** Check metrics every morning

---

## Troubleshooting

**Events not firing?**
- Check PostHog key is set correctly
- Check browser console for errors
- Verify PostHog script is loading

**UTM params not tracking?**
- Check URL has UTM parameters
- Verify sessionStorage is working
- Check thank-you page receives params

**Low conversion rate?**
- Review CTA copy and placement
- Test different messaging
- Check form usability
- Review pricing/offer

---

## Next Steps

1. Set up PostHog account
2. Add API key to environment variables
3. Test all events
4. Set up dashboard
5. Start tracking!

