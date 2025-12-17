# Cleanup Plan - Remove Everything Unnecessary

**Goal:** Clean, scalable, revenue-focused codebase  
**Rule:** If it doesn't drive revenue, SEO, or automation → remove it

---

## Files to Remove

### Phase 1: Deployment Scripts (73 files)

**Remove:** All `.bat` deployment scripts  
**Keep:** Only `VERIFY_PRELAUNCH.ps1` (route verification)

**Rationale:** Deployment should be via Git push, not manual scripts

---

### Phase 2: Old Documentation (200+ files)

**Remove:** All root-level `.md` files except:
- `README.md`
- `ENV_VARIABLES.md`
- `PRIVACY.md`
- `SECURITY.md`
- `LICENSE`

**Remove:** All `dashboard/*.md` files except:
- `README.md`
- Essential production docs

**Keep:** Only `docs/` folder (essential documentation)

**Rationale:** Documentation should be in `docs/`, not scattered everywhere

---

### Phase 3: Archive Folders

**Remove/Move:**
- `landing-page/` - Old "Chiara's World" site
- `chiara-desktop-app/` - Desktop app experiment
- `p2ba-console/` - Old console
- `p2ba-core/` - Old core
- `portfolio/` - If not generating revenue
- `client-portal/` - If not generating revenue

**Rationale:** Archive folders increase repo size, not used in production

---

### Phase 4: Unused API Endpoints

**Audit and Remove:**
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
- `api/n8n/webhook.mjs` - n8n integration ✅

---

### Phase 5: Unused Dependencies

**Remove from `package.json`:**
- `express` - Not needed (serverless)
- `axios` - Use native `fetch`
- `dotenv` - Vercel handles env vars

**Keep:**
- `resend` - Email sending ✅
- `@langchain/core` - AI features (if used)
- `@langchain/openai` - AI features (if used)
- `langchain` - AI features (if used)

---

## Production Files (Keep)

### Root Level
- `vercel.json` ✅
- `prelaunch.html` ✅
- `pricing.html` ✅
- `thank-you.html` ✅
- `robots.txt` ✅
- `sitemap.xml` ✅
- `README.md` ✅
- `ENV_VARIABLES.md` ✅
- `PRIVACY.md` ✅
- `SECURITY.md` ✅

### Dashboard
- `index.html` ✅
- `prelaunch.html` ✅
- `pricing.html` ✅
- `thank-you.html` ✅
- `revenue-dashboard.html` ✅
- `api/leads/*` ✅
- `api/revenue/*` ✅
- `api/sales/*` ✅
- `api/stripe/*` ✅
- `api/ai/outreach.mjs` ✅
- `api/checkout-url.mjs` ✅
- `api/n8n/webhook.mjs` ✅
- `api/utils/*` ✅
- `assets/brand/*` ✅
- `package.json` ✅

### Scripts
- `scripts/ai_marketing_engine.mjs` ✅
- `scripts/DAILY_OUTREACH.ps1` ✅
- `scripts/prompt_templates.md` ✅
- `VERIFY_PRELAUNCH.ps1` ✅

### Documentation
- `docs/` folder (essential docs only) ✅

---

## Execution Order

1. **Create archive folder** (safety)
2. **Move deployment scripts** to archive
3. **Move old documentation** to archive
4. **Audit API endpoints** (remove unused)
5. **Clean dependencies** (remove unused)
6. **Test production** (verify everything works)
7. **Delete archive** (if everything works)

---

## Safety Measures

**Before Cleanup:**
- Create archive folder
- Move files (don't delete immediately)
- Test production after each phase
- Keep Git history (can restore if needed)

**After Cleanup:**
- Verify all routes work
- Test API endpoints
- Check build size
- Monitor performance

---

## Expected Results

**Before:**
- ~500+ files
- ~500KB build size
- Cluttered repo

**After:**
- ~100 files
- < 300KB build size
- Clean, focused repo

---

**Remember:** Clean systems scale faster. Remove everything unnecessary.

