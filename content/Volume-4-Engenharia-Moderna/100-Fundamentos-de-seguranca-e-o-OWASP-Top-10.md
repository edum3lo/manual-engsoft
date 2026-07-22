---
title: '100 - Fundamentos de segurança e o OWASP Top 10 ⭐'
---

# Capítulo 100 — Fundamentos de segurança e o OWASP Top 10 ⭐

> **Volume 4 — Engenharia Moderna** · Módulo 31 — Segurança
> Coleção: *Do Estudante ao Engenheiro de Software*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Entender por que **segurança é responsabilidade de todo desenvolvedor**, não só de especialistas.
- Adotar a mentalidade de **pensar como um atacante** para defender.
- Conhecer as principais falhas do **OWASP Top 10** (injeção, XSS, autenticação quebrada, etc.).
- Compreender princípios: **defesa em profundidade, menor privilégio, nunca confiar na entrada**.
- Saber aplicar práticas defensivas básicas no código do dia a dia.

---

## ⏱️ Tempo médio de estudo

**45 a 55 minutos**, mais 20 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Intermediário-avançado (4/5).**

---

## ✅ Pré-requisitos

- Ter lido [[73-Autenticacao-e-autorizacao]] (autenticação, "o back nunca confia no front").
- Ter lido [[68-SQL-na-pratica]] (SQL) e [[72-O-que-e-uma-API-HTTP-REST-e-JSON]].

---

## 📖 Introdução

Chegamos ao capítulo 100 — e a um tema que, mal compreendido, pode destruir uma empresa da noite para o dia: a **segurança**. Um único vazamento de dados, uma invasão, uma senha exposta, e anos de trabalho e a confiança dos usuários viram pó — sem falar em multas ([[101-LGPD-e-privacidade]]) e processos. Este capítulo, marcado com ⭐, estabelece os fundamentos da segurança de software através do recurso mais famoso da área: o **OWASP Top 10**, a lista das dez categorias de vulnerabilidades mais críticas em aplicações web. A mensagem central e transformadora é uma só: **segurança não é problema de "um especialista lá no fim"; é responsabilidade de todo desenvolvedor, em cada linha de código**.

A mudança de mentalidade começa por aprender a **pensar como um atacante**. Um desenvolvedor comum pensa em "como fazer isto funcionar"; um desenvolvedor com mentalidade de segurança pensa também em "como alguém **abusaria** disto?". Aquele campo de busca — e se eu digitar um comando de banco de dados nele? Aquele parâmetro na URL — e se eu trocar o número do meu pedido pelo de outro usuário? Aquele upload de foto — e se eu enviar um programa malicioso? Atacantes passam o dia inteiro procurando essas brechas, e a única defesa é os desenvolvedores as anteciparem. Isso conecta diretamente com o princípio que atravessa toda a coleção desde o [[73-Autenticacao-e-autorizacao]]: **nunca confie na entrada do usuário** — porque tudo que vem de fora pode ser malicioso.

O **OWASP Top 10** organiza esse conhecimento de forma prática. OWASP (Open Worldwide Application Security Project) é uma organização sem fins lucrativos que, periodicamente, compila as vulnerabilidades mais comuns e perigosas com base em dados reais de milhares de aplicações. A lista inclui clássicos como **injeção** (SQL injection — enganar o banco), **XSS** (injetar scripts na página de outros usuários), **autenticação quebrada**, **controle de acesso quebrado** (acessar o que não deveria) e mais. Junto com alguns **princípios universais** — defesa em profundidade, menor privilégio, nunca confiar na entrada — esses são o alfabeto da segurança defensiva. Este capítulo não te fará um especialista em segurança (isso é uma carreira inteira), mas te dará o **essencial que todo engenheiro precisa** para não abrir buracos óbvios — e a humildade de saber quando chamar quem entende mais. Nota importante: este é um capítulo **defensivo** — o objetivo é você **proteger** os sistemas que constrói, entendendo as ameaças para se defender delas.

---

## 🧠 Analogia

Pense na segurança de uma **casa** — e na diferença entre o morador que só pensa em "morar" e o que também pensa em "como um ladrão entraria".

O morador ingênuo constrói a casa pensando só em **conforto e função**: portas largas, janelas grandes, tudo prático. Ele **nunca pensa** em como alguém invadiria — então deixa a chave debaixo do tapete, a janela dos fundos sem tranca, o código do alarme escrito num papel na geladeira. A casa "funciona" perfeitamente para morar — e é um convite para o ladrão. É o desenvolvedor que só pensa em "fazer funcionar".

O morador consciente pensa como um **ladrão pensaria**: "por onde eu entraria? o que eu tentaria?". E então se defende em **camadas** (a **defesa em profundidade**): um muro, **e** uma porta reforçada, **e** um alarme, **e** um cofre para o que é valioso — de modo que, se o ladrão vencer uma barreira, ainda encontra outras. Ele dá a cada pessoa só a **chave do que ela precisa** (o **menor privilégio**): a diarista tem a chave da porta, mas não a do cofre; o jardineiro entra só no quintal. E ele **desconfia de quem bate à porta**: não abre para qualquer um que diga "sou o encanador" — **verifica** antes (**nunca confiar na entrada**).

O OWASP Top 10 é como uma **lista dos golpes mais comuns dos ladrões** da região, compilada pela polícia: "cuidado, tem gente entrando por janelas sem tranca (injeção), se passando por funcionários (autenticação quebrada), testando se as portas dos vizinhos estão abertas (controle de acesso)". Conhecer os golpes mais comuns te faz fechar justamente as brechas que os ladrões mais exploram. Guarde: segurança é pensar como o ladrão para se defender — em camadas, dando só as chaves necessárias, desconfiando de quem bate à porta, e conhecendo os golpes mais comuns da lista.

---

## 🧩 Conceitos fundamentais

### 1. Segurança é responsabilidade de todos

O maior erro cultural é achar que segurança é tarefa de "um time de segurança no fim". A maioria das vulnerabilidades nasce em **código comum**, escrito por desenvolvedores comuns. Por isso, cada desenvolvedor precisa dos **fundamentos** de segurança — o "shift left" da segurança (trazê-la para o início e para todos), como se faz com os testes ([[81-Por-que-testar-tipos-de-teste-e-a-piramide]]).

> **Termo explicado — segurança como responsabilidade compartilhada:** a segurança nasce (ou se perde) em cada linha de código, então é responsabilidade de todo desenvolvedor, não de um time isolado no fim do processo.

### 2. Pensar como um atacante

A postura defensiva exige antecipar o **abuso**: para cada entrada, pergunte "como alguém malicioso usaria isto?". Um campo de texto pode receber um ataque; um parâmetro de URL pode ser adulterado; um upload pode ser um vírus. Pensar nos abusos possíveis é o que permite bloqueá-los.

> **Termo explicado — modelagem de ameaças (pensar como atacante):** analisar um sistema perguntando como um adversário tentaria abusá-lo, para antecipar e bloquear os ataques antes que aconteçam.

### 3. OWASP Top 10 — os campeões de vulnerabilidade

O **OWASP Top 10** é a lista das dez categorias de vulnerabilidades web mais críticas, mantida pela OWASP com base em dados reais. Serve de **checklist** e vocabulário comum. Os principais:
- **Injeção (ex.: SQL Injection):** enganar um interpretador (o banco) injetando comando malicioso via entrada não tratada ([[68-SQL-na-pratica]]).
- **Controle de acesso quebrado:** acessar dados/ações que não deveria (ver o pedido de outro usuário trocando o ID na URL).
- **Falhas criptográficas:** dados sensíveis sem criptografia adequada (senhas em texto puro).
- **XSS (Cross-Site Scripting):** injetar scripts maliciosos que rodam no navegador de **outros** usuários.
- **Autenticação quebrada:** falhas em login, senhas, sessões que permitem se passar por outro ([[73-Autenticacao-e-autorizacao]]).
- **Configuração incorreta, componentes vulneráveis, SSRF** e outros.

> **Termo explicado — OWASP Top 10:** lista de referência das dez classes de vulnerabilidades web mais críticas, publicada pela OWASP, usada como checklist e vocabulário de segurança.

### 4. Injeção e XSS (as duas clássicas)

- **SQL Injection:** se você monta uma query concatenando a entrada do usuário direto (`"SELECT ... WHERE nome = '" + input + "'"`), um atacante digita algo como `' OR '1'='1` e **altera a lógica** da query — podendo ler ou apagar tudo. A defesa: **queries parametrizadas** (o banco trata a entrada como **dado**, nunca como comando).
- **XSS:** se você exibe a entrada do usuário numa página sem tratá-la, um atacante insere um `<script>` que roda no navegador de **outros** usuários (roubando sessões, dados). A defesa: **escapar/sanitizar** toda saída ([[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]]).

> **Termo explicado — injeção e XSS:** injeção engana um sistema (o banco) tratando entrada como comando; XSS injeta scripts que rodam no navegador de outros usuários. Ambos exploram entrada não tratada.

### 5. Os princípios universais

Além de falhas específicas, princípios que valem sempre:
- **Nunca confiar na entrada:** valide e trate **tudo** que vem de fora ([[73-Autenticacao-e-autorizacao]]).
- **Defesa em profundidade:** múltiplas camadas de proteção, para que uma falha não comprometa tudo.
- **Menor privilégio:** dar a cada componente/usuário **só** o acesso mínimo necessário.
- **Falhar de forma segura:** em caso de erro, negar acesso por padrão (não liberar).

> **Termo explicado — defesa em profundidade e menor privilégio:** defesa em profundidade é ter várias camadas de proteção (se uma falha, outra segura); menor privilégio é conceder o mínimo de acesso necessário a cada parte.

### 6. Segurança na cadeia e na esteira

Vulnerabilidades não vêm só do seu código: vêm de **dependências** de terceiros (bibliotecas com falhas conhecidas — um item do Top 10), de **configuração** incorreta ([[87-O-que-e-computacao-em-nuvem]]) e de **segredos vazados** (senhas no código). Por isso a segurança entra na esteira de CI/CD ([[85-CICD-a-linha-de-montagem]]) — o **DevSecOps** —, escaneando dependências e segredos automaticamente.

> **Termo explicado — DevSecOps:** integrar a segurança à esteira de CI/CD e a todo o ciclo de desenvolvimento (escanear dependências, segredos, código), em vez de tratá-la como uma etapa final isolada.

---

## ⚙️ Como funciona na prática

Como a segurança defensiva se aplica no dia a dia:

**Tratar toda entrada como potencialmente maliciosa.** A prática nº 1: **validar** (a entrada tem o formato esperado?) e **tratar** (escapar, parametrizar) tudo que vem de fora — formulários, URLs, cabeçalhos, uploads, dados de APIs. Isso mata de uma vez uma fração enorme das vulnerabilidades (injeção, XSS). É a aplicação concreta do "o back nunca confia no front" ([[73-Autenticacao-e-autorizacao]]) estendida a **toda** entrada, de qualquer fonte.

**Usar as defesas prontas, não reinventar.** A regra de ouro da criptografia e da segurança: **não invente a sua**. Use **queries parametrizadas** (ou o ORM, que já as usa — [[79-O-que-roda-no-servidor-linguagens-e-frameworks]]) contra injeção; use as funções de **escape** do framework contra XSS; use bibliotecas testadas para **hash de senhas** (bcrypt/argon2 — nunca guardar senha em texto puro), para tokens ([[73-Autenticacao-e-autorizacao]]) e para criptografia. Frameworks modernos já trazem muitas dessas defesas por padrão — o perigo é **desligá-las** ou contorná-las.

**Controle de acesso em cada requisição.** O "controle de acesso quebrado" é hoje a falha nº 1 do Top 10, e é sutil: não basta o usuário estar **logado** (autenticação); é preciso verificar, **em cada ação**, se ele tem **permissão** para **aquele** recurso específico (autorização — [[73-Autenticacao-e-autorizacao]]). O erro clássico: `GET /pedidos/1234` retorna o pedido sem checar se ele **pertence** ao usuário logado — então qualquer um troca o número na URL e vê pedidos alheios (o "IDOR"). Verifique a permissão **sempre**, no servidor.

**Gerenciar segredos e dependências.** Dois vetores comuns e evitáveis: **segredos** (senhas, chaves de API) **nunca** vão no código ou no Git ([[86-Docker-e-containers]]) — vão em cofres de segredos, injetados em runtime; e **dependências** de terceiros precisam ser mantidas **atualizadas** e **escaneadas** (uma biblioteca com falha conhecida é uma porta aberta — foi assim em vários vazamentos famosos). A esteira de CI/CD ([[85-CICD-a-linha-de-montagem]]) automatiza esses escaneamentos (DevSecOps).

**Defesa em profundidade e menor privilégio na arquitetura.** Bons sistemas não dependem de **uma** barreira: têm validação no front (UX) **e** no back (segurança), firewall **e** autenticação **e** criptografia. E cada componente recebe o **mínimo** de acesso: o serviço que só lê o banco não recebe permissão de escrita; a chave de API do parceiro só acessa o que ele precisa. Assim, se uma camada falha ou uma credencial vaza, o dano é **contido** — não catastrófico.

**Saber os limites (chamar o especialista).** Este capítulo dá o essencial para **não abrir buracos óbvios**, mas segurança é uma especialidade profunda. O engenheiro maduro conhece os fundamentos **e** sabe quando o problema exige um especialista: criptografia customizada, arquitetura de segurança crítica, resposta a um incidente de invasão, testes de penetração (feitos por profissionais **autorizados**). Humildade faz parte da segurança — o excesso de confiança é perigoso.

---

## 🍔 Aplicação na SaborExpress

A segurança da SaborExpress evoluiu de "nunca pensamos nisso" para uma cultura em que todo dev pensa como atacante — muitas vezes aprendendo com sustos. Acompanhe.

**O quase-desastre do SQL Injection.** No início, um endpoint de busca de restaurantes montava a query concatenando o texto digitado direto no SQL ([[68-SQL-na-pratica]]). Numa auditoria, um consultor de segurança digitou no campo de busca algo como `'; DROP TABLE pedidos; --` e demonstrou que poderia **apagar a tabela de pedidos inteira** — ou, pior, **ler todos os dados dos clientes**. Foi o susto que ensinou o time sobre **injeção** ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]] — o item nº 1 histórico do OWASP). A correção foi simples e definitiva: **queries parametrizadas** (o ORM já as usa — [[79-O-que-roda-no-servidor-linguagens-e-frameworks]]), que tratam a entrada como **dado**, nunca como comando. Uma linha de descuido quase custou a empresa.

**O IDOR: vendo o pedido dos outros.** A **QA** Bia, pensando como atacante ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]), testou trocar o número na URL `GET /pedidos/1234` para `1235` — e **viu o pedido de outro cliente**, com endereço e telefone. Era **controle de acesso quebrado** (o IDOR): o back verificava que o usuário estava **logado**, mas não que o pedido **pertencia a ele** ([[73-Autenticacao-e-autorizacao]]). Camila corrigiu adicionando, em **cada** requisição, a checagem de que o recurso pertence ao usuário logado. A lição: autenticação (quem é você) **não basta** — precisa de autorização (você pode acessar **isto**?) em cada ação.

**XSS no nome do restaurante.** Um restaurante mal-intencionado cadastrou seu nome como `<script>...</script>` — e, quando esse nome era exibido na lista, o script rodava no **navegador de outros clientes** ([[76-Como-a-web-funciona-HTML-CSS-e-JavaScript]]), um ataque de **XSS**. O time corrigiu **escapando/sanitizando** toda saída de conteúdo gerado por usuários. Aprenderam a regra: **nunca** exibir entrada de usuário sem tratá-la.

**Senhas e segredos.** Numa revisão, descobriram dois problemas graves e comuns: as senhas dos usuários estavam guardadas de forma fraca, e uma **chave de API** de um parceiro estava **escrita no código** e commitada no Git ([[86-Docker-e-containers]]). Corrigiram: senhas passaram a usar **hash forte** (bcrypt — nunca texto puro), e todos os **segredos** saíram do código para um **cofre de segredos**, injetados em runtime. A chave exposta foi **rotacionada** (trocada), pois já não era mais secreta.

**Defesa em profundidade e menor privilégio.** O time reorganizou a segurança em **camadas** ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]): validação no front (UX) **e** no back (segurança), firewall **e** autenticação **e** criptografia dos dados. E aplicaram **menor privilégio**: o serviço de leitura de cardápios recebeu acesso **só de leitura** ao banco; a chave do parceiro de pagamento só acessava o endpoint de pagamento. Assim, quando (muito depois) uma credencial de um serviço menor vazou, o dano ficou **contido** àquele escopo mínimo, sem comprometer o resto.

**DevSecOps na esteira.** Para não depender de auditorias esporádicas, o time integrou a segurança à **esteira de CI/CD** ([[85-CICD-a-linha-de-montagem]]): a pipeline passou a **escanear as dependências** (alertando sobre bibliotecas com falhas conhecidas — um item do Top 10) e **procurar segredos** vazados a cada PR. A segurança virou parte do "pronto", automática e contínua ([[100-Fundamentos-de-seguranca-e-o-OWASP-Top-10]]).

**A humildade de chamar especialistas.** Acima de tudo, o time aprendeu seus **limites**: para o sistema de pagamentos (crítico) e antes de grandes lançamentos, contrataram **testes de penetração** de profissionais **autorizados**, e consultaram especialistas em criptografia em vez de inventar a própria. Ana resumiu: "todo dev aqui pensa como atacante e fecha os buracos óbvios — mas sabemos quando o problema é grande demais para amadores".

Moral: a SaborExpress transformou a segurança de "problema de outra pessoa" em responsabilidade de todos, geralmente aprendendo com sustos — o SQL injection que quase apagou tudo, o IDOR que vazava pedidos, o XSS no nome. As defesas foram os fundamentos: tratar toda entrada como maliciosa, controle de acesso em cada ação, hash de senhas, segredos fora do código, defesa em profundidade, menor privilégio e DevSecOps na esteira — mais a humildade de chamar especialistas no que é crítico.

---

## 🏢 Como isso acontece em uma empresa

- **Segurança "shift left" é a tendência.** Assim como os testes, a segurança se move para o início e para todos os desenvolvedores (DevSecOps), em vez de ser um portão no fim. Escanear dependências e segredos na esteira é padrão.
- **O OWASP Top 10 é referência universal.** É citado em entrevistas, code reviews, requisitos e treinamentos. Conhecer as principais categorias é esperado de qualquer desenvolvedor.
- **Controle de acesso quebrado é a falha nº 1 atual.** Nas versões recentes do Top 10, o "Broken Access Control" subiu ao topo — o IDOR e a falta de checagem de permissão por requisição são erros comuns e graves.
- **Vazamentos são caros e públicos.** Grandes vazamentos de dados geram multas ([[101-LGPD-e-privacidade]]), processos, queda de ações e perda de confiança. A segurança virou risco de negócio de primeira ordem, discutido em nível de diretoria.
- **Bug bounties e pentests são comuns.** Empresas pagam recompensas ("bug bounty") a hackers **éticos** que reportam vulnerabilidades, e contratam testes de penetração autorizados — reconhecendo que "pensar como atacante" (de forma legal e autorizada) é essencial para defender.
- **Dependências são um vetor enorme.** Ataques de "cadeia de suprimentos" (comprometer uma biblioteca popular) cresceram muito. Manter dependências atualizadas e escaneadas é uma das defesas mais importantes e negligenciadas.
- **Segurança é carreira própria (AppSec, red team).** Existem especialistas dedicados (segurança de aplicações, times de "red team" que atacam de forma autorizada), mas eles **complementam**, não substituem, a responsabilidade de cada desenvolvedor.

---

## ⚠️ Erros comuns

- **Achar que segurança é "problema de outra pessoa".** Delegar tudo a um "time de segurança no fim". A maioria das falhas nasce em código comum — é responsabilidade de todos.
- **Confiar na entrada do usuário.** Não validar/tratar dados de fora — a raiz da injeção, do XSS e de muitas outras falhas. Trate **toda** entrada como maliciosa ([[73-Autenticacao-e-autorizacao]]).
- **Concatenar entrada em queries (SQL Injection).** Montar SQL com strings da entrada. Use **sempre** queries parametrizadas / ORM.
- **Exibir entrada sem escapar (XSS).** Mostrar conteúdo de usuário na página sem sanitizar. Escape toda saída.
- **Só checar autenticação, não autorização.** Verificar que o usuário está logado, mas não que ele pode acessar **aquele** recurso (o IDOR). Cheque permissão em cada requisição.
- **Guardar senhas/segredos errado.** Senhas em texto puro (ou hash fraco); chaves de API no código/Git. Use hash forte e cofres de segredos.
- **Inventar a própria criptografia.** Criar seu algoritmo de cripto/autenticação em vez de usar bibliotecas testadas. Quase sempre resulta em falhas.
- **Ignorar dependências desatualizadas.** Rodar bibliotecas com vulnerabilidades conhecidas. Atualize e escaneie (DevSecOps).
- **Excesso de confiança.** Achar que sabe o suficiente para tudo. Segurança é profunda — saiba quando chamar um especialista.

---

## 💡 Dicas profissionais

- **Trate segurança como sua responsabilidade.** Em cada linha, pergunte "como isto poderia ser abusado?". Pensar como atacante é o hábito defensivo mais valioso.
- **Nunca confie na entrada.** Valide e trate tudo que vem de fora — de qualquer fonte. É a defesa que elimina a maior fatia das vulnerabilidades.
- **Use as defesas prontas do framework.** Queries parametrizadas, escape de saída, hash de senhas (bcrypt/argon2), bibliotecas de cripto testadas. Nunca invente as suas.
- **Cheque autorização em cada requisição.** Não basta estar logado — verifique que o usuário pode acessar **aquele** recurso específico. Combate o controle de acesso quebrado ([[73-Autenticacao-e-autorizacao]]).
- **Mantenha segredos fora do código.** Senhas e chaves em cofres de segredos, injetados em runtime — nunca no código nem no Git.
- **Aplique defesa em profundidade e menor privilégio.** Várias camadas de proteção; cada componente com o acesso mínimo. Contém o dano quando algo falha.
- **Automatize segurança na esteira (DevSecOps).** Escaneie dependências e segredos a cada PR ([[85-CICD-a-linha-de-montagem]]). Torne a segurança contínua, não esporádica.
- **Conheça o OWASP Top 10 — e seus limites.** Domine as categorias comuns para fechar os buracos óbvios, e chame especialistas para o que é crítico ou fora do seu alcance.

---

## 🎈 Curiosidades

- A **OWASP** (Open Worldwide Application Security Project) é uma fundação **sem fins lucrativos** que disponibiliza **gratuitamente** todo o seu material — o Top 10, guias, ferramentas. Ela se tornou tão influente que o "OWASP Top 10" é referenciado em contratos, regulações e padrões de conformidade do mundo inteiro, apesar de ser mantida majoritariamente por voluntários.
- O **SQL Injection**, apesar de conhecido desde os anos 1990 e de ter defesa **trivial** (queries parametrizadas), continua causando vazamentos massivos décadas depois — um lembrete de que as vulnerabilidades mais perigosas não são as mais sofisticadas, mas as mais **negligenciadas**. Há um famoso quadrinho (xkcd) sobre uma mãe que nomeou o filho de `Robert'); DROP TABLE Students;--`, apelidado de **"Little Bobby Tables"**, que virou o símbolo cultural do SQL Injection.
- A prática de **hash de senhas** com "sal" (salt) e algoritmos lentos (bcrypt) existe porque, se um banco de senhas vaza, o atacante não deve conseguir descobri-las. Curiosamente, algoritmos de hash de senha são feitos **de propósito para serem lentos** — o oposto do que se quer em quase todo o resto da computação —, para que testar bilhões de senhas por força bruta seja inviável.
- O termo **"IDOR"** (Insecure Direct Object Reference — referência direta insegura a objeto) descreve o ataque de trocar um ID na URL para acessar dados alheios. É tão comum que se tornou um dos primeiros testes de qualquer hacker ético — e já expôs dados em empresas gigantes, provando que uma falha "simples" pode ter consequências enormes.
- Existe uma distinção fundamental e **legal** entre hackers: o **"white hat"** (chapéu branco) hackeia **com autorização** para defender (pentest, bug bounty), o **"black hat"** ataca ilegalmente para causar dano, e o **"grey hat"** fica na zona cinzenta. Toda a segurança **defensiva** — inclusive "pensar como atacante" — pressupõe **autorização**: testar a segurança de sistemas sem permissão é crime, mesmo com boa intenção.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **OWASP Top 10** | Lista das dez vulnerabilidades web mais críticas. |
| **Pensar como atacante** | Antecipar como alguém abusaria do sistema, para se defender. |
| **Injeção (SQL Injection)** | Enganar o banco injetando comando via entrada não tratada. |
| **XSS** | Injetar scripts que rodam no navegador de outros usuários. |
| **Controle de acesso quebrado (IDOR)** | Acessar dados/ações que não deveria (trocar ID na URL). |
| **Autenticação quebrada** | Falhas em login/senha/sessão que permitem se passar por outro. |
| **Nunca confiar na entrada** | Validar e tratar tudo que vem de fora. |
| **Defesa em profundidade** | Várias camadas de proteção (se uma falha, outra segura). |
| **Menor privilégio** | Dar a cada parte só o acesso mínimo necessário. |
| **DevSecOps** | Integrar segurança à esteira de CI/CD e a todo o ciclo. |
| **Segredos** | Senhas/chaves que nunca devem ir no código ou no Git. |

---

## 📝 Resumo

- **Segurança é responsabilidade de todo desenvolvedor**, não de um especialista no fim — a maioria das vulnerabilidades nasce em código comum. A postura essencial é **pensar como um atacante**: para cada entrada, perguntar "como alguém abusaria disto?".
- O **OWASP Top 10** é a lista de referência das vulnerabilidades web mais críticas, baseada em dados reais. As clássicas: **injeção** (SQL Injection — enganar o banco via entrada concatenada; defesa: queries parametrizadas), **XSS** (injetar scripts no navegador de outros; defesa: escapar a saída), **controle de acesso quebrado** (o IDOR — acessar dados alheios trocando um ID; a falha nº 1 atual) e **autenticação quebrada**.
- Os **princípios universais**: **nunca confiar na entrada** (validar/tratar tudo que vem de fora — a extensão do "o back nunca confia no front" — [[73-Autenticacao-e-autorizacao]]); **defesa em profundidade** (várias camadas, para uma falha não comprometer tudo); **menor privilégio** (cada parte com o acesso mínimo, para conter o dano); e **falhar de forma segura** (negar por padrão).
- Práticas concretas: usar as **defesas prontas** do framework (nunca inventar cripto), **hash forte** de senhas, **segredos fora do código** (em cofres), checar **autorização em cada requisição**, e manter **dependências atualizadas e escaneadas**. A segurança entra na **esteira de CI/CD** (DevSecOps — [[85-CICD-a-linha-de-montagem]]), automática e contínua.
- Este capítulo dá o **essencial defensivo** para não abrir buracos óbvios — mas segurança é uma especialidade profunda. A maturidade inclui a **humildade** de conhecer os fundamentos **e** saber quando chamar um especialista (pentest autorizado, cripto crítica). Toda segurança defensiva pressupõe **autorização** — testar sistemas sem permissão é crime, mesmo com boa intenção.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo por que segurança é responsabilidade de todo desenvolvedor.
- [ ] Sei "pensar como atacante" diante de uma entrada.
- [ ] Conheço as principais falhas do OWASP Top 10 (injeção, XSS, controle de acesso).
- [ ] Explico as defesas: queries parametrizadas, escapar saída, hash de senha, autorização.
- [ ] Aplico defesa em profundidade, menor privilégio e "nunca confiar na entrada".
- [ ] Sei os limites e quando chamar um especialista de segurança.

---

## ✏️ Exercícios

**1.** Com a analogia da casa, explique "pensar como atacante", defesa em profundidade e menor privilégio.

**2.** O que é **SQL Injection** e como as queries parametrizadas o evitam? O que é **XSS** e como se defende dele?

**3.** Explique o **controle de acesso quebrado (IDOR)** com o exemplo de `GET /pedidos/1234`. Por que "estar logado" não basta?

**4.** Por que "nunca invente a sua própria criptografia" e "nunca confie na entrada" são regras de ouro? Dê um exemplo de cada.

**5. (Reflexão)** A SaborExpress aplicou **defesa em profundidade** e **menor privilégio**, e por isso, quando uma credencial vazou, "o dano ficou contido". Explique como esses dois princípios trabalham juntos para limitar o estrago de uma falha inevitável.

---

## 💬 Respostas comentadas

**1.** **Pensar como atacante** é como o morador consciente que, ao construir a casa, se pergunta "por onde um **ladrão** entraria?" — em vez do morador ingênuo que só pensa em conforto e deixa a chave debaixo do tapete e a janela sem tranca. No software, é perguntar, para cada entrada, "como alguém malicioso abusaria disto?". A **defesa em profundidade** é proteger a casa em **camadas**: um muro, **e** uma porta reforçada, **e** um alarme, **e** um cofre — de modo que, se o ladrão vencer uma barreira, ainda encontre outras; no software, é ter validação no front **e** no back, firewall **e** autenticação **e** criptografia, para que uma falha não comprometa tudo. O **menor privilégio** é dar a cada pessoa só a **chave do que ela precisa**: a diarista tem a chave da porta mas não a do cofre, o jardineiro entra só no quintal; no software, é dar a cada componente/usuário só o acesso mínimo necessário (o serviço que só lê o banco não recebe permissão de escrita), para que uma chave comprometida abra o mínimo possível.

**2.** **SQL Injection** é enganar o banco de dados injetando um comando malicioso através de uma entrada não tratada. Acontece quando você monta uma query **concatenando** a entrada do usuário direto no SQL (ex.: `"SELECT ... WHERE nome = '" + input + "'"`): um atacante digita algo como `' OR '1'='1` ou `'; DROP TABLE pedidos; --` e, como o texto vira **parte do comando**, ele **altera a lógica** da query — podendo ler todos os dados ou apagar tabelas. As **queries parametrizadas** o evitam porque separam o **comando** dos **dados**: você escreve a query com "espaços reservados" (placeholders) e passa a entrada do usuário **separadamente**, como um **valor** — o banco então trata essa entrada **sempre como dado**, nunca como comando, não importa o que ela contenha. O `' OR '1'='1` vira apenas um texto de busca inofensivo. **XSS (Cross-Site Scripting)** é injetar scripts maliciosos que rodam no **navegador de outros usuários**: se você exibe a entrada de um usuário numa página sem tratá-la, um atacante insere um `<script>` que, ao ser exibido para outras pessoas, roda no navegador delas (roubando sessões, dados). A defesa é **escapar/sanitizar** toda saída de conteúdo gerado por usuários — converter os caracteres especiais (como `<` e `>`) para que sejam exibidos como **texto**, não interpretados como código HTML/script.

**3.** O **controle de acesso quebrado (IDOR)** é quando um usuário consegue acessar dados ou ações que **não deveriam** ser dele. No exemplo `GET /pedidos/1234`: o usuário logado acessa seu próprio pedido de número 1234, mas se ele simplesmente **troca o número na URL** para `GET /pedidos/1235` e o sistema **retorna o pedido de outro cliente** (com endereço, telefone, itens), há um IDOR — o back deixou o usuário acessar um recurso que pertence a outra pessoa. "Estar logado" **não basta** porque autenticação e autorização são coisas **diferentes**: a **autenticação** responde "**quem** é você?" (o usuário fez login, provou sua identidade), mas a **autorização** responde "você **pode** acessar **isto**?" (este pedido específico pertence a você?). O erro clássico é o back verificar só a autenticação (o usuário está logado, então deixa passar) e **esquecer** a autorização (verificar que o pedido 1235 **pertence** ao usuário que está pedindo). A correção é checar, em **cada** requisição, no servidor, se o recurso solicitado pertence (ou é permitido) ao usuário logado — nunca assumir que, só porque a pessoa está autenticada, ela pode acessar qualquer recurso cujo ID ela consiga adivinhar ou incrementar.

**4.** "**Nunca invente a sua própria criptografia**" é regra de ouro porque criptografia e segurança são áreas extremamente sutis, onde erros minúsculos e não óbvios criam falhas catastróficas — os algoritmos e bibliotecas consagrados (bcrypt para senhas, bibliotecas de cripto testadas) foram escrutinados por especialistas do mundo inteiro durante anos, e a chance de um desenvolvedor comum criar algo tão seguro é praticamente nula; quase sempre a "cripto caseira" tem brechas que um atacante experiente explora. **Exemplo:** guardar senhas com um algoritmo próprio "que embaralha os caracteres" em vez de usar bcrypt — parece seguro, mas é trivial de reverter, e um vazamento do banco expõe todas as senhas. "**Nunca confie na entrada**" é regra de ouro porque **tudo** que vem de fora do seu sistema (formulários, URLs, cabeçalhos, uploads, respostas de APIs) pode ter sido **forjado ou manipulado** por um atacante — o cliente é inspecionável e adulterável ([[73-Autenticacao-e-autorizacao]]), então qualquer dado externo tratado como confiável é uma porta de entrada. **Exemplo:** exibir o nome de um restaurante (entrada do usuário) diretamente na página sem escapá-lo permite um XSS (se o nome contiver um `<script>`); validar e tratar essa entrada fecha a brecha. Juntas, as duas regras cobrem uma fração enorme das vulnerabilidades: use defesas prontas e testadas (não invente), e desconfie de todo dado externo (valide e trate).

**5.** A **defesa em profundidade** e o **menor privilégio** trabalham juntos partindo de uma premissa realista: **falhas são inevitáveis** — uma credencial vai vazar, uma camada vai falhar, um bug vai passar. Em vez de apostar tudo numa única barreira perfeita (que não existe), esses princípios **limitam o dano** quando algo dá errado. A **defesa em profundidade** garante que **nenhuma falha isolada compromete tudo**: como há várias camadas de proteção (firewall, autenticação, autorização, criptografia, validação em vários pontos), quando uma é vencida, as outras ainda seguram o atacante — ele precisaria furar **todas** para causar estrago total. O **menor privilégio** garante que, quando uma parte específica é comprometida, **o que o atacante ganha é o mínimo possível**: como cada componente/credencial tem só o acesso estritamente necessário, uma credencial vazada abre apenas o pequeno escopo daquele componente, não o sistema inteiro. Na SaborExpress, foi exatamente isso: quando a credencial de um **serviço menor** vazou, o dano ficou **contido àquele escopo mínimo** porque (menor privilégio) aquela credencial só tinha acesso ao que aquele serviço precisava — não ao banco de clientes inteiro nem aos pagamentos — e porque (defesa em profundidade) havia outras camadas protegendo o resto. O atacante conseguiu apenas o pouco que aquela credencial permitia, e as demais barreiras impediram que ele escalasse para algo maior. Juntos, os dois princípios transformam o que poderia ser uma **catástrofe** (uma falha = tudo comprometido) num **incidente contido** (uma falha = um pedaço pequeno afetado) — a diferença entre um vazamento que derruba a empresa e um susto gerenciável. É a aceitação madura de que, já que não dá para evitar toda falha, o objetivo é garantir que **nenhuma falha isolada seja fatal**.

---

## 🔗 Próximos capítulos relacionados

- **Anterior (linear):** [[99-Divida-tecnica-e-chaos-engineering]] — fraquezas de resiliência que também são de segurança.
- **Próximo (linear):** [[101-LGPD-e-privacidade]] — a lei que exige proteger os dados pessoais.
- **Base:** [[73-Autenticacao-e-autorizacao]] ("o back nunca confia no front", autenticação/autorização) e [[68-SQL-na-pratica]] (SQL/injeção).
- **Aplicação:** [[85-CICD-a-linha-de-montagem]] (DevSecOps na esteira) e [[87-O-que-e-computacao-em-nuvem]] (configuração e responsabilidade compartilhada).

---

> 🧭 **Você está aqui:** Volume 4 → Módulo 31 → **Capítulo 100 de 119**.
