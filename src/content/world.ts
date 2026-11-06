import type { LocalizedText } from './projects';

export type ItemKind =
  | 'pc'
  | 'tool'
  | 'windows'
  | 'linux'
  | 'server'
  | 'network'
  | 'vm'
  | 'docs'
  | 'terminal'
  | 'gem';
export type SkillStatus = 'hands' | 'exposure' | 'learning';
export const statusLabels: Record<SkillStatus, LocalizedText> = {
  hands: { en: 'Hands-on experience', ru: 'Практический опыт' },
  exposure: { en: 'Practical exposure', ru: 'Практическое знакомство' },
  learning: { en: 'Currently learning', ru: 'Сейчас изучаю' },
};
export const skills: {
  id: ItemKind;
  name: LocalizedText;
  status: SkillStatus;
  detail: LocalizedText;
}[] = [
  {
    id: 'pc',
    name: { en: 'PC Assembly & Maintenance', ru: 'Сборка и обслуживание ПК' },
    status: 'hands',
    detail: {
      en: 'Assembled and reassembled 50+ classroom computers at Potencial Training Center. Equipment inventory was also part of the work.',
      ru: 'Собрал и пересобрал 50+ компьютеров в УЦ «Потенциал». Также инвентаризировал технику в учебных аудиториях.',
    },
  },
  {
    id: 'tool',
    name: { en: 'Hardware Troubleshooting', ru: 'Работа с компонентами' },
    status: 'hands',
    detail: {
      en: 'Serviced computer components, repaired power supplies and lubricated fans at the training center. I also maintain and troubleshoot personal PCs.',
      ru: 'Обслуживал компоненты, ремонтировал блоки питания и смазывал вентиляторы в учебном центре. Также обслуживаю личные ПК и разбираюсь с их неисправностями.',
    },
  },
  {
    id: 'windows',
    name: { en: 'Windows', ru: 'Windows' },
    status: 'learning',
    detail: {
      en: 'Developing my knowledge of Windows as part of learning operating systems and progressing toward desktop support.',
      ru: 'Развиваю знания Windows в рамках изучения операционных систем и подготовки к работе в технической поддержке.',
    },
  },
  {
    id: 'linux',
    name: { en: 'Linux / Debian', ru: 'Linux / Debian' },
    status: 'learning',
    detail: {
      en: 'Learning Linux, including Debian. This is a current learning direction, separate from my hardware work at the training center.',
      ru: 'Изучаю Linux, в том числе Debian. Это направление обучения, отдельно от практической работы с оборудованием в учебном центре.',
    },
  },
  {
    id: 'server',
    name: { en: 'Windows Server & 1C', ru: 'Windows Server и 1С' },
    status: 'exposure',
    detail: {
      en: 'Worked with Windows Server and 1C databases at Potencial Training Center. Continuing to develop infrastructure knowledge.',
      ru: 'Работал с Windows Server и базами 1С в УЦ «Потенциал». Продолжаю развивать знания об IT-инфраструктуре.',
    },
  },
  {
    id: 'network',
    name: { en: 'Equipment Inventory', ru: 'Учёт оборудования' },
    status: 'hands',
    detail: {
      en: 'Inventoried computer equipment in classrooms at Potencial Training Center. Keeping track of physical equipment was a separate part of my work.',
      ru: 'Инвентаризировал компьютерное оборудование в учебных аудиториях УЦ «Потенциал». Учёт техники был отдельной частью работы.',
    },
  },
  {
    id: 'vm',
    name: { en: 'Virtualization', ru: 'Виртуализация' },
    status: 'learning',
    detail: {
      en: 'Learning virtualization alongside operating systems. Exploring environments for further technical practice.',
      ru: 'Изучаю виртуализацию вместе с операционными системами. Знакомлюсь со средами для дальнейшей технической практики.',
    },
  },
  {
    id: 'docs',
    name: { en: 'Technical Documentation', ru: 'Техническая документация' },
    status: 'hands',
    detail: {
      en: 'Prepared a roles and permissions guide and a knowledge base structure for O!task. The guide was published and the knowledge base structure adopted.',
      ru: 'Подготовил руководство по ролям и правам и структуру базы знаний для O!task. Руководство опубликовано, структура базы знаний внедрена.',
    },
  },
];
export const worldCopy = {
  en: {
    world: 'A TECH WORLD',
    available: 'Open to work',
    explore: 'Explore world',
    resume: 'View resume',
    scene:
      'An original block-built computer workshop with a diagnostic monitor, PC tower, server rack and tools on a grassy island.',
    sceneLabel: 'THE WORKSHOP',
    sceneHint: 'A little world. Real hands-on work.',
    labLink: 'Enter the tech lab',
    profile: 'PLAYER PROFILE',
    profileNote: 'The person behind the workstation.',
    name: 'Egor Matafonov',
    role: 'IT Support & PC Hardware',
    profileIntro:
      'From a classroom full of PCs to the next technical challenge.',
    profileBody:
      'I assemble, service and troubleshoot computers. My foundation is practical work with classroom equipment and a vocational education in information systems and programming.',
    profileFacts: [
      'Based in Yekaterinburg',
      'Vocational graduate · 2026',
      'Remote / office / hybrid',
    ],
    inventory: 'INVENTORY',
    inventoryTitle: 'Technical inventory',
    inventorySubtitle:
      'Tools I have used. Systems I am getting to know. Select an item to see the context.',
    inventoryHint: 'Select an item · keyboard or tap',
    allSkills: 'View all skills as text',
    selected: 'SELECTED ITEM',
    quest: 'QUEST LOG',
    completed: 'Completed',
    earlier: 'Earlier chapters',
    mainQuest: 'HARDWARE CHAPTER',
    projects: 'CRAFTED PROJECTS',
    projectsNote: 'Built in the software corner of the workshop.',
    lab: 'WORKSTATION',
    labTitle: 'Interactive tech lab',
    labSubtitle:
      'Every object has a story. Pick one to see where it fits in my technical work.',
    labHint: 'Choose an object below or in the scene',
    objects: ['PC Tower', 'Monitor', 'Server', 'Toolkit', 'Terminal'],
    labAction: 'See the experience',
    github: 'Explore GitHub',
    highlights: 'MILESTONES',
    highlightsTitle: 'Real work. Tangible progress.',
    milestones: [
      {
        value: '50+',
        title: 'PCs assembled & rebuilt',
        note: 'Classroom equipment at Potencial.',
      },
      {
        value: '2026',
        title: 'Technical graduate',
        note: '09.02.07 · Information Systems and Programming.',
      },
      {
        value: '3',
        title: 'Published software projects',
        note: 'TaskFocus, MindTrack and CortexMap.',
      },
    ],
    connect: 'MULTIPLAYER',
    connectNote: 'Let’s build the next chapter.',
    footer: 'An original pixel world. Built for the real one.',
  },
  ru: {
    world: 'МИР ТЕХНИКИ',
    available: 'Открыт к предложениям',
    explore: 'Исследовать мир',
    resume: 'Резюме',
    scene:
      'Авторская блочная компьютерная мастерская: монитор диагностики, системный блок, сервер и инструменты на островке с травой.',
    sceneLabel: 'МАСТЕРСКАЯ',
    sceneHint: 'Маленький мир. Настоящая работа с техникой.',
    labLink: 'Открыть технический стенд',
    profile: 'ПРОФИЛЬ ИГРОКА',
    profileNote: 'Кто стоит за рабочим столом.',
    name: 'Егор Матафонов',
    role: 'IT Support и компьютерное оборудование',
    profileIntro: 'От компьютеров в аудиториях — к новым техническим задачам.',
    profileBody:
      'Собираю, обслуживаю и диагностирую компьютеры. Моя основа — практическая работа с техникой учебного центра и техническое образование по информационным системам и программированию.',
    profileFacts: [
      'Екатеринбург',
      'Техническое образование · 2026',
      'Удалённо / офис / гибрид',
    ],
    inventory: 'ИНВЕНТАРЬ',
    inventoryTitle: 'Технический инвентарь',
    inventorySubtitle:
      'Инструменты, с которыми работал, и системы, которые изучаю. Выберите предмет, чтобы узнать подробности.',
    inventoryHint: 'Выберите предмет · клавиатура или касание',
    allSkills: 'Все навыки текстом',
    selected: 'ВЫБРАННЫЙ ПРЕДМЕТ',
    quest: 'ЖУРНАЛ ЗАДАНИЙ',
    completed: 'Завершено',
    earlier: 'Предыдущие главы',
    mainQuest: 'РАБОТА С ОБОРУДОВАНИЕМ',
    projects: 'СОЗДАННЫЕ ПРОЕКТЫ',
    projectsNote: 'Разработки из программного уголка мастерской.',
    lab: 'РАБОЧЕЕ МЕСТО',
    labTitle: 'Интерактивный технический стенд',
    labSubtitle:
      'За каждым предметом — реальная история. Выберите объект и узнайте, как он связан с моей практикой.',
    labHint: 'Выберите объект в сцене или под ней',
    objects: ['Системный блок', 'Монитор', 'Сервер', 'Инструменты', 'Терминал'],
    labAction: 'Посмотреть опыт',
    github: 'Открыть GitHub',
    highlights: 'ОСНОВНЫЕ ЭТАПЫ',
    highlightsTitle: 'Настоящая работа. Осязаемый результат.',
    milestones: [
      {
        value: '50+',
        title: 'ПК собрано и пересобрано',
        note: 'Компьютеры в УЦ «Потенциал».',
      },
      {
        value: '2026',
        title: 'Техническое образование',
        note: '09.02.07 · Информационные системы и программирование.',
      },
      {
        value: '3',
        title: 'Опубликованных проекта',
        note: 'TaskFocus, MindTrack и CortexMap.',
      },
    ],
    connect: 'ПОДКЛЮЧЕНИЕ',
    connectNote: 'Начнём следующую главу вместе.',
    footer: 'Авторский пиксельный мир. Для настоящих задач.',
  },
};
