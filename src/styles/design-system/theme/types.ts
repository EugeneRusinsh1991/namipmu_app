/**
 * Design System - Theme Types
 *
 * Общие типы для семантических токенов темы.
 */

export interface SurfaceTokens {
  background: string;
  surfacePrimary: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  overlay: string;
  disabled: string;
}

export interface TextTokens {
  primary: string;
  secondary: string;
  tertiary: string;
  onAccent: string;
  disabled: string;
  success: string;
  warning: string;
  danger: string;
}

export interface InteractiveTokens {
  accent: string;
  accentHover: string;
  accentActive: string;
  accentLight: string;
  secondary: string;
  secondaryHover: string;
  border: string;
  inputBorder: string;
}
export interface SemanticTokens {
  surface: SurfaceTokens;
  text: TextTokens;
  interactive: InteractiveTokens;
  /** geometric tokens are provided from foundation.ts; theme contains only colors */
  /** shadowColor is a theme-level color used to fill geometry.shadowColor */
  shadowColor?: string;
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
