---
title: '71 - Confiabilidade e escala do banco'
---

# Capítulo 71 — Confiabilidade e escala do banco

> **Volume 3 — Desenvolvimento de Software** · Módulo 20 — Banco de Dados
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender **transações** e as propriedades **ACID** (por que "pedido pago não se perde").
- Compreender o papel dos **índices** na performance (e seu custo).
- Conhecer as estratégias de escala: **replicação**, **sharding** e **backup**.
- Entender o que são **migrations** e por que o schema é versionado como código.
- Saber o que é um **ORM** e a ponte automática entre classes e tabelas.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]], [[68-SQL-na-pratica]] e [[69-Modelagem-de-dados-e-normalizacao]].
- Ajuda ter lido [[57-O-que-e-arquitetura-de-software]] (RNFs de confiabilidade e escala).

---

## 📖 Introdução

Chegamos ao capítulo que fecha o módulo de banco de dados com os assuntos que fazem o banco ser **confiável** (não perder dados, mesmo quando algo dá errado) e **escalável** (aguentar crescer de mil para milhões de usuários). São os requisitos não funcionais ([[46-O-que-sao-requisitos]]) mais críticos de qualquer sistema sério — porque, como já dissemos, **perder o banco é perder o negócio**. Um app pode ter bugs na tela e sobreviver; um banco que perde pedidos pagos ou corrompe saldos, não.

No coração da confiabilidade está um conceito elegante e vital: a **transação**. Quando você transfere dinheiro, duas coisas precisam acontecer **juntas ou nenhuma**: debitar de uma conta E creditar na outra. Se o sistema debita e falha antes de creditar, o dinheiro **evapora**. A transação garante que operações relacionadas aconteçam de forma **atômica** — tudo ou nada. As propriedades **ACID** formalizam essas garantias, e são a razão pela qual o banco relacional é insubstituível para dados críticos (dinheiro, pedidos, estoque).

Do outro lado está a **escala**: quando o sistema cresce, o banco vira gargalo. Como fazer consultas continuarem rápidas com milhões de registros (**índices**)? Como aguentar mais carga (**replicação**, **sharding**)? Como não perder dados numa falha de hardware (**backup**)? E há dois temas do dia a dia que todo dev encontra: **migrations** (como o schema evolui de forma versionada) e **ORM** (a ferramenta que traduz classes em tabelas, fechando a ponte que começou lá no diagrama de classes). Este capítulo é a "maturidade" do banco de dados — o que separa "sei fazer um CRUD" de "sei construir um sistema de dados confiável e que escala".

---

## 🧠 Analogia

Pense num **banco de verdade** (a instituição financeira) e em como ele protege o seu dinheiro.

**Transação (ACID):** quando você transfere dinheiro para um amigo, o banco garante que o débito na sua conta e o crédito na dele aconteçam **como uma unidade indivisível** — ou os dois, ou nenhum. Se a energia cair no meio, o banco **não** deixa o dinheiro sumir (debitado de você mas não creditado nele): ou a operação inteira se completa, ou é **desfeita** por completo. Essa é a **atomicidade** — o "tudo ou nada" que impede dinheiro de evaporar.

**Índice:** para achar a sua conta entre milhões, o banco não folheia todos os cadastros um por um — ele usa um **índice** (como o índice remissivo de um livro, ou a ordem alfabética de uma agenda) que aponta direto para você. Sem índice, cada consulta seria uma busca exaustiva.

**Replicação e backup:** o banco não guarda seus dados num só cofre. Ele mantém **cópias** em vários lugares (replicação) e **backups** guardados à parte — se uma agência pega fogo, seu dinheiro não se perde, porque existe em outros lugares.

**Sharding:** quando o banco fica gigante demais para uma única central processar, ele **divide** os clientes por regiões, cada central cuidando de uma fatia — repartindo a carga.

Guarde: transações protegem a integridade do "tudo ou nada"; índices aceleram a busca; réplicas e backups protegem contra perda; sharding reparte a carga. É assim que um banco (de dados) fica confiável e escalável.

---

## 🧩 Conceitos fundamentais

### 1. Transações e ACID

Uma **transação** é um conjunto de operações que devem ser tratadas como **uma unidade indivisível**: ou todas acontecem, ou nenhuma. No SQL: `BEGIN` (inicia), as operações, e `COMMIT` (confirma tudo) ou `ROLLBACK` (desfaz tudo).

As transações garantem as propriedades **ACID**:
- **A — Atomicidade:** tudo ou nada. Se uma parte falha, a transação inteira é desfeita.
- **C — Consistência:** a transação leva o banco de um estado válido a outro válido (respeitando as regras/restrições).
- **I — Isolamento:** transações simultâneas não interferem umas nas outras (como se fossem sequenciais).
- **D — Durabilidade:** depois do `COMMIT`, os dados persistem, mesmo se faltar energia logo depois.

> **Termo explicado — transação (ACID):** conjunto de operações tratadas como uma unidade indivisível, com garantias de Atomicidade, Consistência, Isolamento e Durabilidade — a base da confiabilidade de dados críticos.

É por isso que o banco relacional é insubstituível para **dinheiro, pedidos, estoque**: sem ACID, uma falha no meio de uma operação corrompe os dados. (Muitos NoSQL relaxam isso — [[70-NoSQL-cache-e-busca]].)

### 2. Índices — a velocidade da busca

Um **índice** é uma estrutura auxiliar que permite ao banco **encontrar linhas rapidamente** sem varrer a tabela inteira — como o índice remissivo de um livro. Sem índice, `WHERE email = '...'` numa tabela de milhões de linhas faz uma **varredura completa** (lenta); com um índice na coluna `email`, a busca é quase instantânea.

> **Termo explicado — índice:** estrutura que acelera a busca por uma coluna, evitando varrer a tabela inteira (à custa de espaço extra e escrita um pouco mais lenta).

**O custo:** índices ocupam espaço e deixam as **escritas** (INSERT/UPDATE) um pouco mais lentas (o índice também precisa ser atualizado). Por isso você indexa as colunas usadas em buscas/JOINs frequentes — não todas. É uma troca leitura-rápida × escrita-mais-lenta.

### 3. Escala: replicação e sharding

Quando um banco não aguenta a carga, há duas estratégias:
- **Replicação:** manter **cópias** do banco em vários servidores. Um padrão comum é **leitura/escrita separadas**: um servidor "primário" recebe as escritas, e várias "réplicas" respondem às leituras (que costumam ser a maioria). Distribui a carga de leitura e dá **redundância** (se o primário cai, uma réplica assume).
- **Sharding (particionamento):** **dividir** os dados entre vários bancos, cada um com uma fatia (ex.: clientes de A-M num, N-Z noutro). Reparte tanto os dados quanto a carga, mas complica muito as consultas que cruzam fatias.

> **Termo explicado — replicação vs. sharding:** replicação faz cópias do banco (para leitura e redundância); sharding divide os dados em fatias entre bancos diferentes (para repartir volume e carga).

Isso conecta à escalabilidade do Volume 4 — o banco é frequentemente o **gargalo** mais difícil de escalar.

### 4. Backup — a rede de segurança

**Backup** é uma cópia dos dados guardada à parte, para **recuperar** em caso de desastre (falha de hardware, erro humano, ataque). A regra clássica é **3-2-1**: 3 cópias, em 2 mídias diferentes, 1 fora do local. E — crucial — um backup **só existe de verdade se você testou restaurá-lo**. Backup que nunca foi testado é uma falsa sensação de segurança.

### 5. Migrations e ORM

- **Migration:** um arquivo **versionado** (no Git) que descreve uma mudança no **schema** do banco (criar tabela, adicionar coluna). Como o schema evolui ao longo da vida do produto, as migrations garantem que **todos** os ambientes (seu, do colega, produção) apliquem as mesmas mudanças na mesma ordem. O schema vira **código** versionado.

> **Termo explicado — migration:** arquivo versionado que descreve uma alteração no schema do banco, aplicado de forma controlada e reproduzível em todos os ambientes.

- **ORM (Object-Relational Mapping):** uma ferramenta que **mapeia classes ↔ tabelas** automaticamente, deixando você trabalhar com objetos em vez de escrever SQL na mão. `pedido.save()` vira um `INSERT`; `Pedido.find(1)` vira um `SELECT`. Exemplos: **Prisma** (Node), **Hibernate/JPA** (Java), **Entity Framework** (C#), **Django ORM** (Python), **ActiveRecord** (Rails).

> **Termo explicado — ORM:** ferramenta que traduz automaticamente entre objetos/classes do código e tabelas do banco, poupando de escrever SQL para operações comuns.

O ORM fecha a ponte **classe → tabela** que começou no [[55-Casos-de-uso-e-diagrama-de-classes]]: você define a classe, o ORM cria/usa a tabela. Mas — como vimos no [[68-SQL-na-pratica]] — você ainda precisa **entender SQL** para depurar, otimizar e evitar armadilhas (o problema N+1).

---

## ⚙️ Como funciona na prática

Como esses conceitos protegem e escalam um sistema real:

**Transações onde o dinheiro está.** Toda operação que envolve **múltiplas mudanças que precisam acontecer juntas** deve estar numa transação: criar o pedido + baixar o estoque + registrar o pagamento. Se qualquer passo falha, `ROLLBACK` desfaz tudo — nada de pedido criado sem estoque baixado, ou cobrança sem pedido. Envolver operações críticas em transações é uma marca de código profissional (e a rede de segurança contra o `DELETE` sem `WHERE` do [[68-SQL-na-pratica]]).

**Índices onde a busca dói.** Você adiciona índices nas colunas usadas em `WHERE` e `JOIN` frequentes (email para login, `cliente_id` para buscar pedidos de um cliente). Mas não indexa tudo — cada índice pesa nas escritas. A ferramenta `EXPLAIN` mostra se uma consulta está usando índice ou varrendo a tabela; ler isso é como você **diagnostica** lentidão.

**Escala gradual (a ordem certa).** Não se começa com sharding. A evolução típica de escala do banco é: (1) **otimizar consultas e índices** (resolve a maioria dos problemas); (2) **cache** ([[70-NoSQL-cache-e-busca]]) para aliviar leituras; (3) **réplicas de leitura** para distribuir carga; (4) só em último caso, **sharding** (complexo). Pular para sharding cedo é over-engineering ([[57-O-que-e-arquitetura-de-software]]).

**Backup como disciplina, não boa vontade.** Backups automáticos e regulares, guardados fora do servidor principal, **e testados** periodicamente (restaurar de verdade). A pergunta que separa amadores de profissionais: "se o banco morrer agora, quanto tempo de dados perdemos e quanto demora para voltar?" (os conceitos de **RPO** e **RTO**, do Volume 4).

**Migrations no fluxo de trabalho.** Toda mudança de schema vira uma migration versionada no Git, revisada em PR ([[64-Pull-Requests-code-review-e-issues]]) e aplicada automaticamente no deploy (Volume 4). Nunca se altera o banco de produção "na mão" — isso não é reproduzível e não fica registrado. Migration é como você evolui o modelo de dados ([[69-Modelagem-de-dados-e-normalizacao]]) com segurança.

**ORM no dia a dia (com consciência).** Você usa o ORM para o CRUD comum (rápido, seguro contra SQL Injection por padrão), mas cai para SQL puro nas consultas complexas e de performance. E fica atento às armadilhas do ORM — principalmente o **N+1** ([[68-SQL-na-pratica]]), que só quem entende SQL percebe.

---

## 🍔 Aplicação na SaborExpress

O banco da SaborExpress precisa ser **confiável** (não perder pedidos pagos) e **escalar** (aguentar o crescimento). Veja cada peça em ação.

**A transação que protege o pedido (ACID).** Quando um cliente finaliza um pedido com pagamento, três coisas acontecem: criar o pedido, criar os itens, e registrar o pagamento. O time envolve tudo numa **transação**: `BEGIN` → cria pedido → cria itens → registra pagamento → `COMMIT`. Se o pagamento falha no meio, `ROLLBACK` desfaz **tudo** — nada de pedido "fantasma" sem pagamento, nem cobrança sem pedido. É o requisito não funcional "nenhum pedido pago se perde" ([[46-O-que-sao-requisitos]]) garantido pela **atomicidade** do ACID. Sem transação, uma falha no gateway deixaria dados corrompidos e prejuízo.

**O índice que salvou o login e a busca de pedidos.** Quando a base passou de 100 mil clientes, o login (`WHERE email = ?`) e a tela "meus pedidos" (`WHERE cliente_id = ?`) ficaram lentos — o banco varria tabelas inteiras. Adicionar **índices** em `clientes.email` e `pedidos.cliente_id` fez o tempo cair de segundos para milissegundos. O `EXPLAIN` confirmou: antes, "varredura completa"; depois, "uso de índice".

**A escala gradual.** Conforme cresceu, a SaborExpress escalou o banco **na ordem certa**: primeiro otimizou consultas e índices; depois adicionou **cache** (Redis, para cardápios — [[70-NoSQL-cache-e-busca]]); depois **réplicas de leitura** (as muitas consultas de "listar restaurantes" foram para réplicas, deixando o primário só com as escritas). **Não** partiram para sharding — não precisaram, e teria sido complexidade desnecessária. Escalar o banco foi incremental e guiado por medição.

**O backup que evitou a catástrofe.** Uma vez, um erro humano num script apagou dados de uma tabela em produção. Como havia **backup automático diário** (testado — o time restaurava periodicamente para verificar), recuperaram os dados perdendo apenas algumas horas. Sem backup testado, teria sido a perda permanente de parte do histórico do negócio.

**Migrations versionadas.** Quando adicionaram a coluna `avaliacao` na tabela `pedidos`, não alteraram o banco "na mão": criaram uma **migration** versionada no Git, revisada em PR e aplicada automaticamente no deploy — no ambiente de dev, no do colega e em produção, na mesma ordem. O schema é código.

**O ORM (com consciência de SQL).** O time usa **Prisma** para o CRUD comum — `prisma.pedido.create(...)` em vez de escrever `INSERT` na mão, e seguro contra SQL Injection por padrão. Mas, quando a consulta de "faturamento por restaurante" (com JOIN e GROUP BY — [[68-SQL-na-pratica]]) ficou complexa, escreveram **SQL puro** para otimizá-la. E, ao notar que a listagem de pedidos fazia uma consulta por pedido para buscar o cliente (o **N+1**), corrigiram com um JOIN — algo que só perceberam porque **entendem SQL**, apesar de usar ORM.

Moral: a confiabilidade da SaborExpress (transações ACID, backups testados) garante que o negócio da Ana — os pedidos e pagamentos — nunca se perca; e a escala gradual (índices → cache → réplicas) manteve o banco rápido conforme cresceu. Migrations e ORM tornaram a evolução do banco segura e produtiva. É a "maturidade" do banco de dados na prática.

---

## 🏢 Como isso acontece em uma empresa

- **Transações são inegociáveis para dados críticos.** Qualquer operação financeira ou de estoque roda em transação. Entender ACID é esperado — e cobrado em entrevistas.
- **Índices e performance de query são assunto constante.** Ler `EXPLAIN`, adicionar índices, evitar N+1 e `SELECT *` — habilidades diárias. Uma query ruim pode derrubar produção.
- **Backup é responsabilidade levada a sério (e auditada).** Backups automáticos, testados, com RPO/RTO definidos. "Backup não testado não é backup" é mantra. Perder dados é dos piores incidentes possíveis.
- **Migrations são padrão universal.** Ferramentas como Flyway, Liquibase, Prisma Migrate, Alembic, Rails migrations versionam o schema. Alterar banco de produção "na mão" é proibido em times sérios.
- **ORMs dominam o CRUD; SQL domina o complexo.** A maioria dos times usa ORM para o comum e SQL puro para o pesado. Entender os dois — e as armadilhas do ORM — é o esperado.
- **Escala do banco é um dos maiores desafios.** Réplicas, cache, particionamento, connection pooling. Em escala, o banco costuma ser o gargalo mais difícil (Volume 4). DBAs e engenheiros de dados especializam-se nisso.
- **Serviços gerenciados na nuvem** (RDS, Aurora, Cloud SQL) cuidam de backup, réplicas e failover automaticamente — mas você ainda precisa entender os conceitos para usá-los bem.

---

## ⚠️ Erros comuns

- **Não usar transações em operações críticas.** Fazer criar-pedido, baixar-estoque e cobrar-pagamento **sem** transação: se um falha no meio, os dados ficam corrompidos (pedido sem pagamento, cobrança sem pedido).
- **Indexar tudo (ou nada).** Nenhum índice → consultas lentas. Índices demais → escritas lentas e espaço desperdiçado. Indexe as colunas de busca/JOIN frequentes, medindo.
- **Não ter backup — ou não testá-lo.** Confiar num backup que nunca foi restaurado é uma ilusão de segurança. Teste a restauração periodicamente.
- **Partir para sharding cedo demais.** Sharding é complexo e deve ser o **último** recurso. Otimização de query, cache e réplicas resolvem a grande maioria dos problemas de escala primeiro.
- **Alterar o banco de produção "na mão".** Mudanças de schema sem migration não são reproduzíveis, não ficam registradas e quebram ambientes. Sempre via migration versionada.
- **Confiar cegamente no ORM.** O ORM gera SQL ruim às vezes (o N+1). Sem entender SQL, você não percebe nem corrige — o ORM vira uma caixa-preta perigosa.
- **Ignorar o isolamento de transações concorrentes.** Duas transações mexendo nos mesmos dados ao mesmo tempo podem gerar condições de corrida (dois pedidos comprando o último item do estoque). O isolamento (e travas) protege — mas exige atenção.

---

## 💡 Dicas profissionais

- **Envolva operações relacionadas em transações.** Se várias mudanças precisam acontecer juntas (ou nenhuma), use `BEGIN`/`COMMIT`/`ROLLBACK`. É a garantia de que uma falha no meio não corrompe os dados — e a rede de segurança contra erros.
- **Indexe as colunas que você filtra e junta.** `WHERE` e `JOIN` frequentes em tabelas grandes pedem índice. Use `EXPLAIN` para confirmar que a consulta o usa, em vez de varrer a tabela.
- **Trate backup como obrigação e teste a restauração.** Configure backups automáticos e, periodicamente, **restaure de verdade** num ambiente de teste. Um backup não testado pode não funcionar quando você mais precisar.
- **Escale na ordem certa.** Otimizar queries/índices → cache → réplicas de leitura → (só em último caso) sharding. Não pule para a solução complexa antes de esgotar as simples.
- **Sempre use migrations para mudar o schema.** Versionadas no Git, revisadas em PR, aplicadas no deploy. Nunca altere produção manualmente. O schema é código.
- **Use ORM, mas domine SQL.** Aproveite o ORM para produtividade e segurança no CRUD, mas entenda o SQL que ele gera — para otimizar, depurar e pegar o N+1. O ORM é conveniência; SQL é fundamento.
- **Pense em RPO/RTO desde cedo.** "Quanto dado posso perder?" e "quanto tempo para voltar?" são perguntas que orientam sua estratégia de backup e replicação (Volume 4).

---

## 🎈 Curiosidades

- O acrônimo **ACID** foi cunhado por Andreas Reuter e Theo Härder em 1983, mas as ideias vêm de Jim Gray nos anos 1970 — um dos pais das transações, que ganhou o **Prêmio Turing** (o "Nobel da computação") por esse trabalho. Transações confiáveis são uma das grandes conquistas da ciência da computação.
- Os NoSQL que relaxam o ACID às vezes seguem o **BASE** (Basically Available, Soft state, Eventual consistency) — um trocadilho químico proposital com ACID (ácido vs. base), representando a filosofia oposta: disponibilidade e escala sobre consistência forte.
- O tipo de índice mais comum, a **B-tree** (árvore B), é uma estrutura de dados dos anos 1970 que continua sendo a espinha dorsal da performance de praticamente todos os bancos relacionais. As estruturas de dados do [[31-Estruturas-de-dados-essenciais]] (Vol. 2) estão literalmente rodando embaixo de cada consulta rápida.
- Empresas famosas já sofreram **perdas de dados catastróficas** por falhas de backup — inclusive um caso célebre em que uma empresa apagou o banco de produção por engano e descobriu que **nenhum** dos seus cinco métodos de backup funcionava. O incidente virou um estudo de caso sobre "backup não testado não é backup".
- O problema **N+1 query** é tão comum com ORMs que virou a primeira coisa que engenheiros experientes procuram ao investigar lentidão numa aplicação — e a correção (eager loading / JOIN) costuma dar ganhos dramáticos de performance com uma linha.
- O **sharding** do Instagram, do Discord e de outras gigantes é objeto de posts técnicos famosos — mostrando que, mesmo nas maiores escalas, particionar dados é um dos problemas de engenharia mais difíceis, cheio de trade-offs.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Transação** | Conjunto de operações tratadas como uma unidade indivisível (tudo ou nada). |
| **ACID** | Atomicidade, Consistência, Isolamento, Durabilidade — as garantias das transações. |
| **COMMIT / ROLLBACK** | Confirmar toda a transação / desfazer toda a transação. |
| **Índice** | Estrutura que acelera a busca por uma coluna (à custa de espaço/escrita). |
| **Replicação** | Manter cópias do banco em vários servidores (leitura, redundância). |
| **Sharding** | Dividir os dados em fatias entre bancos diferentes (repartir carga). |
| **Backup** | Cópia dos dados guardada à parte para recuperar em desastre. |
| **RPO / RTO** | Quanto dado se pode perder / quanto tempo para voltar após falha. |
| **Migration** | Arquivo versionado que descreve uma mudança no schema do banco. |
| **ORM** | Ferramenta que mapeia classes ↔ tabelas automaticamente. |
| **N+1 query** | Anti-padrão do ORM: 1 consulta + N consultas em vez de um JOIN. |

---

## 📝 Resumo

- Uma **transação** trata operações relacionadas como uma unidade indivisível, com as garantias **ACID** (Atomicidade, Consistência, Isolamento, Durabilidade). É o que garante que "pedido pago não se perde" e por que o relacional é insubstituível para dados críticos.
- **Índices** aceleram buscas (evitam varrer a tabela inteira), à custa de espaço e escritas um pouco mais lentas — indexe as colunas de `WHERE`/`JOIN` frequentes, com medição (`EXPLAIN`).
- Escala-se na ordem certa: **otimizar queries/índices → cache → réplicas de leitura → sharding** (último caso). **Replicação** faz cópias (leitura/redundância); **sharding** divide os dados em fatias.
- **Backup** é a rede de segurança contra desastre — e "backup não testado não é backup". Pense em **RPO/RTO**.
- **Migrations** versionam a evolução do schema como código (nunca altere produção na mão); **ORMs** mapeiam classes ↔ tabelas automaticamente (produtividade e segurança no CRUD), mas exigem que você **entenda SQL** para otimizar e evitar armadilhas como o **N+1**.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é uma transação e as quatro propriedades ACID.
- [ ] Entendo como um índice acelera a busca e qual seu custo.
- [ ] Diferencio replicação de sharding e sei a ordem certa de escalar.
- [ ] Sei por que backup precisa ser testado e o que são RPO/RTO.
- [ ] Explico o que é uma migration e por que o schema é versionado.
- [ ] Entendo o que é um ORM e por que ainda preciso saber SQL.

---

## ✏️ Exercícios

**1.** Explique, com o exemplo de uma transferência bancária, o que é **atomicidade** e por que sem ela o dinheiro poderia "sumir".

**2.** Uma consulta `WHERE email = ?` numa tabela de 5 milhões de clientes está lenta. O que provavelmente resolve, e qual é o custo dessa solução?

**3.** Diferencie **replicação** de **sharding**. Na hora de escalar um banco, qual você tentaria primeiro e por quê?

**4.** Por que "backup não testado não é backup"? E por que nunca se deve alterar o schema de produção "na mão"?

**5. (Reflexão)** Explique como a SaborExpress garante que "nenhum pedido pago se perde" usando transações, e o que aconteceria se ela criasse pedido, itens e pagamento **sem** uma transação e o pagamento falhasse no meio.

---

## 💬 Respostas comentadas

**1.** **Atomicidade** é a garantia de que todas as operações de uma transação acontecem **como uma unidade indivisível — ou todas, ou nenhuma**. Numa transferência, debitar da sua conta e creditar na do amigo formam uma transação: se o sistema debitasse de você e falhasse (energia, erro) **antes** de creditar no amigo, o dinheiro "sumiria" — saiu da sua conta mas não chegou na dele. A atomicidade impede isso: se qualquer parte falha, a transação inteira é **desfeita** (`ROLLBACK`), voltando ao estado anterior como se nada tivesse acontecido. Ou a transferência se completa inteira, ou não acontece — nunca fica "pela metade".

**2.** Provavelmente resolve adicionar um **índice** na coluna `email`. Sem índice, o banco faz uma **varredura completa** da tabela (olha as 5 milhões de linhas uma a uma) para achar o e-mail; com um índice, ele vai quase direto à linha certa, e o tempo cai de segundos para milissegundos. O **custo** é: o índice ocupa **espaço** em disco e torna as **escritas** (INSERT/UPDATE nessa tabela) um pouco mais lentas, porque o índice também precisa ser atualizado a cada mudança. Por isso indexa-se as colunas realmente usadas em buscas frequentes, não todas.

**3.** **Replicação** mantém **cópias completas** do banco em vários servidores — usada para distribuir a carga de **leitura** (várias réplicas respondem às consultas) e para **redundância** (se um cai, outro assume). **Sharding** **divide** os dados em **fatias** entre bancos diferentes (ex.: clientes A-M num, N-Z noutro), repartindo o volume e a carga de escrita. Eu tentaria **replicação (mais cache e índices) primeiro**, porque é bem mais simples de operar e resolve a maioria dos problemas — especialmente porque a maior parte da carga costuma ser de leitura. **Sharding** seria o **último** recurso, pois é muito mais complexo (consultas que cruzam fatias ficam difíceis, e a operação toda fica mais complicada) e só se justifica quando o volume realmente não cabe mais num único banco.

**4.** "Backup não testado não é backup" porque um backup só tem valor se você conseguir **restaurá-lo** quando precisar — e backups podem falhar silenciosamente (corrompidos, incompletos, com configuração errada). Se você nunca testou a restauração, tem apenas uma **falsa sensação de segurança**: pode descobrir, no pior momento (após perder os dados), que o backup não funciona. Por isso se restaura periodicamente num ambiente de teste, para provar que funciona. Nunca se altera o schema de produção **"na mão"** porque mudanças manuais **não são reproduzíveis** (o ambiente de dev, o do colega e o de produção ficam diferentes), **não ficam registradas** (ninguém sabe o que foi mudado nem por quê) e são **propensas a erro** (sem revisão). Migrations versionadas resolvem isso: a mudança é código no Git, revisada em PR e aplicada igualmente em todos os ambientes.

**5.** A SaborExpress envolve as três operações — criar o pedido, criar os itens e registrar o pagamento — numa **única transação** (`BEGIN` → ... → `COMMIT`). Pela **atomicidade** do ACID, ou as três se completam juntas (`COMMIT`) ou, se qualquer uma falhar, **todas** são desfeitas (`ROLLBACK`), voltando o banco ao estado anterior. Assim, "nenhum pedido pago se perde" e nenhum dado inconsistente é gravado. **Sem** a transação, se o sistema criasse o pedido, criasse os itens e o **pagamento falhasse no meio**, ficariam gravados um pedido e itens **sem pagamento** — um pedido "fantasma" que o restaurante talvez preparasse sem nunca ter sido pago (prejuízo), ou, na ordem inversa, uma cobrança sem pedido registrado (cliente cobrado sem receber). Os dados ficariam **corrompidos e inconsistentes**, exigindo correção manual e gerando prejuízo e desconfiança — exatamente o que a transação previne.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[70-NoSQL-cache-e-busca]] — cache alivia o banco; NoSQL relaxa o ACID por escala.
- **Próximo (linear):** [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] — começa o módulo de APIs, a porta de entrada dos dados.
- **Base:** [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]], [[68-SQL-na-pratica]], [[69-Modelagem-de-dados-e-normalizacao]] e [[31-Estruturas-de-dados-essenciais]] (Vol. 2 — árvores/índices).
- **Aplicação futura:** Volume 4 (escalabilidade, cloud, backups gerenciados, RPO/RTO) e [[80-Construindo-a-API-da-SaborExpress]] (transações no código).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 20 → **Capítulo 71 de 119**.
