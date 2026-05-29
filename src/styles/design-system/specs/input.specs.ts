import type { SemanticTypographyRole, VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface InputSpecs extends SemanticTypographyRole {
  height: number;
  paddingHorizontal: number;
  paddingVertical: number;
  borderRadius: number;
  borderWidth: number;
  backgroundColor: string;
  borderColor: string;
  placeholderColor: string;
  textColor: string;
  focusBorderColor: string;
}

export function getInputSpecs(tokens: SemanticTokens & VisualFoundation): InputSpecs {
  return {
    height: tokens.sizing.inputHeight,
    paddingHorizontal: tokens.sizing.inputPaddingHorizontal,
    paddingVertical: tokens.sizing.inputPaddingVertical,
    borderRadius: tokens.borders.radiusStandard,
    borderWidth: 0,
    backgroundColor: tokens.surface.surfacePrimary,
    borderColor: tokens.interactive.inputBorder,
    placeholderColor: tokens.text.tertiary,
    textColor: tokens.text.primary,
    fontSize: tokens.text.fontSize,
    fontWeight: tokens.text.fontWeight,
    lineHeight: tokens.text.lineHeight,
    fontFamily: tokens.text.fontFamily,
    focusBorderColor: tokens.interactive.accent,
  };
}
