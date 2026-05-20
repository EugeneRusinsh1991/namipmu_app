import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

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
  const [hasError, setHasError] = useState(false);
  const [validSource, setValidSource] = useState(source);
  
  // ERROR картинка которая показывается при любой ошибке
  const errorImage = require('../../assets/images/error.jpg');

  useEffect(() => {
    // Проверяем валидность source при его изменении
    if (!source) {
      setHasError(true);
      setValidSource(errorImage);
    } else {
      setHasError(false);
      setValidSource(source);
    }
  }, [source]);

  // Обработчик ошибки загрузки
  const handleError = () => {
    setHasError(true);
    setValidSource(errorImage);
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
      source={hasError ? errorImage : validSource}
      style={computedStyle}
      onError={handleError}
      resizeMode={resizeMode}
    />
  );
};

export default ImageWithFallback;
