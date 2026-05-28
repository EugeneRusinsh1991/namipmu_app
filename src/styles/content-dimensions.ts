/**
 * Content Dimensions Tokens
 * 
 * Централизованные константы размеров для контента (изображения, карточки, видео).
 * Используется в:
 * - scripts/content/parsers.js (при генерации контента)
 * - src/components/Card.js (при рендеринге карточек)
 * - src/styles/images.js (при рендеринге изображений)
 * 
 * ВАЖНО: Эти константы должны быть синхронизированы с values в components.ts,
 * но выделены отдельно, чтобы их легко было импортировать из скриптов.
 */

/**
 * Размеры карточек (для разных вариантов)
 */
export const CARD_SIZES = {
  large: {
    /** Высота изображения в карточке */
    imageHeight: 150,
    /** Высота контентной части (title + description) */
    contentHeight: 110,
    /** Заголовок в большой карточке */
    titleFontSize: 20,
    /** Отступ между title и description */
    titleMarginBottom: 10,
  },
  small: {
    imageHeight: 110,
    contentHeight: 70,
    titleFontSize: 14,
    titleMarginBottom: 6,
  },
} as const;

/**
 * Размеры изображений (для разных типов)
 */
export const IMAGE_SIZES = {
  /** Hero image - большое изображение в начале экрана */
  hero: {
    height: 200,
    marginBottom: -30, // Отрицательный margin для overlap эффекта
    webHeight: 250,
    webMarginBottom: -40,
    webGradientHeight: 120,
    defaultGradientHeight: 80,
  },
  
  /** Карточка - изображение внутри карточки */
  card: {
    height: 150,
    borderRadius: 12,
  },
  
  /** Квадратное изображение */
  square: {
    width: 300,
    height: 300,
    borderRadius: 0,
    marginBottom: 20,
  },
  
  /** Видео контейнер */
  video: {
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
  },
} as const;

/**
 * Размеры для компонентов контента (блоков)
 */
export const COMPONENT_SIZES = {
  /** Button размеры */
  button: {
    primary: {
      height: 52,
      paddingHorizontal: 24,
      paddingVertical: 14,
      minHeight: 52,
    },
    secondary: {
      height: 52,
      paddingHorizontal: 24,
      paddingVertical: 14,
      minHeight: 52,
    },
  },
  
  /** Input размеры */
  input: {
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  
  /** Quiz вопрос + ответ */
  quiz: {
    containerPadding: 24,
    answerPadding: 16,
    answerMarginVertical: 8,
  },
  
  /** Checklist элемент */
  checklist: {
    itemPadding: 16,
    itemMarginBottom: 16,
    checkboxSize: 24,
  },
  
  /** Timer дисплей */
  timer: {
    containerPadding: 24,
    displayFontSize: 36,
  },
} as const;

/**
 * Единая шкала отступов (spacing scale)
 * Используется везде вместо hardcoded чисел
 */
import foundation from '../styles/design-system/foundation';

export const SPACING = foundation.spacing;

/**
 * Border radius значения
 */
export const BORDER_RADIUS = {
  sm: foundation.borders.radiusSm,
  md: foundation.borders.radiusMd,
  lg: foundation.borders.radiusLg,
  full: foundation.borders.radiusFull,
} as const;

/**
 * Shadow specifications
 */
export const SHADOWS = foundation.shadows;

/**
 * Экспортируем все размеры как единый объект для удобства
 */
export const LAYOUT = {
  contentMaxWidth: foundation.layout.contentMaxWidth,
} as const;

export const CONTENT_DIMENSIONS = {
  cards: CARD_SIZES,
  images: IMAGE_SIZES,
  components: COMPONENT_SIZES,
  spacing: SPACING,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
  layout: LAYOUT,
} as const;

export default CONTENT_DIMENSIONS;
