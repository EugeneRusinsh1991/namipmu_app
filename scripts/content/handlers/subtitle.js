const { parseLocalizedText } = require('../parsers');

module.exports = function subtitle(row) {
  return { text: parseLocalizedText(row) };
};
