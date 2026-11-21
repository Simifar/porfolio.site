import { expect, test } from '@playwright/test';

for (const lang of ['en', 'ru']) {
  test(`tablet header controls remain reachable in ${lang}`, async ({ page }) => {
    for (const width of [768, 820, 1023]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/?lang=${lang}`);
      await page.evaluate(() => document.fonts.ready);
      const blocked = await page.locator('.site-header a, .site-header button').evaluateAll(nodes => nodes
        .filter(node => {
          const rect = node.getBoundingClientRect();
          if (!rect.width || !rect.height) return false;
          return document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)?.closest('a,button') !== node;
        })
        .map(node => node.getAttribute('aria-label') || node.textContent));
      expect(blocked, `Covered controls at ${width}px`).toEqual([]);
      const menu = page.getByRole('button', { name: lang === 'en' ? 'Menu' : 'Меню', exact: true });
      await expect(menu).toBeVisible();
      await menu.click();
      await expect(menu).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('#site-nav').getByRole('link')).toHaveCount(4);
      await page.keyboard.press('Escape');
      await expect(menu).toBeFocused();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
    }
  });
}

test('Back and Forward synchronize explicit URL language with visible content', async ({ page }) => {
  await page.goto('/?lang=en');
  await page.getByRole('article', { name: 'MindTrack' }).getByRole('link', { name: 'Project case' }).click();
  await page.getByRole('button', { name: 'Russian', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await page.goBack();
  await expect(page).toHaveURL(/\?lang=en$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('.hero-identity')).toContainText('Egor Matafonov');
  await page.goForward();
  await expect(page).toHaveURL(/\?lang=ru#\/work\/mindtrack$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
  await expect(page.getByRole('heading', { name: 'Решения проекта' })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('lang'))).toBe('ru');
});

test('case language alternates and Open Graph locale follow the current route', async ({ page }) => {
  for (const lang of ['en', 'ru']) {
    for (const slug of ['taskfocus', 'mindtrack', 'cortexmap']) {
      await page.goto(`/?lang=${lang}#/work/${slug}`);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      for (const alternate of ['en', 'ru', 'x-default']) {
        const locale = alternate === 'ru' ? 'ru/' : '';
        await expect(page.locator(`link[rel="alternate"][hreflang="${alternate}"]`)).toHaveAttribute(
          'href', `https://simifar.github.io/porfolio.site/${locale}work/${slug}/`,
        );
      }
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', lang === 'ru' ? 'ru_RU' : 'en_US');
    }
  }
  // Returning through the SPA must also restore the home language alternates.
  await page.locator('.back-link').click();
  await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute('href', 'https://simifar.github.io/porfolio.site/?lang=ru');
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute('href', 'https://simifar.github.io/porfolio.site/');
  await page.getByRole('button', { name: 'Английский', exact: true }).click();
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
});

test('project transitions name destination elements after React commits the case', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/?lang=en#/?section=work');
  const card = page.getByRole('article', { name: 'MindTrack' });
  await card.scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    const state = window as typeof window & { auditNames?: string[] };
    const start = document.startViewTransition.bind(document);
    document.startViewTransition = callback => {
      const transition = start(callback);
      transition.ready.then(() => {
        state.auditNames = [...document.querySelectorAll<HTMLElement>('[style*="view-transition-name"]')]
          .map(node => node.style.getPropertyValue('view-transition-name'));
      }).catch(() => {});
      return transition;
    };
  });
  await card.getByRole('link', { name: 'Project case' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('MindTrack');
  await expect.poll(() => page.evaluate(() => (window as typeof window & { auditNames?: string[] }).auditNames ?? [])).toContain('case-title');
  await expect(page.locator('[data-morph-scope="case"]')).toHaveAttribute('data-arrived', '');
  await expect.poll(() => page.locator('[style*="view-transition-name"]').count()).toBe(0);
});

test('static case decision labels fit narrow phones in both languages and themes', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  for (const lang of ['en', 'ru']) {
    for (const theme of ['light', 'dark']) {
      await page.goto('/');
      await page.evaluate(value => localStorage.setItem('theme', value), theme);
      for (const slug of ['taskfocus', 'mindtrack']) {
        await page.goto(`/${lang === 'ru' ? 'ru/' : ''}work/${slug}/`);
        await page.evaluate(() => document.fonts.ready);
        const overflowing = await page.locator('.preview-decisions dt, .preview-decisions dd').evaluateAll(nodes => nodes
          .filter(node => node.scrollWidth > node.clientWidth + 1)
          .map(node => node.textContent));
        expect(overflowing, `${lang}/${slug} in ${theme}`).toEqual([]);
      }
    }
  }
});
