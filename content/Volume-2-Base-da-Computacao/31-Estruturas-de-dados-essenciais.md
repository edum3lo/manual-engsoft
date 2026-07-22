# Capítulo 31 — Estruturas de dados essenciais

> **Volume 2 — A Base da Computação** · Módulo 8 — Lógica e Programação
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é uma **estrutura de dados** e por que a escolha certa muda tudo.
- Conhecer as estruturas essenciais: **lista/array**, **pilha**, **fila**, **dicionário (mapa)**, **conjunto**, **árvore** e **grafo**.
- Saber **quando usar cada uma**, com exemplos do mundo real.
- Entender as diferenças de comportamento (ordem, acesso, duplicatas) sem entrar em matemática pesada.
- Ligar as estruturas ao desempenho (uma prévia do Big O, próximo capítulo).
- Reconhecer essas estruturas em problemas da SaborExpress e em entrevistas.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 25 minutos de exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- [[30-Logica-de-programacao-sem-trauma]] (variáveis, laços, funções) — é a base direta.

---

## 📖 Introdução

No capítulo anterior, uma variável guardava **um** valor: um nome, um preço. Mas software real lida com **muitos** dados ao mesmo tempo: a lista de pratos de um restaurante, a fila de pedidos, o cadastro de milhares de clientes. Precisamos de formas de **organizar coleções** de dados — e é isso que são as **estruturas de dados**.

Aqui está uma verdade que separa quem programa "funcionando" de quem programa "bem": **escolher a estrutura de dados certa costuma ser mais importante do que escrever um código esperto.** Usar a estrutura errada faz um programa que deveria ser instantâneo levar minutos; usar a certa resolve o problema com elegância. Como disse um pioneiro da computação, "algoritmos + estruturas de dados = programas".

Não vamos mergulhar em matemática nem em implementações complexas. O objetivo é você **conhecer as ferramentas da caixa** e, principalmente, saber **qual pegar para cada trabalho**. Esse discernimento é ouro puro — na prática e em entrevistas.

---

## 🧠 Analogia

Pense em **como você organiza coisas na sua casa** — cada objeto pede um organizador diferente.

- Uma **lista de compras** numerada, em ordem: você lê de cima a baixo. Isso é uma **lista/array**.
- Uma **pilha de pratos** para lavar: você tira o de cima (o último que colocou). Isso é uma **pilha (stack)** — o último a entrar é o primeiro a sair.
- A **fila do caixa** do mercado: quem chegou primeiro é atendido primeiro. Isso é uma **fila (queue)**.
- Uma **agenda telefônica**: você não lê tudo; você procura pelo **nome** e acha o telefone direto. Isso é um **dicionário/mapa** (chave → valor).
- Uma **sacola de bolinhas de gude sem repetição**: você só quer saber se tem ou não tem certa cor, e não guarda duplicatas. Isso é um **conjunto (set)**.
- Uma **árvore genealógica** ou o organograma da empresa ([[13-Por-dentro-da-empresa-areas-e-organograma]]): itens que se ramificam a partir de um topo. Isso é uma **árvore**.
- Um **mapa de cidades ligadas por estradas**: pontos conectados entre si de vários jeitos. Isso é um **grafo**.

Guarde: **cada estrutura é um organizador com um jeito próprio de guardar e buscar.** Escolher errado é como guardar meias na estante de livros — funciona, mas atrapalha tudo.

---

## 🧩 Conceitos fundamentais

### 1. O que é uma estrutura de dados

Uma **estrutura de dados** é uma forma de **organizar e armazenar** uma coleção de dados na memória, de modo que certas operações (adicionar, buscar, remover, percorrer) sejam eficientes. Cada estrutura é boa para umas operações e ruim para outras — por isso existem várias.

> **Termo explicado — estrutura de dados:** uma forma organizada de guardar uma coleção de dados na memória, otimizada para certas operações (buscar, inserir, remover, percorrer).

### 2. Lista / Array: a coleção ordenada

A **lista** (ou **array**) guarda itens **em ordem**, cada um numa **posição (índice)**, começando geralmente no **0**:

```
pratos = ["pizza", "hambúrguer", "salada"]
         índice:  0         1          2
pratos[0]  →  "pizza"
```

- **Boa para:** guardar itens em sequência, acessar pela posição, percorrer todos.
- **Cuidado:** buscar um item **pelo valor** (sem saber a posição) exige varrer a lista; inserir/remover no meio pode ser custoso.

É a estrutura mais usada de todas. Quase todo "conjunto de coisas" começa como uma lista.

### 3. Pilha (Stack): último a entrar, primeiro a sair (LIFO)

A **pilha** só deixa você mexer no **topo**: você **empilha** (push) em cima e **desempilha** (pop) de cima. O último que entrou é o primeiro que sai — **LIFO** (*Last In, First Out*).

- **Exemplos reais:** o botão **"desfazer"** (Ctrl+Z desfaz a última ação primeiro); o histórico do botão **"voltar"** do navegador; a pilha de chamadas de funções de um programa (*call stack*).

### 4. Fila (Queue): primeiro a entrar, primeiro a sair (FIFO)

A **fila** é o oposto: entra no fim, sai do começo. O primeiro que chegou é o primeiro atendido — **FIFO** (*First In, First Out*).

- **Exemplos reais:** a fila de **pedidos** a preparar; tarefas a processar em ordem de chegada; mensagens numa **fila de mensagens** (um conceito central de sistemas grandes, Volume 4 — [[94]]).

### 5. Dicionário / Mapa: busca por chave

O **dicionário** (também **mapa**, *hash map*, objeto) guarda pares **chave → valor**, e permite buscar o valor **diretamente pela chave**, sem varrer nada:

```
precos = { "pizza": 40, "refri": 8, "salada": 22 }
precos["pizza"]  →  40   (acesso direto, instantâneo)
```

- **Boa para:** buscar algo por um identificador (o preço de um prato pelo nome, um usuário pelo id). É **rapidíssimo** para localizar.
- É provavelmente a estrutura mais importante depois da lista. Guardar "de-para" é onipresente.

> **Termo explicado — dicionário/mapa:** estrutura de pares chave→valor que permite buscar o valor diretamente pela chave, de forma muito rápida.

### 6. Conjunto (Set): itens únicos, sem ordem

O **conjunto** guarda itens **sem repetição** e é ótimo para responder "**este item já existe aqui?**".

- **Exemplos reais:** as **categorias** de restaurantes visitados (sem repetir), os ids de cupons já usados por um cliente (para não usar duas vezes), "quais tags únicas este prato tem".

### 7. Árvore: hierarquia que se ramifica

A **árvore** organiza dados em **hierarquia**: um **nó raiz** no topo, que se ramifica em **nós filhos**, e assim por diante.

- **Exemplos reais:** as **categorias e subcategorias** de um cardápio (Comida → Italiana → Massas → Lasanha); a estrutura de **pastas** do seu computador ([[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]); a estrutura de uma página web (HTML). Bancos de dados usam árvores por dentro (índices) para buscar rápido.

### 8. Grafo: tudo conectado com tudo

O **grafo** são **nós** ligados por **conexões (arestas)**, sem hierarquia fixa — qualquer um pode se ligar a qualquer outro.

- **Exemplos reais:** **redes sociais** (pessoas conectadas a pessoas), **mapas e rotas** (locais ligados por ruas — como o app calcula o caminho do entregador!), recomendações ("quem pediu isto também pediu aquilo").

---

## ⚙️ Como funciona na prática

A grande habilidade não é decorar as estruturas — é **escolher a certa** para cada necessidade. Veja como um mesmo sistema (a SaborExpress) usa várias, cada uma no seu lugar:

```
NECESSIDADE                                    →  ESTRUTURA ESCOLHIDA
------------------------------------------------  -------------------
Lista de pratos de um restaurante, em ordem    →  LISTA/ARRAY
Buscar o preço de um prato pelo nome            →  DICIONÁRIO (nome → preço)
Processar pedidos na ordem em que chegaram      →  FILA (FIFO)
Botão "voltar" na navegação do app              →  PILHA (LIFO)
Cupons já usados por um cliente (sem repetir)   →  CONJUNTO (SET)
Cardápio em categorias e subcategorias          →  ÁRVORE
Calcular a rota do entregador entre pontos      →  GRAFO
```

Repare no raciocínio por trás de cada escolha. "Buscar o preço pelo nome" → se você usasse uma **lista** e varresse item por item, seria lento com um cardápio grande; com um **dicionário**, o acesso é direto. "Processar na ordem de chegada" → uma **fila** garante justiça (quem pediu primeiro, primeiro sai); uma pilha faria o contrário (o último pedido sairia antes!), o que seria injusto e errado. A estrutura **carrega a regra** dentro dela.

Esse é o pulo do gato: ao pegar um problema, pergunte "**como eu preciso acessar esses dados?**" — por posição? por chave? na ordem de chegada? sem repetir? em hierarquia? A resposta aponta a estrutura. E a estrutura certa muitas vezes torna o código **mais simples e mais rápido** ao mesmo tempo. É por isso que dizemos que escolher a estrutura é metade da solução.

---

## 🍔 Aplicação na SaborExpress

As estruturas de dados são o **esqueleto invisível** da SaborExpress:

- **A fila de pedidos do restaurante** é, literalmente, uma **fila (FIFO)**: os pedidos são preparados na ordem em que chegam. Se fosse uma pilha, o cliente que pediu primeiro esperaria para sempre enquanto os novos "furam a fila" — um desastre de experiência. A estrutura escolhida **é** a regra de negócio "atender por ordem de chegada".
- **O cardápio com categorias** (Pizzas, Massas, Sobremesas → e subitens) é uma **árvore**: hierárquica, ramificada. Isso permite navegar do geral ao específico, exatamente como o cliente espera.
- **A busca de um restaurante ou prato pelo id** usa **dicionários**: quando o app precisa dos detalhes do prato número 8842, ele não varre milhares de pratos — busca direto pela chave. Isso é o que mantém o app **rápido** mesmo com um catálogo enorme.
- **O cálculo da rota do entregador** é um problema de **grafo**: os endereços são nós, as ruas são conexões, e o app procura o melhor caminho (uma prévia dos algoritmos, próximo capítulo).
- **As mensagens/eventos entre partes do sistema** (ex.: "pedido pago" → avisar a cozinha) costumam passar por **filas de mensagens**, garantindo que nada se perca e tudo seja processado em ordem (Volume 4).

Para a Ana, a consequência prática é direta: **escolhas erradas de estrutura tornam o app lento e caro** (mais CPU, mais servidor — lembra do [[19-Bits-processador-e-memoria]]) conforme a base cresce. Um app que voa com 100 pratos e trava com 100.000 quase sempre escolheu a estrutura errada. A estrutura certa é o que permite **crescer sem quebrar**.

---

## 🏢 Como isso acontece em uma empresa

- **Estruturas de dados dominam entrevistas técnicas.** Boa parte dos desafios de código (Volume 5) gira em torno de escolher e usar a estrutura certa. "Qual estrutura você usaria aqui?" é pergunta recorrente. Este capítulo é investimento direto na sua contratação.
- **A estrutura certa é decisão de arquitetura.** Em sistemas grandes, escolher entre lista, dicionário, árvore ou fila afeta desempenho, custo e escalabilidade — não é detalhe.
- **Bibliotecas já trazem tudo pronto.** Você raramente vai *implementar* uma árvore do zero no trabalho; as linguagens já oferecem listas, mapas, sets, filas prontos. O que importa é **saber qual usar** — e é nisso que focamos.
- **Bancos de dados são estruturas de dados em escala.** Índices (árvores), tabelas (listas de registros), caches (mapas). Entender estruturas aqui é a base para entender banco de dados (Volume 3) e cache (Volume 4).

---

## ⚠️ Erros comuns

- **Usar lista para tudo.** A lista é confortável, mas buscar um item por valor numa lista grande é lento. Se você busca por um identificador o tempo todo, quer um **dicionário**.
- **Escolher a estrutura errada para a regra.** Usar uma pilha onde a regra é "ordem de chegada" (deveria ser fila) inverte o comportamento e gera bugs de negócio.
- **Ignorar duplicatas quando não deveria haver.** Guardar itens que deveriam ser únicos numa lista (em vez de um **conjunto**) leva a repetições e verificações manuais propensas a erro.
- **Achar que "funciona com poucos dados" basta.** Muitas estruturas erradas funcionam com 10 itens e desmoronam com 1 milhão. Pense em como vai escalar (próximo capítulo, Big O).
- **Decorar implementações em vez de entender usos.** Saber recitar como uma árvore é montada por dentro vale menos, no dia a dia, do que saber **quando** usar uma. Foque no discernimento.

---

## 💡 Dicas profissionais

- **Diante de uma coleção, pergunte "como vou acessar isto?".** Por posição → lista. Por chave/id → dicionário. Ordem de chegada → fila. Última ação → pilha. Sem repetir → conjunto. Hierarquia → árvore. Conexões → grafo. Essa pergunta escolhe a estrutura quase sozinha.
- **Aprenda profundamente lista e dicionário primeiro.** Elas resolvem a grande maioria dos casos do dia a dia. As outras entram em situações mais específicas.
- **Deixe a estrutura carregar a regra.** Se a regra é "ordem de chegada", uma fila **impõe** isso naturalmente — menos código e menos bugs do que controlar a ordem "na mão".
- **Pense no crescimento.** Pergunte "e se isto tiver um milhão de itens?". A resposta muitas vezes muda a estrutura escolhida — e evita a reescrita dolorosa depois.
- **Conecte com o próximo capítulo.** A eficiência de cada operação (buscar, inserir) numa estrutura é medida pelo **Big O**. Estrutura e desempenho andam juntos.

---

## 🎈 Curiosidades

- A frase **"Algoritmos + Estruturas de Dados = Programas"** é o título de um livro clássico de **Niklaus Wirth** (1976). Décadas depois, a equação continua sendo uma das definições mais precisas do que é programar.
- O **dicionário/hash map** é tão eficiente para buscas que sustenta boa parte da velocidade da internet — de caches a bancos de dados. Sua "mágica" (transformar uma chave num endereço direto) é uma das ideias mais elegantes da computação.
- **Grafos** estão por trás de coisas que você usa todo dia sem perceber: o "amigos em comum" das redes sociais, o "melhor caminho" dos apps de mapa, o "quem você deveria seguir". Boa parte das gigantes de tecnologia é, no fundo, uma empresa de grafos.
- A **pilha de chamadas** (call stack) é o que gera o famoso **"stack overflow"** — quando um programa empilha chamadas de função demais (por exemplo, uma função que se chama sem parar) e "estoura" a pilha. É também o nome do site onde você buscará respostas a vida inteira.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Estrutura de dados** | Forma organizada de guardar uma coleção, otimizada para certas operações. |
| **Lista / Array** | Coleção ordenada, com itens acessados por índice (posição). |
| **Índice** | A posição de um item numa lista (geralmente começa em 0). |
| **Pilha (Stack)** | Último a entrar, primeiro a sair (LIFO). Ex.: desfazer, voltar. |
| **Fila (Queue)** | Primeiro a entrar, primeiro a sair (FIFO). Ex.: fila de pedidos. |
| **Dicionário / Mapa** | Pares chave→valor com busca direta e rápida pela chave. |
| **Conjunto (Set)** | Coleção de itens únicos, sem repetição e sem ordem garantida. |
| **Árvore** | Estrutura hierárquica que se ramifica de uma raiz. Ex.: categorias, pastas. |
| **Grafo** | Nós conectados por arestas, sem hierarquia. Ex.: redes, mapas, rotas. |
| **LIFO / FIFO** | Last-In-First-Out / First-In-First-Out (o "sentido" da pilha e da fila). |

---

## 📝 Resumo

- Uma **estrutura de dados** organiza uma coleção de dados para tornar certas operações eficientes; escolher a certa costuma importar mais que "código esperto".
- **Lista/array**: ordenada, acesso por índice. **Pilha**: LIFO (desfazer, voltar). **Fila**: FIFO (ordem de chegada). **Dicionário/mapa**: busca rápida por chave. **Conjunto**: itens únicos. **Árvore**: hierarquia. **Grafo**: conexões livres (redes, rotas).
- A pergunta-guia é "**como preciso acessar estes dados?**" — por posição, por chave, por ordem de chegada, sem repetir, em hierarquia, ou por conexões.
- A estrutura certa **carrega a regra de negócio** (uma fila *é* "ordem de chegada") e mantém o sistema **rápido e barato** conforme cresce; a errada trava com escala.
- No trabalho, você **escolhe** estruturas (as linguagens já as fornecem prontas) — e essa escolha domina entrevistas técnicas e decisões de arquitetura.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo o que é uma estrutura de dados e por que existem várias.
- [ ] Sei o comportamento de lista, pilha (LIFO) e fila (FIFO) e um exemplo real de cada.
- [ ] Uso dicionário/mapa para busca por chave e conjunto para itens únicos.
- [ ] Reconheço quando um problema é de árvore (hierarquia) ou de grafo (conexões).
- [ ] Consigo escolher a estrutura certa perguntando "como vou acessar os dados?".
- [ ] Entendo que a escolha afeta a velocidade e o custo conforme o sistema cresce.

---

## ✏️ Exercícios

**1.** Para cada caso, diga a estrutura mais adequada e por quê: (a) o histórico do botão "voltar"; (b) buscar um usuário pelo seu id; (c) a fila de atendimento de um caixa; (d) as tags únicas de um produto.

**2.** Explique a diferença entre pilha e fila, com um exemplo real de cada.

**3.** Por que buscar o preço de um prato pelo nome é melhor num dicionário do que numa lista? O que muda quando há 100.000 pratos?

**4.** O cardápio da SaborExpress tem categorias, subcategorias e pratos. Que estrutura representa isso naturalmente? Justifique.

**5. (Reflexão)** Um desenvolvedor guardou a fila de pedidos numa **pilha** por engano. Que comportamento errado os clientes veriam, e por que isso ilustra que "a estrutura carrega a regra de negócio"?

---

## 💬 Respostas comentadas

**1.** (a) **Pilha** — o "voltar" desfaz a última navegação primeiro (LIFO). (b) **Dicionário/mapa** — busca direta pela chave (o id), rápida mesmo com muitos usuários. (c) **Fila** — atendimento por ordem de chegada (FIFO). (d) **Conjunto (set)** — tags únicas, sem repetição.

**2.** **Pilha** é LIFO (último a entrar, primeiro a sair) — ex.: Ctrl+Z desfaz a ação mais recente primeiro. **Fila** é FIFO (primeiro a entrar, primeiro a sair) — ex.: a fila do caixa, onde quem chegou antes é atendido antes. A diferença é de qual "ponta" se remove os itens.

**3.** No **dicionário**, o preço é buscado **diretamente pela chave** (o nome), praticamente instantâneo. Numa **lista**, você teria que **varrer** item por item até achar o prato certo. Com 100.000 pratos, a lista fica lenta (pode precisar checar todos), enquanto o dicionário continua rápido — a diferença de desempenho, invisível com poucos itens, se torna gritante em escala (tema do próximo capítulo, Big O).

**4.** Uma **árvore**: as categorias são ramos que partem de uma raiz (o cardápio), subdividindo-se em subcategorias e, nas pontas, os pratos. A hierarquia natural do cardápio (do geral ao específico) mapeia exatamente a estrutura ramificada de uma árvore.

**5.** Com uma **pilha (LIFO)**, o **último** pedido a chegar seria preparado **primeiro**, e quem pediu no início ficaria esperando indefinidamente enquanto novos pedidos "furam a fila". Os clientes veriam pedidos antigos travados e recentes saindo na frente — injusto e caótico. Isso mostra que a estrutura **é** a regra: escolher fila impõe "ordem de chegada" automaticamente; escolher pilha impõe o oposto, sem que ninguém tenha "programado" essa injustiça — ela veio da estrutura errada.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[32-Algoritmos-e-complexidade-Big-O]] — quão rápida é cada operação nessas estruturas.
- **Base anterior:** [[30-Logica-de-programacao-sem-trauma]] — as variáveis e laços que manipulam essas coleções.
- **Aplicação futura:** Volume 3 (Banco de Dados — índices são árvores; tabelas são listas de registros) e Volume 4 (Cache — dicionários; filas de mensagens).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 8 → **Capítulo 31 de 119**.
