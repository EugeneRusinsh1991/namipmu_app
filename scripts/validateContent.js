const { loadWorkbook, getSheetRows } = require('./content/excelReader');
const { shouldProcessSheet } = require('./content/fileGenerator');
const { PATHS, UTILITY_SHEETS_COUNT } = require('./content/config');
const { typeMap } = require('./content/contentHandlers');
const { processImageField } = require('./content/imageResolver');
const { getRowField, normalizeFieldName } = require('./content/utils');

const TEXT_TYPES = new Set(['eyebrow', 'title', 'subtitle', 'text', 'link']);
const MEDIA_TYPES = new Set(['heroImage', 'image', 'gif']);
const LANG_ALIASES = {
  ua: ['ukr', 'ua'],
  ru: ['rus', 'ru'],
  eng: ['eng', 'en'],
  ger: ['ger', 'de'],
};

function hasValue(value) {
  return value != null && String(value).trim() !== '';
}

function getLocalizedFields(row, base = '') {
  const result = {};
  const suffix = base ? `_${base}` : '';
  for (const [lang, aliases] of Object.entries(LANG_ALIASES)) {
    let value = '';
    for (const alias of aliases) {
      const field = `${alias}${suffix}`;
      const candidate = getRowField(row, field);
      if (hasValue(candidate)) {
        value = candidate;
        break;
      }
    }

    if (!value && base === 'sub') {
      const fallback = getRowField(row, `description${lang === 'ua' ? 'UA' : lang === 'ru' ? 'RU' : lang.toUpperCase()}`);
      if (hasValue(fallback)) value = fallback;
    }

    result[lang] = value || '';
  }

  return result;
}

function getMediaFields(row, outputType) {
  const values = [];
  const aliasSources = ['ukr', 'ua', 'rus', 'ru', 'eng', 'ger'];

  for (const alias of aliasSources) {
    const value = getRowField(row, alias);
    if (hasValue(value)) {
      values.push({ label: alias, value });
    }
  }

  if (!values.length) {
    const bases = outputType === 'gif' ? ['gif', 'image'] : ['image'];
    for (const base of bases) {
      ['UA', 'RU', 'ENG', 'GER'].forEach(code => {
        const value = getRowField(row, `${base}${code}`);
        if (hasValue(value)) {
          values.push({ label: `${base}${code}`, value });
        }
      });
    }
  }

  return values;
}

function addIssue(issues, level, sheetName, rowNumber, message) {
  issues.push({ level, sheetName, rowNumber, message });
}

function validateRow(row, sheetName, rowNumber, issues) {
  const originalType = String(row.type || '').trim();
  const normalizedType = normalizeFieldName(originalType);

  if (normalizedType === 'item') {
    const text = getLocalizedFields(row);
    if (!Object.values(text).some(hasValue)) {
      addIssue(issues, 'warning', sheetName, rowNumber, 'List item has no localized text.');
    }
    return;
  }

  const outputType = typeMap[normalizedType];
  if (!outputType) {
    addIssue(issues, 'error', sheetName, rowNumber, `Unknown block type "${originalType}".`);
    return;
  }

  if (TEXT_TYPES.has(outputType)) {
    const text = getLocalizedFields(row);
    if (!Object.values(text).some(hasValue)) {
      addIssue(issues, 'warning', sheetName, rowNumber, `${outputType} block has no localized text.`);
    }
  }

  if (outputType === 'card') {
    const title = getLocalizedFields(row);
    if (!Object.values(title).some(hasValue)) {
      addIssue(issues, 'warning', sheetName, rowNumber, 'Card has no title in main language columns.');
    }
  }

  if (outputType === 'link' && !hasValue(row.href)) {
    addIssue(issues, 'warning', sheetName, rowNumber, 'Link has no href.');
  }

  if (outputType === 'video' && !hasValue(row.href) && !Object.values(getLocalizedFields(row)).some(hasValue)) {
    addIssue(issues, 'warning', sheetName, rowNumber, 'Video has no href or URL in language columns.');
  }

  if (MEDIA_TYPES.has(outputType)) {
    const mediaFields = getMediaFields(row, outputType);
    if (!mediaFields.length) {
      addIssue(issues, 'warning', sheetName, rowNumber, `${outputType} block has no image fields.`);
      return;
    }

    for (const field of mediaFields) {
      const resolved = processImageField(String(field.value), sheetName);
      if (!resolved) {
        addIssue(issues, 'warning', sheetName, rowNumber, `${field.label} asset not found: ${field.value}`);
      }
    }
  }
}

function validateContent() {
  const workbook = loadWorkbook();
  const issues = [];
  const sheetNamesToProcess = workbook.SheetNames.filter((sheetName, index) =>
    shouldProcessSheet(sheetName, index, UTILITY_SHEETS_COUNT)
  );

  for (const sheetName of sheetNamesToProcess) {
    const rows = getSheetRows(workbook, sheetName) || [];
    rows.forEach((row, index) => {
      if (!row.id || !row.type) return;
      validateRow(row, sheetName, index + 2, issues);
    });
  }

  const errors = issues.filter(issue => issue.level === 'error');
  const warnings = issues.filter(issue => issue.level === 'warning');

  console.log(`Validated content file: ${PATHS.xlsxFile}`);
  console.log(`Processed sheets: ${sheetNamesToProcess.join(', ') || '(none)'}`);
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);

  for (const issue of issues) {
    const prefix = issue.level === 'error' ? 'ERROR' : 'WARN';
    console.log(`${prefix} ${issue.sheetName}:${issue.rowNumber} ${issue.message}`);
  }

  if (errors.length > 0) {
    process.exit(1);
  }
}

validateContent();

