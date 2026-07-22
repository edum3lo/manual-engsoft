# Capítulo 48 — Histórias de usuário, casos de uso e critérios de aceitação

> **Volume 3 — Desenvolvimento de Software** · Módulo 13 — Engenharia de Requisitos
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Escrever uma **história de usuário** no formato "Como... eu quero... para que...".
- Definir **critérios de aceitação** e escrevê-los no padrão **Given/When/Then**.
- Diferenciar história de usuário de **caso de uso** e saber quando cada um é mais útil.
- Entender a distinção entre **épico**, **história** e **tarefa** e o conceito de **INVEST**.
- Reconhecer o que separa uma boa história ("pronta para desenvolver") de uma ruim.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante–Intermediário (2,5/5).**

---

## ✅ Pré-requisitos

- Ter lido [[46-O-que-sao-requisitos]] e [[47-Elicitacao-personas-e-jornada-do-usuario]] — aqui **escrevemos** o que descobrimos.
- Ajuda ter visto [[43-Scrum-na-pratica]] — histórias são os itens do Product Backlog.

---

## 📖 Introdução

Você descobriu as necessidades (elicitação). Agora precisa **registrá-las** de um jeito que o time entenda, estime e construa — sem virar um documento de 200 páginas que ninguém lê. A forma que o mundo ágil encontrou é a **história de usuário**: uma frase curta, na linguagem do usuário, que descreve **quem** quer **o quê** e **para quê**.

Histórias de usuário são deliberadamente **pequenas e conversacionais**. Elas não tentam descrever tudo — na verdade, o criador da técnica dizia que uma história é *"um lembrete para uma conversa"*, não a conversa inteira. O detalhe fino vem depois, nos **critérios de aceitação**, que definem exatamente quando a história está "pronta" e correta. Juntos, história + critérios formam o par que move o desenvolvimento ágil.

Antes das histórias, o mundo usava (e ainda usa, em certos contextos) os **casos de uso**: descrições mais formais e detalhadas de como um ator interage com o sistema, passo a passo, incluindo os caminhos alternativos. Neste capítulo você aprende os três — história, critério de aceitação e caso de uso — e, mais importante, **quando** usar cada um. Dominar esse vocabulário é o que te faz produtivo desde o primeiro dia: são exatamente os itens que você vai pegar do backlog para implementar.

---

## 🧠 Analogia

Pense na diferença entre um **bilhete na geladeira** e uma **receita de bolo detalhada**.

A **história de usuário** é o bilhete: *"comprar leite para o café da manhã das crianças"*. É curto, diz **quem** (as crianças), **o quê** (leite) e **para quê** (café da manhã). Ele não explica a marca, a quantidade nem onde comprar — isso se resolve numa **conversa** rápida ("qual marca?") ou nos detalhes combinados na hora. O bilhete existe para **não esquecer** e para **começar a conversa**.

O **caso de uso** é a receita detalhada: passo 1, pré-aqueça o forno; passo 2, misture os secos; e se a massa ficar dura, faça X (caminho alternativo); e se faltar fermento, faça Y (exceção). É completo, cobre os "e se", e serve quando o processo é complexo e não pode dar margem a interpretação.

Os **critérios de aceitação** são como dizer, no bilhete, *"pronto = leite integral, 1 litro, na geladeira antes das 7h"*. Eles transformam o "comprar leite" vago em algo que você sabe **objetivamente** se foi cumprido. Guarde: história para alinhar rápido e conversar; caso de uso para detalhar processos complexos; critérios de aceitação para definir "pronto" sem ambiguidade.

---

## 🧩 Conceitos fundamentais

### 1. A história de usuário e seu formato

Uma **história de usuário** descreve uma funcionalidade do ponto de vista de **quem se beneficia dela**. O formato clássico (criado por Mike Cohn) tem três partes:

```
Como <tipo de usuário / persona>,
eu quero <uma ação / objetivo>,
para que <um benefício / motivo>.
```

Exemplo:
> **Como** cliente da SaborExpress, **eu quero** filtrar restaurantes por tempo de entrega, **para que** eu escolha rápido quando estou com pressa.

A terceira parte — o **"para que"** — é a mais importante e a mais esquecida. Ela captura o **valor**: sem ela, o time constrói a função sem entender o objetivo, e perde a chance de propor algo melhor. Se você não consegue preencher o "para que", talvez a funcionalidade não valha a pena.

> **Termo explicado — história de usuário:** descrição curta de uma funcionalidade na perspectiva do usuário, no formato "Como... eu quero... para que...", servindo de ponto de partida para uma conversa.

### 2. Os 3 C's e o INVEST

Ron Jeffries resumiu a história em **3 C's**: **Card** (o cartão, a frase curta), **Conversation** (a conversa que ela provoca) e **Confirmation** (os critérios de aceitação que confirmam que ficou pronta). A história **não é** só o cartão; é o cartão **mais** a conversa **mais** a confirmação.

Uma boa história segue o acrônimo **INVEST**:
- **I**ndependent — independente de outras, na medida do possível.
- **N**egotiable — negociável, não um contrato rígido.
- **V**aluable — entrega valor a alguém.
- **E**stimable — dá para estimar (senão, falta clareza).
- **S**mall — pequena, cabe numa sprint.
- **T**estable — testável (tem critérios de aceitação).

### 3. Critérios de aceitação e o Given/When/Then

Os **critérios de aceitação** são as condições que definem quando a história está **correta e completa** — o "pronto" objetivo. Um formato muito usado é o **Given/When/Then** (Dado/Quando/Então), vindo do **BDD** (Behavior-Driven Development):

```
DADO (Given) que estou na tela de busca com restaurantes carregados,
QUANDO (When) eu seleciono o filtro "entrega em até 30 min",
ENTÃO (Then) a lista mostra apenas restaurantes com estimativa ≤ 30 min.
```

Cada história costuma ter **vários** critérios, cobrindo o caminho feliz e as exceções (e se nenhum restaurante atender ao filtro? e se o filtro for combinado com outro?).

> **Termo explicado — critério de aceitação:** condição objetiva e testável que define quando uma história está pronta e correta. O formato Given/When/Then descreve o cenário, a ação e o resultado esperado.

Os critérios de aceitação são a ponte para os **testes** ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]): cada critério vira, idealmente, um teste automatizado.

### 4. Épico, história e tarefa — questão de tamanho

- **Épico:** uma funcionalidade **grande**, que não cabe numa sprint e se quebra em várias histórias. Ex.: "Sistema de pagamentos".
- **História:** uma fatia de valor que cabe numa sprint. Ex.: "Pagar com Pix".
- **Tarefa:** o trabalho **técnico** para realizar a história, feito pelos devs. Ex.: "Criar endpoint de geração de QR Code", "Integrar webhook do gateway".

```
ÉPICO: Pagamentos
  ├── História: pagar com cartão de crédito
  ├── História: pagar com Pix
  │      ├── Tarefa: gerar QR Code
  │      ├── Tarefa: integrar confirmação (webhook)
  │      └── Tarefa: tela de status do pagamento
  └── História: pagar com vale-refeição
```

### 5. Caso de uso — quando o detalhe importa

Um **caso de uso** descreve, de forma mais formal e completa, como um **ator** (usuário ou outro sistema) interage com o sistema para atingir um objetivo — incluindo o **fluxo principal**, os **fluxos alternativos** e as **exceções**. Ele tem pré-condições, pós-condições e passos numerados. É mais pesado que a história, e brilha quando o processo é complexo, crítico ou regulado (bancário, saúde, governo), onde ambiguidade é perigosa. Veremos o **diagrama** de casos de uso no [[55-Casos-de-uso-e-diagrama-de-classes]].

> **Termo explicado — caso de uso:** descrição detalhada e estruturada de como um ator interage com o sistema para cumprir um objetivo, cobrindo o fluxo principal e os alternativos/exceções.

---

## ⚙️ Como funciona na prática

Veja como uma necessidade vira trabalho pronto para desenvolver:

**1. Da jornada à história.** Na jornada do [[47-Elicitacao-personas-e-jornada-do-usuario]], o time viu que o João (apressado) abandona a busca quando demora. Isso vira a história: *"Como cliente com pressa, quero filtrar por tempo de entrega, para escolher rápido."*

**2. A conversa.** No refinamento, o time conversa sobre a história (o segundo C). Surgem dúvidas: o tempo é estimado como? e no pico, quando tudo atrasa? E daí nascem os **critérios de aceitação**.

**3. Os critérios (Given/When/Then).**
- *Dado* que há restaurantes carregados, *quando* seleciono "≤30 min", *então* vejo só os que atendem.
- *Dado* que **nenhum** restaurante atende, *quando* aplico o filtro, *então* vejo uma mensagem "nenhum restaurante entrega tão rápido agora" (caminho de exceção).
- *Dado* que combino "≤30 min" com "japonesa", *então* ambos os filtros se aplicam juntos.

**4. Estimar.** Com a história clara e os critérios definidos, o time faz o Planning Poker ([[45-Estimativas-planejamento-e-ferramentas]]). Se não dá para estimar, é sinal de que falta clareza — volta para a conversa.

**5. Quebrar em tarefas.** Os devs quebram a história em tarefas técnicas (ajustar a query de busca, criar o componente de filtro, escrever os testes dos critérios).

**6. Definir "pronto".** A história só está **Done** ([[43-Scrum-na-pratica]]) quando **todos** os critérios de aceitação passam — idealmente como testes automatizados.

O segredo é que os critérios de aceitação fazem o trabalho **convergir**: dev, QA e PO olham a mesma lista e concordam objetivamente sobre o que é "pronto". Sem eles, "terminei" vira opinião — e a história volta três vezes do teste.

---

## 🍔 Aplicação na SaborExpress

O Bruno (PO) mantém o backlog da SaborExpress em histórias. Veja o épico "Acompanhar pedido" se desdobrando:

**Épico:** *Acompanhar o pedido.*

**História 1:**
> **Como** cliente que já pediu, **eu quero** ver o status do meu pedido (recebido → preparando → saiu para entrega → entregue), **para que** eu saiba quanto falta e não fique ansioso.

**Critérios de aceitação:**
- *Dado* que meu pedido foi aceito, *quando* abro a tela do pedido, *então* vejo o status atual destacado.
- *Dado* que o restaurante muda o status, *quando* isso acontece, *então* minha tela atualiza sem eu precisar recarregar.
- *Dado* que o pedido foi entregue, *então* vejo a opção de avaliar.

**História 2:**
> **Como** cliente, **eu quero** ver o entregador no mapa, **para que** eu saiba que está chegando.

Repare no valor da história 1 bem escrita: o **"para que"** ("não ficar ansioso") revelou ao time que o problema real não era técnico, era **emocional** — o cliente quer **tranquilidade**. Isso levou a uma decisão de produto além do pedido: mostrar uma **estimativa de tempo** junto ao status, que acalma ainda mais que o mapa. Uma história que só dissesse "mostrar status" teria perdido esse insight.

E os critérios evitaram um bug clássico: sem o critério "atualiza sem recarregar", o time entregaria uma tela que só mudava o status quando o cliente fechava e reabria o app — tecnicamente "mostrando o status", mas inútil na prática. O critério **fechou a brecha** antes de virar retrabalho.

Para o fluxo de **pagamento** (crítico, com dinheiro e regras), o time preferiu escrever também um **caso de uso** detalhado, com todos os caminhos de exceção (cartão recusado, timeout do gateway, estorno) — porque ali a ambiguidade custaria caro. História para o comum; caso de uso para o crítico.

---

## 🏢 Como isso acontece em uma empresa

- **Histórias vivem no Jira/Azure/Linear.** Cada história é um **cartão/issue** com título, a frase "Como... quero... para que...", critérios de aceitação, story points e responsável. É o item que você pega para trabalhar.
- **Épicos organizam o roadmap.** Ferramentas agrupam histórias em épicos e épicos em **iniciativas**, dando a visão de alto nível para a liderança.
- **BDD e Gherkin.** O formato Given/When/Then tem uma linguagem formal, o **Gherkin**, usada por ferramentas como **Cucumber/SpecFlow** para transformar critérios em **testes automatizados executáveis** — o critério vira teste literalmente.
- **Casos de uso persistem em setores formais.** Bancos, seguradoras, saúde, governo e sistemas embarcados ainda usam casos de uso detalhados, por exigência de rastreabilidade e auditoria. Fora daí, histórias dominam.
- **"Refinement/grooming" é a reunião das histórias.** É onde o time transforma histórias vagas em histórias INVEST, prontas para a sprint. Uma história mal refinada trava a sprint inteira.
- **A qualidade da história afeta seu dia.** Histórias claras, com bons critérios, fazem você produzir sem idas e vindas. Histórias vagas te obrigam a adivinhar — e adivinhar errado é retrabalho garantido.

---

## ⚠️ Erros comuns

- **Esquecer o "para que".** Uma história sem o benefício vira uma ordem sem contexto. O "para que" é onde mora o valor e a chance de o time propor algo melhor.
- **Escrever histórias gigantes (que são épicos disfarçados).** "Como cliente, quero um sistema de pagamentos" não cabe numa sprint nem dá para estimar. Quebre até virar fatias pequenas de valor.
- **Histórias sem critérios de aceitação.** Sem o "pronto" objetivo, dev e PO discordam do que é "terminado", e a história vai e volta do teste várias vezes.
- **Escrever a história descrevendo a solução técnica.** "Como sistema, quero um índice no banco..." não é história de usuário — é tarefa técnica. Histórias falam de **valor para alguém**, não de implementação.
- **Confundir história com especificação completa.** A história é um **lembrete de conversa**, não o documento inteiro. Querer detalhar tudo no cartão recria o Cascata dentro do ágil.
- **Usar caso de uso pesado para tudo.** Detalhar exaustivamente cada função simples desperdiça tempo. Reserve o caso de uso para o que é complexo ou crítico.
- **Critérios que não são testáveis.** "O sistema deve ser amigável" não é critério. "Um novo usuário conclui o pedido em menos de 3 telas" é.

---

## 💡 Dicas profissionais

- **Sempre preencha o "para que" — e questione-o.** Se você não consegue articular o benefício, pare: talvez a funcionalidade não valha a pena, ou você não entendeu a necessidade.
- **Escreva os critérios de aceitação *antes* de codar.** Eles são seu alvo e seu teste. Definir "pronto" no início evita a discussão dolorosa de "mas eu achei que estava pronto" no fim.
- **Aplique o teste INVEST.** Se a história não é pequena, não é estimável ou não é testável, refine-a antes de puxá-la para a sprint.
- **Fatie por valor, não por camada técnica.** Prefira "cliente paga com Pix" (valor completo, ponta a ponta) a "fazer o back-end do pagamento" (metade que não entrega nada sozinha). Fatias verticais entregam valor a cada sprint.
- **Transforme cada critério em um teste.** No BDD, o Given/When/Then vira teste automatizado. Mesmo sem ferramenta formal, pense em cada critério como "o que eu vou verificar para dizer que está pronto".
- **Reserve casos de uso para o complexo.** Fluxo de pagamento, cálculo fiscal, autorização — onde os "e se" são muitos e caros. Para o resto, história + critérios bastam.

---

## 🎈 Curiosidades

- As histórias de usuário nasceram na **Extreme Programming (XP)**, no fim dos anos 1990, e foram popularizadas por **Mike Cohn** no livro *User Stories Applied*. O formato "Como... quero... para que..." é atribuído à consultoria Connextra, virando o "template Connextra".
- Os **casos de uso** vêm de antes, criados por **Ivar Jacobson** nos anos 1980, e são parte formal da **UML** ([[54-Por-que-modelar-antes-de-programar-UML]]). Houve por anos um "debate cultural" entre a turma dos casos de uso e a das histórias.
- O **Gherkin** (a linguagem do Given/When/Then) foi criado para o **Cucumber** e permite que **pessoas de negócio** leiam e até escrevam os testes — a ideia é o critério de aceitação ser, ao mesmo tempo, documentação e teste executável.
- Existe um princípio bem-humorado chamado **"história do usuário do inferno"**: quando o cartão tenta descrever o sistema inteiro numa frase de dez linhas. É o sinal de que virou épico e precisa quebrar.
- Alistair Cockburn, autor de referência em casos de uso, criou os "níveis de mar" (sea-level) para casos de uso — objetivos ao nível do mar (uma sessão de trabalho), acima (metas maiores) e abaixo (subfunções). Uma forma elegante de pensar granularidade.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **História de usuário** | Frase curta "Como... quero... para que..." descrevendo valor para um usuário. |
| **"Para que" (benefício)** | A parte da história que captura o valor/motivo — a mais importante. |
| **3 C's** | Card, Conversation, Confirmation: a história é o cartão + conversa + critérios. |
| **INVEST** | Boas histórias são Independentes, Negociáveis, Valiosas, Estimáveis, Small, Testáveis. |
| **Critério de aceitação** | Condição objetiva que define quando a história está pronta e correta. |
| **Given/When/Then** | Formato de critério: cenário (Dado), ação (Quando), resultado (Então). |
| **BDD / Gherkin** | Abordagem/linguagem que transforma critérios em testes executáveis. |
| **Épico** | Funcionalidade grande, quebrada em várias histórias. |
| **Tarefa** | O trabalho técnico para realizar uma história. |
| **Caso de uso** | Descrição detalhada da interação ator↔sistema, com fluxos alternativos. |
| **Refinement (grooming)** | Reunião que prepara histórias para ficarem prontas para desenvolver. |

---

## 📝 Resumo

- A **história de usuário** registra uma necessidade na perspectiva de quem se beneficia: **"Como... eu quero... para que..."**. O **"para que"** captura o valor e é o mais esquecido.
- A história são os **3 C's**: **Card** (frase curta), **Conversation** (a conversa que provoca) e **Confirmation** (os critérios). Boas histórias seguem **INVEST**.
- Os **critérios de aceitação** definem o "pronto" objetivo, muitas vezes no formato **Given/When/Then**, e são a ponte direta para os testes automatizados.
- **Épico → história → tarefa** é a hierarquia de tamanho: o épico não cabe numa sprint; a história cabe; a tarefa é o trabalho técnico.
- O **caso de uso** é mais formal e detalhado (fluxo principal + alternativos + exceções), ideal para processos complexos, críticos ou regulados. Fora daí, história + critérios bastam.
- Histórias claras com bons critérios fazem o time convergir e produzir sem idas e vindas; histórias vagas geram retrabalho.

---

## ☑️ Checklist de aprendizado

- [ ] Escrevo uma história no formato "Como... quero... para que..." com o benefício explícito.
- [ ] Escrevo critérios de aceitação no padrão Given/When/Then, cobrindo exceções.
- [ ] Diferencio história de usuário de caso de uso e sei quando usar cada um.
- [ ] Entendo a hierarquia épico → história → tarefa.
- [ ] Aplico o teste INVEST para avaliar uma história.
- [ ] Ligo critérios de aceitação aos testes automatizados.

---

## ✏️ Exercícios

**1.** Reescreva a ordem "fazer a tela de login" como uma **história de usuário** completa, com o "para que".

**2.** Escreva dois **critérios de aceitação** em Given/When/Then para a história "Como cliente, quero recuperar minha senha, para voltar a acessar minha conta". Inclua ao menos um caminho de exceção.

**3.** Classifique cada item como **épico**, **história** ou **tarefa**: (a) "sistema de avaliações e comentários"; (b) "avaliar o pedido com 1 a 5 estrelas"; (c) "criar a tabela `avaliacoes` no banco".

**4.** Aplique o teste **INVEST** à história "Como cliente, quero um app completo de delivery com tudo que os concorrentes têm". Ela passa? O que falha?

**5. (Reflexão)** Para o fluxo de **pagamento** da SaborExpress, você usaria histórias de usuário simples ou um caso de uso detalhado? Justifique com base na natureza do fluxo.

---

## 💬 Respostas comentadas

**1.** Exemplo: *"**Como** usuário cadastrado, **eu quero** entrar na minha conta com e-mail e senha, **para que** eu acesse meus pedidos e endereços salvos."* O "para que" transforma uma tarefa técnica ("tela de login") em valor para alguém, e ajuda o time a lembrar por que o login existe (acessar dados pessoais com segurança).

**2.** Exemplos:
- *Dado* que informei um e-mail cadastrado, *quando* clico em "recuperar senha", *então* recebo um e-mail com um link de redefinição válido por tempo limitado.
- (Exceção) *Dado* que informei um e-mail **não** cadastrado, *quando* clico em "recuperar senha", *então* vejo uma mensagem genérica ("se este e-mail existir, enviaremos as instruções") — sem revelar se o e-mail existe, por segurança.

**3.** (a) **Épico** — grande, engloba avaliar, comentar, moderar, exibir. (b) **História** — fatia de valor que cabe numa sprint. (c) **Tarefa** — trabalho técnico interno, sem valor isolado para o usuário.

**4.** Ela **falha** em vários pontos do INVEST: não é **Small** (é gigantesca), não é **Estimable** (impossível estimar "tudo que os concorrentes têm"), não é **Testable** (o que seria "pronto"?) e mal é **Valuable** de forma focada. Na verdade é uma iniciativa/visão inteira, não uma história. Precisa ser quebrada em épicos e depois em histórias pequenas e específicas.

**5.** Eu usaria **ambos, com peso no caso de uso**. O fluxo de pagamento é **crítico** (envolve dinheiro), tem **muitos caminhos de exceção** (cartão recusado, timeout do gateway, pagamento duplicado, estorno) e frequentemente há **regras e conformidade** envolvidas. Um caso de uso detalhado garante que nenhum desses caminhos fique ambíguo, o que é essencial quando um erro pode cobrar duas vezes ou perder um pagamento. As histórias ainda servem para fatiar a entrega ("pagar com Pix", "pagar com cartão"), mas os critérios/casos de uso precisam cobrir exaustivamente as exceções — porque, aqui, ambiguidade custa dinheiro e confiança.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[47-Elicitacao-personas-e-jornada-do-usuario]] — como descobrir o que vira história.
- **Próximo (linear):** [[49-MVP-priorizacao-e-validacao]] — como decidir quais histórias entram primeiro.
- **Detalhamento visual:** [[55-Casos-de-uso-e-diagrama-de-classes]] — o diagrama de casos de uso na UML.
- **Consequência:** [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] — critérios de aceitação viram testes; e [[43-Scrum-na-pratica]] — histórias são os itens do backlog.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 13 → **Capítulo 48 de 119**.
