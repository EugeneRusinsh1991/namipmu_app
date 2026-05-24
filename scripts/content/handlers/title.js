const { parseLocalizedText } = require('../parsers');

module.exports = function title(row) {
  return { text: parseLocalizedText(row) };
};
