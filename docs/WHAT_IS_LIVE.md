# What Is Live (Production Status)

Single source of truth for which public routes are expected to work in production and their current status.

## Domain

- **Primary:** `https://www.golocapo.com`

## Routes – Marketing Surfaces

- ✅ `/` – GoLoCapo landing (static HTML, CTA “Get Early Access — €49”).
- ⚠️ `/pricing` – Pricing **information + waitlist redirect**; implemented as `dashboard/pricing.html`, routed via `vercel.json`, currently returning `404` in production (deployment/config TODO). No direct payments until after launch.
- ⚠️ `/prelaunch` – Primary waitlist funnel; implemented as `dashboard/prelaunch.html`. Contains the 21.12 message, countdown, and lead capture.
- ✅ `/portfolio` – Dashboard portfolio index page (static HTML) – should return 200 once dashboard build is fully active in the current project.
- ✅ `/clients/mikork`, `/clients/komfortreality`, `/clients/hamilton-merch` – Client microsites under `dashboard/clients/*` (HTML only); routed via `dashboard/vercel.json`.

## Routes – Admin / Tools (intended)

- `/war-room` – War Room status dashboard (metrics, integrations).  
- `/promo-kit` – Promo kit generator.  
- `/social-kit` – Social content generator.  

> These pages exist in `dashboard/*.html` and are wired in local routing; production status may vary and should be validated per deploy.

## API Routes

All implemented under `dashboard/api/*.mjs` and routed via root `vercel.json` → `/dashboard/api/*`.

- ⚠️ `/api/health` – Health/status JSON. Works locally; currently `404` in production (routing/build TODO).  
- ⚠️ `/api/checkout-url` – Returns Stripe checkout URL from `STRIPE_CHECKOUT_URL`. Works locally; currently `404` in production.  
- ✅ `/api/stripe/webhook` – Stripe webhook handler; should be called only by Stripe.  
- ✅ `/api/leads/status`, `/api/customers/status`, `/api/payments/status` – Admin read‑only status endpoints (used by dashboard UI).  
- ✅ `/api/launch/status` – Launch‑oriented status information.  
- `/api/meta/*`, `/api/ai/*` – Meta + AI helpers; treat as **advanced** and verify per environment before use.

## Known TODOs

- [ ] Confirm `/pricing` and `/prelaunch` return HTTP 200 in production.  
- [ ] Confirm `/api/health` and `/api/checkout-url` are reachable from production after Vercel config stabilizes.  
- [ ] Add a small smoke‑test script that hits all the above and writes a one‑line PASS/FAIL summary.  
- [ ] Document which pages are considered investor‑demo ready (vs. internal tools).  
- [ ] Re‑enable direct payment CTA after launch once Stripe flow is fully verified.

Use this file as the reference when verifying deployments and preparing investor/partner demos.

{
  "cells": [],
  "metadata": {
    "language_info": {
      "name": "python"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 2
}