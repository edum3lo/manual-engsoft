# Capítulo 25 — Terminal e comandos essenciais

> **Volume 2 — A Base da Computação** · Módulo 6 — Linux e o terminal
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é o **terminal (shell)** e por que ele é tão poderoso.
- **Navegar** pelo sistema de arquivos por comando: `pwd`, `ls`, `cd`.
- **Criar, mover, copiar e apagar** arquivos e pastas: `mkdir`, `touch`, `cp`, `mv`, `rm`.
- **Ler e buscar** dentro de arquivos: `cat`, `less`, `head`, `tail`, `grep`.
- Ajustar **permissões**: `chmod`, `chown` (aplicando o [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]).
- Editar arquivos no terminal com `nano`/`vim` e pedir ajuda com `man` e `--help`.
- Usar a ideia de **combinar comandos** com o *pipe* (`|`) e redirecionamentos.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 25 minutos praticando os comandos.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).** É um capítulo de *fazer*, não só de ler.

---

## ✅ Pré-requisitos

- [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]] (caminhos, pastas, permissões) e [[24-Por-que-quase-todo-servidor-usa-Linux]].
- **Muito recomendado:** ter um terminal aberto (Linux, Mac, ou WSL no Windows) para testar cada comando enquanto lê.

---

## 📖 Introdução

Chegou a hora de encarar a **tela preta com texto**. Para muita gente que está começando, o terminal é a coisa mais intimidante da computação — parece coisa de filme de hacker. A verdade é o oposto: o terminal é a ferramenta **mais direta, honesta e poderosa** que você vai aprender. Ele faz exatamente o que você manda, sem enrolação.

Por que aprender isso, se existem interfaces gráficas bonitas? Porque, como você viu no [[24-Por-que-quase-todo-servidor-usa-Linux]], a maioria dos servidores **só** tem terminal. E porque, mesmo no seu PC, o terminal costuma ser mais rápido: renomear 500 arquivos, buscar um texto em mil arquivos, ver o que está consumindo memória — tudo isso é um comando, não meia hora de cliques.

Este é um capítulo para **praticar**. Não passe os olhos: abra um terminal e digite cada comando. O terminal se aprende com os dedos, não com os olhos. Ao final, você não vai mais travar diante da tela preta — vai saber se virar.

---

## 🧠 Analogia

Pense na diferença entre **pedir num restaurante apontando o cardápio com figuras** e **falar direto com o chef**.

A **interface gráfica** (janelas, ícones, mouse) é o cardápio com figuras: fácil, visual, mas você só pode pedir o que está ilustrado ali, um item de cada vez, no ritmo do garçom.

O **terminal** é falar direto com o chef, na língua dele: "quero o prato X, sem cebola, com o dobro de molho, e prepare três de uma vez". Exige aprender a língua (os comandos), mas em troca você consegue pedir **qualquer coisa, com precisão, e em lote** — coisas que nem apareceriam num cardápio de figuras. E, o principal: você pode **escrever a receita uma vez e mandar o chef repeti-la sempre** (isso é o script, próximo capítulo).

Guarde: **o terminal é falar a língua da máquina diretamente — mais a aprender, muito mais poder.**

---

## 🧩 Conceitos fundamentais

### 1. Terminal, shell e prompt

- **Terminal:** a janela de texto onde você digita comandos e vê respostas.
- **Shell:** o programa que *interpreta* seus comandos (o mais comum no Linux é o **Bash**). O terminal é a janela; o shell é o cérebro que entende o que você digitou.
- **Prompt:** o texto que aparece esperando seu comando, geralmente terminando em `$` (usuário comum) ou `#` (root). Ex.: `ana@servidor:~$`.

> **Termo explicado — shell:** o programa que lê os comandos que você digita e os executa. Bash é o mais famoso. Você aprofunda no [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]].

Você digita um comando, aperta **Enter**, o shell executa e mostra o resultado. Simples assim. A estrutura de um comando costuma ser: `comando -opções argumentos`. Ex.: `ls -l /home` → comando `ls`, opção `-l`, argumento `/home`.

### 2. Navegação: onde estou e para onde vou

Aplicando os caminhos do [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]:

| Comando | O que faz |
|---|---|
| `pwd` | *print working directory* — mostra **onde você está** agora. |
| `ls` | lista os arquivos e pastas do diretório atual. |
| `ls -l` | lista em detalhe (permissões, dono, tamanho, data). |
| `ls -la` | idem, incluindo arquivos ocultos (que começam com `.`). |
| `cd pasta` | *change directory* — **entra** numa pasta. |
| `cd ..` | sobe um nível (pasta pai). |
| `cd ~` ou `cd` | vai para a sua pasta pessoal (`/home/voce`). |
| `cd /` | vai para a raiz. |

Rotina real: `pwd` para saber onde está, `ls` para ver o que tem, `cd` para se mover. Você repetirá isso o dia inteiro.

### 3. Criando e apagando: arquivos e pastas

| Comando | O que faz |
|---|---|
| `mkdir nome` | cria uma pasta. |
| `touch arquivo.txt` | cria um arquivo vazio (ou atualiza a data de um existente). |
| `cp origem destino` | **copia** um arquivo. `cp -r` copia pastas inteiras. |
| `mv origem destino` | **move** (ou **renomeia**) um arquivo/pasta. |
| `rm arquivo` | **apaga** um arquivo. `rm -r pasta` apaga uma pasta inteira. |

> ⚠️ **Cuidado com `rm`.** No terminal **não há lixeira**: `rm` apaga de vez. `rm -rf /` (apagar tudo, à força, a partir da raiz) é o comando mais temido do mundo Unix — ele destrói o sistema. Trate `rm -rf` com respeito absoluto. Sempre confira **onde você está** (`pwd`) e **o que vai apagar** antes de dar Enter.

### 4. Lendo e buscando dentro de arquivos

Metade do trabalho num servidor é **ler** arquivos (configs, logs). Os comandos:

| Comando | O que faz |
|---|---|
| `cat arquivo` | despeja o conteúdo inteiro na tela (bom para arquivos curtos). |
| `less arquivo` | abre o arquivo para rolar com calma (`q` para sair). Ótimo para logs longos. |
| `head arquivo` | mostra as primeiras linhas (padrão: 10). |
| `tail arquivo` | mostra as últimas linhas. |
| `tail -f arquivo` | acompanha o arquivo **em tempo real** (essencial para ver logs "ao vivo"). |
| `grep "texto" arquivo` | **busca** por "texto" dentro do arquivo e mostra as linhas que casam. |

O **`grep`** é uma estrela. "Procure a palavra `ERROR` no log" vira `grep "ERROR" app.log`. Em vez de rolar milhares de linhas com os olhos, o grep te entrega só o que importa. Você usará grep a vida inteira.

### 5. Permissões na prática: chmod e chown

Aplicando o [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]:

- `chmod +x script.sh` → torna um arquivo **executável** (dá a permissão `x`).
- `chmod 644 arquivo` → define permissões por números (6=rw para dono, 4=r para grupo e outros). Um esquema comum para arquivos.
- `chmod 755 pasta` → comum para pastas/executáveis (dono rwx, resto r-x).
- `chown ana arquivo` → muda o **dono** para `ana`.
- Muitas dessas ações exigem poderes de administrador: você as antecede com **`sudo`** (executar "como superusuário"), que você aprofunda no próximo capítulo.

### 6. Editar arquivos e pedir ajuda

- **`nano arquivo`**: um editor de texto simples dentro do terminal. As ações aparecem no rodapé (`^O` salvar, `^X` sair). **Comece por ele.**
- **`vim arquivo`**: um editor poderoso e onipresente, porém com curva de aprendizado (o meme "como saio do vim?" é real — a resposta é apertar `Esc`, digitar `:q!` e Enter). Vale aprender o básico, pois está em todo servidor.
- **`man comando`**: abre o **manual** completo de um comando. `man ls` explica tudo do `ls`.
- **`comando --help`**: um resumo rápido das opções. `ls --help`.

> **Dica de ouro:** ninguém decora tudo. Profissionais experientes usam `man` e `--help` o tempo todo. Saber **procurar** vale mais do que saber de cor.

### 7. Combinando comandos: o poder do pipe (`|`) e do redirecionamento

Aqui mora a mágica que a interface gráfica não tem. O **pipe** (`|`) pega a saída de um comando e a entrega como entrada para outro:

- `cat app.log | grep "ERROR"` → lê o log e filtra só as linhas com ERROR.
- `ls -l | grep ".txt"` → lista arquivos e mostra só os `.txt`.

E o **redirecionamento** (`>` e `>>`) manda a saída para um arquivo em vez da tela:

- `ls > lista.txt` → grava a lista de arquivos num arquivo (sobrescreve).
- `echo "linha nova" >> log.txt` → **acrescenta** uma linha ao final do arquivo.

Encadear comandos assim — cada um fazendo uma coisa simples, ligados por pipes — é a **filosofia Unix** em ação, e é o que torna o terminal absurdamente produtivo.

> **Termo explicado — pipe (`|`):** operador que conecta comandos, passando a saída de um como entrada do próximo, permitindo montar "linhas de montagem" de processamento de texto.

---

## ⚙️ Como funciona na prática

Vamos a uma sessão real: você acabou de entrar num servidor para investigar um erro reportado na SaborExpress.

```bash
$ pwd                              # onde estou?
/home/ana

$ cd /var/log/saborexpress         # vou para onde ficam os logs
$ ls -l                            # o que tem aqui?
-rw-r--r-- 1 app app 2400000 app.log
-rw-r--r-- 1 app app  120000 app.log.old

$ tail -n 50 app.log               # as últimas 50 linhas do log
... [várias linhas] ...
ERROR 22:14 falha ao gravar upload: permission denied /var/uploads

$ grep "permission denied" app.log # todas as ocorrências desse erro
ERROR 21:02 ... permission denied /var/uploads
ERROR 22:14 ... permission denied /var/uploads
                                   # → o erro se repete! é a pasta de uploads

$ ls -ld /var/uploads              # confiro as permissões da pasta
drwxr-xr-x 2 root root 4096 /var/uploads
                                   # dono é root; a app roda como "app" → não grava!

$ sudo chown app /var/uploads      # (com poder de admin) dou a posse à app
$ tail -f app.log                  # acompanho o log AO VIVO para confirmar a cura
... 22:20 upload gravado com sucesso ...   # resolvido ✅
```

Repare como **cada comando faz uma coisinha** e, juntos, resolvem um problema real: navegar (`cd`), listar (`ls`), ler o fim do log (`tail`), filtrar o erro (`grep`), inspecionar permissões (`ls -l`), corrigir (`chown`) e confirmar ao vivo (`tail -f`). Isso é o dia a dia de quem opera sistemas — e agora você entende cada passo. Nenhuma interface gráfica faz esse fluxo com a mesma rapidez.

---

## 🍔 Aplicação na SaborExpress

Praticamente **toda operação da SaborExpress em produção** passa por comandos como estes:

- **Investigar reclamações.** "Meu pedido não confirmou" → o dev entra no servidor, vai aos logs (`cd /var/log/...`), busca o pedido (`grep "pedido 8842" app.log`) e descobre o que houve. Sem `grep`, seria procurar uma agulha no palheiro rolando milhões de linhas.
- **Acompanhar um deploy ao vivo.** Ao subir uma nova versão, o time roda `tail -f` no log para ver, em tempo real, se a aplicação subiu limpa ou começou a cuspir erros — e reagir na hora.
- **Ajustar arquivos e permissões.** Corrigir uma configuração com `nano`, tornar um script executável com `chmod +x`, garantir que o serviço tenha acesso a uma pasta com `chown`. Micro-operações que mantêm o sistema de pé.
- **Manutenção do dia a dia.** Copiar um backup (`cp`), liberar espaço apagando logs antigos (com o cuidado devido no `rm`), mover arquivos processados (`mv`).

Para a Ana, isso significa que **um dev fluente no terminal resolve incidentes em minutos** — e minutos de app fora do ar, num delivery na hora do almoço, são pedidos e dinheiro perdidos. A fluência no terminal é, literalmente, tempo de recuperação menor.

---

## 🏢 Como isso acontece em uma empresa

- **O terminal é o "local de trabalho" em produção.** Do estágio ao sênior, quem opera sistemas vive no terminal. É onde se investiga, corrige e monitora.
- **`grep` e `tail -f` são reflexos.** "Deu erro?" → `tail -f` no log e `grep` pelo termo do erro. Esses dois comandos aparecem em quase todo incidente.
- **Cuidado com comandos destrutivos é cultura.** Times têm um respeito quase religioso por `rm -rf`, `sudo` e afins. Histórias de gente que apagou produção com um comando errado são folclore — e servem de lição. Confira sempre antes do Enter.
- **`sudo` é privilégio controlado.** Nem todo mundo tem `sudo` em produção; e quando tem, é auditado. Poder de administrador é levado a sério (liga com permissões e menor privilégio, [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]).

---

## ⚠️ Erros comuns

- **Usar `rm` sem conferir onde está.** Apagar a pasta errada porque você achava que estava em outro diretório. **Sempre** `pwd` e `ls` antes de apagar. E lembre: não há lixeira.
- **Sair digitando `sudo` em tudo.** `sudo` dá poder total; usá-lo sem necessidade é perigoso e pode estragar o sistema. Use só quando realmente precisa de administrador.
- **`chmod 777` para "resolver" permissão.** Já avisamos no [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]: abre buraco de segurança. Ajuste o mínimo necessário.
- **Rolar log gigante com `cat`.** `cat` num arquivo de milhões de linhas trava a tela. Use `less`, `tail`, `head` ou `grep` para ver só o que interessa.
- **Tentar decorar tudo.** Impossível e desnecessário. Entenda os conceitos, conheça os essenciais e use `man`/`--help` para o resto.
- **Ficar preso no vim sem saber sair.** Abriu o vim sem querer? `Esc`, `:q!`, Enter. Guarde isso e respire.

---

## 💡 Dicas profissionais

- **Antes de qualquer comando destrutivo, faça o ritual `pwd` + `ls`.** Confirme onde está e o que existe. Cinco segundos que evitam desastres irreversíveis.
- **Aprenda a "autocompletar" com Tab.** Comece a digitar um nome de arquivo/pasta e aperte **Tab**: o shell completa. Evita erros de digitação e é muito mais rápido.
- **Use a seta para cima para repetir comandos.** O terminal guarda o histórico (veja `history`). Você não redigita — recupera.
- **Combine comandos pequenos com pipe.** Em vez de procurar um comando gigante que faça tudo, encadeie os simples (`... | grep ... | tail ...`). É a filosofia Unix e resolve quase tudo.
- **Pratique num ambiente seguro antes da produção.** Erre à vontade no seu WSL/VM. Chegar à produção já com os dedos treinados evita o pânico e os acidentes.

---

## 🎈 Curiosidades

- O comando **`grep`** tem um nome estranho porque vem de um comando do editor antigo *ed*: `g/re/p` (*globally search a regular expression and print*). Virou verbo entre devs: "dá um grep nisso".
- **"Como sair do vim?"** é uma das perguntas mais buscadas da história da programação — tanto que virou piada universal. Você não está sozinho; todo mundo travou nele um dia.
- A filosofia Unix — **"faça uma coisa e faça bem, e combine programas simples"** — de 1978, é a mesma ideia por trás dos pipes. Meio século depois, continua sendo uma das melhores lições de design de software (e reaparece no [[34-Codigo-limpo]] e no [[35-Principios-de-design-e-design-patterns]]).
- Muitos comandos têm nomes curtíssimos (`ls`, `cd`, `rm`, `cp`) porque foram criados numa época em que digitar era lento e caro. A economia de teclas de 1970 moldou os comandos que você digita hoje.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Terminal** | A janela de texto onde você digita comandos. |
| **Shell** | O programa que interpreta e executa os comandos (ex.: Bash). |
| **Prompt** | O texto que espera seu comando (termina em `$` ou `#`). |
| **`pwd` / `ls` / `cd`** | Onde estou / listar / entrar em pasta. |
| **`mkdir` / `touch`** | Criar pasta / criar arquivo vazio. |
| **`cp` / `mv` / `rm`** | Copiar / mover ou renomear / apagar (sem lixeira!). |
| **`cat` / `less` / `head` / `tail`** | Ler conteúdo / rolar / início / fim de um arquivo. |
| **`grep`** | Buscar um texto dentro de arquivos. |
| **`chmod` / `chown`** | Mudar permissões / mudar dono. |
| **`sudo`** | Executar um comando como administrador (root). |
| **`nano` / `vim`** | Editores de texto no terminal (simples / poderoso). |
| **`man` / `--help`** | Manual completo / ajuda rápida de um comando. |
| **Pipe (`\|`)** | Liga comandos, passando a saída de um para o próximo. |
| **`>` / `>>`** | Redireciona a saída para um arquivo (sobrescreve / acrescenta). |

---

## 📝 Resumo

- O **terminal** é a janela; o **shell** (Bash) é quem interpreta seus comandos. Você digita `comando -opções argumentos` e aperta Enter.
- **Navegue** com `pwd`, `ls`, `cd`; **manipule** arquivos com `mkdir`, `touch`, `cp`, `mv`, `rm` (sem lixeira — cuidado com `rm -rf`).
- **Leia e busque** com `cat`, `less`, `head`, `tail`, `tail -f` (ao vivo) e, sobretudo, **`grep`** (filtrar texto).
- **Ajuste permissões** com `chmod`/`chown` (e `sudo` quando precisar de admin); **edite** com `nano`/`vim`; **peça ajuda** com `man` e `--help`.
- **Combine** comandos simples com **pipe (`|`)** e **redirecionamento (`>`, `>>`)** — a filosofia Unix que dá ao terminal um poder que a interface gráfica não tem.
- Isso é um capítulo de **prática**: os comandos entram nos dedos com repetição, não com leitura.

---

## ☑️ Checklist de aprendizado

- [ ] Sei o que são terminal, shell e prompt, e a estrutura de um comando.
- [ ] Navego pelo sistema com `pwd`, `ls`, `cd` (incluindo `..` e `~`).
- [ ] Crio, copio, movo e apago arquivos/pastas — com o devido cuidado no `rm`.
- [ ] Leio e busco em arquivos com `cat`, `less`, `tail -f` e `grep`.
- [ ] Ajusto permissões com `chmod`/`chown` e sei quando usar `sudo`.
- [ ] Combino comandos com pipe e redirecionamento, e sei pedir ajuda com `man`/`--help`.

---

## ✏️ Exercícios

> Faça no terminal de verdade (WSL, Linux ou Mac).

**1.** Crie uma pasta `teste`, entre nela, crie um arquivo `notas.txt`, confirme com `ls` e mostre onde você está com `pwd`.

**2.** Explique a diferença entre `cat`, `less` e `tail -f`, e diga em que situação cada um é o mais adequado.

**3.** Você tem um arquivo `app.log` com 1 milhão de linhas e quer ver só as que contêm a palavra `ERROR`. Escreva o comando. Depois, escreva um comando que grave essas linhas de erro num arquivo `erros.txt`.

**4.** O que faz `chmod +x deploy.sh`? Por que você faria isso? E por que `chmod 777` costuma ser uma má ideia?

**5. (Reflexão)** Descreva, passo a passo com os comandos, como você investigaria "a SaborExpress parou de gravar uploads" num servidor, desde entrar na pasta de logs até confirmar a correção.

---

## 💬 Respostas comentadas

**1.** `mkdir teste` → `cd teste` → `touch notas.txt` → `ls` (mostra `notas.txt`) → `pwd` (mostra algo como `/home/voce/teste`). O importante é encadear criação, navegação e verificação.

**2.** `cat` despeja o arquivo inteiro na tela — bom para arquivos **curtos** (num arquivo enorme, trava a tela). `less` abre para **rolar com calma** (útil em logs longos; `q` sai). `tail -f` acompanha o arquivo **em tempo real**, mostrando novas linhas conforme aparecem — ideal para observar um log "ao vivo" durante um deploy ou incidente.

**3.** Filtrar: `grep "ERROR" app.log`. Gravar num arquivo: `grep "ERROR" app.log > erros.txt` (o `>` redireciona a saída para o arquivo, sobrescrevendo; `>>` acrescentaria).

**4.** `chmod +x deploy.sh` dá permissão de **execução** ao arquivo, permitindo rodá-lo como um programa/script — você faz isso para poder executar seu script de deploy. `chmod 777` dá **todas as permissões (ler, escrever, executar) a todos os usuários**, o que abre um buraco de segurança; o certo é conceder o mínimo necessário.

**5.** Exemplo: `cd /var/log/saborexpress` (ir aos logs) → `tail -n 50 app.log` (ver os erros recentes) → `grep "upload" app.log` ou `grep "permission denied" app.log` (isolar o problema) → `ls -ld /var/uploads` (checar dono/permissões da pasta de uploads) → identificar que o usuário do serviço não tem escrita → `sudo chown app /var/uploads` (corrigir a posse) → `tail -f app.log` (acompanhar ao vivo e confirmar que os uploads voltaram). O essencial é o fluxo navegar → ler → filtrar → diagnosticar → corrigir → confirmar.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]] — automatizar comandos em scripts e acessar servidores remotos.
- **Base direta:** [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]] — os caminhos e permissões que estes comandos manipulam.
- **Você "vê" processos aqui:** ligado a [[22-Processos-threads-e-memoria-RAM]] — comandos como `ps`, `top` e `kill` (próximo capítulo) mostram e encerram processos.
- **Aplicação futura:** Volume 3 (Git — muitos comandos no terminal) e Volume 4 (DevOps, deploy, Docker — tudo por terminal).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 6 → **Capítulo 25 de 119**.
