# Claude Code Configuration

This file contains configuration and notes for Claude Code usage in this project.

## Project Overview
- **Project Type**: Augmented Reality (AR) web application with rotating vinyl record
- **Working directory**: /Users/palomasanchezc/ar_vsnr
- **Git repository**: Yes, main branch
- **Package Manager**: PNPM 10.0.0
- **Deployment**: GitHub Pages at https://p-alom-a.github.io/ar_vsnr/

## Tech Stack
- **Frontend**: React 19.1.1 + Vite 7.1.2
- **AR/3D**: A-Frame 1.7.1 + MindAR 1.2.1 + Three.js 0.180.0
- **React 3D**: @react-three/fiber + @react-three/drei
- **Language**: JavaScript/JSX (no TypeScript)

## Project Structure
```
src/                    # Source code (Vite root)
├── main.jsx           # App entry point
├── App.jsx            # Main component
├── Vinyle_cup.jsx     # AR scene component
└── index.css          # Global styles
public/                # Static assets
├── models/vinyle2.glb # 3D vinyl model
├── targets-cup.mind   # AR image target
└── *.mp3              # Audio files
```

## Common Commands
```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm preview          # Preview built app
pnpm lint             # Run ESLint
pnpm deploy           # Deploy to GitHub Pages

# Testing/Validation
pnpm run lint         # Check code style
```

## Vite Configuration Notes
- Custom setup: `src/` as root directory
- Public directory: `../public/`
- Base path: `/ar_vsnr/` (for GitHub Pages)
- GLSL shader support enabled
- JSX transformation for `.js` files

## AR Application Details
- **Image-based AR**: Uses MindAR for target detection
- **3D Model**: Rotating vinyl with animated pink rings
- **Mobile-first**: Optimized for mobile AR experiences
- **Full-screen**: Immersive AR interface
- **External Assets**: Models/targets served from GitHub Pages

## Known Issues
- Import error in App.jsx: references non-existent `Vinyle.jsx` (should be `Vinyle_cup.jsx`)
- Git shows untracked `src/Vinyle.jsx` but file doesn't exist

## Development Notes
- Use PNPM for package management
- Assets hosted externally on GitHub Pages
- Custom CSS hides MindAR UI elements
- A-Frame animations for smooth rotations