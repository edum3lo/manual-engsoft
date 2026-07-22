# Capítulo 44 — Kanban e fluxo contínuo

> **Volume 3 — Desenvolvimento de Software** · Módulo 12 — Processos e Metodologias
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Explicar o que é o **Kanban** e a ideia de **fluxo contínuo** (sem sprints fixas).
- Entender o **quadro Kanban** e o significado das colunas (*To Do → Doing → Done*).
- Compreender o conceito central de **limite de trabalho em progresso (WIP limit)** e por que "parar de começar e começar a terminar" acelera o time.
- Diferenciar **Kanban de Scrum** e saber quando cada um se encaixa melhor.
- Conhecer métricas de fluxo como **lead time**, **cycle time** e o **gráfico de fluxo cumulativo**.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[43-Scrum-na-pratica]] — vamos comparar Kanban e Scrum o tempo todo.
- Ajuda ter lido [[42-O-Manifesto-Agil]] — o Kanban também é uma forma de viver a agilidade.

---

## 📖 Introdução

Você já viu, num restaurante movimentado, aquele **balcão da cozinha com as comandas penduradas**? Cada pedido é um papel; ele entra à esquerda, avança conforme é preparado e sai à direita quando fica pronto. Qualquer pessoa, batendo o olho, sabe o que está para fazer, o que está sendo feito e o que já saiu. Esse é, literalmente, o espírito do **Kanban** — palavra japonesa que significa "cartão" ou "sinal visual".

O Kanban nasceu na **Toyota**, nos anos 1950, para controlar o fluxo de peças na linha de montagem, e foi adaptado para software nos anos 2000. Ao contrário do Scrum, ele **não tem sprints, não tem papéis obrigatórios e não tem eventos fixos**. Ele é ainda mais leve: no fundo, são só **três práticas** — visualizar o trabalho, limitar o quanto se faz ao mesmo tempo, e otimizar o fluxo.

Por que isso importa para você? Porque muitos times — especialmente os de **manutenção, suporte e operação**, onde o trabalho chega a qualquer hora e não dá para "planejar 2 semanas" — usam Kanban em vez de Scrum. E porque o conceito mais poderoso do Kanban, o **limite de trabalho em progresso**, é uma das ideias mais contraintuitivas e transformadoras que você vai aprender: **fazer menos coisas ao mesmo tempo faz o time entregar mais rápido**. Parece mágica; é matemática.

---

## 🧠 Analogia

Pense numa **rodovia**.

Quando há **poucos carros**, todos andam na velocidade máxima e chegam rápido. Quando a rodovia **enche além da conta**, acontece o paradoxo: mais carros na pista fazem *todo mundo* andar mais devagar — vira aquele congestionamento onde ninguém sai do lugar, mesmo com todos os motoristas "trabalhando" (pé no acelerador). A pista tem uma **capacidade ideal**; passar disso não aumenta a vazão, **diminui**.

O trabalho de um time é igual. Cada tarefa "em andamento" é um carro na pista. Se cada pessoa está fazendo cinco coisas ao mesmo tempo, o time inteiro vira um congestionamento: muita coisa começada, tudo andando devagar, nada terminando. O **limite de trabalho em progresso** do Kanban é como controlar quantos carros entram na rodovia para mantê-la fluindo. Menos coisas ao mesmo tempo → cada uma termina mais rápido → a vazão total **aumenta**. Guarde essa cena: **congestionamento de tarefas é tão real quanto o de trânsito.**

---

## 🧩 Conceitos fundamentais

### 1. O quadro Kanban — tornar o trabalho visível

O **quadro Kanban** é uma tabela de colunas que representam as **etapas do fluxo** do trabalho. Cada tarefa é um **cartão** que se move da esquerda para a direita conforme avança. O quadro mínimo tem três colunas:

```
   A FAZER          FAZENDO           FEITO
  (To Do)          (Doing)           (Done)
 ┌─────────┐     ┌─────────┐      ┌─────────┐
 │ [card]  │     │ [card]  │      │ [card]  │
 │ [card]  │ ──► │ [card]  │ ───► │ [card]  │
 │ [card]  │     │         │      │ [card]  │
 └─────────┘     └─────────┘      └─────────┘
```

Times reais costumam ter mais colunas, refletindo o fluxo verdadeiro: *Backlog → A fazer → Em desenvolvimento → Em revisão → Em teste → Pronto para deploy → Feito*. O poder está em **enxergar tudo de uma vez**: onde as coisas estão paradas, onde acumulam, quem está sobrecarregado.

> **Termo explicado — quadro Kanban:** painel visual com colunas que representam as etapas do trabalho; cada tarefa é um cartão que caminha da esquerda (a fazer) para a direita (feito).

### 2. O WIP limit — o coração do Kanban

**WIP** quer dizer *Work In Progress* (trabalho em progresso). O **WIP limit** é um número máximo de cartões que podem estar em cada coluna ao mesmo tempo. Por exemplo: "a coluna *Fazendo* aceita no máximo 3 cartões". Se ela está cheia, **ninguém pode puxar** um cartão novo — primeiro é preciso **terminar** algo que já está lá.

> **Termo explicado — WIP limit (limite de trabalho em progresso):** número máximo de tarefas permitidas simultaneamente numa etapa. Força o time a terminar antes de começar mais.

Esse limite parece uma restrição chata, mas é o que **destrava** o time. Ele obriga a máxima do Kanban: **"pare de começar, comece a terminar."** Quando não se pode iniciar mais nada, os gargalos ficam visíveis (a coluna que vive lotada é o gargalo) e o time se junta para **desentupir** em vez de empilhar mais trabalho começado.

### 3. Sistema puxado (pull) vs. empurrado (push)

No Kanban, o trabalho é **puxado**: quando você termina, você **puxa** o próximo cartão. Ninguém **empurra** tarefas para cima de você. Isso respeita a capacidade real de cada etapa, em vez de entupir todo mundo com mais do que consegue processar.

> **Termo explicado — sistema puxado (pull):** o trabalho novo só entra quando há capacidade para recebê-lo, "puxado" por quem terminou — o oposto de empurrar tarefas indiscriminadamente.

### 4. Fluxo contínuo (sem sprints)

O Kanban **não tem sprints**. Não existe "começou e terminou o ciclo". As tarefas fluem **continuamente**: assim que uma fica pronta, pode ir para produção; assim que surge uma nova, entra no backlog e é puxada quando houver espaço. Priorizar é reordenar a fila a qualquer momento. Isso torna o Kanban ideal para trabalho **imprevisível** (suporte, bugs, pedidos que chegam a qualquer hora).

### 5. As métricas de fluxo

- **Lead time:** tempo total desde que o pedido **entrou** até ficar **pronto** (a visão do cliente).
- **Cycle time:** tempo desde que o time **começou** a trabalhar até terminar (a visão do time).
- **Throughput (vazão):** quantas tarefas o time entrega por período.
- **Cumulative Flow Diagram (CFD):** um gráfico que mostra, ao longo do tempo, quantos cartões há em cada etapa — faixas que incham denunciam gargalos.

Reduzir o WIP tende a **reduzir o cycle time** (menos congestionamento) — de novo, a matemática da rodovia. Essa relação é formalizada pela **Lei de Little**.

---

## ⚙️ Como funciona na prática

Imagine um time de suporte/manutenção com o quadro: *A fazer → Fazendo (WIP 3) → Revisão (WIP 2) → Feito*.

**Segunda de manhã.** Chegam 6 chamados. Eles entram em "A fazer", priorizados. O time tem 4 pessoas, mas o WIP de "Fazendo" é 3 — então, no máximo, três chamados estão sendo trabalhados ao mesmo tempo. A quarta pessoa, em vez de "começar o quarto", ajuda a destravar um dos três ou revisa (puxa da coluna Revisão).

**Meio da manhã.** Um cartão em "Fazendo" empaca (depende de um fornecedor). O dev **não** pega outro para "não ficar parado" — isso encheria a pista. Em vez disso, ele sinaliza o impedimento e vai **ajudar a terminar** outro cartão ou a limpar a coluna Revisão. A regra é implacável: **terminar antes de começar**.

**Ao longo do dia.** Conforme cartões chegam em "Feito", os de "A fazer" são puxados. A prioridade pode mudar a qualquer instante: se entra um chamado crítico ("o pagamento caiu!"), ele fura a fila em "A fazer" e é puxado assim que abrir espaço — **sem esperar o fim de uma sprint**, porque não há sprint.

**Fim da semana.** O time olha o **CFD**: a faixa "Revisão" vive inchando — sinal de que o gargalo é a revisão de código. A ação não é "trabalhar mais"; é **aumentar a capacidade de revisão** (ou baixar o WIP de "Fazendo" para não alimentar o gargalo).

Repare como o Kanban é **evolutivo, não revolucionário**: você não muda papéis nem cria cerimônias. Começa desenhando o fluxo que **já existe**, torna-o visível, põe limites e vai ajustando. É por isso que ele é fácil de adotar por cima de qualquer processo — inclusive por cima do próprio Scrum (o famoso **Scrumban**).

---

## 🍔 Aplicação na SaborExpress

A SaborExpress cresceu e agora tem **dois times** com necessidades diferentes:

**O time de produto** (novas funcionalidades) usa **Scrum**: dá para planejar em sprints de 2 semanas, porque as funcionalidades são previsíveis e o negócio quer um ritmo de entregas para mostrar à Ana e aos investidores.

**O time de operação/suporte** usa **Kanban**. O trabalho deles é imprevisível: um restaurante reclama que o cardápio sumiu, o gateway de pagamento oscila, um cliente relata cobrança dobrada. Não dá para "planejar 2 semanas" quando o trabalho chega a qualquer hora. O quadro deles é: *Reportado → Investigando (WIP 3) → Corrigindo (WIP 2) → Validando → Resolvido*.

Numa sexta de pico, choveram chamados. Sem WIP limit, cada dev pegaria cinco casos ao mesmo tempo e **nenhum** seria resolvido rápido — o cliente esperaria horas por qualquer resposta. Com o WIP limit, o time mantém poucos casos em andamento, resolve-os depressa e a fila anda. Quando entrou o chamado crítico *"pagamentos falhando para todo mundo"*, ele furou a fila e foi puxado na hora — sem precisar esperar o fim de nenhum ciclo. O **lead time** médio (tempo até o cliente ter a resposta) virou a métrica que a Ana acompanha para medir a qualidade do suporte.

Moral: **Scrum e Kanban não competem** — cada um serve a um tipo de trabalho. Saber escolher é maturidade.

---

## 🏢 Como isso acontece em uma empresa

- **Times de sustentação, SRE, suporte e DevOps costumam usar Kanban**, porque o trabalho deles é reativo e imprevisível. Times de produto/feature tendem ao Scrum. Muitas empresas rodam os dois lado a lado.
- **Scrumban é comum:** pega o quadro e o WIP limit do Kanban e mistura com algumas cerimônias do Scrum (retro, priorização). É um meio-termo pragmático muito usado.
- **O WIP limit é frequentemente ignorado — e isso é um erro caro.** Muitos "quadros Kanban" na verdade são só um Trello sem limite nenhum, onde todo mundo começa tudo. Sem WIP limit, não é bem Kanban; é só um quadro bonito.
- **As ferramentas são as mesmas do Scrum:** Jira, Trello, Azure DevOps, Linear — todas têm modo Kanban com colunas e limites configuráveis.
- **Métricas de fluxo viram indicadores de área.** Lead time e cycle time aparecem em relatórios de gestão como medida de rapidez e previsibilidade do time — especialmente em suporte, onde "quanto o cliente espera" é crítico.
- **Kanban conversa direto com entrega contínua.** Como não há sprints, cada item pronto pode ir para produção imediatamente — o que combina com o CI/CD que você verá no Volume 4.

---

## ⚠️ Erros comuns

- **Ter um quadro sem WIP limit.** É o erro nº 1. Sem limite, o Kanban perde seu coração e vira um mural decorativo onde todos começam tudo e nada termina.
- **Achar que "estar sempre ocupado" é bom.** No Kanban (e na rodovia), 100% de ocupação gera congestionamento. Um pouco de folga é o que mantém o fluxo rápido. Ocupação alta ≠ vazão alta.
- **Pegar tarefa nova quando a atual empaca.** O instinto de "não ficar parado" enche a pista. O certo é ajudar a **terminar** algo ou destravar o gargalo.
- **Confundir Kanban com "trabalhar sem planejamento".** Kanban tem priorização (a ordem da fila) e disciplina (o WIP). Não é bagunça; é fluxo controlado.
- **Usar Kanban para fugir de compromissos.** "Não temos sprint, então não prometemos nada" é abuso. O Kanban ainda mede lead/cycle time e cobra previsibilidade pelo fluxo.
- **Não desenhar o fluxo real.** Colunas genéricas (*To Do/Doing/Done*) escondem o gargalo. O quadro deve refletir as etapas verdadeiras (revisão, teste, deploy) para que os problemas apareçam.

---

## 💡 Dicas profissionais

- **Comece pelo fluxo que já existe.** A força do Kanban é ser evolutivo: mapeie como o trabalho realmente anda hoje, torne visível, e só então comece a limitar e melhorar. Nada de revolução.
- **Trate a coluna que vive lotada como um sinal, não uma culpa.** O gargalo aponta onde investir (mais revisores? automação de testes?), não quem "trabalha pouco".
- **Puxe, não empurre.** Ao terminar, puxe o próximo item do topo da fila priorizada. Se algo te trava, ajude a destravar o time antes de iniciar coisa nova.
- **Acompanhe cycle time, não só "quantas tarefas fiz".** Um time que entrega rápido e previsível vale mais que um time que "começa muito". Cycle time curto é sinal de saúde.
- **Se estiver em dúvida entre Scrum e Kanban:** trabalho previsível e planejável em ciclos → Scrum; trabalho reativo, que chega a qualquer hora e muda de prioridade toda hora → Kanban. E não há problema em combinar (Scrumban).
- **Baixe o WIP quando o time estiver afogado.** É contraintuitivo, mas reduzir o quanto se faz ao mesmo tempo costuma ser o caminho mais rápido para o time voltar a entregar.

---

## 🎈 Curiosidades

- O Kanban nasceu no **Sistema Toyota de Produção** nos anos 1950. Curiosamente, a Toyota se inspirou nos **supermercados americanos**: as prateleiras só eram reabastecidas quando os produtos eram retirados (puxados) pelos clientes — a semente do sistema *pull*.
- A adaptação do Kanban para software foi liderada por **David J. Anderson** por volta de 2007, na Microsoft e depois em outras empresas, como forma de melhorar times sem o "trauma" de trocar todo o processo de uma vez.
- A **Lei de Little** (da teoria das filas) dá base matemática ao WIP limit: *tempo médio no sistema = trabalho em progresso ÷ vazão*. Traduzindo: com a mesma vazão, quanto mais coisas em andamento, mais demora cada uma. É a prova de que "menos WIP = mais rápido".
- A frase-mantra **"stop starting, start finishing"** ("pare de começar, comece a terminar") virou um pôster comum em paredes de times ágeis pelo mundo.
- Estudos de produtividade mostram que a **troca constante de contexto** (pular entre muitas tarefas) pode desperdiçar boa parte do tempo útil de uma pessoa — outra razão pela qual limitar o WIP funciona também no nível individual.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Kanban** | Método visual de gestão de fluxo baseado em cartões, colunas e limites; sem sprints. |
| **Quadro Kanban** | Painel com colunas (etapas) onde cada tarefa é um cartão que caminha até "feito". |
| **WIP (Work In Progress)** | Trabalho em progresso: as tarefas começadas e ainda não terminadas. |
| **WIP limit** | Número máximo de tarefas permitidas ao mesmo tempo numa etapa. |
| **Sistema puxado (pull)** | Puxar trabalho novo só quando há capacidade, em vez de empurrar. |
| **Fluxo contínuo** | Tarefas fluindo sem ciclos fixos; pronto = pode seguir para produção. |
| **Lead time** | Tempo do pedido até ficar pronto (visão do cliente). |
| **Cycle time** | Tempo do início do trabalho até terminar (visão do time). |
| **Throughput (vazão)** | Quantas tarefas o time entrega por período. |
| **CFD (fluxo cumulativo)** | Gráfico que mostra o acúmulo em cada etapa e denuncia gargalos. |
| **Scrumban** | Combinação de Kanban (quadro + WIP) com práticas do Scrum. |

---

## 📝 Resumo

- O **Kanban** é um método ágil **visual e de fluxo contínuo**, sem sprints, papéis ou eventos obrigatórios — nascido na Toyota e adaptado para software.
- Suas peças centrais são o **quadro** (torna o trabalho visível), o **WIP limit** (limita o trabalho simultâneo) e o **sistema puxado** (puxar quando há capacidade).
- O **WIP limit** é o coração do método: fazer menos ao mesmo tempo **acelera** a entrega (a matemática da rodovia e da Lei de Little). Daí o lema "pare de começar, comece a terminar".
- Métricas de fluxo — **lead time, cycle time, throughput** e o **CFD** — mostram a saúde do time e onde estão os gargalos.
- **Kanban x Scrum** não competem: Scrum brilha em trabalho previsível e planejável em ciclos; Kanban brilha em trabalho reativo e imprevisível (suporte, operação). E dá para combinar (Scrumban).

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é um quadro Kanban e o significado das colunas.
- [ ] Entendo o WIP limit e por que menos trabalho simultâneo acelera o time.
- [ ] Diferencio sistema puxado de empurrado.
- [ ] Sei distinguir lead time de cycle time.
- [ ] Comparo Kanban e Scrum e digo quando cada um se encaixa melhor.
- [ ] Reconheço os erros comuns (quadro sem WIP, "estar sempre ocupado").

---

## ✏️ Exercícios

**1.** Explique, com a analogia da rodovia, por que **limitar** o trabalho em progresso pode fazer o time entregar **mais rápido**.

**2.** Um dev termina metade de uma tarefa, ela empaca esperando um fornecedor, e ele quer "não ficar parado". O que o Kanban recomenda que ele faça, e por quê?

**3.** Diga se cada trabalho combina mais com **Scrum** ou **Kanban** e justifique: (a) desenvolver, em 3 meses, um novo módulo de fidelidade planejado; (b) um time de suporte que recebe chamados imprevisíveis o dia todo.

**4.** Qual a diferença entre **lead time** e **cycle time**? Por que o cliente se importa mais com o primeiro?

**5. (Reflexão)** No quadro do time de suporte da SaborExpress, a coluna "Revisão" vive lotada enquanto as outras andam. O que isso indica, e que ações (fora "trabalhar mais") você tomaria?

---

## 💬 Respostas comentadas

**1.** Porque, como numa rodovia, existe uma capacidade ideal: além dela, mais "carros" (tarefas começadas) não aumentam a vazão — geram congestionamento, e tudo anda mais devagar. Limitar o WIP mantém a "pista" fluindo: cada tarefa recebe foco, termina mais rápido, e a vazão total sobe. Menos coisas ao mesmo tempo = cada uma pronta antes = mais entregas no fim.

**2.** O Kanban recomenda **não** pegar uma tarefa nova. Ele deve sinalizar o impedimento e ir **ajudar a terminar** outro cartão em andamento ou **destravar o gargalo** (por exemplo, revisar algo que está preso na coluna de revisão). Pegar mais trabalho encheria a pista e pioraria o congestionamento; a regra é "terminar antes de começar".

**3.** (a) **Scrum** — é um trabalho previsível, planejável, com escopo conhecido, que se beneficia do ritmo de sprints e de metas por ciclo. (b) **Kanban** — o trabalho é reativo e imprevisível, chega a qualquer hora e muda de prioridade constantemente; o fluxo contínuo e o WIP limit se encaixam melhor que sprints fixas.

**4.** **Lead time** é o tempo total desde que o pedido **entrou** na fila até ficar pronto; **cycle time** conta só a partir de quando o time **começou** a trabalhar nele. O cliente se importa mais com o lead time porque é o que **ele** sente: o tempo desde que pediu até receber — incluindo o tempo em que o cartão ficou esperando na fila, invisível para quem só olha o cycle time.

**5.** Indica que a **revisão é o gargalo** do fluxo: o trabalho chega mais rápido do que é revisado, e por isso empilha. Ações possíveis (sem "trabalhar mais"): aumentar a capacidade de revisão (mais pessoas aptas a revisar, revezamento), **reduzir o WIP** das etapas anteriores para não alimentar o gargalo, automatizar parte da checagem (testes/lint automáticos), ou dividir tarefas menores que revisam mais rápido. O objetivo é desentupir a coluna que trava o fluxo inteiro.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[43-Scrum-na-pratica]] — o outro grande método ágil, baseado em sprints.
- **Próximo (linear):** [[45-Estimativas-planejamento-e-ferramentas]] — como estimar e planejar, e as ferramentas (Jira, Trello) que hospedam quadros Scrum e Kanban.
- **Base:** [[42-O-Manifesto-Agil]] — Kanban também vive os valores ágeis.
- **Aplicação futura:** Volume 4 (entrega contínua / CI-CD) — o fluxo contínuo do Kanban casa com entregar em produção a qualquer momento.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 12 → **Capítulo 44 de 119**.
