import React, { FC, useMemo } from 'react';
import {
    Image,
    ImageErrorEventData,
    ImageResizeMode,
    NativeSyntheticEvent,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import { useDesignTokens } from '../hooks/useDesignTokens';
import useImageDimensions from '../hooks/useImageDimensions';
import { getResponsiveImageStyle } from '../utils/imageSizing';

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
  padding,
  resizeMode = 'contain',
  onError,
  fallbackSource,
}) => {
  const { tokens, specs } = useDesignTokens();
  const windowDimensions = useWindowDimensions();
  const resolvedPadding = padding ?? tokens.spacing.standard;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent: 'center',
          padding: resolvedPadding,
          width: '100%',
          maxWidth: tokens.layout.contentMaxWidth,
        },
        wrapper: {
          alignSelf: 'center',
          width: '100%',
          borderRadius: specs.image.card.borderRadius ?? tokens.borders.radiusStandard,
          backgroundColor: tokens.surface.surfacePrimary,
          ...specs.image.card.shadow,
        },
        imageWrapper: {
          width: '100%',
          borderRadius: specs.image.card.borderRadius ?? tokens.borders.radiusStandard,
          borderWidth: tokens.borders.widthStandard,
          borderColor: tokens.borderDefault,
          backgroundColor: tokens.cardBackground,
          overflow: 'hidden',
        },
        image: {
          width: '100%',
          height: '100%',
          backgroundColor: tokens.cardBackground,
        },
      }),
    [tokens, specs, resolvedPadding]
  );

  const {
    uri,
    isValidUri,
    actualAspectRatio,
    useFallback,
    failedUri,
    handleImageError,
  } = useImageDimensions(source, onError);

  const imageStyle = useMemo(
    () =>
      getResponsiveImageStyle({
        windowWidth: windowDimensions.width,
        padding: resolvedPadding,
        minWidth,
        maxWidth,
        layoutMaxContentWidth: tokens.layout.contentMaxWidth,
        explicitAspectRatio: aspectRatio,
        actualAspectRatio,
      }),
    [windowDimensions.width, resolvedPadding, minWidth, maxWidth, tokens.layout.contentMaxWidth, aspectRatio, actualAspectRatio]
  );

  const shouldUseFallback =
    useFallback ||
    !source ||
    !isValidUri ||
    (!fallbackSource && !uri);


  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, imageStyle]}>
        <View style={styles.imageWrapper}>
          <Image
            source={shouldUseFallback ? fallbackSource || errorImage : source}
            style={styles.image}
            resizeMode={resizeMode}
            onError={handleImageError}
          />
        </View>
      </View>
    </View>
  );
};

export default ResponsiveImage;
