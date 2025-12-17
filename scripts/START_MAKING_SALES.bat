@echo off
REM Wrapper script under /scripts to open the sales workflow.
REM Calls the original START_MAKING_SALES.bat at repo root.

cd /d "%~dp0\.."
call START_MAKING_SALES.bat
*** End Patch

