# PowerShell script to fix errors and start server
Write-Host "=== Dayflow Backend Server Fix & Start ===" -ForegroundColor Cyan

# Step 1: Kill process on port 5001
Write-Host "`n[1/3] Checking for process on port 5001..." -ForegroundColor Yellow
$process = Get-NetTCPConnection -LocalPort 5001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) {
    Write-Host "Found process ID: $process" -ForegroundColor Red
    try {
        Stop-Process -Id $process -Force -ErrorAction Stop
        Write-Host "✓ Killed process on port 5001" -ForegroundColor Green
        Start-Sleep -Seconds 1
    } catch {
        Write-Host "✗ Failed to kill process: $_" -ForegroundColor Red
    }
} else {
    Write-Host "✓ No process found on port 5001" -ForegroundColor Green
}

# Step 2: Fix .env file (remove duplicate PORT entries)
Write-Host "`n[2/3] Checking .env file..." -ForegroundColor Yellow
if (Test-Path .env) {
    $envContent = Get-Content .env
    $portLines = $envContent | Where-Object { $_ -match '^PORT=' }
    if ($portLines.Count -gt 1) {
        Write-Host "Found duplicate PORT entries, fixing..." -ForegroundColor Yellow
        $newContent = @()
        $portSet = $false
        foreach ($line in $envContent) {
            if ($line -match '^PORT=') {
                if (-not $portSet) {
                    $newContent += "PORT=5000"
                    $portSet = $true
                }
                # Skip duplicate PORT lines
            } else {
                $newContent += $line
            }
        }
        if (-not $portSet) {
            $newContent += "PORT=5000"
        }
        $newContent | Set-Content .env
        Write-Host "✓ Fixed .env file (set PORT=5000)" -ForegroundColor Green
    } else {
        Write-Host "✓ .env file looks good" -ForegroundColor Green
    }
} else {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
MONGODB_URI=mongodb://localhost:27017/dayflow
JWT_SECRET=your_secret_key_change_in_production
PORT=5000
"@ | Set-Content .env
    Write-Host "✓ Created .env file" -ForegroundColor Green
}

# Step 3: Verify asyncHandler import
Write-Host "`n[3/3] Verifying middleware..." -ForegroundColor Yellow
$middlewareContent = Get-Content middleware/authMiddleware.js -Raw
if ($middlewareContent -match "import asyncHandler from 'express-async-handler'") {
    Write-Host "✓ asyncHandler import found" -ForegroundColor Green
} else {
    Write-Host "✗ asyncHandler import missing!" -ForegroundColor Red
    Write-Host "Please check middleware/authMiddleware.js" -ForegroundColor Red
    exit 1
}

# Step 4: Start server
Write-Host "`n=== Starting Server ===" -ForegroundColor Cyan
Write-Host "Starting on port 5000..." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop`n" -ForegroundColor Gray

node server.js

