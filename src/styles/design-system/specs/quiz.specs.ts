import type { SemanticTypographyRole, VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';
import { getTypography } from '../typography';

export interface QuizSpecs {
  containerPadding: number;
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  containerShadow: VisualFoundation['shadows']['standard'];
  
  // Question typography — uses semantic role
  questionText: SemanticTypographyRole;
  questionMarginBottom: number;
  questionColor: string;
  
  // Answer typography — uses semantic role
  answerText: SemanticTypographyRole;
  answerPadding: number;
  answerMargin: number;
  answerBorderRadius: number;
  answerColor: string;
  answerBgColor: string;
  answerBorderColor: string;
  
  // Answer states
  selectedBgColor: string;
  selectedBorderColor: string;
  correctBgColor: string;
  correctBorderColor: string;
  wrongBgColor: string;
  wrongBorderColor: string;
}

export function getQuizSpecs(tokens: SemanticTokens & VisualFoundation): QuizSpecs {
  // Ensure we derive semantic typography roles from the theme+foundation
  // rather than relying on `tokens.text` which can be shadowed by color objects
  const typography = getTypography(tokens as any);
  return {
    containerPadding: tokens.componentSpacing.quiz.container,
    padding: tokens.spacing.standard,
    marginVertical: tokens.spacing.standard,
    borderRadius: tokens.borders.radiusStandard,
    backgroundColor: tokens.surface.surfaceSecondary,
    borderColor: tokens.interactive.border,
    borderWidth: 0,
    containerShadow: tokens.shadows.standard,
    
    // Question typography — subheading role
    questionText: typography.subheading,
    questionMarginBottom: tokens.spacing.standard,
    questionColor: tokens.text.primary,
    
    // Answer typography — text role
    answerText: typography.text,
    answerPadding: tokens.componentSpacing.quiz.answerPadding,
    answerMargin: tokens.componentSpacing.quiz.answerMarginVertical,
    answerBorderRadius: tokens.borders.radiusStandard,
    answerColor: tokens.text.primary,
    answerBgColor: tokens.surface.surfacePrimary,
    answerBorderColor: tokens.interactive.border,
    
    // Answer states
    selectedBgColor: tokens.interactive.accentLight,
    selectedBorderColor: tokens.interactive.accent,
    correctBgColor: tokens.text.success,
    correctBorderColor: tokens.text.success,
    wrongBgColor: tokens.text.danger,
    wrongBorderColor: tokens.text.danger,
  };
}
