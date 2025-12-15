@echo off
color 0A
title ⚡ AI STUDIO - COMMAND CENTER
cls

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║         ⚡ AI STUDIO - COMMAND CENTER                    ║
echo ║                                                            ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Opening your central command center...
echo.

cd /d "%~dp0"
start "" "dashboard\index.html"

timeout /t 2 /nobreak >nul

cls
echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  ✅ DASHBOARD OPENED!                                     ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.
echo Your AI Studio Command Center is now open!
echo.
echo Features:
echo   📊 Dashboard - Overview and stats
echo   🔄 Workflows - Automation management
echo   💬 AI Chat - Central communication hub
echo   💰 Revenue - Sales tracking
echo   📢 Marketing - Campaign management
echo   ⚙️  Settings - Integrations
echo.
echo Use the AI Chat to communicate with:
echo   • Claude
echo   • Cursor
echo   • OpenAI
echo.
echo This is your final input app - everything runs from here!
echo.
pause

