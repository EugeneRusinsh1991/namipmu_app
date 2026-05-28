/**
 * Design System - Palette (Primitives)
 * 
 * Примитивные цвета, не зависящие от темы.
 * Используются для создания семантических ролей в theme.ts.
 * 
 * Номенклатура: colorName + weight (50-900)
 * 50   - самый светлый
 * 900  - самый темный
 */

// ===== NEUTRALS (СЕРАЯ ШКАЛА) =====
const neutrals = {
  // Light theme (светлые оттенки серого)
  neutral50: '#FCFAF8',   // Почти белый, фон приложения (светлая тема)
  neutral100: '#FBFAF9',  // Очень светлый серый
  neutral150: '#F8F6F4',  // Мягкий фон для secondary surface
  neutral200: '#F5F1ED',  // Фон для secondary surface
  neutral250: '#F0EBE6',  // Легкий фон
  neutral300: '#F7F3F0',  // Tertiary surface background (светлый)
  neutral350: '#EDE7E0',  // Еще светлее
  neutral400: '#E6DDD6',  // Border default (светлый)
  neutral450: '#D9CEC5',  // Medium border
  neutral500: '#9B9087',  // Secondary text
  neutral550: '#8B7B70',  // Muted text
  neutral600: '#7d6c63',  // Body text (светлая тема)
  neutral650: '#6F5E54',  // Darker body
  neutral700: '#2b2520',  // Primary text (светлая тема)
  neutral750: '#261E19',  // Darker text
  
  // Dark theme (темные оттенки серого)
  neutral800: '#1A1C1E',  // Dark surface (темная тема)
  neutral850: '#161819',  // Even darker
  neutral900: '#0F0F0F',  // Самый темный (фон приложения, темная тема)
};

// ===== PRIMARY BRAND (РОЗОВЫЙ) =====
const primary = {
  pink50: '#FDF6F8',
  pink100: '#FBF0F4',
  pink200: '#F7E1EB',
  pink300: '#F1C8DD',
  pink400: '#E4A8CA',
  pink500: '#D68EB5',
  pink600: '#C45C73',   // Main accent color
  pink700: '#B14F65',   // Hover state
  pink800: '#9C4457',   // Active state
  pink900: '#87384A',   // Darkest
};

// ===== SECONDARY (СИНИЙ) =====
const secondary = {
  blue50: '#F0F6FE',
  blue100: '#E1ECFD',
  blue200: '#C3D9FB',
  blue300: '#A5C6F7',
  blue400: '#5BA3F0',
  blue500: '#208AEF',   // Secondary accent
  blue600: '#1A6FD1',
  blue700: '#1456B3',
  blue800: '#0E3D95',
  blue900: '#082477',
};

// ===== STATUS COLORS =====
const status = {
  // Success - зеленый
  success50: '#F4F9F1',
  success100: '#E8F3E3',
  success200: '#D1E7C7',
  success300: '#B9DBAB',
  success400: '#A2CF8F',
  success500: '#8D9B7A',   // Main success color
  success600: '#7A8968',
  success700: '#677756',
  success800: '#546544',
  success900: '#415232',
  
  // Warning - оранжевый
  warning50: '#FEF6F1',
  warning100: '#FDEEE3',
  warning200: '#FBDCC7',
  warning300: '#F5C8A0',
  warning400: '#EDB47A',
  warning500: '#C4875A',   // Main warning color
  warning600: '#B27A4E',
  warning700: '#A06D42',
  warning800: '#8E6037',
  warning900: '#7C532C',
  
  // Danger - красный
  danger50: '#FCF4F4',
  danger100: '#F9E8E8',
  danger200: '#F3D1D1',
  danger300: '#EDBABA',
  danger400: '#E7A3A3',
  danger500: '#B85C5C',    // Main danger color
  danger600: '#A55050',
  danger700: '#924444',
  danger800: '#7F3838',
  danger900: '#6C2C2C',
};

// ===== ACHROMATIC (Белый и черный) =====
const achromatic = {
  white: '#FFFFFF',
  black: '#000000',
};

/**
 * Экспортируем полную палитру
 */
export const palette = {
  // Achromatic
  ...achromatic,
  
  // Neutrals (серые оттенки)
  ...neutrals,
  
  // Brand colors
  ...primary,
  ...secondary,
  
  // Status colors
  ...status,
  
  // Legacy aliases для обратной совместимости
  // @deprecated: используйте семантические токены из theme.ts вместо этих алиасов
  gray50: neutrals.neutral50,
  gray100: neutrals.neutral100,
  gray200: neutrals.neutral200,
  gray300: neutrals.neutral300,
  gray400: neutrals.neutral400,
  gray500: neutrals.neutral500,
  gray600: neutrals.neutral600,
  gray700: neutrals.neutral700,
  gray800: neutrals.neutral800,
  gray900: neutrals.neutral900,
  
  pink600: primary.pink600,
  pink700: primary.pink700,
  blue500: secondary.blue500,
  
  success: status.success500,
  warning: status.warning500,
  danger: status.danger500,
};

export default palette;
