# Capítulo 73 — Autenticação e autorização

> **Volume 3 — Desenvolvimento de Software** · Módulo 21 — APIs e Integração
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Distinguir **autenticação** ("quem é você?") de **autorização** ("o que você pode fazer?").
- Entender como senhas devem ser guardadas (**hash**, nunca texto puro) e por quê.
- Compreender **tokens** e o **JWT** — como uma API sem estado sabe quem está chamando.
- Entender o que é **OAuth** e o "login com Google/Facebook".
- Reconhecer boas práticas e erros graves de segurança em autenticação.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] — a API que precisa saber quem chama.
- Ajuda ter lido [[28-Protocolos-e-protecao]] (Vol. 2 — HTTPS).

---

## 📖 Introdução

Sua API está pronta e responde a requisições. Mas surge a pergunta que decide a segurança do sistema inteiro: **quem** está fazendo essa requisição, e ela **pode** fazer isso? Sem responder a isso, qualquer pessoa poderia ver os pedidos de qualquer outra, mudar preços, ou apagar dados. As duas respostas têm nomes que soam parecidos, mas significam coisas diferentes — e confundi-los é um erro clássico: **autenticação** (quem é você?) e **autorização** (o que você tem permissão de fazer?).

Este é um dos capítulos mais **críticos para segurança** do volume. Erros aqui são a causa da maioria dos vazamentos de dados do mundo: senhas guardadas em texto puro, tokens mal protegidos, APIs que não verificam permissões. E são erros **fáceis de cometer** por quem não conhece os fundamentos — e **catastróficos** quando acontecem (dados de milhões de pessoas vazados, contas invadidas, multas de LGPD). Um dev que entende autenticação e autorização de verdade protege usuários reais.

Você vai aprender: por que **nunca** se guarda uma senha em texto puro (e o que é **hash**); como uma API **sem estado** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) consegue "lembrar" quem você é entre requisições (**tokens** e **JWT**); e como funciona o "**login com Google**" (**OAuth**), que deixa você entrar em apps sem criar mais uma senha. Este é um assunto que continua no Volume 4 (segurança, OWASP), mas os fundamentos estão aqui — e são inegociáveis para qualquer dev que lida com dados de pessoas.

---

## 🧠 Analogia

Pense em entrar num **prédio comercial com segurança**.

**Autenticação** é a **recepção que confirma quem você é**: você mostra seu documento (ou digital, ou crachá), e o segurança confirma "sim, você é a Ana Costa". Provou sua **identidade**. Isso responde *"quem é você?"*.

**Autorização** é o que acontece **depois**: mesmo confirmada sua identidade, você não pode entrar em **qualquer** sala. Seu crachá dá acesso ao 3º andar (onde você trabalha), mas **não** à sala do cofre nem ao andar da diretoria. A autorização responde *"o que **essa pessoa** pode fazer/acessar?"*. Você pode estar **autenticada** (a recepção sabe quem você é) mas **não autorizada** a entrar numa sala específica.

E o **crachá temporário** que a recepção te dá ao entrar é o **token**: em vez de você mostrar o documento em **cada** porta do prédio (lento e chato), você recebe um crachá que **prova** que já foi verificada, e só o apresenta nas portas. O crachá tem validade (expira no fim do dia) e diz quem você é e onde pode ir. É assim que a API "lembra" de você sem te pedir a senha a cada requisição.

Guarde: autenticação = provar **quem você é** (a recepção); autorização = definir **o que você pode** (as portas que seu crachá abre); token = o **crachá temporário** que evita reprovar sua identidade toda hora.

---

## 🧩 Conceitos fundamentais

### 1. Autenticação vs. autorização

- **Autenticação (authn):** verificar **quem** o usuário é. Login com e-mail/senha, digital, código por SMS. Responde *"você é mesmo quem diz ser?"*.
- **Autorização (authz):** verificar **o que** esse usuário (já autenticado) tem permissão de fazer. Responde *"você pode acessar isto / executar esta ação?"*.

> **Termo explicado — autenticação vs. autorização:** autenticação confirma a **identidade** (quem você é); autorização define as **permissões** (o que você pode fazer). Primeiro autentica, depois autoriza.

A ordem importa: primeiro você **autentica** (sabe quem é), depois **autoriza** (verifica se pode). Confundi-los ou pular a autorização é fonte de falhas graves ("qualquer usuário logado consegue ver os pedidos de qualquer outro").

### 2. Senhas: nunca em texto puro — use hash

**Regra inviolável:** senhas **nunca** são guardadas como texto legível no banco. Se o banco vazar (e bancos vazam), todas as senhas estariam expostas — e como as pessoas reusam senhas, você comprometeria as contas delas em outros sites também.

A solução é o **hash**: uma função de mão única que transforma a senha num código irreversível. Você guarda o **hash**, não a senha. Na hora do login, você aplica o hash na senha digitada e compara com o guardado — sem nunca guardar a senha original.

> **Termo explicado — hash de senha:** transformação de mão única (irreversível) da senha num código. Guarda-se o hash, nunca a senha; no login, compara-se o hash da senha digitada com o armazenado.

Detalhes cruciais:
- Use funções de hash **próprias para senha** (**bcrypt**, **scrypt**, **Argon2**) — **não** MD5 nem SHA simples (rápidos demais, quebráveis).
- Use **salt**: um valor aleatório único por senha, que impede ataques com tabelas pré-calculadas (*rainbow tables*).

### 3. Como uma API sem estado "lembra" de você: tokens

Lembra que REST é **sem estado** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]])? Cada requisição é independente — o servidor não guarda que você "está logado". Então como a API sabe, na sua segunda requisição, que é você? Com um **token**: ao fazer login com sucesso, o servidor te dá um token (o "crachá"). Você o envia em **cada** requisição seguinte (num header `Authorization: Bearer <token>`), e o servidor o valida para saber quem você é.

> **Termo explicado — token:** credencial que o servidor emite após o login e que o cliente envia em cada requisição para provar sua identidade, sem reenviar a senha.

Alternativa clássica: **sessões com cookies** (o servidor guarda a sessão e manda um cookie). Tokens (stateless) x sessões (stateful) é uma decisão de arquitetura; tokens combinam melhor com APIs REST e escala.

### 4. JWT — o token autocontido

O **JWT (JSON Web Token)** é o formato de token mais usado. Ele é **autocontido**: carrega, dentro de si, informações (*claims*) sobre o usuário (id, papel, expiração), tudo **assinado digitalmente** pelo servidor. Estrutura: três partes separadas por ponto — `header.payload.signature`.

> **Termo explicado — JWT (JSON Web Token):** token autocontido que carrega dados do usuário (claims) e uma assinatura digital. O servidor valida a assinatura para confiar no token — sem precisar consultar um banco de sessões.

A mágica: como o JWT é **assinado** com uma chave secreta do servidor, ninguém consegue **forjá-lo** ou **alterá-lo** sem invalidar a assinatura. O servidor confia no token só verificando a assinatura — sem guardar estado. **Cuidado:** o conteúdo do JWT é apenas **codificado** (base64), **não criptografado** — qualquer um consegue **ler** os dados dentro dele. Por isso **nunca** coloque segredos (senha, dados sensíveis) no payload de um JWT.

### 5. OAuth — "login com Google"

**OAuth 2.0** é o protocolo que permite o "**login com Google/Facebook/GitHub**" e o acesso delegado. Em vez de criar mais uma senha no app, você **autoriza** o app a confirmar sua identidade via um provedor que você já confia (o Google). O app nunca vê sua senha do Google — recebe apenas um token que prova que o Google confirmou quem você é.

> **Termo explicado — OAuth 2.0:** protocolo de autorização que permite a um app acessar/confirmar sua identidade através de um provedor (Google, etc.) sem que o app veja sua senha, usando tokens delegados.

Benefícios: o usuário não cria mais uma senha (menos senhas fracas/reusadas), e o app não precisa **guardar** senhas (menos risco). O **OpenID Connect** é uma camada sobre o OAuth focada em autenticação (login social).

---

## ⚙️ Como funciona na prática

O fluxo completo de autenticação e autorização numa API:

**1. Cadastro (guardando a senha com segurança).** O usuário se cadastra com e-mail e senha. O servidor **não** guarda a senha: aplica **bcrypt** (com salt) e guarda o **hash**. A senha original nunca toca o banco.

**2. Login (autenticação).** O usuário envia e-mail e senha. O servidor busca o hash guardado, aplica bcrypt na senha digitada e **compara**. Se bate, autenticado! O servidor então emite um **JWT** assinado, com o id e o papel do usuário, e uma **expiração** (ex.: 1 hora). Devolve o token ao cliente.

**3. Requisições seguintes (o token em ação).** O cliente guarda o token e o envia em **cada** requisição no header `Authorization: Bearer <jwt>`. O servidor **valida a assinatura** do JWT (sem consultar banco) e sabe quem é o usuário. Se o token expirou ou é inválido → **401 Unauthorized**.

**4. Autorização (verificando permissões).** Autenticado não é suficiente — cada ação precisa checar **permissão**. Ao pedir `GET /pedidos/42`, o servidor verifica: esse pedido pertence a **este** usuário? Se não → **403 Forbidden**. Um cliente **não** pode ver o pedido de outro; um usuário comum **não** pode acessar rotas de admin. Essa checagem, em **cada** endpoint sensível, é a autorização — e esquecê-la é uma falha grave.

**Os erros catastróficos a evitar (que causam vazamentos reais):**
- **Senha em texto puro** ou hash fraco (MD5) → vaza o banco, vazam todas as senhas.
- **Não checar autorização** ("qualquer logado vê tudo") → o usuário A troca o id na URL (`/pedidos/99`) e vê o pedido do usuário B. Chama-se **IDOR** (Insecure Direct Object Reference) e é campeão de vazamentos.
- **Segredos no JWT** → o payload é legível; nunca ponha dado sensível ali.
- **HTTP sem TLS** → o token trafega em texto e pode ser roubado. **Sempre HTTPS** ([[28-Protocolos-e-protecao]]).
- **Tokens sem expiração** → um token roubado vale para sempre. Tokens curtos + *refresh token* para renovar.

**A ligação com o resto.** Autenticação/autorização é a camada de segurança da API ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]). Ela reaparece expandida no Volume 4 (segurança, OWASP Top 10 — onde "quebra de autenticação" e "controle de acesso quebrado" são os campeões). E liga à LGPD (Volume 4): proteger identidade e dados é obrigação legal.

---

## 🍔 Aplicação na SaborExpress

A SaborExpress lida com dados sensíveis (pedidos, endereços, pagamentos), então autenticação e autorização são levadas a sério.

**Senhas com hash (nunca em texto).** No cadastro, a senha do cliente passa por **bcrypt** com salt antes de ir ao banco. A tabela `clientes` guarda `senha_hash`, nunca a senha real. Quando (num teste) o time simulou um vazamento do banco, confirmaram: as senhas estavam **inúteis** para um atacante — só hashes irreversíveis. Se tivessem guardado em texto puro, um vazamento exporia as senhas de todos os clientes (e, como muita gente reusa senha, comprometeria as contas deles em outros sites — um desastre ético e legal).

**Login com JWT.** Ao logar, o cliente recebe um **JWT** assinado contendo seu `id` e `papel` (cliente / restaurante / admin), válido por 1 hora. O app guarda o token e o envia em cada chamada (`Authorization: Bearer ...`). A API valida a assinatura e sabe quem está pedindo — **sem** guardar sessão, o que combina com a API REST sem estado e facilita escalar ([[57-O-que-e-arquitetura-de-software]]).

**A autorização que evitou um vazamento (IDOR).** Um dev júnior implementou `GET /pedidos/:id` verificando só se o usuário estava **logado** (autenticado). No code review, a sênior pegou a falha: assim, qualquer cliente logado poderia trocar o id na URL (`/pedidos/1`, `/pedidos/2`...) e **ver os pedidos de todos os outros clientes** — endereços, itens, tudo. É o clássico **IDOR**. A correção: a API passou a verificar também se o pedido **pertence** ao usuário autenticado (`pedido.cliente_id == usuario.id`), retornando **403 Forbidden** caso contrário. Autenticação sem autorização teria exposto os dados de todos os clientes — um vazamento grave e uma violação de LGPD.

**Papéis (autorização por perfil).** A SaborExpress tem perfis diferentes: o **cliente** pode criar pedidos e ver os **seus**; o **restaurante** pode ver e atualizar os pedidos **dele** e editar seu cardápio; o **admin** pode aprovar restaurantes. Cada endpoint verifica o **papel** (do JWT) antes de permitir a ação. Um cliente que tentasse `POST /restaurantes/aprovar` receberia **403** — autenticado, mas não autorizado.

**Login com Google (OAuth).** Para reduzir atrito no cadastro (lembra do abandono na tela de cadastro obrigatório do [[49-MVP-priorizacao-e-validacao]]?), a SaborExpress adicionou "**entrar com Google**" via **OAuth**. O cliente entra sem criar mais uma senha; a SaborExpress **não** vê nem guarda a senha do Google — recebe só a confirmação de identidade. Menos senhas fracas, menos risco de guardar senhas, e menos atrito.

**Tudo sobre HTTPS.** Todo o tráfego da SaborExpress é **HTTPS** ([[28-Protocolos-e-protecao]]) — o token e os dados viajam criptografados. Sem isso, um atacante na mesma rede poderia **roubar o token** e se passar pelo cliente.

Moral: para a SaborExpress, autenticação (hash de senha, JWT, login Google) prova **quem** é o usuário, e autorização (dono do pedido, papéis) controla **o que** ele pode fazer. Foi a autorização — a checagem que o júnior esqueceu — que impediu o vazamento dos dados de todos os clientes. Segurança de identidade não é opcional quando se lida com dados de pessoas.

---

## 🏢 Como isso acontece em uma empresa

- **Hash de senha é obrigação absoluta.** Nenhuma empresa séria guarda senha em texto puro. bcrypt/Argon2 com salt é o padrão. Guardar senha em texto é negligência grave (e ilegal sob LGPD).
- **JWT e OAuth dominam.** JWT para autenticação de APIs; OAuth/OpenID Connect para login social e acesso delegado. São vocabulário do dia a dia de back-end.
- **Provedores de identidade gerenciados.** Muitas empresas usam **Auth0, Firebase Auth, AWS Cognito, Keycloak** em vez de construir autenticação do zero — porque segurança é difícil de acertar e errar é caro. "Não role sua própria criptografia/auth" é conselho consagrado.
- **Autorização é onde mora a maioria das falhas.** O **"Broken Access Control"** é o **nº 1 do OWASP Top 10** (Volume 4). IDOR, falta de checagem de permissão, escalação de privilégio — são as falhas mais comuns e exploradas. Times revisam autorização com lupa.
- **RBAC e além.** Autorização por **papéis (RBAC — Role-Based Access Control)** é o modelo mais comum (cliente/admin/etc.); sistemas complexos usam ABAC (baseado em atributos) e permissões finas.
- **HTTPS em tudo.** Tráfego sem TLS é inaceitável. Tokens e credenciais **sempre** por HTTPS.
- **Auditoria e conformidade.** LGPD/GDPR exigem proteção de dados pessoais; autenticação/autorização robustas são parte do compliance. Vazamentos geram multas e dano reputacional enormes.

---

## ⚠️ Erros comuns

- **Confundir autenticação com autorização.** Autenticar (saber quem é) **não** basta — é preciso **autorizar** (verificar se pode) em cada ação sensível. Autenticado ≠ autorizado.
- **Guardar senha em texto puro (ou hash fraco).** O erro mais grave. Nunca guarde senha legível; use bcrypt/Argon2 com salt, jamais MD5/SHA simples.
- **Não verificar permissões (IDOR).** Deixar o usuário A acessar dados do usuário B trocando o id na URL. Sempre cheque se o recurso **pertence** a quem pede (403 se não).
- **Colocar segredos no JWT.** O payload é apenas codificado (legível), não criptografado. Nunca ponha senha ou dado sensível dentro do token.
- **Tokens sem expiração.** Um token roubado que nunca expira é uma chave permanente para o atacante. Use expiração curta + refresh token.
- **Trafegar credenciais sem HTTPS.** Token/senha em HTTP puro podem ser interceptados. Sempre TLS.
- **Construir a própria autenticação do zero sem conhecimento.** Segurança é cheia de armadilhas sutis. Prefira bibliotecas/provedores testados a inventar sua criptografia.
- **Mensagens de erro que vazam informação.** "E-mail não existe" vs. "senha errada" ajuda o atacante a descobrir e-mails válidos. Use mensagens genéricas ("credenciais inválidas").

---

## 💡 Dicas profissionais

- **Grave sempre "primeiro autentico, depois autorizo".** Toda ação sensível precisa das duas checagens: quem é você (token válido) **e** você pode fazer isto (permissão sobre este recurso).
- **Nunca guarde senha em texto; use bcrypt/Argon2 com salt.** Não há exceção. Se você vir senha em texto num banco, é um incidente de segurança a corrigir imediatamente.
- **Cheque a propriedade do recurso em cada endpoint.** Antes de devolver `/pedidos/42`, confirme que o pedido é de quem está pedindo. Essa única checagem previne a falha mais comum (IDOR).
- **Nunca ponha segredos no payload do JWT.** Ele é legível. Coloque só id, papel e expiração — nada sensível.
- **Use provedores de identidade prontos quando puder.** Auth0, Cognito, Firebase Auth e afins acertam detalhes de segurança que você levaria anos para dominar. Reinventar auth é arriscado.
- **HTTPS sempre, tokens com expiração curta.** Proteja o transporte (TLS) e limite a janela de um token roubado (expiração + refresh).
- **Use mensagens de erro genéricas na autenticação.** "Credenciais inválidas" (não "e-mail não existe") evita dar pistas a atacantes.
- **Trate autorização como parte do design, não do "depois".** Pense nos papéis e permissões ao desenhar a API — não como um remendo no fim.

---

## 🎈 Curiosidades

- A confusão entre os status codes **401 "Unauthorized"** e **403 "Forbidden"** é histórica e irônica: o **401** deveria se chamar "Unauthenticated" (você não provou quem é), e o **403** é o de fato "sem autorização/permissão" (sabemos quem você é, mas não pode). O nome errado do 401 confunde desenvolvedores há décadas.
- O **bcrypt** é **lento de propósito** — o oposto do que se quer numa função de hash normal. A lentidão é uma **defesa**: torna inviável para um atacante testar bilhões de senhas por segundo. Ele ainda tem um "fator de custo" ajustável, para ficar mais lento conforme os computadores ficam mais rápidos.
- O ataque com **rainbow tables** (tabelas gigantes de hashes pré-calculados) foi tão eficaz contra hashes sem salt que o **salt** (um valor aleatório por senha) se tornou obrigatório — ele garante que a mesma senha gere hashes diferentes para usuários diferentes, inutilizando as tabelas.
- O **OAuth** nasceu por volta de 2007 da necessidade de apps acessarem dados de outros serviços (como suas fotos ou contatos) **sem** você entregar sua senha. Antes disso, apps pediam sua senha do e-mail para "importar contatos" — um pesadelo de segurança que o OAuth eliminou.
- O **"Broken Access Control"** (controle de acesso quebrado — a categoria da autorização falha, incluindo IDOR) subiu para o **1º lugar** do OWASP Top 10 em 2021, ultrapassando até o SQL Injection. É a prova de que **autorização** é onde os sistemas mais falham hoje.
- Muitos dos maiores vazamentos de dados da história (bilhões de contas) aconteceram porque senhas estavam guardadas em **texto puro** ou com hash fraco. Cada um desses incidentes é uma aula sobre por que o hash correto de senha não é negociável.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Autenticação (authn)** | Verificar **quem** o usuário é (login). |
| **Autorização (authz)** | Verificar **o que** o usuário pode fazer (permissões). |
| **Hash de senha** | Transformação irreversível da senha; guarda-se o hash, não a senha. |
| **bcrypt / Argon2** | Funções de hash próprias para senha (lentas de propósito). |
| **Salt** | Valor aleatório por senha que impede ataques com tabelas pré-calculadas. |
| **Token** | Credencial emitida no login e enviada em cada requisição. |
| **JWT** | Token autocontido, assinado, com dados do usuário (legível, não secreto). |
| **OAuth 2.0** | Protocolo de login/acesso delegado ("entrar com Google"). |
| **IDOR** | Falha em que se acessa recurso de outro trocando o id (autorização ausente). |
| **RBAC** | Controle de acesso por papéis (cliente, admin...). |
| **401 / 403** | Não autenticado / autenticado mas sem permissão. |

---

## 📝 Resumo

- **Autenticação** confirma **quem** você é (login); **autorização** define **o que** você pode fazer (permissões). Primeiro autentica, depois autoriza — e autenticado **não** significa autorizado.
- **Senhas nunca em texto puro:** guarda-se o **hash** (com **bcrypt/Argon2** e **salt**), irreversível. Vazou o banco? As senhas continuam inúteis para o atacante.
- Como a API REST é **sem estado**, ela usa **tokens** (o "crachá") para saber quem chama. O **JWT** é um token autocontido e **assinado** — o servidor confia nele validando a assinatura, sem guardar sessão. Seu conteúdo é **legível**, então nunca ponha segredos nele.
- **OAuth 2.0** permite o "login com Google" — o app confirma sua identidade via um provedor confiável, sem ver sua senha.
- A **autorização** (checar se o recurso pertence a quem pede, verificar papéis) é onde mais se falha — o **IDOR** e o "controle de acesso quebrado" são campeões de vazamentos (nº 1 do OWASP). Sempre: HTTPS, tokens com expiração, checagem de permissão em cada endpoint sensível, e mensagens de erro genéricas.

---

## ☑️ Checklist de aprendizado

- [ ] Distingo autenticação de autorização com um exemplo próprio.
- [ ] Sei por que senhas são guardadas como hash (bcrypt/salt), nunca em texto.
- [ ] Explico como um token/JWT permite uma API sem estado saber quem chama.
- [ ] Sei que o payload do JWT é legível (não colocar segredos).
- [ ] Entendo o que é OAuth e o "login com Google".
- [ ] Reconheço o IDOR e a importância de checar permissão em cada endpoint.

---

## ✏️ Exercícios

**1.** Com a analogia do prédio, explique a diferença entre autenticação e autorização, e dê um exemplo de alguém autenticado mas **não** autorizado.

**2.** Por que **nunca** se deve guardar a senha do usuário em texto puro no banco? O que se guarda no lugar, e o que é o "salt"?

**3.** Como uma API REST **sem estado** consegue saber quem é o usuário na segunda, terceira, quarta requisição, se ela não guarda sessão? Explique o papel do token/JWT.

**4.** Um endpoint `GET /pedidos/:id` verifica apenas se o usuário está **logado**. Que falha grave isso permite, e como corrigi-la?

**5. (Reflexão)** Na SaborExpress, o code review pegou uma falha de autorização (IDOR) que expunha os pedidos de todos os clientes. Explique a falha, a correção, e por que "autenticação sem autorização" não é suficiente para proteger dados de pessoas.

---

## 💬 Respostas comentadas

**1.** **Autenticação** é a recepção do prédio confirmar **quem você é** (você mostra o documento e o segurança verifica sua identidade). **Autorização** é definir **o que você pode acessar** depois de identificado (seu crachá abre o 3º andar, mas não a sala do cofre). Exemplo de autenticado **não** autorizado: a Ana passa pela recepção (autenticada — o prédio sabe que é ela), mas ao tentar entrar no andar da diretoria, seu crachá **não abre a porta** — ela é uma pessoa conhecida e legítima, mas **não tem permissão** para aquela área. Em software: um cliente logado (autenticado) que tenta acessar uma rota de admin recebe **403 Forbidden**.

**2.** Porque, se o banco **vazar** (e bancos vazam), todas as senhas em texto ficariam **expostas** — e como as pessoas costumam **reusar** a mesma senha em vários sites, o atacante comprometeria também as contas delas em outros serviços (um desastre que vai muito além do seu sistema). No lugar, guarda-se o **hash** da senha: uma transformação **irreversível** (via bcrypt/Argon2). No login, aplica-se o mesmo hash na senha digitada e compara-se com o guardado — sem nunca armazenar a senha original. O **salt** é um valor **aleatório único por senha**, adicionado antes do hash, que garante que duas pessoas com a mesma senha tenham hashes **diferentes** — inutilizando ataques com tabelas de hashes pré-calculadas (rainbow tables).

**3.** Como a API é sem estado, ela não "lembra" que você logou — cada requisição é independente. A solução é o **token**: ao fazer login com sucesso, o servidor emite um token (um JWT assinado) que funciona como um "crachá" contendo sua identidade (id, papel). O cliente **guarda** esse token e o **envia em cada requisição seguinte** (no header `Authorization: Bearer <token>`). O servidor, a cada requisição, **valida a assinatura** do token — e, como ele mesmo assinou com sua chave secreta, confia no conteúdo e sabe quem é o usuário — **sem** precisar guardar sessão nem consultar um banco. Assim, a API descobre quem você é em cada chamada, mantendo-se sem estado.

**4.** A falha grave é o **IDOR (Insecure Direct Object Reference)**: verificar só se o usuário está logado (autenticado), mas **não** se o pedido **pertence** a ele (autorização). Assim, qualquer cliente logado pode simplesmente **trocar o id na URL** (`/pedidos/1`, `/pedidos/2`, ...) e **ver os pedidos de todos os outros clientes** — endereços, itens, valores. A correção é adicionar a checagem de **autorização**: antes de devolver o pedido, verificar se `pedido.cliente_id` é igual ao id do usuário autenticado (ou se ele tem papel que permita), retornando **403 Forbidden** caso contrário. Ou seja, além de "você está logado?", perguntar "este recurso é **seu**?".

**5.** A falha era um **IDOR**: o endpoint `GET /pedidos/:id` checava apenas se o usuário estava **autenticado** (logado), sem checar se o pedido era **dele**. Assim, qualquer cliente logado poderia trocar o id na URL e acessar os pedidos de **qualquer outro** cliente — expondo endereços, itens e dados de todos. A **correção** foi adicionar a verificação de **autorização**: a API passou a confirmar que `pedido.cliente_id == usuario.id` (o pedido pertence a quem pede), devolvendo **403 Forbidden** quando não. "Autenticação sem autorização" não protege dados de pessoas porque **saber quem o usuário é não diz o que ele pode acessar**: sem a checagem de permissão em cada recurso, um usuário legítimo e identificado ainda consegue acessar dados que não são dele. Proteger dados exige **as duas camadas** — autenticar (quem é) **e** autorizar (o que pode) —, e a autorização é justamente a que mais se esquece e a que mais causa vazamentos.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] — a API que precisa saber quem chama.
- **Próximo (linear):** [[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]] — outras formas de comunicação entre sistemas.
- **Base:** [[28-Protocolos-e-protecao]] (Vol. 2 — HTTPS/TLS) e [[68-SQL-na-pratica]] (a tabela que guarda o hash).
- **Aplicação futura:** Volume 4 (segurança, OWASP Top 10, LGPD) — onde autenticação/autorização são aprofundadas; e [[80-Construindo-a-API-da-SaborExpress]].

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 21 → **Capítulo 73 de 119**.
