# Capítulo 69 — Modelagem de dados e normalização

> **Volume 3 — Desenvolvimento de Software** · Módulo 20 — Banco de Dados
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **modelar dados** e a diferença entre modelo conceitual, lógico e físico.
- Ler e desenhar um **diagrama Entidade-Relacionamento (DER/ER)**.
- Compreender a **normalização** e as três primeiras formas normais (1FN, 2FN, 3FN) sem decoreba.
- Reconhecer os problemas que a normalização resolve (redundância e anomalias).
- Saber quando **desnormalizar** de propósito — e por que às vezes vale a pena.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] (tabelas, chaves) e [[68-SQL-na-pratica]] (JOIN).
- Ajuda ter lido [[55-Casos-de-uso-e-diagrama-de-classes]] — o DER é primo do diagrama de classes.

---

## 📖 Introdução

Você sabe criar tabelas e consultá-las. Agora vem a pergunta que separa um banco saudável de um pesadelo: **como decidir quais tabelas criar e o que vai em cada uma?** Essa é a arte da **modelagem de dados** — projetar a estrutura do banco antes de enchê-lo. E, como toda arquitetura ([[57-O-que-e-arquitetura-de-software]]), errar aqui é caro: um modelo de dados ruim contamina o sistema inteiro, gera bugs, dados inconsistentes e consultas complicadas que só pioram com o tempo.

O erro mais comum do iniciante é o que já mencionamos: jogar tudo em poucas tabelas gigantes, repetindo informação. O nome do cliente copiado em cada pedido; o endereço do restaurante em cada item. Isso parece simples no começo e vira um inferno depois: quando um dado muda, você tem que atualizá-lo em mil lugares (e esquece um), e o banco fica cheio de contradições. A técnica que **cura** esse mal tem nome e método: a **normalização** — um conjunto de regras para organizar as tabelas de modo que cada informação viva num **único lugar**.

Normalização tem fama de assunto árido e acadêmico (as "formas normais"), mas a ideia por trás é simples e intuitiva: **elimine a repetição, guarde cada fato uma vez só.** Este capítulo desmistifica isso. Você vai aprender a modelar dados em etapas (conceitual → lógico → físico), a desenhar o **diagrama Entidade-Relacionamento**, e a normalizar até a 3ª forma normal (que resolve 95% dos casos) — sem decorar definições, entendendo o **problema** que cada regra resolve. E, no fim, quando **quebrar** as regras de propósito (desnormalizar) faz sentido. É o capítulo que transforma "sei criar tabelas" em "sei projetar um banco que não vira bagunça".

---

## 🧠 Analogia

Pense em como você **organiza os contatos e as mensagens no seu celular**.

Imagine que, para cada mensagem que a sua amiga Ana te manda, o celular guardasse junto **todos os dados dela**: nome completo, telefone, e-mail, foto, aniversário — repetidos em **cada uma** das 500 mensagens. Absurdo, certo? Primeiro porque desperdiça espaço; segundo, e pior: se a Ana **troca de telefone**, você teria que atualizar o número em 500 mensagens — e se esquecesse uma, ficaria com dois telefones diferentes para a mesma pessoa (qual é o certo?).

O que o celular faz (sabiamente) é **separar**: há uma lista de **Contatos** (cada pessoa **uma vez**, com todos os seus dados) e uma lista de **Mensagens** que apenas **referencia** o contato. Cada mensagem "aponta" para a Ana; os dados dela moram num só lugar. Trocou o telefone? Muda em **um** lugar, e todas as mensagens passam a mostrar o número certo automaticamente.

Isso **é** normalização: guardar cada informação (a Ana) **uma única vez** na sua própria tabela, e **referenciá-la** por chave nos outros lugares — em vez de repetir. As "formas normais" são só regras cada vez mais rigorosas para garantir que não há repetição escondida. Guarde a intuição: **cada fato mora em um só lugar; o resto aponta para ele.**

---

## 🧩 Conceitos fundamentais

### 1. Os três níveis de modelagem

Modela-se em três etapas, do abstrato ao concreto:

- **Conceitual:** as **entidades** do negócio e como se relacionam, sem pensar em tecnologia. "Existe Cliente, Pedido, Produto; um cliente faz vários pedidos." É o **diagrama ER** de alto nível.
- **Lógico:** detalha atributos, chaves e relacionamentos, ainda independente do SGBD específico. Aqui a normalização acontece.
- **Físico:** o modelo real no SGBD escolhido — tipos de coluna exatos, índices, nomes. É o `CREATE TABLE`.

> **Termo explicado — modelagem de dados:** o processo de projetar a estrutura do banco em níveis (conceitual → lógico → físico), definindo entidades, atributos e relacionamentos antes de armazenar dados.

### 2. O diagrama Entidade-Relacionamento (DER/ER)

O **diagrama ER** representa visualmente o modelo de dados:
- **Entidade:** uma "coisa" (retângulo) — Cliente, Pedido. Vira uma **tabela**.
- **Atributo:** uma propriedade da entidade — nome, e-mail.
- **Relacionamento:** como as entidades se ligam (losango ou linha), com **cardinalidade** (1:1, 1:N, N:N).

> **Termo explicado — diagrama ER (Entidade-Relacionamento):** representação visual das entidades, seus atributos e os relacionamentos entre elas, com a cardinalidade (um-para-um, um-para-muitos, muitos-para-muitos).

O DER é o **primo** do diagrama de classes ([[55-Casos-de-uso-e-diagrama-de-classes]]) — entidades ≈ classes, cardinalidade ≈ multiplicidade. Muitos times usam um ou outro; o resultado no banco é o mesmo.

### 3. O problema: redundância e anomalias

Uma tabela **mal projetada** (com repetição) sofre de três **anomalias**:
- **Anomalia de atualização:** mudou o telefone do cliente → tem que atualizar em N linhas; esquece uma → inconsistência.
- **Anomalia de inserção:** não consigo cadastrar um restaurante novo até ele ter um pedido (porque os dados dele só existem "grudados" a pedidos).
- **Anomalia de exclusão:** apago o último pedido de um cliente e **perco** os dados do cliente junto (estavam só ali).

A **normalização** existe para eliminar essas anomalias, e a raiz de todas é a **redundância** (repetir dados).

### 4. Normalização: 1FN, 2FN, 3FN

**Normalizar** é organizar as tabelas seguindo regras (as "formas normais") para eliminar redundância. As três primeiras resolvem quase tudo:

- **1ª Forma Normal (1FN):** cada célula tem **um único valor** (nada de listas numa célula) e cada linha é única. Ex.: em vez de uma coluna `telefones = "1111, 2222"`, você cria linhas/tabela separada para telefones.
- **2ª Forma Normal (2FN):** está na 1FN **e** cada coluna depende da **chave primária inteira** (relevante para chaves compostas). Ex.: numa tabela `itens_pedido` com chave (pedido_id, produto_id), o **nome do produto** não pode ficar ali — ele depende só do produto, não do par. Vai para a tabela `produtos`.
- **3ª Forma Normal (3FN):** está na 2FN **e** nenhuma coluna depende de **outra coluna não-chave** (sem dependências transitivas). Ex.: numa tabela `pedidos`, não guarde `cidade` **e** `cep_da_cidade` juntos se o CEP depende da cidade — separe.

> **Termo explicado — normalização:** processo de organizar tabelas seguindo regras (formas normais) para eliminar redundância e anomalias, garantindo que cada fato seja armazenado uma única vez.

A regra prática que resume a 3FN, atribuída a uma paráfrase jurídica: *"cada coluna deve depender da chave, da chave inteira, e de nada além da chave."* Se você seguir a intuição "cada fato num só lugar", chega na 3FN naturalmente.

### 5. Desnormalização — quebrar as regras de propósito

**Desnormalizar** é, deliberadamente, **introduzir redundância** para ganhar **performance** de leitura. Um banco muito normalizado exige muitos `JOIN`s para montar uma tela, e JOINs custam. Às vezes vale copiar um dado (ex.: guardar o `nome_restaurante` direto no pedido, além do FK) para evitar um JOIN numa consulta muito frequente.

> **Termo explicado — desnormalização:** introduzir redundância de propósito (contra as formas normais) para acelerar leituras que fariam muitos JOINs — aceitando o custo de manter as cópias sincronizadas.

A regra: **normalize primeiro, desnormalize só quando medir** um problema real de performance. Desnormalizar cedo demais é otimização prematura; você troca a segurança da consistência por uma velocidade que talvez não precise.

---

## ⚙️ Como funciona na prática

O caminho de um bom modelo de dados:

**1. Comece pelas entidades do negócio.** Quais são as "coisas" que o sistema precisa lembrar? (Cliente, Pedido, Produto, Restaurante.) Elas saem direto dos requisitos ([[46-O-que-sao-requisitos]]) e do diagrama de classes ([[55-Casos-de-uso-e-diagrama-de-classes]]). Cada entidade tende a virar uma tabela.

**2. Defina relacionamentos e cardinalidade.** Um cliente faz **muitos** pedidos (1:N). Um produto pode estar em **muitos** pedidos e um pedido tem **muitos** produtos (N:N → vira tabela de junção). A cardinalidade decide onde vão as chaves estrangeiras.

**3. Normalize até a 3FN.** Percorra as tabelas eliminando repetição: nenhum dado copiado, cada fato num só lugar. Na prática, seguir a intuição "isto pertence a qual entidade?" já leva você à 3FN. O nome do produto pertence a `produtos`, não a `itens_pedido`; o telefone do cliente pertence a `clientes`, não a `pedidos`.

**4. Traduza para o modelo físico.** Escolha tipos ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]), defina PKs, FKs, restrições (`NOT NULL`, `UNIQUE`) e escreva os `CREATE TABLE`.

**5. Considere desnormalização só se medir necessidade.** Depois de o sistema rodar, se uma consulta crítica ficar lenta por excesso de JOINs, aí sim avalie desnormalizar aquele ponto específico — conscientemente, documentando a decisão.

**O elo com o custo da mudança.** Modelar dados é uma decisão de **arquitetura** ([[57-O-que-e-arquitetura-de-software]]): difícil de mudar depois. Reestruturar um modelo de dados com milhões de registros em produção é caro e arriscado (exige **migrations** cuidadosas — [[71-Confiabilidade-e-escala-do-banco]]). Por isso vale investir em modelar bem no começo — não obsessivamente (é ágil, evolui), mas o suficiente para não se pintar num canto. Um bom modelo de dados é a fundação sólida sobre a qual o resto do sistema se apoia.

---

## 🍔 Aplicação na SaborExpress

O banco da SaborExpress é **normalizado até a 3FN** — e essa disciplina evitou vários desastres.

**O modelo mal feito que quase foi.** Na primeira versão, um dev júnior propôs uma tabela `pedidos` "prática" que guardava tudo junto: `pedido_id, cliente_nome, cliente_telefone, cliente_endereco, restaurante_nome, produtos_lista, total`. Parecia simples. A dev sênior mostrou as três anomalias que isso traria:
- **Atualização:** o cliente troca de telefone → precisa atualizar em **todos** os pedidos dele; esquece um → dois telefones para a mesma pessoa.
- **Inserção:** não dá para cadastrar um restaurante novo antes de ele ter o primeiro pedido (seus dados só existiriam grudados a pedidos).
- **Exclusão:** apagar o último pedido de um cliente **apagaria os dados do cliente** junto.

**O modelo normalizado (3FN).** Em vez disso, separaram em `clientes`, `restaurantes`, `produtos`, `pedidos` (com `cliente_id` e `restaurante_id` como FKs) e `itens_pedido` (com `pedido_id` e `produto_id`). Cada fato num só lugar: o telefone do cliente mora em `clientes` e ponto. Trocar o telefone é **uma** operação; nenhum pedido fica inconsistente.

**A 2FN em ação.** Na tabela `itens_pedido` (chave composta pedido_id + produto_id), o júnior queria guardar também `nome_produto` e `preco_produto`. A sênior corrigiu: o **nome** do produto depende só do produto (não do par pedido+produto), então viola a 2FN — ele mora em `produtos`. **Exceto** o `preco_no_momento`, que é um dado **próprio** do item (o preço congelado da compra — [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]), e por isso legitimamente fica ali. Modelar bem é saber essa diferença.

**A desnormalização consciente.** Meses depois, a tela "meus pedidos" ficou lenta: para cada pedido, ela fazia JOIN com restaurantes só para mostrar o nome. Como essa consulta era **muito** frequente e o nome do restaurante quase nunca muda, o time **desnormalizou de propósito**: passou a guardar `nome_restaurante` também na tabela `pedidos` (além do FK), evitando o JOIN. Uma decisão **medida** (a consulta era comprovadamente lenta) e **documentada** (com o cuidado de atualizar a cópia se o restaurante mudar de nome) — não uma repetição por preguiça.

Moral: a normalização até a 3FN deu à SaborExpress um banco sem repetição e sem anomalias — cada fato num só lugar. E a desnormalização, quando veio, foi uma decisão consciente e medida, não um atalho descuidado. Modelar dados bem foi construir a fundação que sustenta todo o sistema.

---

## 🏢 Como isso acontece em uma empresa

- **Modelagem de dados é levada a sério.** Um modelo ruim é dívida técnica cara que contamina tudo. Times revisam o modelo de dados (o DER) como revisam arquitetura, porque mudá-lo depois é doloroso.
- **A 3FN é o alvo prático.** Na prática, projeta-se para a 3ª forma normal (as formas superiores — BCNF, 4FN, 5FN — existem, mas raramente importam no dia a dia). "Normalizado até a 3FN" é o padrão saudável.
- **Ferramentas de DER.** dbdiagram.io, draw.io, Lucidchart, e os próprios ORMs (que geram o schema a partir das classes) ajudam a modelar e visualizar.
- **Desnormalização é estratégica, não descuido.** Sistemas de leitura intensa (relatórios, BI, feeds) frequentemente desnormalizam de propósito. Data warehouses (Volume 4/5) usam modelos desnormalizados (star schema) para consultas analíticas rápidas.
- **Migrations evoluem o modelo.** O schema muda ao longo da vida do produto via migrations versionadas ([[71-Confiabilidade-e-escala-do-banco]]). Mudar um modelo de dados em produção com cuidado é uma habilidade valorizada.
- **O modelo de dados é conversa entre dev, PO e negócio.** As entidades refletem o negócio; modelar bem exige entender o domínio (liga à elicitação de requisitos — [[47-Elicitacao-personas-e-jornada-do-usuario]]).

---

## ⚠️ Erros comuns

- **Tabelas "gigantes" com tudo junto.** O erro raiz: repetir dados em vez de separar em entidades. Gera as três anomalias (atualização, inserção, exclusão).
- **Repetir o que deveria ser referência.** Copiar nome/telefone do cliente em cada pedido, em vez de usar FK. Quando o dado muda, vira inconsistência.
- **Listas dentro de uma célula (viola 1FN).** Guardar `"telefone1, telefone2"` numa coluna ou produtos separados por vírgula. Dificulta consultar e viola a 1FN. Use linhas/tabelas separadas.
- **Confundir dado "do relacionamento" com dado "da entidade".** O `preco_no_momento` pertence ao item do pedido (legítimo); o `nome_produto` pertence ao produto (não repita no item). Saber a diferença é a essência da 2FN/3FN.
- **Desnormalizar cedo demais.** Introduzir redundância "para ser rápido" antes de medir um problema real é otimização prematura que troca consistência por velocidade que talvez você nem precise.
- **Nunca desnormalizar (dogmatismo).** O extremo oposto: normalização obsessiva que exige 8 JOINs para uma tela simples. Às vezes um pouco de redundância consciente é a escolha certa.
- **Ignorar a modelagem "porque é ágil".** Ágil não é "sem modelagem"; é modelar o suficiente e evoluir. Um modelo de dados ruim é caríssimo de consertar depois.

---

## 💡 Dicas profissionais

- **Siga a intuição "cada fato num só lugar".** Se você se pega repetindo um dado em várias linhas, ele provavelmente pertence a outra tabela. Essa intuição te leva à 3FN sem decorar as regras.
- **Pergunte "isto pertence a qual entidade?".** Para cada coluna, identifique de qual "coisa" ela é propriedade. O nome do produto é do produto; o telefone é do cliente. Isso resolve a maioria das decisões de normalização.
- **Modele a partir dos requisitos e do diagrama de classes.** As entidades saem do negócio. Se você já fez um bom diagrama de classes ([[55-Casos-de-uso-e-diagrama-de-classes]]), o modelo de dados quase se desenha sozinho.
- **Normalize primeiro, desnormalize só quando medir.** Comece com um modelo limpo e normalizado. Só introduza redundância se uma consulta específica se provar lenta — e documente por quê.
- **Distinga dado "congelado" de dado "referenciado".** O `preco_no_momento` é congelado (dado próprio, legítimo); a maioria das cópias não é. Congelar um valor histórico ≠ repetir um dado que deveria ser único.
- **Desenhe o DER antes de criar as tabelas.** Dez minutos desenhando entidades e relacionamentos evitam um modelo torto que custaria dias para reestruturar depois.
- **Trate mudanças de schema com respeito.** Alterar um modelo em produção exige migrations cuidadosas. Pense bem no modelo desde o começo para minimizar reestruturações traumáticas.

---

## 🎈 Curiosidades

- A **normalização** e as **formas normais** foram criadas por **Edgar Codd** (o mesmo do modelo relacional) nos anos 1970. A 3FN é frequentemente resumida pela frase mnemônica: *"cada atributo depende da chave (1FN), da chave inteira (2FN) e de nada além da chave (3FN) — que Deus me ajude"* — a última parte é uma brincadeira que virou clássico.
- Existem formas normais **além** da 3FN — BCNF (Boyce-Codd), 4FN, 5FN, 6FN — mas na prática quase ninguém vai além da 3FN (ou da BCNF), porque as anomalias que elas resolvem são raras. Aprender as três primeiras cobre 95% dos casos reais.
- Os **data warehouses** (armazéns de dados para análise/BI — Volume 5) fazem o **oposto** da normalização: usam modelos deliberadamente **desnormalizados** (o "star schema", esquema estrela) porque, para consultas analíticas gigantes, evitar JOINs vale mais que evitar redundância. Contexto diferente, regra diferente.
- O termo "**forma normal**" vem da matemática/lógica, onde "normalizar" significa colocar algo numa forma padrão canônica. Codd emprestou o termo para os bancos de dados.
- Bancos **NoSQL** ([[70-NoSQL-cache-e-busca]]) muitas vezes **abraçam** a desnormalização como padrão (guardam dados "aninhados" e repetidos de propósito), fazendo uma troca consciente de consistência por velocidade e escala — o oposto filosófico do relacional normalizado.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Modelagem de dados** | Projetar a estrutura do banco (entidades, atributos, relações). |
| **Modelo conceitual/lógico/físico** | Do abstrato (entidades) ao concreto (CREATE TABLE). |
| **Diagrama ER (DER)** | Representação visual de entidades, atributos e relacionamentos. |
| **Cardinalidade** | Quantidade no relacionamento: 1:1, 1:N, N:N. |
| **Redundância** | Repetir a mesma informação em vários lugares. |
| **Anomalia** | Problema causado pela redundância (na atualização, inserção, exclusão). |
| **Normalização** | Organizar tabelas para eliminar redundância e anomalias. |
| **1FN / 2FN / 3FN** | As três primeiras formas normais (regras crescentes de organização). |
| **Dependência transitiva** | Uma coluna não-chave depender de outra coluna não-chave (viola 3FN). |
| **Desnormalização** | Introduzir redundância de propósito para acelerar leituras. |
| **Tabela de junção** | Tabela que realiza um relacionamento muitos-para-muitos (N:N). |

---

## 📝 Resumo

- **Modelar dados** é projetar a estrutura do banco em níveis (conceitual → lógico → físico), definindo entidades, atributos e relacionamentos — representados no **diagrama ER**, primo do diagrama de classes.
- Tabelas mal projetadas (com repetição) sofrem três **anomalias** — de atualização, inserção e exclusão —, todas causadas pela **redundância**.
- A **normalização** elimina redundância guardando cada fato num só lugar. As três primeiras formas normais resolvem quase tudo: **1FN** (um valor por célula), **2FN** (depende da chave inteira), **3FN** (não depende de outra coluna não-chave). A intuição "cada fato num só lugar" leva você à 3FN naturalmente.
- **Desnormalizar** é introduzir redundância de propósito para acelerar leituras (evitar JOINs) — mas só depois de **medir** um problema real de performance; desnormalizar cedo é otimização prematura.
- O modelo de dados é uma decisão de **arquitetura** (difícil de mudar depois): vale modelar bem no começo, seguindo os requisitos e o diagrama de classes, para não se pintar num canto — evoluindo via migrations cuidadosas quando necessário.

---

## ☑️ Checklist de aprendizado

- [ ] Explico os três níveis de modelagem (conceitual, lógico, físico).
- [ ] Leio e desenho um diagrama ER com cardinalidade.
- [ ] Identifico as três anomalias causadas por redundância.
- [ ] Entendo a 1FN, 2FN e 3FN pela intuição "cada fato num só lugar".
- [ ] Sei o que é desnormalização e quando ela se justifica.
- [ ] Distingo dado "congelado" (legítimo) de dado repetido (a evitar).

---

## ✏️ Exercícios

**1.** Com a analogia dos contatos e mensagens do celular, explique por que repetir os dados do cliente em cada pedido é um problema.

**2.** Dê um exemplo concreto de cada uma das três anomalias (atualização, inserção, exclusão) numa tabela `pedidos` que guarda os dados do cliente junto.

**3.** Uma tabela tem uma coluna `telefones` com o valor `"1111-1111, 2222-2222"`. Qual forma normal isso viola e como você corrigiria?

**4.** Explique a diferença entre guardar `preco_no_momento` em `itens_pedido` (correto) e guardar `nome_produto` em `itens_pedido` (errado). Por que um respeita a normalização e o outro não?

**5. (Reflexão)** A SaborExpress desnormalizou de propósito, guardando `nome_restaurante` na tabela `pedidos`. Explique por que isso pode ser uma boa decisão, qual o custo dela, e por que só deve ser feito "depois de medir".

---

## 💬 Respostas comentadas

**1.** É como o celular guardar todos os dados da Ana (nome, telefone, foto) repetidos em cada uma das 500 mensagens dela: além de desperdiçar espaço, cria um problema grave de **manutenção**. Se a Ana troca de telefone, você teria que atualizar o número nas 500 mensagens — e se esquecer uma, fica com dois telefones diferentes para a mesma pessoa, sem saber qual é o certo (inconsistência). Repetir os dados do cliente em cada pedido tem o mesmo defeito: o fato "telefone da Ana" deveria morar num único lugar (a tabela de clientes) e ser referenciado pelos pedidos, para que mudá-lo seja uma operação só e nada fique contraditório.

**2.** Numa tabela `pedidos` que guarda `cliente_nome`, `cliente_telefone` junto: **Atualização** — o cliente muda de telefone; você precisa atualizar em **todas** as linhas de pedido dele, e se esquecer uma, o banco fica com dois telefones para a mesma pessoa. **Inserção** — você não consegue cadastrar um **cliente novo** que ainda não fez nenhum pedido, porque os dados dele só existem "grudados" a um pedido (não há onde colocá-lo). **Exclusão** — se você apaga o **último pedido** de um cliente, apaga junto os dados dele (nome, telefone), perdendo o cliente do sistema sem querer.

**3.** Viola a **1ª Forma Normal (1FN)**, que exige **um único valor por célula** — aqui a célula guarda uma lista de dois telefones. A correção é separar em **linhas** ou numa **tabela própria**: criar uma tabela `telefones` com colunas (`id`, `cliente_id`, `numero`), onde cada telefone é uma linha ligada ao cliente por FK. Assim um cliente pode ter vários telefones (cada um numa linha), e fica fácil consultar, adicionar ou remover um telefone específico — o que era impossível com tudo numa célula só.

**4.** `preco_no_momento` é um dado **próprio do item do pedido**: ele registra quanto foi pago **naquela compra específica**, um valor **congelado** no tempo que pertence àquele item e a mais nenhum lugar — por isso é legítimo guardá-lo ali (não é repetição de um dado que existe em outro lugar; é um fato histórico do item). Já `nome_produto` é uma propriedade **do produto**, não do item: ele já mora (uma vez) na tabela `produtos`, e copiá-lo para `itens_pedido` seria **repetir** um dado — violando a normalização (2FN/3FN), porque o nome depende do produto, não do item. Se o nome do produto mudar, a cópia no item ficaria desatualizada. A diferença: um é um **fato próprio e congelado** do item; o outro é uma **referência** que deve apontar para a entidade dona (via `produto_id`), não ser copiada.

**5.** Pode ser boa porque a consulta "meus pedidos" é **muito frequente** e, para mostrar o nome do restaurante, ela fazia um `JOIN` com a tabela `restaurantes` em toda execução — o que ficou lento em escala. Guardar `nome_restaurante` direto em `pedidos` **elimina esse JOIN**, acelerando a tela mais usada. O **custo** é a redundância: o nome do restaurante passa a existir em dois lugares, então, se um restaurante mudar de nome, é preciso **manter a cópia sincronizada** (ou aceitar que pedidos antigos mostrem o nome antigo — o que muitas vezes é até desejável). Só se deve fazer "depois de medir" porque desnormalizar **troca a segurança da consistência por velocidade**: se a consulta não fosse comprovadamente um gargalo, você estaria adicionando complexidade e risco de inconsistência para resolver um problema que talvez não exista (otimização prematura). Medir garante que a troca vale a pena — e a decisão deve ser consciente e documentada.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[68-SQL-na-pratica]] — o JOIN que "remonta" o que a normalização separou.
- **Próximo (linear):** [[70-NoSQL-cache-e-busca]] — bancos que abraçam a desnormalização por escala e flexibilidade.
- **Base:** [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] (tabelas e chaves) e [[55-Casos-de-uso-e-diagrama-de-classes]] (o DER é primo do diagrama de classes).
- **Aplicação:** [[71-Confiabilidade-e-escala-do-banco]] (migrations que evoluem o modelo) e Volume 5 (data warehouse desnormalizado).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 20 → **Capítulo 69 de 119**.
