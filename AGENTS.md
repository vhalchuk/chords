# AGENTS.md - Project Context

## Project Overview

**Chords App** - React application for serving songs with chords and lyrics.

## Current Status

✅ React TypeScript Vite project with homepage and songs list

## Tech Stack

- **Framework**: React 19.1.1 + TypeScript 5.8.3 + Vite 7.1.2
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Quality**: ESLint + Prettier + Husky pre-commit hooks

## Project Structure

```
src/
├── components/
│   ├── ui/           # Shadcn UI components
│   ├── SongCard.tsx  # Individual song card
│   └── SongList.tsx  # Songs grid layout
├── types/song.ts     # Song interface
├── data/songs.json   # Song data (4 sample songs)
└── App.tsx          # Main app with homepage
```

## Git Commit Convention

- **Format**: `type(scope): description`
- **Types**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- **AI Autonomy**: AI can commit small changes autonomously

## Code Quality Requirements

**MANDATORY**: AI agents MUST run before committing:

1. `npm run lint:fix` - Fix ESLint and Prettier issues
2. `npm run format` - Ensure consistent formatting
3. `npm run lint` - Verify no errors
4. `npm run format:check` - Verify formatting consistency

## TypeScript Import Guidelines

- **Types**: `import type { Song } from '@/types/song'`
- **Runtime**: `import { Button } from '@/components/ui/button'`
- **Mixed**: Separate type and runtime imports

## Song Data Format

```typescript
interface Song {
  id: string; // Unique identifier
  title: string; // Song title
  artist: string; // Artist name
  lyrics: string; // Lyrics with inline chords
}
```

### Chord Notation

- **Format**: Square brackets `[C]` around chord names
- **Placement**: Chords before the word they apply to
- **Examples**: `[C]`, `[Am]`, `[F]`, `[G]`, `[Dm]`

### Example

```json
{
  "id": "you-are-my-sunshine",
  "title": "You Are My Sunshine",
  "artist": "Traditional",
  "lyrics": "[C]You are my sunshine, my only sunshine\n[C]You make me happy when [G]skies are [C]gray..."
}
```

## Current Features

- ✅ Homepage with songs list
- ✅ Song detail view with full lyrics
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Search bar placeholder
- ✅ Navigation between views
- ✅ 4 sample songs for testing
