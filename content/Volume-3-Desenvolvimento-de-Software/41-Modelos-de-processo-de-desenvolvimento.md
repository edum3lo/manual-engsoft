---
title: '41 - Modelos de processo de desenvolvimento'
---

# Capítulo 41 — Modelos de processo de desenvolvimento

> **Volume 3 — Desenvolvimento de Software** · Módulo 12 — Processos e Metodologias
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é um **processo de desenvolvimento** e por que times precisam de um.
- Descrever o modelo **Cascata (Waterfall)**: como funciona, quando faz sentido e por que ele falha em tantos projetos.
- Distinguir os modelos **incremental**, **iterativo** e **espiral** — e perceber que "iterativo" e "incremental" não são a mesma coisa.
- Compreender a ideia central que liga tudo isso: **quanto mais cedo você descobre um erro, mais barato é corrigi-lo**.
- Reconhecer por que a indústria caminhou do Cascata para o **ágil** (tema dos próximos capítulos).

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- Ter lido [[10-O-ciclo-de-vida-do-software]] (o SDLC — o ciclo de vida do software) ajuda muito: aqui detalhamos *como* percorrer aquele ciclo.
- Nenhum conhecimento técnico de programação é necessário neste capítulo.

---

## 📖 Introdução

Imagine que cinco pessoas precisam construir uma casa juntas. Se cada uma começar a levantar paredes por conta própria, sem combinar quem faz o quê, em que ordem e com base em qual planta, o resultado é caos: paredes que não encaixam, retrabalho, brigas. Construir software em equipe tem exatamente o mesmo problema — e a solução tem o mesmo nome: um **processo**.

Um **processo de desenvolvimento** é o conjunto de etapas, na ordem em que acontecem, que um time segue para transformar uma ideia em software funcionando. Ele responde a perguntas como: primeiro a gente levanta *tudo* o que o sistema precisa fazer, ou descobre aos poucos? A gente entrega o sistema inteiro no fim, ou vai entregando pedaços? O que fazer quando o cliente muda de ideia no meio?

Ao longo de décadas, a indústria experimentou várias respostas. Neste capítulo você vai conhecer os **modelos clássicos** de processo — Cascata, incremental, iterativo e espiral. Eles são a "pré-história" que explica por que hoje quase todo mundo trabalha de forma **ágil** (Scrum, Kanban), que veremos a seguir. Entender de onde viemos é o que faz o ágil deixar de ser um monte de rituais decorados e passar a fazer **sentido**.

---

## 🧠 Analogia

Pense em **duas formas de cozinhar um jantar para convidados**.

**Cozinheiro Cascata:** ele lê a receita inteira, faz a lista completa de compras, compra tudo de uma vez, prepara todos os pratos do começo ao fim seguindo a ordem exata e só serve quando **tudo** está pronto. Se no meio do preparo ele descobre que faltou um ingrediente, ou que o convidado é alérgico a camarão, é tarde: metade já foi cozinhada errada. Refazer custa caro.

**Cozinheiro iterativo/incremental:** ele começa por um prato simples, serve uma entrada, vê a reação da mesa ("está salgado?", "gostaram?"), ajusta o tempero do próximo, e vai trazendo os pratos aos poucos. Ele **prova a comida enquanto cozinha** e corrige o rumo a cada rodada. Se alguém for alérgico, ele descobre no primeiro prato, não no banquete inteiro.

Os modelos de processo são justamente isso: formas diferentes de responder *"quando eu descubro que errei, e quanto me custa consertar?"*. O Cascata aposta em acertar o plano inteiro de primeira. Os modelos iterativos aceitam que **ninguém acerta de primeira** e organizam o trabalho para errar cedo e barato.

---

## 🧩 Conceitos fundamentais

### 1. As fases que todo modelo tem (em alguma ordem)

Todo processo de desenvolvimento mexe com as mesmas fases que você viu no [[10-O-ciclo-de-vida-do-software]]:

- **Requisitos** — descobrir *o que* o software precisa fazer.
- **Análise e design** — decidir *como* ele vai ser feito (modelagem, arquitetura).
- **Implementação (código)** — escrever o software.
- **Testes** — verificar se funciona e se atende ao combinado.
- **Implantação (deploy)** — colocar no ar para os usuários.
- **Manutenção** — corrigir e evoluir depois de pronto.

O que muda de um modelo para outro **não são as fases**, e sim **a ordem, o tamanho dos ciclos e quantas vezes você passa por elas**.

### 2. O modelo Cascata (Waterfall)

O **Cascata** é o modelo mais antigo e intuitivo: as fases acontecem **uma vez, em sequência**, como uma cachoeira que só desce. Você termina *toda* a fase de requisitos, congela, desce para *todo* o design, congela, desce para *toda* a implementação, e assim por diante.

```
REQUISITOS
    └──► DESIGN
            └──► IMPLEMENTAÇÃO
                    └──► TESTES
                            └──► DEPLOY
                                    └──► MANUTENÇÃO
```

> **Termo explicado — Cascata (Waterfall):** modelo em que as fases do desenvolvimento acontecem em sequência linear, cada uma começando só depois que a anterior termina por completo.

**Vantagens:** é simples de entender, fácil de documentar e de cobrar por etapas. Funciona bem quando os requisitos são **muito estáveis e conhecidos** (ex.: sistemas com regras legais bem definidas, ou projetos parecidos com outros já feitos).

**Problema central:** ele assume que dá para **acertar tudo lá no começo**. Mas em software os requisitos quase sempre mudam — o cliente vê a primeira versão e percebe que queria outra coisa. No Cascata, o cliente só vê o produto **no fim**, quando mudar custa caríssimo. Um erro de entendimento lá no início atravessa todas as fases sem ser percebido.

### 3. O modelo incremental — entregar em pedaços

No modelo **incremental**, você divide o sistema em **partes (incrementos)** e entrega uma de cada vez, cada uma já funcionando. Primeiro o cadastro de usuários; depois o carrinho; depois o pagamento. Cada incremento é um pedaço **pronto e utilizável** do produto final.

> **Termo explicado — incremental:** construir o software em pedaços entregáveis, somando funcionalidades a cada entrega, como quem constrói uma casa cômodo por cômodo.

A vantagem: o cliente já tem **valor nas mãos** cedo e pode dar feedback sobre cada parte antes de a próxima ser feita.

### 4. O modelo iterativo — refinar o mesmo produto em rodadas

No modelo **iterativo**, você constrói uma versão simples do produto **inteiro** e vai **refinando** em rodadas (iterações). A primeira versão é tosca; a cada iteração ela fica melhor, mais completa, mais polida.

> **Termo explicado — iterativo:** repetir o ciclo de desenvolvimento várias vezes sobre o mesmo produto, melhorando-o a cada passagem (como um rascunho que vira desenho que vira pintura).

**A diferença sutil (e cobrada em entrevista):** *incremental* soma **pedaços novos**; *iterativo* melhora **o que já existe**. A analogia clássica é a Mona Lisa: pintar incrementalmente seria pintar primeiro o rosto pronto, depois as mãos prontas, depois o fundo pronto; pintar iterativamente seria esboçar o quadro inteiro a lápis, depois passar tinta em tudo, depois detalhar tudo. Na prática, os métodos modernos combinam os dois: cada entrega é um **incremento** produzido por uma **iteração**.

### 5. O modelo espiral — dirigido a risco

O **espiral** (Barry Boehm, 1986) organiza o trabalho em voltas de uma espiral, e o que decide o que fazer em cada volta é o **risco**. A cada ciclo você: (1) define objetivos, (2) **analisa os riscos** e faz um protótipo para reduzi-los, (3) desenvolve e testa, (4) planeja a próxima volta. É pesado e caro, usado em projetos **grandes e críticos** (aviação, defesa, sistemas médicos), onde errar sai muito mais caro do que o custo de tanta cautela.

> **Termo explicado — espiral:** modelo iterativo em que cada ciclo é guiado pela análise dos maiores riscos do projeto, atacando-os primeiro com protótipos.

---

## ⚙️ Como funciona na prática

O fio que liga todos esses modelos é uma única lei econômica, conhecida como a **curva do custo da mudança**:

```
CUSTO DE CORRIGIR UM ERRO
   ▲
   │                                        ███  (em produção)
   │                                ███
   │                        ███
   │                ███
   │        ███
   │  ███
   └────────────────────────────────────────────►  FASE EM QUE O ERRO É DESCOBERTO
   requisitos  design  código  testes  produção
```

Um erro de requisito descoberto **na fase de requisitos** custa uma conversa e um ajuste no documento. O **mesmo** erro descoberto **em produção** custa: reescrever código, refazer testes, um novo deploy, talvez usuários prejudicados e a reputação arranhada. Estudos clássicos estimam que corrigir em produção pode custar **dezenas a centenas de vezes** mais do que corrigir no início.

O Cascata é perigoso justamente porque **empurra a descoberta dos erros para o fim** — você só junta tudo e testa lá na frente, quando o erro já é caro. Os modelos iterativos/incrementais fazem o oposto: **encurtam o ciclo** para que o cliente veja algo funcionando rápido e os erros apareçam enquanto ainda são baratos. Essa é, no fundo, a semente do movimento **ágil** que você verá no [[42-O-Manifesto-Agil]]: em vez de um ciclo gigante de meses, muitos ciclos curtos de dias ou semanas.

Repare que **nenhum modelo é "o certo" em abstrato**. A pergunta profissional não é "qual é o melhor?", e sim "**qual se encaixa neste projeto, com este cliente, este risco e esta incerteza?**". Requisitos estáveis e contrato fechado por etapas podem pedir Cascata; um produto novo, cheio de incerteza sobre o que o usuário quer, pede iteração.

---

## 🍔 Aplicação na SaborExpress

A **Ana**, fundadora da SaborExpress, quer lançar o app de delivery. Imagine as duas histórias possíveis.

**Se a Ana fizesse Cascata:** ela contrataria uma consultoria para levantar *todos* os requisitos do app dos sonhos — cadastro, busca, carrinho, pagamento, cupom, avaliação, chat com entregador, programa de fidelidade — fecharia um documento de 200 páginas, e o time sumiria por **8 meses** para construir tudo. No dia da entrega, a Ana descobre que: os restaurantes não querem cadastrar cardápio daquele jeito, os clientes acham a busca confusa, e ninguém usa o chat que custou dois meses. Oito meses e muito dinheiro para **só então** aprender o que estava errado.

**Se a Ana fizesse iterativo/incremental (como se faz hoje):** em **3 semanas** o time entrega um MVP capenga, mas funcional — dá para ver 5 restaurantes, montar um carrinho e finalizar um pedido (o pagamento ainda é na entrega). A Ana coloca na mão de 50 clientes reais de um bairro. Aprende que a busca precisa filtrar por "tempo de entrega", que ninguém liga para foto do restaurante mas todo mundo quer foto do **prato**, e que o cupom é o que mais atrai. Na próxima iteração, o time constrói **o que os dados pediram** — não o que estava no chute do documento. Cada rodada de 2-3 semanas soma um incremento validado.

A diferença não é "trabalhar mais rápido". É **descobrir os erros quando ainda são baratos** e gastar esforço só no que comprovadamente importa. Foi assim que a SaborExpress evitou queimar o caixa inteiro numa aposta única. É esse raciocínio que os próximos capítulos (Scrum, Kanban, MVP) transformam em método.

---

## 🏢 Como isso acontece em uma empresa

- **Quase ninguém faz Cascata "puro" hoje** — mas a palavra vive nas conversas. Alguém dizer "isso aqui virou uma cascata" é uma crítica: significa que as fases estão engessadas e o feedback demora demais.
- **Setores regulados ainda usam modelos formais.** Bancos, saúde, aviação e governo frequentemente exigem documentação e fases bem definidas (às vezes por lei ou auditoria), então adotam versões mais "cascata" ou espiral, ou um **híbrido** com ágil.
- **O híbrido é a regra, não a exceção.** Muitos times fazem um planejamento inicial mais robusto (parecido com Cascata) e **executam de forma ágil**, em iterações. "Água-gil" (*wagile*) é o apelido meio brincalhão disso.
- **O modelo aparece no contrato.** Projetos de agência/consultoria com "escopo fechado" e pagamento por entrega tendem ao Cascata; produtos internos e startups tendem ao iterativo. Entender o modelo ajuda você a entender *por que* o time trabalha daquele jeito.
- **A escolha do modelo é decisão de liderança** (Tech Lead, gerente de projeto, PO), mas afeta o seu dia: define se você recebe requisitos "prontos e congelados" ou "que vão mudar toda semana".

---

## ⚠️ Erros comuns

- **Achar que Cascata é sempre errado e ágil é sempre certo.** São ferramentas. Um projeto com requisitos realmente estáveis e alta necessidade de documentação pode se dar bem com um modelo sequencial. O erro é usar o modelo errado para o contexto.
- **Confundir iterativo com incremental.** Iterativo = melhorar o mesmo produto em rodadas; incremental = somar pedaços novos. Na prática se usam juntos, mas em prova/entrevista a distinção é cobrada.
- **Pensar que "sem processo" é mais rápido.** Times sem processo nenhum não são ágeis — são caóticos. Ágil é um processo *leve*, não a **ausência** de processo.
- **Empurrar o teste para o fim (mentalidade Cascata escondida).** Mesmo em times "ágeis", deixar todo o teste para a última semana da entrega recria o problema do Cascata: o erro aparece tarde e caro.
- **Tratar o documento de requisitos como verdade eterna.** No mundo real, o requisito muda porque o negócio muda. O modelo precisa **absorver mudança**, não puni-la.

---

## 💡 Dicas profissionais

- **Ao entrar num time, pergunte "qual é o nosso processo?".** A resposta (ou a falta dela) te diz muito sobre a maturidade do time e sobre o que esperar do seu dia a dia.
- **Encurte o ciclo de feedback sempre que puder.** Seja qual for o modelo oficial, quanto mais cedo alguém vê o seu trabalho (um colega no code review, o PO numa demo, o usuário num teste), mais barato fica corrigir. Essa é a lição que atravessa todos os modelos.
- **Guarde a curva do custo da mudança na cabeça.** Ela justifica quase tudo o que vem a seguir: por que escrevemos requisitos com cuidado, por que revisamos código, por que testamos automaticamente. Tudo é para **descobrir o erro mais cedo**.
- **Não decore os modelos como trivia.** Entenda o *problema* que cada um tenta resolver. Assim, quando alguém propuser um jeito de trabalhar, você saberá avaliar se faz sentido para aquele risco e aquela incerteza.

---

## 🎈 Curiosidades

- O termo **"Waterfall"** ficou famoso por um artigo de **Winston Royce (1970)** — mas há uma ironia histórica: Royce apresentou o modelo sequencial e logo em seguida disse que ele era **arriscado e convidava ao fracasso**, defendendo justamente iterações e protótipos. A indústria copiou o desenho e ignorou o aviso.
- O modelo **espiral** de Barry Boehm foi um dos primeiros a colocar a palavra **"risco"** no centro do processo — uma ideia que hoje parece óbvia, mas foi revolucionária.
- A **curva do custo da mudança** foi popularizada por Barry Boehm nos anos 1980 e é uma das justificativas mais citadas para o movimento ágil e para práticas como testes automatizados.
- Antes do software, esses modelos vieram da **engenharia tradicional** (civil, manufatura), onde o Cascata faz muito mais sentido: você realmente não quer "iterar" a fundação de um prédio depois de erguer 20 andares. Software é diferente justamente por ser **maleável** — e foi demorado perceber isso.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Processo de desenvolvimento** | A sequência de etapas que um time segue para transformar ideia em software. |
| **Cascata (Waterfall)** | Fases em sequência linear; cada uma só começa quando a anterior termina. |
| **Incremental** | Entregar o software em pedaços prontos, somando funcionalidades. |
| **Iterativo** | Refinar o mesmo produto em rodadas, melhorando a cada passagem. |
| **Espiral** | Modelo iterativo guiado pelos riscos, atacados primeiro com protótipos. |
| **Fase** | Uma etapa do trabalho: requisitos, design, código, testes, deploy, manutenção. |
| **Curva do custo da mudança** | Quanto mais tarde o erro é descoberto, mais caro é corrigi-lo. |
| **Ciclo de feedback** | O tempo entre fazer algo e receber retorno se estava certo. |
| **Híbrido (wagile)** | Misturar planejamento formal com execução ágil. |

---

## 📝 Resumo

- Um **processo de desenvolvimento** define a ordem e o tamanho dos ciclos pelos quais o time passa pelas fases (requisitos → design → código → testes → deploy → manutenção).
- O **Cascata** faz as fases uma vez, em sequência. É simples e documentável, mas empurra a descoberta de erros para o fim, quando corrigir é caro — perigoso quando os requisitos mudam (quase sempre).
- Os modelos **incremental** (somar pedaços prontos) e **iterativo** (refinar o mesmo produto em rodadas) encurtam o ciclo e trazem feedback cedo; na prática são usados juntos.
- O **espiral** organiza o trabalho em torno dos **riscos**, sendo indicado para projetos grandes e críticos.
- A lei que une tudo é a **curva do custo da mudança**: descobrir erros cedo é barato; descobri-los em produção é caro. Essa é a semente do **ágil**.
- Nenhum modelo é "o certo": escolhe-se conforme o projeto, o cliente, o risco e a incerteza.

---

## ☑️ Checklist de aprendizado

- [ ] Sei explicar o que é um processo de desenvolvimento e por que times precisam de um.
- [ ] Descrevo o modelo Cascata e digo suas vantagens e seu problema central.
- [ ] Diferencio incremental de iterativo com um exemplo próprio.
- [ ] Entendo o que torna o modelo espiral "dirigido a risco".
- [ ] Explico a curva do custo da mudança e por que ela justifica o ágil.
- [ ] Percebo que a escolha do modelo depende do contexto do projeto.

---

## ✏️ Exercícios

**1.** Com suas palavras, explique por que o modelo Cascata é arriscado quando os requisitos do cliente costumam mudar durante o projeto.

**2.** Classifique cada situação como **incremental** ou **iterativo**: (a) o time entrega primeiro o login pronto, depois o carrinho pronto, depois o pagamento pronto; (b) o time entrega o app inteiro numa versão feia e sem polimento, e a cada rodada melhora o visual e a performance de tudo.

**3.** Uma empresa vai construir o software de controle de um equipamento hospitalar, onde uma falha pode ferir pacientes. Qual modelo tende a fazer mais sentido e por quê?

**4.** Explique a "curva do custo da mudança" e dê um exemplo de um mesmo erro custando pouco numa fase e muito em outra.

**5. (Reflexão)** A Ana quer lançar a SaborExpress em 3 semanas para testar com clientes reais. Que modelo você recomendaria e como dividiria o trabalho para que ela aprendesse cedo o que o usuário realmente quer?

---

## 💬 Respostas comentadas

**1.** Porque no Cascata o cliente só vê o produto **no fim**. Se um requisito foi mal entendido ou mudou, o erro atravessou todas as fases sem ser percebido e só aparece na entrega — quando corrigir exige reescrever design, código e testes. O modelo não tem um ponto natural para absorver mudança no meio do caminho, então mudar é caro e traumático.

**2.** (a) **Incremental** — cada entrega é um pedaço novo e pronto do sistema, somado aos anteriores. (b) **Iterativo** — é o mesmo produto inteiro sendo refinado rodada após rodada. (Na prática moderna, os dois andam juntos: cada iteração produz um incremento.)

**3.** O **espiral** (ou um modelo formal/híbrido bem documentado) tende a fazer sentido, porque o **risco** é altíssimo — uma falha fere pessoas. O espiral ataca os maiores riscos primeiro, com protótipos e análise a cada ciclo, e combina bem com a documentação e rastreabilidade que setores regulados exigem. Iterar "rápido e sujo" como numa startup seria irresponsável aqui.

**4.** É o princípio de que o custo de corrigir um erro **cresce** conforme ele é descoberto mais tarde. Exemplo: perceber, na conversa de requisitos, que "entrega grátis" só vale acima de R$50 custa editar uma frase; descobrir isso **em produção**, depois de o sistema já ter dado frete grátis para todo mundo e gerado prejuízo, custa código novo, testes, deploy de correção e dinheiro perdido.

**5.** Modelo **iterativo/incremental** (base do ágil). Eu recomendaria fatiar em um **MVP**: só o essencial para um pedido acontecer de ponta a ponta — ver poucos restaurantes, montar carrinho, finalizar pedido (pagamento na entrega, sem cupom nem chat). Colocaria na mão de um grupo pequeno de clientes reais, coletaria feedback e dados de uso, e usaria isso para decidir o incremento seguinte. Assim a Ana aprende cedo e barato o que o usuário quer, em vez de apostar meses num chute.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[42-O-Manifesto-Agil]] — como a lição "erre cedo e barato" virou um movimento com valores e princípios.
- **Base deste tema:** [[10-O-ciclo-de-vida-do-software]] (Vol. 1) — as fases pelas quais todo modelo passa.
- **Aplicação imediata:** [[43-Scrum-na-pratica]] e [[44-Kanban-e-fluxo-continuo]] — os dois jeitos ágeis mais usados de organizar o trabalho.
- **Aplicação futura:** [[49-MVP-priorizacao-e-validacao]] — como fatiar o produto para aprender cedo, e Volume 4 (entrega contínua) — encurtar o ciclo até o extremo.

---

> 🧭 **Você está aqui:** Volume 3 → Módulo 12 → **Capítulo 41 de 119**.
