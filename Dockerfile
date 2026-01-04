# --- Stage 1: Install & Build ---
FROM oven/bun:latest AS builder
WORKDIR /app

# Copy files required for installation
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Copy all source files and build the Next.js app
COPY . .

RUN mkdir public
RUN bun run build

# --- Stage 2: Final Runtime ---
FROM oven/bun:distroless AS runner
WORKDIR /app


# Copy only the necessary files from the builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next 
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

# If you still need "dev" mode, copy everything else (not recommended for prod)
COPY --from=builder /app .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

EXPOSE 3000

CMD ["bun", "next", "dev"]