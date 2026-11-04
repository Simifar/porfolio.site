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
    visualTitle: string;
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
  contact: { title: string; subtitle: string; emailBtn: string; linkedinBtn: string; telegramBtn: string; copied: string; copyEmail: string; copyFailed: string };
  command: {
    open: string;
    title: string;
    placeholder: string;
    empty: string;
    groupNavigate: string;
    groupCases: string;
    groupActions: string;
    home: string;
    toggleTheme: string;
    switchLanguage: string;
    copyEmail: string;
    writeEmail: string;
    openLinkedin: string;
    openTelegram: string;
    openGithub: string;
    hintMove: string;
    hintOpen: string;
    hintClose: string;
  };
  demo: {
    title: string;
    intro: string;
    disclosure: string;
    inbox: string;
    today: string;
    slots: string;
    move: string;
    unplan: string;
    inboxEmpty: string;
    blocked: string;
    reset: string;
    tasks: string[];
  };
  toc: { label: string };
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
    title: 'Egor Matafonov | IT Support & PC Hardware',
    description: 'Egor Matafonov, IT Support & PC Hardware. Information systems and programming graduate with hands-on PC assembly and equipment inventory experience.',
    projectTitleSuffix: 'Project case by Egor Matafonov',
    projectOverviewSuffix: 'Project overview by Egor Matafonov',
    socialImageAlt: 'Egor Matafonov, IT Support & PC Hardware. Software projects: TaskFocus and MindTrack.',
  },
  nav: {
    brand: 'Egor Matafonov',
    work: 'Projects', experience: 'Experience', about: 'Approach', contact: 'Contact', themeToLight: 'Switch to light theme', themeToDark: 'Switch to dark theme',
    language: 'Language', english: 'English', russian: 'Russian', mainNavigation: 'Main navigation', mobileNavigation: 'Mobile navigation',
    siteHome: 'Egor Matafonov, home', socialLinks: 'Social links', skipToContent: 'Skip to content', menu: 'Menu',
  },
  hero: {
    eyebrow: 'Egor Matafonov · open to IT support and PC hardware roles',
    headline: 'IT Support & PC Hardware',
    supporting: 'Assembled and rebuilt 50+ PCs and inventoried classroom equipment. Graduated in information systems and programming in 2026.',
    proofsLabel: 'Key facts',
    proofs: [
      { value: '50+', label: 'PCs assembled and reassembled' },
      { value: 'EETC · 2026', label: 'information systems and programming' },
      { value: 'Windows / Linux', label: 'learning, including Debian and virtualization' },
    ],
    cta: 'See case studies',
    contactLink: 'Contact me',
    visualTitle: 'TaskFocus',
  },
  work: {
    title: 'Software projects',
    subtitle: 'Personal software projects shown alongside hands-on computer hardware experience.',
    viewCase: 'Project case',
    viewOverview: 'Project overview',
    repository: 'Source code',
    openProduct: 'Open product',
    additionalTitle: 'Other projects',
    focusLabel: 'Key point',
  },
  experience: {
    title: 'Professional experience',
    subtitle: 'Hands-on computer equipment work and technical education, alongside earlier experience in other roles.',
    educationLabel: 'Education',
    education: 'Yekaterinburg College of Economics and Technology (EETC), 09.02.07 Information Systems and Programming. Secondary vocational education, 2026.',
  },
  about: {
    title: 'Technical profile',
    practices: [
      {
        title: 'PC hardware and inventory',
        detail: 'At the training center, I assembled and reassembled more than 50 computers and inventoried classroom equipment.',
        links: [{ to: '/?section=experience', label: 'Work at Potencial' }],
      },
      {
        title: 'Personal computer work',
        detail: 'I have assembled and maintained personal computers and worked through their technical issues.',
        links: [],
      },
      {
        title: 'Operating systems and virtualization',
        detail: 'I am learning Windows, Linux including Debian, and virtualization.',
        links: [],
      },
      {
        title: 'Infrastructure and technical practice',
        detail: 'I am interested in IT infrastructure, technical documentation and practical IT projects. Programming is part of my vocational training.',
        links: [],
      },
    ],
  },
  contact: {
    title: 'Open to IT support roles',
    subtitle: 'I am a 2026 graduate in information systems and programming with hands-on computer equipment experience. Email is the easiest way to reach me; more background is on LinkedIn.',
    emailBtn: 'Send email',
    linkedinBtn: 'View LinkedIn',
    telegramBtn: 'Telegram',
    copied: 'Email copied',
    copyEmail: 'Copy email address',
    copyFailed: 'Could not copy. The address is Matafonovegor2@gmail.com',
  },
  command: {
    open: 'Open command menu',
    title: 'Command menu',
    placeholder: 'Search sections, cases and actions',
    empty: 'Nothing found',
    groupNavigate: 'Go to',
    groupCases: 'Cases',
    groupActions: 'Actions',
    home: 'Home',
    toggleTheme: 'Switch theme',
    switchLanguage: 'Русская версия',
    copyEmail: 'Copy email address',
    writeEmail: 'Write an email',
    openLinkedin: 'Open LinkedIn',
    openTelegram: 'Open Telegram',
    openGithub: 'Open GitHub',
    hintMove: 'to move',
    hintOpen: 'to open',
    hintClose: 'to close',
  },
  demo: {
    title: 'Try the first decision',
    intro: 'Move tasks from the inbox into Today and see where the limit stops you.',
    disclosure: 'Interactive model of the rule with sample tasks. This is not the TaskFocus app.',
    inbox: 'Inbox',
    today: 'Today',
    slots: '{count} of 5 slots',
    move: 'Move to Today: {task}',
    unplan: 'Back to inbox: {task}',
    inboxEmpty: 'The inbox is empty.',
    blocked: 'Today already has five tasks. Leave “{task}” in the inbox or plan it for another day.',
    reset: 'Start over',
    tasks: ['Market and competitor analysis', 'Draft the roadmap', 'Sprint planning', 'Review user feedback', 'Prepare the team demo', 'Update the onboarding doc', 'Call with the designer'],
  },
  toc: { label: 'On this page' },
  footer: { built: 'Made by Egor Matafonov', copyright: '© {year} Egor Matafonov', github: 'GitHub', linkedin: 'LinkedIn', telegram: 'Telegram', email: 'Email' },
  caseStudy: {
    caseLabel: 'Project case',
    overviewLabel: 'Project overview',
    back: 'Back to projects',
    problemTitle: 'Problem',
    alternativesTitle: 'Why not existing tools',
    roleTitle: 'What I did',
    constraintsTitle: 'Constraints',
    scopeTitle: 'MVP scope',
    scopeIncluded: 'Included',
    scopeCut: 'Left out',
    decisionsTitle: 'Project decisions',
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
    ctaTitle: 'Looking for technical roles',
    ctaText: 'I am looking for opportunities in IT support and PC hardware. Email is the easiest way to reach me; my LinkedIn has more background.',
    nextProject: 'Next project',
  },
  notFound: { title: '404', text: 'This page does not exist.', btn: 'Back to portfolio' },
};

export const ru: Content = {
  metadata: {
    title: 'Егор Матафонов | техническая поддержка и оборудование',
    description: 'Егор Матафонов: техническая поддержка и компьютерное оборудование. Выпускник ЕЭТК по ИСиП, собрал более 50 компьютеров и инвентаризировал технику.',
    projectTitleSuffix: 'Кейс проекта Егора Матафонова',
    projectOverviewSuffix: 'Обзор проекта Егора Матафонова',
    socialImageAlt: 'Егор Матафонов, техническая поддержка и компьютерное оборудование. Программные проекты TaskFocus и MindTrack.',
  },
  nav: {
    brand: 'Егор Матафонов',
    work: 'Проекты', experience: 'Опыт', about: 'Подход', contact: 'Контакты', themeToLight: 'Включить светлую тему', themeToDark: 'Включить тёмную тему',
    language: 'Язык', english: 'Английский', russian: 'Русский', mainNavigation: 'Основная навигация', mobileNavigation: 'Мобильная навигация',
    siteHome: 'Егор Матафонов, главная', socialLinks: 'Ссылки на профили', skipToContent: 'Перейти к содержимому', menu: 'Меню',
  },
  hero: {
    eyebrow: 'Егор Матафонов · открыт к работе с компьютерной техникой',
    headline: 'Техническая поддержка и компьютерное оборудование',
    supporting: 'Собрал и пересобрал более 50 ПК, инвентаризировал технику аудиторий. В 2026 году окончил ЕЭТК по специальности «Информационные системы и программирование».',
    proofsLabel: 'Ключевые факты',
    proofs: [
      { value: '50+', label: 'собранных и пересобранных ПК' },
      { value: 'ЕЭТК · 2026', label: 'СПО по специальности 09.02.07' },
      { value: 'Windows / Linux', label: 'изучаю, включая Debian и виртуализацию' },
    ],
    cta: 'Смотреть кейсы',
    contactLink: 'Написать',
    visualTitle: 'TaskFocus',
  },
  work: {
    title: 'Программные проекты',
    subtitle: 'Личные программные проекты дополняют практический опыт работы с компьютерной техникой.',
    viewCase: 'Кейс проекта',
    viewOverview: 'Обзор проекта',
    repository: 'Исходный код',
    openProduct: 'Открыть продукт',
    additionalTitle: 'Другие проекты',
    focusLabel: 'Главное',
  },
  experience: {
    title: 'Опыт работы',
    subtitle: 'Практическая работа с компьютерной техникой и техническое образование, а также предыдущий опыт в других сферах.',
    educationLabel: 'Образование',
    education: 'Екатеринбургский экономико-технологический колледж (ЕЭТК), 09.02.07 «Информационные системы и программирование». Среднее профессиональное образование, 2026.',
  },
  about: {
    title: 'Технический профиль',
    practices: [
      {
        title: 'Компьютерное оборудование и инвентаризация',
        detail: 'В учебном центре собрал и пересобрал более 50 компьютеров, инвентаризировал технику учебных аудиторий.',
        links: [{ to: '/?section=experience', label: 'Работа в УЦ «Потенциал»' }],
      },
      {
        title: 'Сборка и обслуживание личных ПК',
        detail: 'Собирал и обслуживал личные компьютеры, разбирался с возникавшими техническими проблемами.',
        links: [],
      },
      {
        title: 'Изучаю операционные системы и виртуализацию',
        detail: 'Windows, Linux и Debian, виртуализация, устранение неисправностей и основы IT-инфраструктуры.',
        links: [],
      },
      {
        title: 'Техническая документация и практика',
        detail: 'Интересуюсь технической документацией и практическими IT-проектами. Программирование изучал в рамках специальности.',
        links: [],
      },
    ],
  },
  contact: {
    title: 'Ищу работу в техподдержке',
    subtitle: 'В 2026 году окончил ЕЭТК по специальности «Информационные системы и программирование» и имею практический опыт работы с компьютерной техникой. Напишите на почту; подробнее обо мне можно прочитать в LinkedIn.',
    emailBtn: 'Написать',
    linkedinBtn: 'Открыть LinkedIn',
    telegramBtn: 'Telegram',
    copied: 'Почта скопирована',
    copyEmail: 'Скопировать адрес почты',
    copyFailed: 'Не получилось скопировать. Адрес: Matafonovegor2@gmail.com',
  },
  command: {
    open: 'Открыть меню команд',
    title: 'Меню команд',
    placeholder: 'Поиск по разделам, кейсам и действиям',
    empty: 'Ничего не найдено',
    groupNavigate: 'Перейти',
    groupCases: 'Кейсы',
    groupActions: 'Действия',
    home: 'Главная',
    toggleTheme: 'Сменить тему',
    switchLanguage: 'English version',
    copyEmail: 'Скопировать адрес почты',
    writeEmail: 'Написать письмо',
    openLinkedin: 'Открыть LinkedIn',
    openTelegram: 'Открыть Telegram',
    openGithub: 'Открыть GitHub',
    hintMove: 'выбор',
    hintOpen: 'открыть',
    hintClose: 'закрыть',
  },
  demo: {
    title: 'Попробуйте первое решение',
    intro: 'Переносите задачи из входящих в «Сегодня» и посмотрите, где сработает лимит.',
    disclosure: 'Интерактивная модель правила с задачами-примерами. Это не приложение TaskFocus.',
    inbox: 'Входящие',
    today: 'Сегодня',
    slots: 'Занято {count} из 5 слотов',
    move: 'Перенести в «Сегодня»: {task}',
    unplan: 'Вернуть во входящие: {task}',
    inboxEmpty: 'Входящие пусты.',
    blocked: 'В «Сегодня» уже пять задач. Оставьте «{task}» во входящих или запланируйте на другой день.',
    reset: 'Начать заново',
    tasks: ['Анализ рынка и конкурентов', 'Формирование Roadmap', 'Спринт-планирование', 'Разбор отзывов пользователей', 'Подготовка демо для команды', 'Обновить онбординг', 'Созвон с дизайнером'],
  },
  toc: { label: 'В этом кейсе' },
  footer: { built: 'Сайт сделал Егор Матафонов', copyright: '© {year} Егор Матафонов', github: 'GitHub', linkedin: 'LinkedIn', telegram: 'Telegram', email: 'Почта' },
  caseStudy: {
    caseLabel: 'Кейс проекта',
    overviewLabel: 'Обзор проекта',
    back: 'Назад к проектам',
    problemTitle: 'Проблема',
    alternativesTitle: 'Почему не готовые решения',
    roleTitle: 'Что я сделал',
    constraintsTitle: 'Ограничения',
    scopeTitle: 'Рамки MVP',
    scopeIncluded: 'Вошло',
    scopeCut: 'Не вошло',
    decisionsTitle: 'Решения проекта',
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
    ctaTitle: 'Ищу техническую работу',
    ctaText: 'Рассматриваю возможности в технической поддержке и работе с компьютерной техникой. Напишите на почту; больше информации обо мне есть в LinkedIn.',
    nextProject: 'Следующий проект',
  },
  notFound: { title: '404', text: 'Такой страницы нет.', btn: 'На главную' },
};
