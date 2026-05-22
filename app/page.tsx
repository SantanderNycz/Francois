"use client"

import { useState, type ReactNode } from "react"
import { Download } from "lucide-react"

const tr = {
  pt: {
    terminalTitle: "francois — terminal",
    prompt: "francois --help",
    subtitle: "Francinette para Windows · sem WSL · sem Ubuntu",
    tabs: ["instalar", "uso", "projetos", "ajuda"],
    install: {
      s1: "# pré-requisitos",
      prereqs: [
        { label: "Docker Desktop", note: "para Windows", href: "https://www.docker.com/products/docker-desktop/" },
        { label: "Git", note: "para Windows", href: "https://git-scm.com/download/win" },
      ],
      s2: "# como instalar",
      steps: [
        "1  baixe o script com o botão abaixo",
        "2  clique com botão direito → Executar como Administrador",
        "3  aguarde o build do Docker (~5 min)",
      ],
      s3: "# o instalador cria",
      creates: [
        "~/francois/  com Dockerfile e paco.bat",
        "imagem Docker  francois",
        "paco  no PATH do usuário",
        "atalho  na área de trabalho",
      ],
      btn: "baixar install-francois.bat",
    },
    usage: {
      s1: "# uso básico",
      hint: "execute paco dentro do diretório do seu projeto 42:",
      s2: "# comandos",
      cmds: [
        { cmd: "paco",         note: "rodar todos os testes" },
        { cmd: "paco libft",   note: "testar projeto específico" },
        { cmd: "paco -h",      note: "mostrar ajuda" },
        { cmd: "paco -c",      note: "limpar arquivos temporários" },
      ],
    },
    projects: {
      s1: "# projetos suportados",
      hint: "os mesmos que o Francinette original:",
    },
    help: {
      s1: "# solução de problemas",
      items: [
        { lvl: "ERRO",   title: "Docker não está em execução",   desc: "inicie o Docker Desktop antes de usar o paco." },
        { lvl: "ERRO",   title: "paco: command not found",        desc: "reinicie o terminal após a instalação para recarregar o PATH." },
        { lvl: "ERRO",   title: "falha no build do Docker",       desc: "verifique sua internet e se o Docker Desktop está atualizado." },
        { lvl: "AVISO",  title: "erros de permissão",             desc: "execute o script de instalação como Administrador." },
      ],
    },
    footer: "baseado no Francinette por xicodomingues",
  },
  en: {
    terminalTitle: "francois — terminal",
    prompt: "francois --help",
    subtitle: "Francinette for Windows · no WSL · no Ubuntu",
    tabs: ["install", "usage", "projects", "help"],
    install: {
      s1: "# prerequisites",
      prereqs: [
        { label: "Docker Desktop", note: "for Windows", href: "https://www.docker.com/products/docker-desktop/" },
        { label: "Git", note: "for Windows", href: "https://git-scm.com/download/win" },
      ],
      s2: "# how to install",
      steps: [
        "1  download the script with the button below",
        "2  right-click → Run as Administrator",
        "3  wait for Docker build (~5 min)",
      ],
      s3: "# the installer creates",
      creates: [
        "~/francois/  with Dockerfile and paco.bat",
        "Docker image  francois",
        "paco  in user PATH",
        "shortcut  on desktop",
      ],
      btn: "download install-francois.bat",
    },
    usage: {
      s1: "# basic usage",
      hint: "run paco inside your 42 project directory:",
      s2: "# commands",
      cmds: [
        { cmd: "paco",         note: "run all tests" },
        { cmd: "paco libft",   note: "test specific project" },
        { cmd: "paco -h",      note: "show help" },
        { cmd: "paco -c",      note: "clean temp files" },
      ],
    },
    projects: {
      s1: "# supported projects",
      hint: "same as the original Francinette:",
    },
    help: {
      s1: "# troubleshooting",
      items: [
        { lvl: "ERROR",  title: "Docker is not running",    desc: "start Docker Desktop before using paco." },
        { lvl: "ERROR",  title: "paco: command not found",  desc: "restart your terminal after installation to reload PATH." },
        { lvl: "ERROR",  title: "Docker build failed",      desc: "check your internet connection and make sure Docker Desktop is up to date." },
        { lvl: "WARN",   title: "permission errors",        desc: "run the installation script as Administrator." },
      ],
    },
    footer: "based on Francinette by xicodomingues",
  },
}

const PROJECTS = [
  { name: "libft",          desc: "first library" },
  { name: "get_next_line",  desc: "read line from fd" },
  { name: "ft_printf",      desc: "recode printf" },
  { name: "born2beroot",    desc: "system administration" },
  { name: "minitalk",       desc: "unix signals" },
  { name: "push_swap",      desc: "sorting algorithms" },
  { name: "pipex",          desc: "unix pipes" },
  { name: "philosophers",   desc: "threads & mutexes" },
]

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt")
  const [tab, setTab] = useState(0)
  const t = tr[lang]

  const handleDownload = () => {
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
    echo [INFO] Docker nao encontrado no PATH. Buscando instalacao...
    set "DOCKER_BIN="
    for /f "delims=" %%i in ('where /r "%PROGRAMFILES%\Docker" docker.exe 2^>nul') do (
        if not defined DOCKER_BIN set "DOCKER_BIN=%%~dpi"
    )
    if not defined DOCKER_BIN (
        for /f "delims=" %%i in ('where /r "%LOCALAPPDATA%\Programs\Docker" docker.exe 2^>nul') do (
            if not defined DOCKER_BIN set "DOCKER_BIN=%%~dpi"
        )
    )
    if defined DOCKER_BIN (
        set "PATH=!PATH!;!DOCKER_BIN!"
        echo [INFO] Docker encontrado em: !DOCKER_BIN!
    ) else (
        echo [ERRO] Docker nao encontrado nos caminhos padrao.
        echo Certifique-se de que o Docker Desktop esta instalado e tente:
        echo   1. Fechar e reabrir este terminal
        echo   2. Reiniciar o computador apos instalar o Docker Desktop
        pause
        exit /b 1
    )
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
echo ENV DEBIAN_FRONTEND=noninteractive
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
echo     ^&^& apt-get clean ^&^& rm -rf /var/lib/apt/lists/*
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
echo RUN echo '#!/bin/bash' ^> /usr/local/bin/paco ^&^& echo 'cd /project' ^>^> /usr/local/bin/paco ^&^& echo 'exec /francinette/bin/francinette "$@"' ^>^> /usr/local/bin/paco ^&^& chmod +x /usr/local/bin/paco
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
echo ## Créditos
echo.
echo Este projeto é baseado no [Francinette](https://github.com/xicodomingues/francinette^) original por xicodomingues.
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
echo echo Removendo atalho da area de trabalho...
echo set "SHORTCUT_PATH=%%USERPROFILE%%\\Desktop\\Paco.lnk"
echo if exist "%%SHORTCUT_PATH%%" del "%%SHORTCUT_PATH%%"
echo.
echo echo Removendo diretorio de instalacao...
echo rmdir /s /q "%%USERPROFILE%%\\francois"
echo.
echo echo Desinstalacao concluida!
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
setx PATH "%PATH%;%INSTALL_DIR%"

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

  const isErr = (lvl: string) => lvl === "ERRO" || lvl === "ERROR"

  return (
    <main className="min-h-screen bg-zinc-950 font-mono text-green-400 flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-3xl">

        {/* Terminal window */}
        <div className="rounded-lg overflow-hidden border border-zinc-800 shadow-2xl shadow-black/60">

          {/* Title bar */}
          <div className="bg-zinc-900 flex items-center gap-3 px-4 py-2.5 border-b border-zinc-800">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="flex-1 text-center text-xs text-zinc-500 select-none">
              {t.terminalTitle}
            </span>
            <button
              onClick={() => setLang(l => l === "pt" ? "en" : "pt")}
              className="text-xs text-zinc-500 hover:text-green-400 border border-zinc-700 hover:border-green-800 px-2 py-0.5 rounded transition-colors"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
          </div>

          {/* Prompt header */}
          <div className="px-6 py-5 bg-black border-b border-zinc-900">
            <p className="text-xs mb-3 flex items-center gap-1.5">
              <span className="text-green-600">user@francois</span>
              <span className="text-zinc-600">:</span>
              <span className="text-blue-500">~</span>
              <span className="text-zinc-600">$</span>
              <span className="text-zinc-400">{t.prompt}</span>
              <span className="inline-block w-1.5 h-4 bg-zinc-400 animate-pulse" />
            </p>
            <h1 className="text-green-300 text-2xl font-bold tracking-widest">François</h1>
            <p className="text-zinc-500 text-sm mt-1">{t.subtitle}</p>
          </div>

          {/* Tab bar */}
          <div className="bg-zinc-900 border-b border-zinc-800 flex overflow-x-auto scrollbar-none">
            {t.tabs.map((label, i) => (
              <button
                key={i}
                onClick={() => setTab(i)}
                className={`px-5 py-2.5 text-sm border-b-2 whitespace-nowrap transition-colors ${
                  tab === i
                    ? "border-green-500 text-green-300 bg-black/40"
                    : "border-transparent text-zinc-600 hover:text-zinc-400"
                }`}
              >
                {tab === i && <span className="text-green-600 mr-1">▶</span>}
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-black/80 p-6 min-h-96 space-y-6">

            {/* ── INSTALL ── */}
            {tab === 0 && <>
              <Block label={t.install.s1}>
                {t.install.prereqs.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm py-0.5">
                    <span className="text-green-500 w-4 shrink-0">✓</span>
                    <a href={p.href} target="_blank" rel="noopener noreferrer"
                       className="text-green-400 hover:text-green-300 underline underline-offset-2">
                      {p.label}
                    </a>
                    <span className="text-zinc-700 text-xs"># {p.note}</span>
                  </div>
                ))}
              </Block>

              <Block label={t.install.s2}>
                {t.install.steps.map((s, i) => (
                  <p key={i} className="text-sm py-0.5 text-zinc-400">
                    <span className="text-zinc-700 mr-2">$</span>{s}
                  </p>
                ))}
              </Block>

              <Block label={t.install.s3}>
                {t.install.creates.map((c, i) => (
                  <p key={i} className="text-sm py-0.5 text-zinc-500">
                    <span className="text-zinc-700 mr-2">─</span>{c}
                  </p>
                ))}
              </Block>

              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm rounded border border-green-900 hover:border-green-600 bg-green-950/20 hover:bg-green-950/40 text-green-500 hover:text-green-300 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>$ {t.install.btn}</span>
              </button>
            </>}

            {/* ── USAGE ── */}
            {tab === 1 && <>
              <Block label={t.usage.s1}>
                <p className="text-zinc-600 text-xs mb-2">{t.usage.hint}</p>
                <div className="bg-zinc-950 border border-zinc-800 rounded p-3 space-y-0.5">
                  <p className="text-sm"><span className="text-zinc-700">$ </span><span className="text-green-300">cd ~/42/libft</span></p>
                  <p className="text-sm"><span className="text-zinc-700">$ </span><span className="text-green-300">paco</span></p>
                </div>
              </Block>

              <Block label={t.usage.s2}>
                <div className="bg-zinc-950 border border-zinc-800 rounded overflow-hidden">
                  {t.usage.cmds.map((c, i) => (
                    <div key={i} className="flex gap-4 px-3 py-2 border-b border-zinc-900 last:border-0 text-sm">
                      <span className="text-green-300 w-36 shrink-0">$ {c.cmd}</span>
                      <span className="text-zinc-600"># {c.note}</span>
                    </div>
                  ))}
                </div>
              </Block>
            </>}

            {/* ── PROJECTS ── */}
            {tab === 2 && <>
              <Block label={t.projects.s1}>
                <p className="text-zinc-600 text-xs mb-3">{t.projects.hint}</p>
                <div className="bg-zinc-950 border border-zinc-800 rounded p-3">
                  <p className="text-zinc-700 text-xs mb-3">$ ls -la ~/francinette/testers/</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                    {PROJECTS.map(p => (
                      <div key={p.name} className="flex gap-3 text-sm items-baseline">
                        <span className="text-zinc-800 text-xs shrink-0">drwxr-xr-x</span>
                        <span className="text-green-400 min-w-36">{p.name}/</span>
                        <span className="text-zinc-700 text-xs hidden sm:inline"># {p.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Block>
            </>}

            {/* ── HELP ── */}
            {tab === 3 && <>
              <Block label={t.help.s1}>
                <div className="space-y-2">
                  {t.help.items.map((item, i) => (
                    <div key={i} className="bg-zinc-950 border border-zinc-800 rounded p-3">
                      <p className="text-sm">
                        <span className={isErr(item.lvl) ? "text-red-400" : "text-yellow-500"}>
                          [{item.lvl}]
                        </span>
                        <span className="text-zinc-300 ml-2">{item.title}</span>
                      </p>
                      <p className="text-zinc-600 text-sm mt-1 pl-2 border-l border-zinc-800">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </Block>
            </>}

          </div>
        </div>

        {/* Footer */}
        <p className="text-zinc-700 text-xs text-center mt-4">
          François · {t.footer} ·{" "}
          <a
            href="https://github.com/xicodomingues/francinette"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-500 underline underline-offset-2"
          >
            github.com/xicodomingues/francinette
          </a>
        </p>

      </div>
    </main>
  )
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-zinc-600 text-xs mb-2 select-none">{label}</p>
      {children}
    </div>
  )
}
