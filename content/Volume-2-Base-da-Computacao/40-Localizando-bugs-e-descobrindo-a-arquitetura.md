# Capítulo 40 — Localizando bugs e descobrindo a arquitetura de um sistema existente

> **Volume 2 — A Base da Computação** · Módulo 11 — Ler código e documentação
> Coleção: *Do Estudante ao Engenheiro de Software*
> 🏁 **Capítulo final do Volume 2** — ler código como um detetive.

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Encarar a **depuração (debugging)** como um trabalho de **detetive**: hipóteses, evidências, método.
- Aplicar o **método científico** à caça de bugs (reproduzir → isolar → hipótese → testar → corrigir).
- Usar as ferramentas de investigação: **logs**, **debugger/breakpoints**, **mensagens de erro/stack trace**, **busca binária de causa**.
- **Reconstruir a arquitetura** de um sistema existente a partir de pistas (fluxos, dependências, camadas).
- Distinguir **sintoma** de **causa raiz** e evitar "consertos" que só escondem o problema.
- Fechar o Volume 2 conectando tudo: hardware, SO, redes, lógica e leitura de código na investigação de um problema real.

---

## ⏱️ Tempo médio de estudo

**40 a 50 minutos**, mais 20 minutos de prática.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- [[39-Engenharia-reversa-entrar-num-projeto-gigante]] (orientar-se num sistema) e [[36-Como-um-projeto-real-e-organizado]] (as camadas).
- [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]] (logs) e [[30-Logica-de-programacao-sem-trauma]] (onde os bugs de lógica moram).

---

## 📖 Introdução

Chegamos ao **último capítulo do Volume 2** — e ele é o mais "detetive" de todos. Boa parte do trabalho de um engenheiro não é escrever código novo: é **descobrir por que o código existente não faz o que deveria**. Isso é **debugging** (depuração), e é uma habilidade que assusta iniciantes e distingue profissionais.

O iniciante, diante de um bug, entra em pânico, muda coisas ao acaso ("e se eu mexer aqui?") e reza. O profissional trata o bug como um **caso a investigar**: reproduz o crime, junta evidências, forma hipóteses e as testa uma a uma, até encontrar a **causa raiz**. Não é sorte nem genialidade — é **método**. E método se aprende.

Este capítulo também fecha o Volume 2 amarrando tudo: você vai ver que investigar um bug real pode envolver hardware ([[19-Bits-processador-e-memoria]]: acabou a memória?), sistema operacional ([[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]: permissão? logs?), redes ([[28-Protocolos-e-protecao]]: erro 500? DNS?), lógica ([[30-Logica-de-programacao-sem-trauma]]: condição errada?) e leitura de código ([[39-Engenharia-reversa-entrar-num-projeto-gigante]]). Depurar é onde **toda a base da computação** que você construiu neste volume se junta para resolver um problema de verdade. É o encerramento perfeito.

---

## 🧠 Analogia

Pense num **detetive investigando um caso** — não num vidente.

Um bom detetive não "adivinha" o culpado. Ele:

1. **Vai à cena do crime e reconstitui o que aconteceu** — reproduzir o bug.
2. **Junta evidências**: pegadas, digitais, testemunhas — os logs, as mensagens de erro, o estado do sistema.
3. **Forma hipóteses** ("talvez tenha sido o mordomo") e **as testa contra as evidências**, descartando as que não batem.
4. **Estreita os suspeitos** até restar um — isola a causa.
5. **Confirma** apontando a evidência decisiva — prova que aquela é a causa, corrige, e verifica que o crime não se repete.

O detetive ruim acusa o primeiro suspeito por palpite e fecha o caso errado — o "sintoma" no lugar da "causa". O detetive bom segue as evidências onde elas levam, com paciência e método.

Depurar é ser esse detetive. Guarde: **caçar um bug é investigar um caso — evidências e hipóteses, não palpites e mudanças ao acaso.**

---

## 🧩 Conceitos fundamentais

### 1. Debugging é método, não sorte

**Depurar (debug)** é o processo de encontrar e corrigir defeitos no software. A palavra remete ao "inseto" ([[07-O-que-é-software]]), mas o essencial é a **abordagem**: aplicar o **método científico** a um comportamento inesperado. Trocar coisas ao acaso ("programação por coincidência") às vezes faz o sintoma sumir — mas sem entender a causa, ele volta, ou você quebra outra coisa. Método vence palpite.

> **Termo explicado — debugging (depuração):** o processo sistemático de localizar e corrigir a causa de um defeito no software.

### 2. O método científico aplicado a bugs

O roteiro que os profissionais seguem, mesmo sem perceber:

1. **Reproduzir:** faça o bug acontecer de forma **confiável**. Um bug que você não consegue reproduzir é quase impossível de corrigir. Descubra os passos exatos que o disparam.
2. **Isolar:** estreite onde o problema está. É no front ou no back? Em qual camada ([[36-Como-um-projeto-real-e-organizado]])? Em qual função?
3. **Formular hipótese:** "acho que a condição do frete está errada para valores acima de 100".
4. **Testar a hipótese:** verifique com uma evidência (um log, um breakpoint, um teste). Confirmou ou descartou?
5. **Corrigir a causa raiz** (não o sintoma) e **verificar** que o bug sumiu — e que nada mais quebrou (idealmente com um teste que trava se o bug voltar).

Repetir os passos 3-4 estreita o cerco até a causa. É exatamente o trabalho do detetive.

### 3. Sintoma × causa raiz

Distinção crucial. O **sintoma** é o que você vê ("o total do pedido aparece errado"). A **causa raiz** é o que realmente o provoca ("a função de desconto arredonda errado"). Consertar o sintoma sem achar a causa (ex.: "ajustar o número na tela para parecer certo") é um **remendo** que deixa o problema real vivo, pronto para reaparecer de outra forma. O detetive persegue a causa, não a aparência.

> **Termo explicado — causa raiz (root cause):** a origem real de um problema, por trás do sintoma visível. Corrigir a causa raiz resolve de vez; corrigir o sintoma apenas disfarça.

### 4. As evidências: logs, erros e stack traces

Suas principais fontes de evidência:

- **Logs** ([[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]): o "diário" do sistema. Quase sempre o erro deixou um rastro em `/var/log` ou no console. **Primeira parada.**
- **Mensagem de erro:** leia-a **inteira** e com calma. Ela costuma dizer *o que* deu errado e *onde*. Iniciantes tendem a fechar o erro no susto; profissionais o leem como uma pista valiosa.
- **Stack trace (rastro de pilha):** quando um programa quebra, ele mostra a **sequência de chamadas de função** que levou ao erro (lembra da pilha de chamadas, [[31-Estruturas-de-dados-essenciais]]). Ele aponta a linha exata e o caminho até ela — um mapa direto para a cena do crime.

> **Termo explicado — stack trace:** a lista das chamadas de função que estavam em andamento quando o erro ocorreu, mostrando o caminho (e a linha) que levou à falha. Uma das pistas mais valiosas.

### 5. O debugger: ver o programa por dentro em câmera lenta

O **debugger** é uma ferramenta que permite **pausar** o programa em um ponto (um **breakpoint**) e **inspecionar** o estado: o valor de cada variável, o caminho que a execução tomou, avançar linha a linha. É como assistir ao crime em câmera lenta, com pausa. Muitas vezes revela a causa em minutos — você vê a variável com o valor errado exatamente onde ela deveria estar certa.

> **Termo explicado — debugger / breakpoint:** ferramenta que pausa o programa num ponto escolhido (breakpoint) para você inspecionar variáveis e avançar passo a passo, observando o estado interno.

Alternativa simples e onipresente: espalhar **prints/logs** temporários ("chegou aqui?", "o valor é X") para rastrear o fluxo. Menos elegante que o debugger, mas rápido e sempre disponível.

### 6. Busca binária da causa

Uma técnica poderosa que usa a ideia do [[32-Algoritmos-e-complexidade-Big-O]] (busca binária): quando o bug está "em algum lugar" de um trecho grande, **divida ao meio**. Coloque uma verificação no meio: o problema já apareceu até aqui, ou só depois? Isso descarta metade. Repita, e você **converge rápido** para a linha culpada. O mesmo vale no tempo: `git bisect` (uma ferramenta do Git) faz busca binária no **histórico de commits** para achar exatamente qual mudança introduziu o bug.

### 7. Reconstruindo a arquitetura de um sistema

A outra metade do capítulo: entender **como o sistema é montado** (sua arquitetura) a partir do código existente. Pistas para reconstruir o "mapa geral":

- **A estrutura de pastas e camadas** ([[36-Como-um-projeto-real-e-organizado]]): revela a separação de responsabilidades.
- **As dependências** (`package.json`, imports): que tecnologias e quais partes falam com quais.
- **Seguir os fluxos** ([[39-Engenharia-reversa-entrar-num-projeto-gigante]]): como uma requisição atravessa o sistema mostra a "planta".
- **Os pontos de integração:** onde o sistema fala com o banco, com APIs externas, com filas — as "fronteiras".

Juntando isso, você desenha (mentalmente ou no papel) o **diagrama de arquitetura** do sistema — uma habilidade que se formaliza no Volume 3 (Arquitetura), mas que começa aqui, lendo o código como um detetive lê a planta de um prédio.

---

## ⚙️ Como funciona na prática

Vamos investigar um caso real na SaborExpress, aplicando o método e **amarrando o volume inteiro**: *"alguns clientes relatam que o app trava ao finalizar pedidos grandes, à noite"*.

```
1. REPRODUZIR
   → tento finalizar um pedido grande à noite... e consigo reproduzir a trava. ✅
   (um bug reproduzível é meio caminho andado)

2. JUNTAR EVIDÊNCIAS (logs — cap.23)
   → vou aos logs do servidor: vejo erros "500 Internal Server Error" (cap.28)
   → e, um pouco antes, avisos de memória alta (cap.19, 22)

3. FORMULAR HIPÓTESES e TESTAR
   H1: "é a rede/DNS?" → não; a conexão abre, o erro é 500 (servidor), não de rede. Descartada.
   H2: "é permissão de arquivo?" → logs não mostram 'permission denied'. Descartada.
   H3: "é memória — pedidos grandes consomem RAM demais?" → os avisos de memória batem. Promissora.

4. ISOLAR (debugger / logs — cap.39)
   → sigo o fluxo do pedido (route→controller→service, cap.36)
   → no PedidoService, acho um trecho que carrega TODOS os itens na memória e
     faz um laço dentro de outro laço sobre eles (cap.32: O(n²)!)
   → com pedidos grandes, à noite (pico), a memória estoura → o OOM (cap.22) derruba

5. CAUSA RAIZ (não o sintoma)
   → o sintoma é "app trava"; a causa raiz é um cálculo O(n²) que consome memória demais
   → NÃO adianta só "reiniciar o servidor" (esconde o sintoma); é preciso corrigir o algoritmo

6. CORRIGIR e VERIFICAR
   → troco o O(n²) por uma solução O(n) com um dicionário (cap.31, 32)
   → escrevo um teste com um pedido grande (para o bug não voltar)
   → rodo, testo à noite: não trava mais. Caso encerrado. ✅
```

Olhe o que acabou de acontecer: para resolver **um** bug, você usou **hardware** (memória — cap. 19), **sistema operacional** (OOM e logs — caps. 22 e 23), **redes** (status 500 — cap. 28), **algoritmos** (O(n²) vs O(n) — cap. 32), **estruturas de dados** (dicionário — cap. 31), **leitura de código** (seguir o fluxo — caps. 36 e 39) e **método** (o detetive). **Todo o Volume 2 convergiu numa única investigação.** Não é coincidência: é exatamente para isso que serve entender a base da computação. Cada camada que você aprendeu vira uma **hipótese possível** e uma **ferramenta de diagnóstico**. Quem só sabe programar "por cima" chuta no escuro; você, que entende a máquina de baixo a cima, investiga com precisão.

Essa é a nota final do volume: a base não é teoria distante — é o que te permite **resolver problemas reais que ninguém mais no time consegue**.

---

## 🍔 Aplicação na SaborExpress

**O plantão das 3h, agora com método.** Lembra do incidente noturno do [[18-Bastidores-uma-semana-real]] e das ferramentas de operação do [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]]? Agora você tem o **método** para resolvê-lo, não só as ferramentas. Quando a SaborExpress cai, o dev de plantão não entra em pânico: reproduz (ou confirma pelos logs), junta evidências (`tail -f` no log, status HTTP), forma hipóteses ligadas às camadas (memória? banco? uma API externa fora do ar?), isola e corrige a **causa raiz**. A diferença entre um plantão de 20 minutos e um de 5 horas é justamente ter esse método de detetive — e ele acabou de virar seu.

**Sintoma vs. causa raiz vale dinheiro para a Ana.** Imagine que o time da SaborExpress, sob pressão, só "reinicia o servidor" toda vez que ele trava à noite (tratar o sintoma). O app volta... e cai de novo na noite seguinte. Clientes frustrados, pedidos perdidos, reputação arranhada — noite após noite. Só quando alguém investiga a **causa raiz** (o cálculo O(n²)) o problema acaba de verdade. Perseguir a causa, mesmo que dê mais trabalho no momento, é o que protege o negócio da Ana de sangrar continuamente. Remendos são caros a longo prazo; curas são investimento.

**Reconstruir a arquitetura para crescer.** Conforme a SaborExpress cresce e novos desenvolvedores entram, alguém precisa entender e documentar **como o sistema todo se encaixa** — o diagrama de arquitetura. Fazer essa engenharia reversa da arquitetura (a partir das pastas, dependências e fluxos) é o que permite ao time tomar boas decisões de evolução: "onde encaixamos o novo módulo de fidelidade?", "o que quebra se mudarmos o banco?". Ler a arquitetura de um sistema existente é a ponte direta para o Volume 3, onde você aprenderá a **projetá-la** do zero.

---

## 🏢 Como isso acontece em uma empresa

- **Debugging é boa parte do trabalho.** Corrigir bugs, investigar incidentes e entender comportamentos inesperados ocupam uma fatia enorme do tempo de qualquer dev. Ser bom nisso é ser valioso todos os dias.
- **Incidentes têm processo.** Empresas maduras tratam incidentes com método (reproduzir, diagnosticar, corrigir) e fazem **post-mortems**: análises da causa raiz para evitar a repetição (você verá em Observabilidade e on-call, Volume 4). "Qual foi a causa raiz?" é a pergunta central de todo post-mortem.
- **"Reiniciou o servidor" não fecha o caso.** Reiniciar é primeiro socorro; times sérios cobram a investigação da causa. Um bug que volta é um bug não resolvido.
- **Ler a arquitetura é habilidade de destaque.** Quem consegue entrar num sistema e explicar como ele funciona (a arquitetura) vira referência no time, rápido. É o caminho para papéis mais sênior (Tech Lead, Arquiteto — [[14-Os-papeis-da-area-de-tecnologia]]).

---

## ⚠️ Erros comuns

- **Mudar coisas ao acaso ("por coincidência").** Mexer sem hipótese até "parar de dar erro" pode esconder o bug sem resolvê-lo — e quebrar outras coisas. Sempre tenha uma hipótese antes de mudar.
- **Não conseguir (ou não tentar) reproduzir.** Sem reproduzir de forma confiável, você conserta às cegas e não sabe se resolveu. Invista em reproduzir primeiro.
- **Ignorar a mensagem de erro e o stack trace.** É a pista mais direta que existe, e muita gente a fecha no susto. Leia o erro inteiro, com calma.
- **Corrigir o sintoma e declarar vitória.** O bug volta. Persiga a **causa raiz**, mesmo que dê mais trabalho agora.
- **Não olhar os logs.** A evidência quase sempre está lá. Investigar sem ler os logs é ignorar a testemunha ocular.
- **Não escrever um teste que trava o bug.** Sem um teste, o mesmo bug pode voltar despercebido. Corrigir sem proteger contra a recaída é meio-serviço.
- **Chutar no escuro por não entender a base.** Quem não sabe o que é memória, processo ou status HTTP não consegue nem formar hipóteses. É por isso que este volume inteiro importa.

---

## 💡 Dicas profissionais

- **Antes de mexer, invista em reproduzir de forma confiável.** É o passo que mais acelera a correção. Um bug reproduzível está quase resolvido; um intermitente é um pesadelo — vale muito esforço para torná-lo previsível.
- **Leia o erro e o stack trace por inteiro, com calma.** A resposta muitas vezes está literalmente escrita ali. Não deixe o susto te fazer fechar a pista mais valiosa.
- **Use a busca binária para isolar.** Divida o trecho (ou o histórico, com `git bisect`) ao meio e vá descartando metades. Converge rápido para a linha ou o commit culpado.
- **Distinga sempre sintoma de causa raiz.** Pergunte "isto é a doença ou o sintoma?". Corrigir a causa evita o retrabalho e protege o sistema (e o negócio).
- **Deixe um teste guardando a correção.** Um teste que falha com o bug e passa com a correção garante que ele não volte silenciosamente. É a rede de segurança do futuro.
- **Aproveite a base inteira como diagnóstico.** Ao investigar, percorra as camadas do volume: é rede? memória? permissão? lógica? algoritmo? Cada capítulo é uma hipótese na sua caixa de ferramentas — e é isso que te faz resolver o que outros não conseguem.

---

## 🎈 Curiosidades

- O termo **"debug"** ganhou fama com **Grace Hopper**, pioneira da computação, quando uma mariposa real foi encontrada travando um computador em 1947 — a equipe a colou no relatório com a nota "primeiro caso real de um bug sendo encontrado". A palavra e a mariposa entraram para a história (você viu isso lá no [[07-O-que-é-software]]).
- Existe o fenômeno do **"rubber duck debugging" (depuração do patinho de borracha)**: explicar o problema em voz alta para um objeto (tradicionalmente um patinho de borracha) frequentemente faz você **achar a solução sozinho** no meio da explicação. Organizar o pensamento para explicar já revela a falha. É sério, funciona, e é amplamente praticado.
- Alguns dos bugs mais caros da história custaram fortunas ou vidas — o foguete **Ariane 5** (1996) explodiu por um erro de conversão de número; o **Mars Climate Orbiter** (1999) se perdeu porque uma equipe usou unidades métricas e outra imperiais. Lembretes de que causa raiz e método de investigação não são detalhes.
- **`git bisect`** — a busca binária no histórico — é uma ferramenta amada por quem caça bugs difíceis: ela pode encontrar, entre **milhares** de commits, exatamente qual introduziu o problema, em poucos passos (log₂). É a busca binária do [[32-Algoritmos-e-complexidade-Big-O]] salvando o seu dia na vida real.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Debugging (depuração)** | O processo sistemático de achar e corrigir defeitos. |
| **Reproduzir** | Fazer o bug acontecer de forma confiável (passo essencial). |
| **Isolar** | Estreitar onde, no sistema, o problema está. |
| **Sintoma** | O que se vê do problema (o comportamento errado). |
| **Causa raiz** | A origem real por trás do sintoma. |
| **Log** | Registro-diário do sistema; evidência primária. |
| **Mensagem de erro** | O texto que descreve o que deu errado (leia inteiro). |
| **Stack trace** | A sequência de chamadas até o erro; aponta a linha exata. |
| **Debugger / Breakpoint** | Ferramenta que pausa o programa para inspecionar o estado. |
| **Busca binária da causa** | Dividir ao meio para isolar rápido (código ou histórico). |
| **git bisect** | Busca binária no histórico de commits para achar o commit culpado. |
| **Post-mortem** | Análise da causa raiz de um incidente, para evitar repetição. |

---

## 📝 Resumo

- **Debugging é método, não sorte**: aplica-se o **método científico** — reproduzir → isolar → hipótese → testar → corrigir a causa raiz → verificar (com um teste que trava o bug).
- Distinguir **sintoma** de **causa raiz** é central: remendar o sintoma (ex.: só reiniciar) deixa o problema vivo; perseguir a causa resolve de vez.
- As evidências: **logs** (primeira parada), a **mensagem de erro** lida por inteiro, e o **stack trace** (aponta a linha e o caminho). As ferramentas: **debugger/breakpoints** e a **busca binária da causa** (inclusive `git bisect` no histórico).
- Reconstruir a **arquitetura** de um sistema existente vem das mesmas pistas: estrutura/camadas, dependências, fluxos e pontos de integração — a ponte para projetar arquitetura no Volume 3.
- Investigar um bug real **amarra o volume inteiro**: hardware, SO, redes, lógica, algoritmos, estruturas e leitura de código viram hipóteses e ferramentas de diagnóstico. Entender a base é o que te faz resolver o que outros não conseguem.

---

## ☑️ Checklist de aprendizado

- [ ] Encaro bugs com método (reproduzir, isolar, hipótese, testar, corrigir) em vez de palpite.
- [ ] Distingo sintoma de causa raiz e persigo a causa.
- [ ] Uso logs, mensagens de erro e stack traces como evidências.
- [ ] Sei usar debugger/breakpoints (ou prints) e a busca binária para isolar.
- [ ] Consigo reconstruir a arquitetura de um sistema a partir de pistas.
- [ ] Percebo como toda a base do Volume 2 vira ferramenta de diagnóstico.

---

## ✏️ Exercícios

**1.** Por que "reproduzir o bug de forma confiável" é considerado meio caminho para corrigi-lo?

**2.** Explique a diferença entre sintoma e causa raiz com um exemplo da SaborExpress. Por que corrigir só o sintoma é perigoso?

**3.** Você recebe um erro com um stack trace. Como ele ajuda na investigação? E por que ler a mensagem de erro inteira importa?

**4.** Descreva como a "busca binária da causa" ajuda a isolar um bug num trecho grande de código (ou num histórico de muitos commits).

**5. (Reflexão)** O app da SaborExpress trava ao finalizar pedidos grandes à noite. Descreva a investigação passo a passo e mostre como conhecimentos de **pelo menos três** capítulos diferentes deste volume entram na sua análise.

---

## 💬 Respostas comentadas

**1.** Porque um bug que você consegue disparar quando quer permite **testar hipóteses** e **verificar a correção** de forma confiável: você observa o problema acontecer, mexe, e vê se parou. Um bug intermitente (que aparece "às vezes") é muito mais difícil, pois você nunca tem certeza se resolveu ou se ele só não apareceu daquela vez. Tornar o bug reproduzível transforma a caça de "sorte" em "método".

**2.** Exemplo: o **sintoma** é "o total do pedido aparece errado na tela"; a **causa raiz** pode ser "a função de cálculo aplica o desconto de forma equivocada". Corrigir só o sintoma (ex.: forçar o número certo na tela para aquele caso) é perigoso porque a função continua errada — o problema volta em outros pedidos, de outras formas, e você acumula remendos sobre um defeito vivo. Perseguir a causa raiz corrige de uma vez todos os casos.

**3.** O **stack trace** mostra a sequência de chamadas de função até o ponto da falha, apontando a **linha exata** e o caminho que levou até ela — é um mapa direto para a "cena do crime", que economiza muito tempo de busca. Ler a **mensagem de erro inteira** importa porque ela costuma dizer *o que* deu errado (ex.: valor nulo, arquivo não encontrado, permissão negada) e frequentemente *onde* — muitas vezes a solução está literalmente descrita ali, e fechá-la no susto é desperdiçar a pista mais valiosa.

**4.** Você **divide o trecho ao meio** e coloca uma verificação (um log/print) no meio: o problema já se manifesta até aqui, ou só depois deste ponto? A resposta descarta metade do código de uma vez. Repetindo, você converge rapidamente (de forma logarítmica) para a linha culpada, em vez de examinar tudo linha a linha. No **histórico**, `git bisect` faz o mesmo: testa o commit do meio, descobre se o bug já existia ali, e vai reduzindo pela metade até achar exatamente o commit que introduziu o defeito — mesmo entre milhares.

**5.** Investigação: **reproduzir** (finalizar um pedido grande à noite e confirmar a trava) → **evidências** nos **logs** (**cap. 23**), onde apareceriam erros **500** (**cap. 28**) e avisos de **memória alta** (**cap. 19/22**) → **hipóteses**: descartar rede/permissão, focar em memória → **isolar** seguindo o fluxo pelas camadas (**cap. 36/39**) até um cálculo **O(n²)** no service (**cap. 32**) que carrega tudo na RAM e, no pico noturno, faz o **OOM** derrubar o processo (**cap. 22**) → **causa raiz**: o algoritmo ineficiente (não o "servidor que precisa reiniciar") → **corrigir** trocando por O(n) com um **dicionário** (**cap. 31/32**), com um **teste** que trava o bug. Entram, no mínimo: memória/hardware (cap. 19), SO/logs/OOM (caps. 22-23), redes/status HTTP (cap. 28), algoritmos e estruturas (caps. 31-32) e leitura de código (caps. 36/39) — o volume inteiro convergindo numa investigação.

---

## 🔗 Próximos capítulos relacionados

- **Fecha o Volume 2.** Próximo: **Volume 3 — Desenvolvimento de Software** (do requisito ao deploy), começando pelos processos e metodologias.
- **Base imediata:** [[39-Engenharia-reversa-entrar-num-projeto-gigante]], [[36-Como-um-projeto-real-e-organizado]], [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]] (logs) e [[32-Algoritmos-e-complexidade-Big-O]].
- **Amarra o volume:** [[19-Bits-processador-e-memoria]], [[22-Processos-threads-e-memoria-RAM]], [[28-Protocolos-e-protecao]], [[30-Logica-de-programacao-sem-trauma]].
- **Aplicação futura:** Volume 3 (Testes — a rede de segurança; Arquitetura — projetar o que aqui você aprendeu a ler) e Volume 4 (Observabilidade, on-call e post-mortems).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 11 → **Capítulo 40 de 119**. 🏁 *Fim do Volume 2 — A Base da Computação.*
