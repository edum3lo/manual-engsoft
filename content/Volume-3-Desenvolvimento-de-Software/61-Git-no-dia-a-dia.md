---
title: '61 - Git no dia a dia'
---

# Capítulo 61 — Git no dia a dia

> **Volume 3 — Desenvolvimento de Software** · Módulo 17 — Git
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Executar o **ciclo básico do Git**: `status`, `add`, `commit`, `push`, `pull`.
- Entender as **três áreas** (working directory, staging, repositório) na prática.
- Iniciar um repositório (`init`, `clone`) e conectar a um remoto.
- Ler o histórico (`log`, `diff`) e desfazer coisas com segurança (`restore`, `revert`).
- Escrever **boas mensagens de commit** e adotar um ritmo saudável de commits.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 25 minutos praticando no terminal.

---

## 📊 Nível de dificuldade

**Iniciante–Intermediário (2,5/5).**

---

## ✅ Pré-requisitos

- Ter lido [[60-Controle-de-versao-e-por-que-Git-venceu]] — o modelo mental (snapshots, HEAD, as três áreas).
- Ter o **Git instalado** e um terminal aberto para praticar (essencial aqui).

---

## 📖 Introdução

No capítulo anterior você entendeu **por que** o Git existe e como ele "pensa". Agora vem a parte que você vai repetir **todos os dias da sua vida profissional**: o punhado de comandos que formam o ciclo de trabalho do Git. A boa notícia é libertadora — apesar de o Git ter centenas de comandos e fama de complicado, **90% do seu dia a dia** usa só uns **seis ou sete**. Dominar esse núcleo é o que te deixa produtivo; o resto você consulta quando precisar.

O segredo para o Git parar de assustar é entender que quase tudo gira em torno de mover mudanças entre **três áreas**: os seus arquivos (working directory), o "palco" do próximo commit (staging), e o histórico (repositório). Os comandos são apenas as formas de mover coisas entre essas áreas e de sincronizar com o servidor remoto. Uma vez que você "vê" essas áreas, os comandos deixam de ser feitiços decorados e viram gestos naturais.

Este é um capítulo **para praticar de mão na massa** — leia com o terminal aberto e vá digitando. Vamos do zero: criar um repositório, fazer o primeiro commit, ver o histórico, desfazer um erro com segurança, e enviar/receber do servidor. Ao fim, você terá o fluxo que sustenta 90% do trabalho com Git — e a confiança para não ter medo dele. (O trabalho com branches, o outro grande pilar, vem no próximo capítulo.)

---

## 🧠 Analogia

Pense em **preparar uma encomenda para enviar pelos Correios**.

- Sua **mesa de trabalho**, com todos os itens espalhados, é o **working directory**: onde você mexe nas coisas livremente.
- A **caixa que você está montando** para enviar é a **staging area**: você escolhe **quais** itens da mesa colocar na caixa. Nem tudo que está na mesa vai nesta encomenda — você seleciona.
- **Lacrar e postar** a caixa é o **commit**: aquela seleção vira um pacote fechado, etiquetado (a mensagem), registrado no histórico. Depois de postado, é um registro permanente.
- **A agência dos Correios central** é o **remoto (remote)**: quando você faz **push**, envia seus pacotes para lá, onde os colegas podem pegá-los; quando faz **pull**, você busca os pacotes que os colegas postaram.

Os comandos são só isso: `add` põe itens da mesa na caixa; `commit` lacra e posta no seu registro local; `push` manda para a agência central; `pull` traz de lá o que os outros mandaram. O `status` é você olhar "o que está na mesa, o que já está na caixa?". Guarde essa cena — mesa → caixa → postado → agência central — e o Git deixa de ser um mistério.

---

## 🧩 Conceitos fundamentais

### 1. As três áreas (revisão prática)

Toda mudança percorre este caminho:

```
  WORKING DIRECTORY  ──git add──►  STAGING AREA  ──git commit──►  REPOSITÓRIO (local)
  (seus arquivos       (o "palco":      (o histórico:
   como estão agora)     o que vai         commits salvos)
                         no próximo                 │
                         commit)                git push │ git pull
                                                        ▼
                                                  REMOTO (GitHub)
```

- **Working directory:** seus arquivos, com as edições atuais.
- **Staging area (index):** o que você **marcou** para o próximo commit.
- **Repositório:** o histórico de commits (local).
- **Remoto:** a cópia compartilhada no servidor.

### 2. Iniciar: `init` e `clone`

- **`git init`** — transforma a pasta atual num repositório Git (cria a subpasta `.git`). Use ao começar um projeto do zero.
- **`git clone <url>`** — baixa uma cópia completa de um repositório remoto existente (ex.: do GitHub). Use ao entrar num projeto que já existe.

> **Termo explicado — clone:** baixar uma cópia completa (com todo o histórico) de um repositório remoto para a sua máquina.

### 3. O ciclo diário: `status`, `add`, `commit`

- **`git status`** — mostra o que mudou, o que está no staging e o que não está. É o comando que você mais roda; use **o tempo todo** para se orientar.
- **`git add <arquivo>`** — move mudanças do working directory para o staging (`git add .` adiciona tudo). É montar a "caixa".
- **`git commit -m "mensagem"`** — grava o que está no staging como um commit, com a mensagem. É lacrar e postar.

```bash
git status                     # o que mudou?
git add pedido.js              # coloca no staging
git commit -m "adiciona validação de pedido mínimo"   # grava o commit
```

### 4. Ver o histórico: `log` e `diff`

- **`git log`** — lista os commits (hash, autor, data, mensagem). `git log --oneline` mostra resumido, uma linha por commit.
- **`git diff`** — mostra as **diferenças**: o que mudou nos arquivos. `git diff` (working vs. staging), `git diff --staged` (staging vs. último commit).

Esses dois são suas "lentes" para entender o que aconteceu e o que está prestes a ser commitado.

### 5. Sincronizar: `push` e `pull`

- **`git push`** — envia seus commits locais para o remoto (a agência central). Depois disso, os colegas podem vê-los.
- **`git pull`** — traz e integra os commits que os colegas enviaram ao remoto. **Faça `pull` antes de começar a trabalhar** para partir da versão mais recente.
- **`git remote add origin <url>`** — conecta seu repo local a um remoto (feito uma vez, se você começou com `init`). `origin` é o apelido padrão do remoto principal.

> **Termo explicado — push / pull:** `push` envia seus commits para o servidor remoto; `pull` traz os commits que outros enviaram, integrando-os ao seu repositório local.

### 6. Desfazer com segurança

O Git deixa você errar e voltar. Os mais úteis (com cuidado):
- **`git restore <arquivo>`** — descarta mudanças **não commitadas** de um arquivo (volta ao último commit). *(Atenção: perde o que não foi salvo.)*
- **`git restore --staged <arquivo>`** — tira do staging (mas mantém a edição).
- **`git revert <hash>`** — cria um **novo** commit que **desfaz** um commit anterior. É a forma **segura** de desfazer algo já commitado (e já enviado), porque não reescreve a história.
- **`git reset`** — move o HEAD para trás (mais poderoso e perigoso; útil localmente, arriscado se já foi enviado). Use com cautela no início.

A regra de ouro: para desfazer algo **já publicado**, prefira **`revert`** (seguro); `reset` só localmente e com consciência.

---

## ⚙️ Como funciona na prática

Vamos percorrer um ciclo completo, do zero, como você faria de verdade:

**1. Criar o repositório.**
```bash
git init                       # inicia o repo na pasta
git status                     # vê que há arquivos "não rastreados"
```

**2. Primeiro commit.**
```bash
git add .                      # coloca tudo no staging
git commit -m "commit inicial do projeto"
git log --oneline              # confere: seu primeiro commit está lá
```

**3. Trabalhar e commitar em unidades lógicas.** Você edita `pedido.js` para adicionar uma validação:
```bash
git status                     # mostra pedido.js modificado
git diff                       # revê exatamente o que mudou
git add pedido.js
git commit -m "valida pedido mínimo de R$15"
```
Note: você commita **uma mudança lógica de cada vez**, não tudo junto no fim do dia. Cada commit conta uma micro-história.

**4. Conectar ao remoto e enviar.**
```bash
git remote add origin https://github.com/usuario/saborexpress.git
git push -u origin main        # envia (a 1ª vez usa -u para vincular)
```

**5. O ciclo diário em time.** No dia seguinte, antes de começar:
```bash
git pull                       # traz o que os colegas fizeram
# ... você trabalha, add, commit ...
git push                       # envia o seu
```

**6. Corrigir um erro.** Você commitou algo errado que **já enviou**:
```bash
git revert <hash>              # cria um commit que desfaz aquele, com segurança
git push
```

**O ritmo saudável:** `pull` ao começar → trabalhar → `add`/`commit` em unidades lógicas com boas mensagens → `push` ao terminar (ou várias vezes ao dia). Rode `git status` sempre que ficar em dúvida — ele te reorienta. Esse loop, repetido, é o Git profissional. Os conflitos que surgem quando duas pessoas mexem no mesmo arquivo são tratados no próximo capítulo ([[62-Branches-merge-conflitos-e-estrategias]]).

---

## 🍔 Aplicação na SaborExpress

Veja um dia real da dev do back-end da SaborExpress, a Camila, no fluxo Git.

**De manhã (sincronizar).** Antes de tocar em qualquer código, ela roda `git pull`. Traz o trabalho que o colega do front enviou na véspera — assim ela parte da versão mais atual e evita retrabalho.

**Durante o dia (commits em unidades lógicas).** A Camila está implementando "cupom de primeira compra". Em vez de um commit gigante no fim, ela quebra:
```bash
git add cupom.js
git commit -m "adiciona modelo de Cupom com validade"
# ... mais trabalho ...
git add pedidoService.js
git commit -m "aplica desconto de cupom no cálculo do pedido"
# ... mais trabalho ...
git add cupom.test.js
git commit -m "testa regra de cupom que não acumula com promoção"
```
Cada commit é uma micro-história completa. Quando, semanas depois, um bug de cupom aparece, o time olha o histórico e entende **exatamente** o que cada mudança fez — e pode reverter só a parte problemática.

**A mensagem que salvou o dia.** Três meses depois, alguém pergunta "por que o cupom não acumula com promoção? foi decisão ou bug?". O `git log` mostra o commit `"testa regra de cupom que não acumula com promoção"` com a data e a referência à história de usuário — resposta imediata. A mensagem de commit virou **documentação viva** da decisão.

**O erro desfeito com segurança.** Certa vez, a Camila commitou e **deu push** de uma mudança que quebrou o cálculo de frete. Como já estava no remoto (e o colega já tinha puxado), ela **não** usou `reset` (que reescreveria a história e bagunçaria o repo do colega). Usou `git revert <hash>`, que criou um novo commit desfazendo o estrago **de forma limpa e rastreável**, e deu push. O histórico registrou tanto o erro quanto a correção — honesto e seguro.

**O `git status` como bússola.** Toda vez que fica em dúvida ("o que eu mexi mesmo? já adicionei isso?"), a Camila roda `git status`. É o comando que ela mais digita — a bússola que a mantém orientada nas três áreas.

Moral: o dia da Camila é o mesmo loop — `pull`, trabalhar, `add`/`commit` em unidades lógicas com boas mensagens, `push` — e é isso que mantém o código da SaborExpress rastreável, colaborativo e à prova de sustos.

---

## 🏢 Como isso acontece em uma empresa

- **O ciclo é universal.** `pull` → trabalhar → `add`/`commit` → `push` é o batimento cardíaco de qualquer dev, em qualquer empresa. Você vai repeti-lo milhares de vezes.
- **Quase ninguém trabalha direto na `main`.** Na prática, o trabalho vai para **branches** e entra via **Pull Request** ([[62-Branches-merge-conflitos-e-estrategias]], [[64-Pull-Requests-code-review-e-issues]]). Este capítulo é a base; o fluxo real adiciona branches por cima.
- **Convenções de mensagem.** Muitos times adotam **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`...) para padronizar o histórico e até gerar changelogs automáticos.
- **Ferramentas gráficas coexistem com o terminal.** VS Code, GitKraken, SourceTree e a aba Git do editor ajudam a visualizar. Mas entender os comandos no terminal é o que te salva quando a interface gráfica confunde — e é esperado que você saiba.
- **`git status` e `git log` são consultados o tempo todo.** Ninguém memoriza o estado do repo; todo mundo pergunta ao Git. Não é sinal de fraqueza — é o uso correto.
- **Desfazer com `revert` em código publicado.** Times evitam reescrever história compartilhada (`reset`/`--force` na main é quase tabu). `revert` é a forma aceita de desfazer o que já foi para o remoto.

---

## ⚠️ Erros comuns

- **Esquecer o `git add` antes do commit.** O commit só grava o que está no **staging**. Editou mas não deu `add`? A mudança não entra no commit. `git status` avisa.
- **Commit gigante no fim do dia.** Juntar 40 arquivos e horas de trabalho num commit "várias mudanças" destrói a rastreabilidade. Commite em **unidades lógicas**, ao longo do trabalho.
- **Mensagens inúteis.** "fix", "wip", "asdf" não ajudam ninguém (nem você no futuro). Escreva o **quê** e o **porquê**.
- **Não dar `pull` antes de começar.** Trabalhar sobre uma versão desatualizada gera conflitos e retrabalho. `pull` primeiro, sempre.
- **Usar `reset --hard` sem entender.** Ele **descarta** mudanças de forma difícil de recuperar. No início, prefira `restore` e `revert`, que são mais seguros.
- **Reescrever história já publicada.** Dar `reset`/`--force` num branch compartilhado (como a `main`) bagunça o repo de todo mundo. Para desfazer o que já foi enviado, use `revert`.
- **Commitar tudo com `git add .` sem olhar.** Você pode incluir lixo, arquivos temporários ou segredos sem querer. Rode `git status`/`git diff` antes, e mantenha um bom `.gitignore`.
- **Pânico ao ver um erro do Git.** As mensagens do Git assustam, mas geralmente **explicam o que fazer**. Leia com calma; quase tudo é recuperável.

---

## 💡 Dicas profissionais

- **Rode `git status` o tempo todo.** É a sua bússola. Em dúvida sobre o estado do repo, pergunte a ele em vez de adivinhar. Ninguém acha isso amador — é o certo.
- **Revise com `git diff` antes de commitar.** Olhar exatamente o que vai entrar no commit evita incluir lixo, `console.log` esquecido ou segredo. É uma auto-revisão de 10 segundos.
- **Commite cedo e commite frequente, em unidades lógicas.** Cada commit = uma micro-história completa. Facilita reverter, revisar e entender. O histórico vira documentação.
- **Escreva mensagens no imperativo e explicando o porquê.** "adiciona validação de CEP" é melhor que "adicionei umas coisas". Pense em quem vai ler o `git log` daqui a um ano (você).
- **Para desfazer algo já publicado, use `revert`.** É seguro e rastreável. Guarde `reset` para ajustes locais que ninguém mais viu.
- **Aprenda a ler as mensagens de erro do Git.** Elas costumam dizer exatamente o comando a rodar. Ler em vez de entrar em pânico resolve 90% dos sustos.
- **Configure seu nome/e-mail e um `.gitignore` no início.** `git config` (nome e e-mail aparecem nos commits) e um bom `.gitignore` evitam dores depois.

---

## 🎈 Curiosidades

- A **staging area** (também chamada de *index*) é uma característica quase única do Git e uma das que mais confunde iniciantes — mas é justamente ela que permite **escolher** quais mudanças entram em cada commit, montando commits limpos mesmo quando você mexeu em muita coisa.
- O apelido **`origin`** para o remoto principal e **`main`** (antes `master`) para o branch principal são apenas **convenções**, não regras — você pode renomeá-los. Em 2020, boa parte da indústria migrou de `master` para `main` como padrão.
- O comando **`git reflog`** é uma rede de segurança secreta: ele registra **todos** os lugares por onde o HEAD passou, permitindo recuperar commits "perdidos" após um `reset` mal feito. É por isso que se diz que "o Git quase nunca perde nada de verdade".
- A diferença entre **`git pull`** e **`git fetch`**: `fetch` só **baixa** os commits do remoto sem mexer no seu trabalho; `pull` = `fetch` + `merge` (baixa **e** integra). Times cuidadosos às vezes preferem `fetch` para olhar antes de integrar.
- O **Conventional Commits** (`feat:`, `fix:`...) virou tão popular que existem ferramentas que **geram automaticamente** o número da versão e o changelog do projeto lendo as mensagens de commit — o histórico bem escrito vira automação.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **git init** | Cria um novo repositório Git na pasta atual. |
| **git clone** | Baixa uma cópia completa de um repositório remoto. |
| **git status** | Mostra o que mudou e o estado das três áreas (a bússola). |
| **git add** | Move mudanças para o staging (monta a "caixa"). |
| **git commit** | Grava o staging como um commit, com mensagem. |
| **git log** | Lista o histórico de commits. |
| **git diff** | Mostra as diferenças entre versões/áreas. |
| **git push** | Envia seus commits para o remoto. |
| **git pull** | Traz e integra commits que outros enviaram. |
| **git restore** | Descarta mudanças não commitadas de um arquivo. |
| **git revert** | Cria um commit que desfaz outro (forma segura de desfazer). |
| **origin / main** | Apelidos convencionais do remoto principal e do branch principal. |

---

## 📝 Resumo

- O trabalho diário com Git usa um núcleo pequeno de comandos que movem mudanças entre **três áreas**: **working directory** → (`add`) → **staging** → (`commit`) → **repositório** → (`push`/`pull`) → **remoto**.
- Comece com **`init`** (projeto novo) ou **`clone`** (projeto existente). Use **`status`** o tempo todo como bússola, **`add`** para montar o commit, **`commit -m`** para gravá-lo, **`log`/`diff`** para entender o histórico e as mudanças.
- Sincronize com **`push`** (enviar) e **`pull`** (receber) — e faça **`pull` antes de começar** a trabalhar. `origin`/`main` são apelidos convencionais.
- Desfaça com segurança: **`restore`** para o não commitado; **`revert`** para desfazer algo **já publicado** (seguro, não reescreve história); cuidado com `reset`.
- O ritmo saudável é **`pull` → trabalhar → `add`/`commit` em unidades lógicas com boas mensagens → `push`**. Commits pequenos e mensagens claras tornam o histórico uma **documentação viva** — e o `git status` dissolve qualquer medo.

---

## ☑️ Checklist de aprendizado

- [ ] Executo o ciclo status → add → commit sem hesitar.
- [ ] Entendo o papel do staging e por que ele existe.
- [ ] Inicio um repo (`init`/`clone`) e conecto a um remoto.
- [ ] Envio e recebo com `push`/`pull` e sei dar `pull` antes de começar.
- [ ] Leio o histórico com `log` e mudanças com `diff`.
- [ ] Desfaço com segurança usando `restore` e `revert`.
- [ ] Escrevo mensagens de commit claras e commito em unidades lógicas.

---

## ✏️ Exercícios

**1.** Descreva o caminho de uma mudança pelas **três áreas**, dizendo qual comando move de uma para a outra.

**2.** Você editou dois arquivos, mas só quer commitar as mudanças de **um** deles agora. Que comandos você usa e por quê o staging torna isso possível?

**3.** Explique a diferença entre **`git push`** e **`git pull`**, e diga por que se recomenda dar `pull` **antes** de começar a trabalhar.

**4.** Você deu commit **e push** de uma mudança que quebrou o sistema. Por que usar **`git revert`** é mais seguro que `git reset` nesse caso?

**5. (Reflexão)** Reescreva estas mensagens de commit ruins para versões boas, inventando um contexto plausível: (a) "fix"; (b) "mudanças"; (c) "agora vai". Depois, explique por que uma boa mensagem é útil meses depois.

---

## 💬 Respostas comentadas

**1.** Uma mudança começa no **working directory** (você edita o arquivo). Com **`git add`**, ela vai para a **staging area** (você marca o que entra no próximo commit). Com **`git commit`**, o conteúdo do staging é gravado no **repositório** (vira um commit no histórico). Depois, com **`git push`**, os commits do repositório local vão para o **remoto**; e **`git pull`** traz para o local os commits que estão no remoto.

**2.** Você usa `git add <arquivo1>` **apenas** no arquivo que quer commitar agora, e depois `git commit -m "..."`. O **staging** torna isso possível porque ele é uma área intermediária onde você **seleciona** exatamente quais mudanças entram no próximo commit — em vez de commitar tudo que está modificado de uma vez. Assim, o outro arquivo continua modificado no working directory (fora do commit), e você pode commitá-lo separadamente depois, mantendo commits focados em uma mudança lógica cada.

**3.** **`git push`** **envia** seus commits locais para o servidor remoto (para os colegas verem); **`git pull`** **traz** para a sua máquina os commits que os colegas enviaram ao remoto e os integra ao seu repositório. Recomenda-se dar `pull` **antes de começar** porque assim você parte da **versão mais recente** do projeto — evitando trabalhar sobre código desatualizado, o que geraria conflitos e retrabalho ao tentar enviar depois.

**4.** Porque a mudança **já foi publicada** (push) e provavelmente já foi puxada por colegas. **`git revert`** cria um **novo commit** que desfaz o commit problemático, **sem reescrever a história** — o histórico permanece consistente para todos, e a correção fica rastreável (registra o erro e o conserto). Já **`git reset`** **reescreve a história** (remove/move commits), o que, num branch compartilhado, **diverge** do repositório dos colegas e bagunça o trabalho de todo mundo (eles teriam commits que você "apagou"). Por isso, para desfazer algo já enviado, `revert` é a forma segura; `reset` fica para ajustes locais que ninguém mais viu.

**5.** Exemplos de reescrita (contexto inventado): (a) "fix" → **"corrige cálculo de frete que ignorava o CEP em pedidos acima de R$50"**; (b) "mudanças" → **"adiciona filtro de restaurantes por tempo de entrega na tela de busca"**; (c) "agora vai" → **"corrige erro que impedia finalizar pedido quando o cupom expirava"**. Uma boa mensagem é útil meses depois porque, ao investigar um bug ou entender **por que** o código é de certo jeito, o `git log` vira uma **documentação viva**: você lê a mensagem e descobre na hora o que aquela mudança fez e por quê (às vezes evitando reintroduzir um bug já corrigido, ou entendendo uma decisão), sem precisar decifrar o código nem perguntar a quem talvez nem esteja mais na equipe.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[60-Controle-de-versao-e-por-que-Git-venceu]] — o modelo mental que dá sentido a estes comandos.
- **Próximo (linear):** [[62-Branches-merge-conflitos-e-estrategias]] — o outro pilar: trabalhar em paralelo com branches.
- **Aplicação:** [[63-GitHub-GitLab-e-Bitbucket]] (o remoto onde você dá push) e [[64-Pull-Requests-code-review-e-issues]] (como o código entra no projeto).
- **Base:** [[25-Terminal-e-comandos-essenciais]] (Vol. 2) — o terminal onde você digita tudo isso.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 17 → **Capítulo 61 de 119**.
