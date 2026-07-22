# 06 — Glossário técnico rápido

> Manual de Bolso · Volume 6. Definições curtas dos termos que você mais ouve na empresa. Para o aprofundamento, cada termo aponta para o capítulo que o ensina.

---

## Processos e times

| Termo | Em uma linha |
|-------|--------------|
| **Ágil** | Entregar em ciclos curtos, adaptando-se, em vez de um plano rígido no início. ([[42-O-Manifesto-Agil]]) |
| **Scrum** | Framework ágil com papéis (PO, SM, time), eventos (sprint, daily) e artefatos. ([[43-Scrum-na-pratica]]) |
| **Sprint** | Ciclo de trabalho curto (1–4 semanas) com uma meta. ([[43-Scrum-na-pratica]]) |
| **Kanban** | Quadro visual de tarefas com limite de trabalho em progresso (WIP). ([[44-Kanban-e-fluxo-continuo]]) |
| **Backlog** | Lista priorizada do que fazer. ([[43-Scrum-na-pratica]]) |
| **Daily / Standup** | Reunião curta diária de alinhamento. ([[43-Scrum-na-pratica]]) |
| **Retrospectiva** | Reunião para melhorar o processo do time. ([[43-Scrum-na-pratica]]) |
| **Story points** | Estimativa relativa de esforço de uma tarefa. ([[45-Estimativas-planejamento-e-ferramentas]]) |
| **PO (Product Owner)** | Quem define e prioriza o que construir. ([[43-Scrum-na-pratica]]) |
| **PM (Product Manager)** | Faz a ponte entre negócio, usuários e engenharia. ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) |

## Requisitos e produto

| Termo | Em uma linha |
|-------|--------------|
| **Requisito funcional** | O que o sistema **faz**. ([[46-O-que-sao-requisitos]]) |
| **Requisito não funcional** | Como o sistema **se comporta** (desempenho, segurança). ([[46-O-que-sao-requisitos]]) |
| **História de usuário** | "Como [usuário], quero [ação] para [benefício]". ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) |
| **Critério de aceitação** | O que define que uma história está "pronta". ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) |
| **MVP** | Menor versão que entrega valor e testa a hipótese. ([[49-MVP-priorizacao-e-validacao]]) |
| **Persona** | Personagem que representa um tipo de usuário. ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) |
| **UX / Usabilidade** | Experiência e facilidade de uso. ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) |
| **Acessibilidade (a11y)** | O produto usável por todos, inclusive com deficiências. ([[51-Usabilidade-heuristicas-de-Nielsen-e-acessibilidade]]) |
| **Wireframe / Protótipo** | Esboço / simulação navegável das telas. ([[53-Figma-wireframes-prototipos-e-Design-System]]) |
| **Design System** | Conjunto reutilizável de componentes e regras de design. ([[53-Figma-wireframes-prototipos-e-Design-System]]) |

## Arquitetura e código

| Termo | Em uma linha |
|-------|--------------|
| **Arquitetura** | As decisões estruturais difíceis de mudar depois. ([[57-O-que-e-arquitetura-de-software]]) |
| **MVC / Camadas** | Separar responsabilidades (apresentação, lógica, dados). ([[58-MVC-camadas-e-separacao-de-responsabilidades]]) |
| **Monólito** | Sistema construído como uma peça única. ([[59-Monolito-vs-Microsservicos]]) |
| **Microsserviços** | Sistema quebrado em serviços independentes. ([[59-Monolito-vs-Microsservicos]]) |
| **API** | A interface por onde os sistemas conversam. ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) |
| **Front-end** | A parte que roda no navegador/app do usuário. ([[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]]) |
| **Back-end** | A parte que roda no servidor (lógica, dados, segurança). ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) |
| **Full-stack** | Dev que trabalha no front e no back. ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) |
| **Componente** | Peça reutilizável da UI (front-end). ([[77-Frameworks-de-front-end]]) |
| **Estado (state)** | Dados que mudam e afetam a tela. ([[77-Frameworks-de-front-end]]) |
| **ORM** | Traduz objetos do código em linhas do banco. ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) |
| **Refatorar** | Melhorar o código sem mudar o comportamento. ([[82-TDD-e-testes-automatizados]]) |
| **Dívida técnica** | Custo futuro de atalhos no código; cobra "juros". ([[99-Divida-tecnica-e-chaos-engineering]]) |

## Banco de dados

| Termo | Em uma linha |
|-------|--------------|
| **Relacional / SQL** | Dados em tabelas com relações. ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]) |
| **NoSQL** | Banco não-tabular (documentos, chave-valor). ([[70-NoSQL-cache-e-busca]]) |
| **Chave primária / estrangeira** | Identifica uma linha / referencia outra tabela. ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]]) |
| **Índice** | Estrutura que acelera buscas. ([[71-Confiabilidade-e-escala-do-banco]]) |
| **Normalização** | Organizar dados sem duplicação. ([[69-Modelagem-de-dados-e-normalizacao]]) |
| **Transação / ACID** | Operações tudo-ou-nada, com garantias. ([[71-Confiabilidade-e-escala-do-banco]]) |
| **Cache** | Guardar o resultado pronto do que é muito lido. ([[93-Cache-CDN-e-balanceador-de-carga]]) |
| **Réplica de leitura** | Cópia do banco para distribuir as leituras. ([[71-Confiabilidade-e-escala-do-banco]]) |
| **Sharding** | Dividir os dados entre vários bancos. ([[94-Filas-particionamento-e-microsservicos-na-pratica]]) |

## DevOps, cloud e operação

| Termo | Em uma linha |
|-------|--------------|
| **DevOps** | Cultura que une desenvolvimento e operação. ([[84-O-que-e-DevOps]]) |
| **CI/CD** | Esteira que testa e entrega o código automaticamente. ([[85-CICD-a-linha-de-montagem]]) |
| **Pipeline** | A sequência de estágios da esteira (build, testes, deploy). ([[85-CICD-a-linha-de-montagem]]) |
| **Container / Docker** | Empacota a app com seu ambiente numa caixa portátil. ([[86-Docker-e-containers]]) |
| **Kubernetes (K8s)** | Orquestra muitos containers em escala. ([[86-Docker-e-containers]]) |
| **Cloud / Nuvem** | Alugar computação sob demanda (AWS, Azure, GCP). ([[87-O-que-e-computacao-em-nuvem]]) |
| **IaaS / PaaS / SaaS** | Quanto da infra o provedor gerencia por você. ([[88-Modelos-de-servico-IaaS-PaaS-SaaS-serverless]]) |
| **Serverless** | Funções sob demanda; você não gerencia servidores. ([[88-Modelos-de-servico-IaaS-PaaS-SaaS-serverless]]) |
| **Deploy** | Colocar a aplicação no ar. ([[118-Deploy-cloud-producao-e-monitoramento]]) |
| **Rollback** | Reverter para a versão anterior. ([[98-Estrategias-de-deploy]]) |
| **Canário / Blue-green** | Estratégias de deploy seguro. ([[98-Estrategias-de-deploy]]) |
| **Feature flag** | "Interruptor" que liga/desliga uma feature sem deploy. ([[96-AB-testing-e-feature-flags]]) |
| **Produção (prod)** | O ambiente real, com usuários reais. ([[118-Deploy-cloud-producao-e-monitoramento]]) |
| **Load balancer** | Distribui o tráfego entre réplicas. ([[93-Cache-CDN-e-balanceador-de-carga]]) |
| **CDN** | Rede que serve conteúdo perto do usuário. ([[93-Cache-CDN-e-balanceador-de-carga]]) |
| **Fila (queue)** | Amortecedor de tarefas para processar depois (assíncrono). ([[94-Filas-particionamento-e-microsservicos-na-pratica]]) |
| **IaC** | Infraestrutura como código (versionada). ([[84-O-que-e-DevOps]]) |

## Observabilidade e confiabilidade

| Termo | Em uma linha |
|-------|--------------|
| **Observabilidade** | Enxergar o que acontece dentro do sistema em produção. ([[89-Logs-metricas-e-tracing]]) |
| **Log** | Registro de um evento (o que aconteceu). ([[89-Logs-metricas-e-tracing]]) |
| **Métrica** | Número agregado ao longo do tempo (saúde, tendência). ([[89-Logs-metricas-e-tracing]]) |
| **Trace** | O caminho de uma requisição pelos serviços. ([[89-Logs-metricas-e-tracing]]) |
| **Alerta** | Notificação quando algo sai do esperado. ([[91-Alertas-incidentes-e-plantao-on-call]]) |
| **On-call / Plantão** | Escala de sobreaviso para incidentes. ([[91-Alertas-incidentes-e-plantao-on-call]]) |
| **Incidente** | Interrupção não planejada de um serviço. ([[91-Alertas-incidentes-e-plantao-on-call]]) |
| **SLA / SLO / SLI** | Contrato / meta interna / medida de confiabilidade. ([[91-Alertas-incidentes-e-plantao-on-call]]) |
| **MTTR** | Tempo médio de recuperação de uma falha. ([[84-O-que-e-DevOps]]) |
| **Post-mortem** | Análise de incidente sem culpa, para aprender. ([[91-Alertas-incidentes-e-plantao-on-call]]) |
| **Resiliência** | Capacidade de continuar funcionando apesar de falhas. ([[99-Divida-tecnica-e-chaos-engineering]]) |

## Testes e qualidade

| Termo | Em uma linha |
|-------|--------------|
| **Teste unitário** | Testa uma peça isolada (rápido). ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) |
| **Teste de integração** | Testa peças conversando (ex.: código + banco). ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) |
| **Teste E2E** | Testa o sistema inteiro como o usuário. ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) |
| **Pirâmide de testes** | Muitos unitários, alguns de integração, poucos E2E. ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) |
| **TDD** | Escrever o teste antes do código. ([[82-TDD-e-testes-automatizados]]) |
| **Cobertura** | % do código exercitado pelos testes (não é meta cega). ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]) |
| **Regressão** | Um bug em algo que já funcionava. ([[83-QA-bugs-e-o-ciclo-de-correcao]]) |
| **QA** | Garantia de qualidade (do produto e do processo). ([[83-QA-bugs-e-o-ciclo-de-correcao]]) |
| **Mock / Stub** | Dublês que substituem dependências num teste. ([[82-TDD-e-testes-automatizados]]) |

## Segurança e dados

| Termo | Em uma linha |
|-------|--------------|
| **OWASP Top 10** | As 10 falhas de segurança web mais críticas. ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]) |
| **SQL Injection** | Enganar o banco via input não tratado. ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]) |
| **XSS** | Injetar scripts no navegador de outros usuários. ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]) |
| **IDOR / Controle de acesso quebrado** | Acessar dados alheios trocando um ID. ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]) |
| **Autenticação / Autorização** | Quem você é / o que pode fazer. ([[73-Autenticacao-e-autorizacao]]) |
| **Hash de senha** | Guardar senha de forma irreversível (bcrypt). ([[73-Autenticacao-e-autorizacao]]) |
| **Defesa em profundidade** | Várias camadas de proteção. ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]) |
| **Menor privilégio** | Dar só o acesso mínimo necessário. ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]) |
| **LGPD** | Lei brasileira de proteção de dados pessoais. ([[101-LGPD-e-privacidade]]) |
| **Anonimização** | Remover a identificação dos dados. ([[101-LGPD-e-privacidade]]) |

## Experimentação, negócio e IA

| Termo | Em uma linha |
|-------|--------------|
| **A/B testing** | Comparar duas versões com usuários reais. ([[96-AB-testing-e-feature-flags]]) |
| **North Star Metric** | A métrica que capta o valor central do produto. ([[97-Metricas-de-produto-e-medicao-de-impacto]]) |
| **Retenção / Churn** | Quantos voltam / quantos abandonam. ([[106-As-metricas-do-negocio]]) |
| **CAC / LTV** | Custo de adquirir / valor gerado por cliente. ([[106-As-metricas-do-negocio]]) |
| **KPI** | Indicador-chave de desempenho. ([[106-As-metricas-do-negocio]]) |
| **ROI** | Retorno sobre o investimento. ([[106-As-metricas-do-negocio]]) |
| **SaaS / Marketplace / Freemium** | Modelos de negócio de software. ([[105-Por-que-empresas-fazem-software-modelos-de-negocio]]) |
| **LLM** | Modelo de IA que prevê o próximo texto. ([[102-Como-funcionam-os-LLMs]]) |
| **Token** | Pedaço de texto que o LLM processa. ([[102-Como-funcionam-os-LLMs]]) |
| **Alucinação** | Quando a IA inventa algo plausível mas falso. ([[102-Como-funcionam-os-LLMs]]) |
| **RAG** | Dar dados reais ao LLM para ele não inventar. ([[103-RAG-fine-tuning-agentes-e-MCP]]) |
| **Prompt** | O texto de entrada que você dá à IA. ([[108-Como-usar-IA-corretamente-na-engenharia]]) |

## Siglas soltas que aparecem toda hora

| Sigla | Significa |
|-------|-----------|
| **API** | Application Programming Interface |
| **CRUD** | Create, Read, Update, Delete (as 4 operações básicas) |
| **JSON** | JavaScript Object Notation (formato de dados) |
| **HTTP(S)** | HyperText Transfer Protocol (Secure) |
| **URL** | Endereço de um recurso na web |
| **CLI** | Command Line Interface (terminal) |
| **IDE** | Ambiente de desenvolvimento (VS Code, IntelliJ...) |
| **UI / UX** | Interface do usuário / Experiência do usuário |
| **DB** | Database (banco de dados) |
| **ENV** | Environment (ambiente / variável de ambiente) |
| **PR / MR** | Pull Request / Merge Request |
| **WIP** | Work In Progress |
| **YAGNI** | You Aren't Gonna Need It (não construa antes da hora) |
| **DRY** | Don't Repeat Yourself (não repita código) |
| **KISS** | Keep It Simple, Stupid (mantenha simples) |
| **TL;DR** | Too Long; Didn't Read (resumo) |
| **ETA** | Estimated Time of Arrival (prazo estimado) |
| **PoC** | Proof of Concept (prova de conceito) |
| **SPA** | Single Page Application |
| **SSR** | Server-Side Rendering |

---

> 🧭 Manual de Bolso → **Glossário técnico rápido**. Anterior: [[05-HTTP-APIs-e-REST]] · Próxima: [[07-Checklists-do-dia-a-dia]].
