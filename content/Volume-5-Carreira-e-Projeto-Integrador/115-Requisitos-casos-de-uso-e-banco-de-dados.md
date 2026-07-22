---
title: '115 - Projeto Integrador (2/5): requisitos, casos de uso e banco de dados'
---

# Capítulo 115 — Projeto Integrador (2/5): requisitos, casos de uso e banco de dados

> **Volume 5 — Carreira e Projeto Integrador** · Módulo 36 — Projeto Integrador: SaborExpress do zero à produção
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Transformar o **problema e o protótipo** em **requisitos** claros.
- Escrever **histórias de usuário** e **casos de uso** para a SaborExpress.
- Modelar o **banco de dados** a partir dos requisitos.
- Ver a conexão entre requisitos → dados → (futura) API.
- Continuar a construção da SaborExpress na segunda fase do Projeto Integrador.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[114-Da-ideia-ao-Figma]] (a fase anterior do Projeto Integrador).
- Ter lido [[46-O-que-sao-requisitos]], [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]], [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] e [[69-Modelagem-de-dados-e-normalizacao]].

---

## 📖 Introdução

No capítulo anterior, a SaborExpress saiu da ideia para um **protótipo validado** ([[114-Da-ideia-ao-Figma]]): sabemos qual problema resolver, para quem (as personas Marta e João), o MVP, e como as telas parecem. Agora vem a ponte entre o "o que queremos" e o "como construir": transformar esse entendimento em **requisitos** claros, **histórias de usuário** e **casos de uso**, e — a partir deles — modelar o **banco de dados** onde tudo será guardado. Esta é a segunda fase do Projeto Integrador, e ela mostra como o entendimento do problema vira **especificação** e depois **estrutura de dados** — a espinha dorsal de qualquer sistema.

A sequência é natural e reveladora. Do **problema** e do **protótipo**, extraímos os **requisitos** ([[46-O-que-sao-requisitos]]): o que o sistema **precisa fazer** (requisitos funcionais — "o cliente pode fazer um pedido") e como ele deve **se comportar** (não funcionais — "a lista de restaurantes carrega em menos de 2 segundos"). Esses requisitos ganham forma concreta em **histórias de usuário** ("como cliente, quero acompanhar meu pedido para saber quando chega") e **casos de uso** (o passo a passo de "fazer um pedido") ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]). É a tradução da necessidade humana em especificação técnica — o trabalho que garante que se construa a coisa **certa**.

E então vem o momento em que a especificação encontra a **estrutura**: modelar o **banco de dados** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]], [[69-Modelagem-de-dados-e-normalizacao]]). Os "substantivos" que aparecem nos requisitos (clientes, restaurantes, pratos, pedidos) viram **tabelas**; as relações entre eles (um pedido pertence a um cliente e a um restaurante) viram **chaves estrangeiras**; e as regras (um pedido tem vários itens) viram a estrutura relacional. O banco é a **fundação de dados** sobre a qual a API e o front serão construídos — errar aqui custa caro depois, porque tudo se apoia nos dados. Este capítulo mostra, na prática, como o entendimento do problema flui para os requisitos e desces até a estrutura de dados — a segunda etapa da jornada que transforma uma ideia num sistema no ar, reforçando a tese do Projeto Integrador: cada fase alimenta a próxima, num fluxo coerente.

---

## 🧠 Analogia

Continuando a analogia da **construção da casa**: se a fase anterior foi entender a família e desenhar a **planta** ([[114-Da-ideia-ao-Figma]]), esta fase é elaborar a **lista detalhada de especificações** e depois lançar a **fundação e a estrutura** da casa.

- **A lista de especificações (os requisitos):** antes de construir, o engenheiro traduz a planta e os desejos da família numa **lista detalhada e precisa**: "a casa terá 3 quartos, cada um com tomada em cada parede; a cozinha suporta um fogão de 5 bocas; o encanamento aguenta 2 banheiros simultâneos". Isso é como os **requisitos** — o que a casa precisa **fazer** (3 quartos, 2 banheiros) e **como se comportar** (aguentar uso simultâneo). Sem essa lista precisa, os construtores adivinhariam, e a casa sairia errada. Os **casos de uso** são como descrever os cenários: "quando a família acorda de manhã, 4 pessoas usam os banheiros ao mesmo tempo" — o passo a passo que a casa precisa suportar.

- **A fundação e a estrutura (o banco de dados):** agora vem a parte que **sustenta tudo** e é a mais cara de mudar depois: a **fundação** e a **estrutura** (as vigas, as colunas, onde passam os canos e a fiação). O engenheiro decide isso a partir das especificações — quantos cômodos, quantos banheiros, quantos andares determinam a fundação. E aqui está o ponto crítico: **errar a fundação é catastrófico**. Você pode repintar uma parede ou trocar um móvel facilmente (mudar o front-end), mas **mover uma coluna estrutural** ou **refazer a fundação** depois que a casa está construída é caríssimo, às vezes impossível. Por isso a **estrutura de dados** (o banco) é pensada com cuidado a partir dos requisitos, **antes** de construir por cima — porque tudo o mais se apoia nela.

Guarde: esta fase é elaborar a **especificação detalhada** (os requisitos e casos de uso, traduzindo a planta em instruções precisas) e lançar a **fundação e a estrutura** (o banco de dados, que sustenta tudo e é a mais cara de mudar depois). Como numa casa, a estrutura vem cedo e com cuidado — porque construir sobre uma fundação errada é o pesadelo mais caro.

---

## 🧩 Conceitos fundamentais

### 1. Do problema aos requisitos

Os **requisitos** ([[46-O-que-sao-requisitos]]) traduzem o problema e o protótipo em **o que o sistema precisa fazer**. Dividem-se em:
- **Funcionais:** as funcionalidades ("o cliente pode fazer um pedido", "o restaurante pode aceitar um pedido").
- **Não funcionais:** como o sistema se comporta ("carrega em menos de 2s", "aguenta 10 mil usuários", "é seguro").

> **Termo explicado — requisitos funcionais e não funcionais:** funcionais são o que o sistema faz (funcionalidades); não funcionais são como ele se comporta (desempenho, segurança, escala). Ambos derivam do problema e do protótipo.

### 2. Histórias de usuário

Uma **história de usuário** ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) descreve uma necessidade do ponto de vista do usuário, no formato: "**Como** [tipo de usuário], **quero** [ação] **para** [benefício]". Ex.: "Como cliente, quero acompanhar meu pedido para saber quando chega". São a forma ágil de expressar requisitos, focadas no **valor** para o usuário, com **critérios de aceitação** que definem "pronto".

> **Termo explicado — história de usuário:** descrição curta de uma necessidade no formato "como [usuário], quero [ação] para [benefício]", com critérios de aceitação — a unidade de trabalho ágil focada no valor.

### 3. Casos de uso

Um **caso de uso** ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]], [[55-Casos-de-uso-e-diagrama-de-classes]]) descreve o **passo a passo** de uma interação entre o usuário e o sistema para atingir um objetivo — incluindo o fluxo principal e os alternativos (o que dá errado). Ex.: "Fazer um pedido" detalha cada passo, do escolher o restaurante ao confirmar o pagamento, e os casos de exceção (item indisponível, pagamento recusado).

> **Termo explicado — caso de uso:** o passo a passo detalhado de uma interação usuário↔sistema para atingir um objetivo, incluindo fluxos alternativos e exceções.

### 4. Os "substantivos" viram entidades

Ao ler os requisitos, os **substantivos** recorrentes (cliente, restaurante, prato, pedido) são as **entidades** — as "coisas" que o sistema precisa **guardar**. Cada entidade vira uma **tabela** no banco ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]). Identificar as entidades a partir dos requisitos é o primeiro passo da modelagem de dados.

> **Termo explicado — entidade:** uma "coisa" do domínio que o sistema precisa armazenar (cliente, pedido, produto); cada entidade tende a virar uma tabela no banco relacional.

### 5. Modelar o banco (tabelas, relações, chaves)

Modelar o banco ([[69-Modelagem-de-dados-e-normalizacao]]) é definir as **tabelas** (entidades), suas **colunas** (atributos), e as **relações** entre elas via **chaves estrangeiras**. Ex.: `pedidos` referencia `usuarios` e `restaurantes` (um pedido pertence a um cliente e a um restaurante); `itens_pedido` liga `pedidos` a `pratos`. A **normalização** evita dados duplicados e inconsistentes.

> **Termo explicado — modelagem de dados:** projetar as tabelas, colunas e relações (chaves estrangeiras) do banco a partir das entidades e regras do domínio, de forma organizada (normalizada).

### 6. A estrutura é a fundação (cara de mudar)

O banco é a **fundação de dados** sobre a qual a API ([[116-API-back-end-e-front-end]]) e o front são construídos. Mudar a estrutura depois (renomear tabelas, mudar relações) é **caro e arriscado** ([[98-Estrategias-de-deploy]]), porque tudo se apoia nela. Por isso modela-se com cuidado, a partir de requisitos claros — errar a fundação propaga custo para todo o sistema.

---

## ⚙️ Como funciona na prática

A segunda fase da SaborExpress, passo a passo:

**Passo 1 — Extrair os requisitos.** Do problema e do protótipo ([[114-Da-ideia-ao-Figma]]), o time lista os **requisitos funcionais** ([[46-O-que-sao-requisitos]]) do MVP: o cliente pode **buscar restaurantes**, **ver cardápio**, **montar um carrinho**, **fazer um pedido** e **pagar**; o restaurante pode **receber e aceitar** pedidos; e há **cadastro/login** ([[73-Autenticacao-e-autorizacao]]). E os **não funcionais**: a lista de restaurantes carrega rápido, o sistema é seguro (dados dos clientes — [[101-LGPD-e-privacidade]]), e aguenta o crescimento previsto. Requisitos claros evitam construir a coisa errada.

**Passo 2 — Escrever histórias de usuário.** Cada requisito vira histórias ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) focadas no valor: "Como cliente (João, apressado), quero **ver o tempo estimado de entrega** para decidir se peço" (a descoberta da pesquisa — [[114-Da-ideia-ao-Figma]]); "Como cliente, quero **acompanhar meu pedido** para saber quando chega"; "Como restaurante (Sr. Alberto), quero **receber os pedidos em tempo real** para prepará-los rápido". Cada uma tem **critérios de aceitação** que definem "pronto".

**Passo 3 — Detalhar os casos de uso.** Para os fluxos centrais, o time escreve **casos de uso** ([[55-Casos-de-uso-e-diagrama-de-classes]]) com o passo a passo, incluindo as **exceções**. Ex.: "Fazer um pedido": (1) cliente escolhe restaurante; (2) adiciona itens ao carrinho; (3) revisa e confirma; (4) informa endereço e paga; (5) recebe confirmação — **mais** os fluxos alternativos: item indisponível, restaurante fechado, pagamento recusado. Pensar nas exceções **agora** evita bugs depois ([[78-Ligando-front-end-a-experiencia-do-usuario]]).

**Passo 4 — Identificar as entidades (os substantivos).** Lendo os requisitos e casos de uso, o time destaca os **substantivos** recorrentes: **usuário** (cliente e restaurante), **restaurante**, **prato**, **pedido**, **item de pedido**, **endereço**, **pagamento**. Cada um é uma **entidade** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]) — uma "coisa" a guardar. Essa é a ponte entre o "o que o sistema faz" e "o que ele precisa armazenar".

**Passo 5 — Modelar o banco.** As entidades viram **tabelas** ([[69-Modelagem-de-dados-e-normalizacao]]), com colunas e relações via **chaves estrangeiras**:
- `usuarios` (id, nome, email, senha_hash — [[73-Autenticacao-e-autorizacao]], tipo).
- `restaurantes` (id, nome, endereço, aberto).
- `pratos` (id, **restaurante_id** → chave estrangeira, nome, preço, disponível).
- `pedidos` (id, **usuario_id** →, **restaurante_id** →, status, total, criado_em).
- `itens_pedido` (id, **pedido_id** →, **prato_id** →, quantidade, **preço_no_momento** — o snapshot do [[80-Construindo-a-API-da-SaborExpress]]).
Modelado de forma **normalizada** (sem duplicar dados), com as regras do domínio ("um pedido tem vários itens").

**A conexão para frente.** Esta estrutura é a **fundação** de tudo o que vem: a **API** ([[116-API-back-end-e-front-end]]) exporá endpoints que leem e gravam nessas tabelas; o **back-end** aplicará as regras de negócio ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) sobre elas; o **front** mostrará esses dados ([[78-Ligando-front-end-a-experiencia-do-usuario]]). Os requisitos e o banco desta fase **determinam** o formato de tudo o mais — e por isso são pensados com cuidado, porque mudá-los depois é caro. É a espinha dorsal do sistema, derivada diretamente do entendimento do problema.

---

## 🍔 Aplicação na SaborExpress

Esta fase **é** a SaborExpress ganhando sua estrutura. Vejamos como o entendimento virou especificação e fundação de dados.

**Requisitos ancorados na pesquisa.** Os requisitos da SaborExpress não saíram do nada — vieram diretamente do **problema e da pesquisa** ([[114-Da-ideia-ao-Figma]]). Porque a pesquisa revelou que os clientes valorizavam **acompanhar o pedido** e **ver o tempo de entrega**, esses viraram **requisitos funcionais** de primeira ordem ([[46-O-que-sao-requisitos]]) — não um detalhe qualquer, mas algo central, derivado do que os usuários realmente queriam. A rastreabilidade problema → pesquisa → requisito garantiu que o time construísse o que **importava**.

**Histórias que carregavam as personas.** As histórias de usuário ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) carregavam as **personas** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]): "Como **João** (apressado), quero ver o tempo de entrega para decidir rápido"; "Como **Marta** (casual), quero um cadastro de endereço simples para não me perder" (o problema que o protótipo revelou — [[114-Da-ideia-ao-Figma]]). Amarrar as histórias às personas mantinha o time focado em **gente real**, não em abstrações.

**Casos de uso pensando nas exceções.** Ao detalhar o caso de uso "Fazer um pedido" ([[55-Casos-de-uso-e-diagrama-de-classes]]), o time pensou nos **fluxos alternativos** desde já: e se um item ficar indisponível? e se o restaurante fechar durante o pedido? e se o pagamento for recusado? Pensar nessas exceções **na especificação** foi o que permitiu, depois, o front tratar bem esses estados ([[78-Ligando-front-end-a-experiencia-do-usuario]]) e o back retornar os erros certos ([[80-Construindo-a-API-da-SaborExpress]]) — em vez de descobri-los como bugs em produção.

**Do requisito à tabela.** Lendo os requisitos, os **substantivos** saltaram: cliente, restaurante, prato, pedido, item. Camila os transformou em **tabelas** ([[69-Modelagem-de-dados-e-normalizacao]]) com as relações certas — `pedidos` referenciando `usuarios` e `restaurantes`, `itens_pedido` ligando `pedidos` a `pratos`. Uma decisão importante que vimos antes ([[80-Construindo-a-API-da-SaborExpress]]) nasceu aqui: guardar o **preço no momento da compra** em `itens_pedido` (o snapshot), para o histórico do pedido não mudar se o prato reajustar. Essa decisão de modelagem, tomada **cedo**, evitou um problema sério depois.

**A fundação que sustentou tudo.** Essa estrutura de dados virou a **fundação** ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]) sobre a qual **todo** o resto da SaborExpress foi construído: a API `POST /pedidos` ([[80-Construindo-a-API-da-SaborExpress]]) gravava nessas tabelas; a lógica de negócio ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) operava sobre elas; o front mostrava esses dados. E quando a escala chegou, foi essa estrutura que ganhou índices, cache e réplicas ([[71-Confiabilidade-e-escala-do-banco]], [[93-Cache-CDN-e-balanceador-de-carga]]). Ter modelado com cuidado desde o início — a partir de requisitos claros — foi o que evitou o pesadelo de "refazer a fundação" com o sistema já construído.

Moral: nesta fase, a SaborExpress transformou o **entendimento do problema** (do capítulo anterior) em **especificação** (requisitos ancorados na pesquisa, histórias com as personas, casos de uso com exceções) e depois em **fundação de dados** (o banco modelado a partir dos substantivos, com decisões cedo como o snapshot de preço). Essa estrutura, pensada com cuidado a partir de requisitos claros, sustentou **todo** o resto do sistema — provando que os requisitos e o banco são a espinha dorsal derivada diretamente do problema, e que errar a fundação seria o mais caro dos erros.

---

## 🏢 Como isso acontece em uma empresa

- **Requisitos claros evitam retrabalho.** Times que investem em entender e especificar bem o que construir (histórias, critérios de aceitação) desperdiçam muito menos do que os que "codam primeiro, entendem depois" ([[46-O-que-sao-requisitos]]).
- **Histórias de usuário são o padrão ágil.** A maioria dos times organiza o trabalho em histórias com critérios de aceitação, mantendo o foco no valor para o usuário ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]], [[43-Scrum-na-pratica]]).
- **A modelagem de dados é uma decisão de alto impacto.** O design do banco influencia todo o sistema e é caro de mudar, então recebe atenção cuidadosa. Bons modeladores de dados são muito valorizados.
- **"Pensar nas exceções cedo" separa os bons.** Especificar os fluxos alternativos e casos de erro na fase de requisitos evita uma classe enorme de bugs em produção ([[83-QA-bugs-e-o-ciclo-de-correcao]]).
- **A rastreabilidade importa.** Empresas maduras conseguem rastrear cada funcionalidade de volta a um requisito e a uma necessidade real do usuário — garantindo que se construa o que importa, não o que "seria legal".
- **Migrações de banco são temidas.** Justamente porque mudar a estrutura de dados depois é caro e arriscado ([[98-Estrategias-de-deploy]]), times investem em modelar bem desde o início — a "fundação" da analogia.
- **Engenheiros e produto colaboram na especificação.** Traduzir o problema em requisitos e modelo de dados é um trabalho conjunto de PMs, engenheiros e às vezes designers — quanto mais cedo o engenheiro entende o "porquê", melhor o "como".

---

## ⚠️ Erros comuns

- **Pular os requisitos e ir ao código.** Construir sem especificar o que o sistema precisa fazer. Leva a construir a coisa errada e a muito retrabalho.
- **Requisitos vagos.** "O sistema deve ser rápido" sem definir "quão rápido". Requisitos precisos (funcionais e não funcionais) guiam de verdade ([[46-O-que-sao-requisitos]]).
- **Esquecer os requisitos não funcionais.** Focar só nas funcionalidades e ignorar desempenho, segurança e escala — que definem se o sistema **funciona bem** de verdade.
- **Ignorar os fluxos de exceção.** Especificar só o "caminho feliz" e descobrir os casos de erro como bugs em produção ([[83-QA-bugs-e-o-ciclo-de-correcao]]).
- **Modelar o banco sem cuidado.** Tabelas mal pensadas, sem normalização, com relações erradas. A fundação errada propaga custo para todo o sistema.
- **Duplicar dados (falta de normalização).** Guardar a mesma informação em vários lugares, gerando inconsistências ([[69-Modelagem-de-dados-e-normalizacao]]).
- **Não pensar em decisões de dados cedo.** Esquecer coisas como o snapshot de preço, e ter que corrigir depois com dados já em produção — caro e arriscado.
- **Tratar as fases como soltas.** Não ver que os requisitos derivam do problema e alimentam o banco, a API e o front. Cada fase depende da anterior.

---

## 💡 Dicas profissionais

- **Derive os requisitos do problema e da pesquisa.** Cada requisito deve rastrear a uma necessidade real do usuário ([[114-Da-ideia-ao-Figma]]). Isso garante construir o que importa.
- **Escreva histórias focadas no valor, com as personas.** "Como [persona], quero [ação] para [benefício]", com critérios de aceitação. Mantém o foco em gente real ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]).
- **Não esqueça os requisitos não funcionais.** Desempenho, segurança, escala. Eles definem se o sistema funciona **bem**, não só se funciona.
- **Pense nas exceções na especificação.** Detalhe os fluxos alternativos e casos de erro cedo. Evita uma classe enorme de bugs ([[78-Ligando-front-end-a-experiencia-do-usuario]]).
- **Modele o banco com cuidado, a partir dos requisitos.** Identifique as entidades (substantivos), defina as relações (chaves estrangeiras), normalize ([[69-Modelagem-de-dados-e-normalizacao]]). A fundação é cara de mudar.
- **Tome decisões de dados importantes cedo.** Como o snapshot de preço — pense no que o histórico precisa preservar antes de ter dados em produção.
- **Trate o banco como a fundação.** Tudo se apoia nele. Errar aqui propaga custo; acertar aqui sustenta todo o resto ([[116-API-back-end-e-front-end]]).
- **Veja a conexão entre as fases.** Requisitos derivam do problema e alimentam o banco, a API e o front. É um fluxo coerente, não etapas soltas.

---

## 🎈 Curiosidades

- Estudos clássicos de engenharia de software mostram que corrigir um erro de **requisitos** descoberto em produção pode custar **dezenas a centenas de vezes** mais do que corrigi-lo na fase de especificação. É a materialização numérica da "casa": mudar a lista de especificações no papel é barato; descobrir que faltou um banheiro depois de a casa pronta é caríssimo.
- O formato de **história de usuário** ("Como... quero... para...") foi criado para forçar uma mudança de foco: em vez de especificar **o que o sistema faz** (uma perspectiva técnica), ele obriga a pensar em **quem** precisa e **por quê** (a perspectiva de valor). Essa pequena mudança de fraseado teve um impacto enorme em manter os times focados no usuário, e não na tecnologia pela tecnologia.
- A prática de guardar o **"preço no momento da compra"** (o snapshot) é um exemplo de uma categoria de decisões de modelagem que parecem detalhes triviais mas têm consequências profundas: sistemas de e-commerce e financeiros que **não** fizeram isso enfrentaram problemas graves quando preços mudaram e os históricos de pedidos passaram a mostrar valores errados — às vezes com implicações contábeis e legais. Um "detalhe" de modelagem que virou lição cara para muitas empresas.
- O ato de **"achar os substantivos"** para identificar entidades é uma técnica de modelagem tão antiga e útil que virou uma heurística ensinada há décadas: ler a descrição do problema e sublinhar os substantivos (viram tabelas/classes) e os verbos (viram operações/métodos). É uma ponte surpreendentemente eficaz entre a linguagem humana do problema e a estrutura técnica da solução.
- Migrações de banco de dados são tão temidas que geraram todo um ferramental e uma disciplina próprios (ferramentas de migração, o padrão expand-contract — [[98-Estrategias-de-deploy]]). A dificuldade de mudar a estrutura de dados de um sistema em produção é uma das razões pelas quais "modelar bem desde o início" é um conselho tão repetido — e tão frequentemente ignorado com consequências dolorosas.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Requisito funcional** | O que o sistema precisa fazer (uma funcionalidade). |
| **Requisito não funcional** | Como o sistema se comporta (desempenho, segurança, escala). |
| **História de usuário** | "Como [usuário], quero [ação] para [benefício]", com critérios. |
| **Caso de uso** | O passo a passo de uma interação, com fluxos alternativos. |
| **Critério de aceitação** | O que define que uma história está "pronta". |
| **Entidade** | Uma "coisa" a guardar (cliente, pedido); vira tabela. |
| **Modelagem de dados** | Projetar tabelas, colunas e relações do banco. |
| **Chave estrangeira** | Coluna que referencia outra tabela (a relação). |
| **Normalização** | Organizar os dados sem duplicação nem inconsistência. |
| **Snapshot (de preço)** | Guardar um valor no momento (preço na hora da compra). |

---

## 📝 Resumo

- Esta é a segunda fase do Projeto Integrador: transformar o **problema e o protótipo validado** ([[114-Da-ideia-ao-Figma]]) em **requisitos**, **histórias de usuário**, **casos de uso** e, a partir deles, o **modelo do banco de dados** — a espinha dorsal do sistema.
- Do problema extraem-se os **requisitos** ([[46-O-que-sao-requisitos]]): **funcionais** (o que o sistema faz — "o cliente pode pedir") e **não funcionais** (como se comporta — "carrega em 2s, é seguro"). Eles ganham forma em **histórias de usuário** ("Como [persona], quero [ação] para [benefício]", com critérios de aceitação) e **casos de uso** (o passo a passo, **incluindo as exceções** — item indisponível, pagamento recusado). Pensar nos fluxos de erro **agora** evita bugs depois.
- Os **substantivos** dos requisitos (cliente, restaurante, prato, pedido) viram **entidades**, e cada uma vira uma **tabela** no banco ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]). Modela-se ([[69-Modelagem-de-dados-e-normalizacao]]) com tabelas, colunas e **relações via chaves estrangeiras** (`pedidos` → `usuarios` e `restaurantes`; `itens_pedido` → `pedidos` e `pratos`), de forma **normalizada**, tomando decisões importantes cedo (como o **snapshot de preço** em `itens_pedido`).
- O banco é a **fundação de dados** sobre a qual a API ([[116-API-back-end-e-front-end]]), o back-end e o front serão construídos — e mudá-lo depois é **caro e arriscado** ([[98-Estrategias-de-deploy]]), porque tudo se apoia nele. Como a fundação de uma casa: vem cedo, com cuidado, porque construir sobre uma fundação errada é o pesadelo mais caro.
- A lição do Projeto Integrador se confirma: as fases **se conectam** num fluxo coerente — o problema vira requisitos, que viram o banco, que sustentará a API e o front. Requisitos claros e um banco bem modelado, derivados diretamente do entendimento do problema, são o que torna certo (e barato) todo o resto da construção que vem a seguir.

---

## ☑️ Checklist de aprendizado

- [ ] Transformo o problema e o protótipo em requisitos funcionais e não funcionais.
- [ ] Escrevo histórias de usuário com as personas e critérios de aceitação.
- [ ] Detalho casos de uso incluindo os fluxos de exceção.
- [ ] Identifico as entidades (substantivos) a partir dos requisitos.
- [ ] Modelo o banco com tabelas, relações e normalização.
- [ ] Entendo que o banco é a fundação cara de mudar, sobre a qual tudo se apoia.

---

## ✏️ Exercícios

**1.** Com a analogia da casa, explique o papel dos requisitos (a lista de especificações) e do banco de dados (a fundação e estrutura).

**2.** Escreva uma **história de usuário** e um trecho de **caso de uso** (com uma exceção) para "acompanhar o pedido" na SaborExpress.

**3.** A partir do requisito "o cliente pode fazer um pedido com vários itens de um restaurante", identifique as **entidades** e as **relações** (chaves estrangeiras) que você modelaria.

**4.** Por que decisões de modelagem como o **snapshot de preço** devem ser tomadas cedo? O que aconteceria se fossem esquecidas?

**5. (Reflexão)** Este capítulo trata o banco como "a fundação, cara de mudar depois". Explique por que a estrutura de dados é tão custosa de alterar em relação ao front-end, e como isso justifica modelá-la com cuidado a partir de requisitos claros.

---

## 💬 Respostas comentadas

**1.** Continuando a analogia da casa: os **requisitos** são a **lista detalhada de especificações** que traduz a planta e os desejos da família em instruções precisas ("3 quartos, cada um com tomada em cada parede; a cozinha suporta um fogão de 5 bocas; o encanamento aguenta 2 banheiros simultâneos") — o que a casa precisa **fazer** (funcionais: os cômodos) e **como se comportar** (não funcionais: aguentar uso simultâneo). Sem essa lista precisa, os construtores adivinhariam e a casa sairia errada; os **casos de uso** descrevem os cenários que ela precisa suportar ("de manhã, 4 pessoas usam os banheiros ao mesmo tempo"). O **banco de dados** é a **fundação e a estrutura** (as vigas, as colunas, onde passam os canos) — a parte que **sustenta tudo** e é decidida a partir das especificações (quantos cômodos e andares determinam a fundação). O ponto crítico é que **errar a fundação é catastrófico**: você repinta uma parede ou troca um móvel facilmente (mudar o front-end), mas **mover uma coluna estrutural ou refazer a fundação** depois da casa construída é caríssimo, às vezes impossível. Por isso a estrutura de dados vem **cedo e com cuidado**, a partir de requisitos claros — porque tudo o mais se apoia nela, e construir sobre uma fundação errada é o pesadelo mais caro da obra.

**2.** **História de usuário:** "Como cliente (João, apressado), **quero acompanhar o status do meu pedido em tempo real** (recebido → preparando → saiu para entrega → entregue) **para** saber quando minha comida vai chegar e não ficar ansioso." Critérios de aceitação: o status atualiza automaticamente; mostra uma estimativa de tempo; notifica quando sai para entrega. **Trecho de caso de uso — "Acompanhar o pedido":** Fluxo principal: (1) o cliente abre a tela do pedido em andamento; (2) o sistema exibe o status atual e a estimativa de tempo; (3) conforme o restaurante e o entregador atualizam o pedido, o status muda em tempo real na tela do cliente; (4) quando o pedido é entregue, o sistema marca como concluído e pede uma avaliação. **Fluxo de exceção (uma exceção):** se o restaurante **cancelar** o pedido (por exemplo, ficou sem um ingrediente), o sistema notifica o cliente imediatamente com o motivo, informa que o pagamento será estornado, e oferece a opção de pedir de outro restaurante — em vez de deixar o cliente esperando por um pedido que nunca chegará. (Outra exceção possível: se a atualização em tempo real falhar, a tela mostra o último status conhecido com um aviso de "atualizando..." em vez de uma tela em branco.) Pensar nessas exceções na especificação é o que permite, depois, o front tratá-las bem ([[78-Ligando-front-end-a-experiencia-do-usuario]]).

**3.** A partir do requisito "o cliente pode fazer um pedido com vários itens de um restaurante", as **entidades** (substantivos) que eu identificaria são: **cliente/usuário** (quem faz o pedido), **restaurante** (de onde vem), **pedido** (a compra em si), **prato** (o que o restaurante oferece) e **item de pedido** (cada prato específico dentro de um pedido, com quantidade). As **tabelas e relações (chaves estrangeiras)** que eu modelaria: **`usuarios`** (id, nome, email...); **`restaurantes`** (id, nome...); **`pratos`** (id, **restaurante_id** → chave estrangeira para `restaurantes`, pois cada prato pertence a um restaurante, nome, preço); **`pedidos`** (id, **usuario_id** → chave estrangeira para `usuarios`, **restaurante_id** → chave estrangeira para `restaurantes`, pois cada pedido pertence a um cliente e a um restaurante, status, total, data); e **`itens_pedido`** (id, **pedido_id** → chave estrangeira para `pedidos`, **prato_id** → chave estrangeira para `pratos`, quantidade, preço_no_momento). A entidade **`itens_pedido`** é a chave para modelar "um pedido com **vários** itens": ela é uma tabela intermediária que liga um pedido a vários pratos (uma relação de muitos-para-muitos resolvida com uma tabela de ligação), onde cada linha representa "neste pedido, tantas unidades deste prato". Assim, um pedido (`pedidos`) tem várias linhas em `itens_pedido`, cada uma apontando para um `prato` diferente com sua quantidade — modelando corretamente que um pedido contém vários itens, de forma normalizada (sem duplicar os dados do prato em cada pedido).

**4.** Decisões de modelagem como o **snapshot de preço** (guardar o preço do item **no momento da compra** na tabela `itens_pedido`, em vez de só referenciar o preço atual do prato) devem ser tomadas **cedo** porque elas afetam a **estrutura fundamental** dos dados, e mudar essa estrutura depois — especialmente com dados já em produção — é caro e arriscado. Se fossem **esquecidas**, aconteceria o seguinte: o sistema guardaria apenas a referência ao prato (`prato_id`) e buscaria o preço **atual** do prato ao exibir um pedido — o que funciona **enquanto os preços não mudam**. Mas quando um restaurante **reajusta o preço** de um prato (digamos, a pizza sobe de R$40 para R$50), **todos os pedidos históricos** que continham aquela pizza passariam a exibir o preço **novo** (R$50), mostrando que o cliente "pagou" um valor **diferente do que realmente pagou** (ele pagou R$40 na época). Isso causaria problemas graves: históricos de pedidos incorretos, totais que não batem, confusão dos clientes ("eu paguei isso?"), e — mais sério — **implicações contábeis e legais** (o registro financeiro de uma transação passada não pode mudar retroativamente). Corrigir isso **depois**, com milhões de pedidos já gravados sem o preço histórico, seria um pesadelo: os preços reais pagos no passado talvez já estivessem **perdidos** (só se teria o preço atual), tornando impossível reconstruir os históricos corretos. Por isso o snapshot é uma decisão de modelagem que precisa ser tomada **antes** de haver dados em produção — quando ainda é só adicionar uma coluna ao design. É um exemplo de como um "detalhe" aparentemente trivial de modelagem tem consequências profundas, e de por que pensar no que os dados históricos precisam **preservar** é parte essencial de modelar bem desde o início.

**5.** A estrutura de dados (o banco) é muito mais custosa de alterar do que o front-end porque ela é a **fundação sobre a qual tudo o mais se apoia**, e porque ela **guarda dados reais e persistentes**. Comparando: o **front-end** é como a **pintura e a decoração** da casa — mudar a cor de um botão, reorganizar uma tela, trocar um texto afeta apenas a **camada de apresentação**, é relativamente isolado, e não há "dados históricos de pintura" a preservar; se você erra, repinta. Já o **banco** é como a **fundação e as colunas estruturais**: (1) **Tudo depende dele** — a API lê e grava nele, a lógica de negócio opera sobre ele, o front exibe seus dados; mudar uma tabela ou relação **propaga** a mudança por toda essa cadeia (a API precisa mudar, a lógica precisa mudar, o front precisa mudar), como mover uma coluna estrutural afeta toda a casa acima dela. (2) **Ele contém dados reais e vivos** — diferente do código, que você pode reescrever, o banco em produção tem **milhões de registros** de clientes, pedidos e transações que **não podem ser perdidos nem corrompidos**; mudar a estrutura exige **migrar** esses dados com cuidado extremo (o padrão expand-contract — [[98-Estrategias-de-deploy]]), enquanto o sistema continua no ar, sem quebrar as versões antiga e nova que coexistem. (3) **Erros são irreversíveis** — se você perde ou corrompe dados históricos numa migração malfeita, muitas vezes não há como recuperá-los (como o preço histórico do snapshot). Por tudo isso, mudar o banco de um sistema em produção é uma das operações mais **temidas** da engenharia, cercada de ferramentas, cuidados e riscos. Isso **justifica modelá-lo com cuidado a partir de requisitos claros desde o início**: como o custo de errar a fundação é altíssimo e cresce com o tempo (quanto mais dados e mais código dependem dela, mais caro mudar), o investimento em entender bem os requisitos e projetar bem as tabelas, relações e decisões-chave (como o snapshot) **antes** de construir por cima é o que evita o pesadelo de ter que "refazer a fundação" com a casa inteira em cima. É a mesma lição da fase anterior ([[114-Da-ideia-ao-Figma]]), aplicada aos dados: pensar com cuidado antes de construir, na camada onde mudar depois é mais caro, é o que torna todo o resto do sistema sólido e barato de manter.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[114-Da-ideia-ao-Figma]] — o problema e o protótipo de onde os requisitos derivam.
- **Próximo (linear):** [[116-API-back-end-e-front-end]] — as três camadas técnicas construídas sobre esta fundação.
- **Base aplicada:** [[46-O-que-sao-requisitos]], [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]], [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] e [[69-Modelagem-de-dados-e-normalizacao]].
- **Adiante:** [[80-Construindo-a-API-da-SaborExpress]] (a API sobre este banco) e [[71-Confiabilidade-e-escala-do-banco]] (escalar esta fundação).

---

> 🧭 **Você está aqui:** Volume 5 → Módulo 36 → **Capítulo 115 de 119**.
