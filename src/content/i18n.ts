export interface Content {
  nav: { work: string; about: string; lab: string; contact: string; cv: string };
  hero: { headline: string; headlineAccent: string; supporting: string; cta: string; secondaryCta: string; contactLink: string };
  work: { title: string; subtitle: string; viewCase: string };
  statement: { line1: string; line2: string };
  howIWork: { title: string; steps: { name: string; items: string[] }[] };
  capabilities: { title: string; categories: { name: string; items: string[] }[] };
  tools: string[];
  aiWorkflow: { title: string; subtitle: string; steps: string[] };
  experience: { title: string; items: { company: string; role: string; period: string; highlights: string[] }[] };
  lab: { title: string; subtitle: string; items: { name: string; description: string; status: string; tags: string[] }[] };
  about: { title: string; text: string };
  contact: { title: string; subtitle: string; emailBtn: string; telegramBtn: string };
  footer: { built: string; copyright: string };
  commandPalette: { placeholder: string; actions: { label: string; action: string }[] };
  notFound: { title: string; text: string; btn: string };
}

export const en: Content = {
  nav: { work: 'Work', about: 'About', lab: 'Lab', contact: 'Contact', cv: 'CV ↗' },
  hero: {
    headline: 'Product Manager',
    headlineAccent: 'who builds.',
    supporting: 'Product, project coordination and growth.\nFrom research and product logic to implementation, launch, analytics and iteration.',
    cta: 'View selected work',
    secondaryCta: 'Download CV',
    contactLink: 'Contact'
  },
  work: { title: 'Selected work', subtitle: 'Things I\'ve built.', viewCase: 'View case' },
  statement: { line1: 'Good products aren\'t born from perfect briefs.', line2: 'They emerge from understanding the problem, making decisions and shipping.' },
  howIWork: {
    title: 'From ambiguity to product.',
    steps: [
      { name: 'Discover', items: ['Customer research', 'Competitor research', 'Market analysis', 'Problem discovery', 'Data exploration'] },
      { name: 'Define', items: ['Product requirements', 'User flows', 'CJM', 'Prioritization', 'Metrics'] },
      { name: 'Build', items: ['UX', 'Prototyping', 'Documentation', 'AI-assisted implementation', 'Team coordination'] },
      { name: 'Ship', items: ['QA', 'Release planning', 'Documentation', 'Launch'] },
      { name: 'Measure', items: ['Product metrics', 'Funnels', 'User feedback', 'Performance'] },
      { name: 'Iterate', items: ['Hypotheses', 'Experiments', 'Improvements'] }
    ]
  },
  capabilities: {
    title: 'Capabilities',
    categories: [
      { name: 'Product', items: ['Product discovery', 'CustDev', 'CJM', 'User flows', 'Prioritization', 'Product metrics', 'Competitive research', 'Requirements'] },
      { name: 'Delivery', items: ['Roadmaps', 'Project coordination', 'Documentation', 'QA', 'Releases', 'Stakeholder communication'] },
      { name: 'Growth', items: ['Funnels', 'Acquisition', 'Experiments', 'Unit economics', 'B2B', 'Partnerships', 'Advertising analytics'] },
      { name: 'Technology', items: ['APIs', 'JSON', 'SQL', 'Git', 'GitHub', 'AI agents', 'Automation', 'Web development'] }
    ]
  },
  tools: ['Figma', 'GitHub', 'VS Code', 'ChatGPT', 'Codex', 'Notion', 'Todoist', 'Linear', 'Amplitude', 'Postman'],
  aiWorkflow: {
    title: 'AI is part of my workflow.',
    subtitle: 'I use AI to accelerate research, prototyping, development and analysis — not to replace product thinking.',
    steps: ['Research', 'Analysis', 'Product specification', 'Prototype', 'AI coding agents', 'GitHub', 'Testing', 'Deploy', 'Measure']
  },
  experience: {
    title: 'Experience',
    items: [
      { company: 'Web Do', role: 'Product / Project', period: '2024 — Present', highlights: ['Product coordination', 'Feature prioritization', 'Cross-functional team alignment', 'Process optimization'] },
      { company: 'O!task', role: 'Product / Project', period: '2023 — 2024', highlights: ['Task management product development', 'User research', 'Release coordination', 'Analytics implementation'] }
    ]
  },
  lab: {
    title: 'Lab',
    subtitle: 'Experiments and side projects.',
    items: [
      { name: 'AI Research Agent', description: 'Automated competitor analysis pipeline using LLMs', status: 'Active', tags: ['AI', 'Automation'] },
      { name: 'Home Server', description: 'Self-hosted infrastructure for development and experiments', status: 'Active', tags: ['Infrastructure', 'DevOps'] },
      { name: 'Data Pipeline Tool', description: 'ETL pipeline for product metrics aggregation', status: 'In progress', tags: ['Data', 'Python'] },
      { name: 'UI Component Kit', description: 'Reusable component library for rapid prototyping', status: 'Active', tags: ['React', 'Design System'] }
    ]
  },
  about: {
    title: 'About',
    text: 'I\'m a product-oriented builder interested in turning messy problems into simple, useful products.\n\nI work across product, project management, growth and technology and prefer staying close to both users and implementation.'
  },
  contact: {
    title: 'Let\'s build something useful.',
    subtitle: 'Have a problem worth solving?',
    emailBtn: 'Email me',
    telegramBtn: 'Telegram'
  },
  footer: { built: 'Designed & built by Egor Matafonov', copyright: '© 2025 Egor Matafonov' },
  commandPalette: {
    placeholder: 'Type a command...',
    actions: [
      { label: 'Go to Work', action: 'work' },
      { label: 'Go to About', action: 'about' },
      { label: 'Open Lab', action: 'lab' },
      { label: 'Contact', action: 'contact' },
      { label: 'Download CV', action: 'cv' },
      { label: 'Open GitHub', action: 'github' }
    ]
  },
  notFound: { title: '404', text: 'Looks like this node isn\'t connected.', btn: 'Back to portfolio' }
};

export const ru: Content = {
  nav: { work: 'Работы', about: 'Обо мне', lab: 'Лаб', contact: 'Контакт', cv: 'CV ↗' },
  hero: {
    headline: 'Product Manager',
    headlineAccent: 'который строит.',
    supporting: 'Продакт, управление проектами и рост.\nОт исследования и продуктовой логики до реализации, запуска, аналитики и итераций.',
    cta: 'Смотреть работы',
    secondaryCta: 'Скачать CV',
    contactLink: 'Связаться'
  },
  work: { title: 'Избранные работы', subtitle: 'То, что я создал.', viewCase: 'Открыть кейс' },
  statement: { line1: 'Хорошие продукты не рождаются из идеальных брифов.', line2: 'Они появляются из понимания проблемы, принятия решений и запуска.' },
  howIWork: {
    title: 'От неопределённости к продукту.',
    steps: [
      { name: 'Исследую', items: ['Кастдев', 'Анализ конкурентов', 'Анализ рынка', 'Поиск проблем', 'Работа с данными'] },
      { name: 'Определяю', items: ['Требования', 'Пользовательские сценарии', 'CJM', 'Приоритизация', 'Метрики'] },
      { name: 'Строю', items: ['UX', 'Прототипы', 'Документация', 'AI-ассистированная разработка', 'Координация команды'] },
      { name: 'Запускаю', items: ['QA', 'Планирование релиза', 'Документация', 'Запуск'] },
      { name: 'Измеряю', items: ['Продуктовые метрики', 'Воронки', 'Обратная связь', 'Производительность'] },
      { name: 'Итерирую', items: ['Гипотезы', 'Эксперименты', 'Улучшения'] }
    ]
  },
  capabilities: {
    title: 'Компетенции',
    categories: [
      { name: 'Продукт', items: ['Product discovery', 'CustDev', 'CJM', 'User flows', 'Приоритизация', 'Метрики', 'Анализ конкурентов', 'Требования'] },
      { name: 'Доставка', items: ['Роадмапы', 'Координация проектов', 'Документация', 'QA', 'Релизы', 'Коммуникация'] },
      { name: 'Рост', items: ['Воронки', 'Привлечение', 'Эксперименты', 'Юнит-экономика', 'B2B', 'Партнёрства', 'Рекламная аналитика'] },
      { name: 'Технологии', items: ['API', 'JSON', 'SQL', 'Git', 'GitHub', 'AI агенты', 'Автоматизация', 'Веб-разработка'] }
    ]
  },
  tools: ['Figma', 'GitHub', 'VS Code', 'ChatGPT', 'Codex', 'Notion', 'Todoist', 'Linear', 'Amplitude', 'Postman'],
  aiWorkflow: {
    title: 'AI — часть моего рабочего процесса.',
    subtitle: 'Я использую AI для ускорения исследований, прототипирования, разработки и анализа — не для замены продуктового мышления.',
    steps: ['Исследование', 'Анализ', 'Продуктовая спецификация', 'Прототип', 'AI coding агенты', 'GitHub', 'Тестирование', 'Деплой', 'Измерение']
  },
  experience: {
    title: 'Опыт',
    items: [
      { company: 'Web Do', role: 'Продакт / Проект', period: '2024 — Настоящее время', highlights: ['Продуктовая координация', 'Приоритизация фич', 'Кросс-функциональное взаимодействие', 'Оптимизация процессов'] },
      { company: 'O!task', role: 'Продакт / Проект', period: '2023 — 2024', highlights: ['Разработка таск-менеджера', 'Пользовательские исследования', 'Координация релизов', 'Внедрение аналитики'] }
    ]
  },
  lab: {
    title: 'Лаборатория',
    subtitle: 'Эксперименты и сайд-проекты.',
    items: [
      { name: 'AI Research Agent', description: 'Автоматизированный анализ конкурентов через LLM', status: 'Активен', tags: ['AI', 'Автоматизация'] },
      { name: 'Домашний сервер', description: 'Self-hosted инфраструктура для разработки', status: 'Активен', tags: ['Инфра', 'DevOps'] },
      { name: 'Data Pipeline', description: 'ETL-пайплайн для агрегации продуктовых метрик', status: 'В процессе', tags: ['Данные', 'Python'] },
      { name: 'UI Component Kit', description: 'Библиотека компонентов для быстрого прототипирования', status: 'Активен', tags: ['React', 'Design System'] }
    ]
  },
  about: {
    title: 'Обо мне',
    text: 'Я продуктово-ориентированный билдер, которому интересно превращать сложные проблемы в простые и полезные продукты.\n\nЯ работаю на пересечении продукта, проектного менеджмента, роста и технологий, предпочитая оставаться близко и к пользователям, и к реализации.'
  },
  contact: {
    title: 'Давайте построим что-то полезное.',
    subtitle: 'Есть задача, которую стоит решить?',
    emailBtn: 'Написать на почту',
    telegramBtn: 'Telegram'
  },
  footer: { built: 'Дизайн и разработка — Егор Матафонов', copyright: '© 2025 Егор Матафонов' },
  commandPalette: {
    placeholder: 'Введите команду...',
    actions: [
      { label: 'Перейти к работам', action: 'work' },
      { label: 'Обо мне', action: 'about' },
      { label: 'Лаборатория', action: 'lab' },
      { label: 'Контакт', action: 'contact' },
      { label: 'Скачать CV', action: 'cv' },
      { label: 'Открыть GitHub', action: 'github' }
    ]
  },
  notFound: { title: '404', text: 'Похоже, этот узел не подключён.', btn: 'Вернуться' }
};
