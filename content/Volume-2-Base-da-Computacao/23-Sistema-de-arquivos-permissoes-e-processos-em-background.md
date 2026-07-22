---
title: '23 - Sistema de arquivos, permissões e processos em background'
---

# Capítulo 23 — Sistema de arquivos, permissões e processos em background

> **Volume 2 — A Base da Computação** · Módulo 5 — Sistemas Operacionais
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é um **sistema de arquivos** e como o SO organiza dados em **arquivos, pastas e caminhos**.
- Diferenciar **caminho absoluto** de **caminho relativo** e reconhecer a estrutura de diretórios do Linux.
- Compreender o modelo de **permissões** (leitura, escrita, execução) e de **usuários/grupos** — inclusive o famoso `chmod`/`chown`.
- Explicar o que são **processos em background**, **serviços (daemons)** e por que servidores rodam programas "no fundo" o tempo todo.
- Reconhecer a filosofia Unix do **"tudo é arquivo"**.
- Ligar isso à prática: por que "permissão negada", onde ficam os **logs** e por que um serviço "roda sozinho" sem ninguém logado.

---

## ⏱️ Tempo médio de estudo

**35 a 45 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- [[21-O-que-e-um-sistema-operacional-e-o-kernel]] (o SO como guardião) e [[22-Processos-threads-e-memoria-RAM]] (o que é um processo).

---

## 📖 Introdução

Fecha o módulo de sistemas operacionais com os três temas que você mais vai *tocar com as mãos* no dia a dia de servidor: **onde os arquivos moram**, **quem pode mexer neles** e **quais programas rodam sozinhos no fundo**.

Esses três assuntos parecem administrativos, mas são a origem de metade dos perrengues de quem está começando: "por que dá *permission denied*?", "onde eu acho o log do erro?", "como esse programa fica rodando sem ninguém logado na máquina?". Depois deste capítulo, essas perguntas deixam de ser mistério.

E aqui aparece uma das ideias mais bonitas do mundo Unix/Linux — **"tudo é arquivo"** — que vai deixar o Módulo 6 (terminal) muito mais fácil de entender. Este capítulo é a ponte perfeita para você, em seguida, colocar a mão no terminal Linux de verdade.

---

## 🧠 Analogia

Pense num **prédio de arquivos** gigante, tipo um cartório organizado.

- Cada **documento** é um **arquivo**.
- As **gavetas e armários** que agrupam documentos são as **pastas (diretórios)**.
- O **endereço completo** de um documento — "prédio → 3º andar → sala 12 → armário B → gaveta 4" — é o **caminho (path)**.
- O **crachá de cada funcionário** define o que ele pode fazer: alguns só **leem** certos documentos, outros podem **alterar**, poucos podem **executar** ações especiais. Isso são as **permissões**.
- E há **funcionários noturnos** que trabalham sozinhos, sem ninguém supervisionando, mantendo o cartório funcionando 24h — recebendo correspondência, organizando, respondendo pedidos automáticos. Esses são os **processos em background / serviços (daemons)**.

Guarde a cena: **arquivos são documentos; pastas são gavetas; o caminho é o endereço; permissões são o crachá; e serviços são os funcionários noturnos que nunca dormem.**

---

## 🧩 Conceitos fundamentais

### 1. Sistema de arquivos: dando ordem ao disco

Lá no [[19-Bits-processador-e-memoria]] vimos que o disco guarda bytes. Mas bytes soltos são inúteis — precisamos de organização. O **sistema de arquivos** é a estrutura que o SO usa para transformar "um monte de bytes no disco" em **arquivos com nome, dentro de pastas, formando uma árvore**.

> **Termo explicado — sistema de arquivos:** a forma como o SO organiza os dados no disco em arquivos e pastas, com nomes, tamanhos, datas e permissões. Exemplos de formatos: NTFS (Windows), ext4 (Linux), APFS (Mac).

### 2. Arquivos, pastas e a árvore de diretórios

Tudo se organiza numa **árvore**, que começa numa raiz:

- No **Windows**, cada disco tem sua raiz: `C:\`, `D:\`. As pastas são separadas por barra invertida: `C:\Usuarios\Ana\documentos\pedido.txt`.
- No **Linux/Mac**, há uma **única raiz**: `/`. Tudo pendura a partir dela, separado por barra normal: `/home/ana/documentos/pedido.txt`.

A estrutura padrão do Linux tem pastas com papéis fixos (você as verá muito):

```
/            ← a raiz de tudo
├── home/    ← pastas pessoais dos usuários (/home/ana)
├── etc/     ← arquivos de CONFIGURAÇÃO do sistema
├── var/     ← dados que mudam: LOGS ficam em /var/log
├── usr/     ← programas e bibliotecas instalados
├── bin/     ← comandos e executáveis básicos
├── tmp/     ← arquivos temporários (apagados de tempos em tempos)
└── root/    ← a "casa" do superusuário
```

### 3. Caminho absoluto × caminho relativo

- **Caminho absoluto:** o endereço completo desde a raiz. `/home/ana/documentos/pedido.txt`. Não importa "onde você está", ele sempre aponta para o mesmo lugar.
- **Caminho relativo:** o endereço a partir de **onde você está agora** (o "diretório atual"). Se você está em `/home/ana`, então `documentos/pedido.txt` chega no mesmo arquivo.

Dois atalhos essenciais que você usará no terminal:

- `.` significa "o diretório atual".
- `..` significa "o diretório de cima (pai)".

> **Termo explicado — caminho (path):** o endereço de um arquivo ou pasta na árvore de diretórios. **Absoluto** parte da raiz (`/`); **relativo** parte de onde você está.

Confundir os dois é uma das causas número um de "meu programa não acha o arquivo" — o código procura num caminho relativo achando que está numa pasta, mas está rodando de outra.

### 4. Permissões: quem pode ler, escrever e executar

No Linux, cada arquivo/pasta tem **permissões** que dizem o que se pode fazer, para três públicos:

- **Ações:** **r** (read/ler), **w** (write/escrever/alterar), **x** (execute/executar).
- **Públicos:** o **dono (user)**, o **grupo** e os **outros (todos)**.

Quando você vê algo como `rwxr-xr--`, leia em três blocos de três:

```
 rwx      r-x      r--
(dono)  (grupo)  (outros)
dono: pode ler, escrever e executar
grupo: pode ler e executar (não escrever)
outros: só pode ler
```

Dois comandos governam isso (você os usará no [[25-Terminal-e-comandos-essenciais]]):

- **`chmod`** (*change mode*): muda as **permissões** de um arquivo.
- **`chown`** (*change owner*): muda o **dono** (e grupo) de um arquivo.

> **Termo explicado — permissões:** regras que definem quem pode ler (r), escrever (w) e executar (x) um arquivo, para o dono, o grupo e os demais usuários.

### 5. Usuários, grupos e o superusuário (root)

O Linux é **multiusuário**: várias contas podem existir na mesma máquina, cada uma com seus arquivos e poderes. Acima de todos está o **root** (superusuário): ele pode tudo, ignora permissões. Por isso, executar algo "como root" é poderoso e **perigoso** — um erro de root pode destruir o sistema.

> **Termo explicado — root (superusuário):** o usuário com poderes totais no sistema. Usa-se com cuidado; muitas ações administrativas exigem "virar root" temporariamente (via `sudo`, que você verá no Módulo 6).

Essa é a base da segurança em servidores: cada serviço roda com o **mínimo de poder necessário**, para que, se for invadido ou tiver bug, o estrago seja limitado (princípio do menor privilégio, que reaparece em Segurança, Volume 4).

### 6. Processos em background e serviços (daemons)

Nem todo programa tem janela e alguém olhando. Muitos rodam **no fundo (background)**, sem interface, silenciosamente:

- Um **processo em background** é um programa que roda sem ocupar o "primeiro plano" — você inicia e ele fica trabalhando enquanto você faz outras coisas.
- Um **serviço** (no mundo Unix, um **daemon**) é um processo que fica rodando **o tempo todo**, geralmente iniciado junto com o sistema, esperando para atender pedidos: o servidor web, o banco de dados, o SSH, o agendador de tarefas.

> **Termo explicado — daemon/serviço:** um processo que roda continuamente em background, sem interface, prestando um serviço (servir páginas, aceitar conexões, rodar tarefas agendadas). O "servidor" da SaborExpress é, tecnicamente, um daemon.

É por isso que um **servidor** atende clientes 24h **sem ninguém logado nele**: o serviço foi iniciado como daemon e continua vivo, gerenciado pelo SO (no Linux moderno, pelo `systemd`, que você verá no [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]]).

### 7. A filosofia "tudo é arquivo"

Uma sacada genial do Unix: tratar **quase tudo como se fosse um arquivo**. Não só documentos — mas também dispositivos (o disco, o teclado), conexões e até informações do sistema aparecem como "arquivos" que você pode ler e escrever. Isso unifica tudo: se você sabe manipular arquivos, sabe manipular quase o sistema inteiro com as mesmas ferramentas. Essa filosofia é o que torna o terminal Linux tão poderoso — assunto do próximo módulo.

---

## ⚙️ Como funciona na prática

Vamos juntar os conceitos num cenário real de servidor. Imagine que você entrou (via SSH, [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]]) num servidor Linux para investigar por que a aplicação parou de gravar arquivos:

```
1. Você navega até a pasta da aplicação:  /home/saborexpress/app
        (caminho ABSOLUTO — parte da raiz)

2. A aplicação tenta gravar um arquivo em /var/uploads e recebe:
        "Permission denied"

3. Você olha as permissões da pasta e vê:
        drwxr-xr-x  dono=root  grupo=root   /var/uploads
        → só o dono (root) pode ESCREVER (w); os outros só leem/entram

4. Mas a aplicação roda como o usuário "saborexpress", não root!
        → por isso ela não consegue gravar: falta permissão de escrita

5. Correção: dar a posse (ou permissão de escrita) ao usuário certo:
        chown saborexpress /var/uploads      (muda o dono)
        → agora a aplicação grava normalmente

6. Enquanto isso, o log do erro estava, o tempo todo, em:
        /var/log/saborexpress/app.log
        → onde você poderia ter visto a mensagem detalhada
```

Repare como **todos os conceitos do capítulo aparecem juntos**: o caminho (onde), as permissões (por que barrou), o usuário que roda o serviço (quem), o serviço em background (a aplicação rodando sem ninguém logado) e o log (o "diário" do que aconteceu). Esse tipo de investigação é o pão com manteiga de qualquer dev que cuida de um sistema em produção — e você acabou de fazer uma, no papel.

---

## 🍔 Aplicação na SaborExpress

**O servidor da SaborExpress é um daemon.** O back-end da SaborExpress roda como um **serviço em background** numa máquina Linux na nuvem. Ninguém fica "com o programa aberto na tela"; ele foi iniciado como daemon e atende pedidos de clientes o tempo todo, mesmo de madrugada, mesmo com todos os desenvolvedores dormindo. Se cair, o `systemd` pode reiniciá-lo automaticamente. Essa é a natureza de um servidor — e explica como um app funciona 24h sem uma pessoa segurando-o de pé.

**Onde o time procura os erros.** Quando um cliente relata "meu pedido sumiu", o dev da Ana não adivinha: ele vai aos **logs** em `/var/log/...`, o "diário" que o serviço escreve contando o que fez e o que deu errado. Saber que logs existem, onde ficam e como lê-los é uma das primeiras habilidades de produção. (No Volume 4, os logs deixam de ser arquivos soltos e viram **observabilidade** estruturada — [[89]].)

**Permissões protegem os dados dos clientes.** Os arquivos com informações sensíveis (comprovantes, dados de pagamento) têm permissões restritas: só o serviço e o dono certo podem lê-los. Se as permissões estivessem frouxas (qualquer usuário do sistema podendo ler tudo), seria uma falha de segurança e um problema de **LGPD** (Volume 4). Aqui, "quem pode ler o quê" deixa de ser detalhe técnico e vira **proteção de dados pessoais** — tema caríssimo para a SaborExpress, que lida com endereços e cartões.

---

## 🏢 Como isso acontece em uma empresa

- **"Permission denied" é rito de passagem.** Todo mundo que começa em servidores bate nessa parede. Depois deste capítulo, você sabe o caminho: olhar dono, grupo e permissões, e ajustar com `chmod`/`chown` — ou entender por que *não* deveria ajustar (segurança).
- **Logs são a primeira parada em qualquer incidente.** "Deu erro em produção" → "o que dizem os logs?" é o reflexo número um. Saber navegar até `/var/log` e ler um log economiza horas.
- **Serviços são gerenciados, não "abertos".** Em produção, ninguém "abre o programa". Configura-se o serviço para subir sozinho, reiniciar se cair e escrever logs. Isso é operação básica de sistemas.
- **Menor privilégio é política de segurança.** Empresas evitam rodar serviços como root e restringem permissões ao mínimo. Um serviço comprometido com poderes limitados causa dano limitado. Isso é auditado.

---

## ⚠️ Erros comuns

- **Rodar tudo como root "para não dar erro de permissão".** É como resolver toda tranca dando a chave-mestra a todos. Funciona, mas é um risco de segurança gravíssimo. O certo é dar a permissão **mínima** necessária.
- **Confundir caminho absoluto e relativo.** Seu código acha o arquivo quando roda de uma pasta e "some" quando roda de outra. Quase sempre é caminho relativo mal usado. Na dúvida em produção, prefira caminhos claros e previsíveis.
- **Não saber onde estão os logs.** Ficar "adivinhando" o erro em vez de ler o log é perder tempo. O log quase sempre já conta o que houve.
- **Achar que "fechei o terminal, então o serviço parou".** Um daemon bem configurado continua rodando independentemente da sua sessão. E, por outro lado, um processo iniciado "à mão" pode morrer quando você desconecta se não foi configurado como serviço.
- **Deixar permissões frouxas em dados sensíveis.** "Deixei liberado para todo mundo ler, para facilitar" é a origem de vazamentos. Permissão é segurança.

---

## 💡 Dicas profissionais

- **Diante de "permission denied", faça o ritual: quem sou eu, quem é o dono, quais as permissões?** Essas três perguntas resolvem a esmagadora maioria dos casos, sem sair chutando `chmod 777` (dar tudo a todos — quase sempre errado).
- **Aprenda a ler as três casas de permissão (dono/grupo/outros) de bate-pronto.** É uma habilidade pequena que você usará mil vezes.
- **Ao investigar qualquer problema em servidor, vá aos logs primeiro.** `/var/log` é o seu melhor amigo. O erro detalhado quase sempre está lá esperando.
- **Entenda a filosofia "tudo é arquivo" antes do terminal.** Ela deixa o próximo módulo muito mais intuitivo: manipular o sistema vira "manipular arquivos", com as mesmas ferramentas.

---

## 🎈 Curiosidades

- A palavra **"daemon"** (não é "demônio" no sentido mau) vem do "demônio de Maxwell" da física — uma entidade invisível que trabalha nos bastidores. O mascote do BSD é, brincando com isso, um diabinho simpático.
- O comando **`chmod 777`** — que dá todas as permissões a todo mundo — é um meme entre desenvolvedores: é a "solução preguiçosa" que faz o erro sumir e abre um buraco de segurança. Ver `777` em produção é sinal de alerta.
- A ideia **"tudo é arquivo"** é tão radical no Linux que até informações da CPU e da memória aparecem como "arquivos" (em `/proc`). Você pode literalmente "ler um arquivo" para descobrir o modelo do seu processador.
- No Windows, o conceito equivalente a daemon é o **"serviço do Windows"** (aqueles que aparecem em "services.msc"). Cada SO tem seu jeito, mas a ideia — programas rodando no fundo, sem janela — é universal.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Sistema de arquivos** | Como o SO organiza os dados do disco em arquivos e pastas. |
| **Arquivo / Diretório (pasta)** | A unidade de dado e o agrupador de arquivos. |
| **Caminho (path)** | O endereço de um arquivo na árvore de pastas. |
| **Caminho absoluto** | Endereço a partir da raiz (`/` ou `C:\`). |
| **Caminho relativo** | Endereço a partir de onde você está (`.`, `..`). |
| **Permissões (rwx)** | Direito de ler, escrever e executar, por dono/grupo/outros. |
| **chmod / chown** | Comandos para mudar permissões / mudar dono de um arquivo. |
| **Usuário / Grupo** | Contas e conjuntos de contas com direitos próprios. |
| **root (superusuário)** | O usuário com poderes totais; usado com cuidado. |
| **Processo em background** | Programa que roda no fundo, sem primeiro plano. |
| **Daemon / Serviço** | Processo que roda continuamente prestando um serviço (ex.: servidor). |
| **Log** | Arquivo-diário onde um programa registra o que fez e os erros. |
| **"Tudo é arquivo"** | Filosofia Unix de tratar quase tudo como arquivo manipulável. |

---

## 📝 Resumo

- O **sistema de arquivos** organiza o disco em **arquivos e pastas** numa **árvore**, que no Linux começa na raiz `/` (`/home`, `/etc`, `/var/log`...).
- Um arquivo tem um **caminho**: **absoluto** (desde a raiz) ou **relativo** (desde onde você está, com `.` e `..`). Confundi-los é causa comum de "arquivo não encontrado".
- As **permissões (rwx)** definem quem pode **ler, escrever e executar**, para **dono, grupo e outros**; ajusta-se com **`chmod`** (permissão) e **`chown`** (dono). O **root** ignora tudo — poderoso e perigoso.
- **Processos em background** e **serviços (daemons)** rodam sem janela; um servidor é um daemon que atende 24h sem ninguém logado.
- A filosofia **"tudo é arquivo"** unifica o sistema e prepara o terreno para o poder do terminal.
- Na prática, esses conceitos aparecem juntos ao diagnosticar produção: caminho + permissão + usuário + serviço + **log**.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo o que é um sistema de arquivos e a árvore de diretórios do Linux.
- [ ] Diferencio caminho absoluto de relativo e sei o que são `.` e `..`.
- [ ] Sei ler permissões (rwx para dono/grupo/outros) e o que fazem `chmod` e `chown`.
- [ ] Compreendo usuários, grupos e o papel (e o perigo) do root.
- [ ] Sei o que são processos em background e daemons/serviços.
- [ ] Sei que logs existem, onde ficam e por que são a primeira parada num incidente.

---

## ✏️ Exercícios

**1.** Explique a diferença entre caminho absoluto e relativo, dando um exemplo de cada para o mesmo arquivo.

**2.** Leia as permissões `rwxr-x---` e diga exatamente o que o dono, o grupo e os outros podem fazer.

**3.** Um serviço roda como o usuário `app` e não consegue gravar numa pasta cujo dono é `root` com permissões `rwxr-xr-x`. Por que ele falha, e qual seria uma correção segura?

**4.** O que é um daemon? Explique como um servidor consegue atender clientes de madrugada sem ninguém logado na máquina.

**5. (Reflexão)** Por que dar `chmod 777` (tudo para todos) numa pasta com dados de clientes da SaborExpress é uma má ideia, mesmo que "resolva" o erro de permissão na hora?

---

## 💬 Respostas comentadas

**1.** **Absoluto** parte da raiz e sempre aponta ao mesmo lugar: `/home/ana/documentos/pedido.txt`. **Relativo** parte de onde você está: se você está em `/home/ana`, `documentos/pedido.txt` chega no mesmo arquivo. O relativo depende do "diretório atual"; o absoluto, não.

**2.** `rwxr-x---`: o **dono** pode ler, escrever e executar (rwx); o **grupo** pode ler e executar, mas não escrever (r-x); os **outros** não podem nada (---). É um arquivo bem restrito para quem não é dono nem do grupo.

**3.** Ele falha porque as permissões `rwxr-xr-x` dão **escrita (w) apenas ao dono (root)**; o usuário `app` cai em "outros", que só pode ler/entrar (r-x), não gravar. Correção segura: tornar `app` o **dono** da pasta (`chown app`) ou dar escrita ao grupo apropriado e colocar `app` nesse grupo — concedendo o **mínimo** necessário, em vez de liberar para todos.

**4.** Um **daemon** é um processo que roda continuamente em background, sem interface, prestando um serviço. O servidor atende de madrugada porque foi iniciado como daemon (geralmente pelo `systemd`) e continua vivo independentemente de sessões de usuário — ninguém precisa estar "com ele aberto"; o SO o mantém rodando e pode até reiniciá-lo se cair.

**5.** Porque `777` dá **leitura e escrita a qualquer usuário** do sistema, inclusive a serviços comprometidos ou contas que não deveriam ver nada. Em dados de clientes (endereços, pagamentos), isso é uma falha de segurança e de **LGPD**: expõe informação pessoal e permite adulteração. "Resolve" o sintoma abrindo um buraco muito pior; o certo é conceder permissão mínima ao usuário/serviço específico que precisa.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[24-Por-que-quase-todo-servidor-usa-Linux]] — abre o Módulo 6, onde você põe tudo isto em prática.
- **Você vai usar isto em:** [[25-Terminal-e-comandos-essenciais]] (`ls`, `cd`, `chmod`, `cat`) e [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]] (serviços, `ssh`).
- **Base anterior:** [[22-Processos-threads-e-memoria-RAM]] — o que é o processo que aqui roda em background.
- **Aplicação futura:** Volume 4 ([[89]] Observabilidade — logs profissionais; Segurança — permissões e LGPD).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 5 → **Capítulo 23 de 119**.
