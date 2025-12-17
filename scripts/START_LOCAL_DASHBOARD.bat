@echo off
REM Wrapper script under /scripts to start local dashboard.
REM Calls the original START_LOCAL_DASHBOARD.bat at repo root.

cd /d "%~dp0\.."
call START_LOCAL_DASHBOARD.bat
*** End Patch

