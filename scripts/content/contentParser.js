const { normalizeFieldName } = require('./utils');
const { getSheetRows } = require('./excelReader');
const { parseLocalizedText } = require('./parsers');
const { contentHandlers, typeMap } = require('./contentHandlers');

function flushList(content, currentList) {
  if (!currentList.length) return [];

  content.push({
    type: 'list',
    items: currentList,
  });

  return [];
}

function findSheetName(workbook, sheetName) {
  if (!workbook || !sheetName) return null;
  const exact = workbook.SheetNames.find(name => name === sheetName);
  if (exact) return exact;
  const normalizedTarget = normalizeFieldName(sheetName);
  return workbook.SheetNames.find(name => normalizeFieldName(name) === normalizedTarget) || null;
}

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

    if ((normalizedType === 'title' || normalizedType === 'quiztitle') && !quizTitle) {
      quizTitle = parseLocalizedText(row);
      continue;
    }

    if ((normalizedType === 'text' || normalizedType === 'description') && !quizDescription) {
      quizDescription = parseLocalizedText(row);
      continue;
    }

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

    if (normalizedType === 'option' && currentQuestion) {
      const optionText = parseLocalizedText(row);
      const value = String(row.meta || row.href || row.value || currentQuestion.options.length + 1).trim();
      if (Object.values(optionText).some(text => String(text).trim() !== '')) {
        currentQuestion.options.push({ text: optionText, value });
      }
      continue;
    }

    if ((normalizedType === 'correct' || normalizedType === 'correctanswer') && currentQuestion) {
      currentQuestion.correctAnswer = String(row.correct || row.answer || row.href || row.ukr || row.rus || row.eng || row.ger || '').trim();
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

function parseContent(rows, workbook) {
  const filteredRows = rows.filter(row => row.id && row.type);
  const content = [];
  let currentList = [];

  for (const row of filteredRows) {
    const originalType = String(row.type || '').trim();
    const normalizedType = normalizeFieldName(originalType);

    if (normalizedType === 'item') {
      currentList.push({
        text: parseLocalizedText(row),
      });
      continue;
    }

    currentList = flushList(content, currentList);

    const outputType = typeMap[normalizedType] || originalType;
    const item = { type: outputType };
    const handler = contentHandlers[outputType];

    if (handler) {
      const extra = handler(row, row.__sheetName, { originalType, normalizedType, outputType });
      if (extra && extra.type) item.type = extra.type;
      Object.assign(item, extra || {});
    }

    if (item.type === 'quiz' && item.href) {
      const quizData = parseQuizSheet(workbook, item.href);
      if (quizData.title && !item.title) item.title = quizData.title;
      if (quizData.description) item.description = quizData.description;
      item.questions = quizData.questions || [];
    }

    content.push(item);
  }

  flushList(content, currentList);
  return content;
}

module.exports = {
  parseContent,
};

