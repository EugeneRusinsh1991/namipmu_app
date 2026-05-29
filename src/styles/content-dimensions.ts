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

import foundation from '../styles/design-system/foundation';

/**
 * Размеры карточек (для разных вариантов)
 */
export const CARD_SIZES = {
  large: {
    /** Высота изображения в карточке */
    imageHeight: foundation.visuals.card.large.imageHeight,
    /** Высота контентной части (title + description) */
    contentHeight: foundation.visuals.card.large.contentHeight,
    /** Упрощаем: большая карточка использует общий subheading-вариант, не отдельный card title token */
    titleFontSize: foundation.subheading.fontSize,
    /** Отступ между title и description */
    titleMarginBottom: 0,
  },
  small: {
    imageHeight: foundation.visuals.card.small.imageHeight,
    contentHeight: foundation.visuals.card.small.contentHeight,
    titleFontSize: foundation.text.fontSize,
    titleMarginBottom: 6,
  },
} as const;

/**
 * Размеры изображений (для разных типов)
 */
export const SHADOWS = foundation.shadows;

export const IMAGE_SIZES = {
  /** Hero image - большое изображение в начале экрана */
  hero: {
    height: foundation.visuals.hero.height,
    marginBottom: foundation.visuals.hero.marginBottom,
    webHeight: foundation.visuals.hero.webHeight,
    webMarginBottom: foundation.visuals.hero.webMarginBottom,
    webGradientHeight: foundation.visuals.hero.webGradientHeight,
    defaultGradientHeight: foundation.visuals.hero.defaultGradientHeight,
  },
  
  /** Карточка - изображение внутри карточки */
  card: {
    height: foundation.visuals.card.large.imageHeight,
    borderRadius: foundation.borders.radiusStandard,
    shadow: SHADOWS.standard,
  },
  
  /** Квадратное изображение */
  square: {
    width: foundation.visuals.square.width,
    height: foundation.visuals.square.height,
    borderRadius: 0,
    marginBottom: foundation.visuals.square.marginBottom,
    shadow: SHADOWS.standard,
  },
  
  /** Видео контейнер */
  video: {
    height: foundation.visuals.video.height,
    borderRadius: foundation.borders.radiusStandard,
    shadow: SHADOWS.standard,
  },
} as const;

/**
 * Размеры для компонентов контента (блоков)
 */
export const COMPONENT_SIZES = {
  /** Button размеры */
  button: {
    primary: {
      height: foundation.sizing.buttonHeight,
      paddingHorizontal: foundation.sizing.buttonPaddingHorizontal,
      paddingVertical: foundation.sizing.buttonPaddingVertical,
      minHeight: foundation.sizing.buttonHeight,
    },
    secondary: {
      height: foundation.sizing.buttonHeight,
      paddingHorizontal: foundation.sizing.buttonPaddingHorizontal,
      paddingVertical: foundation.sizing.buttonPaddingVertical,
      minHeight: foundation.sizing.buttonHeight,
    },
  },
  
  /** Input размеры */
  input: {
    height: foundation.sizing.inputHeight,
    paddingHorizontal: foundation.sizing.inputPaddingHorizontal,
    paddingVertical: foundation.sizing.inputPaddingVertical,
  },
  
  /** Quiz вопрос + ответ */
  quiz: {
    containerPadding: foundation.componentSpacing.quiz.container,
    answerPadding: foundation.componentSpacing.quiz.answerPadding,
    answerMarginVertical: foundation.componentSpacing.quiz.answerMarginVertical,
  },
  
  /** Checklist элемент */
  checklist: {
    itemPadding: foundation.componentSpacing.checklist.itemPadding,
    itemMarginBottom: foundation.componentSpacing.checklist.itemMarginBottom,
    checkboxSize: foundation.sizing.checkboxSize,
  },
  
  /** Timer дисплей */
  timer: {
    containerPadding: foundation.componentSpacing.timer.containerPadding,
    displayFontSize: 36,
  },
} as const;

/**
 * Единая шкала отступов (spacing scale)
 * Используется везде вместо hardcoded чисел
 */

export const SPACING = foundation.spacing;

/**
 * Border radius значения
 */
export const BORDER_RADIUS = {
  standard: foundation.borders.radiusStandard,
  full: foundation.borders.radiusFull,
} as const;

/**
 * Shadow specifications
 */
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
