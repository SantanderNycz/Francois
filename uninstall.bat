@echo off
echo Francois - Desinstalacao
echo ========================
echo.

echo Removendo imagem Docker...
docker rmi francois

echo.
echo Removendo atalho da area de trabalho...
set "SHORTCUT_PATH=%USERPROFILE%\Desktop\Paco.lnk"
if exist "%SHORTCUT_PATH%" del "%SHORTCUT_PATH%"

echo.
echo Removendo diretorio de instalacao...
set "INSTALL_DIR=%USERPROFILE%\francois"
if exist "%INSTALL_DIR%" rmdir /s /q "%INSTALL_DIR%"

echo.
echo Desinstalacao concluida!
echo.
echo Nota: Remova manualmente "%USERPROFILE%\francois" do seu PATH se necessario.
echo.
pause
