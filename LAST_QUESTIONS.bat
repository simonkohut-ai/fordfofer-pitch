@echo off
chcp 65001 >nul
color 0B
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     ❓ LAST QUESTIONS - DEPLOYMENT CHECK ❓                ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo Let's verify everything is working!
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 1: Do you have your Dashboard URL?
echo ═══════════════════════════════════════════════════════════════
echo.
set /p HAS_DASHBOARD_URL="Do you have a Dashboard URL? (yes/no): "
if /i "%HAS_DASHBOARD_URL%"=="yes" (
    set /p DASHBOARD_URL="Enter Dashboard URL: "
    echo.
    echo Opening Dashboard...
    start %DASHBOARD_URL%
    timeout /t 2 >nul
) else (
    echo.
    echo Opening Vercel Dashboard to get your URL...
    start https://vercel.com/dashboard
    timeout /t 2 >nul
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 2: Does Dashboard load?
echo ═══════════════════════════════════════════════════════════════
echo.
set /p DASHBOARD_LOADS="Does Dashboard URL load? (yes/no): "
if /i "%DASHBOARD_LOADS%"=="no" (
    echo.
    echo ⚠️ ISSUE: Dashboard not loading
    echo.
    echo Check:
    echo   1. Root Directory in Vercel Settings (should be: dashboard)
    echo   2. Build completed successfully
    echo   3. No errors in Vercel logs
    echo.
    pause
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 3: Does password prompt appear?
echo ═══════════════════════════════════════════════════════════════
echo.
set /p PASSWORD_PROMPT="Does password prompt appear? (yes/no): "
if /i "%PASSWORD_PROMPT%"=="yes" (
    echo.
    echo Password: moneymachine25
    echo.
    set /p CAN_LOGIN="Can you log in? (yes/no): "
    if /i "%CAN_LOGIN%"=="no" (
        echo.
        echo ⚠️ ISSUE: Cannot log in
        echo Check browser console (F12) for errors
        echo.
        pause
    )
) else (
    echo.
    echo ⚠️ ISSUE: Password prompt missing
    echo Check auth.js is loaded
    echo.
    pause
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 4: Does AI Chat work?
echo ═══════════════════════════════════════════════════════════════
echo.
set /p AI_CHAT_WORKS="Does AI Chat respond? (yes/no): "
if /i "%AI_CHAT_WORKS%"=="no" (
    echo.
    echo ⚠️ ISSUE: AI Chat not working
    echo.
    echo Check:
    echo   1. OPENAI_API_KEY is set in Vercel Environment Variables
    echo   2. Browser console (F12) for API errors
    echo   3. Network tab shows /api/agent requests
    echo.
    pause
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 5: Do you have Console URL?
echo ═══════════════════════════════════════════════════════════════
echo.
set /p HAS_CONSOLE_URL="Do you have a Console URL? (yes/no): "
if /i "%HAS_CONSOLE_URL%"=="yes" (
    set /p CONSOLE_URL="Enter Console URL: "
    echo.
    echo Opening Console...
    start %CONSOLE_URL%
    timeout /t 2 >nul
    
    echo.
    set /p CONSOLE_LOADS="Does Console load? (yes/no): "
    if /i "%CONSOLE_LOADS%"=="no" (
        echo.
        echo ⚠️ ISSUE: Console not loading
        echo Check Root Directory is set to: p2ba-console
        echo.
        pause
    )
    
    echo.
    set /p CONSOLE_WORKS="Do commands execute? (yes/no): "
    if /i "%CONSOLE_WORKS%"=="no" (
        echo.
        echo ⚠️ ISSUE: Commands not executing
        echo Check OPENAI_API_KEY is set
        echo.
        pause
    )
) else (
    echo.
    echo ℹ️ No Console URL - that's okay if you only deployed Dashboard
    echo.
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo QUESTION 6: Any errors in browser console?
echo ═══════════════════════════════════════════════════════════════
echo.
set /p HAS_ERRORS="Any red errors in browser console (F12)? (yes/no): "
if /i "%HAS_ERRORS%"=="yes" (
    echo.
    echo ⚠️ ISSUE: Errors found
    echo.
    echo Check:
    echo   1. Copy error messages
    echo   2. Check Network tab for failed requests
    echo   3. Verify environment variables in Vercel
    echo.
    pause
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo SUMMARY
echo ═══════════════════════════════════════════════════════════════
echo.
echo Dashboard Status:
if /i "%DASHBOARD_LOADS%"=="yes" (
    echo   ✅ Dashboard loads
) else (
    echo   ❌ Dashboard not loading
)
if /i "%PASSWORD_PROMPT%"=="yes" (
    echo   ✅ Password prompt works
) else (
    echo   ❌ Password prompt missing
)
if /i "%AI_CHAT_WORKS%"=="yes" (
    echo   ✅ AI Chat works
) else (
    echo   ❌ AI Chat not working
)

echo.
echo Console Status:
if /i "%HAS_CONSOLE_URL%"=="yes" (
    if /i "%CONSOLE_LOADS%"=="yes" (
        echo   ✅ Console loads
    ) else (
        echo   ❌ Console not loading
    )
    if /i "%CONSOLE_WORKS%"=="yes" (
        echo   ✅ Commands execute
    ) else (
        echo   ❌ Commands not executing
    )
) else (
    echo   ℹ️ Console not deployed
)

echo.
echo Errors:
if /i "%HAS_ERRORS%"=="yes" (
    echo   ⚠️ Errors found - check browser console
) else (
    echo   ✅ No errors
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo NEXT STEPS
echo ═══════════════════════════════════════════════════════════════
echo.
echo If everything works:
echo   ✅ You're ready to use your dashboard!
echo   ✅ Start testing with real commands
echo   ✅ Share URLs with clients/users
echo.
echo If issues found:
echo   ⚠️ Check the specific issues above
echo   ⚠️ Review Vercel logs
echo   ⚠️ Verify environment variables
echo.
pause

echo.
echo Opening Vercel Dashboard for final check...
start https://vercel.com/dashboard
timeout /t 2 >nul

echo.
echo ✅ Questions complete! Check your deployments and let me know if you need help fixing anything.
echo.
pause
