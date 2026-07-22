# Capítulo 36 — Como um projeto real é organizado ⭐

> **Volume 2 — A Base da Computação** · Módulo 10 — Por dentro do código
> Coleção: *Do Estudante ao Engenheiro de Software*
> ⭐ **Capítulo-marco:** o mapa das pastas de um projeto profissional — o que cada uma faz.

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender por que projetos reais têm **muitas pastas** e uma estrutura organizada (e não um arquivo gigante).
- Reconhecer as pastas típicas de um back-end: `src/`, `controllers/`, `services/`, `repositories/`, `models/`, `middlewares/`, `routes/`, `config/`, `utils/`, `tests/`.
- Entender o **fluxo de uma requisição** atravessando essas camadas (route → controller → service → repository → banco).
- Reconhecer os **arquivos de configuração** comuns (`package.json`, `.env`, `.gitignore`, `README`, `Dockerfile`).
- Abrir um projeto desconhecido e **saber por onde começar** a se orientar.
- Ligar a organização de pastas aos princípios de design (separação de responsabilidades).

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 20 minutos explorando um projeto real.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- [[35-Principios-de-design-e-design-patterns]] (separação de responsabilidades, acoplamento/coesão) e [[33-Paradigmas-e-orientacao-a-objetos]].
- [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]] (pastas e caminhos).

---

## 📖 Introdução

Você abre um projeto profissional pela primeira vez — no seu primeiro estágio, ou num repositório do GitHub — e encontra **dezenas de pastas e centenas de arquivos**. O coração aperta: "por onde eu começo? o que é cada coisa?". Essa sensação de estar perdido é **universal**; todo mundo passa por ela. A diferença entre travar e se orientar é conhecer o **mapa** — e é exatamente isso que este capítulo entrega.

A boa notícia: apesar de cada projeto ter suas particularidades, existe uma **estrutura recorrente** que se repete na maioria dos sistemas. Uma vez que você entende o papel de `controllers/`, `services/`, `repositories/` e companhia, você consegue chegar em quase qualquer projeto e, em minutos, saber onde procurar o quê. É como aprender a planta padrão de um hospital: pode mudar de prédio, mas você sabe onde fica a emergência, a recepção, o centro cirúrgico.

Este é um capítulo-marco porque marca sua transição de "quem estuda conceitos" para "quem entra num código de verdade". É o passaporte para os Módulos 10 e 11 (ler código e documentação) e para o seu primeiro dia em qualquer empresa.

---

## 🧠 Analogia

Pense num **restaurante bem organizado** — voltando à cozinha das nossas analogias, mas agora o **prédio inteiro**.

Um restaurante não é um cômodo único onde tudo acontece misturado. Ele tem **áreas com funções claras**: a **recepção** (que recebe o cliente e encaminha), o **salão** (garçons que anotam e levam pedidos), a **cozinha** (que prepara), o **estoque/despensa** (que guarda os ingredientes), o **escritório** (regras, configurações, contratos). Cada área tem uma responsabilidade, e o pedido **flui** entre elas numa ordem: recepção → garçom → cozinha → despensa → volta como prato.

Um projeto de software bem organizado é igual:

- A **recepção/roteamento** decide para onde vai cada pedido → `routes/`.
- O **garçom** recebe o pedido e coordena → `controllers/`.
- A **cozinha** faz o trabalho de verdade (as regras do negócio) → `services/`.
- A **despensa** busca e guarda os ingredientes (os dados) → `repositories/`.
- O **escritório** guarda regras e configurações → `config/`.

Guarde: **cada pasta é uma "área do restaurante" com uma responsabilidade; o pedido flui entre elas numa ordem previsível.** Entender esse fluxo é entender o projeto.

---

## 🧩 Conceitos fundamentais

### 1. Por que tantas pastas? Separação de responsabilidades

Um projeto poderia ser um único arquivo gigante — e alguns iniciantes fazem isso. Mas, como você viu no [[34-Codigo-limpo]] e no [[35-Principios-de-design-e-design-patterns]], misturar tudo gera acoplamento e caos. A estrutura de pastas materializa a **separação de responsabilidades**: cada tipo de trabalho (receber requisição, aplicar regra de negócio, acessar o banco) mora em seu lugar. Isso torna o projeto **navegável, testável e mudável** — os objetivos do módulo anterior, agora em forma de diretórios.

### 2. `src/` — onde mora o código-fonte

Quase todo projeto tem uma pasta **`src/`** (de *source*, fonte): é onde fica o **código de verdade** da aplicação. Fora dela ficam coisas de apoio: configurações, dependências, documentação. Primeira dica de orientação: **comece pelo `src/`**.

### 3. As camadas clássicas de um back-end

Dentro de `src/`, a estrutura mais comum (especialmente em APIs) segue **camadas**, cada uma numa pasta:

- **`routes/` (rotas):** o "mapa de endereços". Define quais URLs existem e para qual controller cada uma vai. Ex.: `POST /pedidos` → controller de pedidos.
- **`controllers/` (controladores):** recebem a requisição, extraem os dados, chamam quem faz o trabalho e devolvem a resposta. **Coordenam**, mas não contêm a regra de negócio pesada. (O "garçom".)
- **`services/` (serviços):** o **coração da regra de negócio**. Aqui mora a lógica de verdade: calcular o total, aplicar cupom, validar se o pedido é permitido. (A "cozinha".)
- **`repositories/` (repositórios):** cuidam do **acesso aos dados** — buscar e salvar no banco de dados. Isolam o resto do sistema dos detalhes do banco. (A "despensa".)
- **`models/` (modelos):** definem o **formato dos dados** — o que é um `Pedido`, um `Cliente` (atributos, tipos). Ligam-se às classes da OO ([[33-Paradigmas-e-orientacao-a-objetos]]) e às tabelas do banco (Volume 3).

> **Termo explicado — arquitetura em camadas:** organização do código em camadas com responsabilidades distintas (rota → controller → service → repository → banco), cada uma dependendo só da seguinte. Reduz acoplamento (é o "D" do SOLID em ação).

### 4. As pastas de apoio

- **`middlewares/`:** "filtros" que a requisição atravessa **antes** de chegar ao controller — ex.: verificar se o usuário está autenticado, registrar logs, validar dados. (O "segurança na porta" que checa todo mundo que entra.)
- **`config/`:** configurações do projeto — conexão com o banco, chaves, parâmetros de ambiente (ligado às **variáveis de ambiente**, [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]]).
- **`utils/` (ou `helpers/`):** funções auxiliares genéricas usadas em vários lugares (formatar data, gerar código). O "canto das ferramentas".
- **`tests/`:** os testes automatizados do projeto (Volume 3, Módulo 24). Um projeto profissional **sempre** tem testes.

### 5. Os arquivos que vivem na raiz

Fora do `src/`, na raiz do projeto, moram arquivos de configuração e metadados. Reconhecê-los é meio caminho para entender qualquer projeto:

- **`README.md`:** a "porta de entrada" — explica o que é o projeto e como rodá-lo. **Sempre leia primeiro** ([[38-Como-ler-documentacao]]).
- **`package.json`** (Node) / **`requirements.txt`** (Python) / **`pom.xml`** (Java): listam as **dependências** (bibliotecas de terceiros que o projeto usa) e comandos.
- **`.gitignore`:** diz ao Git o que **não** versionar (segredos, dependências, arquivos gerados). Ligado ao Git (Volume 3).
- **`.env`:** guarda as **variáveis de ambiente** locais (senhas, chaves). Nunca vai para o repositório (está no `.gitignore`!) — reveja [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]].
- **`Dockerfile`:** a "receita" para empacotar o projeto num container (Volume 4).

### 6. Não existe uma estrutura única

Importante: **essa organização é uma convenção comum, não uma lei.** Projetos variam: alguns organizam por **funcionalidade** (uma pasta `pedidos/` com tudo de pedidos junto) em vez de por **camada** (`controllers/`, `services/`...). Front-end tem suas próprias pastas (`components/`, `pages/`, `hooks/` — Volume 3). O que **não** varia é o princípio: **coisas com responsabilidades diferentes ficam separadas, de forma previsível.** Aprenda o padrão comum e você se adapta às variações rápido.

---

## ⚙️ Como funciona na prática

O jeito mais poderoso de entender a estrutura é seguir **o caminho de uma requisição** pelas pastas. Vamos rastrear "um cliente faz um pedido" na SaborExpress:

```
Cliente toca "Confirmar pedido" no app
        ↓  (chega uma requisição HTTP: POST /pedidos)
1. routes/pedidos.route      → "POST /pedidos vai para o PedidoController"
        ↓
2. middlewares/auth          → "esse usuário está logado? sim." (senão, barra aqui)
        ↓
3. controllers/PedidoController → recebe os dados do pedido, chama o service
        ↓
4. services/PedidoService    → A REGRA DE NEGÓCIO: valida itens, calcula total,
                               aplica cupom, decide o frete  (a "cozinha")
        ↓
5. repositories/PedidoRepository → salva o pedido no BANCO DE DADOS (a "despensa")
        ↓
6. o service devolve o resultado ao controller
        ↓
7. controllers/PedidoController → monta a resposta HTTP (201 Created) e devolve ao app
```

Repare na beleza da organização: **cada pasta fez só a sua parte**. A rota apenas direcionou; o middleware apenas checou a autenticação; o controller apenas coordenou; o service concentrou toda a **lógica de negócio**; o repository apenas conversou com o banco. Se amanhã a Ana mudar a regra de cupom, você sabe exatamente onde ir: **no `services/`**. Se o banco de dados mudar, mexe-se só no `repositories/`, sem tocar na regra de negócio. Isso é **baixo acoplamento e alta coesão** ([[35-Principios-de-design-e-design-patterns]]) virando pastas de verdade.

E é por isso que este mapa é tão valioso: diante de qualquer tarefa ("corrigir o cálculo do frete", "adicionar um campo no pedido", "mudar como salvamos no banco"), a estrutura te diz **onde procurar** sem precisar ler o projeto inteiro. Você deixa de vagar no escuro e passa a navegar com propósito. É a diferença entre um mapa e um labirinto.

---

## 🍔 Aplicação na SaborExpress

**O projeto da SaborExpress espelha o negócio.** Se você abrisse o repositório do back-end da SaborExpress, encontraria essa estrutura viva: em `models/`, as definições de `Pedido`, `Cliente`, `Restaurante`, `Prato`, `Entregador` (as "coisas" da OO, [[33-Paradigmas-e-orientacao-a-objetos]]); em `services/`, a lógica que dá vida a cada uma (`PedidoService` com o cálculo de total e frete que vimos no [[30-Logica-de-programacao-sem-trauma]]); em `repositories/`, o acesso ao banco onde tudo é guardado. O código **conta a história do negócio** — e alguém que entende o negócio consegue navegar o código, e vice-versa.

**Onde o dev novo da Ana começa.** Quando a Ana contrata um desenvolvedor, no primeiro dia ele vai abrir o projeto e — se conhecer este mapa — vai direto ao `README.md` para saber como rodar, depois ao `src/` para ver as camadas, e vai seguir uma requisição de exemplo (route → controller → service → repository) para entender o fluxo. Em uma tarde, ele já sabe se orientar. Sem esse mapa, ele passaria dias perdido, abrindo arquivos ao acaso. A produtividade do novo membro depende diretamente de o projeto ser bem organizado **e** de ele conhecer o padrão.

**Organização é o que permite crescer o time.** Enquanto a SaborExpress era só a Ana e um dev, qualquer estrutura servia. Mas quando o time cresce para dez pessoas mexendo no mesmo código, a separação em camadas é o que evita que todos tropecem uns nos outros: um trabalha no `services/` de pagamentos enquanto outro mexe no `controllers/` de restaurantes, sem colisão. A estrutura de pastas é, na prática, uma ferramenta de **colaboração em escala** — o que conecta com Git e trabalho em equipe (Volume 3).

---

## 🏢 Como isso acontece em uma empresa

- **Seu primeiro dia será "se achar no projeto".** Onboarding em qualquer empresa começa por entender a estrutura do código. Quem conhece o padrão comum se integra muito mais rápido — é uma vantagem concreta na carreira.
- **A estrutura reflete a arquitetura.** Como o projeto é dividido em pastas revela decisões de arquitetura (Volume 3): camadas, módulos, monólito vs. microsserviços. Ler a estrutura é o primeiro passo para entender o sistema.
- **Consistência é valorizada.** Times mantêm a estrutura consistente para que qualquer pessoa saiba onde colocar (e achar) cada coisa. "Onde vai esse código?" tem resposta óbvia num projeto bem organizado.
- **Convenções sobre configuração.** Muitos frameworks (você verá no Volume 3) já impõem uma estrutura de pastas padrão — assim, todo projeto naquele framework se parece, e você aprende um e reconhece todos. É por isso que conhecer o padrão rende tanto.

---

## ⚠️ Erros comuns

- **Tentar ler o projeto inteiro de uma vez.** É impossível e desnecessário. Entenda a **estrutura** e siga **um fluxo** (uma requisição). Você não lê um dicionário do começo ao fim.
- **Ignorar o `README`.** Ele existe justamente para te orientar (como rodar, o que é cada coisa). Pular o README e sair abrindo arquivos ao acaso é perder o mapa que te deram.
- **Achar que toda estrutura é igual.** O padrão de camadas é comum, mas não universal. Front-end, projetos por funcionalidade e frameworks específicos variam. Aprenda o princípio (separação), não decore uma única árvore de pastas.
- **Colocar código no lugar errado.** Enfiar regra de negócio no controller, ou acesso ao banco no service, quebra a separação e cria acoplamento. Respeite o papel de cada camada.
- **Confundir código-fonte com dependências.** A pasta de dependências (`node_modules/`, `venv/`...) tem o código de **terceiros**, não o seu. Não é ali que você trabalha nem procura os bugs do projeto.

---

## 💡 Dicas profissionais

- **Ao abrir um projeto novo, siga o ritual: README → `src/` → seguir uma requisição.** Esse trio te orienta em minutos em quase qualquer projeto. É o método deste capítulo.
- **Deixe a estrutura te guiar até a tarefa.** "Preciso mudar a regra de frete" → vá ao `services/`. "Preciso mudar como salvo dados" → `repositories/`. A pasta certa economiza horas de leitura.
- **Respeite as camadas ao escrever.** Coloque cada coisa no seu lugar: regra no service, acesso a dados no repository, coordenação no controller. Isso mantém o projeto navegável para todo o time (e para você).
- **Observe se o projeto organiza por camada ou por funcionalidade.** Reconhecer o estilo de organização logo de cara acelera muito a navegação.
- **Use a busca do editor com inteligência.** Combinada com a estrutura, buscar por um nome (`calcularFrete`) te leva direto ao ponto. É a versão "IDE" do `grep` ([[25-Terminal-e-comandos-essenciais]]).

---

## 🎈 Curiosidades

- Muitos frameworks modernos seguem a filosofia **"convenção sobre configuração"** (popularizada pelo Ruby on Rails): em vez de você configurar tudo, o framework **assume** uma estrutura de pastas padrão. O benefício: todo projeto se parece, e desenvolvedores trocam de projeto sem reaprender a organização.
- A separação **controller / service / repository** é uma versão prática do padrão arquitetural **MVC** (Model-View-Controller) e de "arquitetura em camadas", que você estudará formalmente no Volume 3. Você está vendo a teoria "na natureza" antes de vê-la no quadro.
- A pasta **`node_modules/`** de projetos JavaScript é motivo de piada famosa por ser **gigantesca** — chega a ter dezenas de milhares de arquivos, sendo "o objeto mais pesado do universo". É por isso que ela nunca vai para o repositório (fica no `.gitignore`); ela é reconstruída a partir do `package.json`.
- O arquivo **`README`** tem esse nome (em maiúsculas, "LEIA-ME") por uma tradição antiga de software: era o arquivo que gritava "comece por aqui". A convenção sobreviveu décadas e é universal — sempre haverá um README te esperando.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **`src/`** | Pasta onde mora o código-fonte da aplicação. |
| **`routes/`** | Define as URLs e para qual controller cada uma vai. |
| **`controllers/`** | Recebem a requisição, coordenam e devolvem a resposta. |
| **`services/`** | O coração da regra de negócio (a lógica de verdade). |
| **`repositories/`** | Cuidam do acesso aos dados (buscar/salvar no banco). |
| **`models/`** | Definem o formato dos dados (Pedido, Cliente...). |
| **`middlewares/`** | Filtros que a requisição atravessa antes do controller (auth, logs). |
| **`config/`** | Configurações do projeto (banco, chaves, ambiente). |
| **`utils/` / `helpers/`** | Funções auxiliares genéricas reutilizáveis. |
| **`tests/`** | Os testes automatizados do projeto. |
| **Arquitetura em camadas** | Organização em níveis com responsabilidades distintas. |
| **`README` / `package.json` / `.env` / `.gitignore`** | Arquivos de apoio na raiz (orientação / dependências / segredos / o que não versionar). |

---

## 📝 Resumo

- Projetos reais têm **muitas pastas** porque materializam a **separação de responsabilidades** ([[35-Principios-de-design-e-design-patterns]]): cada tipo de trabalho no seu lugar, de forma previsível.
- O código-fonte fica em **`src/`**, tipicamente em **camadas**: `routes/` (mapa de URLs) → `controllers/` (coordenam) → `services/` (regra de negócio) → `repositories/` (dados) → banco; com apoio de `models/`, `middlewares/`, `config/`, `utils/` e `tests/`.
- Na raiz vivem os arquivos de apoio: **`README`** (comece por ele), dependências (`package.json`/`requirements.txt`), `.gitignore`, `.env` e `Dockerfile`.
- Seguir **o fluxo de uma requisição** pelas camadas é a melhor forma de entender um projeto — e mostra o **baixo acoplamento/alta coesão** em ação (mudou a regra? vá ao service; mudou o banco? vá ao repository).
- A estrutura é **convenção comum, não lei**: varia por framework, front/back e por camada vs. funcionalidade. Aprenda o **princípio** e você navega qualquer projeto.
- Conhecer esse mapa é o que transforma "estar perdido num projeto grande" em "saber por onde começar" — seu passaporte para o mercado.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo por que projetos têm muitas pastas (separação de responsabilidades).
- [ ] Sei o papel de routes, controllers, services, repositories e models.
- [ ] Consigo seguir o fluxo de uma requisição pelas camadas.
- [ ] Reconheço middlewares, config, utils e tests.
- [ ] Identifico os arquivos de raiz (README, package.json, .env, .gitignore).
- [ ] Sei por onde começar ao abrir um projeto desconhecido.

---

## ✏️ Exercícios

**1.** Explique, com a analogia do restaurante (ou uma sua), o papel de `controllers/`, `services/` e `repositories/`.

**2.** Descreva o caminho de uma requisição "criar pedido" pelas pastas, na ordem correta.

**3.** Você precisa mudar a regra de "frete grátis acima de R$ 50" na SaborExpress. Em qual pasta você provavelmente vai mexer, e por quê? E se precisar mudar o banco de dados usado?

**4.** O que é o `README.md` e por que ele deve ser a primeira coisa que você abre num projeto novo? E o que faz o `.env`?

**5. (Reflexão)** Por que separar o código em camadas (em vez de um arquivo gigante) facilita tanto o trabalho de um time de dez pessoas quanto a manutenção futura? Conecte com "baixo acoplamento, alta coesão".

---

## 💬 Respostas comentadas

**1.** Resposta pessoal. **`controllers/`** são os garçons: recebem o pedido do cliente e coordenam, sem cozinhar. **`services/`** são a cozinha: contêm a regra de negócio de verdade (calcular, validar, aplicar cupom). **`repositories/`** são a despensa: buscam e guardam os ingredientes (os dados no banco). Cada área com sua responsabilidade, e o pedido flui entre elas.

**2.** `routes/` (direciona `POST /pedidos` ao controller) → `middlewares/` (checa autenticação) → `controllers/` (recebe os dados, coordena) → `services/` (aplica a regra de negócio: valida, calcula total/frete/cupom) → `repositories/` (salva no banco) → volta ao `controllers/` (monta a resposta HTTP e devolve).

**3.** Provavelmente no **`services/`** (ex.: `PedidoService`), porque é onde mora a **regra de negócio** — o cálculo do frete. Mudar o **banco de dados** usado envolveria o **`repositories/`** (e talvez `config/` para a conexão), sem tocar na regra de negócio. Essa separação é justamente a vantagem: cada tipo de mudança tem seu lugar isolado.

**4.** O **`README.md`** é a porta de entrada do projeto: explica o que ele é e, principalmente, **como rodá-lo** e se orientar. Deve ser o primeiro a abrir porque é o mapa que os autores deixaram para você — pular isso é ignorar as instruções e se perder à toa. O **`.env`** guarda as **variáveis de ambiente** locais (senhas, chaves), mantidas fora do repositório (via `.gitignore`) por segurança.

**5.** Porque as camadas dão **baixo acoplamento** (cada parte depende pouco das outras: mudar o banco no repository não afeta a regra no service) e **alta coesão** (cada pasta tem um foco único). Para o **time**, isso significa que várias pessoas trabalham em partes diferentes sem colidir, e cada uma sabe onde colocar/achar código. Para a **manutenção**, significa que uma mudança fica contida em uma camada, sem efeito dominó pelo sistema — exatamente o objetivo de "mudar sem quebrar" do capítulo de design.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[37-Anatomia-de-um-projeto-no-GitHub]] — o mesmo projeto, agora hospedado e colaborativo no GitHub.
- **Base imediata:** [[35-Principios-de-design-e-design-patterns]] (a separação de responsabilidades que as pastas materializam).
- **Continua em:** [[38-Como-ler-documentacao]] e [[39-Engenharia-reversa-entrar-num-projeto-gigante]] — orientar-se em projetos que você não escreveu.
- **Aplicação futura:** Volume 3 (Arquitetura — MVC e camadas formalizados; Back-end — construir essas pastas de verdade).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 10 → **Capítulo 36 de 119**.
