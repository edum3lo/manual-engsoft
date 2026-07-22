---
title: '43 - Scrum na prática'
---

# Capítulo 43 — Scrum na prática

> **Volume 3 — Desenvolvimento de Software** · Módulo 12 — Processos e Metodologias
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Explicar o que é o **Scrum** e por que ele é o framework ágil mais usado do mercado.
- Descrever os **3 papéis** (Product Owner, Scrum Master, Time de Desenvolvimento) e o que cada um faz.
- Entender os **5 eventos** (Sprint, Planning, Daily, Review, Retrospective) e o propósito de cada um.
- Reconhecer os **3 artefatos** (Product Backlog, Sprint Backlog, Incremento) e o que é a *Definition of Done*.
- Enxergar o Scrum como um **ciclo** que gira a cada sprint, aplicando os valores ágeis do capítulo anterior.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante–Intermediário (2,5/5).**

---

## ✅ Pré-requisitos

- Ter lido [[42-O-Manifesto-Agil]] — o Scrum é uma forma concreta de viver os valores ágeis.
- Ajuda muito ter lido [[18-Bastidores-uma-semana-real]] (Vol. 1), onde você viu a semana de um time por dentro.

---

## 📖 Introdução

Se você entrar em quase qualquer empresa de tecnologia e perguntar "como vocês trabalham?", é grande a chance de ouvir "**a gente usa Scrum**". O Scrum é, de longe, o framework ágil mais adotado no mundo. Entender o Scrum não é opcional: é o vocabulário do seu dia a dia, das entrevistas e das reuniões.

O nome vem do **rúgbi**: o *scrum* é aquela formação em que o time inteiro se junta, ombro a ombro, e avança em bloco. A metáfora é proposital — no Scrum de software, um time pequeno e coeso avança junto, em ciclos curtos, se reorganizando a cada avanço.

Cuidado com um mal-entendido comum: **Scrum não é uma metodologia pesada e nem um método completo de engenharia**. Ele é um **framework leve** — de propósito. O guia oficial (o *Scrum Guide*) tem cerca de 13 páginas e define só o essencial: três papéis, cinco eventos, três artefatos. O resto — como codar, como testar, quais ferramentas — fica por sua conta. O Scrum dá o **esqueleto**; o time põe a carne. Neste capítulo você vai montar esse esqueleto peça por peça e ver como ele gira.

---

## 🧠 Analogia

Pense num **programa de TV semanal ao vivo**.

- Existe uma **lista gigante de ideias** para episódios futuros, priorizada por quem conhece a audiência (o **Product Owner** com o **Product Backlog**).
- Toda segunda-feira, a equipe se reúne e escolhe **o que dá para produzir naquela semana** (o **Sprint Planning**): pega do topo da lista o que cabe.
- Durante a semana, o episódio é produzido num **ritmo fixo** (a **Sprint**). Todo dia, de manhã, a equipe faz uma **reunião rápida em pé** para alinhar quem está travado em quê (a **Daily**).
- No fim da semana, o episódio **vai ao ar** e recebe a reação do público (a **Sprint Review** — mostrar o que ficou pronto e colher feedback).
- Depois do episódio, a equipe se reúne para conversar sobre **o que deu certo e o que melhorar na produção** da próxima semana (a **Retrospectiva**).
- E tem alguém cuidando para que a produção flua, removendo obstáculos e protegendo a equipe de interferências (o **Scrum Master**).

Guarde essa cena: **uma lista priorizada → escolher o que cabe na semana → produzir em ritmo fixo → mostrar o resultado → refletir → repetir.** Isso é o Scrum inteiro. Todo o resto são detalhes desse ciclo.

---

## 🧩 Conceitos fundamentais

O Scrum se define por **3 papéis + 5 eventos + 3 artefatos**. Vamos por partes.

### 1. A Sprint — o coração que bate

A **Sprint** é um período **de tamanho fixo** (geralmente **2 semanas**, às vezes 1 ou 3) durante o qual o time transforma itens do backlog em um **incremento** pronto. A regra de ouro: a duração é **constante** (dá ritmo e previsibilidade) e a meta da sprint **não muda** no meio (protege o time de mudanças constantes). Quando uma sprint acaba, a próxima começa imediatamente.

> **Termo explicado — Sprint:** ciclo de trabalho de duração fixa (tipicamente 2 semanas) ao fim do qual o time entrega um incremento de software potencialmente utilizável.

### 2. Os 3 papéis

- **Product Owner (PO)** — a **voz do produto e do cliente**. Decide **o que** será feito e em que ordem: ele é o dono do Product Backlog, define prioridades e o valor de cada item. Não manda em *como* o time codifica; manda no *porquê* e no *o quê*.
- **Scrum Master (SM)** — o **facilitador e removedor de obstáculos**. Não é um "chefe" nem um gerente. Ele garante que o Scrum aconteça bem, protege o time de interrupções, ajuda a destravar impedimentos e cuida da saúde do processo. É um papel de **servir ao time**, não de comandar.
- **Time de Desenvolvimento (Developers)** — quem **constrói** o incremento: devs, QA, designers embarcados. É **auto-organizado** (decide como fazer o trabalho) e **multifuncional** (tem, junto, todas as habilidades necessárias). O tamanho ideal é pequeno: algo como **3 a 9 pessoas**.

> **Termo explicado — Product Owner:** responsável por maximizar o valor do produto, priorizando o backlog e decidindo o que o time faz a seguir. **Scrum Master:** facilita o processo e remove impedimentos, sem comandar o time.

### 3. Os 5 eventos

```
        ┌──────────────── SPRINT (2 semanas) ─────────────────┐
        │                                                     │
 SPRINT PLANNING → [ DAILY · DAILY · DAILY · ... todo dia ] → SPRINT REVIEW → RETROSPECTIVA
 (o que faremos?)   (alinhamento diário de 15 min)            (mostrar o        (como
                                                               pronto)          melhorar?)
        │                                                     │
        └───────────────► e recomeça na sprint seguinte ◄─────┘
```

- **Sprint Planning** (início da sprint): o time escolhe, do topo do Product Backlog, o que consegue entregar, define a **meta da sprint** e monta o **Sprint Backlog**.
- **Daily Scrum** (todo dia, ~15 min, em pé): alinhamento rápido do time. Não é relatório para o chefe — é o time se **coordenando**: o que atrapalha meu progresso? Precisamos nos ajudar em quê?
- **Sprint Review** (fim da sprint): o time **mostra o incremento** para o PO e stakeholders e colhe feedback. É sobre o **produto**.
- **Sprint Retrospective** (após a review): o time reflete sobre o **próprio processo** — o que manter, o que melhorar — e escolhe ações. É sobre **como trabalhamos**.
- (A **Sprint** em si é considerada o "evento-contêiner" que envolve todos os outros.)

### 4. Os 3 artefatos

- **Product Backlog** — a lista **priorizada e viva** de tudo que o produto pode precisar (funcionalidades, correções, melhorias). Nunca está "terminada"; evolui sempre. Dono: o PO.
- **Sprint Backlog** — o subconjunto que o time se comprometeu a fazer **nesta sprint**, mais o plano para entregá-lo. Dono: o time.
- **Incremento** — a soma do que ficou **pronto** ao fim da sprint, somada aos incrementos anteriores. Deve estar **utilizável**.

### 5. Definition of Done (DoD) — o que é "pronto"

A **Definition of Done** é o acordo do time sobre o que significa uma tarefa estar **realmente pronta**: por exemplo, "código escrito + revisado + testado + documentado + integrado + sem quebrar o build". Sem DoD, "pronto" vira uma palavra elástica ("está pronto, só falta testar" — ou seja, não está pronto). A DoD combate isso.

> **Termo explicado — Definition of Done (DoD):** a lista de critérios que um item precisa cumprir para ser considerado concluído. Padroniza o significado de "pronto" no time.

---

## ⚙️ Como funciona na prática

Vamos girar uma sprint inteira, de ponta a ponta, num time de 2 semanas:

**Segunda (semana 1) — Planning.** O time se reúne com o PO. O Product Backlog está priorizado; no topo estão "busca por restaurante" e "filtro por tempo de entrega". O time discute, quebra em tarefas menores, estima o esforço (veremos como no [[45-Estimativas-planejamento-e-ferramentas]]) e se compromete com o que cabe. Define a **meta da sprint**: *"o cliente consegue buscar e filtrar restaurantes"*. Isso vira o **Sprint Backlog**.

**Todo dia — Daily.** 15 minutos, em pé. Uma dev avisa que está travada esperando o layout do designer; o Scrum Master anota o impedimento e vai destravar. Dois devs percebem que estão mexendo no mesmo arquivo e combinam a ordem. É **coordenação**, não prestação de contas.

**Ao longo da sprint — construção.** O time codifica, revisa o código um do outro ([[64-Pull-Requests-code-review-e-issues]]), testa. Cada tarefa só é considerada feita quando cumpre a **Definition of Done**.

**Sexta (semana 2) — Review.** O time faz uma **demo ao vivo**: mostra a busca e o filtro funcionando de verdade. O PO e a Ana testam, elogiam, e sugerem: "seria ótimo ordenar por avaliação também". Isso vira um novo item no Product Backlog — não muda a sprint que acabou.

**Sexta, logo depois — Retrospectiva.** O time conversa sobre o processo: "as estimativas erraram feio, vamos quebrar tarefas menores"; "os deploys de sexta deram medo, vamos evitar". Sai com **2 ações concretas** para a próxima sprint.

E na segunda seguinte, **tudo recomeça**. Esse loop é o Scrum. Repare como ele **materializa os 4 valores** do [[42-O-Manifesto-Agil]]: entrega software funcionando a cada 2 semanas (valor 2), colhe feedback do cliente na review (valor 3), absorve mudança no backlog sem trauma (valor 4) e melhora as interações na retro (valor 1).

---

## 🍔 Aplicação na SaborExpress

O time da SaborExpress roda em sprints de 2 semanas. Veja os papéis vivos:

- **A Ana** não é a PO no dia a dia — ela é a **fundadora/stakeholder**. Ela contratou o **Bruno como Product Owner**: é o Bruno quem conversa com restaurantes e clientes, mantém o Product Backlog priorizado e decide que "pagamento via Pix" vem antes de "programa de fidelidade" porque os dados mostram que é o que trava mais vendas.
- **A Carla é a Scrum Master.** Quando a dev do time ficou uma semana esperando acesso ao gateway de pagamento, foi a Carla quem cobrou o fornecedor e destravou. Quando o chefe de vendas tentou empurrar "só mais uma feature" no meio da sprint, foi a Carla quem protegeu o foco do time e mandou para o backlog.
- **O time de dev** (4 pessoas) se auto-organiza: ninguém distribui tarefa na marra; eles pegam do Sprint Backlog conforme terminam. Um deles é forte em back-end, outro em front, mas todos se ajudam — é **multifuncional**.

Numa sprint concreta, a meta foi *"o cliente finaliza um pedido pagando com Pix"*. Na review, a demo mostrou o fluxo funcionando; o Bruno percebeu que faltava mostrar o QR Code maior na tela (feedback), e isso virou item da próxima sprint. Na retro, o time notou que a integração com o gateway consumiu o dobro do previsto e decidiu reservar "folga" para integrações externas dali em diante. Duas semanas depois, novo ciclo — agora atacando "acompanhar o pedido no mapa". Passo a passo, a SaborExpress cresce em incrementos **utilizáveis**, com feedback a cada 15 dias.

---

## 🏢 Como isso acontece em uma empresa

- **"Sprint", "backlog", "daily" e "PO" são vocabulário corrente.** Você ouvirá isso o dia inteiro. Dominar os termos é pré-requisito para participar das reuniões sem se perder.
- **A ferramenta quase sempre é o Jira** (ou Azure DevOps, Trello, Linear). O Product Backlog e o Sprint Backlog viram cartões que se movem por colunas (*To Do → Doing → Done*). Veremos no [[45-Estimativas-planejamento-e-ferramentas]].
- **O papel de Scrum Master varia muito.** Em alguns times é uma pessoa dedicada e certificada; em outros, um dev sênior acumula a função; em outros, o papel foi extinto e diluído no time. Não estranhe as variações.
- **Muitos times fazem "Scrum adaptado".** Sprints de 1 ou 3 semanas, daily 3x por semana, papéis combinados. O Scrum "de livro" e o Scrum "de mundo real" raramente são idênticos — e tudo bem, desde que os valores fiquem vivos.
- **Certificações existem e pesam no currículo** (Certified ScrumMaster, PSM, PSPO). Elas ajudam a entrar, mas não substituem entender o **porquê** de cada peça — que é o que este capítulo dá.
- **Cuidado com o "Scrum como microgerenciamento".** Quando a daily vira interrogatório e a sprint vira prazo-chicote, o Scrum foi corrompido para o oposto do que ele propõe. Isso é uma bandeira vermelha sobre a cultura do time.

---

## ⚠️ Erros comuns

- **Achar que o Scrum Master é o chefe do time.** Não é. Ele **serve** o time (facilita, remove obstáculos), não comanda nem distribui tarefas na marra.
- **Transformar a Daily em relatório de status.** "Ontem fiz X, hoje faço Y" dito para o chefe não é daily. Daily é o **time se coordenando** e expondo impedimentos.
- **Mudar o escopo no meio da sprint.** Meter tarefas novas na sprint em andamento destrói o foco e a previsibilidade. Mudança vai para o **backlog** e entra na próxima sprint.
- **Pular a Retrospectiva "porque estamos ocupados".** É justamente o evento que faz o time melhorar. Pulá-lo é congelar os próprios erros. É o "but" do *ScrumBut*.
- **Confundir Review com Retrospectiva.** Review é sobre o **produto** (mostrar o incremento, colher feedback); Retrospectiva é sobre o **processo** (como trabalhamos). São reuniões diferentes com propósitos diferentes.
- **Tratar Product Backlog como escopo fixo e assinado.** Ele é **vivo**: reprioriza, cresce, encolhe. Congelá-lo é voltar ao Cascata disfarçado de Scrum.
- **Não ter Definition of Done.** Sem ela, "pronto" vira opinião, e tarefas "quase prontas" se acumulam.

---

## 💡 Dicas profissionais

- **Na daily, foque em impedimentos, não em narração.** Em vez de "mexi no arquivo tal", diga "estou travado por causa de X, alguém pode ajudar?". É isso que faz a reunião valer os 15 minutos.
- **Ajude a manter o backlog saudável.** Itens no topo devem ser pequenos e claros; itens lá embaixo podem ser vagões maiores. Um backlog bem cuidado (*refinamento*) faz o Planning voar.
- **Leve dados para a Retrospectiva.** "Erramos as estimativas em 40%" é mais útil que "acho que foi corrido". Ações concretas com dono e prazo transformam a retro em melhoria real.
- **Respeite a caixa de tempo (timebox).** Daily de 15 min é 15 min. Planning e retro têm limite. Reuniões que estouram o tempo viram o motivo de todo mundo odiar "cerimônia".
- **Entenda o "porquê" antes de brigar com o "como".** Se algo no Scrum do seu time parece burrice, pergunte que valor aquilo tenta servir. Às vezes é teatro (e vale ajustar); às vezes você ainda não viu o propósito.
- **Como iniciante, observe quem é o PO e quem é o SM.** Saber quem decide *o quê* (PO) e quem destrava *impedimentos* (SM) te diz a quem recorrer em cada situação.

---

## 🎈 Curiosidades

- O nome **Scrum** foi emprestado de um artigo de 1986 da *Harvard Business Review* ("The New New Product Development Game"), que comparava times de produto de alta performance à formação de rúgbi. **Jeff Sutherland** e **Ken Schwaber** formalizaram o framework nos anos 1990.
- O **Scrum Guide** oficial é surpreendentemente curto (cerca de **13 páginas**) e gratuito. Toda a fama e complexidade do "mundo Scrum" vem de cima desse texto minúsculo.
- A versão de 2020 do guia **removeu** a palavra "papéis" e passou a falar em "responsabilidades", e trocou "Development Team" por "Developers", para desfazer a ideia de hierarquia. Também apagou as famosas "3 perguntas" da daily, deixando o formato a critério do time.
- O termo **"velocidade" (velocity)** — quantos pontos o time entrega por sprint — virou popular, mas o guia oficial **não o obriga**. É uma métrica de apoio, não uma nota de desempenho (e usá-lo como chicote é um clássico anti-padrão).
- O Scrum inspirou versões para **fora do software**: marketing, RH e até planejamento de casamento já usaram sprints e backlog.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Scrum** | Framework ágil leve baseado em sprints, com 3 papéis, 5 eventos e 3 artefatos. |
| **Sprint** | Ciclo de trabalho de duração fixa (tipicamente 2 semanas). |
| **Product Owner (PO)** | Quem prioriza o backlog e decide o que o time faz (a voz do produto). |
| **Scrum Master (SM)** | Quem facilita o processo e remove impedimentos, sem comandar. |
| **Developers / Time** | Quem constrói o incremento; auto-organizado e multifuncional. |
| **Product Backlog** | Lista priorizada e viva de tudo que o produto pode precisar. |
| **Sprint Backlog** | O que o time se comprometeu a fazer nesta sprint. |
| **Incremento** | O que ficou pronto e utilizável ao fim da sprint. |
| **Sprint Planning** | Reunião que abre a sprint: o que faremos e qual a meta. |
| **Daily Scrum** | Alinhamento diário de ~15 min para coordenar e expor impedimentos. |
| **Sprint Review** | Demo do incremento para colher feedback (foco no produto). |
| **Retrospectiva** | Reunião para melhorar o processo do time (foco no como trabalhamos). |
| **Definition of Done (DoD)** | Critérios que definem quando um item está realmente pronto. |
| **Velocity** | Quanto o time costuma entregar por sprint (métrica de apoio, não nota). |

---

## 📝 Resumo

- O **Scrum** é o framework ágil mais usado: **leve**, definido por **3 papéis + 5 eventos + 3 artefatos**, girando em ciclos chamados **Sprints** (tipicamente 2 semanas).
- **Papéis:** **Product Owner** (prioriza o *o quê*), **Scrum Master** (facilita e remove obstáculos, sem comandar) e **Developers** (constroem, auto-organizados e multifuncionais).
- **Eventos:** **Planning** (o que faremos), **Daily** (coordenação diária), **Review** (mostrar o produto e colher feedback) e **Retrospectiva** (melhorar o processo).
- **Artefatos:** **Product Backlog** (lista viva priorizada), **Sprint Backlog** (o compromisso da sprint) e **Incremento** (o que ficou pronto), com a **Definition of Done** padronizando o significado de "pronto".
- O Scrum é um **loop** que materializa os valores ágeis: entrega frequente, feedback do cliente, mudança absorvida no backlog e melhoria contínua na retro.
- No mercado, o Scrum "de livro" vira "Scrum adaptado" — e tudo bem, desde que os valores permaneçam vivos e ele não vire microgerenciamento.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é uma Sprint e por que sua duração é fixa e o escopo não muda no meio.
- [ ] Sei o que faz cada papel: PO, Scrum Master e Developers.
- [ ] Diferencio os 5 eventos e o propósito de cada um (em especial Review vs. Retrospectiva).
- [ ] Distingo Product Backlog, Sprint Backlog e Incremento.
- [ ] Sei o que é a Definition of Done e por que ela importa.
- [ ] Enxergo o Scrum como um ciclo que aplica os 4 valores ágeis.

---

## ✏️ Exercícios

**1.** Explique, com suas palavras, por que o Scrum Master **não** é o chefe do time. Qual é a real função dele?

**2.** Diga a qual **evento** pertence cada objetivo: (a) mostrar o incremento pronto e colher feedback; (b) alinhar o time e expor impedimentos; (c) escolher o que será feito e definir a meta; (d) refletir sobre como o time trabalhou e o que melhorar.

**3.** No meio da sprint, o chefe de vendas aparece pedindo uma funcionalidade nova "para ontem". Como o Scrum orienta o time a lidar com isso, e por quê?

**4.** Qual a diferença entre **Product Backlog** e **Sprint Backlog**? Quem é o dono de cada um?

**5. (Reflexão)** Na SaborExpress, "acompanhar o pedido no mapa" está no topo do backlog. Descreva como essa funcionalidade percorreria uma sprint inteira, do Planning à Retrospectiva, citando o papel de PO, SM e time em cada etapa.

---

## 💬 Respostas comentadas

**1.** Porque o papel do Scrum Master é **servir**, não comandar: ele facilita os eventos, protege o time de interrupções, remove impedimentos e cuida da saúde do processo. Ele não distribui tarefas na marra nem responde pelo "o quê" (isso é do PO) nem pelo "como codar" (isso é do time). Tratá-lo como chefe transforma o Scrum em microgerenciamento — o oposto da proposta.

**2.** (a) **Sprint Review**; (b) **Daily Scrum**; (c) **Sprint Planning**; (d) **Retrospectiva**.

**3.** O Scrum orienta a **não** meter a funcionalidade na sprint em andamento: o escopo da sprint é protegido para preservar foco e previsibilidade. O pedido vai para o **Product Backlog**, o PO avalia sua prioridade e, se for realmente urgente e valioso, ele pode entrar no topo da **próxima** sprint (ou, em caso extremo, o PO e o time podem cancelar a sprint atual — algo raro e drástico). O Scrum Master costuma ser quem protege o time dessa pressão no meio do caminho.

**4.** O **Product Backlog** é a lista viva e priorizada de **tudo** que o produto pode precisar, e seu dono é o **PO**. O **Sprint Backlog** é o subconjunto que o **time** se comprometeu a entregar **nesta sprint** (mais o plano para isso), e seu dono é o **time de desenvolvimento**.

**5.** No **Planning**, o PO (Bruno) explica o valor de "acompanhar pedido no mapa" e o time discute, quebra em tarefas (integrar mapa, receber posição do entregador, atualizar a tela) e se compromete com o que cabe, definindo a meta. Nas **Dailies**, o time se coordena e expõe impedimentos (ex.: falta a chave da API de mapas — o SM/Carla destrava). Durante a sprint, o time constrói e revisa o código até cumprir a **DoD**. Na **Review**, o time demonstra o mapa funcionando; o Bruno dá feedback ("mostrar tempo estimado também"), que vira item futuro. Na **Retrospectiva**, o time reflete (ex.: "subestimamos a integração com mapas") e define ações. Se sobrar, "tempo estimado" entra na sprint seguinte.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[42-O-Manifesto-Agil]] — os valores que o Scrum coloca em prática.
- **Próximo (linear):** [[44-Kanban-e-fluxo-continuo]] — a alternativa ao Scrum baseada em fluxo contínuo, sem sprints fixas.
- **Aprofunda este tema:** [[45-Estimativas-planejamento-e-ferramentas]] — como o time estima e planeja o Sprint Backlog (story points, Jira).
- **Raiz na prática:** [[18-Bastidores-uma-semana-real]] (Vol. 1) — a semana de um time por dentro; e [[64-Pull-Requests-code-review-e-issues]] — como o código "fica pronto" dentro da sprint.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 12 → **Capítulo 43 de 119**.
