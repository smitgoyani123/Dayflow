# ⚠️ URGENT: Start Backend Server Now!

## You're seeing connection errors because the backend is NOT running!

### Quick Fix (Windows):

**Option 1: Use the startup script**
1. Double-click `start-backend.bat` in the project root

**Option 2: Manual start**
1. Open a **NEW PowerShell/Command Prompt** window
2. Run these commands:
```powershell
cd C:\Dayflow\backend
npm run dev
```

### What You Should See:

When the backend starts successfully, you'll see:
```
✅ MongoDB Connected: ...
========================================
🚀 Dayflow HRMS Backend Server
📍 Running on: http://localhost:5000
🌍 Environment: development
========================================
```

### After Backend Starts:

1. **Keep the backend terminal open** (don't close it!)
2. Go back to your frontend terminal
3. **Refresh your browser** (http://localhost:5173)
4. The connection errors will disappear! ✅

### Important Notes:

- ✅ **Frontend is already running** on port 5173
- ❌ **Backend needs to be started** on port 5000
- 🔄 **Both must run at the same time!**

### Troubleshooting:

**If backend won't start:**
```powershell
cd backend
npm install
npm run dev
```

**If port 5000 is in use:**
- The cleanup script should handle this automatically
- Or manually kill the process using port 5000

**Test if backend is running:**
- Open browser: http://localhost:5000
- Should show: "Dayflow HRMS API is running..."


