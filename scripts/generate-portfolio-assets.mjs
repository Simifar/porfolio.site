// Rebuild the typographic social image and bilingual resumes from local content.
// Run explicitly with: node scripts/generate-portfolio-assets.mjs
import { readFile, mkdir } from 'node:fs/promises';
import ts from 'typescript';
import { chromium } from '@playwright/test';

const readModule = async path => {
  const source = await readFile(path, 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
};
const [{ en, ru }, { experience }] = await Promise.all([readModule('src/content/i18n.ts'), readModule('src/content/experience.ts')]);
const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const font = async name => `data:font/woff2;base64,${(await readFile(`src/assets/fonts/${name}.woff2`)).toString('base64')}`;
const fontCSS = `@font-face{font-family:Plex;src:url('${await font('ibm-plex-sans-latin')}');font-weight:400 700;unicode-range:U+0000-00FF,U+2000-206F,U+2191,U+2193} @font-face{font-family:Plex;src:url('${await font('ibm-plex-sans-cyrillic')}');font-weight:400 700;unicode-range:U+0400-045F,U+2116}`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, channel: process.platform === 'win32' ? 'chrome' : undefined });
await mkdir('public/resume', { recursive: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const lang of ['ru', 'en']) {
    const t = lang === 'ru' ? ru : en;
    const labels = lang === 'ru' ? { name: 'Егор Матафонов', profile: 'Профиль', skills: 'Навыки и практика', experience: 'Опыт', education: 'Образование', projects: 'Программный проект', project: 'TaskFocus - самостоятельный дипломный проект, собранный с помощью AI-агентов. Планировщик с разделом «Входящие», лимитом в пять задач на день, авторизацией и документацией по архитектуре и запуску.', updated: 'Обновлено 5 ноября 2026' } : { name: 'Egor Matafonov', profile: 'Profile', skills: 'Skills and practice', experience: 'Experience', education: 'Education', projects: 'Software project', project: 'TaskFocus - a solo diploma project built with AI agents. A task planner with an inbox, a five-task daily cap, authentication, and architecture and setup documentation.', updated: 'Updated November 5, 2026' };
    const entries = experience.map(entry => `<article><h3>${escape(lang === 'en' && entry.company === 'УЦ «Потенциал»' ? 'Potencial Training Center' : entry.company)} <span>${escape(entry.period[lang])}</span></h3><p class="role">${escape(entry.role[lang])}</p><p>${escape(entry.work[lang])}</p>${entry.practice ? `<p>${escape(entry.practice.detail[lang])}</p>` : ''}<ul>${entry.outcomes.map(item => `<li>${escape(item[lang])}</li>`).join('')}</ul></article>`).join('');
    await page.setContent(`<!doctype html><html lang="${lang}"><meta charset="utf-8"><title>${labels.name} - ${t.hero.headline}</title><style>${fontCSS}
      @page{size:A4;margin:13mm 16mm}*{box-sizing:border-box}body{margin:0;font:9.5pt/1.38 Plex,Arial,sans-serif;color:#202624}h1{font-size:25pt;line-height:1.1;margin:0 0 4pt;letter-spacing:-.7pt}header{border-bottom:2pt solid #a33528;padding-bottom:9pt}.target{font-size:13pt;margin:0 0 5pt;font-weight:600}.format{font-weight:600}a{color:#202624;text-decoration:underline;text-underline-offset:2px}p{margin:4pt 0}h2{font-size:11pt;margin:11pt 0 5pt;color:#8d2e24}h3{font-size:10pt;margin:8pt 0 2pt}h3 span{float:right;font-weight:400;font-size:9pt}.role{font-weight:600;color:#4b554e;margin:0 0 4pt}ul{margin:3pt 0;padding-left:13pt}li{margin:2pt 0}article{break-inside:avoid}.skills li{margin:3pt 0}footer{border-top:1px solid #cdd2cb;margin-top:10pt;padding-top:5pt;font-size:8pt;color:#58605a}
    </style><header><h1>${labels.name}</h1><p class="target">${escape(t.hero.headline)}</p><p class="format">${escape(t.contact.workFormat)}</p><p><a href="mailto:Matafonovegor2@gmail.com">Matafonovegor2@gmail.com</a> · <a href="https://t.me/legionanstek">Telegram: @legionanstek</a></p><p><a href="https://simifar.github.io/porfolio.site/${lang === 'ru' ? '?lang=ru' : ''}">${lang === 'ru' ? 'Портфолио' : 'Portfolio'}</a> · <a href="https://github.com/Simifar">GitHub</a> · <a href="https://www.linkedin.com/in/egor-matafonov-764620300/">LinkedIn</a></p></header>
    <h2>${labels.skills}</h2><ul class="skills">${t.about.practices.map(item => `<li><strong>${escape(item.title)}.</strong> ${escape(item.detail)}</li>`).join('')}</ul>
    <h2>${labels.experience}</h2>${entries}<h2>${labels.education}</h2><p>${escape(t.experience.education)}</p>
    <h2>${labels.projects}</h2><p>${escape(labels.project)} <a href="https://github.com/Simifar/taskfocus">github.com/Simifar/taskfocus</a></p><footer>${labels.updated}</footer></html>`);
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: `public/resume/egor-matafonov-${lang}.pdf`, format: 'A4', printBackground: true, tagged: true });
  }
  await page.close();
} finally {
  await browser.close();
}
console.log('Generated og-image.png (1200×630) and RU/EN resume PDFs.');

await import('./generate-social-image.mjs');
