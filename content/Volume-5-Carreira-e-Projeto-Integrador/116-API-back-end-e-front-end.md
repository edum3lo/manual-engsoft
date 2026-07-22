# Capítulo 116 — Projeto Integrador (3/5): API, back-end e front-end ⭐

> **Volume 5 — Carreira e Projeto Integrador** · Módulo 36 — Projeto Integrador: SaborExpress do zero à produção
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Ver as **três camadas técnicas** (banco, back-end/API, front-end) trabalhando juntas na prática.
- Acompanhar a construção da **API**, do **back-end** e do **front-end** sobre o banco modelado.
- Entender como o **contrato da API** permite front e back trabalharem em paralelo.
- Seguir uma **requisição real** atravessando todas as camadas, de ponta a ponta.
- Chegar ao coração da construção do Projeto Integrador: o sistema funcionando.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário-avançado (4/5).** É o capítulo mais técnico do Projeto Integrador.

---

## ✅ Pré-requisitos

- Ter lido [[115-Requisitos-casos-de-uso-e-banco-de-dados]] (o banco que sustenta esta fase).
- Ter lido [[72-O-que-e-uma-API-HTTP-REST-e-JSON]], [[79-O-que-roda-no-servidor-linguagens-e-frameworks]], [[77-Frameworks-de-front-end]] e [[80-Construindo-a-API-da-SaborExpress]].

---

## 📖 Introdução

Temos o problema entendido, o protótipo validado ([[114-Da-ideia-ao-Figma]]) e o banco de dados modelado ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]). Agora chegamos ao **coração** da construção — e ao capítulo mais técnico do Projeto Integrador, marcado com ⭐: erguer as **três camadas** que formam o sistema funcionando — o **banco** (a fundação de dados, já pronta), o **back-end com sua API** (a lógica e a "cara" do servidor), e o **front-end** (as telas que o usuário toca). É aqui que a SaborExpress deixa de ser especificação e vira um app que **realmente funciona**, onde o cliente abre a tela, vê os restaurantes, faz um pedido e o recebe — tudo atravessando as camadas que você estudou separadamente ao longo do Volume 3.

Este capítulo é, essencialmente, a **síntese** do "Construindo a API da SaborExpress" ([[80-Construindo-a-API-da-SaborExpress]]) e dos capítulos de front ([[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]] a [[78-Ligando-front-end-a-experiencia-do-usuario]]), agora vistos **em sequência dentro do fluxo completo** do projeto. Vamos construir a **API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) que expõe os dados do banco, o **back-end** ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) que aplica as regras de negócio (calcular total, aplicar frete, checar disponibilidade), e o **front-end** ([[77-Frameworks-de-front-end]], [[78-Ligando-front-end-a-experiencia-do-usuario]]) que consome essa API e mostra as telas do protótipo. E, crucialmente, vamos ver o **contrato da API** — o acordo que permite front e back serem construídos **em paralelo** por pessoas diferentes.

O momento culminante é seguir uma **requisição real de ponta a ponta**: o cliente João toca "finalizar pedido" → o front dispara uma requisição HTTP → a API a recebe → o back valida quem ele é, aplica as regras, grava no banco dentro de uma transação → devolve a resposta → o front atualiza a tela. Ver esse fluxo **inteiro**, com as três camadas se encaixando, é o "clique" de engenharia que o Projeto Integrador busca provar: os conceitos que você estudou isolados formam um **sistema vivo e coordenado**. Este é o capítulo onde a SaborExpress ganha vida — e onde você vê, na prática integrada, como banco + API + back + front se tornam um produto que funciona. É a terceira e mais central fase da jornada da ideia à produção.

---

## 🧠 Analogia

Continuando a analogia da **casa**: se já temos a **fundação e a estrutura** ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]), esta fase é construir as **três partes que fazem a casa habitável e funcional** — o **encanamento/elétrica** (o back-end), os **pontos de acesso** (a API) e os **acabamentos que a família usa** (o front-end).

- **O encanamento e a parte elétrica (o back-end):** por trás das paredes, invisível ao morador, está o sistema que **faz a casa funcionar** — a água que chega, a eletricidade que circula, o esgoto que sai. É o **back-end**: a lógica que ninguém vê mas que faz tudo acontecer (aplicar as regras, processar, guardar e buscar na fundação/banco). O morador não vê os canos, mas sem eles a casa não funciona.

- **As tomadas, torneiras e interruptores (a API):** o encanamento e a elétrica precisam de **pontos de acesso padronizados** onde a família interage com eles — a tomada na parede, a torneira na pia, o interruptor. Você não precisa saber como a eletricidade chega; você só **liga na tomada**, que tem um formato padrão. A **API** é isso: os "pontos de acesso" padronizados (os endpoints) onde o front-end "se liga" ao back-end, sem precisar saber como ele funciona por dentro. E o **contrato da API** é como a **norma dos padrões elétricos**: porque a tomada segue um padrão conhecido, o eletricista (back) e o marceneiro que instala os eletrodomésticos (front) podem trabalhar **em paralelo** — cada um confia no formato da tomada.

- **Os acabamentos que a família toca (o front-end):** finalmente, o que o morador **vê e usa** — os armários, as luminárias, os eletrodomésticos, a decoração. É o **front-end**: as telas com que o usuário interage, que se "ligam nas tomadas" (consomem a API) para funcionar. A geladeira (o front) se liga na tomada (a API) para receber a eletricidade (os dados) do sistema elétrico (o back).

E o momento culminante — **usar a casa de ponta a ponta**: a família aciona um interruptor (toca "finalizar pedido" no front) → o sinal vai pela fiação (a API) → chega ao quadro elétrico e à rede (o back), que processa e busca energia da fonte (o banco) → e a luz **acende** (a tela do pedido confirmado). Todas as partes se coordenam para que um gesto simples funcione. Guarde: esta fase constrói o encanamento/elétrica (back-end), as tomadas padronizadas (API, com o contrato permitindo trabalho paralelo) e os acabamentos que a família usa (front-end) — e o sucesso é a casa **funcionando de ponta a ponta** quando alguém aciona um interruptor.

---

## 🧩 Conceitos fundamentais

### 1. As três camadas

Um sistema web típico tem três camadas ([[57-O-que-e-arquitetura-de-software]], [[58-MVC-camadas-e-separacao-de-responsabilidades]]):
- **Banco de dados:** guarda os dados (a fundação — [[115-Requisitos-casos-de-uso-e-banco-de-dados]]).
- **Back-end + API:** a lógica de negócio e a interface que expõe os dados ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]], [[72-O-que-e-uma-API-HTTP-REST-e-JSON]]).
- **Front-end:** as telas que o usuário toca ([[77-Frameworks-de-front-end]]).

Cada uma tem sua responsabilidade; juntas, formam o sistema.

> **Termo explicado — três camadas:** banco (dados), back-end/API (lógica e interface) e front-end (telas) — a arquitetura padrão de um sistema web, com responsabilidades separadas.

### 2. A API expõe o banco (com regras)

A **API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) é a "cara" do back-end: um conjunto de **endpoints** (`GET /restaurantes`, `POST /pedidos`) que o front usa para ler e gravar dados. Mas ela **não** expõe o banco cru — o **back-end** aplica as **regras de negócio** ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) entre a API e o banco (validar, calcular, checar permissões).

> **Termo explicado — API (a interface do back):** os endpoints que o front usa para acessar os dados e ações do sistema, com o back-end aplicando as regras de negócio entre a API e o banco.

### 3. O contrato da API (trabalho paralelo)

O **contrato da API** ([[75-Documentar-e-testar-APIs]], [[80-Construindo-a-API-da-SaborExpress]]) é o acordo sobre **como** a comunicação funciona: quais endpoints existem, qual JSON a requisição envia, qual a resposta e os códigos de status. Combinado o contrato, o **front e o back podem ser construídos em paralelo** por pessoas diferentes — cada um confia no contrato.

> **Termo explicado — contrato da API:** o acordo (endpoints, formatos, respostas) entre front e back; combiná-lo permite que os dois lados sejam desenvolvidos em paralelo, cada um confiando no formato acordado.

### 4. O back-end aplica as regras

O **back-end** ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) é onde moram a **lógica de negócio** (calcular total, aplicar frete grátis, checar disponibilidade) e a **segurança** ([[73-Autenticacao-e-autorizacao]]). Organizado em **camadas** ([[58-MVC-camadas-e-separacao-de-responsabilidades]]) — rota, controller, service, acesso a dados — ele recebe a requisição, processa e responde. **Nunca confia no front**: recalcula e revalida tudo.

> **Termo explicado — back-end (regras e segurança):** o programa no servidor que aplica a lógica de negócio e a segurança sobre os dados, organizado em camadas; nunca confia no que o front envia.

### 5. O front-end consome a API

O **front-end** ([[77-Frameworks-de-front-end]], [[78-Ligando-front-end-a-experiencia-do-usuario]]) implementa o protótipo ([[114-Da-ideia-ao-Figma]]) em componentes, e **consome a API**: dispara requisições, guarda os dados no estado, e mostra as telas — tratando os quatro estados (carregando, sucesso, erro, vazio — [[78-Ligando-front-end-a-experiencia-do-usuario]]). É a camada que o usuário vê e toca.

> **Termo explicado — front-end (consumir a API):** as telas (componentes) que o usuário usa, que consomem a API para buscar/enviar dados e tratam os estados de carregamento, sucesso, erro e vazio.

### 6. O fluxo de ponta a ponta

O momento em que tudo se junta ([[80-Construindo-a-API-da-SaborExpress]]): uma **requisição** atravessa as camadas — **front → API → back (validação, regras, acesso a dados) → banco → resposta → front**. Narrar esse fluxo inteiro é a prova de que as camadas formam um **sistema coordenado**, não peças soltas. É a visão de **sistema** que o Projeto Integrador ensina.

---

## ⚙️ Como funciona na prática

A construção das três camadas, passo a passo:

**Passo 1 — Projetar a API (o contrato) primeiro.** Antes de codar front e back, o time define o **contrato** ([[75-Documentar-e-testar-APIs]]): dos requisitos e do banco ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]), derivam-se os **endpoints** — `GET /restaurantes`, `GET /restaurantes/:id/pratos`, `POST /pedidos`, `GET /pedidos/:id`, `POST /auth/login` ([[73-Autenticacao-e-autorizacao]]) — com os formatos de requisição e resposta. Documentado o contrato, **front e back começam em paralelo**, cada um confiando no acordo. Projetar a API antes é o que destrava a velocidade.

**Passo 2 — Construir o back-end em camadas.** O back ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) implementa cada endpoint em **camadas** ([[58-MVC-camadas-e-separacao-de-responsabilidades]]): a **rota** recebe; um **middleware** valida o token ([[73-Autenticacao-e-autorizacao]]); o **controller** valida o input; o **service** aplica as regras de negócio (calcular total, frete grátis, checar disponibilidade); o **repositório/ORM** lê e grava no banco ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]). Operações críticas (criar pedido) usam **transações** ([[71-Confiabilidade-e-escala-do-banco]]). O back **recalcula tudo** e nunca confia no front ([[73-Autenticacao-e-autorizacao]]).

**Passo 3 — Construir o front-end.** O front ([[77-Frameworks-de-front-end]]) implementa o **protótipo** ([[114-Da-ideia-ao-Figma]]) em **componentes** (o `<CardRestaurante>`, o `<Carrinho>`), com **estado** governando as telas, e **consome a API** ([[78-Ligando-front-end-a-experiencia-do-usuario]]): dispara `GET /restaurantes`, guarda os dados, mostra os cards — tratando **carregando, sucesso, erro e vazio**. Como o contrato estava acordado, o front pôde ser construído **em paralelo** ao back (usando dados simulados que seguiam o contrato, até o back ficar pronto).

**Passo 4 — Integrar e seguir o fluxo de ponta a ponta.** Com front e back prontos, integram-se e seguem uma **requisição real** ([[80-Construindo-a-API-da-SaborExpress]]) — "finalizar pedido":
1. **Front:** João toca "finalizar"; dispara `POST /pedidos` com o JSON e o token; mostra carregando.
2. **API/rede:** a requisição HTTP chega ao servidor.
3. **Middleware:** valida o token de João ([[73-Autenticacao-e-autorizacao]]).
4. **Controller:** valida o formato do JSON.
5. **Service:** busca os pratos, **recalcula o total** (nunca confia no front!), aplica frete grátis, checa disponibilidade.
6. **Banco:** dentro de uma **transação**, grava o pedido e seus itens ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]).
7. **Resposta:** `201 Created` com o pedido.
8. **Front:** troca o carregando pela tela de acompanhamento.
As três camadas se coordenam — cada uma fez a sua parte, e o gesto simples de João funcionou.

**A prova do sistema coordenado.** Esse fluxo é o "clique" do Projeto Integrador: os conceitos que você estudou **separados** (API, back, front, banco, transação, autenticação) formam, juntos, um **sistema vivo**. Saber **narrar** essa jornada — o que cada camada faz, como os dados fluem, como a resposta vira tela — é a visão de **sistema** que distingue um engenheiro. A SaborExpress, aqui, deixou de ser especificação e virou um **app que funciona**.

**Um só back, muitos clientes.** A mesma API serve o app do cliente, o painel do restaurante e o app do entregador ([[80-Construindo-a-API-da-SaborExpress]]) — a lógica mora **uma vez** no back, e cada front a consome. É a razão de a lógica ficar centralizada no back, não duplicada em cada tela. Esta fase constrói o front do cliente, mas a API já nasce pensada para os três.

---

## 🍔 Aplicação na SaborExpress

Esta fase **é** a SaborExpress ganhando vida — a síntese de tudo o que o Volume 3 construiu, agora vista no fluxo completo do projeto.

**O contrato que destravou o paralelo.** No refinamento ([[45-Estimativas-planejamento-e-ferramentas]]), o time definiu o **contrato da API** ([[75-Documentar-e-testar-APIs]]) a partir dos requisitos e do banco ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]): `POST /pedidos` recebe `{ restauranteId, itens, enderecoId }` + token, responde `201` com o pedido ou erros (`400`, `401`, `409`). Documentado o contrato, **Diego (front) e Camila (back) trabalharam em paralelo** ([[116-API-back-end-e-front-end]]) — Diego construiu as telas usando respostas simuladas que seguiam o contrato, enquanto Camila construía o back para cumpri-lo. Ganharam semanas de velocidade.

**Camila construindo o back em camadas.** Camila implementou o back ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) em camadas ([[58-MVC-camadas-e-separacao-de-responsabilidades]]): a rota, o middleware de auth ([[73-Autenticacao-e-autorizacao]]), o controller, e o **service** com as regras — recalcular o total, aplicar "frete grátis acima de R$50", checar disponibilidade. A gravação usou uma **transação** ([[71-Confiabilidade-e-escala-do-banco]]) para o pedido e seus itens entrarem juntos. E aplicou a regra inegociável: **recalcular tudo, nunca confiar no front** ([[73-Autenticacao-e-autorizacao]]) — a mesma que depois recusou a fraude do total forjado ([[80-Construindo-a-API-da-SaborExpress]]).

**Diego construindo o front sobre o protótipo.** Diego implementou o **protótipo** ([[114-Da-ideia-ao-Figma]]) em **componentes React** ([[77-Frameworks-de-front-end]]) — o `<CardRestaurante>`, o `<Carrinho>` —, com estado governando as telas, **consumindo a API** ([[78-Ligando-front-end-a-experiencia-do-usuario]]). Tratou os **quatro estados** (carregando com esqueletos, sucesso com os cards, erro com "tentar de novo", vazio com "nenhum restaurante por perto") — inclusive resolvendo a tela de endereço que o protótipo revelou confusa ([[114-Da-ideia-ao-Figma]]). O front cumpriu o design **e** a boa UX.

**O fluxo de ponta a ponta de João.** Quando integraram, seguiram uma compra real da persona João ([[80-Construindo-a-API-da-SaborExpress]]): João toca "finalizar" → carregando → `POST /pedidos` com token → middleware valida João → controller valida o JSON → service recalcula (R$47 + R$8 = R$55; acima de R$50, **frete grátis** → R$47) e confere disponibilidade → transação grava o pedido #1234 → `201` → o front de João mostra a tela de acompanhamento. As **três camadas** se coordenaram para o gesto simples funcionar — o "clique" do Projeto Integrador.

**Um back, três apps.** A mesma API que o front de João consumia servia também o **painel do Sr. Alberto** (que via o pedido chegar) e o **app do entregador** ([[80-Construindo-a-API-da-SaborExpress]]) — a lógica morava **uma vez** no back. Quando o Sr. Alberto marcava "saiu para entrega", um `PATCH` disparava uma atualização em tempo real ([[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]]) ao app de João. Um back central, muitos clientes — a arquitetura nascida do contrato.

**De especificação a app que funciona.** Ao fim desta fase, a SaborExpress **existia de verdade**: um cliente podia abrir o app, ver restaurantes (dados reais da API, do banco), fazer um pedido (atravessando as três camadas), e acompanhá-lo. Os conceitos estudados isolados ao longo do Volume 3 — API, back, front, banco, transação, autenticação, estados de UI — formavam agora um **sistema vivo e coordenado**. Faltava versionar, testar, empacotar ([[117-Git-PR-testes-e-Docker]]) e colocar no ar ([[118-Deploy-cloud-producao-e-monitoramento]]) — mas o coração já batia.

Moral: esta fase construiu as **três camadas** da SaborExpress e as fez funcionar juntas — o **contrato** destravou o trabalho paralelo de Diego e Camila, o **back** aplicou as regras em camadas (recalculando tudo, sem confiar no front), o **front** implementou o protótipo consumindo a API (tratando os estados), e uma **requisição de ponta a ponta** provou que tudo se coordena. A SaborExpress deixou de ser especificação e virou um **app que funciona** — o clique de que os 119 capítulos formam um sistema vivo.

---

## 🏢 Como isso acontece em uma empresa

- **A arquitetura de três camadas é o padrão.** A imensa maioria dos sistemas web segue banco + back/API + front, com responsabilidades separadas ([[58-MVC-camadas-e-separacao-de-responsabilidades]]). É o modelo mental básico de qualquer engenheiro web.
- **API-first destrava o trabalho paralelo.** Definir o contrato da API antes ([[75-Documentar-e-testar-APIs]]) permite times de front e back trabalharem em paralelo — um ganho de velocidade tão grande que virou estratégia ([[80-Construindo-a-API-da-SaborExpress]]).
- **"Pensar em fluxo" é habilidade sênior.** Narrar uma requisição por todas as camadas — e saber onde algo quebrou — distingue o engenheiro do "programador de tarefas". É testado em entrevistas de system design ([[111-O-processo-seletivo]]).
- **A segurança no back é inegociável.** Recalcular preços, revalidar permissões, nunca confiar no cliente — empresas que ignoram isso sofrem fraudes ([[73-Autenticacao-e-autorizacao]]).
- **Uma API, muitos clientes.** Web, iOS, Android, painéis parceiros — todos consomem a mesma API. Por isso a lógica mora centralizada no back ([[80-Construindo-a-API-da-SaborExpress]]).
- **Front e back como especializações (que se falam).** Muitos times têm devs de front e de back, colaborando pelo contrato. Devs full-stack ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) transitam entre os dois. A colaboração ([[109-Colaboracao-humana]]) pelo contrato é essencial.
- **Este fluxo é o "hello world" real do desenvolvimento web.** Toda aplicação web é, no fundo, variações dessa mesma jornada (requisição → auth → regras → dados → resposta → tela). Dominá-la é dominar o essencial.

---

## ⚠️ Erros comuns

- **Não definir o contrato antes.** Construir front e back sem um contrato acordado, gerando integração dolorosa e retrabalho. Defina a API primeiro ([[75-Documentar-e-testar-APIs]]).
- **Confiar nos valores do front.** Aceitar o total, o preço ou as permissões que vieram na requisição. O back **precisa** recalcular e revalidar ([[73-Autenticacao-e-autorizacao]]).
- **Misturar as camadas.** Enfiar regra de negócio no controller, ou SQL na rota. Perde-se testabilidade e clareza ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- **Esquecer a transação.** Gravar o pedido e os itens sem transação; se falhar no meio, sobra dado corrompido ([[71-Confiabilidade-e-escala-do-banco]]).
- **Front só com o caminho feliz.** Não tratar carregando, erro e vazio. Deixa o usuário perdido ([[78-Ligando-front-end-a-experiencia-do-usuario]]).
- **Códigos de status errados.** Responder `200` para tudo, inclusive erros. O status é parte do contrato ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]).
- **Não pensar no fluxo inteiro.** Focar só na "sua" camada e ignorar como a requisição chega e a resposta é usada. Bugs de integração nascem nas fronteiras.
- **Duplicar lógica em cada cliente.** Repetir o cálculo do total no app iOS, Android e web em vez de centralizá-lo no back. Vira inconsistência garantida.

---

## 💡 Dicas profissionais

- **Projete o contrato da API primeiro.** Recursos, endpoints, formatos, códigos de resposta — documentados ([[75-Documentar-e-testar-APIs]]). Libera o trabalho paralelo e evita retrabalho.
- **Construa o back em camadas.** Rota, controller, service, dados — cada um com sua responsabilidade. Facilita testar ([[117-Git-PR-testes-e-Docker]]) e evoluir ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- **Recalcule tudo que importa no back.** Preços, totais, permissões. Nunca confie no front. Faça disso um reflexo ([[73-Autenticacao-e-autorizacao]]).
- **Envolva operações compostas em transações.** Pedido + itens juntos, tudo-ou-nada ([[71-Confiabilidade-e-escala-do-banco]]).
- **No front, trate os quatro estados.** Carregando, sucesso, erro, vazio. É a diferença entre um app amador e um profissional ([[78-Ligando-front-end-a-experiencia-do-usuario]]).
- **Aprenda a narrar o fluxo completo.** Treine descrever a jornada de uma requisição por todas as camadas. É a habilidade de "pensar em sistemas" que define um engenheiro.
- **Centralize a lógica no back.** Uma regra, um lugar, muitos clientes. Nunca duplique entre apps.
- **Colabore pelo contrato.** Front e back se alinham pelo contrato da API. A comunicação clara ([[109-Colaboracao-humana]]) evita os bugs de fronteira.

---

## 🎈 Curiosidades

- A famosa pergunta de entrevista **"o que acontece quando você digita uma URL e aperta Enter?"** percorre exatamente as camadas deste capítulo (e mais): DNS, HTTP, o servidor, o back-end, o banco, a resposta, a renderização no front. Ela é usada justamente porque a resposta completa revela se o candidato entende o **sistema inteiro** — a visão de fluxo que o Projeto Integrador ensina.
- A ideia de **separar o front-end do back-end** por uma API foi uma evolução importante: nos primórdios da web, o servidor gerava as páginas HTML completas e as enviava prontas (sem uma API separada). A separação em uma API que serve **dados** (JSON) consumidos por um front-end independente ([[77-Frameworks-de-front-end]]) foi o que permitiu que o **mesmo back** servisse web, mobile e parceiros — uma mudança arquitetural que definiu o desenvolvimento moderno.
- O princípio de **"nunca confiar no cliente"** é tão central que os primeiros exercícios de qualquer curso de segurança demonstram como é trivial, com as ferramentas do próprio navegador, alterar os dados que o front envia (o preço, a quantidade). Ver isso na prática costuma ser um momento revelador para iniciantes, que percebem por que o back **precisa** recalcular tudo — a base da fraude que a SaborExpress recusou.
- A prática de front e back trabalharem em paralelo usando dados **simulados (mocks)** que seguem o contrato é tão comum que existem ferramentas dedicadas a criar "servidores falsos" a partir da documentação da API (OpenAPI — [[75-Documentar-e-testar-APIs]]). Isso permite ao front-end desenvolver e testar telas inteiras **antes** de o back-end existir — a materialização do poder do contrato.
- Há um debate recorrente e saudável sobre **quanta lógica** deve ficar no front vs. no back. O consenso — que a SaborExpress segue — é que a **validação e as regras críticas** (dinheiro, permissões, integridade) ficam **sempre** no back (por segurança), enquanto o front pode ter validações de **conveniência** (feedback rápido ao usuário) que **duplicam** as do back sem substituí-las. É a lição do "front valida por UX, back valida por segurança".

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Três camadas** | Banco (dados), back-end/API (lógica), front-end (telas). |
| **API** | Os endpoints que o front usa para acessar o back. |
| **Contrato da API** | O acordo (endpoints, formatos, respostas) entre front e back. |
| **Back-end** | O programa no servidor com a lógica e a segurança. |
| **Front-end** | As telas que o usuário toca, que consomem a API. |
| **Camadas do back** | Rota → controller → service → acesso a dados. |
| **Middleware** | Código que intercepta a requisição antes do controller (ex.: auth). |
| **Transação** | Operações no banco que acontecem tudo-ou-nada. |
| **Fluxo de ponta a ponta** | A jornada de uma requisição por todas as camadas, e a volta. |
| **Mock (simulação)** | Dados falsos que seguem o contrato, para o front trabalhar sozinho. |

---

## 📝 Resumo

- Esta é a fase **central** do Projeto Integrador: erguer as **três camadas** que fazem o sistema funcionar — o **banco** (a fundação, já pronta — [[115-Requisitos-casos-de-uso-e-banco-de-dados]]), o **back-end com sua API** (lógica e interface), e o **front-end** (as telas). É onde a SaborExpress deixa de ser especificação e vira um **app que funciona**.
- Projeta-se a **API (o contrato)** primeiro ([[75-Documentar-e-testar-APIs]]): os endpoints, formatos e respostas derivados dos requisitos e do banco. O contrato acordado permite **front e back serem construídos em paralelo** (o front usa dados simulados que seguem o contrato até o back ficar pronto) — um grande ganho de velocidade.
- O **back-end** ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) é construído em **camadas** (rota → middleware de auth → controller → service → dados): aplica as **regras de negócio** (recalcular total, frete grátis, checar disponibilidade), usa **transações** em operações críticas ([[71-Confiabilidade-e-escala-do-banco]]), e **nunca confia no front** — recalcula e revalida tudo ([[73-Autenticacao-e-autorizacao]]). O **front-end** ([[77-Frameworks-de-front-end]]) implementa o protótipo em componentes, consome a API, e trata os **quatro estados** (carregando, sucesso, erro, vazio — [[78-Ligando-front-end-a-experiencia-do-usuario]]).
- O momento culminante é seguir uma **requisição de ponta a ponta** ("finalizar pedido"): front → API → middleware (auth) → controller (validação) → service (regras, recálculo) → banco (transação) → resposta → front (tela de acompanhamento). As três camadas se **coordenam** para o gesto simples funcionar.
- Este é o **"clique" do Projeto Integrador**: os conceitos estudados **separados** ao longo do Volume 3 (API, back, front, banco, transação, autenticação, estados) formam, juntos, um **sistema vivo e coordenado**. Saber **narrar** esse fluxo é a visão de **sistema** que define um engenheiro. E a mesma API serve **muitos clientes** (app do cliente, painel do restaurante, app do entregador) — a lógica centralizada uma vez no back. A SaborExpress agora **funciona**; falta versionar, testar, empacotar ([[117-Git-PR-testes-e-Docker]]) e colocar no ar ([[118-Deploy-cloud-producao-e-monitoramento]]).

---

## ☑️ Checklist de aprendizado

- [ ] Explico as três camadas (banco, back/API, front) e suas responsabilidades.
- [ ] Entendo como o contrato da API permite front e back trabalharem em paralelo.
- [ ] Sei construir o back em camadas, aplicando regras e sem confiar no front.
- [ ] Sei construir o front consumindo a API e tratando os quatro estados.
- [ ] Narro uma requisição de ponta a ponta pelas camadas.
- [ ] Vejo os conceitos isolados formando um sistema coordenado.

---

## ✏️ Exercícios

**1.** Com a analogia da casa (encanamento, tomadas, acabamentos), explique o back-end, a API e o front-end.

**2.** Como o **contrato da API** permite front e back serem construídos em paralelo? O que o front usa enquanto o back não está pronto?

**3.** Narre a requisição "finalizar pedido" atravessando todas as camadas, do toque de João à tela de acompanhamento.

**4.** Por que o back-end **recalcula o total** em vez de confiar no valor enviado pelo front? O que isso previne?

**5. (Reflexão)** Este capítulo é chamado de "o clique do Projeto Integrador". Explique por que ver as três camadas funcionando juntas (num fluxo de ponta a ponta) é o momento que prova que os conceitos isolados formam um sistema vivo.

---

## 💬 Respostas comentadas

**1.** Na analogia da casa: o **back-end** é o **encanamento e a parte elétrica** — o sistema por trás das paredes que **faz a casa funcionar** (a água que chega, a eletricidade que circula), invisível ao morador mas essencial; é a lógica que ninguém vê mas que aplica as regras, processa, e busca/guarda dados na fundação (o banco). A **API** são as **tomadas, torneiras e interruptores** — os **pontos de acesso padronizados** onde a família interage com o encanamento e a elétrica sem precisar saber como funcionam por dentro (você só "liga na tomada", que tem formato padrão); são os endpoints onde o front "se liga" ao back, e o **contrato da API** é como a **norma dos padrões elétricos**, que permite o eletricista (back) e o instalador de eletrodomésticos (front) trabalharem em paralelo, cada um confiando no formato padrão da tomada. O **front-end** são os **acabamentos que a família toca** — os armários, luminárias, eletrodomésticos e a decoração que o morador vê e usa, e que "se ligam nas tomadas" (consomem a API) para funcionar (a geladeira/front se liga na tomada/API para receber a eletricidade/dados do sistema elétrico/back). Juntos, formam a casa habitável: o back faz funcionar por trás, a API é a interface padronizada de acesso, e o front é o que o usuário efetivamente vê e usa.

**2.** O **contrato da API** permite front e back trabalharem em paralelo porque ele **acorda de antemão** exatamente como a comunicação entre os dois vai funcionar: quais endpoints existem, qual JSON a requisição envia, qual JSON e quais códigos de status a resposta retorna. Com esse acordo definido e documentado, cada lado sabe **o que esperar do outro** sem precisar que o outro esteja pronto — é como combinar o formato padrão da tomada antes de o eletricista e o marceneiro começarem, para que cada um trabalhe confiando naquele formato. Assim, **Diego (front) e Camila (back) podem construir simultaneamente**: Camila constrói o back para **cumprir** o contrato (fazer o `POST /pedidos` receber e responder exatamente o que foi acordado), enquanto Diego constrói as telas do front para **consumir** o contrato (enviar e tratar exatamente aquele formato). Nenhum precisa esperar o outro terminar. Enquanto o back **não está pronto**, o front usa **dados simulados (mocks)** que **seguem o contrato** — ou seja, respostas falsas com o formato exato que a API real vai retornar. Diego pode construir e testar telas inteiras (a lista de restaurantes, o carrinho, a tela de confirmação) usando essas respostas simuladas, e quando o back de Camila fica pronto, basta **apontar o front para a API real** — como o formato é o mesmo (ambos seguiram o contrato), tudo se encaixa. Sem o contrato, o front teria que **esperar** o back ficar pronto para saber o formato dos dados (trabalho sequencial, lento), e a integração no fim seria dolorosa (surpresas de formato). Com o contrato, o trabalho é paralelo e a integração é suave — um grande ganho de velocidade.

**3.** A requisição "finalizar pedido" de João, camada por camada: **(1) Front:** João toca "finalizar" na tela do carrinho; o front dispara `POST /pedidos` com o JSON dos itens e o token de autenticação, e mostra o estado de **carregando**. **(2) API/rede:** a requisição HTTP viaja pela internet e chega ao servidor. **(3) Middleware de autenticação:** valida o token JWT de João — confirma que ele está logado e identifica quem é; se o token fosse inválido, cortaria aqui com `401`. **(4) Controller:** extrai e valida o **formato** do JSON (os itens estão bem formados? o endereço foi informado?); se malformado, `400`. **(5) Service (regras de negócio):** busca os pratos no banco, **recalcula o total** a partir dos preços reais (nunca confia no valor que veio do front!) — R$47 de itens + R$8 de frete = R$55; como passou de R$50, aplica **frete grátis** → total R$47; confere que o restaurante está aberto e os itens disponíveis; se um item acabou, `409`. **(6) Banco:** dentro de uma **transação** (tudo-ou-nada), insere o `pedido` #1234 e seus `itens_pedido`; se algo falhar no meio, rollback (nada gravado pela metade). **(7) Resposta:** o service retorna o pedido, o controller responde `201 Created` com `{ id: 1234, total: 47, status: "recebido" }`. **(8) Front:** recebe a resposta, troca o estado de carregando pela **tela de acompanhamento** do pedido #1234, onde João vê o status "recebido" e a estimativa de entrega. As três camadas (front, back/API, banco) se coordenaram — cada uma fez a sua parte no tempo certo — para que o gesto simples de João ("finalizar") funcionasse de ponta a ponta.

**4.** O back-end recalcula o total em vez de confiar no valor enviado pelo front porque **o front é inspecionável e adulterável** — o código que roda no navegador ou celular de João pode ser inspecionado e **modificado** por qualquer pessoa com as ferramentas do desenvolvedor. Se o back simplesmente **confiasse** no total que veio na requisição, um cliente mal-intencionado poderia abrir essas ferramentas e **alterar o valor** antes de enviar — mudando o total do pedido para R$1, ou forjando "frete grátis" indevido —, e o back gravaria esse valor falso, causando **fraude** (comida paga por uma fração do preço). Por isso o back **ignora** o total que o front mandou e o **recalcula do zero** a partir dos preços **reais** dos pratos no banco (a fonte da verdade), aplicando as regras (frete grátis acima de R$50) por conta própria. Isso **previne fraude e garante a integridade** dos valores: não importa o que o cliente envie, o valor cobrado é sempre o **correto**, calculado pelo servidor confiável. O front até mostra o total ao usuário (por conveniência, para ele ver antes de confirmar), mas esse valor é apenas uma **exibição** — a fonte da verdade é o recálculo do back. É o princípio inegociável "**nunca confie no cliente / never trust user input**" ([[73-Autenticacao-e-autorizacao]]): tudo que importa (preço, permissões, integridade) é sempre revalidado no servidor, que é o único ambiente controlado e confiável. Foi exatamente isso que, na SaborExpress, recusou a fraude quando a QA testou adulterar o total para R$1 — o back recalculou R$47 e a fraude falhou.

**5.** Este capítulo é "o clique do Projeto Integrador" porque ver as três camadas funcionando juntas num **fluxo de ponta a ponta** é o momento em que os conceitos deixam de ser **tópicos isolados** e se revelam como **partes de um todo coordenado** — que é a tese central do Projeto Integrador e uma das compreensões mais importantes de um engenheiro. Ao longo do Volume 3, você estudou cada peça **separadamente**: o que é uma API ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]), o que é um banco ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]), o que é um back-end ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]), o que é um front-end ([[77-Frameworks-de-front-end]]), o que é uma transação, o que é autenticação. Cada um fez sentido isoladamente, mas eram **conceitos soltos** na sua cabeça. O "clique" acontece quando você segue uma **requisição real** (João finalizando um pedido) atravessando **todas** essas peças em sequência — o front dispara, a API transporta, o middleware autentica, o controller valida, o service aplica as regras e recalcula, o banco grava numa transação, a resposta sobe e vira tela — e percebe que **cada conceito que você estudou isolado tem um papel específico numa coreografia maior**, e que juntos eles formam um **sistema vivo** que faz algo real acontecer (comida pedida e a caminho). É a diferença entre conhecer as peças de um relógio e ver o relógio **funcionando** — entender como as engrenagens se encaixam e movem os ponteiros. Esse "pensar em fluxo" (ver e narrar a jornada completa de uma requisição pelas camadas) é a **visão de sistema** que distingue um engenheiro de um "programador de tarefas": o programador de tarefas conhece sua peça (só o front, ou só o back); o engenheiro entende o **sistema inteiro** — como as peças se conectam, onde os dados fluem, onde algo pode quebrar nas fronteiras entre camadas, e por que cada decisão (recalcular no back, usar transação, tratar os estados no front) importa para o todo. Por isso este momento prova a tese dos 119 capítulos: eles não são tópicos desconexos, mas um **fluxo coerente** que transforma uma ideia num sistema funcionando — e ver a SaborExpress ganhar vida, com as três camadas se coordenando para um gesto simples funcionar, é a demonstração concreta de que o conhecimento fragmentado se tornou compreensão de sistema. Esse é o clique que faz de você um engenheiro, não apenas alguém que conhece tecnologias.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[115-Requisitos-casos-de-uso-e-banco-de-dados]] — a fundação de dados sobre a qual estas camadas se erguem.
- **Próximo (linear):** [[117-Git-PR-testes-e-Docker]] — versionar, colaborar, testar e empacotar o que construímos.
- **Síntese de:** [[80-Construindo-a-API-da-SaborExpress]], [[72-O-que-e-uma-API-HTTP-REST-e-JSON]], [[79-O-que-roda-no-servidor-linguagens-e-frameworks]], [[77-Frameworks-de-front-end]] e [[78-Ligando-front-end-a-experiencia-do-usuario]].
- **Segurança:** [[73-Autenticacao-e-autorizacao]] (nunca confiar no front) e [[71-Confiabilidade-e-escala-do-banco]] (transações).

---

> 🧭 **Você está aqui:** Volume 5 → Módulo 36 → **Capítulo 116 de 119**.
