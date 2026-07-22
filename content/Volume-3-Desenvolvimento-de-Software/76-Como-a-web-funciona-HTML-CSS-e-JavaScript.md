# Capítulo 76 — Como a web funciona; HTML, CSS e JavaScript

> **Volume 3 — Desenvolvimento de Software** · Módulo 22 — Front-end
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é o **front-end** e como ele se encaixa na arquitetura cliente-servidor.
- Compreender o papel dos **três pilares** da web: **HTML** (estrutura), **CSS** (estilo), **JavaScript** (comportamento).
- Entender o que acontece no **navegador**: o **DOM** e a renderização.
- Reconhecer a diferença entre páginas **estáticas** e **dinâmicas**, e o que roda no cliente vs. no servidor.
- Ver como o front-end **consome a API** para virar uma aplicação de verdade.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante–Intermediário (2,5/5).**

---

## ✅ Pré-requisitos

- Ter lido [[27-Como-a-internet-funciona]] e [[29-O-que-acontece-quando-voce-digita-google-ponto-com]] (Vol. 2).
- Ter lido [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] — o front consome a API.

---

## 📖 Introdução

Tudo o que você **vê e toca** num site ou app web — os botões, os textos, as cores, as animações, a tela que reage ao seu clique — é o **front-end**. É a "cara" do sistema, a parte com que o usuário interage diretamente. Enquanto o back-end ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) trabalha nos bastidores (banco, lógica, API), o front-end é o palco: onde a experiência do usuário ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) ganha vida no navegador.

O front-end web, por mais moderno e complexo que fique, é construído sobre **três tecnologias fundamentais** que existem desde os anos 1990 e continuam sendo a base de **tudo**: o **HTML** (que dá a **estrutura** — os elementos da página), o **CSS** (que dá o **estilo** — cores, layout, fontes), e o **JavaScript** (que dá o **comportamento** — a interatividade, a lógica). Todo framework de front-end (React, Vue, Angular — [[77-Frameworks-de-front-end]]) roda **em cima** desse trio. Não importa quantas camadas de abstração venham por cima; no fim, o navegador só entende HTML, CSS e JavaScript.

Este capítulo abre o módulo de front-end com esse alicerce: como a web funciona (o navegador pedindo e montando páginas), o papel de cada um dos três pilares, o que é o **DOM** (a representação da página que o JavaScript manipula), e a distinção crucial entre o que roda **no navegador** (cliente) e **no servidor**. Entender essa base é o que impede o front-end de virar "mágica incompreensível" — e o que faz os frameworks, depois, fazerem sentido. É também onde a **acessibilidade** ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) começa: no HTML semântico.

---

## 🧠 Analogia

Pense na construção e decoração de uma **casa**, e depois em dar vida a ela.

- O **HTML** é a **estrutura da casa**: as paredes, os cômodos, as portas, as janelas. Ele define **o que existe** e **onde** — "aqui há um título, aqui um parágrafo, aqui uma imagem, aqui um botão". Sem HTML, não há casa; é o esqueleto.
- O **CSS** é a **decoração e o acabamento**: a cor das paredes, o piso, a disposição dos móveis, a iluminação. Ele define **como as coisas parecem** — o mesmo esqueleto de HTML pode ficar elegante ou feio dependendo do CSS. A casa (estrutura) é a mesma; a aparência muda.
- O **JavaScript** é a **parte elétrica e automática** que faz a casa **reagir**: a luz que acende ao apertar o interruptor, a porta da garagem que abre, o alarme que dispara. Ele dá **comportamento** — a página reage ao clique, valida um formulário, busca dados, atualiza sozinha.

E o **navegador** (Chrome, Firefox, Safari) é como o **morador que monta e usa a casa**: ele recebe a planta (HTML), a decoração (CSS) e as instruções elétricas (JavaScript), **monta tudo** (renderiza a página) e permite você viver nela (interagir). Guarde: HTML = estrutura (o que existe), CSS = estilo (como parece), JavaScript = comportamento (como reage) — e o navegador é quem monta e roda tudo.

---

## 🧩 Conceitos fundamentais

### 1. O front-end e o modelo cliente-servidor

O **front-end** é a parte do sistema que roda **no navegador do usuário** (o **cliente**) e com a qual ele interage. Ele se comunica com o **back-end** (o **servidor**) via **API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]). É o modelo **cliente-servidor** ([[27-Como-a-internet-funciona]], [[57-O-que-e-arquitetura-de-software]]): o front (cliente) pede dados e ações; o back (servidor) responde.

> **Termo explicado — front-end:** a camada do sistema que roda no navegador do usuário, responsável pela interface e interação; comunica-se com o back-end via API.

### 2. HTML — a estrutura

O **HTML (HyperText Markup Language)** define a **estrutura e o conteúdo** da página, usando **tags** (elementos) como `<h1>` (título), `<p>` (parágrafo), `<img>` (imagem), `<a>` (link), `<button>` (botão), `<form>` (formulário). As tags formam uma **árvore** de elementos aninhados.

```html
<article>
  <h1>Pizza Margherita</h1>
  <p>Molho de tomate, muçarela e manjericão.</p>
  <button>Adicionar ao carrinho</button>
</article>
```

> **Termo explicado — HTML:** linguagem de marcação que define a estrutura e o conteúdo de uma página web, usando tags (elementos) aninhadas.

**HTML semântico** (usar a tag certa para cada função — [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) é crucial para acessibilidade e SEO: `<button>` para botão, `<nav>` para navegação, `<h1>`-`<h6>` para hierarquia de títulos — não `<div>` para tudo.

### 3. CSS — o estilo

O **CSS (Cascading Style Sheets)** define a **aparência**: cores, fontes, tamanhos, espaçamentos, **layout** (posição dos elementos). Ele "seleciona" elementos HTML e aplica estilos:

```css
h1 { color: #FF5722; font-size: 24px; }
button { background: #FF5722; border-radius: 8px; padding: 12px; }
```

> **Termo explicado — CSS:** linguagem que define a apresentação visual (cores, fontes, layout) dos elementos HTML.

Conceitos-chave: o **box model** (todo elemento é uma caixa com conteúdo, padding, borda, margem), o **layout** moderno com **Flexbox** e **Grid**, e o **design responsivo** (a página se adapta ao tamanho da tela — celular, tablet, desktop — com *media queries*). O responsivo é essencial: a maioria dos acessos hoje é por **celular**.

### 4. JavaScript — o comportamento

O **JavaScript (JS)** é a **linguagem de programação** do navegador — a única que roda nativamente ali. Ele dá **interatividade e lógica**: responder a cliques, validar formulários, **buscar dados da API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]), atualizar a página sem recarregar, animar. É o que transforma uma página estática num app.

> **Termo explicado — JavaScript:** linguagem de programação que roda no navegador, dando comportamento e interatividade à página (responder a eventos, buscar dados, atualizar a tela).

O JavaScript aplica a lógica de programação que você viu no [[30-Logica-de-programacao-sem-trauma]] (Vol. 2) — variáveis, condições, funções — agora no contexto do navegador. (E, com o Node.js, também no servidor — [[79-O-que-roda-no-servidor-linguagens-e-frameworks]].)

### 5. O DOM e a renderização

Quando o navegador recebe o HTML, ele o transforma numa **árvore de objetos** na memória chamada **DOM (Document Object Model)** — uma representação viva da página que o JavaScript pode **ler e modificar**. Quando o JS muda o DOM (ex.: adiciona um item ao carrinho na tela), o navegador **re-renderiza** a parte afetada, e você vê a mudança.

> **Termo explicado — DOM (Document Object Model):** a representação em árvore da página que o navegador cria a partir do HTML; o JavaScript manipula o DOM para mudar a página dinamicamente.

O ciclo: o navegador **baixa** HTML/CSS/JS → **monta o DOM** e aplica o CSS → **renderiza** (desenha na tela) → o **JS interage** com o DOM conforme o usuário age. Entender o DOM é entender como o JavaScript "mexe" na página — a base dos frameworks ([[77-Frameworks-de-front-end]]).

---

## ⚙️ Como funciona na prática

O caminho de uma página web, do endereço à interação (juntando com o [[29-O-que-acontece-quando-voce-digita-google-ponto-com]]):

**1. O navegador pede a página.** Você digita a URL; o navegador faz uma requisição HTTP ([[28-Protocolos-e-protecao]]) ao servidor, que responde com o **HTML**.

**2. O navegador monta e estiliza.** Ele lê o HTML, monta o **DOM**, baixa e aplica o **CSS** (deixando bonito) e baixa o **JavaScript**.

**3. O JavaScript dá vida.** O JS roda, "conecta" os comportamentos (o que acontece ao clicar), e frequentemente **busca dados da API** para preencher a página (a lista de restaurantes, o cardápio). Ele **atualiza o DOM** com esses dados, e você vê a tela completa.

**4. A interação contínua.** Você clica, digita, rola — o JS responde a esses **eventos**, atualiza o DOM (adiciona um item ao carrinho) e chama a API (finaliza o pedido), tudo **sem recarregar** a página inteira. É isso que faz um site parecer um "app".

**Cliente vs. servidor — a distinção crucial.** O que roda **no navegador** (cliente): HTML, CSS, JS, a interface. O que roda **no servidor**: a lógica de negócio, o banco, a API. Isso tem implicações importantes:
- **Nunca confie no cliente para segurança.** O usuário pode ver e alterar o HTML/JS que roda no navegador dele. Validação de verdade, autorização e regras de negócio ficam **no servidor** ([[73-Autenticacao-e-autorizacao]]). Validar só no front é conveniência (feedback rápido), não segurança.
- **Segredos nunca vão no front.** Chaves de API secretas, senhas — tudo que está no navegador é **visível**. Segredos ficam no servidor.

**Estático vs. dinâmico.** Uma página **estática** é HTML fixo (um artigo, uma landing page). Uma página **dinâmica** é montada com dados que mudam (o cardápio do restaurante, seu feed) — o JS busca da API e preenche. Aplicações web modernas são majoritariamente dinâmicas.

**A ligação com o resto.** O front-end é onde a **UX** ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) e o **design** ([[53-Figma-wireframes-prototipos-e-Design-System]]) viram realidade, onde a **acessibilidade** ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) se implementa (no HTML semântico), e onde a **API** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) é consumida. Os **frameworks** ([[77-Frameworks-de-front-end]]) organizam tudo isso em componentes, mas rodam sobre esse trio fundamental.

---

## 🍔 Aplicação na SaborExpress

O front-end da SaborExpress — o que o cliente vê no navegador (e, de forma parecida, no app) — é construído sobre HTML, CSS e JavaScript.

**HTML dá a estrutura.** A tela de um restaurante tem: um `<h1>` com o nome, uma lista (`<ul>`) de pratos, cada um num item com `<img>` (foto), `<p>` (descrição), o preço e um `<button>` "adicionar". O time usa **HTML semântico** — `<button>` de verdade para os botões, `<nav>` para o menu, títulos hierárquicos — o que torna a tela **acessível** ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) para leitores de tela, como vimos no módulo de UX.

**CSS dá a identidade visual e a responsividade.** As cores da marca (o laranja `#FF5722` do Design System — [[53-Figma-wireframes-prototipos-e-Design-System]]), a tipografia, o layout dos cards de restaurante — tudo é CSS. E, crucialmente, o CSS é **responsivo**: como a maioria dos clientes da SaborExpress usa **celular**, a mesma página se reorganiza para caber bem na tela pequena (cards em uma coluna no celular, três colunas no desktop) via media queries. Sem responsividade, o app seria inutilizável no celular — onde estão os usuários.

**JavaScript dá vida e consome a API.** Quando o cliente abre a tela de restaurantes, o **JavaScript busca os dados da API** (`GET /restaurantes` — [[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) e **preenche o DOM** com a lista real (página **dinâmica**). Quando o cliente toca em "adicionar ao carrinho", o JS responde ao **evento de clique**, atualiza o DOM (o carrinho mostra o item, o total muda) **sem recarregar a página**, e quando finaliza, chama `POST /pedidos`. É o JS que transforma a página de um "documento" num "app" interativo.

**A lição de segurança (cliente vs. servidor).** Um dev júnior colocou a validação do cupom **só no JavaScript do front** ("se o cupom for válido, aplica o desconto"). A sênior explicou o perigo: o usuário pode **abrir o DevTools e alterar o JavaScript** que roda no navegador dele — burlando a validação e aplicando descontos falsos. A regra: o front valida para **feedback rápido** (avisar o usuário na hora), mas a validação **de verdade** (que garante a regra) tem que estar **no servidor** ([[73-Autenticacao-e-autorizacao]]), onde o usuário não alcança. Nunca confie no que roda no cliente. E a chave secreta do gateway de pagamento? **Jamais** no front — ficou no servidor, porque tudo no navegador é visível.

Moral: o front-end da SaborExpress usa HTML (estrutura acessível), CSS (identidade visual + responsividade para o celular) e JavaScript (interatividade + consumo da API) — os três pilares que sustentam a experiência do cliente. E a distinção cliente/servidor não é teoria: é o que impede um usuário de burlar regras e o que mantém os segredos seguros.

---

## 🏢 Como isso acontece em uma empresa

- **HTML, CSS e JS são a base inegociável.** Por mais que se use React, Vue ou Angular, tudo compila para HTML/CSS/JS que o navegador entende. Dominar os fundamentos é o que impede o dev de ficar perdido quando o framework "vaza" a complexidade.
- **Responsividade é obrigatória.** A maioria do tráfego web é mobile. "Mobile-first" (projetar primeiro para o celular) é padrão. Um site que não funciona bem no celular é um site quebrado.
- **A distinção cliente/servidor é fundamental para segurança.** Times sérios sabem: nunca confie no cliente, valide no servidor, nunca exponha segredos no front. Falhas aqui são vulnerabilidades reais (Volume 4).
- **Ferramentas do dia a dia:** o **DevTools** do navegador (inspecionar o DOM, ver o CSS, depurar JS, ver as chamadas de API na aba Network) é o companheiro constante do dev front-end.
- **O front-end virou uma disciplina complexa.** O que começou "simples" (HTML/CSS/JS) hoje envolve frameworks, build tools, TypeScript, testes, performance, acessibilidade. Front-end sênior é uma especialização respeitada, não "a parte fácil".
- **SEO e performance importam.** Como o front é o que o usuário (e o Google) veem, velocidade de carregamento e HTML bem estruturado afetam ranking de busca e conversão — assunto de negócio, não só técnico.

---

## ⚠️ Erros comuns

- **`<div>` para tudo (HTML não-semântico).** Usar `<div>` no lugar de `<button>`, `<nav>`, `<h1>` quebra a acessibilidade e o SEO ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]). Use a tag semântica certa.
- **Confiar no cliente para segurança.** Validar/autorizar **só** no front é uma falha grave — o usuário controla o navegador dele e pode burlar tudo. Segurança de verdade é no servidor.
- **Expor segredos no front.** Chaves secretas, senhas no JavaScript do navegador são visíveis para qualquer um. Segredos ficam no servidor.
- **Ignorar a responsividade.** Fazer só para desktop e esquecer o celular — onde está a maioria dos usuários. Projete mobile-first.
- **Misturar tudo (estrutura, estilo, comportamento).** Colocar estilos inline e lógica embolada no HTML dificulta manutenção. Separe HTML (estrutura), CSS (estilo) e JS (comportamento) — a separação de responsabilidades ([[58-MVC-camadas-e-separacao-de-responsabilidades]]) também vale no front.
- **Achar que o framework dispensa os fundamentos.** Pular HTML/CSS/JS e ir direto para o React gera devs que ficam perdidos quando algo foge do "caminho feliz" do framework. A base é essencial.
- **Bloquear a renderização com JS pesado.** JavaScript demais ou mal carregado deixa a página lenta e "travada". Performance no front é experiência do usuário.

---

## 💡 Dicas profissionais

- **Domine HTML, CSS e JS antes (ou junto) dos frameworks.** Eles são a base de tudo. Quando você entende o trio, os frameworks fazem sentido e você não fica refém deles.
- **Use HTML semântico sempre.** A tag certa (`<button>`, `<nav>`, `<h1>`) traz acessibilidade e SEO de graça. É a base da UX inclusiva do [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]].
- **Projete responsivo (mobile-first).** Comece pelo celular e expanda para telas maiores. É onde estão seus usuários. Teste em vários tamanhos.
- **Grave a regra: nunca confie no cliente.** Valide no front para feedback, mas a validação/autorização/regras de verdade ficam no servidor. E segredos jamais no navegador.
- **Aprenda o DevTools do navegador a fundo.** Inspecionar o DOM, editar CSS ao vivo, depurar JS, ver as chamadas de API (Network). É a ferramenta mais poderosa do front-end.
- **Separe estrutura, estilo e comportamento.** HTML para o quê, CSS para a aparência, JS para o comportamento. Não embole os três — a manutenção agradece.
- **Pense em performance e acessibilidade desde o início.** Página rápida e acessível é melhor UX (e melhor negócio). Não deixe para "otimizar depois".

---

## 🎈 Curiosidades

- A web foi criada por **Tim Berners-Lee** em 1989-1991 no **CERN** (o laboratório de física de partículas na Suíça). O HTML, o HTTP e a primeira URL nasceram ali — e ele **abriu mão de patenteá-los**, doando a web ao mundo. É por isso que a web é livre e universal.
- O **CSS** foi proposto em 1994 para separar a **apresentação** da **estrutura** — antes dele, a formatação era misturada no HTML, um caos. Essa separação (estrutura vs. estilo) é o mesmo princípio de "separação de responsabilidades" que atravessa toda a engenharia ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- O **JavaScript** foi criado por **Brendan Eich** em **10 dias**, em 1995, na Netscape. O nome foi puro marketing (para pegar carona na fama do Java, uma linguagem **completamente diferente**) — a confusão "Java vs. JavaScript" persiste até hoje. Apesar da pressa da criação, virou uma das linguagens mais usadas do mundo.
- O **DOM** é o motivo de o mesmo site poder ser interativo: sem uma representação manipulável da página na memória, o JavaScript não teria como mudar o que você vê sem recarregar tudo. A técnica de atualizar só partes da página (AJAX, nos anos 2000) revolucionou a web e abriu caminho para os apps web modernos.
- Existe um princípio chamado **"progressive enhancement"** (aprimoramento progressivo): construir a página para funcionar com HTML básico primeiro, e ir **adicionando** CSS e JS por cima — de modo que ela funcione (mesmo que simples) mesmo se o JS falhar. É uma filosofia de robustez e acessibilidade.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Front-end** | A camada que roda no navegador; a interface com o usuário. |
| **HTML** | Linguagem que define a estrutura e o conteúdo da página (tags). |
| **CSS** | Linguagem que define a aparência (cores, fontes, layout). |
| **JavaScript** | Linguagem de programação do navegador; dá comportamento/interatividade. |
| **DOM** | A árvore de objetos da página que o JS manipula. |
| **Renderização** | O navegador desenhar a página na tela a partir do DOM+CSS. |
| **Tag / elemento** | Uma peça do HTML (`<h1>`, `<button>`, `<img>`). |
| **HTML semântico** | Usar a tag certa para cada função (acessibilidade, SEO). |
| **Responsivo** | A página se adapta ao tamanho da tela (celular, desktop). |
| **Cliente vs. servidor** | O que roda no navegador vs. no servidor. |
| **Estático vs. dinâmico** | Página fixa vs. montada com dados que mudam (da API). |

---

## 📝 Resumo

- O **front-end** é a camada que roda no **navegador** (o cliente) e com que o usuário interage, comunicando-se com o back-end via **API** (modelo cliente-servidor).
- Ele é construído sobre **três pilares**: **HTML** (estrutura — o que existe), **CSS** (estilo — como parece), **JavaScript** (comportamento — como reage). Todo framework roda sobre esse trio.
- O navegador transforma o HTML no **DOM** (árvore de objetos), aplica o CSS, renderiza, e o **JavaScript** manipula o DOM para tornar a página interativa e dinâmica — buscando dados da API e atualizando a tela sem recarregar.
- A distinção **cliente vs. servidor** é crucial para **segurança**: nunca confie no que roda no navegador (o usuário pode alterá-lo), valide/autorize no **servidor**, e **nunca** exponha segredos no front.
- **HTML semântico** (acessibilidade/SEO) e **design responsivo** (mobile-first) são obrigatórios. Dominar os fundamentos HTML/CSS/JS é o que impede o front-end de virar mágica incompreensível — e o que faz os frameworks fazerem sentido.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é o front-end e sua relação com o back via API.
- [ ] Sei o papel de HTML, CSS e JavaScript (estrutura, estilo, comportamento).
- [ ] Entendo o que é o DOM e como o JS o manipula.
- [ ] Diferencio o que roda no cliente do que roda no servidor (e as implicações de segurança).
- [ ] Sei por que HTML semântico e responsividade importam.
- [ ] Entendo como o front consome a API para virar um app dinâmico.

---

## ✏️ Exercícios

**1.** Com a analogia da casa, explique o papel do HTML, do CSS e do JavaScript numa página web.

**2.** Classifique cada tarefa como **HTML**, **CSS** ou **JavaScript**: (a) deixar o título em laranja; (b) definir que existe um botão "comprar"; (c) fazer o carrinho atualizar ao clicar; (d) organizar os cards em três colunas no desktop.

**3.** O que é o **DOM** e qual a sua relação com o JavaScript?

**4.** Por que validar um cupom de desconto **apenas** no JavaScript do front-end é uma falha de segurança? Onde a validação de verdade deve estar?

**5. (Reflexão)** Explique como a tela de restaurantes da SaborExpress usa os três pilares juntos, incluindo o momento em que o JavaScript consome a API. Por que essa página é "dinâmica" e não "estática"?

---

## 💬 Respostas comentadas

**1.** O **HTML** é a **estrutura da casa** — as paredes, portas e cômodos: define o que existe na página e onde (um título aqui, um botão ali). O **CSS** é a **decoração e o acabamento** — a cor das paredes, o piso, os móveis: define como as coisas **parecem** (cores, fontes, layout), sem mudar a estrutura. O **JavaScript** é a **parte elétrica/automática** — a luz que acende ao apertar o interruptor, o alarme: dá **comportamento**, fazendo a página **reagir** (responder a cliques, buscar dados, atualizar a tela). Os três juntos formam a página, e o navegador é quem monta e roda tudo.

**2.** (a) **CSS** — cor é aparência. (b) **HTML** — definir que um elemento (botão) existe é estrutura. (c) **JavaScript** — reagir a um clique e atualizar a tela é comportamento. (d) **CSS** — organizar o layout (colunas, responsividade) é apresentação.

**3.** O **DOM (Document Object Model)** é a **representação em árvore** da página que o navegador cria na memória a partir do HTML — uma versão "viva" e manipulável da estrutura da página. Sua relação com o JavaScript é central: o JS **lê e modifica o DOM** para mudar a página dinamicamente. Quando você clica em "adicionar ao carrinho" e o item aparece na tela sem recarregar, foi o JavaScript **alterando o DOM** (adicionando o elemento, mudando o total), e o navegador re-renderizando a parte afetada. Sem o DOM, o JS não teria como "mexer" na página.

**4.** Porque o JavaScript do front-end **roda no navegador do usuário**, e o usuário tem **controle total** sobre o que roda ali — ele pode abrir o DevTools e **alterar ou desativar** essa validação, aplicando um cupom inválido ou um desconto que não deveria existir (o front está "na mão dele"). Ou seja, qualquer regra que dependa só do cliente pode ser **burlada**. A validação **de verdade** — a que realmente garante a regra de negócio — deve estar **no servidor** (back-end), onde o usuário não tem acesso e não pode alterar o código. O front pode validar também, mas apenas para dar **feedback rápido** ao usuário (avisar na hora, sem esperar o servidor); a decisão que vale é a do servidor.

**5.** A tela de restaurantes usa os três pilares assim: o **HTML** define a estrutura — um título, uma lista de restaurantes, cada um com foto, nome e um botão (com HTML semântico, para acessibilidade). O **CSS** dá a identidade visual (o laranja da marca, a tipografia) e a **responsividade** (uma coluna no celular, três no desktop). O **JavaScript** dá vida: ao abrir a tela, ele **consome a API** (`GET /restaurantes`) para buscar a lista **real** de restaurantes e **preenche o DOM** com esses dados; depois, responde aos cliques do usuário (abrir um restaurante, adicionar ao carrinho) atualizando o DOM sem recarregar. A página é **dinâmica** (e não estática) justamente porque seu conteúdo **não é fixo no HTML** — ele é **montado em tempo real** com dados que vêm da API e que mudam (novos restaurantes, disponibilidade, preços). Uma página estática teria o mesmo HTML fixo sempre; a da SaborExpress se monta conforme os dados atuais do servidor.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[77-Frameworks-de-front-end]] — React, Vue, Angular e o pensamento em componentes.
- **Aplicação:** [[78-Ligando-front-end-a-experiencia-do-usuario]] — estado, dados da API e telas que respondem.
- **Base:** [[29-O-que-acontece-quando-voce-digita-google-ponto-com]] (Vol. 2), [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] (a API consumida) e [[30-Logica-de-programacao-sem-trauma]] (Vol. 2 — a lógica do JS).
- **UX/segurança:** [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]] (HTML semântico) e [[73-Autenticacao-e-autorizacao]] (validação no servidor).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 22 → **Capítulo 76 de 119**.
