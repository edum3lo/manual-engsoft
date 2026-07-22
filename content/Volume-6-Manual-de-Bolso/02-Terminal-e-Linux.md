# 02 — Terminal e Linux (referência rápida)

> Manual de Bolso · Volume 6. Entenda o porquê nos capítulos de SO/Linux do Volume 2.

---

## Navegação e arquivos

| Comando | O que faz |
|---------|-----------|
| `pwd` | Mostra o diretório atual (onde você está). |
| `ls` / `ls -la` | Lista arquivos / com detalhes, ocultos e permissões. |
| `cd <pasta>` | Entra na pasta. `cd ..` sobe um nível. `cd ~` vai para home. `cd -` volta à anterior. |
| `mkdir <pasta>` / `mkdir -p a/b/c` | Cria pasta / cria a árvore inteira. |
| `touch <arquivo>` | Cria um arquivo vazio (ou atualiza a data). |
| `cp <origem> <destino>` / `cp -r <pasta>` | Copia arquivo / pasta (recursivo). |
| `mv <origem> <destino>` | Move ou **renomeia**. |
| `rm <arquivo>` | ⚠️ Apaga arquivo (sem lixeira!). |
| `rm -rf <pasta>` | ⚠️⚠️ Apaga pasta e tudo dentro, à força. **Confira o caminho 3x.** |
| `cat <arquivo>` | Mostra o conteúdo inteiro. |
| `less <arquivo>` | Abre para leitura paginada (`q` sai, `/` busca). |
| `head -20 <arquivo>` / `tail -20 <arquivo>` | Primeiras / últimas 20 linhas. |
| `tail -f <arquivo>` | Segue o arquivo em tempo real (ótimo para **logs**). |

💡 Use **Tab** para autocompletar nomes e **↑/↓** para navegar no histórico de comandos.

---

## Buscar: `grep` e `find`

```bash
grep "texto" arquivo.txt          # acha linhas com "texto"
grep -r "texto" .                 # busca recursiva na pasta atual
grep -ri "texto" .                # -i = ignora maiúsc/minúsc
grep -rn "texto" .                # -n = mostra o número da linha
grep -rl "texto" .                # -l = só lista os arquivos que contêm
grep -v "texto" arquivo           # inverte: linhas que NÃO contêm

find . -name "*.js"               # acha arquivos .js na árvore
find . -type d -name "node_modules"   # acha pastas com esse nome
find . -name "*.log" -delete      # ⚠️ acha e apaga
find . -mtime -1                  # modificados nas últimas 24h
```

💡 Ferramentas modernas mais rápidas (se instaladas): `rg` (ripgrep) no lugar de `grep -r`, `fd` no lugar de `find`.

---

## Pipes e redirecionamento (o superpoder do terminal)

```bash
comando1 | comando2         # a saída de 1 vira a entrada de 2
comando > arquivo           # ⚠️ grava a saída no arquivo (sobrescreve)
comando >> arquivo          # anexa a saída ao fim do arquivo
comando 2> erros.log        # redireciona só os erros (stderr)
comando &> tudo.log         # saída + erros no mesmo arquivo
```

**Combinações úteis:**
```bash
ls -la | grep ".md"                 # lista só arquivos .md
cat log.txt | grep "ERROR" | wc -l  # conta quantas linhas têm "ERROR"
history | grep git                  # acha comandos git que você já rodou
ps aux | grep node                  # acha processos do node
du -sh * | sort -h                  # tamanho de cada item, ordenado
```

| Filtro comum | O que faz |
|--------------|-----------|
| `wc -l` | Conta linhas. |
| `sort` / `sort -h` / `sort -r` | Ordena / por tamanho legível / invertido. |
| `uniq` / `uniq -c` | Remove duplicatas / conta ocorrências. |
| `head -n` / `tail -n` | Primeiras / últimas n linhas. |
| `cut -d',' -f2` | Pega o 2º campo separado por vírgula. |
| `awk '{print $1}'` | Imprime a 1ª coluna. |
| `sed 's/a/b/g'` | Substitui "a" por "b". |

---

## Processos

| Comando | O que faz |
|---------|-----------|
| `ps aux` | Lista todos os processos. |
| `ps aux \| grep <nome>` | Acha um processo específico. |
| `top` / `htop` | Monitor de processos em tempo real (CPU, memória). `q` sai. |
| `kill <PID>` | Encerra o processo (educadamente). |
| `kill -9 <PID>` | ⚠️ Mata o processo à força. |
| `<comando> &` | Roda em segundo plano. |
| `jobs` / `fg` / `bg` | Lista jobs / traz para frente / manda para o fundo. |
| `Ctrl + C` | Interrompe o comando atual. |
| `Ctrl + Z` | Suspende (pausa) o comando atual. |

💡 **"Porta já em uso" (EADDRINUSE)?** Ache quem está usando: `lsof -i :3000` → `kill -9 <PID>`.

---

## Permissões (o `-rwxr-xr-x`)

```
- rwx r-x r-x
│  │   │   └── outros (o resto do mundo)
│  │   └────── grupo
│  └────────── dono
└───────────── tipo (- arquivo, d pasta, l link)
```
`r`=ler(4) `w`=escrever(2) `x`=executar(1).

| Comando | O que faz |
|---------|-----------|
| `chmod +x <arquivo>` | Torna executável. |
| `chmod 755 <arquivo>` | Dono: rwx(7); grupo/outros: r-x(5). |
| `chmod 644 <arquivo>` | Dono: rw-(6); grupo/outros: r--(4). |
| `chown user:grupo <arquivo>` | Muda dono e grupo. |
| `sudo <comando>` | ⚠️ Roda como administrador (root). |

---

## Rede e conectividade

| Comando | O que faz |
|---------|-----------|
| `ping <host>` | Testa se um host responde. |
| `curl <url>` | Faz uma requisição HTTP (ver [[05-HTTP-APIs-e-REST]]). |
| `curl -I <url>` | Só os headers da resposta. |
| `lsof -i :<porta>` | Mostra o que está usando uma porta. |
| `netstat -tulpn` / `ss -tulpn` | Portas abertas e quem escuta. |
| `nslookup <domínio>` / `dig <domínio>` | Resolve o DNS de um domínio. |
| `ssh user@host` | Conecta a uma máquina remota. |
| `scp arquivo user@host:/caminho` | Copia arquivo para máquina remota. |

---

## Variáveis de ambiente

```bash
echo $HOME              # mostra uma variável
export API_KEY=abc123   # define uma variável (só na sessão atual)
env                     # lista todas as variáveis
printenv PATH           # mostra o PATH (onde o shell procura comandos)
```

💡 **Segredos** (chaves, senhas) vão em variáveis de ambiente ou arquivos `.env` (que ficam no `.gitignore`) — **nunca** no código. Ver [[08-Convencoes-e-boas-praticas]] e [[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]].

---

## Atalhos do terminal (economizam tempo)

| Atalho | O que faz |
|--------|-----------|
| `Tab` | Autocompleta nomes de arquivos/comandos. |
| `↑` / `↓` | Navega no histórico de comandos. |
| `Ctrl + R` | Busca reversa no histórico (digite parte do comando). |
| `Ctrl + A` / `Ctrl + E` | Vai para o início / fim da linha. |
| `Ctrl + U` / `Ctrl + K` | Apaga do cursor ao início / ao fim. |
| `Ctrl + W` | Apaga a palavra anterior. |
| `Ctrl + L` | Limpa a tela (= `clear`). |
| `!!` | Repete o último comando (`sudo !!` roda o último como root). |
| `Ctrl + C` | Cancela o comando atual. |

---

## Comandos úteis do dia a dia

```bash
df -h                    # espaço em disco
du -sh <pasta>           # tamanho de uma pasta
free -h                  # memória disponível
which <comando>          # onde um comando está instalado
man <comando>            # manual de um comando (q sai)
<comando> --help         # ajuda rápida de um comando
whoami                   # seu usuário
uname -a                 # info do sistema
date                     # data e hora
```

💡 **Não sabe um comando?** `man <comando>` ou `<comando> --help`. Leia o erro com atenção antes de pesquisar ([[107-Como-aprender-sozinho-estudar-e-pesquisar]]).

---

> 🧭 Manual de Bolso → **Terminal e Linux**. Anterior: [[01-Git-e-GitHub]] · Próxima: [[03-Docker]].
