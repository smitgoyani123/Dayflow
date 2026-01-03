# How to Start the Dayflow HRMS Application

## Quick Start

The application requires **TWO terminals** - one for the backend and one for the frontend.

### Terminal 1: Start Backend Server

```bash
cd backend
npm install  # Only needed first time
npm run dev
```

The backend will start on **http://localhost:5000**

### Terminal 2: Start Frontend

```bash
# From the root directory
npm install  # Only needed first time
npm run dev
```

The frontend will start on **http://localhost:5173**

## Troubleshooting

### Backend Won't Start

1. **Check if port 5000 is in use:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Mac/Linux
   lsof -i :5000
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Check MongoDB:**
   - The app will try to connect to MongoDB
   - If MongoDB is not installed, it will try to use an embedded database
   - For best results, install MongoDB locally or use MongoDB Atlas

### Frontend Connection Errors

If you see `ECONNREFUSED` errors:
- **Make sure the backend is running first!**
- The frontend depends on the backend API
- Start backend in Terminal 1, then frontend in Terminal 2

### MongoDB Issues

**Option 1: Install MongoDB Locally**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Update `backend/.env` with your connection string

**Option 2: Use MongoDB Atlas (Cloud)**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Get connection string
- Update `MONGO_URI` in `backend/.env`

**Option 3: Use Embedded Database**
- Install: `npm install mongodb-memory-server --save-dev` in backend folder
- The app will automatically use it if local MongoDB is not available

## Environment Variables

Make sure `backend/.env` exists with:
```
MONGO_URI=mongodb://localhost:27017/dayflow
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

## Testing the Setup

1. Start backend - you should see:
   ```
   ✅ MongoDB Connected: ...
   🚀 Dayflow HRMS Backend Server
   📍 Running on: http://localhost:5000
   ```

2. Start frontend - you should see:
   ```
   VITE v7.x.x  ready in xxx ms
   ➜  Local:   http://localhost:5173/
   ```

3. Open browser to http://localhost:5173
4. Login with seeded credentials:
   - Admin: `admin@dayflow.com` / `password123`
   - Employee: `employee@dayflow.com` / `password123`

## Seeding the Database

To create test data:
```bash
cd backend
npm run seed
```

This creates:
- Admin user: admin@dayflow.com / password123
- Employee user: employee@dayflow.com / password123


