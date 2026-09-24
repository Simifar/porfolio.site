export interface Content {
  metadata: { title: string; description: string; projectTitleSuffix: string; socialImageAlt: string };
  nav: {
    work: string;
    about: string;
    contact: string;
    themeToLight: string;
    themeToDark: string;
    language: string;
    english: string;
    russian: string;
    mainNavigation: string;
    mobileNavigation: string;
    siteHome: string;
    socialLinks: string;
    skipToContent: string;
  };
  hero: { headline: string; headlineAccent: string; supporting: string; cta: string; contactLink: string; visualAlt: string; visualTitle: string; visualSubtitle: string };
  work: {
    title: string;
    subtitle: string;
    viewCase: string;
    repository: string;
    openProduct: string;
    additionalTitle: string;
    focusLabel: string;
  };
  statement: { line1: string; line2: string };
  about: { title: string; text: string[] };
  contact: { title: string; subtitle: string; emailBtn: string; linkedinBtn: string; telegramBtn: string; copied: string };
  footer: { built: string; copyright: string; github: string; linkedin: string; telegram: string; email: string };
  caseStudy: {
    caseLabel: string;
    back: string;
    contextTitle: string;
    roleTitle: string;
    constraintsTitle: string;
    decisionsTitle: string;
    deliveredTitle: string;
    statusTitle: string;
    nextValidationTitle: string;
    materialsTitle: string;
    projectDetails: string;
    whatItDoes: string;
    repository: string;
    liveSite: string;
    nextProject: string;
  };
  notFound: { title: string; text: string; btn: string };
}

export const en: Content = {
  metadata: {
    title: 'Egor Matafonov — Product Manager portfolio',
    description: 'Product cases by Egor Matafonov: problem framing, product decisions, UX and working software.',
    projectTitleSuffix: 'Product case by Egor Matafonov',
    socialImageAlt: 'Egor Matafonov, Product Manager — product cases in TaskFocus and MindTrack.',
  },
  nav: {
    work: 'Work', about: 'About', contact: 'Contact', themeToLight: 'Switch to light theme', themeToDark: 'Switch to dark theme',
    language: 'Language', english: 'English', russian: 'Russian', mainNavigation: 'Main navigation', mobileNavigation: 'Mobile navigation',
    siteHome: 'Egor Matafonov — home', socialLinks: 'Social links', skipToContent: 'Skip to content',
  },
  hero: {
    headline: 'Product Manager',
    headlineAccent: 'from idea to working product.',
    supporting: 'I shape product direction, design clear workflows and carry projects through to working software, with AI tools as part of delivery.',
    cta: 'Explore product work',
    contactLink: 'Get in touch',
    visualAlt: 'MindTrack screening questionnaire catalog, a published product.',
    visualTitle: 'MindTrack',
    visualSubtitle: 'Published product · answers stay in your browser',
  },
  work: {
    title: 'Selected work',
    subtitle: 'Two end-to-end product cases, plus other projects.',
    viewCase: 'Project case',
    repository: 'Source code',
    openProduct: 'Open product',
    additionalTitle: 'More projects',
    focusLabel: 'Product focus',
  },
  statement: {
    line1: 'Clear products start with a clear next step.',
    line2: 'TaskFocus caps the daily plan at five tasks. MindTrack keeps questionnaire answers in the browser.',
  },
  about: {
    title: 'How I work',
    text: [
      'I take independent digital products from problem framing to working software. I own the product decisions and UX, and build with AI tools as part of the process.',
      'My work focuses on making complex tasks easier to navigate, from planning a manageable day to keeping screening answers on the user’s device.',
    ],
  },
  contact: {
    title: 'Let’s talk about a Product Manager role.',
    subtitle: 'I’m exploring Product Manager opportunities. Email is the best way to reach me; LinkedIn has more about my background.',
    emailBtn: 'Email me',
    linkedinBtn: 'Connect on LinkedIn',
    telegramBtn: 'Telegram',
    copied: 'Copied!',
  },
  footer: { built: 'Designed & built by Egor Matafonov', copyright: '© {year} Egor Matafonov', github: 'GitHub', linkedin: 'LinkedIn', telegram: 'Telegram', email: 'Email' },
  caseStudy: {
    caseLabel: 'Product case',
    back: 'Back to portfolio',
    contextTitle: 'Context and task',
    roleTitle: 'My role',
    constraintsTitle: 'Constraints',
    decisionsTitle: 'Product decisions',
    deliveredTitle: 'What I built',
    statusTitle: 'Status and evidence',
    nextValidationTitle: 'What I would validate next',
    materialsTitle: 'Materials to inspect',
    projectDetails: 'Project details',
    whatItDoes: 'What it does',
    repository: 'Source code',
    liveSite: 'Open live site',
    nextProject: 'Next project',
  },
  notFound: { title: '404', text: 'This page is not part of the portfolio.', btn: 'Back to portfolio' },
};

export const ru: Content = {
  metadata: {
    title: 'Егор Матафонов — портфолио Product Manager',
    description: 'Продуктовые кейсы Егора Матафонова: формулировка задач, продуктовые решения, UX и работающие приложения.',
    projectTitleSuffix: 'Продуктовый кейс Егора Матафонова',
    socialImageAlt: 'Егор Матафонов, Product Manager — продуктовые кейсы TaskFocus и MindTrack.',
  },
  nav: {
    work: 'Проекты', about: 'Обо мне', contact: 'Контакт', themeToLight: 'Включить светлую тему', themeToDark: 'Включить тёмную тему',
    language: 'Язык', english: 'Английский', russian: 'Русский', mainNavigation: 'Основная навигация', mobileNavigation: 'Мобильная навигация',
    siteHome: 'Егор Матафонов — главная', socialLinks: 'Ссылки на профили', skipToContent: 'Перейти к содержимому',
  },
  hero: {
    headline: 'Product Manager',
    headlineAccent: 'от идеи до работающего продукта.',
    supporting: 'Определяю направление продукта, проектирую понятные сценарии и довожу проекты до работающего решения. ИИ использую как инструмент разработки.',
    cta: 'Смотреть продуктовые кейсы',
    contactLink: 'Связаться',
    visualAlt: 'Каталог скрининговых опросников MindTrack, опубликованный продукт.',
    visualTitle: 'MindTrack',
    visualSubtitle: 'Опубликованный продукт · ответы остаются в браузере',
  },
  work: {
    title: 'Избранные проекты',
    subtitle: 'Два проекта полного цикла и дополнительные работы.',
    viewCase: 'Кейс проекта',
    repository: 'Исходный код',
    openProduct: 'Открыть продукт',
    additionalTitle: 'Другие проекты',
    focusLabel: 'Продуктовый фокус',
  },
  statement: {
    line1: 'Продуктовое решение — сделать следующий шаг яснее.',
    line2: 'TaskFocus ограничивает план дня пятью задачами. MindTrack хранит ответы в браузере.',
  },
  about: {
    title: 'Как я работаю',
    text: [
      'Я самостоятельно веду цифровые продукты от формулировки задачи до работающего приложения. Продуктовые решения и UX делаю сам, а ИИ использую как инструмент разработки.',
      'В этих проектах я упрощаю сложные сценарии — от посильного плана на день до локального хранения ответов скрининговых опросников.',
    ],
  },
  contact: {
    title: 'Обсудим позицию Product Manager?',
    subtitle: 'Я рассматриваю предложения на эту роль. Удобнее всего написать на почту; в LinkedIn можно подробнее узнать о моём опыте.',
    emailBtn: 'Написать на почту',
    linkedinBtn: 'Связаться в LinkedIn',
    telegramBtn: 'Telegram',
    copied: 'Скопировано!',
  },
  footer: { built: 'Дизайн и разработка — Егор Матафонов', copyright: '© {year} Егор Матафонов', github: 'GitHub', linkedin: 'LinkedIn', telegram: 'Telegram', email: 'Почта' },
  caseStudy: {
    caseLabel: 'Продуктовый кейс',
    back: 'Назад к портфолио',
    contextTitle: 'Контекст и задача',
    roleTitle: 'Мой вклад',
    constraintsTitle: 'Ограничения',
    decisionsTitle: 'Продуктовые решения',
    deliveredTitle: 'Что реализовал',
    statusTitle: 'Статус и подтверждения',
    nextValidationTitle: 'Что проверил бы следующим',
    materialsTitle: 'Материалы для проверки',
    projectDetails: 'О проекте',
    whatItDoes: 'Что он делает',
    repository: 'Исходный код',
    liveSite: 'Открыть сайт',
    nextProject: 'Следующий проект',
  },
  notFound: { title: '404', text: 'Такой страницы нет в портфолио.', btn: 'Назад к портфолио' },
};
