---
title: '117 - Projeto Integrador (4/5): Git, PR, testes e Docker'
---

# Capítulo 117 — Projeto Integrador (4/5): Git, PR, testes e Docker

> **Volume 5 — Carreira e Projeto Integrador** · Módulo 36 — Projeto Integrador: SaborExpress do zero à produção
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Ver como o código construído é **versionado, revisado, testado e empacotado**.
- Aplicar **Git e Pull Requests** ao fluxo de trabalho do time na prática.
- Adicionar **testes automatizados** ao sistema para garantir qualidade.
- Empacotar a aplicação em **Docker** para prepará-la para produção.
- Entender como estas práticas transformam código em algo pronto para ir ao ar.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[116-API-back-end-e-front-end]] (o sistema que agora vamos versionar e empacotar).
- Ter lido [[61-Git-no-dia-a-dia]], [[64-Pull-Requests-code-review-e-issues]], [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] e [[86-Docker-e-containers]].

---

## 📖 Introdução

A SaborExpress **funciona** — as três camadas se coordenam e um cliente pode fazer um pedido de ponta a ponta ([[116-API-back-end-e-front-end]]). Mas "funciona na máquina do dev" está muito longe de "pronto para milhões de usuários em produção". Entre um e outro há um conjunto de práticas profissionais que este capítulo cobre, a quarta fase do Projeto Integrador: **versionar** o código (Git), **colaborar** com qualidade (Pull Requests e code review), **garantir** que ele funciona e continua funcionando (testes automatizados), e **empacotá-lo** de forma reproduzível (Docker). São as práticas que transformam "código que roda aqui" em "código profissional, confiável e pronto para o mundo".

Cada uma dessas práticas você estudou isoladamente; aqui elas se juntam no fluxo real do projeto. O **Git** ([[61-Git-no-dia-a-dia]]) versiona cada mudança com histórico e segurança, e permite o time trabalhar em paralelo em **branches** ([[62-Branches-merge-conflitos-e-estrategias]]). Os **Pull Requests** ([[64-Pull-Requests-code-review-e-issues]]) são como o código entra no projeto: com **revisão humana** (code review — que você viu também pela lente da colaboração — [[109-Colaboracao-humana]]) e verificação automática. Os **testes** ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]], [[82-TDD-e-testes-automatizados]]) dão a confiança de que o sistema funciona e de que mudanças futuras não vão quebrá-lo (a proteção contra regressões). E o **Docker** ([[86-Docker-e-containers]]) empacota a aplicação com todo o seu ambiente, acabando com o "funciona na minha máquina" e preparando-a para rodar idêntica em qualquer lugar.

Estas não são "burocracias" opcionais — são o que separa um projeto de estudante de um sistema profissional. Um código sem versionamento é frágil e impossível de colaborar; sem revisão, acumula problemas; sem testes, cada mudança é uma aposta assustadora; sem empacotamento reproduzível, o deploy é um pesadelo de surpresas. Juntas, essas práticas criam a **confiança** e a **repetibilidade** que permitem à SaborExpress ser entregue com frequência e segurança — a base do que vem na fase final ([[118-Deploy-cloud-producao-e-monitoramento]]). Este capítulo mostra como o código funcionando vira código **pronto para produção**, aplicando no projeto tudo o que você aprendeu sobre colaboração, qualidade e empacotamento — a penúltima etapa da jornada da ideia à produção.

---

## 🧠 Analogia

Continuando a analogia da **casa**: se a casa já está **construída e funcionando** ([[116-API-back-end-e-front-end]]), esta fase são as práticas que garantem que a obra seja **profissional, segura e certificada** — o registro da obra, a inspeção, os testes de segurança e a preparação para a mudança.

- **O registro e histórico da obra (o Git):** uma obra profissional mantém um **registro completo** de tudo que foi feito, quem fez, quando e por quê — para poder voltar atrás se algo der errado ("por que essa parede foi movida?"), e para vários profissionais trabalharem sem se atrapalhar. O **Git** é esse registro: cada mudança versionada, com histórico, permitindo desfazer com segurança e colaborar em paralelo.

- **A inspeção antes de aprovar (o Pull Request / code review):** numa obra séria, antes de uma etapa ser **aprovada e incorporada**, um **inspetor confere** o trabalho — verifica se está dentro das normas, se não há problemas, e dá o aval. É o **Pull Request com code review** ([[109-Colaboracao-humana]]): nada entra no projeto sem passar por uma revisão que garante qualidade.

- **Os testes de segurança e qualidade (os testes automatizados):** antes de a casa ser habitada, fazem-se **testes** — a pressão da água, a segurança elétrica, a estrutura aguenta o peso. E, crucialmente, esses testes são **repetidos** sempre que se mexe em algo, para garantir que uma mudança não quebrou o que já funcionava. São os **testes automatizados** ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]): a garantia de que o sistema funciona e continua funcionando a cada mudança.

- **Empacotar tudo para a mudança (o Docker):** finalmente, para **mudar** a casa "montada" para o terreno onde ela vai ficar (a produção), você a prepara de forma **padronizada e completa** — uma casa modular pré-fabricada, com tudo incluído, que funciona idêntica onde quer que seja instalada. É o **Docker** ([[86-Docker-e-containers]]): empacotar a aplicação com todo o seu ambiente numa "caixa" que roda igual em qualquer lugar, acabando com surpresas na mudança.

Guarde: esta fase são as práticas profissionais que certificam a obra para o mundo real — o **registro** (Git), a **inspeção** (Pull Request/code review), os **testes de segurança e qualidade** (testes automatizados) e o **empacotamento padronizado para a mudança** (Docker). É o que separa uma construção amadora "que fica de pé" de uma obra profissional, certificada e pronta para ser habitada com segurança.

---

## 🧩 Conceitos fundamentais

### 1. Git: versionar com histórico

O **Git** ([[61-Git-no-dia-a-dia]]) versiona o código: cada mudança vira um **commit** com histórico, permitindo **desfazer** com segurança, ver **quem** mudou **o quê** e **quando**, e — via **branches** ([[62-Branches-merge-conflitos-e-estrategias]]) — trabalhar em paralelo sem pisar no código do colega. É o "salvar" profissional, sem o qual colaborar é impossível.

> **Termo explicado — Git (versionamento):** sistema que registra cada mudança do código como um commit com histórico, permitindo desfazer, rastrear e trabalhar em paralelo via branches.

### 2. Pull Request e code review

O **Pull Request (PR)** ([[64-Pull-Requests-code-review-e-issues]]) é como o código de uma branch **entra** no projeto principal: proposta de mudança que passa por **code review** (revisão humana — [[109-Colaboracao-humana]]) e verificação automática (CI). Nada entra sem revisão — o PR é o portão de qualidade e o momento de colaboração e aprendizado.

> **Termo explicado — Pull Request (PR):** a proposta de incorporar as mudanças de uma branch ao projeto, submetida a code review e verificação automática antes de ser aceita.

### 3. Testes automatizados

Os **testes** ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) verificam automaticamente que o código funciona — e, o mais importante, que mudanças futuras **não quebram** o que já funcionava (regressões). A **pirâmide**: muitos **unitários** (regras isoladas), alguns de **integração** (camadas juntas), poucos **E2E** (o sistema inteiro). Testar dá **confiança para mudar** sem medo.

> **Termo explicado — testes automatizados:** código que verifica automaticamente se o sistema funciona e continua funcionando a cada mudança — a rede de segurança contra regressões.

### 4. A rede de segurança (confiança para mudar)

O maior valor dos testes não é "provar que funciona hoje", mas dar **confiança para mudar** amanhã ([[82-TDD-e-testes-automatizados]]): com testes rodando a cada mudança, você refatora, adiciona features e corrige bugs **sem medo**, porque um teste vermelho avisa na hora se algo quebrou. Sem testes, cada mudança é uma aposta assustadora.

> **Termo explicado — rede de segurança (dos testes):** a confiança que os testes automatizados dão para mudar o código sem medo, sabendo que quebras serão detectadas imediatamente.

### 5. Docker: empacotar para produção

O **Docker** ([[86-Docker-e-containers]]) empacota a aplicação com **todo o seu ambiente** (linguagem, dependências, configs) numa **imagem** — uma "caixa" que roda **idêntica** em qualquer lugar. Isso acaba com o "funciona na minha máquina" e prepara a app para o deploy: a mesma imagem que passou nos testes vai para produção, sem surpresas de ambiente.

> **Termo explicado — Docker (containers):** empacotar a aplicação com todo o seu ambiente numa imagem que roda idêntica em qualquer lugar, eliminando o "funciona na minha máquina" e preparando para o deploy.

### 6. A esteira que junta tudo (CI)

Estas práticas se juntam na **CI (Integração Contínua)** ([[85-CICD-a-linha-de-montagem]]): a cada PR, uma esteira automática roda os **testes**, verifica a qualidade, e empacota a app em **Docker** — bloqueando o merge se algo falha. É o que torna o processo **automático, repetível e confiável**, e a ponte para o deploy ([[118-Deploy-cloud-producao-e-monitoramento]]).

---

## ⚙️ Como funciona na prática

A quarta fase da SaborExpress, passo a passo:

**Passo 1 — Versionar tudo com Git.** Todo o código (back, front, configs) vive num repositório **Git** ([[61-Git-no-dia-a-dia]]), hospedado no GitHub ([[63-GitHub-GitLab-e-Bitbucket]]). O time trabalha em **branches** ([[62-Branches-merge-conflitos-e-estrategias]]): cada feature ou correção numa branch própria, permitindo Diego (front) e Camila (back) trabalharem em paralelo sem conflito. Commits pequenos e frequentes ([[61-Git-no-dia-a-dia]]), com mensagens claras, mantêm o histórico útil. Versionar é a base de toda colaboração.

**Passo 2 — Colaborar via Pull Requests.** Nenhum código entra na branch principal direto — tudo passa por **Pull Request** ([[64-Pull-Requests-code-review-e-issues]]). Ao terminar uma feature, o dev abre um PR; um colega faz o **code review** (construtivo — [[109-Colaboracao-humana]]: comenta o código, explica o porquê, elogia o bom), e a **CI** roda automaticamente. Só com o review aprovado e a esteira verde o PR é mesclado. Isso garante qualidade e espalha conhecimento pelo time.

**Passo 3 — Escrever os testes (a pirâmide).** O time adiciona **testes automatizados** ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) seguindo a pirâmide: **unitários** para as regras críticas (o cálculo do total e do frete grátis — [[82-TDD-e-testes-automatizados]], incluindo o caso-limite dos R$50), **de integração** para os endpoints da API contra um banco de teste ([[116-API-back-end-e-front-end]]), e poucos **E2E** para o fluxo crítico (finalizar um pedido de ponta a ponta). Os testes dão a **confiança** de que o sistema funciona — e de que mudanças futuras não vão quebrá-lo.

**Passo 4 — Empacotar em Docker.** A aplicação é **conteinerizada** ([[86-Docker-e-containers]]): um **Dockerfile** descreve o ambiente (a versão do Node, as dependências, o comando de inicialização), e o `docker build` gera uma **imagem** — a "caixa" que roda idêntica na máquina do dev, no CI e em produção. O "funciona na minha máquina" desaparece. Um novo dev sobe o ambiente inteiro (app + banco + cache) com um comando (Docker Compose — [[86-Docker-e-containers]]), em minutos.

**Passo 5 — A esteira de CI juntando tudo.** Todas essas práticas se juntam na **CI** ([[85-CICD-a-linha-de-montagem]]): a cada PR, a esteira automática **compila**, **roda os testes**, **verifica qualidade e segurança** ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]), e **empacota a imagem Docker**. Se qualquer etapa falha, o PR é **bloqueado**. Assim, código quebrado nunca entra na branch principal, e a imagem que passa na esteira está **pronta para o deploy** — a ponte para a fase final.

**O que essas práticas criam: confiança e repetibilidade.** O resultado desta fase não é só "código versionado" — é **confiança** (os testes garantem que funciona e continua funcionando; o review garante qualidade) e **repetibilidade** (a imagem Docker roda idêntica em qualquer lugar; a esteira faz o mesmo processo sempre). É isso que transforma um projeto frágil de estudante ("funciona aqui, tomara que funcione lá") num sistema profissional pronto para ir ao ar com segurança e frequência — exatamente o que a fase final ([[118-Deploy-cloud-producao-e-monitoramento]]) exige.

---

## 🍔 Aplicação na SaborExpress

Esta fase transformou o código funcional da SaborExpress em código **profissional, pronto para produção**. Vejamos as práticas aplicadas.

**Git e branches: trabalho paralelo sem caos.** Todo o código da SaborExpress vivia num repositório **Git** no GitHub ([[63-GitHub-GitLab-e-Bitbucket]]). Diego e Camila trabalhavam em **branches** separadas ([[62-Branches-merge-conflitos-e-estrategias]]) — Diego na tela de checkout, Camila no serviço de pedidos —, sem pisar no código um do outro. Commits pequenos e com boas mensagens ([[61-Git-no-dia-a-dia]]) mantinham o histórico claro, permitindo desfazer com segurança quando preciso. Sem Git, a colaboração de um time seria um caos de arquivos sobrescritos.

**PRs que garantiam qualidade e ensinavam.** Nada entrava na branch principal sem **Pull Request** ([[64-Pull-Requests-code-review-e-issues]]). Quando Camila abria um PR do serviço de pedidos, Diego (ou outro) fazia o **code review** construtivo ([[109-Colaboracao-humana]]) — e foi assim que pegaram bugs cedo e espalharam conhecimento. O PR também era onde a **CI** rodava: uma vez, a esteira ficou vermelha ao pegar a regressão do frete grátis ([[85-CICD-a-linha-de-montagem]]) — o bug #412 barrado **antes** de chegar a produção, dentro do PR.

**A pirâmide de testes da SaborExpress.** O time construiu a suíte de testes ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]): **unitários** cobrindo a regra do frete grátis (com o caso-limite dos R$50 — [[82-TDD-e-testes-automatizados]]), **de integração** testando o `POST /pedidos` contra um banco de teste ([[116-API-back-end-e-front-end]]), e poucos **E2E** cobrindo o fluxo crítico de finalizar um pedido. Esses testes deram ao time a **confiança para mudar sem medo**: quando Camila refatorou o motor de frete para suportar cupons, os testes avisaram na hora quando ela quebrou o caso-limite ([[82-TDD-e-testes-automatizados]]) — regressão pega em segundos.

**Docker acabando com o "funciona na minha máquina".** O time **conteinerizou** cada serviço ([[86-Docker-e-containers]]). Antes, o serviço rodava na máquina de Camila (Node 20) mas quebrava no servidor (Node 18); com o **Dockerfile**, o serviço e todo o ambiente viviam numa **imagem** idêntica em todo lugar. Um novo dev subia o ambiente inteiro (serviço + PostgreSQL + Redis) com um comando (Docker Compose) em **dez minutos**, não dois dias. O "funciona na minha máquina" morreu.

**A esteira de CI juntando tudo.** Todas essas práticas se juntavam na **CI** ([[85-CICD-a-linha-de-montagem]]): a cada PR, a esteira compilava, rodava os testes, escaneava segurança ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]) e empacotava a imagem Docker — bloqueando o merge se algo falhasse. A imagem que passava na esteira estava **pronta para o deploy**. Foi essa automação que transformou os deploys manuais de madrugada ([[84-O-que-e-DevOps]]) em entregas tranquilas.

**De "funciona aqui" a "pronto para o mundo".** Ao fim desta fase, a SaborExpress não só **funcionava** ([[116-API-back-end-e-front-end]]) — estava **profissionalmente pronta**: versionada (Git), com qualidade garantida (PRs, testes), e empacotada de forma reproduzível (Docker), tudo orquestrado pela CI. As práticas criaram **confiança** (funciona e continua funcionando) e **repetibilidade** (roda idêntica em qualquer lugar). Faltava só o passo final: colocar no ar ([[118-Deploy-cloud-producao-e-monitoramento]]).

Moral: esta fase transformou o código funcional da SaborExpress em código **pronto para produção** aplicando as práticas profissionais — **Git** (versionar e colaborar em paralelo), **Pull Requests** (qualidade via review + CI, que barrou o bug #412), **testes** (a pirâmide que deu confiança para mudar sem medo) e **Docker** (empacotamento reproduzível que matou o "funciona na minha máquina"). Juntas, essas práticas criaram a confiança e a repetibilidade que separam um projeto de estudante de um sistema profissional pronto para o mundo.

---

## 🏢 Como isso acontece em uma empresa

- **Git é universal e inegociável.** Todo time de software usa controle de versão (Git), e trabalhar sem ele é impensável. Dominar Git é competência básica esperada de qualquer engenheiro ([[61-Git-no-dia-a-dia]]).
- **Pull Requests são o fluxo padrão.** Praticamente todo código entra via PR com code review e CI. É o portão de qualidade e o principal momento de colaboração e aprendizado dos times ([[64-Pull-Requests-code-review-e-issues]], [[109-Colaboracao-humana]]).
- **Testes automatizados são esperados.** Times sérios exigem testes para o código novo, e a CI os roda a cada PR. "Onde estão os testes?" é pergunta padrão de code review ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).
- **Docker é o padrão de empacotamento.** Praticamente todo software de servidor moderno é entregue como imagem de container, preparado para rodar na nuvem ([[86-Docker-e-containers]], [[87-O-que-e-computacao-em-nuvem]]).
- **A CI/CD junta tudo.** A esteira que roda testes e empacota a cada PR é a espinha dorsal da entrega moderna, e o que permite deploys frequentes e seguros ([[85-CICD-a-linha-de-montagem]]).
- **Estas práticas são o "profissionalismo" da engenharia.** A diferença entre um projeto de estudante e um sistema profissional está muito nessas práticas — e demonstrá-las (um GitHub com bons commits, PRs, testes) é um diferencial no mercado ([[110-Curriculo-LinkedIn-portfolio-e-GitHub]]).
- **A confiança é o produto real.** O valor de fundo dessas práticas é a **confiança** para mudar o código rápido e com segurança — o que permite às empresas evoluírem seus produtos sem medo ([[82-TDD-e-testes-automatizados]]).

---

## ⚠️ Erros comuns

- **Não usar controle de versão (ou usar mal).** Trabalhar sem Git, ou com commits gigantes e mensagens ruins. Torna a colaboração e o histórico inúteis ([[61-Git-no-dia-a-dia]]).
- **Pular o code review.** Mesclar código direto sem revisão. Perde-se o portão de qualidade e o aprendizado do time ([[64-Pull-Requests-code-review-e-issues]]).
- **Não escrever testes (ou testar só na mão).** Deixar o código sem rede de segurança. Cada mudança vira uma aposta, e regressões chegam ao cliente ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).
- **Conviver com o build vermelho.** Deixar a esteira quebrada e ir empurrando código. O build deve parar o time até ser consertado ([[85-CICD-a-linha-de-montagem]]).
- **Não conteinerizar (deploy artesanal).** Depender de configurar o ambiente na mão em cada lugar, sofrendo com o "funciona na minha máquina" ([[86-Docker-e-containers]]).
- **Guardar estado no container.** Salvar dados que precisam persistir dentro do container efêmero. Estado vai para fora (banco) ([[86-Docker-e-containers]]).
- **Ver essas práticas como burocracia.** Achar que Git, PRs, testes e Docker "atrasam". Na verdade, criam a confiança que permite ir rápido com segurança.
- **Deixar tudo para o fim.** Adicionar testes e conteinerização só na hora do deploy. Essas práticas devem fazer parte do desenvolvimento desde o início.

---

## 💡 Dicas profissionais

- **Versione tudo com Git desde o início.** Commits pequenos e frequentes, mensagens claras, branches para trabalho paralelo. É a base de toda colaboração ([[61-Git-no-dia-a-dia]]).
- **Faça e receba PRs bem.** Code review construtivo (comente o código, explique, elogie), e receba os comentários como aprendizado ([[109-Colaboracao-humana]]).
- **Construa a pirâmide de testes.** Muitos unitários (regras críticas), alguns de integração, poucos E2E (fluxos essenciais). Priorize testar o que tem risco ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).
- **Trate os testes como rede de segurança.** O valor real é a confiança para mudar sem medo. Refatore protegido pelos testes ([[82-TDD-e-testes-automatizados]]).
- **Conteinerize a aplicação.** Empacote com Docker para rodar idêntico em todo lugar e acabar com o "funciona na minha máquina" ([[86-Docker-e-containers]]).
- **Automatize tudo na CI.** Testes, qualidade, segurança e empacotamento a cada PR. É o que torna o processo repetível e confiável ([[85-CICD-a-linha-de-montagem]]).
- **Mantenha containers stateless.** A lógica no container efêmero; o estado (dados) fora, no banco. Isso permite escalar depois ([[92-De-100-a-1-milhao-de-usuarios]]).
- **Demonstre essas práticas no seu GitHub.** Bons commits, PRs, testes e Dockerfile impressionam recrutadores — provam profissionalismo ([[110-Curriculo-LinkedIn-portfolio-e-GitHub]]).

---

## 🎈 Curiosidades

- O **Git** foi criado por **Linus Torvalds** (o mesmo do Linux) em 2005, em apenas **poucas semanas**, porque a comunidade do kernel do Linux precisava urgentemente de um sistema de versionamento distribuído após perder o acesso à ferramenta que usavam. Uma ferramenta criada às pressas para resolver um problema específico tornou-se o padrão absoluto do mundo inteiro — um lembrete de que grandes ferramentas frequentemente nascem de necessidades reais e urgentes.
- A prática de **Pull Requests** como a conhecemos foi popularizada pelo **GitHub** (fundado em 2008) e transformou não só como se colabora em código, mas o **open source** inteiro ([[66-Contribuindo-com-projetos-abertos]]): a facilidade de propor uma mudança via PR fez explodir a contribuição de milhões de desenvolvedores para projetos abertos, democratizando a colaboração de uma forma inédita.
- O conceito de "**funciona na minha máquina**" é uma piada tão universal na engenharia que virou meme, camiseta e adesivo — frequentemente acompanhado da resposta bem-humorada: "então vamos entregar a sua máquina para o cliente". O Docker resolveu isso de forma tão eficaz que a frase perdeu boa parte do seu poder — hoje a resposta é "então vamos entregar o seu **container**".
- Existe uma prática cultural chamada **"você quebrou o build, você traz os donuts"** (ou variações com bolo, café) — uma forma leve e sem culpa ([[91-Alertas-incidentes-e-plantao-on-call]]) que alguns times usam para marcar quando alguém deixa a esteira vermelha. Longe de punir, é um lembrete bem-humorado da responsabilidade coletiva de manter o build verde, reforçando que um build quebrado bloqueia todo mundo.
- A combinação de **Git + PR + CI + Docker** que este capítulo descreve é tão fundamental ao desenvolvimento moderno que virou praticamente o "kit de entrada" esperado de qualquer projeto profissional — a ponto de plataformas como o GitHub oferecerem tudo isso integrado (repositório, PRs, Actions para CI, registro de containers) num só lugar, permitindo que um desenvolvedor solo tenha, gratuitamente, a mesma infraestrutura de entrega que grandes empresas.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Git** | Sistema que versiona o código com histórico, permitindo desfazer e colaborar. |
| **Commit** | Uma mudança registrada no histórico do Git. |
| **Branch** | Uma "linha" separada de trabalho, para trabalhar em paralelo. |
| **Pull Request (PR)** | Proposta de incorporar mudanças, com review e CI. |
| **Code review** | Revisão humana do código antes de ele entrar no projeto. |
| **Testes automatizados** | Código que verifica se o sistema funciona e continua funcionando. |
| **Pirâmide de testes** | Muitos unitários, alguns de integração, poucos E2E. |
| **Docker** | Empacotar a app com seu ambiente numa imagem reproduzível. |
| **Dockerfile / imagem** | A receita / o pacote que roda idêntico em qualquer lugar. |
| **CI (Integração Contínua)** | A esteira que roda testes e empacota a cada mudança. |

---

## 📝 Resumo

- A SaborExpress **funciona** ([[116-API-back-end-e-front-end]]), mas "funciona na máquina do dev" está longe de "pronto para produção". Esta quarta fase aplica as **práticas profissionais** que fazem a ponte: **versionar** (Git), **colaborar com qualidade** (Pull Requests + code review), **garantir qualidade** (testes) e **empacotar** (Docker).
- O **Git** ([[61-Git-no-dia-a-dia]]) versiona cada mudança com histórico e permite trabalho paralelo via **branches** — a base de toda colaboração. Os **Pull Requests** ([[64-Pull-Requests-code-review-e-issues]]) são como o código entra no projeto: com **code review** ([[109-Colaboracao-humana]]) e verificação automática (CI). Nada entra sem revisão.
- Os **testes automatizados** ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) seguem a **pirâmide** (muitos unitários, alguns de integração, poucos E2E) e verificam que o sistema funciona **e continua funcionando** a cada mudança. Seu valor maior é a **rede de segurança** — a **confiança para mudar sem medo** ([[82-TDD-e-testes-automatizados]]), sabendo que quebras serão detectadas na hora.
- O **Docker** ([[86-Docker-e-containers]]) empacota a app com **todo o seu ambiente** numa **imagem** que roda **idêntica** em qualquer lugar — acabando com o "funciona na minha máquina" e preparando para o deploy. Tudo se junta na **CI** ([[85-CICD-a-linha-de-montagem]]): a cada PR, a esteira roda testes, verifica qualidade/segurança e empacota, bloqueando o merge se algo falha.
- Estas práticas **não são burocracia** — são o que separa um projeto de estudante de um sistema profissional. Juntas, criam **confiança** (funciona e continua funcionando) e **repetibilidade** (roda idêntica em qualquer lugar), transformando código funcional em código **pronto para ir ao ar com segurança e frequência**. É a penúltima etapa da jornada; falta só colocar no ar e observar ([[118-Deploy-cloud-producao-e-monitoramento]]).

---

## ☑️ Checklist de aprendizado

- [ ] Versiono o código com Git e trabalho em branches em paralelo.
- [ ] Faço e recebo Pull Requests com code review construtivo.
- [ ] Construo a pirâmide de testes (unitários, integração, E2E).
- [ ] Entendo os testes como rede de segurança (confiança para mudar).
- [ ] Empacoto a aplicação em Docker para rodar idêntico em qualquer lugar.
- [ ] Vejo como Git, PRs, testes e Docker se juntam na CI e criam confiança.

---

## ✏️ Exercícios

**1.** Com a analogia da obra (registro, inspeção, testes, empacotamento), explique Git, Pull Request, testes e Docker.

**2.** Por que "nada entra na branch principal sem Pull Request"? O que o PR garante?

**3.** Qual é o **maior valor** dos testes automatizados — provar que funciona hoje, ou algo mais? Explique.

**4.** Como o Docker acaba com o "funciona na minha máquina"? Por que isso importa para o deploy?

**5. (Reflexão)** Este capítulo diz que Git, PRs, testes e Docker "não são burocracia, mas o que separa um projeto de estudante de um sistema profissional". Explique como essas práticas criam **confiança** e **repetibilidade**, e por que isso é essencial para ir à produção.

---

## 💬 Respostas comentadas

**1.** Na analogia da obra profissional: o **Git** é o **registro e histórico da obra** — mantém um registro completo de tudo que foi feito, quem fez, quando e por quê, permitindo voltar atrás se algo der errado e vários profissionais trabalharem sem se atrapalhar (cada mudança versionada, com histórico, colaboração em paralelo via branches). O **Pull Request** é a **inspeção antes de aprovar** — antes de uma etapa ser incorporada, um inspetor confere o trabalho, verifica se está dentro das normas e dá o aval (nada entra no projeto sem passar por um code review que garante qualidade). Os **testes automatizados** são os **testes de segurança e qualidade** — antes de a casa ser habitada, testa-se a pressão da água, a segurança elétrica, se a estrutura aguenta o peso, e esses testes são **repetidos** sempre que se mexe em algo, para garantir que uma mudança não quebrou o que já funcionava (verificam que o sistema funciona e continua funcionando). O **Docker** é o **empacotamento padronizado para a mudança** — para mudar a casa montada para o terreno onde vai ficar (produção), prepara-se de forma padronizada e completa, como uma casa modular pré-fabricada com tudo incluído que funciona idêntica onde for instalada (empacotar a app com todo o ambiente numa "caixa" que roda igual em qualquer lugar). Juntas, essas práticas certificam a obra para o mundo real, separando uma construção amadora "que fica de pé" de uma obra profissional, certificada e pronta para ser habitada com segurança.

**2.** "Nada entra na branch principal sem Pull Request" porque a branch principal é o código que vai para produção e que todo o time depende — deixá-la receber mudanças **sem controle** seria arriscado e caótico. O **PR garante** duas camadas de proteção antes de qualquer código ser incorporado: **(1) Code review (revisão humana)** — um colega **revisa** a mudança antes de ela entrar, o que pega bugs cedo, garante que o código segue os padrões do time, e espalha conhecimento (o revisor aprende sobre a mudança, e o autor recebe feedback que o faz melhorar — [[109-Colaboracao-humana]]). É o portão de qualidade humano. **(2) Verificação automática (CI)** — a esteira roda automaticamente os **testes**, verifica a qualidade e a segurança, e empacota; se qualquer coisa falha (um teste quebra, revelando uma regressão), o PR é **bloqueado** e não pode ser mesclado. É o portão de qualidade automático. Juntas, essas duas verificações garantem que **código quebrado, inseguro ou de baixa qualidade nunca entre** na branch principal — protegendo a estabilidade do que vai para produção. Foi exatamente isso que barrou o bug #412 na SaborExpress: a esteira ficou vermelha ao pegar a regressão do frete grátis **dentro do PR**, antes de chegar a produção. Sem o PR obrigatório, esse bug (e muitos outros) teria entrado direto e chegado ao cliente. O PR transforma a incorporação de código de um ato arriscado e descontrolado num processo revisado e verificado.

**3.** O maior valor dos testes automatizados **não** é provar que o código funciona **hoje** — é dar **confiança para mudar** o código **amanhã**, sem medo. Provar que funciona hoje é útil, mas é o benefício menor; o benefício transformador é a **rede de segurança** que os testes criam para o **futuro**. Com uma boa suíte de testes rodando a cada mudança, quando você precisa **refatorar** (melhorar o código), **adicionar uma feature**, **corrigir um bug** ou **atualizar uma dependência**, você faz isso **sem medo** — porque se a sua mudança quebrar algo que funcionava (uma **regressão**), um teste fica **vermelho na hora** e te avisa, antes que o problema chegue ao cliente. Sem testes, cada mudança é uma **aposta assustadora**: você não sabe se, ao mexer numa parte, quebrou outra que nem imaginava, e o medo de quebrar faz o time evitar melhorar o código (deixando a dívida técnica crescer) ou mover-se devagar e com pavor. Com testes, o medo é substituído por **confiança**: você muda rápido e com segurança, porque a rede de segurança avisa se algo deu errado. Foi o que aconteceu na SaborExpress quando Camila refatorou o motor de frete para suportar cupons — os testes avisaram na hora quando ela quebrou o caso-limite dos R$50, permitindo corrigir em segundos em vez de descobrir o bug em produção. Como resume o capítulo, o valor real dos testes é a **confiança para mudar sem medo** — e é essa confiança que permite a um produto **evoluir** continuamente, em vez de "congelar" por pavor de quebrar. Provar que funciona hoje é o começo; garantir que continue funcionando a cada mudança futura é o tesouro.

**4.** O Docker acaba com o "funciona na minha máquina" porque **empacota a aplicação junto com todo o seu ambiente** — a versão exata da linguagem, todas as dependências, as configurações, tudo — numa **imagem** (uma "caixa" padronizada). O problema do "funciona na minha máquina" acontece porque o software depende de um **ambiente** para rodar, e esse ambiente costuma ser **diferente** entre a máquina do dev, o servidor de teste e a produção (uma versão diferente da linguagem, uma biblioteca que existe aqui mas não ali) — então o mesmo código se comporta diferente ou quebra em cada lugar. O Docker resolve isso fazendo o **ambiente viajar junto** com o software dentro da imagem: onde quer que a imagem rode, o software encontra **exatamente** o mesmo ambiente, porque ele está **dentro** da caixa. Assim, o "funciona na minha máquina" vira "funciona em **qualquer** máquina", porque a "máquina" (o container) é literalmente idêntica em todo lugar. Isso **importa para o deploy** porque o deploy é justamente o momento de mudar o software da máquina do dev para o servidor de produção — historicamente o ponto onde as diferenças de ambiente causavam surpresas e falhas ("funcionava no teste, quebrou em produção"). Com Docker, a **mesma imagem** que passou nos testes na CI é a que vai para produção — **sem surpresas de ambiente**, porque é o mesmo pacote idêntico. Isso torna o deploy **previsível e confiável**: você não implanta "o código e torce para o ambiente estar certo"; você implanta a caixa completa e testada que já sabe funcionar. Na SaborExpress, foi o que fez o serviço parar de quebrar entre a máquina de Camila (Node 20) e o servidor (Node 18) — a imagem Docker garantia o mesmo Node em todo lugar. Sem esse empacotamento reproduzível, o deploy seria um pesadelo de configurar ambientes na mão e caçar diferenças; com ele, o deploy vira rotina previsível.

**5.** Git, PRs, testes e Docker não são burocracia porque cada um resolve um problema real que, sem ele, tornaria o projeto frágil, arriscado e impossível de operar profissionalmente — e juntos criam duas qualidades essenciais para produção: **confiança** e **repetibilidade**. Eles criam **confiança** assim: os **testes** garantem que o sistema **funciona e continua funcionando** a cada mudança (você confia que uma alteração não quebrou algo escondido, porque um teste vermelho avisaria); o **code review** dos PRs garante que o código foi **revisado por outro humano** (você confia que ele tem qualidade e não tem problemas óbvios); e a **CI** garante que **nada quebrado entra** na branch principal (você confia que o que está lá está verificado). Essa confiança é o que permite ao time **mudar o código com frequência e sem medo** — refatorar, adicionar features, corrigir bugs — sabendo que os problemas serão detectados antes de chegar ao cliente. Eles criam **repetibilidade** assim: o **Git** garante um histórico e um processo consistentes (qualquer estado do código pode ser reproduzido, qualquer mudança rastreada e desfeita); o **Docker** garante que a aplicação roda **idêntica em qualquer lugar** (a mesma imagem na máquina do dev, no CI e em produção — sem surpresas de ambiente); e a **CI** garante que o **mesmo processo** (compilar, testar, empacotar) roda sempre da mesma forma. Essa repetibilidade é o que torna o deploy **previsível** — você não "torce" para funcionar em produção; você implanta a caixa testada que já sabe rodar. Isso é essencial para ir à produção porque produção é o **mundo real**, com usuários reais dependendo do sistema: você **não pode** ir ao ar com um código que "funciona aqui, tomara que funcione lá" (sem confiança) nem com um processo manual cheio de surpresas (sem repetibilidade) — o risco de derrubar o serviço e prejudicar usuários seria altíssimo. As práticas transformam o projeto de estudante ("funciona na minha máquina, montei tudo na mão, espero que não quebre") num sistema profissional ("funciona igual em qualquer lugar, revisado, testado, empacotado, com um processo automático e confiável") — que é exatamente o que a fase final de colocar no ar ([[118-Deploy-cloud-producao-e-monitoramento]]) exige. Sem confiança e repetibilidade, ir à produção seria uma aposta perigosa; com elas, torna-se uma rotina segura e frequente. É a diferença entre construir algo que "fica de pé" e construir algo **certificado e pronto para o mundo**.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[116-API-back-end-e-front-end]] — o sistema funcional que agora versionamos, testamos e empacotamos.
- **Próximo (linear):** [[118-Deploy-cloud-producao-e-monitoramento]] — o passo final: colocar no ar e observar.
- **Base aplicada:** [[61-Git-no-dia-a-dia]], [[64-Pull-Requests-code-review-e-issues]], [[81-Por-que-testar-tipos-de-teste-e-a-piramide]], [[82-TDD-e-testes-automatizados]] e [[86-Docker-e-containers]].
- **Junta tudo:** [[85-CICD-a-linha-de-montagem]] (a esteira) e [[109-Colaboracao-humana]] (o code review humano).

---

> 🧭 **Você está aqui:** Volume 5 → Módulo 36 → **Capítulo 117 de 119**.
