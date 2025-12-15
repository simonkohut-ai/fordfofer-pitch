# PREVIEW EVERYTHING - See What You Have
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "PREVIEW EVERYTHING - SEE WHAT YOU HAVE" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Step 1: Open all your deployed URLs
Write-Host "STEP 1: Opening all your deployed sites..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening Dashboard..." -ForegroundColor Yellow
Start-Process "https://ai-studio-sandy-five.vercel.app"
Start-Sleep -Seconds 2

Write-Host "Opening Console..." -ForegroundColor Yellow
Start-Process "https://p2ba-navy.vercel.app"
Start-Sleep -Seconds 2

Write-Host "Opening Vercel Dashboard..." -ForegroundColor Yellow
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2

Write-Host "Opening Whop..." -ForegroundColor Yellow
Start-Process "https://whop.com"
Start-Sleep -Seconds 2

Write-Host "All pages opened!" -ForegroundColor Green
Write-Host ""

# Step 2: Create preview guide
Write-Host "STEP 2: Creating preview guide..." -ForegroundColor Cyan
Write-Host ""

$guideLines = @(
    "# PREVIEW GUIDE - What You Have",
    "",
    "## YOUR DEPLOYED SITES",
    "",
    "### 1. Dashboard",
    "URL: https://ai-studio-sandy-five.vercel.app",
    "",
    "What it shows:",
    "- If Root Directory is fixed: Password prompt then Full dashboard",
    "- If not fixed: Landing page (Chiara's World)",
    "",
    "To test:",
    "1. Open the URL",
    "2. If password prompt appears: Enter moneymachine25",
    "3. You should see: Dashboard with sidebar, AI Chat, Revenue tracking",
    "",
    "If you see landing page instead:",
    "- Go to Vercel → ai-studio → Settings → General",
    "- Set Root Directory = dashboard",
    "- Redeploy",
    "",
    "---",
    "",
    "### 2. Console (P2BA)",
    "URL: https://p2ba-navy.vercel.app",
    "",
    "What it shows:",
    "- Chat interface for business creation",
    "- Command execution",
    "- Real-time processing",
    "",
    "To test:",
    "1. Open the URL",
    "2. Type: Create a test business",
    "3. Should process and respond",
    "",
    "---",
    "",
    "## WHAT YOU ARE SELLING",
    "",
    "### Dashboard Features:",
    "- AI Chat Assistant",
    "- Business Creation Tools",
    "- Marketing Automation",
    "- Revenue Tracking",
    "- Workflow Management",
    "",
    "### Console Features:",
    "- Prompt-to-Business Automation",
    "- AI-Powered Business Creation",
    "- Real-time Command Processing",
    "",
    "---",
    "",
    "## HOW TO MAKE MONEY",
    "",
    "### Step 1: Fix Dashboard (if needed)",
    "1. Vercel Dashboard → ai-studio → Settings → General",
    "2. Root Directory = dashboard",
    "3. Redeploy",
    "",
    "### Step 2: Create Whop Product",
    "1. Go to Whop",
    "2. Create product: AI Studio Dashboard Access",
    "3. Price: $29/month",
    "4. Description: List all features above",
    "5. Enable payments",
    "",
    "### Step 3: Share Your URLs",
    "1. Share Dashboard URL with potential customers",
    "2. Show them the features",
    "3. Direct them to Whop to purchase",
    "",
    "---",
    "",
    "## PREVIEW FOR CUSTOMERS",
    "",
    "Show them:",
    "1. Dashboard URL (let them see the interface)",
    "2. Console URL (show the power of automation)",
    "3. Explain the value: AI-powered business tools",
    "",
    "Sell them on:",
    "- Save time with AI automation",
    "- Create businesses instantly",
    "- Marketing tools included",
    "- Revenue tracking",
    "",
    "---",
    "",
    "## QUICK TEST CHECKLIST",
    "",
    "- Dashboard URL opens",
    "- Can see password prompt OR dashboard",
    "- Console URL opens",
    "- Can type commands",
    "- Both sites look professional",
    "",
    "---",
    "",
    "Your sites are LIVE! Preview them above and start selling!"
)

$guideLines | Out-File -FilePath "PREVIEW_GUIDE.md" -Encoding UTF8
Write-Host "Preview guide created: PREVIEW_GUIDE.md" -ForegroundColor Green
Write-Host ""

# Step 3: Summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "PREVIEW COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "YOUR DEPLOYED SITES:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Dashboard:" -ForegroundColor White
Write-Host "  URL: https://ai-studio-sandy-five.vercel.app" -ForegroundColor Cyan
Write-Host "  Check: Does password prompt appear?" -ForegroundColor Yellow
Write-Host ""
Write-Host "Console:" -ForegroundColor White
Write-Host "  URL: https://p2ba-navy.vercel.app" -ForegroundColor Cyan
Write-Host "  Check: Does chat interface appear?" -ForegroundColor Yellow
Write-Host ""

Write-Host "WHAT YOU SEE:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Dashboard:" -ForegroundColor White
Write-Host "  - If Root Directory fixed: Password prompt" -ForegroundColor Green
Write-Host "  - If not fixed: Landing page (Chiara's World)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Console:" -ForegroundColor White
Write-Host "  - Should show chat interface" -ForegroundColor Green
Write-Host "  - Can type commands" -ForegroundColor Green
Write-Host ""

Write-Host "TO FIX DASHBOARD:" -ForegroundColor Yellow
Write-Host "  Vercel → ai-studio → Settings → General → Root Directory = dashboard" -ForegroundColor Cyan
Write-Host ""

Write-Host "Files created:" -ForegroundColor Yellow
Write-Host "  - PREVIEW_GUIDE.md (complete preview guide)" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening preview guide..."
Start-Sleep -Seconds 2
Start-Process "PREVIEW_GUIDE.md"
