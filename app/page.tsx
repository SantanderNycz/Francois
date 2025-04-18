"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleDownload = () => {
    // Criar o conteúdo do script de instalação
    const installScriptContent = `@echo off
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
set "INSTALL_DIR=%USERPROFILE%\\francois"
if not exist "%INSTALL_DIR%" mkdir "%INSTALL_DIR%"
cd "%INSTALL_DIR%"

REM Criar Dockerfile
echo [INFO] Criando Dockerfile...
(
echo FROM ubuntu:22.04
echo.
echo # Instalar dependencias
echo RUN apt-get update ^&^& apt-get install -y \\
echo     python3 \\
echo     python3-pip \\
echo     python3-venv \\
echo     git \\
echo     curl \\
echo     lsb-release \\
echo     sudo \\
echo     build-essential \\
echo     clang \\
echo     make \\
echo     valgrind \\
echo     zsh \\
echo     wget \\
echo     pkg-config \\
echo     libssl-dev \\
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
echo RUN echo '#!/bin/bash\\n\\
echo cd /project\\n\\
echo /francinette/bin/francinette "$@"' ^> /usr/local/bin/paco ^&^& \\
echo     chmod +x /usr/local/bin/paco
echo.
echo # Definir o diretorio de trabalho para /project
echo WORKDIR /project
echo.
echo # Definir o entrypoint para o script paco
echo ENTRYPOINT ["/usr/local/bin/paco"]
) > Dockerfile

REM Criar script paco.bat
echo [INFO] Criando script paco.bat...
(
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
) > "%INSTALL_DIR%\\paco.bat"

REM Criar README.md
echo [INFO] Criando README.md...
(
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
echo Uma vez instalado, você pode usar o comando \`paco\` de qualquer diretório contendo seu projeto da 42:
echo.
echo \`\`\`
echo cd caminho\\para\\seu\\projeto
echo paco
echo \`\`\`
echo.
echo ### Comandos Comuns
echo.
echo - \`paco\`: Executar todos os testes para o projeto atual
echo - \`paco -h\`: Mostrar ajuda
echo - \`paco -u\`: Atualizar François
echo - \`paco -c\`: Limpar arquivos temporários
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
echo Esta versão para Windows do Francinette usa Docker para criar um contêiner Linux que executa o testador Francinette original. O comando \`paco\` monta automaticamente seu diretório atual no contêiner, permitindo que os testes sejam executados em seu código sem exigir WSL ou Ubuntu.
echo.
echo ## Solução de Problemas
echo.
echo ### Docker não está em execução
echo Certifique-se de que o Docker Desktop esteja em execução antes de usar o François.
echo.
echo ### Problemas de PATH
echo Se o comando \`paco\` não for reconhecido, certifique-se de que o diretório de instalação esteja na variável de ambiente PATH.
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
) > README.md

REM Criar script de desinstalacao
echo [INFO] Criando script de desinstalacao...
(
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
echo set "DESKTOP_PATH=%%USERPROFILE%%\\Desktop"
echo set "SHORTCUT_PATH=%%DESKTOP_PATH%%\\Paco.lnk"
echo if exist "%%SHORTCUT_PATH%%" del "%%SHORTCUT_PATH%%"
echo.
echo echo.
echo echo Desinstalacao concluida!
echo echo.
echo echo Nota: Talvez seja necessario remover manualmente o diretorio de instalacao do seu PATH.
echo echo.
echo pause
) > "%INSTALL_DIR%\\uninstall.bat"

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
set "SCRIPT_PATH=%INSTALL_DIR%\\paco.bat"
set "DESKTOP_PATH=%USERPROFILE%\\Desktop"
set "SHORTCUT_PATH=%DESKTOP_PATH%\\Paco.lnk"

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
pause`

    // Criar o blob e iniciar o download
    const blob = new Blob([installScriptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "install-francois.bat"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-slate-50">
      <div className="max-w-5xl w-full">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">François</h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            A native Windows version of the 42 project tester without WSL or Ubuntu
          </p>
        </div>

        <Tabs defaultValue="install" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="install">Installation</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="projects">Supported Projects</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>

          <TabsContent value="install" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
                <CardDescription>Make sure you have the following installed on your Windows system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 p-1 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Docker Desktop for Windows</h3>
                      <p className="text-sm text-slate-500">
                        Download and install from{" "}
                        <a
                          href="https://www.docker.com/products/docker-desktop/"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          docker.com
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500 p-1 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Git for Windows</h3>
                      <p className="text-sm text-slate-500">
                        Download and install from{" "}
                        <a
                          href="https://git-scm.com/download/win"
                          className="text-blue-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          git-scm.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Installation</CardTitle>
                <CardDescription>Follow these steps to install François</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-900 rounded-md p-4 text-white font-mono text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">1.</span>
                    <span>Download the installer script using the button below</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">2.</span>
                    <span>Right-click on install-francois.bat and select "Run as administrator"</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">3.</span>
                    <span>Follow the on-screen instructions</span>
                  </p>
                </div>
                <p className="text-sm text-slate-600">
                  The installation script will automatically set up everything you need, including:
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                  <li>Creating all necessary files</li>
                  <li>Building the Docker container</li>
                  <li>Creating shortcuts for easy access</li>
                  <li>Adding the command to your PATH</li>
                </ul>
              </CardContent>
              <CardFooter>
                {isClient && (
                  <Button className="w-full" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Installer Script
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Usage</CardTitle>
                <CardDescription>How to use François to test your 42 projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-900 rounded-md p-4 text-white font-mono text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">$</span>
                    <span>cd path\to\your\project</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">$</span>
                    <span>paco</span>
                  </p>
                </div>
                <p className="text-sm text-slate-600">
                  The <code>paco</code> command will automatically detect your project type and run the appropriate
                  tests.
                </p>

                <div className="bg-slate-900 rounded-md p-4 text-white font-mono text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">$</span>
                    <span>paco -h</span>
                  </p>
                </div>
                <p className="text-sm text-slate-600">
                  Use the <code>-h</code> flag to see all available options.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Usage</CardTitle>
                <CardDescription>Additional commands and options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-900 rounded-md p-4 text-white font-mono text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">$</span>
                    <span>paco -u</span>
                  </p>
                </div>
                <p className="text-sm text-slate-600">Update François to the latest version.</p>

                <div className="bg-slate-900 rounded-md p-4 text-white font-mono text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-slate-500">$</span>
                    <span>paco -c</span>
                  </p>
                </div>
                <p className="text-sm text-slate-600">Clean temporary files and cached results.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supported 42 Projects</CardTitle>
                <CardDescription>François supports the same projects as the original Francinette</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900">libft</h3>
                    <p className="text-sm text-slate-500">Your first library</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900">get_next_line</h3>
                    <p className="text-sm text-slate-500">Reading a line from a fd</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900">ft_printf</h3>
                    <p className="text-sm text-slate-500">Recode printf</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900">Born2beroot</h3>
                    <p className="text-sm text-slate-500">System administration</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900">minitalk</h3>
                    <p className="text-sm text-slate-500">UNIX signals</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900">push_swap</h3>
                    <p className="text-sm text-slate-500">Sorting algorithms</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900">pipex</h3>
                    <p className="text-sm text-slate-500">UNIX pipes</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <h3 className="font-medium text-slate-900">philosophers</h3>
                    <p className="text-sm text-slate-500">Threads and mutexes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
                <CardDescription>Solutions to frequently encountered problems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h3 className="font-medium">Docker not running</h3>
                  <p className="text-sm text-slate-600">
                    Make sure Docker Desktop is running before using François. You can check by looking for the Docker
                    icon in your system tray.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h3 className="font-medium">Path issues</h3>
                  <p className="text-sm text-slate-600">
                    If the <code>paco</code> command is not recognized, make sure the installation directory is in your
                    PATH environment variable.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h3 className="font-medium">File permission errors</h3>
                  <p className="text-sm text-slate-600">
                    If you encounter permission errors, try running the command prompt or PowerShell as Administrator.
                  </p>
                </div>

                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <h3 className="font-medium">Docker build errors</h3>
                  <p className="text-sm text-slate-600">
                    If you encounter errors during the Docker build process, try running Docker Desktop as Administrator
                    and ensure you have a stable internet connection.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
