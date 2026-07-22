---
title: '03 - Docker (referência rápida)'
---

# 03 — Docker (referência rápida)

> Manual de Bolso · Volume 6. Entenda o porquê em [[86-Docker-e-containers]].

---

## Conceitos em 10 segundos

- **Imagem** = o "molde" (a receita empacotada). Imutável.
- **Container** = uma imagem **em execução** (uma instância).
- **Dockerfile** = a receita para construir uma imagem.
- **Registry** = onde as imagens ficam guardadas (Docker Hub, ECR...).
- **Volume** = onde os dados **persistem** (fora do container efêmero).

Uma imagem → muitos containers. Container é descartável; **dados vão em volumes/banco, não dentro do container**.

---

## Containers

| Comando | O que faz |
|---------|-----------|
| `docker ps` | Lista containers **rodando**. |
| `docker ps -a` | Lista **todos** (inclusive parados). |
| `docker run <imagem>` | Cria e inicia um container. |
| `docker run -d <imagem>` | Roda em segundo plano (detached). |
| `docker run -p 8080:80 <imagem>` | Mapeia porta do host:container. |
| `docker run -e VAR=valor <imagem>` | Passa variável de ambiente. |
| `docker run --name meu-app <imagem>` | Dá um nome ao container. |
| `docker run -it <imagem> bash` | Abre um terminal interativo dentro do container. |
| `docker stop <id/nome>` | Para um container. |
| `docker start <id/nome>` | Inicia um container parado. |
| `docker restart <id/nome>` | Reinicia. |
| `docker rm <id/nome>` | Remove um container (parado). |
| `docker rm -f <id/nome>` | ⚠️ Força a remoção (mesmo rodando). |

---

## Logs e inspeção (debugar container)

| Comando | O que faz |
|---------|-----------|
| `docker logs <id/nome>` | Mostra os logs do container. |
| `docker logs -f <id/nome>` | Segue os logs em tempo real. |
| `docker logs --tail 100 <id/nome>` | Últimas 100 linhas. |
| `docker exec -it <id/nome> bash` | Entra num terminal do container **rodando**. |
| `docker exec -it <id/nome> sh` | Idem, se a imagem não tiver bash (alpine). |
| `docker inspect <id/nome>` | Detalhes (rede, volumes, config). |
| `docker stats` | Uso de CPU/memória dos containers em tempo real. |

💡 **App não sobe?** `docker logs <nome>` quase sempre diz o motivo.

---

## Imagens

| Comando | O que faz |
|---------|-----------|
| `docker images` | Lista imagens locais. |
| `docker pull <imagem>:<tag>` | Baixa uma imagem do registry. |
| `docker build -t meu-app:1.0 .` | Constrói uma imagem a partir do Dockerfile na pasta atual. |
| `docker tag <img> <novo:tag>` | Cria uma nova tag para a imagem. |
| `docker push <img>:<tag>` | Envia a imagem para o registry. |
| `docker rmi <imagem>` | Remove uma imagem local. |
| `docker history <imagem>` | Mostra as camadas da imagem. |

---

## Limpeza (Docker enche o disco!)

| Comando | O que faz |
|---------|-----------|
| `docker system df` | Mostra quanto espaço o Docker usa. |
| `docker container prune` | Remove todos os containers parados. |
| `docker image prune` | Remove imagens "penduradas" (sem tag). |
| `docker image prune -a` | ⚠️ Remove todas as imagens não usadas. |
| `docker volume prune` | ⚠️ Remove volumes não usados (**pode apagar dados!**). |
| `docker system prune` | ⚠️ Limpa containers parados, redes e imagens penduradas. |
| `docker system prune -a --volumes` | ⚠️⚠️ Limpeza total (cuidado com volumes/dados). |

---

## Docker Compose (vários containers de uma vez)

Arquivo `docker-compose.yml` descreve os serviços (app + banco + cache).

| Comando | O que faz |
|---------|-----------|
| `docker compose up` | Sobe todos os serviços. |
| `docker compose up -d` | Sobe em segundo plano. |
| `docker compose up --build` | Reconstrói as imagens antes de subir. |
| `docker compose down` | Para e remove os containers. |
| `docker compose down -v` | ⚠️ Idem, **removendo os volumes** (apaga dados). |
| `docker compose ps` | Lista os serviços. |
| `docker compose logs -f` | Segue os logs de todos os serviços. |
| `docker compose logs -f <serviço>` | Logs de um serviço específico. |
| `docker compose exec <serviço> bash` | Entra num serviço rodando. |
| `docker compose restart <serviço>` | Reinicia um serviço. |

💡 `docker compose up -d` é o comando que sobe o ambiente inteiro de dev (app + banco + cache) em segundos — o fim do "funciona na minha máquina".

---

## Dockerfile mínimo (exemplo comentado — Node)

```dockerfile
# a imagem base (leve)
FROM node:20-slim
# pasta de trabalho dentro do container
WORKDIR /app
# copia só os manifests primeiro (aproveita cache de camadas)
COPY package*.json ./
RUN npm ci --omit=dev
# copia o resto do código
COPY . .
# a porta que o app expõe
EXPOSE 3000
# comando que inicia o app
CMD ["node", "server.js"]
```

💡 **Boas práticas rápidas:**
- Use imagens base **enxutas** (`slim`, `alpine`).
- Copie os manifests **antes** do código (aproveita o cache do build).
- **Nunca** coloque segredos na imagem — passe em runtime (`-e` ou compose).
- Use um `.dockerignore` (como o `.gitignore`) para não copiar `node_modules`, `.git`, etc.

---

## Fluxo típico (dev)

```bash
docker compose up -d          # sobe app + banco + cache
docker compose logs -f app    # acompanha os logs do app
# ... desenvolve ...
docker compose down           # derruba tudo ao terminar
```

---

> 🧭 Manual de Bolso → **Docker**. Anterior: [[02-Terminal-e-Linux]] · Próxima: [[04-SQL]].
