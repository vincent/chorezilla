# --------- Build Frontend ---------
FROM node:24 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# --------- Build Backend ---------
FROM golang:1.24 AS backend-build
WORKDIR /app/backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ ./
# Build the backend binary
RUN go build -o pocketbase .

# --------- Final Image ---------
FROM debian:bookworm-slim

# Install any runtime dependencies (if needed)
RUN apt-get update && apt-get install -y ca-certificates debian-keyring debian-archive-keyring apt-transport-https curl gpg

# Create directories
WORKDIR /srv/jugamos/
RUN mkdir -p deployed

# Copy built frontend
COPY --from=frontend-build /app/frontend/build ./deployed/frontend

# Copy backend binary and required files
COPY --from=backend-build /app/backend/pocketbase ./deployed/backend/pocketbase
COPY backend/pb_hooks/ ./deployed/backend/pb_hooks
COPY backend/pb_migrations/ ./deployed/backend/pb_migrations
COPY backend/go.mod ./deployed/backend/
COPY backend/go.sum ./deployed/backend/
COPY backend/main.go ./deployed/backend/
COPY backend/Caddyfile ./deployed/backend/

# Install Caddy
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
RUN apt update
RUN apt install -y caddy
RUN caddy add-package github.com/caddy-dns/cloudflare
RUN echo "echo Starting Jugamos...                                                                                    \n\
if [ \"\${JUGAMOS_FQDN}\" = \"\" ]; then echo 'error: missing JUGAMOS_FQDN'; exit 100; fi                             \n\
if [ \"\${JUGAMOS_CLOUDFLARE_TOKEN}\" = \"\" ]; then echo 'error: missing JUGAMOS_CLOUDFLARE_TOKEN'; exit 100; fi   \n\n\
sed -i \"s%JUGAMOS_FQDN%\${JUGAMOS_FQDN}%\" /srv/jugamos/deployed/backend/Caddyfile                                   \n\
sed -i \"s%JUGAMOS_CLOUDFLARE_TOKEN%\${JUGAMOS_CLOUDFLARE_TOKEN}%\" /srv/jugamos/deployed/backend/Caddyfile         \n\n\
caddy run --config /srv/jugamos/deployed/backend/Caddyfile &                                                        \n\n\
/srv/jugamos/deployed/backend/pocketbase serve \${JUGAMOS_DEBUG} --http 0.0.0.0:8090 --dir /srv/jugamos/data --hooksDir /srv/jugamos/deployed/backend/pb_hooks --migrationsDir /srv/jugamos/deployed/backend/pb_migrations --publicDir /srv/jugamos/frontend \n\n\
" > /srv/jugamos/deployed/entrypoint.sh

# Expose ports
EXPOSE 80
EXPOSE 443

CMD ["sh", "/srv/jugamos/deployed/entrypoint.sh"]
