# AGENTS.md - Frontend App

## Project Overview

**Chords Frontend** - React application for serving songs with chords and lyrics, supporting both musicians and regular users.

## Tech Stack

- **Framework**: React 19.1.1 + TypeScript 5.8.3 + Vite 7.1.2
- **Routing**: TanStack Router with file-based routing
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Environment**: t3-env for type-safe environment variables
- **Quality**: ESLint + Prettier

### Chord Notation

- **Format**: Square brackets `[C]` around chord names
- **Placement**: Chords before the word they apply to
- **Examples**: `[C]`, `[Am]`, `[F]`, `[G]`, `[Dm]`

**Example**

```json
{
    "id": "you-are-my-sunshine",
    "title": "You Are My Sunshine",
    "artist": "Traditional",
    "lyrics": "[C]You are my sunshine, my only sunshine\n[C]You make me happy when [G]skies are [C]gray..."
}
```

## Deployment

- **Platform**: GitHub Pages
- **Command**: `pnpm deploy`
- **Process**: Builds with `PUBLIC_BASE_PATH=/chords/`, copies `index.html` as `404.html`, deploys to `gh-pages` branch
- **URL**: `https://vhalchuk.github.io/chords/`
- **SPA Routing**: Uses `404.html` fallback for client-side routing
- **Environment**: `PUBLIC_BASE_PATH` environment variable controls the base path for both Vite and TanStack Router

## TypeScript Import Guidelines

- **Types**: `import type { Song } from '@/types/song'`
- **Runtime**: `import { Button } from '@/components/ui/button'`
- **Mixed**: Separate type and runtime imports

## Code Quality Requirements

**MANDATORY**: AI agents MUST run before committing:

1. `pnpm run lint:fix` - Fix ESLint and Prettier issues
2. `pnpm run format` - Ensure consistent formatting
3. `pnpm run lint` - Verify no errors
4. `pnpm run format:check` - Verify formatting consistency
