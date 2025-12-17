# Golo Čapo Brand System

**Version:** 1.0  
**Last Updated:** [Current Date]  
**Status:** Production Ready

---

## Brand Identity

### Brand Personality

**Golo Čapo** is:
- **Premium** - High-quality, professional, trustworthy
- **Minimal** - Clean, focused, no fluff
- **Fast** - Efficient, automated, time-saving
- **Modern** - Cutting-edge, AI-powered, forward-thinking
- **Confident** - Direct, clear, results-focused

### Tone of Voice

**Writing Style:**
- **Direct** - Get to the point quickly
- **Clear** - No jargon, no confusion
- **Confident** - Assertive but not arrogant
- **Minimal** - Every word counts
- **Action-oriented** - Focus on outcomes

**Examples:**
- ✅ "21.12 — Early Christmas gift."
- ✅ "Meta posts in seconds, not hours."
- ✅ "Claim your spot."
- ❌ "We're excited to announce..."
- ❌ "Transform your marketing journey..."

---

## Color Palette

### Primary Colors (Derived from Logo)

```css
--brand-primary: #C080B0;    /* Main brand color - Purple-pink */
--brand-secondary: #A070B0;  /* Secondary accent */
--brand-deep: #8060A0;       /* Deep purple for depth */
--brand-accent: #D090C0;     /* Light accent for highlights */
```

**Usage:**
- Primary: CTAs, links, active states
- Secondary: Hover states, secondary actions
- Deep: Text gradients, depth effects
- Accent: Highlights, badges, emphasis

### UI Colors

```css
--bg-primary: #0B0B12;                           /* Dark background */
--bg-surface: rgba(255, 255, 255, 0.06);        /* Card/surface background */
--bg-border: rgba(255, 255, 255, 0.12);         /* Borders, dividers */
--text-primary: rgba(255, 255, 255, 0.92);      /* Primary text */
--text-muted: rgba(255, 255, 255, 0.70);        /* Secondary text */
--text-secondary: rgba(255, 255, 255, 0.50);    /* Tertiary text */
```

**Semantic Colors:**
```css
--success: #10b981;  /* Success states, confirmations */
--error: #ef4444;    /* Errors, warnings */
--warning: #f59e0b; /* Warnings, cautions */
```

### Color Accessibility

- **Contrast Ratios:** All text meets WCAG AA (4.5:1 minimum)
- **Focus States:** Clear, visible focus indicators
- **Color Blind:** Not relying solely on color for information

---

## Typography

### Font Stack

```css
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', 'Roboto', sans-serif;
```

**Rationale:**
- System fonts for speed (no external requests)
- Modern, clean, professional
- Excellent readability
- Cross-platform consistency

### Type Scale

```css
--font-size-base: 16px;    /* Body text */
--font-size-sm: 14px;      /* Small text, captions */
--font-size-lg: 18px;      /* Large body, subheadings */
--font-size-xl: 24px;      /* Section headings */
--font-size-2xl: 32px;     /* Page headings */
--font-size-3xl: 42px;     /* Hero headings */
--font-size-4xl: 56px;     /* Display headings */
```

### Typography Hierarchy

**H1 (Hero):** `clamp(32px, 5vw, 56px)` - Bold, gradient text  
**H2 (Section):** `clamp(24px, 4vw, 42px)` - Bold, primary color  
**H3 (Subsection):** `clamp(18px, 3vw, 24px)` - Semibold  
**Body:** `16px` - Regular weight, muted color  
**Small:** `14px` - Regular weight, secondary color

---

## Spacing System

### Spacing Scale

```css
--spacing-xs: 8px;    /* Tight spacing */
--spacing-sm: 16px;  /* Small spacing */
--spacing-md: 24px;  /* Medium spacing (default) */
--spacing-lg: 32px;  /* Large spacing */
--spacing-xl: 48px;  /* Extra large spacing */
--spacing-2xl: 64px; /* Double extra large */
```

**Usage:**
- Consistent spacing between elements
- Predictable rhythm
- Easy to maintain

---

## Layout

### Container

```css
--container-max-width: 1080px;
```

**Rationale:**
- Optimal reading width
- Not too wide, not too narrow
- Works on all screen sizes

### Border Radius

```css
--border-radius: 12px;      /* Standard radius */
--border-radius-lg: 16px;   /* Large radius for cards */
```

---

## Components

### Buttons

**Primary Button:**
- Gradient background (primary → secondary)
- White text
- Shadow for depth
- Hover: Lift effect
- Focus: Clear outline

**Ghost Button:**
- Transparent background
- Border
- Hover: Background fill
- Focus: Clear outline

### Cards

- Subtle background (bg-surface)
- Border (bg-border)
- Rounded corners
- Padding: spacing-lg
- Backdrop blur for depth

### Inputs

- Dark background
- Border on focus
- Clear placeholder
- Accessible focus states

---

## Design Principles

### 1. Conversion-First

**Every element must:**
- Drive action
- Reduce friction
- Build trust
- Guide to CTA

**Remove:**
- Decorative elements without purpose
- Unnecessary animations
- Distracting elements
- Anything that doesn't convert

### 2. Speed

**Optimize for:**
- Fast load times
- System fonts (no external requests)
- Minimal CSS
- No heavy assets

### 3. Trust

**Build trust through:**
- Clean, professional design
- Clear messaging
- Consistent branding
- Accessible design

### 4. Simplicity

**Keep it:**
- Minimal
- Focused
- Clear
- Direct

---

## Usage Guidelines

### Do's

✅ Use brand colors consistently  
✅ Follow spacing system  
✅ Use system fonts  
✅ Optimize for conversion  
✅ Test accessibility  
✅ Keep it minimal  

### Don'ts

❌ Use custom fonts (unless critical)  
❌ Add decorative elements  
❌ Break spacing system  
❌ Use colors outside palette  
❌ Compromise on speed  
❌ Add unnecessary animations  

---

## Implementation

### CSS File

**Location:** `/assets/brand/brand.css`

**Usage:**
```html
<link rel="stylesheet" href="/assets/brand/brand.css">
```

### CSS Variables

All design tokens are CSS variables for easy theming and consistency.

### Components

Minimal, reusable components:
- `.btn` - Buttons
- `.card` - Cards
- `.input` - Form inputs
- `.container` - Layout container
- `.brand-bar` - Header/navigation

---

## Email Templates

### Brand Colors in Email

Use brand colors consistently:
- Background: `#0B0B12`
- Text: `rgba(255, 255, 255, 0.92)`
- Primary: `#C080B0`
- Links: `#C080B0`

### Email Typography

- Font: System fonts (same as web)
- Size: 16px base
- Line height: 1.6

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

---

## Performance

### Optimization

- **CSS:** Minified, critical CSS inlined
- **Fonts:** System fonts only (no external requests)
- **Images:** Optimized, lazy-loaded
- **Animations:** GPU-accelerated, minimal

### Metrics

- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Lighthouse Score:** 90+

---

## Brand Assets

### Logo

**Location:** `/assets/brand/logo.svg`

**Usage:**
- Header/navigation
- Favicons
- Email signatures
- Social media

### Icons

**Favicons:**
- `favicon-16.png` (16x16)
- `favicon-32.png` (32x32)
- `apple-touch-icon.png` (180x180)
- `icon-192.png` (192x192)
- `icon-512.png` (512x512)

### Social Images

**OG Image:** `/assets/brand/og.png` (1200x630)

---

## Maintenance

### Updates

- Document all changes
- Test across devices
- Verify accessibility
- Check performance

### Version Control

- Track changes in git
- Tag releases
- Document breaking changes

---

## Resources

- **CSS File:** `/assets/brand/brand.css`
- **Logo:** `/assets/brand/logo.svg`
- **Icons:** `/assets/brand/`
- **This Document:** `/docs/BRAND_SYSTEM.md`

---

**Remember:** Revenue > Beauty. Every design decision should drive conversion.

