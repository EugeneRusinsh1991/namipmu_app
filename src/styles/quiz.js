import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const quizStyles = StyleSheet.create({
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
    color: '#2b2520',
  },
  quizDescription: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
    color: '#6a5c4f',
  },
  quizEmpty: {
    fontSize: 16,
    color: '#a29f9a',
  },
  quizQuestionBlock: {
    marginBottom: 16,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#2b2520',
  },
  quizOption: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cec3b8',
    marginBottom: 8,
    backgroundColor: '#f8f5f1',
  },
  quizOptionSelected: {
    borderColor: colors.accent,
    backgroundColor: '#f7e5e7',
  },
  quizOptionCorrect: {
    borderColor: colors.success,
    backgroundColor: '#e9efde',
  },
  quizOptionWrong: {
    borderColor: colors.warning,
    backgroundColor: '#f7e9df',
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
    backgroundColor: '#f5e8e9',
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
    color: '#2b2520',
  },
});
