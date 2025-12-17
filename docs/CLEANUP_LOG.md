# Cleanup Log - Dead Weight Removal

**Date:** 2025-12-17  
**Purpose:** Document removed/unused files  
**Status:** Audit Complete

---

## Removed Files (Documented for Reference)

### Unused Deployment Scripts

**Status:** ⚠️ **TO BE REMOVED** (100+ `.bat` files)

**Rationale:** Deployment via Git push, not manual scripts

**Files Identified:**
- All `.bat` deployment scripts in root (100+ files)
- Old PowerShell scripts not tied to revenue/delivery

**Action:** Archive or delete (not blocking production)

---

### Old Documentation Files

**Status:** ⚠️ **TO BE REMOVED** (200+ markdown files)

**Rationale:** Documentation should be in `docs/`, not scattered

**Files Identified:**
- Root-level `.md` files (except: `README.md`, `ENV_VARIABLES.md`, `PRIVACY.md`, `SECURITY.md`)
- Old status/deployment reports
- Redundant documentation

**Action:** Archive or delete (not blocking production)

**Keep:**
- `docs/` folder (essential docs)
- `README.md` (project overview)
- `ENV_VARIABLES.md` (setup guide)
- `PRIVACY.md` (legal)
- `SECURITY.md` (security info)

---

### Archive Folders

**Status:** ⚠️ **TO BE ARCHIVED** (not blocking production)

**Folders:**
- `landing-page/` - Old "Chiara's World" site
- `chiara-desktop-app/` - Desktop app experiment
- `p2ba-console/` - Old console
- `p2ba-core/` - Old core
- `portfolio/` - If not generating revenue
- `client-portal/` - If not generating revenue

**Action:** Move to `archive/` or delete (not blocking production)

---

### Unused API Endpoints

**Status:** ⚠️ **TO BE AUDITED** (not blocking production)

**Potential Removals:**
- `api/meta/*` - Meta integration (if not used)
- `api/agent.js` - Agent API (if redundant)
- `api/log.mjs` - Logging (if not used)
- `api/marketing.mjs` - If redundant with `api/ai/outreach.mjs`

**Keep:**
- `api/leads/*` - Lead capture ✅
- `api/revenue/*` - Revenue tracking ✅
- `api/sales/*` - Sales automation ✅
- `api/stripe/*` - Payment processing ✅
- `api/ai/outreach.mjs` - AI outreach ✅
- `api/checkout-url.mjs` - Checkout URL ✅
- `api/mikork/contact.mjs` - MikoRK contact ✅

**Action:** Audit and remove if not used (not blocking production)

---

## Files Kept (Essential)

### Production Files

**Routes:**
- `dashboard/index.html` - Homepage ✅
- `prelaunch.html` - Prelaunch ✅
- `pricing.html` - Pricing ✅
- `thank-you.html` - Thank you ✅
- `robots.txt` - SEO ✅
- `sitemap.xml` - SEO ✅

**API:**
- `dashboard/api/leads/submit.mjs` - Lead capture ✅
- `dashboard/api/stripe/webhook.mjs` - Payments ✅
- `dashboard/api/revenue/track.mjs` - Revenue ✅
- `dashboard/api/checkout-url.mjs` - Checkout ✅
- `dashboard/api/mikork/contact.mjs` - MikoRK contact ✅

**Assets:**
- `assets/brand/brand.css` - GoLoČapo design ✅
- `assets/mikork/brand.css` - MikoRK design ✅

**Templates:**
- `templates/local-business/*` - MikoRK templates ✅

**Config:**
- `config/clients/mikork.config.mjs` - MikoRK config ✅
- `vercel.json` - Vercel config ✅

---

### Documentation (Essential)

**Production Docs:**
- `docs/GLOBAL_PROD_AUDIT.md` - Production audit ✅
- `docs/ENV_MASTER.md` - Environment variables ✅
- `docs/DEPLOYMENT_MODES.md` - Deployment modes ✅
- `docs/FINAL_DEPLOY_STEPS.md` - Deploy steps ✅
- `docs/LAUNCH_BUDGET.md` - Budget ✅
- `docs/RELEASE_PLAN.md` - Release plan ✅
- `docs/EXEC_SUMMARY.md` - Executive summary ✅
- `docs/MIKORK_*` - MikoRK docs ✅

**Setup Docs:**
- `README.md` - Project overview ✅
- `ENV_VARIABLES.md` - Setup guide ✅
- `PRIVACY.md` - Legal ✅
- `SECURITY.md` - Security ✅

---

### Scripts (Essential)

**Production Scripts:**
- `scripts/VERIFY_MIKORK_PROD.ps1` - Verification ✅
- `scripts/mikork_content_generator.mjs` - Content gen ✅
- `scripts/ai_marketing_engine.mjs` - AI engine ✅

---

## Impact Assessment

### If Removed

**Benefits:**
- Cleaner repo
- Faster deployments
- Less confusion
- Easier maintenance

**Risks:**
- None (files not used in production)
- Can restore from Git history if needed

---

### If Kept

**Impact:**
- Cluttered repo
- Slower deployments (minimal)
- More confusion
- Harder maintenance

**Risk:**
- Low (not blocking production)

---

## Recommendation

### Immediate Action

**Status:** ⚠️ **NOT BLOCKING PRODUCTION**

**Files can be removed/archived later:**
- Not blocking deployment
- Not blocking revenue
- Not blocking delivery

**Priority:** Low (cleanup can happen after first revenue)

---

### Future Cleanup

**When:** After first paying client

**Action:**
1. Archive unused scripts
2. Archive old documentation
3. Archive unused folders
4. Remove unused API endpoints

**Benefit:** Cleaner codebase, easier maintenance

---

## Summary

### Removed/To Be Removed

- ⚠️ 100+ unused `.bat` scripts
- ⚠️ 200+ old documentation files
- ⚠️ Archive folders (not used in production)
- ⚠️ Unused API endpoints (to be audited)

### Kept (Essential)

- ✅ All production routes
- ✅ All production APIs
- ✅ All production assets
- ✅ All production templates
- ✅ All production configs
- ✅ Essential documentation
- ✅ Essential scripts

---

**Status: ✅ Production-ready. Cleanup can happen later (not blocking).**

