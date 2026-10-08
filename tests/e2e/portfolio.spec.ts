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

test('project cards lead with the case link and keep source code secondary', async ({ page }) => {
  await page.goto('/');
  for (const name of ['TaskFocus', 'MindTrack', 'CortexMap']) {
    const card = page.getByRole('article', { name });
    const links = card.getByRole('link');
    await expect(links.first()).toHaveText(name === 'CortexMap' ? 'Project overview' : 'Case study');
    await expect(links.last()).toHaveText('Source code');
    const [primary, source] = await Promise.all([links.first(), links.last()].map(link => link.evaluate(element => {
      const style = getComputedStyle(element);
      return { size: parseFloat(style.fontSize), weight: Number(style.fontWeight), border: style.borderTopWidth };
    })));
    expect(primary.size).toBeGreaterThan(source.size);
    expect(primary.weight).toBeGreaterThan(source.weight);
    expect(primary.border).not.toBe('0px');
  }
  await expect(page.getByRole('article', { name: 'CortexMap' })).not.toContainText('GitHub Pages');
  await page.goto('/#/work/cortexmap');
  await expect(page.locator('.case-tags')).not.toContainText('Next.js');
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
    await expect(page.locator('img[src$="mindtrack-cover.webp"]')).toHaveCount(1);
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

test('?lang= in the URL opens that language, wins over the saved one, and follows the toggle', async ({ page }) => {
  await page.goto('/?lang=ru');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByRole('heading', { name: 'Ищу удалённую работу Product Manager' })).toBeAttached();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://simifar.github.io/porfolio.site/?lang=ru');
  await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute('href', 'https://simifar.github.io/porfolio.site/?lang=ru');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', 'https://simifar.github.io/porfolio.site/');

  await page.getByRole('button', { name: 'Английский' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(new URL(page.url()).searchParams.get('lang')).toBe('en');

  await page.getByRole('article', { name: 'MindTrack' }).getByRole('link', { name: 'Case study' }).click();
  await expect(page).toHaveURL(/\?lang=en#\/work\/mindtrack$/);
  await page.getByRole('button', { name: 'Russian' }).click();
  await expect(page).toHaveURL(/\?lang=ru#\/work\/mindtrack$/);
  await expect(page.getByRole('heading', { name: 'Продуктовые решения' })).toBeVisible();
  await page.getByRole('link', { name: 'Назад к проектам' }).click();
  await expect(page).toHaveURL(/\?lang=ru#\/\?section=work$/);

  await page.evaluate(() => localStorage.setItem('lang', 'ru'));
  await page.goto('/?lang=en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('all case routes load directly with covers and distinct canonical pages', async ({ page }) => {
  for (const slug of slugs) {
    await page.goto(`/#/work/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`/work/${slug}/$`));
    await expectNoHorizontalScroll(page);
    const mainImage = page.locator('.case-visual__image');
    if (await mainImage.count()) {
      await expect(mainImage).toHaveAttribute('src', new RegExp(`${slug}-cover\\.webp$`));
      await expect.poll(() => mainImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1600);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', new RegExp(`${slug}-cover\\.png$`));
    }
    await expect(page.getByRole('link', { name: 'Shareable page' })).toHaveAttribute('href', new RegExp(`/work/${slug}/$`));
  }

  await page.goto('/#/work/taskfocus');
  await expect(page.locator('.case-gallery img')).toHaveCount(4);
  for (const image of await page.locator('.case-gallery img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.getByText('Trade-off:', { exact: false }).first()).toBeVisible();
});

test('320 and 390 px layouts work in both languages and themes', async ({ page }) => {
  for (const width of [320, 375, 390]) {
    await page.setViewportSize({ width, height: 780 });
    await page.goto('/');
    await expectNoHorizontalScroll(page);
    expect(await page.locator('.site-header').evaluate(element => element.getBoundingClientRect().height)).toBeLessThanOrEqual(64);
    const menu = page.getByRole('button', { name: 'Menu' });
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(nav.getByRole('link')).toHaveCount(0);
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(nav.getByRole('link')).toHaveCount(4);
    await expectNoHorizontalScroll(page);
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(nav.getByRole('link', { name: 'Experience' })).toBeFocused();
    await nav.getByRole('link', { name: 'Projects' }).click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page).toHaveURL(/section=work/);
    await expect.poll(() => page.locator('#work').evaluate(element => Math.round(element.getBoundingClientRect().top))).toBeLessThan(200);
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
  await page.getByRole('button', { name: 'Menu' }).click();
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

test('scroll reveal shows every section once it is reached and never hides what is already on screen', async ({ page }) => {
  await page.goto('/');
  const hiddenOnScreen = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    .filter(element => element.getBoundingClientRect().top < window.innerHeight && element.dataset.revealed === undefined).length);
  expect(hiddenOnScreen).toBe(0);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('#contact [data-reveal]').evaluateAll(elements => elements.every(element => element.hasAttribute('data-revealed')))).toBeTruthy();
  await expect.poll(() => page.locator('#contact [data-reveal]').first().evaluate(element => getComputedStyle(element).opacity)).toBe('1');
});

test('reduced motion shows all content and the hero cover without animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.evaluate(() => document.querySelectorAll('[data-reveal]:not([data-revealed="instant"])').length)).toBe(0);
  expect(await page.locator('#hero').getAttribute('data-intro')).toBeNull();
  await expect(page.locator('.hero__image')).toHaveAttribute('src', /taskfocus-cover\.webp$/);
  await expect.poll(() => page.locator('.hero__image').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1600);
  await page.locator('#work').scrollIntoViewIfNeeded();
  expect(await page.locator('#work .project-image-frame').first().evaluate(element => getComputedStyle(element).clipPath)).toBe('none');
});

test('page transitions open the case at the top and release shared element names', async ({ page }) => {
  await page.goto('/?section=work');
  await page.getByRole('article', { name: 'TaskFocus' }).getByRole('link', { name: 'Case study' }).click();
  await expect(page).toHaveURL(/#\/work\/taskfocus/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TaskFocus');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect.poll(() => page.evaluate(() => document.documentElement.dataset.vt ?? null)).toBeNull();
  expect(await page.evaluate(() => document.querySelectorAll('[style*="view-transition-name"]').length)).toBe(0);
  await page.locator('.next-project__link').click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('MindTrack');
  await expect.poll(() => page.evaluate(() => document.querySelectorAll('[style*="view-transition-name"]').length)).toBe(0);
});

test('command menu opens from the keyboard, filters and opens a case', async ({ page }) => {
  await page.goto('/');
  const dialog = page.getByRole('dialog', { name: 'Command menu' });
  // The shortcut listener attaches after the app renders, which can trail the load event.
  await expect(page.getByRole('button', { name: 'Open command menu' })).toBeVisible();
  await expect(async () => {
    await page.keyboard.press('Control+k');
    await expect(dialog).toBeVisible({ timeout: 500 });
  }).toPass();
  await expect(dialog.getByRole('combobox')).toBeFocused();
  await page.keyboard.type('mindtrack');
  await expect(dialog.getByRole('option')).toHaveCount(1);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/work\/mindtrack/);
  await expect(dialog).toBeHidden();
  await page.keyboard.press('/');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowDown');
  await expect(dialog.getByRole('option', { selected: true })).toHaveText('Experience');
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('the copy button puts the email address on the clipboard and confirms it', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/#/?section=contact');
  await page.locator('#contact').getByRole('button', { name: 'Copy email address' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Email copied' })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('Matafonovegor2@gmail.com');
});

test('the TaskFocus case lets the reader try the five-task limit', async ({ page }) => {
  await page.goto('/#/work/taskfocus');
  const demo = page.getByRole('region', { name: 'Try the first decision' });
  await expect(demo).toContainText('This is not the TaskFocus app');
  await demo.getByRole('button', { name: 'Move to Today: Prepare the team demo' }).click();
  await expect(demo).toContainText('5 of 5 slots');
  await expect(demo.getByRole('button', { name: 'Move to Today: Update the onboarding doc' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(demo.getByRole('status')).toContainText('Today already has five tasks');
  await demo.getByRole('button', { name: 'Start over' }).click();
  await expect(demo).toContainText('4 of 5 slots');
  await page.goto('/#/work/mindtrack');
  await expect(page.locator('.limit-demo')).toHaveCount(0);
});

test('wide case pages show contents that follow the reader', async ({ page }) => {
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto('/#/work/taskfocus');
  const toc = page.getByRole('navigation', { name: 'On this page' });
  await expect(toc).toBeHidden();
  await page.locator('#case-decisions').scrollIntoViewIfNeeded();
  await expect(toc).toBeVisible();
  await expect(toc.locator('[aria-current="true"]')).toHaveText('Product decisions');
  await toc.getByRole('button', { name: 'Problem', exact: true }).click();
  await expect(page.locator('#case-problem h2')).toBeFocused();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(toc).toBeHidden();
});

test('sections re-rendered by a language switch still reveal when the reader reaches them', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Russian' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await page.locator('#about').scrollIntoViewIfNeeded();
  const items = page.locator('#about .practice-item');
  await expect(items).toHaveCount(3);
  await expect.poll(() => items.evaluateAll(elements => elements.every(element => element.hasAttribute('data-revealed')))).toBeTruthy();
  await expect.poll(() => items.evaluateAll(elements => elements.map(element => getComputedStyle(element).opacity).join())).toBe('1,1,1');
});

test('screenshots reveal when the reader scrolls back up to them', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  const frame = page.locator('#work .project-image-frame').first();
  // Jump past the projects without scrolling through them, then come back up
  // so the screenshot enters the screen from the top edge.
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await expect(frame).not.toHaveAttribute('data-revealed');
  await frame.evaluate(element => window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY + 160, behavior: 'instant' }));
  await expect(frame).toHaveAttribute('data-revealed', '');
  await expect.poll(() => frame.evaluate(element => getComputedStyle(element).opacity)).toBe('1');
});
