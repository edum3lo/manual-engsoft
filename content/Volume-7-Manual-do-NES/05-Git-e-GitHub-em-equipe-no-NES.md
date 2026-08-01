---
title: '05 - Git e GitHub em equipe no NES'
---

# 05. Git e GitHub em equipe no NES

> Manual do NES · Volume 7. Quatro ou cinco pessoas mexendo no mesmo código ao mesmo tempo. Este capítulo é o fluxo que evita 90% do caos, mais os comandos de emergência para os outros 10%.
> A folha de comandos crua está em [[01-Git-e-GitHub]]. O passo a passo genérico em [[09-GitHub-na-pratica]]. Aqui é o uso específico em equipe de NES.

---

## 🔁 O fluxo diário (decore este bloco)

Toda vez que você vai mexer em qualquer coisa:

```bash
# 1. Volte para a main e pegue o que os outros fizeram
git checkout main
git pull

# 2. Crie a branch da SUA tarefa (uma branch por issue)
git checkout -b feat/12-cadastro-de-cliente

# 3. Trabalhe. Commite pequeno e frequente, várias vezes por dia
git add <arquivos>
git commit -m "feat: valida CPF no formulário de cadastro"

# 4. Antes de abrir o PR, traga a main de volta para dentro da sua branch
git checkout main && git pull
git checkout feat/12-cadastro-de-cliente
git merge main            # resolva conflitos AQUI, na sua branch, não na main

# 5. Envie e abra o PR
git push -u origin feat/12-cadastro-de-cliente
gh pr create --fill        # ou pelo site do GitHub
```

⚠️ **A regra que salva o semestre:** ninguém commita direto na `main`. Nunca. Nem "só uma correçãozinha rápida".

---

## 🌿 Padrão de nome de branch

`<tipo>/<numero-da-issue>-<descricao-curta>`

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feat` | funcionalidade nova | `feat/12-login-com-email` |
| `fix` | correção de bug | `fix/34-erro-ao-salvar-data` |
| `docs` | documentação | `docs/7-atualiza-readme` |
| `refactor` | mudar código sem mudar comportamento | `refactor/20-extrai-servico-de-email` |
| `chore` | infra, configuração, dependência | `chore/3-configura-eslint` |

💡 Colocar o número da issue no nome faz o GitHub ligar a branch, o PR e a tarefa automaticamente. Na hora da avaliação, essa rastreabilidade conta pontos.

---

## ✍️ Mensagens de commit

Padrão **Conventional Commits**, que é o que o mercado usa:

```
<tipo>: <o que mudou, no imperativo e em minúscula>

feat: adiciona filtro por data na listagem de pedidos
fix: corrige cálculo do total quando o carrinho está vazio
docs: documenta variáveis do .env no README
refactor: extrai validação de CPF para um utilitário
test: adiciona teste do serviço de agendamento
chore: atualiza dependências do front
```

Regras práticas:
- Uma frase, até uns 70 caracteres, dizendo **o que mudou**, não "alterações" nem "ajustes".
- ⚠️ Fuja de: `update`, `correções`, `.`, `teste`, `agora vai`, `commit do dia`.
- Se precisar explicar o porquê, pule uma linha e escreva um parágrafo abaixo.

> Convenções completas: [[08-Convencoes-e-boas-praticas]].

---

## 🔀 Pull Request que passa fácil

Um bom PR é **pequeno** (idealmente menos de 400 linhas mudadas), resolve **uma coisa**, e explica o contexto. Descrição:

```markdown
## O que faz
Adiciona a tela de cadastro de cliente com validação de CPF e e-mail.

Closes #12

## Como testar
1. `npm run dev`
2. Acesse /clientes/novo
3. Tente salvar com CPF inválido: deve aparecer mensagem de erro

## Observações
A máscara do telefone ficou para a issue #19.
```

O `Closes #12` fecha a issue automaticamente quando o PR é integrado.

**Como revisar o PR do colega em 10 minutos** (você vai fazer isso toda semana):
1. Leia a descrição e entenda o objetivo.
2. Baixe e rode, se der: `gh pr checkout 15`.
3. Olhe o diff procurando: segredo commitado, `console.log` esquecido, caso de erro não tratado, nome confuso.
4. Comente o código, nunca a pessoa. Marque o que é obrigatório e o que é sugestão (`nit:`).
5. Aprove se está bom o suficiente. ⚠️ Não segure o PR do colega por perfeccionismo, isso trava a sprint inteira.

> Checklists prontos: [[07-Checklists-do-dia-a-dia]].

---

## 💥 Conflito de merge, sem pânico

Conflito não é erro, é o Git avisando que duas pessoas mexeram na mesma linha e ele não quer escolher por você.

```bash
git merge main
# CONFLICT (content): Merge conflict in web/src/pages/Login.jsx
```

Abra o arquivo. Você verá:

```
<<<<<<< HEAD
código da SUA branch
=======
código que veio da main
>>>>>>> main
```

Decida o que fica (às vezes os dois, às vezes uma mistura), **apague as três linhas de marcação**, salve. Depois:

```bash
git add web/src/pages/Login.jsx
git commit                # conclui o merge
npm run dev               # ⚠️ TESTE. Resolver conflito quebra código com frequência
```

Se se perdeu no meio e quer voltar ao estado anterior:

```bash
git merge --abort
```

💡 **Prevenção vale mais que cura:** puxe a `main` para a sua branch todo dia, e evite que duas pessoas peguem tarefas no mesmo arquivo. Combinar isso na planning custa 2 minutos.

> Estratégias de branch e conflito: [[62-Branches-merge-conflitos-e-estrategias]].

---

## 🚑 Comandos de emergência

| Situação | Comando | Observação |
|---|---|---|
| Escrevi a mensagem errada no último commit | `git commit --amend -m "nova mensagem"` | ⚠️ só se ainda não deu push |
| Commitei arquivo errado no último commit | `git reset --soft HEAD~1` | desfaz o commit, mantém as mudanças |
| Quero jogar fora as mudanças de um arquivo | `git checkout -- <arquivo>` | ⚠️ perde o que não foi commitado |
| Commitei na `main` sem querer | `git branch minha-branch && git reset --hard origin/main && git checkout minha-branch` | salva o trabalho numa branch antes de limpar |
| Preciso trocar de branch no meio de algo | `git stash` … depois `git stash pop` | guarda temporariamente |
| Commitei o `.env` | veja a seção abaixo | ⚠️ urgente |
| Não sei o que está acontecendo | `git status` e `git log --oneline -5` | 90% das dúvidas morrem aqui |
| Quero ver o que mudou antes de commitar | `git diff` | e `git diff --staged` |
| Apaguei algo e quero recuperar | `git reflog` | o histórico de tudo, inclusive do que "sumiu" |

**Commitei o `.env` (ou uma senha):**
1. Trate a credencial como **vazada**: peça ao proponente para trocar, ou gere outra chave. Remover do Git não desfaz a exposição.
2. Adicione ao `.gitignore` e remova do rastreamento: `git rm --cached .env && git commit -m "chore: remove .env do versionamento"`.
3. Avise a equipe no grupo. Não esconda. Todo mundo já fez isso uma vez.

---

## 👥 Combinados de equipe que evitam guerra

Coloque isto na ata da Sprint 0 e no `CONTRIBUTING.md`:

1. Uma issue, uma branch, um PR.
2. Ninguém aprova o próprio PR.
3. PR aberto tem que ser revisado em até 24h (senão vira gargalo).
4. `git pull` na `main` toda manhã antes de trabalhar.
5. ⚠️ **Nunca** `git push --force` na `main`. Em branch própria, só se você entende o que faz.
6. Quem quebra a `main` conserta ou reverte, na hora: `git revert <hash>`.
7. Não mexa na branch do colega sem avisar.
8. Antes de sumir por uns dias, dê push do que tem e avise no grupo.

---

## ✅ Checklist antes de todo PR

- [ ] Rodei e funciona na minha máquina.
- [ ] Sem `console.log`, sem código comentado esquecido.
- [ ] Sem segredo, senha ou `.env` no diff.
- [ ] Commits com mensagem no padrão.
- [ ] Trouxe a `main` para dentro da minha branch e resolvi conflitos.
- [ ] Descrição do PR com o que faz, como testar e `Closes #<n>`.
- [ ] Pedi review para alguém específico (não para "o grupo").

---

> Próximo: [[06-Backlog-issues-e-o-quadro-da-sprint]].
