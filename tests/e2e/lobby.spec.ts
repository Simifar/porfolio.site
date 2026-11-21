import { expect, test } from '@playwright/test';

test('the phone lobby shows the figurine, supports a full turn, and loads the model on demand', async ({ page, request }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const requestedModels: string[] = [];
  page.on('request', resource => {
    if (resource.url().endsWith('.glb')) requestedModels.push(resource.url());
  });
  await page.goto('/?lang=en');
  const viewer = page.getByRole('region', { name: 'Relay figurine' });
  const figure = viewer.getByRole('img');
  await expect(figure).toBeInViewport({ ratio: 1 });
  await expect(figure).toHaveAttribute('src', /view-0\.webp$/);
  const next = viewer.getByRole('button', { name: 'Turn right' });
  // A large transparent frame must leave the rotation controls tappable.
  await next.click({ trial: true });
  await next.focus();
  for (let view = 1; view <= 8; view++) {
    await page.keyboard.press('Enter');
    await expect(figure).toHaveAttribute('src', new RegExp(`view-${view % 8}\\.webp$`));
    expect(await figure.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThanOrEqual(500);
  }
  await viewer.getByRole('button', { name: 'Turn left' }).click();
  await expect(figure).toHaveAttribute('src', /view-7\.webp$/);
  expect(requestedModels).toEqual([]);
  const download = viewer.getByRole('link', { name: /GLB/ });
  const file = await request.get((await download.getAttribute('href'))!);
  expect(file.ok()).toBe(true);
  const bytes = await file.body();
  expect(bytes.toString('ascii', 0, 4)).toBe('glTF');
  expect(bytes.readUInt32LE(4)).toBe(2);
  expect(bytes.readUInt32LE(8)).toBe(bytes.byteLength);
});

test('the lobby leads to the real brawler guide without leaving the Russian portfolio', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?lang=ru');
  await page.getByRole('region', { name: 'Фигурка «Реле»' }).getByRole('button', { name: 'Повернуть вправо' }).click();
  const guideLink = page.locator('#hero').getByRole('link', { name: /Бойцы Brawl Stars/ });
  await guideLink.click();
  await expect(page).toHaveURL(/\?lang=ru#\/\?section=brawlers$/);
  await expect(page.locator('#brawlers h2')).toBeInViewport();
});
