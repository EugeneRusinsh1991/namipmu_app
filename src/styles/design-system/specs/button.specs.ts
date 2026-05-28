import type { TextStyle } from 'react-native';
import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface ButtonSpecs {
  primary: {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    fontWeight: TextStyle['fontWeight'];
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
    fontWeight: TextStyle['fontWeight'];
    lineHeight: number;
  };
  ghost: {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    fontWeight: TextStyle['fontWeight'];
    lineHeight: number;
  };
  disabled: {
    opacity: number;
  };
}

export function getButtonSpecs(tokens: SemanticTokens & VisualFoundation): ButtonSpecs {
  return {
    primary: {
      height: 52,
      paddingHorizontal: tokens.spacing.lg,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radiusMd,
      backgroundColor: tokens.interactive.accent,
      textColor: tokens.text.onAccent,
      fontSize: tokens.typography.fontSizeMd,
      fontWeight: tokens.typography.fontWeightSemibold as TextStyle['fontWeight'],
      lineHeight: tokens.typography.lineHeightNormal,
      shadowElevation: tokens.shadows.md.elevation,
    },
    secondary: {
      height: 52,
      paddingHorizontal: tokens.spacing.lg,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radiusMd,
      backgroundColor: tokens.surface.surfacePrimary,
      borderWidth: 0,
      borderColor: tokens.interactive.border,
      textColor: tokens.text.primary,
      fontSize: tokens.typography.fontSizeMd,
      fontWeight: tokens.typography.fontWeightSemibold as TextStyle['fontWeight'],
      lineHeight: tokens.typography.lineHeightNormal,
    },
    ghost: {
      height: 52,
      paddingHorizontal: tokens.spacing.lg,
      paddingVertical: tokens.spacing.md,
      borderRadius: tokens.borders.radiusMd,
      backgroundColor: 'transparent',
      textColor: tokens.interactive.accent,
      fontSize: tokens.typography.fontSizeMd,
      fontWeight: tokens.typography.fontWeightSemibold as TextStyle['fontWeight'],
      lineHeight: tokens.typography.lineHeightNormal,
    },
    disabled: {
      opacity: 0.55,
    },
  };
}
