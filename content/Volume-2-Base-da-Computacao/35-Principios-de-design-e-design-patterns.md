---
title: '35 - Princípios de design e Design Patterns'
---

# Capítulo 35 — Princípios de design e Design Patterns

> **Volume 2 — A Base da Computação** · Módulo 9 — Qualidade de código e princípios de design
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que são **princípios de design** e por que existem.
- Dominar os princípios essenciais: **DRY**, **KISS**, **YAGNI** e o **SOLID** (uma letra de cada vez, sem susto).
- Entender o conceito de **acoplamento** e **coesão** — o "norte" de todo bom design.
- Saber o que é um **design pattern (padrão de projeto)** e reconhecer alguns dos mais usados.
- Perceber quando aplicar padrões — e o perigo de aplicá-los demais.
- Ligar esses princípios ao código limpo e à capacidade do software de **mudar sem quebrar**.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos de exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- [[34-Codigo-limpo]] (a base imediata) e [[33-Paradigmas-e-orientacao-a-objetos]] (SOLID e patterns nascem sobre a OO).

---

## 📖 Introdução

No capítulo anterior você aprendeu a escrever código limpo **linha a linha** (nomes, funções). Agora subimos um nível: como organizar o código **em grande escala**, para que um sistema inteiro permaneça compreensível e, sobretudo, **fácil de mudar** ao longo dos anos. Essa é a fronteira entre "programar" e "fazer design de software".

Software muda o tempo todo — é a sua natureza maleável ([[07-O-que-e-software]]). A pergunta central do design é: **como estruturar o código para que uma mudança futura seja fácil e segura, em vez de um dominó de quebras?** Ao longo de décadas, a comunidade destilou essa sabedoria em **princípios** (regras gerais como DRY e SOLID) e **padrões** (soluções prontas para problemas recorrentes, os *design patterns*).

Cuidado com o tom: estes são **guias**, não leis sagradas. Aplicados com bom senso, tornam sistemas duráveis; aplicados como dogma, geram complexidade inútil. Este capítulo te dá as ferramentas **e** o senso de quando usá-las — fechando o módulo de qualidade de código e preparando você para ler e escrever sistemas de verdade.

---

## 🧠 Analogia

Pense na diferença entre uma **casa bem projetada** e uma **casa puxadinho**.

Na casa **bem projetada**, o encanamento, a elétrica e a estrutura são pensados para o futuro: trocar uma torneira não exige quebrar a parede da sala; ampliar um cômodo não derruba a casa. As partes são **independentes o suficiente** para mudar uma sem estragar as outras.

Na casa **puxadinho**, cada cômodo foi grudado no anterior sem plano. Tudo está tão entrelaçado que mexer na cozinha alaga o banheiro, e adicionar um quarto exige rezar. Ela "funciona" — até você precisar mudar algo.

Os **princípios de design** são as boas práticas de construção (não misture o cano de esgoto com a fiação; deixe pontos de manutenção acessíveis). Os **design patterns** são as **plantas testadas** que arquitetos reutilizam ("para uma escada em espaço apertado, use este modelo caracol que já sabemos que funciona"). Guarde: **bom design é construir a casa para poder reformá-la depois sem derrubá-la.**

---

## 🧩 Conceitos fundamentais

### 1. O objetivo de todo design: mudar sem quebrar

O norte de tudo neste capítulo é permitir a **mudança segura**. Dois conceitos gêmeos medem isso:

- **Acoplamento:** o quanto as partes do sistema **dependem umas das outras**. Muito acoplamento = mexer numa parte quebra outras (o puxadinho). Queremos **baixo acoplamento**.
- **Coesão:** o quanto cada parte é **focada numa única responsabilidade**. Alta coesão = cada módulo faz uma coisa bem. Queremos **alta coesão**.

O mantra: **baixo acoplamento, alta coesão.** Quase todos os princípios abaixo são formas de perseguir isso.

> **Termo explicado — acoplamento / coesão:** acoplamento é o grau de dependência entre partes (queremos baixo); coesão é o quanto cada parte tem foco único (queremos alta). Juntos, definem se o sistema é fácil de mudar.

### 2. DRY — Don't Repeat Yourself (não se repita)

Cada pedaço de conhecimento deve existir em **um único lugar** no sistema. Se a mesma regra (o cálculo do frete) está copiada em cinco lugares ([[34-Codigo-limpo]]), mudá-la vira um pesadelo propenso a erro. **DRY** = extraia o comum para um só lugar e reutilize.

> Cuidado com o exagero: nem toda semelhança é duplicação. Dois trechos parecidos que mudam por razões diferentes talvez **devam** ficar separados. DRY é sobre duplicar **conhecimento/regra**, não sobre banir qualquer linha parecida.

### 3. KISS — Keep It Simple (mantenha simples)

A solução mais **simples** que resolve o problema costuma ser a melhor. Complexidade é cara: mais difícil de entender, testar e manter. Diante de duas soluções que funcionam, prefira a mais simples. "Esperteza" desnecessária é um custo, não um mérito (liga com o [[34-Codigo-limpo]]: legibilidade > esperteza).

### 4. YAGNI — You Aren't Gonna Need It (você não vai precisar)

Não construa o que você **acha** que talvez seja útil no futuro. Implemente o que é preciso **agora**. Código feito "por precaução" quase sempre vira peso morto (complexidade que ninguém usa) e muitas vezes nem serve quando a necessidade real chega. Resolva o problema de hoje bem; o de amanhã, quando ele existir de verdade.

### 5. SOLID — cinco princípios da OO (sem susto)

**SOLID** é um acrônimo de cinco princípios para código orientado a objetos ([[33-Paradigmas-e-orientacao-a-objetos]]) sustentável. Um de cada vez, em linguagem simples:

- **S — Responsabilidade Única:** cada classe/função deve ter **um só motivo para mudar** (uma responsabilidade). É a "alta coesão" e a "função que faz uma coisa" do [[34-Codigo-limpo]].
- **O — Aberto/Fechado:** o código deve ser **aberto para extensão, fechado para modificação** — você adiciona comportamento novo **sem alterar** o que já funciona (lembra do polimorfismo: novo tipo de pedido = nova classe, sem mexer nas existentes).
- **L — Substituição de Liskov:** um objeto de uma subclasse deve poder **substituir** o da classe-mãe sem quebrar o programa. Se `PedidoExpresso` herda de `Pedido`, ele deve se comportar como um `Pedido` onde quer que um seja esperado.
- **I — Segregação de Interfaces:** é melhor várias interfaces **pequenas e específicas** do que uma gigante que obriga a implementar o que não se usa.
- **D — Inversão de Dependência:** dependa de **abstrações** (contratos), não de implementações concretas. Isso reduz acoplamento — a peça de cima não fica presa aos detalhes da de baixo.

> **Termo explicado — SOLID:** cinco princípios de design OO (Responsabilidade única, Aberto/fechado, Liskov, Segregação de interfaces, Inversão de dependência) que, juntos, buscam baixo acoplamento e alta coesão.

Não decore as letras hoje — entenda que **todos apontam para o mesmo lugar**: partes focadas e independentes, fáceis de mudar e estender.

### 6. Design Patterns — soluções prontas para problemas recorrentes

Um **design pattern (padrão de projeto)** é uma **solução testada e reutilizável** para um problema comum de organização de código. Não é código pronto para copiar: é uma **receita/modelo** de como estruturar. Alguns dos mais famosos (do livro clássico "Gang of Four", 1994):

- **Singleton:** garantir que exista **uma única instância** de algo (ex.: uma única conexão de configuração). (Também o mais "criticado" por facilitar mau uso.)
- **Factory (fábrica):** um objeto responsável por **criar** outros objetos, escondendo os detalhes da criação.
- **Observer (observador):** quando algo muda, **notificar automaticamente** os interessados (ex.: pedido mudou de status → avisar cliente, cozinha e entregador). É a base de sistemas orientados a eventos.
- **Strategy (estratégia):** encapsular **algoritmos intercambiáveis** e trocá-los conforme a situação (ex.: diferentes formas de calcular frete, selecionáveis).

> **Termo explicado — design pattern:** um modelo de solução consagrado para um problema recorrente de design de software. Um "vocabulário comum" entre engenheiros para estruturar código.

O maior valor dos patterns é serem um **vocabulário compartilhado**: dizer "aqui usei um Observer" comunica uma estrutura inteira ao time numa palavra.

### 7. O maior risco: over-engineering

Aqui vai o aviso mais importante do capítulo. Aplicar princípios e patterns **demais**, ou onde não são necessários, cria **over-engineering** — complexidade inútil que torna o código *mais* difícil, não menos. Um "Hello, World" não precisa de cinco camadas de abstração. Patterns resolvem problemas *quando eles aparecem*; forçá-los antes disso viola o próprio **KISS** e o **YAGNI**. A maturidade não é saber muitos patterns — é saber **quando não usá-los**.

---

## ⚙️ Como funciona na prática

Vamos ver os princípios trabalhando juntos num exemplo da SaborExpress: o **cálculo de frete**, que precisa suportar várias formas (normal, expresso, grátis por promoção) e mudar com frequência.

**Abordagem ingênua** (viola vários princípios):
```
função calcularFrete(pedido) {
    se (pedido.tipo == "normal")   { ... cálculo A ... }
    senão se (pedido.tipo == "expresso") { ... cálculo B ... }
    senão se (pedido.tipo == "promo")    { ... cálculo C ... }
    // toda nova forma de frete = editar esta função e arriscar quebrar as outras
}
```
Problemas: essa função tem **muitas responsabilidades** (viola o **S**), e cada nova forma de frete exige **modificá-la** (viola o **O**, aberto/fechado) — mexer aqui pode quebrar cálculos que já funcionavam.

**Abordagem com o padrão Strategy** (aplicando os princípios):
```
// cada estratégia de frete é uma peça independente, com UMA responsabilidade (S)
FreteNormal:   calcular(pedido) → ...
FreteExpresso: calcular(pedido) → ...
FretePromo:    calcular(pedido) → ...

// o pedido usa a estratégia adequada, sem um "if" gigante (O: aberto/fechado)
frete = pedido.estrategiaDeFrete.calcular(pedido)
```
Agora, **adicionar** uma nova forma de frete (ex.: "frete de aniversário") é criar uma **nova estratégia** — **sem tocar** nas existentes. Baixo acoplamento (as estratégias não se conhecem), alta coesão (cada uma faz um cálculo), aberto para extensão, fechado para modificação. A regra de cada frete vive em **um lugar** (DRY).

Repare no equilíbrio, porém: isso vale a pena **porque** o frete realmente varia e muda muito (o problema existe). Se a SaborExpress tivesse **um único** tipo de frete que nunca muda, aplicar Strategy seria **over-engineering** — um `if` simples bastaria (KISS/YAGNI). O padrão é a resposta certa **para o problema certo**. Essa é a arte: reconhecer quando a complexidade do padrão se paga e quando ela é peso morto. Bom design não é usar todos os patterns — é usar o mínimo que resolve bem e deixa a porta aberta para mudar.

---

## 🍔 Aplicação na SaborExpress

**Design pensado para a SaborExpress evoluir.** A Ana vive pedindo mudanças: novos métodos de pagamento, novas regras de promoção, novos tipos de entrega. Um sistema com **baixo acoplamento e alta coesão** absorve cada pedido desses como uma peça nova encaixada — rápido e sem quebrar o que já funciona. Um sistema acoplado (puxadinho) transforma cada pedido da Ana numa cirurgia de risco. O design não é abstração acadêmica: é o que determina se a SaborExpress consegue **acompanhar o mercado** ou fica presa, com medo de mexer no próprio código.

**O padrão Observer no coração do delivery.** Quando um pedido da SaborExpress muda de status ("aceito" → "em preparo" → "saiu para entrega" → "entregue"), várias partes precisam saber: o cliente (notificação no app), a cozinha (painel), o entregador (rota), o sistema de métricas. O padrão **Observer** modela exatamente isso: o pedido "avisa" automaticamente todos os interessados quando muda. Sem esse padrão, cada mudança de status teria que, manualmente, chamar cada parte — acoplando tudo e facilitando esquecer alguém. Com Observer, adicionar um novo interessado (ex.: um sistema de fidelidade) não mexe no pedido.

**O risco do over-engineering para uma startup.** Por outro lado, a SaborExpress no início é pequena. Se o time da Ana gastar semanas montando uma arquitetura cheia de padrões "para quando tivermos milhões de usuários" (que talvez nunca cheguem), estará violando **YAGNI** e queimando o tempo que deveria ir para validar o produto ([[12-Como-nasce-uma-startup]]). Para uma startup, o equilíbrio é: **código limpo e princípios sólidos, sim; complexidade especulativa, não.** Resolver bem o problema de hoje, com o design aberto para o de amanhã.

---

## 🏢 Como isso acontece em uma empresa

- **Patterns são vocabulário de time.** "Vamos usar um Factory aqui", "isso pede um Observer" — dizer o nome do padrão comunica uma estrutura inteira instantaneamente. Conhecer o vocabulário te faz participar das conversas de design.
- **Code reviews discutem acoplamento.** "Isso está muito acoplado", "essa classe tem responsabilidades demais" são feedbacks comuns em Pull Requests (Volume 3). Os princípios deste capítulo são os critérios dessas discussões.
- **Over-engineering é criticado tanto quanto código sujo.** Times maduros valorizam simplicidade. Um júnior que enche o código de abstrações desnecessárias é corrigido tanto quanto um que escreve bagunça. O elogio é "simples e extensível", não "complexo e cheio de patterns".
- **SOLID guia arquitetura.** Decisões de como dividir um sistema em partes (Volume 3 — Arquitetura) apoiam-se fortemente nesses princípios, especialmente responsabilidade única e inversão de dependência.

---

## ⚠️ Erros comuns

- **Aplicar patterns por status, não por necessidade.** Usar um padrão "porque é avançado" onde um `if` resolveria é over-engineering. O padrão deve resolver um problema **real e presente**.
- **Tratar princípios como leis absolutas.** DRY, SOLID etc. são **guias**. Segui-los cegamente (ex.: DRY forçando união de coisas que deveriam ser separadas) gera código pior. Use o julgamento.
- **Confundir DRY com "banir qualquer linha parecida".** Duplicação é sobre **conhecimento/regra** repetido. Dois trechos parecidos que mudam por motivos diferentes podem, e às vezes devem, ficar separados.
- **Ignorar acoplamento até doer.** Sistemas onde tudo depende de tudo travam a evolução. Perceber e reduzir acoplamento cedo evita a reescrita dolorosa depois.
- **Achar que precisa decorar os 23 patterns clássicos.** Não precisa. Entenda a **ideia** (soluções reutilizáveis para problemas comuns) e alguns dos mais úteis. O resto se consulta.
- **Violar KISS/YAGNI em nome de SOLID.** Se aplicar um princípio deixa o código mais complexo sem benefício real, você errou o alvo. Simplicidade também é um princípio.

---

## 💡 Dicas profissionais

- **Persiga sempre "baixo acoplamento, alta coesão".** Se você lembrar só de uma coisa deste capítulo, que seja esta. Quase todo bom design decorre dela.
- **Aplique padrões quando o problema aparecer, não antes.** Deixe o design **emergir** da necessidade real. Refatorar para um pattern quando a dor surge é melhor do que adivinhá-lo cedo demais (YAGNI).
- **Equilibre os princípios entre si.** DRY vs. acoplamento, SOLID vs. KISS — eles às vezes puxam para lados opostos. O julgamento de qual priorizar em cada caso é a habilidade sênior.
- **Aprenda os patterns como vocabulário, não como obrigação.** Saber reconhecer e nomear Observer, Factory, Strategy te ajuda a ler código dos outros e a conversar com o time — mesmo que você use poucos.
- **Na dúvida, prefira o simples.** Você quase nunca se arrepende de um código simples e claro; você frequentemente se arrepende de um complexo e "esperto". Comece simples; adicione estrutura quando a necessidade provar que ela é preciso.

---

## 🎈 Curiosidades

- Os **design patterns** foram popularizados pelo livro **"Design Patterns"** (1994), escrito por quatro autores que ficaram conhecidos como a **"Gang of Four" (GoF)**. Ele catalogou 23 padrões e virou um dos livros mais influentes (e citados) da computação.
- A ideia de "padrões" não nasceu na computação: veio da **arquitetura** (de prédios!), do arquiteto **Christopher Alexander**, que catalogou padrões de bons espaços urbanos. Os autores da computação pegaram a ideia emprestada — a analogia da "casa bem projetada" é, portanto, quase literal.
- O padrão **Singleton** é simultaneamente um dos mais conhecidos e um dos mais **criticados** — muitos o chamam de "anti-pattern" por facilitar código acoplado e difícil de testar. É um lembrete perfeito de que padrão não é sinônimo de "boa ideia sempre".
- Existe uma sabedoria popular na engenharia: **"toda arquitetura é uma troca (trade-off)"**. Não há design perfeito, só designs adequados a certas prioridades. Reconhecer os trade-offs, em vez de buscar a perfeição, é sinal de maturidade — a mesma lição de engenharia do [[08-O-que-e-engenharia-de-software]].

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Princípio de design** | Regra geral que orienta a organização do código (DRY, SOLID...). |
| **Acoplamento** | O quanto as partes dependem umas das outras (queremos baixo). |
| **Coesão** | O quanto cada parte tem foco único (queremos alta). |
| **DRY** | "Não se repita": cada regra em um só lugar. |
| **KISS** | "Mantenha simples": prefira a solução mais simples que funciona. |
| **YAGNI** | "Você não vai precisar": não construa para um futuro imaginado. |
| **SOLID** | Cinco princípios de design OO para código sustentável. |
| **Design pattern** | Solução consagrada e reutilizável para um problema comum. |
| **Singleton / Factory / Observer / Strategy** | Padrões clássicos (instância única / criação / notificação / algoritmos trocáveis). |
| **Over-engineering** | Complexidade desnecessária por aplicar princípios/patterns em excesso. |
| **Trade-off** | Uma troca: todo design ganha em algo e perde em outro. |

---

## 📝 Resumo

- O objetivo do design é a **mudança segura**; o norte é **baixo acoplamento, alta coesão** (partes independentes e focadas).
- Princípios essenciais: **DRY** (cada regra em um lugar), **KISS** (simples), **YAGNI** (não antecipe necessidades), e **SOLID** (cinco princípios OO que, juntos, buscam código focado e extensível).
- **Design patterns** (Singleton, Factory, Observer, Strategy...) são soluções consagradas para problemas recorrentes e um **vocabulário compartilhado** do time.
- O maior risco é o **over-engineering**: aplicar princípios/patterns demais gera complexidade inútil e viola KISS/YAGNI. Maturidade é saber **quando não usá-los**.
- Princípios são **guias, não leis**; às vezes puxam para lados opostos, e o julgamento de equilibrá-los é a habilidade sênior. Na dúvida, prefira o simples.
- Para o negócio (a SaborExpress), bom design é o que permite **evoluir rápido sem quebrar** — acompanhar o mercado em vez de ficar preso ao próprio código.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo acoplamento e coesão e por que "baixo acoplamento, alta coesão".
- [ ] Sei explicar DRY, KISS e YAGNI e dar um exemplo de cada.
- [ ] Compreendo, em linguagem simples, o que cada letra do SOLID busca.
- [ ] Sei o que é um design pattern e reconheço alguns (Observer, Factory, Strategy).
- [ ] Percebo o risco do over-engineering e sei que patterns resolvem problemas reais.
- [ ] Entendo que os princípios são guias que às vezes se contrapõem e exigem julgamento.

---

## ✏️ Exercícios

**1.** Explique "baixo acoplamento, alta coesão" com a analogia da casa (ou uma sua).

**2.** Diferencie DRY, KISS e YAGNI. Dê um exemplo prático de aplicação de cada um.

**3.** Explique, em linguagem simples, o "S" e o "O" do SOLID, usando os tipos de pedido da SaborExpress como exemplo.

**4.** O que é um design pattern? Descreva o padrão **Observer** e um lugar da SaborExpress onde ele se encaixa.

**5. (Reflexão)** Uma dev júnior encheu um recurso simples da SaborExpress de abstrações e três design patterns "para o futuro". Que princípios ela violou, e por que isso pode ser tão prejudicial quanto código sujo?

---

## 💬 Respostas comentadas

**1.** Resposta pessoal. Numa casa bem projetada, os sistemas são **independentes** (baixo acoplamento: trocar a torneira não quebra a parede da sala) e cada cômodo tem um **propósito claro** (alta coesão: a cozinha é a cozinha). Isso permite reformar uma parte sem afetar as outras — que é justamente o que queremos no código para mudá-lo com segurança.

**2.** **DRY** ("não se repita"): centralizar uma regra em um só lugar — ex.: um único método de cálculo de frete reutilizado por todas as telas. **KISS** ("simples"): escolher a solução mais simples que resolve — ex.: um `if` em vez de um framework inteiro para uma decisão trivial. **YAGNI** ("não vai precisar"): não implementar o que ainda não é necessário — ex.: não criar suporte a dez moedas quando a SaborExpress só opera em uma.

**3.** **S (Responsabilidade única):** cada classe tem um só motivo para mudar — ex.: a classe `Pedido` cuida do pedido; o cálculo de frete fica em sua própria peça, não misturado. **O (Aberto/fechado):** dá para **adicionar** comportamento sem alterar o que existe — ex.: criar um novo tipo de frete (`FreteAniversario`) como classe nova, **sem** editar (e arriscar quebrar) os cálculos de frete que já funcionam.

**4.** Um **design pattern** é uma solução consagrada e reutilizável para um problema comum de organização de código, além de um vocabulário compartilhado. O **Observer**: quando um objeto muda, ele **notifica automaticamente** todos os interessados. Na SaborExpress, encaixa-se na mudança de **status do pedido**: ao passar para "saiu para entrega", o pedido avisa sozinho o cliente (notificação), o entregador (rota) e o painel — sem que cada mudança precise chamar todos manualmente.

**5.** Ela violou **KISS** (complicou algo que era simples) e **YAGNI** (construiu para um futuro imaginado que talvez não venha), e provavelmente adicionou **acoplamento** e complexidade sem benefício — **over-engineering**. É tão prejudicial quanto código sujo porque o código fica **mais difícil** de entender, testar e mudar (o oposto do objetivo do design), consome tempo que a startup precisava para validar o produto, e cria abstrações que ninguém usa. Complexidade inútil e bagunça são dois caminhos diferentes para o mesmo destino: um sistema custoso de manter.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[36-Como-um-projeto-real-e-organizado]] — abre o Módulo 10; ver esses princípios materializados na estrutura de pastas de um projeto.
- **Base imediata:** [[34-Codigo-limpo]] (as fundações linha a linha) e [[33-Paradigmas-e-orientacao-a-objetos]] (a OO sobre a qual o SOLID se apoia).
- **Aplicação futura:** Volume 3 (Arquitetura de Software — MVC, camadas, monólito vs. microsserviços; Code review) e Volume 4 (Cap. 99 — dívida técnica).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 9 → **Capítulo 35 de 119**.
