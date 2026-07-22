# Capítulo 75 — Documentar e testar APIs

> **Volume 3 — Desenvolvimento de Software** · Módulo 21 — APIs e Integração
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender por que documentar uma API é tão importante quanto construí-la.
- Conhecer **OpenAPI/Swagger** — o padrão de documentação de APIs.
- Usar ferramentas para **testar APIs** manualmente (**Postman**, **Insomnia**, curl).
- Compreender o **versionamento** de APIs e por que quebrar o contrato é perigoso.
- Entender os tipos de teste de API (contrato, integração) e o papel deles.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (2,5/5).**

---

## ✅ Pré-requisitos

- Ter lido [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] — a API que vamos documentar e testar.
- Ajuda ter lido [[38-Como-ler-documentacao]] (Vol. 2) — do outro lado, você lê docs de API.

---

## 📖 Introdução

Você construiu uma API. Mas uma API que ninguém sabe usar é como um telefone sem lista de contatos — existe, mas é inútil para quem está do outro lado. Como o desenvolvedor do front-end (ou de outra empresa) descobre **quais endpoints existem**, **o que enviar**, **o que recebe de volta**, **quais erros podem acontecer**? A resposta é a **documentação da API** — e ela é tão essencial que uma API sem documentação boa é, na prática, uma API pela metade. No [[38-Como-ler-documentacao]] você aprendeu a **ler** documentação de API; agora aprende a **produzir** a sua.

Junto com documentar vem **testar**. Uma API é um **contrato** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]), e contratos precisam ser verificados: ela realmente faz o que promete? Retorna os status codes certos? Trata os erros? E, criticamente: quando você **muda** a API, você não pode **quebrar** quem já depende dela — mudar o contrato sem cuidado é um dos erros mais dolorosos, porque afeta todos os sistemas que consomem sua API. Por isso existe o **versionamento**.

Este capítulo fecha o módulo de APIs com o que transforma uma API de "funciona na minha máquina" em uma API **profissional**: documentação padronizada (**OpenAPI/Swagger**), ferramentas de teste (**Postman**, **Insomnia**), versionamento consciente, e a ideia de testes de contrato. São as práticas que fazem sua API ser **usável, confiável e evoluível** — e que separam quem "faz um endpoint" de quem entrega uma API que outros times conseguem consumir sem sofrimento.

---

## 🧠 Analogia

Pense num **produto eletrônico e seu manual**.

Você compra um aparelho novo. Junto vem o **manual do usuário**: o que cada botão faz, como ligar, quais as tomadas, o que fazer quando a luz vermelha pisca (os erros). Sem o manual, você fica apertando botões no escuro, adivinhando. A **documentação da API** é esse manual: diz quais "botões" (endpoints) existem, o que cada um faz, o que enviar e o que esperar, e o que significam os erros. Uma API sem doc é um aparelho sem manual — funciona, mas ninguém sabe usar direito.

O **teste** é o **controle de qualidade da fábrica**: antes de o aparelho sair, alguém liga, aperta cada botão, confirma que faz o que o manual promete, e testa o que acontece quando você usa errado. Testar a API é isso — verificar que ela cumpre o contrato do "manual".

E o **versionamento** é como quando o fabricante lança um **modelo novo**: se ele mudar a voltagem ou o formato da tomada sem avisar, ele **queima** os aparelhos de todo mundo que já tinha o antigo. Por isso, mudanças que quebram compatibilidade viram um **modelo novo** (versão 2), e o antigo continua funcionando por um tempo — ninguém fica na mão. Guarde: doc = manual do usuário; teste = controle de qualidade; versionamento = lançar modelo novo sem queimar os aparelhos antigos.

---

## 🧩 Conceitos fundamentais

### 1. Por que documentar é essencial

A documentação da API é o que permite **outros** (o front-end, outro time, outra empresa, o seu eu do futuro) usá-la **sem** precisar ler o código-fonte ou perguntar ao autor. Ela deve dizer, para cada endpoint: o que faz, o método e a URL, os parâmetros e o corpo esperado, o formato da resposta, os possíveis erros/status codes, e a autenticação necessária. Uma API bem documentada é **autoexplicativa**; uma mal documentada gera perguntas infinitas e uso errado.

> **Termo explicado — documentação de API:** o "manual" que descreve os endpoints, o que enviar, o que se recebe e os erros — permitindo usar a API sem ler o código.

### 2. OpenAPI / Swagger — o padrão

O **OpenAPI** (antigo **Swagger**) é o **padrão** para descrever APIs REST num formato estruturado (um arquivo YAML/JSON). A partir dele, ferramentas geram automaticamente:
- Uma **documentação interativa** (o **Swagger UI**), onde qualquer um vê os endpoints e **testa** direto no navegador.
- **Código** de cliente e servidor (stubs).
- **Mocks** para o front trabalhar antes do back existir.

> **Termo explicado — OpenAPI / Swagger:** especificação padrão para descrever APIs REST num arquivo estruturado, a partir do qual se gera documentação interativa, código e mocks automaticamente.

O grande valor: a documentação vira **"viva"** e **executável**, não um documento de texto que desatualiza. E casa com o **design-first** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]): você escreve o OpenAPI **primeiro** (o contrato), e front e back trabalham em paralelo a partir dele.

### 3. Ferramentas de teste manual: Postman e Insomnia

Para **testar** uma API na mão (durante o desenvolvimento, para explorar ou depurar), usam-se clientes de API:
- **Postman** e **Insomnia:** aplicativos onde você monta requisições (método, URL, headers, body), envia, e vê a resposta (status, corpo). Salvam coleções de requisições, gerenciam autenticação, e permitem criar fluxos de teste.
- **curl:** a mesma coisa pelo terminal (`curl -X POST ...`).
- A **aba Network do DevTools** do navegador: para ver as chamadas reais que o front faz.

> **Termo explicado — Postman / Insomnia:** aplicativos para montar e enviar requisições a uma API manualmente, inspecionar as respostas, e organizar/testar coleções de chamadas.

Essas ferramentas são o "banco de trabalho" diário de quem constrói e consome APIs.

### 4. Versionamento de APIs

Quando você **muda** uma API, precisa ter cuidado com quem já a usa. Mudanças **compatíveis** (adicionar um campo novo, um endpoint novo) não quebram ninguém. Mudanças **incompatíveis** (*breaking changes* — remover um campo, mudar o formato, renomear) **quebram** quem consome — e por isso exigem uma **nova versão**.

> **Termo explicado — versionamento de API:** manter versões distintas da API (ex.: `/v1/`, `/v2/`) para introduzir mudanças incompatíveis sem quebrar quem ainda usa a versão anterior.

Formas comuns: na **URL** (`/v1/pedidos`, `/v2/pedidos`) — a mais visível; ou em **header**. A versão antiga continua funcionando (por um tempo, com *deprecation* anunciado) enquanto os consumidores migram. Isso ecoa o **SemVer** do [[66-Contribuindo-com-projetos-abertos]]: mudança incompatível = versão maior.

### 5. Testes de API: contrato e integração

Além do teste manual, APIs têm testes **automatizados** ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]):
- **Teste de contrato:** verifica que a API **cumpre o contrato** documentado (os campos, tipos e status codes prometidos). Protege contra "quebrar quem consome" sem perceber.
- **Teste de integração:** verifica o endpoint **de ponta a ponta** — a requisição passa pelas camadas, toca o banco, e a resposta está correta. Testa a API "de verdade".

Esses testes rodam no **CI** ([[64-Pull-Requests-code-review-e-issues]]), pegando regressões antes do deploy.

---

## ⚙️ Como funciona na prática

Como documentação e teste vivem no ciclo de uma API:

**Design-first com OpenAPI.** Times maduros escrevem a especificação **OpenAPI primeiro** — o contrato antes do código. Isso: (1) gera a documentação interativa automaticamente; (2) permite front e back trabalharem em paralelo (o front usa o mock gerado); (3) serve de "fonte da verdade" do contrato. A doc não é um extra escrito no fim; é o **ponto de partida**.

**Documentação que se mantém viva.** O maior problema de documentação é ela **desatualizar** ([[38-Como-ler-documentacao]]). A solução moderna: gerar a doc **a partir do código** (anotações no código geram o OpenAPI) ou **do OpenAPI gerar o código** — de qualquer forma, uma única fonte da verdade, para doc e código não divergirem. Uma doc que mente é pior que nenhuma.

**Teste manual durante o desenvolvimento.** Enquanto constrói, você testa cada endpoint no **Postman/Insomnia**: manda a requisição, confere o status e o corpo, testa os casos de erro (e se faltar um campo? e se o id não existir?). É como você **valida** que a API faz o que deveria antes de entregar.

**Versionar com responsabilidade.** Antes de mudar uma API que outros usam, pergunte: **isso quebra alguém?** Adicionar um campo opcional → seguro. Remover ou renomear um campo, mudar um tipo → **breaking change**, precisa de nova versão (`/v2/`) mantendo a `/v1/` por um tempo. Quebrar o contrato sem versionar é um dos erros que mais geram incidentes e raiva de quem consome.

**Testes automatizados no CI.** Testes de contrato e integração rodam a cada PR, garantindo que uma mudança não quebrou o contrato nem os endpoints. É a rede de segurança que permite evoluir a API com confiança.

**A ligação com o resto.** Documentar e testar API é o que torna o **contrato** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) confiável e usável. Liga ao design-first (front/back em paralelo), aos testes ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]), ao CI ([[64-Pull-Requests-code-review-e-issues]]), e à experiência de quem **consome** sua API — que pode ser outro time, um cliente, ou você mesmo daqui a seis meses. Uma API bem documentada e testada é um sinal de profissionalismo que se nota imediatamente.

---

## 🍔 Aplicação na SaborExpress

A API da SaborExpress é documentada com **OpenAPI/Swagger** e testada em várias camadas — e isso já salvou o time de vários problemas.

**A doc interativa (Swagger UI).** A API tem uma especificação **OpenAPI** que gera um **Swagger UI**: uma página onde qualquer dev (do time ou dos restaurantes parceiros que integram) vê **todos** os endpoints, o que enviar, o que recebe, e pode **testar direto no navegador**. Quando um novo dev entra, ele lê o Swagger e entende a API **sozinho**, sem precisar decifrar o código nem interromper os colegas. E os restaurantes parceiros integram seus sistemas usando essa doc, sem ligar para o suporte.

**Design-first destravando o paralelo.** Lembra do Diego (front) e da Camila (back) trabalhando em paralelo ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]])? O que tornou isso possível foi escreverem o **contrato OpenAPI primeiro**: com a spec do `POST /pedidos` definida, o Swagger gerou um **mock**, e o Diego construiu a tela contra ele enquanto a Camila construía o back. A documentação foi o ponto de partida, não uma tarefa do fim.

**Postman no dia a dia.** A Camila mantém uma **coleção no Postman** com todas as requisições da API (com autenticação configurada). Ao desenvolver um endpoint novo, ela o testa ali: manda o `POST /pedidos`, confere o `201` e o corpo, testa os erros (`400` sem itens, `401` sem token, `403` para pedido de outro cliente — [[73-Autenticacao-e-autorizacao]]). Valida tudo antes de abrir o PR.

**O versionamento que evitou um desastre.** A SaborExpress precisou mudar o formato do endpoint de pedidos (o campo `total` passaria a vir dividido em `subtotal`, `frete` e `desconto`). Isso era um **breaking change** — quebraria o app antigo dos clientes que ainda não tinham atualizado **e** os sistemas dos restaurantes parceiros que consumiam a API. Em vez de mudar a `/v1/` (e quebrar todo mundo de uma vez), criaram a **`/v2/pedidos`** com o novo formato, mantendo a **`/v1/`** funcionando. Anunciaram a **descontinuação** (deprecation) da v1 com prazo, e os consumidores migraram no seu tempo. Ninguém ficou na mão. Se tivessem simplesmente alterado a v1, teriam quebrado apps de milhares de usuários e a integração dos parceiros da noite para o dia.

**Testes de contrato no CI.** A API tem **testes de contrato e integração** que rodam a cada PR no CI ([[64-Pull-Requests-code-review-e-issues]]). Uma vez, um dev alterou sem querer o formato de resposta do `GET /pedidos/:id` (removeu um campo que o app usava). O **teste de contrato falhou** no CI, bloqueando o merge — pegando a quebra **antes** de chegar em produção e derrubar o app.

Moral: a documentação OpenAPI tornou a API da SaborExpress usável por qualquer um (novos devs, parceiros) sem intervenção; o Postman validou os endpoints no desenvolvimento; o versionamento (`/v2/`) permitiu evoluir sem quebrar quem consome; e os testes de contrato pegaram regressões antes da produção. É o que transforma uma API "que funciona" numa API **profissional**.

---

## 🏢 Como isso acontece em uma empresa

- **OpenAPI/Swagger é o padrão de facto.** A maioria das empresas documenta APIs REST com OpenAPI, gerando Swagger UI. Saber ler e escrever OpenAPI é habilidade valorizada de back-end.
- **Design-first é tendência crescente.** Escrever o contrato OpenAPI antes de codar (permitindo paralelo e geração de mocks/código) é prática de times maduros. Ferramentas como Stoplight e SwaggerHub apoiam isso.
- **Postman é onipresente.** É a ferramenta padrão para testar e explorar APIs. Coleções compartilhadas do Postman viram parte da documentação viva do time.
- **Portais de API para o mundo.** Empresas cuja API é o produto (Stripe, Twilio, GitHub) investem pesado em documentação — é o que faz desenvolvedores adotarem (ou abandonarem) a API. Doc ruim afasta clientes.
- **Versionamento é levado a sério em APIs públicas.** Quebrar o contrato de uma API pública é incidente grave. Empresas mantêm versões antigas, anunciam deprecations com meses de antecedência, e têm políticas claras. Internamente há mais flexibilidade, mas o cuidado permanece.
- **Testes de contrato no CI.** Ferramentas (Pact, testes de schema) verificam que a API cumpre o contrato, evitando que uma mudança quebre consumidores. Especialmente crítico em microsserviços ([[59-Monolito-vs-Microsservicos]]), onde muitos serviços dependem uns dos outros.

---

## ⚠️ Erros comuns

- **Não documentar (ou documentar mal).** Uma API sem doc gera perguntas infinitas, uso errado, e trava quem consome. Documentação não é opcional.
- **Documentação que desatualiza.** Doc escrita à parte, que diverge do código, é pior que nenhuma — ela **mente**. Gere a doc do código (ou o código da doc) para manter uma fonte única da verdade.
- **Quebrar o contrato sem versionar.** Remover/renomear campos ou mudar formatos na versão em uso quebra todos os consumidores de uma vez. Breaking changes exigem nova versão.
- **Não testar os casos de erro.** Testar só o "caminho feliz" e não o que acontece com dados inválidos, sem autenticação, ou recurso inexistente. Os erros são metade da API.
- **Confiar só em teste manual.** Testar no Postman é ótimo para explorar, mas não substitui testes **automatizados** no CI, que pegam regressões continuamente.
- **Versionar cedo/demais.** Criar `/v2/`, `/v3/` para mudanças que eram compatíveis, ou manter versões antigas para sempre. Versione quando **realmente** quebrar, e descontinue as antigas com plano.
- **Ignorar quem consome ao mudar.** Alterar a API sem pensar nos sistemas que dependem dela. Sempre pergunte "isso quebra alguém?" antes de mudar.

---

## 💡 Dicas profissionais

- **Documente com OpenAPI e gere o Swagger UI.** Uma doc interativa, onde qualquer um vê e testa os endpoints, vale muito mais que um texto solto. E casa com o design-first.
- **Mantenha uma única fonte da verdade para doc e código.** Gere a doc a partir de anotações no código, ou o código a partir do OpenAPI. Assim eles nunca divergem — o pecado capital da documentação é desatualizar.
- **Tenha uma coleção do Postman/Insomnia da sua API.** Testar cada endpoint (incluindo os erros) enquanto desenvolve valida seu trabalho e serve de documentação viva para o time.
- **Antes de mudar, pergunte "isso quebra alguém?".** Adicionar é seguro; remover/renomear/mudar formato é breaking change. Se quebra, versione (`/v2/`) e mantenha a antiga com deprecation anunciado.
- **Teste os casos de erro, não só o sucesso.** Dados inválidos → 400, sem auth → 401, sem permissão → 403, não encontrado → 404. Uma API é julgada tanto por como falha quanto por como acerta.
- **Automatize testes de contrato/integração no CI.** Eles pegam regressões que quebrariam consumidores, antes do deploy. É a rede de segurança que permite evoluir a API com confiança.
- **Pense em quem consome sua API — inclusive você do futuro.** Uma API bem documentada e estável é um presente para todos os que dependem dela. Trate a experiência do consumidor como parte do produto.

---

## 🎈 Curiosidades

- O **Swagger** foi criado em 2011 e se tornou tão dominante que, quando foi doado à Linux Foundation em 2015 e renomeado para **OpenAPI Specification**, muita gente continuou (e continua) chamando de "Swagger". As ferramentas (Swagger UI, Swagger Editor) mantiveram o nome.
- Empresas como a **Stripe** são frequentemente citadas como tendo a **melhor documentação de API do mundo** — com exemplos em várias linguagens, um playground interativo e explicações claríssimas. A qualidade da doc é parte central de por que desenvolvedores amam (e adotam) a Stripe.
- O **Postman** começou como uma simples extensão do navegador Chrome, criada por um desenvolvedor para facilitar seus próprios testes de API — e virou uma empresa avaliada em bilhões de dólares, usada por milhões de desenvolvedores. Um lembrete de que ferramentas para o problema certo têm valor enorme.
- A prática de gerar **documentação a partir do código** (via anotações) resolve o problema mais antigo da documentação: a **divergência**. "Docs as code" (documentação versionada junto do código, no mesmo repo e PR) é a filosofia moderna para manter docs vivas.
- O versionamento de API tem debates acalorados: **URL** (`/v2/`) vs. **header** vs. **nunca versionar** (evoluir só de forma compatível). Alguns defensores extremos argumentam que uma API bem projetada raramente precisa de v2 — mas a maioria dos times pragmáticos usa versão na URL por ser explícita e simples.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Documentação de API** | O "manual" que descreve endpoints, dados e erros da API. |
| **OpenAPI / Swagger** | Padrão para descrever APIs REST; gera doc interativa, código e mocks. |
| **Swagger UI** | Página interativa (gerada do OpenAPI) para ver e testar a API. |
| **Design-first** | Escrever o contrato (OpenAPI) antes de implementar. |
| **Postman / Insomnia** | Apps para montar, enviar e testar requisições manualmente. |
| **curl** | Cliente de linha de comando para chamar APIs. |
| **Versionamento** | Manter versões (`/v1/`, `/v2/`) para mudar sem quebrar consumidores. |
| **Breaking change** | Mudança incompatível que quebra quem consome (exige nova versão). |
| **Deprecation** | Anúncio de que uma versão/recurso será descontinuado. |
| **Teste de contrato** | Verifica que a API cumpre o contrato documentado. |
| **Teste de integração** | Verifica o endpoint de ponta a ponta (passando pelas camadas e banco). |

---

## 📝 Resumo

- **Documentar** uma API é tão importante quanto construí-la: sem o "manual", ninguém sabe usá-la. A doc descreve endpoints, o que enviar, o que se recebe, os erros e a autenticação.
- **OpenAPI/Swagger** é o padrão: descreve a API num arquivo estruturado, gerando **documentação interativa** (Swagger UI), código e mocks. Casa com o **design-first** (contrato antes do código, front/back em paralelo).
- **Postman/Insomnia** (e curl, DevTools) são as ferramentas de **teste manual** — montar requisições, ver respostas, testar os casos de erro durante o desenvolvimento.
- **Versionamento** protege quem consome: mudanças **compatíveis** (adicionar) são seguras; **breaking changes** (remover/renomear/mudar formato) exigem nova versão (`/v2/`), mantendo a antiga com **deprecation** anunciado. Quebrar o contrato sem versionar é um erro doloroso.
- **Testes automatizados** (contrato e integração) rodam no CI, pegando regressões que quebrariam consumidores antes do deploy. Documentação viva + teste + versionamento consciente é o que torna uma API **profissional**.

---

## ☑️ Checklist de aprendizado

- [ ] Explico por que documentar uma API é essencial.
- [ ] Sei o que é OpenAPI/Swagger e o que ele gera.
- [ ] Uso Postman/Insomnia para testar uma API manualmente.
- [ ] Entendo o que é um breaking change e quando versionar.
- [ ] Sei a diferença entre teste de contrato e de integração.
- [ ] Penso em quem consome a API ao documentá-la e mudá-la.

---

## ✏️ Exercícios

**1.** Com a analogia do aparelho eletrônico, explique o papel da documentação, do teste e do versionamento de uma API.

**2.** Quais destas mudanças são **breaking changes** (exigem nova versão) e quais são compatíveis: (a) adicionar um campo opcional novo na resposta; (b) remover um campo da resposta; (c) renomear um campo; (d) adicionar um endpoint novo?

**3.** O que é o **OpenAPI/Swagger** e cite dois benefícios de escrever a especificação **antes** de implementar a API (design-first).

**4.** Por que testar apenas o "caminho feliz" de uma API é insuficiente? Dê exemplos de casos de erro que você deveria testar num endpoint de criar pedido.

**5. (Reflexão)** A SaborExpress precisava mudar o formato do campo `total` (um breaking change) numa API usada por apps de clientes e por sistemas de restaurantes parceiros. Explique como o versionamento resolveu isso sem quebrar ninguém, e o que teria acontecido se eles simplesmente alterassem a versão existente.

---

## 💬 Respostas comentadas

**1.** A **documentação** é o **manual do usuário** do aparelho: diz o que cada "botão" (endpoint) faz, como usar e o que significam os erros — sem ela, quem consome fica adivinhando no escuro. O **teste** é o **controle de qualidade da fábrica**: antes de a API "sair", verifica-se que ela faz o que o manual promete e que se comporta bem quando usada errado. O **versionamento** é como **lançar um modelo novo sem queimar os aparelhos antigos**: se você muda o "formato da tomada" (o contrato) de forma incompatível, quebra todos os que já usavam o antigo — então a mudança vira uma **nova versão** (v2), e a antiga (v1) continua funcionando enquanto os consumidores migram.

**2.** (a) **Compatível** — adicionar um campo opcional não quebra quem já consome (eles simplesmente ignoram o novo campo). (b) **Breaking change** — remover um campo quebra quem dependia dele. (c) **Breaking change** — renomear é, na prática, remover o antigo e adicionar um novo; quebra quem usava o nome antigo. (d) **Compatível** — um endpoint novo não afeta os existentes. (Regra geral: **adicionar** costuma ser seguro; **remover, renomear ou mudar formato/tipo** costuma quebrar.)

**3.** O **OpenAPI/Swagger** é uma especificação padrão para descrever uma API REST num arquivo estruturado (YAML/JSON), a partir do qual se geram automaticamente documentação interativa (Swagger UI), código e mocks. Dois benefícios de escrever a spec **antes** de implementar (design-first): (1) **front e back trabalham em paralelo** — com o contrato definido, o front usa um mock gerado da spec enquanto o back é construído, sem um travar o outro; (2) a spec vira a **fonte única da verdade** do contrato e gera a documentação automaticamente, evitando divergência entre doc e implementação (e alinhando o time sobre o que a API fará antes de gastar tempo codando).

**4.** Porque uma parte enorme (e crítica) do comportamento de uma API está em **como ela lida com o que dá errado** — e é aí que moram muitos bugs e falhas de segurança. Testar só o sucesso deixa esses casos sem verificação. Para um endpoint de **criar pedido**, você deveria testar, no mínimo: **400 Bad Request** quando faltam campos obrigatórios (ex.: sem itens) ou os dados são inválidos; **401 Unauthorized** quando não há token de autenticação; **403 Forbidden** quando o usuário tenta criar pedido em nome de outro; **404** se o restaurante/produto referenciado não existe; e casos de borda como carrinho vazio, cupom inválido ou pedido abaixo do mínimo. Cada um desses precisa retornar o status e a mensagem corretos — senão o app não sabe reagir, e problemas passam batido.

**5.** O versionamento resolveu criando uma **nova versão** (`/v2/pedidos`) com o novo formato do `total` (dividido em subtotal, frete e desconto), enquanto **mantinha a `/v1/pedidos`** funcionando com o formato antigo. Assim, os apps de clientes e os sistemas dos restaurantes que ainda usavam o formato antigo continuaram operando **sem quebrar**, consumindo a v1; e os consumidores puderam **migrar para a v2 no seu próprio tempo**, dentro do prazo de **descontinuação (deprecation)** anunciado. Se eles simplesmente **alterassem a versão existente** (v1), todos os consumidores que esperavam o formato antigo de `total` receberiam de repente um formato diferente — os apps dos clientes que ainda não tinham atualizado **quebrariam** (talvez parando de mostrar o valor ou travando) e as integrações dos restaurantes parceiros **falhariam** da noite para o dia, gerando um incidente grave, prejuízo e perda de confiança. O versionamento é justamente o que permite evoluir o contrato **sem** deixar quem depende dele na mão.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[72-O-que-e-uma-API-HTTP-REST-e-JSON]], [[73-Autenticacao-e-autorizacao]], [[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]] — a API que documentamos e testamos.
- **Próximo (linear):** [[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]] — começa o módulo de front-end, o principal consumidor da API.
- **Base:** [[38-Como-ler-documentacao]] (Vol. 2 — ler docs de API) e [[66-Contribuindo-com-projetos-abertos]] (SemVer/versionamento).
- **Aplicação:** [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] (testes de integração/contrato) e [[80-Construindo-a-API-da-SaborExpress]].

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 21 → **Capítulo 75 de 119**.
