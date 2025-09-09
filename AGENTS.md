# AGENTS.md - Project Context

## Project Overview

**Chords App** - React application for serving songs with chords and lyrics, supporting both musicians and regular users.

## Current Status

✅ Complete React TypeScript Vite project with TanStack Router, chord transposition, font controls, and dual-mode display

## Tech Stack

- **Framework**: React 19.1.1 + TypeScript 5.8.3 + Vite 7.1.2
- **Routing**: TanStack Router with file-based routing
- **Styling**: Tailwind CSS + Shadcn UI
- **Icons**: Lucide React
- **Environment**: t3-env for type-safe environment variables
- **Quality**: ESLint + Prettier + Husky pre-commit hooks

## Project Structure

```
src/
├── components/
│   ├── ui/           # Shadcn UI components
│   ├── SongCard.tsx  # Individual song card (clickable)
│   └── SongList.tsx  # Songs grid layout
├── lib/
│   ├── chordParser.tsx    # Chord parsing and styling
│   ├── chordTransposer.ts # Chord transposition utility
│   └── utils.ts           # Tailwind class utilities
├── env.ts                 # t3-env environment configuration
├── routes/
│   ├── __root.tsx         # Root layout with header/footer
│   ├── index.tsx          # Homepage with songs list
│   └── song.$songId.tsx   # Dynamic song detail page
├── types/song.ts           # Song interface
├── data/songs.json         # Song data (4 sample songs)
└── main.tsx               # Router entry point
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

## Environment Variables

- **Configuration**: Uses `t3-env` for type-safe environment variable management
- **Client Variables**: Must be prefixed with `PUBLIC_` (e.g., `PUBLIC_BASE_PATH`)
- **Schema**: Defined in `src/env.ts` with Zod validation
- **Usage**: Import `env` from `@/env` to access validated variables

## Deployment

- **Platform**: GitHub Pages
- **Command**: `npm run deploy`
- **Process**: Builds with `PUBLIC_BASE_PATH=/chords/`, copies `index.html` as `404.html`, deploys to `gh-pages` branch
- **URL**: `https://vhalchuk.github.io/chords/`
- **SPA Routing**: Uses `404.html` fallback for client-side routing
- **Environment**: `PUBLIC_BASE_PATH` environment variable controls the base path for both Vite and TanStack Router

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

### Core Functionality

- ✅ **Homepage**: Songs list with search placeholder
- ✅ **Song Detail**: Full lyrics display with styled chords
- ✅ **Responsive Design**: Mobile/tablet/desktop optimized
- ✅ **Navigation**: TanStack Router with file-based routing
- ✅ **Accessibility**: Keyboard navigation and screen reader support

### Advanced Features

- ✅ **Font Size Controls**: Compact merged button group with AArrowDown/AArrowUp icons
- ✅ **Chord Transposition**: ±12 semitones with localStorage persistence
- ✅ **Dual Display Modes**: Lyrics-only or lyrics with chords
- ✅ **Settings Dropdown**: 3-dot menu for chord visibility toggle
- ✅ **Persistent Preferences**: All settings saved in localStorage

### Technical Implementation

- ✅ **Chord Parsing**: Real-time chord styling with relative font sizes
- ✅ **Transposition Engine**: Chromatic scale mapping with enharmonic support
- ✅ **State Management**: React hooks with localStorage integration
- ✅ **UI Components**: Merged button groups with seamless borders
- ✅ **Performance**: useMemo optimization for chord processing

## Key Components

### Song Detail Page (`song.$songId.tsx`)

- **Font Controls**: Merged AArrowDown/AArrowUp buttons
- **Transposition**: Merged Minus/Plus buttons with semitone display
- **Settings Menu**: 3-dot dropdown with chord visibility options
- **Responsive Back Button**: Shows arrow only on mobile
- **Conditional Rendering**: Chords or text-only based on user preference

### Chord Parser (`chordParser.tsx`)

- **parseLyricsWithChords()**: Renders chords as styled spans
- **parseLyricsWithoutChords()**: Strips chord notation for clean text
- **Relative Sizing**: Chords scale with container font size (0.75em)

### Chord Transposer (`chordTransposer.ts`)

- **transposeChord()**: Transposes individual chords
- **transposeLine()**: Transposes entire lyrics lines
- **Enharmonic Support**: Handles C#/Db, F#/Gb, etc.
- **Range Safety**: Limited to ±12 semitones

## User Experience

### For Musicians

- **Default Mode**: Chords visible with transposition controls
- **Full Control**: Font size, key transposition, chord visibility
- **Professional Tools**: Semitone precision, enharmonic support

### For Regular Users

- **Clean Mode**: Lyrics-only display via settings dropdown
- **Simple Interface**: Minimal controls, focus on text
- **Easy Toggle**: One-click switch between modes

## localStorage Keys

- `chords-font-size`: Font size preference (10-24px)
- `chords-transposition`: Transposition semitones (-12 to +12)
- `chords-visibility`: Show chords boolean (true/false)
