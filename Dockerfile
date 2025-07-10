# Stage 1: Build
FROM node:20 AS builder

# Set working directory
WORKDIR /app

# Copy files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files
COPY . .

# Build frontend and backend
RUN npm run build

# Stage 2: Production image
FROM node:20-slim

# Set NODE_ENV
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose desired port
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]
