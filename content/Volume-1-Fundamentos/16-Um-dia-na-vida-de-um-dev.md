# Capítulo 16 — Um dia na vida de um dev (hora a hora)

> **Volume 1 — Fundamentos e Mentalidade** · Módulo 3 — O dia a dia e os bastidores
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Descrever como é, **hora a hora**, um dia típico de trabalho de um desenvolvedor.
- Reconhecer as **ferramentas** do dia a dia (Slack, Jira, Git, editor de código) e para que servem.
- Entender o que acontece numa **daily** e num **code review**, na prática.
- Desmontar a fantasia de que "programador programa o dia inteiro".
- Saber o que se espera de um **dev júnior** num dia normal.
- Sentir-se preparado (e não perdido) para o seu primeiro dia de trabalho.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (1/5).**

---

## ✅ Pré-requisitos

- [[14-Os-papeis-da-area-de-tecnologia]] — os papéis com quem você interage ao longo do dia.
- [[11-Como-tudo-se-conecta]] — o fluxo técnico que o dia a dia percorre.

---

## 📖 Introdução

Chegamos ao capítulo que talvez responda à sua pergunta mais concreta: **como é, de verdade, um dia de trabalho de um desenvolvedor?** Você já sabe o que é software, o que é a profissão, como a empresa funciona e quem são as pessoas. Agora vamos descer ao chão e acompanhar um dia comum, hora a hora, para que o seu primeiro dia de trabalho não seja um mistério assustador.

Este capítulo existe para matar de uma vez uma fantasia que atrapalha muita gente: a imagem do programador de filme, sozinho no escuro, digitando código sem parar por 10 horas. **Não é assim.** Um dia real de dev é feito de conversas, reuniões curtas, leitura de código, investigação de problemas, revisão do trabalho dos colegas e, sim, também de escrever código — mas essa é só uma das atividades, não a única. Entender isso te tira um peso enorme: você não precisa (nem vai) programar ininterruptamente, e as habilidades de comunicação e colaboração importam tanto quanto as técnicas.

Vamos acompanhar um dia da sua vida como dev júnior no squad "Pedidos" da SaborExpress. Não é *o* dia de todo dev (cada empresa e cada pessoa tem seu ritmo), mas é um retrato realista e representativo. Ao final, você vai sentir que já conhece o terreno — e conhecer o terreno é metade da confiança.

---

## 🧠 Analogia

Um dia de dev é como um **dia numa cozinha profissional de restaurante**.

Um cozinheiro não passa o turno inteiro só cortando cebola em silêncio. O dia dele é ritmado e variado: começa com um **alinhamento rápido** (o chef reúne a equipe e diz o que é prioridade hoje, o que está em falta, o que mudou). Depois, ele **prepara seus pratos** (o trabalho concentrado). No meio do caminho, **conversa com os colegas** ("passa o molho?", "esse prato já saiu?"), **prova o prato do outro** para conferir a qualidade (como revisar o código de um colega), lida com **imprevistos** (acabou um ingrediente, um pedido veio errado) e, no fim, participa de um **balanço** do serviço.

O cozinheiro que só sabe cortar cebola, mas não se comunica, não confere o trabalho dos outros e trava em cada imprevisto, atrapalha a cozinha inteira — por melhor que corte cebola. O bom cozinheiro combina a habilidade técnica com o ritmo, a comunicação e a colaboração do serviço.

Guarde a imagem: **o dia de um dev, como o de um cozinheiro, é ritmado e coletivo — alterna trabalho concentrado com alinhamento, colaboração e imprevistos.** Programar é "preparar o prato"; mas o serviço só flui com todo o resto ao redor.

---

## 🧩 Conceitos fundamentais

Antes de acompanhar o dia, vamos conhecer as **ferramentas** que aparecem nele — os "utensílios da cozinha". Você vai conviver com elas todos os dias.

### 1. Ferramenta de comunicação (ex.: Slack, Teams)

Um aplicativo de mensagens do time, organizado em **canais** por assunto (um canal do squad, um de avisos gerais, um de "alguém pode me ajudar?"). É onde boa parte da conversa do trabalho acontece, especialmente em times remotos. Substitui grande parte dos e-mails.

> **Termo explicado — Slack/Teams:** aplicativos de mensagens usados por equipes, organizados em canais por tema. São o "corredor" onde o time conversa ao longo do dia.

### 2. Ferramenta de gestão de tarefas (ex.: Jira, Trello, Azure Boards)

Onde o trabalho fica organizado em **tarefas** (ou *tickets*/*cards*), cada uma descrevendo algo a ser feito. Você "puxa" uma tarefa, trabalha nela e a move por colunas ("A fazer" → "Fazendo" → "Em revisão" → "Pronto"). É como o quadro de comandas da cozinha. (Aprofundado no Cap. 45.)

> **Termo explicado — tarefa / ticket / card:** uma unidade de trabalho descrita numa ferramenta de gestão (ex.: "adicionar botão de repetir pedido"). O dev pega uma, faz, e a marca como concluída.

### 3. Editor de código (ex.: VS Code) e o Git

O **editor de código** é onde você escreve e lê código (o VS Code é o mais popular). O **Git** é a "máquina do tempo" que registra as versões do seu trabalho, e o **GitHub/GitLab** é onde o time compartilha e revisa esse código. Você viu o panorama no [[11-Como-tudo-se-conecta]] e vai aprofundar tudo no módulo de Git (Cap. 48–52).

### 4. A daily (reunião diária)

Uma reunião **curta** (uns 15 minutos), geralmente de manhã, em que cada pessoa do time diz três coisas: o que fez ontem, o que vai fazer hoje, e se está **travada** em algo (um "impedimento"). Serve para o time se alinhar e destravar problemas rápido. É o "alinhamento do chef antes do serviço". (Aprofundada no Cap. 43, sobre Scrum.)

> **Termo explicado — daily (reunião diária):** encontro rápido e diário do time para alinhar o que cada um está fazendo e identificar bloqueios. Não é para resolver problemas em detalhe, só para alinhá-los.

### 5. O code review (revisão de código)

Antes de o seu código "entrar" no sistema, outra pessoa do time o **revisa**: lê, comenta, sugere melhorias, aponta possíveis erros. Você faz o mesmo pelo código dos colegas. É o "provar o prato do outro antes de servir". Garante qualidade e espalha conhecimento pelo time. (Aprofundado no Cap. 64.)

### 6. O ciclo básico de uma tarefa

Juntando as ferramentas, o caminho que uma tarefa percorre no seu dia:

```
Pega a tarefa no Jira  →  puxa o código atualizado (Git)  →
escreve o código (editor)  →  testa  →  abre um Pull Request (GitHub)  →
colega faz code review  →  ajusta  →  código entra no sistema (merge)  →
vai para o ar (deploy)  →  marca a tarefa como concluída
```

Você não precisa entender cada passo técnico agora — vai aprofundar todos ao longo da coleção. O importante é ver o **ritmo**: pegar, construir, revisar, entregar, repetir.

---

## ⚙️ Como funciona na prática

Vamos ao dia, **hora a hora** (horários e detalhes variam, mas o ritmo é este):

```
08:30 — CHEGA / LIGA O COMPUTADOR
        Abre o Slack, lê as mensagens da noite/manhã.
        Abre o Jira, vê suas tarefas e prioridades do dia.
        Toma um café. Se organiza mentalmente.
        ↓
09:00 — DAILY (reunião diária, ~15 min)
        Diz o que fez ontem, o que fará hoje, se está travado.
        Ouve os colegas. Descobre que o QA achou um bug no seu código de ontem.
        ↓
09:20 — TRABALHO CONCENTRADO (a "preparação do prato")
        Puxa o código atualizado (Git).
        Começa a tarefa do dia: "adicionar o botão de repetir pedido".
        Lê o código que já existe para entender onde encaixar o novo.
        Escreve código. Testa. Erra. Corrige. Pesquisa uma dúvida.
        ↓
11:00 — PEDE AJUDA / DESTRAVA
        Travou numa parte. Manda mensagem no canal do squad.
        Um dev sênior responde, dá uma dica. Você destrava.
        (Lembra do "tente primeiro, pergunte depois" do Cap. 4? É isso na prática.)
        ↓
12:00 — ALMOÇO
        ↓
13:00 — CODE REVIEW (revisar o colega)
        Um colega pediu revisão do código dele. Você lê, comenta,
        sugere uma melhoria, aprova. (E aprende vendo o código dele.)
        ↓
13:40 — VOLTA À SUA TAREFA
        Termina o botão de repetir pedido. Testa tudo.
        Abre um Pull Request no GitHub pedindo revisão.
        ↓
14:30 — REFINAMENTO (reunião com produto, ~45 min)
        O squad se reúne com a PM Carla para entender as próximas
        tarefas: ela explica uma nova ideia, o time tira dúvidas e estima.
        ↓
15:30 — AJUSTA SEU CÓDIGO
        O sênior revisou seu Pull Request e sugeriu duas melhorias.
        Você ajusta, responde os comentários. O código é aprovado e entra (merge).
        ↓
16:30 — CORRIGE O BUG DA MANHÃ
        Volta ao bug que o QA achou. Investiga, encontra a causa, corrige, testa.
        ↓
17:15 — FECHA O DIA
        Atualiza suas tarefas no Jira. Anota onde parou (para lembrar amanhã).
        Escreve no diário de aprendizado o que aprendeu hoje. Encerra.
```

Agora **conte quanto tempo, nesse dia, foi só "digitando código novo em silêncio"**. Talvez umas 3 ou 4 horas, espalhadas e entremeadas com reuniões, revisões, ajuda e investigação. As outras horas foram **comunicação, colaboração e resolução de problemas** — que são trabalho de engenharia tão legítimo quanto o código. Esse é o retrato honesto, e ele deveria te aliviar: você não precisa ser uma máquina de digitar; precisa ser alguém que constrói, colabora e resolve.

---

## 🍔 Aplicação na SaborExpress

O dia que acabamos de descrever *é* um dia na SaborExpress — no seu squad "Pedidos", com a PM Carla, o Tech Lead Rafael, a designer Duda, a QA Marina e o líder Bruno, que você conheceu no [[14-Os-papeis-da-area-de-tecnologia]]. Vamos destacar como o dia conecta tudo o que você já aprendeu:

- A **daily** é uma cerimônia do processo ágil (que você verá no Cap. 43) — o time se alinhando, exatamente como o Módulo 2 mostrou os squads funcionando.
- O **bug que a QA Marina achou** é o ciclo de qualidade em ação (Cap. 71): ela testou seu código de ontem e encontrou um caso que você não previu.
- O **refinamento com a Carla** é a fase de *descoberta/entrega* do Cap. 15: o produto explicando o "o quê" e o "porquê" da próxima funcionalidade.
- O **code review** com o sênior é colaboração e aprendizado ao mesmo tempo — você melhora seu código e absorve como um sênior pensa.
- O **"tente primeiro, pergunte depois"** às 11h é o Cap. 4 na vida real: você tentou, travou de verdade, e aí pediu ajuda de forma inteligente.

Percebe como o dia a dia não é um mundo separado do que você estudou? É a **aplicação prática** de tudo: os papéis, o fluxo, o processo, a qualidade, a mentalidade. Quando você viver esse dia na sua futura empresa, vai reconhecer cada peça — e é esse reconhecimento que faz a diferença entre "me sinto perdido" e "sei onde estou". Você não vai chegar cru; vai chegar sabendo o mapa.

---

## 🏢 Como isso acontece em uma empresa

- **O ritmo varia, o padrão se repete.** Empresas remotas, presenciais, startups, gigantes — todas têm alguma versão de: alinhamento (daily), trabalho concentrado, colaboração (reviews, ajuda), reuniões de produto e imprevistos. Os horários e nomes mudam; a estrutura, não.
- **Reuniões existem, mas boas empresas as controlam.** Reunião demais mata a produtividade (o dev precisa de blocos de foco). Times saudáveis protegem o "tempo de trabalho concentrado" e evitam encher o dia de reuniões. Se um dia inteiro virar só reunião, algo está errado.
- **Como júnior, você começa com tarefas menores e bem definidas.** Ninguém joga um recém-chegado num problema gigante e ambíguo. Você pega tarefas de escopo pequeno, com apoio, e cresce a complexidade aos poucos. Pedir ajuda é esperado, não vergonhoso.
- **"Trabalho profundo" é ouro.** As horas de foco ininterrupto (sem reuniões, sem notificações) são onde o código difícil acontece. Muitos devs protegem esses blocos ativamente (silenciando notificações, avisando o time). Aprender a criar e proteger seu tempo de foco é uma habilidade de carreira.
- **Comunicar-se bem é metade do trabalho.** Escrever uma boa mensagem no Slack, explicar um problema com clareza na daily, deixar um bom comentário num code review — isso é avaliado e valorizado tanto quanto o código. Times não são feitos de programadores mudos.

---

## ⚠️ Erros comuns

- **Imaginar que "vou programar o dia inteiro".** Um dia real mistura código com reuniões, revisões, ajuda e investigação. Esperar só código gera frustração e desajuste.
- **Ter vergonha de pedir ajuda (ou pedir cedo demais).** O equilíbrio é "tente primeiro, pergunte depois". Travar horas em silêncio por orgulho desperdiça tempo; pedir sem tentar irrita. Busque o meio.
- **Achar reuniões "perda de tempo" por princípio.** A daily e o refinamento existem para alinhar e evitar retrabalho. Boas reuniões economizam mais tempo do que gastam. (Reunião *ruim* é outra história.)
- **Não anotar onde parou.** Terminar o dia sem registrar o ponto em que estava faz você perder tempo no dia seguinte se reorganizando. Um bilhete para o "você de amanhã" salva minutos preciosos.
- **Ignorar o code review (dar ou receber).** Aprovar sem ler, ou levar comentários para o lado pessoal, prejudica a qualidade e o aprendizado. Review é colaboração, não julgamento.
- **Não proteger tempo de foco.** Ficar o dia todo respondendo mensagem na hora impede o trabalho profundo. Está tudo bem responder o Slack em blocos, não a cada segundo.

---

## 💡 Dicas profissionais

- **Comece o dia se organizando.** 10 minutos revendo tarefas e prioridades antes de mergulhar evitam trabalhar na coisa errada. Planejar o dia é investir para economizar.
- **Prepare sua daily em 30 segundos.** Antes da reunião, pense: "o que fiz, o que farei, onde estou travado". Uma daily objetiva respeita o tempo de todos e te faz parecer organizado.
- **Deixe um "bilhete para amanhã".** Ao parar, escreva onde estava e qual o próximo passo. O "você de amanhã" agradece e retoma o foco em segundos.
- **Peça ajuda com contexto.** Em vez de "não funciona", diga "estou tentando X, esperava Y, aconteceu Z, já tentei W". Isso respeita o tempo de quem ajuda e resolve mais rápido (Cap. 90).
- **Proteja blocos de foco.** Reserve períodos sem reuniões e com notificações silenciadas para o trabalho difícil. Avise o time. Sua produtividade (e sua sanidade) melhoram muito.
- **Trate o code review como aprendizado dos dois lados.** Revisando, você aprende com o código dos outros; sendo revisado, você melhora. Encare cada comentário como um presente, não uma crítica.

---

## 🎈 Curiosidades

- A ideia de proteger **"trabalho profundo"** (*deep work*) foi popularizada pelo autor Cal Newport: períodos de concentração sem distração produzem o trabalho de maior valor — e são cada vez mais raros num mundo de notificações constantes.
- Estudos e relatos da indústria estimam que uma **interrupção** durante uma tarefa concentrada pode custar **15 a 25 minutos** até você recuperar o foco total. Por isso devs valorizam tanto blocos ininterruptos — e por isso "só uma perguntinha rápida" nem sempre é tão rápida em custo.
- A **daily** vem do **Scrum** (Cap. 43) e tem, oficialmente, um tempo curto (uns 15 minutos) justamente para não virar uma reunião longa. Times que deixam a daily se arrastar por uma hora estão fazendo errado — e todo mundo sente.
- Muitos devs organizam o dia com técnicas de foco como o **Pomodoro** (que você viu no [[02-Como-estudar-engenharia-de-software]]): blocos de trabalho concentrado com pausas curtas. O que serve para estudar serve para trabalhar.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Slack / Teams** | Apps de mensagens do time, organizados em canais por assunto. |
| **Jira / Trello** | Ferramentas onde o trabalho é organizado em tarefas/cards. |
| **Tarefa / ticket / card** | Uma unidade de trabalho descrita numa ferramenta de gestão. |
| **Editor de código (VS Code)** | Programa onde você escreve e lê código. |
| **Daily** | Reunião diária curta para alinhar o que cada um faz e destravar bloqueios. |
| **Impedimento / bloqueio** | Algo que impede você de avançar numa tarefa. |
| **Code review** | Revisão do seu código por outra pessoa antes de ele entrar no sistema. |
| **Pull Request (PR)** | Pedido para juntar seu código ao projeto, que passa por revisão. |
| **Merge** | Juntar o código aprovado ao sistema principal. |
| **Refinamento** | Reunião do time com produto para entender e estimar próximas tarefas. |
| **Trabalho profundo (deep work)** | Período de concentração sem distração, onde o trabalho difícil acontece. |

---

## 📝 Resumo

- Um dia de dev **não é programar em silêncio o dia inteiro**: é ritmado e coletivo, como uma cozinha profissional — alterna foco, alinhamento, colaboração e imprevistos.
- As ferramentas do dia: **Slack/Teams** (comunicação), **Jira/Trello** (tarefas), **editor + Git/GitHub** (código), além das reuniões.
- Momentos típicos: **daily** (alinhamento diário curto), **trabalho concentrado**, **pedir ajuda**, **code review** (revisar e ser revisado), **refinamento** (com produto) e **imprevistos** (bugs).
- Escrever código novo é só **uma parte** do dia; comunicação, colaboração e resolução de problemas ocupam boa parte — e são engenharia tão legítima quanto o código.
- Como **júnior**, você começa com tarefas pequenas e bem definidas, e pedir ajuda ("tente primeiro, pergunte depois") é esperado.
- Proteger **tempo de foco** e comunicar-se bem são habilidades de carreira tão importantes quanto as técnicas.

---

## ☑️ Checklist de aprendizado

- [ ] Consigo descrever um dia típico de dev, hora a hora, no ritmo geral.
- [ ] Conheço as principais ferramentas do dia a dia e para que servem.
- [ ] Sei o que acontece numa daily e num code review.
- [ ] Entendo que programar é só uma parte do dia, não a totalidade.
- [ ] Sei o que se espera de um júnior num dia normal.
- [ ] Entendo a importância de proteger tempo de foco e de comunicar bem.

---

## ✏️ Exercícios

**1.** Com a analogia da cozinha, explique por que um dev não passa o dia "só programando em silêncio".

**2.** O que acontece numa daily? Cite as três coisas que cada pessoa costuma dizer e para que serve a reunião.

**3.** Descreva o ciclo básico de uma tarefa, do momento em que você a pega no Jira até ela ir para o ar.

**4.** Por que "proteger tempo de foco" é importante, e o que pode acontecer se o dia inteiro virar reuniões e interrupções?

**5. (Reflexão)** Olhando o dia hora a hora deste capítulo, qual momento você acha que seria o mais confortável para você e qual seria o mais desafiador? Por quê?

---

## 💬 Respostas comentadas

**1.** Como numa cozinha profissional, o dia do dev é ritmado e coletivo: começa com um alinhamento (daily), tem blocos de trabalho concentrado ("preparar o prato"), mas também conversas com colegas, revisão do trabalho dos outros (code review, como "provar o prato"), pedidos de ajuda e imprevistos (bugs). Programar é uma das atividades, não a única — e o "serviço" só flui com a comunicação e a colaboração ao redor. Um dev que só digita mas não colabora atrapalha o time, como o cozinheiro que só corta cebola mas não se comunica.

**2.** Na daily, cada pessoa costuma dizer: (1) o que fez ontem, (2) o que vai fazer hoje, (3) se está travada em algo (impedimento). Serve para o time se **alinhar** rapidamente e **identificar bloqueios** para destravá-los — não para resolver os problemas em detalhe ali, mas para saber quem precisa de ajuda e em quê. Por isso é curta (~15 min).

**3.** Você pega a tarefa no Jira e a move para "fazendo"; puxa o código atualizado com Git; escreve o código no editor; testa; abre um Pull Request no GitHub pedindo revisão; um colega faz o code review e comenta; você ajusta conforme os comentários; o código aprovado é juntado ao sistema (merge); ele vai para o ar (deploy); e você marca a tarefa como concluída.

**4.** Proteger tempo de foco é importante porque o trabalho difícil (código complexo, resolução de problemas) exige concentração ininterrupta ("trabalho profundo"), e cada interrupção custa vários minutos até recuperar o foco. Se o dia inteiro virar reuniões e interrupções, sobra pouco ou nenhum bloco de concentração, e as tarefas que exigem raciocínio profundo não avançam — gerando a sensação de "trabalhei o dia todo e não produzi nada". Por isso devs (e bons times) reservam e defendem blocos sem reuniões e com notificações silenciadas.

**5.** Resposta pessoal. O valor está na autorreflexão honesta: por exemplo, alguém mais introvertido pode achar o trabalho concentrado confortável e as reuniões (daily, refinamento) desafiadoras; alguém mais comunicativo pode achar o oposto; um iniciante pode achar o code review intimidante no começo. Nomear isso ajuda a se preparar (ex.: praticar a fala da daily, encarar o review como aprendizado) e reduz a ansiedade do primeiro dia.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[17-Cerimonias-ferramentas-e-ritmo-de-um-time]] — amplia o dia para a *semana* e o *mês*: as cerimônias e o ritmo do time.
- **Base:** [[14-Os-papeis-da-area-de-tecnologia]] — as pessoas com quem você interage nesse dia.
- **Muito relacionado:** [[18-Bastidores-uma-semana-real]] — um retrato mais cru, com um bug urgente e um incidente reais.
- **Aplicação futura:** Capítulo 43 — *Scrum na prática* (Volume 3) — de onde vêm a daily e o refinamento; e Capítulo 64 — *Pull Requests e code review*.

---

> 🧭 **Você está aqui:** Volume 1 → Módulo 3 → **Capítulo 16 de 119**.
