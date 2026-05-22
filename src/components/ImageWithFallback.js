import React, { useState } from 'react';
import { Image } from 'react-native';

const errorImage = require('../../assets/images/error.jpg');

function getUriString(src) {
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

function isValidUriString(uri) {
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
 * ImageWithFallback — простой компонент для изображений с обработкой ошибок
 * Используется для heroImage. Для адаптивных изображений используйте ResponsiveImage.
 */
const ImageWithFallback = ({
  source,
  style,
  width,
  height,
  aspectRatio,
  resizeMode = 'cover',
  fallbackStyle = {},
}) => {
  const [failedUri, setFailedUri] = useState('');
  const [useFallback, setUseFallback] = useState(false);

  // Обработчик ошибки загрузки
  const handleError = (e) => {
    const uri = getUriString(source);
    setFailedUri(uri);
    setUseFallback(true);
    console.warn('ImageWithFallback failed to load:', uri, e?.nativeEvent || e);
  };

  const isPositiveNumber = (value) => typeof value === 'number' && value > 0;

  // Строим стиль из параметров, игнорируя нулевые размеры и неверный aspectRatio
  const computedStyle = {
    ...style,
    ...(isPositiveNumber(width) && { width }),
    ...(isPositiveNumber(height) && { height }),
    ...(isPositiveNumber(aspectRatio) && { aspectRatio }),
    ...fallbackStyle,
  };

  const uri = getUriString(source);
  const invalidUri = !source || (typeof uri === 'string' && !isValidUriString(uri));
  const shouldUseFallback = useFallback || invalidUri || uri === failedUri;

  // choose final source: either original or local error image
  const finalSource = shouldUseFallback ? errorImage : source;

  // If finalSource is a local asset, try to derive aspect ratio to avoid zero-height blanks
  let assetAspect = null;
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
  const finalComputedStyle = { ...computedStyle };
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
