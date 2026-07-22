# Capítulo 32 — Algoritmos e complexidade (Big O sem medo)

> **Volume 2 — A Base da Computação** · Módulo 8 — Lógica e Programação
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é um **algoritmo** com mais profundidade e por que existem formas melhores e piores de resolver o mesmo problema.
- Compreender a ideia de **complexidade** e a notação **Big O** — sem matemática assustadora.
- Reconhecer as complexidades mais comuns: **O(1)**, **O(log n)**, **O(n)**, **O(n log n)**, **O(n²)**.
- Entender a diferença prática entre uma **busca linear** e uma **busca binária**, e por que ordenar bem importa.
- Saber por que "funciona com poucos dados" pode ser um desastre com muitos.
- Usar essa lente para escrever código que **escala** — e para brilhar em entrevistas.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 25 minutos de exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).** Tem fama de assustador, mas vamos torná-lo intuitivo.

---

## ✅ Pré-requisitos

- [[30-Logica-de-programacao-sem-trauma]] (algoritmos, laços) e [[31-Estruturas-de-dados-essenciais]] (a estrutura afeta a complexidade).
- Fundo útil: [[19-Bits-processador-e-memoria]] (por que gastar menos CPU importa).

---

## 📖 Introdução

Existem infinitas formas de resolver o mesmo problema com código — e algumas são **milhões de vezes** mais rápidas que outras. "Big O" é a linguagem que os engenheiros usam para conversar sobre isso: uma forma de dizer "quão bem este algoritmo aguenta o crescimento dos dados" sem precisar cronometrar cada caso.

Muita gente tem pavor de Big O por causa da notação matemática (`O(n²)`, `O(log n)`) e das aulas cheias de fórmulas. Vamos por outro caminho: o que importa não é a matemática, é a **intuição** — "este código fica lento quando os dados crescem?". Essa pergunta, e a capacidade de responder a ela, é uma das habilidades mais valorizadas da profissão.

Este capítulo fecha o "coração" da programação (lógica → estruturas → complexidade). Ele conecta tudo: a lógica que você escreve, sobre as estruturas que você escolhe, roda numa CPU real ([[19-Bits-processador-e-memoria]]) — e o Big O prevê se vai voar ou travar quando a SaborExpress sair de 100 para 1 milhão de usuários.

---

## 🧠 Analogia

Imagine que você precisa **achar um nome numa lista telefônica** de um milhão de nomes.

**Jeito 1 — página por página, do começo:** você lê o primeiro nome, o segundo, o terceiro... até achar. Se o nome estiver no fim, você leu um milhão de nomes. Dobre a lista (dois milhões), e você lê o dobro. O esforço **cresce na mesma proporção** do tamanho. Isso é **O(n)** — busca linear.

**Jeito 2 — abrindo no meio (a lista está em ordem alfabética):** você abre no meio; o nome que procura vem antes ou depois? Descartou metade de uma vez. Abre no meio da metade que sobrou; descartou metade de novo. Em ~20 saltos você acha o nome entre **um milhão**. Dobre a lista, e você precisa de **apenas 1 salto a mais**. Isso é **O(log n)** — busca binária.

A diferença é brutal: para um milhão de nomes, o Jeito 1 faz até um milhão de passos; o Jeito 2, cerca de vinte. **Mesmo problema, algoritmos com "classes de eficiência" completamente diferentes.** Guarde essa cena: Big O é sobre **como o esforço cresce quando os dados crescem** — e é a diferença entre ler a lista inteira e abrir direto na página certa.

---

## 🧩 Conceitos fundamentais

### 1. Algoritmo, revisitado: há sempre mais de um jeito

Você já viu ([[30-Logica-de-programacao-sem-trauma]]) que algoritmo é uma sequência de passos. O ponto novo aqui: para **qualquer** problema, existem vários algoritmos, e eles diferem em **quanto trabalho** exigem. Ordenar uma lista, buscar um item, encontrar duplicatas — cada um tem soluções mais e menos eficientes. Escolher bem é engenharia.

### 2. O que Big O mede (e o que ignora)

O **Big O** descreve **como o tempo (ou a memória) de um algoritmo cresce conforme a entrada cresce**. O "n" é o **tamanho da entrada** (número de itens).

Pontos-chave para não se assustar:

- Big O olha o **crescimento**, não o tempo exato. Não diz "2,3 segundos"; diz "se você dobrar os dados, o tempo dobra / quadruplica / mal muda".
- Ele foca no **pior caso** e no que **domina** quando n fica grande (ignora detalhes constantes). `O(n)` e "`O(2n + 5)`" são a mesma classe: crescem linearmente.
- É uma linguagem para **comparar** abordagens, não uma medição de cronômetro.

> **Termo explicado — Big O:** notação que descreve como o esforço de um algoritmo (tempo ou memória) cresce em função do tamanho da entrada (n). Mede escalabilidade, não segundos exatos.

### 3. As complexidades que você precisa reconhecer

Da mais rápida (melhor) à mais lenta (pior), com intuição:

| Big O | Nome | Intuição | Exemplo |
|---|---|---|---|
| **O(1)** | Constante | Não importa o tamanho, é sempre o mesmo esforço | Pegar um item pela chave num **dicionário**; acessar `lista[0]` |
| **O(log n)** | Logarítmica | A cada passo, descarta metade | **Busca binária** numa lista ordenada |
| **O(n)** | Linear | Esforço cresce junto com os dados | **Percorrer** uma lista inteira; busca linear |
| **O(n log n)** | "n log n" | Um pouco pior que linear; típico de boa ordenação | Algoritmos eficientes de **ordenação** |
| **O(n²)** | Quadrática | Para cada item, percorre todos de novo | Dois laços aninhados; comparar todos com todos |

Uma imagem do crescimento com n = 1.000.000:

```
O(1)        →  1 passo               (instantâneo)
O(log n)    →  ~20 passos            (voa)
O(n)        →  1.000.000 passos      (ok, mas sente)
O(n log n)  →  ~20.000.000 passos    (aceitável para ordenar)
O(n²)       →  1.000.000.000.000 passos  (TRAVA — um trilhão!)
```

Repare: `O(n²)` com um milhão de itens é um **trilhão** de operações — inviável. O mesmo problema em `O(n log n)` é 50 mil vezes menor. É por isso que Big O não é academicismo: é a diferença entre um sistema que responde e um que congela.

### 4. Busca linear × busca binária (o exemplo canônico)

- **Busca linear — O(n):** olhar item por item até achar. Funciona em qualquer lista, mas é lenta em listas grandes.
- **Busca binária — O(log n):** em uma lista **ordenada**, abrir no meio e descartar metade a cada passo. Muito mais rápida — mas **exige que os dados estejam ordenados**.

Essa é a intuição da nossa lista telefônica. E revela um princípio: às vezes vale **pagar o custo de organizar os dados** (ordenar, ou montar um índice) para depois buscar muito mais rápido, muitas vezes. Isso liga direto a **índices de banco de dados** (Volume 3) — que são estruturas para transformar buscas O(n) em O(log n).

### 5. A estrutura de dados define a complexidade

Aqui os dois últimos capítulos se encontram. **A mesma operação tem complexidades diferentes conforme a estrutura** ([[31-Estruturas-de-dados-essenciais]]):

- Buscar por valor numa **lista**: O(n) (varre tudo). Buscar por chave num **dicionário**: O(1) (direto).
- Por isso "usar lista para tudo" ([[31-Estruturas-de-dados-essenciais]]) é um problema: você transforma buscas que poderiam ser O(1) em O(n). A escolha da estrutura **é** uma escolha de complexidade.

### 6. Complexidade de tempo × de espaço

Big O também mede **memória** (complexidade de espaço), não só tempo. Às vezes você **troca memória por velocidade**: guardar resultados prontos (num dicionário/cache) gasta mais RAM, mas evita recalcular — deixando o tempo menor. Esse **trade-off tempo × espaço** é uma decisão constante de engenharia (e a base de **cache**, Volume 4).

---

## ⚙️ Como funciona na prática

Vamos ver a diferença ganhando vida num problema real da SaborExpress: **verificar se um cupom já foi usado**, numa base que cresce.

```
PROBLEMA: um cliente tenta usar um cupom. Ele já foi usado antes?

❌ Abordagem O(n) — cupons guardados numa LISTA:
   para cada cupom na lista_de_cupons_usados faça
       se cupom == cupom_atual então retornar "já usado"
   retornar "válido"
   → com 10 cupons: rápido. Com 10 MILHÕES: varre até 10 milhões por tentativa. TRAVA.

✅ Abordagem O(1) — cupons guardados num CONJUNTO (set) / dicionário:
   se cupom_atual está no conjunto_de_usados então retornar "já usado"
   senão retornar "válido"
   → com 10 ou 10 milhões: praticamente o MESMO tempo, instantâneo.
```

O mesmo problema, resolvido de dois jeitos, com destinos opostos ao crescer. Com poucos cupons, **ninguém notaria a diferença** — os dois "funcionam". Mas quando a SaborExpress viraliza e a base explode, a versão O(n) derruba o servidor (mais CPU, mais custo, [[19-Bits-processador-e-memoria]]) enquanto a O(1) nem sua. E o "conserto" foi só **trocar a estrutura de dados** — exatamente o elo com o capítulo anterior.

Agora o alerta clássico dos **laços aninhados** (O(n²)):

```
⚠️ "Para cada cliente, comparar com todos os outros clientes" (achar pares):
   para cada cliente A faça
       para cada cliente B faça
           comparar A e B
   → 1.000 clientes = 1 milhão de comparações. 1 milhão de clientes = 1 TRILHÃO.
```

Sempre que você vê um **laço dentro de um laço** sobre os mesmos dados grandes, acende uma luz amarela: pode ser O(n²), e há grande chance de existir uma solução melhor (frequentemente usando um dicionário para evitar o laço interno). Reconhecer esse padrão é uma das habilidades mais úteis do dia a dia.

---

## 🍔 Aplicação na SaborExpress

**A diferença entre 100 e 1 milhão de usuários é toda sobre complexidade.** No começo, a SaborExpress tem poucos restaurantes e pedidos; quase qualquer código "funciona". Mas o sonho da Ana é crescer — e é aí que o Big O cobra a conta. Uma busca de restaurantes que é O(n) (varre todos) fica imperceptível com 50 restaurantes e **insuportável** com 500 mil. O código não "quebrou"; ele apenas nunca foi feito para escalar. Prevenir isso é o que o Volume 4 chama de escalabilidade ([[92]]) — e começa aqui, na escolha de algoritmos e estruturas.

**Complexidade é dinheiro.** Lembre do [[19-Bits-processador-e-memoria]]: código que gasta mais CPU exige servidores maiores, que custam mais por mês. Um algoritmo O(n²) onde caberia O(n log n) pode multiplicar por milhares a conta de nuvem da SaborExpress sob carga — ou simplesmente derrubar o app na hora do almoço, quando mais importa. Escrever código eficiente não é vaidade técnica: é margem de lucro e disponibilidade do serviço.

**Onde a Ana sente na pele.** A busca de pratos, o cálculo de rotas do entregador (um problema de **grafo**, [[31-Estruturas-de-dados-essenciais]], com algoritmos famosos de menor caminho), o "restaurantes perto de você", o "quem pediu isto também pediu aquilo" — todos são problemas onde a **escolha do algoritmo** decide se a experiência é fluida ou frustrante. Um app lento perde clientes para o concorrente que abre mais rápido (lembre: 100 ms importam, [[29-O-que-acontece-quando-voce-digita-google-ponto-com]]). A complexidade é invisível para o cliente — mas ele **sente** cada milissegundo.

---

## 🏢 Como isso acontece em uma empresa

- **Big O é obrigatório em entrevistas técnicas.** Praticamente todo processo seletivo de empresa de tecnologia (Volume 5) pede que você analise a complexidade da sua solução e a melhore. "Qual o Big O disso? Dá para fazer melhor?" é o roteiro clássico.
- **Code reviews caçam ineficiências.** Ao revisar código (Volume 3), colegas apontam laços aninhados suspeitos, buscas lineares onde caberia um mapa, e outras armadilhas de complexidade — antes que virem problema em produção.
- **Profiling revela o gargalo real.** Times medem onde o tempo é gasto de verdade. Muitas vezes o culpado é um trechinho O(n²) escondido. Big O dá o vocabulário para entender e corrigir.
- **"Otimização prematura" tem contrapeso.** Há um ditado famoso ("otimização prematura é a raiz de todo mal") que alerta contra complicar o código por ganhos irrelevantes. O equilíbrio maduro: **não micro-otimize à toa, mas nunca escolha, de saída, um algoritmo com complexidade ruim** onde um bom era igualmente simples. Escrever O(n) em vez de O(n²) desde o começo não é otimização prematura — é competência básica.

---

## ⚠️ Erros comuns

- **Testar só com poucos dados.** "Funcionou na minha máquina com 10 itens" não diz nada sobre 10 milhões. Pense sempre em como o código se comporta ao crescer.
- **Laços aninhados despercebidos.** Um `for` dentro de um `for` sobre dados grandes é a fonte número um de lentidão O(n²). Aprenda a farejá-los.
- **Buscar por valor em listas grandes.** Usar lista onde um dicionário/conjunto daria O(1). Reveja [[31-Estruturas-de-dados-essenciais]]: a estrutura errada impõe complexidade ruim.
- **Confundir Big O com tempo real.** Big O é sobre crescimento, não segundos. Um O(n) pode ser mais rápido que um O(log n) para entradas pequenas (por causa das constantes). A vantagem do melhor Big O aparece **na escala**.
- **Cair no extremo oposto: micro-otimizar tudo.** Passar horas economizando microssegundos irrelevantes, complicando o código. O foco é a **classe** de complexidade, não cada instrução.
- **Achar que precisa de matemática avançada.** Não precisa. A intuição "dobrar os dados faz o quê com o tempo?" resolve 90% dos casos práticos.

---

## 💡 Dicas profissionais

- **Ao escrever qualquer laço, pergunte "e se n for um milhão?".** Essa única pergunta previne a maioria dos problemas de escala antes de eles nascerem.
- **Veja um `for` dentro de outro `for` como luz amarela.** Não é sempre errado, mas quase sempre vale checar se há uma solução O(n) com um dicionário no lugar do laço interno.
- **Prefira dicionários/conjuntos para "existe?" e "qual o valor de?".** Trocar uma busca em lista (O(n)) por uma em mapa (O(1)) é uma das otimizações mais fáceis e impactantes que existem.
- **Aprenda a dizer o Big O das suas soluções em voz alta.** Praticar "isto é O(n) porque percorro a lista uma vez" te prepara para entrevistas e afia seu próprio pensamento.
- **Equilibre: bom Big O desde o início, micro-otimização só quando medida.** Escolha boas classes de complexidade de saída; só vá aos detalhes finos quando o profiling apontar um gargalo real.

---

## 🎈 Curiosidades

- A frase **"otimização prematura é a raiz de todo mal"** é de **Donald Knuth**, um dos maiores nomes da computação. Ela é muito citada — e frequentemente mal usada como desculpa para escrever código ineficiente. Knuth falava de micro-otimizações, não de escolher algoritmos ruins.
- A **busca binária**, apesar de simples de descrever, é notoriamente difícil de implementar sem bugs — um estudo clássico mostrou que a maioria dos programadores a escreve errado na primeira tentativa (erros de "fronteira", [[30-Logica-de-programacao-sem-trauma]]). Por isso usamos as versões prontas das bibliotecas.
- Existem problemas para os quais **não se conhece** nenhum algoritmo eficiente (os chamados "NP-difíceis", como achar a rota perfeita passando por milhares de cidades). Saber que um problema é "intrinsecamente caro" é, em si, um conhecimento valioso — evita você tentar o impossível.
- O site **Big-O Cheat Sheet** (uma "cola" com a complexidade de cada operação de cada estrutura) é um dos mais consultados por desenvolvedores no mundo. Ninguém decora tudo; consultar faz parte.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Complexidade** | Quão bem um algoritmo aguenta o crescimento dos dados. |
| **Big O** | Notação que descreve como o esforço cresce com o tamanho da entrada (n). |
| **n** | O tamanho da entrada (quantidade de itens). |
| **O(1) — constante** | Esforço fixo, não importa o tamanho (ex.: acesso por chave). |
| **O(log n) — logarítmica** | Descarta metade a cada passo (ex.: busca binária). |
| **O(n) — linear** | Esforço cresce junto com os dados (ex.: percorrer a lista). |
| **O(n log n)** | Típico de boas ordenações; pouco pior que linear. |
| **O(n²) — quadrática** | Laços aninhados; explode com o crescimento. |
| **Busca linear / binária** | Item por item / abrindo no meio de dados ordenados. |
| **Trade-off tempo × espaço** | Trocar mais memória por mais velocidade (ou vice-versa). |

---

## 📝 Resumo

- Para qualquer problema há vários **algoritmos**, com eficiências muito diferentes; o **Big O** é a linguagem para comparar como o esforço **cresce com o tamanho dos dados (n)** — mede escalabilidade, não segundos.
- Reconheça as classes: **O(1)** (constante, ótimo), **O(log n)** (busca binária), **O(n)** (percorrer), **O(n log n)** (boa ordenação), **O(n²)** (laços aninhados, explode).
- **Busca linear O(n) × busca binária O(log n)** ilustra o ganho de organizar os dados antes de buscar — a ideia dos **índices** de banco de dados.
- A **estrutura de dados escolhida define a complexidade**: buscar por chave num dicionário é O(1); varrer uma lista é O(n). Estrutura e desempenho são o mesmo assunto.
- "Funciona com poucos dados" não garante nada em escala: um O(n²) com um milhão de itens é um **trilhão** de passos. Complexidade vira **custo de servidor e disponibilidade** do serviço.
- Maturidade é: **bons algoritmos desde o início**, sem micro-otimizar à toa; e farejar laços aninhados e buscas lineares em dados grandes.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo que Big O mede crescimento com o tamanho da entrada, não tempo exato.
- [ ] Reconheço O(1), O(log n), O(n), O(n log n) e O(n²) e um exemplo de cada.
- [ ] Sei a diferença entre busca linear e binária e por que ordenar/indexar ajuda.
- [ ] Percebo que a estrutura de dados escolhida determina a complexidade.
- [ ] Farejo laços aninhados (O(n²)) e sei que muitas vezes há solução melhor.
- [ ] Consigo dizer o Big O aproximado de um trecho simples de código.

---

## ✏️ Exercícios

**1.** Explique, com a analogia da lista telefônica (ou uma sua), a diferença entre O(n) e O(log n).

**2.** Ordene da mais rápida à mais lenta (para n grande): O(n²), O(1), O(n), O(log n), O(n log n).

**3.** Um trecho tem um laço percorrendo N pedidos e, **dentro** dele, outro laço percorrendo os mesmos N pedidos. Qual a complexidade? Por que isso é perigoso quando N cresce?

**4.** A SaborExpress verifica se um cupom já foi usado varrendo uma lista de milhões de cupons a cada tentativa. Qual a complexidade atual e como você a melhoraria? Para qual complexidade?

**5. (Reflexão)** Dois algoritmos resolvem o mesmo problema: um é O(n), o outro O(n²). Com 10 itens, os dois parecem instantâneos. Explique por que ainda assim vale escolher o O(n) desde já — e por que isso **não** é "otimização prematura".

---

## 💬 Respostas comentadas

**1.** Resposta pessoal. Em **O(n)** (busca linear), você lê nome por nome; se a lista dobra, o esforço dobra. Em **O(log n)** (busca binária, lista ordenada), você abre no meio e descarta metade a cada passo; se a lista dobra, você precisa de apenas **um passo a mais**. O primeiro cresce proporcional ao tamanho; o segundo, quase nada.

**2.** Da mais rápida à mais lenta: **O(1) → O(log n) → O(n) → O(n log n) → O(n²)**.

**3.** É **O(n²)** (um laço aninhado no outro, ambos de tamanho N). É perigoso porque o número de operações cresce com o **quadrado** de N: 1.000 pedidos = 1 milhão de operações; 1 milhão de pedidos = 1 trilhão. O que parece rápido em testes pequenos trava completamente em escala.

**4.** A complexidade atual é **O(n)** por tentativa (varre a lista inteira de cupons). Para melhorar, guarde os cupons usados num **conjunto (set)** ou **dicionário**: a verificação "já foi usado?" passa a ser **O(1)** — praticamente instantânea, independentemente de haver dezenas ou milhões de cupons. É só trocar a estrutura de dados.

**5.** Vale escolher o O(n) porque, embora com 10 itens os dois sejam instantâneos, o sistema **vai crescer** — e o O(n²) desmorona em escala, exigindo uma reescrita dolorosa e possivelmente derrubando produção antes disso. Não é "otimização prematura" porque não estamos complicando o código para ganhar microssegundos: estamos escolhendo, de saída, uma **classe de complexidade adequada**, muitas vezes com esforço igual ou menor. O alerta de Knuth é contra micro-ajustes obscuros, não contra evitar algoritmos sabidamente ruins.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[33-Paradigmas-e-orientacao-a-objetos]] — as diferentes "filosofias" de organizar o código.
- **Base direta:** [[31-Estruturas-de-dados-essenciais]] (estrutura define complexidade) e [[30-Logica-de-programacao-sem-trauma]].
- **Aplicação futura:** Volume 3 (Banco de Dados — índices transformam O(n) em O(log n)) e Volume 4 ([[92]] Escalabilidade; Cache — trade-off tempo × espaço).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 8 → **Capítulo 32 de 119**.
