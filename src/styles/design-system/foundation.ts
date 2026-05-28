/**
 * Visual Foundation
 *
 * Общие геометрические токены: borders, spacing, typography (raw scales), layout и
 * геометрическая часть теней (без цвета). Не содержит цветов (hex/rgb).
 */

export interface BorderTokens {
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusFull: number;
  widthThin: number;
  widthBase: number;
  widthBold: number;
  /** optional theme-provided default border color (populated at merge time) */
  colorDefault?: string;
}

import type { TextStyle } from 'react-native';

export interface TypographyTokens {
  fontFamilyBody: string;
  fontFamilyHeading: string;
  fontSizeXs: number;
  fontSizeSm: number;
  fontSizeMd: number;
  fontSizeLg: number;
  fontSizeXl: number;
  fontSizeXxl: number;
  fontWeightRegular: TextStyle['fontWeight'];
  fontWeightMedium: TextStyle['fontWeight'];
  fontWeightSemibold: TextStyle['fontWeight'];
  fontWeightBold: TextStyle['fontWeight'];
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

export interface ShadowGeometry {
  elevation: number;
  /** color is provided by theme; kept optional here for merged tokens */
  shadowColor?: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
}

export interface ShadowTokensGeometry {
  sm: ShadowGeometry;
  md: ShadowGeometry;
  lg: ShadowGeometry;
  xl: ShadowGeometry;
}

export interface VisualFoundation {
  borders: BorderTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  layout: LayoutTokens;
  shadows: ShadowTokensGeometry; // geometric part only — color is provided by theme
}

export const foundation: VisualFoundation = {
  borders: {
    radiusSm: 8,
    radiusMd: 12,
    radiusLg: 20,
    radiusFull: 999,
    widthThin: 1,
    widthBase: 2,
    widthBold: 3,
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

  shadows: {
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
  },
};

export default foundation;
