#!/bin/bash

echo "========================================"
echo "Starting Dayflow Backend Server"
echo "========================================"
echo ""

cd backend

echo "Installing dependencies if needed..."
npm install

echo ""
echo "Starting server..."
npm run dev


