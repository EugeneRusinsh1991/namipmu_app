@echo off
REM smartSave.bat - Interactive menu for Generate, Backup, and Git operations
REM Place this file in the project root next to smartSave.ps1
setlocal
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0smartSave.ps1"
if errorlevel 1 exit /b %errorlevel%
endlocal
