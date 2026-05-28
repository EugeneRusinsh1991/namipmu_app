/**
 * parserFactory.js - Фабрика парсеров и главная точка входа
 * Определяет тип контента и делегирует парсинг соответствующему модулю
 */

const { normalizeFieldName } = require('../utils');
const { contentHandlers, typeMap } = require('../contentHandlers');
const { flushList } = require('./baseParser');
const { parseQuizSheet } = require('./quizParser');
const { parseChecklistSheet } = require('./checklistParser');
const { isListItem, parseListItemRow } = require('./listParser');
const { parseLocalizedText } = require('../parsers');

/**
 * Основная функция парсинга контента
 * Преобразует строки из Excel в структурированный контент
 * Определяет тип каждого элемента и применяет соответствующий парсер
 * 
 * @param {Array} rows - Массив строк из листа (уже отфильтрованных)
 * @param {Object} workbook - Excel workbook объект (для парсинга quiz и checklist)
 * @returns {Array} Массив контента с различными типами элементов
 */
function parseContent(rows, workbook) {
  const filteredRows = rows.filter(row => row.id && row.type);
  const content = [];
  let currentList = [];

  for (const row of filteredRows) {
    const originalType = String(row.type || '').trim();
    const normalizedType = normalizeFieldName(originalType);

    // Обработка элементов списка
    if (isListItem(normalizedType)) {
      currentList.push(parseListItemRow(row));
      continue;
    }

    // Закрыть текущий список перед обработкой другого типа контента
    currentList = flushList(content, currentList);

    // Определяем выходной тип контента (может быть переменен обработчиком)
    const outputType = typeMap[normalizedType] || originalType;
    const item = { type: outputType };
    
    // Применяем соответствующий обработчик контента
    const handler = contentHandlers[outputType];
    if (handler) {
      const extra = handler(row, row.__sheetName, { originalType, normalizedType, outputType });
      if (extra && extra.type) item.type = extra.type;
      Object.assign(item, extra || {});
    }

    // Парсим quiz если тип='quiz' и есть ссылка на лист
    if (item.type === 'quiz' && item.href) {
      const quizData = parseQuizSheet(workbook, item.href);
      if (quizData.title && !item.title) item.title = quizData.title;
      if (quizData.description) item.description = quizData.description;
      item.questions = quizData.questions || [];
    }

    // Парсим checklist если тип='checklist' и есть ссылка на лист
    if (item.type === 'checklist' && item.href) {
      const checklistData = parseChecklistSheet(workbook, item.href);
      if (checklistData.title && !item.title) item.title = checklistData.title;
      if (checklistData.description) item.description = checklistData.description;
      item.items = checklistData.items || [];
    }

    content.push(item);
  }

  // Закрыть оставшийся список в конце
  flushList(content, currentList);
  
  return content;
}

module.exports = {
  parseContent,
};
