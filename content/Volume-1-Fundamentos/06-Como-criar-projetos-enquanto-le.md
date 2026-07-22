# Capítulo 6 — Como criar projetos enquanto lê

> **Volume 1 — Fundamentos e Mentalidade** · Módulo 0 — Mentalidade e método de estudo
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender por que **construir projetos** é o que separa quem "sabe sobre" software de quem "sabe fazer" software.
- Diferenciar **projeto de aprendizado** de projeto de portfólio, e para que serve cada um.
- Escolher projetos do **tamanho certo** para não desistir no meio.
- Transformar o que você lê em cada módulo em **algo construído**.
- Começar a montar, desde já, um **portfólio no GitHub** que fala por você numa entrevista.
- Evitar as armadilhas clássicas de quem tenta fazer projetos (grande demais, ambicioso demais, sem terminar).

---

## ⏱️ Tempo médio de estudo

**30 a 40 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (1/5).**

---

## ✅ Pré-requisitos

- [[05-Como-tirar-o-maximo-dos-exercicios]] — a lógica de "aprender fazendo", que os projetos levam ao nível seguinte.
- [[03-Como-aprender-tecnologia]] — a ideia do "projeto mínimo" como forma de aprender.

---

## 📖 Introdução

Se os exercícios são o treino, os **projetos** são os jogos amistosos: mais próximos ainda da realidade, porque juntam vários conceitos numa coisa só que precisa *funcionar de verdade*. E aqui está uma verdade um pouco dura, mas libertadora: **ninguém aprende a construir software sem construir software.** Você pode ler os 119 capítulos desta coleção, entender cada um, e ainda assim travar na primeira vez que precisar fazer um sistema do zero — se nunca tiver feito um.

A boa notícia é que construir projetos, quando bem dosado, é a parte mais divertida e mais recompensadora do aprendizado. É onde as peças soltas de repente se encaixam e você pensa "ahh, *é assim* que tudo se conecta". É também onde nasce o seu **portfólio** — a coleção de coisas que você construiu e que, numa entrevista, vale mais do que qualquer certificado. Um recrutador que vê três projetos seus funcionando no GitHub aprende mais sobre você em cinco minutos do que em um currículo inteiro.

Este capítulo fecha o Módulo 0 (Mentalidade) com a ponte para a ação: como transformar leitura em construção, desde já, sem esperar "estar pronto" — porque você nunca vai se sentir totalmente pronto, e tudo bem.

---

## 🧠 Analogia

Aprender só lendo, sem construir, é como estudar marcenaria **sem nunca tocar na madeira**.

Você pode ler todos os livros sobre tipos de madeira, ferramentas, encaixes e acabamentos. Pode saber a diferença entre uma serra e outra de cor. Mas no dia em que pegar as ferramentas para fazer uma simples caixa, vai descobrir mil coisas que os livros não contaram: a madeira lasca, o encaixe não fecha, o prego entorta, a medida saiu torta. **Esses problemas só aparecem quando a mão encosta na madeira** — e é resolvendo eles que você vira marceneiro.

Software é idêntico. A teoria te dá o vocabulário e os princípios. Mas mil detalhes práticos — o erro estranho, a peça que não conecta, o "por que isso não funciona se está certo?" — só aparecem quando você constrói. E cada um desses problemas resolvidos é um pedaço de experiência real que nenhuma leitura entrega.

Por isso: leia, sim. Mas encoste na madeira o quanto antes. A primeira caixa vai sair torta. A décima vai sair boa. Você só chega à décima construindo as nove primeiras.

---

## 🧩 Conceitos fundamentais

### 1. Por que projetos ensinam o que exercícios não ensinam

Exercícios são focados: treinam um conceito por vez, num ambiente controlado. Projetos são **integrados**: obrigam você a juntar vários conceitos e a lidar com o caos de fazer algo funcionar de ponta a ponta. Um projeto ensina coisas que só aparecem na integração:

- Como as peças **se conectam** (o banco fala com a API, que fala com a tela).
- Como **decidir** entre várias formas de fazer a mesma coisa.
- Como **debugar** quando nada funciona e você não sabe onde está o erro.
- Como **terminar** algo — habilidade rara e valiosíssima.

### 2. Projeto de aprendizado vs. projeto de portfólio

- **Projeto de aprendizado:** feito para *você* entender um conceito. Pode ser feio, incompleto, jogado fora depois. O valor está no processo, não no resultado. Exemplo: um mini-programa que só testa "como funciona uma API".
- **Projeto de portfólio:** feito para *mostrar* aos outros. Precisa funcionar, ter um mínimo de acabamento e um `README` que explique o que é. Exemplo: uma versão simplificada da SaborExpress, publicada no seu GitHub.

Você precisa dos dois. Os de aprendizado são muitos e rápidos; os de portfólio são poucos e caprichados. Comece pelos de aprendizado — eles te dão a base para os de portfólio saírem bem.

> **Termo explicado — portfólio:** o conjunto de projetos que você construiu e pode mostrar. Na área de software, geralmente fica no GitHub e serve como prova concreta do que você sabe fazer. (Detalhado no Cap. 110.)

### 3. O tamanho certo de um projeto

O erro número um do iniciante é começar grande demais: "vou fazer uma rede social completa!". Três semanas depois, o projeto está abandonado, e a sensação de fracasso desanima. O segredo é o **escopo pequeno e terminável**.

Uma regra prática: seu projeto deve ser pequeno o suficiente para você **terminar uma primeira versão em poucos dias**. Terminar algo pequeno ensina — e motiva — muito mais do que abandonar algo grande. Depois de terminar, você *incrementa*: adiciona um recurso de cada vez. Assim o projeto cresce sem nunca virar um monstro que te paralisa.

```
❌ Caminho que desanima:          ✅ Caminho que funciona:
"Vou fazer o iFood completo"       "Vou fazer uma lista de pratos"
        ↓                                  ↓ (terminou! 🎉)
   3 semanas travado                 "Agora adiciono um carrinho"
        ↓                                  ↓ (terminou! 🎉)
     abandono                        "Agora adiciono o total do pedido"
                                           ↓
                                     projeto real, crescendo, terminado
```

### 4. O conceito de MVP aplicado ao seu aprendizado

No mundo do produto existe a ideia de **MVP** (Produto Mínimo Viável): a menor versão de algo que já entrega valor e pode ser usada. Você vai estudar isso a fundo no Cap. 49, mas o conceito serve para os seus projetos desde já.

> **Termo explicado — MVP (Minimum Viable Product / Produto Mínimo Viável):** a versão mais simples de um produto que já funciona e resolve o problema principal, feita para validar a ideia rápido antes de investir em recursos extras.

Aplicado ao seu projeto: qual é a **menor versão que já funciona**? Para uma "SaborExpress de aprendizado", o MVP não tem pagamento, nem mapa, nem avaliações. Tem só: listar pratos e montar um pedido com o total. Isso já é um projeto completo e terminável. O resto são incrementos.

### 5. Construir em público

Publicar seus projetos e anotações abertamente (no GitHub, num blog) tem um efeito poderoso: o simples fato de *outros poderem ver* te força a entender melhor e a caprichar. Além disso, constrói sua presença profissional ao longo do tempo, sem esforço extra — cada projeto de aprendizado que você publica vira um tijolinho do seu portfólio futuro.

---

## ⚙️ Como funciona na prática

Como transformar **cada módulo** da coleção em algo construído:

**A ideia central:** ao terminar um assunto que dá para praticar, faça um pequeno projeto que o use. Você não precisa fazer isso em *todo* capítulo — muitos do Volume 1 e 2 são conceituais. Mas a partir do Volume 3 (Desenvolvimento), quase todo módulo pede um projetinho.

Um roteiro genérico para qualquer projeto de aprendizado:

```
1. ESCOLHA um escopo minúsculo (terminável em poucos dias)
        ↓
2. DEFINA o MVP: a menor versão que já funciona
        ↓
3. CONSTRUA o MVP — feio e simples está ótimo
        ↓
4. FAÇA funcionar de ponta a ponta antes de melhorar qualquer coisa
        ↓
5. PUBLIQUE no GitHub com um README curto (o que é, como rodar)
        ↓
6. INCREMENTE um recurso por vez, terminando cada um
```

E uma sugestão que amarra a coleção inteira: **use a SaborExpress como seu projeto-fio-condutor.** À medida que você avança pelos volumes, vá construindo a sua própria versão simplificada dela. No Volume 3, você monta o banco de dados dos pratos; nas APIs, cria as rotas de pedido; no front-end, faz a tela. Ao chegar no Volume 5 (Projeto Integrador), você terá construído, pouco a pouco, um sistema completo — e um projeto de portfólio de verdade, sem nunca ter feito um esforço gigante de uma vez.

Não sabe programar ainda? **Perfeito** — é para isso que serve a coleção. Nos primeiros volumes, seus "projetos" podem ser não-código: um diagrama de como um sistema funciona, um documento de requisitos da sua SaborExpress, um mapa das telas. Construir não é só codar; é *produzir algo concreto* a partir do que aprendeu.

---

## 🍔 Aplicação na SaborExpress

Vamos tornar isso muito concreto. Suponha que você acabou de estudar, lá no Volume 3, o que é um banco de dados. Em vez de só "entender", você constrói:

- **Projeto de aprendizado (dia 1):** você cria uma tabelinha de `pratos` com nome e preço, e insere cinco pratos. Feio, no terminal, sem interface. Mas você *fez* — e agora entende banco de dados de um jeito que nenhuma leitura daria.
- **Incremento (dia 2):** adiciona uma tabela de `pedidos` que se liga aos pratos.
- **Incremento (dia 3):** escreve uma consulta que soma o total de um pedido.

Repare o que aconteceu: sem perceber, você construiu o coração de dados da SaborExpress, um pedacinho por vez, cada um terminável e recompensador. Quando chegar ao Volume 5, esse banco já existe e é só conectar à API e à tela. O "projeto gigante" nunca existiu — você o construiu em fatias pequenas ao longo de meses.

E o melhor: cada fatia foi para o seu GitHub. No fim, você não tem só conhecimento; tem um **projeto real, público, que prova o conhecimento** — a diferença entre dizer "eu sei banco de dados" e mostrar "eu construí isto".

---

## 🏢 Como isso acontece em uma empresa

- **Portfólio abre portas.** Para vagas de início de carreira (estágio, júnior), um GitHub com projetos que funcionam frequentemente pesa mais que a nota da faculdade. É prova concreta de que você faz, não só sabe.
- **O trabalho é uma sequência de projetos incrementais.** Nenhuma empresa constrói o sistema inteiro de uma vez. Elas fazem o MVP, colocam no ar, e incrementam — exatamente o método deste capítulo, em escala profissional. Quem já pratica isso nos estudos chega adaptado.
- **"Terminar" é uma habilidade valorizada.** Muita gente começa muita coisa e termina pouca. O profissional que *entrega* — que leva algo até o fim, funcionando — é raro e valioso. Você treina isso terminando seus projetinhos.
- **Projetos revelam maturidade.** Um recrutador experiente olha seu projeto e vê muito além do código: se tem `README`, se está organizado, se os *commits* (as gravações no histórico) contam uma história. Tudo isso você começa a construir agora.

---

## ⚠️ Erros comuns

- **Começar grande demais.** "Vou fazer o iFood completo" é a receita do abandono. Comece minúsculo e incremente.
- **Nunca terminar nada.** Dez projetos pela metade valem menos que um pequeno terminado. Termine o MVP antes de sonhar com recursos.
- **Esperar "estar pronto" para começar.** Você nunca vai se sentir totalmente pronto. Comece com o que sabe hoje; aprenda o resto no caminho.
- **Buscar perfeição na primeira versão.** A primeira caixa sai torta. Faça funcionar primeiro, embeleze depois.
- **Só copiar tutoriais passo a passo.** Seguir um tutorial sem desviar é quase leitura passiva. Modifique, quebre, adapte — aí vira projeto seu.
- **Não publicar.** Um projeto no seu computador não constрói portfólio. Publique no GitHub, mesmo que imperfeito.
- **Copiar sem entender (inclusive da IA).** Um projeto que você não sabe explicar não conta como seu numa entrevista.

---

## 💡 Dicas profissionais

- **Mantenha uma lista de "ideias de projeto".** Anote toda ideia que surgir. Quando terminar um projeto, pegue a próxima da lista — nunca fica sem o que fazer.
- **Escreva o `README` primeiro (ou cedo).** Descrever o que o projeto *vai* fazer ajuda a definir o escopo e a não sair do foco.
- **Faça o "esqueleto que funciona" antes dos detalhes.** Uma versão que faz o mínimo de ponta a ponta é melhor que metade do projeto perfeita e a outra metade inexistente.
- **Reserve projetos para consolidar cada volume.** Ao fechar um volume grande, faça um projeto que junte o que aprendeu. É a melhor revisão possível.
- **Documente o que aprendeu no processo.** Um parágrafo no `README` do tipo "o que foi difícil e como resolvi" mostra maturidade e ajuda o você do futuro.
- **Não se compare com projetos de gente sênior.** Você vê o resultado polido de anos. Compare seu projeto de hoje com o que você conseguiria fazer mês passado.

---

## 🎈 Curiosidades

- Muitos engenheiros conseguiram o primeiro emprego **por causa de um projeto pessoal**, não da formação. Um projeto que resolve um problema real (mesmo pequeno) chama muita atenção de quem contrata.
- A prática de lançar uma versão mínima e ir incrementando tem nome no mundo das startups: **"lançar cedo, lançar sempre"** (*release early, release often*), uma ideia popularizada na cultura do software livre.
- O GitHub mostra um "gráfico de contribuições" — um calendário que fica verde nos dias em que você publica algo. Muita gente usa isso como motivação para construir um pouquinho todo dia. Não é obrigatório (nem deve virar obsessão), mas ilustra o poder da constância aplicada a projetos.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Projeto de aprendizado** | Projeto feito para você entender um conceito; pode ser feio e descartável. |
| **Projeto de portfólio** | Projeto feito para mostrar aos outros; precisa funcionar e ter acabamento. |
| **Portfólio** | Conjunto de projetos que você construiu e pode mostrar (geralmente no GitHub). |
| **MVP (Produto Mínimo Viável)** | A menor versão de um produto que já funciona e resolve o problema principal. |
| **Escopo** | O conjunto do que um projeto vai (e não vai) fazer. Escopo pequeno = terminável. |
| **Incremento** | Um pedaço novo adicionado a um projeto que já funciona. |
| **README** | Arquivo que explica o que o projeto é e como usá-lo. |
| **Commit** | Uma gravação de uma mudança no histórico do projeto (você verá no módulo de Git). |
| **Construir em público** | Publicar abertamente seus projetos e aprendizados. |

---

## 📝 Resumo

- **Ninguém aprende a construir software sem construir software.** Projetos são o jogo amistoso: juntam vários conceitos em algo que precisa funcionar.
- Projetos ensinam o que exercícios não ensinam: **integração, decisão, depuração e terminar**.
- Há **projetos de aprendizado** (rápidos, feios, para entender) e **de portfólio** (poucos, caprichados, para mostrar). Você precisa dos dois.
- Comece com **escopo minúsculo e terminável**; defina o **MVP** (menor versão que funciona) e **incremente** um recurso por vez.
- Use a **SaborExpress como projeto-fio-condutor**, construída em fatias pequenas ao longo dos volumes.
- **Publique no GitHub** desde já: cada projetinho vira um tijolo do seu portfólio, que numa entrevista vale mais que certificado.
- Os maiores erros são **começar grande demais e nunca terminar**. Termine pequeno, cresça aos poucos.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo por que projetos ensinam o que a leitura e os exercícios sozinhos não ensinam.
- [ ] Sei diferenciar projeto de aprendizado de projeto de portfólio.
- [ ] Sei escolher um escopo pequeno e terminável e definir um MVP.
- [ ] Tenho um plano de usar a SaborExpress como projeto-fio-condutor ao longo da coleção.
- [ ] Entendo o valor de publicar no GitHub e construir em público.
- [ ] Reconheço os erros de "começar grande" e "nunca terminar" e sei como evitá-los.

---

## ✏️ Exercícios

**1.** Com a analogia da marcenaria, explique por que ler sobre software sem construir deixa buracos que só a prática tampa.

**2.** Diferencie projeto de aprendizado de projeto de portfólio. Dê um exemplo de cada usando a SaborExpress.

**3.** Um iniciante anuncia: "Vou construir uma rede social completa como primeiro projeto." Que conselho deste capítulo você daria, e por quê? Descreva um MVP possível para reduzir o escopo.

**4.** Explique a estratégia de "fazer o MVP e incrementar" e por que ela evita o abandono de projetos.

**5. (Prática)** Defina, em três linhas, o MVP de um projeto de aprendizado que você poderia começar esta semana com o que já sabe (pode ser não-código: um diagrama, um documento). Qual é a menor versão que já "funciona"?

---

## 💬 Respostas comentadas

**1.** Porque, como na marcenaria, mil problemas práticos só aparecem quando a mão encosta na madeira: o encaixe que não fecha, o erro estranho, a peça que não conecta. A leitura dá o vocabulário e os princípios, mas não a experiência de resolver esses problemas concretos — e é resolvê-los que transforma conhecimento em habilidade. Cada problema prático superado é um pedaço de experiência que nenhuma leitura entrega.

**2.** Projeto de aprendizado é feito para *você* entender algo; pode ser feio e descartável (ex.: uma tabelinha de pratos no terminal só para entender banco de dados). Projeto de portfólio é feito para *mostrar*; precisa funcionar e ter acabamento (ex.: uma versão simplificada da SaborExpress publicada no GitHub, com README e telas). O primeiro dá base para o segundo sair bem.

**3.** Conselho: reduzir drasticamente o escopo, porque projetos grandes demais quase sempre são abandonados, gerando desânimo. Melhor um projeto minúsculo e terminável, que se incrementa depois. Um MVP possível: em vez de "rede social completa", começar com "uma página que lista postagens de texto e permite adicionar uma nova". Isso já funciona de ponta a ponta e pode crescer (curtidas, comentários, perfis) um recurso por vez.

**4.** A estratégia é construir primeiro a menor versão que já funciona (MVP) e depois adicionar um recurso de cada vez, terminando cada incremento. Ela evita o abandono porque você sempre tem *algo que funciona* e uma sensação de progresso constante, em vez de ficar semanas com um projeto grande e quebrado que nunca "fica pronto". Terminar fatias pequenas motiva; encarar um monstro paralisa.

**5.** Resposta pessoal/aberta. O objetivo é praticar a definição de escopo mínimo. Uma boa resposta escolhe algo genuinamente pequeno e "terminável", e identifica com clareza a menor versão que já entrega algo (ex.: "um documento de 1 página descrevendo os requisitos da minha SaborExpress: quem usa e o que faz"). Se dá para terminar em poucos dias com o que você já sabe, o escopo está certo.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[07-O-que-e-software]] — começa o Módulo 1; agora que você sabe *como* estudar e construir, vamos ao *o que é* software.
- **Base:** [[05-Como-tirar-o-maximo-dos-exercicios]] e [[03-Como-aprender-tecnologia]] — a mentalidade de aprender fazendo.
- **Aplicação futura:** Capítulo 49 — *MVP, priorização e validação* (Volume 3) — o MVP no contexto de produto.
- **Aplicação futura:** Capítulo 110 — *Currículo, LinkedIn, portfólio e GitHub* (Volume 5) — como seus projetos viram portfólio profissional.
- **Fecho do fio condutor:** Módulo 36 — *Projeto Integrador* (Volume 5) — onde a SaborExpress que você foi construindo se completa.

---

> 🧭 **Você está aqui:** Volume 1 → Módulo 0 → **Capítulo 6 de 119**.
> 🎉 Fim do **Módulo 0 — Mentalidade**. Você agora sabe *como* estudar, *como* aprender, *como* usar IA, *como* praticar e *como* construir. A partir do próximo capítulo, começamos o conteúdo de verdade — com a base mais sólida possível.
