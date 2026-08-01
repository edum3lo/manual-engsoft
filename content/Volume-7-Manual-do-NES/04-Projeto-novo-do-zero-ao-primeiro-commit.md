---
title: "04 - Projeto novo: do zero ao primeiro commit"
---

# 04. Projeto novo: do zero ao primeiro commit

> Manual do NES · Volume 7. Ninguém escreveu uma linha ainda e a equipe está olhando um para a cara do outro. Este é o procedimento, na ordem, com os comandos prontos.

---

## 🧭 A ordem certa das decisões

Muita equipe começa discutindo framework no dia 1 e passa a Sprint 0 inteira sem código. A ordem que funciona:

```
1. Onde o código vive         (organização + repositório)   ← 30 minutos
2. Como a equipe trabalha     (branches, PR, quadro)        ← 30 minutos
3. Qual stack                 (a que a maioria já sabe)     ← 1 hora, no máximo
4. Esqueleto que roda         (hello world de ponta a ponta) ← 1 dia
5. Só então: funcionalidades
```

O item 4 é o marco que separa equipe que vai bem de equipe que sofre. **Antes de qualquer funcionalidade, tenha uma tela que carrega, chamando uma rota que responde, lendo do banco.** Mesmo que a resposta seja a palavra "ok". Isso se chama fatia vertical (walking skeleton) e derruba 80% dos problemas de integração antes que eles cresçam.

---

## 1️⃣ Criar a casa do projeto no GitHub

**Use uma organização, não a conta pessoal de alguém.** Se o repositório fica na conta do colega que some, a equipe fica refém.

No GitHub: seu avatar → **Your organizations** → **New organization** → plano **Free** → nome tipo `nes2-<projeto>-2026`.

Depois: **New repository** dentro dela.

| Campo        | O que escolher                                                                      |
| ------------ | ----------------------------------------------------------------------------------- |
| Nome         | `nome-do-projeto` em minúsculas, com hífen                                          |
| Visibilidade | Público (a menos que o proponente peça privado)                                     |
| Add README   | ✅ sim                                                                              |
| .gitignore   | escolha o template da sua linguagem                                                 |
| Licença      | MIT, se o proponente não exigir outra. Ver [[65-O-que-e-open-source-e-as-licencas]] |

Depois, **Settings → Collaborators and teams**: adicione todo mundo da equipe, e o professor/proponente se ele pedir.

💡 Pelo terminal, com o [GitHub CLI](https://cli.github.com/):

```bash
gh auth login
gh repo create <org>/<projeto> --public --clone --gitignore Node --license mit
```

---

## 2️⃣ Proteger a branch principal

Isso evita o acidente mais comum e mais caro do NES: alguém commitar direto na `main` e sobrescrever o trabalho dos outros.

**Settings → Branches → Add branch protection rule**, com `main` no padrão:

- [x] Require a pull request before merging
- [x] Require approvals: **1**
- [x] Require conversation resolution before merging
- [ ] (opcional, quando tiver CI) Require status checks to pass

⚠️ Em organização gratuita, algumas dessas opções só valem para repositório público. Se estiver privado e as opções não aparecerem, deixe o repositório público ou combine a regra na ata e cobrem uns aos outros.

> Por que PR e review importam: [[64-Pull-Requests-code-review-e-issues]].

---

## 3️⃣ Escolher a stack sem drama

Três perguntas, nesta ordem, e a discussão acaba em 20 minutos:

1. **O que a maioria da equipe já consegue programar hoje?** Peso 70% da decisão.
2. **O proponente/professor exige alguma coisa?** (linguagem, hospedagem, banco). Peso 30%.
3. **Existe alguém que topa ser referência dessa stack e ajudar os outros?**

Combinações seguras para o NES, todas com material infinito na internet:

| Perfil da equipe             | Stack sugerida                                             |
| ---------------------------- | ---------------------------------------------------------- |
| Sabe JavaScript              | React + Node/Express + PostgreSQL                          |
| Sabe Python                  | React (ou templates) + Django ou FastAPI + PostgreSQL      |
| Sabe Java                    | React + Spring Boot + PostgreSQL                           |
| Precisa de app mobile        | React Native ou Flutter + a API acima                      |
| Muito pouca prática em geral | Django ou Laravel: um framework só, telas e banco inclusos |

⚠️ **Não escolha microsserviços.** Nem Kubernetes. Nem arquitetura hexagonal com 7 camadas. É projeto de 4 meses com equipe aprendendo. Monolito organizado é a resposta certa e é o que o mercado usa na maioria dos casos. Ver [[59-Monolito-vs-Microsservicos]].

> 📘 **Este é o resumo.** A escolha completa, com critérios ponderados, matriz de decisão, o que cada combinação resolve bem, banco de dados, hospedagem e mini-casos, está em [[18-Escolhendo-a-stack]].

---

## 4️⃣ Estrutura de pastas

Uma estrutura previsível economiza discussão o semestre inteiro. Exemplo com front e back no mesmo repositório (mais simples de gerenciar em equipe pequena):

```
projeto/
├── README.md
├── .gitignore
├── .env.example            # nomes das variáveis, SEM valores reais
├── docker-compose.yml      # banco e serviços de apoio
├── docs/
│   ├── ata-sprint-0.md
│   ├── requisitos.md
│   ├── arquitetura.md
│   └── relatorios/
├── server/                 # back-end
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   └── index.js
│   └── tests/
└── web/                    # front-end
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── services/       # chamadas à API
    └── public/
```

> Como projetos reais se organizam: [[36-Como-um-projeto-real-e-organizado]] e [[37-Anatomia-de-um-projeto-no-GitHub]].

---

## 5️⃣ O primeiro commit da equipe

```bash
git clone https://github.com/<org>/<projeto>.git
cd <projeto>

# crie a estrutura básica
mkdir -p docs server/src web/src

# arquivos essenciais
touch .env.example docs/.gitkeep

git add .
git commit -m "chore: estrutura inicial do projeto"
git push origin main     # este é o único push direto na main que se perdoa
```

⚠️ **Antes de qualquer `git add .`**, confirme que o `.gitignore` já cobre `node_modules/`, `.env`, `dist/`, `build/`, `__pycache__/`, `target/`. Segredo commitado é segredo vazado, e apagar depois não resolve: é preciso rotacionar a chave. Ver [[08-Convencoes-e-boas-praticas]].

---

## 6️⃣ O esqueleto que roda (fatia vertical)

Meta: **em 1 dia**, ter isto funcionando de ponta a ponta.

**Back-end**, um endpoint de saúde e um que lê do banco:

```js
// server/src/index.js  (exemplo com Express)
import express from "express";
const app = express();

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.listen(3000, () => console.log("API em http://localhost:3000"));
```

**Banco**, subindo com um comando:

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: projeto
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]
volumes:
  pgdata:
```

```bash
docker compose up -d      # sobe o banco
docker compose ps         # confere que está de pé
docker compose logs -f db # ver o que aconteceu, se não subiu
```

**Front-end**, uma tela que chama a API e mostra o resultado. Feio está ótimo. O que importa é a linha inteira estar ligada.

**Teste final do dia:** outra pessoa da equipe clona do zero, segue o README e consegue rodar. Se não conseguir, o README está errado, e consertá-lo é a tarefa mais valiosa da semana.

> Docker explicado: [[86-Docker-e-containers]] e a folha [[03-Docker]].

---

## 7️⃣ Configurar o mínimo de automação

Não precisa de CI/CD completo na Sprint 0, mas isto rende muito por pouco esforço:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci
      - run: npm test --if-present
```

A partir daí, todo PR mostra uma bolinha verde ou vermelha. É barato, impressiona na avaliação e pega quebra de integração cedo. Ver [[85-CICD-a-linha-de-montagem]].

---

## ✅ Checklist do projeto novo

- [ ] Organização criada no GitHub, com todo mundo dentro.
- [ ] Repositório com README, `.gitignore` e licença.
- [ ] Branch `main` protegida, exigindo PR com 1 aprovação.
- [ ] Templates de PR e issue commitados (ver [[12-Kit-de-templates-copiaveis]]).
- [ ] Stack decidida e registrada em ata, com o motivo.
- [ ] Estrutura de pastas criada e commitada.
- [ ] Esqueleto que roda: tela → API → banco.
- [ ] Outra pessoa conseguiu rodar seguindo só o README.
- [ ] Quadro criado com as issues da Sprint 1.

---

> Próximo: [[05-Git-e-GitHub-em-equipe-no-NES]].
