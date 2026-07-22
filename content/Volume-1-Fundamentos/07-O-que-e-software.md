---
title: '7 - O que é software, afinal?'
---

# Capítulo 7 — O que é software, afinal?

> **Volume 1 — Fundamentos e Mentalidade** · Módulo 1 — O que é ser um Engenheiro de Software
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Definir com clareza o que é **software** e diferenciá-lo de **hardware**.
- Distinguir os termos **programa**, **aplicação** e **sistema**.
- Entender por que software é uma construção **diferente de tudo** que a humanidade já fez (é intangível e "mole").
- Reconhecer os grandes **tipos de software** e onde eles aparecem.
- Compreender o que significa software ser feito de **instruções** e **dados**.
- Perceber por que essas características tornam a Engenharia de Software necessária.

---

## ⏱️ Tempo médio de estudo

**30 a 40 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (1/5).**

---

## ✅ Pré-requisitos

- Nenhum técnico. Ideal ter passado pelo **Módulo 0** ([[01-Como-usar-esta-colecao]] a [[06-Como-criar-projetos-enquanto-le]]) para aproveitar melhor o estudo.

---

## 📖 Introdução

Começamos o conteúdo de verdade pela pergunta mais básica de todas — e, curiosamente, uma que muita gente que já programou nunca parou para responder direito: **o que é software?**

Você usa software o dia inteiro. O aplicativo que te acordou, o teclado que aparece na tela do celular, o sistema que processou seu pagamento no ônibus, o site que você abriu, o jogo que você jogou. Tudo isso é software. Mas o que *é* essa coisa? Onde ela está? Por que ela é tão diferente de um carro, de uma ponte ou de uma cadeira?

Entender profundamente o que é software não é filosofia inútil — é a base para tudo o que vem depois. A natureza peculiar do software (o fato de ele ser invisível, "mole" e feito de pura lógica) é *a razão de existir* da Engenharia de Software. Se software fosse fácil de ver e difícil de mudar, como uma ponte, a profissão seria completamente diferente. É porque ele é o oposto — invisível e fácil de mudar — que precisamos de tanto cuidado, método e organização para construí-lo. Este capítulo planta essa semente.

---

## 🧠 Analogia

Pense na diferença entre um **toca-discos** e a **música** que ele toca.

O toca-discos é o objeto físico: você pode tocá-lo, pesá-lo, derrubá-lo. A música é outra coisa — ela não tem peso, você não pode segurá-la, e ainda assim ela é real e faz algo acontecer (te emociona, te faz dançar). A música precisa do toca-discos para existir no mundo, mas ela **não é** o toca-discos. Você pode tocar a mesma música em mil aparelhos diferentes.

No computador é igualzinho. O **hardware** é o toca-discos: as peças físicas — processador, memória, tela, teclado. O **software** é a música: as instruções invisíveis que dizem ao hardware o que fazer. O software precisa do hardware para "tocar", mas não é o hardware. O mesmo programa (como um navegador) roda em milhões de computadores diferentes, do mesmo jeito que a mesma música toca em milhões de aparelhos.

Guarde essa imagem: **hardware é o corpo; software é aquilo que dá vida e comportamento ao corpo.** Um computador sem software é como um toca-discos sem nenhum disco: uma máquina capaz, mas parada, sem nada para fazer.

---

## 🧩 Conceitos fundamentais

### 1. Software vs. hardware

- **Hardware** é a parte **física** do computador: tudo que você pode tocar. Processador, memória, disco, tela, teclado, cabos. Vem de "hard" (duro).
- **Software** é a parte **lógica**: as instruções que dizem ao hardware o que fazer. É intangível — você não pode tocá-lo. Vem de "soft" (mole).

> **Termo explicado — hardware:** as partes físicas e tocáveis de um computador ou dispositivo (processador, memória, tela etc.).

> **Termo explicado — software:** o conjunto de instruções e dados, invisíveis e intangíveis, que dizem ao hardware o que fazer. É o "programa" no sentido amplo.

Uma forma de lembrar: se você chutar e dói no pé, é hardware. Se você xingar e ele não muda, provavelmente é software (brincadeira — mas ajuda a fixar a diferença entre o físico e o lógico).

### 2. Software é feito de duas coisas: instruções e dados

Todo software se resume a duas ingredientes:

- **Instruções** (também chamadas de *código* ou *lógica*): a sequência de passos que dizem ao computador o que fazer. "Se o usuário clicar aqui, mostre aquilo." "Some estes dois números." "Guarde este nome."
- **Dados**: as informações que o software manipula. Seu nome, o preço de um produto, a foto que você postou, a mensagem que você enviou.

Um programa é, no fundo, **instruções operando sobre dados**. Uma calculadora são instruções (somar, subtrair) operando sobre dados (os números que você digita). Um app de delivery são instruções (montar pedido, calcular total) operando sobre dados (pratos, preços, endereços).

### 3. Programa, aplicação e sistema

Esses três termos aparecem o tempo todo e têm diferenças úteis:

- **Programa:** o termo mais geral. Qualquer conjunto de instruções que o computador executa. Uma calculadora simples é um programa.
- **Aplicação (ou "app"):** um programa feito para o usuário final realizar uma tarefa. WhatsApp, Excel, um jogo. "Aplicação" enfatiza o *uso* por uma pessoa.
- **Sistema (ou sistema de software):** um conjunto de vários programas e partes que trabalham juntos para entregar algo maior. A SaborExpress não é "um programa" — é um *sistema*: tem o app do cliente, o painel do restaurante, o servidor que processa pedidos, o banco de dados, a integração com pagamento. Vários programas conversando.

> **Termo explicado — sistema de software:** um conjunto de programas e componentes que funcionam juntos para cumprir um objetivo maior do que qualquer parte isolada faria.

A distinção importa porque Engenharia de Software trata principalmente de **sistemas** — coisas grandes, feitas de muitas partes, construídas por muitas pessoas. Um programa você faz sozinho numa tarde; um sistema exige a profissão inteira que esta coleção ensina.

### 4. Os grandes tipos de software

Software não é tudo igual. Os grandes grupos:

- **Software de sistema:** o que faz o computador funcionar por baixo. O principal exemplo é o **sistema operacional** (Windows, Linux, Android, iOS), que você estudará no Volume 2. Ele é a base sobre a qual tudo roda.
- **Software aplicativo:** o que você usa para fazer tarefas. Navegadores, editores de texto, jogos, apps de banco, a SaborExpress.
- **Software embarcado:** o que roda dentro de aparelhos que não parecem "computadores": a geladeira inteligente, o carro, o micro-ondas, a máquina de cartão. Está em toda parte.
- **Software de desenvolvimento:** ferramentas que os próprios engenheiros usam para criar outros softwares (editores de código, compiladores). Software para fazer software.

### 5. As características que tornam o software único

Aqui está o coração do capítulo. Software tem propriedades que **nenhuma outra coisa construída** tem, e elas explicam tudo o que vem depois:

- **É intangível (invisível).** Você não vê nem toca o software. Isso torna difícil "enxergar" o progresso, medir a qualidade e perceber a complexidade. Uma ponte pela metade é obviamente uma ponte pela metade; um software pela metade pode parecer pronto por fora e estar quebrado por dentro.
- **É maleável ("mole").** Software é fácil de mudar — muito mais fácil que mudar uma ponte de concreto. Isso é uma bênção (dá para corrigir e evoluir rápido) e uma maldição (a facilidade de mudar convida à bagunça e ao acúmulo de problemas).
- **Não "gasta" com o uso, mas "apodrece" com o tempo.** Um parafuso enferruja; o software não sofre desgaste físico. Mas ele "apodrece" de outra forma: o mundo muda ao redor dele (novos aparelhos, novas regras, novas necessidades), e um software que não é atualizado vai ficando quebrado e obsoleto. Isso tem nome: *degradação de software*.
- **É pura complexidade lógica.** Um sistema grande pode ter milhões de instruções interligadas. Nenhuma mente humana segura tudo isso de uma vez. Gerenciar essa complexidade é o desafio central da profissão.
- **Copiar custa quase zero.** Fazer o primeiro software custa caro (todo o trabalho de construção); fazer a cópia número um milhão custa praticamente nada. Isso muda toda a economia do setor (você verá no Cap. 105).

> **Termo explicado — degradação de software (software rot):** a tendência de um software ir "apodrecendo" com o tempo — não por desgaste físico, mas porque o mundo ao redor muda e o software, se não é mantido, fica cada vez mais quebrado e desatualizado.

---

## ⚙️ Como funciona na prática

Vamos ver o software "ganhando vida" num exemplo do dia a dia. Quando você abre um aplicativo de mensagens e envia um "oi":

```
Você toca na tela (hardware capta o toque)
        ↓
O software do teclado transforma o toque em letras (instruções + dados)
        ↓
O app monta a mensagem "oi" (dados) e as instruções de "enviar"
        ↓
O software pede ao sistema operacional para usar a internet (hardware de rede)
        ↓
A mensagem viaja até o servidor (outro software, em outro computador)
        ↓
O servidor guarda a mensagem (dados) e a envia ao destinatário
        ↓
O app do seu amigo recebe os dados e as instruções mostram "oi" na tela dele
```

Repare em três coisas nesse fluxo. Primeiro, **software e hardware dançam juntos**: as instruções (software) o tempo todo pedem ao físico (hardware) para captar toques, mostrar telas, usar a internet. Segundo, há **vários softwares diferentes** cooperando: o teclado, o app, o sistema operacional, o servidor. Isso é um *sistema*. Terceiro, tudo isso — que parece instantâneo e mágico — é apenas **instruções operando sobre dados**, milhões de vezes por segundo.

Entender que "não há mágica, há instruções e dados" é uma virada de chave. Tudo o que um software faz, por mais impressionante, é redutível a passos lógicos que alguém escreveu. E se alguém escreveu, você também pode aprender a escrever. É disso que trata a profissão.

---

## 🍔 Aplicação na SaborExpress

Vamos usar a SaborExpress para tornar concreta a diferença entre programa, aplicação e sistema.

Quando a **Ana** imagina a SaborExpress, ela pensa "um aplicativo de delivery". Mas, tecnicamente, a SaborExpress não é *um* aplicativo — é um **sistema** composto de várias partes de software que conversam entre si:

- O **app do cliente** (onde a pessoa escolhe a comida e faz o pedido) — uma *aplicação*.
- O **app do entregador** (que mostra a rota e os pedidos a entregar) — outra *aplicação*.
- O **painel do restaurante** (onde o dono vê os pedidos chegando) — outra *aplicação*.
- O **servidor** (o cérebro que recebe pedidos, calcula valores, coordena tudo) — vários *programas* rodando.
- O **banco de dados** (onde ficam guardados os pratos, os pedidos, os usuários) — os *dados* do sistema.
- As **integrações** com pagamento e mapas — softwares de *terceiros* que a SaborExpress usa.

Todas essas peças de software juntas, cooperando, formam **o sistema SaborExpress**. E cada uma é feita de instruções (a lógica de cada tela e cada cálculo) operando sobre dados (os pratos, os preços, os endereços).

Agora conecte com as características do software: a SaborExpress é **intangível** (não existe um "objeto SaborExpress"), é **maleável** (a Ana pode pedir para mudar a cor de um botão hoje e estará mudado amanhã), e vai **"apodrecer"** se ninguém a mantiver (quando surgir um celular novo, uma regra nova de pagamento, ela precisará ser atualizada). É justamente porque a SaborExpress tem essas características que ela precisa de *engenharia* — e não de alguém apenas "programando à toa". É para lá que vamos no próximo capítulo.

---

## 🏢 Como isso acontece em uma empresa

- **Ninguém constrói "um programa"; constroem sistemas.** No mercado, você quase nunca trabalha num programinha isolado. Você trabalha numa *parte* de um sistema grande — talvez só na tela de login, ou só no cálculo de frete. Entender que você é uma peça de um sistema maior é essencial para não se sentir perdido.
- **A intangibilidade gera desafios reais de gestão.** Como o progresso é invisível, empresas inventaram formas de *torná-lo visível*: quadros de tarefas, métricas, reuniões (você verá tudo isso nos módulos de metodologias). Muito do "processo" existe justamente para compensar o fato de não dá para "ver" o software crescendo como se vê um prédio.
- **A maleabilidade é usada como vantagem competitiva.** Empresas de software mudam seus produtos o tempo todo — testam, ajustam, corrigem em horas. Isso seria impensável na indústria física. É por isso que o software "comeu o mundo": ele se adapta numa velocidade que nenhuma fábrica de objetos consegue.
- **A degradação é combatida ativamente.** Times gastam esforço contínuo em *manutenção*: atualizar, corrigir, modernizar. Um mito comum de quem está começando é achar que "software fica pronto". Software nunca fica pronto — ele é mantido enquanto for usado.

---

## ⚠️ Erros comuns

- **Confundir software com hardware.** O programa não é a máquina. O mesmo software roda em máquinas diferentes; o mesmo hardware roda softwares diferentes.
- **Achar que "software" é só o que aparece na tela.** A tela é a ponta visível. Boa parte do software (servidores, sistemas operacionais, o "por baixo") você nunca vê, mas é o que sustenta tudo.
- **Tratar todo software como "um programa".** Sistemas reais são conjuntos de muitas partes. Pensar em "programa único" faz você subestimar a complexidade.
- **Achar que software "fica pronto" e acabou.** Software é mantido enquanto vive. Ignorar isso leva a produtos que "apodrecem" e morrem.
- **Subestimar o software por ele ser invisível.** Justamente por não se ver a complexidade, é fácil achar que "é só fazer". Essa ilusão é a origem de muitos projetos fracassados.

---

## 💡 Dicas profissionais

- **Ao olhar qualquer app, pergunte "quais são as partes deste sistema?".** Treinar esse olhar de "isto é um sistema com várias peças" te prepara para pensar como engenheiro.
- **Sempre separe, mentalmente, instruções de dados.** Diante de qualquer funcionalidade, pergunte "qual é a lógica (instruções) e quais são as informações (dados) aqui?". É uma das divisões mais úteis da profissão.
- **Lembre que não há mágica.** Quando um software faz algo impressionante, resista ao "como isso é possível?" e troque por "quais passos lógicos alguém escreveu para isso acontecer?". Desmistificar é o primeiro passo para construir.
- **Respeite a manutenção.** Muito do trabalho real é manter software vivo, não criar do zero. Encare manutenção como parte nobre da profissão, não como tarefa menor.

---

## 🎈 Curiosidades

- A palavra **"software"** surgiu por contraste com "hardware", nos anos 1950. O matemático John Tukey é frequentemente creditado por popularizá-la em 1958.
- O primeiro programa de computador da história costuma ser atribuído a **Ada Lovelace**, no século XIX — ela escreveu instruções para uma máquina (a Máquina Analítica de Charles Babbage) que sequer chegou a ser construída em vida. Software antes mesmo de existir hardware para rodá-lo.
- A frase **"software is eating the world"** ("o software está comendo o mundo"), do investidor Marc Andreessen em 2011, capturou a ideia de que empresas de software estavam dominando setor após setor — de táxi (apps de corrida) a hotelaria (apps de hospedagem) — justamente por causa da maleabilidade e do custo de cópia quase zero.
- Um **bug** (defeito de software) já foi literalmente um inseto: em 1947, uma mariposa presa num computador causou uma falha, e a expressão "debugar" (tirar o bug) pegou. Você verá bugs em detalhe no módulo de testes.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Hardware** | As partes físicas e tocáveis de um computador (processador, memória, tela). |
| **Software** | As instruções e dados invisíveis que dizem ao hardware o que fazer. |
| **Instruções (código/lógica)** | A sequência de passos que o computador executa. |
| **Dados** | As informações que o software manipula (nomes, preços, fotos, mensagens). |
| **Programa** | Termo geral para qualquer conjunto de instruções que o computador executa. |
| **Aplicação (app)** | Programa feito para o usuário final realizar uma tarefa. |
| **Sistema de software** | Conjunto de vários programas e partes que trabalham juntos para um objetivo maior. |
| **Software de sistema** | Software que faz o computador funcionar por baixo (ex.: sistema operacional). |
| **Software embarcado** | Software que roda dentro de aparelhos (carro, geladeira, máquina de cartão). |
| **Degradação de software (software rot)** | Tendência do software "apodrecer" com o tempo se não for mantido. |
| **Bug** | Um defeito ou erro no software. |

---

## 📝 Resumo

- **Software** é a parte lógica e intangível (instruções + dados) que diz ao **hardware** (a parte física) o que fazer. Hardware é o corpo; software é o comportamento.
- Todo software é, no fundo, **instruções operando sobre dados** — não há mágica, há passos lógicos que alguém escreveu.
- **Programa** é o termo geral; **aplicação** é o programa para o usuário final; **sistema** é o conjunto de várias partes cooperando (como a SaborExpress).
- Existem tipos: software de **sistema**, **aplicativo**, **embarcado** e de **desenvolvimento**.
- Software é único por ser **intangível**, **maleável**, **não desgastar mas "apodrecer"**, ser **pura complexidade lógica** e ter **custo de cópia quase zero**.
- Essas características são exatamente o que torna a **Engenharia de Software** necessária — tema do próximo capítulo.

---

## ☑️ Checklist de aprendizado

- [ ] Sei explicar a diferença entre hardware e software com uma analogia própria.
- [ ] Entendo que software é feito de instruções e dados.
- [ ] Diferencio programa, aplicação e sistema, com exemplos.
- [ ] Conheço os grandes tipos de software (sistema, aplicativo, embarcado, desenvolvimento).
- [ ] Sei citar e explicar as características que tornam o software único.
- [ ] Entendo por que essas características levam à necessidade de engenharia.

---

## ✏️ Exercícios

**1.** Com uma analogia própria (não a do toca-discos), explique a diferença entre hardware e software.

**2.** Diferencie programa, aplicação e sistema. Classifique cada um destes: uma calculadora simples, o WhatsApp, a SaborExpress.

**3.** Escolha um aplicativo que você usa e identifique nele **instruções** (uma lógica) e **dados** (uma informação manipulada).

**4.** Explique o que é "degradação de software" e por que ela contraria a ideia de que "software fica pronto".

**5. (Reflexão)** Das características que tornam o software único (intangível, maleável, degradação, complexidade, custo de cópia), qual você acha que mais dificulta a construção de sistemas? Justifique.

---

## 💬 Respostas comentadas

**1.** Resposta pessoal. Uma boa analogia separa o *físico/duradouro* do *lógico/comportamental*. Exemplos válidos: livro (hardware = papel e capa; software = a história escrita); instrumento musical (hardware = o violão; software = a música tocada); receita e cozinha. O essencial é mostrar que o software precisa do hardware para "acontecer", mas não é o hardware, e que o mesmo software roda em hardwares diferentes.

**2.** Programa é o termo geral (qualquer conjunto de instruções executáveis); aplicação é um programa para o usuário final fazer uma tarefa; sistema é um conjunto de várias partes cooperando. Classificação: a calculadora simples é um **programa/aplicação** simples; o WhatsApp é uma **aplicação** (parte de um sistema maior nos bastidores); a SaborExpress é um **sistema** (app do cliente, do entregador, painel, servidor, banco, integrações).

**3.** Resposta pessoal. Exemplo com um app de banco: uma **instrução** = "se o saldo for menor que o valor da transferência, recuse"; um **dado** = o valor do seu saldo. O importante é separar corretamente a *lógica* (o que decide/faz) da *informação* (o que é manipulado).

**4.** Degradação de software é a tendência de um software "apodrecer" com o tempo — não por desgaste físico, mas porque o mundo ao redor muda (novos aparelhos, novas regras, novas necessidades) e um software não mantido vai ficando quebrado e obsoleto. Isso contraria "software fica pronto" porque mostra que, mesmo sem ninguém tocá-lo, ele piora em relação a um mundo que continua mudando; por isso ele precisa de manutenção contínua enquanto for usado.

**5.** Resposta aberta. Argumentos fortes: a **intangibilidade** (não se vê a complexidade nem o progresso, o que engana e dificulta a gestão) ou a **complexidade lógica** (nenhuma mente segura milhões de instruções interligadas). Também é válido citar a **maleabilidade** como faca de dois gumes (facilita mudar, mas convida à bagunça). O que importa é justificar com clareza, ligando a característica a uma dificuldade concreta de construir sistemas.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[08-O-que-e-engenharia-de-software]] — por que construir software exige *engenharia*, e não apenas programar.
- **Base de estudo:** [[06-Como-criar-projetos-enquanto-le]] — construir seus próprios "programas" para sentir esses conceitos na prática.
- **Aplicação futura:** Capítulo 105 — *Modelos de negócio* (Volume 5) — como o "custo de cópia quase zero" molda a economia do software.
- **Aplicação futura:** Volume 2 inteiro — como o hardware e o sistema operacional realmente executam o software.

---

> 🧭 **Você está aqui:** Volume 1 → Módulo 1 → **Capítulo 7 de 119**.
