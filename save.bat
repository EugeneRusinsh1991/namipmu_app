@echo off
REM Wrapper to run the PowerShell script with Bypass execution policy
REM Place this file in the project root next to save.ps1
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0save.ps1" %*
if errorlevel 1 exit /b %errorlevel%
endlocal
