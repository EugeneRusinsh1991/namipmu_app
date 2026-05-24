const { parseImageSizing, parseImagePair } = require('../parsers');

module.exports = function heroImage(row, sheetName) {
  const res = { ...parseImageSizing(row) };
  const imagePair = parseImagePair(row, sheetName, ['image']);
  if (imagePair) res.image = imagePair;
  return res;
};
