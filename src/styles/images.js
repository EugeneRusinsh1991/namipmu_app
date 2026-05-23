import { Platform, StyleSheet } from 'react-native';
import { layout } from './theme';

export const imageStyles = StyleSheet.create({
  squareCenteredImage: {
    width: 300,          // максимум
    height: 300,         // максимум (квадрат)
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },

  responsiveImage: {
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },

  heroImage: {
    width: '100%',
    height: Platform.select({
      web: 250,
      default: 200,
    }),
    position: 'relative',
    marginBottom: Platform.select({
      web: -40,      // Уменьшаем нахлест пропорционально высоте
      default: -30,  // Уменьшаем нахлест для мобильных
    }),
    zIndex: 0,
    overflow: 'hidden',
  },

  heroImageBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.select({
      web: 120,      // Адаптируем высоту градиента под новую высоту блока
      default: 80,   // Адаптируем градиент для мобильных
    }),
  },

  videoContainer: {
    height: 220,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
});
