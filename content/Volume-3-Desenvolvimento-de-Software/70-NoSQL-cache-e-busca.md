# Capítulo 70 — NoSQL, cache e busca

> **Volume 3 — Desenvolvimento de Software** · Módulo 20 — Banco de Dados
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **NoSQL** e por que ele surgiu (quando o relacional não basta).
- Conhecer os **quatro tipos** de NoSQL: documento, chave-valor, colunar e grafo.
- Compreender o que é **cache** (Redis) e por que ele acelera sistemas dramaticamente.
- Entender o que é um **motor de busca** (ElasticSearch) e por que `LIKE` do SQL não basta.
- Escolher a ferramenta certa para cada necessidade — **poliglotismo de persistência**.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]], [[68-SQL-na-pratica]] e [[69-Modelagem-de-dados-e-normalizacao]].
- Ajuda ter visto [[19-Bits-processador-e-memoria]] (Vol. 2 — hierarquia de memória / cache).

---

## 📖 Introdução

O banco relacional é maravilhoso — sólido, consistente, previsível — e é a escolha certa para a **maioria** dos sistemas. Mas ele não é a resposta para **tudo**. Existem situações em que sua estrutura rígida (tabelas, schema fixo, normalização) atrapalha, ou em que sua forma de escalar não aguenta. Foi para esses casos que surgiu o **NoSQL** — uma família de bancos que abre mão de algumas garantias do relacional em troca de **flexibilidade, escala ou velocidade**. E há duas ferramentas especializadas — **cache** e **busca** — que quase todo sistema grande usa junto do banco principal.

O nome "NoSQL" é enganoso: não significa "sem SQL" (muitos até usam SQL), e sim "**Not Only SQL**" — reconhecendo que o relacional não é a única forma de guardar dados. NoSQL não é "melhor" nem "mais moderno" que o relacional; é **diferente**, com trocas diferentes. O erro do iniciante deslumbrado é achar que NoSQL substitui o relacional (não substitui — para dados com relações e transações, o relacional continua imbatível); o erro oposto é ignorar quando NoSQL, cache ou busca resolveriam um problema que o relacional resolve mal.

Este capítulo te dá o mapa: os tipos de NoSQL e quando cada um brilha, o que é **cache** (o Redis, que guarda o que é mais acessado numa memória ultrarrápida — a hierarquia de memória do [[19-Bits-processador-e-memoria]] reaparece), e o que é um **motor de busca** (o ElasticSearch, que faz o que o `LIKE '%pizza%'` do SQL faz mal). No fim, a lição mais importante: sistemas modernos usam **várias** ferramentas de dados juntas, cada uma para o que faz melhor — o **poliglotismo de persistência**.

---

## 🧠 Analogia

Pense em como você **guarda coisas diferentes em lugares diferentes** na sua casa.

Você não guarda **tudo** no mesmo móvel. As roupas vão no **armário** (organizado, com divisórias — o **banco relacional**, estruturado). Mas a chave de casa você deixa num **potinho na entrada** — acesso instantâneo, sem procurar (o **cache**: o que você mais usa, à mão). Suas fotos e documentos soltos vão numa **caixa** onde você joga tudo junto, sem estrutura fixa (o **NoSQL de documentos**: flexível, cada item pode ser diferente). E quando você precisa **achar** um livro específico numa biblioteca enorme, você não abre estante por estante — usa o **sistema de busca/índice** (o **motor de busca**: encontra por conteúdo, rápido).

Cada lugar tem um propósito. Ninguém guarda a chave de casa no fundo do armário organizado (seria lento pegar toda hora), nem joga as roupas caras numa caixa sem divisórias. Você **escolhe o lugar certo para cada tipo de coisa** — e usa **vários** ao mesmo tempo. Sistemas de software fazem igual: o banco relacional para os dados centrais e transacionais, o cache para o que é acessado o tempo todo, o NoSQL de documentos para dados flexíveis, o motor de busca para procurar por conteúdo. Guarde: **a ferramenta certa para cada tipo de dado — e usar várias juntas.**

---

## 🧩 Conceitos fundamentais

### 1. O que é NoSQL e por que surgiu

**NoSQL** ("Not Only SQL") é um grupo de bancos que **não** seguem o modelo relacional estrito. Surgiram nos anos 2000, impulsionados por empresas de escala massiva (Google, Amazon, Facebook) que precisavam:
- **Escalar horizontalmente** (espalhar por milhares de máquinas) mais facilmente que o relacional.
- **Flexibilidade de schema** (dados sem estrutura fixa, que mudam de forma).
- **Velocidade** para volumes gigantescos, aceitando abrir mão de algumas garantias.

> **Termo explicado — NoSQL:** família de bancos de dados não-relacionais, projetados para flexibilidade de schema, escala horizontal e/ou velocidade, com trocas diferentes das do relacional.

A troca central: muitos NoSQL relaxam a **consistência forte** e as **transações** do relacional (o teorema **CAP** e a "consistência eventual" — dados que ficam consistentes "com o tempo", não instantaneamente) em favor de escala e disponibilidade. Não é grátis: você ganha escala/flexibilidade e perde algumas garantias.

### 2. Os quatro tipos de NoSQL

- **Documento** (MongoDB, CouchDB): guarda **documentos** (tipo JSON), cada um podendo ter estrutura diferente. Flexível, bom para dados que variam de forma. Ex.: um catálogo onde cada produto tem campos diferentes.
- **Chave-valor** (Redis, DynamoDB): guarda pares **chave → valor**, simplíssimo e ultrarrápido. Bom para cache, sessões, contadores. Ex.: `"sessao:abc123" → dados do usuário logado`.
- **Colunar / wide-column** (Cassandra, HBase): otimizado para **escrever e ler enormes volumes** por coluna, escala massiva. Ex.: séries temporais, logs de bilhões de eventos.
- **Grafo** (Neo4j): guarda **nós e conexões**, ótimo para dados muito **interligados**. Ex.: rede social ("amigos de amigos"), recomendações, detecção de fraude.

> **Termo explicado — banco de documentos:** NoSQL que armazena dados como documentos flexíveis (tipo JSON), sem schema fixo; cada documento pode ter campos diferentes.

### 3. Cache — o atalho para o que é mais usado

**Cache** é uma cópia dos dados **mais acessados**, guardada num lugar **ultrarrápido** (memória RAM), para não precisar buscá-los no banco toda vez. É a hierarquia de memória do [[19-Bits-processador-e-memoria]] aplicada a sistemas: "o que uso muito, mantenho perto e rápido".

> **Termo explicado — cache:** camada que guarda temporariamente os dados mais acessados num meio muito rápido (RAM), evitando consultas repetidas ao banco e acelerando o sistema.

O **Redis** é o rei do cache: um banco chave-valor em memória, absurdamente rápido. O padrão de uso: antes de consultar o banco, o sistema **pergunta ao cache**; se o dado está lá (*cache hit*), devolve na hora; se não (*cache miss*), busca no banco e **guarda no cache** para a próxima vez. Isso reduz drasticamente a carga no banco e acelera o sistema — uma consulta que levava 200ms no banco leva 1ms no cache.

O desafio do cache: **invalidação** (quando o dado muda no banco, o cache fica "velho"). Há um ditado famoso: *"só existem duas coisas difíceis na computação: invalidação de cache e dar nome às coisas."*

### 4. Motor de busca — encontrar por conteúdo

Buscar texto com SQL (`WHERE nome LIKE '%pizza%'`) funciona mal: é lento em escala, não entende variações ("pizza" vs. "pizzaria" vs. erro de digitação "piza"), não ranqueia por relevância. Um **motor de busca** (search engine) é especializado nisso: indexa o texto de forma inteligente (*full-text search*) e responde buscas complexas com relevância, rapidez e tolerância a erros.

> **Termo explicado — motor de busca (search engine):** sistema especializado em busca textual (full-text), que indexa conteúdo para encontrar por relevância, com tolerância a variações e erros — muito além do `LIKE` do SQL.

O **ElasticSearch** (e o Solr, ambos sobre a biblioteca Lucene) domina. É o que faz a busca de e-commerces, o "buscar" de apps, e a análise de logs (o "ELK stack" — Elastic, Logstash, Kibana — do Volume 4).

### 5. Poliglotismo de persistência

A lição que amarra tudo: sistemas modernos usam **várias** tecnologias de dados **juntas**, cada uma para o que faz melhor. Isso se chama **poliglotismo de persistência**: o relacional para os dados centrais e transacionais, o Redis para cache/sessões, o ElasticSearch para busca, talvez um MongoDB para dados flexíveis. Não é "relacional **ou** NoSQL"; é "cada dado no seu lugar".

> **Termo explicado — poliglotismo de persistência:** usar diferentes tecnologias de armazenamento (relacional, NoSQL, cache, busca) no mesmo sistema, cada uma para o tipo de dado/acesso que ela atende melhor.

---

## ⚙️ Como funciona na prática

Como escolher e combinar essas ferramentas:

**O relacional continua sendo o centro.** Para a maioria dos sistemas, a fonte da verdade dos dados centrais (pedidos, usuários, pagamentos — coisas que precisam de **transações** e **relações**) é um banco **relacional**. NoSQL, cache e busca são adicionados **em torno** dele, para necessidades específicas — não para substituí-lo. Começar tudo em NoSQL "porque escala" é o mesmo erro do "começar com microsserviços" ([[59-Monolito-vs-Microsservicos]]): complexidade sem necessidade.

**Quando usar cada NoSQL (a regra prática):**
- Dados **flexíveis**, sem schema fixo, que variam de forma? → **documento** (MongoDB).
- Precisa de acesso **ultrarrápido** a valores simples por chave (cache, sessões, contadores)? → **chave-valor** (Redis).
- Volume **massivo** de escritas (logs, séries temporais, IoT)? → **colunar** (Cassandra).
- Dados muito **interligados** (rede social, recomendações)? → **grafo** (Neo4j).

**O cache como acelerador padrão.** Quase todo sistema de porte médio+ usa cache (Redis) na frente do banco para o que é lido com muita frequência e muda pouco (o cardápio de um restaurante, o perfil de um usuário). O ganho de performance é enorme, mas exige cuidado com **invalidação** — decidir quando o cache "expira" ou é atualizado.

**A busca como recurso especializado.** Assim que o sistema precisa de uma busca textual **boa** (relevância, tolerância a erros, filtros ricos), o `LIKE` do SQL não dá conta, e entra um ElasticSearch, alimentado com uma cópia dos dados do banco.

**As trocas que você aceita.** Ao adicionar essas ferramentas, você adiciona **complexidade**: mais peças para operar, sincronizar e monitorar. E os NoSQL frequentemente trazem **consistência eventual** (o dado pode estar "velho" por um instante). É o mesmo trade-off de sempre — ganha-se algo (escala, velocidade, flexibilidade), paga-se com complexidade e garantias relaxadas. Por isso: adicione essas ferramentas **quando um requisito real justificar**, não por moda.

---

## 🍔 Aplicação na SaborExpress

A SaborExpress começou **só com PostgreSQL** (relacional) — a escolha certa para começar. Conforme cresceu, foi adicionando ferramentas especializadas em volta, cada uma para uma dor concreta.

**O relacional no centro (dados transacionais).** Pedidos, pagamentos, clientes, restaurantes — tudo que precisa de **transações** e **relações** — continua no PostgreSQL. Um pedido pago **não pode** se perder nem ficar inconsistente ([[71-Confiabilidade-e-escala-do-banco]]); isso exige as garantias do relacional. NoSQL nunca substituiu isso.

**Redis (cache) para o cardápio.** O cardápio de cada restaurante é **lido milhares de vezes** (todo cliente que abre o restaurante) mas **muda raramente**. Consultar o PostgreSQL a cada visualização sobrecarregava o banco no pico. Solução: o cardápio é **cacheado no Redis**. Ao abrir um restaurante, o app pergunta ao Redis primeiro (resposta em ~1ms); só busca no PostgreSQL se não estiver no cache, e então guarda. Quando o restaurante edita o cardápio, o time **invalida** o cache daquele restaurante (para não mostrar dados velhos). Resultado: a carga no banco despencou e as telas ficaram instantâneas.

**Redis (chave-valor) para sessões.** Os dados de login/sessão dos usuários ([[73-Autenticacao-e-autorizacao]]) também vivem no Redis — acesso ultrarrápido por chave, e expiram sozinhos.

**ElasticSearch para a busca.** A busca de restaurantes e pratos era feita com `LIKE '%...%'` no PostgreSQL e era ruim: lenta, e não achava "pizza" quando o cliente digitava "piza" (erro), nem entendia "japonês" vs. "japonesa". Trocaram por **ElasticSearch**, alimentado com uma cópia dos dados: agora a busca é rápida, tolera erros de digitação, ranqueia por relevância e permite filtros ricos (por tempo de entrega, avaliação). O `LIKE` do SQL simplesmente não fazia isso bem.

**O poliglotismo de persistência.** Assim, a SaborExpress usa **quatro** ferramentas de dados juntas: PostgreSQL (dados centrais/transacionais), Redis (cache do cardápio + sessões), ElasticSearch (busca). Cada uma para o que faz melhor. Nenhuma substitui a outra — elas se **complementam**.

**O que NÃO fizeram.** A Ana leu sobre MongoDB e sugeriu "migrar tudo para NoSQL porque escala". O time explicou por que seria um erro: os dados da SaborExpress são **altamente relacionais** (pedidos ligados a clientes, produtos, restaurantes) e precisam de **transações** (pagamento não pode falhar pela metade). Jogar isso em NoSQL traria consistência eventual e perderia as garantias que o negócio precisa — resolvendo um problema de escala que a SaborExpress **ainda não tinha**. Mantiveram o relacional no centro e usaram NoSQL/cache/busca **cirurgicamente**, onde faziam sentido.

Moral: a SaborExpress não trocou o relacional por NoSQL — ela **somou** ferramentas especializadas em volta dele (cache para o que é lido muito, busca para procurar por conteúdo), cada uma resolvendo uma dor específica e medida. Poliglotismo de persistência na prática.

---

## 🏢 Como isso acontece em uma empresa

- **Relacional + Redis + ElasticSearch é uma combinação clássica.** Um número enorme de sistemas usa exatamente esse trio: banco relacional como fonte da verdade, Redis para cache/sessões, ElasticSearch para busca. Reconhecer esse padrão é meio caminho andado.
- **NoSQL brilha em nichos.** MongoDB para dados flexíveis/catálogos, Cassandra para escala massiva de escrita (logs, IoT), Neo4j para grafos (recomendação, fraude), DynamoDB para chave-valor gerenciado na AWS. Cada um resolve um problema específico.
- **Cache é quase universal em escala.** Qualquer sistema com tráfego relevante usa cache. Saber usar Redis (e entender invalidação) é habilidade valorizada.
- **A escolha é decisão de arquitetura.** "Que banco usar para isto?" é uma decisão consciente, guiada pelos requisitos (transações? escala? flexibilidade? busca?). Registra-se em ADR ([[57-O-que-e-arquitetura-de-software]]).
- **Cuidado com o hype.** Houve uma onda de "vamos usar MongoDB para tudo" nos anos 2010 que gerou muitos arrependimentos (dados relacionais forçados em documentos). O pêndulo voltou: relacional para o que é relacional, NoSQL para o que realmente precisa.
- **Managed services facilitam.** Na nuvem (Volume 4), você usa versões gerenciadas (RDS para relacional, ElastiCache para Redis, OpenSearch para busca, DynamoDB) sem operar a infraestrutura — o que baixou a barreira para o poliglotismo.

---

## ⚠️ Erros comuns

- **Achar que NoSQL substitui o relacional.** Não substitui. Para dados relacionais e transacionais (a maioria dos sistemas centrais), o relacional continua sendo o melhor. NoSQL **complementa**, não substitui.
- **Usar NoSQL "porque é moderno/escala".** Escolher NoSQL sem um requisito que o justifique é o "começar com microsserviços" do mundo dos dados — complexidade e consistência eventual sem necessidade.
- **Forçar dados relacionais num banco de documentos.** Dados com muitas relações e necessidade de transações sofrem em NoSQL de documento — você reimplementa mal o que o relacional faz bem.
- **Esquecer a invalidação de cache.** Cachear e nunca atualizar/expirar faz o sistema mostrar dados **velhos**. A invalidação é a parte difícil do cache — não a ignore.
- **Usar `LIKE` do SQL para busca séria.** Para busca textual boa (relevância, erros de digitação, filtros), o `LIKE` é lento e burro. Use um motor de busca.
- **Adicionar ferramentas demais cedo.** Cada tecnologia de dados a mais é uma peça para operar, sincronizar e monitorar. Adicione quando o requisito justificar, não por deslumbre.
- **Ignorar a consistência eventual.** Muitos NoSQL não garantem que o dado esteja atualizado **na hora**. Usá-los para dados que exigem consistência forte (saldo bancário) é perigoso.

---

## 💡 Dicas profissionais

- **Comece com relacional; adicione o resto quando precisar.** Para a maioria dos sistemas, PostgreSQL/MySQL como centro é a escolha certa. Adicione cache, NoSQL ou busca **cirurgicamente**, quando um requisito real aparecer.
- **Use a régua "qual é a necessidade?".** Transações e relações → relacional. Leitura ultrarrápida do que muda pouco → cache. Busca textual boa → motor de busca. Dados flexíveis sem schema → documento. Dados interligados → grafo.
- **Adote cache para leituras frequentes de dados estáveis.** Cardápios, perfis, configurações — coisas lidas muito e mudadas pouco são candidatas perfeitas a cache. Mas planeje a **invalidação** desde o início.
- **Não reinvente busca — use ElasticSearch (ou similar).** Se a busca textual importa para o produto, não sofra com `LIKE`. Um motor de busca resolve relevância e erros de digitação de graça.
- **Pense em poliglotismo, não em "um banco para tudo".** A pergunta madura não é "relacional ou NoSQL?", e sim "qual ferramenta para **cada** tipo de dado?". Usar várias juntas é normal e saudável.
- **Entenda as trocas antes de adotar.** Todo NoSQL relaxa alguma garantia (consistência, transações) por escala/velocidade/flexibilidade. Saiba **o que** você está trocando antes de escolher.
- **Aproveite os serviços gerenciados.** Na nuvem, usar Redis, ElasticSearch e afins gerenciados baixa muito o custo operacional de adicionar essas ferramentas.

---

## 🎈 Curiosidades

- O termo **"NoSQL"** foi popularizado por volta de 2009 e originalmente era lido como "**No** SQL" (sem SQL), mas a comunidade rapidamente o reinterpretou como "**Not Only** SQL" — reconhecendo que o relacional e o não-relacional coexistem, em vez de competir.
- O ditado *"há apenas dois problemas difíceis na ciência da computação: invalidação de cache e nomear as coisas"* (atribuído a Phil Karlton) é uma das piadas mais citadas da área — e captura uma verdade real sobre o quanto invalidar cache corretamente é traiçoeiro.
- O **teorema CAP** (Eric Brewer, 2000) diz que um sistema distribuído só pode garantir **dois** de três: **C**onsistência, **A**vailability (disponibilidade) e **P**artition tolerance (tolerância a partição de rede). Muitos NoSQL escolhem disponibilidade sobre consistência forte — daí a "consistência eventual".
- O **Redis** é tão rápido porque mantém tudo na **RAM** (memória volátil). Ele consegue centenas de milhares de operações por segundo — mas isso significa que, sem persistência configurada, um restart pode perder dados (por isso não é a fonte da verdade de dados críticos).
- O **ElasticSearch** ficou tão popular para análise de **logs** (não só busca de produtos) que o "ELK stack" virou sinônimo de observabilidade em muitas empresas (Volume 4) — mostrando como uma ferramenta de busca virou infraestrutura de monitoramento.
- Houve uma era de **"MongoDB para tudo"** que gerou tantos problemas (dados relacionais espremidos em documentos) que virou meme na comunidade. A lição amadureceu: use a ferramenta certa, não a da moda.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **NoSQL** | Bancos não-relacionais, focados em flexibilidade, escala ou velocidade. |
| **Banco de documentos** | NoSQL que guarda documentos flexíveis tipo JSON (MongoDB). |
| **Chave-valor** | NoSQL que guarda pares chave → valor, ultrarrápido (Redis, DynamoDB). |
| **Colunar / wide-column** | NoSQL para volume massivo de escrita (Cassandra). |
| **Grafo** | NoSQL para dados muito interligados (Neo4j). |
| **Cache** | Cópia dos dados mais acessados num meio ultrarrápido (RAM). |
| **Cache hit / miss** | O dado estava (hit) ou não (miss) no cache. |
| **Invalidação de cache** | Atualizar/expirar o cache quando o dado muda no banco. |
| **Motor de busca** | Sistema de busca textual com relevância e tolerância a erros (ElasticSearch). |
| **Consistência eventual** | O dado fica consistente "com o tempo", não instantaneamente. |
| **Poliglotismo de persistência** | Usar várias tecnologias de dados juntas, cada uma para o que faz melhor. |

---

## 📝 Resumo

- **NoSQL** ("Not Only SQL") é uma família de bancos não-relacionais que trocam garantias do relacional (consistência forte, transações) por **flexibilidade, escala ou velocidade**. Não substitui o relacional — **complementa**.
- Os quatro tipos: **documento** (MongoDB — dados flexíveis), **chave-valor** (Redis — acesso ultrarrápido), **colunar** (Cassandra — escala massiva de escrita) e **grafo** (Neo4j — dados interligados).
- **Cache** (Redis) guarda os dados mais acessados na RAM, acelerando o sistema e aliviando o banco — a hierarquia de memória aplicada. O desafio é a **invalidação** (manter o cache atualizado).
- **Motor de busca** (ElasticSearch) faz busca textual com relevância e tolerância a erros — muito além do `LIKE` do SQL, que é lento e burro para isso.
- A lição-mestra é o **poliglotismo de persistência**: sistemas modernos usam **várias** ferramentas de dados juntas (relacional no centro + cache + busca + NoSQL onde precisar), cada uma para o que faz melhor. Comece com relacional e adicione o resto **quando um requisito real justificar**.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é NoSQL e por que ele surgiu.
- [ ] Conheço os quatro tipos de NoSQL e quando cada um brilha.
- [ ] Entendo o que é cache e por que ele acelera sistemas.
- [ ] Sei por que um motor de busca supera o `LIKE` do SQL.
- [ ] Compreendo o poliglotismo de persistência.
- [ ] Sei que o relacional continua sendo o centro para dados transacionais.

---

## ✏️ Exercícios

**1.** Explique, com a analogia da casa, por que faz sentido guardar "coisas diferentes em lugares diferentes" em vez de um banco só para tudo.

**2.** Para cada necessidade, diga qual tipo de banco/ferramenta faz mais sentido: (a) guardar sessões de usuário com acesso ultrarrápido; (b) uma rede social com "amigos de amigos"; (c) dados centrais de pagamento com transações; (d) uma busca de produtos que tolere erros de digitação.

**3.** O que é **invalidação de cache** e por que ela é considerada uma das partes mais difíceis de usar cache?

**4.** Por que usar `WHERE nome LIKE '%pizza%'` no SQL é uma solução ruim para a busca de um app de delivery? O que usar no lugar?

**5. (Reflexão)** A SaborExpress usa PostgreSQL, Redis e ElasticSearch juntos. Explique o papel de cada um e por que o time **recusou** a ideia de "migrar tudo para NoSQL".

---

## 💬 Respostas comentadas

**1.** Porque cada tipo de "coisa" tem necessidades diferentes de acesso e organização, e um único móvel não atende bem a todas. A chave de casa (usada toda hora) fica num potinho na entrada para acesso instantâneo (cache); as roupas caras num armário organizado com divisórias (relacional, estruturado); fotos e documentos soltos numa caixa flexível (NoSQL de documentos). Guardar a chave no fundo do armário organizado seria lento; jogar as roupas numa caixa sem divisórias seria bagunça. Em software é igual: usar a **ferramenta certa para cada tipo de dado** — e várias juntas — atende cada necessidade melhor do que forçar tudo num único banco.

**2.** (a) **Chave-valor / cache** (Redis) — acesso ultrarrápido por chave, ideal para sessões (que ainda expiram sozinhas). (b) **Grafo** (Neo4j) — dados muito interligados como redes de amizade; "amigos de amigos" é uma consulta natural em grafo. (c) **Relacional** (PostgreSQL/MySQL) — dados centrais que exigem transações e consistência forte; pagamento não pode ficar inconsistente. (d) **Motor de busca** (ElasticSearch) — busca textual com tolerância a erros de digitação e relevância.

**3.** **Invalidação de cache** é o processo de **atualizar ou remover** um dado do cache quando ele muda no banco de origem, para o cache não continuar servindo uma versão **velha**. É difícil porque exige saber **exatamente quando** e **o que** invalidar: se você invalida de menos, os usuários veem dados desatualizados (o cardápio mostra um preço antigo); se invalida demais, perde o benefício do cache (fica sempre buscando no banco). E em sistemas complexos, um mesmo dado pode estar cacheado em vários lugares, tornando difícil garantir que **todas** as cópias sejam atualizadas. Por isso a piada de que é um dos dois problemas mais difíceis da computação.

**4.** É ruim por vários motivos: (1) **performance** — `LIKE '%...%'` (com % no início) não usa índice e faz o banco varrer a tabela inteira, ficando lento em escala; (2) **burrice** — não tolera erros de digitação (não acha "pizza" se o cliente digita "piza"), não entende variações ("japonês"/"japonesa"), e não **ranqueia por relevância** (o resultado mais provável não vem primeiro); (3) não permite filtros ricos combinados facilmente. No lugar, usa-se um **motor de busca** (ElasticSearch/Solr), que indexa o texto de forma inteligente (full-text), tolera erros, entende variações, ranqueia por relevância e responde rápido mesmo em grande escala — tudo o que a busca de um app de delivery precisa.

**5.** **PostgreSQL (relacional):** é a **fonte da verdade** dos dados centrais e transacionais — pedidos, pagamentos, clientes, restaurantes —, que exigem **relações** e **transações** (um pagamento não pode ficar pela metade). **Redis (cache/chave-valor):** guarda o que é **lido muito e muda pouco** (o cardápio dos restaurantes) e as **sessões** de usuário, entregando respostas em ~1ms e aliviando a carga no PostgreSQL. **ElasticSearch (busca):** faz a **busca textual** de restaurantes e pratos com relevância e tolerância a erros, o que o `LIKE` do SQL fazia mal. O time **recusou** migrar tudo para NoSQL porque os dados da SaborExpress são **altamente relacionais** e precisam de **transações e consistência forte** — jogar isso num NoSQL de documentos traria consistência eventual e perderia garantias essenciais ao negócio (pedido/pagamento não podem se perder nem ficar inconsistentes), resolvendo um problema de escala que a empresa **ainda não tinha**. A escolha certa foi manter o relacional no centro e **somar** ferramentas especializadas em volta — poliglotismo de persistência.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[69-Modelagem-de-dados-e-normalizacao]] — o relacional normalizado que o NoSQL às vezes contrasta (desnormalização).
- **Próximo (linear):** [[71-Confiabilidade-e-escala-do-banco]] — transações, índices, replicação e o que torna o banco confiável em escala.
- **Base:** [[19-Bits-processador-e-memoria]] (Vol. 2 — hierarquia de memória / cache) e [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]].
- **Aplicação futura:** Volume 4 (escalabilidade, CDN, observabilidade com ELK) — cache e busca em produção e escala.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 20 → **Capítulo 70 de 119**.
