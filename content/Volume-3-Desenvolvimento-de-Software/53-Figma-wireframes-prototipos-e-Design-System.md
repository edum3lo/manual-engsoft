# Capítulo 53 — Figma, wireframes, protótipos e Design System

> **Volume 3 — Desenvolvimento de Software** · Módulo 14 — UX e Design de Produto
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Diferenciar **wireframe**, **mockup** e **protótipo** — e saber quando usar cada um.
- Entender o que é o **Figma** e por que ele dominou o design de produtos.
- Compreender o que é um **Design System** e por que ele economiza tempo e garante consistência.
- Entender o **handoff** (a entrega do design para o dev) e como ler um arquivo de Figma como desenvolvedor.
- Conhecer **design tokens** e a ponte entre design e código.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]] e [[52-Design-Thinking-e-Design-Sprint]] — protótipos são a ferramenta de testar e validar.

---

## 📖 Introdução

No capítulo anterior, o Design Thinking pedia "prototipar barato" para testar ideias antes de construir. Agora vamos à ferramenta onde isso realmente acontece: o **Figma** — o programa que se tornou o padrão da indústria para desenhar interfaces, prototipar e entregar telas para os desenvolvedores. Se você vai trabalhar com produto, vai receber links de Figma quase todo dia. Saber "ler" um Figma é, para o dev, tão essencial quanto saber ler uma issue.

Antes de qualquer pixel colorido, o design passa por estágios de fidelidade crescente: do **wireframe** (o rascunho em preto e branco, só estrutura) ao **mockup** (a tela com visual final) ao **protótipo** (as telas clicáveis, simulando o produto). Entender essa progressão te faz saber **em que estágio** uma tela está e o que se espera dela — não faz sentido discutir a cor de um botão num wireframe cuja função é só validar a estrutura.

E há um conceito que muda tudo em times que crescem: o **Design System** — uma "biblioteca" de componentes e regras que garante que o botão da tela A seja idêntico ao da tela Z, e que o dev não precise reinventar cada peça. Design System é onde o mundo do design e o do código finalmente **se encontram**: o mesmo botão existe como componente no Figma **e** como componente no React. Este capítulo fecha o módulo de UX construindo essa ponte — e te prepara para o handoff, o momento em que o design vira sua responsabilidade de implementar.

---

## 🧠 Analogia

Pense em **construir uma casa** e nos diferentes desenhos que o arquiteto entrega.

- O **wireframe** é a **planta baixa a lápis**: mostra onde ficam os cômodos, as paredes, as portas — a **estrutura** e o fluxo, sem cor, sem acabamento. Serve para decidir "a cozinha fica aqui, o banheiro ali", sem gastar tempo escolhendo o azulejo.
- O **mockup** é a **maquete realista ou o render 3D**: agora com cores, materiais, iluminação — você vê **como vai parecer**. Mas ainda não dá para "morar" nela.
- O **protótipo** é a **maquete que você percorre**: você "anda" pelos cômodos, abre as portas, sente o fluxo. Em software, você **clica** nas telas e navega, como se fosse o app real — mas por dentro é só uma fachada, sem encanamento (código) de verdade.

O **Design System** é o **catálogo padronizado da construtora**: em vez de desenhar cada maçaneta, janela e tomada do zero em cada casa, existe um catálogo de peças aprovadas — "a janela modelo J-3", "a porta P-1" — que se repetem em todos os projetos. Isso garante que tudo combine e acelera a obra. Guarde: fidelidade crescente (planta → maquete → maquete percorrível) e um catálogo de peças reutilizáveis que mantém tudo consistente.

---

## 🧩 Conceitos fundamentais

### 1. Os níveis de fidelidade

**Fidelidade** é o quão próximo do produto final um design está. A progressão típica:

- **Wireframe (baixa fidelidade):** estrutura e layout em preto, branco e cinza. Caixas, textos genéricos ("Lorem ipsum"), sem cores nem imagens reais. Foca em **o quê** vai onde e no **fluxo**. Barato e rápido de mudar.
- **Mockup (alta fidelidade):** a tela com o visual final — cores, tipografia, imagens, ícones. Mostra **como** vai parecer, mas é **estático** (não clica).
- **Protótipo:** telas **conectadas e clicáveis** que simulam a navegação real. Pode ser de baixa fidelidade (wireframes ligados) ou alta (mockups ligados). Serve para **testar o fluxo** com usuários ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]).

> **Termo explicado — wireframe / mockup / protótipo:** wireframe é o rascunho estrutural (baixa fidelidade); mockup é a tela com visual final (estática); protótipo é o conjunto de telas clicáveis que simula o produto.

**Por que começar em baixa fidelidade?** Porque é **barato mudar**. Ninguém se apega a um rascunho; todos discutem estrutura sem brigar por cor. Quanto mais "pronta" a tela parece, mais difícil é ouvir "está tudo errado" — então valida-se a estrutura primeiro, o visual depois.

### 2. Figma — o padrão da indústria

O **Figma** é uma ferramenta de design de interfaces que roda **no navegador** e é **colaborativa em tempo real** (várias pessoas editando juntas, como no Google Docs). Nele se faz tudo: wireframe, mockup, protótipo clicável, e a entrega para devs. Ele venceu concorrentes (Sketch, Adobe XD) principalmente pela colaboração em tempo real e por ser multiplataforma.

> **Termo explicado — Figma:** ferramenta de design de interfaces baseada em navegador, colaborativa em tempo real, usada para criar wireframes, mockups, protótipos e entregar telas aos desenvolvedores.

Para o **dev**, o Figma oferece um "modo inspeção" (Dev Mode): você clica num elemento e vê suas medidas, cores (em HEX/RGB), fontes, espaçamentos e até um trecho de código sugerido (CSS). Não se **programa** o app no Figma — mas se **lê** dele tudo que você precisa para implementar fielmente.

### 3. Design System — a fonte única de verdade

Um **Design System** é uma coleção **reutilizável** de componentes, padrões e regras que definem a aparência e o comportamento de um produto: cores, tipografia, espaçamentos, botões, campos, cards, ícones — com regras de quando e como usar cada um. É a **fonte única de verdade** visual do produto.

> **Termo explicado — Design System:** biblioteca de componentes e regras (cores, tipografia, botões, espaçamentos) que garante consistência visual e acelera design e desenvolvimento.

Ele tem camadas:
- **Design tokens:** os valores fundamentais nomeados — `cor-primaria = #FF5722`, `espaçamento-md = 16px`, `raio-borda = 8px`. São os "átomos".
- **Componentes:** botões, inputs, cards — montados a partir dos tokens.
- **Padrões e diretrizes:** regras de uso ("botão primário só um por tela", "erros sempre em vermelho + ícone").

Exemplos famosos: **Material Design** (Google), **Human Interface Guidelines** (Apple), **Carbon** (IBM), **Polaris** (Shopify).

### 4. A ponte design ↔ código

O poder do Design System aparece quando o **mesmo componente existe nos dois mundos**: o "Botão Primário" é um componente no Figma **e** um componente `<Button>` no código (React, Vue — [[77-Frameworks-de-front-end]]). Quando o design muda o botão na biblioteca, todas as telas atualizam; quando o dev implementa o `<Button>` uma vez, todas as telas o reutilizam. Os **design tokens** costumam virar **variáveis de CSS** ou de tema, sincronizando cor e espaçamento entre Figma e código. Assim, consistência deixa de ser esforço manual e vira **arquitetura**.

### 5. Handoff — a entrega para o dev

**Handoff** é o momento em que o design "passa a bola" para o desenvolvimento: o designer entrega o Figma pronto, e o dev implementa. Um bom handoff inclui os estados (normal, hover, erro, vazio, carregando), as medidas, os tokens e o comportamento esperado. Handoff não é "jogar por cima do muro" — os melhores times mantêm designer e dev **conversando** durante a implementação, porque sempre surgem casos que o design não previu (o texto muito longo, o estado offline).

> **Termo explicado — handoff:** a passagem do design finalizado para a equipe de desenvolvimento implementar, idealmente acompanhada de conversa contínua, não uma entrega "por cima do muro".

---

## ⚙️ Como funciona na prática

O caminho de uma tela, do rascunho ao código:

**1. Wireframe para validar estrutura.** O designer esboça a tela de busca em baixa fidelidade e testa o **fluxo** com usuários (o filtro está num lugar óbvio?). Muda-se rápido, porque é só caixa e texto.

**2. Mockup com o visual.** Validada a estrutura, aplica-se o **Design System**: as cores da marca, a tipografia, os componentes reais. A tela agora parece o produto.

**3. Protótipo clicável.** As telas são ligadas ("ao tocar em 'filtrar', vai para a tela X") e testadas de novo — agora o usuário **navega**. Ajustes finais nascem daqui.

**4. Handoff.** O designer marca a tela como pronta. O dev abre o **Dev Mode**: inspeciona espaçamentos (16px entre cards), cores (`#FF5722`), fontes (Inter 16px), e vê quais **componentes do Design System** usar. Se o Design System já existe em código, o dev **monta** a tela com os componentes prontos (`<Card>`, `<Button>`), em vez de estilizar do zero.

**5. Conversa durante a implementação.** O dev descobre um caso não previsto: e se o nome do restaurante tiver 60 caracteres? Ele **conversa** com o designer (não adivinha), decidem truncar com "...", e o design é atualizado. Esse ida-e-volta é o handoff saudável.

**O papel do dev nesse fluxo** é maior do que "copiar o Figma pixel a pixel": você garante que a implementação seja **fiel** ao design **e** robusta nos estados que o design esquece (erro, vazio, carregando — [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]), acessível ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) e reutilizável (via componentes). Ler bem um Figma e dialogar com o design é uma habilidade que te diferencia.

---

## 🍔 Aplicação na SaborExpress

Quando a SaborExpress tinha poucas telas, cada uma era desenhada do zero. Deu ruim: o botão "confirmar" era laranja numa tela, vermelho em outra, com cantos diferentes; os espaçamentos variavam; o dev reimplementava tudo a cada tela. O app parecia **feito por três pessoas diferentes** (e estava). A solução foi criar um **Design System**.

**Os tokens e componentes.** O designer definiu: cor primária `#FF5722` (o laranja da marca), tipografia Inter, espaçamentos de 4/8/16/24px, raio de borda 8px. Com isso montou os componentes no Figma: `Botão` (primário, secundário), `Card de Restaurante`, `Input`, `Badge de status`. A dev implementou cada um **uma vez** em React (`<Button>`, `<RestaurantCard>`) lendo os tokens como variáveis de tema.

**O ganho.** A partir daí, uma tela nova virava questão de **montar** peças prontas — o `<RestaurantCard>` já vinha com o visual certo, acessível e responsivo. Quando a Ana quis mudar o laranja da marca para um tom mais vivo, bastou **alterar um token** (`cor-primaria`) e **o app inteiro** mudou de cor de uma vez — no Figma e no código. Antes, isso seria caçar o laranja em 40 telas na mão.

**O handoff que evitou um bug.** Ao entregar a tela de acompanhamento de pedido, o designer só desenhou o "caminho feliz". No handoff, a dev perguntou: "e se o restaurante **cancelar** o pedido? e se a entrega **atrasar** muito?". O designer não tinha pensado nisso. Juntos, criaram os estados de "pedido cancelado" e "atraso" **antes** de virar um bug em produção — exatamente o tipo de lacuna que o dev, lendo criticamente o Figma, deve enxergar. O handoff virou conversa, não muro.

Moral: o Design System transformou consistência de "esforço manual repetido" em "montar peças prontas", e o bom handoff transformou o dev em **parceiro** do design, não em copiadora de telas.

---

## 🏢 Como isso acontece em uma empresa

- **Figma é praticamente universal.** Dominou o mercado de design de produtos. Como dev, você vai receber links de Figma e usar o **Dev Mode** para inspecionar. Ter uma conta (o plano gratuito serve) e saber navegar é esperado.
- **Design Systems são padrão em produtos sérios.** Empresas mantêm bibliotecas no Figma **espelhadas** por bibliotecas de componentes no código (Storybook é a ferramenta comum para catalogar componentes de código). Design e engenharia mantêm as duas em sincronia.
- **"Design tokens" viram infraestrutura.** Ferramentas exportam tokens do Figma para variáveis de CSS/JS automaticamente, para que a mesma cor não seja digitada duas vezes em mundos diferentes.
- **O handoff evoluiu.** Antes se "jogava por cima do muro"; hoje designer e dev trabalham juntos, com o dev participando desde o design para apontar viabilidade (a lente de factibilidade do [[52-Design-Thinking-e-Design-Sprint]]).
- **Devs contribuem para o Design System.** Muitas vezes é o dev quem implementa e mantém os componentes reutilizáveis — uma responsabilidade valorizada e que exige entender design e código.
- **Cuidado com a "fidelidade cara demais cedo".** Times imaturos fazem mockups lindos antes de validar a estrutura, e depois sofrem para mudar. Os maduros validam em wireframe primeiro.

---

## ⚠️ Erros comuns

- **Discutir cor num wireframe.** Cada nível de fidelidade tem seu propósito. Debater visual quando a tela ainda é um rascunho estrutural desperdiça energia e confunde a validação.
- **Copiar o Figma pixel a pixel e ignorar os estados.** O design costuma mostrar só o "tudo certo". O dev que não implementa erro, vazio e carregando entrega uma tela que quebra na vida real.
- **Reinventar componentes que já existem no Design System.** Estilizar um botão do zero quando há um `<Button>` pronto gera inconsistência e retrabalho. Use a biblioteca.
- **Tratar o handoff como "muro".** Receber o Figma e sumir para codar, sem conversar, garante que os casos não previstos virem bug. Handoff é diálogo.
- **Não usar tokens.** Espalhar `#FF5722` copiado em 40 lugares no código faz uma troca de cor virar um pesadelo. Centralize em tokens/variáveis.
- **Achar que "está no Figma, então está certo".** O design pode estar tecnicamente inviável ou ter esquecido acessibilidade. O dev deve questionar, não obedecer cegamente.
- **Confundir protótipo com produto.** Um protótipo de Figma **parece** funcionar, mas não tem lógica nem banco por trás. É uma fachada para testar — não confunda "clicável" com "pronto".

---

## 💡 Dicas profissionais

- **Aprenda a usar o Dev Mode do Figma.** Saber inspecionar medidas, cores e tokens direto do arquivo te torna autônomo e fiel ao design — sem ficar perguntando "que cor é essa?".
- **Implemente pensando em componentes reutilizáveis.** Ao construir uma tela, pergunte "isto vai se repetir?". Se sim, faça um componente. É assim que nasce (e se mantém) o Design System do lado do código.
- **Cace os estados que o design esqueceu.** Ao receber uma tela, liste: e vazio? e erro? e carregando? e offline? e texto muito longo? Levar essas perguntas ao designer no handoff é marca de senioridade.
- **Use tokens/variáveis desde o início.** Nunca "chumbe" uma cor ou espaçamento direto no código. Referencie o token. Uma mudança de marca deve ser um clique, não uma caçada.
- **Valide a estrutura em baixa fidelidade.** Se você participa do design, empurre para testar o fluxo em wireframe antes de investir no visual. Muda barato o que precisa mudar.
- **Trate o designer como parceiro.** Conversar cedo (viabilidade, estados, acessibilidade) evita retrabalho para os dois lados. O melhor produto nasce do diálogo design↔engenharia, não da entrega por cima do muro.

---

## 🎈 Curiosidades

- O **Figma** foi lançado em 2016 e sua grande sacada foi rodar **no navegador**, com colaboração em tempo real — algo que os concorrentes (Sketch, desktop-only) não tinham. Em 2022, a **Adobe** anunciou a compra do Figma por cerca de **20 bilhões de dólares** (acordo depois cancelado por questões regulatórias em 2023) — um sinal de quanto o design de produtos virou estratégico.
- O **Material Design**, o Design System do Google (2014), foi um dos primeiros a serem abertos publicamente e influenciou o visual de milhões de apps Android — provando o poder de um sistema consistente em escala.
- O termo **design token** foi popularizado pela **Salesforce**, para resolver o problema de manter cores e espaçamentos consistentes entre web, iOS e Android ao mesmo tempo — um valor definido uma vez, usado em toda parte.
- **Lorem ipsum**, o texto genérico dos wireframes, é um trecho **embaralhado** de uma obra de Cícero (filósofo romano) de 45 a.C. Usa-se texto sem sentido de propósito: para o olho focar no **layout**, não no conteúdo.
- O **Storybook** (catálogo de componentes de código) permite ver e testar cada componente isolado, virando a "vitrine viva" do Design System no lado da engenharia — o espelho do Figma no mundo do código.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Fidelidade** | Quão próximo do produto final um design está (baixa → alta). |
| **Wireframe** | Rascunho estrutural em preto e branco (baixa fidelidade). |
| **Mockup** | Tela com visual final, mas estática (alta fidelidade). |
| **Protótipo** | Telas clicáveis que simulam a navegação do produto. |
| **Figma** | Ferramenta de design de interfaces no navegador, colaborativa. |
| **Dev Mode** | Modo do Figma que mostra medidas, cores e código para o dev. |
| **Design System** | Biblioteca de componentes e regras que garante consistência. |
| **Design token** | Valor nomeado fundamental (cor, espaçamento, raio) reutilizado em tudo. |
| **Componente** | Peça reutilizável (botão, card) montada a partir de tokens. |
| **Handoff** | Entrega do design para o dev implementar (idealmente com diálogo). |
| **Storybook** | Catálogo vivo dos componentes de código (o Design System no código). |

---

## 📝 Resumo

- O design cresce em **fidelidade**: **wireframe** (estrutura, preto e branco) → **mockup** (visual final, estático) → **protótipo** (telas clicáveis). Valida-se a **estrutura** cedo e barato, o visual depois.
- O **Figma** é o padrão da indústria: colaborativo, no navegador, cobrindo do wireframe ao handoff. Para o dev, o **Dev Mode** revela medidas, cores e tokens.
- Um **Design System** é a biblioteca reutilizável (tokens → componentes → regras) que garante consistência e acelera design e código — é a **fonte única de verdade** visual.
- A ponte design↔código: o mesmo componente existe no Figma **e** no código; **design tokens** viram variáveis, sincronizando os dois mundos. Consistência vira arquitetura, não esforço manual.
- O **handoff** é a entrega para o dev — e funciona melhor como **diálogo contínuo** do que como "muro". O dev implementa fielmente, cobre os estados esquecidos (erro, vazio, carregando), garante acessibilidade e cria componentes reutilizáveis.

---

## ☑️ Checklist de aprendizado

- [ ] Diferencio wireframe, mockup e protótipo e sei o propósito de cada um.
- [ ] Entendo por que validar estrutura em baixa fidelidade antes do visual.
- [ ] Sei o que é o Figma e para que serve o Dev Mode para o desenvolvedor.
- [ ] Explico o que é um Design System e o papel dos design tokens.
- [ ] Entendo a ponte entre componente no Figma e componente no código.
- [ ] Sei o que é handoff e por que deve ser um diálogo, não um muro.

---

## ✏️ Exercícios

**1.** Ordene por fidelidade crescente e explique o propósito de cada um: mockup, protótipo, wireframe.

**2.** Por que faz sentido **validar a estrutura** de uma tela em wireframe antes de investir no visual em alta fidelidade?

**3.** Explique, com o exemplo de uma troca de cor da marca, como um **Design System** com **tokens** economiza trabalho comparado a "chumbar" a cor em cada tela.

**4.** O que é um **handoff** e por que "jogar o design por cima do muro" (sem conversa) costuma gerar bugs?

**5. (Reflexão)** Você recebeu no Figma a tela de "acompanhamento de pedido" da SaborExpress, desenhada só no caminho feliz. Que perguntas e estados você levantaria no handoff antes de implementar?

---

## 💬 Respostas comentadas

**1.** Ordem crescente: **wireframe** (baixa) → **mockup** (alta, estático) → **protótipo** (alta e clicável). O **wireframe** valida estrutura e fluxo, barato de mudar; o **mockup** define o visual final (cores, tipografia), mas não interage; o **protótipo** conecta as telas para simular a navegação e testar o fluxo com usuários. (O protótipo pode existir em baixa ou alta fidelidade, mas no fluxo típico vem depois do mockup.)

**2.** Porque mudar é **barato** em baixa fidelidade e **caro** em alta. Num wireframe, mover o filtro de lugar ou repensar o fluxo é questão de arrastar caixas; ninguém se apega. Num mockup detalhado, a tela "parece pronta", as pessoas se apegam ao visual, e ouvir "a estrutura está errada" custa refazer todo o trabalho de acabamento. Validar estrutura primeiro garante que você só investe no visual **depois** de ter certeza de que o esqueleto está certo.

**3.** Com um **token** (`cor-primaria = #FF5722`), a cor da marca é definida **uma vez** e referenciada em todos os componentes e telas. Trocar a marca vira **alterar um único valor**, e tudo atualiza de uma vez — no Figma e no código. Sem tokens, a cor `#FF5722` foi copiada e "chumbada" em dezenas de telas; trocá-la exige caçar e substituir cada ocorrência na mão, com risco de esquecer alguma e deixar o app inconsistente. O token transforma uma caçada em um clique.

**4.** **Handoff** é a passagem do design finalizado para o dev implementar. "Jogar por cima do muro" (entregar o Figma e sumir, sem diálogo) gera bugs porque o design quase sempre mostra só o **caminho feliz** e esquece casos reais — texto longo demais, estado de erro, lista vazia, offline, cancelamento. Sem conversa, o dev **adivinha** esses casos (e adivinha errado) ou os ignora, e eles viram bugs em produção. Com diálogo, as lacunas são resolvidas **antes** de custarem caro.

**5.** Eu levantaria os estados e casos que o caminho feliz ignora: (1) **e se o restaurante cancelar** o pedido? — precisa de um estado "pedido cancelado" com explicação e talvez reembolso; (2) **e se a entrega atrasar** muito além do estimado? — um estado de "atraso" que não deixe o cliente ansioso; (3) **estado de carregamento** enquanto busca o status, e **erro/offline** se a rede cair; (4) **e o texto/tempo**: o que aparece se o tempo estimado for desconhecido? se o nome do entregador for muito longo? (5) **acessibilidade**: os status são anunciados por leitor de tela? a cor do status vem acompanhada de ícone/texto (não só cor)? Levaria essas perguntas ao designer no handoff para desenharmos os estados juntos antes de eu implementar — evitando que virem bugs.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[52-Design-Thinking-e-Design-Sprint]] — protótipos são a ferramenta de testar as soluções ideadas.
- **Próximo (linear):** [[54-Por-que-modelar-antes-de-programar-UML]] — do design da tela ao design do sistema por dentro.
- **Aplicação no código:** [[77-Frameworks-de-front-end]] (componentes) e [[78-Ligando-front-end-a-experiencia-do-usuario]] — onde o Figma vira interface real.
- **Base:** [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]] (testar protótipos) e [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]] (implementar acessível).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 14 → **Capítulo 53 de 119**.
