# Fixing Server Errors

## Error 1: Port Already in Use (EADDRINUSE)

If you see `Error: listen EADDRINUSE: address already in use :::5001`, follow these steps:

### Option 1: Kill the process using the port (Windows)
```powershell
# Find the process ID
netstat -ano | findstr :5001

# Kill the process (replace <PID> with the actual process ID)
taskkill /PID <PID> /F
```

### Option 2: Use the provided script
```powershell
# Run the kill-port script
.\kill-port.bat 5001
```

### Option 3: Change the port in .env
Edit `backend/.env` and change:
```
PORT=5000
```

## Error 2: asyncHandler is not defined

If you see `ReferenceError: asyncHandler is not defined`, this is usually a Node.js module caching issue.

### Solution:
1. **Stop the server** (Ctrl+C if running)
2. **Clear Node.js cache** (if any):
   ```powershell
   Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
   ```
3. **Restart the server**:
   ```powershell
   node server.js
   ```

If the error persists:
1. Make sure `express-async-handler` is installed:
   ```powershell
   npm install express-async-handler
   ```
2. Verify the import in `backend/middleware/authMiddleware.js`:
   ```javascript
   import asyncHandler from 'express-async-handler';
   ```

## Quick Fix Script

Run this to kill port 5001 and restart:
```powershell
# Kill port 5001
$process = Get-NetTCPConnection -LocalPort 5001 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force; Write-Host "Killed process on port 5001" }

# Start server
node server.js
```

