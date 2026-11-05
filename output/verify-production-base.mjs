import { chromium, expect } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const base = 'http://127.0.0.1:4174/porfolio.site/';
const browser = await chromium.launch({ channel: 'chrome' });
const results = [];
const errors = [];
async function noOverflow(page) {
  const size = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
  expect(size[0]).toBeLessThanOrEqual(size[1] + 1);
}
try {
  for (const width of [320, 390, 768, 1440]) for (const lang of ['ru', 'en']) for (const theme of ['dark', 'light']) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(value => localStorage.setItem('theme', value), theme);
    await page.goto(`${base}?lang=${lang}`);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('html')).toHaveClass(new RegExp(theme));
    await page.evaluate(() => document.fonts.ready);
    await noOverflow(page);
    await expect(page.locator('#hero .button-primary')).toBeInViewport({ ratio: 1 });
    await expect(page.locator('#hero')).toContainText(lang === 'ru' ? 'Компьютеры, комплектующие' : 'PCs, components');
    if (lang === 'ru' && ((width === 1440 && theme === 'dark') || (width === 320 && theme === 'dark') || (width === 390 && theme === 'light'))) {
      await page.screenshot({ path: `output/playwright/support-home-${lang}-${width}-${theme}.png` });
    }
    await page.locator('#experience').scrollIntoViewIfNeeded();
    await expect(page.locator('.experience-practice')).toBeVisible();
    if (width === 1440 && lang === 'ru' && theme === 'dark') await page.screenshot({ path: 'output/playwright/support-experience-ru.png' });
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact a[download]')).toHaveAttribute('href', `/porfolio.site/resume/egor-matafonov-${lang}.pdf`);
    const pdf = await page.request.get(`${base}resume/egor-matafonov-${lang}.pdf`);
    expect(pdf.status()).toBe(200);
    expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
    await noOverflow(page);
    results.push({ page: 'home', width, lang, theme, ok: true });
    await page.close();
  }
  for (const slug of ['taskfocus', 'mindtrack', 'cortexmap']) for (const lang of ['ru', 'en']) for (const width of [320, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${base}?lang=${lang}#/work/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await noOverflow(page);
    for (const img of await page.locator('main img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate(node => node.naturalWidth)).toBeGreaterThan(0);
    }
    if (slug === 'taskfocus') {
      await expect(page.locator('main')).toContainText(lang === 'ru' ? '15 секундами' : '15-second');
    }
    await page.goto(`${base}${lang === 'ru' ? 'ru/' : ''}work/${slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await noOverflow(page);
    const link = page.locator('.preview-cta a[download]');
    await expect(link).toHaveAttribute('href', `/porfolio.site/resume/egor-matafonov-${lang}.pdf`);
    if (slug === 'taskfocus') await expect(page.locator('main')).toContainText(lang === 'ru' ? '15 секундами' : '15-second');
    results.push({ page: `spa+static/${slug}`, width, lang, ok: true });
    await page.close();
  }
  expect(errors).toEqual([]);
  const page = await browser.newPage();
  const response = await page.request.get(base);
  const html = await response.text();
  expect(html).toContain('og-image.png?v=20261105');
  expect(html).not.toContain('Product Manager');
  const og = await page.request.get(`${base}og-image.png?v=20261105`);
  expect(og.status()).toBe(200);
  const png = await og.body();
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
  await writeFile('output/production-base-results.json', JSON.stringify({ base, results, errors, og: '1200x630' }, null, 2));
  console.log(`Production base: ${results.length} scenarios passed; no page errors. PDFs and OG verified.`);
} finally { await browser.close(); }
