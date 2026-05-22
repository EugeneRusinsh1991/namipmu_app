const { getRowField } = require('./utils');
const { processImageField } = require('./imageResolver');

const LANGUAGE_ALIASES = {
  ua: ['ukr', 'ua'],
  ru: ['rus', 'ru'],
  eng: ['eng', 'en'],
  ger: ['ger', 'de'],
};

const LANGUAGES = ['ua', 'ru', 'eng', 'ger'];

function parseSize(value) {
  if (value == null || String(value).trim() === '') return null;
  const trimmed = String(value).trim();
  if (/^\d+(?:\.\d+)?$/.test(trimmed)) {
    const num = Number(trimmed);
    return num > 0 ? num : null;
  }
  return trimmed;
}

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

function parseMetaString(meta) {
  const sizing = {};
  if (meta == null || String(meta).trim() === '') return sizing;

  const parts = String(meta).split(';').map(part => part.trim()).filter(Boolean);
  for (const part of parts) {
    const [key, value] = part.split('=').map(x => x.trim());
    if (!key) continue;
    const lowerKey = key.toLowerCase();
    if (lowerKey === 'w' || lowerKey === 'width') {
      const width = parseSize(value);
      if (width != null) sizing.width = width;
    }
    if (lowerKey === 'h' || lowerKey === 'height') {
      const height = parseSize(value);
      if (height != null) sizing.height = height;
    }
    if (lowerKey === 'aspectratio' || lowerKey === 'ratio') {
      const aspectRatio = parseAspectRatio(value);
      if (aspectRatio != null) sizing.aspectRatio = aspectRatio;
    }
    if (lowerKey === 'resizemode') {
      const mode = String(value || '').trim();
      if (mode) sizing.resizeMode = mode;
    }
  }

  return sizing;
}

function normalizeLangKey(lang) {
  const suffix = lang === 'ua' ? 'UA' : lang === 'ru' ? 'RU' : lang === 'eng' ? 'ENG' : 'GER';
  return suffix;
}

function getLocalizedFieldValue(row, lang, base = '') {
  const aliases = LANGUAGE_ALIASES[lang] || [];
  const values = [];
  if (base) {
    const legacyKey = `${base}${normalizeLangKey(lang)}`;
    values.push(legacyKey);
    for (const alias of aliases) {
      values.push(`${alias}_${base}`);
      values.push(`${base}_${alias}`);
    }
  } else {
    values.push(...aliases);
  }

  for (const field of values) {
    const value = getRowField(row, field);
    if (value != null && String(value).trim() !== '') {
      return String(value).trim();
    }
  }

  return '';
}

function parseLocalizedText(row, base) {
  const result = {};
  for (const lang of LANGUAGES) {
    let value = '';

    if (!base) {
      value = getLocalizedFieldValue(row, lang);
      if (!value && ['title', 'text', 'subtitle', 'eyebrow', 'link'].includes(base)) {
        value = getLocalizedFieldValue(row, lang, base);
      }
    } else if (base === 'sub') {
      value = getLocalizedFieldValue(row, lang, 'sub');
      if (!value) {
        value = getLocalizedFieldValue(row, lang, 'description');
      }
    } else {
      value = getLocalizedFieldValue(row, lang, base);
    }

    result[lang] = value || '';
  }

  return result;
}

function parseImagePair(row, sheetName, bases = ['image']) {
  const result = {};
  let has = false;

  for (const base of bases) {
    for (const lang of LANGUAGES) {
      let value = getLocalizedFieldValue(row, lang, base);
      if (!value && base) {
        value = getLocalizedFieldValue(row, lang);
      }

      if (!value) continue;

      const imagePath = processImageField(value, sheetName);
      if (!imagePath) continue;

      const formattedPath = imagePath.startsWith('http://') || imagePath.startsWith('https://')
        ? imagePath
        : `__REQUIRE_START__../../../assets/${imagePath}__REQUIRE_END__`;

      result[lang] = formattedPath;
      has = true;
    }
    if (has) break;
  }

  if (!has) return null;

  const fallback = result.ua || result.ru || result.eng || result.ger;
  for (const lang of LANGUAGES) {
    if (!result[lang]) {
      result[lang] = fallback;
    }
  }

  return result;
}

function parseImageSizing(row) {
  const sizing = parseMetaString(getRowField(row, 'meta'));

  if (sizing.width == null) {
    const width = parseSize(getRowField(row, 'imageWidth'));
    if (width != null) sizing.width = width;
  }
  if (sizing.height == null) {
    const height = parseSize(getRowField(row, 'imageHeight'));
    if (height != null) sizing.height = height;
  }
  if (sizing.aspectRatio == null) {
    const aspectRatio = parseAspectRatio(getRowField(row, 'imageAspectRatio'));
    if (aspectRatio != null) sizing.aspectRatio = aspectRatio;
  }
  if (!sizing.resizeMode) {
    const resizeMode = getRowField(row, 'imageResizeMode');
    if (resizeMode) sizing.resizeMode = String(resizeMode).trim();
  }

  return sizing;
}

module.exports = {
  parseSize,
  parseAspectRatio,
  parseLocalizedText,
  parseImagePair,
  parseImageSizing,
};
