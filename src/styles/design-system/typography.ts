/**
 * Design System - Typography
 */

import type { TextStyle } from 'react-native';
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
  heading1: any;
  heading2: any;
  heading3: any;
  bodyLarge: any;
  bodyMedium: any;
  bodySmall: any;
  caption: any;
  label: any;
  labelSmall: any;
  eyebrow: any;
}

export function getTypography(colors: SemanticTokens, fontScale = 1): TypographyStyles {
  const scale = typographyScale;
  
  return {
    // Headings
    heading1: {
      fontSize: scale.fontSizeXxl * fontScale,
      fontWeight: scale.fontWeightBold,
      lineHeight: scale.fontSizeXxl * fontScale * scale.lineHeightTight,
      color: colors.textPrimary,
      fontFamily: scale.familyHeading,
    },
    heading2: {
      fontSize: scale.fontSizeXl * fontScale,
      fontWeight: scale.fontWeightBold,
      lineHeight: scale.fontSizeXl * fontScale * scale.lineHeightTight,
      color: colors.textPrimary,
      fontFamily: scale.familyHeading,
    },
    heading3: {
      fontSize: scale.fontSizeLg * fontScale,
      fontWeight: scale.fontWeightSemibold,
      lineHeight: scale.fontSizeLg * fontScale * scale.lineHeightTight,
      color: colors.textPrimary,
      fontFamily: scale.familyHeading,
    },
    
    // Body text
    bodyLarge: {
      fontSize: scale.fontSizeMd * fontScale,
      fontWeight: scale.fontWeightRegular,
      lineHeight: scale.fontSizeMd * fontScale * scale.lineHeightNormal,
      color: colors.bodyText,
      fontFamily: scale.familyMain,
    },
    bodyMedium: {
      fontSize: scale.fontSizeMd * fontScale,
      fontWeight: scale.fontWeightRegular,
      lineHeight: scale.fontSizeMd * fontScale * scale.lineHeightNormal,
      color: colors.textSecondary,
      fontFamily: scale.familyMain,
    },
    bodySmall: {
      fontSize: scale.fontSizeSm * fontScale,
      fontWeight: scale.fontWeightRegular,
      lineHeight: scale.fontSizeSm * fontScale * scale.lineHeightNormal,
      color: colors.textTertiary,
      fontFamily: scale.familyMain,
    },
    
    // Captions & Labels
    caption: {
      fontSize: scale.fontSizeXs * fontScale,
      fontWeight: scale.fontWeightRegular,
      lineHeight: scale.fontSizeXs * fontScale * scale.lineHeightTight,
      color: colors.textTertiary,
      fontFamily: scale.familyMain,
    },
    label: {
      fontSize: scale.fontSizeSm * fontScale,
      fontWeight: scale.fontWeightSemibold,
      lineHeight: scale.fontSizeSm * fontScale * scale.lineHeightNormal,
      color: colors.textPrimary,
      fontFamily: scale.familyMain,
    },
    labelSmall: {
      fontSize: scale.fontSizeXs * fontScale,
      fontWeight: scale.fontWeightSemibold,
      lineHeight: scale.fontSizeXs * fontScale * scale.lineHeightTight,
      color: colors.textPrimary,
      fontFamily: scale.familyMain,
    },
    eyebrow: {
      fontSize: scale.fontSizeSm * fontScale,
      fontWeight: scale.fontWeightSemibold,
      lineHeight: scale.fontSizeSm * fontScale * scale.lineHeightTight,
      color: colors.textSecondary,
      fontFamily: scale.familyMain,
      textTransform: 'uppercase' as any,
    },
  };
}

export default { getTypography, typographyScale };
