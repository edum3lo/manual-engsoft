# Capítulo 26 — Bash, PowerShell, variáveis de ambiente e acesso remoto

> **Volume 2 — A Base da Computação** · Módulo 6 — Linux e o terminal
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender o que é um **script de shell** e como automatizar tarefas com **Bash**.
- Conhecer o **PowerShell** e como o terminal difere entre Windows e Linux/Mac.
- Compreender **variáveis de ambiente** e por que são a forma padrão de configurar aplicações (senhas, chaves, ambiente).
- Gerenciar **processos** pelo terminal: `ps`, `top`, `kill`; e **serviços** com `systemctl`.
- Acessar máquinas remotas com **`ssh`** e transferir arquivos com **`scp`**.
- Ligar tudo isso à prática: como um dev opera, configura e automatiza servidores de produção.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos de prática.

---

## 📊 Nível de dificuldade

**Intermediário (3/5).**

---

## ✅ Pré-requisitos

- [[25-Terminal-e-comandos-essenciais]] (você precisa se virar com comandos básicos) e [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]] (serviços/daemons, permissões).

---

## 📖 Introdução

No capítulo anterior você aprendeu a dar comandos, **um a um**. Agora vamos dar o salto que transforma o terminal de "ferramenta" em "superpoder": **automatizar** (escrever uma vez, rodar sempre), **configurar** aplicações do jeito profissional (variáveis de ambiente), **gerenciar** o que está rodando (processos e serviços) e **operar máquinas à distância** (SSH).

Esse conjunto é o que separa alguém que "sabe uns comandinhos" de alguém que **opera sistemas de verdade**. Quando você entra num servidor a 2.000 km de distância, reinicia um serviço travado, ajusta uma variável de ambiente e sai — tudo pelo terminal —, você está fazendo o trabalho real de quem sustenta software em produção.

Este capítulo fecha o Módulo 6 e te entrega autonomia de operação. É denso e prático; vale ter um terminal por perto.

---

## 🧠 Analogia

Pense num **gerente que administra várias lojas espalhadas pelo país sem sair da sede**.

- Em vez de repetir as mesmas instruções toda manhã, ele escreve um **manual de procedimentos** que qualquer loja executa sozinha — isso é o **script** (automação).
- Ele não fixa dados sensíveis (senhas do cofre, código do alarme) dentro do manual público; guarda-os num **envelope lacrado por loja**, e o manual apenas diz "use o código do envelope" — isso são as **variáveis de ambiente** (configuração separada do código).
- Ele **liga para cada loja** (uma linha telefônica segura) para dar ordens e ver como estão, sem precisar viajar — isso é o **SSH** (acesso remoto).
- E ele acompanha **quem está trabalhando em cada loja** e pode mandar alguém parar ou recomeçar — isso é **gerenciar processos e serviços** (`ps`, `kill`, `systemctl`).

Guarde: **script = manual que se executa sozinho; variável de ambiente = envelope lacrado de segredos e configs; SSH = a linha segura para operar de longe.**

---

## 🧩 Conceitos fundamentais

### 1. Shell scripts: automatizar com Bash

Um **script** é um arquivo de texto com uma sequência de comandos do terminal, que o shell executa de cima a baixo. Em vez de digitar 10 comandos toda vez, você os salva num arquivo `.sh` e roda uma vez.

```bash
#!/bin/bash
# backup.sh — faz backup da pasta de dados e avisa no log

echo "Iniciando backup em $(date)"
cp -r /var/dados /backup/dados-$(date +%F)
echo "Backup concluído!" >> /var/log/backup.log
```

- A primeira linha (`#!/bin/bash`, o *shebang*) diz qual shell deve executar o arquivo.
- Você o torna executável (`chmod +x backup.sh`, do capítulo anterior) e roda com `./backup.sh`.

Scripts podem ter **variáveis**, **condições** (`if`) e **repetições** (`for`) — a mesma lógica de programação que você verá no [[30-Logica-de-programacao-sem-trauma]]. É por isso que scripting é a ponte natural entre "usar o terminal" e "programar".

> **Termo explicado — shell script:** arquivo de texto com comandos de terminal executados em sequência, usado para automatizar tarefas repetitivas (backup, deploy, limpeza).

### 2. Bash × PowerShell: o terminal em cada mundo

- **Bash** é o shell padrão do Linux e (com variações) do Mac. É o que roda nos servidores. É *o* shell que você mais vai usar profissionalmente.
- **PowerShell** é o shell moderno do **Windows**. Mais poderoso que o antigo "Prompt de Comando" (cmd), tem sua própria linguagem e comandos (`Get-ChildItem` em vez de `ls`, por exemplo).

A boa notícia: os **conceitos** (navegar, manipular arquivos, automatizar, variáveis) são os mesmos; muda a "sintaxe". E quem usa Windows pode instalar o **WSL** ([[24-Por-que-quase-todo-servidor-usa-Linux]]) para ter Bash de verdade, igual ao dos servidores. Para carreira em back-end/DevOps, **foque em Bash** — é onde a produção vive.

### 3. Variáveis de ambiente: configuração separada do código

Uma **variável de ambiente** é um valor guardado pelo sistema, disponível para os programas, com um nome. Exemplos: `PATH` (onde o sistema procura os comandos), `HOME` (sua pasta pessoal). No terminal:

- `echo $HOME` → mostra o valor da variável HOME.
- `export API_KEY="abc123"` → cria/define uma variável para a sessão.

Por que isso é tão importante? Porque é a forma **profissional e segura** de configurar aplicações. Regra de ouro da engenharia: **não escreva senhas, chaves e configurações direto no código**. Em vez disso, o código lê de variáveis de ambiente:

```
❌ Errado:  senha_banco = "MinhaSenha123"     (no código, vai parar no GitHub!)
✅ Certo:   senha_banco = ler_variavel("DB_PASSWORD")   (o valor vem do ambiente)
```

Assim, a **mesma** aplicação roda em desenvolvimento, teste e produção só mudando as variáveis — sem tocar no código. E segredos não vazam no repositório (você verá a importância disso em Git e Segurança). Essa ideia — "configuração vem do ambiente" — é um princípio central de aplicações modernas.

> **Termo explicado — variável de ambiente:** um valor nomeado, guardado pelo sistema e lido pelos programas, usado para configurar aplicações (ambiente, chaves, senhas) **sem colocar esses dados no código**.

### 4. Gerenciando processos pelo terminal

Aplicando o [[22-Processos-threads-e-memoria-RAM]], agora com comandos:

| Comando | O que faz |
|---|---|
| `ps aux` | lista os processos em execução (com PID, usuário, uso de CPU/memória). |
| `top` / `htop` | mostra os processos **em tempo real**, ordenados por consumo (o "gerenciador de tarefas" do terminal). |
| `kill PID` | pede para um processo encerrar (pelo seu número, o PID). |
| `kill -9 PID` | **força** o encerramento (quando o processo não responde). Use com cuidado. |

Cenário típico: um processo está consumindo 100% de CPU e travando o servidor. Você roda `top`, identifica o PID do culpado, e `kill` nele. É o "matar processo" que citamos no módulo de SO, agora na ponta dos dedos.

### 5. Serviços com systemctl

Lembra dos **daemons/serviços** do [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]]? No Linux moderno, quem os gerencia é o **systemd**, controlado pelo comando **`systemctl`**:

- `systemctl status nginx` → mostra se o serviço (aqui, o servidor web nginx) está rodando.
- `systemctl start nginx` / `stop nginx` → inicia / para o serviço.
- `systemctl restart nginx` → reinicia (o "primeiro socorro" clássico).
- `systemctl enable nginx` → faz o serviço subir **automaticamente no boot**.

É assim que se garante que o servidor da SaborExpress suba sozinho quando a máquina liga e volte a rodar após um reinício — sem ninguém logado, como todo bom daemon.

### 6. Acesso remoto: SSH e SCP

Você quase nunca está fisicamente na frente de um servidor. Então como opera? Com **SSH (Secure Shell)** — uma conexão **criptografada** que te dá um terminal na máquina remota, como se você estivesse lá.

- `ssh ana@203.0.113.10` → conecta você ao servidor naquele endereço, como usuária `ana`. A partir daí, todos os comandos que você digita rodam **no servidor**, não no seu PC.
- **Chaves SSH:** em vez de senha, usa-se um par de chaves (uma pública, no servidor; uma privada, sua) — mais seguro e prático. Você gera com `ssh-keygen`.

E para **transferir arquivos** entre seu PC e o servidor, o parente do SSH:

- `scp arquivo.txt ana@203.0.113.10:/home/ana/` → copia um arquivo local para o servidor (de forma segura).
- `scp ana@203.0.113.10:/var/log/app.log .` → traz um arquivo do servidor para o seu PC.

> **Termo explicado — SSH (Secure Shell):** protocolo que abre um terminal seguro e criptografado numa máquina remota, permitindo operá-la de qualquer lugar. **SCP** é o comando irmão para copiar arquivos por esse canal seguro.

SSH é, para o profissional de back-end/DevOps, o **portal de entrada** para o mundo dos servidores. Você o usará todos os dias.

---

## ⚙️ Como funciona na prática

Vamos juntar tudo numa operação real: fazer um pequeno deploy e resolver um problema num servidor de produção da SaborExpress.

```bash
# 1. Do seu PC, você acessa o servidor de produção (acesso remoto)
$ ssh ana@203.0.113.10
   → agora você está "dentro" do servidor Linux

# 2. Você confere se o serviço da aplicação está de pé (serviços)
$ systemctl status saborexpress
   ● saborexpress - ativo (running)

# 3. Você percebe que o servidor está lento; investiga os processos
$ top
   → um processo antigo está usando 99% de CPU; anota o PID (4821)

# 4. Você encerra o processo travado (processos)
$ kill 4821
   → CPU normaliza

# 5. Você atualiza uma configuração via variável de ambiente e reinicia o serviço
$ export FEATURE_PROMO="on"        # (ilustrativo; em produção via arquivo de config)
$ systemctl restart saborexpress   # aplica a mudança
$ systemctl status saborexpress    # confirma que voltou a rodar

# 6. Você acompanha o log ao vivo para garantir que está saudável (do cap. anterior)
$ tail -f /var/log/saborexpress/app.log
   ... requisições sendo atendidas normalmente ... ✅

# 7. Você traz uma cópia do log para analisar com calma no seu PC (transferência)
$ exit                             # sai do servidor, volta ao seu PC
$ scp ana@203.0.113.10:/var/log/saborexpress/app.log .
```

Repare na história completa: você **acessou de longe** (ssh), **verificou serviços** (systemctl), **investigou e matou um processo** (top/kill), **ajustou configuração** (variável de ambiente), **reiniciou** (systemctl restart), **acompanhou ao vivo** (tail -f) e **trouxe um arquivo** (scp). Isso é, em miniatura, o trabalho de quem opera produção. E tudo isso repousa nos conceitos que você vem acumulando desde o módulo de SO. Você fechou o ciclo: da teoria do sistema operacional à operação real de um servidor.

---

## 🍔 Aplicação na SaborExpress

**A configuração da SaborExpress vive em variáveis de ambiente.** A senha do banco de dados, a chave da integração de pagamento, a chave dos mapas — nada disso está escrito no código da SaborExpress (se estivesse, vazaria no GitHub e seria um desastre de segurança). Tudo vem de **variáveis de ambiente**, diferentes em cada ambiente: em desenvolvimento apontam para um banco de teste; em produção, para o banco real. O mesmo código, comportamentos diferentes — só mudando o "envelope lacrado". Essa disciplina liga direto ao módulo de Segurança e à LGPD (Volume 4): segredos fora do código, sempre.

**A automação economiza o time da Ana.** Tarefas repetitivas — fazer backup do banco toda madrugada, limpar logs antigos, subir uma nova versão — viram **scripts** que rodam sozinhos (ou com um comando). Em vez de um dev gastar meia hora por dia clicando, um script de dez linhas faz em segundos, toda vez igual, sem esquecer nenhum passo. Isso é a semente do **DevOps** (Volume 4): quanto mais a operação é automatizada, mais o time entrega e menos erra.

**O plantão de madrugada.** Lembra do [[18-Bastidores-uma-semana-real]], com o incidente às 3h? Na prática, o dev de plantão faz exatamente o que você viu acima: recebe o alerta no celular, dá `ssh` no servidor de casa, investiga com `top` e `tail -f`, reinicia o serviço com `systemctl restart` e volta a dormir. Sem SSH e sem esses comandos, resolver um incidente remoto seria impossível. Você acaba de aprender as ferramentas do plantão.

---

## 🏢 Como isso acontece em uma empresa

- **SSH é o crachá de acesso à produção.** Devs de back-end e DevOps recebem chaves SSH para entrar nos servidores. Cuidar bem da sua chave privada é responsabilidade de segurança séria.
- **"Config via ambiente" é padrão da indústria.** A ideia de separar configuração do código é tão consolidada que virou princípio (o "Twelve-Factor App"). Ninguém sério coloca senha no código.
- **Automação é cultura, não luxo.** Times maduros automatizam tudo que é repetitivo — e desconfiam de processos manuais, porque humanos esquecem passos e erram. Scripts são o primeiro degrau; ferramentas de CI/CD e infraestrutura como código (Volume 4) são a evolução.
- **`systemctl restart` é o primeiro socorro universal.** "Tentou reiniciar o serviço?" é a pergunta número um em incidentes. Resolve muita coisa na hora — mas, como já vimos, a equipe madura também investiga a causa.

---

## ⚠️ Erros comuns

- **Colocar senhas e chaves no código.** O erro mais grave e mais comum de quem começa. Use variáveis de ambiente. Uma chave commitada no GitHub pode ser explorada em minutos.
- **`kill -9` em tudo.** Forçar o encerramento (`-9`) sem dar chance de o processo terminar direito pode corromper dados. Tente `kill` normal primeiro.
- **Confundir "estou no meu PC" com "estou no servidor".** Depois de um `ssh`, seus comandos rodam **no servidor**. Rodar um `rm` achando que está no seu PC quando está na produção é um clássico desastre. Confira o prompt (ele mostra o host).
- **Não tornar serviços "enable".** Você inicia um serviço com `start`, mas se não der `enable`, ele **não volta** após um reboot da máquina — e o sistema fica fora do ar sem ninguém entender por quê.
- **Achar que PowerShell e Bash são intercambiáveis.** Os conceitos são parecidos, mas comandos e sintaxe diferem. Saber em qual mundo você está evita confusão.
- **Deixar de proteger a chave SSH privada.** Ela é a "chave da sua casa". Vazou, comprometeu o acesso. Nunca a compartilhe nem a suba num repositório.

---

## 💡 Dicas profissionais

- **Trate segredos como radioativos: nunca no código, sempre no ambiente.** Adote esse reflexo desde o primeiro projeto. Ele te salva de vazamentos e é esperado em qualquer empresa séria.
- **Automatize na terceira vez.** Fez uma tarefa manual três vezes? Vire um script. O tempo investido se paga rápido e reduz erros.
- **Antes de qualquer comando destrutivo em SSH, confirme onde está.** Olhe o prompt: é o seu PC ou a produção? Esse hábito evita o pior tipo de acidente.
- **Aprenda chaves SSH desde cedo.** Autenticar por chave (em vez de senha) é mais seguro, mais prático e esperado no mercado. E é o mesmo mecanismo que você usará no GitHub (Volume 3).
- **Use `systemctl status` e `journalctl` para diagnosticar serviços.** Antes de sair reiniciando, veja o *status* e os logs do serviço — muitas vezes a causa já está ali.

---

## 🎈 Curiosidades

- O **"12-Factor App"**, um conjunto de boas práticas publicado por engenheiros da Heroku em 2011, consagrou "guarde a configuração no ambiente" como regra. É leitura clássica para quem vai trabalhar com aplicações modernas.
- O **`sudo`** tem um easter egg famoso: quando você erra a senha, algumas configurações exibem mensagens engraçadas ou insultos gentis (o modo "insults"). Cultura de terminal tem seu humor.
- O SSH substituiu protocolos antigos (como o Telnet) justamente porque estes enviavam **senhas em texto puro** pela rede — qualquer um no caminho lia. A criptografia do SSH foi um salto de segurança que definiu o acesso remoto moderno (você entende o porquê no [[28-Protocolos-e-protecao]]).
- Muitos incidentes históricos de "apaguei a produção" aconteceram por causa da confusão entre estar no terminal local e no remoto. É tão comum que virou gênero de história de guerra entre devs — e a lição é sempre a mesma: **olhe o prompt antes do Enter**.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Shell script** | Arquivo com comandos de terminal executados em sequência (automação). |
| **Bash** | O shell padrão do Linux/Mac; o mais usado em servidores. |
| **PowerShell** | O shell moderno do Windows, com sua própria sintaxe. |
| **Variável de ambiente** | Valor nomeado guardado pelo sistema para configurar programas fora do código. |
| **`export`** | Comando que define uma variável de ambiente na sessão. |
| **`ps` / `top` / `htop`** | Listar processos / vê-los em tempo real. |
| **`kill` / `kill -9`** | Encerrar um processo / forçar o encerramento. |
| **`systemctl`** | Comando para gerenciar serviços (start, stop, restart, enable, status). |
| **systemd** | O gerenciador de serviços do Linux moderno. |
| **SSH** | Terminal seguro e criptografado numa máquina remota. |
| **SCP** | Cópia segura de arquivos entre máquinas via SSH. |
| **Chave SSH** | Par de chaves (pública/privada) para autenticar sem senha. |

---

## 📝 Resumo

- Um **shell script** (Bash) automatiza sequências de comandos — a ponte entre usar o terminal e programar (com variáveis, `if`, `for`).
- **Bash** domina Linux/Mac e os servidores; **PowerShell** é o shell do Windows. Conceitos iguais, sintaxes diferentes; para produção, foque em Bash (via WSL, se preciso).
- **Variáveis de ambiente** são o jeito profissional de configurar aplicações: **segredos e configs ficam fora do código**, variando por ambiente. Nunca coloque senha no código.
- Pelo terminal você **gerencia processos** (`ps`, `top`, `kill`) e **serviços** (`systemctl start/stop/restart/enable/status`).
- Você opera servidores **de qualquer lugar** com **SSH** (terminal remoto seguro) e transfere arquivos com **SCP** — as ferramentas do trabalho real de produção e do plantão.
- Juntos, esses recursos te dão **autonomia de operação**: acessar, investigar, corrigir, configurar e automatizar sistemas de verdade.

---

## ☑️ Checklist de aprendizado

- [ ] Sei o que é um shell script e para que serve automatizar tarefas.
- [ ] Entendo a diferença entre Bash e PowerShell e onde cada um vive.
- [ ] Compreendo variáveis de ambiente e por que segredos não vão no código.
- [ ] Gerencio processos (`ps`, `top`, `kill`) e serviços (`systemctl`) pelo terminal.
- [ ] Sei acessar um servidor remoto com `ssh` e transferir arquivos com `scp`.
- [ ] Entendo por que confirmar "onde estou" antes de comandos destrutivos é vital.

---

## ✏️ Exercícios

**1.** O que é um shell script e por que ele é a "ponte" entre usar o terminal e programar? Dê um exemplo de tarefa que valha a pena virar script.

**2.** Explique por que a senha do banco de dados da SaborExpress deve vir de uma **variável de ambiente** e não estar escrita no código. Cite dois benefícios.

**3.** Um servidor está lento por causa de um processo consumindo 100% da CPU. Descreva, com comandos, como você o encontraria e encerraria.

**4.** Qual a diferença entre `systemctl start` e `systemctl enable`? O que acontece se você iniciar um serviço mas esquecer de "enable" e a máquina reiniciar?

**5. (Reflexão)** Você recebe um alerta às 3h de que a SaborExpress está fora do ar. Descreva, passo a passo com os comandos, como você — de casa, no seu notebook — investigaria e tentaria resolver.

---

## 💬 Respostas comentadas

**1.** Um shell script é um arquivo com comandos executados em sequência. É a "ponte" porque introduz variáveis, condições (`if`) e repetições (`for`) — a mesma lógica de programação — usando os comandos que você já conhece. Bons candidatos a virar script: backup diário do banco, limpeza de arquivos temporários, rotina de deploy — qualquer coisa repetitiva e propensa a erro humano.

**2.** Porque colocar a senha no código faz com que ela vá parar no repositório (GitHub), onde pode vazar e ser explorada — um risco grave de segurança e de LGPD. Com variável de ambiente: (1) o segredo fica fora do código e não vaza no repositório; (2) o mesmo código roda em desenvolvimento, teste e produção só trocando a variável, sem editar o código.

**3.** `top` (ou `htop`) para ver os processos em tempo real e identificar o que está com uso altíssimo de CPU, anotando o **PID**. Depois, `kill PID` para pedir o encerramento; se ele não responder, `kill -9 PID` para forçar (com cautela, pois pode corromper dados).

**4.** `systemctl start` **inicia** o serviço agora, na sessão atual; `systemctl enable` faz o serviço **subir automaticamente no boot**. Se você só der `start` e esquecer o `enable`, o serviço roda até a máquina reiniciar — mas, após o reboot, **não sobe sozinho**, e o sistema fica fora do ar até alguém iniciá-lo manualmente.

**5.** Exemplo: do notebook, `ssh usuario@servidor` para entrar (acesso remoto) → `systemctl status saborexpress` para ver se o serviço caiu → se caiu, olhar o porquê com `journalctl` ou `tail -f /var/log/.../app.log` → se for um processo travado ou memória, `top` para investigar → tentar `systemctl restart saborexpress` como primeiro socorro → acompanhar `tail -f` no log para confirmar que voltou a atender → se resolvido, registrar o ocorrido para investigar a causa depois. Sempre conferindo, pelo prompt, que os comandos estão rodando **no servidor**.

---

## 🔗 Próximos capítulos relacionados

- **Próximo (linear):** [[27-Como-a-internet-funciona]] — abre o Módulo 7; o SSH que você usou aqui viaja por essa rede.
- **Base direta:** [[25-Terminal-e-comandos-essenciais]] e [[22-Processos-threads-e-memoria-RAM]] (os processos que aqui você gerencia).
- **Reaparece em:** [[36-Como-um-projeto-real-e-organizado]] (arquivos de configuração e variáveis de ambiente num projeto real).
- **Aplicação futura:** Volume 4 (DevOps/CI-CD, Cloud, Docker — automação e SSH em escala) e Segurança (segredos, chaves).

---

> 🧭 **Você está aqui:** Volume 2 → Módulo 6 → **Capítulo 26 de 119**.
