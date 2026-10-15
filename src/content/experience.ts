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
      en: 'Ran a partner channel without an ad budget, wrote the customer interview script, mapped user journeys, information architecture, roles and permissions, and prepared business and financial models.',
      ru: 'Вёл партнёрский канал без рекламного бюджета, писал сценарий CustDev-интервью, готовил CJM, информационную архитектуру, матрицу ролей и прав, бизнес- и финансовую модель.',
    },
    outcomes: [
      {
        en: 'Sent 130 placement proposals to 91 sites (Feb–Jun 2026) and got 5 publications with Projectum, Timetta, Sendsay and WEEEK through barter or for free; declined paid offers of up to ₽180,000.',
        ru: 'Отправил 130 предложений о размещении в 91 источник (февраль–июнь 2026) и получил 5 публикаций у Projectum, Timetta, Sendsay и WEEEK — по бартеру или бесплатно; от платных предложений до 180 000 ₽ отказались.',
      },
      {
        en: 'Wrote a 30–40-minute customer interview script that the team put into use; analyzed a competitor’s 14-day onboarding sequence (13 emails) and drafted 10 onboarding emails for O!task.',
        ru: 'Составил сценарий CustDev-интервью на 30–40 минут, который взяли в работу; разобрал 14-дневную онбординг-цепочку конкурента (13 писем) и подготовил 10 макетов писем для O!task.',
      },
      {
        en: 'Built the CJM, information architecture and role matrix; the roles and permissions guide was published on the O!task website and the knowledge base structure was adopted.',
        ru: 'Разработал CJM, информационную архитектуру и матрицу ролей; руководство по ролям и правам опубликовано на сайте O!task, структура базы знаний внедрена.',
      },
      {
        en: 'Prepared a business model, financial model, pitch deck and financial risk analysis.',
        ru: 'Подготовил бизнес-модель, финансовую модель, pitch deck и анализ финансовых рисков.',
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
        en: 'Prepared 15 site UX audits — current problems, proposed changes and references — as the starting point for a presale conversation with a prospect.',
        ru: 'Подготовил 15 UX-аудитов сайтов — проблемы, предложенные решения и референсы — как основу для первого presale-разговора с клиентом.',
      },
      {
        en: 'Reworked cold outreach with personalization and follow-ups; created audit and presale templates so materials for a new prospect did not start from scratch.',
        ru: 'Переработал холодные обращения с персонализацией и follow-up; создал шаблоны аудитов и presale-материалов, чтобы не готовить их для каждого клиента с нуля.',
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
