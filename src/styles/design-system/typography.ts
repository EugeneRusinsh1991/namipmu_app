/**
 * Design System - Typography
 */

import type { TextStyle } from 'react-native';
import type { VisualFoundation } from './foundation';
import { foundation as defaultFoundation } from './foundation';
import type { SemanticTokens } from './theme';

export interface TypographyScale {
  fontSizeXs: number;
  fontSizeSm: number;
  fontSizeMd: number;
  fontSizeLg: number;
  fontSizeXl: number;
  fontSizeXxl: number;
  
  lineHeightTight: number;
  lineHeightNormal: number;
  lineHeightRelaxed: number;
  
  fontWeightRegular: TextStyle['fontWeight'];
  fontWeightMedium: TextStyle['fontWeight'];
  fontWeightSemibold: TextStyle['fontWeight'];
  fontWeightBold: TextStyle['fontWeight'];
  
  familyMain: string;
  familyHeading: string;
}

export const typographyScale: TypographyScale = {
  // Sizes
  fontSizeXs: 12,
  fontSizeSm: 14,
  fontSizeMd: 16,
  fontSizeLg: 20,
  fontSizeXl: 28,
  fontSizeXxl: 36,
  
  // Line heights
  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.75,
  
  // Weights
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightSemibold: '600',
  fontWeightBold: '700',
  
  // Families
  familyMain: 'sans-serif',
  familyHeading: 'serif',
};

export interface TypographyStyles {
  header: TextStyle;
  subheading: TextStyle;
  text: TextStyle;
}

export function getTypography(colors: SemanticTokens, fontScale = 1, foundation: VisualFoundation = defaultFoundation): TypographyStyles {
  const scaleRole = (role: { fontSize: number; fontWeight: TextStyle['fontWeight']; lineHeight: number; fontFamily: string }) => ({
    fontSize: role.fontSize * fontScale,
    fontWeight: role.fontWeight,
    lineHeight: role.lineHeight * fontScale,
    fontFamily: role.fontFamily,
  });

  return {
    header: {
      ...scaleRole(foundation.header),
      color: colors.textPrimary,
    },
    subheading: {
      ...scaleRole(foundation.subheading),
      color: colors.textPrimary,
    },
    text: {
      ...scaleRole(foundation.text),
      color: colors.bodyText,
    },
  };
}

export default { getTypography, typographyScale };
