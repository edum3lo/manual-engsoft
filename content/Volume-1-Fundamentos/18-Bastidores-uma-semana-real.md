---
title: '18 - Bastidores: uma semana real'
---

# Capítulo 18 — Bastidores: uma semana real

> **Volume 1 — Fundamentos e Mentalidade** · Módulo 3 — O dia a dia e os bastidores
> Coleção: *Do Estudante ao Engenheiro de Software*
> ⭐ *Um retrato honesto do mercado: nem tudo sai como o planejado, e está tudo bem.*

---

## 🎯 Objetivos de aprendizagem

Ao terminar este capítulo, você será capaz de:

- Ver uma **semana real** de um time, com imprevistos, e não só o "dia ideal".
- Entender o que é um **bug urgente** e um **hotfix**, e como o time reage.
- Compreender o que é um **incidente em produção** e como se lida com ele.
- Conhecer o **plantão (on-call)** e a resposta a emergências.
- Entender a cultura de **aprender com falhas** (post-mortem sem culpados).
- Chegar ao mercado com **expectativas realistas** — sabendo que o caos faz parte e é gerenciável.

---

## ⏱️ Tempo médio de estudo

**35 a 50 minutos**, mais 15 minutos para os exercícios.

---

## 📊 Nível de dificuldade

**Iniciante (1/5).**

---

## ✅ Pré-requisitos

- [[16-Um-dia-na-vida-de-um-dev]] e [[17-Cerimonias-ferramentas-e-ritmo-de-um-time]] — o dia e o ritmo "ideais", que aqui encontram a realidade.
- [[15-Como-a-empresa-cria-produto-lanca-cresce-e-escala]] — a ideia de que sistemas no ar podem falhar sob crescimento.

---

## 📖 Introdução

Os dois capítulos anteriores mostraram o dia e a semana "como deveriam ser": um ritmo organizado, cerimônias no lugar, tarefas fluindo. Este capítulo mostra o que os outros não contam: **o que acontece quando as coisas dão errado.** Porque elas dão. Sistemas caem, bugs escapam para produção, prioridades mudam no meio da semana, e às vezes você recebe uma mensagem de urgência quando menos espera.

Este é, talvez, o capítulo mais importante do módulo para o seu preparo emocional. Muita gente chega ao mercado com uma imagem idealizada e leva um susto no primeiro imprevisto — acha que "a empresa é uma bagunça" ou que "eu não sirvo para isso". A verdade é outra: **o imprevisto faz parte da profissão, e times bons têm formas maduras de lidar com ele.** O caos não é sinal de fracasso; é o estado natural de sistemas complexos usados por gente real. O que separa um time bom de um ruim não é *não ter* problemas — é *como reage* a eles.

Vamos acompanhar uma semana realista do seu squad na SaborExpress, com direito a um bug urgente na segunda, um incidente sério na sexta, e tudo o que acontece no meio. E vamos ver que, por trás do susto, há processos, calma e uma cultura de aprender com os erros que torna o caos gerenciável. Ao final, você vai encarar seu primeiro imprevisto no trabalho não como um desastre, mas como "ah, é aquilo que o capítulo 18 descreveu".

---

## 🧠 Analogia

Uma semana real de um time de software é como um **plantão num pronto-socorro**.

Um pronto-socorro tem sua rotina organizada: turnos, procedimentos, fichas. Mas, a qualquer momento, **uma emergência entra pela porta** e vira a prioridade absoluta. Ninguém entra em pânico — nem os médicos experientes, que já viram muitas emergências. Eles têm **protocolos**: avaliar a gravidade, estabilizar o paciente primeiro (parar o sangramento), investigar a causa depois, e, mais tarde, discutir o caso para aprender e melhorar o atendimento futuro. O caos da emergência é real, mas é *gerenciado* por processos e por gente treinada para manter a calma.

E há também o **plantonista**: alguém de sobreaviso para as emergências fora do horário normal, que pode ser acionado de madrugada se algo grave acontecer.

Um time de software vive o mesmo. A rotina (sprints, cerimônias) é interrompida por **emergências** (um bug grave, o sistema caindo). O time não entra em pânico: tem protocolos — avaliar a gravidade, **estabilizar primeiro** (fazer o sistema voltar), investigar a causa depois, e, mais tarde, fazer uma análise (*post-mortem*) para aprender. E há o **on-call** (plantão), quem fica de sobreaviso para emergências. Guarde a imagem: **lidar com imprevistos de software é como o pronto-socorro — o caos é real, mas gerenciado com protocolo, calma e aprendizado.**

---

## 🧩 Conceitos fundamentais

### 1. Bug: do trivial ao urgente

Um **bug** é um defeito no software (você viu no [[07-O-que-e-software]]). Nem todo bug é igual — eles têm **gravidade** diferente:

- **Bug trivial:** um detalhe visual, algo que incomoda pouco. Entra na fila normal de tarefas.
- **Bug importante:** atrapalha usuários, mas há como contornar. É priorizado, mas não interrompe tudo.
- **Bug urgente / crítico:** quebra algo essencial (ninguém consegue pagar, o app não abre). **Interrompe a rotina** e vira prioridade máxima.

Saber avaliar a gravidade de um bug — e reagir proporcionalmente — é uma habilidade importante. Tratar tudo como urgente esgota o time; tratar um bug crítico como trivial prejudica os usuários e o negócio.

### 2. Hotfix: a correção de emergência

Quando um bug urgente aparece em produção, o time faz um **hotfix**: uma correção rápida, focada apenas em resolver *aquele* problema crítico, que "fura a fila" do processo normal e vai para o ar o quanto antes. É o "estancar o sangramento" — não é o momento de fazer melhorias bonitas, é o momento de fazer o sistema voltar a funcionar.

> **Termo explicado — hotfix:** uma correção urgente e focada, aplicada rapidamente em produção para resolver um problema crítico, fora do fluxo normal de trabalho.

### 3. Incidente: quando o sistema (parcial ou totalmente) falha

Um **incidente** é quando algo dá errado em produção a ponto de afetar os usuários de forma séria — o sistema caiu, ficou lento demais, uma função essencial parou. É mais amplo que um bug: é o *evento* de falha no sistema no ar.

> **Termo explicado — incidente:** um evento em que o sistema em produção falha ou degrada a ponto de afetar os usuários, exigindo resposta imediata para restabelecer o funcionamento.

Durante um incidente, a prioridade número um é **restabelecer o serviço** (fazer voltar), não descobrir de quem é a culpa nem fazer a correção definitiva perfeita. Primeiro estabiliza, depois investiga.

### 4. On-call: o plantão

Muitos times têm um esquema de **on-call** (de plantão/sobreaviso): a cada semana, uma pessoa fica responsável por responder a emergências, inclusive fora do horário comercial. Se o sistema cai às 3h da manhã, um alerta automático aciona quem está de plantão. É uma responsabilidade séria (e geralmente compensada), que rotaciona entre o time. Como júnior, você normalmente **não** entra no on-call logo de cara — isso vem com experiência.

> **Termo explicado — on-call (plantão):** esquema em que uma pessoa do time fica de sobreaviso por um período para responder a emergências do sistema, mesmo fora do expediente.

### 5. Post-mortem: aprender com a falha (sem culpados)

Depois que a emergência passa e o sistema está estável, o time faz um **post-mortem** (análise pós-incidente): reúne-se para entender *o que* aconteceu, *por que* aconteceu, e *como evitar* que se repita. O princípio de ouro é ser **sem culpados** (*blameless*): o foco é melhorar o sistema e os processos, não punir pessoas. Você já viu essa cultura no [[05-Como-tirar-o-maximo-dos-exercicios]] — o erro é informação, não fracasso.

> **Termo explicado — post-mortem (sem culpados):** reunião de análise após um incidente, focada em entender a causa e prevenir a repetição, sem buscar culpados. Parte do princípio de que as pessoas agiram da melhor forma com o que tinham.

Por que "sem culpados"? Porque, se as pessoas têm medo de serem punidas, elas **escondem erros** — e erros escondidos não são corrigidos, então se repetem. Uma cultura sem culpados faz o oposto: as pessoas relatam abertamente o que deu errado, o time aprende, e o sistema fica mais robusto. Isso é sinal de um time saudável, e é algo que vale a pena procurar ao escolher onde trabalhar.

### 6. Prioridades mudam — e isso é normal

Fora as emergências, há uma verdade mais suave: **prioridades mudam no meio do caminho.** Um cliente importante pede algo, o negócio muda de rumo, uma oportunidade aparece. O plano da sprint nem sempre sobrevive intacto. Isso frustra quem espera que "o plano é sagrado", mas faz parte de operar num mundo real e dinâmico. Times ágeis (Cap. 42) são justamente desenhados para *acomodar* mudança, em vez de fingir que ela não acontece.

---

## ⚙️ Como funciona na prática

Vamos acompanhar uma **semana real** do seu squad, com os imprevistos incluídos:

```
SEGUNDA
 09:00  Daily. Tudo normal... até que às 10:30:
 10:30  🚨 BUG URGENTE: clientes não conseguem finalizar o pagamento!
        → Para tudo. O time avalia a gravidade: crítico (afeta receita).
        → O sênior e você investigam. Encontram a causa em ~1h.
        → Fazem um HOTFIX, testam rápido, sobem para o ar.
 12:00  Pagamento volta a funcionar. Alívio. Volta-se ao trabalho normal.

TERÇA
 09:00  Daily. Retomando as tarefas da sprint que o hotfix atrasou.
        Trabalho concentrado. Code reviews. Tudo mais calmo.

QUARTA
 09:00  Daily. No meio da manhã, a PM Carla avisa:
        "Mudança de prioridade: um grande restaurante entra sexta e
         precisamos de um ajuste no painel deles."
        → O time renegocia a sprint: algo sai para essa urgência entrar.

QUINTA
        Trabalho na nova prioridade. Refinamento das próximas tarefas.

SEXTA
 15:00  🚨 INCIDENTE: o app está lento e começa a cair. É happy hour,
        pico de pedidos — o sistema não está aguentando (problema de escala!).
        → Quem está ON-CALL assume a linha de frente.
        → PRIMEIRO estabilizar: aumentam a capacidade do servidor,
          o sistema volta a responder. Usuários voltam a pedir.
 16:30  Sistema estável. Ninguém foi "culpado" — todos ajudaram.
 (semana seguinte)
        POST-MORTEM: o time analisa o incidente da sexta. Descobre que
        faltou preparo para o pico. Cria ações: melhorar a escala,
        adicionar alertas mais cedo. Aprendizado registrado. Sem caça às bruxas.
```

Compare esta semana com a semana "ideal" do [[17-Cerimonias-ferramentas-e-ritmo-de-um-time]]. As cerimônias continuam lá (as dailies, o refinamento), mas a realidade **interrompeu o plano** duas vezes — um bug urgente e um incidente — e **mudou a prioridade** uma vez. E, mesmo assim, o time não desmoronou: cada imprevisto foi tratado com um protocolo (avaliar → estabilizar → corrigir → aprender). Esse é o retrato honesto. Não é caos sem controle; é **caos gerenciado**.

---

## 🍔 Aplicação na SaborExpress

Essa semana *é* a sua semana na SaborExpress — e vale a pena olhar o que ela ensina sobre você, o júnior, no meio dos imprevistos:

- **No bug urgente da segunda:** você não resolveu sozinho (nem se esperava isso), mas **participou** — investigou ao lado do sênior, aprendeu como se diagnostica um problema crítico sob pressão. Como júnior, seu papel num incidente costuma ser *ajudar e aprender*, não liderar. Ninguém espera que você "salve o dia" no começo.

- **Na mudança de prioridade da quarta:** você viu que o plano da sprint não é sagrado. Em vez de frustração, entendeu que o negócio (o grande restaurante da Carla) às vezes muda o rumo — exatamente o que o Módulo 2 mostrou sobre empresas dinâmicas.

- **No incidente da sexta:** o problema foi de **escala** (o pico do happy hour derrubou o sistema) — conectando diretamente com o que você viu no [[15-Como-a-empresa-cria-produto-lanca-cresce-e-escala]] e verá em detalhe no módulo de Escalabilidade. Você presenciou a teoria virando emergência real.

- **No post-mortem:** você viu a cultura "sem culpados" em ação. O sistema caiu, e ninguém foi humilhado — o time tratou como aprendizado e saiu mais forte. Se um dia *você* causar um incidente (e provavelmente vai, em algum momento da carreira), é essa cultura que fará a diferença entre "aprendi e cresci" e "fiquei traumatizado".

O que a SaborExpress te ensina nesta semana é a lição mais tranquilizadora do Volume 1: **o imprevisto faz parte, e você não precisa dar conta dele sozinho.** Você chega, participa, aprende, e cresce dentro de um time que tem processos para o caos. Saber disso *antes* de viver é o que transforma o primeiro incidente de "pânico" em "reconhecimento".

---

## 🏢 Como isso acontece em uma empresa

- **Times maduros têm processos de incidente claros.** Quem faz o quê durante uma emergência, como comunicar, quem decide. Se a empresa tem isso bem definido, os incidentes são estressantes mas ordenados. A falta disso é que gera pânico de verdade.
- **A cultura "sem culpados" é um sinal de saúde.** Ao entrevistar para uma vaga, é legítimo perguntar "como o time lida com incidentes e erros?". Uma resposta sobre aprendizado e post-mortems sem culpados indica um bom lugar; uma resposta sobre "achar o responsável" é um alerta vermelho.
- **On-call é responsabilidade real — e negociável.** Bons lugares compensam o plantão, o distribuem de forma justa e não sobrecarregam ninguém. Como júnior, você tem o direito de entender como funciona o on-call antes de entrar nele (e normalmente entra só depois de ganhar experiência).
- **Nem toda semana é caótica.** Este capítulo concentrou imprevistos para te preparar, mas muitas semanas são tranquilas e seguem o plano. O ponto não é "o trabalho é um caos constante", e sim "o caos acontece às vezes, e há como lidar". A frequência de incidentes, aliás, é um termômetro da saúde técnica do sistema.
- **Você vai causar um bug em produção um dia. Todo mundo causa.** Os engenheiros mais experientes do mundo já derrubaram sistemas. O que importa não é nunca errar (impossível), mas reagir bem: avisar rápido, ajudar a estabilizar, aprender. Numa cultura saudável, isso te fortalece em vez de te marcar.

---

## ⚠️ Erros comuns

- **Chegar ao mercado esperando só o "dia ideal".** O imprevisto faz parte. Esperar que tudo saia como o planejado gera susto e frustração desnecessários.
- **Entrar em pânico no primeiro incidente.** A emergência é real, mas gerenciável. Respire, siga o protocolo, peça ajuda. Pânico atrapalha; calma resolve.
- **Como júnior, achar que "tem que resolver sozinho".** Seu papel num incidente é ajudar e aprender, não liderar. Chamar ajuda rápido é o comportamento *certo*, não uma falha.
- **Tentar fazer o hotfix "bonito e completo" no meio da emergência.** Primeiro estabilize (faça voltar), depois faça a correção definitiva com calma. Confundir as duas fases piora a emergência.
- **Tratar todo bug como urgente (ou nenhum).** Avaliar a gravidade e reagir proporcionalmente é a habilidade. Urgência constante esgota; negligência prejudica usuários.
- **Ter medo de admitir um erro.** Esconder um erro impede a correção e piora tudo. Numa cultura sem culpados, admitir rápido é o certo — e valorizado.
- **Levar a mudança de prioridade para o pessoal.** O plano mudar não é "desorganização"; é o negócio se adaptando. Flexibilidade é parte do trabalho.

---

## 💡 Dicas profissionais

- **Num incidente, comunique cedo e claro.** "Estou vendo um problema no pagamento, investigando" vale ouro. Silêncio durante uma emergência é o pior. Avisar não é admitir fracasso; é agir como profissional.
- **Aprenda o protocolo de incidente da sua empresa nas primeiras semanas.** Saber quem acionar e como agir *antes* de a emergência acontecer te deixa muito mais calmo quando ela acontecer.
- **Guarde a regra "estabilizar primeiro, entender depois".** No calor do incidente, o objetivo é fazer o sistema voltar. A causa-raiz e a correção definitiva vêm no post-mortem, com calma.
- **Participe dos post-mortems com curiosidade, não com medo.** São aula grátis sobre como o sistema (e as falhas) funcionam de verdade. E contribuir para prevenir a próxima falha te destaca.
- **Escolha lugares com cultura saudável de erro.** Ao avaliar uma empresa, sonde como ela lida com falhas. Uma cultura sem culpados é um dos melhores indicadores de um bom lugar para crescer.
- **Não se defina pelo seu pior dia.** Você vai ter dias em que algo quebra por sua causa. Todo engenheiro tem. Reaja bem, aprenda, siga em frente. Isso não te define; sua trajetória, sim.

---

## 🎈 Curiosidades

- A cultura de **post-mortem sem culpados** foi fortemente difundida pela prática de **SRE** (Cap. 14) de grandes empresas de tecnologia, que documentaram publicamente como transformam falhas em aprendizado sistemático. Virou referência da indústria.
- Empresas sérias classificam incidentes por **severidade** (às vezes "SEV1", "SEV2"...), onde SEV1 é o mais grave (sistema totalmente fora). Isso ajuda a acionar a resposta proporcional: uma reunião de guerra para um SEV1, um registro tranquilo para um SEV3.
- Existe o conceito de **"error budget"** (orçamento de erro): a ideia de que é *aceitável* uma pequena quantidade de falhas, porque buscar 100% de perfeição é caro demais e desacelera a inovação. Reconhecer que "algum erro é inevitável e ok" é sinal de maturidade de engenharia.
- Muitos dos maiores apps do mundo já tiveram quedas históricas e públicas — inclusive gigantes bilionários. Se acontece com eles, com times enormes e recursos infinitos, fica claro que **incidentes não são sinal de incompetência**, e sim de sistemas complexos operando no mundo real. O que os diferencia é a rapidez e a maturidade da resposta.

---

## 📚 Glossário

| Termo | Significado em linguagem simples |
|-------|----------------------------------|
| **Bug** | Um defeito no software. |
| **Gravidade / severidade** | O quão sério é um bug ou incidente (do trivial ao crítico). |
| **Hotfix** | Correção urgente e focada, aplicada rápido em produção, fora do fluxo normal. |
| **Incidente** | Evento em que o sistema em produção falha/degrada e afeta usuários. |
| **Produção** | O ambiente "de verdade", onde o sistema é usado pelos usuários reais. |
| **On-call (plantão)** | Esquema de sobreaviso para responder a emergências, mesmo fora do expediente. |
| **Estabilizar** | Fazer o sistema voltar a funcionar (a prioridade nº 1 num incidente). |
| **Post-mortem (sem culpados)** | Análise após um incidente para aprender e prevenir, sem punir pessoas. |
| **Causa-raiz** | A causa fundamental de um problema (não só o sintoma). |
| **Error budget** | Quantidade aceitável de falhas; reconhece que perfeição total é inviável. |

---

## 📝 Resumo

- Uma semana **real** tem imprevistos: bugs urgentes, incidentes e mudanças de prioridade interrompem o plano — e isso **faz parte** da profissão.
- Bugs têm **gravidade** diferente; um bug crítico vira prioridade máxima e é resolvido com um **hotfix** (correção urgente e focada).
- Um **incidente** é uma falha séria em produção. A regra de ouro: **estabilizar primeiro** (fazer voltar), investigar a causa depois.
- O **on-call (plantão)** é quem responde a emergências fora do horário; como júnior, você entra nisso só com experiência.
- Depois da emergência, o **post-mortem sem culpados** transforma a falha em aprendizado — e é sinal de um time saudável.
- O caos não é sinal de fracasso; é o estado natural de sistemas complexos. O que distingue um bom time é **reagir com protocolo, calma e aprendizado** — não *nunca* ter problemas.
- Como júnior, seu papel no imprevisto é **participar, ajudar e aprender**, não resolver tudo sozinho. Você vai causar um bug um dia — todo mundo causa; o que importa é reagir bem.

---

## ☑️ Checklist de aprendizado

- [ ] Entendo que imprevistos (bugs urgentes, incidentes, mudanças de prioridade) fazem parte do trabalho.
- [ ] Sei o que é um hotfix e quando ele é usado.
- [ ] Sei o que é um incidente e por que "estabilizar primeiro" é a regra.
- [ ] Entendo o que é on-call e qual costuma ser o papel de um júnior nas emergências.
- [ ] Compreendo o post-mortem sem culpados e por que ele indica um time saudável.
- [ ] Chego ao mercado com expectativas realistas: o caos existe, mas é gerenciável.

---

## ✏️ Exercícios

**1.** Com a analogia do pronto-socorro, explique como um time lida com um incidente sem entrar em pânico.

**2.** Diferencie um bug trivial de um bug urgente. O que é um hotfix e quando ele é usado?

**3.** Por que a regra num incidente é "estabilizar primeiro, entender depois"? O que daria errado se o time tentasse fazer a correção definitiva perfeita no meio da emergência?

**4.** O que é um post-mortem "sem culpados" e por que a ausência de culpa torna o sistema mais robusto?

**5. (Reflexão)** Imagine que, no seu primeiro mês de trabalho, um código seu causa um bug em produção. Com base neste capítulo, como você deveria reagir? O que *não* deveria fazer?

---

## 💬 Respostas comentadas

**1.** Como num pronto-socorro, o time tem **protocolos** e mantém a **calma**: quando a emergência entra (o incidente), avalia-se a gravidade, **estabiliza-se primeiro** (faz o sistema voltar, como estancar um sangramento), investiga-se a causa depois e, mais tarde, faz-se uma análise (post-mortem) para aprender e evitar a repetição. O caos é real, mas é *gerenciado* por processos e por pessoas que sabem que emergências acontecem — ninguém entra em pânico porque há um método para seguir.

**2.** Um **bug trivial** é um defeito de pouco impacto (ex.: um detalhe visual) que entra na fila normal de tarefas. Um **bug urgente/crítico** quebra algo essencial (ex.: ninguém consegue pagar) e interrompe a rotina, virando prioridade máxima. Um **hotfix** é uma correção rápida e focada, feita para resolver *aquele* problema crítico o quanto antes, furando o fluxo normal e indo para produção com urgência. É usado justamente quando há um bug urgente afetando os usuários em produção.

**3.** Porque a prioridade número um num incidente é **parar o prejuízo aos usuários** — fazer o sistema voltar a funcionar. Se o time tentasse fazer a correção definitiva e perfeita no meio da emergência, isso levaria muito mais tempo (a solução completa é mais complexa e arriscada), prolongando o período em que os usuários estão sem o serviço. Estabilizar rápido para o dano; a causa-raiz e a correção caprichada vêm depois, com calma, no post-mortem.

**4.** Um post-mortem sem culpados é a reunião de análise após um incidente focada em entender *o que* e *por que* aconteceu e *como* evitar a repetição, sem punir pessoas (partindo do princípio de que todos agiram da melhor forma com o que tinham). A ausência de culpa torna o sistema mais robusto porque, sem medo de punição, as pessoas **relatam abertamente** os erros e as causas reais — e erros expostos podem ser corrigidos. Numa cultura de culpa, as pessoas escondem erros, que então se repetem, e o sistema não melhora.

**5.** Você deveria **reagir com calma e responsabilidade**: avisar o time imediatamente e com clareza ("acho que meu código causou um problema no X, estou verificando"), ajudar a estabilizar o quanto puder, e depois participar da análise para entender e aprender. O que você *não* deveria fazer: entrar em pânico, esconder o erro na esperança de que ninguém note, tentar consertar sozinho às escondidas, ou se martirizar como se isso te definisse. Todo engenheiro já causou um bug em produção; numa cultura saudável, reagir bem a isso te fortalece — não te marca.

---

## 🔗 Próximos capítulos relacionados

- **Base:** [[16-Um-dia-na-vida-de-um-dev]] e [[17-Cerimonias-ferramentas-e-ritmo-de-um-time]] — o dia e a semana "ideais", que aqui encontraram a realidade.
- **Muito relacionado:** [[05-Como-tirar-o-maximo-dos-exercicios]] — a cultura de "o erro é informação", base do post-mortem sem culpados.
- **Aplicação futura:** Capítulo 91 — *Alertas, incidentes e plantão (on-call)* (Volume 4) — o lado técnico da resposta a incidentes.
- **Aplicação futura:** Capítulo 92–94 — *Escalabilidade* (Volume 4) — como evitar incidentes como o do "happy hour" da SaborExpress.

---

> 🧭 **Você está aqui:** Volume 1 → Módulo 3 → **Capítulo 18 de 119**.
> 🎉🎉 **Fim do Volume 1 — Fundamentos e Mentalidade!** Você agora sabe *como estudar*, *o que é a profissão*, *como funciona a empresa* e *como é o trabalho de verdade* — inclusive quando dá errado. Você tem a base mental e o contexto para mergulhar na parte técnica com segurança. No **Volume 2 — A Base da Computação**, vamos descer à fundação de tudo: como o computador, o sistema operacional, o Linux e as redes realmente funcionam. Até lá! 🚀
