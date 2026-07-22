# Capítulo 79 — O que roda no servidor: linguagens e frameworks

> **Volume 3 — Desenvolvimento de Software** · Módulo 23 — Back-end
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é o **back-end** e qual sua responsabilidade no sistema.
- Compreender o que um **servidor** faz ao receber uma requisição (o ciclo request→response).
- Conhecer as principais **linguagens e frameworks** de back-end e suas forças (**Node.js**, **Python/Django**, **Java/Spring**, **C#/.NET**, entre outros).
- Entender o que **todo** back-end faz, independentemente da linguagem (rotas, lógica, dados, autenticação).
- Saber escolher uma stack de back-end de forma pragmática.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] (o back expõe uma API).
- Ter lido [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] (o back fala com o banco).
- Ajuda ter lido [[57-O-que-e-arquitetura-de-software]] e [[58-MVC-camadas-e-separacao-de-responsabilidades]].

---

## 📖 Introdução

Até aqui você viu o front-end — o que roda no **navegador do usuário**. Mas o front é só a metade visível. Quando você abre a SaborExpress e a lista de restaurantes aparece, o front-end **pediu** esses dados a alguém: o **back-end**, o programa que roda **num servidor**, longe do celular do usuário, e que guarda a lógica e os dados do sistema. É o "cérebro nos bastidores". Este capítulo abre essa caixa: o que é o back-end, o que ele faz quando recebe uma requisição, e com quais **linguagens e frameworks** ele é construído.

O back-end tem responsabilidades que **não podem** ficar no front, por dois motivos. **Segurança:** o código do front-end é enviado ao navegador do usuário e pode ser inspecionado e adulterado — então nada sensível (validar pagamentos, checar permissões, guardar senhas) pode confiar só no front ([[73-Autenticacao-e-autorizacao]]). **Fonte da verdade:** os dados precisam de um lugar central e confiável (o banco — [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]), não espalhados por milhares de celulares. O back-end é quem **recebe requisições**, aplica as **regras de negócio**, fala com o **banco** e devolve respostas — geralmente via uma **API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]).

E aqui vem a mensagem central, que ecoa o capítulo de frameworks de front-end ([[77-Frameworks-de-front-end]]): existem **muitas** linguagens e frameworks de back-end (Node.js, Python/Django, Java/Spring, C#/.NET, Ruby/Rails, PHP/Laravel, Go...), cada um com suas forças — mas **todos fazem essencialmente a mesma coisa**: recebem uma requisição, roteiam para o código certo, aplicam lógica, acessam dados e respondem. Dominar os **conceitos** (rota, controller, service, acesso a dados, autenticação) é o que vale; a linguagem é detalhe que você aprende conforme o projeto. Este capítulo te dá esse mapa — para você entender qualquer back-end, e escolher uma stack sem se perder no debate de "qual linguagem é a melhor".

---

## 🧠 Analogia

Pense no back-end como a **cozinha de um restaurante**, e o servidor como o **prédio** onde ela funciona.

O **cliente** (o usuário) senta à mesa e faz um pedido ao **garçom** (o front-end — [[78-Ligando-front-end-a-experiencia-do-usuario]]). O garçom leva o pedido à **cozinha** (o back-end). Na cozinha:

- Há uma **porta de entrada de pedidos** onde os pedidos chegam e são **direcionados** à estação certa (grelha, massas, sobremesas). Isso são as **rotas**: `GET /restaurantes` vai para o código dos restaurantes, `POST /pedidos` vai para o código de pedidos.
- Os **cozinheiros seguem receitas e regras** ("o prato X leva tais ingredientes", "não servir álcool a menores"). Essas são as **regras de negócio**.
- Há uma **despensa** de onde tiram e guardam ingredientes. É o **banco de dados** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]).
- Há um **segurança na porta** que verifica quem pode entrar e o que pode fazer. É a **autenticação e autorização** ([[73-Autenticacao-e-autorizacao]]).
- No fim, o prato pronto **volta** pelo garçom ao cliente. É a **resposta** (o JSON).

Agora o ponto da analogia: existem cozinhas **italianas, japonesas, brasileiras** — cada uma com técnicas e ingredientes próprios (as **linguagens/frameworks**). Mas **toda** cozinha, seja qual for a culinária, recebe pedidos, direciona à estação certa, segue receitas, usa a despensa, controla quem entra e devolve o prato. A **estrutura** é a mesma; muda o "tempero". Aprender a **operar uma cozinha** (os conceitos) te deixa cozinhar em qualquer culinária; decorar só as receitas de uma não. Guarde: o back-end é a cozinha — e todas as cozinhas fazem o mesmo, com temperos diferentes.

---

## 🧩 Conceitos fundamentais

### 1. O que é o back-end

O **back-end** é a parte do sistema que roda **num servidor** (não no dispositivo do usuário) e é responsável pela **lógica de negócio**, pelo **acesso aos dados** e pela **segurança**. Ele **não tem interface visual** — sua "cara" é a **API** que expõe ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]). O front-end é o cliente do back-end.

> **Termo explicado — back-end:** o programa que roda no servidor, guarda a lógica e os dados do sistema, aplica as regras e a segurança, e responde a requisições (normalmente via API). O "cérebro nos bastidores".

### 2. O que é um servidor

Um **servidor** é, na essência, um **computador** (geralmente na nuvem — [[57-O-que-e-arquitetura-de-software]]) que fica **ligado o tempo todo**, esperando requisições e respondendo a elas. "Servidor" também designa o **programa** (o back-end) que roda nesse computador. Enquanto o front roda em milhões de dispositivos diferentes, o back roda de forma **centralizada** e controlada.

> **Termo explicado — servidor:** computador (normalmente na nuvem) sempre ligado que hospeda o back-end e responde a requisições; também o próprio programa que atende essas requisições.

### 3. O ciclo request → response

O coração do back-end é um ciclo simples que se repete milhões de vezes:

1. Chega uma **requisição** HTTP (ex.: `GET /restaurantes` — [[72-O-que-e-uma-API-HTTP-REST-e-JSON]]).
2. O back **roteia** para o código responsável (a "rota" certa).
3. Esse código aplica a **lógica** (validações, regras de negócio) e, se preciso, **fala com o banco** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]).
4. Monta a **resposta** (geralmente JSON) e a devolve, com um **status HTTP** (200 ok, 404 não achou, 500 erro...).

> **Termo explicado — request/response:** o padrão de trabalho do back-end — recebe uma requisição, processa (lógica + dados), devolve uma resposta com status. Repete-se a cada chamada.

### 4. O que TODO back-end faz (independente da linguagem)

Não importa a linguagem — todo back-end de aplicação faz, essencialmente, estas coisas:

- **Rotas (routing):** mapear cada URL+método a um pedaço de código (`POST /pedidos` → criar pedido).
- **Controllers:** receber a requisição, extrair os dados, orquestrar a resposta.
- **Lógica de negócio (services):** as regras do sistema ("um pedido acima de R$50 tem frete grátis"). O coração do valor.
- **Acesso a dados:** ler/gravar no banco ([[68-SQL-na-pratica]]), muitas vezes via um **ORM** (que traduz objetos do código em linhas do banco).
- **Autenticação e autorização:** quem é o usuário e o que pode fazer ([[73-Autenticacao-e-autorizacao]]).
- **Validação e tratamento de erros:** rejeitar dados inválidos, responder erros de forma clara.

Essa estrutura reflete a **separação em camadas** do [[58-MVC-camadas-e-separacao-de-responsabilidades]]. Reconhecê-la em qualquer projeto é o que te faz "ler" um back-end desconhecido rápido.

> **Termo explicado — ORM (Object-Relational Mapping):** ferramenta que traduz entre os objetos do código e as tabelas/linhas do banco relacional, para você manipular dados sem escrever SQL na mão o tempo todo.

### 5. As principais linguagens e frameworks

Cada stack tem forças; nenhuma é "a certa" universalmente:

- **JavaScript/TypeScript — Node.js** (com **Express**, **NestJS**): mesma linguagem do front (produtividade de time full-stack), ótimo para I/O e tempo real, ecossistema gigante. Muito popular em startups.
- **Python — Django / Flask / FastAPI:** fácil de ler, produtivo, forte em dados/IA. Django traz "tudo incluído"; FastAPI é moderno e rápido para APIs.
- **Java — Spring (Boot):** robusto, maduro, altíssima performance e escala. Padrão em grandes empresas, bancos, sistemas corporativos.
- **C# — .NET (ASP.NET):** o "Java da Microsoft", excelente ferramental, forte no mundo corporativo e Windows.
- **Ruby — Rails:** priorizou produtividade e "convenção sobre configuração"; popularizou muitos padrões web. Ótimo para MVPs.
- **PHP — Laravel:** roda grande parte da web (incl. WordPress); Laravel modernizou o PHP.
- **Go / Rust:** modernos, altíssima performance, usados em infraestrutura e serviços críticos.

> **Termo explicado — framework de back-end:** conjunto de ferramentas e estrutura que já traz rotas, acesso a dados, segurança e organização prontos, para você não construir tudo do zero (ex.: Express, Django, Spring, .NET).

O ponto: todos implementam rotas, controllers, lógica, dados e autenticação. Muda a sintaxe e a "cultura", não a essência.

---

## ⚙️ Como funciona na prática

Como se constrói e se escolhe um back-end, na vida real:

**A estrutura em camadas.** Um back-end bem organizado segue camadas ([[58-MVC-camadas-e-separacao-de-responsabilidades]]): a **rota** recebe `POST /pedidos` e chama o **controller**; o controller valida o input e chama o **service** (a regra de negócio: calcula total, aplica frete grátis, verifica estoque); o service usa a **camada de dados** (repository/ORM) para gravar no **banco**; a resposta sobe de volta. Essa separação — rota, controller, service, dados — é quase universal, com nomes que variam por framework. Reconhecê-la é o mapa que te orienta em qualquer projeto.

**O papel do ORM.** Em vez de escrever SQL cru em todo lugar ([[68-SQL-na-pratica]]), a maioria dos back-ends usa um **ORM** (Prisma, TypeORM no Node; Django ORM; Hibernate no Java; Entity Framework no .NET). Você escreve `pedido.save()` e o ORM gera o SQL. Isso agiliza e reduz erros — mas o dev **precisa entender o SQL por baixo** ([[68-SQL-na-pratica]]), porque ORMs mal usados geram queries lentas (o problema "N+1", por exemplo).

**Escolher a stack — de forma pragmática.** A escolha real raramente é "qual linguagem é tecnicamente superior". Pesa: **o que o time já domina** (o maior fator!), **o ecossistema** para o problema (Python para IA/dados, Node para tempo real, Java/.NET para corporativo pesado), **contratação** (quão fácil achar devs), e **maturidade** para o caso. Um time que manda bem em Python fará um produto melhor em Django do que num Go que mal conhece. Registre a decisão num ADR ([[57-O-que-e-arquitetura-de-software]]).

**Onde o back roda.** O back precisa de um lugar para rodar: um **servidor** na nuvem (AWS, Google Cloud, Azure), geralmente **empacotado em contêiner** (Docker) e possivelmente orquestrado (Kubernetes) — assuntos do Volume 4 ([[57-O-que-e-arquitetura-de-software]]). Também existem opções **serverless** (funções que rodam sob demanda) e **BaaS** (backend-as-a-service, como Firebase/Supabase) que reduzem a infraestrutura para times pequenos.

**O back nunca confia no front.** Regra de ouro repetida: tudo que importa (validar dados, checar permissões, calcular preços, processar pagamentos) acontece **no back**, porque o front pode ser inspecionado e adulterado ([[73-Autenticacao-e-autorizacao]]). O front valida por **UX** (feedback rápido); o back valida por **segurança e integridade**. Os dois, sempre.

**Full-stack e a vantagem do JavaScript.** Um atrativo do **Node.js** é usar **a mesma linguagem** (JavaScript/TypeScript) no front e no back — um dev "full-stack" transita entre os dois sem trocar de idioma, e é possível compartilhar código (tipos, validações). Não é obrigatório, mas explica boa parte da popularidade do Node em startups.

---

## 🍔 Aplicação na SaborExpress

O back-end da SaborExpress é o cérebro que o app inteiro consome. Veja as decisões e a estrutura do time.

**A escolha da stack (pragmática, não ideológica).** O time escolheu **Node.js com TypeScript** (framework **NestJS**) para o back — não porque "JavaScript é a melhor linguagem", mas por razões práticas: (1) o front já era **React/TypeScript** ([[77-Frameworks-de-front-end]]), então usar a **mesma linguagem** no back deixou o time **full-stack**, compartilhando tipos e validações; (2) era fácil **contratar** devs JS; (3) o app é muito de **I/O e tempo real** (rastreio de pedido ao vivo — [[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]]), no que o Node brilha. A back-end **Camila** registrou isso num **ADR** ([[57-O-que-e-arquitetura-de-software]]), deixando claro o "porquê" — e reconhecendo que Python ou Java seriam escolhas igualmente válidas, mas piores **para este time**.

**A estrutura em camadas de um pedido.** Quando o cliente finaliza um pedido, o back processa em camadas ([[58-MVC-camadas-e-separacao-de-responsabilidades]]):
1. **Rota:** `POST /pedidos` chega e é direcionada ao controller de pedidos.
2. **Controller:** extrai os itens e o endereço do JSON, valida o formato, confere que o usuário está autenticado ([[73-Autenticacao-e-autorizacao]]).
3. **Service (a regra de negócio):** calcula o total, aplica a regra "acima de R$50, frete grátis", verifica que o restaurante está aberto e os itens disponíveis, define o status inicial "recebido".
4. **Camada de dados (ORM):** grava o pedido no **banco** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]) dentro de uma **transação** ([[71-Confiabilidade-e-escala-do-banco]]) — para não gravar um pedido pela metade.
5. **Resposta:** devolve `201 Created` com o pedido e seu id, que o front usa para levar o cliente à tela de acompanhamento.

**Por que essa lógica NÃO pode estar no front.** O cálculo do total, a regra do frete grátis e a checagem de disponibilidade **têm** que estar no back: se estivessem no front, um cliente mal-intencionado poderia abrir as ferramentas do navegador e **alterar o preço para R$0** ou forjar "frete grátis". O front até mostra o total para conveniência, mas o **back recalcula e confia só em si mesmo** — a lição de segurança do [[73-Autenticacao-e-autorizacao]] em ação.

**O ORM e o cuidado com o SQL.** O time usa um ORM (Prisma) para não escrever SQL em todo lugar. Mas quando a tela de restaurantes ficou lenta, Camila descobriu um problema **N+1** (o ORM fazia uma query para a lista + uma query por restaurante para pegar a nota). Ela só resolveu porque **entendia o SQL por baixo** ([[68-SQL-na-pratica]], [[71-Confiabilidade-e-escala-do-banco]]) — provando que o ORM agiliza, mas não dispensa entender o banco.

**O mesmo back, muitos clientes.** O back-end da SaborExpress serve, pela **mesma API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]), três clientes: o app do cliente (React), o app do entregador e o painel do restaurante ([[75-Documentar-e-testar-APIs]]). Isso só é possível porque a lógica mora **centralizada no back**, não duplicada em cada front — a razão de existir de um back-end.

Moral: o back-end da SaborExpress é a cozinha central onde as regras, os dados e a segurança realmente moram. A stack (Node/TypeScript) foi escolha **pragmática** do time, não ideológica; a estrutura (rota→controller→service→dados) é a mesma que existiria em qualquer linguagem; e o princípio inegociável é que **nada que importa se decide no front** — a cozinha é quem manda.

---

## 🏢 Como isso acontece em uma empresa

- **A stack segue o time e o problema, não a moda.** Empresas escolhem back-end pelo que o time domina, o ecossistema do problema e a facilidade de contratar — e mantêm a escolha por anos. Trocar de linguagem de back é caríssimo.
- **Cada linguagem tem seu "território".** Java/.NET dominam grandes corporações e bancos; Python reina em dados/IA; Node é forte em startups e tempo real; Go/Rust em infraestrutura. Saber onde cada uma brilha orienta a carreira.
- **Back-end é onde mora o risco.** Segurança, dados dos usuários, dinheiro, integridade — tudo passa pelo back. Por isso back-end sênior é altamente valorizado e envolve muito além de "escrever endpoints".
- **ORMs são padrão, mas SQL é obrigatório.** Todo time usa ORM, mas os bons devs entendem o SQL gerado — a diferença entre um back rápido e um lento (o problema N+1 e afins) mora aí ([[68-SQL-na-pratica]]).
- **Camadas e organização importam.** Times maduros mantêm o back em camadas claras (controller/service/repository) para testar, evoluir e não virar um "big ball of mud" ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- **Serverless e BaaS mudaram o jogo para times pequenos.** Firebase, Supabase e funções serverless permitem lançar um produto com muito menos infraestrutura — um MVP ([[49-MVP-priorizacao-e-validacao]]) pode nem ter um back-end tradicional no início.
- **Poliglota é comum em escala.** Grandes sistemas usam **várias** linguagens (microsserviços — [[59-Monolito-vs-Microsservicos]]), cada serviço na stack que melhor o serve. Entender os conceitos comuns é o que permite transitar.

---

## ⚠️ Erros comuns

- **Colocar lógica sensível no front.** Validar preço, permissão ou pagamento no front, achando que basta. O front é inspecionável e adulterável — o back **precisa** revalidar tudo ([[73-Autenticacao-e-autorizacao]]).
- **Escolher a stack pela moda.** Pegar a linguagem "hype" em vez da que o time domina e serve ao problema. O que o time conhece costuma pesar mais que méritos técnicos abstratos.
- **Entrar em guerra de linguagens.** Debater "qual é a melhor" como se houvesse uma resposta universal. Todas fazem o mesmo; o contexto decide.
- **Usar ORM sem entender SQL.** Gera queries lentas (N+1), problemas que o dev não sabe diagnosticar. O ORM agiliza, mas exige entender o banco por baixo ([[68-SQL-na-pratica]]).
- **Back sem camadas (tudo no controller).** Misturar rota, regra de negócio e acesso a dados num só lugar vira um emaranhado impossível de testar e evoluir ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- **Ignorar tratamento de erros e status HTTP.** Responder sempre 200, ou vazar stack traces técnicos. Use os status corretos e mensagens de erro adequadas ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]).
- **Não pensar em concorrência/transações.** Dois pedidos simultâneos no mesmo estoque sem transação ([[71-Confiabilidade-e-escala-do-banco]]) geram dados corrompidos.
- **Achar que back-end é "só CRUD".** Reduzir o back a criar/ler/atualizar/apagar ignora regras de negócio, segurança, performance e integridade — onde está o valor real.

---

## 💡 Dicas profissionais

- **Aprenda os conceitos, não só uma linguagem.** Rota, controller, service, acesso a dados, autenticação, request/response. Com eles, você lê e trabalha em qualquer back-end. A linguagem é detalhe.
- **Comece por uma stack e vá fundo.** Node/TypeScript ou Python são ótimas portas de entrada. Domine uma bem antes de colecionar várias — os conceitos transferem.
- **Nunca confie no front.** Revalide tudo que importa no back. Faça disso um reflexo de segurança ([[73-Autenticacao-e-autorizacao]]).
- **Entenda o SQL por baixo do ORM.** Use o ORM pela produtividade, mas saiba a query que ele gera e otimize quando preciso ([[68-SQL-na-pratica]]).
- **Organize em camadas desde o início.** Separe rota, regra de negócio e dados. Facilita testar ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) e evoluir.
- **Escolha a stack com pragmatismo.** O que o time domina + o ecossistema do problema + contratação. Registre num ADR e siga em frente.
- **Use os status HTTP e o tratamento de erros corretamente.** É a interface do seu back com o mundo ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]).

---

## 🎈 Curiosidades

- O **Node.js** (2009) nasceu de uma ideia "maluca" de Ryan Dahl: rodar **JavaScript fora do navegador**, no servidor. Antes disso, JS era "só uma linguagem de página web". Hoje roda back-ends de gigantes como Netflix e PayPal — e criou a era do dev "full-stack em JavaScript".
- O **Django** foi criado num jornal (o *Lawrence Journal-World*, em 2003) para publicar notícias rápido, e seu lema é **"o framework web para perfeccionistas com prazos"**. Seu foco em produtividade influenciou frameworks do mundo todo.
- O **Ruby on Rails** (2004) popularizou a filosofia **"convenção sobre configuração"** — em vez de você configurar tudo, o framework assume padrões sensatos. Essa ideia influenciou praticamente todos os frameworks web modernos e acelerou uma geração de startups (o Twitter e o GitHub começaram em Rails).
- Boa parte da web ainda roda em **PHP** — incluindo o **WordPress**, que sozinho sustenta uma fração enorme de todos os sites do mundo. Uma linguagem frequentemente ridicularizada movimenta uma parcela gigantesca da internet, provando que "popular" e "na moda" são coisas diferentes.
- O termo **"serverless"** (sem servidor) é famosamente enganoso: **sempre** há um servidor rodando o código — a diferença é que **você** não o gerencia, o provedor cuida disso e você paga só pelo tempo de execução. É um dos nomes mais mal-escolhidos da computação.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Back-end** | Programa no servidor com a lógica, os dados e a segurança do sistema. |
| **Servidor** | Computador (na nuvem) sempre ligado que hospeda o back-end. |
| **Request/response** | O ciclo do back: recebe requisição, processa, devolve resposta. |
| **Rota (routing)** | Mapear URL+método a um pedaço de código. |
| **Controller** | Recebe a requisição e orquestra a resposta. |
| **Service** | A camada com as regras de negócio (o valor). |
| **ORM** | Traduz entre objetos do código e tabelas do banco (evita SQL manual). |
| **Framework de back-end** | Estrutura pronta (rotas, dados, segurança): Express, Django, Spring... |
| **Node.js** | Rodar JavaScript no servidor; permite back e front na mesma linguagem. |
| **Serverless** | Rodar código sob demanda sem gerenciar o servidor (o provedor cuida). |
| **Full-stack** | Dev que trabalha tanto no front quanto no back. |

---

## 📝 Resumo

- O **back-end** é o programa que roda **num servidor** (não no dispositivo do usuário) e guarda a **lógica de negócio**, o **acesso aos dados** e a **segurança**. Sua "cara" é a **API** que expõe ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]); o front é seu cliente.
- Ele existe porque duas coisas **não podem** ficar no front: **segurança** (o front é inspecionável e adulterável) e a **fonte única da verdade** (os dados, no banco). Seu trabalho é um ciclo **request→response**: recebe, roteia, aplica lógica, fala com o banco, responde.
- **Todo** back-end faz o mesmo, independente da linguagem: **rotas, controllers, services (regras), acesso a dados (ORM), autenticação e tratamento de erros** — a estrutura em camadas do [[58-MVC-camadas-e-separacao-de-responsabilidades]].
- As stacks têm forças próprias: **Node.js** (mesma linguagem do front, tempo real), **Python/Django** (produtividade, dados/IA), **Java/Spring** e **C#/.NET** (corporativo, escala), Rails, Laravel, Go... Muda o tempero, não a essência.
- Escolher a stack é **pragmático**: o que o time domina + o ecossistema do problema + contratação. E a regra inegociável: o back **nunca confia no front** — tudo que importa (preço, permissão, pagamento) se valida no servidor. Aprenda os **conceitos**; a linguagem é detalhe.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é o back-end e por que ele existe (segurança, fonte da verdade).
- [ ] Descrevo o ciclo request→response de um servidor.
- [ ] Listo o que todo back-end faz: rotas, controllers, services, dados, autenticação.
- [ ] Conheço as principais linguagens/frameworks e onde cada uma brilha.
- [ ] Sei que a estrutura é a mesma em qualquer linguagem (muda o tempero).
- [ ] Entendo que a lógica sensível nunca fica no front.

---

## ✏️ Exercícios

**1.** Com a analogia da cozinha, explique o que o back-end faz e por que "todas as cozinhas fazem o mesmo, com temperos diferentes".

**2.** Por que a lógica de calcular o preço de um pedido **não pode** ficar no front-end? O que aconteceria se ficasse?

**3.** Descreva as camadas pelas quais passa um `POST /pedidos` no back, da rota até a resposta.

**4.** Cite três linguagens/frameworks de back-end e uma força de cada. Que fatores um time deve pesar para escolher entre elas?

**5. (Reflexão)** A SaborExpress escolheu Node/TypeScript "por razões práticas, não porque JS é a melhor linguagem". Explique quais foram essas razões e por que essa forma de escolher (pragmática) é melhor que escolher pela "melhor linguagem" no abstrato.

---

## 💬 Respostas comentadas

**1.** O back-end é a **cozinha** do restaurante: recebe os pedidos que o **garçom** (front-end) traz, direciona cada um à estação certa (**rotas** — `GET /restaurantes` vai ao código de restaurantes), segue **receitas e regras** (a **lógica de negócio** — "acima de R$50, frete grátis"), tira e guarda ingredientes na **despensa** (o **banco de dados**), tem um **segurança na porta** (autenticação/autorização) e devolve o prato pronto pelo garçom (a **resposta** JSON). "Todas as cozinhas fazem o mesmo com temperos diferentes" porque, seja a culinária italiana, japonesa ou brasileira (as linguagens/frameworks: Node, Python, Java...), **toda** cozinha recebe pedidos, direciona à estação, segue receitas, usa a despensa e controla quem entra — a **estrutura** é idêntica, muda só a técnica e o ingrediente. Aprender a **operar uma cozinha** (os conceitos) te faz cozinhar em qualquer culinária.

**2.** Porque o código do front-end é **enviado ao navegador do usuário** e pode ser **inspecionado e adulterado** — qualquer pessoa pode abrir as ferramentas de desenvolvedor e alterar o que roda no seu dispositivo. Se o cálculo do preço ficasse só no front, um cliente mal-intencionado poderia **mudar o total do pedido para R$0** ou forjar "frete grátis" e enviar isso ao servidor, e o back aceitaria cegamente. Por isso o cálculo do preço (e toda regra sensível) **tem** que estar no back, que recalcula e **confia só em si mesmo**; o front até mostra o total, mas por conveniência (UX), não como fonte da verdade. É a regra de ouro: o back nunca confia no front.

**3.** (1) **Rota:** `POST /pedidos` chega ao servidor e é direcionada ao controller de pedidos. (2) **Controller:** extrai os itens e o endereço do JSON da requisição, valida o formato e confere que o usuário está autenticado. (3) **Service (regra de negócio):** calcula o total, aplica "acima de R$50 = frete grátis", verifica se o restaurante está aberto e os itens disponíveis, define o status inicial. (4) **Camada de dados (ORM/repository):** grava o pedido no banco, dentro de uma **transação** para não gravar pela metade. (5) **Resposta:** sobe de volta pelas camadas e o controller devolve `201 Created` com o pedido e seu id. Essa separação em camadas (rota→controller→service→dados) é quase universal, com nomes que variam por framework.

**4.** Exemplos (bastam três): **Node.js** (JavaScript/TypeScript) — mesma linguagem do front, ótimo para tempo real e I/O, ecossistema enorme; **Python/Django** — produtivo, fácil de ler, forte em dados/IA, "tudo incluído"; **Java/Spring** — robusto, maduro, altíssima escala, padrão em grandes corporações e bancos; (ou C#/.NET, Ruby/Rails, PHP/Laravel, Go). Fatores a pesar: **o que o time já domina** (o maior fator — um time forte em Python entrega melhor em Django do que num Go que mal conhece), o **ecossistema** para o problema (Python para IA, Node para tempo real, Java para corporativo), a facilidade de **contratar** devs, e a **maturidade** da stack para o caso. Registrar a decisão num ADR ajuda a lembrar o "porquê".

**5.** As razões práticas da SaborExpress foram: (1) o front já era **React/TypeScript**, então usar a **mesma linguagem** no back deixou o time **full-stack**, compartilhando tipos e validações e transitando entre front e back sem trocar de idioma; (2) era fácil **contratar** devs JavaScript; (3) o app é muito de **I/O e tempo real** (rastreio ao vivo), no que o Node brilha. Escolher assim (pragmaticamente) é melhor que buscar a "melhor linguagem no abstrato" porque **não existe** uma linguagem universalmente superior — todas fazem essencialmente o mesmo, e o que determina a qualidade do produto é **quão bem o time executa** na stack escolhida. Um time excelente em Python fará um back melhor em Django do que num Go tecnicamente "superior" que mal conhece. A produtividade, a manutenção e a contratação (fatores contextuais) importam muito mais que méritos técnicos teóricos — por isso o time registrou num ADR que Python ou Java seriam válidos, só piores **para aquele time**.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[78-Ligando-front-end-a-experiencia-do-usuario]] — o front que consome este back.
- **Próximo (linear):** [[80-Construindo-a-API-da-SaborExpress]] ⭐ — juntando back, banco e API numa aplicação completa.
- **Base:** [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] (a interface do back), [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] (os dados) e [[58-MVC-camadas-e-separacao-de-responsabilidades]] (a organização em camadas).
- **Segurança:** [[73-Autenticacao-e-autorizacao]] — por que o back nunca confia no front.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 23 → **Capítulo 79 de 119**.
