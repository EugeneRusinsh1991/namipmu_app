const fs = require('fs');
const path = require('path');
const { PATHS, PROTECTED_ROUTES } = require('./config');

// Удаление старых сгенерированных файлов контента
function cleanGeneratedLessons() {
  if (!fs.existsSync(PATHS.lessonsDir)) return;

  const files = fs.readdirSync(PATHS.lessonsDir);
  files.forEach(file => {
    if (file.endsWith('Content.js')) {
      const filePath = path.join(PATHS.lessonsDir, file);
      fs.unlinkSync(filePath);
      console.log(`🧹 Удалён старый lesson: ${file}`);
    }
  });
}

// Удаление старых сгенерированных маршрутов
function cleanGeneratedRoutes() {
  if (!fs.existsSync(PATHS.appDir)) return;

  const files = fs.readdirSync(PATHS.appDir);
  files.forEach(file => {
    if (!file.endsWith('.tsx')) return;
    if (PROTECTED_ROUTES.includes(file)) return;

    const filePath = path.join(PATHS.appDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('// GENERATED FILE: this route is recreated by scripts/generateContent.js')) {
      fs.unlinkSync(filePath);
      console.log(`🧹 Удалён старый route: ${file}`);
    }
  });
}

module.exports = {
  cleanGeneratedLessons,
  cleanGeneratedRoutes,
};
