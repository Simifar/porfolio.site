export type Language = 'en' | 'ru';

export interface LocalizedText {
  en: string;
  ru: string;
}

export interface ProductDecision {
  title: LocalizedText;
  rationale: LocalizedText;
  problem?: LocalizedText;
  alternative?: LocalizedText;
  tradeoff?: LocalizedText;
}

export interface CaseMaterial {
  label: LocalizedText;
  href: string;
}

export interface ProjectCaseStudy {
  problem?: LocalizedText;
  context: LocalizedText;
  alternatives?: LocalizedText;
  role: LocalizedText;
  constraints: LocalizedText[];
  scope?: { included: LocalizedText[]; cut?: LocalizedText[] };
  decisions: ProductDecision[];
  delivered: LocalizedText[];
  validation?: LocalizedText;
  status: LocalizedText;
  successCriteria?: LocalizedText[];
  nextValidation: LocalizedText;
  lessons?: LocalizedText[];
  materials: CaseMaterial[];
}

export interface Project {
  slug: string;
  name: string;
  presentation: 'featured' | 'additional';
  subtitle: LocalizedText;
  cardFocus: LocalizedText;
  cardRole?: LocalizedText;
  cardScreenshot: { src: string; width: number; height: number; alt: LocalizedText };
  category: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
  tags: LocalizedText[];
  github: string;
  live?: string;
  status?: LocalizedText;
  caseStudy?: ProjectCaseStudy;
  // A playable model of one decision, shown under the decisions in the SPA case.
  interactiveDemo?: 'today-limit';
  visual?: {
    src: string;
    alt: LocalizedText;
    caption: LocalizedText;
    kind?: 'concept' | 'cover';
    socialSrc?: string;
    objectPosition?: 'left' | 'center';
    width: number;
    height: number;
  };
  gallery?: {
    src: string;
    alt: LocalizedText;
    caption: LocalizedText;
    width: number;
    height: number;
  }[];
}

export const projects: Project[] = [
  {
    slug: 'taskfocus',
    cardScreenshot: { src: 'projects/taskfocus-today.png', width: 1919, height: 1079, alt: { en: 'TaskFocus Today dashboard with its daily task list', ru: 'TaskFocus: раздел «Сегодня» со списком задач' } },
    name: 'TaskFocus',
    presentation: 'featured',
    interactiveDemo: 'today-limit',
    subtitle: {
      en: 'An inbox-first planner with flexible dates',
      ru: 'Планировщик с разделом «Входящие» и диапазонами дат',
    },
    cardFocus: {
      en: 'A diploma project implemented as a working task-planning app.',
      ru: 'Дипломный проект, реализованный как приложение для планирования задач.',
    },
    cardRole: {
      en: 'Solo software project · design and implementation',
      ru: 'Самостоятельный проект · дизайн и разработка',
    },
    category: { en: 'Productivity', ru: 'Планирование' },
    description: {
      en: 'A personal task planner with an inbox, a five-task Today list and flexible dates.',
      ru: 'Планировщик с разделом «Входящие», лимитом в пять задач на день и диапазонами дат.',
    },
    features: [
      { en: 'Save tasks in an inbox and sort them later.', ru: 'Сохранять задачи во «Входящие» и разбирать их позже.' },
      { en: 'Limit the Today list to five tasks.', ru: 'Ограничивать список «Сегодня» пятью задачами.' },
      { en: 'Plan work with flexible dates, calendar views and subtasks.', ru: 'Планировать работу с помощью диапазонов дат, календаря и подзадач.' },
      { en: 'See task priority, urgency and estimated energy in one place.', ru: 'Видеть важность, срочность и оценку энергозатрат для каждой задачи.' },
      { en: 'Start a focus timer from a task.', ru: 'Запускать таймер фокуса из задачи.' },
    ],
    tags: [{ en: 'Task planning', ru: 'Планирование задач' }, { en: 'Web app', ru: 'Веб-приложение' }, { en: 'Diploma project', ru: 'Дипломный проект' }],
    github: 'https://github.com/Simifar/taskfocus',
    live: 'https://taskfocus-eight.vercel.app/',
    status: { en: 'Published', ru: 'Опубликован' },
    caseStudy: {
      problem: {
        en: 'When personal tasks pile up in one list, it is hard to see what actually fits into today. Some tasks also have a time window rather than a firm deadline, so a single due date describes them poorly.',
        ru: 'Когда личные задачи копятся в одном списке, трудно выбрать, что выполнить сегодня. При этом некоторые задачи можно выполнить в течение нескольких дней: для них удобнее задать период, чем одну дату.',
      },
      context: {
        en: 'TaskFocus is my diploma project. Users choose up to five captured tasks for their daily plan and can set a date range when a task does not need a single fixed deadline.',
        ru: 'TaskFocus — мой дипломный проект. Пользователь сам выбирает до пяти записанных задач для плана на день. Если задаче не нужен точный срок, можно задать диапазон дат.',
      },
      role: {
        en: 'I was the only contributor: I set the product rules, designed the screens and built the app using AI agents.',
        ru: 'Я работал над проектом один: определил правила продукта, спроектировал экраны и собрал приложение с помощью AI-агентов.',
      },
      constraints: [
        {
          en: 'Solo project: one person made the product decisions, the design and the implementation.',
          ru: 'Проект в одиночку: продуктовые решения, дизайн и разработку делал один человек.',
        },
        {
          en: 'No usage data yet: the decisions rest on product reasoning, not on observed behaviour.',
          ru: 'Данных об использовании пока нет: решения основаны на продуктовой логике, а не на наблюдении за поведением.',
        },
      ],
      scope: {
        included: [
          { en: 'Capture a task to the Inbox without a date.', ru: 'Записать задачу во «Входящие» без даты.' },
          { en: 'Move up to five tasks into Today.', ru: 'Перенести в «Сегодня» до пяти задач.' },
          { en: 'Give a flexible task a date window.', ru: 'Задать диапазон дат для выполнения задачи.' },
          { en: 'Get a suggestion for the next task.', ru: 'Получить рекомендацию следующей задачи.' },
        ],
      },
      decisions: [
        {
          title: { en: 'Cap the daily focus at five tasks', ru: 'Ограничить план дня пятью задачами' },
          problem: {
            en: 'Without a limit, the Today list can grow without requiring a choice about which tasks to keep in the daily plan.',
            ru: 'Без лимита список «Сегодня» можно пополнять, не выбирая, какие задачи оставить в плане на день.',
          },
          alternative: {
            en: 'Keep the Today list open-ended.',
            ru: 'Оставить список «Сегодня» без лимита.',
          },
          rationale: {
            en: 'The cap limits the daily plan to five tasks. Whether five is the right number still needs testing.',
            ru: 'Лимит ограничивает план дня пятью задачами. Подходит ли именно такое число, ещё нужно проверить.',
          },
          tradeoff: {
            en: 'A sixth active task needs another day or a place in the inbox.',
            ru: 'Шестую активную задачу нужно оставить во «Входящих» или перенести на другой день.',
          },
        },
        {
          title: { en: 'Capture first, schedule later', ru: 'Сначала записать, потом планировать' },
          problem: {
            en: 'A task may be ready to capture before its date or priority is settled.',
            ru: 'Задачу можно записать до того, как определены срок и важность.',
          },
          alternative: {
            en: 'Require scheduling and task details during capture.',
            ru: 'Сразу при добавлении требовать срок и остальные параметры задачи.',
          },
          rationale: {
            en: 'Save a task before deciding when to do it or how important it is.',
            ru: 'Задачу можно сохранить, а срок и важность выбрать позже.',
          },
          tradeoff: {
            en: 'The inbox needs a separate review step; capture alone does not create a plan.',
            ru: 'Задачи во «Входящих» нужно разбирать отдельно: быстрая запись сама по себе не создаёт план.',
          },
        },
        {
          title: { en: 'Use a date window for flexible work', ru: 'Задавать период для выполнения задачи' },
          rationale: {
            en: 'A start and end date give flexible work a planning window without turning it into a fixed deadline.',
            ru: 'Можно указать начало и конец периода, в течение которого нужно выполнить задачу, вместо одной фиксированной даты.',
          },
        },
        {
          title: { en: 'Give the next task more context', ru: 'Добавить контекст для выбора следующего шага' },
          rationale: {
            en: 'The Today suggestion considers the end of the planned date window, importance and urgency. An optional energy filter narrows the eligible tasks.',
            ru: 'Рекомендация следующей задачи учитывает конец запланированного периода, важность и срочность. Дополнительно можно отфильтровать задачи по оценке энергозатрат.',
          },
        },
      ],
      delivered: [
        { en: 'An inbox and a Today list limited to five tasks.', ru: 'Раздел «Входящие» и список «Сегодня» максимум на пять задач.' },
        { en: 'Day, week, calendar, Eisenhower matrix and archive views.', ru: 'Представления задач на день и неделю, календарь, матрица Эйзенхауэра и архив.' },
        { en: 'Subtasks, priority and urgency, energy estimates, flexible dates and a focus timer.', ru: 'Подзадачи, важность и срочность, оценка энергозатрат, диапазоны дат и таймер фокуса.' },
        { en: 'An MVP with sign-in. The source code is public.', ru: 'MVP с авторизацией и открытым исходным кодом.' },
        { en: 'The server checks the session and task ownership before accessing data; the daily task cap is also enforced on the server.', ru: 'Сервер проверяет сессию и принадлежность задачи пользователю перед доступом к данным; дневной лимит задач также проверяется на сервере.' },
        { en: 'The API client uses a 15-second request timeout and preserves the error code, message and HTTP status for handling failures.', ru: 'Клиент API ограничивает ожидание запроса 15 секундами и сохраняет код, сообщение и HTTP-статус ошибки для обработки сбоев.' },
      ],
      validation: {
        en: 'The source includes automated checks for authentication policy, date rules and daily task capacity, plus setup and architecture documentation. The published app requires sign-in or registration; signed-in workflows were not rechecked for this portfolio update.',
        ru: 'В исходниках есть автоматические проверки правил авторизации, дат и дневного лимита, инструкции запуска и описание архитектуры. Для работы с опубликованным приложением нужен вход или регистрация; сценарии после входа при этом обновлении портфолио не перепроверялись.',
      },
      status: {
        en: 'The web app and source code are public. The problem and the five-task limit are a product hypothesis: they have not been tested with users, and there is no usage data.',
        ru: 'Веб-приложение и исходный код опубликованы. Проблема и лимит в пять задач — продуктовая гипотеза: на пользователях они не проверены, данных об использовании нет.',
      },
      successCriteria: [
        {
          en: 'Without prompting, a participant moves tasks from the Inbox to Today and can explain the five-task limit.',
          ru: 'Участник без подсказки переносит задачи из «Входящих» в «Сегодня» и объясняет лимит в пять задач.',
        },
        {
          en: 'A participant sets a date window for a flexible task and can say how it differs from a deadline.',
          ru: 'Участник задаёт период для выполнения задачи и может объяснить, чем он отличается от точного срока.',
        },
        {
          en: 'A participant can explain why a particular task was suggested as the next one.',
          ru: 'Участник может объяснить, почему приложение предложило следующей именно эту задачу.',
        },
      ],
      nextValidation: {
        en: 'Check these criteria in moderated sessions with the published app, and only then measure any effect on productivity.',
        ru: 'Проверить эти критерии на модерируемых сессиях с опубликованным приложением и только потом измерять влияние на продуктивность.',
      },
      lessons: [
        {
          en: 'To test the focus hypothesis, the MVP could have been limited to the Today and Inbox views; the other views are worth testing separately.',
          ru: 'Чтобы проверить, помогает ли дневной лимит выбирать задачи, в MVP можно было оставить только разделы «Сегодня» и «Входящие». Другие способы просмотра задач стоит проверить отдельно.',
        },
      ],
      materials: [
        { label: { en: 'Architecture', ru: 'Архитектура' }, href: 'https://github.com/Simifar/taskfocus/blob/main/docs/ARCHITECTURE.md' },
        { label: { en: 'API client: timeout and typed errors', ru: 'Клиент API: тайм-аут и типизированные ошибки' }, href: 'https://github.com/Simifar/taskfocus/blob/f3f4a0cf01d8f9c17cd1aa8373faf26bcbabcc3f/src/shared/lib/fetcher.ts' },
        { label: { en: 'Diploma project', ru: 'Описание дипломного проекта' }, href: 'https://github.com/Simifar/taskfocus/blob/main/docs/THESIS.md' },
      ],
    },
    visual: {
      src: '/projects/taskfocus-cover.webp',
      socialSrc: '/projects/taskfocus-cover.png',
      kind: 'cover',
      alt: {
        en: 'TaskFocus editorial cover: a five-task Today plan and a weekly calendar, composed from the product interface.',
        ru: 'Обложка TaskFocus по мотивам интерфейса: план на пять задач и недельный календарь.',
      },
      caption: {
        en: 'Editorial cover · based on the product interface',
        ru: 'Обложка проекта · по мотивам интерфейса',
      },
      width: 1600,
      height: 900,
    },
    gallery: [
      {
        src: '/projects/taskfocus-today.png',
        alt: { en: 'TaskFocus Today dashboard with a five-task plan and a suggested next task.', ru: 'Раздел «Сегодня» TaskFocus с планом из пяти задач и рекомендацией следующей задачи.' },
        caption: { en: 'Today · real signed-in dashboard screenshot', ru: '«Сегодня» · реальный скриншот планировщика после входа' },
        width: 1919,
        height: 1079,
      },
      {
        src: '/projects/taskfocus-inbox.png',
        alt: { en: 'TaskFocus Inbox with quick capture and unscheduled tasks.', ru: 'Раздел «Входящие» в TaskFocus с быстрым добавлением и задачами без даты.' },
        caption: { en: 'Inbox · capture before scheduling', ru: '«Входящие» · запись до планирования' },
        width: 1919,
        height: 1079,
      },
      {
        src: '/projects/taskfocus-week.png',
        alt: { en: 'TaskFocus weekly planning board with tasks arranged by day.', ru: 'Недельный план TaskFocus с задачами по дням.' },
        caption: { en: 'Week · tasks arranged by day', ru: 'Неделя · задачи по дням' },
        width: 1919,
        height: 1078,
      },
      {
        src: '/projects/taskfocus-calendar.png',
        alt: { en: 'TaskFocus calendar with tasks on scheduled dates.', ru: 'Календарь TaskFocus с задачами на запланированные даты.' },
        caption: { en: 'Calendar · scheduled dates', ru: 'Календарь · запланированные даты' },
        width: 1919,
        height: 1079,
      },
    ],
  },
  {
    slug: 'mindtrack',
    cardScreenshot: { src: 'projects/mindtrack-result.png', width: 1440, height: 1000, alt: { en: 'MindTrack questionnaire results, shown as an interface example', ru: 'MindTrack: результаты опросника как пример интерфейса' } },
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
      en: 'Solo software project · browser storage and implementation',
      ru: 'Самостоятельный проект · хранение данных в браузере и разработка',
    },
    category: { en: 'Wellbeing', ru: 'Самонаблюдение' },
    description: {
      en: 'Screening questionnaires for self-observation. No account or product server; answers stay in the browser.',
      ru: 'Скрининговые опросники для самонаблюдения: без аккаунта и серверной обработки ответов. Ответы остаются в браузере.',
    },
    features: [
      { en: 'Answer ASRS, MDQ and PSS-10 questionnaires.', ru: 'Заполнять опросники ASRS, MDQ и PSS-10.' },
      { en: 'See questionnaire scores calculated in the browser.', ru: 'Рассчитывать результаты прямо в браузере.' },
      { en: 'Save answers and continue later on the same device.', ru: 'Сохранять ответы и продолжать на том же устройстве.' },
      { en: 'Find urgent-help guidance alongside the results.', ru: 'Находить рекомендации для экстренных ситуаций рядом с результатами.' },
    ],
    tags: [{ en: 'Privacy', ru: 'Приватность' }, { en: 'Questionnaires', ru: 'Опросники' }, { en: 'Static site', ru: 'Статический сайт' }],
    github: 'https://github.com/Simifar/mindtrack',
    live: 'https://simifar.github.io/mindtrack/',
    status: { en: 'Published', ru: 'Опубликован' },
    caseStudy: {
      problem: {
        en: 'A person filling in a self-observation questionnaire may get a bare score that reads like a diagnosis, and may not know where their sensitive answers end up.',
        ru: 'Человек, который заполняет опросник для самонаблюдения, может принять балл без пояснений за диагноз. Кроме того, ему может быть неясно, где будут храниться ответы с личной информацией.',
      },
      context: {
        en: 'MindTrack is a product in a sensitive area, so the key decisions were about data, risk and responsibility: answers stay in the browser, every score comes with its range, limits and guidance, and urgent-help routes are explicit.',
        ru: 'В MindTrack ответы остаются в браузере. Рядом с баллом показаны диапазон значений, пояснение и границы применения результата. Также указаны контакты срочной помощи.',
      },
      role: {
        en: 'I made the product and UX decisions and built MindTrack on my own using AI agents.',
        ru: 'Я сам принимал продуктовые решения, проектировал UX и собрал MindTrack с помощью AI-агентов.',
      },
      constraints: [
        {
          en: 'MindTrack is for self-observation. It does not diagnose or replace a healthcare professional.',
          ru: 'MindTrack предназначен для самонаблюдения. Он не ставит диагноз и не заменяет специалиста.',
        },
        {
          en: 'Answers and history stay in browser storage. Clearing browser data deletes them; JSON export is available for backup.',
          ru: 'Ответы и история хранятся в браузере. Очистка сохранённых данных сайта удалит их; для резервного копирования доступен экспорт в JSON.',
        },
        {
          en: 'Russian questionnaire text is not described as an official translation unless the rights holder confirms it.',
          ru: 'Нет подтверждения правообладателя, что русский текст опросников является официальным переводом.',
        },
        {
          en: 'The app has no backend or product analytics. There is no usage data, and clinical effectiveness has not been evaluated.',
          ru: 'В приложении нет бэкенда и продуктовой аналитики. Данных об использовании нет, клиническая эффективность не оценивалась.',
        },
      ],
      scope: {
        included: [
          { en: 'Screening questionnaires with scores calculated in the browser.', ru: 'Скрининговые опросники с расчётом результата в браузере.' },
          { en: 'A score shown with its range, interpretation, method source and a non-diagnostic notice.', ru: 'Балл вместе с диапазоном, пояснением, источником методики и пометкой, что это не диагноз.' },
          { en: 'Local history with delete, backup and export.', ru: 'Локальная история с удалением, резервной копией и экспортом.' },
          { en: 'Crisis contacts with the region and age they apply to.', ru: 'Контакты срочной помощи с указанием региона и возраста людей, которым доступна помощь.' },
        ],
        cut: [
          { en: 'Accounts and sync between devices: answers stay on the device.', ru: 'Аккаунты и синхронизация между устройствами: ответы остаются на устройстве.' },
          { en: 'A backend and product analytics: answers are not sent to a server.', ru: 'Бэкенд и продуктовая аналитика: ответы не отправляются на сервер.' },
        ],
      },
      decisions: [
        {
          title: { en: 'Keep answers on the device', ru: 'Оставлять ответы на устройстве пользователя' },
          problem: {
            en: 'The product needs a clear boundary for where questionnaire answers are kept.',
            ru: 'Нужно явно определить, где хранятся ответы на опросники.',
          },
          alternative: {
            en: 'Store answers in an account and sync history between devices.',
            ru: 'Хранить ответы в аккаунте и синхронизировать историю между устройствами.',
          },
          rationale: {
            en: 'The app calculates results in the browser and stores answers there without sending them to a product server.',
            ru: 'Приложение рассчитывает результаты в браузере и сохраняет там ответы, не отправляя их на сервер.',
          },
          tradeoff: {
            en: 'History does not sync between devices and is lost if browser data is cleared without a backup.',
            ru: 'История не синхронизируется между устройствами. При очистке сохранённых данных сайта она удалится; восстановить её можно только из резервной копии.',
          },
        },
        {
          title: { en: 'Show score, interpretation and limits together', ru: 'Показывать балл вместе с пояснением и границами его применения' },
          problem: {
            en: 'A score on its own can be read as a diagnosis and hides what the method can actually say.',
            ru: 'Отдельный балл можно принять за диагноз; без контекста неясно, что именно говорит методика.',
          },
          alternative: {
            en: 'Show only the number or a simplified severity label.',
            ru: 'Показывать только число или упрощённую категорию результата.',
          },
          rationale: {
            en: 'Show the score, its range, an explanation and the method source on the same screen. Make clear that the score is not a diagnosis.',
            ru: 'На одном экране видны балл, его диапазон, пояснение и источник методики. Также указано, что балл не является диагнозом.',
          },
          tradeoff: {
            en: 'The result takes more reading than a number or a short severity label.',
            ru: 'Чтобы разобраться в результате, нужно прочитать больше текста, чем при показе одного числа или короткой категории.',
          },
        },
        {
          title: { en: 'Give people control over local history', ru: 'Дать контроль над локальной историей' },
          rationale: {
            en: 'People can delete their local history or export and import a backup.',
            ru: 'Историю можно удалить, а резервную копию можно экспортировать и импортировать.',
          },
        },
        {
          title: { en: 'Make urgent routes explicit', ru: 'Ясно обозначить помощь в срочной ситуации' },
          rationale: {
            en: 'Show crisis contacts with the region and age they apply to.',
            ru: 'Рядом с контактами срочной помощи указано, в каком регионе она доступна и для какого возраста предназначена.',
          },
        },
      ],
      delivered: [
        { en: 'A published catalog with seven screening questionnaires.', ru: 'Опубликованный каталог с семью скрининговыми опросниками.' },
        { en: 'Questionnaires with scores and saved progress in the browser.', ru: 'Опросники с результатами и сохранением прогресса в браузере.' },
        { en: 'A journal, history deletion and backup, text and JSON export, and result printing.', ru: 'Дневник, удаление и резервное копирование истории, экспорт в текстовом формате и JSON, печать результатов.' },
        { en: 'Method sources, score limitations and urgent-help guidance.', ru: 'Источники методик, пояснения о границах применения результатов и рекомендации для срочных ситуаций.' },
      ],
      status: {
        en: 'The site and source code are public. The product has not been tested with users; there is no usage or clinical outcome data. It is not intended for diagnosis.',
        ru: 'Сайт и исходный код опубликованы. Продукт не проверялся с пользователями; данных об использовании и клинических результатах нет. Приложение не предназначено для диагностики.',
      },
      successCriteria: [
        {
          en: 'After seeing a result, a participant explains in their own words that the score is not a diagnosis and what it does show.',
          ru: 'Увидев результат, участник своими словами объясняет, что показывает балл и почему его нельзя считать диагнозом.',
        },
        {
          en: 'A participant can say where the answers are stored and how to back them up or delete them.',
          ru: 'Участник может сказать, где хранятся ответы и как сделать резервную копию или удалить их.',
        },
        {
          en: 'Without prompting, a participant finds the urgent-help contacts for their region.',
          ru: 'Участник без подсказки находит контакты срочной помощи для своего региона.',
        },
      ],
      nextValidation: {
        en: 'Check these criteria in short moderated sessions with the published site. Separately review questionnaire sources, translation rights and crisis contacts.',
        ru: 'Проверить эти критерии на коротких сессиях с пользователями и ведущим на опубликованном сайте. Отдельно перепроверить источники опросников, права на перевод и контакты срочной помощи.',
      },
      materials: [
        { label: { en: 'Product and questionnaire notes', ru: 'Описание продукта и опросников' }, href: 'https://github.com/Simifar/mindtrack/blob/main/README.md' },
      ],
    },
    visual: {
      src: '/projects/mindtrack-cover.webp',
      socialSrc: '/projects/mindtrack-cover.png',
      kind: 'cover',
      alt: { en: 'MindTrack editorial cover: a questionnaire catalog and an example WHO-5 result, composed from the product interface.', ru: 'Обложка MindTrack по мотивам интерфейса: каталог опросников и пример результата WHO-5.' },
      caption: { en: 'Editorial cover · result shown as an example', ru: 'Обложка проекта · результат показан для примера' },
      width: 1600,
      height: 900,
    },
    gallery: [
      {
        src: '/projects/mindtrack-result.png',
        alt: {
          en: 'MindTrack WHO-5 result screen with demonstration answers, method-specific interpretation and a non-diagnostic notice.',
          ru: 'Экран результата WHO-5 в MindTrack с демонстрационными ответами, пояснением по методике и пометкой, что это не диагноз.',
        },
        caption: {
          en: 'WHO-5 result · demonstration answers entered in the real app',
          ru: 'Результат WHO-5 · демонстрационные ответы в настоящем приложении',
        },
        width: 1440,
        height: 1000,
      },
    ],
  },
  {
    slug: 'cortexmap',
    cardScreenshot: { src: 'projects/cortexmap-home.png', width: 1200, height: 630, alt: { en: 'CortexMap English-learning catalog', ru: 'CortexMap: каталог материалов для изучения английского' } },
    name: 'CortexMap',
    presentation: 'additional',
    subtitle: {
      en: 'A Russian-language catalog for learning English',
      ru: 'Каталог материалов для изучения английского языка',
    },
    cardFocus: {
      en: 'Browse by CEFR level, search, filter and save favorites in the browser.',
      ru: 'Материалы по уровням владения языком (CEFR), поиск, фильтры и избранное в браузере.',
    },
    category: { en: 'Education', ru: 'Образование' },
    description: {
      en: 'A Russian-language English-learning catalog with CEFR levels, search, filters and browser-based favorites. The static site is published on GitHub Pages.',
      ru: 'Русскоязычный каталог материалов для изучения английского языка. Материалы сгруппированы по общеевропейской шкале владения языком (CEFR). Есть поиск, фильтры и избранное в браузере. Статический сайт опубликован на GitHub Pages.',
    },
    features: [
      { en: 'Browse materials by CEFR level.', ru: 'Находить материалы по уровню CEFR.' },
      { en: 'Search and filter the catalog.', ru: 'Искать и фильтровать материалы каталога.' },
      { en: 'Save favorites in the browser without an account.', ru: 'Сохранять избранное в браузере без регистрации.' },
    ],
    tags: [{ en: 'Education', ru: 'Образование' }, { en: 'CEFR levels', ru: 'Уровни CEFR' }, { en: 'Static site', ru: 'Статический сайт' }],
    github: 'https://github.com/Simifar/CortexMap',
    live: 'https://simifar.github.io/CortexMap/',
    status: { en: 'Published', ru: 'Опубликован' },
    visual: {
      src: '/projects/cortexmap-cover.webp',
      socialSrc: '/projects/cortexmap-cover.png',
      kind: 'cover',
      alt: { en: 'CortexMap editorial cover: an English-learning catalog with CEFR levels A1 to C2, composed from the product interface.', ru: 'Обложка CortexMap по мотивам интерфейса: каталог материалов для изучения английского языка с уровнями CEFR от A1 до C2.' },
      caption: { en: 'Editorial cover · based on the product interface', ru: 'Обложка проекта · по мотивам интерфейса' },
      width: 1600,
      height: 900,
    },
  },
];
