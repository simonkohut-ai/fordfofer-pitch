# Founding Offer Strategy - Money Extraction

**Goal:** Convert strangers into paying customers  
**Focus:** Cash collection, not likes  
**Status:** Production Ready

---

## Core Offer

### Founding Customer Deal

**Positioning:** "Founding Customer Deal" (not "discount" or "sale")

**Value Stack:**
- One-time setup fee (reduces commitment anxiety)
- First month free (reduces risk)
- Limited spots (creates urgency)
- Early access (exclusivity)

---

## Price Testing Matrix

### Test Prices

**Tier 1: €99**
- **Pros:** Low friction, high volume potential
- **Cons:** Lower revenue per customer, may attract price-sensitive buyers
- **Best For:** Volume testing, quick validation

**Tier 2: €149** ⭐ **CURRENT**
- **Pros:** Balanced, filters serious buyers, good revenue
- **Cons:** May be too high for some
- **Best For:** Main offer, quality customers

**Tier 3: €249**
- **Pros:** Higher revenue, premium positioning, serious buyers only
- **Cons:** Higher friction, fewer conversions
- **Best For:** Premium positioning, later testing

### Price Test Strategy

**Phase 1: Start with €149**
- Test for 7 days
- Track conversion rate
- Monitor customer quality

**Phase 2: A/B Test**
- Split traffic 50/50: €99 vs €149
- Track which converts better
- Monitor revenue per customer

**Phase 3: Optimize**
- Choose winning price
- Test €249 for premium segment
- Scale what works

---

## Scarcity (Hard Limit)

### Current: 10 Spots

**Rationale:**
- Creates urgency
- Maintains exclusivity
- Manageable for launch
- Can increase if needed

**Implementation:**
- Display: "Limited to 10 spots"
- Track: Count remaining spots
- Update: When spots fill, show "Sold Out" or increase limit

**Scarcity Language:**
- "Only 10 founding spots available"
- "Limited to 10 spots"
- "10 spots remaining" (update dynamically)

---

## Risk Reversal

### Guarantees

**1. Satisfaction Guarantee**
- "Not satisfied? Full refund within 30 days"
- Reduces purchase anxiety
- Builds trust

**2. Cancel Anytime**
- "Cancel anytime, no questions asked"
- Reduces commitment fear
- Clear exit path

**3. First Month Free**
- "First month free" (after setup fee)
- Reduces initial risk
- Lowers barrier to entry

**Risk Reversal Copy:**
- "Cancel anytime. Satisfaction guarantee."
- "30-day money-back guarantee"
- "No questions asked refund"

---

## Conversion Paths

### Path 1: Lead-Only (Free)

**Flow:**
1. Visit `/prelaunch`
2. See founding offer
3. Not ready to pay → Email capture
4. Join waitlist
5. Receive confirmation email
6. Follow-up sequence (future)

**CTA:** "Get Early Access" → Email form

**Goal:** Build email list, nurture to paid

---

### Path 2: Paid (Founding Customer)

**Flow:**
1. Visit `/prelaunch`
2. See founding offer
3. Ready to pay → Click "Claim Your Spot"
4. Redirect to Stripe checkout
5. Complete payment
6. Redirect to `/thank-you?src=checkout`
7. Receive confirmation email
8. Receive product delivery

**CTA:** "Claim Your Spot" → Stripe Payment Link

**Goal:** Immediate revenue, founding customers

---

### Path 3: Demo Booking

**Flow:**
1. Visit `/prelaunch`
2. Want to learn more → Click "Book Demo"
3. Redirect to Calendly
4. Book 15-min demo
5. Demo conversation
6. Convert to paid or lead

**CTA:** "Book a 15-min Demo" → Calendly link

**Goal:** High-intent leads, personal connection

---

## Copywriting Framework

### Pain → Outcome → Proof → CTA

**Template:**

**Pain (Problem):**
- "Spending hours creating Meta posts?"
- "Marketing takes too much time?"
- "No time for consistent content?"

**Outcome (Solution):**
- "Generate Meta-ready posts in seconds"
- "AI-powered marketing automation"
- "Marketing without chaos"

**Proof (Social Proof):**
- "Early adopters already using"
- "Limited to 10 founding spots"
- "Launching 21.12"

**CTA (Action):**
- "Claim Your Spot" (paid)
- "Get Early Access" (lead)
- "Book a Demo" (demo)

---

## Offer Copy Examples

### Example 1: Pain-Focused

**Headline:** "Spending Hours on Meta Posts?"

**Subheadline:** "Generate Meta-ready posts in seconds. Not hours."

**Body:**
- Problem: Marketing takes too much time
- Solution: AI-powered automation
- Proof: Early adopters, limited spots
- CTA: Claim your spot → €149

---

### Example 2: Outcome-Focused

**Headline:** "Marketing Automation for Startups"

**Subheadline:** "Generate Meta-ready posts in seconds. Launch 21.12."

**Body:**
- Benefit: Save 10+ hours per week
- Value: One-time setup + first month free
- Proof: Limited to 10 spots
- CTA: Claim your spot → €149

---

### Example 3: Urgency-Focused

**Headline:** "Founding Customer Deal: €149"

**Subheadline:** "Limited to 10 spots. Launching 21.12."

**Body:**
- Offer: One-time setup + first month free
- Scarcity: Only 10 spots available
- Risk reversal: Cancel anytime, satisfaction guarantee
- CTA: Claim your spot → €149

---

## Stripe Integration

### Payment Link Setup

**Product:** Golo Čapo Founding Customer Deal  
**Price:** €149 (one-time)  
**Success URL:** `https://www.golocapo.com/thank-you?src=checkout`  
**Cancel URL:** `https://www.golocapo.com/pricing`

**Environment Variable:**
- `STRIPE_CHECKOUT_URL` = Payment Link URL

**Implementation:**
- "Claim Your Spot" button → Stripe Payment Link
- Prefill email if available
- Track conversion events

---

## Conversion Optimization

### CTA Optimization

**Primary CTA (Paid):**
- "Claim Your Spot" (action-oriented)
- "Get Founding Access" (exclusivity)
- "Secure Your Spot" (urgency)

**Secondary CTA (Lead):**
- "Get Early Access" (low commitment)
- "Join Waitlist" (clear action)
- "Be First on 21.12" (urgency)

**Tertiary CTA (Demo):**
- "Book a 15-min Demo" (clear value)
- "Schedule a Demo" (professional)
- "Talk to Us" (personal)

### Trust Signals

**Add to Offer:**
- "Cancel anytime"
- "Satisfaction guarantee"
- "30-day money-back guarantee"
- "No questions asked refund"

**Social Proof:**
- "Early adopters already using"
- "Limited to 10 spots"
- "Launching 21.12"

---

## A/B Testing Plan

### Test 1: Price Points

**Variants:**
- A: €99 (low friction)
- B: €149 (current)
- C: €249 (premium)

**Metrics:**
- Conversion rate
- Revenue per customer
- Customer quality

**Winner:** Highest revenue (conversion rate × price)

---

### Test 2: CTA Copy

**Variants:**
- A: "Claim Your Spot"
- B: "Get Founding Access"
- C: "Secure Your Spot"

**Metrics:**
- Click-through rate
- Conversion rate

**Winner:** Highest conversion rate

---

### Test 3: Risk Reversal

**Variants:**
- A: "Cancel anytime"
- B: "30-day money-back guarantee"
- C: "Satisfaction guarantee"

**Metrics:**
- Conversion rate
- Refund rate

**Winner:** Highest conversion, lowest refund rate

---

## Success Metrics

### Conversion Metrics

**Primary:**
- Conversion rate (visitors → paid)
- Revenue per customer
- Total revenue

**Secondary:**
- Email signup rate (visitors → lead)
- Demo booking rate (visitors → demo)
- Lead → paid conversion rate

### Quality Metrics

**Customer Quality:**
- Engagement level
- Support requests
- Referrals
- Retention

**Offer Quality:**
- Refund rate (target: < 5%)
- Customer satisfaction
- Net Promoter Score (NPS)

---

## Implementation Checklist

### Stripe Setup
- [ ] Create product: "Golo Čapo Founding Customer Deal"
- [ ] Set price: €149 (one-time)
- [ ] Create Payment Link
- [ ] Set success URL: `/thank-you?src=checkout`
- [ ] Set cancel URL: `/pricing`
- [ ] Add `STRIPE_CHECKOUT_URL` to Vercel env vars

### Page Updates
- [ ] Update founding offer copy
- [ ] Add risk reversal language
- [ ] Update CTA buttons
- [ ] Add scarcity counter (if dynamic)
- [ ] Test payment flow

### Email Templates
- [ ] Payment confirmation email
- [ ] Product delivery email
- [ ] Follow-up sequence (future)

### Analytics
- [ ] Track "Claim Spot" clicks
- [ ] Track Stripe conversions
- [ ] Track thank-you page views
- [ ] Monitor conversion rates

---

## Next Steps

1. **Set up Stripe Payment Link** (15 min)
2. **Update offer copy** (30 min)
3. **Test payment flow** (10 min)
4. **Start A/B testing** (ongoing)
5. **Monitor conversions** (daily)

---

## Resources

- **Pricing Test Matrix:** `/docs/PRICING_TEST_MATRIX.md`
- **Sales Playbook:** `/docs/FIRST_SALES_PLAYBOOK.md`
- **Stripe Setup:** `/docs/STRIPE_LAUNCHPACK_SETUP.md`

---

**Remember:** Revenue > Beauty. Conversion > Traffic. Cash > Likes.

