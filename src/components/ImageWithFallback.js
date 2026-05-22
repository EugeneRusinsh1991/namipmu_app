import React, { useState } from 'react';
import { Image } from 'react-native';

const errorImage = require('../../assets/images/error.jpg');

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
  fallbackStyle = {} 
}) => {
  const [failedSource, setFailedSource] = useState(null);

  // Обработчик ошибки загрузки
  const handleError = () => {
    setFailedSource(source);
  };

  const isPositiveNumber = value => typeof value === 'number' && value > 0;

  // Строим стиль из параметров, игнорируя нулевые размеры и неверный aspectRatio
  const computedStyle = {
    ...style,
    ...(isPositiveNumber(width) && { width }),
    ...(isPositiveNumber(height) && { height }),
    ...(isPositiveNumber(aspectRatio) && { aspectRatio }),
    ...(resizeMode && { resizeMode }),
    ...fallbackStyle,
  };

  return (
    <Image
      source={!source || failedSource === source ? errorImage : source}
      style={computedStyle}
      onError={handleError}
      resizeMode={resizeMode}
    />
  );
};

export default ImageWithFallback;
