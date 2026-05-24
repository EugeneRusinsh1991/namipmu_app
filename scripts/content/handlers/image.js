const { parseImageSizing, parseImagePair } = require('../parsers');

module.exports = function image(row, sheetName) {
  const res = { ...parseImageSizing(row) };
  const srcPair = parseImagePair(row, sheetName, ['image']);
  if (srcPair) {
    res.src = srcPair;
  }
  return res;
};
