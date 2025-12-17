# Test OpenAI API Key
# Tests if OPENAI_API_KEY is set and working

param(
    [string]$ApiKey = $env:OPENAI_API_KEY
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  OPENAI API KEY TEST" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if key is provided
if (-not $ApiKey) {
    Write-Host "❌ OPENAI_API_KEY not found" -ForegroundColor Red
    Write-Host "`nSet it in one of these ways:" -ForegroundColor Yellow
    Write-Host "  1. Environment variable: `$env:OPENAI_API_KEY='sk-...'" -ForegroundColor Gray
    Write-Host "  2. Vercel: Settings → Environment Variables → OPENAI_API_KEY" -ForegroundColor Gray
    Write-Host "  3. Pass as parameter: .\TEST_OPENAI_KEY.ps1 -ApiKey 'sk-...'" -ForegroundColor Gray
    Write-Host "`nAfter setting in Vercel, redeploy to activate." -ForegroundColor Yellow
    exit 1
}

# Validate key format
if (-not ($ApiKey -match "^sk-")) {
    Write-Host "⚠️  Warning: API key doesn't start with 'sk-'" -ForegroundColor Yellow
    Write-Host "  Key format: $($ApiKey.Substring(0, [Math]::Min(10, $ApiKey.Length)))..." -ForegroundColor Gray
}

Write-Host "Testing API key..." -ForegroundColor Yellow
Write-Host "  Key: $($ApiKey.Substring(0, [Math]::Min(15, $ApiKey.Length)))..." -ForegroundColor Gray

try {
    # Simple test request
    $body = @{
        model = "gpt-3.5-turbo"
        messages = @(
            @{
                role = "user"
                content = "Say 'API key is working!' in one sentence"
            }
        )
        max_tokens = 50
    } | ConvertTo-Json -Depth 10
    
    Write-Host "`nSending test request..." -ForegroundColor Yellow
    
    $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" `
        -Method Post `
        -Headers @{
            Authorization = "Bearer $ApiKey"
            "Content-Type" = "application/json"
        } `
        -Body $body `
        -TimeoutSec 30
    
    $content = $response.choices[0].message.content
    
    Write-Host "`n✅ SUCCESS! API Key is working" -ForegroundColor Green
    Write-Host "`nResponse:" -ForegroundColor Cyan
    Write-Host "$content`n" -ForegroundColor White
    
    # Show usage info
    Write-Host "Usage Info:" -ForegroundColor Cyan
    Write-Host "  Model: $($response.model)" -ForegroundColor Gray
    Write-Host "  Tokens used: $($response.usage.total_tokens)" -ForegroundColor Gray
    Write-Host "  Prompt tokens: $($response.usage.prompt_tokens)" -ForegroundColor Gray
    Write-Host "  Completion tokens: $($response.usage.completion_tokens)" -ForegroundColor Gray
    
    Write-Host "`n✅ Your OpenAI API key is ready to use!" -ForegroundColor Green
    Write-Host "`nNext steps:" -ForegroundColor Yellow
    Write-Host "  1. Set in Vercel: Settings → Environment Variables" -ForegroundColor White
    Write-Host "  2. Redeploy to activate" -ForegroundColor White
    Write-Host "  3. Try: .\GENERATE_CONTENT.ps1 -Prompt 'Your prompt here'" -ForegroundColor White
    
} catch {
    Write-Host "`n❌ ERROR: API Key test failed" -ForegroundColor Red
    Write-Host "`nError details:" -ForegroundColor Yellow
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "  Status Code: $statusCode" -ForegroundColor Gray
        
        if ($statusCode -eq 401) {
            Write-Host "  ❌ Invalid API key - Check if key is correct" -ForegroundColor Red
        } elseif ($statusCode -eq 429) {
            Write-Host "  ⚠️  Rate limit exceeded - Wait a moment and try again" -ForegroundColor Yellow
        } elseif ($statusCode -eq 500) {
            Write-Host "  ⚠️  OpenAI server error - Try again later" -ForegroundColor Yellow
        }
        
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            $errorData = $responseBody | ConvertFrom-Json
            Write-Host "  Error: $($errorData.error.message)" -ForegroundColor Gray
        } catch {
            Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
        }
    } else {
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Gray
    }
    
    Write-Host "`nTroubleshooting:" -ForegroundColor Yellow
    Write-Host "  1. Verify key is correct (starts with 'sk-')" -ForegroundColor White
    Write-Host "  2. Check OpenAI dashboard for key status" -ForegroundColor White
    Write-Host "  3. Verify account has credits/quota" -ForegroundColor White
    Write-Host "  4. Check internet connection" -ForegroundColor White
    
    exit 1
}

