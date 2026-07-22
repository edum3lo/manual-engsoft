# 09 — GitHub na prática (do zero à equipe)

> Manual de Bolso · Volume 6. As dúvidas que **todo mundo** tem no dia a dia: começar um projeto, subir a 1ª vez, clonar, o que cada comando faz, o passo a passo de uma alteração, o que **não** fazer em equipe, e como resolver os problemas mais comuns.
> Complementa a folha [[01-Git-e-GitHub]] (comandos) e os capítulos [[60-Controle-de-versao-e-por-que-Git-venceu]] a [[64-Pull-Requests-code-review-e-issues]] (o porquê).

---

## 🗺️ O mapa mental (entenda isto e o resto faz sentido)

O Git tem **4 lugares** onde seu código pode estar. Quase todo comando move o código entre eles:

```
  Working Directory  →  Staging Area  →  Repositório Local  →  Repositório Remoto
  (seus arquivos,        (o que vai        (histórico de          (o GitHub —
   você editando)         no próximo         commits, no seu        na nuvem,
                          commit)            computador)            compartilhado)

        │  git add  ────────►  │  git commit ──►  │  git push ─────────►  │
        │                      │                  │  ◄──── git pull ──────│
```

| Comando | Move de → para | Em uma frase |
|---------|----------------|--------------|
| `git add` | Working → Staging | "Marco estes arquivos para o próximo commit." |
| `git commit` | Staging → Local | "Salvo um ponto no histórico, com mensagem." |
| `git push` | Local → Remoto | "Envio meus commits para o GitHub." |
| `git pull` | Remoto → Local+Working | "Trago as mudanças dos outros para mim." |
| `git clone` | Remoto → (novo) Local | "Baixo um projeto que já existe no GitHub." |
| `git init` | — cria o Local | "Transformo esta pasta num repositório Git." |

💡 **Por que 2 passos (`add` + `commit`) e não 1?** A staging area deixa você **escolher** o que entra em cada commit — commitar só parte das mudanças, agrupadas por assunto. É o que permite commits pequenos e limpos.

---

## 🆕 Começar um projeto DO ZERO e subir pela 1ª vez

Você tem uma pasta com código (ou vazia) e quer colocá-la no GitHub.

**Passo 1 — Crie o repositório vazio no GitHub** (pelo site): botão **"New repository"** → dê um nome → **não** marque "Add README" (você já tem arquivos) → **Create**. O GitHub te mostra a URL (ex.: `https://github.com/voce/meu-projeto.git`).

**Passo 2 — No terminal, dentro da pasta do projeto:**

```bash
git init                          # transforma a pasta num repositório Git
git add .                         # marca TODOS os arquivos para o 1º commit
git commit -m "chore: commit inicial"   # salva o 1º ponto no histórico
git branch -M main                # garante que a branch se chama "main"
git remote add origin https://github.com/voce/meu-projeto.git   # conecta ao GitHub
git push -u origin main           # envia tudo para o GitHub (1ª vez)
```

**O que cada linha fez:**
| Comando | Objetivo |
|---------|----------|
| `git init` | Cria o repositório local (a pasta `.git` escondida). |
| `git add .` | Coloca todos os arquivos na staging area. |
| `git commit -m "..."` | Cria o primeiro commit com uma mensagem. |
| `git branch -M main` | Renomeia a branch atual para `main` (padrão). |
| `git remote add origin <url>` | Cadastra o GitHub como o "remoto" chamado `origin`. |
| `git push -u origin main` | Envia os commits; `-u` liga sua branch local à remota (nas próximas vezes basta `git push`). |

> ⚠️ **Antes do `git add .`, crie um `.gitignore`!** Senão você sobe `node_modules`, `.env` (segredos!), builds, etc. Ver [[08-Convencoes-e-boas-praticas]]. Se subir um segredo por engano, **rotacione a chave** — ela está comprometida.

💡 **Alternativa mais fácil (GitHub CLI):** dentro da pasta, `gh repo create` cria o repo e conecta em um comando.

---

## 📥 Clonar um projeto que JÁ existe (o caso mais comum na empresa)

Você entrou num time e vai trabalhar num repositório que já está no GitHub.

```bash
git clone https://github.com/empresa/projeto.git   # baixa o projeto inteiro
cd projeto                                          # entra na pasta criada
# ... agora você tem o código e todo o histórico, já conectado ao remoto ...
```

- `git clone` faz tudo de uma vez: baixa o código, o histórico, e já configura o `origin`. Você **não** precisa de `git init` nem `git remote add` — o clone já resolve.
- Para pegar as atualizações dos colegas depois: `git pull`.

💡 **HTTPS vs SSH:** a URL pode ser `https://...` (pede login/token) ou `git@github.com:...` (usa chave SSH, sem digitar senha toda vez). Configure SSH uma vez e economize tempo.

---

## ✅ Passo a passo pra fazer QUALQUER alteração (decore este fluxo)

Este é o roteiro completo, do "vou mexer em algo" ao "está na main". **É o que você repete o dia inteiro.**

```bash
# 1. Comece atualizado (evita conflitos)
git checkout main
git pull

# 2. Crie uma branch para a sua mudança (NUNCA trabalhe direto na main)
git checkout -b feat/nome-da-mudanca

# 3. Faça as alterações no código... e vá salvando em commits pequenos:
git status                       # veja o que mudou
git add .                        # (ou git add <arquivo> para escolher)
git commit -m "feat: descreve a mudança"

# 4. Envie sua branch para o GitHub
git push -u origin feat/nome-da-mudanca

# 5. Abra o Pull Request (no site ou 'gh pr create')
#    Escreva: o quê, por quê, como testar.

# 6. Espere a CI ficar verde e o code review aprovar.
#    Se pedirem ajustes: edite, commit, push (o PR atualiza sozinho).

# 7. Faça o merge (pelo GitHub). Apague a branch.

# 8. Volte para a main atualizada
git checkout main
git pull
```

**Resumo em 8 palavras-chave:** `pull → branch → editar → add → commit → push → PR → merge`.

Ver o checklist "antes do PR" em [[07-Checklists-do-dia-a-dia]].

---

## 🚫 O que NÃO fazer numa equipe de desenvolvimento

Estes são os erros que irritam o time (ou causam desastres). Evite **sempre**:

| ❌ Não faça | Por quê | Faça em vez disso |
|-------------|---------|-------------------|
| **Commitar direto na `main`** | Quebra o código de todos, sem revisão. | Sempre uma branch + PR. |
| **`git push --force` numa branch compartilhada** | Apaga o trabalho dos outros. | `--force-with-lease` (e só na sua própria branch). |
| **Commitar segredos** (`.env`, chaves, senhas) | Vazam para sempre no histórico. | `.gitignore` + cofre de segredos. Se vazou, **rotacione**. |
| **Commits gigantes** ("muitas coisas de uma vez") | Impossível de revisar e reverter. | Commits pequenos, um assunto cada. |
| **Mensagens ruins** ("wip", "asdf", "fix") | Ninguém entende o histórico. | `tipo: descrição clara` ([[08-Convencoes-e-boas-praticas]]). |
| **PR gigante** (2.000 linhas) | Review péssimo, bugs passam. | PRs pequenos e focados. |
| **Commitar código quebrado / que não compila** | Trava o time. | Rode e teste antes de commitar. |
| **Commitar arquivos gerados** (`node_modules`, `dist`, `build`) | Poluem o repo, geram conflitos. | `.gitignore`. |
| **`git commit -am` sem olhar o que entrou** | Commita coisa errada sem querer. | `git status` e `git diff` antes. |
| **Reescrever histórico já publicado** (rebase/amend em commits pushados e compartilhados) | Bagunça o repo de todos. | Só reescreva o que ainda é **local e seu**. |
| **Ignorar a CI vermelha** e forçar o merge | Sobe código quebrado. | Conserte a esteira primeiro. |
| **Trabalhar dias sem integrar** | "Inferno da integração": conflitos gigantes. | Integre cedo e com frequência. |
| **Fazer `git pull` com mudanças não commitadas e ir embora** | Pode dar conflito e perder trabalho. | Commit ou `git stash` antes. |

---

## 🔧 Problemas do dia a dia e como resolver cada um

A parte que mais salva. Ache o seu problema na tabela.

### Commits e staging

| Problema | Solução |
|----------|---------|
| **Commitei na branch errada** (ainda não fiz push) | `git reset HEAD~1` (desfaz o commit, mantém as mudanças) → `git stash` → `git checkout branch-certa` → `git stash pop` → commitar. |
| **Errei a mensagem do último commit** (não pushado) | `git commit --amend -m "mensagem certa"`. |
| **Esqueci um arquivo no último commit** (não pushado) | `git add <arquivo>` → `git commit --amend --no-edit`. |
| **Adicionei um arquivo errado ao stage** | `git restore --staged <arquivo>` (tira do stage, mantém a mudança). |
| **Quero desfazer as mudanças de um arquivo** (não commitado) | `git restore <arquivo>` — ⚠️ perde as edições não salvas. |
| **Quero desfazer o último commit e apagar as mudanças** | ⚠️ `git reset --hard HEAD~1`. |
| **Já pushei e preciso reverter um commit** | `git revert <hash>` (cria um commit que desfaz — seguro em equipe). |

### Push, pull e sincronização

| Problema | Solução |
|----------|---------|
| **"Updates were rejected"** (push recusado) | O remoto tem commits que você não tem. `git pull` (resolva conflitos se houver) → `git push`. |
| **"Your branch has diverged"** | Sua branch e a remota seguiram caminhos diferentes. `git pull` (merge) ou `git pull --rebase` (linear). |
| **`git pull` deu conflito** | Veja abaixo "Conflito de merge". |
| **Fiz commit mas o GitHub não mostra** | Você commitou local mas não deu `git push`. |
| **Fiz push mas na branch errada** | Faça o PR da branch certa, ou mova os commits (`git cherry-pick`). |
| **Quero descartar TUDO que fiz local e igualar ao remoto** | ⚠️ `git fetch` → `git reset --hard origin/<branch>` (perde o trabalho local!). |

### Branches e conflitos

| Problema | Solução |
|----------|---------|
| **Conflito de merge** (`CONFLICT`) | `git status` (veja os arquivos) → abra, procure `<<<<<<<`, `=======`, `>>>>>>>`, edite deixando a versão certa e remova os marcadores → `git add <arquivo>` → `git commit` (ou `git rebase --continue`). Ver [[62-Branches-merge-conflitos-e-estrategias]]. |
| **Comecei um merge/rebase e me arrependi** | `git merge --abort` ou `git rebase --abort` (volta ao estado anterior). |
| **Criei a branch a partir da errada** | `git rebase --onto main branch-errada minha-branch` (avançado) ou recrie a branch a partir da main. |
| **Minha branch está desatualizada com a main** | `git checkout minha-branch` → `git merge main` (ou `git rebase main`). |
| **Não consigo trocar de branch** ("changes would be overwritten") | Você tem mudanças não commitadas. `git commit` ou `git stash` antes de trocar. |

### Estados confusos

| Problema | Solução |
|----------|---------|
| **"HEAD detached"** (cabeça destacada) | Você está num commit, não numa branch. Para voltar: `git checkout main`. Para salvar o que fez ali: `git checkout -b nova-branch`. |
| **Perdi um commit / apaguei sem querer** | `git reflog` mostra tudo por onde o HEAD passou → ache o hash → `git checkout <hash>` ou `git reset --hard <hash>`. **O reflog é o salva-vidas.** |
| **Commitei um arquivo enorme (ou segredo) e já pushei** | Remova do histórico (`git filter-repo` ou BFG) — avançado; peça ajuda. E **rotacione o segredo** imediatamente. |
| **Preciso trocar de tarefa no meio de algo inacabado** | `git stash` (guarda) → faça a outra coisa → `git stash pop` (traz de volta). |
| **`git status` mostra arquivos que eu não mexi** (fim de linha) | Configuração de CRLF/LF. Ajuste `git config core.autocrlf` conforme o time. |

### "Não sei o que aconteceu"

| Situação | Comando de diagnóstico |
|----------|------------------------|
| Não sei o estado atual | `git status` |
| Não sei em que branch estou | `git branch --show-current` |
| Não sei o que mudou | `git diff` (não-staged) / `git diff --staged` (staged) |
| Não sei o histórico | `git log --oneline --graph -20` |
| Não sei quem mudou uma linha | `git blame <arquivo>` |
| **Fiz algo e quero desfazer, mas não sei o quê** | `git reflog` → ache o ponto bom → `git reset --hard <hash>` |

💡 **Regra de ouro do troubleshooting Git:** **antes de "consertar", rode `git status` e `git log`.** Entenda o estado primeiro. E lembre: quase nada se perde de verdade — o `git reflog` guarda o histórico dos seus movimentos por dias.

---

## 🧭 Referência-relâmpago (os comandos por objetivo)

| Quero... | Comando |
|----------|---------|
| Começar um projeto novo | `git init` |
| Baixar um projeto que existe | `git clone <url>` |
| Ver o que mudou | `git status` / `git diff` |
| Salvar meu trabalho | `git add .` → `git commit -m "..."` |
| Enviar para o GitHub | `git push` |
| Trazer mudanças dos outros | `git pull` |
| Trabalhar em algo novo | `git checkout -b <branch>` |
| Guardar temporariamente | `git stash` / `git stash pop` |
| Desfazer erros | ver a folha [[01-Git-e-GitHub]] |
| Ver o salva-vidas | `git reflog` |

---

> 🧭 Manual de Bolso → **GitHub na prática**. Comandos de referência: [[01-Git-e-GitHub]]. O porquê de tudo: [[60-Controle-de-versao-e-por-que-Git-venceu]] a [[64-Pull-Requests-code-review-e-issues]]. Volta ao [[00-Indice]].
