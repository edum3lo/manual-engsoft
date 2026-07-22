---
title: '10 - O ciclo de vida do software (SDLC)'
---

# Capítulo 10 — O ciclo de vida do software (SDLC)

> **Volume 1 — Fundamentos e Mentalidade** · Módulo 1 — O que é ser um Engenheiro de Software
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Explicar o que é o **ciclo de vida do software** (SDLC) e por que ele existe.
- Descrever cada **fase**: planejamento, requisitos, design, implementação, testes, entrega, operação e manutenção.
- Entender que o ciclo é **contínuo**, não uma linha reta com fim.
- Localizar, dentro do ciclo, os grandes assuntos que você estudará na coleção.
- Diferenciar o ciclo de vida (as fases) dos modelos de processo (a *forma* de percorrê-las).
- Ver o ciclo inteiro aplicado a um exemplo real.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (1/5).**

---

## ✅ Pré-requisitos

- [[08-O-que-e-engenharia-de-software]] — as grandes atividades da engenharia, que aqui organizamos em fases.
- [[07-O-que-e-software]] — a natureza do software (que "apodrece" e precisa ser mantido), que explica por que o ciclo não tem "fim".

---

## 📖 Introdução

Já sabemos *o que* é software e *o que* é a engenharia que o constrói. Agora vamos juntar as peças numa visão de cima: **como um software nasce, cresce, vive e é aposentado?** Essa jornada completa tem um nome na área — o **ciclo de vida do software**, ou **SDLC** (do inglês *Software Development Life Cycle*, "ciclo de vida de desenvolvimento de software").

> **Termo explicado — SDLC (Software Development Life Cycle):** o conjunto de fases pelas quais um software passa, desde a ideia inicial até sua aposentadoria — planejamento, requisitos, design, construção, testes, entrega, operação e manutenção.

Por que isso importa tanto agora? Porque o SDLC é o **mapa-mãe** desta coleção. Quase todo módulo que você vai estudar corresponde a uma fase deste ciclo. Requisitos, modelagem, arquitetura, programação, testes, DevOps — tudo isso são fases (ou apoios) do ciclo de vida. Entender o SDLC agora é como ver a planta do prédio inteiro antes de estudar cada cômodo: você vai saber sempre *onde está* e *como aquilo se conecta com o resto*.

E há uma ideia central que este capítulo quer gravar em você: **o software não é construído uma vez e esquecido.** Ele vive. Nasce, é usado, é corrigido, cresce, muda e, um dia, é aposentado. O "ciclo" é chamado de ciclo justamente porque gira: entrega leva a uso, uso revela necessidades, necessidades levam a novas fases. Quem entende isso para de pensar em "terminar o software" e começa a pensar em "cuidar do software ao longo da vida dele" — a mentalidade de um engenheiro de verdade.

---

## 🧠 Analogia

O ciclo de vida do software é como o **ciclo de vida de um restaurante**.

Um restaurante não "fica pronto" no dia da inauguração. Antes de abrir, alguém teve uma *ideia* ("um restaurante de comida caseira no bairro"), *planejou* (localização, orçamento, público), *definiu o cardápio* (o que vai oferecer — os "requisitos"), *projetou* o espaço e a cozinha (o "design"), *montou* tudo (a "construção"), *testou* com um jantar de amigos antes de abrir (os "testes"), e enfim *inaugurou* (a "entrega"). Mas é aí que o trabalho de verdade começa: todo dia o restaurante *opera* (serve clientes), lida com problemas (um prato que ninguém pede, um fornecedor que sumiu), *ajusta o cardápio*, *reforma* quando necessário, e — um dia, talvez — *fecha* ou se reinventa.

Repare: a inauguração não é o fim, é o começo da vida. E o cardápio de hoje não é o de daqui a dois anos — ele evolui conforme os clientes reagem. É exatamente assim com software. O "lançamento" (deploy) não encerra o projeto; abre a fase mais longa de todas, a de *operar, ouvir os usuários e evoluir*. Um restaurante que parou de se ajustar após a inauguração fecha. Um software que parou de ser mantido "apodrece" e morre.

---

## 🧩 Conceitos fundamentais

### As fases do ciclo de vida

Vamos percorrer cada fase. Elas aparecem em quase todo sistema, mesmo que a *forma* de percorrê-las mude (veremos isso na seção sobre modelos de processo).

#### 1. Planejamento

É o "vale a pena e é viável?". Aqui se define **por que** o software será feito, **para quem**, qual o objetivo de negócio, quanto tempo e dinheiro há, e se o projeto faz sentido. Decisões erradas aqui afundam tudo depois. Envolve mais gente de negócio e gestão do que de código.

#### 2. Requisitos (análise)

É o "**o que** exatamente vamos construir?". Descobre-se e detalha-se o que o sistema precisa fazer (funções) e como precisa ser (rápido, seguro, fácil). É a fase de *entender o problema* — a mais barata de acertar e a mais cara de errar. Vira o **Módulo de Requisitos** (Volume 3).

#### 3. Design (projeto)

É o "**como** vamos construir?". Desenha-se a estrutura do sistema: a arquitetura (as grandes partes e como se conectam), o modelo de dados, as telas. É a "planta" antes do "tijolo". Vira os módulos de **Modelagem** e **Arquitetura** (Volume 3), e envolve também **UX/design** das telas.

#### 4. Implementação (construção/codificação)

É o "mãos à obra": escrever o **código** que dá vida ao projeto. É a fase que os iniciantes acham que é "o trabalho todo", mas que, como vimos no [[08-O-que-e-engenharia-de-software]], é só uma parte. Envolve **front-end**, **back-end**, **banco de dados**, **Git** — vários módulos da coleção.

#### 5. Testes (verificação e validação)

É o "será que funciona mesmo?". Verifica-se se o software faz o que deveria e se não tem defeitos (bugs). Idealmente, testar acontece *junto* com a construção, não só no fim. Vira o **Módulo de Testes** (Volume 3).

> **Termo explicado — verificação vs. validação:** *verificação* pergunta "construímos o software corretamente?" (sem bugs, conforme o projeto). *Validação* pergunta "construímos o software correto?" (o que o usuário realmente precisava). Passar na verificação sem validar significa construir muito bem a coisa errada.

#### 6. Entrega (deploy/implantação)

É o "colocar no ar": disponibilizar o software para os usuários reais. Publicar o app na loja, subir o site para o servidor. Vira os módulos de **DevOps** e **Cloud** (Volume 4). A "inauguração".

#### 7. Operação e monitoramento

É o "mantê-lo de pé e saudável": garantir que, no ar, o sistema funciona bem, está rápido, não caiu. Observa-se o comportamento real. Vira o **Módulo de Observabilidade** (Volume 4).

#### 8. Manutenção e evolução

É a fase **mais longa de todas**: corrigir bugs que aparecem, adaptar a mudanças (novos aparelhos, novas regras), e adicionar novas funcionalidades conforme o negócio cresce. Software vive nessa fase a maior parte do tempo. E cada nova funcionalidade **reinicia o ciclo** (novos requisitos → novo design → ...). É aqui que o "ciclo" mostra que é mesmo um ciclo.

#### 9. Aposentadoria (descontinuação)

Um dia, o software é desligado — porque foi substituído, o negócio mudou, ou não vale mais mantê-lo. É o "fechar o restaurante". Menos glamouroso, mas parte da vida do sistema.

### O ciclo é contínuo, não uma linha reta

O erro clássico é imaginar o SDLC como uma linha reta que começa no planejamento e *termina* na entrega. Na realidade moderna, ele **gira continuamente**: a operação revela necessidades, que viram novos requisitos, novo design, novo código, novos testes, nova entrega — e de novo. Software bom é entregue muitas vezes, em pequenos ciclos, não uma vez só. Essa é a essência do que você verá em **Ágil**, **CI/CD** e **DevOps**.

### Ciclo de vida ≠ modelo de processo

Cuidado com uma confusão comum: as **fases** (o *o quê*: planejar, projetar, construir...) são quase sempre as mesmas. O que muda entre projetos é o **modelo de processo** (o *como* percorrer as fases): tudo de uma vez e em ordem rígida (cascata)? Em pequenos ciclos repetidos (ágil)? Você estudará os modelos no Cap. 41. Por ora, guarde: **as fases são o "o quê"; os modelos são o "como".**

---

## ⚙️ Como funciona na prática

O ciclo de vida, de forma visual — repare na seta que volta, mostrando que é um ciclo:

```
        ┌──────────────────────────────────────────────┐
        │                                              │
        ↓                                              │
  1. PLANEJAMENTO                                      │
        ↓                                              │
  2. REQUISITOS  ─── "o quê construir?"                │
        ↓                                              │
  3. DESIGN      ─── "como construir?"                 │
        ↓                                              │
  4. IMPLEMENTAÇÃO ── "escrever o código"              │
        ↓                                              │
  5. TESTES      ─── "funciona? sem bugs?"             │
        ↓                                              │
  6. ENTREGA (deploy) ── "colocar no ar"               │
        ↓                                              │
  7. OPERAÇÃO/MONITORAMENTO ── "está saudável?"        │
        ↓                                              │
  8. MANUTENÇÃO/EVOLUÇÃO ── novas necessidades ────────┘
        ↓
  9. APOSENTADORIA (um dia)
```

Na prática de uma empresa moderna, esse ciclo não é percorrido uma vez em anos — ele gira muitas vezes, às vezes **várias vezes por semana**, para pequenas fatias do sistema. Uma nova funcionalidade da SaborExpress pode passar por requisitos → design → código → testes → entrega em poucos dias, enquanto o resto do sistema continua no ar. É por isso que empresas conseguem melhorar seus apps continuamente, sem "parar tudo para fazer a versão 2".

Onde cada módulo da coleção se encaixa:

| Fase do SDLC | Onde você estuda na coleção |
|---|---|
| Planejamento | Volume 1 (empresa, produto) e Volume 5 (negócio) |
| Requisitos | Volume 3 — Requisitos |
| Design | Volume 3 — UX, Modelagem, Arquitetura |
| Implementação | Volume 3 — Git, Banco, API, Front, Back |
| Testes | Volume 3 — Testes |
| Entrega | Volume 4 — DevOps, Cloud |
| Operação | Volume 4 — Observabilidade, Escalabilidade |
| Manutenção/Evolução | Todos, especialmente práticas modernas (Volume 4) |

---

## 🍔 Aplicação na SaborExpress

Vamos ver o ciclo inteiro girando na SaborExpress — primeiro a construção inicial, depois uma evolução, para você sentir o "ciclo".

**A primeira volta (nascimento do app):**
1. **Planejamento:** a Ana decide que vale a pena construir o app, define orçamento e prazo, e o público (restaurantes de bairro).
2. **Requisitos:** o time descobre o que o app precisa fazer — cadastrar restaurantes, montar pedido, pagar, acompanhar entrega.
3. **Design:** desenham as telas (UX), a arquitetura (app + servidor + banco) e o modelo de dados (pratos, pedidos, usuários).
4. **Implementação:** programam o app, o servidor e o banco.
5. **Testes:** verificam se o pedido é calculado certo, se o pagamento funciona, se nada quebra.
6. **Entrega:** publicam o app nas lojas e sobem o servidor para a nuvem.
7. **Operação:** monitoram — o app está no ar? rápido? caiu em algum momento?
8. **Manutenção:** corrigem os primeiros bugs que os usuários reais encontram.

**A segunda volta (evolução — meses depois):**
Os usuários pedem um recurso de "avaliar o restaurante com estrelas". Isso **reinicia o ciclo** só para essa fatia: novos *requisitos* (como funciona a avaliação?) → *design* (nova tela, novo dado) → *implementação* → *testes* → *entrega* → e volta a operar. O resto da SaborExpress continua no ar o tempo todo.

Percebe como o app da Ana nunca "fica pronto"? Ele vive, e cada melhoria é uma nova volta no ciclo. Ao longo desta coleção, você vai construir a SaborExpress seguindo exatamente essas fases — e agora tem o mapa de todas elas na cabeça.

---

## 🏢 Como isso acontece em uma empresa

- **Ninguém fala "SDLC" o dia todo, mas todos vivem dentro dele.** As reuniões, os quadros de tarefas e os papéis do time estão todos organizados em torno dessas fases, mesmo que o nome não seja pronunciado.
- **Empresas modernas giram o ciclo rápido e em pequenas fatias.** Em vez de um projeto gigante de um ano, entregam melhorias pequenas continuamente. Isso reduz risco (erros pequenos são fáceis de corrigir) e entrega valor mais cedo. É a base de Ágil e DevOps.
- **A fase de manutenção domina a vida real.** A maior parte do dinheiro e do tempo gasto com software vai para *manter e evoluir* o que já existe, não para criar do zero. Se você entrar numa empresa, muito provavelmente vai começar trabalhando na fase de manutenção/evolução de um sistema que já existe — não construindo um do zero.
- **Cada papel do time "mora" mais em certas fases.** O pessoal de produto vive em planejamento/requisitos; designers, em design; desenvolvedores, em implementação; QA, em testes; DevOps/SRE, em entrega e operação. Você conhecerá esses papéis no [[14-Os-papeis-da-area-de-tecnologia]].

---

## ⚠️ Erros comuns

- **Achar que o ciclo termina na entrega.** A entrega é a inauguração, não o fim. A vida (e a maior parte do trabalho) vem depois.
- **Pular a fase de requisitos e ir direto ao código.** Construir sem entender o problema é o desperdício mais caro: você faz muito bem a coisa errada.
- **Confundir verificação com validação.** Um software "sem bugs" que não resolve o problema do usuário falhou. Precisa passar nos dois.
- **Tratar testes como fase final opcional.** Testar só no fim (ou não testar) faz bugs saírem caro. Teste junto com a construção.
- **Confundir as fases (o quê) com os modelos de processo (como).** As fases são quase sempre as mesmas; o que muda é a forma de percorrê-las.
- **Ignorar operação e monitoramento.** Colocar no ar e "esquecer" leva a sistemas que caem sem ninguém perceber até o cliente reclamar.

---

## 💡 Dicas profissionais

- **Sempre saiba em que fase você está.** Antes de agir, pergunte "estamos entendendo o problema, projetando, construindo ou corrigindo?". Isso evita, por exemplo, ficar refinando código quando o problema ainda nem foi entendido.
- **Invista desproporcionalmente nas fases iniciais.** Uma hora a mais entendendo requisitos e projetando economiza dezenas de horas de retrabalho depois. É o melhor investimento de tempo da profissão.
- **Pense no ciclo, não no lançamento.** Construa sempre imaginando quem vai *manter* aquilo depois (muitas vezes, você mesmo). Facilite a vida da próxima volta do ciclo.
- **Prefira ciclos pequenos e frequentes.** Entregar fatias pequenas e cedo reduz risco e revela problemas antes. É o oposto de "sumir por seis meses e aparecer com tudo pronto".
- **Documente as decisões de cada fase.** Por que escolhemos esta arquitetura? Qual requisito gerou esta tela? Isso salva a próxima pessoa (ou o próprio você no futuro) de refazer o raciocínio.

---

## 🎈 Curiosidades

- O termo **SDLC** e a ideia de fases vêm das décadas de 1960–70, quando a indústria buscava domar a "crise do software" ([[09-Breve-historia-do-software]]) impondo ordem ao caos do desenvolvimento.
- Estudos clássicos de engenharia mostram que o custo de corrigir um defeito **cresce dramaticamente conforme ele avança nas fases**: um erro de requisito pego cedo custa pouco; o mesmo erro descoberto em produção pode custar centenas de vezes mais. É a justificativa numérica para investir nas fases iniciais.
- A palavra **"manutenção"** engana: no software, ela não significa "consertar desgaste" (software não enferruja), e sim *corrigir defeitos que sempre estiveram lá, adaptar a um mundo que mudou e adicionar novidades*. Por isso ela é a fase mais longa e cara — e frequentemente a mais subestimada.
- Metodologias modernas (Ágil, DevOps) borraram as fronteiras entre as fases: em vez de "terminar requisitos, depois design, depois código", elas fazem um pouco de cada, continuamente. Mas as fases, como *tipos de atividade*, continuam lá.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **SDLC (ciclo de vida do software)** | O conjunto de fases pelas quais um software passa, da ideia à aposentadoria. |
| **Planejamento** | Fase de decidir por que, para quem e se vale a pena fazer o software. |
| **Requisitos** | Fase de descobrir e detalhar o que o sistema precisa fazer. |
| **Design (projeto)** | Fase de desenhar como o sistema será estruturado (arquitetura, dados, telas). |
| **Implementação** | Fase de escrever o código. |
| **Testes** | Fase de verificar se o software funciona e não tem defeitos. |
| **Verificação** | Checar se o software foi construído corretamente (conforme o projeto). |
| **Validação** | Checar se foi construído o software correto (o que o usuário precisava). |
| **Entrega (deploy)** | Colocar o software no ar, disponível para os usuários. |
| **Operação/monitoramento** | Manter o sistema no ar e observar sua saúde. |
| **Manutenção/evolução** | Corrigir, adaptar e adicionar funcionalidades ao longo do tempo. |
| **Modelo de processo** | A *forma* de percorrer as fases (ex.: cascata, ágil). |

---

## 📝 Resumo

- O **ciclo de vida do software (SDLC)** é a jornada completa de um sistema: planejamento → requisitos → design → implementação → testes → entrega → operação → manutenção → (um dia) aposentadoria.
- É um **ciclo**, não uma linha reta: a operação revela necessidades que reiniciam as fases. Software é entregue e melhorado muitas vezes, em pequenos ciclos.
- A **entrega não é o fim**: a manutenção/evolução é a fase mais longa e onde vive a maior parte do trabalho real.
- **Verificação** ("construímos certo?") e **validação** ("construímos a coisa certa?") são ambas necessárias.
- As **fases** (o *o quê*) são quase sempre as mesmas; os **modelos de processo** (o *como* percorrê-las) é que variam.
- O SDLC é o **mapa-mãe** da coleção: cada módulo corresponde a uma fase. Saber onde você está no ciclo evita agir na hora errada.

---

## ☑️ Checklist de aprendizado

- [ ] Sei o que é o SDLC e por que ele existe.
- [ ] Consigo nomear e explicar cada fase do ciclo de vida.
- [ ] Entendo por que o ciclo é contínuo e a entrega não é o fim.
- [ ] Diferencio verificação de validação.
- [ ] Separo as fases (o quê) dos modelos de processo (como).
- [ ] Consigo localizar os módulos da coleção dentro das fases do ciclo.

---

## ✏️ Exercícios

**1.** Liste, em ordem, as fases do ciclo de vida do software e explique cada uma em uma frase.

**2.** Com a analogia do restaurante, explique por que a "entrega" (inauguração) não é o fim, mas o começo da vida do software.

**3.** Diferencie verificação de validação. Dê um exemplo, na SaborExpress, de um software que passaria na verificação mas falharia na validação.

**4.** Explique a diferença entre "fase do ciclo de vida" e "modelo de processo". Por que confundi-los atrapalha?

**5. (Prática)** Escolha uma funcionalidade nova para a SaborExpress (ex.: cupom de desconto) e descreva como ela percorreria uma volta completa do ciclo, fase por fase.

---

## 💬 Respostas comentadas

**1.** (1) **Planejamento** — decidir por que, para quem e se vale a pena. (2) **Requisitos** — descobrir o que o sistema precisa fazer. (3) **Design** — projetar como será estruturado. (4) **Implementação** — escrever o código. (5) **Testes** — verificar se funciona sem defeitos. (6) **Entrega** — colocar no ar. (7) **Operação/monitoramento** — manter de pé e observar a saúde. (8) **Manutenção/evolução** — corrigir, adaptar e adicionar recursos. (9) **Aposentadoria** — desligar quando não valer mais a pena.

**2.** Como um restaurante, o software não "fica pronto" na inauguração — é aí que a vida de verdade começa. Depois de aberto (entregue), ele precisa *operar* todo dia (servir usuários), lidar com problemas reais, *ajustar o cardápio* (evoluir com base no que os usuários pedem) e *reformar* quando necessário (manutenção). A inauguração abre a fase mais longa de todas; parar de se ajustar depois dela leva o software (como o restaurante) ao fracasso.

**3.** Verificação pergunta "construímos o software corretamente?" (sem bugs, conforme o projeto); validação pergunta "construímos o software correto?" (o que o usuário precisava). Exemplo na SaborExpress: um sistema de busca que funciona perfeitamente, sem bugs (passa na verificação), mas que só busca por nome do restaurante quando os usuários na verdade queriam buscar por tipo de comida (falha na validação — construiu-se muito bem a coisa errada).

**4.** As **fases** são os tipos de atividade pelos quais o software passa (planejar, projetar, construir, testar...) e são quase sempre as mesmas. O **modelo de processo** é a *forma* de percorrer essas fases (tudo em ordem rígida, como na cascata, ou em pequenos ciclos repetidos, como no ágil). Confundi-los atrapalha porque leva a achar que "usar ágil" muda *o que* precisa ser feito (não muda — os requisitos ainda precisam ser entendidos, o design ainda precisa existir); o que muda é *como* e *quando* cada atividade acontece.

**5.** Resposta com "cupom de desconto": **Requisitos** — entender como o cupom funciona (percentual? valor fixo? validade? um por cliente?). **Design** — projetar a tela de inserir cupom e onde guardar os cupons nos dados; pensar no cálculo. **Implementação** — programar a lógica de aplicar o desconto e a tela. **Testes** — verificar casos (cupom válido, expirado, maior que o total). **Entrega** — publicar a nova versão. **Operação** — monitorar se o cálculo está certo em produção. **Manutenção** — corrigir qualquer problema que os usuários encontrem. (Precede tudo isso um mini-**planejamento**: vale a pena o esforço?)

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[11-Como-tudo-se-conecta]] — a visão que amarra todas as fases (e todos os assuntos da coleção) num fluxo único.
- **Base:** [[08-O-que-e-engenharia-de-software]] — as atividades da engenharia, aqui organizadas em fases.
- **Aplicação futura:** Capítulo 41 — *Modelos de processo* (Volume 3) — o "como" percorrer estas fases (cascata, iterativo, espiral).
- **Aplicação futura:** Módulo 36 — *Projeto Integrador* (Volume 5) — o ciclo inteiro percorrido de ponta a ponta na SaborExpress.

---

> 🧭 **Você está aqui:** Volume 1 → Módulo 1 → **Capítulo 10 de 119**.
