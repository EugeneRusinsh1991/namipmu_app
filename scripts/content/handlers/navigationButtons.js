const { parseLocalizedText } = require('../parsers');

module.exports = function navigationButtons(row) {
  const nextText = parseLocalizedText(row);
  const res = {
    backText: {
      ru: 'Назад',
      ua: 'Назад',
      eng: 'Back',
      ger: 'Zurück',
    },
    backHref: '/',
    nextText,
  };

  if (row.href) {
    res.href = row.href;
  }

  return res;
};
