# Capítulo 78 — Ligando o front-end à experiência do usuário

> **Volume 3 — Desenvolvimento de Software** · Módulo 22 — Front-end
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender como o front-end **consome dados de uma API** e os transforma em tela.
- Compreender o **ciclo de vida de uma requisição** na interface: carregando → sucesso / erro.
- Dominar os **três estados** que toda tela que busca dados precisa tratar: **loading, erro e vazio**.
- Entender **estado local** vs. **estado do servidor** e por que separá-los.
- Perceber como front-end, API, banco e UX se juntam numa **experiência que responde bem**.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[77-Frameworks-de-front-end]] (componentes, estado, props).
- Ter lido [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] (como o front pede dados ao back).
- Ajuda ter lido [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]] (feedback ao usuário).

---

## 📖 Introdução

Você já tem as peças: sabe montar a interface com **componentes** e **estado** ([[77-Frameworks-de-front-end]]), e sabe que os dados vivem no back-end, acessíveis por uma **API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]). Este capítulo une as duas pontas — mostra como o front-end **busca dados da API** e os transforma em telas vivas, que **respondem** ao usuário. É aqui que o front-end deixa de ser uma maquete estática e vira um app de verdade: o cliente abre a SaborExpress, e a lista de restaurantes **aparece** — porque o front pediu esses dados à API e os desenhou na tela.

O ponto central e mais subestimado do capítulo: buscar dados de uma API **leva tempo** e **pode falhar**. A rede é lenta, o servidor pode estar fora do ar, a lista pode vir **vazia**. Um front-end amador só programa o **caminho feliz** ("os dados chegaram, mostro na tela") e deixa o usuário olhando para uma tela em branco enquanto os dados carregam, ou para um erro cru quando algo falha. Um front-end profissional trata os **três estados** de toda tela que busca dados: **carregando** (mostra um spinner/esqueleto), **erro** (mostra uma mensagem clara e um botão "tentar de novo"), e **vazio** (mostra "nenhum restaurante por perto" em vez de uma tela em branco confusa). Isso é onde o front-end encontra a **UX** ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]).

Este é o capítulo que **costura** o Volume 3 até aqui: componentes ([[77-Frameworks-de-front-end]]) + API ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) + banco ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]) + UX ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) se juntam numa experiência que **responde bem**. Também introduz a distinção crucial entre **estado local** (dados da própria UI, como um menu aberto) e **estado do servidor** (dados que vêm da API, como a lista de restaurantes) — separá-los é a chave de um front-end organizado. Ao final, você entende o front-end não como "telas bonitas", mas como o **elo vivo** entre o usuário e o sistema.

---

## 🧠 Analogia

Pense num **garçom** levando seu pedido à cozinha e trazendo o prato.

Quando você pede um prato, o garçom (o **front-end**) leva o pedido à **cozinha** (a **API/back-end**), que prepara a comida (busca os dados no **banco**). Mas repare no que um **bom garçom** faz enquanto isso — e é aqui que mora a lição:

- **Enquanto o prato não fica pronto (carregando):** um bom garçom não some. Ele diz "já estou trazendo, senhor", talvez traz um pãozinho. Você **sabe que algo está acontecendo**. Um garçom ruim sumiria e te deixaria olhando para a mesa vazia, sem saber se o pedido foi anotado. Esse é o estado **loading**: mostrar ao usuário que os dados estão a caminho (um spinner, um esqueleto de tela).
- **Se a cozinha não tem o ingrediente (erro):** um bom garçom volta e explica com clareza: "Desculpe, acabou o salmão, quer escolher outro?". Um garçom ruim sumiria ou traria um prato errado sem avisar. Esse é o estado **erro**: mostrar uma mensagem clara e uma saída ("tentar de novo").
- **Se o cardápio daquela seção está sem opções hoje (vazio):** um bom garçom diz "hoje não temos sobremesas, infelizmente", em vez de te entregar um prato vazio e te deixar confuso. Esse é o estado **vazio**: mostrar "nenhum restaurante por perto" em vez de uma tela em branco.

Um garçom que **só** sabe servir quando tudo dá certo é péssimo — a diferença entre um bom e um mau garçom aparece **quando algo demora ou dá errado**. No front-end é idêntico: qualquer um mostra os dados quando eles chegam; o profissional cuida do **enquanto carrega**, do **quando falha** e do **quando está vazio**. Guarde: bom front-end = bom garçom = nunca deixa o cliente no escuro.

---

## 🧩 Conceitos fundamentais

### 1. Consumir uma API: o ciclo da requisição

O front-end pega dados do back-end fazendo uma **requisição HTTP** à **API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) — normalmente com `fetch` (nativo) ou bibliotecas como `axios`. O ciclo:

1. O componente precisa de dados (ex.: a lista de restaurantes).
2. Ele **dispara a requisição** (`GET /restaurantes`) — isso é **assíncrono**: leva tempo, e o código não "trava" esperando.
3. Enquanto espera, a tela mostra **carregando**.
4. A resposta chega em **JSON** → o front **guarda no estado** → a tela **re-renderiza** com os dados (graças à UI declarativa — [[77-Frameworks-de-front-end]]).
5. Se falhar, a tela mostra **erro**.

> **Termo explicado — assíncrono:** operação que leva tempo (como buscar dados na rede) e não bloqueia o resto do código enquanto acontece; o resultado chega "depois", e a tela reage quando ele chega.

### 2. Os três estados de toda tela com dados

Toda tela que **busca dados** precisa tratar três situações, não só uma:

- **Carregando (loading):** a requisição está em andamento. Mostre um **spinner** ou, melhor, um **esqueleto** (skeleton — o contorno cinza da tela que vai carregar). Nunca deixe a tela em branco sem sinal.
- **Erro:** a requisição falhou (servidor fora, sem internet). Mostre uma **mensagem clara** ("Não foi possível carregar. Verifique sua conexão.") e uma **ação** ("Tentar novamente"). Nunca um erro técnico cru.
- **Vazio (empty):** a requisição deu certo, mas **não há dados** (nenhum restaurante na região). Mostre um **estado vazio amigável** ("Nenhum restaurante entrega no seu endereço ainda") — não uma tela em branco que parece um bug.

> **Termo explicado — estados de UI (loading / erro / vazio):** as três situações, além do "sucesso com dados", que uma tela que busca dados precisa tratar para não deixar o usuário perdido.

Esquecer esses estados é o erro nº 1 do front-end iniciante. É também um ponto direto de **usabilidade** e das heurísticas de Nielsen ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]: "visibilidade do status do sistema").

### 3. Estado local vs. estado do servidor

Nem todo estado é igual. Vale separar:

- **Estado local (de UI):** dados que **pertencem à interface** e não vêm do servidor — um menu aberto/fechado, o texto sendo digitado num campo, a aba selecionada, o passo atual de um formulário. Vive só no front.
- **Estado do servidor (server state):** dados que **vêm da API** e são, na verdade, um **espelho** de algo que vive no banco — a lista de restaurantes, o perfil do usuário, os pedidos. O front tem uma **cópia** que pode ficar **desatualizada** (o restaurante fechou, um novo abriu).

> **Termo explicado — estado local vs. estado do servidor:** local = dados da própria UI (menu aberto, campo digitado); servidor = cópia de dados que vivem no back-end/banco e podem desatualizar (lista de restaurantes, pedidos).

Por que separar? Porque o estado do servidor tem problemas próprios — **cache** (guardar para não rebuscar toda hora), **revalidação** (atualizar quando ficar velho), **sincronização**. Bibliotecas como **TanStack Query** (React Query) e **SWR** existem só para gerenciar estado do servidor bem, cuidando de loading, erro, cache e revalidação por você.

### 4. Otimista, revalidação e feedback

Um front-end que **responde bem** usa técnicas de UX que dependem do estado:

- **Feedback imediato:** ao clicar "adicionar ao carrinho", a tela reage **na hora** (o contador sobe), mesmo antes de o servidor confirmar. Isso é a **atualização otimista** — assume que vai dar certo, e desfaz se falhar.
- **Não travar a tela:** operações assíncronas não devem congelar a interface. O usuário continua navegando enquanto os dados carregam.
- **Preservar o trabalho:** se um envio falha, não apague o que o usuário digitou; mostre o erro e deixe ele tentar de novo.

> **Termo explicado — atualização otimista:** atualizar a tela imediatamente assumindo que a ação vai dar certo (sem esperar o servidor), revertendo caso falhe — deixa o app mais responsivo.

### 5. Onde tudo se junta

O front-end é o **elo vivo** entre o usuário e o sistema. Ele:
- Implementa o **design** e a **UX** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]], [[53-Figma-wireframes-prototipos-e-Design-System]]);
- Com **componentes e estado** ([[77-Frameworks-de-front-end]]);
- Consumindo dados da **API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]);
- Que por sua vez lê do **banco** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]).

A qualidade percebida do produto — se parece rápido, confiável e cuidadoso — nasce muito de **como o front-end trata os estados** e o **feedback**. É onde a engenharia encontra a experiência.

---

## ⚙️ Como funciona na prática

Como um dev constrói uma tela que busca e mostra dados, bem feita:

**O fluxo de uma tela de lista.** Para a tela de restaurantes: o componente `<ListaRestaurantes>` guarda três coisas no estado — os `dados`, se está `carregando`, e um eventual `erro`. Ao montar, dispara `GET /restaurantes`. Enquanto espera, `carregando = true` → mostra **esqueletos** de cards. Quando a resposta chega, guarda em `dados`, `carregando = false` → a tela re-renderiza com os cards reais. Se falhar, guarda o `erro` → mostra a mensagem com "tentar de novo". Se `dados` vier vazio → mostra o **estado vazio**. Esses quatro caminhos (carregando, sucesso, erro, vazio) são o **checklist mental** de toda tela com dados.

**Usar as ferramentas certas.** Escrever esse ciclo na mão em cada tela é repetitivo e propenso a erro. Por isso o padrão profissional usa bibliotecas de **estado do servidor** como **TanStack Query**: você diz "quero os dados de `/restaurantes`", e ela te entrega `data`, `isLoading`, `isError` prontos, além de **cache** (não rebusca se já tem), **revalidação** (atualiza em segundo plano) e re-tentativas. Isso elimina uma montanha de código repetitivo e bugs.

**Formulários e envio de dados.** Além de **ler** (GET), o front **envia** dados (POST/PUT — [[72-O-que-e-uma-API-HTTP-REST-e-JSON]]): um formulário de cadastro, finalizar um pedido. O padrão: **validar** o input no front (feedback imediato), **desabilitar o botão** enquanto envia (evitar duplo clique), mostrar **carregando**, e tratar **sucesso** (confirmar, redirecionar) ou **erro** (mostrar o que deu errado sem apagar o que foi digitado). A validação no front melhora a UX, mas **não substitui** a validação no back ([[73-Autenticacao-e-autorizacao]]) — o front é conveniência, o back é segurança.

**Estado compartilhado entre telas.** Alguns dados são usados em **muitos** componentes distantes (o usuário logado, o carrinho). Passá-los via props por toda a árvore ("prop drilling") vira um inferno. Para isso existe o **estado global** (Context do React, Redux, Zustand, Pinia): um lugar central que qualquer componente pode ler. Regra de ouro: use estado **local** por padrão, **global** só quando realmente compartilhado — global demais vira caos.

**Responsividade e acessibilidade não são opcionais.** A tela precisa funcionar em celular e desktop (layout responsivo — CSS do [[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]]) e ser acessível ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]): estados de loading anunciados para leitores de tela, foco gerenciado, contraste. Um app que só funciona no desktop do dev não está pronto.

---

## 🍔 Aplicação na SaborExpress

A tela inicial da SaborExpress — a lista de restaurantes — mostra tudo isso junto. Acompanhe o dia da front-end **Diego** implementando-a.

**A primeira versão (só o caminho feliz).** Diego, apressado, fez a versão ingênua: dispara `GET /restaurantes`, e quando os dados chegam, mostra os cards. Funcionou no teste dele (internet rápida, muitos restaurantes). Mas em produção, a QA **Bia** reportou três problemas: (1) em conexões lentas, o cliente via uma **tela em branco por 3 segundos** e achava que o app travou; (2) quando a API caiu por um instante, apareceu um **erro técnico cru** ("undefined is not a function"); (3) um cliente numa cidade sem cobertura viu uma **tela vazia** e achou que era um bug. Diego tratou **um** estado (sucesso) e esqueceu os outros **três**.

**A versão profissional.** Diego refez tratando os quatro caminhos, como um bom garçom:
- **Carregando:** enquanto busca, mostra **esqueletos** de cards (contornos cinza animados) — o cliente vê que algo está vindo. A persona João (usuário apressado — [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) não acha mais que travou.
- **Erro:** se a API falha, mostra "Não foi possível carregar os restaurantes. Toque para tentar de novo." com um botão — em vez do erro técnico. Aplica a heurística "visibilidade do status" e "ajuda o usuário a se recuperar de erros" ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]).
- **Vazio:** se não há restaurantes na região, mostra uma ilustração amigável e "Ainda não entregamos no seu endereço. Avisaremos quando chegarmos!" — transformando uma frustração numa mensagem cuidadosa.
- **Sucesso:** os cards (o componente `<CardRestaurante>` do [[77-Frameworks-de-front-end]]) preenchidos com os dados da API.

**Estado local vs. servidor, separados.** Diego organizou: a **lista de restaurantes** é **estado do servidor** (vem de `GET /restaurantes`, gerenciada com TanStack Query, que cuida de cache e loading). Já o **filtro de busca** que o cliente digita e a **aba selecionada** ("Pizza / Japonês / Lanches") são **estado local** de UI, que vivem só no front. Misturar os dois deixaria o código confuso; separá-los deixou cada coisa no seu lugar.

**Feedback otimista no carrinho.** Quando o cliente toca "adicionar" num prato, o contador do carrinho **sobe na hora** (atualização otimista), sem esperar a confirmação do servidor — o app parece **instantâneo**. Se por acaso a chamada falhar, o item some e mostra um aviso discreto. A persona João, que odeia esperar, sente o app "voando".

**O resultado — onde tudo se junta.** Essa única tela costura o Volume 3 inteiro: o **componente** `<CardRestaurante>` ([[77-Frameworks-de-front-end]]) mostra dados que vêm da **API** `GET /restaurantes` ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]), que lê do **banco** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]), tudo implementando o **design** ([[53-Figma-wireframes-prototipos-e-Design-System]]) e a **UX** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) — e a diferença entre a versão amadora e a profissional não estava nos dados, mas em **como Diego tratou o carregar, o falhar e o vazio**. É aí que mora a qualidade percebida.

Moral: a lista de restaurantes só parece "simples". O que separa o app que frustra do app que encanta é o cuidado com os **três estados** (loading, erro, vazio), a separação entre estado local e do servidor, e o **feedback imediato** — o front-end sendo um bom garçom que nunca deixa o cliente no escuro.

---

## 🏢 Como isso acontece em uma empresa

- **"Tratou os estados?" é pergunta de code review.** Em times maduros, um PR de front que só cobre o caminho feliz é barrado ([[64-Pull-Requests-code-review-e-issues]]): revisores perguntam "e o loading? e o erro? e o vazio?".
- **Bibliotecas de estado do servidor são padrão.** TanStack Query (React), SWR, RTK Query — poucos times ainda escrevem o ciclo de fetch na mão. Elas resolvem cache, loading, erro e revalidação de forma testada.
- **Design cobre os estados também.** Times de design maduros entregam, no Figma, não só a tela "cheia", mas as versões de **loading (skeleton)**, **erro** e **vazio** ([[53-Figma-wireframes-prototipos-e-Design-System]]) — porque são parte da experiência.
- **Performance percebida importa mais que a real.** Esqueletos, feedback otimista e transições suaves fazem o app **parecer** mais rápido, mesmo com a mesma latência de rede. É engenharia a serviço da percepção.
- **Front e back combinam o contrato.** O formato do JSON, os códigos de erro, a paginação — o front e o back acordam o "contrato" da API (idealmente documentado — [[75-Documentar-e-testar-APIs]]) antes de integrar, evitando retrabalho.
- **Observabilidade no front.** Empresas monitoram erros de front (com ferramentas como Sentry), tempo de carregamento e métricas de experiência real do usuário — o front-end também é observado em produção.
- **Acessibilidade e responsividade entram no "pronto".** A definição de pronto ([[43-Scrum-na-pratica]]) inclui funcionar em mobile e ser acessível — não são "extras" que ficam para depois.

---

## ⚠️ Erros comuns

- **Programar só o caminho feliz.** Esquecer **loading, erro e vazio** — o erro nº 1. Deixa o usuário olhando tela em branco, erro cru, ou achando que um estado vazio legítimo é bug.
- **Tela em branco enquanto carrega.** Sem spinner nem esqueleto, o usuário acha que o app travou. Sempre sinalize que algo está vindo.
- **Mostrar erros técnicos crus.** "TypeError: undefined" na cara do usuário. Traduza para mensagens humanas com uma saída ("tentar de novo").
- **Não tratar o estado vazio.** Uma lista vazia legítima (nenhum resultado) parece um bug se a tela fica em branco. Mostre um estado vazio amigável.
- **Misturar estado local e do servidor.** Tratar dados da API como se fossem estado de UI comum, sem cache nem revalidação, gera dados desatualizados e código confuso.
- **Estado global para tudo.** Jogar todo dado num Redux/Context global "por via das dúvidas" vira caos. Local por padrão, global só quando compartilhado de fato.
- **Confiar na validação do front para segurança.** Validar no front é UX; **não** é segurança. O back **precisa** revalidar tudo ([[73-Autenticacao-e-autorizacao]]) — o front pode ser burlado.
- **Travar a UI em operações assíncronas.** Congelar a tela enquanto busca dados. A interface deve continuar responsiva.
- **Ignorar mobile e acessibilidade.** Testar só no desktop do dev. Metade (ou mais) dos usuários está no celular, e a acessibilidade não é opcional ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]).

---

## 💡 Dicas profissionais

- **Trate os quatro caminhos sempre.** Para toda tela que busca dados, pergunte-se: carregando? sucesso? erro? vazio? Faça disso um reflexo — é a marca do front-end profissional.
- **Use uma biblioteca de estado do servidor.** TanStack Query / SWR resolvem loading, erro, cache e revalidação por você. Não reinvente esse ciclo na mão em cada tela.
- **Separe estado local de estado do servidor.** Dados da UI (menu, campo, aba) são locais; dados da API são estado do servidor com cache e revalidação. Cada um no seu lugar.
- **Prefira esqueletos a spinners.** O esqueleto (contorno da tela que vai carregar) reduz a sensação de espera e evita "saltos" no layout.
- **Dê feedback imediato.** Atualização otimista, botões que reagem na hora, confirmações. A percepção de rapidez vem daqui.
- **Nunca perca o trabalho do usuário.** Se um envio falha, mantenha o que foi digitado e mostre o erro. Refazer tudo frustra.
- **Valide no front para UX, no back para segurança.** As duas coisas; nunca só o front.
- **Teste em mobile e com acessibilidade desde cedo.** Não deixe para o fim. Faz parte do "pronto".

---

## 🎈 Curiosidades

- Estudos de UX mostram que exibir um **esqueleto de tela** (skeleton) faz o carregamento **parecer** mais rápido do que um spinner girando — mesmo quando o tempo real é idêntico. O Facebook, o LinkedIn e o YouTube popularizaram os esqueletos justamente por essa percepção.
- A **atualização otimista** é o truque secreto de apps que "parecem instantâneos". Quando você curte um post ou envia uma mensagem, a interface reage **antes** de o servidor confirmar — e reverte silenciosamente na rara vez que falha. Você quase nunca percebe o truque.
- A regra dos **"3 segundos"**: pesquisas de e-commerce indicam que uma boa fração dos usuários **abandona** uma página que demora mais que ~3 segundos para carregar. Por isso o estado de loading (e a performance percebida) tem impacto direto em receita.
- O termo **"prop drilling"** (passar props por muitas camadas de componentes só para levar um dado lá no fundo) é uma das dores mais citadas do front-end — e a razão de existirem tantas soluções de estado global. É um exemplo de como um problema técnico gera todo um ecossistema de ferramentas.
- Muitos bugs famosos de apps grandes foram **estados não tratados**: a tela que fica em branco, o botão que fica "carregando" para sempre, a mensagem de erro em inglês técnico que vaza para o usuário. São erros de **estado**, não de lógica de negócio — e é por isso que tratá-los bem é tão valorizado.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Consumir uma API** | O front pedir dados ao back via HTTP e usá-los na tela. |
| **Assíncrono** | Operação que leva tempo (rede) e não trava o resto do código. |
| **Estado de loading** | A tela mostra que os dados estão a caminho (spinner/esqueleto). |
| **Estado de erro** | A tela mostra, com clareza, que a busca falhou, e oferece uma saída. |
| **Estado vazio** | A busca deu certo mas não há dados; mostra mensagem amigável. |
| **Estado local (de UI)** | Dados da própria interface (menu aberto, campo digitado). |
| **Estado do servidor** | Cópia de dados que vêm da API/banco e podem desatualizar. |
| **Atualização otimista** | Atualizar a tela assumindo sucesso, revertendo se falhar. |
| **Esqueleto (skeleton)** | Contorno cinza da tela que vai carregar, no lugar de spinner. |
| **Estado global** | Dados compartilhados por muitos componentes num lugar central. |
| **Prop drilling** | Passar props por muitas camadas só para levar um dado ao fundo. |

---

## 📝 Resumo

- O front-end vira app de verdade ao **consumir dados da API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]): dispara uma requisição HTTP (assíncrona), guarda a resposta JSON no **estado**, e a tela re-renderiza com os dados (UI declarativa — [[77-Frameworks-de-front-end]]).
- Buscar dados **leva tempo e pode falhar**. Toda tela com dados precisa tratar **quatro caminhos**: **carregando** (esqueleto/spinner), **sucesso** (os dados), **erro** (mensagem clara + "tentar de novo") e **vazio** (mensagem amigável). Esquecê-los é o erro nº 1 do front-end.
- Separe **estado local** (dados da UI: menu, campo, aba) de **estado do servidor** (cópia de dados da API que pode desatualizar). Bibliotecas como TanStack Query cuidam do estado do servidor (loading, erro, cache, revalidação).
- Um front que **responde bem** usa **feedback imediato** e **atualização otimista** (a tela reage na hora, assumindo sucesso), nunca trava a UI, e nunca perde o trabalho do usuário. Valide no front para UX, no back para segurança.
- Esta é a tela onde **tudo se junta**: componente + API + banco + design + UX. A qualidade percebida do produto nasce de **como o front trata os estados e o feedback** — o front-end é o **elo vivo, e um bom garçom, entre o usuário e o sistema**.

---

## ☑️ Checklist de aprendizado

- [ ] Explico como o front-end consome dados de uma API e os mostra na tela.
- [ ] Listo os quatro caminhos de uma tela com dados: carregando, sucesso, erro, vazio.
- [ ] Sei por que tratar loading, erro e vazio é essencial (e não opcional).
- [ ] Diferencio estado local de estado do servidor.
- [ ] Entendo atualização otimista e feedback imediato.
- [ ] Percebo como front, API, banco e UX se juntam numa experiência que responde.

---

## ✏️ Exercícios

**1.** Com a analogia do garçom, explique os três estados (loading, erro, vazio) que um bom front-end trata além do "sucesso".

**2.** Descreva o **ciclo** que acontece quando uma tela busca a lista de restaurantes na API, do disparo da requisição até a tela preenchida.

**3.** Diferencie **estado local** de **estado do servidor**, dando um exemplo de cada na tela da SaborExpress.

**4.** O que é **atualização otimista** e por que ela faz um app "parecer instantâneo"? Dê um exemplo.

**5. (Reflexão)** A primeira versão do Diego só tratava o caminho feliz e gerou três problemas em produção. Explique quais eram e como tratar os quatro estados resolveu cada um — e por que "a diferença não estava nos dados".

---

## 💬 Respostas comentadas

**1.** Um bom garçom nunca deixa o cliente no escuro **quando algo demora ou dá errado**, e o front-end faz igual: **(loading)** enquanto o prato não fica pronto, o garçom avisa "já estou trazendo" — o front mostra um spinner/esqueleto para o usuário saber que os dados estão a caminho, em vez de uma tela em branco que parece travada; **(erro)** se a cozinha não tem o ingrediente, o garçom volta e explica com clareza "acabou o salmão, quer outro?" — o front mostra uma mensagem clara ("não foi possível carregar, tente de novo") em vez de um erro técnico cru; **(vazio)** se a seção do cardápio está sem opções, o garçom diz "hoje não temos sobremesas" — o front mostra "nenhum restaurante por perto" em vez de uma tela em branco confusa. Qualquer um serve quando tudo dá certo; o profissional cuida do enquanto-carrega, do falhou e do vazio.

**2.** O ciclo: (1) o componente `<ListaRestaurantes>` precisa dos dados e **dispara a requisição** `GET /restaurantes` à API — uma operação **assíncrona**, que leva tempo e não trava o código; (2) enquanto espera, o estado `carregando` fica `true`, e a tela mostra **esqueletos** de cards; (3) a API busca os dados no banco e responde em **JSON**; (4) a resposta chega, o front **guarda os dados no estado** e marca `carregando = false`; (5) porque a UI é declarativa, a tela **re-renderiza automaticamente** com os cards reais preenchidos. Se em vez de sucesso a requisição falhar, o front guarda o **erro** no estado e mostra a mensagem com "tentar de novo"; se os dados vierem vazios, mostra o **estado vazio**.

**3.** **Estado local (de UI)** são dados que pertencem à própria interface e não vêm do servidor; na SaborExpress, o **texto digitado na busca** e a **aba selecionada** ("Pizza / Japonês / Lanches") são estado local — vivem só no front e não têm correspondência no banco. **Estado do servidor** são dados que vêm da **API** e são uma **cópia** de algo que vive no banco, podendo desatualizar; na SaborExpress, a **lista de restaurantes** (que veio de `GET /restaurantes`) é estado do servidor — se um restaurante fechar, a cópia no front fica velha até ser revalidada. Separá-los importa porque o estado do servidor precisa de cache e revalidação (cuidados que o estado local não tem), e misturá-los deixa o código confuso.

**4.** **Atualização otimista** é atualizar a tela **imediatamente**, assumindo que a ação vai dar certo, **sem esperar** a confirmação do servidor — e reverter caso (raramente) falhe. Ela faz o app "parecer instantâneo" porque elimina a espera perceptível: o usuário age e vê o resultado **na hora**, em vez de olhar para um carregando enquanto a requisição vai e volta pela rede. Exemplo na SaborExpress: quando o cliente toca "adicionar ao carrinho", o contador do carrinho **sobe imediatamente**, antes de o servidor confirmar; se a chamada falhar, o item some e aparece um aviso discreto. Para o usuário apressado (a persona João), o app parece "voar", embora a latência de rede seja a mesma — a diferença é só **quando** a tela reage.

**5.** Os três problemas da versão só-caminho-feliz do Diego: (1) em conexão lenta, o cliente via **tela em branco por segundos** e achava que o app travou — resolvido pelo estado de **loading** (esqueletos de cards mostram que algo está vindo); (2) quando a API caiu, apareceu um **erro técnico cru** ("undefined is not a function") — resolvido pelo estado de **erro** (mensagem humana "não foi possível carregar, toque para tentar de novo"); (3) um cliente sem cobertura viu uma **tela vazia** que parecia bug — resolvido pelo estado **vazio** (mensagem amigável "ainda não entregamos no seu endereço"). "A diferença não estava nos dados" porque, nos três casos, os **dados eram os mesmos** (ou a ausência deles) — o que mudou foi **como o front tratou cada situação** além do sucesso. A qualidade percebida do app não veio de buscar dados melhores, mas de cuidar do carregar, do falhar e do vazio: o front-end sendo um bom garçom.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[77-Frameworks-de-front-end]] — componentes e estado, a base desta tela.
- **Próximo (linear):** [[79-O-que-roda-no-servidor-linguagens-e-frameworks]] — o outro lado: o back-end que serve os dados.
- **Fecha o elo:** [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] (a API consumida), [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] (onde os dados vivem) e [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]] (o feedback ao usuário).
- **Adiante:** [[80-Construindo-a-API-da-SaborExpress]] — quando back, banco e API se juntam do outro lado.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 22 → **Capítulo 78 de 119**.
