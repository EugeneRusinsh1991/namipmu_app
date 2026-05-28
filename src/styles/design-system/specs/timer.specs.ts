import type { TextStyle } from 'react-native';
import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface TimerSpecs {
  containerPadding: number;
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  displayFontSize: number;
  displayFontWeight: TextStyle['fontWeight'];
  displayColor: string;
  buttonPadding: number;
  buttonBorderRadius: number;
  ringSize: number;
}

export function getTimerSpecs(tokens: SemanticTokens & VisualFoundation): TimerSpecs {
  return {
    containerPadding: tokens.spacing.lg,
    padding: tokens.spacing.lg,
    marginVertical: tokens.spacing.md,
    borderRadius: tokens.borders.radiusLg,
    backgroundColor: tokens.surface.surfaceSecondary,
    borderColor: tokens.interactive.border,
    displayFontSize: tokens.typography.fontSizeXxl,
    displayFontWeight: tokens.typography.fontWeightBold as TextStyle['fontWeight'],
    displayColor: tokens.text.primary,
    buttonPadding: tokens.spacing.md,
    buttonBorderRadius: tokens.borders.radiusMd,
    ringSize: 160,
  };
}
