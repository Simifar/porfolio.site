import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

const output = resolve('dist');
const base = process.env.PAGES_BASE_PATH === '/porfolio.site' ? '/porfolio.site/' : '/';
const site = 'https://simifar.github.io/porfolio.site/';
const source = await readFile(resolve('src/content/projects.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { projects } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

const escape = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);
const bulletList = values => `<ul>${values.map(value => `<li>${escape(value)}</li>`).join('')}</ul>`;
const section = (heading, body) => `<section class="preview-section"><h2>${escape(heading)}</h2><div>${body}</div></section>`;
const asset = image => `${base}${image.src.replace(/^\/+/, '')}`;
const decisionItem = (decision, lang, l) => {
  const structured = Boolean(decision.problem || decision.alternative);
  const comparison = `<dl class="preview-decision-analysis">${decision.problem ? `<div><dt>${escape(l.problem)}</dt><dd>${escape(decision.problem[lang])}</dd></div>` : ''}${decision.alternative ? `<div><dt>${escape(l.alternative)}</dt><dd>${escape(decision.alternative[lang])}</dd></div>` : ''}</dl>`;
  const choice = `<h3><span class="preview-decision-label">${escape(l.choice)}</span>${escape(decision.title[lang])}</h3>`;
  const reasons = `<dl class="preview-decision-details"><div><dt>${escape(l.reason)}</dt><dd>${escape(decision.rationale[lang])}</dd></div>${decision.tradeoff ? `<div><dt>${escape(l.tradeoff)}</dt><dd>${escape(decision.tradeoff[lang])}</dd></div>` : ''}</dl>`;
  return `<li class="${structured ? 'preview-decision--structured' : 'preview-decision--compact'}">${structured ? `${comparison}<div class="preview-decision-choice">${choice}${reasons}</div>` : `${choice}${reasons}`}</li>`;
};

const labels = {
  en: {
    home: 'Portfolio', alternate: 'Русский', open: 'Open interactive case', openOverview: 'Open project overview', theme: 'Switch theme',
    source: 'Source code', live: 'Open product', task: 'The task', role: 'What I did',
    case: 'Product case', overview: 'Project overview', alternatives: 'Why not existing tools',
    problem: 'Problem', alternative: 'Alternative', choice: 'Chosen solution', reason: 'Why this option',
    constraints: 'Constraints', scope: 'MVP scope', included: 'Included', cut: 'Left out',
    decisions: 'Product decisions', tradeoff: 'Trade-off:',
    delivered: 'What I built', status: 'Current status', tested: 'What was tested',
    criteria: 'Success criteria', validation: 'What to test next', lessons: 'What I would do differently',
    materials: 'Project links', features: 'Features', gallery: 'Inside the product',
    email: 'Email', telegram: 'Telegram', linkedin: 'View LinkedIn',
    ctaTitle: 'Discuss a role?',
    ctaText: 'If you are hiring a Product Manager, email me: on a call I can walk you through this project and the decisions behind it.',
  },
  ru: {
    home: 'Портфолио', alternate: 'English', open: 'Открыть интерактивный кейс', openOverview: 'Открыть обзор проекта', theme: 'Сменить тему',
    source: 'Исходный код', live: 'Открыть продукт', task: 'Задача', role: 'Что я сделал',
    case: 'Продуктовый кейс', overview: 'Обзор проекта', alternatives: 'Почему не готовые решения',
    problem: 'Проблема', alternative: 'Альтернатива', choice: 'Выбранное решение', reason: 'Почему этот вариант',
    constraints: 'Ограничения', scope: 'Рамки MVP', included: 'Вошло', cut: 'Не вошло',
    decisions: 'Продуктовые решения', tradeoff: 'Компромисс:',
    delivered: 'Что реализовал', status: 'Текущий статус', tested: 'Что проверено',
    criteria: 'Критерии успеха', validation: 'Что проверить дальше', lessons: 'Что сделал бы иначе',
    materials: 'Ссылки на материалы', features: 'Функции', gallery: 'Экраны продукта',
    email: 'Почта', telegram: 'Telegram', linkedin: 'Открыть LinkedIn',
    ctaTitle: 'Обсудим роль?',
    ctaText: 'Если вы ищете Product Manager, напишите на почту: на звонке расскажу об этом проекте и решениях за ним.',
  },
};

function renderCase(project, lang) {
  const l = labels[lang];
  const caseUrl = `${site}${lang === 'ru' ? 'ru/' : ''}work/${project.slug}/`;
  const enUrl = `${site}work/${project.slug}/`;
  const ruUrl = `${site}ru/work/${project.slug}/`;
  const alternateUrl = `${base}${lang === 'ru' ? '' : 'ru/'}work/${project.slug}/`;
  const appUrl = `${base}#/work/${project.slug}`;
  const pageType = project.caseStudy ? l.case : l.overview;
  const openLabel = project.caseStudy ? l.open : l.openOverview;
  const title = `${project.name} · ${lang === 'ru' ? `${pageType.toLowerCase()} Егора Матафонова` : `${pageType.toLowerCase()} by Egor Matafonov`}`;
  const description = project.description[lang];
  const screenshot = project.screenshot;
  const socialScreenshot = screenshot?.kind === 'concept' ? undefined : screenshot;
  const socialImage = socialScreenshot ? `${site}${socialScreenshot.src.replace(/^\/+/, '')}` : `${site}og-image.png`;
  const visual = screenshot ? `<figure class="preview-visual">${screenshot.kind === 'concept' ? `<figcaption class="preview-disclosure">${escape(screenshot.caption[lang])}</figcaption>` : ''}<img src="${escape(asset(screenshot))}" alt="${escape(screenshot.alt[lang])}" width="${screenshot.width}" height="${screenshot.height}" fetchpriority="high">${screenshot.kind !== 'concept' ? `<figcaption>${escape(screenshot.caption[lang])}</figcaption>` : ''}</figure>` : '';
  const gallery = project.gallery ? `<section class="preview-gallery" aria-label="${escape(l.gallery)}">${project.gallery.map(image => `<figure><img src="${escape(asset(image))}" alt="${escape(image.alt[lang])}" width="${image.width}" height="${image.height}" loading="lazy"><figcaption>${escape(image.caption[lang])}</figcaption></figure>`).join('')}</section>` : '';
  const study = project.caseStudy;
  const details = study ? [
    section(l.problem, `${study.problem ? `<p>${escape(study.problem[lang])}</p>` : ''}<p>${escape(study.context[lang])}</p>`),
    study.alternatives ? section(l.alternatives, `<p>${escape(study.alternatives[lang])}</p>`) : '',
    section(l.role, `<p>${escape(study.role[lang])}</p><h3>${escape(l.constraints)}</h3>${bulletList(study.constraints.map(item => item[lang]))}`),
    study.scope ? section(l.scope, `<h3>${escape(l.included)}</h3>${bulletList(study.scope.included.map(item => item[lang]))}${study.scope.cut ? `<h3>${escape(l.cut)}</h3>${bulletList(study.scope.cut.map(item => item[lang]))}` : ''}`) : '',
    section(l.decisions, `<ol class="preview-decisions">${study.decisions.map(decision => decisionItem(decision, lang, l)).join('')}</ol>`),
    gallery,
    section(l.delivered, bulletList(study.delivered.map(item => item[lang]))),
    section(l.status, `${study.validation ? `<h3>${escape(l.tested)}</h3><p>${escape(study.validation[lang])}</p>` : ''}<p>${escape(study.status[lang])}</p>`),
    study.successCriteria
      ? section(l.criteria, `${bulletList(study.successCriteria.map(item => item[lang]))}<h3>${escape(l.validation)}</h3><p>${escape(study.nextValidation[lang])}</p>`)
      : section(l.validation, `<p>${escape(study.nextValidation[lang])}</p>`),
    study.lessons ? section(l.lessons, bulletList(study.lessons.map(item => item[lang]))) : '',
    study.materials.length ? section(l.materials, `<ul>${study.materials.map(material => `<li><a href="${escape(material.href)}">${escape(material.label[lang])}</a></li>`).join('')}</ul>`) : '',
  ].join('') : section(l.features, bulletList(project.features.map(item => item[lang])));
  const cta = `<section class="preview-cta" aria-labelledby="cta-title"><h2 id="cta-title">${escape(l.ctaTitle)}</h2><div><p>${escape(l.ctaText)}</p><div class="preview-cta-actions"><a class="preview-cta-primary" href="mailto:Matafonovegor2@gmail.com">Matafonovegor2@gmail.com</a><a class="preview-cta-secondary" href="https://www.linkedin.com/in/egor-matafonov-764620300/?locale=en-US" target="_blank" rel="noopener noreferrer">${escape(l.linkedin)} ↗</a></div></div></section>`;

  return `<!doctype html>
<html lang="${lang}"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="author" content="Egor Matafonov">
<link rel="canonical" href="${caseUrl}"><link rel="alternate" hreflang="en" href="${enUrl}"><link rel="alternate" hreflang="ru" href="${ruUrl}"><link rel="alternate" hreflang="x-default" href="${enUrl}">
<link rel="stylesheet" href="${base}case-preview.css"><link rel="icon" type="image/svg+xml" href="${base}favicon.svg">
<meta property="og:type" content="article"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${caseUrl}">
<meta property="og:image" content="${socialImage}"><meta property="og:image:width" content="${socialScreenshot?.width ?? 1200}"><meta property="og:image:height" content="${socialScreenshot?.height ?? 630}"><meta property="og:image:alt" content="${escape(socialScreenshot?.alt[lang] ?? 'Egor Matafonov Product Manager portfolio')}"><meta property="og:locale" content="${lang === 'ru' ? 'ru_RU' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${socialImage}">
<script>try{document.documentElement.className=localStorage.getItem('theme')==='dark'?'dark':'light'}catch{}</script>
</head><body>
<header class="preview-header"><div class="shell"><a href="${base}">${escape(l.home)} / Egor Matafonov</a><nav aria-label="${lang === 'ru' ? 'Навигация' : 'Navigation'}"><a href="mailto:Matafonovegor2@gmail.com">${escape(l.email)} · Matafonovegor2@gmail.com</a><a href="https://t.me/legionanstek" target="_blank" rel="noopener noreferrer">${escape(l.telegram)} · @legionanstek</a><a href="${alternateUrl}">${escape(l.alternate)}</a><button type="button" id="theme-switch">${escape(l.theme)}</button></nav></div></header>
<main class="shell"><div class="preview-hero"><p class="preview-kicker">${escape(pageType)} · ${escape(project.category[lang])}</p><h1>${escape(project.name)}</h1><p class="preview-intro">${escape(description)}</p><div class="preview-links"><a href="${appUrl}" id="interactive-case">${escape(openLabel)} ↗</a><a href="${escape(project.github)}">${escape(l.source)} ↗</a>${project.live ? `<a href="${escape(project.live)}">${escape(l.live)} ↗</a>` : ''}</div></div>
${visual}${details}${cta}</main>
<footer class="preview-footer"><div class="shell">© Egor Matafonov · <a href="${base}">${escape(l.home)}</a></div></footer>
<script>document.getElementById('theme-switch').addEventListener('click',()=>{const dark=document.documentElement.classList.toggle('dark');document.documentElement.classList.toggle('light',!dark);try{localStorage.setItem('theme',dark?'dark':'light')}catch{}});document.getElementById('interactive-case').addEventListener('click',()=>{try{localStorage.setItem('lang','${lang}')}catch{}})</script>
</body></html>`;
}

for (const project of projects) {
  for (const lang of ['en', 'ru']) {
    const directory = resolve(output, lang === 'ru' ? 'ru' : '', 'work', project.slug);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), renderCase(project, lang));
  }
}
