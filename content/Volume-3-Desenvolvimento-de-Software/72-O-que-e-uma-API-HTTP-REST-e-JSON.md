# Capítulo 72 — O que é uma API; HTTP, REST e JSON

> **Volume 3 — Desenvolvimento de Software** · Módulo 21 — APIs e Integração
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é uma **API** e por que ela é o "contrato" entre sistemas.
- Revisar o **HTTP** (métodos, status codes) no contexto de APIs.
- Compreender o estilo **REST** e seus princípios (recursos, verbos, sem estado).
- Ler e escrever **JSON**, o formato de dados que domina as APIs.
- Reconhecer uma boa API REST e os erros comuns de design.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[27-Como-a-internet-funciona]] e [[28-Protocolos-e-protecao]] (Vol. 2 — HTTP, portas).
- Ajuda ter lido [[58-MVC-camadas-e-separacao-de-responsabilidades]] (a API é a camada de entrada).

---

## 📖 Introdução

Como o app da SaborExpress no seu celular "conversa" com o servidor lá na nuvem? Como o site de uma loja consulta o sistema de pagamento do banco? Como o Google Maps aparece **dentro** de outro app? A resposta para todas essas perguntas é uma sigla que você vai ouvir mil vezes por dia na sua carreira: **API**. Se o banco de dados é a memória do sistema e a lógica de negócio é o cérebro, a **API é a boca e os ouvidos** — a forma como um sistema se comunica com o mundo exterior (outros sistemas, apps, front-ends).

Uma **API (Application Programming Interface)** é um **contrato**: um conjunto de regras que define **como** um sistema pode pedir dados ou ações de outro. Você não precisa saber **como** o sistema do banco processa um pagamento por dentro — só precisa saber **o que** pedir e **como** pedir (o contrato da API). É a mesma ideia de "abstração" que atravessa toda a computação: esconder a complexidade interna atrás de uma interface simples e estável. APIs são o que permite o mundo do software ser **montado** de peças que conversam ([[59-Monolito-vs-Microsservicos]], [[65-O-que-e-open-source-e-as-licencas]]).

O estilo dominante de API na web é o **REST**, que usa o **HTTP** (o protocolo da web — [[28-Protocolos-e-protecao]]) e troca dados em **JSON** (um formato de texto legível). Esse trio — **HTTP + REST + JSON** — é a espinha dorsal da comunicação entre front-end e back-end, entre microsserviços, e entre empresas. Dominá-lo é essencial: praticamente todo sistema web que você vai construir ou consumir fala essa língua. Este capítulo abre o módulo de APIs com esse fundamento; os próximos cobrem autenticação, alternativas ao REST e como documentar/testar.

---

## 🧠 Analogia

Pense em pedir comida num **restaurante** e no papel do **garçom** e do **cardápio**.

Você (o **cliente**, um sistema que quer algo) não entra na **cozinha** (o servidor/back-end, com toda sua complexidade) para preparar seu prato. Você interage por um **contrato bem definido**: o **cardápio** (a **documentação da API**) lista o que você pode pedir e como; o **garçom** (a **API**) leva seu pedido à cozinha e traz a resposta. Você faz um **pedido estruturado** ("uma pizza margherita, tamanho grande") e recebe uma **resposta** (a pizza, ou "acabou a margherita"). Você **não precisa saber** como a cozinha funciona por dentro — só o contrato do cardápio.

Os detalhes: o **método do pedido** é o que você quer fazer (pedir=GET informação, encomendar=POST criar, alterar=PUT, cancelar=DELETE) — os **verbos HTTP**. O **cardápio organizado por itens** (pizzas, bebidas, sobremesas) são os **recursos** do REST (`/pizzas`, `/bebidas`). A **resposta do garçom** vem com um "status": "aqui está" (sucesso), "não temos isso" (não encontrado), "você não tem permissão" — os **status codes**. E o pedido e a resposta são escritos numa **comanda padronizada** que a cozinha e o garçom entendem — o **JSON**.

Guarde: a API é o garçom que leva pedidos estruturados a uma cozinha cuja complexidade você não precisa conhecer, seguindo um cardápio (contrato) e devolvendo respostas com status — tudo escrito numa comanda padrão (JSON).

---

## 🧩 Conceitos fundamentais

### 1. O que é uma API

Uma **API (Interface de Programação de Aplicações)** é um conjunto de regras e definições que permite que um software **peça dados ou ações** a outro, sem conhecer seus detalhes internos. É um **contrato**: define quais operações estão disponíveis, o que enviar e o que esperar de volta.

> **Termo explicado — API:** um contrato que define como um sistema pode se comunicar com outro — quais operações existem, o que enviar e o que se recebe — escondendo a complexidade interna.

APIs existem em muitos níveis (a API de uma biblioteca de código, a API do sistema operacional), mas aqui focamos nas **APIs web** — as que sistemas acessam pela rede, tipicamente via HTTP.

### 2. HTTP no contexto de APIs

O **HTTP** ([[28-Protocolos-e-protecao]]) é o protocolo que carrega as requisições. Uma **requisição HTTP** tem:
- **Método (verbo):** o que você quer fazer.
- **URL/endpoint:** o endereço do recurso (`https://api.saborexpress.com/pedidos/42`).
- **Cabeçalhos (headers):** metadados (formato, autenticação).
- **Corpo (body):** os dados enviados (em POST/PUT), geralmente JSON.

Os **métodos HTTP** mapeiam ao CRUD ([[68-SQL-na-pratica]]):
- **GET** — ler/buscar (não altera nada). *"me dê os pedidos"*
- **POST** — criar. *"crie este pedido"*
- **PUT/PATCH** — atualizar (PUT substitui, PATCH altera parcialmente).
- **DELETE** — remover.

E a resposta traz um **status code** de três dígitos:
- **2xx (sucesso):** 200 OK, 201 Created.
- **3xx (redirecionamento).**
- **4xx (erro do cliente):** 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found.
- **5xx (erro do servidor):** 500 Internal Server Error.

> **Termo explicado — status code HTTP:** número de três dígitos que indica o resultado da requisição: 2xx sucesso, 4xx erro de quem pediu, 5xx erro do servidor.

### 3. REST — o estilo dominante

**REST (Representational State Transfer)** é um **estilo arquitetural** para APIs web, definido por Roy Fielding em 2000. Não é um protocolo nem uma tecnologia — é um conjunto de **princípios** que, quando seguidos, tornam a API previsível e escalável:

- **Recursos:** tudo é um **recurso** identificado por uma URL. Recursos são **substantivos** (`/pedidos`, `/clientes/42`), não verbos.
- **Verbos HTTP:** a ação vem do **método** (GET, POST...), não da URL. `GET /pedidos` (não `/getPedidos`).
- **Sem estado (stateless):** cada requisição é **independente** e carrega tudo que precisa; o servidor não guarda o "contexto" entre requisições. Isso facilita escalar ([[57-O-que-e-arquitetura-de-software]]).
- **Representações:** o recurso é transferido numa representação (quase sempre **JSON**).

> **Termo explicado — REST:** estilo de API web baseado em recursos (substantivos) identificados por URLs, manipulados com verbos HTTP, e comunicação sem estado (cada requisição é independente).

Exemplo de API REST bem desenhada:
```
GET    /pedidos          → lista pedidos
POST   /pedidos          → cria um pedido
GET    /pedidos/42       → busca o pedido 42
PUT    /pedidos/42       → atualiza o pedido 42
DELETE /pedidos/42       → remove o pedido 42
GET    /clientes/7/pedidos → pedidos do cliente 7
```

### 4. JSON — o formato dos dados

**JSON (JavaScript Object Notation)** é o formato de texto usado para trocar dados nas APIs. É legível por humanos e por máquinas, composto de **pares chave-valor** e listas:

```json
{
  "id": 42,
  "cliente": "Ana Costa",
  "total": 45.90,
  "itens": [
    { "produto": "Pizza Margherita", "quantidade": 1 },
    { "produto": "Refrigerante", "quantidade": 2 }
  ],
  "pago": true
}
```

> **Termo explicado — JSON:** formato de texto leve para troca de dados, baseado em pares chave-valor, objetos `{}` e listas `[]`. É o padrão das APIs web.

O JSON substituiu o antigo **XML** na maioria das APIs por ser mais leve e simples. Tipos: texto (`"..."`), número, booleano (`true`/`false`), `null`, objeto (`{}`) e array (`[]`).

### 5. O ciclo completo de uma chamada de API

```
FRONT-END (app)                          BACK-END (servidor)
     │                                          │
     │  POST /pedidos                           │
     │  Headers: Authorization: Bearer xyz      │
     │  Body: { "restaurante_id": 3, ... }      │
     │─────────────────────────────────────────►│  (Controller recebe →
     │                                          │   Service processa →
     │                                          │   Repository salva no banco)
     │  201 Created                             │
     │  Body: { "id": 42, "status": "criado" }  │
     │◄─────────────────────────────────────────│
     ▼                                          ▼
```

Repare: a API é a **camada de apresentação** do back-end ([[58-MVC-camadas-e-separacao-de-responsabilidades]]) — o Controller recebe a requisição HTTP e orquestra o resto.

---

## ⚙️ Como funciona na prática

Como as APIs vivem no desenvolvimento real:

**A API é o contrato entre front e back.** O front-end ([[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]]) e o back-end ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) são construídos por pessoas (às vezes times) diferentes. A **API é o combinado** entre eles: "quando você fizer `POST /pedidos` com esses dados, eu devolvo isso". Definir esse contrato **primeiro** (design-first) permite front e back trabalharem em **paralelo** — o front usa dados falsos (mock) enquanto o back é construído. Sem esse contrato, um trava esperando o outro.

**Boas práticas de design REST (que separam API boa de ruim):**
- **URLs com substantivos no plural:** `/pedidos`, não `/pegarPedido` nem `/pedidoNovo`. A ação vem do verbo HTTP.
- **Status codes corretos:** 201 ao criar, 404 se não achar, 400 se o dado é inválido, 401/403 para autenticação/permissão. Retornar 200 com "erro" no corpo é anti-padrão.
- **Hierarquia de recursos:** `/clientes/7/pedidos` para "pedidos do cliente 7".
- **Consistência:** nomes, formatos e padrões iguais em toda a API. Previsibilidade é qualidade.

**A API esconde a complexidade.** Quem chama `GET /restaurantes?cidade=Costa+Rica` não sabe (nem precisa) se por trás há um banco relacional, um cache Redis, ou um ElasticSearch ([[70-NoSQL-cache-e-busca]]). A API é a **fachada** estável; o back-end pode mudar por dentro sem quebrar quem consome — desde que o **contrato** se mantenha. Essa é a força da API: baixo acoplamento ([[57-O-que-e-arquitetura-de-software]]) entre quem pede e quem serve.

**Idempotência e segurança dos verbos.** Um detalhe importante: **GET** deve ser "seguro" (não alterar nada) e **idempotente** (chamar 10 vezes = chamar 1 vez). **PUT** e **DELETE** também idempotentes. **POST** não (criar duas vezes = dois recursos). Entender isso evita bugs — por exemplo, um GET **nunca** deve mudar dados no servidor.

**Onde a API se conecta ao resto.** A API é a porta de entrada: recebe a requisição, passa pelas **camadas** ([[58-MVC-camadas-e-separacao-de-responsabilidades]]), toca o **banco** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]), e devolve JSON. Ela precisa de **autenticação** ([[73-Autenticacao-e-autorizacao]]) para saber quem está pedindo, e deve ser **documentada e testada** ([[75-Documentar-e-testar-APIs]]). No Volume 5, a API da SaborExpress é construída inteira ([[80-Construindo-a-API-da-SaborExpress]]).

---

## 🍔 Aplicação na SaborExpress

A API REST da SaborExpress é a ponte entre o app (front-end) e o servidor (back-end) — e entre a SaborExpress e sistemas externos.

**Os endpoints do app.** Quando o cliente usa o app, cada ação vira uma chamada à API REST:
```
GET  /restaurantes?cidade=Costa+Rica   → lista restaurantes da cidade
GET  /restaurantes/3/produtos          → cardápio do restaurante 3
POST /pedidos                          → cria um pedido
     Body: { "restaurante_id": 3, "itens": [...], "cupom": "PRIMEIRA10" }
GET  /pedidos/42                        → acompanha o pedido 42
GET  /clientes/7/pedidos                → histórico do cliente 7
```
Repare: recursos são substantivos no plural, a ação vem do verbo HTTP, e a hierarquia (`/clientes/7/pedidos`) é clara e previsível.

**O contrato que destravou o trabalho paralelo.** No começo, o Diego (front) precisava do endpoint de pedidos que a Camila (back) ainda não tinha construído. Em vez de o Diego ficar **parado**, eles definiram o **contrato da API primeiro**: acordaram que `POST /pedidos` receberia `{restaurante_id, itens, cupom}` e devolveria `{id, status, total}`. Com esse contrato, o Diego construiu a tela usando um **mock** (dados falsos no formato combinado), enquanto a Camila construía o back-end de verdade. Quando o endpoint ficou pronto, a tela do Diego **já funcionava** — só trocou o mock pela API real. O contrato permitiu os dois trabalharem em paralelo.

**Os status codes que comunicam.** A API da SaborExpress usa status codes corretos: `201 Created` ao criar um pedido, `200 OK` ao listar, `404 Not Found` se o pedido não existe, `400 Bad Request` se faltam itens, `401 Unauthorized` se o cliente não está logado ([[73-Autenticacao-e-autorizacao]]), `403 Forbidden` se tenta acessar o pedido de outro cliente. O app **reage** a cada status: mostra a tela certa, pede login, ou exibe erro. Retornar sempre "200 com erro no corpo" (anti-padrão que um dev júnior tentou) tornaria impossível o app saber o que aconteceu.

**A fachada que escondeu a mudança.** Quando a SaborExpress trocou a busca do PostgreSQL (`LIKE`) para o ElasticSearch ([[70-NoSQL-cache-e-busca]]), o endpoint `GET /restaurantes?busca=pizza` **não mudou** para quem consome. O app continuou chamando a mesma URL, com o mesmo contrato — a mudança interna (novo motor de busca) ficou **escondida atrás da API**. Front e back permaneceram desacoplados: o back evoluiu por dentro sem quebrar o front.

**A integração externa.** A SaborExpress também **consome** APIs de terceiros: a API do gateway de pagamento (`POST /charges`), a API de mapas para rastrear o entregador. E **expõe** uma API para os restaurantes integrarem seus próprios sistemas. Tudo REST + JSON — a língua franca que faz sistemas de empresas diferentes conversarem.

Moral: a API REST da SaborExpress é o contrato que permite o app e o servidor (e sistemas externos) conversarem sem conhecer os detalhes internos uns dos outros. Ela destravou o trabalho paralelo, comunicou resultados via status codes, e escondeu mudanças internas atrás de uma fachada estável — baixo acoplamento na prática.

---

## 🏢 Como isso acontece em uma empresa

- **REST + JSON é o padrão dominante.** A esmagadora maioria das APIs web é REST com JSON. É o que você mais vai construir e consumir. Dominar isso é pré-requisito de back-end e muito útil no front.
- **API-first / design-first.** Times maduros definem o **contrato da API primeiro** (muitas vezes em OpenAPI/Swagger — [[75-Documentar-e-testar-APIs]]), permitindo front e back trabalharem em paralelo e ferramentas gerarem código/mocks.
- **APIs conectam tudo.** Front↔back, entre microsserviços ([[59-Monolito-vs-Microsservicos]]), entre empresas (pagamento, mapas, e-mail, IA). A "economia de APIs" é real — empresas inteiras (Stripe, Twilio) vendem só APIs.
- **Boas práticas são cobradas em review.** URLs RESTful, status codes corretos, versionamento ([[75-Documentar-e-testar-APIs]]), consistência. Uma API mal desenhada gera dor para todos que a consomem por anos.
- **Ferramentas do dia a dia:** **Postman** e **Insomnia** para testar APIs manualmente; **curl** no terminal; o **DevTools** do navegador (aba Network) para ver as chamadas reais. Você vai usar essas o tempo todo.
- **Status codes viram monitoramento.** Times monitoram a taxa de respostas 4xx/5xx em produção (Volume 4) — um pico de 500 sinaliza que algo quebrou. A API é uma janela para a saúde do sistema.

---

## ⚠️ Erros comuns

- **Verbos na URL (não-RESTful).** `/getPedidos`, `/criarPedido`, `/pedidoDelete`. A ação deve vir do **método HTTP**; a URL é um **substantivo** (recurso). `GET /pedidos`, `POST /pedidos`.
- **Status codes errados.** Retornar `200 OK` com uma mensagem de erro no corpo (em vez de 400/404/500) impede quem consome de saber o que aconteceu. Use o status correto.
- **GET que altera dados.** GET deve ser **seguro** (só ler). Um GET que cria ou apaga algo viola o HTTP e causa bugs sérios (um robô que "visita" links poderia apagar dados).
- **Inconsistência.** Misturar `camelCase` e `snake_case`, plural e singular, padrões diferentes por endpoint. Previsibilidade é qualidade; inconsistência é dor.
- **Expor detalhes internos.** Vazar mensagens de erro do banco, stack traces, ou estruturas internas na resposta. A API é uma **fachada** — mostre o contrato, não as tripas.
- **Não versionar a API.** Mudar o contrato quebra quem consome. APIs públicas precisam de versionamento ([[75-Documentar-e-testar-APIs]]).
- **Ignorar autenticação/autorização.** Uma API sem controle de acesso ([[73-Autenticacao-e-autorizacao]]) expõe dados de todos. Nunca confie que "só o nosso app chama".
- **JSON mal formado ou sem tratar erros.** Assumir que a resposta sempre vem certa. Redes falham, dados vêm nulos — trate erros e casos de borda.

---

## 💡 Dicas profissionais

- **Modele recursos como substantivos, ações como verbos HTTP.** `GET /pedidos/42`, não `/pegarPedido?id=42`. Essa única regra torna sua API previsível e RESTful.
- **Use os status codes corretos e com significado.** 201 ao criar, 404 ao não achar, 400 para entrada inválida, 401/403 para auth. Quem consome depende deles para reagir certo.
- **Defina o contrato da API antes de codar (design-first).** Combinar o formato de request/response cedo permite front e back trabalharem em paralelo com mocks — destrava o time.
- **Mantenha a API consistente e previsível.** Mesma convenção de nomes, formatos e padrões em todos os endpoints. Consistência é o que faz uma API "adivinhável" e agradável de usar.
- **Teste suas APIs com Postman/Insomnia e o DevTools.** Ver as requisições e respostas reais (URL, headers, body, status) é a melhor forma de entender e depurar. Use a aba Network do navegador.
- **Trate a API como fachada estável.** O back-end pode mudar por dentro (trocar banco, cache, busca), mas o contrato deve permanecer — para não quebrar quem consome. Baixo acoplamento é o objetivo.
- **Nunca exponha tripas internas nem confie na entrada.** Não vaze stack traces; valide tudo que chega; sempre autentique. A API é a porta de entrada — e a primeira linha de defesa.

---

## 🎈 Curiosidades

- O termo **REST** foi cunhado por **Roy Fielding** em sua **tese de doutorado** em 2000 — ele foi um dos autores do próprio protocolo HTTP. REST descreve os princípios que já faziam a web funcionar; Fielding os formalizou.
- Há um debate quase religioso sobre o que é "**RESTful de verdade**". Fielding definiu níveis (o "Modelo de Maturidade de Richardson", com HATEOAS no topo) que quase nenhuma API "REST" do mundo real segue completamente — a maioria é "REST-ish" (usa recursos, verbos e JSON, mas não HATEOAS). E está tudo bem.
- O **JSON** foi popularizado por **Douglas Crockford** nos anos 2000. Ele nasceu de um subconjunto da sintaxe de objetos do **JavaScript**, mas hoje é independente de linguagem — praticamente toda linguagem lê e escreve JSON. Curiosamente, Crockford dizia que "descobriu" o JSON, não o inventou, já que a sintaxe já existia.
- Antes do JSON, o padrão era o **XML** (com tags como HTML), usado no estilo de API **SOAP**. O JSON venceu por ser muito mais leve e simples — comparar `<total>45.90</total>` com `"total": 45.90` mostra por quê.
- Existe uma piada recorrente: *"nomear coisas e status codes HTTP são difíceis"* — em especial a confusão eterna entre **401 (Unauthorized**, que na verdade significa "não **autenticado**") e **403 (Forbidden**, "autenticado mas sem **permissão**"). O nome do 401 é historicamente enganoso.
- O **status code 418 "I'm a teapot"** ("Eu sou um bule de chá") existe de verdade na especificação HTTP — foi criado como uma piada de 1º de abril de 1998 (o "Hyper Text Coffee Pot Control Protocol") e sobrevive até hoje, implementado por diversão em muitos servidores.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **API** | Contrato que define como um sistema pede dados/ações a outro. |
| **Endpoint** | Uma URL específica da API que atende a um recurso/operação. |
| **Método HTTP (verbo)** | A ação: GET (ler), POST (criar), PUT/PATCH (atualizar), DELETE (remover). |
| **Status code** | Número que indica o resultado (2xx ok, 4xx erro do cliente, 5xx do servidor). |
| **REST** | Estilo de API baseado em recursos (substantivos), verbos HTTP e sem estado. |
| **Recurso** | Uma "coisa" identificada por URL (`/pedidos/42`). |
| **Stateless (sem estado)** | Cada requisição é independente; o servidor não guarda contexto entre elas. |
| **JSON** | Formato de texto para troca de dados (chave-valor, objetos, listas). |
| **Body / Headers** | O corpo (dados) e os metadados de uma requisição/resposta. |
| **Idempotente** | Chamar várias vezes tem o mesmo efeito de chamar uma vez (GET, PUT, DELETE). |
| **Design-first / API-first** | Definir o contrato da API antes de implementar. |

---

## 📝 Resumo

- Uma **API** é um **contrato** que define como um sistema pede dados ou ações a outro, escondendo a complexidade interna — a "boca e ouvidos" do sistema. É o que permite o software ser montado de peças que conversam.
- As **APIs web** usam **HTTP**: uma requisição tem **método** (GET/POST/PUT/DELETE, mapeando ao CRUD), **URL**, **headers** e **body**; a resposta traz um **status code** (2xx sucesso, 4xx erro do cliente, 5xx do servidor).
- **REST** é o estilo dominante: **recursos** identificados por URLs (substantivos), manipulados por **verbos HTTP**, com comunicação **sem estado** (cada requisição independente).
- **JSON** é o formato de dados padrão — leve, legível, baseado em pares chave-valor, objetos e listas —, que substituiu o XML.
- A API é a **fachada estável** entre front e back (e entre sistemas): permite trabalho paralelo via contrato, esconde mudanças internas, e mantém baixo acoplamento. Boas práticas — substantivos na URL, status codes corretos, consistência — separam uma API agradável de uma dolorosa.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é uma API e por que é um "contrato".
- [ ] Sei os métodos HTTP e como mapeiam ao CRUD.
- [ ] Interpreto os status codes (2xx, 4xx, 5xx) e os principais.
- [ ] Explico os princípios do REST (recursos, verbos, sem estado).
- [ ] Leio e escrevo JSON corretamente.
- [ ] Reconheço uma API RESTful bem desenhada e os erros comuns.

---

## ✏️ Exercícios

**1.** Com a analogia do restaurante, explique o que é a API, o cardápio, o garçom, e a "comanda padronizada".

**2.** Reescreva estes endpoints não-RESTful para o estilo REST correto: (a) `GET /getTodosPedidos`; (b) `POST /criarNovoCliente`; (c) `GET /deletarPedido?id=5`.

**3.** Qual status code você retornaria em cada caso: (a) um pedido foi criado com sucesso; (b) o cliente pediu um pedido que não existe; (c) faltou o campo obrigatório "itens" na requisição; (d) o servidor teve um erro inesperado.

**4.** Escreva um pequeno JSON representando um cliente com id, nome, e-mail, e uma lista de dois endereços (cada um com rua e cidade).

**5. (Reflexão)** Explique como o "contrato da API" permitiu o Diego (front) e a Camila (back) da SaborExpress trabalharem em paralelo, e como a API "escondeu" a troca do motor de busca sem quebrar o app.

---

## 💬 Respostas comentadas

**1.** A **API** é o **garçom**: ela leva o seu pedido estruturado à cozinha (o back-end) e traz a resposta, sem que você precise entrar na cozinha nem saber como ela funciona. O **cardápio** é a **documentação da API**: lista o que você pode pedir e como (os endpoints e formatos). A **comanda padronizada** é o **JSON**: o formato estruturado em que o pedido e a resposta são escritos, que tanto o garçom quanto a cozinha entendem. Você interage apenas pelo contrato (cardápio + garçom + comanda), abstraindo toda a complexidade interna da cozinha.

**2.** (a) `GET /pedidos` — GET já significa "ler/listar", e o recurso é o substantivo no plural. (b) `POST /clientes` — POST já significa "criar"; a URL é o recurso. (c) `DELETE /pedidos/5` — a ação de remover vem do método DELETE, e o id vai no caminho do recurso (não como parâmetro numa URL de GET, e jamais um GET que apaga dados).

**3.** (a) **201 Created** — recurso criado com sucesso. (b) **404 Not Found** — o recurso pedido não existe. (c) **400 Bad Request** — a requisição do cliente é inválida (faltou campo obrigatório). (d) **500 Internal Server Error** — erro inesperado no servidor.

**4.** 
```json
{
  "id": 7,
  "nome": "Ana Costa",
  "email": "ana@email.com",
  "enderecos": [
    { "rua": "Rua das Flores, 123", "cidade": "Costa Rica" },
    { "rua": "Av. Central, 456", "cidade": "Chapadão do Sul" }
  ]
}
```
O objeto tem pares chave-valor (id número, nome/email texto) e uma lista (`[]`) `enderecos` com dois objetos, cada um com rua e cidade.

**5.** O **contrato da API** é o acordo sobre o formato das requisições e respostas — no caso, que `POST /pedidos` receberia `{restaurante_id, itens, cupom}` e devolveria `{id, status, total}`. Ao definir isso **antes** de o back-end estar pronto, o Diego (front) pôde construir a tela usando um **mock** (dados falsos no formato acordado), enquanto a Camila (back) construía o endpoint de verdade — os dois trabalhando em **paralelo** em vez de o Diego ficar parado esperando. Quando o endpoint ficou pronto, a tela do Diego já funcionava: bastou trocar o mock pela API real, porque ambos seguiam o **mesmo contrato**. E a API "escondeu" a troca do motor de busca porque o **endpoint e seu contrato não mudaram**: o app continuou chamando `GET /restaurantes?busca=...` do mesmo jeito, recebendo o mesmo formato de resposta — a mudança interna (de `LIKE` no PostgreSQL para ElasticSearch) ficou **atrás da fachada da API**. Como o contrato foi mantido, o front nem percebeu a mudança, mantendo front e back **desacoplados**: o back pôde evoluir por dentro sem quebrar quem consome.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[73-Autenticacao-e-autorizacao]] — quem pode chamar a API e o que pode fazer.
- **Aprofunda/alternativas:** [[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]] e [[75-Documentar-e-testar-APIs]] (Swagger, Postman, versionamento).
- **Base:** [[28-Protocolos-e-protecao]] (Vol. 2 — HTTP) e [[58-MVC-camadas-e-separacao-de-responsabilidades]] (a API é a camada de entrada).
- **Aplicação:** [[80-Construindo-a-API-da-SaborExpress]] — a API construída de ponta a ponta; e [[78-Ligando-front-end-a-experiencia-do-usuario]] (o front que consome a API).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 21 → **Capítulo 72 de 119**.
