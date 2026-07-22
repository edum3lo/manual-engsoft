---
title: 'Índice do Volume 6'
---

# Volume 6 — Manual de Bolso do Engenheiro

> Coleção: *Do Estudante ao Engenheiro de Software*
> Este é o **volume de referência rápida** — um "manual de bolso" para consultar no dia a dia da empresa. Comandos, termos, atalhos, checklists e convenções que você usa toda hora e precisa ter à mão. Diferente dos volumes 1 a 5 (que **ensinam**), este volume serve para **consultar** rápido.

---

## Como usar este manual

Este não é um livro para ler de capa a capa — é uma **cola** organizada por tema, feita para você **abrir na página certa** quando precisar lembrar um comando, um status HTTP, um termo, ou seguir um checklist antes de um deploy. Guarde-o aberto numa aba, imprima as folhas que mais usa, ou consulte no meio do trabalho.

Cada arquivo é uma "folha de referência" (cheat sheet) independente. Os comandos vêm em **tabelas** e **blocos de código** prontos para copiar. Quando um tópico exige entendimento mais profundo, há um ponteiro para o capítulo dos volumes 1 a 5 que o **ensina** — porque decorar comando sem entender o porquê é frágil. Este manual assume que você **já estudou** os conceitos; ele só te ajuda a **lembrar** na hora H.

> ⚠️ **Aviso:** comandos que apagam, sobrescrevem ou forçam algo (marcados com ⚠️) podem causar perda de dados. Leia antes de rodar, especialmente `rm -rf`, `git push --force`, `git reset --hard`, `DROP`, `DELETE` sem `WHERE`, e qualquer coisa em produção.

---

## Índice das folhas de referência

| # | Folha | O que você encontra |
|---|-------|---------------------|
| 01 | [[01-Git-e-GitHub]] | Comandos Git do dia a dia, fluxo de Pull Request, desfazer erros, branches, merge vs. rebase. |
| 02 | [[02-Terminal-e-Linux]] | Navegar, mexer em arquivos, permissões, processos, `grep`/`find`, pipes, rede, atalhos. |
| 03 | [[03-Docker]] | Imagens, containers, `docker compose`, limpeza, Dockerfile essencial. |
| 04 | [[04-SQL]] | `SELECT`/`INSERT`/`UPDATE`/`DELETE`, `JOIN`s, agregações, padrões e armadilhas. |
| 05 | [[05-HTTP-APIs-e-REST]] | Métodos, status codes, headers, autenticação, `curl`, JSON. |
| 06 | [[06-Glossario-tecnico-rapido]] | Definições curtas dos termos que você mais ouve na empresa. |
| 07 | [[07-Checklists-do-dia-a-dia]] | Antes do PR, code review, antes do deploy, debugging, incidente, segurança. |
| 08 | [[08-Convencoes-e-boas-praticas]] | Mensagens de commit, nomenclatura, versionamento semântico, `.gitignore`, code smells. |
| 09 | [[09-GitHub-na-pratica]] | ⭐ Do zero à equipe: criar projeto e subir a 1ª vez, clonar, o que cada comando faz, passo a passo de uma alteração, o que **não** fazer em time, e **problemas comuns → solução**. |
| 10 | [[10-Guia-do-Primeiro-Mes]] | ⭐ Guia de sobrevivência e sucesso do **primeiro mês**: mindset, semana a semana, como buscar ajuda, estratégias para se destacar, o que evitar, e o lado emocional. |

---

## Os "mandamentos" que valem para tudo

Um resumo do que **nunca** esquecer, destilado dos 119 capítulos:

1. **Nunca confie na entrada do usuário.** Valide e trate tudo que vem de fora; o back recalcula tudo. ([[73-Autenticacao-e-autorizacao]], [[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]])
2. **Commit pequeno e frequente, com mensagem clara.** Facilita revisar, entender e reverter. ([[61-Git-no-dia-a-dia]])
3. **Nada entra na main sem PR + review + CI verde.** ([[64-Pull-Requests-code-review-e-issues]])
4. **Teste o que tem risco; a suíte é sua rede de segurança.** Confiança para mudar sem medo. ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]])
5. **Poder voltar rápido > nunca errar.** Tenha rollback pronto; num incidente, reverta primeiro, investigue depois. ([[98-Estrategias-de-deploy]], [[91-Alertas-incidentes-e-plantao-on-call]])
6. **Não otimize/escale antes da hora (YAGNI).** Meça, ache o gargalo real, resolva só ele. ([[92-De-100-a-1-milhao-de-usuarios]])
7. **Segredos nunca no código nem no Git.** Use cofre de segredos, em runtime. ([[86-Docker-e-containers]], [[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]])
8. **Leia a mensagem de erro antes de pedir ajuda.** Ela quase sempre diz a solução. ([[107-Como-aprender-sozinho-estudar-e-pesquisar]])
9. **Peça ajuda no momento certo (timebox); ofereça ajuda.** Colaboração > gênio solitário. ([[109-Colaboracao-humana]])
10. **Entenda o porquê (o negócio) por trás do código.** ([[105-Por-que-empresas-fazem-software-modelos-de-negocio]])
11. **IA é tutor, não muleta; verifique tudo que ela gera.** ([[108-Como-usar-IA-corretamente-na-engenharia]])
12. **Nunca pare de aprender.** As ferramentas mudam; a capacidade de aprender, não. ([[119-Seu-primeiro-emprego-e-os-proximos-anos]])

---

## Convenções deste manual

- `código` = comando ou termo literal.
- `<placeholder>` = você substitui pelo valor real (ex.: `<branch>`, `<arquivo>`).
- ⚠️ = comando perigoso (apaga/sobrescreve/força). Cuidado.
- 💡 = dica útil.
- Os `[[links]]` apontam para os capítulos dos volumes 1 a 5 que **ensinam** o assunto.

---

> 🧭 **Este é o Volume 6 — Manual de Bolso.** Os volumes 1 a 5 (capítulos 1 a 119) ensinam; este consulta. Mantenha-o por perto.
