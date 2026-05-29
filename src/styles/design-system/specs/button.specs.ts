import type { TextStyle } from 'react-native';
import type { SemanticTypographyRole, VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface ButtonSpecs {
  primary: SemanticTypographyRole & {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    backgroundColor: string;
    textColor: string;
    shadowElevation: number;
  };
  secondary: SemanticTypographyRole & {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    backgroundColor: string;
    borderWidth: number;
    borderColor: string;
    textColor: string;
    shadowElevation: number;
  };
  ghost: SemanticTypographyRole & {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
    backgroundColor: string;
    textColor: string;
    shadowElevation: number;
  };
  disabled: {
    opacity: number;
  };
}

export function getButtonSpecs(tokens: SemanticTokens & VisualFoundation): ButtonSpecs {
  return {
    primary: {
      // Spread typography from text role
      ...tokens.text,
      // Override font weight to semibold for button emphasis
      fontWeight: '600' as TextStyle['fontWeight'],
      // Geometry pulled from foundation tokens
      height: tokens.sizing.buttonHeight,
      paddingHorizontal: tokens.sizing.buttonPaddingHorizontal,
      paddingVertical: tokens.sizing.buttonPaddingVertical,
      borderRadius: tokens.borders.radiusStandard,
      backgroundColor: tokens.interactive.accent,
      textColor: tokens.text.onAccent,
      shadowElevation: tokens.shadows.standard.elevation,
    },
    secondary: {
      // Spread typography from text role
      ...tokens.text,
      // Override font weight to semibold for button emphasis
      fontWeight: '600' as TextStyle['fontWeight'],
      // Same geometry as primary — uses foundation values
      height: tokens.sizing.buttonHeight,
      paddingHorizontal: tokens.sizing.buttonPaddingHorizontal,
      paddingVertical: tokens.sizing.buttonPaddingVertical,
      borderRadius: tokens.borders.radiusStandard,
      // Keep background neutral by default
      backgroundColor: tokens.surface.surfacePrimary,
      borderWidth: 0,
      borderColor: tokens.interactive.border,
      textColor: tokens.text.primary,
      shadowElevation: tokens.shadows.standard.elevation,
    },
    ghost: {
      // Spread typography from text role
      ...tokens.text,
      // Override font weight to semibold for button emphasis
      fontWeight: '600' as TextStyle['fontWeight'],
      // Ghost button geometry
      height: tokens.sizing.buttonHeight,
      paddingHorizontal: tokens.sizing.buttonPaddingHorizontal,
      paddingVertical: tokens.sizing.buttonPaddingVertical,
      borderRadius: tokens.borders.radiusStandard,
      backgroundColor: 'transparent',
      textColor: tokens.interactive.accent,
      shadowElevation: tokens.shadows.standard.elevation,
    },
    disabled: {
      opacity: 0.55,
    },
  };
}
