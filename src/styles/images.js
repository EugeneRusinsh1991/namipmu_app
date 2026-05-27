import { Platform, StyleSheet } from 'react-native';
import { IMAGE_SIZES } from './content-dimensions';

/**
 * Image Styles
 * 
 * Динамические стили для изображений в зависимости от типа и платформы.
 * Используются в компонентах для отображения изображений с правильными размерами.
 * 
 * Все размеры берут из content-dimensions.ts для централизованного управления.
 */
export const imageStyles = StyleSheet.create({
  /**
   * Квадратное изображение с максимумом 300x300
   * Используется для центрированного отображения
   */
  squareCenteredImage: {
    width: IMAGE_SIZES.square.width,
    height: IMAGE_SIZES.square.height,
    alignSelf: 'center',
    marginBottom: IMAGE_SIZES.square.marginBottom,
    resizeMode: 'contain',
  },

  /**
   * Отзывчивое изображение
   * Масштабируется в зависимости от ширины экрана
   */
  responsiveImage: {
    alignSelf: 'center',
    marginBottom: IMAGE_SIZES.square.marginBottom,
    resizeMode: 'contain',
  },

  /**
   * Hero image - большое изображение в начале экрана
   * Platform-specific (Web vs Mobile имеют разные высоты)
   */
  heroImage: {
    width: '100%',
    height: Platform.select({
      web: 250,                              // Веб: чуть выше
      default: IMAGE_SIZES.hero.height,      // Мобильные: 200px
    }),
    position: 'relative',
    marginBottom: Platform.select({
      web: -40,                              // Веб: больший overlap
      default: IMAGE_SIZES.hero.marginBottom, // Мобильные: -30px
    }),
    zIndex: 0,
    overflow: 'hidden',
  },

  /**
   * Фоновое изображение для hero блока
   */
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

  /**
   * Градиент поверх hero изображения (для читаемости текста)
   */
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Platform.select({
      web: 120,    // Веб: выше градиента
      default: 80, // Мобильные: нормальный градиент
    }),
  },

  /**
   * Контейнер для видео
   * Фиксированная высота с правильным border-radius
   */
  videoContainer: {
    height: IMAGE_SIZES.video.height,
    borderRadius: IMAGE_SIZES.video.borderRadius,
    overflow: IMAGE_SIZES.video.overflow,
    width: '100%',
    maxWidth: 600, // Можно получить из tokens если нужно
    alignSelf: 'center',
  },
});

export default imageStyles;
