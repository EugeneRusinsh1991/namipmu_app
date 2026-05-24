/**
 * Design System - Theme
 * 
 * Семантические токены для светлой и темной тем.
 * Каждая роль определена для обоих режимов.
 */

import { palette } from './palette';

export interface SemanticTokens {
  // Background & Surface
  backgroundLight: string;
  surfaceDefault: string;
  surfaceSecondary: string;
  
  // Card & Container
  cardBackground: string;
  cardBorder: string;
  
  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textOnAccent: string;
  
  // Interactive
  borderDefault: string;
  accent: string;
  accentHover: string;
  accentLight: string;
  
  // Input
  inputBackground: string;
  inputBorder: string;
  inputPlaceholder: string;
  
  // States
  success: string;
  warning: string;
  danger: string;
  
  // Legacy support (для обратной совместимости)
  bodyText: string;
  secondaryText: string;
  softAccent: string;
  muted: string;
  white: string;
  overlay: string;
  primary: string;
}

export const lightTheme: SemanticTokens = {
  // Background & Surface
  backgroundLight: palette.gray100,
  surfaceDefault: palette.white,
  surfaceSecondary: palette.gray200,
  
  // Card & Container
  cardBackground: palette.gray300,
  cardBorder: palette.gray400,
  
  // Text
  textPrimary: palette.gray700,
  textSecondary: palette.gray600,
  textTertiary: palette.gray500,
  textOnAccent: palette.white,
  
  // Interactive
  borderDefault: palette.gray400,
  accent: palette.pink600,
  accentHover: palette.pink700,
  accentLight: '#F1E7E3',
  
  // Input
  inputBackground: palette.gray50,
  inputBorder: '#DDD2CA',
  inputPlaceholder: '#B1A59C',
  
  // States
  success: palette.success,
  warning: palette.warning,
  danger: palette.danger,
  
  // Legacy support
  bodyText: palette.gray600,
  secondaryText: palette.gray500,
  softAccent: '#F1E7E3',
  muted: palette.gray500,
  white: palette.white,
  overlay: 'rgba(30, 23, 20, 0.4)',
  primary: palette.pink600,
};

export const darkTheme: SemanticTokens = {
  // Background & Surface
  backgroundLight: palette.gray800,
  surfaceDefault: palette.gray900,
  surfaceSecondary: palette.gray800,
  
  // Card & Container
  cardBackground: palette.gray800,
  cardBorder: '#3F4143',
  
  // Text
  textPrimary: '#E3E2E6',
  textSecondary: '#C7C6CA',
  textTertiary: '#919194',
  textOnAccent: palette.white,
  
  // Interactive
  borderDefault: '#3F4143',
  accent: palette.pink600,
  accentHover: palette.pink700,
  accentLight: '#352329',
  
  // Input
  inputBackground: '#161B22',
  inputBorder: '#30363D',
  inputPlaceholder: '#484F58',
  
  // States
  success: palette.success,
  warning: palette.warning,
  danger: palette.danger,
  
  // Legacy support
  bodyText: '#C7C6CA',
  secondaryText: '#919194',
  softAccent: '#352329',
  muted: '#919194',
  white: '#E3E2E6',
  overlay: 'rgba(0, 0, 0, 0.8)',
  primary: palette.pink600,
};

export function getTheme(isDark: boolean): SemanticTokens {
  return isDark ? darkTheme : lightTheme;
}

export default { lightTheme, darkTheme, getTheme };
