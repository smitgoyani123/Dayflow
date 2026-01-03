@echo off
echo ========================================
echo Starting Dayflow Backend Server
echo ========================================
echo.
cd /d %~dp0backend
if errorlevel 1 (
    echo ERROR: Could not change to backend directory!
    pause
    exit /b 1
)

echo Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

echo.
echo Starting server...
echo IMPORTANT: Keep this window open!
echo.
call npm run dev
if errorlevel 1 (
    echo.
    echo ERROR: Server failed to start!
    echo Check the error messages above.
    echo.
    pause
)
