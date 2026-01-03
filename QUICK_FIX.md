# Quick Fix for Connection Errors

## The Problem
You're seeing `ECONNREFUSED` errors because the **backend server is not running**.

## The Solution (2 Steps)

### Step 1: Start Backend Server

**Windows:**
- Double-click `start-backend.bat` OR
- Open a **NEW terminal** and run:
```bash
cd backend
npm run dev
```

**Mac/Linux:**
- Run `chmod +x start-backend.sh && ./start-backend.sh` OR
- Open a **NEW terminal** and run:
```bash
cd backend
npm run dev
```

Wait until you see:
```
✅ MongoDB Connected: ...
🚀 Dayflow HRMS Backend Server
📍 Running on: http://localhost:5000
```

### Step 2: Keep Frontend Running
Your frontend is already running. Once the backend starts, the errors will disappear!

## What's Happening?

- **Frontend** (port 5173) - ✅ Running
- **Backend** (port 5000) - ❌ Not running (this is the problem!)

The frontend tries to connect to the backend API, but since the backend isn't running, you get connection errors.

## Quick Test

1. Start backend: `cd backend && npm run dev`
2. Wait 5 seconds
3. Refresh your browser (http://localhost:5173)
4. Errors should be gone! ✅

## Still Having Issues?

### Check if backend is running:
- Look for: `🚀 Dayflow HRMS Backend Server` in terminal
- Check: http://localhost:5000 in browser (should show "Dayflow HRMS API is running...")

### Check if port 5000 is free:
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux  
lsof -i :5000
```

### Install dependencies:
```bash
cd backend
npm install
```

## Need Both Servers?

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

Both must run simultaneously!

