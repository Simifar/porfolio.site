export interface Content {
  nav: { work: string; about: string; contact: string; theme: string; language: string; palette: string };
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
  contact: { title: string; subtitle: string; emailBtn: string; telegramBtn: string; copied: string };
  footer: { built: string; copyright: string };
  commandPalette: {
    title: string;
    placeholder: string;
    empty: string;
    actions: { label: string; action: string }[];
    navigationHint: string;
    selectHint: string;
    closeHint: string;
  };
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
  nav: { work: 'Work', about: 'About', contact: 'Contact', theme: 'Toggle theme', language: 'Switch language', palette: 'Open command palette' },
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
    title: 'Let’s build something useful.',
    subtitle: 'For project or product conversations, get in touch.',
    emailBtn: 'Email me',
    telegramBtn: 'Telegram',
    copied: 'Copied!',
  },
  footer: { built: 'Designed & built by Egor Matafonov', copyright: '© {year} Egor Matafonov' },
  commandPalette: {
    title: 'Command palette',
    placeholder: 'Type a command…',
    empty: 'No matching commands',
    actions: [
      { label: 'Go to work', action: 'work' },
      { label: 'Go to about', action: 'about' },
      { label: 'Contact', action: 'contact' },
      { label: 'Open GitHub profile', action: 'github' },
      { label: 'Toggle theme', action: 'theme' },
    ],
    navigationHint: 'Navigate',
    selectHint: 'Select',
    closeHint: 'Close',
  },
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
  nav: { work: 'Проекты', about: 'Обо мне', contact: 'Контакт', theme: 'Сменить тему', language: 'Сменить язык', palette: 'Открыть палитру команд' },
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
    title: 'Давайте создадим что-то полезное.',
    subtitle: 'Напишите, если хотите обсудить продукт или проект.',
    emailBtn: 'Написать на почту',
    telegramBtn: 'Telegram',
    copied: 'Скопировано!',
  },
  footer: { built: 'Дизайн и разработка — Егор Матафонов', copyright: '© {year} Егор Матафонов' },
  commandPalette: {
    title: 'Палитра команд',
    placeholder: 'Введите команду…',
    empty: 'Команды не найдены',
    actions: [
      { label: 'К проектам', action: 'work' },
      { label: 'Обо мне', action: 'about' },
      { label: 'Контакт', action: 'contact' },
      { label: 'Открыть профиль GitHub', action: 'github' },
      { label: 'Сменить тему', action: 'theme' },
    ],
    navigationHint: 'Перемещение',
    selectHint: 'Выбрать',
    closeHint: 'Закрыть',
  },
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
