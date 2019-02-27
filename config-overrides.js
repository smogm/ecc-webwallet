/**
 * Override create-react-app default config
 */

const webpack = require('webpack');
const childProcess = require('child_process');

/* config-overrides.js */
module.exports = function override(config, env) {
  const VERSION = childProcess.execSync('git rev-parse HEAD').toString().trim();
	
  config.plugins.push(new webpack.DefinePlugin({COMMIT_SHA: JSON.stringify(VERSION)}));
  console.log(config.plugins);
  /**
    * Remove minify plugin for production build
  */
  if (env === 'production') {
    config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin');
  }
  return config;
}
