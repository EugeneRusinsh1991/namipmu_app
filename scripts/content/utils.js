const textResolver = require('./resolvers/textResolver');
const assetResolver = require('./resolvers/assetResolver');
const namingStrategy = require('./namingStrategy');

module.exports = {
  ...textResolver,
  ...assetResolver,
  ...namingStrategy,
};
