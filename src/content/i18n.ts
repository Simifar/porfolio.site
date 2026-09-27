export interface Content {
  metadata: { title: string; description: string; projectTitleSuffix: string; socialImageAlt: string };
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
  hero: { eyebrow: string; headline: string; headlineAccent: string; supporting: string; cta: string; contactLink: string; visualAlt: string; visualTitle: string; visualSubtitle: string };
  work: {
    title: string;
    subtitle: string;
    viewCase: string;
    repository: string;
    openProduct: string;
    additionalTitle: string;
    focusLabel: string;
  };
  experience: { title: string; subtitle: string };
  about: {
    title: string;
    intro: string;
    practices: { title: string; detail: string; projects: { slug: string; label: string }[] }[];
  };
  contact: { title: string; subtitle: string; emailBtn: string; linkedinBtn: string; telegramBtn: string; copied: string };
  footer: { built: string; copyright: string; github: string; linkedin: string; telegram: string; email: string };
  caseStudy: {
    caseLabel: string;
    back: string;
    contextTitle: string;
    roleTitle: string;
    constraintsTitle: string;
    decisionsTitle: string;
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
    description: 'Egor Matafonov, Product Manager: experience at O!task and Web Do, plus TaskFocus and MindTrack product cases.',
    projectTitleSuffix: 'Product case by Egor Matafonov',
    socialImageAlt: 'Egor Matafonov, Product Manager. Selected work: TaskFocus and MindTrack.',
  },
  nav: {
    brand: 'Egor Matafonov',
    work: 'Projects', experience: 'Experience', about: 'Approach', contact: 'Contact', themeToLight: 'Switch to light theme', themeToDark: 'Switch to dark theme',
    language: 'Language', english: 'English', russian: 'Russian', mainNavigation: 'Main navigation', mobileNavigation: 'Mobile navigation',
    siteHome: 'Egor Matafonov, home', socialLinks: 'Social links', skipToContent: 'Skip to content',
  },
  hero: {
    eyebrow: 'Egor Matafonov / Product Manager',
    headline: 'Product Manager',
    headlineAccent: 'From problem framing to working software.',
    supporting: 'I make product decisions, design the user flows and build the apps myself.',
    cta: 'See the projects',
    contactLink: 'Contact me',
    visualAlt: 'MindTrack questionnaire catalog and home screen.',
    visualTitle: 'MindTrack',
    visualSubtitle: 'Published app · answers stay in your browser',
  },
  work: {
    title: 'Selected work',
    subtitle: 'Two detailed cases and two smaller projects.',
    viewCase: 'Case study',
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
    intro: 'TaskFocus and MindTrack show how I turn product rules into working apps.',
    practices: [
      {
        title: 'Set product rules',
        detail: 'TaskFocus has a five-task daily limit, inbox-first capture and flexible dates.',
        projects: [{ slug: 'taskfocus', label: 'TaskFocus case' }],
      },
      {
        title: 'Keep privacy and context clear',
        detail: 'MindTrack stores answers in the browser and shows scores alongside their range and limits.',
        projects: [{ slug: 'mindtrack', label: 'MindTrack case' }],
      },
      {
        title: 'Carry work through',
        detail: 'I handled product decisions, UX and implementation on both projects. AI tools helped me write code.',
        projects: [
          { slug: 'taskfocus', label: 'TaskFocus case' },
          { slug: 'mindtrack', label: 'MindTrack case' },
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
    back: 'Back to projects',
    contextTitle: 'The task',
    roleTitle: 'What I did',
    constraintsTitle: 'Constraints',
    decisionsTitle: 'Product decisions',
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
    description: 'Егор Матафонов, Product Manager: опыт в O!task и Web Do, продуктовые кейсы TaskFocus и MindTrack.',
    projectTitleSuffix: 'Продуктовый кейс Егора Матафонова',
    socialImageAlt: 'Егор Матафонов, Product Manager. Избранные проекты TaskFocus и MindTrack.',
  },
  nav: {
    brand: 'Егор Матафонов',
    work: 'Проекты', experience: 'Опыт', about: 'Подход', contact: 'Контакты', themeToLight: 'Включить светлую тему', themeToDark: 'Включить тёмную тему',
    language: 'Язык', english: 'Английский', russian: 'Русский', mainNavigation: 'Основная навигация', mobileNavigation: 'Мобильная навигация',
    siteHome: 'Егор Матафонов, главная', socialLinks: 'Ссылки на профили', skipToContent: 'Перейти к содержимому',
  },
  hero: {
    eyebrow: 'Егор Матафонов / Product Manager',
    headline: 'Product Manager',
    headlineAccent: 'Веду продукт от задачи до рабочего решения.',
    supporting: 'Сам принимаю продуктовые решения, продумываю сценарии и собираю приложения.',
    cta: 'Смотреть проекты',
    contactLink: 'Написать мне',
    visualAlt: 'Каталог опросников и главная страница MindTrack.',
    visualTitle: 'MindTrack',
    visualSubtitle: 'Опубликованное приложение · ответы остаются в браузере',
  },
  work: {
    title: 'Избранные проекты',
    subtitle: 'Два подробных кейса и ещё два проекта.',
    viewCase: 'Разбор проекта',
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
    intro: 'В TaskFocus и MindTrack видно, как я превращаю правила продукта в работающие приложения.',
    practices: [
      {
        title: 'Задаю правила продукта',
        detail: 'В TaskFocus есть лимит в пять задач на день, запись задачи до планирования и гибкие даты.',
        projects: [{ slug: 'taskfocus', label: 'Кейс TaskFocus' }],
      },
      {
        title: 'Учитываю приватность и контекст',
        detail: 'MindTrack хранит ответы в браузере и показывает балл вместе с диапазоном и ограничениями методики.',
        projects: [{ slug: 'mindtrack', label: 'Кейс MindTrack' }],
      },
      {
        title: 'Довожу работу до реализации',
        detail: 'В обоих проектах я сам принимал продуктовые решения, проектировал UX и реализовал приложения. ИИ помогал писать код.',
        projects: [
          { slug: 'taskfocus', label: 'Кейс TaskFocus' },
          { slug: 'mindtrack', label: 'Кейс MindTrack' },
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
    back: 'Назад к проектам',
    contextTitle: 'Задача',
    roleTitle: 'Что я сделал',
    constraintsTitle: 'Ограничения',
    decisionsTitle: 'Продуктовые решения',
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
