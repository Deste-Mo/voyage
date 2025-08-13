FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev=false
COPY . .
EXPOSE 3002
CMD ["npm","run","start"]