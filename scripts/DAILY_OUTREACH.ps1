# Daily Outreach Automation Script
# Uses AI Marketing Engine to generate personalized outreach

param(
    [string]$ProspectFile = "prospects.csv",
    [string]$Platform = "linkedin",
    [int]$Count = 10
)

$ErrorActionPreference = "Stop"

# Check OpenAI API key
if (-not $env:OPENAI_API_KEY) {
    Write-Host "❌ OPENAI_API_KEY not set" -ForegroundColor Red
    Write-Host "Set it with: `$env:OPENAI_API_KEY='your-key'" -ForegroundColor Yellow
    exit 1
}

# Check if prospect file exists
if (-not (Test-Path $ProspectFile)) {
    Write-Host "❌ Prospect file not found: $ProspectFile" -ForegroundColor Red
    Write-Host "Creating sample file..." -ForegroundColor Yellow
    
    # Create sample CSV
    @"
name,profile,pain,relevance
John Doe,Founder of SaaS startup,spending hours on Meta posts,Posts about marketing automation
Jane Smith,CEO of tech company,marketing takes too long,Needs consistent content
"@ | Out-File -FilePath $ProspectFile -Encoding UTF8
    
    Write-Host "✅ Created sample file: $ProspectFile" -ForegroundColor Green
    Write-Host "Edit it with your prospects, then run again." -ForegroundColor Yellow
    exit 0
}

# Import prospects
Write-Host "📋 Loading prospects from $ProspectFile..." -ForegroundColor Cyan
$prospects = Import-Csv -Path $ProspectFile

if ($prospects.Count -eq 0) {
    Write-Host "❌ No prospects found in file" -ForegroundColor Red
    exit 1
}

# Limit count
$prospects = $prospects | Select-Object -First $Count

Write-Host "✅ Found $($prospects.Count) prospects" -ForegroundColor Green
Write-Host ""

# Generate outreach for each prospect
$results = @()

foreach ($prospect in $prospects) {
    Write-Host "🤖 Generating $Platform message for $($prospect.name)..." -ForegroundColor Yellow
    
    # Build context
    $context = @{
        name = $prospect.name
        profile = $prospect.profile
        pain = $prospect.pain
        relevance = $prospect.relevance
    } | ConvertTo-Json -Compress
    
    # Call API (or use local script)
    try {
        # Option 1: Use API endpoint
        $apiUrl = "https://www.golocapo.com/api/ai/outreach"
        
        $body = @{
            platform = $Platform
            context = $context | ConvertFrom-Json
            type = if ($Platform -eq "linkedin") { "short" } else { "default" }
        } | ConvertTo-Json
        
        $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
        
        if ($response.success) {
            $message = $response.content
            Write-Host "✅ Generated message" -ForegroundColor Green
            
            # Copy to clipboard
            $message | Set-Clipboard
            Write-Host "📋 Copied to clipboard" -ForegroundColor Cyan
            
            # Store result
            $results += [PSCustomObject]@{
                Name = $prospect.name
                Platform = $Platform
                Message = $message
                Status = "Generated"
            }
            
            Write-Host ""
            Write-Host "--- Message for $($prospect.name) ---" -ForegroundColor White
            Write-Host $message -ForegroundColor Gray
            Write-Host ""
            
            # Wait for user to send
            Write-Host "Press Enter when ready for next prospect..." -ForegroundColor Yellow
            Read-Host
            
        } else {
            Write-Host "❌ API error: $($response.error)" -ForegroundColor Red
        }
        
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        
        # Fallback: Use local script
        Write-Host "Trying local script..." -ForegroundColor Yellow
        try {
            $scriptPath = Join-Path $PSScriptRoot "ai_marketing_engine.mjs"
            if (Test-Path $scriptPath) {
                $message = node $scriptPath $Platform $prospect.name $prospect.profile $prospect.pain
                $message | Set-Clipboard
                Write-Host "✅ Generated via local script" -ForegroundColor Green
            } else {
                Write-Host "❌ Local script not found" -ForegroundColor Red
            }
        } catch {
            Write-Host "❌ Local script error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Summary
Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Cyan
Write-Host "Generated: $($results.Count) messages" -ForegroundColor Green
Write-Host "Platform: $Platform" -ForegroundColor Green
Write-Host ""

# Save results
$outputFile = "outreach_results_$(Get-Date -Format 'yyyyMMdd_HHmmss').csv"
$results | Export-Csv -Path $outputFile -NoTypeInformation
Write-Host "✅ Results saved to: $outputFile" -ForegroundColor Green

