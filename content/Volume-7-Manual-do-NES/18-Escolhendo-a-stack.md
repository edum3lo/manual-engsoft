---
title: '18 - Escolhendo a stack'
---

# 18. Escolhendo a stack

> Manual do NES · Volume 7. O que é uma stack, como escolher a certa para o seu projeto, as combinações que funcionam bem juntas e por quê, e o que evitar num projeto de quatro sprints.
> A decisão vira um ADR ([[15-Arquitetura-C4-ADR-riscos-e-spikes]]). A montagem prática do projeto está em [[04-Projeto-novo-do-zero-ao-primeiro-commit]].

---

## 🧱 O que é uma stack, camada por camada

Stack é o conjunto de tecnologias que, juntas, formam o sistema. Todo sistema web tem mais ou menos estas camadas:

| Camada | O que faz | Exemplos |
|---|---|---|
| **Front-end** | O que o usuário vê e clica | React, Vue, Angular, Next.js, templates do próprio back |
| **Back-end** | Regras de negócio, autenticação, integrações | Node/Express, Django, FastAPI, Spring Boot, Laravel |
| **Banco de dados** | Onde os dados ficam | PostgreSQL, MySQL, SQLite, MongoDB |
| **Autenticação** | Quem é você e o que pode fazer | JWT, sessão, Auth0, Supabase Auth, Keycloak |
| **Infra e deploy** | Onde roda e como sobe | Docker, Vercel, Render, Railway, Fly.io, VPS |
| **Apoio** | Fila, cache, arquivos, e-mail, relatórios | Redis, S3/MinIO, SMTP, geradores de PDF |

⚠️ **Você não precisa de todas.** Um sistema de NES bem feito costuma usar front, back, banco e deploy. Fila, cache e microsserviço entram só quando existe um problema real que os justifique.

> Conceitos por trás: [[57-O-que-e-arquitetura-de-software]], [[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]], [[79-O-que-roda-no-servidor-linguagens-e-frameworks]].

---

## 🎯 Os critérios de escolha, com peso

Não existe "melhor stack". Existe a melhor escolha **para este time, neste prazo, com este problema**. Ordem de peso num projeto de disciplina:

| Critério | Peso | Pergunta |
|---|---|---|
| **O que a equipe já sabe** | 🔴 Altíssimo | Quantas pessoas conseguem escrever código nisso hoje, sem tutorial? |
| **Exigência do PO ou do professor** | 🔴 Alto | Existe restrição de linguagem, hospedagem ou integração com sistema existente? |
| **Tipo de sistema** | 🟠 Médio | É CRUD de gestão? Portal público? Tempo real? Mobile? |
| **Onde vai rodar depois** | 🟠 Médio | Servidor da universidade? Nuvem grátis? Máquina do proponente? |
| **Facilidade de continuar** | 🟠 Médio | A próxima equipe vai conseguir pegar isso? |
| **Comunidade e documentação** | 🟡 Baixo | Quando eu travar às 23h, vou achar resposta em português ou inglês? |
| **Modernidade / currículo** | ⚪ Muito baixo | Só desempata. Nunca decide. |

💡 **A regra que resolve 80% dos casos:** escolha a tecnologia que **mais gente da equipe já sabe**, e invista o tempo economizado no produto. Aprender framework novo e disciplina nova ao mesmo tempo é o jeito mais comum de chegar na Sprint 2 sem nada rodando.

---

## 📊 Matriz de decisão (use na reunião)

Quando a equipe empaca entre duas opções, preencha isto junto, na tela. Nota de 1 a 5 em cada critério, multiplicada pelo peso:

```markdown
| Critério                  | Peso | Node/Express | Spring Boot |
|---------------------------|------|--------------|-------------|
| Equipe já sabe            |  5   |  5 (=25)     |  2 (=10)    |
| Exigência externa         |  4   |  3 (=12)     |  3 (=12)    |
| Encaixe no tipo de sistema|  3   |  4 (=12)     |  4 (=12)    |
| Facilidade de deploy      |  3   |  5 (=15)     |  3 (=9)     |
| Continuidade pela próxima equipe | 2 | 4 (=8)   |  4 (=8)     |
| **Total**                 |      | **72**       | **51**      |
```

Isso não é burocracia: é exatamente o conteúdo de "alternativas consideradas" do seu ADR, e é o que você responde quando a banca perguntar por que escolheram assim.

---

## 🧩 Combinações que funcionam bem juntas

### 1. React + Node/Express + PostgreSQL

**Para quem:** equipe que sabe JavaScript. É a combinação mais comum em projeto de faculdade.

**Por que funciona:** uma linguagem só no projeto inteiro, então quem faz front consegue ler o back. Material infinito, e todo erro já foi perguntado por alguém.

**Armadilhas:** Express não impõe estrutura, então **defina as pastas e as camadas no primeiro dia** (`routes`, `services`, `models`) ou vira bagunça na sprint 2. Ver [[58-MVC-camadas-e-separacao-de-responsabilidades]].

**Combina bem com:** Prisma ou Knex (acesso ao banco), Zod (validação), Vite (build do front), Render ou Railway (deploy).

---

### 2. Next.js + PostgreSQL (fullstack em um projeto só)

**Para quem:** equipe que sabe React e quer front e back no mesmo lugar.

**Por que funciona:** menos peças para integrar, deploy de um clique na Vercel, e renderização no servidor quando o conteúdo precisa aparecer no Google.

**Armadilhas:** conceitos próprios (server components, rotas de API, renderização) confundem quem está aprendendo React ao mesmo tempo. E o acoplamento é maior: se o professor pedir "API separada do front", você vai ter que justificar.

**Combina bem com:** Prisma, NextAuth, Vercel, Neon ou Supabase (Postgres gerenciado).

---

### 3. Django + PostgreSQL

**Para quem:** equipe que sabe Python, especialmente com sistemas de cadastro, gestão e relatórios.

**Por que funciona:** vem tudo pronto: ORM, autenticação, permissões e um **painel administrativo automático** que sozinho já resolve metade de um sistema de gestão. Dá para entregar muito com pouca linha escrita.

**Armadilhas:** telas muito interativas ficam melhores com um front separado. E o "jeito Django" precisa ser aprendido, senão você luta contra o framework.

**Combina bem com:** Django REST Framework (se quiser API para um front React), HTMX (interatividade sem SPA), Render ou PythonAnywhere.

---

### 4. FastAPI + React

**Para quem:** equipe de Python que precisa de API moderna, ou que vai integrar com processamento de dados e IA.

**Por que funciona:** rápido de escrever, documentação da API gerada sozinha (Swagger), e vive bem no mesmo ambiente de bibliotecas científicas (pandas, scikit-learn).

**Armadilhas:** não vem com ORM, admin nem autenticação prontos. Você monta as peças, e isso custa tempo. Se o sistema é CRUD puro, Django entrega mais rápido.

**Combina bem com:** SQLAlchemy, Pydantic, Alembic (migrações), Docker.

---

### 5. Spring Boot + React (ou Angular)

**Para quem:** equipe que aprendeu Java bem e vai continuar nesse ecossistema.

**Por que funciona:** muito estruturado, com padrões claros. É o que muita empresa grande e órgão público usa, então o proponente institucional às vezes exige.

**Armadilhas:** verboso e pesado para começar. Se metade da equipe não sabe Java, o custo de aprendizado come uma sprint inteira.

**Combina bem com:** Spring Data JPA, Flyway (migrações), PostgreSQL, Docker.

---

### 6. Laravel + MySQL

**Para quem:** equipe que já mexeu com PHP, ou projeto que vai rodar em hospedagem compartilhada tradicional (comum em setor de universidade).

**Por que funciona:** produtividade altíssima para CRUD, ecossistema completo, e roda em quase qualquer servidor barato.

**Armadilhas:** menos comum entre estudantes hoje, então pode ter só uma pessoa que domina, o que cria gargalo.

**Combina bem com:** Blade ou Livewire (telas sem SPA), Eloquent (ORM).

---

### 7. React Native ou Flutter + uma API das opções acima

**Para quem:** o proponente precisa de aplicativo de celular de verdade (uso em campo, offline, câmera, GPS).

**Por que funciona:** um código para Android e iOS.

**Armadilhas:** ⚠️ **Mobile custa muito mais do que parece** num projeto de 4 sprints: build, assinatura, testar em aparelho, publicar na loja. Antes de escolher, pergunte se um site responsivo resolve. Na maioria dos projetos de NES, resolve.

---

### 8. Supabase ou Firebase (quando o backend é o menor problema)

**Para quem:** equipe pequena, sistema simples, prazo curto, e o valor está nas telas.

**Por que funciona:** banco, autenticação, arquivos e API prontos. Você entrega em dias o que levaria semanas.

**Armadilhas:** ⚠️ Numa disciplina de **Engenharia de Software**, parte do que se avalia é você construir e justificar back-end, modelagem e testes. Terceirizar tudo pode reduzir o que você tem a mostrar. Combine com o professor antes.

---

## 🗂️ Escolhendo o banco de dados

| Situação | Escolha | Por quê |
|---|---|---|
| Padrão para quase tudo | **PostgreSQL** | Relacional, robusto, grátis, aceito em qualquer nuvem, tem JSON quando precisa |
| Equipe já usa e o projeto é simples | **MySQL / MariaDB** | Igualmente válido, muito comum em hospedagem tradicional |
| Protótipo, app pequeno, sem servidor | **SQLite** | Um arquivo, zero configuração. Ótimo para começar, ⚠️ ruim para muitos usuários simultâneos |
| Dados sem forma fixa, documentos variados | **MongoDB** | ⚠️ Só se o dado for realmente sem esquema. Cadastro com relacionamento é relacional |
| Cache, sessão, fila leve | **Redis** | Complemento, nunca banco principal |

⚠️ **O erro clássico:** escolher MongoDB porque "é mais fácil" e descobrir na Sprint 2 que o sistema é cheio de relacionamento (usuário tem consultas, que têm procedimentos, que têm pagamentos). Se você desenha o modelo e ele vira uma teia de ligações, é relacional. Ver [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] e [[69-Modelagem-de-dados-e-normalizacao]].

---

## 🧭 Do tipo de sistema para a stack

| Se o projeto é... | Vá de | Por quê |
|---|---|---|
| **Sistema de gestão interna** (cadastros, agendamento, controle) | Django, Laravel ou React + Node + Postgres | CRUD, permissões e relatórios. O admin pronto do Django economiza sprints |
| **Portal público** (site institucional, divulgação, inscrições) | Next.js ou Django com templates | Precisa aparecer no Google e carregar rápido |
| **Dashboard de indicadores** | React + API leve (FastAPI/Express) + Postgres | O trabalho está em consulta e visualização, não em cadastro |
| **Coleta de dados em campo** | Site responsivo (PWA) ou React Native + API | Se precisa funcionar offline, aí sim mobile se justifica |
| **Tempo real** (chat, notificação ao vivo, painel que atualiza) | Node com WebSocket, ou Django Channels | Ver [[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]] |
| **Processamento de dados, IA ou relatórios pesados** | Python (FastAPI ou Django) + fila | Ecossistema de dados vive em Python |
| **Integração com sistema existente da universidade** | A linguagem que o sistema existente já fala | Integração manda mais que preferência |

---

## ☁️ Onde hospedar (opções grátis ou baratas)

| Serviço | Bom para | Observação |
|---|---|---|
| **Vercel** | Front-end e Next.js | Deploy automático a cada push. Mais simples que existe |
| **Netlify** | Front-end estático | Semelhante à Vercel |
| **Render** | API + banco Postgres | Plano grátis hiberna quando fica sem uso. ⚠️ Avise o PO que o primeiro acesso demora |
| **Railway / Fly.io** | API, banco, containers | Crédito grátis limitado |
| **Neon / Supabase** | PostgreSQL gerenciado | Ótimos para o banco, mesmo que a API esteja em outro lugar |
| **Oracle Cloud Free / VPS barato** | Controle total | ⚠️ Alguém precisa cuidar do servidor. Só se a equipe tiver isso |
| **Servidor da própria instituição** | Quando o PO exige | Descubra as restrições **na Sprint 0**, não na 4 |

💡 **Coloque no ar na Sprint 1 ou 2, não no fim.** Deploy sempre revela problema (variável de ambiente, migração, CORS, porta) e é melhor descobrir isso cedo, com pouco código. Ver [[118-Deploy-cloud-producao-e-monitoramento]].

---

## 🚫 O que evitar num projeto de quatro sprints

1. **Microsserviços.** Você tem 5 pessoas e 4 meses. Monolito organizado é a resposta certa, e é o que a maioria das empresas usa. Ver [[59-Monolito-vs-Microsservicos]].
2. **Kubernetes.** Docker Compose resolve tudo que você precisa aqui.
3. **Tecnologia que ninguém domina "para aprender".** Aprenda nos seus projetos pessoais, não no projeto com cliente real e nota.
4. **GraphQL sem necessidade.** REST resolve, e todo mundo sabe depurar.
5. **NoSQL por moda.** Ver a seção de banco acima.
6. **Arquitetura em 7 camadas.** Camada demais em projeto pequeno vira lentidão para entregar qualquer coisa.
7. **Trocar a stack no meio.** Se for inevitável, que seja até a Sprint 1. Depois disso, o custo come o projeto.
8. **Escolher pelo que está na moda no Twitter.** A pergunta certa é "quem aqui consegue mexer nisso na quarta-feira à noite?".

---

## 🧟 E se o projeto é herdado?

**Não troque a stack.** Sério. Mesmo que você odeie a escolha da equipe anterior.

O que fazer:
1. Documente a stack real que encontrou em `docs/arquitetura.md`.
2. Se a stack tem um problema **objetivo** (dependência abandonada, falha de segurança conhecida, não roda em versão atual da linguagem), registre como **risco** ([[15-Arquitetura-C4-ADR-riscos-e-spikes]]) e leve para a Sprint Review com uma proposta de custo.
3. Se a troca for realmente necessária, faça em fatia: um módulo por vez, com o sistema funcionando o tempo todo. Nunca "vamos parar tudo e reescrever".

🗣️ Frase para a reunião: *"A biblioteca X, usada na autenticação, está sem manutenção desde 2021 e tem uma falha conhecida. Substituí-la custa cerca de 3 dias. Sugerimos encaixar na próxima sprint, porque o sistema lida com dados pessoais."* Isso é análise de risco, e é exatamente o que a disciplina quer ver.

---

## 📝 Como registrar e defender a escolha

Toda decisão de stack vira um **ADR** com quatro partes: contexto, decisão, alternativas consideradas e consequências (inclusive as ruins). Modelo pronto em [[15-Arquitetura-C4-ADR-riscos-e-spikes]].

Na defesa, a pergunta vem quase sempre. A resposta boa tem três partes:

🗣️ *"Escolhemos Node com Express porque quatro dos cinco integrantes já programavam em JavaScript e o prazo era de quatro sprints. Consideramos Spring Boot, que é mais estruturado, mas exigiria aprender Java durante o projeto. A consequência que aceitamos foi ter que definir nós mesmos o padrão de camadas, o que documentamos no ADR 0003."*

Contexto, alternativa descartada com motivo, e o preço que vocês aceitaram pagar. Ninguém questiona uma resposta assim, porque ela mostra que houve decisão, e não sorteio.

---

## 🧪 Mini-casos parecidos com projeto de NES

**Agendamento de atendimentos numa clínica ou laboratório da universidade**
Muito cadastro, regras de horário, perfis diferentes, relatório mensal.
→ Django + PostgreSQL (o admin já resolve os cadastros internos) ou React + Node + Postgres se a equipe for de JavaScript. Deploy no Render.

**Portal de eventos e inscrições**
Página pública, inscrição, e-mail de confirmação, painel do organizador.
→ Next.js + Postgres (Neon) + Vercel. Precisa aparecer no Google e ter carga previsível.

**Coleta de dados em campo (pesquisa, vistoria, censo)**
Uso fora do escritório, às vezes sem internet.
→ Site responsivo com armazenamento local primeiro. Só vá para React Native se offline de verdade for requisito confirmado pelo PO.

**Painel de indicadores para uma diretoria**
Poucos usuários, muitos gráficos, dados vindos de outro sistema.
→ React + FastAPI + Postgres, com uma rotina de importação. O esforço está na consulta e na visualização.

**Controle de estágios ou de patrimônio**
Fluxo com aprovação em etapas, documentos anexados, histórico.
→ Django ou Laravel. Fluxo de aprovação e upload são resolvidos por recursos que já vêm no framework.

---

## ✅ Checklist da decisão de stack (60 minutos)

- [ ] Listamos o que cada integrante sabe hoje, de verdade ([[02-Sprint-0-a-primeira-semana]]).
- [ ] Perguntamos ao PO e ao professor se existe restrição de tecnologia ou de hospedagem.
- [ ] Classificamos o tipo de sistema (gestão, portal, dashboard, mobile, tempo real).
- [ ] Comparamos no máximo **duas** opções na matriz de decisão.
- [ ] Escolhemos o banco pelo formato dos dados, não pela moda.
- [ ] Definimos onde vai rodar e testamos um deploy vazio.
- [ ] Escrevemos o ADR com alternativas e consequências.
- [ ] Fizemos um esqueleto que roda de ponta a ponta para provar a escolha.
- [ ] Combinamos que ninguém troca nada disso depois da Sprint 1 sem novo ADR.

---

> Volte ao [[00-Indice]] ou siga para [[04-Projeto-novo-do-zero-ao-primeiro-commit]] para montar o projeto com a stack escolhida.
