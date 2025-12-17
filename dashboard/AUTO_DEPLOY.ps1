# Auto-Deploy Script
# Automatically commits, pushes, and deploys to Vercel

param(
    [string]$Message = "Auto-deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')",
    [switch]$SkipTests = $false
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  AUTO-DEPLOY SCRIPT" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$ErrorActionPreference = "Stop"

try {
    # Step 1: Check git status
    Write-Host "Step 1: Checking git status..." -ForegroundColor Yellow
    $status = git status --short
    $hasChanges = $status.Count -gt 0
    
    if (-not $hasChanges) {
        Write-Host "  ✅ No changes to commit" -ForegroundColor Green
        Write-Host "  Skipping deployment..." -ForegroundColor Gray
        exit 0
    }
    
    Write-Host "  Found $($status.Count) changed files" -ForegroundColor Gray
    
    # Step 2: Add all changes
    Write-Host "`nStep 2: Adding changes..." -ForegroundColor Yellow
    git add .
    Write-Host "  ✅ Changes staged" -ForegroundColor Green
    
    # Step 3: Commit
    Write-Host "`nStep 3: Committing..." -ForegroundColor Yellow
    git commit -m $Message
    Write-Host "  ✅ Committed: $Message" -ForegroundColor Green
    
    # Step 4: Push to GitHub
    Write-Host "`nStep 4: Pushing to GitHub..." -ForegroundColor Yellow
    git push
    Write-Host "  ✅ Pushed to GitHub" -ForegroundColor Green
    
    # Step 5: Deploy to Vercel
    Write-Host "`nStep 5: Deploying to Vercel..." -ForegroundColor Yellow
    $deployOutput = vercel deploy --prod --yes 2>&1
    Write-Host "  ✅ Deployment triggered" -ForegroundColor Green
    
    # Step 6: Wait for deployment
    Write-Host "`nStep 6: Waiting for deployment (30 seconds)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 30
    
    # Step 7: Test endpoints (if not skipped)
    if (-not $SkipTests) {
        Write-Host "`nStep 7: Testing endpoints..." -ForegroundColor Yellow
        $baseUrl = "https://www.golocapo.com"
        
        $tests = @(
            @{Name="Homepage"; Url="$baseUrl/"},
            @{Name="Health API"; Url="$baseUrl/api/health"},
            @{Name="Checkout API"; Url="$baseUrl/api/checkout-url"}
        )
        
        foreach ($test in $tests) {
            try {
                $response = Invoke-WebRequest -Uri $test.Url -UseBasicParsing -TimeoutSec 5 -ErrorAction SilentlyContinue
                if ($response.StatusCode -eq 200) {
                    Write-Host "  ✅ $($test.Name): OK" -ForegroundColor Green
                } else {
                    Write-Host "  ⚠️  $($test.Name): Status $($response.StatusCode)" -ForegroundColor Yellow
                }
            } catch {
                Write-Host "  ⚠️  $($test.Name): Not ready yet" -ForegroundColor Yellow
            }
        }
    }
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "  ✅ DEPLOYMENT COMPLETE" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Cyan
    
} catch {
    Write-Host "`n❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

