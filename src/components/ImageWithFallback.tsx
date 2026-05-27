import React, { FC, useState } from 'react';
import { Image, ImageResizeMode, ImageStyle } from 'react-native';
const componentDefaults = require('../styles/componentDefaults').componentStyles;

const errorImage = require('../../assets/images/error.jpg');

/**
 * Функция для преобразования источника в URI строку
 */
function getUriString(src: any): string {
  if (!src) return '';
  if (typeof src === 'number') {
    try {
      const resolved = Image.resolveAssetSource(src);
      return resolved && resolved.uri ? String(resolved.uri) : '';
    } catch (e) {
      return '';
    }
  }
  if (typeof src === 'object' && src.uri) return String(src.uri);
  if (typeof src === 'string') return src;
  return '';
}

/**
 * Проверяет, является ли строка валидным URI
 */
function isValidUriString(uri: any): boolean {
  if (!uri) return false;
  const s = String(uri).trim();
  if (!s) return false;
  if (/^https?:\/\//i.test(s)) return true;
  if (/^file:\/\//i.test(s)) return true;
  if (/^data:/i.test(s)) return true;
  if (s.includes('images/') || s.includes('assets/')) return true;
  if (/\.(jpg|jpeg|png|gif|webp|mp4)(\?.*)?$/i.test(s)) return true;
  return false;
}

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
    const uri = getUriString(source);
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

  const uri = getUriString(source);
  const invalidUri = !source || (typeof uri === 'string' && !isValidUriString(uri));
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
