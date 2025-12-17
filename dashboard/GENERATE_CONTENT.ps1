# Generate Content Using OpenAI
# Requires OPENAI_API_KEY in environment

param(
    [string]$Prompt = "Generate a short marketing headline for an AI marketing studio",
    [string]$OpenAIKey = $env:OPENAI_API_KEY,
    [string]$Model = "gpt-4"
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  CONTENT GENERATION" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

if (-not $OpenAIKey) {
    Write-Host "❌ OPENAI_API_KEY not set" -ForegroundColor Red
    Write-Host "`nSet it in Vercel or locally:" -ForegroundColor Yellow
    Write-Host "  Vercel: Settings → Environment Variables" -ForegroundColor Gray
    Write-Host "  Local:  `$env:OPENAI_API_KEY='sk-...'" -ForegroundColor Gray
    exit 1
}

try {
    Write-Host "Generating content..." -ForegroundColor Yellow
    Write-Host "  Prompt: $Prompt" -ForegroundColor Gray
    Write-Host "  Model: $Model" -ForegroundColor Gray
    
    $body = @{
        model = $Model
        messages = @(
            @{
                role = "user"
                content = $Prompt
            }
        )
        max_tokens = 500
        temperature = 0.7
    } | ConvertTo-Json -Depth 10
    
    $response = Invoke-RestMethod -Uri "https://api.openai.com/v1/chat/completions" `
        -Method Post `
        -Headers @{
            Authorization = "Bearer $OpenAIKey"
            "Content-Type" = "application/json"
        } `
        -Body $body
    
    $generatedContent = $response.choices[0].message.content
    
    Write-Host "`n✅ Generated Content:" -ForegroundColor Green
    Write-Host "`n$generatedContent`n" -ForegroundColor White
    
    # Option to save to file
    $save = Read-Host "Save to file? (y/n)"
    if ($save -eq "y") {
        $filename = Read-Host "Filename (e.g., generated-content.txt)"
        $generatedContent | Out-File -FilePath $filename -Encoding UTF8
        Write-Host "✅ Saved to $filename" -ForegroundColor Green
    }
    
} catch {
    Write-Host "`n❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Gray
    }
    exit 1
}

