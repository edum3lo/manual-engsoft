---
title: '46 - O que são requisitos'
---

# Capítulo 46 — O que são requisitos

> **Volume 3 — Desenvolvimento de Software** · Módulo 13 — Engenharia de Requisitos
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Definir o que é um **requisito** e por que ele é a fundação de todo o projeto.
- Distinguir **requisitos funcionais** (o que o sistema faz) de **requisitos não funcionais** (como ele se comporta).
- Reconhecer as categorias de requisitos não funcionais (desempenho, segurança, usabilidade, disponibilidade...) e por que eles são tão fáceis de esquecer e tão caros de ignorar.
- Entender o que é uma **regra de negócio** e como ela se relaciona com os requisitos.
- Perceber por que **erros de requisito** são os mais caros de todos.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[41-Modelos-de-processo-de-desenvolvimento]] — a curva do custo da mudança explica por que requisitos importam tanto.
- Nenhum conhecimento técnico de programação é necessário.

---

## 📖 Introdução

Antes de escrever uma linha de código, alguém precisa responder a uma pergunta aparentemente simples: **"o que exatamente esse software deve fazer?"**. A resposta a essa pergunta são os **requisitos** — e eles são, de longe, a parte mais subestimada e mais decisiva de um projeto.

Estudos clássicos da engenharia de software apontam a mesma coisa há décadas: a maior causa de fracasso de projetos **não é** código ruim, nem tecnologia errada. É **requisito mal entendido** — construir, com capricho, a coisa errada. Você pode ter o melhor time, a arquitetura mais elegante e testes impecáveis, mas se o sistema resolve o problema errado, tudo isso foi desperdiçado. Como diz o ditado da área: *"não adianta subir a escada com perfeição se ela está apoiada na parede errada."*

Requisitos parecem óbvios ("é só perguntar ao cliente o que ele quer"), mas são traiçoeiros. O cliente muitas vezes **não sabe** o que quer, ou sabe e não consegue explicar, ou explica uma coisa e precisa de outra. Além disso, existe uma categoria inteira de requisitos que ninguém pede mas todo mundo espera — os **não funcionais** (que o app seja rápido, seguro, que não caia). Este capítulo é a base do módulo de requisitos: aqui você aprende **o que** é um requisito e os tipos que existem. Os próximos capítulos ensinam **como** descobri-los e escrevê-los.

---

## 🧠 Analogia

Pense em **contratar um arquiteto para construir sua casa**.

Os **requisitos funcionais** são o que a casa **precisa ter**: três quartos, uma suíte, cozinha americana, uma vaga de garagem, um quintal. São coisas que você **lista** e que ou existem ou não existem na planta.

Os **requisitos não funcionais** são **como** a casa precisa ser: que aguente um terremoto de certa magnitude, que seja fresca no verão, que o custo de manutenção seja baixo, que seja acessível para uma cadeira de rodas, que fique pronta em 8 meses. Ninguém "vê" esses requisitos numa foto, mas eles determinam se você vai **viver bem** ou mal na casa.

Agora imagine que você só falou dos quartos e esqueceu de mencionar que precisa aguentar terremoto — e mora numa região sísmica. O arquiteto entrega uma casa linda com três quartos que **desaba no primeiro tremor**. Ele cumpriu os requisitos funcionais e ignorou o não funcional que mais importava. Em software é idêntico: times entregam todas as telas pedidas, mas o sistema **cai** quando chegam mil usuários porque ninguém falou de desempenho. Guarde: **o que o sistema faz** e **como ele se comporta** são dois tipos de requisito, e esquecer o segundo é tão perigoso quanto errar o primeiro.

---

## 🧩 Conceitos fundamentais

### 1. O que é um requisito

Um **requisito** é uma **condição ou capacidade** que o software precisa ter para atender a uma necessidade do usuário ou do negócio. É a descrição de **o que** o sistema deve fazer (ou de **como** deve se comportar), servindo de acordo entre quem pede e quem constrói.

> **Termo explicado — requisito:** uma necessidade que o software deve satisfazer; a descrição do que o sistema deve fazer ou de uma qualidade que ele deve ter.

Requisitos existem em **níveis**: os de **negócio** (por que o projeto existe: "aumentar as vendas em 20%"), os de **usuário** (o que o usuário quer fazer: "encontrar um restaurante perto"), e os de **sistema** (o que o software deve fazer para isso: "filtrar restaurantes por distância"). Todos precisam estar alinhados.

### 2. Requisitos funcionais (RF) — o que o sistema faz

Um **requisito funcional** descreve uma **função/comportamento** do sistema: uma ação que ele executa, uma entrada que processa, uma saída que produz. Responde à pergunta *"o que o sistema deve fazer?"*.

Exemplos:
- "O sistema deve permitir que o cliente adicione itens ao carrinho."
- "O sistema deve enviar um e-mail de confirmação após o pedido."
- "O sistema deve calcular o frete com base no CEP."

> **Termo explicado — requisito funcional:** descreve uma função que o sistema deve executar — uma ação, cálculo ou comportamento observável.

### 3. Requisitos não funcionais (RNF) — como o sistema se comporta

Um **requisito não funcional** descreve uma **qualidade** ou **restrição** do sistema — não *o que* ele faz, mas *quão bem* ele faz. Responde a *"como o sistema deve se comportar?"*. São os mais fáceis de esquecer porque ninguém os "pede" explicitamente, mas os mais capazes de afundar um produto.

As principais categorias (uma lista que vale guardar):

| Categoria | Pergunta que responde | Exemplo |
|---|---|---|
| **Desempenho** | Quão rápido? | "A busca deve responder em menos de 1 segundo." |
| **Escalabilidade** | Quanto aguenta crescer? | "Suportar 10.000 pedidos simultâneos." |
| **Disponibilidade** | Quanto tempo no ar? | "99,9% de uptime (fica fora no máximo ~8h/ano)." |
| **Segurança** | Quão protegido? | "Senhas armazenadas com hash; dados em trânsito por HTTPS." |
| **Usabilidade** | Quão fácil de usar? | "Um novo usuário conclui um pedido sem ajuda." |
| **Acessibilidade** | Serve a todos? | "Compatível com leitores de tela (WCAG AA)." |
| **Confiabilidade** | Quão à prova de falha? | "Nenhum pedido pago pode ser perdido." |
| **Manutenibilidade** | Fácil de evoluir? | "Cobertura de testes mínima de 70%." |
| **Portabilidade** | Roda onde? | "Funciona em Android 8+, iOS 14+ e navegadores modernos." |
| **Conformidade (legal)** | Cumpre a lei? | "Estar em conformidade com a LGPD." |

> **Termo explicado — requisito não funcional:** descreve uma qualidade do sistema (rapidez, segurança, disponibilidade, usabilidade...) ou uma restrição, em vez de uma função específica.

Uma dica de memória: RNFs costumam aparecer como **"-idades"** e **"-ança"** — velocidade, disponibilidade, usabilidade, segurança, confiabilidade.

### 4. Regras de negócio

Uma **regra de negócio** é uma política do **domínio** (do negócio em si), independente de tecnologia, que o sistema precisa respeitar. Exemplo: "frete grátis acima de R$50", "só maiores de 18 podem comprar bebida alcoólica", "cupom não acumula com promoção". As regras de negócio **originam** requisitos funcionais (o sistema precisa *implementá-las*), mas existem mesmo que não houvesse software — são decisões do negócio.

### 5. As qualidades de um bom requisito

Um requisito bem escrito é: **claro** (sem ambiguidade), **completo** (não deixa buracos), **consistente** (não contradiz outro), **verificável** (dá para testar se foi cumprido) e **rastreável** (dá para saber de onde veio e por quê). "O sistema deve ser rápido" é um requisito **ruim** — quão rápido? como medir? "A busca responde em menos de 1s para 95% das requisições" é **bom**: mensurável e verificável.

---

## ⚙️ Como funciona na prática

Requisitos não caem prontos do céu; eles são **descobertos, escritos, priorizados e mantidos** — um trabalho chamado **Engenharia de Requisitos**, que se divide em:

1. **Elicitação** — descobrir os requisitos conversando com clientes e usuários (próximo capítulo, [[47-Elicitacao-personas-e-jornada-do-usuario]]).
2. **Análise** — organizar, resolver conflitos, achar buracos e contradições.
3. **Especificação** — escrever de forma clara (histórias de usuário, casos de uso — [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]).
4. **Validação** — confirmar com o cliente que é isso mesmo, antes de codar.
5. **Gestão** — lidar com as mudanças que virão (e virão).

O segredo profissional está em **separar o funcional do não funcional desde cedo**. Times inexperientes listam só telas e funções ("cadastro, carrinho, pagamento") e descobrem tarde que esqueceram de perguntar: quantos usuários simultâneos? qual tempo de resposta aceitável? o que não pode se perder de jeito nenhum? Esses RNFs **moldam a arquitetura inteira** ([[57-O-que-e-arquitetura-de-software]]) — mudá-los depois de o sistema pronto é caríssimo. É por isso que um bom analista pergunta, para cada função: "e **quão bem** isso precisa funcionar?".

E lembre da lição do [[41-Modelos-de-processo-de-desenvolvimento]]: um erro de requisito descoberto **na fase de requisitos** custa uma conversa; o mesmo erro descoberto **em produção** custa reescrever o sistema. Por isso o tempo investido aqui é o mais barato e mais rentável de todo o projeto.

---

## 🍔 Aplicação na SaborExpress

Quando o Bruno (PO) começou a levantar os requisitos da SaborExpress, ele fez duas listas.

**Requisitos funcionais** (o que o app faz):
- O cliente pode buscar restaurantes por nome e por tipo de comida.
- O cliente pode montar um carrinho e finalizar o pedido.
- O restaurante recebe o pedido e atualiza seu status.
- O sistema calcula o frete pelo endereço de entrega.
- O cliente acompanha o pedido no mapa.

**Requisitos não funcionais** (como o app se comporta) — os que quase esqueceram:
- **Desempenho:** a lista de restaurantes deve carregar em menos de 2 segundos, mesmo no 4G.
- **Disponibilidade:** o app não pode cair no horário de pico (sexta e sábado à noite), quando concentra 60% das vendas.
- **Confiabilidade:** nenhum pedido **pago** pode ser perdido — nem se o servidor reiniciar.
- **Segurança:** dados de pagamento nunca trafegam nem são guardados sem criptografia.
- **Usabilidade:** um cliente de primeira viagem finaliza um pedido sem tutorial.

E as **regras de negócio** que originaram requisitos: "frete grátis acima de R$50", "pedido mínimo de R$15", "cupom de primeira compra não acumula com outra promoção".

Repare no perigo evitado: se o Bruno tivesse listado só o funcional, o time construiria um app bonito que **cairia toda sexta à noite** — exatamente quando mais importa. O RNF de disponibilidade no pico é o que fez o time escolher, lá na frente, uma arquitetura que aguenta carga ([[59-Monolito-vs-Microsservicos]], Volume 4). E o RNF "nenhum pedido pago se perde" é o que exigiu **transações** confiáveis no banco ([[71-Confiabilidade-e-escala-do-banco]]). Os requisitos não funcionais, invisíveis numa tela, foram os que **desenharam a espinha dorsal** do sistema.

---

## 🏢 Como isso acontece em uma empresa

- **Quem cuida dos requisitos:** normalmente o **PO/Product Manager** e, em empresas maiores, o **Analista de Negócios/Requisitos**. Mas todo dev participa: você vai questionar, refinar e às vezes descobrir requisitos escondidos ao implementar.
- **Requisitos viram itens de backlog.** Na prática ágil, eles não moram num documento de 200 páginas, e sim como **histórias de usuário** no Jira ([[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]]), refinadas continuamente.
- **RNFs viram "requisitos transversais" e SLAs.** Metas de desempenho e disponibilidade viram **SLAs/SLOs** (acordos de nível de serviço) monitorados em produção (Volume 4). "99,9% de uptime" deixa de ser texto e vira um número no painel.
- **O não funcional é onde os projetos tropeçam.** É comum a funcionalidade estar pronta e o produto travar por causa de desempenho, segurança ou um pico de carga que ninguém previu. Analistas experientes caçam RNFs desde o primeiro dia.
- **Requisitos mudam — e isso é gerenciado.** Toda mudança de requisito tem impacto em prazo e custo. Times maduros têm um processo leve para avaliar e comunicar esse impacto, em vez de simplesmente "aceitar tudo".
- **Ambiguidade custa caro.** "O sistema deve ser seguro" gera discussões infinitas. Empresas maduras exigem requisitos **verificáveis** justamente para poder testá-los e cobrá-los.

---

## ⚠️ Erros comuns

- **Listar só requisitos funcionais.** Esquecer os não funcionais (desempenho, segurança, disponibilidade) é a causa nº 1 de produtos que "funcionam na demo e caem na vida real".
- **Escrever requisitos vagos.** "Deve ser rápido", "deve ser intuitivo", "deve ser seguro" — sem número nem critério, não dá para testar nem cobrar. Requisito bom é **verificável**.
- **Confundir requisito com solução.** "O sistema deve ter um botão azul no canto" é uma **solução** disfarçada de requisito. O requisito é a **necessidade** ("o cliente precisa finalizar o pedido rapidamente"); o botão é uma forma de atendê-la. Fixar a solução cedo demais amarra o design.
- **Achar que o cliente já sabe o que quer.** Muitas vezes ele não sabe, ou muda ao ver a primeira versão. Requisito não é ditado; é **descoberto** (próximo capítulo).
- **Ignorar regras de negócio "óbvias".** "Todo mundo sabe que cupom não acumula" — até o sistema deixar acumular e a empresa perder dinheiro. Regras precisam ser **explícitas**.
- **Tratar o documento de requisitos como imutável.** Requisitos mudam porque o negócio muda. O erro não é a mudança; é não ter um jeito de absorvê-la.

---

## 💡 Dicas profissionais

- **Para cada função, pergunte "e quão bem?".** "O sistema busca restaurantes" — em quanto tempo? para quantos usuários? Essa pergunta faz os RNFs cruciais aparecerem antes de virarem crise.
- **Torne todo requisito verificável.** Antes de aceitar "deve ser rápido", transforme em "responde em menos de X ms para Y% dos casos". Se não dá para testar, não dá para saber se foi cumprido.
- **Separe o problema da solução.** Anote a **necessidade** ("o cliente quer acompanhar a entrega"), não a implementação ("mapa com pin vermelho"). Isso deixa espaço para o design encontrar a melhor forma.
- **Cace os requisitos escondidos.** Muitos moram nos "casos de exceção": e se o pagamento falhar? e se o cliente cancelar? e se acabar o estoque? Perguntar "e se..." revela metade dos requisitos que ninguém disse.
- **Registre as regras de negócio à parte.** Elas mudam por decisão comercial, não técnica, e costumam impactar várias telas ao mesmo tempo. Tê-las explícitas evita bugs caros.
- **Requisitos são investimento, não burocracia.** Cada hora aqui economiza dias de retrabalho depois. É o ponto do projeto com o melhor retorno sobre o tempo.

---

## 🎈 Curiosidades

- O relatório **CHAOS**, do Standish Group, aponta há décadas que **requisitos incompletos ou mal geridos** estão entre as maiores causas de fracasso de projetos de software — acima de problemas técnicos.
- Existe uma sigla clássica para não funcionais em inglês: **"-ilities"** (reliab*ility*, scalab*ility*, usab*ility*, secur*ity*...). Alguns também os chamam de **"quality attributes"** (atributos de qualidade).
- A frase **"o cliente não sabe o que quer até ver o que não quer"** é quase uma lei da área. É por isso que protótipos ([[53-Figma-wireframes-prototipos-e-Design-System]]) valem mais que documentos: o cliente reage melhor ao concreto.
- Um dos requisitos não funcionais mais esquecidos é o **legal** — a **LGPD** no Brasil (e a GDPR na Europa) transformou "privacidade de dados" de item opcional em obrigação com multa pesada (Volume 4).
- Há projetos famosos que falharam por RNF: sistemas que passaram em todos os testes de função e **derreteram no dia do lançamento** por não aguentarem a carga real de usuários.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Requisito** | Uma necessidade que o software deve satisfazer. |
| **Requisito funcional (RF)** | O que o sistema deve fazer (uma ação, cálculo, comportamento). |
| **Requisito não funcional (RNF)** | Uma qualidade/restrição do sistema (rapidez, segurança, disponibilidade...). |
| **Regra de negócio** | Política do domínio que o sistema deve respeitar (ex.: frete grátis acima de R$50). |
| **Engenharia de Requisitos** | A disciplina de descobrir, escrever, validar e gerir requisitos. |
| **Elicitação** | O trabalho de descobrir requisitos com clientes e usuários. |
| **Verificável** | Requisito que pode ser testado objetivamente (tem critério mensurável). |
| **Rastreável** | Requisito de que se sabe a origem e o porquê. |
| **SLA / SLO** | Acordo/meta de nível de serviço (ex.: 99,9% de disponibilidade). |
| **Atributo de qualidade** | Outro nome para requisito não funcional. |

---

## 📝 Resumo

- Um **requisito** define **o que** o software deve fazer e **como** deve se comportar; requisitos mal entendidos são a maior causa de fracasso de projetos.
- **Requisitos funcionais (RF)** descrevem funções e comportamentos ("o cliente adiciona itens ao carrinho"); **requisitos não funcionais (RNF)** descrevem qualidades ("responde em menos de 1s", "99,9% de disponibilidade").
- Os RNFs são os mais **esquecidos** e os mais **caros de ignorar**: eles moldam a arquitetura e derrubam produtos que "funcionavam na demo".
- **Regras de negócio** são políticas do domínio (frete grátis acima de R$50) que originam requisitos funcionais.
- Um bom requisito é **claro, completo, consistente, verificável e rastreável** — "deve ser rápido" é ruim; "responde em menos de 1s em 95% dos casos" é bom.
- Requisitos são **descobertos** (não ditados), evoluem, e o tempo investido neles é o mais barato e rentável do projeto — pela curva do custo da mudança.

---

## ☑️ Checklist de aprendizado

- [ ] Sei definir requisito e explicar por que ele é a fundação do projeto.
- [ ] Diferencio requisito funcional de não funcional com exemplos próprios.
- [ ] Conheço as principais categorias de RNF e sei que elas moldam a arquitetura.
- [ ] Entendo o que é uma regra de negócio e como ela gera requisitos.
- [ ] Reconheço um requisito verificável e sei reescrever um requisito vago.
- [ ] Ligo erros de requisito à curva do custo da mudança.

---

## ✏️ Exercícios

**1.** Classifique cada item como **RF** ou **RNF**: (a) o cliente pode avaliar o pedido com estrelas; (b) a tela de avaliação carrega em menos de 1 segundo; (c) o sistema envia recibo por e-mail; (d) o app funciona para daltônicos.

**2.** Reescreva o requisito vago "o app deve ser rápido" em uma versão **verificável**.

**3.** Explique a diferença entre uma **regra de negócio** e um **requisito funcional**, usando o exemplo "frete grátis acima de R$50".

**4.** Dê um exemplo de projeto que cumpre todos os requisitos funcionais mas fracassa por um requisito **não funcional** ignorado.

**5. (Reflexão)** Você está levantando os requisitos de um app de agendamento de consultas médicas. Liste dois requisitos funcionais e dois não funcionais que seriam críticos, e explique por que os não funcionais escolhidos importam tanto nesse domínio.

---

## 💬 Respostas comentadas

**1.** (a) **RF** — é uma função (avaliar). (b) **RNF** — é desempenho (quão rápido carrega). (c) **RF** — é uma função (enviar recibo). (d) **RNF** — é acessibilidade (uma qualidade sobre *como* o app serve às pessoas).

**2.** Exemplo: "A lista de restaurantes deve carregar completamente em **menos de 2 segundos** em conexão 4G, para **95%** das requisições." Agora há um número, uma condição e uma meta mensurável — dá para testar e cobrar. "Rápido" sozinho é opinião.

**3.** A **regra de negócio** "frete grátis acima de R$50" é uma **política do negócio**: existiria mesmo sem software (a Ana poderia aplicá-la num caderno). O **requisito funcional** é a **implementação** dessa regra no sistema: "o sistema deve zerar o valor do frete quando o subtotal do pedido for maior ou igual a R$50". A regra é o "porquê/o quê do negócio"; o requisito funcional é o "o que o sistema faz" para cumpri-la.

**4.** Um clássico: um site de vendas com todas as funções perfeitas (carrinho, cupom, pagamento) que **cai no dia da Black Friday** porque ninguém definiu um requisito de **escalabilidade/disponibilidade** para o pico de acessos. Todas as funções existiam; o produto fracassou porque não aguentou a carga — um RNF ignorado. Outro: um app que vaza dados por não ter requisito de **segurança**.

**5.** **Funcionais:** (1) o paciente pode buscar horários disponíveis e agendar uma consulta; (2) o sistema envia lembrete da consulta por notificação/SMS. **Não funcionais:** (1) **Segurança/privacidade** — dados de saúde são sensíveis e protegidos por LGPD; um vazamento é catastrófico legal e eticamente; (2) **Disponibilidade/confiabilidade** — o sistema não pode perder um agendamento nem ficar fora do ar, pois isso afeta o cuidado com pessoas. Nesse domínio, os RNFs de segurança e confiabilidade importam tanto quanto as funções, porque falhas atingem dados sensíveis e a saúde de pessoas — não apenas conveniência.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[47-Elicitacao-personas-e-jornada-do-usuario]] — **como** descobrir os requisitos conversando com quem usa.
- **Aplicação direta:** [[48-Historias-de-usuario-casos-de-uso-e-criterios-de-aceitacao]] — como escrever requisitos de forma clara e testável.
- **Consequência:** [[57-O-que-e-arquitetura-de-software]] — como os requisitos não funcionais moldam a arquitetura.
- **Base:** [[41-Modelos-de-processo-de-desenvolvimento]] — a curva do custo da mudança que torna requisitos tão decisivos.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 13 → **Capítulo 46 de 119**.
