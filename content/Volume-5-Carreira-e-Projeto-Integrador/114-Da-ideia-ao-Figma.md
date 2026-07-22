---
title: '114 - Projeto Integrador (1/5): da ideia ao Figma'
---

# Capítulo 114 — Projeto Integrador (1/5): da ideia ao Figma

> **Volume 5 — Carreira e Projeto Integrador** · Módulo 36 — Projeto Integrador: SaborExpress do zero à produção
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Ver, na prática e em sequência, como um sistema **nasce** de uma ideia.
- Aplicar **validação de ideia, MVP e pesquisa com usuários** num caso real.
- Acompanhar a passagem de **problema → ideia → validação → protótipo (Figma)**.
- Entender como as fases iniciais se conectam com todo o resto do desenvolvimento.
- Iniciar a construção completa da SaborExpress, o Projeto Integrador que amarra a coleção.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).** É um capítulo de aplicação — reúne o que você já aprendeu.

---

## ✅ Pré-requisitos

- Ter lido o **Volume 3**, em especial [[49-MVP-priorizacao-e-validacao]], [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]] e [[53-Figma-wireframes-prototipos-e-Design-System]].
- Ter lido [[95-Software-guiado-por-hipoteses-e-dados]] (validar antes de construir).

---

## 📖 Introdução

Chegamos ao **Projeto Integrador** — o coração prático do Volume 5 e o momento em que **tudo** o que a coleção ensinou se junta numa construção real. Ao longo de cinco capítulos (114 a 118), vamos construir a **SaborExpress inteira**, do zero à produção, na ordem exata em que um sistema nasce: da **ideia** ao **Figma**, aos **requisitos** e **banco**, à **API/back/front**, ao **Git/testes/Docker**, e ao **deploy/cloud/monitoramento**. Cada capítulo aplica, em sequência e de forma concreta, os conceitos que você estudou espalhados pelos volumes anteriores — mostrando que os 119 capítulos não são tópicos isolados, mas um **todo coerente** que transforma uma ideia num produto no ar. Este primeiro capítulo cobre o começo de tudo: **da ideia ao protótipo**.

Antes de escrever uma linha de código, um sistema começa com um **problema** e uma **ideia** de como resolvê-lo — e, crucialmente, com a **validação** de que essa ideia realmente vale a pena. Este é o momento mais barato e mais importante de acertar: uma ideia mal validada leva a construir, com enorme esforço, algo que ninguém quer ([[95-Software-guiado-por-hipoteses-e-dados]]). Vamos acompanhar a fundadora **Ana** partindo de um problema real (pedir comida é chato e limitado), formulando a ideia da SaborExpress, e **validando** antes de investir na construção: conversando com usuários reais ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]), definindo o **MVP** (o mínimo que entrega valor e testa a hipótese — [[49-MVP-priorizacao-e-validacao]]), e só então desenhando o **protótipo no Figma** ([[53-Figma-wireframes-prototipos-e-Design-System]]).

A grande lição desta fase — e do Projeto Integrador como um todo — é a **ordem** e a **conexão**. Sistemas bem-feitos não começam pelo código; começam por **entender o problema e as pessoas**, validar a solução barato, e desenhar antes de construir. Pular essas etapas (ir direto para o código) é a receita para construir a coisa errada, do jeito errado, e desperdiçar meses. Este capítulo mostra a fase inicial na prática, e — como todos os capítulos do Projeto Integrador — **aponta para frente**: o que decidimos aqui (o problema, o MVP, o protótipo) vira a base dos requisitos ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]), que viram o banco e a API, que viram o código, que vai ao ar. É a jornada completa de um software, começando pelo passo que os iniciantes mais pulam e os profissionais mais valorizam: **pensar antes de construir**.

---

## 🧠 Analogia

Pense em construir a SaborExpress como **construir uma casa** — e nesta primeira fase como a etapa que **antecede** qualquer tijolo: entender o que se precisa e desenhar a planta.

Ninguém constrói uma casa saindo por aí assentando tijolos ao acaso. Uma casa bem-feita começa **muito antes** da obra:

- **Entender a necessidade de quem vai morar (o problema e a validação):** o bom arquiteto primeiro **conversa** com a família — quantas pessoas? têm filhos? cozinham muito? trabalham em casa? Ele não assume; ele **descobre** o que essas pessoas realmente precisam ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]). Construir uma mansão de 5 quartos para um casal sem filhos seria desperdício; uma casa minúscula para uma família grande seria inútil. **Entender quem vai usar** vem primeiro.

- **Definir o essencial primeiro (o MVP):** com recursos limitados, decide-se o que é **indispensável** para a casa ser habitável (cozinha, banheiro, um quarto) versus o que pode vir depois (a piscina, o home theater). Constrói-se primeiro o **núcleo que entrega valor** ([[49-MVP-priorizacao-e-validacao]]), e não tudo de uma vez.

- **Desenhar a planta antes de construir (o protótipo/Figma):** antes de comprar um tijolo, o arquiteto desenha a **planta** — onde ficam os cômodos, como se anda pela casa, como a luz entra. É muito mais barato **mudar uma linha na planta** do que derrubar uma parede já construída. A planta permite a família **ver e ajustar** a casa antes de ela existir ([[53-Figma-wireframes-prototipos-e-Design-System]]). Mudar o protótipo é fácil; mudar o software já construído é caro.

Guarde: começar um sistema é como começar uma casa — primeiro você **entende quem vai usar** (o problema e a validação), define o **essencial** (o MVP), e **desenha a planta** (o protótipo no Figma) antes de assentar qualquer tijolo (o código). Pular direto para os tijolos é como construir uma casa sem planta: cara de consertar e provavelmente errada.

---

## 🧩 Conceitos fundamentais

### 1. O problema vem antes da solução

Todo sistema nasce de um **problema real** a ser resolvido — não de "vamos fazer um app". A clareza sobre **qual problema, de quem** é a fundação. Uma solução em busca de um problema costuma falhar; um problema bem entendido guia todo o resto ([[46-O-que-sao-requisitos]]).

> **Termo explicado — problema (a origem):** a dor ou necessidade real de pessoas que o sistema existe para resolver; entendê-lo com clareza é o ponto de partida de tudo.

### 2. Validar antes de construir

Antes de investir na construção (cara), **valida-se** que a ideia resolve um problema real e que as pessoas a querem ([[95-Software-guiado-por-hipoteses-e-dados]]). Isso se faz **barato**: conversando com usuários ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]), testando hipóteses, fazendo protótipos. Validar cedo evita o desperdício de construir algo que ninguém usa.

> **Termo explicado — validação:** confirmar, de forma barata (pesquisa, protótipo, testes), que a ideia resolve um problema real e é desejada, antes de investir na construção.

### 3. Pesquisa com usuários

Entender o problema e as pessoas exige **pesquisa** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]): conversar com usuários reais, observar como eles agem, descobrir suas dores e necessidades — em vez de **assumir** o que eles querem. As **personas** (Marta, João) sintetizam quem são os usuários. A pesquisa ancora todo o design na realidade, não em suposições.

> **Termo explicado — pesquisa com usuários:** investigar (conversando, observando) o que os usuários reais precisam e como agem, para basear as decisões na realidade em vez de suposições.

### 4. MVP — o mínimo que entrega valor

O **MVP (Produto Mínimo Viável)** é a menor versão que **entrega valor real** e permite **testar** a ideia com usuários ([[49-MVP-priorizacao-e-validacao]]). Não é uma versão "capenga", mas o **núcleo essencial** — o suficiente para validar a hipótese e aprender, sem construir tudo de uma vez. Priorizar o MVP evita o desperdício de features que ninguém pediu.

> **Termo explicado — MVP (Produto Mínimo Viável):** a menor versão do produto que entrega valor e testa a hipótese central com usuários reais, permitindo aprender antes de investir no resto.

### 5. Wireframe e protótipo (Figma)

Antes de codar, desenha-se a interface ([[53-Figma-wireframes-prototipos-e-Design-System]]): o **wireframe** (o esqueleto, a estrutura das telas) e o **protótipo** (uma simulação navegável). No **Figma**, é barato **desenhar, testar e ajustar** as telas antes de construí-las — e é onde design e código se encontram (o handoff). Mudar o protótipo é fácil; mudar o código pronto é caro.

> **Termo explicado — wireframe e protótipo:** o wireframe é o esqueleto das telas (estrutura); o protótipo é a simulação navegável — ambos feitos (ex.: no Figma) para desenhar e validar a interface antes de codar.

### 6. A ordem e a conexão

A fase inicial segue uma **ordem**: problema → validação/pesquisa → MVP → protótipo. E cada etapa **alimenta a seguinte** e todo o resto: o problema define os requisitos ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]), o protótipo guia o front-end, o MVP define o escopo. Ver essa conexão é entender que o desenvolvimento é um **fluxo coerente**, não etapas soltas — a tese do Projeto Integrador.

---

## ⚙️ Como funciona na prática

A fase inicial da SaborExpress, passo a passo:

**Passo 1 — O problema real.** Ana partiu de uma **dor concreta** ([[46-O-que-sao-requisitos]]): pedir comida por telefone era limitado (poucos restaurantes, sem ver o cardápio, sem acompanhar o pedido), e os restaurantes pequenos não tinham como alcançar mais clientes. Um problema real, de dois lados (clientes e restaurantes — o marketplace do [[105-Por-que-empresas-fazem-software-modelos-de-negocio]]). Ela **não** começou por "quero fazer um app"; começou pelo **problema**.

**Passo 2 — Pesquisa e validação (barato).** Antes de construir, Ana **conversou com usuários reais** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]): clientes potenciais (o que os frustra ao pedir comida?) e donos de restaurante (o Sr. Alberto — o que os impede de vender mais?). Descobriu dores que **não** tinha assumido. Sintetizou os usuários em **personas** (Marta, a usuária mais velha e casual; João, o frequente e apressado). Isso **validou** que o problema era real e revelou o que importava — antes de gastar um centavo construindo ([[95-Software-guiado-por-hipoteses-e-dados]]).

**Passo 3 — Definir o MVP.** Com recursos limitados, Ana **priorizou** ([[49-MVP-priorizacao-e-validacao]]): o que é o **mínimo** para a SaborExpress entregar valor e testar a hipótese? O MVP: listar restaurantes de **um bairro**, ver o cardápio, fazer um pedido, e pagar. **Fora** do MVP (para depois): avaliações, programa de fidelidade, recomendações por IA, cobertura nacional. Ela resistiu à tentação de construir tudo — o MVP validaria o essencial primeiro, e o resto viria conforme o aprendizado.

**Passo 4 — Do wireframe ao protótipo no Figma.** Antes de codar, o design ([[53-Figma-wireframes-prototipos-e-Design-System]]): primeiro **wireframes** (o esqueleto — onde fica a lista de restaurantes, o carrinho, o botão de finalizar), depois um **protótipo navegável no Figma**. Testaram o protótipo com as personas (Marta conseguia finalizar um pedido sem se perder? — usabilidade do [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) e **ajustaram** — descobrindo, por exemplo, que a tela de endereço confundia (o problema de ativação que veríamos depois — [[97-Metricas-de-produto-e-medicao-de-impacto]]). Mudar isso no Figma custou **minutos**; mudar no código custaria dias.

**A conexão para frente.** Tudo o que foi decidido aqui **alimenta** as próximas fases: o **problema** e as conversas viram os **requisitos** e histórias de usuário ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]); o **MVP** define o **escopo** do que construir; o **protótipo** guia o **front-end** ([[116-API-back-end-e-front-end]]); as **personas** guiam a UX de todo o resto. A fase inicial não é um "extra" antes do trabalho "de verdade" — é a **fundação** que torna todo o resto certo.

**Por que essa fase é a mais barata de acertar (e a mais cara de pular).** Mudar uma ideia é grátis; mudar uma pesquisa é barato; mudar um protótipo custa minutos. Mudar um sistema **já construído** custa semanas e dinheiro. Investir em entender o problema, validar e prototipar **antes** de codar é o que evita o pesadelo de construir com esforço enorme algo que ninguém quer — o erro que mais mata projetos e startups. Os profissionais valorizam esta fase justamente porque sabem o custo de pulá-la.

---

## 🍔 Aplicação na SaborExpress

Este capítulo **é** a SaborExpress — então aqui aprofundamos a fase inicial como o marco zero do Projeto Integrador, conectando com os conceitos dos volumes anteriores.

**A origem: um problema, não um app.** Ana não acordou querendo "fazer um app de delivery". Ela **viveu um problema**: como cliente, pedir comida era frustrante e limitado; e ela via os restaurantes pequenos do bairro (o do Sr. Alberto) lutando para alcançar clientes. O **problema real, de dois lados**, foi a semente ([[46-O-que-sao-requisitos]]). Essa origem — problema antes de solução — é o que deu à SaborExpress uma direção clara desde o início, algo que apps "em busca de um problema" nunca têm.

**Validação que mudou premissas.** Ao **conversar com usuários** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]), Ana descobriu coisas que **contrariavam** suas suposições. Ela achava que o mais importante era ter **muitos** restaurantes; a pesquisa mostrou que, no começo, os clientes valorizavam mais **saber o tempo de entrega** e **acompanhar o pedido** (a persona João, apressado). Essa descoberta — feita **antes** de construir — redirecionou o MVP e evitou meses investidos na direção errada. Foi a engenharia experimental ([[95-Software-guiado-por-hipoteses-e-dados]]) em ação, no nascimento do produto.

**O MVP disciplinado.** Ana **resistiu** à tentação (de investidores e da própria empolgação) de "já construir tudo" ([[49-MVP-priorizacao-e-validacao]]). O MVP foi enxuto: **um bairro**, listar restaurantes, ver cardápio, pedir, pagar. Ela documentou o que ficou **de fora** conscientemente (feed social, fidelidade, IA — que só viriam depois, validados — como vimos ao longo da coleção). Essa disciplina permitiu **lançar rápido, validar o negócio, e só então investir no resto** — a base do sucesso da SaborExpress.

**O protótipo que revelou problemas cedo.** No **Figma** ([[53-Figma-wireframes-prototipos-e-Design-System]]), testaram o protótipo com as personas antes de codar. Descobriram, **de graça**, que a tela de cadastro de endereço confundia a persona Marta ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) — o mesmo problema de ativação que, se descoberto só em produção, teria custado clientes ([[97-Metricas-de-produto-e-medicao-de-impacto]]). Ajustaram no protótipo em minutos. O design antes do código evitou um bug caro de UX.

**A semente de tudo o que viria.** Cada decisão desta fase foi a **raiz** do que a coleção inteira mostrou: o problema e as personas guiaram os **requisitos** ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]); o MVP definiu o **escopo** do banco, da API e do front ([[116-API-back-end-e-front-end]]); o protótipo virou o **front-end**; e a validação contínua virou a cultura de dados ([[95-Software-guiado-por-hipoteses-e-dados]]). Ver essa fase é ver **de onde tudo veio** — a nascente do rio que percorre os 119 capítulos.

Moral: a SaborExpress nasceu do jeito certo — de um **problema real** (não de "vamos fazer um app"), **validado** com usuários antes de construir (o que mudou premissas importantes), com um **MVP disciplinado** (o essencial primeiro), e um **protótipo no Figma** que revelou problemas de graça. Esta fase, que iniciantes pulam e profissionais valorizam, foi a **fundação** que tornou certo todo o resto do Projeto Integrador — e a prova de que pensar antes de construir é o que separa projetos que vingam dos que desperdiçam meses.

---

## 🏢 Como isso acontece em uma empresa

- **Produtos de sucesso começam pelo problema.** Empresas maduras (e boas startups) partem de um problema real e validado, não de "uma ideia legal de app". Product managers ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) lideram essa descoberta.
- **Validação antes de construção é regra.** O ciclo "descobrir → validar → construir" (Lean, Design Thinking) é padrão. Construir sem validar é reconhecido como o principal desperdício e causa de fracasso de startups ([[95-Software-guiado-por-hipoteses-e-dados]]).
- **Pesquisa com usuários é uma disciplina.** Empresas têm UX researchers e processos de descoberta contínua. "Falar com usuários" é uma prática valorizada, não opcional ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]).
- **MVP é vocabulário universal.** Lançar o mínimo para aprender é a filosofia dominante em produto. O erro de "construir tudo antes de validar" é amplamente combatido.
- **Protótipos economizam fortunas.** Times prototipam no Figma e testam antes de codar, porque mudar o design é ordens de magnitude mais barato que mudar o código ([[53-Figma-wireframes-prototipos-e-Design-System]]).
- **A fase de descoberta é onde o produto é "acertado".** Investir em entender o problema e validar é o que separa produtos que resolvem dores reais dos que ninguém usa — e é onde os melhores times focam energia.
- **Engenheiros participam da descoberta.** Cada vez mais, engenheiros são envolvidos desde a descoberta (não só na construção), porque entender o problema e o negócio ([[105-Por-que-empresas-fazem-software-modelos-de-negocio]]) os torna muito mais eficazes.

---

## ⚠️ Erros comuns

- **Começar pelo código (pular a descoberta).** Ir direto construir sem entender o problema, validar, ou prototipar. A receita para construir a coisa errada.
- **Solução em busca de problema.** Ter uma "ideia de app" e procurar um problema para ela resolver. O problema real deve vir primeiro.
- **Assumir o que os usuários querem.** Não pesquisar e construir com base em suposições. Conversar com usuários reais frequentemente contraria as premissas ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]).
- **Construir tudo antes de validar.** Investir meses num produto completo sem testar a hipótese central. Priorize o MVP e valide primeiro ([[49-MVP-priorizacao-e-validacao]]).
- **Confundir MVP com produto capenga.** O MVP é o núcleo que entrega valor, não uma versão mal-feita. Deve testar a hipótese e agradar o essencial.
- **Pular o protótipo.** Codar direto sem desenhar as telas. Mudar o protótipo custa minutos; mudar o código, dias.
- **Ver a descoberta como "perda de tempo".** Achar que "o trabalho de verdade é codar". A fase inicial é a fundação que torna todo o resto certo — pulá-la é o erro mais caro.
- **Ignorar a conexão entre as fases.** Tratar problema, MVP e protótipo como etapas soltas. Cada uma alimenta a próxima e todo o resto.

---

## 💡 Dicas profissionais

- **Comece pelo problema, não pela solução.** Entenda com clareza qual dor, de quem, você resolve. Isso guia todas as decisões seguintes ([[46-O-que-sao-requisitos]]).
- **Valide barato antes de construir caro.** Converse com usuários, teste hipóteses, prototipe. Descobrir que a ideia não funciona custa pouco agora e muito depois.
- **Pesquise, não assuma.** Fale com usuários reais; as descobertas frequentemente contrariam suas suposições e redirecionam o produto ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]).
- **Defina um MVP disciplinado.** O núcleo essencial que entrega valor e testa a hipótese. Documente o que fica de fora conscientemente. Resista a "construir tudo".
- **Prototipe antes de codar.** Desenhe e teste as telas no Figma. Mudar o design é barato; mudar o código pronto é caro ([[53-Figma-wireframes-prototipos-e-Design-System]]).
- **Envolva-se na descoberta, mesmo sendo engenheiro.** Entender o problema e o usuário te torna muito mais eficaz na construção. Não espere só receber tarefas prontas.
- **Veja a conexão entre as fases.** Cada decisão inicial alimenta os requisitos, o banco, a API e o front. O desenvolvimento é um fluxo coerente.
- **Valorize pensar antes de construir.** É o que os profissionais fazem e os iniciantes pulam. A fundação bem-feita torna todo o resto certo e barato.

---

## 🎈 Curiosidades

- Uma estatística frequentemente citada sobre por que startups fracassam aponta a razão nº 1 como **"não havia necessidade de mercado"** — ou seja, construíram algo que **ninguém queria**. Isso é exatamente o que a fase de descoberta e validação existe para evitar, e explica por que "pular direto para o código" é tão perigoso: o esforço de engenharia é desperdiçado se o problema não era real.
- O conceito de **MVP** foi popularizado por Eric Ries no *Lean Startup*, mas há um mal-entendido comum: muitos confundem MVP com "versão mal-feita e cheia de bugs". Ries e outros esclareceram que o MVP é sobre **minimizar o esforço para maximizar o aprendizado validado** — pode até ser algo bem-feito, contanto que seja o **mínimo necessário para testar a hipótese**, não uma versão de baixa qualidade.
- Algumas das validações mais famosas foram feitas **sem código nenhum**: o fundador do Dropbox, antes de construir o produto complexo, gravou um **vídeo** simples demonstrando como ele funcionaria — e a explosão de inscrições na lista de espera **validou** a demanda antes de escrever a parte difícil. É o exemplo clássico de que validar barato pode nem exigir programação.
- A prática de **testar protótipos com usuários** revelou, em incontáveis estudos, que os designers e desenvolvedores frequentemente **erram** ao prever o que confundirá os usuários — telas que pareciam óbvias para quem as criou travavam pessoas reais. Isso reforça por que testar o protótipo (em vez de assumir que "está claro") é tão valioso, e por que a persona Marta travando na tela de endereço é um exemplo tão realista.
- O termo **"desenhar antes de construir"** tem um paralelo direto na engenharia civil e na arquitetura, de onde a computação pegou emprestado muito do seu vocabulário ("arquitetura de software", "blueprint"). A ideia de que é infinitamente mais barato mudar a planta do que a construção é uma sabedoria milenar da construção — que a engenharia de software, na pressa de "só codar", às vezes esquece e reaprende dolorosamente.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Projeto Integrador** | Construir a SaborExpress inteira aplicando toda a coleção. |
| **Problema (a origem)** | A dor real de pessoas que o sistema existe para resolver. |
| **Validação** | Confirmar barato que a ideia resolve um problema real e é desejada. |
| **Pesquisa com usuários** | Investigar o que os usuários reais precisam (não assumir). |
| **Persona** | Personagem que sintetiza um tipo de usuário (Marta, João). |
| **MVP** | A menor versão que entrega valor e testa a hipótese. |
| **Wireframe** | O esqueleto/estrutura das telas. |
| **Protótipo** | Simulação navegável das telas (ex.: no Figma). |
| **Figma** | Ferramenta de design onde se desenha e testa a interface. |
| **Descoberta** | A fase de entender o problema e validar antes de construir. |

---

## 📝 Resumo

- O **Projeto Integrador** constrói a SaborExpress inteira, do zero à produção, em cinco capítulos, na ordem em que um sistema nasce — provando que os 119 capítulos formam um **todo coerente**. Este primeiro cobre **da ideia ao protótipo**: a fase que antecede qualquer código.
- Todo sistema começa por um **problema real** (não por "vamos fazer um app") — a SaborExpress nasceu da dor de pedir comida ser limitado, de dois lados (clientes e restaurantes). Antes de construir (caro), **valida-se barato**: conversando com **usuários reais** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]), o que frequentemente **contraria as suposições** e redireciona o produto ([[95-Software-guiado-por-hipoteses-e-dados]]).
- Define-se o **MVP** — a menor versão que **entrega valor e testa a hipótese** ([[49-MVP-priorizacao-e-validacao]]) — resistindo à tentação de "construir tudo". O MVP da SaborExpress: um bairro, listar restaurantes, ver cardápio, pedir, pagar. E desenha-se o **protótipo no Figma** ([[53-Figma-wireframes-prototipos-e-Design-System]]) — testado com as personas, revelando problemas (a tela de endereço confusa) que custam **minutos** para corrigir no design, mas dias no código.
- A ordem é **problema → validação/pesquisa → MVP → protótipo**, e cada etapa **alimenta a seguinte e todo o resto**: o problema vira os **requisitos** ([[115-Requisitos-casos-de-uso-e-banco-de-dados]]), o MVP define o **escopo**, o protótipo guia o **front-end**, as personas guiam a **UX**. É um fluxo coerente, não etapas soltas.
- A lição central: **pensar antes de construir**. Mudar uma ideia é grátis, um protótipo custa minutos, um sistema pronto custa semanas. Investir em entender o problema, validar e prototipar **antes** de codar é o que evita construir, com enorme esforço, algo que ninguém quer — o erro que mais mata projetos. É a fase que iniciantes pulam e profissionais valorizam, porque é a **fundação** que torna certo todo o resto.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo que um sistema começa pelo problema, não pelo código.
- [ ] Sei validar uma ideia barato antes de construir (pesquisa, protótipo).
- [ ] Aplico pesquisa com usuários em vez de assumir o que eles querem.
- [ ] Defino um MVP disciplinado (o essencial que entrega valor e testa a hipótese).
- [ ] Prototipo no Figma antes de codar, testando com as personas.
- [ ] Vejo como a fase inicial alimenta os requisitos, o banco, a API e o front.

---

## ✏️ Exercícios

**1.** Com a analogia da construção da casa, explique por que se deve "entender quem vai usar, definir o essencial e desenhar a planta" antes de codar.

**2.** Por que a **validação com usuários** deve vir antes da construção? O que aconteceu na SaborExpress quando Ana pesquisou?

**3.** O que é um **MVP** e por que ele **não** é uma "versão capenga"? Qual foi o MVP da SaborExpress?

**4.** Por que se prototipar no Figma antes de codar? Dê o exemplo da tela de endereço da SaborExpress.

**5. (Reflexão)** Este capítulo diz que "pensar antes de construir" é a fase que iniciantes pulam e profissionais valorizam. Explique por que pular a descoberta é o erro mais caro, conectando com o custo de mudar uma ideia vs. um sistema pronto.

---

## 💬 Respostas comentadas

**1.** Construir um sistema é como construir uma casa — ninguém assenta tijolos ao acaso; começa-se muito antes da obra. **Entender quem vai usar** (o problema e a validação): o bom arquiteto primeiro **conversa** com a família (quantas pessoas? cozinham? têm filhos?) para descobrir o que eles realmente precisam, em vez de assumir — construir uma mansão para um casal sem filhos, ou uma casa minúscula para uma família grande, seria desperdício; entender o usuário vem primeiro. **Definir o essencial** (o MVP): com recursos limitados, decide-se o indispensável para a casa ser habitável (cozinha, banheiro, um quarto) versus o que vem depois (piscina, home theater) — constrói-se primeiro o núcleo que entrega valor. **Desenhar a planta** (o protótipo): antes de comprar um tijolo, desenha-se a planta (onde ficam os cômodos, como se anda pela casa), porque é muito mais barato **mudar uma linha na planta** do que derrubar uma parede construída, e a planta permite a família ver e ajustar a casa antes de ela existir. No software é idêntico: primeiro você entende quem vai usar (problema/validação), define o essencial (MVP), e desenha a planta (protótipo no Figma) antes de assentar qualquer tijolo (o código) — porque mudar essas coisas antes de construir é barato, e mudar o sistema pronto é caro. Pular direto para os tijolos é construir uma casa sem planta: cara de consertar e provavelmente errada.

**2.** A **validação com usuários** deve vir antes da construção porque construir é **caro** (meses de esforço, dinheiro), e se a ideia não resolve um problema real ou as pessoas não a querem, todo esse esforço é **desperdiçado** — você constrói, com enorme trabalho, algo que ninguém usa (a razão nº 1 de fracasso de startups). Validar **antes**, e **barato** (conversando com usuários, testando hipóteses, prototipando), permite descobrir se a ideia funciona **quando ainda é barato mudar de rumo** — antes de investir na construção. Na SaborExpress, quando Ana **pesquisou** (conversou com clientes e donos de restaurante), ela descobriu coisas que **contrariavam suas suposições**: ela achava que o mais importante era ter **muitos restaurantes**, mas os usuários revelaram que, no começo, valorizavam mais **saber o tempo de entrega** e **acompanhar o pedido** (a dor da persona João, apressado). Essa descoberta — feita **antes** de construir — **redirecionou o MVP** e evitou que Ana investisse meses na direção errada (correndo atrás de muitos restaurantes quando o que importava era a experiência de acompanhamento). A pesquisa transformou suposições em conhecimento real, ancorando o produto no que os usuários de fato precisavam — o que só teve valor porque foi feito **cedo**, quando ainda dava para mudar barato.

**3.** Um **MVP (Produto Mínimo Viável)** é a **menor versão** do produto que **entrega valor real** e permite **testar a hipótese central** com usuários reais, para aprender antes de investir na construção completa. Ele **não** é uma "versão capenga" (mal-feita, cheia de bugs) porque o "mínimo" se refere ao **escopo** (fazer só o essencial, não tudo), não à **qualidade** (fazer mal). O MVP deve ser o **núcleo que entrega valor** e agrada no essencial — ele precisa ser bom o suficiente para que os usuários realmente o usem e você aprenda algo válido; um produto quebrado não validaria nada (as pessoas sairiam por causa dos bugs, não da ideia). A ideia é **minimizar o esforço para maximizar o aprendizado validado**: construir a menor coisa que testa se a ideia funciona, bem-feita naquilo que faz, deixando os recursos **adicionais** (não essenciais) para depois. O MVP da SaborExpress foi: em **um bairro**, listar restaurantes, ver o cardápio, fazer um pedido e pagar. Isso entregava valor real (dava para pedir comida) e testava a hipótese central (as pessoas querem pedir comida por um app? os restaurantes querem vender assim?). Ficaram **de fora** do MVP (conscientemente, para depois): avaliações, programa de fidelidade, recomendações por IA e cobertura nacional — recursos que enriqueceriam o produto mas não eram necessários para validar o essencial. Resistir a "construir tudo" e focar no MVP permitiu à SaborExpress lançar rápido, validar o negócio e só então investir no resto — com qualidade no que importava, não com uma versão capenga.

**4.** Prototipar no Figma antes de codar porque **mudar o design é ordens de magnitude mais barato do que mudar o código**: no Figma, você desenha as telas e cria uma simulação navegável, testa com usuários, e **ajusta em minutos** — enquanto mudar uma tela **já construída** em código exige horas ou dias de trabalho de desenvolvimento (refazer componentes, testar, evitar quebrar outras coisas). O protótipo permite **descobrir problemas de interface cedo**, quando corrigi-los é trivial, em vez de descobri-los depois de construídos (caro) ou só em produção com usuários reais (caríssimo — perde clientes). Exemplo da SaborExpress: ao testar o protótipo no Figma com as personas, descobriram **de graça** que a **tela de cadastro de endereço confundia** a persona Marta (usuária mais velha e casual) — ela travava e não conseguia prosseguir. Esse é exatamente o tipo de problema de usabilidade ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) que, se descoberto só depois de construído e lançado, teria travado usuários reais na hora de se cadastrar, causando **abandono** e perda de clientes (o problema de ativação que destrói a retenção — [[97-Metricas-de-produto-e-medicao-de-impacto]]). Como foi pego **no protótipo**, o ajuste custou **minutos** de redesenho no Figma — em vez de dias de recodificação, ou pior, meses de clientes perdidos em produção. Testar o desenho antes de construir transformou um bug caro de UX num ajuste trivial.

**5.** Pular a descoberta ("pensar antes de construir") é o erro **mais caro** porque o custo de corrigir um rumo errado **cresce dramaticamente** a cada fase do desenvolvimento — e a descoberta é justamente onde as decisões mais fundamentais (o problema certo, a solução certa, o que construir) são tomadas. Considere o **custo de mudar** em cada estágio: mudar uma **ideia** é **grátis** (você só pensa diferente); mudar uma conclusão de **pesquisa** é barato (mais algumas conversas); mudar um **protótipo** custa **minutos** (redesenhar no Figma); mas mudar um **sistema já construído** custa **semanas de trabalho e dinheiro** (recodificar, testar, evitar quebrar o que funciona), e mudar algo já **em produção** com usuários pode custar clientes perdidos e a reputação. Ou seja, um erro que custaria **zero** para corrigir na fase de ideia pode custar **meses** se só for descoberto depois de construído. Quando você **pula a descoberta** e vai direto para o código, você toma as decisões mais importantes (que problema resolver, o que os usuários querem, o que construir) **sem validá-las** — e se estiverem erradas (o que é comum, já que as suposições frequentemente contrariam a realidade), você só descobre **depois** de ter investido o esforço caro da construção, no ponto em que corrigir é mais custoso. O pior cenário — e o mais frequente — é construir, com **enorme esforço de engenharia**, um produto completo e bem-feito... que **ninguém quer** (porque o problema não era real ou a solução não servia), descobrindo isso só quando o produto lançado não é usado. Todo o trabalho de código, por melhor que seja tecnicamente, é **desperdiçado** — é a razão nº 1 de fracasso de startups ("não havia necessidade de mercado"). Por isso os **profissionais valorizam** a fase inicial (entender o problema, validar barato, prototipar): eles sabem, muitas vezes por experiência dolorosa, que uma hora investida em pensar e validar **antes** economiza semanas de construir a coisa errada **depois**. Os **iniciantes pulam** porque acham que "o trabalho de verdade é codar" e veem a descoberta como perda de tempo — sem perceber que é justamente essa fundação que torna todo o código subsequente **certo e barato**, em vez de um esforço caro na direção errada. Pensar antes de construir não é atrasar o trabalho; é garantir que o trabalho valha a pena.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[115-Requisitos-casos-de-uso-e-banco-de-dados]] — do problema aos requisitos e ao modelo de dados.
- **Base aplicada:** [[49-MVP-priorizacao-e-validacao]] (MVP), [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]] (pesquisa), [[53-Figma-wireframes-prototipos-e-Design-System]] (protótipo) e [[95-Software-guiado-por-hipoteses-e-dados]] (validar).
- **Origem:** [[46-O-que-sao-requisitos]] — o problema como fundação.
- **Adiante:** todo o Projeto Integrador ([[116-API-back-end-e-front-end]], [[117-Git-PR-testes-e-Docker]], [[118-Deploy-cloud-producao-e-monitoramento]]).

---

> 🧭 **Você está aqui:** Volume 5 → Módulo 36 → **Capítulo 114 de 119**.
