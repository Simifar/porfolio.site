async (page) => {
  const base = 'https://simifar.github.io/porfolio.site/';
  const results = [];
  const errors = [];
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload();
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [320, 1440]) {
    await page.setViewportSize({width,height:900});
    for (const slug of ['taskfocus','mindtrack','cortexmap']) {
      const response = await page.goto(base + '?lang=ru#/work/' + slug);
      await page.waitForFunction(name => document.querySelector('h1')?.textContent === name, slug==='taskfocus'?'TaskFocus':slug==='mindtrack'?'MindTrack':'CortexMap');
      await page.evaluate(async () => { await document.fonts.ready; });
      for (const image of await page.locator('main img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(image => image.decode().catch(() => {}));
      }
      await page.evaluate(() => window.scrollTo({top:0,behavior:'instant'}));
      await page.addScriptTag({path:'C:/Users/user/Documents/projects/porfolio.site/node_modules/axe-core/axe.min.js'});
      const a11y = await page.evaluate(async () => {
        const r = await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});
        return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}));
      });
      results.push({width,slug,status:response?.status()??'same-document',...await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,missingImages:[...document.querySelectorAll('main img')].filter(i=>!i.naturalWidth).map(i=>i.src),title:document.title,height:document.documentElement.scrollHeight,cta:document.querySelector('.case-cta')?.textContent})),a11y});
      if (slug==='taskfocus'&&width===320) await page.screenshot({path:'output/playwright/live-taskfocus-mobile.png'});
    }
  }
  await page.goto(base+'?lang=ru');
  await page.setViewportSize({width:1440,height:900});
  await page.locator('#experience').scrollIntoViewIfNeeded();
  await page.screenshot({path:'output/playwright/live-experience-desktop.png'});
  await page.addScriptTag({path:'C:/Users/user/Documents/projects/porfolio.site/node_modules/axe-core/axe.min.js'});
  const homeA11y=await page.evaluate(async()=> (await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})));
  const wordCounts = await page.evaluate(()=>[...document.querySelectorAll('.experience-entry')].map(e=>({title:e.querySelector('h3')?.textContent,words:e.textContent.trim().split(/\s+/).length,height:Math.round(e.getBoundingClientRect().height)})));
  const links = [];
  for (const path of ['work/taskfocus/','ru/work/taskfocus/','ru/work/mindtrack/','ru/work/cortexmap/']) {
    const r = await page.request.get(base+path);
    const html=await r.text();
    links.push({path,status:r.status(),hasTechnicalCTA:html.includes('IT support')||html.includes('техническую работу'),hasPMCTA:html.includes('hiring a Product Manager'),title:html.match(/<title>(.*?)<\/title>/)?.[1]});
  }
  return {results,homeA11y,wordCounts,staticPages:links,errors};
}
