# Local Business Basic - Reusable Product Package

**Version:** 1.0  
**Status:** Production Ready  
**Last Updated:** 2025-12-17

---

## What Is This?

This is a reusable product package for local businesses. It was extracted from the MikoRK pohrebníctvo delivery and can be adapted for any local business client.

---

## What's Included

### Templates

- `index.html` - Homepage template
- `contact.html` - Contact page template
- `services.html` - Services page template (structure)
- `about.html` - About page template (structure)

### Design System

- `brand.css` - Complete design system (customizable)
- Design tokens (colors, typography, spacing)
- Components (buttons, cards, inputs, etc.)
- Mobile-optimized
- Accessible

### Automation

- Content generator script (OpenAI)
- Automation rules and guidelines
- Email notification system

### Documentation

- Brand positioning template
- Design system template
- Local SEO template
- Automation rules template
- Lead flow template
- Testing checklist template
- Handover template
- Environment setup guide
- Google Business Profile setup guide

### Configuration System

- Client config file structure
- Easy to customize for new clients
- Single source of truth

---

## How to Use for New Client

### Step 1: Copy Templates

```bash
cp -r templates/local-business templates/[client-name]
cp -r assets/mikork assets/[client-name]
```

### Step 2: Create Client Config

```bash
cp config/clients/mikork.config.mjs config/clients/[client-name].config.mjs
```

**Update config with client-specific data:**
- Business name
- Contact information
- Address
- Services
- Values

### Step 3: Customize Design

**Update:** `assets/[client-name]/brand.css`

**Customize:**
- Brand colors
- Typography (if needed)
- Spacing (if needed)
- Components (if needed)

### Step 4: Update Templates

**Update templates to use client config:**
- Replace hardcoded values with config references
- Update content for client's industry
- Customize sections as needed

### Step 5: Create API Endpoint

**Copy:** `dashboard/api/mikork/contact.mjs` → `dashboard/api/[client-name]/contact.mjs`

**Update:**
- Import client config
- Update email template name
- Customize validation if needed

### Step 6: Update Documentation

**Copy documentation templates:**
- Update client name throughout
- Customize for client's industry
- Adjust tone if needed (less sensitive industries can be more direct)

### Step 7: Deploy

**Follow:** `docs/MIKORK_DEPLOYMENT_CHECKLIST.md`

**Steps:**
1. Set environment variables
2. Deploy to Vercel
3. Verify deployment
4. Test contact form
5. Set up Google Business Profile

---

## Customization Guide

### For Less Sensitive Industries

**Examples:** Plumber, electrician, cleaning service

**Changes:**
- Can be slightly more direct in tone
- Can use more service-focused language
- Can add pricing (if appropriate)
- Can be more conversion-focused

**Keep:**
- Professional tone
- Local focus
- Trust-building
- Respectful approach

---

### For Professional Services

**Examples:** Lawyer, accountant, consultant

**Changes:**
- More credentials-focused
- More expertise-focused
- Can add testimonials (if appropriate)
- More premium positioning

**Keep:**
- Professional tone
- Trust-building
- Local focus
- Respectful approach

---

## What's Reusable vs Custom

### Fully Reusable

- ✅ Template structure
- ✅ Design system (customize colors)
- ✅ Automation scripts
- ✅ Documentation structure
- ✅ Configuration system

### Partially Reusable

- ⚠️ Content (adapt for industry)
- ⚠️ Tone (adapt for sensitivity)
- ⚠️ Services (client-specific)
- ⚠️ Brand colors (customize)

### Client-Specific

- ❌ Business information
- ❌ Contact details
- ❌ Address and location
- ❌ Services offered
- ❌ Brand values

---

## Pricing Model

### One-Time Setup

**Included:**
- Template customization
- Design system adaptation
- Content creation (from templates)
- Local SEO setup
- Contact form setup
- Deployment
- Documentation

**Investment:** [One-time fee]

---

### Monthly Maintenance (Optional)

**Content & Updates:** [Monthly rate]
- 2-4 social posts
- 1 blog article draft
- Basic updates

**SEO Monitoring:** [Monthly rate]
- Monthly reports
- Ranking tracking

---

## Next Steps

### For Developer

1. **Extract to Product Package**
   - Organize files
   - Create product documentation
   - Set up pricing

2. **Create Sales Page**
   - Product description
   - Pricing
   - What's included
   - How it works

3. **Create Onboarding Process**
   - Client intake form
   - Configuration template
   - Deployment checklist

---

### For Client

1. **Review Product Package**
   - Understand what's included
   - See examples
   - Review pricing

2. **Request Customization**
   - Provide business information
   - Choose design preferences
   - Approve content

3. **Go Live**
   - Deploy website
   - Set up Google Business Profile
   - Start receiving leads

---

## Files Structure

```
products/local-business-basic/
├── README.md (this file)
├── templates/
│   ├── index.html
│   ├── contact.html
│   ├── services.html
│   └── about.html
├── assets/
│   └── brand.css (design system)
├── scripts/
│   └── content_generator.mjs
├── config/
│   └── client.config.mjs.example
└── docs/
    ├── BRAND_POSITIONING.md.template
    ├── DESIGN_SYSTEM.md.template
    ├── LOCAL_SEO.md.template
    ├── AUTOMATION_RULES.md.template
    ├── LEAD_FLOW.md.template
    ├── TESTING_CHECKLIST.md.template
    ├── HANDOVER.md.template
    ├── ENV_SETUP.md
    ├── GOOGLE_BUSINESS_SETUP.md
    └── DEPLOYMENT_CHECKLIST.md
```

---

## Success Metrics

### For Client

- Contact form submissions
- Phone calls
- Email inquiries
- Local search rankings
- Google Business Profile views

### For Developer

- Time to deploy (target: 1-2 weeks)
- Client satisfaction
- Reusability (can adapt quickly)
- Scalability (can handle multiple clients)

---

**This product package is ready to be sold as a commercial offering.**

**It's been proven with MikoRK pohrebníctvo and can be adapted for any local business.**

