import type { LocalizedText } from './projects';

export interface ExperienceEntry {
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  context: LocalizedText;
  work: LocalizedText;
  outcomes: LocalizedText[];
  practice?: { title: LocalizedText; detail: LocalizedText };
  compact?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    company: 'УЦ «Потенциал»',
    role: { en: 'PC hardware work', ru: 'Работа с компьютерным оборудованием' },
    period: { en: 'Oct 2024–Aug 2026', ru: 'Окт 2024–авг 2026' },
    context: { en: 'Classroom computer equipment', ru: 'Компьютерная техника аудиторий' },
    work: {
      en: 'Worked on classroom computer equipment, 1C databases and Windows Server at the training center.',
      ru: 'Занимался компьютерной техникой учебных аудиторий, работал с базами 1С и Windows Server.',
    },
    outcomes: [
      {
        en: 'Assembled and reassembled more than 50 computers.',
        ru: 'Собрал и пересобрал более 50 компьютеров.',
      },
      {
        en: 'Inventoried computer equipment in classrooms.',
        ru: 'Инвентаризировал компьютерную технику учебных аудиторий.',
      },
    ],
    practice: {
      title: { en: 'In practice · classroom PC maintenance', ru: 'На практике · обслуживание ПК учебного центра' },
      detail: {
        en: 'The work covered both rebuilding computers and servicing individual parts: power supplies and fans. Equipment inventory was a separate part of the work.',
        ru: 'Работал и с компьютерами целиком, и с отдельными узлами: пересобирал ПК, ремонтировал блоки питания, обслуживал вентиляторы. Отдельная часть работы — инвентаризация техники аудиторий.',
      },
    },
  },
  {
    company: 'O!task',
    compact: true,
    role: { en: 'Junior Product / Growth Specialist', ru: 'Junior Product / Growth Specialist' },
    period: { en: 'Jan–Aug 2026', ru: 'Янв–авг 2026' },
    context: { en: 'B2B SaaS · tasks, CRM, finance, knowledge base', ru: 'B2B SaaS · задачи, CRM, финансы, база знаний' },
    work: {
      en: 'Prepared user documentation and structured product information. Handled partner communications.',
      ru: 'Готовил пользовательскую документацию, структурировал информацию о продукте и вёл партнёрскую переписку.',
    },
    outcomes: [
      {
        en: 'Prepared a role matrix; the roles and permissions guide was published on the O!task website and the knowledge base structure was adopted.',
        ru: 'Подготовил матрицу ролей; руководство по ролям и правам опубликовано на сайте O!task, структура базы знаний внедрена.',
      },
    ],
  },
  {
    company: 'Web Do',
    compact: true,
    role: { en: 'Business Development / Presale Specialist', ru: 'Business Development / Presale Specialist' },
    period: { en: '2026 · ended in Aug', ru: '2026 · до августа' },
    context: { en: 'Web studio · IT and SaaS clients', ru: 'Веб-студия · IT и SaaS-клиенты' },
    work: {
      en: 'Prepared audit documents and client correspondence, maintained CRM records and handed conversations to sales.',
      ru: 'Готовил документы по аудитам, вёл клиентскую переписку и записи в CRM, передавал обращения в продажи.',
    },
    outcomes: [
      {
        en: 'Prepared 15 site UX audits — current problems, proposed changes and references — as the starting point for a presale conversation with a prospect.',
        ru: 'Подготовил 15 UX-аудитов сайтов — проблемы, предложенные решения и референсы — как основу для первого presale-разговора с клиентом.',
      },
      {
        en: 'Created reusable audit and presale document templates.',
        ru: 'Создал шаблоны аудитов и presale-документов для повторного использования.',
      },
    ],
  },
];
