# Capítulo 39 — Engenharia reversa: entrar num projeto de 500 mil linhas ⭐

> **Volume 2 — A Base da Computação** · Módulo 11 — Ler código e documentação
> Coleção: *Do Estudante ao Engenheiro de Software*
> ⭐ **Capítulo-marco:** por onde começar quando você não escreveu nenhuma daquelas linhas.

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Encarar sem pânico um **projeto enorme** que você não escreveu (o cenário do seu primeiro emprego).
- Aplicar uma **estratégia de exploração** para entender um sistema desconhecido sem ler tudo.
- Usar as ferramentas certas: **busca global**, **seguir um fluxo**, **rodar o projeto**, **ler os testes**, o **histórico do Git**.
- Construir um **modelo mental** da arquitetura a partir de pistas (estrutura, nomes, dependências).
- Fazer mudanças pequenas com segurança **antes** de entender tudo.
- Transformar "estou perdido" em "sei me orientar" — a competência número um do primeiro dia.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 20 minutos de prática num projeto real.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- [[36-Como-um-projeto-real-e-organizado]] (estrutura de pastas), [[37-Anatomia-de-um-projeto-no-GitHub]] (repositório/histórico) e [[38-Como-ler-documentacao]] (README/docs).
- [[25-Terminal-e-comandos-essenciais]] (`grep` e busca).

---

## 📖 Introdução

No seu primeiro dia de trabalho, vai acontecer isto: alguém vai te dar acesso a um sistema com **centenas de milhares de linhas de código**, escritas por dezenas de pessoas ao longo de anos, e te pedir para "corrigir um bug" ou "adicionar um campo". Você vai abrir aquilo, sentir o chão sumir, e pensar: **"eu nunca vou entender isso"**.

Respire. **Ninguém entende um sistema grande por inteiro — nem quem o escreveu.** Sistemas reais são complexos demais para caber numa cabeça só ([[07-O-que-é-software]]: "pura complexidade lógica"). O que os profissionais fazem não é "entender tudo"; é ter um **método para se orientar**, mergulhar só na parte relevante, e fazer mudanças com segurança sem dominar o resto. Isso é **engenharia reversa** de um sistema existente — e é uma das habilidades mais práticas e valiosas que existem.

Este capítulo-marco te dá esse método. É a diferença entre passar a primeira semana paralisado de medo e passar a primeira semana **entregando pequenas coisas e ganhando confiança**. Junto com os capítulos 36, 37 e 38, ele completa o seu "kit de sobrevivência" para entrar em qualquer código do mundo.

---

## 🧠 Analogia

Imagine que você foi contratado como **médico num hospital gigante** onde nunca trabalhou.

Você **não** decora a planta inteira do prédio no primeiro dia, nem estuda cada paciente. Isso seria impossível. Em vez disso, você:

1. Pega o **mapa geral** na recepção (onde ficam emergência, UTI, laboratório) — a estrutura de pastas.
2. **Segue um paciente** do começo ao fim (entrada → triagem → exame → diagnóstico → alta) para entender o fluxo — seguir uma requisição pelo código.
3. Vai fundo **só na especialidade do seu caso** — mergulha só na parte relevante do sistema.
4. Consulta o **prontuário** (o histórico do paciente) para entender como ele chegou ali — o histórico do Git.
5. Faz **intervenções pequenas e seguras** primeiro, ganhando confiança antes das grandes.

Um médico competente é produtivo num hospital novo em dias — não porque decorou tudo, mas porque **tem um método para navegar o desconhecido**. Guarde: **entrar num projeto gigante é como ser um médico num hospital novo — você se orienta e trata o caso, sem precisar conhecer cada corredor.**

---

## 🧩 Conceitos fundamentais

### 1. A mudança de mentalidade: orientar-se, não dominar

O primeiro passo é psicológico e liberta: **abandone a meta de "entender tudo".** Sua meta é **entender o suficiente para a tarefa em mãos** e saber onde procurar o resto. Um sistema de 500 mil linhas é um território que você explora por partes, conforme precisa — não um livro para memorizar. Aceitar isso tira o pânico e te deixa produtivo.

### 2. Comece pelo alto: os "mapas" prontos

Antes de mergulhar no código, colha os mapas que já existem (aplicando os capítulos anteriores):

- **README e docs** ([[38-Como-ler-documentacao]]): o que é o sistema, como rodá-lo, visão geral.
- **Estrutura de pastas** ([[36-Como-um-projeto-real-e-organizado]]): as camadas, onde mora o quê.
- **Dependências** (`package.json` etc.): que tecnologias/bibliotecas o projeto usa — isso te diz muito sobre como ele funciona.

Esses três já te dão um esqueleto mental antes de ler uma linha de lógica.

### 3. Rode o projeto (veja-o vivo)

Um dos passos mais subestimados: **faça o projeto rodar na sua máquina** e use-o. Ver o sistema **funcionando** — clicar nas telas, fazer uma requisição — conecta o comportamento visível ao código. "Ah, quando clico aqui, acontece aquilo" é uma âncora poderosa para depois achar *onde* aquilo acontece no código. Se o README foi bem feito ([[38-Como-ler-documentacao]]), ele te ensina a rodar.

### 4. Siga um fluxo de ponta a ponta

A técnica mais poderosa: **escolha uma funcionalidade e siga-a pelo código, do início ao fim.** Como no [[36-Como-um-projeto-real-e-organizado]]: pegue "criar um pedido" e rastreie route → controller → service → repository → banco. Seguir **um** fluxo completo ensina mais sobre a arquitetura do que ler dezenas de arquivos soltos, porque mostra como as peças **se conectam**.

### 5. Use a busca global como bússola

Sua ferramenta mais usada será a **busca global** do editor (a versão turbinada do `grep`, [[25-Terminal-e-comandos-essenciais]]). Estratégias:

- **Busque por um texto visível na tela.** Viu a mensagem "Pedido confirmado" na interface? Busque essa string no código — ela te leva direto ao trecho relevante.
- **Busque pelo nome de uma função/rota.** Achou `calcularFrete`? Busque onde ela é **chamada** e onde é **definida** para entender seu uso.
- **Siga os rastros.** Cada resultado de busca leva a outro; você vai "puxando o fio" até entender a parte que importa.

Essa técnica — partir de algo concreto e visível e "puxar o fio" até o código — é o coração da engenharia reversa.

### 6. Leia os testes: a documentação viva

Os **testes** ([[36-Como-um-projeto-real-e-organizado]], `tests/`) são uma fonte de ouro para entender um sistema, porque mostram **como o código deve ser usado** e **o que ele deve fazer**, com exemplos concretos e verificáveis. Um bom teste de `calcularTotal` diz, na prática: "com estes itens e este cupom, o resultado deve ser X". É documentação que **não mente** (se estivesse errada, o teste falharia). Quando falta doc, os testes frequentemente a substituem.

### 7. Use o histórico do Git para entender o "porquê"

O **histórico de commits** ([[37-Anatomia-de-um-projeto-no-GitHub]]) responde perguntas que o código atual não responde: *por que* isto é assim? quando isto foi adicionado? A ferramenta **`git blame`** mostra quem escreveu cada linha e em qual commit — e a mensagem daquele commit (ou a issue/PR ligados) muitas vezes explica a decisão. Ler o passado do código é como ler o prontuário do paciente: revela a história por trás do estado atual.

> **Termo explicado — git blame:** ferramenta que mostra, linha a linha, quem fez a última alteração e em qual commit. Útil para entender *por que* um trecho existe (via a mensagem do commit).

### 8. Faça mudanças pequenas e seguras primeiro

Você **não precisa** entender o sistema inteiro para contribuir. Comece por mudanças pequenas e de baixo risco (corrigir um texto, ajustar um valor, um bug localizado), guiado pela busca e por um fluxo. Cada pequena mudança bem-sucedida **aumenta seu mapa mental** e sua confiança. A rede de segurança para ousar isso são os **testes** (se você quebrar algo, eles avisam) e o **code review** ([[37-Anatomia-de-um-projeto-no-GitHub]]). Assim você aprende **fazendo**, não só lendo.

---

## ⚙️ Como funciona na prática

Vamos aplicar o método a uma tarefa real de primeiro emprego na SaborExpress: **"o cálculo de frete está errado para pedidos acima de R$ 100 — corrija"**. Você nunca viu esse código.

```
1. RODE o projeto e reproduza o bug
   → faço um pedido acima de R$100 e confirmo: o frete sai errado. Vi o problema vivo.

2. ACHE o ponto de entrada pela busca global
   → busco "frete" no código → vários resultados
   → busco a mensagem/valor que aparece na tela → me leva mais perto

3. SIGA o fluxo (cap. 36)
   → acho calcularFrete() no services/ → é o coração da regra (como esperado!)

4. LEIA os testes de calcularFrete (tests/)
   → vejo exemplos de como ela deveria funcionar → entendo o comportamento esperado
   → talvez até já exista um teste que expõe o bug, ou eu escrevo um

5. USE o git blame naquela linha
   → descubro que a condição do desconto acima de R$100 foi alterada há 2 semanas
   → a mensagem do commit e a issue ligada explicam a intenção original

6. FAÇA a correção pequena e segura
   → conserto a condição, rodo os testes (passam), testo no app (frete correto)
   → abro um Pull Request (cap. 37) explicando o que e por quê
```

Repare no que **não** foi preciso: entender as 500 mil linhas, conhecer cada módulo, dominar o sistema inteiro. Você resolveu um problema real mergulhando **só na parte relevante**, guiado por um método. E veja como **todo o módulo se juntou**: você rodou o projeto e leu o README ([[38-Como-ler-documentacao]]), navegou pela estrutura de pastas ([[36-Como-um-projeto-real-e-organizado]]), usou o histórico do Git ([[37-Anatomia-de-um-projeto-no-GitHub]]), leu os testes, e usou a busca (o `grep` do [[25-Terminal-e-comandos-essenciais]]). Engenharia reversa não é um truque isolado — é a **orquestração** de tudo o que você aprendeu, aplicada ao desafio mais comum da vida profissional: contribuir num código que você não escreveu.

Essa é a competência que transforma o primeiro emprego de aterrorizante em possível. Ninguém espera que você chegue sabendo o sistema deles — esperam que você saiba **se orientar** nele. E agora você sabe.

---

## 🍔 Aplicação na SaborExpress

**Você entrando na SaborExpress.** Imagine que a Ana te contratou. A SaborExpress já tem anos de código, escrito por gente que talvez nem trabalhe mais lá. No seu primeiro dia, ninguém vai (nem pode) te explicar cada linha. O que se espera é que você use o método deste capítulo: leia o README, rode o sistema, siga um fluxo (um pedido, do app ao banco), e comece por uma tarefa pequena. Em uma ou duas semanas, você estará entregando correções e pequenas features — não porque "aprendeu a SaborExpress inteira", mas porque **sabe navegá-la**. Essa é a expectativa real do mercado para um júnior, e você está preparado para ela.

**O código conta a história do negócio.** Ao fazer engenharia reversa da SaborExpress, você vai descobrir as regras de negócio "escondidas" no código — o cálculo de frete, as condições de cupom, os estados de um pedido. Muitas vezes, o **código é a documentação mais atualizada** do que o sistema realmente faz (docs envelhecem; o código em produção é a verdade). Aprender a extrair as regras a partir do código é o que te permite responder à Ana "sim, hoje o sistema faz X nessa situação" com certeza, olhando a fonte, em vez de adivinhar.

**Por que a Ana valoriza isso.** Um desenvolvedor que se orienta sozinho num sistema desconhecido é **barato e rápido** para a empresa: ele resolve problemas sem precisar segurar a mão de um sênior o tempo todo. Um que trava e depende de explicação para cada tarefa consome o tempo de todo o time. Essa autonomia — a mesma que o [[38-Como-ler-documentacao]] deu para tecnologias novas, agora aplicada a **sistemas existentes** — é uma das coisas que mais diferenciam profissionais no mercado. É empregabilidade pura.

---

## 🏢 Como isso acontece em uma empresa

- **Todo emprego começa com engenharia reversa.** Você quase nunca começa um sistema do zero; você entra num que já existe. As primeiras semanas de qualquer emprego são, essencialmente, aplicar este capítulo.
- **"Comece por uma tarefa pequena" é a prática de onboarding.** Times bons dão aos novatos tarefas pequenas e bem delimitadas ("good first issues") justamente para que aprendam o sistema fazendo, com segurança. Espere e abrace isso.
- **`git blame` e o histórico são rotina.** Investigar "por que isto é assim?" e "quando isto mudou?" faz parte do dia a dia de manutenção. O histórico do Git é uma ferramenta de investigação constante.
- **Ninguém sabe o sistema inteiro — e tudo bem.** Mesmo os sêniores conhecem bem só as partes em que trabalham. O conhecimento é distribuído pelo time. Perguntar "quem conhece a área de pagamentos?" é normal e esperado.

---

## ⚠️ Erros comuns

- **Tentar entender tudo antes de começar.** Impossível e paralisante. Entenda o suficiente para a tarefa; o resto vem com o tempo, conforme você toca em mais partes.
- **Não rodar o projeto.** Ler código sem nunca ver o sistema funcionando é muito mais difícil. Rode primeiro, conecte comportamento a código.
- **Ignorar os testes.** Eles são documentação viva de como o código funciona. Pulá-los é jogar fora um mapa gratuito.
- **Ler arquivos ao acaso.** Abrir arquivos aleatórios sem um fio condutor gera confusão. Sempre **siga um fluxo** ou **puxe um fio** a partir da busca.
- **Ter vergonha de perguntar depois de tentar.** Autonomia é procurar primeiro; mas travar por horas por orgulho é desperdício. Depois de investigar, perguntar mostrando o que já tentou é profissional, não fraqueza.
- **Fazer mudanças grandes cedo demais.** Antes de entender bem, prefira mudanças pequenas e reversíveis, protegidas por testes e revisão. Grandes reescritas sem entender o terreno são receita para desastre.

---

## 💡 Dicas profissionais

- **Sempre parta de algo concreto e visível.** Um texto na tela, uma mensagem de erro, uma URL. Buscar por isso no código te ancora num ponto real e te leva direto à parte relevante — em vez de vagar no abstrato.
- **Siga um fluxo completo no primeiro dia.** Escolha a funcionalidade principal do sistema e rastreie-a de ponta a ponta. É o investimento que mais rápido constrói seu mapa mental da arquitetura.
- **Leia os testes para aprender o comportamento esperado.** E, quando for corrigir um bug, escreva um teste que o reproduz **antes** de consertar: ele prova o problema e garante que sua correção funcionou.
- **Use `git blame` para entender o "porquê".** Quando um trecho parecer estranho, veja quem o escreveu e por quê (a mensagem do commit/PR). Muitas vezes há uma razão que não é óbvia no código atual.
- **Faça sua primeira entrega ser pequena.** Uma correção simples bem-feita e revisada te dá confiança, mostra o fluxo de trabalho do time (PR, review, deploy) e amplia seu mapa. Ganhe momentum antes de encarar o difícil.
- **Anote seu mapa mental conforme aprende.** Um rascunho seu de "como o sistema funciona" (e o que ainda não entende) acelera muito, e vira material para documentar depois — ajudando o próximo novato.

---

## 🎈 Curiosidades

- Estima-se que desenvolvedores gastem **muito mais tempo lendo e entendendo código existente do que escrevendo código novo** — reforçando por que ler ([[34-Codigo-limpo]]) e se orientar em sistemas alheios é o verdadeiro dia a dia da profissão.
- Sistemas realmente grandes são impressionantes: o buscador do Google, o sistema do Facebook e o kernel do Linux têm **milhões a bilhões** de linhas. Ninguém, em lugar nenhum, "sabe tudo" desses sistemas — eles são mantidos por milhares de pessoas, cada uma dominando um pedaço.
- O termo **"código legado" (legacy code)** descreve sistemas antigos, muitas vezes sem documentação e sem testes, que ainda rodam em produção (bancos, governos, companhias aéreas). Manter e fazer engenharia reversa de código legado é uma especialidade inteira — e muito bem paga, justamente por ser difícil.
- Existe uma "lei" folclórica na engenharia: **quando um código parece estranho ou errado, muitas vezes há uma razão histórica esquecida** (um bug de negócio, uma regra fiscal, um caso extremo). Por isso `git blame` e ler o histórico antes de "consertar o que parece feio" evita quebrar coisas que existiam de propósito. Respeite o código que você não entende ainda.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Engenharia reversa (de sistema)** | Entender um sistema existente que você não escreveu, a partir do código. |
| **Modelo mental** | A imagem interna que você constrói de como um sistema funciona. |
| **Busca global** | Procurar um texto/nome em todo o projeto (o `grep` do editor). |
| **Seguir um fluxo** | Rastrear uma funcionalidade pelo código, de ponta a ponta. |
| **Testes como documentação** | Usar os testes para entender como o código deve funcionar. |
| **git blame** | Ver quem escreveu cada linha e em qual commit (e por quê). |
| **Código legado (legacy)** | Sistema antigo, muitas vezes sem doc/testes, ainda em produção. |
| **Good first issue** | Tarefa pequena e marcada para quem está começando no projeto. |

---

## 📝 Resumo

- Você vai entrar em sistemas **enormes que não escreveu** — e **ninguém entende um sistema grande por inteiro**. A meta é **orientar-se**, não dominar tudo.
- Comece pelos **mapas prontos** (README, estrutura de pastas, dependências) e **rode o projeto** para vê-lo vivo.
- As técnicas centrais: **seguir um fluxo** de ponta a ponta, usar a **busca global** partindo de algo visível ("puxar o fio"), **ler os testes** (documentação viva) e usar o **histórico do Git / git blame** para entender o "porquê".
- **Faça mudanças pequenas e seguras primeiro**, protegido por testes e code review — aprendendo fazendo e ampliando seu mapa mental a cada entrega.
- Isso **orquestra todo o módulo** (caps. 25, 36, 37, 38) e é a competência número um do primeiro emprego: ninguém espera que você saiba o sistema deles, e sim que saiba **navegá-lo**.
- Essa autonomia — se virar sozinho em código existente — é empregabilidade pura, tão valiosa quanto saber aprender tecnologias novas.

---

## ☑️ Checklist de aprendizado

- [ ] Abandonei a meta de "entender tudo" e adotei "entender o suficiente para a tarefa".
- [ ] Sei começar por README, estrutura e dependências, e rodar o projeto.
- [ ] Uso a busca global partindo de algo visível para "puxar o fio".
- [ ] Sigo um fluxo de ponta a ponta para entender a arquitetura.
- [ ] Uso testes como documentação e o histórico do Git para entender o "porquê".
- [ ] Sei fazer mudanças pequenas e seguras antes de dominar o sistema.

---

## ✏️ Exercícios

**1.** Por que "tentar entender todo o sistema antes de começar" é um erro num projeto de 500 mil linhas? Qual é a mentalidade correta?

**2.** Você precisa achar, num sistema desconhecido, o código responsável por uma mensagem "Pagamento recusado" que aparece na tela. Descreva como a busca global te ajuda a chegar lá.

**3.** De que formas os **testes** de um projeto ajudam você a entender como o código funciona?

**4.** O que é o `git blame` e que tipo de pergunta ele ajuda a responder ao investigar um trecho estranho?

**5. (Reflexão)** É o seu primeiro dia na SaborExpress e te pedem para corrigir um bug num sistema que você nunca viu. Descreva, passo a passo, como você usaria o método deste capítulo — e por que não é preciso entender o sistema inteiro para entregar a correção.

---

## 💬 Respostas comentadas

**1.** Porque é **impossível** (o sistema é grande demais para uma cabeça só — nem seus autores o dominam inteiro) e **paralisante** (você trava sem produzir nada). A mentalidade correta é **orientar-se**: entender o suficiente para a tarefa em mãos, mergulhando só na parte relevante, e saber onde procurar o resto conforme a necessidade for surgindo.

**2.** Você usa a **busca global** para procurar o texto visível "Pagamento recusado" em todo o código. A string provavelmente aparece no trecho que gera essa mensagem, o que te leva diretamente ao ponto relevante (o controller/service de pagamento). Dali, você "puxa o fio": vê que função a produz, onde ela é chamada, e vai reconstruindo o fluxo até entender a lógica — partindo de algo concreto e visível em vez de vagar pelo código.

**3.** Os testes mostram **exemplos concretos de como o código deve ser usado** (quais entradas, quais chamadas) e **o que ele deve produzir** (o resultado esperado), de forma verificável. Ler um teste de `calcularTotal`, por exemplo, revela o comportamento esperado sem você precisar decifrar a implementação. E, por serem executáveis, os testes **não mentem**: se descrevessem o comportamento errado, falhariam. São documentação viva, especialmente valiosa quando falta doc escrita.

**4.** `git blame` mostra, linha a linha, **quem** fez a última alteração e em **qual commit**. Ele ajuda a responder ao **"por que este trecho é assim?"**: pela mensagem do commit (e a issue/PR ligados), você descobre a intenção e o contexto histórico de um código que parece estranho — evitando "consertar" algo que existia de propósito.

**5.** Passo a passo: (1) ler o **README** e **rodar** o sistema para reproduzir o bug e vê-lo vivo; (2) usar a **busca global**, partindo de algo visível (a mensagem/valor errado na tela), para achar o ponto de entrada; (3) **seguir o fluxo** pelas camadas (cap. 36) até a função responsável, provavelmente no `services/`; (4) **ler os testes** dessa função para entender o comportamento esperado e, se possível, escrever um teste que expõe o bug; (5) usar `git blame` para entender por que o código está assim; (6) fazer a **correção pequena**, rodar os testes, testar no app e abrir um **Pull Request**. Não é preciso entender o sistema inteiro porque o problema está contido numa parte específica, e o método te leva direto até ela — com os testes e o code review servindo de rede de segurança.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[40-Localizando-bugs-e-descobrindo-a-arquitetura]] — fecha o volume aprofundando a caça a bugs e a leitura da arquitetura.
- **Base imediata:** [[36-Como-um-projeto-real-e-organizado]], [[37-Anatomia-de-um-projeto-no-GitHub]], [[38-Como-ler-documentacao]] e [[25-Terminal-e-comandos-essenciais]] (busca).
- **Prepara para:** [[06-Como-criar-projetos-enquanto-le]] — praticar entrando em projetos open source reais.
- **Aplicação futura:** Volume 3 (Testes — a rede de segurança; Git avançado — histórico e blame) e Volume 5 (o primeiro emprego, onde isto é o dia a dia).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 11 → **Capítulo 39 de 119**.
