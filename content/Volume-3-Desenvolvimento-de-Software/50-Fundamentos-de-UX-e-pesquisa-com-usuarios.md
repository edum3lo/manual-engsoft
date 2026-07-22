# Capítulo 50 — Fundamentos de UX e pesquisa com usuários

> **Volume 3 — Desenvolvimento de Software** · Módulo 14 — UX e Design de Produto
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é **UX (experiência do usuário)** e como ela difere de **UI (interface)**.
- Reconhecer os elementos que compõem uma boa experiência (útil, usável, desejável, acessível, encontrável, confiável, valioso).
- Conhecer os métodos de **pesquisa com usuários** (qualitativa vs. quantitativa; o que as pessoas dizem vs. o que fazem).
- Compreender o que é um **teste de usabilidade** e por que 5 usuários já revelam a maioria dos problemas.
- Perceber por que **UX é responsabilidade de todo o time** — inclusive do dev.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[47-Elicitacao-personas-e-jornada-do-usuario]] — personas e jornadas são ferramentas de UX também.
- Nenhum conhecimento de design gráfico é necessário.

---

## 📖 Introdução

Você já usou um app que fazia tudo o que prometia, mas era uma tortura de usar? E um outro, simples, que parecia "ler sua mente"? A diferença entre os dois tem um nome: **UX — User Experience**, a experiência do usuário. É a soma de tudo que uma pessoa **sente e vive** ao interagir com um produto — não só as telas, mas a facilidade, a clareza, a confiança, a frustração ou o prazer.

Há um mal-entendido gigante, inclusive entre desenvolvedores: achar que UX é "deixar a tela bonita". Não é. **Bonito é UI (interface); a experiência é UX.** Um app pode ser lindo e ter uma UX péssima (você não acha o botão que precisa), e um app visualmente simples pode ter uma UX excelente (tudo está onde você espera). UX é sobre **como funciona**, não só sobre **como parece** — como dizia Steve Jobs, "design não é como algo parece; é como algo funciona".

Por que isso importa para você, que vai programar? Porque **você constrói a experiência**. Cada decisão sua — a mensagem de erro que você escreve, o tempo que a tela leva para carregar, o que acontece quando a internet cai — molda a UX, esteja ou não um designer por perto. Entender os fundamentos de UX e de pesquisa com usuários te transforma de "alguém que implementa telas" em "alguém que constrói produtos que as pessoas conseguem e querem usar". Este capítulo abre o módulo de design com essa base.

---

## 🧠 Analogia

Pense na diferença entre **a decoração de um restaurante** e **a experiência de jantar nele**.

A **decoração** (a UI) é o que você vê: as cores, os móveis, a iluminação, a tipografia do cardápio. Importa, e um ambiente bonito ajuda. Mas a **experiência de jantar** (a UX) é muito maior: você achou fácil uma mesa? o garçom entendeu seu pedido? a comida demorou? o banheiro estava limpo? a conta veio certa? deu para conversar ou o som estava alto demais? Você pode sair de um restaurante **lindíssimo** jurando nunca voltar, porque a **experiência** foi ruim — atendimento lento, comida fria, confusão na conta.

UX é a experiência inteira do jantar; UI é só a decoração. E repare: a boa experiência depende de **todo mundo** — o garçom, a cozinha, o caixa — não só do decorador. Em software é igual: a UX depende do designer, do dev, do texto das mensagens, da velocidade do servidor. Todos "servem à mesa" do usuário. Guarde: você não precisa ser o decorador para arruinar (ou salvar) o jantar.

---

## 🧩 Conceitos fundamentais

### 1. UX vs. UI

- **UI (User Interface / Interface do Usuário):** os elementos visuais e interativos com que a pessoa interage — botões, cores, tipografia, ícones, layout. É o "quê você vê e toca".
- **UX (User Experience / Experiência do Usuário):** a experiência **total** de usar o produto — facilidade, eficiência, emoção, confiança. É o "como é a jornada inteira".

> **Termo explicado — UX vs. UI:** UI é a camada visual/interativa (as telas); UX é a experiência completa de usar o produto (fácil? útil? agradável? confiável?). Boa UI não garante boa UX.

Uma frase que ajuda: *"UI é a sela, o estribo e as rédeas; UX é a sensação de cavalgar."*

### 2. Os favos da experiência (Peter Morville)

Peter Morville resumiu o que torna uma experiência boa em sete qualidades (o "favo de mel" do UX):

- **Útil (useful):** resolve um problema real.
- **Usável (usable):** é fácil de usar.
- **Desejável (desirable):** desperta emoção positiva, dá vontade de usar.
- **Encontrável (findable):** a pessoa acha o que procura.
- **Acessível (accessible):** serve a pessoas com deficiência ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]).
- **Confiável (credible):** a pessoa confia (parece seguro, honesto, funciona).
- **Valioso (valuable):** entrega valor para o usuário **e** para o negócio.

### 3. Usabilidade — o coração da UX

**Usabilidade** é o quão **fácil e eficiente** é usar um produto para atingir um objetivo. Ela se mede por: **eficácia** (a pessoa consegue?), **eficiência** (com que esforço/tempo?), e **satisfação** (como se sente?). Jakob Nielsen detalha isso com heurísticas no próximo capítulo. Usabilidade é a parte da UX mais objetiva e testável.

### 4. Pesquisa com usuários — dizer vs. fazer

**Pesquisa de UX** é como você **descobre** e **valida** o que os usuários precisam e como se comportam. Divide-se em dois eixos:

- **Qualitativa** (por quê / como): poucos participantes, muita profundidade — entrevistas, testes de usabilidade, observação. Responde "**por que** as pessoas travam aqui?".
- **Quantitativa** (quanto / quantos): muitos dados — analytics, surveys, testes A/B. Responde "**quantos** abandonam nesta tela?".

E o eixo mais importante: **o que as pessoas dizem ≠ o que fazem**. Métodos **atitudinais** captam o que dizem (entrevista); **comportamentais** captam o que fazem (observação, analytics). Ambos enganam sozinhos — o ideal é cruzar. Alguém pode **dizer** que adora um recurso e **nunca** usá-lo.

> **Termo explicado — pesquisa qualitativa vs. quantitativa:** qualitativa investiga o *porquê* com poucos usuários em profundidade; quantitativa mede *quanto* com muitos dados. Uma explica, a outra dimensiona.

### 5. Teste de usabilidade

Um **teste de usabilidade** é observar uma pessoa **real** tentando realizar uma tarefa no produto (ou protótipo), **sem ajuda**, enquanto você anota onde ela trava. É um dos métodos mais poderosos e baratos de UX. A regra surpreendente de Nielsen: **~5 usuários** já revelam cerca de **85%** dos problemas de usabilidade — porque os mesmos obstáculos aparecem repetidamente. Não é preciso testar com centenas para descobrir que o botão está escondido.

> **Termo explicado — teste de usabilidade:** observar usuários reais tentando concluir tarefas no produto para identificar onde e por que eles travam. Cinco participantes já expõem a maioria dos problemas.

---

## ⚙️ Como funciona na prática

Como UX acontece num time, do problema à tela validada:

**1. Entender (pesquisa).** Antes de desenhar, o time investiga: quem é o usuário (personas), o que ele precisa (jornadas, entrevistas), como se comporta hoje (observação, analytics). É o "discovery" do [[47-Elicitacao-personas-e-jornada-do-usuario]] com lente de design.

**2. Definir o problema.** A pesquisa vira um **problema bem formulado**: não "fazer uma tela de busca", mas "o cliente com pressa não consegue escolher rápido". Um problema bem definido guia o design.

**3. Idear e prototipar.** O designer propõe soluções em **wireframes e protótipos** ([[53-Figma-wireframes-prototipos-e-Design-System]]) — rascunhos baratos, antes de qualquer código.

**4. Testar (validar).** O protótipo vai a **teste de usabilidade** com ~5 usuários. Descobre-se, por exemplo, que ninguém percebe o filtro porque parece um texto, não um botão. Corrige-se **no protótipo** — barato — antes de virar código caro.

**5. Construir.** Só então o dev implementa a versão validada. E aqui está o ponto-chave: **o dev também faz UX**. A mensagem de erro que você escreve ("Erro 500" vs. "Não conseguimos carregar os restaurantes, tente de novo"), o **feedback** de carregamento (um spinner vs. tela congelada), o que acontece **offline** — tudo isso é experiência, e nasce de decisões suas.

**6. Medir em produção.** Depois de no ar, **analytics** mostram o comportamento real (onde abandonam), fechando o ciclo com dados quantitativos.

O erro do time imaturo é pular direto do passo 1 para o 5 (do "quero uma tela" para "codei a tela"), sem definir o problema nem testar. Aí a tela sai bonita e **ninguém consegue usar** — e a descoberta vem tarde, em produção, quando corrigir é caro (a curva do custo da mudança, de novo).

---

## 🍔 Aplicação na SaborExpress

A SaborExpress quase cometeu o erro clássico: contratar um designer para "deixar o app bonito" e mandar o dev implementar. O PO, o Bruno, insistiu em **UX antes de UI**.

**Pesquisa que definiu o problema.** Nos testes de usabilidade do protótipo, cinco pessoas tentaram fazer um pedido. **Quatro** travaram no mesmo ponto: não encontravam como **mudar o endereço de entrega** — ele ficava escondido no menu de perfil, e elas procuravam na tela do carrinho. Nenhuma entrevista tinha revelado isso; só **observar** a pessoa travando revelou. Com 5 usuários, o padrão já estava claro (a regra de Nielsen na prática).

**Dizer vs. fazer.** Numa pesquisa, vários clientes **disseram** que "adorariam avaliar cada prato em detalhe com nota de sabor, apresentação e embalagem". Quando o time colocou isso no protótipo, **ninguém** preencheu — era trabalhoso demais. O que as pessoas **diziam** querer (avaliação detalhada) contradizia o que **faziam** (pular a avaliação). O time simplificou para uma nota única de estrelas, e a taxa de avaliação subiu.

**O dev fazendo UX.** Quando a dev foi implementar a tela de status do pedido, o servidor às vezes demorava a responder. Em vez de deixar a tela **congelada** (péssima UX — o cliente acha que travou), ela adicionou um **estado de carregamento** e uma mensagem amigável se demorasse demais ("estamos confirmando com o restaurante..."). Ninguém no design pediu isso — foi uma decisão de **experiência** tomada por quem programava. Foi essa atenção que fez a SaborExpress **parecer** confiável mesmo quando a rede oscilava.

Moral: a boa UX da SaborExpress não veio de um app "bonito"; veio de **entender o problema, testar cedo com poucos usuários, olhar o que as pessoas fazem (não só dizem), e cuidar dos detalhes de experiência em cada camada** — inclusive no código.

---

## 🏢 Como isso acontece em uma empresa

- **Papéis de design:** **UX Designer** (pesquisa, fluxos, usabilidade), **UI Designer** (visual, layout), **Product Designer** (acumula os dois, comum em startups), **UX Researcher** (dedicado à pesquisa, em empresas maiores). Em times pequenos, tudo isso pode ser uma pessoa — ou recair sobre o PO e os devs.
- **UX tem retorno financeiro.** Cada real investido em UX costuma retornar vários em conversão, retenção e menos suporte. "Reduzir 1 clique no checkout" pode significar milhões em vendas. Por isso UX é assunto de negócio, não capricho.
- **Design e engenharia trabalham juntos.** O **handoff** (entrega do design para o dev) acontece via **Figma** ([[53-Figma-wireframes-prototipos-e-Design-System]]). Devs que entendem UX questionam e melhoram os designs em vez de só copiá-los pixel a pixel.
- **Analytics são onipresentes.** Ferramentas como **Google Analytics, Hotjar (mapas de calor e gravações), Mixpanel, Amplitude** mostram o comportamento real. O time olha "onde o usuário abandona" toda semana.
- **"UX débito" existe.** Assim como dívida técnica, há dívida de UX: telas confusas que se acumulam. Times maduros reservam tempo para melhorá-las.
- **O dev é a última linha de defesa da UX.** O designer não especifica tudo (estados de erro, carregamento, casos-limite). Quem preenche essas lacunas, na prática, é você. Fazê-lo bem é uma marca de senioridade.

---

## ⚠️ Erros comuns

- **Confundir UX com "deixar bonito".** Bonito é UI. UX é a experiência inteira: útil, usável, confiável. Um app lindo e inutilizável tem UX ruim.
- **Projetar para si mesmo.** O dev/designer não é o usuário. O que é óbvio para quem construiu pode ser um labirinto para a Marta. Por isso se pesquisa e se testa.
- **Confiar só no que os usuários dizem.** As pessoas racionalizam e idealizam. O que elas **fazem** (comportamento) muitas vezes contradiz o que **dizem** (opinião). Cruze os dois.
- **Achar que precisa de centenas de usuários para testar.** Cinco já revelam a maioria dos problemas de usabilidade. Esperar por uma amostra gigante é desculpa para não testar.
- **Pular a validação e ir direto para o código.** Testar no protótipo é barato; descobrir o problema em produção é caro. A ordem certa é entender → prototipar → testar → construir.
- **Achar que UX é "problema do designer".** A experiência nasce em todas as camadas, inclusive nas mensagens de erro e nos tempos de resposta que **você** controla no código.
- **Ignorar acessibilidade.** Um produto que exclui pessoas com deficiência tem UX ruim (e, muitas vezes, problema legal). Veremos no próximo capítulo.

---

## 💡 Dicas profissionais

- **Pergunte "qual problema do usuário isso resolve?" antes de construir qualquer tela.** Se você não sabe, pare e descubra. Tela sem problema definido é tela que sai errada.
- **Faça um teste de usabilidade guerrilha.** Não precisa de laboratório: peça a 5 pessoas (até colegas de outra área) para realizar uma tarefa no seu protótipo e **fique calado** observando onde travam. Barato e revelador.
- **Observe o comportamento, não só a opinião.** "Você gostou?" é uma pergunta fraca (as pessoas são educadas). "Mostre como você faria X" revela a verdade.
- **Cuide dos "estados invisíveis" no código.** Carregando, vazio, erro, offline, sucesso. O designer costuma desenhar só o "tudo certo"; a UX real se prova nos outros estados — e eles são seus.
- **Escreva boas mensagens.** Uma mensagem de erro clara e humana ("Não encontramos esse CEP, confira o número") vale mais para a UX que qualquer animação. Microcopy é design.
- **Reduza a fricção.** A cada passo, campo ou clique a mais, você perde usuários. Pergunte sempre "dá para remover?". A melhor UX muitas vezes é a que tirou coisas, não a que adicionou.

---

## 🎈 Curiosidades

- O termo **"User Experience"** foi cunhado por **Don Norman** nos anos 1990, quando ele era VP na Apple — ele queria um nome que abrangesse **tudo** na relação da pessoa com o produto, não só a interface. Seu livro *O Design do Dia a Dia* é leitura clássica.
- A regra dos **"5 usuários"** de Jakob Nielsen (1993/2000) mostrou matematicamente que, depois do quinto participante, você para de descobrir problemas novos e começa a ver os mesmos de novo — então é melhor fazer **vários testes pequenos** do que um teste enorme.
- **Don Norman** popularizou o conceito de **affordance**: pistas visuais que dizem como usar algo (uma maçaneta "pede" para ser girada, um botão "pede" para ser apertado). Boa UI comunica affordances; má UI esconde-as.
- A **"lei de Fitts"** (1954) prevê que o tempo para clicar num alvo depende do tamanho e da distância dele — por isso botões importantes devem ser grandes e próximos. UX tem base científica, não é só "gosto".
- Estudos de e-commerce mostram que **cada campo extra** num formulário de checkout reduz a conversão. Empresas brigam por remover um único passo — porque, em escala, um clique a menos é receita a mais.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **UX (experiência do usuário)** | A experiência total de usar um produto: útil, fácil, agradável, confiável. |
| **UI (interface)** | A camada visual e interativa: botões, cores, tipografia, layout. |
| **Usabilidade** | Quão fácil e eficiente é usar o produto para atingir um objetivo. |
| **Pesquisa qualitativa** | Poucos usuários, muita profundidade; explica o *porquê*. |
| **Pesquisa quantitativa** | Muitos dados; mede *quanto/quantos*. |
| **Atitudinal vs. comportamental** | O que as pessoas *dizem* vs. o que *fazem*. |
| **Teste de usabilidade** | Observar usuários reais realizando tarefas para achar onde travam. |
| **Affordance** | Pista visual que sugere como usar algo (a maçaneta "pede" para girar). |
| **Microcopy** | Os pequenos textos da interface (botões, erros, dicas) — parte do design. |
| **Fricção** | Cada obstáculo (passo, campo, clique) que dificulta a tarefa do usuário. |

---

## 📝 Resumo

- **UX** é a experiência **total** de usar um produto (útil, usável, desejável, encontrável, acessível, confiável, valioso); **UI** é só a camada visual. Boa UI não garante boa UX — o que importa é como **funciona**, não só como **parece**.
- **Usabilidade** (eficácia + eficiência + satisfação) é o coração testável da UX.
- **Pesquisa com usuários** cruza **qualitativa** (por quê, poucos usuários) com **quantitativa** (quanto, muitos dados), e sempre lembra que **o que as pessoas dizem ≠ o que fazem**.
- O **teste de usabilidade** é barato e poderoso: **5 usuários** revelam a maioria dos problemas. Testar no protótipo é muito mais barato que descobrir o erro em produção.
- **UX é responsabilidade de todo o time**, inclusive do dev: mensagens de erro, estados de carregamento, comportamento offline e velocidade são experiência — e nascem de decisões de código.

---

## ☑️ Checklist de aprendizado

- [ ] Diferencio UX de UI com um exemplo próprio.
- [ ] Reconheço as qualidades de uma boa experiência (útil, usável, confiável...).
- [ ] Entendo a diferença entre pesquisa qualitativa e quantitativa.
- [ ] Sei que o que os usuários dizem pode contradizer o que fazem.
- [ ] Explico o que é um teste de usabilidade e a regra dos 5 usuários.
- [ ] Reconheço decisões de UX que cabem ao dev (erros, carregamento, offline).

---

## ✏️ Exercícios

**1.** Explique a diferença entre UX e UI usando um exemplo de um app que você conhece que é bonito mas frustrante de usar (ou o contrário).

**2.** Classifique cada método como **qualitativo** ou **quantitativo**: (a) entrevistar 6 usuários em profundidade; (b) medir em analytics que 42% abandonam a tela de pagamento; (c) observar 5 pessoas usando um protótipo; (d) enviar um survey para 2.000 clientes.

**3.** Por que a regra dos "5 usuários" funciona? O que ela implica para a forma de fazer testes de usabilidade?

**4.** Dê um exemplo de algo que um usuário poderia **dizer** que quer, mas que na prática **não usaria** — e explique como você descobriria essa diferença.

**5. (Reflexão)** Você é o dev implementando a tela de busca de restaurantes da SaborExpress. Cite três decisões de **UX** que são responsabilidade sua (não do designer) e explique o impacto de cada uma na experiência.

---

## 💬 Respostas comentadas

**1.** Resposta pessoal, mas o padrão esperado: a **UI** é a aparência (cores, layout, tipografia); a **UX** é a experiência de usar. Exemplo comum: um app de banco visualmente moderno (boa UI) em que você não acha como pagar um boleto sem navegar por cinco menus (má UX) — bonito, mas frustrante. Ou o inverso: um app simples e "sem graça" onde tudo está exatamente onde você espera (ótima UX apesar de UI modesta). O ponto é que beleza e facilidade são coisas distintas.

**2.** (a) **Qualitativo** — poucos, profundidade. (b) **Quantitativo** — número/percentual. (c) **Qualitativo** — observação de poucos, em profundidade. (d) **Quantitativo** — muitos respondentes, dados agregados.

**3.** Funciona porque os problemas de usabilidade são, em boa parte, **recorrentes**: as mesmas barreiras travam usuários diferentes. Depois de ~5 pessoas, você começa a ver os mesmos problemas se repetirem, e cada novo participante revela pouca coisa nova (retorno decrescente). A implicação prática: em vez de um teste enorme e caro com 50 pessoas, faça **vários testes pequenos** (de 5) ao longo do projeto, corrigindo entre um e outro — descobre-se mais, mais barato e mais cedo.

**4.** Exemplo: usuários **dizem** que querem "muitas opções de personalização" ou "um recurso avançado de relatórios", mas, quando disponível, **não** usam (é complexo demais ou não era a real necessidade). Eu descobriria a diferença **observando o comportamento**: colocar o recurso num protótipo e ver se as pessoas realmente o usam num teste de usabilidade, ou medir em analytics quantos de fato o acessam depois de lançado. O comportamento real desmente a opinião declarada.

**5.** Três decisões de UX do dev na tela de busca: (1) **Estado de carregamento** — mostrar um indicador (ou "esqueleto" da lista) enquanto os restaurantes carregam, para o cliente não achar que travou; impacta a **percepção de rapidez e confiança**. (2) **Estado vazio / sem resultados** — uma mensagem clara ("nenhum restaurante entrega no seu endereço agora") em vez de uma tela em branco; impacta se o usuário entende o que houve ou fica perdido. (3) **Tratamento de erro/offline** — se a rede cai, mostrar "sem conexão, tente de novo" com um botão de recarregar, em vez de uma tela quebrada; impacta se o app parece robusto ou frágil. Nenhuma dessas costuma estar no design "do caminho feliz", mas todas moldam fortemente a experiência real — e são decisões de código.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[49-MVP-priorizacao-e-validacao]] — o que priorizamos agora precisa ser bem desenhado.
- **Próximo (linear):** [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]] — as regras práticas de usabilidade e acessibilidade.
- **Base:** [[47-Elicitacao-personas-e-jornada-do-usuario]] — personas e jornadas alimentam a pesquisa de UX.
- **Aplicação:** [[53-Figma-wireframes-prototipos-e-Design-System]] — onde a UX vira protótipo testável; e [[78-Ligando-front-end-a-experiencia-do-usuario]] — a UX no código do front-end.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 14 → **Capítulo 50 de 119**.
