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
  experience: { title: string; subtitle: string };
  about: {
    title: string;
    practices: { title: string; detail: string; projects: { slug: string; label: string }[] }[];
  };
  contact: { title: string; subtitle: string; emailBtn: string; linkedinBtn: string; telegramBtn: string; copied: string };
  footer: { built: string; copyright: string; github: string; linkedin: string; telegram: string; email: string };
  caseStudy: {
    caseLabel: string;
    overviewLabel: string;
    back: string;
    contextTitle: string;
    roleTitle: string;
    constraintsTitle: string;
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
    nextValidationTitle: string;
    materialsTitle: string;
    projectDetails: string;
    whatItDoes: string;
    repository: string;
    liveSite: string;
    shareLink: string;
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
    siteHome: 'Egor Matafonov, home', socialLinks: 'Social links', skipToContent: 'Skip to content',
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
    subtitle: 'Two detailed cases and two project overviews.',
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
  },
  about: {
    title: 'How I work',
    practices: [
      {
        title: 'Make a product constraint visible',
        detail: 'TaskFocus sets a five-task cap; the right number remains an untested hypothesis.',
        projects: [{ slug: 'taskfocus', label: 'TaskFocus decision' }],
      },
      {
        title: 'Keep a result in context',
        detail: 'MindTrack shows method-specific limits; PSS-10, for example, has no universal cutoff.',
        projects: [{ slug: 'mindtrack', label: 'MindTrack result design' }],
      },
      {
        title: 'Carry decisions into implementation',
        detail: 'I set product rules, designed the flows and built both apps with AI-assisted coding.',
        projects: [
          { slug: 'taskfocus', label: 'TaskFocus' },
          { slug: 'mindtrack', label: 'MindTrack' },
        ],
      },
    ],
  },
  contact: {
    title: 'I’m looking for a Product Manager role.',
    subtitle: 'If you’re hiring, email is the easiest way to reach me. More about my background is on LinkedIn.',
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
    contextTitle: 'User scenario',
    roleTitle: 'What I did',
    constraintsTitle: 'Constraints',
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
    nextValidationTitle: 'What to test next',
    materialsTitle: 'Project links',
    projectDetails: 'Project details',
    whatItDoes: 'Features',
    repository: 'Source code',
    liveSite: 'Open product',
    shareLink: 'Shareable page',
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
    siteHome: 'Егор Матафонов, главная', socialLinks: 'Ссылки на профили', skipToContent: 'Перейти к содержимому',
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
    subtitle: 'Два подробных кейса и два обзора проектов.',
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
  },
  about: {
    title: 'Как я работаю',
    practices: [
      {
        title: 'Делаю ограничение видимым',
        detail: 'В TaskFocus на день можно выбрать до пяти задач; подходит ли такой лимит, ещё не проверено.',
        projects: [{ slug: 'taskfocus', label: 'Решение TaskFocus' }],
      },
      {
        title: 'Показываю результат в контексте',
        detail: 'MindTrack учитывает ограничения каждой методики: например, у PSS-10 нет универсального порога.',
        projects: [{ slug: 'mindtrack', label: 'Интерпретация MindTrack' }],
      },
      {
        title: 'Довожу решения до реализации',
        detail: 'Сам задаю продуктовую логику, проектирую сценарии и реализую приложения с помощью ИИ при написании кода.',
        projects: [
          { slug: 'taskfocus', label: 'TaskFocus' },
          { slug: 'mindtrack', label: 'MindTrack' },
        ],
      },
    ],
  },
  contact: {
    title: 'Ищу работу Product Manager',
    subtitle: 'Если в вашей команде открыта позиция Product Manager, напишите мне. О моём опыте можно прочитать в LinkedIn.',
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
    contextTitle: 'Пользовательский сценарий',
    roleTitle: 'Что я сделал',
    constraintsTitle: 'Ограничения',
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
    nextValidationTitle: 'Что проверить дальше',
    materialsTitle: 'Ссылки на материалы',
    projectDetails: 'О проекте',
    whatItDoes: 'Функции',
    repository: 'Исходный код',
    liveSite: 'Открыть продукт',
    shareLink: 'Страница для ссылки',
    nextProject: 'Следующий проект',
  },
  notFound: { title: '404', text: 'Такой страницы нет.', btn: 'На главную' },
};
