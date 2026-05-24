const { parseLocalizedText } = require('../parsers');

module.exports = function text(row) {
  return { text: parseLocalizedText(row) };
};
