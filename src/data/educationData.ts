import { UniversityKZ, GopThreshold } from '../types';

export const UNIVERSITIES_KZ: UniversityKZ[] = [
  {
    id: 'nu',
    name: 'Nazarbayev University (Назарбаев Университет)',
    shortName: 'NU',
    city: 'Астана',
    tuitionKztPerYear: 8200000,
    minGrantScore: 125, // For general reference (NU uses its own entrance tests/NUFYP and SAT/IELTS, fee-paying is ~8.2M ₸)
    militaryDepartment: false,
    dormitoryAvailable: true,
    popularDirections: ['Computer Science', 'Robotics & Mechatronics', 'Economics', 'Chemical Engineering', 'Pre-Medicine'],
    description: 'Ведущий исследовательский университет мирового уровня с обучением исключительно на английском языке. Более 85% студентов обучаются по государственному образовательному гранту NUFYP или Direct Entry.',
    rankingKZ: 1,
    badge: 'Топ-1 в Центральной Азии',
    grantCompetitionNote: 'Гранты распределяются по внутреннему конкурсу (NUET, SAT от 1350+, IELTS от 6.5+). Платное обучение: 7.8 – 9.0 млн ₸/год.'
  },
  {
    id: 'kbtu',
    name: 'Казахстанско-Британский технический университет',
    shortName: 'КБТУ / KBTU',
    city: 'Алматы',
    tuitionKztPerYear: 2850000,
    minGrantScore: 114,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['Информационные технологии (В057)', 'Информационная безопасность (В058)', 'Нефтегазовое дело', 'Финансы и Финтех'],
    description: 'Флагман технического и IT-образования в Алматы. Тесное партнерство с мировыми технологическими корпорациями и энергетическими гигантами.',
    rankingKZ: 2,
    badge: 'Лидер IT & Финтех',
    grantCompetitionNote: 'Высокий конкурс на грант МОН РК. На В057 проходной балл без квоты — от 114 до 128 баллов. Платное обучение: 2.6 – 3.2 млн ₸/год.'
  },
  {
    id: 'kimep',
    name: 'Университет КИМЭП (KIMEP University)',
    shortName: 'KIMEP',
    city: 'Алматы',
    tuitionKztPerYear: 4200000,
    minGrantScore: 118,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['Финансы и Бухучет', 'Маркетинг и Менеджмент', 'Международное право', 'Журналистика и медиа'],
    description: 'Североамериканская модель высшего образования. Сильнейшая бизнес-школа в регионе с аккредитацией AFBE и широкими возможностями двойного диплома.',
    rankingKZ: 3,
    badge: 'Топ Бизнес-школа',
    grantCompetitionNote: 'Государственных грантов МОН РК выделяется ограниченное число, однако действует внутренняя стипендиальная программа KIMEP до 100% скидки.'
  },
  {
    id: 'sdu',
    name: 'SDU University (Университет имени Сулеймана Демиреля)',
    shortName: 'SDU',
    city: 'Каскелен (Алматинская обл.)',
    tuitionKztPerYear: 1950000,
    minGrantScore: 104,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['IT и Программирование', 'Иностранная филология (Английский)', 'Математика', 'Юриспруденция'],
    description: 'Современный кампус американского типа в живописном Каскелене. Обучение преимущественно на английском языке, высокая репутация в подготовке олимпиадников и разработчиков.',
    rankingKZ: 4,
    badge: 'Кампус года',
    grantCompetitionNote: 'Проходной на IT на общий грант — 106-118 баллов, по сельской квоте — от 94 баллов. Платное обучение: 1.8 – 2.3 млн ₸/год.'
  },
  {
    id: 'kaznu',
    name: 'Казахский национальный университет имени аль-Фараби',
    shortName: 'КазНУ',
    city: 'Алматы',
    tuitionKztPerYear: 1650000,
    minGrantScore: 98,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['Международные отношения', 'Биотехнология', 'Юриспруденция', 'Фундаментальная физика', 'IT'],
    description: 'Крупнейший национальный классический университет Казахстана. Входит в топ-230 мирового рейтинга QS World University Rankings.',
    rankingKZ: 5,
    badge: 'QS Топ-230 в мире',
    grantCompetitionNote: 'Национальный статус (минимальный порог ЕНТ для подачи на грант — 65 баллов). Проходные баллы на грант варьируются от 85 до 128 в зависимости от специальности.'
  },
  {
    id: 'aitu',
    name: 'Astana IT University',
    shortName: 'AITU',
    city: 'Астана',
    tuitionKztPerYear: 1850000,
    minGrantScore: 109,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['Software Engineering', 'Big Data Analysis', 'Cybersecurity', 'Media Technologies'],
    description: 'Специализированный IT-университет на территории Expo в Астане. Практико-ориентированная трехгодичная программа бакалавриата и прямая интеграция с резидентами Astana Hub.',
    rankingKZ: 6,
    badge: '3-летний бакалавриат',
    grantCompetitionNote: 'Выделяется свыше 1 200 целевых грантов МОН РК. Проходные баллы: от 109 до 126 баллов.'
  },
  {
    id: 'iitu',
    name: 'Международный университет информационных технологий',
    shortName: 'МУИТ / IITU',
    city: 'Алматы',
    tuitionKztPerYear: 1750000,
    minGrantScore: 102,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['Информационные системы', 'Вычислительная техника', 'Электронная коммерция', 'Телекоммуникации'],
    description: 'Первый отраслевой IT-вуз в Казахстане с международной аккредитацией ASIIN. Выпустил ключевых инженеров для казахстанского банковского и телеком-сектора.',
    rankingKZ: 7,
    badge: 'ASIIN аккредитация',
    grantCompetitionNote: 'Широкая квота целевых грантов. Проходной балл на бюджет: от 102 до 121.'
  },
  {
    id: 'satbayev',
    name: 'Satbayev University (КазНИТУ имени К.И. Сатпаева)',
    shortName: 'Satbayev Uni',
    city: 'Алматы',
    tuitionKztPerYear: 1550000,
    minGrantScore: 88,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['Горное дело и Геология', 'Автоматизация и управление', 'Архитектура и Строительство', 'Робототехника'],
    description: 'Старейший и наиболее авторитетный политехнический вуз страны. Имеет национальный статус и крупнейший фонд государственных инженерных грантов.',
    rankingKZ: 8,
    badge: 'Главный инженерный вуз',
    grantCompetitionNote: 'Огромное количество инженерных грантов. На многие производственные специальности проходной балл начинается от 82-95 баллов, что делает поступление доступным.'
  },
  {
    id: 'enu',
    name: 'Евразийский национальный университет имени Л.Н. Гумилева',
    shortName: 'ЕНУ',
    city: 'Астана',
    tuitionKztPerYear: 1450000,
    minGrantScore: 94,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['Экономика', 'Транспорт и логистика', 'Филология', 'Ядерная физика', 'Строительство'],
    description: 'Ведущий национальный университет столицы. Известен сильными исследовательскими институтами и активными программами академической мобильности.',
    rankingKZ: 9,
    badge: 'Национальный статус',
    grantCompetitionNote: 'Минимальный порог подачи — 65 баллов. На грант проходной на технические специальности — от 88-100, на гуманитарные — от 110-125.'
  },
  {
    id: 'almau',
    name: 'Алматы Менеджмент Университет',
    shortName: 'AlmaU',
    city: 'Алматы',
    tuitionKztPerYear: 2200000,
    minGrantScore: 101,
    militaryDepartment: true,
    dormitoryAvailable: true,
    popularDirections: ['Предпринимательство', 'Медиа и связи с общественностью', 'Digital Marketing', 'Data Science в бизнесе'],
    description: 'Инновационный предпринимательский университет с аккредитацией AMBA и CEEMAN. Фокус на развитии предпринимательского мышления и студенческих стартапов с 1 курса.',
    rankingKZ: 10,
    badge: 'AMBA аккредитация',
    grantCompetitionNote: 'Платное обучение от 1.9 до 2.6 млн ₸/год. Действуют гранты ректора и гранты для победителей бизнес-олимпиад.'
  }
];

export const GOP_THRESHOLDS: GopThreshold[] = [
  {
    code: 'B057',
    name: 'Информационные технологии',
    subjects: 'Математика + Информатика',
    minGrantScoreGeneral: 112,
    minGrantScoreRural: 96,
    grantsAllocated2025: 5850,
    competition: 'Очень высокая'
  },
  {
    code: 'B058',
    name: 'Информационная безопасность',
    subjects: 'Математика + Информатика',
    minGrantScoreGeneral: 118,
    minGrantScoreRural: 102,
    grantsAllocated2025: 2900,
    competition: 'Очень высокая'
  },
  {
    code: 'B086',
    name: 'Общая медицина',
    subjects: 'Биология + Химия',
    minGrantScoreGeneral: 119,
    minGrantScoreRural: 108,
    grantsAllocated2025: 4200,
    competition: 'Очень высокая'
  },
  {
    code: 'B064',
    name: 'Механика и металлообработка',
    subjects: 'Математика + Физика',
    minGrantScoreGeneral: 78,
    minGrantScoreRural: 66,
    grantsAllocated2025: 2100,
    competition: 'Умеренная'
  },
  {
    code: 'B062',
    name: 'Электротехника и энергетика',
    subjects: 'Математика + Физика',
    minGrantScoreGeneral: 84,
    minGrantScoreRural: 72,
    grantsAllocated2025: 3400,
    competition: 'Средняя'
  },
  {
    code: 'B044',
    name: 'Менеджмент и маркетинг',
    subjects: 'Математика + География',
    minGrantScoreGeneral: 106,
    minGrantScoreRural: 92,
    grantsAllocated2025: 1450,
    competition: 'Высокая'
  },
  {
    code: 'B018',
    name: 'Подготовка учителей иностранного языка',
    subjects: 'Иностранный язык + Всемирная история',
    minGrantScoreGeneral: 114,
    minGrantScoreRural: 101,
    grantsAllocated2025: 2600,
    competition: 'Очень высокая'
  },
  {
    code: 'B070',
    name: 'Горное дело и добыча полезных ископаемых',
    subjects: 'Математика + Физика',
    minGrantScoreGeneral: 74,
    minGrantScoreRural: 62,
    grantsAllocated2025: 2800,
    competition: 'Умеренная'
  }
];

export const ENT_KEY_FACTS = {
  currentAverageScore: 69.8,
  totalTestTakers: '181 400+',
  totalGrantsKazakhstan: '88 214',
  passingScoreMin: 50,
  passingScoreNational: 65,
  passingScorePedagogy: 75,
  passingScoreHealth: 70,
  passingScoreLaw: 75,
  quotas: [
    { name: 'Сельская квота', percent: '35%', desc: 'Для абитуриентов из сельской местности (снижает проходной балл на 10-25 единиц)' },
    { name: 'Многодетные семьи', percent: '5%', desc: 'Семьи, воспитывающие 4 и более несовершеннолетних детей' },
    { name: 'Кандасы (этнические казахи)', percent: '4%', desc: 'Переехавшие на историческую родину соотечественники' },
    { name: 'Неполные семьи', percent: '1%', desc: 'Семьи с одним родителем более 3 лет' },
    { name: 'Лица с инвалидностью', percent: '1%', desc: 'I, II группы и дети с инвалидностью' }
  ]
};
