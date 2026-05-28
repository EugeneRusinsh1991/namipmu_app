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
export const SPACING = {
  xs: 4,   // Минимальный отступ
  sm: 8,   // Очень маленький
  md: 16,  // Стандартный
  lg: 24,  // Большой
  xl: 32,  // Очень большой
  xxl: 64, // Максимальный
} as const;

/**
 * Border radius значения
 */
export const BORDER_RADIUS = {
  sm: 8,    // Маленький (inputs, small elements)
  md: 12,   // Medium (cards, modals)
  lg: 20,   // Large (large containers)
  full: 999, // Полностью круглый
} as const;

/**
 * Shadow specifications
 */
export const SHADOWS = {
  sm: {
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  md: {
    elevation: 3,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  lg: {
    elevation: 5,
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  xl: {
    elevation: 8,
    shadowOpacity: 0.15,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
  },
} as const;

/**
 * Экспортируем все размеры как единый объект для удобства
 */
export const LAYOUT = {
  contentMaxWidth: 600,
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
