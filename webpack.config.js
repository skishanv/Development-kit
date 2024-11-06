const webpack = require('@nativescript/webpack');
const { resolve } = require('path');

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('react');

  webpack.chainWebpack((config) => {
    // Custom webpack configurations
    config.resolve.alias.set('@app', resolve(__dirname, 'app'));
  });

  return webpack.resolveConfig();
};