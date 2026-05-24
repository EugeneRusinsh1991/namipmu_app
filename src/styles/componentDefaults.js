const tokens = require('./tokens').tokens || require('./tokens').default;

exports.componentStyles = {
  card: {
    borderRadius: tokens.borderRadius.m,
    backgroundColor: tokens.colors.cardBackground,
  },
  image: {
    defaultAspectRatio: 16 / 9,
    borderRadius: tokens.borderRadius.m,
  },
};

module.exports = {
  componentStyles: exports.componentStyles,
};
