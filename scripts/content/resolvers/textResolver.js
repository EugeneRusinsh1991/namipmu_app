function normalizeFieldName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '');
}

function getRowField(row, fieldName) {
  const normalized = normalizeFieldName(fieldName);
  if (!normalized) return undefined;
  if (row[fieldName] !== undefined) return row[fieldName];

  for (const key of Object.keys(row)) {
    if (normalizeFieldName(key) === normalized) {
      return row[key];
    }
  }

  return undefined;
}

function containsCyrillic(text) {
  return /[А-Яа-яЁё]/.test(text);
}

module.exports = {
  normalizeFieldName,
  getRowField,
  containsCyrillic,
};
