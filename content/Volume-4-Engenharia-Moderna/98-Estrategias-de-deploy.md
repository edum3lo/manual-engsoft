---
title: '98 - Estratégias de deploy'
---

# Capítulo 98 — Estratégias de deploy

> **Volume 4 — Engenharia Moderna** · Módulo 30 — Práticas modernas de entrega
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender por que **como** você implanta uma mudança importa tanto quanto **o que** você implanta.
- Compreender as estratégias **blue-green**, **canário** e **rolling** de deploy.
- Entender o **rollback** e por que "poder voltar rápido" é mais importante que "nunca errar".
- Conhecer conceitos: **zero-downtime, deploy progressivo, compatibilidade retroativa**.
- Saber escolher a estratégia conforme o risco da mudança.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[85-CICD-a-linha-de-montagem]] (a esteira que implanta) e [[96-AB-testing-e-feature-flags]] (flags/rollout).
- Ajuda ter lido [[91-Alertas-incidentes-e-plantao-on-call]] (mitigar incidentes).

---

## 📖 Introdução

A esteira de CI/CD leva seu código até a porta da produção ([[85-CICD-a-linha-de-montagem]]). Mas **atravessar** essa porta — trocar a versão que está no ar por uma nova, com usuários reais usando o sistema **naquele exato momento** — é um ato delicado. Fazer isso mal significa **derrubar o sistema** durante a troca (indisponibilidade) ou lançar um bug para 100% dos usuários de uma vez. Este capítulo é sobre **como** implantar com segurança: as **estratégias de deploy** que permitem trocar a versão sem derrubar o sistema e limitando o alcance de um erro. A lição central: **como** você implanta importa tanto quanto **o que** você implanta.

O problema fica claro com o modelo ingênuo: você tem um servidor rodando a versão 1, e quer subir a versão 2. Se você **desliga** a v1, instala a v2 e liga — durante esses minutos, o sistema fica **fora do ar** (downtime), e todos os usuários veem erro. Pior: se a v2 tiver um bug, **todos** o sofrem de uma vez. As estratégias modernas resolvem os dois problemas. O **blue-green** mantém **dois ambientes** (o antigo e o novo) e **chaveia** o tráfego de um para o outro instantaneamente — zero downtime, e volta na hora se der errado. O **canário** libera a nova versão para uma **pequena fração** de usuários primeiro (como o "canário na mina"), observa as métricas, e só expande se estiver tudo bem — limitando o alcance de um erro. O **rolling** troca as réplicas **aos poucos**, uma de cada vez.

Mas a ideia mais libertadora deste capítulo é sobre o **rollback**. A mentalidade tradicional era "não podemos errar no deploy" — o que gerava medo, deploys raros e processos pesados. A mentalidade moderna inverte: aceite que **erros vão acontecer** e torne-os **baratos de desfazer**. Se você pode **reverter** uma versão problemática em **segundos** (rollback), então um deploy ruim vira um susto, não um desastre — e você pode implantar com frequência e confiança ([[84-O-que-e-DevOps]]). "Poder voltar rápido" é mais valioso que "nunca errar", porque o primeiro é alcançável e o segundo não. Este capítulo cobre as estratégias (blue-green, canário, rolling), o rollback, os conceitos que as sustentam (zero-downtime, compatibilidade retroativa) e como escolher conforme o risco — fechando o ciclo do "colocar no ar" que começou no DevOps.

---

## 🧨 Analogia

Pense em como uma **grande loja troca a vitrine e o layout** sem fechar as portas nem espantar os clientes — e no que fazer se a mudança der errado.

- **A troca ingênua (com downtime):** a loja **fecha** por uma tarde, os funcionários trocam tudo, e reabre com o novo layout. Durante a tarde, **nenhum cliente entra** (perda de vendas), e se o novo layout for confuso, **todos** os clientes do dia seguinte se perdem. É o deploy que derruba o sistema.

- **Blue-green: duas lojas idênticas, uma chave de porta.** Imagine que a loja tem **dois andares idênticos** — o andar "azul" (atual, com clientes) e o "verde" (onde os funcionários montam o novo layout **com calma**, sem cliente nenhum). Quando o andar verde está pronto e testado, um **único gesto** (redirecionar a escada rolante) manda **todos** os clientes para o andar novo, **instantaneamente**, sem fechar nada. Se o novo layout der problema, o gesto se **inverte** na hora e todos voltam ao azul. É o **blue-green**: dois ambientes, troca instantânea, volta instantânea.

- **Canário: testar com alguns clientes primeiro.** Em vez de mandar todos para o layout novo, a loja **direciona só 5% dos clientes** para ele e **observa**: eles compram bem? se perdem? reclamam? Se tudo corre bem, aumenta para 20%, 50%, 100%. Se aqueles 5% se atrapalham, só **eles** foram afetados — 95% nunca viram o problema. É o **canário**: liberar para poucos, observar, expandir com segurança.

- **Rolling: trocar as seções aos poucos.** A loja reforma **uma seção por vez** (hoje a de roupas, amanhã a de calçados), mantendo o resto funcionando. Nunca fecha inteira. É o **rolling**: substituir aos poucos.

E acima de tudo: a loja mantém a **planta do layout antigo guardada**, para **voltar atrás rapidamente** se o novo for um desastre. Guarde: estratégias de deploy são as formas de trocar o layout da loja sem fechar as portas — dois andares (blue-green), testar com poucos (canário), seção por seção (rolling) — e sempre poder **voltar rápido** ao que funcionava.

---

## 🧩 Conceitos fundamentais

### 1. O problema: trocar a versão com o sistema no ar

O desafio do deploy é substituir a versão em produção **enquanto usuários a usam**, sem: (a) **derrubar** o sistema durante a troca (downtime), nem (b) expor **todos** os usuários a um bug de uma vez. As estratégias resolvem esses dois problemas de formas diferentes.

> **Termo explicado — downtime (indisponibilidade):** o período em que o sistema fica fora do ar. Deploys modernos buscam **zero-downtime** — trocar a versão sem nenhuma interrupção percebida.

### 2. Blue-green

Mantém **dois ambientes idênticos**: o **blue** (versão atual, recebendo tráfego) e o **green** (nova versão, pronta e testada, sem tráfego). Quando o green está validado, **chaveia-se todo o tráfego** de blue para green instantaneamente. Se der problema, **volta-se** para blue na mesma hora. Zero downtime e rollback instantâneo — ao custo de manter **dois ambientes**.

> **Termo explicado — blue-green:** dois ambientes completos (atual e novo); troca-se o tráfego de um para o outro de uma vez, com rollback instantâneo voltando ao anterior.

### 3. Canário (canary)

Libera a nova versão para uma **fração pequena** dos usuários (ex.: 1-5%), observa as **métricas** ([[89-Logs-metricas-e-tracing]]), e **expande gradualmente** (10% → 50% → 100%) se tudo estiver bem — ou **reverte** se as métricas piorarem. Limita o **alcance** de um erro àquela fração. O nome vem do "canário na mina de carvão".

> **Termo explicado — canário (canary):** liberar a nova versão para uma pequena fração de usuários primeiro, observando as métricas, e expandir só se estiver saudável — limitando o alcance de um problema.

### 4. Rolling (atualização gradual)

Substitui as réplicas da aplicação **aos poucos**, uma (ou algumas) de cada vez: sobe uma réplica v2, tira uma v1, repete até todas serem v2. O sistema nunca fica fora do ar (sempre há réplicas atendendo). É o padrão de orquestradores como o Kubernetes ([[86-Docker-e-containers]]). Mais simples que blue-green (não duplica o ambiente), mas o rollback é mais lento.

> **Termo explicado — rolling deploy:** substituir as réplicas gradualmente (uma de cada vez) até todas rodarem a nova versão, mantendo o serviço no ar durante toda a troca.

### 5. Rollback — poder voltar rápido

**Rollback** é reverter para a versão anterior (estável) quando a nova apresenta problema. A mentalidade moderna: em vez de tentar **nunca errar** (impossível), torne o erro **barato de desfazer**. Um rollback rápido (segundos) transforma um deploy ruim num susto ([[91-Alertas-incidentes-e-plantao-on-call]]). "Poder voltar rápido" > "nunca errar".

> **Termo explicado — rollback:** reverter para a versão anterior estável ao detectar um problema na nova. Um rollback rápido é a rede de segurança que torna deploys frequentes seguros.

### 6. Compatibilidade retroativa (o que torna tudo possível)

Durante um deploy progressivo (canário, rolling), as versões **antiga e nova coexistem** por um tempo, muitas vezes falando com o **mesmo banco**. Para não quebrar nada, as mudanças precisam ser **retrocompatíveis** — a nova versão não pode exigir uma estrutura que a antiga desconheça, e mudanças de banco ([[69-Modelagem-de-dados-e-normalizacao]]) precisam ser feitas em etapas que ambas as versões toleram.

> **Termo explicado — compatibilidade retroativa:** garantir que a versão nova e a antiga possam coexistir sem quebrar (mesmo banco, mesmos contratos), pré-requisito para deploys progressivos e rollbacks seguros.

---

## ⚙️ Como funciona na prática

Como as estratégias são escolhidas e aplicadas:

**Escolher a estratégia pelo risco.** Não há uma estratégia "melhor" — há a adequada ao risco da mudança. Uma correção pequena e reversível pode ir num **rolling** simples. Uma mudança grande e arriscada (o novo motor de pagamentos) merece um **canário** cuidadoso, observando as métricas em cada fase. Um sistema que **não pode** ter downtime nenhum e precisa de rollback instantâneo justifica o **blue-green** (com seu custo de ambiente duplicado). O risco decide o cuidado.

**Canário + observabilidade = deploy seguro.** O canário só funciona se você **observa** as métricas certas ([[89-Logs-metricas-e-tracing]]) durante cada fase: taxa de erro, latência, e métricas de negócio ([[97-Metricas-de-produto-e-medicao-de-impacto]]) da fração canário vs. o resto. Se a fração canário mostra erros ou conversão pior, **reverte-se** antes de expandir — o problema atingiu 5%, não 100%. Alguns sistemas fazem isso **automaticamente** (deploy progressivo automatizado): a esteira expande ou reverte sozinha conforme as métricas.

**Feature flags e deploy são complementares.** Há uma relação importante com o capítulo de flags ([[96-AB-testing-e-feature-flags]]): o **deploy** move o **código** para produção (com estas estratégias); a **flag** controla se a **feature** está ligada (release). Frequentemente combinam-se: implanta-se o código com um rolling seguro (desligado atrás de flag) e depois faz-se o rollout da feature via flag. Deploy cuida da **infraestrutura da troca**; flag cuida do **release da funcionalidade**.

**A disciplina da compatibilidade retroativa.** O detalhe técnico que quebra deploys progressivos: durante a transição, **duas versões rodam ao mesmo tempo**. Se a v2 renomeia uma coluna do banco que a v1 ainda usa, a v1 quebra durante o deploy. A solução são **mudanças em etapas** (o "expand-contract"): primeiro adiciona-se o novo **sem remover** o antigo (ambas as versões funcionam), migra-se, e só **depois** remove-se o antigo — nunca numa tacada que quebre a versão que ainda está no ar. Isso vale especialmente para mudanças de banco ([[69-Modelagem-de-dados-e-normalizacao]]).

**Rollback exige preparação.** "Poder voltar rápido" não é automático — exige que o sistema seja **projetado** para isso: versões retrocompatíveis (para poder voltar sem quebrar o banco), imagens versionadas ([[86-Docker-e-containers]]) da versão anterior prontas, e um processo de rollback **testado** (um rollback que nunca foi testado pode falhar na hora da emergência). Times maduros **praticam** rollbacks e os tornam um clique.

**A cultura que isso destrava.** No fundo, estas estratégias existem para servir à cultura DevOps ([[84-O-que-e-DevOps]]): deploys **frequentes, pequenos e sem medo**. Quando você pode implantar sem downtime, limitar o alcance de erros (canário) e reverter em segundos (rollback), o deploy deixa de ser um evento assustador e vira **rotina** — o que permite entregar valor rápido e com segurança, o objetivo de todo o Volume 4.

---

## 🍔 Aplicação na SaborExpress

A SaborExpress usa diferentes estratégias de deploy conforme o risco — e aprendeu na prática que "poder voltar rápido" vale mais que "nunca errar". Acompanhe.

**O deploy canário do novo motor de pagamentos.** A mudança mais arriscada do ano foi reescrever o motor de pagamentos ([[80-Construindo-a-API-da-SaborExpress]]) — um erro ali significaria cobranças erradas, dinheiro real. O time **não** trocou para todos de uma vez. Fez um **deploy canário**: liberou a nova versão para **1%** dos pagamentos e **observou** as métricas ([[89-Logs-metricas-e-tracing]]) — taxa de erro, tempo de processamento, e a taxa de sucesso de cobrança ([[97-Metricas-de-produto-e-medicao-de-impacto]]). Tudo saudável no 1%, expandiram para 10%, depois 50%, depois 100%, observando em cada fase. Se algo tivesse dado errado, só **1%** dos pagamentos seria afetado, não todos. O canário limitou o alcance do risco.

**O rollback que salvou a noite.** Numa outra ocasião, um deploy aparentemente inocente do serviço de restaurantes causou, minutos depois, um pico de erros que a observabilidade detectou e o alerta disparou ([[91-Alertas-incidentes-e-plantao-on-call]]). Em vez de investigar a causa com o sistema quebrado (e os clientes sofrendo), Camila fez a coisa certa: **rollback imediato** — reverteu para a versão anterior em **30 segundos**, e o sistema voltou ao normal na hora. **Só então** investigou a causa, com calma, sem pressão ([[91-Alertas-incidentes-e-plantao-on-call]]). Foi a prova viva da mentalidade: ela **não** precisou "nunca errar"; precisou **poder voltar rápido** — e o rollback transformou um desastre potencial num susto de meio minuto.

**Blue-green para a atualização crítica.** Numa migração grande da infraestrutura, que não podia ter **nenhum** downtime, o time usou **blue-green**: montaram o ambiente **green** completo com a nova versão, testaram-no exaustivamente **sem tráfego**, e então **chavearam** todo o tráfego de blue para green num instante — usuários não perceberam nada. Mantiveram o **blue** de pé por algumas horas: se o green tivesse problema, voltariam num gesto. Como tudo correu bem, desligaram o blue depois. Zero downtime, rollback instantâneo à disposição.

**A armadilha da compatibilidade retroativa.** Um deploy quase deu errado por um detalhe: a v2 do serviço de pedidos **renomeava uma coluna** do banco que a v1 ainda usava. Como durante o rolling deploy as **duas versões rodavam juntas** ([[86-Docker-e-containers]]), a v1 teria quebrado. Camila pegou isso na revisão e aplicou o padrão **expand-contract**: primeiro adicionou a nova coluna **sem remover** a antiga (ambas as versões funcionavam), migrou os dados, e só num deploy **posterior** removeu a coluna antiga — quando nenhuma versão a usava mais. A **compatibilidade retroativa** evitou o downtime.

**A estratégia conforme o risco.** O time codificou a escolha: mudanças pequenas e reversíveis vão num **rolling** simples (o padrão do Kubernetes); mudanças arriscadas (pagamento, cálculos de dinheiro) vão em **canário** observado; migrações críticas sem downtime vão em **blue-green**. E **tudo** com rollback preparado e testado. Ana registrou num runbook ([[91-Alertas-incidentes-e-plantao-on-call]]): "o risco da mudança decide o cuidado do deploy — e sempre podemos voltar".

Moral: a SaborExpress trocou o medo do deploy pela segurança das estratégias — **canário** para limitar o alcance do risco (o motor de pagamentos no 1%), **blue-green** para zero downtime em migrações críticas, **rolling** para o dia a dia, **compatibilidade retroativa** para as versões coexistirem, e **rollback rápido** como rede de segurança universal. A lição que ficou: não se trata de nunca errar, mas de **poder voltar em segundos** — o que torna o deploy uma rotina tranquila.

---

## 🏢 Como isso acontece em uma empresa

- **Deploys progressivos são padrão em produção séria.** Canário e rolling são a norma em empresas com sistemas de porte. Trocar tudo de uma vez ("big bang deploy") é visto como arriscado e ultrapassado.
- **Rollback rápido é métrica de maturidade.** O tempo de recuperação (MTTR — [[84-O-que-e-DevOps]]) depende diretamente da capacidade de reverter rápido. Empresas maduras tornam o rollback um clique e o **praticam**.
- **Kubernetes trouxe rolling deploy por padrão.** Orquestradores ([[86-Docker-e-containers]]) fazem rolling updates nativamente, popularizando o deploy sem downtime como comportamento padrão, não exceção.
- **Deploy progressivo automatizado é a fronteira.** Ferramentas (Argo Rollouts, Flagger, Spinnaker) automatizam o canário: expandem ou revertem sozinhas conforme as métricas, tirando o humano do loop nas decisões de rotina.
- **Compatibilidade retroativa é disciplina de banco.** O padrão expand-contract para mudanças de schema ([[69-Modelagem-de-dados-e-normalizacao]]) é conhecimento essencial em times que fazem deploy contínuo — quebrar o banco no deploy é um erro clássico.
- **A cultura mudou de "evitar deploy" para "deploy é seguro".** Onde antes se temia e se raramente implantava, hoje empresas de ponta implantam **dezenas a milhares de vezes por dia**, justamente porque as estratégias tornaram o deploy seguro e reversível ([[84-O-que-e-DevOps]]).
- **Blue-green tem custo e nicho.** Manter dois ambientes completos custa (dobra recursos), então blue-green é usado onde o zero-downtime e o rollback instantâneo justificam — nem sempre é a escolha padrão.

---

## ⚠️ Erros comuns

- **Big bang deploy (trocar tudo de uma vez).** Substituir a versão para 100% dos usuários sem gradualidade, expondo todos a um eventual bug simultaneamente. Prefira progressivo.
- **Deploy com downtime desnecessário.** Derrubar o sistema para trocar a versão quando estratégias de zero-downtime resolveriam. Usuários não deveriam ver "em manutenção" a cada deploy.
- **Canário sem observar as métricas.** Liberar para 5% mas não olhar os dados daquela fração. O canário só protege se você **observa** e reverte ao ver problema ([[89-Logs-metricas-e-tracing]]).
- **Não ter (ou não testar) o rollback.** Confiar em "não vamos errar" sem um caminho de volta rápido e testado. Um rollback que falha na emergência é pior que não tê-lo.
- **Quebrar a compatibilidade retroativa.** Fazer mudanças de banco/contrato que quebram a versão antiga durante o deploy progressivo. Use expand-contract (mudanças em etapas).
- **Confundir estratégia de deploy com feature flag.** Achar que canário de deploy e rollout de flag são a mesma coisa. Deploy move código; flag controla release — complementares.
- **Escolher a estratégia sem considerar o risco.** Usar blue-green caro para tudo, ou rolling arriscado para uma mudança crítica. A estratégia deve casar com o risco da mudança.
- **Deploy grande e raro.** Acumular muitas mudanças num deploy gigante torna qualquer estratégia arriscada (difícil saber o que quebrou). Deploys pequenos e frequentes são mais seguros ([[84-O-que-e-DevOps]]).

---

## 💡 Dicas profissionais

- **Escolha a estratégia pelo risco da mudança.** Rolling para o rotineiro, canário para o arriscado, blue-green para o crítico sem downtime. Case o cuidado com o risco.
- **Sempre tenha um rollback rápido e testado.** "Poder voltar em segundos" é sua maior rede de segurança. Pratique rollbacks — não descubra na emergência que ele não funciona.
- **Numa emergência, reverta primeiro, investigue depois.** Rollback restaura o serviço; a investigação vem com calma, sem usuários sofrendo ([[91-Alertas-incidentes-e-plantao-on-call]]).
- **Faça o canário observando as métricas certas.** Erro, latência e negócio da fração canário vs. o resto. Reverta ao primeiro sinal ruim, antes de expandir.
- **Mantenha compatibilidade retroativa.** Faça mudanças de banco/contrato em etapas (expand-contract) para que a versão antiga e a nova coexistam sem quebrar.
- **Combine deploy e flags.** Implante o código com deploy seguro (desligado atrás de flag) e faça o release da feature via flag. Cada um cuida de uma coisa ([[96-AB-testing-e-feature-flags]]).
- **Implante pequeno e frequente.** Mudanças pequenas são mais fáceis de implantar com segurança e de reverter. Deploys gigantes tornam qualquer estratégia arriscada.
- **Automatize o deploy progressivo quando possível.** Expandir/reverter automaticamente conforme as métricas reduz o risco humano e acelera a resposta.

---

## 🎈 Curiosidades

- O nome **"deploy canário"** vem de uma prática histórica sombria da mineração: mineiros levavam **canários** (pássaros) para dentro das minas de carvão porque eles são muito sensíveis a gases tóxicos — se o canário parasse de cantar ou morresse, era o sinal de perigo para os mineiros saírem **antes** de serem afetados. No deploy, a "fração canário" de usuários cumpre o mesmo papel: se ela "adoece" (métricas ruins), você aborta antes de afetar todos.
- Os termos **"blue"** e **"green"** não têm significado especial além de serem **nomes neutros** para os dois ambientes — foram escolhidos justamente para **não** implicar que um é "melhor" ou "primário" (evitando nomes como "principal/backup"). A ideia é que os dois são igualmente válidos, e o "atual" é apenas aquele que recebe tráfego naquele momento.
- A capacidade de **rollback instantâneo** é considerada tão crucial que empresas como a **Amazon** e o **Google** a tratam como requisito não-negociável de qualquer sistema de deploy. Há um princípio operacional famoso: "**a primeira coisa a fazer num incidente causado por deploy não é debugar — é reverter**". Debugar em produção com usuários sofrendo é o erro; voltar ao estado bom é o certo.
- O padrão **"expand-contract"** (também chamado "parallel change") para mudanças de banco sem downtime é uma daquelas técnicas que parecem óbvias depois de aprendidas, mas cuja ausência já causou incontáveis incidentes: renomear uma coluna "num passo só" durante um deploy contínuo é uma das formas mais comuns de derrubar um sistema — e o motivo de tantas equipes terem cicatrizes com migrações de banco.
- Existe uma estratégia ainda mais ousada chamada **"dark launching"**: implantar uma nova funcionalidade que roda **em segundo plano** processando tráfego real, mas cujos **resultados não são mostrados** aos usuários — só medidos. O Facebook usou isso para testar sistemas em escala real antes de expô-los: a funcionalidade "lançada no escuro" processava as requisições de milhões de usuários para provar que aguentava a carga, sem ninguém ver, antes de ser oficialmente ligada.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Estratégia de deploy** | A forma de trocar a versão em produção com segurança. |
| **Downtime** | Período em que o sistema fica fora do ar. |
| **Zero-downtime** | Trocar a versão sem nenhuma interrupção percebida. |
| **Blue-green** | Dois ambientes; troca-se o tráfego de um para o outro de uma vez. |
| **Canário** | Liberar para uma fração pequena, observar, e expandir se saudável. |
| **Rolling** | Substituir as réplicas aos poucos, uma de cada vez. |
| **Rollback** | Reverter para a versão anterior estável ao detectar problema. |
| **Compatibilidade retroativa** | Versão nova e antiga coexistirem sem quebrar. |
| **Expand-contract** | Mudar o banco em etapas para não quebrar a versão antiga. |
| **Big bang deploy** | Trocar tudo de uma vez para 100% (arriscado). |

---

## 📝 Resumo

- **Como** você implanta importa tanto quanto **o que** você implanta. O desafio: trocar a versão em produção **enquanto usuários a usam**, sem **derrubar** o sistema (downtime) nem expor **todos** a um bug de uma vez. As **estratégias de deploy** resolvem isso.
- **Blue-green:** dois ambientes idênticos (atual e novo); valida-se o novo sem tráfego e **chaveia-se tudo de uma vez**, com rollback instantâneo — zero downtime, ao custo de duplicar o ambiente. **Canário:** libera para uma **fração pequena** (1-5%), **observa as métricas**, e expande só se saudável — limita o **alcance** de um erro. **Rolling:** substitui as réplicas **aos poucos**, mantendo o serviço no ar (padrão do Kubernetes).
- A ideia mais libertadora é sobre o **rollback**: em vez de tentar **nunca errar** (impossível), torne o erro **barato de desfazer**. Um rollback em segundos transforma um deploy ruim num susto. **"Poder voltar rápido" vale mais que "nunca errar"** — na emergência, **reverta primeiro, investigue depois**.
- Deploys progressivos exigem **compatibilidade retroativa**: durante a transição, a versão **antiga e a nova coexistem** (mesmo banco), então mudanças precisam ser feitas em **etapas** (expand-contract) que ambas toleram — nunca renomear/remover algo numa tacada que quebre a versão ainda no ar.
- Escolhe-se a estratégia pelo **risco** da mudança (rolling para o rotineiro, canário para o arriscado, blue-green para o crítico), sempre com rollback preparado. Deploy (move o **código**) e feature flag (controla o **release** — [[96-AB-testing-e-feature-flags]]) são **complementares**. No fundo, estas técnicas servem à cultura DevOps ([[84-O-que-e-DevOps]]): tornar o deploy **frequente, pequeno e sem medo** — rotina, não evento.

---

## ☑️ Checklist de aprendizado

- [ ] Explico por que "como implantar" importa tanto quanto "o que implantar".
- [ ] Diferencio blue-green, canário e rolling.
- [ ] Entendo por que "poder voltar rápido" (rollback) vale mais que "nunca errar".
- [ ] Sei o que é compatibilidade retroativa e o padrão expand-contract.
- [ ] Distingo estratégia de deploy de feature flag (código vs. release).
- [ ] Sei escolher a estratégia conforme o risco da mudança.

---

## ✏️ Exercícios

**1.** Com a analogia da loja, explique as estratégias blue-green, canário e rolling.

**2.** Por que o deploy **canário** limita o alcance de um erro? O que é essencial fazer durante o canário para ele funcionar?

**3.** Explique por que "poder voltar rápido" (rollback) é mais valioso que "nunca errar". O que fazer primeiro numa emergência causada por deploy?

**4.** O que é **compatibilidade retroativa** e por que ela é necessária num deploy progressivo? Explique o padrão expand-contract com o exemplo de renomear uma coluna.

**5. (Reflexão)** A SaborExpress escolhe a estratégia "conforme o risco da mudança" e sempre tem rollback preparado. Explique por que não existe uma estratégia "melhor" universal e como a mentalidade "sempre podemos voltar" transformou o deploy de evento assustador em rotina.

---

## 💬 Respostas comentadas

**1.** Na analogia da loja que troca o layout sem fechar: **blue-green** são **dois andares idênticos** — o "azul" (atual, com clientes) e o "verde" (onde se monta o novo layout com calma, sem cliente); quando o verde está pronto e testado, um único gesto (redirecionar a escada rolante) manda **todos** os clientes para o andar novo instantaneamente, sem fechar nada, e se der problema o gesto se inverte e todos voltam ao azul — dois ambientes, troca e volta instantâneas. **Canário** é **testar com poucos clientes primeiro** — direciona-se só 5% dos clientes para o layout novo e observa-se (compram bem? se perdem?); se tudo corre bem, aumenta para 20%, 50%, 100%; se aqueles 5% se atrapalham, só eles foram afetados, 95% nunca viram o problema. **Rolling** é reformar **uma seção por vez** (hoje roupas, amanhã calçados), mantendo o resto da loja funcionando, nunca fechando inteira — substituir aos poucos. E, acima de tudo, a loja guarda a planta do layout antigo para **voltar atrás rápido** se o novo for um desastre (rollback).

**2.** O deploy canário limita o alcance de um erro porque libera a nova versão para apenas uma **fração pequena** dos usuários (tipicamente 1-5%) **antes** de expor todos. Assim, se a nova versão tiver um bug, **só aquela fração** o sofre — os outros 95-99% continuam na versão antiga e estável, sem serem afetados. Você "arrisca" só uma pequena parte dos usuários por vez, em vez de todos de uma tacada (como no big bang deploy). O que é **essencial** fazer durante o canário para ele funcionar é **observar as métricas** ([[89-Logs-metricas-e-tracing]]) da fração canário — taxa de erro, latência, métricas de negócio como conversão — e **comparar** com o resto dos usuários (na versão antiga). Sem essa observação, o canário é inútil: você teria liberado para 5% mas não saberia se eles estão sofrendo algum problema, e acabaria expandindo para 100% um bug que os dados teriam revelado. É a observação que fecha o ciclo: libera para poucos → **observa** → se as métricas da fração canário pioram, **reverte** (só 5% afetados); se estão saudáveis, expande para a próxima fase. O canário protege **porque** você olha os dados e age sobre eles — o "canário na mina" só salva se alguém repara que ele parou de cantar.

**3.** "Poder voltar rápido" é mais valioso que "nunca errar" porque **nunca errar é impossível** — por mais testes e cuidado, bugs escapam, dependências falham, o inesperado acontece —, enquanto **poder voltar rápido é alcançável** e transforma completamente as consequências de um erro. Se você tenta se basear em "nunca errar", cria uma cultura de **medo**: deploys raros, processos pesados, paralisia — e mesmo assim erros acontecem, agora com um impacto enorme porque você não estava preparado para revertê-los. Se, em vez disso, você aceita que erros vão acontecer e investe em torná-los **baratos de desfazer** (rollback em segundos), então um deploy ruim vira um **susto de meio minuto**, não um desastre — e você pode implantar com frequência e confiança, porque o custo de um erro é baixo. O primeiro é uma meta inatingível que gera medo; o segundo é uma capacidade real que gera coragem. Numa **emergência causada por deploy**, a primeira coisa a fazer é **reverter (rollback), não debugar**: você restaura o serviço ao estado bom **imediatamente**, parando o sofrimento dos usuários, e **só então** investiga a causa com calma, sem pressão e sem gente sendo prejudicada. Debugar em produção com o sistema quebrado e usuários sofrendo é o erro; voltar ao que funcionava primeiro, e entender depois, é o certo ([[91-Alertas-incidentes-e-plantao-on-call]]).

**4.** **Compatibilidade retroativa** é garantir que a versão **nova** e a versão **antiga** do sistema possam **coexistir sem quebrar** — funcionando lado a lado, muitas vezes com o mesmo banco de dados. Ela é necessária num deploy progressivo (canário, rolling) porque, durante a transição, as **duas versões rodam ao mesmo tempo**: enquanto algumas réplicas já são a v2 e outras ainda são a v1, ambas estão atendendo usuários e acessando o mesmo banco. Se a v2 fizer uma mudança que a v1 não entende, a v1 quebra durante o deploy (e o rollback para a v1 também quebraria). O padrão **expand-contract** resolve isso fazendo a mudança em **etapas** que nenhuma versão quebra, em vez de uma tacada só. Com o exemplo de **renomear uma coluna** (digamos, de `endereco` para `endereco_entrega`): o jeito errado seria a v2 renomear a coluna direto — durante o deploy, a v1 (que ainda procura `endereco`) quebraria. O jeito certo (expand-contract) tem três passos, em deploys separados: **(1) Expand** — adiciona-se a **nova** coluna `endereco_entrega` **sem remover** a antiga `endereco`; agora ambas existem, a v1 usa a antiga e a v2 pode usar a nova, e as duas versões funcionam juntas; escreve-se nas duas colunas durante a transição. **(2) Migrar** — copiam-se os dados e garante-se que tudo usa a nova coluna. **(3) Contract** — só **depois** que **nenhuma** versão em produção usa mais a coluna antiga (a v1 já foi totalmente substituída), num deploy posterior, **remove-se** a coluna `endereco`. Assim, em nenhum momento uma versão no ar encontra o banco num estado que ela não entende — a mudança foi "expandida" (adicionar sem remover) e só "contraída" (remover) quando era seguro.

**5.** Não existe uma estratégia "melhor" universal porque cada uma tem **trade-offs** diferentes (custo, velocidade de rollback, complexidade, downtime) que a tornam adequada para **riscos diferentes**: o **blue-green** dá zero downtime e rollback instantâneo, mas custa **dobrar** o ambiente — justificável para uma migração crítica que não pode cair, mas exagero para uma correção trivial; o **canário** limita o alcance de erros e é ideal para mudanças **arriscadas** (o motor de pagamentos), mas exige observação cuidadosa e é mais lento; o **rolling** é simples e barato, ótimo para o dia a dia rotineiro, mas com rollback mais lento e menos controle. Como o **risco varia** de mudança para mudança (uma correção de texto vs. reescrever o pagamento), a estratégia certa também varia — usar blue-green caro para tudo desperdiça recursos, e usar rolling arriscado para uma mudança crítica é imprudente. Por isso a SaborExpress **casa o cuidado do deploy com o risco da mudança**. E a mentalidade "**sempre podemos voltar**" (rollback preparado e testado em toda mudança) transformou o deploy de evento assustador em rotina porque **removeu o medo**: quando a equipe **sabe** que qualquer deploy ruim pode ser revertido em segundos, deixar de existir a pergunta paralisante "e se der errado e não conseguirmos consertar?". O deploy deixa de ser uma aposta de alto risco (onde um erro seria catastrófico e irreversível) e vira uma ação **reversível e de baixo risco** — como salvar um documento sabendo que há "desfazer". Isso permite implantar **com frequência** (dezenas de vezes por dia), em **lotes pequenos** (mais fáceis de reverter e entender), e **sem drama** — exatamente a cultura DevOps de entregar valor rápido e com segurança. A segurança não vem de "acertar sempre" (impossível), mas de "poder voltar sempre" (alcançável), e é essa rede de segurança que converte o deploy de um momento de tensão numa operação corriqueira e confiável.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[96-AB-testing-e-feature-flags]] — flags e rollout, complementares ao deploy.
- **Próximo (linear):** [[99-Divida-tecnica-e-chaos-engineering]] — dívida técnica e testar a resiliência de propósito.
- **Base:** [[85-CICD-a-linha-de-montagem]] (a esteira que implanta), [[86-Docker-e-containers]] (rolling no Kubernetes) e [[89-Logs-metricas-e-tracing]] (observar o canário).
- **Aplicação:** [[91-Alertas-incidentes-e-plantao-on-call]] (rollback como mitigação) e [[84-O-que-e-DevOps]] (deploy sem medo).

---

> 🧭 **Você está aqui:** Volume 4 → Módulo 30 → **Capítulo 98 de 119**.
