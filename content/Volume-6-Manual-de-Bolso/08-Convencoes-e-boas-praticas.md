---
title: '08 - Convenções e boas práticas'
---

# 08 — Convenções e boas práticas

> Manual de Bolso · Volume 6. As convenções que todo time espera que você siga — e os princípios que evitam código ruim.

---

## Mensagens de commit (Conventional Commits)

Formato: `tipo: descrição curta no imperativo`

```
feat: adiciona cálculo de frete grátis
fix: corrige total incorreto acima de R$50
docs: atualiza README com passos de setup
refactor: extrai lógica de preço para um service
test: adiciona teste da fronteira dos R$50
chore: atualiza dependências
style: ajusta formatação (sem mudar lógica)
perf: reduz queries N+1 na listagem
ci: adiciona escaneamento de segurança na esteira
```

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade. |
| `fix` | Correção de bug. |
| `docs` | Só documentação. |
| `refactor` | Mudança interna sem alterar comportamento. |
| `test` | Adiciona/ajusta testes. |
| `chore` | Manutenção (deps, configs). |
| `style` | Formatação (espaços, ponto e vírgula). |
| `perf` | Melhoria de performance. |
| `ci` | Mudanças na esteira de CI/CD. |

💡 **Boa mensagem:** imperativo ("adiciona", não "adicionado"), curta (~50 chars no título), diz **o quê** (e no corpo, se preciso, **por quê**). Ver [[61-Git-no-dia-a-dia]].

---

## Nomenclatura (naming)

| Elemento | Convenção comum | Exemplo |
|----------|-----------------|---------|
| Variável / função | `camelCase` | `calcularTotal`, `totalPedido` |
| Classe / componente | `PascalCase` | `CardRestaurante`, `PedidoService` |
| Constante | `UPPER_SNAKE_CASE` | `VALOR_MINIMO_FRETE`, `MAX_TENTATIVAS` |
| Arquivo | depende do time | `pedido-service.js`, `CardRestaurante.tsx` |
| Tabela / coluna (SQL) | `snake_case` | `itens_pedido`, `criado_em` |
| Branch | `tipo/descricao` | `feat/frete-gratis`, `fix/checkout` |
| Booleano | prefixo `is/has/can` | `isPago`, `hasEndereco`, `podeEditar` |

**Princípios de bom nome:**
- **Diz a intenção** — `diasAteVencimento` > `d`.
- **Sem abreviações obscuras** — `quantidade` > `qtd` (a menos que seja padrão do time).
- **Consistência** — siga o estilo que já existe no código.
- **Funções são verbos** (`enviarEmail`), **dados são substantivos** (`emailUsuario`).

💡 "Nomear coisas" é uma das duas coisas difíceis da computação. Invista tempo nisso — código é lido muito mais do que escrito.

---

## Princípios que evitam código ruim

| Princípio | O que significa |
|-----------|-----------------|
| **DRY** (Don't Repeat Yourself) | Não repita lógica; extraia para um lugar só. (Mas não abstraia cedo demais.) |
| **KISS** (Keep It Simple) | Prefira a solução mais simples que resolve. |
| **YAGNI** (You Aren't Gonna Need It) | Não construa para um futuro que talvez não venha. ([[92-De-100-a-1-milhao-de-usuarios]]) |
| **Separação de responsabilidades** | Cada peça faz uma coisa. ([[58-MVC-camadas-e-separacao-de-responsabilidades]]) |
| **Falhe rápido e claro** | Erros explícitos e cedo, não silenciosos. |
| **Nunca confie no input** | Valide tudo que vem de fora. ([[73-Autenticacao-e-autorizacao]]) |
| **Regra do escoteiro** | Deixe o código um pouco melhor do que encontrou. ([[99-Divida-tecnica-e-chaos-engineering]]) |

---

## Code smells (sinais de que algo está ruim)

| Sinal | Por que é ruim / o que fazer |
|-------|------------------------------|
| Função gigante (100+ linhas) | Faz coisas demais → quebre em funções menores. |
| Muitos parâmetros (5+) | Difícil de usar → agrupe num objeto. |
| Nomes ruins (`x`, `data`, `temp`) | Ninguém entende → renomeie com intenção. |
| Código duplicado | Bug em N lugares → extraia (DRY). |
| Aninhamento profundo (if dentro de if dentro de if) | Difícil de ler → early return, extrair funções. |
| Números/textos "mágicos" | `if (total > 50)` → `const FRETE_GRATIS = 50`. |
| Comentário explicando código confuso | Melhore o código em vez de comentá-lo. |
| Flags/parâmetros booleanos que mudam o comportamento | Considere duas funções separadas. |

💡 **Comentários:** explique o **porquê** (a decisão), não o **o quê** (o código já diz). Bom código precisa de poucos comentários.

---

## Versionamento semântico (SemVer)

Formato: `MAJOR.MINOR.PATCH` → ex.: `2.4.1`

| Parte | Sobe quando... | Exemplo |
|-------|----------------|---------|
| **MAJOR** (2.x.x) | Mudança que **quebra** compatibilidade. | `1.9.0 → 2.0.0` |
| **MINOR** (x.4.x) | Nova funcionalidade **compatível**. | `2.3.0 → 2.4.0` |
| **PATCH** (x.x.1) | Correção de bug **compatível**. | `2.4.0 → 2.4.1` |

Ver [[66-Contribuindo-com-projetos-abertos]].

---

## `.gitignore` (o que NUNCA versionar)

```gitignore
# dependências (baixáveis)
node_modules/
vendor/

# segredos e config local ⚠️
.env
.env.local
*.pem
*.key

# builds e artefatos
dist/
build/
*.log

# sistema / editor
.DS_Store
.vscode/
.idea/
```

> ⚠️ **Nunca commite `.env`, chaves ou senhas.** Se acontecer, o segredo está comprometido mesmo depois de removido — **rotacione** (troque) a chave imediatamente. Ver [[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]].

---

## Formatação e linters

- Use um **formatador automático** (Prettier, gofmt, Black) — não discuta espaços em code review.
- Use um **linter** (ESLint, etc.) para pegar erros e padrões.
- Configure para rodar **ao salvar** e na **CI** ([[85-CICD-a-linha-de-montagem]]).
- Siga o **estilo que já existe** no projeto, não o seu preferido.

💡 Deixe a máquina cuidar de formatação; gaste a energia do review no que importa (lógica, segurança, design).

---

## Estrutura típica de um projeto

```
projeto/
├── src/                # o código-fonte
│   ├── controllers/    # recebem as requisições
│   ├── services/       # a lógica de negócio
│   ├── repositories/   # acesso ao banco
│   └── models/         # as entidades
├── tests/              # os testes
├── .env.example        # modelo das variáveis (sem valores reais!)
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json        # dependências e scripts
└── README.md           # o que é, como rodar, como testar
```

💡 **README** é a porta de entrada: o que o projeto faz, como rodar localmente, como testar, e as decisões importantes. É a primeira coisa que um novo dev (e um recrutador) lê. Ver [[110-Curriculo-LinkedIn-portfolio-e-GitHub]].

---

## Boas práticas gerais (resumo)

- **Commits pequenos e frequentes**, mensagens claras.
- **PRs pequenos e focados** (fáceis de revisar).
- **Nomes que dizem a intenção**; sem números mágicos.
- **Teste o que tem risco**; escreva um teste ao corrigir um bug.
- **Trate os erros** (não só o caminho feliz).
- **Segredos fora do código.**
- **Simplicidade primeiro** (KISS, YAGNI); não superengenheire.
- **Deixe o código melhor do que encontrou** (regra do escoteiro).
- **Documente o porquê** das decisões (comentários, ADRs, README).
- **Peça e aceite feedback** sem ego. ([[109-Colaboracao-humana]])

---

> 🧭 Manual de Bolso → **Convenções e boas práticas** (última folha). Volta ao [[00-Indice]].
