const { parseImagePair, parseLocalizedText } = require('../parsers');

module.exports = function card(row, sheetName, context = {}) {
  const res = {};
  const imagePair = parseImagePair(row, sheetName, ['image']);
  if (imagePair) res.image = imagePair;

  res.title = parseLocalizedText(row);
  res.description = parseLocalizedText(row, 'sub');

  if (context.normalizedType === 'cardbig') {
    res.size = 'big';
  }
  if (context.normalizedType === 'cardsmall') {
    res.size = 'small';
  }

  if (row.href) {
    res.href = row.href;
  }

  return res;
};
