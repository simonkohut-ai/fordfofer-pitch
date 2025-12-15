# FIX OLD WEBSITE DEPLOYMENT ISSUES

## PROBLEM
Deployments showing old website content instead of current projects.

---

## ROOT CAUSES

### 1. Wrong Root Directory
- ai-studio: Root Directory might not be set to dashboard
- p2ba: Root Directory might not be set correctly
- Result: Vercel serves wrong files/folder

### 2. Old Code Deployed
- Deployment might be from old commit
- Latest code not pushed to GitHub
- Deployment not triggered from latest commit

### 3. Missing Environment Variables
- OPENAI_API_KEY not set
- Other required env vars missing
- Result: Features don't work

---

## FIXES

### FIX 1: Check Root Directory

1. Go to: https://vercel.com/dashboard
2. Click on ai-studio project
3. Go to: Settings â†’ General
4. Scroll to: Root Directory
5. Set to: dashboard
6. Click Save
7. Go to Deployments tab
8. Click ... on latest deployment â†’ Redeploy

For p2ba:
- Root Directory should be: p2ba-console (if separate)
- Or leave empty if root of repo

---

### FIX 2: Deploy Latest Code

Option A: Trigger from GitHub
1. Make sure latest code is pushed to GitHub
2. Go to Vercel Dashboard â†’ Project â†’ Deployments
3. Click Redeploy on latest deployment

Option B: Deploy via CLI
cd "c:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch"
cd dashboard
vercel --prod

---

### FIX 3: Add Environment Variables

1. Go to: Vercel Dashboard â†’ Project â†’ Settings â†’ Environment Variables
2. Add:
   - Name: OPENAI_API_KEY
   - Value: Your OpenAI API key
   - Environments: Production, Preview, Development
3. Click Save
4. Redeploy the project

---

## VERIFICATION

After fixes, check:

1. Dashboard URL: https://ai-studio-sandy-five.vercel.app
   - Should show password prompt
   - After login, should show AI Studio Dashboard
   - Not old landing page

2. Console URL: https://p2ba-navy.vercel.app
   - Should show P2BA Console interface
   - Not old website

3. Browser Console (F12):
   - No 404 errors
   - No build errors
   - API calls work

---

## IF STILL SHOWING OLD CONTENT

1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check deployment URL (not cached version)
4. Wait 1-2 minutes after redeploy
5. Check Vercel deployment logs for errors

---

All fixes applied? Test your URLs now!
