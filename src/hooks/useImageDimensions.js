import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { getUriFromSource, isLikelyValidUri } from '../utils/imageHelpers';

export default function useImageDimensions(source, onError) {
  const [imageDimensions, setImageDimensions] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [failedUri, setFailedUri] = useState('');
  const [useFallback, setUseFallback] = useState(false);

  const uri = getUriFromSource(source);
  const isValidUri = isLikelyValidUri(uri);

  const assetAspectRatio = (() => {
    if (typeof source === 'number') {
      try {
        const resolved = Image.resolveAssetSource(source);
        if (resolved && resolved.width && resolved.height) {
          return resolved.width / resolved.height;
        }
      } catch (error) {
        return null;
      }
    }
    return null;
  })();

  const actualAspectRatio = assetAspectRatio ||
    (imageDimensions && imageDimensions.width && imageDimensions.height
      ? imageDimensions.width / imageDimensions.height
      : null);

  useEffect(() => {
    if (!source || !uri) {
      return;
    }

    Image.getSize(
      uri,
      (width, height) => {
        setImageDimensions({ width, height });
      },
      (error) => {
        setLoadError(error);
        setUseFallback(true);
        onError?.(error);
      }
    );
  }, [source, uri, onError]);

  const handleImageError = (error) => {
    setFailedUri(uri);
    setUseFallback(true);
    onError?.(error);
  };

  return {
    uri,
    isValidUri,
    actualAspectRatio,
    imageDimensions,
    assetAspectRatio,
    loadError,
    failedUri,
    useFallback,
    handleImageError,
  };
}
