/**
 * Параметры для расчета отзывчивого стиля изображения
 */
interface ResponsiveImageStyleParams {
  windowWidth: number;
  padding: number;
  minWidth: number;
  maxWidth: number | null;
  layoutMaxContentWidth: number;
  explicitAspectRatio?: number;
  actualAspectRatio?: number;
}

/**
 * Результат расчета отзывчивого стиля
 */
interface ResponsiveImageStyle {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * Вычисляет отзывчивый стиль для изображения на основе размеров окна и параметров
 * 
 * @param params - Параметры для расчета
 * @returns Объект со стилем (width, height, aspectRatio)
 */
export function getResponsiveImageStyle(
  params: ResponsiveImageStyleParams
): ResponsiveImageStyle {
  const {
    windowWidth,
    padding,
    minWidth,
    maxWidth,
    layoutMaxContentWidth,
    explicitAspectRatio,
    actualAspectRatio,
  } = params;

  const horizontalPadding = padding * 2;
  const availableWidth = windowWidth - horizontalPadding;
  const contentMaxWidth = Math.min(availableWidth, layoutMaxContentWidth);
  const finalMaxWidth = maxWidth ? Math.min(contentMaxWidth, maxWidth) : contentMaxWidth;
  const finalWidth = Math.max(minWidth, Math.min(finalMaxWidth, availableWidth));

  let computedAspectRatio = explicitAspectRatio || actualAspectRatio || 1;
  if (explicitAspectRatio && actualAspectRatio) {
    const diff = Math.abs(actualAspectRatio - explicitAspectRatio) / explicitAspectRatio;
    if (diff > 0.15) {
      computedAspectRatio = actualAspectRatio;
    }
  }

  const finalHeight = finalWidth / computedAspectRatio;

  return {
    width: finalWidth,
    height: finalHeight,
    aspectRatio: computedAspectRatio,
  };
}
