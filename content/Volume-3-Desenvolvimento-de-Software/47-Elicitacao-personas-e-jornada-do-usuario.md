# Capítulo 47 — Elicitação, personas e jornada do usuário

> **Volume 3 — Desenvolvimento de Software** · Módulo 13 — Engenharia de Requisitos
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **elicitação** de requisitos e por que "perguntar o que o cliente quer" não basta.
- Conhecer as principais **técnicas** de elicitação (entrevista, observação, workshop, questionário, análise de concorrentes).
- Criar uma **persona** para representar um tipo de usuário.
- Mapear uma **jornada do usuário** e usá-la para descobrir requisitos escondidos.
- Reconhecer as armadilhas de escutar o cliente (o problema do "cavalo mais rápido").

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[46-O-que-sao-requisitos]] — aqui aprendemos a **descobrir** aquilo que lá definimos.

---

## 📖 Introdução

No capítulo anterior você viu **o que** é um requisito. Agora vem a pergunta prática: **como descobri-los?** A resposta ingênua é "pergunte ao cliente o que ele quer". Mas quem já tentou sabe que isso é uma armadilha. O cliente frequentemente pede a **solução que imagina**, não descreve o **problema que tem**. Ele diz "quero um botão aqui" quando o problema real é "não consigo achar meus pedidos antigos". Se você só anota o que ele pede, constrói a coisa errada com precisão.

Existe uma frase famosa (atribuída a Henry Ford, provavelmente apócrifa, mas perfeita para ilustrar): *"se eu perguntasse aos meus clientes o que eles queriam, teriam dito um cavalo mais rápido."* As pessoas descrevem melhorias do que já conhecem; cabe a você enxergar a **necessidade por trás** (ir mais rápido de um lugar a outro) e não apenas o pedido literal (o cavalo).

**Elicitação** é a arte de extrair essas necessidades reais. Não é transcrição; é investigação. Neste capítulo você aprende as técnicas para fazer isso e duas ferramentas poderosas para **organizar** o que descobriu: as **personas** (que dão rosto aos usuários) e a **jornada do usuário** (que revela requisitos escondidos nos passos e nas frustrações de quem usa o sistema).

---

## 🧠 Analogia

Pense num **médico diante de um paciente**.

Um médico ruim age como um garçom: o paciente diz "quero um antibiótico" e ele anota e entrega. Um médico bom sabe que o paciente descreve **sintomas e palpites**, não o diagnóstico. Ele **investiga**: onde dói, desde quando, o que piora, o que você já tentou. Ele **observa** (a aparência, os exames), **pergunta o porquê** por trás da queixa, e só então chega à causa real — que pode não ter nada a ver com o antibiótico pedido.

Elicitar requisitos é exatamente isso. O cliente traz "sintomas" ("quero uma tela de relatórios") e "palpites de solução" ("com um gráfico de pizza"). Seu trabalho é **diagnosticar a necessidade**: por que você quer esse relatório? que decisão você toma com ele? o que te frustra hoje? Muitas vezes, ao investigar, você descobre que o gráfico de pizza não resolve nada e que a real dor é outra. Quem só anota o pedido é garçom de requisitos; quem investiga a causa é engenheiro.

---

## 🧩 Conceitos fundamentais

### 1. Elicitação — descobrir, não coletar

**Elicitação** é o processo de **descobrir** os requisitos junto às pessoas interessadas (*stakeholders*): usuários, clientes, patrocinadores, especialistas do domínio. A palavra é "elicitar" (extrair, fazer emergir), não "coletar", justamente porque muitos requisitos **não estão prontos** na cabeça de ninguém — eles emergem da conversa e da observação.

> **Termo explicado — elicitação:** atividade de descobrir e fazer emergir os requisitos de um sistema junto aos stakeholders, indo além do que é dito explicitamente.

### 2. Stakeholders — quem tem interesse

**Stakeholder** é qualquer pessoa ou grupo **afetado** pelo sistema ou com interesse nele: o usuário final, quem paga, quem opera, quem regula. Um erro clássico é ouvir só **um** stakeholder (geralmente quem paga) e esquecer os outros. Na SaborExpress, os stakeholders incluem o **cliente** que pede comida, o **restaurante** que recebe o pedido, o **entregador**, e a **Ana** que quer lucro — cada um com necessidades diferentes, às vezes conflitantes.

### 3. Técnicas de elicitação

Não existe uma técnica única; boas equipes **combinam** várias:

- **Entrevista** — conversa individual, aberta ("me conte como você faz hoje"). Rica, mas depende de boas perguntas.
- **Observação (job shadowing)** — assistir a pessoa trabalhando de verdade. Revela o que ela **faz** (não só o que **diz** que faz) e os "jeitinhos" que ninguém menciona.
- **Workshop / brainstorming** — reunir vários stakeholders para levantar e priorizar ideias juntos.
- **Questionário / survey** — alcança muita gente com perguntas fechadas; bom para quantidade, fraco para profundidade.
- **Análise de documentos e sistemas atuais** — estudar planilhas, processos e o software que já usam.
- **Análise de concorrentes / benchmarking** — ver como outros resolvem o mesmo problema.
- **Prototipagem** — mostrar um rascunho e observar a reação (o cliente reage melhor ao concreto — [[53-Figma-wireframes-prototipos-e-Design-System]]).

> **Termo explicado — job shadowing:** observar o usuário realizando sua tarefa real, para captar o que ele faz de fato, não apenas o que relata.

### 4. Personas — dar rosto ao usuário

Uma **persona** é um **personagem fictício** que representa um tipo real de usuário, construído a partir do que você descobriu. Ela tem nome, idade, contexto, objetivos e frustrações. A persona não é decoração: ela dá ao time um **alvo humano concreto** para decidir ("a Dona Marta ia entender esse botão?") em vez de projetar para um "usuário" abstrato — que costuma ser, sem querer, uma cópia do próprio dev.

> **Termo explicado — persona:** personagem fictício representando um perfil de usuário real (com objetivos, contexto e frustrações), usado para guiar decisões de produto.

Exemplo de persona da SaborExpress:
```
👤 Marta, 58 anos — a cliente ocasional
   Contexto: usa o celular para WhatsApp e pouco mais. Pede comida no fim de semana.
   Objetivo: pedir o jantar sem complicação, pagar do jeito que já conhece.
   Frustrações: telas cheias, letras pequenas, ter que criar senha complexa.
   → Requisito que isso revela: fluxo de pedido simples, login fácil, fonte legível.
```

### 5. Jornada do usuário — o filme, não a foto

A **jornada do usuário (user journey)** mapeia, **passo a passo**, tudo que uma persona faz para atingir um objetivo — do primeiro contato ao fim — anotando, em cada passo, o que ela **pensa**, **sente** e onde **trava**. É um "filme" da experiência, não uma "foto" de uma tela isolada.

> **Termo explicado — jornada do usuário:** o mapa passo a passo da experiência de um usuário para cumprir um objetivo, incluindo ações, pensamentos, emoções e pontos de atrito.

O poder da jornada é **revelar requisitos escondidos**: eles se escondem nos passos que ninguém lembra de mencionar (o que acontece se o pagamento falhar no meio?) e nas **dores** (o cliente abandona o carrinho porque o frete só aparece no fim). Cada ponto de atrito é um requisito esperando para ser descoberto.

---

## ⚙️ Como funciona na prática

Veja o fluxo real de uma boa elicitação:

**1. Identifique os stakeholders.** Antes de perguntar, liste **quem** precisa ser ouvido — e garanta que não é só quem paga. Esquecer o restaurante ou o entregador da SaborExpress geraria um app ótimo para o cliente e inutilizável para os outros.

**2. Combine técnicas.** Entreviste alguns clientes, **observe** um restaurante recebendo pedidos por outro app, aplique um questionário para os 500 da lista de espera, e analise dois concorrentes. Cada técnica pega um ângulo; juntas, formam o quadro completo.

**3. Pergunte "por quê", não "o quê".** Quando alguém pede uma solução ("quero um chat com o entregador"), pergunte o **porquê** ("para saber se ele está chegando"). A necessidade real (**saber o status/localização**) pode ter uma solução melhor (rastreio no mapa) do que a pedida (chat).

**4. Sintetize em personas.** Agrupe os usuários reais em 2–4 personas. Elas viram o vocabulário do time: "isso é para a Marta ou para o João apressado?".

**5. Desenhe as jornadas.** Para cada objetivo importante (fazer um pedido, cadastrar um restaurante), mapeie a jornada passo a passo e marque os pontos de atrito. Cada dor vira um requisito.

**6. Valide.** Volte aos stakeholders e confirme: "entendi que você precisa de X pelo motivo Y — é isso?". Validar **antes** de codar é o que impede construir a escada na parede errada ([[41-Modelos-de-processo-de-desenvolvimento]]).

O resultado dessa etapa alimenta a **escrita** dos requisitos (histórias de usuário, [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) e a **priorização** ([[49-MVP-priorizacao-e-validacao]]). Elicitar bem é o que garante que você está resolvendo o problema certo antes de gastar meses de código.

---

## 🍔 Aplicação na SaborExpress

O Bruno (PO) não montou o app da SaborExpress no chute. Ele elicitou.

**Observação que mudou tudo.** Ele passou uma noite **observando** um restaurante parceiro receber pedidos pelo concorrente. Descobriu algo que nenhuma entrevista revelaria: no pico, o atendente **não tinha tempo** de olhar a tela e digitar; ele precisava de um **som alto** a cada pedido novo e de um botão gigante "aceitar". Esse requisito — invisível para quem só pergunta — nasceu de **ver** o trabalho real.

**Personas que alinharam o time.** O Bruno criou três: a **Marta** (cliente ocasional, precisa de simplicidade), o **João** (cliente frequente e apressado, quer repetir o último pedido em 2 toques), e o **Sr. Alberto** (dono do restaurante, quer receber pedidos sem complicar a cozinha). Quando o time discutia uma tela, a pergunta virou concreta: "isso serve a Marta **e** ao João?".

**Jornada que revelou a dor do caixa.** Ao mapear a jornada "fazer um pedido", o time marcou um ponto de atrito enorme: o **frete só aparecia na última tela**, e a Marta abandonava o carrinho ao se assustar com o valor. Esse atrito virou um requisito claro: "mostrar o frete estimado **antes** de montar o carrinho". Um detalhe que, sozinho, reduziu o abandono de carrinho — e que **nenhuma pergunta direta** teria revelado, porque a Marta não sabia dizer "eu desisto por causa do frete tardio"; ela só... desistia.

A lição: os requisitos mais valiosos da SaborExpress não foram **ditos**; foram **descobertos** observando, dando rosto aos usuários e mapeando sua jornada.

---

## 🏢 Como isso acontece em uma empresa

- **Quem faz:** PO/Product Manager, UX Researcher e Analista de Negócios lideram; devs frequentemente participam de entrevistas e observações, porque quem vai construir entende melhor quando ouviu o usuário.
- **"Discovery" é o nome moderno.** Muitas empresas chamam essa fase de **Product Discovery** — investigar o problema antes de construir. Times maduros separam "discovery" (descobrir o que vale a pena fazer) de "delivery" (fazer).
- **Personas e jornadas viram artefatos vivos.** Ficam no Figma, no Miro ou no Notion, visíveis para o time, e são atualizados conforme se aprende mais sobre os usuários.
- **Pesquisa com usuário é uma disciplina.** Em empresas maiores, há **UX Researchers** dedicados a entrevistas, testes de usabilidade e análise de comportamento. Em startups, o PO ou o próprio dev acumula.
- **Dados complementam a conversa.** Além de ouvir, times olham **como** os usuários se comportam de fato (analytics, mapas de calor, gravações de sessão) — o que as pessoas *fazem* às vezes contradiz o que *dizem*.
- **O risco político:** ceder a quem grita mais alto (um stakeholder poderoso) em vez de a quem tem a necessidade real. Boa elicitação equilibra as vozes com evidência.

---

## ⚠️ Erros comuns

- **Anotar o pedido em vez de investigar a necessidade** (o "garçom de requisitos"). O cliente pede a solução que imagina; seu trabalho é achar o problema por trás.
- **Ouvir só um stakeholder.** Projetar a SaborExpress só para o cliente e esquecer o restaurante e o entregador gera um sistema pela metade.
- **Confiar só no que as pessoas dizem.** As pessoas racionalizam e esquecem. **Observar** o comportamento real revela o que a entrevista esconde.
- **Fazer perguntas que induzem a resposta.** "Você não acha que um chat seria ótimo?" já dá a resposta pronta. Pergunte aberto: "como você sabe hoje se o pedido está chegando?".
- **Criar personas genéricas e inúteis.** "Usuário de 20–60 anos que gosta de tecnologia" não guia decisão nenhuma. Persona boa é **específica** e baseada em gente real.
- **Pular a validação.** Elicitar, entender errado e sair codando. Sempre feche o ciclo confirmando com o stakeholder antes de construir.
- **Confundir o que o usuário quer com o que o negócio precisa.** Ambos importam; ignorar qualquer um dos lados gera produto que agrada mas não sustenta (ou que lucra mas ninguém usa).

---

## 💡 Dicas profissionais

- **Pergunte "por quê" cinco vezes.** A técnica dos "5 porquês" cava do pedido superficial até a raiz. "Quero um relatório" → por quê? → "para ver as vendas" → por quê? → "para decidir o que promover"... a necessidade real aparece lá no fundo.
- **Observe, não só entreviste.** Uma hora vendo alguém usar o sistema atual ensina mais do que dez entrevistas. As pessoas não sabem descrever o que fazem no automático.
- **Use personas para vencer discussões subjetivas.** Quando o time discute "eu acho / você acha", traga a persona: "a Marta consegue?". Substituir opinião por um alvo concreto desarma brigas.
- **Mapeie a jornada inteira, inclusive as exceções.** Os requisitos escondidos moram no "e se der errado": pagamento recusado, item esgotado, endereço fora da área. É onde o produto real se prova.
- **Escreva a necessidade separada da solução.** "A Marta precisa saber o custo total antes de decidir" (necessidade) é durável; "colocar o frete no topo em azul" (solução) é uma hipótese que o design testa.
- **Feche sempre o ciclo com validação.** Um resumo de 5 linhas — "isto é o que entendi que você precisa" — enviado ao stakeholder economiza semanas de retrabalho.

---

## 🎈 Curiosidades

- A frase do **"cavalo mais rápido"** é atribuída a Henry Ford, mas não há registro de que ele a tenha dito. Virou mito porque captura uma verdade real: clientes descrevem melhorias do conhecido, não invenções.
- **Alan Cooper**, criador do conceito moderno de **persona** (nos anos 1990), começou a usá-las para não "projetar para si mesmo" — ele percebeu que programadores, sem um alvo humano, projetam interfaces que só outros programadores entendem.
- Grandes empresas gastam fortunas em **pesquisa etnográfica**: mandam pesquisadores morarem semanas perto dos usuários para entender o contexto real (a Intel e a Microsoft já fizeram isso famosamente).
- A **jornada do usuário** tem uma prima no marketing, o **funil**, e uma no design de serviços, o **service blueprint** (que inclui os bastidores invisíveis ao usuário). Todas são "filmes" da experiência.
- Steve Jobs radicalizou o "cavalo mais rápido": famoso por dizer que **não** fazia pesquisa de mercado tradicional porque "as pessoas não sabem o que querem até você mostrar". A verdade útil está no meio: ouvir profundamente **e** ousar propor.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Elicitação** | Descobrir e fazer emergir requisitos junto aos stakeholders. |
| **Stakeholder** | Qualquer pessoa afetada pelo sistema ou com interesse nele. |
| **Entrevista** | Conversa aberta para entender necessidades. |
| **Observação (job shadowing)** | Assistir ao usuário trabalhando de verdade. |
| **Workshop** | Reunião de vários stakeholders para levantar e priorizar ideias. |
| **Persona** | Personagem fictício que representa um tipo real de usuário. |
| **Jornada do usuário** | Mapa passo a passo da experiência, com ações, emoções e atritos. |
| **Ponto de atrito** | Um passo onde o usuário trava, se frustra ou desiste. |
| **Product Discovery** | Fase de investigar o problema antes de construir a solução. |
| **5 porquês** | Técnica de perguntar "por quê" repetidamente até a raiz da necessidade. |

---

## 📝 Resumo

- **Elicitação** é **descobrir** requisitos — não transcrever pedidos. O cliente descreve soluções que imagina; o profissional investiga a **necessidade** por trás (o "cavalo mais rápido").
- Ouça **todos os stakeholders**, não só quem paga, e **combine técnicas**: entrevista, observação, workshop, questionário, análise de concorrentes, prototipagem.
- **Personas** dão um rosto humano concreto aos tipos de usuário, guiando decisões e desarmando discussões subjetivas.
- A **jornada do usuário** é o "filme" da experiência passo a passo; seus **pontos de atrito** revelam requisitos que ninguém verbaliza.
- **Observar** vale mais que perguntar (as pessoas não descrevem bem o que fazem no automático), e **validar** antes de codar impede construir a coisa errada.

---

## ☑️ Checklist de aprendizado

- [ ] Explico por que "perguntar o que o cliente quer" não basta.
- [ ] Conheço e sei quando usar as principais técnicas de elicitação.
- [ ] Sei identificar os stakeholders de um sistema (não só quem paga).
- [ ] Consigo escrever uma persona específica e útil.
- [ ] Mapeio uma jornada do usuário e uso os atritos para achar requisitos.
- [ ] Aplico o "por quê" para separar necessidade de solução.

---

## ✏️ Exercícios

**1.** Um cliente diz: "quero um botão de exportar para Excel na tela de pedidos". Aplique o "por quê" para descobrir a possível necessidade real por trás desse pedido.

**2.** Liste os stakeholders de um app de **transporte por aplicativo** (tipo Uber) e aponte uma necessidade diferente de cada um.

**3.** Escreva uma **persona** curta para um usuário de um app de estudos para concursos, incluindo objetivo, contexto e uma frustração — e diga um requisito que ela revela.

**4.** Explique por que **observar** um usuário pode revelar requisitos que uma entrevista não revela. Dê um exemplo.

**5. (Reflexão)** Ao mapear a jornada "cadastrar um restaurante na SaborExpress", que pontos de atrito você imaginaria, e que requisitos cada um deles poderia gerar?

---

## 💬 Respostas comentadas

**1.** Perguntando "por quê": *por que exportar para Excel?* → "para somar as vendas do dia" → *por quê somar assim?* → "porque preciso conferir o faturamento e não confio nos números da tela" → *por quê não confia?* A necessidade real pode ser **um relatório de faturamento confiável dentro do próprio sistema** (com totais claros e conferíveis), e não literalmente um arquivo Excel. Talvez a solução certa seja um painel de vendas — o Excel era só o meio que ele conhecia.

**2.** **Passageiro** — chegar rápido e barato, com segurança. **Motorista** — receber corridas próximas e ganhar bem, sem espera. **Empresa/plataforma** — lucrar com a comissão e manter os dois lados ativos. **Órgão regulador/cidade** — segurança, impostos e trânsito. Cada um puxa o produto para um lado; ignorar qualquer um gera problemas (ex.: esquecer o motorista faz faltar oferta).

**3.** Exemplo: *"Rafael, 24 anos — o concurseiro dedicado. Contexto: estuda 4h por dia depois do trabalho, no celular e no notebook. Objetivo: cobrir todo o edital sem perder tópicos. Frustração: se perde no que já estudou e no que falta."* → **Requisito revelado:** um painel de progresso por tópico do edital, sincronizado entre celular e notebook.

**4.** Porque as pessoas **automatizam** o que fazem com frequência e não conseguem descrever esses passos — ou relatam uma versão idealizada ("eu sempre confiro tudo") diferente do real. Observar mostra os "jeitinhos", os atalhos e as travas verdadeiras. Exemplo: observar o atendente do restaurante no pico revelou que ele **não olha a tela** e precisa de um som alto + botão gigante — algo que ele jamais teria dito numa entrevista, porque nem percebe que faz assim.

**5.** Pontos de atrito prováveis e requisitos: (a) **cadastro longo do cardápio** item por item → requisito de importar cardápio por planilha/foto; (b) **dúvida sobre comissão e repasse** → requisito de mostrar claramente taxas e prazos de pagamento; (c) **medo de errar horário de funcionamento** → requisito de edição fácil de horários; (d) **não saber se o cadastro foi aprovado** → requisito de status do cadastro e notificação; (e) **fotos dos pratos ruins** → requisito de orientação/validação de imagem. Cada frustração na jornada de cadastro aponta uma funcionalidade que aumenta a adesão dos restaurantes.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[46-O-que-sao-requisitos]] — o que é um requisito (funcional, não funcional, regra de negócio).
- **Próximo (linear):** [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]] — como **escrever** os requisitos que você descobriu.
- **Aplicação:** [[49-MVP-priorizacao-e-validacao]] — como priorizar o que descobriu; e [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]] — a pesquisa com usuários no lado do design.
- **Ferramenta relacionada:** [[53-Figma-wireframes-prototipos-e-Design-System]] — protótipos como técnica de elicitação (o cliente reage ao concreto).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 13 → **Capítulo 47 de 119**.
