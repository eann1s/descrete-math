# ========== STAGE 1: Base ==========
FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline

# ========== STAGE 2: Builder ==========
FROM base AS builder
COPY . .

RUN npm run build && \
    npm prune --production

# ========== STAGE 3: Production ==========
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE ${FRONTEND_PORT}

CMD ["node", "server.js"]