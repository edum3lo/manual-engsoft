# Capítulo 34 — Código limpo (Clean Code)

> **Volume 2 — A Base da Computação** · Módulo 9 — Qualidade de código e princípios de design
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender por que **código é lido muito mais vezes do que é escrito** — e o que isso muda.
- Aplicar as práticas centrais de **código limpo**: nomes claros, funções pequenas, uma responsabilidade por coisa.
- Escrever **comentários úteis** (e reconhecer os inúteis) e código que "se explica sozinho".
- Reconhecer e evitar **code smells** (maus cheiros): funções gigantes, nomes ruins, código duplicado, aninhamento profundo.
- Entender o conceito de **dívida técnica** e por que código sujo custa caro com o tempo.
- Ver o código limpo como um ato de **respeito e comunicação** com o time (e com o seu eu futuro).

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 20 minutos de exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (2/5).** Conceitualmente acessível, mas de domínio para a vida toda.

---

## ✅ Pré-requisitos

- [[30-Logica-de-programacao-sem-trauma]] (funções, variáveis) e [[33-Paradigmas-e-orientacao-a-objetos]] (organização em classes/funções).

---

## 📖 Introdução

Existe uma diferença enorme entre um código que **funciona** e um código que é **bom**. Os dois entregam o mesmo resultado hoje; mas daqui a seis meses, quando alguém (talvez você mesmo) precisar mudar aquilo, o código limpo será uma conversa clara e o código sujo será um pesadelo indecifrável.

Aqui está a virada de chave deste capítulo: **você escreve um trecho de código uma vez, mas ele será lido dezenas de vezes** — por colegas, por revisores, por você no futuro, por quem for consertar um bug às 3h da manhã ([[18-Bastidores-uma-semana-real]]). Se o código é lido muito mais do que escrito, então **escrever para o leitor** é a prioridade. Código limpo não é preciosismo estético: é a diferença entre um sistema que evolui rápido e um que apodrece ([[07-O-que-e-software]] — a "degradação do software").

Este capítulo é sobre um hábito que separa juniores de profissionais respeitados. A boa notícia: as regras são poucas e simples. A parte difícil é a **disciplina** de aplicá-las sempre, inclusive quando o prazo aperta.

---

## 🧠 Analogia

Pense na diferença entre uma **cozinha organizada** e uma **cozinha bagunçada**, ambas capazes de produzir o mesmo prato.

Na **cozinha organizada**, cada utensílio tem um lugar rotulado, os ingredientes estão etiquetados, a bancada está limpa. Qualquer cozinheiro novo entra e **entende tudo em minutos**; achar a faca certa é instantâneo; um erro é fácil de ver. O prato sai rápido e sem acidentes.

Na **cozinha bagunçada**, tudo funciona — para *quem a bagunçou*. As panelas estão empilhadas em qualquer lugar, os potes sem rótulo, a faca de pão no meio das colheres. O dono se vira porque decorou onde está cada coisa. Mas **qualquer outra pessoa** (ou o próprio dono depois de um mês) perde 20 minutos procurando, corta o dedo na faca escondida, e usa o sal achando que era açúcar.

Código é a cozinha onde o **time inteiro** vai cozinhar, por anos. "Funciona para mim agora" é a cozinha bagunçada. Código limpo é deixar a cozinha organizada **para o próximo** — que muitas vezes é você mesmo, sem lembrar de nada. Guarde: **código limpo é organizar a cozinha para quem vem depois.**

---

## 🧩 Conceitos fundamentais

### 1. O princípio central: código é comunicação

Programar não é conversar com o computador — para o computador, tudo é igual, contanto que compile. Programar é **conversar com outros humanos** através do código. O leitor é o cliente. Por isso, o critério número um de qualidade é: **quão rápido alguém entende isto?**

> **Termo explicado — código limpo (clean code):** código escrito para ser fácil de ler, entender e modificar por outras pessoas (e pelo seu autor no futuro), não apenas para funcionar.

### 2. Nomes que revelam a intenção

O nome de uma variável, função ou classe deve dizer **o que ela é / faz**, sem precisar de explicação:

```
❌ ruim:   d = 30           // o que é "d"? dias? distância? desconto?
✅ bom:    dias_ate_vencer = 30

❌ ruim:   função calc(x, y) { ... }
✅ bom:    função calcularFrete(distancia_km, peso_kg) { ... }
```

Um bom nome é um **comentário embutido que nunca fica desatualizado**. Regras práticas: use palavras do domínio (`pedido`, `frete`), evite abreviações obscuras, seja específico (`clientesAtivos` em vez de `lista`), e mantenha um padrão consistente. Este é o hábito de maior retorno em todo o capítulo.

### 3. Funções pequenas, que fazem uma coisa só

Uma função deve fazer **uma coisa**, bem, e ter um nome que descreva essa coisa. Funções gigantes que fazem dez tarefas são difíceis de entender, testar e reaproveitar.

```
❌ uma função de 200 linhas que valida, calcula, salva no banco, envia e-mail e loga...
✅ várias funções pequenas: validarPedido(), calcularTotal(), salvarPedido(),
   enviarConfirmacao() — cada uma com um nome que diz o que faz
```

Sinal de alerta: se você precisa de comentários do tipo "// agora a parte que calcula o frete", provavelmente ali começa uma **nova função** pedindo para nascer. Isso é a ideia de "responsabilidade única" que reaparece no [[35-Principios-de-design-e-design-patterns]] (o "S" do SOLID).

### 4. Comentários: os úteis e os inúteis

Comentário bom explica o **porquê**, não o **o quê**. O código já diz o que faz; o comentário serve para o contexto que o código não consegue expressar:

```
❌ inútil (repete o óbvio):
   i = i + 1   // incrementa i em 1

✅ útil (explica o porquê / uma decisão não óbvia):
   // usamos 3 tentativas porque a API de pagamento falha esporadicamente
   max_tentativas = 3
```

Um sinal de código sujo é a **necessidade** de muitos comentários explicando *o que* o código faz — geralmente significa que o código não está claro o suficiente e deveria ser reescrito (com bons nomes e funções menores). O melhor comentário é o que você não precisou escrever porque o código já se explicava.

### 5. Code smells: os "maus cheiros"

**Code smells** são sinais de que algo provavelmente está mal escrito — não são bugs, mas indícios de problema. Os mais comuns:

- **Função/classe gigante:** faz coisas demais.
- **Nomes ruins:** `x`, `temp`, `data2`, `fazerCoisa()`.
- **Código duplicado:** o mesmo trecho copiado em vários lugares (viola o **DRY**, próximo capítulo).
- **Aninhamento profundo:** `if` dentro de `if` dentro de `for` dentro de `if` — difícil de seguir.
- **Números e textos "mágicos":** `if (status == 3)` — o que é 3? Use uma constante nomeada (`STATUS_PAGO`).
- **Parâmetros demais:** uma função que recebe 8 argumentos provavelmente faz coisas demais.

> **Termo explicado — code smell:** um sinal na superfície do código que sugere um problema mais profundo de design (função gigante, duplicação, nomes ruins). Não quebra, mas pede atenção.

### 6. Refatoração e o "escoteiro"

**Refatorar** é melhorar a estrutura do código **sem mudar o que ele faz** — renomear para ficar claro, quebrar uma função grande, eliminar duplicação. É uma atividade contínua, não um evento raro.

Uma regra cultural famosa é a **do escoteiro**: "deixe o acampamento mais limpo do que encontrou". Sempre que você mexe num trecho, faça uma pequena melhora (um nome melhor, uma função extraída). Assim o código melhora aos poucos, em vez de apodrecer.

> **Termo explicado — refatoração:** melhorar a estrutura interna do código (legibilidade, organização) sem alterar seu comportamento externo. Reduz a dívida técnica.

### 7. Dívida técnica: o custo do código sujo

**Dívida técnica** é a metáfora perfeita: escrever código apressado e sujo é como pegar um empréstimo — você entrega rápido hoje, mas paga **juros** depois, na forma de bugs, lentidão para adicionar features e horas perdidas para entender a bagunça. Um pouco de dívida consciente pode ser estratégico (entregar o MVP rápido — [[12-Como-nasce-uma-startup]]); dívida ignorada e acumulada **trava** a evolução do produto.

> **Termo explicado — dívida técnica (technical debt):** o custo futuro acumulado por escolhas de código apressadas ou sujas. Como um empréstimo: alívio agora, juros depois. (Aprofunda no Cap. 99, Volume 4.)

---

## ⚙️ Como funciona na prática

Vamos limpar um trecho real, passo a passo. Antes (funciona, mas é sujo):

```
função p(l) {
    var t = 0
    for (i = 0; i < l.length; i++) {
        t = t + l[i].pr
        if (l[i].pr > 100) { t = t - (l[i].pr * 0.1) }  // ???
    }
    if (t > 50) { return t } else { return t + 8 }
}
```

Você consegue dizer o que isso faz? Difícil. Nomes crípticos (`p`, `l`, `t`, `pr`), número mágico (`0.1`, `100`, `50`, `8`), lógica misturada. Agora **depois** (mesmo comportamento, limpo):

```
const DESCONTO_ITEM_CARO = 0.10        // 10% em itens acima de R$100
const LIMITE_ITEM_CARO = 100
const LIMITE_FRETE_GRATIS = 50
const VALOR_FRETE = 8

função calcularTotalDoPedido(itens) {
    let total = somarComDescontos(itens)
    return aplicarFrete(total)
}

função somarComDescontos(itens) {
    let total = 0
    para cada item em itens {
        total += item.preco
        se (item.preco > LIMITE_ITEM_CARO) {
            total -= item.preco * DESCONTO_ITEM_CARO
        }
    }
    return total
}

função aplicarFrete(total) {
    se (total > LIMITE_FRETE_GRATIS) return total
    return total + VALOR_FRETE
}
```

O **comportamento é idêntico**, mas agora qualquer pessoa lê e entende: soma os preços, aplica desconto em itens caros, e cobra frete se o total não passar do limite. Repare no que mudou: **nomes que revelam a intenção**, **números mágicos viraram constantes nomeadas**, e uma função grande virou **funções pequenas com um trabalho cada**. Ninguém precisou de comentários explicando "o quê" — o código fala por si. Isso é refatoração: mesmo resultado, legibilidade transformada.

E o mais importante: quando a Ana pedir "mude o frete grátis para R$ 60", no código limpo você troca **uma constante** (`LIMITE_FRETE_GRATIS`); no código sujo, você caça o número `50` no meio da lógica e reza para não ter esquecido nenhum outro `50` que significava outra coisa. Código limpo é o que torna a mudança **barata e segura** — e software existe para mudar.

---

## 🍔 Aplicação na SaborExpress

**Código limpo é velocidade de negócio para a Ana.** A SaborExpress precisa lançar features rápido para competir (frete grátis em promoção, novo método de pagamento, agendamento de pedidos). Se o código é limpo, o time adiciona cada novidade em horas; se é sujo, cada mudança exige decifrar a bagunça, corre-se o risco de quebrar o que funcionava, e o que deveria levar um dia leva uma semana. **A qualidade do código é, literalmente, a velocidade com que a empresa consegue evoluir o produto.** Para uma startup, isso pode ser a diferença entre vencer ou perder para o concorrente.

**A dívida técnica que quase afundou uma feature.** Imagine que, na pressa do lançamento, o time da SaborExpress escreveu a lógica de preços de forma suja, com o cálculo duplicado em cinco telas diferentes. Meses depois, a Ana pede uma mudança na regra de desconto. O dev muda em quatro lugares... e esquece o quinto. Resultado: uma tela cobra errado, clientes reclamam, e o bug só é achado dias depois. Isso é o "juro" da dívida técnica sendo pago — e ilustra por que a duplicação (um code smell) é tão perigosa. Código limpo, com o cálculo em **um só lugar** (uma função reutilizada), teria evitado o incidente inteiro.

**O código limpo protege o plantão.** Lembra do incidente das 3h ([[18-Bastidores-uma-semana-real]])? Quem está de plantão, com sono e pressão, precisa entender um código que talvez nem tenha escrito. Nomes claros e funções pequenas são o que permite corrigir o problema rápido em vez de piorá-lo. Código limpo é um ato de cuidado com o colega — e com você mesmo naquele plantão.

---

## 🏢 Como isso acontece em uma empresa

- **Code review cobra código limpo.** Nos Pull Requests (Volume 3), colegas apontam nomes ruins, funções grandes, duplicação. "Isso está claro? Dá para simplificar?" é o coração da revisão. Escrever limpo é o que faz seus PRs serem aprovados rápido.
- **Padrões e linters automatizam parte disso.** Times adotam guias de estilo e ferramentas (**linters**, **formatters**) que checam automaticamente formatação e alguns smells. Padronização reduz atrito e discussões bobas.
- **Dívida técnica entra no planejamento.** Times maduros reservam tempo para "pagar" dívida (refatorar), porque sabem que ignorá-la freia todo o resto. "Isso é dívida técnica" é uma frase que você ouvirá em reuniões de priorização.
- **Legibilidade > esperteza.** No mercado, um código "esperto" e difícil de entender é visto como **problema**, não talento. O elogio que você quer ouvir é "que código limpo e fácil de seguir", não "nossa, que truque complicado".

---

## ⚠️ Erros comuns

- **Otimizar para "escrever rápido" em vez de "ler fácil".** Você economiza minutos hoje e o time perde horas depois. A conta quase nunca compensa.
- **Nomes preguiçosos.** `x`, `temp`, `data`, `fazer()`. É o smell mais comum e o mais fácil de evitar. Gaste os segundos a mais para nomear bem.
- **Funções que crescem sem parar.** "Só mais um if aqui" repetido vira um monstro de 300 linhas. Quebre cedo, antes que fique difícil de separar.
- **Comentar código ruim em vez de melhorá-lo.** Um comentário explicando um trecho confuso é um curativo; o certo é reescrever o trecho para não precisar do curativo.
- **Copiar-colar (duplicação).** Copiar um trecho para reusar parece rápido, mas cria manutenção múltipla e bugs (o incidente da SaborExpress). Extraia uma função.
- **Achar que "limpar depois".** O "depois" quase nunca chega. Deixe limpo agora, aos poucos (regra do escoteiro). Dívida ignorada só cresce.

---

## 💡 Dicas profissionais

- **Antes de dar por pronto, releia como se fosse outra pessoa.** "Alguém que nunca viu isto entenderia?" Essa pergunta simples pega a maioria dos problemas de clareza.
- **Invista nos nomes acima de tudo.** É o hábito de maior retorno. Um código com nomes excelentes já está 70% limpo. Renomear é a refatoração mais barata e mais impactante.
- **Adote a regra do escoteiro.** Toda vez que tocar num arquivo, deixe-o um pouquinho melhor. Não precisa reescrever tudo — pequenas melhoras contínuas vencem o apodrecimento.
- **Elimine números e textos mágicos.** Transforme-os em constantes nomeadas. `LIMITE_FRETE_GRATIS` conta uma história; `50` esconde uma.
- **Trate a duplicação como alerta vermelho.** Ao se pegar copiando e colando, pare e extraia uma função. Uma regra em um só lugar é uma regra que você muda com segurança.
- **Nomeie a dívida quando a assumir.** Se precisar entregar algo sujo pela pressa, deixe isso explícito (um comentário, uma tarefa) para pagar depois — dívida consciente é gerenciável; dívida escondida, não.

---

## 🎈 Curiosidades

- O livro **"Clean Code"**, de Robert C. Martin ("Uncle Bob"), de 2008, é um dos mais influentes da área — e também um dos mais **debatidos**: muitos concordam com os princípios gerais e discordam de exemplos específicos. Ler com senso crítico faz parte.
- Existe uma citação clássica: **"sempre programe como se a pessoa que vai manter seu código fosse um psicopata violento que sabe onde você mora"**. Exagero cômico, mas fixa a ideia: escreva pensando em quem vem depois.
- A pesquisa mostra que desenvolvedores gastam a **maior parte do tempo lendo** código, não escrevendo — estimativas chegam a 10x mais tempo lendo do que escrevendo. Isso é a base empírica de todo o capítulo.
- **"Programas devem ser escritos para as pessoas lerem, e apenas incidentalmente para as máquinas executarem"** — a frase é do livro *SICP* (1985), um dos textos fundadores da educação em computação. A ideia de código como comunicação humana é antiga e consagrada.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Código limpo** | Código fácil de ler, entender e modificar por humanos. |
| **Nome revelador** | Nome que diz o que a variável/função é ou faz, sem explicação extra. |
| **Responsabilidade única** | Cada função/classe deve fazer uma coisa só. |
| **Comentário útil** | Explica o *porquê* (contexto/decisão), não o *o quê* óbvio. |
| **Code smell** | Sinal de superfície de um problema de design (não é bug). |
| **Número/texto mágico** | Valor solto no código sem nome que explique seu significado. |
| **Duplicação** | O mesmo trecho copiado em vários lugares; viola o DRY. |
| **Refatoração** | Melhorar a estrutura do código sem mudar o que ele faz. |
| **Regra do escoteiro** | Deixar o código um pouco melhor do que você encontrou. |
| **Dívida técnica** | Custo futuro acumulado por código apressado/sujo. |
| **Linter / Formatter** | Ferramentas que checam estilo e smells automaticamente. |

---

## 📝 Resumo

- **Código é lido muito mais do que é escrito** — logo, escreve-se para o **leitor**. Código limpo é **comunicação humana**, não enfeite.
- Práticas centrais: **nomes que revelam a intenção**, **funções pequenas com uma responsabilidade**, **comentários que explicam o porquê** (não o óbvio), e **eliminar números/textos mágicos**.
- **Code smells** (funções gigantes, nomes ruins, duplicação, aninhamento profundo) sinalizam problemas; **refatorar** os corrige sem mudar o comportamento, seguindo a **regra do escoteiro**.
- Código sujo gera **dívida técnica**: alívio hoje, **juros** (bugs, lentidão para evoluir) amanhã. Duplicação é especialmente perigosa.
- Para o negócio, **código limpo = velocidade de evolução**: features saem rápido e com segurança. É também cuidado com o time — e com você no plantão das 3h.
- As regras são poucas; o desafio é a **disciplina** de aplicá-las sempre, inclusive sob prazo.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo por que "código é lido mais do que escrito" muda tudo.
- [ ] Sei dar nomes que revelam a intenção de variáveis e funções.
- [ ] Escrevo funções pequenas, com uma responsabilidade cada.
- [ ] Distingo comentários úteis (porquê) de inúteis (o quê óbvio).
- [ ] Reconheço os principais code smells e sei refatorá-los.
- [ ] Entendo dívida técnica e por que código sujo custa caro ao negócio.

---

## ✏️ Exercícios

**1.** Reescreva com nomes limpos: `função c(a, b) { return a * b * 0.9 }` (é o cálculo de um total com 10% de desconto). Dê nomes reveladores e elimine o número mágico.

**2.** Explique por que um comentário como `// soma 1 ao contador` sobre a linha `contador = contador + 1` é inútil, e dê um exemplo de comentário **útil**.

**3.** Cite três code smells e, para cada um, como você o resolveria.

**4.** Explique a metáfora da "dívida técnica" com suas palavras. Quando assumir dívida pode ser aceitável, e quando vira problema?

**5. (Reflexão)** O time da SaborExpress duplicou a lógica de cálculo de preço em cinco telas. Que problemas isso causa quando a regra de desconto muda? Como o código limpo teria evitado o incidente?

---

## 💬 Respostas comentadas

**1.** Exemplo:
```
const DESCONTO = 0.10
função calcularTotalComDesconto(preco, quantidade) {
    let subtotal = preco * quantidade
    return subtotal * (1 - DESCONTO)
}
```
O essencial: nomes que dizem o que é (`preco`, `quantidade`, `calcularTotalComDesconto`) e o `0.9`/`0.10` virou a constante nomeada `DESCONTO`, que conta a intenção.

**2.** É inútil porque **apenas repete** o que a linha de código já diz claramente — não acrescenta informação, e ainda pode ficar desatualizado. Um comentário **útil** explica o *porquê* que o código não mostra, por exemplo: `// tentamos 3x porque a API de pagamento falha esporadicamente` — contexto de uma decisão, não descrição do óbvio.

**3.** Exemplos: **Função gigante** → quebrar em funções menores, cada uma com uma responsabilidade. **Nomes ruins** (`x`, `temp`) → renomear para nomes reveladores. **Duplicação** → extrair o trecho repetido para uma única função reutilizada. (Também válidos: número mágico → constante nomeada; aninhamento profundo → simplificar/extrair.)

**4.** Resposta pessoal. A dívida técnica é como um **empréstimo**: escrever código apressado entrega valor rápido agora (o "dinheiro na mão"), mas cobra **juros** depois — bugs, dificuldade de mudar, tempo perdido para entender. Assumir dívida pode ser **aceitável** de forma consciente e estratégica (entregar um MVP rápido para validar a ideia), desde que planejada para ser paga. Vira **problema** quando é escondida e acumulada sem nunca ser refatorada, até travar a evolução do produto.

**5.** Quando a regra de desconto muda, o dev precisa alterar **os cinco lugares** — e basta esquecer um para que uma tela passe a cobrar errado, gerando reclamações e um bug difícil de rastrear (aparece só naquela tela). É exatamente o perigo da **duplicação**. Código limpo teria a lógica de preço em **uma única função** reutilizada pelas cinco telas: a mudança seria feita em **um só lugar**, aplicada a todas de uma vez, sem risco de esquecer nenhuma. Uma regra, um lugar.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[35-Principios-de-design-e-design-patterns]] — os princípios (SOLID, DRY, KISS) que estruturam o código limpo em escala.
- **Base anterior:** [[30-Logica-de-programacao-sem-trauma]] (funções) e [[33-Paradigmas-e-orientacao-a-objetos]] (organização).
- **Aplicação imediata:** [[36-Como-um-projeto-real-e-organizado]] e [[40-Localizando-bugs-e-descobrindo-a-arquitetura]] — ler código limpo (e sujo) dos outros.
- **Aplicação futura:** Volume 3 (Code review nos Pull Requests) e Volume 4 (Cap. 99 — dívida técnica em profundidade).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 9 → **Capítulo 34 de 119**.
