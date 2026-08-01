---
title: '21 - Front-end e integração sem se perder'
---

# 21. Front-end e integração sem se perder

> Manual do NES · Volume 7. Você gosta de front-end mas se perde na hora de ligar a tela na API. Este capítulo é o modelo mental completo dessa ligação, o padrão que serve para qualquer tela, onde as coisas quebram e como descobrir em qual das pontas está o problema.

---

## 🧠 O modelo mental: integração é uma conversa

Integrar é fazer sua tela **pedir** dados e **reagir** à resposta. Só isso. O caminho de um clique:

```
1. usuário clica no botão "Salvar"
2. sua tela monta um pedido:  POST /api/pacientes  com { nome, cpf }
3. o pedido viaja pela rede
4. o back recebe, valida, grava no banco
5. o back devolve uma resposta:  201 + { id: 7, nome, cpf }
6. sua tela recebe e decide o que fazer: mostrar sucesso, atualizar a lista, ou mostrar erro
```

Os passos 1, 2 e 6 são **seus**. Os passos 3, 4 e 5 são do back. Essa fronteira é a coisa mais importante deste capítulo: quando algo falha, a primeira pergunta é sempre **"o pedido saiu certo daqui, ou a resposta veio errada de lá?"**. Você responde isso em 30 segundos com a aba Network, e o resto vira fácil.

---

## 🔌 O contrato: o que combinar com quem faz o back

Antes de codar a tela, combine quatro coisas. Isso evita a maior parte do retrabalho:

| O que combinar | Exemplo |
|---|---|
| **Endereço e método** | `POST /api/pacientes` |
| **O que eu mando** | `{ "nome": "Maria", "cpf": "12345678900", "telefone": "6799..." }` |
| **O que volta quando dá certo** | `201` + `{ "id": 7, "nome": "Maria", ... }` |
| **O que volta quando dá errado** | `400` + `{ "erro": "CPF inválido", "campo": "cpf" }` |

🗣️ Frase para pedir isso sem rodeio: *"Antes de eu fazer a tela, me passa o contrato do endpoint? Qual URL, o que eu mando e o que volta no sucesso e no erro."* Perguntar isso é sinal de quem sabe trabalhar em equipe, não de quem está perdido.

💡 Se o back ainda não existe, **não fique parado**. Escreva a tela com dados fixos no código (mock), no formato combinado, e troque pela chamada real quando o endpoint subir. Isso se chama trabalhar contra o contrato, e é o que destrava front e back trabalharem em paralelo.

```js
// enquanto a API não existe
const pacientes = [{ id: 1, nome: "Maria" }, { id: 2, nome: "João" }]
// depois vira: const pacientes = await api.get("/pacientes")
```

---

## 🧩 O padrão que serve para toda tela

Toda tela que mostra dado tem **quatro estados**. Esquecer disso é a causa número 1 de tela que "trava" ou fica branca:

| Estado | Quando | O que mostrar |
|---|---|---|
| **Carregando** | Enquanto a resposta não chega | "Carregando..." ou um esqueleto |
| **Erro** | A API respondeu com falha, ou a rede caiu | Mensagem clara e um botão de tentar de novo |
| **Vazio** | Deu certo, mas não existe nenhum dado | "Nenhum paciente cadastrado ainda" |
| **Sucesso** | Deu certo e tem dado | A lista, a tabela, o conteúdo |

```jsx
if (carregando) return <Carregando />
if (erro)       return <Erro mensagem={erro} onTentarDeNovo={buscar} />
if (lista.length === 0) return <Vazio />
return <Tabela dados={lista} />
```

⚠️ Numa Sprint Review, tela que fica branca em erro é o que mais chama atenção negativa. Tratar os quatro estados é barato e faz o sistema parecer muito mais acabado.

---

## 📮 Buscar dados (GET)

```jsx
import { useEffect, useState } from "react"

function ListaPacientes() {
  const [pacientes, setPacientes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  async function buscar() {
    setCarregando(true)
    setErro(null)
    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/pacientes`)
      if (!resposta.ok) throw new Error(`A API respondeu ${resposta.status}`)
      const dados = await resposta.json()
      setPacientes(dados)
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => { buscar() }, [])   // busca uma vez, quando a tela abre
  ...
}
```

Três detalhes que costumam confundir:

- **`await` significa "espera a resposta chegar".** Sem ele, você segue o código com as mãos vazias e a tela parece não funcionar.
- **`resposta.ok` é falso para 400, 401, 404, 500.** O `fetch` **não** lança erro sozinho nesses casos, então o `if (!resposta.ok)` é obrigatório. Este é o erro mais comum de quem está começando.
- **`.json()` também é assíncrono.** Ele converte o texto que veio em objeto de JavaScript.

---

## 📤 Enviar dados (POST)

```jsx
async function salvar(evento) {
  evento.preventDefault()          // impede o formulário de recarregar a página
  setSalvando(true)
  try {
    const resposta = await fetch(`${import.meta.env.VITE_API_URL}/pacientes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cpf, telefone })
    })

    if (resposta.status === 400) {
      const problema = await resposta.json()
      setErroDoCampo(problema.erro)   // erro de validação: mostre no formulário
      return
    }
    if (!resposta.ok) throw new Error(`Erro inesperado (${resposta.status})`)

    const criado = await resposta.json()
    setPacientes(anteriores => [...anteriores, criado])  // atualiza a lista
    limparFormulario()
  } catch (e) {
    setErroGeral("Não foi possível salvar. Tente novamente.")
  } finally {
    setSalvando(false)
  }
}
```

💡 Repare na diferença entre **erro do usuário** (400: o CPF está errado, mostre no campo) e **erro do sistema** (500: mostre mensagem genérica e registre). Fazer essa distinção é o tipo de detalhe que faz seu PR parecer trabalho de quem entende.

---

## 🗂️ Centralize as chamadas num só lugar

Não espalhe `fetch` por 15 componentes. Crie `src/services/api.js`:

```js
const BASE = import.meta.env.VITE_API_URL   // vem do .env

async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${BASE}${caminho}`, {
    headers: { "Content-Type": "application/json", ...opcoes.headers },
    ...opcoes
  })
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => ({}))
    throw new Error(corpo.erro || `Erro ${resposta.status}`)
  }
  return resposta.status === 204 ? null : resposta.json()
}

export const api = {
  listarPacientes: () => requisicao("/pacientes"),
  criarPaciente: (dados) => requisicao("/pacientes", { method: "POST", body: JSON.stringify(dados) }),
  cancelarConsulta: (id) => requisicao(`/consultas/${id}`, { method: "DELETE" })
}
```

Agora o componente fica limpo: `const lista = await api.listarPacientes()`. E quando a URL da API mudar (e vai mudar, no deploy), você altera **um** arquivo.

---

## 🔐 Quando tem login

Depois que o usuário entra, o back devolve um **token**. Ele precisa ir em toda requisição seguinte:

```js
const token = localStorage.getItem("token")

fetch(`${BASE}/consultas`, {
  headers: { "Authorization": `Bearer ${token}` }
})
```

- **401** significa "você não está autenticado": token ausente, expirado ou inválido. A tela deve mandar o usuário para o login.
- **403** significa "você está autenticado, mas não pode fazer isso". Mostre mensagem, não mande para o login.

> Como isso funciona por dentro: [[73-Autenticacao-e-autorizacao]].

---

## 🔧 Onde as coisas quebram, e como descobrir em 2 minutos

Abra `F12` → aba **Network**, refaça a ação, e clique na requisição:

| O que você vê | O que significa | O que fazer |
|---|---|---|
| A requisição **nem aparece** | O código nem chamou. Erro está no seu JS | Veja a aba Console: erro de digitação, função não chamada, submit recarregando a página |
| **Failed / CORS error** | O navegador bloqueou por política do servidor | Não é você. O back precisa liberar a origem. Avise quem cuida do back |
| **404** | URL errada | Confira barra a mais, plural, prefixo `/api` |
| **400** | Você mandou dado inválido ou incompleto | Olhe a aba Payload: o corpo está do jeito combinado? |
| **401 / 403** | Falta token ou falta permissão | Confira o header Authorization |
| **500** | Quebrou no back | ⚠️ Não é culpa da tela. Leve o horário e o corpo enviado para quem fez a rota |
| **200 mas a tela não mostra** | Deu certo e você usou errado | Veja a aba Response: o formato é o que seu código espera? `dados.items` ou `dados` direto? |

💡 **Frase que resolve 90% das discussões de "é o front ou o back?":** *"No Network, o POST /pacientes está indo com este corpo e voltando 500. Do meu lado o pedido está no formato combinado, então parece que quebrou no servidor. Consegue olhar o log?"* Isso é diagnóstico, não acusação, e economiza horas.

Ferramentas que ajudam:
- **Console** (`F12`): erros de JavaScript aparecem aqui.
- **`console.log(dados)`** logo depois do `.json()`: mostra o que realmente veio.
- **Testar a API sem a tela**, para isolar o problema:
  ```bash
  curl -i http://localhost:3000/api/pacientes
  curl -i -X POST http://localhost:3000/api/pacientes \
    -H "Content-Type: application/json" \
    -d '{"nome":"Maria","cpf":"12345678900"}'
  ```
  Se o `curl` funciona e a tela não, o problema é seu. Se nem o `curl` funciona, o problema é do back. Isso encerra a dúvida.

---

## 🌐 Os dois tropeços clássicos

### CORS

Você chama a API e o navegador bloqueia com uma mensagem de "CORS policy". Isso é o navegador protegendo o usuário: o servidor precisa dizer explicitamente que aceita pedidos vindos do endereço do seu front.

**Não se resolve no front.** Quem faz o back adiciona a permissão (em Express, o pacote `cors`; em Django, `django-cors-headers`). Sua parte é reconhecer o erro e avisar com o nome certo: *"está dando erro de CORS quando chamo da porta 5173, precisa liberar essa origem no back"*.

### A URL da API muda por ambiente

Local é `http://localhost:3000`, homologação é outro endereço, produção é outro. Nunca escreva a URL fixa no código.

```
# .env.local
VITE_API_URL=http://localhost:3000/api
```

```js
const BASE = import.meta.env.VITE_API_URL
```

⚠️ `.env` **nunca** vai para o Git. Só o `.env.example`, com os nomes e sem os valores. Ver [[04-Projeto-novo-do-zero-ao-primeiro-commit]].

---

## 🧭 Como se dividir com o back sem depender de ninguém

Uma dinâmica que funciona bem em equipe de NES, e que te tira do papel de quem espera:

1. **Na planning**, defina junto o contrato dos endpoints da sprint (as 4 linhas da tabela lá em cima). Anote na issue.
2. **Você começa pela tela com mock**, no formato combinado.
3. **Quem faz o back** implementa o endpoint com o mesmo contrato.
4. **Vocês integram** trocando o mock pela chamada real. Se o contrato foi respeitado, isso leva 15 minutos.
5. Se algo não bater, ajusta-se o contrato **na issue**, não na conversa solta.

Essa é uma contribuição de processo que você pode propor mesmo sabendo pouco de código. E ela costuma impressionar, porque resolve o problema que mais atrasa equipes iniciantes: front e back se encontrarem só no dia 14.

---

## ✅ Checklist de uma integração bem feita

- [ ] O contrato do endpoint está escrito na issue (URL, método, corpo, sucesso, erro).
- [ ] A URL base vem de variável de ambiente, não está fixa no código.
- [ ] As chamadas estão centralizadas em `services/api.js`.
- [ ] A tela trata os quatro estados: carregando, erro, vazio e sucesso.
- [ ] Erro de validação (400) aparece no campo; erro de sistema (500) mostra mensagem geral.
- [ ] Requisições autenticadas mandam o token, e 401 leva ao login.
- [ ] Testei o caminho feliz e pelo menos um caminho de erro.
- [ ] Consigo explicar, linha por linha, o que o meu código faz.

---

## 🎓 Em uma frase, para levar para a daily

> *"Integração é: eu monto um pedido no formato combinado, mando pra um endereço, e trato o que voltar em quatro casos: carregando, erro, vazio e sucesso."*

Se você entendeu isso, você não está mais perdido na integração. Está no começo dela, que é diferente.

---

> Volte ao [[00-Indice]]. Para destravar no meio de uma tarefa: [[11-Quando-voce-nao-sabe-o-que-fazer]].
