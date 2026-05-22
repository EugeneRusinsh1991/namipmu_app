const path = require('path');

// Пути к основным директориям
const PATHS = {
  xlsxFile: path.join(__dirname, '../../src/content/content.xlsx'),
  lessonsDir: path.join(__dirname, '../../src/content/lessons'),
  appDir: path.join(__dirname, '../../src/app'),
  assetsDir: path.join(__dirname, '../../assets'),
};

// Поддерживаемые расширения для изображений
const SUPPORTED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// Поддерживаемые расширения для видео
const SUPPORTED_VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm', '.m4v', '.ogv'];

// Специальные служебные листы (первые N листов пропускаются)
const UTILITY_SHEETS_COUNT = 3;

// Специальные маршруты (не переписываются)
const PROTECTED_ROUTES = ['index.tsx', '_layout.tsx'];

module.exports = {
  PATHS,
  SUPPORTED_IMAGE_EXTENSIONS,
  UTILITY_SHEETS_COUNT,
  PROTECTED_ROUTES,
};
