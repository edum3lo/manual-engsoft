# Capítulo 62 — Branches, merge, conflitos e estratégias

> **Volume 3 — Desenvolvimento de Software** · Módulo 17 — Git
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é uma **branch** e por que ela é o superpoder do Git.
- Criar, trocar e mesclar branches (`branch`, `checkout`/`switch`, `merge`).
- Entender o que é um **conflito de merge** e resolvê-lo sem pânico.
- Diferenciar **merge** de **rebase** e saber quando usar cada um.
- Conhecer as **estratégias de branching** (Git Flow, GitHub Flow, trunk-based) e quando cada uma faz sentido.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 25 minutos praticando.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[61-Git-no-dia-a-dia]] — o ciclo add/commit/push/pull.
- Ter o Git instalado para praticar.

---

## 📖 Introdução

Se o commit é o "save point" do Git, a **branch** é o que transforma o Git de um simples histórico numa máquina de colaboração. Uma branch (ramo) é uma **linha de desenvolvimento paralela** — uma cópia independente do projeto onde você pode trabalhar sem afetar a versão principal. É o recurso que permite dez pessoas mexerem no mesmo projeto **ao mesmo tempo**, cada uma na sua "realidade", combinando o trabalho depois. Foi justamente por fazer branches serem **baratas e fáceis** que o Git venceu os concorrentes ([[60-Controle-de-versao-e-por-que-Git-venceu]]).

A ideia é poderosa e simples: em vez de todos editarem a mesma versão (e se atropelarem), cada tarefa ganha sua **branch**. Você cria uma branch para "adicionar cupom", trabalha nela isolado, e quando termina, **mescla (merge)** de volta na principal. Enquanto isso, o colega faz o mesmo na branch dele. As duas linhas correm em paralelo e se juntam no fim. É assim que times evitam o caos de "todo mundo na mesma versão".

Onde as linhas se juntam, às vezes surge o temido **conflito de merge** — quando duas pessoas mudaram a **mesma parte** do mesmo arquivo e o Git não sabe qual manter. Conflitos assustam iniciantes, mas são normais e **resolúveis** — só que ninguém explica como, e o pânico toma conta. Este capítulo desmistifica tudo: branches, merge, conflitos (com a calma de quem entende), a diferença entre merge e rebase, e as **estratégias** que os times usam para organizar suas branches. Dominar isso é o que te deixa **colaborar** de verdade — o pré-requisito para os Pull Requests do próximo módulo.

---

## 🧠 Analogia

Pense em escrever um **livro em grupo**, e cada autor tirando uma **fotocópia** do manuscrito para trabalhar.

A versão oficial, encadernada, é a branch **principal (main)**. Quando a Ana quer reescrever o capítulo 3, ela não rabisca no original — ela tira uma **fotocópia** (cria uma **branch**), leva para casa e reescreve à vontade. Enquanto isso, o Bruno tira **outra** fotocópia e melhora o capítulo 7. Os dois trabalham **em paralelo**, cada um na sua cópia, sem atrapalhar o original nem um ao outro.

Quando terminam, eles **devolvem** suas mudanças ao manuscrito oficial (o **merge**). Se a Ana mexeu no cap. 3 e o Bruno no cap. 7, juntar é trivial — são partes diferentes. Mas e se **os dois** reescreveram o **mesmo parágrafo** do cap. 5, de formas diferentes? Aí o editor precisa **decidir** qual versão fica (ou combinar as duas). Isso é um **conflito de merge**: o Git não adivinha qual das duas edições da mesma linha é a certa, e pede que **você** decida.

Guarde: branch é a fotocópia onde você trabalha isolado; merge é devolver ao original; conflito é quando dois autores mudaram o mesmo trecho e alguém precisa escolher. Ninguém entra em pânico ao editar um livro em grupo — e o merge do Git é a mesma coisa.

---

## 🧩 Conceitos fundamentais

### 1. O que é uma branch

Uma **branch** é uma linha de desenvolvimento independente — tecnicamente, um **ponteiro móvel** para um commit. A branch principal costuma se chamar **`main`** (antes `master`). Quando você cria uma branch nova, cria uma linha paralela onde seus commits não afetam a `main` (nem as branches dos colegas) até você mesclar.

> **Termo explicado — branch (ramo):** uma linha de desenvolvimento paralela e independente; permite trabalhar isolado da versão principal e mesclar depois.

```
                    ●──●──● (feature/cupom)   ← sua branch de trabalho
                   /
main:  ●──●──●──●──────────●  (main continua intacta enquanto você trabalha)
```

### 2. Criar, trocar e mesclar

- **`git branch <nome>`** — cria uma branch. **`git switch <nome>`** (ou o antigo `git checkout <nome>`) — troca para ela. Atalho: **`git switch -c <nome>`** cria **e** já troca.
- Você trabalha na branch (add/commit normalmente).
- **`git merge <nome>`** — estando na `main`, mescla a branch nela, trazendo os commits.

```bash
git switch -c feature/cupom    # cria e entra na branch
# ... trabalha, add, commit ...
git switch main                # volta para a principal
git merge feature/cupom        # traz o trabalho da branch para a main
```

### 3. Tipos de merge: fast-forward vs. merge commit

- **Fast-forward:** se a `main` não avançou desde que você criou a branch, o Git só "adianta o ponteiro" — sem commit extra.
- **Merge commit (3-way):** se a `main` **também** recebeu commits nesse meio-tempo, o Git cria um **commit de merge** especial que une as duas linhas.

> **Termo explicado — merge:** juntar o trabalho de uma branch em outra. Pode ser um "fast-forward" (avanço simples) ou gerar um "commit de merge" que une duas histórias.

### 4. Conflito de merge

Um **conflito** acontece quando duas branches modificaram **a mesma parte do mesmo arquivo** de formas diferentes. O Git não adivinha qual manter e **pausa o merge**, marcando o trecho conflitante no arquivo assim:

```
<<<<<<< HEAD (sua versão, na main)
   const freteMinimo = 5.00;
=======
   const freteMinimo = 7.50;
>>>>>>> feature/cupom (a versão da outra branch)
```

Você **edita** o arquivo escolhendo qual versão fica (ou combinando as duas), remove os marcadores `<<<`, `===`, `>>>`, e então:
```bash
git add arquivo_resolvido.js
git commit                     # conclui o merge
```

> **Termo explicado — conflito de merge:** situação em que o Git não consegue mesclar automaticamente porque a mesma parte do mesmo arquivo mudou em duas branches; exige que a pessoa decida manualmente qual versão fica.

Conflitos são **normais** e **não** significam que algo quebrou — só que duas pessoas tocaram no mesmo lugar. Resolvê-los é rotina.

### 5. Merge vs. rebase

Há duas formas de trazer o trabalho da `main` para a sua branch (ou integrar sua branch):

- **Merge:** cria um commit de merge que **preserva** a história real (as duas linhas e o ponto de união). Histórico mais fiel, porém com mais "curvas".
- **Rebase:** **reaplica** seus commits **por cima** da ponta atual da `main`, como se você tivesse começado a trabalhar a partir dela agora. Deixa a história **linear e limpa**, mas **reescreve** os commits (novos hashes).

> **Termo explicado — rebase:** reaplicar seus commits sobre a ponta atual de outra branch, produzindo um histórico linear — ao custo de reescrever (recriar) esses commits.

**A regra de ouro do rebase:** **nunca faça rebase de commits já publicados/compartilhados** (que outros já puxaram), porque reescrever história compartilhada bagunça o repo dos colegas. Rebase é ótimo para **limpar sua branch local** antes de compartilhar; merge é o padrão seguro para integrar o que já é público.

### 6. Estratégias de branching

Times combinam **como** organizam as branches:

- **GitHub Flow (simples):** só a `main` (sempre pronta para deploy) + branches curtas de feature que entram via Pull Request. Simples, popular, casa com entrega contínua.
- **Trunk-based development:** todos integram na `main` (o "tronco") **muito** frequentemente (várias vezes ao dia), com branches curtíssimas ou nenhuma. Favorece CI/CD e reduz conflitos grandes. Preferido por times de alta performance.
- **Git Flow (estruturado):** branches de longa vida (`main`, `develop`) + branches de `feature`, `release` e `hotfix`. Poderoso, mas **pesado**; hoje considerado exagero para a maioria (bom para produtos com versões formais/releases agendados).

> **Termo explicado — estratégia de branching:** convenção do time sobre como criar, nomear e mesclar branches (GitHub Flow, trunk-based, Git Flow), equilibrando simplicidade e controle.

---

## ⚙️ Como funciona na prática

O fluxo real de trabalho com branches, do início ao merge:

**1. Uma branch por tarefa.** Ao pegar uma história ("adicionar cupom"), você cria uma branch a partir da `main` atualizada:
```bash
git switch main && git pull    # parte do mais recente
git switch -c feature/cupom-primeira-compra
```
Nome descritivo (muitos times usam prefixos: `feature/`, `fix/`, `chore/`).

**2. Trabalhe isolado.** Você faz commits na sua branch sem medo — a `main` e as branches dos colegas continuam intactas. Se der tudo errado, você **descarta** a branch e nada se perde.

**3. Mantenha-se atualizado.** Se a tarefa demora, a `main` avança. Traga essas mudanças para a sua branch (via `merge main` ou `rebase main`) periodicamente, para não acumular um conflito gigante no fim. **Branches curtas = menos conflito** — princípio central.

**4. Integre (via Pull Request).** Na prática profissional, você **não** mescla direto: abre um **Pull Request** ([[64-Pull-Requests-code-review-e-issues]]), o time revisa, e então a branch entra na `main`. Este capítulo é a mecânica; o PR é o processo por cima.

**5. Resolva conflitos com calma.** Se surgir conflito, o Git **avisa e pausa**. Você abre o arquivo, vê os dois lados marcados, **decide** o que fica, remove os marcadores, `add` e conclui. Não há mágica nem perigo — só uma decisão humana que o Git não podia tomar sozinho.

**A intuição que evita dor:** conflitos crescem com o **tamanho** e a **idade** das branches. Uma branch que viveu duas semanas divergindo da `main` vira um pesadelo de merge. Por isso a tendência moderna (trunk-based, GitHub Flow) é **branches pequenas e curtas**, integradas rápido — o oposto do "sumir por um mês na minha branch". Isso conecta direto com a entrega contínua do Volume 4.

---

## 🍔 Aplicação na SaborExpress

O time da SaborExpress usa **GitHub Flow**: a `main` está sempre pronta para deploy, e cada tarefa vive numa branch curta que entra por Pull Request.

**Trabalho paralelo sem colisão.** Numa sprint, três pessoas trabalhavam ao mesmo tempo:
- A Camila em `feature/cupom-primeira-compra` (back-end).
- O Diego em `feature/tela-acompanhar-pedido` (front-end).
- A Bia em `fix/frete-cep-invalido` (correção).

As três branches corriam em paralelo, cada uma isolada. Ninguém sobrescreveu o trabalho de ninguém — o pesadelo dos "zips por pen drive" do [[60-Controle-de-versao-e-por-que-Git-venceu]] ficou no passado.

**Um conflito resolvido sem drama.** A Camila (cupom) e a Bia (frete) mexeram, sem saber, na **mesma função** `calcularTotalPedido`. Quando a branch da Bia entrou na `main` primeiro, a da Camila deu **conflito** no merge. A Camila não entrou em pânico: abriu o arquivo, viu os dois lados marcados (`<<<< HEAD` com a mudança de frete da Bia, `>>>>` com a dela do cupom), percebeu que as duas mudanças **precisavam coexistir** (aplicar o cupom **e** o novo cálculo de frete), combinou as duas no código, removeu os marcadores, deu `add` e concluiu o merge. Cinco minutos. O conflito não era um erro — era o Git avisando "duas pessoas tocaram aqui, decida você".

**Branches curtas evitaram o pior.** O time tem uma regra: nenhuma branch vive mais que poucos dias. Quando o Diego percebeu que a tela de acompanhamento ia demorar duas semanas, ele **quebrou** em branches menores ("layout da tela", "integração com status", "mapa do entregador"), cada uma integrada em poucos dias. Se tivesse ficado duas semanas numa branch só, teria acumulado um conflito monstruoso com tudo que os colegas mudaram na `main` nesse meio-tempo.

**Rebase para limpar antes de compartilhar.** Antes de abrir o PR, a Camila usou `git rebase main` na sua branch **local** (ainda não compartilhada) para deixar o histórico linear e limpo — mas **jamais** rebasearia commits que os colegas já tivessem puxado, pela regra de ouro.

Moral: as branches deram à SaborExpress trabalho paralelo sem colisão; os conflitos foram tratados como rotina (não catástrofe); e a disciplina de **branches curtas** manteve os merges pequenos e indolores.

---

## 🏢 Como isso acontece em uma empresa

- **Uma branch por tarefa/PR é o padrão universal.** Você quase nunca commita direto na `main`. Cria uma branch, trabalha, abre um **Pull Request** ([[64-Pull-Requests-code-review-e-issues]]), e ela entra após revisão.
- **A `main` costuma ser protegida.** Empresas configuram a `main` para **não** aceitar push direto — só via PR aprovado e com testes passando (Volume 4). Isso protege a versão que vai para produção.
- **GitHub Flow e trunk-based dominam.** A maioria dos times modernos usa uma dessas duas (simples, branches curtas). O **Git Flow** completo caiu em desuso para a maioria, ficando em produtos com releases formais.
- **Convenções de nome.** `feature/`, `fix/`, `hotfix/`, `chore/` + descrição (ou o número da issue). Padroniza e facilita achar o que é cada branch.
- **Conflitos são rotina, não crise.** Todo dev resolve conflitos regularmente. Ferramentas (VS Code, GitKraken) ajudam a visualizar os dois lados. Ninguém estranha um conflito — só se resolve.
- **Merge vs. rebase é quase "religião".** Times têm preferências fortes (alguns exigem histórico linear via rebase/squash; outros preferem preservar merges). O importante é **seguir a convenção do time** — e nunca rebasear história compartilhada.
- **Squash merge é comum.** Muitos times "achatam" (squash) todos os commits de um PR num só ao mesclar, deixando a `main` com um commit limpo por feature.

---

## ⚠️ Erros comuns

- **Trabalhar direto na `main`.** Some com o isolamento das branches e arrisca a versão de produção. Sempre crie uma branch por tarefa.
- **Branches de vida longa.** Uma branch que diverge da `main` por semanas acumula um conflito enorme e arriscado. **Branches curtas** são a melhor prevenção de conflitos.
- **Pânico ao ver um conflito.** Conflito **não** é bug nem perda de código — é o Git pedindo uma decisão humana. Abra o arquivo, escolha, `add`, conclua. Rotina.
- **Deixar os marcadores de conflito no código.** Esquecer de remover `<<<<`, `====`, `>>>>` faz o código quebrar. Sempre revise o arquivo após resolver.
- **Rebase de história compartilhada.** Rebasear commits que outros já puxaram bagunça o repo deles. Rebase só na sua branch **local** e não publicada.
- **Merge sem atualizar antes.** Mesclar sem ter trazido as mudanças recentes da `main` gera conflitos que poderiam ter sido resolvidos aos poucos.
- **Escolher o lado errado num conflito sem entender.** Aceitar cegamente "a minha versão" ou "a deles" pode apagar o trabalho do outro. Entenda **por que** cada lado mudou aquilo antes de decidir (muitas vezes as duas mudanças precisam coexistir).
- **Adotar Git Flow completo sem necessidade.** Para a maioria dos times, é peso e burocracia. Comece simples (GitHub Flow).

---

## 💡 Dicas profissionais

- **Uma branch por tarefa, com nome descritivo.** `feature/cupom` diz o que é; `minha-branch` não. Facilita para você e para o time.
- **Mantenha as branches curtas e integre rápido.** É a arma nº 1 contra conflitos dolorosos. Se a tarefa é grande, quebre em branches menores. Branch curta = merge fácil.
- **Atualize sua branch com a `main` com frequência.** Trazer as mudanças recentes aos poucos transforma um conflito gigante no fim em vários mini-conflitos triviais no caminho.
- **Não tenha medo de conflitos — entenda os dois lados.** Ao resolver, leia **por que** cada versão mudou aquilo. Muitas vezes a resposta certa é **combinar** as duas, não descartar uma.
- **Rebase para limpar o local, merge para integrar o público.** Use rebase na sua branch antes de compartilhar (histórico limpo); nunca rebaseie o que já é compartilhado.
- **Descarte branches sem dó.** Experimento que não deu certo? Apague a branch — a `main` está intacta. Isso te dá liberdade para arriscar.
- **Siga a estratégia do time.** GitHub Flow, trunk-based ou Git Flow — o importante é a consistência. Ao entrar num time, pergunte "qual é o nosso fluxo de branches?".

---

## 🎈 Curiosidades

- No Git, criar uma branch é **instantâneo** e quase não ocupa espaço, porque uma branch é só um **ponteiro de 41 bytes** para um commit. Nos sistemas antigos (como SVN), "branch" copiava arquivos e era lenta e cara — foi por isso que o Git revolucionou o uso de branches.
- O termo **"trunk"** (tronco) em trunk-based development vem da metáfora da **árvore**: o tronco principal (a `main`) e os galhos (branches). "Trunk-based" é, no fundo, "trabalhe perto do tronco, com galhos curtos".
- Estudos de engenharia (como os do relatório **DORA / Accelerate**) associam **trunk-based development** e branches de vida curta a times de **alta performance** — quanto mais rápido você integra, menos conflitos e mais entregas.
- A migração de **`master`** para **`main`** como nome do branch principal aconteceu em massa por volta de **2020**, por razões de linguagem inclusiva. O GitHub passou a usar `main` como padrão em repositórios novos.
- O **`git rebase -i`** (rebase interativo) permite **reescrever** a história local: reordenar, juntar (squash), editar e apagar commits antes de compartilhar. É uma ferramenta poderosa para limpar a branch — e uma faca de dois gumes se usada em história compartilhada.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Branch (ramo)** | Linha de desenvolvimento paralela e independente. |
| **main** | A branch principal (antes chamada `master`). |
| **git switch / checkout** | Trocar de branch (switch -c cria e troca). |
| **Merge** | Juntar o trabalho de uma branch em outra. |
| **Fast-forward** | Merge simples que só avança o ponteiro (sem commit extra). |
| **Merge commit** | Commit especial que une duas histórias divergentes. |
| **Conflito de merge** | Mesma parte do mesmo arquivo mudou em duas branches; exige decisão manual. |
| **Rebase** | Reaplicar seus commits sobre outra branch (histórico linear, reescreve commits). |
| **GitHub Flow** | Estratégia simples: main + branches curtas via PR. |
| **Trunk-based** | Integrar na main muito frequentemente, com branches curtíssimas. |
| **Git Flow** | Estratégia estruturada com branches de longa vida (develop, release, hotfix). |
| **Squash** | Achatar vários commits num só ao mesclar. |

---

## 📝 Resumo

- Uma **branch** é uma linha de desenvolvimento paralela — o superpoder que permite muitas pessoas trabalharem no mesmo projeto ao mesmo tempo, isoladas, e combinarem depois. Branches baratas foram o que fez o Git vencer.
- O fluxo: criar/trocar (`switch -c`), trabalhar (add/commit), e **mesclar** (`merge`) de volta na `main`. O merge pode ser **fast-forward** (avanço simples) ou gerar um **commit de merge**.
- Um **conflito de merge** ocorre quando a mesma parte do mesmo arquivo mudou em duas branches. É **normal e resolúvel**: você escolhe o que fica (muitas vezes combinando os dois lados), remove os marcadores, `add` e conclui. Não é catástrofe — é uma decisão humana.
- **Merge** preserva a história real; **rebase** deixa o histórico linear mas **reescreve** commits — nunca faça rebase de história **já compartilhada**.
- **Estratégias de branching:** **GitHub Flow** (main + branches curtas via PR) e **trunk-based** (integração muito frequente) dominam hoje; **Git Flow** é mais pesado e menos usado. A melhor prevenção de conflitos é **branches curtas, integradas rápido**.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é uma branch e por que ela permite trabalho paralelo.
- [ ] Crio, troco e mesclo branches com os comandos certos.
- [ ] Entendo o que causa um conflito de merge e sei resolvê-lo sem pânico.
- [ ] Diferencio merge de rebase e conheço a regra de ouro do rebase.
- [ ] Conheço GitHub Flow, trunk-based e Git Flow e quando usar cada um.
- [ ] Sei por que branches curtas previnem conflitos dolorosos.

---

## ✏️ Exercícios

**1.** Com a analogia do livro em grupo, explique o que é uma **branch** e o que é um **conflito de merge**.

**2.** Escreva a sequência de comandos para: criar uma branch `feature/login` a partir da main atualizada, e depois mesclá-la de volta na main.

**3.** Você abre um arquivo após um merge e vê `<<<<<<< HEAD`, `=======` e `>>>>>>> feature/x`. O que isso significa e quais são os passos para resolver?

**4.** Explique a diferença entre **merge** e **rebase**, e por que **nunca** se deve fazer rebase de commits já compartilhados.

**5. (Reflexão)** Por que **branches de vida longa** tendem a gerar conflitos dolorosos, e como as estratégias modernas (GitHub Flow, trunk-based) evitam isso? Relacione com o caso do Diego, que quebrou uma tarefa de duas semanas em branches menores.

---

## 💬 Respostas comentadas

**1.** Uma **branch** é como a **fotocópia** do manuscrito que cada autor leva para casa para trabalhar: uma cópia independente onde você reescreve o "seu capítulo" sem mexer no original nem no trabalho dos outros. O **merge** é devolver suas mudanças ao manuscrito oficial. Um **conflito de merge** é quando **dois autores reescreveram o mesmo parágrafo** de formas diferentes: o Git (o editor) não sabe qual versão manter e pede que **você** decida — escolher uma, ou combinar as duas.

**2.** 
```bash
git switch main
git pull                       # parte da main atualizada
git switch -c feature/login    # cria e entra na branch
# ... trabalha, git add, git commit ...
git switch main                # volta para a main
git merge feature/login        # mescla a branch na main
```
(Na prática profissional, o merge final acontece via Pull Request, mas a mecânica é essa.)

**3.** Significa que houve um **conflito de merge**: a mesma parte do arquivo foi alterada de formas diferentes nas duas branches, e o Git não pôde decidir sozinho. Entre `<<<<<<< HEAD` e `=======` está **a sua versão** (a da branch atual); entre `=======` e `>>>>>>> feature/x` está **a versão da outra branch**. Passos para resolver: (1) editar o trecho, escolhendo qual versão fica **ou combinando as duas** conforme o que faz sentido; (2) **remover** os marcadores `<<<<`, `====`, `>>>>`; (3) `git add <arquivo>` para marcar como resolvido; (4) `git commit` para concluir o merge.

**4.** **Merge** junta as branches criando (quando necessário) um **commit de merge** que **preserva** as duas linhas de história e o ponto onde se uniram — histórico fiel, porém com "curvas". **Rebase** **reaplica** seus commits por cima da ponta atual da outra branch, produzindo um histórico **linear e limpo**, mas **reescrevendo** os commits (eles ganham novos hashes, como se tivessem sido feitos agora). Nunca se deve rebasear commits **já compartilhados** porque, ao reescrevê-los, sua história **diverge** da que os colegas já puxaram — quando eles tentarem sincronizar, o Git verá dois conjuntos de commits "diferentes" para o mesmo trabalho, gerando confusão e conflitos difíceis. Rebase é seguro só na sua branch **local** e não publicada.

**5.** Branches de vida longa geram conflitos dolorosos porque, quanto mais tempo uma branch fica **divergindo** da `main`, mais mudanças se acumulam **dos dois lados** (você na sua branch, os colegas na main) — e no merge final todas essas divergências colidem de uma vez, criando um conflito enorme, arriscado e difícil de resolver. As estratégias modernas evitam isso mantendo **branches curtas e integradas com frequência**: no **GitHub Flow**, cada branch de feature é pequena e entra rápido via PR; no **trunk-based**, integra-se na main várias vezes ao dia. Assim, cada merge é **pequeno** e os conflitos, quando aparecem, são triviais. Foi o que o **Diego** fez: ao perceber que a tela de acompanhamento levaria duas semanas, quebrou-a em branches menores ("layout", "integração com status", "mapa") integradas em poucos dias cada — em vez de acumular duas semanas de divergência numa branch só, que colidiria monstruosamente com tudo que os colegas mudaram na main nesse período.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[61-Git-no-dia-a-dia]] — o ciclo add/commit/push/pull sobre o qual as branches operam.
- **Próximo (linear):** [[63-GitHub-GitLab-e-Bitbucket]] — onde as branches remotas e a colaboração moram.
- **Aplicação direta:** [[64-Pull-Requests-code-review-e-issues]] — o processo por cima do merge: PR e revisão.
- **Aplicação futura:** Volume 4 (CI/CD e entrega contínua) — por que branches curtas e trunk-based casam com deploy frequente.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 17 → **Capítulo 62 de 119**.
