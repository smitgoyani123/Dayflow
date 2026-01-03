@echo off
echo ========================================
echo Starting Dayflow HRMS Application
echo ========================================
echo.

echo [1/2] Starting Backend Server...
start "Dayflow Backend" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 5 /nobreak >nul

echo [2/2] Starting Frontend...
start "Dayflow Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo IMPORTANT: Keep both terminal windows open!
echo.
echo Press any key to exit this window (servers will keep running)
pause >nul

