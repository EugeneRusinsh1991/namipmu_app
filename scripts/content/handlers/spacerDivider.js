const { parseLocalizedText } = require('../parsers');

module.exports = function spacerDivider(row) {
  return {
    title: parseLocalizedText(row),
  };
};
