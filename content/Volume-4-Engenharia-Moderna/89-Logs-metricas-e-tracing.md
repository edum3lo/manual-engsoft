# Capítulo 89 — Logs, métricas e tracing ⭐

> **Volume 4 — Engenharia Moderna** · Módulo 27 — Observabilidade
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **observabilidade** e por que ela é vital em sistemas modernos.
- Diferenciar **monitoramento** (saber que algo está errado) de **observabilidade** (entender por quê).
- Compreender os **três pilares**: **logs, métricas e traces**, e o que cada um responde.
- Saber quando usar cada pilar e como eles se complementam.
- Entender conceitos como **correlação, cardinalidade e o custo da observabilidade**.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[84-O-que-e-DevOps]] (medição é um pilar do DevOps) e [[80-Construindo-a-API-da-SaborExpress]].
- Ajuda ter lido [[94-Filas-particionamento-e-microsservicos-na-pratica]] (por que sistemas distribuídos são difíceis de enxergar).

---

## 📖 Introdução

Seu sistema está no ar, rodando em containers na nuvem ([[87-O-que-e-computacao-em-nuvem]]), atendendo milhares de usuários. Mas surge uma pergunta angustiante: **você faz ideia do que está acontecendo lá dentro?** Diferente do código na sua máquina, onde você pode pausar e inspecionar tudo, um sistema em produção é uma **caixa-preta** distribuída por muitos servidores, processando requisições que você não vê. Quando um cliente diz "o app está lento" ou "meu pedido sumiu", como você **descobre o que houve** num sistema que você não consegue olhar diretamente? A resposta é a **observabilidade** — a capacidade de **enxergar** o que acontece dentro de um sistema a partir dos sinais que ele emite. É o tema deste capítulo e o coração do Módulo 27.

Há uma distinção fina mas importante logo de início. **Monitoramento** é saber que algo está **errado** — um alarme que dispara quando a CPU passa de 90% ou o site fica fora do ar. É reativo e responde perguntas que você **já sabia** fazer. **Observabilidade** vai além: é conseguir **entender por que** algo está errado, inclusive investigando problemas que você **nunca previu** — fazer perguntas novas ao sistema depois que ele já está rodando. Monitoramento te avisa que a casa está pegando fogo; observabilidade te permite descobrir **onde**, **como começou** e **por quê**, mesmo que seja um tipo de incêndio que você nunca imaginou. Num mundo de sistemas distribuídos e microsserviços ([[94-Filas-particionamento-e-microsservicos-na-pratica]]), onde uma requisição atravessa dezenas de serviços, a observabilidade deixou de ser luxo e virou necessidade de sobrevivência.

A observabilidade se apoia em **três pilares**, cada um respondendo a uma pergunta diferente: **logs** (o que **aconteceu** em cada momento — o registro detalhado dos eventos), **métricas** (quanto/quantos — os números agregados sobre a saúde do sistema ao longo do tempo), e **traces** (o caminho de **uma requisição** atravessando todos os serviços). Juntos, eles transformam a caixa-preta em algo transparente: as métricas te dizem **que** algo está anormal, os traces te mostram **onde** no fluxo, e os logs te contam **por que** naquele ponto. Este capítulo — marcado com ⭐ por ser central — explica cada pilar, o que responde, quando usá-lo, e como eles se complementam para você diagnosticar qualquer problema num sistema que você não consegue ver diretamente.

---

## 🧠 Analogia

Pense em como um **médico entende o que se passa dentro do corpo de um paciente** — um sistema complexo que ele não pode simplesmente "abrir e olhar".

O corpo humano é uma caixa-preta: o médico não vê os órgãos funcionando diretamente. Para diagnosticar, ele usa **três tipos de informação**, exatamente análogos aos três pilares da observabilidade:

- **O prontuário/diário de sintomas (logs):** o registro detalhado de **eventos** — "às 14h o paciente sentiu dor no peito", "às 15h tomou o remédio", "às 16h a febre subiu". Cada entrada é um **evento específico com hora e detalhes**. É rico e preciso, mas se você tiver milhares de entradas, é muito para ler tudo. Os **logs** são esse diário: o que aconteceu, quando, com detalhes.

- **Os sinais vitais monitorados (métricas):** os **números agregados** medidos continuamente — batimentos por minuto, temperatura, pressão. Você vê uma **tendência ao longo do tempo** ("a pressão vem subindo há uma hora") num painel, de relance. Não te dizem *por quê*, mas te mostram **rapidamente que algo está anormal** e **quanto**. As **métricas** são os sinais vitais: números que revelam a saúde geral e as tendências.

- **O contraste que segue uma substância pelo corpo (trace):** quando o médico injeta um contraste e acompanha, num exame de imagem, o **caminho** dele passando pelo coração, pelos rins, pelos vasos — vendo **onde** ele trava ou vaza. Isso mostra a **jornada através dos órgãos** e revela **em qual órgão** está o problema. O **trace** é esse contraste: segue uma requisição por todos os serviços e mostra onde ela travou.

Um bom diagnóstico usa os **três juntos**: os sinais vitais (métricas) disparam o alerta de que algo está errado e mostram a tendência; o contraste (trace) revela **em qual órgão/serviço** está o problema; e o diário de sintomas (logs) daquele momento e daquele órgão conta **o que exatamente** aconteceu. Guarde: observabilidade é o exame médico do seu sistema — sinais vitais para notar, contraste para localizar, prontuário para entender.

---

## 🧩 Conceitos fundamentais

### 1. Observabilidade vs. monitoramento

- **Monitoramento:** coletar e alertar sobre um conjunto **conhecido** de indicadores ("a CPU passou de 90%?"). Responde perguntas **pré-definidas**. É saber **que** algo está errado.
- **Observabilidade:** a propriedade de um sistema que permite **entender seu estado interno** a partir dos sinais que emite — inclusive investigar problemas **nunca previstos**, fazendo **perguntas novas**. É entender **por que** está errado.

> **Termo explicado — observabilidade:** a capacidade de compreender o que acontece dentro de um sistema a partir dos dados que ele emite (logs, métricas, traces), permitindo investigar até problemas não antecipados.

### 2. Pilar 1 — Logs (o que aconteceu)

**Logs** são registros **textuais e detalhados** de eventos que acontecem no sistema, cada um com timestamp e contexto ("[14:32:05] Pedido #1234 criado para usuário 88", "[14:32:06] ERRO: falha ao cobrar cartão"). São **ricos em detalhe** e ótimos para entender **o que exatamente** aconteceu num momento específico — mas volumosos e difíceis de agregar.

> **Termo explicado — log:** registro textual de um evento específico no sistema, com hora e detalhes; responde "o que aconteceu, exatamente, naquele instante?".

Boa prática moderna: **logs estruturados** (em formato como JSON, com campos consistentes) em vez de texto livre — assim podem ser filtrados e pesquisados por máquina.

### 3. Pilar 2 — Métricas (quanto/quantos)

**Métricas** são **números agregados** medidos ao longo do tempo: requisições por segundo, tempo de resposta médio, taxa de erro, uso de CPU/memória. São **leves e eficientes** (um número, não um texto), ótimas para **painéis** e **alertas**, e mostram **tendências** e a **saúde geral**. Mas não têm o detalhe de um evento individual — dizem "a taxa de erro subiu para 5%", não *por quê*.

> **Termo explicado — métrica:** valor numérico agregado ao longo do tempo (ex.: requisições/segundo, taxa de erro) que mostra a saúde e as tendências do sistema; responde "quanto? quantos? está normal?".

### 4. Pilar 3 — Traces (o caminho de uma requisição)

Um **trace** (rastreamento distribuído) acompanha **uma única requisição** enquanto ela atravessa **todos os serviços** do sistema, mostrando por onde passou e **quanto tempo** gastou em cada etapa. Num sistema de microsserviços ([[94-Filas-particionamento-e-microsservicos-na-pratica]]), onde uma requisição pode tocar dez serviços, o trace revela **em qual deles** está a lentidão ou o erro.

> **Termo explicado — trace (rastreamento distribuído):** o registro do caminho completo de uma requisição por todos os serviços, com o tempo em cada etapa; responde "por onde passou e onde travou?".

### 5. Como os três se complementam

Nenhum pilar sozinho basta; a força está na **combinação**:
- **Métricas** te alertam **que** algo está anormal (a taxa de erro subiu).
- **Traces** te mostram **onde** no fluxo está o problema (o serviço de pagamento está lento).
- **Logs** daquele serviço, naquele momento, te contam **por que** (a conexão com o gateway expirou).

> **Termo explicado — correlação:** ligar os três pilares (métrica → trace → log) por identificadores comuns (como um trace ID), para navegar de "algo está errado" até "aqui está a causa exata".

### 6. Cardinalidade e o custo da observabilidade

Observar tem **custo**: coletar, transmitir e **armazenar** logs/métricas/traces consome recursos e dinheiro — em sistemas grandes, muito dinheiro. Um conceito-chave é a **cardinalidade**: o número de valores distintos de um dado (ex.: "país" tem baixa cardinalidade; "ID de usuário" tem altíssima). Alta cardinalidade dá poder de investigação, mas **explode** o custo de armazenamento. Observabilidade é um equilíbrio entre **enxergar o suficiente** e **não falir** coletando tudo.

> **Termo explicado — cardinalidade:** a quantidade de valores únicos de um campo. Alta cardinalidade (ex.: IDs) permite investigar em detalhe, mas encarece muito o armazenamento dos dados de observabilidade.

---

## ⚙️ Como funciona na prática

Como a observabilidade funciona no dia a dia de um time:

**Instrumentar o código.** Para um sistema emitir sinais, ele precisa ser **instrumentado**: o código escreve **logs** nos pontos importantes, **incrementa métricas** (contadores, medições de tempo) e **propaga traces** (passando um "trace ID" de serviço a serviço). Bibliotecas e padrões como o **OpenTelemetry** (um padrão aberto para instrumentação) automatizam boa parte disso. Instrumentar bem é uma habilidade: logs úteis, métricas relevantes, traces completos — sem afogar tudo em ruído.

**Da caixa-preta ao diagnóstico (o fluxo real).** Quando algo dá errado, o engenheiro navega pelos três pilares em sequência: vê no **painel de métricas** que a latência disparou às 14h; abre os **traces** das requisições lentas daquele período e descobre que 90% do tempo é gasto no serviço de pagamento; abre os **logs** desse serviço naquele instante e lê "timeout ao conectar no gateway". Em minutos, saiu de "o app está lento" para "o gateway de pagamento está fora" — sem nunca "olhar dentro" do sistema diretamente. Essa navegação métrica→trace→log é a essência da observabilidade.

**Cada pilar para cada pergunta.** A regra prática:
- Precisa de um **panorama** da saúde, um alerta, uma tendência? → **métricas** (baratas, rápidas, agregadas).
- Precisa saber **onde** num fluxo distribuído está a lentidão/erro? → **traces**.
- Precisa do **detalhe exato** de um evento (a mensagem de erro, os valores)? → **logs**.
Usar o pilar errado (ex.: tentar entender uma tendência lendo milhões de logs) é ineficiente e caro.

**Escolher o que observar (o custo é real).** Não se coleta **tudo** — seria caro demais e viraria ruído. O time decide: quais métricas importam (as que refletem a experiência do usuário e a saúde), o que logar (eventos importantes, erros — não cada linha executada), o que traçar (fluxos críticos). Gerenciar o **volume e a cardinalidade** dos dados de observabilidade é uma disciplina — muitas empresas gastam fortunas com observabilidade mal calibrada.

**Observabilidade nasce do "você constrói, você opera".** Como no DevOps o desenvolvedor opera seu código ([[84-O-que-e-DevOps]]), ele tem **incentivo direto** para instrumentá-lo bem: logs e métricas ruins significam noites em claro tentando adivinhar o que quebrou. Bons engenheiros escrevem código **observável** desde o início — pensando em "como vou diagnosticar isto às 3h da manhã?" ([[91-Alertas-incidentes-e-plantao-on-call]]).

**A observabilidade alimenta tudo.** Os sinais coletados não servem só para apagar incêndios: alimentam os **alertas** e a resposta a incidentes ([[91-Alertas-incidentes-e-plantao-on-call]]), informam decisões de **escala** ([[92-De-100-a-1-milhao-de-usuarios]]), medem o impacto de **experimentos** ([[95-Software-guiado-por-hipoteses-e-dados]]) e as métricas **DORA** do DevOps ([[84-O-que-e-DevOps]]). É a base de dados sobre a qual a operação inteira decide.

---

## 🍔 Aplicação na SaborExpress

A observabilidade transformou a forma como a SaborExpress diagnostica problemas — do "adivinha o que houve" ao "sei exatamente onde e por quê". Acompanhe um incidente real.

**O passado às cegas.** Antes de investir em observabilidade, quando um cliente reclamava que "o app está lento", o time da SaborExpress ficava **às cegas**: Camila entrava nos servidores um por um, lia logs soltos de vários serviços tentando montar o quebra-cabeça, e frequentemente **não descobria** a causa — o problema "sumia" e voltava depois. Diagnosticar num sistema distribuído por dezenas de serviços ([[94-Filas-particionamento-e-microsservicos-na-pratica]]) sem ferramentas era quase impossível. Era **monitoramento** básico (um alerta de "site fora do ar"), sem **observabilidade**.

**A instrumentação.** O time instrumentou os serviços com os três pilares (usando OpenTelemetry e as ferramentas do [[90-As-ferramentas-de-observabilidade]]): **logs estruturados** (em JSON, pesquisáveis) nos eventos importantes, **métricas** de latência, taxa de erro e throughput por serviço, e **traces distribuídos** propagando um trace ID desde o toque do cliente até o banco. Cada requisição passou a deixar um rastro completo.

**O incidente do "pedido lento" (os três pilares em ação).** Numa tarde, os clientes começaram a reclamar de lentidão ao finalizar pedidos. Com observabilidade, o diagnóstico foi cirúrgico:
1. **Métricas:** Diego olhou o painel e viu que a **latência** do endpoint `POST /pedidos` ([[80-Construindo-a-API-da-SaborExpress]]) tinha saltado de 200ms para 4 segundos às 15h. As métricas gritaram **que** algo estava errado e **quando**.
2. **Traces:** ele abriu os **traces** das requisições lentas daquele horário. O trace mostrou o caminho da requisição pelos serviços e revelou que **90% dos 4 segundos** eram gastos no serviço de **cálculo de frete**, que chamava uma API externa de mapas. O trace apontou **onde**.
3. **Logs:** Camila abriu os **logs estruturados** do serviço de frete naquele instante e leu: "timeout ao chamar a API de mapas — o provedor está respondendo em 3.8s". Os logs contaram **por quê**.
Em **cinco minutos**, o time saiu de "o app está lento" para "a API de mapas externa está degradada, e nosso serviço de frete não tem timeout nem fallback". Corrigiram adicionando um timeout curto e um cálculo de frete aproximado como fallback.

**A correlação que amarra tudo.** O que tornou isso possível foi a **correlação**: o mesmo **trace ID** aparecia na métrica, no trace e nos logs, permitindo Camila **navegar** de um para o outro sem adivinhação. Sem essa correlação, os três pilares seriam ilhas desconexas; com ela, viraram um caminho contínuo do sintoma à causa.

**O custo que precisaram calibrar.** No início do entusiasmo, o time logou **tudo** e usou altíssima cardinalidade (um log por linha de código, métricas por ID de usuário). A conta de observabilidade **explodiu** — chegou a rivalizar com a conta de computação ([[87-O-que-e-computacao-em-nuvem]]). Aprenderam a calibrar: logar eventos importantes e erros (não cada linha), usar cardinalidade alta só onde a investigação compensa. A lição do **custo da observabilidade** — enxergar o suficiente sem falir.

Moral: a observabilidade tirou a SaborExpress da escuridão. Os três pilares, **correlacionados**, transformaram diagnósticos de horas de adivinhação (ou fracasso) em minutos de investigação cirúrgica: métricas para notar (**que** e **quando**), traces para localizar (**onde**), logs para entender (**por quê**). E o time aprendeu que observabilidade tem custo real, exigindo calibrar **o que** vale a pena enxergar.

---

## 🏢 Como isso acontece em uma empresa

- **Observabilidade é essencial em sistemas distribuídos.** Com microsserviços e nuvem, é impossível operar às cegas. Empresas maduras investem pesado em observabilidade — é infraestrutura crítica, não luxo.
- **A distinção monitoramento/observabilidade é levada a sério.** Times avançados falam em "observabilidade" (investigar o desconhecido) como evolução do "monitoramento" (alertar sobre o conhecido). O objetivo é responder perguntas que você **não sabia** que teria.
- **OpenTelemetry virou padrão.** É um projeto aberto que padronizou a instrumentação (logs, métricas, traces) independente de fornecedor, evitando lock-in nas ferramentas de observabilidade ([[90-As-ferramentas-de-observabilidade]]).
- **O custo de observabilidade é um problema real.** Contas de ferramentas como Datadog podem chegar a milhões e rivalizar com a de infraestrutura. "Otimização de observabilidade" (o que coletar, quanto reter, qual cardinalidade) é uma disciplina crescente.
- **"Você constrói, você opera" gera código observável.** Onde os devs operam seu código ([[84-O-que-e-DevOps]]), a instrumentação melhora naturalmente — ninguém quer diagnosticar às cegas o próprio serviço às 3h.
- **Os SLOs se baseiam em métricas.** Metas de confiabilidade (SLOs — [[91-Alertas-incidentes-e-plantao-on-call]]) são definidas e medidas via métricas de observabilidade. Sem observar, não há como saber se você cumpre suas metas.
- **Observabilidade orienta produto, não só operação.** Os mesmos dados que diagnosticam falhas alimentam decisões de produto e experimentos ([[95-Software-guiado-por-hipoteses-e-dados]], [[97-Metricas-de-produto-e-medicao-de-impacto]]).

---

## ⚠️ Erros comuns

- **Confundir monitoramento com observabilidade.** Ter só alertas de coisas conhecidas (CPU, site no ar) e achar que está coberto. Observabilidade é investigar o **imprevisto**.
- **Logar de menos (ou de mais).** Logs escassos deixam você às cegas num incidente; logs excessivos (cada linha) viram ruído caro onde a informação útil se perde. Equilíbrio.
- **Logs não estruturados.** Texto livre impossível de filtrar por máquina. Prefira logs estruturados (JSON com campos consistentes) para poder pesquisar.
- **Usar o pilar errado para a pergunta.** Tentar entender tendências lendo logs, ou achar a causa exata só com métricas. Cada pilar responde a uma pergunta diferente.
- **Não correlacionar os pilares.** Ter logs, métricas e traces isolados, sem um trace ID comum que permita navegar entre eles. A correlação é o que torna o diagnóstico rápido.
- **Ignorar o custo.** Coletar tudo com altíssima cardinalidade sem pensar na conta. Observabilidade mal calibrada custa fortunas ([[87-O-que-e-computacao-em-nuvem]]).
- **Não instrumentar (esperar quebrar para pensar nisso).** Adicionar observabilidade só depois de um incidente doloroso. Código deve nascer observável.
- **Alertar em tudo (fadiga de alerta).** Transformar cada métrica num alarme gera tanto ruído que os alertas reais são ignorados ([[91-Alertas-incidentes-e-plantao-on-call]]).

---

## 💡 Dicas profissionais

- **Escreva código observável desde o início.** Pense "como vou diagnosticar isto às 3h?" — bons logs, métricas relevantes, traces nos fluxos críticos. É parte de escrever bom código.
- **Use logs estruturados.** JSON com campos consistentes (trace ID, usuário, serviço) para poder filtrar e correlacionar. Texto livre é quase inútil em escala.
- **Aprenda a navegar métrica → trace → log.** Essa sequência (notar → localizar → entender) é o fluxo de diagnóstico. Domine-o.
- **Correlacione com um trace ID.** Propague um identificador comum por todos os pilares e serviços. É o fio que liga o sintoma à causa.
- **Use o pilar certo para cada pergunta.** Métricas para saúde/tendência/alerta; traces para localizar num fluxo; logs para o detalhe do evento.
- **Calibre o custo.** Colete o que agrega valor de diagnóstico; cuidado com cardinalidade alta e retenção longa. Enxergar o suficiente sem falir.
- **Adote OpenTelemetry.** O padrão aberto de instrumentação evita lock-in e facilita trocar de ferramenta ([[90-As-ferramentas-de-observabilidade]]).
- **Meça a experiência do usuário, não só a máquina.** CPU importa, mas latência e taxa de erro **do ponto de vista do usuário** importam mais. Observe o que ele sente.

---

## 🎈 Curiosidades

- O termo **"observabilidade"** vem da **teoria de controle**, da engenharia (anos 1960): um sistema é "observável" se você consegue inferir seu estado interno a partir de suas saídas externas. A comunidade de software pegou emprestado o conceito para descrever exatamente a mesma ideia — inferir o estado interno do software pelos sinais que ele emite.
- Os **três pilares** (logs, métricas, traces) foram popularizados por engenheiros de empresas como o **Twitter** e consolidados em livros e na comunidade de SRE. Há debates de que "três pilares" é uma simplificação e que a observabilidade real é mais sobre **explorar dados de alta cardinalidade** livremente — mas o modelo dos três pilares continua sendo a porta de entrada mais didática.
- O **rastreamento distribuído** (traces) foi tornado famoso por um artigo do **Google** de 2010 sobre um sistema interno chamado **Dapper**, que rastreava requisições através da imensa infraestrutura de microsserviços da empresa. Ele inspirou praticamente todas as ferramentas de tracing modernas (Zipkin, Jaeger).
- Existe uma frase clássica na área: **"esperança não é uma estratégia"** (hope is not a strategy), do livro de SRE do Google. Ela resume por que a observabilidade importa: você não pode **torcer** para que o sistema funcione — você precisa **enxergar** que ele funciona, com dados.
- O custo da observabilidade pode ser tão alto que virou piada e problema sério: há relatos de empresas cuja conta de ferramentas de observabilidade **superou** a conta da própria infraestrutura que estavam observando — o equivalente a gastar mais com o velocímetro do que com o carro. Isso gerou todo um movimento de "observabilidade com consciência de custo".

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Observabilidade** | Enxergar o estado interno do sistema pelos sinais que ele emite. |
| **Monitoramento** | Alertar sobre indicadores conhecidos (saber *que* algo está errado). |
| **Log** | Registro textual de um evento específico, com hora e detalhes. |
| **Log estruturado** | Log em formato pesquisável por máquina (ex.: JSON com campos). |
| **Métrica** | Número agregado ao longo do tempo (latência, taxa de erro, RPS). |
| **Trace** | O caminho de uma requisição por todos os serviços, com tempos. |
| **Correlação** | Ligar os três pilares por um identificador comum (trace ID). |
| **Instrumentar** | Adicionar ao código a emissão de logs, métricas e traces. |
| **OpenTelemetry** | Padrão aberto para instrumentação, independente de fornecedor. |
| **Cardinalidade** | Quantidade de valores únicos de um dado; alta encarece o armazenamento. |

---

## 📝 Resumo

- **Observabilidade** é a capacidade de **enxergar** o que acontece dentro de um sistema em produção — uma caixa-preta distribuída — a partir dos sinais que ele emite. É essencial em sistemas modernos (nuvem, microsserviços) que você não consegue olhar diretamente.
- Ela vai além do **monitoramento**: monitoramento é saber **que** algo conhecido está errado (um alerta pré-definido); observabilidade é entender **por que**, inclusive investigando problemas **nunca previstos** — fazer perguntas novas ao sistema.
- São **três pilares**, cada um respondendo a uma pergunta: **logs** (o que aconteceu, exatamente, num evento — detalhado, use estruturado), **métricas** (quanto/quantos, a saúde e as tendências — agregado, barato, para painéis e alertas), **traces** (o caminho de **uma** requisição pelos serviços — onde travou).
- A força está na **combinação correlacionada**: as **métricas** alertam **que** algo está anormal, os **traces** mostram **onde** no fluxo, e os **logs** contam **por quê** — navegados por um **trace ID** comum. Nenhum pilar sozinho basta.
- Observar tem **custo real** (coletar, transmitir, armazenar — a conta pode rivalizar com a da infraestrutura), governado pela **cardinalidade** dos dados. A disciplina é **enxergar o suficiente sem falir**: instrumentar bem, calibrar o volume, e escrever código **observável desde o início** — pensando em "como vou diagnosticar isto às 3h da manhã?".

---

## ☑️ Checklist de aprendizado

- [ ] Diferencio observabilidade de monitoramento.
- [ ] Explico o que cada pilar (log, métrica, trace) responde.
- [ ] Sei quando usar cada pilar conforme a pergunta.
- [ ] Entendo como os três se correlacionam para diagnosticar (métrica→trace→log).
- [ ] Sei o que significa instrumentar código e o papel do OpenTelemetry.
- [ ] Entendo o custo da observabilidade e o conceito de cardinalidade.

---

## ✏️ Exercícios

**1.** Com a analogia do médico, explique o que cada um dos três pilares (logs, métricas, traces) representa e o que responde.

**2.** Diferencie **monitoramento** de **observabilidade**. Por que a segunda é necessária em sistemas de microsserviços?

**3.** Um cliente relata que "o app está lento". Descreva como você usaria os três pilares, em sequência, para diagnosticar a causa.

**4.** O que é **cardinalidade** e por que ela se relaciona com o **custo** da observabilidade?

**5. (Reflexão)** No incidente do "pedido lento" da SaborExpress, o diagnóstico levou 5 minutos, mas no passado o time "ficava às cegas". Explique o que mudou, o papel da **correlação** entre os pilares, e por que nenhum pilar sozinho teria resolvido tão rápido.

---

## 💬 Respostas comentadas

**1.** Como um médico não pode "abrir e olhar" o corpo, ele usa três tipos de informação, análogos aos pilares: os **logs** são o **prontuário/diário de sintomas** — o registro detalhado de eventos específicos com hora ("às 14h dor no peito, às 15h tomou o remédio"); respondem "**o que** aconteceu, exatamente, naquele instante?". As **métricas** são os **sinais vitais monitorados** — números agregados medidos continuamente (batimentos, temperatura, pressão) que mostram tendências num painel; respondem "**quanto/quantos**? está anormal?" e mostram rapidamente que algo está errado, sem dizer por quê. O **trace** é o **contraste que segue uma substância pelo corpo** — acompanha o caminho de uma requisição passando por cada órgão/serviço e revela **em qual** deles está o problema; responde "**por onde** passou e **onde** travou?". Um bom diagnóstico usa os três: os sinais vitais (métricas) alertam, o contraste (trace) localiza o órgão, e o prontuário (logs) daquele órgão e momento explica o que houve.

**2.** **Monitoramento** é coletar e alertar sobre um conjunto **conhecido** de indicadores, respondendo perguntas **pré-definidas** ("a CPU passou de 90%?", "o site está no ar?") — é saber **que** algo está errado. **Observabilidade** é a capacidade de **entender o estado interno** do sistema a partir dos sinais que ele emite, permitindo investigar **por que** algo está errado, inclusive problemas que você **nunca previu** — fazer perguntas **novas** ao sistema depois que ele já está rodando. É necessária em sistemas de microsserviços porque, quando uma requisição atravessa dezenas de serviços independentes distribuídos pela nuvem, os problemas são **imprevisíveis** e emergem de **interações** que ninguém antecipou (um serviço lento que cascateia, uma dependência externa que degrada). Monitorar apenas indicadores conhecidos não basta — você precisa poder **explorar** o comportamento do sistema para diagnosticar falhas inéditas, num ambiente onde é impossível "olhar dentro" diretamente. Sem observabilidade, um time fica às cegas diante do inesperado, que é justamente o que mais acontece em sistemas distribuídos complexos.

**3.** Eu navegaria pelos três pilares em sequência (notar → localizar → entender): **(1) Métricas** — abro o painel e procuro **o que** está anormal e **quando**: vejo, por exemplo, que a latência do endpoint de finalizar pedido saltou de 200ms para 4s às 15h. As métricas confirmam que há um problema real e o localizam no tempo. **(2) Traces** — pego os **traces** das requisições lentas daquele horário para ver **onde** no fluxo está o gargalo: o trace mostra a requisição atravessando os serviços e revela que 90% do tempo é gasto num serviço específico (digamos, o de cálculo de frete, que chama uma API externa). O trace aponta o serviço culpado. **(3) Logs** — abro os **logs estruturados** daquele serviço, naquele instante exato, para entender **por quê**: leio, por exemplo, "timeout ao chamar a API de mapas — respondendo em 3.8s". Em minutos, saí de "o app está lento" (sintoma vago) para "a API de mapas externa está degradada e nosso serviço não tem timeout" (causa exata e acionável), sem nunca olhar o sistema diretamente — apenas seguindo os sinais que ele emite.

**4.** **Cardinalidade** é a quantidade de **valores distintos** que um campo pode ter. Um campo como "país" tem **baixa** cardinalidade (poucas dezenas de valores possíveis); um campo como "ID de usuário" tem **altíssima** cardinalidade (milhões de valores únicos). Ela se relaciona com o **custo** da observabilidade porque, quanto **mais alta** a cardinalidade dos dados que você coleta, mais **poder de investigação** você tem (pode filtrar por usuário individual, por exemplo), mas também mais **caro** fica **armazenar e processar** esses dados — cada combinação distinta de valores precisa ser guardada separadamente, e o volume **explode** com a cardinalidade. Coletar métricas com dimensões de alta cardinalidade (por ID de usuário, por sessão) pode multiplicar por milhões o custo de armazenamento. Por isso a observabilidade é um **equilíbrio**: alta cardinalidade onde a capacidade de investigar em detalhe realmente compensa, e baixa onde um panorama agregado basta — enxergar o suficiente sem que a conta de observabilidade "estoure" (chegando, em casos reais, a rivalizar com a conta da própria infraestrutura).

**5.** O que mudou foi que a SaborExpress passou de um **monitoramento** básico (só um alerta de "site fora do ar") e logs soltos e desconexos para uma **observabilidade** completa: os serviços foram **instrumentados** com os três pilares — logs estruturados, métricas por serviço e traces distribuídos. Antes, sem essas ferramentas, Camila entrava servidor por servidor tentando montar o quebra-cabeça de logs isolados num sistema de dezenas de serviços, e frequentemente **falhava**. O papel crucial da **correlação** foi o que tornou o diagnóstico de 5 minutos possível: o mesmo **trace ID** aparecia na métrica, no trace e nos logs, permitindo ao time **navegar** de um pilar ao outro sem adivinhação — da métrica que apontou "latência alta às 15h", ao trace que localizou "90% do tempo no serviço de frete", ao log que explicou "timeout na API de mapas". Nenhum pilar **sozinho** teria resolvido tão rápido: só as **métricas** dariam "está lento" mas não onde nem por quê; só os **traces** mostrariam "o serviço de frete é lento" mas não a causa exata; só os **logs** dariam o detalhe mas você não saberia **quais** dos milhões de logs ler sem antes localizar o serviço e o momento. É a **combinação correlacionada** — cada pilar respondendo sua pergunta (que/quando → onde → por quê) e ligados por um identificador comum — que transforma horas de adivinhação (ou fracasso) em minutos de investigação cirúrgica.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[90-As-ferramentas-de-observabilidade]] — Grafana, Prometheus, Sentry, Datadog: onde os três pilares vivem.
- **Aplicação:** [[91-Alertas-incidentes-e-plantao-on-call]] — os alertas e a resposta a incidentes que a observabilidade alimenta.
- **Base:** [[84-O-que-e-DevOps]] (medição é pilar do DevOps) e [[94-Filas-particionamento-e-microsservicos-na-pratica]] (por que sistemas distribuídos precisam tanto de observabilidade).
- **Adiante:** [[95-Software-guiado-por-hipoteses-e-dados]] e [[97-Metricas-de-produto-e-medicao-de-impacto]] — os mesmos dados guiando o produto.

---

> 🧭 **Você está aqui:** Volume 4 → Módulo 27 → **Capítulo 89 de 119**.
