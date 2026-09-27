import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve('dist');
const applicationShell = await readFile(resolve(outputDirectory, 'index.html'), 'utf8');
const siteBase = process.env.PAGES_BASE_PATH === '/porfolio.site' ? '/porfolio.site/' : '/';
const fallbackRedirect = `<script>if (!window.location.hash) window.location.replace('${siteBase}#/not-found');</script>`;

// Send unknown host paths to the app's localized 404 route. Hash routes keep working as-is.
await writeFile(resolve(outputDirectory, '404.html'), applicationShell.replace('</head>', `${fallbackRedirect}</head>`));
await writeFile(resolve(outputDirectory, '.nojekyll'), '');

await import('./generate-case-pages.mjs');
