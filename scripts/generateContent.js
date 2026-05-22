const xlsx = require('xlsx');
const path = require('path');
const fs = require('fs');

// Читаем Excel файл
const filePath = path.join(__dirname, '../src/content/content.xlsx');

if (!fs.existsSync(filePath)) {
  console.error('❌ Файл content.xlsx не найден!');
  console.error(`Ожидается путь: ${filePath}`);
  process.exit(1);
}

const workbook = xlsx.readFile(filePath);

function parseSize(value) {
  if (value == null || String(value).trim() === '') return null;
  const trimmed = String(value).trim();
  if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
    const num = Number(trimmed);
    return num > 0 ? num : null;
  }
  return trimmed;
}

function parseAspectRatio(value) {
  if (value == null || String(value).trim() === '') return null;
  const trimmed = String(value).trim();
  const ratioMatch = trimmed.match(/^([\d.]+)\s*[:xX]\s*([\d.]+)$/);
  if (ratioMatch) {
    const width = Number(ratioMatch[1]);
    const height = Number(ratioMatch[2]);
    if (width > 0 && height > 0) {
      return width / height;
    }
  }
  const num = Number(trimmed);
  return Number.isFinite(num) && num > 0 ? num : null;
}

function normalizeFieldName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '');
}

function getRowField(row, fieldName) {
  const normalized = normalizeFieldName(fieldName);
  if (!normalized) return undefined;
  if (row[fieldName] !== undefined) return row[fieldName];
  for (const key of Object.keys(row)) {
    if (normalizeFieldName(key) === normalized) {
      return row[key];
    }
  }
  return undefined;
}

// Функция для поиска картинки по имени с любым расширением
function findImageWithAnyExtension(fileName, folderPath) {
  if (!fileName) return null;
  
  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const fullFolderPath = path.join(__dirname, '../assets/', folderPath);
  
  // Если указано расширение, проверяем как есть
  const fileNameLower = fileName.toLowerCase();
  const hasExtension = supportedExtensions.some(ext => fileNameLower.endsWith(ext));
  
  if (hasExtension) {
    const fullPath = path.join(fullFolderPath, fileName);
    if (fs.existsSync(fullPath)) {
      return path.posix.join(folderPath, fileName);
    }
    return null;
  }
  
  // Если нет расширения, ищем файл с этим именем и любым поддерживаемым расширением
  try {
    const files = fs.readdirSync(fullFolderPath);
    for (const ext of supportedExtensions) {
      const targetFile = fileName + ext;
      if (files.some(f => f.toLowerCase() === targetFile.toLowerCase())) {
        return path.posix.join(folderPath, targetFile);
      }
    }
  } catch (e) {
    // Папка не существует
  }
  
  return null;
}

// Функция для проверки существования картинки
function imageExists(imagePath) {
  if (!imagePath) return false;
  
  const fullPath = path.join(__dirname, '../assets/', imagePath);
  return fs.existsSync(fullPath);
}

// Функция для автоматического добавления папки на основе названия вкладки
function getImagePath(imagePath, sheetName) {
  if (!imagePath) return imagePath;
  
  // Если путь уже содержит "images/", оставляем как есть (уже полный путь)
  if (imagePath.includes('images/')) {
    return imagePath;
  }
  
  // Если путь уже начинается с названия папки (не содержит /), добавляем "images/{sheetName}/"
  // Иначе (если уже содержит слэш где-то), значит это уже неполный путь типа "subfolder/image.jpg"
  if (!imagePath.includes('/')) {
    return `images/${sheetName}/${imagePath}`;
  }
  
  // Если содержит слэш но не содержит "images/", это частичный путь
  return `images/${sheetName}/${imagePath}`;
}

// Функция для получения полного пути к картинке с автоматическим поиском по расширению
function getFullImagePath(imagePath, sheetName) {
  if (!imagePath) return null;
  
  // Если это URL (http:// или https://), возвращаем как есть
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  let searchPath = imagePath;
  
  // Определяем, куда искать
  if (imagePath.includes('images/')) {
    // Уже полный путь от папки assets
    const parts = imagePath.split('images/')[1];
    return findImageWithAnyExtension(parts.split('/').pop(), 'images/' + parts.split('/').slice(0, -1).join('/'));
  } else if (!imagePath.includes('/')) {
    // Простое имя файла - ищем в images/{sheetName}/
    return findImageWithAnyExtension(imagePath, `images/${sheetName}`);
  } else {
    // Частичный путь
    const parts = imagePath.split('/');
    const fileName = parts.pop();
    const folderPath = `images/${sheetName}/${parts.join('/')}`;
    return findImageWithAnyExtension(fileName, folderPath);
  }
}

// Функция для обработки одного поля с картинкой
function processImageField(imageInput, sheetName) {
  if (!imageInput) return null;
  
  // Если это URL, возвращаем как есть
  if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
    return imageInput;
  }
  
  const imagePath = getFullImagePath(imageInput, sheetName);
  if (imagePath) {
    return imagePath;
  }
  
  // Если файл не найден, возвращаем null (будет использован error.jpg)
  return null;
}

// Парсер локализованного текста из строки.
// Если указан base (например 'title' → titleUA/titleRU), он приоритетно ищет эти поля.
function parseLocalizedText(row, base, fallback = '') {
  if (base) {
    const uaKey = `${base}UA`;
    const ruKey = `${base}RU`;
    const uaVal = row[uaKey] || row[`${base}Ua`] || row[uaKey.toLowerCase()];
    const ruVal = row[ruKey] || row[`${base}Ru`] || row[ruKey.toLowerCase()];
    return {
      ua: uaVal || '',
      ru: ruVal || '',
    };
  }

  // Общий случай: ищем поля ua/ru, либо uaText/ruText
  const ua = row.ua || row.uaText || '';
  const ru = row.ru || row.ruText || '';
  return { ua: ua || '', ru: ru || '' };
}

// Парсер пары изображений (UA/RU) с поиском файлов и заполнением error.jpg при отсутствии
function parseImagePair(row, sheetName, bases = ['image']) {
  const result = {};
  let has = false;

  for (const base of bases) {
    const uaField = `${base}UA`;
    const ruField = `${base}RU`;
    const uaVal = row[uaField] || row[`${base}Ua`] || null;
    const ruVal = row[ruField] || row[`${base}Ru`] || null;

    if (uaVal) {
      const imagePath = processImageField(uaVal, sheetName);
      result.ua = imagePath
        ? `__REQUIRE_START__../../../assets/${imagePath}__REQUIRE_END__`
        : `__REQUIRE_START__../../../assets/images/error.jpg__REQUIRE_END__`;
      has = true;
    }

    if (ruVal) {
      const imagePath = processImageField(ruVal, sheetName);
      result.ru = imagePath
        ? `__REQUIRE_START__../../../assets/${imagePath}__REQUIRE_END__`
        : `__REQUIRE_START__../../../assets/images/error.jpg__REQUIRE_END__`;
      has = true;
    }

    // Если нашли хотя бы один вариант, не пробуем другие базы
    if (has) break;
  }

  if (!has) return null;

  // синхронизируем языки: если только один заполнен — копируем на другой
  if (result.ua && !result.ru) result.ru = result.ua;
  if (result.ru && !result.ua) result.ua = result.ru;

  return result;
}

// Парсер размеров/аспектов/resizeMode
function parseImageSizing(row) {
  const width = parseSize(getRowField(row, 'imageWidth'));
  const height = parseSize(getRowField(row, 'imageHeight'));
  const aspectRatio = parseAspectRatio(getRowField(row, 'imageAspectRatio'));
  const resizeMode = getRowField(row, 'imageResizeMode') ? String(getRowField(row, 'imageResizeMode')).trim() : undefined;
  const sizing = {};
  if (width != null) sizing.width = width;
  if (height != null) sizing.height = height;
  if (aspectRatio != null) sizing.aspectRatio = aspectRatio;
  if (resizeMode) sizing.resizeMode = resizeMode;
  return sizing;
}

// Карта обработчиков типов контента
const contentHandlers = {
  heroimage(row, sheetName) {
    const sizing = parseImageSizing(row);
    const res = Object.assign({}, sizing);
    const imagePair = parseImagePair(row, sheetName, ['image']);
    if (imagePair) res.image = imagePair;
    return res;
  },

  eyebrow(row, sheetName) {
    return { text: parseLocalizedText(row) };
  },
  title(row, sheetName) {
    return { text: parseLocalizedText(row) };
  },
  subtitle(row, sheetName) {
    return { text: parseLocalizedText(row) };
  },

  languageswitcher() {
    return {}; // просто элемент без дополнительных полей
  },

  navigationbuttons(row) {
    const nextText = {
      ru: row.ru || 'Следующий урок',
      ua: row.ua || 'Наступний урок',
    };
    const res = {
      backText: { ru: 'Назад', ua: 'Назад' },
      backHref: '/',
      nextText,
    };
    if (row.href) res.href = row.href;
    return res;
  },

  text(row) {
    return { text: parseLocalizedText(row) };
  },

  // card, cardBig, cardSmall handled as `card`
  card(row, sheetName) {
    const res = {};
    const imagePair = parseImagePair(row, sheetName, ['image']);
    if (imagePair) res.image = imagePair;
    res.title = parseLocalizedText(row, 'title');
    res.description = parseLocalizedText(row, 'description');
    if (row.href) res.href = row.href;
    return res;
  },

  link(row) {
    return {
      text: { ua: row.ua || '', ru: row.ru || '' },
      ...(row.href ? { href: row.href } : {}),
    };
  },

  image(row, sheetName) {
    const res = {};
    const sizing = parseImageSizing(row);
    Object.assign(res, sizing);
    const srcPair = parseImagePair(row, sheetName, ['image']);
    if (srcPair) res.src = srcPair;
    return res;
  },

  gif(row, sheetName) {
    const res = {};
    const sizing = parseImageSizing(row);
    Object.assign(res, sizing);
    const srcPair = parseImagePair(row, sheetName, ['gif', 'image']);
    if (srcPair) res.src = srcPair;
    return res;
  },

  // textLink -> link
  textlink(row) {
    return {
      text: { ua: row.ua || row.uaText || '', ru: row.ru || row.ruText || '' },
      ...(row.href ? { href: row.href } : {}),
    };
  },

  // videoContainer -> video
  videocontainer(row) {
    const res = {};
    if (row.imageRU || row.imageUA) {
      res.url = row.imageRU || row.imageUA;
    }
    return res;
  },

  video(row) {
    const res = {};
    if (row.href) res.url = row.href;
    return res;
  },
};

// Алиасы типов (чтобы, например, cardBig и cardSmall обрабатывались как card)
const typeAliases = {
  cardbig: 'card',
  cardsmall: 'card',
  squareimage: 'image',
  textlink: 'textlink',
  videocontainer: 'videocontainer',
};

// Функция для преобразования строк Excel в объекты контента
function parseContent(sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return null;

  const rows = xlsx.utils.sheet_to_json(sheet);
  const filteredRows = rows.filter(row => row.id && row.type);
  
  const content = [];
  let currentList = [];

  for (let i = 0; i < filteredRows.length; i++) {
    const row = filteredRows[i];

    // Если это item, добавляем в текущий список
    if (row.type === 'item') {
      currentList.push({
        text: {
          ua: row.ua || '',
          ru: row.ru || '',
        }
      });
      continue;
    }

    // Если было накопленное items, сохраняем список перед переходом на другой тип
    if (currentList.length > 0) {
      content.push({
        type: 'list',
        items: currentList
      });
      currentList = [];
    }

    // Обработка остальных типов через contentHandlers
    const originalType = String(row.type || '').trim();
    const normalizedType = normalizeFieldName(originalType);
    const aliasType = typeAliases[normalizedType] || normalizedType;

    // Сохраняем поведение: squareImage -> image, textLink -> link, videoContainer -> video
    let outputType = originalType;
    if (normalizedType === 'squareimage') outputType = 'image';
    if (normalizedType === 'textlink') outputType = 'link';
    if (normalizedType === 'videocontainer') outputType = 'video';
    const item = { type: outputType };

    const handler = contentHandlers[aliasType];
    if (handler) {
      const extra = handler(row, sheetName);
      // Если обработчик вернул объект с полем `type`, оно может переопределить тип (как в squareImage/textLink/videoContainer)
      if (extra && extra.type) item.type = extra.type;
      Object.assign(item, extra || {});
    }

    content.push(item);
  }

  // Если список остался в конце, добавляем его
  if (currentList.length > 0) {
    content.push({
      type: 'list',
      items: currentList
    });
  }

  return content;
}

// Функция для генерирования файла контента
function generateContentFile(sheetName) {
  const content = parseContent(sheetName);
  
  if (!content) {
    console.log(`⚠️ Лист "${sheetName}" пуст или не найден`);
    return;
  }

  // Нормализуем имя листа (удаляем пробелы, приводим к правильному формату)
  const normalizedName = sheetName
    .trim()                           // Удаляет пробелы в начале/конце
    .replace(/\s+/g, '')              // Удаляет все пробелы
    .replace(/^./, c => c.toLowerCase()); // Первая буква в нижний регистр

  // Генерируем правильное имя экспорта и файла
  // index → indexContent, lesson1 → lesson1Content
  const exportName = normalizedName + 'Content';
  const fileName = normalizedName + 'Content.js';
  
  const jsCode = `// GENERATED FILE: this content is recreated by scripts/generateContent.js\nexport const ${exportName} = ${JSON.stringify(content, null, 2)};\n`;
  
  // Заменяем маркеры на настоящий require
  const fixedCode = jsCode
    .replace(/"__REQUIRE_START__(.+?)__REQUIRE_END__"/g, "require('$1')");
  
  // Создаём директорию lessons если она не существует
  const lessonsDir = path.join(__dirname, '../src/content/lessons');
  if (!fs.existsSync(lessonsDir)) {
    fs.mkdirSync(lessonsDir, { recursive: true });
  }
  
  const outputPath = path.join(lessonsDir, fileName);
  fs.writeFileSync(outputPath, fixedCode);
  console.log(`✅ ${fileName} создан в папке lessons/`);

  generateAppRouteFile(sheetName, exportName);
}

function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

function generateAppRouteFile(sheetName, exportName) {
  const normalizedName = sheetName
    .trim()
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^./, c => c.toLowerCase());

  if (!normalizedName || normalizedName === 'index') {
    return;
  }

  const appDir = path.join(__dirname, '../src/app');
  const routePath = path.join(appDir, `${normalizedName}.tsx`);
  const componentName = toPascalCase(normalizedName);
  const routeCode = `// GENERATED FILE: this route is recreated by scripts/generateContent.js
import ContentPage from '../components/ContentPage';
import { ${exportName} } from '../content/lessons/${normalizedName}Content';

export default function ${componentName}() {
  return <ContentPage title="${componentName}" contentModule={${exportName}} />;
}
`;

  if (fs.existsSync(routePath)) {
    console.log(`ℹ️ Route файл перезаписывается: ${normalizedName}.tsx`);
  }

  fs.writeFileSync(routePath, routeCode);
  console.log(`✅ Route создан/обновлён: src/app/${normalizedName}.tsx`);
}

function containsCyrillic(text) {
  return /[А-Яа-яЁё]/.test(text);
}

function shouldProcessSheet(sheetName, index) {
  // Пропускаем первые три служебных листа в Excel
  if (index < 3) return false;
  // Обрабатываем только листы с английскими названиями
  if (containsCyrillic(sheetName)) return false;
  return true;
}

function cleanGeneratedLessons() {
  const lessonsDir = path.join(__dirname, '../src/content/lessons');
  if (!fs.existsSync(lessonsDir)) return;

  const files = fs.readdirSync(lessonsDir);
  files.forEach(file => {
    if (file.endsWith('Content.js')) {
      const filePath = path.join(lessonsDir, file);
      fs.unlinkSync(filePath);
      console.log(`🧹 Удалён старый lesson: ${file}`);
    }
  });
}

function cleanGeneratedRoutes() {
  const appDir = path.join(__dirname, '../src/app');
  if (!fs.existsSync(appDir)) return;

  const files = fs.readdirSync(appDir);
  files.forEach(file => {
    if (!file.endsWith('.tsx')) return;
    if (file === 'index.tsx' || file === '_layout.tsx') return;

    const filePath = path.join(appDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('// GENERATED FILE: this route is recreated by scripts/generateContent.js')) {
      fs.unlinkSync(filePath);
      console.log(`🧹 Удалён старый route: ${file}`);
    }
  });
}

// Запускаем для всех листов в Excel
try {
  console.log(`📊 Обработка Excel файла: ${filePath}`);
  console.log(`📋 Найдено листов: ${workbook.SheetNames.length}`);
  console.log(`📄 Листы: ${workbook.SheetNames.join(', ')}`);
  console.log('');

  cleanGeneratedLessons();
  cleanGeneratedRoutes();
  console.log('');

  const sheetNamesToProcess = workbook.SheetNames.filter((sheetName, index) => shouldProcessSheet(sheetName, index));
  console.log(`🟢 Обрабатываем листы: ${sheetNamesToProcess.join(', ')}`);
  console.log(`⚠️ Пропускаем листы: ${workbook.SheetNames.filter((sheetName, index) => !shouldProcessSheet(sheetName, index)).join(', ')}`);

  sheetNamesToProcess.forEach(sheetName => {
    generateContentFile(sheetName);
  });

  console.log('');
  console.log('🎉 Все контент файлы успешно сгенерированы!');
} catch (error) {
  console.error('❌ Ошибка:', error.message);
  process.exit(1);
}
