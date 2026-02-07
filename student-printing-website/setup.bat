@echo off
echo Setting up Student Print Hub Application...
echo.

echo 1. Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend setup failed!
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed successfully!
echo.

echo 2. Installing Frontend Dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend setup failed!
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed successfully!
echo.

echo 3. Creating uploads directory...
cd ../backend
if not exist "uploads" mkdir uploads
echo ✅ Uploads directory created!
echo.

echo 🎉 Setup completed successfully!
echo.
echo Next steps:
echo 1. Make sure MongoDB is installed and running
echo 2. Run 'start.bat' to launch the application
echo 3. Visit http://localhost:5500 to use the website
echo 4. Visit http://localhost:3000/api/admin for admin dashboard
echo.
echo Press any key to exit...
pause >nul