# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IronCoffee Solutions — a personal portfolio/agency website for Joshua Kac, built with React 18 + TypeScript. The site showcases projects, services, and contact info at `solutions.ironcoffee.com`, deployed to Dreamhost.

The app lives entirely in `ironcoffee-portfolio/`. All commands below should be run from that directory.

## Commands

```bash
cd ironcoffee-portfolio

npm run dev        # Vite dev server (port 5173)
npm run build      # Production build → build/
npm test           # Vitest
npm run verify     # Verify live deployment
npm run check-upload  # Check upload status (including /portfolio SPA routing)
```

## Architecture

**Entry point**: `src/App.tsx` — wraps the app in multiple providers in this order:
1. `HelmetProvider` (SEO)
2. Custom `ThemeProvider` (`src/context/ThemeContext.tsx`) — dark/light mode, persisted to localStorage
3. MUI `ThemeProvider` + Emotion `StyledThemeProvider` (using theme from `src/theme/theme.ts`)
4. React Router
5. Sentry `ErrorBoundary`

**Routing**: React Router v7 with routes defined in `App.tsx`. Individual project pages use slug-based dynamic routing → `ProjectPage.tsx` reads from `src/data/projects.ts`.

**Styling**: Dual system — MUI components + Styled-components for custom CSS. The MUI theme (`src/theme/theme.ts`) has extended breakpoints (xs through 7xl/8K), fluid typography via CSS `clamp()`, glassmorphism effects, and dark mode as default.

**Project data**: `src/data/projects.ts` is the single source of truth for all portfolio projects. Each project has slug, title, tech stack, images, links, and longDescription/features for the detail page.

**Services**: `src/services/analytics.ts` (GA4) and `src/services/errorTracking.ts` (Sentry) — initialized on app load. Keys come from env vars: `VITE_GA_MEASUREMENT_ID`, `VITE_SENTRY_DSN`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`.

**Key custom hooks**:
- `useMobileDetect` — device detection for conditional rendering
- `useMagneticElements` — magnetic cursor effect on interactive elements

**Interactive components**: `CursorFollower`, `BackgroundAnimation`, `Magnet`, `AnimatedSection` (scroll-triggered via Intersection Observer), `PageTransition`.

## Key Dependencies

- React 18.2 + TypeScript 4.9.5, Vite 6
- Material-UI 6.4.5, Styled-components 6.1.15
- Framer Motion 12.4.7 for animations
- React Router DOM 7.2.0
- Lucide React + MUI Icons
- @emailjs/browser for contact form
- React Helmet Async for SEO meta tags
