---
title: '09 - As sprints: o que entregar em cada uma'
---

# 09. As sprints: o que entregar em cada uma

> Manual do NES · Volume 7. O semestre inteiro em uma página por etapa: objetivo, entregáveis exigidos, o que muda se o projeto for herdado, riscos e o sinal de que você está atrasado.
> Esta versão segue o **plano de ensino da disciplina**. O mapa item a item do plano está em [[14-Do-plano-de-ensino-ao-artefato]].

---

## 🗺️ O ciclo, do jeito que o plano de ensino descreve

```
ONBOARDING            equipes formadas, PO identificado, acordos de trabalho
ENGINEERING ENABLEMENT repositório, ambiente, CI, branches, code review, DoD
SPRINT 0 (a)          Product Discovery & Inception
SPRINT 0 (b)          Technical Foundation & Architecture Runway
SPRINT 1              incremento + Quality Gate + Review + Retro
SPRINT 2              evolução + estabilização + Quality Gate + seminário técnico
SPRINT 3              conclusão + Quality Gate final + validação do produto
RELEASE READINESS     release candidate, documentação, pacote de defesa
DEFESA                apresentação e demonstração perante banca
ACCEPTANCE & HANDOVER aceite com o PO, transferência, backlog residual
```

⚠️ **Sobre a numeração:** o plano lista Sprint 0 a 3 e depois o ciclo de fechamento. Se a sua turma chama esse fechamento de "Sprint 4", é a mesma coisa: Release Readiness, Defesa e Handover ocupam esse lugar. Confirme o cronograma com datas na primeira aula e escreva no `docs/`.

Duas linhas atravessam tudo: **documentação e evidências caminham junto com o código** (nunca deixe para o fim, porque cada sprint tem Quality Gate) e **toda sprint termina com incremento demonstrável** (nunca "esta sprint foi só de estudo").

---

## 🚪 Onboarding e Engineering Enablement

Acontece nas primeiras aulas, antes ou junto do começo da Sprint 0.

| Entregável | Onde vive |
|---|---|
| Equipe formada e diagnóstico de competências | `docs/equipe.md`: quem sabe o quê, quem quer aprender o quê |
| Papéis definidos, incluindo quem fala com o PO | `docs/equipe.md` |
| Acordos de trabalho (working agreements) | `CONTRIBUTING.md` ou `docs/combinados.md` |
| Repositório configurado e todo mundo com acesso | GitHub |
| Ambiente de desenvolvimento rodando **na máquina de todos** | verificado, não presumido |
| Estratégia de branches e política de code review | `CONTRIBUTING.md` |
| Integração contínua ligada, mesmo que mínima | `.github/workflows/ci.yml` |
| **Definition of Done** escrita e acordada | `docs/definition-of-done.md`, ver [[16-Qualidade-DoD-e-Quality-Gate]] |
| Ferramenta de acompanhamento com o board criado | GitHub Projects |

**🚩 Sinal de atraso:** alguém ainda não rodou o projeto quando a Sprint 0 já começou. Pare tudo e resolva em chamada, junto.

Como fazer, na prática: [[02-Sprint-0-a-primeira-semana]], [[04-Projeto-novo-do-zero-ao-primeiro-commit]] e [[03-Projeto-herdado-entrar-num-codigo-que-nao-e-seu]].

---

## 🔎 Sprint 0 (a): Product Discovery & Inception

**Objetivo:** entender o problema e transformar entendimento em backlog priorizado.

| Entregável exigido | Onde vive |
|---|---|
| Compreensão do problema e identificação dos stakeholders | `docs/visao.md` |
| Visão do produto | `docs/visao.md` |
| Personas | `docs/personas.md` |
| Jornadas do usuário | `docs/jornadas.md` |
| Lista de funcionalidades | `docs/backlog.md` |
| Histórias de usuário com critérios de aceitação | issues no GitHub |
| MVP Canvas | `docs/mvp-canvas.md` |
| Product Backlog priorizado | GitHub Projects + `docs/backlog.md` |

Como produzir cada um: [[07-Requisitos-do-proponente-a-user-story]] e o template do MVP Canvas em [[12-Kit-de-templates-copiaveis]].

**Riscos:** entrevistar o PO sem pauta e sair com anotação solta; escrever história sem critério de aceitação; backlog sem priorização, que é o mesmo que backlog sem decisão.

---

## 🏛️ Sprint 0 (b): Technical Foundation & Architecture Runway

**Objetivo:** ter fundação técnica suficiente para começar a construir sem travar na sprint 1.

| Entregável exigido | Onde vive |
|---|---|
| Restrições levantadas (tecnológicas, legais, de infraestrutura) | `docs/arquitetura.md` |
| Atributos de qualidade priorizados | `docs/arquitetura.md`, ver [[15-Arquitetura-C4-ADR-riscos-e-spikes]] |
| Arquitetura inicial em modelos C4 (contexto e contêineres) | `docs/arquitetura.md` |
| Decisões arquiteturais registradas (ADRs) | `docs/adr/0001-*.md` |
| Riscos identificados, com mitigação | `docs/riscos.md` |
| Estratégia de qualidade e testes | `docs/estrategia-de-qualidade.md` |
| Planejamento de releases | `docs/plano-de-releases.md` |
| Technical spikes executados | issues com label `spike` + registro do resultado |

💡 **Spike** é uma investigação com prazo fechado (por exemplo 4 horas) para responder uma pergunta técnica: "conseguimos gerar PDF nessa stack?". Ele termina com uma resposta escrita, não com funcionalidade.

**Riscos:** discutir arquitetura por 10 dias sem escrever nada; desenhar C4 lindo e não codar; escolher tecnologia que ninguém da equipe sabe usar.
**🚩 Sinal de atraso:** a Sprint 0 vai acabar e não existe nenhum código que rode de ponta a ponta.

⚠️ Mesmo na Sprint 0, tenha um **esqueleto que roda** (tela chamando API que responde). É o que prova que a arquitetura escolhida funciona.

---

## 🥩 Sprint 1: primeiro incremento de verdade

**Objetivo:** o usuário consegue fazer **uma** coisa completa, do clique ao banco e de volta. É a fatia vertical.

| Entregável | Detalhe |
|---|---|
| Incremento funcionando, integrado na `main` | 1 ou 2 funcionalidades completas |
| Testes automatizados nas regras da fatia | ver [[82-TDD-e-testes-automatizados]] |
| CI rodando em todo PR | verde antes do merge |
| Product Backlog refinado | itens do topo prontos para a próxima sprint |
| Revisão técnica de código feita | PRs revisados, comentários resolvidos |
| **Quality Gate** da sprint | checklist em [[16-Qualidade-DoD-e-Quality-Gate]] |
| Sprint Review com o PO | ver [[08-A-reuniao-com-o-proponente]] |
| Sprint Retrospective com ação registrada | `docs/relatorios/sprint-1.md` |

**Se o projeto é herdado:** a fatia é uma melhoria ou correção pequena de ponta a ponta no que já existe. Vale igual e ainda prova domínio do código legado.

**Riscos:** dividir tarefa por camada e integrar só no dia 14; querer entregar oito coisas pela metade.
**🚩 Sinal de atraso:** dia 10 sem nenhuma tela conectada à API. Corte escopo hoje e entregue uma coisa funcionando.

---

## 🏗️ Sprint 2: evoluir, estabilizar e apresentar

**Objetivo:** o sistema já resolve parte real do problema do PO, e a equipe apresenta isso publicamente no **seminário técnico**.

| Entregável | Detalhe |
|---|---|
| Evolução do incremento | funcionalidades do núcleo |
| Revisão de arquitetura | o que foi decidido na Sprint 0 continua válido? Registre ADR se mudou |
| Testes de integração | as partes conversando, não só unidades |
| Estabilização | bugs conhecidos fechados, comportamento previsível |
| Quality Gate da sprint | |
| Sprint Review com o PO | |
| **Seminário técnico** | resultados, métricas, decisões, dificuldades e aprendizados das sprints 1 e 2 |

O seminário é avaliado e é diferente da Sprint Review: o público é técnico (professor e outras equipes), então aqui você **pode e deve** falar de arquitetura, decisões e números. Roteiro em [[17-Defesa-aceite-e-handover]].

**Riscos:** escopo crescendo com pedido novo no meio da sprint ([[07-Requisitos-do-proponente-a-user-story]]); dívida técnica da sprint 1 cobrando juros; alguém sumindo.
**🚩 Sinal de atraso:** a equipe está refazendo o que já funcionava em vez de avançar.

💡 Esta é a sprint em que quase toda equipe descobre que subestimou tudo. É normal. Recalibre pela velocidade real ([[06-Backlog-issues-e-o-quadro-da-sprint]]) e replaneje sem culpa.

---

## 🧩 Sprint 3: concluir, validar e fechar o Quality Gate final

**Objetivo:** as funcionalidades prioritárias estão concluídas, integradas e validadas pelo PO.

| Entregável | Detalhe |
|---|---|
| Funcionalidades prioritárias concluídas | acabou o Must; o resto é bônus |
| Integração completa | nada de "funciona só na minha máquina" |
| Defeitos resolvidos | os conhecidos, priorizados |
| Testes cobrindo as regras críticas | ver [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] |
| Documentação técnica atualizada | arquitetura, ADRs, modelo de dados, API |
| **Validação do produto com o PO** | ele usa e confirma que atende |
| **Quality Gate final** | ver [[16-Qualidade-DoD-e-Quality-Gate]] |
| Sprint Review e Retrospective | |

💡 **Coloque o sistema no ar nesta sprint, não na última.** Um link que o PO abre e testa sozinho gera feedback que nenhuma demonstração produz, e deploy sempre demora mais do que se imagina. Ver [[118-Deploy-cloud-producao-e-monitoramento]].

**Riscos:** deixar deploy, testes e documentação para o fim; equipe cansada; provas de outras matérias.
**🚩 Sinal de atraso:** ainda existe funcionalidade prioritária não começada no dia 10 da sprint.

---

## 📦 Release Readiness, Defesa e Handover

**Objetivo:** entregar. A partir daqui, nada de funcionalidade nova.

| Etapa | Entregável |
|---|---|
| **Release Readiness** | Release candidate validado, documentação técnica revisada, implantação preparada, **pacote de defesa** consolidado |
| **Defesa do projeto** | Apresentação e demonstração do produto, das decisões de engenharia, das evidências de qualidade e dos resultados, perante banca |
| **Product Acceptance** | Aceite formal com o PO, registrado em ata |
| **Handover** | Transferência de conhecimento, backlog residual organizado, plano de continuidade |
| **Encerramento** | Análise dos aprendizados e reflexão sobre melhorias do processo |

O capítulo inteiro dessa etapa, com roteiro de apresentação e checklist do pacote de defesa: [[17-Defesa-aceite-e-handover]].

**A entrega mais generosa (e que a banca nota):** um `docs/proxima-equipe.md` com o estado real do projeto, as decisões e suas razões, os problemas conhecidos e o que fazer primeiro. Se você herdou um projeto e sofreu com a falta disso, é a hora de não repetir.

**🚩 Sinal de atraso:** faltando 10 dias para a defesa e o README ainda é o padrão do GitHub.

---

## 📌 Tabela de bolso

| Etapa | Uma palavra | Pergunta que responde | Entrega âncora |
|---|---|---|---|
| Enablement | Preparar | Conseguimos trabalhar juntos? | Ambiente + CI + DoD |
| Sprint 0 (a) | Entender | Que problema resolvemos e para quem? | Backlog priorizado + MVP Canvas |
| Sprint 0 (b) | Fundar | Com qual arquitetura e quais riscos? | C4 + ADRs + estratégia de qualidade |
| Sprint 1 | Atravessar | A arquitetura funciona ponta a ponta? | Primeira fatia vertical |
| Sprint 2 | Construir | O sistema já serve pra alguma coisa? | Núcleo + seminário técnico |
| Sprint 3 | Concluir | Dá pra confiar nele? | Prioritárias fechadas + Quality Gate final |
| Fechamento | Entregar | Alguém consegue usar e continuar? | Defesa + aceite + handover |

---

## ✅ Checklist de fim de qualquer sprint

- [ ] O que está na `main` roda do zero seguindo o README.
- [ ] O Quality Gate da sprint foi verificado item a item.
- [ ] Demo ensaiada com o build real.
- [ ] Relatório da sprint escrito: planejado × entregue × por quê.
- [ ] Documentação e ADRs atualizados junto com o código.
- [ ] Issues fechadas ou movidas para a próxima sprint, com motivo.
- [ ] Retrospectiva feita, com uma ação de melhoria escolhida e com dono.
- [ ] Sprint Planning da próxima feita antes de o time se dispersar.

---

> Próximo: [[10-Cerimonias-e-rotina-da-equipe]]. Para o mapa item a item do plano de ensino, vá para [[14-Do-plano-de-ensino-ao-artefato]].
