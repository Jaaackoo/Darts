# Use official Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Serve with a lightweight web server
RUN npm install -g serve
CMD ["serve", "-s", "build"]

EXPOSE 3000
