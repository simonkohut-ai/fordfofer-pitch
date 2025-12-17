# Release Plan - What Goes Live, When

**Date:** 2025-12-17  
**Purpose:** Clear release schedule and priorities  
**Status:** Production Ready

---

## What Is Live NOW

### GoLoČapo (www.golocapo.com)

**Live Routes:**
- ✅ `/` → GoLoČapo homepage (premium redesign)
- ✅ `/prelaunch` → Global prelaunch offer (conversion-focused)
- ✅ `/pricing` → Pricing page (€149 founding offer)
- ✅ `/thank-you` → Conversion endpoint

**Live Features:**
- ✅ Email capture (lead form)
- ✅ Stripe checkout integration
- ✅ Payment processing (webhook)
- ✅ Revenue tracking
- ✅ PostHog analytics (if configured)
- ✅ SEO (robots.txt, sitemap.xml, meta tags)

**Status:** ✅ **LIVE** - Production ready

---

## What Is Live After MikoRK Deploy

### MikoRK pohrebníctvo

**Deployment:**
- ⏳ `www.mikork.sk` (or subdomain)
- ⏳ Homepage, contact, services, about pages
- ⏳ Contact form with email notifications
- ⏳ Local SEO optimization
- ⏳ Google Business Profile ready

**Status:** ⏳ **READY TO DEPLOY** - Waiting for:
1. Client config update (real business data)
2. Environment variables setup
3. Domain configuration
4. Deployment

**Timeline:** Can deploy immediately after config update

---

## What Is Postponed (Explicitly)

### GoLoČapo Features

**Postponed:**
- ⏸️ Full dashboard (internal ops only for now)
- ⏸️ AI Marketing Studio product (prelaunch phase)
- ⏸️ Advanced automation (n8n workflows)
- ⏸️ Meta integration (not needed yet)
- ⏸️ Advanced analytics dashboards

**Reason:** Focus on revenue first, features later

**When:** After first paying customers

---

### MikoRK Features

**Postponed:**
- ⏸️ Services page content (template exists, needs content)
- ⏸️ About page content (template exists, needs content)
- ⏸️ Blog section (not needed yet)
- ⏸️ Advanced automation (content generator exists, not deployed)

**Reason:** MVP first, enhancements later

**When:** After client feedback and revenue

---

### General Features

**Postponed:**
- ⏸️ Multi-client dashboard (not needed yet)
- ⏸️ Advanced CRM features (not needed yet)
- ⏸️ Advanced analytics (basic is enough)
- ⏸️ Mobile apps (not needed)
- ⏸️ API documentation (not public yet)

**Reason:** Revenue > Features

**When:** After revenue justifies development

---

## What Will NEVER Be Built (Unless Revenue Justifies)

### Never Build (Unless Revenue > €5,000/month)

**Features:**
- ❌ Custom mobile apps
- ❌ Advanced AI features (beyond content generation)
- ❌ Complex CRM systems
- ❌ Multi-tenant SaaS platform
- ❌ White-label solutions
- ❌ Enterprise features

**Reason:** Not aligned with current business model

**When:** Only if revenue > €5,000/month and demand exists

---

### Never Build (Unless Specific Client Pays)

**Features:**
- ❌ Custom integrations (unless paid)
- ❌ Advanced automation (unless paid)
- ❌ Custom design work (unless paid)
- ❌ Complex features (unless paid)

**Reason:** Time = Money. Only build what's paid for.

**When:** Only if specific client requests and pays

---

## Release Schedule

### Phase 1: Current (Week 1)

**GoLoČapo:**
- ✅ Homepage live
- ✅ Prelaunch live
- ✅ Pricing live
- ✅ Thank-you live

**Status:** ✅ **COMPLETE**

---

### Phase 2: MikoRK Deployment (Week 2-3)

**MikoRK:**
- ⏳ Update client config
- ⏳ Set environment variables
- ⏳ Deploy to production
- ⏳ Set up Google Business Profile
- ⏳ Test and verify

**Status:** ⏳ **READY TO DEPLOY**

**Timeline:** 1-2 weeks after client provides data

---

### Phase 3: First Revenue (Week 4)

**Goals:**
- ✅ First MikoRK payment received
- ✅ First GoLoČapo prelaunch conversion (if any)
- ✅ Break-even achieved
- ✅ Profitability confirmed

**Status:** ⏳ **PENDING**

---

### Phase 4: Scale (Months 2-3)

**Goals:**
- ⏸️ Second MikoRK client
- ⏸️ First maintenance client
- ⏸️ Recurring revenue established
- ⏸️ Process optimization

**Status:** ⏸️ **FUTURE**

---

## Priority Matrix

### High Priority (Do Now)

1. ✅ **Deploy MikoRK** → First revenue
2. ✅ **Get first paying client** → Break-even
3. ✅ **Optimize conversion** → More revenue

---

### Medium Priority (Do Soon)

1. ⏸️ **Sell maintenance** → Recurring revenue
2. ⏸️ **Get second client** → Scale
3. ⏸️ **Optimize delivery** → Efficiency

---

### Low Priority (Do Later)

1. ⏸️ **Advanced features** → After revenue
2. ⏸️ **New products** → After validation
3. ⏸️ **Scale operations** → After profit

---

## Release Criteria

### Go-Live Criteria

**MikoRK:**
- [x] Client config updated
- [ ] Environment variables set
- [ ] Domain configured
- [ ] Contact form tested
- [ ] Email notifications working
- [ ] Google Business Profile ready

**GoLoČapo:**
- [x] All routes working
- [x] Payment flow working
- [x] Email capture working
- [x] Analytics configured (optional)
- [x] SEO configured

---

## What's Blocked

### Current Blockers

**MikoRK Deployment:**
- ⚠️ Client config needs real business data
- ⚠️ Environment variables need to be set
- ⚠️ Domain needs to be configured

**Not Blocked:**
- ✅ Code is ready
- ✅ Templates are ready
- ✅ Documentation is ready
- ✅ System is ready

---

## Success Metrics

### Week 1

**GoLoČapo:**
- ✅ All routes live
- ✅ Payment flow working
- ✅ Lead capture working

**MikoRK:**
- ⏳ Deployed (pending config)

---

### Month 1

**Revenue:**
- ⏳ First MikoRK payment: €1,500
- ⏳ Break-even: Achieved
- ⏳ Profitability: Confirmed

---

### Month 3

**Revenue:**
- ⏸️ Second MikoRK client: €1,500
- ⏸️ First maintenance: €300/month
- ⏸️ Total: €3,000 + €300/month recurring

---

## Release Checklist

### Before Each Release

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Environment variables set
- [ ] Domain configured
- [ ] Payment flow tested
- [ ] Email notifications tested
- [ ] Mobile viewport tested
- [ ] Performance verified

---

## Summary

### What's Live

**GoLoČapo:** ✅ **LIVE**
- Homepage, prelaunch, pricing, thank-you
- Payment flow, lead capture, revenue tracking

**MikoRK:** ⏳ **READY TO DEPLOY**
- Code complete, waiting for config and deployment

### What's Postponed

- Advanced features (after revenue)
- Complex automation (after revenue)
- New products (after validation)

### What's Never Built

- Unless revenue > €5,000/month
- Unless specific client pays
- Unless demand justifies

---

**Focus: Revenue first, features later. Deploy MikoRK → Get first payment → Scale.**

