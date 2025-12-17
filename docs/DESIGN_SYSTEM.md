# Design System - Golo Čapo

**Version:** 2.0  
**Status:** Production Ready  
**Last Updated:** 2025-12-17

---

## Overview

This design system ensures consistent, premium, conversion-focused design across all touchpoints. Every element is optimized for speed, trust, and conversion.

---

## Brand Identity

### Visual Identity

**Logo:** Purple/pink gradient unicorn  
**Colors:** Cosmic premium (dark background, purple/pink accents)  
**Typography:** System fonts (fast, clean, professional)  
**Vibe:** Premium, minimal, fast, modern, confident

---

## Design Tokens

### Location

**CSS Variables:** `/assets/brand/brand.css`  
**All tokens defined in `:root`**

### Color Tokens

```css
/* Brand Colors (Purple/Pink Gradient) */
--brand-primary: #C080B0;      /* Main brand color */
--brand-secondary: #A070B0;    /* Secondary accent */
--brand-deep: #8060A0;         /* Deep purple */
--brand-accent: #D090C0;       /* Light accent */

/* UI Colors (Dark Theme) */
--bg-primary: #0B0B12;                        /* Dark background */
--bg-surface: rgba(255, 255, 255, 0.06);    /* Card/surface */
--bg-border: rgba(255, 255, 255, 0.12);     /* Borders */

/* Text Colors */
--text-primary: rgba(255, 255, 255, 0.92);  /* Primary text */
--text-muted: rgba(255, 255, 255, 0.70);    /* Secondary text */
--text-secondary: rgba(255, 255, 255, 0.50); /* Tertiary text */

/* Semantic Colors */
--success: #10b981;  /* Success states */
--error: #ef4444;    /* Errors */
--warning: #f59e0b;  /* Warnings */
```

### Typography Tokens

```css
/* Font Stack (System Fonts) */
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Roboto', sans-serif;

/* Font Sizes */
--font-size-base: 16px;    /* Body text */
--font-size-sm: 14px;      /* Small text */
--font-size-lg: 18px;      /* Large body */
--font-size-xl: 24px;      /* Section headings */
--font-size-2xl: 32px;     /* Page headings */
--font-size-3xl: 42px;     /* Hero headings */
--font-size-4xl: 56px;     /* Display headings */
```

### Spacing Tokens

```css
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;    /* Default spacing */
--spacing-lg: 32px;
--spacing-xl: 48px;
--spacing-2xl: 64px;
```

### Layout Tokens

```css
--container-max-width: 1080px;
--border-radius: 12px;
--border-radius-lg: 16px;
```

### Transition Tokens

```css
--transition-fast: 0.15s ease;
--transition-base: 0.2s ease;
--transition-slow: 0.3s ease;
```

---

## Components

### Buttons

**Primary Button:**
- Gradient background (primary → secondary)
- White text
- Shadow for depth
- Subtle shimmer animation (3s loop)
- Hover: Lift effect + faster shimmer
- Focus: Clear outline

**Ghost Button:**
- Transparent background
- Border
- Hover: Background fill + border color change
- Focus: Clear outline

**Usage:**
```html
<a href="/prelaunch" class="btn btn-primary">Get Early Access</a>
<a href="#how-it-works" class="btn btn-ghost">See How It Works</a>
```

### Cards

- Subtle background (bg-surface)
- Border (bg-border)
- Rounded corners (border-radius-lg)
- Padding: spacing-lg
- Backdrop blur for depth

**Usage:**
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### Inputs

- Dark background
- Border on focus
- Clear placeholder
- Accessible focus states

**Usage:**
```html
<input type="email" class="input" placeholder="your@email.com">
```

### Brand Bar (Header)

- Sticky header
- Logo + wordmark
- Navigation links
- CTA button
- Backdrop blur

**Usage:**
```html
<header class="brand-bar">
  <div class="container">
    <a href="/">
      <img src="/assets/brand/logo.svg" alt="Golo Čapo" class="brand-logo">
      <span class="brand-wordmark">Golo Čapo</span>
    </a>
    <nav>
      <a href="/prelaunch">Prelaunch</a>
      <a href="/prelaunch" class="btn btn-primary">Get Early Access</a>
    </nav>
  </div>
</header>
```

---

## Page Templates

### Homepage (/)

**Structure:**
1. Brand Bar (header)
2. Hero Section (split layout: content left, logo right)
3. What is GoLoCapo (1 paragraph)
4. How It Works (3 steps)
5. Who It's For (3 personas)
6. Why Now (short)
7. Final CTA Section
8. Footer

**Key Elements:**
- Hero title: Gradient text (accent → primary → secondary)
- Hero subtitle: Muted text, clear value prop
- Outcome bullets: Checkmarks with brand color
- Primary CTA: "Get Early Access" → /prelaunch
- Secondary CTA: "See How It Works" → scroll
- Trust microcopy: "Founding spots limited • No spam • Cancel anytime"
- Logo glow: Subtle pulse animation

### Prelaunch Page (/prelaunch)

**Structure:**
1. Brand Bar
2. Hero Section (centered)
3. How It Works (3 steps)
4. Social Proof
5. Founding Customer Deal
6. Early Access Form
7. FAQ
8. Final CTA
9. Share Block
10. Footer

**Key Elements:**
- Same brand tokens
- Consistent typography
- Same button styles
- Same card styles

### Thank You Page (/thank-you)

**Structure:**
1. Brand Bar
2. Success Icon
3. Thank You Message
4. Next Steps
5. Footer

**Key Elements:**
- Same brand tokens
- Consistent styling
- Clear next steps

---

## Conversion Optimizations

### CTAs

**Primary CTA:**
- Gradient background
- Subtle shimmer animation
- Clear, action-oriented copy
- Trust microcopy below

**Trust Microcopy:**
- "Founding spots limited"
- "No spam"
- "Cancel anytime"

### Visual Hierarchy

1. **Hero Title** - Largest, gradient text
2. **Hero Subtitle** - Clear value prop
3. **Outcome Bullets** - Benefits
4. **Primary CTA** - Most prominent
5. **Secondary CTA** - Less prominent

### Performance

- System fonts (no external requests)
- Minimal CSS (only what's needed)
- No heavy animations
- Optimized images
- Lazy loading where possible

---

## Accessibility

### WCAG Compliance

- **Contrast:** AA compliant (4.5:1 minimum)
- **Focus:** Visible focus indicators
- **Motion:** Respects `prefers-reduced-motion`
- **Semantic HTML:** Proper heading hierarchy
- **Alt Text:** All images have alt text

### Focus States

```css
*:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Design

### Breakpoints

**Mobile:** < 768px
- Single column layout
- Stacked CTAs
- Smaller logo
- Reduced spacing

**Desktop:** ≥ 768px
- Two-column hero
- Side-by-side CTAs
- Full logo size
- Full spacing

### Mobile Optimizations

- CTA always visible above fold
- Touch-friendly button sizes (min 44px)
- Readable font sizes (min 16px)
- No horizontal scroll

---

## How to Update Copy

### Homepage Headline

**File:** `dashboard/index.html`  
**Location:** Line ~180  
**Element:** `.hero-title`

```html
<h1 class="hero-title">AI Marketing Studio</h1>
```

### Homepage Subtitle

**File:** `dashboard/index.html`  
**Location:** Line ~181  
**Element:** `.hero-subtitle`

```html
<p class="hero-subtitle">Generate Meta-ready posts in seconds. Not hours.</p>
```

### Primary CTA

**File:** `dashboard/index.html`  
**Location:** Line ~195  
**Element:** `.btn-primary`

```html
<a href="/prelaunch" class="btn btn-primary">Get Early Access</a>
```

### Trust Microcopy

**File:** `dashboard/index.html`  
**Location:** Line ~198  
**Element:** `.cta-trust`

```html
<p class="cta-trust">Founding spots limited • No spam • Cancel anytime</p>
```

---

## Brand Assets

### Logo

**Location:** `/assets/brand/logo.svg`  
**Format:** SVG (scalable, fast)  
**Colors:** Purple/pink gradient (#D090C0 → #C080B0 → #8060A0)

### Favicons

- `favicon-16.png` (16x16)
- `favicon-32.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

### Social Images

- `og.png` (1200x630) - OpenGraph/Twitter card

---

## Performance Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FCP (First Contentful Paint):** < 1.5s
- **TTI (Time to Interactive):** < 3s
- **Lighthouse Score:** 90+

---

## Files Changed/Added

### Changed Files

1. `dashboard/index.html` - Complete homepage redesign
2. `assets/brand/brand.css` - Added shimmer animation to primary button

### Removed

- Unused CSS from homepage (moved to brand.css)
- Redundant styles
- Unused components

### Brand Tokens Location

**File:** `/assets/brand/brand.css`  
**Section:** `:root` (lines 3-50)

---

## Verification Steps

1. **Check Homepage:**
   ```bash
   curl -I https://www.golocapo.com/
   ```
   Expected: `200 OK`

2. **Check Prelaunch:**
   ```bash
   curl -I https://www.golocapo.com/prelaunch
   ```
   Expected: `200 OK`

3. **Check Thank You:**
   ```bash
   curl -I https://www.golocapo.com/thank-you
   ```
   Expected: `200 OK`

4. **Lighthouse Test:**
   - Open Chrome DevTools
   - Run Lighthouse
   - Check Performance score (target: 90+)
   - Check Accessibility score (target: 100)

5. **Visual Consistency:**
   - Navigate: `/` → `/prelaunch` → `/thank-you`
   - Verify consistent branding
   - Verify consistent typography
   - Verify consistent buttons
   - Verify consistent spacing

---

## Design Principles

### 1. Conversion-First

Every element must:
- Drive action
- Reduce friction
- Build trust
- Guide to CTA

### 2. Speed

Optimize for:
- Fast load times
- System fonts
- Minimal CSS
- No heavy assets

### 3. Trust

Build trust through:
- Clean, professional design
- Clear messaging
- Consistent branding
- Accessible design

### 4. Simplicity

Keep it:
- Minimal
- Focused
- Clear
- Direct

---

**Remember:** Revenue > Beauty. Every design decision should drive conversion.

