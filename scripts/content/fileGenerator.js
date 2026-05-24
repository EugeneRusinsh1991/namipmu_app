const fs = require('fs');
const path = require('path');
const { PATHS } = require('./config');
const { normalizeSheetName, toPascalCase } = require('./namingStrategy');
const { createContentFileTemplate, createRouteFileTemplate } = require('./templates');
const { parseContent } = require('./contentParser');
const { getSheetRows } = require('./excelReader');
const { validateContentSchema } = require('./schema');
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

  const content = parseContent(rows, workbook);
  
  if (!content) {
    console.log(`⚠️ Лист "${sheetName}" пуст или не найден`);
    return;
  }

  validateContentSchema(content, sheetName);

  // Используем единую функцию нормализации
  const normalizedName = normalizeSheetName(sheetName);
  
  if (!normalizedName) {
    console.log(`⚠️ Не удалось нормализировать имя листа: "${sheetName}"`);
    return;
  }

  const exportName = `${normalizedName}Content`;
  const fileName = `${normalizedName}Content.js`;
  const jsCode = createContentFileTemplate(exportName, content);

  const fixedCode = jsCode.replace(/"__REQUIRE_START__(.+?)__REQUIRE_END__"/g, (match, filePath) => {
    const escapedPath = String(filePath).replace(/\\/g, '\\\\');
    return `require('${escapedPath}')`;
  });

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
  const normalizedName = normalizeSheetName(sheetName);

  if (!normalizedName || normalizedName === 'index') {
    return;
  }

  if (!fs.existsSync(PATHS.appDir)) {
    fs.mkdirSync(PATHS.appDir, { recursive: true });
  }

  const routePath = path.join(PATHS.appDir, `${normalizedName}.tsx`);
  const componentName = toPascalCase(normalizedName);
  const routeCode = createRouteFileTemplate(componentName, exportName, normalizedName);

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
