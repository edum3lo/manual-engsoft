---
title: '14 - Do plano de ensino ao artefato'
---

# 14. Do plano de ensino ao artefato

> Manual do NES · Volume 7. Cada linha do programa da disciplina traduzida em: **o que produzir, onde guardar e quando**. Se você não sabe o que significa um termo do plano, o glossário está no fim deste capítulo.

---

## 🧾 A tabela mestra

| Item do plano de ensino | Artefato que a equipe produz | Arquivo / lugar | Quando |
|---|---|---|---|
| Onboarding, diagnóstico de competências, formação das equipes | Quadro de quem sabe o quê e quem quer aprender o quê | `docs/equipe.md` | Início |
| Identificação dos Product Owners | Nome, contato e disponibilidade do PO registrados | `docs/equipe.md` | Início |
| Acordos de trabalho | Combinados de comunicação, reuniões, código e ausências | `CONTRIBUTING.md` | Início |
| Configuração dos repositórios | Repositório na organização, README, `.gitignore`, licença | GitHub | Enablement |
| Ambientes de desenvolvimento | Setup reproduzível, `.env.example`, `docker-compose.yml` | raiz do repo | Enablement |
| Ferramentas de acompanhamento | Board com colunas e automações | GitHub Projects | Enablement |
| Integração contínua | Workflow que roda build e testes em todo PR | `.github/workflows/ci.yml` | Enablement |
| Estratégia de branches | Padrão de nomes e fluxo de PR escrito | `CONTRIBUTING.md` | Enablement |
| Revisão de código | Política: 1 aprovação, ninguém aprova o próprio PR | `CONTRIBUTING.md` + branch protection | Enablement |
| Definition of Done | Lista do que torna um item "pronto" | `docs/definition-of-done.md` | Enablement |
| Compreensão do problema | Documento de visão | `docs/visao.md` | Sprint 0 (a) |
| Identificação de stakeholders | Tabela de quem é afetado e como | `docs/visao.md` | Sprint 0 (a) |
| Visão do produto | Frase de visão + objetivos | `docs/visao.md` | Sprint 0 (a) |
| Personas | 2 a 4 personas com objetivos e dores | `docs/personas.md` | Sprint 0 (a) |
| Jornadas | Passo a passo do usuário hoje e no futuro | `docs/jornadas.md` | Sprint 0 (a) |
| Funcionalidades | Lista bruta agrupada por tema | `docs/backlog.md` | Sprint 0 (a) |
| Histórias de usuário | Uma issue por história | GitHub Issues | Sprint 0 (a) em diante |
| Critérios de aceitação | Dentro de cada issue, em checklist | GitHub Issues | Sempre |
| MVP Canvas | Canvas preenchido | `docs/mvp-canvas.md` | Sprint 0 (a) |
| Priorização do Product Backlog | Backlog ordenado, com MoSCoW ou similar | Projects + `docs/backlog.md` | Sprint 0 (a) |
| Restrições | Lista de limites técnicos, legais e de prazo | `docs/arquitetura.md` | Sprint 0 (b) |
| Atributos de qualidade | 3 a 5 atributos priorizados, com meta | `docs/arquitetura.md` | Sprint 0 (b) |
| Arquitetura inicial e modelos C4 | Diagramas de contexto e contêineres | `docs/arquitetura.md` | Sprint 0 (b) |
| Decisões arquiteturais | Um ADR por decisão relevante | `docs/adr/NNNN-titulo.md` | Contínuo |
| Riscos | Tabela de risco, impacto, probabilidade e mitigação | `docs/riscos.md` | Sprint 0 (b), revisada por sprint |
| Estratégia de qualidade | O que será testado, como e por quem | `docs/estrategia-de-qualidade.md` | Sprint 0 (b) |
| Planejamento de releases | O que sai em cada release | `docs/plano-de-releases.md` | Sprint 0 (b) |
| Technical spikes | Issue com pergunta, prazo e resposta escrita | Issues com label `spike` | Quando houver incerteza |
| Sprint Planning | Ata com objetivo da sprint e itens escolhidos | `docs/atas/` | Início de cada sprint |
| Product Backlog Refinement | Backlog atualizado e itens do topo prontos | Projects | Meio de cada sprint |
| Quality Gate | Checklist verificado e assinado pela equipe | `docs/quality-gates/sprint-N.md` | Fim de cada sprint |
| Sprint Review | Demonstração + ata com feedback do PO | `docs/atas/` | Fim de cada sprint |
| Sprint Retrospective | Continuar / parar / começar + ação com dono | `docs/relatorios/sprint-N.md` | Fim de cada sprint |
| Registro das atividades individuais | Commits, PRs e issues com autoria correta | Git e GitHub | Contínuo |
| Seminário técnico | Slides + roteiro + métricas das sprints 1 e 2 | `docs/seminario/` | Após a Sprint 2 |
| Revisões técnicas | Comentários em PR e ata da revisão de arquitetura | GitHub + `docs/atas/` | Contínuo |
| Release candidate | Tag no repositório + notas da versão | `git tag` + release no GitHub | Release Readiness |
| Documentação técnica revisada | Arquitetura, API, modelo de dados, deploy | `docs/` | Release Readiness |
| Preparação da implantação | Sistema no ar + instruções de deploy | ambiente + `docs/deploy.md` | Release Readiness |
| Pacote de defesa | Tudo reunido e indexado para a banca | `docs/defesa/` | Release Readiness |
| Defesa do projeto | Apresentação e demonstração | ver [[17-Defesa-aceite-e-handover]] | Defesa |
| Aceite com o Product Owner | Termo ou ata de aceite assinada | `docs/atas/aceite.md` | Handover |
| Transferência de conhecimento | Guia para quem continuar | `docs/proxima-equipe.md` | Handover |
| Backlog residual | Issues abertas, priorizadas e etiquetadas | GitHub Issues | Handover |
| Análise dos aprendizados | Retrospectiva final do projeto | `docs/retrospectiva-final.md` | Encerramento |

💡 **Como usar esta tabela:** no começo de cada sprint, filtre as linhas daquela etapa e transforme cada uma numa issue com dono. Artefato sem dono não nasce.

---

## 📚 Glossário dos termos do plano de ensino

Os termos que aparecem no plano e podem travar você na primeira leitura:

| Termo | O que é, na prática |
|---|---|
| **Onboarding** | As primeiras aulas: formar equipe, conhecer o projeto, combinar como trabalhar. |
| **Engineering Enablement** | Deixar a "fábrica" pronta antes de produzir: repositório, ambiente, CI, padrões, DoD. |
| **Product Discovery** | Descobrir qual é o problema certo antes de decidir a solução. |
| **Inception** | O encontro inicial em que a equipe e o PO alinham visão, escopo e prioridades. |
| **Stakeholder** | Qualquer pessoa afetada pelo sistema: usuários, gestores, setores, a própria universidade. |
| **Persona** | Personagem que representa um perfil real de usuário, com objetivo e dores. |
| **Jornada** | Sequência de passos que a pessoa percorre para atingir um objetivo. |
| **MVP Canvas** | Quadro de uma página que define o produto mínimo viável: proposta, personas, jornadas, métricas, custo, resultado esperado. Template em [[12-Kit-de-templates-copiaveis]]. |
| **Product Backlog** | Lista priorizada de tudo que o produto pode vir a ter. |
| **Refinement** | Sessão de revisar e detalhar os itens do topo do backlog. |
| **Architecture Runway** | A fundação técnica construída antes e durante o desenvolvimento para que as funcionalidades tenham por onde correr. |
| **Atributo de qualidade** | Requisito não funcional com meta: desempenho, segurança, acessibilidade, disponibilidade, manutenibilidade. |
| **Modelo C4** | Quatro níveis de diagrama: Contexto, Contêineres, Componentes e Código. No NES, contexto e contêineres já bastam. Ver [[15-Arquitetura-C4-ADR-riscos-e-spikes]]. |
| **ADR** | Architecture Decision Record: um arquivo curto registrando uma decisão, o contexto e as consequências. |
| **Technical spike** | Investigação com prazo fechado para responder uma dúvida técnica. |
| **Definition of Done** | O acordo do que significa "pronto" para qualquer item da equipe. |
| **Quality Gate** | Portão de qualidade: um checklist que o incremento precisa passar antes de a sprint ser considerada concluída. |
| **Incremento** | O software funcionando que a sprint produziu, somado ao que já existia. |
| **Sprint Review** | Reunião de demonstração do incremento para o PO e stakeholders. |
| **Sprint Retrospective** | Reunião interna da equipe sobre o processo, não sobre o produto. |
| **Release candidate** | Versão candidata a ser publicada, já congelada e em validação. |
| **Release Readiness** | Etapa de conferir se tudo está pronto para entregar: código, testes, documentação, implantação. |
| **Pacote de defesa** | Conjunto organizado de artefatos e evidências entregue à banca. |
| **Banca avaliadora** | Grupo que assiste à defesa e avalia produto, processo e evidências. |
| **Product Acceptance** | Aceite formal do PO de que o entregue atende ao combinado. |
| **Handover** | Transferência do produto e do conhecimento para quem continuar. |
| **Backlog residual** | O que ficou por fazer, organizado e priorizado para a próxima equipe. |

---

## 🗂️ A estrutura de `docs/` que atende ao plano inteiro

```
docs/
├── equipe.md                    competências, papéis, PO e contatos
├── combinados.md                acordos de trabalho (ou CONTRIBUTING.md)
├── visao.md                     problema, stakeholders, visão, escopo e não escopo
├── personas.md
├── jornadas.md
├── mvp-canvas.md
├── backlog.md                   funcionalidades e priorização
├── requisitos.md                RF e RNF rastreáveis
├── arquitetura.md               restrições, atributos de qualidade, C4
├── adr/
│   ├── 0001-escolha-da-stack.md
│   └── 0002-banco-relacional.md
├── riscos.md
├── estrategia-de-qualidade.md
├── definition-of-done.md
├── plano-de-releases.md
├── modelo-de-dados.md
├── deploy.md
├── manual-do-usuario.md
├── proxima-equipe.md
├── retrospectiva-final.md
├── atas/                        planning, review, revisões técnicas, aceite
├── relatorios/                  um por sprint, com retrospectiva
├── quality-gates/               um checklist verificado por sprint
├── seminario/                   slides e roteiro do seminário técnico
└── defesa/                      pacote de defesa indexado
```

💡 Crie a pasta inteira, vazia, no Enablement. Ver a estrutura pronta reduz a chance de descobrir na Sprint 3 que faltam cinco artefatos.

---

## ✅ Checklist de rastreabilidade

O que a avaliação procura, e que só existe se você construir aos poucos:

- [ ] Cada requisito aponta para as issues que o implementam.
- [ ] Cada issue aponta para o PR que a resolveu.
- [ ] Cada PR tem revisão de outra pessoa e CI verde.
- [ ] Cada decisão arquitetural relevante tem um ADR.
- [ ] Cada sprint tem ata de review, relatório com retrospectiva e Quality Gate verificado.
- [ ] Cada integrante tem commits, PRs e revisões com o próprio nome.
- [ ] O que o PO pediu na reunião aparece registrado em ata e virou item de backlog.

---

> Próximo: [[15-Arquitetura-C4-ADR-riscos-e-spikes]].
