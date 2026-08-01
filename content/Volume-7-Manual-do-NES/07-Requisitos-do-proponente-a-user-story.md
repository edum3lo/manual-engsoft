---
title: '07 - Requisitos: do proponente à user story'
---

# 07. Requisitos: do proponente à user story

> Manual do NES · Volume 7. O proponente falou 40 minutos, você anotou meia página e não sabe o que virar tarefa. Este capítulo é a ponte entre a conversa e o backlog.
> Base teórica: [[46-O-que-sao-requisitos]], [[47-Elicitacao-personas-e-jornada-do-usuario]], [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]].

---

## 🎤 Como conduzir a conversa de levantamento

**Antes:** mande a pauta por escrito com 2 dias de antecedência e leve perguntas prontas. Combine quem pergunta e quem anota (nunca a mesma pessoa).

**Durante:** pergunte sobre o **processo atual**, não sobre o sistema imaginado. O proponente não é projetista, ele é dono do problema.

Perguntas que sempre rendem:

| Pergunta | Por que funciona |
|---|---|
| "Me conta como isso funciona hoje, passo a passo, do começo ao fim." | Revela o processo real, incluindo o que ele nem lembraria de pedir. |
| "Onde vocês perdem mais tempo hoje?" | Aponta a prioridade real. |
| "Quem usa isso além de você? O que essa pessoa faz?" | Descobre perfis de usuário escondidos. |
| "O que acontece quando dá errado?" | Faz aparecer as exceções, que são metade do trabalho. |
| "Existe alguma planilha ou caderno envolvido?" | Quase sempre existe, e ela É o sistema atual. Peça uma cópia. |
| "Se a gente entregasse só uma coisa neste semestre, qual seria?" | Define o MVP em uma frase. |
| "Tem alguma regra ou norma que a gente precisa seguir?" | Puxa restrições legais, LGPD, regimento interno. Ver [[101-LGPD-e-privacidade]]. |

⚠️ **Não prometa nada na reunião.** A resposta segura é: *"Anotei, vamos avaliar o esforço e trazemos na próxima."*

**Depois:** em até 24 horas, mande a ata por escrito e peça confirmação. É isso que transforma conversa em acordo.

🗣️ *"Segue o resumo do que entendemos. Se algum ponto estiver diferente do que você quis dizer, me avisa que corrijo antes de a gente começar."*

---

## 🧾 Requisito funcional e não funcional

| Tipo | Responde | Exemplo |
|---|---|---|
| **Funcional (RF)** | O que o sistema faz | RF01: O sistema deve permitir que a secretária cadastre um paciente. |
| **Não funcional (RNF)** | Como ele se comporta | RNF01: A busca deve responder em menos de 2 segundos com 5.000 registros. |

Formato de tabela em `docs/requisitos.md`:

```markdown
| ID | Requisito | Prioridade | Sprint | Status |
|----|-----------|-----------|--------|--------|
| RF01 | Cadastrar paciente com nome, CPF, telefone | Must | 1 | ✅ |
| RF02 | Agendar consulta em horário livre | Must | 2 | 🔄 |
| RF03 | Enviar lembrete por e-mail 24h antes | Should | 4 | ⏳ |
| RNF01 | Funcionar em celular (responsivo) | Must | 2 | 🔄 |
```

Manter isso atualizado é trabalho de 10 minutos por sprint e é um dos artefatos mais valorizados na avaliação, porque mostra rastreabilidade: do que o cliente pediu até o que foi entregue.

---

## 📖 A user story

Formato:

> **Como** \<perfil de usuário\>, **quero** \<fazer alguma coisa\>, **para** \<obter algum benefício\>.

```
Como secretária, quero agendar uma consulta escolhendo o médico e o horário,
para não precisar conferir a agenda de papel a cada ligação.
```

O "para" é a parte que quase todo mundo esquece e é a mais importante: é ela que permite você propor uma solução mais simples que resolve o mesmo problema.

**Critérios de aceitação** (o que torna a história testável):

```markdown
### Critérios de aceitação
- [ ] Só aparecem horários livres do médico escolhido
- [ ] Não é possível agendar em data passada
- [ ] Ao salvar, a consulta aparece na agenda do dia
- [ ] Se o horário for ocupado por outra pessoa nesse meio tempo, mostra mensagem e recarrega
```

Regra prática: **se você não consegue escrever como testar, o requisito ainda não está entendido.** Volte e pergunte.

---

## 🔪 Fatiando: de história grande para tarefa de 2 dias

Uma história como "gestão de consultas" é grande demais. Fatie **por comportamento**, nunca por camada.

❌ Errado (fatia por camada, nada funciona até o fim):
```
1. Fazer todo o banco
2. Fazer toda a API
3. Fazer todo o front
```

✅ Certo (cada fatia entrega algo demonstrável):
```
1. Listar consultas do dia (só leitura, dados fixos)   → mostra tela funcionando
2. Listar consultas do dia lendo do banco              → liga a ponta com o back
3. Criar consulta pelo formulário                      → primeiro fluxo completo
4. Impedir horário duplicado                           → a regra de negócio
5. Cancelar consulta                                   → complementa o ciclo
6. Filtrar por médico                                  → conforto
```

Com a fatia por comportamento, se a sprint acabar no item 3 você **ainda tem o que demonstrar**. Com a fatia por camada, você teria três pedaços e nenhuma tela.

---

## 🚫 Controle de escopo (o assassino silencioso do NES)

No meio da sprint 3, o proponente diz: *"Ah, e já que vocês estão nisso, dava pra ter um aplicativo também?"*

O que **não** fazer: dizer sim por educação. O que fazer:

🗣️ *"Legal, faz sentido. Vou registrar como um novo item do backlog e trazer na próxima reunião com uma estimativa. Se for prioridade, a gente vê o que sai para dar lugar a isso."*

Isso é firme, educado e profissional. Três princípios:
1. **Nada entra no meio da sprint.** Entra no backlog, é priorizado na próxima planning.
2. **Toda entrada implica uma saída.** O tempo da equipe é fixo.
3. **Registre por escrito.** Pedido que só existiu na fala vira "mas vocês tinham combinado" lá na frente.

---

## 🗺️ Os artefatos mínimos de requisitos no NES

Não faça documentação para encher linguiça. Estes bastam e são os que costumam ser cobrados:

| Artefato | Arquivo | Quando fazer | Quando atualizar |
|---|---|---|---|
| Documento de visão (problema, stakeholders, escopo, não escopo) | `docs/visao.md` | Sprint 0 | Se o escopo mudar |
| Personas (2 a 4, com objetivos e dores) | `docs/personas.md` | Sprint 0 | Se aparecer perfil novo |
| Jornadas do usuário (hoje × com o sistema) | `docs/jornadas.md` | Sprint 0 | A cada fluxo novo |
| MVP Canvas | `docs/mvp-canvas.md` | Sprint 0 | Se o MVP for repactuado |
| Tabela de requisitos RF/RNF | `docs/requisitos.md` | Sprint 0 e 1 | Toda sprint |
| Histórias com critérios de aceitação | nas issues | Toda planning | Contínuo |
| Diagrama de casos de uso | `docs/casos-de-uso.md` | Sprint 1 | Se aparecer ator novo. Ver [[55-Casos-de-uso-e-diagrama-de-classes]] |
| Modelo de dados (entidades e relações) | `docs/modelo-de-dados.md` | Sprint 1 | A cada tabela nova. Ver [[69-Modelagem-de-dados-e-normalizacao]] |
| Protótipo das telas principais | Figma, link no README | Sprint 0 e 1 | Antes de programar tela nova. Ver [[53-Figma-wireframes-prototipos-e-Design-System]] |

💡 Escreva tudo em Markdown dentro do repositório. Fica versionado, aparece bonito no GitHub, e o professor consegue ver a evolução por commit.

---

## ✅ Checklist de requisitos

- [ ] Consigo explicar o problema do proponente em uma frase, sem jargão.
- [ ] Sei quem são os perfis de usuário e o que cada um quer.
- [ ] Existe uma tabela de RF/RNF com prioridade.
- [ ] Toda issue da sprint tem critério de aceitação testável.
- [ ] Existe uma lista escrita do que está **fora** do escopo.
- [ ] A ata da última conversa foi enviada e confirmada pelo proponente.

---

> Próximo: [[08-A-reuniao-com-o-proponente]].
