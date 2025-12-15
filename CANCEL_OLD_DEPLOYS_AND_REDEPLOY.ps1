# CANCEL OLD DEPLOYS AND REDEPLOY EVERYTHING
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "CANCEL OLD DEPLOYS AND REDEPLOY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Step 1: Open Vercel Dashboard to cancel old deployments
Write-Host "STEP 1: Opening Vercel Dashboard..." -ForegroundColor Cyan
Write-Host ""
Write-Host "You need to:" -ForegroundColor Yellow
Write-Host "1. Go through each project" -ForegroundColor White
Write-Host "2. Cancel any old/running deployments" -ForegroundColor White
Write-Host "3. Delete projects from other accounts if needed" -ForegroundColor White
Write-Host ""

Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2

# Step 2: Open account settings to check accounts
Write-Host "STEP 2: Opening account settings..." -ForegroundColor Cyan
Start-Process "https://vercel.com/account"
Start-Sleep -Seconds 2

# Step 3: Create guide for canceling deployments
Write-Host "STEP 3: Creating cancellation guide..." -ForegroundColor Cyan
Write-Host ""

$cancelGuide = @(
    "# CANCEL OLD DEPLOYS - Complete Guide",
    "",
    "## HOW TO CANCEL OLD DEPLOYMENTS",
    "",
    "### Method 1: Cancel in Vercel Dashboard",
    "",
    "1. Go to: https://vercel.com/dashboard",
    "2. Click on each project",
    "3. Go to: Deployments tab",
    "4. Find running/old deployments",
    "5. Click: ... (three dots)",
    "6. Click: Cancel (if running) or Delete (if old)",
    "",
    "### Method 2: Switch Accounts",
    "",
    "1. Click your profile (top right)",
    "2. Check: Which account you're in",
    "3. Switch to other accounts if needed",
    "4. Cancel deployments in each account",
    "",
    "### Method 3: Delete Projects",
    "",
    "1. Go to project",
    "2. Settings → General",
    "3. Scroll to bottom",
    "4. Click: Delete Project",
    "5. Confirm deletion",
    "",
    "---",
    "",
    "## AFTER CANCELLING OLD DEPLOYS",
    "",
    "### Redeploy Dashboard:",
    "1. Create new project OR use existing ai-studio",
    "2. Import: simonkohut-ai/p2ba",
    "3. Root Directory = dashboard",
    "4. Deploy",
    "",
    "### Redeploy Console:",
    "1. Create new project OR use existing p2ba",
    "2. Import: simonkohut-ai/p2ba",
    "3. Root Directory = p2ba-console",
    "4. Deploy",
    "",
    "---",
    "",
    "## CURRENT PROJECTS TO CHECK",
    "",
    "- ai-studio (Dashboard)",
    "- p2ba (Console)",
    "",
    "Check these in Vercel Dashboard and cancel any old deployments!"
)

$cancelGuide | Out-File -FilePath "CANCEL_OLD_DEPLOYS.md" -Encoding UTF8
Write-Host "Cancellation guide created: CANCEL_OLD_DEPLOYS.md" -ForegroundColor Green
Write-Host ""

# Step 4: Summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "INSTRUCTIONS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "TO CANCEL OLD DEPLOYMENTS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Vercel Dashboard is open" -ForegroundColor White
Write-Host "2. Go through each project:" -ForegroundColor White
Write-Host "   - ai-studio" -ForegroundColor Cyan
Write-Host "   - p2ba" -ForegroundColor Cyan
Write-Host "   - Any other projects" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. For each project:" -ForegroundColor White
Write-Host "   - Go to Deployments tab" -ForegroundColor Cyan
Write-Host "   - Cancel running deployments" -ForegroundColor Cyan
Write-Host "   - Delete old deployments if needed" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Check other accounts:" -ForegroundColor White
Write-Host "   - Switch accounts (profile menu)" -ForegroundColor Cyan
Write-Host "   - Cancel deployments there too" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. After cancelling, redeploy:" -ForegroundColor White
Write-Host "   - Run: REDEPLOY_EVERYTHING.ps1" -ForegroundColor Cyan
Write-Host "   - Or redeploy manually in Vercel" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening cancellation guide..."
Start-Sleep -Seconds 2
Start-Process "CANCEL_OLD_DEPLOYS.md"
