# Multi-stage Dockerfile for Chords Application
# This composes the entire system: Frontend + Gateway

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

# Stage 2: Build Gateway
# This stage creates the Nginx gateway with static files
FROM nginx:alpine AS gateway

# Copy Nginx configuration from gateway app
COPY apps/gateway/nginx.conf /etc/nginx/nginx.conf

# Copy built frontend files from previous stage
COPY --from=frontend-builder /app/apps/frontend/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]