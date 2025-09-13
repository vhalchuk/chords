# AGENTS.md - Gateway App

## Project Overview

**Chords Gateway** - Nginx reverse proxy that serves static files and routes API requests.

## Current Status

✅ **Nginx Configuration**: Complete configuration with static file serving and API proxying
✅ **Isolation**: App is independent and doesn't know about other services
✅ **Integration**: Used in root-level multi-stage Docker build

## Architecture

### Responsibilities
- **Static File Serving**: Serves React frontend files
- **API Proxying**: Routes `/api/*` requests to backend service
- **SPA Routing**: Handles client-side routing with fallback to index.html
- **Caching**: Sets appropriate cache headers for static assets

### Configuration (`nginx.conf`)
- **Port**: Listens on port 80
- **Static Files**: Serves from `/usr/share/nginx/html`
- **API Proxy**: Forwards `/api/*` to upstream server
- **Compression**: Enables gzip compression
- **Caching**: Sets cache headers for static assets

## Development Commands

```bash
# Test Nginx configuration syntax (Docker-based validation)
pnpm test
```
