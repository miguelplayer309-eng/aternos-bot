# Usar Node.js 18
FROM node:18

# Criar pasta do app
WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto do projeto
COPY . .

# Rodar o bot
CMD ["node", "index.js"]
