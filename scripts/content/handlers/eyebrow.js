const { parseLocalizedText } = require('../parsers');

module.exports = function eyebrow(row) {
  return { text: parseLocalizedText(row) };
};
