import { expect, test } from '@playwright/test';

test('technical experience is the main entry point and precedes software projects', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const lang of ['en', 'ru']) {
    await page.goto(`/?lang=${lang}`);
    const cta = page.locator('#hero .button-primary');
    await expect(cta).toHaveAttribute('href', '#/?section=experience');
    await cta.click();
    await expect(page).toHaveURL(/section=experience/);
    const sections = await page.locator('main > section').evaluateAll(nodes => nodes.map(node => node.id));
    expect(sections.indexOf('about')).toBeLessThan(sections.indexOf('work'));
    await expect(page.locator('#experience')).toContainText('Windows Server');
    await expect(page.locator('#hero img')).toHaveCount(0);
  }
});

test('resume links resolve to real PDFs in both languages', async ({ page, request }) => {
  for (const lang of ['en', 'ru']) {
    await page.goto(`/?lang=${lang}`);
    const resume = page.locator('#contact a[download]');
    await expect(resume).toHaveCount(1);
    const href = await resume.getAttribute('href');
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
    await expect(page.locator('#contact')).toContainText(lang === 'ru' ? 'Екатеринбурге' : 'Yekaterinburg');
  }
});
