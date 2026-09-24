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
      en: 'A task planner with a five-task limit for each day',
      ru: 'Планировщик с ограничением в пять задач на день',
    },
    cardFocus: {
      en: 'The Today list can hold no more than five tasks.',
      ru: 'В списке «Сегодня» может быть не больше пяти задач.',
    },
    cardRole: {
      en: 'Built solo · product decisions, UX and implementation',
      ru: 'Сделал сам: продуктовые решения, UX и разработка',
    },
    category: { en: 'Productivity', ru: 'Планирование' },
    description: {
      en: 'A task planner with an inbox, a Today list limited to five tasks, flexible dates, subtasks, priority and energy estimates, and a focus timer.',
      ru: 'Планировщик задач со входящими, списком «Сегодня» не более чем на пять задач, гибкими датами, подзадачами, приоритетами, оценкой энергии и таймером фокуса.',
    },
    features: [
      { en: 'Save tasks in an inbox and sort them later.', ru: 'Сохранять задачи во входящие и разбирать их позже.' },
      { en: 'Limit the Today list to five tasks.', ru: 'Ограничивать список «Сегодня» пятью задачами.' },
      { en: 'Plan work with flexible dates, calendar views and subtasks.', ru: 'Планировать с помощью гибких дат, календаря и подзадач.' },
      { en: 'See task priority, urgency and estimated energy in one place.', ru: 'Видеть важность, срочность и оценку энергозатрат для каждой задачи.' },
      { en: 'Start a focus timer from a task.', ru: 'Запускать таймер фокуса из задачи.' },
    ],
    tags: ['Product', 'UX', 'Web app'],
    github: 'https://github.com/Simifar/taskfocus',
    caseStudy: {
      context: {
        en: 'TaskFocus is an MVP for personal task planning, built as a diploma project. The idea was to keep the daily list small and use date ranges for tasks without a fixed deadline. I have not tested whether this makes planning easier.',
        ru: 'TaskFocus — MVP персонального планировщика, который я сделал как дипломный проект. Я ограничил список на день и добавил гибкие сроки для задач без точного дедлайна. Помогает ли это планировать легче, я не проверял.',
      },
      role: {
        en: 'I was the only contributor. I set the product rules, designed the screens and built the app. I used AI tools to help write the code.',
        ru: 'Я работал над проектом один: определил правила продукта, спроектировал экраны и собрал приложение. При написании кода использовал ИИ.',
      },
      constraints: [
        {
          en: 'The dashboard needs sign-in and a configured PostgreSQL/Neon database.',
          ru: 'Для планировщика нужны авторизация и настроенная база PostgreSQL/Neon.',
        },
        {
          en: 'There is no public dashboard demo. The available screenshots show sign-in and registration only.',
          ru: 'Публичной демоверсии планировщика нет. На скриншотах показаны только вход и регистрация.',
        },
      ],
      decisions: [
        {
          title: { en: 'Cap the daily focus at five tasks', ru: 'Ограничить план дня пятью задачами' },
          rationale: {
            en: 'The Today list cannot grow without limit. Whether five is the right number still needs testing.',
            ru: 'Список «Сегодня» не может расти бесконечно. Подходит ли ограничение именно в пять задач, ещё нужно проверить.',
          },
        },
        {
          title: { en: 'Capture first, schedule later', ru: 'Сначала записать, потом планировать' },
          rationale: {
            en: 'Save a task before deciding when to do it or how important it is.',
            ru: 'Задачу можно сохранить, а срок и важность выбрать позже.',
          },
        },
        {
          title: { en: 'Use a date window for flexible work', ru: 'Задавать гибкий диапазон дат' },
          rationale: {
            en: 'A start and end date give flexible work a planning window without turning it into a fixed deadline.',
            ru: 'Начало и конец периода задают окно для планирования, но не превращают его в жёсткий дедлайн.',
          },
        },
        {
          title: { en: 'Give the next task more context', ru: 'Добавить контекст для выбора следующего шага' },
          rationale: {
            en: 'The Today suggestion uses importance, urgency and estimated energy instead of one priority score.',
            ru: 'При рекомендации задач на сегодня учитываются важность, срочность и оценка энергозатрат, а не только один приоритет.',
          },
        },
      ],
      delivered: [
        { en: 'An inbox and a Today list limited to five tasks.', ru: 'Входящие и список «Сегодня» максимум на пять задач.' },
        { en: 'Day, week, calendar, Eisenhower matrix and archive views.', ru: 'Виды дня, недели, календарь, матрица Эйзенхауэра и архив.' },
        { en: 'Subtasks, priority and urgency, energy estimates, flexible dates and a focus timer.', ru: 'Подзадачи, важность и срочность, оценка энергии, гибкие даты и таймер фокуса.' },
        { en: 'An MVP with sign-in. The source code is public.', ru: 'MVP с авторизацией и открытым исходным кодом.' },
      ],
      status: {
        en: 'The source code is public, but there is no demo of the signed-in dashboard.',
        ru: 'Исходный код открыт, но демоверсии авторизованного планировщика нет.',
      },
      nextValidation: {
        en: 'Watch people move tasks from the inbox into Today. Check whether they understand the five-task limit and flexible dates before measuring any effect on productivity.',
        ru: 'Посмотреть, как люди переносят задачи из входящих в список «Сегодня». Сначала проверить, понятны ли им ограничение в пять задач и гибкие даты, а уже потом измерять влияние на продуктивность.',
      },
      materials: [
        { label: { en: 'Architecture', ru: 'Архитектура' }, href: 'https://github.com/Simifar/taskfocus/blob/main/docs/ARCHITECTURE.md' },
        { label: { en: 'Diploma project', ru: 'Описание дипломного проекта' }, href: 'https://github.com/Simifar/taskfocus/blob/main/docs/THESIS.md' },
      ],
    },
    screenshot: {
      src: '/projects/taskfocus-sign-in.png',
      alt: {
        en: 'TaskFocus sign-in screen. There is no public demo of the dashboard.',
        ru: 'Экран входа в TaskFocus. Публичной демоверсии планировщика нет.',
      },
      caption: {
        en: 'Sign-in screen · no public dashboard demo',
        ru: 'Экран входа · демоверсии планировщика нет',
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
      en: 'A browser app for self-observation with questionnaires',
      ru: 'Приложение для самонаблюдения с опросниками',
    },
    cardFocus: {
      en: 'No account. Answers stay in browser storage.',
      ru: 'Без аккаунта. Ответы хранятся в браузере.',
    },
    cardRole: {
      en: 'Built solo · product decisions, UX and implementation',
      ru: 'Сделал сам: продуктовые решения, UX и разработка',
    },
    category: { en: 'Wellbeing', ru: 'Самонаблюдение' },
    description: {
      en: 'A browser app with screening questionnaires for self-observation. It has no account, backend, analytics or AI features; answers stay in browser storage.',
      ru: 'Браузерное приложение с опросниками для самонаблюдения. Аккаунта, бэкенда, аналитики и функций ИИ нет; ответы хранятся в браузере.',
    },
    features: [
      { en: 'Answer ASRS, MDQ and PSS-10 questionnaires.', ru: 'Заполнять опросники ASRS, MDQ и PSS-10.' },
      { en: 'See questionnaire scores calculated in the browser.', ru: 'Рассчитывать результаты прямо в браузере.' },
      { en: 'Save answers and continue later on the same device.', ru: 'Сохранять ответы и продолжать на том же устройстве.' },
      { en: 'Find urgent-help guidance alongside the results.', ru: 'Находить рекомендации для экстренных ситуаций рядом с результатами.' },
    ],
    tags: ['Privacy', 'Questionnaires', 'Static site'],
    github: 'https://github.com/Simifar/mindtrack',
    live: 'https://simifar.github.io/mindtrack/',
    status: { en: 'Published', ru: 'Опубликован' },
    caseStudy: {
      context: {
        en: 'Questionnaire scores can be mistaken for a diagnosis. MindTrack shows each score with its range, limits and guidance.',
        ru: 'Балл опросника легко принять за диагноз. MindTrack показывает результат вместе с диапазоном, ограничениями методики и рекомендациями.',
      },
      role: {
        en: 'I made the product and UX decisions and built MindTrack on my own. I used AI tools to help with development.',
        ru: 'Я сам принимал продуктовые решения, проектировал UX и собрал MindTrack. При разработке использовал ИИ.',
      },
      constraints: [
        {
          en: 'MindTrack is for self-observation. It does not diagnose or replace a healthcare professional.',
          ru: 'MindTrack предназначен для самонаблюдения. Он не ставит диагноз и не заменяет специалиста.',
        },
        {
          en: 'Answers and history stay in browser storage. Clearing browser data deletes them; JSON export is available for backup.',
          ru: 'Ответы и история хранятся в браузере. Если очистить данные браузера, они удалятся; резервную копию можно сохранить в JSON.',
        },
        {
          en: 'Russian questionnaire text is not described as an official translation unless the rights holder confirms it.',
          ru: 'Русский текст опросников не называется официальным переводом без подтверждения правообладателя.',
        },
        {
          en: 'There is no backend or analytics, so I have no data on usage or clinical outcomes.',
          ru: 'В приложении нет бэкенда и аналитики, поэтому данных об использовании и клинических результатах нет.',
        },
      ],
      decisions: [
        {
          title: { en: 'Keep answers on the device', ru: 'Оставлять ответы на устройстве пользователя' },
          rationale: {
            en: 'The app calculates and stores answers in the browser instead of sending them to a product server.',
            ru: 'Приложение рассчитывает и хранит ответы в браузере, а не отправляет их на сервер.',
          },
        },
        {
          title: { en: 'Show score, interpretation and limits together', ru: 'Показывать балл, интерпретацию и ограничения рядом' },
          rationale: {
            en: 'Show the score, its range, an explanation and the method source on the same screen. Make clear that the score is not a diagnosis.',
            ru: 'На одном экране видны балл, его диапазон, пояснение и источник методики. Также указано, что балл не является диагнозом.',
          },
        },
        {
          title: { en: 'Give people control over local history', ru: 'Дать контроль над локальной историей' },
          rationale: {
            en: 'People can delete their local history or export and import a backup.',
            ru: 'Историю можно удалить, а резервную копию — экспортировать и импортировать.',
          },
        },
        {
          title: { en: 'Make urgent routes explicit', ru: 'Ясно обозначить помощь в срочной ситуации' },
          rationale: {
            en: 'Show crisis contacts with the region and age they apply to.',
            ru: 'Рядом с кризисными контактами указаны регион и возрастные условия.',
          },
        },
      ],
      delivered: [
        { en: 'A published catalog with seven screening questionnaires.', ru: 'Опубликованный каталог с семью скрининговыми опросниками.' },
        { en: 'Questionnaires with scores and saved progress in the browser.', ru: 'Опросники с результатами и сохранением прогресса в браузере.' },
        { en: 'A journal, delete and backup controls, and text, print and JSON export.', ru: 'Дневник, удаление и резервное копирование истории, экспорт в текст, печать и JSON.' },
        { en: 'Method sources, score limitations and urgent-help guidance.', ru: 'Источники методик, ограничения результатов и рекомендации для срочных ситуаций.' },
      ],
      status: {
        en: 'The site and source code are public. I have no data on usage, diagnostic accuracy or clinical outcomes.',
        ru: 'Сайт и исходный код доступны. Данных об использовании, точности диагностики и клинических результатах нет.',
      },
      nextValidation: {
        en: 'Ask people what a score means, where their answers are stored and how to back them up. Review questionnaire sources, translation rights and crisis contacts.',
        ru: 'Проверить, как люди понимают баллы, где хранятся ответы и как сделать резервную копию. Перепроверить источники опросников, права на перевод и кризисные контакты.',
      },
      materials: [
        { label: { en: 'Product and questionnaire notes', ru: 'Описание продукта и опросников' }, href: 'https://github.com/Simifar/mindtrack/blob/main/README.md' },
      ],
    },
    screenshot: {
      src: '/projects/mindtrack-home.png',
      alt: { en: 'MindTrack questionnaire catalog and home page', ru: 'Каталог опросников и главная страница MindTrack' },
      caption: { en: 'Questionnaire catalog', ru: 'Каталог опросников' },
      width: 1280,
      height: 1306,
    },
  },
  {
    slug: 'cortexmap',
    name: 'CortexMap',
    presentation: 'additional',
    subtitle: {
      en: 'A Russian-language catalog for learning English',
      ru: 'Русскоязычный каталог для изучения английского',
    },
    cardFocus: {
      en: 'Browse by CEFR level, search, filter and save favorites in the browser.',
      ru: 'Каталог по уровням CEFR, поиск, фильтры и избранное в браузере.',
    },
    cardRole: { en: 'Published on GitHub Pages', ru: 'Опубликован на GitHub Pages' },
    category: { en: 'Education', ru: 'Образование' },
    description: {
      en: 'A Russian-language English-learning catalog with CEFR levels, search, filters and browser-based favorites. The static site is published on GitHub Pages.',
      ru: 'Русскоязычный каталог для изучения английского: уровни CEFR, поиск, фильтры и избранное в браузере. Статический сайт опубликован на GitHub Pages.',
    },
    features: [
      { en: 'Browse materials by CEFR level.', ru: 'Находить материалы по уровню CEFR.' },
      { en: 'Search and filter the catalog.', ru: 'Искать и фильтровать материалы каталога.' },
      { en: 'Save favorites in the browser without an account.', ru: 'Сохранять избранное в браузере без регистрации.' },
    ],
    tags: ['Education', 'Static site', 'Next.js'],
    github: 'https://github.com/Simifar/CortexMap',
    live: 'https://simifar.github.io/CortexMap/',
    status: { en: 'Published', ru: 'Опубликован' },
    screenshot: {
      src: '/projects/cortexmap-home.png',
      alt: { en: 'CortexMap English-learning catalog', ru: 'Каталог CortexMap для изучения английского' },
      caption: { en: 'Published on GitHub Pages', ru: 'Опубликован на GitHub Pages' },
      width: 1200,
      height: 630,
    },
  },
  {
    slug: 'telegram-growth-analytics',
    name: 'Telegram Growth Analytics',
    presentation: 'additional',
    subtitle: {
      en: 'A desktop tool for reviewing ads in public Telegram channels',
      ru: 'Программа для анализа рекламы в публичных Telegram-каналах',
    },
    cardFocus: {
      en: 'Connects through MTProto and stores results in a local SQLite database.',
      ru: 'Подключается по MTProto и хранит результаты в локальной базе SQLite.',
    },
    cardRole: { en: 'Local desktop app', ru: 'Локальная программа' },
    category: { en: 'Analytics', ru: 'Аналитика' },
    description: {
      en: 'A desktop tool for reviewing ads in public Telegram channels. It connects through Telegram MTProto and stores results in a local SQLite database; it is not a hosted website.',
      ru: 'Программа для анализа рекламы в публичных Telegram-каналах. Она подключается через Telegram MTProto и хранит результаты в локальной базе SQLite. Это не веб-сайт.',
    },
    features: [
      { en: 'Review advertising posts in public Telegram channels.', ru: 'Изучать рекламные публикации в публичных Telegram-каналах.' },
      { en: 'Connect to Telegram through MTProto.', ru: 'Подключаться к Telegram через MTProto.' },
      { en: 'Save results in a local SQLite database.', ru: 'Сохранять результаты в локальной базе SQLite.' },
    ],
    tags: ['Telegram', 'Analytics', 'SQLite'],
    github: 'https://github.com/Simifar/StatsTelegramChannels',
  },
];
