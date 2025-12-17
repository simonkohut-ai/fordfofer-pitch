# SEO Baseline - Conversion-Focused SEO

**Last Updated:** [Current Date]  
**Status:** Production Ready  
**Focus:** SEO that converts, not vanity traffic

---

## Core Principle

**SEO must support sales, not vanity traffic.**

Every SEO element should:
- Drive qualified traffic
- Support conversion
- Build trust
- Reduce friction

---

## Technical SEO

### ✅ Implemented

**robots.txt:**
- Location: `/robots.txt`
- Status: Returns 200
- Content: Allows all, references sitemap

**sitemap.xml:**
- Location: `/sitemap.xml`
- Status: Returns 200
- Pages included:
  - `/` (priority: 1.0)
  - `/prelaunch` (priority: 0.9)
  - `/pricing` (priority: 0.8)
  - `/thank-you` (priority: 0.5, noindex)

**Canonical URLs:**
- All pages have canonical tags
- Prevents duplicate content issues

**Meta Robots:**
- Public pages: `index, follow`
- Thank-you page: `noindex, nofollow`

---

## On-Page SEO

### Meta Titles

**Format:** `[Page] | Golo Čapo - [Value Prop]`

**Examples:**
- Home: "Golo Čapo - AI Marketing Studio | Marketing Automation for Startups"
- Prelaunch: "AI Marketing Studio | Golo Čapo - Marketing Automation for Startups"
- Pricing: "Pricing | Golo Čapo AI Marketing Studio - Marketing Automation Pricing"

**Best Practices:**
- Include primary keyword
- Include brand name
- Keep under 60 characters
- Action-oriented

### Meta Descriptions

**Format:** `[Value prop] + [Benefit] + [CTA]`

**Examples:**
- "AI-powered marketing automation for startups. Generate Meta-ready posts in seconds. Marketing automation that converts."
- "Founding customer pricing: €149 one-time setup + first month free. Limited to 10 spots."

**Best Practices:**
- Include primary keyword
- Clear value proposition
- Include CTA or urgency
- Keep under 160 characters

### Keywords

**Primary Keywords:**
- AI marketing studio
- Marketing automation
- AI growth system
- Startup marketing AI

**Secondary Keywords:**
- AI marketing tools
- Marketing automation software
- AI marketing pricing
- Startup marketing tools

**Usage:**
- Include in titles
- Include in descriptions
- Include in headings (H1, H2)
- Natural placement (no keyword stuffing)

---

## OpenGraph & Twitter Cards

### OpenGraph Tags

**Required:**
- `og:type` - website
- `og:url` - Full URL
- `og:title` - Page title
- `og:description` - Page description
- `og:image` - `/assets/brand/og.png` (1200x630)
- `og:site_name` - "Golo Čapo"

**Status:** ✅ All pages have OG tags

### Twitter Cards

**Type:** `summary_large_image`

**Required:**
- `twitter:card` - summary_large_image
- `twitter:title` - Page title
- `twitter:description` - Page description
- `twitter:image` - `/assets/brand/og.png`

**Status:** ✅ All pages have Twitter cards

---

## Structured Data (JSON-LD)

### Organization Schema

**Location:** Homepage, Prelaunch page

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Golo Čapo",
  "url": "https://www.golocapo.com",
  "logo": "https://www.golocapo.com/assets/brand/logo.svg",
  "description": "AI-powered marketing automation studio for startups and small teams"
}
```

### Product Schema

**Location:** Prelaunch, Pricing pages

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Golo Čapo AI Marketing Studio",
  "description": "AI-powered marketing automation that generates Meta-ready posts in seconds",
  "brand": {
    "@type": "Brand",
    "name": "Golo Čapo"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": "149",
    "availability": "https://schema.org/PreOrder",
    "url": "https://www.golocapo.com/prelaunch"
  },
  "category": "Marketing Automation Software"
}
```

**Status:** ✅ Implemented on key pages

---

## Page-Specific SEO

### Homepage (`/`)

**Title:** "Golo Čapo - AI Marketing Studio | Marketing Automation for Startups"  
**Description:** "AI-powered marketing automation studio. Generate Meta-ready posts in seconds. Marketing automation that converts."  
**Keywords:** AI marketing studio, marketing automation, AI growth system  
**Schema:** Organization

### Prelaunch (`/prelaunch`)

**Title:** "AI Marketing Studio | Golo Čapo - Marketing Automation for Startups"  
**Description:** "AI-powered marketing automation for startups. Generate Meta-ready posts in seconds. Marketing automation that converts. Launching 21.12."  
**Keywords:** AI marketing studio, marketing automation, AI growth system, startup marketing AI  
**Schema:** Organization + Product

### Pricing (`/pricing`)

**Title:** "Pricing | Golo Čapo AI Marketing Studio - Marketing Automation Pricing"  
**Description:** "Founding customer pricing for AI marketing automation. €149 one-time setup + first month free. Limited to 10 spots."  
**Keywords:** AI marketing pricing, marketing automation pricing  
**Schema:** Product

### Thank You (`/thank-you`)

**Title:** "Thank You | Golo Čapo"  
**Description:** "Thank you for joining Golo Čapo. Check your email for next steps."  
**Robots:** `noindex, nofollow` (conversion page, not for SEO)

---

## Content SEO

### Headings

**H1:** Primary keyword + value prop
- "AI Marketing Studio"
- "Golo Čapo - AI Marketing Studio"

**H2:** Secondary keywords + benefits
- "How It Works"
- "Marketing Automation for Startups"

**Best Practices:**
- One H1 per page
- Logical hierarchy
- Include keywords naturally

### Content

**Focus:**
- Value proposition
- Benefits, not features
- Clear CTAs
- Conversion-focused

**Keywords:**
- Natural placement
- No keyword stuffing
- User-first, SEO-second

---

## Performance SEO

### Page Speed

**Targets:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 90+

**Optimizations:**
- System fonts (no external requests)
- Minimal CSS
- Optimized images
- Lazy loading (if needed)

### Mobile-First

**Status:** ✅ All pages responsive
- Mobile-friendly design
- Touch-friendly CTAs
- Fast mobile load times

---

## Local SEO (Future)

**Not implemented yet** (EU focus, not local)

**Future considerations:**
- Google Business Profile (if needed)
- Local keywords (if targeting specific regions)

---

## SEO Monitoring

### Key Metrics

**Traffic:**
- Organic search traffic
- Keyword rankings
- Click-through rate (CTR)

**Conversions:**
- Organic → Email signup
- Organic → Founding customer
- Organic → Revenue

**Quality:**
- Bounce rate (target: < 60%)
- Time on page (target: > 2 min)
- Pages per session (target: > 2)

### Tools

**Recommended:**
- Google Search Console (free)
- Google Analytics (free)
- PostHog (already integrated)

**Not Needed:**
- Expensive SEO tools
- Keyword rank trackers (vanity metrics)
- Backlink checkers (not relevant yet)

---

## SEO Checklist

### Technical
- [x] robots.txt returns 200
- [x] sitemap.xml returns 200
- [x] All pages have canonical URLs
- [x] All pages have meta robots tags
- [x] All pages have proper meta titles
- [x] All pages have meta descriptions
- [x] All pages have OG tags
- [x] All pages have Twitter cards
- [x] Key pages have JSON-LD schema

### Content
- [x] H1 includes primary keyword
- [x] Headings follow logical hierarchy
- [x] Content is conversion-focused
- [x] Keywords used naturally
- [x] CTAs are clear and prominent

### Performance
- [x] Fast page load times
- [x] Mobile-responsive
- [x] Accessible (WCAG AA)

---

## What We Don't Do

**No SEO Bloat:**
- ❌ Keyword stuffing
- ❌ Duplicate meta tags
- ❌ Unnecessary schema markup
- ❌ Expensive SEO tools
- ❌ Vanity metrics focus

**No Dead Routes:**
- ❌ Broken links
- ❌ 404 pages (unless intentional)
- ❌ Orphaned pages

---

## Next Steps

### Immediate
1. Submit sitemap to Google Search Console
2. Monitor organic traffic
3. Track keyword rankings (if relevant)

### Future (Post-Launch)
1. Create content pages (blog posts, guides)
2. Build backlinks (quality over quantity)
3. Expand keyword targeting
4. See `docs/SEO_AUTOMATION_PLAN.md` for AI-generated pages

---

## Success Criteria

**SEO Success = Conversion Success**

**Targets:**
- 10% of traffic from organic search (within 3 months)
- 5% conversion rate from organic traffic
- Top 10 ranking for "AI marketing studio" (long-term)

**Remember:** SEO supports sales. If it doesn't convert, it's not working.

---

## Resources

- **Sitemap:** `/sitemap.xml`
- **Robots:** `/robots.txt`
- **Brand Assets:** `/assets/brand/`
- **This Document:** `/docs/SEO_BASELINE.md`

---

**Last Updated:** [Current Date]  
**Status:** ✅ Production Ready

