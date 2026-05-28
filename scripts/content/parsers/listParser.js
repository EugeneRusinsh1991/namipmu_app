/**
 * listParser.js - Парсер для обычных списков контента
 * Отвечает за парсинг строк типа 'item' и построение структурированных списков
 */

const { parseLocalizedText } = require('../parsers');

/**
 * Обрабатывает список элементов (items) и возвращает объект контента для 'list'
 * @param {Array} itemTexts - Массив текстов элементов списка
 * @returns {Object} Объект контента типа 'list'
 */
function createListItem(itemTexts) {
  return {
    type: 'list',
    items: itemTexts,
  };
}

/**
 * Парсит и проверяет, является ли строка элементом списка
 * @param {string} normalizedType - Нормализованный тип из row.type
 * @returns {boolean} True если это элемент списка
 */
function isListItem(normalizedType) {
  return normalizedType === 'item';
}

/**
 * Преобразует текст элемента в структурированный объект элемента списка
 * @param {Object} row - Строка данных
 * @returns {Object} Объект элемента списка с текстом
 */
function parseListItemRow(row) {
  return {
    text: parseLocalizedText(row),
  };
}

module.exports = {
  createListItem,
  isListItem,
  parseListItemRow,
};
