@echo off
title AI Job Matcher - Stopper
color 0C
echo ========================================================
echo         🛑 Stopping All AI Job Matcher Services 🛑
echo ========================================================
echo.

taskkill /FI "WINDOWTITLE eq Python - Resume Service*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Python - Matching Service*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Python - Blockchain Service*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq Java - API Gateway*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq React - Frontend*" /F >nul 2>&1

echo All services stopped successfully.
pause
