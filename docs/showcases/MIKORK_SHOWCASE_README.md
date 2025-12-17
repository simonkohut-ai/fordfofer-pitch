# MikoRK pohrebníctvo Showcase Page

**URL:** `/showcase/mikork`  
**Status:** ✅ Live  
**Date:** 2025-12-17

---

## Summary

Public showcase page for MikoRK pohrebníctvo project. Designed for social traffic with optimized SEO and OpenGraph tags. Demonstrates calm, trust-first local business website delivery.

---

## Scope Delivered

### Page Content
- ✅ Hero section with project title
- ✅ Overview (problem → outcome)
- ✅ Deliverables breakdown (5 key components)
- ✅ Before/After comparison
- ✅ Metrics-ready block
- ✅ What we learned / reusable template section
- ✅ CTA linking to `/prelaunch`

### SEO & Social
- ✅ Title tag (150-160 chars)
- ✅ Meta description (150-160 chars)
- ✅ Canonical URL
- ✅ OpenGraph tags (og:title, og:description, og:url, og:image)
- ✅ Twitter/X tags (twitter:card, twitter:title, twitter:description, twitter:image)
- ✅ JSON-LD structured data (Article schema)
- ✅ OG image at `/assets/og/mikork-og.png` (1200x630)

### Navigation & Discoverability
- ✅ Link added to homepage footer
- ✅ Route added to `vercel.json`
- ✅ URL added to `sitemap.xml`
- ✅ `robots.txt` references sitemap (already configured)

---

## Files Touched

### Created
- `showcase/mikork.html` - Main showcase page
- `assets/og/mikork-og.svg` - SVG OG image source
- `assets/og/mikork-og.png` - PNG OG image (fallback)
- `docs/showcases/MIKORK_SHOWCASE_README.md` - This file

### Modified
- `vercel.json` - Added `/showcase/mikork` rewrite rule
- `sitemap.xml` - Added showcase URL
- `dashboard/index.html` - Added showcase link to footer

---

## How to Clone for Next Client

### 1. Copy Template
```bash
cp showcase/mikork.html showcase/[client-name].html
```

### 2. Update Content
- Replace "MikoRK pohrebníctvo" with client name
- Update problem/outcome sections
- Update deliverables list
- Update before/after bullets
- Update CTA text if needed

### 3. Update SEO Meta Tags
- Update `<title>` tag
- Update `meta name="description"`
- Update `og:title`, `og:description`, `og:url`
- Update `twitter:title`, `twitter:description`
- Update canonical URL
- Update JSON-LD structured data

### 4. Create OG Image
- Create `assets/og/[client-name]-og.png` (1200x630)
- Update `og:image` and `twitter:image` URLs

### 5. Update Routing
- Add rewrite rule to `vercel.json`:
  ```json
  { "source": "/showcase/[client-name]", "destination": "/showcase/[client-name].html" }
  ```
- Add URL to `sitemap.xml`
- Add link to homepage footer (optional)

### 6. Verify
- Check page loads: `curl -I https://www.golocapo.com/showcase/[client-name]`
- Check OG image loads: `curl -I https://www.golocapo.com/assets/og/[client-name]-og.png`
- Test OG preview: https://www.opengraph.xyz/url/https://www.golocapo.com/showcase/[client-name]

---

## QA Checklist

### Visual
- [ ] Dark background (`#0B0B12`) visible
- [ ] Typography correct (brand font, sizes, colors)
- [ ] Spacing consistent (uses CSS variables)
- [ ] Buttons styled correctly (primary, ghost)
- [ ] Cards display correctly
- [ ] Footer displays correctly

### Mobile
- [ ] Responsive layout works
- [ ] Text readable on mobile
- [ ] Buttons accessible on mobile
- [ ] Navigation works on mobile
- [ ] Images scale correctly

### OG Preview
- [ ] OG image loads (1200x630)
- [ ] Title displays correctly
- [ ] Description displays correctly
- [ ] URL displays correctly
- [ ] Brand colors visible
- [ ] Text readable

### SEO
- [ ] Title tag present (150-160 chars)
- [ ] Meta description present (150-160 chars)
- [ ] Canonical URL correct
- [ ] OpenGraph tags present
- [ ] Twitter/X tags present
- [ ] JSON-LD structured data valid
- [ ] Sitemap includes URL
- [ ] Robots.txt references sitemap

### Functionality
- [ ] CTA button links to `/prelaunch`
- [ ] Navigation links work
- [ ] Footer links work
- [ ] Brand CSS loads correctly
- [ ] No console errors

---

## Verification Commands

### Local Verification
```bash
# Check page loads
curl -I http://localhost:3000/showcase/mikork

# Check OG image loads
curl -I http://localhost:3000/assets/og/mikork-og.png

# Verify brand.css referenced
curl http://localhost:3000/showcase/mikork | grep "brand.css"
```

### Production Verification
```bash
# Check page loads (200 OK)
curl -I https://www.golocapo.com/showcase/mikork

# Check OG image loads (200 OK, image/png)
curl -I https://www.golocapo.com/assets/og/mikork-og.png

# Verify brand.css referenced
curl https://www.golocapo.com/showcase/mikork | grep "brand.css"

# Check sitemap includes URL
curl https://www.golocapo.com/sitemap.xml | grep "showcase/mikork"
```

### OG Preview Tools
- https://www.opengraph.xyz/url/https://www.golocapo.com/showcase/mikork
- https://developers.facebook.com/tools/debug/?q=https://www.golocapo.com/showcase/mikork
- https://cards-dev.twitter.com/validator

---

## Notes

- **Tone:** Calm, trust-first, dignified (no aggressive marketing)
- **Design:** Uses consolidated `brand.css` (no inline styles except minimal fixes)
- **Reusability:** Template can be cloned for next client showcase
- **SEO Focus:** Optimized for social traffic (OG tags critical)

---

**Status:** ✅ Production Ready

