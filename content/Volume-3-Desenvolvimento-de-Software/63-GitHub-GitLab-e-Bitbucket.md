---
title: '63 - GitHub, GitLab e Bitbucket'
---

# Capítulo 63 — GitHub, GitLab e Bitbucket

> **Volume 3 — Desenvolvimento de Software** · Módulo 18 — GitHub e colaboração
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Diferenciar **Git** (a ferramenta) de **GitHub/GitLab/Bitbucket** (as plataformas que hospedam repositórios).
- Entender o que essas plataformas oferecem **além** de hospedar código (issues, PRs, CI/CD, wiki).
- Comparar GitHub, GitLab e Bitbucket e saber onde cada um é mais usado.
- Compreender o papel dessas plataformas como o **centro** da colaboração e do portfólio profissional.
- Configurar o essencial: repositório, remoto, README, e autenticação (SSH/token).

---

## ⏱️ Tempo médio de estudo

**30 a 40 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[60-Controle-de-versao-e-por-que-Git-venceu]] e [[61-Git-no-dia-a-dia]] — Git, remoto, push/pull.
- Ajuda ter lido [[37-Anatomia-de-um-projeto-no-GitHub]] (Vol. 2).

---

## 📖 Introdução

Aqui está a confusão nº 1 de todo iniciante: **Git e GitHub não são a mesma coisa.** O **Git** é a ferramenta de controle de versão que roda na sua máquina (capítulos anteriores). O **GitHub** é um **serviço na nuvem** que **hospeda** repositórios Git e adiciona, por cima, um universo de recursos para colaboração. É a diferença entre "editor de texto" (a ferramenta) e "Google Docs" (o serviço que hospeda documentos e permite colaborar neles). Você pode usar Git sem GitHub — mas quase ninguém o faz, porque as plataformas transformam o Git de ferramenta solitária em **rede de colaboração**.

Essas plataformas — **GitHub**, **GitLab** e **Bitbucket** são as três grandes — são muito mais que "um lugar para guardar código". Elas hospedam o repositório remoto (para onde você dá `push`), mas também oferecem **Pull Requests** (o processo de revisão do próximo capítulo), **issues** (rastreamento de tarefas e bugs), **CI/CD** (automação de testes e deploy — Volume 4), documentação (wiki, README renderizado), controle de acesso, e muito mais. Elas são o **centro de gravidade** de um projeto de software moderno.

E há uma dimensão especialmente importante para você, estudante buscando o primeiro emprego: o **GitHub é o seu portfólio**. Recrutadores olham seu perfil, seus projetos, sua atividade. Um GitHub bem cuidado, com projetos reais e READMEs claros, vale mais que muitas linhas de currículo. Este capítulo abre o módulo de colaboração mostrando o que são essas plataformas, o que oferecem além do Git, como escolher, e como usá-las a seu favor — tanto no trabalho em time quanto na sua carreira.

---

## 🧠 Analogia

Pense na diferença entre **saber cozinhar** e um **restaurante-cozinha compartilhada** (tipo uma cozinha profissional coletiva).

**Git** é saber cozinhar: a habilidade e as ferramentas (facas, panelas) que você usa na sua própria cozinha, sozinho. Você consegue fazer refeições completas só com isso.

**GitHub** é a **cozinha profissional compartilhada** onde vários cozinheiros trabalham juntos: além das bancadas (onde o código fica hospedado), ela tem um **quadro de comandas** (issues) para organizar o que precisa ser feito, um **processo de aprovação** onde um chef prova o prato antes de ir para o cliente (Pull Requests e code review), uma **esteira automática** que testa a qualidade (CI/CD), um **mural de receitas** (wiki/README) e **crachás** que controlam quem pode mexer em quê (permissões). A cozinha não substitui saber cozinhar — ela **potencializa** a colaboração entre quem já sabe.

E tem a **vitrine**: a cozinha compartilhada fica de portas abertas, e clientes (recrutadores) passam e veem os pratos que você preparou. Um portfólio de pratos bem apresentados atrai oportunidades. Guarde: Git é a habilidade individual; a plataforma é a cozinha coletiva com processo, automação e vitrine.

---

## 🧩 Conceitos fundamentais

### 1. Git ≠ plataforma de hospedagem

- **Git:** a ferramenta de controle de versão, **local**, que roda no seu computador. Cria commits, branches, histórico.
- **GitHub/GitLab/Bitbucket:** **serviços na nuvem** que **hospedam** repositórios Git (o "remoto" para onde você dá push) e adicionam recursos de colaboração por cima.

> **Termo explicado — plataforma de hospedagem Git (forge):** serviço na nuvem que armazena repositórios Git remotos e oferece ferramentas de colaboração (PRs, issues, CI/CD) em torno deles. GitHub, GitLab e Bitbucket são as principais.

Você pode ter Git sem nenhuma delas (repositório só local), mas para **colaborar** e ter um **backup na nuvem**, você conecta seu repo a uma plataforma (`git remote add origin <url>` + `git push`).

### 2. O que elas oferecem além de hospedar

O valor real está nos recursos em torno do código:

- **Repositórios remotos:** o "lar" oficial do código, acessível ao time, de onde saem os deploys.
- **Pull/Merge Requests:** o mecanismo de **propor e revisar** mudanças antes de entrarem na `main` ([[64-Pull-Requests-code-review-e-issues]]).
- **Issues:** rastreamento de tarefas, bugs e melhorias — cada uma com discussão, responsável, rótulos.
- **CI/CD integrado:** rodar testes e fazer deploy automaticamente a cada push (GitHub Actions, GitLab CI — Volume 4).
- **Code review:** comentários linha a linha no código proposto.
- **Documentação:** o **README** renderizado (o "cartão de visita" do repo), wikis, GitHub Pages.
- **Controle de acesso:** quem pode ler, escrever, administrar; branches protegidas.
- **Social:** seguir pessoas, dar "star" em projetos, forks, contribuições visíveis.

### 3. Os três grandes (e onde brilham)

- **GitHub** (da Microsoft): o **maior e mais popular**, especialmente para **open source** e no ecossistema de startups. A maior comunidade, o melhor "efeito rede". **GitHub Actions** para CI/CD. É onde você deve construir seu portfólio.
- **GitLab:** forte em **DevOps completo** ("tudo numa plataforma": código, CI/CD, segurança, deploy). Popular em empresas que querem uma solução integrada e/ou **self-hosted** (rodar no próprio servidor). CI/CD maduro e nativo.
- **Bitbucket** (da Atlassian): integra-se nativamente com **Jira** e **Confluence** (também da Atlassian), então é comum em empresas que já vivem no ecossistema Atlassian.

> **Termo explicado — self-hosted:** rodar a plataforma nos servidores da própria empresa (em vez de usar a nuvem do provedor), comum por questões de segurança/controle. O GitLab é muito usado assim.

Todas as três hospedam Git e têm PRs, issues e CI/CD. A escolha costuma ser por **ecossistema** (já usa Jira? Bitbucket. Quer tudo integrado/self-hosted? GitLab. Open source e comunidade? GitHub) e por decisão da empresa.

### 4. GitHub como portfólio profissional

Para quem busca emprego, o GitHub é uma **vitrine viva**:
- **Perfil:** seus repositórios públicos, atividade (o "gráfico de contribuições"), projetos fixados.
- **Projetos reais:** apps que você construiu, com **README** explicando o que fazem, como rodar, e o que você aprendeu.
- **Contribuições open source:** participar de projetos abertos ([[66-Contribuindo-com-projetos-abertos]]) mostra que você colabora de verdade.

Recrutadores e entrevistadores técnicos **olham** o GitHub. Um perfil cuidado, com poucos projetos **bem-acabados** (não muitos pela metade), conta uma história melhor que qualquer buzzword no currículo (Volume 5).

### 5. Autenticação: SSH e tokens

Para dar `push` de forma segura, você autentica com a plataforma:
- **HTTPS + token:** você usa a URL `https://` e um **Personal Access Token** (senha não funciona mais para Git na maioria das plataformas, por segurança).
- **SSH:** você gera um par de chaves (pública/privada — [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]], Vol. 2), cadastra a **pública** na plataforma, e o `push` autentica sem digitar senha.

Configurar SSH uma vez economiza digitar credenciais o tempo todo — é o setup preferido de quem usa Git diariamente.

---

## ⚙️ Como funciona na prática

Como a plataforma entra no fluxo de trabalho, do zero à colaboração:

**1. Criar o repositório remoto.** Você cria um repo na plataforma (via site) e conecta seu projeto local:
```bash
git remote add origin git@github.com:usuario/saborexpress.git
git push -u origin main
```
Ou faz o caminho inverso: cria no GitHub e dá `git clone`.

**2. O repositório vira o "lar" do projeto.** A partir daí, o remoto é a **fonte da verdade**: todos dão `push`/`pull` dele, os deploys saem dele, o histórico oficial mora nele. Se sua máquina pegar fogo, o código está seguro na nuvem.

**3. Organizar o trabalho com issues.** As tarefas e bugs viram **issues** — muitas vezes espelhando as histórias do backlog ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]). Cada issue tem descrição, responsável, rótulos (`bug`, `feature`) e discussão. Os commits e PRs referenciam o número da issue (`#42`), ligando código a tarefa.

**4. Colaborar via Pull Requests.** O trabalho feito em branches ([[62-Branches-merge-conflitos-e-estrategias]]) entra na `main` por **Pull Request**, com revisão do time ([[64-Pull-Requests-code-review-e-issues]]). A `main` costuma ser **protegida**: só aceita código via PR aprovado e com testes verdes.

**5. Automatizar com CI/CD.** A cada push/PR, a plataforma roda automaticamente testes, linter e checagens (GitHub Actions/GitLab CI). Se algo falha, o PR é bloqueado. Isso liga direto ao Volume 4 — a plataforma é o gatilho da automação.

**6. Documentar com o README.** O **README.md** na raiz é renderizado na página do repo — é o cartão de visita. Um bom README diz o que o projeto faz, como rodar, e a stack. É o primeiro (e às vezes único) contato de alguém com seu projeto.

**A grande sacada:** a plataforma transforma o Git de "histórico local" em **plataforma de colaboração e automação**. É por isso que ela é o centro de gravidade do projeto — código, tarefas, revisão, testes, deploy e documentação, tudo num lugar.

---

## 🍔 Aplicação na SaborExpress

O código da SaborExpress mora num repositório **privado no GitHub**, e a plataforma virou o coração da operação do time.

**O centro de gravidade.** Tudo acontece no GitHub: o código (com a `main` protegida), as **issues** (que espelham as histórias do backlog do Jira via integração), os **Pull Requests** (toda mudança passa por revisão), e o **GitHub Actions** rodando os testes a cada push (o CI que a Camila configurou — Volume 4). Quando um novo dev entra, ele **clona** o repo, lê o **README** (que explica como subir o ambiente local) e já começa — sem depender de alguém explicar tudo do zero.

**Issues ligando tarefa e código.** Quando a Bia pegou o bug do frete, ele era a **issue #87** ("frete calcula errado para CEP inválido"). A branch dela se chamou `fix/87-frete-cep`, e o PR mencionava "fecha #87" — então, ao mesclar, a issue **fechou automaticamente**. Qualquer pessoa consegue rastrear: do bug relatado → à discussão → à branch → ao PR → ao commit que corrigiu. Rastreabilidade total.

**A `main` protegida como rede de segurança.** O time configurou a `main` para **não** aceitar push direto: toda mudança precisa de um PR **aprovado** por outra pessoa **e** com os testes do CI **passando**. Uma vez, um júnior tentou dar push direto de uma correção "rapidinha" na `main` — o GitHub **bloqueou**. Ele teve que abrir um PR, que revelou (no code review) que a "correção" quebrava outro caso. A proteção evitou um bug em produção.

**O portfólio que veio de brinde.** A Camila mantém **versões demo** de partes não sensíveis do seu trabalho em repos **públicos** no seu perfil, com READMEs caprichados. Quando ela buscou uma vaga melhor, o entrevistador comentou que o GitHub dela — projetos reais, bem documentados, com histórico de commits limpo — pesou mais que o currículo. A plataforma que o time usava para trabalhar também era a vitrine da carreira dela.

Moral: para a SaborExpress, o GitHub não é "onde guardamos o código" — é onde o código, as tarefas, a revisão, os testes e a documentação **se encontram**, com a `main` protegida como rede de segurança. E, de brinde, é o portfólio de cada dev.

---

## 🏢 Como isso acontece em uma empresa

- **A plataforma é escolhida pela empresa, e você se adapta.** Pode ser GitHub, GitLab (comum em empresas que querem self-hosted ou DevOps integrado) ou Bitbucket (comum onde já se usa Jira). Os conceitos (repo, PR, issue, CI) são os mesmos; muda a interface.
- **A `main` é quase sempre protegida.** Push direto é bloqueado; código entra via PR com revisão e CI verde. É o padrão de qualquer time sério.
- **Issues/PRs ligam-se ao gerenciamento.** Integrações com Jira/Trello ligam a issue do código à história do backlog. "Fecha #123" nos PRs automatiza o fechamento.
- **CI/CD é nativo da plataforma.** GitHub Actions e GitLab CI rodam testes e deploys direto do repo (Volume 4). A plataforma é o gatilho de toda a automação de entrega.
- **Repos privados no trabalho, públicos no portfólio.** O código da empresa é privado; o seu portfólio pessoal é público. Nunca publique código proprietário da empresa — é violação séria.
- **O GitHub pesa na contratação.** Recrutadores olham perfil e projetos. Ter contribuições, projetos bem-acabados e READMEs claros é um diferencial real para o primeiro emprego (Volume 5).
- **SSH/token é o setup padrão.** Configurar autenticação uma vez (SSH de preferência) faz parte do onboarding técnico de qualquer dev.

---

## ⚠️ Erros comuns

- **Confundir Git com GitHub.** Git é a ferramenta local; GitHub é o serviço que hospeda. Dá para usar Git sem GitHub; o GitHub sozinho, sem Git, não faz sentido.
- **Achar que a plataforma é "só um backup de código".** Ignorar issues, PRs e CI é desperdiçar 80% do valor. A plataforma é colaboração e automação, não um HD na nuvem.
- **Publicar segredos ou código proprietário.** Commitar chaves de API (o histórico é permanente!) ou subir código da empresa em repo público é erro grave — de segurança e, no segundo caso, legal/contratual.
- **Deixar o README vazio ou ausente.** Um repo sem README é uma loja sem vitrine. Ninguém entende o projeto — nem você daqui a seis meses, nem o recrutador.
- **Ter um portfólio de projetos pela metade.** Vinte repos abandonados impressionam menos que **três** projetos bem-acabados e documentados. Qualidade > quantidade.
- **Não proteger a `main`.** Deixar push direto na branch principal num time é convite a acidentes em produção. Proteja e exija PR.
- **Escolher a plataforma "errada" e travar.** Não existe plataforma errada — os conceitos são portáveis. Aprenda um bem (GitHub) e você se vira em qualquer outro.

---

## 💡 Dicas profissionais

- **Configure SSH uma vez e esqueça.** Gere a chave, cadastre a pública no GitHub, e nunca mais digite credenciais no `push`. Economiza atrito diário.
- **Trate seu GitHub como portfólio desde já.** Suba seus projetos de estudo, escreva READMEs decentes, mantenha o histórico limpo. Seu eu futuro (procurando emprego) vai agradecer.
- **Capriche no README.** Explique o que o projeto faz, como rodar, a stack e (bônus) o que você aprendeu. É o cartão de visita — muitas vezes o **único** contato do recrutador com seu código.
- **Use issues para organizar até projetos pessoais.** Anotar tarefas e bugs como issues te ensina o fluxo profissional e deixa seu repo mais "de verdade".
- **Aprenda uma plataforma a fundo; as outras são variações.** Domine o GitHub (o mais comum e o do portfólio). GitLab e Bitbucket usam os mesmos conceitos com nomes/interfaces um pouco diferentes.
- **Nunca suba segredos nem código da empresa.** Regra inviolável. Use `.gitignore` para segredos e mantenha o código proprietário nos repos privados da empresa.
- **Explore projetos open source famosos.** Ler issues e PRs de projetos reais no GitHub é uma aula gratuita de como times de verdade colaboram ([[66-Contribuindo-com-projetos-abertos]]).

---

## 🎈 Curiosidades

- O **GitHub** foi fundado em 2008 e comprado pela **Microsoft** em 2018 por **US$ 7,5 bilhões** — irônico, já que a Microsoft já teve seu próprio VCS concorrente (TFS). Hoje o GitHub hospeda mais de **100 milhões** de desenvolvedores.
- O mascote do GitHub é o **Octocat** — metade gato, metade polvo — criado pela ilustradora Simon Oxley (que também desenhou o passarinho original do Twitter). Existem centenas de variações oficiais do Octocat.
- O **"gráfico de contribuições"** (aqueles quadradinhos verdes no perfil) virou quase um símbolo cultural entre devs — alguns "gamificam" para manter a sequência de dias com commits, embora a comunidade lembre que **qualidade > quadradinhos verdes**.
- O **GitLab** é famoso por ser uma empresa **100% remota** (sem escritório) e por ter um "handbook" público gigantesco documentando **tudo** sobre como a empresa funciona — um caso de estudo de transparência radical.
- O **Bitbucket** já foi o lar de muitos projetos que usavam **Mercurial** (o concorrente do Git), mas descontinuou o suporte a Mercurial em 2020 — mais um capítulo da vitória definitiva do Git.
- Muitos produtos famosos **nasceram** como projetos open source no GitHub e viraram empresas bilionárias. O GitHub é, para software, ao mesmo tempo biblioteca, rede social e feira de talentos.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Git** | A ferramenta de controle de versão, local, na sua máquina. |
| **GitHub / GitLab / Bitbucket** | Serviços na nuvem que hospedam repositórios Git e a colaboração. |
| **Repositório remoto** | A cópia do projeto hospedada na plataforma (o "lar" oficial). |
| **Issue** | Registro de uma tarefa, bug ou melhoria, com discussão e responsável. |
| **Pull/Merge Request** | Proposta de mudança revisada antes de entrar na main. |
| **CI/CD** | Automação de testes e deploy disparada pela plataforma. |
| **README** | Documento renderizado na página do repo; o cartão de visita. |
| **Branch protegida** | Branch (ex.: main) que só aceita mudanças via PR aprovado. |
| **Self-hosted** | Rodar a plataforma nos servidores da própria empresa. |
| **SSH / token** | Formas de autenticar com a plataforma para dar push com segurança. |
| **Fork** | Cópia de um repositório de outra pessoa na sua conta. |

---

## 📝 Resumo

- **Git** é a ferramenta (local); **GitHub/GitLab/Bitbucket** são **serviços na nuvem** que hospedam repositórios Git e adicionam colaboração por cima. Confundir os dois é o erro nº 1 do iniciante.
- Além de hospedar código, as plataformas oferecem **Pull Requests**, **issues**, **CI/CD**, **code review**, **README/wiki** e **controle de acesso** — tornando-se o **centro de gravidade** do projeto.
- **GitHub** domina (open source, comunidade, portfólio); **GitLab** brilha em DevOps integrado e self-hosted; **Bitbucket** integra-se ao ecossistema Atlassian/Jira. Os conceitos são os mesmos; a escolha é por ecossistema.
- Para o time: o repo remoto é a **fonte da verdade**, a **`main` é protegida** (só PR aprovado com CI verde), e issues/PRs ligam código a tarefas de forma rastreável.
- Para a carreira: o **GitHub é seu portfólio** — poucos projetos **bem-acabados**, com READMEs claros, valem mais que buzzwords no currículo. Configure SSH, capriche na documentação, e **nunca** suba segredos nem código proprietário.

---

## ☑️ Checklist de aprendizado

- [ ] Diferencio Git (ferramenta) de GitHub (plataforma que hospeda).
- [ ] Sei o que as plataformas oferecem além de hospedar (PR, issues, CI/CD).
- [ ] Comparo GitHub, GitLab e Bitbucket e sei onde cada um brilha.
- [ ] Entendo o papel da `main` protegida e das issues na rastreabilidade.
- [ ] Vejo o GitHub como portfólio e sei o que o valoriza.
- [ ] Sei o que nunca publicar (segredos, código proprietário).

---

## ✏️ Exercícios

**1.** Explique, com uma analogia própria, a diferença entre **Git** e **GitHub**.

**2.** Cite quatro recursos que uma plataforma como o GitHub oferece **além** de simplesmente hospedar o código, e diga para que serve cada um.

**3.** Uma empresa já usa Jira e Confluence intensamente e quer uma plataforma de código integrada a eles. Qual das três provavelmente faz mais sentido, e por quê?

**4.** Por que é importante **proteger a branch `main`** num projeto em time? Dê um exemplo de problema que a proteção evita.

**5. (Reflexão)** Você é estudante buscando o primeiro emprego. Como você usaria o GitHub como portfólio, e por que "três projetos bem-acabados" pode impressionar mais que "vinte projetos pela metade"?

---

## 💬 Respostas comentadas

**1.** Resposta pessoal; o padrão esperado é distinguir a **ferramenta local** do **serviço na nuvem**. Exemplo: Git é como o **Microsoft Word** (o programa que edita e controla versões do documento na sua máquina); GitHub é como o **Google Drive/Docs** (o serviço que hospeda os documentos na nuvem, permite que várias pessoas colaborem, comentem e controlem acesso). Você pode usar o Word (Git) sozinho sem nuvem, mas para colaborar e ter backup você o conecta a um serviço (GitHub).

**2.** Exemplos: (1) **Pull Requests** — propor e revisar mudanças antes de entrarem na main (code review); (2) **Issues** — rastrear tarefas, bugs e melhorias com discussão e responsável; (3) **CI/CD** — rodar testes e deploys automaticamente a cada push; (4) **README/wiki** — documentar o projeto (o cartão de visita renderizado). (Outros válidos: controle de acesso/branches protegidas, recursos sociais como forks e stars.)

**3.** Provavelmente o **Bitbucket**, porque ele é da **Atlassian** — a mesma empresa dona do **Jira** e do **Confluence** — e integra-se nativamente a eles. Uma empresa que já vive nesse ecossistema ganha em fluidez: issues, documentação e código conversando sem esforço de integração. (GitHub e GitLab também integram com Jira, mas o "encaixe" nativo do Bitbucket costuma ser o argumento decisivo nesse cenário.)

**4.** Porque a `main` é a versão que normalmente vai para **produção** e é a fonte da verdade do projeto — deixá-la aceitar push direto de qualquer um é convite a acidentes. Proteger a `main` (exigir PR aprovado por outra pessoa e testes de CI passando) cria uma **rede de segurança**: nenhuma mudança entra sem revisão nem sem passar nos testes. Exemplo: um dev tenta dar push direto de uma "correção rapidinha" que, na verdade, quebra outro caso; a proteção **bloqueia** o push direto e força um PR, cujo code review (ou o CI) pega o problema **antes** de chegar a produção — em vez de derrubar o sistema para os usuários.

**5.** Eu usaria o GitHub como vitrine: subir **projetos reais** (mesmo que de estudo) em repos públicos, cada um com um **README** claro explicando o que o projeto faz, como rodá-lo, a stack usada e o que aprendi; fixar os melhores no perfil; manter um histórico de commits limpo e, se possível, alguma **contribuição open source**. "Três projetos bem-acabados" impressiona mais que "vinte pela metade" porque o recrutador/entrevistador está avaliando **como você trabalha e termina as coisas**: projetos completos, documentados e funcionando mostram capacidade de levar algo até o fim, cuidado com qualidade e comunicação (o README) — enquanto vinte repositórios abandonados sugerem falta de foco e acabamento. Qualidade e "acabamento" contam uma história profissional melhor que quantidade.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[62-Branches-merge-conflitos-e-estrategias]] — as branches que a plataforma hospeda remotamente.
- **Próximo (linear):** [[64-Pull-Requests-code-review-e-issues]] — o processo de colaboração no coração dessas plataformas.
- **Base:** [[60-Controle-de-versao-e-por-que-Git-venceu]], [[61-Git-no-dia-a-dia]], [[37-Anatomia-de-um-projeto-no-GitHub]] (Vol. 2).
- **Aplicação futura:** [[66-Contribuindo-com-projetos-abertos]] (open source), Volume 4 (CI/CD com Actions) e Volume 5 (portfólio e carreira).

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 18 → **Capítulo 63 de 119**.
