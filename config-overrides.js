/**
 * Override create-react-app default config
 */
const webpack = require('webpack');
const childProcess = require('child_process');

/* config-overrides.js */
module.exports = function override(config, env) {
  const VERSION = childProcess.execSync('git rev-parse --short HEAD').toString().trim();
	
  config.plugins = [ ...config.plugins,
      new webpack.DefinePlugin({'process.env.GITREV': JSON.stringify(VERSION)})
    ];

  /**
    * Remove minify plugin for production build
  */
  if (env === 'production') {
    config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin');
  }
  return config;
}
