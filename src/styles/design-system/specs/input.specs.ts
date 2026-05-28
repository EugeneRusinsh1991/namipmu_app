import type { SemanticTokens } from '../theme';

export interface InputSpecs {
  height: number;
  paddingHorizontal: number;
  paddingVertical: number;
  borderRadius: number;
  borderWidth: number;
  backgroundColor: string;
  borderColor: string;
  placeholderColor: string;
  textColor: string;
  fontSize: number;
  fontWeight: string;
  focusBorderColor: string;
}

export function getInputSpecs(tokens: SemanticTokens): InputSpecs {
  return {
    height: 48,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderRadius: tokens.borders.radiusSm,
    borderWidth: 0,
    backgroundColor: tokens.surface.surfacePrimary,
    borderColor: tokens.interactive.inputBorder,
    placeholderColor: tokens.text.tertiary,
    textColor: tokens.text.primary,
    fontSize: tokens.typography.fontSizeMd,
    fontWeight: tokens.typography.fontWeightRegular,
    focusBorderColor: tokens.interactive.accent,
  };
}
