/**
 * checklistParser.js - Парсер для Checklist контента
 * Отвечает за парсинг листов с checklist элементами
 */

const { normalizeFieldName } = require('../utils');
const { getSheetRows } = require('../excelReader');
const { parseLocalizedText } = require('../parsers');
const { findSheetName } = require('./baseParser');

/**
 * Парсит лист с checklist элементами
 * @param {Object} workbook - Excel workbook объект
 * @param {string} sheetName - Имя листа для парсинга
 * @returns {Object} Объект с checklist данными {title, description, items}
 */
function parseChecklistSheet(workbook, sheetName) {
  const actualSheetName = findSheetName(workbook, sheetName);
  if (!actualSheetName) {
    return { items: [] };
  }

  const rows = getSheetRows(workbook, actualSheetName) || [];
  const items = [];
  let checklistTitle = undefined;
  let checklistDescription = undefined;

  for (const row of rows.filter(row => row.id && row.type)) {
    const normalizedType = normalizeFieldName(String(row.type));

    // Парсим название checklist
    if ((normalizedType === 'title' || normalizedType === 'checklisttitle') && !checklistTitle) {
      checklistTitle = parseLocalizedText(row);
      continue;
    }

    // Парсим описание checklist
    if (
      (normalizedType === 'text' || 
       normalizedType === 'description' || 
       normalizedType === 'subtitle') && 
      !checklistDescription
    ) {
      checklistDescription = parseLocalizedText(row);
      continue;
    }

    // Парсим элементы checklist
    if (['item', 'checkitem', 'checklistitem'].includes(normalizedType)) {
      items.push({ text: parseLocalizedText(row) });
    }
  }

  return {
    title: checklistTitle,
    description: checklistDescription,
    items,
  };
}

module.exports = {
  parseChecklistSheet,
};
