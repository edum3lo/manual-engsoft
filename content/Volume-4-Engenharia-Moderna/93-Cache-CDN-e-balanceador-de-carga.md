---
title: '93 - Cache, CDN e balanceador de carga'
---

# Capítulo 93 — Cache, CDN e balanceador de carga

> **Volume 4 — Engenharia Moderna** · Módulo 28 — Escalabilidade
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o **cache** — a alavanca mais poderosa de escala de leitura — e seus perigos.
- Compreender o que é uma **CDN** e como ela aproxima o conteúdo do usuário.
- Entender o **balanceador de carga** e como ele distribui o tráfego.
- Conhecer conceitos: **cache hit/miss, TTL, invalidação, latência e edge**.
- Ver as três alavancas trabalhando juntas para sustentar sistemas grandes.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[92-De-100-a-1-milhao-de-usuarios]] (onde estas três alavancas aparecem).
- Ajuda ter lido [[70-NoSQL-cache-e-busca]] e [[71-Confiabilidade-e-escala-do-banco]].

---

## 📖 Introdução

No capítulo anterior você viu a **jornada da escala** e descobriu que, em cada estágio, três ferramentas apareciam repetidamente para sustentar o crescimento: o **cache**, a **CDN** e o **balanceador de carga** ([[92-De-100-a-1-milhao-de-usuarios]]). Elas são as **três alavancas** mais usadas para fazer um sistema aguentar muito mais carga sem reescrever tudo — e este capítulo as detalha. As três atacam o mesmo inimigo por ângulos diferentes: fazer o sistema **trabalhar menos** (cache), **encurtar a distância** até o usuário (CDN) e **repartir o trabalho** entre muitas máquinas (balanceador).

A mais poderosa — e mais perigosa — é o **cache**. A ideia é genial na simplicidade: se um dado é caro de obter (uma consulta pesada ao banco) e é pedido **muitas vezes**, por que recalculá-lo toda vez? Guarde o resultado num lugar rápido (memória) e sirva a **cópia** nas próximas vezes. Um cache bem colocado pode tirar 90% da carga do banco — a alavanca de escala de leitura mais barata que existe. Mas há uma armadilha famosa: quando o dado original **muda**, a cópia no cache fica **velha (stale)**, e o usuário vê informação desatualizada. Gerenciar isso — a **invalidação de cache** — é reconhecidamente um dos problemas mais difíceis da computação. Cache dá poder, mas cobra atenção.

A **CDN** ataca outro inimigo: a **distância física**. Dados viajam pela internet à velocidade da luz, mas a luz **não é instantânea** — um usuário no Brasil acessando um servidor nos EUA sofre uma latência real, perceptível. A CDN resolve **espalhando cópias** do conteúdo (imagens, vídeos, arquivos) por servidores no mundo inteiro (as "bordas"/edge), de modo que cada usuário recebe do ponto **mais próximo**. E o **balanceador de carga** é o maestro da escala horizontal: quando você tem muitas réplicas da aplicação ([[92-De-100-a-1-milhao-de-usuarios]]), ele fica na frente distribuindo as requisições entre elas — e desviando das que caíram, o que também traz **resiliência**. Este capítulo explica as três, seus conceitos (cache hit/miss, TTL, invalidação, latência, edge) e como elas trabalham **juntas** para sustentar qualquer sistema grande — sempre lembrando que são ferramentas para **quando a escala pede**, não enfeites para adicionar cedo demais ([[92-De-100-a-1-milhao-de-usuarios]]).

---

## 🧠 Analogia

Pense em como uma **grande rede de cafeterias** atende multidões rápido — cada alavanca resolve um problema diferente.

- **O cache é o café já pronto na garrafa térmica.** Fazer um café do zero (moer, extrair) para **cada** cliente seria lento. Então a cafeteria mantém uma **garrafa térmica** com o café mais pedido já pronto: quando alguém pede, serve-se **na hora** da térmica, sem refazer. Isso é o **cache** — guardar o resultado pronto do que é muito pedido. O perigo? Se a receita mudar (novo grão), o café da térmica fica **velho** — e alguém precisa lembrar de **esvaziar a térmica** (invalidar o cache) quando a receita muda, ou os clientes recebem o café antigo.

- **A CDN é ter cafeterias em cada bairro.** Se houvesse **uma só** cafeteria na cidade inteira, quem mora longe gastaria uma hora para chegar. A rede resolve abrindo **filiais em cada bairro** — cada cliente vai à **mais próxima**, e recebe rápido. Isso é a **CDN**: espalhar cópias do conteúdo por servidores perto dos usuários, para reduzir a distância (latência). O grão vem da matriz, mas o café é servido na filial ao lado da sua casa.

- **O balanceador de carga é o organizador de filas com vários caixas.** Numa cafeteria movimentada com **cinco atendentes**, se todos os clientes fossem para um caixa só, seria um caos. Então há um **organizador** que direciona cada cliente para o **caixa livre** — distribuindo a fila igualmente. E se um atendente sai (vai ao banheiro), o organizador simplesmente para de mandar gente para ele. Isso é o **balanceador de carga**: distribuir as requisições entre as réplicas disponíveis, desviando das que caíram.

As três juntas fazem a rede atender uma multidão: café pronto na térmica (cache) serve o repetido na hora, filiais em cada bairro (CDN) reduzem a distância, e o organizador de filas (balanceador) reparte quem sobra entre os atendentes. Guarde: cache = servir o pronto sem refazer; CDN = filiais perto do cliente; balanceador = repartir a fila entre os caixas.

---

## 🧩 Conceitos fundamentais

### 1. Cache — servir o pronto sem refazer

**Cache** é guardar o resultado de uma operação **cara** (uma consulta ao banco, um cálculo) num armazenamento **rápido** (memória), para servir a **cópia** nas próximas vezes em que o mesmo dado for pedido — em vez de refazer o trabalho. É a alavanca mais eficiente de escala de **leitura**, pois tira do banco a carga repetitiva ([[70-NoSQL-cache-e-busca]], [[92-De-100-a-1-milhao-de-usuarios]]).

> **Termo explicado — cache:** guardar o resultado de uma operação cara num local rápido (memória) para reutilizá-lo nas próximas requisições iguais, evitando refazer o trabalho.

### 2. Cache hit, cache miss e TTL

- **Cache hit (acerto):** o dado pedido **está** no cache — serve-se rápido, sem tocar no banco.
- **Cache miss (erro):** o dado **não está** no cache — busca-se na origem (banco), guarda-se no cache, e serve-se. A próxima vez será um hit.
- **TTL (Time To Live):** o "prazo de validade" de um item no cache — depois desse tempo, ele **expira** e é rebuscado, garantindo que não fique velho para sempre.

> **Termo explicado — hit/miss/TTL:** hit é achar o dado no cache; miss é não achar (buscar na origem); TTL é o tempo até o item expirar e ser renovado.

### 3. Invalidação de cache — o problema difícil

Quando o dado **original muda**, a cópia no cache fica **desatualizada (stale)**. **Invalidar** o cache é removê-lo/atualizá-lo para refletir a mudança. Isso é notoriamente **difícil**: invalidar cedo demais desperdiça o cache; tarde demais mostra dados velhos. É um dos problemas clássicos da computação.

> **Termo explicado — invalidação de cache:** atualizar ou remover um item do cache quando o dado original muda, para não servir informação velha. Difícil de acertar no momento certo.

### 4. CDN — aproximar o conteúdo do usuário

Uma **CDN (Content Delivery Network)** é uma rede de servidores espalhados **geograficamente** que guardam cópias de conteúdo (imagens, vídeos, CSS, JS, arquivos estáticos) **perto dos usuários**. Cada usuário recebe do servidor mais próximo (a "borda"/**edge**), reduzindo a **latência** e tirando carga do servidor de origem.

> **Termo explicado — CDN (Content Delivery Network):** rede de servidores distribuídos pelo mundo que servem cópias de conteúdo do ponto mais próximo do usuário, reduzindo latência e carga na origem.

### 5. Latência e edge

- **Latência:** o **tempo** que um dado leva para ir e voltar pela rede. Depende muito da **distância física** (a luz não é instantânea) — daí a CDN aproximar o conteúdo importar tanto.
- **Edge (borda):** os pontos da CDN próximos aos usuários, "na borda" da rede. Processar/servir "no edge" significa fazê-lo perto do usuário, não num datacenter central distante.

> **Termo explicado — latência:** o atraso de ida-e-volta de dados pela rede, fortemente influenciado pela distância física entre usuário e servidor.

### 6. Balanceador de carga — repartir e proteger

O **balanceador de carga (load balancer)** fica na frente de várias réplicas de um serviço e **distribui** as requisições entre elas (por vários critérios — round-robin, menos ocupada, etc.). Além de equilibrar a carga (escala horizontal — [[92-De-100-a-1-milhao-de-usuarios]]), ele faz **health checks**: detecta réplicas que caíram e **para de mandar tráfego** para elas — trazendo **resiliência**.

> **Termo explicado — balanceador de carga:** distribui as requisições entre réplicas de um serviço e desvia automaticamente das que estão com falha (health check), equilibrando carga e aumentando a resiliência.

---

## ⚙️ Como funciona na prática

Como as três alavancas são usadas no dia a dia:

**Onde colocar cache (há muitas camadas).** Cache aparece em vários níveis: no **navegador** (guarda arquivos para não rebaixá-los), na **CDN** (cache de conteúdo na borda), na **aplicação** (cache em memória de resultados), e num **cache dedicado** como o **Redis/Memcached** (um armazém em memória compartilhado entre as réplicas — [[70-NoSQL-cache-e-busca]]). A regra: cachear o que é **muito lido e pouco mutável** (a lista de restaurantes muda pouco; o saldo de uma conta muda muito e é arriscado cachear).

**A estratégia de invalidação.** Como manter o cache fresco sem servir dados velhos? As táticas comuns: **TTL** (deixar expirar sozinho após X tempo — simples, aceita alguma defasagem); **invalidação ativa** (quando o dado muda, o código remove/atualiza a entrada do cache — precisa, mas exige lembrar de fazer em todo lugar que altera o dado); e **cache-aside** (a aplicação verifica o cache; se miss, busca no banco e popula o cache). Escolher a estratégia é equilibrar **frescor** vs. **simplicidade** — e é onde mora a dificuldade real do cache.

**O que colocar na CDN.** A CDN é ideal para conteúdo **estático** (imagens, vídeos, CSS, JS, PDFs) — coisas iguais para todos os usuários, que mudam pouco. Isso alivia enormemente o servidor de origem (que não precisa mais servir cada imagem milhões de vezes) e deixa a experiência rápida no mundo todo. Conteúdo **dinâmico e personalizado** (a página do "seu" carrinho) geralmente não vai à CDN, embora técnicas modernas (edge computing) estejam empurrando até lógica para a borda.

**O balanceador como porta de entrada.** Em qualquer sistema com múltiplas réplicas, o balanceador é a **porta de entrada**: todo o tráfego chega nele e é repartido. Ele também costuma cuidar de tarefas transversais: terminar o **HTTPS** ([[73-Autenticacao-e-autorizacao]]), fazer **health checks**, e às vezes distribuir por regiões. Sem balanceador, não há escala horizontal — é a peça que torna as muitas réplicas utilizáveis como uma coisa só.

**As três juntas (o fluxo de uma requisição).** Numa requisição típica de um sistema grande: o usuário pede uma página → a **CDN** serve as imagens e arquivos estáticos da borda mais próxima (rápido) → a requisição dinâmica chega ao **balanceador**, que a manda para uma réplica livre da aplicação → a aplicação verifica o **cache** (Redis); se hit, responde na hora; se miss, busca no banco, popula o cache e responde. Cada alavanca tirou uma fatia da carga: a CDN tirou o estático, o cache tirou as leituras repetidas, o balanceador espalhou o resto.

**A disciplina: só quando pesa.** Como no capítulo anterior ([[92-De-100-a-1-milhao-de-usuarios]]), essas alavancas são para **quando a escala pede**. Um projeto de 100 usuários não precisa de CDN nem Redis — adicioná-los cedo é complexidade prematura. Mas são tão eficazes (especialmente o cache) que, quando a carga cresce, costumam ser as **primeiras** soluções a aplicar, por darem muito ganho com pouco esforço. Medir ([[89-Logs-metricas-e-tracing]]) mostra quando a hora chegou.

---

## 🍔 Aplicação na SaborExpress

As três alavancas foram o que permitiu a SaborExpress servir milhões de clientes com rapidez. Acompanhe cada uma resolvendo um gargalo real.

**O cache que salvou o banco.** Quando o banco virou o gargalo ([[92-De-100-a-1-milhao-de-usuarios]]), a observabilidade ([[89-Logs-metricas-e-tracing]]) mostrou que a **lista de restaurantes de cada região** era consultada milhares de vezes por minuto — e mudava **pouco** (restaurantes não abrem/fecham a cada segundo). Camila colocou essa lista num **cache Redis** ([[70-NoSQL-cache-e-busca]]): a primeira consulta de uma região era um **miss** (buscava no banco e populava o cache); as milhares seguintes eram **hits** servidos da memória em milissegundos, **sem tocar no banco**. O resultado: a carga de leitura no banco **despencou ~85%**, e a tela de restaurantes ficou instantânea. A alavanca mais barata deu o maior ganho.

**A armadilha da invalidação.** O cache trouxe seu problema clássico: quando o Sr. Alberto marcava seu restaurante como "fechado", a mudança **não aparecia** — os clientes continuavam vendo "aberto" por causa da **cópia velha no cache** ([[83-QA-bugs-e-o-ciclo-de-correcao]]). O time enfrentou a **invalidação de cache** na prática: definiu um **TTL** curto (a lista expira e se renova a cada poucos minutos) **e** uma **invalidação ativa** (quando um restaurante muda de status, o código remove aquela entrada do cache imediatamente). Equilibraram **frescor** e **eficiência** — e aprenderam por que "invalidação de cache" é fama de problema difícil.

**A CDN encurtando a distância.** As **fotos dos pratos** (pesadas, iguais para todos) eram servidas do servidor de origem, e clientes distantes reclamavam de imagens lentas — pura **latência** de distância. O time colocou as imagens numa **CDN**: agora cada cliente recebe as fotos do ponto de **borda (edge)** mais próximo — o cliente de Manaus recebe de um servidor no Norte, o de Porto Alegre do Sul. As imagens ficaram rápidas em todo o país, e o servidor de origem **parou** de gastar banda servindo milhões de imagens repetidas.

**O balanceador sustentando a escala e a resiliência.** Com a aplicação replicada em muitas cópias ([[92-De-100-a-1-milhao-de-usuarios]]), o **balanceador de carga** virou a porta de entrada: distribui os pedidos entre as réplicas do serviço, terminando o HTTPS e fazendo **health checks**. Na Black Friday, ele espalhou a torrente de tráfego pelas 30 réplicas auto-escaladas. E na pane de uma zona da AWS ([[87-O-que-e-computacao-em-nuvem]]), foi ele que salvou o dia: detectou que as réplicas daquela zona não respondiam e **parou de mandar tráfego** para elas, mantendo o sistema no ar pelas réplicas das outras zonas. Escala e resiliência, na mesma peça.

**As três juntas na tela inicial.** Quando um cliente abre a SaborExpress, as três alavancas agem juntas: a **CDN** entrega as imagens dos pratos da borda próxima; o **balanceador** manda a requisição dinâmica para uma réplica livre; e essa réplica serve a lista de restaurantes do **cache** Redis sem tocar no banco. Cada uma tirou uma fatia da carga — e o resultado é uma tela que abre em instantes mesmo com milhões de usuários simultâneos.

**A disciplina de não exagerar.** O time também soube o que **não** cachear: o **saldo/status do pedido em andamento** muda a cada segundo e precisa estar sempre fresco — cachear isso mostraria informação errada ao cliente ansioso pelo pedido. A regra que seguiram: cachear o **muito lido e pouco mutável** (restaurantes, cardápios), nunca o **crítico e volátil** (status do pedido ao vivo, que usa tempo real — [[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]]).

Moral: as três alavancas sustentaram a escala da SaborExpress atacando gargalos diferentes — o **cache** tirou ~85% da carga de leitura do banco (com o desafio da invalidação), a **CDN** eliminou a latência das imagens no país todo, e o **balanceador** distribuiu o tráfego e deu resiliência na pane. E a disciplina foi cachear o certo (muito lido, pouco mutável) e nunca o volátil-crítico.

---

## 🏢 Como isso acontece em uma empresa

- **Cache é a otimização de escala nº 1.** É a primeira e mais eficaz alavanca quando o banco aperta. Redis e Memcached são onipresentes. Saber cachear bem (e invalidar) é competência muito valorizada.
- **"Invalidação de cache" é piada e problema real.** A frase "só há duas coisas difíceis na computação: invalidação de cache e nomear coisas" é famosa justamente porque a invalidação atormenta engenheiros de verdade, todos os dias.
- **CDN é padrão para qualquer site sério.** Cloudflare, Akamai, CloudFront e outras servem uma fração enorme do tráfego da internet. Praticamente todo conteúdo estático relevante passa por uma CDN.
- **CDNs viraram muito mais que arquivos estáticos.** Além de servir imagens, hoje elas oferecem segurança (proteção contra ataques DDoS), e **edge computing** (rodar lógica na borda), empurrando computação para perto do usuário.
- **Balanceadores são invisíveis mas onipresentes.** Todo sistema com alta disponibilidade tem balanceadores (na nuvem, gerenciados: ALB da AWS, etc.). São a base silenciosa da escala horizontal e da resiliência.
- **O cache pode virar um problema próprio.** Caches mal gerenciados causam bugs sutis (dados velhos), e a queda de um cache do qual o sistema virou dependente pode derrubar tudo (o banco não aguenta a carga sem o cache). Cache exige respeito.
- **Latência é dinheiro.** Estudos mostram que cada centena de milissegundos a mais de latência reduz conversão e receita. Por isso empresas investem pesado em CDN e cache — a velocidade percebida afeta o negócio diretamente ([[97-Metricas-de-produto-e-medicao-de-impacto]]).

---

## ⚠️ Erros comuns

- **Não cachear o que deveria.** Bater no banco para cada leitura repetida de dado que muda pouco. Perde-se a alavanca mais barata de escala.
- **Cachear o que não deveria.** Cachear dados críticos e voláteis (saldo, status ao vivo), mostrando informação velha ao usuário. Cachear o muito lido e pouco mutável.
- **Invalidação mal feita.** Esquecer de invalidar quando o dado muda (dados velhos eternos) ou invalidar demais (o cache nunca serve). O equilíbrio é o desafio.
- **Depender cegamente do cache.** Construir um sistema que **não sobrevive** sem o cache — se ele cai, o banco desaba sob a carga. O cache deve ser otimização, não muleta vital sem plano B.
- **Não usar CDN para estático.** Servir imagens e arquivos pesados do servidor de origem, gastando banda e entregando devagar para usuários distantes.
- **Colocar dinâmico/personalizado na CDN sem cuidado.** Cachear na CDN uma página personalizada pode vazar o conteúdo de um usuário para outro. Cuidado com o que é compartilhável.
- **Esquecer os health checks no balanceador.** Um balanceador sem health check manda tráfego para réplicas mortas. A verificação de saúde é o que dá a resiliência.
- **Adicionar as três alavancas cedo demais.** Montar CDN, Redis e balanceador para 100 usuários é complexidade prematura ([[92-De-100-a-1-milhao-de-usuarios]]). Use quando a escala pedir.

---

## 💡 Dicas profissionais

- **Cache primeiro o muito lido e pouco mutável.** É o maior ganho com o menor risco. Listas, catálogos, configurações — ótimos candidatos; dados voláteis e críticos, não.
- **Escolha a estratégia de invalidação conscientemente.** TTL para tolerar alguma defasagem; invalidação ativa quando o frescor é crítico; frequentemente os dois juntos. Pense no custo de servir dado velho.
- **Não deixe o sistema virar refém do cache.** Garanta que ele degrade (fique mais lento) mas **não caia** se o cache sumir. Cache é otimização, não dependência vital sem plano.
- **Use CDN para todo conteúdo estático.** Imagens, vídeos, CSS, JS. É barato, universal e melhora a experiência no mundo todo. Não sirva estático da origem.
- **Lembre que latência é distância.** Aproxime o conteúdo dos usuários (CDN/edge). Cada centena de ms conta para a experiência e o negócio ([[97-Metricas-de-produto-e-medicao-de-impacto]]).
- **Sempre tenha health checks no balanceador.** É o que transforma "muitas réplicas" em "resiliência". Sem ele, o balanceador manda tráfego para máquinas mortas.
- **Meça o cache hit rate.** A taxa de acertos do cache diz se ele está valendo a pena. Hit rate baixo indica cache mal dimensionado ou mal usado.
- **Aplique quando a escala pedir.** Poderosas, mas não gratuitas em complexidade. Adicione guiado por dados de gargalo, não por antecipação.

---

## 🎈 Curiosidades

- A frase **"there are only two hard things in computer science: cache invalidation and naming things"** (só há duas coisas difíceis na ciência da computação: invalidação de cache e nomear coisas), atribuída a Phil Karlton, é provavelmente a piada mais citada da área. Existe uma versão estendida: "...e erros de contagem por um" (off-by-one errors) — uma piada dentro da piada, já que ela lista "duas" mas apresenta três.
- A **Cloudflare**, uma das maiores CDNs do mundo, serve uma fração tão grande do tráfego da internet que, quando ela tem uma pane, uma parte enorme dos sites do mundo fica inacessível ao mesmo tempo — um lembrete de quanto da web moderna repousa sobre poucas CDNs, ecoando a mesma concentração das nuvens ([[87-O-que-e-computacao-em-nuvem]]).
- A **latência** tem um limite físico intransponível: a **velocidade da luz**. Uma requisição de São Paulo a um servidor em Tóquio precisa percorrer milhares de quilômetros, e nem a melhor tecnologia do mundo pode fazer a informação viajar mais rápido que a luz. Por isso a única forma de reduzir latência de distância é **aproximar fisicamente** o conteúdo — a razão de existir das CDNs. Engenheiros brincam que "você não pode negociar com a física".
- O termo **"thundering herd"** (manada em disparada) descreve um problema clássico de cache: quando um item popular **expira** ao mesmo tempo, milhares de requisições que teriam sido "hits" viram "misses" **simultaneamente** e correm todas para o banco de uma vez, podendo derrubá-lo — a "estampida da manada". Existem técnicas específicas só para amortecer esse efeito, mostrando como o cache tem sutilezas próprias.
- O **Memcached** foi criado em 2003 para o site **LiveJournal**, e o **Redis** em 2009 — ambos nasceram da necessidade prática de tirar carga de bancos de dados sobrecarregados. O Redis cresceu tanto além de "só cache" (virou um canivete suíço de estruturas de dados em memória) que hoje é usado para filas, rankings, sessões e muito mais.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Cache** | Guardar o resultado pronto do que é muito pedido, para não refazer. |
| **Cache hit / miss** | Achar (hit) ou não achar (miss) o dado no cache. |
| **TTL (Time To Live)** | Prazo de validade de um item no cache antes de expirar. |
| **Invalidação de cache** | Atualizar/remover o cache quando o dado original muda. |
| **Stale (velho)** | Dado desatualizado servido do cache após a origem mudar. |
| **CDN** | Rede de servidores que serve conteúdo do ponto mais próximo do usuário. |
| **Edge (borda)** | Os pontos da CDN próximos aos usuários. |
| **Latência** | Atraso de ida-e-volta dos dados pela rede (ligado à distância). |
| **Balanceador de carga** | Distribui as requisições entre réplicas e desvia das que falham. |
| **Health check** | Verificação de saúde que detecta réplicas caídas. |
| **Redis / Memcached** | Armazéns em memória usados como cache dedicado. |

---

## 📝 Resumo

- **Cache, CDN e balanceador** são as **três alavancas** mais usadas para escalar um sistema sem reescrevê-lo, atacando o problema por ângulos diferentes: **trabalhar menos** (cache), **encurtar a distância** (CDN) e **repartir o trabalho** (balanceador).
- O **cache** guarda o resultado pronto do que é **caro e muito pedido**, servindo a cópia da memória em vez de refazer — a alavanca de escala de **leitura** mais barata (pode tirar 85%+ da carga do banco). Conceitos: **hit/miss**, **TTL** (validade). Seu perigo é a **invalidação**: quando o dado muda, a cópia fica **velha (stale)** — reconhecidamente um dos problemas difíceis da computação. Regra: cachear o **muito lido e pouco mutável**, nunca o **crítico e volátil**.
- A **CDN** ataca a **latência de distância** (a luz não é instantânea) **espalhando cópias** do conteúdo estático (imagens, vídeos, CSS/JS) por servidores nas **bordas (edge)** perto dos usuários — cada um recebe do ponto mais próximo, rápido, aliviando a origem.
- O **balanceador de carga** é a porta de entrada da escala horizontal: distribui as requisições entre as **réplicas** e, com **health checks**, desvia das que caíram — dando **escala e resiliência** na mesma peça (foi ele que manteve a SaborExpress no ar quando uma zona da nuvem caiu).
- As três trabalham **juntas** numa requisição (CDN serve o estático, balanceador escolhe a réplica, cache evita o banco), cada uma tirando uma fatia da carga. Como toda técnica de escala, são para **quando os dados pedem** ([[89-Logs-metricas-e-tracing]]) — mas por darem muito ganho com pouco esforço (o cache, sobretudo), costumam ser as **primeiras** a aplicar quando a carga cresce.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é cache e por que é a alavanca de leitura mais barata.
- [ ] Entendo hit, miss, TTL e o problema da invalidação de cache.
- [ ] Sei o que é uma CDN e como ela reduz a latência de distância.
- [ ] Explico o balanceador de carga e como health checks dão resiliência.
- [ ] Sei o que cachear (muito lido, pouco mutável) e o que não cachear.
- [ ] Vejo as três alavancas atuando juntas numa requisição.

---

## ✏️ Exercícios

**1.** Com a analogia da rede de cafeterias, explique o cache, a CDN e o balanceador de carga.

**2.** O que é a **invalidação de cache** e por que ela é considerada um problema difícil? Como TTL e invalidação ativa ajudam?

**3.** Por que uma **CDN** reduz a latência? O que ela deve servir e o que geralmente não deve?

**4.** Como o balanceador de carga traz **resiliência**, além de distribuir a carga? Qual o papel do health check?

**5. (Reflexão)** A SaborExpress cacheou a lista de restaurantes mas **não** o status do pedido ao vivo. Explique a regra por trás dessa decisão e por que cachear o dado errado teria causado problemas.

---

## 💬 Respostas comentadas

**1.** Na rede de cafeterias: o **cache** é o **café já pronto na garrafa térmica** — em vez de moer e extrair um café do zero para cada cliente, mantém-se o mais pedido pronto na térmica e serve-se na hora; é guardar o resultado pronto do que é muito pedido (mas se a receita muda, alguém precisa esvaziar a térmica, senão serve café velho — a invalidação). A **CDN** é **ter filiais em cada bairro** — em vez de uma só cafeteria na cidade (para onde quem mora longe demora a chegar), abrem-se filiais próximas e cada cliente vai à mais perto, recebendo rápido; é espalhar cópias do conteúdo perto dos usuários para reduzir a distância (latência). O **balanceador de carga** é o **organizador de filas com vários caixas** — numa cafeteria com cinco atendentes, ele direciona cada cliente para o caixa livre (em vez de todos irem para um só) e, se um atendente sai, para de mandar gente para ele; é distribuir as requisições entre as réplicas disponíveis, desviando das que caíram. As três juntas atendem a multidão: térmica serve o repetido na hora, filiais reduzem a distância, organizador reparte a fila.

**2.** A **invalidação de cache** é atualizar ou remover um item do cache quando o **dado original muda**, para que o cache não continue servindo uma cópia **velha (stale)**. É considerada difícil porque exige acertar o **momento certo**, e ambos os extremos são ruins: invalidar **tarde demais** (ou nunca) faz os usuários verem informação **desatualizada** — a lista mostra um restaurante como "aberto" depois que ele fechou; invalidar **cedo/demais** faz o cache raramente ser aproveitado, perdendo sua razão de existir (todo acesso vira um miss custoso). Além disso, é preciso **lembrar** de invalidar em **todos** os pontos do código que alteram aquele dado — é fácil esquecer um. **TTL** ajuda dando a cada item um prazo de validade automático: passado o tempo, ele expira e é rebuscado, garantindo que nada fique velho **para sempre** (ao custo de aceitar alguma defasagem até expirar) — é simples, mas não é instantâneo. **Invalidação ativa** ajuda sendo **precisa**: quando o dado muda, o código **remove/atualiza** imediatamente a entrada do cache, refletindo a mudança na hora (ao custo de ter que lembrar de fazer isso em todo lugar que altera o dado). Frequentemente usam-se os **dois juntos**: invalidação ativa para o frescor imediato quando possível, e um TTL curto como rede de segurança para o que escapar.

**3.** Uma **CDN** reduz a latência porque a latência de rede depende fortemente da **distância física** — a informação viaja pela internet a uma velocidade limitada (no limite, a da luz), então quanto mais longe o servidor, maior o atraso de ida-e-volta. A CDN **encurta essa distância** ao manter cópias do conteúdo em servidores espalhados pelo mundo (as bordas/edge) e entregar a cada usuário a partir do ponto **mais próximo** dele: um cliente em Manaus recebe de um servidor no Norte em vez de um datacenter distante, cortando os milhares de quilômetros que a informação percorreria. A CDN deve servir conteúdo **estático** — imagens, vídeos, CSS, JS, PDFs — ou seja, coisas **iguais para todos os usuários** e que mudam pouco, pois a mesma cópia pode ser reaproveitada por milhões de pessoas com segurança. Ela geralmente **não deve** servir conteúdo **dinâmico e personalizado** (a página do "seu" carrinho, dados específicos de um usuário), porque uma cópia personalizada não pode ser compartilhada — cachear na CDN algo personalizado pode inclusive **vazar** o conteúdo de um usuário para outro. (Técnicas modernas de edge computing estão empurrando parte da lógica dinâmica para a borda, mas com cuidado.)

**4.** O balanceador de carga traz **resiliência** porque, além de distribuir as requisições entre as várias réplicas, ele monitora continuamente a **saúde** delas por meio de **health checks** — verificações periódicas de que cada réplica está respondendo corretamente. Quando uma réplica **cai** ou para de responder (por uma falha, uma pane na zona da nuvem onde ela está), o health check **detecta** isso, e o balanceador **automaticamente para de enviar tráfego** para a réplica defeituosa, redirecionando todas as requisições para as réplicas **saudáveis** restantes. Assim, a falha de uma (ou várias) réplicas **não derruba** o sistema — os usuários continuam sendo atendidos pelas que estão de pé, muitas vezes sem nem perceber que algo falhou. O papel do health check é justamente ser os "olhos" do balanceador: sem ele, o balanceador continuaria mandando tráfego para máquinas mortas (e esses usuários receberiam erros), e a promessa de resiliência da escala horizontal não se cumpriria. É o health check que transforma "ter muitas réplicas" em "tolerância a falhas" — foi exatamente esse mecanismo que manteve a SaborExpress no ar quando uma zona inteira da AWS teve uma pane.

**5.** A regra por trás da decisão é: **cachear o que é muito lido e pouco mutável; nunca cachear o que é crítico e volátil**. A **lista de restaurantes** se encaixa perfeitamente no primeiro caso — é consultada milhares de vezes por minuto (muito lida) e muda pouco (restaurantes não abrem/fecham a cada segundo), então cacheá-la dá um ganho enorme (tira ~85% da carga do banco) com risco baixo: no pior caso, a lista fica alguns minutos defasada, o que é tolerável (e mitigado por TTL curto + invalidação ativa quando um restaurante muda de status). Já o **status do pedido ao vivo** ("preparando", "saiu para entrega", "chegando") é **crítico e volátil**: muda a cada poucos minutos e o cliente ansioso está olhando **exatamente** para essa informação em tempo real. Cachear esse dado teria causado problemas graves — o cliente veria um status **velho** (o pedido já saiu para entrega, mas a tela diz "preparando"), gerando confusão, ligações para o suporte e desconfiança no app, justamente no momento mais sensível da experiência. O custo de servir esse dado desatualizado é altíssimo, enquanto o ganho de cache seria baixo (cada pedido é individual, pouco compartilhável entre usuários). Por isso o status ao vivo usa comunicação em **tempo real** ([[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]]), sempre fresco, e nunca o cache. A decisão mostra que cachear não é "sempre bom": é preciso pesar, para cada dado, o **ganho** (quão lido e compartilhável) contra o **risco** (quão grave é servi-lo velho) — e o status ao vivo tem ganho baixo e risco altíssimo, o oposto da lista de restaurantes.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[92-De-100-a-1-milhao-de-usuarios]] — a jornada de escala onde estas alavancas aparecem.
- **Próximo (linear):** [[94-Filas-particionamento-e-microsservicos-na-pratica]] — as técnicas para escalar as escritas (estágio 5).
- **Base:** [[70-NoSQL-cache-e-busca]] (cache e Redis) e [[71-Confiabilidade-e-escala-do-banco]] (réplicas de leitura).
- **Aplicação:** [[87-O-que-e-computacao-em-nuvem]] (CDN e regiões) e [[97-Metricas-de-produto-e-medicao-de-impacto]] (latência e negócio).

---

> 🧭 **Você está aqui:** Volume 4 → Módulo 28 → **Capítulo 93 de 119**.
