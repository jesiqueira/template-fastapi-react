# 1. Estágio nomeado para consistência com o backend e docker-compose
FROM node:22-alpine AS development

# Atualiza os pacotes do Alpine para corrigir vulnerabilidades conhecidas
RUN apk update && apk upgrade --no-cache

# Define o diretório de trabalho
WORKDIR /app

# 2. Cache de dependências (Crucial para performance no Alpine)
COPY package*.json ./
RUN npm install

# 3. Copia o código fonte
COPY . .

# 4. Comando de inicialização
# O "-- --host" é vital para o Vite aceitar conexões externas ao container
CMD ["npm", "run", "dev", "--", "--host"]