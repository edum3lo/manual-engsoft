# Capítulo 45 — Estimativas, planejamento e ferramentas

> **Volume 3 — Desenvolvimento de Software** · Módulo 12 — Processos e Metodologias
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender por que estimar software é difícil — e por que ainda assim estimamos.
- Explicar **story points** e por que estimamos em **tamanho relativo**, não em horas.
- Conduzir e interpretar um **Planning Poker**.
- Compreender **velocity** e como ela ajuda a prever entregas (sem virar cobrança de produtividade).
- Reconhecer as ferramentas do dia a dia — **Jira, Trello, Azure DevOps, Linear** — e o que cada uma faz.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante–Intermediário (2,5/5).**

---

## ✅ Pré-requisitos

- Ter lido [[43-Scrum-na-pratica]] e [[44-Kanban-e-fluxo-continuo]] — estimativas e ferramentas alimentam esses dois métodos.

---

## 📖 Introdução

"Quanto tempo isso vai levar?" É a pergunta que mais assombra quem faz software. O chefe pergunta, o cliente pergunta, o investidor pergunta. E a resposta honesta — "não sei ao certo" — parece inaceitável no mundo dos negócios, que precisa de datas para planejar lançamentos, campanhas e contratações.

Estimar software é notoriamente difícil, e por um bom motivo: **software é sempre algo novo**. Se fosse igual ao que já foi feito, você copiaria em vez de construir. Cada tarefa carrega incertezas escondidas — a integração que parecia simples, o bug do framework, o requisito que só se revela no meio do caminho. Por isso engenheiros são famosos por dizer "duas semanas" e entregar em dois meses.

O mundo ágil não resolveu esse problema (ninguém resolveu), mas encontrou um jeito mais honesto de lidar com ele: em vez de fingir precisão em horas, estimamos **tamanho relativo** com **story points**, medimos o ritmo real do time com **velocity**, e usamos isso para fazer previsões que **melhoram com o tempo**. Este capítulo te ensina esse jogo — e apresenta as ferramentas (Jira e amigos) onde ele acontece todos os dias. Entender estimativas é o que te salva de duas armadilhas clássicas: prometer o impossível e ser cobrado por uma "meta" que nunca foi uma promessa.

---

## 🧠 Analogia

Imagine que alguém te pergunta: **"quanto tempo você leva para chegar em casa?"**

Se você responder em **minutos exatos** ("37 minutos"), vai errar quase sempre: depende do trânsito, do sinal, da chuva, de um acidente. Mas se alguém te mostrar **dois trajetos** e perguntar "qual é mais longo?", você acerta com facilidade — "esse é o dobro daquele". Humanos são **péssimos em estimar valores absolutos** e **muito bons em comparar tamanhos relativos**.

Story points exploram exatamente isso. Em vez de "essa tarefa leva 6 horas" (chute absoluto, quase sempre errado), o time diz "essa tarefa é do **tamanho 3**, o dobro daquela que foi **tamanho 1**". Não importa se "3" são 4 horas ou 9 horas num dia ruim — importa que ela é **duas vezes** a tarefa de referência. Depois, observando quantos pontos o time realmente entrega por sprint, você descobre empiricamente quanto tempo os pontos levam. É medir a estrada andando por ela, em vez de adivinhar do sofá.

---

## 🧩 Conceitos fundamentais

### 1. Por que não estimar em horas

Estimar em horas parece natural, mas tem três problemas: (1) horas são um **chute absoluto** — o que somos ruins de fazer; (2) horas **variam por pessoa** (o júnior leva 8h no que o sênior faz em 2h), então a estimativa depende de *quem* pega a tarefa; (3) horas viram **compromisso** ("você disse 4h!") e geram pressão e microgerenciamento. Story points contornam os três.

### 2. Story points — tamanho relativo

**Story points** medem o **tamanho/esforço relativo** de uma tarefa, combinando complexidade, volume de trabalho e incerteza — num número **sem unidade**. O time escolhe uma tarefa de referência ("isso é 1 ponto") e estima as demais em relação a ela.

> **Termo explicado — story point:** unidade abstrata que representa o tamanho relativo de uma tarefa (esforço + complexidade + incerteza), não uma quantidade de horas.

É comum usar a **sequência de Fibonacci** (1, 2, 3, 5, 8, 13, 21...) para os valores. Por quê? Porque quanto maior a tarefa, **menos precisa** é a estimativa — não faz sentido debater se algo é "16 ou 17"; a distância crescente entre os números reflete essa incerteza. Uma tarefa de 13+ pontos é um sinal de que ela deveria ser **quebrada** em partes menores.

### 3. Planning Poker — estimar em grupo

O **Planning Poker** é a dinâmica mais usada para atribuir story points. Funciona assim: o PO explica um item; cada pessoa do time escolhe, **em segredo**, uma carta com um número de Fibonacci; todos revelam **ao mesmo tempo**. Se houver divergência grande (alguém disse 2, outro disse 13), os dois **explicam seu raciocínio** — e é aí que mora o ouro: o que um viu que o outro não viu (uma dependência escondida, um jeito mais simples). Estima-se de novo até convergir.

> **Termo explicado — Planning Poker:** técnica de estimativa em grupo em que todos votam em segredo e revelam juntos; a divergência vira discussão, alinhando o entendimento do time.

O valor do Planning Poker **não é o número** — é a **conversa**. Revelar ao mesmo tempo evita que o júnior copie o sênior (viés de ancoragem) e faz o conhecimento aflorar.

### 4. Velocity — o ritmo real do time

**Velocity** é a soma de story points que o time **de fato** conclui por sprint. Se nas últimas sprints o time fez 20, 23 e 21 pontos, sua velocity média é ~21. Com isso, dá para **prever**: se faltam ~100 pontos no backlog, são cerca de 5 sprints.

> **Termo explicado — velocity:** média de story points concluídos por sprint; serve para projetar quanto trabalho o time entrega num período.

**Regra de ouro:** velocity é uma ferramenta de **previsão do próprio time**, não uma **nota de desempenho** nem base para comparar times. Comparar a velocity de dois times é sem sentido, porque cada um calibra seus pontos de um jeito. E cobrar "aumente a velocity" só faz o time inflar as estimativas — corrompendo a métrica.

### 5. Estimar não é prometer

O ponto mais importante: uma **estimativa é uma previsão sob incerteza**, não um **compromisso de prazo**. Bons times comunicam isso em **faixas** ("entre 3 e 5 sprints") e atualizam conforme aprendem. Tratar a estimativa inicial como promessa gravada em pedra é a origem de metade do sofrimento da profissão.

---

## ⚙️ Como funciona na prática

Veja o ciclo completo, do backlog à previsão:

**1. Refinamento.** Antes do Planning, o time "refina" os itens do topo do backlog: esclarece dúvidas com o PO, quebra tarefas grandes e deixa tudo pronto para estimar. Um item bom para estimar é pequeno e claro.

**2. Planning Poker.** No Planning, o time estima cada item em story points. A tarefa "adicionar filtro por preço" vira 3 pontos; "integrar novo gateway de pagamento" vira 13 — e, por ser grande e incerta, o time decide **quebrá-la** em "conectar API do gateway" (5) + "tratar erros e reembolso" (5) + "tela de status" (3).

**3. Montar a sprint.** O time olha sua **velocity** (~21) e puxa itens do topo até chegar perto disso. Não enche além da velocity — isso seria repetir o erro do WIP alto do [[44-Kanban-e-fluxo-continuo]].

**4. Acompanhar.** Durante a sprint, um gráfico **burndown** mostra os pontos restantes caindo dia a dia. Se a linha não desce, é sinal de que o time superestimou a capacidade ou algo travou.

**5. Aprender.** Ao fim, a velocity real alimenta a previsão da próxima. Com o tempo, as estimativas do time ficam **mais calibradas** — não porque viraram "precisas", mas porque o ritmo médio se torna conhecido.

Tudo isso vive numa **ferramenta**. Cada item é um **cartão/issue** com título, descrição, critérios de aceitação, story points e responsável, movendo-se por um quadro. É onde o processo dos capítulos anteriores encontra o teclado.

---

## 🍔 Aplicação na SaborExpress

No time da SaborExpress, o Planning Poker já evitou dois desastres.

**Caso 1 — a integração "simples".** O PO trouxe "aceitar pagamento via Pix" achando que era rápido. Na votação, dois devs mostraram cartas **8 e 13**, enquanto o PO esperava algo como 3. Na discussão, um dev explicou: o gateway exige homologação, webhook de confirmação e tratamento de estorno. O que parecia trivial era grande e incerto. Resultado: quebraram em três itens menores e a Ana ajustou a expectativa de data — **antes** de a equipe se comprometer com o impossível.

**Caso 2 — a velocity como escudo.** A Ana, ansiosa para lançar, pediu que o time "acelerasse a velocity". A Scrum Master explicou por que isso é uma cilada: o time só "aumentaria os números" inflando estimativas, sem entregar nada a mais. Em vez disso, olharam a velocity real (~20/sprint) e projetaram honestamente: o backlog de lançamento tinha ~80 pontos → ~4 sprints → **8 semanas**. A Ana pôde planejar a campanha de marketing com uma data **realista e negociada**, com faixa de segurança, em vez de uma promessa fantasiosa que quebraria a confiança quando estourasse.

O ganho não foi "estimar certo" (ninguém estima certo). Foi **transformar incerteza em previsão honesta e negociável** — o que deixa o negócio planejar sem enganar a si mesmo. Essa é a real função das estimativas.

---

## 🏢 Como isso acontece em uma empresa

- **O Jira reina.** É a ferramenta dominante para backlog, sprints, quadros e relatórios. Você quase certamente vai trabalhar com ele. Alternativas fortes: **Azure DevOps** (comum onde há stack Microsoft), **Trello** (simples, ótimo para times pequenos), **Linear** (moderno, popular em startups), **ClickUp**, **Asana**, **Monday**.
- **Cada issue vira um cartão.** Título, descrição, critérios de aceitação, story points, responsável, status. O commit e o Pull Request ([[64-Pull-Requests-code-review-e-issues]]) costumam referenciar o número da issue, ligando código a planejamento.
- **Relatórios automáticos.** As ferramentas geram burndown, velocity e CFD sozinhas. Gestores olham esses gráficos; saber lê-los te faz participar melhor das conversas.
- **Estimativa é assunto político.** Vendas quer prazo curto, engenharia quer folga, o PO negocia no meio. Sua estimativa honesta é uma **defesa** contra promessas irreais feitas em cima do seu tempo.
- **Alguns times abandonam story points** (o movimento **#NoEstimates**) e apenas contam quantas tarefas pequenas entregam por semana (throughput). Funciona bem quando as tarefas têm tamanho parecido.
- **"Aumente a velocity" é red flag.** Empresas saudáveis usam velocity para prever; empresas tóxicas usam para pressionar. Reconhecer a diferença te protege.

---

## ⚠️ Erros comuns

- **Converter story points em horas fixas.** "1 ponto = 4 horas" destrói a vantagem do método (independência de pessoa e de precisão absoluta) e recria a pressão das horas.
- **Comparar velocity entre times.** Não faz sentido: cada time calibra seus pontos de forma diferente. Velocity só compara o time **consigo mesmo** ao longo do tempo.
- **Tratar a estimativa como promessa.** Estimativa é previsão sob incerteza. Quando vira compromisso gravado em pedra, gera pressão, atalhos e código ruim.
- **Estimar sozinho o trabalho dos outros.** Quem estima deve ser quem vai fazer. Um gerente estimando pela equipe ignora a realidade de quem põe a mão na massa.
- **Deixar itens gigantes (13+) na sprint.** Tarefas enormes escondem incerteza e falham em caber. O sinal do número alto é: **quebre em pedaços menores**.
- **Encher a sprint acima da velocity.** Puxar mais do que o histórico mostra que cabe garante uma sprint frustrada e horas extras.
- **Achar que a ferramenta é o processo.** Jira não te deixa ágil. Um quadro lindo com um time que não conversa continua sendo um time que não conversa.

---

## 💡 Dicas profissionais

- **Estime em grupo e valorize a divergência.** Quando alguém vota muito diferente de você, provavelmente enxergou algo que você não viu. A conversa vale mais que o número.
- **Comunique estimativas em faixas.** "Entre 3 e 5 sprints" é mais honesto e mais útil que "5 sprints exatas". Dá ao negócio a incerteza real para planejar com margem.
- **Quebre o que for grande.** Se você não consegue estimar com confiança, a tarefa está grande ou mal entendida demais. Quebrar reduz risco e melhora a previsão.
- **Registre tudo na ferramenta, mas não vire escravo dela.** O Jira é memória do time; mantenha os cartões atualizados. Só não confunda "cartão movido" com "valor entregue".
- **Aprenda a ler um burndown e uma velocity.** Saber interpretar esses gráficos te dá voz nas conversas de planejamento e te ajuda a defender prazos realistas.
- **Proteja seu tempo com honestidade, não com pessimismo.** Não infle estimativas "por segurança" nem prometa o impossível para agradar. A credibilidade vem de acertar a **tendência**, não um número mágico.

---

## 🎈 Curiosidades

- A ideia de estimar em **tamanho relativo** com Fibonacci vem da **Extreme Programming (XP)** e foi popularizada por Mike Cohn, autor de referência sobre estimativas ágeis.
- O **Planning Poker** foi proposto por James Grenning em 2002 e ganhou o nome (e as cartinhas) depois. Existe até baralho oficial e apps que simulam a votação secreta para times remotos.
- Existe uma escala alternativa bem-humorada: estimar em **"tamanhos de camiseta"** (P, M, G, GG) em vez de números — útil para estimativas grosseiras de itens grandes ainda no backlog.
- O **efeito de ancoragem** (o primeiro número dito "puxa" os outros) é justamente o que o voto secreto do Planning Poker combate. É psicologia aplicada à engenharia.
- A famosa **"Lei de Hofstadter"** brinca com tudo isso: *"Sempre leva mais tempo do que você espera, mesmo levando em conta a Lei de Hofstadter."* Todo dev ri porque dói.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Estimativa** | Previsão de esforço/tamanho de uma tarefa, sob incerteza (não é promessa). |
| **Story point** | Unidade abstrata de tamanho relativo (esforço + complexidade + incerteza). |
| **Fibonacci** | Sequência (1,2,3,5,8,13...) usada para pontuar, refletindo a incerteza crescente. |
| **Planning Poker** | Estimativa em grupo com voto secreto e revelação simultânea. |
| **Velocity** | Média de story points concluídos por sprint; usada para prever entregas. |
| **Burndown** | Gráfico que mostra os pontos restantes da sprint caindo dia a dia. |
| **Refinamento** | Preparar itens do backlog (esclarecer, quebrar) antes de estimar. |
| **Issue / cartão** | Uma unidade de trabalho registrada na ferramenta (Jira, Trello...). |
| **Jira** | Ferramenta dominante de gestão de backlog, sprints e quadros. |
| **#NoEstimates** | Corrente que dispensa story points e conta tarefas entregues (throughput). |

---

## 📝 Resumo

- Estimar software é difícil porque software é sempre **novo e incerto**. O ágil não elimina a incerteza — ele a torna **honesta e gerenciável**.
- **Story points** medem **tamanho relativo** (não horas), aproveitando que humanos comparam melhor do que estimam valores absolutos. A **sequência de Fibonacci** reflete a incerteza crescente das tarefas maiores.
- O **Planning Poker** estima em grupo com voto secreto; seu valor real é a **conversa** que a divergência provoca, não o número.
- **Velocity** é o ritmo real do time (pontos por sprint) e serve para **prever** entregas — nunca para comparar times ou cobrar produtividade.
- Estimativa **não é promessa**: comunique em faixas e atualize com o aprendizado.
- Tudo isso vive em **ferramentas** (Jira, Trello, Azure DevOps, Linear), onde cada item vira um cartão que se move por um quadro — mas a ferramenta não substitui o processo nem a conversa.

---

## ☑️ Checklist de aprendizado

- [ ] Explico por que estimamos em tamanho relativo (story points) e não em horas.
- [ ] Sei conduzir um Planning Poker e entendo por que o voto é secreto.
- [ ] Uso a sequência de Fibonacci e sei que 13+ é sinal de "quebrar a tarefa".
- [ ] Entendo velocity como previsão do próprio time, não como nota.
- [ ] Diferencio estimativa de promessa e sei comunicar em faixas.
- [ ] Conheço as principais ferramentas e o papel de um cartão/issue.

---

## ✏️ Exercícios

**1.** Explique, com a analogia do trajeto para casa, por que é mais fácil acertar "essa tarefa é o dobro daquela" do que "essa tarefa leva 6 horas".

**2.** No Planning Poker, dois devs votam 3 e um vota 13 na mesma tarefa. O que o time deve fazer, e por que essa divergência é considerada valiosa?

**3.** Um time entregou 22, 19 e 25 pontos nas últimas três sprints. O backlog de lançamento tem 90 pontos. Faça uma previsão de quantas sprints faltam e explique por que você a comunicaria como uma faixa.

**4.** Por que **não** faz sentido comparar a velocity de dois times diferentes?

**5. (Reflexão)** A Ana pede ao time da SaborExpress para "aumentar a velocity" e entregar mais rápido. Explique por que esse pedido é uma armadilha e o que você proporia em vez disso.

---

## 💬 Respostas comentadas

**1.** Porque humanos são ruins em estimar valores **absolutos** (6 horas depende de trânsito, imprevistos, de quem faz) e bons em **comparar** tamanhos ("esse trajeto é o dobro daquele"). Story points exploram essa força: em vez de cravar horas, o time compara a tarefa com uma referência conhecida. Depois, a velocity converte pontos em tempo real, empiricamente, "andando pela estrada" em vez de adivinhar.

**2.** O time deve **conversar**: quem votou 3 e quem votou 13 explicam seu raciocínio, e então reestima até convergir. A divergência é valiosa porque geralmente revela algo escondido — quem votou 13 pode ter visto uma dependência, uma homologação ou um caso de erro que os outros ignoraram; ou quem votou 3 pode conhecer um atalho. O desalinhamento vira **alinhamento de entendimento**, que é o verdadeiro produto do Planning Poker.

**3.** Velocity média ≈ (22+19+25)/3 = 22 pontos/sprint. 90 ÷ 22 ≈ **4,1 sprints**, ou seja, algo em torno de 4 a 5 sprints. Eu comunicaria como faixa ("entre 4 e 5 sprints") porque a velocity varia (foi de 19 a 25), o backlog pode crescer com o aprendizado, e imprevistos acontecem. Uma faixa é honesta sobre a incerteza e deixa o negócio planejar com margem, em vez de uma data única que provavelmente escaparia.

**4.** Porque cada time **calibra os pontos de forma diferente**: o que um time chama de "3", outro chama de "5". Os pontos são uma unidade **interna e relativa**, sem significado absoluto entre times. Comparar velocities é como comparar "37 na régua do time A" com "37 na régua do time B" quando as réguas têm marcações distintas. Só faz sentido comparar o time consigo mesmo ao longo do tempo.

**5.** É uma armadilha porque velocity é apenas uma **contagem dos próprios pontos do time**: para "aumentá-la", basta **inflar as estimativas** (chamar de 8 o que antes era 5) sem entregar nada a mais — a métrica sobe, o valor real não. Cobrar velocity corrompe a métrica e destrói sua utilidade de previsão. Em vez disso, eu proporia: usar a velocity real para projetar uma data honesta (em faixa), e, se for preciso entregar mais rápido, **reduzir o escopo** do MVP (priorizar — [[49-MVP-priorizacao-e-validacao]]) ou remover impedimentos que travam o time — não apertar os números.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[43-Scrum-na-pratica]] e [[44-Kanban-e-fluxo-continuo]] — os métodos que essas estimativas e ferramentas alimentam.
- **Próximo (linear):** [[46-O-que-sao-requisitos]] — o que exatamente estamos estimando começa a ser definido aqui.
- **Aplicação direta:** [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]] — o formato dos itens que entram no Planning Poker.
- **Decisão de escopo:** [[49-MVP-priorizacao-e-validacao]] — quando o prazo aperta, prioriza-se o escopo em vez de espremer as estimativas.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 12 → **Capítulo 45 de 119**.
