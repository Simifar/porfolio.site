import { expect, test } from '@playwright/test';

test('loadout filters preserve honest skill status and always select a visible card', async ({
  page,
}) => {
  await page.goto('/');
  const inventory = page.locator('#inventory');
  await inventory
    .getByRole('radio', { name: 'Currently learning', exact: true })
    .check();
  await expect(inventory.locator('.inventory-slot')).toHaveCount(3);
  await expect(
    inventory.locator('.inventory-slot[aria-pressed="true"]'),
  ).toHaveCount(1);
  await inventory
    .getByRole('button', { name: 'Linux / Debian', exact: true })
    .click();
  await expect(inventory.locator('.inventory-detail')).toContainText(
    'Currently learning',
  );
  await inventory
    .getByRole('radio', { name: 'Practical exposure', exact: true })
    .check();
  await expect(inventory.locator('.inventory-slot')).toHaveCount(1);
  await expect(inventory.locator('.inventory-detail')).toContainText(
    'Windows Server',
  );
  await expect(inventory.locator('.inventory-detail')).toContainText(
    'Practical exposure',
  );
  await inventory
    .getByRole('radio', { name: 'All skills', exact: true })
    .check();
  await expect(inventory.locator('.inventory-slot')).toHaveCount(8);
  await inventory.getByText('View all skills as text', { exact: true }).click();
  await expect(inventory.locator('.inventory-text article')).toHaveCount(8);
});

test('Russian loadout filters support keyboard and fit a narrow phone', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?lang=ru');
  const learning = page.getByRole('radio', {
    name: 'Сейчас изучаю',
    exact: true,
  });
  await learning.focus();
  await page.keyboard.press('Space');
  await expect(learning).toBeChecked();
  await expect(page.locator('#inventory .inventory-slot')).toHaveCount(3);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBeTruthy();
});

test('static cases ship a local Cyrillic display font', async ({
  page,
  request,
}) => {
  const response = await request.get('/fonts/rubik-one.woff2');
  expect(response.ok()).toBeTruthy();
  const bytes = await response.body();
  expect(bytes.subarray(0, 4).toString()).toBe('wOF2');
  await page.goto('/ru/work/taskfocus/');
  expect(
    await page
      .locator('h1')
      .evaluate((node) => getComputedStyle(node).fontFamily),
  ).toContain('Rubik One');
});

test('arena equipment illustrations remain inside the map on desktop and phone', async ({
  page,
}) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const stage = await page.locator('.lab-scene-wrap').boundingBox();
    const icons = await page
      .locator('.arena-map .equipment-icon')
      .evaluateAll((nodes) =>
        nodes.map((node) => {
          const r = node.getBoundingClientRect();
          return { left: r.left, right: r.right, width: r.width };
        }),
      );
    expect(icons).toHaveLength(5);
    for (const icon of icons) {
      expect(icon.width).toBeLessThan(stage!.width / 4);
      expect(icon.left).toBeGreaterThanOrEqual(stage!.x - 1);
      expect(icon.right).toBeLessThanOrEqual(stage!.x + stage!.width + 1);
    }
  }
});

test('phone settings and arena controls have 44px touch targets', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/?lang=ru');
  for (const button of await page.locator('.theme-toggle, .language-toggle__button, .scene-hotspot').all()) {
    const box = await button.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});
