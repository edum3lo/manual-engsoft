# Capítulo 22 — Processos, threads e memória RAM

> **Volume 2 — A Base da Computação** · Módulo 5 — Sistemas Operacionais
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é um **processo** e o que é uma **thread**, e a diferença entre eles.
- Explicar como o SO faz vários programas rodarem "ao mesmo tempo" com **escalonamento** e troca de contexto.
- Diferenciar **concorrência** de **paralelismo**.
- Compreender como o SO divide e protege a **memória RAM** entre processos.
- Reconhecer problemas clássicos: **memory leak**, processo "zumbi", travamento por falta de memória e *race conditions*.
- Ligar tudo isso ao software real: por que um servidor "aguenta" muitos usuários e por que às vezes ele engasga.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- [[19-Bits-processador-e-memoria]] (CPU, núcleos, RAM) e [[21-O-que-e-um-sistema-operacional-e-o-kernel]] (o SO como gerente de recursos).

---

## 📖 Introdução

Você já reparou que o computador faz **várias coisas ao mesmo tempo**? Enquanto você lê isto no navegador, um app de música toca, o antivírus roda no fundo, mensagens chegam. Mas espere: no [[19-Bits-processador-e-memoria]] vimos que a CPU faz **uma instrução de cada vez**. Como um único processador (ou poucos núcleos) dá conta de dezenas de programas simultâneos?

A resposta está numa das ideias mais elegantes da computação: o SO **reveza** os programas na CPU tão rápido que a ilusão de simultaneidade é perfeita. Este capítulo revela o truque — e, com ele, os conceitos de **processo**, **thread** e **gerência de memória**, que estão por trás de perguntas muito práticas: por que um app trava? por que um servidor "só aguenta X usuários"? por que um programa "vaza memória" e derruba a máquina de madrugada?

Este é o capítulo mais "meat" do módulo de SO. Ele exige um pouco mais de atenção, mas destrava um entendimento que vai te servir da programação ao DevOps.

---

## 🧠 Analogia

Volte à cozinha de um restaurante com **um único cozinheiro muito rápido** (a CPU/núcleo).

Chegam vários pedidos ao mesmo tempo (vários **programas**). O cozinheiro não consegue cozinhar dois pratos literalmente no mesmo instante — ele tem duas mãos e um fogão. Mas ele faz algo esperto: **reveza**. Dá uma mexida no risoto, vira o bife, checa a massa, volta pro risoto — pulando de tarefa em tarefa tão rápido que, de fora, parece que todos os pratos avançam "juntos". Isso é **concorrência**, e a troca entre tarefas é a **troca de contexto**. Quem decide "agora mexe no risoto, agora no bife" é o **maître organizando a fila** — o **escalonador** do SO.

Cada **pedido** é um **processo**: tem sua própria comanda, seus ingredientes separados (sua memória), e não mistura com os outros. Se o mesmo prato exige duas etapas que podem andar em paralelo (fritar e montar a salada), o cozinheiro pode ter **dois ajudantes cuidando do mesmo pedido** — essas são as **threads** de um processo: várias linhas de trabalho **dentro** do mesmo prato, compartilhando os mesmos ingredientes.

E se a cozinha tem **vários cozinheiros** (vários **núcleos**), aí sim pratos diferentes cozinham *de verdade* ao mesmo tempo — isso é **paralelismo**. Guarde: **concorrência = revezar rápido; paralelismo = fazer de fato ao mesmo tempo.**

---

## 🧩 Conceitos fundamentais

### 1. Processo: um programa vivo, com sua própria casa

Você já viu no [[20-Como-um-computador-inicia-e-roda-um-programa]]: um **processo** é um programa em execução. Aprofundando: cada processo tem:

- Seu **próprio espaço de memória** (RAM reservada), isolado dos outros. O processo A não enxerga nem estraga a memória do processo B.
- Um **identificador (PID)**, um número único que o SO usa para controlá-lo.
- Seu estado: rodando, esperando, pausado.

> **Termo explicado — processo:** um programa em execução, com seu próprio espaço de memória isolado e um identificador (PID). É a "unidade" que o SO gerencia.

Esse **isolamento** é uma bênção: se um processo trava ou é corrompido, ele cai sozinho, sem derrubar os outros (é a mesma cerca de segurança do capítulo anterior). Quando o navegador fecha uma aba com erro mas os outros programas seguem firmes, é o isolamento de processos trabalhando.

### 2. Thread: várias linhas de trabalho dentro do mesmo processo

Às vezes, um único programa precisa fazer várias coisas ao mesmo tempo: um editor de texto que **verifica ortografia** enquanto você **digita** e **salva automaticamente** no fundo. Cada uma dessas "linhas de execução" é uma **thread**.

> **Termo explicado — thread:** uma linha de execução dentro de um processo. Um processo pode ter várias threads, e todas **compartilham a mesma memória** do processo.

A diferença crucial:

- **Processos** são isolados — cada um com sua memória. Trocar informação entre processos é mais "burocrático".
- **Threads** do mesmo processo **compartilham a memória** — comunicam-se fácil, mas por isso podem **pisar no dado uma da outra** (o problema de *race condition*, mais adiante).

### 3. Escalonamento e troca de contexto: a ilusão da simultaneidade

Com mais processos do que núcleos, o SO usa o **escalonador (scheduler)**: ele dá a cada processo uma **fatia minúscula de tempo** de CPU (milissegundos), depois pausa e passa para o próximo, e assim por diante, em rodízio velocíssimo. Essa troca — salvar onde o processo parou e carregar o próximo — é a **troca de contexto (context switch)**.

> **Termo explicado — escalonador (scheduler):** a parte do SO que decide qual processo/thread usa a CPU a cada instante, revezando todos rapidamente.

> **Termo explicado — troca de contexto:** o ato de pausar um processo (salvando seu estado) e retomar outro. Acontece milhares de vezes por segundo. É rápida, mas não gratuita.

Como o rodízio é rápido demais para o olho perceber, temos a **ilusão** de que tudo roda simultaneamente. É o cozinheiro pulando entre panelas.

### 4. Concorrência × paralelismo

Duas palavras que soam iguais e não são:

- **Concorrência:** lidar com várias tarefas *ao longo do tempo*, revezando (um cozinheiro, várias panelas). Existe mesmo com **um só núcleo**.
- **Paralelismo:** executar várias tarefas *no mesmo instante físico* (vários cozinheiros). Exige **vários núcleos**.

Um programa pode ser concorrente sem ser paralelo (revezando num núcleo só) e, com vários núcleos, pode ser as duas coisas. Essa distinção importa muito quando você quiser deixar um programa mais rápido: às vezes o gargalo não some só por "dividir em threads" se houver um núcleo só.

### 5. Como o SO divide e protege a memória RAM

Cada processo enxerga sua memória como se tivesse a RAM inteira só para si — uma ilusão criada pelo SO chamada **memória virtual**. Na prática, o SO mapeia esses "endereços virtuais" para pedaços reais da RAM, e:

- **Isola:** um processo não consegue ler nem escrever na memória de outro (segurança e estabilidade).
- **Faz malabarismo quando falta RAM:** se a memória física lota, o SO empurra pedaços menos usados para o disco (a chamada *swap*). Isso salva a máquina de travar, mas é **lento** — por isso o computador "arrasta" quando falta memória.

> **Termo explicado — memória virtual:** ilusão dada pelo SO de que cada processo tem sua própria memória contínua e privada, mapeada por baixo para a RAM real (e, se preciso, para o disco via *swap*).

### 6. Os problemas clássicos (que você vai encontrar de verdade)

- **Memory leak (vazamento de memória):** um programa vai reservando memória e **esquece de liberar**. Com o tempo, ocupa RAM sem parar até a máquina engasgar. É uma das causas mais comuns de servidores que "degradam ao longo do dia" e melhoram após um reinício.
- **Processo travado / zumbi:** um processo que emperrou ou terminou mal e ficou "pendurado", ocupando recursos. Muitas vezes a solução emergencial é "matar" o processo (você fará isso no terminal, [[25-Terminal-e-comandos-essenciais]]).
- **Estouro de memória (OOM):** quando a RAM acaba de vez, o SO escolhe um processo e o **mata** para salvar o sistema (o "OOM killer" no Linux). Seu servidor "morreu sozinho de madrugada"? Pode ter sido isto.
- **Race condition (condição de corrida):** duas threads mexem no mesmo dado ao mesmo tempo e o resultado sai errado, dependendo de quem chegou primeiro. É um bug traiçoeiro (às vezes acontece, às vezes não) que nasce justamente do compartilhamento de memória entre threads.

> **Termo explicado — race condition:** erro que ocorre quando duas ou mais linhas de execução acessam/alteram o mesmo dado ao mesmo tempo, e o resultado depende da ordem imprevisível em que rodaram.

---

## ⚙️ Como funciona na prática

Vamos ver o escalonador em ação com três programas e um núcleo só:

```
Tempo →   (cada bloco = alguns milissegundos de CPU)

Núcleo:  [Navegador][Música][Editor][Navegador][Música][Editor][Navegador]...
                ↑        ↑       ↑
           troca de   troca   troca
           contexto  contexto contexto

Para você, humano: os três parecem rodar JUNTOS o tempo todo.
Na realidade: a CPU está revezando entre eles milhares de vezes por segundo.
```

Agora um caso com **memória**, mostrando um *memory leak* derrubando um servidor:

```
09h  servidor sobe, usando 400 MB de RAM        → tudo ok
12h  após milhares de requisições, 1,2 GB       → começa a arrastar (bug: não libera memória)
15h  2,8 GB, perto do limite da máquina          → lentidão, respostas atrasando
16h  RAM esgota → o SO (OOM killer) MATA o processo → servidor cai
16h  o sistema reinicia o processo → volta a 400 MB → e o ciclo recomeça
```

Repare como os conceitos se juntam: o **escalonador** cria a ilusão de simultaneidade; a **gerência de memória** mantém os processos isolados e faz malabarismo quando falta RAM; e um **bug de memória** (leak), combinado com o limite físico, produz um incidente real de produção. Diagnosticar isso — "por que o servidor cai todo fim de tarde?" — exige exatamente o vocabulário deste capítulo. Sem ele, o time fica reiniciando a máquina no escuro; com ele, procura o vazamento e resolve a causa.

---

## 🍔 Aplicação na SaborExpress

O servidor da SaborExpress vive e morre por causa destes conceitos.

**Como um servidor "aguenta" muitos clientes.** Quando 5.000 pessoas usam a SaborExpress ao mesmo tempo, o servidor não tem 5.000 CPUs. Ele usa **concorrência**: enquanto uma requisição espera o banco de dados responder (um tempo "ocioso" para a CPU), o SO aproveita para adiantar outra requisição. É o cozinheiro que, enquanto a água ferve, vai picando a cebola do outro pedido. É por isso que um servidor consegue atender muito mais gente do que o número de núcleos que tem — desde que o código não desperdice esse tempo. Otimizar isso é um assunto do Volume 4 ([[92]] e [[94]]).

**O incidente da noite de sexta.** Imagine: numa promoção, o app da SaborExpress trava depois de algumas horas de pico. Investigando, o time descobre um **memory leak** — cada pedido processado deixava um pedacinho de memória sem liberar. Em horas de baixo volume, ninguém percebia; no pico, a RAM esgotou e o **OOM killer** derrubou o processo. Esse é o tipo de bug que só aparece sob carga, e que só se caça entendendo processos e memória. (No Volume 4, você verá como **observabilidade** — [[89]] — dá os gráficos que expõem esse crescimento de memória.)

**A race condition do estoque.** A SaborExpress tem um prato com estoque limitado (só 3 porções da sobremesa do dia). Dois clientes clicam "comprar" no mesmo milissegundo. Duas threads leem "estoque = 1", ambas acham que dá, e ambas vendem — resultado: estoque **-1**, um cliente sem sobremesa e o restaurante bravo. Essa é uma **race condition** clássica, e a solução (transações, travas no banco) você verá no módulo de Banco de Dados (Volume 3). Mas a *causa* — duas linhas de execução mexendo no mesmo dado ao mesmo tempo — é deste capítulo.

---

## 🏢 Como isso acontece em uma empresa

- **"Quantas requisições por segundo aguenta?" é pergunta de negócio.** A capacidade de um servidor depende diretamente de como ele usa processos, threads e memória. Times fazem *testes de carga* para descobrir o limite antes que o cliente descubra.
- **Reiniciar é o "primeiro socorro" — mas não a cura.** Quando um serviço trava por memória, reiniciar o processo resolve na hora (volta ao estado limpo). Mas a equipe madura vai atrás da **causa** (o leak, a race condition), em vez de só reiniciar eternamente.
- **Escalar é multiplicar processos.** Para aguentar mais gente, as empresas sobem **várias cópias** do mesmo servidor (mais processos, em mais máquinas) e distribuem os usuários entre elas (*load balancing*, Volume 4). É concorrência e paralelismo em escala de infraestrutura.
- **Bugs de concorrência são os mais temidos.** Race conditions são difíceis de reproduzir ("na minha máquina nunca acontece") e podem causar prejuízos silenciosos (estoque errado, cobrança dupla). Times investem em código e testes específicos para evitá-las.

---

## ⚠️ Erros comuns

- **Confundir concorrência com paralelismo.** Concorrência é *revezar* (existe até com um núcleo); paralelismo é *fazer ao mesmo tempo* (exige vários núcleos). Nem todo problema se resolve "colocando mais threads".
- **Achar que threads são sempre mais rápidas.** Threads ajudam quando há espera (ex.: esperar o banco). Mas trocar de contexto tem custo, e o compartilhamento de memória abre porta para bugs. Mais threads pode até piorar.
- **Ignorar a liberação de memória.** Reservar memória e esquecer de soltar cria *leaks*. Em serviços que rodam por dias, um vazamento minúsculo vira um desastre acumulado.
- **Subestimar race conditions.** "Só acontece 1 em 10.000 vezes" — com milhões de requisições, isso é dezenas de vezes por dia, cada uma um possível prejuízo.
- **Culpar o hardware quando falta memória.** Às vezes é preciso mais RAM mesmo; mas muitas vezes é o *código* desperdiçando memória. Investigue antes de comprar máquina maior.

---

## 💡 Dicas profissionais

- **Ao ver um serviço que "piora com o tempo e melhora ao reiniciar", suspeite de memory leak.** Esse padrão (degradação gradual + cura pelo restart) é quase uma assinatura de vazamento de memória.
- **Sempre que dois fluxos mexerem no mesmo dado, pergunte "e se acontecerem exatamente ao mesmo tempo?".** Esse reflexo previne race conditions antes de elas nascerem. Estoque, saldo, contadores são zonas de risco.
- **Use as ferramentas do sistema para observar.** No terminal, você verá processos, PIDs, uso de CPU e memória ([[25-Terminal-e-comandos-essenciais]]). Aprender a "ver" o que está rodando é meio caminho para diagnosticar.
- **Prefira soluções do banco de dados para concorrência de dados.** Para o problema do estoque, deixe o banco arbitrar (transações). Não tente resolver "na mão" concorrência crítica — é fácil errar.

---

## 🎈 Curiosidades

- A ideia de **tempo compartilhado** (revezar a CPU entre tarefas) foi revolucionária nos anos 1960 — antes, cada programa rodava sozinho, do início ao fim, e todos os outros esperavam na fila. Multitarefa mudou a computação para sempre.
- O nome **"zumbi"** para processos mortos-mas-não-enterrados é técnico e oficial no mundo Unix/Linux. Há também os processos **"órfãos"** (cujo "pai" morreu) — o SO tem toda uma família de metáforas macabras.
- Uma das falhas mais caras da história, o bug do foguete **Ariane 5** (1996), e vários incidentes de sistemas críticos têm parentesco com problemas de concorrência e memória — lembrete de que estes conceitos não são acadêmicos.
- Linguagens modernas nasceram *tentando resolver a dor da concorrência*: **Go** popularizou as "goroutines" (threads leves) e **Rust** foi projetada para impedir várias race conditions ainda na compilação. A dificuldade deste capítulo é tão real que moldou linguagens inteiras.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Processo** | Um programa em execução, com memória isolada e um PID. |
| **PID** | Número único que identifica um processo. |
| **Thread** | Uma linha de execução dentro de um processo; várias compartilham a memória dele. |
| **Escalonador (scheduler)** | Parte do SO que reveza processos/threads na CPU. |
| **Troca de contexto** | Pausar um processo e retomar outro; acontece milhares de vezes por segundo. |
| **Concorrência** | Lidar com várias tarefas revezando (mesmo com um núcleo). |
| **Paralelismo** | Executar várias tarefas de fato ao mesmo tempo (exige vários núcleos). |
| **Memória virtual** | Ilusão de que cada processo tem sua RAM privada e contínua. |
| **Swap** | Empurrar memória pouco usada para o disco quando a RAM lota (lento). |
| **Memory leak** | Reservar memória e não liberar; ela vaza até esgotar. |
| **OOM killer** | Mecanismo do SO que mata um processo quando a memória se esgota. |
| **Race condition** | Bug quando duas execuções mexem no mesmo dado ao mesmo tempo. |

---

## 📝 Resumo

- Um **processo** é um programa em execução com **memória isolada** e um **PID**; o isolamento faz um cair sem derrubar os outros.
- Uma **thread** é uma linha de execução *dentro* de um processo; várias threads **compartilham a memória** — daí sua agilidade e seus riscos (race conditions).
- O SO cria a ilusão de simultaneidade com o **escalonador**, que reveza processos na CPU via **troca de contexto**, milhares de vezes por segundo.
- **Concorrência** (revezar) ≠ **paralelismo** (fazer ao mesmo tempo, com vários núcleos).
- A **memória virtual** isola e organiza a RAM; quando ela lota, o SO usa **swap** (lento) ou, no limite, **mata** processos (OOM).
- Problemas reais — **memory leak**, processos travados, estouro de memória e **race conditions** — nascem desses mecanismos, e diagnosticá-los exige exatamente este vocabulário.

---

## ☑️ Checklist de aprendizado

- [ ] Diferencio processo de thread e sei por que threads compartilham memória.
- [ ] Entendo como o escalonador cria a ilusão de vários programas ao mesmo tempo.
- [ ] Sei distinguir concorrência de paralelismo.
- [ ] Compreendo como o SO isola e faz malabarismo com a memória (virtual, swap).
- [ ] Reconheço memory leak, OOM e race condition e sei que problema cada um causa.
- [ ] Consigo explicar como um servidor atende mais usuários do que tem núcleos.

---

## ✏️ Exercícios

**1.** Explique, com a analogia da cozinha (ou uma sua), como um único núcleo consegue rodar vários programas "ao mesmo tempo".

**2.** Qual a diferença entre um processo e uma thread? Por que threads se comunicam mais fácil, mas são mais perigosas?

**3.** Diferencie concorrência e paralelismo com um exemplo próprio de cada.

**4.** Um servidor sobe usando 300 MB de RAM e, ao longo do dia, cresce até travar; após reiniciar, volta aos 300 MB e o ciclo repete. Qual é o problema mais provável e por quê?

**5. (Reflexão)** Na SaborExpress, dois clientes compram a última sobremesa no mesmo instante e o estoque fica em -1. Explique o que aconteceu em termos de threads e memória, e por que esse bug é difícil de reproduzir em testes.

---

## 💬 Respostas comentadas

**1.** Resposta pessoal. O núcleo executa uma coisa por vez, mas o **escalonador** dá a cada programa uma fatia minúscula de tempo e reveza velocíssimo (troca de contexto). Como o rodízio é rápido demais para percebermos, temos a ilusão de simultaneidade — como o cozinheiro pulando entre panelas.

**2.** Um **processo** tem memória isolada e um PID; várias **threads** vivem dentro de um processo e **compartilham** a memória dele. Elas se comunicam mais fácil porque enxergam os mesmos dados diretamente — mas por isso mesmo podem alterar o mesmo dado ao mesmo tempo, gerando **race conditions**.

**3.** **Concorrência**: revezar tarefas ao longo do tempo (um cozinheiro cuidando de três panelas; existe mesmo com um núcleo). **Paralelismo**: executar de fato ao mesmo tempo (três cozinheiros, cada um numa panela; exige vários núcleos). Exemplos próprios válidos desde que a distinção "revezar" × "ao mesmo tempo de verdade" fique clara.

**4.** É um **memory leak** (vazamento de memória): o programa reserva memória a cada operação e não a libera, então o uso só cresce até esgotar a RAM — quando o SO mata o processo (OOM). O reinício "cura" porque zera a memória, mas o vazamento recomeça. A cura real é achar e corrigir o trecho que não libera memória.

**5.** Duas **threads** (uma por cliente) leram o estoque quase ao mesmo tempo, ambas viram "1 disponível", ambas decidiram vender e ambas decrementaram — resultando em -1. É uma **race condition**: o resultado depende da ordem imprevisível de execução. É difícil de reproduzir em testes porque exige que os dois acessos caiam exatamente na janela crítica ao mesmo tempo, o que raramente acontece em um teste isolado, mas ocorre sob carga real. A solução vem do banco de dados (transações/travas), no Volume 3.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]] — onde os arquivos moram e os serviços que rodam no fundo.
- **Base anterior:** [[19-Bits-processador-e-memoria]] — CPU, núcleos e RAM, o hardware por trás de tudo isto.
- **Você vai "ver" processos em:** [[25-Terminal-e-comandos-essenciais]] — listar e matar processos no terminal.
- **Aplicação futura:** Volume 3 (Banco de Dados) — transações, que resolvem a race condition do estoque; Volume 4 ([[92]]) — escalar multiplicando processos.

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 5 → **Capítulo 22 de 119**.
