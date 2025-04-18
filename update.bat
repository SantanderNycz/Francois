@echo off
echo Francinette for Windows - Update
echo ==============================
echo.

REM Check if Docker is running
docker info > nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not running.
    echo Please start Docker Desktop and try again.
    exit /b 1
)

echo Pulling latest changes...
git pull

echo Rebuilding Docker image...
docker build -t francinette-windows -f Dockerfile .

if %errorlevel% neq 0 (
    echo Error: Failed to build Docker image.
    exit /b 1
)

echo.
echo Update complete!
echo.
pause
