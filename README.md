# Egor Matafonov — Portfolio

A bilingual personal portfolio built with React, TypeScript, Vite, and Tailwind CSS. Project pages describe the published behavior and link to the corresponding source repositories. The portfolio does not claim unverified research, business results, or performance metrics.

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

The build output is written to `dist/`. The build script also creates the GitHub Pages 404 fallback and `.nojekyll` marker.

## Publish on GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the `master` branch. It uses `/porfolio.site/` as the project-site base path.

1. In the GitHub repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
2. Push the reviewed changes to `master`, or start **Deploy portfolio to GitHub Pages** from the Actions tab.
3. GitHub publishes the site at `https://simifar.github.io/porfolio.site/` after the workflow succeeds.

If the repository is renamed, update the base path in `vite.config.js` and the canonical, sitemap, and social-preview URLs in `index.html` and `public/robots.txt` / `public/sitemap.xml`.

## Content

- `src/content/projects.ts` contains the verified project descriptions, features, and links in English and Russian.
- `src/content/i18n.ts` contains the interface copy.
- `public/projects/` contains the screenshots used on the CortexMap and MindTrack project pages.
- Add a CV link only after a real, current PDF has been added to the repository.

## Routes

The site uses hash-based routing so project pages work on GitHub Pages without a server rewrite. Project pages are opened as `/#/work/<project-slug>`.
