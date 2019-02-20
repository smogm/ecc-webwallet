/**
 * Override create-react-app default config
 */

/* config-overrides.js */
module.exports = function override(config, env) {
  /**
    * Remove minify plugin for production build
  */
  if (env === 'production') {
    config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin');
  }
  return config;
}
