import React, { FC, useState } from 'react';
import { Image, ImageResizeMode, ImageStyle } from 'react-native';
import { getUriFromSource, isLikelyValidUri } from '../utils/imageHelpers';

const componentDefaults = require('../styles/componentDefaults').componentStyles;

const errorImage = require('../../assets/images/error.jpg');

/**
 * Props для компонента ImageWithFallback
 */
interface ImageWithFallbackProps {
  /** Источник изображения */
  source: any;
  
  /** Стили для изображения */
  style?: ImageStyle;
  
  /** Ширина изображения */
  width?: number;
  
  /** Высота изображения */
  height?: number;
  
  /** Соотношение сторон */
  aspectRatio?: number;
  
  /** Режим отображения изображения */
  resizeMode?: ImageResizeMode;
  
  /** Стили для fallback изображения */
  fallbackStyle?: ImageStyle;
}

/**
 * ImageWithFallback — компонент для изображений с обработкой ошибок
 * Используется для heroImage. Для адаптивных изображений используйте ResponsiveImage.
 */
const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  source,
  style,
  width,
  height,
  aspectRatio,
  resizeMode = 'cover',
  fallbackStyle = {},
}) => {
  const [failedUri, setFailedUri] = useState<string>('');
  const [useFallback, setUseFallback] = useState<boolean>(false);

  /**
   * Обработчик ошибки загрузки
   */
  const handleError = (e: any): void => {
    const uri = getUriFromSource(source);
    setFailedUri(uri);
    setUseFallback(true);
    console.warn('ImageWithFallback failed to load:', uri, e?.nativeEvent || e);
  };

  /**
   * Проверяет, является ли значение положительным числом
   */
  const isPositiveNumber = (value: any): value is number => 
    typeof value === 'number' && value > 0;

  // Строим стиль из параметров, игнорируя нулевые размеры и неверный aspectRatio
  const computedStyle: ImageStyle = {
    ...style,
    ...(isPositiveNumber(width) && { width }),
    ...(isPositiveNumber(height) && { height }),
    ...(isPositiveNumber(aspectRatio) && { aspectRatio }),
    ...fallbackStyle,
  };

  // Ensure borderRadius is applied to Image itself (Android needs it on the image)
  if (!computedStyle.borderRadius) {
    computedStyle.borderRadius = componentDefaults?.image?.borderRadius;
  }

  const uri = getUriFromSource(source);
  const invalidUri = !source || !isLikelyValidUri(uri);
  const shouldUseFallback = useFallback || invalidUri || uri === failedUri;

  // choose final source: either original or local error image
  const finalSource = shouldUseFallback ? errorImage : source;

  // If finalSource is a local asset, try to derive aspect ratio to avoid zero-height blanks
  let assetAspect: number | null = null;
  try {
    if (typeof finalSource === 'number') {
      const resolved = Image.resolveAssetSource(finalSource);
      if (resolved && resolved.width && resolved.height) {
        assetAspect = resolved.width / resolved.height;
      }
    }
  } catch (e) {
    // ignore
  }

  // If no explicit size provided and we have asset aspect, apply it
  const finalComputedStyle: ImageStyle = { ...computedStyle };
  if (!finalComputedStyle.width && !finalComputedStyle.height && assetAspect) {
    finalComputedStyle.aspectRatio = assetAspect;
  }

  return (
    <Image
      source={finalSource}
      style={finalComputedStyle}
      onError={handleError}
      resizeMode={resizeMode}
    />
  );
};

export default ImageWithFallback;
