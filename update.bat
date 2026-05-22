@echo off
echo Francois - Atualizacao
echo ======================
echo.

REM Verificar se o Docker esta em execucao
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Docker nao esta em execucao.
    echo Por favor, inicie o Docker Desktop e tente novamente.
    pause
    exit /b 1
)

echo [INFO] Reconstruindo imagem Docker com a versao mais recente do Francinette...
echo [INFO] Isso pode levar varios minutos...
docker build -t francois -f "%USERPROFILE%\francois\Dockerfile" "%USERPROFILE%\francois" --no-cache

if %errorlevel% neq 0 (
    echo [ERRO] Falha ao reconstruir imagem Docker.
    echo Verifique sua conexao com a internet e as configuracoes do Docker.
    pause
    exit /b 1
)

echo.
echo [SUCESSO] Atualizacao concluida!
echo.
pause
