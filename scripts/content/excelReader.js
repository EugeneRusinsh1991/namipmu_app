const xlsx = require('xlsx');
const fs = require('fs');
const { PATHS } = require('./config');

// Загрузка Excel файла
function loadWorkbook() {
  if (!fs.existsSync(PATHS.xlsxFile)) {
    console.error('❌ Файл content.xlsx не найден!');
    console.error(`Ожидается путь: ${PATHS.xlsxFile}`);
    process.exit(1);
  }
  return xlsx.readFile(PATHS.xlsxFile);
}

// Получение строк из листа Excel в формате JSON
function getSheetRows(workbook, sheetName) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) return null;
  return xlsx.utils.sheet_to_json(sheet);
}

module.exports = {
  loadWorkbook,
  getSheetRows,
};
