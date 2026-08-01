---
title: '06 - Backlog, issues e o quadro da sprint'
---

# 06. Backlog, issues e o quadro da sprint

> Manual do NES · Volume 7. Como transformar "a gente tem que fazer um monte de coisa" em tarefas que cabem numa semana, com dono e prazo. Sem isso, a equipe trabalha e ninguém sabe o que foi feito.

---

## 🧱 Os três níveis

| Nível | O que é | Onde vive | Exemplo |
|---|---|---|---|
| **Backlog do produto** | Tudo que o sistema pode vir a ter, priorizado. Vive o projeto inteiro. | `docs/backlog.md` ou o Projects | "Agendamento de consultas" |
| **Backlog da sprint** | O recorte que a equipe se compromete a entregar nestes 15 dias. | Milestone + coluna do quadro | "Agendar consulta: tela + API" |
| **Tarefa** | Um pedaço de 1 a 2 dias, com uma pessoa dona. | Issue | "Criar endpoint POST /consultas" |

⚠️ A confusão mais comum é tratar o backlog do produto como lista de tarefas. Ele é lista de **desejos priorizados**. Tarefa só nasce na planning.

> Fundamentos: [[43-Scrum-na-pratica]], [[45-Estimativas-planejamento-e-ferramentas]].

---

## 🗂️ Montando o quadro no GitHub Projects

Fica junto do código, é grátis e liga issue, PR e tarefa automaticamente.

1. Na organização: aba **Projects** → **New project** → template **Board**.
2. Crie as colunas: **Backlog · A fazer (sprint) · Fazendo · Em revisão · Pronto**.
3. **Settings do projeto → Workflows**: ative os automáticos.
   - "Item closed" → move para **Pronto**
   - "Pull request merged" → move para **Pronto**
4. Adicione campos personalizados úteis: `Sprint` (número), `Estimativa` (P/M/G), `Tipo` (feat/bug/doc).

💡 **Regra da coluna Fazendo:** no máximo uma ou duas issues por pessoa ao mesmo tempo. Quadro com 15 itens em "Fazendo" é quadro que mente.

---

## 🏷️ Labels que valem a pena

Crie estas em **Issues → Labels** e pare por aí. Label demais ninguém usa.

| Label | Uso |
|---|---|
| `feat` / `bug` / `docs` / `chore` | tipo do trabalho |
| `front` / `back` / `banco` | onde mexe |
| `bloqueado` | ⚠️ dependendo de resposta ou de outra tarefa |
| `boa-primeira-tarefa` | pequena e isolada, boa para quem está começando |
| `urgente` | precisa entrar nesta sprint |

💡 A label `boa-primeira-tarefa` é uma ferramenta de equipe subestimada. Se você tem menos prática, peça na planning para marcarem duas dessas para você. É um pedido legítimo e organizado, não um pedido de favor.

---

## 📝 Como escrever uma issue que qualquer um consegue pegar

```markdown
**Título:** Criar endpoint POST /consultas

## Contexto
O front precisa salvar uma nova consulta. A tabela `consultas` já existe (migração #21).

## O que fazer
- [ ] Rota POST /api/consultas
- [ ] Validar: paciente existe, data no futuro, horário livre
- [ ] Retornar 201 com o objeto criado
- [ ] Retornar 400 com mensagem clara quando inválido

## Critério de aceitação
Enviar um POST válido cria a consulta no banco e devolve 201.
Enviar com data passada devolve 400 com mensagem.

## Referências
- Padrão de rota: server/src/routes/pacientes.js
- Estimativa: M (1 a 2 dias)
```

**Uma issue está boa quando** a pessoa que não participou da conversa consegue começar sozinha, sem perguntar nada.

⚠️ Issues ruins que aparecem em todo NES: "Fazer o front", "Banco de dados", "Ajustes". Não têm fim definido, não têm dono real e ficam abertas 3 sprints.

---

## 📏 Estimativa sem sofrimento

Esqueça horas. Use tamanhos:

| Tamanho | Significa | Regra |
|---|---|---|
| **P** | Meio dia. Coisa isolada, já sei fazer. | |
| **M** | 1 a 2 dias. Precisa entender algo antes. | |
| **G** | 3+ dias. | ⚠️ **Quebre em issues menores antes de pegar.** |
| **?** | Ninguém sabe. | Vira uma tarefa de investigação de 4 horas (spike), com prazo. |

**Quanto a equipe cabe numa sprint?** Na primeira, chute: some as horas realistas de cada um (nº de pessoas × horas por semana × 2 semanas) e corte 40% para reuniões, imprevistos, provas de outras matérias e a vida. Nas próximas, use o que **de fato** foi entregue na anterior. Isso se chama velocidade e é a única estimativa que não mente.

---

## 🎯 A planning de 45 minutos

Roteiro fechado, no primeiro dia da sprint:

| Tempo | O que fazer |
|---|---|
| 5 min | Relembrar o objetivo da sprint em uma frase. Ex.: "no fim, dá para agendar uma consulta pela tela". |
| 10 min | Passar as issues candidatas do backlog, na ordem de prioridade. |
| 15 min | Para cada uma: está clara? qual o tamanho? depende de quê? |
| 10 min | Distribuir. Cada pessoa **escolhe** (não recebe imposto), respeitando o limite de horas. |
| 5 min | Confirmar em voz alta: "então fulano faz X e Y, sicrano faz Z". Escrever na ata. |

🗣️ **Como pegar tarefa quando você tem pouca prática, sem travar o time:** *"Eu topo pegar a issue #14, mas nunca fiz isso. Alguém consegue fazer os primeiros 30 minutos comigo na quarta? Depois eu sigo sozinho."* Programar em par funciona, e nenhum time reclama de quem avisa antes.

---

## 🔄 O quadro durante a sprint

- **Mova o cartão você mesmo**, na hora. Quadro atualizado no dia 14 é ficção.
- Pegou a tarefa? Se atribua (assignee) e mova para **Fazendo**.
- Travou? Coloque a label `bloqueado`, escreva o motivo no comentário e avise no grupo **no mesmo dia**.
- PR aberto? Mova para **Em revisão**.
- ⚠️ Nada vai para **Pronto** sem PR integrado na `main`.

**Checkpoint do meio da sprint (dia 7):** olhem o quadro juntos por 15 minutos e respondam: o que está em risco? O que cortamos? É muito melhor cortar escopo no dia 7 do que falhar no dia 15. Cortar cedo e avisar é comportamento de equipe madura.

---

## 📊 O que mostrar na reunião

Do quadro saem, de graça, os números do relatório de sprint:

```
Sprint 2 (01/09 a 15/09)
Planejado: 12 issues
Concluído: 9 issues
Não concluído: 3 (2 por dependência de resposta do proponente, 1 subestimada)
```

🗣️ *"Fechamos 9 das 12 tarefas planejadas. Duas dependiam de uma informação que estava com vocês e uma foi maior do que estimamos. As três entram no início da próxima sprint."* Transparência sobre o que não saiu vale mais que esconder, e o proponente sempre descobre.

> Template completo do relatório: [[12-Kit-de-templates-copiaveis]].

---

## ✅ Checklist do quadro saudável

- [ ] Toda tarefa em execução é uma issue com dono.
- [ ] Nenhuma issue está em **Fazendo** há mais de 4 dias sem comentário.
- [ ] Tudo que está em `Pronto` tem PR integrado.
- [ ] As issues da sprint estão numa milestone com data.
- [ ] Existem issues marcadas para quem tem menos prática.
- [ ] O que está bloqueado tem label e motivo escrito.

---

> Próximo: [[07-Requisitos-do-proponente-a-user-story]].
