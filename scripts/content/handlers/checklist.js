const { parseLocalizedText } = require('../parsers');

module.exports = function checklist(row) {
  return {
    title: parseLocalizedText(row),
    description: parseLocalizedText(row, 'sub'),
    href: row.href ? row.href : undefined,
    items: [],
  };
};
