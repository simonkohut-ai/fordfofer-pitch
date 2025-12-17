# Golo Čapo Documentation

## Production-Critical Files

**Core Pages:**
- `/index.html` - Homepage
- `/prelaunch.html` - Waitlist/early access page
- `/thank-you.html` - Post-signup confirmation

**Assets:**
- `/assets/brand/brand.css` - Brand design system
- `/assets/brand/motion.js` - Scroll animations
- `/assets/brand/logo.svg` - Logo wordmark

**Configuration:**
- `/vercel.json` - Vercel deployment config
- `/robots.txt` - SEO robots file
- `/sitemap.xml` - SEO sitemap

**API:**
- `/dashboard/api/` - Serverless API routes

## Internal Documentation

See `/docs/internal/` for internal development notes and architecture docs.

## Deployment

- **Production:** Auto-deploys from `main` branch via Vercel
- **Health Check:** Run `.\scripts\healthcheck.ps1` to verify all routes

## Brand System

Neo-Brutalism design system:
- Hot pink primary, purple secondary
- Bold borders, offset shadows
- Family-friendly, premium startup feel
