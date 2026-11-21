type LocalizedText = Record<'en' | 'ru', string>;

interface Brawler {
  id: string;
  name: LocalizedText;
  class: LocalizedText;
  rarity: LocalizedText;
  attack: LocalizedText;
  super: LocalizedText;
  appearance: LocalizedText;
  posterWidth: number;
  portraitSize: readonly [number, number];
}

const damage = { en: 'Damage Dealer', ru: 'Урон' };
const rare = { en: 'Rare', ru: 'Редкий' };

export const brawlers = [
  {
    id: 'spike',
    name: { en: 'Spike', ru: 'Спайк' },
    class: damage,
    rarity: { en: 'Legendary', ru: 'Легендарный' },
    attack: {
      en: 'His cactus grenade bursts into spikes that fly in every direction.',
      ru: 'Спайк бросает гранату-кактус. Она взрывается и разбрасывает иголки во все стороны.',
    },
    super: {
      en: 'A patch of thorns slows enemies and damages them as long as they stand in it.',
      ru: 'Спайк покрывает землю колючками. Враги на этом участке замедляются и получают урон.',
    },
    appearance: {
      en: 'Spike, a smiling green cactus with a red flower and a purple vest',
      ru: 'Спайк — улыбающийся зелёный кактус с красным цветком, в фиолетовом жилете',
    },
    posterWidth: 370,
    portraitSize: [555, 401],
  },
  {
    id: 'poco',
    name: { en: 'Poco', ru: 'Поко' },
    class: { en: 'Support', ru: 'Поддержка' },
    rarity: rare,
    attack: {
      en: 'A strum of his guitar sends out a wide wave of notes that can hit several enemies.',
      ru: 'Поко берёт аккорд на гитаре. Широкая звуковая волна может задеть сразу нескольких врагов.',
    },
    super: {
      en: 'His healing wave restores health to Poco and any teammates it reaches, even through walls.',
      ru: 'Мелодия Поко восстанавливает здоровье ему и союзникам на её пути, даже за стеной.',
    },
    appearance: {
      en: 'Poco wearing a black sombrero and playing a pink guitar',
      ru: 'Поко в чёрном сомбреро играет на розовой гитаре',
    },
    posterWidth: 388,
    portraitSize: [740, 534],
  },
  {
    id: 'nita',
    name: { en: 'Nita', ru: 'Нита' },
    class: damage,
    rarity: rare,
    attack: {
      en: 'Nita strikes the ground. Her shockwave can hit several enemies standing in a line.',
      ru: 'Нита ударяет по земле. Ударная волна может задеть нескольких врагов, стоящих друг за другом.',
    },
    super: {
      en: 'She summons Bruce, a bear that chases nearby enemies and swipes at them with his paws.',
      ru: 'Нита призывает медведя Брюса. Он преследует ближайшего врага и бьёт его лапами.',
    },
    appearance: {
      en: 'Nita with raised fists, wearing a red bear hood and a turquoise tunic',
      ru: 'Нита в бирюзовой тунике и красном медвежьем капюшоне поднимает кулаки',
    },
    posterWidth: 408,
    portraitSize: [505, 401],
  },
  {
    id: 'elprimo',
    name: { en: 'El Primo', ru: 'Эль Примо' },
    class: { en: 'Tank', ru: 'Танк' },
    rarity: rare,
    attack: {
      en: 'He throws a flurry of punches. He needs to get close enough for his fists to reach.',
      ru: 'Эль Примо подходит вплотную к противнику и наносит серию ударов кулаками.',
    },
    super: {
      en: 'He leaps over obstacles and lands with an elbow drop that knocks nearby enemies back.',
      ru: 'Эль Примо перепрыгивает препятствия и приземляется локтем вперёд, отбрасывая врагов.',
    },
    appearance: {
      en: 'El Primo, a wrestler in a blue mask and a red belt with a gold star',
      ru: 'Эль Примо — борец в синей маске и красном поясе с золотой звездой',
    },
    posterWidth: 424,
    portraitSize: [555, 401],
  },
] as const satisfies readonly Brawler[];

export const gameModes = [
  {
    id: 'gemgrab',
    name: { en: 'Gem Grab', ru: 'Захват кристаллов' },
    goal: {
      en: 'Collect ten gems from the mine and hold them until the countdown ends.',
      ru: 'Соберите десять кристаллов из шахты и удержите их до конца отсчёта.',
    },
  },
  {
    id: 'brawlball',
    name: { en: 'Brawl Ball', ru: 'Броулбол' },
    goal: {
      en: 'Carry or pass the ball up the field. Score two goals to win.',
      ru: 'Ведите мяч или пасуйте товарищам. Чтобы победить, забейте два гола.',
    },
  },
  {
    id: 'knockout',
    name: { en: 'Knockout', ru: 'Нокаут' },
    goal: {
      en: 'Eliminate the other team to take a round. Win two rounds to take the match.',
      ru: 'Выведите из игры всю команду соперника, чтобы взять раунд. Для победы нужны два раунда.',
    },
  },
] as const;

export const guideCopy = {
  en: {
    title: 'Brawler guide',
    intro: 'Choose a brawler to explore their attacks and see how matches are won.',
    roster: 'Choose a brawler',
    class: 'Class',
    rarity: 'Rarity',
    attack: 'Attack',
    super: 'Super',
    modes: 'Game modes',
    source: 'Official game site',
    notice: 'This material is unofficial and is not endorsed by Supercell. For more information see',
    policy: 'Supercell’s Fan Content Policy',
    missingArt: 'Artwork unavailable',
    play: 'Play animation',
    still: 'Return to portrait',
    missingVideo: 'Animation unavailable',
  },
  ru: {
    title: 'Гид по бойцам',
    intro: 'Выберите бойца, чтобы разобрать его приёмы. Ниже — правила трёх командных режимов.',
    roster: 'Выберите бойца',
    class: 'Класс',
    rarity: 'Редкость',
    attack: 'Атака',
    super: 'Супер',
    modes: 'Режимы игры',
    source: 'Официальный сайт игры',
    notice: 'Это неофициальный материал. Компания Supercell его не одобряла. Подробнее — в',
    policy: 'Правилах Supercell в отношении фанатского контента',
    missingArt: 'Иллюстрация недоступна',
    play: 'Включить анимацию',
    still: 'Вернуться к портрету',
    missingVideo: 'Анимация недоступна',
  },
} as const;
