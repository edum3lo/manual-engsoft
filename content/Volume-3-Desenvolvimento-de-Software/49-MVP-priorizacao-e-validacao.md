# Capítulo 49 — MVP, priorização e validação

> **Volume 3 — Desenvolvimento de Software** · Módulo 13 — Engenharia de Requisitos
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é um **MVP** (Produto Mínimo Viável) — e o que ele **não** é.
- Aplicar técnicas de **priorização**: **MoSCoW**, **RICE** e o modelo **Kano**.
- Compreender o ciclo **Construir → Medir → Aprender** e o conceito de **validação**.
- Diferenciar **produto viável** de "produto capado" e reconhecer as metáforas do "skateboard" e do "sorriso".
- Ligar priorização a estimativas e prazo: quando o tempo aperta, corta-se **escopo**, não qualidade.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante–Intermediário (2,5/5).**

---

## ✅ Pré-requisitos

- Ter lido [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]] — priorizamos as histórias que ali escrevemos.
- Ajuda ter lido [[41-Modelos-de-processo-de-desenvolvimento]] — MVP é a semente do iterativo/incremental.

---

## 📖 Introdução

Você tem um backlog cheio de histórias, todas parecendo importantes, e um prazo que não estica. A pergunta agora é a mais estratégica de todas: **o que construir primeiro — e o que não construir?** Responder a isso é priorizar, e priorizar bem é o que separa produtos que chegam ao mercado dos que morrem "quase prontos".

No centro dessa disciplina está uma das ideias mais poderosas e mais **mal entendidas** da tecnologia: o **MVP — Produto Mínimo Viável**. Muita gente pensa que MVP é "a versão capada e feia do produto". Não é. MVP é a **menor coisa que você pode construir para aprender** se sua ideia funciona — a menor aposta que gera o maior aprendizado. O objetivo do MVP não é entregar pouco; é **descobrir cedo e barato** se vale a pena entregar muito.

Este capítulo fecha o módulo de requisitos amarrando tudo: você descobriu necessidades (elicitação), escreveu histórias (especificação) e agora aprende a **decidir a ordem** com métodos concretos (MoSCoW, RICE, Kano) e a **validar** as decisões com usuários reais, no ciclo Construir → Medir → Aprender. É aqui que a engenharia encontra a estratégia de produto — e onde você deixa de ser alguém que "faz tarefas" para ser alguém que entende **por que** aquelas tarefas, e não outras.

---

## 🧠 Analogia

Imagine que você quer **abrir um restaurante** e tem uma ideia: comida saudável entregue em casa. Você tem duas formas de testar.

**A forma cara (sem MVP):** você aluga um ponto, compra fogões industriais, contrata dez funcionários, faz um cardápio de 50 pratos e só então abre as portas — para descobrir que o bairro não quer comida saudável, quer pizza. Você quebrou antes de aprender.

**A forma MVP:** você cozinha em casa, monta um cardápio de **3 pratos**, divulga no grupo do bairro e entrega você mesmo de bicicleta por duas semanas. Gasta quase nada. Aprende **rápido**: os pedidos vêm? qual prato vende? as pessoas reclamam de quê? Se der certo, você **cresce com confiança**; se der errado, você perdeu duas semanas, não a poupança da vida.

O MVP não é "o restaurante ruim" — é o **experimento inteligente** que responde à pergunta mais cara ("as pessoas querem isso?") com o menor investimento. Priorizar é decidir quais 3 pratos entram no cardápio inicial. Validar é olhar os pedidos e as reclamações. Guarde essa cena: MVP é sobre **aprender barato**, não sobre entregar pouco.

---

## 🧩 Conceitos fundamentais

### 1. MVP — Produto Mínimo Viável

**MVP** (do inglês *Minimum Viable Product*), popularizado por Eric Ries no *Lean Startup*, é a versão mais simples do produto que **já entrega valor real** e permite **aprender** com usuários reais. As duas palavras importam igualmente:
- **Mínimo:** o menor esforço possível.
- **Viável:** precisa **funcionar** e resolver o problema de verdade — senão o aprendizado é falso.

> **Termo explicado — MVP (Produto Mínimo Viável):** a menor versão do produto que entrega valor real e permite validar hipóteses com usuários reais, com o mínimo de esforço.

### 2. A metáfora do skateboard (o MVP feito certo)

A imagem mais famosa (de Henrik Kniberg) mostra a diferença entre construir **incrementalmente errado** e **certo**:

```
ERRADO (não é MVP — são peças inúteis até o fim):
  roda → eixo → chassi → carro
  (nas três primeiras entregas, o cliente não pode ir a lugar nenhum)

CERTO (MVP — cada entrega leva o cliente de A a B):
  skate → patinete → bicicleta → moto → carro
  (desde a 1ª entrega, o cliente já se locomove — e dá feedback)
```

A lição: um MVP é uma **fatia vertical** que **já funciona de ponta a ponta**, ainda que humilde. Meia roda não transporta ninguém; um skate, sim. O erro clássico é entregar "meio produto" (peças que não servem sozinhas) achando que é MVP.

### 3. MoSCoW — priorização por obrigatoriedade

**MoSCoW** classifica cada item em quatro baldes:
- **M**ust have — **precisa** ter; sem isso o produto não funciona/não lança.
- **S**hould have — **deveria** ter; importante, mas o produto sobrevive sem por um tempo.
- **C**ould have — **poderia** ter; bom se sobrar tempo.
- **W**on't have (now) — **não** vai ter agora; explicitamente fora deste ciclo.

> **Termo explicado — MoSCoW:** técnica de priorização que separa itens em Must, Should, Could e Won't have, deixando claro o que é essencial e o que fica de fora.

O poder do MoSCoW está no **W**: dizer explicitamente "isso **não** entra agora" é o que protege o MVP de inchar. Priorizar é, acima de tudo, **decidir o que não fazer**.

### 4. RICE — priorização por pontuação

**RICE** dá uma nota numérica a cada ideia, útil quando há muitos itens competindo:
- **R**each (alcance): quantas pessoas isso afeta por período?
- **I**mpact (impacto): o quanto melhora a vida de cada uma? (escala, ex.: 0,25 a 3)
- **C**onfidence (confiança): quão seguros estamos dos números? (%)
- **E**ffort (esforço): quanto custa fazer? (em pessoas-mês)

$$\text{RICE} = \frac{\text{Reach} \times \text{Impact} \times \text{Confidence}}{\text{Effort}}$$

Quanto maior a nota, maior a prioridade. A graça é forçar a comparar **valor** (numerador) contra **custo** (denominador), evitando priorizar o que é fácil mas pouco importante — ou o que é impactante mas caríssimo.

### 5. Kano — priorização por satisfação

O modelo **Kano** classifica funcionalidades pelo efeito na **satisfação** do usuário:
- **Básicas (obrigatórias):** ninguém elogia se tem, todos reclamam se falta (ex.: o app abrir). São pré-requisito.
- **Lineares (de desempenho):** quanto mais/melhor, mais satisfação (ex.: entrega mais rápida).
- **Atrativas (encantadoras):** surpreendem positivamente; ninguém pediu, mas encantam (ex.: acompanhar o entregador no mapa em tempo real).

Kano lembra que gastar tudo só no "básico" não encanta, e que um toque "atrativo" bem escolhido diferencia o produto.

### 6. Validação — Construir, Medir, Aprender

**Validar** é confirmar, com **evidência real**, se a hipótese estava certa — em vez de confiar na opinião. O ciclo do Lean Startup é **Construir → Medir → Aprender**: você constrói o MVP (menor experimento), **mede** o comportamento real dos usuários (dados, não achismo), e **aprende** — decidindo **perseverar** (seguir) ou **pivotar** (mudar a direção).

> **Termo explicado — validação:** confirmar uma hipótese sobre o produto com dados/comportamento real de usuários, não com opinião. **Pivô:** mudança de direção estratégica após aprender que a hipótese estava errada.

---

## ⚙️ Como funciona na prática

Veja a priorização acontecendo de verdade, do backlog ao lançamento:

**1. Defina a hipótese central.** Antes de priorizar features, pergunte: qual é a **aposta mais arriscada** do produto? Para a SaborExpress: "as pessoas vão pedir comida por um app novo em vez do concorrente estabelecido?". O MVP existe para testar **isso**, não para ter muitas telas.

**2. Aplique MoSCoW ao backlog.** Marque cada história. **Must:** ver restaurantes, montar carrinho, finalizar pedido. **Should:** cupom, avaliação. **Could:** programa de fidelidade. **Won't (now):** chat com entregador. O MVP = os **Must**.

**3. Desempate com RICE quando necessário.** Se dois "Should" competem pela próxima sprint, o RICE ajuda: "notificação de status" (alto alcance, baixo esforço) ganha de "tema escuro" (baixo impacto).

**4. Garanta que é uma fatia vertical (skateboard).** O MVP precisa funcionar de **ponta a ponta**. "Só a tela de busca, sem finalizar pedido" é meia-roda; "buscar → carrinho → finalizar (pagamento na entrega)" é o skate que já leva o cliente de A a B.

**5. Construa, meça, aprenda.** Lance para um grupo pequeno. **Meça**: quantos concluem um pedido? onde abandonam? Descobre-se que 40% largam na tela de cadastro obrigatório. **Aprende-se**: permitir pedir como convidado. Isso repriorizada o backlog — a validação **muda o plano**, como manda o ágil.

**6. Quando o prazo aperta, corte escopo — não qualidade.** Se o lançamento precisa antecipar, remova **Could** e **Should** (menos features), nunca os testes ou a estabilidade dos **Must**. Cortar qualidade cria dívida técnica ([[57-O-que-e-arquitetura-de-software]] e Volume 4) que cobra juros depois. Esta é a ligação direta com estimativas ([[45-Estimativas-planejamento-e-ferramentas]]): a variável de ajuste é **o quê**, não **quão bem**.

---

## 🍔 Aplicação na SaborExpress

A Ana queria lançar com **tudo**: fidelidade, chat, cupons, avaliações, filtros avançados. O time fez o exercício de priorização e a convenceu a lançar um **MVP de verdade**.

**MoSCoW do lançamento:**
- **Must:** buscar restaurantes, montar carrinho, finalizar pedido, o restaurante receber e aceitar. (Sem isso, não existe delivery.)
- **Should:** notificação de status do pedido, cupom de primeira compra.
- **Could:** avaliações com estrelas.
- **Won't (now):** programa de fidelidade, chat com entregador, pagamento in-app (no MVP, paga-se na entrega).

**A fatia vertical (skateboard):** o MVP não foi "a tela de busca linda sem checkout". Foi o **fluxo inteiro humilde**: o cliente acha 8 restaurantes de um bairro, monta o carrinho, finaliza, paga na entrega, e o restaurante recebe no tablet. Feio, limitado a um bairro — mas **funcional de ponta a ponta**. Já levava o cliente de A a B.

**Construir → Medir → Aprender:** em 3 semanas, o MVP foi para 60 clientes. Os dados mostraram: (1) 35% abandonavam por causa do **cadastro obrigatório** → o time priorizou "pedir como convidado"; (2) o cupom de primeira compra **dobrou** a conversão → virou Must nas próximas praças; (3) **ninguém** sentiu falta do chat → confirmou que "Won't now" foi acerto. A hipótese central ("as pessoas pedem por um app novo?") foi **validada** num bairro antes de a Ana gastar o caixa expandindo.

O resultado: a SaborExpress cresceu apostando no que os **dados** confirmaram, não no que a Ana **imaginava**. E quando o prazo de uma feira de investidores apertou, o time cortou "avaliações" (Could), não a estabilidade do checkout (Must) — porque um checkout que falha na demo mataria a rodada, enquanto a falta de estrelas ninguém notaria.

---

## 🏢 Como isso acontece em uma empresa

- **MoSCoW é onipresente em planejamento.** Você ouvirá "isso é must ou should?" constantemente. É a linguagem comum para negociar escopo entre produto, engenharia e negócio.
- **RICE e afins vivem em planilhas de roadmap.** PMs pontuam iniciativas para justificar a ordem do roadmap com números, não com "eu acho". Há variações: **ICE** (sem Reach), **WSJF** (usado no SAFe), **value vs. effort** (matriz 2x2).
- **MVP virou palavra de ordem — e clichê.** Toda startup fala em MVP; nem toda entende. O anti-padrão comum é chamar de "MVP" um produto capado e sem qualidade, gerando aprendizado falso (as pessoas rejeitam pela execução ruim, não pela ideia).
- **Validação = experimentação.** Em empresas maduras, valida-se com **A/B testing, feature flags e métricas de produto** (Volume 4). O MVP é a primeira forma de validação; depois vem a experimentação contínua.
- **"Cortar escopo, não qualidade" é mantra de time sênior.** Sob pressão de prazo, o instinto do iniciante é pular testes e revisar menos; o do sênior é remover funcionalidades e negociar o "o quê". Saber isso te destaca.
- **Priorização é onde mora o poder.** Quem decide a ordem do backlog (o PO) tem enorme influência sobre o produto. Devs que entendem priorização participam dessa conversa em vez de só executá-la.

---

## ⚠️ Erros comuns

- **Achar que MVP = produto ruim/capado.** MVP é **viável** — precisa funcionar e resolver o problema. Um MVP quebrado gera aprendizado falso.
- **Construir "meia roda" e chamar de MVP.** Entregar peças que não servem sozinhas (só o back-end, só a tela) não é MVP. MVP é uma **fatia vertical** que funciona de ponta a ponta.
- **Priorizar tudo como "Must".** Se tudo é essencial, nada é. Um MoSCoW sem itens em "Won't" não priorizou nada — só disfarçou a indecisão.
- **Priorizar pelo que é fácil, não pelo que importa.** Fazer primeiro o simples (mesmo que pouco valioso) infla a sensação de progresso sem entregar valor. RICE existe para combater isso.
- **Não validar — confiar na opinião.** Construir muito antes de medir é apostar sem olhar a mesa. Meça comportamento real; opinião (inclusive a sua) engana.
- **Cortar qualidade sob pressão de prazo.** Pular testes e revisões para "entregar mais rápido" cria dívida técnica que cobra juros e derruba o produto depois. Corte **escopo**.
- **Ter medo de pivotar.** Quando os dados dizem que a hipótese estava errada, insistir por orgulho queima recursos. Pivotar cedo é sinal de maturidade, não de fracasso.

---

## 💡 Dicas profissionais

- **Comece pela hipótese mais arriscada.** O MVP deve testar a aposta que, se falsa, mata o produto. Não gaste o MVP em detalhes; gaste-o na dúvida que mais importa.
- **Use o "Won't have" como escudo.** Deixar explícito o que **não** entra agora protege o time da pressão de inchar o escopo. "Não é não fazer nunca; é não fazer agora."
- **Garanta a fatia vertical.** Antes de fatiar, pergunte: "essa entrega, sozinha, leva o usuário de A a B?". Se não leva, não é um incremento útil — é uma peça solta.
- **Defina a métrica de sucesso *antes* de lançar.** "Vamos considerar validado se 30% concluírem um pedido." Sem métrica definida antes, você racionaliza qualquer resultado como sucesso.
- **Quando o prazo apertar, negocie escopo com dados.** "Se cortarmos fidelidade e avaliações (Could), entregamos os Must com qualidade no prazo." Isso é muito mais forte que prometer o impossível e falhar.
- **Reavalie a prioridade a cada aprendizado.** O backlog é vivo. O que era Should pode virar Must depois que os dados mostram que os usuários adoram. Priorização não é decisão única; é contínua.

---

## 🎈 Curiosidades

- O termo **MVP** foi cunhado por **Frank Robinson** em 2001 e popularizado por **Eric Ries** no livro *The Lean Startup* (2011), que trouxe o ciclo **Build-Measure-Learn**.
- Vários produtos gigantes começaram como MVPs quase constrangedores: o **Dropbox** validou a ideia com um **vídeo** demonstrando o produto antes de construí-lo; o **Airbnb** começou com os fundadores alugando colchões infláveis na própria sala; a **Zappos** testou vender sapatos online **sem estoque**, comprando na loja física a cada pedido.
- A metáfora do **skateboard** (carro vs. skate→patinete→bici) foi criada por **Henrik Kniberg** e virou a imagem mais compartilhada para explicar MVP e entrega incremental.
- **MoSCoW** foi criado por **Dai Clegg** (Oracle) nos anos 1990. Os "o" minúsculos são só para o acrônimo soar como a cidade de Moscou — não significam nada.
- Existe uma evolução do MVP chamada **MLP (Minimum Lovable Product)** e **MMP (Minimum Marketable Product)**: reação ao excesso de MVPs "mínimos e sem alma", defendendo que o mínimo também precisa **encantar** (o lado "atrativo" do Kano).

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **MVP** | Menor versão do produto que entrega valor e permite aprender com usuários reais. |
| **Viável** | O MVP precisa funcionar de verdade — senão o aprendizado é falso. |
| **Fatia vertical** | Entrega que funciona de ponta a ponta (o "skate", não a "meia roda"). |
| **MoSCoW** | Priorização em Must / Should / Could / Won't have. |
| **RICE** | Pontuação = (Reach × Impact × Confidence) ÷ Effort. |
| **Modelo Kano** | Classifica features por satisfação: básicas, lineares, atrativas. |
| **Build-Measure-Learn** | Ciclo de construir o MVP, medir o real e aprender. |
| **Validação** | Confirmar uma hipótese com dados/comportamento real, não opinião. |
| **Pivô** | Mudar a direção estratégica após aprender que a hipótese era errada. |
| **Dívida técnica** | O "juro" acumulado por cortar qualidade para entregar rápido. |

---

## 📝 Resumo

- **Priorizar** é decidir o que construir primeiro **e o que não construir**. É a atividade mais estratégica de um produto.
- O **MVP** é a menor versão **viável** que permite **aprender** com usuários reais — não um produto capado. Ele deve ser uma **fatia vertical** que funciona de ponta a ponta (o skate, não a meia roda).
- **MoSCoW** (Must/Should/Could/Won't) separa o essencial do supérfluo; o **"Won't now"** protege o escopo. **RICE** pontua valor ÷ esforço; **Kano** classifica por satisfação (básica, linear, atrativa).
- **Validar** é confirmar hipóteses com **dados reais** no ciclo **Construir → Medir → Aprender**, decidindo perseverar ou **pivotar** — não confiar na opinião.
- Quando o prazo aperta, corta-se **escopo** (features), nunca **qualidade** (testes, estabilidade), para não criar dívida técnica.
- Priorização é contínua: o backlog é vivo e reordena conforme o aprendizado.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é um MVP e por que ele **não** é um produto capado.
- [ ] Reconheço uma fatia vertical (skateboard) e sei por que "meia roda" não é MVP.
- [ ] Aplico MoSCoW e uso o "Won't have" para proteger o escopo.
- [ ] Calculo e interpreto uma nota RICE.
- [ ] Entendo o modelo Kano (básica, linear, atrativa).
- [ ] Descrevo o ciclo Construir → Medir → Aprender e sei o que é pivotar.
- [ ] Sei que, sob pressão, se corta escopo, não qualidade.

---

## ✏️ Exercícios

**1.** Explique, com suas palavras, por que um MVP "que não funciona direito" gera **aprendizado falso**.

**2.** Classifique em **MoSCoW** para o lançamento de um app de banco digital: (a) transferir dinheiro; (b) tema escuro; (c) login seguro; (d) cartão virtual; (e) programa de pontos. Justifique os "Must".

**3.** Duas ideias competem: **A** afeta 10.000 usuários/mês, impacto 2, confiança 80%, esforço 2; **B** afeta 1.000 usuários/mês, impacto 3, confiança 100%, esforço 1. Calcule o RICE de cada e diga qual priorizar.

**4.** Usando a metáfora do skateboard, explique a diferença entre um MVP e "entregar metade do produto". Dê um exemplo próprio.

**5. (Reflexão)** O prazo da SaborExpress para uma feira de investidores foi antecipado em duas semanas. O time não vai conseguir entregar tudo. Como você usaria priorização para decidir o que cortar, e por que **não** cortaria qualidade dos itens que ficarem?

---

## 💬 Respostas comentadas

**1.** Porque, se o MVP está quebrado ou é difícil de usar, os usuários vão rejeitá-lo **pela execução ruim**, não pela **ideia**. Você conclui "as pessoas não querem isso" quando, na verdade, elas não quiseram *aquela versão defeituosa*. O MVP precisa ser **viável** (funcionar e resolver o problema) justamente para que o feedback seja sobre a hipótese que você quer testar, e não sobre bugs. Aprendizado falso leva a decisões erradas: matar uma boa ideia ou pivotar sem necessidade.

**2.** (a) **Must** — sem transferir, não é um banco. (b) **Could** — cosmético, não impede o uso. (c) **Must** — sem login seguro, o produto é inviável (e ilegal) para dinheiro. (d) **Should** — muito desejável, mas dá para lançar sem por um tempo. (e) **Won't (now)** — fidelização vem depois de o essencial funcionar. Os **Must** (transferir + login seguro) são o que torna o produto minimamente um banco utilizável e confiável; sem eles não há produto.

**3.** RICE(A) = (10000 × 2 × 0,8) ÷ 2 = 16000 ÷ 2 = **8000**. RICE(B) = (1000 × 3 × 1,0) ÷ 1 = 3000 ÷ 1 = **3000**. **A** tem nota bem maior, então prioriza-se **A** — apesar de B ter impacto e confiança individuais maiores, o alcance muito superior de A (e o custo ainda razoável) faz seu valor total por esforço vencer. O RICE evita o erro de priorizar B só porque parece "mais impactante por usuário".

**4.** No skateboard, o MVP é o **skate**: humilde, mas transporta a pessoa de A a B **desde a primeira entrega** — funciona de ponta a ponta. "Metade do produto" é a **meia roda** ou o **chassi sem rodas**: uma peça que não serve para nada sozinha, e o usuário só consegue usar quando tudo estiver pronto no fim. Exemplo próprio: num app de estudos, o MVP é "escolher um assunto → ver 5 questões → corrigir" (fluxo completo, poucos assuntos); "metade" seria entregar só o banco de questões sem tela de responder — inútil para o estudante até o resto ficar pronto.

**5.** Eu revisitaria o **MoSCoW**: os **Must** (fluxo que faz a demo funcionar de ponta a ponta — buscar, pedir, o restaurante receber, o pagamento não falhar) ficam; corto primeiro os **Could** (ex.: avaliações) e, se preciso, os **Should** (ex.: cupom), deixando explícito que é "por agora". Assim entrego menos **features**, mas todas **sólidas**. Eu **não** cortaria qualidade dos itens que ficam porque, numa feira de investidores, um checkout que **trava na demo** é fatal — destrói a confiança e a rodada — enquanto a ausência de uma feature secundária passa despercebida. Cortar qualidade também cria dívida técnica que cobraria juros logo depois. A variável de ajuste certa é o **escopo** (o quê), não o **quão bem**.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]] — as histórias que aqui priorizamos.
- **Próximo (linear):** [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]] — começa o módulo de UX, o design do que foi priorizado.
- **Base:** [[41-Modelos-de-processo-de-desenvolvimento]] (iterativo/incremental) e [[45-Estimativas-planejamento-e-ferramentas]] (cortar escopo, não qualidade).
- **Aplicação futura:** Volume 4 (A/B testing, feature flags, métricas de produto) — a validação vira experimentação contínua; e Volume 5 (modelos de negócio e métricas).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 13 → **Capítulo 49 de 119**.
