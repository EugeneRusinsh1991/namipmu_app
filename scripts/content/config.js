const path = require('path');

// Пути к основным директориям
const PATHS = {
  xlsxFile: path.join(__dirname, '../../src/content/content.xlsx'),
  lessonsDir: path.join(__dirname, '../../src/content/lessons'),
  appDir: path.join(__dirname, '../../src/app'),
  assetsDir: path.join(__dirname, '../../assets'),
};

// Поддерживаемые расширения для изображений (включая GIF)
const SUPPORTED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

// Поддерживаемые расширения для видео
const SUPPORTED_VIDEO_EXTENSIONS = ['.mp4', '.mov', '.webm', '.m4v', '.ogv'];

// Специальные служебные листы (первые N листов пропускаются)
const UTILITY_SHEETS_COUNT = 3;

// Специальные маршруты (не переписываются)
const PROTECTED_ROUTES = ['index.tsx', '_layout.tsx'];

// Карта типов контента для быстрого поиска (используется в contentHandlers)
const CONTENT_TYPE_MAP = {
  image: 'image',
  gif: 'gif',     // GIF обрабатывается как отдельный тип, но использует imageResolver
  video: 'video',
};

module.exports = {
  PATHS,
  SUPPORTED_IMAGE_EXTENSIONS,
  SUPPORTED_VIDEO_EXTENSIONS,
  UTILITY_SHEETS_COUNT,
  PROTECTED_ROUTES,
  CONTENT_TYPE_MAP,
};
