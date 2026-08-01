---
title: '11 - Quando você não sabe o que fazer'
---

# 11. Quando você não sabe o que fazer

> Manual do NES · Volume 7. ⭐ O capítulo para abrir às 23h de uma terça, olhando para o editor sem saber por onde começar, com a sensação de que todo mundo entende menos você.

---

> Se a sua sensação é de base fraca (pouca prática de código, banco ou deploy), comece pelo [[19-Plano-de-2-dias-para-desenrolar]]. Se o nó é falar na daily e nas reuniões, vá para [[20-Falar-como-dev]].

---

## 🧊 Primeiro: o diagnóstico

Travar não é um estado só. São cinco, e cada um tem uma saída diferente:

| Sintoma | Nome real | Saída |
|---|---|---|
| "Não sei nem por onde começar" | Tarefa grande demais | Quebre até caber em 30 minutos |
| "Sei o que fazer, não sei fazer" | Falta de conhecimento pontual | 45 min de estudo dirigido, depois pergunte |
| "Tentei, deu erro, tentei de novo, mesmo erro" | Loop de depuração | Pare, escreva o problema, peça ajuda |
| "Tenho medo de fazer errado e estragar" | Medo, não bloqueio técnico | Branch nova. Não existe estrago irreversível em Git |
| "Não sei se é isso que o cliente quer" | Requisito ambíguo | Pergunte antes de codar, não depois |

Identificar qual dos cinco é já resolve metade. O erro caro é tratar todos como o segundo e "estudar mais um pouquinho" por 4 dias.

---

## 🪓 A técnica do primeiro passo ridículo

Se a tarefa te dá vontade de fugir, ela está grande demais. **Quebre até o próximo passo parecer bobo de tão pequeno.**

Exemplo real, issue "Cadastro de paciente":

```
Cadastro de paciente                          ← paralisa
├── Criar a tabela pacientes                  ← ainda grande
│   ├── Escrever a migração com 3 campos      ← 20 min
│   └── Rodar e conferir no banco             ← 10 min
├── Criar o endpoint POST /pacientes
│   ├── Criar a rota que só responde 201 fixo ← 15 min ✅ COMECE AQUI
│   ├── Ler o corpo da requisição e imprimir  ← 10 min
│   ├── Salvar no banco                       ← 40 min
│   └── Validar campos obrigatórios           ← 30 min
└── Criar o formulário na tela
    ├── Copiar um formulário que já existe    ← 20 min
    ├── Trocar os campos                      ← 20 min
    └── Chamar a API ao enviar                ← 30 min
```

Nenhum desses passos é assustador. E é assim que qualquer engenheiro trabalha, a diferença é que ele faz essa quebra de cabeça, rápido, porque já fez centenas de vezes. Você faz no papel. O resultado é o mesmo.

💡 **Truque:** escolha sempre o primeiro passo que produz algo **visível**, mesmo que falso (uma rota que devolve valor fixo, uma tela com dados chumbados). Ver a coisa funcionando destrava o resto.

---

## ⏱️ A regra do timebox de 45 minutos

Travou de verdade? Cronômetro.

**0 a 45 min: sozinho.**
1. Leia a mensagem de erro **inteira**, do começo ao fim, em voz alta se precisar.
2. Reproduza o problema de forma mínima: qual é o menor comando ou clique que causa isso?
3. Busque a mensagem de erro literal no Google, entre aspas, sem os seus nomes de variável.
4. Confira o óbvio: salvou o arquivo? o servidor reiniciou? é na branch certa? o banco está de pé?
5. Explique o problema em voz alta para uma parede. Sério, funciona ([[07-Checklists-do-dia-a-dia]]).

**Passou de 45 min: peça ajuda.** Não é fracasso, é a política correta em qualquer empresa. Insistir sozinho por 3 dias é que é o erro profissional.

---

## 🆘 Como pedir ajuda de um jeito que gera resposta

Pedido ruim: *"gente, não tá funcionando aqui, alguém ajuda?"* Resposta: silêncio, porque ninguém sabe por onde começar.

Pedido bom, template para colar no grupo:

```
🚧 Travado na issue #23 (cadastro de paciente)

O que eu quero: salvar o paciente ao enviar o formulário
O que eu fiz: criei a rota POST /pacientes em server/src/routes/pacientes.js
O que acontece: retorna 500 e no terminal aparece
    error: null value in column "cpf" violates not-null constraint
O que já tentei:
  - conferi que o front está enviando o campo cpf (vi no Network)
  - imprimi o req.body e ele chega vazio
Minha suspeita: acho que falta algum middleware pra ler JSON, mas não sei qual

Branch: feat/23-cadastro-paciente
```

Isso costuma ser respondido em minutos, e por um motivo simples: você fez o trabalho de pensar. E, com frequência, escrever esse texto **resolve o problema sozinho** antes de você apertar enviar. Isso não é sorte, é o efeito de organizar o pensamento.

> 🗣️ E se for vergonha de perguntar coisa básica: *"Pergunta possivelmente básica, mas prefiro perguntar a travar dois dias: ..."*. Ninguém nunca respondeu mal a isso. E você acabou de dar permissão para os outros perguntarem também.

---

## 🤖 Como usar IA sem virar refém

IA é o melhor tutor 24h que você já teve e a pior muleta possível. A linha que separa:

| ✅ Faça | ❌ Não faça |
|---|---|
| "Me explica o que este erro significa" | "Faz a issue inteira pra mim" |
| "Me dá 3 formas de estruturar isso e os prós e contras" | Colar código que você não entende no PR |
| "Revisa este código meu e aponta problemas" | Deixar a IA decidir a arquitetura do projeto |
| "Me faz perguntas até eu conseguir explicar isso" | Usar como fonte de verdade sem testar |
| "Escreve um teste que prova que isso funciona" | Colar código do proponente ou credenciais no chat ⚠️ |

**O teste honesto, antes de abrir qualquer PR:** *consigo explicar cada linha deste código para um colega, e defender por que está assim?* Se não, você não terminou a tarefa, você terminou a colagem. Volte e entenda, ou peça para a IA te explicar linha a linha.

Isso importa muito no NES por um motivo prático: na reunião ou na avaliação, vão te perguntar por que você fez de um jeito. Não ter resposta é pior do que ter entregue menos.

> Aprofundamento: [[108-Como-usar-IA-corretamente-na-engenharia]], [[04-Como-usar-IA-sem-se-tornar-dependente]] e [[104-IA-para-engenharia-e-uso-responsavel]].

---

## 🎭 Frases prontas para os momentos difíceis

| Situação | O que falar |
|---|---|
| Não entendi nada da explicação técnica do colega | *"Consegue voltar um passo? Eu me perdi na parte do <x>."* |
| Não sei fazer a tarefa que me deram | *"Topo pegar, mas nunca fiz. Alguém faz a primeira meia hora comigo?"* |
| Não vou entregar no prazo | *"Não vou conseguir terminar a #18 até sexta. Consegui fazer até <x>. Prefere que eu continue ou que passe pra alguém?"* (avise no dia que perceber, não no prazo) |
| Perguntaram algo que não sei, na reunião | *"Não sei responder agora, anoto e trago até amanhã."* |
| Discordo de uma decisão técnica | *"Posso trazer uma preocupação? Fiquei na dúvida se <x> não vai complicar <y>. Me convence?"* |
| Fiz merda e quebrei a `main` | *"Pessoal, quebrei a main com o PR #31, já estou revertendo."* Rápido, direto, sem novela. Todo mundo já fez. |
| Sinto que não estou contribuindo | *"Queria pegar algo mais substancial nesta sprint. Tem alguma tarefa que eu possa fazer em par com alguém pra aprender?"* |

---

## 🧠 O plano de estudo paralelo (30 min por dia)

Você não precisa saber tudo antes de começar. Precisa aprender **o que a tarefa da semana exige**, na semana em que ela exige. Estudo just-in-time bate estudo antecipado sempre, porque tem contexto e aplicação imediata.

| Momento da sprint | O que estudar |
|---|---|
| Antes de pegar a tarefa | O suficiente para entender o vocabulário dela |
| Enquanto faz | O específico que travou, na documentação oficial primeiro |
| Depois do PR | Ler o código do colega que fez algo parecido |

💡 **A melhor fonte de aprendizado do NES é o código dos seus colegas.** Ler o PR de quem fez o cadastro te ensina o padrão do projeto melhor que qualquer tutorial. Revisar PR não é favor ao outro, é o seu estudo mais eficiente.

> Como estudar: [[107-Como-aprender-sozinho-estudar-e-pesquisar]] e [[02-Como-estudar-engenharia-de-software]].

---

## 💭 Sobre a sensação de ser uma farsa

Uma coisa concreta, não motivacional: a síndrome do impostor aparece com mais força justamente em quem **percebe** a distância entre o que sabe e o que existe para saber. Quem não percebe essa distância não sente nada. Sentir isso é sinal de percepção, não de incompetência.

E o que resolve não é sentir-se melhor. É acumular evidência:

- Rodei o projeto → evidência.
- Abri um PR que foi integrado → evidência.
- Expliquei uma decisão na reunião → evidência.
- Ajudei um colega a destravar → evidência.

Cinco dessas por sprint e, na sprint 3, o sentimento perde força sozinho. Não porque você virou outra pessoa, mas porque a sua opinião sobre si passa a competir com fatos.

⚠️ E o inverso: ficar 15 dias estudando sem entregar nada **alimenta** a sensação, porque não produz evidência nenhuma. A saída da insegurança é para frente e é pequena.

---

## ✅ Protocolo do travamento (imprima)

1. [ ] Escrevi em uma frase o que estou tentando fazer.
2. [ ] Quebrei em passos até um deles caber em 30 minutos.
3. [ ] Li a mensagem de erro inteira.
4. [ ] Busquei o erro literal na internet.
5. [ ] Timebox de 45 minutos estourou? Escrevi o pedido de ajuda no template.
6. [ ] Postei no grupo, com a branch e o erro.
7. [ ] Enquanto espero, peguei outra tarefa pequena ou revisei um PR.
8. [ ] Quando resolver, escrevi a solução no mesmo tópico. O próximo que travar vai achar.

---

> Próximo: [[12-Kit-de-templates-copiaveis]].
