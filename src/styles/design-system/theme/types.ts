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

export interface BorderTokens {
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusFull: number;
  widthThin: number;
  widthBase: number;
  widthBold: number;
}

export interface ShadowTokens {
  sm: {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
  };
  md: {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
  };
  lg: {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
  };
  xl: {
    elevation: number;
    shadowColor: string;
    shadowOpacity: number;
    shadowRadius: number;
    shadowOffset: { width: number; height: number };
  };
}

export interface TypographyTokens {
  fontFamilyBody: string;
  fontFamilyHeading: string;
  fontSizeXs: number;
  fontSizeSm: number;
  fontSizeMd: number;
  fontSizeLg: number;
  fontSizeXl: number;
  fontSizeXxl: number;
  fontWeightRegular: string;
  fontWeightMedium: string;
  fontWeightSemibold: string;
  fontWeightBold: string;
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

export interface SemanticTokens {
  surface: SurfaceTokens;
  text: TextTokens;
  interactive: InteractiveTokens;
  borders: BorderTokens;
  shadows: ShadowTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  layout: LayoutTokens;
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
