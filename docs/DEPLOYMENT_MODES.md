# Deployment Modes

**Purpose:** Define three deployment modes for different use cases  
**Last Updated:** 2025-12-17

---

## Overview

This repository supports three deployment modes:

1. **MODE A — Global Brand (GoLoČapo)** - Main canonical entry
2. **MODE B — Client Delivery (MikoRK)** - Template-based client sites
3. **MODE C — Internal Ops / Dashboard** - Hidden, non-public operations

---

## MODE A — Global Brand (GoLoČapo)

### Purpose

**Authority + Inbound**

- Main brand presence
- Authority building
- Lead generation
- Product prelaunch

### Domain

**Primary:** `https://www.golocapo.com`

**All projects roll up under GoLoČapo**

### Routes

**Public Routes:**
- `/` → GoLoČapo homepage (`dashboard/index.html`)
- `/prelaunch` → Global prelaunch offer (`prelaunch.html`)
- `/pricing` → Pricing page (`pricing.html`)
- `/thank-you` → Conversion endpoint (`thank-you.html`)

**API Routes:**
- `/api/leads/submit` → Lead capture
- `/api/checkout-url` → Stripe checkout
- `/api/stripe/webhook` → Payment processing
- `/api/revenue/track` → Revenue tracking
- `/api/ai/outreach` → AI content generation

### CTA

**Primary:** `/prelaunch`

**Goal:** Convert visitors to leads → customers

### Configuration

**Environment Variables:**
- `RESEND_API_KEY` - Email sending
- `STRIPE_CHECKOUT_URL` - Payment link
- `STRIPE_WEBHOOK_SECRET` - Webhook verification
- `STRIPE_SECRET_KEY` - Stripe API
- `DOMAIN` - `https://www.golocapo.com`
- `POSTHOG_KEY` - Analytics (optional)
- `OPENAI_API_KEY` - AI features (optional)

**Vercel Configuration:**
- Project: `golocapo` (or main project)
- Domain: `www.golocapo.com`
- Root Directory: (default, or `fordfofer-pitch`)
- Framework: Other (static)

---

## MODE B — Client Delivery (MikoRK)

### Purpose

**Template-Based Client Sites**

- Local business websites
- Config-driven
- Reusable template
- Client-specific branding

### Domain Options

**Option 1: Subdomain**
- `https://mikork.golocapo.com`

**Option 2: Separate Domain**
- `https://www.mikork.sk`

**Option 3: Folder-Based**
- `https://www.golocapo.com/mikork`

**Recommended:** Separate domain (better for local SEO)

### Routes

**Public Routes:**
- `/` → MikoRK homepage (`templates/local-business/index.html`)
- `/contact` → Contact page (`templates/local-business/contact.html`)
- `/services` → Services page (template)
- `/about` → About page (template)

**API Routes:**
- `/api/mikork/contact` → Contact form

### Configuration

**Client Config:**
- `config/clients/mikork.config.mjs` - All client data

**Environment Variables:**
- `RESEND_API_KEY` - Email sending (can reuse global)
- `CONTACT_EMAIL` - MikoRK contact notifications
- `RESEND_FROM_EMAIL` - Sender email (can reuse global)
- `SITE_URL` - MikoRK website URL
- `OPENAI_API_KEY` - Content generator (optional)

**Vercel Configuration:**
- **Option 1:** Separate Vercel project
  - Project: `mikork-pohrebnictvo`
  - Domain: `www.mikork.sk`
  - Root Directory: `fordfofer-pitch`
  - Framework: Other (static)

- **Option 2:** Same Vercel project, different domain
  - Project: `golocapo` (same)
  - Domain: `www.mikork.sk` (additional domain)
  - Routes: Configure in `vercel.json`

---

## MODE C — Internal Ops / Dashboard

### Purpose

**Hidden, Non-Public**

- Operations dashboard
- Revenue tracking
- Automation tools
- Internal tools only

### Domain

**Hidden Routes:**
- `/dashboard/revenue-dashboard.html` → Revenue dashboard
- `/dashboard/war-room.html` → Operations dashboard
- `/api/revenue/*` → Revenue API (internal)
- `/api/sales/*` → Sales API (internal)

### Access Control

**Current:** No authentication (add if needed)

**Future:** Basic auth or API keys

### Configuration

**Environment Variables:**
- Same as MODE A (global)
- No additional vars needed

**Vercel Configuration:**
- Same project as MODE A
- Routes are internal (not publicized)
- Can add authentication later

---

## Deployment Strategy

### Recommended Setup

**Project 1: GoLoČapo (MODE A)**
- Domain: `www.golocapo.com`
- Purpose: Main brand, authority, inbound
- Routes: `/`, `/prelaunch`, `/pricing`, `/thank-you`

**Project 2: MikoRK (MODE B)**
- Domain: `www.mikork.sk` (separate domain)
- Purpose: Client delivery, local SEO
- Routes: `/`, `/contact`, `/services`, `/about`

**Project 3: Internal (MODE C)**
- Same as Project 1 (shared)
- Purpose: Operations, automation
- Routes: `/dashboard/*`, `/api/revenue/*`, `/api/sales/*`

---

## Switching Between Modes

### For New Client (MODE B)

**Steps:**
1. Copy `config/clients/mikork.config.mjs` → `config/clients/[new-client].config.mjs`
2. Update client config with new business data
3. Copy `templates/local-business/` → `templates/[new-client]/`
4. Update templates to use new client config
5. Copy `dashboard/api/mikork/contact.mjs` → `dashboard/api/[new-client]/contact.mjs`
6. Update API endpoint to use new client config
7. Deploy as separate Vercel project or add domain to existing

**Time:** 1-2 weeks (mostly content customization)

---

## Environment Variable Strategy

### Global Variables (Shared)

**Can be reused across modes:**
- `RESEND_API_KEY` - Same email service
- `OPENAI_API_KEY` - Same AI service
- `POSTHOG_KEY` - Same analytics (if using)

### Mode-Specific Variables

**MODE A (GoLoČapo):**
- `STRIPE_CHECKOUT_URL` - GoLoČapo payment link
- `STRIPE_WEBHOOK_SECRET` - GoLoČapo webhook
- `DOMAIN` - `https://www.golocapo.com`

**MODE B (MikoRK):**
- `CONTACT_EMAIL` - MikoRK notifications
- `SITE_URL` - `https://www.mikork.sk`

**MODE C (Internal):**
- Uses MODE A variables

---

## Vercel Configuration Examples

### MODE A (GoLoČapo)

**vercel.json:**
```json
{
  "rewrites": [
    { "source": "/", "destination": "/dashboard/index.html" },
    { "source": "/prelaunch", "destination": "/prelaunch.html" },
    { "source": "/pricing", "destination": "/pricing.html" },
    { "source": "/thank-you", "destination": "/thank-you.html" },
    { "source": "/api/:path*", "destination": "/dashboard/api/:path*" }
  ]
}
```

**Domain:** `www.golocapo.com`

---

### MODE B (MikoRK)

**Option 1: Separate Project**

**vercel.json:**
```json
{
  "rewrites": [
    { "source": "/", "destination": "/templates/local-business/index.html" },
    { "source": "/contact", "destination": "/templates/local-business/contact.html" },
    { "source": "/api/mikork/:path*", "destination": "/dashboard/api/mikork/:path*" }
  ]
}
```

**Domain:** `www.mikork.sk`

**Option 2: Same Project, Different Domain**

Add domain to existing project, routes auto-handled by `vercel.json`

---

## Summary

### MODE A — Global Brand

- **Domain:** `www.golocapo.com`
- **Purpose:** Authority + inbound
- **CTA:** `/prelaunch`
- **Status:** ✅ Live

### MODE B — Client Delivery

- **Domain:** `www.mikork.sk` (or subdomain)
- **Purpose:** Template-based client sites
- **Status:** ✅ Ready to deploy

### MODE C — Internal Ops

- **Domain:** Same as MODE A (hidden routes)
- **Purpose:** Operations, automation
- **Status:** ✅ Available

---

**All modes are production-ready and can be deployed independently.**

