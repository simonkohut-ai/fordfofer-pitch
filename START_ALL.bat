@echo off
title FORDFOFER AUTO-SYSTEM
color 0A

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║     🦄 FORDFOFER AUTO-SYSTEM - STARTING...                    ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo 📝 Starting post generator...
start "Post Generator" cmd /k "cd automation && node auto-save-posts.js"

timeout /t 2 /nobreak >nul

echo 🔔 Starting notifications...
start "Notifications" cmd /k "cd automation && node NOTIFICATIONS.js"

echo.
echo ✅ ALL SYSTEMS RUNNING!
echo.
echo 📁 Posts saved to: generated-posts\
echo 🔔 Notifications: ACTIVE
echo.
pause


