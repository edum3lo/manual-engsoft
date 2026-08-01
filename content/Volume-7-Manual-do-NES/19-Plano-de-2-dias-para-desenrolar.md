---
title: '19 - Plano de 2 dias para desenrolar'
---

# 19. Plano de 2 dias para desenrolar

> Manual do NES · Volume 7. Você tem 48 horas antes da equipe começar e a sensação de não saber nada. Este capítulo é o que estudar, em que ordem, com exercício em cada bloco. Não vai te transformar em dev sênior. Vai te deixar capaz de **entender as conversas, rodar o projeto e contribuir desde a primeira semana**, que é o que importa agora.

---

## 🎯 A meta honesta de 2 dias

Não dá para aprender programação em 2 dias. Dá para aprender três coisas, e elas resolvem 80% do desconforto:

1. **O mapa mental**: como as peças de um sistema se encaixam. É isso que faz você entender o que os outros estão falando.
2. **O vocabulário certo**: as 40 palavras que aparecem toda hora, com o significado exato.
3. **Um ciclo completo com as próprias mãos**: rodar, mudar algo pequeno, commitar, abrir PR.

⚠️ **O que NÃO estudar nesses 2 dias:** framework novo, Docker a fundo, SQL avançado, arquitetura, testes automatizados, um livro inteiro. Tudo isso vem depois, na sprint em que for necessário. Estudar por antecipação é o jeito mais rápido de gastar 48 horas e continuar travado.

💡 **Regra dos 2 dias:** cada bloco termina com você **fazendo** algo, não lendo. Conhecimento que você não exercitou some em 3 dias, justamente quando a equipe começar.

---

## 📅 DIA 1

### Bloco 1 (2h): o mapa mental de qualquer sistema

Leia [[11-Como-tudo-se-conecta]] e [[72-O-que-e-uma-API-HTTP-REST-e-JSON]], e depois guarde esta imagem:

```
  VOCÊ (navegador)                    SERVIDOR                      BANCO
  ┌──────────────┐   pedido HTTP   ┌──────────────┐   consulta   ┌──────────┐
  │  Front-end   │ ──────────────► │  Back-end    │ ───────────► │  Tabelas │
  │  telas,      │                 │  regras,     │              │  dados   │
  │  botões      │ ◄────────────── │  validações  │ ◄─────────── │ guardados│
  └──────────────┘   resposta JSON └──────────────┘   resultado  └──────────┘
```

A analogia que funciona: **restaurante**. O front-end é o salão (cardápio, mesa, garçom anotando). O back-end é a cozinha (recebe o pedido, confere se tem ingrediente, prepara, devolve). O banco é a despensa (onde as coisas ficam guardadas). O garçom levando o papel para a cozinha é a **requisição HTTP**. O prato voltando é a **resposta**.

Consequências que você precisa saber falar:
- O front **nunca** fala com o banco direto. Sempre passa pelo back. (Segurança: o salão não entra na despensa.)
- Validação no front é conveniência; validação que vale é a do back. (O cliente pode mentir no pedido; a cozinha confere.)
- Se a tela não mostra dado, o problema pode estar em três lugares: na tela, na cozinha ou na despensa. Saber **em qual** é metade da depuração.

**Exercício (30 min):** desenhe esse diagrama à mão para um sistema que você usa (SIGA da universidade, iFood, Instagram). Escreva o que seria o front, o back e o banco em cada um. Guarde. Isso vai ser o seu C4 de contexto lá na frente ([[15-Arquitetura-C4-ADR-riscos-e-spikes]]).

---

### Bloco 2 (2h): HTTP e API, vendo acontecer

Você não precisa decorar. Precisa **ver**.

1. Abra qualquer site (o do seu banco, a UFMS, o que for).
2. Aperte `F12` e vá na aba **Network** (ou Rede).
3. Recarregue a página e clique em uma das linhas que aparecerem.

O que olhar em cada requisição:

| Campo | O que significa |
|---|---|
| **Method** | `GET` busca dado, `POST` cria, `PUT`/`PATCH` altera, `DELETE` apaga |
| **URL** | O endereço do recurso. `/api/usuarios/5` = "o usuário de id 5" |
| **Status** | `200` deu certo, `201` criou, `400` você mandou errado, `401` não logado, `403` sem permissão, `404` não existe, `500` a cozinha quebrou |
| **Payload / Request** | O que **você** mandou |
| **Response** | O que **voltou**, quase sempre em JSON |

JSON é só um jeito de escrever dados em texto:

```json
{ "id": 5, "nome": "Maria", "ativo": true, "consultas": [12, 18] }
```

**Exercício (1h).** Abra o console do navegador (`F12` → Console) e cole, uma linha por vez:

```js
// busca uma lista de posts de uma API pública de teste
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(r => r.json())
  .then(dados => console.log(dados))

// busca UM post específico
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then(r => r.json())
  .then(post => console.log(post.title))

// cria um post (POST com corpo)
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "meu teste", body: "oi", userId: 1 })
}).then(r => r.json()).then(console.log)
```

Se você entendeu essas três chamadas, você entendeu **o que é integração**. É isso, o resto é variação. Detalhes em [[21-Front-end-e-integracao-sem-se-perder]].

---

### Bloco 3 (2h): banco de dados, o mínimo que resolve

Leia [[67-O-que-e-um-banco-de-dados-o-modelo-relacional]] e a folha [[04-SQL]]. O essencial:

- **Tabela** é uma planilha. **Coluna** é o campo (nome, cpf, data). **Linha** (ou registro) é um item.
- **Chave primária (PK)** é o identificador único da linha, quase sempre `id`.
- **Chave estrangeira (FK)** é a coluna que aponta para outra tabela. É assim que "consulta pertence a paciente".

```
pacientes                        consultas
┌────┬──────────┬─────────┐      ┌────┬────────────┬────────────┬─────────────┐
│ id │ nome     │ telefone│      │ id │ paciente_id│ data       │ status      │
├────┼──────────┼─────────┤      ├────┼────────────┼────────────┼─────────────┤
│ 1  │ Maria    │ 6799... │◄─────┤ 12 │ 1          │ 2026-08-10 │ agendada    │
│ 2  │ João     │ 6798... │      │ 13 │ 1          │ 2026-09-02 │ realizada   │
└────┴──────────┴─────────┘      └────┴────────────┴────────────┴─────────────┘
                    a FK paciente_id liga a consulta ao paciente
```

Os quatro comandos que respondem por quase tudo:

```sql
SELECT nome, telefone FROM pacientes WHERE ativo = true;
INSERT INTO pacientes (nome, telefone) VALUES ('Maria', '67999999999');
UPDATE pacientes SET telefone = '67988888888' WHERE id = 1;
DELETE FROM consultas WHERE id = 12;
```

E o `JOIN`, que é só "mostra junto o que está ligado":

```sql
SELECT p.nome, c.data, c.status
FROM consultas c
JOIN pacientes p ON p.id = c.paciente_id
WHERE c.data >= '2026-08-01';
```

**Exercício (1h):** abra [sqliteonline.com](https://sqliteonline.com) ou [db-fiddle.com](https://db-fiddle.com), crie essas duas tabelas, insira 3 pacientes e 5 consultas, e responda com SQL: quantas consultas cada paciente tem? Quais consultas estão agendadas? Qual paciente tem consulta em setembro?

⚠️ **Não estude normalização, índice, transação ou stored procedure agora.** Isso entra quando o projeto precisar.

---

### Bloco 4 (1h30): o fluxo do Git, com as mãos

Leia [[05-Git-e-GitHub-em-equipe-no-NES]] e faça o ciclo inteiro num repositório de teste seu:

```bash
git clone <url-de-um-repo-de-teste-seu>
cd repo
git checkout -b feat/1-teste
# edite qualquer arquivo
git add .
git commit -m "feat: adiciona seção de teste no readme"
git push -u origin feat/1-teste
# abra o PR no GitHub, e faça o merge você mesmo
```

Faça isso **três vezes**, até não precisar consultar. É o movimento que você vai repetir 50 vezes no semestre, e travar nele na frente da equipe é o que mais gera insegurança desnecessária.

---

## 📅 DIA 2

### Bloco 5 (2h30): integração de verdade, uma tela puxando dados

Este é o bloco mais importante para você, porque é exatamente onde você disse que se perde.

Crie um projeto React em 2 minutos e faça uma tela que lista dados de uma API:

```bash
npm create vite@latest teste-integracao -- --template react
cd teste-integracao && npm install && npm run dev
```

Substitua o `src/App.jsx` por isto e leia com calma, linha por linha:

```jsx
import { useEffect, useState } from "react"

export default function App() {
  const [posts, setPosts] = useState([])       // onde os dados vão ficar
  const [carregando, setCarregando] = useState(true)  // enquanto a API não responde
  const [erro, setErro] = useState(null)       // se der ruim

  useEffect(() => {                            // roda quando a tela abre
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(r => {
        if (!r.ok) throw new Error("A API respondeu " + r.status)
        return r.json()
      })
      .then(dados => setPosts(dados))
      .catch(e => setErro(e.message))
      .finally(() => setCarregando(false))
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p>Deu erro: {erro}</p>
  if (posts.length === 0) return <p>Nada por aqui ainda.</p>

  return (
    <ul>
      {posts.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  )
}
```

**Exercício:** faça funcionar, depois quebre de propósito e observe:
1. Troque a URL por uma errada. Que erro aparece? Onde?
2. Comente o `setCarregando(false)`. O que acontece na tela?
3. Adicione um botão que, ao clicar, faz um `POST` e mostra a resposta.

Se você entender esse arquivo inteiro, você sabe integrar. É o mesmo padrão para qualquer tela, com qualquer API, em qualquer projeto. O capítulo [[21-Front-end-e-integracao-sem-se-perder]] destrincha cada pedaço.

---

### Bloco 6 (1h30): rodar um projeto completo

Se a equipe já tem repositório, use o de vocês. Se ainda não tem, clone qualquer projeto de exemplo com back e banco e siga o README até rodar.

O objetivo não é entender o código. É:
- Saber a sequência: instalar dependências → configurar `.env` → subir o banco → rodar migrações → subir a aplicação.
- Ver o erro quando falta alguma etapa, e reconhecer o que ele diz.
- Anotar cada passo que deu errado. Essa anotação vira sua primeira contribuição real: corrigir o README ([[03-Projeto-herdado-entrar-num-codigo-que-nao-e-seu]]).

⚠️ Se travar mais de 45 minutos numa etapa, pule e anote. Ambiente é o gargalo mais comum e mais chato do começo, e resolver isso em grupo é normal.

---

### Bloco 7 (1h30): vocabulário e roteiros de fala

Estude [[20-Falar-como-dev]] e **escreva os seus** (não só leia):

- Sua apresentação de 30 segundos para a equipe.
- Sua resposta para "em que você é bom?".
- Seu modelo de daily.
- Suas 5 perguntas para a primeira reunião.

Escrever antes é o que evita a paralisia na hora. Você não vai improvisar bem em situação que te deixa nervoso, e ninguém vai.

---

### Bloco 8 (1h): montar seu plano das sprints

Não termine os 2 dias sem isto, em um arquivo seu:

```markdown
## O que eu já sei fazer hoje
- Telas em HTML/CSS e componentes React simples
- Fluxo de Git: branch, commit, PR

## O que vou aprender na Sprint 0 e 1
- Consumir API com fetch e tratar erro
- Ler o SQL que os outros escreverem

## O que vou aprender depois
- Escrever endpoints simples no back
- Deploy

## Como vou aprender
- Programando em par nas duas primeiras tarefas
- Revisando os PRs dos colegas (é o meu melhor estudo)
```

💡 Levar esse plano para a reunião zero muda completamente a percepção sobre você. Quem chega dizendo "sei pouco" some no grupo. Quem chega dizendo "sei isto, quero aprender aquilo, e meu plano é este" vira alguém confiável.

---

## 🤖 Como usar IA nesses 2 dias (e depois)

Você disse que sempre fez com auxílio de IA. Isso não é o problema; **o modo de uso** é. Compare:

| Modo gerador (te deixa dependente) | Modo tutor (te ensina) |
|---|---|
| "Faz o código de uma tela que lista pacientes" | "Explica linha por linha o que este código faz" |
| Colar o resultado e seguir | "Por que aqui é `useEffect` e não só uma chamada solta?" |
| "Corrige esse erro" | "O que essa mensagem de erro está dizendo? Onde eu olho primeiro?" |
| Pedir a resposta pronta | "Me faz 5 perguntas para testar se eu entendi isso" |
| "Escreve a query" | "Escrevi esta query, o que está errado nela e por quê?" |

**A regra prática do NES:** antes de abrir um PR, você precisa conseguir explicar cada linha dele para um colega. Se não consegue, volte e peça explicação, não mais código. É isso que vai ser perguntado na defesa, e é isso que separa quem passou de quem aprendeu.

> Mais sobre isso: [[11-Quando-voce-nao-sabe-o-que-fazer]] e [[108-Como-usar-IA-corretamente-na-engenharia]].

---

## 🗺️ E depois dos 2 dias: o estudo just-in-time

O aprendizado de verdade acontece durante as sprints, no assunto da tarefa da semana. Ordem sugerida ao longo do semestre:

| Quando | O que aprender |
|---|---|
| Sprint 0 e 1 | Consumir API, estados de tela, tratar erro, Git em equipe |
| Sprint 1 e 2 | Ler e escrever SQL simples, entender as rotas do back |
| Sprint 2 e 3 | Escrever um endpoint completo, validação, autenticação |
| Sprint 3 | Deploy, variáveis de ambiente, ambientes (dev, homologação, produção) |
| Sprint 3 e 4 | Testes automatizados do que você escreveu |

30 minutos por dia, no assunto da semana, valem mais que um fim de semana inteiro de curso genérico.

---

## ✅ Checklist de fim dos 2 dias

- [ ] Consigo desenhar front, back e banco e explicar o caminho de um clique até o dado.
- [ ] Sei ler a aba Network e dizer o método, a URL, o status e o corpo de uma requisição.
- [ ] Sei o que significam 200, 201, 400, 401, 404 e 500.
- [ ] Escrevi SELECT, INSERT, UPDATE, DELETE e um JOIN com as minhas mãos.
- [ ] Fiz o ciclo branch → commit → push → PR três vezes.
- [ ] Fiz uma tela que busca dados de uma API e trata carregando, erro e lista vazia.
- [ ] Rodei um projeto completo (ou anotei exatamente onde travei).
- [ ] Escrevi minha apresentação, minha resposta de "no que sou bom" e meu modelo de daily.
- [ ] Escrevi meu plano de aprendizado das sprints.

Se marcou 7 dos 9, você entra na primeira reunião em condição melhor do que boa parte da turma. Não porque sabe tudo, mas porque sabe **onde está** e o que vai fazer a respeito.

---

> Próximo: [[20-Falar-como-dev]].
