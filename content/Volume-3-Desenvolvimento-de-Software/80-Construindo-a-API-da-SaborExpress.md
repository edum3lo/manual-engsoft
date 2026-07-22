---
title: '80 - Construindo a API da SaborExpress ⭐'
---

# Capítulo 80 — Construindo a API da SaborExpress ⭐

> **Volume 3 — Desenvolvimento de Software** · Módulo 23 — Back-end
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- **Juntar** tudo do Volume 3: banco, back-end e API numa aplicação de ponta a ponta.
- Acompanhar uma **requisição real** atravessando todas as camadas — do toque na tela ao banco e de volta.
- Entender como se **projeta** uma API a partir dos requisitos (recursos, endpoints, dados).
- Ver, num exemplo concreto, como **front, API, regras, banco e segurança** se encaixam.
- Consolidar a visão de que um sistema é a **soma coordenada** dessas partes, não peças soltas.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário-avançado (4/5).** É um capítulo de síntese: reúne quase tudo do Volume 3.

---

## ✅ Pré-requisitos

- Ter lido o Módulo 23 até aqui: [[79-O-que-roda-no-servidor-linguagens-e-frameworks]].
- Ter lido o Módulo 21 (APIs): [[72-O-que-e-uma-API-HTTP-REST-e-JSON]], [[73-Autenticacao-e-autorizacao]], [[75-Documentar-e-testar-APIs]].
- Ter lido o Módulo 20 (Banco): [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]], [[68-SQL-na-pratica]], [[71-Confiabilidade-e-escala-do-banco]].
- Ajuda ter lido [[58-MVC-camadas-e-separacao-de-responsabilidades]] e [[78-Ligando-front-end-a-experiencia-do-usuario]].

---

## 📖 Introdução

Este é um **capítulo de síntese** ⭐. Até agora você aprendeu as peças **separadas** do desenvolvimento: o front-end que mostra as telas, a API que transporta dados, o back-end com a lógica, o banco que guarda tudo, a segurança que protege. Neste capítulo, **juntamos todas** numa única aplicação: vamos **construir (no papel) a API da SaborExpress** de ponta a ponta e seguir uma requisição real atravessando cada camada. É o momento em que os conceitos deixam de ser tópicos isolados e viram um **sistema vivo e coordenado**.

Por que isso importa tanto? Porque a maior dificuldade de quem está aprendendo não é entender cada peça — é entender **como elas se conectam**. Você sabe o que é uma API, o que é um banco, o que é um controller; mas o "clique" de engenharia acontece quando você consegue **traçar o caminho completo**: o cliente toca "finalizar pedido" na tela → o front dispara uma requisição HTTP → a API a recebe → o back valida quem é o usuário → aplica as regras de negócio → grava no banco dentro de uma transação → devolve a resposta → o front atualiza a tela. Ver esse fluxo **inteiro**, com as peças se encaixando, é o objetivo central aqui.

Vamos também mostrar como se **projeta** uma API antes de codar: partir dos requisitos ([[46-O-que-sao-requisitos]]) e das histórias de usuário ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]), identificar os **recursos** (restaurantes, pedidos, usuários), desenhar os **endpoints**, modelar os **dados** ([[69-Modelagem-de-dados-e-normalizacao]]). Ao final, você terá em mente uma aplicação completa e a capacidade de raciocinar sobre qualquer sistema web como um **todo integrado** — a habilidade que separa quem "sabe as partes" de quem "entende sistemas". Este capítulo fecha o Módulo 23 e prepara o terreno para os testes (Módulo 24), que garantem que tudo isso funcione de verdade.

---

## 🧠 Analogia

Pense na SaborExpress como uma **orquestra tocando uma sinfonia**, e este capítulo como o momento em que todos os instrumentos tocam **juntos** pela primeira vez.

Nos capítulos anteriores, você conheceu cada **instrumento** separadamente: os **violinos** (o front-end, a parte que o público vê e ouve), os **metais** (a API, que projeta o som ao longe), a **percussão** (as regras de negócio, que dão o ritmo e a estrutura), o **contrabaixo** (o banco, a fundação grave que sustenta tudo), e o **maestro** (a segurança e a orquestração, garantindo que ninguém entre na hora errada). Cada músico, sozinho, produz um som — mas ainda **não é música**.

A **sinfonia** só acontece quando todos tocam **coordenados**, no tempo certo, seguindo a mesma partitura. Uma **nota** (uma requisição — "finalizar pedido") atravessa a orquestra inteira: começa nos violinos (o toque na tela), passa pelos metais (a API), é estruturada pela percussão (as regras), sustentada pelo contrabaixo (o banco), tudo sob o maestro (a segurança) — e volta como **música** (a tela do pedido confirmado). Se **um** instrumento erra o tempo, a sinfonia desafina: uma API mal projetada, uma regra no lugar errado, uma transação esquecida, e o sistema "toca errado".

Este capítulo é o **ensaio geral** onde você ouve a orquestra inteira. E a lição é: um sistema não é a soma de peças tocando isoladas — é a **coordenação** entre elas. Aprender cada instrumento é necessário; reger a orquestra é o que faz de você um engenheiro. Guarde: as partes você já conhece; agora você vê a **sinfonia**.

---

## 🧩 Conceitos fundamentais

### 1. Projetar a API a partir dos requisitos

Antes de codar, você **projeta**. O caminho: dos **requisitos** ([[46-O-que-sao-requisitos]]) e **histórias de usuário** ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) você extrai os **recursos** — os "substantivos" do sistema (restaurantes, pratos, pedidos, usuários). Cada recurso vira um conjunto de **endpoints** ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]), e os dados de cada um viram **tabelas** modeladas ([[69-Modelagem-de-dados-e-normalizacao]]).

> **Termo explicado — recurso (resource):** uma "coisa" que a API expõe (restaurantes, pedidos, usuários); em REST, cada recurso tem endpoints para as operações sobre ele.

### 2. O mapa de endpoints

Para cada recurso, os endpoints REST seguem um padrão previsível ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]):

| Método + rota | O que faz |
|---------------|-----------|
| `GET /restaurantes` | lista restaurantes |
| `GET /restaurantes/:id` | detalhes de um restaurante |
| `GET /restaurantes/:id/pratos` | pratos de um restaurante |
| `POST /pedidos` | cria um pedido |
| `GET /pedidos/:id` | consulta um pedido |
| `POST /auth/login` | autentica e retorna um token |

Esse "mapa" é o **contrato** ([[75-Documentar-e-testar-APIs]]) que front e back combinam — idealmente documentado em OpenAPI/Swagger antes de integrar.

### 3. O modelo de dados por trás

Cada recurso vive em tabelas relacionadas ([[67-O-que-e-um-banco-de-dados-o-modelo-relacional]], [[69-Modelagem-de-dados-e-normalizacao]]):
`usuarios`, `restaurantes`, `pratos` (cada prato pertence a um restaurante — chave estrangeira), `pedidos` (cada pedido pertence a um usuário e a um restaurante), `itens_pedido` (cada item liga um pedido a um prato, com quantidade). Modelagem normalizada, sem dados duplicados.

### 4. As camadas que a requisição atravessa

Toda requisição passa pelas mesmas camadas ([[58-MVC-camadas-e-separacao-de-responsabilidades]], [[79-O-que-roda-no-servidor-linguagens-e-frameworks]]):

**Front → HTTP/API → Rota → Middleware de auth → Controller → Service (regras) → Repositório/ORM → Banco** — e a resposta volta pelo caminho inverso. Cada camada tem **uma** responsabilidade; juntas, formam o fluxo completo.

> **Termo explicado — middleware:** código que intercepta a requisição **antes** de chegar ao controller, para tarefas transversais como verificar o token de autenticação, registrar logs ou validar formato.

### 5. O fluxo de ponta a ponta (o coração do capítulo)

A ideia central: uma requisição é uma **jornada completa** por todas as camadas. Dominar o desenvolvimento é conseguir **narrar essa jornada** para qualquer funcionalidade — saber, para "finalizar pedido", exatamente por onde os dados passam, o que cada camada faz, e como a resposta retorna e vira tela ([[78-Ligando-front-end-a-experiencia-do-usuario]]). É a visão de **sistema**, não de peça.

---

## ⚙️ Como funciona na prática

Vamos **construir** e depois **percorrer** a API, do projeto ao fluxo completo.

**Passo 1 — Do requisito ao recurso.** A história "*como cliente, quero finalizar meu pedido para recebê-lo em casa*" ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) revela o recurso **pedido** e a operação **criar pedido** → endpoint `POST /pedidos`. Os critérios de aceitação ("o total deve incluir a taxa de entrega", "só usuários logados podem pedir") viram **regras de negócio** e **checagens de segurança** no back.

**Passo 2 — Projetar o endpoint.** Define-se o **contrato**: `POST /pedidos` recebe um JSON `{ restauranteId, itens: [{ pratoId, quantidade }], enderecoId }` e o token de auth no cabeçalho; responde `201 Created` com o pedido criado (id, total, status) ou erros (`400` dados inválidos, `401` não autenticado, `409` item indisponível). Isso é documentado ([[75-Documentar-e-testar-APIs]]) para o front trabalhar em paralelo.

**Passo 3 — Modelar os dados.** As tabelas `pedidos` e `itens_pedido` são criadas com suas chaves estrangeiras ([[69-Modelagem-de-dados-e-normalizacao]]). Um pedido referencia o usuário e o restaurante; cada item referencia o prato e guarda a quantidade e o **preço no momento da compra** (denormalização deliberada — o preço do prato pode mudar depois, mas o pedido histórico não).

**Passo 4 — Implementar as camadas.** O back ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) ganha: a **rota** `POST /pedidos`; um **middleware de auth** que valida o token JWT ([[73-Autenticacao-e-autorizacao]]) e identifica o usuário; um **controller** que valida o formato do JSON; um **service** com as regras (calcula total, aplica frete, checa disponibilidade e horário); um **repositório/ORM** que grava no banco dentro de uma **transação** ([[71-Confiabilidade-e-escala-do-banco]]).

**Passo 5 — Seguir a requisição de ponta a ponta.** Este é o momento-chave. Acompanhe "finalizar pedido":

1. **Front:** o cliente toca "finalizar"; o front dispara `POST /pedidos` com o JSON e o token, e mostra **carregando** ([[78-Ligando-front-end-a-experiencia-do-usuario]]).
2. **API/rede:** a requisição HTTP ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]) chega ao servidor.
3. **Middleware de auth:** valida o token JWT; se inválido, corta aqui com `401` ([[73-Autenticacao-e-autorizacao]]); se válido, anexa o usuário.
4. **Controller:** extrai e valida o formato do JSON; se malformado, `400`.
5. **Service (regras):** busca os pratos no banco, **recalcula o total** (nunca confia no valor do front!), aplica "frete grátis acima de R$50", verifica que o restaurante está aberto e os itens disponíveis; se um item acabou, `409`.
6. **Repositório + banco:** dentro de uma **transação**, insere o `pedido` e seus `itens_pedido`; se algo falhar no meio, **rollback** (nada é gravado pela metade — [[71-Confiabilidade-e-escala-do-banco]]).
7. **Resposta sobe:** o service retorna o pedido; o controller responde `201 Created` com `{ id, total, status: "recebido" }`.
8. **Front recebe:** troca o carregando pela **tela de acompanhamento** do pedido; se veio erro, mostra a mensagem adequada ([[78-Ligando-front-end-a-experiencia-do-usuario]]).

**Passo 6 — E os outros clientes.** O **mesmo** `POST /pedidos` e os mesmos endpoints servem o app do cliente, o painel do restaurante e o app do entregador ([[75-Documentar-e-testar-APIs]]) — a lógica mora **uma vez** no back. Quando o restaurante muda o status para "saiu para entrega", um `PATCH /pedidos/:id/status` dispara uma atualização em tempo real ([[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]]) para o cliente. A orquestra inteira, tocando junto.

---

## 🍔 Aplicação na SaborExpress

Vamos ver o time inteiro construindo a funcionalidade "finalizar pedido" de ponta a ponta — a sinfonia ensaiada.

**O planejamento conjunto.** No refinamento ([[45-Estimativas-planejamento-e-ferramentas]]), o PO **Bruno** trouxe a história "finalizar pedido" com seus critérios de aceitação ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]). O time desenhou junto o **contrato da API** (`POST /pedidos`, o formato do JSON, os códigos de resposta) e o documentou em Swagger ([[75-Documentar-e-testar-APIs]]). Com o contrato acordado, a front-end **Diego** e a back-end **Camila** puderam trabalhar **em paralelo**, cada um do seu lado do contrato — a vantagem de projetar a API antes de codar.

**Camila constrói o back (as camadas).** Camila implementou ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]): a rota, o **middleware** que valida o JWT ([[73-Autenticacao-e-autorizacao]]), o controller que valida o JSON, e — o coração — o **service** com as regras: recalcular o total no servidor, aplicar o frete grátis, checar disponibilidade e horário. A gravação no banco ela envolveu numa **transação** ([[71-Confiabilidade-e-escala-do-banco]]): o `pedido` e seus `itens_pedido` entram juntos, ou nada entra. Ela documentou uma decisão importante num comentário: guardar o **preço do item no momento da compra**, para o histórico do pedido não mudar se o prato reajustar depois.

**Diego constrói o front (a experiência).** Enquanto isso, Diego, usando o **mesmo contrato**, construiu a tela de finalização com React ([[77-Frameworks-de-front-end]]): o botão que dispara `POST /pedidos`, o estado de **carregando** enquanto espera, a **tela de acompanhamento** no sucesso, e o tratamento de **erro** e de **item indisponível** (`409` → "Um item saiu do cardápio, revise seu pedido") — os estados que aprendeu no [[78-Ligando-front-end-a-experiencia-do-usuario]]. Ele validou o formulário no front por UX, sabendo que a validação **de verdade** era a de Camila no back.

**O ensaio geral (o fluxo real).** Quando integraram, seguiram uma compra real da persona João:
1. João toca "finalizar" → tela mostra carregando.
2. `POST /pedidos` chega com token e itens.
3. Middleware valida o JWT de João — ok.
4. Controller valida o JSON — ok.
5. Service busca os pratos, **recalcula** o total (R$47 + R$8 de frete = R$55; acima de R$50, **frete grátis** → R$47), confere que a Pizzaria da Ana ([[50-Fundamentos-de-UX-e-pesquisa-com-usuarios]]) está aberta e as pizzas disponíveis — ok.
6. Transação insere o pedido #1234 e seus itens — commit.
7. Responde `201` com `{ id: 1234, total: 47, status: "recebido" }`.
8. Front de João troca para a tela de acompanhamento do pedido #1234.

**O momento em que a segurança provou seu valor.** Na QA, **Bia** testou adulterar a requisição, mudando o total para **R$1** no JSON (simulando um cliente mal-intencionado — [[73-Autenticacao-e-autorizacao]]). O back **ignorou** o valor enviado e recalculou R$47 a partir do banco — a fraude falhou. Foi a prova viva de que "o back nunca confia no front" ([[79-O-que-roda-no-servidor-linguagens-e-frameworks]]): a regra que parecia teórica salvou a receita da empresa.

**O mesmo endpoint, três apps.** O mesmo `POST /pedidos` e o `GET /pedidos/:id` alimentaram os três clientes ([[75-Documentar-e-testar-APIs]]): o app de João, o painel do Sr. Alberto (dono do restaurante, que vê o pedido chegar) e o app do entregador. Quando o Sr. Alberto marcou "saiu para entrega", um `PATCH` disparou uma atualização em **tempo real** ([[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]]) ao celular de João. Uma lógica, muitos clientes — a orquestra inteira em harmonia.

Moral: a funcionalidade "finalizar pedido" não é uma peça — é a **sinfonia** do Volume 3 tocando junta. Requisitos viraram um contrato de API; o contrato deixou front e back trabalharem em paralelo; a requisição atravessou auth, validação, regras, transação e banco, e voltou como tela; a segurança recusou a fraude; e um só back serviu três apps. Ver esse fluxo **inteiro** é entender o que é, de fato, desenvolver software.

---

## 🏢 Como isso acontece em uma empresa

- **O contrato da API vem antes do código.** Times maduros acordam e documentam o contrato (OpenAPI/Swagger — [[75-Documentar-e-testar-APIs]]) antes de implementar, permitindo que front e back trabalhem **em paralelo** — ganho enorme de velocidade.
- **"Pensar em fluxo" é habilidade sênior.** Conseguir traçar uma requisição por todas as camadas — e saber onde algo quebrou quando um bug aparece — é o que distingue o engenheiro do "programador de tarefas". Entrevistas de sistema testam exatamente isso.
- **A segurança no back é inegociável.** Recalcular preços, revalidar permissões, nunca confiar no cliente — empresas que ignoram isso sofrem fraudes reais. É a lição mais cara de aprender em produção.
- **Transações protegem a integridade do dinheiro.** Pedidos, pagamentos e estoque quase sempre envolvem transações ([[71-Confiabilidade-e-escala-do-banco]]) — gravar pela metade num sistema de e-commerce é perda financeira direta.
- **Uma API, muitos clientes.** Web, iOS, Android, painéis parceiros, integrações — todos consomem a mesma API. É por isso que a lógica **precisa** morar centralizada no back, nunca duplicada.
- **Observabilidade fecha o ciclo.** Em produção, cada camada dessa jornada é monitorada (logs, métricas, tempo de resposta, erros) para diagnosticar problemas — o fluxo que você projeta é o fluxo que você observa (Volume 4).
- **Este fluxo é o "hello world" real do back-end.** Toda aplicação web séria é, no fundo, variações dessa mesma jornada request→auth→regras→dados→response. Dominá-la é dominar o essencial do desenvolvimento web.

---

## ⚠️ Erros comuns

- **Não projetar antes de codar.** Sair implementando sem definir recursos, endpoints e o contrato gera APIs inconsistentes e retrabalho, e impede o trabalho paralelo de front e back.
- **Confiar em valores enviados pelo front.** Aceitar o total, o preço ou as permissões que vieram na requisição. O back **precisa** recalcular e revalidar ([[73-Autenticacao-e-autorizacao]]) — a falha que gera fraudes.
- **Esquecer a transação.** Gravar o pedido e os itens sem transação; se falhar no meio, sobra um pedido corrompido ([[71-Confiabilidade-e-escala-do-banco]]).
- **Misturar as camadas.** Enfiar regra de negócio no controller, ou SQL na rota. Perde-se a testabilidade e a clareza ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- **Códigos de status errados.** Responder `200` para tudo, mesmo em erro; ou `500` para um input inválido do usuário (que é `400`). O status é parte do contrato ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]).
- **Não pensar no fluxo inteiro.** Focar só na "sua" camada e ignorar como a requisição chega e a resposta é usada. Bugs de integração nascem nas fronteiras entre camadas.
- **Duplicar lógica em cada cliente.** Repetir o cálculo do total no app iOS, no Android e na web em vez de centralizá-lo no back. Vira inconsistência garantida.
- **Ignorar os estados de erro no front.** Construir só o caminho feliz da tela de pedido e não tratar `409` (item indisponível) ou falhas ([[78-Ligando-front-end-a-experiencia-do-usuario]]).

---

## 💡 Dicas profissionais

- **Aprenda a narrar o fluxo completo.** Para qualquer funcionalidade, treine descrever a jornada da requisição por todas as camadas. Essa é a habilidade de "pensar em sistemas" que define um engenheiro.
- **Projete o contrato da API primeiro.** Recursos, endpoints, formatos, códigos de resposta — documentados ([[75-Documentar-e-testar-APIs]]) antes de codar. Libera o trabalho paralelo e evita retrabalho.
- **Recalcule tudo que importa no back.** Preços, totais, permissões. Nunca confie no que o front enviou. Faça disso um reflexo.
- **Envolva operações compostas em transações.** Pedido + itens + estoque juntos, tudo-ou-nada ([[71-Confiabilidade-e-escala-do-banco]]).
- **Respeite as camadas.** Rota roteia, controller valida e orquestra, service tem as regras, repositório fala com o banco. Cada uma com sua responsabilidade ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- **Use os status HTTP como linguagem.** `201` criado, `400` input inválido, `401` não autenticado, `403` sem permissão, `404` não achou, `409` conflito. Falam por si ([[72-O-que-e-uma-API-HTTP-REST-e-JSON]]).
- **Centralize a lógica no back.** Uma regra, um lugar, muitos clientes. Nunca duplique entre apps.
- **Guarde dados históricos quando fizer sentido.** O preço no momento da compra, o endereço no momento da entrega — o histórico não deve mudar quando o cadastro muda.

---

## 🎈 Curiosidades

- A frase **"o back nunca confia no cliente"** é tão fundamental que tem um nome no mundo da segurança: **"never trust user input"** (nunca confie na entrada do usuário). Uma fração enorme de todas as vulnerabilidades de software — injeção de SQL, adulteração de preço, escalação de privilégio — vem de violar essa única regra.
- O padrão de **projetar a API antes de codar** ganhou o nome de **"API-first"** (API em primeiro lugar) e virou estratégia de empresas inteiras. A **Amazon** é lendária por isso: por volta de 2002, Jeff Bezos teria emitido um memorando obrigando **todos** os times a se comunicarem exclusivamente por APIs — uma decisão que, anos depois, tornou possível transformar a infraestrutura interna na **AWS**, hoje um negócio de bilhões.
- A tabela `itens_pedido` que guarda o **preço no momento da compra** é um exemplo do conceito de **"snapshot" (fotografia) de dados**: sistemas financeiros e de e-commerce quase sempre "congelam" valores no instante da transação, porque mudar o histórico retroativamente seria um desastre contábil (e muitas vezes ilegal).
- A jornada request→resposta que você seguiu neste capítulo acontece, em apps grandes, **bilhões de vezes por dia** — e em uma fração de segundo cada. O que num diagrama parece uma sequência tranquila de passos é, em produção, uma coreografia executada em **milissegundos**, milhões de vezes em paralelo.
- Existe um exercício clássico em entrevistas de engenharia: **"o que acontece quando você digita uma URL e aperta Enter?"**. A resposta completa percorre DNS, HTTP, servidores, back-end, banco e resposta — exatamente o tipo de "pensar em fluxo de ponta a ponta" que este capítulo treina.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Recurso (resource)** | Uma "coisa" que a API expõe (restaurantes, pedidos, usuários). |
| **Endpoint** | Método HTTP + rota que realiza uma operação sobre um recurso. |
| **Contrato da API** | O acordo (formato, endpoints, respostas) entre front e back. |
| **API-first** | Projetar e documentar a API antes de implementar. |
| **Middleware** | Código que intercepta a requisição antes do controller (ex.: valida token). |
| **Fluxo de ponta a ponta** | A jornada da requisição por todas as camadas, e a volta. |
| **Transação** | Conjunto de operações no banco que acontece tudo-ou-nada. |
| **Snapshot de dados** | "Congelar" um valor no momento (ex.: preço na hora da compra). |
| **Never trust user input** | Nunca confiar em dados vindos do cliente; revalidar no back. |
| **Recalcular no back** | Refazer no servidor os cálculos que o front mostrou (preço, total). |

---

## 📝 Resumo

- Este capítulo **junta** o Volume 3: banco + back-end + API + front + segurança numa aplicação **de ponta a ponta**. Um sistema não é a soma de peças isoladas — é a **coordenação** entre elas (a sinfonia da orquestra).
- **Projeta-se antes de codar:** dos requisitos e histórias ([[46-O-que-sao-requisitos]], [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]) vêm os **recursos**; deles, os **endpoints** e o **contrato** ([[75-Documentar-e-testar-APIs]]); e o **modelo de dados** ([[69-Modelagem-de-dados-e-normalizacao]]). O contrato permite front e back trabalharem **em paralelo**.
- Toda requisição atravessa as **mesmas camadas**: front → API → rota → middleware de auth → controller → service (regras) → repositório/ORM → banco — e a resposta volta. Cada camada, uma responsabilidade ([[58-MVC-camadas-e-separacao-de-responsabilidades]]).
- No fluxo de "finalizar pedido", os princípios se provam: o back **recalcula o total** (nunca confia no front — recusou a fraude do total forjado), a gravação usa **transação** (tudo-ou-nada), e os status HTTP comunicam o resultado. Uma lógica central serve **muitos clientes**.
- A habilidade-chave que fica: **narrar o fluxo completo** de qualquer funcionalidade, vendo as peças se encaixarem. É a visão de **sistema** que distingue quem "sabe as partes" de quem "entende desenvolvimento". Agora, o Módulo 24 garante que tudo isso funcione: os **testes**.

---

## ☑️ Checklist de aprendizado

- [ ] Sei projetar uma API partindo de requisitos (recursos → endpoints → dados).
- [ ] Narro a jornada completa de uma requisição por todas as camadas.
- [ ] Entendo o papel de cada camada (rota, middleware, controller, service, dados).
- [ ] Explico por que o back recalcula valores e nunca confia no front.
- [ ] Sei por que operações compostas usam transações.
- [ ] Enxergo o sistema como partes coordenadas, não peças soltas.

---

## ✏️ Exercícios

**1.** Com a analogia da orquestra, explique por que "um sistema não é a soma de peças isoladas, mas a coordenação entre elas".

**2.** Partindo da história "como cliente, quero ver os pratos de um restaurante", identifique o **recurso**, proponha o **endpoint** e diga quais **tabelas** ele consulta.

**3.** Narre, passo a passo, a jornada da requisição `POST /pedidos` desde o toque na tela até a tela de acompanhamento, citando o que cada camada faz.

**4.** Na QA, Bia adulterou o total do pedido para R$1. Por que a fraude falhou? Que princípio isso demonstra e onde ele foi aplicado?

**5. (Reflexão)** Por que projetar o **contrato da API antes de codar** permitiu que Diego (front) e Camila (back) trabalhassem em paralelo? Que vantagem isso traz, e como se conecta com documentar APIs ([[75-Documentar-e-testar-APIs]])?

---

## 💬 Respostas comentadas

**1.** Numa orquestra, cada instrumento — violinos (front-end), metais (API), percussão (regras de negócio), contrabaixo (banco), maestro (segurança) — produz som sozinho, mas isso **ainda não é música**. A **sinfonia** só existe quando todos tocam **coordenados**, no tempo certo, seguindo a mesma partitura: uma nota (uma requisição) atravessa a orquestra inteira e volta como música (a tela pronta). Se **um** instrumento erra o tempo — uma API mal projetada, uma regra no lugar errado, uma transação esquecida — a sinfonia desafina. Um sistema é igual: conhecer cada peça (cada instrumento) é necessário, mas o que faz o sistema **funcionar** é a **coordenação** entre elas — os dados fluindo na ordem certa, cada camada fazendo sua parte no tempo certo. Por isso a habilidade central não é saber as peças, é **reger a orquestra**: enxergar e coordenar o todo.

**2.** O **recurso** é o **prato** (ou "os pratos de um restaurante"). O **endpoint** natural em REST é `GET /restaurantes/:id/pratos` (os pratos que pertencem ao restaurante de id `:id`) — método GET porque é uma leitura. As **tabelas** consultadas: principalmente `pratos` (filtrando pela chave estrangeira `restaurante_id = :id`), e possivelmente um join com `restaurantes` para confirmar que o restaurante existe e está ativo. A resposta seria um JSON com a lista de pratos (nome, descrição, preço, disponibilidade) daquele restaurante.

**3.** (1) **Front:** João toca "finalizar"; o front dispara `POST /pedidos` com o JSON dos itens e o token, e mostra carregando. (2) **API/rede:** a requisição HTTP chega ao servidor. (3) **Middleware de auth:** valida o token JWT — se inválido, corta com `401`; se válido, identifica João. (4) **Controller:** valida o formato do JSON — se malformado, `400`. (5) **Service (regras):** busca os pratos no banco, **recalcula o total**, aplica frete grátis, confere que o restaurante está aberto e os itens disponíveis — se um item acabou, `409`. (6) **Repositório + banco:** dentro de uma **transação**, insere o pedido e seus itens; se falhar no meio, rollback (nada gravado pela metade). (7) **Resposta:** o service retorna o pedido, o controller responde `201 Created` com id, total e status. (8) **Front:** troca o carregando pela tela de acompanhamento do pedido; se veio erro, mostra a mensagem adequada. Cada camada fez **uma** coisa, e juntas formaram o fluxo completo.

**4.** A fraude falhou porque o **back-end ignorou o total enviado na requisição** e o **recalculou do zero** a partir dos preços reais dos pratos no banco (R$47), desprezando o R$1 forjado por Bia. Isso demonstra o princípio **"o back nunca confia no cliente" / "never trust user input"**: como o front é enviado ao dispositivo do usuário e pode ser inspecionado e adulterado, **nada** que importe (preço, total, permissões) pode depender do valor que veio do front — o servidor precisa revalidar e recalcular tudo por conta própria. O princípio foi aplicado na camada de **service** do back, onde a regra de negócio recalcula o total a partir da fonte da verdade (o banco), em vez de aceitar o número que chegou na requisição. Foi a prova de que essa regra "teórica" protege a receita real da empresa.

**5.** Projetar o **contrato da API antes de codar** significa acordar de antemão o formato exato da comunicação: quais endpoints existem, qual JSON a requisição envia, qual JSON e quais códigos de status a resposta retorna. Com esse contrato **combinado e documentado**, Diego e Camila não precisaram esperar um pelo outro: Diego construiu a tela do front tratando a resposta que o contrato **prometia** (mesmo antes de o back estar pronto, ele podia simular a resposta), e Camila construiu o back para **cumprir** exatamente esse contrato — cada um do seu lado da "fronteira" acordada. A vantagem é **velocidade** (trabalho paralelo em vez de sequencial) e **menos retrabalho** (menos surpresas na integração, porque ambos seguiram o mesmo acordo). Conecta-se diretamente com documentar APIs ([[75-Documentar-e-testar-APIs]]): o contrato vive num documento OpenAPI/Swagger que é a **fonte de verdade** compartilhada — a mesma prática que permite terceiros e outros times consumirem a API com autonomia.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[79-O-que-roda-no-servidor-linguagens-e-frameworks]] — o back-end que este capítulo põe em ação.
- **Próximo (linear):** [[81-Por-que-testar-tipos-de-teste-e-a-piramide]] — garantir que toda essa orquestra funcione de verdade.
- **Junta tudo:** [[72-O-que-e-uma-API-HTTP-REST-e-JSON]], [[73-Autenticacao-e-autorizacao]], [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]], [[71-Confiabilidade-e-escala-do-banco]], [[58-MVC-camadas-e-separacao-de-responsabilidades]], [[78-Ligando-front-end-a-experiencia-do-usuario]].
- **Origem:** [[46-O-que-sao-requisitos]] e [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]] — de onde nasce o que a API precisa fazer.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 23 → **Capítulo 80 de 119**.
