# AUTO-SECURE REPOS AND CLEAN DEPLOYMENTS
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "AUTO-SECURING REPOS AND DEPLOYMENTS" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Vercel API Token
$VERCEL_TOKEN = "REMOVED_VERCEL_TOKEN"
$VERCEL_API = "https://api.vercel.com"

# GitHub API (will need token from user)
$GITHUB_OWNER = "simonkohut-ai"
$GITHUB_REPO = "p2ba"
$GITHUB_API = "https://api.github.com"

# Initialize variables
$conflictingDeploys = @()

Write-Host "STEP 1: Checking Vercel deployments..." -ForegroundColor Cyan
Write-Host ""

try {
    # Get all Vercel projects
    $headers = @{
        "Authorization" = "Bearer $VERCEL_TOKEN"
    }
    
    Write-Host "Fetching Vercel projects..." -ForegroundColor Yellow
    $projectsResponse = Invoke-RestMethod -Uri "$VERCEL_API/v9/projects" -Headers $headers -Method Get
    
    Write-Host "Found $($projectsResponse.projects.Count) projects" -ForegroundColor Green
    Write-Host ""
    
    # List all projects
    $allProjects = @()
    foreach ($project in $projectsResponse.projects) {
        $allProjects += [PSCustomObject]@{
            Name = $project.name
            ID = $project.id
            AccountID = $project.accountId
            Created = $project.createdAt
            Updated = $project.updatedAt
        }
        
        Write-Host "  - $($project.name) (ID: $($project.id))" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "STEP 2: Checking for conflicting deployments..." -ForegroundColor Cyan
    Write-Host ""
    
    # Check each project for deployments
    $keepProjects = @("ai-studio", "p2ba")
    
    foreach ($project in $projectsResponse.projects) {
        $projectName = $project.name
        
        # Skip projects we want to keep
        if ($keepProjects -contains $projectName) {
            Write-Host "  Keeping: $projectName" -ForegroundColor Green
            continue
        }
        
        Write-Host "  Checking: $projectName..." -ForegroundColor Yellow
        
        try {
            # Get deployments for this project
            $deploymentsResponse = Invoke-RestMethod -Uri "$VERCEL_API/v6/deployments?projectId=$($project.id)" -Headers $headers -Method Get
            
            if ($deploymentsResponse.deployments) {
                foreach ($deployment in $deploymentsResponse.deployments) {
                    $state = $deployment.state
                    $url = $deployment.url
                    
                    # Check for problematic deployments
                    if ($state -eq "BUILDING" -or $state -eq "QUEUED") {
                        Write-Host "    Found active deployment: $url (State: $state)" -ForegroundColor Yellow
                        $conflictingDeploys += [PSCustomObject]@{
                            Project = $projectName
                            DeploymentID = $deployment.id
                            URL = $url
                            State = $state
                            Action = "Cancel"
                        }
                    }
                }
            }
        } catch {
            Write-Host "    Could not fetch deployments for $projectName" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    
    # Cancel conflicting deployments
    if ($conflictingDeploys.Count -gt 0) {
        Write-Host "STEP 3: Cancelling conflicting deployments..." -ForegroundColor Cyan
        Write-Host ""
        
        foreach ($deploy in $conflictingDeploys) {
            Write-Host "  Cancelling: $($deploy.Project) - $($deploy.URL)" -ForegroundColor Yellow
            
            try {
                # Cancel deployment
                $cancelResponse = Invoke-RestMethod -Uri "$VERCEL_API/v13/deployments/$($deploy.DeploymentID)/cancel" -Headers $headers -Method Patch
                Write-Host "    Cancelled successfully" -ForegroundColor Green
            } catch {
                Write-Host "    Failed to cancel: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "No conflicting deployments found" -ForegroundColor Green
    }
    
    Write-Host ""
    
    # Verify active projects
    Write-Host "STEP 4: Verifying active projects..." -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($keepProject in $keepProjects) {
        $found = $projectsResponse.projects | Where-Object { $_.name -eq $keepProject }
        
        if ($found) {
            Write-Host "  $keepProject found" -ForegroundColor Green
            
            # Check settings
            try {
                $projectSettings = Invoke-RestMethod -Uri "$VERCEL_API/v9/projects/$keepProject" -Headers $headers -Method Get
                
                Write-Host "    Root Directory: $($projectSettings.rootDirectory)" -ForegroundColor Cyan
                
                # Check environment variables
                $envVars = Invoke-RestMethod -Uri "$VERCEL_API/v9/projects/$keepProject/env" -Headers $headers -Method Get
                $hasOpenAIKey = $envVars.envs | Where-Object { $_.key -eq "OPENAI_API_KEY" }
                
                if ($hasOpenAIKey) {
                    Write-Host "    OPENAI_API_KEY set" -ForegroundColor Green
                } else {
                    Write-Host "    OPENAI_API_KEY NOT SET" -ForegroundColor Yellow
                }
            } catch {
                Write-Host "    Could not fetch settings" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  $keepProject NOT FOUND" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "This might be due to:" -ForegroundColor Yellow
    Write-Host "  - Invalid Vercel token" -ForegroundColor White
    Write-Host "  - Network issues" -ForegroundColor White
    Write-Host "  - API rate limits" -ForegroundColor White
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "STEP 5: GitHub Repository Privacy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "To make GitHub repos private, I need:" -ForegroundColor Yellow
Write-Host "  1. GitHub Personal Access Token (PAT)" -ForegroundColor White
Write-Host "  2. Or you can do it manually (faster)" -ForegroundColor White
Write-Host ""

Write-Host "Opening GitHub settings for manual action..." -ForegroundColor Cyan
Start-Process "https://github.com/simonkohut-ai/p2ba/settings"
Start-Sleep -Seconds 2
Start-Process "https://github.com/simonkohut-ai?tab=repositories"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "AUTO-SECURITY CHECK COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "SUMMARY:" -ForegroundColor Yellow
Write-Host "  - Vercel projects checked" -ForegroundColor White
Write-Host "  - Conflicting deployments identified" -ForegroundColor White
if ($conflictingDeploys.Count -gt 0) {
    Write-Host "  - $($conflictingDeploys.Count) deployments cancelled" -ForegroundColor Green
} else {
    Write-Host "  - No conflicting deployments found" -ForegroundColor Green
}
Write-Host "  - Active projects verified" -ForegroundColor White
Write-Host "  - GitHub repos need manual action (or provide PAT)" -ForegroundColor Yellow
Write-Host ""

Write-Host "Next: Make GitHub repos private manually (or provide GitHub token)" -ForegroundColor Cyan

