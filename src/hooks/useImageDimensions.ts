import { useCallback, useMemo, useState } from 'react';
import {
    Image,
    ImageErrorEventData,
    ImageSourcePropType,
    NativeSyntheticEvent,
} from 'react-native';

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

  if (typeof source === 'object' && source !== null && 'uri' in source && source.uri) {
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

interface UseImageDimensionsResult {
  uri: string;
  isValidUri: boolean;
  actualAspectRatio: number | null;
  useFallback: boolean;
  failedUri: string;
  handleImageError: (event: NativeSyntheticEvent<ImageErrorEventData>) => void;
}

const useImageDimensions = (
  source: ImageSourcePropType | undefined | null,
  onError?: (error: NativeSyntheticEvent<ImageErrorEventData>) => void
): UseImageDimensionsResult => {
  const [failedUri, setFailedUri] = useState<string>('');
  const [useFallback, setUseFallback] = useState<boolean>(false);

  const uri = useMemo(() => getUriString(source), [source]);
  const isValidUri = useMemo(() => isValidUriString(uri), [uri]);

  const actualAspectRatio = useMemo<number | null>(() => {
    if (typeof source === 'number') {
      try {
        const resolved = Image.resolveAssetSource(source);
        if (resolved?.width && resolved?.height) {
          return resolved.width / resolved.height;
        }
      } catch {
        return null;
      }
    }

    return null;
  }, [source]);

  const handleImageError = useCallback(
    (event: NativeSyntheticEvent<ImageErrorEventData>) => {
      setFailedUri(uri);
      setUseFallback(true);
      if (typeof onError === 'function') {
        onError(event);
      }
    },
    [uri, onError]
  );

  return {
    uri,
    isValidUri,
    actualAspectRatio,
    useFallback,
    failedUri,
    handleImageError,
  };
};

export default useImageDimensions;
