# Daily Promo Script
# One-click daily promotion: opens tabs + copies message to clipboard

$promo = @"
Golo Čapo
21.12

Early Christmas gift.

https://www.golocapo.com/prelaunch
"@

# Copy to clipboard
Set-Clipboard $promo
Write-Host "✅ Message copied to clipboard" -ForegroundColor Green
Write-Host ""
Write-Host $promo -ForegroundColor Cyan
Write-Host ""

# Open tabs
Write-Host "Opening tabs..." -ForegroundColor Yellow
Start-Process "https://www.golocapo.com/prelaunch"
Start-Sleep -Milliseconds 500
Start-Process "https://x.com/compose/post"
Start-Sleep -Milliseconds 500
Start-Process "https://www.linkedin.com/feed/"
Start-Sleep -Milliseconds 500
Start-Process "https://www.instagram.com/"
Start-Sleep -Milliseconds 500
Start-Process "https://web.telegram.org/"

Write-Host ""
Write-Host "✅ Clipboard loaded. Tabs opened. Post + DM now." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Paste message in each platform" -ForegroundColor White
Write-Host "  2. Send 5-10 DMs using DAILY_OUTREACH_PLAYBOOK.md" -ForegroundColor White
Write-Host "  3. Update /data/audience.csv with new contacts" -ForegroundColor White
Write-Host ""

