---
title: '88 - Modelos de serviço: IaaS, PaaS, SaaS e serverless'
---

# Capítulo 88 — Modelos de serviço: IaaS, PaaS, SaaS e serverless

> **Volume 4 — Engenharia Moderna** · Módulo 26 — Cloud
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender os **modelos de serviço** da nuvem pelo eixo "quanto você gerencia vs. o provedor".
- Diferenciar **IaaS, PaaS e SaaS** com clareza.
- Compreender o modelo **serverless (FaaS)** e quando ele brilha.
- Saber **escolher** o modelo certo conforme o controle, o esforço e o custo.
- Entender que os modelos **convivem** — um sistema real usa vários ao mesmo tempo.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- Ter lido [[87-O-que-e-computacao-em-nuvem]] (o conceito de nuvem).
- Ajuda ter lido [[86-Docker-e-containers]] (containers rodam nesses modelos).

---

## 📖 Introdução

No capítulo anterior você entendeu **o que** é a nuvem: alugar computação sob demanda ([[87-O-que-e-computacao-em-nuvem]]). Mas a nuvem não oferece uma coisa só — ela oferece **níveis** diferentes de serviço, que variam em **quanto você gerencia** e **quanto o provedor gerencia por você**. Escolher o nível certo é uma das decisões mais práticas da engenharia moderna, e é o que este capítulo esclarece através das siglas que você vai ouvir o tempo todo: **IaaS, PaaS, SaaS** e o mais novo, **serverless**.

A forma mais clara de entender todos eles é um **único eixo**: de um lado, você gerencia **tudo**; do outro, o provedor gerencia **tudo**; e os modelos são pontos ao longo desse caminho. Com **IaaS** (Infraestrutura como Serviço), o provedor te dá a máquina "crua" e você cuida de quase todo o resto — máximo controle, máximo trabalho. Com **PaaS** (Plataforma como Serviço), o provedor cuida do sistema operacional e da plataforma, e você só cuida do seu código — menos controle, muito menos trabalho. Com **serverless**, você só escreve funções e o provedor cuida até de "quando e quanto" rodá-las. E com **SaaS** (Software como Serviço), você não gerencia nada — só **usa** um software pronto pela internet (Gmail, Netflix, o próprio Trello que você viu no [[45-Estimativas-planejamento-e-ferramentas]]).

A grande lição não é decorar as siglas, mas entender o **trade-off** que elas representam: **mais controle custa mais esforço; menos esforço custa menos controle**. Não existe "melhor" — existe o **adequado** para cada situação. Um time pequeno que quer lançar rápido escolhe PaaS/serverless para não perder tempo com infraestrutura; um sistema com necessidades muito específicas pode precisar do controle do IaaS. E — ponto crucial — um sistema real **combina** vários modelos: usa serverless para uma tarefa, PaaS para o serviço principal, SaaS para o e-mail. Este capítulo te dá o mapa para escolher com consciência, em vez de usar "o que todo mundo usa" sem entender o porquê.

---

## 🧠 Analogia

Pense nas diferentes formas de **ter onde morar e comer** — do "faço tudo" ao "só uso":

- **Construir e manter sua própria casa do zero, num terreno que você comprou (on-premise):** você compra o terreno, constrói, cuida do encanamento, do telhado, de tudo. Controle total, trabalho total. É o servidor próprio do capítulo anterior ([[87-O-que-e-computacao-em-nuvem]]).

- **Alugar uma casa vazia (IaaS):** o terreno e a estrutura são do dono; você não constrói as paredes. Mas você traz seus móveis, pinta, decora, cuida da limpeza e da manutenção do dia a dia. Você tem **muito controle** sobre como morar, mas ainda **muito trabalho**. É a **Infraestrutura como Serviço**: o provedor te dá a máquina, você instala e gerencia o resto.

- **Morar num apartamento mobiliado com serviços (PaaS):** vem mobiliado, com faxina, portaria e manutenção inclusas. Você só **traz suas roupas e vive** — não se preocupa com o encanamento nem com trocar a lâmpada. Menos controle sobre a estrutura, muito **menos trabalho**. É a **Plataforma como Serviço**: você cuida só do seu código; o resto é do provedor.

- **Comer num restaurante self-service por quilo (serverless):** você não tem cozinha, não cozinha, não lava prato. Você chega, **paga exatamente pelo que colocou no prato**, come, e vai embora. Se não comer nada, não paga nada. É o **serverless**: você só "usa" quando precisa e paga por porção exata.

- **Assinar um serviço de refeições prontas entregues (SaaS):** você não faz **nada** — a comida chega pronta, você só consome. É o **Software como Serviço**: um software inteiro pronto para usar, sem gerenciar nada por baixo.

O eixo é sempre o mesmo: da **casa própria** (controle e trabalho máximos) ao **serviço de entrega** (zero trabalho, zero controle da cozinha). Guarde: os modelos de nuvem são as formas de "morar e comer" na computação — quanto mais o provedor faz por você, menos você trabalha e menos você controla.

---

## 🧩 Conceitos fundamentais

### 1. O eixo: quem gerencia o quê

Todo software precisa de várias camadas para rodar: **hardware → rede → sistema operacional → runtime/plataforma → aplicação → dados**. Os modelos de serviço diferem em **onde está a linha** que separa o que **o provedor** gerencia do que **você** gerencia. Quanto mais para cima a linha (mais o provedor faz), menos esforço e menos controle você tem.

> **Termo explicado — modelos de serviço:** as formas de consumir a nuvem, definidas por quanto da "pilha" (hardware ao software) o provedor gerencia versus você.

### 2. IaaS — Infraestrutura como Serviço

O provedor entrega os recursos de infraestrutura "crus" — **máquinas virtuais**, armazenamento, rede — e **você** gerencia o resto: instala o SO, configura, instala a plataforma, sobe sua aplicação, cuida das atualizações. **Máximo controle e flexibilidade, máximo esforço.** Exemplos: AWS EC2, máquinas virtuais no Azure/GCP.

> **Termo explicado — IaaS (Infrastructure as a Service):** a nuvem entrega a infraestrutura básica (servidores virtuais, rede, armazenamento) e você gerencia tudo acima disso (SO, plataforma, app).

### 3. PaaS — Plataforma como Serviço

O provedor gerencia a infraestrutura **e** a plataforma (SO, runtime, escalonamento, atualizações), e **você** só cuida do seu **código** e dos dados. Você faz deploy da aplicação e o provedor cuida do resto. **Menos controle, muito menos esforço.** Exemplos: Heroku, Google App Engine, AWS Elastic Beanstalk, Render, Railway.

> **Termo explicado — PaaS (Platform as a Service):** a nuvem gerencia a plataforma inteira (infra + SO + runtime + escala); você só entrega e cuida do seu código.

### 4. SaaS — Software como Serviço

O provedor entrega um **software pronto e completo**, acessado pela internet, e você **apenas o usa** — sem gerenciar nada por baixo. É o modelo do ponto de vista do **usuário final** do software. Exemplos: Gmail, Netflix, Trello ([[45-Estimativas-planejamento-e-ferramentas]]), Google Docs, Salesforce. (A própria SaborExpress é um SaaS para seus usuários.)

> **Termo explicado — SaaS (Software as a Service):** um software completo entregue pela internet, pronto para usar, sem que você gerencie infraestrutura, plataforma ou código.

### 5. Serverless (FaaS) — "sem servidor"

No **serverless**, você escreve apenas **funções** (pequenos pedaços de código que respondem a eventos) e o provedor cuida de **tudo** — inclusive de "quando" e "quanto" rodar. Você **não gerencia servidores** (embora eles existam por baixo — o nome engana), paga **só pelo tempo de execução** (se ninguém chama, custo zero), e ele **escala automaticamente** do zero a milhares. Exemplos: AWS Lambda, Cloud Functions, Azure Functions. Também chamado **FaaS** (Function as a Service).

> **Termo explicado — serverless (FaaS):** você escreve funções que rodam sob demanda; o provedor gerencia servidores, escala e disponibilidade, e você paga só pela execução — sem servidor para gerenciar.

### 6. Os trade-offs e o serverless em detalhe

O serverless brilha em cargas **esporádicas ou imprevisíveis** (paga zero quando ocioso) e livra você de gerenciar infra. Mas tem custos: **cold start** (a primeira chamada após ociosidade tem uma latência de "acordar" a função), limites de tempo de execução, e pode ficar **caro** em cargas altíssimas e constantes (onde um servidor dedicado sairia mais barato). Como tudo na nuvem: **não é bala de prata**, é uma ferramenta com o seu lugar.

> **Termo explicado — cold start:** o atraso na primeira execução de uma função serverless que estava "adormecida", pois o provedor precisa iniciá-la antes de responder.

---

## ⚙️ Como funciona na prática

Como um time escolhe e combina esses modelos:

**O trade-off central: controle vs. esforço.** A decisão sempre pesa duas coisas: quanto **controle** você precisa e quanto **esforço** você quer gastar com infraestrutura. IaaS dá controle total mas exige uma equipe cuidando de SO, atualizações e escala. PaaS/serverless tiram esse trabalho das suas costas, mas você aceita as **restrições** da plataforma (versões suportadas, menos customização). Não há resposta universal — há a resposta certa **para o seu contexto e tamanho**.

**Times pequenos: suba na pilha.** Uma startup ou um time pequeno geralmente deve escolher **PaaS ou serverless** e evitar IaaS. Por quê? Porque gerenciar infraestrutura (patches de segurança, configuração de servidores, escalonamento) **não é o produto deles** e consome tempo escasso. Deixar isso com o provedor e focar no código que gera valor é quase sempre a escolha certa no começo. "Não gerencie infraestrutura que você não precisa gerenciar" é um bom princípio.

**Quando descer na pilha (IaaS).** O IaaS se justifica quando você precisa de **controle** que as camadas mais altas não dão: uma configuração muito específica, um software que exige acesso ao SO, requisitos de compliance rígidos, ou otimização fina de custo/performance em grande escala. Empresas grandes com equipes de infraestrutura dedicadas frequentemente usam IaaS (ou Kubernetes sobre IaaS — [[86-Docker-e-containers]]) pelo controle.

**Serverless para eventos e picos esporádicos.** O serverless é ideal para tarefas **event-driven** e esporádicas: processar uma imagem quando ela é enviada, rodar um relatório noturno, reagir a um webhook ([[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]]). Como você paga só pela execução e ele escala do zero, é econômico para o que roda de vez em quando. Para o serviço principal de tráfego alto e constante, um container em PaaS/IaaS costuma ser mais previsível e barato.

**A realidade: sistemas são híbridos.** Um sistema real **não escolhe um** modelo — combina vários. O serviço principal pode rodar num **PaaS** (ou containers gerenciados), uma tarefa de processamento em **serverless**, o banco num serviço **gerenciado** (PaaS de dados), e o time usa dezenas de **SaaS** (e-mail, monitoramento, pagamento). Saber **misturar** os modelos, usando cada um onde ele é mais forte, é a habilidade prática real — não escolher "um só para tudo".

**"Managed services": o meio-termo dominante.** Na prática moderna, a maior parte das escolhas cai em **serviços gerenciados** — o provedor opera um componente (banco, fila, cache, busca) e você só o consome. Isso é a filosofia PaaS aplicada a cada peça: use o banco gerenciado ([[71-Confiabilidade-e-escala-do-banco]]) em vez de instalar e manter o seu; use a fila gerenciada ([[94-Filas-particionamento-e-microsservicos-na-pratica]]). Menos infra para cuidar, mais foco no produto.

---

## 🍔 Aplicação na SaborExpress

A SaborExpress usa **todos** os modelos ao mesmo tempo, cada um onde faz sentido — e evoluiu suas escolhas conforme cresceu. Acompanhe.

**No começo: PaaS para lançar rápido.** No MVP ([[49-MVP-priorizacao-e-validacao]]), a fundadora **Ana** e o pequeno time escolheram uma **PaaS** (subiram os containers numa plataforma gerenciada, tipo Render/Railway). A razão foi pragmática: eles eram poucos, e **gerenciar servidores não era o produto deles** — o produto era o delivery. Com PaaS, faziam `git push` e a plataforma cuidava de rodar, escalar e atualizar. Ganharam **meses** de velocidade que teriam perdido configurando infraestrutura no IaaS. Foi a escolha "suba na pilha" para times pequenos.

**Crescendo: migração seletiva para mais controle.** Quando a escala e a complexidade aumentaram (dezenas de serviços, necessidade de otimizar custo e ter controle fino), o serviço principal migrou para **containers em Kubernetes sobre IaaS** ([[86-Docker-e-containers]]), gerenciado pela AWS. Aqui o time **aceitou mais esforço** (têm engenheiros de plataforma) em troca do **controle** que a escala passou a exigir. Note a evolução: PaaS quando eram pequenos, mais controle quando cresceram — a linha do "quem gerencia" desceu conforme o tamanho justificou, não antes.

**Serverless para tarefas esporádicas.** Várias tarefas event-driven da SaborExpress rodam em **serverless** (AWS Lambda): gerar a imagem de miniatura quando um restaurante sobe a foto de um prato, processar o relatório de vendas noturno para o Sr. Alberto, reagir aos webhooks do gateway de pagamento ([[74-Alem-de-REST-GraphQL-gRPC-WebSocket-Webhooks]]). Essas tarefas rodam **de vez em quando**, então o serverless é perfeito: paga-se só pela execução, custo zero quando ociosas, e escalam sozinhas num pico. Rodar isso num servidor ligado 24h seria desperdício.

**Serviços gerenciados por toda parte.** O time não instala nem mantém as peças de infraestrutura: usa o **banco gerenciado** (RDS — [[71-Confiabilidade-e-escala-do-banco]]), a **fila gerenciada** ([[94-Filas-particionamento-e-microsservicos-na-pratica]]) e o **cache gerenciado** (Redis — [[93-Cache-CDN-e-balanceador-de-carga]]). Cada um é a filosofia PaaS aplicada a um componente: menos coisa para operar, mais foco no delivery.

**SaaS para o que não é core.** Para tudo que **não é o produto**, a SaborExpress **compra** SaaS em vez de construir: e-mail transacional (SendGrid), monitoramento de erros (Sentry — [[90-As-ferramentas-de-observabilidade]]), pagamento (um gateway), gestão de tarefas (Trello/Jira — [[45-Estimativas-planejamento-e-ferramentas]]). Ana resume a filosofia: "construímos o que **nos diferencia** (o delivery) e **assinamos** o resto". E, do ponto de vista dos **clientes**, a própria SaborExpress **é um SaaS** — eles só usam o app, sem saber de nada por baixo.

**A decisão consciente.** Em cada caso, o time decidiu pelo eixo **controle vs. esforço**, registrando as escolhas maiores em ADRs ([[57-O-que-e-arquitetura-de-software]]). A regra que seguiram: usar o modelo **mais alto na pilha** (menos esforço) que atendesse à necessidade, descendo para IaaS só onde o controle era realmente indispensável. Nunca escolheram um modelo "porque é o que as big techs usam" — escolheram pelo que servia ao **tamanho e ao problema deles**.

Moral: a SaborExpress não escolheu "um" modelo — **combinou todos**: PaaS/IaaS para o serviço principal (evoluindo com o tamanho), serverless para tarefas esporádicas, serviços gerenciados para as peças de infra, e SaaS para tudo que não é o core. A habilidade real foi **misturar** cada modelo onde ele é mais forte, sempre decidindo pelo trade-off controle vs. esforço — e subindo o mais alto possível na pilha para focar no que realmente diferencia o negócio.

---

## 🏢 Como isso acontece em uma empresa

- **A tendência é "subir na pilha".** A indústria caminha para o mais gerenciado possível (PaaS, serverless, managed services), porque gerenciar infraestrutura raramente é o diferencial do negócio. Foco no produto, não na infra.
- **Sistemas reais são híbridos.** Nenhuma empresa séria usa um único modelo. Combinam IaaS/PaaS para os serviços, serverless para tarefas, e dezenas de SaaS — cada um onde é mais forte.
- **"Build vs. buy" é decisão constante.** Construir algo ou assinar um SaaS pronto? A regra comum: **construa o que te diferencia, compre o resto**. Reinventar e-mail, pagamento ou monitoramento raramente vale a pena.
- **Serverless cresceu muito, mas tem nicho.** É dominante para cargas event-driven e esporádicas, e para times que querem zero gestão de infra. Para tráfego alto e constante, containers gerenciados frequentemente saem mais previsíveis e baratos.
- **SaaS é um modelo de negócio dominante.** A maior parte do software B2B moderno é vendido como SaaS (assinatura, pela internet). Entender SaaS é entender como a indústria de software ganha dinheiro hoje ([[105-Por-que-empresas-fazem-software-modelos-de-negocio]] no Volume 5).
- **O custo depende do modelo e da carga.** A mesma carga pode custar muito diferente em serverless vs. container vs. VM. Escolher o modelo certo por padrão de uso é parte do FinOps ([[87-O-que-e-computacao-em-nuvem]]).
- **Kubernetes é IaaS turbinado.** Muitas empresas grandes rodam Kubernetes sobre IaaS para ter controle com alguma automação — um ponto intermediário popular em escala ([[86-Docker-e-containers]]).

---

## ⚠️ Erros comuns

- **Escolher IaaS por padrão (controle que você não precisa).** Times pequenos gastando tempo precioso gerenciando servidores que uma PaaS cuidaria. Suba na pilha a menos que precise do controle.
- **Achar que "serverless" significa "sem servidores".** Há servidores por baixo — você só não os gerencia. E o serverless tem custos (cold start, limites, preço em alta carga) que precisam ser considerados.
- **Usar serverless para tudo.** Forçar serverless em cargas altas e constantes, onde ele fica caro e o cold start incomoda. Cada modelo tem seu lugar.
- **Construir o que poderia comprar.** Reinventar e-mail, pagamento, autenticação ou monitoramento em vez de usar um SaaS/serviço pronto. Construa o que te diferencia, compre o resto.
- **Comprar o que deveria construir (o core).** O oposto: terceirizar em SaaS aquilo que é o **diferencial** do seu negócio, ficando refém e sem controle do que mais importa.
- **Escolher o modelo pela moda.** Usar Kubernetes/IaaS "porque as big techs usam", sem ter a escala nem a equipe. Escolha pelo seu tamanho e problema.
- **Ignorar o lock-in do modelo.** Serverless e serviços proprietários amarram você ao provedor. Aceitável, mas deve ser consciente ([[87-O-que-e-computacao-em-nuvem]]).
- **Não misturar os modelos.** Insistir num único modelo para tudo, em vez de usar cada um onde é mais forte. A força está na combinação.

---

## 💡 Dicas profissionais

- **Suba o mais alto possível na pilha.** Use o modelo mais gerenciado que atenda à necessidade (PaaS/serverless/managed), descendo para IaaS só onde o controle for indispensável. Menos infra para cuidar = mais foco no produto.
- **Comece com PaaS se o time é pequeno.** Lançar rápido sem gerenciar infra é quase sempre a escolha certa no início. Migre para mais controle quando a escala justificar.
- **Use serverless para o esporádico e event-driven.** Tarefas que rodam de vez em quando ou reagem a eventos são o ponto ideal — custo zero quando ociosas, escala automática.
- **"Construa o que te diferencia, compre o resto."** Não reinvente e-mail, pagamento, monitoramento. Foque a engenharia no que é o core do seu negócio.
- **Misture os modelos conscientemente.** Um sistema real é híbrido. Escolha cada peça (serviço, tarefa, componente) no modelo onde ela é mais forte.
- **Decida pelo eixo controle vs. esforço.** Sempre pese quanto controle você realmente precisa contra quanto trabalho de infra quer assumir. Registre as escolhas grandes em ADRs.
- **Cuidado com o custo do modelo.** A mesma carga custa diferente em cada modelo. Estime o custo conforme seu padrão de uso, não só o preço unitário.
- **Não escolha pela moda.** A ferramenta das big techs pode ser errada para o seu tamanho. Escolha pelo problema e pela equipe que você tem.

---

## 🎈 Curiosidades

- A sigla **"as a Service"** (como serviço) virou tão produtiva que a indústria criou dezenas de variações, algumas sérias (DBaaS - banco como serviço, MLaaS - machine learning como serviço) e outras de brincadeira. Existe até o termo jocoso **"XaaS"** ou "**everything as a service**" (tudo como serviço) para descrever a tendência de transformar qualquer coisa num serviço de assinatura.
- O **Heroku**, lançado em 2007, foi um dos pioneiros do PaaS e tão influente que definiu boas práticas seguidas até hoje — o famoso manifesto **"The Twelve-Factor App"** (Os Doze Fatores), um guia de como construir aplicações prontas para a nuvem, nasceu da experiência dos engenheiros do Heroku e virou leitura clássica.
- O nome **"serverless"** (sem servidor) é reconhecidamente **enganoso** e gera debates infindáveis — obviamente há servidores rodando o código. O nome quer dizer "sem **servidores para você gerenciar**", mas ficou curto e confuso. É um dos exemplos mais citados de "naming ruim" na computação, ao lado de "cloud".
- O **AWS Lambda** (2014), que popularizou o serverless, foi nomeado em homenagem ao **cálculo lambda** — um sistema matemático dos anos 1930, criado por Alonzo Church, que é uma das bases teóricas da computação e da ideia de "função". Um nome que conecta a computação em nuvem mais moderna a fundamentos matemáticos de quase um século atrás.
- A fronteira entre os modelos está cada vez mais **borrada**: surgiram categorias como "containers serverless" (rodar containers sem gerenciar servidores, como AWS Fargate ou Google Cloud Run), que misturam a portabilidade dos containers com a ausência de gestão do serverless. A tendência geral é sempre a mesma — **tirar mais gestão de infraestrutura das costas do desenvolvedor**.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Modelos de serviço** | Formas de consumir a nuvem, por quanto o provedor gerencia. |
| **IaaS** | Provedor dá a infra crua (VMs, rede); você gerencia o resto. |
| **PaaS** | Provedor gerencia a plataforma; você cuida só do seu código. |
| **SaaS** | Software pronto usado pela internet; você não gerencia nada. |
| **Serverless / FaaS** | Você escreve funções sob demanda; o provedor gerencia tudo. |
| **Cold start** | Atraso da primeira execução de uma função serverless "adormecida". |
| **Serviço gerenciado** | Componente (banco, fila, cache) operado pelo provedor. |
| **Build vs. buy** | Decidir entre construir algo ou assinar um SaaS pronto. |
| **Managed services** | A filosofia PaaS aplicada a cada componente de infra. |
| **XaaS** | "Tudo como serviço"; a tendência de transformar tudo em serviço. |

---

## 📝 Resumo

- Os **modelos de serviço** da nuvem se organizam num **único eixo**: de "você gerencia tudo" a "o provedor gerencia tudo". A lição central é o trade-off — **mais controle custa mais esforço; menos esforço custa menos controle**. Não há "melhor", há o **adequado** ao contexto.
- **IaaS** (Infraestrutura como Serviço): o provedor dá a máquina crua e você gerencia SO, plataforma e app — máximo controle, máximo trabalho. **PaaS** (Plataforma): o provedor gerencia a plataforma e você cuida só do **código** — menos controle, muito menos esforço.
- **SaaS** (Software como Serviço): um software pronto usado pela internet (Gmail, Netflix, a própria SaborExpress), sem gerenciar nada. **Serverless/FaaS**: você escreve **funções** sob demanda, paga só pela **execução** (zero quando ocioso) e o provedor escala tudo — ideal para tarefas **esporádicas e event-driven**, com o custo do **cold start** e do preço em cargas altas.
- Times pequenos devem **"subir na pilha"** (PaaS/serverless) e evitar gerenciar infraestrutura que não é o produto; desce-se para IaaS só quando o **controle** é realmente indispensável (escala, compliance, customização). "Construa o que te diferencia, **compre** o resto" (build vs. buy).
- Sistemas reais são **híbridos**: combinam PaaS/IaaS no serviço principal, serverless em tarefas, serviços **gerenciados** nas peças de infra (banco, fila, cache) e SaaS no que não é core. A habilidade prática é **misturar** os modelos, usando cada um onde é mais forte — decidindo sempre pelo eixo controle vs. esforço, nunca pela moda.

---

## ☑️ Checklist de aprendizado

- [ ] Explico o eixo "quem gerencia o quê" que organiza todos os modelos.
- [ ] Diferencio IaaS, PaaS e SaaS com clareza.
- [ ] Explico serverless/FaaS, o pagamento por execução e o cold start.
- [ ] Sei escolher o modelo pelo trade-off controle vs. esforço.
- [ ] Entendo "construa o que te diferencia, compre o resto".
- [ ] Percebo que um sistema real combina vários modelos.

---

## ✏️ Exercícios

**1.** Com a analogia de "morar e comer", explique a diferença entre IaaS, PaaS, SaaS e serverless.

**2.** Um time pequeno de startup deve, em geral, escolher IaaS ou PaaS para começar? Justifique pelo trade-off controle vs. esforço.

**3.** Para quais tipos de tarefa o **serverless** é ideal, e por quê? Cite uma limitação dele.

**4.** Explique o princípio "construa o que te diferencia, compre o resto" com um exemplo da SaborExpress.

**5. (Reflexão)** A SaborExpress usa "todos os modelos ao mesmo tempo" e migrou de PaaS para mais controle conforme cresceu. Explique por que sistemas reais são híbridos e por que a escolha de modelo deve evoluir com o tamanho do time/produto.

---

## 💬 Respostas comentadas

**1.** Usando "morar e comer": **IaaS** é como **alugar uma casa vazia** — a estrutura é do dono, mas você traz os móveis, decora e cuida da manutenção do dia a dia; muito controle sobre como morar, mas muito trabalho (o provedor dá a máquina crua, você gerencia SO, plataforma e app). **PaaS** é como **morar num apartamento mobiliado com faxina e manutenção inclusas** — você só traz suas roupas e vive, sem se preocupar com o encanamento; menos controle da estrutura, muito menos trabalho (você cuida só do seu código, o provedor cuida da plataforma). **Serverless** é como **comer num self-service por quilo** — você não tem cozinha nem lava prato, paga exatamente pelo que pôs no prato e, se não comer, não paga nada (você só escreve funções, paga pela execução, custo zero quando ocioso). **SaaS** é como **assinar refeições prontas entregues** — você não faz nada, só consome o software pronto pela internet (Gmail, Netflix). O eixo é sempre "quanto o provedor faz por você": quanto mais ele faz, menos você trabalha e menos você controla.

**2.** Em geral, um time pequeno de startup deve escolher **PaaS** (ou serverless) para começar, **não IaaS**. Pelo trade-off: o IaaS oferece máximo **controle**, mas ao custo de máximo **esforço** — alguém precisa instalar e atualizar o SO, configurar servidores, cuidar de segurança e escala. Para uma startup, esse esforço é caríssimo porque **gerenciar infraestrutura não é o produto dela** e o tempo da equipe é escasso e precioso. A **PaaS** tira todo esse trabalho das costas do time (o provedor cuida da plataforma, do escalonamento e das atualizações), deixando-o focar no **código que gera valor** — o produto em si. O time aceita menos controle e algumas restrições da plataforma em troca de **velocidade** e de não gastar pessoas escassas cuidando de servidores. A regra "suba na pilha": use o modelo mais gerenciado que atenda, e só desça para IaaS quando o controle se tornar realmente indispensável — o que, para a maioria das startups, só acontece (se acontecer) bem depois.

**3.** O **serverless** é ideal para tarefas **esporádicas e event-driven** (dirigidas por eventos) — que rodam de vez em quando, em resposta a um acontecimento, em vez de continuamente. Exemplos: processar uma imagem quando ela é enviada, gerar um relatório noturno, reagir a um webhook de pagamento. É ideal para esses casos porque você **paga só pela execução** (quando a tarefa não roda, o custo é **zero** — não há servidor ligado ociosamente) e ele **escala automaticamente** do zero a milhares de execuções num pico, sem você gerenciar nada. Uma **limitação**: o **cold start** — quando a função ficou "adormecida" (sem ser chamada por um tempo), a primeira execução tem um atraso extra, porque o provedor precisa "acordá-la" antes de responder; isso pode ser um problema para tarefas que exigem resposta instantânea. Outras limitações incluem limites de tempo de execução e o fato de o serverless poder ficar **caro** em cargas altíssimas e constantes (onde um servidor dedicado sairia mais barato) — por isso ele não é ideal para o serviço principal de tráfego alto e contínuo.

**4.** O princípio "construa o que te diferencia, compre o resto" (build vs. buy) diz que a engenharia da empresa deve concentrar seu esforço de **construção** naquilo que é o **diferencial competitivo** do negócio, e **assinar SaaS/serviços prontos** para tudo o que é necessário mas não distintivo — em vez de reinventar soluções que já existem maduras no mercado. Exemplo da SaborExpress: o que a **diferencia** é o **delivery** (a experiência de pedir comida, a logística de entrega, as recomendações) — isso o time **constrói** com cuidado, pois é o coração do produto. Já o **e-mail transacional** (SendGrid), o **monitoramento de erros** (Sentry), o **processamento de pagamento** (um gateway) e a **gestão de tarefas** (Trello/Jira) são coisas necessárias mas que **não diferenciam** o negócio — então o time **compra** esses SaaS prontos, em vez de gastar meses de engenharia reconstruindo o que já existe testado. Assim, o esforço escasso da equipe vai para o que realmente importa competitivamente, e o resto é resolvido por assinatura.

**5.** Sistemas reais são **híbridos** porque cada parte de um sistema tem necessidades diferentes, e cada modelo de serviço é mais forte para um tipo de necessidade: o serviço principal (tráfego alto e constante) roda melhor em containers gerenciados/PaaS ou IaaS (previsível, com controle proporcional à escala); tarefas esporádicas (relatórios, processamento de imagem) rodam melhor em serverless (custo zero quando ociosas); peças de infraestrutura (banco, fila, cache) são melhores como serviços gerenciados (menos operação); e funções de apoio (e-mail, monitoramento) são melhores compradas como SaaS. Forçar **um único** modelo para tudo desperdiçaria as forças de cada um. Já a escolha deve **evoluir com o tamanho** porque o trade-off controle vs. esforço muda conforme o time e o produto crescem: quando pequeno, o time tem poucas pessoas e nenhuma equipe de infra, então prioriza **menos esforço** (PaaS, serverless) para focar no produto e lançar rápido; conforme cresce (mais escala, mais serviços, necessidade de otimizar custo e ter controle fino), passa a ter engenheiros de plataforma e a **precisar** de mais controle, então faz sentido **descer na pilha** para IaaS/Kubernetes em partes críticas — como a SaborExpress fez, migrando o serviço principal quando a escala justificou. A escolha certa "ontem" (PaaS quando eram 3 pessoas) não é a certa "hoje" (mais controle com dezenas de serviços); revisar o modelo conforme o contexto muda é parte da engenharia madura, e o erro é tanto adotar controle cedo demais (esforço desperdiçado) quanto tarde demais (limitação na escala).

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[87-O-que-e-computacao-em-nuvem]] — o conceito de nuvem que estes modelos fatiam.
- **Próximo (linear):** [[89-Logs-metricas-e-tracing]] — enxergar o sistema que roda nesses modelos.
- **Base:** [[86-Docker-e-containers]] (containers rodam em IaaS/PaaS/serverless) e [[71-Confiabilidade-e-escala-do-banco]] (banco gerenciado).
- **Adiante:** [[94-Filas-particionamento-e-microsservicos-na-pratica]] (filas gerenciadas) e, no Volume 5, [[105-Por-que-empresas-fazem-software-modelos-de-negocio]] (SaaS como modelo de negócio).

---

> 🧭 **Você está aqui:** Volume 4 → Módulo 26 → **Capítulo 88 de 119**.
