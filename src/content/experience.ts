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
    period: { en: 'Oct 2024–Aug 2026', ru: 'Октябрь 2024 — август 2026' },
    context: { en: 'Classroom computer equipment', ru: 'Компьютеры в учебных аудиториях' },
    work: {
      en: 'Worked on classroom computer equipment, 1C databases and Windows Server at the training center.',
      ru: 'Собирал и обслуживал компьютеры в учебных аудиториях, работал с базами 1С и Windows Server.',
    },
    outcomes: [
      {
        en: 'Assembled and reassembled more than 50 computers.',
        ru: 'Собрал и пересобрал более 50 компьютеров.',
      },
      {
        en: 'Inventoried computer equipment in classrooms.',
        ru: 'Инвентаризировал компьютерную технику в учебных аудиториях.',
      },
    ],
    practice: {
      title: { en: 'In practice · classroom PC maintenance', ru: 'На практике · обслуживание компьютеров' },
      detail: {
        en: 'The work covered both rebuilding computers and servicing individual parts: power supplies and fans. Equipment inventory was a separate part of the work.',
        ru: 'При обслуживании компьютеров ремонтировал блоки питания и смазывал вентиляторы.',
      },
    },
  },
  {
    company: 'O!task',
    compact: true,
    role: { en: 'Junior Product / Growth Specialist', ru: 'Junior Product / Growth Specialist' },
    period: { en: 'Jan–Aug 2026', ru: 'Январь — август 2026' },
    context: { en: 'B2B SaaS · tasks, CRM, finance, knowledge base', ru: 'B2B SaaS · задачи, CRM, финансы, база знаний' },
    work: {
      en: 'Prepared user documentation and structured product information. Handled partner communications.',
      ru: 'Готовил пользовательскую документацию, структурировал информацию о продукте и вёл партнёрскую переписку.',
    },
    outcomes: [
      {
        en: 'Prepared a role matrix; the roles and permissions guide was published on the O!task website and the knowledge base structure was adopted.',
        ru: 'Подготовил матрицу ролей и руководство по ролям и правам, разработал структуру базы знаний. Руководство опубликовано на сайте O!task, структура базы знаний внедрена.',
      },
    ],
  },
  {
    company: 'Web Do',
    compact: true,
    role: { en: 'Business Development / Presale Specialist', ru: 'Business Development / Presale Specialist' },
    period: { en: '2026 · ended in Aug', ru: '2026 · до августа' },
    context: { en: 'Web studio · IT and SaaS clients', ru: 'Веб-студия · клиенты из IT и SaaS' },
    work: {
      en: 'Prepared audit documents and client correspondence, maintained CRM records and handed conversations to sales.',
      ru: 'Готовил материалы по аудитам сайтов, переписывался с потенциальными клиентами и обновлял данные в CRM. Передавал переписку для дальнейших переговоров о сотрудничестве.',
    },
    outcomes: [
      {
        en: 'Prepared 15 site UX audits — current problems, proposed changes and references — as the starting point for a presale conversation with a prospect.',
        ru: 'Подготовил 15 UX-аудитов сайтов: описал проблемы, предложил решения и подобрал примеры. Эти материалы служили основой для первого обсуждения проекта с потенциальным клиентом.',
      },
      {
        en: 'Created reusable audit and presale document templates.',
        ru: 'Создал шаблоны аудитов и материалов для обсуждения проектов с потенциальными клиентами.',
      },
    ],
  },
];
