# Capítulo 42 — O Manifesto Ágil

> **Volume 3 — Desenvolvimento de Software** · Módulo 12 — Processos e Metodologias
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Explicar o que é **agilidade** no desenvolvimento de software — e o que ela **não** é.
- Recitar e interpretar os **4 valores** do Manifesto Ágil.
- Entender a lógica dos **12 princípios** por trás do manifesto, sem decorá-los.
- Distinguir **ser ágil** (a mentalidade) de **fazer um método ágil** (Scrum, Kanban) — a diferença que separa times de verdade de "teatro ágil".
- Reconhecer os mal-entendidos mais comuns ("ágil é não documentar", "ágil é fazer tudo correndo").

---

## ⏱️ Tempo médio de estudo

**30 a 40 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[41-Modelos-de-processo-de-desenvolvimento]] — o ágil é a resposta aos problemas do Cascata que vimos lá.
- Ajuda ter lido [[17-Cerimonias-ferramentas-e-ritmo-de-um-time]] (Vol. 1), onde você viu as cerimônias ágeis na prática.

---

## 📖 Introdução

Em fevereiro de **2001**, dezessete programadores experientes se reuniram numa estação de esqui em Utah, nos Estados Unidos. Estavam cansados de ver projetos afundarem no mesmo padrão: meses de documentação, planos gigantes que a realidade destruía, clientes recebendo no fim um software que não era mais o que precisavam. Cada um deles já vinha experimentando jeitos mais leves de trabalhar. Naquele fim de semana, eles destilaram tudo em um texto de poucas linhas: o **Manifesto para o Desenvolvimento Ágil de Software**.

O manifesto não é um método, não é uma ferramenta, não tem "passo a passo". É uma **declaração de valores** — uma bússola. Ele não diz "faça daily de 15 minutos"; diz *o que* importa mais quando você precisa escolher. Scrum, Kanban, XP e tantos outros são **maneiras** de viver esses valores, mas nenhum deles **é** o ágil. O ágil é a mentalidade por trás.

Esse é o ponto mais mal-entendido da nossa área. Muita gente "faz Scrum" — tem daily, tem sprint, tem quadro cheio de post-its — e mesmo assim não é nem um pouco ágil, porque o **espírito** se perdeu. Este capítulo é sobre esse espírito. Se você entender os quatro valores de verdade, tudo o que vem depois (Scrum, Kanban, estimativas) vira consequência natural, não ritual decorado.

---

## 🧠 Analogia

Pense na diferença entre **seguir uma receita** e **saber cozinhar**.

Uma pessoa que só segue receitas fica travada quando falta um ingrediente, quando a panela é diferente, quando o convidado tem uma restrição. Ela executa passos, mas não entende **por quê** cada passo existe. Já quem **sabe cozinhar** entende os princípios — como o calor transforma, como o sal realça, como equilibrar sabores — e por isso improvisa, adapta e acerta em qualquer cozinha.

O Manifesto Ágil é o "saber cozinhar" do desenvolvimento. Scrum e Kanban são **receitas**. Um time que só segue a receita ("temos que fazer daily porque o Scrum manda") faz **teatro ágil**: os rituais acontecem, mas ninguém entende o porquê, e ao primeiro imprevisto tudo desanda. Um time que entende os **valores** usa Scrum e Kanban como ferramentas — e sabe quando dobrar as regras porque entende o objetivo por trás delas. Neste capítulo, você aprende a cozinhar, não só a seguir a receita.

---

## 🧩 Conceitos fundamentais

### 1. O que "ágil" quer dizer, de verdade

**Ágil** não é "rápido" e não é "sem planejamento". Ágil é a capacidade de **responder bem à mudança**: entregar valor em ciclos curtos, olhar o resultado, aprender e **ajustar o rumo** com frequência. A palavra-chave é **adaptação**. Um time ágil não tenta prever o futuro inteiro; ele cria um jeito de trabalhar em que **mudar de ideia é barato e esperado**.

> **Termo explicado — ágil (agile):** abordagem de desenvolvimento baseada em entregas curtas e frequentes, feedback constante e adaptação contínua, em vez de um grande plano fixo executado até o fim.

### 2. Os 4 valores do Manifesto

O coração do manifesto são quatro frases no formato "**A** mais do que **B**". A sacada genial está na frase final que as acompanha: *"ou seja, mesmo havendo valor nos itens à direita, valorizamos mais os itens à esquerda"*. Ele **não despreza** o lado B — só diz o que ganha quando você precisa **priorizar**.

```
Indivíduos e interações   MAIS QUE   processos e ferramentas
Software em funcionamento  MAIS QUE   documentação abrangente
Colaboração com o cliente  MAIS QUE   negociação de contratos
Responder a mudanças       MAIS QUE   seguir um plano
```

- **Indivíduos e interações > processos e ferramentas.** As pessoas conversando resolvem mais do que o processo mais bonito. Ferramenta nenhuma salva um time que não conversa.
- **Software funcionando > documentação abrangente.** A prova de progresso é o software rodando, não um relatório de 100 páginas. (Não é "zero documentação" — é *a documentação certa, na medida certa*.)
- **Colaboração com o cliente > negociação de contratos.** Trabalhar **junto** do cliente, ajustando o rumo, vale mais do que brigar sobre o que estava escrito no contrato.
- **Responder a mudanças > seguir um plano.** Planos são úteis, mas a realidade muda. Um bom time **replaneja** em vez de defender um plano que a realidade já superou.

> **Termo explicado — Manifesto Ágil:** documento de 2001, com 4 valores e 12 princípios, que fundou o movimento ágil. Não é um método; é uma declaração de prioridades.

### 3. Os 12 princípios (agrupados para fazer sentido)

Por trás dos 4 valores vêm 12 princípios. Você não precisa decorá-los; precisa entender que eles se agrupam em **quatro ideias**:

**Entregar valor cedo e sempre**
- Satisfazer o cliente com entregas **contínuas e frequentes** de software que funciona.
- Entregar em **semanas**, não meses (preferir o ciclo mais curto).
- Software funcionando é a **principal medida de progresso**.

**Abraçar a mudança**
- Aceitar mudanças de requisito **mesmo tarde** no desenvolvimento — a mudança é vantagem competitiva do cliente.

**Pessoas no centro**
- **Negócio e desenvolvimento** trabalham juntos, todo dia.
- Construir projetos em torno de **pessoas motivadas** e confiar nelas.
- A melhor comunicação é a **conversa cara a cara**.
- As melhores soluções emergem de **times auto-organizados**.

**Excelência e sustentabilidade**
- Manter um **ritmo sustentável** — nada de heroísmo e noites viradas eternas.
- Atenção contínua à **excelência técnica** e ao bom design.
- **Simplicidade** — a arte de maximizar o trabalho **não feito** (não construir o que não é preciso).
- O time **reflete e se ajusta** regularmente (a origem da *retrospectiva*).

### 4. Ser ágil vs. fazer ágil

Este é o conceito mais importante do capítulo. **Fazer** um método ágil é ter os rituais: sprint, daily, quadro, retrospectiva. **Ser** ágil é viver os valores: entregar valor cedo, abraçar mudança, confiar nas pessoas, melhorar sempre. Dá para **fazer** sem **ser** — e isso tem até nome.

> **Termo explicado — "teatro ágil" (agile theater / cargo cult agile):** quando um time executa os rituais ágeis (dailies, sprints, post-its) sem viver os valores — os movimentos existem, mas a adaptação e a colaboração reais, não.

---

## ⚙️ Como funciona na prática

Como os valores viram comportamento no dia a dia? Veja três situações reais:

**Situação 1 — o requisito mudou na metade da sprint.** No mundo Cascata, isso é uma crise ("mas estava no documento!"). Num time ágil, o valor *"responder a mudanças"* diz: ótimo, o cliente aprendeu algo. Conversa-se sobre o impacto, repriorizam-se as tarefas, e o plano se ajusta. A mudança não é vista como fracasso do planejamento, mas como **informação nova**.

**Situação 2 — a documentação.** Um time que entende *"software funcionando > documentação abrangente"* não escreve zero documentação; ele escreve **a que agrega valor** (como usar a API, como rodar o projeto, decisões de arquitetura) e evita a que só junta poeira (um documento de 80 páginas que ninguém lê e que fica desatualizado no dia seguinte). O critério é: *isso vai ajudar alguém de verdade?*

**Situação 3 — a reunião que virou e-mail.** *"Indivíduos e interações > processos e ferramentas"* significa que, quando há um mal-entendido, você **conversa** (chama num call de 5 minutos) em vez de trocar 20 mensagens ou abrir mais um campo no formulário do Jira. O processo serve às pessoas, não o contrário.

O grande teste de fogo é: **quando surge um conflito entre o lado esquerdo e o lado direito de um valor, qual você escolhe?** Um time genuinamente ágil escolhe a esquerda — pessoas, software rodando, colaboração, adaptação. Um time que só faz teatro escolhe a direita e se esconde atrás do processo ("não posso mudar, não está no escopo").

Tudo isso conecta diretamente com o capítulo anterior: o ágil é a **materialização** da lição da curva do custo da mudança ([[41-Modelos-de-processo-de-desenvolvimento]]). Ciclos curtos + feedback constante = erros descobertos cedo = correção barata. Scrum ([[43-Scrum-na-pratica]]) e Kanban ([[44-Kanban-e-fluxo-continuo]]) são só duas formas concretas de fazer isso girar.

---

## 🍔 Aplicação na SaborExpress

A **Ana** montou o time da SaborExpress e adotou "ágil". Veja a diferença entre **fazer** e **ser**.

**Time que só faz (teatro):** tem daily todo dia às 9h, mas vira relatório de status para o chefe ("ontem fiz X, hoje faço Y") em vez de coordenação real. Tem sprint de 2 semanas, mas se um restaurante-parceiro pede uma mudança urgente, a resposta é "entra no backlog, vemos daqui a 3 sprints". Tem retrospectiva, mas nada muda de uma para outra. Os rituais existem; a agilidade, não. A Ana continua descobrindo tarde que construiu a coisa errada.

**Time que é ágil de verdade:** entrega um incremento **utilizável** a cada 2 semanas e coloca na mão de clientes reais. Quando os dados mostram que ninguém usa o chat com o entregador mas todo mundo quer **rastrear o pedido no mapa**, o time **repriorizada** sem drama — a mudança é bem-vinda, é o cliente ensinando o que tem valor. O PO e a Ana conversam toda semana. A retrospectiva de fato muda algo: perceberam que os deploys quebravam à sexta, então pararam de subir código na sexta à tarde. Resultado: a SaborExpress acerta mais rápido, gasta menos no que não importa, e o time não vive em pânico.

Repare: os dois times têm os **mesmos rituais**. O que muda é se eles vivem os **valores**. É por isso que este capítulo vem **antes** de Scrum e Kanban — sem entender o "porquê", os métodos viram gaiola.

---

## 🏢 Como isso acontece em uma empresa

- **"Somos ágeis" é quase universal — na fala.** Praticamente toda empresa de tecnologia diz que é ágil. Na prática, há um espectro enorme, de times realmente adaptativos a times que só trocaram o nome das reuniões.
- **Existe um mercado inteiro em cima do ágil.** Certificações (Scrum Master, Product Owner, SAFe), consultorias de "transformação ágil", coaches. Parte disso agrega valor; parte é justamente o "teatro" que o manifesto queria evitar — processo virando fim em si mesmo.
- **Escalar ágil é difícil.** O manifesto foi pensado para times pequenos. Quando a empresa tem 50 times, surgem frameworks para coordenar tudo (**SAFe**, **LeSS**, **Spotify Model**). Eles ajudam, mas também são onde o ágil mais corre risco de virar burocracia.
- **A cultura importa mais que o método.** Empresas onde a liderança de fato confia nos times, aceita mudança e cobra por valor entregue (não por horas) são as que colhem os frutos do ágil. Onde a cultura é de comando-e-controle, nenhum framework salva.
- **Você vai ouvir os valores citados em decisões.** "Prefiro subir algo funcionando hoje e melhorar depois" (software funcionando). "Vamos conversar com o usuário antes de assumir" (colaboração). Reconhecer o valor por trás da frase te faz participar melhor.

---

## ⚠️ Erros comuns

- **"Ágil é não documentar."** Falso. O valor é *documentação abrangente demais* que não agrega. Ágil documenta o necessário — README, contrato da API, decisões de arquitetura.
- **"Ágil é fazer tudo correndo, sem planejar."** Falso. Ágil **planeja o tempo todo** — só que em ciclos curtos, replanejando com frequência, em vez de um único plano gigante no começo.
- **"Ágil é fazer daily e sprint."** Isso é *fazer* ágil. *Ser* ágil é viver os valores. Rituais sem espírito são teatro.
- **Usar "responder a mudanças" como desculpa para não planejar nada.** Abraçar mudança não é viver no caos. Há um plano; ele só é revisto com frequência. Sem nenhuma direção, o time roda em círculos.
- **Confundir ritmo sustentável com pouca produtividade.** O princípio do ritmo sustentável existe porque times que vivem em *crunch* (noites viradas) produzem pior e adoecem. Sustentável ≠ lento; é o que se mantém por anos.
- **Achar que ágil serve para tudo.** Para alguns contextos (sistemas críticos regulados, hardware), abordagens mais formais convivem com o ágil. O manifesto é forte, não dogma universal.

---

## 💡 Dicas profissionais

- **Quando estiver em dúvida sobre uma prática do time, volte aos 4 valores.** "Essa reunião serve às pessoas ou virou processo pelo processo?" O manifesto é uma régua para avaliar o próprio jeito de trabalhar.
- **Meça progresso por software funcionando, não por tarefas movidas no quadro.** É fácil parecer produtivo empurrando cartões. O que conta é valor entregue ao usuário.
- **Defenda a conversa.** Boa parte dos problemas de um time some com 10 minutos de conversa cara a cara. Não deixe o processo te empurrar para trocas frias e demoradas quando um call resolve.
- **Leve a retrospectiva a sério.** É o único princípio que **melhora todos os outros**: o time parando para refletir e ajustar. Times que fazem retro "de mentira" estagnam.
- **Desconfie de quem trata o framework como sagrado.** "O Scrum manda" não é argumento. A pergunta certa é "isso está nos ajudando a entregar valor e adaptar?". Se não, ajuste.

---

## 🎈 Curiosidades

- O manifesto foi escrito por **17 pessoas** em fevereiro de 2001, entre elas nomes como Kent Beck (XP, TDD), Martin Fowler, Ken Schwaber e Jeff Sutherland (Scrum). O documento original tem apenas **68 palavras** nos valores — cabe num guardanapo.
- O site oficial, **agilemanifesto.org**, existe até hoje e permite que qualquer pessoa **assine** o manifesto. Já são dezenas de milhares de assinaturas.
- Antes de "ágil", cada um daqueles autores tinha seu próprio método com nome diferente (XP, Scrum, Crystal, DSDM...). A palavra **"ágil"** foi escolhida naquele fim de semana como um guarda-chuva neutro para todos eles.
- Existe uma piada recorrente na área: *"fazemos ScrumBut"* — de "we do Scrum, **but**..." ("fazemos Scrum, **mas** pulamos a retrospectiva, **mas** o PO não aparece..."). O "but" é onde o teatro ágil mora.
- Kent Beck, um dos signatários, é também o pai do **TDD** (teste antes do código), que você verá no [[82-TDD-e-testes-automatizados]] — mostrando como valores e práticas técnicas nasceram entrelaçados.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Ágil (agile)** | Abordagem baseada em entregas curtas, feedback constante e adaptação à mudança. |
| **Manifesto Ágil** | Documento de 2001 com 4 valores e 12 princípios que fundou o movimento. |
| **Valor (do manifesto)** | Uma prioridade no formato "A mais que B": o que ganha quando é preciso escolher. |
| **Ser ágil vs. fazer ágil** | Viver a mentalidade vs. só executar os rituais. |
| **Teatro ágil (cargo cult)** | Ter os rituais ágeis sem viver os valores. |
| **Ritmo sustentável** | Trabalhar num passo que se mantém por anos, sem heroísmo nem esgotamento. |
| **Retrospectiva** | Reunião em que o time reflete e ajusta o próprio jeito de trabalhar. |
| **Auto-organização** | O time decide como fazer o trabalho, em vez de receber ordens detalhadas. |
| **SAFe / LeSS** | Frameworks para aplicar ágil em muitas equipes de uma empresa grande. |

---

## 📝 Resumo

- O **Manifesto Ágil (2001)** não é um método: é uma declaração de **valores e princípios** — uma bússola para o desenvolvimento.
- Os **4 valores** priorizam **indivíduos e interações**, **software funcionando**, **colaboração com o cliente** e **responder a mudanças** — sem desprezar processos, documentação, contratos e planos, mas colocando-os em segundo lugar quando é preciso escolher.
- Os **12 princípios** se resumem a quatro ideias: entregar valor cedo e sempre, abraçar a mudança, pôr as pessoas no centro, e buscar excelência com ritmo sustentável.
- A distinção crucial é **ser ágil** (viver os valores) vs. **fazer ágil** (só ter os rituais). Rituais sem espírito são **teatro ágil**.
- O ágil é a materialização da curva do custo da mudança: ciclos curtos + feedback = erros descobertos cedo e baratos. **Scrum** e **Kanban** são formas concretas de fazer isso girar.

---

## ☑️ Checklist de aprendizado

- [ ] Sei explicar que "ágil" é sobre adaptação, não sobre pressa nem ausência de plano.
- [ ] Recito os 4 valores e explico o sentido do "mais que" (sem desprezar o lado direito).
- [ ] Entendo os 12 princípios agrupados em quatro ideias, sem decorá-los.
- [ ] Diferencio **ser** ágil de **fazer** ágil e reconheço o "teatro ágil".
- [ ] Sei apontar mal-entendidos comuns (ágil = sem documentação/sem planejamento).
- [ ] Ligo o ágil à curva do custo da mudança do capítulo anterior.

---

## ✏️ Exercícios

**1.** Reescreva, com suas palavras, o que significa o valor "software em funcionamento mais que documentação abrangente" — e por que ele **não** quer dizer "não documente".

**2.** Um gerente diz: "somos ágeis porque temos daily todo dia e sprints de duas semanas". Por que essa frase, sozinha, não prova agilidade? O que você perguntaria para saber se o time **é** ágil?

**3.** Dê um exemplo de decisão em que o valor "responder a mudanças mais que seguir um plano" entra em conflito com "seguir o plano", e explique como um time ágil resolveria.

**4.** Explique a diferença entre "ritmo sustentável" e "trabalhar pouco". Por que o manifesto se preocupa com ritmo?

**5. (Reflexão)** Na SaborExpress, o time tem todos os rituais do Scrum, mas nunca muda de rumo e descobre tarde que construiu a coisa errada. Que valores do manifesto esse time está violando, e o que você sugeriria para ele passar de "fazer" para "ser" ágil?

---

## 💬 Respostas comentadas

**1.** Significa que a **prova real de progresso** é software que roda e entrega valor, não uma pilha de documentos. Não quer dizer "não documente" porque o valor critica a documentação *abrangente demais* — aquela que consome tempo, envelhece rápido e ninguém lê. Um time ágil escreve a documentação **útil** (como rodar o projeto, contrato da API, decisões importantes) e evita a burocrática.

**2.** Porque daily e sprint são **rituais** — o *fazer* ágil. Eles podem existir sem nenhuma agilidade real. Para saber se o time **é** ágil, eu perguntaria: vocês entregam software funcionando a cada ciclo? Quando um requisito muda, o que acontece? A retrospectiva muda algo de verdade? Vocês conversam com o cliente/usuário? As respostas revelam se os valores estão vivos ou se é teatro.

**3.** Exemplo: o plano da sprint era construir o programa de fidelidade, mas os dados mostram que os usuários estão abandonando o carrinho na tela de pagamento. Seguir o plano seria ignorar isso e entregar a fidelidade; responder à mudança seria **repriorizar** para consertar o pagamento, que está sangrando receita agora. Um time ágil conversa sobre o impacto, ajusta o backlog e ataca o problema mais valioso — o plano serve ao objetivo, não o contrário.

**4.** "Ritmo sustentável" é o passo que o time consegue manter **indefinidamente**, sem noites viradas nem esgotamento; "trabalhar pouco" é baixa entrega. O manifesto se preocupa com ritmo porque times em *crunch* constante produzem código pior, cometem mais erros, adoecem e pedem demissão — o que sai muito mais caro no longo prazo do que um ritmo saudável e constante.

**5.** Esse time viola principalmente **"responder a mudanças mais que seguir um plano"** (não muda de rumo), **"colaboração com o cliente"** e o princípio da **reflexão e ajuste** (a retrospectiva não gera mudança). Para virar "ser" ágil, eu sugeriria: colocar cada incremento na mão de usuários reais e olhar os dados; permitir repriorizar o backlog quando o aprendizado justificar; e transformar a retrospectiva em ações concretas com dono e prazo, revisadas na retro seguinte. O objetivo é fechar o ciclo aprender → ajustar, que hoje está quebrado.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[41-Modelos-de-processo-de-desenvolvimento]] — os modelos clássicos e a curva do custo da mudança que o ágil resolve.
- **Próximo (linear):** [[43-Scrum-na-pratica]] — o framework ágil mais usado, com papéis, eventos e artefatos.
- **Também aplica os valores:** [[44-Kanban-e-fluxo-continuo]] — agilidade por fluxo contínuo, sem sprints fixas.
- **Raiz na prática:** [[17-Cerimonias-ferramentas-e-ritmo-de-um-time]] (Vol. 1) — as cerimônias vistas do lado de dentro; e Volume 4 (entrega contínua), onde "entregar cedo e sempre" chega ao extremo.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 12 → **Capítulo 42 de 119**.
