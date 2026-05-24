import { StyleSheet } from 'react-native';
import { colors, fonts } from './theme';

export const typographyStyles = StyleSheet.create({
  eyebrow: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0,
    color: colors.white,
    fontFamily: fonts.main,
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
    color: colors.textPrimary,
    textAlign: 'flex-start',
    fontFamily: fonts.accent,
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
    color: colors.textPrimary,
    textAlign: 'flex-start',
    fontFamily: fonts.accent,
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // lineHeight: 36,
    // letterSpacing: 0.5,
    // fontStyle: 'italic', // 'normal' | 'italic'
  },

  text: {
    fontSize: 16,
    lineHeight: 26, // Свободный межстрочный интервал
    marginBottom: 12,
    color: colors.bodyText,
    fontFamily: fonts.main,
    fontWeight: 'normal',
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // lineHeight: 24, // Более плотный интервал
    // textAlign: 'justify', // 'auto' | 'left' | 'right' | 'center' | 'justify'
    // letterSpacing: 0.2,
  },

  textLink: {
    marginTop: 20,
    fontSize: 16,
    color: colors.accent,
    textAlign: 'center',
    fontFamily: fonts.main,
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // textDecorationLine: 'underline', // 'none' | 'underline' | 'line-through'
    // fontWeight: '600',
    // paddingVertical: 10,
  },

  spacer: {
    fontSize: 32,
    lineHeight: 24,
    color: colors.accent,
    fontFamily: fonts.accent,
    fontWeight: 'bold',
    // fontFamily: 'YourCustomFontName', // Раскомментируй и укажи имя загруженного шрифта
    // marginVertical: 20,
    // letterSpacing: 5,
    // textAlign: 'center',
  },
});
