# AGENTS.md - Project Context and Progress

## Project Overview
**Chords App** - A React application for serving songs with chords and lyrics.

## Current Status: Project Initialization Complete ✅

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

## Project Structure
```
/Users/vhalchuk/Projects/chords/
├── .git/                 # Git repository
├── .gitignore           # Git ignore rules
├── package.json         # npm configuration
├── README.md            # Project documentation
└── AGENTS.md            # This file - agent context
```

## Next Development Phase
The project is now ready for:
- React and dependency installation
- Development environment setup
- Component architecture planning
- Song data structure design
- Chord and lyrics display implementation

## Technical Context
- **Platform**: macOS (darwin 24.6.0)
- **Shell**: /bin/zsh
- **Package Manager**: npm
- **Target Framework**: React
- **Project Type**: Web application for music/chords

## Development Notes
- No dependencies installed yet (as requested)
- No code written yet (as requested)
- Git repository is clean and ready for first commit
- All configuration files are properly set up for React development

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

## Future Considerations
- Will need to decide on React setup method (Create React App, Vite, etc.)
- Song data format and storage strategy
- Chord notation system and display
- Lyrics formatting and synchronization
- User interface design and navigation
