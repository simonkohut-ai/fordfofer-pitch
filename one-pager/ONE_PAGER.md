# GoLoCapo / Fordfofer – One‑Pager

## One‑liner

**GoLoCapo is an AI‑assisted marketing studio for solo founders and small agencies that want a console‑first way to run pre‑launch funnels, content, and payments.**

---

## Problem

- Founders juggle multiple disconnected tools for landing pages, content, payments, and analytics.  
- Pre‑launch campaigns are manual, brittle, and hard to reuse for the next product or client.  
- It’s hard for a single operator to verify that “the whole funnel” is healthy and deployable at any moment.

---

## Solution

- A **single dashboard** (hosted on Vercel) that connects landing, pre‑launch email capture, pricing, Stripe checkout, and status views.  
- **Console‑first automation scripts** to deploy, verify, and test the system from a terminal (no guesswork).  
- **AI‑assisted tooling** (OpenAI + LangChain) to generate promo kits, posts, and microsites from the same environment.

---

## Product

- **Frontend:** Static HTML/CSS/JS under `dashboard/`, served at `https://www.golocapo.com/`.  
- **APIs:** Vercel serverless functions for health, leads/customers, Stripe webhook, AI, and Meta integrations.  
- **Ops:** PowerShell/BAT scripts that handle deploy, health checks, Stripe tests, and environment setup.  
- **Portfolio:** `/portfolio` and `/clients/*` microsites used as live proof of quality.

---

## Target Market

- Solo founders validating new products.  
- Boutique marketing agencies managing several client funnels.  
- Technical operators who prefer scripts and dashboards over heavyweight SaaS stacks.

---

## Differentiation

- **Console‑first operations:** designed to be run from a PowerShell prompt, not just a browser.  
- **End‑to‑end scope:** includes payments, email, Meta, and AI content, not just a landing page.  
- **Static‑first hosting:** simple, cheap, and resilient static+serverless architecture (no complex frameworks).

---

## Current Status

- Live domain pointing to the dashboard: `https://www.golocapo.com/` (static landing page).  
- Core pages, APIs, and Stripe integration implemented in `dashboard/` and wired via `vercel.json`.  
- Deployment + verification scripts in place; production routing for some APIs still being hardened.  
- Extensive docs and checklists capturing the operational model and launch plan.

---

## Roadmap (Near‑Term)

1. Stabilize `/pricing`, `/prelaunch`, and key APIs (`/api/health`, `/api/checkout-url`) in production.  
2. Finish and harden the `/war-room` operational view (leads, customers, revenue, integration health).  
3. Polish 2–3 client microsites as portfolio‑grade case studies.  
4. Simplify and centralize the script entrypoints under `/scripts`.  
5. Add final screenshots, deck, and demo flow for external sharing.

---

## Ask

- **Feedback:** on positioning, UX, and system design from experienced operators and investors.  
- **Pilots:** a small number of founders/agencies willing to try a console‑first marketing stack.  
- **Collaborators:** engineers/designers who enjoy Vercel + scripts + AI and want to help polish it.

> Contact: _placeholder_ `contact@golocapo.com` – can be updated with final contact details.


