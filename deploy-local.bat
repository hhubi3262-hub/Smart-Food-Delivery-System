@echo off
echo ========================================
echo AFAMIA CAFE - Local Deployment Script
echo ========================================
echo.

echo Step 1: Checking MySQL...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: MySQL not found! Please install MySQL or XAMPP first.
    pause
    exit /b 1
)
echo MySQL found!

echo.
echo Step 2: Starting Backend Server...
start cmd /k "cd server && npm install && npm run dev"
timeout /t 5

echo.
echo Step 3: Starting Frontend Server...
start cmd /k "cd client && npm install && npm run dev"

echo.
echo ========================================
echo Deployment Started!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Press any key to open browser...
pause >nul

start http://localhost:3000

echo.
echo System is running!
echo Press Ctrl+C in each window to stop servers
pause
