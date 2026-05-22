const { normalizeFieldName } = require('./utils');
const { contentHandlers, typeAliases } = require('./contentHandlers');
const { parseLocalizedText } = require('./parsers');

// Преобразование строк Excel в объекты контента
function parseContent(rows) {
  const filteredRows = rows.filter(row => row.id && row.type);
  
  const content = [];
  let currentList = [];

  for (let i = 0; i < filteredRows.length; i++) {
    const row = filteredRows[i];
    const sheetName = row.__sheetName; // Передается при вызове

    // Если это item, добавляем в текущий список
    if (row.type === 'item') {
      currentList.push({
        text: {
          ua: row.ua || '',
          ru: row.ru || '',
        }
      });
      continue;
    }

    // Если было накопленное items, сохраняем список перед переходом на другой тип
    if (currentList.length > 0) {
      content.push({
        type: 'list',
        items: currentList
      });
      currentList = [];
    }

    // Обработка остальных типов через contentHandlers
    const originalType = String(row.type || '').trim();
    const normalizedType = normalizeFieldName(originalType);
    const aliasType = typeAliases[normalizedType] || normalizedType;

    // Сохраняем поведение: squareImage -> image, textLink -> link, videoContainer -> video
    let outputType = originalType;
    if (normalizedType === 'squareimage') outputType = 'image';
    if (normalizedType === 'textlink') outputType = 'link';
    if (normalizedType === 'videocontainer') outputType = 'video';
    const item = { type: outputType };

    const handler = contentHandlers[aliasType];
    if (handler) {
      const extra = handler(row, sheetName);
      if (extra && extra.type) item.type = extra.type;
      Object.assign(item, extra || {});
    }

    content.push(item);
  }

  // Если список остался в конце, добавляем его
  if (currentList.length > 0) {
    content.push({
      type: 'list',
      items: currentList
    });
  }

  return content;
}

module.exports = {
  parseContent,
};
