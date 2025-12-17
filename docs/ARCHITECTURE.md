# Architecture Overview

High‑level view of how the GoLoCapo / Fordfofer system is put together.

## Frontend

- **Static HTML/CSS/JS** served via Vercel.
- Core entry pages live under `dashboard/`:
  - `index.html` – GoLoCapo landing page.
  - `prelaunch.html` – email‑first pre‑launch page.
  - `pricing.html` – early‑access pricing.
  - `portfolio/*.html` – portfolio index + case‑study pages.
  - `clients/*/*.html` – client microsites.
- Styling is handled by `dashboard/styles.css` and a small shared stylesheet under `dashboard/clients/_shared/styles.css`.

## Backend / APIs

Implemented as **Vercel serverless functions** in `dashboard/api/*.mjs`:

- `api/health.mjs` – overall health/status.  
- `api/launch/status.mjs` – launch‑specific flags and integration status.  
- `api/checkout-url.mjs` – returns Stripe payment link.  
- `api/leads/*` – create and list leads.  
- `api/customers/status.mjs` – customer summary.  
- `api/payments/status.mjs` – payment summary.  
- `api/stripe/webhook.mjs` – Stripe webhook (checkout session completed → upgrade lead → customer).  
- `api/meta/*` – Meta Graph API integration (page selection, posting, status).  
- `api/ai/*` – OpenAI/LangChain‑powered content generation.  

Shared utilities under `dashboard/api/utils/*` handle:

- Storage abstraction (KV/Postgres/memory fallback).  
- Email sending via Resend.  
- Security headers and rate limiting.  

## Hosting & Routing

- **Hosting:** Vercel (Pro project `dashboard`).  
- **Root routing:** `fordfofer-pitch/vercel.json` routes `golocapo.com` into `dashboard/`:
  - `/` → `/dashboard/index.html`  
  - `/pricing` → `/dashboard/pricing.html`  
  - `/prelaunch` → `/dashboard/prelaunch.html`  
  - `/portfolio*` → `/dashboard/portfolio/*`  
  - `/api/(.*)` → `/dashboard/api/$1`  
  - Legacy routes for `landing-page` and standalone `portfolio/`.  
- **Dashboard‑local routing:** `dashboard/vercel.json` ensures API routes and portfolio/client pages are served correctly when `dashboard/` is used as the project root.

## Payments (Stripe)

- Uses **Stripe Payment Links** for checkout:
  - Env var: `STRIPE_CHECKOUT_URL` – points to a Stripe Payment Link.
  - Frontend pricing page calls `/api/checkout-url` and redirects to the returned URL.
- Webhook:
  - `/api/stripe/webhook` verifies signatures using `STRIPE_WEBHOOK_SECRET`.
  - On `checkout.session.completed`, upgrades a lead → customer and records basic payment info.

## AI Integrations (OpenAI)

- Uses OpenAI via `langchain` and `@langchain/openai`:
  - Env var: `OPENAI_API_KEY` (set in Vercel).  
  - Used in `dashboard/api/ai/*.mjs` and promo‑kit / social‑kit tooling.  
- Goals:
  - Generate promo kits, posts, and product blueprints.  
  - Support microsite/content generation for client sites.  

## Operations & Automation

- Dozens of PowerShell/BAT scripts at the repo root and under `dashboard/`.  
- Central scripts (copies will live under `/scripts` as we consolidate):  
  - `RUN_EVERYTHING.bat` – environment/setup helper.  
  - `dashboard/REDEPLOY_LIVE.ps1` – redeploy + health checks.  
  - `dashboard/TEST_STRIPE_SETUP.ps1` – validate Stripe configuration.  
  - `dashboard/COMPLETE_TEST_SUITE.ps1` – smoke tests for key routes.  

This architecture intentionally favors **simple static HTML + serverless APIs** and **scriptable operations** over heavy frameworks.

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