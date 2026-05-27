/**
 * Design System - Component Specifications
 * 
 * Полные спецификации для всех компонентов UI.
 * Каждая спецификация определяет размеры, отступы, цвета, тени и border-radius.
 * 
 * Использует токены из theme.ts для консистентности.
 */

import type { SemanticTokens } from './theme';

/**
 * BUTTON COMPONENT SPECIFICATIONS
 * Размеры, padding, colors для всех вариантов кнопок
 */
export interface ButtonSpecs {
  primary: {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    fontWeight: string;
    lineHeight: number;
    shadowElevation: number;
  };
  secondary: {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    backgroundColor: string;
    borderWidth: number;
    borderColor: string;
    textColor: string;
    fontSize: number;
    fontWeight: string;
  };
  ghost: {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    fontWeight: string;
  };
  disabled: {
    opacity: number;
  };
}

/**
 * CARD COMPONENT SPECIFICATIONS
 * Размеры контента, padding, border-radius для карточек
 */
export interface CardSpecs {
  large: {
    borderRadius: number;
    padding: number;
    shadowElevation: number;
    backgroundColor: string;
    borderColor: string;
    imageSizeConfig: {
      height: number;
      contentHeight: number;
    };
  };
  small: {
    borderRadius: number;
    padding: number;
    shadowElevation: number;
    backgroundColor: string;
    borderColor: string;
    imageSizeConfig: {
      height: number;
      contentHeight: number;
    };
  };
}

/**
 * INPUT COMPONENT SPECIFICATIONS
 * Размеры, padding, border для input элементов
 */
export interface InputSpecs {
  height: number;
  paddingHorizontal: number;
  paddingVertical: number;
  borderRadius: number;
  borderWidth: number;
  backgroundColor: string;
  borderColor: string;
  placeholderColor: string;
  textColor: string;
  fontSize: number;
  fontWeight: string;
  focusBorderColor: string;
}

/**
 * QUIZ COMPONENT SPECIFICATIONS
 * Размеры для вопросов и ответов
 */
export interface QuizSpecs {
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  answerPadding: number;
  answerMargin: number;
  answerBorderRadius: number;
  selectedBgColor: string;
  selectedBorderColor: string;
  correctBgColor: string;
  correctBorderColor: string;
  wrongBgColor: string;
  wrongBorderColor: string;
}

/**
 * CHECKLIST COMPONENT SPECIFICATIONS
 */
export interface ChecklistSpecs {
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  itemPadding: number;
  itemMarginBottom: number;
  itemBorderRadius: number;
  itemBgColor: string;
  itemBorderColor: string;
  checkboxSize: number;
  checkboxBorderRadius: number;
  checkboxBorderWidth: number;
  itemTextColor: string;
  itemCheckedTextColor: string;
}

/**
 * TIMER COMPONENT SPECIFICATIONS
 */
export interface TimerSpecs {
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  displayFontSize: number;
  displayFontWeight: string;
  displayColor: string;
  buttonPadding: number;
  buttonBorderRadius: number;
}

/**
 * IMAGE COMPONENT SPECIFICATIONS
 * Размеры для различных типов изображений
 */
export interface ImageSpecs {
  hero: {
    height: number;
    marginBottom: number;
  };
  card: {
    height: number;
    borderRadius: number;
  };
  square: {
    width: number;
    height: number;
  };
  video: {
    height: number;
    borderRadius: number;
  };
}

/**
 * ПОЛНАЯ СПЕЦИФИКАЦИЯ КОМПОНЕНТОВ
 */
export interface ComponentSpecifications {
  button: ButtonSpecs;
  card: CardSpecs;
  input: InputSpecs;
  quiz: QuizSpecs;
  checklist: ChecklistSpecs;
  timer: TimerSpecs;
  image: ImageSpecs;
}

/**
 * Генерирует полные спецификации компонентов на основе токенов темы
 */
export function getComponentSpecs(tokens: SemanticTokens): ComponentSpecifications {
  return {
    // ===== BUTTON SPECIFICATIONS =====
    button: {
      primary: {
        // Размеры кнопки
        height: 52,                                           // Высота кнопки
        paddingHorizontal: tokens.spacing.lg,                 // 24px горизонтальный отступ
        paddingVertical: tokens.spacing.md,                   // 16px вертикальный отступ (вычитается из height)
        borderRadius: tokens.borders.radiusMd,                // 12px закругление
        
        // Цвета
        backgroundColor: tokens.interactive.accent,           // Основной accent color (розовый)
        textColor: tokens.text.onAccent,                      // Белый текст на accent фоне
        
        // Типография
        fontSize: tokens.typography.fontSizeMd,               // 16px размер шрифта
        fontWeight: tokens.typography.fontWeightSemibold,     // 600 вес
        lineHeight: tokens.typography.lineHeightNormal,       // 1.5
        
        // Тень
        shadowElevation: tokens.shadows.md.elevation,         // Средняя тень для глубины
      },
      secondary: {
        height: 52,
        paddingHorizontal: tokens.spacing.lg,
        paddingVertical: tokens.spacing.md,
        borderRadius: tokens.borders.radiusMd,
        backgroundColor: tokens.surface.surfacePrimary,       // Прозрачный фон (surface default)
        borderWidth: tokens.borders.widthBase,                // 1px граница
        borderColor: tokens.interactive.border,               // Серая граница
        textColor: tokens.text.primary,                       // Темный текст
        fontSize: tokens.typography.fontSizeMd,
        fontWeight: tokens.typography.fontWeightSemibold,
      },
      ghost: {
        height: 52,
        paddingHorizontal: tokens.spacing.lg,
        paddingVertical: tokens.spacing.md,
        borderRadius: tokens.borders.radiusMd,
        backgroundColor: 'transparent',                        // Без фона
        textColor: tokens.interactive.accent,                 // Цветной текст
        fontSize: tokens.typography.fontSizeMd,
        fontWeight: tokens.typography.fontWeightSemibold,
      },
      disabled: {
        opacity: 0.55,                                        // Пониженная opacity для отключенных кнопок
      },
    },

    // ===== CARD SPECIFICATIONS =====
    card: {
      large: {
        // Размеры
        borderRadius: tokens.borders.radiusMd,                // 12px закругление карточки
        padding: tokens.spacing.lg,                           // 24px внутренний отступ
        
        // Цвета
        backgroundColor: tokens.surface.surfaceSecondary,     // Серый фон для карточки
        borderColor: tokens.interactive.border,               // Граница
        shadowElevation: tokens.shadows.md.elevation,         // Средняя тень
        
        // Размеры контента внутри карточки
        imageSizeConfig: {
          height: 150,                                        // Высота изображения в карточке
          contentHeight: 110,                                 // Высота контентной части
        },
      },
      small: {
        borderRadius: tokens.borders.radiusMd,
        padding: tokens.spacing.md,                           // 16px отступ (меньше)
        backgroundColor: tokens.surface.surfaceSecondary,
        borderColor: tokens.interactive.border,
        shadowElevation: tokens.shadows.sm.elevation,         // Маленькая тень
        
        imageSizeConfig: {
          height: 110,                                        // Меньшая высота для small карточки
          contentHeight: 70,
        },
      },
    },

    // ===== INPUT SPECIFICATIONS =====
    input: {
      height: 48,                                             // Стандартная высота input
      paddingHorizontal: tokens.spacing.md,                   // 16px горизонтальный отступ
      paddingVertical: tokens.spacing.sm,                     // 8px вертикальный отступ
      borderRadius: tokens.borders.radiusSm,                  // 8px закругление (меньше чем button)
      borderWidth: tokens.borders.widthBase,                  // 1px граница
      backgroundColor: tokens.surface.surfacePrimary,         // Белый/светлый фон
      borderColor: tokens.interactive.inputBorder,            // Специальный цвет границы input
      placeholderColor: tokens.text.tertiary,                 // Светлый серый для placeholder
      textColor: tokens.text.primary,                         // Основной цвет текста
      fontSize: tokens.typography.fontSizeMd,                 // 16px
      fontWeight: tokens.typography.fontWeightRegular,        // 400 вес
      focusBorderColor: tokens.interactive.accent,            // Accent цвет когда активен
    },

    // ===== QUIZ SPECIFICATIONS =====
    quiz: {
      // Контейнер вопроса
      padding: tokens.spacing.lg,
      marginVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radiusLg,                  // 20px для визуального разделения
      backgroundColor: tokens.surface.surfaceSecondary,
      borderColor: tokens.interactive.border,
      borderWidth: tokens.borders.widthBase,
      
      // Ответы
      answerPadding: tokens.spacing.md,
      answerMargin: tokens.spacing.sm,
      answerBorderRadius: tokens.borders.radiusMd,
      
      // Цвета для разных состояний ответов
      selectedBgColor: tokens.interactive.accentLight,        // Светлый accent для выбранного ответа
      selectedBorderColor: tokens.interactive.accent,         // Основной accent для границы
      correctBgColor: tokens.text.success,
      correctBorderColor: tokens.text.success,
      wrongBgColor: tokens.text.danger,
      wrongBorderColor: tokens.text.danger,
    },

    // ===== CHECKLIST SPECIFICATIONS =====
    checklist: {
      // Контейнер
      padding: tokens.spacing.lg,
      marginVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radiusLg,
      backgroundColor: tokens.surface.surfaceSecondary,
      
      // Item
      itemPadding: tokens.spacing.md,
      itemMarginBottom: tokens.spacing.md,
      itemBorderRadius: tokens.borders.radiusMd,
      itemBgColor: tokens.surface.surfacePrimary,
      itemBorderColor: tokens.interactive.border,
      
      // Checkbox
      checkboxSize: 24,                                       // 24x24 квадрат
      checkboxBorderRadius: tokens.borders.radiusSm,          // 8px закругление
      checkboxBorderWidth: tokens.borders.widthBase,
      
      // Текст
      itemTextColor: tokens.text.secondary,
      itemCheckedTextColor: tokens.text.tertiary,             // Более мягкий когда checked
    },

    // ===== TIMER SPECIFICATIONS =====
    timer: {
      padding: tokens.spacing.lg,
      marginVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radiusLg,
      backgroundColor: tokens.surface.surfaceSecondary,
      borderColor: tokens.interactive.border,
      
      displayFontSize: tokens.typography.fontSizeXxl,        // 36px для отсчета
      displayFontWeight: tokens.typography.fontWeightBold,   // Жирный
      displayColor: tokens.text.primary,
      
      buttonPadding: tokens.spacing.md,
      buttonBorderRadius: tokens.borders.radiusMd,
    },

    // ===== IMAGE SPECIFICATIONS =====
    image: {
      hero: {
        height: 200,                                          // Высота hero image (может быть переопределена Platform.select)
        marginBottom: -30,                                    // Отрицательный margin для overlap эффекта
      },
      card: {
        height: 150,                                          // Высота изображения в карточке
        borderRadius: tokens.borders.radiusMd,
      },
      square: {
        width: 300,                                           // Квадратное изображение 300x300
        height: 300,
      },
      video: {
        height: 220,                                          // Высота video container
        borderRadius: tokens.borders.radiusMd,
      },
    },
  };
}

export default { getComponentSpecs };
