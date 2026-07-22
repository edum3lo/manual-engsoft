---
title: '14 - Os papéis da área de tecnologia'
---

# Capítulo 14 — Os papéis da área de tecnologia

> **Volume 1 — Fundamentos e Mentalidade** · Módulo 2 — Como funciona uma empresa de tecnologia
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Identificar os principais **papéis** de um time de tecnologia e o que cada um faz.
- Diferenciar **desenvolvedor, QA, PO/PM, Tech Lead, Arquiteto, DevOps, SRE, EM e Designer**.
- Entender a diferença entre **papel** (função) e **cargo/senioridade** (júnior, pleno, sênior).
- Saber **com quem falar** para cada tipo de necessidade no dia a dia.
- Compreender como os papéis **colaboram** num fluxo de trabalho real.
- Enxergar os **caminhos de carreira** que se abrem a partir de "desenvolvedor".

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (1/5).**

---

## ✅ Pré-requisitos

- [[13-Por-dentro-da-empresa-areas-e-organograma]] — as áreas da empresa e o conceito de squad, onde esses papéis convivem.
- [[11-Como-tudo-se-conecta]] — o fluxo técnico em que cada papel atua.

---

## 📖 Introdução

Se tem uma coisa que faz o recém-formado se sentir perdido numa reunião, é a **sopa de siglas e cargos**: "o PO priorizou", "vou perguntar pro Tech Lead", "isso é com o time de SRE", "o EM marcou nossa 1:1". Quem são essas pessoas? O que cada uma faz? A quem você deve perguntar o quê?

Este capítulo dá nome e função a cada peça do time de tecnologia. Ao terminá-lo, aquela sopa de siglas vira um time organizado com papéis claros, e você vai saber exatamente **com quem falar** para cada coisa — uma das habilidades mais subestimadas de quem está começando. Saber que "dúvida sobre *o que* construir é com o PO" e "dúvida sobre *como* estruturar o código é com o Tech Lead" te faz produtivo e independente desde cedo.

Vamos também esclarecer uma confusão muito comum: a diferença entre **papel** (a função que a pessoa exerce) e **senioridade** (o nível dela: júnior, pleno, sênior). E, de brinde, você vai enxergar os **caminhos de carreira** possíveis — para onde um "desenvolvedor" pode crescer. Afinal, entender os papéis não é só sobre os outros; é sobre vislumbrar o seu próprio futuro.

---

## 🧠 Analogia

Um time de tecnologia é como a **equipe de produção de um filme**.

Um filme não é feito só por atores. Há o **roteirista** (define a história), o **diretor** (decide como será e coordena), os **atores** (executam as cenas), o **diretor de fotografia** (cuida da imagem), o **editor** (monta e revisa), a **equipe técnica** (luz, som, câmera) e o **produtor** (viabiliza tudo, cuida das pessoas e do orçamento). Cada um tem um papel específico, e o filme só fica bom quando todos colaboram. Ninguém confunde o roteirista com o iluminador — cada função é clara.

Num time de software é igual. Há quem defina *o que* contar (o **PO/PM**, como o roteirista), quem decide *como* será tecnicamente e coordena (o **Tech Lead**, como o diretor), quem executa a construção (os **desenvolvedores**, como os atores), quem cuida da experiência visual (o **Designer**, como o diretor de fotografia), quem revisa a qualidade (o **QA**, como o editor conferindo cada cena), quem cuida da "infraestrutura de gravação" (o **DevOps/SRE**, como a equipe técnica), e quem viabiliza e cuida das pessoas (o **Engineering Manager**, como o produtor).

Guarde a imagem: **cada papel é uma função clara na produção; o "filme" (o produto) só sai bom quando todos os papéis colaboram.** E, assim como no cinema alguém pode ser "ator iniciante" ou "ator premiado", cada papel tem níveis de senioridade — o que veremos a seguir.

---

## 🧩 Conceitos fundamentais

### Os principais papéis, um a um

#### 1. Desenvolvedor(a) / Engenheiro(a) de Software (Dev)

Quem **constrói** o software escrevendo código. É provavelmente o seu ponto de partida. Especializações comuns:

- **Front-end:** faz a parte que o usuário vê (as telas).
- **Back-end:** faz a lógica no servidor (as regras, os dados).
- **Full-stack:** faz um pouco dos dois.
- **Mobile:** faz apps para celular (Android/iOS).

> **Termo explicado — full-stack:** desenvolvedor que trabalha tanto no front-end quanto no back-end. "Stack" aqui é a "pilha" de camadas do sistema.

#### 2. QA / Analista de Qualidade (Quality Assurance)

Quem **garante a qualidade**: testa o software para encontrar defeitos (bugs) antes que cheguem ao usuário. Pode testar manualmente ou criar testes automatizados. É o "editor que confere cada cena". (Aprofundado no Cap. 71.)

#### 3. Product Owner (PO) / Product Manager (PM)

Quem decide **o que** construir e em que ordem, representando o usuário e o negócio. Prioriza o trabalho, escreve o que precisa ser feito, responde às dúvidas de "o que o sistema deve fazer". É o "roteirista". PO e PM têm nuances (o PO é um papel específico do Scrum, o PM é mais amplo), mas para começar, pense neles como "a pessoa dona do *o quê*".

> **Termo explicado — Product Owner (PO):** papel responsável por definir e priorizar o que o time vai construir, representando os interesses do usuário e do negócio. É a principal referência para "o que" e "por que" fazer algo.

#### 4. Tech Lead (Líder Técnico)

Um(a) desenvolvedor(a) experiente que **lidera tecnicamente** o time: ajuda a decidir *como* construir, orienta os colegas, garante qualidade técnica, faz a ponte entre o time e decisões mais amplas. Continua "pondo a mão no código", mas com responsabilidade de liderança. É o "diretor".

#### 5. Arquiteto(a) de Software

Quem cuida das **grandes decisões de estrutura** do sistema (as decisões difíceis de mudar depois — lembra do [[08-O-que-e-engenharia-de-software]]?). Em empresas menores, o Tech Lead acumula esse papel. (Aprofundado no Cap. 57.)

#### 6. DevOps / SRE (Site Reliability Engineer)

Quem cuida da **entrega e da operação**: automatiza o processo de colocar o software no ar (CI/CD), mantém a infraestrutura, e garante que o sistema fique **confiável e no ar** (o SRE foca especialmente nisso). É a "equipe técnica de gravação". (Aprofundado nos módulos de DevOps e Observabilidade.)

> **Termo explicado — DevOps e SRE:** DevOps é a cultura/prática de aproximar quem *desenvolve* de quem *opera* o software, automatizando a entrega. SRE (Engenheiro de Confiabilidade) é um papel focado em manter o sistema confiável e disponível.

#### 7. Engineering Manager (EM) / Gestor de Engenharia

Quem lidera **as pessoas** (não o código): cuida da equipe, do crescimento de carreira de cada um, das contratações, do clima do time. Faz reuniões individuais (as "1:1"). É o "produtor" que cuida das pessoas e viabiliza o trabalho.

> **Termo explicado — 1:1 (one-on-one):** reunião individual e periódica entre o gestor (EM) e cada membro do time, para acompanhar carreira, dificuldades e feedback.

#### 8. Designer (UX/UI)

Quem cuida da **experiência e da aparência** do produto: como será usado (UX) e como vai parecer (UI). Desenha as telas antes de você programá-las. É o "diretor de fotografia". (Aprofundado no módulo de UX.)

> **Termo explicado — UX e UI:** UX (*User Experience*, experiência do usuário) é como é *usar* o produto (fácil? agradável?); UI (*User Interface*, interface do usuário) é a aparência visual (cores, botões, layout).

### Papel ≠ senioridade

Aqui está a confusão que precisamos desfazer. **Papel** é a *função* (desenvolvedor, QA, PO...). **Senioridade** é o *nível de experiência* dentro daquele papel:

- **Júnior:** começando, precisa de orientação, foca em tarefas bem definidas.
- **Pleno:** autônomo, resolve a maioria das coisas sozinho.
- **Sênior:** muito experiente, resolve problemas difíceis, orienta os outros, enxerga o todo.

Então existe "desenvolvedor júnior", "desenvolvedor pleno", "desenvolvedor sênior" — mesmo *papel*, *níveis* diferentes. Você provavelmente vai começar como **desenvolvedor júnior**. A jornada de senioridade é detalhada no Cap. 113.

### Caminhos de carreira

A partir de "desenvolvedor", a carreira costuma se abrir em dois grandes caminhos (você não precisa escolher agora, mas é bom saber que existem):

- **Caminho técnico (IC — Individual Contributor):** dev júnior → pleno → sênior → especialista/staff/arquiteto. Você cresce **aprofundando na técnica**, sem virar gestor.
- **Caminho de gestão (Management):** dev → Tech Lead → Engineering Manager → diretor. Você cresce **liderando pessoas**.

Nenhum é superior; são diferentes. Muita gente acha que "crescer" significa "virar chefe" — não é verdade. Há sêniores e especialistas técnicos altamente valorizados que nunca gerenciaram ninguém.

---

## ⚙️ Como funciona na prática

**Com quem falar para cada coisa** — talvez a tabela mais útil deste capítulo para o seu primeiro emprego:

| Sua necessidade | Com quem falar |
|---|---|
| "O que exatamente eu preciso construir? Qual a prioridade?" | **PO / PM** |
| "Como essa tela deve ficar? Qual a experiência?" | **Designer** |
| "Qual a melhor forma técnica de fazer isso? Que padrão seguir?" | **Tech Lead / Sênior** |
| "Como decidir a estrutura geral do sistema?" | **Arquiteto / Tech Lead** |
| "Meu código está pronto — alguém revisa?" | Outro **Dev** (code review) |
| "Encontrei/podem ter um bug — como testar isso direito?" | **QA** |
| "Como coloco isso no ar? A esteira de deploy falhou." | **DevOps / SRE** |
| "Quero falar sobre minha carreira, dificuldades, crescimento." | **Engineering Manager (EM)** |

E como os papéis colaboram num fluxo real (simplificado):

```
PO/PM define O QUE construir e prioriza
        ↓
Designer desenha COMO será a experiência/telas
        ↓
Tech Lead ajuda a decidir COMO construir tecnicamente
        ↓
Desenvolvedores CONSTROEM (e revisam o código uns dos outros)
        ↓
QA TESTA e encontra defeitos
        ↓
DevOps/SRE ENTREGA (coloca no ar) e mantém no ar
        ↓
EM cuida das PESSOAS e do time durante todo o processo
```

Repare que, num squad (do [[13-Por-dentro-da-empresa-areas-e-organograma]]), essas pessoas estão **no mesmo time**, colaborando diariamente — não em departamentos distantes. Você, dev júnior, conversa com todas elas ao longo de uma semana normal.

---

## 🍔 Aplicação na SaborExpress

Vamos dar nomes aos papéis no seu squad "Pedidos" da SaborExpress e ver um dia de colaboração:

- **Carla (PO/PM):** define que a próxima entrega é "permitir agendar um pedido para mais tarde". Ela explica *por que* (clientes pediram) e *o que* exatamente precisa acontecer.
- **Duda (Designer):** desenha as telas de agendamento — como o cliente escolhe o horário, onde aparece o aviso.
- **Rafael (Tech Lead):** discute com o time *como* construir: onde guardar o horário agendado, como o sistema vai "lembrar" de preparar o pedido na hora certa.
- **Você (Dev júnior) + outro dev:** constroem a funcionalidade. Você faz a tela (front-end); o colega, a lógica no servidor (back-end). Vocês revisam o código um do outro.
- **Marina (QA):** testa tudo — e se o cliente agendar para um horário em que a pizzaria está fechada? E se agendar para o passado? Ela encontra esses casos.
- **Pedro (DevOps/SRE):** garante que a nova versão sobe para o ar sem derrubar o app e monitora se está tudo bem depois.
- **Bruno (EM/Líder de Engenharia):** na sua 1:1 da semana, pergunta como você está, se está aprendendo, e te dá feedback sobre seu crescimento.

Percebe como cada papel tem uma função clara, e como *você sabe a quem recorrer*? Travou porque não entendeu o que construir? Fala com a Carla. Dúvida sobre a melhor forma técnica? Com o Rafael. Quer discutir carreira? Com o Bruno. A sopa de siglas virou um time onde você sabe navegar. **Esse conhecimento é o que te faz parar de se sentir perdido — exatamente o seu objetivo.**

---

## 🏢 Como isso acontece em uma empresa

- **Os papéis se acumulam em empresas pequenas.** Numa startup enxuta, uma pessoa pode ser dev *e* DevOps *e* meio QA; o fundador pode ser PO *e* arquiteto. Os papéis existem como *funções*, mesmo quando não há uma pessoa dedicada a cada um.
- **Os nomes variam entre empresas.** Uma pode chamar de "Product Manager", outra de "Product Owner"; uma tem "Tech Lead", outra "Staff Engineer". Não decore nomes — entenda as *funções*, que são estáveis.
- **Saber com quem falar te faz produtivo (e bem-visto).** Recém-chegados que perguntam a coisa certa para a pessoa certa se integram muito mais rápido. Perguntar ao PO uma dúvida técnica ou ao DevOps uma dúvida de produto gera confusão e retrabalho.
- **Sua senioridade cresce com o tempo, não com o cargo do dia.** Você entra júnior e evolui. Não se compare com o sênior ao seu lado: ele já foi júnior. Compare-se com você de meses atrás. (Cap. 113 detalha essa jornada.)
- **Conhecer os caminhos de carreira ajuda a planejar.** Saber, desde cedo, que existe o caminho técnico (sem virar chefe) e o de gestão te ajuda a mirar onde faz sentido para você — sem cair no mito de que "crescer = gerenciar".

---

## ⚠️ Erros comuns

- **Confundir papel com senioridade.** "Desenvolvedor" é um papel; "júnior/pleno/sênior" é o nível. Existe desenvolvedor sênior e PO júnior.
- **Não saber a quem recorrer.** Levar toda dúvida para a mesma pessoa (ou para ninguém) trava seu trabalho. Use a tabela "com quem falar".
- **Achar que "crescer" é só virar gestor.** O caminho técnico (IC) é igualmente valioso e não envolve gerenciar pessoas.
- **Decorar as siglas sem entender as funções.** Os nomes mudam de empresa para empresa; as funções, não. Foque nas funções.
- **Desvalorizar papéis "não-código" (PO, QA, Designer).** Cada um é essencial para o produto sair bom. Desprezá-los prejudica a colaboração e o resultado.
- **Ter vergonha de ser júnior.** Todo sênior já foi júnior. Ser júnior é o começo natural, não um defeito. Perguntar é seu trabalho nessa fase.

---

## 💡 Dicas profissionais

- **Monte sua tabela pessoal de "quem faz o quê" no onboarding.** Descobrir cedo quem é o seu PO, Tech Lead, QA e EM acelera muito sua integração.
- **Como júnior, pergunte — é o esperado de você.** Ninguém espera que um júnior saiba tudo. Espera-se que ele pergunte de forma inteligente à pessoa certa. Perguntar bem é uma habilidade (Cap. 90).
- **Observe os sêniores e o Tech Lead.** Muito do que separa júnior de sênior você aprende observando como eles pensam, decidem e comunicam. Aprenda de graça, ao lado deles.
- **Converse com seu EM sobre carreira desde cedo.** Use as 1:1 para dizer onde você quer crescer. Um bom EM te ajuda a chegar lá — mas ele precisa saber o que você quer.
- **Respeite e aprenda com todos os papéis.** Entender como o PO pensa, como o designer decide, como o QA caça bugs te torna um engenheiro mais completo e colaborativo.

---

## 🎈 Curiosidades

- O papel de **SRE (Site Reliability Engineer)** foi criado e popularizado por uma grande empresa de buscas nos anos 2000, com uma ideia provocativa: "e se pedíssemos a engenheiros de software para fazer o trabalho de operação?". Virou uma disciplina inteira.
- A distinção entre carreira **técnica (IC)** e de **gestão (management)** costuma ser desenhada como uma "escada dupla" (*dual ladder*): dois caminhos de crescimento paralelos, para que bons técnicos não sejam *obrigados* a virar gestores para crescer (e ganhar mais).
- Os termos **PO** e **Scrum Master** vêm do **Scrum** (Cap. 43), um método ágil específico. Por isso, empresas que não usam Scrum às vezes preferem "Product Manager" e não têm "Scrum Master". Os nomes carregam a história das metodologias.
- Em muitas empresas, a transição de **desenvolvedor sênior para Engineering Manager** é um dos momentos mais delicados de carreira, porque exige *trocar* de habilidade: de resolver problemas técnicos para desenvolver pessoas. Nem todo ótimo dev quer (ou deve) fazer essa troca — e está tudo bem.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Desenvolvedor/Engenheiro (Dev)** | Quem constrói o software escrevendo código. |
| **Front-end / Back-end / Full-stack / Mobile** | Especializações do dev (telas / lógica do servidor / ambos / apps de celular). |
| **QA (Analista de Qualidade)** | Quem testa o software para encontrar defeitos antes do usuário. |
| **PO / PM (Product Owner / Manager)** | Quem define e prioriza o que será construído, representando usuário e negócio. |
| **Tech Lead** | Dev experiente que lidera tecnicamente o time. |
| **Arquiteto** | Quem cuida das grandes decisões de estrutura do sistema. |
| **DevOps / SRE** | Quem automatiza a entrega e mantém o sistema confiável e no ar. |
| **Engineering Manager (EM)** | Quem lidera as pessoas do time (carreira, contratações, clima). |
| **Designer (UX/UI)** | Quem cuida da experiência (UX) e aparência (UI) do produto. |
| **1:1 (one-on-one)** | Reunião individual periódica entre gestor e membro do time. |
| **Senioridade (júnior/pleno/sênior)** | Nível de experiência dentro de um papel. |
| **IC (Individual Contributor)** | Caminho de carreira técnico, sem gerenciar pessoas. |

---

## 📝 Resumo

- Um time de tecnologia é como uma **equipe de cinema**: papéis com funções claras que colaboram para o produto sair bom.
- Principais papéis: **Dev** (constrói), **QA** (testa), **PO/PM** (define o quê), **Tech Lead** (lidera tecnicamente), **Arquiteto** (estrutura), **DevOps/SRE** (entrega e mantém no ar), **EM** (lidera pessoas) e **Designer** (experiência e aparência).
- **Papel ≠ senioridade:** papel é a função (dev, QA...); senioridade é o nível (júnior, pleno, sênior). Existe "dev sênior" e "PO júnior".
- Saber **com quem falar** para cada necessidade te torna produtivo e independente desde o primeiro dia.
- A carreira se abre em dois caminhos: **técnico (IC)** e **de gestão** — nenhum superior ao outro. Crescer não é obrigatoriamente virar chefe.
- Os **nomes variam** entre empresas; as **funções** são estáveis. Foque nas funções.

---

## ☑️ Checklist de aprendizado

- [ ] Sei nomear os principais papéis de um time de tecnologia e o que cada um faz.
- [ ] Diferencio papel (função) de senioridade (nível de experiência).
- [ ] Sei com quem falar para cada tipo de necessidade no trabalho.
- [ ] Entendo como os papéis colaboram num fluxo real.
- [ ] Conheço os dois caminhos de carreira (técnico e de gestão).
- [ ] Compreendo que ser júnior é o começo natural e que perguntar faz parte.

---

## ✏️ Exercícios

**1.** Com a analogia do cinema, associe três papéis de software a três funções de uma produção de filme e explique a semelhança.

**2.** Explique a diferença entre papel e senioridade. Dê dois exemplos de "mesmo papel, senioridades diferentes".

**3.** Para cada situação, diga com quem você falaria: (a) não entendeu o que precisa construir; (b) precisa saber a melhor forma técnica de estruturar o código; (c) quer discutir seu crescimento de carreira; (d) acha que encontrou um bug e quer testar direito.

**4.** Explique os dois caminhos de carreira (técnico e de gestão) e por que "crescer" não significa necessariamente "virar chefe".

**5. (Prática)** Monte a sua própria "tabela de com quem falar" para um squad fictício, nomeando uma pessoa para cada papel (PO, Tech Lead, Designer, QA, DevOps, EM) e uma necessidade típica que você levaria a cada uma.

---

## 💬 Respostas comentadas

**1.** Exemplos válidos: **PO/PM ↔ roteirista** (ambos definem *o que* será contado/construído); **Tech Lead ↔ diretor** (ambos decidem *como* será feito e coordenam a execução); **QA ↔ editor** (ambos revisam/conferem a qualidade de cada parte antes de ir ao público); **Designer ↔ diretor de fotografia** (ambos cuidam da experiência visual); **EM ↔ produtor** (ambos viabilizam e cuidam das pessoas). Qualquer três associações coerentes servem.

**2.** Papel é a *função* que a pessoa exerce (desenvolvedor, QA, PO); senioridade é o *nível de experiência* dentro dessa função (júnior, pleno, sênior). Exemplos de mesmo papel com senioridades diferentes: "desenvolvedor júnior" vs. "desenvolvedor sênior"; "QA pleno" vs. "QA sênior". A função é a mesma; o que muda é o grau de autonomia e experiência.

**3.** (a) com o **PO/PM** (dono do "o quê"); (b) com o **Tech Lead** (ou um dev sênior); (c) com o **Engineering Manager (EM)**; (d) com o **QA**.

**4.** O **caminho técnico (IC)** faz você crescer aprofundando na técnica (dev júnior → pleno → sênior → especialista/arquiteto), sem gerenciar pessoas. O **caminho de gestão** faz você crescer liderando pessoas (dev → Tech Lead → EM → diretor). "Crescer" não significa necessariamente virar chefe porque o caminho técnico é igualmente valorizado (e bem remunerado): há especialistas sêniores altamente respeitados que nunca gerenciaram ninguém. Virar gestor é uma *troca* de habilidade, não uma promoção automática.

**5.** Resposta pessoal. Uma boa resposta nomeia uma pessoa para cada papel e associa a necessidade correta: PO → "o que construir e prioridade"; Tech Lead → "melhor forma técnica"; Designer → "aparência/experiência da tela"; QA → "como testar / possível bug"; DevOps → "colocar no ar / esteira de deploy"; EM → "carreira e dificuldades". O importante é a associação necessidade↔papel estar coerente.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[15-Como-a-empresa-cria-produto-lanca-cresce-e-escala]] — como esses papéis, juntos, tocam um produto do início ao crescimento.
- **Base:** [[13-Por-dentro-da-empresa-areas-e-organograma]] — as áreas e squads onde esses papéis convivem.
- **Muito relacionado:** [[16-Um-dia-na-vida-de-um-dev]] — o dia a dia de um desses papéis (o seu), interagindo com os outros.
- **Aplicação futura:** Capítulo 113 — *Plano de carreira* (Volume 5) — a jornada júnior → pleno → sênior → além, em detalhe.

---

> 🧭 **Você está aqui:** Volume 1 → Módulo 2 → **Capítulo 14 de 119**.
