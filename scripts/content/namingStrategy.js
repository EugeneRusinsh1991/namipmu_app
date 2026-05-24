function normalizeSheetName(sheetName) {
  if (!sheetName) return '';

  return String(sheetName)
    .trim()
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^./, (char) => char.toLowerCase());
}

function toPascalCase(str) {
  if (!str) return '';

  return String(str)
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

module.exports = {
  normalizeSheetName,
  toPascalCase,
};
