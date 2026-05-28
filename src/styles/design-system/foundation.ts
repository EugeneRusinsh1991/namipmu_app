/**
 * Visual Foundation
 *
 * Общие геометрические токены: borders, spacing, typography (raw scales), layout и
 * геометрическая часть теней (без цвета). Не содержит цветов (hex/rgb).
 */

export interface BorderTokens {
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusFull: number;
  widthThin: number;
  widthBase: number;
  widthBold: number;
  /** optional theme-provided default border color (populated at merge time) */
  colorDefault?: string;
}

import type { TextStyle } from 'react-native';

export interface TypographyTokens {
  fontFamilyBody: string;
  fontFamilyHeading: string;
  fontSizeXs: number;
  fontSizeSm: number;
  fontSizeMd: number;
  fontSizeLg: number;
  fontSizeXl: number;
  fontSizeXxl: number;
  fontWeightRegular: TextStyle['fontWeight'];
  fontWeightMedium: TextStyle['fontWeight'];
  fontWeightSemibold: TextStyle['fontWeight'];
  fontWeightBold: TextStyle['fontWeight'];
  lineHeightTight: number;
  lineHeightNormal: number;
  lineHeightRelaxed: number;
}

export interface SpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface LayoutTokens {
  contentMaxWidth: number;
}

export interface ShadowGeometry {
  elevation: number;
  /** color is provided by theme; kept optional here for merged tokens */
  shadowColor?: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
}

export interface ShadowTokensGeometry {
  sm: ShadowGeometry;
  md: ShadowGeometry;
  lg: ShadowGeometry;
  xl: ShadowGeometry;
}

export interface VisualFoundation {
  borders: BorderTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  layout: LayoutTokens;
  shadows: ShadowTokensGeometry; // geometric part only — color is provided by theme
}

export const foundation: VisualFoundation = {
  // ГЕОМЕТРИЯ ГРАНИЦ И СКРУГЛЕНИЙ
  // Определяет форму элементов и толщину обводок
  borders: {
    // Малые элементы: Поля ввода (Input), Чекбоксы
    radiusSm: 8,
    // Стандарт: Кнопки, Карточки контента, Изображения, Варианты ответов в Квизах
    radiusMd: 12,
    // Контейнеры: Внешние рамки Квизов, Списков и Таймера
    radiusLg: 20,
    // Круг: Аватарки, индикаторы и теги (Pills)
    radiusFull: 999,
    // Тонкие разделители и декоративные линии
    widthThin: 1,
    // Стандартная обводка интерактивных элементов (Input, Secondary Button)
    widthBase: 2,
    // Акцентные границы или состояния фокуса
    widthBold: 3,
  },

  // ТИПОГРАФИЧЕСКАЯ ШКАЛА
  // Определяет размеры и начертания. Используется в getTypography для создания стилей текста.
  typography: {
    fontFamilyBody: 'sans-serif',
    fontFamilyHeading: 'serif',
    // Подписи под картинками, мелкие лейблы
    fontSizeXs: 12,
    // Вторичный текст, мелкие пояснения, Eyebrow-заголовки
    fontSizeSm: 14,
    // Основной текст (Body), текст в кнопках, в инпутах
    fontSizeMd: 16,
    // Подзаголовки (Heading 3)
    fontSizeLg: 20,
    // Крупные заголовки разделов (Heading 2)
    fontSizeXl: 28,
    // Главные заголовки (Heading 1) и цифры в Таймере
    fontSizeXxl: 36,
    // Обычный текст
    fontWeightRegular: '400',
    // Средний акцент
    fontWeightMedium: '500',
    // Кнопки, Лейблы, выделенный текст
    fontWeightSemibold: '600',
    // Заголовки и важные акценты
    fontWeightBold: '700',
    // Заголовки (плотный текст)
    lineHeightTight: 1.2,
    // Стандарт для чтения (Body)
    lineHeightNormal: 1.5,
    // Свободный текст (большие параграфы)
    lineHeightRelaxed: 1.75,
  },

  // ШКАЛА ОТСТУПОВ (SPACING)
  // Единый стандарт расстояний. Используется в padding, margin и gap.
  spacing: {
    // Микро-отступы (между иконкой и текстом)
    xs: 4,
    // Малые отступы (внутренние отступы элементов)
    sm: 8,
    // Стандарт: отступы в кнопках, расстояние между элементами списка
    md: 16,
    // Контейнеры: отступы внутри карточек и блоков контента
    lg: 24,
    // Внешние отступы между крупными блоками
    xl: 32,
    // Большие отступы секций
    xxl: 64,
  },

  // ГЛОБАЛЬНЫЕ ПАРАМЕТРЫ ПРИЛОЖЕНИЯ
  layout: {
    // Ограничение ширины контента для читаемости на планшетах/вебе
    contentMaxWidth: 600,
  },

  // ГЕОМЕТРИЯ ТЕНЕЙ (БЕЗ ЦВЕТА)
  // Определяет "глубину" элементов. Цвет подмешивается из темы (shadowColor).
  shadows: {
    // Едва заметная тень для малых карточек
    sm: {
      elevation: 2,
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    // Стандартная тень для Кнопок и основных Карточек
    md: {
      elevation: 3,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    },
    // Акцентная тень для плавающих элементов
    lg: {
      elevation: 5,
      shadowOpacity: 0.12,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
    // Максимальная тень для модальных окон и оверлеев
    xl: {
      elevation: 8,
      shadowOpacity: 0.15,
      shadowRadius: 28,
      shadowOffset: { width: 0, height: 14 },
    },
  },
};

export default foundation;
