# FIX OLD WEBSITE DEPLOYMENTS
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "FIXING OLD WEBSITE DEPLOYMENTS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Open URLs
$DASHBOARD_URL = "https://ai-studio-sandy-five.vercel.app"
$CONSOLE_URL = "https://p2ba-navy.vercel.app"

Write-Host "Opening deployed URLs..." -ForegroundColor Cyan
Start-Process $DASHBOARD_URL
Start-Sleep -Seconds 2
Start-Process $CONSOLE_URL
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/dashboard"

Write-Host ""
Write-Host "URLs opened! Check what's showing." -ForegroundColor Yellow
Write-Host ""

# Create fix guide
$guideContent = @"
# FIX OLD WEBSITE DEPLOYMENT ISSUES

## PROBLEM
Deployments showing old website content instead of current projects.

---

## ROOT CAUSES

### 1. Wrong Root Directory
- ai-studio: Root Directory might not be set to `dashboard`
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
3. Go to: Settings → General
4. Scroll to: Root Directory
5. Set to: `dashboard`
6. Click Save
7. Go to Deployments tab
8. Click ... on latest deployment → Redeploy

For p2ba:
- Root Directory should be: `p2ba-console` (if separate)
- Or leave empty if root of repo

---

### FIX 2: Deploy Latest Code

Option A: Trigger from GitHub
1. Make sure latest code is pushed to GitHub
2. Go to Vercel Dashboard → Project → Deployments
3. Click Redeploy on latest deployment

Option B: Deploy via CLI
cd "c:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch"
cd dashboard
vercel --prod

---

### FIX 3: Add Environment Variables

1. Go to: Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   - Name: OPENAI_API_KEY
   - Value: Your OpenAI API key
   - Environments: Production, Preview, Development
3. Click Save
4. Redeploy the project

---

## VERIFICATION

After fixes, check:

1. Dashboard URL: $DASHBOARD_URL
   - Should show password prompt
   - After login, should show AI Studio Dashboard
   - Not old landing page

2. Console URL: $CONSOLE_URL
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
"@

$guideContent | Out-File -FilePath "FIX_OLD_WEBSITE.md" -Encoding UTF8

Write-Host "Fix guide created: FIX_OLD_WEBSITE.md" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "QUICK FIX STEPS:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. CHECK WHAT'S SHOWING:" -ForegroundColor White
Write-Host "   - Dashboard: $DASHBOARD_URL" -ForegroundColor Cyan
Write-Host "   - Console: $CONSOLE_URL" -ForegroundColor Cyan
Write-Host "   - Is it old website or correct content?" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. FIX ROOT DIRECTORY (ai-studio):" -ForegroundColor White
Write-Host "   - Vercel Dashboard opened" -ForegroundColor Cyan
Write-Host "   - Click ai-studio project" -ForegroundColor Cyan
Write-Host "   - Settings → General" -ForegroundColor Cyan
Write-Host "   - Root Directory = dashboard" -ForegroundColor Cyan
Write-Host "   - Save and Redeploy" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. VERIFY:" -ForegroundColor White
Write-Host "   - Wait 1-2 minutes after redeploy" -ForegroundColor Cyan
Write-Host "   - Refresh URLs" -ForegroundColor Cyan
Write-Host "   - Should show correct content now" -ForegroundColor Cyan
Write-Host ""

Start-Process "FIX_OLD_WEBSITE.md"
