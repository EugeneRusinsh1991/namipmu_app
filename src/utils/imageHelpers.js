import { Image } from 'react-native';

export function getUriFromSource(source) {
  if (!source) return '';

  if (typeof source === 'number') {
    try {
      const resolved = Image.resolveAssetSource(source);
      return resolved && resolved.uri ? String(resolved.uri) : '';
    } catch (error) {
      return '';
    }
  }

  if (typeof source === 'object' && source.uri) {
    return String(source.uri);
  }

  if (typeof source === 'string') {
    return source;
  }

  return '';
}

export function isLikelyValidUri(uri) {
  if (!uri) return false;

  const s = String(uri).trim();
  if (!s) return false;
  if (/^https?:\/\//i.test(s)) return true;
  if (s.includes('images/') || /\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(s)) return true;
  return false;
}
