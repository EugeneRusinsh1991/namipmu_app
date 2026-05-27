const tokens = require('./tokens').tokens || require('./tokens').default;

/**
 * @deprecated Use component specifications from `src/styles/design-system/components.ts` instead.
 * This is a legacy function for backwards compatibility.
 */
function createComponentStyles(colorsOrTokens) {
  // Accept either colors object or tokens object
  const isTokens = colorsOrTokens && colorsOrTokens.colors;
  const colors = isTokens ? colorsOrTokens.colors : colorsOrTokens || tokens.colors;
  const borderRadius = isTokens ? (colorsOrTokens.borderRadius?.m || colorsOrTokens.borderRadius?.md) : (tokens.borderRadius?.m || tokens.borderRadius?.md);

  return {
    card: {
      borderRadius: borderRadius,
      backgroundColor: colors.cardBackground,
    },
    image: {
      defaultAspectRatio: 16 / 9,
      borderRadius: borderRadius,
    },
  };
}

// Backwards-compatible default
/**
 * @deprecated Use component specifications from `src/styles/design-system/components.ts` instead.
 * This is a legacy object for backwards compatibility.
 */
const componentStyles = createComponentStyles(tokens);

/**
 * @deprecated Use component specifications from `src/styles/design-system/components.ts` instead.
 * These are legacy exports for backwards compatibility.
 */
module.exports = {
  createComponentStyles,
  componentStyles,
};
