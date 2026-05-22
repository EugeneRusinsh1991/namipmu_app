const xlsx = require('xlsx');
const path = require('path');

console.log('🔨 Создание Excel файла с шаблоном...\n');

const workbook = xlsx.utils.book_new();

function createTemplateRow({
  id,
  type,
  ukr = '',
  rus = '',
  eng = '',
  ger = '',
  ukr_sub = '',
  rus_sub = '',
  eng_sub = '',
  ger_sub = '',
  href = '',
  meta = '',
}) {
  return {
    id,
    type,
    ukr,
    rus,
    eng,
    ger,
    ukr_sub,
    rus_sub,
    eng_sub,
    ger_sub,
    href,
    meta,
  };
}

const indexData = [
  createTemplateRow({
    id: 1,
    type: 'heroImage',
    ukr: 'images/hero.jpg',
    rus: 'images/hero.jpg',
    eng: 'images/hero.jpg',
    ger: 'images/hero.jpg',
    meta: 'w=1200;h=520;resizeMode=cover',
  }),
  createTemplateRow({
    id: 2,
    type: 'eyebrow',
    ukr: 'Академія краси',
    rus: 'Академия красоты',
    eng: 'Beauty Academy',
    ger: 'Beauty Academy',
  }),
  createTemplateRow({
    id: 3,
    type: 'title',
    ukr: 'Майстерність перманентного макіяжу',
    rus: 'Мастерство перманентного макияжа',
    eng: 'Master permanent makeup',
    ger: 'Meister der Permanent Make-up',
  }),
  createTemplateRow({
    id: 4,
    type: 'subtitle',
    ukr: 'Навчайтеся у найкращих практиків',
    rus: 'Учитесь у лучших практиков',
    eng: 'Learn from top professionals',
    ger: 'Lernen Sie von den besten Profis',
  }),
  createTemplateRow({
    id: 5,
    type: 'languageSwitcher',
    ukr: 'UA',
    rus: 'RU',
    eng: 'EN',
    ger: 'DE',
    ukr_sub: 'Переключатель языка',
    rus_sub: 'Переключатель языка',
    eng_sub: 'Language switcher',
    ger_sub: 'Sprachumschalter',
  }),
  createTemplateRow({
    id: 6,
    type: 'text',
    ukr: 'Цей текст відображається як звичайний абзац.',
    rus: 'Этот текст выводится как обычный параграф.',
    eng: 'This text is rendered as a normal paragraph.',
    ger: 'Dieser Text wird als normaler Absatz angezeigt.',
  }),
  createTemplateRow({
    id: 6,
    type: 'image',
    ukr: 'images/example.jpg',
    rus: 'images/example.jpg',
    eng: 'images/example.jpg',
    ger: 'images/example.jpg',
    meta: 'w=600;h=400;resizeMode=contain',
  }),
  createTemplateRow({
    id: 7,
    type: 'gif',
    ukr: 'images/animation.gif',
    rus: 'images/animation.gif',
    eng: 'images/animation.gif',
    ger: 'images/animation.gif',
    meta: 'w=400;h=225;resizeMode=contain',
  }),
  createTemplateRow({
    id: 8,
    type: 'card',
    ukr: 'Заголовок карточки',
    rus: 'Заголовок карточки',
    eng: 'Card title',
    ger: 'Kartenüberschrift',
    ukr_sub: 'Опис карточки українською',
    rus_sub: 'Описание карточки на русском',
    eng_sub: 'Card description in English',
    ger_sub: 'Kartenbeschreibung auf Deutsch',
    href: '/lesson-example',
  }),
  createTemplateRow({
    id: 9,
    type: 'video',
    ukr: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    rus: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    eng: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    ger: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  }),
  createTemplateRow({
    id: 10,
    type: 'link',
    ukr: 'Детальніше про курс',
    rus: 'Подробнее о курсе',
    eng: 'Read more about the course',
    ger: 'Mehr über den Kurs',
    href: '/course',
  }),
  createTemplateRow({
    id: 11,
    type: 'item',
    ukr: 'Пункт списку UA',
    rus: 'Пункт списка RU',
    eng: 'List item EN',
    ger: 'Listenelement DE',
  }),
  createTemplateRow({
    id: 12,
    type: 'spacer',
    ukr: 'Секция',
    rus: 'Секция',
    eng: 'Section',
    ger: 'Abschnitt',
  }),
  createTemplateRow({
    id: 13,
    type: 'spacer',
  }),
  createTemplateRow({
    id: 14,
    type: 'navigationButtons',
    ukr: 'Наступний урок',
    rus: 'Следующий урок',
    eng: 'Next lesson',
    ger: 'Nächste Lektion',
    href: '/next-page',
  }),
];

const indexSheet = xlsx.utils.json_to_sheet(indexData, {
  header: [
    'id',
    'type',
    'ukr',
    'rus',
    'eng',
    'ger',
    'ukr_sub',
    'rus_sub',
    'eng_sub',
    'ger_sub',
    'href',
    'meta',
  ],
});
indexSheet['!cols'] = [
  { wch: 5 },
  { wch: 20 },
  { wch: 35 },
  { wch: 35 },
  { wch: 35 },
  { wch: 35 },
  { wch: 35 },
  { wch: 35 },
  { wch: 35 },
  { wch: 35 },
  { wch: 25 },
  { wch: 35 },
];
xlsx.utils.book_append_sheet(workbook, indexSheet, 'Шаблон заполнения');
console.log('✅ Лист "Шаблон заполнения" создан');

const outputPath = path.join(__dirname, '../src/content/content_TEMPLATE.xlsx');
xlsx.writeFile(workbook, outputPath);

console.log('\n✅ content_TEMPLATE.xlsx успешно создан!');
console.log(`📍 Путь: ${outputPath}`);
console.log('\n✅ Файл содержит лист:');
console.log('   1️⃣  "Шаблон заполнения" - готовый шаблон для редактирования');
