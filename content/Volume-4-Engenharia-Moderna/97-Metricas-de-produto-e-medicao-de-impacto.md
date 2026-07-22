# Capítulo 97 — Métricas de produto e medição de impacto

> **Volume 4 — Engenharia Moderna** · Módulo 29 — Engenharia Experimental
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender por que **medir o impacto** do que você entrega é essencial (não só entregar).
- Conhecer as principais **métricas de produto**: aquisição, ativação, retenção, receita, engajamento.
- Compreender a diferença entre **métricas de vaidade** e **métricas acionáveis**.
- Entender conceitos: **North Star Metric, funil, coorte** e a **Lei de Goodhart**.
- Reconhecer os perigos de otimizar métricas cegamente (obsessão por métrica).

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[95-Software-guiado-por-hipoteses-e-dados]] e [[96-AB-testing-e-feature-flags]].
- Ajuda ter lido [[89-Logs-metricas-e-tracing]] (medir tecnicamente).

---

## 📖 Introdução

Os dois capítulos anteriores te deram a mentalidade (testar hipóteses — [[95-Software-guiado-por-hipoteses-e-dados]]) e as ferramentas (A/B, flags — [[96-AB-testing-e-feature-flags]]) da engenharia experimental. Mas tudo isso depende de uma coisa: **saber o que medir**. Um teste A/B compara uma **métrica**; uma hipótese prevê um efeito numa **métrica**. Este capítulo, que fecha o módulo, é sobre as **métricas de produto** — os números que dizem se o que você construiu realmente **funcionou** para o negócio e para os usuários — e sobre a arte, mais difícil do que parece, de escolher e interpretar as métricas **certas**.

A pergunta de fundo é a que abre o Módulo 29: você entregou uma feature — **e daí?** Ela foi usada? Fez os usuários voltarem? Gerou receita? Ou foi só código que ninguém tocou? Sem medir o **impacto**, você trabalha no escuro, e "entregar features" vira um fim em si mesmo, desconectado de gerar valor. As métricas de produto respondem a essas perguntas, e se organizam em categorias que todo engenheiro deve reconhecer — muitas resumidas no framework **"AARRR" (métricas pirata)**: **Aquisição** (quantos chegam), **Ativação** (quantos têm a primeira boa experiência), **Retenção** (quantos voltam), **Receita** (quanto pagam) e **Referência** (quantos indicam). Some a isso **engajamento** e você tem o vocabulário para conversar sobre a saúde de qualquer produto.

Mas há uma armadilha traiçoeira, e ela é o coração deste capítulo: **nem toda métrica é útil, e otimizar a métrica errada faz mal**. Existem **métricas de vaidade** — números que sobem e fazem você se sentir bem (total de downloads, total de usuários cadastrados) mas que **não guiam decisões** nem refletem valor real. E existe a **Lei de Goodhart**: *"quando uma métrica vira meta, ela deixa de ser uma boa métrica"* — porque as pessoas passam a otimizar o **número**, não o **objetivo real** por trás dele, às vezes causando dano (aumentar "tempo no app" com truques manipulativos, por exemplo). Escolher **poucas métricas certas** (idealmente uma **North Star**), distinguir vaidade de valor, e manter o **julgamento humano** sobre os números — sem virar escravo deles — é o que separa a medição madura da obsessão cega. Este capítulo te dá esse discernimento, fechando a tríade da engenharia experimental: hipótese, experimento e **medida**.

---

## 🧠 Analogia

Pense na diferença entre **os instrumentos do painel de um avião** e escolher **o instrumento errado para pilotar**.

Um piloto tem dezenas de instrumentos, mas nem todos merecem a mesma atenção — e olhar o **errado** pode ser fatal. Imagine dois pilotos:

- **O piloto sábio** foca nos instrumentos que realmente importam para **chegar ao destino com segurança**: altitude, velocidade, combustível, rumo. Cada um desses é **acionável** — se a altitude cai, ele age; se o combustível baixa, ele planeja um pouso. Ele tem uma métrica-mestra ("estou no rumo certo para o destino, com combustível suficiente?") que integra as outras. Esses são as **métricas acionáveis** e a **North Star**.

- **O piloto ingênuo** se fixa num instrumento que **sobe bonito mas não ajuda a pilotar**: por exemplo, o **número total de quilômetros já voados na vida do avião** — um número que só cresce, que dá uma sensação boa de "estamos indo longe!", mas que **não diz nada** sobre se ele está no rumo certo **agora**. Essa é a **métrica de vaidade**: cresce sempre, agrada o ego, mas não guia nenhuma decisão.

E há o perigo final, a **Lei de Goodhart**: suponha que a companhia decida premiar o piloto por **"economia de combustível"**. Se ele otimizar **cegamente** esse número, pode fazer coisas perigosas — voar baixo demais, cortar margens de segurança — batendo a meta do combustível **enquanto compromete o objetivo real** (chegar vivo). A métrica que virou meta deixou de servir ao propósito e passou a ser gamificada, às vezes com dano.

Guarde: métricas de produto são o painel do seu avião — foque nos instrumentos **acionáveis** que guiam ao destino (não nos números de vaidade que só agradam), tenha uma métrica-mestra (North Star), e nunca otimize um número **cegamente** a ponto de trair o objetivo que ele deveria representar.

---

## 🧩 Conceitos fundamentais

### 1. Por que medir impacto

Entregar uma feature não é o fim — o fim é **gerar valor**. Medir o **impacto** (a feature foi usada? melhorou uma métrica de negócio?) é o que fecha o ciclo do aprendizado ([[95-Software-guiado-por-hipoteses-e-dados]]) e conecta o trabalho de engenharia ao **resultado real**. Sem medir, "produtividade" vira "quantidade de features", desconectada de valor.

> **Termo explicado — medição de impacto:** avaliar, por dados, se o que foi entregue realmente atingiu o objetivo (uso, retenção, receita), em vez de assumir que "entregar" já é sucesso.

### 2. O funil AARRR (métricas pirata)

Um framework clássico organiza as métricas na **jornada** do usuário:
- **Aquisição:** como as pessoas **chegam** (visitas, downloads).
- **Ativação:** a **primeira boa experiência** (completou o cadastro, fez o primeiro pedido).
- **Retenção:** as pessoas **voltam** (usuários ativos recorrentes).
- **Receita:** as pessoas **pagam** (conversão, ticket médio).
- **Referência:** as pessoas **indicam** (convites, compartilhamentos).

> **Termo explicado — AARRR (funil pirata):** Aquisição, Ativação, Retenção, Receita, Referência — as cinco fases da jornada do usuário, cada uma com suas métricas.

### 3. Métrica de vaidade vs. métrica acionável

- **Métrica de vaidade:** um número que **sobe e agrada** mas **não guia decisões** — total acumulado de downloads, total de cadastros. Impressiona, mas não diz o que fazer.
- **Métrica acionável:** um número ligado a uma **causa** e a uma **ação** — taxa de conversão, retenção em 30 dias. Quando muda, você sabe **o que** melhorou/piorou e **o que fazer**.

> **Termo explicado — métrica de vaidade vs. acionável:** vaidade é um número que sobe e agrada mas não orienta decisões (ex.: total de downloads); acionável é um número ligado a causa e ação (ex.: retenção), que guia o que fazer.

### 4. North Star Metric

A **North Star Metric** (métrica-estrela-guia) é a **única** métrica que melhor captura o **valor central** que o produto entrega ao usuário — a que o time inteiro se alinha. Ex.: para o Airbnb, "noites reservadas"; para o Spotify, "tempo de música ouvida". Uma boa North Star reflete valor **real** ao usuário, não só receita, e evita que times otimizem métricas conflitantes.

> **Termo explicado — North Star Metric:** a métrica única que melhor representa o valor central entregue ao usuário, servindo de norte para alinhar todo o time.

### 5. Funil e coorte

- **Funil:** a análise de quantos usuários passam de uma etapa à seguinte (ex.: 100 visitam → 40 cadastram → 20 pedem). Revela **onde** as pessoas desistem (o gargalo do funil).
- **Coorte (cohort):** um grupo de usuários que compartilham um evento no tempo (ex.: "quem se cadastrou em janeiro"), acompanhado ao longo do tempo. A **análise de coorte** revela retenção real — se os usuários de cada mês continuam voltando.

> **Termo explicado — funil e coorte:** funil mostra onde os usuários desistem entre etapas; coorte acompanha um grupo ao longo do tempo (ex.: retenção mês a mês dos que entraram juntos).

### 6. A Lei de Goodhart e a obsessão por métrica

**Lei de Goodhart:** *"quando uma medida se torna uma meta, ela deixa de ser uma boa medida"*. Ao transformar uma métrica em alvo, as pessoas otimizam o **número**, não o **objetivo real** — às vezes gamificando ou causando dano (aumentar "cliques" com iscas, "tempo no app" com truques). Métricas devem **informar** o julgamento, nunca substituí-lo cegamente.

> **Termo explicado — Lei de Goodhart:** quando uma métrica vira meta, perde valor como métrica, pois as pessoas passam a otimizar o número em si — inclusive de formas que traem o objetivo que ele deveria medir.

---

## ⚙️ Como funciona na prática

Como as métricas de produto são usadas com maturidade:

**Escolher poucas métricas certas.** O erro do iniciante é medir **tudo** e afogar-se em números. A prática madura é escolher **poucas** métricas que importam: idealmente uma **North Star** (o valor central) e um pequeno conjunto de métricas de suporte (o funil AARRR). Menos métricas, bem escolhidas, guiam melhor que dezenas de painéis que ninguém interpreta ([[89-Logs-metricas-e-tracing]]). "O que, se melhorasse, mais aproximaria o produto do seu propósito?" — essa pergunta encontra a North Star.

**Retenção é a métrica que mais importa (quase sempre).** Entre todas, a **retenção** costuma ser a mais reveladora de saúde real. Aquisição sem retenção é um "balde furado" — você atrai usuários que somem. Um produto que **retém** tem valor real (as pessoas voltam); um que só **adquire** está gastando para encher um balde que vaza. Por isso a **análise de coorte** (retenção mês a mês) é uma das ferramentas mais valiosas de produto.

**Cuidado com a vaidade.** Números como "1 milhão de downloads" ou "500 mil cadastros" impressionam em apresentações mas **enganam**: um milhão de downloads com 2% de retenção é um fracasso disfarçado de sucesso. A pergunta que desmascara a vaidade: "esse número me diz **o que fazer** a seguir?". Se não, é vaidade. Prefira **taxas** (conversão, retenção %) e **coortes** a **totais acumulados**.

**Otimizar sem cair na obsessão (Goodhart).** O maior perigo da cultura de métricas é otimizar um número **cegamente**, ignorando o objetivo real por trás dele. Exemplos reais: maximizar "tempo no app" pode levar a designs viciantes que prejudicam o usuário; maximizar "tickets fechados" no suporte pode fazer atendentes fecharem chamados sem resolver. O antídoto: usar **métricas de contra-peso (guardrail)** — uma métrica secundária que **não pode piorar** enquanto você otimiza a principal (ex.: aumentar conversão **sem** aumentar cancelamentos). E lembrar que a métrica é um **proxy** do objetivo, não o objetivo em si.

**Métricas informam, o julgamento decide.** Fechando o módulo: dados são poderosos, mas **não substituem** o julgamento humano ([[95-Software-guiado-por-hipoteses-e-dados]]). Uma métrica pode subir por razões erradas (o efeito novidade — [[96-AB-testing-e-feature-flags]]), pode ignorar o que não se mede (a satisfação de longo prazo), e nunca decide questões de **ética e visão**. O engenheiro maduro usa métricas como **bússola**, cruzando-as com pesquisa qualitativa ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) e bom senso — não como piloto automático.

**Conectando ao negócio.** As métricas de produto ligam-se às métricas de **negócio** (CAC, LTV, churn — que você verá em [[106-As-metricas-do-negocio]] no Volume 5) e às de **confiabilidade** (SLOs — [[91-Alertas-incidentes-e-plantao-on-call]]). Um bom engenheiro entende que seu código afeta esses números, e que "impacto" significa mover as métricas que importam para o **usuário** e para o **negócio** — não apenas fechar tarefas.

---

## 🍔 Aplicação na SaborExpress

A SaborExpress amadureceu na forma de medir — saindo das métricas de vaidade para as que realmente guiavam o negócio, e aprendendo a não virar escrava dos números. Acompanhe.

**A armadilha da vaidade.** No início, a SaborExpress se orgulhava de "**500 mil downloads do app**" — um número que Ana exibia a investidores. Mas quando o time olhou a **retenção** por **coorte**, a realidade era dura: dos que baixavam, só **8%** faziam um segundo pedido em 30 dias. O "balde estava furado" — gastavam em marketing (aquisição) para atrair usuários que **sumiam**. Os 500 mil downloads eram uma **métrica de vaidade** que mascarava o problema real. A verdade só apareceu quando olharam a métrica **acionável** (retenção), não o total que agradava o ego.

**A North Star que alinhou o time.** O time definiu sua **North Star Metric**: **"pedidos entregues por semana"** — o número que melhor captura o **valor central** que a SaborExpress entrega (gente comendo o que pediu, restaurantes vendendo). Não escolheram "receita" (poderia incentivar cobrar caro demais e afastar usuários) nem "downloads" (vaidade), mas a métrica que reflete valor **real** para clientes **e** restaurantes. Todo o time passou a se alinhar por ela: cada feature era avaliada por "isso aumenta pedidos entregues por semana?".

**O funil que revelou o gargalo.** Analisando o **funil** (aquisição → ativação → retenção → receita), o time descobriu **onde** perdia usuários: muita gente baixava e cadastrava (aquisição alta), mas **desistia antes do primeiro pedido** (ativação baixa) — travava na tela de endereço, confusa. Consertaram a **ativação** (simplificando o cadastro de endereço — [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]), e a métrica que mais movia a North Star melhorou. O funil apontou o gargalo exato, como na jornada de escala apontava o gargalo técnico ([[92-De-100-a-1-milhao-de-usuarios]]).

**A obsessão por métrica que evitaram (Goodhart).** Um gerente de crescimento propôs otimizar "**tempo médio no app**", achando que mais tempo = mais engajamento. Mas Bruno alertou: otimizar isso **cegamente** poderia levar a designs que **prendem** o usuário (notificações excessivas, telas confusas de propósito para ele "explorar mais") — o oposto da boa UX ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]). Pior: para um app de **delivery**, o cliente ideal pede rápido e sai satisfeito — muito tempo no app pode significar **frustração** (não achou o que queria)! A **Lei de Goodhart** em ação: a métrica "tempo no app", se virasse meta, trairia o objetivo real (clientes satisfeitos pedindo). Descartaram-na como North Star.

**Métricas de guardrail.** Ao rodar experimentos ([[96-AB-testing-e-feature-flags]]) para aumentar a conversão, o time sempre acompanhava uma **métrica de contra-peso**: a **taxa de cancelamento** e a **satisfação**. Uma vez, um teste aumentou a conversão em 5%, mas o guardrail mostrou que os **cancelamentos** subiram junto (o botão "confantava" as pessoas a pedir sem querer). O ganho era **falso** — descartaram. O guardrail impediu que otimizassem um número às custas de outro que importava mais.

**Julgamento sobre os números.** Acima de tudo, o time aprendeu a **não** virar escravo das métricas. Quando os dados de um experimento eram ambíguos, cruzavam com **pesquisa qualitativa** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) — conversas reais com usuários. E decisões de **ética** (não usar dark patterns) e **visão** (investir numa expansão ousada) foram tomadas por **julgamento**, não por planilha. Ana resumiu: "as métricas são nossa bússola, não nosso piloto automático — elas dizem **onde** estamos, mas **para onde ir** ainda exige cabeça humana".

Moral: a SaborExpress trocou a vaidade (500 mil downloads) por métricas acionáveis (retenção, funil), alinhou-se por uma **North Star** que reflete valor real (pedidos entregues por semana), e escapou da obsessão por métrica (a Lei de Goodhart com o "tempo no app") usando guardrails e julgamento. Aprendeu que medir impacto é essencial — mas que as métricas **informam** as decisões, sem nunca substituir o discernimento humano.

---

## 🏢 Como isso acontece em uma empresa

- **Empresas modernas são obcecadas por métricas de produto — no bom e no mau sentido.** Times de produto vivem de dashboards de aquisição, retenção e receita. A boa medição é competência central de PMs e cada vez mais de engenheiros.
- **A North Star Metric é prática difundida.** Muitas empresas de tecnologia definem publicamente sua métrica-estrela para alinhar milhares de pessoas. Escolher a North Star certa é uma decisão estratégica de alto nível.
- **Retenção é reconhecida como a métrica-rainha.** Investidores e fundadores repetem que "retenção é tudo" — um produto que retém tem valor; um que só adquire está furado. A análise de coorte é ferramenta padrão.
- **A Lei de Goodhart é uma lição dura e recorrente.** Casos famosos de métricas gamificadas (redes sociais otimizando engajamento às custas do bem-estar, sistemas de metas que incentivam trapaça) tornaram o alerta de Goodhart amplamente conhecido e temido.
- **Métricas de guardrail são padrão em experimentação.** Times maduros de A/B testing sempre definem métricas de contra-peso que não podem piorar — para não otimizar uma coisa destruindo outra ([[96-AB-testing-e-feature-flags]]).
- **Métricas de vaidade ainda seduzem.** Apesar do conhecimento, "números grandes que impressionam" continuam sendo usados em pitches e relatórios — a disciplina de preferir métricas acionáveis exige esforço constante.
- **Ética das métricas é debate crescente.** A percepção de que otimizar métricas de engajamento pode causar dano social real (vício, polarização) trouxe a ética da medição para o centro do debate da indústria ([[101-LGPD-e-privacidade]], [[104-IA-para-engenharia-e-uso-responsavel]]).

---

## ⚠️ Erros comuns

- **Confundir "entregar" com "gerar impacto".** Medir produtividade por features entregues, sem verificar se elas moveram alguma métrica de valor. Entregar não é o fim.
- **Cair nas métricas de vaidade.** Celebrar totais acumulados (downloads, cadastros) que sobem sempre mas não guiam decisões. Prefira taxas e coortes.
- **Medir tudo e não decidir nada.** Afogar-se em dezenas de métricas sem foco. Poucas métricas certas (North Star + suporte) guiam melhor.
- **Ignorar a retenção.** Focar só em aquisição enquanto o balde vaza. Sem retenção, atrair usuários é jogar dinheiro fora.
- **Otimizar uma métrica cegamente (Goodhart).** Perseguir um número ignorando o objetivo real, gamificando ou causando dano. A métrica é proxy, não fim.
- **Não usar métricas de guardrail.** Otimizar a métrica principal sem vigiar se outra importante piora. Ganhos "falsos" que destroem valor em outro lugar.
- **Deixar a métrica substituir o julgamento.** Tratar dados como piloto automático, ignorando contexto, qualitativo, efeito novidade, ética. Dados informam; humanos decidem.
- **Escolher a North Star errada.** Uma North Star baseada só em receita (não em valor ao usuário) leva o time a decisões míopes e predatórias.

---

## 💡 Dicas profissionais

- **Meça o impacto, não só a entrega.** Depois de lançar, pergunte "e daí? isso moveu a métrica que importa?". Conectar seu trabalho ao resultado te torna um engenheiro muito mais valioso.
- **Escolha poucas métricas certas.** Uma North Star (o valor central) e um funil de suporte. Menos números, bem escolhidos, guiam melhor que muitos painéis.
- **Priorize a retenção.** É a melhor prova de valor real. Use análise de coorte para ver se os usuários realmente voltam.
- **Desconfie de métricas de vaidade.** Pergunte "esse número me diz o que fazer?". Se não, é vaidade. Prefira taxas e coortes a totais acumulados.
- **Sempre use métricas de guardrail.** Ao otimizar algo, defina o que **não pode piorar** (cancelamento, satisfação). Evita ganhos falsos que destroem valor.
- **Lembre da Lei de Goodhart.** A métrica é um proxy do objetivo, não o objetivo. Não a otimize cegamente a ponto de traí-lo.
- **Cruze quantitativo com qualitativo.** Números dizem **o quê**; conversas com usuários dizem **por quê** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]). Use os dois.
- **Mantenha o julgamento no comando.** Métricas são bússola, não piloto automático. Ética, visão e contexto exigem cabeça humana.

---

## 🎈 Curiosidades

- O framework **AARRR** foi criado por **Dave McClure**, um investidor do Vale do Silício, que o apelidou de **"métricas pirata"** simplesmente porque a sigla, lida em voz alta, soa como o grunhido estereotipado de um pirata: "**AARRR!**". Um nome memorável que ajudou o framework a se espalhar.
- A **Lei de Goodhart** foi formulada pelo economista britânico **Charles Goodhart** em 1975, originalmente sobre política monetária, mas sua versão popular ("quando uma medida vira meta, deixa de ser boa medida") aplica-se a quase tudo. Um exemplo histórico brutal: na União Soviética, fábricas de pregos medidas por **quantidade** produziam milhões de preguinhos inúteis; quando mudaram a meta para **peso**, produziam poucos pregos gigantes e igualmente inúteis. A métrica gamificada trai o objetivo.
- A ideia de **"North Star Metric"** foi popularizada pela comunidade de "growth hacking" e por empresas como o **Facebook**, cuja North Star nos primeiros anos teria sido algo como "usuários que adicionam 7 amigos em 10 dias" — descoberto por análise de dados como o ponto em que um novo usuário "engatava" e passava a ficar. Encontrar esse "momento aha" virou uma busca central do design de produtos.
- O conceito de **retenção como métrica-rainha** ganhou um apoio famoso do investidor Andrew Chen e de análises que mostraram que a diferença entre apps que "explodem" e apps que "somem" quase nunca está na **aquisição** (todos conseguem downloads com marketing), mas na **retenção** — a capacidade de fazer as pessoas voltarem. "Retention is the single most important thing for growth" virou mantra.
- Um dos exemplos mais debatidos da **ética das métricas** é o das redes sociais que otimizaram "tempo de tela" e "engajamento": documentos internos vazados de várias empresas revelaram que maximizar esses números levava a algoritmos que promoviam conteúdo que causava indignação e vício — mostrando, em escala global, como otimizar a métrica errada (Goodhart) pode ter consequências sociais graves, e alimentando o debate sobre uma tecnologia mais responsável.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Métrica de produto** | Número que mede se o produto entrega valor (uso, retenção, receita). |
| **Medição de impacto** | Avaliar por dados se o que foi entregue atingiu o objetivo. |
| **AARRR** | Aquisição, Ativação, Retenção, Receita, Referência (funil pirata). |
| **Métrica de vaidade** | Número que sobe e agrada mas não guia decisões (ex.: downloads). |
| **Métrica acionável** | Número ligado a causa e ação (ex.: retenção, conversão). |
| **North Star Metric** | A métrica única que captura o valor central do produto. |
| **Funil** | Análise de quantos usuários passam de uma etapa à seguinte. |
| **Coorte (cohort)** | Grupo de usuários acompanhado ao longo do tempo (ex.: retenção). |
| **Retenção** | Quantos usuários voltam ao produto (a "métrica-rainha"). |
| **Lei de Goodhart** | Quando uma métrica vira meta, deixa de ser boa métrica. |
| **Métrica de guardrail** | Métrica de contra-peso que não pode piorar ao otimizar outra. |

---

## 📝 Resumo

- Entregar uma feature não é o fim — o fim é **gerar valor**, e só se sabe **medindo o impacto** (a feature foi usada? moveu uma métrica de negócio?). Sem medir, "produtividade" vira "quantidade de features", desconectada de valor.
- As **métricas de produto** se organizam no funil **AARRR**: **Aquisição** (quem chega), **Ativação** (primeira boa experiência), **Retenção** (quem volta), **Receita** (quem paga), **Referência** (quem indica) — mais engajamento. A **retenção** é quase sempre a mais reveladora (aquisição sem retenção é um "balde furado").
- Distinga **métricas de vaidade** (sobem e agradam, mas não guiam decisões — total de downloads) de **métricas acionáveis** (ligadas a causa e ação — retenção, conversão). O teste: "esse número me diz **o que fazer**?". Prefira **taxas e coortes** a totais acumulados. Escolha **poucas** métricas certas, idealmente uma **North Star** (o valor central).
- Ferramentas de interpretação: o **funil** (onde os usuários desistem) e a **coorte** (retenção de um grupo ao longo do tempo). Elas revelam **onde** agir, como o gargalo revela onde escalar.
- O perigo central é a **Lei de Goodhart**: *"quando uma métrica vira meta, deixa de ser boa métrica"* — otimizar o **número** cegamente pode trair o **objetivo real** (aumentar "tempo no app" com designs viciantes). Antídotos: **métricas de guardrail** (contra-pesos que não podem piorar) e, sobretudo, manter o **julgamento humano** no comando — métricas são **bússola, não piloto automático**. Elas informam as decisões; ética, visão e contexto ainda exigem cabeça humana. Assim se fecha a tríade da engenharia experimental: **hipótese, experimento e medida**.

---

## ☑️ Checklist de aprendizado

- [ ] Explico por que medir impacto (não só entregar) é essencial.
- [ ] Conheço o funil AARRR e o que cada métrica representa.
- [ ] Distingo métricas de vaidade de métricas acionáveis.
- [ ] Explico North Star Metric, funil e coorte.
- [ ] Entendo a Lei de Goodhart e o risco de otimizar métricas cegamente.
- [ ] Sei usar métricas de guardrail e manter o julgamento sobre os números.

---

## ✏️ Exercícios

**1.** Com a analogia do painel do avião, explique a diferença entre métrica acionável, métrica de vaidade e o perigo da Lei de Goodhart.

**2.** Por que "500 mil downloads" pode ser uma métrica de vaidade enganosa? Que métrica revelaria a verdade?

**3.** O que é uma **North Star Metric**? Por que "pedidos entregues por semana" foi melhor que "receita" ou "downloads" para a SaborExpress?

**4.** Explique a **Lei de Goodhart** com o exemplo do "tempo no app" da SaborExpress. Como as métricas de guardrail ajudam?

**5. (Reflexão)** Ana disse que "as métricas são a bússola, não o piloto automático". Explique o que isso significa e por que, mesmo numa cultura orientada a dados, o julgamento humano continua essencial.

---

## 💬 Respostas comentadas

**1.** No painel do avião, uma **métrica acionável** é como a **altitude, velocidade ou combustível** — instrumentos que guiam o piloto ao destino com segurança: se um deles muda, ele **sabe o que fazer** (o combustível baixou → planejar o pouso). Uma **métrica de vaidade** é como o **total de quilômetros já voados na vida do avião** — um número que só cresce, dá uma sensação boa de "estamos indo longe!", mas **não ajuda a pilotar agora**: não diz se o avião está no rumo certo nem o que fazer a seguir. O perigo da **Lei de Goodhart** aparece se a companhia premiar o piloto por **"economia de combustível"** e ele otimizar esse número **cegamente**: pode voar baixo demais ou cortar margens de segurança, **batendo a meta do combustível enquanto compromete o objetivo real** (chegar vivo). A métrica que virou meta deixou de servir ao propósito. A lição: foque nos instrumentos acionáveis que guiam ao destino, ignore os de vaidade que só agradam, e nunca otimize um número a ponto de trair o objetivo que ele deveria representar.

**2.** "500 mil downloads" pode ser uma métrica de vaidade enganosa porque é um **total acumulado** que **só cresce** (downloads nunca "diminuem") e **impressiona** — é ótimo para exibir a investidores —, mas **não diz nada** sobre se o produto realmente entrega valor nem **o que fazer** a seguir. Um download é apenas alguém que **instalou** o app; não significa que essa pessoa **usou**, **gostou** ou **voltou**. Um milhão de downloads com quase ninguém voltando é um fracasso disfarçado de sucesso — o "balde está furado". A métrica que revelaria a verdade é a **retenção**, medida por **análise de coorte**: acompanhar, de cada grupo que baixou o app, quantos **voltam** e fazem um segundo pedido (por exemplo, em 30 dias). Foi exatamente o que aconteceu na SaborExpress: os 500 mil downloads escondiam que só **8%** faziam um segundo pedido — ou seja, gastava-se em marketing para atrair usuários que **sumiam**. A retenção é acionável (mostra o problema real e o que consertar), enquanto o total de downloads é vaidade (agrada, mas mascara).

**3.** Uma **North Star Metric** é a **única** métrica que melhor captura o **valor central** que o produto entrega ao usuário — a métrica-mestra pela qual todo o time se alinha e avalia suas decisões ("isso aumenta a North Star?"). "**Pedidos entregues por semana**" foi melhor que "receita" ou "downloads" para a SaborExpress porque reflete o **valor real** entregue a **ambos** os lados do produto: clientes comendo o que pediram e restaurantes vendendo — é o coração do que a SaborExpress **faz de bom**. "**Downloads**" seria vaidade (cresce sempre, não reflete valor nem uso real). "**Receita**" seria perigosa como North Star porque poderia incentivar decisões **míopes e predatórias**: otimizar receita cegamente poderia levar a cobrar taxas altas demais, encher o app de anúncios ou empurrar upsells — aumentando o número no curto prazo enquanto **afasta** clientes e restaurantes, corroendo o valor real (uma armadilha à la Goodhart). "Pedidos entregues por semana", ao contrário, só sobe se o produto estiver genuinamente **servindo bem** os dois lados (clientes satisfeitos pedindo mais, restaurantes felizes na plataforma), então alinhar o time por ela empurra na direção do valor verdadeiro — a receita vem como **consequência** de entregar valor, não como alvo direto que se pode gamificar.

**4.** A **Lei de Goodhart** diz que "quando uma métrica vira meta, ela deixa de ser uma boa métrica", porque as pessoas passam a otimizar o **número em si**, não o objetivo real por trás dele. No exemplo do "**tempo no app**" da SaborExpress: um gerente propôs otimizar o tempo médio que o usuário passa no app, assumindo "mais tempo = mais engajamento". Mas se essa métrica virasse meta e fosse otimizada **cegamente**, trairia o objetivo real de duas formas: (1) poderia incentivar designs **manipulativos** que **prendem** o usuário (notificações excessivas, telas confusas de propósito para ele "explorar mais") — o oposto da boa experiência; (2) pior, para um app de **delivery**, o cliente ideal pede **rápido** e sai satisfeito — então **muito** tempo no app pode significar **frustração** (a pessoa não achou o que queria!), ou seja, otimizar "tempo no app" poderia estar otimizando a **infelicidade** do usuário. A métrica é um **proxy** ruim do objetivo real (clientes satisfeitos pedindo comida), e vira meta a atraiçoa. As **métricas de guardrail** ajudam sendo **contra-pesos** que **não podem piorar** enquanto você otimiza a principal: na SaborExpress, ao otimizar conversão, acompanhavam **cancelamentos** e **satisfação** como guardrails — e quando um teste aumentou a conversão em 5% mas os cancelamentos subiram junto (o ganho era falso, o botão "confundia" as pessoas), o guardrail **revelou** que o objetivo real estava sendo traído e o ganho foi descartado. O guardrail impede que se otimize um número às custas de outro que importa mais.

**5.** "As métricas são a bússola, não o piloto automático" significa que os dados devem **orientar** a direção (mostrar **onde** você está e **para onde** as coisas tendem), mas a **decisão final** de para onde ir e como agir continua sendo do **julgamento humano** — as métricas informam, não decidem sozinhas. Mesmo numa cultura orientada a dados, o julgamento humano continua essencial por várias razões: (1) uma métrica pode subir por **razões erradas** ou temporárias (o efeito novidade, um fator externo) que só o contexto humano detecta; (2) as métricas **não capturam tudo** — a satisfação de longo prazo, a confiança, a reputação da marca são difíceis de medir e podem ser prejudicadas por decisões que "melhoram os números" no curto prazo (a Lei de Goodhart); (3) questões de **ética e valores** (usar ou não um dark pattern) **não se decidem por planilha** — só porque um design manipulativo aumenta a conversão não significa que é certo usá-lo; (4) decisões de **visão** ousada (uma expansão arriscada, uma aposta em algo novo) frequentemente exigem **convicção** que nenhum dado histórico pode fornecer, porque os dados só falam do que **já existe**, não do que poderia ser criado. Por isso o engenheiro e o time maduros usam as métricas como uma **bússola** que os mantém orientados e honestos (evitando o autoengano da opinião pura), mas mantêm a **cabeça humana no comando** — cruzando os números com pesquisa qualitativa (o "porquê" por trás do "o quê"), com ética e com visão. Tratar a métrica como piloto automático (otimizá-la cegamente) leva à obsessão de Goodhart e a decisões que traem o propósito; usá-la como bússola preserva o melhor dos dois mundos: o rigor dos dados e a sabedoria do julgamento.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[96-AB-testing-e-feature-flags]] — os experimentos que comparam estas métricas.
- **Base:** [[95-Software-guiado-por-hipoteses-e-dados]] (a mentalidade) e [[89-Logs-metricas-e-tracing]] (a infraestrutura de medição).
- **Conexão com o negócio:** no Volume 5, [[106-As-metricas-do-negocio]] (CAC, LTV, churn) e [[105-Por-que-empresas-fazem-software-modelos-de-negocio]].
- **Ética:** [[101-LGPD-e-privacidade]] e [[104-IA-para-engenharia-e-uso-responsavel]] — os limites da otimização de métricas.

---

> 🧭 **Você está aqui:** Volume 4 → Módulo 29 → **Capítulo 97 de 119**.
