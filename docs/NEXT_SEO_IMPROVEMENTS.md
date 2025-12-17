# 🚀 Next SEO Power Moves (After Deploy is Stable)

Copy/paste to Cursor when ready to implement:

---

## 1. Add humans.txt

Create `humans.txt` at repo root:
```
/* TEAM */
Golo Čapo: Founder, Builder
Site: https://www.golocapo.com
Twitter: @golocapo

/* THANKS */
Built with: Vercel, Stripe, Resend

/* SITE */
Last update: 2025/12/17
Standards: HTML5, CSS3, ES6
Components: Static HTML, Serverless Functions
```

---

## 2. Add manifest.webmanifest

Create `assets/brand/manifest.webmanifest`:
```json
{
  "name": "Golo Čapo",
  "short_name": "Golo Čapo",
  "description": "21.12 — Early Christmas gift.",
  "start_url": "/prelaunch",
  "display": "standalone",
  "background_color": "#0B0B12",
  "theme_color": "#0B0B12",
  "icons": [
    {
      "src": "/assets/brand/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/brand/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Add to all HTML `<head>`:
```html
<link rel="manifest" href="/assets/brand/manifest.webmanifest">
```

---

## 3. Add Internal Links

**On `dashboard/index.html`:**
- Add link in hero: "Golo Čapo 21.12" → `/prelaunch`
- Add link in footer: "Early Access" → `/prelaunch`

**On `pricing.html`:**
- Add link: "Join waitlist for 21.12" → `/prelaunch`
- Use anchor text: "Golo Čapo 21.12"

---

## 4. Add FAQ Block + JSON-LD

**On `/prelaunch` page, add FAQ section:**

```html
<div class="faq-section">
  <h2>FAQ</h2>
  <div class="faq-item">
    <h3>What is Golo Čapo?</h3>
    <p>21.12 — Early Christmas gift.</p>
  </div>
  <div class="faq-item">
    <h3>When does it launch?</h3>
    <p>21.12.2025</p>
  </div>
  <div class="faq-item">
    <h3>How do I get early access?</h3>
    <p>Join the waitlist above.</p>
  </div>
</div>
```

**Add FAQPage JSON-LD:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Golo Čapo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "21.12 — Early Christmas gift."
      }
    },
    {
      "@type": "Question",
      "name": "When does it launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "21.12.2025"
      }
    },
    {
      "@type": "Question",
      "name": "How do I get early access?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Join the waitlist on this page."
      }
    }
  ]
}
</script>
```

---

## Implementation Order

1. ✅ robots.txt + sitemap.xml (DONE)
2. ✅ SEO meta tags (DONE)
3. ✅ Structured data on /prelaunch (DONE)
4. ⏳ humans.txt
5. ⏳ manifest.webmanifest
6. ⏳ Internal links
7. ⏳ FAQ + FAQPage JSON-LD

---

**Status:** Ready to implement when deploy is stable.

