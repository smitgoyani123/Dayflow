# Fix .env file - remove duplicates and keep only the first set of values
Write-Host "Fixing .env file..." -ForegroundColor Yellow

$envContent = Get-Content .env -ErrorAction SilentlyContinue

if ($envContent) {
    $cleanEnv = @{}
    $seen = @{}
    
    # Process each line, keeping first occurrence of each key
    foreach ($line in $envContent) {
        $trimmed = $line.Trim()
        if ($trimmed -and -not $trimmed.StartsWith('#')) {
            if ($trimmed -match '^([^=]+)=(.*)$') {
                $key = $matches[1].Trim()
                $value = $matches[2].Trim()
                
                if (-not $seen.ContainsKey($key)) {
                    $cleanEnv[$key] = $value
                    $seen[$key] = $true
                }
            }
        }
    }
    
    # Write cleaned .env file
    $output = @()
    foreach ($key in $cleanEnv.Keys) {
        $output += "$key=$($cleanEnv[$key])"
    }
    
    # Ensure required keys exist
    if (-not $cleanEnv.ContainsKey('PORT')) {
        $output += "PORT=5000"
    }
    if (-not $cleanEnv.ContainsKey('JWT_SECRET')) {
        $output += "JWT_SECRET=dayflow_super_secret_key_123!"
    }
    
    $output | Set-Content .env
    Write-Host "[OK] Fixed .env file" -ForegroundColor Green
    Write-Host "Current .env contents:" -ForegroundColor Cyan
    Get-Content .env | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "Creating new .env file..." -ForegroundColor Yellow
    @"
PORT=5000
MONGO_URI=mongodb+srv://yugyadav:cpvYNdTt4VRvzXjD@cluster0.pquuilc.mongodb.net/dayflow_hrms
JWT_SECRET=dayflow_super_secret_key_123!
NODE_ENV=development
"@ | Set-Content .env
    Write-Host "[OK] Created .env file" -ForegroundColor Green
}

