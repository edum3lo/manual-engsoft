---
title: '94 - Filas, particionamento e microsserviços na prática'
---

# Capítulo 94 — Filas, particionamento e microsserviços na prática

> **Volume 4 — Engenharia Moderna** · Módulo 28 — Escalabilidade
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender **filas de mensagens** e o processamento **assíncrono** que elas permitem.
- Compreender o **particionamento (sharding)** para escalar as escritas do banco.
- Ver os **microsserviços na prática** como técnica de escala e as suas trocas.
- Conhecer conceitos: **produtor/consumidor, desacoplamento, consistência eventual**.
- Entender que essas são técnicas do "estágio final" da escala — poderosas e complexas.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário-avançado (4/5).**

---

## ✅ Pré-requisitos

- Ter lido [[92-De-100-a-1-milhao-de-usuarios]] e [[93-Cache-CDN-e-balanceador-de-carga]].
- Ter lido [[59-Monolito-vs-Microsservicos]] e [[71-Confiabilidade-e-escala-do-banco]].

---

## 📖 Introdução

Você aliviou as **leituras** com cache e réplicas ([[93-Cache-CDN-e-balanceador-de-carga]]). Mas e quando até as **escritas** — a torrente de novos pedidos, mensagens, transações — saturam o sistema? Esse é o **estágio final** da jornada de escala ([[92-De-100-a-1-milhao-de-usuarios]]), o mais complexo, e o tema deste capítulo. Três técnicas pesadas entram em cena: as **filas de mensagens** (para não fazer tudo na hora), o **particionamento/sharding** (para dividir os dados entre vários bancos) e os **microsserviços** (para escalar cada parte do sistema de forma independente). São ferramentas poderosas — e caras em complexidade —, reservadas para quando a escala realmente as exige.

A primeira grande ideia é o **processamento assíncrono** via **filas**. Até agora, o modelo era **síncrono**: o usuário faz uma requisição e **espera** o sistema fazer tudo (validar, cobrar, salvar, enviar e-mail, notificar) antes de responder. Isso é simples, mas frágil sob carga: se cada pedido exige dez tarefas na hora, um pico de pedidos sobrecarrega tudo de uma vez. A fila inverte a lógica: o sistema faz **só o essencial na hora** (registra o pedido), joga o resto numa **fila** de tarefas, e responde ao usuário **imediatamente**; um processo separado vai **consumindo** a fila no seu ritmo. Isso **desacopla** o receber do processar, absorve picos como um amortecedor, e deixa o sistema muito mais resiliente.

As outras duas técnicas atacam os limites do banco e do monólito. O **sharding** (particionamento) divide os dados entre vários bancos — os pedidos de A-M num banco, N-Z noutro — para que nenhum banco único seja o gargalo de escrita ([[71-Confiabilidade-e-escala-do-banco]]). E os **microsserviços** ([[59-Monolito-vs-Microsservicos]]) quebram o sistema em serviços independentes que escalam separadamente — o serviço de pagamento pode ter 20 réplicas enquanto o de perfil tem 2. Mas todas essas técnicas cobram um preço alto: introduzem **complexidade distribuída**, e um conceito incontornável — a **consistência eventual** (os dados podem ficar temporariamente "fora de sincronia" entre as partes). Este capítulo fecha o módulo de escalabilidade mostrando essas técnicas na prática, seus ganhos e — com honestidade — seus custos, reforçando que são o "andar de cima" da escala, para usar **quando** os problemas anteriores já foram resolvidos e a carga realmente exige.

---

## 🧠 Analogia

Pense na evolução de uma **central de pedidos por telefone** que vira uma operação gigante — cada técnica resolve um gargalo de escrita.

- **A fila de mensagens é a caixa de "pedidos a processar".** Imagine que, quando um cliente liga, o atendente tivesse que **fazer tudo na hora** com o cliente na linha: anotar, cobrar no cartão, embalar, chamar o entregador. O cliente esperaria uma eternidade, e num pico ninguém seria atendido. A solução: o atendente só **anota o pedido num papel e o coloca numa bandeja** ("a fazer"), e diz "pronto, seu pedido foi registrado!" — liberando a linha **na hora**. Uma **equipe nos fundos** vai pegando os papéis da bandeja e processando **no seu ritmo**. Se chega um pico de ligações, a bandeja **acumula** (amortece) em vez de tudo travar. Isso é a **fila**: registrar rápido, processar depois, desacoplando o atendimento do trabalho pesado.

- **O sharding é dividir o arquivo de clientes por letra.** Quando o fichário de clientes fica gigante e todos disputam a mesma gaveta, você **divide**: clientes com sobrenome A-M numa sala, N-Z noutra, cada uma com seu fichário e seu arquivista. Agora duas pessoas atendem em paralelo, sem disputar a mesma gaveta. É o **particionamento**: dividir os dados entre vários bancos para eliminar o gargalo de uma base única.

- **Os microsserviços são departamentos especializados e independentes.** Em vez de um "faz-tudo" que cuida de vendas, cobrança e entrega ao mesmo tempo (e se afoga), você cria **departamentos** — vendas, cobrança, logística — cada um com sua equipe, escalando **independentemente** (a cobrança contrata 20 pessoas no pico, a logística 5). Eles se comunicam por **memorandos** (mensagens). É o poder e o custo dos microsserviços: independência, ao preço de coordenar departamentos separados.

O tema comum: distribuir o **trabalho** e os **dados** para que nenhuma peça única seja o limite — mas ao custo de coordenar partes separadas. Guarde: fila = bandeja de "a fazer" que amortece picos; sharding = arquivo dividido por letra; microsserviços = departamentos independentes que escalam sozinhos.

---

## 🧩 Conceitos fundamentais

### 1. Síncrono vs. assíncrono

- **Síncrono:** o usuário faz a requisição e **espera** todo o processamento terminar antes de receber a resposta. Simples, mas trava sob carga se o processamento é pesado.
- **Assíncrono:** o sistema aceita a requisição, **responde logo** ("recebido!"), e faz o trabalho pesado **depois**, em segundo plano. O usuário não espera.

> **Termo explicado — assíncrono:** processar o trabalho depois de responder ao usuário, em segundo plano, em vez de fazê-lo tudo na hora com o usuário esperando.

### 2. Fila de mensagens (produtor e consumidor)

Uma **fila de mensagens** é um componente que **guarda tarefas/mensagens** a serem processadas depois. O **produtor** coloca mensagens na fila; o **consumidor** (um processo separado, os "workers") as retira e processa no seu ritmo. Isso **desacopla** quem gera o trabalho de quem o executa. Exemplos: RabbitMQ, AWS SQS, Kafka.

> **Termo explicado — fila de mensagens:** um "amortecedor" onde um produtor deposita tarefas e um consumidor as processa depois, desacoplando o recebimento do processamento.

### 3. Desacoplamento e absorção de picos

A fila traz dois ganhos centrais:
- **Desacoplamento:** o produtor e o consumidor não dependem um do outro em tempo real. Se o consumidor está lento ou cai, as mensagens **esperam** na fila (não se perdem), e são processadas quando ele volta.
- **Absorção de picos (buffering):** num pico, a fila **enche** e é esvaziada no ritmo sustentável do consumidor, em vez de sobrecarregar tudo de uma vez. A fila é um **amortecedor**.

> **Termo explicado — desacoplamento:** tornar componentes independentes no tempo, de modo que um possa falhar ou ficar lento sem derrubar o outro — a fila guarda o trabalho até o consumidor poder processá-lo.

### 4. Sharding (particionamento)

**Sharding** é dividir os dados de um banco entre **vários bancos** (shards), cada um responsável por uma parte (ex.: por faixa de ID, por região). Isso escala as **escritas**, pois cada shard recebe só uma fração da carga. O custo: **complexidade** — saber em qual shard está cada dado, e consultas que cruzam shards ficam difíceis ([[71-Confiabilidade-e-escala-do-banco]]).

> **Termo explicado — sharding (particionamento):** dividir os dados entre vários bancos, cada um cuidando de uma parte, para distribuir a carga de escrita — ao custo de complexidade para localizar e cruzar dados.

### 5. Microsserviços como técnica de escala

Já vistos na arquitetura ([[59-Monolito-vs-Microsservicos]]), os **microsserviços** também são uma ferramenta de **escala**: quebrar o sistema em serviços independentes permite **escalar cada um separadamente** conforme sua carga (o serviço de pedidos com 30 réplicas, o de perfil com 2) e desenvolvê-los por times distintos. O custo é a **complexidade distribuída** (rede, coordenação, observabilidade — [[89-Logs-metricas-e-tracing]]).

### 6. Consistência eventual

O preço da distribuição: quando os dados estão espalhados (filas, shards, serviços com bancos próprios), eles nem sempre estão **sincronizados no mesmo instante**. A **consistência eventual** significa que o sistema fica temporariamente **inconsistente** (o pedido já foi pago, mas a tela de histórico ainda não mostra) e **converge** para o estado correto **em algum momento**. É um trade-off fundamental de sistemas distribuídos ([[71-Confiabilidade-e-escala-do-banco]]).

> **Termo explicado — consistência eventual:** garantia de que os dados distribuídos ficarão corretos *em algum momento*, aceitando uma janela temporária de inconsistência em troca de escala e disponibilidade.

---

## ⚙️ Como funciona na prática

Como essas técnicas são aplicadas — e por que só no fim da jornada:

**O que mandar para a fila.** Nem tudo precisa ser assíncrono. O padrão: faça **síncrono** o que o usuário **precisa confirmar na hora** (registrar o pedido, validar o pagamento minimamente) e mande para a **fila** o que pode esperar segundos/minutos sem prejuízo: enviar e-mail de confirmação, gerar nota fiscal, atualizar recomendações, notificar o restaurante, processar imagens ([[88-Modelos-de-servico-IaaS-PaaS-SaaS-serverless]]). O usuário recebe "pedido confirmado!" instantaneamente, e o resto acontece nos bastidores. Isso deixa a resposta rápida e o sistema resiliente a picos.

**Filas dão resiliência, não só escala.** Um ganho subestimado: se um serviço externo (o gateway de pagamento, o de e-mail) **cai**, sem fila a requisição inteira falharia; **com** fila, a mensagem espera lá até o serviço voltar, e é processada então — nada se perde ([[91-Alertas-incidentes-e-plantao-on-call]]). A fila transforma uma falha temporária de dependência num **atraso**, não num erro para o usuário.

**Sharding é o último recurso do banco.** Antes de shardar, esgota-se tudo o mais: otimizar queries e índices ([[71-Confiabilidade-e-escala-do-banco]]), cache ([[93-Cache-CDN-e-balanceador-de-carga]]), réplicas de leitura. O **sharding** só entra quando as **escritas** (não as leituras) saturam um único banco — porque ele adiciona muita complexidade: a aplicação precisa saber **rotear** cada dado ao shard certo, e operações que cruzam shards (relatórios agregados) ficam difíceis. É poderoso, mas evita-se ao máximo.

**Microsserviços: escala organizacional e técnica.** Quebrar em microsserviços ([[59-Monolito-vs-Microsservicos]]) permite escalar as partes que precisam e deixar as outras pequenas, e permite **times independentes** trabalharem sem pisar uns nos outros. Mas o custo é real: chamadas viram **rede** (podem falhar, ter latência), é preciso **observabilidade** forte ([[89-Logs-metricas-e-tracing]]) para rastrear uma requisição por muitos serviços, e surge a **consistência eventual**. A regra de ouro do [[59-Monolito-vs-Microsservicos]] vale: **comece monólito**, quebre em serviços **quando a dor** (de escala ou de organização) justificar.

**Conviver com a consistência eventual.** Ao distribuir, você aceita janelas de inconsistência. O truque é **desenhar a experiência** para tolerá-las: "seu pedido está sendo processado" (em vez de fingir que já terminou), atualizar a tela quando o dado converge. Onde a consistência **forte** é inegociável (o débito e o crédito de uma transferência), mantém-se aquilo **junto**, numa transação ([[71-Confiabilidade-e-escala-do-banco]]), fora do mundo eventual. Saber **onde** aceitar eventual e **onde** exigir forte é uma decisão de arquitetura crucial.

**Tudo isso é o "andar de cima" — não comece aqui.** A mensagem que fecha o módulo: filas, sharding e microsserviços são o **estágio final** ([[92-De-100-a-1-milhao-de-usuarios]]), com complexidade alta. Aplicá-los cedo demais é o erro clássico da **escala prematura** — você paga a complexidade distribuída sem ter o problema que ela resolve. Chegue aqui **depois** de esgotar o simples (servidor maior, cache, réplicas), guiado por dados de gargalo real.

---

## 🍔 Aplicação na SaborExpress

Estas técnicas foram o que permitiu a SaborExpress sobreviver aos maiores picos — mas o time só as adotou no estágio certo. Acompanhe.

**A fila que salvou a Black Friday.** No maior pico da história da empresa, o volume de pedidos ameaçava saturar tudo: cada pedido disparava dez tarefas (cobrar, notificar o restaurante, e-mail, nota fiscal, recomendações). O time **desacoplou** com uma **fila** ([[88-Modelos-de-servico-IaaS-PaaS-SaaS-serverless]]): agora, ao finalizar um pedido, o serviço faz **só o essencial na hora** (registra o pedido, reserva o pagamento) e joga o resto numa **fila**; o cliente recebe "**pedido confirmado!**" em **instantes**, e os *workers* (consumidores) processam as demais tarefas no seu ritmo. Quando a torrente de pedidos chegou, a fila **encheu e amorteceu** o pico — as tarefas foram processadas com alguns segundos de atraso, em vez de o sistema **cair**. A fila foi o amortecedor que segurou a Black Friday.

**A fila também dando resiliência.** Semanas depois, o gateway de pagamento externo **caiu** por 20 minutos ([[91-Alertas-incidentes-e-plantao-on-call]]). Sem fila, todos os pedidos daquele período teriam **falhado**. Com fila, as cobranças ficaram **esperando** na fila e foram processadas assim que o gateway voltou — **nenhum pedido se perdeu**, os clientes só viram um "processando pagamento" um pouco mais longo. A fila transformou uma pane de dependência num mero atraso.

**O sharding como último recurso.** Conforme a base de pedidos cresceu para centenas de milhões de registros, as **escritas** começaram a saturar o banco único, mesmo depois de cache e réplicas de leitura ([[93-Cache-CDN-e-balanceador-de-carga]]). Só **então** — esgotado o resto — o time aplicou **sharding** ([[71-Confiabilidade-e-escala-do-banco]]), particionando os pedidos por região (os pedidos de cada cidade num shard). Camila registrou num ADR ([[57-O-que-e-arquitetura-de-software]]) que essa foi a **última** alavanca puxada, pela complexidade que trouxe: a aplicação passou a rotear cada pedido ao shard certo, e relatórios que cruzavam regiões ficaram mais trabalhosos.

**Microsserviços por partes.** A SaborExpress **não** nasceu em microsserviços — começou como um monólito ([[59-Monolito-vs-Microsservicos]]), o que foi certo para o começo. Conforme cresceu, quebrou em microsserviços **as partes que a dor justificava**: o serviço de **pagamento** (crítico, precisa escalar muito no pico) virou independente, com 30 réplicas na Black Friday, enquanto o de **perfil de usuário** (baixa carga) ficou com 2. Times diferentes passaram a cuidar de serviços diferentes sem colisão. O custo veio junto: precisaram de **tracing distribuído** forte ([[89-Logs-metricas-e-tracing]]) para diagnosticar requisições que atravessavam vários serviços — exatamente o incidente do "pedido lento" que o tracing resolveu.

**Convivendo com a consistência eventual.** Ao distribuir, o time aceitou janelas de inconsistência e **desenhou a experiência** para tolerá-las: depois de finalizar, o cliente vê "**pedido confirmado, preparando**" (verdade imediata) enquanto, nos bastidores, a nota fiscal é gerada e as recomendações atualizadas com alguns segundos de atraso (**consistência eventual**). Mas onde a consistência **forte** era inegociável — a **reserva do pagamento** vs. o registro do pedido — o time manteve isso **junto, numa transação** ([[71-Confiabilidade-e-escala-do-banco]]), fora do mundo eventual. Souberam **onde** aceitar eventual (e-mail, recomendações) e **onde** exigir forte (dinheiro).

**A disciplina do estágio certo.** Acima de tudo, o time só chegou a essas técnicas **no fim** da jornada ([[92-De-100-a-1-milhao-de-usuarios]]), depois de esgotar servidor maior, cache e réplicas. Ana foi firme: "filas, sharding e microsserviços resolveram problemas **reais** que tínhamos **naquele** tamanho — se os tivéssemos adotado no MVP, teríamos afogado o projeto em complexidade sem necessidade". O "andar de cima" da escala, usado na hora certa.

Moral: filas, sharding e microsserviços levaram a SaborExpress ao topo da escala — a **fila** amorteceu a Black Friday e deu resiliência a panes; o **sharding** (último recurso) distribuiu as escritas; os **microsserviços** deixaram cada parte escalar sozinha. O preço foi a complexidade distribuída e a **consistência eventual**, que o time domou desenhando a experiência para tolerá-la e mantendo o dinheiro em consistência forte — e tudo aplicado **no estágio certo**, nunca cedo demais.

---

## 🏢 Como isso acontece em uma empresa

- **Filas são onipresentes em sistemas de porte.** Praticamente todo sistema grande usa filas (SQS, RabbitMQ, Kafka) para processamento assíncrono e desacoplamento. É um dos padrões mais universais da engenharia de back-end.
- **Kafka virou infraestrutura de dados.** O Apache Kafka cresceu de "fila" para uma plataforma de **streaming de eventos** que sustenta arquiteturas inteiras (event-driven), sendo central em muitas empresas de dados.
- **Sharding é evitado até ser inevitável.** Por sua complexidade, o sharding é a última carta. Muitas empresas adiam ao máximo (com hardware maior, cache, réplicas) e alguns bancos modernos ("distribuídos"/NewSQL) tentam automatizá-lo.
- **A moda dos microsserviços foi corrigida.** Depois de uma onda de "microsserviços para tudo", a indústria amadureceu: muitas empresas voltaram a monólitos bem organizados ("monólito modular") e adotam microsserviços com parcimônia, cientes do custo ([[59-Monolito-vs-Microsservicos]]).
- **Consistência eventual é aceita conscientemente.** Times distribuídos escolhem deliberadamente onde aceitar consistência eventual (a maioria dos casos) e onde exigir forte (dinheiro, estoque crítico). Entender esse trade-off é marca de senioridade.
- **Event-driven architecture é um paradigma inteiro.** Construir sistemas em torno de **eventos** que fluem por filas (em vez de chamadas diretas) é uma abordagem arquitetural madura para desacoplamento e escala.
- **Estas são competências de senioridade.** Dominar filas, particionamento, microsserviços e seus trade-offs (consistência, complexidade) distingue engenheiros seniores — e são temas frequentes em entrevistas de system design ([[111-O-processo-seletivo]]).

---

## ⚠️ Erros comuns

- **Adotar tudo cedo demais (escala prematura).** Filas, sharding e microsserviços num sistema pequeno = complexidade enorme para um problema inexistente. São o estágio final ([[92-De-100-a-1-milhao-de-usuarios]]).
- **Tornar tudo assíncrono.** Mandar para a fila até o que o usuário precisa confirmar na hora, criando UX confusa. Síncrono o essencial; assíncrono o que pode esperar.
- **Ignorar falhas do consumidor.** Não tratar mensagens que falham ao processar (retentativas, "dead letter queue"). Mensagens podem se perder ou repetir sem cuidado.
- **Assumir que a fila entrega "exatamente uma vez".** Muitas filas garantem "ao menos uma vez", podendo **duplicar** — o consumidor precisa ser **idempotente** (processar a mesma mensagem duas vezes sem estragar).
- **Shardar cedo ou pelo critério errado.** Particionar antes de precisar, ou por uma chave que gera shards desbalanceados (um shard com tudo). Sharding é caro e difícil de mudar depois.
- **Microsserviços sem observabilidade.** Distribuir o sistema sem tracing/logs centralizados ([[89-Logs-metricas-e-tracing]]) torna o diagnóstico um pesadelo.
- **Exigir consistência forte onde não precisa (ou eventual onde precisa forte).** Os dois extremos erram: consistência forte demais mata a escala; eventual no lugar errado corrompe dinheiro/estoque.
- **Microsserviços por moda.** Quebrar o sistema por status, não por necessidade real de escala/organização. O monólito modular resolve a maioria dos casos ([[59-Monolito-vs-Microsservicos]]).

---

## 💡 Dicas profissionais

- **Use filas para desacoplar e absorver picos.** Faça síncrono o essencial e assíncrono o resto (e-mail, notificações, processamento pesado). Ganha-se resposta rápida e resiliência.
- **Torne consumidores idempotentes.** Projete o processamento para tolerar mensagens duplicadas sem estragar — muitas filas entregam "ao menos uma vez".
- **Trate falhas na fila.** Configure retentativas e "dead letter queues" para mensagens que falham. Não deixe trabalho se perder silenciosamente.
- **Adie o sharding ao máximo.** Esgote hardware, cache e réplicas antes. Quando shardar, escolha a chave de partição com muito cuidado (balanceamento, consultas futuras).
- **Comece monólito; quebre por dor real.** Adote microsserviços quando a escala de uma parte ou a organização de times justificar — não por moda ([[59-Monolito-vs-Microsservicos]]).
- **Invista em observabilidade antes de distribuir.** Sem tracing e logs centralizados, um sistema distribuído é impossível de diagnosticar ([[89-Logs-metricas-e-tracing]]).
- **Decida conscientemente onde aceitar consistência eventual.** Eventual na maioria (e-mail, recomendações); forte onde é inegociável (dinheiro, estoque). Desenhe a UX para tolerar as janelas.
- **Lembre que é o andar de cima.** Essas técnicas resolvem problemas de escala real. Chegue a elas guiado por dados de gargalo, no estágio certo — nunca por antecipação.

---

## 🎈 Curiosidades

- O **Apache Kafka** foi criado no **LinkedIn** por volta de 2011 e batizado em homenagem ao escritor **Franz Kafka** — um dos engenheiros gostava de sua obra e achou apropriado para "um sistema otimizado para escrita". A ferramenta cresceu tanto que sustenta o fluxo de eventos de uma fração enorme das grandes empresas de tecnologia.
- O conceito de **idempotência** (processar a mesma operação várias vezes com o mesmo resultado) é tão importante em sistemas distribuídos que virou uma das perguntas favoritas de entrevistas. A analogia clássica: apertar o botão do elevador **uma** ou **cinco** vezes dá o mesmo resultado — ele é "idempotente"; já sacar dinheiro cinco vezes **não** é. Filas exigem consumidores idempotentes porque podem entregar a mesma mensagem mais de uma vez.
- O **teorema CAP** (Consistency, Availability, Partition tolerance), formulado por Eric Brewer, afirma que um sistema distribuído não pode garantir **as três** propriedades ao mesmo tempo quando há uma falha de rede — precisa escolher entre **consistência** e **disponibilidade**. É a base teórica de por que a **consistência eventual** existe: muitos sistemas escolhem ficar **disponíveis** (respondendo) aceitando ficar temporariamente inconsistentes.
- A **Amazon** publicou em 2007 um artigo sobre seu sistema **Dynamo** que popularizou a consistência eventual em larga escala e influenciou uma geração inteira de bancos NoSQL (Cassandra, DynamoDB). A decisão de priorizar "sempre disponível para comprar" sobre "sempre perfeitamente consistente" foi uma escolha de **negócio** (um carrinho de compras indisponível é receita perdida) que virou padrão técnico.
- Houve uma correção de rota famosa na indústria quando empresas que haviam quebrado tudo em microsserviços começaram a **voltar** para monólitos. O caso mais comentado foi o de um time da **Amazon Prime Video** que, em 2023, relatou ter reunido microsserviços de volta num monólito e **reduzido custos em 90%** — reacendendo o debate e reforçando que microsserviços não são "sempre melhores", mas uma escolha de trade-off.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Síncrono** | O usuário espera todo o processamento antes da resposta. |
| **Assíncrono** | Responder logo e fazer o trabalho pesado depois, em segundo plano. |
| **Fila de mensagens** | "Amortecedor" onde tarefas são depositadas e processadas depois. |
| **Produtor / consumidor** | Quem põe mensagens na fila / quem as processa (workers). |
| **Desacoplamento** | Tornar componentes independentes no tempo (um cai sem derrubar o outro). |
| **Idempotência** | Processar a mesma mensagem várias vezes sem estragar. |
| **Sharding** | Dividir os dados entre vários bancos para escalar escritas. |
| **Microsserviços** | Quebrar o sistema em serviços independentes que escalam sozinhos. |
| **Consistência eventual** | Os dados ficam corretos *em algum momento* (janela de inconsistência). |
| **Dead letter queue** | Fila para onde vão mensagens que falharam ao ser processadas. |

---

## 📝 Resumo

- Quando até as **escritas** saturam o sistema (o estágio final da escala — [[92-De-100-a-1-milhao-de-usuarios]]), entram três técnicas pesadas: **filas**, **sharding** e **microsserviços** — poderosas e complexas, reservadas para quando a carga realmente as exige.
- As **filas de mensagens** permitem o processamento **assíncrono**: o sistema faz só o essencial na hora (registra o pedido), responde ao usuário **imediatamente**, e joga o resto numa fila que um **consumidor** processa no seu ritmo. Ganhos: **desacoplamento**, **absorção de picos** (a fila é um amortecedor) e **resiliência** (se uma dependência cai, a mensagem espera e nada se perde).
- O **sharding** divide os dados entre **vários bancos** para escalar as escritas — mas é o **último recurso** (esgote otimização, cache e réplicas antes), pela complexidade de rotear dados e cruzar shards. Os **microsserviços** ([[59-Monolito-vs-Microsservicos]]) permitem escalar cada parte independentemente e times trabalharem sem colisão — ao custo de complexidade distribuída e forte necessidade de observabilidade ([[89-Logs-metricas-e-tracing]]).
- O preço incontornável da distribuição é a **consistência eventual**: os dados espalhados ficam temporariamente fora de sincronia e convergem **depois**. Domina-se isso **desenhando a experiência** para tolerar as janelas (e-mail, recomendações) e mantendo a consistência **forte** onde é inegociável (dinheiro, numa transação). Cuidado: consumidores devem ser **idempotentes** (filas podem duplicar mensagens).
- A mensagem que fecha o módulo de escala: estas são o **"andar de cima"** — aplicá-las cedo é **escala prematura**, complexidade sem o problema correspondente. Chegue a elas **guiado por dados de gargalo real**, depois de esgotar o simples. Escalar bem é resolver **o** problema que existe, **quando** existe.

---

## ☑️ Checklist de aprendizado

- [ ] Diferencio processamento síncrono de assíncrono.
- [ ] Explico como uma fila desacopla e absorve picos (produtor/consumidor).
- [ ] Entendo sharding e por que é o último recurso do banco.
- [ ] Sei por que microsserviços escalam partes independentes e seu custo.
- [ ] Explico consistência eventual e onde aceitá-la ou exigir consistência forte.
- [ ] Entendo que estas técnicas são o estágio final, não o ponto de partida.

---

## ✏️ Exercícios

**1.** Com a analogia da central de pedidos, explique como uma fila, o sharding e os microsserviços resolvem gargalos de escrita.

**2.** O que é processamento **assíncrono** e como uma fila traz, além de escala, **resiliência** contra a queda de uma dependência externa?

**3.** Por que o **sharding** é considerado o "último recurso" para escalar o banco? Que complexidade ele adiciona?

**4.** O que é **consistência eventual**? Dê um exemplo de onde aceitá-la e um de onde exigir consistência forte.

**5. (Reflexão)** A SaborExpress só adotou filas, sharding e microsserviços "no estágio certo, nunca cedo demais". Explique por que essas técnicas são o "andar de cima" da escala e o que teria acontecido se fossem adotadas no MVP.

---

## 💬 Respostas comentadas

**1.** Na central de pedidos por telefone: a **fila** é a **bandeja de "pedidos a processar"** — em vez de o atendente fazer tudo (anotar, cobrar, embalar, chamar entregador) com o cliente na linha (que esperaria uma eternidade e travaria tudo num pico), ele só anota o pedido, coloca na bandeja e diz "registrado!", liberando a linha na hora; uma equipe nos fundos processa a bandeja no seu ritmo, e um pico faz a bandeja **acumular** (amortecer) em vez de travar tudo — resolve o gargalo de fazer trabalho pesado de forma síncrona. O **sharding** é **dividir o fichário de clientes por letra** — quando uma gaveta única fica sobrecarregada com todos disputando-a, separa-se A-M numa sala e N-Z noutra, cada uma com seu arquivista, permitindo atendimento paralelo sem disputa — resolve o gargalo de escrita de um banco único. Os **microsserviços** são **departamentos especializados independentes** — em vez de um "faz-tudo" que se afoga cuidando de vendas, cobrança e entrega juntos, criam-se departamentos separados, cada um com sua equipe escalando independentemente (cobrança contrata 20 no pico, logística 5), comunicando-se por memorandos — resolve o gargalo de escalar e organizar tudo como um bloco só. O tema comum: distribuir trabalho e dados para que nenhuma peça única seja o limite, ao custo de coordenar partes separadas.

**2.** Processamento **assíncrono** é aceitar a requisição do usuário, **responder logo** ("pedido confirmado!") e fazer o trabalho pesado **depois**, em segundo plano — em vez de fazer tudo na hora com o usuário esperando (síncrono). A fila viabiliza isso guardando as tarefas a processar, que consumidores (workers) executam no seu ritmo. Além de escala (a resposta fica rápida e picos são amortecidos), a fila traz **resiliência** contra a queda de uma dependência externa da seguinte forma: imagine que processar um pedido exige chamar o gateway de pagamento externo, e esse gateway **cai** por 20 minutos. Num modelo **síncrono** sem fila, cada requisição que precisasse do gateway **falharia** na hora, e o usuário receberia um erro — os pedidos daquele período seriam perdidos. **Com** a fila, a tarefa "cobrar pagamento" fica **esperando** na fila enquanto o gateway está fora; quando ele **volta**, o consumidor pega a mensagem que ficou lá e a processa normalmente — **nada se perde**. A fila transforma uma **falha temporária** de uma dependência num mero **atraso** no processamento, invisível ou quase para o usuário (que vê no máximo um "processando" mais longo). O desacoplamento no tempo — o produtor não depende do consumidor estar disponível **naquele instante** — é o que dá essa robustez.

**3.** O **sharding** é o "último recurso" porque adiciona uma **complexidade** muito alta e difícil de reverter, então esgota-se todo o resto antes (otimizar queries e índices, cache, réplicas de leitura) e só se recorre a ele quando as **escritas** — que cache e réplicas de leitura **não** resolvem — realmente saturam um banco único. A complexidade que ele adiciona: (1) a aplicação precisa saber **em qual shard** cada dado está e **rotear** cada operação ao shard certo, o que complica a lógica de acesso a dados; (2) operações que **cruzam shards** ficam difíceis e lentas — um relatório que agrega dados de todas as regiões precisa consultar todos os shards e juntar os resultados, em vez de uma consulta simples num banco só; (3) escolher a **chave de particionamento** é uma decisão crítica e difícil de mudar depois — uma chave ruim gera shards **desbalanceados** (um shard com quase tudo, outros vazios), desperdiçando o esforço; (4) transações e garantias de consistência que atravessam shards tornam-se muito mais complexas. Por tudo isso, o sharding é evitado ao máximo — muitas empresas adiam com hardware maior e outras técnicas, e alguns bancos modernos tentam automatizá-lo — e só se aplica quando não há mais alternativa para a carga de escrita.

**4.** **Consistência eventual** é a garantia de que dados distribuídos (espalhados por filas, shards ou serviços com bancos próprios) ficarão **corretos em algum momento**, aceitando uma **janela temporária** em que estão fora de sincronia. Ou seja: logo após uma mudança, diferentes partes do sistema podem mostrar estados diferentes por um curto período, até **convergirem** para o estado correto. **Onde aceitá-la:** no envio do **e-mail de confirmação** e na atualização das **recomendações** de um pedido — se o e-mail sai 10 segundos depois e as recomendações se atualizam com um pequeno atraso, ninguém se prejudica; o ganho de escala e resiliência (processar isso assincronamente, via fila) compensa muito a defasagem. **Onde exigir consistência forte:** numa **transferência de dinheiro** ou na relação entre **debitar o pagamento e registrar o pedido** — aqui, os dados precisam mudar **juntos, no mesmo instante, de forma atômica** (tudo-ou-nada, numa transação — [[71-Confiabilidade-e-escala-do-banco]]), porque uma janela de inconsistência corromperia dinheiro (o cliente foi cobrado mas o pedido não existe, ou vice-versa) — um erro inaceitável. A decisão de arquitetura crucial é saber **onde** cada tipo se aplica: consistência eventual na maioria dos casos (ganhando escala), consistência forte nos poucos pontos onde a correção imediata é inegociável.

**5.** Essas técnicas são o "andar de cima" da escala porque resolvem os gargalos **mais avançados** (saturação de escrita, limites de um banco único, necessidade de escalar partes independentemente) ao custo de introduzir **complexidade distribuída** significativa: sistemas assíncronos com filas exigem tratar duplicação e falhas de mensagens (idempotência, dead letter queues); o sharding complica o acesso a dados e as consultas que cruzam partições; os microsserviços transformam chamadas simples em chamadas de rede que podem falhar, exigem observabilidade forte para diagnóstico, e trazem a **consistência eventual** com todas as suas sutilezas. Toda essa complexidade só **compensa** quando existe o problema de escala correspondente — uma carga que os métodos simples (servidor maior, cache, réplicas) não aguentam mais. Se a SaborExpress tivesse adotado filas, sharding e microsserviços **no MVP**, teria cometido o erro clássico da **escala prematura**: pagaria todo o custo da complexidade distribuída (meses de desenvolvimento, sistema difícil de depurar, necessidade de infraestrutura e observabilidade sofisticadas, bugs de consistência) para resolver um problema de escala que **não tinha** — com poucos usuários, um simples servidor único resolveria tudo com muito menos esforço. O resultado provável seria **afogar o projeto em complexidade** antes mesmo de validar o negócio: lentidão para entregar features, mais bugs, mais custo — possivelmente matando a empresa por excesso de engenharia, não por falta de escala. Por isso a disciplina de Ana ("chegamos a essas técnicas quando tínhamos os problemas **reais** que elas resolvem") é essencial: cada técnica de escala deve ser puxada **no estágio em que o gargalo correspondente realmente aperta**, guiada por dados de observabilidade — nunca por antecipação, moda ou medo. Escalar bem é resolver **o** problema que existe, **quando** ele existe.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[93-Cache-CDN-e-balanceador-de-carga]] — as alavancas de leitura que vêm antes destas.
- **Base:** [[92-De-100-a-1-milhao-de-usuarios]] (a jornada onde estas são o estágio final), [[59-Monolito-vs-Microsservicos]] e [[71-Confiabilidade-e-escala-do-banco]] (sharding, consistência).
- **Depende de:** [[89-Logs-metricas-e-tracing]] (observabilidade para sistemas distribuídos) e [[91-Alertas-incidentes-e-plantao-on-call]] (filas e resiliência).
- **Adiante:** [[99-Divida-tecnica-e-chaos-engineering]] — testar a resiliência desses sistemas distribuídos de propósito.

---

> 🧭 **Você está aqui:** Volume 4 → Módulo 28 → **Capítulo 94 de 119**.
