# 01 — Git e GitHub (referência rápida)

> Manual de Bolso · Volume 6. Entenda o porquê em [[61-Git-no-dia-a-dia]], [[62-Branches-merge-conflitos-e-estrategias]], [[64-Pull-Requests-code-review-e-issues]].

---

## O ciclo diário (decore este)

```bash
git status                 # o que mudou? (rode o tempo todo)
git pull                   # traz as mudanças do remoto antes de começar
git checkout -b minha-feature   # cria e entra numa branch nova
# ... você edita os arquivos ...
git add .                  # marca tudo que mudou para o commit (ou: git add <arquivo>)
git commit -m "feat: adiciona X"   # salva localmente com uma mensagem
git push -u origin minha-feature   # envia a branch para o GitHub (1ª vez)
git push                   # nas próximas vezes
# ... abre o Pull Request no GitHub ...
```

---

## Comandos essenciais

| Comando | O que faz |
|---------|-----------|
| `git status` | Mostra o que mudou, o que está em stage, em qual branch você está. |
| `git add <arquivo>` / `git add .` | Adiciona arquivo(s) ao stage (o que vai no próximo commit). |
| `git commit -m "msg"` | Cria um commit com o que está em stage. |
| `git commit -am "msg"` | `add` + `commit` de arquivos já rastreados (pula novos). |
| `git push` | Envia commits locais para o remoto. |
| `git pull` | Traz e mescla mudanças do remoto. |
| `git fetch` | Traz mudanças do remoto **sem** mesclar (só atualiza referências). |
| `git log --oneline --graph -20` | Histórico compacto dos últimos 20 commits. |
| `git diff` | O que mudou e ainda não está em stage. |
| `git diff --staged` | O que está em stage (vai no próximo commit). |
| `git show <hash>` | Detalhes de um commit específico. |

---

## Branches

| Comando | O que faz |
|---------|-----------|
| `git branch` | Lista branches locais (a atual com `*`). |
| `git branch -a` | Lista todas (locais + remotas). |
| `git checkout -b <nome>` | Cria e muda para uma branch nova. |
| `git checkout <nome>` / `git switch <nome>` | Muda para uma branch existente. |
| `git branch -d <nome>` | Apaga branch local (já mesclada). |
| `git branch -D <nome>` | ⚠️ Apaga branch local à força (mesmo não mesclada). |
| `git push origin --delete <nome>` | Apaga branch remota. |

💡 **Convenção de nomes de branch:** `feat/nome`, `fix/nome`, `chore/nome`, `hotfix/nome`.

---

## Mesclar: merge vs. rebase

```bash
# atualizar sua branch com a main (duas opções):
git checkout minha-feature
git merge main            # mescla a main na sua branch (cria commit de merge)
# OU
git rebase main           # "reaplica" seus commits em cima da main (histórico linear)
```

| | Merge | Rebase |
|---|-------|--------|
| Histórico | Preserva (com commit de merge) | Linear, "limpo" |
| Segurança | Mais seguro | ⚠️ Reescreve histórico — **nunca** rebase de branch compartilhada/pública |
| Quando usar | Trazer main para sua branch (simples) | Deixar o histórico linear antes do PR |

---

## Resolver conflito de merge

```bash
# quando o Git avisa "CONFLICT":
git status                 # veja quais arquivos conflitaram
# abra os arquivos, procure os marcadores:
#   <<<<<<< HEAD
#   sua versão
#   =======
#   versão da outra branch
#   >>>>>>> main
# edite deixando a versão correta, remova os marcadores, depois:
git add <arquivo>
git commit                 # (ou: git rebase --continue, se estava rebasando)
```

💡 Entenda conflitos em [[62-Branches-merge-conflitos-e-estrategias]].

---

## Desfazer erros (a parte que mais salva)

| Situação | Comando |
|----------|---------|
| Descartar mudanças de um arquivo (não commitado) | `git checkout -- <arquivo>` ou `git restore <arquivo>` |
| Tirar arquivo do stage (mantém a mudança) | `git restore --staged <arquivo>` |
| Mudar a mensagem do último commit (não pushado) | `git commit --amend -m "nova msg"` |
| Adicionar algo esquecido ao último commit | `git add <arquivo>` → `git commit --amend --no-edit` |
| Desfazer o último commit, **mantendo** as mudanças | `git reset --soft HEAD~1` |
| Desfazer o último commit, mudanças voltam a "não-staged" | `git reset HEAD~1` |
| ⚠️ Desfazer o último commit, **apagando** as mudanças | `git reset --hard HEAD~1` |
| Reverter um commit já pushado (cria commit inverso — seguro) | `git revert <hash>` |
| Ver TUDO que você fez (salva-vidas) | `git reflog` |

💡 **Perdeu um commit?** `git reflog` mostra o histórico de onde o HEAD esteve — ache o hash e `git checkout <hash>` ou `git reset --hard <hash>`.

⚠️ **`git reset --hard` e `git push --force` apagam trabalho.** Use `--force-with-lease` no lugar de `--force` (mais seguro) e nunca force numa branch compartilhada.

---

## Guardar mudanças temporariamente (stash)

```bash
git stash                  # guarda mudanças não commitadas e limpa o working dir
git stash list             # lista os stashes
git stash pop              # traz de volta o último stash (e o remove da lista)
git stash apply            # traz de volta sem remover da lista
git stash drop             # descarta o último stash
```

💡 Útil quando você precisa **trocar de branch** no meio de algo inacabado.

---

## Configuração inicial (uma vez por máquina)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
git config --global init.defaultBranch main
git config --global pull.rebase false   # ou true, conforme o padrão do time
```

---

## GitHub: fluxo de Pull Request (PR)

1. `git checkout -b feat/minha-feature` e faça seus commits.
2. `git push -u origin feat/minha-feature`.
3. No GitHub: **"Compare & pull request"** → escreva **título** e **descrição** (o quê e por quê).
4. Espere a **CI** (esteira de testes) ficar **verde** e o **code review** aprovar.
5. **Merge** (Squash costuma ser o padrão) → apague a branch.
6. `git checkout main && git pull` para atualizar seu local.

💡 **Boa descrição de PR:** o que mudou, por quê, como testar, e o que revisar com atenção. Entenda em [[64-Pull-Requests-code-review-e-issues]].

---

## GitHub CLI (`gh`) — se instalado

| Comando | O que faz |
|---------|-----------|
| `gh pr create` | Abre um PR do terminal. |
| `gh pr list` | Lista PRs abertos. |
| `gh pr checkout <n>` | Baixa o PR nº para revisar localmente. |
| `gh pr view --web` | Abre o PR no navegador. |
| `gh issue list` | Lista issues. |

---

## Situações comuns ("como faço para...")

| Quero... | Comando |
|----------|---------|
| Ver em que branch estou | `git branch --show-current` |
| Trazer uma branch remota nova | `git fetch` depois `git checkout <nome>` |
| Atualizar minha branch com a main | `git pull origin main` (ou merge/rebase acima) |
| Ver quem mudou uma linha | `git blame <arquivo>` |
| Buscar um texto em todo o histórico | `git log -S "texto"` |
| Comparar duas branches | `git diff main..minha-branch` |
| Ignorar um arquivo | adicionar ao `.gitignore` (ver [[08-Convencoes-e-boas-praticas]]) |

---

> 🧭 Manual de Bolso → **Git e GitHub**. Próxima folha: [[02-Terminal-e-Linux]].
