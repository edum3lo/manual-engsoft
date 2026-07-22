# Volume 3 — Desenvolvimento de Software

> Coleção: *Do Estudante ao Engenheiro de Software*
> Este é o terceiro dos 5 volumes. Aqui você aprende a **construir software de verdade, em time** — do requisito ao deploy: processos ágeis, UX, modelagem, arquitetura, Git, banco de dados, APIs, front-end, back-end e testes.

---

## Como ler este volume

Você fez o Volume 1 (a profissão, a empresa, o dia a dia) e o Volume 2 (a máquina, o SO, o Linux, as redes, a lógica e a arte de ler código). Agora você **junta tudo** e aprende o ofício central: **como um software nasce, é construído em equipe e chega ao usuário**.

Este é o volume mais "mão na massa" da coleção. Ele segue a linha do tempo real de um projeto: primeiro **como o time se organiza** (processos), depois **o que construir** (requisitos e UX), depois **como desenhar** (modelagem e arquitetura), depois **como versionar e colaborar** (Git, GitHub, open source), e por fim as **três camadas técnicas** que sustentam qualquer sistema — **banco de dados, API/back-end e front-end** — fechando com **testes e qualidade**.

Se é a sua primeira vez, leia **em ordem**, do Capítulo 41 ao 83. Cada capítulo é um arquivo próprio e segue a mesma estrutura de ~20 seções dos Volumes 1 e 2. O estudo de caso **SaborExpress** (o app de delivery da fundadora Ana) acompanha o volume inteiro — e no Volume 5 nós o construímos do zero à produção.

---

## Módulo 12 — Processos e Metodologias

- [[41-Modelos-de-processo-de-desenvolvimento]] — **Cap. 41** · Cascata, incremental, iterativo, espiral: as formas de organizar o trabalho.
- [[42-O-Manifesto-Agil]] — **Cap. 42** · O que é ser ágil de verdade (e o que não é).
- [[43-Scrum-na-pratica]] — **Cap. 43** · ⭐ Papéis, eventos e artefatos do framework mais usado do mercado.
- [[44-Kanban-e-fluxo-continuo]] — **Cap. 44** · O quadro, o limite de trabalho em progresso e o fluxo contínuo.
- [[45-Estimativas-planejamento-e-ferramentas]] — **Cap. 45** · Story points, planning poker; Jira, Trello, Azure DevOps.

## Módulo 13 — Engenharia de Requisitos

- [[46-O-que-sao-requisitos]] — **Cap. 46** · Requisitos funcionais e não funcionais: o que o sistema faz e como ele se comporta.
- [[47-Elicitacao-personas-e-jornada-do-usuario]] — **Cap. 47** · Descobrir o que o cliente realmente quer.
- [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]] — **Cap. 48** · ⭐ A forma como o trabalho é descrito e "pronto" é definido.
- [[49-MVP-priorizacao-e-validacao]] — **Cap. 49** · MoSCoW, RICE, Kano: decidir o que fazer primeiro (e o que não fazer).

## Módulo 14 — UX e Design de Produto

- [[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]] — **Cap. 50** · Experiência do usuário e pesquisa: projetar para gente de verdade.
- [[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]] — **Cap. 51** · As 10 heurísticas de Nielsen e acessibilidade (WCAG).
- [[52-Design-Thinking-e-Design-Sprint]] — **Cap. 52** · Métodos para descobrir e validar ideias rápido.
- [[53-Figma-wireframes-prototipos-e-Design-System]] — **Cap. 53** · Wireframe, protótipo, Design System e o handoff design → código.

## Módulo 15 — Modelagem e Análise

- [[54-Por-que-modelar-antes-de-programar-UML]] — **Cap. 54** · Por que desenhar antes de codar; visão geral da UML.
- [[55-Casos-de-uso-e-diagrama-de-classes]] — **Cap. 55** · Os dois diagramas que você mais vai usar.
- [[56-Sequencia-atividades-e-BPMN]] — **Cap. 56** · Fluxos no tempo, processos de negócio e decisões.

## Módulo 16 — Arquitetura de Software

- [[57-O-que-e-arquitetura-de-software]] — **Cap. 57** · ⭐ As decisões difíceis de mudar depois.
- [[58-MVC-camadas-e-separacao-de-responsabilidades]] — **Cap. 58** · Organizar o código para não virar um "prato de espaguete".
- [[59-Monolito-vs-Microsservicos]] — **Cap. 59** · Um sistema só ou muitos pequenos? As trocas de cada escolha.

## Módulo 17 — Git

- [[60-Controle-de-versao-e-por-que-Git-venceu]] — **Cap. 60** · O "salvar" profissional, com histórico e sem medo.
- [[61-Git-no-dia-a-dia]] — **Cap. 61** · ⭐ `add`, `commit`, `push`, `pull`, `status`, `log` — o ciclo diário.
- [[62-Branches-merge-conflitos-e-estrategias]] — **Cap. 62** · Trabalhar em paralelo sem pisar no código do colega. Git Flow, trunk-based.

## Módulo 18 — GitHub e colaboração

- [[63-GitHub-GitLab-e-Bitbucket]] — **Cap. 63** · As "redes sociais do código" e onde os times moram.
- [[64-Pull-Requests-code-review-e-issues]] — **Cap. 64** · ⭐ Como o código entra no projeto: PR, revisão e issues.

## Módulo 19 — Open Source

- [[65-O-que-e-open-source-e-as-licencas]] — **Cap. 65** · O que é código aberto e o que cada licença permite (MIT, GPL, Apache).
- [[66-Contribuindo-com-projetos-abertos]] — **Cap. 66** · Fork, maintainer, release e versionamento semântico.

## Módulo 20 — Banco de Dados

- [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] — **Cap. 67** · Onde os dados moram; tabelas, linhas e colunas.
- [[68-SQL-na-pratica]] — **Cap. 68** · ⭐ `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `JOIN` — conversar com o banco.
- [[69-Modelagem-de-dados-e-normalizacao]] — **Cap. 69** · Projetar tabelas que não viram bagunça.
- [[70-NoSQL-cache-e-busca]] — **Cap. 70** · Quando o relacional não basta: Redis, MongoDB, ElasticSearch.
- [[71-Confiabilidade-e-escala-do-banco]] — **Cap. 71** · Transações, índices, replicação, sharding, backup, migration, ORM.

## Módulo 21 — APIs e Integração

- [[72-O-que-e-uma-API-HTTP-REST-e-JSON]] — **Cap. 72** · ⭐ Como sistemas conversam; o contrato entre front e back.
- [[73-Autenticacao-e-autorizacao]] — **Cap. 73** · Quem é você e o que você pode fazer: tokens, JWT, OAuth.
- [[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]] — **Cap. 74** · Outras formas de integrar, e quando usar cada uma.
- [[75-Documentar-e-testar-APIs]] — **Cap. 75** · Versionamento, Swagger/OpenAPI, Postman, Insomnia.

## Módulo 22 — Front-end

- [[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]] — **Cap. 76** · O trio que forma toda página; estrutura, estilo e comportamento.
- [[77-Frameworks-de-front-end]] — **Cap. 77** · React, Vue, Angular e o pensamento em componentes.
- [[78-Ligando-front-end-a-experiencia-do-usuario]] — **Cap. 78** · Estado, dados da API e telas que respondem.

## Módulo 23 — Back-end

- [[79-O-que-roda-no-servidor-linguagens-e-frameworks]] — **Cap. 79** · Node.js, Python/Django, Java/Spring, C#/.NET.
- [[80-Construindo-a-API-da-SaborExpress]] — **Cap. 80** · ⭐ Juntando back-end, banco e API numa funcionalidade real.

## Módulo 24 — Testes e Qualidade

- [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] — **Cap. 81** · Unitário, integração, e2e — e a pirâmide de testes.
- [[82-TDD-e-testes-automatizados]] — **Cap. 82** · Escrever o teste antes do código: red → green → refactor.
- [[83-QA-bugs-e-o-ciclo-de-correcao]] — **Cap. 83** · Qualidade, o ciclo de vida de um bug e como o time garante que funciona.

---

## 🗺️ Mapa mental do Volume 3 (em texto)

```
                    DESENVOLVIMENTO DE SOFTWARE
                              │
        ┌─────────────────────┼─────────────────────┐
        ↓                     ↓                      ↓
   COMO O TIME            O QUE CONSTRUIR        COMO DESENHAR
   SE ORGANIZA           (Mód. 13 e 14)         (Mód. 15 e 16)
   (Mód. 12)             requisitos             UML → modelagem
   cascata → ágil        personas · UX          arquitetura
   Scrum · Kanban        histórias · MVP        MVC · camadas
   estimativas           usabilidade            monólito/micro
        │                     │                      │
        └─────────────────────┼──────────────────────┘
                              ↓
                   COMO VERSIONAR E COLABORAR
                        (Mód. 17, 18, 19)
              Git → GitHub → Pull Request → open source
                              ↓
                    AS TRÊS CAMADAS TÉCNICAS
                        (Mód. 20, 21, 22, 23)
        BANCO (dados) → API (integração) → FRONT (tela) + BACK (servidor)
                              ↓
                    COMO GARANTIR QUE FUNCIONA
                          (Mód. 24)
              testes → pirâmide → TDD → QA → ciclo do bug
```

---

## 🔗 Fluxograma de amarração — como o Volume 3 conversa com o resto da coleção

```
VOL. 1 (profissão, empresa, dia a dia)   VOL. 2 (máquina, Linux, redes, lógica, ler código)
        └───────────────────┬───────────────────────┘
                            ↓
VOL. 3  O OFÍCIO: processos → requisitos → UX → modelagem → arquitetura
        → git → banco → API → front → back → testes
                            ↓                          ↓
              tudo isso é APLICADO...          o que você aprende a
              inteiro no Projeto               construir aqui é o que
              Integrador (Vol. 5)              o Vol. 4 coloca no ar e escala
                            ↓
VOL. 4  ENGENHARIA MODERNA: DevOps → cloud → observabilidade → escala → segurança → IA
        (pega o sistema que você construiu no Vol. 3 e o leva à produção robusta)
                            ↓
VOL. 5  CARREIRA + PROJETO INTEGRADOR (SaborExpress do zero à produção)
```

Repare: o Volume 3 é o **coração prático** da coleção. As redes do Vol. 2 viram **APIs**; a lógica e as estruturas de dados viram **banco e algoritmos de negócio**; o "ler código" vira **escrever código em time**. E tudo o que você constrói aqui, o Vol. 4 leva para a nuvem e o Vol. 5 monta de ponta a ponta.

---

## Ao final do Volume 3 você será capaz de

- Entender e participar dos **processos de desenvolvimento** (cascata vs. ágil, Scrum, Kanban) e das cerimônias de um time real.
- **Levantar e escrever requisitos**, transformar necessidades em **histórias de usuário** com critérios de aceitação, e priorizar um **MVP**.
- Reconhecer os fundamentos de **UX, usabilidade e acessibilidade**, e ler um protótipo de **Figma** para transformá-lo em tela.
- **Modelar** um sistema com UML (casos de uso, classes, sequência) e entender decisões de **arquitetura** (MVC, camadas, monólito vs. microsserviços).
- Usar **Git** com confiança no dia a dia (branches, merge, conflitos) e **colaborar via GitHub** com Pull Requests e code review.
- Projetar e consultar um **banco de dados** relacional com SQL, entender **normalização**, e saber quando usar **NoSQL, cache e busca**.
- Construir e consumir **APIs** (HTTP, REST, JSON), lidar com **autenticação/autorização**, e conhecer alternativas (GraphQL, gRPC, WebSocket).
- Compreender **front-end** (HTML/CSS/JS, componentes, estado) e **back-end** (linguagens, frameworks) e como as duas pontas se conectam.
- **Testar** software com propriedade: a pirâmide de testes, TDD e o ciclo de vida de um bug com o time de QA.

**Próximo volume:** *Volume 4 — Engenharia Moderna* (DevOps, cloud, observabilidade, escalabilidade, experimentação, segurança e IA — levar o que você construiu aqui para produção robusta).
