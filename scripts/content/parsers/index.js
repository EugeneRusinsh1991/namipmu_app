/**
 * parsers/index.js - Экспорт всех парсеров и утилит
 * Главная точка входа для модуля parsers
 */

const { flushList, findSheetName } = require('./baseParser');
const { parseQuizSheet } = require('./quizParser');
const { parseChecklistSheet } = require('./checklistParser');
const { createListItem, isListItem, parseListItemRow } = require('./listParser');
const { parseContent } = require('./parserFactory');

module.exports = {
  // Базовые утилиты
  flushList,
  findSheetName,
  
  // Парсеры специализированного контента
  parseQuizSheet,
  parseChecklistSheet,
  
  // Утилиты для списков
  createListItem,
  isListItem,
  parseListItemRow,
  
  // Главная функция
  parseContent,
};
