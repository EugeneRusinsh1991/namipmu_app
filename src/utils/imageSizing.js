export function getResponsiveImageStyle({
  windowWidth,
  padding,
  minWidth,
  maxWidth,
  layoutMaxContentWidth,
  explicitAspectRatio,
  actualAspectRatio,
}) {
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
