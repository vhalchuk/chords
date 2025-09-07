# AGENTS.md - Project Context and Progress

## Project Overview

**Chords App** - A React application for serving songs with chords and lyrics.

## Current Status: React TypeScript Vite Project Initialized ✅

### Completed Tasks

1. **Git Repository Initialization**
   - Initialized empty git repository in `/Users/vhalchuk/Projects/chords/`
   - Repository is ready for version control

2. **npm Project Setup**
   - Created `package.json` with default configuration
   - Project name: "chords"
   - Version: 1.0.0
   - License: ISC
   - Ready for dependency installation

3. **Git Configuration**
   - Added comprehensive `.gitignore` file covering:
     - Node.js dependencies (`node_modules/`)
     - Build outputs (`build/`, `dist/`)
     - Environment files (`.env*`)
     - IDE files (`.vscode/`, `.idea/`)
     - OS-specific files (`.DS_Store`, `Thumbs.db`)
     - Logs, cache files, and other common patterns

4. **Documentation**
   - Created basic `README.md` with project description
   - Documented next steps for development

5. **React TypeScript Vite Setup**
   - Initialized Vite project with React TypeScript template
   - Installed all dependencies (React 19.1.1, TypeScript 5.8.3, Vite 7.1.2)
   - Configured ESLint for code quality
   - Set up TypeScript configuration files
   - Created basic React app structure with modern tooling

6. **Code Formatting Setup**
   - Added Prettier 3.6.2 for consistent code formatting
   - Configured ESLint integration with Prettier
   - Set up formatting scripts (format, format:check, lint:fix)
   - Created Prettier configuration with React-friendly settings

## Project Structure

```
/Users/vhalchuk/Projects/chords/
├── .git/                 # Git repository
├── .gitignore           # Git ignore rules
├── .prettierrc          # Prettier configuration
├── .prettierignore      # Prettier ignore patterns
├── package.json         # npm configuration with Vite scripts
├── package-lock.json    # Dependency lock file
├── README.md            # Project documentation
├── AGENTS.md            # This file - agent context
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.app.json    # App-specific TypeScript config
├── tsconfig.node.json   # Node-specific TypeScript config
├── eslint.config.js     # ESLint configuration with Prettier
├── index.html           # HTML entry point
├── public/              # Static assets
│   └── vite.svg
└── src/                 # Source code
    ├── main.tsx         # React entry point
    ├── App.tsx          # Main App component
    ├── App.css          # App styles
    ├── index.css        # Global styles
    ├── vite-env.d.ts    # Vite type definitions
    └── assets/           # App assets
        └── react.svg
```

## Next Development Phase

The project is now ready for:

- Component architecture planning
- Song data structure design
- Chord and lyrics display implementation
- UI/UX design and styling
- State management setup

## Technical Context

- **Platform**: macOS (darwin 24.6.0)
- **Shell**: /bin/zsh
- **Package Manager**: npm
- **Build Tool**: Vite 7.1.2
- **Framework**: React 19.1.1 with TypeScript 5.8.3
- **Linting**: ESLint with React plugins
- **Formatting**: Prettier 3.6.2 with ESLint integration
- **Project Type**: Web application for music/chords

## Development Notes

- React TypeScript Vite project fully initialized
- All dependencies installed and configured
- Development server ready (`npm run dev`)
- Build system configured (`npm run build`)
- ESLint configured for code quality
- Prettier configured for consistent formatting
- TypeScript strict mode enabled
- Modern React 19 with latest features available

## Git Commit Convention

- **Commit Message Format**: Use conventional commits format: `type(scope): description`
  - `feat:` - New features
  - `fix:` - Bug fixes
  - `docs:` - Documentation changes
  - `style:` - Code style changes (formatting, etc.)
  - `refactor:` - Code refactoring
  - `test:` - Adding or updating tests
  - `chore:` - Maintenance tasks, dependency updates
- **Examples**:
  - `feat(ui): add chord display component`
  - `fix(parser): handle malformed chord notation`
  - `docs(readme): update installation instructions`
- **AI Autonomy**: AI is authorized to make small, incremental commits for:
  - Configuration file updates
  - Documentation improvements
  - Minor bug fixes
  - Code formatting and style improvements
  - Small feature additions that don't require user review

## Code Quality Requirements

- **MANDATORY**: AI agents MUST run linting and formatting before committing changes
  - Run `npm run lint:fix` to fix ESLint and Prettier issues
  - Run `npm run format` to ensure consistent code formatting
  - Verify `npm run lint` passes with no errors
  - Verify `npm run format:check` passes with no warnings
- **Pre-commit Checklist**:
  1. ✅ Code compiles without TypeScript errors
  2. ✅ ESLint passes with no errors (`npm run lint`)
  3. ✅ Prettier formatting is consistent (`npm run format:check`)
  4. ✅ All tests pass (when tests are added)
  5. ✅ Documentation updated if needed
- **Failure Handling**: If linting/formatting fails, fix issues before committing
- **Quality Gate**: No commits should be made with linting errors or formatting issues

## Song Data Format

### Structure

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
- **Placement**: Chords appear before the word they apply to
- **Examples**: `[C]`, `[Am]`, `[F]`, `[G]`, `[Dm]`

### Example Song

```json
{
  "id": "you-are-my-sunshine",
  "title": "You Are My Sunshine",
  "artist": "Traditional",
  "lyrics": "[C]You are my sunshine, my only sunshine\n[C]You make me happy when [G]skies are [C]gray..."
}
```

### Implementation Notes

- Songs stored in `src/data/songs.json`
- Simple format for easy parsing and display
- Chords can be extracted using regex: `/\[([^\]]+)\]/g`
- Lyrics can be split by newlines for line-by-line display

## Future Considerations

- Will need to decide on React setup method (Create React App, Vite, etc.)
- Song data format and storage strategy
- Chord notation system and display
- Lyrics formatting and synchronization
- User interface design and navigation
