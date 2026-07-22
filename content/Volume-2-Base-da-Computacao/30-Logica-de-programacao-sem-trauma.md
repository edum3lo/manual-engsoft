# Capítulo 30 — Lógica de programação sem trauma

> **Volume 2 — A Base da Computação** · Módulo 8 — Lógica e Programação
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **lógica de programação** e por que ela é independente de qualquer linguagem.
- Dominar os **quatro pilares**: **variáveis**, **condições**, **repetições** e **funções**.
- Ler e escrever um **algoritmo** em passos (pseudocódigo), como uma receita de cozinha.
- Reconhecer **tipos de dados** básicos (número, texto, booleano) e **operadores**.
- Entender **entrada → processamento → saída** como o esqueleto de todo programa.
- Perder o medo de programar: ver que é raciocínio organizado, não dom mágico.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 30 minutos praticando com exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).** É a porta de entrada da programação.

---

## ✅ Pré-requisitos

- [[20-Como-um-computador-inicia-e-roda-um-programa]] (o que é executar código) ajuda a contextualizar. Fora isso, começamos do zero absoluto.
- Referência de fundo: [[07-O-que-e-software]] (software = instruções + dados).

---

## 📖 Introdução

Muita gente chega aqui com um trauma: "programação é difícil", "não tenho cabeça para isso". Vamos desmontar isso agora. **Lógica de programação é só organizar passos para resolver um problema** — algo que você já faz o dia inteiro sem perceber: seguir uma receita, montar um móvel, explicar a alguém como chegar num lugar. Programar é isso, só que escrevendo os passos de um jeito que o computador (aquela máquina "burra e rápida" do [[19-Bits-processador-e-memoria]]) consiga executar.

A boa notícia é que a **lógica é uma só**, independente da linguagem. Python, JavaScript, Java, C — todas têm variáveis, condições, repetições e funções. Aprender a **lógica** é aprender o que não muda; depois, cada linguagem é só um "sotaque" diferente para dizer as mesmas coisas. Por isso este capítulo foca no raciocínio, não numa linguagem específica.

Este é o começo da sua vida como quem **escreve** software, não só quem entende sobre ele. Vá com calma, faça os exercícios, e o "trauma" vira "gosto".

---

## 🧠 Analogia

Programar é **escrever uma receita de cozinha para alguém extremamente obediente, rápido e literal — mas sem nenhum bom senso.**

Imagine um ajudante que faz **exatamente** o que você escreve, na ordem que escreve, sem interpretar nada. Se a receita diz "bata os ovos" mas esquece "quebre os ovos primeiro", ele bate os ovos com casca. Ele não "entende o que você quis dizer" — ele executa ao pé da letra, em altíssima velocidade.

Esse ajudante é o computador. E os elementos da receita têm nomes na programação:

- Os **ingredientes** que você separa e nomeia ("2 xícaras de farinha") são as **variáveis**.
- As decisões ("**se** a massa estiver seca, adicione água") são as **condições**.
- As repetições ("mexa **até** engrossar", "**para cada** ovo, faça...") são os **laços/repetições**.
- Os sub-procedimentos ("prepare o molho" — uma receita dentro da receita) são as **funções**.

Guarde: **programar é escrever receitas precisas para um executor rápido e literal.** Todo o resto do capítulo detalha os quatro elementos dessa receita.

---

## 🧩 Conceitos fundamentais

### 1. Algoritmo: a receita antes do código

Um **algoritmo** é a sequência de passos que resolve um problema — independente de linguagem. Antes de escrever código "de verdade", pensamos o algoritmo em linguagem quase natural, o **pseudocódigo**. Exemplo, "somar dois números":

```
1. peça o primeiro número e guarde em A
2. peça o segundo número e guarde em B
3. some A + B e guarde em RESULTADO
4. mostre RESULTADO
```

> **Termo explicado — algoritmo:** uma sequência finita e ordenada de passos que resolve um problema. Toda programação começa (mentalmente) por um algoritmo.

Pensar o algoritmo **antes** de codar é o hábito mais valioso que você pode formar. "Programar" a esmo, sem plano, é a causa número um da frustração de quem começa.

### 2. Entrada → Processamento → Saída

Quase todo programa tem esse esqueleto:

- **Entrada:** os dados que entram (o usuário digita, vem de um arquivo, de uma requisição).
- **Processamento:** o que o programa faz com os dados (calcula, decide, transforma).
- **Saída:** o resultado (mostra na tela, salva, responde).

Reconhecer esse trio em qualquer problema já te dá metade da solução: "o que entra? o que preciso fazer? o que deve sair?".

### 3. Pilar 1 — Variáveis (guardar dados com um nome)

Uma **variável** é uma "caixa com etiqueta" onde você guarda um valor para usar depois. Você dá um **nome** e um **valor**:

```
nome_cliente = "Ana"
idade = 30
total_pedido = 47.90
```

O valor pode **variar** ao longo do programa (daí "variável"): `total_pedido = total_pedido + 5` (somou a taxa de entrega). As variáveis moram na **memória RAM** ([[19-Bits-processador-e-memoria]]) enquanto o programa roda.

**Tipos de dados** básicos que uma variável pode guardar:

- **Número** (inteiro como `30`, ou decimal como `47.90`).
- **Texto** (chamado *string*): `"Ana"`, `"pizza"`.
- **Booleano** (verdadeiro/falso): `pedido_pago = true`.

> **Termo explicado — variável:** um espaço nomeado na memória que guarda um valor, podendo ser lido e alterado durante o programa.

### 4. Pilar 2 — Condições (tomar decisões)

Condições fazem o programa **escolher caminhos** conforme uma situação. É o `se... então... senão`:

```
se total_pedido >= 50 então
    frete = 0            // frete grátis acima de 50
senão
    frete = 8
```

As decisões usam **operadores de comparação** (`>`, `<`, `>=`, `==` igual, `!=` diferente) e **operadores lógicos** (`e`, `ou`, `não`) para combinar condições:

```
se cliente_novo == true  e  total_pedido >= 30 então
    aplicar_cupom_boas_vindas
```

> **Termo explicado — condição (estrutura condicional):** trecho que executa um caminho ou outro dependendo de um teste ser verdadeiro ou falso (`if/else`).

### 5. Pilar 3 — Repetições (fazer várias vezes)

Repetições (**laços/loops**) executam um bloco várias vezes, sem você reescrevê-lo. Dois tipos:

- **`enquanto` (while):** repete **enquanto** uma condição for verdadeira.
```
enquanto houver pratos no carrinho faça
    somar preço do prato ao total
```
- **`para cada` (for):** repete **para cada** item de uma coleção.
```
para cada prato no pedido faça
    imprimir nome e preço do prato
```

Repetições são o que dá **escala**: somar o total de 3 itens ou de 300 é o mesmo código. Cuidado com o **loop infinito** — se a condição nunca fica falsa, o programa trava repetindo para sempre.

> **Termo explicado — laço (loop/repetição):** estrutura que executa um bloco de código repetidamente, enquanto (ou para cada) uma condição/coleção.

### 6. Pilar 4 — Funções (empacotar e reutilizar)

Uma **função** é um bloco de código com **nome** que faz uma tarefa e pode ser **reutilizado**. Você a define uma vez e a "chama" quantas vezes quiser:

```
função calcular_frete(total):
    se total >= 50 então
        retornar 0
    senão
        retornar 8

// usando:
frete = calcular_frete(47.90)   // retorna 8
```

Funções recebem **parâmetros** (as entradas, aqui `total`) e podem **retornar** um resultado. Elas são a base da organização do código: em vez de um bloco gigante, você quebra o problema em funções pequenas, cada uma com um nome claro — o que liga direto ao **código limpo** ([[34-Codigo-limpo]]).

> **Termo explicado — função:** bloco de código nomeado, que recebe parâmetros, executa uma tarefa e pode retornar um resultado. Permite reutilizar e organizar.

---

## ⚙️ Como funciona na prática

Vamos juntar os quatro pilares num programinha completo: **calcular o total de um pedido da SaborExpress, com frete e cupom**. Em pseudocódigo:

```
função calcular_frete(total):
    se total >= 50 então retornar 0
    senão retornar 8

// ENTRADA: um pedido com uma lista de itens
pedido = [ {nome: "pizza", preço: 40}, {nome: "refri", preço: 8} ]
cliente_novo = true

// PROCESSAMENTO:
total = 0
para cada item no pedido faça          // REPETIÇÃO
    total = total + item.preço         // VARIÁVEL sendo atualizada

se cliente_novo == true então          // CONDIÇÃO
    total = total - 5                  // desconto de boas-vindas

frete = calcular_frete(total)          // FUNÇÃO

total_final = total + frete

// SAÍDA:
imprimir "Total do pedido: R$ " + total_final
```

Rastreando: os itens somam 48; como é cliente novo, cai para 43; como 43 < 50, o frete é 8; total final **51**. Repare como **os quatro pilares aparecem juntos** e como o esqueleto **entrada → processamento → saída** organiza tudo. Nenhuma mágica — apenas passos ordenados que um executor literal segue. Esse é, em miniatura, o mesmo raciocínio por trás de qualquer sistema, por maior que seja: variáveis guardam o estado, condições decidem, repetições escalam, funções organizam.

E note: este pseudocódigo é quase idêntico ao que você escreveria em Python ou JavaScript de verdade — porque a **lógica** é a mesma. Trocar para uma linguagem real é aprender o "sotaque" (a pontuação, as palavras exatas), não reaprender a pensar.

---

## 🍔 Aplicação na SaborExpress

**Toda regra de negócio da SaborExpress é lógica de programação.** O cálculo que fizemos acima — somar itens, aplicar cupom, decidir o frete — é exatamente o tipo de código que roda no servidor a cada pedido. Multiplique isso por todas as regras: "só aceitar pedido se o restaurante estiver aberto" (condição), "notificar o entregador para cada pedido pronto" (repetição), "calcular o tempo estimado de entrega" (função). O "cérebro" da SaborExpress é uma teia de variáveis, condições, repetições e funções.

**Por que a lógica bem pensada importa para a Ana.** Uma condição escrita errado — `>` em vez de `>=` no frete grátis — faz a empresa **perder ou cobrar dinheiro indevido** em milhares de pedidos. Um loop mal feito pode travar o servidor ([[22-Processos-threads-e-memoria-RAM]], loop infinito). Uma função de cálculo de total com um bug pode gerar cobranças erradas e destruir a confiança do cliente. A lógica não é "detalhe técnico": é **onde o dinheiro e as regras do negócio viram código**. Um pequeno erro de lógica é um grande problema de negócio.

**Da regra ao código.** Quando a Ana diz "quero frete grátis acima de R$ 50 para clientes novos", alguém traduz essa frase em português para a lógica precisa que vimos. Essa tradução — de **requisito** (o que a Ana quer) para **algoritmo** (os passos exatos) — é a essência do trabalho de desenvolvimento, e você a verá formalizada no Volume 3 (Requisitos). A lógica é a ferramenta que faz essa ponte.

---

## 🏢 Como isso acontece em uma empresa

- **Entrevistas técnicas testam lógica.** Testes de "live coding" e desafios (no Volume 5) avaliam justamente sua capacidade de quebrar um problema em passos e traduzi-los em código. É a habilidade base que todos os empregadores checam.
- **A linguagem é escolha do time; a lógica é sua.** Empresas usam linguagens diferentes, mas todas esperam que você **raciocine** bem. Quem domina a lógica aprende qualquer linguagem nova rapidamente.
- **Bugs de lógica são os mais comuns.** A maioria dos bugs não é "o computador falhou" — é uma condição errada, um loop com limite equivocado, uma variável não atualizada. Pensar com clareza previne a maior fonte de defeitos.
- **Pensar antes de codar é valorizado.** Devs experientes rascunham o algoritmo (no papel, num comentário, numa conversa) antes de escrever. "Sair digitando" é marca de quem está começando; planejar é marca de maturidade.

---

## ⚠️ Erros comuns

- **Querer "sair codando" sem pensar o algoritmo.** É a causa número um de frustração. Rascunhe os passos primeiro, mesmo que em português.
- **Confundir `=` (atribuir) com `==` (comparar).** `x = 5` guarda 5 em x; `x == 5` pergunta se x é 5. Trocar os dois é um clássico erro de iniciante (e de veterano cansado).
- **Erros de "fronteira" (off-by-one).** `>` vs `>=`, começar do 0 ou do 1, o último item incluído ou não. Pequenas trocas com grandes consequências. Teste os limites.
- **Loop infinito.** Esquecer de fazer a condição do `while` eventualmente virar falsa trava o programa. Sempre garanta que o laço tem "saída".
- **Nomes de variáveis sem sentido.** `x`, `a`, `temp` para tudo deixa o código ininteligível. Nomeie pelo significado (`total_pedido`, `frete`). Isso já é código limpo ([[34-Codigo-limpo]]).
- **Achar que "não tem cabeça para isso".** Lógica é habilidade treinável, não dom. Todo mundo trava no começo; a diferença é praticar.

---

## 💡 Dicas profissionais

- **Pense no papel antes do teclado.** Rascunhar o algoritmo em passos (ou desenhar) resolve metade do problema antes de você tocar no código. Este é o hábito que mais acelera iniciantes.
- **Use o esqueleto entrada → processamento → saída.** Diante de qualquer problema, pergunte "o que entra, o que faço, o que sai?". Ele organiza o raciocínio automaticamente.
- **Nomeie bem desde o primeiro dia.** Variáveis e funções com nomes claros são metade da legibilidade. Um bom nome é um comentário que nunca fica desatualizado.
- **Quebre problemas grandes em funções pequenas.** Se um trecho está ficando enorme, provavelmente há uma função esperando para nascer. Pequeno e nomeado vence grande e confuso.
- **Pratique, pratique, pratique.** Lógica entra "no dedo" resolvendo problemas, não lendo sobre eles. Faça os exercícios e invente os seus (lembre do [[05-Como-tirar-o-maximo-dos-exercicios]] e do [[06-Como-criar-projetos-enquanto-le]]).

---

## 🎈 Curiosidades

- A palavra **"algoritmo"** vem do nome do matemático persa **Al-Khwarizmi** (século IX), cujos métodos de cálculo, traduzidos para o latim, viraram a base da aritmética moderna. Você usa o nome dele toda vez que fala em algoritmo.
- **Ada Lovelace** (que você viu no [[07-O-que-e-software]]) escreveu, no século XIX, o que é considerado o **primeiro algoritmo** feito para ser executado por uma máquina — décadas antes de existir um computador que o rodasse.
- O termo **"bug"** e "debugar" (que também vimos no [[07-O-que-e-software]]) descreve a maior parte do seu tempo programando: você passará mais horas **procurando por que a lógica não fez o esperado** do que escrevendo lógica nova. É normal, e faz parte.
- **Pseudocódigo** não tem uma sintaxe oficial — cada pessoa escreve do seu jeito. Isso é de propósito: o objetivo é pensar com clareza, não agradar um compilador. É a "prancheta" livre antes da construção.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Lógica de programação** | A habilidade de organizar passos para resolver problemas com código. |
| **Algoritmo** | Uma sequência ordenada de passos que resolve um problema. |
| **Pseudocódigo** | Algoritmo escrito em linguagem quase natural, antes do código real. |
| **Variável** | Espaço nomeado na memória que guarda um valor. |
| **Tipo de dado** | A natureza do valor: número, texto (string), booleano (verdadeiro/falso). |
| **Condição (if/else)** | Estrutura que decide entre caminhos conforme um teste. |
| **Operadores** | Símbolos de comparação (`>`, `==`) e lógicos (`e`, `ou`, `não`). |
| **Laço (loop)** | Estrutura que repete um bloco (`while`, `for`). |
| **Loop infinito** | Laço cuja condição nunca fica falsa; trava o programa. |
| **Função** | Bloco nomeado e reutilizável que recebe parâmetros e retorna um resultado. |
| **Parâmetro / Retorno** | A entrada de uma função / o valor que ela devolve. |
| **Entrada/Processamento/Saída** | O esqueleto de quase todo programa. |

---

## 📝 Resumo

- **Lógica de programação** é organizar passos para resolver problemas — como uma **receita** para um executor rápido e literal. É independente de linguagem.
- Tudo começa por um **algoritmo** (pensado em **pseudocódigo**), e quase todo programa segue **entrada → processamento → saída**.
- Os **quatro pilares**: **variáveis** (guardar dados nomeados), **condições** (decidir caminhos com `if/else` e operadores), **repetições** (`while`/`for`, cuidado com loop infinito) e **funções** (empacotar e reutilizar tarefas).
- A **lógica é a mesma** em Python, JavaScript, Java etc.; a linguagem é só o "sotaque". Aprender a pensar transfere para qualquer linguagem.
- Na prática, **toda regra de negócio** (frete, cupom, estoque) é lógica — e um pequeno erro de lógica vira um grande problema de negócio.
- Programar é habilidade **treinável**, não dom: pense no papel, nomeie bem, quebre em funções e **pratique**.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo que lógica é raciocínio organizado, independente de linguagem.
- [ ] Sei escrever um algoritmo simples em pseudocódigo.
- [ ] Reconheço entrada → processamento → saída em um problema.
- [ ] Uso variáveis e conheço os tipos básicos (número, texto, booleano).
- [ ] Escrevo condições com operadores de comparação e lógicos.
- [ ] Uso repetições (while/for) e entendo o risco do loop infinito.
- [ ] Sei o que é uma função, com parâmetros e retorno, e por que reutilizar.

---

## ✏️ Exercícios

**1.** Escreva, em pseudocódigo, um algoritmo que peça a idade de uma pessoa e diga se ela é "maior de idade" (>= 18) ou "menor de idade".

**2.** Explique a diferença entre `=` e `==` com um exemplo de cada.

**3.** Escreva um pseudocódigo com uma **repetição** que some os preços de uma lista de itens de um pedido e mostre o total.

**4.** Crie uma **função** `tem_frete_gratis(total)` que retorne verdadeiro se o total for maior ou igual a 50, e falso caso contrário. Depois "chame-a" com o valor 62.

**5. (Reflexão)** Um bug fez a SaborExpress dar frete grátis a partir de R$ 49 em vez de R$ 50. Qual pilar da lógica provavelmente contém o erro, e como um deslize minúsculo vira um problema de negócio em escala?

---

## 💬 Respostas comentadas

**1.**
```
peça a idade e guarde em IDADE
se IDADE >= 18 então
    mostrar "maior de idade"
senão
    mostrar "menor de idade"
```
O essencial: entrada (idade), uma condição com `>=`, e duas saídas.

**2.** `=` **atribui**: `x = 5` guarda o valor 5 na variável x. `==` **compara**: `x == 5` é uma pergunta que resulta em verdadeiro ou falso ("x é igual a 5?"). Usa-se `=` para guardar valores e `==` dentro de condições.

**3.**
```
total = 0
para cada item na lista_de_itens faça
    total = total + item.preço
mostrar "Total: " + total
```
A variável `total` começa em 0 e é atualizada a cada volta do laço — o padrão "acumulador".

**4.**
```
função tem_frete_gratis(total):
    se total >= 50 então
        retornar verdadeiro
    senão
        retornar falso

resultado = tem_frete_gratis(62)   // retorna verdadeiro
```

**5.** O erro está numa **condição** — provavelmente um operador trocado (`>= 49` em vez de `>= 50`, ou um `>` onde deveria ser `>=`, dependendo de como foi escrito). É um deslize de um único caractere/número, mas como essa condição roda em **todos os pedidos**, a empresa passa a bancar frete que deveria cobrar em milhares de casos — prejuízo acumulado e silencioso. Ilustra por que precisão na lógica é diretamente ligada ao dinheiro do negócio, e por que testar os "limites" (exatamente 49, 50, 51) é essencial.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[31-Estruturas-de-dados-essenciais]] — como organizar os *dados* que suas variáveis guardam (listas, dicionários...).
- **Aplica esta base:** [[32-Algoritmos-e-complexidade-Big-O]] — quão rápido seu algoritmo roda.
- **Escreve melhor:** [[34-Codigo-limpo]] — nomear bem e organizar em funções vira disciplina.
- **Aplicação futura:** Volume 3 (Requisitos → traduzir o que a Ana quer em lógica; Back-end → onde essa lógica roda).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 8 → **Capítulo 30 de 119**.
