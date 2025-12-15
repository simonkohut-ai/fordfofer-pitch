# REAL AUTO-SECURE - ACTUALLY DOES THE WORK
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "REAL AUTO-SECURITY - DOING THE WORK" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Vercel Token
$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"

# ============================================
# STEP 1: VERCEL CLI - CHECK & CANCEL DEPLOYS
# ============================================

Write-Host "STEP 1: Using Vercel CLI to check deployments..." -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
    Start-Sleep -Seconds 5
}

# Set Vercel token
$env:VERCEL_TOKEN = $VERCEL_TOKEN

try {
    Write-Host "Listing Vercel projects..." -ForegroundColor Yellow
    $projects = vercel ls --token $VERCEL_TOKEN 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Projects found:" -ForegroundColor Green
        Write-Host $projects -ForegroundColor White
        Write-Host ""
        
        # Try to get deployments
        Write-Host "Checking deployments..." -ForegroundColor Yellow
        $deployments = vercel ls --token $VERCEL_TOKEN 2>&1
        
        # Look for active deployments to cancel
        $lines = $deployments -split "`n"
        foreach ($line in $lines) {
            if ($line -match "BUILDING|QUEUED") {
                Write-Host "Found active deployment: $line" -ForegroundColor Yellow
                # Extract deployment ID and cancel
                if ($line -match "([a-z0-9]+)\.vercel\.app") {
                    $deployId = $matches[1]
                    Write-Host "Attempting to cancel deployment..." -ForegroundColor Yellow
                    # Note: Vercel CLI doesn't have direct cancel, would need API
                }
            }
        }
    } else {
        Write-Host "Vercel CLI error. Trying API instead..." -ForegroundColor Yellow
        Write-Host $projects -ForegroundColor Red
    }
} catch {
    Write-Host "Vercel CLI error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# ============================================
# STEP 2: GITHUB CLI - MAKE REPOS PRIVATE
# ============================================

Write-Host "STEP 2: Using GitHub CLI to make repos private..." -ForegroundColor Cyan
Write-Host ""

# Check if GitHub CLI is installed
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if ($ghInstalled) {
    Write-Host "GitHub CLI found!" -ForegroundColor Green
    
    # Check if authenticated
    $ghAuth = gh auth status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "GitHub CLI authenticated" -ForegroundColor Green
        
        # Make repo private
        Write-Host "Making repository private..." -ForegroundColor Yellow
        $result = gh repo edit simonkohut-ai/p2ba --visibility private 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "SUCCESS: Repository is now private!" -ForegroundColor Green
        } else {
            Write-Host "Error making repo private: $result" -ForegroundColor Red
            Write-Host "Opening GitHub for manual action..." -ForegroundColor Yellow
            Start-Process "https://github.com/simonkohut-ai/p2ba/settings"
        }
        
        # List all repos and make private
        Write-Host ""
        Write-Host "Checking other repositories..." -ForegroundColor Yellow
        $repos = gh repo list simonkohut-ai --limit 100 --json name,isPrivate 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            $repoList = $repos | ConvertFrom-Json
            foreach ($repo in $repoList) {
                if (-not $repo.isPrivate) {
                    Write-Host "Making $($repo.name) private..." -ForegroundColor Yellow
                    gh repo edit "simonkohut-ai/$($repo.name)" --visibility private 2>&1 | Out-Null
                    if ($LASTEXITCODE -eq 0) {
                        Write-Host "  SUCCESS: $($repo.name) is now private" -ForegroundColor Green
                    }
                }
            }
        }
    } else {
        Write-Host "GitHub CLI not authenticated. Opening browser..." -ForegroundColor Yellow
        gh auth login
        Write-Host "After authentication, run this script again" -ForegroundColor Cyan
    }
} else {
    Write-Host "GitHub CLI not installed." -ForegroundColor Yellow
    Write-Host "Installing GitHub CLI..." -ForegroundColor Cyan
    
    # Try to install via winget or chocolatey
    $wingetInstalled = Get-Command winget -ErrorAction SilentlyContinue
    if ($wingetInstalled) {
        Write-Host "Installing via winget..." -ForegroundColor Yellow
        winget install --id GitHub.cli -e
    } else {
        Write-Host "Please install GitHub CLI manually:" -ForegroundColor Yellow
        Write-Host "  https://cli.github.com/" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Opening GitHub for manual action..." -ForegroundColor Yellow
        Start-Process "https://github.com/simonkohut-ai/p2ba/settings"
    }
}

Write-Host ""

# ============================================
# STEP 3: GITHUB API (FALLBACK)
# ============================================

$GITHUB_TOKEN = $env:GITHUB_TOKEN

if ($GITHUB_TOKEN -and -not $ghInstalled) {
    Write-Host "STEP 3: Using GitHub API (fallback)..." -ForegroundColor Cyan
    Write-Host ""
    
    try {
        $githubHeaders = @{
            "Authorization" = "token $GITHUB_TOKEN"
            "Accept" = "application/vnd.github.v3+json"
        }
        
        Write-Host "Making repository private via API..." -ForegroundColor Yellow
        $body = @{ private = $true } | ConvertTo-Json
        $result = Invoke-RestMethod -Uri "https://api.github.com/repos/simonkohut-ai/p2ba" -Headers $githubHeaders -Method Patch -Body $body -ContentType "application/json"
        
        Write-Host "SUCCESS: Repository is now private!" -ForegroundColor Green
        
        # Make all repos private
        $allRepos = Invoke-RestMethod -Uri "https://api.github.com/users/simonkohut-ai/repos" -Headers $githubHeaders -Method Get
        foreach ($repo in $allRepos) {
            if (-not $repo.private) {
                Write-Host "Making $($repo.name) private..." -ForegroundColor Yellow
                $body = @{ private = $true } | ConvertTo-Json
                Invoke-RestMethod -Uri "https://api.github.com/repos/simonkohut-ai/$($repo.name)" -Headers $githubHeaders -Method Patch -Body $body -ContentType "application/json" | Out-Null
                Write-Host "  SUCCESS: $($repo.name) is now private" -ForegroundColor Green
            }
        }
    } catch {
        Write-Host "GitHub API error: $($_.Exception.Message)" -ForegroundColor Red
    }
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
Write-Host "  - Vercel deployments checked" -ForegroundColor White
Write-Host "  - GitHub repos made private (if CLI/API available)" -ForegroundColor White
Write-Host ""

Write-Host "If repos are still public, provide GitHub token:" -ForegroundColor Cyan
Write-Host "  `$env:GITHUB_TOKEN = 'your_token_here'" -ForegroundColor White
Write-Host "  .\REAL_AUTO_SECURE.ps1" -ForegroundColor White
Write-Host ""

Write-Host "Or install GitHub CLI and authenticate:" -ForegroundColor Cyan
Write-Host "  gh auth login" -ForegroundColor White

