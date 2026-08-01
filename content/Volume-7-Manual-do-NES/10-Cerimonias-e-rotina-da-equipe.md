---
title: '10 - Cerimônias e rotina da equipe'
---

# 10. Cerimônias e rotina da equipe

> Manual do NES · Volume 7. Scrum de livro pressupõe gente junta 8 horas por dia. Sua equipe tem 5 pessoas com horários diferentes, outras 4 matérias e estágio. Este capítulo adapta as cerimônias a essa realidade sem perder o que elas servem para resolver.
> Teoria: [[43-Scrum-na-pratica]], [[17-Cerimonias-ferramentas-e-ritmo-de-um-time]].

---

## 🗓️ O ritmo mínimo viável

| Cerimônia | Quando | Duração | Formato realista |
|---|---|---|---|
| **Planning** | Dia 1 da sprint | 45 min | Presencial ou chamada, todo mundo |
| **Daily** | Todo dia útil | 5 min | **Assíncrona**, mensagem no grupo |
| **Sincronização semanal** | Meio da semana | 30 min | Chamada, câmera opcional |
| **Checkpoint de meio de sprint** | Dia 7 | 15 min | Olhar o quadro juntos |
| **Review (com proponente)** | Dia 15 | 45 min | Ver [[08-A-reuniao-com-o-proponente]] |
| **Retrospectiva** | Dia 15, logo após | 30 min | Só a equipe, sem o proponente |

Total: menos de 3 horas de reunião por sprint de 15 dias. Isso é sustentável. Equipe que marca reunião de 2 horas toda semana desiste na sprint 2.

---

## 📋 Planning (45 min)

Roteiro em [[06-Backlog-issues-e-o-quadro-da-sprint]]. O essencial:

1. Objetivo da sprint em **uma frase**. Se não cabe numa frase, a sprint está sem foco.
2. Escolher issues da prioridade do topo do backlog.
3. Cada pessoa **escolhe** o que pega e diz quantas horas tem na quinzena.
4. Registrar tudo na ata e no quadro.

⚠️ Sinal de planning ruim: sai sem número de issues definido, ou com tarefas sem dono ("depois a gente vê quem faz"). Tarefa sem dono não é feita.

---

## 💬 Daily assíncrona (a que funciona na faculdade)

Todo dia útil, até um horário combinado (ex.: 20h), cada um manda no grupo:

```
✅ Ontem: terminei a validação do formulário de cadastro (PR #23 aberto)
🔨 Hoje: começo o endpoint de listagem
🚧 Travado: preciso saber se CPF é obrigatório (perguntei ao PO)
```

Três regras que fazem isso não morrer na segunda semana:
1. **Curto.** Três linhas. Ninguém escreve relatório.
2. **Sem julgamento.** "Hoje não vou conseguir mexer" é resposta válida e útil. O silêncio é que é o problema.
3. **Travado é prioridade.** Quem vê alguém travado e sabe a resposta, responde. É a função inteira da daily.

💡 Se a equipe não consegue manter daily diária, faça 3 vezes por semana (seg, qua, sex). Melhor uma cadência menor que todo mundo cumpre do que uma diária que morre.

---

## 🔍 Checkpoint do dia 7

15 minutos olhando o quadro juntos, respondendo três perguntas:

1. Do que planejamos, o que já está pronto de verdade (integrado na `main`)?
2. O que está em risco de não sair?
3. **O que a gente corta?**

A terceira pergunta é a razão de existir do checkpoint. Cortar escopo no dia 7 é gestão. Descobrir no dia 15 que nada saiu é acidente. Quando cortar, escreva o motivo, isso vira conteúdo honesto para a reunião com o proponente.

---

## 🔄 Retrospectiva (30 min, só a equipe)

Logo depois da reunião com o proponente, enquanto está fresco. Formato mais simples que existe:

| Coluna | Pergunta |
|---|---|
| ✅ **Continuar** | O que funcionou e queremos manter? |
| ⚠️ **Parar** | O que atrapalhou? |
| 💡 **Começar** | O que vamos experimentar na próxima? |

Regras:
- Cada um escreve o seu por 5 minutos, **antes** de discutir. Evita que a primeira fala contamine as outras.
- Fala-se de **processo e situações**, não de pessoas. "PRs ficaram 4 dias parados" em vez de "fulano não revisa nada".
- Saia com **1 ação concreta**, com dono e prazo. Só uma. Cinco ações significam nenhuma.

```markdown
## Retro Sprint 2
Continuar: daily assíncrona funcionou, quase todo mundo postou
Parar: pegar tarefa grande sem quebrar (a #18 travou 8 dias)
Começar: toda issue G vira 2 ou 3 issues M na planning
Ação: <nome> revisa o backlog e quebra as issues G até sexta
```

⚠️ Retro sem ação registrada é desabafo. Útil para o clima, inútil para o processo. Faça as duas coisas: desabafe **e** registre.

---

## 🧑‍🤝‍🧑 A rotina individual da semana

O que se espera de cada pessoa, incluindo você:

| Frequência | Comportamento |
|---|---|
| Diário | Ler o grupo. Postar a daily. |
| 3 a 4 vezes por semana | Sentar 1h30 a 2h no projeto. Commitar o que fez, mesmo incompleto, na sua branch. |
| Semanal | Abrir ao menos 1 PR. Revisar ao menos 1 PR de colega. |
| Semanal | Atualizar o quadro com a realidade. |
| Quinzenal | Participar da planning, da review e da retro. |

💡 **Duas horas, três vezes por semana, com regularidade, produzem muito mais que 8 horas no domingo antes da entrega.** Trabalho concentrado no fim é onde bugs e conflitos de merge nascem.

---

## 🚨 Quando alguém some

Acontece em toda equipe de NES. Protocolo combinado desde a Sprint 0, sem drama e sem fofoca:

1. **Dia 2 de silêncio:** mensagem direta e gentil no privado. *"E aí, tudo certo? Vi que a #18 não andou, precisa de ajuda ou quer passar pra outra pessoa?"* Metade dos sumiços é vergonha de estar travado, não má vontade.
2. **Dia 4:** o facilitador leva ao grupo. Redistribui a tarefa para não travar a sprint.
3. **Dia 7:** registra na ata: *"issue #18 redistribuída por indisponibilidade"*. Sem adjetivo, sem acusação. Fato.
4. **Se persistir:** conversa com o professor. Não é dedurar, é o procedimento da disciplina, e a equipe inteira é avaliada.

⚠️ O erro é cobrir o colega em silêncio até a sprint 4 e explodir na entrega final. Registre cedo, com neutralidade.

E se **você** for quem sumiu: volte falando. 🗣️ *"Pessoal, desculpa o sumiço, tive uma semana ruim. Consigo retomar a partir de quarta, me passa o que é mais urgente."* Isso resolve. Ninguém guarda rancor de quem volta e entrega; guardam de quem some e não responde.

---

## ✅ Checklist da rotina saudável

- [ ] A daily assíncrona tem posts de quase todo mundo, quase todo dia.
- [ ] Nenhum PR fica mais de 48h esperando revisão.
- [ ] Todo mundo commitou algo nos últimos 4 dias.
- [ ] O checkpoint do dia 7 aconteceu e algo foi cortado ou confirmado.
- [ ] A última retro gerou uma ação, e ela foi feita.
- [ ] Ninguém está sumido há mais de 3 dias sem alguém ter perguntado.

---

> Próximo: [[11-Quando-voce-nao-sabe-o-que-fazer]].
