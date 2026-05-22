const { getRowField } = require('./utils');
const { processImageField } = require('./imageResolver');

// Парсирование размера (число или строка)
function parseSize(value) {
  if (value == null || String(value).trim() === '') return null;
  const trimmed = String(value).trim();
  if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
    const num = Number(trimmed);
    return num > 0 ? num : null;
  }
  return trimmed;
}

// Парсирование соотношения сторон (1.5, 1:1, 1x2 и т.п.)
function parseAspectRatio(value) {
  if (value == null || String(value).trim() === '') return null;
  const trimmed = String(value).trim();
  const ratioMatch = trimmed.match(/^([\d.]+)\s*[:xX]\s*([\d.]+)$/);
  if (ratioMatch) {
    const width = Number(ratioMatch[1]);
    const height = Number(ratioMatch[2]);
    if (width > 0 && height > 0) {
      return width / height;
    }
  }
  const num = Number(trimmed);
  return Number.isFinite(num) && num > 0 ? num : null;
}

// Парсирование локализованного текста
// Если указан base (например 'title'), ищет titleUA/titleRU
function parseLocalizedText(row, base) {
  if (base) {
    const uaKey = `${base}UA`;
    const ruKey = `${base}RU`;
    const uaVal = row[uaKey] || row[`${base}Ua`] || row[uaKey.toLowerCase()];
    const ruVal = row[ruKey] || row[`${base}Ru`] || row[ruKey.toLowerCase()];
    return {
      ua: uaVal || '',
      ru: ruVal || '',
    };
  }

  const ua = row.ua || row.uaText || '';
  const ru = row.ru || row.ruText || '';
  return { ua: ua || '', ru: ru || '' };
}

// Парсирование пары изображений (UA/RU) с заполнением error.jpg при отсутствии
function parseImagePair(row, sheetName, bases = ['image']) {
  const result = {};
  let has = false;

  for (const base of bases) {
    const uaField = `${base}UA`;
    const ruField = `${base}RU`;
    const uaVal = row[uaField] || row[`${base}Ua`] || null;
    const ruVal = row[ruField] || row[`${base}Ru`] || null;

    if (uaVal) {
      const imagePath = processImageField(uaVal, sheetName);
      result.ua = imagePath
        ? `__REQUIRE_START__../../../assets/${imagePath}__REQUIRE_END__`
        : `__REQUIRE_START__../../../assets/images/error.jpg__REQUIRE_END__`;
      has = true;
    }

    if (ruVal) {
      const imagePath = processImageField(ruVal, sheetName);
      result.ru = imagePath
        ? `__REQUIRE_START__../../../assets/${imagePath}__REQUIRE_END__`
        : `__REQUIRE_START__../../../assets/images/error.jpg__REQUIRE_END__`;
      has = true;
    }

    if (has) break;
  }

  if (!has) return null;

  // Синхронизация языков: если только один заполнен — копируем на другой
  if (result.ua && !result.ru) result.ru = result.ua;
  if (result.ru && !result.ua) result.ua = result.ru;

  return result;
}

// Парсирование размеров/аспектов/resizeMode изображения
function parseImageSizing(row) {
  const width = parseSize(getRowField(row, 'imageWidth'));
  const height = parseSize(getRowField(row, 'imageHeight'));
  const aspectRatio = parseAspectRatio(getRowField(row, 'imageAspectRatio'));
  const resizeMode = getRowField(row, 'imageResizeMode') ? String(getRowField(row, 'imageResizeMode')).trim() : undefined;
  const sizing = {};
  if (width != null) sizing.width = width;
  if (height != null) sizing.height = height;
  if (aspectRatio != null) sizing.aspectRatio = aspectRatio;
  if (resizeMode) sizing.resizeMode = resizeMode;
  return sizing;
}

module.exports = {
  parseSize,
  parseAspectRatio,
  parseLocalizedText,
  parseImagePair,
  parseImageSizing,
};
