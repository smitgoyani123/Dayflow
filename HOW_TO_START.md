# 🚀 How to Start Dayflow HRMS

## ⚠️ IMPORTANT: You Need TWO Terminal Windows!

The application requires **both frontend AND backend** to be running simultaneously.

---

## Quick Start (Easiest Method)

### Windows:
**Double-click `start.bat`** - This will start both servers automatically!

### Mac/Linux:
```bash
chmod +x start.sh
./start.sh
```

---

## Manual Start (Step by Step)

### Step 1: Start Backend Server

**Open Terminal/PowerShell Window 1:**

**Windows:**
```powershell
cd C:\Dayflow\backend
npm run dev
```

**Mac/Linux:**
```bash
cd backend
npm run dev
```

**✅ Wait until you see:**
```
✅ MongoDB Connected: ...
========================================
🚀 Dayflow HRMS Backend Server
📍 Running on: http://localhost:5000
========================================
```

**⚠️ KEEP THIS WINDOW OPEN!**

---

### Step 2: Start Frontend

**Open Terminal/PowerShell Window 2:**

**Windows:**
```powershell
cd C:\Dayflow
npm run dev
```

**Mac/Linux:**
```bash
npm run dev
```

**✅ Wait until you see:**
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

### Step 3: Open Browser

Navigate to: **http://localhost:5173**

---

## Troubleshooting

### ❌ Connection Errors (ECONNREFUSED)

**Problem:** Backend server is not running

**Solution:**
1. Make sure backend is running in Terminal 1
2. Check that you see: `🚀 Dayflow HRMS Backend Server`
3. Test: Open http://localhost:5000 in browser (should show "Dayflow HRMS API is running...")

### ❌ Port Already in Use

**Solution:**
- The cleanup script runs automatically
- Or manually: Close any processes using ports 5000 or 5173

### ❌ Dependencies Not Installed

**Solution:**
```bash
# Backend
cd backend
npm install

# Frontend (from root)
npm install
```

### ❌ MongoDB Connection Issues

**Solution:**
- The app will try to use embedded MongoDB if local MongoDB is not available
- For best results, install MongoDB locally or use MongoDB Atlas

---

## Verify Everything is Working

1. ✅ Backend running: http://localhost:5000 shows "Dayflow HRMS API is running..."
2. ✅ Frontend running: http://localhost:5173 shows the login page
3. ✅ No connection errors in browser console
4. ✅ Can login with test credentials:
   - Admin: `admin@dayflow.com` / `password123`
   - Employee: `employee@dayflow.com` / `password123`

---

## Need Help?

- Check `QUICK_FIX.md` for common issues
- Check `START_BACKEND_NOW.md` for urgent backend startup
- Check `README.md` for full documentation


