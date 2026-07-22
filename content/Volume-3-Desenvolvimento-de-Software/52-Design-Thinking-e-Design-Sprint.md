---
title: '52 - Design Thinking e Design Sprint'
---

# Capítulo 52 — Design Thinking e Design Sprint

> **Volume 3 — Desenvolvimento de Software** · Módulo 14 — UX e Design de Produto
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **Design Thinking** e suas cinco fases (empatizar, definir, idear, prototipar, testar).
- Compreender o **duplo diamante** (divergir e convergir) e por que alternamos entre abrir e fechar ideias.
- Conhecer o **Design Sprint** de 5 dias do Google Ventures e quando usá-lo.
- Diferenciar o **espaço do problema** do **espaço da solução** — e por que pular o primeiro é o erro mais caro.
- Aplicar essas abordagens para reduzir o risco de construir a coisa errada.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]] e [[47-Elicitacao-personas-e-jornada-do-usuario]] — Design Thinking usa empatia, personas e testes.

---

## 📖 Introdução

Como um time sai de "temos um problema (ou uma ideia)" para "temos uma solução que sabemos que funciona" — **sem** gastar meses construindo algo que ninguém quer? Essa é a pergunta que o **Design Thinking** e o **Design Sprint** respondem. Eles são **processos de inovação**: formas estruturadas de descobrir problemas reais, gerar muitas ideias e validar as melhores **rápido e barato**, antes de escrever código caro.

O nome "Design Thinking" assusta um pouco — parece coisa de designer, ou de consultoria cara com post-its coloridos. Mas a ideia central é simples e poderosa, e serve a **qualquer pessoa que resolve problemas**, inclusive engenheiros: **entenda profundamente o problema e as pessoas antes de se apaixonar por uma solução.** É a defesa contra o vício mais comum da nossa profissão — o de pular direto para "como vou construir" antes de perguntar "qual é o problema, afinal?".

Este capítulo te dá dois processos concretos. O **Design Thinking** é a mentalidade e as cinco fases; o **Design Sprint** é uma "receita" intensiva de **5 dias** para atacar um problema grande com foco total. Entender ambos te faz participar melhor das fases de descoberta do produto — e, mesmo quando não há um designer por perto, aplicar o raciocínio para não construir a escada na parede errada.

---

## 🧠 Analogia

Pense em como um **detetive** resolve um caso — versus como um **palpiteiro** age.

O palpiteiro chega na cena, olha por cinco segundos e crava: "foi o mordomo!". Ele se apaixona pela primeira ideia e passa o caso inteiro tentando provar que estava certo — ignorando pistas que o contradizem. Metade das vezes prende o inocente.

O detetive faz o oposto. Primeiro ele **investiga sem concluir**: ouve testemunhas, examina a cena, junta o máximo de evidências (fase de **empatia** e **definição** — abrir o leque). Só então ele **levanta várias hipóteses** (idear — abrir de novo), e a seguir vai **estreitando**: descarta as improváveis, testa as promissoras com evidências (prototipar e testar — fechar). Ele **alterna** entre abrir (explorar amplo) e fechar (decidir), e nunca se casa com a primeira ideia.

Design Thinking é o método do detetive aplicado a produtos. O grande erro dos times é agir como o palpiteiro: apaixonar-se pela primeira solução ("é só fazer um app com IA!") e gastar meses provando que era boa — quando bastava investigar o problema primeiro. Guarde o ritmo: **abrir, fechar, abrir, fechar** — e jamais prender o mordomo no primeiro olhar.

---

## 🧩 Conceitos fundamentais

### 1. Design Thinking — a definição

**Design Thinking** é uma abordagem de resolução de problemas **centrada no ser humano**, que combina **empatia** (entender as pessoas), **criatividade** (gerar muitas ideias) e **experimentação** (testar rápido). Foi popularizado pela consultoria **IDEO** e pela **d.school de Stanford**. Não é exclusivo de design gráfico — é usado para produtos, serviços, processos e até políticas públicas.

> **Termo explicado — Design Thinking:** processo de inovação centrado no humano, que alterna entender profundamente as pessoas, gerar muitas ideias e testar protótipos rápido.

### 2. As 5 fases (modelo da d.school)

```
EMPATIZAR → DEFINIR → IDEAR → PROTOTIPAR → TESTAR
(entender    (formular  (gerar   (construir    (validar
 as pessoas) o problema) ideias)  rascunhos)    com gente)
       ↖________________ é iterativo: volta-se sempre ________________↙
```

1. **Empatizar** — mergulhar na realidade do usuário (entrevistas, observação, jornadas). Entender dores e contextos, sem julgar.
2. **Definir** — sintetizar a pesquisa num **problema claro** (o *point of view*): "A Marta precisa de um jeito de pedir comida sem se sentir perdida, porque tem baixa familiaridade com apps."
3. **Idear** — gerar **muitas** ideias sem censura (brainstorming). Quantidade primeiro; qualidade depois. "Não existe ideia ruim" nesta fase.
4. **Prototipar** — transformar as ideias promissoras em **rascunhos baratos** (papel, wireframe) para tornar o abstrato tangível.
5. **Testar** — colocar o protótipo na frente de usuários reais e **aprender**. O que falha volta para as fases anteriores.

O processo é **iterativo e não linear**: testar pode te mandar de volta a redefinir o problema. Não é uma escada; é um ciclo.

### 3. O duplo diamante — divergir e convergir

O **duplo diamante** (do British Design Council) desenha o ritmo do Design Thinking como dois losangos:

```
   ◇ DESCOBRIR ◇        ◇ DESENVOLVER ◇
  /  (divergir) \      /  (divergir)   \
 <   PROBLEMA    >    <    SOLUÇÃO       >
  \ (convergir) /      \  (convergir)   /
   ◇ DEFINIR   ◇        ◇   ENTREGAR   ◇
   [espaço do problema] [espaço da solução]
```

- **1º diamante (problema):** primeiro **divergir** (explorar amplamente o problema, sem pressa de resolver) e depois **convergir** (definir qual é o problema certo).
- **2º diamante (solução):** primeiro **divergir** (gerar muitas soluções) e depois **convergir** (escolher e refinar a melhor).

A lição do duplo diamante: **não pule o primeiro diamante**. A maioria dos times começa direto no segundo (soluções), resolvendo o problema errado com perfeição.

> **Termo explicado — divergir e convergir:** divergir é abrir o leque (muitas ideias/possibilidades); convergir é fechar (decidir, filtrar). Inovar é alternar os dois ritmos, sem misturá-los.

### 4. Espaço do problema vs. espaço da solução

O **espaço do problema** é onde você entende **o que** precisa ser resolvido e **por quê** (dores, necessidades, contexto). O **espaço da solução** é onde você decide **como** resolver (features, telas, tecnologia). O erro capital da engenharia é **saltar** para o espaço da solução ("vamos usar tal tecnologia", "vamos fazer tal tela") antes de habitar o espaço do problema. Design Thinking força você a ficar no problema tempo suficiente.

### 5. Design Sprint — a versão de 5 dias

O **Design Sprint** é uma metodologia criada por **Jake Knapp no Google Ventures** que comprime a essência do Design Thinking em **5 dias** intensos, com um time pequeno e foco total, para responder a uma pergunta grande de negócio **sem** construir o produto real:

- **Segunda — Mapear:** entender o problema e escolher um alvo (empatizar + definir).
- **Terça — Esboçar:** cada um gera soluções no papel (idear).
- **Quarta — Decidir:** escolher a melhor solução e montar um roteiro (convergir).
- **Quinta — Prototipar:** construir um protótipo **realista** (mas falso — fachada) do fluxo escolhido.
- **Sexta — Testar:** colocar na frente de 5 usuários reais e aprender.

Ao fim da semana, você tem **evidência real** sobre uma ideia grande — tendo gastado 5 dias, não 5 meses. É a materialização do "aprender barato" do MVP ([[49-MVP-priorizacao-e-validacao]]), aplicado **antes** mesmo de construir.

> **Termo explicado — Design Sprint:** processo de 5 dias (mapear, esboçar, decidir, prototipar, testar) para validar uma ideia grande com usuários reais antes de investir em construí-la.

---

## ⚙️ Como funciona na prática

Como esses processos entram no dia a dia de um time de produto:

**Quando usar Design Thinking (contínuo).** Como **mentalidade**, ele permeia o discovery: antes de cada iniciativa grande, o time empatiza (pesquisa), define o problema, ideia soluções, prototipa e testa. Não precisa ser um workshop formal — é o hábito de **entender antes de construir**.

**Quando usar um Design Sprint (pontual).** Ele é uma **artilharia pesada** para momentos específicos: uma aposta grande e arriscada, uma decisão cara, um impasse no time ("vamos por A ou por B?"). Não se faz Design Sprint toda semana — é intenso e caro em atenção. Reserva-se para as perguntas que **valem** cinco dias focados.

**O papel do engenheiro.** Você pode achar que isso é "coisa de designer e PM", mas o dev tem papel valioso: (1) na **ideação**, você traz o que é **tecnicamente possível** e barato (às vezes a solução mais simples é técnica, e só você a enxerga); (2) na **prototipagem** de um sprint, um dev consegue montar um protótipo mais realista rápido; (3) na **viabilidade** — o Design Thinking equilibra três lentes: **desejabilidade** (o usuário quer? — UX), **viabilidade** (o negócio sustenta? — PM) e **factibilidade** (dá para construir? — **engenharia**). Sem a lente da engenharia, o time desenha sonhos impossíveis.

**A conexão com todo o resto.** Design Thinking gera as personas e jornadas ([[47-Elicitacao-personas-e-jornada-do-usuario]]), alimenta os requisitos e o MVP ([[49-MVP-priorizacao-e-validacao]]), e desemboca nos **protótipos de Figma** ([[53-Figma-wireframes-prototipos-e-Design-System]]) que serão testados e, depois, implementados. É a "cola" da fase de descoberta.

---

## 🍔 Aplicação na SaborExpress

A SaborExpress precisava decidir uma aposta grande: **como conquistar os restaurantes** (não os clientes) — porque sem restaurantes bons, não há app. A Ana tinha uma ideia fixa: "vamos dar um tablet grátis para cada restaurante". O time propôs um **Design Sprint** de 5 dias antes de gastar com tablets.

- **Segunda (mapear):** conversaram com donos de restaurante e mapearam a dor real. A queixa **não** era falta de tablet — era **medo de complicar a cozinha no pico** e **desconfiança sobre as taxas**. O problema foi redefinido: não é "dar equipamento", é "reduzir o medo de que o app atrapalhe a operação".
- **Terça (esboçar):** todos, inclusive um dev, esboçaram soluções. O dev lembrou que a maioria dos restaurantes **já tinha** um celular ou tablet velho — a solução podia ser um app leve, não hardware novo (a lente da **factibilidade** e do custo).
- **Quarta (decidir):** escolheram testar um **painel super simples com som alto e botão gigante "aceitar"** (lembra a observação do [[47-Elicitacao-personas-e-jornada-do-usuario]]?), rodando no aparelho que o restaurante já tem.
- **Quinta (prototipar):** montaram um protótipo **falso mas realista** no Figma, simulando pedidos chegando.
- **Sexta (testar):** cinco donos de restaurante testaram. Quatro adoraram a simplicidade; um travou porque o som não era alto o bastante na cozinha barulhenta — insight valioso.

**O resultado:** a Ana **economizou** o dinheiro dos tablets (que não resolviam a dor real) e o time saiu da semana com um **fluxo validado** para o lado dos restaurantes. Se tivessem seguido o palpite inicial ("dar tablets"), teriam gasto caro resolvendo o problema **errado** — o palpiteiro prendendo o mordomo. Cinco dias no espaço do problema pouparam meses no espaço da solução errada.

---

## 🏢 Como isso acontece em uma empresa

- **Design Thinking virou linguagem corporativa.** Grandes empresas têm áreas de inovação, workshops e facilitadores. Há exageros ("teatro de post-its"), mas o núcleo — entender antes de construir — é sólido.
- **Design Sprints são usados para decisões caras.** Times fazem sprints antes de investir num novo produto ou repensar um fluxo crítico. É comum em consultorias de produto e áreas de inovação.
- **O "duplo diamante" guia o processo de design** em muitas empresas, separando explicitamente as fases de "descobrir o problema certo" e "construir a solução certa".
- **As três lentes (desejável/viável/factível)** aparecem em decisões de produto o tempo todo. Um engenheiro que fala a linguagem das três participa das decisões, em vez de só receber ordens.
- **Discovery contínuo.** A tendência moderna (Teresa Torres, *Continuous Discovery*) é fazer descoberta **toda semana**, em pequenas doses, em vez de grandes sprints esporádicos — mantendo o time sempre em contato com usuários.
- **Cuidado com o "inovação-teatro".** Workshops cheios de post-its que não mudam nada são o equivalente ao "teatro ágil" ([[42-O-Manifesto-Agil]]). O valor está no aprendizado real com usuários, não nos rituais coloridos.

---

## ⚠️ Erros comuns

- **Pular o espaço do problema.** Correr para soluções ("vamos fazer um app com IA!") antes de entender a dor real é o erro nº 1 — e o mais caro. Fique no problema tempo suficiente.
- **Apaixonar-se pela primeira ideia.** O palpiteiro prende o mordomo. Divergir de verdade significa gerar **muitas** opções antes de escolher, mesmo quando a primeira parece ótima.
- **Misturar divergir e convergir.** Julgar ideias durante o brainstorming ("isso não vai dar certo") mata a criatividade. Abra primeiro (sem crítica), feche depois (com critério). Separe os ritmos.
- **Fazer Design Sprint para tudo.** É artilharia pesada; usá-lo para problemas pequenos desperdiça a energia do time. Reserve para apostas grandes e caras.
- **Excluir a engenharia da descoberta.** Sem a lente da factibilidade, o time desenha soluções impossíveis ou caríssimas. O dev deve estar na sala.
- **Tratar como ritual, não como aprendizado.** Post-its bonitos sem contato real com usuários são teatro. O objetivo é **evidência**, não a foto do workshop.
- **Achar que Design Thinking substitui execução.** Ele reduz o risco de construir a coisa errada, mas alguém ainda precisa **construir bem** a coisa certa (o resto do volume).

---

## 💡 Dicas profissionais

- **Antes de resolver, pergunte: "qual é o problema, mesmo?"** Force-se a articular o problema em uma frase centrada no usuário antes de discutir soluções. Metade dos projetos ruins nasce de um problema mal definido.
- **Na ideação, mire quantidade.** "Vamos listar 20 formas de resolver isso" gera opções melhores do que debater a primeira. As boas ideias costumam vir depois das óbvias.
- **Traga a lente técnica cedo.** Como dev, você enxerga soluções baratas e viáveis que o time não vê — e evita que apostem no tecnicamente inviável. Fale na fase de ideação, não só na de execução.
- **Prototipe barato e descartável.** Papel, wireframe, um Figma "de fachada". Quanto mais barato o protótipo, menos você se apega a ele e mais honesto é o teste.
- **Teste com 5, decida com evidência.** Como no capítulo anterior, cinco usuários já revelam muito. Deixe o comportamento deles — não a opinião mais alta na sala — decidir.
- **Use o Design Sprint como desempate.** Quando o time está travado entre caminhos ("A ou B?"), uma semana de sprint com usuários reais resolve o impasse melhor que semanas de reunião.

---

## 🎈 Curiosidades

- O **Design Thinking** foi popularizado pela **IDEO** (David Kelley) e pela **d.school de Stanford**. Um dos casos fundadores foi o redesenho do **carrinho de compras de supermercado** pela IDEO, num programa de TV nos anos 1990 — mostrando o método aplicado a um objeto banal.
- O **Design Sprint** nasceu no **Google Ventures**, e Jake Knapp o descreveu no livro *Sprint* (2016). Foi usado para validar produtos de startups do portfólio do Google em uma única semana — incluindo casos famosos como o da Slack e do Blue Bottle Coffee.
- O **duplo diamante** foi criado pelo **British Design Council** em 2005 e virou um dos diagramas mais reproduzidos do mundo do design.
- A frase *"fall in love with the problem, not the solution"* ("apaixone-se pelo problema, não pela solução") virou mantra do mundo de produto — é a essência do primeiro diamante.
- Existe uma versão condensada do Design Sprint chamada **Sprint 2.0** e variações de 1 a 4 dias, para times que não conseguem parar uma semana inteira. A ideia se adapta ao orçamento de tempo.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Design Thinking** | Processo de inovação centrado no humano: empatia + criatividade + experimentação. |
| **Empatizar** | Entender profundamente o usuário (dores, contexto), sem julgar. |
| **Definir** | Sintetizar a pesquisa num problema claro e centrado no usuário. |
| **Idear** | Gerar muitas ideias sem censura (quantidade antes de qualidade). |
| **Prototipar** | Transformar ideias em rascunhos baratos e tangíveis. |
| **Divergir / convergir** | Abrir o leque de possibilidades / fechar e decidir. |
| **Duplo diamante** | Divergir+convergir no problema, depois na solução. |
| **Espaço do problema / da solução** | Entender *o que/por quê* vs. decidir *como*. |
| **Design Sprint** | Processo de 5 dias para validar uma ideia grande com usuários reais. |
| **Desejável / viável / factível** | As 3 lentes: o usuário quer? / o negócio sustenta? / dá para construir? |

---

## 📝 Resumo

- **Design Thinking** é um processo de inovação **centrado no humano** com cinco fases: **empatizar, definir, idear, prototipar, testar** — iterativo, não linear. A essência é **entender o problema e as pessoas antes de se apaixonar por uma solução**.
- O **duplo diamante** mostra o ritmo: **divergir e convergir** primeiro no **problema**, depois na **solução**. O erro capital é pular o primeiro diamante e resolver o problema errado com perfeição.
- **Espaço do problema** (o quê/por quê) vem antes do **espaço da solução** (como). Engenheiros tendem a saltar para o "como" — Design Thinking força a habitar o "o quê".
- O **Design Sprint** (Google Ventures) comprime tudo em **5 dias** (mapear, esboçar, decidir, prototipar, testar) para validar uma aposta grande **antes** de construir — o "aprender barato" levado ao extremo.
- Boas decisões equilibram **desejabilidade** (UX), **viabilidade** (negócio) e **factibilidade** (engenharia) — e o dev deve estar na sala desde a descoberta.

---

## ☑️ Checklist de aprendizado

- [ ] Conheço as 5 fases do Design Thinking e sei que o processo é iterativo.
- [ ] Explico o duplo diamante e o ritmo divergir/convergir.
- [ ] Diferencio espaço do problema de espaço da solução.
- [ ] Sei o que é um Design Sprint e quando usá-lo.
- [ ] Entendo as 3 lentes (desejável/viável/factível) e o papel do dev.
- [ ] Reconheço o erro de pular para a solução antes de entender o problema.

---

## ✏️ Exercícios

**1.** Explique, com a analogia do detetive, por que "apaixonar-se pela primeira solução" é perigoso num projeto.

**2.** Associe cada atividade à fase do Design Thinking: (a) entrevistar donos de restaurante sobre suas dores; (b) listar 20 ideias de como facilitar o recebimento de pedidos; (c) montar um rascunho em papel; (d) escrever "o dono precisa de X porque Y"; (e) colocar o protótipo na frente de 5 usuários.

**3.** O que significa "divergir e convergir", e por que é um erro julgar ideias **durante** a fase de ideação?

**4.** Descreva os 5 dias de um Design Sprint e diga que tipo de problema justifica usá-lo (em vez de só seguir tocando o backlog).

**5. (Reflexão)** A Ana quer "colocar IA na SaborExpress porque está na moda". Usando o conceito de espaço do problema vs. solução, como você conduziria a conversa para evitar construir a coisa errada?

---

## 💬 Respostas comentadas

**1.** Porque, como o palpiteiro que crava "foi o mordomo" e passa o caso tentando provar isso, um time apaixonado pela primeira solução para de investigar e passa a **ignorar evidências** que a contradizem. Ele gasta tempo e dinheiro construindo e defendendo a ideia inicial em vez de descobrir se ela resolve o problema real. O detetive (Design Thinking) investiga antes de concluir e testa hipóteses com evidência — reduzindo a chance de "prender o inocente", isto é, construir algo que ninguém quer.

**2.** (a) **Empatizar**; (b) **Idear**; (c) **Prototipar**; (d) **Definir**; (e) **Testar**.

**3.** **Divergir** é abrir o leque, gerando muitas possibilidades sem filtro; **convergir** é fechar, filtrando e decidindo. É erro julgar ideias durante a ideação (fase de divergir) porque a crítica precoce mata a criatividade: as pessoas param de propor por medo de "ideia ruim", e as melhores ideias — que muitas vezes vêm depois das óbvias ou de uma ideia "maluca" refinada — nunca aparecem. Separam-se os ritmos: primeiro abre (sem crítica), depois fecha (com critério).

**4.** **Segunda — mapear** o problema e escolher um alvo; **terça — esboçar** soluções individualmente; **quarta — decidir** qual solução prototipar e montar o roteiro; **quinta — prototipar** um fluxo realista (mas falso); **sexta — testar** com 5 usuários reais. Justifica usá-lo um problema **grande, arriscado e caro**: uma aposta nova de produto, uma decisão que custaria muito se estivesse errada, ou um impasse do time entre caminhos. Para tarefas pequenas e rotineiras do backlog, o sprint é exagero — segue-se o fluxo normal.

**5.** Eu traria a conversa do **espaço da solução** ("IA") de volta ao **espaço do problema**: "IA é uma **solução** — qual **problema** do usuário ou do negócio queremos resolver?". Perguntaria: que dor concreta os clientes ou restaurantes têm hoje? (ex.: demora para achar o que pedir, previsão de entrega ruim, atendimento de suporte lento). Só depois de definir o problema real avaliaríamos se **IA** é a melhor solução para ele — ou se algo mais simples resolve. Assim evitamos o erro de partir da tecnologia da moda e forçar um problema para ela, gastando caro numa solução em busca de um problema. Se, após entender o problema, a IA se mostrar a melhor resposta (com as 3 lentes: o usuário quer, o negócio sustenta, dá para construir), aí sim se investe.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]] — as regras de usabilidade aplicadas às soluções.
- **Próximo (linear):** [[53-Figma-wireframes-prototipos-e-Design-System]] — onde os protótipos ganham forma para testar e implementar.
- **Base:** [[47-Elicitacao-personas-e-jornada-do-usuario]] (empatia) e [[49-MVP-priorizacao-e-validacao]] (aprender barato).
- **Mentalidade irmã:** [[42-O-Manifesto-Agil]] — experimentar e adaptar; e Volume 4 (experimentação, A/B testing) — validar continuamente em produção.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 14 → **Capítulo 52 de 119**.
