import type { SemanticTokens } from '../theme';

export interface TimerSpecs {
  containerPadding: number;
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  displayFontSize: number;
  displayFontWeight: string;
  displayColor: string;
  buttonPadding: number;
  buttonBorderRadius: number;
  ringSize: number;
}

export function getTimerSpecs(tokens: SemanticTokens): TimerSpecs {
  return {
    containerPadding: tokens.spacing.lg,
    padding: tokens.spacing.lg,
    marginVertical: tokens.spacing.md,
    borderRadius: tokens.borders.radiusLg,
    backgroundColor: tokens.surface.surfaceSecondary,
    borderColor: tokens.interactive.border,
    displayFontSize: tokens.typography.fontSizeXxl,
    displayFontWeight: tokens.typography.fontWeightBold,
    displayColor: tokens.text.primary,
    buttonPadding: tokens.spacing.md,
    buttonBorderRadius: tokens.borders.radiusMd,
    ringSize: 160,
  };
}
