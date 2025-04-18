@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo      INSTALACAO DO FRANCOIS (Francinette para Windows)
echo ===================================================
echo.

REM Verificar se esta executando como administrador
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [AVISO] Este script nao esta sendo executado como Administrador.
    echo Alguns recursos podem nao funcionar corretamente.
    echo Considere executar como Administrador se encontrar problemas.
    echo.
    pause
)

REM Verificar se o Docker esta instalado
echo [INFO] Verificando se o Docker esta instalado...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Docker nao esta instalado ou nao esta no PATH.
    echo Por favor, instale o Docker Desktop para Windows primeiro.
    echo Visite: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

REM Verificar se o Docker esta em execucao
echo [INFO] Verificando se o Docker esta em execucao...
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] Docker nao esta em execucao.
    echo Por favor, inicie o Docker Desktop e tente novamente.
    pause
    exit /b 1
)

REM Criar diretorio de instalacao
echo [INFO] Criando diretorio de instalacao...
set "INSTALL_DIR=%USERPROFILE%\francois"
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"
cd "%INSTALL_DIR%"

REM Criar Dockerfile diretamente (sem usar echo)
echo [INFO] Criando Dockerfile...
>Dockerfile (
    echo FROM ubuntu:22.04
    echo.
    echo # Instalar dependencias
    echo RUN apt-get update ^&^& apt-get install -y \
    echo     python3 \
    echo     python3-pip \
    echo     python3-venv \
    echo     git \
    echo     curl \
    echo     lsb-release \
    echo     sudo \
    echo     build-essential \
    echo     clang \
    echo     make \
    echo     valgrind \
    echo     zsh \
    echo     wget \
    echo     pkg-config \
    echo     libssl-dev \
    echo     ^&^& apt-get clean
    echo.
    echo # Configurar diretorio de trabalho
    echo WORKDIR /francinette
    echo.
    echo # Clonar o repositorio original do francinette
    echo RUN git clone https://github.com/xicodomingues/francinette.git .
    echo.
    echo # Instalar francinette
    echo RUN ./bin/install.sh -y
    echo.
    echo # Criar um script wrapper para executar o francinette
    echo RUN bash -c "echo -e '#!/bin/bash\ncd /project\n/francinette/bin/francinette \"\$@\"' > /usr/local/bin/paco && chmod +x /usr/local/bin/paco"
    echo.
    echo # Definir o diretorio de trabalho para /project
    echo WORKDIR /project
    echo.
    echo # Definir o entrypoint para o script paco
    echo ENTRYPOINT ["/usr/local/bin/paco"]
)

REM Criar script paco.bat
echo [INFO] Criando script paco.bat...
>"%INSTALL_DIR%\paco.bat" (
    echo @echo off
    echo setlocal
    echo.
    echo REM Obter diretorio atual
    echo set CURRENT_DIR=%%cd%%
    echo.
    echo REM Executar francinette no Docker com o diretorio atual montado
    echo docker run --rm -it -v "%%CURRENT_DIR%%:/project" francois %%*
    echo.
    echo endlocal
)

REM Criar README.md
echo [INFO] Criando README.md...
>README.md (
    echo # François
    echo.
    echo Uma versao nativa para Windows do testador Francinette para projetos da 42, sem necessidade de Ubuntu ou WSL.
    echo.
    echo ## Pré-requisitos
    echo.
    echo - [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/^)
    echo - [Git para Windows](https://git-scm.com/download/win^)
    echo.
    echo ## Uso
    echo.
    echo Uma vez instalado, você pode usar o comando `paco` de qualquer diretório contendo seu projeto da 42:
    echo.
    echo ```
    echo cd caminho\para\seu\projeto
    echo paco
    echo ```
    echo.
    echo ### Comandos Comuns
    echo.
    echo - `paco`: Executar todos os testes para o projeto atual
    echo - `paco -h`: Mostrar ajuda
    echo - `paco -u`: Atualizar François
    echo - `paco -c`: Limpar arquivos temporários
    echo.
    echo ## Projetos Suportados
    echo.
    echo - libft
    echo - get_next_line
    echo - ft_printf
    echo - Born2beroot
    echo - minitalk
    echo - push_swap
    echo - pipex
    echo - philosophers
    echo - E mais!
    echo.
    echo ## Como Funciona
    echo.
    echo Esta versão para Windows do Francinette usa Docker para criar um contêiner Linux que executa o testador Francinette original. O comando `paco` monta automaticamente seu diretório atual no contêiner, permitindo que os testes sejam executados em seu código sem exigir WSL ou Ubuntu.
    echo.
    echo ## Solução de Problemas
    echo.
    echo ### Docker não está em execução
    echo Certifique-se de que o Docker Desktop esteja em execução antes de usar o François.
    echo.
    echo ### Problemas de PATH
    echo Se o comando `paco` não for reconhecido, certifique-se de que o diretório de instalação esteja na variável de ambiente PATH.
    echo.
    echo ### Erros de permissão de arquivo
    echo Se encontrar erros de permissão, tente executar o prompt de comando ou PowerShell como Administrador.
    echo.
    echo ### Erros de build do Docker
    echo Se encontrar erros durante o processo de build do Docker, tente executar o Docker Desktop como Administrador e certifique-se de ter uma conexão estável com a internet.
    echo.
    echo ## Créditos
    echo.
    echo Este projeto é baseado no [Francinette](https://github.com/xicodomingues/francinette^) original por xicodomingues e no [francinette-image](https://github.com/WaRtr0/francinette-image^) por WaRtr0.
)

REM Criar script de desinstalacao
echo [INFO] Criando script de desinstalacao...
>"%INSTALL_DIR%\uninstall.bat" (
    echo @echo off
    echo echo Francois - Desinstalacao
    echo echo =======================
    echo echo.
    echo.
    echo echo Removendo imagem Docker...
    echo docker rmi francois
    echo.
    echo REM Remover atalho da area de trabalho
    echo echo Removendo atalho da area de trabalho...
    echo set "DESKTOP_PATH=%%USERPROFILE%%\Desktop"
    echo set "SHORTCUT_PATH=%%DESKTOP_PATH%%\Paco.lnk"
    echo if exist "%%SHORTCUT_PATH%%" del "%%SHORTCUT_PATH%%"
    echo.
    echo echo.
    echo echo Desinstalacao concluida!
    echo echo.
    echo echo Nota: Talvez seja necessario remover manualmente o diretorio de instalacao do seu PATH.
    echo echo.
    echo pause
)

REM Exibir o conteúdo do Dockerfile para verificação
echo.
echo [INFO] Conteúdo do Dockerfile gerado:
echo -----------------------------------
type Dockerfile
echo -----------------------------------
echo.

REM Construir imagem Docker
echo [INFO] Construindo imagem Docker do Francois...
echo [INFO] Isso pode levar varios minutos dependendo da sua conexao com a internet...
docker build -t francois -f Dockerfile . --no-cache

if %errorlevel% neq 0 (
    echo [ERRO] Falha ao construir imagem Docker.
    echo Por favor, verifique sua conexao com a internet e as configuracoes do Docker.
    pause
    exit /b 1
)

REM Criar atalho na area de trabalho
echo [INFO] Criando atalho na area de trabalho...
set "SCRIPT_PATH=%INSTALL_DIR%\paco.bat"
set "DESKTOP_PATH=%USERPROFILE%\Desktop"
set "SHORTCUT_PATH=%DESKTOP_PATH%\Paco.lnk"

powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%SHORTCUT_PATH%'); $Shortcut.TargetPath = '%SCRIPT_PATH%'; $Shortcut.Save()"

REM Adicionar ao PATH
echo [INFO] Adicionando ao PATH...
setx PATH "%PATH%;%INSTALL_DIR%" /M

echo.
echo [SUCESSO] Instalacao concluida!
echo.
echo Voce agora pode usar o comando 'paco' para executar o Francois.
echo Exemplo: paco -h
echo.
echo Um atalho foi criado na sua area de trabalho.
echo.
echo Diretorio de instalacao: %INSTALL_DIR%
echo.
pause