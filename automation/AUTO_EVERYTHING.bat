@echo off
title FORDFOFER AUTO-SYSTEM
color 0A

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🦄 FORDFOFER AUTO-EVERYTHING SYSTEM                       ║
echo ║     Teraz len promptuješ a všetko sa robí automaticky!        ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 🚀 Spúšťam PROMPT-TO-POST systém...
start "Prompt to Post" cmd /k "cd automation && node PROMPT_TO_POST.js"

timeout /t 2 /nobreak >nul

echo ✅ Systém beží!
echo.
echo 📝 NAPÍŠ PROMPT v otvorenom okne
echo 💾 Post sa automaticky vygeneruje a uloží
echo 📋 Otvorí sa súbor → Skopíruj → Postni!
echo.
pause


