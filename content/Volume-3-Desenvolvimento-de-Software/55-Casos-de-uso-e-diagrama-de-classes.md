# Capítulo 55 — Casos de uso e diagrama de classes

> **Volume 3 — Desenvolvimento de Software** · Módulo 15 — Modelagem e Análise
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Ler e desenhar um **diagrama de casos de uso** (atores, casos, relações).
- Ler e desenhar um **diagrama de classes** (classes, atributos, métodos, relacionamentos).
- Entender **associação, agregação, composição, herança** e **multiplicidade** (o "1 para muitos").
- Ver como um diagrama de classes vira, quase diretamente, **código** e **tabelas de banco**.
- Usar esses dois diagramas — os mais úteis da UML — na dose certa.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[54-Por-que-modelar-antes-de-programar-UML]] — a visão geral da UML.
- **Importante:** ter lido [[33-Paradigmas-e-orientacao-a-objetos]] (Vol. 2) — classe, objeto, atributo, método, herança.

---

## 📖 Introdução

Dos 14 diagramas da UML, dois valem por quase todos os outros no dia a dia: o **diagrama de casos de uso**, que mostra **quem usa o sistema e para quê** (uma visão de fora, ótima para conversar com o cliente), e o **diagrama de classes**, que mostra **as peças internas do sistema e como se conectam** (uma visão de dentro, a que mais se aproxima do código e do banco de dados). Se você dominar só esses dois, já está à frente da maioria.

O diagrama de **casos de uso** é o mais simples e "de negócio": bonecos-palito (os atores) ligados a bolhas (as ações que eles fazem). Ele responde à pergunta que abre qualquer projeto: *"quem são os usuários e o que eles precisam fazer?"*. É um ótimo mapa da funcionalidade, compreensível até por quem não é técnico.

O diagrama de **classes** é o mais importante e o mais próximo da engenharia. Ele é o "esqueleto" do sistema orientado a objetos: as classes (`Cliente`, `Pedido`, `Produto`), o que cada uma **guarda** (atributos) e **faz** (métodos), e — o coração de tudo — **como elas se relacionam** (um `Pedido` tem vários `Itens`; um `Cliente` faz muitos `Pedidos`). Aqui está a mágica que vamos revelar: esse diagrama vira, com pouquíssima tradução, as **classes do seu código** e as **tabelas do seu banco de dados** ([[69-Modelagem-de-dados-e-normalizacao]]). Modelar bem as classes é, na prática, projetar o núcleo do sistema. Este capítulo te ensina a ler e desenhar os dois.

---

## 🧠 Analogia

Pense num **restaurante** visto de dois ângulos.

O **diagrama de casos de uso** é o **cardápio com o mapa de quem faz o quê**: o *cliente* pode "fazer pedido", "pagar a conta", "avaliar"; o *garçom* pode "anotar pedido", "servir"; o *cozinheiro* pode "preparar prato". É a visão de **fora**, de **serviço** — quem são os personagens e quais ações cada um realiza. Qualquer pessoa entende, mesmo sem saber nada de cozinha.

O **diagrama de classes** é a **planta da estrutura interna do restaurante e como as coisas se conectam**: existe uma `Mesa` (que tem número e capacidade), uma `Comanda` (que pertence a uma mesa e lista vários `Pedidos`), cada `Pedido` referencia um `PratoDoCardápio` (que tem nome e preço). É a visão de **dentro**, das **peças e suas ligações** — o que existe, o que cada coisa guarda, e como uma se liga à outra ("uma comanda tem **vários** pedidos", "cada pedido é de **um** prato").

Repare a diferença: o caso de uso fala de **ações e atores** (bom para o dono e o cliente entenderem o serviço); o diagrama de classes fala de **estruturas e relações** (bom para quem vai construir e para o "arquivo" — o banco de dados — que guarda tudo). Guarde: um olha de fora (quem usa, para quê), o outro olha de dentro (o que existe, como se conecta).

---

## 🧩 Conceitos fundamentais

### 1. Diagrama de casos de uso

Um **caso de uso** (aqui, o **diagrama**; o texto detalhado vimos no [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) mostra as **funcionalidades do sistema** do ponto de vista de quem as usa. Seus elementos:

- **Ator** (boneco-palito): quem interage com o sistema — um tipo de usuário (Cliente, Restaurante) ou outro sistema (Gateway de pagamento). O ator fica **fora** do sistema.
- **Caso de uso** (elipse/bolha): uma ação com valor que o sistema oferece ("Fazer pedido", "Acompanhar entrega").
- **Sistema** (retângulo que envolve os casos): a fronteira do que é o software.
- **Relações:** linhas ligando ator↔caso; e entre casos: **`<<include>>`** (um caso sempre usa outro — "Fazer pedido" *inclui* "Calcular frete") e **`<<extend>>`** (um caso opcional estende outro — "Aplicar cupom" *estende* "Finalizar pedido").

```
        ┌─────────────── SaborExpress ───────────────┐
        │   (  Buscar restaurante  )                  │
 Cliente│   (  Fazer pedido  ) ---<<include>>--> (Calcular frete)
   🧍───┼─→ (  Acompanhar entrega  )                  │
        │   (  Avaliar pedido  )                      │
        └─────────────────────────────────────────────┘
```

> **Termo explicado — diagrama de casos de uso:** representa os atores (quem usa) e os casos de uso (o que o sistema faz por eles), dando uma visão externa e funcional do sistema.

O valor: é um **mapa de escopo** compreensível pelo cliente. Bate o olho e vê tudo que o sistema faz e para quem.

### 2. Diagrama de classes: a caixa da classe

Uma **classe** no diagrama é uma caixa com **três compartimentos**:

```
┌───────────────────────┐
│       Pedido          │  ← nome da classe
├───────────────────────┤
│ - id: int             │  ← atributos (o que guarda)
│ - data: Date          │
│ - status: String      │
│ - total: Decimal      │
├───────────────────────┤
│ + calcularTotal()     │  ← métodos (o que faz)
│ + cancelar()          │
└───────────────────────┘
```

- **Atributos:** os dados que a classe guarda (id, data, status).
- **Métodos:** as ações que ela sabe fazer (calcularTotal, cancelar).
- **Visibilidade:** `+` público (acessível de fora), `-` privado (interno), `#` protegido — ligando ao **encapsulamento** do [[33-Paradigmas-e-orientacao-a-objetos]].

### 3. Os relacionamentos entre classes (o coração)

O que dá vida ao diagrama são as **ligações** entre classes:

- **Associação** (linha simples): uma classe **conhece/usa** outra. "Cliente faz Pedido." É a relação genérica.
- **Multiplicidade** (os números nas pontas): quantas instâncias se relacionam. `1`, `*` (muitos), `0..1` (zero ou um), `1..*` (um ou mais). "Um Cliente (`1`) faz muitos Pedidos (`*`)" — a famosa relação **um-para-muitos**.
- **Agregação** (losango vazio ◇): um "todo" contém "partes", mas as partes **sobrevivem sem o todo**. "Um Time agrega Jogadores" — se o time acaba, os jogadores continuam existindo.
- **Composição** (losango cheio ◆): um "todo" contém "partes" que **não existem sem o todo**. "Um Pedido é composto de Itens" — se o pedido some, os itens dele somem junto.
- **Herança/generalização** (seta com triângulo △): uma classe **é um tipo de** outra. "ClienteVIP é um Cliente." Liga à herança do [[33-Paradigmas-e-orientacao-a-objetos]].

```
 Cliente "1" ────faz───→ "*" Pedido ◆────contém───→ "1..*" Item
                                             │
                                        "*" │ referencia
                                             ↓
                                          "1" Produto
```

> **Termo explicado — multiplicidade:** os números que dizem quantas instâncias de uma classe se ligam à outra (1, muitos `*`, um-ou-mais `1..*`). É o que expressa "um cliente tem vários pedidos".

### 4. Agregação vs. composição (a confusão clássica)

A diferença — muito cobrada — está no **ciclo de vida**: na **composição** (◆), a parte morre com o todo (Item não existe sem Pedido); na **agregação** (◇), a parte sobrevive (um Produto existe mesmo sem estar em pedido nenhum). Na dúvida, pergunte: "se eu apagar o todo, apago as partes junto?". Sim → composição. Não → agregação.

### 5. Do diagrama ao código e ao banco

A ponte mágica: um diagrama de classes vira **quase diretamente**:
- **Classes de código:** cada caixa vira uma classe (`class Pedido { ... }`) com seus atributos e métodos.
- **Tabelas de banco:** cada classe vira uma **tabela**, cada atributo uma **coluna**, e os relacionamentos viram **chaves estrangeiras** ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]], [[69-Modelagem-de-dados-e-normalizacao]]). O "um-para-muitos" (Cliente→Pedidos) vira uma coluna `cliente_id` na tabela `pedidos`.

Por isso o diagrama de classes é o mais valioso: modelar as classes é, ao mesmo tempo, projetar o **código** e o **banco**.

---

## ⚙️ Como funciona na prática

O fluxo típico, do escopo à estrutura:

**1. Casos de uso para delimitar o escopo.** No começo, o time desenha os casos de uso com o cliente/PO: quem são os atores (Cliente, Restaurante, Entregador) e o que cada um faz. Isso **alinha o escopo** de forma visual — o cliente aponta "faltou o ator Administrador" e ajusta-se rápido. É a UML mais "de negócio".

**2. Identificar as classes (os substantivos).** Uma técnica clássica: pegue a descrição do sistema e **sublinhe os substantivos** — eles são candidatos a classes (Cliente, Pedido, Produto, Restaurante). Os **verbos** viram métodos ou associações (o cliente *faz* um pedido). É um ponto de partida, não uma regra rígida.

**3. Desenhar o diagrama de classes.** Coloque as classes, seus atributos principais, e — o mais importante — os **relacionamentos com multiplicidade**. É aqui que decisões cruciais aparecem: o preço fica no Produto ou no Item? (lembra do [[54-Por-que-modelar-antes-de-programar-UML]]). É Pedido→Item uma composição (◆) — sim, o item morre com o pedido.

**4. Validar contra os casos de uso.** As classes suportam todos os casos de uso? Se há o caso "avaliar pedido" mas nenhuma classe `Avaliação`, falta algo. Os dois diagramas se **verificam** mutuamente.

**5. Traduzir para código e banco.** As classes viram entidades no código e tabelas no banco. Ferramentas de **ORM** ([[71-Confiabilidade-e-escala-do-banco]]) fazem essa ponte quase automática — você define a classe, o ORM cria a tabela.

**A dose certa (de novo).** Você não desenha o diagrama de classes de **todo** o sistema em detalhe. Desenha o **núcleo** (as entidades principais e suas relações) — que é onde os erros são caros — e deixa o resto emergir no código. Um diagrama de classes com as 6-8 entidades centrais da SaborExpress cabe num quadro e resolve 90% das dúvidas estruturais.

---

## 🍔 Aplicação na SaborExpress

O time da SaborExpress usou os dois diagramas em sequência.

**Casos de uso (alinhando com a Ana).** Primeiro, um diagrama simples mostrou os atores e ações:
- **Cliente:** buscar restaurante, fazer pedido, acompanhar entrega, avaliar.
- **Restaurante:** gerenciar cardápio, receber pedido, atualizar status.
- **Entregador:** ver entregas, atualizar localização.
- **Gateway de pagamento** (ator externo): processar pagamento (incluído em "fazer pedido").

A Ana, olhando o desenho, percebeu na hora: "faltou o **Administrador** que aprova novos restaurantes!". Um ator esquecido, encontrado em 30 segundos por causa do desenho.

**Diagrama de classes (projetando o núcleo).** Depois, o time modelou as classes centrais:
```
Cliente "1" ──faz──→ "*" Pedido
Pedido ◆──contém──→ "1..*" ItemPedido
ItemPedido "*" ──refere──→ "1" Produto
Restaurante "1" ──oferece──→ "*" Produto
Restaurante "1" ──recebe──→ "*" Pedido
ClienteVIP ──△(herda)──→ Cliente
```

Decisões importantes tomadas **no desenho**:
- `Pedido ◆ ItemPedido` é **composição**: um item de pedido não existe fora do pedido (apagou o pedido, apagou os itens). Já `Produto` é **associado** ao item, não composto — o produto continua no cardápio mesmo depois que o pedido acaba.
- O `ItemPedido` ganhou um atributo próprio `precoNoMomento` — a solução para o problema do preço que muda, vista no capítulo anterior, agora **explícita no modelo**.
- `ClienteVIP` **herda** de `Cliente` (mesmos dados, mais benefícios) — mas o time debateu e decidiu que herança era exagero; um atributo `tipo` bastava. Debate que só aconteceu **porque** o desenho tornou a decisão visível.

**A tradução.** Esse diagrama virou, quase 1-para-1: as classes `Cliente`, `Pedido`, `ItemPedido`, `Produto`, `Restaurante` no código, e as tabelas `clientes`, `pedidos`, `itens_pedido`, `produtos`, `restaurantes` no banco — com `pedidos.cliente_id` e `itens_pedido.pedido_id` como as chaves estrangeiras que realizam os "um-para-muitos". Modelar as classes **foi** projetar o banco.

---

## 🏢 Como isso acontece em uma empresa

- **Diagrama de classes = modelo de domínio.** Times chamam o diagrama de classes central de "modelo de domínio" ou "modelo de dados", e ele é uma das poucas peças de UML realmente mantidas, porque espelha o banco e o código.
- **Casos de uso para escopo e comunicação.** Aparecem no início de projetos e propostas comerciais, para mostrar ao cliente "isto é o que o sistema fará". Em contextos ágeis, muitas vezes as histórias de usuário substituem os casos de uso escritos, mas o **diagrama** ainda ajuda a ver o todo.
- **ORMs materializam a ponte.** Frameworks como **Prisma, Hibernate, Entity Framework, Django ORM** transformam classes/entidades em tabelas automaticamente — o diagrama de classes vira código que vira banco. Entender as relações (1-para-muitos, muitos-para-muitos) é essencial para usá-los.
- **Muitos-para-muitos vira tabela de junção.** Uma relação `*—*` (ex.: Produto e Categoria, onde um produto tem várias categorias e uma categoria tem vários produtos) exige, no banco, uma **tabela intermediária**. Reconhecer isso no diagrama evita erro de modelagem.
- **Ferramentas:** draw.io, Lucidchart, Miro, PlantUML e Mermaid (para versionar como texto). Muitas geram o diagrama a partir do código existente.
- **Erros de modelagem aqui são caros.** Um relacionamento errado no núcleo se propaga para o banco e o código inteiro. Por isso vale o cuidado de desenhar e discutir as entidades centrais antes.

---

## ⚠️ Erros comuns

- **Confundir agregação e composição.** O teste é o ciclo de vida: a parte morre com o todo? Sim → composição (◆); não → agregação (◇). Item morre com Pedido (composição); Produto não (associação).
- **Esquecer a multiplicidade.** Um diagrama de classes sem os números nas pontas perde sua informação mais útil. "Cliente—Pedido" sem o `1` e o `*` não diz se é um pedido por cliente ou vários.
- **Modelar atributos como classes (ou vice-versa).** "Cor" geralmente é um atributo de Produto, não uma classe própria. Nem todo substantivo vira classe — julgue se tem identidade e comportamento próprios.
- **Abusar de herança.** Herança parece elegante, mas amarra. Muitas vezes um atributo `tipo` (composição/estratégia) é melhor que criar subclasses. "Prefira composição a herança" é um princípio clássico.
- **Detalhar métodos demais cedo.** No modelo de análise, foque em classes, atributos e relações. Listar todos os métodos com parâmetros é detalhe de implementação que muda — deixe emergir no código.
- **Fazer o diagrama de classes de tudo.** Modele o **núcleo** (entidades centrais). Diagramar cada classe utilitária é burocracia que ninguém lê.
- **Ignorar o muitos-para-muitos.** Uma relação `*—*` precisa de uma tabela de junção no banco; esquecer isso gera modelagem errada.

---

## 💡 Dicas profissionais

- **Comece pelos substantivos.** Ler a descrição do sistema e sublinhar os substantivos é um ótimo ponto de partida para achar as classes. Depois refine (nem todo substantivo vira classe).
- **Sempre marque a multiplicidade.** É a informação mais valiosa e a que mais evita bugs. "Um ou muitos?" é a pergunta que define chaves estrangeiras e a estrutura do banco.
- **Use o teste do ciclo de vida para composição.** "Se eu apagar o todo, apago as partes?" resolve na hora a dúvida agregação vs. composição.
- **Valide os dois diagramas um contra o outro.** Todo caso de uso precisa de classes que o suportem; toda classe deve servir a algum caso de uso. Inconsistências aparecem nesse cruzamento.
- **Pense no diagrama de classes como o banco de dados nascendo.** Ao modelar, já imagine as tabelas e as chaves estrangeiras. Isso liga a modelagem ao módulo de banco e evita retrabalho.
- **Prefira composição a herança na dúvida.** Se você não tem certeza de que "X **é um** Y" (herança) em vez de "X **tem um** Y" (composição), provavelmente é composição — mais flexível e menos acoplada.

---

## 🎈 Curiosidades

- Os **casos de uso** foram criados por **Ivar Jacobson** nos anos 1980 (antes da UML existir), e foram uma das três notações que se uniram para formar a UML. O boneco-palito virou um dos símbolos mais reconhecíveis da engenharia de software.
- A frase **"prefira composição a herança"** (do livro *Design Patterns*, a "Gangue dos Quatro") é uma das lições mais repetidas em OO — muita gente descobre, com o tempo, que herança usada demais deixa o código rígido.
- A técnica de **"sublinhar os substantivos"** para achar classes e **os verbos** para achar métodos foi popularizada por Grady Booch e Abbott nos anos 1980. É simplista, mas continua sendo um bom ponto de partida didático.
- O relacionamento **muitos-para-muitos** não existe "puro" em bancos relacionais — ele sempre é quebrado numa **tabela de junção** (associativa). É um dos primeiros "aha!" de quem aprende modelagem de dados.
- Existe um debate eterno sobre a diferença **prática** entre agregação e composição — tanta gente confunde que alguns arquitetos famosos recomendam simplesmente **não usar agregação** e ficar só com associação e composição, para evitar discussões improdutivas.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Diagrama de casos de uso** | Atores (quem usa) ligados a casos de uso (o que fazem); visão externa. |
| **Ator** | Quem interage com o sistema (usuário ou outro sistema); fica fora dele. |
| **Diagrama de classes** | As classes do sistema, seus atributos, métodos e relações; visão interna. |
| **Atributo / método** | O que a classe guarda / o que ela faz. |
| **Associação** | Uma classe conhece/usa outra (linha simples). |
| **Multiplicidade** | Quantas instâncias se relacionam (1, `*` muitos, `1..*` um ou mais). |
| **Agregação (◇)** | Todo-parte em que a parte sobrevive sem o todo. |
| **Composição (◆)** | Todo-parte em que a parte morre com o todo. |
| **Herança (△)** | Uma classe é um tipo de outra (ClienteVIP é um Cliente). |
| **Tabela de junção** | Tabela intermediária que realiza um relacionamento muitos-para-muitos. |
| **ORM** | Ferramenta que transforma classes em tabelas de banco automaticamente. |

---

## 📝 Resumo

- O **diagrama de casos de uso** mostra **quem usa o sistema e para quê** (atores e ações) — uma visão externa, ótima para alinhar escopo com o cliente.
- O **diagrama de classes** mostra as **peças internas** (classes com atributos e métodos) e, sobretudo, **como se relacionam** — a visão mais próxima do código e do banco.
- Os relacionamentos são o coração: **associação**, **multiplicidade** (1, `*`, `1..*`), **agregação** (◇, parte sobrevive), **composição** (◆, parte morre com o todo) e **herança** (△). O teste do ciclo de vida separa agregação de composição.
- Um diagrama de classes vira **quase diretamente** classes de código e **tabelas de banco** (com chaves estrangeiras realizando os "um-para-muitos"); relações muitos-para-muitos viram **tabelas de junção**.
- São os dois diagramas mais úteis da UML. Modele o **núcleo** (entidades centrais) na dose certa, valide um diagrama contra o outro, e prefira composição a herança na dúvida.

---

## ☑️ Checklist de aprendizado

- [ ] Leio e desenho um diagrama de casos de uso com atores e relações.
- [ ] Leio e desenho uma classe (atributos, métodos, visibilidade).
- [ ] Distingo associação, agregação, composição e herança.
- [ ] Uso multiplicidade corretamente (1, muitos, um-ou-mais).
- [ ] Aplico o teste do ciclo de vida para agregação vs. composição.
- [ ] Explico como um diagrama de classes vira código e tabelas de banco.

---

## ✏️ Exercícios

**1.** Desenhe (ou descreva em texto) um **diagrama de casos de uso** para uma biblioteca, com os atores Leitor e Bibliotecário e ao menos três casos de uso.

**2.** Para as classes `Playlist` e `Música`, decida se a relação é **agregação** ou **composição** e justifique com o teste do ciclo de vida. (Dica: uma música existe fora de uma playlist?)

**3.** Escreva a **multiplicidade** correta para cada relação: (a) um Autor escreve _ Livros; um Livro tem _ Autores; (b) um Pedido tem _ Itens; um Item pertence a _ Pedido.

**4.** Um diagrama tem `Curso` e `Aluno` com uma relação **muitos-para-muitos** (um aluno faz vários cursos; um curso tem vários alunos). O que isso exige na hora de virar banco de dados, e por quê?

**5. (Reflexão)** Na SaborExpress, explique por que `Pedido ◆ ItemPedido` é uma **composição** mas `ItemPedido — Produto` é apenas uma **associação**. O que aconteceria no banco se você modelasse errado e o preço ficasse só no `Produto`?

---

## 💬 Respostas comentadas

**1.** Exemplo: **Atores:** Leitor, Bibliotecário. **Casos de uso:** o Leitor pode "Buscar livro", "Emprestar livro", "Devolver livro", "Reservar livro"; o Bibliotecário pode "Cadastrar livro", "Registrar empréstimo", "Aplicar multa". "Emprestar livro" pode `<<include>>` "Verificar disponibilidade". Os atores (bonecos) ligam-se por linhas às bolhas (casos), tudo dentro do retângulo "Sistema da Biblioteca".

**2.** É **composição** se você considerar que a entrada da música *naquela* playlist (a associação música-na-playlist) morre com a playlist — mas a **Música em si** existe independentemente (está no catálogo, em outras playlists). Então, o mais correto: a relação Playlist→Música é uma **associação/agregação**, porque a **Música sobrevive** sem a playlist (apagar a playlist não apaga a música do catálogo). Pelo teste do ciclo de vida: apagar a playlist **não** deve apagar as músicas → **não é composição**. (Composição seria, por exemplo, Playlist→ItemDaPlaylist, se o "item" fosse só a posição da música naquela lista.)

**3.** (a) um Autor escreve **`*`** (muitos) Livros; um Livro tem **`1..*`** (um ou mais) Autores → relação **muitos-para-muitos**. (b) um Pedido tem **`1..*`** Itens; um Item pertence a **`1`** Pedido → relação **um-para-muitos** (e composição).

**4.** Exige uma **tabela de junção** (associativa), por exemplo `matriculas`, com `aluno_id` e `curso_id`. Porque bancos relacionais **não** conseguem representar muitos-para-muitos diretamente numa das duas tabelas (você não pode pôr "vários curso_id" numa linha de aluno de forma limpa). A tabela intermediária transforma o `*—*` em **dois relacionamentos um-para-muitos** (um aluno tem várias matrículas; um curso tem várias matrículas), o que o modelo relacional representa bem — e ainda permite guardar dados da relação (ex.: data da matrícula, nota).

**5.** `Pedido ◆ ItemPedido` é **composição** porque um item de pedido **não existe** fora do pedido: ele foi criado para aquele pedido específico e deve ser apagado junto se o pedido for apagado (seu ciclo de vida depende do todo). Já `ItemPedido — Produto` é só **associação** porque o **Produto** existe **independentemente** — ele está no cardápio do restaurante e continua lá depois que o pedido termina; o item apenas *referencia* qual produto foi pedido. Se você modelasse errado e deixasse o **preço só no `Produto`**, o banco não guardaria quanto o cliente **realmente pagou**: quando o restaurante alterasse o preço do produto, todos os pedidos antigos que apenas apontam para ele passariam a "exibir" o **preço novo**, gerando históricos e relatórios financeiros errados. Por isso o preço é **copiado** para o `ItemPedido` (`precoNoMomento`) — um dado próprio do item, congelado no instante da compra.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[54-Por-que-modelar-antes-de-programar-UML]] — a visão geral da UML.
- **Próximo (linear):** [[56-Sequencia-atividades-e-BPMN]] — os diagramas de comportamento (fluxo no tempo e processos).
- **Base:** [[33-Paradigmas-e-orientacao-a-objetos]] (Vol. 2) — classes, objetos, herança, encapsulamento.
- **Consequência direta:** [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] e [[69-Modelagem-de-dados-e-normalizacao]] — o diagrama de classes vira tabelas; e [[71-Confiabilidade-e-escala-do-banco]] (ORM).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 15 → **Capítulo 55 de 119**.
