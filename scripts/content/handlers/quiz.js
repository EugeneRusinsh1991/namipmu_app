const { parseLocalizedText } = require('../parsers');

module.exports = function quiz(row) {
  return {
    title: parseLocalizedText(row),
    href: row.href ? row.href : undefined,
    questions: [],
  };
};
