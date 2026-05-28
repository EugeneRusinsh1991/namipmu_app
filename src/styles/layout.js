import { StyleSheet } from 'react-native';
import { LAYOUT, SPACING } from './content-dimensions';

/**
 * Layout Styles
 * 
 * Основные стили для макета приложения.
 * Используют токены из content-dimensions для консистентности.
 */
export const layoutStyles = StyleSheet.create({
  /**
   * Основной фон приложения
   * Используется обычно с динамическим backgroundColor из темы
   */
  appBackground: {
    flex: 1,
    // backgroundColor будет установлена динамически через контекст темы
  },

  /**
   * Основной контейнер для контента
   * Имеет padding и maxWidth для правильного отображения на больших экранах
   */
  container: {
    flex: 1,
    padding: SPACING.lg,
    maxWidth: LAYOUT.contentMaxWidth,
    alignSelf: 'center',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },

  /**
   * Альтернативный контейнер с меньшим padding
   */
  containerCompact: {
    flex: 1,
    padding: SPACING.md,
    maxWidth: LAYOUT.contentMaxWidth,
    alignSelf: 'center',
    width: '100%',
  },

  /**
   * Контейнер для вертикального spacing между элементами
   */
  spacer: {
    marginVertical: SPACING.md,
  },

  /**
   * Контейнер для горизонтального spacing между элементами
   */
  spacerHorizontal: {
    marginHorizontal: SPACING.md,
  },
});
