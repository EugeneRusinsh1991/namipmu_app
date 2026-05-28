/**
 * quizParser.js - Парсер для Quiz контента
 * Отвечает за парсинг листов с quiz вопросами
 */

const { normalizeFieldName } = require('../utils');
const { getSheetRows } = require('../excelReader');
const { parseLocalizedText } = require('../parsers');
const { findSheetName } = require('./baseParser');

/**
 * Парсит лист с quiz вопросами
 * @param {Object} workbook - Excel workbook объект
 * @param {string} sheetName - Имя листа для парсинга
 * @returns {Object} Объект с quiz данными {title, description, questions}
 */
function parseQuizSheet(workbook, sheetName) {
  const actualSheetName = findSheetName(workbook, sheetName);
  if (!actualSheetName) {
    return { questions: [] };
  }

  const rows = getSheetRows(workbook, actualSheetName) || [];
  const questions = [];
  let currentQuestion = null;
  let quizTitle = undefined;
  let quizDescription = undefined;

  for (const row of rows.filter(row => row.id && row.type)) {
    const normalizedType = normalizeFieldName(String(row.type));

    // Парсим название quiz
    if ((normalizedType === 'title' || normalizedType === 'quiztitle') && !quizTitle) {
      quizTitle = parseLocalizedText(row);
      continue;
    }

    // Парсим описание quiz
    if ((normalizedType === 'text' || normalizedType === 'description') && !quizDescription) {
      quizDescription = parseLocalizedText(row);
      continue;
    }

    // Парсим вопрос
    if (normalizedType === 'question' || normalizedType === 'quizquestion') {
      if (currentQuestion) {
        questions.push(currentQuestion);
      }

      const correctAnswer = String(row.correct || row.answer || row.href || '').trim();
      currentQuestion = {
        question: parseLocalizedText(row),
        options: [],
        correctAnswer,
      };

      // Парсим встроенные опции (option1, option2, ..., option6)
      for (let index = 1; index <= 6; index += 1) {
        const optionText = parseLocalizedText(row, `option${index}`);
        if (Object.values(optionText).some(text => String(text).trim() !== '')) {
          currentQuestion.options.push({
            text: optionText,
            value: String(index),
          });
        }
      }
      continue;
    }

    // Парсим отдельную опцию (для больших списков опций)
    if (normalizedType === 'option' && currentQuestion) {
      const optionText = parseLocalizedText(row);
      const value = String(row.meta || row.href || row.value || currentQuestion.options.length + 1).trim();
      if (Object.values(optionText).some(text => String(text).trim() !== '')) {
        currentQuestion.options.push({ text: optionText, value });
      }
      continue;
    }

    // Парсим правильный ответ
    if ((normalizedType === 'correct' || normalizedType === 'correctanswer') && currentQuestion) {
      currentQuestion.correctAnswer = String(
        row.correct || row.answer || row.href || row.ukr || row.rus || row.eng || row.ger || ''
      ).trim();
      continue;
    }
  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return {
    title: quizTitle,
    description: quizDescription,
    questions,
  };
}

module.exports = {
  parseQuizSheet,
};
