## Fordfofer / GoLoCapo – AI Marketing Studio Pitch Repo

**Fordfofer is a consolidated pitch + code repo for GoLoCapo – an AI‑assisted marketing studio for solo founders and small agencies that want a console‑like way to run pre‑launch campaigns, content, and payments.**

This repo contains:
- The **live GoLoCapo marketing/automation dashboard** (`dashboard/`) deployed to Vercel.
- A **portfolio microsite** and client examples.
- A large set of **operations scripts and docs** used to run, deploy, and test the system.

Everything here is optimized for showing investors/partners **how the system works**, not just slides.

---

### Launch: 21.12 🎄

This system is in **pre‑launch**. The main message across all surfaces is:

> “We’re launching something new on 21.12.
> An early Christmas gift for founders & small teams who want AI-powered marketing without chaos.
> Join the waitlist — first access goes out on launch day.”

Primary funnel: `https://www.golocapo.com/prelaunch` (waitlist + countdown).

---

### What’s live right now

**Production domain:** `https://www.golocapo.com`

- ✅ `/` – GoLoCapo landing page (static HTML, CTA: “Get Early Access — €49”).

**Intended production routes (wired in code & routing, deployment still being hardened):**
- `/pricing` – Early‑access pricing page that redirects to Stripe checkout.
- `/prelaunch` – Email‑first pre‑launch landing.
- `/portfolio` – GoLoCapo portfolio index + case‑study pages.
- `/war-room` – “War Room” status/metrics dashboard.
- `/promo-kit`, `/social-kit` – Content generation / promo tooling.
- `/clients/mikork`, `/clients/komfortreality`, `/clients/hamilton-merch` – Client microsites.
- `/api/health` – JSON health/status endpoint.
- `/api/checkout-url` – Returns configured Stripe payment link.

> **Note:** Some of the above may return `404` or `502` while deployment is being finalized. See `docs/WHAT_IS_LIVE.md` for current status and TODOs.

---

### What this actually is

- **What:** A static + serverless Vercel app (`dashboard/`) plus a dense set of operational scripts and docs that together form a **console‑first AI marketing system**.
- **Who:** Solo founders, boutique agencies, and technical operators who want to run pre‑launch funnels, content, and payments from a single dashboard.
- **Why care:** It demonstrates **end‑to‑end thinking** – from landing and portfolio to Stripe, email automation, and Meta integrations – with real code, not just slides.
- **Unique angle:** Console‑first operations (PowerShell + scripts + APIs) rather than drag‑and‑drop SaaS; optimized for one operator running multiple brands.

---

### Problem

- Founders and small agencies juggle **many disconnected tools** for landing pages, content, payments, and analytics.
- Pre‑launch campaigns are often **manual, brittle, and hard to repeat** across multiple brands or clients.
- It’s hard for a single operator to **audit, redeploy, and verify** an entire funnel quickly and safely.

---

### Solution

Fordfofer / GoLoCapo provides:

1. **One dashboard** (`dashboard/`) that ties together landing, portfolio, pre‑launch email capture, pricing, Stripe checkout, and status views.
2. **Console‑first automation**: PowerShell/BAT scripts to deploy to Vercel, run health checks, test Stripe, and verify routes from the terminal.
3. **AI‑assisted content tooling** (via OpenAI + LangChain) to generate promo kits, posts, and microsites inside the same system.

---

### How it works (high level)

- **Frontend:** Static HTML/CSS/JS in `dashboard/` served via Vercel’s static hosting.
- **APIs:** Vercel serverless functions in `dashboard/api/*.mjs` handle health checks, leads, Stripe webhooks, AI generation, and Meta integration.
- **Payments:** Stripe Payment Link configured via `STRIPE_CHECKOUT_URL`, plus a webhook (`/api/stripe/webhook`) that upgrades leads → customers.
- **Automation:** A set of PowerShell/BAT scripts under `/scripts` and at the root are used to deploy, verify, and operate the system from the console.
- **Hosting & routing:** Root `vercel.json` routes `golocapo.com` into the `dashboard/` app and legacy assets.

---

### Target users & use cases

- **Solo founders** running pre‑launch funnels and wanting a single control panel.
- **Boutique agencies** who need reusable client microsites and promo tooling.
- **Technical operators** who prefer scripts + dashboards over ad‑hoc tools.

Example use cases:
- Launching a **€49 early‑access offer** with email capture → pricing → Stripe.
- Running **client campaigns** with dedicated microsites under `/clients/*`.
- Operating a **portfolio‑grade demo** for investors and partners.

---

### Why this is different

- **Console‑first:** Operations are driven by scripts (`REDEPLOY_LIVE.ps1`, `AUTO_DEPLOY.ps1`, `TEST_STRIPE_SETUP.ps1`, etc.) instead of clicking around dashboards.
- **End‑to‑end thinking:** The repo includes not just UI, but Stripe, email, Meta, telemetry, and operational checklists.
- **Static‑first:** The live marketing surface is static HTML + serverless APIs; no heavy framework or complex build pipeline required.
- **Transparency:** All deploy/health/Stripe checks are explicit scripts you can read and run.

---

### Repo structure (start here)

At a glance:

- `README.md` ← **You are here. High‑level pitch + orientation.**
- `dashboard/` ← Core live product (GoLoCapo dashboard, APIs, portfolio pages, client microsites).
- `docs/` ← High‑level docs: start‑here, what’s live, architecture.
- `one-pager/` ← Investor / partner one‑pager (`ONE_PAGER.md`).
- `deck/` ← Pitch deck placeholders & structure.
- `assets/` ← Place for logos, screenshots, diagrams.
- `scripts/` ← Centralized helper scripts (copies of key BAT/PS1 entrypoints).
- `portfolio/`, `landing-page/`, `chiara-desktop-app/`, `ai-agency/`, etc. ← Older experiments and supporting assets (treated as archive unless referenced).

For the **actual product**, focus on:

- `dashboard/index.html`, `dashboard/styles.css`, `dashboard/dashboard.js`
- `dashboard/api/*`
- `fordfofer-pitch/vercel.json` (root routing)
- `dashboard/README.md`, `dashboard/RUN_LOCAL.md`, `dashboard/PROJECT_RECAP.md`

---

### Run locally (≈2 minutes)

From the `dashboard/` folder:

```powershell
cd fordfofer-pitch/dashboard

# 1. Install dependencies
npm install

# 2. (Optional) Set env vars for local Stripe testing
$env:STRIPE_CHECKOUT_URL="https://buy.stripe.com/your-test-link"

# 3. Start Vercel dev (includes API routes)
npm run start

# 4. Open in browser
# http://localhost:3000
```

See `dashboard/RUN_LOCAL.md` for full details, troubleshooting, and additional env vars (OpenAI, Meta, Resend, etc.).

---

### What exists today

- Live domain: `https://www.golocapo.com/` (landing) and wired routing into `dashboard/`.  
- Core pages and APIs implemented under `dashboard/` (HTML + Vercel serverless).  
- Deployment, health‑check, and Stripe test scripts in `dashboard/` and `/scripts`.  
- Extensive internal docs capturing architecture, deployment, and launch plan.

### What unlocks on 21.12

- Public access to the full pre‑launch funnel and dashboard.  
- Finalized pricing and payment flow (Stripe).  
- Polished docs, screenshots, and deck for partners/investors.  
- Onboarding guidance for early collaborators/pilots.

---

### Roadmap (next 3–6 milestones)

Near‑term, realistic items:

1. **Stabilize production routes** – Ensure `/pricing`, `/prelaunch`, `/api/health`, and `/api/checkout-url` are 200 in production (`docs/WHAT_IS_LIVE.md` tracks status).  
2. **Unified admin “War Room”** – Finish `/war-room` to show live leads/customers/revenue and integration status.  
3. **Simplify scripts** – Consolidate core BAT/PS1 into `/scripts` with a single `START_HERE` entrypoint.  
4. **Client microsite templates** – Tighten `/clients/*` layouts & copy for 2–3 “portfolio‑grade” examples.  
5. **Better observability** – Add minimal logging/metrics (without exposing secrets) for deploys and Stripe events.  
6. **Polish docs & screenshots** – Fill `/deck`, `/assets`, and `/one-pager` with final pitch materials.

---

### The ask

This repo is meant as a **working pitch artifact**, not just slides.

We are looking for:

- **Feedback** on positioning, UX, and overall system design.  
- **Pilot collaborations** with a small number of founders or agencies who want a console‑first marketing system.  
- **Technical collaborators** who enjoy console + Vercel + AI tooling and want to help harden the product.

There are **no fabricated metrics or users** in this repo; everything is aspirational and in active development.

---

### Contact

Use these as placeholders until finalized:

- **Email:** `contact@golocapo.com` (placeholder)  
- **Owner / builder:** Golo Čapo (pseudonym)  
- **Repo:** `https://github.com/simonkohut-ai/fordfofer-pitch`  

If you’re reviewing this as an investor/partner and want a guided tour, start with `docs/START_HERE.md`, then open the live site at `https://www.golocapo.com/`.


