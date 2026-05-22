// Установка UTF-8 кодировки для консоли Windows
if (process.platform === 'win32') {
  process.stdout.setEncoding('utf-8');
  process.stderr.setEncoding('utf-8');
}

const { loadWorkbook } = require('./content/excelReader');
const { cleanGeneratedLessons, cleanGeneratedRoutes } = require('./content/cleanup');
const { shouldProcessSheet, generateContentFile } = require('./content/fileGenerator');
const { PATHS, UTILITY_SHEETS_COUNT } = require('./content/config');

// Запускаем для всех листов в Excel
try {
  const workbook = loadWorkbook();

  console.log(`📊 Обработка Excel файла: ${PATHS.xlsxFile}`);
  console.log(`📋 Найдено листов: ${workbook.SheetNames.length}`);
  console.log(`📄 Листы: ${workbook.SheetNames.join(', ')}`);
  console.log('');

  cleanGeneratedLessons();
  cleanGeneratedRoutes();
  console.log('');

  const sheetNamesToProcess = workbook.SheetNames.filter((sheetName, index) => shouldProcessSheet(sheetName, index, UTILITY_SHEETS_COUNT));
  console.log(`🟢 Обрабатываем листы: ${sheetNamesToProcess.join(', ')}`);
  console.log(`⚠️ Пропускаем листы: ${workbook.SheetNames.filter((sheetName, index) => !shouldProcessSheet(sheetName, index, UTILITY_SHEETS_COUNT)).join(', ')}`);

  sheetNamesToProcess.forEach(sheetName => {
    generateContentFile(workbook, sheetName);
  });

  console.log('');
  console.log('🎉 Все контент файлы успешно сгенерированы!');
} catch (error) {
  console.error('❌ Ошибка:', error.message);
  process.exit(1);
}
