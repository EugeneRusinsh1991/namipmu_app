import { StyleSheet } from 'react-native';

export const typographyStyles = StyleSheet.create({
  eyebrow: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#ffffff',
    fontFamily: 'sans-serif', // 'serif' для классического | 'sans-serif' для современного - МЕНЯЙ ТУТ
    letterSpacing: 1,
  },

  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'flex-start',
    fontFamily: 'sans-serif', // 'serif' для классического | 'sans-serif' для современного - МЕНЯЙ ТУТ
  },

  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'flex-start',
    fontFamily: 'sans-serif', // 'serif' для классического | 'sans-serif' для современного - МЕНЯЙ ТУТ
  },

  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#555',
    fontFamily: 'sans-serif', // 'serif' | 'sans-serif' - МЕНЯЙ ТУТ
    fontWeight: 'normal',
  },

  textLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    fontFamily: 'sans-serif', // 'serif' | 'sans-serif' - МЕНЯЙ ТУТ
  },
});
