import React, { useEffect, useState } from 'react';
import { Image, Platform, StyleSheet, useWindowDimensions, View } from 'react-native';
import { layout as layoutTokens, spacing } from '../styles/theme';

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
  const [assetAspectRatio, setAssetAspectRatio] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Получаем нативные размеры изображения из URI или require
  useEffect(() => {
    if (!source) return;

    setIsLoading(true);
    setHasError(false);
    setAssetAspectRatio(null);

    // Определяем URI в зависимости от типа source
    let imageUri = null;
    if (typeof source === 'number') {
      try {
        const resolved = Image.resolveAssetSource(source);
        if (resolved && resolved.width && resolved.height) {
          setAssetAspectRatio(resolved.width / resolved.height);
        }
      } catch (error) {
        console.warn('Failed to resolve asset source:', error);
      }
      imageUri = null;
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
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  }, [source]);

  // Вычисляем финальные размеры
  const screenWidth = windowDimensions.width;
  const horizontalPadding = padding * 2;
  const availableWidth = screenWidth - horizontalPadding;

  // На desktop (web) ограничиваем контентом (theme.layout.maxContentWidth для читаемости)
  let contentMaxWidth = availableWidth;
  if (Platform.OS === 'web' && availableWidth > layoutTokens.maxContentWidth) {
    contentMaxWidth = layoutTokens.maxContentWidth;
  } else if (Platform.OS !== 'web' && Platform.OS !== 'android' && Platform.OS !== 'ios') {
    // Для других платформ (desktop apps)
    if (availableWidth > layoutTokens.maxContentWidth) {
      contentMaxWidth = layoutTokens.maxContentWidth;
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

  const actualAspectRatio = assetAspectRatio || (imageDimensions ? imageDimensions.width / imageDimensions.height : null);

  if (actualAspectRatio) {
    const diff = aspectRatio ? Math.abs(actualAspectRatio - aspectRatio) / aspectRatio : 1;
    if (!aspectRatio || diff > 0.15) {
      computedAspectRatio = actualAspectRatio;
    }
  }

  if (computedAspectRatio) {
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
    marginVertical: spacing.md,
  },
  image: {
    alignSelf: 'center',
  },
});

export default ResponsiveImage;
