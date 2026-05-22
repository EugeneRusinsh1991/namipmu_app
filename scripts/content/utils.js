// Нормализация имени поля (для поиска с игнорированием регистра и разделителей)
function normalizeFieldName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '');
}

// Получение значения поля из строки Excel с нормализацией имени
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

// Проверка наличия кириллицы в тексте
function containsCyrillic(text) {
  return /[А-Яа-яЁё]/.test(text);
}

// Преобразование строки в PascalCase
function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

module.exports = {
  normalizeFieldName,
  getRowField,
  containsCyrillic,
  toPascalCase,
};
