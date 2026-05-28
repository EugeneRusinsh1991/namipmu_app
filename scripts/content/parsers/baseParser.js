/**
 * baseParser.js - Общие утилиты для парсинга контента
 * Содержит вспомогательные функции, используемые всеми парсерами
 */

const { normalizeFieldName } = require('../utils');

/**
 * Очищает текущий список и добавляет его в контент
 * @param {Array} content - Массив с контентом
 * @param {Array} currentList - Текущий список для добавления
 * @returns {Array} Пустой массив (для очистки currentList)
 */
function flushList(content, currentList) {
  if (!currentList.length) return [];

  content.push({
    type: 'list',
    items: currentList,
  });

  return [];
}

/**
 * Находит точное имя листа в workbook
 * Сначала ищет точное совпадение, потом нормализованное
 * @param {Object} workbook - Excel workbook объект
 * @param {string} sheetName - Имя листа для поиска
 * @returns {string|null} Найденное имя листа или null
 */
function findSheetName(workbook, sheetName) {
  if (!workbook || !sheetName) return null;
  
  // Ищем точное совпадение
  const exact = workbook.SheetNames.find(name => name === sheetName);
  if (exact) return exact;
  
  // Ищем нормализованное совпадение
  const normalizedTarget = normalizeFieldName(sheetName);
  return workbook.SheetNames.find(
    name => normalizeFieldName(name) === normalizedTarget
  ) || null;
}

module.exports = {
  flushList,
  findSheetName,
};
