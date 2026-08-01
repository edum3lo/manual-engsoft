---
title: '20 - Falar como dev: vocabulário e roteiros'
---

# 20. Falar como dev: vocabulário e roteiros

> Manual do NES · Volume 7. Como falar na daily, na reunião com o PO e no grupo da equipe sem se enrolar. Vocabulário com o significado exato, frases prontas, e o roteiro para a pergunta que mais dá nó: "em que você é bom?".

---

## 🔑 A ideia central

Comunicação técnica não é falar difícil. É **ser específico**. A diferença entre parecer perdido e parecer competente quase sempre está em trocar uma frase vaga por uma frase concreta:

| Vago (soa inseguro) | Específico (soa profissional) |
|---|---|
| "não tá funcionando" | "o POST /consultas está retornando 500 quando o campo data vem vazio" |
| "tô mexendo no front" | "estou na issue #14, ligando a tela de cadastro ao endpoint de criação" |
| "acho que tá quase" | "faltam os estados de erro; o caminho feliz já funciona" |
| "deu erro no banco" | "a migração falhou porque a coluna cpf já existe" |
| "não sei fazer isso" | "nunca fiz integração com upload; consigo pegar se alguém pareá comigo na primeira hora" |

⚠️ Note que nenhuma das frases da direita usa palavra difícil. Elas usam **o nome exato da coisa** e **o que exatamente aconteceu**. É isso que se aprende aqui.

---

## 📚 As 40 palavras que aparecem toda hora

Cada uma com uma frase de uso correto, para você ouvir e usar sem dúvida.

### O sistema

| Termo | O que é | Frase de uso |
|---|---|---|
| **Front-end** | O que roda no navegador do usuário | "Isso é ajuste de front, não precisa mexer na API." |
| **Back-end** | O que roda no servidor: regras, validação, acesso ao banco | "A validação de CPF tem que estar no back também." |
| **API** | A porta de entrada do back, por onde o front pede coisas | "A API já tem o endpoint de listagem." |
| **Endpoint** | Um endereço específico da API | "O endpoint é POST /api/consultas." |
| **Rota** | Praticamente sinônimo de endpoint, do lado do código | "Criei a rota de cancelamento." |
| **Requisição (request)** | O pedido que o front manda | "A requisição está indo sem o token." |
| **Resposta (response)** | O que o servidor devolve | "A resposta vem com 15 itens." |
| **Payload / corpo (body)** | Os dados que vão dentro do pedido ou da resposta | "O corpo da requisição está vazio." |
| **JSON** | Formato de texto para trocar dados | "A API responde em JSON." |
| **Header** | Informação extra da requisição (tipo de conteúdo, token) | "Faltou o header de autorização." |
| **Status code** | Número que diz como foi (200, 400, 500) | "Está retornando 401, então é autenticação." |
| **CRUD** | Criar, ler, atualizar, apagar | "Essa tela é um CRUD simples de pacientes." |

### Os dados

| Termo | O que é | Frase de uso |
|---|---|---|
| **Banco de dados** | Onde os dados ficam guardados | "Isso precisa ser salvo no banco, não só no estado da tela." |
| **Tabela / coluna / registro** | Planilha / campo / linha | "A tabela consultas não tem coluna de observação." |
| **Chave primária (PK)** | O id único de cada registro | "A chave primária é o id, gerado pelo banco." |
| **Chave estrangeira (FK)** | Coluna que aponta para outra tabela | "consultas.paciente_id é FK para pacientes.id." |
| **Query** | Uma consulta escrita em SQL | "A query está trazendo duplicado por causa do join." |
| **Migração (migration)** | Script que altera a estrutura do banco de forma versionada | "Rodei a migração e a coluna apareceu." |
| **Seed** | Dados de exemplo para popular o banco | "Vou criar um seed com 10 pacientes pra demo." |
| **ORM** | Biblioteca que traduz objetos do código em SQL | "O ORM já monta o join, não precisa escrever na mão." |

### O trabalho

| Termo | O que é | Frase de uso |
|---|---|---|
| **Repositório (repo)** | O projeto versionado no GitHub | "Está no repo, na branch feat/14." |
| **Branch** | Linha paralela de trabalho | "Criei a branch a partir da main atualizada." |
| **Commit** | Um ponto salvo no histórico | "Fiz três commits pequenos em vez de um gigante." |
| **Push / pull** | Enviar / trazer do GitHub | "Dei push, pode puxar." |
| **Pull Request (PR)** | Pedido de revisão e integração da sua branch | "Abri o PR #23, falta review." |
| **Merge** | Juntar sua branch na principal | "Depois do merge, a main já tem isso." |
| **Conflito** | Duas pessoas mexeram na mesma linha | "Deu conflito no Login.jsx, resolvo hoje." |
| **Revert** | Desfazer com um novo commit | "Revertei o commit que quebrou a main." |
| **Issue** | Uma tarefa registrada | "Isso já é a issue #31." |
| **Backlog** | Lista priorizada do que falta | "Isso entra no backlog, não nesta sprint." |
| **Refinamento** | Detalhar itens do topo do backlog | "Levo pro refinamento de quinta." |

### Rodar e publicar

| Termo | O que é | Frase de uso |
|---|---|---|
| **Ambiente** | Onde o sistema está rodando | "Funciona no meu ambiente local, vou testar no de homologação." |
| **Local** | Na sua máquina | "Local está ok, o problema aparece só publicado." |
| **Homologação (staging)** | Cópia parecida com produção, para validar antes de liberar | "Subi em homologação pro PO testar." |
| **Produção (prod)** | O ambiente real, que os usuários usam | "Isso é produção, não dá pra testar direto lá." |
| **Deploy** | Publicar uma versão em um ambiente | "O deploy quebrou por falta de variável de ambiente." |
| **Build** | Empacotar o código para rodar | "O build do front falhou por erro de importação." |
| **Variável de ambiente (.env)** | Configuração que muda por ambiente (URL, senha) | "A URL da API vem de variável de ambiente." |
| **CI** | Automação que roda testes a cada PR | "O CI está vermelho, não dá pra fazer merge." |
| **Log** | Registro do que aconteceu no servidor | "Olhei o log e a exceção é de conexão com o banco." |
| **Rollback** | Voltar para a versão anterior | "Se der ruim na demo, a gente faz rollback." |

💡 Você não precisa decorar. Precisa **reconhecer**. Deixe esta tabela aberta durante a daily nas primeiras semanas.

---

## 🗣️ Sua apresentação de 30 segundos

Escreva a sua agora, no formato: quem você é + o que já faz + o que quer aprender + o que oferece.

> *"Sou o Eduardo, oitavo semestre. Me identifico mais com front-end, já fiz telas em React e HTML/CSS, e gosto de organização e documentação. O que eu quero desenvolver nesta disciplina é integração com API e banco. Posso pegar as telas e ajudar com a documentação e as atas, e queria pegar as primeiras integrações em par com alguém."*

Por que isso funciona: você disse o que sabe, admitiu um gap sem se diminuir, e ofereceu algo concreto. Ninguém sai dessa conversa achando que você é fraco. Saem sabendo onde te encaixar, que é o que a equipe precisa no dia 1.

⚠️ O que evitar: *"eu não sei nada, sou meio perdido, vou fazendo o que der"*. Isso não é humildade, é falta de informação para o time. E te coloca como último a ser lembrado quando aparecer tarefa boa.

---

## 🎯 "Em que você é bom?"

A pergunta que te preocupa. Três verdades antes do roteiro:

1. **Ninguém está esperando "sou ótimo em arquitetura distribuída".** Estão tentando dividir tarefa.
2. **Habilidade não técnica conta e é escassa.** Equipe que tem alguém que escreve ata, organiza board, cobra prazo e prepara demo vale ouro, e quase ninguém quer fazer.
3. **A resposta boa tem duas partes**: o que você entrega hoje + o que você está construindo.

Três versões, escolha a que combina com você:

🗣️ **Versão direta**
> *"Hoje eu sou mais forte em front-end: construir tela, componente, layout. Também sou bom em organizar as coisas: documentação, ata, board. O que eu não domino ainda é integração e banco, e é exatamente o que quero pegar nesta disciplina, de preferência em par nas primeiras vezes."*

🗣️ **Versão que oferece valor imediato**
> *"Posso começar pelas telas e por deixar o repositório e a documentação organizados, que é uma coisa que ninguém gosta de fazer e faz falta na avaliação. Enquanto isso, quero pegar uma integração por sprint pra evoluir nisso."*

🗣️ **Versão honesta quando não tem o que inventar**
> *"Sinceramente, minha base é mais fraca do que eu queria; sempre programei muito apoiado em IA. O que eu tenho de bom é que apareço, entrego o que combino e não sumo. Quero começar pegando tarefas menores e ir subindo o nível a cada sprint."*

Essa terceira é mais forte do que parece. Confiabilidade é a qualidade número 1 que se procura num colega de equipe, acima de talento técnico. Quem diz isso e cumpre vira referência no time por volta da sprint 2.

⚠️ **O que nunca fazer:** dizer que sabe algo que não sabe. Vai aparecer em 3 dias, na primeira tarefa, e aí o problema deixa de ser técnico e vira de confiança.

---

## 📆 A daily: modelo de 3 linhas

```
✅ Ontem: terminei a listagem de pacientes (PR #23 aberto, esperando review)
🔨 Hoje: começo a tela de cadastro, ligando no POST /pacientes
🚧 Travado: a API está devolvendo 400 e não sei se é o formato da data
```

Regras que resolvem a insegurança:

1. **Fale de tarefa, não de esforço.** "Mexi bastante no projeto" não informa nada. "Terminei X, comecei Y" informa.
2. **Diga o número da issue ou do PR.** Isso ancora a conversa e mostra rastro.
3. **Travado é a linha mais importante.** É por ela que a daily existe.
4. **Não teve avanço? Escreva mesmo assim.** *"Ontem não consegui mexer por causa de prova. Hoje pego a #14 à noite."* Silêncio gera muito mais ruído que dia parado.

---

## 🧰 Frases prontas por situação

| Situação | O que falar |
|---|---|
| Não entendeu o que o colega falou | *"Consegue voltar um passo? Me perdi na parte do <termo>."* |
| Não entendeu um termo | *"O que exatamente vocês chamam de homologação aqui?"* Perguntar termo é normal, inclusive entre seniores, porque time nenhum usa tudo igual |
| Quer pegar tarefa mas tem receio | *"Topo pegar a #14. Nunca fiz integração com upload; alguém faz a primeira meia hora comigo?"* |
| Precisa de mais prazo | *"A #18 não fica pronta até sexta. Cheguei até <ponto>. Prefere que eu continue ou que passe pra alguém?"* |
| Discorda de uma decisão | *"Posso trazer uma preocupação? Fiquei na dúvida se <x> não complica <y>."* |
| Quebrou algo | *"Quebrei a main com o PR #31, já estou revertendo."* |
| Perguntaram algo que você não sabe, na reunião | *"Não sei responder agora. Anoto e trago até amanhã."* |
| Querem te dar tarefa demais | *"Consigo assumir duas dessas nesta sprint. A terceira eu pego na próxima ou alguém divide comigo."* |
| Alguém usou 5 siglas seguidas | *"Deixa eu confirmar se entendi: você quer dizer que <reformula com suas palavras>?"* |

💡 A última é a técnica mais útil deste capítulo: **reformular com as próprias palavras**. Ela te faz entender, corrige mal-entendido na hora e passa a impressão de quem está acompanhando, mesmo quando você está aprendendo o assunto naquele segundo.

---

## 🏛️ Na reunião com o PO: fale de usuário, não de código

O PO não sabe o que é endpoint, e não precisa saber.

| ❌ Não diga | ✅ Diga |
|---|---|
| "Implementei o POST com validação no service" | "Agora dá pra cadastrar o paciente, e o sistema avisa se o CPF estiver errado" |
| "Faltou tratar o retorno 500" | "Se o sistema falhar, hoje a tela trava; vamos colocar uma mensagem clara" |
| "Fizemos o deploy em homologação" | "Colocamos uma versão num link pra você testar antes de valer pra valer" |
| "O JOIN estava trazendo duplicado" | "O relatório estava repetindo linhas, já corrigimos" |

E quando ele perguntar algo técnico, traduza o custo, não o mecanismo:

🗣️ *"Dá pra fazer, sim. Isso mexe no cadastro e no relatório, então estimamos uns 3 dias. Se entrar nesta sprint, algo de tamanho parecido precisa sair. Qual dos dois é mais urgente pra vocês?"*

> Roteiro completo da reunião: [[08-A-reuniao-com-o-proponente]].

---

## 🧪 Como treinar isso em 30 minutos

1. Pegue uma issue qualquer (ou invente) e escreva a daily dela nas 3 linhas.
2. Explique em voz alta, para a parede, o que a sua última tarefa fez, em duas frases, sem usar "coisa", "negócio" ou "não tá funcionando".
3. Pegue um erro real do seu console e escreva o pedido de ajuda no formato de [[11-Quando-voce-nao-sabe-o-que-fazer]].
4. Leia a sua apresentação de 30 segundos em voz alta, três vezes.

Comunicação técnica é habilidade motora, igual dirigir. Não melhora lendo, melhora repetindo em voz alta até a frase sair sem esforço.

---

## ✅ Checklist

- [ ] Tenho minha apresentação de 30 segundos escrita.
- [ ] Tenho minha resposta para "em que você é bom?" escrita e ensaiada.
- [ ] Sei o significado exato de front, back, API, endpoint, deploy, homologação, branch, PR e migração.
- [ ] Sei escrever uma daily em 3 linhas citando issue ou PR.
- [ ] Sei pedir ajuda com contexto, erro e tentativa.
- [ ] Sei traduzir uma frase técnica para a linguagem do PO.
- [ ] Sei dizer "não sei" de um jeito que não me diminui.

---

> Próximo: [[21-Front-end-e-integracao-sem-se-perder]].
