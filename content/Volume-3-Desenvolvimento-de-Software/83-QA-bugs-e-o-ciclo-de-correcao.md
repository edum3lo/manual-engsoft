---
title: '83 - QA, bugs e o ciclo de correção'
---

# Capítulo 83 — QA, bugs e o ciclo de correção

> **Volume 3 — Desenvolvimento de Software** · Módulo 24 — Testes e Qualidade
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o papel do **QA (Quality Assurance)** e como ele evoluiu além de "testar no fim".
- Compreender o **ciclo de vida de um bug**: do relato à correção verificada.
- Escrever um **bom relatório de bug** (passos, esperado vs. obtido, ambiente).
- Entender **severidade vs. prioridade** e como bugs são triados.
- Ver como testes, QA e correção formam o sistema de **qualidade** — e fechar o Volume 3.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] e [[82-TDD-e-testes-automatizados]].
- Ajuda ter lido [[64-Pull-Requests-code-review-e-issues]] (issues, o fluxo de trabalho) e [[43-Scrum-na-pratica]].

---

## 📖 Introdução

Você automatizou testes ([[82-TDD-e-testes-automatizados]]) e montou uma pirâmide de qualidade ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]). Mas, como Dijkstra nos lembrou, *"testes mostram a presença de bugs, nunca a sua ausência"*. Por mais testes que você escreva, **bugs vão escapar** para produção — é uma certeza da engenharia de software, não uma falha moral. A pergunta madura não é "como ter zero bugs?" (impossível), mas "quando um bug aparecer, **como lidamos com ele bem**?". Este capítulo, que fecha o Volume 3, é sobre isso: o papel do **QA (Quality Assurance)** e o **ciclo de vida de um bug**, do relato à correção verificada.

Primeiro, um ajuste de mentalidade sobre **QA**. A imagem antiga é a de um "testador" que, no fim do desenvolvimento, clica nas telas procurando defeitos, num papel quase adversarial ("caçador de erros dos devs"). O QA moderno é outra coisa: um **engenheiro de qualidade** que se preocupa com a qualidade do **produto e do processo** o tempo todo — automatizando testes, fazendo **testes exploratórios** (usar o sistema de formas criativas que os testes automatizados não preveem), cuidando de critérios de aceitação, e prevenindo bugs, não só encontrando-os. Qualidade deixou de ser "uma etapa" e virou responsabilidade **de todos**, com o QA como especialista que a orquestra.

Segundo, o **ciclo do bug**. Quando um defeito aparece, ele percorre uma jornada: alguém o **relata** (idealmente com um bom relatório — passos para reproduzir, o que era esperado, o que aconteceu), ele é **triado** (é bug mesmo? qual a severidade e a prioridade?), **reproduzido** pelo dev, **corrigido** (com um teste que trava aquele bug para ele nunca voltar — a conexão direta com [[82-TDD-e-testes-automatizados]]), **verificado** pelo QA, e **fechado**. Entender esse ciclo, e saber escrever um relatório de bug que **não faça o dev perder uma tarde adivinhando**, é uma habilidade prática que você usará na primeira semana de qualquer emprego. Ao final, você verá como testes + QA + correção formam o sistema de **qualidade** que sustenta tudo que você construiu no Volume 3 — e estará pronto para o Volume 4, onde esse software vai para produção.

---

## 🧠 Analogia

Pense na **qualidade de um restaurante** — que combina tudo que vimos e fecha o ciclo da SaborExpress.

Um bom restaurante não garante qualidade **só** provando o prato no fim, na saída da cozinha. A qualidade é cuidada em **camadas**: o cozinheiro que **prova enquanto cozinha** (os testes automatizados do dev — [[82-TDD-e-testes-automatizados]]), o **chef de qualidade** que estabelece padrões e faz inspeções criativas ("e se o cliente for alérgico? e se pedir sem cebola?" — o **QA** e seus testes exploratórios), e ainda assim, às vezes, um prato sai errado e **o cliente reclama** (o **bug em produção**). Nenhum restaurante sério promete "nunca errar um prato" — o que separa os bons dos ruins é **como lidam com a reclamação**.

E é aqui que mora a lição do **ciclo do bug**. Quando um cliente reclama, um restaurante amador entra em pânico ou ignora. Um restaurante profissional tem um **processo**: o garçom **anota exatamente** o que houve ("o cliente da mesa 5 disse que o risoto veio salgado demais, ele pediu sem sal por pressão alta" — um bom **relatório de bug**: o que esperava, o que veio, em que condições); o chef **avalia a gravidade** (um cabelo no prato é urgente; um prato levemente frio, menos — **severidade e prioridade**); a cozinha **refaz o prato certo** e, o mais importante, **ajusta a receita ou o processo** para aquele erro **não se repetir** (o dev corrige o bug **e escreve um teste** que o trava para sempre); e o garçom **confirma** com o cliente que agora está bom (o **QA verifica** a correção).

Um restaurante que só refaz o prato mas nunca corrige a receita comete o **mesmo** erro toda semana. O que aprende com cada reclamação — transformando-a numa melhoria permanente — só melhora. Guarde: qualidade não é nunca errar; é ter um **processo** que prova enquanto cozinha, inspeciona com cuidado, e transforma cada erro numa correção que **não volta**.

---

## 🧩 Conceitos fundamentais

### 1. O que é QA (e o que não é)

**QA (Quality Assurance, garantia de qualidade)** é a disciplina de assegurar a qualidade do software — do **produto** e do **processo**. O QA moderno **não** é só "testar no fim": é automatizar testes, fazer testes exploratórios, definir critérios de aceitação ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]), e **prevenir** defeitos. Qualidade é responsabilidade de todo o time; o QA é o especialista que a orquestra.

> **Termo explicado — QA (Quality Assurance):** garantia de qualidade; a prática (e o profissional) que zela pela qualidade do produto e do processo, prevenindo e detectando defeitos — não apenas "testando no fim".

### 2. Teste exploratório

Além dos testes automatizados (que verificam o **previsto**), o QA faz **testes exploratórios**: usar o sistema de formas **criativas e não roteirizadas**, tentando "quebrá-lo" como um usuário imprevisível faria (campos com emojis, cliques rápidos, voltar o navegador no meio de um pagamento). Encontra o que os testes automatizados, por definição, não anteciparam.

> **Termo explicado — teste exploratório:** testar manualmente de forma criativa e não roteirizada, explorando o sistema para descobrir problemas que testes automatizados não previram.

### 3. O ciclo de vida de um bug

Um bug percorre estados, como uma issue ([[64-Pull-Requests-code-review-e-issues]]):
**Relatado → Triado → (Aceito/Rejeitado) → Em correção → Corrigido → Em verificação → Fechado** (ou Reaberto, se a correção falhou). Cada bug vira uma **issue** rastreável, com histórico. Entender esse fluxo evita bugs "perdidos" ou "resolvidos" sem verificação.

> **Termo explicado — ciclo de vida do bug:** a jornada de um defeito por estados rastreáveis, do relato à correção verificada e fechamento (com possível reabertura).

### 4. Um bom relatório de bug

Um relatório útil poupa horas do dev. Deve conter:
- **Título** claro e específico ("Botão 'Finalizar' não responde no carrinho acima de R$50").
- **Passos para reproduzir** (numerados, exatos).
- **Resultado esperado** vs. **resultado obtido**.
- **Ambiente** (navegador, dispositivo, versão do app).
- **Evidências** (print, vídeo, logs).

> **Termo explicado — passos para reproduzir:** a sequência exata de ações que faz o bug acontecer; o item mais valioso de um relatório, pois um bug que o dev não consegue reproduzir é quase impossível de corrigir.

### 5. Severidade vs. prioridade

Dois eixos diferentes, frequentemente confundidos:
- **Severidade:** o **impacto técnico** do bug (um crash total é alta severidade; um texto desalinhado é baixa).
- **Prioridade:** a **urgência de corrigir** (quão rápido, do ponto de vista do negócio).

Eles nem sempre andam juntos: um erro de digitação no **logo da empresa** é baixa severidade mas alta prioridade; um crash numa tela que ninguém usa é alta severidade mas baixa prioridade. A **triagem** classifica ambos para decidir o que corrigir primeiro.

> **Termo explicado — severidade vs. prioridade:** severidade = o quanto o bug estraga tecnicamente; prioridade = o quão urgente é corrigi-lo para o negócio. São eixos independentes.

### 6. Regressão e o teste que trava o bug

A melhor prática ao corrigir um bug: **escrever um teste que reproduz o bug** ([[82-TDD-e-testes-automatizados]]) — ele falha (mostrando o bug), você corrige até ele passar, e esse teste **fica para sempre**, garantindo que aquele bug **nunca volte** (vira um **teste de regressão** — [[81-Por-que-testar-tipos-de-teste-e-a-piramide]]). Corrigir sem esse teste convida o bug a reaparecer.

---

## ⚙️ Como funciona na prática

Como um bug é tratado, do relato ao fechamento, num time real:

**O relato (onde tudo começa).** Um bug é notado — por um usuário, pelo suporte, pelo QA em teste exploratório, ou por **monitoramento** em produção (ferramentas como Sentry que capturam erros automaticamente — Volume 4). Vira uma **issue** ([[64-Pull-Requests-code-review-e-issues]]) com um bom relatório. A regra de ouro: **se o dev não consegue reproduzir, não consegue corrigir**. Um relatório vago ("não funciona") gera uma tarde de adivinhação; um relatório com passos exatos, esperado vs. obtido e ambiente, encaminha a correção em minutos.

**A triagem.** Alguém (tech lead, PO, QA) faz a **triagem**: confirma se é bug mesmo (às vezes é comportamento esperado mal-entendido, ou duplicata), define **severidade** e **prioridade**, e decide o destino — corrigir agora (bug crítico em produção vira **hotfix** urgente), no próximo sprint ([[43-Scrum-na-pratica]]), ou "backlog" (bugs menores). Nem todo bug é corrigido de imediato; priorizar é parte do jogo.

**A reprodução e a investigação.** O dev **reproduz** o bug (por isso os passos são ouro), depois **investiga a causa-raiz** — não só o sintoma. Um bug pode ter uma causa surpreendentemente distante do sintoma (a tela trava, mas a causa é uma query lenta no banco — [[71-Confiabilidade-e-escala-do-banco]]). Ferramentas: logs, debugger, os próprios testes. Corrigir o sintoma sem a causa faz o bug voltar disfarçado.

**A correção com teste de regressão.** O dev escreve um **teste que reproduz o bug** ([[82-TDD-e-testes-automatizados]]) — que primeiro **falha** —, corrige o código até ele **passar**, e abre um **Pull Request** ([[64-Pull-Requests-code-review-e-issues]]) com a correção **e** o teste. O code review confere, a CI roda toda a suíte ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]), e a correção é mesclada. O teste novo garante que aquele bug específico **nunca mais** volte despercebido.

**A verificação e o fechamento.** Corrigido **não** significa fechado. O **QA verifica** a correção (idealmente no ambiente de teste, refazendo os passos originais) e confirma que o bug sumiu **sem** criar outros. Só então a issue é **fechada**. Pular a verificação é como devolver o prato sem o cliente provar — arriscado. Se a correção falhou, a issue é **reaberta**.

**A prevenção (fechar o ciclo de verdade).** O nível mais maduro: após corrigir, o time pergunta **"por que esse bug aconteceu, e como evitar a classe inteira dele?"**. Talvez falte um teste de integração, uma validação, ou o processo tenha uma lacuna. Bugs recorrentes ou graves geram **retrospectivas** ([[43-Scrum-na-pratica]]) e melhorias de processo. Assim, cada bug torna o sistema e o time **melhores** — o oposto de refazer o prato sem corrigir a receita.

---

## 🍔 Aplicação na SaborExpress

Vamos seguir um bug real da SaborExpress do relato ao fechamento — e ver o sistema de qualidade completo em ação, encerrando a jornada do Volume 3.

**O bug aparece.** Uma cliente, a persona Marta (usuária mais velha e casual — [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]), liga para o suporte: "o botão de finalizar não faz nada". O suporte poderia registrar só isso — inútil. Mas, treinado, coletou detalhes e a QA **Bia** transformou num **bom relatório de bug** (issue #412):
- **Título:** "Botão 'Finalizar pedido' não responde quando o carrinho passa de R$50".
- **Passos:** 1) adicionar itens somando mais de R$50; 2) ir ao carrinho; 3) tocar "Finalizar".
- **Esperado:** ir para a tela de pagamento. **Obtido:** nada acontece, botão fica "carregando" para sempre.
- **Ambiente:** Android, app v2.3, testado em dois aparelhos.
- **Evidência:** vídeo da tela.

**A triagem.** No refinamento, o time triou #412: era bug real, **severidade alta** (impede a compra — o coração do negócio) e **prioridade máxima** (perda de receita **agora**). Virou **hotfix** urgente ([[43-Scrum-na-pratica]]), à frente de outras tarefas. Um bug de "texto desalinhado no rodapé", relatado no mesmo dia, ficou como baixa severidade e baixa prioridade — a comparação deixou claro o porquê dos dois eixos.

**A investigação (causa-raiz, não sintoma).** A back-end **Camila** **reproduziu** o bug graças aos passos exatos — só acontecia **acima de R$50**. A pista era de ouro: era a **regra do frete grátis**! Investigando ([[80-Construindo-a-API-da-SaborExpress]]), achou a causa-raiz: uma mudança recente na função `calcularTotal` (a dos cupons — [[82-TDD-e-testes-automatizados]]) tinha introduzido um erro que, quando o frete zerava, gerava um total malformado, e a API respondia um erro que o front não tratava — deixando o botão travado ([[78-Ligando-front-end-a-experiencia-do-usuario]]). Um bug com sintoma no **front** e causa no **back**: reforço de que pensar em fluxo de ponta a ponta ([[80-Construindo-a-API-da-SaborExpress]]) é essencial para diagnosticar.

**A correção que trava o bug para sempre.** Aqui a disciplina do módulo se fecha. Camila **primeiro escreveu um teste** que reproduzia o bug — "carrinho de R$52 → `calcularTotal` deve devolver R$52 válido" — que **falhou** (provando o bug). Só então corrigiu a função até o teste **passar** ([[82-TDD-e-testes-automatizados]]). Percebeu que esse era **exatamente** o caso-limite dos R$50 que o TDD original tinha coberto, mas que a mudança dos cupons quebrou — uma **regressão** clássica ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]). Diego, no front, adicionou o tratamento do estado de erro que faltava, para o botão nunca mais travar sem feedback ([[78-Ligando-front-end-a-experiencia-do-usuario]]). Abriram um PR ([[64-Pull-Requests-code-review-e-issues]]) com a correção **e** os testes; a CI rodou tudo verde; mesclaram.

**A verificação e o fechamento.** Bia **verificou** no ambiente de teste: refez os passos originais do relatório, confirmou que o pedido acima de R$50 agora finaliza, e testou também **abaixo** de R$50 e **exatamente** R$50 (para garantir que a correção não quebrou outros casos). Tudo certo → issue #412 **fechada**. O hotfix foi para produção, e Marta pôde finalizar seus pedidos.

**A prevenção (o ciclo completo).** Na retrospectiva ([[43-Scrum-na-pratica]]), o time perguntou "como uma regressão nessa regra crítica passou?". Descobriram que a mudança dos cupons **não** tinha rodado os testes de fronteira por um deslize de CI. Melhoraram o processo: nenhum PR que toca `calcularTotal` passa sem os testes de fronteira. Assim, o bug #412 não só foi corrigido — tornou o time e o sistema **melhores**, e sua classe inteira ficou barrada para o futuro.

Moral: o bug #412 mostra o sistema de qualidade completo — um bom **relatório** que permitiu reproduzir, uma **triagem** por severidade/prioridade que o pôs à frente, uma investigação de **causa-raiz** que atravessou front e back, uma **correção com teste de regressão** que o trava para sempre, uma **verificação** do QA, e uma **prevenção** que barra a classe inteira. Qualidade não foi "não ter o bug"; foi ter um **processo** que transformou o bug numa melhoria permanente.

---

## 🏢 Como isso acontece em uma empresa

- **Bugs em produção são normais, não vergonha.** Todo software sério tem bugs. A maturidade de uma empresa se vê em **como responde** — a velocidade e a qualidade do ciclo de correção —, não na ilusão de "zero bugs".
- **QA é engenharia, não "clicar telas".** O QA moderno automatiza, faz testes exploratórios, cuida de processo e previne defeitos. É uma carreira técnica valorizada, muitas vezes com QA Engineers que programam.
- **Um bom relatório de bug economiza fortunas.** Times treinam suporte e usuários internos a relatar bem (passos, esperado vs. obtido, ambiente). Bugs irreproduzíveis são o pesadelo — muitos são fechados como "não reproduzível" e voltam a incomodar.
- **Severidade e prioridade guiam o backlog.** A triagem constante decide o que corrigir agora (hotfix), no sprint, ou nunca. Nem todo bug vale o custo de corrigir — priorizar é gestão de valor ([[49-MVP-priorizacao-e-validacao]]).
- **Todo bug corrigido vira um teste de regressão.** É prática padrão: a correção **inclui** um teste que trava o bug. Suítes de teste crescem, em boa parte, a partir de bugs passados ([[82-TDD-e-testes-automatizados]]).
- **Monitoramento em produção fecha o ciclo.** Ferramentas de observabilidade (Sentry, logs, métricas) detectam bugs **antes** dos usuários reclamarem — assunto do Volume 4. O ciclo de qualidade se estende até a produção.
- **Post-mortems sem culpa.** Bugs graves geram análises "blameless" (sem culpar pessoas) focadas em **melhorar o sistema e o processo**, não em achar um culpado — a cultura que faz times aprenderem com falhas ([[43-Scrum-na-pratica]]).

---

## ⚠️ Erros comuns

- **Achar que dá para ter "zero bugs".** Perseguir o impossível gera frustração e paralisia. O objetivo é um bom **processo** de qualidade e correção, não a perfeição.
- **Relatório de bug ruim.** "Não funciona", sem passos, ambiente ou evidência. Gera horas de adivinhação e bugs fechados como "não reproduzível".
- **Confundir severidade com prioridade.** Tratar todo bug de alta severidade como urgente (ou ignorar um bug "pequeno" de alta prioridade, como um erro no preço exibido). São eixos diferentes.
- **Corrigir o sintoma, não a causa-raiz.** Um "band-aid" que faz o sintoma sumir mas deixa a causa — o bug volta disfarçado. Investigue a fundo.
- **Corrigir sem escrever o teste de regressão.** A correção sem teste convida o bug a reaparecer na próxima mudança. Todo bug corrigido merece um teste que o trave ([[82-TDD-e-testes-automatizados]]).
- **Fechar o bug sem verificação.** "Corrigi" não é "resolvido". Sem o QA (ou alguém) verificar, você arrisca dar por resolvido algo que ainda quebra.
- **Tratar o QA como adversário ou etapa final.** A cultura "dev vs. QA" e "qualidade é problema do QA no fim" gera atrito e bugs. Qualidade é de **todos**, o tempo todo.
- **Não aprender com os bugs.** Corrigir sem perguntar "como evitar a classe inteira disso?". Perde-se a chance de melhorar processo e prevenir os próximos.

---

## 💡 Dicas profissionais

- **Escreva relatórios de bug impecáveis.** Título específico, passos exatos, esperado vs. obtido, ambiente, evidência. É uma das habilidades mais úteis (e subestimadas) da sua primeira semana de trabalho.
- **Sempre busque a causa-raiz.** Não conserte só o sintoma. Pergunte "por quê?" até chegar à origem — muitas vezes noutra camada ([[80-Construindo-a-API-da-SaborExpress]]).
- **Todo bug corrigido ganha um teste.** Reproduza o bug num teste que falha, corrija até passar. Ele vira um guardião permanente contra a regressão ([[82-TDD-e-testes-automatizados]]).
- **Separe severidade de prioridade.** Avalie impacto técnico e urgência de negócio como eixos distintos ao triar.
- **Verifique antes de fechar.** "Corrigido" ≠ "fechado". Confirme, refazendo os passos originais, que o bug sumiu e nada novo quebrou.
- **Trate o QA como parceiro.** Trabalhe junto, cedo. Qualidade é responsabilidade de todos; o QA é seu aliado, não um obstáculo.
- **Aprenda com cada bug.** Após corrigir, pergunte como prevenir a classe inteira. Bugs são feedback valioso sobre o sistema e o processo.
- **Aceite que bugs acontecem.** Foque em detectá-los cedo, corrigi-los bem e evitá-los da próxima vez — não em uma perfeição inalcançável.

---

## 🎈 Curiosidades

- O termo **"bug"** para um defeito de computador foi popularizado em **1947**, quando operadores do computador Harvard Mark II encontraram uma **mariposa** presa num relé, causando falha. Grace Hopper colou o inseto no diário de bordo com a nota "primeiro caso real de um *bug* encontrado". O inseto está preservado até hoje num museu — embora o termo "bug" para falhas em máquinas já existisse desde a época de Thomas Edison.
- A distinção **severidade vs. prioridade** gera confusão até entre profissionais. O exemplo clássico usado para ensiná-la: um erro de ortografia no **nome da própria empresa** na tela inicial é **baixíssima severidade** (nada quebra tecnicamente) mas **altíssima prioridade** (é vergonhoso e precisa sumir **já**) — mostrando que os dois eixos são mesmo independentes.
- Existe uma "lei" folclórica da testagem chamada **regra do 10x**: um bug custa cerca de **10 vezes mais** para corrigir a cada fase em que passa despercebido — barato se pego no design, caro se pego no desenvolvimento, caríssimo se só descoberto em produção pelo cliente. É a justificativa econômica para testar e revisar cedo.
- A cultura de **"blameless post-mortem"** (análise de falhas sem culpar pessoas) foi consolidada por empresas como a **Etsy** e o **Google**, com a percepção contraintuitiva de que **punir quem erra faz as pessoas esconderem erros**, piorando a qualidade — enquanto uma cultura segura, focada em consertar o **sistema**, faz a organização aprender e melhorar.
- Muitos dos bugs mais caros e famosos da história — a explosão do foguete **Ariane 5** (1996), a falha da sonda **Mars Climate Orbiter** (1999, por confusão entre unidades métricas e imperiais) — não foram erros de "programação difícil", mas falhas de **integração, validação e processo** — exatamente o que testes e QA existem para pegar.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **QA (Quality Assurance)** | Garantia da qualidade do produto e do processo; previne e detecta defeitos. |
| **Teste exploratório** | Testar de forma criativa e não roteirizada para achar o imprevisto. |
| **Bug** | Um defeito: o software se comporta diferente do esperado. |
| **Ciclo de vida do bug** | A jornada do defeito: relatado → triado → corrigido → verificado → fechado. |
| **Relatório de bug** | Descrição do defeito com passos, esperado vs. obtido, ambiente, evidência. |
| **Passos para reproduzir** | A sequência exata que faz o bug acontecer (o item mais valioso). |
| **Severidade** | O impacto técnico do bug (crash = alta; cosmético = baixa). |
| **Prioridade** | A urgência de corrigir, do ponto de vista do negócio. |
| **Triagem** | Classificar bugs (é bug? severidade/prioridade? quando corrigir?). |
| **Causa-raiz** | A origem real do bug, muitas vezes distante do sintoma. |
| **Teste de regressão** | Teste que trava um bug corrigido para ele nunca mais voltar. |
| **Hotfix** | Correção urgente de um bug crítico, fora do fluxo normal. |

---

## 📝 Resumo

- Por mais testes que existam, **bugs escapam** para produção — é uma certeza ("testes mostram a presença de bugs, nunca a ausência"). A pergunta madura não é "como ter zero bugs?", mas "como **lidar bem** com eles quando surgem?".
- O **QA moderno** é engenharia de qualidade — automatiza testes, faz **testes exploratórios**, cuida de processo e **previne** defeitos —, não um "testador no fim". Qualidade é responsabilidade de **todos**, com o QA como especialista que a orquestra.
- O **ciclo de vida do bug**: **relatado** (com um bom relatório — passos, esperado vs. obtido, ambiente, evidência) → **triado** (severidade × prioridade, dois eixos independentes) → investigado até a **causa-raiz** → **corrigido com um teste de regressão** que o trava para sempre → **verificado** pelo QA → **fechado**.
- Um **bom relatório de bug** é uma habilidade prática essencial: sem passos para reproduzir, o dev não corrige. E toda correção deve incluir um **teste** que reproduz o bug ([[82-TDD-e-testes-automatizados]]), transformando cada defeito num guardião contra regressões ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).
- O nível mais maduro é a **prevenção**: perguntar "como evitar a classe inteira desse bug?" e melhorar o processo — fazendo cada bug tornar o time e o sistema melhores. Testes + QA + correção formam o **sistema de qualidade** que sustenta tudo o que o Volume 3 construiu. Agora, no Volume 4, esse software vai para produção.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o papel do QA moderno e como ele vai além de "testar no fim".
- [ ] Descrevo o ciclo de vida de um bug, do relato ao fechamento.
- [ ] Escrevo um bom relatório de bug (passos, esperado vs. obtido, ambiente).
- [ ] Diferencio severidade de prioridade com exemplos.
- [ ] Sei que toda correção deve incluir um teste de regressão.
- [ ] Entendo a importância de buscar a causa-raiz e de prevenir a classe do bug.

---

## ✏️ Exercícios

**1.** Com a analogia do restaurante, explique por que "qualidade não é nunca errar, mas ter um processo que transforma cada erro numa correção que não volta".

**2.** Escreva um bom **relatório de bug** para a seguinte situação: ao tentar aplicar um cupom de desconto no carrinho, o app trava. Invente os detalhes plausíveis e inclua todos os itens de um bom relatório.

**3.** Diferencie **severidade** de **prioridade** e dê um exemplo de um bug de **baixa severidade mas alta prioridade**.

**4.** Por que, ao corrigir um bug, a boa prática é **primeiro escrever um teste que reproduz o bug**? O que isso garante para o futuro?

**5. (Reflexão)** No caso do bug #412 da SaborExpress, o ciclo não terminou na correção — houve uma etapa de **prevenção** na retrospectiva. Explique o que foi feito e por que essa etapa é o que distingue um time que "apaga incêndios" de um que "melhora de verdade".

---

## 💬 Respostas comentadas

**1.** Um bom restaurante não garante qualidade só provando o prato no fim: cuida dela em camadas — o cozinheiro prova enquanto cozinha (testes automatizados do dev), o chef de qualidade inspeciona com critérios criativos (o QA e os testes exploratórios) — e, ainda assim, às vezes um prato sai errado e o cliente reclama (um bug em produção). Nenhum restaurante sério promete "nunca errar um prato", porque isso é impossível; o que separa os bons dos ruins é o **processo** diante da reclamação: anotar exatamente o que houve (bom relatório de bug), avaliar a gravidade (severidade/prioridade), refazer o prato certo e — crucial — **ajustar a receita ou o processo para o erro não se repetir** (corrigir o bug **e** escrever um teste de regressão que o trava), confirmando com o cliente que agora está bom (verificação do QA). Um restaurante que só refaz o prato mas nunca corrige a receita erra igual toda semana; o que **aprende** com cada reclamação melhora sempre. Por isso qualidade não é a perfeição de nunca errar — é ter um processo que prova enquanto cozinha, inspeciona com cuidado e transforma cada erro numa correção permanente.

**2.** Exemplo de bom relatório:
- **Título:** "App trava ao aplicar cupom de desconto no carrinho".
- **Passos para reproduzir:** 1) adicionar itens ao carrinho; 2) ir ao carrinho; 3) inserir o cupom "PROMO10" no campo de desconto; 4) tocar "Aplicar".
- **Resultado esperado:** o desconto de 10% é aplicado e o total é recalculado.
- **Resultado obtido:** o app congela por alguns segundos e fecha sozinho (crash).
- **Ambiente:** iPhone 12, iOS 17, app SaborExpress v2.4.
- **Evidência:** vídeo da tela anexado; log de erro do Sentry (id #A1B2).
- **Frequência:** acontece toda vez (100% reproduzível), com qualquer cupom válido.
Esse relatório permite ao dev reproduzir e corrigir rápido, porque tem passos exatos, o contraste esperado vs. obtido, o ambiente e evidências — em vez de "o cupom não funciona", que geraria uma tarde de adivinhação.

**3.** **Severidade** é o **impacto técnico** do bug — o quanto ele estraga o funcionamento (um crash total ou perda de dados = alta severidade; um texto levemente desalinhado = baixa). **Prioridade** é a **urgência de corrigir** do ponto de vista do **negócio** — quão rápido precisa ser resolvido. São eixos **independentes**. Um exemplo de **baixa severidade mas alta prioridade**: um **erro de digitação no nome da empresa** (ou no preço exibido) na tela inicial — tecnicamente **nada quebra** (o app funciona perfeitamente, logo baixa severidade), mas é **vergonhoso / prejudicial à imagem ou enganoso** e precisa ser corrigido **imediatamente** (alta prioridade). O inverso também existe: um crash numa tela obscura que quase ninguém acessa é alta severidade, mas baixa prioridade.

**4.** Porque escrever **primeiro** um teste que reproduz o bug garante que você (a) **realmente entendeu e consegue reproduzir** o bug — o teste falhando é a prova concreta de que o defeito existe e de que você o isolou; e (b) tem um critério **objetivo** de que a correção funcionou — quando o teste passar, o bug está resolvido de fato, não "parece resolvido". Para o **futuro**, esse teste **fica permanentemente** na suíte como um **teste de regressão**: se qualquer mudança posterior no código reintroduzir aquele bug, o teste **falha na hora** (na CI), impedindo que ele volte despercebido para produção. Assim, cada bug corrigido deixa de ser um problema pontual e vira um **guardião permanente** contra a sua própria reincidência — a suíte de testes cresce, em boa parte, exatamente a partir dos bugs do passado.

**5.** Na retrospectiva do bug #412, o time não parou na correção: perguntou **"como uma regressão numa regra crítica passou?"** e descobriu que a mudança dos cupons não havia rodado os testes de fronteira por um deslize na CI. A **prevenção** foi melhorar o **processo**: nenhum PR que toca `calcularTotal` passa sem rodar os testes de fronteira — barrando não só aquele bug, mas a **classe inteira** de regressões naquela regra. Essa etapa distingue um time que "apaga incêndios" de um que "melhora de verdade" porque o time que só corrige o bug pontual estará vulnerável ao **próximo** bug da mesma natureza — vive apagando incêndios repetidos, tratando sintomas. Já o time que pergunta "por que isso aconteceu e como evitar a classe toda?" transforma cada bug num **aprendizado que fortalece o sistema e o processo**, reduzindo a probabilidade de famílias inteiras de defeitos no futuro. É a diferença entre reagir e evoluir: cada incidente deixa o time e o produto mais robustos, em vez de apenas voltar ao estado anterior.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[82-TDD-e-testes-automatizados]] — os testes que, ao corrigir um bug, o travam para sempre.
- **Base do módulo:** [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] (a rede que os bugs escapam) e [[64-Pull-Requests-code-review-e-issues]] (issues e o fluxo de correção).
- **Diagnóstico:** [[80-Construindo-a-API-da-SaborExpress]] — pensar em fluxo de ponta a ponta para achar a causa-raiz.
- **Adiante (Volume 4):** monitoramento e observabilidade em produção — detectar bugs antes do usuário reclamar.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 24 → **Capítulo 83 de 119**.

---

## 🏁 Fim do Volume 3 — Desenvolvimento de Software

Parabéns! Você concluiu o **Volume 3 — Desenvolvimento de Software**, os capítulos **41 a 83**. Nesta jornada, você saiu do "como se organiza um projeto" e chegou ao "como se constrói o software de verdade":

- **Processos e metodologias** (Módulo 12): modelos de desenvolvimento, o Manifesto Ágil, Scrum, Kanban e planejamento.
- **Requisitos** (Módulo 13): o que o software precisa fazer, elicitação, personas, histórias de usuário e MVP.
- **UX e design de produto** (Módulo 14): pesquisa, usabilidade, acessibilidade, Design Thinking e Figma.
- **Modelagem e arquitetura** (Módulos 15-16): UML, MVC e camadas, monólito vs. microsserviços.
- **Git, GitHub e open source** (Módulos 17-19): controle de versão, colaboração, Pull Requests e licenças.
- **Banco de dados** (Módulo 20): o modelo relacional, SQL, modelagem, NoSQL e confiabilidade.
- **APIs** (Módulo 21): HTTP, REST, JSON, autenticação, GraphQL/gRPC/WebSocket e documentação.
- **Front-end e back-end** (Módulos 22-23): a web, frameworks, o servidor, e a construção da API completa da SaborExpress.
- **Testes e qualidade** (Módulo 24): a pirâmide de testes, TDD, e o ciclo de vida de um bug.

Você acompanhou a **SaborExpress** de uma ideia até um sistema construído, testado e com qualidade — e viu como todas as peças se coordenam num todo. Mas construir é só metade da história: falta colocar esse software **no ar**, mantê-lo funcionando, observá-lo e escalá-lo.

> 🚀 **Próximo:** **Volume 4 — Operação e Escala** — onde o software sai da sua máquina e vai para produção: deploy, CI/CD, nuvem, contêineres, observabilidade, segurança e escala. É hora de ver o software **vivo, no mundo real**.

---
