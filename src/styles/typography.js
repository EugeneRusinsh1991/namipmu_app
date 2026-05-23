import { StyleSheet } from 'react-native';

export const typographyStyles = StyleSheet.create({
  eyebrow: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    color: '#ffffff',
    fontFamily: 'sans-serif', // 'serif' для классического | 'sans-serif' для современного - МЕНЯЙ ТУТ
    letterSpacing: 1,
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // textTransform: 'uppercase', // 'none' | 'uppercase' | 'lowercase' | 'capitalize'
    // lineHeight: 24,
    // marginTop: 10,
    // opacity: 0.9,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1A1A',
    textAlign: 'flex-start',
    fontFamily: 'serif', // 'serif' для классического | 'sans-serif' для современного - МЕНЯЙ ТУТ
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // lineHeight: 56,
    // letterSpacing: -1,
    // textTransform: 'none',
    // marginTop: 20,
  },

  subtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1A1A1A',
    textAlign: 'flex-start',
    fontFamily: 'serif', // 'serif' для классического | 'sans-serif' для современного - МЕНЯЙ ТУТ
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // lineHeight: 36,
    // letterSpacing: 0.5,
    // fontStyle: 'italic', // 'normal' | 'italic'
  },

  text: {
    fontSize: 16,
    lineHeight: 26, // Свободный межстрочный интервал
    marginBottom: 12,
    color: '#666666',
    fontFamily: 'sans-serif', // 'serif' | 'sans-serif' - МЕНЯЙ ТУТ
    fontWeight: 'normal',
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // lineHeight: 24, // Более плотный интервал
    // textAlign: 'justify', // 'auto' | 'left' | 'right' | 'center' | 'justify'
    // letterSpacing: 0.2,
  },

  textLink: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    fontFamily: 'sans-serif', // 'serif' | 'sans-serif' - МЕНЯЙ ТУТ
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // textDecorationLine: 'underline', // 'none' | 'underline' | 'line-through'
    // fontWeight: '600',
    // paddingVertical: 10,
  },

  spacer: {
    fontSize: 32,
    lineHeight: 24,
    color: '#826cff',
    fontFamily: 'serif',
    fontWeight: 'bold',
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // marginVertical: 20,
    // letterSpacing: 5,
    // textAlign: 'center',
  },
});
