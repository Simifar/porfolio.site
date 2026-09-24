export type Language = 'en' | 'ru';

export interface LocalizedText {
  en: string;
  ru: string;
}

export interface Project {
  slug: string;
  name: string;
  presentation: 'featured' | 'additional';
  subtitle: LocalizedText;
  cardFocus: LocalizedText;
  cardRole: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
  tags: string[];
  github: string;
  live?: string;
  status?: LocalizedText;
  screenshot?: {
    src: string;
    alt: LocalizedText;
    caption: LocalizedText;
    objectPosition?: 'left' | 'center';
    width: number;
    height: number;
  };
}

export const projects: Project[] = [
  {
    slug: 'taskfocus',
    name: 'TaskFocus',
    presentation: 'featured',
    subtitle: {
      en: 'A task manager for daily priorities and focused work',
      ru: 'Менеджер задач для дневных приоритетов и сосредоточенной работы',
    },
    cardFocus: {
      en: 'A daily plan capped at five active tasks.',
      ru: 'План дня максимум из пяти активных задач.',
    },
    cardRole: {
      en: 'Built solo · product decisions, UX and implementation with AI tools',
      ru: 'Сделал сам · продуктовые решения, UX и разработка с помощью ИИ',
    },
    category: { en: 'Productivity', ru: 'Продуктивность' },
    description: {
      en: 'A task manager with quick inbox capture, a daily plan limited to five tasks, flexible scheduling, subtasks, priority and energy planning, and a focus timer.',
      ru: 'Менеджер задач с быстрым сбором во входящие, планом дня максимум из пяти задач, гибкими датами, подзадачами, приоритетами, оценкой энергии и таймером фокуса.',
    },
    features: [
      { en: 'Capture tasks in an inbox and organize them later.', ru: 'Собирать задачи во входящие и разбирать их позже.' },
      { en: 'Keep the daily focus list to a maximum of five tasks.', ru: 'Ограничивать список задач на день пятью пунктами.' },
      { en: 'Use flexible dates, views, and subtasks to organize work.', ru: 'Организовывать работу с помощью гибких дат, представлений и подзадач.' },
      { en: 'Plan around importance, urgency, and available energy.', ru: 'Планировать с учётом важности, срочности и уровня энергии.' },
      { en: 'Start a built-in focus timer from a task.', ru: 'Запускать встроенный таймер фокуса из задачи.' },
    ],
    tags: ['Product', 'UX', 'Web app'],
    github: 'https://github.com/Simifar/taskfocus',
    screenshot: {
      src: '/projects/taskfocus-sign-in.png',
      alt: {
        en: 'TaskFocus sign-in screen. The product dashboard is not shown because no safe demo environment is available.',
        ru: 'Экран входа в TaskFocus. Интерфейс планировщика не показан: безопасной демоверсии нет.',
      },
      caption: {
        en: 'Sign-in screen · no public dashboard demo',
        ru: 'Экран входа · публичной демоверсии нет',
      },
      objectPosition: 'left',
      width: 1366,
      height: 1000,
    },
  },
  {
    slug: 'mindtrack',
    name: 'MindTrack',
    presentation: 'featured',
    subtitle: {
      en: 'Private self-screening and reflection in the browser',
      ru: 'Конфиденциальная самооценка и наблюдение за состоянием в браузере',
    },
    cardFocus: {
      en: 'Answers stay in browser storage. No account or backend.',
      ru: 'Ответы остаются в браузере. Без аккаунта и бэкенда.',
    },
    cardRole: {
      en: 'Built solo · product decisions, UX and implementation with AI tools',
      ru: 'Сделал сам · продуктовые решения, UX и разработка с помощью ИИ',
    },
    category: { en: 'Wellbeing', ru: 'Самонаблюдение' },
    description: {
      en: 'A browser-based self-observation app with screening questionnaires. Answers stay in browser storage; the app has no accounts, backend, analytics, or AI features.',
      ru: 'Браузерное приложение для самооценки с опросниками. Ответы остаются в хранилище браузера; в приложении нет аккаунтов, бэкенда, аналитики или функций ИИ.',
    },
    features: [
      { en: 'Complete ASRS, MDQ, and PSS-10 questionnaire flows.', ru: 'Проходить опросники ASRS, MDQ и PSS-10.' },
      { en: 'Calculate questionnaire results in the browser.', ru: 'Получать результаты опросников прямо в браузере.' },
      { en: 'Keep saved answers and progress in local browser storage.', ru: 'Хранить ответы и прогресс в локальном хранилище браузера.' },
      { en: 'Read guidance for urgent situations alongside the results.', ru: 'Находить рекомендации для экстренных ситуаций рядом с результатами.' },
    ],
    tags: ['Privacy', 'Questionnaires', 'Static site'],
    github: 'https://github.com/Simifar/mindtrack',
    live: 'https://simifar.github.io/mindtrack/',
    status: { en: 'Published', ru: 'Опубликован' },
    screenshot: {
      src: '/projects/mindtrack-home.png',
      alt: { en: 'MindTrack self-observation app home page', ru: 'Главная страница приложения MindTrack' },
      caption: { en: 'Published product · answers stay in your browser', ru: 'Опубликованный продукт · ответы остаются в браузере' },
      width: 1280,
      height: 1306,
    },
  },
  {
    slug: 'cortexmap',
    name: 'CortexMap',
    presentation: 'additional',
    subtitle: {
      en: 'A Russian-language reference catalog for learning English',
      ru: 'Русскоязычный справочник-каталог для изучения английского',
    },
    cardFocus: {
      en: 'A static English-learning reference catalog published on GitHub Pages.',
      ru: 'Статический справочник по английскому, опубликованный на GitHub Pages.',
    },
    cardRole: { en: 'Published static product', ru: 'Опубликованный статический продукт' },
    category: { en: 'Education', ru: 'Образование' },
    description: {
      en: 'A static English-learning catalog published on GitHub Pages. It works as a reference site without accounts, a backend, or analytics.',
      ru: 'Статический каталог материалов для изучения английского, опубликованный на GitHub Pages. Это справочный сайт без аккаунтов, бэкенда и аналитики.',
    },
    features: [
      { en: 'Browse English-learning reference material in Russian.', ru: 'Изучать справочные материалы по английскому на русском языке.' },
      { en: 'Open the published static site directly in a browser.', ru: 'Открывать опубликованный статический сайт в браузере.' },
      { en: 'Use the catalog without creating an account.', ru: 'Пользоваться каталогом без регистрации.' },
    ],
    tags: ['Education', 'Static site', 'Next.js'],
    github: 'https://github.com/Simifar/CortexMap',
    live: 'https://simifar.github.io/CortexMap/',
    status: { en: 'Published', ru: 'Опубликован' },
    screenshot: {
      src: '/projects/cortexmap-home.png',
      alt: { en: 'CortexMap learning catalog home page', ru: 'Главная страница каталога CortexMap' },
      caption: { en: 'Published static catalog', ru: 'Опубликованный статический каталог' },
      width: 1200,
      height: 630,
    },
  },
  {
    slug: 'telegram-growth-analytics',
    name: 'Telegram Growth Analytics',
    presentation: 'additional',
    subtitle: {
      en: 'A local tool for analyzing public Telegram ad placements',
      ru: 'Локальный инструмент для анализа рекламных размещений в публичных Telegram-каналах',
    },
    cardFocus: {
      en: 'Analyze public ad placements and store results locally; this is not a hosted site.',
      ru: 'Анализ публичных рекламных размещений с локальным хранением данных; это не сайт.',
    },
    cardRole: { en: 'Local analytics tool', ru: 'Локальный инструмент аналитики' },
    category: { en: 'Analytics', ru: 'Аналитика' },
    description: {
      en: 'A desktop analysis tool for public Telegram channels. It collects channel data through Telegram MTProto and stores analysis locally in SQLite; it is not a hosted website.',
      ru: 'Настольный инструмент для анализа публичных Telegram-каналов. Он получает данные через MTProto и хранит результаты локально в SQLite; это не размещённый в интернете сайт.',
    },
    features: [
      { en: 'Analyze public Telegram channel advertising placements.', ru: 'Анализировать рекламные размещения в публичных Telegram-каналах.' },
      { en: 'Connect through Telegram MTProto from the local application.', ru: 'Подключаться через Telegram MTProto из локального приложения.' },
      { en: 'Store collected analysis in a local SQLite database.', ru: 'Сохранять собранные данные в локальной базе SQLite.' },
    ],
    tags: ['Telegram', 'Analytics', 'SQLite'],
    github: 'https://github.com/Simifar/StatsTelegramChannels',
  },
];
