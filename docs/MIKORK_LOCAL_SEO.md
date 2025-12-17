# MikoRK pohrebníctvo - Local SEO Guide

**Goal:** Rank for local searches in Slovakia/Czech Republic  
**Focus:** "pohrebníctvo + mesto", "pohrebné služby + región"  
**Last Updated:** 2025-12-17

---

## Local SEO Strategy

### Target Keywords

**Primary Keywords:**
- "pohrebníctvo [mesto]" (e.g., "pohrebníctvo Bratislava")
- "pohrebné služby [región]" (e.g., "pohrebné služby Bratislavský kraj")
- "pohrebná služba [mesto]"
- "[mesto] pohrebníctvo"

**Long-tail Keywords:**
- "pohrebné služby [mesto] cena"
- "pohrebníctvo [mesto] kontakt"
- "pohrebné služby [región] 24/7"

---

## Structured Data (Schema.org)

### LocalBusiness Schema

**Location:** All pages (homepage, contact, services)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@type": "FuneralHome",
  "name": "MikoRK pohrebníctvo",
  "description": "MikoRK pohrebníctvo poskytuje dôstojnú a profesionálnu starostlivosť v najťažších chvíľach života.",
  "url": "https://www.mikork.sk",
  "telephone": "+421XXXXXXXXX",
  "email": "info@mikork.sk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Adresa",
    "addressLocality": "Mesto",
    "postalCode": "PSČ",
    "addressCountry": "SK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.1486",
    "longitude": "17.1077"
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "priceRange": "$$",
  "areaServed": {
    "@type": "City",
    "name": "Mesto"
  },
  "sameAs": [
    "https://www.facebook.com/mikorkpohrebnictvo"
  ]
}
```

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MikoRK pohrebníctvo",
  "url": "https://www.mikork.sk",
  "logo": "https://www.mikork.sk/assets/mikork/logo.png",
  "description": "MikoRK pohrebníctvo poskytuje dôstojnú a profesionálnu starostlivosť v najťažších chvíľach života.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Adresa",
    "addressLocality": "Mesto",
    "postalCode": "PSČ",
    "addressCountry": "SK"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+421XXXXXXXXX",
    "contactType": "customer service",
    "availableLanguage": ["sk", "cz"],
    "areaServed": "SK"
  }
}
```

---

## Page Titles & Meta Descriptions

### Homepage

**Title:**
```
MikoRK pohrebníctvo [Mesto] - Profesionálna starostlivosť s úctou | 24/7
```

**Meta Description:**
```
MikoRK pohrebníctvo poskytuje dôstojnú a profesionálnu starostlivosť v [mesto] a okolí. K dispozícii 24/7. Dlhodobá tradícia, lokálna spoločnosť.
```

### Services Page

**Title:**
```
Pohrebné služby [Mesto] - Kompletná organizácia pohrebu | MikoRK
```

**Meta Description:**
```
Kompletná organizácia pohrebu v [mesto]. MikoRK pohrebníctvo poskytuje profesionálne pohrebné služby s úctou a pochopením.
```

### Contact Page

**Title:**
```
Kontakt - MikoRK pohrebníctvo [Mesto] | Telefón 24/7
```

**Meta Description:**
```
Kontaktujte MikoRK pohrebníctvo v [mesto]. Telefón: +421 XXX XXX XXX. K dispozícii 24/7. Odpovieme vám čo najskôr.
```

### About Page

**Title:**
```
O nás - MikoRK pohrebníctvo [Mesto] | Dlhodobá tradícia
```

**Meta Description:**
```
MikoRK pohrebníctvo v [mesto] s dlhodobou tradíciou. Lokálna spoločnosť poskytujúca dôstojnú starostlivosť s úctou a pochopením.
```

---

## Google Business Profile Setup

### Essential Information

**Business Name:**
```
MikoRK pohrebníctvo
```

**Category:**
```
Funeral Home
```

**Address:**
```
[Complete address]
```

**Phone:**
```
+421 XXX XXX XXX
```

**Website:**
```
https://www.mikork.sk
```

**Hours:**
```
24/7 (or specific hours if applicable)
```

**Description:**
```
MikoRK pohrebníctvo poskytuje dôstojnú a profesionálnu starostlivosť v najťažších chvíľach života. Sme tu pre vás s úctou, pochopením a profesionálnym prístupom. Lokálna spoločnosť s dlhodobou tradíciou.
```

### Google Business Profile Posts

**Types of Posts:**
- Informational updates (calm, respectful)
- Seasonal notices (Dušičky, memorial days)
- Service updates (if applicable)
- Educational content (helpful, not salesy)

**Frequency:**
- 1-2 posts per month (not aggressive)
- Quality over quantity

---

## Local Pack Readiness

### NAP Consistency

**Name, Address, Phone must be consistent across:**
- Website
- Google Business Profile
- Facebook page
- Other directories
- Citations

**Format:**
```
Name: MikoRK pohrebníctvo
Address: [Complete address]
Phone: +421 XXX XXX XXX
```

### Citations

**Submit to local directories:**
- Google Business Profile ✅
- Facebook Business Page
- Local business directories (SK/CZ)
- Industry-specific directories

---

## Content Strategy

### Local Content

**Create pages for:**
- Service areas (if multiple cities)
- Local community involvement
- Local testimonials (if appropriate)

**Blog Content (Educational, Not Salesy):**
- "Čo všetko zahŕňa organizácia pohrebu"
- "Ako sa pripraviť na pohreb"
- "Dušičky - tradícia a význam"
- "Pohrebné služby - časté otázky"

---

## Technical SEO

### Sitemap

**Location:** `/sitemap.xml`

**Include:**
- Homepage
- Services
- About
- Contact
- Blog posts (if applicable)

### Robots.txt

**Location:** `/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://www.mikork.sk/sitemap.xml
```

### Canonical URLs

**Every page should have:**
```html
<link rel="canonical" href="https://www.mikork.sk/[page]">
```

---

## Mobile Optimization

### Mobile-First

- Responsive design ✅
- Fast load times ✅
- Easy navigation ✅
- Click-to-call buttons ✅
- Large touch targets ✅

---

## Performance

### Core Web Vitals

**Targets:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### Page Speed

- Optimize images
- Minify CSS/JS
- Use system fonts
- Enable caching

---

## Tracking & Analytics

### Minimal Analytics

**Track:**
- Page views
- Contact form submissions
- Phone clicks
- Email clicks

**Do NOT track:**
- Aggressive user behavior
- Personal information
- Grief-related searches

**GDPR Compliant:**
- Clear privacy policy
- Consent for cookies (if used)
- Data minimization

---

## Implementation Checklist

- [ ] Structured data (LocalBusiness, Organization)
- [ ] Page titles optimized for local keywords
- [ ] Meta descriptions written in SK
- [ ] Google Business Profile created/verified
- [ ] NAP consistency across all platforms
- [ ] Sitemap.xml created
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Mobile optimization verified
- [ ] Performance optimized
- [ ] Analytics configured (minimal)
- [ ] GDPR compliance verified

---

## Monitoring

### Key Metrics

**Track:**
- Local search rankings
- Google Business Profile views
- Contact form submissions
- Phone calls
- Website traffic

**Review Monthly:**
- Google Business Profile insights
- Search rankings
- Website analytics
- Customer feedback

---

**Remember:** Local SEO is about trust and visibility, not aggressive marketing. Focus on being helpful and present when people need you.

