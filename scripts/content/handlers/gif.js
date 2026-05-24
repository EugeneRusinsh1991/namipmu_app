const { parseImageSizing, parseImagePair } = require('../parsers');

module.exports = function gif(row, sheetName) {
  const res = { ...parseImageSizing(row) };
  const srcPair = parseImagePair(row, sheetName, ['gif', 'image']);
  if (srcPair) {
    res.src = srcPair;
  }
  return res;
};
