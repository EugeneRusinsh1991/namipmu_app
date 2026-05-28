import { palette } from '../palette';
import type { SemanticTokens } from './types';

export const sharedTheme: Pick<SemanticTokens, 'borders' | 'typography' | 'spacing' | 'layout'> = {
  borders: {
    radiusSm: 8,
    radiusMd: 12,
    radiusLg: 20,
    radiusFull: 999,
    widthThin: 0.5,
    widthBase: 1,
    widthBold: 2,
  },
  typography: {
    fontFamilyBody: 'sans-serif',
    fontFamilyHeading: 'serif',
    fontSizeXs: 12,
    fontSizeSm: 14,
    fontSizeMd: 16,
    fontSizeLg: 20,
    fontSizeXl: 28,
    fontSizeXxl: 36,
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightSemibold: '600',
    fontWeightBold: '700',
    lineHeightTight: 1.2,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.75,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 64,
  },
  layout: {
    contentMaxWidth: 600,
  },
};

export const sharedPaletteTokens = {
  textOnAccent: palette.white,
  accent: palette.pink600,
  success: palette.success500,
  warning: palette.warning500,
  danger: palette.danger500,
  primary: palette.pink600,
};

export const sharedTextTokens = {
  onAccent: palette.white,
  success: palette.success500,
  warning: palette.warning500,
  danger: palette.danger500,
};

export const sharedInteractiveTokens = {
  accent: palette.pink600,
  secondary: palette.blue500,
};
