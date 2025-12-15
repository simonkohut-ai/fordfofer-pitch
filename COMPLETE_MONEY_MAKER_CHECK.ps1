# COMPLETE CHECK AND REPAIR FOR MONEY MAKING
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "COMPLETE MONEY MAKER CHECK & REPAIR" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# URLs
$DASHBOARD_URL = "https://ai-studio-sandy-five.vercel.app"
$CONSOLE_URL = "https://p2ba-navy.vercel.app"

Write-Host "STEP 1: Opening all URLs for visual check..." -ForegroundColor Cyan
Write-Host ""

Start-Process $DASHBOARD_URL
Start-Sleep -Seconds 1
Start-Process $CONSOLE_URL
Start-Sleep -Seconds 1
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 1
Start-Process "https://github.com/simonkohut-ai/p2ba"

Write-Host "All pages opened!" -ForegroundColor Green
Write-Host ""

Write-Host "STEP 2: Creating comprehensive check list..." -ForegroundColor Cyan
Write-Host ""

$checklist = @"
# COMPLETE MONEY MAKER CHECKLIST

## CURRENT DEPLOYMENTS

- Dashboard: $DASHBOARD_URL
- Console: $CONSOLE_URL

---

## CHECK 1: DEPLOYMENT CONTENT

### Dashboard Check:
- [ ] Opens correctly
- [ ] Shows password prompt (not old landing page)
- [ ] Password: moneymachine25 works
- [ ] After login: Shows dashboard with sidebar
- [ ] AI Chat section visible
- [ ] No 404 errors in browser console (F12)

### Console Check:
- [ ] Opens correctly
- [ ] Shows P2BA Console interface
- [ ] Not showing old website
- [ ] Can type commands
- [ ] No 404 errors in browser console (F12)

---

## CHECK 2: VERCEL SETTINGS

### ai-studio Project:
- [ ] Root Directory = `dashboard`
- [ ] OPENAI_API_KEY environment variable set
- [ ] Latest deployment is Ready
- [ ] No build errors in deployment logs

### p2ba Project:
- [ ] Root Directory set correctly (or empty if root)
- [ ] OPENAI_API_KEY environment variable set
- [ ] Latest deployment is Ready
- [ ] No build errors in deployment logs

---

## CHECK 3: GITHUB SECURITY

- [ ] Repository is private
- [ ] No API keys in code
- [ ] Latest code pushed to GitHub
- [ ] Correct branch deployed (main/master)

---

## CHECK 4: FUNCTIONALITY

### Dashboard:
- [ ] Password protection works
- [ ] AI Chat responds to messages
- [ ] No API errors in console
- [ ] All sections load correctly

### Console:
- [ ] Commands execute
- [ ] Responses appear
- [ ] No timeout errors
- [ ] Features work as expected

---

## FIXES NEEDED

### If Dashboard shows old website:
1. Go to Vercel → ai-studio → Settings → General
2. Set Root Directory = `dashboard`
3. Save and Redeploy
4. Wait 2 minutes
5. Clear browser cache (Ctrl+Shift+Delete)
6. Hard refresh (Ctrl+F5)

### If Console shows old website:
1. Go to Vercel → p2ba → Settings → General
2. Check Root Directory (should be `p2ba-console` or empty)
3. Save and Redeploy
4. Wait 2 minutes
5. Clear browser cache
6. Hard refresh

### If API not working:
1. Check OPENAI_API_KEY in Vercel Environment Variables
2. Make sure it's set for all environments
3. Redeploy after adding
4. Check browser console for errors

---

## REVENUE READINESS CHECK

- [ ] Both deployments working correctly
- [ ] No errors in browser console
- [ ] API keys configured
- [ ] GitHub repos private
- [ ] Ready to share URLs with customers

---

## NEXT STEPS FOR MONEY MAKING

1. Fix any deployment issues above
2. Test all functionality
3. Create Whop product (if not done)
4. Set pricing ($29/month suggested)
5. Start marketing:
   - Share Dashboard URL
   - Share Console URL
   - Post on Reddit, Telegram
   - Create marketing content

---

**Complete all checks and fix any issues!** 🚀
"@

$checklist | Out-File -FilePath "MONEY_MAKER_CHECKLIST.md" -Encoding UTF8

Write-Host "Checklist created: MONEY_MAKER_CHECKLIST.md" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "WHAT TO DO NOW:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. CHECK OPENED URLS:" -ForegroundColor White
Write-Host "   - What content is showing?" -ForegroundColor Cyan
Write-Host "   - Old website or correct content?" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. FIX ROOT DIRECTORY:" -ForegroundColor White
Write-Host "   - ai-studio: Should be 'dashboard'" -ForegroundColor Cyan
Write-Host "   - Check in Vercel Settings → General" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. REDEPLOY:" -ForegroundColor White
Write-Host "   - After fixing, redeploy" -ForegroundColor Cyan
Write-Host "   - Wait for deployment to complete" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. VERIFY:" -ForegroundColor White
Write-Host "   - Check URLs again" -ForegroundColor Cyan
Write-Host "   - Should show correct content" -ForegroundColor Cyan
Write-Host ""

Start-Process "MONEY_MAKER_CHECKLIST.md"
