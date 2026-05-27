import React, { FC } from 'react';
import { Image, ImageErrorEventData, ImageResizeMode, NativeSyntheticEvent, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import useImageDimensions from '../hooks/useImageDimensions';
import { layout as layoutTokens } from '../styles/theme';
import { getResponsiveImageStyle } from '../utils/imageSizing';
import styles from './ResponsiveImage/styles';

const errorImage = require('../../assets/images/error.jpg');

/**
 * Props для компонента ResponsiveImage
 */
interface ResponsiveImageProps {
  /** Источник изображения */
  source: any;
  
  /** Явное соотношение сторон */
  aspectRatio?: number;
  
  /** Минимальная ширина изображения */
  minWidth?: number;
  
  /** Максимальная ширина изображения */
  maxWidth?: number | null;
  
  /** Отступ контейнера */
  padding?: number;
  
  /** Режим отображения изображения */
  resizeMode?: ImageResizeMode;
  
  /** Обработчик ошибки загрузки */
  onError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void;
  
  /** Fallback источник при ошибке */
  fallbackSource?: any;
}

/**
 * ResponsiveImage — компонент для отзывчивых изображений с автоматическим расчетом размеров
 */
const ResponsiveImage: FC<ResponsiveImageProps> = ({
  source,
  aspectRatio,
  minWidth = 100,
  maxWidth = null,
  padding = layoutTokens.containerPadding,
  resizeMode = 'contain',
  onError,
  fallbackSource,
}) => {
  const windowDimensions = useWindowDimensions();
  const {
    uri,
    isValidUri,
    actualAspectRatio,
    useFallback,
    failedUri,
    handleImageError,
  } = useImageDimensions(source, onError);

  const imageStyle = getResponsiveImageStyle({
    windowWidth: windowDimensions.width,
    padding,
    minWidth,
    maxWidth,
    layoutMaxContentWidth: layoutTokens.maxContentWidth,
    explicitAspectRatio: aspectRatio,
    actualAspectRatio,
  });

  const shouldUseFallback = useFallback
    || !source
    || (!isValidUri && !fallbackSource)
    || (uri === failedUri && fallbackSource);

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={shouldUseFallback ? (fallbackSource || errorImage) : source}
        style={[
          styles.image,
          imageStyle,
          { borderColor: colors.border, backgroundColor: colors.cardBackground },
        ]}
        resizeMode={resizeMode}
        onError={handleImageError}
      />
    </View>
  );
};

export default ResponsiveImage;
