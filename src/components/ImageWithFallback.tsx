import React, { useMemo, useState } from 'react';
import {
    Image,
    ImageResizeMode,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    StyleSheet,
} from 'react-native';
import { useDesignTokens } from '../hooks/useDesignTokens';

const errorImage: ImageSourcePropType = require('../../assets/images/error.jpg');

const getUriString = (source: ImageSourcePropType | undefined | null): string => {
  if (!source) return '';

  if (typeof source === 'number') {
    try {
      const resolved = Image.resolveAssetSource(source);
      return resolved?.uri ? String(resolved.uri) : '';
    } catch {
      return '';
    }
  }

  if (typeof source === 'object' && 'uri' in source && source.uri) {
    return String(source.uri);
  }

  if (typeof source === 'string') {
    return source;
  }

  return '';
};

const isValidUriString = (uri: unknown): boolean => {
  if (!uri) return false;

  const value = String(uri).trim();
  if (!value) return false;
  if (/^https?:\/\//i.test(value)) return true;
  if (/^file:\/\//i.test(value)) return true;
  if (/^data:/i.test(value)) return true;
  if (value.includes('images/') || value.includes('assets/')) return true;
  if (/\.(jpg|jpeg|png|gif|webp|mp4)(\?.*)?$/i.test(value)) return true;
  return false;
};

interface ImageWithFallbackProps {
  source?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  width?: number;
  height?: number;
  aspectRatio?: number;
  resizeMode?: ImageResizeMode;
  fallbackStyle?: StyleProp<ImageStyle>;
}

const ImageWithFallback = ({
  source,
  style,
  width,
  height,
  aspectRatio,
  resizeMode = 'cover',
  fallbackStyle,
}: ImageWithFallbackProps) => {
  const { tokens, specs } = useDesignTokens();
  const [failedUri, setFailedUri] = useState<string>('');
  const [useFallback, setUseFallback] = useState<boolean>(false);

  const uri = getUriString(source);
  const invalidUri = !source || !isValidUriString(uri);
  const shouldUseFallback = useFallback || invalidUri || uri === failedUri;
  const finalSource = shouldUseFallback ? errorImage : source;

  const computedStyle = useMemo<StyleProp<ImageStyle>>(() => {
    const normalizedStyle = StyleSheet.flatten(style) ?? {};
    const normalizedFallbackStyle = StyleSheet.flatten(fallbackStyle) ?? {};

    const mergedStyle: ImageStyle = {
      ...normalizedStyle,
      ...normalizedFallbackStyle,
      ...(typeof width === 'number' && width > 0 ? { width } : {}),
      ...(typeof height === 'number' && height > 0 ? { height } : {}),
      ...(typeof aspectRatio === 'number' && aspectRatio > 0 ? { aspectRatio } : {}),
    };

    if (mergedStyle.borderRadius == null) {
      mergedStyle.borderRadius = specs?.image?.borderRadius ?? tokens.borders.radiusMd;
    }

    return mergedStyle;
  }, [style, fallbackStyle, width, height, aspectRatio, specs?.image?.borderRadius, tokens.borders.radiusMd]);

  const finalComputedStyle = useMemo<StyleProp<ImageStyle>>(() => {
    const flattenedComputed = StyleSheet.flatten(computedStyle) ?? {};
    const styleObject = { ...flattenedComputed } as ImageStyle;

    let assetAspect: number | null = null;
    if (typeof finalSource === 'number') {
      try {
        const resolved = Image.resolveAssetSource(finalSource);
        if (resolved?.width && resolved?.height) {
          assetAspect = resolved.width / resolved.height;
        }
      } catch {
        assetAspect = null;
      }
    }

    if (!styleObject.width && !styleObject.height && assetAspect) {
      styleObject.aspectRatio = assetAspect;
    }

    return styleObject;
  }, [computedStyle, finalSource]);

  const handleError = (event: any) => {
    const sourceUri = getUriString(source);
    setFailedUri(sourceUri);
    setUseFallback(true);
    console.warn('ImageWithFallback failed to load:', sourceUri, event?.nativeEvent || event);
  };

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
