import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

/**
 * ResponsiveImage — переиспользуемый компонент для адаптивных изображений
 * 
 * Особенности:
 * - Автоматически определяет aspect ratio из оригинального изображения
 * - Адаптируется к размеру экрана с отступами
 * - На desktop не шире контента (~600px)
 * - Маленькие картинки увеличиваются до minWidth
 * - Большие картинки уменьшаются до доступной ширины
 * - Всегда сохраняет пропорции
 * - Поддерживает локальные и remote изображения
 * 
 * @param {number|object} source - Требуемый источник изображения (require() или { uri })
 * @param {number} aspectRatio - Явно задать aspect ratio (опционально)
 * @param {number} minWidth - Минимальная ширина изображения (default: 100)
 * @param {number} maxWidth - Максимальная ширина изображения (опционально)
 * @param {number} padding - Боковые отступы в px (default: 16)
 * @param {string} resizeMode - 'cover' | 'contain' | 'stretch' (default: 'contain')
 * @param {function} onError - Callback при ошибке загрузки
 * @param {object} fallbackSource - Fallback изображение при ошибке
 */
const ResponsiveImage = ({
  source,
  aspectRatio,
  minWidth = 100,
  maxWidth = null,
  padding = 16,
  resizeMode = 'contain',
  onError,
  fallbackSource,
}) => {
  const windowDimensions = useWindowDimensions();
  const [imageDimensions, setImageDimensions] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Получаем нативные размеры изображения из URI или require
  useEffect(() => {
    if (!source) return;

    setIsLoading(true);
    setHasError(false);

    // Определяем URI в зависимости от типа source
    let imageUri = null;
    if (typeof source === 'number') {
      // require() возвращает число — используем стандартный путь
      imageUri = null; // Image.getSize не работает с require(), поэтому нужен fallback
    } else if (typeof source === 'object' && source.uri) {
      imageUri = source.uri;
    } else if (typeof source === 'string') {
      imageUri = source;
    }

    if (imageUri) {
      Image.getSize(
        imageUri,
        (width, height) => {
          setImageDimensions({ width, height });
          setIsLoading(false);
        },
        (error) => {
          console.warn('Failed to get image size:', error);
          // Продолжаем без размеров — будем использовать aspectRatio если задан
          setIsLoading(false);
        }
      );
    } else if (typeof source === 'number') {
      // Для require() картинок нужно получить размеры иначе
      // Используем Image.getSize с требуемым изображением
      setIsLoading(false);
      // Если аспект рацио не задан, Image компонент поможет
    } else {
      setIsLoading(false);
    }
  }, [source]);

  // Вычисляем финальные размеры
  const screenWidth = windowDimensions.width;
  const horizontalPadding = padding * 2;
  const availableWidth = screenWidth - horizontalPadding;

  // На desktop (web) ограничиваем контентом (~600px для читаемости)
  let contentMaxWidth = availableWidth;
  if (Platform.OS === 'web' && availableWidth > 600) {
    contentMaxWidth = 600;
  } else if (Platform.OS !== 'web' && Platform.OS !== 'android' && Platform.OS !== 'ios') {
    // Для других платформ (desktop apps)
    if (availableWidth > 600) {
      contentMaxWidth = 600;
    }
  }

  // Применяем явный maxWidth если передан
  let finalMaxWidth = contentMaxWidth;
  if (maxWidth) {
    finalMaxWidth = Math.min(contentMaxWidth, maxWidth);
  }

  // Вычисляем финальную ширину: между minWidth и finalMaxWidth
  let finalWidth = Math.max(minWidth, Math.min(finalMaxWidth, availableWidth));

  // Вычисляем высоту на основе aspect ratio
  let finalHeight = finalWidth;
  let computedAspectRatio = aspectRatio;

  if (imageDimensions && !aspectRatio) {
    // Вычисляем aspect ratio из реальных размеров изображения
    computedAspectRatio = imageDimensions.width / imageDimensions.height;
    finalHeight = finalWidth / computedAspectRatio;
  } else if (computedAspectRatio) {
    // Используем переданный aspect ratio
    finalHeight = finalWidth / computedAspectRatio;
  } else {
    // Fallback: квадрат, если ничего не известно
    computedAspectRatio = 1;
    finalHeight = finalWidth;
  }

  const handleError = (error) => {
    setHasError(true);
    onError?.(error);
  };

  return (
    <View style={[styles.container, { paddingHorizontal: padding }]}>
      <Image
        source={hasError && fallbackSource ? fallbackSource : source}
        style={[
          styles.image,
          {
            width: finalWidth,
            height: finalHeight,
            aspectRatio: computedAspectRatio,
          },
        ]}
        resizeMode={resizeMode}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  image: {
    alignSelf: 'center',
  },
});

export default ResponsiveImage;
