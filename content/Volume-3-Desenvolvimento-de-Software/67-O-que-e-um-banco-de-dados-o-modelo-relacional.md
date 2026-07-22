---
title: '67 - O que é um banco de dados; o modelo relacional'
---

# Capítulo 67 — O que é um banco de dados; o modelo relacional

> **Volume 3 — Desenvolvimento de Software** · Módulo 20 — Banco de Dados
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é um **banco de dados** e por que ele é essencial (a "memória permanente" dos sistemas).
- Compreender o **modelo relacional**: tabelas, linhas (registros), colunas (campos).
- Entender **chave primária** e **chave estrangeira** e como elas ligam tabelas.
- Reconhecer o que é um **SGBD** e os principais (PostgreSQL, MySQL, SQL Server, Oracle, SQLite).
- Ligar o modelo relacional ao diagrama de classes ([[55-Casos-de-uso-e-diagrama-de-classes]]) que você já viu.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[19-Bits-processador-e-memoria]] (Vol. 2) — a diferença entre memória volátil e permanente.
- Ajuda ter lido [[55-Casos-de-uso-e-diagrama-de-classes]] — o modelo relacional é o "primo" do diagrama de classes.

---

## 📖 Introdução

Todo sistema útil precisa **lembrar** de coisas. O app de delivery lembra dos seus pedidos, endereços e restaurantes favoritos. O banco lembra do seu saldo. A rede social lembra dos seus posts e amigos. Onde essa memória mora? No **banco de dados** — o componente responsável por **guardar, organizar e recuperar** dados de forma **permanente e confiável**. Se a lógica de negócio é o cérebro do sistema, o banco de dados é sua **memória de longo prazo**.

Lembra da distinção do Volume 2 entre memória **volátil** (RAM — some ao desligar) e **permanente** ([[19-Bits-processador-e-memoria]])? O banco de dados é o guardião da parte permanente: quando o servidor reinicia, os pedidos da SaborExpress **continuam lá** porque foram gravados no banco, não só na RAM. Perder o banco de dados é perder o negócio — por isso ele é, de longe, o componente mais protegido e cuidado de qualquer sistema.

O modelo mais usado no mundo — e o que você mais vai encontrar — é o **relacional**: dados organizados em **tabelas** (como planilhas), com linhas e colunas, que se **relacionam** entre si. Ele domina há mais de 40 anos por ser sólido, previsível e baseado em matemática. Este capítulo abre o módulo mais denso do Volume 3 explicando o que é um banco de dados e os fundamentos do modelo relacional — tabelas, chaves, relacionamentos. É a base para o SQL (próximo capítulo) e para tudo que vem depois. E você vai reconhecer algo familiar: o modelo relacional é o **primo direto** do diagrama de classes que você já desenhou. As classes viram tabelas; os relacionamentos viram chaves.

---

## 🧠 Analogia

Pense num **arquivo de fichas de uma biblioteca antiga** (ou numa **pasta de planilhas do Excel bem organizada**).

Imagine uma biblioteca que guarda tudo em **fichários**. Há um fichário de **Livros**: cada ficha (uma **linha**) tem os mesmos campos preenchidos (as **colunas**): código, título, autor, ano. Há outro fichário de **Membros**: cada ficha tem número de sócio, nome, telefone. E há um fichário de **Empréstimos**: cada ficha diz **qual livro** foi emprestado para **qual membro** e quando.

Repare como os fichários **se conectam**: a ficha de empréstimo não repete todo o título e o nome do membro — ela só anota o **código do livro** e o **número do sócio**. Para saber os detalhes, você "pula" para o fichário correspondente por aquele código. Isso é o **relacionamento**: guardar cada coisa **uma vez** no seu fichário e **referenciá-la** por um código único nos outros. O código único de cada ficha (o número de tombo do livro, o número de sócio) é a **chave primária**; o código que aparece "emprestado" de outro fichário (o código do livro na ficha de empréstimo) é a **chave estrangeira**.

Guarde: um banco relacional é um conjunto de fichários (tabelas) bem organizados, onde cada ficha (linha) tem os mesmos campos (colunas), cada uma tem um código único (chave primária), e os fichários se conectam por códigos emprestados (chaves estrangeiras) — evitando repetir informação.

---

## 🧩 Conceitos fundamentais

### 1. O que é um banco de dados e um SGBD

Um **banco de dados** é uma coleção **organizada** de dados, armazenada de forma **permanente**, que pode ser consultada e atualizada de forma eficiente e **confiável**. Quem gerencia esses dados é o **SGBD (Sistema de Gerenciamento de Banco de Dados)** — o software que guarda, protege, indexa e responde às consultas.

> **Termo explicado — SGBD (banco de dados):** o software que armazena, organiza, protege e recupera dados de forma permanente e eficiente. Exemplos: PostgreSQL, MySQL, SQL Server, Oracle, SQLite.

O SGBD faz muito mais que "salvar arquivo": garante que **múltiplos usuários** acessem ao mesmo tempo sem corromper dados, que uma falha não perca informação (transações — [[71-Confiabilidade-e-escala-do-banco]]), que consultas em milhões de registros sejam rápidas (índices), e que só quem tem permissão acesse.

### 2. O modelo relacional: tabelas, linhas, colunas

No **modelo relacional** (criado por Edgar Codd, 1970), os dados vivem em **tabelas** (formalmente, "relações"):

- **Tabela:** representa uma "coisa" do mundo (Clientes, Pedidos, Produtos) — como um fichário.
- **Coluna (campo/atributo):** uma propriedade da coisa (nome, e-mail, preço), com um **tipo** definido (texto, número, data).
- **Linha (registro/tupla):** uma ocorrência específica (um cliente concreto: "Ana, ana@email.com").

```
Tabela CLIENTES
┌─────┬─────────────┬──────────────────┬────────────┐
│ id  │ nome        │ email            │ criado_em  │  ← colunas (campos)
├─────┼─────────────┼──────────────────┼────────────┤
│ 1   │ Ana Costa   │ ana@email.com    │ 2026-01-10 │  ← uma linha (registro)
│ 2   │ João Silva  │ joao@email.com   │ 2026-01-11 │
└─────┴─────────────┴──────────────────┴────────────┘
```

> **Termo explicado — tabela, linha, coluna:** a tabela representa um tipo de entidade; cada **coluna** é uma propriedade (com tipo); cada **linha** é um registro concreto daquela entidade.

O nome "relacional" **não** vem de "relacionamentos entre tabelas" (confusão comum), e sim do conceito matemático de **relação** (uma tabela é uma relação). Mas os relacionamentos entre tabelas são, na prática, o que dá poder ao modelo.

### 3. Chave primária (Primary Key)

A **chave primária (PK)** é a coluna (ou conjunto de colunas) que **identifica cada linha de forma única** — nenhuma linha pode repeti-la, e ela nunca é nula. É o "número de tombo" da ficha. Quase sempre é um `id` numérico que cresce automaticamente (1, 2, 3...) ou um identificador único (**UUID**).

> **Termo explicado — chave primária (PK):** a coluna que identifica unicamente cada linha de uma tabela. Não se repete e não pode ser nula.

Por que é essencial? Para **referenciar** uma linha sem ambiguidade. Se dois clientes se chamam "João Silva", o `id` os distingue. É o âncora de todos os relacionamentos.

### 4. Chave estrangeira (Foreign Key) e relacionamentos

A **chave estrangeira (FK)** é uma coluna que **aponta para a chave primária de outra tabela**, criando um **relacionamento**. É o "código emprestado" da analogia.

Exemplo: a tabela `PEDIDOS` tem uma coluna `cliente_id` que é uma FK apontando para `CLIENTES.id`. Assim, cada pedido "sabe" a qual cliente pertence, **sem repetir** o nome e o e-mail do cliente em cada pedido.

```
CLIENTES                    PEDIDOS
┌─────┬───────────┐         ┌─────┬──────────────┬───────┐
│ id  │ nome      │         │ id  │ cliente_id   │ total │
├─────┼───────────┤         ├─────┼──────────────┼───────┤
│ 1   │ Ana Costa │◄────────│ 10  │ 1            │ 45.00 │  (pedido da Ana)
│ 2   │ João Silva│◄──┐     │ 11  │ 1            │ 30.00 │  (outro da Ana)
└─────┴───────────┘   └─────│ 12  │ 2            │ 60.00 │  (pedido do João)
                            └─────┴──────────────┴───────┘
        (cliente_id é FK que aponta para CLIENTES.id)
```

> **Termo explicado — chave estrangeira (FK):** coluna que referencia a chave primária de outra tabela, criando um relacionamento e garantindo que a referência exista de verdade (integridade referencial).

Isso realiza o **um-para-muitos** que você viu no diagrama de classes ([[55-Casos-de-uso-e-diagrama-de-classes]]): "um Cliente tem muitos Pedidos" vira uma FK `cliente_id` na tabela de pedidos. A **integridade referencial** garante que você não pode ter um pedido apontando para um cliente que não existe.

### 5. Do diagrama de classes ao banco (a ponte)

Lembra da promessa do [[55-Casos-de-uso-e-diagrama-de-classes]]? Aqui ela se cumpre:
- Cada **classe** → uma **tabela**.
- Cada **atributo** → uma **coluna**.
- Cada objeto (instância) → uma **linha**.
- Cada **relacionamento** um-para-muitos → uma **chave estrangeira**.
- Cada relacionamento **muitos-para-muitos** → uma **tabela de junção** (com duas FKs).

Modelar as classes **foi** projetar o banco. Essa continuidade — do requisito à classe à tabela — é uma das ideias mais bonitas e úteis do Volume 3.

---

## ⚙️ Como funciona na prática

Como o banco se encaixa no sistema que você está aprendendo a construir:

**O banco é a camada de dados.** Lembra das camadas do [[58-MVC-camadas-e-separacao-de-responsabilidades]]? O **Repository** conversa com o banco. Quando o Service precisa de um pedido, ele pede ao Repository, que **consulta** o banco (com SQL — [[68-SQL-na-pratica]]) e devolve os dados. O banco é a fonte permanente de tudo.

**Por que tabelas separadas e não uma planilha gigante?** A tentação do iniciante é jogar tudo numa tabela só ("uma planilha com pedido + cliente + produtos, tudo junto"). Isso gera **repetição** (o nome do cliente copiado em cada pedido) e **inconsistência** (mudou o telefone do cliente? tem que atualizar em mil lugares, e você esquece um). Separar em tabelas relacionadas por chaves — guardar cada coisa **uma vez** — é o que evita isso. É a base da **normalização** ([[69-Modelagem-de-dados-e-normalizacao]]).

**A integridade que o banco garante.** O SGBD **impede** dados inconsistentes: uma FK não deixa criar um pedido para um cliente inexistente; uma restrição `NOT NULL` não deixa um pedido sem valor; uma restrição `UNIQUE` não deixa dois clientes com o mesmo e-mail. O banco não é um depósito burro — é um **guardião** ativo das regras de integridade dos dados.

**Tipos de dados importam.** Cada coluna tem um tipo: `INTEGER`, `VARCHAR` (texto), `DECIMAL` (para dinheiro — nunca use `FLOAT` para valores monetários!), `DATE`, `BOOLEAN`. O tipo certo garante armazenamento eficiente e evita erros (guardar preço como texto é pedir problema).

**O modelo relacional é o padrão porque é confiável.** Ele domina há 40+ anos porque é **previsível** (estrutura rígida, regras claras), **consistente** (transações garantem integridade — [[71-Confiabilidade-e-escala-do-banco]]) e baseado em **matemática sólida** (a álgebra relacional). Para a maioria dos sistemas — inclusive a SaborExpress — o relacional é a escolha padrão e segura. Só quando aparecem necessidades específicas (escala massiva, dados sem estrutura fixa) entram os bancos **NoSQL** ([[70-NoSQL-cache-e-busca]]).

---

## 🍔 Aplicação na SaborExpress

O coração da SaborExpress é seu **banco de dados relacional** (PostgreSQL). Toda a memória do negócio mora nele.

**As tabelas (que nasceram do diagrama de classes).** Lembra do diagrama de classes do [[55-Casos-de-uso-e-diagrama-de-classes]]? Ele virou o banco quase 1-para-1:
- `clientes` (id, nome, email, telefone, criado_em)
- `restaurantes` (id, nome, endereco, taxa_entrega)
- `produtos` (id, restaurante_id, nome, preco, disponivel)
- `pedidos` (id, cliente_id, restaurante_id, status, total, criado_em)
- `itens_pedido` (id, pedido_id, produto_id, quantidade, preco_no_momento)

**As chaves ligando tudo.** Cada tabela tem uma PK (`id`). As FKs realizam os relacionamentos: `pedidos.cliente_id` → `clientes.id` (um cliente, muitos pedidos); `itens_pedido.pedido_id` → `pedidos.id` (um pedido, muitos itens); `produtos.restaurante_id` → `restaurantes.id`. Assim, um pedido não repete os dados do cliente — só guarda o `cliente_id` e "pula" para a tabela de clientes quando precisa.

**A integridade que salvou o negócio.** A FK `pedidos.cliente_id` **impede** que exista um pedido apontando para um cliente que não existe — o banco **recusa**. Numa ocasião, um bug no código tentou criar um pedido com um `cliente_id` inválido; o banco **rejeitou** a operação (violação de integridade referencial), e o erro apareceu no log em vez de gerar um pedido "fantasma" sem dono. O banco, como guardião, evitou dados corrompidos.

**O `preco_no_momento` (a lição do modelo, de novo).** Lembra da decisão de modelagem do [[54-Por-que-modelar-antes-de-programar-UML]]? Ela vive no banco: `itens_pedido` tem a coluna `preco_no_momento` (`DECIMAL`), que **congela** o preço pago. Se o restaurante muda o preço do produto na tabela `produtos`, os pedidos antigos **não** mudam de valor, porque guardaram o preço no próprio item. E o tipo é `DECIMAL`, não `FLOAT` — porque `FLOAT` causa erros de arredondamento em dinheiro (0,10 + 0,20 podendo virar 0,30000004).

**A permanência que é o negócio.** Quando o servidor da SaborExpress reinicia numa madrugada, **nada** se perde: todos os pedidos, cadastros e histórico estão gravados no banco (permanente), não na RAM (volátil). O banco é, literalmente, onde o negócio da Ana está guardado — por isso é o componente mais protegido, com backups ([[71-Confiabilidade-e-escala-do-banco]]).

Moral: o banco relacional da SaborExpress é a memória permanente e confiável do negócio, estruturado em tabelas que nasceram do diagrama de classes, com chaves que ligam tudo sem repetição e garantem integridade. É onde requisito → classe → tabela se completa.

---

## 🏢 Como isso acontece em uma empresa

- **O banco relacional é o padrão.** A maioria dos sistemas usa um SGBD relacional como fonte principal de dados. **PostgreSQL** (poderoso, open source, muito querido hoje) e **MySQL/MariaDB** dominam; **SQL Server** (Microsoft) e **Oracle** são fortes em corporações; **SQLite** (embutido, sem servidor) é onipresente em apps e testes.
- **O banco é o ativo mais protegido.** Backups, réplicas, controle de acesso rígido, monitoramento. Perder o banco é perder o negócio — por isso é o componente com mais cuidado ([[71-Confiabilidade-e-escala-do-banco]]).
- **DBA e engenheiros de dados.** Empresas maiores têm **DBAs (administradores de banco)** e times de dados que cuidam de performance, backup e modelagem. Mas todo dev mexe com banco no dia a dia.
- **Migrations versionam o schema.** A estrutura do banco (tabelas, colunas) evolui via **migrations** — arquivos versionados no Git que descrevem as mudanças ([[71-Confiabilidade-e-escala-do-banco]]). O schema é código.
- **ORMs medeiam o acesso.** Muitos times usam **ORMs** (Prisma, Hibernate, Entity Framework) que mapeiam classes ↔ tabelas automaticamente ([[71-Confiabilidade-e-escala-do-banco]]) — reforçando a ponte classe→tabela.
- **Saber modelar dados é habilidade central.** Entender tabelas, chaves e relacionamentos é esperado de **qualquer** dev, não só de especialistas de banco. Um modelo de dados ruim contamina o sistema inteiro.

---

## ⚠️ Erros comuns

- **Jogar tudo numa tabela só.** Misturar cliente, pedido e produtos numa "planilha gigante" gera repetição e inconsistência. Separe em tabelas relacionadas ([[69-Modelagem-de-dados-e-normalizacao]]).
- **Repetir dados em vez de referenciar.** Copiar o nome do cliente em cada pedido (em vez de usar uma FK) leva a dados divergentes quando algo muda. Guarde cada coisa **uma vez**.
- **Não usar chave primária.** Uma tabela sem PK não tem como identificar linhas de forma única — problema sério para atualizar e relacionar.
- **Usar o tipo errado.** Guardar dinheiro como `FLOAT` (erros de arredondamento), data como texto, número como texto. O tipo certo previne bugs e melhora a performance. Para dinheiro, `DECIMAL`.
- **Confundir "relacional" com "relacionamentos".** O nome vem da matemática (relação = tabela), embora os relacionamentos por chaves sejam o que dá poder ao modelo.
- **Ignorar a integridade referencial.** Não definir FKs deixa o banco aceitar dados órfãos (pedido sem cliente válido). As FKs são uma proteção, não burocracia.
- **Achar que o banco é "só onde salvo os dados".** Ele é um guardião ativo: garante integridade, controla acesso concorrente, e otimiza consultas. Subestimá-lo leva a decisões ruins.

---

## 💡 Dicas profissionais

- **Modele o banco a partir do diagrama de classes.** Classe → tabela, atributo → coluna, relação → chave estrangeira. Se você modelou bem as entidades ([[55-Casos-de-uso-e-diagrama-de-classes]]), o banco quase se desenha sozinho.
- **Guarde cada informação uma única vez.** A regra de ouro do relacional: em vez de repetir, referencie por chave. Isso evita inconsistências e é a essência da normalização.
- **Sempre defina uma chave primária.** Todo registro precisa de um identificador único (um `id` autoincremento ou UUID). É o âncora de tudo.
- **Use FKs para proteger a integridade.** Deixe o banco recusar dados órfãos. Uma FK bem posta pega bugs que o código deixaria passar.
- **Escolha o tipo certo — especialmente para dinheiro.** `DECIMAL` para valores monetários (nunca `FLOAT`), `DATE`/`TIMESTAMP` para datas, tipos numéricos para números. O tipo é uma decisão de correção, não só de espaço.
- **Comece com relacional.** Para a maioria dos sistemas, um banco relacional (PostgreSQL é uma ótima escolha padrão) é a decisão segura. Só vá para NoSQL ([[70-NoSQL-cache-e-busca]]) quando um requisito específico pedir.
- **Trate o banco como o ativo mais valioso.** Backups e cuidado com quem acessa. Código você reescreve; dados perdidos, muitas vezes, não se recuperam.

---

## 🎈 Curiosidades

- O **modelo relacional** foi proposto por **Edgar F. Codd**, um pesquisador da IBM, em **1970**, num artigo hoje lendário. Ironicamente, a própria IBM demorou a adotá-lo comercialmente — e foi uma empresa nova, a **Oracle**, que primeiro o transformou em produto de sucesso.
- A linguagem **SQL** ([[68-SQL-na-pratica]]) nasceu na IBM nos anos 1970 como "SEQUEL" (por isso muita gente pronuncia "síquel"), para consultar esses bancos relacionais. É uma das linguagens mais duradouras da computação.
- O **PostgreSQL** descende do projeto **Ingres** de Berkeley e tem esse nome estranho porque foi o "pós-Ingres". Hoje é frequentemente eleito o banco favorito dos desenvolvedores em pesquisas, por ser poderoso, extensível e open source.
- O **SQLite** é provavelmente o banco de dados mais implantado do **mundo** — ele roda dentro de praticamente todo celular, navegador e app (é um único arquivo, sem servidor). Você tem centenas de bancos SQLite no seu bolso agora.
- A distinção entre um banco de dados e uma planilha do Excel é mais de **escala e garantias** que de conceito: ambos têm linhas e colunas, mas o banco lida com milhões de registros, múltiplos usuários simultâneos, integridade e transações — coisas que fazem a planilha desmoronar.
- Edgar Codd ficou tão incomodado com produtos que se diziam "relacionais" sem realmente serem que publicou, em 1985, as **"12 regras de Codd"** (na verdade 13, de 0 a 12) para definir o que conta como um verdadeiro SGBD relacional.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Banco de dados** | Coleção organizada de dados, guardada de forma permanente e confiável. |
| **SGBD** | O software que gerencia o banco (PostgreSQL, MySQL, etc.). |
| **Modelo relacional** | Dados organizados em tabelas que se relacionam por chaves. |
| **Tabela** | Estrutura que representa um tipo de entidade (como um fichário). |
| **Linha (registro)** | Uma ocorrência concreta (um cliente específico). |
| **Coluna (campo)** | Uma propriedade da entidade, com um tipo definido. |
| **Chave primária (PK)** | Identificador único de cada linha (não repete, não é nulo). |
| **Chave estrangeira (FK)** | Coluna que aponta para a PK de outra tabela (cria relacionamento). |
| **Integridade referencial** | Garantia de que uma FK aponta para algo que existe de verdade. |
| **Tipo de dado** | O formato de uma coluna (texto, número, data, decimal...). |
| **UUID** | Identificador único universal, alternativa ao id numérico. |

---

## 📝 Resumo

- Um **banco de dados** é a **memória permanente e confiável** de um sistema — onde os dados sobrevivem ao desligamento (ao contrário da RAM volátil). O **SGBD** é o software que o gerencia, garantindo integridade, acesso concorrente e consultas rápidas.
- O **modelo relacional** organiza dados em **tabelas** (fichários), com **colunas** (campos tipados) e **linhas** (registros). Domina há 40+ anos por ser sólido, previsível e baseado em matemática.
- A **chave primária (PK)** identifica cada linha unicamente; a **chave estrangeira (FK)** aponta para a PK de outra tabela, criando **relacionamentos** e garantindo **integridade referencial** — guardando cada informação **uma vez** em vez de repetir.
- O modelo relacional é o **primo do diagrama de classes**: classe → tabela, atributo → coluna, objeto → linha, relação um-para-muitos → FK, muitos-para-muitos → tabela de junção.
- Boas práticas: separar em tabelas (não uma planilha gigante), referenciar em vez de repetir, sempre ter PK, usar FKs para integridade, e escolher o **tipo certo** (DECIMAL para dinheiro, nunca FLOAT). O relacional (PostgreSQL, MySQL...) é a escolha padrão e segura.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é um banco de dados e por que é a "memória permanente".
- [ ] Descrevo tabela, linha e coluna no modelo relacional.
- [ ] Sei o que é chave primária e por que toda tabela precisa de uma.
- [ ] Explico como uma chave estrangeira cria um relacionamento e garante integridade.
- [ ] Ligo o modelo relacional ao diagrama de classes.
- [ ] Sei por que separar em tabelas é melhor que uma planilha gigante.

---

## ✏️ Exercícios

**1.** Com a analogia dos fichários da biblioteca, explique o que são **chave primária** e **chave estrangeira**.

**2.** Você precisa guardar Autores e Livros (um autor escreve vários livros). Descreva as duas tabelas, suas colunas e onde ficaria a chave estrangeira.

**3.** Por que é ruim guardar tudo (cliente + pedido + itens) numa única tabela "gigante"? Dê um exemplo concreto de problema que isso causa.

**4.** Um colega vai guardar o valor de pedidos usando o tipo `FLOAT`. Por que isso é um problema e o que ele deveria usar?

**5. (Reflexão)** Explique como o diagrama de classes da SaborExpress virou o banco de dados, citando um exemplo de tabela, uma chave estrangeira e a decisão do `preco_no_momento`.

---

## 💬 Respostas comentadas

**1.** A **chave primária** é como o **número de tombo** único de cada ficha (o código do livro, o número de sócio): identifica aquela ficha sem ambiguidade — nenhuma outra tem o mesmo, e nenhuma fica sem. A **chave estrangeira** é como o **código emprestado** que aparece numa ficha de outro fichário: a ficha de empréstimo não repete o título do livro nem o nome do sócio — ela só anota o **código do livro** e o **número do sócio**, "apontando" para as fichas correspondentes nos outros fichários. Assim cada informação mora num único fichário e é referenciada pelos outros por código.

**2.** **Tabela AUTORES:** colunas `id` (PK), `nome`, `nacionalidade`. **Tabela LIVROS:** colunas `id` (PK), `titulo`, `ano`, `autor_id` (**FK** apontando para `AUTORES.id`). A chave estrangeira fica na tabela **LIVROS** (`autor_id`), porque o relacionamento é "um autor tem **muitos** livros" — e a FK sempre vai no lado "muitos". Assim cada livro sabe seu autor sem repetir os dados do autor, e um autor pode ter vários livros apontando para ele.

**3.** É ruim porque gera **repetição** e **inconsistência**. Se cliente, pedido e itens ficam numa tabela só, os dados do cliente (nome, telefone) são **copiados em cada linha de item de cada pedido** dele. Exemplo concreto de problema: o cliente troca de telefone. Agora você precisa atualizar o telefone em **todas** as centenas de linhas onde ele aparece — e se esquecer uma, o banco fica com dois telefones diferentes para o mesmo cliente (inconsistência). Separando em tabelas (`clientes`, `pedidos`, `itens_pedido`) ligadas por chaves, o telefone do cliente fica em **um único lugar**, e atualizá-lo é uma mudança só.

**4.** `FLOAT` (ponto flutuante) representa números de forma **aproximada** em binário, o que causa **erros de arredondamento** em valores monetários — somas como 0,10 + 0,20 podem resultar em algo como 0,30000000004, e esses centavos "fantasmas" se acumulam e geram divergências financeiras (uma conta que não fecha). Para dinheiro, ele deveria usar **`DECIMAL`** (ou `NUMERIC`), que armazena o valor de forma **exata** com o número certo de casas decimais — garantindo que os cálculos financeiros batam certinho.

**5.** O diagrama de classes virou o banco quase 1-para-1: cada **classe** virou uma **tabela**. Exemplo de tabela: a classe `Pedido` virou a tabela `pedidos` (com colunas `id`, `cliente_id`, `status`, `total`, `criado_em`). Exemplo de **chave estrangeira**: o relacionamento "um Cliente tem muitos Pedidos" virou a coluna `pedidos.cliente_id`, uma FK que aponta para `clientes.id` — cada pedido sabe seu dono sem repetir os dados do cliente, e o banco impede pedidos apontando para clientes inexistentes (integridade referencial). E a decisão de modelagem do **`preco_no_momento`** virou uma coluna `DECIMAL` na tabela `itens_pedido`: ela **congela** o preço pago no instante da compra, de modo que, se o restaurante mudar o preço do produto depois, os pedidos antigos mantêm o valor real que o cliente pagou — resolvendo, no banco, exatamente o problema que o modelo de classes antecipou.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[68-SQL-na-pratica]] — a linguagem para consultar e alterar o banco.
- **Aprofunda:** [[69-Modelagem-de-dados-e-normalizacao]] — como projetar tabelas que não viram bagunça.
- **Base:** [[55-Casos-de-uso-e-diagrama-de-classes]] (o modelo que vira tabelas) e [[19-Bits-processador-e-memoria]] (Vol. 2 — volátil vs. permanente).
- **Aplicação:** [[70-NoSQL-cache-e-busca]] (quando o relacional não basta) e [[71-Confiabilidade-e-escala-do-banco]] (transações, índices, backup, ORM).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 20 → **Capítulo 67 de 119**.
