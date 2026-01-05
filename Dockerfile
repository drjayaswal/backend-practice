# --- Stage 1: Install & Build ---
FROM oven/bun:latest AS builder
WORKDIR /app

COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

COPY . .
RUN mkdir -p public

ENV NODE_ENV=production
RUN ./node_modules/.bin/next build

# --- Stage 2: Final Runtime ---
# We change 'distroless' to 'latest' to provide the necessary system libraries
FROM oven/bun:latest AS runner
WORKDIR /app

# Copy only the essentials from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["./node_modules/.bin/next", "start"]