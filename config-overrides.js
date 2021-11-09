/* config-overrides.js */

/*module.exports = function override(config, env) {

  return config;
}*/

module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto"
  });

  return webpackConfig;
}