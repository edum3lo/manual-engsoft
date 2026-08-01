---
title: "02 - Sprint 0: a primeira semana dia a dia"
---

# 02. Sprint 0: a primeira semana, dia a dia

> Manual do NES · Volume 7. O capítulo para abrir na segunda-feira de manhã. Não decide nada grande, não escreve arquitetura, não escolhe framework no dia 1. Segue a ordem.

---

## 🎯 O objetivo da Sprint 0

O plano de ensino divide esta etapa em três blocos que, na prática, acontecem misturados nos mesmos 15 dias:

| Bloco                                                        | O que é                                                                                                                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Onboarding e Engineering Enablement**                      | Formar a equipe, identificar o PO, combinar acordos de trabalho e deixar a "fábrica" pronta: repositório, ambiente, CI, branches, code review, Definition of Done. |
| **Sprint 0 (a): Product Discovery & Inception**              | Entender o problema, stakeholders, visão, personas, jornadas, histórias, MVP Canvas e backlog priorizado.                                                          |
| **Sprint 0 (b): Technical Foundation & Architecture Runway** | Restrições, atributos de qualidade, arquitetura inicial em C4, ADRs, riscos, estratégia de qualidade, plano de releases e spikes.                                  |

Ao final, a equipe precisa ter, no mínimo:

1. Todo mundo com o projeto **rodando na própria máquina**.
2. Um **entendimento escrito** do problema do PO (1 página, não 20), com personas e jornadas.
3. Um **backlog priorizado**, com as histórias do topo já detalhadas.
4. As **ferramentas funcionando**: repositório, board, CI, canal de conversa, calendário.
5. A **fundação técnica registrada**: C4 de contexto e contêineres, 2 ou 3 ADRs, riscos e DoD.
6. Um **plano da Sprint 1** com tarefas do tamanho certo.

⚠️ O que **não** precisa existir no fim da Sprint 0: código bonito, arquitetura definitiva, banco modelado inteiro, telas no Figma completas. Quem tenta isso chega na Sprint 1 sem nada rodando.

> A lista completa de artefatos exigidos, com o arquivo de cada um, está em [[14-Do-plano-de-ensino-ao-artefato]]. Como produzir C4, ADR, riscos e spikes: [[15-Arquitetura-C4-ADR-riscos-e-spikes]].

---

## 📆 Dia 1 (segunda): a reunião zero da equipe

Marque 1h30 com a equipe inteira, presencial se possível. Pauta, nessa ordem:

**1. Rodada de sinceridade, o diagnóstico de competências (15 min).** Cada um responde três perguntas, sem enfeitar. Anote as respostas em `docs/equipe.md`, que é o artefato de diagnóstico pedido no onboarding:

- O que eu já sei fazer com alguma segurança?
- O que eu nunca fiz mas topo aprender nesta disciplina?
- Quantas horas por semana eu consigo dar de verdade?

🗣️ Frase pronta para abrir sem medo: _"Vou começar por mim: eu programo pouco, tenho mais facilidade com organização e documentação, e consigo umas 10 horas por semana. Quero pegar código junto com alguém nas primeiras sprints pra aprender."_ Alguém tinha que falar primeiro. Sendo você, você define o tom e ninguém precisa fingir.

**2. Papéis (15 min).** Distribua os papéis do [[01-O-jogo-do-NES]]. Escreva quem é quem. Papéis podem rodar a cada sprint.

**3. Acordos de trabalho (20 min).** É o _working agreement_ que o plano de ensino pede. Decida, registre em `CONTRIBUTING.md` e não mude no meio do caminho:

| Item                                 | Decidir agora                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------------- |
| Canal principal                      | WhatsApp, Discord ou Telegram. Um só.                                               |
| Tempo de resposta esperado           | Ex.: até 24h em dia útil.                                                           |
| Reunião semanal fixa                 | Dia e hora que todo mundo consegue. Coloque no calendário.                          |
| Daily assíncrona                     | Mensagem no grupo até tal hora, todo dia útil.                                      |
| Estratégia de branches e code review | Ex.: uma branch por issue, 1 aprovação obrigatória, ninguém aprova o próprio PR.    |
| **Definition of Done**               | O que torna um item pronto. Modelo completo em [[16-Qualidade-DoD-e-Quality-Gate]]. |
| O que fazer se alguém sumir          | Ex.: cobra no grupo em 2 dias, avisa o professor em 5.                              |

**4. Ferramentas (20 min).** Ver a tabela na seção "Kit de ferramentas" abaixo.

**5. Dever de casa até quarta (10 min).** Todo mundo com o projeto rodando, ou com o ambiente instalado se o projeto for novo.

> Saia da reunião com uma **ata**. Template em [[12-Kit-de-templates-copiaveis]]. Cole no grupo no mesmo dia.

---

## 📆 Dia 2 (terça): o projeto na sua máquina

Este é o dia mais importante da sua semana e é **individual**. Escolha a trilha:

- **Projeto herdado (já existe repositório)** → siga [[03-Projeto-herdado-entrar-num-codigo-que-nao-e-seu]] até conseguir rodar.
- **Projeto novo (nada existe ainda)** → siga [[04-Projeto-novo-do-zero-ao-primeiro-commit]].

⚠️ Se travar no ambiente por mais de 2 horas, **pare e peça ajuda no grupo com o erro colado**. Ambiente quebrado é o gargalo número 1 da Sprint 0 e é ridiculamente comum. Não é sinal de incompetência, é sinal de que o README está incompleto (o que, aliás, vira sua primeira tarefa útil: consertar o README).

---

## 📆 Dias 3 e 4 (quarta e quinta): entender o problema

Enquanto o ambiente assenta, a equipe ataca o **problema**, não o código.

**Passo 1: escreva o que você acha que entendeu.** Uma página, nesta estrutura:

```markdown
## Problema

Hoje, <quem> precisa <fazer o quê> e faz isso <como, hoje>.
Isso é ruim porque <consequência real, com número se possível>.

## Quem usa

- <Perfil 1>: quer <objetivo>
- <Perfil 2>: quer <objetivo>

## Como saberemos que deu certo

- <resultado observável 1>
- <resultado observável 2>

## O que está fora do escopo (por enquanto)

- <coisa que alguém vai pedir e que não vamos fazer agora>
```

**Passo 2: liste tudo que você NÃO sabe.** Perguntas cruas mesmo. Elas viram a pauta da reunião com o proponente.

**Passo 3: se o projeto é herdado**, some a isso um levantamento do que já existe e do que está quebrado. O proponente vai querer saber.

> Técnicas de elicitação, personas e jornada: [[47-Elicitacao-personas-e-jornada-do-usuario]] e [[46-O-que-sao-requisitos]].

---

## 📆 Dia 5 (sexta): backlog inicial

Junte a equipe por 1h. Com o documento do problema na tela:

1. **Despeje tudo** que vem à cabeça como "coisa que o sistema precisa ter". Sem filtro, sem ordem. Post-it digital, lista no papel, tanto faz.
2. **Agrupe** o que é parecido.
3. **Priorize** com MoSCoW, que é rápido e todo mundo entende:

| Categoria  | Significado                                          | Regra prática                                  |
| ---------- | ---------------------------------------------------- | ---------------------------------------------- |
| **Must**   | Sem isso o sistema não existe.                       | No máximo 5 ou 6 itens.                        |
| **Should** | Importante, mas dá pra viver sem na primeira versão. |                                                |
| **Could**  | Seria legal.                                         | Provavelmente nunca vai ser feito.             |
| **Won't**  | Combinado que fica de fora agora.                    | ⚠️ Escreva. É o que protege sua equipe depois. |

4. **Preencha o MVP Canvas** com o que já se sabe. Template em [[12-Kit-de-templates-copiaveis]]. Ele obriga a equipe a responder, numa página, qual é a menor versão que já resolve algo.
5. **Escolha a fatia vertical da Sprint 1**: a menor coisa possível que atravessa o sistema inteiro (tela → API → banco → resposta na tela) e que já dá para mostrar. Ver [[09-As-5-sprints-o-que-entregar-em-cada-uma]].

> MVP e priorização a fundo: [[49-MVP-priorizacao-e-validacao]]. Personas e jornadas: [[47-Elicitacao-personas-e-jornada-do-usuario]].

---

## 📆 Dias 6 a 12: preparar o terreno (e já produzir algo)

Com o entendimento e o backlog na mão, a equipe divide as frentes. Estas são as entregas que o plano de ensino espera desta etapa:

| Frente          | Entregável até o dia 12                                                                                                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Repositório** | README que funciona, `.gitignore`, branch protegida, templates de PR e issue, CI rodando.                                                                                                    |
| **Quadro**      | Issues criadas, com labels e milestone da Sprint 1.                                                                                                                                          |
| **Discovery**   | `visao.md`, `personas.md`, `jornadas.md`, `mvp-canvas.md`, backlog priorizado.                                                                                                               |
| **Foundation**  | `arquitetura.md` com restrições, atributos de qualidade e C4; 2 ou 3 ADRs; `riscos.md`; `estrategia-de-qualidade.md`; `plano-de-releases.md`. Ver [[15-Arquitetura-C4-ADR-riscos-e-spikes]]. |
| **Qualidade**   | `definition-of-done.md` acordada com a equipe. Ver [[16-Qualidade-DoD-e-Quality-Gate]].                                                                                                      |
| **Técnico**     | Stack decidida e um "esqueleto que roda": um endpoint que responde e uma tela que carrega. Spikes das maiores incertezas fechados.                                                           |
| **Design**      | Rascunho das 3 telas principais, mesmo que no papel ou no Figma cru. Ver [[53-Figma-wireframes-prototipos-e-Design-System]].                                                                 |

💡 Distribua as frentes por pessoa **na reunião do dia 1**, com prazo. Artefato sem dono não nasce, e esta é a etapa com mais artefatos de todo o semestre.

💡 **Sobre escolher a stack:** se o projeto é herdado, **não troque nada**. Se é novo, escolha o que a maioria da equipe já sabe, não o que é mais moderno. Aprender framework novo e disciplina nova ao mesmo tempo é como se mudar de cidade na semana da prova.

---

## 📆 Dias 13 e 14: preparar a reunião

- Congele o que está de pé.
- Monte a apresentação da Sprint 0: problema entendido, escopo proposto, plano das próximas sprints, perguntas.
- Ensaie. Sério: 10 minutos ensaiando economizam 40 de constrangimento.
- Roteiro completo em [[08-A-reuniao-com-o-proponente]].

---

## 📆 Dia 15: reunião, review e retro

Reunião com o proponente, depois 30 min só da equipe para a retrospectiva ([[10-Cerimonias-e-rotina-da-equipe]]) e a planning da Sprint 1. Não deixe a planning para "semana que vem". A Sprint 1 começa no dia seguinte.

---

## 🧰 Kit de ferramentas da Sprint 0

Decida tudo isto no dia 1 e não mexa mais:

| Necessidade           | Escolha padrão                         | Alternativas               |
| --------------------- | -------------------------------------- | -------------------------- |
| Código                | GitHub (organização da equipe)         | GitLab                     |
| Quadro de tarefas     | GitHub Projects (fica junto do código) | Trello, Jira               |
| Conversa do dia a dia | WhatsApp ou Discord                    | Telegram                   |
| Documentos e atas     | Pasta `docs/` no próprio repositório   | Google Drive compartilhado |
| Design                | Figma (grátis para estudante)          | Papel fotografado          |
| Reunião remota        | Google Meet                            | Discord                    |

💡 **Por que documentos no repositório:** ficam versionados, sobrevivem à troca de equipe e provam quando cada coisa foi decidida. Se a equipe preferir Drive, tudo bem, mas coloque o link no README.

---

## ✅ Checklist de saída da Sprint 0

**Equipe e processo**

- [ ] `docs/equipe.md` com diagnóstico de competências, papéis e o contato do PO.
- [ ] Acordos de trabalho escritos em `CONTRIBUTING.md`, incluindo branches e code review.
- [ ] `docs/definition-of-done.md` acordada por todos.
- [ ] Ata da reunião zero publicada.

**Ferramentas**

- [ ] Todos os integrantes conseguem rodar o projeto localmente.
- [ ] Repositório com README que funciona, `.gitignore` e branch principal protegida.
- [ ] CI rodando em todo push e PR.
- [ ] Board criado, com issues da Sprint 1 distribuídas.

**Discovery**

- [ ] `docs/visao.md` com problema, stakeholders, escopo e não escopo.
- [ ] `docs/personas.md` e `docs/jornadas.md`.
- [ ] `docs/mvp-canvas.md` preenchido.
- [ ] Backlog priorizado, com as histórias do topo detalhadas e com critérios de aceitação.

**Foundation**

- [ ] `docs/arquitetura.md` com restrições, atributos de qualidade e C4 (contexto e contêineres).
- [ ] Pelo menos 2 ADRs em `docs/adr/`.
- [ ] `docs/riscos.md`, `docs/estrategia-de-qualidade.md` e `docs/plano-de-releases.md`.
- [ ] Spikes das maiores incertezas encerrados, com resposta escrita.
- [ ] Existe algo, por menor que seja, que roda e pode ser mostrado.
- [ ] A data da Sprint Review está no calendário de todo mundo.

---

> Próximo: [[03-Projeto-herdado-entrar-num-codigo-que-nao-e-seu]] ou [[04-Projeto-novo-do-zero-ao-primeiro-commit]], conforme o seu caso.
