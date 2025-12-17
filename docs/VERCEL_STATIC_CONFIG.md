# Vercel Static Site Configuration

## Problem
Vercel was trying to detect a framework and run a build, but this is a static HTML site with no build step.

## Solution
Configured `vercel.json` to explicitly treat this as a static site:

```json
{
  "buildCommand": "",
  "outputDirectory": ".",
  "framework": null,
  ...
}
```

## Files Changed
1. **`vercel.json`** - Added static site configuration
2. **`.vercelignore`** - Created to exclude non-essential files from deployment

## Vercel Dashboard Settings
Ensure these settings in Vercel Dashboard → Project Settings:

- **Framework Preset:** `Other`
- **Root Directory:** (empty or `.`)
- **Build Command:** (empty)
- **Output Directory:** (empty or `.`)
- **Install Command:** (empty)

## What Gets Deployed
Only static files needed for production:
- `index.html`
- `prelaunch.html`
- `thank-you.html`
- `pricing.html`
- `robots.txt`
- `sitemap.xml`
- `assets/` directory
- `dashboard/api/` (serverless functions)

## What Gets Ignored
- `dashboard/` (except API functions)
- `docs/`
- `scripts/`
- `templates/`
- `*.md` files
- `*.bat` files
- `*.ps1` files

## Deployment
Vercel will now:
1. Clone the repo
2. Serve static files directly (no build step)
3. Execute serverless functions from `dashboard/api/`

