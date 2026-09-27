# Egor Matafonov — Portfolio

A bilingual personal portfolio built with React, TypeScript, Vite, and Tailwind CSS. Company experience is separate from personal projects. Case pages describe real product decisions and link to source material; TaskFocus uses genuine signed-in screenshots from its repository.

## Run locally

```bash
npm ci
npm run dev
```

Vite prints the local URL after the development server starts.

## Build

```bash
npm run typecheck
npm run build
npm run preview
```

The build output is written to `dist/`. The build script also creates the GitHub Pages 404 fallback, `.nojekyll` marker, and bilingual static case pages from `src/content/projects.ts`.

## Automated checks

```bash
npm run test:e2e
npm run lighthouse
```

Playwright tests cover routes, navigation, English/Russian, both themes, 320/390 px screens, reduced motion, image loading, and axe-core accessibility. On Windows they launch a separate headless Chrome session without attaching to a personal browser profile. On Linux CI, install Chromium with `npx playwright install --with-deps chromium` first.

Lighthouse CI runs two mobile audits for the home page and the TaskFocus/MindTrack static cases. Reports stay in the ignored `.lighthouseci/` directory. If Chrome is not found on Windows, set `CHROME_PATH` to an installed Chrome executable before running the command. Baseline on the local pre-iteration build (27 September 2026): mobile home performance 0.96, accessibility/best practices/SEO 1.00, LCP 2.43 s, CLS 0.030; desktop scores 1.00. CI thresholds allow normal run variation: performance ≥0.90, other categories ≥0.95, LCP ≤3.5 s, TBT ≤300 ms, CLS ≤0.1. These are local lab measurements, not field metrics.

## Publish on GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` checks TypeScript, Playwright/axe and Lighthouse before building and deploying the `master` branch. Its final build uses `PAGES_BASE_PATH=/porfolio.site`.

1. In the GitHub repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
2. Push the reviewed changes to `master`, or start **Deploy portfolio to GitHub Pages** from the Actions tab.
3. GitHub publishes the site at `https://simifar.github.io/porfolio.site/` after the workflow succeeds.

If the repository is renamed, update the base path in `vite.config.js`, both build scripts, and the canonical, sitemap, and social-preview URLs in `index.html` and `public/robots.txt` / `public/sitemap.xml`.

## Content

- `src/content/projects.ts` contains the verified project descriptions, features, and links in English and Russian.
- `src/content/i18n.ts` contains the interface copy.
- `src/content/experience.ts` contains the supplied company experience, separate from the case projects.
- `public/projects/` contains real screenshots used on TaskFocus, MindTrack, and CortexMap pages.
- Add a CV link only after a real, current PDF has been added to the repository.

## Routes

The interactive site uses hash routes (`/#/work/<slug>`) so navigation works on GitHub Pages without server rewrites. Because URL fragments are not sent to the server, every hash route otherwise returns the homepage HTML to crawlers and link-preview bots. The build generates indexable English and Russian case pages at `/work/<slug>/` and `/ru/work/<slug>/` with unique canonical, Open Graph, Twitter and hreflang metadata. Each interactive case links to its shareable static page; both page types use the same project content.
