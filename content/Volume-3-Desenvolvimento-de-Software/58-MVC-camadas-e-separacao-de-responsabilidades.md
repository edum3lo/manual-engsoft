# Capítulo 58 — MVC, camadas e separação de responsabilidades

> **Volume 3 — Desenvolvimento de Software** · Módulo 16 — Arquitetura de Software
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender a **separação de responsabilidades** e por que ela é a base de todo código organizado.
- Explicar a **arquitetura em camadas** (apresentação → lógica de negócio → acesso a dados).
- Compreender o padrão **MVC (Model-View-Controller)** e suas variações (MVVM, MVP).
- Reconhecer as camadas típicas de um projeto real (controller, service, repository, model).
- Saber por que essa separação torna o sistema testável, evoluível e compreensível.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[57-O-que-e-arquitetura-de-software]] — acoplamento, coesão e estilos.
- Ajuda muito ter lido [[36-Como-um-projeto-real-e-organizado]] (Vol. 2) — as pastas `controllers/`, `services/`, `repositories/`.

---

## 📖 Introdução

Imagine uma cozinha onde a mesma pessoa recebe o pedido, cozinha, lava a louça, cuida do caixa e ainda serve as mesas — tudo misturado, sem divisão de funções. No primeiro dia de movimento, o caos toma conta. Restaurantes que funcionam têm **separação de responsabilidades**: o garçom atende, a cozinha prepara, o caixa cobra. Cada um faz **uma coisa bem**, e por isso o conjunto funciona sob pressão.

Software é idêntico. O erro nº 1 de quem começa é escrever tudo junto: a mesma função lê o formulário da tela, aplica a regra de negócio, monta o SQL e devolve o HTML — tudo embolado. Funciona... até precisar mudar algo, quando qualquer alteração vira um campo minado. A cura tem nome: **separação de responsabilidades** (do inglês *Separation of Concerns*), o princípio de que cada parte do código deve cuidar de **uma preocupação** distinta.

As formas mais consagradas de organizar essa separação são a **arquitetura em camadas** (dividir o sistema em faixas horizontais: apresentação, negócio, dados) e o padrão **MVC (Model-View-Controller)**. Eles respondem à pergunta prática "onde eu ponho cada pedaço de código?" — a mesma que o [[36-Como-um-projeto-real-e-organizado]] (Vol. 2) começou a responder com as pastas `controllers/`, `services/`, `repositories/`. Este capítulo aprofunda o **porquê** e o **como** dessa divisão. Dominá-la é o que separa código que se mantém por anos de código que apodrece em meses — e é uma das habilidades mais visíveis num code review.

---

## 🧠 Analogia

Volte ao **restaurante**, agora olhando a divisão de funções.

- O **garçom** (a camada de **apresentação / View**) é a interface com o cliente: recebe o pedido e entrega o prato. Ele **não** cozinha nem cuida do estoque — só faz a ponte entre o cliente e a cozinha. Se você trocar o garçom por um totem de autoatendimento, a **cozinha não muda**.
- A **cozinha** (a camada de **lógica de negócio / Service**) é onde o valor é criado: as receitas, as regras ("não servimos camarão vencido", "o prato do dia tem desconto"). É o coração do restaurante. Ela não sabe se o pedido veio do garçom ou do totem, nem de que gaveta o ingrediente saiu.
- A **despensa/estoque** (a camada de **dados / Repository**) guarda e fornece os ingredientes. A cozinha **pede** ingredientes sem saber se vieram do freezer, da horta ou do fornecedor. Trocar o fornecedor não muda a receita.

A mágica dessa divisão: cada parte pode **mudar sem quebrar as outras**, desde que respeite os "contratos" (o garçom sempre entrega pedidos à cozinha do mesmo jeito). Você troca o garçom por um totem (nova apresentação) sem mexer nas receitas; troca o fornecedor (novo banco de dados) sem alterar a cozinha. É isso que a arquitetura em camadas e o MVC fazem no código: **cada camada faz uma coisa e conversa com a vizinha por um contrato claro**. Guarde: garçom, cozinha e despensa — apresentação, negócio e dados.

---

## 🧩 Conceitos fundamentais

### 1. Separação de responsabilidades (Separation of Concerns)

**Separação de responsabilidades** é o princípio de dividir o software em partes, cada uma cuidando de **uma preocupação** (concern) bem definida — apresentação, lógica de negócio, acesso a dados, etc. É a aplicação direta do "alta coesão, baixo acoplamento" ([[57-O-que-e-arquitetura-de-software]]): cada parte faz uma coisa (coesão) e depende pouco das outras (acoplamento).

> **Termo explicado — separação de responsabilidades:** organizar o código de modo que cada parte cuide de uma única preocupação distinta, sem misturar apresentação, regra de negócio e acesso a dados.

### 2. Arquitetura em camadas

A **arquitetura em camadas** (layered) divide o sistema em faixas **horizontais**, empilhadas, onde cada camada só conversa com a **vizinha**:

```
┌─────────────────────────────────┐
│  APRESENTAÇÃO (UI / API)         │  ← recebe requisições, mostra respostas
├─────────────────────────────────┤
│  LÓGICA DE NEGÓCIO (Service)     │  ← as regras do negócio
├─────────────────────────────────┤
│  ACESSO A DADOS (Repository)     │  ← conversa com o banco
├─────────────────────────────────┤
│  BANCO DE DADOS                  │  ← guarda os dados
└─────────────────────────────────┘
   (o fluxo desce e sobe entre camadas vizinhas)
```

A regra de ouro: uma camada **só depende da de baixo**, nunca pula camadas nem depende da de cima. A apresentação chama o service; o service chama o repository; o repository fala com o banco. A apresentação **nunca** monta SQL direto — isso violaria a separação.

> **Termo explicado — arquitetura em camadas:** organização do sistema em faixas horizontais (apresentação, negócio, dados) em que cada camada só se comunica com a vizinha, isolando responsabilidades.

### 3. As camadas típicas de um projeto (controller → service → repository)

Na prática, um back-end moderno costuma ter estas camadas (que você viu como pastas no [[36-Como-um-projeto-real-e-organizado]]):

- **Controller (apresentação/API):** recebe a requisição HTTP, valida o básico, chama o service e devolve a resposta. É o "garçom". **Não** contém regra de negócio.
- **Service (lógica de negócio):** onde moram as **regras** ("frete grátis acima de R$50", "não finalizar pedido sem itens"). É a "cozinha". Não sabe de HTTP nem de SQL.
- **Repository (acesso a dados):** conversa com o banco (buscar, salvar). É a "despensa". Não conhece regra de negócio.
- **Model / Entity:** a representação dos dados (a classe `Pedido`, `Produto` — vinda do [[55-Casos-de-uso-e-diagrama-de-classes]]), que trafega entre as camadas.

Um pedido percorre: **Controller** recebe → chama o **Service** (aplica regras) → que chama o **Repository** (salva no banco) → e a resposta volta pelo mesmo caminho.

### 4. MVC — Model, View, Controller

O **MVC** é o padrão mais famoso de separação, especialmente na web. Ele divide em três papéis:

- **Model:** os **dados** e as regras associadas a eles (o estado do sistema; conversa com o banco).
- **View:** a **apresentação** — o que o usuário vê (a tela, o HTML, o JSON de resposta).
- **Controller:** o **intermediário** — recebe a ação do usuário, chama o Model, e escolhe a View para responder.

```
Usuário → [ Controller ] → [ Model ] (dados/regras)
             ↑                 │
             └──[ View ]←───────┘ (o Controller escolhe a View, que mostra o Model)
```

> **Termo explicado — MVC (Model-View-Controller):** padrão que separa os **dados** (Model), a **apresentação** (View) e o **controle do fluxo** (Controller), evitando misturar lógica, tela e dados.

O objetivo do MVC é o mesmo das camadas: **não misturar** dados, tela e controle. Trocar a View (de HTML para app mobile) sem mexer no Model; mudar uma regra no Model sem tocar na View.

### 5. As variações: MVVM, MVP, e a relação com camadas

O MVC tem "primos" usados em contextos diferentes:
- **MVP (Model-View-Presenter)** e **MVVM (Model-View-ViewModel):** variações populares em apps desktop e mobile / front-end (o MVVM é comum em frameworks como Angular e no mundo .NET), que ajustam quem controla a lógica de apresentação.
- **Relação com camadas:** MVC é frequentemente **usado dentro** da camada de apresentação, enquanto a arquitetura em camadas organiza o sistema **todo**. Não são concorrentes — coexistem. Muitos frameworks web (Spring, Rails, Django, ASP.NET) são "MVC" e ainda têm services e repositories embaixo.

Não decore as siglas; entenda que **todas resolvem o mesmo problema**: separar dados, apresentação e controle.

---

## ⚙️ Como funciona na prática

Veja um pedido atravessando as camadas na prática, e por que a separação vale ouro:

**O caminho de uma requisição.** O cliente toca em "finalizar pedido" no app:
1. **Controller** recebe `POST /pedidos`, extrai os dados, valida o formato (tem itens? o JSON é válido?) e chama `pedidoService.finalizar(dados)`.
2. **Service** aplica as **regras**: o pedido atinge o mínimo? o cupom é válido e não acumula? calcula o frete. Se tudo ok, chama `pedidoRepository.salvar(pedido)` e `pagamentoService.cobrar(...)`.
3. **Repository** traduz para SQL/ORM e grava no banco.
4. A resposta sobe: Repository → Service → Controller, que devolve um JSON (a **View**, numa API) com o pedido criado.

**Por que separar assim compensa (os ganhos concretos):**
- **Testabilidade:** você testa o **Service** (as regras) **sem** subir servidor HTTP nem banco de verdade — passa dados falsos e verifica a regra. Isso é o que torna testes rápidos e confiáveis ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) possíveis.
- **Trocar peças:** mudar do banco MySQL para PostgreSQL toca **só** o Repository; a regra de negócio nem fica sabendo. Adicionar um app mobile reusa o **mesmo** Service e Controller, só muda a View.
- **Entender e evoluir:** quando um bug aparece no cálculo do frete, você sabe **exatamente onde olhar** (o Service), não precisa caçar em 2.000 linhas emboladas.
- **Trabalho em time:** uma pessoa mexe na tela (View) enquanto outra ajusta a regra (Service), sem colidir.

**O anti-padrão a evitar.** O "controller gordo" (fat controller): pôr regra de negócio e SQL dentro do controller. Funciona no começo, mas rapidamente vira a bola de lama — impossível de testar, de reusar, de entender. A disciplina de **manter cada coisa na sua camada** é o que previne isso, e é uma das coisas mais cobradas em code review.

---

## 🍔 Aplicação na SaborExpress

O back-end da SaborExpress é organizado em camadas, e isso já pagou dividendos.

**A estrutura.** Para o recurso de pedidos:
- `PedidoController` — recebe `POST /pedidos`, valida o formato, chama o service.
- `PedidoService` — as regras: pedido mínimo de R$15, frete grátis acima de R$50, cupom de primeira compra que não acumula. Orquestra o pagamento.
- `PedidoRepository` — salva e busca pedidos no banco.
- `Pedido`, `ItemPedido`, `Produto` — os models (vindos do diagrama de classes do [[55-Casos-de-uso-e-diagrama-de-classes]]).

**O ganho 1 — o app mobile "de graça".** Quando a SaborExpress lançou o app Android além do site, o time **não reescreveu** as regras. O app novo é só uma **nova apresentação** (View) que chama os **mesmos** Controllers e Services. A regra "frete grátis acima de R$50" existe em **um** lugar (o Service) e vale para web e mobile igualmente. Se estivesse embolada na tela do site, teria que ser reimplementada — e, pior, poderia divergir (frete grátis de R$50 na web e R$60 no app por um bug de cópia).

**O ganho 2 — a troca de banco sem drama.** A SaborExpress começou com um banco e depois migrou parte para outro por questão de custo. Como o acesso a dados estava isolado no **Repository**, a mudança tocou só essa camada — o Service (as regras) e o Controller nem souberam. Fosse o SQL espalhado pelos controllers, a migração seria uma caçada por todo o código.

**O ganho 3 — testes rápidos das regras.** A regra crítica "cupom não acumula com promoção" é testada no **Service** isoladamente: o teste passa um pedido com cupom + promoção e verifica que só um desconto se aplica — **sem** subir servidor nem banco. Rápido, confiável, e roda a cada commit no CI ([[82-TDD-e-testes-automatizados]]).

**O que teria sido a bola de lama.** No começo, um dev júnior colocou o cálculo de frete **dentro** do `PedidoController`, junto com o SQL. No code review, o sênior explicou o problema: aquilo não dava para testar sem HTTP, não dava para reusar no mobile, e misturava três preocupações. Foi movido para o Service (regra) e o Repository (dados). Uma correção pequena que evitou um padrão que apodreceria o projeto.

Moral: a separação em camadas fez a SaborExpress ganhar um app mobile quase de graça, migrar de banco sem trauma e testar regras com rapidez — tudo porque cada coisa estava **no seu lugar**.

---

## 🏢 Como isso acontece em uma empresa

- **Quase todo back-end sério usa camadas.** Controller → Service → Repository (com nomes que variam) é o padrão dominante em Spring (Java), NestJS (Node), Laravel (PHP), Django (Python), ASP.NET (C#). Você vai reconhecer essa estrutura em quase qualquer projeto.
- **Frameworks já vêm "MVC".** Rails, Django, Laravel, ASP.NET MVC organizam o projeto em torno de Model, View e Controller de fábrica — você preenche as camadas.
- **"Fat controller" / "fat model" são críticas em code review.** Pôr regra de negócio no controller (ou lógica demais no model) é apontado como problema. "Isso é responsabilidade do service" é um comentário comum.
- **A camada de service concentra o valor.** É onde mora a regra de negócio — o que o software realmente **faz** de único. Times protegem essa camada de detalhes de HTTP e banco para mantê-la limpa e testável.
- **Clean/Hexagonal Architecture** levam a separação adiante, isolando o núcleo de negócio de **qualquer** detalhe externo (banco, framework, UI) por interfaces. É a evolução "purista" das camadas, popular em sistemas complexos e duradouros.
- **No front-end, o padrão é componentes + estado**, mas o princípio é o mesmo: separar apresentação (o que se vê) da lógica e dos dados ([[78-Ligando-front-end-a-experiencia-do-usuario]]). MVVM e afins vivem aqui.

---

## ⚠️ Erros comuns

- **O "fat controller".** Pôr regra de negócio e acesso a dados dentro do controller. Funciona no começo, apodrece rápido: não testável, não reusável, embolado.
- **SQL na camada de apresentação.** Montar consultas de banco direto no controller ou na tela viola a separação e amarra a apresentação ao banco. O acesso a dados mora no Repository.
- **Regra de negócio espalhada.** A mesma regra ("frete grátis acima de R$50") copiada na tela, no controller e no service — quando muda, você esquece uma cópia e o sistema fica inconsistente. Regra mora em **um** lugar (o service).
- **Pular camadas.** O controller chamando o repository direto (sem passar pelo service) fura a arquitetura e espalha lógica. Respeite o fluxo entre vizinhas.
- **Decorar siglas sem entender.** Saber que existe MVC, MVP, MVVM não vale nada se você não entende que **todas** separam dados, apresentação e controle. Foque no princípio.
- **Over-separar coisas simples.** Criar service + repository + interfaces para um CRUD trivial de duas telas pode ser burocracia. A separação deve casar com a complexidade (a dose certa do [[57-O-que-e-arquitetura-de-software]]).
- **Model anêmico vs. lógica no lugar errado.** Debater onde a regra mora (no service ou no model?) é normal; o erro é ela não morar em **lugar nenhum** claro e ficar espalhada.

---

## 💡 Dicas profissionais

- **Pergunte "de quem é essa responsabilidade?" ao escrever cada trecho.** É formato/HTTP? → controller. É regra de negócio? → service. É banco? → repository. Essa pergunta, repetida, mantém o código organizado sozinho.
- **Mantenha o controller magro.** Ele só recebe, valida o básico, delega e responde. Se ele está "pensando" (calculando, decidindo regra), mova isso para o service.
- **Concentre a regra de negócio em um lugar testável.** A camada de service deve ser testável sem HTTP nem banco. Se você não consegue testar uma regra isoladamente, ela provavelmente está no lugar errado.
- **Isole o acesso a dados.** Todo SQL/ORM no repository. Assim, trocar de banco ou otimizar uma query mexe em um só lugar, e o resto do sistema nem percebe.
- **Deixe a View burra.** A tela (ou o JSON) só **apresenta**; não decide regra. Uma View sem lógica de negócio é fácil de trocar (web → mobile) e de testar.
- **Ajuste a dose à complexidade.** Um projeto grande merece camadas bem separadas e talvez Clean Architecture; um script simples, não. Separe o suficiente para o problema, sem burocratizar o trivial.

---

## 🎈 Curiosidades

- O **MVC** foi inventado em **1979** por **Trygve Reenskaug**, na Xerox PARC (o mesmo laboratório lendário que criou a interface gráfica e o mouse), para a linguagem Smalltalk. Ele é **mais velho que a web** — e foi adaptado para ela décadas depois.
- A ideia de **"separation of concerns"** foi articulada por **Edsger Dijkstra** em 1974, num ensaio famoso — ele argumentava que focar numa preocupação de cada vez é a única forma de a mente humana lidar com a complexidade. É um princípio cognitivo antes de ser técnico.
- Existe uma proliferação bem-humorada de siglas "M-V-*": MVC, MVP, MVVM, MVI, VIPER (no iOS)... Devs brincam que "a indústria adora inventar uma nova sigla para o mesmo princípio de separar dados, tela e controle".
- A **Clean Architecture** de Robert C. Martin (Uncle Bob) desenha o sistema como **círculos concêntricos** com a regra da dependência apontando **para dentro**: o núcleo de negócio não conhece o banco nem a UI — eles é que dependem dele. É a separação de responsabilidades levada ao extremo.
- Um sintoma clássico de má separação é o **"shotgun surgery"** (cirurgia de espingarda): uma mudança simples exige alterar dezenas de arquivos espalhados. É o sinal de que uma responsabilidade não está concentrada onde deveria.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Separação de responsabilidades** | Cada parte do código cuida de uma preocupação distinta. |
| **Arquitetura em camadas** | Sistema dividido em faixas (apresentação, negócio, dados) que só falam com a vizinha. |
| **Camada de apresentação** | Onde o sistema recebe requisições e mostra respostas (UI/API/Controller). |
| **Camada de negócio (Service)** | Onde moram as regras do negócio. |
| **Camada de dados (Repository)** | Onde se conversa com o banco de dados. |
| **MVC** | Padrão que separa Model (dados), View (tela) e Controller (fluxo). |
| **Controller** | Recebe a ação, delega ao service/model, escolhe a resposta (magro!). |
| **Model / Entity** | A representação dos dados que trafega entre camadas. |
| **Fat controller** | Anti-padrão: regra e SQL entulhados no controller. |
| **MVVM / MVP** | Variações do MVC usadas em front-end, desktop e mobile. |
| **Clean/Hexagonal** | Arquiteturas que isolam o núcleo de negócio de detalhes externos. |

---

## 📝 Resumo

- A **separação de responsabilidades** — cada parte cuidando de uma preocupação — é a base de todo código organizado, e a aplicação prática de "alta coesão, baixo acoplamento".
- A **arquitetura em camadas** divide o sistema em faixas horizontais (apresentação → negócio → dados), cada uma falando só com a vizinha. Na prática: **Controller → Service → Repository → Model**.
- O **MVC** separa **Model** (dados), **View** (apresentação) e **Controller** (controle do fluxo). Variações (MVVM, MVP) resolvem o mesmo problema em contextos diferentes.
- A separação torna o sistema **testável** (testar regras sem HTTP/banco), **evoluível** (trocar banco ou adicionar mobile mexendo em uma camada), **compreensível** (saber onde cada coisa está) e **colaborativo** (times trabalham em camadas diferentes sem colidir).
- O anti-padrão a evitar é o **fat controller** (regra e SQL embolados). A disciplina de "cada coisa na sua camada" é o que impede a bola de lama — e uma das coisas mais cobradas em code review.

---

## ☑️ Checklist de aprendizado

- [ ] Explico a separação de responsabilidades e por que ela importa.
- [ ] Descrevo a arquitetura em camadas e a regra de "só falar com a vizinha".
- [ ] Sei o papel de controller, service, repository e model.
- [ ] Explico o MVC e o que cada letra representa.
- [ ] Entendo por que a separação torna o código testável e evoluível.
- [ ] Reconheço o anti-padrão "fat controller".

---

## ✏️ Exercícios

**1.** Usando a analogia do restaurante, associe garçom, cozinha e despensa às camadas de apresentação, negócio e dados — e explique por que cada um "não faz o trabalho do outro".

**2.** Em qual camada (controller, service ou repository) deve morar cada item: (a) a regra "frete grátis acima de R$50"; (b) a query que busca pedidos no banco; (c) a leitura e validação do JSON da requisição HTTP.

**3.** Explique o que é um "fat controller" e por que ele é um problema. Como você o corrigiria?

**4.** Como a arquitetura em camadas facilitou a SaborExpress lançar um app mobile **sem** reescrever as regras de negócio? O que teria acontecido se as regras estivessem na tela do site?

**5. (Reflexão)** Descreva o caminho completo de uma requisição "finalizar pedido" pelas camadas, dizendo o que cada uma faz. Depois, explique por que essa organização torna a regra "cupom não acumula com promoção" fácil de testar.

---

## 💬 Respostas comentadas

**1.** O **garçom** = **apresentação** (recebe o pedido e entrega o prato, faz a ponte com o cliente, mas não cozinha). A **cozinha** = **lógica de negócio** (aplica as receitas e regras, cria o valor, sem saber de onde veio o pedido nem de qual gaveta saiu o ingrediente). A **despensa** = **dados** (guarda e fornece os ingredientes, sem conhecer as receitas). Cada um "não faz o trabalho do outro" para que possam **mudar independentemente**: trocar o garçom por um totem não muda as receitas; trocar o fornecedor não muda a cozinha. A separação é o que dá essa liberdade.

**2.** (a) **Service** — é regra de negócio. (b) **Repository** — é acesso a dados. (c) **Controller** — é a fronteira HTTP/apresentação (formato da requisição).

**3.** Um **fat controller** é um controller que, além de receber a requisição, também contém **regra de negócio e acesso a dados** (SQL) — ou seja, faz o trabalho das três camadas. É um problema porque: não dá para **testar** a regra sem subir HTTP; a lógica não pode ser **reusada** (ex.: por um app mobile) sem duplicar; e o código fica embolado e difícil de entender e evoluir (caminho para a bola de lama). A correção é **mover** a regra de negócio para um **service** e o acesso a dados para um **repository**, deixando o controller magro (só recebe, delega e responde).

**4.** Porque as regras de negócio (como "frete grátis acima de R$50") estavam concentradas na camada de **service**, que é independente da apresentação. O app mobile é apenas uma **nova View/apresentação** que chama os **mesmos** controllers e services já existentes — reusando toda a lógica sem reescrevê-la. Se as regras estivessem embutidas na **tela do site**, o time teria que **reimplementá-las** no app mobile, com dois riscos graves: retrabalho e, pior, **divergência** — as duas cópias poderiam sair diferentes (um bug faria o frete grátis valer a partir de R$50 na web e R$60 no app), gerando inconsistência e confusão para o cliente.

**5.** Caminho: (1) **Controller** recebe `POST /pedidos`, lê e valida o formato do JSON, chama `pedidoService.finalizar(dados)`. (2) **Service** aplica as regras — verifica pedido mínimo, valida o cupom, checa que cupom não acumula com promoção, calcula frete — e, se tudo ok, chama o repository e o serviço de pagamento. (3) **Repository** grava o pedido no banco (via SQL/ORM). (4) A resposta sobe de volta e o **Controller** devolve o JSON do pedido criado (a View). Essa organização torna a regra "cupom não acumula com promoção" **fácil de testar** porque ela vive isolada no **service**, sem depender de HTTP nem de banco real: o teste apenas cria um pedido com cupom **e** promoção, chama o método do service e verifica que só **um** desconto foi aplicado — rápido, determinístico e rodável a cada commit. Se a regra estivesse no controller (misturada com HTTP) ou no banco (SQL), testá-la exigiria subir infraestrutura, tornando o teste lento e frágil.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[57-O-que-e-arquitetura-de-software]] — acoplamento, coesão e estilos.
- **Próximo (linear):** [[59-Monolito-vs-Microsservicos]] — do "como organizar o código" ao "como dividir o sistema".
- **Base:** [[36-Como-um-projeto-real-e-organizado]] (Vol. 2) — as pastas controllers/services/repositories; e [[35-Principios-de-design-e-design-patterns]] (SOLID).
- **Aplicação:** [[80-Construindo-a-API-da-SaborExpress]] (as camadas em código) e [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] (a separação que torna testável).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 16 → **Capítulo 58 de 119**.
