import { expect, test } from '@playwright/test';

test('the roster displays the chosen official artwork and the brawler’s moves', async ({ page }) => {
  await page.goto('/?lang=en');
  const guide = page.locator('#brawlers');
  await guide.scrollIntoViewIfNeeded();

  for (const [name, file, move] of [
    ['Spike', 'spike', 'cactus grenade'],
    ['Poco', 'poco', 'healing wave'],
    ['Nita', 'nita', 'Bruce'],
    ['El Primo', 'elprimo', 'flurry of punches'],
  ]) {
    const choice = guide.getByRole('radio', { name, exact: true });
    await choice.check();
    await expect(choice).toBeChecked();
    await expect(guide.getByRole('heading', { name, exact: true })).toBeVisible();
    await expect(guide.locator('#brawler-moves')).toContainText(move);
    const model = guide.locator('.brawler-guide__model');
    await expect(model).toHaveAttribute('src', new RegExp('/brawl-guide/' + file + '\\.webp$'));
    await expect.poll(() => model.evaluate((node: HTMLImageElement) => node.naturalHeight)).toBe(420);
  }

  const modes = guide.getByRole('list', { name: 'Game modes' });
  await expect(modes.getByRole('listitem')).toHaveCount(3);
  await expect(modes).toContainText('ten gems');
  await expect(modes).toContainText('two goals');
  await expect(modes).toContainText('two rounds');
  await expect(guide.getByRole('link', { name: 'Supercell’s Fan Content Policy' })).toHaveAttribute(
    'href',
    'https://supercell.com/en/fan-content-policy/',
  );
});

test('Russian roster supports arrow keys and 44px controls on a narrow phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?lang=ru');
  const guide = page.locator('#brawlers');
  await guide.getByRole('radio', { name: 'Спайк', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(guide.getByRole('radio', { name: 'Поко', exact: true })).toBeChecked();
  await expect(guide.getByRole('heading', { name: 'Поко', exact: true })).toBeVisible();
  await expect(guide.locator('#brawler-moves')).toContainText('восстанавливает здоровье');
  await expect(guide.getByRole('list', { name: 'Режимы игры' })).toContainText('Захват кристаллов');
  await expect(guide.getByRole('link', { name: 'Официальный сайт игры' })).toHaveAttribute(
    'href',
    'https://supercell.com/brawlstars/ru/',
  );
  for (const radio of await guide.getByRole('radio').all()) {
    const box = await radio.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  }
});

test('the brawler information survives an unavailable illustration', async ({ page }) => {
  await page.route('**/brawl-guide/nita.webp', (route) => route.abort());
  await page.goto('/?lang=en');
  const guide = page.locator('#brawlers');
  await guide.getByRole('radio', { name: 'Nita', exact: true }).check();
  await expect(guide.getByText('Artwork unavailable')).toBeVisible();
  await expect(guide.locator('#brawler-moves')).toContainText('Bruce');
  await guide.getByRole('radio', { name: 'Spike', exact: true }).check();
  await expect(guide.locator('.brawler-guide__model')).toBeVisible();
});

test('official character clips load after play and return to the poster', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', request => {
    if (request.url().endsWith('.webm')) requests.push(new URL(request.url()).pathname);
  });
  await page.goto('/?lang=en');
  const guide = page.locator('#brawlers');
  await guide.getByRole('radio', { name: 'Nita', exact: true }).check();
  const play = guide.getByRole('button', { name: 'Play animation — Nita', exact: true });
  await expect(play).toBeVisible();
  expect(requests).toEqual([]);
  await play.click();
  const video = guide.locator('video');
  await expect.poll(() => video.evaluate(node => node.currentTime)).toBeGreaterThan(0);
  expect(requests).toContain('/brawl-guide/nita.webm');
  await expect(video).toBeHidden();
  await expect(guide.locator('.brawler-guide__model')).toBeVisible();
  await expect(play).toBeFocused();
});
