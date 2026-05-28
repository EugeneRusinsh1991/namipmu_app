const { parseImageSizing, parseVideoPair } = require('../parsers');

module.exports = function video(row, sheetName) {
  const res = { ...parseImageSizing(row, 'video') };
  const srcPair = parseVideoPair(row, sheetName, ['video']);
  if (srcPair) {
    res.src = srcPair;
    return res;
  }

  const url = row.href || row.ukr || row.rus || row.eng || row.ger;
  res.url = url && String(url).trim()
    ? String(url).trim()
    : 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  return res;
};
