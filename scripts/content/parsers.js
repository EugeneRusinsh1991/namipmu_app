const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('typescript');
const { getRowField } = require('./utils');
const { processImageField } = require('./imageResolver');
const { processVideoField } = require('./videoResolver');

function requireTypeScript(filePath) {
  const absolutePath = path.resolve(__dirname, filePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      jsx: ts.JsxEmit.Preserve,
    },
  }).outputText;

  const moduleWrapper = new Module(absolutePath, module.parent);
  moduleWrapper.filename = absolutePath;
  moduleWrapper.paths = Module._nodeModulePaths(path.dirname(absolutePath));
  moduleWrapper._compile(compiled, absolutePath);
  return moduleWrapper.exports;
}

const { IMAGE_SIZES, COMPONENT_SIZES, LAYOUT } = requireTypeScript('../../src/styles/content-dimensions.ts');

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

function parseVideoPair(row, sheetName, bases = ['video']) {
  const result = {};
  let has = false;

  for (const base of bases) {
    for (const lang of LANGUAGES) {
      let value = getLocalizedFieldValue(row, lang, base);
      if (!value && base) {
        value = getLocalizedFieldValue(row, lang);
      }
      if (!value && base) {
        value = getRowField(row, base);
      }

      if (!value) continue;

      const videoPath = processVideoField(value, sheetName);
      if (!videoPath) continue;

      const formattedPath = videoPath.startsWith('http://') || videoPath.startsWith('https://')
        ? videoPath
        : `__REQUIRE_START__../../../assets/${videoPath}__REQUIRE_END__`;

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

function getDefaultImageSizing(type) {
  switch (type) {
    case 'heroImage':
      return {
        width: LAYOUT.contentMaxWidth,
        height: IMAGE_SIZES.hero.height,
      };
    case 'gif':
    case 'video':
      return {
        height: IMAGE_SIZES.video.height,
      };
    case 'image':
    default:
      return {
        height: IMAGE_SIZES.card.height,
      };
  }
}

function parseImageSizing(row, blockType = 'image') {
  const sizing = parseMetaString(getRowField(row, 'meta'));

  const widthRaw = getRowField(row, 'imageWidth');
  const heightRaw = getRowField(row, 'imageHeight');
  const ratioRaw = getRowField(row, 'imageAspectRatio');

  if (sizing.width == null && widthRaw != null) {
    const width = parseSize(widthRaw);
    if (width != null) sizing.width = width;
    else if (String(widthRaw).trim() !== '') {
      console.warn(`Invalid imageWidth value: ${widthRaw}`);
    }
  }

  if (sizing.height == null && heightRaw != null) {
    const height = parseSize(heightRaw);
    if (height != null) sizing.height = height;
    else if (String(heightRaw).trim() !== '') {
      console.warn(`Invalid imageHeight value: ${heightRaw}`);
    }
  }

  if (sizing.aspectRatio == null && ratioRaw != null) {
    const aspectRatio = parseAspectRatio(ratioRaw);
    if (aspectRatio != null) sizing.aspectRatio = aspectRatio;
    else if (String(ratioRaw).trim() !== '') {
      console.warn(`Invalid imageAspectRatio value: ${ratioRaw}`);
    }
  }

  if (!sizing.resizeMode) {
    const resizeMode = getRowField(row, 'imageResizeMode');
    if (resizeMode) sizing.resizeMode = String(resizeMode).trim();
  }

  const result = { ...sizing };
  const defaults = getDefaultImageSizing(blockType);

  if (result.width == null && result.height == null) {
    return { ...defaults, ...result };
  }

  if (result.width != null && result.height == null) {
    if (result.aspectRatio != null) {
      result.height = Math.round(result.width / result.aspectRatio);
    } else {
      result.height = defaults.height;
    }
  }

  if (result.height != null && result.width == null) {
    if (result.aspectRatio != null) {
      result.width = Math.round(result.height * result.aspectRatio);
    } else if (defaults.width != null) {
      result.width = defaults.width;
    }
  }

  if (result.width == null && result.height == null) {
    return { ...defaults, ...result };
  }

  return result;
}

module.exports = {
  parseSize,
  parseAspectRatio,
  parseLocalizedText,
  parseImagePair,
  parseVideoPair,
  parseImageSizing,
};
