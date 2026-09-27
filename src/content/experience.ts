import type { LocalizedText } from './projects';

export interface ExperienceEntry {
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  context: LocalizedText;
  work: LocalizedText;
  outcomes: LocalizedText[];
  compact?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    company: 'O!task',
    role: { en: 'Junior Product / Growth Specialist', ru: 'Junior Product / Growth Specialist' },
    period: { en: 'Jan–Aug 2026', ru: 'Янв–авг 2026' },
    context: { en: 'B2B SaaS · tasks, CRM, finance, knowledge base', ru: 'B2B SaaS · задачи, CRM, финансы, база знаний' },
    work: {
      en: 'Prepared customer development, mapped user journeys, information architecture and key flows, defined roles and permissions, and worked on product documentation, business modeling and competitor analysis.',
      ru: 'Готовил CustDev, CJM, информационную архитектуру и пользовательские сценарии; работал над матрицей ролей и прав, документацией, бизнес-моделью и анализом конкурентов.',
    },
    outcomes: [
      {
        en: 'Produced and refined the CJM, role matrix and key flows; prepared a business model, financial model, pitch deck and risk analysis.',
        ru: 'Разработал и дорабатывал CJM, матрицу ролей и ключевые сценарии; подготовил бизнес-модель, финансовую модель, pitch deck и анализ рисков.',
      },
      {
        en: 'Prepared partner materials and coordinated cross-promotion; O!task appeared in materials by Timetta, Projectum, Sendsay and WEEEK.',
        ru: 'Готовил партнёрские материалы и вёл cross-promo; O!task получил размещения в материалах Timetta, Projectum, Sendsay и WEEEK.',
      },
    ],
  },
  {
    company: 'Web Do',
    role: { en: 'Business Development / Presale Specialist', ru: 'Business Development / Presale Specialist' },
    period: { en: '2026 · ended in Aug', ru: '2026 · до августа' },
    context: { en: 'Web studio · IT and SaaS clients', ru: 'Веб-студия · IT и SaaS-клиенты' },
    work: {
      en: 'Researched prospects, wrote personalized outreach, prepared initial UX audits and presale documents, maintained CRM records and handed qualified conversations to sales.',
      ru: 'Искал потенциальных клиентов, писал персонализированные обращения, готовил первичные UX-аудиты и presale-документы, вёл CRM и передавал лиды в продажи.',
    },
    outcomes: [
      {
        en: 'Prepared more than 10 site UX audits with current problems, proposed changes and references.',
        ru: 'Подготовил более 10 UX-аудитов сайтов с описанием проблем, предложенных решений и референсов.',
      },
      {
        en: 'Reworked cold outreach with personalization and follow-ups; created reusable audit and presale templates.',
        ru: 'Переработал холодные обращения с персонализацией и follow-up; создал повторно используемые шаблоны аудитов и presale-материалов.',
      },
    ],
  },
  {
    company: 'УЦ «Потенциал»',
    role: { en: 'IT Support / Administrator', ru: 'Специалист IT-отдела / администратор' },
    period: { en: 'Oct 2024–Aug 2026', ru: 'Окт 2024–авг 2026' },
    context: { en: 'Technical and operational work', ru: 'Техническая и операционная работа' },
    work: {
      en: 'Supported staff, configured computers and software, processed requests, maintained 1C records and published information on external platforms.',
      ru: 'Поддерживал сотрудников, настраивал ПК и ПО, обрабатывал заявки, вёл данные в 1С и размещал информацию на внешних площадках.',
    },
    outcomes: [
      {
        en: 'Simplified recurring operations and data preparation; kept 1C and external listings, including Yandex Business, current.',
        ru: 'Упростил повторяющиеся операции и подготовку данных; поддерживал актуальность 1С и внешних площадок, включая Яндекс Бизнес.',
      },
    ],
    compact: true,
  },
];
