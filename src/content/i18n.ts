export interface Content {
  nav: {
    brand: string;
    home: string;
    work: string;
    about: string;
    contact: string;
    theme: string;
    switchToLight: string;
    switchToDark: string;
    language: string;
    mainNavigation: string;
    mobileNavigation: string;
  };
  hero: { headline: string; headlineAccent: string; supporting: string; cta: string; contactLink: string };
  work: { title: string; subtitle: string; viewCase: string };
  statement: { line1: string; line2: string };
  about: { title: string; text: string[] };
  contact: { title: string; subtitle: string; emailBtn: string; telegramBtn: string; copied: string };
  footer: { built: string; copyright: string };
  caseStudy: {
    back: string;
    projectDetails: string;
    whatItDoes: string;
    repository: string;
    liveSite: string;
    nextProject: string;
  };
  notFound: { title: string; text: string; btn: string };
}

export const en: Content = {
  nav: {
    brand: 'Egor Matafonov',
    home: 'Egor Matafonov — home',
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    theme: 'Toggle theme',
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
    language: 'Switch language',
    mainNavigation: 'Main navigation',
    mobileNavigation: 'Mobile navigation',
  },
  hero: {
    headline: 'Product Manager',
    headlineAccent: 'who builds.',
    supporting: 'Product thinking, coordination and hands-on implementation. A selection of real projects, with links to the products and source code.',
    cta: 'View selected work',
    contactLink: 'Contact',
  },
  work: { title: 'Selected work', subtitle: 'Projects with a public trail.', viewCase: 'View project' },
  statement: {
    line1: 'A portfolio should make the work easy to inspect.',
    line2: 'Each project links to its published site or repository, where available.',
  },
  about: {
    title: 'About',
    text: [
      'I work across product management, project coordination and implementation.',
      'This portfolio focuses on projects that can be explored directly. It avoids presenting unverified research, business outcomes or performance metrics as facts.',
    ],
  },
  contact: {
    title: 'Let’s build something useful.',
    subtitle: 'For project or product conversations, get in touch.',
    emailBtn: 'Email me',
    telegramBtn: 'Telegram',
    copied: 'Copied!',
  },
  footer: { built: 'Designed & built by Egor Matafonov', copyright: '© {year} Egor Matafonov' },
  caseStudy: {
    back: 'Back to portfolio',
    projectDetails: 'Project details',
    whatItDoes: 'What it does',
    repository: 'Source code',
    liveSite: 'Open live site',
    nextProject: 'Next project',
  },
  notFound: { title: '404', text: 'This page is not part of the portfolio.', btn: 'Back to portfolio' },
};

export const ru: Content = {
  nav: {
    brand: 'Егор Матафонов',
    home: 'На главную — Егор Матафонов',
    work: 'Проекты',
    about: 'Обо мне',
    contact: 'Контакт',
    theme: 'Сменить тему',
    switchToLight: 'Включить светлую тему',
    switchToDark: 'Включить тёмную тему',
    language: 'Сменить язык',
    mainNavigation: 'Основная навигация',
    mobileNavigation: 'Мобильная навигация',
  },
  hero: {
    headline: 'Product Manager',
    headlineAccent: 'который создаёт.',
    supporting: 'Продуктовое мышление, координация и практическая разработка. Здесь собраны реальные проекты со ссылками на сайты и исходный код.',
    cta: 'Смотреть проекты',
    contactLink: 'Связаться',
  },
  work: { title: 'Избранные проекты', subtitle: 'Проекты, которые можно проверить.', viewCase: 'О проекте' },
  statement: {
    line1: 'Портфолио должно помогать рассмотреть работу.',
    line2: 'У каждого проекта есть ссылка на опубликованный сайт или репозиторий, если они доступны.',
  },
  about: {
    title: 'Обо мне',
    text: [
      'Я работаю на стыке продуктового управления, координации проектов и разработки.',
      'В портфолио собраны проекты, которые можно изучить напрямую. Неподтверждённые исследования, бизнес-результаты и метрики не выдаются за факты.',
    ],
  },
  contact: {
    title: 'Давайте создадим что-то полезное.',
    subtitle: 'Напишите, если хотите обсудить продукт или проект.',
    emailBtn: 'Написать на почту',
    telegramBtn: 'Telegram',
    copied: 'Скопировано!',
  },
  footer: { built: 'Дизайн и разработка — Егор Матафонов', copyright: '© {year} Егор Матафонов' },
  caseStudy: {
    back: 'Назад к портфолио',
    projectDetails: 'О проекте',
    whatItDoes: 'Что он делает',
    repository: 'Исходный код',
    liveSite: 'Открыть сайт',
    nextProject: 'Следующий проект',
  },
  notFound: { title: '404', text: 'Такой страницы нет в портфолио.', btn: 'Назад к портфолио' },
};
