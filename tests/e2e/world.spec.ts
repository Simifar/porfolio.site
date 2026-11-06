import { expect, test } from '@playwright/test';

// These assertions catch a decorative inventory/lab that does not expose actual information.
test('inventory supports keyboard, touch selection and a complete text alternative', async ({
  page,
}) => {
  await page.goto('/');
  const inventory = page.getByRole('region', { name: 'Technical inventory' });
  await expect(inventory).toBeVisible();
  const linux = inventory.getByRole('button', {
    name: 'Linux / Debian',
    exact: true,
  });
  await linux.focus();
  await page.keyboard.press('Enter');
  await expect(linux).toHaveAttribute('aria-pressed', 'true');
  await expect(inventory.locator('.inventory-detail')).toContainText(
    'Currently learning',
  );
  await expect(inventory.locator('.inventory-detail')).toContainText('Debian');
  await inventory
    .getByRole('button', { name: 'Windows Server & 1C', exact: true })
    .click();
  await expect(inventory.locator('.inventory-detail')).toContainText(
    'Practical exposure',
  );
  await inventory.getByText('View all skills as text', { exact: true }).click();
  await expect(inventory.locator('.inventory-text')).toBeVisible();
  await expect(inventory.locator('.inventory-text article')).toHaveCount(8);
});

test('workstation controls change the selected object and show factual context', async ({
  page,
}) => {
  await page.goto('/');
  const lab = page.getByRole('region', { name: 'Interactive tech lab' });
  await lab.getByRole('button', { name: 'Server', exact: true }).click();
  await expect(
    lab.getByRole('button', { name: 'Server', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await expect(lab.locator('.lab-detail')).toContainText('Practical exposure');
  await expect(lab.locator('.lab-detail')).toContainText('Windows Server');
  await lab.getByRole('button', { name: 'Terminal', exact: true }).focus();
  await page.keyboard.press('Space');
  await expect(lab.locator('.lab-detail')).toContainText('software projects');
  await expect(lab.locator('.lab-detail a')).toHaveAttribute(
    'href',
    'https://github.com/Simifar',
  );
});

for (const width of [320, 390, 768, 1440]) {
  test(`world fits ${width}px in both themes and languages`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['en', 'ru'])
      for (const theme of ['light', 'dark']) {
        await page.addInitScript(
          ({ lang, theme }) => {
            localStorage.setItem('lang', lang);
            localStorage.setItem('theme', theme);
          },
          { lang, theme },
        );
        await page.goto('/');
        await expect(
          page.locator('#inventory button[aria-pressed]'),
        ).toHaveCount(8);
        await expect(
          page.locator('#workstation button[aria-pressed]'),
        ).toHaveCount(5);
        await expect(page.locator('html')).toHaveAttribute('lang', lang);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBeTruthy();
        await page.locator('#inventory button[aria-pressed]').last().click();
        await page.locator('#workstation button[aria-pressed]').last().click();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBeTruthy();
      }
  });
}

test('desktop hero gives its copy and scene separate columns above the facts', async ({
  page,
}) => {
  await page.goto('/');
  const copy = await page.locator('.hero__copy').boundingBox();
  const scene = await page.locator('.hero-practice').boundingBox();
  const facts = await page.locator('.hero__proofs').boundingBox();
  expect(copy && scene && facts).toBeTruthy();
  expect(scene!.width).toBeGreaterThan(450);
  expect(scene!.x).toBeGreaterThanOrEqual(copy!.x + copy!.width);
  expect(facts!.y).toBeGreaterThanOrEqual(copy!.y + copy!.height);
  expect(facts!.y).toBeGreaterThanOrEqual(scene!.y + scene!.height);
});

test.describe('touchscreen inventory', () => {
  test.use({
    hasTouch: true,
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  });
  test('tapping a skill brings its explanation into view', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('button', { name: 'Linux / Debian', exact: true })
      .tap();
    await expect(page.locator('.inventory-detail')).toContainText(
      'Currently learning',
    );
    // scrollIntoView rounds to device pixels; IntersectionObserver may report
    // 0.999896 instead of 1 for a panel that is only 0.04px below the viewport.
    // Check full-panel bounds with a 1px rounding allowance, plus visible text.
    await expect(page.locator('.inventory-detail h3')).toBeInViewport({ ratio: 1 });
    await expect.poll(() => page.locator('.inventory-detail').evaluate(node => {
      const bounds = node.getBoundingClientRect();
      return bounds.top >= -1 && bounds.bottom <= window.innerHeight + 1;
    })).toBe(true);
  });
});

test('long Russian education and email controls stay inside their panels at 320px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto('/?lang=ru');
  const education = page.locator('#education-title');
  expect(
    await education.evaluate(
      (node) => node.scrollWidth <= node.clientWidth + 1,
    ),
  ).toBeTruthy();
  const contacts = await page.locator('.contact-layout').boundingBox();
  const copy = await page.locator('.contact-copy-button').boundingBox();
  expect(copy!.x + copy!.width).toBeLessThanOrEqual(
    contacts!.x + contacts!.width + 1,
  );
});
