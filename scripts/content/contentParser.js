const { normalizeFieldName } = require('./utils');
const { contentHandlers, typeMap } = require('./contentHandlers');

function flushList(content, currentList) {
  if (!currentList.length) return [];

  content.push({
    type: 'list',
    items: currentList,
  });

  return [];
}

function parseContent(rows) {
  const filteredRows = rows.filter(row => row.id && row.type);
  const content = [];
  let currentList = [];

  for (const row of filteredRows) {
    const originalType = String(row.type || '').trim();
    const normalizedType = normalizeFieldName(originalType);

    if (normalizedType === 'item') {
      currentList.push({
        text: {
          ua: row.ua || '',
          ru: row.ru || '',
        },
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

    content.push(item);
  }

  flushList(content, currentList);
  return content;
}

module.exports = {
  parseContent,
};

