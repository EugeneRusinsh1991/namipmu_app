const { parseLocalizedText } = require('../parsers');

module.exports = function link(row) {
  return {
    text: parseLocalizedText(row),
    ...(row.href ? { href: row.href } : {}),
  };
};
