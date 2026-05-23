import { imageStyles } from './images';
import { languageStyles } from './language';
import { layoutStyles } from './layout';
import { listStyles } from './lists';
import { quizStyles } from './quiz';
import { typographyStyles } from './typography';

// 📦 Объединяем все стили в один объект
// Каждый стиль живет в отдельном файле для лучшей организации
export const globalStyles = {
  ...layoutStyles,
  ...typographyStyles,
  ...imageStyles,
  ...listStyles,
  ...languageStyles,
  ...quizStyles,
};