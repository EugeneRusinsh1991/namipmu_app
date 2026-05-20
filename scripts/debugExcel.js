const xlsx = require('xlsx');
const path = require('path');
const workbook = xlsx.readFile(path.join(__dirname, '../src/content/content.xlsx'));
const sheetName = 'skin';
const sheet = workbook.Sheets[sheetName];
if (!sheet) {
  console.error('Sheet not found:', sheetName);
  process.exit(1);
}
const rows = xlsx.utils.sheet_to_json(sheet, { defval: '' });
rows.forEach((row, index) => {
  if (row.type === 'image' || row.type === 'squareImage' || row.id === 5) {
    console.log('row', index + 2, JSON.stringify({
      id: row.id,
      type: row.type,
      imageRU: row.imageRU,
      imageUA: row.imageUA,
      imageWidth: row.imageWidth,
      imageHeight: row.imageHeight,
      imageAspectRatio: row.imageAspectRatio,
      imageResizeMode: row.imageResizeMode
    }, null, 2));
  }
});
