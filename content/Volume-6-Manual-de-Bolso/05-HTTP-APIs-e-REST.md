---
title: '05 - HTTP, APIs e REST (referência rápida)'
---

# 05 — HTTP, APIs e REST (referência rápida)

> Manual de Bolso · Volume 6. Entenda o porquê em [[72-O-que-e-uma-API-HTTP-REST-e-JSON]], [[73-Autenticacao-e-autorizacao]].

---

## Métodos HTTP (verbos)

| Método | Uso | Idempotente? |
|--------|-----|--------------|
| `GET` | **Ler** um recurso (nunca deve alterar nada). | Sim |
| `POST` | **Criar** um recurso. | Não |
| `PUT` | **Substituir** um recurso inteiro. | Sim |
| `PATCH` | **Atualizar** parte de um recurso. | Não (geralmente) |
| `DELETE` | **Apagar** um recurso. | Sim |

💡 **Idempotente** = repetir a mesma requisição dá o mesmo resultado (importante para retentativas). `GET`, `PUT`, `DELETE` são; `POST` não (postar 2x cria 2 recursos).

**Padrão REST de rotas:**
```
GET    /pedidos          → lista pedidos
POST   /pedidos          → cria um pedido
GET    /pedidos/1234     → detalhe do pedido 1234
PATCH  /pedidos/1234     → atualiza o pedido 1234
DELETE /pedidos/1234     → apaga o pedido 1234
GET    /pedidos/1234/itens → itens do pedido 1234
```

---

## Status codes (decore os principais)

### 2xx — Sucesso
| Código | Significa |
|--------|-----------|
| `200 OK` | Deu certo (GET/PATCH/DELETE). |
| `201 Created` | Recurso criado (POST). |
| `204 No Content` | Deu certo, sem corpo na resposta (DELETE). |

### 3xx — Redirecionamento
| Código | Significa |
|--------|-----------|
| `301 Moved Permanently` | Mudou de endereço para sempre. |
| `304 Not Modified` | Use o cache (não mudou). |

### 4xx — Erro do CLIENTE (quem chamou errou)
| Código | Significa |
|--------|-----------|
| `400 Bad Request` | Requisição malformada (dados inválidos). |
| `401 Unauthorized` | **Não autenticado** (não sei quem você é — faça login). |
| `403 Forbidden` | **Autenticado, mas sem permissão** (sei quem você é, mas não pode). |
| `404 Not Found` | Recurso não existe. |
| `409 Conflict` | Conflito (ex.: item indisponível, e-mail já existe). |
| `422 Unprocessable Entity` | Sintaxe ok, mas semântica inválida (validação). |
| `429 Too Many Requests` | Rate limit — você fez requisições demais. |

### 5xx — Erro do SERVIDOR (o back quebrou)
| Código | Significa |
|--------|-----------|
| `500 Internal Server Error` | Erro genérico no servidor (um bug). |
| `502 Bad Gateway` | Um serviço a montante respondeu errado. |
| `503 Service Unavailable` | Serviço fora do ar / sobrecarregado. |
| `504 Gateway Timeout` | Um serviço a montante demorou demais. |

💡 **A regra mental:** `4xx` = **você** (cliente) errou; `5xx` = **o servidor** errou. Nunca responda `200` para um erro.

💡 **401 vs 403:** 401 = "não sei quem você é" (autenticação); 403 = "sei quem você é, mas você **não pode**" (autorização). Ver [[73-Autenticacao-e-autorizacao]].

---

## Anatomia de uma requisição/resposta

```
REQUISIÇÃO                          RESPOSTA
POST /pedidos HTTP/1.1              HTTP/1.1 201 Created
Host: api.saborexpress.com         Content-Type: application/json
Content-Type: application/json
Authorization: Bearer <token>      {
                                     "id": 1234,
{                                    "total": 47,
  "itens": [...],                    "status": "recebido"
  "enderecoId": 88                 }
}
─────────                          ──────────
método + rota + headers + corpo    status + headers + corpo
```

---

## Headers comuns

| Header | Uso |
|--------|-----|
| `Content-Type: application/json` | O formato do corpo. |
| `Authorization: Bearer <token>` | O token de autenticação (JWT). |
| `Accept: application/json` | O formato que você quer receber. |
| `Cache-Control` | Controla o cache. |
| `X-Request-Id` | ID para rastrear a requisição nos logs/traces ([[89-Logs-metricas-e-tracing]]). |

---

## Autenticação (o essencial)

| Termo | O que é |
|-------|---------|
| **Autenticação** | Provar **quem** você é (login → recebe um token). |
| **Autorização** | O que você **pode** fazer (checado a cada requisição). |
| **Token / JWT** | Credencial que vai no header `Authorization: Bearer`. |
| **OAuth** | Protocolo de "login com Google/GitHub" (delegação de acesso). |
| **API Key** | Chave simples para identificar uma aplicação. |

> ⚠️ O back **nunca confia no front**: revalida token e permissões, e **recalcula** valores (preço, total) a cada requisição. Ver [[73-Autenticacao-e-autorizacao]], [[80-Construindo-a-API-da-SaborExpress]].

---

## `curl` (testar API no terminal)

```bash
# GET simples
curl https://api.exemplo.com/pedidos

# GET com header de auth e formatado
curl -H "Authorization: Bearer TOKEN" https://api.exemplo.com/pedidos | jq

# só os headers da resposta
curl -I https://api.exemplo.com/pedidos

# POST com JSON
curl -X POST https://api.exemplo.com/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"itens":[1,2],"enderecoId":88}'

# ver detalhes da requisição (debug)
curl -v https://api.exemplo.com/pedidos

# seguir redirecionamentos, mostrar o código de status
curl -L -w "\n%{http_code}\n" https://api.exemplo.com/pedidos
```

| Flag | O que faz |
|------|-----------|
| `-X <MÉTODO>` | Define o método (GET é o padrão). |
| `-H "<header>"` | Adiciona um header. |
| `-d '<dados>'` | Corpo da requisição (implica POST). |
| `-I` | Só os headers da resposta. |
| `-v` | Verboso (mostra tudo — bom para debug). |
| `-L` | Segue redirecionamentos. |
| `\| jq` | Formata a saída JSON (se o `jq` estiver instalado). |

---

## Além de REST (quando você ouvir)

| Termo | Em uma linha |
|-------|--------------|
| **REST** | O padrão mais comum: recursos + verbos HTTP + JSON. |
| **GraphQL** | O cliente pede **exatamente** os campos que quer, numa única rota. |
| **gRPC** | Comunicação rápida entre serviços (binário, contratos fortes). |
| **WebSocket** | Conexão **bidirecional persistente** (tempo real: chat, notificações). |
| **Webhook** | O servidor **te avisa** quando algo acontece (callback HTTP). |
| **OpenAPI / Swagger** | Documentação padronizada da API. |

Ver [[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]] e [[75-Documentar-e-testar-APIs]].

---

## JSON (o formato de troca)

```json
{
  "id": 1234,
  "total": 47.0,
  "pago": true,
  "cliente": { "nome": "Ana" },
  "itens": [ {"prato": "Pizza", "qtd": 1} ],
  "cupom": null
}
```
Tipos: string (`"texto"`), número (`47`), booleano (`true`/`false`), objeto (`{}`), array (`[]`), nulo (`null`). **Sem** vírgula no último item; chaves sempre entre aspas duplas.

---

> 🧭 Manual de Bolso → **HTTP, APIs e REST**. Anterior: [[04-SQL]] · Próxima: [[06-Glossario-tecnico-rapido]].
