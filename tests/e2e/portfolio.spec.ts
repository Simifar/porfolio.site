import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const slugs = ['taskfocus', 'mindtrack', 'cortexmap'];

async function expectNoHorizontalScroll(page: import('@playwright/test').Page) {
  const widths = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(widths.content, `content ${widths.content}px, viewport ${widths.viewport}px`).toBeLessThanOrEqual(widths.viewport + 1);
}

test('home explains experience and projects, and case back returns to the project list', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });

  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Product Manager with a technical background');
  await expect(page.getByRole('heading', { name: 'Professional experience' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'O!task' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Web Do' })).toBeVisible();
  await expect(page.locator('#experience')).toContainText('as the basis for the information architecture and key user flows');
  await expect(page.locator('#experience')).toContainText('as the starting point for a presale conversation');
  await expect(page.getByRole('heading', { name: 'Information Systems and Programming' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'I’m looking for a remote Product Manager role.' })).toBeAttached();
  const approach = page.locator('#about');
  await expect(approach).not.toContainText('untested hypothesis');
  await expect(approach.getByRole('link', { name: 'Experience at O!task', exact: true })).toHaveAttribute('href', '#/?section=experience');
  await expect(approach.getByRole('link', { name: 'Experience at O!task and Web Do' })).toHaveAttribute('href', '#/?section=experience');
  await approach.getByRole('link', { name: 'Experience at O!task and Web Do' }).click();
  await expect.poll(() => page.locator('#experience').evaluate(element => Math.round(element.getBoundingClientRect().top))).toBeLessThan(200);
  await page.getByRole('link', { name: 'See case studies' }).click();
  await expect(page).toHaveURL(/section=work/);
  await expect.poll(() => page.locator('#work').evaluate(element => Math.round(element.getBoundingClientRect().top))).toBeLessThan(200);
  await expect(page.getByRole('article', { name: 'TaskFocus' }).getByRole('link', { name: 'Open product' })).toHaveAttribute('href', 'https://taskfocus-eight.vercel.app/');

  await page.getByRole('article', { name: 'TaskFocus' }).getByRole('link', { name: 'Case study' }).click();
  await expect(page).toHaveURL(/#\/work\/taskfocus/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TaskFocus');
  await expect(page.getByRole('img', { name: /Today dashboard/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open product' })).toHaveAttribute('href', 'https://taskfocus-eight.vercel.app/');
  await page.getByRole('link', { name: 'Back to projects' }).click();
  await expect(page).toHaveURL(/section=work/);
  await expect.poll(() => page.locator('#work').evaluate(element => Math.round(element.getBoundingClientRect().top))).toBeLessThan(200);
  expect(errors).toEqual([]);
});

test('hero shows role, proof points and primary CTA above the fold without duplicating MindTrack', async ({ page }) => {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 812 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const hero = page.locator('#hero');
    await expect(hero.getByText('Egor Matafonov · Product Manager · open to remote roles')).toBeInViewport();
    await expect(hero.getByRole('heading', { level: 1 })).toBeInViewport();
    await expect(hero.getByRole('list', { name: 'Key facts' }).getByRole('listitem')).toHaveCount(3);
    for (const item of await hero.getByRole('list', { name: 'Key facts' }).getByRole('listitem').all()) {
      await expect(item).toBeInViewport({ ratio: 1 });
    }
    await expect(hero.getByRole('link', { name: 'See case studies' })).toBeInViewport({ ratio: 1 });
    await expect(page.locator('img[src$="mindtrack-home.png"]')).toHaveCount(1);
  }
});

test('language and theme persist across routes and reload; keyboard skip link works', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();

  await page.getByRole('button', { name: 'Russian' }).click();
  await page.getByRole('button', { name: 'Включить светлую тему' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.locator('html')).toHaveClass(/light/);
  await expect(page.getByRole('heading', { name: 'Информационные системы и программирование' })).toBeAttached();
  await expect(page.getByRole('heading', { name: 'Ищу удалённую работу Product Manager' })).toBeAttached();
  await page.goto('/#/work/mindtrack');
  await expect(page.getByRole('heading', { name: 'Продуктовые решения' })).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.locator('html')).toHaveClass(/light/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/ru\/work\/mindtrack\/$/);
});

test('all case routes load directly with real images and distinct canonical pages', async ({ page }) => {
  for (const slug of slugs) {
    await page.goto(`/#/work/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/work/${slug}/$`));
    await expectNoHorizontalScroll(page);
    const mainImage = page.locator('.case-visual__image');
    if (await mainImage.count()) {
      await expect.poll(() => mainImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    }
    await expect(page.getByRole('link', { name: 'Shareable page' })).toHaveAttribute('href', new RegExp(`/work/${slug}/$`));
  }

  await page.goto('/#/work/taskfocus');
  await expect(page.locator('.case-gallery img')).toHaveCount(3);
  for (const image of await page.locator('.case-gallery img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.getByText('Trade-off:', { exact: false }).first()).toBeVisible();
});

test('320 and 390 px layouts work in both languages and themes', async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 780 });
    await page.goto('/');
    await expectNoHorizontalScroll(page);
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link')).toHaveCount(4);
    await page.getByRole('button', { name: 'Russian' }).click();
    await expectNoHorizontalScroll(page);
    await page.getByRole('button', { name: 'Включить светлую тему' }).click();
    await expectNoHorizontalScroll(page);
    for (const slug of slugs) {
      await page.goto(`/#/work/${slug}`);
      await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
      await expect(page.locator('html')).toHaveClass(/light/);
      await expectNoHorizontalScroll(page);
    }
    await page.goto('/');
    await page.getByRole('button', { name: 'Английский' }).click();
    await page.getByRole('button', { name: 'Switch to dark theme' }).click();
    await expectNoHorizontalScroll(page);
  }
});

test('every case renders on desktop and phone in both languages and themes', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');

  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['en', 'ru']) {
      for (const theme of ['light', 'dark']) {
        await page.evaluate(({ lang, theme }) => {
          localStorage.setItem('lang', lang);
          localStorage.setItem('theme', theme);
        }, { lang, theme });
        await page.reload();
        await page.goto('/');
        await expect(page.locator('html')).toHaveAttribute('lang', lang);
        await expect(page.locator('html')).toHaveClass(new RegExp(theme));
        await expect(page.getByRole('heading', { level: 1 })).toContainText(lang === 'en' ? 'Product Manager' : 'Продакт');
        await expectNoHorizontalScroll(page);
        for (const slug of slugs) {
          await page.goto(`/#/work/${slug}`);
          await expect(page.locator('html')).toHaveAttribute('lang', lang);
          await expect(page.locator('html')).toHaveClass(new RegExp(theme));
          await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
          await expectNoHorizontalScroll(page);
          const mainImage = page.locator('.case-visual__image');
          if (await mainImage.count()) {
            await expect.poll(() => mainImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
          }
        }
      }
    }
  }
  expect(errors).toEqual([]);
});

test('reduced motion keeps content and navigation available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  await expect(page.locator('.scroll-progress')).toBeHidden();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Experience' }).click();
  await expect(page.getByRole('heading', { name: 'Professional experience' })).toBeVisible();
  await expectNoHorizontalScroll(page);
});

test('product cases show the same problem-to-lessons sections in the SPA and static pages', async ({ page, request }) => {
  const required = {
    en: ['Problem', 'MVP scope', 'Success criteria'],
    ru: ['Проблема', 'Рамки MVP', 'Критерии успеха'],
  };
  for (const slug of ['taskfocus', 'mindtrack']) {
    for (const lang of ['en', 'ru'] as const) {
      await page.goto('/');
      await page.evaluate(language => localStorage.setItem('lang', language), lang);
      await page.goto(`/#/work/${slug}`);
      await page.reload();
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      const spaSections = await page.locator('.case-section__title').allTextContents();
      for (const heading of required[lang]) expect(spaSections).toContain(heading);
      expect(spaSections.some(heading => ['What I would do differently', 'Что сделал бы иначе', 'Success criteria', 'Критерии успеха'].includes(heading))).toBeTruthy();
      const html = await (await request.get(`/${lang === 'ru' ? 'ru/' : ''}work/${slug}/`)).text();
      const staticSections = [...html.matchAll(/<section class="preview-section"><h2>([^<]+)<\/h2>/g)].map(match => match[1]);
      expect(staticSections).toEqual(spaSections);
    }
  }
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('lang', 'en'));
  await page.goto('/#/work/taskfocus');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'What I would do differently' })).toBeVisible();
  await expect(page.locator('.case-section').first()).not.toContainText('not tested');
});

test('every case ends with an email-first CTA before the next project, in the SPA and static pages', async ({ page, request }) => {
  const cta = { en: 'Discuss a role?', ru: 'Обсудим роль?' };
  const linkedin = 'https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US';
  for (const slug of slugs) {
    for (const lang of ['en', 'ru'] as const) {
      await page.goto('/');
      await page.evaluate(language => localStorage.setItem('lang', language), lang);
      await page.goto(`/#/work/${slug}`);
      await page.reload();
      const region = page.getByRole('region', { name: cta[lang] });
      await expect(region).toBeVisible();
      const links = region.getByRole('link');
      await expect(links).toHaveCount(2);
      await expect(links.first()).toHaveAttribute('href', 'mailto:Matafonovegor2@gmail.com');
      await expect(links.nth(1)).toHaveAttribute('href', linkedin);
      expect(await page.evaluate(() => {
        const block = document.querySelector('.case-cta');
        const next = document.querySelector('.next-project');
        return Boolean(block && next && block.compareDocumentPosition(next) & Node.DOCUMENT_POSITION_FOLLOWING);
      })).toBeTruthy();

      const html = await (await request.get(`/${lang === 'ru' ? 'ru/' : ''}work/${slug}/`)).text();
      expect(html).toContain(`<h2 id="cta-title">${cta[lang]}</h2>`);
      expect(html).toMatch(/<section class="preview-cta"[^]*href="mailto:Matafonovegor2@gmail\.com"[^]*linkedin\.com\/in\/egor-matafonov[^]*<\/section><\/main>/);
    }
  }
});

test('static case pages expose indexable bilingual HTML and usable links', async ({ page, request }) => {
  for (const slug of slugs) {
    for (const locale of ['', 'ru/']) {
      const response = await request.get(`/${locale}work/${slug}/`);
      expect(response.ok()).toBeTruthy();
      const html = await response.text();
      expect(html).toContain(`<link rel="canonical" href="https://simifar.github.io/porfolio.site/${locale}work/${slug}/">`);
      expect(html).toContain('<meta property="og:title"');
      expect(html).toContain(`<h1>${slug === 'taskfocus' ? 'TaskFocus' : slug === 'mindtrack' ? 'MindTrack' : 'CortexMap'}</h1>`);
    }
  }
  await page.goto('/ru/work/taskfocus/');
  await expect(page.getByRole('heading', { name: 'Продуктовые решения' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Открыть продукт' })).toHaveAttribute('href', 'https://taskfocus-eight.vercel.app/');
  await page.getByRole('button', { name: 'Сменить тему' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByRole('link', { name: 'Открыть интерактивный кейс' }).click();
  await expect(page).toHaveURL(/#\/work\/taskfocus/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
});

for (const scenario of [
  { name: 'English dark home', url: '/', width: 1440, lang: 'en', theme: 'dark' },
  { name: 'Russian light home', url: '/', width: 320, lang: 'ru', theme: 'light' },
  { name: 'TaskFocus case', url: '/#/work/taskfocus', width: 390, lang: 'ru', theme: 'light' },
  { name: 'MindTrack case', url: '/#/work/mindtrack', width: 1440, lang: 'en', theme: 'dark' },
  { name: 'Russian dark static CortexMap page', url: '/ru/work/cortexmap/', width: 375, lang: 'ru', theme: 'dark' },
] as const) {
  test(`axe accessibility: ${scenario.name}`, async ({ page }) => {
    await page.setViewportSize({ width: scenario.width, height: 900 });
    await page.addInitScript(({ lang, theme }) => {
      localStorage.setItem('lang', lang);
      localStorage.setItem('theme', theme);
    }, { lang: scenario.lang, theme: scenario.theme });
    await page.goto(scenario.url);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.map(node => node.target),
    }))).toEqual([]);
  });
}
