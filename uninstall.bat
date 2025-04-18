@echo off
echo Francinette for Windows - Uninstallation
echo =======================================
echo.

echo Removing Docker image...
docker rmi francinette-windows

echo.
echo Uninstallation complete!
echo.
echo Note: You may need to manually remove the installation directory from your PATH.
echo.
pause
