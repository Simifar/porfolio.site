async (page) => {
  const base = 'https://simifar.github.io/porfolio.site/';
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const results = [];
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const lang of ['ru', 'en']) {
      await page.goto(base + '?lang=' + lang);
      for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => { localStorage.setItem('theme', theme); }, theme);
        await page.reload();
        await page.locator('h1').waitFor();
        await page.evaluate(async () => { await document.fonts.ready; });
        results.push(await page.evaluate(({width,lang,theme}) => ({width,lang,theme,overflow:document.documentElement.scrollWidth>innerWidth,actualLang:document.documentElement.lang,actualTheme:document.documentElement.className,h1:document.querySelector('h1').textContent,heroHeight:Math.round(document.querySelector('#hero').getBoundingClientRect().height),pageHeight:document.documentElement.scrollHeight,ctaTop:Math.round(document.querySelector('.hero__actions').getBoundingClientRect().top),badImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src)}), {width,lang,theme}));
      }
    }
  }
  await page.goto(base + '?lang=ru');
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Меню',exact:true}).click();
  const mobileMenu = {expanded:await page.getByRole('button',{name:'Меню',exact:true}).getAttribute('aria-expanded'), links:await page.getByRole('navigation',{name:'Основная навигация',exact:true}).innerText()};
  await page.keyboard.press('Escape');
  await page.screenshot({path:'output/playwright/live-home-ru-dark-mobile.png'});
  return {results,mobileMenu,errors};
}
