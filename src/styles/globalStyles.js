import { StyleSheet } from 'react-native';
import { imageStyles } from './images';
import { languageStyles } from './language';
import { layoutStyles } from './layout';
import { listStyles } from './lists';
import { quizStyles } from './quiz';
import { typographyStyles } from './typography';

// 📦 Объединяем все стили в один объект
// Используем функцию для "распаковки" StyleSheet (превращаем ID в объекты)
const unroll = (sheet) => {
  const out = {};
  for (const key in sheet) { out[key] = StyleSheet.flatten(sheet[key]); }
  return out;
};

export const globalStyles = {
  ...unroll(layoutStyles),
  ...unroll(typographyStyles),
  ...unroll(imageStyles),
  ...unroll(listStyles),
  ...unroll(languageStyles),
  ...unroll(quizStyles),
};