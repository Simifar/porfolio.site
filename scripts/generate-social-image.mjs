// Rebuild the share image from the portfolio's own figure, landscape and local typefaces.
import { readFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

async function dataUrl(file, mime) {
  const bytes = await readFile(file);
  return `data:${mime};base64,${bytes.toString('base64')}`;
}
const [figure, landscape, displayFont, textFont] = await Promise.all([
  dataUrl('public/figures/relay/view-0.webp', 'image/webp'),
  dataUrl('public/figures/relay/relay-yard.svg', 'image/svg+xml'),
  dataUrl('src/assets/fonts/rubik-one.woff2', 'font/woff2'),
  dataUrl('src/assets/fonts/ibm-plex-sans-latin.woff2', 'font/woff2'),
]);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8"><style>
    @font-face { font-family: Display; src: url(${displayFont}); }
    @font-face { font-family: Plex; src: url(${textFont}); font-weight: 400 700; }
    * { box-sizing: border-box; }
    body { margin: 0; height: 630px; background: linear-gradient(95deg,#17152ded 0%,#201b39ed 32%,#34274b11 68%), url(${landscape}) center / cover, #211c3b; color: #fffcf1; font-family: Plex, sans-serif; }
    header, footer { position: absolute; left: 54px; right: 54px; display: flex; align-items: center; justify-content: space-between; }
    header { top: 39px; font: 24px Display; } header small { border-radius: 8px; padding: 9px 15px; background: #26213d; color: #9cf2d9; font: 600 17px Plex; }
    main { position: absolute; left: 54px; top: 138px; }
    h1 { margin: 0; transform: skew(-5deg) rotate(-2deg); transform-origin: left bottom; font: 78px/.98 Display; letter-spacing: -4px; text-shadow: 2px 6px #21172e; }
    h1 span { color: #ffd455; }
    .role { margin: 28px 0 0; color: #a2f5df; font: 600 21px Plex; }
    img { position: absolute; right: 44px; bottom: 88px; width: 480px; height: 480px; object-fit: contain; }
    footer { bottom: 33px; border-top: 2px solid #d7ceef80; padding-top: 17px; font-size: 18px; color: #fffbf2; } footer strong { color: #ffdb65; }
    </style><header>EGOR.EXE <small>PORTFOLIO</small></header><main><h1>EGOR<br><span>MATAFONOV</span></h1><p class="role">IT Support &amp; PC Hardware</p></main><img src="${figure}" alt="Relay, the workshop robot"><footer><span><strong>50+ PCs</strong> assembled and rebuilt</span><span>Information systems &amp; programming · 2026</span></footer></html>`);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map(image => image.decode()));
  });
  await page.screenshot({ path: 'public/og-image.png' });
} finally {
  await browser.close();
}
