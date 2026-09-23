# Egor Matafonov — Portfolio

A modern, premium portfolio website for Egor Matafonov — Product Manager who builds.

## Overview

This is a production-quality personal portfolio website built with React, Vite, TypeScript, and Tailwind CSS. It features:

- **Dark/Light theme** with system preference detection
- **EN/RU language** support
- **Interactive product graph** visualization in the hero
- **Command palette** (⌘K / Ctrl+K)
- **Case study pages** for each project
- **Responsive design** optimized for all screen sizes
- **Smooth animations** with Framer Motion
- **Accessibility** focused (semantic HTML, keyboard navigation, ARIA)
- **Performance** optimized (lazy loading, minimal JS, GPU-friendly animations)

## Getting Started

### Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

The output will be in the `dist/` directory.

### Type Checking

```bash
npm run typecheck
```

## Content Management

### Editing Text Content

All text content is stored in `src/content/i18n.ts`:

- **English**: `en` object
- **Russian**: `ru` object

To change any text on the site, edit the corresponding property in these objects.

### Adding/Editing Projects

Projects are defined in `src/content/projects.ts`:

```typescript
{
  slug: 'project-slug',        // URL path: /work/project-slug
  name: 'Project Name',        // Display name
  subtitle: 'Short subtitle',  // Brief description
  category: 'Category',        // e.g., 'Productivity / Product'
  year: '2024',               // Optional year
  role: 'Role description',    // Your role
  description: 'Full description...',
  tags: ['Product', 'UX'],     // Technology tags
  github: 'https://...',       // Optional GitHub link
  live: 'https://...',         // Optional live link
  featured: true,              // Show on homepage
  status: 'Live',              // 'Live' | 'In development' | 'Archived'
  size: 'large',               // 'large' | 'medium' | 'small' (card size)
  problem: 'Problem statement',
  decisions: [                 // Product decisions
    { problem: '...', decision: '...', why: '...' }
  ],
  reflection: [                // What to improve
    { limitation: '...', hypothesis: '...', experiment: '...' }
  ]
}
```

### Editing Lab Projects

Lab items are in the `labProjects` array in `src/content/projects.ts`.

### Editing Experience

Experience items are in `src/content/i18n.ts` under `experience.items`.

### Editing Skills/Capabilities

Capabilities are in `src/content/i18n.ts` under `capabilities.categories`.

### Editing Tools

Tool list is in `src/content/i18n.ts` under `tools`.

## Configuration

### CV / Resume

Place your CV PDF at `public/cv.pdf`. The "Download CV" button links to this path.

### Social Links

Update these in the relevant components:

- **GitHub**: `src/components/Sections.tsx` (Footer) and `src/content/i18n.ts` (command palette)
- **Telegram**: `src/components/Sections.tsx` (Contact section)
- **Email**: `src/components/Sections.tsx` (Contact section)
- **LinkedIn**: `src/components/Sections.tsx` (Footer)

### Screenshots

Project screenshots can be added to `public/images/projects/` and referenced in the project data. Currently, placeholder visuals are used.

## Design System

### Colors

Defined as CSS custom properties in `src/index.css`:

- Background: `#08090B` (dark), `#F5F5F2` (light)
- Text: `#F5F5F2` (primary), `#A0A5AD` (secondary), `#686E77` (muted)
- Accent: `#7C8CFF` (dark), `#5A6AE6` (light)
- Borders: `rgba(255,255,255,0.08)` (dark), `rgba(0,0,0,0.08)` (light)

### Typography

- **Primary**: Inter (Google Fonts)
- **Mono**: JetBrains Mono (Google Fonts)

### Spacing

- Section padding: `py-32 md:py-40`
- Max content width: `1600px`
- Generous whitespace between sections

### Motion

- Fast: 180ms
- Base: 320ms
- Slow: 550ms
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## Features

### Command Palette

Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open the command palette.

Available commands:
- Navigate to sections
- Download CV
- Open GitHub
- Switch language

**Easter egg**: Type "build" in the command palette.

### Theme Toggle

Click the sun/moon icon in the navbar to switch between dark and light themes.

### Language Toggle

Click the globe icon (EN/RU) in the navbar to switch languages.

## Deployment

### Vercel

```bash
npm i -g vercel
vercel
```

### Netlify

Connect your repository and set build command to `npm run build` with publish directory `dist`.

### GitHub Pages

Add to `vite.config.js`:
```js
base: '/your-repo-name/'
```

Then deploy the `dist/` folder.

### Static Hosting

The `dist/` folder can be served by any static file server.

## Project Structure

```
src/
├── App.tsx              # Main app with routing
├── main.tsx             # Entry point
├── index.css            # Design tokens & base styles
├── content/
│   ├── i18n.ts          # EN/RU text content
│   └── projects.ts      # Project data
├── lib/
│   └── context.tsx      # App context (theme, language, hooks)
└── components/
    ├── Navigation.tsx   # Navbar, scroll progress, command palette
    ├── Hero.tsx         # Hero section with product graph
    ├── Sections.tsx     # All homepage sections
    ├── CaseStudy.tsx    # Project case study page
    └── NotFound.tsx     # 404 page
```

## Performance

- Lighthouse Performance target: 90+
- Minimal JavaScript bundle
- CSS-based animations where possible
- GPU-friendly transforms (opacity, translate)
- Lazy loading for heavy components
- No external images required for core experience

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation throughout
- Visible focus states
- ARIA labels on interactive elements
- `prefers-reduced-motion` support
- High contrast text
- Touch targets ≥ 44px on mobile

## License

Private — © 2025 Egor Matafonov
