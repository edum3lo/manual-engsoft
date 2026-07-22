---
title: '10 - Guia do primeiro mês (sobreviver e se dar bem)'
---

# 10 — Guia do primeiro mês (sobreviver e se dar bem)

> Manual de Bolso · Volume 6. O que fazer nos primeiros 30 dias de um emprego/estágio para começar bem, aprender rápido e ganhar a confiança do time — sem se afogar na ansiedade.
> Complementa [[119-Seu-primeiro-emprego-e-os-proximos-anos]], [[107-Como-aprender-sozinho-estudar-e-pesquisar]] e [[109-Colaboracao-humana]].

---

## 🎯 A verdade que muda tudo (leia primeiro)

**Ninguém espera que você saiba tudo.** Espera-se que um júnior **aprenda rápido, seja humilde e colabore bem** — não que chegue pronto. Isso não é consolo; é o critério **real** pelo qual você será avaliado no começo.

O sucesso no primeiro mês **não** é "não errar" nem "resolver tudo sozinho". É:
1. **Deixar o ambiente rodando** e entender como o time trabalha.
2. **Entregar algo pequeno** (o primeiro PR).
3. **Fazer boas perguntas** e não travar em silêncio.
4. **Mostrar que aprende e é confiável.**

> 💡 A **síndrome do impostor** vai bater — sentir que "não sou bom o suficiente" é **quase universal** e, ironicamente, atinge mais quem é competente (porque enxerga o quanto ainda não sabe). É sinal de que você está aprendendo, não de que é fraude. Todo sênior já foi um júnior nervoso no primeiro dia.

---

## 🗓️ A linha do tempo (semana a semana)

### Semana 1 — Orientar-se e não travar

**Objetivo: rodar o projeto, entender o terreno, conhecer as pessoas.**

- [ ] **Faça o setup** do ambiente (rode o projeto localmente). Se travar mais de 30–40 min, **peça ajuda** — no começo isso é esperado e comum. Anote cada passo (vai virar doc para o próximo).
- [ ] **Mapeie as ferramentas**: onde ficam o código (GitHub/GitLab), as tarefas (Jira/Trello — [[45-Estimativas-planejamento-e-ferramentas]]), a comunicação (Slack/Teams), a documentação, os logs/monitoramento ([[89-Logs-metricas-e-tracing]]).
- [ ] **Mapeie as pessoas**: quem é seu gestor/mentor, quem manja de quê, a quem perguntar sobre cada área. Guarde isso.
- [ ] **Entenda o produto e o negócio**: o que a empresa faz, como ganha dinheiro ([[105-Por-que-empresas-fazem-software-modelos-de-negocio]]), quem são os usuários. Isso dá sentido a **tudo** que você vai construir.
- [ ] **Leia código dos colegas** para absorver os padrões reais do time ([[107-Como-aprender-sozinho-estudar-e-pesquisar]]).
- [ ] **Peça uma tarefa pequena** (a maioria dos times já reserva uma para juniores). Se não vier, peça: "tem algo pequeno em que eu possa começar a mexer?"

> 💡 **Faça perguntas AGORA.** A primeira semana é quando "perguntas óbvias" são **mais baratas e esperadas**. Quanto mais o tempo passa, mais custa perguntar o básico. Aproveite a licença de novato.

### Semana 2 — Primeira entrega

**Objetivo: mandar seu primeiro Pull Request (por menor que seja).**

- [ ] Pegue uma tarefa **pequena e bem definida** (corrigir um bug simples, um texto, um teste).
- [ ] Siga o **fluxo da alteração** ([[09-GitHub-na-pratica]]): `pull → branch → editar → commit → push → PR`.
- [ ] Abra o **PR pequeno** com uma boa descrição (o quê, por quê, como testar — [[07-Checklists-do-dia-a-dia]]).
- [ ] **Receba o code review como presente** — não se defenda; agradeça, aprenda, ajuste ([[109-Colaboracao-humana]]).
- [ ] **Merge!** Seu primeiro código em produção. Comemore — é um marco real.

> 💡 **Envie algo cedo, mesmo que trivial.** Um primeiro PR pequeno e concluído vale mais do que passar semanas "entendendo tudo" sem entregar nada. Ele prova que você consegue fechar o ciclo, e te ensina o processo do time na prática.

### Semanas 3–4 — Ganhar ritmo e autonomia

**Objetivo: resolver tarefas com menos ajuda e entender o fluxo inteiro.**

- [ ] Pegue tarefas **um pouco maiores**; comece a estimar ([[07-Checklists-do-dia-a-dia]]).
- [ ] Entenda o **fluxo de ponta a ponta**: como uma mudança vai do seu commit à produção ([[85-CICD-a-linha-de-montagem]], [[118-Deploy-cloud-producao-e-monitoramento]]).
- [ ] Comece a **fazer code review** dos outros (mesmo que só perguntando para aprender).
- [ ] Note onde você **ainda trava** e estude esses pontos deliberadamente ([[107-Como-aprender-sozinho-estudar-e-pesquisar]]).
- [ ] **Peça feedback** ao seu mentor/gestor: "o que estou indo bem? o que posso melhorar?" — mostra maturidade e acelera seu crescimento.

> 💡 **No fim do 1º mês**, você não precisa dominar o sistema — precisa saber **se virar**: rodar, entregar uma tarefa pequena, pedir ajuda direito, e navegar o código sem pânico. Isso já é sucesso.

---

## 🔍 Como buscar ajuda e referências (a ordem certa)

Antes de interromper um colega, siga esta escada — mas **não trave por horas** por orgulho:

1. **Leia a mensagem de erro** com atenção. Ela quase sempre diz o problema ([[107-Como-aprender-sozinho-estudar-e-pesquisar]]).
2. **Pesquise** o erro exato / termos precisos.
3. **Documentação oficial** — a fonte da verdade (não só tutoriais). Aprender a lê-la te torna independente.
4. **O código e os docs internos** do time — muitas respostas já estão lá.
5. **IA como tutor** (explicar, orientar) — nunca colar cego, sempre verificar ([[108-Como-usar-IA-corretamente-na-engenharia]]).
6. **Pergunte a um humano** — no momento certo (o "timebox": tentou ~30–45 min sem progresso? peça).

**Como pedir ajuda direito** (respeita o tempo do colega e resolve mais rápido):
> "Estou travado em X. Meu objetivo era Y. Já tentei A e B, e o erro é [cola o erro]. Alguma ideia de por onde olhar?"

Mostrar o que você **já tentou** faz três coisas: respeita quem ajuda, frequentemente **resolve o problema sozinho** no processo de explicar (efeito "pato de borracha"), e te faz parecer alguém que **tenta antes de pedir** — o que o time valoriza. Ver [[109-Colaboracao-humana]].

> ⚠️ **O erro nº 1 do primeiro emprego: sumir quando trava.** Ficar em silêncio por dias, com medo de "parecer burro", é muito pior do que pedir ajuda. Pedir ajuda no momento certo é **maturidade**, não fraqueza.

---

## 🌟 Estratégias para se dar bem (o que te destaca)

Estas são as coisas que fazem um júnior ser lembrado como "aquele(a) que é ótimo(a) de trabalhar":

| Estratégia | Por quê |
|-----------|---------|
| **Seja confiável, não brilhante.** | Entregar o combinado, no prazo, com qualidade, vale mais que "genialidade" esporádica. Confiança é o que constrói reputação. |
| **Comunique cedo e sempre.** | Diga seu progresso e, principalmente, quando estiver **travado ou vai atrasar** — cedo. Ninguém gosta de surpresa no último dia. ([[112-Soft-skills-comunicacao-e-salario]]) |
| **Anote tudo (seu "segundo cérebro").** | Comandos de setup, decisões, respostas de perguntas, como as coisas funcionam. Você não vai lembrar; e vira doc para o próximo novato. |
| **Under-promise, over-deliver.** | Estime com margem honesta e entregue um pouco além, em vez de prometer demais e frustrar. |
| **Assuma seus erros.** | Errar é normal e esperado. Esconder é o problema. "Eu quebrei isso, já estou corrigindo" gera **confiança**, não punição (cultura sem culpa — [[91-Alertas-incidentes-e-plantao-on-call]]). |
| **Seja curioso e proativo (com humildade).** | Pergunte "por quê", ofereça-se para tarefas, mas sem passar por cima de ninguém. |
| **Ajude os outros quando puder.** | Mesmo júnior, você pode ajudar (documentar, testar, revisar). Fortalece o time e sua reputação. ([[109-Colaboracao-humana]]) |
| **Entenda o "porquê" do que você faz.** | Ligue sua tarefa ao valor para o usuário e o negócio. Isso te torna parceiro, não executor. ([[105-Por-que-empresas-fazem-software-modelos-de-negocio]]) |
| **Cuide da higiene técnica.** | Commits pequenos e claros, PRs pequenos, testes, ler o erro. O básico bem-feito impressiona. ([[08-Convencoes-e-boas-praticas]]) |

---

## 🚫 O que NÃO fazer no começo

| ❌ Evite | Faça em vez disso |
|---------|-------------------|
| Sumir quando travado (silêncio por dias) | Peça ajuda no timebox, mostrando o que tentou. |
| Fingir que entendeu quando não entendeu | Diga "não entendi essa parte, pode explicar?". É esperado. |
| Commitar direto na main / dar deploy sem entender | Sempre branch + PR; pergunte o processo do time ([[09-GitHub-na-pratica]]). |
| Se defender de todo feedback | Ouça, agradeça, ajuste. Feedback é presente ([[109-Colaboracao-humana]]). |
| Tentar "impressionar" com soluções complexas | Prefira o simples que resolve (KISS, YAGNI). ([[08-Convencoes-e-boas-praticas]]) |
| Ficar quieto nas reuniões e nunca perguntar | Faça perguntas — normaliza não saber tudo e mostra engajamento. |
| Colar dados sensíveis/código em IA pública | Cuidado com privacidade e segredos ([[101-LGPD-e-privacidade]]). |
| Comparar-se com os seniores e se desanimar | Compare com você de ontem. Todos eles já foram você. |

---

## 🧰 Monte seu "kit de sobrevivência" pessoal

Nos primeiros dias, crie e mantenha:

- **Um doc de setup** — cada passo para rodar o projeto (seu e do próximo novato).
- **Um doc de "como as coisas funcionam"** — arquitetura, fluxos, onde ficam as coisas ([[89-Logs-metricas-e-tracing]], [[57-O-que-e-arquitetura-de-software]]).
- **Uma lista de comandos do time** — os específicos do projeto (rodar, testar, subir).
- **Um "quem-é-quem"** — a quem perguntar sobre cada assunto.
- **Um caderno de dúvidas & respostas** — o que você perguntou e aprendeu (para não repetir).
- **Os atalhos do Manual de Bolso** — deixe [[00-Indice]] à mão (Git, terminal, Docker, SQL, HTTP...).

---

## 🧠 O lado emocional (tão importante quanto o técnico)

- **A curva é íngreme — e passa.** As primeiras semanas parecem um caos de informação nova. É normal, e melhora rápido. Em 1–2 meses você já se sente muito mais firme.
- **Comemore as pequenas vitórias.** O primeiro PR, a primeira dúvida resolvida sozinho, o primeiro elogio. Elas somam.
- **Paciência: é uma maratona.** Você não precisa "provar seu valor" no primeiro mês. Precisa aprender, colaborar e evoluir — no seu ritmo ([[113-Plano-de-carreira]]).
- **Descanse.** Ansiedade e exaustão atrapalham o aprendizado mais que a falta de conhecimento. Cuide de você.
- **Confie no processo.** Você tem as bases (a coleção as deu). O resto se aprende **fazendo** — e você vai aprender.

---

## ✅ Checklist rápido do primeiro mês

- [ ] Ambiente rodando; sei rodar, testar e subir o projeto.
- [ ] Entendi o fluxo de Git/PR/deploy do time.
- [ ] Sei onde ficam código, tarefas, docs, logs.
- [ ] Entendi o produto e como a empresa ganha dinheiro.
- [ ] Sei a quem pedir ajuda e como é o on-call (se houver).
- [ ] Entreguei meu primeiro PR (merge feito!).
- [ ] Fiz perguntas sem vergonha e recebi feedback sem me defender.
- [ ] Montei meu "segundo cérebro" (docs, comandos, dúvidas).
- [ ] Pedi feedback ao mentor/gestor sobre como estou indo.
- [ ] Sobrevivi à síndrome do impostor — e sei que ela é normal. 🙂

---

## O resumo em uma frase

> **No primeiro mês, seu trabalho não é saber tudo — é aprender rápido, entregar pequeno, pedir ajuda direito e ser alguém confiável e agradável de se trabalhar. O resto vem com o tempo.**

Bem-vindo à profissão. Você vai se sair bem. 🚀

---

> 🧭 Manual de Bolso → **Guia do primeiro mês**. Anterior: [[09-GitHub-na-pratica]]. Aprofunde em [[119-Seu-primeiro-emprego-e-os-proximos-anos]]. Volta ao [[00-Indice]].
