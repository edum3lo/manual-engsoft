---
title: '08 - A reunião com o proponente'
---

# 08. A reunião com o proponente

> Manual do NES · Volume 7. A cada 15 dias sua equipe senta com o cliente. É o momento em que a disciplina é avaliada de verdade e onde a maioria das equipes se perde por falta de roteiro. Aqui está o roteiro.

---

## ⏱️ A linha do tempo da reunião

```
D-3   Confirmar data e mandar pauta
D-2   Congelar código, testar o que vai ser mostrado
D-1   Ensaiar a demo com o build real. Preparar perguntas
D     Reunião (40 a 60 min)
D+1   Enviar ata + gravação/slides. Pedir confirmação
D+1   Retro do time e planning da próxima sprint
```

⚠️ Se você fizer **só uma coisa** deste capítulo, faça o ensaio no D-1 com o sistema de verdade rodando. Demo não ensaiada quebra. Sempre.

---

## 📧 D-3: a pauta por escrito

```
Assunto: NES 2 - Reunião de fechamento da Sprint 2 (quarta, 10/09, 14h)

Olá <nome>,

Confirmando nossa reunião de quarta, 10/09, às 14h, <local ou link>.

Pauta (45 min):
1. O que entregamos nesta sprint (demonstração ao vivo) - 15 min
2. O que não conseguimos entregar e por quê - 5 min
3. Dúvidas que precisamos resolver com você - 10 min
4. Proposta para a próxima sprint - 10 min
5. Combinados e próximos passos - 5 min

Vamos precisar da sua opinião sobre <ponto específico>.

Abraço,
<equipe>
```

Por que isso muda tudo: o proponente chega preparado, a reunião não vira conversa solta, e você tem o controle do tempo.

---

## 🖥️ D-2 e D-1: preparar a demonstração

**Regras da demo:**

1. **Mostre o sistema rodando, não slide.** Slide serve de apoio, não de substituto.
2. **Rode local ou em ambiente estável**, com dados de exemplo que fazem sentido para ele (nomes reais do contexto dele, não "teste123" e "asdasd").
3. **Ensaie o caminho exato** que você vai clicar, na ordem, em voz alta.
4. **Tenha um plano B**: gravação em vídeo da demo funcionando, ou capturas de tela. Se a internet cair ou o banco não subir, você não perde a reunião.
5. **Não mostre código**, a menos que perguntem. Ele não vai ler.
6. ⚠️ **Não invente funcionalidade na hora.** Se não está pronto, você diz que não está.

**Checklist do D-1:**
- [ ] O sistema sobe do zero na máquina de quem vai apresentar.
- [ ] Dados de exemplo carregados e coerentes com o contexto do proponente.
- [ ] Caminho da demo ensaiado do início ao fim, sem erro.
- [ ] Plano B gravado.
- [ ] Slides curtos prontos (no máximo 5).
- [ ] Ata da reunião anterior revisada: o que foi combinado, foi cumprido?

---

## 🗣️ O roteiro do que falar

**Abertura (2 min).** Uma pessoa conduz. Retome o objetivo da sprint.

> *"Oi <nome>, obrigado pelo tempo. O objetivo desta sprint era deixar o agendamento funcionando de ponta a ponta. Vou mostrar o que ficou pronto, depois falo do que não deu, e no fim tenho três perguntas pra você."*

**Demonstração (15 min).** Narre o que está fazendo, do ponto de vista **dele**, não do sistema.

> ❌ *"Aqui eu faço um POST na rota de consultas que valida e persiste no Postgres."*
> ✅ *"Então, a secretária escolhe o médico, vê só os horários livres, e ao confirmar a consulta já aparece na agenda do dia."*

Pare a cada funcionalidade e pergunte: *"É assim que funciona no dia a dia de vocês?"* Essa pergunta é o motivo de a reunião existir.

**O que não foi entregue (5 min).** Fale antes que perguntem. Sem desculpa longa, sem drama.

> *"Duas coisas não ficaram prontas: o envio de e-mail, porque ainda dependemos do acesso ao servidor de e-mail de vocês, e o relatório em PDF, que era maior do que estimamos. As duas são as primeiras da próxima sprint."*

**Perguntas (10 min).** Traga no máximo 3 ou 4, específicas e com opções sempre que der.

> ❌ *"Como deve ser o cadastro?"*
> ✅ *"No cadastro, o CPF vai ser obrigatório? Pergunto porque, se for, não conseguimos cadastrar paciente menor de idade sem documento. Duas opções: deixar opcional, ou aceitar o CPF do responsável. Qual funciona melhor pra vocês?"*

**Próxima sprint (10 min).** Mostre o que a equipe propõe fazer e confirme a prioridade.

> *"Para a próxima, propomos: cancelamento de consulta, envio de lembrete e relatório mensal. Se você tivesse que escolher só uma para sair com certeza, qual seria?"*

**Fechamento (3 min).** Repita em voz alta os combinados e as pendências **dele**.

> *"Fechando: vocês nos passam o acesso ao e-mail até sexta, a gente entrega cancelamento e lembrete, e nos vemos dia 25 no mesmo horário. Mando a ata hoje ainda."*

---

## ❓ O que responder quando você não sabe

Esta é a habilidade mais subestimada da disciplina. Ninguém espera que você saiba tudo. Esperam que você não invente.

| Situação | O que falar |
|---|---|
| Pergunta técnica que você não sabe | *"Boa pergunta, não sei responder agora sem olhar. Anoto e te respondo até amanhã."* |
| "Isso é difícil de fazer?" | *"Não sei estimar de cabeça. A gente avalia e traz o esforço na próxima reunião."* |
| "Dá pra ficar pronto até o dia X?" | *"Depende do que mais entrar. Se isso for prioridade, entra na próxima sprint. Aí alguma outra coisa sai."* |
| Ele critica algo que ficou ruim | *"Faz sentido, obrigado por apontar. Vamos ajustar na próxima sprint."* Anote. Não defenda. |
| Ele muda o pedido inteiro | *"Entendi, é uma mudança grande. Deixa eu levar pra equipe avaliar o impacto e te trago na próxima."* |
| Silêncio constrangedor | *"Enquanto isso, tem alguma coisa do processo de vocês que a gente ainda não perguntou e que seria importante saber?"* |

⚠️ **Nunca**: prometer prazo na hora, dizer "é fácil, faço até amanhã", ou explicar erro com jargão técnico. Prazo se compromete depois da planning, com a equipe.

---

## 📝 D+1: a ata

Manda em até 24 horas. Curta, objetiva, e sempre pedindo confirmação. Template completo em [[12-Kit-de-templates-copiaveis]]:

```markdown
# Ata - Reunião Sprint 2 - 10/09/2026
Presentes: <nomes>  |  Duração: 45 min

## Apresentado
- Agendamento de consulta funcionando de ponta a ponta
- Listagem da agenda do dia

## Decisões
- CPF passa a ser opcional no cadastro de paciente
- Relatório mensal tem prioridade sobre o envio de e-mail

## Pendências do proponente
- [ ] Enviar acesso ao servidor de e-mail (até 13/09)
- [ ] Enviar modelo do relatório usado hoje (até 13/09)

## Compromissos da equipe (Sprint 3)
- [ ] Cancelamento de consulta
- [ ] Relatório mensal em PDF

## Próxima reunião
25/09, 14h, mesmo link
```

🗣️ Mensagem de envio: *"Segue a ata da nossa reunião. Se algo estiver diferente do que você entendeu, me avisa até quarta que eu corrijo. Sem resposta, seguimos com esse combinado."*

Essa última frase é o que na prática protege sua equipe. Ela transforma silêncio em concordância registrada.

---

## 🎯 As reuniões que são diferentes

| Sprint | O foco da reunião |
|---|---|
| **0** | Você **escuta** mais do que fala. Apresenta o entendimento do problema, o escopo proposto e o plano. Se o projeto é herdado, apresenta o diagnóstico do que existe. |
| **1** | Primeira demonstração real, ainda pequena. O objetivo é validar direção: *"é por aqui?"* |
| **2 e 3** | Ritmo de cruzeiro: entrega, feedback, replanejamento. É onde o escopo tenta crescer, segure. |
| **4** | Entrega final: sistema funcionando, documentação, manual de uso, o que ficou de fora, e o caminho para quem continuar. Ver [[09-As-5-sprints-o-que-entregar-em-cada-uma]]. |

---

## ✅ Checklist da reunião

**Antes**
- [ ] Pauta enviada com 2 ou 3 dias.
- [ ] Demo ensaiada com o sistema real, plano B gravado.
- [ ] Perguntas escritas (no máximo 4, específicas).
- [ ] Ata anterior revisada: cumprimos o que prometemos?
- [ ] Definido quem apresenta, quem opera o sistema e quem anota.

**Durante**
- [ ] Mostramos algo funcionando.
- [ ] Falamos o que não saiu, antes de perguntarem.
- [ ] Fizemos as perguntas.
- [ ] Repetimos os combinados no fim, em voz alta.

**Depois**
- [ ] Ata enviada em 24h, pedindo confirmação.
- [ ] Pedidos novos viraram itens do backlog, não promessas.
- [ ] Retro e planning feitas com a equipe.

---

> Próximo: [[09-As-5-sprints-o-que-entregar-em-cada-uma]].
