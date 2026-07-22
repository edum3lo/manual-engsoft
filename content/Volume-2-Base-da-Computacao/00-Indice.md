---
title: 'Índice do Volume 2'
---

# Volume 2 — A Base da Computação

> Coleção: *Do Estudante ao Engenheiro de Software*
> Este é o segundo dos 5 volumes. Aqui você abre a "caixa preta": entende **como o computador, o sistema operacional, o Linux e as redes realmente funcionam** — e ainda destrava a lógica, o código limpo e a arte de **ler qualquer projeto e documentação**.

---

## Como ler este volume

Você fez o Volume 1 e já entende *onde* está entrando (a profissão, a empresa, o dia a dia). Agora descemos para a **base técnica** que sustenta tudo o que vem nos Volumes 3, 4 e 5.

Se é a sua primeira vez, leia **em ordem**, do Capítulo 19 ao 40. Os módulos foram encadeados de propósito: primeiro a máquina (hardware), depois quem a controla (sistema operacional e Linux), depois como as máquinas conversam (redes), depois como você dá ordens a elas (lógica e programação), depois como se escreve isso *bem* (código limpo e design), e por fim como se **lê** o código e a documentação que já existem no mundo.

Cada capítulo é um arquivo próprio e segue a mesma estrutura de ~20 seções do Volume 1.

---

## Módulo 4 — Como o computador funciona

- [[19-Bits-processador-e-memoria]] — **Cap. 19** · O que existe dentro da máquina, sem misticismo: bit, byte, CPU, RAM.
- [[20-Como-um-computador-inicia-e-roda-um-programa]] — **Cap. 20** · Do botão de ligar ao seu código executando (boot e execução).

## Módulo 5 — Sistemas Operacionais

- [[21-O-que-e-um-sistema-operacional-e-o-kernel]] — **Cap. 21** · O "gerente" invisível que controla tudo; o kernel.
- [[22-Processos-threads-e-memoria-RAM]] — **Cap. 22** · Como o computador faz várias coisas ao mesmo tempo.
- [[23-Sistema-de-arquivos-permissoes-e-processos-em-background]] — **Cap. 23** · Onde os arquivos moram e quem pode mexer.

## Módulo 6 — Linux e o terminal

- [[24-Por-que-quase-todo-servidor-usa-Linux]] — **Cap. 24** · O sistema invisível que roda a internet.
- [[25-Terminal-e-comandos-essenciais]] — **Cap. 25** · `ls`, `cd`, `mkdir`, `cat`, `grep`, `nano`, `chmod` e amigos.
- [[26-Bash-PowerShell-variaveis-de-ambiente-e-acesso-remoto]] — **Cap. 26** · Scripts, variáveis de ambiente, `systemctl`, `ssh`, `scp`.

## Módulo 7 — Redes de Computadores

- [[27-Como-a-internet-funciona]] — **Cap. 27** · IP, DNS, portas: o endereçamento do mundo.
- [[28-Protocolos-e-protecao]] — **Cap. 28** · HTTP, HTTPS, TCP, UDP, firewall, proxy, VPN.
- [[29-O-que-acontece-quando-voce-digita-google-ponto-com]] — **Cap. 29** · ⭐ A pergunta de entrevista mais clássica, do começo ao fim.

## Módulo 8 — Lógica e Programação

- [[30-Logica-de-programacao-sem-trauma]] — **Cap. 30** · Variáveis, condições, repetições, funções — com receitas de cozinha.
- [[31-Estruturas-de-dados-essenciais]] — **Cap. 31** · Listas, pilhas, filas, dicionários, árvores.
- [[32-Algoritmos-e-complexidade-Big-O]] — **Cap. 32** · Por que um código é rápido ou lento (Big O sem medo).
- [[33-Paradigmas-e-orientacao-a-objetos]] — **Cap. 33** · Procedural, OO e funcional; classe, objeto, herança, polimorfismo.

## Módulo 9 — Qualidade de código e princípios de design

- [[34-Codigo-limpo]] — **Cap. 34** · Código é lido mais do que escrito (Clean Code).
- [[35-Principios-de-design-e-design-patterns]] — **Cap. 35** · SOLID, DRY, KISS, YAGNI e os padrões mais usados.

## Módulo 10 — Por dentro do código

- [[36-Como-um-projeto-real-e-organizado]] — **Cap. 36** · ⭐ `src/`, `controllers/`, `services/`, `repositories/`... o que cada pasta faz.
- [[37-Anatomia-de-um-projeto-no-GitHub]] — **Cap. 37** · Abrir um repositório real sem ficar perdido.

## Módulo 11 — Ler código e documentação

- [[38-Como-ler-documentacao]] — **Cap. 38** · ⭐ README, Swagger, JavaDoc, MDN, RFC. Ninguém ensina — e é essencial.
- [[39-Engenharia-reversa-entrar-num-projeto-gigante]] — **Cap. 39** · ⭐ Por onde começar num projeto de 500 mil linhas.
- [[40-Localizando-bugs-e-descobrindo-a-arquitetura]] — **Cap. 40** · Ler código como um detetive.

---

## 🗺️ Mapa mental do Volume 2 (em texto)

```
                        A BASE DA COMPUTAÇÃO
                                │
        ┌───────────────────────┼───────────────────────┐
        ↓                       ↓                        ↓
   A MÁQUINA               QUEM A CONTROLA         COMO ELAS CONVERSAM
   (Mód. 4)                (Mód. 5 e 6)                (Mód. 7)
   bit → byte              SO → kernel               IP → DNS → portas
   CPU · RAM · disco       processos · threads       TCP/UDP · HTTP/HTTPS
   boot · execução         arquivos · permissões     firewall · proxy · VPN
                           Linux · terminal · ssh    "digitei google.com"
        │                       │                        │
        └───────────────────────┼────────────────────────┘
                                ↓
                    COMO VOCÊ DÁ ORDENS À MÁQUINA
                            (Mód. 8)
             lógica → estruturas de dados → algoritmos/Big O → OO
                                ↓
                    COMO ESCREVER ISSO *BEM*
                            (Mód. 9)
                  código limpo → SOLID/DRY/KISS → patterns
                                ↓
                    COMO LER O QUE JÁ EXISTE
                          (Mód. 10 e 11)
        organização de projeto → GitHub → docs → engenharia reversa → caçar bugs
```

---

## 🔗 Fluxograma de amarração — como o Volume 2 conversa com o resto da coleção

```
VOL. 1 (você já sabe: profissão, empresa, dia a dia)
        ↓
VOL. 2  A BASE: máquina + SO/Linux + redes + lógica + código limpo + ler código
        ↓                              ↓                         ↓
   dá o "chão" para...          o Linux/terminal              a lógica e as
   entender servidores,         reaparece em DevOps           estruturas de dados
   deploy e cloud               e Cloud (Vol. 4)              sustentam banco,
   (Vol. 4)                                                   API e back-end (Vol. 3)
        ↓
VOL. 3  DESENVOLVIMENTO: requisitos → arquitetura → git → banco → API → front → back → testes
        ↓
VOL. 4  ENGENHARIA MODERNA: DevOps → cloud → observabilidade → escala → segurança → IA
        ↓
VOL. 5  CARREIRA + PROJETO INTEGRADOR (SaborExpress do zero à produção)
```

Repare: quase tudo o que você aprende aqui **reaparece aplicado** mais à frente. Redes viram APIs; Linux vira deploy; lógica vira algoritmos de negócio; ler código vira o seu primeiro dia em qualquer empresa.

---

## Ao final do Volume 2 você será capaz de

- Explicar, sem misticismo, o que acontece dentro do computador — de bits e transistores até o seu programa rodando.
- Entender o papel do **sistema operacional** e do **kernel**, e o que são processos, threads, memória e permissões.
- Se virar no **terminal Linux**: navegar, manipular arquivos, ajustar permissões, ler logs e acessar máquinas remotas por `ssh`.
- Descrever **como a internet funciona** (IP, DNS, portas, protocolos) e responder à clássica pergunta de entrevista *"o que acontece quando você digita google.com?"*.
- Dominar a **lógica de programação**, as **estruturas de dados** essenciais e a noção de **complexidade (Big O)**.
- Reconhecer os **paradigmas** (procedural, OO, funcional) e escrever **código limpo** guiado por bons princípios de design.
- **Ler** um projeto real e sua documentação — abrir um repositório grande, entender a organização das pastas, achar bugs e reconstruir a arquitetura de um sistema que você não escreveu.

**Próximo volume:** *Volume 3 — Desenvolvimento de Software* (do requisito ao deploy: processos, UX, arquitetura, git, banco, API, front, back e testes).
