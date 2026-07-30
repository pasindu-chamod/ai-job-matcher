@echo off
title AI Job Matcher - Master Launcher
color 0A
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;C:\Program Files\Common Files\Oracle\Java\javapath;C:\Users\ASUS\AppData\Local\Microsoft\WindowsApps;%PATH%"

echo ========================================================
echo         🚀 AI Job Matcher - Local System Launcher 🚀
echo ========================================================
echo.
node run_all.js
pause
