import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

const ImageWithFallback = ({ source, style, width, height, aspectRatio, resizeMode, fallbackStyle = {} }) => {
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

  const computedStyle = [
    style,
    width != null ? { width } : null,
    height != null ? { height } : null,
    aspectRatio != null ? { aspectRatio } : null,
    resizeMode ? { resizeMode } : null,
  ];

  return (
    <Image
      source={hasError ? errorImage : validSource}
      style={[...computedStyle, fallbackStyle]}
      onError={handleError}
      defaultSource={errorImage}
    />
  );
};

export default ImageWithFallback;
