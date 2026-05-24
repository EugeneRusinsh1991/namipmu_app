import { StyleSheet } from 'react-native';
import * as themeModule from './theme';

export function createQuizStyles(colors) {
  return StyleSheet.create({
    quizContainer: {
      marginBottom: 20,
      padding: 16,
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    quizTitle: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 8,
      color: colors.textPrimary,
    },
    quizDescription: {
      fontSize: 16,
      lineHeight: 22,
      marginBottom: 16,
      color: colors.bodyText,
    },
    quizEmpty: {
      fontSize: 16,
      color: colors.muted,
    },
    quizQuestionBlock: {
      marginBottom: 16,
    },
    quizQuestion: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
      color: colors.textPrimary,
    },
    quizOption: {
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 8,
      backgroundColor: colors.inputBackground,
    },
    quizOptionSelected: {
      borderColor: colors.accent,
      backgroundColor: colors.softAccent,
    },
    quizOptionCorrect: {
      borderColor: colors.success,
      backgroundColor: colors.success ? colors.success : colors.softAccent,
    },
    quizOptionWrong: {
      borderColor: colors.warning,
      backgroundColor: colors.warning ? colors.warning : colors.softAccent,
    },
    quizOptionText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    quizSubmitButton: {
      marginTop: 8,
      padding: 14,
      borderRadius: 12,
      alignItems: 'center',
      backgroundColor: colors.softAccent,
    },
    quizSubmitText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.accent,
    },
    quizResultText: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
    },
  });
}

export const quizStyles = createQuizStyles(themeModule.colors);
