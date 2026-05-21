const xlsx = require('xlsx');
const path = require('path');

console.log('🔨 Создание Excel файла с шаблоном...\n');

// Создаём пустую книгу
const workbook = xlsx.utils.book_new();

// ==========================================
// ЛИСТ: ШАБЛОН ЗАПОЛНЕНИЯ - ВСЕ ТИПЫ ЭЛЕМЕНТОВ
// ==========================================
// Вспомогательная функция для создания объектов с гарантированным порядком колонок:
// id → type → [для каждого поля: RU, затем UA] → gifRU → gifUA → imageRU → imageUA → titleRU → titleUA → descriptionRU → descriptionUA → href → imageWidth → imageHeight → imageAspectRatio → imageResizeMode
function createTemplateRow(
  id,
  type,
  ru = '',
  ua = '',
  gifRU = '',
  gifUA = '',
  imageRU = '',
  imageUA = '',
  titleRU = '',
  titleUA = '',
  descriptionRU = '',
  descriptionUA = '',
  href = '',
  imageWidth = '',
  imageHeight = '',
  imageAspectRatio = '',
  imageResizeMode = ''
) {
  return {
    id,
    type,
    ru,
    ua,
    gifRU,
    gifUA,
    imageRU,
    imageUA,
    titleRU,
    titleUA,
    descriptionRU,
    descriptionUA,
    href,
    imageWidth,
    imageHeight,
    imageAspectRatio,
    imageResizeMode,
  };
}

const indexData = [
  createTemplateRow(1, 'heroImage', '', '', 'images/hero.jpg', 'images/hero.jpg', '', '', '↑ Большой баннер вверху (100% ширина × 250px)', '↑ Великий банер вверху (100% ширина × 250px)', ''),
  createTemplateRow(2, 'eyebrow', 'Beauty Academy', 'Beauty Academy', '', '', '', '', '', '', ''),
  createTemplateRow(3, 'title', 'Master the Art of Beauty', 'Оволодіти мистецтвом краси', '', '', '', '', '', '', ''),
  createTemplateRow(4, 'subtitle', 'Основные направления обучения', 'Основні напрями навчання', '', '', '', '', '', '', ''),
  createTemplateRow(5, 'text', 'Добро пожаловать на наш интерактивный курс. Здесь вы найдёте все необходимые знания и практические навыки для профессионального развития.', 'Ласкаво просимо на наш інтерактивний курс. Тут ви знайдете всі необхідні знання та практичні навички для професійного розвитку.', '', '', '', '', '', '', ''),
  createTemplateRow(6, 'squareImage', '', '', 'images/example_ru.jpg', 'images/example_ua.jpg', '', '', '↑ Квадратное изображение (300×300px, по центру)', '↑ Квадратне зображення (300×300px, по центру)', '', 300, 300, 1, 'contain'),
  createTemplateRow(7, 'card', '', '', 'images/card_ru.jpg', 'images/card_ua.jpg', 'Обычная карточка', 'Звичайна карточка', 'Описание - используется для ссылок на другие уроки', 'Опис - використовується для посилань на інші уроки', '/other-page'),
  createTemplateRow(8, 'cardBig', '', '', 'images/lesson_big.jpg', 'images/lesson_big.jpg', 'Большая карточка (CardBig)', 'Велика карточка (CardBig)', 'Размер: 280px ширина, больший акцент', 'Розмір: 280px ширина, більший акцент', '/lesson'),
  createTemplateRow(9, 'cardSmall', '', '', 'images/test1.jpg', 'images/test1.jpg', 'Малая карточка', 'Мала карточка', 'Размер: 160px, для списков', 'Розмір: 160px, для списків', '/test'),
  createTemplateRow(10, 'cardSmall', '', '', 'images/test2.jpg', 'images/test2.jpg', 'Малая карточка 2', 'Мала карточка 2', 'Можно ставить несколько подряд', 'Можна ставити кілька поспіль', '/test2'),
  createTemplateRow(11, 'languageSwitcher', '', '', '', '', '', '', '↑ Переключатель языка (Укр/Рус)', '↑ Перемикач мови (Укр/Рус)', ''),
  createTemplateRow(12, 'subtitle', 'Что вы будете изучать:', 'Що ви будете вивчати:', '', '', '', '', '', '', ''),
  createTemplateRow(13, 'item', 'Основные техники макияжа и подготовка кожи', 'Основні техніки макіяжу та підготовка шкіри', '', '', '', '', '', '', ''),
  createTemplateRow(14, 'item', 'Цветовая теория и подбор оттенков', 'Теорія кольору та підбір відтінків', '', '', '', '', '', '', ''),
  createTemplateRow(15, 'item', 'Работа с различными типами кожи', 'Робота з різними типами шкіри', '', '', '', '', '', '', ''),
  createTemplateRow(16, 'text', 'Вы получите практический опыт и сертификат после прохождения курса.', 'Ви отримаєте практичний досвід та сертифікат після проходження курсу.', '', '', '', '', '', '', ''),
  createTemplateRow(17, 'textLink', 'Узнать больше о программе обучения →', 'Дізнатися більше про програму навчання →', '', '', '', '', '', '', '/learn-more'),
  createTemplateRow(18, 'videoContainer', '', '', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://www.youtube.com/embed/dQw4w9WgXcQ', '', '', '↑ Видеоэлемент (указать URL видео на YouTube)', '↑ Відеоелемент (вказати URL відео на YouTube)', ''),
  createTemplateRow(19, 'gif', '', '', 'images/animation_ru.gif', 'images/animation_ua.gif', '', '', '', '', '', 400, 225, '16:9', 'contain'),
  createTemplateRow(20, 'navigationButtons', 'Следующий урок', 'Наступний урок', '', '', '', '', '', '', '', '/pigment'),
];

// Создаём листы
const indexSheet = xlsx.utils.json_to_sheet(indexData);
indexSheet['!cols'] = [
  { wch: 5 },   // id
  { wch: 20 },  // type
  { wch: 35 },  // ru (text RU)
  { wch: 35 },  // ua (text UA)
  { wch: 30 },  // gifRU
  { wch: 30 },  // gifUA
  { wch: 30 },  // imageRU
  { wch: 30 },  // imageUA
  { wch: 35 },  // titleRU
  { wch: 35 },  // titleUA
  { wch: 35 },  // descriptionRU
  { wch: 35 },  // descriptionUA
  { wch: 25 },  // href
  { wch: 15 },  // imageWidth
  { wch: 15 },  // imageHeight
  { wch: 20 },  // imageAspectRatio
  { wch: 15 },  // imageResizeMode
];
xlsx.utils.book_append_sheet(workbook, indexSheet, 'Шаблон заполнения');
console.log(`✅ Лист "Шаблон заполнения" создан`);

// Сохраняем файл
const outputPath = path.join(__dirname, '../src/content/content_TEMPLATE.xlsx');
xlsx.writeFile(workbook, outputPath);

console.log('\n✅ content_TEMPLATE.xlsx успешно создан!');
console.log(`📍 Путь: ${outputPath}`);
console.log('\n� ЛИСТЫ В ФАЙЛЕ:');
console.log('   1️⃣  "Шаблон заполнения" - готовый шаблон для редактирования');
