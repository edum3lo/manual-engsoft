---
title: '20 - Como um computador inicia (boot) e roda um programa'
---

# Capítulo 20 — Como um computador inicia (boot) e roda um programa

> **Volume 2 — A Base da Computação** · Módulo 4 — Como o computador funciona
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Descrever o processo de **boot**: o que acontece do momento em que você aperta o botão até a tela do sistema aparecer.
- Entender o papel da **BIOS/UEFI**, do **bootloader** e do **kernel** nessa largada.
- Explicar por que um programa precisa ser **traduzido** para a linguagem da máquina antes de rodar.
- Diferenciar **código-fonte**, **código de máquina**, **compilador** e **interpretador**.
- Compreender o que significa **"executar um programa"**: carregá-lo do disco para a RAM e a CPU rodar suas instruções.
- Ligar tudo isso ao seu dia a dia: por que existem "linguagens compiladas" e "interpretadas", e o que é um *processo*.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (2/5).**

---

## ✅ Pré-requisitos

- [[19-Bits-processador-e-memoria]] — você precisa saber o que são CPU, RAM e disco para acompanhar aqui.

---

## 📖 Introdução

Você aperta um botão e, alguns segundos depois, uma tela colorida cheia de ícones aparece. Entre o "apertar" e o "aparecer", acontece uma sequência coreografada de eventos que quase ninguém conhece — e que explica muita coisa: por que o computador demora para ligar, por que às vezes ele "não passa da tela preta", o que é aquele instante em que ele "não sabe nada ainda".

Depois de ligado, vem a segunda pergunta deste capítulo: como o computador **roda um programa**? Você clica num ícone e o programa abre. Mas o que é "abrir um programa"? De onde ele sai, para onde vai, e como o código que alguém escreveu numa linguagem "de gente" vira algo que a CPU — que só entende continhas binárias — consegue executar?

Este capítulo fecha o Módulo 4 conectando o hardware do capítulo anterior com o software do Volume 1. É a ponte entre "as peças" e "as peças ganhando vida".

---

## 🧠 Analogia

Pense em **abrir um restaurante de manhã**.

Quando o dono chega e destranca a porta (você aperta o botão), o lugar está **escuro e vazio** — ninguém sabe o que fazer ainda. Então acontece uma rotina fixa de abertura:

1. **Alguém liga a luz e confere se está tudo no lugar** (fogão, geladeira, caixa) — isso é a **BIOS/UEFI**, o primeiro programinha que roda e testa o hardware.
2. **Essa pessoa vai buscar o gerente** que sabe tocar o restaurante — isso é o **bootloader**, que sabe onde encontrar o "chefe".
3. **O gerente assume o comando** e organiza a casa: escala os funcionários, abre o caixa, prepara os salões — isso é o **kernel do sistema operacional** carregando.
4. **O restaurante abre as portas ao público** — a tela do sistema aparece e você pode usar.

Depois de aberto, cada **pedido de cliente** é como abrir um **programa**: o gerente (sistema) recebe o pedido, aloca uma mesa e um garçom (memória e CPU), e a cozinha executa a receita passo a passo. Guarde as duas cenas: **ligar = rotina de abertura do restaurante**; **rodar um programa = atender um pedido**.

---

## 🧩 Conceitos fundamentais

### 1. O problema do "ovo e da galinha" ao ligar

Quando o computador liga, a RAM está **vazia** (ela é volátil — [[19-Bits-processador-e-memoria]]) e a CPU não sabe o que fazer. Mas para fazer qualquer coisa, a CPU precisa de instruções... que ainda não estão na memória. Como sair dessa?

A solução: gravar um primeiro programinha num **chip fixo** da placa-mãe, que a CPU está programada para executar assim que recebe energia. Esse programinha é a **BIOS** (ou, hoje, **UEFI**, sua versão moderna).

### 2. BIOS/UEFI — o "confere se está tudo aí"

A **BIOS/UEFI** é o primeiríssimo software a rodar. Suas tarefas:

- **POST (Power-On Self-Test):** testa rapidamente o hardware essencial — a RAM responde? o teclado está aí? existe um disco? Se algo crítico falhar, você ouve *beeps* ou vê uma mensagem de erro (por isso um PC que "nem liga direito" às vezes trava aqui).
- **Encontrar de onde dar boot:** decidir em qual dispositivo (SSD, HD, pendrive) está o sistema operacional a carregar.

> **Termo explicado — BIOS/UEFI:** o firmware gravado na placa-mãe que roda primeiro ao ligar, testa o hardware e encontra o sistema operacional para iniciar. UEFI é a versão moderna da antiga BIOS.

> **Termo explicado — firmware:** software gravado permanentemente dentro de um hardware, que o controla no nível mais baixo. Fica "entre" o hardware puro e o software comum.

### 3. Bootloader — quem vai buscar o kernel

Encontrado o disco certo, a BIOS/UEFI passa o bastão para um pequeno programa chamado **bootloader** (ex.: *GRUB*, no Linux). O trabalho dele é **carregar o kernel** do sistema operacional do disco para a RAM e entregar o comando a ele. É o "vai buscar o gerente" da analogia.

> **Termo explicado — bootloader:** pequeno programa cuja única missão é localizar e carregar o kernel do sistema operacional na memória, dando início a ele. (É onde você escolhe "iniciar Windows ou Linux" em PCs com dois sistemas.)

### 4. Kernel — o gerente assume

O **kernel** é o coração do sistema operacional (você vai conhecê-lo a fundo no [[21-O-que-e-um-sistema-operacional-e-o-kernel]]). Uma vez carregado, ele:

- Assume o controle total do hardware.
- Inicia os serviços básicos e os drivers (os "tradutores" que fazem o SO conversar com cada peça de hardware).
- Sobe a interface — a tela de login, o ambiente gráfico.

Quando você vê a tela do sistema, o **boot terminou**: o restaurante está aberto.

> **Termo explicado — boot:** o processo inteiro de inicialização, do apertar do botão até o sistema pronto para uso. "Dar boot" = ligar/iniciar; "rebootar" = reiniciar.

Resumo visual da largada:

```
[botão liga]
     ↓
BIOS/UEFI  → testa o hardware (POST) e acha o disco de boot
     ↓
BOOTLOADER → carrega o kernel do disco para a RAM
     ↓
KERNEL     → assume o hardware, sobe serviços e a interface
     ↓
[tela do sistema pronta para usar]  ← boot concluído
```

### 5. Da linguagem "de gente" à linguagem da máquina

Agora a segunda metade: rodar um programa. Lembre do [[19-Bits-processador-e-memoria]]: a CPU só entende **instruções binárias** ("some estes registradores", "pule para tal ponto"). Isso é o **código de máquina**. Mas ninguém programa escrevendo 0 e 1 — programamos em linguagens legíveis (Python, Java, JavaScript, C...). Então precisa haver uma **tradução**.

- **Código-fonte:** o que o programador escreve, legível para humanos (`if preço > 50 then ...`).
- **Código de máquina:** a versão final, em binário, que a CPU executa.
- Entre um e outro, há um **tradutor**. Ele é de dois tipos:

**Compilador** — traduz **tudo de uma vez**, antes de rodar, gerando um arquivo executável. É como **traduzir um livro inteiro** e entregar a versão pronta. Linguagens ditas *compiladas*: C, C++, Go, Rust. Vantagem: roda rápido (já está traduzido). Custo: você precisa compilar a cada mudança.

**Interpretador** — traduz e executa **linha por linha, na hora**. É como um **tradutor simultâneo** ao vivo numa palestra. Linguagens ditas *interpretadas*: Python, JavaScript, Ruby. Vantagem: praticidade (rodou na hora, sem passo de compilação). Custo: geralmente mais lento, pois traduz enquanto roda.

> **Termo explicado — compilador:** programa que traduz o código-fonte inteiro para código de máquina *antes* da execução, gerando um executável.

> **Termo explicado — interpretador:** programa que lê e executa o código-fonte *na hora*, comando por comando, sem gerar um executável separado.

(Existem meios-termos, como Java e C#, que compilam para um "código intermediário" rodado por uma máquina virtual — mas a ideia central de "algo traduz para a CPU" continua valendo. Voltamos às linguagens no [[30-Logica-de-programacao-sem-trauma]] e no Volume 3.)

### 6. O que é "executar um programa"

Executar um programa é, essencialmente:

1. **Carregar** o programa do **disco** (onde ele mora instalado) para a **RAM** (onde a CPU consegue acessá-lo rápido).
2. O sistema operacional cria um **processo** — uma "instância viva" daquele programa, com um pedaço da memória reservado para ele.
3. A **CPU** começa a rodar as instruções desse processo, no ciclo buscar → decodificar → executar que você viu no capítulo anterior.

> **Termo explicado — processo:** um programa *em execução*. Enquanto o programa parado é só um arquivo no disco, o processo é ele vivo, ocupando memória e usando a CPU. (Você aprofunda no [[22-Processos-threads-e-memoria-RAM]].)

Por isso "abrir um programa" demora um instante: o sistema precisa achá-lo no disco, copiá-lo para a RAM e preparar o processo. E por isso programas abrem mais rápido na segunda vez — partes deles ainda estão "quentes" no cache/RAM.

---

## ⚙️ Como funciona na prática

Vamos seguir a jornada completa de um clique, do zero ao programa rodando.

```
Você liga o PC
   → BIOS/UEFI testa o hardware e acha o SSD
   → bootloader carrega o kernel na RAM
   → kernel sobe o sistema; a área de trabalho aparece   [BOOT PRONTO]

Você dá dois cliques no ícone do editor de código
   → o SO localiza o arquivo do programa no disco
   → COPIA o programa do disco para a RAM
   → CRIA um processo e reserva memória para ele
   → a CPU começa a executar as instruções do editor
   → a janela do editor aparece na tela               [PROGRAMA RODANDO]

Você escreve um código Python e manda rodar
   → o INTERPRETADOR do Python (ele mesmo um programa) é acionado
   → ele lê seu código linha por linha, traduz e executa cada uma
   → o resultado aparece no terminal
```

Repare em três fatos que amarram o módulo. Primeiro, **tudo começa no disco e passa pela RAM para ser executado pela CPU** — a dança do capítulo anterior, agora com nome e sobrenome. Segundo, o **sistema operacional é o maestro**: é ele quem carrega, reserva memória e cria o processo (é o tema do próximo módulo). Terceiro, **seu código não fala com a CPU diretamente** — sempre há um tradutor (compilador ou interpretador) no caminho. Entender essa cadeia é o que te permite, mais tarde, diagnosticar "por que meu programa não roda no servidor" sem entrar em pânico.

---

## 🍔 Aplicação na SaborExpress

A SaborExpress tem código rodando em **três lugares diferentes**, e cada um "roda um programa" de um jeito — o que ajuda a fixar os conceitos.

**No celular do cliente (app).** O app da SaborExpress foi **compilado** para o formato que o celular entende (um `.apk` no Android, por exemplo). Quando o usuário toca no ícone, o sistema do celular carrega esse programa do armazenamento para a RAM, cria o processo e a CPU do aparelho o executa. Se o celular estiver com pouca memória livre, o app abre mais devagar — exatamente o "carregar do disco para a RAM" na prática.

**No servidor (back-end).** O time da Ana talvez tenha escrito o servidor em **JavaScript (Node.js)** ou **Python** — linguagens **interpretadas**. Isso significa que, no servidor, há um interpretador rodando o código da SaborExpress continuamente, atendendo pedido após pedido. Quando o servidor "sobe" (é iniciado), acontece um mini-boot da aplicação: ele carrega o código, prepara tudo na memória e fica pronto para receber requisições. Você vai reencontrar esse "subir a aplicação" no Volume 4, quando falarmos de **deploy** e **containers** ([[86]]).

**Por que isso importa para a Ana.** Escolher entre uma linguagem compilada e uma interpretada é uma decisão de engenharia com trade-offs reais: compiladas tendem a rodar mais rápido (menos servidor, menos custo), interpretadas costumam acelerar o desenvolvimento (o time entrega mais rápido). No começo da SaborExpress, velocidade de desenvolvimento vale ouro; com milhões de usuários, cada milissegundo de CPU vira dinheiro. Não existe "melhor" — existe "melhor para este momento". Esse tipo de raciocínio é o que diferencia programar de fazer **engenharia** (lembra do [[08-O-que-e-engenharia-de-software]]?).

---

## 🏢 Como isso acontece em uma empresa

- **"Buildar" é compilar/empacotar o programa.** No mercado você ouvirá "quebrou o build". *Build* é o processo de transformar o código-fonte no artefato que vai rodar (compilar, empacotar). Se o build falha, nada roda. Isso é a base do **CI/CD** (Volume 4, [[85]]).
- **"Deploy" é colocar o programa para rodar num servidor.** Levar o programa para a máquina certa, subir o processo e deixá-lo atendendo. Boot de restaurante, versão profissional.
- **"Funciona na minha máquina" nasce aqui.** Um programa depende do ambiente onde roda (qual sistema, quais versões, quais bibliotecas). Ele roda no seu PC e quebra no servidor. A solução moderna — **containers/Docker** — empacota "o programa + seu ambiente" justamente para matar esse problema (Volume 4).
- **Tempo de boot importa em produção.** Servidores que reiniciam rápido se recuperam mais rápido de falhas. Em sistemas grandes, otimizar o "tempo de subida" da aplicação é uma preocupação real.

---

## ⚠️ Erros comuns

- **Achar que o programa "roda do disco".** Não: ele é **carregado para a RAM** e a CPU executa dali. O disco é só onde ele fica guardado parado.
- **Confundir compilar com executar.** Compilar é *traduzir*; executar é *rodar*. Um erro de compilação impede o programa de existir; um erro de execução acontece com ele já rodando.
- **Achar que linguagem interpretada "não vira código de máquina".** Vira sim — só que na hora, linha a linha, pelo interpretador (que por baixo aciona a CPU). A tradução existe; muda é *quando* acontece.
- **Ignorar o ambiente de execução.** "Rodou aqui" não garante "roda lá". Versões, sistema operacional e dependências mudam tudo.
- **Culpar o hardware por travas no boot.** Muitas vezes é software: um bootloader mal configurado, um sistema corrompido. Saber as etapas ajuda a localizar onde travou.

---

## 💡 Dicas profissionais

- **Ao ver um erro, identifique a etapa: build (compilação), start (subida) ou runtime (execução)?** O tipo de erro te diz onde olhar. Erro de sintaxe geralmente é build; "porta já em uso" é start; "valor nulo inesperado" é runtime.
- **Guarde a distinção compilado × interpretado como uma lente, não como um dogma.** Ela ajuda a prever desempenho e praticidade, mas linguagens modernas misturam as duas ideias. Entenda o espírito.
- **Quando algo "não roda no servidor mas roda no seu PC", suspeite do ambiente antes do código.** Versão diferente, variável de ambiente faltando, dependência ausente. Você verá variáveis de ambiente no [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]].
- **Assista o seu computador iniciar prestando atenção.** A logo da placa-mãe (BIOS/UEFI), a telinha do bootloader — o que antes era "coisa que aparece" agora tem nome e função.

---

## 🎈 Curiosidades

- A palavra **"boot"** vem de *bootstrap* — as tirinhas na parte de trás das botas. A expressão "erguer-se puxando as próprias botas" descreve o paradoxo de o computador ter que se iniciar sozinho a partir do nada. Daí "dar boot".
- O primeiro programa que quase todo programador escreve é o **"Hello, World!"** — só faz aparecer essa frase na tela. Ele é o "teste de que a cadeia inteira funciona": seu código foi traduzido, virou processo e a CPU o executou. Simples, mas prova que tudo está no lugar.
- A tela azul da morte (**BSOD**) do Windows e o **kernel panic** do Linux/Mac são o kernel dizendo "encontrei um problema tão grave que não consigo continuar em segurança e vou parar". É o gerente da analogia trancando o restaurante para evitar um desastre.
- Nos primórdios, "carregar um programa" era literalmente inserir **cartões perfurados** ou uma **fita** na ordem certa. O conceito é o mesmo de hoje — levar as instruções até a máquina — só que a mídia era física e manual.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Boot** | O processo de iniciar o computador, do botão até o sistema pronto. |
| **BIOS/UEFI** | Firmware que roda primeiro, testa o hardware e acha o SO. |
| **Firmware** | Software gravado dentro de um hardware, que o controla no nível baixo. |
| **POST** | O autoteste do hardware feito pela BIOS/UEFI ao ligar. |
| **Bootloader** | Programinha que carrega o kernel do disco para a RAM. |
| **Kernel** | O núcleo do sistema operacional, que controla o hardware. |
| **Código-fonte** | O programa escrito de forma legível para humanos. |
| **Código de máquina** | A versão binária que a CPU executa diretamente. |
| **Compilador** | Traduz o código inteiro para código de máquina antes de rodar. |
| **Interpretador** | Lê e executa o código na hora, comando a comando. |
| **Processo** | Um programa em execução, ocupando memória e usando a CPU. |
| **Build** | O ato de transformar código-fonte no artefato que vai rodar. |

---

## 📝 Resumo

- Ao ligar, a **BIOS/UEFI** testa o hardware (POST) e acha o disco; o **bootloader** carrega o **kernel** na RAM; o kernel assume e sobe o sistema. Isso é o **boot**.
- A CPU só entende **código de máquina** (binário). O que você escreve é **código-fonte**, e precisa ser **traduzido**.
- A tradução vem de um **compilador** (traduz tudo antes, gera executável — rápido para rodar) ou de um **interpretador** (traduz e roda na hora, linha a linha — prático para desenvolver).
- **Executar um programa** = carregá-lo do **disco** para a **RAM**, criar um **processo** e a **CPU** rodar suas instruções.
- Essa cadeia (disco → RAM → CPU, sempre com um tradutor no meio, sob o comando do sistema operacional) explica boa parte dos problemas reais de "não roda" que você enfrentará.

---

## ☑️ Checklist de aprendizado

- [ ] Sei descrever as etapas do boot (BIOS/UEFI → bootloader → kernel → sistema pronto).
- [ ] Entendo por que a RAM está vazia ao ligar e como o computador "se ergue do nada".
- [ ] Diferencio código-fonte, código de máquina, compilador e interpretador.
- [ ] Sei explicar o que é "executar um programa" em termos de disco, RAM, CPU e processo.
- [ ] Consigo dar exemplos de linguagens compiladas e interpretadas.
- [ ] Entendo por que "funciona na minha máquina" acontece.

---

## ✏️ Exercícios

**1.** Coloque em ordem e explique cada etapa: kernel, bootloader, BIOS/UEFI, sistema pronto para uso.

**2.** Explique a diferença entre um **compilador** e um **interpretador** usando uma analogia própria (não a do tradutor de livro/palestra).

**3.** O que significa, tecnicamente, "abrir um programa"? Cite disco, RAM, processo e CPU na sua resposta.

**4.** Um programa roda perfeitamente no computador da desenvolvedora, mas quebra no servidor. Cite duas causas prováveis ligadas ao ambiente de execução.

**5. (Reflexão)** A SaborExpress precisa escolher entre uma linguagem compilada (mais rápida em produção) e uma interpretada (mais rápida de desenvolver) para começar o back-end. No estágio inicial da empresa, qual você recomendaria e por quê? E isso poderia mudar com o tempo?

---

## 💬 Respostas comentadas

**1.** Ordem: **BIOS/UEFI** (testa o hardware e acha o disco) → **bootloader** (carrega o kernel na RAM) → **kernel** (assume o hardware e sobe os serviços) → **sistema pronto** (interface disponível). É uma passagem de bastão do mais primitivo (firmware fixo) ao mais completo (sistema operacional funcionando).

**2.** Resposta pessoal. Boa analogia separa "traduzir tudo antes" de "traduzir na hora". Exemplos: **receita já traduzida** entregue pronta ao cozinheiro (compilador) × **um intérprete lendo a receita em voz alta** para o cozinheiro conforme ele cozinha (interpretador). O essencial é mostrar o *quando* da tradução: antes (compilado) vs. durante (interpretado).

**3.** É localizar o programa no **disco**, copiá-lo para a **RAM**, o sistema operacional criar um **processo** (instância viva com memória reservada) e a **CPU** passar a executar suas instruções. O programa parado é arquivo; em execução, é processo.

**4.** Exemplos: versões diferentes da linguagem/bibliotecas entre os dois ambientes; uma **variável de ambiente** ou arquivo de configuração presente no PC e ausente no servidor; sistema operacional diferente; uma dependência instalada localmente mas não no servidor. Tudo isso é "ambiente", não "código" — e é por isso que existem containers.

**5.** Resposta aberta, mas o argumento forte: no **início**, velocidade de desenvolvimento costuma valer mais do que desempenho bruto, porque a empresa precisa validar a ideia e entregar rápido (lembre do MVP, [[12-Como-nasce-uma-startup]]); uma linguagem interpretada tende a ajudar nisso. **Com o tempo**, se partes do sistema virarem gargalo com milhões de usuários, faz sentido reescrever essas partes críticas em algo mais performático. Ou seja: a decisão é contextual e pode evoluir — exatamente o raciocínio de engenharia.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[21-O-que-e-um-sistema-operacional-e-o-kernel]] — o maestro que carrega, reserva memória e cria os processos.
- **Aprofunda "processo":** [[22-Processos-threads-e-memoria-RAM]] — o que é um processo por dentro.
- **Base para:** [[30-Logica-de-programacao-sem-trauma]] — quando você mesmo escreverá o código-fonte que será traduzido.
- **Aplicação futura:** Volume 4 ([[86]]) — Docker e containers, a solução moderna para "funciona na minha máquina".

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 4 → **Capítulo 20 de 119**.
