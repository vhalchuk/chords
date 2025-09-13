# AGENTS.md - Chords Monorepo

## Project Overview

**Chords Monorepo** - A complete music application stack for serving songs with chords and lyrics, supporting both musicians and regular users.

## Monorepo Structure

```
chords/
├── apps/
│   ├── frontend/     # React TypeScript Vite app
│   ├── gateway/      # Nginx reverse proxy (planned)
│   └── api/          # Node.js server (planned)
├── packages/
│   └── shared/       # Shared types, utils, configs (planned)
└── docker/           # Docker configuration (planned)
```

## Current Status

✅ **Frontend App**: Complete React TypeScript Vite project with TanStack Router, chord transposition, font controls, and dual-mode display

🚧 **Gateway**: Nginx reverse proxy (planned)
🚧 **API**: Node.js server (planned)
🚧 **Shared Packages**: Common types and utilities (planned)
🚧 **Docker Setup**: Single container deployment (planned)

## Development Guidelines

1. **App Independence**: Each app should be independently deployable
2. **Shared Code**: Common functionality goes in `packages/shared/`
3. **Consistent Tooling**: Use same linting, formatting, and testing tools across apps
4. **Docker First**: All apps should be containerizable
5. **Documentation**: Each app has its own `AGENTS.md` for specific details