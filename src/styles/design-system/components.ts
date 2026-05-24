/**
 * Design System - Component Specifications
 * 
 * Спецификации для CARD, QUIZ, CHECKLIST, Button и других компонентов.
 * Радиусы, тени, внутренние отступы — всё в одном месте.
 */

import { StyleSheet } from 'react-native';
import type { SemanticTokens } from './theme';
import { typographyScale } from './typography';

export interface ComponentSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ComponentRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
}

export interface ComponentShadow {
  elevation: number;
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffset: { width: number; height: number };
}

export interface ComponentSpecifications {
  spacing: ComponentSpacing;
  radius: ComponentRadius;
  shadows: {
    sm: ComponentShadow;
    md: ComponentShadow;
    lg: ComponentShadow;
  };
  
  // Component-specific styles
  card: any;
  button: any;
  input: any;
  quiz: any;
  checklist: any;
  timer: any;
  image: any;
}

export function getComponentSpecs(colors: SemanticTokens): ComponentSpecifications {
  const spacing: ComponentSpacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };
  
  const radius: ComponentRadius = {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 24,
    round: 999,
  };
  
  const shadows = {
    sm: {
      elevation: 2,
      shadowColor: colors.textPrimary,
      shadowOpacity: 0.05,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    md: {
      elevation: 3,
      shadowColor: colors.textPrimary,
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
    },
    lg: {
      elevation: 5,
      shadowColor: colors.textPrimary,
      shadowOpacity: 0.12,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
    },
  };
  
  return {
    spacing,
    radius,
    shadows,
    
    // CARD component
    card: StyleSheet.create({
      container: {
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: colors.cardBackground,
        padding: spacing.lg,
        ...shadows.md,
      },
      compact: {
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        backgroundColor: colors.cardBackground,
        padding: spacing.md,
        ...shadows.sm,
      },
    }),
    
    // BUTTON component
    button: StyleSheet.create({
      primary: {
        borderRadius: radius.md,
        padding: spacing.md,
        backgroundColor: colors.accent,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
      },
      secondary: {
        borderRadius: radius.md,
        padding: spacing.md,
        backgroundColor: colors.surfaceDefault,
        borderWidth: 1,
        borderColor: colors.borderDefault,
        justifyContent: 'center',
        alignItems: 'center',
      },
      disabled: {
        opacity: 0.5,
      },
    }),
    
    // INPUT component
    input: StyleSheet.create({
      container: {
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        backgroundColor: colors.inputBackground,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        color: colors.textPrimary,
      },
      placeholder: {
        color: colors.inputPlaceholder,
      },
    }),
    
    // QUIZ component
    quiz: StyleSheet.create({
      container: {
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginVertical: spacing.md,
        backgroundColor: colors.cardBackground,
        borderWidth: 1,
        borderColor: colors.cardBorder,
      },
      question: {
        color: colors.textPrimary,
        fontSize: typographyScale.fontSizeMd,
        fontWeight: typographyScale.fontWeightSemibold,
        marginBottom: spacing.md,
      },
      answer: {
        borderRadius: radius.md,
        padding: spacing.md,
        marginVertical: spacing.sm,
        borderWidth: 1,
        borderColor: colors.borderDefault,
        backgroundColor: colors.surfaceDefault,
      },
      answerText: {
        color: colors.bodyText,
        fontSize: typographyScale.fontSizeMd,
      },
      answerSelected: {
        borderColor: colors.accent,
        backgroundColor: colors.accentLight,
      },
      answerCorrect: {
        borderColor: colors.success,
        backgroundColor: colors.success,
        opacity: 0.1,
      },
      answerWrong: {
        borderColor: colors.danger,
        backgroundColor: colors.danger,
        opacity: 0.1,
      },
    }),
    
    // CHECKLIST component
    checklist: StyleSheet.create({
      container: {
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginVertical: spacing.md,
        backgroundColor: colors.cardBackground,
      },
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        backgroundColor: colors.surfaceDefault,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        marginBottom: spacing.md,
      },
      itemChecked: {
        backgroundColor: colors.accentLight,
        borderColor: colors.accent,
      },
      checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        marginRight: spacing.md,
        justifyContent: 'center',
        alignItems: 'center',
      },
      checkboxChecked: {
        backgroundColor: colors.success,
        borderColor: colors.success,
      },
      itemText: {
        flex: 1,
        color: colors.bodyText,
        fontSize: typographyScale.fontSizeMd,
      },
      itemTextChecked: {
        color: colors.textTertiary,
        textDecorationLine: 'line-through',
      },
    }),
    
    // TIMER component
    timer: StyleSheet.create({
      container: {
        borderRadius: radius.lg,
        padding: spacing.lg,
        marginVertical: spacing.md,
        backgroundColor: colors.cardBackground,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        ...shadows.md,
      },
      display: {
        fontSize: typographyScale.fontSizeXxl,
        fontWeight: typographyScale.fontWeightBold,
        color: colors.textPrimary,
        textAlign: 'center',
      },
      button: {
        borderRadius: radius.md,
        padding: spacing.md,
        marginVertical: spacing.sm,
        backgroundColor: colors.accentLight,
        borderWidth: 1,
        borderColor: colors.accent,
      },
      buttonActive: {
        backgroundColor: colors.accent,
      },
    }),
    
    // IMAGE component
    image: StyleSheet.create({
      container: {
        borderRadius: radius.lg,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.cardBorder,
      },
      image: {
        borderRadius: radius.lg,
      },
    }),
  };
}

export default { getComponentSpecs };
