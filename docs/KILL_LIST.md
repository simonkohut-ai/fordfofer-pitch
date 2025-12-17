# Kill List – What Not to Build Before 21.12

**Purpose:** Protect focus. Every item here is a distraction until after launch.

---

## Features not to build

- [ ] User authentication / login system
- [ ] Admin dashboard UI (use console/scripts)
- [ ] Multi-tenant support
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] API documentation site
- [ ] Blog / content CMS
- [ ] Social media auto-posting (beyond what's already built)
- [ ] Email marketing automation beyond basic confirmation
- [ ] Payment plans / subscriptions (keep it one-time for now)
- [ ] Referral program
- [ ] Affiliate system
- [ ] White-label options
- [ ] Custom domain support for users
- [ ] Team collaboration features

**Rule:** If it doesn't directly help someone join `/prelaunch` or convert to first revenue, it's on this list.

---

## Tools not to add

- [ ] New frameworks (stick with static + serverless)
- [ ] Database migrations / ORMs
- [ ] Complex CI/CD pipelines (current setup is fine)
- [ ] Monitoring/observability beyond basic health checks
- [ ] Feature flags system
- [ ] A/B testing infrastructure
- [ ] Customer support ticketing system
- [ ] Chat widget / live chat
- [ ] Video hosting / streaming
- [ ] Third-party integrations beyond Stripe, Resend, OpenAI

**Rule:** Only add tools that solve an immediate, revenue-blocking problem.

---

## Pages not to touch

- [ ] `/dashboard` (internal, not public-facing)
- [ ] `/portfolio` (already done, leave it)
- [ ] `/clients/*` (client sites, leave them)
- [ ] `/api/*` (only fix bugs, don't add new endpoints unless revenue-critical)
- [ ] Any page that isn't `/prelaunch` or `/pricing`

**Rule:** `/prelaunch` is the single source of truth. Don't create competing entry points.

---

## Ideas to ignore until after launch

- [ ] "What if we added [feature]?"
- [ ] "Should we build [tool]?"
- [ ] "Maybe we should create [page]?"
- [ ] "Let's add [integration]?"

**Rule:** If it's not in `LAUNCH_PLAN_21_12.md` or `TRAFFIC_ENGINES.md`, it can wait.

---

## How to use this list

**Before starting any work, ask:**
1. Is this on the kill list? → **Stop.**
2. Does this drive people to `/prelaunch`? → If no, **Stop.**
3. Does this help get first revenue? → If no, **Stop.**
4. Can this wait until after 21.12? → If yes, **Stop.**

**After launch (21.12+):**
- Review this list
- Decide what actually matters
- Build only what drives revenue or reduces churn

---

## Exceptions (only if revenue-blocking)

**Only build something on this list if:**
- It's blocking a paying customer from completing payment
- It's required for legal/compliance (e.g., GDPR, refunds)
- It's a critical bug fix (not a feature)

**Even then:** Ask "Can we solve this with a simpler workaround?"

---

**Last updated:** [date]

**Remember:** Focus compounds. Distractions compound too. Choose focus.

