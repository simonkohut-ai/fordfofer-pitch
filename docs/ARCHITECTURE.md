# Architecture - Golo Čapo Production System

**Goal:** Clean, scalable, revenue-focused architecture  
**Principle:** If it doesn't drive revenue, SEO, or automation → remove it

---

## Production Routes

### Public Routes (Active)

**Marketing Pages:**
- `/` → `dashboard/index.html` (Homepage)
- `/prelaunch` → `prelaunch.html` (Waitlist funnel)
- `/pricing` → `pricing.html` (Pricing + founding deal)
- `/thank-you` → `thank-you.html` (Post-purchase)

**SEO:**
- `/robots.txt` → `robots.txt` (Search engine rules)
- `/sitemap.xml` → `sitemap.xml` (Site structure)

**API Routes:**
- `/api/leads/submit` → Lead capture
- `/api/leads/status` → Lead stats (admin)
- `/api/revenue/track` → Revenue tracking
- `/api/sales/qualify` → Lead qualification
- `/api/stripe/webhook` → Payment processing
- `/api/checkout-url` → Stripe checkout URL
- `/api/ai/outreach` → AI outreach generation
- `/api/n8n/webhook` → n8n integration

**Admin/Dashboard:**
- `/dashboard/revenue-dashboard.html` → Revenue dashboard (future)

---

## File Structure

### Root Level (Production)

**Essential Files:**
- `vercel.json` - Routing configuration
- `prelaunch.html` - Waitlist page
- `pricing.html` - Pricing page
- `thank-you.html` - Thank you page
- `robots.txt` - SEO
- `sitemap.xml` - SEO
- `README.md` - Project overview
- `ENV_VARIABLES.md` - Environment setup

**Documentation:**
- `docs/` - Essential documentation only

**Scripts:**
- `scripts/` - Production scripts only

---

### Dashboard (Production)

**Pages:**
- `index.html` - Homepage
- `prelaunch.html` - Waitlist (duplicate for routing)
- `pricing.html` - Pricing (duplicate for routing)
- `thank-you.html` - Thank you (duplicate for routing)
- `revenue-dashboard.html` - Revenue dashboard

**API Endpoints:**
- `api/leads/submit.mjs` - Lead capture
- `api/leads/status.mjs` - Lead stats
- `api/revenue/track.mjs` - Revenue tracking
- `api/sales/qualify.mjs` - Qualification
- `api/stripe/webhook.mjs` - Stripe webhook
- `api/checkout-url.mjs` - Checkout URL
- `api/ai/outreach.mjs` - AI outreach
- `api/n8n/webhook.mjs` - n8n webhook

**Utilities:**
- `api/utils/email.mjs` - Email sending
- `api/utils/leads-storage.mjs` - Lead storage
- `api/utils/storage.mjs` - Storage abstraction
- `api/utils/security.mjs` - Security headers
- `api/utils/rateLimit.mjs` - Rate limiting

**Assets:**
- `assets/brand/` - Brand assets (CSS, logos, icons)

**Configuration:**
- `package.json` - Dependencies

---

### Scripts (Production)

**Essential Scripts:**
- `scripts/ai_marketing_engine.mjs` - AI outreach generation
- `scripts/DAILY_OUTREACH.ps1` - Daily outreach automation
- `scripts/prompt_templates.md` - Prompt templates
- `VERIFY_PRELAUNCH.ps1` - Route verification

---

### Documentation (Essential Only)

**Core Docs:**
- `docs/ARCHITECTURE.md` - This file
- `docs/TECH_DEBT.md` - Technical debt tracking
- `docs/BRAND_SYSTEM.md` - Brand guidelines
- `docs/SEO_BASELINE.md` - SEO implementation
- `docs/OFFER_STRATEGY.md` - Offer strategy
- `docs/PRICING_TEST_MATRIX.md` - Pricing tests
- `docs/REVENUE_VALIDATION.md` - Revenue validation
- `docs/BUDGET_DEPLOYMENT.md` - Budget deployment
- `docs/AI_MARKETING_ENGINE.md` - AI engine docs
- `docs/CLOSING_SCRIPTS.md` - Sales scripts
- `docs/SALES_AUTOMATION.md` - Sales automation
- `docs/FIRST_SALES_PLAYBOOK.md` - Sales playbook

---

## Removed / Archive

**Removed:**
- All `.bat` deployment scripts (100+ files)
- Old documentation files (200+ markdown files)
- Archive folders: `landing-page/`, `chiara-desktop-app/`, `p2ba-console/`, `p2ba-core/`
- Unused API endpoints
- Redundant client sites (if not needed)
- Old test files

**Archive (If Needed):**
- Move to `archive/` folder
- Not deployed to production
- Keep for reference only

---

## Build Optimization

### Current Build

**Static Files:**
- HTML pages: ~50KB each
- CSS: `assets/brand/brand.css` (~10KB)
- JavaScript: Minimal (vanilla JS)
- Images: Optimized PNGs

**API Functions:**
- Serverless functions: ~5-10KB each
- Dependencies: Minimal (Resend, OpenAI SDK)

**Total Build Size:** ~500KB (estimated)

---

### Optimization Targets

**HTML:**
- Minify HTML (remove comments, whitespace)
- Target: < 30KB per page

**CSS:**
- Minify CSS
- Remove unused styles
- Target: < 8KB

**JavaScript:**
- Keep vanilla JS (no frameworks)
- Minify if needed
- Target: < 20KB total

**Images:**
- Optimize PNGs
- Use WebP if possible
- Target: < 100KB per image

**Total Target:** < 300KB

---

## Load Time Optimization

### Current Performance

**First Contentful Paint:** TBD  
**Time to Interactive:** TBD  
**Largest Contentful Paint:** TBD

### Optimization Strategies

1. **Minimize HTTP Requests**
   - Combine CSS files
   - Inline critical CSS
   - Defer non-critical JS

2. **Optimize Assets**
   - Compress images
   - Use CDN for static assets
   - Enable gzip/brotli

3. **Caching**
   - Set cache headers
   - Use Vercel edge caching
   - Cache static assets

4. **Code Splitting**
   - Load only what's needed
   - Defer non-critical scripts
   - Lazy load images

---

## Dependencies

### Production Dependencies

**Required:**
- `resend` - Email sending
- (OpenAI SDK if using AI features)

**Optional:**
- `@langchain/core` - AI features
- `@langchain/openai` - AI features

**Removed:**
- `express` - Not needed (serverless)
- `axios` - Use native fetch
- `dotenv` - Vercel handles env vars

---

## Security

### Headers

**Security Headers (via `api/utils/security.mjs`):**
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` - Per page

### Rate Limiting

**Rate Limits:**
- Lead submission: 5 requests/minute
- API endpoints: 100 requests/minute
- Revenue tracking: 100 requests/minute

---

## Monitoring

### Health Checks

**Endpoints:**
- `/api/health` - System health
- `/api/revenue/track` - Revenue tracking status

### Metrics

**Tracked:**
- Page views (PostHog)
- CTA clicks (PostHog)
- Revenue (Stripe webhook)
- Conversion rates (Revenue API)

---

## Deployment

### Vercel Configuration

**Framework Preset:** Other  
**Build Command:** (none - static files)  
**Output Directory:** (none - root)  
**Install Command:** `npm install` (if package.json exists)

**Root Directory:** (empty - root)

---

## Scaling Considerations

### Current Limits

**Vercel Free Tier:**
- 100GB bandwidth/month
- 100 serverless function invocations/day
- Unlimited static files

**Upgrade Triggers:**
- > 100GB bandwidth/month
- > 100 function invocations/day
- Need more features

### Optimization for Scale

1. **Static First**
   - Serve static HTML/CSS/JS
   - Use serverless only for APIs

2. **Caching**
   - Cache static assets
   - Cache API responses where possible

3. **CDN**
   - Use Vercel Edge Network
   - Optimize asset delivery

---

## Future Improvements

### Short-term

1. **Minify Assets**
   - HTML minification
   - CSS minification
   - JS minification

2. **Image Optimization**
   - Convert to WebP
   - Compress images
   - Lazy loading

3. **Code Cleanup**
   - Remove unused code
   - Consolidate scripts
   - Remove dead routes

### Long-term

1. **Performance Monitoring**
   - Add performance tracking
   - Monitor Core Web Vitals
   - Optimize based on data

2. **Advanced Caching**
   - Implement service worker
   - Cache API responses
   - Offline support

3. **Progressive Enhancement**
   - Add offline support
   - Improve mobile experience
   - Enhance accessibility

---

**Remember:** Clean systems scale faster. Remove everything unnecessary.
