#!/bin/bash

echo "========================================"
echo "Starting Dayflow HRMS Application"
echo "========================================"
echo ""

echo "[1/2] Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

sleep 3

echo "[2/2] Starting Frontend..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Both servers are starting..."
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait


