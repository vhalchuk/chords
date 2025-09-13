# Multi-stage Dockerfile for Chords Application
# This composes the entire system: Frontend + API + Gateway

# Stage 1: Build Frontend
# This stage builds the React application
FROM node:18-alpine AS frontend-builder

WORKDIR /app

# Copy workspace configuration and lockfile
COPY pnpm-workspace.yaml pnpm-lock.yaml ./

# Install pnpm globally (same version as specified in package.json)
RUN npm install -g pnpm@10.16.0

# Copy frontend package files
COPY apps/frontend/package.json ./apps/frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy frontend source code
COPY apps/frontend/ ./apps/frontend/

# Build the frontend
RUN pnpm --filter @chords/frontend build

# Stage 2: Build API
# This stage prepares the Node.js API server
FROM node:18-alpine AS api-builder

WORKDIR /app

# Copy workspace configuration and lockfile
COPY pnpm-workspace.yaml pnpm-lock.yaml ./

# Install pnpm globally (same version as specified in package.json)
RUN npm install -g pnpm@10.16.0

# Copy API package files
COPY apps/api/package.json ./apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy API source code
COPY apps/api/ ./apps/api/

# Stage 3: Final Runtime
# This stage combines everything for production
FROM node:18-alpine AS runtime

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.16.0

# Copy API from builder stage
COPY --from=api-builder /app/apps/api ./apps/api
COPY --from=api-builder /app/node_modules ./node_modules
COPY --from=api-builder /app/pnpm-lock.yaml ./

# Copy Nginx configuration
COPY apps/gateway/nginx.conf /etc/nginx/nginx.conf

# Copy built frontend files
COPY --from=frontend-builder /app/apps/frontend/dist /usr/share/nginx/html

# Install Nginx
RUN apk add --no-cache nginx

# Create startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'nginx &' >> /start.sh && \
    echo 'cd /app/apps/api && node src/server.js' >> /start.sh && \
    chmod +x /start.sh

# Expose ports
EXPOSE 80 3000

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start both services
CMD ["/start.sh"]