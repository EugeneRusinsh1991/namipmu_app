import { typographyStyles } from './typography';
import { layoutStyles } from './layout';
import { imageStyles } from './images';
import { listStyles } from './lists';
import { languageStyles } from './language';

// 📦 Объединяем все стили в один объект
// Каждый стиль живет в отдельном файле для лучшей организации
export const globalStyles = {
  ...layoutStyles,
  ...typographyStyles,
  ...imageStyles,
  ...listStyles,
  ...languageStyles,
};