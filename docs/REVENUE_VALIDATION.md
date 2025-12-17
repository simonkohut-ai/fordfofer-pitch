# Revenue Validation System

**Goal:** Prove money before scale  
**Rule:** If it doesn't make money → cut it  
**Focus:** Minimum Viable Revenue (MVR), CAC, Break-even

---

## Minimum Viable Revenue (MVR)

### Definition

**MVR = The minimum revenue needed to prove the business model works**

**Current MVR:** €149 (one founding customer)

**Rationale:**
- One paying customer = validation
- €149 = serious buyer (not free user)
- Covers initial costs + proves demand

### MVR Targets

**Phase 1: Proof (Week 1)**
- **Target:** €149 (1 customer)
- **Goal:** Prove someone will pay
- **Success:** First payment received

**Phase 2: Validation (Week 2-4)**
- **Target:** €447-745 (3-5 customers)
- **Goal:** Prove repeatability
- **Success:** Multiple customers, consistent conversions

**Phase 3: Scale (Month 2+)**
- **Target:** €1,490+ (10+ customers)
- **Goal:** Prove scalability
- **Success:** Sustainable revenue stream

---

## CAC Assumptions

### Customer Acquisition Cost (CAC)

**Definition:** Cost to acquire one paying customer

**Current Assumptions:**

**Organic CAC (Free Channels):**
- LinkedIn outreach: €0 (time only)
- Email outreach: €0 (time only)
- Social media: €0 (time only)
- Content marketing: €0 (time only)
- **Total:** €0 (time investment only)

**Paid CAC (Future):**
- Paid ads: €10-50 per customer (estimated)
- Content amplification: €5-20 per customer
- **Total:** €15-70 per customer (when budget exists)

### CAC Targets

**Phase 1: Organic Only**
- **Target CAC:** €0 (time only)
- **Method:** Free channels only
- **Goal:** Prove organic acquisition works

**Phase 2: Hybrid**
- **Target CAC:** €10-30 per customer
- **Method:** Mix of organic + small paid tests
- **Goal:** Optimize acquisition cost

**Phase 3: Scale**
- **Target CAC:** < €50 per customer
- **Method:** Optimized paid + organic
- **Goal:** Scale profitably

---

## Break-Even Math

### Current Break-Even Calculation

**Fixed Costs (Monthly):**
- Hosting (Vercel): €0 (free tier)
- Domain: €10/year = €0.83/month
- Email (Resend): €0 (free tier)
- **Total Fixed:** ~€1/month

**Variable Costs (Per Customer):**
- OpenAI API: ~€0.01-0.05 per generation
- Stripe fees: 2.9% + €0.30 per transaction
- **Total Variable:** ~€4.50 per €149 sale

**Break-Even Point:**
- **Revenue per customer:** €149
- **Cost per customer:** ~€4.50
- **Profit per customer:** ~€144.50
- **Break-even:** 1 customer = profitable

### Break-Even Targets

**Immediate (Week 1):**
- **Break-even:** 1 customer (€149)
- **Goal:** Cover variable costs
- **Status:** ✅ Already profitable at 1 customer

**Short-term (Month 1):**
- **Break-even:** 3-5 customers (€447-745)
- **Goal:** Cover fixed + variable costs
- **Status:** ✅ Profitable at 3+ customers

**Long-term (Month 2+):**
- **Break-even:** 10+ customers (€1,490+)
- **Goal:** Sustainable revenue stream
- **Status:** ✅ Profitable at 10+ customers

---

## Revenue Tracking

### Key Metrics

**Daily Revenue:**
- Total revenue per day
- Revenue per customer
- Revenue per source

**Conversion Rates:**
- Lead → Sale conversion rate
- Source → Sale conversion rate
- Time to conversion

**Source Attribution:**
- Where customers came from
- Which sources convert best
- Cost per source

### Tracking Implementation

**Data Sources:**
1. Stripe webhook → Payment events
2. Lead capture → Lead events
3. Source tracking → UTM parameters

**Storage:**
- `data/revenue.csv` - Revenue records
- `data/leads.csv` - Lead records
- `data/customers.csv` - Customer records

---

## Lead → Sale Funnel

### Funnel Stages

**Stage 1: Visitor**
- Visits `/prelaunch`
- Source: LinkedIn, Email, Social, Direct

**Stage 2: Lead**
- Submits email
- Source tracked
- Tagged with intent

**Stage 3: Qualified Lead**
- High intent signal
- Engaged with content
- Responded to outreach

**Stage 4: Customer**
- Completed payment
- Source attributed
- Conversion tracked

### Conversion Rates

**Current Assumptions:**

**Visitor → Lead:**
- **Target:** 3-5%
- **Current:** TBD (tracking)

**Lead → Qualified Lead:**
- **Target:** 10-20%
- **Current:** TBD (tracking)

**Qualified Lead → Customer:**
- **Target:** 20-30%
- **Current:** TBD (tracking)

**Overall Funnel:**
- **Visitor → Customer:** 0.6-3% (3% × 20% × 30%)
- **Target:** 1-2% overall conversion

---

## Source Attribution

### Source Categories

**Organic:**
- LinkedIn (direct outreach)
- Email (cold email)
- Twitter/X (social posts)
- Reddit (community posts)
- Direct (direct traffic)

**Paid (Future):**
- Paid ads
- Content amplification
- Sponsored posts

### Attribution Tracking

**UTM Parameters:**
- `utm_source` - Source (linkedin, email, twitter)
- `utm_medium` - Medium (social, email, direct)
- `utm_campaign` - Campaign name
- `utm_content` - Content variant

**Tracking Flow:**
1. Visitor arrives with UTM → Stored in session
2. Lead submits email → UTM attached to lead
3. Customer pays → UTM attached to customer
4. Revenue attributed to source

---

## Validation Criteria

### Phase 1: Proof (Week 1)

**Success Criteria:**
- [ ] 1+ paying customer
- [ ] Revenue ≥ €149
- [ ] CAC = €0 (organic only)
- [ ] Break-even achieved

**If Failed:**
- Cut non-converting sources
- Optimize offer
- Test different price points

---

### Phase 2: Validation (Week 2-4)

**Success Criteria:**
- [ ] 3-5 paying customers
- [ ] Revenue ≥ €447
- [ ] Conversion rate ≥ 1%
- [ ] Multiple sources converting

**If Failed:**
- Double down on converting sources
- Cut non-converting sources
- Optimize funnel

---

### Phase 3: Scale (Month 2+)

**Success Criteria:**
- [ ] 10+ paying customers
- [ ] Revenue ≥ €1,490
- [ ] CAC < €50
- [ ] Sustainable growth

**If Failed:**
- Optimize acquisition channels
- Improve conversion rates
- Test new sources

---

## Decision Framework

### If It Doesn't Make Money → Cut It

**Red Flags:**
- Source with 0 conversions after 50+ leads
- Channel costing more than revenue generated
- Funnel stage with < 1% conversion
- Time investment not generating revenue

**Cut Criteria:**
- No revenue after 1 week of effort
- CAC > Revenue per customer
- Conversion rate < 0.5%
- Time cost > Revenue potential

**Keep Criteria:**
- Generating revenue
- CAC < Revenue per customer
- Conversion rate ≥ 1%
- Positive ROI

---

## Tracking Dashboard

**Daily Metrics:**
- Revenue today
- Customers today
- Conversion rate today
- Source performance today

**Weekly Metrics:**
- Revenue this week
- Customers this week
- Conversion rate this week
- Source performance this week

**Monthly Metrics:**
- Revenue this month
- Customers this month
- CAC this month
- Break-even status

---

## Next Steps

1. **Set up tracking** (Week 1)
   - Implement revenue tracking
   - Set up source attribution
   - Create dashboard

2. **Track first customer** (Week 1)
   - Record source
   - Calculate CAC
   - Verify break-even

3. **Optimize** (Week 2+)
   - Double down on converting sources
   - Cut non-converting sources
   - Improve conversion rates

---

**Remember:** If it doesn't make money → cut it. Prove money before scale.

