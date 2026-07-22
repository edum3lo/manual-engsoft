# 07 — Checklists do dia a dia

> Manual de Bolso · Volume 6. Listas rápidas para passar os olhos antes de agir. "Esqueci de alguma coisa?"

---

## ✅ Antes de abrir um Pull Request

- [ ] O código **funciona** e faz o que a tarefa pedia (rodei localmente).
- [ ] **Testes** para o código novo, e a suíte inteira passa. ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]])
- [ ] Sem **segredos** (senhas, chaves) no código ou no diff. ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]])
- [ ] Sem `console.log`/prints de debug esquecidos.
- [ ] Commits com **mensagens claras** ([[08-Convencoes-e-boas-praticas]]).
- [ ] Tratei os **casos de erro** (não só o caminho feliz). ([[78-Ligando-front-end-a-experiencia-do-usuario]])
- [ ] Atualizei a **documentação/README** se necessário.
- [ ] O PR é **pequeno e focado** (mais fácil de revisar).
- [ ] **Descrição do PR:** o quê, por quê, como testar, o que revisar com atenção.
- [ ] A branch está **atualizada** com a `main`.

---

## ✅ Ao fazer um code review (revisar o dos outros)

- [ ] **Entendi** o que o PR faz e por quê.
- [ ] Comento o **código**, não a pessoa. Respeitoso e específico. ([[109-Colaboracao-humana]])
- [ ] Explico o **porquê** das sugestões (ensinar, não só mandar).
- [ ] Distingo "**precisa** mudar" de "**sugestão** (nit)".
- [ ] **Elogio** o que está bom.
- [ ] Verifico: **segurança**, **tratamento de erro**, **testes**, **legibilidade**.
- [ ] Confiro se não confia em input do usuário sem validar. ([[73-Autenticacao-e-autorizacao]])
- [ ] Não travo o PR por implicância menor — aprovo se está bom o suficiente.

---

## ✅ Antes de um deploy / merge na main

- [ ] CI **verde** (todos os testes passaram). ([[85-CICD-a-linha-de-montagem]])
- [ ] Code review **aprovado**.
- [ ] Sei fazer **rollback** rápido se der errado. ([[98-Estrategias-de-deploy]])
- [ ] Mudanças de **banco** são retrocompatíveis (expand-contract). ([[98-Estrategias-de-deploy]])
- [ ] Se arriscado: **canário** ou feature flag (liberar aos poucos). ([[96-AB-testing-e-feature-flags]])
- [ ] Sei o que **observar** depois (métricas, erros). ([[89-Logs-metricas-e-tracing]])
- [ ] Deploy é **pequeno** (mais fácil de reverter e diagnosticar).
- [ ] Não é sexta 18h nem véspera de feriado (se puder evitar 😅).

---

## ✅ Quando algo quebra (debugging)

1. [ ] **Leia a mensagem de erro** com atenção — ela quase sempre diz o problema. ([[107-Como-aprender-sozinho-estudar-e-pesquisar]])
2. [ ] **Reproduza** o bug (que passos causam?). Se não reproduz, não conserta. ([[83-QA-bugs-e-o-ciclo-de-correcao]])
3. [ ] **Isole**: o que mudou recentemente? Onde exatamente falha?
4. [ ] Olhe os **logs** (`docker logs`, `tail -f`, a ferramenta de observabilidade). ([[89-Logs-metricas-e-tracing]])
5. [ ] Busque a **causa-raiz**, não só o sintoma.
6. [ ] Corrija **e escreva um teste** que trava esse bug para sempre. ([[82-TDD-e-testes-automatizados]])
7. [ ] **Verifique** que sumiu (e não quebrou outra coisa).

💡 **Rubber duck:** explique o problema em voz alta (nem que seja para um patinho) — a solução costuma aparecer sozinha.

---

## ✅ Durante um incidente em produção

1. [ ] **Estanque o sangramento primeiro** — restaure o serviço (rollback!), investigue depois. ([[91-Alertas-incidentes-e-plantao-on-call]])
2. [ ] **Comunique** — avise o time/status; não resolva sozinho no escuro.
3. [ ] Se grave, alguém **coordena** (Incident Commander); os outros investigam.
4. [ ] Use os **três pilares**: métrica (o quê) → trace (onde) → log (por quê). ([[89-Logs-metricas-e-tracing]])
5. [ ] Depois: **post-mortem sem culpa** — o que melhorar no sistema/processo. ([[91-Alertas-incidentes-e-plantao-on-call]])

> ⚠️ **A ordem certa num incidente é: reverter → estabilizar → comunicar → só então debugar.** Não debugue em produção com usuários sofrendo.

---

## ✅ Segurança (o mínimo, sempre)

- [ ] **Nunca confie no input** — valide e trate tudo que vem de fora. ([[73-Autenticacao-e-autorizacao]])
- [ ] **Queries parametrizadas** (nunca concatenar input no SQL). ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]])
- [ ] **Escape a saída** exibida (contra XSS).
- [ ] Cheque **autorização** em cada requisição (não só "está logado?"). ([[73-Autenticacao-e-autorizacao]])
- [ ] **Segredos** fora do código (variáveis de ambiente / cofre).
- [ ] Senhas com **hash forte** (bcrypt), nunca em texto puro.
- [ ] O **back recalcula** valores (preço, total) — não confia no front.
- [ ] Dependências **atualizadas** (sem vulnerabilidades conhecidas).

---

## ✅ Primeiro dia / primeiros dias num time novo

- [ ] Consigo **rodar o projeto** localmente (peça ajuda se travar).
- [ ] Entendi como o time usa **Git/branches/PR** (o fluxo deles).
- [ ] Sei onde ficam **logs, métricas e a documentação**.
- [ ] Entendi **como a empresa ganha dinheiro** (o negócio). ([[105-Por-que-empresas-fazem-software-modelos-de-negocio]])
- [ ] Li **código dos colegas** para aprender os padrões. ([[107-Como-aprender-sozinho-estudar-e-pesquisar]])
- [ ] Fiz **perguntas** sem vergonha (ninguém espera que você saiba tudo). ([[109-Colaboracao-humana]])
- [ ] Sei a quem **pedir ajuda** e como é o **on-call** do time. ([[91-Alertas-incidentes-e-plantao-on-call]])

---

## ✅ Estimar uma tarefa (antes de dizer "amanhã fica")

- [ ] Entendi **de verdade** o que precisa ser feito? (perguntei o que não estava claro)
- [ ] Considerei os **casos de erro** e as exceções, não só o caminho feliz?
- [ ] Considerei **testes**, review e possíveis idas e voltas?
- [ ] Há **dependências** (de outra pessoa/time/API)?
- [ ] Dei uma estimativa **honesta** (com margem), não otimista demais?

💡 Regra prática: pense na estimativa "ideal" e... considere que imprevistos acontecem. Comunique cedo se for atrasar.

---

## ✅ Usando IA para programar

- [ ] Uso como **tutor** (entender), não muleta (colar sem entender). ([[108-Como-usar-IA-corretamente-na-engenharia]])
- [ ] **Reviso e entendo** todo código que ela gera (nunca colo cego).
- [ ] **Verifico segurança** do que ela sugere (ela gera padrões inseguros).
- [ ] **Não colo dados sensíveis** / código proprietário em IA pública. ([[101-LGPD-e-privacidade]])
- [ ] Trato a saída como **rascunho a verificar**, não verdade (ela alucina).

---

> 🧭 Manual de Bolso → **Checklists do dia a dia**. Anterior: [[06-Glossario-tecnico-rapido]] · Próxima: [[08-Convencoes-e-boas-praticas]].
