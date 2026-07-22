# 04 — SQL (referência rápida)

> Manual de Bolso · Volume 6. Entenda o porquê em [[68-SQL-na-pratica]], [[69-Modelagem-de-dados-e-normalizacao]], [[71-Confiabilidade-e-escala-do-banco]].

---

## Consultar (SELECT)

```sql
SELECT * FROM pedidos;                          -- tudo
SELECT id, total FROM pedidos;                  -- só algumas colunas
SELECT * FROM pedidos WHERE total > 50;         -- com filtro
SELECT * FROM pedidos WHERE status = 'pago' AND total > 50;
SELECT * FROM pedidos WHERE status IN ('pago','enviado');
SELECT * FROM pedidos WHERE criado_em BETWEEN '2026-01-01' AND '2026-12-31';
SELECT * FROM clientes WHERE nome LIKE 'Ana%';  -- começa com "Ana"
SELECT * FROM clientes WHERE email IS NULL;     -- valores nulos
SELECT DISTINCT status FROM pedidos;            -- valores únicos
SELECT * FROM pedidos ORDER BY criado_em DESC;  -- ordena (DESC = decrescente)
SELECT * FROM pedidos LIMIT 10;                 -- só 10 linhas
SELECT * FROM pedidos ORDER BY total DESC LIMIT 5;  -- top 5
```

| Operador | Uso |
|----------|-----|
| `=` `<>` `!=` `<` `>` `<=` `>=` | Comparações. |
| `AND` `OR` `NOT` | Lógicos. |
| `IN (...)` | Está numa lista. |
| `BETWEEN a AND b` | Está no intervalo. |
| `LIKE 'x%'` / `LIKE '%x%'` | Padrão de texto (`%` = qualquer coisa). |
| `IS NULL` / `IS NOT NULL` | Testa nulo (nunca use `= NULL`). |

---

## Inserir, atualizar, apagar

```sql
INSERT INTO clientes (nome, email) VALUES ('Ana', 'ana@x.com');
INSERT INTO clientes (nome, email) VALUES ('Ana','a@x.com'), ('Bruno','b@x.com');  -- várias

UPDATE pedidos SET status = 'enviado' WHERE id = 1234;   -- ⚠️ SEM WHERE atualiza TUDO!

DELETE FROM pedidos WHERE id = 1234;                     -- ⚠️ SEM WHERE apaga TUDO!
```

> ⚠️⚠️ **A regra de ouro:** `UPDATE` e `DELETE` **sempre** com `WHERE`. Antes de rodar, faça um `SELECT` com o mesmo `WHERE` para ver **o que** será afetado. Em produção, cheque duas vezes.

💡 Rode dentro de uma **transação** para poder desfazer:
```sql
BEGIN;
UPDATE pedidos SET status = 'cancelado' WHERE cliente_id = 88;
-- confira o resultado; se estiver certo: COMMIT;  se errado: ROLLBACK;
COMMIT;
```

---

## JOINs (juntar tabelas)

```sql
-- pedidos com o nome do cliente:
SELECT p.id, p.total, c.nome
FROM pedidos p
JOIN clientes c ON c.id = p.cliente_id;
```

| JOIN | Traz |
|------|------|
| `INNER JOIN` (ou só `JOIN`) | Só as linhas com correspondência nas duas tabelas. |
| `LEFT JOIN` | Todas da esquerda + as que casam da direita (resto = NULL). |
| `RIGHT JOIN` | Todas da direita + as que casam da esquerda. |
| `FULL JOIN` | Todas de ambas. |

💡 `LEFT JOIN ... WHERE direita.id IS NULL` = "os da esquerda **sem** correspondência".

---

## Agregações (contar, somar, agrupar)

```sql
SELECT COUNT(*) FROM pedidos;                    -- quantas linhas
SELECT SUM(total) FROM pedidos;                  -- soma
SELECT AVG(total), MIN(total), MAX(total) FROM pedidos;

-- agrupar: total de pedidos por cliente
SELECT cliente_id, COUNT(*) AS qtd, SUM(total) AS soma
FROM pedidos
GROUP BY cliente_id
HAVING COUNT(*) > 3          -- filtra grupos (HAVING é o WHERE dos grupos)
ORDER BY soma DESC;
```

| Função | O que faz |
|--------|-----------|
| `COUNT(*)` / `COUNT(col)` | Conta linhas / não-nulas. |
| `SUM` `AVG` `MIN` `MAX` | Soma, média, mínimo, máximo. |
| `GROUP BY` | Agrupa linhas para agregar. |
| `HAVING` | Filtra **depois** de agregar (`WHERE` filtra antes). |

⚠️ **Ordem de execução mental:** `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT`.

---

## Padrões úteis

```sql
-- paginação (página 2, 10 por página)
SELECT * FROM pedidos ORDER BY id LIMIT 10 OFFSET 10;

-- valor padrão quando nulo
SELECT nome, COALESCE(telefone, 'sem telefone') FROM clientes;

-- condicional
SELECT id, CASE WHEN total > 100 THEN 'grande' ELSE 'pequeno' END AS tipo FROM pedidos;

-- subquery
SELECT * FROM clientes WHERE id IN (SELECT cliente_id FROM pedidos WHERE total > 500);

-- contar por status
SELECT status, COUNT(*) FROM pedidos GROUP BY status;
```

---

## DDL: criar/alterar estrutura

```sql
CREATE TABLE clientes (
  id         SERIAL PRIMARY KEY,          -- auto-incremento (Postgres)
  nome       VARCHAR(120) NOT NULL,
  email      VARCHAR(160) UNIQUE,
  criado_em  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedidos (
  id          SERIAL PRIMARY KEY,
  cliente_id  INTEGER NOT NULL REFERENCES clientes(id),  -- chave estrangeira
  total       NUMERIC(10,2) NOT NULL,
  status      VARCHAR(20) DEFAULT 'novo'
);

ALTER TABLE clientes ADD COLUMN telefone VARCHAR(20);
CREATE INDEX idx_pedidos_cliente ON pedidos(cliente_id);   -- acelera buscas por cliente
DROP TABLE clientes;        -- ⚠️ apaga a tabela inteira
```

💡 **Índice** acelera leituras de colunas muito filtradas (chaves estrangeiras, campos de busca), ao custo de escritas um pouco mais lentas. Ver [[71-Confiabilidade-e-escala-do-banco]].

---

## Armadilhas comuns

| Erro | Correto |
|------|---------|
| `WHERE email = NULL` | `WHERE email IS NULL` |
| `UPDATE/DELETE` sem `WHERE` | ⚠️ Sempre com `WHERE`; teste com `SELECT` antes. |
| Concatenar input do usuário na query | **SQL Injection!** Use **queries parametrizadas** ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]). |
| Problema **N+1** (1 query + N no loop) | Use `JOIN` ou carregamento em lote ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]). |
| `SELECT *` em produção | Selecione só as colunas que precisa. |

> ⚠️ **SQL Injection** — nunca faça `"... WHERE nome = '" + input + "'"`. Use parâmetros: `WHERE nome = $1` (ou `?`), passando o valor separado. O banco trata o input como **dado**, nunca como comando.

---

## Comandos do cliente (psql / mysql)

| psql (Postgres) | O que faz |
|-----------------|-----------|
| `\l` | Lista os bancos. |
| `\c <banco>` | Conecta a um banco. |
| `\dt` | Lista as tabelas. |
| `\d <tabela>` | Descreve uma tabela (colunas, índices). |
| `\q` | Sai. |

---

> 🧭 Manual de Bolso → **SQL**. Anterior: [[03-Docker]] · Próxima: [[05-HTTP-APIs-e-REST]].
