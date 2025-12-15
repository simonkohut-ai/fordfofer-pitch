# COMPREHENSIVE DEPLOYMENT CHECK AND FIX
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "COMPLETE DEPLOYMENT CHECK & REPAIR" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Vercel API Token
$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"
$VERCEL_API = "https://api.vercel.com"

# Known URLs
$DASHBOARD_URL = "https://ai-studio-sandy-five.vercel.app"
$CONSOLE_URL = "https://p2ba-navy.vercel.app"

Write-Host "STEP 1: Opening deployed URLs to check content..." -ForegroundColor Cyan
Write-Host ""

Start-Process $DASHBOARD_URL
Start-Sleep -Seconds 2
Start-Process $CONSOLE_URL
Start-Sleep -Seconds 2
Start-Process "https://vercel.com/dashboard"

Write-Host "URLs opened - check what's showing!" -ForegroundColor Yellow
Write-Host ""

Write-Host "STEP 2: Checking Vercel API for deployment details..." -ForegroundColor Cyan
Write-Host ""

try {
    $headers = @{
        "Authorization" = "Bearer $VERCEL_TOKEN"
    }
    
    # Get all projects
    Write-Host "Fetching projects..." -ForegroundColor Yellow
    $projectsResponse = Invoke-RestMethod -Uri "$VERCEL_API/v9/projects" -Headers $headers -Method Get
    
    Write-Host "Found $($projectsResponse.projects.Count) projects" -ForegroundColor Green
    Write-Host ""
    
    # Check each project
    $issues = @()
    
    foreach ($project in $projectsResponse.projects) {
        $projectName = $project.name
        Write-Host "Checking: $projectName" -ForegroundColor Cyan
        
        try {
            # Get project details
            $projectDetails = Invoke-RestMethod -Uri "$VERCEL_API/v9/projects/$projectName" -Headers $headers -Method Get
            
            Write-Host "  Root Directory: $($projectDetails.rootDirectory)" -ForegroundColor White
            
            # Check latest deployment
            $deployments = Invoke-RestMethod -Uri "$VERCEL_API/v6/deployments?projectId=$($project.id)&limit=1" -Headers $headers -Method Get
            
            if ($deployments.deployments -and $deployments.deployments.Count -gt 0) {
                $latest = $deployments.deployments[0]
                Write-Host "  Latest Deployment:" -ForegroundColor White
                Write-Host "    ID: $($latest.id)" -ForegroundColor Gray
                Write-Host "    State: $($latest.state)" -ForegroundColor Gray
                Write-Host "    URL: $($latest.url)" -ForegroundColor Gray
                Write-Host "    Created: $($latest.createdAt)" -ForegroundColor Gray
                
                # Check if Root Directory is wrong
                if ($projectName -eq "ai-studio" -and $projectDetails.rootDirectory -ne "dashboard") {
                    $issues += [PSCustomObject]@{
                        Project = $projectName
                        Issue = "Wrong Root Directory"
                        Current = $projectDetails.rootDirectory
                        ShouldBe = "dashboard"
                        Fix = "Update Root Directory in Vercel Settings"
                    }
                    Write-Host "    ⚠ ISSUE: Root Directory should be 'dashboard'" -ForegroundColor Yellow
                }
                
                # Check environment variables
                try {
                    $envVars = Invoke-RestMethod -Uri "$VERCEL_API/v9/projects/$projectName/env" -Headers $headers -Method Get
                    $hasOpenAIKey = $envVars.envs | Where-Object { $_.key -eq "OPENAI_API_KEY" }
                    
                    if (-not $hasOpenAIKey) {
                        $issues += [PSCustomObject]@{
                            Project = $projectName
                            Issue = "Missing OPENAI_API_KEY"
                            Current = "Not set"
                            ShouldBe = "Set in Environment Variables"
                            Fix = "Add OPENAI_API_KEY in Vercel Settings"
                        }
                        Write-Host "    ⚠ ISSUE: OPENAI_API_KEY not set" -ForegroundColor Yellow
                    } else {
                        Write-Host "    ✓ OPENAI_API_KEY is set" -ForegroundColor Green
                    }
                } catch {
                    Write-Host "    ⚠ Could not check environment variables" -ForegroundColor Yellow
                }
            }
            
            Write-Host ""
            
        } catch {
            Write-Host "  ⚠ Could not fetch details: $($_.Exception.Message)" -ForegroundColor Yellow
            Write-Host ""
        }
    }
    
    # Summary of issues
    if ($issues.Count -gt 0) {
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host "ISSUES FOUND:" -ForegroundColor Yellow
        Write-Host "========================================" -ForegroundColor Yellow
        Write-Host ""
        
        foreach ($issue in $issues) {
            Write-Host "Project: $($issue.Project)" -ForegroundColor Cyan
            Write-Host "  Issue: $($issue.Issue)" -ForegroundColor Red
            Write-Host "  Current: $($issue.Current)" -ForegroundColor White
            Write-Host "  Should be: $($issue.ShouldBe)" -ForegroundColor White
            Write-Host "  Fix: $($issue.Fix)" -ForegroundColor Green
            Write-Host ""
        }
    } else {
        Write-Host "✓ No configuration issues found" -ForegroundColor Green
        Write-Host ""
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "This might be due to:" -ForegroundColor Yellow
    Write-Host "  - Invalid Vercel token" -ForegroundColor White
    Write-Host "  - Network issues" -ForegroundColor White
    Write-Host "  - API rate limits" -ForegroundColor White
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Green
Write-Host "STEP 3: Creating Fix Guide..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Create comprehensive fix guide
$fixGuide = @(
    "# 🔧 FIX OLD WEBSITE DEPLOYMENT ISSUES",
    "",
    "## ⚠️ PROBLEM",
    "",
    "Deployments are showing old website content instead of your current projects.",
    "",
    "---",
    "",
    "## 🔍 ROOT CAUSES",
    "",
    "### 1. Wrong Root Directory",
    "- **ai-studio**: Root Directory might not be set to `dashboard`",
    "- **p2ba**: Root Directory might not be set correctly",
    "- **Result**: Vercel serves wrong files/folder",
    "",
    "### 2. Old Code Deployed",
    "- Deployment might be from old commit",
    "- Latest code not pushed to GitHub",
    "- Deployment not triggered from latest commit",
    "",
    "### 3. Missing Environment Variables",
    "- OPENAI_API_KEY not set",
    "- Other required env vars missing",
    "- **Result**: Features don't work",
    "",
    "### 4. Wrong Project Configuration",
    "- Project pointing to wrong GitHub repo",
    "- Wrong branch selected",
    "- Build settings incorrect",
    "",
    "---",
    "",
    "## ✅ FIXES",
    "",
    "### **FIX 1: Check Root Directory**",
    "",
    "1. Go to: https://vercel.com/dashboard",
    "2. Click on **ai-studio** project",
    "3. Go to: **Settings → General**",
    "4. Scroll to: **Root Directory**",
    "5. Set to: `dashboard`",
    "6. Click **Save**",
    "7. Go to **Deployments** tab",
    "8. Click **...** on latest deployment → **Redeploy**",
    "",
    "**For p2ba:**",
    "- Root Directory should be: `p2ba-console` (if separate)",
    "- Or leave empty if root of repo",
    "",
    "---",
    "",
    "### **FIX 2: Deploy Latest Code**",
    "",
    "**Option A: Trigger from GitHub**",
    "1. Make sure latest code is pushed to GitHub",
    "2. Go to Vercel Dashboard → Project → Deployments",
    "3. Click **Redeploy** on latest deployment",
    "",
    "**Option B: Deploy via CLI**",
    "```powershell",
    "cd `"c:\Users\simik\Desktop\the most wanted!!!\fordfofer-pitch`"",
    "cd dashboard",
    "vercel --prod",
    "```",
    "",
    "---",
    "",
    "### **FIX 3: Add Environment Variables**",
    "",
    "1. Go to: Vercel Dashboard → Project → Settings → Environment Variables",
    "2. Add:",
    "   - **Name**: `OPENAI_API_KEY`",
    "   - **Value**: Your OpenAI API key",
    "   - **Environments**: ✅ Production, Preview, Development",
    "3. Click **Save**",
    "4. **Redeploy** the project",
    "",
    "---",
    "",
    "### **FIX 4: Verify Project Settings**",
    "",
    "1. Go to: Project → Settings → General",
    "2. Check:",
    "   - **Framework Preset**: Correct (Next.js, Other, etc.)",
    "   - **Build Command**: Correct (or auto-detected)",
    "   - **Output Directory**: Correct",
    "   - **Install Command**: Correct",
    "3. Check: **Git Repository**",
    "   - Correct repo connected?",
    "   - Correct branch? (usually `main` or `master`)",
    "",
    "---",
    "",
    "## 🚀 QUICK FIX SCRIPT",
    "",
    "**Run this to fix everything:**",
    "",
    "1. Open: https://vercel.com/dashboard",
    "2. For **ai-studio** project:",
    "   - Settings → Root Directory = `dashboard`",
    "   - Settings → Environment Variables → Add OPENAI_API_KEY",
    "   - Deployments → Redeploy",
    "",
    "3. For **p2ba** project:",
    "   - Settings → Environment Variables → Add OPENAI_API_KEY",
    "   - Deployments → Redeploy",
    "",
    "---",
    "",
    "## ✅ VERIFICATION",
    "",
    "After fixes, check:",
    "",
    "1. **Dashboard URL**: $DASHBOARD_URL",
    "   - Should show password prompt",
    "   - After login, should show AI Studio Dashboard",
    "   - Not old landing page",
    "",
    "2. **Console URL**: $CONSOLE_URL",
    "   - Should show P2BA Console interface",
    "   - Not old website",
    "",
    "3. **Browser Console (F12)**:",
    "   - No 404 errors",
    "   - No build errors",
    "   - API calls work",
    "",
    "---",
    "",
    "## 🎯 IF STILL SHOWING OLD CONTENT",
    "",
    "1. **Clear browser cache** (Ctrl+Shift+Delete)",
    "2. **Hard refresh** (Ctrl+F5)",
    "3. **Check deployment URL** (not cached version)",
    "4. **Wait 1-2 minutes** after redeploy",
    "5. **Check Vercel deployment logs** for errors",
    "",
    "---",
    "",
    "**All fixes applied? Test your URLs now!** 🚀"
)

$fixGuide | Out-File -FilePath "FIX_OLD_WEBSITE.md" -Encoding UTF8
Write-Host "Fix guide created: FIX_OLD_WEBSITE.md" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "CHECK COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "WHAT TO DO NOW:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. CHECK OPENED URLS:" -ForegroundColor White
Write-Host "   - Dashboard: $DASHBOARD_URL" -ForegroundColor Cyan
Write-Host "   - Console: $CONSOLE_URL" -ForegroundColor Cyan
Write-Host "   - What content is showing?" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. FIX ROOT DIRECTORY:" -ForegroundColor White
Write-Host "   - ai-studio: Should be 'dashboard'" -ForegroundColor Cyan
Write-Host "   - Check in Vercel Settings" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. REDEPLOY:" -ForegroundColor White
Write-Host "   - After fixing settings, redeploy" -ForegroundColor Cyan
Write-Host "   - Wait for deployment to complete" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. VERIFY:" -ForegroundColor White
Write-Host "   - Check URLs again" -ForegroundColor Cyan
Write-Host "   - Should show correct content" -ForegroundColor Cyan
Write-Host ""

Start-Process "FIX_OLD_WEBSITE.md"
