@echo off
REM Wrapper to keep a centralized entrypoint under /scripts.
REM Delegates to the original DEPLOY_BOTH_NOW.bat at the repo root.

cd /d "%~dp0\.."
call DEPLOY_BOTH_NOW.bat
*** End Patch

