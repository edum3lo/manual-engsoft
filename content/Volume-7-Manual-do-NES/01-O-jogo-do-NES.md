---
title: '01 - O jogo do NES (como a disciplina funciona)'
---

# 01. O jogo do NES

> Manual do NES · Volume 7. Antes de qualquer comando: entenda o que está sendo avaliado, quem é quem, e por que a sensação de "eu não sei nada" é praticamente o estado padrão de quem entra.

---

## 🎯 O que a disciplina realmente mede

O NES simula rotina de mercado. E no mercado, **ninguém é contratado por saber tudo**. As pessoas são mantidas no time por três coisas:

| O que é avaliado de verdade | Como aparece na prática |
|---|---|
| **Você entrega o combinado?** | A tarefa que você pegou na planning está pronta na review, ou você avisou com antecedência que não ficaria. |
| **Dá pra confiar no que você fala?** | Quando você diz "tá 80%", está mesmo. Quando não sabe, você fala que não sabe. |
| **Você é fácil de trabalhar junto?** | Responde no grupo, aparece nas reuniões, revisa PR dos outros, não some. |

Perceba o que **não** está nessa lista: ser o melhor programador da equipe. O aluno que escreve o código mais bonito e some por 10 dias tira nota pior do que o que entrega coisas simples com regularidade.

> 💡 A régua do NES é a mesma do seu primeiro emprego. Ver [[10-Guia-do-Primeiro-Mes]] e [[109-Colaboracao-humana]].

---

## 🧾 As evidências que sobram de você

A nota não sai da cabeça do professor. Sai de rastros. Saiba quais são e alimente todos:

O plano de ensino diz, com todas as letras, que o repositório é usado para **registro das atividades individuais e coletivas**. Ou seja: os rastros são o instrumento de avaliação. Saiba quais são e alimente todos.

1. **Histórico do Git.** Seus commits, com data e mensagem. Um `git log --author="Seu Nome"` conta sua história inteira na disciplina.
2. **Issues e o quadro.** Quem pegou o quê, quando moveu, quando fechou.
3. **Pull Requests.** Os seus, e os comentários que você deixou nos dos outros (revisão de código também é entrega).
4. **Atas, relatórios de sprint e retrospectivas.** Onde ficam registradas as decisões e quem se comprometeu com o quê.
5. **Artefatos do plano de ensino.** Visão, personas, backlog, C4, ADRs, riscos, Quality Gates. Ver [[14-Do-plano-de-ensino-ao-artefato]].
6. **As apresentações.** Sprint Reviews com o PO, seminário técnico depois da Sprint 2, e a defesa perante banca. Ver [[17-Defesa-aceite-e-handover]].

⚠️ **Armadilha clássica:** trabalhar muito e não deixar rastro. Programar em par no PC do colega a tarde inteira e ele commitar tudo no nome dele. Se isso acontecer, use `git commit --author` ou coautoria, ou pelo menos registre na ata. Trabalho invisível não vira nota.

💡 Na defesa costuma vir a pergunta individual: *"o que você fez neste projeto?"*. Quem alimentou os rastros responde em 30 segundos, com issue e PR na tela.

---

## 👥 Os papéis dentro da equipe

Numa equipe de 4 a 6 pessoas do NES, os papéis costumam se distribuir assim. Uma pessoa pode acumular dois, e todo mundo continua programando.

| Papel | O que faz na prática | Quanto custa por semana |
|---|---|---|
| **Scrum Master / facilitador** | Marca as cerimônias, garante que a ata sai, cobra quem sumiu, protege o time de escopo extra. | 2 a 3 h |
| **Analista de produto (ponte com o PO)** | Fala com o Product Owner, mantém o backlog priorizado e refinado, escreve histórias e critérios de aceitação. | 3 a 4 h |
| **Tech lead / arquiteto** | Conduz a arquitetura, escreve os ADRs, define padrão de código, revisa os PRs mais críticos. | Contínuo |
| **Dev back-end** | API, banco, regras de negócio. | O grosso do tempo |
| **Dev front-end** | Telas, integração com a API. | O grosso do tempo |
| **QA / gestão de configuração** | Cuida da Definition of Done, do Quality Gate, dos testes e das evidências; organiza `docs/` e o registro de defeitos. | 3 a 4 h |

⚠️ **Atenção ao nome "Product Owner".** No NES, o PO costuma ser a pessoa externa que trouxe o problema (o proponente), identificada logo no onboarding. Quem na equipe conversa com ele é a ponte, não o dono do produto. Confirme isso na primeira aula, porque muda quem decide prioridade.

🗣️ **Se você não sabe qual pegar e tem pouca prática de código:** peça o papel de **Scrum Master ou QA/documentação na sprint 0** e programe em par nas sprints seguintes. É honesto, é útil de verdade para o time, e te dá 15 dias para estudar a stack enquanto entrega valor. Não é "fugir do código", é escolher a ordem em que você aprende.

> Detalhes dos papéis e das cerimônias: [[43-Scrum-na-pratica]] e [[14-Os-papeis-da-area-de-tecnologia]].

---

## 🏛️ Quem é o Product Owner e o que ele quer

O PO (o proponente do projeto) é a pessoa ou o setor que tem um problema real e recebeu sua equipe para resolvê-lo: um professor, um laboratório, uma diretoria da universidade, uma empresa parceira. Três verdades sobre ele:

1. **Ele não é técnico** (na maioria dos casos). Não adianta falar de Docker, ele quer ver a tela funcionando e o problema dele menor.
2. **Ele tem pouco tempo.** A reunião de 40 minutos a cada 15 dias é tudo que você tem. Chegue com pauta.
3. **Ele muda de ideia.** Isso não é traição, é o normal do software. É exatamente por isso que existem sprints curtas.

O maior erro de equipe de NES não é técnico: é **passar 30 dias construindo o que ninguém pediu** porque ninguém quis parecer burro perguntando.

---

## 🌀 Sobre a sensação de ser uma farsa

Você vai olhar para o repositório na primeira semana, não entender nada, e concluir que é o único ali que não sabe. Duas informações que ajudam:

- **Ninguém entende um código novo de primeira.** Um engenheiro sênior leva de 2 a 4 semanas para ficar produtivo num repositório desconhecido. A diferença é que ele já passou por isso antes e sabe que a névoa passa. Ver [[03-Projeto-herdado-entrar-num-codigo-que-nao-e-seu]].
- **Metade da sua turma está exatamente igual a você**, incluindo os que falam com segurança. Segurança na fala é uma habilidade separada de competência técnica.

O que resolve isso não é estudar mais três meses antes de agir. É **reduzir o tamanho do primeiro passo** até ele caber no que você consegue fazer hoje: rodar o projeto, mudar um texto de um botão, abrir um PR. Depois o próximo. Ver [[11-Quando-voce-nao-sabe-o-que-fazer]].

> 💡 Regra prática: se uma tarefa te dá vontade de fugir, ela está grande demais. Quebre no menor pedaço que ainda produz algo visível.

---

## 📅 O ritmo de um ciclo de 15 dias

| Dias | O que acontece |
|---|---|
| **1** | Planning: escolher as tarefas da sprint e distribuir. |
| **2 a 6** | Execução. Commits diários, PRs pequenos, dúvidas cedo. |
| **7** | Checkpoint no meio: o que está de pé, o que está em risco. Corta escopo aqui, não no dia 14. |
| **8 a 12** | Execução, integração das partes, começa a estabilizar. |
| **13** | ⚠️ **Congelamento**: nada de funcionalidade nova. Só bug, teste e preparação da demo. |
| **14** | Ensaio da demo com o build de verdade, atualizar documentação e relatório. |
| **15** | Reunião com o proponente. Review + retrospectiva do time. |

Grave o dia 13. Equipe que programa funcionalidade nova na véspera da demo é equipe que faz demo quebrada.

---

## ✅ Checklist: você está no jogo?

- [ ] Sei o nome do proponente e o problema dele em uma frase.
- [ ] Sei qual é o meu papel nesta sprint.
- [ ] Tenho acesso ao repositório e consigo rodar o projeto na minha máquina.
- [ ] Sei qual é a minha tarefa desta semana e ela cabe em 1 ou 2 dias.
- [ ] Sei a data da próxima reunião com o proponente.
- [ ] Fiz pelo menos um commit nos últimos 3 dias.

Se algum item ficou desmarcado, o capítulo que resolve está no [[00-Indice]].

---

> Próximo: [[02-Sprint-0-a-primeira-semana]], o roteiro dia a dia dos primeiros 15 dias.
