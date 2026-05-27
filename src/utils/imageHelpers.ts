import { Image } from 'react-native';

/**
 * Преобразует разные форматы источника в URI строку
 * 
 * @param source - Источник изображения (число, объект или строка)
 * @returns URI строка изображения
 */
export function getUriFromSource(source: any): string {
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

/**
 * Проверяет, является ли строка валидным URI для изображения/видео
 * 
 * @param uri - URI для проверки
 * @returns true если URI выглядит валидным
 */
export function isLikelyValidUri(uri: any): boolean {
  if (!uri) return false;

  const s = String(uri).trim();
  if (!s) return false;
  if (/^(https?|file|data):/i.test(s)) return true;
  if (s.includes('images/') || s.includes('assets/') || /\.(jpg|jpeg|png|gif|webp|mp4)(\?.*)?$/i.test(s)) return true;

  return false;
}
