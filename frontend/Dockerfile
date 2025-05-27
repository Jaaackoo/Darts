# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN ls -la && npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
