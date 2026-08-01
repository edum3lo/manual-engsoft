---
title: '17 - Seminário, defesa, aceite e handover'
---

# 17. Seminário, defesa, aceite e handover

> Manual do NES · Volume 7. As entregas públicas da disciplina: o seminário técnico depois da Sprint 2, a defesa perante banca, o aceite com o Product Owner e a transferência para quem continuar.

---

## 🎤 Seminário técnico (após a Sprint 2)

Público **técnico**: professor e outras equipes. Diferente da Sprint Review, aqui você fala de decisões, métricas, dificuldades e aprendizados.

**Roteiro de 15 minutos:**

| Tempo | Conteúdo |
|---|---|
| 1 min | O problema e o proponente, em uma frase cada |
| 2 min | O que o produto faz hoje (demonstração curta, o fluxo principal) |
| 3 min | Arquitetura: diagrama de contêineres e as duas decisões mais importantes, com o porquê |
| 3 min | Processo: como a equipe se organizou, cerimônias, DoD e Quality Gate |
| 2 min | Métricas das sprints 1 e 2 ([[16-Qualidade-DoD-e-Quality-Gate]]) |
| 2 min | Dificuldades reais e como resolveram |
| 2 min | Aprendizados e o que mudariam |

💡 **O que faz um seminário ser bom:** falar do que deu errado. Equipe que só mostra sucesso soa ensaiada; equipe que conta que subestimou uma tarefa, mediu isso e ajustou a estimativa demonstra engenharia.

🗣️ Exemplo: *"Na Sprint 1 planejamos 12 itens e entregamos 7. Vimos na retrospectiva que as issues estavam grandes demais, passamos a quebrar tudo em pedaços de até um dia, e na Sprint 2 entregamos 11 de 12."* Isso é exatamente o que a disciplina quer ver.

---

## 📦 Release Readiness: o pacote de defesa

Antes da defesa, a equipe congela e organiza. Monte `docs/defesa/README.md` como **índice** de tudo, para a banca não precisar caçar nada:

```markdown
# Pacote de defesa: <Projeto>

## Produto
- Sistema no ar: <URL>
- Usuário de demonstração: <login> / <senha>
- Repositório: <URL>
- Release candidate: tag `v1.0.0-rc1`

## Documentação
- [Visão do produto](../visao.md)
- [Personas](../personas.md) e [jornadas](../jornadas.md)
- [MVP Canvas](../mvp-canvas.md)
- [Requisitos (RF e RNF)](../requisitos.md)
- [Arquitetura e modelos C4](../arquitetura.md)
- [Decisões arquiteturais (ADRs)](../adr/)
- [Modelo de dados](../modelo-de-dados.md)
- [Estratégia de qualidade](../estrategia-de-qualidade.md) e [Definition of Done](../definition-of-done.md)
- [Plano de releases](../plano-de-releases.md) e [instruções de deploy](../deploy.md)
- [Manual do usuário](../manual-do-usuario.md)

## Evidências de processo
- [Atas das reuniões](../atas/)
- [Relatórios de sprint com retrospectivas](../relatorios/)
- [Quality Gates por sprint](../quality-gates/)
- [Registro de riscos](../riscos.md)

## Evidências de qualidade
- Suíte de testes: <n> testes, execução em <link do CI>
- Métricas por sprint: <tabela ou link>
- Defeitos abertos e fechados: <link do filtro de issues>

## Continuidade
- [Backlog residual](<link das issues abertas>)
- [Guia para a próxima equipe](../proxima-equipe.md)
```

**Checklist do Release Readiness:**
- [ ] Release candidate marcado com tag no Git (`git tag -a v1.0.0-rc1 -m "release candidate"` e `git push --tags`).
- [ ] Sistema no ar, com dados de demonstração coerentes.
- [ ] Clone limpo sobe seguindo só o README (teste feito por alguém que não configurou o ambiente).
- [ ] Documentação técnica revisada e sem trecho desatualizado.
- [ ] Nenhum segredo no repositório.
- [ ] Branches mortas apagadas, issues fechadas ou justificadas.
- [ ] Pacote de defesa indexado.

---

## 🏛️ A defesa perante a banca

**Roteiro de 20 minutos** (ajuste ao tempo que a disciplina der):

| Tempo | Conteúdo | Quem fala |
|---|---|---|
| 2 min | Problema, proponente e visão do produto | quem faz a ponte com o PO |
| 8 min | Demonstração do produto, no fluxo do usuário real | quem domina a operação |
| 4 min | Decisões de engenharia: arquitetura, ADRs, trade-offs | quem puxou a arquitetura |
| 3 min | Evidências de qualidade: testes, Quality Gates, métricas | quem cuidou de qualidade |
| 2 min | Processo, riscos e como foram tratados | facilitador |
| 1 min | O que ficou de fora, backlog residual e continuidade | qualquer um |

**Regras da defesa:**
1. **Todo mundo fala.** Banca repara em equipe onde uma pessoa só domina tudo.
2. **Demonstre, não descreva.** Sistema rodando, com plano B gravado em vídeo.
3. **Ensaie cronometrado**, com o sistema aberto, pelo menos uma vez.
4. ⚠️ **Não invente resposta.** *"Não medimos isso, mas dá para verificar assim..."* é uma resposta melhor que um número inventado.

**Perguntas que a banca costuma fazer, e como responder:**

| Pergunta | Como responder bem |
|---|---|
| "Por que escolheram essa stack?" | Cite o ADR: contexto, alternativas consideradas e consequências aceitas. |
| "Como vocês garantiram qualidade?" | DoD, revisão de código, CI, testes e Quality Gate por sprint. Mostre um Quality Gate real. |
| "O que não foi entregue?" | Diga com clareza, com o motivo e o item no backlog residual. Honestidade aqui pesa a favor. |
| "Qual foi a maior dificuldade?" | Uma dificuldade concreta e o que a equipe fez a respeito. |
| "Como o PO participou?" | Cadência das reviews, feedbacks recebidos e o que mudou por causa deles. Cite atas. |
| "O que você fez neste projeto?" (individual) | Duas ou três contribuições concretas, com issue ou PR que comprove. ⚠️ Prepare a sua resposta antes. |

💡 **Prepare sua resposta individual com antecedência.** Rode `git log --author="<seu nome>" --oneline | wc -l` e liste suas 3 entregas mais relevantes. Chegar sem isso é o erro mais comum de quem trabalhou e não soube mostrar.

---

## 🤝 Aceite com o Product Owner

O aceite é formal e fica registrado. `docs/atas/aceite.md`:

```markdown
# Termo de aceite do produto

**Projeto:** <nome>   **Data:** <dd/mm/aaaa>
**Product Owner:** <nome>   **Equipe:** <nomes>

## Escopo acordado e entregue
| Requisito | Status | Observação |
|---|---|---|
| RF01 Cadastro de paciente | Entregue | |
| RF02 Agendamento | Entregue | |
| RF03 Lembrete por e-mail | Não entregue | Dependência externa não disponibilizada; item no backlog residual |

## Validação
O Product Owner utilizou o sistema em <ambiente> e confirma que as
funcionalidades acima atendem ao que foi acordado.

## Pendências e continuidade
- <item> permanece no backlog residual, priorizado como <alta/média/baixa>

## Assinaturas
Product Owner: ______________________
Representante da equipe: ______________________
```

⚠️ Se algo não foi entregue, **escreva**. Aceite que esconde pendência gera conflito depois e a banca costuma perceber pela diferença entre requisitos e demonstração.

---

## 🔁 Handover: a transferência

O plano de ensino pede transferência de conhecimento, backlog residual organizado e planejamento de continuidade. Concentre tudo em `docs/proxima-equipe.md`:

```markdown
# Para quem for continuar este projeto

## O que este sistema é
<duas frases, sem jargão>

## Como colocar para rodar
<passos reais, testados hoje, do clone ao sistema aberto no navegador>

## Como o código está organizado
<mapa das pastas e o que cada uma faz>

## Decisões que você precisa conhecer antes de mudar coisas
- <decisão> porque <motivo>. Detalhe em docs/adr/000X.
- ⚠️ Não mexa em <parte> sem entender <razão>, porque <consequência>.

## O que está incompleto ou frágil
| Área | Situação | Sugestão |
|---|---|---|
| Relatórios | Gera PDF, mas sem paginação | Issue #62 |
| Testes do front | Quase inexistentes | Começar pelos componentes de formulário |

## Backlog residual, na ordem que sugerimos
1. #47 Corrigir horário duplicado (defeito conhecido)
2. #55 Lembrete por e-mail (dependia de acesso externo)
3. #61 Relatório mensal

## Contatos
- Product Owner: <nome e contato>
- Equipe anterior: <nomes e GitHub, se aceitarem ser procurados>

## O que faríamos diferente se começássemos hoje
<três a cinco linhas honestas>
```

Além do documento, faça a **passagem viva** se houver oportunidade: 30 minutos mostrando o sistema e o repositório para a próxima equipe valem mais que dez páginas.

---

## 🔚 Encerramento e aprendizados

`docs/retrospectiva-final.md`, feito com a equipe depois da defesa:

```markdown
# Retrospectiva final do projeto

## O que funcionou no nosso processo
## O que atrapalhou
## O que faríamos diferente
## Aprendizados individuais
- <nome>: <o que aprendeu na prática>
## Melhorias sugeridas para o processo da disciplina
```

Esse documento fecha o último item do programa e é rápido de escrever enquanto a memória está fresca. Deixar para depois significa não escrever.

---

## ✅ Checklist do fechamento

- [ ] Seminário técnico apresentado, com métricas reais.
- [ ] Release candidate marcado com tag e sistema no ar.
- [ ] Pacote de defesa indexado em `docs/defesa/`.
- [ ] Defesa ensaiada, com participação de todos e plano B gravado.
- [ ] Cada integrante sabe descrever as próprias contribuições, com issues e PRs.
- [ ] Termo de aceite assinado pelo PO, com pendências declaradas.
- [ ] `docs/proxima-equipe.md` escrito e backlog residual priorizado.
- [ ] Retrospectiva final registrada.

---

> Fim do Volume 7. Volte ao [[00-Indice]] quando precisar.
