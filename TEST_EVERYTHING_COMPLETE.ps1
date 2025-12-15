# TEST EVERYTHING - Complete Health Check
$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "TESTING EVERYTHING - COMPLETE CHECK" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# URLs to test
$dashboardUrl = "https://ai-studio-sandy-five.vercel.app"
$consoleUrl = "https://p2ba-navy.vercel.app"

# Step 1: Open all URLs for visual testing
Write-Host "STEP 1: Opening all URLs for testing..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening Dashboard..." -ForegroundColor Yellow
Start-Process $dashboardUrl
Start-Sleep -Seconds 2

Write-Host "Opening Console..." -ForegroundColor Yellow
Start-Process $consoleUrl
Start-Sleep -Seconds 2

Write-Host "Opening Vercel Dashboard..." -ForegroundColor Yellow
Start-Process "https://vercel.com/dashboard"
Start-Sleep -Seconds 2

Write-Host "All pages opened!" -ForegroundColor Green
Write-Host ""

# Step 2: Test URLs with HTTP requests
Write-Host "STEP 2: Testing URLs with HTTP requests..." -ForegroundColor Cyan
Write-Host ""

# Test Dashboard
Write-Host "Testing Dashboard URL..." -ForegroundColor Yellow
try {
    $dashboardResponse = Invoke-WebRequest -Uri $dashboardUrl -Method Get -TimeoutSec 10 -ErrorAction Stop
    if ($dashboardResponse.StatusCode -eq 200) {
        Write-Host "Dashboard: OK (Status 200)" -ForegroundColor Green
        Write-Host "Content length: $($dashboardResponse.Content.Length) bytes" -ForegroundColor Cyan
    } else {
        Write-Host "Dashboard: Unexpected status $($dashboardResponse.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Dashboard: Error - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test Console
Write-Host "Testing Console URL..." -ForegroundColor Yellow
try {
    $consoleResponse = Invoke-WebRequest -Uri $consoleUrl -Method Get -TimeoutSec 10 -ErrorAction Stop
    if ($consoleResponse.StatusCode -eq 200) {
        Write-Host "Console: OK (Status 200)" -ForegroundColor Green
        Write-Host "Content length: $($consoleResponse.Content.Length) bytes" -ForegroundColor Cyan
    } else {
        Write-Host "Console: Unexpected status $($consoleResponse.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Console: Error - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Step 3: Create testing checklist
Write-Host "STEP 3: Creating testing checklist..." -ForegroundColor Cyan
Write-Host ""

$testChecklist = @(
    "# COMPLETE TESTING CHECKLIST",
    "",
    "## URL STATUS TESTS",
    "",
    "### Dashboard:",
    "URL: $dashboardUrl",
    "- [ ] URL loads (HTTP 200)",
    "- [ ] Page renders correctly",
    "- [ ] Shows password prompt OR dashboard",
    "- [ ] No console errors (F12)",
    "- [ ] No 404/500 errors",
    "",
    "### Console:",
    "URL: $consoleUrl",
    "- [ ] URL loads (HTTP 200)",
    "- [ ] Page renders correctly",
    "- [ ] Shows chat interface",
    "- [ ] No console errors (F12)",
    "- [ ] No 404/500 errors",
    "",
    "---",
    "",
    "## FUNCTIONALITY TESTS",
    "",
    "### Dashboard:",
    "1. Open: $dashboardUrl",
    "2. Enter password: moneymachine25",
    "3. Check: Dashboard loads after login",
    "4. Test AI Chat:",
    "   - Click AI Chat section",
    "   - Type: Hello",
    "   - Press Enter",
    "   - Check: Response appears",
    "5. Check: No errors in browser console (F12)",
    "",
    "### Console:",
    "1. Open: $consoleUrl",
    "2. Check: Chat interface visible",
    "3. Test Command:",
    "   - Type: Create a test business",
    "   - Press Enter or click Execute",
    "   - Check: Command processes",
    "   - Check: Response appears",
    "4. Check: No errors in browser console (F12)",
    "",
    "---",
    "",
    "## VERCEL DASHBOARD CHECKS",
    "",
    "### Dashboard Project (ai-studio):",
    "- [ ] Project exists",
    "- [ ] Latest deployment: Ready (green checkmark)",
    "- [ ] Root Directory = dashboard (in Settings)",
    "- [ ] OPENAI_API_KEY set in Environment Variables",
    "- [ ] No build errors in logs",
    "",
    "### Console Project (p2ba):",
    "- [ ] Project exists",
    "- [ ] Latest deployment: Ready (green checkmark)",
    "- [ ] Root Directory = p2ba-console (if separate project)",
    "- [ ] OPENAI_API_KEY set in Environment Variables",
    "- [ ] No build errors in logs",
    "",
    "---",
    "",
    "## BROWSER CONSOLE CHECKS",
    "",
    "Open browser console (F12) and check:",
    "- [ ] No red errors",
    "- [ ] No 404 errors",
    "- [ ] No 500 errors",
    "- [ ] API calls return 200 status",
    "- [ ] No CORS errors",
    "- [ ] No timeout errors",
    "",
    "---",
    "",
    "## NETWORK TAB CHECKS",
    "",
    "Open Network tab (F12) and check:",
    "",
    "### Dashboard:",
    "- [ ] /api/agent returns 200 (when testing AI Chat)",
    "- [ ] All resources load successfully",
    "- [ ] No failed requests",
    "",
    "### Console:",
    "- [ ] /api/p2ba-command returns 200 (when testing commands)",
    "- [ ] All resources load successfully",
    "- [ ] No failed requests",
    "",
    "---",
    "",
    "## SUCCESS CRITERIA",
    "",
    "All tests pass if:",
    "- ✅ Dashboard URL loads",
    "- ✅ Can log in with password",
    "- ✅ AI Chat responds",
    "- ✅ Console URL loads",
    "- ✅ Commands execute",
    "- ✅ No errors in console",
    "- ✅ No errors in Vercel logs",
    "",
    "---",
    "",
    "## IF TESTS FAIL",
    "",
    "### Dashboard Issues:",
    "- Check Root Directory = dashboard",
    "- Check OPENAI_API_KEY is set",
    "- Check Vercel build logs",
    "- Redeploy if needed",
    "",
    "### Console Issues:",
    "- Check OPENAI_API_KEY is set",
    "- Check Vercel build logs",
    "- Redeploy if needed",
    "",
    "---",
    "",
    "**Test Date:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')",
    "",
    "**Test both URLs manually and check all items above!**"
)

$testChecklist | Out-File -FilePath "TESTING_CHECKLIST.md" -Encoding UTF8
Write-Host "Testing checklist created: TESTING_CHECKLIST.md" -ForegroundColor Green
Write-Host ""

# Step 4: Summary
Write-Host "========================================" -ForegroundColor Green
Write-Host "TESTING COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "TEST RESULTS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Dashboard ($dashboardUrl):" -ForegroundColor White
Write-Host "  - HTTP Status: Checked above" -ForegroundColor Cyan
Write-Host "  - Visual Test: Open in browser and verify" -ForegroundColor Cyan
Write-Host ""
Write-Host "Console ($consoleUrl):" -ForegroundColor White
Write-Host "  - HTTP Status: Checked above" -ForegroundColor Cyan
Write-Host "  - Visual Test: Open in browser and verify" -ForegroundColor Cyan
Write-Host ""

Write-Host "MANUAL TESTS NEEDED:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Dashboard:" -ForegroundColor White
Write-Host "   - Open URL (already opened)" -ForegroundColor Cyan
Write-Host "   - Enter password: moneymachine25" -ForegroundColor Cyan
Write-Host "   - Test AI Chat: Type Hello" -ForegroundColor Cyan
Write-Host "   - Check browser console (F12) for errors" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Console:" -ForegroundColor White
Write-Host "   - Open URL (already opened)" -ForegroundColor Cyan
Write-Host "   - Test command: Create a test business" -ForegroundColor Cyan
Write-Host "   - Check browser console (F12) for errors" -ForegroundColor Cyan
Write-Host ""

Write-Host "Files created:" -ForegroundColor Yellow
Write-Host "  - TESTING_CHECKLIST.md (complete testing guide)" -ForegroundColor Cyan
Write-Host ""

Write-Host "Opening testing checklist..."
Start-Sleep -Seconds 2
Start-Process "TESTING_CHECKLIST.md"
