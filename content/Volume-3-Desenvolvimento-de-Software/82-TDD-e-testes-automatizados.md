# Capítulo 82 — TDD e testes automatizados

> **Volume 3 — Desenvolvimento de Software** · Módulo 24 — Testes e Qualidade
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **TDD (Test-Driven Development)** e o ciclo **Red-Green-Refactor**.
- Compreender por que "escrever o teste **antes** do código" muda a forma de programar.
- Escrever um teste automatizado na estrutura **Arrange-Act-Assert**.
- Conhecer conceitos práticos: **asserção, mocks/stubs, fixtures** e frameworks de teste.
- Saber quando o TDD ajuda e quando não é a melhor ferramenta.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] (tipos de teste, a pirâmide).
- Ajuda ter lido [[80-Construindo-a-API-da-SaborExpress]] (o código que vamos testar).

---

## 📖 Introdução

No capítulo anterior você viu **por que** testar e **quais** os tipos de teste ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]). Agora vamos ao **como escrevê-los** — e a uma ideia que, à primeira vista, parece de trás para frente: o **TDD (Test-Driven Development, desenvolvimento guiado por testes)**, onde você escreve o **teste antes** do código que ele testa. Parece estranho ("como testar algo que ainda não existe?"), mas é uma das práticas mais influentes da engenharia de software moderna — e, mais que uma técnica de teste, é uma forma de **projetar** o código.

A intuição do TDD é poderosa. Ao escrever o teste **primeiro**, você é **forçado a pensar no que o código deve fazer** — a sua interface, suas entradas e saídas, seu comportamento esperado — **antes** de se perder em como implementá-lo. Você define o "contrato" da função (como no [[80-Construindo-a-API-da-SaborExpress]], mas no nível do código) declarando um exemplo concreto: "dado este carrinho, `calcularTotal` deve devolver este valor". Só então você escreve o código **mínimo** para fazer o teste passar. O resultado costuma ser um código mais **simples, focado e testável** — porque foi desenhado a partir de como será **usado**, não de como o autor imaginou que "deveria" ser por dentro.

O TDD gira num ciclo curto e rítmico chamado **Red-Green-Refactor** (Vermelho-Verde-Refatorar): escreva um teste que **falha** (vermelho, porque o código não existe), escreva o código mínimo para ele **passar** (verde), e então **melhore** o código com a segurança do teste te protegendo (refatorar). Repita, em passos pequenos. Este capítulo ensina esse ciclo e os conceitos práticos de escrever testes (asserção, mocks, fixtures) — para você não só **saber** que testar é bom, mas **saber fazê-lo**. Uma ressalva honesta: TDD é uma ferramenta valiosa, não um dogma; veremos quando ele brilha e quando outra abordagem serve melhor.

---

## 🧠 Analogia

Pense em **escrever a prova antes da aula**, como faz um bom professor ao planejar um curso.

Um professor experiente, antes de preparar as aulas, escreve **primeiro a prova final** — as perguntas que o aluno deverá saber responder ao fim do curso. Parece de trás para frente, mas é genial: ao definir **primeiro o que o aluno precisa conseguir fazer**, o professor descobre **exatamente** o que precisa ensinar, sem enrolação. As aulas passam a ser desenhadas para que o aluno **passe naquela prova** — nada de conteúdo inútil, nada de lacuna no essencial. A prova vira o **guia** do que ensinar.

O TDD é idêntico. O **teste** é a "prova" — ele define, de antemão, **o que o código precisa conseguir fazer** ("dado este carrinho, o total deve ser R$47"). Ao escrever esse teste **primeiro**, você descobre exatamente que código precisa escrever — nada a mais (código inútil que ninguém pediu), nada a menos (o comportamento fica incompleto). E o ciclo é como um professor que ensina **um tópico de cada vez**: escreve **uma** pergunta da prova (o teste falha — o aluno ainda não sabe = **vermelho**), dá a aula mínima para o aluno acertar aquela pergunta (o teste passa = **verde**), revisa e melhora a explicação sem mudar a resposta certa (**refatora**), e passa à próxima pergunta.

E a "prova" fica lá para sempre: se, meses depois, uma mudança no curso fizer o aluno "desaprender" algo (uma regressão — [[81-Por-que-testar-tipos-de-teste-e-a-piramide]]), a prova **reprova** na hora e avisa. Guarde: TDD é escrever a prova antes da aula — o teste primeiro define o que o código deve fazer, e guia você a construí-lo, um passo de cada vez.

---

## 🧩 Conceitos fundamentais

### 1. O que é TDD

**TDD (Test-Driven Development)** é a prática de escrever o **teste antes** do código de produção. O teste, ao falhar, define o alvo; você então escreve o código para fazê-lo passar. É tanto uma técnica de teste quanto uma forma de **projetar** o código a partir de como ele será **usado**.

> **Termo explicado — TDD (Test-Driven Development):** desenvolvimento guiado por testes; escrever primeiro um teste que falha, depois o código mínimo que o faz passar, depois refatorar. Repetir em passos pequenos.

### 2. O ciclo Red-Green-Refactor

O ritmo do TDD, em passos curtos:

- **🔴 Red (Vermelho):** escreva um teste para um comportamento que **ainda não existe**. Ele **falha** (fica vermelho) — como deve, pois o código não está lá. Isso prova que o teste realmente testa algo.
- **🟢 Green (Verde):** escreva o código **mínimo** necessário para o teste passar (ficar verde). Nada de elegância ainda — só faça passar, mesmo que "feio".
- **♻️ Refactor (Refatorar):** agora, com o teste te protegendo, **melhore** o código (organize, remova duplicação, dê bons nomes) sem mudar o comportamento. Se você quebrar algo, o teste avisa na hora.

Repete-se o ciclo para o próximo comportamento. Passos pequenos, feedback constante.

> **Termo explicado — Red-Green-Refactor:** o ciclo do TDD — teste que falha (red) → código mínimo que o faz passar (green) → melhorar o código com segurança (refactor).

### 3. A anatomia de um teste: Arrange-Act-Assert

Todo teste, com ou sem TDD, tem três partes ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]):
- **Arrange (Preparar):** monte o cenário (crie o carrinho com itens de R$47).
- **Act (Agir):** execute o que está testando (`calcularTotal(carrinho)`).
- **Assert (Verificar):** afirme o resultado esperado (`espero que o total seja 55`).

> **Termo explicado — asserção (assert):** a verificação central de um teste — a afirmação de que o resultado obtido é igual ao esperado; se não for, o teste falha.

### 4. Refatorar com segurança

**Refatorar** é melhorar a **estrutura interna** do código **sem mudar seu comportamento externo** (deixar mais limpo, mais rápido, mais legível). Os testes são o que torna isso **seguro**: você reorganiza à vontade, e se algo quebrar, um teste fica vermelho. Sem testes, refatorar é assustador; com eles, é rotina.

> **Termo explicado — refatorar (refactoring):** reestruturar o código internamente para melhorá-lo (clareza, organização) sem alterar o que ele faz por fora.

### 5. Dublês de teste: mocks e stubs

Para testar uma peça **isolada** (unitário — [[81-Por-que-testar-tipos-de-teste-e-a-piramide]]), você precisa **substituir** suas dependências reais (o banco, uma API externa de pagamento) por **dublês** — versões falsas e controladas:
- **Stub:** um dublê que devolve uma resposta fixa ("finja que o banco retornou este usuário").
- **Mock:** um dublê que também **verifica** se foi chamado corretamente ("confirme que o serviço de e-mail foi chamado uma vez").

Isso mantém o teste unitário **rápido** e **focado**, sem depender de sistemas externos lentos ou instáveis.

> **Termo explicado — mock/stub (dublês de teste):** objetos falsos que substituem dependências reais (banco, APIs) num teste, com respostas controladas, para isolar a unidade sendo testada.

### 6. Fixtures e frameworks

- **Fixture:** um cenário/dado de teste preparado e reutilizável (ex.: "um usuário de teste padrão", "um carrinho com 3 itens").
- **Framework de teste:** a ferramenta que roda os testes e fornece as asserções — **Jest** (JS), **PyTest** (Python), **JUnit** (Java), **xUnit** (.NET). Todas descendem do mesmo modelo e são parecidas.

> **Termo explicado — fixture:** dado ou cenário de teste pré-montado e reutilizável, para não repetir a preparação em cada teste.

---

## ⚙️ Como funciona na prática

Como o TDD e os testes acontecem na mão do desenvolvedor:

**Um ciclo TDD real, passo a passo.** Suponha que você vai criar `calcularTotal` com a regra de frete grátis ([[80-Construindo-a-API-da-SaborExpress]]):
1. **🔴 Red:** escreve o teste — "carrinho de R$47 → total R$55". Roda: **falha** (a função nem existe). Bom, o teste funciona.
2. **🟢 Green:** escreve o mínimo — a função soma os itens e adiciona R$8 de frete. Roda: **passa**.
3. **🔴 Red:** escreve o próximo teste — "carrinho de R$52 → total R$52 (frete grátis)". Roda: **falha** (sua função sempre cobra frete).
4. **🟢 Green:** adiciona a regra `if (subtotal > 50) frete = 0`. Roda: **os dois passam**.
5. **♻️ Refactor:** o código ficou com números mágicos (50, 8); você extrai constantes com nomes claros. Roda: **ainda passam**. Seguro.
Repete para o próximo caso (carrinho vazio, cupom...). A cada volta, a função nasce **completa e testada**, guiada pelos exemplos.

**Escrever bons testes.** Um bom teste é: **claro** (o nome diz o que testa: `deveDarFreteGratisAcimaDe50`), **isolado** (não depende de outros testes nem da ordem), **determinístico** (dá o mesmo resultado sempre — nada de depender de data/hora real ou rede, senão vira flaky — [[81-Por-que-testar-tipos-de-teste-e-a-piramide]]), e **focado** (testa **um** comportamento). Testes assim servem de **documentação viva** do código.

**Usar dublês para isolar.** Ao testar um service que envia e-mail de confirmação de pedido, você **não** quer disparar e-mails de verdade nem depender do servidor de e-mail. Você injeta um **mock** do serviço de e-mail e verifica que ele foi **chamado** com os dados certos. Assim o teste é rápido, confiável e não causa efeitos colaterais no mundo real. Isso exige que o código seja **desenhado para receber dependências de fora** (injeção de dependência) — outro benefício de projeto que o TDD encoraja.

**Quando o TDD brilha (e quando não).** O TDD é excelente para **lógica de negócio com regras claras** (cálculos, validações, algoritmos) — onde você sabe as entradas e saídas esperadas. É menos natural quando você está **explorando** (não sabe ainda o que quer construir — protótipos, pesquisa), ou em código muito ligado a UI/efeitos visuais. A postura madura: use TDD onde ele agrega (o coração das regras), e não force onde atrapalha. O importante é ter **testes**; se foram escritos antes ou logo depois é secundário — o "test-first" é um meio, não um fim.

**A disciplina dos passos pequenos.** O segredo do TDD é o **tamanho do passo**: um comportamento por vez, ciclos de minutos. Isso mantém você sempre a poucos segundos de um estado que funciona, e o feedback é constante. Tentar escrever dez testes e todo o código de uma vez perde a mágica — vira "testes depois", com todos os problemas de deixar para o fim ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).

---

## 🍔 Aplicação na SaborExpress

A back-end **Camila** adotou TDD para a lógica de cálculo de pedidos da SaborExpress — a parte onde um bug custaria **dinheiro real** ([[80-Construindo-a-API-da-SaborExpress]]). Acompanhe.

**O ciclo, na regra do frete grátis.** Em vez de escrever `calcularTotal` e depois "ver se funciona", Camila foi por TDD:
- **🔴** Escreveu o teste `deveCobrarFreteAbaixoDe50`: carrinho de R$47 → espera R$55. Rodou: vermelho (função inexistente).
- **🟢** Escreveu a função mínima (soma + R$8 de frete). Verde.
- **🔴** Escreveu `deveDarFreteGratisAcimaDe50`: R$52 → espera R$52. Vermelho (a função sempre cobrava frete).
- **🟢** Adicionou o `if` do frete grátis. Os dois: verde.
- **🔴** O ponto que ela **quase esqueceu**: `deveDefinirFronteiraExataEm50` — carrinho de **exatamente** R$50. Escreveu o teste **antes** e isso a **obrigou a decidir** a regra: é "a partir de R$50" ou "acima de R$50"? Ela alinhou com o PO Bruno ([[46-O-que-sao-requisitos]]): frete grátis a partir de R$50 inclusive. O teste fixou essa decisão para sempre.
- **♻️** Refatorou: extraiu `VALOR_MINIMO_FRETE_GRATIS = 50` e `TAXA_FRETE = 8` como constantes nomeadas. Testes seguiram verdes. Seguro.

**O benefício de projeto (não só de teste).** Escrever os testes **primeiro** forçou Camila a pensar na **interface** de `calcularTotal` antes da implementação: o que entra (uma lista de itens), o que sai (um total), quais casos-limite existem (vazio, fronteira). O resultado foi uma função **enxuta e focada** — porque nasceu do **uso**, não de suposições. Ela notou que, quando programava "no impulso" sem TDD, criava funções que faziam coisas demais e eram difíceis de testar depois.

**Isolando com um mock.** Ao testar o service que envia o **e-mail de confirmação** do pedido, Camila **não** quis disparar e-mails de verdade. Ela injetou um **mock** do serviço de e-mail e verificou que ele foi **chamado uma vez** com o endereço e o número do pedido corretos. O teste rodou em milissegundos, sem efeitos colaterais — e revelou um bug: em um caminho de erro, o e-mail era enviado **duas vezes**. O mock pegou o que um teste "real" mascararia.

**A segurança para refatorar.** Meses depois, o time precisou reescrever `calcularTotal` para suportar **cupons de desconto**. Como havia uma bateria de testes cobrindo o frete grátis, Camila reescreveu a função **sem medo**: a cada mudança, rodava os testes; quando um ficou vermelho (ela quebrou a fronteira dos R$50 sem querer), corrigiu **na hora**. Sem os testes, essa reescrita seria uma aposta assustadora ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).

**Onde ela NÃO usou TDD.** Camila foi pragmática: usou TDD nas **regras de negócio** (cálculo, validações, aplicação de cupom), mas **não** forçou TDD na camada de UI do Diego (posições de tela, animações) nem num **protótipo** exploratório de uma feature ainda indefinida — ali, escreveu testes **depois**, quando o formato estabilizou. Ela resumiu ao time: "TDD é ótimo onde eu sei a entrada e a saída; onde estou explorando, testo depois. O que importa é que o crítico **tenha** testes."

Moral: o TDD deu a Camila código mais simples (porque desenhado a partir do uso), decisões forçadas na hora certa (a fronteira dos R$50), bugs revelados cedo (o e-mail duplicado, pego pelo mock) e liberdade para refatorar (a reescrita com cupons). E ela aplicou com bom senso — no coração das regras, não como dogma universal.

---

## 🏢 Como isso acontece em uma empresa

- **TDD é valorizado, mas não universal.** Muitos times de alta qualidade praticam TDD, especialmente em lógica de negócio crítica; outros escrevem testes logo após o código. O consenso pragmático: o **essencial** é ter bons testes, não a religião do "test-first".
- **Refatorar com testes é rotina em times maduros.** A capacidade de melhorar o código continuamente, com a rede de testes protegendo, é o que evita o acúmulo de dívida técnica. Times sem testes "congelam" o código por medo.
- **Injeção de dependência e código testável andam juntos.** O hábito de escrever testes empurra o código para um design mais desacoplado (dependências injetadas, funções puras) — um benefício arquitetural que vai além dos testes ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- **Mocks são padrão, mas com moderação.** Isolar dependências externas é essencial, mas exagerar em mocks gera testes que testam os mocks, não o sistema. Bons times equilibram unitários com mocks e testes de integração reais ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).
- **Os frameworks são parecidos entre linguagens.** Quem aprende Jest (JS) reconhece PyTest, JUnit, RSpec rapidamente — o modelo (describe/it, arrange-act-assert) é quase universal. Um conceito, muitas sintaxes.
- **"Testes são documentação" é levado a sério.** Em bases grandes, ler os testes é frequentemente a **melhor** forma de entender o que uma função realmente faz — mais confiável que comentários, que envelhecem.
- **A cultura de qualidade se vê nos testes.** A saúde da suíte de testes de um time (rápida? confiável? bem escrita?) é um dos melhores termômetros da maturidade de engenharia de uma empresa.

---

## ⚠️ Erros comuns

- **Escrever o teste que já passa.** No TDD, se o teste **não falha** primeiro (não fica vermelho), ele pode não estar testando nada. O "red" prova que o teste tem valor.
- **Passos grandes demais.** Escrever muito código antes de testar quebra o ritmo do TDD e traz de volta os problemas de "testar no fim". A força está nos passos pequenos.
- **Pular o refactor.** Ficar só no red-green e nunca limpar o código acumula bagunça. O "refactor" é onde a qualidade do design acontece — e os testes o tornam seguro.
- **Testar implementação, não comportamento.** Testes amarrados aos detalhes internos quebram a cada refatoração, mesmo com o comportamento igual — viram um peso ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).
- **Exagerar nos mocks.** Mockar tudo cria testes que verificam os dublês, não o sistema real. Mock só o necessário (dependências externas lentas/instáveis).
- **Testes não-determinísticos (flaky).** Depender de data/hora real, ordem de execução, rede ou aleatoriedade. Um teste que às vezes falha corrói a confiança na suíte inteira.
- **Tratar TDD como dogma.** Forçar test-first em exploração/protótipos/UI onde ele atrapalha. Use onde agrega; o objetivo é ter testes, não obedecer a uma regra.
- **Nomes de teste ruins.** `teste1`, `testCalculo`. Um bom nome descreve o comportamento (`deveDarFreteGratisAcimaDe50`) e serve de documentação.

---

## 💡 Dicas profissionais

- **Experimente o ciclo Red-Green-Refactor de verdade.** Mesmo que não adote TDD sempre, praticá-lo ensina a pensar em comportamento e a dar passos pequenos — habilidades valiosas.
- **Veja o teste falhar primeiro.** Antes de escrever o código, confirme que o teste fica vermelho. Um teste que nunca falhou pode não estar testando nada.
- **Dê nomes que descrevem o comportamento.** `deveRejeitarPedidoSemAutenticacao` conta uma história. O conjunto de nomes vira a especificação do código.
- **Teste comportamento, não implementação.** Verifique entradas → saídas, não os passos internos. Assim os testes sobrevivem às refatorações.
- **Use mocks com parcimônia.** Só para isolar dependências externas (banco, APIs, e-mail). Não mocke o que você está de fato testando.
- **Refatore com confiança — os testes te cobrem.** Melhore o código continuamente; a suíte verde é sua licença para mudar sem medo.
- **Seja pragmático com o "test-first".** Use TDD no núcleo das regras; teste depois onde está explorando. O que não pode faltar é o teste no que importa.
- **Aprenda o framework da sua stack.** Jest, PyTest, JUnit — mas saiba que o modelo é o mesmo em todas. O conceito transfere.

---

## 🎈 Curiosidades

- O TDD foi **redescoberto e popularizado** por **Kent Beck** por volta de 2000, como parte da metodologia **Extreme Programming (XP)**. Beck brincava que apenas "reinventou" uma ideia antiga: ele teria lido, num livro dos anos 1960, que os programadores deveriam escrever a saída esperada de um programa **antes** de escrevê-lo — a semente do TDD estava lá décadas antes.
- O nome do ciclo **"Red-Green-Refactor"** vem literalmente das **cores** que os frameworks de teste mostram: uma barra **vermelha** quando um teste falha e **verde** quando passa. Gerações de desenvolvedores associam a satisfação de "ficar verde" a um pequeno prêmio de dopamina — o que torna o ciclo curiosamente viciante.
- Existe um debate histórico e acalorado apelidado de **"TDD is dead?"** (TDD está morto?), iniciado em 2014 por David Heinemeier Hansson (criador do Ruby on Rails), que criticou o TDD dogmático. O resultado foi uma série de conversas públicas com Kent Beck e Martin Fowler — e um consenso saudável de que TDD é uma **ferramenta**, ótima em muitos casos, não uma religião.
- Estudos sobre TDD mostram resultados **mistos**: alguns apontam menos defeitos, outros não encontram diferença clara. O que a maioria concorda é que o principal benefício do TDD talvez nem seja o teste em si, mas o **design mais simples e testável** que ele induz — o "efeito colateral" virou o prêmio principal.
- A prática de escrever um teste que **falha primeiro** tem um paralelo científico: é como formular uma **hipótese falseável** antes do experimento. Se o seu teste "passa" antes de você escrever o código, algo está errado com o experimento — exatamente como na ciência.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **TDD** | Escrever o teste antes do código; deixar o teste guiar o desenvolvimento. |
| **Red-Green-Refactor** | O ciclo do TDD: teste falha → código passa → melhora o código. |
| **Arrange-Act-Assert** | Estrutura de um teste: preparar, agir, verificar. |
| **Asserção (assert)** | A afirmação central: "o resultado deve ser igual ao esperado". |
| **Refatorar** | Melhorar a estrutura interna do código sem mudar o que ele faz. |
| **Mock** | Dublê que substitui uma dependência e verifica se foi usada certo. |
| **Stub** | Dublê que devolve uma resposta fixa e controlada. |
| **Fixture** | Dado/cenário de teste pré-montado e reutilizável. |
| **Injeção de dependência** | Passar as dependências de fora, tornando o código testável. |
| **Framework de teste** | Ferramenta que roda os testes (Jest, PyTest, JUnit, xUnit). |
| **Determinístico** | Dá sempre o mesmo resultado (o oposto de um teste flaky). |

---

## 📝 Resumo

- **TDD (Test-Driven Development)** é escrever o **teste antes** do código. Mais que testar, é uma forma de **projetar**: ao definir primeiro o que o código deve fazer (suas entradas e saídas), você o desenha a partir do **uso**, obtendo código mais simples, focado e testável.
- O ciclo é **Red-Green-Refactor**: escreva um teste que **falha** (red — prova que ele testa algo), escreva o código **mínimo** que o faz **passar** (green), e então **melhore** o código com a segurança dos testes (refactor). Passos **pequenos**, feedback constante.
- Todo teste segue **Arrange-Act-Assert** (preparar, agir, verificar), tendo a **asserção** no centro. Para isolar uma unidade, usam-se **dublês** — **stubs** (resposta fixa) e **mocks** (que também verificam a chamada) — no lugar de dependências reais (banco, e-mail, APIs).
- Os testes tornam a **refatoração segura**: você melhora o código à vontade, e um teste vermelho avisa se quebrou algo. Isso combate a dívida técnica e o medo de mudar. Ferramentas: Jest, PyTest, JUnit — modelo quase idêntico entre linguagens.
- TDD é uma **ferramenta, não dogma**: brilha na lógica de negócio com regras claras (entradas/saídas conhecidas), é menos natural em exploração/protótipos/UI. O essencial é que o **código crítico tenha bons testes** — "test-first" é um meio, não um fim ([[83-QA-bugs-e-o-ciclo-de-correcao]]).

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é TDD e por que "teste antes" muda a forma de programar.
- [ ] Descrevo o ciclo Red-Green-Refactor e o valor de cada passo.
- [ ] Escrevo um teste na estrutura Arrange-Act-Assert.
- [ ] Diferencio mock de stub e sei por que isolar dependências.
- [ ] Entendo como os testes tornam a refatoração segura.
- [ ] Sei quando o TDD ajuda e quando não é a melhor ferramenta.

---

## ✏️ Exercícios

**1.** Com a analogia da "prova antes da aula", explique o que é TDD e por que escrever o teste primeiro ajuda a construir o código certo.

**2.** Descreva o ciclo **Red-Green-Refactor** e diga qual o valor de cada uma das três etapas. Por que é importante ver o teste **falhar** primeiro?

**3.** Escreva (em pseudocódigo/palavras) um teste no formato **Arrange-Act-Assert** para a regra "carrinho de R$52 deve ter frete grátis (total R$52)".

**4.** O que é um **mock** e por que Camila usou um ao testar o envio de e-mail de confirmação? O que o mock revelou?

**5. (Reflexão)** Camila usou TDD nas regras de negócio, mas **não** na UI nem num protótipo exploratório, dizendo "o que importa é que o crítico tenha testes". Explique por que essa postura pragmática é mais sábia que tratar TDD como dogma.

---

## 💬 Respostas comentadas

**1.** TDD é como um professor que escreve a **prova final antes de preparar as aulas**: ao definir primeiro **o que o aluno precisa saber fazer**, ele descobre exatamente o que ensinar — sem enrolação nem lacunas. No TDD, o **teste** é a "prova": ao escrevê-lo primeiro, você define de antemão **o que o código precisa fazer** ("dado este carrinho, o total deve ser R$47"), e isso guia você a escrever exatamente o código necessário — nada a mais (código inútil), nada a menos (comportamento incompleto). Ajuda a construir o código certo porque você projeta a função a partir de como ela será **usada** (suas entradas e saídas), em vez de imaginar como "deveria ser" por dentro — o que costuma gerar código mais simples, focado e testável. E, como uma prova guardada, o teste continua lá para reprovar qualquer regressão futura.

**2.** **🔴 Red:** escreva um teste para um comportamento que ainda não existe; ele deve **falhar**. Valor: define o alvo (o que construir) e **prova que o teste realmente testa algo** — se ele passasse sem o código, não estaria testando nada. **🟢 Green:** escreva o código **mínimo** para o teste passar, sem se preocupar com elegância. Valor: faz o comportamento existir no menor passo possível, mantendo você sempre perto de um estado que funciona. **♻️ Refactor:** com o teste protegendo, melhore a estrutura do código (nomes, organização, duplicação) sem mudar o comportamento. Valor: é onde a **qualidade do design** acontece, com segurança. Ver o teste **falhar primeiro** é importante porque um teste que passa **antes** de o código existir está com defeito (não testa o que deveria) — o "red" é a prova de que o teste tem valor real, como uma hipótese que precisa poder ser refutada.

**3.** 
```
teste "deve dar frete grátis acima de R$50":
  # Arrange (preparar)
  carrinho = criarCarrinho(itens que somam R$52)
  # Act (agir)
  total = calcularTotal(carrinho)
  # Assert (verificar)
  espero que total seja igual a 52   # frete grátis: sem os R$8
```
O teste prepara o cenário (um carrinho de R$52), executa a função sob teste (`calcularTotal`) e **afirma** o resultado esperado (R$52, sem taxa de frete, porque passou do mínimo de R$50). Se `calcularTotal` devolvesse R$60 (cobrando frete indevidamente), a asserção falharia e o teste ficaria vermelho.

**4.** Um **mock** é um dublê de teste — um objeto falso que **substitui uma dependência real** e permite **verificar se ele foi chamado corretamente**. Camila usou um mock do serviço de e-mail ao testar o envio de confirmação porque **não queria disparar e-mails de verdade** a cada execução do teste (efeito colateral no mundo real) nem depender do servidor de e-mail (lento e instável, o que deixaria o teste flaky). Com o mock, ela verificou que o serviço foi **chamado uma vez** com o endereço e o número do pedido corretos, num teste rápido e sem efeitos colaterais. O mock **revelou um bug**: em um caminho de erro, o e-mail era enviado **duas vezes** — algo que um teste sem mock (ou um teste manual) facilmente mascararia, e que teria incomodado clientes reais recebendo e-mails duplicados.

**5.** Porque o **objetivo real** é ter **bons testes no código que tem risco**, e o "test-first" (TDD) é apenas **um meio** de chegar lá — ótimo em alguns contextos, desnecessário ou atrapalhador em outros. O TDD brilha na **lógica de negócio com regras claras** (o cálculo do pedido, o frete, os cupons), onde Camila **sabe** as entradas e saídas esperadas e pode escrevê-las como testes antes de codar. Mas em **exploração/protótipos**, ela ainda **não sabe** o que quer construir — escrever testes antes seria fixar decisões que vão mudar, um desperdício; ali faz sentido explorar e testar **depois**, quando o formato estabiliza. E na **UI** (posições, animações), o comportamento é visual e difícil de expressar como asserção. Tratar TDD como **dogma** universal levaria a forçar a prática onde ela custa mais do que rende, gerando testes frágeis ou atrasando a exploração — enquanto o pragmatismo (TDD no crítico, testes depois no resto, o importante é **ter** cobertura onde o risco mora) entrega o benefício real sem a rigidez. Ferramentas servem ao objetivo, não o contrário.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] — por que testar e os tipos de teste.
- **Próximo (linear):** [[83-QA-bugs-e-o-ciclo-de-correcao]] — quando um bug escapa dos testes: QA e o ciclo de correção.
- **Aplicação:** [[80-Construindo-a-API-da-SaborExpress]] (o código testado) e [[64-Pull-Requests-code-review-e-issues]] (a CI que roda os testes).
- **Design:** [[58-MVC-camadas-e-separacao-de-responsabilidades]] — testes empurram o código para um design mais desacoplado.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 24 → **Capítulo 82 de 119**.
