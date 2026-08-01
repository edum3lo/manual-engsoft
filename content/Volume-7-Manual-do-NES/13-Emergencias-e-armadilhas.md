---
title: '13 - Emergências e armadilhas'
---

# 13. Emergências e armadilhas

> Manual do NES · Volume 7. Abra aqui quando já deu errado. Cada seção é um problema real de equipe de NES, com o que fazer nos próximos 30 minutos.

---

## 🔥 "A demo é amanhã e nada funciona"

**Não tente consertar tudo.** Faça isto, nesta ordem:

1. **Descubra o último ponto em que funcionava.**
   ```bash
   git log --oneline -20
   git checkout <hash-que-funcionava>   # só para conferir
   ```
   Se um commit específico quebrou, reverta ele: `git revert <hash>`.
2. **Escolha o menor caminho demonstrável.** Uma funcionalidade que roda vale mais que quatro pela metade. Desative na interface o que está quebrado.
3. **Grave um vídeo do que funciona, hoje à noite.** É seu plano B se o ambiente falhar na hora.
4. **Escreva a lista honesta do que não entrou.** Você vai falar isso na reunião de qualquer forma, então chegue com ela pronta e com o motivo.

🗣️ Na reunião: *"Esta sprint entregamos menos do que planejamos. Vou mostrar o que está funcionando, e depois explico o que aconteceu com o resto e como replanejamos."* Isso é aceitável e profissional. Fingir que está pronto e travar na frente do cliente, não.

---

## 💣 "Alguém quebrou a `main`"

```bash
# 1. Identifique o commit culpado
git log --oneline -10

# 2. Reverta (cria um novo commit desfazendo aquele, sem reescrever histórico)
git revert <hash>
git push

# 3. Se foi um merge de PR
git revert -m 1 <hash-do-merge>
```

⚠️ **Nunca** use `git reset --hard` + `push --force` na `main` compartilhada. Você apaga o trabalho de quem já puxou. `revert` é o caminho seguro e é o que se faz no mercado.

Depois, sem caça às bruxas: por que o CI não pegou? Falta teste? Falta review? Isso vira pauta de 2 minutos na retro.

---

## 🌊 "O merge virou um inferno, tem conflito em 30 arquivos"

Isso quase sempre significa que a branch ficou 10 dias sem puxar a `main`.

```bash
# tente resolver por partes
git merge main
git status                    # veja a lista de conflitos
git checkout --ours <arquivo>   # fica a versão da SUA branch
git checkout --theirs <arquivo> # fica a versão da main
# para os arquivos que importam, resolva na mão
```

Se estiver irrecuperável e sua mudança for pequena, a saída pragmática:

```bash
git merge --abort
git checkout main && git pull
git checkout -b feat/12-cadastro-v2
# reaplique suas mudanças manualmente (copie do editor ou de git diff)
```

**Prevenção**, que é o que realmente resolve: puxe a `main` para a sua branch todo dia, e mantenha PRs pequenos e curtos de vida.

---

## 🕳️ "Perdi meu trabalho"

Antes de entrar em pânico, o Git guarda quase tudo por 90 dias:

```bash
git reflog                 # histórico de TUDO que aconteceu, inclusive o "perdido"
git checkout <hash>        # volte ao ponto que queria
git checkout -b recuperado # salve numa branch nova
```

Se você **não commitou**, aí o Git não pode ajudar. É o argumento a favor de commitar cedo e com frequência, mesmo que incompleto, na sua branch.

```bash
git stash list             # se você deu stash e esqueceu
git stash pop
```

---

## 🔑 "Subimos uma senha para o GitHub"

Nesta ordem, e rápido:

1. **Considere a credencial comprometida.** Peça troca ao proponente ou gere outra chave. Repositório público é varrido por robôs em minutos.
2. Remova do rastreamento e ignore:
   ```bash
   echo ".env" >> .gitignore
   git rm --cached .env
   git commit -m "chore: remove .env do versionamento"
   git push
   ```
3. Avise a equipe. Sem esconder.
4. Se precisar limpar o histórico inteiro, use `git filter-repo` ou o BFG, mas ⚠️ isso reescreve o histórico e exige que todo mundo re-clone. Só faça com a equipe avisada e junta.

> [[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]].

---

## 👻 "Um colega sumiu e a tarefa dele é crítica"

1. **Hoje:** mensagem no privado, tom humano ([[10-Cerimonias-e-rotina-da-equipe]]).
2. **Sem resposta em 48h:** anuncie no grupo que a tarefa será redistribuída e quem vai pegar.
3. **Recupere o que existe:** o trabalho dele pode estar numa branch remota.
   ```bash
   git fetch --all
   git branch -r                     # veja se ele deu push em algo
   git checkout origin/<branch-dele>
   ```
4. **Registre em ata**, sem adjetivos: *"Issue #18 redistribuída para <nome> por indisponibilidade."*
5. **Se comprometer a entrega**, informe o professor antes da entrega, não depois.

---

## 🎈 "O escopo explodiu, não vamos conseguir"

Aconteceu porque alguém disse sim no meio da sprint. Como consertar:

1. **Liste tudo que está pendente** e classifique de novo em Must / Should / Could.
2. **Corte tudo que não é Must**, sem dó, e avise o proponente na reunião com uma proposta, não com um lamento.
3. 🗣️ *"Revisando o que falta e o tempo que temos, não conseguimos entregar tudo com qualidade. Nossa proposta é focar em A e B, que são o núcleo do que você precisa, e deixar C e D documentados no backlog para a próxima etapa. Faz sentido pra você?"*
4. **Registre a nova linha de corte por escrito.**

Cortar escopo com antecedência e transparência é considerado boa engenharia. Prometer tudo e entregar nada quebrado é o oposto.

---

## 🧟 "O código que herdamos é horrível"

Provavelmente é mesmo. E mesmo assim:

- **Não reescreva.** Refatore só o que você já precisa tocar, junto da tarefa que está fazendo.
- **Registre a dívida** em issues com a label `refatoracao`, para ficar visível sem virar prioridade.
- **Blinde antes de mexer:** se for mexer em algo crítico e sem teste, escreva primeiro um teste que prova o comportamento atual. Aí você refatora sem medo. Ver [[82-TDD-e-testes-automatizados]] e [[99-Divida-tecnica-e-chaos-engineering]].
- Na reunião, apresente a dívida como **risco**, com consequência prática: *"essa parte não tem teste e é onde mais aparecem bugs; sugerimos reservar 2 dias da próxima sprint para cobrir isso."*

---

## 🥊 "A equipe está brigando"

Quase sempre é conflito de expectativa, não de pessoa. O padrão: uma parte acha que está carregando o time, outra se sente excluída das decisões.

1. **Traga para o processo, não para o pessoal.** Discuta na retro, com o quadro na tela: quem entregou o quê, o que foi combinado.
2. **Torne o combinado explícito.** Muita briga é sobre uma regra que nunca foi escrita ([[12-Kit-de-templates-copiaveis]], seção Combinados).
3. **Separe fato de interpretação.** "A #18 ficou 8 dias parada" é fato. "Você não se importa" é interpretação.
4. **Se travar mesmo**, chame o professor como mediador. Isso é papel dele e é uma situação prevista na disciplina.

---

## ⏳ "Estamos na sprint 3 e mal saímos do lugar"

Diagnóstico honesto em 30 minutos, com a equipe:

| Se o problema for | A correção |
|---|---|
| Ninguém tem tempo | Reduza o escopo total do projeto, formalmente, com o proponente |
| As tarefas são grandes demais | Quebre tudo em pedaços de meio dia ([[11-Quando-voce-nao-sabe-o-que-fazer]]) |
| Falta conhecimento técnico | Programação em par, e escolha soluções mais simples |
| Falta coordenação | Volte a fazer daily e checkpoint do dia 7 |
| A stack foi um erro | ⚠️ Só troque se for o único caminho, e nunca depois da sprint 2 |

E leve isso para a reunião. Um replanejamento apresentado com clareza no meio do semestre é recuperável. A descoberta na entrega final, não.

---

## 🚫 As 10 armadilhas clássicas do NES

1. **Sprint 0 relaxada.** Custa caro da sprint 2 em diante.
2. **Dividir por camada e integrar no fim.** Front e back só se encontram no dia 14 e nada funciona.
3. **Escolher tecnologia nova para aprender.** A disciplina já é o aprendizado.
4. **Uma pessoa faz tudo.** Vira gargalo, se esgota e o resto não aprende nada.
5. **Deixar documentação para o final.** Vira ficção escrita às pressas.
6. **Não registrar as reuniões.** Toda divergência futura vira palavra contra palavra.
7. **Dizer sim para todo pedido novo.** O escopo cresce, a equipe não.
8. **Deploy só na última sprint.** Sempre demora mais do que se imagina.
9. **Ignorar o colega que sumiu.** O problema chega na nota de todo mundo.
10. **Esconder que está travado.** Um dia de silêncio custa pouco. Sete custam a sprint.

---

## 🆘 Cartão de emergência

| Situação | Vá para |
|---|---|
| Não sei por onde começar | [[11-Quando-voce-nao-sabe-o-que-fazer]] |
| Não sei o que entregar nesta sprint | [[09-As-5-sprints-o-que-entregar-em-cada-uma]] |
| Não sei que artefato o plano exige | [[14-Do-plano-de-ensino-ao-artefato]] |
| A Sprint Review é amanhã | [[08-A-reuniao-com-o-proponente]] |
| Preciso de um documento agora | [[12-Kit-de-templates-copiaveis]] |
| Sinto que não sei o suficiente pra começar | [[19-Plano-de-2-dias-para-desenrolar]] |
| Travo na hora de falar com a equipe ou o PO | [[20-Falar-como-dev]] |
| A tela não mostra o dado da API | [[21-Front-end-e-integracao-sem-se-perder]] |
| A equipe não decide a tecnologia | [[18-Escolhendo-a-stack]] |
| Pediram C4, ADR ou spike | [[15-Arquitetura-C4-ADR-riscos-e-spikes]] |
| O Quality Gate é hoje | [[16-Qualidade-DoD-e-Quality-Gate]] |
| A defesa ou o seminário está chegando | [[17-Defesa-aceite-e-handover]] |
| Git deu errado | [[05-Git-e-GitHub-em-equipe-no-NES]] e [[01-Git-e-GitHub]] |
| O projeto não roda | [[03-Projeto-herdado-entrar-num-codigo-que-nao-e-seu]] |

---

> Próximo: [[14-Do-plano-de-ensino-ao-artefato]]. Volte ao [[00-Indice]] quando precisar.
