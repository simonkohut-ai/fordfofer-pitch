# 🚀 P2BA Console Setup Guide

## Prerequisites

1. **Build P2BA Core first:**
   ```bash
   cd ../p2ba-core
   npm install
   npm run build
   ```

2. **Install Console dependencies:**
   ```bash
   cd ../p2ba-console
   npm install
   ```

## Development Setup

### Option 1: Direct Development (Recommended)

1. **Build p2ba-core:**
   ```bash
   cd fordfofer-pitch/p2ba-core
   npm install
   npm run build
   ```

2. **Start console:**
   ```bash
   cd fordfofer-pitch/p2ba-console
   npm install
   npm run dev
   ```

3. **Open:** http://localhost:3000

### Option 2: Monorepo Setup

If you want to use a monorepo structure:

1. Create `package.json` in root:
   ```json
   {
     "name": "p2ba-platform",
     "private": true,
     "workspaces": [
       "p2ba-core",
       "p2ba-console"
     ]
   }
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build core:
   ```bash
   cd p2ba-core && npm run build && cd ..
   ```

4. Run console:
   ```bash
   cd p2ba-console && npm run dev
   ```

## Vercel Deployment

### Step 1: Build P2BA Core

Before deploying, ensure p2ba-core is built:

```bash
cd p2ba-core
npm install
npm run build
```

### Step 2: Deploy Console

1. **Push to GitHub**
2. **Import to Vercel:**
   - Go to vercel.com
   - Import repository
   - Select `p2ba-console` directory
   - Set build command: `cd ../p2ba-core && npm install && npm run build && cd ../p2ba-console && npm install && npm run build`
   - Set output directory: `.next`

### Step 3: Environment Variables

Add to Vercel:
- `ANTHROPIC_API_KEY` (for Opus 4.5)
- `OPENAI_API_KEY` (optional)
- `EMAIL_HOST`, `EMAIL_USER`, `EMAIL_PASSWORD` (for email)

## Troubleshooting

### "P2BA Core not found" Error

**Solution:**
1. Ensure p2ba-core is built: `cd p2ba-core && npm run build`
2. Check that `dist/` folder exists in p2ba-core
3. Verify import path in API route

### Module Resolution Issues

**Solution:**
1. Use TypeScript path aliases
2. Or copy p2ba-core/dist to p2ba-console/lib
3. Or use npm workspaces

### Real-time Updates Not Working

**Solution:**
1. Check browser console for errors
2. Verify Server-Sent Events support
3. Check API route logs in Vercel

## Alternative: Standalone API

If module resolution is problematic, you can:

1. Create a standalone API server
2. Deploy it separately
3. Call it from the console via HTTP

---

**For questions, check the main README.md**

