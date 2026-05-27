/**
 * Design System - Theme (Semantic Tokens)
 * 
 * Семантические токены для светлой и темной тем.
 * Каждый токен привязан к КОНКРЕТНОЙ РОЛИ в интерфейсе.
 * 
 * Структура:
 * - Surface: фоны приложения, surfaces, overlay
 * - Text: текст в разных иерархиях
 * - Interactive: кнопки, ссылки, accent colors, states
 * - Borders: границы, radius
 * - Shadows: тени разной глубины
 * - Typography: размеры шрифтов, weights, line-heights, семейства
 * - Spacing: единая шкала отступов
 */

import { palette } from './palette';

/**
 * ПОВЕРХНОСТИ И ФОНЫ
 */
export interface SurfaceTokens {
  /** Основной фон приложения (базовый фон экрана) */
  background: string;
  /** Primary surface - основной слой контента */
  surfacePrimary: string;
  /** Secondary surface - вторичные элементы (карточки, модалы) */
  surfaceSecondary: string;
  /** Tertiary surface - третичный слой (вложенные элементы) */
  surfaceTertiary: string;
  /** Overlay - полупрозрачный слой поверх контента (модали, меню) */
  overlay: string;
  /** Disabled state - для отключенных элементов */
  disabled: string;
}

/**
 * ТЕКСТ И ТИПОГРАФИЯ
 */
export interface TextTokens {
  /** Основной текст заголовков и ключевой информации */
  primary: string;
  /** Вторичный текст (описания, подтекст) */
  secondary: string;
  /** Третичный текст (labels, hints, вспомогательная информация) */
  tertiary: string;
  /** Текст поверх accent background (кнопок, badge) */
  onAccent: string;
  /** Отключенный текст */
  disabled: string;
  /** Успешное действие (для статус-сообщений) */
  success: string;
  /** Предупреждение (для статус-сообщений) */
  warning: string;
  /** Ошибка (для статус-сообщений) */
  danger: string;
}

/**
 * ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ И СОСТОЯНИЯ
 */
export interface InteractiveTokens {
  /** Основной accent color (кнопки, ссылки) */
  accent: string;
  /** Hover state для accent */
  accentHover: string;
  /** Active/pressed state для accent */
  accentActive: string;
  /** Мягкий вариант accent (фоны, badges) */
  accentLight: string;
  /** Вторичный interactive color (если нужен) */
  secondary: string;
  /** Hover для secondary */
  secondaryHover: string;
  /** Граница по умолчанию */
  border: string;
  /** Граница для input/form элементов */
  inputBorder: string;
}

/**
 * ГРАНИЦЫ И РАДИУСЫ
 */
export interface BorderTokens {
  /** Маленький border radius (inputs, small elements) */
  radiusSm: number;
  /** Medium border radius (cards, modals) */
  radiusMd: number;
  /** Large border radius (large elements) */
  radiusLg: number;
  /** Полностью круглый (аватары, иконки) */
  radiusFull: number;
  /** Толщина тонкой границы */
  widthThin: number;
  /** Толщина стандартной границы */
  widthBase: number;
  /** Толщина жирной границы */
  widthBold: number;
}

/**
 * ТЕНИ И ГЛУБИНА
 */
export interface ShadowTokens {
  /** Маленькая тень (subtle, для hover states) */
  sm: {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
  };
  /** Средняя тень (для карточек, popover) */
  md: {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
  };
  /** Большая тень (для модальных окон) */
  lg: {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
  };
  /** Экстра большая тень (для выпадающих меню, максимальная глубина) */
  xl: {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
  };
}

/**
 * ТИПОГРАФИЯ И МАСШТАБИРОВАНИЕ
 */
export interface TypographyTokens {
  // Font families
  /** Основное семейство шрифтов (для текста) */
  fontFamilyBody: string;
  /** Семейство шрифтов для заголовков */
  fontFamilyHeading: string;
  
  // Font sizes (в пикселях)
  /** Extra small (12px) - для мелких меток и подписей */
  fontSizeXs: number;
  /** Small (14px) - для вторичного текста */
  fontSizeSm: number;
  /** Medium (16px) - базовый размер для основного текста */
  fontSizeMd: number;
  /** Large (20px) - для заголовков h3 */
  fontSizeLg: number;
  /** Extra large (28px) - для заголовков h2 */
  fontSizeXl: number;
  /** Double extra large (36px) - для заголовков h1 */
  fontSizeXxl: number;
  
  // Font weights
  /** Regular weight (400) */
  fontWeightRegular: string;
  /** Medium weight (500) - для выделенного текста */
  fontWeightMedium: string;
  /** Semibold weight (600) - для labels и button text */
  fontWeightSemibold: string;
  /** Bold weight (700) - для заголовков */
  fontWeightBold: string;
  
  // Line heights
  /** Tight line height (1.2) - для заголовков */
  lineHeightTight: number;
  /** Normal line height (1.5) - для основного текста */
  lineHeightNormal: number;
  /** Relaxed line height (1.75) - для длинных текстов */
  lineHeightRelaxed: number;
}

/**
 * ОТСТУПЫ И РАССТОЯНИЯ (SPACING SCALE)
 */
export interface SpacingTokens {
  /** 4px - минимальный отступ */
  xs: number;
  /** 8px - очень маленький отступ */
  sm: number;
  /** 16px - стандартный отступ */
  md: number;
  /** 24px - большой отступ */
  lg: number;
  /** 32px - очень большой отступ */
  xl: number;
  /** 64px - максимальный отступ */
  xxl: number;
}

/**
 * ПОЛНЫЙ ИНТЕРФЕЙС СЕМАНТИЧЕСКИХ ТОКЕНОВ
 */
export interface SemanticTokens {
  // Surface & Background
  surface: SurfaceTokens;
  
  // Text colors
  text: TextTokens;
  
  // Interactive elements
  interactive: InteractiveTokens;
  
  // Borders & Radius
  borders: BorderTokens;
  
  // Shadows & Depth
  shadows: ShadowTokens;
  
  // Typography
  typography: TypographyTokens;
  
  // Spacing scale
  spacing: SpacingTokens;
  
  // ===== LEGACY SUPPORT (для обратной совместимости) =====
  // Эти поля помогают существующему коду не сломаться
  backgroundLight: string;
  surfaceDefault: string;
  surfaceSecondary: string;
  cardBackground: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textOnAccent: string;
  borderDefault: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
  success: string;
  warning: string;
  danger: string;
  bodyText: string;
  secondaryText: string;
  softAccent: string;
  muted: string;
  white: string;
  overlay: string;
  primary: string;
}

/**
 * СВЕТЛАЯ ТЕМА (Light Theme)
 */
export const lightTheme: SemanticTokens = {
  // ===== SURFACE & BACKGROUND =====
  surface: {
    background: palette.neutral50,            // Основной фон приложения (очень светлый серый)
    surfacePrimary: palette.white,            // Белый фон для основного контента
    surfaceSecondary: palette.neutral200,     // Легкий серый для вторичных поверхностей (карточки)
    surfaceTertiary: palette.neutral300,      // Еще светлее для вложенных элементов
    overlay: 'rgba(30, 23, 20, 0.4)',         // Полупрозрачная коричневая мутовка (dark overlay)
    disabled: palette.neutral200,             // Фон для отключенных элементов
  },

  // ===== TEXT COLORS =====
  text: {
    primary: palette.neutral700,              // Основной текст (темно-серый) для заголовков и ключевой информации
    secondary: palette.neutral600,            // Вторичный текст (описания, подтексты)
    tertiary: palette.neutral500,             // Третичный текст (labels, hints, вспомогательная информация)
    onAccent: palette.white,                  // Текст поверх accent backgrounds (кнопки, badges)
    disabled: palette.neutral400,             // Отключенный текст
    success: palette.success500,              // Текст для успешных действий
    warning: palette.warning500,              // Текст для предупреждений
    danger: palette.danger500,                // Текст для ошибок
  },

  // ===== INTERACTIVE ELEMENTS =====
  interactive: {
    accent: palette.pink600,                  // Основной accent (кнопки, ссылки, фокус)
    accentHover: palette.pink700,             // Hover state (немного темнее)
    accentActive: palette.pink800,            // Pressed/active state (еще темнее)
    accentLight: palette.pink100,             // Мягкий accent (фоны под кнопками, light badges)
    secondary: palette.blue500,               // Вторичный interactive color
    secondaryHover: palette.blue600,          // Hover для secondary
    border: palette.neutral400,               // Стандартная граница
    inputBorder: palette.neutral350,          // Граница input элементов
  },

  // ===== BORDERS & RADIUS =====
  borders: {
    radiusSm: 8,                              // Маленький border radius (inputs, small buttons)
    radiusMd: 12,                             // Medium radius (cards, modals)
    radiusLg: 20,                             // Large radius (large containers)
    radiusFull: 999,                          // Полностью круглый (аватары, иконки)
    widthThin: 0.5,                           // Тонкая граница (subtle borders)
    widthBase: 1,                             // Стандартная граница
    widthBold: 2,                             // Жирная граница (focus states)
  },

  // ===== SHADOWS =====
  shadows: {
    sm: {
      elevation: 2,
      shadowColor: palette.neutral700,
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },  // Subtle shadow для hover states
    },
    md: {
      elevation: 3,
      shadowColor: palette.neutral700,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },  // Medium shadow для карточек
    },
    lg: {
      elevation: 5,
      shadowColor: palette.neutral700,
      shadowOpacity: 0.12,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 }, // Large shadow для модальных окон
    },
    xl: {
      elevation: 8,
      shadowColor: palette.neutral700,
      shadowOpacity: 0.15,
      shadowRadius: 28,
      shadowOffset: { width: 0, height: 14 }, // Extra large shadow для выпадающих меню
    },
  },

  // ===== TYPOGRAPHY =====
  typography: {
    fontFamilyBody: 'sans-serif',             // Основной шрифт для текста
    fontFamilyHeading: 'serif',               // Шрифт для заголовков
    fontSizeXs: 12,                           // Extra small (12px)
    fontSizeSm: 14,                           // Small (14px)
    fontSizeMd: 16,                           // Medium (16px) - базовый
    fontSizeLg: 20,                           // Large (20px) - h3
    fontSizeXl: 28,                           // Extra large (28px) - h2
    fontSizeXxl: 36,                          // Double extra large (36px) - h1
    fontWeightRegular: '400',                 // Regular weight
    fontWeightMedium: '500',                  // Medium weight
    fontWeightSemibold: '600',                // Semibold weight
    fontWeightBold: '700',                    // Bold weight
    lineHeightTight: 1.2,                     // Tight line height (заголовки)
    lineHeightNormal: 1.5,                    // Normal line height (основной текст)
    lineHeightRelaxed: 1.75,                  // Relaxed line height (длинные тексты)
  },

  // ===== SPACING SCALE =====
  spacing: {
    xs: 4,                                    // 4px - минимальный отступ
    sm: 8,                                    // 8px - очень маленький отступ
    md: 16,                                   // 16px - стандартный отступ
    lg: 24,                                   // 24px - большой отступ
    xl: 32,                                   // 32px - очень большой отступ
    xxl: 64,                                  // 64px - максимальный отступ
  },

  // ===== LEGACY SUPPORT (для обратной совместимости) =====
  backgroundLight: palette.neutral50,
  surfaceDefault: palette.white,
  surfaceSecondary: palette.neutral200,
  cardBackground: palette.neutral300,
  cardBorder: palette.neutral400,
  textPrimary: palette.neutral700,
  textSecondary: palette.neutral600,
  textTertiary: palette.neutral500,
  textOnAccent: palette.white,
  borderDefault: palette.neutral400,
  accent: palette.pink600,
  accentHover: palette.pink700,
  accentLight: palette.pink100,
  inputBackground: palette.neutral50,
  inputBorder: palette.neutral350,
  inputPlaceholder: palette.neutral500,
  success: palette.success500,
  warning: palette.warning500,
  danger: palette.danger500,
  bodyText: palette.neutral600,
  secondaryText: palette.neutral500,
  softAccent: palette.pink100,
  muted: palette.neutral500,
  white: palette.white,
  overlay: 'rgba(30, 23, 20, 0.4)',
  primary: palette.pink600,
};

/**
 * ТЕМНАЯ ТЕМА (Dark Theme)
 */
export const darkTheme: SemanticTokens = {
  // ===== SURFACE & BACKGROUND =====
  surface: {
    background: palette.neutral900,           // Основной фон приложения (самый темный)
    surfacePrimary: palette.neutral850,       // Темный фон для основного контента
    surfaceSecondary: palette.neutral800,     // Чуть светлее для вторичных поверхностей (карточки)
    surfaceTertiary: palette.neutral750,      // Еще светлее для вложенных элементов
    overlay: 'rgba(0, 0, 0, 0.8)',            // Полупрозрачная черная мутовка
    disabled: palette.neutral800,             // Фон для отключенных элементов
  },

  // ===== TEXT COLORS =====
  text: {
    primary: palette.neutral100,              // Основной текст (очень светлый серый) для заголовков
    secondary: palette.neutral200,            // Вторичный текст (описания, подтексты)
    tertiary: palette.neutral350,             // Третичный текст (labels, hints)
    onAccent: palette.white,                  // Текст поверх accent backgrounds
    disabled: palette.neutral500,             // Отключенный текст
    success: palette.success500,              // Текст для успешных действий
    warning: palette.warning500,              // Текст для предупреждений
    danger: palette.danger500,                // Текст для ошибок
  },

  // ===== INTERACTIVE ELEMENTS =====
  interactive: {
    accent: palette.pink600,                  // Основной accent (остается тот же)
    accentHover: palette.pink500,             // Hover state (для темной темы чуть светлее)
    accentActive: palette.pink400,            // Pressed/active state
    accentLight: palette.pink900,             // Мягкий accent (очень темный розовый для фонов)
    secondary: palette.blue500,               // Вторичный interactive color
    secondaryHover: palette.blue400,          // Hover для secondary
    border: palette.neutral700,               // Стандартная граница (темная)
    inputBorder: palette.neutral750,          // Граница input элементов
  },

  // ===== BORDERS & RADIUS =====
  borders: {
    radiusSm: 8,                              // Маленький border radius
    radiusMd: 12,                             // Medium radius
    radiusLg: 20,                             // Large radius
    radiusFull: 999,                          // Полностью круглый
    widthThin: 0.5,                           // Тонкая граница
    widthBase: 1,                             // Стандартная граница
    widthBold: 2,                             // Жирная граница
  },

  // ===== SHADOWS =====
  shadows: {
    sm: {
      elevation: 2,
      shadowColor: palette.black,
      shadowOpacity: 0.2,                     // Более видимая тень в темноте
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    md: {
      elevation: 3,
      shadowColor: palette.black,
      shadowOpacity: 0.3,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    },
    lg: {
      elevation: 5,
      shadowColor: palette.black,
      shadowOpacity: 0.4,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
    xl: {
      elevation: 8,
      shadowColor: palette.black,
      shadowOpacity: 0.5,
      shadowRadius: 28,
      shadowOffset: { width: 0, height: 14 },
    },
  },

  // ===== TYPOGRAPHY =====
  typography: {
    fontFamilyBody: 'sans-serif',             // Основной шрифт
    fontFamilyHeading: 'serif',               // Шрифт для заголовков
    fontSizeXs: 12,                           // Extra small (12px)
    fontSizeSm: 14,                           // Small (14px)
    fontSizeMd: 16,                           // Medium (16px) - базовый
    fontSizeLg: 20,                           // Large (20px) - h3
    fontSizeXl: 28,                           // Extra large (28px) - h2
    fontSizeXxl: 36,                          // Double extra large (36px) - h1
    fontWeightRegular: '400',                 // Regular weight
    fontWeightMedium: '500',                  // Medium weight
    fontWeightSemibold: '600',                // Semibold weight
    fontWeightBold: '700',                    // Bold weight
    lineHeightTight: 1.2,                     // Tight line height
    lineHeightNormal: 1.5,                    // Normal line height
    lineHeightRelaxed: 1.75,                  // Relaxed line height
  },

  // ===== SPACING SCALE =====
  spacing: {
    xs: 4,                                    // 4px
    sm: 8,                                    // 8px
    md: 16,                                   // 16px
    lg: 24,                                   // 24px
    xl: 32,                                   // 32px
    xxl: 64,                                  // 64px
  },

  // ===== LEGACY SUPPORT =====
  backgroundLight: palette.neutral800,
  surfaceDefault: palette.neutral900,
  surfaceSecondary: palette.neutral800,
  cardBackground: palette.neutral800,
  cardBorder: palette.neutral700,
  textPrimary: palette.neutral100,
  textSecondary: palette.neutral200,
  textTertiary: palette.neutral350,
  textOnAccent: palette.white,
  borderDefault: palette.neutral700,
  accent: palette.pink600,
  accentHover: palette.pink500,
  accentLight: palette.pink900,
  inputBackground: palette.neutral850,
  inputBorder: palette.neutral750,
  inputPlaceholder: palette.neutral450,
  success: palette.success500,
  warning: palette.warning500,
  danger: palette.danger500,
  bodyText: palette.neutral200,
  secondaryText: palette.neutral350,
  softAccent: palette.pink900,
  muted: palette.neutral450,
  white: palette.neutral100,
  overlay: 'rgba(0, 0, 0, 0.8)',
  primary: palette.pink600,
};

/**
 * Функция для получения темы в зависимости от режима
 */
export function getTheme(isDark: boolean): SemanticTokens {
  return isDark ? darkTheme : lightTheme;
}

export default { lightTheme, darkTheme, getTheme };
