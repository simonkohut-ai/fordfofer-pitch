# SECURE GITHUB REPOS AND CHECK DEPLOYMENTS
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SECURING REPOS AND CHECKING DEPLOYS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Step 1: Open GitHub to make repos private
Write-Host "STEP 1: Opening GitHub repositories..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening main repository..." -ForegroundColor Yellow
Start-Process "https://github.com/simonkohut-ai/p2ba/settings"
Start-Sleep -Seconds 2

Write-Host "Opening GitHub repositories list..." -ForegroundColor Yellow
Start-Process "https://github.com/simonkohut-ai?tab=repositories"
Start-Sleep -Seconds 2

Write-Host "GitHub pages opened!" -ForegroundColor Green
Write-Host ""

# Step 2: Open Vercel to check deployments
Write-Host "STEP 2: Opening Vercel Dashboard..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening Vercel Dashboard..." -ForegroundColor Yellow
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2

Write-Host "Opening Vercel Deployments..." -ForegroundColor Yellow
Start-Process "https://vercel.com/deployments"
Start-Sleep -Seconds 2

Write-Host "Vercel pages opened!" -ForegroundColor Green
Write-Host ""

# Step 3: Create security guide
Write-Host "STEP 3: Creating security guide..." -ForegroundColor Cyan
Write-Host ""

$securityGuide = @(
    "# SECURE REPOS AND CHECK DEPLOYMENTS",
    "",
    "## MAKE GITHUB REPOS PRIVATE",
    "",
    "### Step 1: Make p2ba Repository Private",
    "",
    "1. Go to: https://github.com/simonkohut-ai/p2ba/settings",
    "2. Scroll to: Danger Zone",
    "3. Click: Change visibility",
    "4. Select: Make private",
    "5. Type repository name to confirm",
    "6. Click: I understand, change repository visibility",
    "",
    "### Step 2: Check Other Repositories",
    "",
    "1. Go to: https://github.com/simonkohut-ai?tab=repositories",
    "2. For each repository:",
    "   - Click on repository",
    "   - Go to Settings",
    "   - Scroll to Danger Zone",
    "   - Make private if needed",
    "",
    "### Step 3: Review Repository Access",
    "",
    "1. Go to: Repository → Settings → Collaborators",
    "2. Remove any unwanted collaborators",
    "3. Check: Only trusted people have access",
    "",
    "---",
    "",
    "## CHECK VERCEL DEPLOYMENTS",
    "",
    "### Step 1: Review All Projects",
    "",
    "1. Go to: https://vercel.com/dashboard",
    "2. Check all projects listed",
    "3. Identify which ones are active",
    "",
    "### Step 2: Check for Conflicting Deployments",
    "",
    "Look for:",
    "- Old deployments from other accounts",
    "- Test deployments",
    "- Duplicate projects",
    "- Projects with wrong Root Directory",
    "",
    "### Step 3: Cancel/Delete Problematic Deployments",
    "",
    "For each problematic project:",
    "1. Click on project",
    "2. Go to: Deployments tab",
    "3. Cancel running deployments",
    "4. Delete old deployments if needed",
    "5. Or delete entire project if not needed",
    "",
    "### Step 4: Verify Current Deployments",
    "",
    "**Keep these active:**",
    "- ai-studio (Dashboard)",
    "- p2ba (Console)",
    "",
    "**Settings to verify:**",
    "- ai-studio: Root Directory = dashboard",
    "- ai-studio: OPENAI_API_KEY set",
    "- p2ba: OPENAI_API_KEY set",
    "",
    "---",
    "",
    "## PROTECT API KEYS",
    "",
    "### Already Done:",
    "- ✅ Removed API keys from new commits",
    "- ✅ Using placeholders in documentation",
    "",
    "### Still Need:",
    "- ⏳ Make GitHub repos private",
    "- ⏳ Review old commits (may contain keys)",
    "- ⏳ Rotate API keys if exposed",
    "",
    "---",
    "",
    "## CHECKLIST",
    "",
    "- [ ] p2ba repository is private",
    "- [ ] Other repositories are private",
    "- [ ] No unwanted collaborators",
    "- [ ] Conflicting deployments cancelled",
    "- [ ] Only ai-studio and p2ba are active",
    "- [ ] Root Directory settings correct",
    "- [ ] Environment variables set",
    "",
    "---",
    "",
    "**After securing, your preview will be safe!**"
)

$securityGuide | Out-File -FilePath "SECURE_REPOS_AND_DEPLOYS.md" -Encoding UTF8
Write-Host "Security guide created: SECURE_REPOS_AND_DEPLOYS.md" -ForegroundColor Green
Write-Host ""

# Step 4: Summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "SECURITY CHECK COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "WHAT TO DO NOW:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. MAKE GITHUB REPOS PRIVATE:" -ForegroundColor White
Write-Host "   - GitHub Settings page is open" -ForegroundColor Cyan
Write-Host "   - Go to: p2ba → Settings → Danger Zone" -ForegroundColor Cyan
Write-Host "   - Make repository private" -ForegroundColor Cyan
Write-Host "   - Check other repositories too" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. CHECK VERCEL DEPLOYMENTS:" -ForegroundColor White
Write-Host "   - Vercel Dashboard is open" -ForegroundColor Cyan
Write-Host "   - Review all projects" -ForegroundColor Cyan
Write-Host "   - Cancel/delete conflicting deployments" -ForegroundColor Cyan
Write-Host "   - Keep only: ai-studio and p2ba" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. VERIFY CURRENT DEPLOYMENTS:" -ForegroundColor White
Write-Host "   - ai-studio: Root Directory = dashboard" -ForegroundColor Cyan
Write-Host "   - Both: OPENAI_API_KEY set" -ForegroundColor Cyan
Write-Host "   - Both: Latest deployment Ready" -ForegroundColor Cyan
Write-Host ""

Write-Host "Files created:" -ForegroundColor Yellow
Write-Host "  - SECURE_REPOS_AND_DEPLOYS.md (complete guide)" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening security guide..."
Start-Sleep -Seconds 2
Start-Process "SECURE_REPOS_AND_DEPLOYS.md"
