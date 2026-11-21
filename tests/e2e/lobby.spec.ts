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

test('the Russian lobby introduces Egor and leads directly to his projects and workshop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?lang=ru');
  const hero = page.locator('#hero');
  await expect(hero.getByRole('heading', { level: 1 })).toHaveText('Егор Матафонов');
  await expect(hero.getByText(/компьютерное оборудование/)).toBeInViewport();
  await expect(page.locator('main > section').nth(1)).toHaveAttribute('id', 'about');
  const navigation = hero.getByRole('navigation', { name: 'Разделы портфолио' });
  await navigation.getByRole('link', { name: /Проекты/ }).click();
  await expect(page).toHaveURL(/\?lang=ru#\/\?section=work$/);
  await expect(page.getByRole('heading', { name: 'Программные проекты' })).toBeInViewport();
  await navigation.getByRole('link', { name: /Мастерская/ }).click();
  await expect(page).toHaveURL(/\?lang=ru#\/\?section=workstation$/);
  await expect(page.locator('#workstation h2')).toBeInViewport();
});

test('turning Relay and selecting equipment use brief motion when enabled', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/?lang=en');
  const viewer = page.getByRole('region', { name: 'Relay figurine' });
  const figure = viewer.getByRole('img');
  const motion = (node: Element) => getComputedStyle(node).animationName;
  expect(await figure.evaluate(motion)).not.toBe('none');
  await viewer.getByRole('button', { name: 'Turn right' }).click();
  await expect(figure).toHaveAttribute('src', /view-1\.webp$/);
  expect(await figure.evaluate(motion)).not.toBe('none');

  const workshop = page.locator('#workstation');
  const animationStarted = workshop.locator('.lab-detail').evaluate(node => new Promise<string>(resolve => {
    node.addEventListener('animationstart', event => resolve((event as AnimationEvent).animationName), { once: true });
  }));
  await workshop.getByRole('button', { name: 'Server', exact: true }).click();
  await expect(workshop.locator('.lab-detail')).toContainText('Windows Server');
  expect(await animationStarted).toBe('gear-select');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await workshop.getByRole('button', { name: 'Terminal', exact: true }).click();
  await expect(workshop.locator('.lab-detail')).toContainText('software projects');
  expect(await workshop.locator('.lab-detail .equipment-icon').evaluate(motion)).toBe('none');
});
