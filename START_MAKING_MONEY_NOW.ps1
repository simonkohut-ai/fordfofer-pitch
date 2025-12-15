# START MAKING MONEY NOW - Complete Setup
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "START MAKING MONEY - COMPLETE SETUP" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Step 1: Open all critical pages
Write-Host "STEP 1: Opening all critical pages..." -ForegroundColor Cyan
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2
Start-Process "https://ai-studio-sandy-five.vercel.app"
Start-Sleep -Seconds 2
Start-Process "https://p2ba-navy.vercel.app"
Start-Sleep -Seconds 2
Start-Process "https://whop.com"
Write-Host "All pages opened!" -ForegroundColor Green
Write-Host ""

# Step 2: Create revenue checklist file
Write-Host "STEP 2: Creating revenue checklist..." -ForegroundColor Cyan
$lines = @(
    "# REVENUE GENERATION CHECKLIST",
    "",
    "## DEPLOYMENT STATUS",
    "",
    "### Dashboard:",
    "- Root Directory = dashboard (in Vercel Settings)",
    "- OPENAI_API_KEY added to Environment Variables",
    "- Project redeployed",
    "- URL works: https://ai-studio-sandy-five.vercel.app",
    "- Password works: moneymachine25",
    "- AI Chat responds",
    "",
    "### Console:",
    "- OPENAI_API_KEY added to Environment Variables",
    "- Project redeployed",
    "- URL works: https://p2ba-navy.vercel.app",
    "- Commands execute",
    "",
    "---",
    "",
    "## REVENUE STREAMS SETUP",
    "",
    "### 1. Whop Store (Payment Processing)",
    "- Create product: AI Studio Dashboard Access",
    "- Price: Set your price (e.g., $29/month)",
    "- Add product description",
    "- Enable Stripe/Skrill payments",
    "- Share product link",
    "",
    "### 2. Dashboard Features (What You are Selling)",
    "- AI Chat - Working",
    "- Business Creation Tools",
    "- Marketing Automation",
    "- Revenue Tracking",
    "- Workflow Automation",
    "",
    "### 3. Marketing Channels",
    "- Reddit posts (use auto-reddit-poster.js)",
    "- Telegram groups (use auto-telegram-messenger.js)",
    "- Social media posts",
    "- Email campaigns",
    "",
    "---",
    "",
    "## QUICK START TO MAKE MONEY",
    "",
    "### TODAY:",
    "1. Fix Dashboard Root Directory in Vercel",
    "2. Test both URLs work",
    "3. Create Whop product",
    "4. Share your URLs",
    "",
    "### THIS WEEK:",
    "1. Post on Reddit about your AI tools",
    "2. Join Telegram groups and share",
    "3. Create content showcasing features",
    "4. Get first paying customers",
    "",
    "### THIS MONTH:",
    "1. Optimize based on feedback",
    "2. Add more features",
    "3. Scale marketing",
    "4. Increase revenue",
    "",
    "---",
    "",
    "## YOUR ASSETS",
    "",
    "URLs:",
    "- Dashboard: https://ai-studio-sandy-five.vercel.app",
    "- Console: https://p2ba-navy.vercel.app",
    "",
    "Payment Methods:",
    "- Stripe (via Whop)",
    "- Skrill",
    "- PayPal",
    "",
    "Marketing Tools:",
    "- Reddit auto-poster",
    "- Telegram messenger",
    "- Email campaigns",
    "",
    "---",
    "",
    "## REVENUE GOALS",
    "",
    "- Week 1: First customer",
    "- Week 2: 5 customers",
    "- Month 1: 20 customers @ $29/month = $580/month",
    "- Month 3: 50 customers @ $29/month = $1,450/month",
    "",
    "---",
    "",
    "START NOW: Fix Dashboard → Create Whop Product → Share URLs!"
)

$lines | Out-File -FilePath "REVENUE_CHECKLIST.md" -Encoding UTF8
Write-Host "Revenue checklist created: REVENUE_CHECKLIST.md" -ForegroundColor Green
Write-Host ""

# Step 3: Create quick action script
Write-Host "STEP 3: Creating quick action scripts..." -ForegroundColor Cyan
$batContent = @(
    "@echo off",
    "title QUICK ACTIONS",
    "echo.",
    "echo Opening Whop to create product...",
    "start https://whop.com/products/new",
    "timeout /t 2 >nul",
    "echo Opening Dashboard to test...",
    "start https://ai-studio-sandy-five.vercel.app",
    "timeout /t 2 >nul",
    "echo Opening Console to test...",
    "start https://p2ba-navy.vercel.app",
    "echo.",
    "echo All pages opened!",
    "echo.",
    "echo NEXT STEPS:",
    "echo   1. Create product in Whop",
    "echo   2. Set price (e.g., $29/month)",
    "echo   3. Add product description",
    "echo   4. Share your URLs",
    "echo.",
    "pause"
)

$batContent | Out-File -FilePath "QUICK_ACTIONS.bat" -Encoding ASCII
Write-Host "Quick actions script created: QUICK_ACTIONS.bat" -ForegroundColor Green
Write-Host ""

# Step 4: Summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "WHAT TO DO NOW:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. FIX DASHBOARD (Critical):" -ForegroundColor White
Write-Host "   - Vercel Dashboard → ai-studio → Settings → General" -ForegroundColor Cyan
Write-Host "   - Set Root Directory = dashboard" -ForegroundColor Cyan
Write-Host "   - Redeploy" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. CREATE WHOP PRODUCT:" -ForegroundColor White
Write-Host "   - Whop page is open" -ForegroundColor Cyan
Write-Host "   - Create product: AI Studio Dashboard" -ForegroundColor Cyan
Write-Host "   - Set price: $29/month (or your choice)" -ForegroundColor Cyan
Write-Host "   - Enable payments" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. TEST YOUR URLS:" -ForegroundColor White
Write-Host "   - Dashboard: https://ai-studio-sandy-five.vercel.app" -ForegroundColor Cyan
Write-Host "   - Console: https://p2ba-navy.vercel.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. START MARKETING:" -ForegroundColor White
Write-Host "   - Post on Reddit" -ForegroundColor Cyan
Write-Host "   - Share on Telegram" -ForegroundColor Cyan
Write-Host "   - Create content" -ForegroundColor Cyan
Write-Host ""

Write-Host "REVENUE POTENTIAL:" -ForegroundColor Yellow
Write-Host "   - 10 customers @ $29/month = $290/month" -ForegroundColor Green
Write-Host "   - 50 customers @ $29/month = $1,450/month" -ForegroundColor Green
Write-Host "   - 100 customers @ $29/month = $2,900/month" -ForegroundColor Green
Write-Host ""

Write-Host "Files created:" -ForegroundColor Yellow
Write-Host "   - REVENUE_CHECKLIST.md (complete guide)" -ForegroundColor Cyan
Write-Host "   - QUICK_ACTIONS.bat (quick launcher)" -ForegroundColor Cyan
Write-Host ""

Write-Host "READY TO MAKE MONEY!" -ForegroundColor Green
Write-Host ""
Write-Host "Opening revenue checklist..."
Start-Sleep -Seconds 2
Start-Process "REVENUE_CHECKLIST.md"
