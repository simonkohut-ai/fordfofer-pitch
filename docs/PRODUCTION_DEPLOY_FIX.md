# Production Deploy Fix - Summary

## DEPLOY_ROOT
**Canonical Root:** Repository root (`fordfofer-pitch/`)

**Reason:** Assets already at root level, static-first approach, Vercel serves from repo root by default.

## Files Created/Changed

### Created:
1. **`index.html`** (root) - Canonical homepage (copied from `dashboard/index.html`)
2. **`assets/deploy-version.txt`** - Deploy marker with timestamp and git SHA

### Changed:
1. **`vercel.json`** - Removed `/` rewrite (now serves `index.html` naturally), kept other rewrites

## File Structure (DEPLOY_ROOT)
```
fordfofer-pitch/
├── index.html              ✅ Canonical homepage
├── prelaunch.html          ✅ Prelaunch page
├── thank-you.html          ✅ Thank you page
├── robots.txt              ✅ Robots file
├── sitemap.xml             ✅ Sitemap
├── assets/
│   ├── brand/
│   │   └── brand.css       ✅ Global stylesheet
│   └── deploy-version.txt  ✅ Deploy marker
└── vercel.json             ✅ Routing configuration
```

## CSS Reference
All pages reference: `<link rel="stylesheet" href="/assets/brand/brand.css">`

Verified in:
- `index.html` ✅
- `prelaunch.html` ✅
- `thank-you.html` ✅

## Vercel Configuration

### Rewrites (vercel.json)
- `/prelaunch` → `/prelaunch.html`
- `/thank-you` → `/thank-you.html`
- `/pricing` → `/pricing.html`
- `/api/:path*` → `/dashboard/api/:path*`
- (Other routes as needed)

### Headers
- `/robots.txt` → `Content-Type: text/plain`
- `/sitemap.xml` → `Content-Type: application/xml`
- `/assets/:path*` → Cache headers

## Git Status
All files tracked and committed:
- `index.html` ✅
- `prelaunch.html` ✅
- `thank-you.html` ✅
- `assets/brand/brand.css` ✅
- `assets/deploy-version.txt` ✅

## Production Status

### Expected URLs (all should return 200):
- `https://www.golocapo.com/` ✅ (200 OK)
- `https://www.golocapo.com/prelaunch` ⚠️ (404 - needs Vercel config check)
- `https://www.golocapo.com/thank-you` ⚠️ (404 - needs Vercel config check)
- `https://www.golocapo.com/assets/brand/brand.css` ⚠️ (404 - needs Vercel config check)
- `https://www.golocapo.com/assets/deploy-version.txt` ⚠️ (404 - needs Vercel config check)
- `https://www.golocapo.com/robots.txt` ⚠️ (404 - needs Vercel config check)
- `https://www.golocapo.com/sitemap.xml` ✅ (200 OK)

## Next Steps (if 404s persist)

1. **Check Vercel Project Settings:**
   - Root Directory: Should be empty (repo root) or `.`
   - Framework Preset: `Other` (static site)
   - Build Command: (empty)
   - Output Directory: (empty or `.`)

2. **Verify Deployment:**
   - Check Vercel deployment logs
   - Confirm files are in build output
   - Check if `.vercelignore` is excluding files

3. **Force Redeploy:**
   - Trigger manual redeploy from Vercel dashboard
   - Clear Vercel cache if needed

## Commit
- Message: "Fix production landing deploy root + CSS"
- Branch: `main`
- SHA: `94dfc93`

