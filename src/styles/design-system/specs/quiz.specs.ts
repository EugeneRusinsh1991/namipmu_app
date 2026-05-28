import type { SemanticTokens } from '../theme';

export interface QuizSpecs {
  containerPadding: number;
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  answerPadding: number;
  answerMargin: number;
  answerBorderRadius: number;
  selectedBgColor: string;
  selectedBorderColor: string;
  correctBgColor: string;
  correctBorderColor: string;
  wrongBgColor: string;
  wrongBorderColor: string;
}

export function getQuizSpecs(tokens: SemanticTokens): QuizSpecs {
  return {
    containerPadding: tokens.spacing.lg,
    padding: tokens.spacing.lg,
    marginVertical: tokens.spacing.md,
    borderRadius: tokens.borders.radiusLg,
    backgroundColor: tokens.surface.surfaceSecondary,
    borderColor: tokens.interactive.border,
    borderWidth: 0,
    answerPadding: tokens.spacing.md,
    answerMargin: tokens.spacing.sm,
    answerBorderRadius: tokens.borders.radiusMd,
    selectedBgColor: tokens.interactive.accentLight,
    selectedBorderColor: tokens.interactive.accent,
    correctBgColor: tokens.text.success,
    correctBorderColor: tokens.text.success,
    wrongBgColor: tokens.text.danger,
    wrongBorderColor: tokens.text.danger,
  };
}
