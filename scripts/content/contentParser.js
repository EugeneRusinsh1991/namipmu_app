/**
 * contentParser.js - Adapter для обратной совместимости
 * 
 * ⚠️ DEPRECATED: Используй напрямую из parsers/parserFactory.js
 * 
 * Этот файл реэкспортирует parseContent для поддержания совместимости
 * с существующим кодом (fileGenerator.js и др.)
 * 
 * Новая структура:
 * - parsers/baseParser.js       - Общие утилиты (flushList, findSheetName)
 * - parsers/quizParser.js       - Парсинг Quiz контента
 * - parsers/checklistParser.js  - Парсинг Checklist контента
 * - parsers/listParser.js       - Парсинг List контента
 * - parsers/parserFactory.js    - Главная точка входа (parseContent)
 */

const { parseContent } = require('./parsers/parserFactory');

module.exports = {
  parseContent,
};

