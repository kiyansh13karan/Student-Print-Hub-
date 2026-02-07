@echo off
echo Starting Student Print Hub Application...
echo.

echo 1. Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm start"
echo Backend server starting on http://localhost:3000
echo.

echo 2. Starting Frontend Server...
cd ../frontend
start "Frontend Server" cmd /k "npm start"
echo Frontend server starting on http://localhost:5500
echo.

echo 3. Opening Admin Dashboard...
timeout /t 3 /nobreak >nul
start http://localhost:3000/api/admin

echo 4. Opening Website...
timeout /t 2 /nobreak >nul
start http://localhost:5500

echo.
echo ✅ Application started successfully!
echo.
echo 📊 Admin Dashboard: http://localhost:3000/api/admin
echo 🌐 Website: http://localhost:5500
echo 📡 API: http://localhost:3000/api
echo.
echo Press any key to exit...
pause >nul