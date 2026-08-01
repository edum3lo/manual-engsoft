---
title: '03 - Projeto herdado: entrar num código que não é seu'
---

# 03. Projeto herdado: entrar num código que não é seu

> Manual do NES · Volume 7. O projeto veio de outra equipe, tem histórico, tem gambiarra, tem README desatualizado e provavelmente não roda. Este é o procedimento completo, na ordem, com os comandos.

---

## 🧭 A regra de ouro

**Nas duas primeiras semanas você é arqueólogo, não arquiteto.** Sua missão não é julgar o código nem reescrever. É conseguir rodar, entender o mapa e produzir uma mudança minúscula. Reescrever projeto herdado na sprint 1 é o jeito mais rápido conhecido de terminar o semestre sem nada funcionando.

> Contexto conceitual: [[39-Engenharia-reversa-entrar-num-projeto-gigante]] e [[40-Localizando-bugs-e-descobrindo-a-arquitetura]] ensinam a técnica. [[10-Guia-do-Primeiro-Mes]] cobre o lado humano de entrar em algo já em andamento.

---

## 1️⃣ Clonar e olhar o terreno

```bash
git clone <url-do-repositorio>
cd <pasta-do-projeto>
```

Agora, antes de abrir qualquer arquivo de código, colete os fatos do repositório:

```bash
# Quando foi o último commit? O projeto está vivo ou parado há 8 meses?
git log -1 --format="%h %ad %an %s" --date=short

# Quantos commits, quem fez, e quando (te diz quem foi a equipe anterior)
git shortlog -sne

# A linha do tempo dos últimos 30 commits, resumida
git log --oneline -30

# Quais branches existem no remoto (pode haver trabalho não terminado lá)
git branch -r

# Tem tags/versões?
git tag

# Os arquivos mais mexidos do projeto = o coração do sistema
git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -20
```

💡 A última query é ouro: os 20 arquivos mais editados do histórico são, quase sempre, os arquivos onde mora a regra de negócio. Comece a leitura por eles.

---

## 2️⃣ Ler o repositório antes do código

Nesta ordem, gastando no máximo 1 hora:

| Onde olhar | O que você aprende |
|---|---|
| `README.md` | O que o projeto se propõe a ser e como (teoricamente) rodar. |
| `docs/` ou wiki | Requisitos, atas e decisões da equipe anterior. Tesouro se existir. |
| `package.json` / `requirements.txt` / `pom.xml` / `go.mod` | A stack real e os scripts disponíveis. |
| `docker-compose.yml` | Quais serviços o sistema precisa (banco, cache, fila). |
| `.env.example` | Quais configurações e segredos são necessários. |
| Issues e PRs abertos no GitHub | O que estava em andamento e o que já se sabia que estava quebrado. |
| Estrutura de pastas (`ls -R`, ou a árvore no editor) | Como o projeto se organiza: MVC, camadas, monorepo. Ver [[58-MVC-camadas-e-separacao-de-responsabilidades]]. |

⚠️ **Não confie no README.** Trate-o como uma hipótese. Ele quase sempre está desatualizado, e corrigi-lo é a sua primeira contribuição real.

---

## 3️⃣ Fazer rodar (o dia inteiro pode ir nisso, e tudo bem)

O procedimento genérico:

```bash
# 1. Copie o arquivo de configuração de exemplo
cp .env.example .env      # depois abra e preencha o que faltar

# 2. Instale as dependências (o comando muda com a stack)
npm install                                   # Node
pip install -r requirements.txt               # Python
mvn install                                   # Java/Maven
composer install                              # PHP

# 3. Suba os serviços de apoio (banco etc.), se houver docker-compose
docker compose up -d

# 4. Rode as migrações do banco, se houver
npm run migrate    # ou: python manage.py migrate / mvn flyway:migrate

# 5. Rode o projeto
npm run dev        # ou: python manage.py runserver / mvn spring-boot:run
```

**Quando der erro (vai dar):**

1. Leia a mensagem inteira, até o fim. A causa costuma estar na última linha, não na primeira.
2. Versão da linguagem confere? (`node -v`, `python --version`, `java -version`). Projeto antigo com runtime novo demais quebra muito.
3. Porta ocupada? Banco não subiu? `docker compose ps` e `docker compose logs`.
4. Falta variável no `.env`? A mensagem geralmente diz o nome dela.
5. Cole o erro no grupo com contexto: o que rodou, o que esperava, o que veio. Ver [[11-Quando-voce-nao-sabe-o-que-fazer]].

> 🏆 **Cada obstáculo que você resolver aqui vira uma linha no README.** Você chega na reunião podendo dizer: *"documentei o setup, agora qualquer pessoa sobe o projeto em 10 minutos"*. Isso é entrega de verdade, com nome próprio: reduzir tempo de onboarding.

---

## 4️⃣ Mapear o sistema em uma folha

Depois que roda, faça o mapa. Não precisa de UML bonito, precisa ser verdadeiro:

```
[ Navegador ]
     │  HTTP
     ▼
[ Front-end: React em /web ]
     │  chamadas para /api/*
     ▼
[ Back-end: Express em /server ]
     │
     ├── /routes      → quais endpoints existem
     ├── /services    → onde está a regra de negócio
     └── /models      → como fala com o banco
     │
     ▼
[ PostgreSQL, sobe via docker-compose ]
```

Para descobrir os endpoints existentes rápido:

```bash
# procura definições de rota em qualquer stack (ajuste o padrão)
grep -rn "router\.\(get\|post\|put\|delete\)" --include=*.js --include=*.ts .
grep -rn "@app.route\|@GetMapping\|@PostMapping" .
```

Para descobrir as tabelas:

```bash
ls -1 migrations/ 2>/dev/null || ls -1 db/migrate/ 2>/dev/null
grep -rn "CREATE TABLE" --include=*.sql . | head -30
```

Coloque esse mapa em `docs/arquitetura.md`. Você vai usá-lo na reunião, e a próxima equipe vai te agradecer.

---

## 5️⃣ A primeira mudança minúscula

Antes de pegar uma funcionalidade, faça um ciclo completo com algo ridiculamente pequeno: corrigir um texto, um erro de português na tela, um item no README. O objetivo não é o resultado, é **provar que o caminho inteiro funciona**:

```bash
git checkout -b docs/corrige-readme-setup
# ... edita ...
git add README.md
git commit -m "docs: corrige passos de setup que não funcionavam"
git push -u origin docs/corrige-readme-setup
# abre o PR no GitHub, pede review de um colega
```

Depois disso você já sabe: clonar, rodar, criar branch, commitar, abrir PR, ser revisado, integrar. É o ciclo inteiro da disciplina, exercitado num item sem risco. Ver [[05-Git-e-GitHub-em-equipe-no-NES]].

---

## 6️⃣ O diagnóstico para o proponente

Junte o que a equipe descobriu num documento curto, `docs/diagnostico-inicial.md`. Ele vale muito na reunião da Sprint 0:

```markdown
# Diagnóstico do estado atual

## O que existe e funciona
- Cadastro de usuários (login e senha)
- Listagem de <coisa>

## O que existe mas está quebrado ou incompleto
- Relatório em PDF: gera arquivo vazio (issue #12)
- Tela de edição: salva, mas não valida campos

## O que não existe e o proponente parece supor que existe
- Notificação por e-mail

## Riscos técnicos
- Dependência X está sem manutenção desde 2021
- Não há nenhum teste automatizado

## O que propomos fazer primeiro
1. ...
2. ...
```

🗣️ Na reunião: *"Antes de propor o que vamos construir, passamos a sprint entendendo o que já existe. Levantamos o que funciona, o que está pela metade e os riscos. Com base nisso, sugerimos começar por X."* Isso soa como equipe sênior, e é literalmente o que uma consultoria faz na primeira semana.

---

## ⚠️ Os 6 erros clássicos com projeto herdado

1. **Querer reescrever tudo.** "O código é ruim" pode ser verdade e continua sendo má ideia no NES. Refatore junto com o que você já precisa mexer.
2. **Trocar a stack.** Custa a sprint inteira e não aparece para o proponente.
3. **Ficar 3 semanas "estudando o código" sem entregar nada.** Entenda mexendo.
4. **Não falar com a equipe anterior.** Se der para mandar uma mensagem, mande. 20 minutos de conversa valem 3 dias de leitura.
5. **Apagar código morto sem entender.** Aquilo pode estar chamado por reflexão, cron ou rota escondida.
6. **Commitar o `.env` com credenciais** que você recebeu do proponente. ⚠️ Nunca. Ver [[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]].

---

## ✅ Checklist do projeto herdado

- [ ] Clonei e o projeto **roda** na minha máquina.
- [ ] Sei quantas pessoas mexeram, quando parou e quais são as branches abertas.
- [ ] Li README, `docs/`, issues abertas e o arquivo de dependências.
- [ ] Tenho um mapa (mesmo feio) de front, back, banco e serviços.
- [ ] Corrigi o README com os passos reais de setup.
- [ ] Abri e mergeei um PR minúsculo.
- [ ] A equipe tem um `docs/diagnostico-inicial.md` para mostrar ao proponente.

---

> Próximo: [[05-Git-e-GitHub-em-equipe-no-NES]] para o fluxo do dia a dia, ou [[06-Backlog-issues-e-o-quadro-da-sprint]] para organizar o trabalho.
