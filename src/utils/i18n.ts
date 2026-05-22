export function getLocalized(value: any, lang: string, fallback = ''): string {
  if (value == null) return fallback;
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    // prefer exact lang, then ru, then ua
    return (value[lang] ?? value.ru ?? value.ua ?? fallback);
  }
  return fallback;
}

export function getLocalizedAsset(value: any, lang: string) {
  if (value == null) return null;
  if (typeof value === 'object') {
    return value[lang] ?? value.ru ?? value.ua ?? null;
  }
  return value;
}
