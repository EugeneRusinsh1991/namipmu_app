const fs = require('fs');
const path = require('path');
const { PATHS, PROTECTED_ROUTES } = require('./config');
const { normalizeFieldName, toPascalCase } = require('./utils');
const { parseContent } = require('./contentParser');
const { getSheetRows } = require('./excelReader');

// Проверка, нужно ли обрабатывать лист (фильтр служебных листов)
function shouldProcessSheet(sheetName, index, utilitySheetCount = 3) {
  if (index < utilitySheetCount) return false;
  // Обрабатываем только листы с английскими названиями (без кириллицы)
  return !/[А-Яа-яЁё]/.test(sheetName);
}

// Генерирование файла контента
function generateContentFile(workbook, sheetName) {
  const rows = getSheetRows(workbook, sheetName);
  if (!rows || rows.length === 0) {
    console.log(`⚠️ Лист "${sheetName}" пуст или не найден`);
    return;
  }

  // Добавляем имя листа к каждой строке для использования в parseContent
  rows.forEach(row => {
    row.__sheetName = sheetName;
  });

  const content = parseContent(rows);
  
  if (!content) {
    console.log(`⚠️ Лист "${sheetName}" пуст или не найден`);
    return;
  }

  // Нормализуем имя листа
  const normalizedName = sheetName
    .trim()
    .replace(/\s+/g, '')
    .replace(/^./, c => c.toLowerCase());

  const exportName = normalizedName + 'Content';
  const fileName = normalizedName + 'Content.js';
  
  const jsCode = `// GENERATED FILE: this content is recreated by scripts/generateContent.js\nexport const ${exportName} = ${JSON.stringify(content, null, 2)};\n`;
  
  // Заменяем маркеры на настоящий require
  const fixedCode = jsCode
    .replace(/"__REQUIRE_START__(.+?)__REQUIRE_END__"/g, "require('$1')");
  
  // Создаём директорию lessons если она не существует
  if (!fs.existsSync(PATHS.lessonsDir)) {
    fs.mkdirSync(PATHS.lessonsDir, { recursive: true });
  }
  
  const outputPath = path.join(PATHS.lessonsDir, fileName);
  fs.writeFileSync(outputPath, fixedCode);
  console.log(`✅ ${fileName} создан в папке lessons/`);

  generateAppRouteFile(sheetName, exportName);
}

// Генерирование маршрута приложения
function generateAppRouteFile(sheetName, exportName) {
  const normalizedName = sheetName
    .trim()
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^./, c => c.toLowerCase());

  if (!normalizedName || normalizedName === 'index') {
    return;
  }

  if (!fs.existsSync(PATHS.appDir)) {
    fs.mkdirSync(PATHS.appDir, { recursive: true });
  }

  const routePath = path.join(PATHS.appDir, `${normalizedName}.tsx`);
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

module.exports = {
  shouldProcessSheet,
  generateContentFile,
  generateAppRouteFile,
};
