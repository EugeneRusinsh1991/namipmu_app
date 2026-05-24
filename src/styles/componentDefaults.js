const tokens = require('./tokens').tokens || require('./tokens').default;

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
const componentStyles = createComponentStyles(tokens);

module.exports = {
  createComponentStyles,
  componentStyles,
};
