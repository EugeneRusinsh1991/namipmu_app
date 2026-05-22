const { loadWorkbook, getSheetRows } = require('./content/excelReader');
const { shouldProcessSheet } = require('./content/fileGenerator');
const { PATHS, UTILITY_SHEETS_COUNT } = require('./content/config');
const { typeMap } = require('./content/contentHandlers');
const { processImageField } = require('./content/imageResolver');
const { getRowField, normalizeFieldName } = require('./content/utils');

const TEXT_TYPES = new Set(['eyebrow', 'title', 'subtitle', 'text', 'link']);
const MEDIA_TYPES = new Set(['heroImage', 'image', 'gif']);

function hasValue(value) {
  return value != null && String(value).trim() !== '';
}

function getLocalizedFields(row, base = '') {
  const prefix = base ? `${base}` : '';
  return {
    ua: getRowField(row, `${prefix}UA`) || getRowField(row, `${prefix}Ua`) || getRowField(row, 'ua') || getRowField(row, 'uaText'),
    ru: getRowField(row, `${prefix}RU`) || getRowField(row, `${prefix}Ru`) || getRowField(row, 'ru') || getRowField(row, 'ruText'),
  };
}

function getMediaFields(row, outputType) {
  const bases = outputType === 'gif' ? ['gif', 'image'] : ['image'];
  const fields = [];

  for (const base of bases) {
    fields.push(
      { label: `${base}UA`, value: getRowField(row, `${base}UA`) || getRowField(row, `${base}Ua`) },
      { label: `${base}RU`, value: getRowField(row, `${base}RU`) || getRowField(row, `${base}Ru`) },
    );
  }

  return fields;
}

function addIssue(issues, level, sheetName, rowNumber, message) {
  issues.push({ level, sheetName, rowNumber, message });
}

function validateRow(row, sheetName, rowNumber, issues) {
  const originalType = String(row.type || '').trim();
  const normalizedType = normalizeFieldName(originalType);

  if (normalizedType === 'item') {
    const text = getLocalizedFields(row);
    if (!hasValue(text.ua) && !hasValue(text.ru)) {
      addIssue(issues, 'warning', sheetName, rowNumber, 'List item has no ru/ua text.');
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
    if (!hasValue(text.ua) && !hasValue(text.ru)) {
      addIssue(issues, 'warning', sheetName, rowNumber, `${outputType} block has no ru/ua text.`);
    }
  }

  if (outputType === 'card') {
    const title = getLocalizedFields(row, 'title');
    if (!hasValue(title.ua) && !hasValue(title.ru)) {
      addIssue(issues, 'warning', sheetName, rowNumber, 'Card has no titleUA/titleRU.');
    }
  }

  if (outputType === 'link' && !hasValue(row.href)) {
    addIssue(issues, 'warning', sheetName, rowNumber, 'Link has no href.');
  }

  if (outputType === 'video' && !hasValue(row.href) && !hasValue(row.imageRU) && !hasValue(row.imageUA)) {
    addIssue(issues, 'warning', sheetName, rowNumber, 'Video has no href or imageRU/imageUA URL.');
  }

  if (MEDIA_TYPES.has(outputType)) {
    const mediaFields = getMediaFields(row, outputType);
    const filledFields = mediaFields.filter(field => hasValue(field.value));

    if (!filledFields.length) {
      addIssue(issues, 'warning', sheetName, rowNumber, `${outputType} block has no image fields.`);
      return;
    }

    for (const field of filledFields) {
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

