@echo off
REM 🦄 Optimize Cursor for Best Performance
color 0B
title ⚡ OPTIMIZE CURSOR
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         ⚡ CURSOR OPTIMIZATION GUIDE                    ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 1: Create .cursorignore                             ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

if exist ".cursorignore" (
    echo ✅ .cursorignore already exists
) else (
    echo Creating .cursorignore...
    (
        echo # Cursor Optimization - Ignore these files/folders
        echo node_modules/
        echo dist/
        echo build/
        echo .env
        echo .git/
        echo *.log
    ) > .cursorignore
    echo ✅ Created .cursorignore
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 2: Cursor Settings                                  ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo To optimize Cursor:
echo.
echo 1. Press: Ctrl + , (open settings)
echo 2. Search: "cursor ai model"
echo 3. Set to: gpt-4o-mini (fastest)
echo 4. Search: "codebase indexing"
echo 5. Enable: ✅
echo 6. Search: "semantic search"
echo 7. Enable: ✅
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 3: Keyboard Shortcuts                               ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo Essential shortcuts:
echo   Ctrl + K  - AI command (fastest)
echo   Ctrl + L  - Chat with AI
echo   Ctrl + /  - Toggle suggestions
echo   Ctrl + Shift + P - Command palette
echo.

echo ╔═══════════════════════════════════════════════════════════╗
echo ║  STEP 4: Performance Tips                                ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

echo ✅ Use gpt-4o-mini for most tasks (fastest, cheapest)
echo ✅ Close unused tabs
echo ✅ Enable codebase indexing
echo ✅ Use .cursorignore for large folders
echo ✅ Keep context focused (only open relevant files)
echo.

echo Opening optimization guide...
timeout /t 2 /nobreak >nul
if exist "CURSOR_OPTIMIZATION.md" (
    start "" "CURSOR_OPTIMIZATION.md"
)

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ OPTIMIZATION COMPLETE                                 ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo   1. Open Cursor Settings (Ctrl + ,)
echo   2. Follow the guide above
echo   3. See CURSOR_OPTIMIZATION.md for details
echo.

pause
