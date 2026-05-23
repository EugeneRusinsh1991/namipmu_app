import { StyleSheet } from 'react-native';

export const quizStyles = StyleSheet.create({
  quizContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e1d9d1',
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
    borderColor: '#6b8f67',
    backgroundColor: '#eaf2e8',
  },
  quizOptionCorrect: {
    borderColor: '#3d7f3d',
    backgroundColor: '#d8f0d8',
  },
  quizOptionWrong: {
    borderColor: '#c24f4f',
    backgroundColor: '#f4d7d7',
  },
  quizOptionText: {
    fontSize: 16,
    color: '#2b2520',
  },
  quizSubmitButton: {
    marginTop: 8,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#6b8f67',
  },
  quizSubmitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  quizResultText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#2b2520',
  },
});
