import React from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import useImageDimensions from '../hooks/useImageDimensions';
import { layout as layoutTokens } from '../styles/theme';
import { getResponsiveImageStyle } from '../utils/imageSizing';
import styles from './ResponsiveImage/styles';

const errorImage = require('../../assets/images/error.jpg');

const ResponsiveImage = ({
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

  return (
    <View style={styles.container}>
      <Image
        source={shouldUseFallback ? (fallbackSource || errorImage) : source}
        style={[styles.image, imageStyle]}
        resizeMode={resizeMode}
        onError={handleImageError}
      />
    </View>
  );
};

export default ResponsiveImage;
