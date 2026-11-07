// Original social card, rendered from the same SVG scene used by the website.
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { chromium } from '@playwright/test';
const source = await readFile('src/components/arena/TechMascot.tsx', 'utf8');
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
const { default: TechMascot } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);
const scene = renderToStaticMarkup(
  createElement(TechMascot, { label: 'Original repair-crew mascot' }),
);
const displayFont = (
  await readFile('src/assets/fonts/rubik-one.woff2')
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
    @font-face{font-family:Display;src:url(data:font/woff2;base64,${displayFont})} @font-face{font-family:Plex;src:url(data:font/woff2;base64,${sansFont})}
    *{box-sizing:border-box}body{margin:0;padding:38px 54px;background:#132654;color:#fffdf6;font-family:Plex,Arial,sans-serif;background-image:repeating-conic-gradient(from 5deg at 73% 44%,#ffffff05 0deg 10deg,transparent 10deg 28deg)}
    header{display:flex;justify-content:space-between;border-bottom:1px solid #10172e;padding-bottom:18px;font:22px Display;letter-spacing:1px}header span{color:#ffcf48;font-size:16px}main{display:flex;align-items:center;height:458px}h1{font:84px/.97 Display;margin:15px 0 22px;letter-spacing:-4px}h1 span{color:#ffcf48}.copy{width:46%}.name{font-size:23px;margin:0 0 7px}.role{font-size:16px;color:#80e9d3;margin:0}svg{width:58%;margin-left:-2%}footer{display:flex;justify-content:space-between;border-top:1px solid #10172e;padding-top:16px;font-size:14px;color:#d3def9}footer strong{color:#ffcf48}
    </style><header>EGOR.EXE <span>TECH ARENA / 2026</span></header><main><div class="copy"><h1>BUILD.<br>FIX.<br><span>REPEAT.</span></h1><p class="name">Egor Matafonov</p><p class="role">IT Support & PC Hardware</p></div>${scene}</main><footer><span><strong>50+ PCs</strong> assembled & rebuilt</span><span>Technical graduate · 2026</span><span>simifar.github.io/porfolio.site</span></footer></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/og-image.png' });
} finally {
  await browser.close();
}
console.log('Generated original EGOR.EXE social card (1200 × 630).');
