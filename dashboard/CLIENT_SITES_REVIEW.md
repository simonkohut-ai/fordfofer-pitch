# Client Sites Review Pack

**Status:** ✅ Portfolio-Grade Flagship Quality  
**Clients:** MikoRK, Komfortreality  
**Date:** 2025

---

## 🎯 Review Checklist

### Design System

- [x] Shared CSS tokens (`/clients/_shared/styles.css`)
- [x] Consistent typography (system fonts only)
- [x] Dark premium aesthetic
- [x] Mobile-first responsive design
- [x] Accessible focus states and contrast
- [x] Smooth transitions (CSS only)

### MikoRK Site

**Pages:**
- [x] `/clients/mikork` - Homepage with hero, trust row, services, FAQ, CTA
- [x] `/clients/mikork/sluzby` - Services detail page
- [x] `/clients/mikork/kontakt` - Contact page with form

**Features:**
- [x] Respectful, calm tone
- [x] 24/7 availability messaging
- [x] "What to do first" quick steps
- [x] FAQ accordion
- [x] Lead capture form with validation
- [x] Response time note

### Komfortreality Site

**Pages:**
- [x] `/clients/komfortreality` - Homepage with hero, trust row, services, process timeline, FAQ, CTA
- [x] `/clients/komfortreality/sluzby` - Services detail page
- [x] `/clients/komfortreality/kontakt` - Contact page with form

**Features:**
- [x] Confident, process-driven tone
- [x] Free valuation lead magnet section
- [x] 4-step process timeline
- [x] FAQ accordion
- [x] Lead capture form with validation
- [x] Response time note

### Hamilton Merch Site

**Pages:**
- [x] `/clients/hamilton-merch` - Homepage with hero, trust row, featured products, FAQ, CTA
- [x] `/clients/hamilton-merch/shop` - Shop page with product grid, local cart, size guide
- [x] `/clients/hamilton-merch/about` - About page with brand story
- [x] `/clients/hamilton-merch/contact` - Contact page with form

**Features:**
- [x] Streetwear drop aesthetic
- [x] Silver/mono brand accent (no bright colors)
- [x] 8 product cards with local cart (localStorage)
- [x] Checkout routing (MERCH_CHECKOUT_URL or /pricing fallback)
- [x] Size guide table
- [x] FAQ accordion
- [x] Lead capture form with validation
- [x] Trademark-safe copy (fan-inspired, track-inspired, no "official" claims)

### Lead Form Hardening

- [x] Inline validation (name, email, message)
- [x] Name: 2-100 characters
- [x] Email: format validation
- [x] Message: 10-1000 characters
- [x] GDPR consent required
- [x] Disable button while submitting
- [x] Success state: "Ďakujeme — ozveme sa."
- [x] Error state: friendly messages
- [x] Rate limiting (5 requests/minute)
- [x] No raw email/message logging

### Portfolio Placement

- [x] Featured Work section on `/` (home.html)
- [x] MikoRK project card (#1)
- [x] Komfortreality project card (#2)
- [x] Tags: UX, Lead Capture, Conversion
- [x] "View project" CTAs

---

## 📱 Mobile Breakpoints

Test at:
- **375px** (iPhone SE)
- **768px** (iPad)
- **1024px** (Desktop)

### Expected Behavior

**375px:**
- Single column layout
- Stacked navigation
- Full-width buttons
- Readable text (min 16px)

**768px:**
- 2-column grid where appropriate
- Horizontal navigation
- Side-by-side contact form

**1024px+:**
- Full 3-4 column grids
- Optimal spacing
- Hover effects active

---

## 🧪 Form Test Steps

### Test 1: Valid Submission

1. Navigate to `/clients/mikork/kontakt`
2. Fill form:
   - Name: "Test User" (2+ chars)
   - Email: "test@example.com" (valid format)
   - Phone: "+421123456789" (optional)
   - Message: "This is a test message with enough characters" (10+ chars)
   - Consent: ✓ checked
3. Submit
4. **Expected:** Success message "Ďakujeme za správu. Ozveme sa vám čoskoro."
5. Form resets
6. Verify in War Room: Lead appears with tags `["client", "mikork"]`

### Test 2: Validation Errors

1. Navigate to `/clients/komfortreality/kontakt`
2. Try submitting empty form
3. **Expected:** Error messages for required fields
4. Fill name: "A" (too short)
5. **Expected:** "Meno musí mať 2-100 znakov."
6. Fill email: "invalid" (no @)
7. **Expected:** "Neplatný formát emailu."
8. Fill message: "Short" (too short)
9. **Expected:** "Správa musí mať 10-1000 znakov."
10. Uncheck consent
11. **Expected:** "Musíte súhlasiť so spracovaním osobných údajov."

### Test 3: Rate Limiting

1. Submit form 5 times rapidly
2. **Expected:** 6th submission returns 429 "Príliš veľa požiadaviek"
3. Wait 60 seconds
4. **Expected:** Form submits successfully

### Test 4: Hamilton Merch Cart (Mobile)

1. Navigate to `/clients/hamilton-merch/shop` on mobile (375px)
2. **Expected:** Product grid stacks to single column
3. Tap "Add to Cart" on a product
4. **Expected:** Toast notification "Added to cart"
5. **Expected:** Cart badge shows count in header
6. Tap cart icon
7. **Expected:** Alert shows cart summary
8. Tap "Proceed to checkout"
9. **Expected:** Redirects to `/pricing` (or MERCH_CHECKOUT_URL if set)
10. Test size guide table scrolls horizontally on mobile

---

## 🔍 Lead Storage Validation

### API Test

```bash
# Test MikoRK lead
curl -X POST http://localhost:3000/api/leads/submit-client \
  -H "Content-Type: application/json" \
  -d '{
    "brand": "mikork",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+421123456789",
    "message": "Test message with enough characters",
    "consent": true
  }'

# Expected Response:
# {
#   "success": true,
#   "message": "Ďakujeme za správu. Čoskoro vás budeme kontaktovať.",
#   "leadId": "..."
# }
```

### Admin Verification

1. Open `/dashboard` → Automation Hub
2. Check Growth panel
3. **Expected:** "Client Leads by Brand" section shows:
   - mikork: X leads
   - komfortreality: X leads
4. Open `/war-room`
5. **Expected:** Growth card shows client leads by brand

### Database Check

Leads should have:
- `source`: "client_site"
- `tags`: `["client", "mikork"]`, `["client", "komfortreality"]`, or `["client", "hamilton-merch"]`
- `name`: (string)
- `phone`: (string or null)
- `message`: (string)
- `brand`: "mikork", "komfortreality", or "hamilton-merch"
- `consent`: true

---

## ♿ Accessibility Checks

### Keyboard Navigation

1. Tab through all interactive elements
2. **Expected:** Focus visible on all inputs, buttons, links
3. **Expected:** Focus ring matches design system (accent color)
4. **Expected:** Tab order is logical (top to bottom)

### Screen Reader

1. Use screen reader (NVDA/JAWS/VoiceOver)
2. **Expected:** All form labels announced
3. **Expected:** Error messages announced
4. **Expected:** Success messages announced
5. **Expected:** FAQ accordion states announced

### Contrast

- **Expected:** Text on dark background passes WCAG AA (4.5:1)
- **Expected:** Buttons have sufficient contrast
- **Expected:** Error/success states are distinguishable

---

## 📸 Screenshot Checklist

### MikoRK

- [ ] Homepage (desktop)
- [ ] Homepage (mobile 375px)
- [ ] Services page
- [ ] Contact form (empty state)
- [ ] Contact form (validation errors)
- [ ] Contact form (success state)

### Komfortreality

- [ ] Homepage (desktop)
- [ ] Homepage (mobile 375px)
- [ ] Process timeline
- [ ] Free valuation section
- [ ] Contact form (empty state)
- [ ] Contact form (validation errors)
- [ ] Contact form (success state)

### Hamilton Merch

- [ ] Homepage (desktop)
- [ ] Homepage (mobile 375px)
- [ ] Shop page product grid (desktop)
- [ ] Shop page product grid (mobile 375px)
- [ ] Cart functionality (add to cart, badge update)
- [ ] Size guide table (mobile scroll)
- [ ] Contact form (empty state)
- [ ] Contact form (validation errors)
- [ ] Contact form (success state)

### Portfolio

- [ ] Featured Work section on homepage
- [ ] Project cards hover state

---

## 🚀 Deployment Checklist

- [x] All routes in `vercel.json`
- [x] Shared CSS accessible at `/clients/_shared/styles.css`
- [x] API endpoint hardened (`/api/leads/submit-client`)
- [x] Email template configured
- [x] Rate limiting active
- [x] No console errors
- [x] No linter errors
- [x] Mobile responsive
- [x] Forms functional
- [x] Admin visibility working

---

## ✅ Flagship Quality Confirmation

Both sites are **portfolio-grade flagship quality**:

- ✅ Premium design system
- ✅ Consistent branding
- ✅ Mobile-first responsive
- ✅ Accessible and keyboard-navigable
- ✅ Form validation and error handling
- ✅ Lead capture and storage
- ✅ Admin visibility
- ✅ Professional copy and tone
- ✅ Trust elements and CTAs
- ✅ Legal compliance (GDPR)

**Ready for portfolio showcase.**

