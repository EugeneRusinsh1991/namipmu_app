const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

config.resolver.extraNodeModules = new Proxy(
  {
    '@': path.resolve(projectRoot, 'src'),
    '@assets': path.resolve(projectRoot, 'assets'),
    src: path.resolve(projectRoot, 'src'),
    components: path.resolve(projectRoot, 'src/components'),
    lib: path.resolve(projectRoot, 'src/lib'),
  },
  {
    get: (target, name) => target[name] || path.join(projectRoot, `node_modules/${name}`),
  }
);

config.watchFolders = [path.resolve(projectRoot, 'src')];

module.exports = config;
