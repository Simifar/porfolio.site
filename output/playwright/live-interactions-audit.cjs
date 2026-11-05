async page => {
  const base='https://simifar.github.io/porfolio.site/';
  await page.goto(base+'?lang=ru');
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Меню',exact:true}).click();
  await page.getByRole('navigation',{name:'Основная навигация',exact:true}).getByRole('link',{name:'Опыт',exact:true}).click();
  const nav={url:page.url(),expanded:await page.getByRole('button',{name:'Меню',exact:true}).getAttribute('aria-expanded'),sectionTop:await page.locator('#experience').evaluate(e=>Math.round(e.getBoundingClientRect().top))};
  await page.goto(base+'?lang=ru');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  const skip=await page.evaluate(()=>({id:document.activeElement.id,tag:document.activeElement.tagName}));
  await page.getByRole('button',{name:'Включить светлую тему'}).click();
  await page.reload();
  const preferences=await page.evaluate(()=>({lang:document.documentElement.lang,theme:document.documentElement.className}));
  await page.setViewportSize({width:1440,height:900});
  await page.getByRole('button',{name:'Открыть меню команд'}).click();
  const command=await page.getByRole('dialog',{name:'Меню команд'}).isVisible();
  await page.keyboard.press('Escape');
  const context=page.context();
  await context.grantPermissions(['clipboard-read','clipboard-write'],{origin:'https://simifar.github.io'});
  await page.locator('#contact').getByRole('button',{name:'Скопировать адрес почты'}).click();
  const copied=await page.evaluate(()=>navigator.clipboard.readText());
  const status=await page.getByRole('status').innerText();
  const staticChecks=[];
  for(const path of ['ru/work/taskfocus/','ru/work/mindtrack/','ru/work/cortexmap/']){
    await page.goto(base+path);
    await page.setViewportSize({width:320,height:900});
    await page.addScriptTag({path:'C:/Users/user/Documents/projects/porfolio.site/node_modules/axe-core/axe.min.js'});
    staticChecks.push({path,...await page.evaluate(async()=>({overflow:document.documentElement.scrollWidth>innerWidth,violations:(await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}))});
  }
  await page.goto(base+'?lang=ru');
  await page.setViewportSize({width:1440,height:900});
  return {nav,skip,preferences,command,copied,status,staticChecks};
}
