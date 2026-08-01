---
title: '12 - Kit de templates copiáveis'
---

# 12. Kit de templates copiáveis

> Manual do NES · Volume 7. Tudo aqui é para copiar, colar e trocar o que está entre `<>`. Nada precisa ser escrito do zero.

---

## 📄 README do projeto

`README.md` na raiz. É a primeira coisa que professor, proponente e a próxima equipe vão ler.

````markdown
# <Nome do Projeto>

<Uma frase dizendo o que o sistema faz e para quem.>

Projeto desenvolvido na disciplina NES 2 (Núcleo de Engenharia de Software),
FACOM/UFMS, <semestre>. Proponente: <nome ou instituição>.

## Funcionalidades

- [x] Cadastro de <x>
- [x] Listagem e busca de <y>
- [ ] Relatório mensal (em desenvolvimento)

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Front-end | React 18 + Vite |
| Back-end | Node 20 + Express |
| Banco | PostgreSQL 16 |
| Infra | Docker Compose |

## Como rodar

**Pré-requisitos:** Node 20+, Docker, Git.

```bash
git clone https://github.com/<org>/<projeto>.git
cd <projeto>

cp .env.example .env      # preencha as variáveis

docker compose up -d      # sobe o banco
npm install
npm run migrate           # cria as tabelas
npm run dev               # sobe a aplicação
```

Acesse http://localhost:5173

**Usuário de teste:** `admin@teste.com` / `123456`

## Estrutura

```
server/   API, regras de negócio e acesso ao banco
web/      Interface do usuário
docs/     Requisitos, atas, arquitetura e relatórios
```

## Documentação

- [Documento de visão](docs/visao.md)
- [Requisitos](docs/requisitos.md)
- [Arquitetura](docs/arquitetura.md)
- [Manual do usuário](docs/manual-do-usuario.md)
- [Atas das reuniões](docs/atas/)

## Equipe

| Nome | Papel | GitHub |
|---|---|---|
| <Nome> | <papel> | [@user](https://github.com/user) |
````

---

## 📝 Ata de reunião

`docs/atas/YYYY-MM-DD-sprint-N.md`

```markdown
# Ata - Reunião de fechamento da Sprint <N>

**Data:** <dd/mm/aaaa>  **Horário:** <hh:mm> às <hh:mm>
**Local:** <sala ou link>
**Presentes:** <nomes da equipe>, <nome do proponente>
**Ausentes:** <nomes, se houver>
**Relator:** <quem escreveu esta ata>

## 1. Apresentado
- <funcionalidade demonstrada>
- <funcionalidade demonstrada>

## 2. Não entregue e motivo
- <item>: <motivo objetivo>

## 3. Feedback do proponente
- <o que ele falou, o mais literal possível>

## 4. Decisões tomadas
| # | Decisão | Responsável |
|---|---------|-------------|
| 1 | <decisão> | <quem> |

## 5. Pendências do proponente
- [ ] <o que ele ficou de mandar> (até <data>)

## 6. Compromissos da equipe para a próxima sprint
- [ ] <entrega> - <responsável>

## 7. Próxima reunião
<data, hora, local>

---
*Enviada em <data>. Sem manifestação em contrário até <data+3>, considera-se validada.*
```

---

## 📊 Relatório de sprint

`docs/relatorios/sprint-N.md`

```markdown
# Relatório da Sprint <N>
**Período:** <dd/mm> a <dd/mm>  |  **Objetivo:** <uma frase>

## Resumo
| Métrica | Valor |
|---|---|
| Issues planejadas | 12 |
| Issues concluídas | 9 |
| Issues movidas para a próxima | 3 |
| Pull requests integrados | 14 |

## Entregue
| Issue | Descrição | Responsável |
|---|---|---|
| #12 | Cadastro de paciente | <nome> |

## Não entregue
| Issue | Motivo | Ação |
|---|---|---|
| #19 | Dependia de acesso ao servidor de e-mail | Volta para a Sprint 3 |

## Participação da equipe
| Pessoa | Issues concluídas | PRs abertos | PRs revisados |
|---|---|---|---|
| <nome> | 3 | 4 | 5 |

## Retrospectiva
- **Continuar:** <o que funcionou>
- **Parar:** <o que atrapalhou>
- **Começar:** <experimento>
- **Ação para a próxima:** <ação, dono, prazo>

## Riscos para a próxima sprint
- <risco> → <como vamos mitigar>
```

💡 A tabela de participação parece burocrática e é o que protege quem trabalhou quando a nota é individual.

---

## 🔧 Template de Pull Request

`.github/pull_request_template.md` (o GitHub preenche sozinho todo PR novo)

```markdown
## O que este PR faz
<descrição em 1 ou 2 frases>

Closes #<número da issue>

## Como testar
1.
2.
3.

## Tipo
- [ ] Funcionalidade nova
- [ ] Correção de bug
- [ ] Documentação
- [ ] Refatoração

## Checklist
- [ ] Rodei localmente e funciona
- [ ] Sem `console.log` ou código comentado esquecido
- [ ] Sem segredos ou `.env` no diff
- [ ] Atualizei a documentação, se necessário
- [ ] A branch está atualizada com a `main`

## Observações para quem revisa
<pontos de atenção, decisões que você quer discutir>
```

---

## 🐛 Templates de issue

`.github/ISSUE_TEMPLATE/tarefa.md`

```markdown
---
name: Tarefa
about: Uma unidade de trabalho de 1 a 2 dias
labels: feat
---

## Contexto
<por que isso é necessário>

## O que fazer
- [ ]
- [ ]

## Critério de aceitação
<como saber que está pronto, de forma testável>

## Referências
<arquivos, telas, links, issues relacionadas>

**Estimativa:** P / M / G
```

`.github/ISSUE_TEMPLATE/bug.md`

```markdown
---
name: Bug
about: Algo que deveria funcionar e não funciona
labels: bug
---

## O que acontece
## O que deveria acontecer
## Como reproduzir
1.
2.
## Ambiente
<navegador, sistema, branch, mensagem de erro>
## Prints ou logs
```

---

## 📑 Documento de visão

`docs/visao.md`

```markdown
# Documento de Visão - <Projeto>

## Problema
Hoje, <quem> precisa <fazer o quê> e faz isso <como é hoje>.
Isso gera <consequência: tempo perdido, erros, retrabalho>.

## Objetivo
<O que o sistema deve permitir, em uma frase.>

## Usuários
| Perfil | O que faz no sistema | O que mais importa para ele |
|---|---|---|

## Escopo desta disciplina
Vamos entregar:
- <item>

## Fora do escopo (acordado com o proponente)
- <item que não será feito e por quê>

## Critérios de sucesso
- <resultado observável>

## Restrições
- <tecnológicas, de prazo, legais (LGPD), de infraestrutura>

## Riscos conhecidos
| Risco | Impacto | O que faremos |
|---|---|---|
```

---

## 🧩 MVP Canvas

`docs/mvp-canvas.md`. Exigido na Sprint 0. Cabe em uma página e força a equipe a decidir o que é o mínimo.

```markdown
# MVP Canvas: <Projeto>

## 1. Proposta do MVP
<Qual a menor versão que já resolve um pedaço real do problema?>

## 2. Segmentos de usuários
<Quem vai usar esta primeira versão>

## 3. Jornadas
<As jornadas que o MVP cobre. Ex.: "agendar uma consulta pela secretária">

## 4. Funcionalidades
<Lista curta. Se passar de 6 linhas, ainda não é MVP>

## 5. Resultado esperado
<O que muda na vida do usuário quando isso estiver no ar>

## 6. Métricas para validar
<Como saberemos que funcionou. Ex.: "a secretária deixa de usar a agenda de papel">

## 7. Custo e prazo
<Quantas sprints estimamos>

## 8. O que fica fora deste MVP
<Explicitamente listado, para não voltar como cobrança depois>
```

---

## 👤 Personas e jornadas

`docs/personas.md`:

```markdown
# Personas

## Persona 1: <Nome fictício>, <papel>
**Contexto:** <onde e como trabalha, que ferramentas usa hoje>
**Objetivos:** <o que quer conseguir>
**Dores:** <o que atrapalha hoje>
**Familiaridade com tecnologia:** <baixa / média / alta>
**Frase típica:** "<algo que essa pessoa diria>"
```

`docs/jornadas.md`:

```markdown
# Jornada: <objetivo do usuário>

**Persona:** <quem>   **Gatilho:** <o que dá início>

| # | Passo hoje | Dor / tempo gasto | Como fica com o sistema |
|---|-----------|-------------------|--------------------------|
| 1 | Recebe a ligação e abre a agenda de papel | Precisa folhear, erra horário | Busca o horário livre na tela |
| 2 | Anota nome e telefone no caderno | Letra ilegível, dado se perde | Cadastro com validação |
| 3 | ... | | |

**Resultado esperado:** <o que melhora ao fim da jornada>
```

---

## 🤝 Combinados da equipe

`CONTRIBUTING.md` (ou `docs/combinados.md`)

```markdown
# Como trabalhamos

## Comunicação
- Canal principal: <WhatsApp/Discord>
- Resposta esperada: até 24h em dia útil
- Daily assíncrona no grupo, todo dia útil até as 20h

## Reuniões
- Planning: primeiro dia da sprint
- Sincronização: <dia> às <hora>
- Review com proponente + retro: último dia da sprint

## Código
- Uma issue, uma branch, um PR
- Branch: `<tipo>/<numero>-<descricao>`
- Commit: `<tipo>: <o que mudou>`
- Ninguém commita direto na `main`
- Ninguém aprova o próprio PR
- PR revisado em até 24h
- Nada entra na `main` sem 1 aprovação

## Definição de pronto
Uma tarefa está pronta quando:
- [ ] O código está integrado na `main`
- [ ] Funciona seguindo os critérios de aceitação da issue
- [ ] Foi revisada por outra pessoa
- [ ] A documentação afetada foi atualizada

## Se alguém ficar sem responder
- 2 dias: mensagem no privado
- 4 dias: redistribuição da tarefa
- 7 dias: registro em ata e conversa com o professor
```

---

## 💬 Mensagens prontas

**Pedir ajuda no grupo**
```
🚧 Travado na #<n> (<título>)
Quero: <objetivo>  |  Fiz: <o que fiz>  |  Acontece: <erro literal>
Já tentei: <a, b>  |  Suspeita: <sua hipótese>  |  Branch: <nome>
```

**Avisar atraso**
```
Pessoal, não vou conseguir terminar a #<n> até <data>.
Cheguei até <ponto>. Falta <o que falta>.
Prefiro <continuar até <nova data> | passar pra alguém>. O que acham?
```

**Cobrar sem atrito**
```
Oi <nome>, tudo certo? Vi que a #<n> não andou esta semana.
Precisa de ajuda com alguma coisa ou prefere que a gente redistribua?
```

**Convidar o proponente**
```
Olá <nome>, tudo bem?
Fechamos mais uma sprint e gostaríamos de te mostrar o que ficou pronto.
Você tem disponibilidade <opção 1> ou <opção 2>? Duração de 45 min.
Pauta: demonstração do que foi feito, pontos em aberto e plano da próxima etapa.
```

**Enviar a ata**
```
Segue a ata da nossa reunião de <data>, com o que apresentamos, o que foi
decidido e os próximos passos. Se algum ponto ficou diferente do que você
entendeu, me avisa até <data> que eu corrijo.
```

---

## 🎤 Roteiro da apresentação final

```
1. Problema (1 min)      - qual dor, de quem
2. Solução (1 min)       - o que construímos, em uma frase
3. Demonstração (8 min)  - o sistema rodando, na voz do usuário
4. Como foi feito (3 min)- stack, arquitetura, decisões e por quês
5. Processo (3 min)      - sprints, o que mudou de rota e por quê
6. Números (1 min)       - issues, PRs, requisitos entregues
7. O que ficou de fora (1 min) - honesto, com o backlog restante
8. Aprendizados (2 min)  - o que a equipe faria diferente
```

⚠️ Ensaie cronometrado, pelo menos uma vez, com o sistema real aberto.

---

## 📂 Onde colocar cada coisa

```
repo/
├── README.md
├── CONTRIBUTING.md
├── .github/
│   ├── pull_request_template.md
│   ├── workflows/ci.yml
│   └── ISSUE_TEMPLATE/{tarefa.md,bug.md}
└── docs/
    ├── equipe.md
    ├── visao.md
    ├── personas.md
    ├── jornadas.md
    ├── mvp-canvas.md
    ├── backlog.md
    ├── requisitos.md
    ├── arquitetura.md
    ├── adr/0001-escolha-da-stack.md
    ├── riscos.md
    ├── estrategia-de-qualidade.md
    ├── definition-of-done.md
    ├── plano-de-releases.md
    ├── modelo-de-dados.md
    ├── manual-do-usuario.md
    ├── proxima-equipe.md
    ├── atas/2026-08-15-sprint-0.md
    ├── relatorios/sprint-0.md
    ├── quality-gates/sprint-1.md
    └── defesa/README.md
```

A estrutura completa, com o que cada arquivo atende no plano de ensino, está em [[14-Do-plano-de-ensino-ao-artefato]].

---

## 📌 Templates que moram em outros capítulos

| Template | Onde está |
|---|---|
| Definition of Done | [[16-Qualidade-DoD-e-Quality-Gate]] |
| Quality Gate da sprint | [[16-Qualidade-DoD-e-Quality-Gate]] |
| Estratégia de qualidade | [[16-Qualidade-DoD-e-Quality-Gate]] |
| ADR (decisão arquitetural) | [[15-Arquitetura-C4-ADR-riscos-e-spikes]] |
| Registro de riscos | [[15-Arquitetura-C4-ADR-riscos-e-spikes]] |
| Issue de technical spike | [[15-Arquitetura-C4-ADR-riscos-e-spikes]] |
| Pacote de defesa | [[17-Defesa-aceite-e-handover]] |
| Termo de aceite do PO | [[17-Defesa-aceite-e-handover]] |
| Guia para a próxima equipe | [[17-Defesa-aceite-e-handover]] |

---

> Próximo: [[13-Emergencias-e-armadilhas]].
