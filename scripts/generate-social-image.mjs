// Original social card, rendered from the same SVG scene used by the website.
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { chromium } from '@playwright/test';
const source = await readFile('src/components/world/WorkshopScene.tsx', 'utf8');
let { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
  },
});
for (const dependency of ['react/jsx-runtime', 'react'])
  outputText = outputText
    .replaceAll(
      `from "${dependency}"`,
      `from "${import.meta.resolve(dependency)}"`,
    )
    .replaceAll(
      `from '${dependency}'`,
      `from '${import.meta.resolve(dependency)}'`,
    );
const { default: WorkshopScene } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);
const scene = renderToStaticMarkup(
  createElement(WorkshopScene, { label: 'Original technical workshop' }),
);
const pixelFont = (
  await readFile('src/assets/fonts/pixelify-sans.ttf')
).toString('base64');
const sansFont = (
  await readFile('src/assets/fonts/ibm-plex-sans-latin.woff2')
).toString('base64');
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
});
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><style>
    @font-face{font-family:Pixel;src:url(data:font/ttf;base64,${pixelFont})} @font-face{font-family:Plex;src:url(data:font/woff2;base64,${sansFont})}
    *{box-sizing:border-box}body{margin:0;padding:38px 54px;background:#101713;color:#e9e7d9;font-family:Plex,Arial,sans-serif;background-image:radial-gradient(#78936922 .8px,transparent .8px);background-size:8px 8px}
    header{display:flex;justify-content:space-between;border-bottom:1px solid #344335;padding-bottom:18px;font:22px Pixel;letter-spacing:1px}header span{color:#a2d66b;font-size:16px}main{display:flex;align-items:center;height:458px}h1{font:94px/.8 Pixel;margin:15px 0 22px;letter-spacing:-4px}h1 span{color:#a2d66b}.copy{width:46%}.name{font-size:23px;margin:0 0 7px}.role{font-size:16px;color:#70cbb7;margin:0}svg{width:58%;margin-left:-2%}footer{display:flex;justify-content:space-between;border-top:1px solid #344335;padding-top:16px;font-size:14px;color:#b0bfaa}footer strong{color:#a2d66b}
    </style><header>EGOR.EXE <span>A TECH WORLD / 2026</span></header><main><div class="copy"><h1>BUILD.<br>FIX.<br><span>REPEAT.</span></h1><p class="name">Egor Matafonov</p><p class="role">IT Support & PC Hardware</p></div>${scene}</main><footer><span><strong>50+ PCs</strong> assembled & rebuilt</span><span>Technical graduate · 2026</span><span>simifar.github.io/porfolio.site</span></footer></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/og-image.png' });
} finally {
  await browser.close();
}
console.log('Generated original EGOR.EXE social card (1200 × 630).');
