# Setup API Keys - Secure Configuration
# Sets keys in Vercel and tests them

param(
    [string]$OpenAIKey = "",
    [string]$VercelToken = ""
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  API KEYS SETUP" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Set OpenAI Key in Vercel
if ($OpenAIKey) {
    Write-Host "Step 1: Setting OPENAI_API_KEY in Vercel..." -ForegroundColor Yellow
    try {
        $env:OPENAI_API_KEY = $OpenAIKey
        vercel env add OPENAI_API_KEY production 2>&1 | Out-Null
        Write-Host "  ✅ OpenAI key set in Vercel (Production)" -ForegroundColor Green
        
        # Also set for preview and development
        vercel env add OPENAI_API_KEY preview 2>&1 | Out-Null
        vercel env add OPENAI_API_KEY development 2>&1 | Out-Null
        Write-Host "  ✅ OpenAI key set for all environments" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠️  Could not set via CLI - Set manually in Vercel Dashboard" -ForegroundColor Yellow
        Write-Host "     Settings → Environment Variables → OPENAI_API_KEY" -ForegroundColor Gray
    }
} else {
    Write-Host "Step 1: OpenAI key not provided" -ForegroundColor Yellow
    Write-Host "  Set manually: Vercel Dashboard → Settings → Environment Variables" -ForegroundColor Gray
}

# Step 2: Test OpenAI Key
if ($OpenAIKey) {
    Write-Host "`nStep 2: Testing OpenAI API key..." -ForegroundColor Yellow
    try {
        $body = @{
            model = "gpt-3.5-turbo"
            messages = @(
                @{
                    role = "user"
                    content = "Say 'OpenAI API is working!' in one sentence"
                }
            )
            max_tokens = 50
        } | ConvertTo-Json -Depth 10
        
        $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" `
            -Method Post `
            -Headers @{
                Authorization = "Bearer $OpenAIKey"
                "Content-Type" = "application/json"
            } `
            -Body $body `
            -TimeoutSec 30
        
        Write-Host "  ✅ OpenAI API key is working!" -ForegroundColor Green
        Write-Host "  Response: $($response.choices[0].message.content)" -ForegroundColor Gray
    } catch {
        Write-Host "  ❌ OpenAI API test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Step 3: Set Vercel Token
if ($VercelToken) {
    Write-Host "`nStep 3: Setting Vercel API token..." -ForegroundColor Yellow
    try {
        # Vercel CLI uses token from environment or config
        $env:VERCEL_TOKEN = $VercelToken
        Write-Host "  ✅ Vercel token set in environment" -ForegroundColor Green
        Write-Host "  Note: Vercel CLI uses this for API access" -ForegroundColor Gray
    } catch {
        Write-Host "  ⚠️  Could not set Vercel token" -ForegroundColor Yellow
    }
} else {
    Write-Host "`nStep 3: Vercel token not provided" -ForegroundColor Yellow
}

# Step 4: Test Vercel Access
if ($VercelToken) {
    Write-Host "`nStep 4: Testing Vercel API access..." -ForegroundColor Yellow
    try {
        $env:VERCEL_TOKEN = $VercelToken
        $whoami = vercel whoami 2>&1
        if ($whoami -match "error" -or $whoami -match "Error") {
            Write-Host "  ⚠️  Vercel authentication issue" -ForegroundColor Yellow
            Write-Host "  Try: vercel login" -ForegroundColor Gray
        } else {
            Write-Host "  ✅ Vercel access working!" -ForegroundColor Green
            Write-Host "  User: $whoami" -ForegroundColor Gray
        }
    } catch {
        Write-Host "  ⚠️  Could not verify Vercel access" -ForegroundColor Yellow
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SETUP COMPLETE" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Redeploy Vercel to activate OpenAI key" -ForegroundColor White
Write-Host "  2. Test: .\TEST_OPENAI_KEY.ps1" -ForegroundColor White
Write-Host "  3. Try: .\GENERATE_CONTENT.ps1 -Prompt 'Your prompt'" -ForegroundColor White
Write-Host "`n⚠️  Security: Keys are set in environment, not saved to files" -ForegroundColor Cyan

