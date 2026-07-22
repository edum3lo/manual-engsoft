# Volume 4 — Engenharia Moderna

> Coleção: *Do Estudante ao Engenheiro de Software*
> Este é o quarto dos 5 volumes. Aqui você pega o software que aprendeu a **construir** no Volume 3 e o leva **ao mundo real**: colocar no ar, mantê-lo funcionando, enxergá-lo, escalá-lo para milhões, experimentar com dados, protegê-lo e usar IA com responsabilidade.

---

## Como ler este volume

Você já sabe **construir** software em time (Volume 3): requisitos, UX, arquitetura, Git, banco, API, front, back e testes. Mas um sistema que roda só na sua máquina não vale nada para o usuário. Este volume é sobre a outra metade do ofício: **operação e escala** — a "engenharia moderna" que transforma um projeto que funciona em um **produto vivo, confiável e em crescimento**.

A linha do tempo aqui segue a vida de um sistema em produção: primeiro **como colocá-lo no ar de forma automatizada e repetível** (DevOps, CI/CD, containers); depois **onde ele roda** (a nuvem); depois **como enxergar o que acontece** com ele (observabilidade); depois **como aguentar o crescimento** (escalabilidade); depois **como decidir com dados em vez de achismo** (engenharia experimental); depois **como entregar mudanças com segurança** (estratégias de deploy, dívida técnica); e por fim os dois temas que definem a engenharia da nossa era: **segurança/privacidade** e **inteligência artificial**.

Se é a sua primeira vez, leia **em ordem**, do Capítulo 84 ao 104. Cada capítulo é um arquivo próprio e segue a mesma estrutura de ~20 seções dos volumes anteriores. O estudo de caso **SaborExpress** (o app de delivery da fundadora Ana) continua nos acompanhando — agora saindo do "funciona no meu computador" para "aguenta a Black Friday com milhões de pedidos".

---

## Módulo 25 — DevOps e Entrega Contínua

- [[84-O-que-e-DevOps]] — **Cap. 84** · ⭐ Derrubar o muro entre "quem faz" e "quem coloca no ar"; cultura, automação e fluxo.
- [[85-CICD-a-linha-de-montagem]] — **Cap. 85** · Integração e entrega contínuas: a esteira que leva o código do commit à produção.
- [[86-Docker-e-containers]] — **Cap. 86** · "Funciona na minha máquina" resolvido: empacotar o software com tudo que ele precisa.

## Módulo 26 — Cloud

- [[87-O-que-e-computacao-em-nuvem]] — **Cap. 87** · Alugar computador de outra pessoa: AWS, Azure, Google Cloud e por que a nuvem venceu.
- [[88-Modelos-de-servico-IaaS-PaaS-SaaS-serverless]] — **Cap. 88** · IaaS, PaaS, SaaS e serverless: quanto da infraestrutura você gerencia.

## Módulo 27 — Observabilidade

- [[89-Logs-metricas-e-tracing]] — **Cap. 89** · ⭐ Os três pilares de enxergar um sistema que você não vê rodando.
- [[90-As-ferramentas-de-observabilidade]] — **Cap. 90** · Grafana, Prometheus, Sentry, New Relic, Datadog: os olhos do time.
- [[91-Alertas-incidentes-e-plantao-on-call]] — **Cap. 91** · O que fazer quando o sistema cai às 3h da manhã.

## Módulo 28 — Escalabilidade

- [[92-De-100-a-1-milhao-de-usuarios]] — **Cap. 92** · ⭐ Como a arquitetura evolui conforme o sistema cresce.
- [[93-Cache-CDN-e-balanceador-de-carga]] — **Cap. 93** · As três alavancas que sustentam sistemas grandes.
- [[94-Filas-particionamento-e-microsservicos-na-pratica]] — **Cap. 94** · Trabalho assíncrono, dividir os dados e quebrar o sistema em serviços.

## Módulo 29 — Engenharia Experimental

- [[95-Software-guiado-por-hipoteses-e-dados]] — **Cap. 95** · ⭐ Por que empresas modernas testam antes de decidir.
- [[96-AB-testing-e-feature-flags]] — **Cap. 96** · Ligar/desligar funcionalidades e comparar versões com usuários reais.
- [[97-Metricas-de-produto-e-medicao-de-impacto]] — **Cap. 97** · Como saber se o que você entregou realmente funcionou.

## Módulo 30 — Práticas modernas de entrega

- [[98-Estrategias-de-deploy]] — **Cap. 98** · Blue-green, canary e rollback: mudar o sistema no ar sem derrubá-lo.
- [[99-Divida-tecnica-e-chaos-engineering]] — **Cap. 99** · O que é technical debt e como testar a resiliência de propósito.

## Módulo 31 — Segurança

- [[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]] — **Cap. 100** · ⭐ Pensar como atacante para defender; as 10 falhas mais comuns.
- [[101-LGPD-e-privacidade]] — **Cap. 101** · A lei dos dados pessoais e o que ela exige do seu código.

## Módulo 32 — Inteligência Artificial para engenheiros

- [[102-Como-funcionam-os-LLMs]] — **Cap. 102** · Tokens, embeddings e vetores — entender IA sem hype.
- [[103-RAG-fine-tuning-agentes-e-MCP]] — **Cap. 103** · Como se constroem produtos com IA de verdade.
- [[104-IA-para-engenharia-e-uso-responsavel]] — **Cap. 104** · Usar IA no seu trabalho com produtividade e responsabilidade.

---

## 🧠 Mapa mental do Volume 4

```
                        ENGENHARIA MODERNA (levar à produção)
                                     │
        ┌───────────────┬────────────┼────────────┬───────────────┐
        ↓               ↓            ↓             ↓               ↓
   COLOCAR NO AR      ONDE RODA    ENXERGAR      AGUENTAR      DECIDIR BEM
   DevOps/CI-CD/       Cloud       Observa-      Escala        Experimentação
   Docker             (25→26)      bilidade      (cache/CDN/    (hipóteses/
   (Mód. 25)                       (Mód. 27)     filas)         A-B/métricas)
                                                 (Mód. 28)      (Mód. 29)
        └───────────────┴────────────┼────────────┴───────────────┘
                                     ↓
                    ENTREGAR COM SEGURANÇA + PROTEGER + IA
              deploy/dívida técnica → segurança/LGPD → IA (Mód. 30-32)
```

---

## 🔗 Fluxograma de amarração — como o Volume 4 conversa com o resto da coleção

```
VOL. 2 (a máquina, o SO, redes)         VOL. 3 (construir o software em time)
        └───────────────┬───────────────────────┘
                        ↓
VOL. 4  ENGENHARIA MODERNA: pega o sistema construído no Vol. 3
        e o leva à PRODUÇÃO robusta — no ar, observável, escalável, seguro
        DevOps → cloud → observabilidade → escala → experimentação → segurança → IA
                        ↓
VOL. 5  CARREIRA + PROJETO INTEGRADOR (SaborExpress do zero à produção,
        aplicando Vol. 3 + Vol. 4 de ponta a ponta)
```

Repare: o Volume 4 é o **"em produção"** da coleção. Os conceitos de SO e redes do Vol. 2 reaparecem como **containers, nuvem e balanceadores**; a arquitetura e os testes do Vol. 3 viram **deploy contínuo, escala e resiliência**; e o "ler e escrever código" ganha a dimensão de **operar código vivo, usado por milhões**.

---

## Ao final do Volume 4 você será capaz de

- Entender a **cultura e as práticas de DevOps** e como uma esteira de **CI/CD** leva o código do commit à produção automaticamente.
- Explicar o que são **containers (Docker)** e por que eles resolvem o "funciona na minha máquina".
- Compreender a **computação em nuvem** e os **modelos de serviço** (IaaS, PaaS, SaaS, serverless), sabendo o que cada um gerencia por você.
- Aplicar os três pilares da **observabilidade** (logs, métricas, tracing), conhecer as ferramentas e entender o ciclo de **alertas, incidentes e plantão**.
- Raciocinar sobre **escalabilidade**: como a arquitetura evolui de 100 a milhões de usuários, com **cache, CDN, balanceadores, filas e particionamento**.
- Adotar a mentalidade de **engenharia experimental**: decidir por **hipóteses e dados**, usar **A/B testing, feature flags** e medir **impacto de produto**.
- Entregar mudanças com segurança usando **estratégias de deploy** (blue-green, canary, rollback) e entender **dívida técnica** e **chaos engineering**.
- Conhecer os **fundamentos de segurança** (OWASP Top 10) e as exigências da **LGPD** sobre o seu código.
- Compreender, sem hype, **como funcionam os LLMs** e como se constroem produtos com IA (**RAG, agentes, MCP**), usando IA no seu trabalho de forma **responsável**.

**Próximo volume:** *Volume 5 — Carreira e Projeto Integrador* (a engenharia financeira do software, desenvolvimento profissional, mercado e entrevistas — e o **Projeto Integrador**, onde a SaborExpress é construída do zero à produção aplicando tudo dos Volumes 3 e 4).

---

> 🧭 **Você está aqui:** início do **Volume 4 — Engenharia Moderna** (capítulos 84 a 104 de 119).
