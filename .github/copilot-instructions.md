# ElectroWiz Codebase Guidelines

## Project Overview
**ElectroWiz** is a React + Vite web application showcasing an animated portal entrance experience with GSAP animations. The app features a dramatic hero section that animates the "ELECTROWIZ" text into a portal effect, transitioning to a multi-page event/competition platform.

- **Tech Stack**: React 19, Vite, GSAP 3.14 (animation library), ESLint
- **Key Pattern**: Component-based architecture with sections, pages, and reusable components
- **Styling**: CSS-only (no CSS-in-JS) with mobile-responsive design using `clamp()` utilities

## Architecture & Critical Paths

### Component Organization
- **`src/sections/`**: Full-page sections (Hero, About, Tracks, RegisterCTA)
- **`src/pages/`**: Page views (Home, Events, Contact, Credits) - currently mostly empty
- **`src/components/`**: Reusable UI pieces (Navbar, Footer, Countdown, SparksCanvas, Loader)

### Hero Section Animation Flow (Main Entry Point)
The `Hero.jsx` component uses GSAP timeline to orchestrate a multi-step entrance animation:
1. Zoom entire "ELECTROWIZ" word (scale: 1→3)
2. Fade non-T letters simultaneously (overlap timing: `-=0.6`)
3. Enlarge T letter as portal (scale: 6, timing: `-=0.3`)
4. Fade hero section and trigger transition via `onEnter` callback

**Key detail**: Animation uses `transformOrigin: "50% 50%"` and negative timeline offsets for orchestration. The `SparksCanvas` component (canvas-based particles) renders behind the text.

### Canvas-Based Effects
`SparksCanvas.jsx` implements responsive particle animation:
- Spark count: 80 on desktop, 40 on mobile (< 600px breakpoint)
- Each spark has velocity + random perturbation for organic movement
- Lifecycle management: sparks reset when `life` reaches 0
- Color scheme: cyan (`rgba(0,255,209,0.85)`) matching brand

## Development Workflows

### Build & Run
```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build (Vite output to dist/)
npm run lint     # ESLint check (no auto-fix configured)
npm run preview  # Serve production build locally
```

### Common Tasks
- **Adding animations**: Use GSAP timeline pattern (see Hero.jsx for ref) with negative offsets for sync
- **Responsive design**: Use `clamp()` for fluid typography (e.g., `font-size: clamp(2.8rem, 9vw, 8rem)`)
- **Component state**: Currently uses React hooks (useRef, useEffect); no state management library in use
- **Asset structure**: Images/sounds/videos in `src/assets/` (folders exist but unused)

## Styling Conventions

### Color Scheme
- **Primary accent**: `#00ffd1` (cyan) for text strokes, glows, shadows
- **Background**: `#020202` (near-black) with radial gradients
- **Secondary text**: `#9ca3af` (gray) for subtitles

### Key CSS Patterns
- **Vignette effect**: Use `::after` pseudo-element with radial gradient for cinematic framing
- **Text stroke glow**: Combine `-webkit-text-stroke` with `text-shadow` for layered effect
  ```css
  -webkit-text-stroke: 1.5px #00ffd1;
  text-shadow: 0 0 10px rgba(0, 255, 209, 0.3), 0 0 40px rgba(0, 255, 209, 0.15);
  ```
- **Mobile breakpoints**: `@media (max-width: 480px)` for mobile-first tuning

### Typography
- Fonts are referenced (Orbitron, Inter) but not explicitly imported—rely on system fallback
- Letter spacing: 0.35em (desktop), 0.22em (mobile) for Orbitron headings

## Important Notes

### Pre-Built Stub Structure
Many components/pages are created but empty (Navbar, Home, About, Countdown, etc.). This is intentional—structure is ready for feature expansion.

### ESLint Configuration
Uses modern flat config format (`eslint.config.js`). Enable TypeScript if type safety is needed (see README references TS template).

### No External State Management
Currently all state is local (useRef, useState). Scale this pattern carefully if global state becomes necessary.

## References
- Hero animation logic: `src/sections/Hero.jsx`
- Canvas particle system: `src/components/SparksCanvas.jsx`
- Base styles & resets: `src/index.css`
- Hero-specific styling: `src/styles/hero.css`
