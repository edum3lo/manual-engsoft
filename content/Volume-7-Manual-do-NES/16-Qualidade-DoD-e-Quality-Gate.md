---
title: '16 - Qualidade: Definition of Done e Quality Gate'
---

# 16. Qualidade: Definition of Done e Quality Gate

> Manual do NES · Volume 7. O plano de ensino cobra garantia da qualidade, Definition of Done, Quality Gate por sprint e evidências. Este capítulo transforma isso em dois checklists que a equipe usa de verdade.
> Base conceitual: [[81-Por-que-testar-tipos-de-teste-e-a-piramide]], [[82-TDD-e-testes-automatizados]] e [[83-QA-bugs-e-o-ciclo-de-correcao]].

---

## 🎚️ A diferença entre os dois

| | **Definition of Done** | **Quality Gate** |
|---|---|---|
| Escala | Um item de backlog | O incremento inteiro da sprint |
| Pergunta | "Esta issue está pronta?" | "Esta sprint pode ser considerada concluída?" |
| Quem verifica | O autor e quem revisa o PR | A equipe inteira, no fim da sprint |
| Frequência | Dezenas de vezes por sprint | Uma vez por sprint |
| Onde vive | `docs/definition-of-done.md` | `docs/quality-gates/sprint-N.md` |

Sem DoD, cada pessoa tem um conceito diferente de "terminei". Sem Quality Gate, a sprint fecha com o incremento em qualquer estado.

---

## ✅ Definition of Done (acorde na primeira semana)

Escreva com a equipe, uma vez, e cole no `CONTRIBUTING.md` também. Sugestão realista para o NES:

```markdown
# Definition of Done

Um item do backlog está PRONTO quando:

## Código
- [ ] Atende a todos os critérios de aceitação da issue
- [ ] Está integrado na `main` via Pull Request
- [ ] Foi revisado e aprovado por pelo menos uma outra pessoa
- [ ] A integração contínua passou (build e testes verdes)
- [ ] Não deixou `console.log`, código comentado ou segredo no repositório

## Testes
- [ ] Tem teste automatizado das regras de negócio que introduziu
- [ ] Foi testado manualmente no caminho feliz e em pelo menos um caso de erro

## Documentação
- [ ] README, documentação técnica ou manual do usuário atualizados, se afetados
- [ ] ADR escrito, se a solução envolveu decisão arquitetural

## Rastreabilidade
- [ ] A issue está fechada e ligada ao PR
- [ ] O item foi movido para "Pronto" no board
```

⚠️ **Uma DoD ambiciosa demais é abandonada na sprint 2.** Melhor uma lista de 10 itens que a equipe cumpre do que uma de 25 que vira decoração. Você pode endurecer a DoD nas sprints seguintes, e isso inclusive rende uma boa ação de retrospectiva.

---

## 🚦 Quality Gate da sprint

Um arquivo por sprint, preenchido no penúltimo dia, com o nome de quem verificou. É a evidência de que a equipe controlou a qualidade, e não só programou.

```markdown
# Quality Gate: Sprint 2
**Data da verificação:** 15/09/2026
**Verificado por:** <nome> e <nome>

## Funcional
- [x] Todos os itens do escopo da sprint atendem aos critérios de aceitação
- [x] O incremento roda a partir de um clone limpo, seguindo o README
- [ ] Nenhum defeito crítico conhecido em aberto
      → Aberto: #47 (cálculo de horário duplicado). Impacto médio, corrige na Sprint 3.

## Código
- [x] Todo código na `main` passou por Pull Request revisado
- [x] Integração contínua verde no último commit da `main`
- [x] Nenhum segredo ou credencial versionado

## Testes
- [x] Testes automatizados das regras críticas passando (34 testes)
- [x] Teste manual do fluxo principal executado e registrado

## Atributos de qualidade
- [x] Busca responde em menos de 2s com a massa de teste
- [x] Telas principais navegáveis por teclado
- [x] Autenticação exigida em todas as rotas de dados pessoais

## Documentação e evidências
- [x] Documentação técnica atualizada
- [x] ADRs da sprint escritos (ADR 0004)
- [x] Ata da Sprint Review e relatório da sprint publicados
- [x] Riscos revisados

## Decisão
( x ) Aprovado com ressalvas: o defeito #47 entra como primeiro item da Sprint 3.
(   ) Aprovado    (   ) Reprovado
```

💡 **"Aprovado com ressalva" é uma resposta legítima e madura.** O erro é marcar tudo como verde quando não está. A ressalva escrita mostra controle; a ressalva escondida vira surpresa na defesa.

---

## 🧪 Estratégia de qualidade (o documento da Sprint 0)

`docs/estrategia-de-qualidade.md`, uma página:

```markdown
# Estratégia de qualidade

## O que vamos testar automaticamente
- Regras de negócio (serviços): sempre
- Endpoints principais da API: teste de integração
- Front-end: apenas os componentes com lógica

## O que vamos testar manualmente
- Fluxos completos antes de cada Sprint Review, com roteiro escrito

## Ferramentas
- Testes: <Jest / Vitest / PyTest / JUnit>
- Execução automática: GitHub Actions em todo push e PR

## Metas
- Todo item novo com regra de negócio entra com teste
- Nenhum PR é integrado com CI vermelha

## Registro de defeitos
- Todo defeito vira issue com label `bug`, com passos de reprodução
- Defeitos críticos entram na sprint corrente; os demais são priorizados no refinement
```

Isso já atende ao que o plano chama de garantia da qualidade, sem virar um plano de testes de 30 páginas que ninguém lê.

---

## 🐞 Ciclo de defeitos

1. Achou um bug? **Vira issue**, mesmo que você mesmo vá corrigir em seguida. Se não virar issue, não existe evidência.
2. A issue traz: o que acontece, o que deveria acontecer, como reproduzir e onde apareceu.
3. Classifique: **crítico** (impede o uso), **médio** (atrapalha, tem contorno), **baixo** (incômodo).
4. Crítico entra na sprint atual. Os outros vão para o refinement.
5. Corrigiu? **Escreva o teste que trava aquele bug para sempre** antes de fechar.

> Roteiro de depuração: [[07-Checklists-do-dia-a-dia]] e [[11-Quando-voce-nao-sabe-o-que-fazer]].

---

## 📈 Métricas simples para o seminário e a defesa

Não invente indicador complexo. Estes você extrai do próprio GitHub em 5 minutos e comunicam muito:

| Métrica | Onde tirar | O que mostra |
|---|---|---|
| Issues planejadas × concluídas por sprint | Board / milestone | Previsibilidade da equipe |
| Pull requests integrados | Aba Pull requests, filtro `is:merged` | Volume e ritmo de trabalho |
| Tempo médio de revisão de PR | Datas de abertura e merge | Saúde da colaboração |
| Número de testes automatizados | Saída da suíte | Evolução da rede de segurança |
| Defeitos abertos × fechados | Label `bug` | Controle da qualidade |
| Requisitos entregues × planejados | `docs/requisitos.md` | Cobertura do escopo acordado |

💡 Guarde o número de cada sprint no relatório. Na defesa, a evolução ao longo do semestre conta uma história melhor do que qualquer número isolado.

---

## ✅ Checklist de qualidade da sprint

- [ ] A DoD está escrita, acordada e sendo usada nos PRs.
- [ ] O Quality Gate da sprint foi preenchido e assinado antes da review.
- [ ] Todos os defeitos conhecidos viraram issue.
- [ ] A suíte de testes passa na `main`.
- [ ] As métricas da sprint foram registradas no relatório.
- [ ] Os riscos foram revisados.

---

> Próximo: [[17-Defesa-aceite-e-handover]].
