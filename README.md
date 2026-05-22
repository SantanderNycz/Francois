# François

Versão alternativa do [Francinette](https://github.com/xicodomingues/francinette) para **Windows**, sem precisar de WSL ou Ubuntu.

Usa Docker para rodar o testador dentro de um container Linux. O comando `paco` monta automaticamente o diretório do seu projeto no container.

---

## Pré-requisitos

- [Docker Desktop para Windows](https://www.docker.com/products/docker-desktop/)
- [Git para Windows](https://git-scm.com/download/win)

---

## Instalação

### Opção 1 — via página web (recomendado)

```bash
# Clone o repositório
git clone https://github.com/SantanderNycz/Francois.git
cd Francois

# Instale as dependências e inicie
pnpm install
pnpm dev
```

Acesse `http://localhost:3000` e clique em **baixar install-francois.bat**.  
Depois, clique com botão direito no arquivo baixado → **Executar como Administrador**.

### Opção 2 — direto pelo script

```bash
git clone https://github.com/SantanderNycz/Francois.git
cd Francois
```

Clique com botão direito em `install.bat` → **Executar como Administrador**.

---

O instalador irá:
- Criar `%USERPROFILE%\francois\` com o Dockerfile e o `paco.bat`
- Construir a imagem Docker `francois` (~5 min na primeira vez)
- Adicionar `paco` ao PATH do usuário
- Criar atalho na área de trabalho

---

## Uso

```bash
cd caminho\para\seu\projeto\42
paco
```

| Comando | Descrição |
|---|---|
| `paco` | Rodar todos os testes |
| `paco libft` | Testar projeto específico |
| `paco -h` | Mostrar ajuda |
| `paco -c` | Limpar arquivos temporários |

---

## Projetos suportados

Os mesmos que o Francinette original:
`libft` · `get_next_line` · `ft_printf` · `born2beroot` · `minitalk` · `push_swap` · `pipex` · `philosophers`

---

## Desinstalação

```bash
%USERPROFILE%\francois\uninstall.bat
```

Ou execute `uninstall.bat` na raiz do repositório clonado.

---

## Solução de problemas

**`paco` não é reconhecido**  
→ Reinicie o terminal após a instalação para recarregar o PATH.

**Docker não está em execução**  
→ Abra o Docker Desktop antes de usar o `paco`.

**Falha no build do Docker**  
→ Verifique sua internet e se o Docker Desktop está atualizado.

**Erros de permissão**  
→ Execute o `install.bat` como Administrador.

---

## Créditos

Baseado no [Francinette](https://github.com/xicodomingues/francinette) original por [xicodomingues](https://github.com/xicodomingues).
