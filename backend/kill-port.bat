@echo off
REM Batch script to kill process on port 5000 or 5001
setlocal

if "%1"=="" (
    set PORT=5000
) else (
    set PORT=%1
)

echo Finding process on port %PORT%...

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%PORT%') do (
    set PID=%%a
    goto :found
)

:found
if defined PID (
    echo Found process ID: %PID%
    echo Killing process...
    taskkill /PID %PID% /F
    echo Process killed!
) else (
    echo No process found on port %PORT%
)

endlocal

