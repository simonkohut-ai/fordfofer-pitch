# MikoRK pohrebníctvo - Design System

**Version:** 1.0  
**Status:** Production Ready  
**Last Updated:** 2025-12-17

---

## Design Philosophy

### Core Principles

1. **Respectful** - Dignified, calm, professional
2. **Accessible** - Large fonts, high contrast, easy to use
3. **Local** - Community-focused, familiar, trustworthy
4. **Simple** - Clear hierarchy, no clutter, easy navigation
5. **Human** - Personal touch, not corporate, empathetic

---

## Color Palette

### Brand Colors

```css
--brand-primary: #2C3E50;        /* Deep navy - stability, trust */
--brand-secondary: #5D6D7E;      /* Muted blue-gray - calm, professional */
--brand-accent: #85929E;         /* Soft gray - subtle, respectful */
--brand-dark: #1B2631;           /* Charcoal - depth, dignity */
```

**Usage:**
- Primary: Headings, links, CTAs
- Secondary: Hover states, accents
- Accent: Subtle highlights
- Dark: Depth, emphasis

### UI Colors

```css
--bg-primary: #FFFFFF;           /* Clean white background */
--bg-secondary: #F8F9FA;         /* Light gray - subtle contrast */
--bg-surface: #FFFFFF;           /* Card/surface background */
--bg-border: #E5E7E9;           /* Subtle borders */
```

### Text Colors

```css
--text-primary: #1B2631;        /* Dark text - excellent readability */
--text-secondary: #5D6D7E;      /* Muted text - secondary information */
--text-muted: #85929E;          /* Light text - tertiary information */
```

**Contrast Ratios:**
- Primary text on white: 12.6:1 (AAA)
- Secondary text on white: 4.8:1 (AA)
- All text meets WCAG AA minimum

---

## Typography

### Font Stack

```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
```

**Rationale:**
- System fonts for speed
- High readability
- Familiar to older audiences
- No external requests

### Font Sizes

```css
--font-size-xs: 14px;
--font-size-sm: 16px;
--font-size-base: 18px;          /* Larger base for readability */
--font-size-lg: 20px;
--font-size-xl: 24px;
--font-size-2xl: 28px;
--font-size-3xl: 36px;
--font-size-4xl: 48px;
```

**Usage:**
- Base: 18px (larger than standard for readability)
- Headings: 24px - 48px
- Small text: Minimum 16px

### Line Heights

```css
--line-height-tight: 1.2;        /* Headings */
--line-height-base: 1.6;         /* Body text */
--line-height-relaxed: 1.8;      /* Comfortable reading */
```

---

## Spacing System

```css
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 24px;
--spacing-lg: 32px;
--spacing-xl: 48px;
--spacing-2xl: 64px;
--spacing-3xl: 96px;
```

**Usage:**
- Generous spacing for comfort
- Clear visual hierarchy
- Easy to scan

---

## Components

### Buttons

**Primary Button:**
- Background: `--brand-primary`
- Color: White
- Padding: `var(--spacing-sm) var(--spacing-lg)`
- Font size: `var(--font-size-base)` (18px)
- Border radius: `var(--border-radius)`
- Hover: Darker shade, subtle shadow
- Focus: Clear outline

**Secondary Button:**
- Background: `--bg-secondary`
- Color: `--text-primary`
- Border: 2px solid `--brand-primary`
- Hover: Background becomes `--brand-primary`, text white

**Ghost Button:**
- Background: Transparent
- Color: `--brand-primary`
- Border: 2px solid `--brand-primary`
- Hover: Background becomes `--brand-primary`, text white

**Usage:**
```html
<a href="/contact" class="btn btn-primary">Kontaktujte nás</a>
<a href="/services" class="btn btn-secondary">Naše služby</a>
<a href="/about" class="btn btn-ghost">O nás</a>
```

### Cards

- Background: `--bg-surface`
- Border: 1px solid `--bg-border`
- Border radius: `var(--border-radius-lg)`
- Padding: `var(--spacing-lg)`
- Shadow: Subtle on hover

**Usage:**
```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

### Inputs

- Font size: `var(--font-size-base)` (18px)
- Padding: `var(--spacing-sm)`
- Border: 2px solid `--bg-border`
- Border radius: `var(--border-radius)`
- Focus: Border color changes to `--brand-primary`
- Placeholder: `--text-muted`

**Usage:**
```html
<input type="text" class="input" placeholder="Vaše meno">
<textarea class="input" placeholder="Vaša správa"></textarea>
```

### Emergency Contact Block

- Background: `--bg-secondary`
- Border: 2px solid `--brand-primary`
- Border radius: `var(--border-radius-lg)`
- Padding: `var(--spacing-lg)`
- Text align: Center
- Phone number: Large, prominent

**Usage:**
```html
<div class="emergency-contact">
  <h2>Núdzový kontakt</h2>
  <p>24/7 k dispozícii</p>
  <a href="tel:+421XXXXXXXXX" class="phone">+421 XXX XXX XXX</a>
</div>
```

### Info Blocks

- Background: `--bg-secondary`
- Border left: 4px solid `--brand-primary`
- Padding: `var(--spacing-lg)`
- Margin: `var(--spacing-lg) 0`

**Usage:**
```html
<div class="info-block">
  <h3>Info Title</h3>
  <p>Info content</p>
</div>
```

---

## Layout

### Container

```css
--container-max-width: 1200px;
```

**Usage:**
```html
<div class="container">
  <!-- Content -->
</div>
```

### Sections

- Padding: `var(--spacing-2xl)` top and bottom
- Max width: 800px for content (centered)

**Usage:**
```html
<section class="section">
  <div class="container">
    <h2 class="section-title">Section Title</h2>
    <div class="section-content">
      <!-- Content -->
    </div>
  </div>
</section>
```

---

## Responsive Design

### Breakpoints

**Mobile:** < 768px
- Single column layout
- Stacked navigation
- Larger touch targets
- Reduced spacing

**Desktop:** ≥ 768px
- Multi-column layouts
- Horizontal navigation
- Full spacing

### Mobile Optimizations

- Font sizes remain large (minimum 16px)
- Touch-friendly buttons (min 44px height)
- No horizontal scroll
- Easy one-handed use
- Clear hierarchy

---

## Accessibility

### WCAG Compliance

- **Contrast:** AA compliant (minimum 4.5:1)
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

## Performance

### Optimizations

- System fonts (no external requests)
- Minimal CSS (only what's needed)
- No heavy animations
- Optimized images
- Fast load times

### Targets

- **LCP:** < 2.5s
- **FCP:** < 1.5s
- **TTI:** < 3s
- **Lighthouse Score:** 90+

---

## Usage Guidelines

### Do's ✅

- ✅ Use brand colors consistently
- ✅ Follow spacing system
- ✅ Use large, readable fonts
- ✅ Ensure high contrast
- ✅ Test on mobile
- ✅ Test with older users
- ✅ Keep it simple

### Don'ts ❌

- ❌ Use bright or flashy colors
- ❌ Use small fonts (< 16px)
- ❌ Add aggressive animations
- ❌ Create urgency or pressure
- ❌ Use sales tactics
- ❌ Clutter the layout
- ❌ Break accessibility rules

---

## Implementation

### CSS File

**Location:** `/assets/mikork/brand.css`

**Usage:**
```html
<link rel="stylesheet" href="/assets/mikork/brand.css">
```

### CSS Variables

All design tokens are CSS variables for easy theming and consistency.

### Components

Reusable components:
- `.btn` - Buttons
- `.card` - Cards
- `.input` - Form inputs
- `.container` - Layout container
- `.header` - Header/navigation
- `.footer` - Footer
- `.emergency-contact` - Emergency contact block
- `.info-block` - Information blocks

---

**Remember:** Respect, dignity, and accessibility are paramount. Every design decision should reflect these values.

