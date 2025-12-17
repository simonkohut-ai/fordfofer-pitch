# Asset Serving Rules - Vercel Output Directory Alignment

**Date:** 2025-12-17  
**Purpose:** Define where assets must live based on Vercel output directory  
**Status:** Production Ready

---

## Current Deployment Structure

### Vercel Configuration

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

**Key Points:**
- No `outputDirectory` specified → Root is `/`
- Entry point: `/dashboard/index.html` (via rewrite)
- Pages: `/prelaunch.html`, `/pricing.html`, `/thank-you.html` (root level)
- API routes: `/dashboard/api/:path*` (via rewrite)

---

## Asset Location Rules

### Rule 1: Deploy Root is `/` (No Output Directory)

**When:** No `outputDirectory` in vercel.json or Vercel project settings

**Asset Location:**
- ✅ **Root level:** `/assets/brand/brand.css`
- ✅ **OR public directory:** `/public/assets/brand/brand.css` (served as `/assets/brand/brand.css`)

**HTML References:**
- Use absolute paths: `/assets/brand/brand.css`
- Works from any page location

**Current Setup:**
- Assets at: `/assets/brand/brand.css` (root level) ✅
- HTML references: `/assets/brand/brand.css` ✅
- Status: **CORRECT**

---

### Rule 2: Output Directory is `dashboard`

**When:** `outputDirectory: "dashboard"` in vercel.json or Vercel project settings

**Asset Location:**
- ✅ **Inside output directory:** `/dashboard/assets/brand/brand.css`
- ❌ **NOT at root:** `/assets/brand/brand.css` (won't be served)

**HTML References:**
- Use absolute paths: `/assets/brand/brand.css`
- Vercel serves from output directory root

**If This Was The Case:**
- Assets should be at: `/dashboard/assets/brand/brand.css`
- HTML references: `/assets/brand/brand.css` (absolute from output root)
- Status: **NOT CURRENT SETUP**

---

### Rule 3: Output Directory is `public`

**When:** `outputDirectory: "public"` in vercel.json or Vercel project settings

**Asset Location:**
- ✅ **Inside public:** `/public/assets/brand/brand.css`
- Served as: `/assets/brand/brand.css`

**HTML References:**
- Use absolute paths: `/assets/brand/brand.css`
- Works from any page location

**If This Was The Case:**
- Assets should be at: `/public/assets/brand/brand.css`
- HTML references: `/assets/brand/brand.css`
- Status: **NOT CURRENT SETUP**

---

## Current Setup (Verified)

### Asset Locations

**Root Level (Primary):**
- `/assets/brand/brand.css` ✅
- `/assets/brand/logo.svg` ✅
- `/assets/brand/favicon-*.png` ✅
- `/assets/mikork/brand.css` ✅

**Public Directory (Backup):**
- `/public/assets/brand/brand.css` ✅ (also exists, serves as backup)

**Status:** Assets exist in both locations for redundancy

---

### HTML References

**All HTML files use absolute paths:**
- `/assets/brand/brand.css` ✅
- `/assets/mikork/brand.css` ✅

**Files Verified:**
- `dashboard/index.html` → `/assets/brand/brand.css` ✅
- `prelaunch.html` → `/assets/brand/brand.css` ✅
- `pricing.html` → `/assets/brand/brand.css` ✅
- `thank-you.html` → `/assets/brand/brand.css` ✅
- `templates/local-business/index.html` → `/assets/mikork/brand.css` ✅

---

## Vercel Static File Serving

### How Vercel Serves Files

**Default Behavior:**
1. Files in root are served from `/`
2. Files in `/public/` are also served from `/` (public is special)
3. `vercel.json` rewrites take precedence
4. Static assets need explicit configuration OR correct location

**Best Practice:**
- Put assets at root level `/assets/` when deploy root is `/`
- Use `/public/assets/` as backup (served the same way)
- Always use absolute paths in HTML

---

### Static Asset Headers

**Current Configuration:**
```json
{
  "headers": [
    {
      "source": "/assets/:path*",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

**Purpose:**
- Ensures assets are served correctly
- Adds cache-control headers for performance
- Explicit configuration prevents issues

---

## Detection Logic

### How to Determine Asset Location

**Step 1: Check vercel.json**
```bash
cat vercel.json | grep -i "outputDirectory"
```

**If found:**
- Use that directory as asset root
- Example: `outputDirectory: "dashboard"` → Assets in `/dashboard/assets/`

**If not found:**
- Deploy root is `/`
- Assets should be at `/assets/` (root level)

---

**Step 2: Check Vercel Project Settings**

**In Vercel Dashboard:**
1. Go to Project → Settings → General
2. Check "Root Directory" setting
3. If set, use that as asset root
4. If not set, root is `/`

---

**Step 3: Check Entry Point**

**Look at vercel.json rewrites:**
- If `/` rewrites to `/dashboard/index.html` → Entry point is dashboard
- But deploy root might still be `/` (check outputDirectory)

**Rule:**
- Entry point ≠ Output directory
- Check `outputDirectory` explicitly

---

## Troubleshooting

### Issue: CSS Not Loading

**Check 1: Asset Location**
```bash
# Verify asset exists
ls assets/brand/brand.css

# Or if outputDirectory is dashboard
ls dashboard/assets/brand/brand.css
```

**Check 2: HTML References**
```bash
# Verify absolute paths
grep -r "href.*brand.css" *.html

# Should show: /assets/brand/brand.css
# NOT: ../assets/brand/brand.css
# NOT: assets/brand/brand.css (relative)
```

**Check 3: Vercel Configuration**
```bash
# Check vercel.json
cat vercel.json

# Verify no conflicting rewrites blocking /assets/
```

**Check 4: Production URL**
```bash
# Test asset accessibility
curl -I https://www.golocapo.com/assets/brand/brand.css

# Expected: 200 OK
# Expected: Content-Type: text/css
```

---

### Fix: Move Assets to Correct Location

**If deploy root is `/`:**
```bash
# Ensure assets at root
mkdir -p assets/brand
cp brand.css assets/brand/brand.css
```

**If outputDirectory is `dashboard`:**
```bash
# Move assets to dashboard
mkdir -p dashboard/assets/brand
cp brand.css dashboard/assets/brand/brand.css
```

**If outputDirectory is `public`:**
```bash
# Move assets to public
mkdir -p public/assets/brand
cp brand.css public/assets/brand/brand.css
```

---

## Best Practices

### 1. Always Use Absolute Paths

**✅ Good:**
```html
<link rel="stylesheet" href="/assets/brand/brand.css">
```

**❌ Bad:**
```html
<link rel="stylesheet" href="../assets/brand/brand.css">
<link rel="stylesheet" href="assets/brand/brand.css">
```

---

### 2. Verify Asset Location Matches Output Directory

**Before Deploying:**
- Check `outputDirectory` in vercel.json or Vercel settings
- Ensure assets are in correct location
- Verify HTML references use absolute paths

---

### 3. Test After Deployment

**After Deploying:**
- Run verification script: `.\scripts\VERIFY_GOL_CAPO_PROD.ps1`
- Check CSS loads: `curl -I https://www.golocapo.com/assets/brand/brand.css`
- Visual verification in browser
- Check browser DevTools Network tab

---

### 4. Document Asset Location

**In Documentation:**
- Document where assets are located
- Document why (outputDirectory setting)
- Document how to change if needed

---

## Summary

### Current Setup (Verified)

**Deploy Root:** `/` (no outputDirectory specified)  
**Asset Location:** `/assets/brand/brand.css` (root level)  
**HTML References:** `/assets/brand/brand.css` (absolute paths)  
**Status:** ✅ **CORRECT**

---

### Rules by Output Directory

| Output Directory | Asset Location | HTML Reference | Status |
|-----------------|----------------|----------------|--------|
| `/` (none) | `/assets/brand/brand.css` | `/assets/brand/brand.css` | ✅ Current |
| `dashboard` | `/dashboard/assets/brand/brand.css` | `/assets/brand/brand.css` | ⚠️ Not current |
| `public` | `/public/assets/brand/brand.css` | `/assets/brand/brand.css` | ⚠️ Not current |

---

### Key Takeaways

1. **Check outputDirectory first** - Determines asset location
2. **Use absolute paths** - Works regardless of page location
3. **Verify after deployment** - Always test CSS loading
4. **Document location** - Helps future maintenance

---

**This document ensures assets are always in the correct location based on Vercel output directory.**

**Current setup is correct: assets at root `/assets/`, HTML references absolute paths `/assets/`.**

