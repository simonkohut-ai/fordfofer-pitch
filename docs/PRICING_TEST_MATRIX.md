# Pricing Test Matrix - Data-Driven Pricing

**Goal:** Find optimal price point that maximizes revenue  
**Method:** A/B testing, conversion tracking  
**Focus:** Revenue per customer, not just conversion rate

---

## Test Prices

### Tier 1: €99

**Positioning:** "Accessible Founding Deal"

**Pros:**
- Low friction (easy yes)
- High volume potential
- Quick validation
- Attracts price-sensitive buyers

**Cons:**
- Lower revenue per customer
- May attract low-quality buyers
- Less exclusivity

**Target Customer:**
- Solo founders
- Budget-conscious startups
- Early adopters

**Expected Conversion:** 5-8%  
**Expected Revenue:** €495-792 per 100 visitors

---

### Tier 2: €149 ⭐ **CURRENT**

**Positioning:** "Founding Customer Deal"

**Pros:**
- Balanced price point
- Filters serious buyers
- Good revenue per customer
- Maintains exclusivity

**Cons:**
- May be too high for some
- Moderate friction

**Target Customer:**
- Small teams (2-10 people)
- Serious founders
- Early adopters with budget

**Expected Conversion:** 3-5%  
**Expected Revenue:** €447-745 per 100 visitors

---

### Tier 3: €249

**Positioning:** "Premium Founding Deal"

**Pros:**
- Higher revenue per customer
- Premium positioning
- Serious buyers only
- High exclusivity

**Cons:**
- Higher friction
- Fewer conversions
- May price out some buyers

**Target Customer:**
- Agencies
- Established startups
- High-value customers

**Expected Conversion:** 1-3%  
**Expected Revenue:** €249-747 per 100 visitors

---

## Testing Strategy

### Phase 1: Baseline (Week 1)

**Price:** €149  
**Goal:** Establish baseline conversion rate

**Metrics:**
- Conversion rate
- Revenue per customer
- Customer quality

**Target:** 3-5% conversion rate

---

### Phase 2: A/B Test (Week 2-3)

**Split:** 50/50 traffic

**Test A:** €99  
**Test B:** €149

**Metrics:**
- Conversion rate (A vs B)
- Revenue per customer (A vs B)
- Total revenue (A vs B)
- Customer quality (A vs B)

**Winner Criteria:** Highest total revenue

**Example:**
- €99: 6% conversion = €594 per 100 visitors
- €149: 4% conversion = €596 per 100 visitors
- **Winner:** €149 (slightly higher revenue + better customers)

---

### Phase 3: Premium Test (Week 4)

**If €149 wins:**
- Test €249 for premium segment
- 20% of traffic → €249
- 80% of traffic → €149

**If €99 wins:**
- Test €149 vs €99 again
- Refine positioning

---

### Phase 4: Optimize (Week 5+)

**Choose winning price:**
- Based on revenue data
- Consider customer quality
- Scale what works

---

## Test Implementation

### Stripe Payment Links

**Create 3 Payment Links:**
1. `STRIPE_CHECKOUT_URL_99` → €99
2. `STRIPE_CHECKOUT_URL_149` → €149 (current)
3. `STRIPE_CHECKOUT_URL_249` → €249

**A/B Test Logic:**
```javascript
// Simple 50/50 split
const priceTier = Math.random() < 0.5 ? '99' : '149';
const checkoutUrl = process.env[`STRIPE_CHECKOUT_URL_${priceTier}`];
```

**Or use PostHog feature flags:**
- Set up feature flag for price testing
- Split traffic automatically
- Track conversions per variant

---

## Metrics to Track

### Primary Metrics

**Conversion Rate:**
- Visitors → Paid customers
- Track per price tier
- Target: 3-5% (€149)

**Revenue per Customer:**
- Price × conversion rate
- Track per price tier
- Target: Maximize

**Total Revenue:**
- Conversion rate × Price × Visitors
- Track per price tier
- Target: Maximize

### Secondary Metrics

**Customer Quality:**
- Engagement level
- Support requests
- Referrals
- Retention

**Refund Rate:**
- Refunds / Total sales
- Track per price tier
- Target: < 5%

---

## Decision Framework

### Choose Price Based On:

**1. Revenue Maximization:**
- Highest: Conversion rate × Price
- Example: 6% × €99 = €594 vs 4% × €149 = €596
- **Winner:** €149

**2. Customer Quality:**
- Higher price = better customers
- Better customers = more referrals
- More referrals = lower CAC

**3. Positioning:**
- Premium price = premium positioning
- Low price = volume positioning
- Choose based on brand strategy

---

## Expected Results

### Conservative Estimates

**€99:**
- Conversion: 5-8%
- Revenue: €495-792 per 100 visitors
- Customer quality: Medium

**€149:**
- Conversion: 3-5%
- Revenue: €447-745 per 100 visitors
- Customer quality: High

**€249:**
- Conversion: 1-3%
- Revenue: €249-747 per 100 visitors
- Customer quality: Very High

### Optimistic Estimates

**€99:**
- Conversion: 8-12%
- Revenue: €792-1,188 per 100 visitors

**€149:**
- Conversion: 5-8%
- Revenue: €745-1,192 per 100 visitors

**€249:**
- Conversion: 3-5%
- Revenue: €747-1,245 per 100 visitors

---

## Testing Timeline

### Week 1: Baseline
- Price: €149
- Goal: 10-20 customers
- Revenue target: €1,490-2,980

### Week 2-3: A/B Test
- Split: €99 vs €149
- Goal: 20-30 customers total
- Revenue target: €2,000-4,000

### Week 4: Premium Test
- Split: €149 (80%) vs €249 (20%)
- Goal: 10-15 customers
- Revenue target: €1,500-3,000

### Week 5+: Optimize
- Choose winning price
- Scale what works
- Continue testing

---

## Implementation

### Stripe Setup

**Create 3 Products:**
1. "Founding Customer Deal - €99"
2. "Founding Customer Deal - €149"
3. "Founding Customer Deal - €249"

**Create 3 Payment Links:**
- One for each price
- Same success/cancel URLs
- Track separately

**Environment Variables:**
- `STRIPE_CHECKOUT_URL_99`
- `STRIPE_CHECKOUT_URL_149` (current)
- `STRIPE_CHECKOUT_URL_249`

### A/B Test Implementation

**Option 1: Simple Split**
```javascript
const priceTier = Math.random() < 0.5 ? '99' : '149';
const checkoutUrl = process.env[`STRIPE_CHECKOUT_URL_${priceTier}`];
```

**Option 2: PostHog Feature Flags**
- Set up feature flag
- Split traffic automatically
- Track conversions per variant

**Option 3: URL Parameter**
- `?price=99` → €99
- `?price=149` → €149 (default)
- `?price=249` → €249

---

## Success Criteria

### Week 1 (Baseline)
- ✅ 10+ customers at €149
- ✅ 3-5% conversion rate
- ✅ €1,490+ revenue

### Week 2-3 (A/B Test)
- ✅ 20+ customers total
- ✅ Identify winning price
- ✅ €2,000+ revenue

### Week 4 (Premium Test)
- ✅ 10+ customers
- ✅ Test premium positioning
- ✅ €1,500+ revenue

### Week 5+ (Optimize)
- ✅ Scale winning price
- ✅ Continue testing
- ✅ Maximize revenue

---

## Monitoring

### Daily
- Check conversion rates
- Monitor revenue
- Track customer quality

### Weekly
- Review test results
- Adjust strategy
- Plan next test

### Monthly
- Full analysis
- Choose final price
- Scale what works

---

## Resources

- **Offer Strategy:** `/docs/OFFER_STRATEGY.md`
- **Sales Playbook:** `/docs/FIRST_SALES_PLAYBOOK.md`
- **Stripe Setup:** `/docs/STRIPE_LAUNCHPACK_SETUP.md`

---

**Remember:** Revenue = Conversion Rate × Price. Optimize for total revenue, not just conversion rate.

