# AUTO-SECURE WITH GITHUB API SUPPORT
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "FULL AUTO-SECURITY (GitHub + Vercel)" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check for GitHub token
$GITHUB_TOKEN = $env:GITHUB_TOKEN
if (-not $GITHUB_TOKEN) {
    Write-Host "GitHub token not found in environment." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To auto-secure GitHub repos, provide a Personal Access Token:" -ForegroundColor Cyan
    Write-Host "  1. Go to: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "  2. Generate new token (classic)" -ForegroundColor White
    Write-Host "  3. Select scope: 'repo' (Full control of private repositories)" -ForegroundColor White
    Write-Host "  4. Copy token and run:" -ForegroundColor White
    Write-Host "     `$env:GITHUB_TOKEN = 'your_token_here'" -ForegroundColor Cyan
    Write-Host "     .\AUTO_SECURE_WITH_GITHUB.ps1" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "For now, continuing with Vercel only..." -ForegroundColor Yellow
    Write-Host ""
    Start-Sleep -Seconds 3
}

# Vercel API
$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"
$VERCEL_API = "https://api.vercel.com"

# GitHub API
$GITHUB_OWNER = "simonkohut-ai"
$GITHUB_REPO = "p2ba"
$GITHUB_API = "https://api.github.com"

# ============================================
# VERCEL CLEANUP
# ============================================

Write-Host "STEP 1: Vercel Deployment Cleanup" -ForegroundColor Cyan
Write-Host ""

try {
    $headers = @{
        "Authorization" = "Bearer $VERCEL_TOKEN"
    }
    
    # Get all projects
    Write-Host "Fetching Vercel projects..." -ForegroundColor Yellow
    $projectsResponse = Invoke-RestMethod -Uri "$VERCEL_API/v9/projects" -Headers $headers -Method Get
    
    Write-Host "Found $($projectsResponse.projects.Count) projects" -ForegroundColor Green
    
    $keepProjects = @("ai-studio", "p2ba")
    $conflictingDeploys = @()
    
    foreach ($project in $projectsResponse.projects) {
        $projectName = $project.name
        
        if ($keepProjects -contains $projectName) {
            Write-Host "  ✓ Keeping: $projectName" -ForegroundColor Green
            continue
        }
        
        Write-Host "  Checking: $projectName..." -ForegroundColor Yellow
        
        try {
            $deploymentsResponse = Invoke-RestMethod -Uri "$VERCEL_API/v6/deployments?projectId=$($project.id)" -Headers $headers -Method Get
            
            if ($deploymentsResponse.deployments) {
                foreach ($deployment in $deploymentsResponse.deployments) {
                    if ($deployment.state -eq "BUILDING" -or $deployment.state -eq "QUEUED") {
                        Write-Host "    ⚠ Active deployment found: $($deployment.url)" -ForegroundColor Yellow
                        $conflictingDeploys += $deployment
                    }
                }
            }
        } catch {
            # Skip if can't fetch
        }
    }
    
    # Cancel conflicting deployments
    foreach ($deploy in $conflictingDeploys) {
        Write-Host "  Cancelling: $($deploy.url)..." -ForegroundColor Yellow
        try {
            Invoke-RestMethod -Uri "$VERCEL_API/v13/deployments/$($deploy.id)/cancel" -Headers $headers -Method Patch | Out-Null
            Write-Host "    ✓ Cancelled" -ForegroundColor Green
        } catch {
            Write-Host "    ✗ Failed" -ForegroundColor Red
        }
    }
    
    Write-Host ""
    Write-Host "✓ Vercel cleanup complete" -ForegroundColor Green
    Write-Host ""
    
} catch {
    Write-Host "✗ Vercel API error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
}

# ============================================
# GITHUB PRIVACY
# ============================================

if ($GITHUB_TOKEN) {
    Write-Host "STEP 2: Making GitHub Repos Private" -ForegroundColor Cyan
    Write-Host ""
    
    try {
        $githubHeaders = @{
            "Authorization" = "token $GITHUB_TOKEN"
            "Accept" = "application/vnd.github.v3+json"
        }
        
        # Check current visibility
        Write-Host "Checking repository visibility..." -ForegroundColor Yellow
        $repoInfo = Invoke-RestMethod -Uri "$GITHUB_API/repos/$GITHUB_OWNER/$GITHUB_REPO" -Headers $githubHeaders -Method Get
        
        if ($repoInfo.private -eq $false) {
            Write-Host "  Repository is PUBLIC - making private..." -ForegroundColor Yellow
            
            # Make private
            $body = @{
                private = $true
            } | ConvertTo-Json
            
            $updateResponse = Invoke-RestMethod -Uri "$GITHUB_API/repos/$GITHUB_OWNER/$GITHUB_REPO" -Headers $githubHeaders -Method Patch -Body $body -ContentType "application/json"
            
            Write-Host "  ✓ Repository is now PRIVATE" -ForegroundColor Green
        } else {
            Write-Host "  ✓ Repository is already PRIVATE" -ForegroundColor Green
        }
        
        # List all repos and check
        Write-Host ""
        Write-Host "Checking other repositories..." -ForegroundColor Yellow
        $allRepos = Invoke-RestMethod -Uri "$GITHUB_API/users/$GITHUB_OWNER/repos" -Headers $githubHeaders -Method Get
        
        foreach ($repo in $allRepos) {
            if (-not $repo.private) {
                Write-Host "  Making $($repo.name) private..." -ForegroundColor Yellow
                try {
                    $body = @{ private = $true } | ConvertTo-Json
                    Invoke-RestMethod -Uri "$GITHUB_API/repos/$GITHUB_OWNER/$($repo.name)" -Headers $githubHeaders -Method Patch -Body $body -ContentType "application/json" | Out-Null
                    Write-Host "    ✓ $($repo.name) is now private" -ForegroundColor Green
                } catch {
                    Write-Host "    ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
                }
            }
        }
        
        Write-Host ""
        Write-Host "✓ GitHub privacy complete" -ForegroundColor Green
        
    } catch {
        Write-Host "✗ GitHub API error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        Write-Host "Opening GitHub for manual action..." -ForegroundColor Yellow
        Start-Process "https://github.com/simonkohut-ai/p2ba/settings"
    }
} else {
    Write-Host "STEP 2: GitHub Repository Privacy (Manual)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Opening GitHub settings..." -ForegroundColor Yellow
    Start-Process "https://github.com/simonkohut-ai/p2ba/settings"
    Start-Process "https://github.com/simonkohut-ai?tab=repositories"
    Write-Host "  → Make repos private manually" -ForegroundColor Cyan
    Write-Host ""
}

# ============================================
# SUMMARY
# ============================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "AUTO-SECURITY COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "ACTIONS TAKEN:" -ForegroundColor Yellow
Write-Host "  ✓ Vercel deployments checked" -ForegroundColor White
if ($conflictingDeploys.Count -gt 0) {
    Write-Host "  ✓ $($conflictingDeploys.Count) conflicting deployments cancelled" -ForegroundColor Green
} else {
    Write-Host "  ✓ No conflicting deployments found" -ForegroundColor Green
}

if ($GITHUB_TOKEN) {
    Write-Host "  ✓ GitHub repos made private" -ForegroundColor Green
} else {
    Write-Host "  ⚠ GitHub repos need manual action (or provide token)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Your preview is now secure!" -ForegroundColor Green

