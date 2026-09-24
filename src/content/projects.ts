export type Language = 'en' | 'ru';

export interface LocalizedText {
  en: string;
  ru: string;
}

export interface ProductDecision {
  title: LocalizedText;
  rationale: LocalizedText;
}

export interface CaseMaterial {
  label: LocalizedText;
  href: string;
}

export interface ProjectCaseStudy {
  context: LocalizedText;
  role: LocalizedText;
  constraints: LocalizedText[];
  decisions: ProductDecision[];
  delivered: LocalizedText[];
  status: LocalizedText;
  nextValidation: LocalizedText;
  materials: CaseMaterial[];
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
  caseStudy?: ProjectCaseStudy;
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
    caseStudy: {
      context: {
        en: 'TaskFocus is a diploma MVP for personal task planning. Its product hypothesis was that a smaller daily focus and flexible date ranges would make planning feel less overwhelming. The effect has not been measured.',
        ru: 'TaskFocus — дипломный MVP персонального планировщика. Продуктовая гипотеза: небольшой список на сегодня и мягкие диапазоны дат сделают планирование менее перегружающим. Этот эффект не измерялся.',
      },
      role: {
        en: 'I owned the full cycle as the sole contributor — from problem framing and product rules to UX and implementation. I used AI tools during development; I made and integrated the product decisions myself.',
        ru: 'Я самостоятельно вёл полный цикл — от формулировки задачи и продуктовых правил до UX и реализации. При разработке использовал ИИ, а решения и сборку продукта выполнял сам.',
      },
      constraints: [
        {
          en: 'The authenticated dashboard requires a configured PostgreSQL/Neon database.',
          ru: 'Для работы авторизованного планировщика нужна настроенная база PostgreSQL/Neon.',
        },
        {
          en: 'There is no safe hosted dashboard demo; public screenshots show the sign-in and registration screens.',
          ru: 'Безопасной публичной демоверсии планировщика нет; опубликованы скриншоты входа и регистрации.',
        },
        {
          en: 'The cognitive-load benefit is still a hypothesis; no user or productivity outcomes are claimed.',
          ru: 'Польза для когнитивной нагрузки остаётся гипотезой; пользовательские результаты и рост продуктивности не заявляются.',
        },
      ],
      decisions: [
        {
          title: { en: 'Cap the daily focus at five tasks', ru: 'Ограничить план дня пятью задачами' },
          rationale: {
            en: 'Today has a clear upper boundary instead of becoming another place to move an unlimited backlog. Whether that feels more manageable still needs testing.',
            ru: 'У плана на сегодня появляется верхняя граница: он не превращается в ещё один список без конца. Помогает ли это планировать спокойнее, ещё нужно проверить.',
          },
        },
        {
          title: { en: 'Capture first, schedule later', ru: 'Сначала записать, потом планировать' },
          rationale: {
            en: 'Inbox capture lets a person save a task without deciding its date and priority in the same moment.',
            ru: 'Входящие позволяют записать задачу, не выбирая в тот же момент срок и приоритет.',
          },
        },
        {
          title: { en: 'Use a date window for flexible work', ru: 'Задавать гибкий диапазон дат' },
          rationale: {
            en: 'A soft start and end date distinguish a planning window from a hard deadline.',
            ru: 'Мягкое начало и конец периода отделяют удобное окно для работы от жёсткого дедлайна.',
          },
        },
        {
          title: { en: 'Give the next task more context', ru: 'Добавить контекст для выбора следующего шага' },
          rationale: {
            en: 'Importance, urgency and an energy estimate sit alongside a Today recommendation, rather than relying on one flat priority list.',
            ru: 'Важность, срочность и оценка энергозатратности дополняют рекомендацию на сегодня вместо одного плоского списка приоритетов.',
          },
        },
      ],
      delivered: [
        { en: 'An inbox and a Today plan with the five-task limit.', ru: 'Входящие и план на сегодня с ограничением в пять задач.' },
        { en: 'Week, calendar, day, Eisenhower matrix and archive views.', ru: 'Представления недели, календаря, дня, матрицы Эйзенхауэра и архива.' },
        { en: 'Subtasks, importance, urgency, energy estimates, flexible date ranges and a focus timer.', ru: 'Подзадачи, важность, срочность, оценка энергии, гибкие диапазоны дат и таймер фокуса.' },
        { en: 'A full-stack MVP with sign-in and a public source repository.', ru: 'Full-stack MVP с авторизацией и открытым исходным кодом.' },
      ],
      status: {
        en: 'The MVP and source are available to inspect. A public dashboard demo and evidence of adoption or productivity impact are not available.',
        ru: 'MVP и исходный код можно изучить. Публичной демоверсии планировщика и подтверждённых данных о его использовании или влиянии на продуктивность нет.',
      },
      nextValidation: {
        en: 'Observe people moving tasks from Inbox into a realistic day plan. Check whether the five-task limit and flexible dates are understood before measuring any productivity effect.',
        ru: 'Понаблюдать, как люди переносят задачи из входящих в посильный план дня. Сначала проверить, понятны ли ограничение в пять задач и гибкие даты, и только потом измерять влияние на продуктивность.',
      },
      materials: [
        { label: { en: 'Architecture notes', ru: 'Описание архитектуры' }, href: 'https://github.com/Simifar/taskfocus/blob/main/docs/ARCHITECTURE.md' },
        { label: { en: 'Project framing', ru: 'Контекст проекта' }, href: 'https://github.com/Simifar/taskfocus/blob/main/docs/THESIS.md' },
      ],
    },
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
    caseStudy: {
      context: {
        en: 'Screening responses are sensitive, and a score can be mistaken for a diagnosis. MindTrack aims to offer a private way to reflect on wellbeing and prepare for a conversation with a specialist.',
        ru: 'Ответы на скрининговые опросники чувствительны, а балл можно принять за диагноз. MindTrack даёт приватный способ понаблюдать за состоянием и подготовиться к разговору со специалистом.',
      },
      role: {
        en: 'I owned the product decisions, UX and implementation from end to end, working independently with AI tools as development support.',
        ru: 'Я самостоятельно отвечал за продуктовые решения, UX и реализацию всего продукта, используя ИИ как поддержку при разработке.',
      },
      constraints: [
        {
          en: 'MindTrack is not medical software, does not diagnose and does not replace a specialist.',
          ru: 'MindTrack не является медицинским ПО, не ставит диагноз и не заменяет специалиста.',
        },
        {
          en: 'Answers and history stay in browser storage. Clearing browser data removes that history; JSON export is available for backup.',
          ru: 'Ответы и история хранятся в браузере. При очистке его данных история удалится; для резервной копии доступен экспорт в JSON.',
        },
        {
          en: 'Method sources and translation limits matter: Russian text is not described as an official translation without confirmation from the rights holder.',
          ru: 'Важны источники методик и ограничения перевода: русская версия не называется официальной без подтверждения правообладателя.',
        },
        {
          en: 'The product has no backend or analytics, so usage and clinical outcomes are not available as evidence.',
          ru: 'В продукте нет бэкенда и аналитики, поэтому данные об использовании и клинических результатах недоступны.',
        },
      ],
      decisions: [
        {
          title: { en: 'Keep answers on the device', ru: 'Оставлять ответы на устройстве пользователя' },
          rationale: {
            en: 'Questionnaire responses can be sensitive. Processing and storing them in the browser avoids sending them to a product server.',
            ru: 'Ответы могут быть чувствительными. Подсчёт и хранение в браузере избавляют от отправки их на сервер продукта.',
          },
        },
        {
          title: { en: 'Show score, interpretation and limits together', ru: 'Показывать балл, интерпретацию и ограничения рядом' },
          rationale: {
            en: 'The result is easier to read in context when its range, meaning and method source are visible together, without presenting it as a diagnosis.',
            ru: 'Результат проще понять в контексте, когда рядом видны диапазон, пояснение и источник методики — без подачи его как диагноза.',
          },
        },
        {
          title: { en: 'Give people control over local history', ru: 'Дать контроль над локальной историей' },
          rationale: {
            en: 'Delete, export and import controls make browser-only storage understandable and let people keep a backup they control.',
            ru: 'Удаление, экспорт и импорт делают локальное хранение понятным и позволяют сохранить резервную копию под контролем пользователя.',
          },
        },
        {
          title: { en: 'Make urgent routes explicit', ru: 'Ясно обозначить помощь в срочной ситуации' },
          rationale: {
            en: 'Crisis contacts are shown with region and age context so a self-screening flow does not stand in for urgent help.',
            ru: 'Кризисные контакты сопровождаются регионом и возрастными условиями, чтобы самоопрос не подменял срочную помощь.',
          },
        },
      ],
      delivered: [
        { en: 'A published static catalog with seven screening methods and direct links to each flow.', ru: 'Опубликованный статический каталог с семью скрининговыми методиками и отдельной ссылкой на каждую.' },
        { en: 'Questionnaire flows that can resume, with scoring and history handled in the browser.', ru: 'Опросники с возможностью продолжить прохождение; подсчёт и история работают в браузере.' },
        { en: 'Local journal, delete and backup controls, plus text, print and JSON export options.', ru: 'Локальный дневник, удаление и резервирование истории, а также экспорт в текст, печать и JSON.' },
        { en: 'Method sources, result limitations and urgent-help guidance alongside the relevant flows.', ru: 'Источники методик, ограничения результатов и рекомендации по срочной помощи рядом с соответствующими сценариями.' },
      ],
      status: {
        en: 'The static product and source are published. MindTrack supports self-observation; no adoption, diagnostic accuracy or clinical outcome is claimed.',
        ru: 'Статический продукт и исходный код опубликованы. MindTrack предназначен для самонаблюдения; использование, точность диагностики и клинический эффект не заявляются.',
      },
      nextValidation: {
        en: 'Check whether people understand score ranges, limitations, local data retention and backup options. Continue auditing method sources, translation rights and crisis routes.',
        ru: 'Проверить, как люди понимают диапазоны баллов, ограничения методик, локальное хранение и резервные копии. Продолжить проверку источников, прав на переводы и кризисных контактов.',
      },
      materials: [
        { label: { en: 'Product notes and method list', ru: 'Описание продукта и список методик' }, href: 'https://github.com/Simifar/mindtrack/blob/main/README.md' },
      ],
    },
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
