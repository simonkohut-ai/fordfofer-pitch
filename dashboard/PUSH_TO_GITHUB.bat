@echo off
chcp 65001 >nul
color 0A
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║     🚀 PUSH DASHBOARD TO GITHUB 🚀                         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo Step 1: Checking Git status...
echo.
git status
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 2: Adding all dashboard files...
echo ═══════════════════════════════════════════════════════════════
echo.
git add .
echo.
echo ✅ Files added!
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 3: Committing changes...
echo ═══════════════════════════════════════════════════════════════
echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Update dashboard - ready for deployment
git commit -m "%commit_msg%"
echo.
echo ✅ Committed!
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo Step 4: Pushing to GitHub...
echo ═══════════════════════════════════════════════════════════════
echo.
echo Current remote: 
git remote -v
echo.
echo Pushing to origin...
git push origin delete-old-system
echo.
if %ERRORLEVEL% EQU 0 (
    echo ✅ Successfully pushed to GitHub!
    echo.
    echo 🌐 Repository: https://github.com/simonkohut-ai/p2ba
    echo 🌿 Branch: delete-old-system
) else (
    echo ❌ Push failed. Check the error above.
    echo.
    echo 💡 TIP: Make sure you're logged into GitHub:
    echo    git config --global user.name "Your Name"
    echo    git config --global user.email "your.email@example.com"
)
echo.
pause
