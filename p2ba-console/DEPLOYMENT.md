# 🚀 P2BA Console - Deployment Guide

## Quick Deploy to Vercel

### Step 1: Prepare P2BA Core

```bash
cd fordfofer-pitch/p2ba-core
npm install
npm run build
```

This creates the `dist/` folder that the console needs.

### Step 2: Deploy Console

**Option A: Vercel CLI**

```bash
cd fordfofer-pitch/p2ba-console
npm install -g vercel
vercel
```

**Option B: Vercel Dashboard**

1. Push code to GitHub
2. Go to vercel.com
3. Import repository
4. Set root directory: `p2ba-console`
5. Set build command:
   ```bash
   cd ../p2ba-core && npm install && npm run build && cd ../p2ba-console && npm install && npm run build
   ```
6. Set output directory: `.next`
7. Add environment variables (see below)
8. Deploy

### Step 3: Environment Variables

Add these in Vercel dashboard:

```env
ANTHROPIC_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@chiarasworld.com
EMAIL_TEST_MODE=false
```

### Step 4: Verify Deployment

1. Visit your Vercel URL
2. Test with command: "Create a dropshipping store for eco-friendly fitness gear"
3. Watch real-time logs appear

---

## Troubleshooting

### Build Fails: "Cannot find module p2ba-core"

**Solution:**
- Ensure p2ba-core is built before console build
- Check build command includes p2ba-core build step
- Verify paths in API route

### Real-time Updates Not Working

**Solution:**
- Check Vercel function logs
- Verify Server-Sent Events are enabled
- Check browser console for errors

### Module Resolution Issues

**Solution:**
- Use absolute imports
- Or copy p2ba-core/dist to p2ba-console/lib
- Or use npm workspaces

---

## Production Checklist

- [ ] P2BA Core built (`npm run build` in p2ba-core)
- [ ] Environment variables set in Vercel
- [ ] API keys configured
- [ ] Test deployment successful
- [ ] Real-time logging working
- [ ] Error handling verified

---

**Ready to deploy! 🚀**

