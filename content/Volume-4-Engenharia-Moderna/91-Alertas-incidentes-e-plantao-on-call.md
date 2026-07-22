---
title: '91 - Alertas, incidentes e plantão (on-call)'
---

# Capítulo 91 — Alertas, incidentes e plantão (on-call)

> **Volume 4 — Engenharia Moderna** · Módulo 27 — Observabilidade
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que são **alertas** e como projetá-los para serem úteis (e não ruído).
- Compreender o **ciclo de vida de um incidente**: detectar, responder, resolver, aprender.
- Entender o que é o **plantão (on-call)** e a cultura em torno dele.
- Conhecer conceitos como **SLO, SLA, orçamento de erro** e **severidade de incidente**.
- Compreender o **post-mortem sem culpa** como motor de melhoria.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[89-Logs-metricas-e-tracing]] e [[90-As-ferramentas-de-observabilidade]].
- Ter lido [[84-O-que-e-DevOps]] ("você constrói, você opera") e [[83-QA-bugs-e-o-ciclo-de-correcao]] (cultura sem culpa).

---

## 📖 Introdução

A observabilidade te dá **olhos** para ver o sistema ([[89-Logs-metricas-e-tracing]]), com ferramentas para coletar os sinais ([[90-As-ferramentas-de-observabilidade]]). Mas ver não basta — quando algo dá errado às 3h da manhã, **alguém precisa ser avisado, acordar e agir**. Este capítulo fecha o Módulo 27 tratando do lado humano e operacional da confiabilidade: os **alertas** que disparam quando algo sai do esperado, o processo de **resposta a incidentes** quando o sistema quebra, e o **plantão (on-call)** — a prática de ter engenheiros de sobreaviso para responder a emergências a qualquer hora. É a materialização mais concreta do princípio "você constrói, você opera" ([[84-O-que-e-DevOps]]).

Comecemos por uma verdade desconfortável: **todo sistema falha**. Não importa quão bom seja o código ou quantos testes existam ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) — servidores caem, dependências externas ficam fora do ar, picos inesperados sobrecarregam, bugs escapam ([[83-QA-bugs-e-o-ciclo-de-correcao]]). A questão profissional não é "como nunca falhar" (impossível), mas "**quão rápido detectamos e nos recuperamos**" — o **MTTR** (tempo médio de recuperação), uma das métricas DORA ([[84-O-que-e-DevOps]]). Um time maduro aceita que incidentes acontecerão e se prepara para **respondê-los bem**: com bons alertas que avisam cedo, um processo claro de resposta que evita o pânico, e um plantão organizado e humano.

Há dois grandes riscos a equilibrar. Alertar **de menos** significa descobrir os problemas pelos clientes (tarde e mal). Alertar **demais** gera a **fadiga de alerta** — tantos alarmes falsos que os engenheiros começam a ignorá-los, e o alerta **real** se perde no ruído (como o "menino que gritava lobo"). Projetar bons alertas — que avisam do que importa, no momento certo, para a pessoa certa — é uma arte. E o plantão, se mal feito, esgota e adoece as pessoas; se bem feito (rotação justa, alertas de qualidade, cultura de aprendizado), é sustentável. Este capítulo cobre os alertas, o ciclo do incidente, os conceitos de confiabilidade (SLO, SLA, orçamento de erro), o on-call humano, e o **post-mortem sem culpa** — o ritual que transforma cada falha em melhoria, fechando o ciclo da qualidade que começou lá no [[83-QA-bugs-e-o-ciclo-de-correcao]].

---

## 🧠 Analogia

Pense no sistema de **pronto-socorro e emergência de um hospital** — treinado para o inesperado, porque emergências **vão** acontecer.

Um hospital não promete que ninguém nunca vai passar mal — isso é impossível. Ele se organiza para **responder bem** quando a emergência chega, e cada peça tem um paralelo direto:

- **O alarme e a triagem (alertas):** quando um paciente chega grave, soa um alerta e a triagem avalia a **gravidade** — um infarto vira prioridade máxima; um corte pequeno espera. Um bom pronto-socorro **não** toca o alarme máximo para cada espirro (senão a equipe se esgota e ignora o alarme real — a **fadiga de alerta**); ele reserva o alarme sério para o que é sério. É a arte de alertar do que importa.

- **A equipe de plantão (on-call):** o hospital tem médicos **de plantão** 24h, em rodízio, prontos para serem chamados a qualquer hora. Ninguém fica de plantão **todo** dia (adoeceria) — há uma **escala justa** que reveza a equipe, para que o sobreaviso seja sustentável.

- **O protocolo de emergência (resposta a incidentes):** quando chega um caso grave, ninguém improvisa no pânico — há um **protocolo** claro: quem lidera (o "comandante"), quem faz o quê, como se comunica. O processo evita o caos e salva tempo (e vidas).

- **A reunião de revisão do caso (post-mortem):** depois, a equipe se reúne para revisar o que aconteceu — **não para punir** o plantonista, mas para entender **o que no processo** pode melhorar para o próximo caso. Um hospital que culpa o médico faz todos esconderem erros; um que aprende com cada caso fica cada vez melhor.

Guarde: a operação de um sistema é o pronto-socorro do seu software — alarmes bem calibrados para não esgotar a equipe, plantão justo em rodízio, protocolo claro para não entrar em pânico, e revisão sem culpa para aprender. Ninguém evita toda emergência; os bons **respondem** melhor.

---

## 🧩 Conceitos fundamentais

### 1. Alertas — e a fadiga de alerta

Um **alerta** é uma notificação automática disparada quando uma métrica ou condição sai do esperado ([[90-As-ferramentas-de-observabilidade]]) — ex.: "taxa de erro acima de 5%". O grande risco é a **fadiga de alerta**: alertas demais (ou falsos) fazem os engenheiros **ignorá-los**, e o alerta importante se perde no ruído. Um bom alerta é **acionável** (exige uma ação humana), **relevante** (algo que importa mesmo) e **raro** o suficiente para ser levado a sério.

> **Termo explicado — fadiga de alerta:** o efeito de receber tantos alertas (muitos falsos ou irrelevantes) que a equipe passa a ignorá-los, arriscando perder o alerta que realmente importa.

### 2. Alertar sobre sintomas, não causas

Boa prática: alertar sobre **sintomas que afetam o usuário** (o site está lento, a taxa de erro subiu) em vez de cada causa técnica possível (esta CPU está alta). O usuário não liga se uma CPU está a 91%; ele liga se **não consegue pedir**. Alertas centrados na **experiência do usuário** são mais relevantes e geram menos ruído.

### 3. O ciclo de vida de um incidente

Um **incidente** é uma interrupção ou degradação não planejada de um serviço. Seu ciclo:
1. **Detectar:** o alerta dispara (ou um cliente reporta).
2. **Responder:** o plantonista assume, avalia a **severidade**, e — se grave — aciona o processo.
3. **Mitigar/Resolver:** primeiro **estancar o sangramento** (restaurar o serviço, mesmo que com um paliativo), depois corrigir a causa.
4. **Aprender:** o **post-mortem** analisa o que houve e como evitar a recorrência.

> **Termo explicado — incidente:** interrupção ou degradação não planejada de um serviço, que dispara um processo de resposta (detectar → responder → mitigar → aprender).

### 4. On-call (plantão)

**On-call** é a prática de ter engenheiros **de sobreaviso**, em **rodízio**, responsáveis por responder a alertas fora do horário normal (noites, fins de semana). É a face concreta do "você constrói, você opera" ([[84-O-que-e-DevOps]]): quem fez o código o defende em produção. Um bom on-call tem **rotação justa**, **compensação**, e — crucialmente — **alertas de qualidade** (para não acordar por nada).

> **Termo explicado — on-call (plantão):** o esquema de rodízio em que engenheiros ficam de sobreaviso para responder a incidentes a qualquer hora; sustentável só com alertas bons e escala justa.

### 5. SLO, SLA e orçamento de erro

Conceitos de confiabilidade (do SRE — [[84-O-que-e-DevOps]]):
- **SLI (Indicator):** uma **medida** de confiabilidade (ex.: % de requisições bem-sucedidas).
- **SLO (Objective):** a **meta interna** para esse indicador (ex.: "99,9% de sucesso no mês").
- **SLA (Agreement):** o **contrato** com o cliente, com penalidade se descumprido (ex.: "99,5%, ou devolvemos dinheiro").
- **Orçamento de erro (error budget):** o "quanto pode falhar" dentro do SLO (99,9% permite ~0,1% de falha). Enquanto há orçamento, o time pode **arriscar** (lançar rápido); se o orçamento acaba, freia e foca em estabilidade.

> **Termo explicado — SLO e orçamento de erro:** o SLO é a meta de confiabilidade (ex.: 99,9%); o orçamento de erro é a margem de falha que ela permite — um "saldo" que equilibra a velocidade de lançar com a estabilidade.

### 6. Post-mortem sem culpa

Após um incidente relevante, faz-se um **post-mortem**: um documento que descreve o que houve, o **impacto**, a **linha do tempo**, a **causa-raiz** e as **ações** para evitar a recorrência. O princípio central é ser **sem culpa (blameless)** — focar no **sistema e no processo**, não em punir pessoas ([[83-QA-bugs-e-o-ciclo-de-correcao]]). Só assim as pessoas relatam erros com honestidade e o time realmente aprende.

> **Termo explicado — post-mortem sem culpa:** análise escrita de um incidente focada em melhorar o sistema/processo (não em achar culpados), transformando a falha em aprendizado permanente.

---

## ⚙️ Como funciona na prática

Como a operação de confiabilidade funciona no dia a dia:

**Projetar alertas que valem a pena acordar por eles.** A regra de ouro do on-call: **todo alerta que acorda alguém deve ser acionável e importante**. Se um alerta dispara e a resposta é "ah, isso se resolve sozinho" ou "não dá pra fazer nada agora", ele **não deveria** ter acordado ninguém. Times maduros revisam alertas regularmente, **eliminando** os que geram ruído e ajustando limiares. Alerta bom acorda pouco, e quando acorda, é para valer — o antídoto da fadiga de alerta.

**A ferramenta de plantão.** Sistemas como **PagerDuty**, **Opsgenie** (ou similares) gerenciam o on-call: mantêm a **escala de rodízio**, recebem os alertas das ferramentas de observabilidade ([[90-As-ferramentas-de-observabilidade]]), e **escalam** — ligam/notificam o plantonista; se ele não responde em X minutos, chamam o próximo (o "backup"). Isso garante que um alerta crítico **nunca** fique sem resposta.

**Responder sem pânico: o papel do comandante.** Em incidentes graves, o caos é o inimigo. Times adotam um processo de **gestão de incidentes** inspirado em emergências: alguém assume o papel de **Incident Commander** (comandante do incidente) — que **não** conserta com as próprias mãos, mas **coordena**: delega a investigação, cuida da comunicação (status para a empresa e clientes), e mantém a calma. Separar "quem coordena" de "quem investiga" evita o caos de dez pessoas mexendo ao mesmo tempo.

**Mitigar antes de corrigir (estancar o sangramento).** Numa emergência, a prioridade é **restaurar o serviço**, não achar a causa-raiz. Se reverter o último deploy ([[98-Estrategias-de-deploy]]) faz o sistema voltar, **reverte-se primeiro** e investiga-se a causa **depois**, com calma. Confundir "resolver o incidente" (parar o impacto no usuário) com "corrigir o bug" (achar e consertar a raiz) faz o incidente durar mais do que precisa. Primeiro o usuário volta a ser atendido; depois se entende o porquê.

**O orçamento de erro alinhando velocidade e estabilidade.** O **error budget** é uma ferramenta elegante de decisão: se o serviço está **dentro** do SLO (sobra orçamento de erro), o time pode **arriscar mais** — lançar features rápido ([[85-CICD-a-linha-de-montagem]]), pois há margem. Se o orçamento **esgotou** (muitas falhas no período), o time **freia** os lançamentos e foca em estabilidade até recuperar. Isso transforma o eterno conflito "lançar rápido vs. ficar estável" numa **regra objetiva**, baseada em dados, em vez de uma briga de opiniões.

**O post-mortem que fecha o ciclo.** Depois que o incidente passa, o aprendizado acontece no **post-mortem sem culpa** ([[83-QA-bugs-e-o-ciclo-de-correcao]]): a linha do tempo, o impacto, a causa-raiz, e — o mais importante — **ações concretas** para evitar a recorrência (um teste novo, um alerta melhor, uma correção de processo). O foco é sempre "**como o sistema permitiu isso?**", nunca "de quem foi a culpa?". Um post-mortem que gera ações realmente implementadas é o que faz o sistema ficar **mais robusto a cada falha**, em vez de repetir os mesmos incidentes.

---

## 🍔 Aplicação na SaborExpress

A SaborExpress construiu sua cultura de plantão e incidentes aprendendo com erros — inclusive erros na própria forma de alertar. Acompanhe.

**O erro inicial: fadiga de alerta.** No começo, empolgado com a observabilidade nova ([[90-As-ferramentas-de-observabilidade]]), o time criou alertas para **tudo**: cada pico de CPU, cada latência momentânea, cada erro isolado. O resultado foi desastroso: o plantonista recebia **dezenas** de alertas por noite, a maioria irrelevante ("a CPU ficou 30 segundos a 85%"). Em semanas, todos começaram a **ignorar** os alertas — e então um alerta **real** (o banco perto do limite de conexões) passou despercebido no meio do ruído, e o sistema **caiu**. A lição da **fadiga de alerta** aprendida da pior forma.

**A reforma dos alertas.** O time reconstruiu a estratégia: passou a alertar sobre **sintomas que afetam o usuário** (a taxa de erro do checkout subiu, os pedidos estão lentos), não sobre cada causa técnica. Definiram que **todo alerta que acorda alguém precisa ser acionável**. Cortaram 80% dos alertas. Resultado: o plantonista passou a ser acordado **raramente**, e quando era, **valia a pena** — os alertas voltaram a ser levados a sério.

**O plantão humano de Camila.** Como a SaborExpress adota "você constrói, você opera" ([[84-O-que-e-DevOps]]), **Camila** entra na escala de on-call do serviço de pedidos que ela escreve ([[80-Construindo-a-API-da-SaborExpress]]). A escala é **justa** (rodízio semanal entre os engenheiros do time, com compensação), e usam uma ferramenta (Opsgenie) que a chama e, se ela não responder em 10 minutos, aciona o backup. Saber que **ela** será acordada fez Camila caprichar ainda mais na qualidade e nos alertas do seu serviço — o incentivo do "você opera".

**Um incidente real, bem conduzido.** Numa madrugada, o serviço de pagamento degradou (a API externa do gateway caiu). O alerta — agora **de qualidade** — acordou Camila. Ela seguiu o processo:
1. **Assumiu** e avaliou a **severidade**: alta (clientes não conseguiam pagar).
2. Como o impacto era grande, virou **Incident Commander**: coordenou, comunicou o status, e delegou a investigação em vez de mergulhar sozinha no pânico.
3. **Mitigou primeiro**: enfileirou os pagamentos para reprocessar depois ([[94-Filas-particionamento-e-microsservicos-na-pratica]]), permitindo os pedidos continuarem — **estancou o sangramento** antes de entender tudo.
4. Quando o gateway voltou, os pagamentos enfileirados foram processados. **Resolveu** o impacto ao usuário.

**O orçamento de erro em ação.** A SaborExpress definiu um **SLO** de 99,9% de sucesso no checkout ([[97-Metricas-de-produto-e-medicao-de-impacto]]). Depois desse incidente, o **orçamento de erro** do mês estava quase esgotado — então o time **pausou** o lançamento de novas features arriscadas e focou em estabilidade (adicionar o fallback de pagamento, melhorar o timeout) até recuperar a margem. A decisão "lançar ou estabilizar" foi tomada **por dados** (o error budget), não por discussão.

**O post-mortem sem culpa.** No dia seguinte, o time escreveu um **post-mortem blameless** ([[83-QA-bugs-e-o-ciclo-de-correcao]]): linha do tempo, impacto (23 minutos de checkout degradado), causa-raiz (dependência externa sem fallback), e **ações** (implementar o fallback, melhorar o alerta, testar o cenário no chaos engineering — [[99-Divida-tecnica-e-chaos-engineering]]). **Ninguém foi culpado** por a API externa ter caído — o foco foi tornar o **sistema** resiliente a isso. Camila, que estava de plantão, não foi punida; ao contrário, foi elogiada pela boa condução. Isso manteve a cultura de todos assumirem e relatarem problemas abertamente.

Moral: a SaborExpress aprendeu que a operação é o pronto-socorro do software. Errou primeiro com a **fadiga de alerta** (alarmes demais → ignorados → queda real), e corrigiu alertando sobre o que afeta o usuário. Montou um plantão **justo e humano** ("você opera"), respondeu a incidentes com **protocolo** (comandante, mitigar antes de corrigir), usou o **orçamento de erro** para decidir velocidade vs. estabilidade por dados, e fechou cada falha com **post-mortem sem culpa** — ficando mais robusta a cada incidente.

---

## 🏢 Como isso acontece em uma empresa

- **On-call é realidade para quem opera sistemas.** Engenheiros de back-end, DevOps e SRE em empresas com sistemas em produção quase sempre participam de escalas de plantão. É parte do trabalho — e um ponto a entender ao escolher uma vaga.
- **A qualidade do on-call reflete a saúde da engenharia.** Um plantão que acorda gente toda noite (fadiga de alerta, sistema instável) é sinal de problemas sérios. Um plantão calmo indica maturidade. Candidatos experientes perguntam "como é o on-call de vocês?".
- **PagerDuty/Opsgenie são padrão.** Ferramentas de gestão de plantão e escalonamento de alertas são universais em empresas com operação séria.
- **SLOs e error budgets vêm do SRE do Google.** O livro de SRE popularizou esses conceitos, hoje adotados amplamente para equilibrar confiabilidade e velocidade de forma objetiva.
- **Incident Commander é papel reconhecido.** Grandes empresas têm processos formais de gestão de incidentes, com papéis definidos (comandante, comunicador, investigadores) inspirados em sistemas de emergência reais (como o ICS dos bombeiros).
- **Post-mortems sem culpa são cultura consolidada.** Empresas de referência (Google, Etsy) tornaram o post-mortem blameless padrão, e muitas publicam post-mortems públicos de grandes incidentes — transparência que gera confiança e aprendizado coletivo.
- **A saúde do plantonista importa.** Empresas maduras se preocupam com o **burnout** do on-call: rotação justa, compensação, limites, e a regra de que reduzir alertas ruins é prioridade. Plantão que adoece as pessoas é insustentável e antiético.

---

## ⚠️ Erros comuns

- **Fadiga de alerta (alertar demais).** Criar alertas para tudo, gerando ruído que faz a equipe ignorar todos — inclusive o real. Alerte pouco e do que importa.
- **Alertar sobre causas, não sintomas.** Encher de alertas técnicos (CPU, memória) em vez de focar no que afeta o usuário. Alerte pela experiência do usuário.
- **Alertas não acionáveis.** Acordar alguém por algo que não exige (nem permite) uma ação. Se não há o que fazer, não deveria ser um alerta que acorda.
- **Confundir mitigar com corrigir.** Tentar achar a causa-raiz durante o incidente em vez de primeiro restaurar o serviço. Estanque o sangramento primeiro; investigue depois.
- **Responder no caos, sem processo.** Dez pessoas mexendo ao mesmo tempo, sem um comandante nem comunicação. O pânico prolonga o incidente.
- **Post-mortem com culpa.** Usar a análise para achar um culpado. Faz as pessoas esconderem erros e o time não aprende ([[83-QA-bugs-e-o-ciclo-de-correcao]]).
- **Post-mortem sem ações (teatro).** Escrever o documento e não implementar as ações de melhoria. O incidente se repete. O valor está nas ações **feitas**.
- **On-call abusivo.** Escala injusta, sem compensação, com alertas ruins que esgotam as pessoas. Insustentável e prejudicial — mina o time.

---

## 💡 Dicas profissionais

- **Faça cada alerta valer a pena.** Todo alerta que acorda alguém deve ser acionável e importante. Revise e elimine alertas ruidosos sem dó — é a defesa contra a fadiga.
- **Alerte sobre a experiência do usuário.** Sintomas que o usuário sente (lentidão, erros no checkout), não cada métrica de máquina. Menos ruído, mais relevância.
- **Numa emergência, restaure primeiro.** Estanque o sangramento (reverta o deploy, ative um fallback) antes de caçar a causa-raiz. O usuário vem primeiro; a investigação, depois.
- **Tenha um processo de incidente.** Defina quem coordena (comandante), quem investiga, quem comunica. Processo claro vence o pânico.
- **Use SLOs e orçamento de erro.** Transforme "lançar vs. estabilizar" numa decisão por dados: com orçamento, arrisque; sem, estabilize.
- **Faça post-mortems sem culpa — e com ações.** Foque no sistema, nunca em pessoas, e garanta que as ações de melhoria sejam realmente implementadas.
- **Cuide do plantonista.** Rotação justa, compensação, e prioridade em reduzir alertas ruins. On-call sustentável é responsabilidade do time e da liderança.
- **Pergunte sobre o on-call ao escolher um emprego.** "Como é o plantão de vocês?" revela muito sobre a maturidade e a saúde da engenharia da empresa.

---

## 🎈 Curiosidades

- O conceito de **orçamento de erro (error budget)** resolve elegantemente uma guerra antiga: o time de produto quer lançar rápido, o time de operação quer estabilidade. O SRE do Google transformou isso em matemática — se o SLO é 99,9%, você tem 0,1% de "orçamento" para gastar em falhas/riscos. Enquanto sobra, lance à vontade; quando acaba, freie. A briga vira uma conta.
- A busca por "noves" de disponibilidade tem um custo que cresce exponencialmente. **99,9%** ("três noves") permite ~8,7 horas de indisponibilidade por ano; **99,99%** ("quatro noves") permite ~52 minutos; **99,999%** ("cinco noves") só ~5 minutos por ano. Cada nove adicional é dramaticamente mais caro — por isso a escolha do SLO é uma decisão de negócio, não "quanto mais, melhor".
- Muitos processos de **gestão de incidentes** de empresas de tecnologia são baseados no **Incident Command System (ICS)**, um sistema criado nos anos 1970 pelos **bombeiros da Califórnia** para coordenar o combate a incêndios florestais. A estrutura de papéis (comandante, operações, comunicação) migrou do combate a incêndios reais para o "combate a incêndios" digital.
- A cultura de **post-mortems públicos** virou marca de maturidade e transparência: empresas como Cloudflare, GitLab e AWS publicam análises detalhadas de suas grandes falhas. O post-mortem público do GitLab sobre a vez em que **apagaram acidentalmente um banco de dados de produção** (com a transmissão ao vivo da recuperação!) é lendário como exemplo de honestidade e aprendizado sem culpa.
- Existe um termo carinhoso e sombrio para a experiência do plantão ruim: **"pager hell"** (inferno do pager), referência aos antigos pagers/bipes que acordavam os plantonistas. A luta contra o "pager hell" — reduzir alertas inúteis — é uma das medidas de qualidade de vida mais valorizadas por engenheiros de operação.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Alerta** | Notificação automática disparada quando algo sai do esperado. |
| **Fadiga de alerta** | Ignorar alertas por receber demais (e o real se perde). |
| **Incidente** | Interrupção/degradação não planejada de um serviço. |
| **On-call (plantão)** | Rodízio de engenheiros de sobreaviso para responder a incidentes. |
| **MTTR** | Tempo médio de recuperação de uma falha. |
| **Incident Commander** | Quem coordena a resposta a um incidente grave (não conserta). |
| **Mitigar** | Restaurar o serviço (estancar o sangramento) antes de corrigir a raiz. |
| **SLI / SLO / SLA** | Medida / meta interna / contrato de confiabilidade. |
| **Orçamento de erro** | A margem de falha permitida pelo SLO; equilibra velocidade e estabilidade. |
| **Post-mortem sem culpa** | Análise de incidente focada no sistema, não em culpar pessoas. |

---

## 📝 Resumo

- Ver o sistema não basta: quando algo quebra, **alguém precisa ser avisado e agir**. Este capítulo cobre os **alertas**, a **resposta a incidentes** e o **plantão (on-call)** — a face concreta do "você constrói, você opera" ([[84-O-que-e-DevOps]]). A verdade de fundo: **todo sistema falha**; o que importa é **quão rápido você detecta e se recupera** (MTTR).
- **Alertas** devem ser **acionáveis, relevantes e raros**. O grande risco é a **fadiga de alerta**: alarmes demais (ou falsos) fazem a equipe ignorá-los, e o alerta real se perde no ruído. Boa prática: alertar sobre **sintomas que o usuário sente**, não cada causa técnica.
- Um **incidente** segue um ciclo: **detectar → responder** (assumir, avaliar severidade, coordenar com um **Incident Commander**) → **mitigar** (restaurar o serviço primeiro — "estancar o sangramento" — antes de caçar a causa-raiz) → **aprender**. O **on-call** é o rodízio de sobreaviso, sustentável só com **escala justa** e **alertas de qualidade**.
- Conceitos de confiabilidade: **SLI** (medida), **SLO** (meta interna, ex.: 99,9%), **SLA** (contrato com o cliente), e o **orçamento de erro** — a margem de falha do SLO, que transforma o conflito "lançar rápido vs. estabilidade" numa **decisão por dados** (com orçamento, arrisque; sem, estabilize).
- O ciclo se fecha com o **post-mortem sem culpa**: análise escrita do incidente (linha do tempo, impacto, causa-raiz e, sobretudo, **ações** concretas), focada em melhorar o **sistema e o processo**, nunca em punir pessoas ([[83-QA-bugs-e-o-ciclo-de-correcao]]). É o que faz o sistema ficar **mais robusto a cada falha** — e mantém a honestidade que permite ao time aprender.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é fadiga de alerta e como projetar bons alertas.
- [ ] Descrevo o ciclo de vida de um incidente.
- [ ] Entendo o on-call e o que o torna sustentável.
- [ ] Diferencio SLI, SLO e SLA, e explico o orçamento de erro.
- [ ] Sei por que se mitiga antes de corrigir a causa-raiz.
- [ ] Explico o post-mortem sem culpa e por que ele importa.

---

## ✏️ Exercícios

**1.** Com a analogia do pronto-socorro, explique a fadiga de alerta, o plantão e o post-mortem sem culpa.

**2.** Por que se deve alertar sobre **sintomas que afetam o usuário** em vez de cada causa técnica? Dê um exemplo.

**3.** Durante um incidente, por que se deve **mitigar antes de corrigir a causa-raiz**? O que significa "estancar o sangramento"?

**4.** Explique o que é **orçamento de erro** e como ele transforma o conflito "lançar rápido vs. estabilidade" numa decisão objetiva.

**5. (Reflexão)** A SaborExpress caiu porque um alerta real se perdeu no meio de dezenas de alertas irrelevantes. Explique como isso é a fadiga de alerta, o que o time mudou, e por que "alertar menos" tornou o sistema **mais** confiável.

---

## 💬 Respostas comentadas

**1.** No pronto-socorro de um hospital: a **fadiga de alerta** é como tocar o alarme de emergência máxima para cada espirro — se isso acontece, a equipe se esgota e passa a **ignorar** o alarme, e quando chega um infarto de verdade, ninguém corre; por isso um bom PS reserva o alarme sério para o que é sério. O **plantão (on-call)** é como os médicos de sobreaviso 24h em **rodízio** — prontos para serem chamados a qualquer hora, mas revezando numa escala justa, porque ninguém aguenta ficar de plantão todo dia sem adoecer. O **post-mortem sem culpa** é como a reunião de revisão de um caso grave depois que ele passa — a equipe analisa o que aconteceu **não para punir** o plantonista, mas para entender o que no **processo** pode melhorar para o próximo caso; um hospital que culpa o médico faz todos esconderem erros, um que aprende com cada caso fica melhor. Em todos, a ideia é a mesma: emergências vão acontecer; o que separa os bons é **responder** bem, com alarmes calibrados, plantão sustentável e aprendizado sem culpa.

**2.** Deve-se alertar sobre **sintomas que afetam o usuário** porque é isso que realmente importa para o negócio e para a decisão de acordar alguém — e porque alertar sobre cada causa técnica gera muito ruído (fadiga de alerta) sobre coisas que podem não ter impacto algum. O usuário não se importa se uma CPU específica está a 91% ou se a memória de um servidor subiu; ele se importa se **não consegue finalizar o pedido**. Um alerta centrado no sintoma do usuário ("a taxa de erro do checkout subiu para 8%") é sempre **relevante** (indica dor real) e **acionável** (algo precisa ser feito). Já um alerta de causa técnica ("CPU do servidor X a 91%") pode ser **irrelevante** — talvez o sistema esteja atendendo todo mundo perfeitamente apesar da CPU alta, e acordar alguém por isso é ruído. Exemplo: em vez de dez alertas de "CPU alta", "memória alta", "fila crescendo" (causas possíveis), um único alerta de "os pedidos estão demorando mais de 3s para serem criados" (o sintoma que o usuário sente) captura o que importa — e, com os pilares de observabilidade ([[89-Logs-metricas-e-tracing]]), você investiga **qual** dessas causas provocou o sintoma **depois** de ser alertado do que realmente afeta o cliente.

**3.** Deve-se **mitigar antes de corrigir a causa-raiz** porque, durante um incidente, o que causa dano **a cada minuto** é o **impacto no usuário** (ele não consegue pagar, o site está fora), e esse impacto pode frequentemente ser **estancado rapidamente** com um paliativo, mesmo sem ainda entender **por que** o problema aconteceu. Caçar a causa-raiz é uma investigação que pode levar horas — e deixar o serviço quebrado todo esse tempo, enquanto se investiga, prolonga desnecessariamente o sofrimento dos usuários. "Estancar o sangramento" significa tomar a ação mais rápida que **restaura o serviço**, mesmo que temporária ou imperfeita: reverter o último deploy (se a falha veio dele), ativar um fallback, redirecionar tráfego, reiniciar um componente. Com o serviço restaurado e os usuários voltando a ser atendidos, o time então investiga a causa-raiz **com calma**, sem a pressão do impacto ativo. Confundir "resolver o incidente" (parar o impacto) com "corrigir o bug" (achar e consertar a raiz) faz o incidente durar muito mais do que precisa — a ordem certa é primeiro o usuário, depois o entendimento.

**4.** O **orçamento de erro (error budget)** é a **margem de falha** que um SLO permite. Se o SLO é 99,9% de sucesso, então 0,1% de falhas é **aceitável** dentro da meta — esse 0,1% é o "orçamento" que o time pode "gastar" em riscos e imperfeições ao longo do período. Ele transforma o conflito "lançar rápido vs. estabilidade" numa decisão **objetiva** porque cria uma **regra baseada em dados** em vez de uma briga de opiniões entre quem quer lançar features (produto) e quem quer estabilidade (operação): enquanto o serviço está **dentro** do SLO (sobra orçamento de erro), o time pode **arriscar** — lançar rápido, experimentar, aceitar o risco de pequenas falhas, porque há margem; quando o orçamento **esgota** (as falhas do período consumiram a margem permitida), o time **freia** os lançamentos arriscados e foca em estabilidade até recuperar a margem. Assim, "podemos arriscar um lançamento agora?" deixa de ser uma discussão sobre quem tem razão e vira uma consulta ao saldo: tem orçamento, pode; não tem, estabiliza. A confiabilidade e a velocidade passam a se equilibrar por uma conta, não por poder político.

**5.** Isso é a **fadiga de alerta** clássica: o time criou alertas para **tudo** (cada pico de CPU, cada latência momentânea, cada erro isolado), a maioria irrelevante, e o plantonista passou a receber dezenas de alarmes por noite. Como quase todos eram ruído ("a CPU ficou 30 segundos alta"), a equipe naturalmente começou a **ignorá-los** — e quando um alerta **genuinamente crítico** disparou (o banco perto do limite de conexões), ele se **perdeu no meio do ruído** e ninguém agiu, levando à queda. É o "menino que gritava lobo": tantos alarmes falsos que o real não é levado a sério. O time mudou passando a alertar apenas sobre **sintomas que afetam o usuário** (taxa de erro do checkout, lentidão dos pedidos), estabelecendo que **todo alerta que acorda alguém precisa ser acionável e importante**, e cortando 80% dos alertas. "Alertar menos" tornou o sistema **mais** confiável — o que parece paradoxal — porque a confiabilidade não vem do **número** de alertas, mas de os alertas serem **levados a sério e respondidos**. Com poucos alertas, todos relevantes, o plantonista volta a **confiar** neles e a agir na hora: cada alerta agora significa "isto importa, acorde e resolva". O ruído que enterrava o sinal desapareceu, então o sinal real volta a ser ouvido. Menos alertas de melhor qualidade produzem resposta rápida; muitos alertas de baixa qualidade produzem indiferença — e é a resposta, não o volume de alarmes, que mantém o sistema no ar.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[90-As-ferramentas-de-observabilidade]] — as ferramentas que disparam os alertas.
- **Base:** [[89-Logs-metricas-e-tracing]] (os sinais que viram alertas), [[84-O-que-e-DevOps]] ("você constrói, você opera") e [[83-QA-bugs-e-o-ciclo-de-correcao]] (a cultura sem culpa).
- **Aplicação:** [[98-Estrategias-de-deploy]] (reverter para mitigar) e [[99-Divida-tecnica-e-chaos-engineering]] (testar a resiliência de propósito).
- **Adiante:** [[97-Metricas-de-produto-e-medicao-de-impacto]] — SLOs e métricas conectando confiabilidade e negócio.

---

> 🧭 **Você está aqui:** Volume 4 → Módulo 27 → **Capítulo 91 de 119**.
