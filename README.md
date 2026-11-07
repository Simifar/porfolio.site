# EGOR.EXE — Tech Arena

Personal portfolio for my move into **IT Support & PC Hardware**. It brings together my vocational education, hands-on computer equipment experience, and software projects in one bilingual (English and Russian) site.

**[Open the portfolio](https://simifar.github.io/porfolio.site/)** · [English](https://simifar.github.io/porfolio.site/) · [Русская версия](https://simifar.github.io/porfolio.site/?lang=ru)

The site documents my work assembling and reassembling more than 50 computers and taking inventory of classroom equipment at Potencial Training Center. I also share software projects built independently; they are presented as projects, not as IT support employment.

## This alternative

This branch prepares a **Brawl Stars-inspired** design for comparison. The published Minecraft version remains available on master; this alternative is not automatically published.

Original repair-crew mascot and gadget SVGs, a selectable tech arena, bold local Cyrillic typography, extruded controls and a filterable eight-item loadout. Blue/purple dark and paper/sky light themes; keyboard, touch and reduced motion remain supported. All career facts, project cases, PDF resumes and contact links are preserved.

## What is here

- **Experience and education:** computer equipment work and my 2026 vocational qualification in Information Systems and Programming (09.02.07).
- **Technical profile:** PC assembly and maintenance, power supply repairs and fan servicing, practical exposure to 1C databases and Windows Server; ongoing study of Windows, Linux (Debian) and virtualization.
- **Software projects:** TaskFocus, MindTrack and CortexMap, with project pages in English and Russian.
- **Contact:** email, LinkedIn, GitHub and Telegram, plus English and Russian PDF resumes. Seeking remote work or office / hybrid roles in Yekaterinburg.

The original social card can be rebuilt with `node scripts/generate-social-image.mjs`. The social image and resumes can be rebuilt with `node scripts/generate-portfolio-assets.mjs` after installing dependencies. The script uses the site's local fonts and shared experience / skills content. Review the resulting PDFs visually after content changes.

## Project pages

- [TaskFocus](https://simifar.github.io/porfolio.site/work/taskfocus/) - diploma project and task-planning app. [Open app](https://taskfocus-eight.vercel.app/) · [Source](https://github.com/Simifar/taskfocus)
- [MindTrack](https://simifar.github.io/porfolio.site/work/mindtrack/) - browser-based self-observation app. [Open app](https://simifar.github.io/mindtrack/) · [Source](https://github.com/Simifar/mindtrack)
- [CortexMap](https://simifar.github.io/porfolio.site/work/cortexmap/) - English-learning catalog. [Open site](https://simifar.github.io/CortexMap/) · [Source](https://github.com/Simifar/CortexMap)

Each project page is also available in Russian under `/ru/work/<project>/`. The site includes real project screenshots in its case pages.

## Built with

React, TypeScript, Vite, Tailwind CSS, and React Router. The project keeps its bilingual content in source files and generates static case pages for GitHub Pages.

## Run locally

Requires Node.js and npm.

```bash
npm ci
npm run dev
```

Vite prints the local development URL in the terminal.

## Build and checks

```bash
npm run typecheck
npm run build
npm run preview
```

The build writes the site to `dist/` and prepares GitHub Pages fallback files and English/Russian static project pages.

```bash
npm run test:e2e
```

End-to-end tests use Playwright and cover navigation, project pages, language and theme switching, responsive layouts, reduced motion and accessibility checks.

## Content and project structure

- `src/content/experience.ts` - work experience.
- `src/content/projects.ts` - project descriptions and case-study content.
- `src/content/i18n.ts` - interface copy in English and Russian.
- `src/components/` - site sections, navigation and project views.
- `src/components/arena/` - original technician mascot, equipment illustrations and selectable arena.
- `src/components/world/` - factual loadout filtering, tech lab and milestones.
- `src/content/world.ts` - bilingual world UI and factual skill classifications.
- `src/styles/arena.css` - light/dark tokens, arcade components and responsive rules.
- `docs/screenshots/arena/` - desktop and mobile previews of this alternative.
- `DESIGN.md` - current design direction, data integrity and accessibility decisions.
- `scripts/generate-case-pages.mjs` - static bilingual project-page generator.
- `public/projects/` - project screenshots used by the site.

## Verification

Install the test browser once with `npx playwright install --with-deps chromium`. Run `npm run lighthouse` for the repository's configured budgets. If Chromium is already installed, `CHROME_PATH=/path/to/chrome` selects it for Playwright and asset generators; Lighthouse also honors this variable.

The E2E suite includes axe checks, all case routes, static cases, real PDF responses, inventory keyboard/tap selection, workstation context, responsive EN/RU themes, reduced motion, clipboard and console errors.

## Release policy

Changes in `codex/brawl-stars-portfolio` are for comparison and review. **Do not merge or deploy to production without separate owner confirmation.**

## Publish

The repository is configured to publish through GitHub Actions at [simifar.github.io/porfolio.site](https://simifar.github.io/porfolio.site/). Enable **GitHub Actions** as the Pages build source in repository settings, then push changes to `master` or run the deployment workflow from the Actions tab.
