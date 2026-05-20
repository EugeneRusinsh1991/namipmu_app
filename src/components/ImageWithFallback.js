import React, { useEffect, useState } from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';

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

  // Ограничиваем ширину изображения размером экрана (с отступом)
  const screenWidth = Dimensions.get('window').width;
  const maxAllowedWidth = Math.max(0, screenWidth - 32);

  // Сливаем все стили в один объект для корректной модификации
  const flattened = StyleSheet.flatten([computedStyle, fallbackStyle]) || {};

  const finalStyle = { ...flattened };

  // Если явная ширина присутствует и больше максимально разрешённой — уменьшаем
  if (finalStyle.width && typeof finalStyle.width === 'number' && finalStyle.width > maxAllowedWidth) {
    finalStyle.width = maxAllowedWidth;
    // если не задан aspectRatio, и есть height — пересчитаем height пропорционально
    if (!finalStyle.aspectRatio && finalStyle.height && typeof finalStyle.height === 'number') {
      finalStyle.height = Math.round((finalStyle.height / flattened.width) * finalStyle.width);
    }
  }

  // Если нет явной ширины, задаём ширину по экрану с ограничением maxWidth
  if (!finalStyle.width) {
    finalStyle.width = Math.min(300, maxAllowedWidth);
  }

  // Для квадратного изображения, если нет aspectRatio, и width==height ожидалось — сохраняем квадрат
  if (!finalStyle.aspectRatio && finalStyle.height && finalStyle.height === flattened.height) {
    // ничего не делаем — высота уже установлена
  }

  return (
    <Image
      source={hasError ? errorImage : validSource}
      style={finalStyle}
      onError={handleError}
      defaultSource={errorImage}
      resizeMode={resizeMode || (finalStyle.resizeMode ? finalStyle.resizeMode : 'contain')}
    />
  );
};

export default ImageWithFallback;
