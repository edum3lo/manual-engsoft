# Capítulo 64 — Pull Requests, code review e issues

> **Volume 3 — Desenvolvimento de Software** · Módulo 18 — GitHub e colaboração
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é um **Pull Request (PR)** e o fluxo completo de contribuição.
- Compreender o **code review**: por que existe, o que se olha, e como dar e receber feedback.
- Usar **issues** para rastrear tarefas e bugs, e ligá-las a PRs.
- Escrever um bom PR (pequeno, descritivo) e ser um bom revisor (respeitoso, construtivo).
- Reconhecer o code review como ferramenta de **qualidade e aprendizado**, não de julgamento.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (2,5/5).**

---

## ✅ Pré-requisitos

- Ter lido [[62-Branches-merge-conflitos-e-estrategias]] e [[63-GitHub-GitLab-e-Bitbucket]] — branches e a plataforma.
- Ajuda ter visto [[16-Um-dia-na-vida-de-um-dev]] (Vol. 2), onde o PR aparece na rotina.

---

## 📖 Introdução

Você aprendeu a trabalhar em branches (isolado) e a hospedar código numa plataforma. Agora vem o mecanismo que **une** os dois e forma o coração da colaboração moderna: o **Pull Request (PR)**. Um PR é um pedido formal — *"revisem estas mudanças e, se estiverem boas, integrem na `main`"*. Ele é a porta pela qual **todo** código passa antes de entrar num projeto sério. Se há um único ritual que define o desenvolvimento profissional em equipe, é este.

O PR existe para viabilizar o **code review** (revisão de código): antes de uma mudança entrar no projeto, **outra pessoa a lê**, comenta, sugere melhorias e aprova. Isso não é burocracia nem desconfiança — é a prática que mais previne bugs, dissemina conhecimento e mantém a qualidade do código ao longo do tempo. Estudos mostram que o code review pega defeitos que testes automatizados não pegam, e é uma das ferramentas de aprendizado mais poderosas que existem: você melhora **vendo** como os outros escrevem e **recebendo** feedback sobre o seu código.

Há também uma dimensão **humana** crucial, que ninguém ensina e que separa profissionais maduros dos imaturos: como **dar** e **receber** feedback sobre código sem que vire briga de ego. Code review mal feito (comentários ríspidos, ataques pessoais) envenena times; bem feito, cria confiança e faz todos crescerem. Este capítulo fecha o módulo de colaboração ensinando o fluxo do PR, o que se olha numa revisão, como issues organizam o trabalho, e — talvez o mais importante — a **etiqueta** de revisar código como gente que respeita gente.

---

## 🧠 Analogia

Pense na **revisão de um artigo antes de ser publicado numa revista**.

Um jornalista escreve uma matéria (o **código** na sua branch). Antes de ir para a impressão (a **`main`**), ela não vai direto: passa por um **editor** que **lê**, aponta trechos confusos, sugere cortes, pega um erro factual, confirma que está no padrão da revista (o **code review**). O jornalista revisa conforme o feedback, e só quando o editor **aprova** a matéria é publicada. Esse processo não existe porque o editor desconfia do jornalista — existe porque **quatro olhos veem mais que dois**, e porque a revista tem uma reputação de qualidade a manter.

O **Pull Request** é o "envio da matéria para revisão": um pacote com as mudanças propostas, uma descrição do que foi feito, e um convite para o editor revisar. As **issues** são a **pauta** da redação — a lista do que precisa ser escrito e dos problemas a corrigir, cada um com um responsável.

E há a etiqueta: um bom editor comenta o **texto** ("esta frase está ambígua"), não ataca o **autor** ("você escreve mal"); e um bom jornalista recebe o feedback como ajuda, não como ofensa. Guarde: o PR é a matéria enviada para revisão; o code review é o editor melhorando-a antes de publicar; e o respeito mútuo é o que mantém a redação funcionando.

---

## 🧩 Conceitos fundamentais

### 1. O Pull Request (PR)

Um **Pull Request** (chamado **Merge Request** no GitLab) é uma proposta de integrar as mudanças de uma branch em outra (tipicamente na `main`), acompanhada de discussão e revisão. Ele mostra o **diff** (o que mudou), permite comentários **linha a linha**, roda o **CI** (testes automáticos), e só permite o **merge** após aprovação.

> **Termo explicado — Pull Request (PR):** pedido de integrar o trabalho de uma branch na principal, exibindo as mudanças para revisão, discussão e aprovação antes do merge.

O nome "pull request" vem de "peça para puxarem (pull) o seu código para o projeto".

### 2. O fluxo completo de contribuição

```
1. Pegar uma tarefa (issue)
2. Criar uma branch a partir da main  → feature/xyz
3. Trabalhar: commits pequenos e claros
4. Push da branch para o remoto
5. Abrir um PR: descrever o quê e o porquê
6. CI roda (testes, lint) automaticamente
7. Code review: colegas comentam, você ajusta
8. Aprovação (+ CI verde)
9. Merge na main → a issue fecha
10. Apagar a branch
```

Esse ciclo se repete o dia inteiro em qualquer time. Cada mudança — feature, correção, ajuste — percorre esse caminho.

### 3. Code review — o que se olha

**Code review** é a leitura crítica das mudanças por outra pessoa antes do merge. Um bom revisor olha (mais ou menos nesta ordem de importância):

- **Correção:** o código faz o que deveria? Tem bugs? Trata os casos de erro/borda?
- **Legibilidade:** dá para entender? Nomes claros? ([[34-Codigo-limpo]], Vol. 2)
- **Design/arquitetura:** está no lugar certo (camadas — [[58-MVC-camadas-e-separacao-de-responsabilidades]])? Não duplica algo existente?
- **Testes:** as mudanças têm testes? Cobrem os critérios de aceitação?
- **Segurança:** expõe segredos? Valida entradas? (Volume 4)
- **Consistência:** segue os padrões do projeto?

> **Termo explicado — code review:** revisão do código proposto num PR por outra pessoa, buscando bugs, clareza, bom design, testes e segurança, antes de integrá-lo.

O que o code review **não** é: uma checagem de estilo pessoal ("eu faria diferente" não é motivo para bloquear) nem um palco para exibir superioridade.

### 4. Issues — organizar o trabalho

**Issues** são registros de **tarefas, bugs ou melhorias** na plataforma. Cada issue tem título, descrição, responsável (*assignee*), **rótulos** (`bug`, `feature`, `enhancement`), e uma discussão. Elas frequentemente espelham as **histórias de usuário** do backlog ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]).

O elo mágico: PRs e commits **referenciam** issues (`#42`), e frases como **"fecha #42"** (`closes #42`) na descrição do PR fazem a issue **fechar automaticamente** ao mesclar — ligando o trabalho (código) ao planejamento (tarefa) de forma rastreável.

### 5. A etiqueta do code review (o lado humano)

A parte que define times saudáveis:

**Como revisor:**
- Comente o **código**, nunca a **pessoa**. "Esta função pode retornar nulo aqui" ✅; "você não pensou nisso" ❌.
- **Explique o porquê** e sugira, não só aponte. "Que tal extrair isto numa função? Facilita testar." melhor que "isto está ruim".
- Distinga **bloqueante** (bug, falha grave) de **sugestão** (preferência, "nit"/minúcia). Marque as minúcias como opcionais.
- **Elogie** o que está bom. Feedback não é só crítica.

**Como autor:**
- Não leve para o pessoal. O feedback é sobre o **código**, para o bem do projeto.
- Responda, pergunte, discorde com argumentos — mas **sem ego**. Às vezes o revisor está certo; às vezes você está, e explica.
- **Agradeça.** Quem revisou gastou tempo ajudando você.

> **Termo explicado — "nit" (nitpick):** comentário sobre uma minúcia (estilo, nome), marcado como não bloqueante — algo que seria bom ajustar, mas não impede a aprovação.

---

## ⚙️ Como funciona na prática

Um PR da vida real, do abrir ao mesclar:

**1. Abrir o PR direito.** Depois do push da branch, você abre o PR e escreve uma **descrição útil**: *o quê* (o que a mudança faz), *por quê* (o problema/issue que resolve), *como testar*, e "fecha #87". Um PR sem descrição obriga o revisor a adivinhar — má educação profissional. Bônus: prints/GIFs para mudanças visuais.

**2. Manter o PR pequeno.** Esta é a regra de ouro mais violada: **PRs pequenos são revisados bem; PRs gigantes são carimbados sem ler.** Um PR de 50 linhas recebe revisão cuidadosa; um de 2.000 linhas recebe um "LGTM" (looks good to me) preguiçoso porque ninguém consegue revisar aquilo direito. PR pequeno = revisão de verdade = menos bugs.

**3. O CI roda sozinho.** Ao abrir o PR, os testes e o linter rodam automaticamente ([[63-GitHub-GitLab-e-Bitbucket]], Volume 4). Se falham, você corrige antes de pedir revisão humana — não desperdice o tempo do revisor com algo que a máquina já pegaria.

**4. A revisão acontece.** O revisor comenta linha a linha. Você **responde** cada comentário (ajustando o código ou explicando por que fez assim), dá push das correções (que aparecem no mesmo PR), e a conversa converge. Bugs pegos aqui custam **muito** menos que em produção (a curva do custo da mudança, de novo — [[41-Modelos-de-processo-de-desenvolvimento]]).

**5. Aprovar e mesclar.** Com a aprovação **e** o CI verde, o PR é mesclado (muitas vezes com **squash**, achatando os commits num só). A issue fecha, a branch é apagada. Trabalho concluído, rastreável do começo ao fim.

**O valor triplo do code review:** (1) **qualidade** — pega bugs e melhora o design antes de entrar; (2) **aprendizado** — o autor aprende com o feedback, o revisor aprende lendo código dos outros, e todos absorvem os padrões do time; (3) **conhecimento compartilhado** — mais de uma pessoa passa a conhecer cada parte do código (reduz o "só o fulano entende isso"). É por isso que times sérios **não abrem mão** dele.

---

## 🍔 Aplicação na SaborExpress

Na SaborExpress, **nenhuma** linha entra na `main` sem passar por um PR revisado. Veja o processo vivo.

**Um PR bem feito.** A Camila terminou o cupom de primeira compra. Abriu um PR intitulado *"Adiciona cupom de primeira compra (fecha #91)"* com a descrição: o que faz, a regra de não acumular com promoção, e "como testar: criar conta nova, aplicar CUPOM10, verificar desconto". Ela **manteve o PR pequeno** (só o cupom, não misturou outras mudanças) e garantiu que o CI passasse antes de pedir revisão. Resultado: o Diego conseguiu revisar de verdade em 15 minutos.

**O code review que pegou um bug.** Revisando, o Diego notou algo que os testes não pegaram: *"E se o cliente aplicar o cupom, remover todos os itens do carrinho e adicionar de novo? O desconto persiste indevidamente?"* — um caso de borda. Ele comentou na linha específica, **explicando o porquê** e **sugerindo** revalidar o cupom ao mudar o carrinho. A Camila testou, confirmou o bug, corrigiu, deu push. O bug morreu **no PR**, não em produção — onde teria custado clientes pagando errado.

**A etiqueta em ação.** O Diego escreveu: *"Ótima cobertura de testes! 👏 Só uma dúvida na linha 40: e se o carrinho mudar depois do cupom? Acho que a gente precisa revalidar aqui — o que você acha?"*. Repare: elogiou o que estava bom, comentou o **código** (não a Camila), explicou o porquê, e **perguntou** em vez de mandar. A Camila respondeu *"Boa! Não tinha pensado nesse caso. Corrigido, valeu 🙏"*. Zero ego, muito aprendizado. Foi assim que o time construiu confiança — e é o oposto do revisor ríspido que envenena a equipe.

**A minúcia marcada como opcional.** O Diego também comentou *"nit: `calc` poderia se chamar `calcularDesconto` pra ficar mais claro — não bloqueante"*. Ao marcar como **nit**, deixou claro que era preferência, não um impeditivo — a Camila ajustou porque quis, sem sentir que o PR estava "reprovado" por uma minúcia.

**A rastreabilidade.** O PR fechou a issue #91 automaticamente. Meses depois, ao investigar o comportamento do cupom, qualquer pessoa acha: a issue → a discussão → o PR → o code review (com o bug de borda documentado) → os commits. História completa.

Moral: o PR e o code review deram à SaborExpress qualidade (bug pego cedo), aprendizado (a Camila aprendeu um caso de borda) e um time que se respeita — tudo com PRs pequenos, descrições claras e feedback humano.

---

## 🏢 Como isso acontece em uma empresa

- **PR é obrigatório e universal.** Em qualquer time sério, todo código entra por PR revisado. A `main` protegida exige aprovação (às vezes de 2 pessoas) + CI verde antes do merge.
- **O code review é parte do seu dia.** Você revisa PRs dos colegas e tem os seus revisados, todos os dias. É metade do trabalho de colaboração — não um extra.
- **Existem convenções e ferramentas.** **CODEOWNERS** (define quem deve revisar cada parte), templates de PR, aprovações obrigatórias, checks de CI. Comentários usam convenções ("nit:", "blocking:", "question:").
- **PRs pequenos são cultura de times bons.** Times de alta performance incentivam PRs pequenos e frequentes — revisão melhor, merge mais rápido, menos conflito. PRs gigantes são desencorajados.
- **O tom importa muito.** Empresas com boa cultura de engenharia treinam revisão respeitosa. Feedback ríspido é tratado como problema de comportamento — envenena times e afasta gente.
- **Onboarding via review.** Revisar PRs (e ter os seus revisados) é como novos devs aprendem os padrões do time e o código existente, rápido. É a principal ferramenta de aprendizado no trabalho.
- **AI no code review.** Ferramentas (inclusive assistentes de IA) já fazem uma primeira passada nos PRs, pegando problemas óbvios — mas a revisão humana, especialmente de design e contexto, continua central.

---

## ⚠️ Erros comuns

- **PRs gigantes.** O erro nº 1. Ninguém revisa 2.000 linhas com atenção — vira "LGTM" sem leitura. PRs pequenos e focados recebem revisão de verdade.
- **PR sem descrição.** Abrir um PR sem dizer o quê e o porquê obriga o revisor a adivinhar. Descreva sempre; é respeito pelo tempo do outro.
- **Levar o feedback para o pessoal.** O comentário é sobre o **código**, não sobre você. Reagir com ego (defender-se, ofender-se) destrói a colaboração e o aprendizado.
- **Ser um revisor ríspido ou arrogante.** "Isto está errado", "óbvio que não funciona", ataques à pessoa. Envenena o time e faz as pessoas evitarem code review. Comente o código, explique, sugira.
- **Aprovar sem revisar de verdade ("rubber stamp").** Carimbar PRs sem ler anula todo o propósito. Se você não teve tempo de revisar direito, diga — não aprove no escuro.
- **Bloquear por preferência pessoal.** "Eu faria diferente" não é motivo para reprovar. Distinga bug (bloqueante) de estilo (sugestão/nit).
- **Ignorar o CI vermelho.** Pedir revisão humana com os testes falhando desperdiça o tempo do revisor. Deixe o CI verde primeiro.
- **Não responder aos comentários.** Sumir sem endereçar o feedback trava o PR e frustra o revisor. Responda cada comentário (ajustando ou explicando).

---

## 💡 Dicas profissionais

- **Faça PRs pequenos — a dica mais valiosa deste capítulo.** Se a tarefa é grande, quebre em vários PRs. PR pequeno = revisão cuidadosa = menos bugs = merge mais rápido. Todo mundo ganha.
- **Capriche na descrição do PR.** O quê, por quê, como testar, e "fecha #X". Facilita a vida do revisor e serve de documentação futura. Um bom PR se explica sozinho.
- **Revise o seu próprio PR antes de pedir revisão.** Leia o diff como se fosse de outra pessoa. Você vai pegar `console.log` esquecidos, código morto e erros óbvios — poupando o revisor e sua reputação.
- **Como revisor, seja gentil e específico.** Comente o código, explique o porquê, sugira soluções, elogie o bom, marque minúcias como "nit". Você está ajudando um colega, não julgando um réu.
- **Como autor, receba feedback com humildade e curiosidade.** Cada comentário é uma chance de aprender. Discorde com argumentos quando fizer sentido, agradeça sempre. O ego é o inimigo do crescimento.
- **Use o code review para aprender.** Revisar código dos outros te ensina técnicas e padrões; ter o seu revisado te mostra seus pontos cegos. É a academia de ginástica do dev — aproveite os dois lados.
- **Deixe o CI verde antes de pedir revisão humana.** Não gaste o tempo do colega com o que a máquina pega. Corrija os testes/lint primeiro.

---

## 🎈 Curiosidades

- O conceito de **Pull Request** foi popularizado pelo **GitHub** por volta de 2008 e virou tão central que o termo é usado até fora dele (o GitLab chama de "Merge Request", que muitos consideram um nome mais preciso — você **mescla**, não "puxa").
- Estudos clássicos (como os de **Michael Fagan** na IBM, nos anos 1970, sobre inspeção de código) mostraram que a revisão de código pega **mais defeitos** que os testes, e mais barato. A prática é antiga; o PR só a tornou fácil e onipresente.
- **"LGTM"** ("Looks Good To Me" — "para mim está bom") é a sigla mais usada para aprovar um PR. Ironicamente, virou também o símbolo do **anti-padrão** de aprovar sem revisar de verdade.
- O **arquivo CODEOWNERS** permite definir automaticamente quem deve revisar cada parte do código — quando você mexe na pasta de pagamentos, o "dono" daquela área é chamado para revisar. Automatiza a distribuição das revisões.
- Existe uma cultura de **emojis e gentileza** no code review de times saudáveis (👍, 🙏, 👏, "nit:") — pequenos sinais que suavizam o tom de um meio (texto) que facilmente soa ríspido. A famosa convenção **"Conventional Comments"** padroniza isso (praise, nit, suggestion, issue, question).
- Grandes projetos open source recebem milhares de PRs de estranhos do mundo todo — e é o code review dos mantenedores que mantém a qualidade. O Linux, o VS Code, o React: todos crescem via PRs revisados.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Pull Request (PR)** | Pedido de integrar uma branch na principal, com revisão antes do merge. |
| **Merge Request** | O mesmo que PR, no GitLab. |
| **Code review** | Revisão do código proposto por outra pessoa antes de mesclar. |
| **Issue** | Registro de tarefa, bug ou melhoria, com discussão e responsável. |
| **Diff** | As diferenças mostradas no PR (o que mudou). |
| **CI (no PR)** | Testes/lint que rodam automaticamente ao abrir o PR. |
| **LGTM** | "Looks Good To Me" — aprovação (às vezes usada sem revisar de verdade). |
| **Nit (nitpick)** | Comentário sobre minúcia, não bloqueante. |
| **Bloqueante** | Problema (bug, falha) que impede a aprovação até ser resolvido. |
| **Squash merge** | Achatar os commits do PR num só ao mesclar. |
| **CODEOWNERS** | Arquivo que define quem revisa cada parte do código. |

---

## 📝 Resumo

- O **Pull Request (PR)** é o pedido de integrar uma branch na `main`, com **code review** antes do merge. É a porta pela qual todo código passa num projeto sério.
- O **fluxo**: pegar issue → branch → commits → push → abrir PR (descrito) → CI roda → revisão → ajustes → aprovação + CI verde → merge → issue fecha → apagar branch.
- O **code review** olha correção, legibilidade, design, testes e segurança. Seu valor é triplo: **qualidade** (pega bugs cedo), **aprendizado** (autor e revisor crescem) e **conhecimento compartilhado**.
- **Issues** rastreiam tarefas/bugs e se ligam a PRs ("fecha #42"), conectando planejamento e código de forma rastreável.
- A **etiqueta** é essencial: como revisor, comente o **código** (não a pessoa), explique o porquê, sugira, elogie, marque minúcias como "nit"; como autor, receba com humildade, responda e agradeça. E a regra de ouro: **PRs pequenos** recebem revisão de verdade; PRs gigantes viram "LGTM" sem leitura.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o que é um PR e descrevo o fluxo completo de contribuição.
- [ ] Sei o que um revisor olha num code review.
- [ ] Uso issues e sei ligá-las a PRs.
- [ ] Escrevo um PR pequeno e bem descrito.
- [ ] Dou feedback comentando o código, com respeito e sugestões.
- [ ] Recebo feedback com humildade e vejo o review como aprendizado.

---

## ✏️ Exercícios

**1.** Com a analogia da revista, explique o papel do **Pull Request** e do **code review** no caminho do código até a `main`.

**2.** Liste, em ordem, os passos do fluxo de contribuição desde pegar uma issue até apagar a branch.

**3.** Reescreva este comentário de review ríspido para uma versão construtiva: *"Isso está errado, óbvio que vai quebrar. Você não testou?"*.

**4.** Por que **PRs pequenos** recebem revisões melhores que PRs gigantes? O que acontece, na prática, com um PR de 2.000 linhas?

**5. (Reflexão)** No caso da SaborExpress, o code review pegou um bug de borda (cupom persistindo ao esvaziar o carrinho) que os testes não pegaram. Explique o **valor triplo** do code review usando esse exemplo (qualidade, aprendizado, conhecimento compartilhado).

---

## 💬 Respostas comentadas

**1.** O **Pull Request** é como o jornalista **enviar a matéria para revisão** antes de a revista publicá-la: um pacote com as mudanças propostas e uma descrição, convidando o editor a revisar. O **code review** é o **editor lendo** a matéria — apontando trechos confusos, pegando um erro, sugerindo melhorias — antes que ela seja impressa (mesclada na `main`). Assim como a revista não publica sem revisão para manter a qualidade e a reputação, o time não integra código na `main` sem que outra pessoa o revise, porque "quatro olhos veem mais que dois" e a base de código tem qualidade a manter.

**2.** (1) Pegar uma tarefa (issue); (2) criar uma branch a partir da main; (3) trabalhar com commits pequenos e claros; (4) push da branch; (5) abrir o PR com descrição (o quê/porquê/como testar); (6) o CI roda testes e lint; (7) code review — colegas comentam e você ajusta; (8) aprovação + CI verde; (9) merge na main (a issue fecha); (10) apagar a branch.

**3.** Uma versão construtiva: *"Acho que a linha 40 pode quebrar quando o carrinho está vazio — o `total` vira nulo aqui e o cálculo falha. Você poderia adicionar um teste para esse caso? Se eu estiver enganado, me avisa como está tratado 🙂"*. Repare: comenta o **código** (não ataca a pessoa), **explica o porquê** (o total vira nulo), **sugere** uma ação (adicionar teste), e deixa espaço para o autor responder — em vez de acusar ("você não testou?").

**4.** Porque a atenção humana é limitada: um PR **pequeno** (dezenas de linhas) cabe na cabeça do revisor, que consegue entender o contexto, seguir a lógica e pensar em casos de borda — dando feedback real. Um PR **gigante** (milhares de linhas) sobrecarrega o revisor: ninguém consegue revisar tudo com atenção, então, na prática, ele recebe um **"LGTM" preguiçoso** — aprovado sem leitura de verdade. O resultado é que PRs grandes **anulam** o propósito do code review: os bugs passam batido, exatamente o oposto do que a revisão deveria garantir. Por isso "PR pequeno" é a regra de ouro.

**5.** **Qualidade:** o revisor (Diego) pegou um bug de borda — o cupom persistindo ao esvaziar e reencher o carrinho — que os **testes automatizados não cobriam**; o defeito morreu no PR em vez de chegar à produção, onde teria feito clientes pagarem errado (bug caro). **Aprendizado:** a autora (Camila) **aprendeu** um caso de borda que não tinha considerado, e vai lembrar dele em trabalhos futuros; o Diego, ao revisar, também exercita o olhar crítico. **Conhecimento compartilhado:** ao revisar, o Diego passou a **conhecer** a lógica do cupom — agora duas pessoas entendem aquela parte do sistema, reduzindo o risco de "só a Camila sabe como isso funciona". Um único code review entregou os três benefícios ao mesmo tempo — por isso times sérios não abrem mão dele.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[63-GitHub-GitLab-e-Bitbucket]] — a plataforma onde os PRs acontecem.
- **Próximo (linear):** [[65-O-que-e-open-source-e-as-licencas]] — começa o módulo de open source, onde PRs de estranhos movem o mundo.
- **Base:** [[62-Branches-merge-conflitos-e-estrategias]] (branches) e [[34-Codigo-limpo]] (Vol. 2 — o que se busca na revisão).
- **Aplicação:** [[66-Contribuindo-com-projetos-abertos]] (PRs em open source), [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] (testes que o CI roda no PR) e Volume 5 (colaboração humana e feedback).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 18 → **Capítulo 64 de 119**.
