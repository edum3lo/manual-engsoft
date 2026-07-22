---
title: '68 - SQL na prática'
---

# Capítulo 68 — SQL na prática

> **Volume 3 — Desenvolvimento de Software** · Módulo 20 — Banco de Dados
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **SQL** e por que ele é uma linguagem **declarativa**.
- Escrever as quatro operações essenciais (**CRUD**): `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
- Filtrar (`WHERE`), ordenar (`ORDER BY`) e agrupar (`GROUP BY`) dados.
- Combinar tabelas com **`JOIN`** — a operação mais poderosa e mais temida do SQL.
- Reconhecer perigos comuns (o `UPDATE`/`DELETE` sem `WHERE`, SQL Injection) e boas práticas.

---

## ⏱️ Tempo médio de estudo

**50 a 60 minutos**, mais 30 minutos praticando consultas.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] — tabelas, linhas, colunas, chaves.
- Ideal: ter acesso a um banco (SQLite ou PostgreSQL) para praticar as consultas.

---

## 📖 Introdução

Você tem um banco de dados cheio de tabelas. Como você **conversa** com ele — pergunta "quais foram os pedidos de hoje?", insere um novo cliente, atualiza um preço? A resposta é uma linguagem que sobreviveu a **cinco décadas** de modismos tecnológicos e continua indispensável: o **SQL (Structured Query Language)**. Enquanto linguagens de programação vêm e vão, o SQL permanece — é uma das habilidades mais **duradouras e valiosas** que você pode ter. Praticamente todo sistema com banco relacional fala SQL, e saber SQL é esperado de **qualquer** desenvolvedor, não só de especialistas em dados.

O SQL tem uma característica que o torna especial e, no começo, estranho: ele é **declarativo**. Em vez de dizer ao computador **como** fazer algo passo a passo (como nas linguagens de programação que você viu no [[30-Logica-de-programacao-sem-trauma]]), você diz **o que** você quer, e o banco descobre como buscar. "Me dê os pedidos acima de R$50, ordenados por data" — você declara o resultado desejado, não o algoritmo de busca. É como pedir um prato no restaurante em vez de cozinhá-lo.

Este é um capítulo **para praticar de mão na massa** — leia com um banco à mão e vá digitando as consultas. Vamos cobrir o **CRUD** (Create, Read, Update, Delete — as quatro operações que sustentam qualquer sistema), como filtrar, ordenar e agrupar, e o poderoso **`JOIN`** que combina tabelas (onde os relacionamentos do capítulo anterior ganham vida). Também vamos aos **perigos reais** — o `DELETE` sem `WHERE` que apaga a tabela inteira, o SQL Injection que abre a porta para hackers. Dominar SQL é dominar a conversa com a memória do seu sistema.

---

## 🧠 Analogia

Pense em **pedir informações a um bibliotecário extremamente eficiente**.

Você não vai até as estantes procurar livro por livro (isso seria programação **imperativa**, dizendo cada passo). Você simplesmente **declara o que quer** ao bibliotecário: *"me traga todos os livros de ficção publicados depois de 2020, ordenados por autor"*. O bibliotecário — que conhece o acervo e os atalhos melhor que você — descobre **como** encontrar e ordenar, e te entrega o resultado. Isso é o SQL **declarativo**: você descreve o resultado, o banco (o bibliotecário) resolve o "como".

E os quatro pedidos básicos que você faz ao bibliotecário são o **CRUD**:
- **"Me mostre..."** (consultar) = `SELECT`
- **"Cadastre este novo livro"** (criar) = `INSERT`
- **"Atualize o endereço deste membro"** (alterar) = `UPDATE`
- **"Remova esta ficha"** (apagar) = `DELETE`

E o **`JOIN`** é quando você pede algo que **cruza dois fichários**: *"me diga o nome dos membros e os títulos dos livros que cada um pegou emprestado"* — o bibliotecário combina o fichário de membros com o de empréstimos e o de livros. Guarde: você **declara o que quer** e o banco descobre como; as quatro operações básicas são consultar, criar, alterar, apagar; e o JOIN cruza fichários.

---

## 🧩 Conceitos fundamentais

### 1. O que é SQL (e "declarativo")

**SQL (Structured Query Language)** é a linguagem padrão para consultar e manipular bancos de dados relacionais. Ela é **declarativa**: você especifica **o que** quer, não o passo a passo de como obter.

> **Termo explicado — SQL:** linguagem declarativa padrão para consultar e manipular bancos relacionais. Você descreve o resultado desejado; o SGBD decide como executá-lo.

O SQL divide-se informalmente em: **DQL** (consulta — `SELECT`), **DML** (manipulação — `INSERT`, `UPDATE`, `DELETE`), **DDL** (definição de estrutura — `CREATE`, `ALTER`, `DROP` tabelas) e **DCL** (controle de acesso — `GRANT`). O dia a dia do dev é dominado por `SELECT` e o CRUD.

### 2. SELECT — a consulta (Read)

O `SELECT` lê dados. A estrutura básica:

```sql
SELECT nome, email          -- quais colunas
FROM clientes               -- de qual tabela
WHERE cidade = 'Costa Rica' -- filtro (quais linhas)
ORDER BY nome               -- ordenação
LIMIT 10;                   -- quantas linhas
```

- **`SELECT *`** traz todas as colunas (evite em produção — traga só o que precisa).
- **`WHERE`** filtra linhas por condição (`=`, `>`, `<`, `!=`, `LIKE` para texto, `IN`, `BETWEEN`, `AND`/`OR`).
- **`ORDER BY ... ASC/DESC`** ordena.
- **`LIMIT`** restringe a quantidade.

### 3. INSERT, UPDATE, DELETE — o resto do CRUD

```sql
-- INSERT (Create): adiciona uma linha
INSERT INTO clientes (nome, email) VALUES ('Ana Costa', 'ana@email.com');

-- UPDATE: altera linhas existentes
UPDATE produtos SET preco = 29.90 WHERE id = 42;

-- DELETE: remove linhas
DELETE FROM clientes WHERE id = 7;
```

> **Termo explicado — CRUD:** as quatro operações básicas sobre dados — Create (`INSERT`), Read (`SELECT`), Update (`UPDATE`), Delete (`DELETE`). Sustentam praticamente todo sistema.

**⚠️ O perigo mortal:** `UPDATE` e `DELETE` **sem `WHERE`** afetam a tabela **inteira**. `DELETE FROM clientes;` apaga **todos** os clientes. `UPDATE produtos SET preco = 0;` zera **todos** os preços. Este é um dos erros mais catastróficos e comuns — sempre confira o `WHERE`.

### 4. Agregação: COUNT, SUM, GROUP BY

O SQL calcula resumos com **funções de agregação**:
- `COUNT(*)` — conta linhas. `SUM(total)` — soma. `AVG(preco)` — média. `MAX`/`MIN`.
- **`GROUP BY`** agrupa linhas para agregar por categoria: "total de vendas **por** restaurante".

```sql
SELECT restaurante_id, COUNT(*) AS qtd_pedidos, SUM(total) AS faturamento
FROM pedidos
GROUP BY restaurante_id
HAVING SUM(total) > 1000;   -- HAVING filtra grupos (WHERE filtra linhas)
```

> **Termo explicado — GROUP BY:** agrupa linhas que compartilham um valor para aplicar funções de agregação (contar, somar, média) a cada grupo.

### 5. JOIN — combinando tabelas

O **`JOIN`** é o superpoder do relacional: combina linhas de **duas ou mais tabelas** com base num relacionamento (a chave estrangeira do [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]).

```sql
SELECT pedidos.id, clientes.nome, pedidos.total
FROM pedidos
JOIN clientes ON pedidos.cliente_id = clientes.id
WHERE pedidos.total > 50;
```

Isso lê: "para cada pedido, pegue o nome do cliente correspondente (ligando `pedidos.cliente_id` com `clientes.id`)". Tipos de JOIN:
- **`INNER JOIN`** (o padrão): só as linhas que têm correspondência nas duas tabelas.
- **`LEFT JOIN`:** todas as linhas da esquerda, mesmo sem correspondência (traz `NULL` onde falta) — ex.: "todos os clientes, com seus pedidos, **inclusive** os que nunca pediram".
- **`RIGHT JOIN`** / **`FULL JOIN`:** variações.

> **Termo explicado — JOIN:** operação que combina linhas de duas ou mais tabelas com base em uma condição de relacionamento (tipicamente FK = PK). INNER traz só correspondências; LEFT traz todas de um lado.

O JOIN é onde o iniciante mais tropeça e onde mora o poder do SQL — é ele que "remonta" os dados que separamos em tabelas ([[69-Modelagem-de-dados-e-normalizacao]]).

---

## ⚙️ Como funciona na prática

Como o SQL vive no seu trabalho de verdade:

**Onde o SQL roda.** Você digita SQL num **cliente** de banco (DBeaver, pgAdmin, o terminal `psql`) para explorar e testar. E, no código, o **Repository** ([[58-MVC-camadas-e-separacao-de-responsabilidades]]) envia SQL ao banco — direto ou através de um **ORM** ([[71-Confiabilidade-e-escala-do-banco]]) que gera o SQL para você. Mesmo usando ORM, **entender SQL é essencial** para depurar, otimizar e saber o que o ORM está fazendo por baixo.

**A ordem lógica de uma consulta.** Embora você escreva `SELECT` primeiro, o banco processa mais ou menos assim: `FROM` (de onde) → `JOIN` (combina) → `WHERE` (filtra linhas) → `GROUP BY` (agrupa) → `HAVING` (filtra grupos) → `SELECT` (escolhe colunas) → `ORDER BY` (ordena) → `LIMIT`. Entender essa ordem esclarece por que, por exemplo, você não pode usar no `WHERE` um apelido criado no `SELECT`.

**A performance importa (índices).** Uma consulta com `WHERE email = '...'` numa tabela de milhões de linhas pode ser lenta se o banco tiver que olhar linha por linha. Um **índice** ([[71-Confiabilidade-e-escala-do-banco]]) na coluna `email` faz o banco encontrar quase instantaneamente — como o índice remissivo de um livro. Saber **quando** uma consulta será lenta (e ler o `EXPLAIN` que mostra o plano de execução) é uma habilidade valorizada.

**Os dois grandes perigos:**
1. **`UPDATE`/`DELETE` sem `WHERE`:** apaga/altera a tabela inteira. Numa produção, é catástrofe. **Sempre** escreva o `WHERE` primeiro, teste com um `SELECT`, e só então troque para `UPDATE`/`DELETE`. Muitos times usam transações ([[71-Confiabilidade-e-escala-do-banco]]) para poder desfazer.
2. **SQL Injection:** o ataque mais clássico da web. Se você monta SQL **concatenando** a entrada do usuário (`"...WHERE nome = '" + input + "'"`), um usuário malicioso digita `'; DROP TABLE clientes; --` e **destrói** seu banco. A defesa: **queries parametrizadas** (o banco trata a entrada como **dado**, nunca como comando). **Nunca** concatene entrada do usuário em SQL — isso reaparece na segurança do Volume 4 e liga ao [[73-Autenticacao-e-autorizacao]].

**A relação com o resto.** O SQL "remonta" o que a modelagem ([[69-Modelagem-de-dados-e-normalizacao]]) separou: guardamos cliente e pedido em tabelas distintas (sem repetição), e o `JOIN` os junta de volta na hora da consulta. Separar para guardar, juntar para ler — esse é o ritmo do relacional.

---

## 🍔 Aplicação na SaborExpress

O SQL é a conversa diária do time da SaborExpress com seu banco. Veja consultas reais.

**Perguntas de negócio viram SELECT.** A Ana quer saber os 5 restaurantes que mais faturaram esta semana:
```sql
SELECT restaurantes.nome, SUM(pedidos.total) AS faturamento
FROM pedidos
JOIN restaurantes ON pedidos.restaurante_id = restaurantes.id
WHERE pedidos.criado_em >= '2026-07-08'
GROUP BY restaurantes.nome
ORDER BY faturamento DESC
LIMIT 5;
```
Um `JOIN` (pedidos + restaurantes), um `WHERE` (só desta semana), um `GROUP BY` (por restaurante), agregação (`SUM`) e ordenação. Uma pergunta de negócio inteira numa consulta.

**O CRUD do dia a dia.** Um cliente novo se cadastra → `INSERT INTO clientes...`. O restaurante muda um preço → `UPDATE produtos SET preco = 32.90 WHERE id = 88`. Um cliente exclui a conta → `DELETE FROM clientes WHERE id = 512`. Cada ação do app é, no fundo, uma operação SQL disparada pelo Repository.

**O susto do `WHERE` esquecido.** Numa madrugada, um dev foi corrigir o preço de **um** produto e digitou, cansado:
```sql
UPDATE produtos SET preco = 25.00;   -- ❌ FALTOU O WHERE!
```
Isso teria zerado a lógica de preços de **todos os produtos** de **todos os restaurantes**. Felizmente, ele estava dentro de uma **transação** ([[71-Confiabilidade-e-escala-do-banco]]) e, ao ver "1500 linhas afetadas" em vez de "1", deu `ROLLBACK` e desfez tudo. Depois disso, o time adotou a regra: **sempre rodar um `SELECT` com o `WHERE` primeiro**, conferir quantas linhas retornam, e só então trocar para `UPDATE`/`DELETE`.

**A defesa contra SQL Injection.** A tela de busca de restaurantes recebe o texto que o cliente digita. Um dev júnior ia montar a query concatenando: `"...WHERE nome LIKE '%" + textoBusca + "%'"`. No code review, a sênior barrou: um cliente malicioso digitando `%'; DROP TABLE restaurantes; --` poderia **apagar a tabela de restaurantes**. Trocaram por uma **query parametrizada** (o banco recebe o texto como **dado**, não como comando SQL), fechando a brecha. Foi uma lição que o time levou para todas as consultas: **nunca concatenar entrada do usuário em SQL**.

**O índice que salvou a performance.** A consulta de login (`SELECT ... WHERE email = ?`) ficou lenta quando a base passou de 100 mil clientes. Um **índice** na coluna `email` fez o tempo cair de segundos para milissegundos — o banco parou de varrer a tabela inteira e passou a "ir direto".

Moral: para a SaborExpress, o SQL é a linguagem que transforma perguntas de negócio em respostas e ações do app em mudanças no banco — poderosa, mas com perigos reais (o `WHERE` esquecido, o Injection) que o time aprendeu a respeitar com disciplina.

---

## 🏢 Como isso acontece em uma empresa

- **SQL é habilidade universal e duradoura.** Esperado de todo dev (back-end, dados, até muitos de front). Aparece em entrevistas técnicas constantemente. Diferente de frameworks, o SQL de 40 anos atrás ainda é válido.
- **ORMs geram SQL, mas você precisa entendê-lo.** A maioria dos times usa ORM ([[71-Confiabilidade-e-escala-do-banco]]) para o CRUD comum, mas cai para SQL puro em consultas complexas e para **otimização**. Entender o SQL que o ORM gera é o que separa quem depura de quem fica perdido.
- **Analistas e times de dados vivem de SQL.** BI, dashboards, relatórios — tudo SQL (muitas vezes o mesmo `SELECT`/`JOIN`/`GROUP BY`, em escala). É a lingua franca dos dados.
- **Queries parametrizadas são regra de segurança inegociável.** SQL Injection está no **OWASP Top 10** (Volume 4). Nenhum time sério permite concatenar entrada em SQL; ferramentas escaneiam o código atrás disso.
- **Performance de query é assunto sério.** `EXPLAIN`, índices, evitar `SELECT *` e N+1 queries. Uma consulta ruim pode derrubar um sistema em produção. DBAs e devs sêniores otimizam isso.
- **Acesso a produção é restrito.** Rodar `UPDATE`/`DELETE` no banco de produção é cercado de cuidados (revisão, transações, backups), justamente pelo perigo do `WHERE` esquecido.

---

## ⚠️ Erros comuns

- **`UPDATE`/`DELETE` sem `WHERE`.** O erro catastrófico: altera/apaga a tabela inteira. Sempre teste com `SELECT` primeiro e confira o `WHERE`.
- **SQL Injection (concatenar entrada do usuário).** Montar SQL grudando o que o usuário digitou abre a porta para ataques. **Sempre** use queries parametrizadas.
- **`SELECT *` em produção.** Trazer todas as colunas (inclusive as pesadas) desperdiça recursos e quebra quando o schema muda. Selecione só o que precisa.
- **Esquecer a condição do JOIN.** Um JOIN sem `ON` (ou com condição errada) gera um **produto cartesiano** — cada linha de uma tabela combinada com **todas** da outra (milhões de linhas absurdas).
- **Confundir `WHERE` e `HAVING`.** `WHERE` filtra linhas **antes** de agrupar; `HAVING` filtra **grupos depois** do `GROUP BY`. Trocar gera erro ou resultado errado.
- **Consultas sem índice em tabelas grandes.** Um `WHERE` numa coluna sem índice varre a tabela inteira — lento. Saber quando indexar é essencial.
- **Confiar cegamente no ORM.** ORMs facilitam, mas geram SQL ruim às vezes (o problema N+1). Sem entender SQL, você não percebe nem corrige.
- **Não usar transação em operações críticas.** Alterações importantes sem transação não podem ser desfeitas se algo der errado no meio.

---

## 💡 Dicas profissionais

- **Antes de `UPDATE`/`DELETE`, rode o `SELECT` com o mesmo `WHERE`.** Veja **quantas** e **quais** linhas seriam afetadas. Só então troque para a alteração. Este único hábito evita o erro mais catastrófico do SQL.
- **Sempre use queries parametrizadas.** Nunca concatene entrada do usuário. É regra de segurança, não preferência. Todo driver/ORM oferece parâmetros — use-os.
- **Selecione só as colunas que precisa.** Evite `SELECT *`. É mais rápido, mais claro e mais resistente a mudanças de schema.
- **Pratique JOINs até virarem naturais.** É onde o SQL mais assusta e mais importa. Comece com INNER JOIN de duas tabelas e evolua. Desenhe as tabelas no papel enquanto pensa a consulta.
- **Aprenda a ler o `EXPLAIN`.** Ele mostra como o banco vai executar a consulta e onde está a lentidão (varredura de tabela vs. uso de índice). É a ferramenta de otimização nº 1.
- **Entenda o SQL mesmo usando ORM.** O ORM te poupa do CRUD, mas você precisa saber o SQL para depurar, otimizar e pegar problemas como o N+1. SQL é a base; o ORM é a conveniência.
- **Envolva operações críticas em transações.** Assim, se algo der errado no meio, você pode dar `ROLLBACK` e desfazer — a rede de segurança do banco.

---

## 🎈 Curiosidades

- O **SQL** nasceu na IBM nos anos 1970 com o nome **SEQUEL** (Structured English Query Language), depois encurtado para SQL por questões de marca registrada. Por isso muita gente pronuncia "síquel" e outros soletram "és-quê-éle" — as duas formas são aceitas e geram debates eternos.
- O SQL é uma das linguagens mais **duradouras** da computação — praticamente inalterada em sua essência desde os anos 1970. Enquanto linguagens de programação nascem e morrem, aprender SQL é um investimento que **não deprecia**.
- O **SQL Injection** já foi (e ainda é) responsável por vazamentos gigantescos de dados no mundo real — de sites de governo a grandes empresas. O quadrinho **xkcd 327** ("Exploits of a Mom"), sobre uma criança chamada `Robert'); DROP TABLE Students;--` (apelidada "Little Bobby Tables"), é a piada mais famosa da computação sobre o tema.
- Apesar de "padrão", cada banco tem seu **dialeto** de SQL com pequenas diferenças (PostgreSQL, MySQL e SQL Server têm funções e sintaxes próprias). O núcleo (SELECT, JOIN, CRUD) é portável; os detalhes variam.
- O problema de performance mais comum causado por ORMs tem nome: **"N+1 query"** — quando, para listar N pedidos com seus clientes, o ORM faz 1 consulta para os pedidos e depois **N** consultas (uma por pedido) para os clientes, em vez de um único JOIN. Reconhecê-lo é um marco de senioridade.
- Existe um jogo online famoso, o **"SQL Murder Mystery"**, que ensina SQL fazendo você resolver um assassinato consultando um banco de dados fictício — prova de que dá até para se divertir com JOINs.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **SQL** | Linguagem declarativa para consultar e manipular bancos relacionais. |
| **Declarativo** | Você diz *o que* quer; o banco decide *como* obter. |
| **CRUD** | Create (INSERT), Read (SELECT), Update, Delete — as 4 operações básicas. |
| **SELECT** | Consulta/lê dados. |
| **WHERE** | Filtra quais linhas a operação afeta. |
| **ORDER BY / LIMIT** | Ordena / restringe a quantidade de linhas. |
| **GROUP BY** | Agrupa linhas para agregação (contar, somar, média). |
| **JOIN** | Combina linhas de tabelas relacionadas (INNER, LEFT...). |
| **Índice** | Estrutura que acelera consultas numa coluna (como um índice de livro). |
| **Query parametrizada** | Consulta que trata a entrada como dado, prevenindo SQL Injection. |
| **SQL Injection** | Ataque que injeta comandos SQL via entrada do usuário concatenada. |
| **EXPLAIN** | Mostra o plano de execução de uma consulta (para otimizar). |

---

## 📝 Resumo

- **SQL** é a linguagem padrão e **declarativa** dos bancos relacionais: você descreve **o que** quer, e o banco decide como buscar. É uma das habilidades mais duradouras e universais da área.
- O **CRUD** sustenta tudo: **`SELECT`** (ler), **`INSERT`** (criar), **`UPDATE`** (alterar), **`DELETE`** (apagar). Com `WHERE` (filtrar), `ORDER BY` (ordenar), `GROUP BY` + agregação (resumir).
- O **`JOIN`** combina tabelas relacionadas pelas chaves — remontando os dados que a modelagem separou. **INNER** traz só correspondências; **LEFT** traz todas de um lado.
- Dois **perigos** críticos: **`UPDATE`/`DELETE` sem `WHERE`** (altera a tabela inteira — sempre teste com `SELECT` antes) e **SQL Injection** (nunca concatene entrada do usuário — use queries parametrizadas).
- Na prática: o SQL roda via cliente ou pelo Repository/ORM; **índices** aceleram consultas grandes; entender SQL é essencial **mesmo usando ORM** (para depurar e otimizar). Selecione só as colunas necessárias e envolva operações críticas em **transações**.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é SQL e por que é declarativo.
- [ ] Escrevo as quatro operações CRUD com sintaxe correta.
- [ ] Filtro com `WHERE`, ordeno com `ORDER BY`, agrupo com `GROUP BY`.
- [ ] Escrevo um `JOIN` combinando duas tabelas pela chave.
- [ ] Sei o perigo do `UPDATE`/`DELETE` sem `WHERE` e como evitá-lo.
- [ ] Entendo SQL Injection e sei que a defesa é query parametrizada.

---

## ✏️ Exercícios

**1.** Escreva um `SELECT` que traga o nome e o e-mail dos clientes da tabela `clientes` cujo cadastro (`criado_em`) é a partir de `'2026-01-01'`, ordenados por nome.

**2.** Explique a diferença entre `UPDATE produtos SET preco = 20 WHERE id = 5;` e `UPDATE produtos SET preco = 20;`. Por que a segunda é perigosa?

**3.** Escreva uma consulta com `JOIN` que traga o `id` do pedido, o **nome do cliente** e o `total`, apenas para pedidos com total acima de 50. (Tabelas: `pedidos` com `cliente_id`, e `clientes` com `id` e `nome`.)

**4.** O que é **SQL Injection** e por que concatenar a entrada do usuário na query é perigoso? Qual é a defesa correta?

**5. (Reflexão)** Escreva uma consulta que responda à pergunta de negócio: "qual o faturamento total de cada restaurante?" (tabelas `pedidos` com `restaurante_id` e `total`, e `restaurantes` com `id` e `nome`). Explique cada cláusula que você usou.

---

## 💬 Respostas comentadas

**1.** 
```sql
SELECT nome, email
FROM clientes
WHERE criado_em >= '2026-01-01'
ORDER BY nome;
```
O `SELECT` escolhe as colunas `nome` e `email`; o `FROM` diz a tabela; o `WHERE` filtra só os cadastrados a partir de 1º de janeiro de 2026; o `ORDER BY nome` ordena alfabeticamente.

**2.** A primeira, **com `WHERE id = 5`**, altera o preço de **apenas** o produto de id 5 — uma única linha. A segunda, **sem `WHERE`**, altera o preço de **todos os produtos da tabela** para 20, porque sem filtro o `UPDATE` afeta **todas** as linhas. A segunda é perigosa (catastrófica em produção) porque destrói os preços de todo o catálogo de uma vez — um erro comum quando alguém esquece o `WHERE`. Por isso a boa prática é testar com `SELECT ... WHERE id = 5` antes, conferir que retorna só a linha certa, e só então executar o `UPDATE`.

**3.** 
```sql
SELECT pedidos.id, clientes.nome, pedidos.total
FROM pedidos
JOIN clientes ON pedidos.cliente_id = clientes.id
WHERE pedidos.total > 50;
```
O `JOIN ... ON pedidos.cliente_id = clientes.id` combina cada pedido com o cliente correspondente (ligando a FK à PK); o `SELECT` pega o id do pedido, o nome do cliente e o total; o `WHERE` mantém só os pedidos acima de 50.

**4.** **SQL Injection** é um ataque em que um usuário mal-intencionado insere **comandos SQL** através de um campo de entrada (como uma busca ou login). Concatenar a entrada na query é perigoso porque o texto do usuário vira **parte do comando**: se a query é `"...WHERE nome = '" + input + "'"` e o usuário digita `'; DROP TABLE clientes; --`, o banco executa o `DROP TABLE` e **apaga a tabela** (ou vaza dados, burla o login, etc.). A defesa correta é usar **queries parametrizadas** (prepared statements): a entrada é enviada ao banco como **dado**, num parâmetro separado, e **nunca** interpretada como comando SQL — não importa o que o usuário digite, é tratado como um valor literal.

**5.** 
```sql
SELECT restaurantes.nome, SUM(pedidos.total) AS faturamento
FROM pedidos
JOIN restaurantes ON pedidos.restaurante_id = restaurantes.id
GROUP BY restaurantes.nome
ORDER BY faturamento DESC;
```
Cláusulas: o `JOIN` combina cada pedido com seu restaurante (FK `restaurante_id` = PK `id`); o `GROUP BY restaurantes.nome` agrupa todos os pedidos de cada restaurante num grupo; o `SUM(pedidos.total)` soma os totais de cada grupo, produzindo o faturamento por restaurante (o `AS faturamento` dá um apelido à coluna calculada); o `SELECT` mostra o nome do restaurante e seu faturamento; e o `ORDER BY faturamento DESC` lista do que mais faturou para o que menos faturou. Cada restaurante aparece uma vez, com a soma de todos os seus pedidos.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] — as tabelas e chaves que o SQL consulta.
- **Próximo (linear):** [[69-Modelagem-de-dados-e-normalizacao]] — projetar as tabelas que o SQL vai consultar.
- **Aprofunda:** [[71-Confiabilidade-e-escala-do-banco]] — índices (performance), transações (ROLLBACK) e ORM (que gera SQL).
- **Segurança:** [[73-Autenticacao-e-autorizacao]] e Volume 4 (OWASP Top 10) — SQL Injection e defesa.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 20 → **Capítulo 68 de 119**.
