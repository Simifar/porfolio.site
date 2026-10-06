export interface Content {
  metadata: { title: string; description: string; projectTitleSuffix: string; projectOverviewSuffix: string; socialImageAlt: string };
  nav: {
    brand: string;
    work: string;
    experience: string;
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
    menu: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    supporting: string;
    proofsLabel: string;
    proofs: { value: string; label: string }[];
    cta: string;
    contactLink: string;
    visualAlt: string;
    visualTitle: string;
    visualSubtitle: string;
  };
  work: {
    title: string;
    subtitle: string;
    viewCase: string;
    viewOverview: string;
    repository: string;
    openProduct: string;
    additionalTitle: string;
    focusLabel: string;
  };
  experience: { title: string; subtitle: string; educationLabel: string; education: string };
  about: {
    title: string;
    practices: { title: string; detail: string; links: { to: string; label: string }[] }[];
  };
  contact: { title: string; subtitle: string; emailBtn: string; linkedinBtn: string; telegramBtn: string; copied: string };
  footer: { built: string; copyright: string; github: string; linkedin: string; telegram: string; email: string };
  caseStudy: {
    caseLabel: string;
    overviewLabel: string;
    back: string;
    problemTitle: string;
    alternativesTitle: string;
    roleTitle: string;
    constraintsTitle: string;
    scopeTitle: string;
    scopeIncluded: string;
    scopeCut: string;
    decisionsTitle: string;
    decisionProblem: string;
    decisionAlternative: string;
    decisionChoice: string;
    decisionReason: string;
    tradeoffLabel: string;
    galleryTitle: string;
    fullImage: string;
    deliveredTitle: string;
    statusTitle: string;
    validationTitle: string;
    successCriteriaTitle: string;
    nextValidationTitle: string;
    lessonsTitle: string;
    materialsTitle: string;
    projectDetails: string;
    whatItDoes: string;
    repository: string;
    liveSite: string;
    shareLink: string;
    ctaTitle: string;
    ctaText: string;
    nextProject: string;
  };
  notFound: { title: string; text: string; btn: string };
}

export const en: Content = {
  metadata: {
    title: 'Egor Matafonov | Product Manager portfolio',
    description: 'Egor Matafonov, Product Manager with a technical background: product/growth at B2B SaaS O!task, presale at Web Do, and two products shipped solo — TaskFocus and MindTrack.',
    projectTitleSuffix: 'Product case by Egor Matafonov',
    projectOverviewSuffix: 'Project overview by Egor Matafonov',
    socialImageAlt: 'Egor Matafonov, Product Manager. Selected work: TaskFocus and MindTrack.',
  },
  nav: {
    brand: 'Egor Matafonov',
    work: 'Projects', experience: 'Experience', about: 'Approach', contact: 'Contact', themeToLight: 'Switch to light theme', themeToDark: 'Switch to dark theme',
    language: 'Language', english: 'English', russian: 'Russian', mainNavigation: 'Main navigation', mobileNavigation: 'Mobile navigation',
    siteHome: 'Egor Matafonov, home', socialLinks: 'Social links', skipToContent: 'Skip to content', menu: 'Menu',
  },
  hero: {
    eyebrow: 'Egor Matafonov · Product Manager · open to remote roles',
    headline: 'Product Manager with a technical background — from discovery to a shipped product',
    supporting: 'At B2B SaaS O!task I prepared customer development, CJM, information architecture, a role matrix, business and financial models, and ran partnerships. I designed and shipped two web products on my own using AI agents.',
    proofsLabel: 'Key facts',
    proofs: [
      { value: '8 months', label: 'of product/growth in B2B SaaS' },
      { value: '10+', label: 'presale UX audits' },
      { value: '2 products', label: 'shipped solo' },
    ],
    cta: 'See case studies',
    contactLink: 'Contact me',
    visualAlt: 'TaskFocus Today dashboard with a five-task plan and a suggested next task.',
    visualTitle: 'TaskFocus',
    visualSubtitle: 'Real signed-in screen · Today list capped at five tasks',
  },
  work: {
    title: 'Selected work',
    subtitle: 'Two detailed cases and one project overview.',
    viewCase: 'Case study',
    viewOverview: 'Project overview',
    repository: 'Source code',
    openProduct: 'Open product',
    additionalTitle: 'Other projects',
    focusLabel: 'Key point',
  },
  experience: {
    title: 'Professional experience',
    subtitle: 'Product, presale and operational work in companies. Personal projects are shown separately below.',
    educationLabel: 'Education',
    education: 'Information Systems and Programming',
  },
  about: {
    title: 'How I work',
    practices: [
      {
        title: 'Start with the user and the process',
        detail: 'At O!task I prepared customer development and the CJM that the information architecture and key flows were built on.',
        links: [{ to: '/?section=experience', label: 'Experience at O!task' }],
      },
      {
        title: 'Turn decisions into artifacts for the team',
        detail: 'At O!task: information architecture, a role matrix and product documentation. At Web Do: UX audit and presale templates.',
        links: [{ to: '/?section=experience', label: 'Experience at O!task and Web Do' }],
      },
      {
        title: 'Take it all the way to a working product',
        detail: 'I set the product rules, designed the flows and shipped TaskFocus and MindTrack on my own using AI agents.',
        links: [
          { to: '/work/taskfocus', label: 'TaskFocus' },
          { to: '/work/mindtrack', label: 'MindTrack' },
        ],
      },
    ],
  },
  contact: {
    title: 'I’m looking for a remote Product Manager role.',
    subtitle: 'I can walk you through my artifacts and the reasoning behind decisions on a call. Email is the easiest way to reach me; more about my background is on LinkedIn.',
    emailBtn: 'Send email',
    linkedinBtn: 'View LinkedIn',
    telegramBtn: 'Telegram',
    copied: 'Copied!',
  },
  footer: { built: 'Made by Egor Matafonov', copyright: '© {year} Egor Matafonov', github: 'GitHub', linkedin: 'LinkedIn', telegram: 'Telegram', email: 'Email' },
  caseStudy: {
    caseLabel: 'Product case',
    overviewLabel: 'Project overview',
    back: 'Back to projects',
    problemTitle: 'Problem',
    alternativesTitle: 'Why not existing tools',
    roleTitle: 'What I did',
    constraintsTitle: 'Constraints',
    scopeTitle: 'MVP scope',
    scopeIncluded: 'Included',
    scopeCut: 'Left out',
    decisionsTitle: 'Product decisions',
    decisionProblem: 'Problem',
    decisionAlternative: 'Alternative',
    decisionChoice: 'Chosen solution',
    decisionReason: 'Why this option',
    tradeoffLabel: 'Trade-off',
    galleryTitle: 'Inside the product',
    fullImage: 'Open full-size image',
    deliveredTitle: 'What I built',
    statusTitle: 'Current status',
    validationTitle: 'What was tested',
    successCriteriaTitle: 'Success criteria',
    nextValidationTitle: 'What to test next',
    lessonsTitle: 'What I would do differently',
    materialsTitle: 'Project links',
    projectDetails: 'Project details',
    whatItDoes: 'Features',
    repository: 'Source code',
    liveSite: 'Open product',
    shareLink: 'Shareable page',
    ctaTitle: 'Discuss a role?',
    ctaText: 'If you are hiring a Product Manager, email me: on a call I can walk you through this project and the decisions behind it.',
    nextProject: 'Next project',
  },
  notFound: { title: '404', text: 'This page does not exist.', btn: 'Back to portfolio' },
};

export const ru: Content = {
  metadata: {
    title: 'Егор Матафонов | портфолио Product Manager',
    description: 'Егор Матафонов, Product Manager с техническим бэкграундом: product/growth в B2B SaaS O!task, presale в Web Do и два продукта, выпущенных в одиночку, — TaskFocus и MindTrack.',
    projectTitleSuffix: 'Продуктовый кейс Егора Матафонова',
    projectOverviewSuffix: 'Обзор проекта Егора Матафонова',
    socialImageAlt: 'Егор Матафонов, Product Manager. Избранные проекты TaskFocus и MindTrack.',
  },
  nav: {
    brand: 'Егор Матафонов',
    work: 'Проекты', experience: 'Опыт', about: 'Подход', contact: 'Контакты', themeToLight: 'Включить светлую тему', themeToDark: 'Включить тёмную тему',
    language: 'Язык', english: 'Английский', russian: 'Русский', mainNavigation: 'Основная навигация', mobileNavigation: 'Мобильная навигация',
    siteHome: 'Егор Матафонов, главная', socialLinks: 'Ссылки на профили', skipToContent: 'Перейти к содержимому', menu: 'Меню',
  },
  hero: {
    eyebrow: 'Егор Матафонов · Product Manager · открыт к удалённой работе',
    headline: 'Продакт с техническим бэкграундом — от CustDev и CJM до запущенного продукта',
    supporting: 'В B2B SaaS O!task готовил CustDev, CJM, информационную архитектуру, матрицу ролей, бизнес- и финансовую модель, вёл партнёрства. Два собственных веб-продукта спроектировал и выпустил сам с помощью AI-агентов.',
    proofsLabel: 'Ключевые факты',
    proofs: [
      { value: '8 мес.', label: 'product/growth в B2B SaaS' },
      { value: '10+', label: 'UX-аудитов для presale' },
      { value: '2 продукта', label: 'запущены в одиночку' },
    ],
    cta: 'Смотреть кейсы',
    contactLink: 'Написать',
    visualAlt: 'Раздел «Сегодня» TaskFocus с планом из пяти задач и рекомендацией следующей задачи.',
    visualTitle: 'TaskFocus',
    visualSubtitle: 'Реальный экран после входа · в «Сегодня» не больше пяти задач',
  },
  work: {
    title: 'Избранные проекты',
    subtitle: 'Два подробных кейса и обзор ещё одного проекта.',
    viewCase: 'Разбор проекта',
    viewOverview: 'Обзор проекта',
    repository: 'Исходный код',
    openProduct: 'Открыть продукт',
    additionalTitle: 'Другие проекты',
    focusLabel: 'Главное',
  },
  experience: {
    title: 'Опыт работы',
    subtitle: 'Продуктовая, presale и операционная работа в компаниях. Личные проекты — отдельно ниже.',
    educationLabel: 'Образование',
    education: 'Информационные системы и программирование',
  },
  about: {
    title: 'Как я работаю',
    practices: [
      {
        title: 'Начинаю с пользователя и процесса',
        detail: 'В O!task готовил CustDev и CJM, на которых строились информационная архитектура и ключевые сценарии.',
        links: [{ to: '/?section=experience', label: 'Опыт в O!task' }],
      },
      {
        title: 'Превращаю решения в артефакты для команды',
        detail: 'В O!task — информационная архитектура, матрица ролей и документация. В Web Do — шаблоны UX-аудитов и presale-материалов.',
        links: [{ to: '/?section=experience', label: 'Опыт в O!task и Web Do' }],
      },
      {
        title: 'Довожу до работающего продукта',
        detail: 'Сам задаю продуктовую логику, проектирую сценарии и в одиночку выпустил TaskFocus и MindTrack с помощью AI-агентов.',
        links: [
          { to: '/work/taskfocus', label: 'TaskFocus' },
          { to: '/work/mindtrack', label: 'MindTrack' },
        ],
      },
    ],
  },
  contact: {
    title: 'Ищу удалённую работу Product Manager',
    subtitle: 'Могу показать артефакты и рассказать о решениях на звонке. Проще всего написать на почту; о моём опыте можно прочитать в LinkedIn.',
    emailBtn: 'Написать',
    linkedinBtn: 'Открыть LinkedIn',
    telegramBtn: 'Telegram',
    copied: 'Скопировано!',
  },
  footer: { built: 'Сайт сделал Егор Матафонов', copyright: '© {year} Егор Матафонов', github: 'GitHub', linkedin: 'LinkedIn', telegram: 'Telegram', email: 'Почта' },
  caseStudy: {
    caseLabel: 'Продуктовый кейс',
    overviewLabel: 'Обзор проекта',
    back: 'Назад к проектам',
    problemTitle: 'Проблема',
    alternativesTitle: 'Почему не готовые решения',
    roleTitle: 'Что я сделал',
    constraintsTitle: 'Ограничения',
    scopeTitle: 'Рамки MVP',
    scopeIncluded: 'Вошло',
    scopeCut: 'Не вошло',
    decisionsTitle: 'Продуктовые решения',
    decisionProblem: 'Проблема',
    decisionAlternative: 'Альтернатива',
    decisionChoice: 'Выбранное решение',
    decisionReason: 'Почему этот вариант',
    tradeoffLabel: 'Компромисс',
    galleryTitle: 'Экраны продукта',
    fullImage: 'Открыть изображение в полном размере',
    deliveredTitle: 'Что реализовал',
    statusTitle: 'Текущий статус',
    validationTitle: 'Что проверено',
    successCriteriaTitle: 'Критерии успеха',
    nextValidationTitle: 'Что проверить дальше',
    lessonsTitle: 'Что сделал бы иначе',
    materialsTitle: 'Ссылки на материалы',
    projectDetails: 'О проекте',
    whatItDoes: 'Функции',
    repository: 'Исходный код',
    liveSite: 'Открыть продукт',
    shareLink: 'Страница для ссылки',
    ctaTitle: 'Обсудим роль?',
    ctaText: 'Если вы ищете Product Manager, напишите на почту: на звонке расскажу об этом проекте и решениях за ним.',
    nextProject: 'Следующий проект',
  },
  notFound: { title: '404', text: 'Такой страницы нет.', btn: 'На главную' },
};
